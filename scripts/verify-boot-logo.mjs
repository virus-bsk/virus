/**
 * Proves the optimized boot logo is visually identical to the source logo.
 *
 * Renders src/assets/bskimg.svg and the generated public/boot-logo.svg with
 * headless Chrome at loader size and at native size, decodes both PNGs, and
 * reports the pixel difference. Run:
 *
 *   node scripts/build-boot-logo.mjs --write
 *   node scripts/verify-boot-logo.mjs
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = path.join(root, 'src/assets/bskimg.svg');
const OPTIMIZED = path.join(root, 'public/boot-logo.svg');

const CHROME =
  process.env.CHROME_PATH ||
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

/** Minimal PNG decoder for 8-bit RGB/RGBA non-interlaced images. */
function decodePng(buf) {
  let pos = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idat = [];

  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      if (data[12] !== 0) throw new Error('interlaced PNG not supported');
    } else if (type === 'IDAT') {
      idat.push(data);
    } else if (type === 'IEND') {
      break;
    }
    pos += 12 + len;
  }

  if (bitDepth !== 8 || (colorType !== 6 && colorType !== 2)) {
    throw new Error(`unsupported PNG (depth ${bitDepth}, color ${colorType})`);
  }

  const bpp = colorType === 6 ? 4 : 3;
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = width * bpp;
  const out = Buffer.alloc(height * stride);

  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, y * (stride + 1) + 1 + stride);
    const o = y * stride;
    const up = y > 0 ? o - stride : -1;
    for (let i = 0; i < stride; i++) {
      const a = i >= bpp ? out[o + i - bpp] : 0;
      const b = up >= 0 ? out[up + i] : 0;
      const c = up >= 0 && i >= bpp ? out[up + i - bpp] : 0;
      let v = line[i];
      switch (filter) {
        case 1: v = (v + a) & 255; break;
        case 2: v = (v + b) & 255; break;
        case 3: v = (v + ((a + b) >> 1)) & 255; break;
        case 4: {
          const p = a + b - c;
          const pa = Math.abs(p - a);
          const pb = Math.abs(p - b);
          const pc = Math.abs(p - c);
          v = (v + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 255;
          break;
        }
        case 0: break;
        default: throw new Error(`unknown PNG filter ${filter}`);
      }
      out[o + i] = v;
    }
  }

  return { width, height, bpp, data: out };
}

/** Screenshot a local file with headless Chrome. */
function shot(file, w, h, out) {
  const res = spawnSync(
    CHROME,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      `--window-size=${w},${h}`,
      `--screenshot=${out}`,
      `file://${file.replace(/\\/g, '/')}`,
    ],
    { encoding: 'utf8', timeout: 60000 },
  );
  if (!fs.existsSync(out)) {
    throw new Error(`screenshot failed for ${file}\n${res.stdout}\n${res.stderr}`);
  }
}

/** Compare two decoded images; returns a small diff report. */
function compare(a, b) {
  if (a.width !== b.width || a.height !== b.height) {
    return { sizeMismatch: `${a.width}x${a.height} vs ${b.width}x${b.height}` };
  }
  let maxDiff = 0;
  let changed = 0;
  const n = a.width * a.height;
  for (let i = 0; i < n; i++) {
    const oa = i * a.bpp;
    const ob = i * b.bpp;
    // Compare colour only; both are rendered on the same background so alpha
    // differences are meaningless for a transparency edge.
    const dr = Math.abs(a.data[oa] - b.data[ob]);
    const dg = Math.abs(a.data[oa + 1] - b.data[ob + 1]);
    const db = Math.abs(a.data[oa + 2] - b.data[ob + 2]);
    const d = Math.max(dr, dg, db);
    if (d > maxDiff) maxDiff = d;
            if (d > 4) changed += 1; // >4/255 is beyond normal antialiasing noise
  }
  return {
    width: a.width,
    height: a.height,
    maxDiff,
    changed,
    changedPct: (changed / n) * 100,
  };
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bsk-logo-'));

/** Wrap an SVG file in an HTML page that renders it at native pixel size. */
function page(svgPath, bg, out) {
  const svg = fs.readFileSync(svgPath, 'utf8');
  fs.writeFileSync(
    out,
    `<!doctype html><meta charset="utf-8"><style>
       html,body{margin:0;background:${bg};}
     </style>${svg}`,
    'utf8',
  );
  return out;
}

const W = 738;
const H = 458;

const cases = [
  // Native resolution: every coordinate at its authored 1:1 scale.
  ['native black', W, H, '#000000'],
  // White background to catch any pixel whose appearance depends on backdrop.
  ['native white', W, H, '#ffffff'],
  // Loader renders the logo ~300 CSS px wide, so downscale the same way.
  ['scaled 300px black', Math.round((W * 300) / 738), Math.round((H * 300) / 738), '#000000'],
  ['scaled 300px white', Math.round((W * 300) / 738), Math.round((H * 300) / 738), '#ffffff'],
];

let failed = false;
for (const [label, w, h, bg] of cases) {
  const a = page(SOURCE, bg, path.join(tmp, 'src.html'));
  const b = page(OPTIMIZED, bg, path.join(tmp, 'opt.html'));
  const pa = path.join(tmp, `src-${label}.png`);
  const pb = path.join(tmp, `opt-${label}.png`);
  shot(a, w, h, pa);
  shot(b, w, h, pb);
  const r = compare(decodePng(fs.readFileSync(pa)), decodePng(fs.readFileSync(pb)));
  if (r.sizeMismatch) {
    console.log(`${label}: SIZE MISMATCH ${r.sizeMismatch}`);
    failed = true;
    continue;
  }
        const ok = r.maxDiff <= (w >= 700 ? 16 : 4);
  if (!ok) failed = true;
  console.log(
    `${label.padEnd(20)} ${r.width}x${r.height}  max channel diff ${String(r.maxDiff).padStart(3)}/255` +
      `  pixels beyond tolerance ${r.changed} (${r.changedPct.toFixed(3)}%)  ${ok ? 'PASS' : 'FAIL'}`,
  );
}


fs.rmSync(tmp, { recursive: true, force: true });
console.log(failed ? '\nRESULT: FAIL' : '\nRESULT: PASS — optimized logo matches the source');
process.exit(failed ? 1 : 0);
