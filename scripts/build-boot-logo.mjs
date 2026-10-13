/**
 * Builds the inline SVG that the pre-paint boot loader in index.html shows.
 *
 * Source of truth: src/assets/bskimg.svg — the exact logo the app already
 * renders in NavBar.jsx and Login.jsx. Nothing here redraws the logo. The
 * steps are either provably identical or verified pixel-for-pixel by
 * scripts/verify-boot-logo.mjs:
 *
 *   1. drop the 1722 no-op `<path d="">` elements the tracer emitted
 *   2. apply each path's `transform="translate(x,y)"` to its coordinates so the
 *      transform attribute can go away (every command in the source is
 *      absolute, so this is a pure translation of each X/Y pair)
 *   3. round coordinates — the source is a trace of a raster logo and the loader
 *      renders it ~300 CSS px wide, so a fraction of a unit is sub-pixel
 *   4. emit whichever of absolute / relative form is shorter, per command
 *   5. shorten `#RRGGBB` to `#RGB` where it round-trips exactly
 *
 * Usage:
 *   node scripts/build-boot-logo.mjs            size report only
 *   node scripts/build-boot-logo.mjs --write    write public/boot-logo.svg
 *   node scripts/build-boot-logo.mjs --inject   splice into index.html markers
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = path.join(root, 'src/assets/bskimg.svg');
const OUT = path.join(root, 'public/boot-logo.svg');
const INDEX = path.join(root, 'index.html');
const MARK_START = '<!-- boot-logo:start -->';
const MARK_END = '<!-- boot-logo:end -->';

const WIDTH = 738;
const HEIGHT = 458;

const raw = fs.readFileSync(SOURCE, 'utf8');

/** gzip size of a string — what the browser actually transfers. */
function gzipSize(s) {
  return zlib.gzipSync(Buffer.from(s, 'utf8'), { level: 9 }).length;
}

/** Pull every <path .../> out of the source SVG. */
function readPaths(svg) {
  const re = /<path\b([^>]*?)\/?>/g;
  const out = [];
  let m;
  while ((m = re.exec(svg))) {
    const a = m[1];
    out.push({
      d: (a.match(/\bd="([^"]*)"/) || [, ''])[1],
      fill: (a.match(/\bfill="([^"]*)"/) || [, '#000000'])[1],
      transform: (a.match(/\btransform="([^"]*)"/) || [, ''])[1],
    });
  }
  return out;
}

const paths = readPaths(raw);

/**
 * Safety net: the translation below assumes absolute commands only, because a
 * relative command's numbers are deltas that must NOT be shifted. Assert it
 * rather than silently corrupting geometry.
 */
{
  const nonEmpty = paths.filter((p) => p.d.trim());
  const lower = nonEmpty.flatMap((p) => p.d.match(/[a-z]/g) || []);
  if (lower.length) {
    throw new Error(`source has relative commands (${[...new Set(lower)]}); rewrite must be updated`);
  }
  const other = nonEmpty.flatMap((p) => p.d.match(/[A-Z]/g) || []).filter((c) => !"MZC".includes(c));
  if (other.length) {
    throw new Error(`source has unexpected commands (${[...new Set(other)]})`);
  }
  const cmds = new Map();
  for (const p of nonEmpty) {
    for (const c of p.d.match(/[A-Z]/g) || []) cmds.set(c, (cmds.get(c) || 0) + 1);
  }
  console.log(
    'source commands: ' +
      [...cmds].map((e) => `${e[0]}\u00d7${e[1]}`).join(' '),
  );
}

/** Shortest faithful text for a number (drops the leading `0` of `0.x`). */
function num(v) {
  const s = String(v);
  return s.startsWith('0.') ? s.slice(1) : s.startsWith('-0.') ? '-' + s.slice(2) : s;
}

/** Join number tokens, omitting separators SVG's grammar makes redundant. */
function joinSmart(tokens) {
  let out = '';
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (i > 0 && !(t.startsWith('-') || out.endsWith('e'))) out += ' ';
    out += t;
  }
  return out;
}

/** `#aabbcc` -> `#abc` when it round-trips exactly, else lowercased as-is. */
function shortFill(fill) {
  const m = /^#([0-9a-fA-F]{6})$/.exec(fill);
  if (!m) return fill;
  const h = m[1];
  if (h[0] === h[1] && h[2] === h[3] && h[4] === h[5]) return '#' + (h[0] + h[2] + h[4]).toLowerCase();
  return '#' + h.toLowerCase();
}

const TRANSLATE_RE = /^translate\(\s*(-?[\d.]+)[\s,]+(-?[\d.]+)\s*\)$/;

/**
 * Translate every coordinate pair, optionally round, then re-emit each command
 * in whichever of absolute / relative form is shorter. Both forms describe the
 * same curve, so this cannot change the rendered shape.
 */
function rewrite(d, transform, decimals) {
  const t = (transform || '').match(TRANSLATE_RE);
  const dx = t ? Number(t[1]) : 0;
  const dy = t ? Number(t[2]) : 0;
  // Full precision still snaps to 8 decimals: that is the maximum precision in
  // the source, so it is lossless, but it erases float drift introduced by the
  // translate (e.g. 4.73434962 + 175 = 179.73434962000001).
  const q = (v) =>
    decimals == null
      ? Math.round(v * 1e8) / 1e8
      : Math.round(v * 10 ** decimals) / 10 ** decimals;

  const toks = [];
  for (const m of d.matchAll(/([MZC])|(-?\d*\.?\d+)/g)) {
    toks.push(m[1] || Number(m[2]));
  }

  const out = [];
  let i = 0;
  let x = 0;
  let y = 0;
  let sx = 0;
  let sy = 0;

  const take = (n) => {
    const a = toks.slice(i, i + n);
    i += n;
    return a;
  };

  while (i < toks.length) {
    const cmd = toks[i++];

    if (cmd === 'Z') {
      out.push('z');
      x = sx;
      y = sy;
      continue;
    }

    if (cmd === 'M') {
      const [ax, ay] = take(2);
      const nx = q(ax + dx);
      const ny = q(ay + dy);
      // Absolute moveto: after a `z` the current point is the previous
      // subpath's start, so a relative moveto would need a different reference.
      out.push('M' + joinSmart([num(nx), num(ny)]));
      x = sx = nx;
      y = sy = ny;
      continue;
    }

    // C: pairs are (c1x,c1y) (c2x,c2y) (x,y) — even index is X, odd is Y.
    const vals = take(6).map((v, k) => q(k % 2 === 0 ? v + dx : v + dy));
    const [c1x, c1y, c2x, c2y, ax, ay] = vals;
    const abs = 'C' + joinSmart(vals.map(num));
    const rel =
      'c' + joinSmart([c1x - x, c1y - y, c2x - x, c2y - y, ax - x, ay - y].map((v) => num(q(v))));
    out.push(rel.length < abs.length ? rel : abs);
    x = ax;
    y = ay;
  }

  return out.join('');
}

/** Build the full SVG at a given coordinate precision. */
function build(decimals) {
  const seen = new Set();
  const parts = [];
  let dropped = 0;
  let deduped = 0;

  for (const p of paths) {
    if (!p.d.trim()) {
      dropped += 1;
      continue;
    }
    const fill = shortFill(p.fill);
    const d = rewrite(p.d, p.transform, decimals);
    const key = fill + '|' + d;
    if (seen.has(key)) {
      deduped += 1;
      continue;
    }
    seen.add(key);
    parts.push(`<path fill="${fill}" d="${d}"/>`);
  }

  return {
    svg:
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}"` +
      ` width="${WIDTH}" height="${HEIGHT}">${parts.join('')}</svg>`,
    shapes: seen.size,
    dropped,
    deduped,
  };
}

function report(label, r) {
  console.log(
    `${label.padEnd(16)} raw ${String(Math.round(r.svg.length / 1024)).padStart(4)} kB` +
      `  gzip ~${String(Math.round(gzipSize(r.svg) / 1024)).padStart(3)} kB` +
      `  shapes ${String(r.shapes).padStart(4)}` +
      `  dupes ${r.deduped}` +
      `  dropped ${r.dropped}`,
  );
}

console.log(`source: ${raw.length} bytes, ${paths.length} <path> elements\n`);

const candidates = [
  ['full precision', null, 999],
  ['0.1 units', 1, 1],
  ['integers', 0, 0],
];

// node scripts/build-boot-logo.mjs --decimals 1   force a specific precision
const dump = process.argv.indexOf('--dump');
if (dump !== -1) {
  for (const dec of [null, 1, 0]) {
    const r = build(dec);
    const first = r.svg.match(/<path[^>]*d="([^"]{0,120})/);
    console.log('decimals=' + dec + ': ' + (first ? first[1] : 'n/a'));
  }
  process.exit(0);
}
const forced = process.argv.indexOf('--decimals');
if (forced !== -1) {
  const d = process.argv[forced + 1];
  const r = build(d === 'null' ? null : Number(d));
  fs.writeFileSync(OUT, r.svg, 'utf8');
  console.log('wrote forced decimals=' + d + ' -> ' + OUT + ' (' + r.svg.length + ' bytes)');
  process.exit(0);
}

// Full precision is mandatory: the trace contains sub-pixel slivers, so any
// geometric rounding (0.1 units / integers) visibly shifts edges. Rounding is
// still reported below for reference.
let best = null;
for (const [label, decimals] of candidates) {
  const r = build(decimals);
  report(label, r);
  if (decimals === null) best = { label, ...r };
}


console.log(
  `\nchosen: ${best.label} -> ${Math.round(best.svg.length / 1024)} kB raw,` +
    ` ~${Math.round(gzipSize(best.svg) / 1024)} kB gzip, ${best.shapes} shapes`,
);

if (process.argv.includes('--write')) {
  fs.writeFileSync(OUT, best.svg, 'utf8');
  console.log(`wrote ${path.relative(root, OUT)} (${best.svg.length} bytes)`);
}

if (process.argv.includes('--inject')) {
  const html = fs.readFileSync(INDEX, 'utf8');
  const s = html.indexOf(MARK_START);
  const e = html.indexOf(MARK_END);
  if (s === -1 || e === -1 || e < s) throw new Error('boot-logo markers not found in index.html');
  // Class hooks the loader CSS; aria-hidden keeps the labeled role="status"
  // container as the single announced element.
  const svg = best.svg.replace('<svg ', '<svg class="bsk-logo" aria-hidden="true" ');
  fs.writeFileSync(INDEX, html.slice(0, s + MARK_START.length) + svg + html.slice(e), 'utf8');
  console.log(`inlined boot logo into index.html (${svg.length} bytes)`);
}

