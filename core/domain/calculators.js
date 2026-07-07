// BeerOS brewing calculators — pure functions, no DOM, unit-tested against
// docs/knowledge-base/math/calculators-and-formulas.md. Metric throughout
// (kg, L, °C); PPG/°Lovibond are kept as input units since that's how malt
// suppliers publish spec sheets, and converted internally.

const PPG_TO_PKL = 8.3454; // KB §1.2, re-derived from 1 lb=0.45359237kg, 1 US gal=3.785412L

function pointsFromGrainBill(grains, volumeL, efficiency) {
  // grains: [{weightKg, ppg}]
  const points = grains.reduce((sum, g) => sum + g.weightKg * g.ppg * PPG_TO_PKL * efficiency, 0);
  return points / volumeL;
}
function ogFromGrainBill(grains, volumeL, efficiency) {
  return 1 + pointsFromGrainBill(grains, volumeL, efficiency) / 1000;
}

function apparentAttenuation(og, fg) {
  return ((og - 1) * 1000 - (fg - 1) * 1000) / ((og - 1) * 1000) * 100;
}
function fgFromAttenuation(og, attenuationPct) {
  const ogPoints = (og - 1) * 1000;
  return 1 + (ogPoints * (1 - attenuationPct / 100)) / 1000;
}

// SG-to-Plato cubic polynomial, KB §11.2 — verified against reference tables at 1.040/1.050/1.080/1.100
function sgToPlato(sg) {
  return -616.868 + (1111.14 * sg) - (630.272 * sg * sg) + (135.997 * sg * sg * sg);
}
// Inverse of sgToPlato via bisection — the cubic has no simple closed-form
// inverse, but it's monotonic increasing across the practical brewing range
// (checked 0.990-1.200 SG), so bisecting against the same verified formula
// is safe: this doesn't introduce a new/unverified formula, just solves the
// existing one numerically. Used for devices (hydrometers) that report in Plato.
function platoToSG(plato) {
  let lo = 0.980, hi = 1.250;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (sgToPlato(mid) < plato) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}
// Balling/Hall Real Extract formula, KB §2.2
function realExtract(oePlato, aePlato) {
  return 0.1808 * oePlato + 0.8192 * aePlato;
}
function realAttenuation(oePlato, aePlato) {
  const re = realExtract(oePlato, aePlato);
  return (oePlato - re) / oePlato * 100;
}

function abvSimple(og, fg) {
  return (og - fg) * 131.25;
}
// High-gravity ABV formula (Hall/Zymurgy 1995), KB §3.2 — more accurate above ~1.070 OG
function abvHighGravity(og, fg) {
  return 76.08 * (og - fg) / (1.775 - og) * (fg / 0.794);
}

// Tinseth hop utilization, KB §4.1
function tinsethBignessFactor(og) {
  return 1.65 * Math.pow(0.000125, og - 1);
}
function tinsethBoilTimeFactor(minutes) {
  return (1 - Math.exp(-0.04 * minutes)) / 4.15;
}
function tinsethUtilization(og, minutes) {
  return tinsethBignessFactor(og) * tinsethBoilTimeFactor(minutes);
}
// hopAdditions: [{weightG, aaPct, minutes}]. avgBoilGravity: average wort SG during the boil.
function tinsethIBU(hopAdditions, volumeL, avgBoilGravity) {
  return hopAdditions.reduce((sum, h) => {
    const util = tinsethUtilization(avgBoilGravity, h.minutes);
    return sum + util * (h.aaPct / 100 * h.weightG * 1000) / volumeL;
  }, 0);
}

// Morey SRM equation, KB §5.1. grains: [{weightKg, lovibond}]
function moreySRM(grains, volumeL) {
  const mcu = grains.reduce((sum, g) => sum + g.weightKg * g.lovibond, 0) / volumeL * PPG_TO_PKL;
  return 1.4922 * Math.pow(mcu, 0.6859);
}
function srmToEBC(srm) {
  return srm * 1.97;
}
// Approximate SRM -> hex color, for vessel-liquid visualization only — NOT a
// precise colorimetric standard (real beer color also depends on turbidity/
// lighting). Exponential falloff per RGB channel, a common approximation
// pattern in homebrew color tools; clamped to the 1-40 SRM chart range.
function srmToHex(srm) {
  const s = Math.max(1, Math.min(srm, 40));
  const r = Math.round(255 * Math.pow(0.975, s));
  const g = Math.round(255 * Math.pow(0.88, s));
  const b = Math.round(255 * Math.pow(0.7, s));
  const hex = n => n.toString(16).padStart(2, '0');
  return '#' + hex(r) + hex(g) + hex(b);
}

// Residual Alkalinity, KB §6.1 (Kolbach, via Palmer) — ppm as CaCO3 throughout
function residualAlkalinity(totalAlkalinityPpm, caPpm, mgPpm) {
  return totalAlkalinityPpm - (caPpm / 3.5 + mgPpm / 7);
}

// Residual CO2 already dissolved at packaging temp, KB §7.2 (polynomial fit to ASBC solubility data)
function residualCO2FromTempC(tempC) {
  const f = tempC * 9 / 5 + 32;
  return 3.0378 - (0.050062 * f) + (0.00026555 * f * f);
}
// CO2 mass fraction of sugar fermented, derived from fermentation stoichiometry
// (C6H12O6 -> 2 EtOH + 2 CO2; sucrose hydrolyzes first, gaining water mass from solution).
const PRIMING_CO2_FRACTION = { dextrose: 0.4885, sucrose: 0.5144, dme: 0.220 };
function primingSugarGrams(targetVolumesCO2, batchVolumeL, tempC, sugarType) {
  const residual = residualCO2FromTempC(tempC);
  const toAdd = Math.max(0, targetVolumesCO2 - residual);
  const co2Grams = toAdd * batchVolumeL * 1.9768; // KB §8.2
  return co2Grams / PRIMING_CO2_FRACTION[sugarType];
}

// Force carbonation pressure (kegging), KB §8.1. Two candidate closed-form
// regressions were tried and both failed to reproduce this table (off by
// ~14.7psi and ~1-2psi respectively) — rather than ship an unverified fit,
// this interpolates directly over the Draught Beer Quality Manual's own
// sourced grid (itself from ASBC "Methods of Analysis," 1949). Clamped to
// the table's actual range (34-42°F, 2.1-2.9 vol) rather than extrapolated.
const FORCE_CARB_TABLE_TEMPS_F = [34, 36, 38, 40, 42];
const FORCE_CARB_TABLE_VOLS = [2.1, 2.3, 2.5, 2.7, 2.9];
const FORCE_CARB_TABLE_PSI = [
  [5.2, 7.2, 9.1, 11.1, 13.0],
  [6.1, 8.2, 10.2, 12.3, 14.4],
  [7.0, 9.2, 11.3, 13.5, 15.6],
  [8.0, 10.2, 12.4, 14.6, 16.8],
  [8.8, 11.0, 13.3, 15.6, 17.8]
];
function tableLerpIndex(xs, x) {
  const clamped = Math.max(xs[0], Math.min(x, xs[xs.length - 1]));
  let i = 0;
  while (i < xs.length - 2 && clamped > xs[i + 1]) i++;
  return { i, t: (clamped - xs[i]) / (xs[i + 1] - xs[i]) };
}
// elevationM: sea-level gauge pressure adjusted ~1psi/2000ft (KB §8.1), since
// carbonation tracks absolute pressure and atmospheric pressure drops with elevation.
function forceCarbPressurePSI(tempC, targetVolumesCO2, elevationM) {
  const tempF = tempC * 9 / 5 + 32;
  const t = tableLerpIndex(FORCE_CARB_TABLE_TEMPS_F, tempF);
  const v = tableLerpIndex(FORCE_CARB_TABLE_VOLS, targetVolumesCO2);
  const row0 = FORCE_CARB_TABLE_PSI[t.i][v.i] + (FORCE_CARB_TABLE_PSI[t.i][v.i + 1] - FORCE_CARB_TABLE_PSI[t.i][v.i]) * v.t;
  const row1 = FORCE_CARB_TABLE_PSI[t.i + 1][v.i] + (FORCE_CARB_TABLE_PSI[t.i + 1][v.i + 1] - FORCE_CARB_TABLE_PSI[t.i + 1][v.i]) * v.t;
  const seaLevelPsi = row0 + (row1 - row0) * t.t;
  return seaLevelPsi + (elevationM || 0) / 609.6;
}
// true if the inputs fall outside the table's sourced range and had to be clamped.
function forceCarbInputOutOfRange(tempC, targetVolumesCO2) {
  const tempF = tempC * 9 / 5 + 32;
  return tempF < FORCE_CARB_TABLE_TEMPS_F[0] || tempF > FORCE_CARB_TABLE_TEMPS_F[4]
    || targetVolumesCO2 < FORCE_CARB_TABLE_VOLS[0] || targetVolumesCO2 > FORCE_CARB_TABLE_VOLS[4];
}

// Strike water temperature, KB §9. Implemented by converting to Palmer's own
// verified imperial formula internally rather than trusting a re-derived
// metric constant — see KB §9.2 for why the naive metric carry-over is wrong.
function strikeWaterTempC(targetMashC, grainTempC, ratioLPerKg) {
  const toF = c => c * 9 / 5 + 32;
  const toC = f => (f - 32) * 5 / 9;
  const qtPerLb = ratioLPerKg / 2.0863511130048327; // L/kg -> qt/lb
  const targetF = toF(targetMashC), grainF = toF(grainTempC);
  const strikeF = (0.2 / qtPerLb) * (targetF - grainF) + targetF;
  return toC(strikeF);
}

// Pitch rate / cell count, KB §11.1 — Mr. Malty (Zainasheff) target rates
const PITCH_RATE = { ale: 0.75, lager: 1.5 }; // million cells/mL/°Plato
function targetPitchCellsBillions(volumeL, og, style) {
  const plato = sgToPlato(og);
  const volumeMl = volumeL * 1000;
  return (PITCH_RATE[style] * volumeMl * plato) / 1000; // millions -> billions
}

// Refractometer FG correction (Sean Terrill), KB §12.2
function refractometerCorrectedFG(origBrix, finalBrix) {
  return 1.0000 - 0.00085683 * origBrix + 0.0034941 * finalBrix;
}

// Projects an FG range (from the yeast's attenuation range) and how many more
// days until each end of that range is reached, by linearly extrapolating the
// fermentation rate seen between the first and latest gravity reading. This is
// a deliberate simplification — real fermentation slows over time (S-curve,
// not linear) — so it's framed as an estimate assuming the CURRENT rate holds,
// not a kinetic model. Returns null if there's no measurable drop yet (too
// early, or stalled).
function projectFermentation(ogSg, currentSg, daysElapsed, attenuationLowPct, attenuationHighPct) {
  if (daysElapsed <= 0) return null;
  const ratePerDay = (ogSg - currentSg) * 1000 / daysElapsed;
  if (ratePerDay <= 0) return null;
  const fgAtLowAtt = fgFromAttenuation(ogSg, attenuationLowPct); // less attenuation -> higher FG, reached sooner
  const fgAtHighAtt = fgFromAttenuation(ogSg, attenuationHighPct); // more attenuation -> lower FG, reached later
  const currentPoints = (currentSg - 1) * 1000;
  const daysToEarliest = Math.max(0, (currentPoints - (fgAtLowAtt - 1) * 1000) / ratePerDay);
  const daysToLatest = Math.max(0, (currentPoints - (fgAtHighAtt - 1) * 1000) / ratePerDay);
  return { fgLow: fgAtHighAtt, fgHigh: fgAtLowAtt, daysToEarliest, daysToLatest, ratePerDay };
}

// Brewhouse efficiency back-calculated from an actual brew day, KB §10.1
function brewhouseEfficiency(measuredOG, batchVolumeL, grains) {
  const actualPoints = (measuredOG - 1) * 1000 * batchVolumeL;
  const theoreticalPoints = grains.reduce((sum, g) => sum + g.weightKg * g.ppg * PPG_TO_PKL, 0);
  return actualPoints / theoreticalPoints;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PPG_TO_PKL, ogFromGrainBill, pointsFromGrainBill,
    apparentAttenuation, fgFromAttenuation,
    sgToPlato, platoToSG, realExtract, realAttenuation,
    abvSimple, abvHighGravity,
    tinsethBignessFactor, tinsethBoilTimeFactor, tinsethUtilization, tinsethIBU,
    moreySRM, srmToEBC, srmToHex,
    residualAlkalinity,
    residualCO2FromTempC, primingSugarGrams, PRIMING_CO2_FRACTION,
    forceCarbPressurePSI, forceCarbInputOutOfRange, FORCE_CARB_TABLE_TEMPS_F, FORCE_CARB_TABLE_VOLS,
    strikeWaterTempC,
    targetPitchCellsBillions, PITCH_RATE,
    refractometerCorrectedFG,
    projectFermentation,
    brewhouseEfficiency
  };
}
