// Verifies the actual shipped calculator functions against the worked
// examples in docs/knowledge-base/math/calculators-and-formulas.md.
// Run: node core/domain/calculators.test.js
const c = require('./calculators.js');

let failures = 0;
function check(label, got, expected, tol) {
  tol = tol === undefined ? 0.01 : tol;
  const ok = Math.abs(got - expected) <= tol;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}: got ${got}, expected ~${expected}`);
  if (!ok) failures++;
}

// OG — KB §1.2 metric worked example: 4.5kg 2-row (37 PPG), 19L, 72% eff -> 1.0527
check('ogFromGrainBill', c.ogFromGrainBill([{ weightKg: 4.5, ppg: 37 }], 19, 0.72), 1.0527, 0.0001);

// Attenuation — KB §2.1: OG 1.052, 75% attenuation -> FG 1.013
check('fgFromAttenuation', c.fgFromAttenuation(1.052, 75), 1.013, 0.0005);
check('apparentAttenuation', c.apparentAttenuation(1.052, 1.013), 75, 0.1);

// SG-to-Plato — KB §11.2: 1.050 -> 12.39 (corrected)
check('sgToPlato', c.sgToPlato(1.050), 12.39, 0.01);

// Real extract/attenuation — KB §2.2: OE 12.9°P, AE 3.3°P -> RE 5.04, real att 60.9%
check('realExtract', c.realExtract(12.9, 3.3), 5.04, 0.01);
check('realAttenuation', c.realAttenuation(12.9, 3.3), 60.9, 0.1);

// ABV — KB §3.1/3.2
check('abvSimple', c.abvSimple(1.052, 1.013), 5.12, 0.01);
check('abvHighGravity (imperial stout)', c.abvHighGravity(1.092, 1.021), 10.17, 0.02);

// Tinseth IBU — KB §4.1: 1oz(28.35g) 6% AA, 60min, OG 1.050, 5.5gal(20.82L) -> ~18.85
check('tinsethIBU', c.tinsethIBU([{ weightG: 28.35, aaPct: 6, minutes: 60 }], 20.82, 1.050), 18.85, 0.3);

// Morey SRM — KB §5.1: 9lb(4.082kg) 2-row(1.8L) + 1lb(0.4536kg) Crystal60(60L), 5.5gal(20.82L) -> ~9.06
check('moreySRM', c.moreySRM([{ weightKg: 4.082, lovibond: 1.8 }, { weightKg: 0.4536, lovibond: 60 }], 20.82), 9.06, 0.1);
check('srmToEBC', c.srmToEBC(9.06), 17.85, 0.05);

// Residual Alkalinity — KB §6.1: TotalAlk 120, Ca 80, Mg 12 -> 95.4
check('residualAlkalinity', c.residualAlkalinity(120, 80, 12), 95.4, 0.05);

// Residual CO2 — KB §7.2: 68F (20C) -> 0.862 volumes
check('residualCO2FromTempC', c.residualCO2FromTempC(20), 0.862, 0.005);

// Strike temp — KB §9.2 corrected worked example: target 66.67C, grain 20C, R=3.129 L/kg -> 72.89C (163.2F)
check('strikeWaterTempC', c.strikeWaterTempC(66.67, 20, 3.129), 72.89, 0.02);

// Pitch rate — KB §11.1: 19L @ 1.050 SG, ale rate -> ~176.7 billion cells
check('targetPitchCellsBillions', c.targetPitchCellsBillions(19, 1.050, 'ale'), 176.7, 1);

// Refractometer correction — KB §12.2: orig 12.8 Bx, final 6.5 Bx -> FG 1.01175
check('refractometerCorrectedFG', c.refractometerCorrectedFG(12.8, 6.5), 1.01175, 0.0001);

// Brewhouse efficiency — KB §10.1: 10lb(4.536kg) 37PPG, measured 1.048 into 5.5gal(20.82L) -> 71.4%
check('brewhouseEfficiency', c.brewhouseEfficiency(1.048, 20.82, [{ weightKg: 4.536, ppg: 37 }]), 0.714, 0.005);

console.log(`\n${failures === 0 ? 'ALL PASS' : failures + ' FAILURE(S)'}`);
process.exit(failures === 0 ? 0 : 1);
