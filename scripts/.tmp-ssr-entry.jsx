// TEMP verification entry (deleted after the check).
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import Page from "../src/maang/weekly/MaangWeeklyPreparation.jsx";

const render = () =>
  renderToString(
    <MemoryRouter initialEntries={["/maang/weekly-preparation"]}>
      <Page />
    </MemoryRouter>,
  );

let bad = 0;
const check = (n, ok, d = "") => {
  if (ok) console.log(`  ✅ ${n}`);
  else {
    bad += 1;
    console.error(`  ❌ ${n} ${d}`);
  }
};
const strip = (s) => s.replace(/<!--[\s\S]*?-->/g, "");

function picker(html) {
  const wrap = html.match(
    /<div class="mdsa-wp-week-select">[\s\S]*?<\/div>/,
  );
  const sel = html.match(/<select[^>]*class="mdsa-wp-week-select-input"[^>]*>/);
  const opts = html.match(/<option[\s\S]*?<\/option>/g) || [];
  const text = (o) => strip(o.replace(/<option[^>]*>|<\/option>/g, "")).trim();
  const chosen = opts.find((o) => /\sselected(=|>|\s)/.test(o));
  return {
    wrap: wrap ? strip(wrap[0]) : "(no picker)",
    selectTag: sel ? sel[0] : "(no select)",
    count: opts.length,
    first: opts.length ? text(opts[0]) : "",
    last: opts.length ? text(opts[opts.length - 1]) : "",
    selected: chosen ? text(chosen) : "(none)",
  };
}

function startWeeksAgo(weeks) {
  const d = new Date();
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7) - weeks * 7);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

console.log("\nA) fresh learner (Week 1)");
const a = picker(render());
check("no <label> wrapper (the click dead zone)", !a.wrap.includes("<label"));
check("pill is a plain div with the decorative text", a.wrap.includes("Jump to week"));
check("control is the invisible select", /class="mdsa-wp-week-select-input"/.test(a.selectTag));
check("select carries an aria-label naming the week", /aria-label="Jump to week — currently week 1"/.test(a.selectTag), a.selectTag);
check("decorative text is aria-hidden", /class="mdsa-wp-week-select-label" aria-hidden="true"|aria-hidden="true" class="mdsa-wp-week-select-label"/.test(a.wrap));
check("18 weeks offered", a.count === 18, `got ${a.count}`);
check("lists Week 1 → Week 18", a.first === "Week 1 · this week" && a.last === "Week 18", `${a.first} .. ${a.last}`);
check("Week 1 selected", a.selected === "Week 1 · this week", a.selected);
check("no stale hint classes", !/mdsa-wp-drag|mdsa-wp-weekbar/.test(a.wrap));
console.log(`     ${a.wrap.replace(/\s+/g, " ").trim().slice(0, 240)}`);

console.log("\nB) learner on Week 5 (started 4 weeks ago)");
const store = new Map();
globalThis.window = {
  localStorage: {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
  },
  matchMedia: () => ({ matches: false }),
};
store.set("maang-wp-start-monday", String(startWeeksAgo(4)));
const b = picker(render());
check("aria-label says week 5", /currently week 5/.test(b.selectTag), b.selectTag);
check("Week 5 selected in the list", b.selected === "Week 5 · this week", b.selected);
check("Week 1 still one pick away", b.first === "Week 1", b.first);

console.log(bad === 0 ? "\n🎉 SSR CHECK PASSED" : `\n💥 ${bad} SSR CHECK(S) FAILED`);
process.exit(bad === 0 ? 0 : 1);
