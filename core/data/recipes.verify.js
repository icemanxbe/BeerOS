// Computes OG/FG/ABV/IBU/SRM for every recipe via the real calculator
// functions and checks each against its stored BJCP range.
// Run: node core/data/recipes.verify.js
const calc = require('../domain/calculators.js');
const { BUILTIN_RECIPES } = require('./recipes.js');

function inRange(v, range) { return v >= range[0] && v <= range[1]; }
function fmt(n, dp) { return Number(n).toFixed(dp); }

let anyFail = false;
BUILTIN_RECIPES().forEach(r => {
  const og = calc.ogFromGrainBill(r.grainBill, r.volumeL, r.mashEfficiency);
  const avgAtt = (r.yeast.attenuationLow + r.yeast.attenuationHigh) / 2;
  const fg = calc.fgFromAttenuation(og, avgAtt);
  const abv = calc.abvSimple(og, fg);
  const ibu = calc.tinsethIBU(r.hopSchedule, r.volumeL, og);
  const srm = calc.moreySRM(r.grainBill.map(g => ({ weightKg: g.weightKg, lovibond: g.lovibond })), r.volumeL);

  const checks = [
    ['OG', og, r.bjcpRange.og, 4],
    ['FG', fg, r.bjcpRange.fg, 4],
    ['ABV', abv, r.bjcpRange.abv, 1],
    ['IBU', ibu, r.bjcpRange.ibu, 1],
    ['SRM', srm, r.bjcpRange.srm, 1]
  ];
  const failed = checks.filter(([, v, range]) => !inRange(v, range));
  // Commercial clone recipes: also check computed ABV against the real,
  // label-printed ABV (tolerance 0.5%), since that's a harder fact than any
  // BJCP style range for a beer that wasn't designed to a style guide.
  let abvNote = '';
  if (r.commercialInspiration && typeof r.realAbv === 'number') {
    const diff = Math.abs(abv - r.realAbv);
    if (diff > 0.5) { failed.push(['realAbv', abv, [r.realAbv - 0.5, r.realAbv + 0.5], 1]); }
    abvNote = `  (real ${r.realAbv}%, computed ${fmt(abv, 1)}%, diff ${fmt(diff, 2)})`;
  }
  if (failed.length) anyFail = true;
  console.log(`${failed.length ? 'FAIL' : 'PASS'}  ${r.id} (${r.styleCode} ${r.style})${abvNote}`);
  checks.forEach(([label, v, range, dp]) => {
    const ok = inRange(v, range);
    console.log(`  ${ok ? ' ' : '!'} ${label} = ${fmt(v, dp)}  (target ${range[0]}-${range[1]})`);
  });
});

console.log(anyFail ? '\nSOME RECIPES OUT OF RANGE' : '\nALL RECIPES IN RANGE');
process.exit(anyFail ? 1 : 0);
