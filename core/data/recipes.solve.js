// For every out-of-range recipe, computes suggested adjustments:
// - scale whole grain bill to hit mid-target OG
// - then scale only specialty (non-base, i.e. not the largest-weight) grains to hit mid-target SRM
// - scale yeast attenuation (bounded) to hit mid-target FG given the (possibly new) OG
// - scale hop weights to hit mid-target IBU given the (possibly new) OG
// Prints suggested new values; does not edit the file.
const calc = require('../domain/calculators.js');
const { BUILTIN_RECIPES } = require('./recipes.js');

function mid(range) { return (range[0] + range[1]) / 2; }
function inRange(v, range) { return v >= range[0] && v <= range[1]; }

BUILTIN_RECIPES().forEach(r => {
  const og0 = calc.ogFromGrainBill(r.grainBill, r.volumeL, r.mashEfficiency);
  const avgAtt0 = (r.yeast.attenuationLow + r.yeast.attenuationHigh) / 2;
  const fg0 = calc.fgFromAttenuation(og0, avgAtt0);
  const abv0 = calc.abvSimple(og0, fg0);
  const ibu0 = calc.tinsethIBU(r.hopSchedule, r.volumeL, og0);
  const srm0 = calc.moreySRM(r.grainBill.map(g => ({ weightKg: g.weightKg, lovibond: g.lovibond })), r.volumeL);

  const checks = { og: og0, fg: fg0, abv: abv0, ibu: ibu0, srm: srm0 };
  const failing = Object.keys(checks).filter(k => !inRange(checks[k], r.bjcpRange[k]));
  if (!failing.length) return;

  console.log(`\n=== ${r.id} (${r.styleCode}) — failing: ${failing.join(', ')} ===`);
  console.log(`  current: OG=${og0.toFixed(4)} FG=${fg0.toFixed(4)} ABV=${abv0.toFixed(1)} IBU=${ibu0.toFixed(1)} SRM=${srm0.toFixed(1)}`);

  // 1. Scale whole grain bill to hit mid OG
  const targetOgPoints = (mid(r.bjcpRange.og) - 1) * 1000;
  const currentOgPoints = (og0 - 1) * 1000;
  const grainScale = targetOgPoints / currentOgPoints;
  console.log(`  grain bill scale factor: ${grainScale.toFixed(4)}`);
  r.grainBill.forEach(g => console.log(`    ${g.name}: ${g.weightKg} -> ${(g.weightKg * grainScale).toFixed(3)} kg`));
  const newGrainBill = r.grainBill.map(g => ({ ...g, weightKg: g.weightKg * grainScale }));
  const og1 = calc.ogFromGrainBill(newGrainBill, r.volumeL, r.mashEfficiency);
  const srm1 = calc.moreySRM(newGrainBill.map(g => ({ weightKg: g.weightKg, lovibond: g.lovibond })), r.volumeL);
  console.log(`  after grain scale: OG=${og1.toFixed(4)} SRM=${srm1.toFixed(1)} (target SRM ${r.bjcpRange.srm})`);

  // 2. If SRM still off, suggest scaling only the highest-lovibond (specialty) grains
  if (!inRange(srm1, r.bjcpRange.srm)) {
    const baseIdx = newGrainBill.reduce((maxI, g, i, arr) => g.weightKg > arr[maxI].weightKg ? i : maxI, 0);
    const targetSrm = mid(r.bjcpRange.srm);
    // binary search a scale factor for all non-base grains
    let lo = 0.1, hi = 5;
    for (let iter = 0; iter < 40; iter++) {
      const mid2 = (lo + hi) / 2;
      const trial = newGrainBill.map((g, i) => i === baseIdx ? g : { ...g, weightKg: g.weightKg * mid2 });
      const trialSrm = calc.moreySRM(trial.map(g => ({ weightKg: g.weightKg, lovibond: g.lovibond })), r.volumeL);
      if (trialSrm < targetSrm) lo = mid2; else hi = mid2;
    }
    const specialtyScale = (lo + hi) / 2;
    console.log(`  specialty-grain scale factor (non-base) to hit SRM ${targetSrm.toFixed(1)}: ${specialtyScale.toFixed(3)}`);
    newGrainBill.forEach((g, i) => {
      if (i !== baseIdx) console.log(`    ${g.name}: ${g.weightKg.toFixed(3)} -> ${(g.weightKg * specialtyScale).toFixed(3)} kg`);
    });
  }

  // 3. Attenuation needed to hit mid FG at the new OG
  const targetFgPoints = (mid(r.bjcpRange.fg) - 1) * 1000;
  const ogPoints1 = (og1 - 1) * 1000;
  const neededAtt = (1 - targetFgPoints / ogPoints1) * 100;
  console.log(`  attenuation needed for mid-FG: ${neededAtt.toFixed(1)}% (currently ${r.yeast.attenuationLow}-${r.yeast.attenuationHigh}%)`);

  // 4. Hop scale needed to hit mid IBU at the new OG
  const ibu1 = calc.tinsethIBU(r.hopSchedule, r.volumeL, og1);
  const hopScale = mid(r.bjcpRange.ibu) / ibu1;
  console.log(`  hop scale factor for mid-IBU: ${hopScale.toFixed(3)} (IBU at new OG: ${ibu1.toFixed(1)})`);
  r.hopSchedule.forEach(h => console.log(`    ${h.name} (${h.minutes}min): ${h.weightG}g -> ${(h.weightG * hopScale).toFixed(1)}g`));
});
