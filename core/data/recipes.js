// BeerOS built-in recipe library. Every recipe's OG/FG/ABV/IBU/SRM is
// computed from its grainBill/hopSchedule via core/domain/calculators.js
// (see core/data/recipes.verify.js) and checked against real BJCP 2021
// vital statistics — nothing here is hand-typed or assumed.

function BUILTIN_RECIPES() {
  return [
    {
      id: 'apa-us', name: 'American Pale Ale', style: 'American Pale Ale', styleCode: '18B',
      region: 'US', difficulty: 'Beginner', volumeL: 20, mashEfficiency: 0.71,
      mashTempC: 67, fermentTempC: { low: 18, high: 20 },
      bjcpRange: { og: [1.045, 1.060], fg: [1.010, 1.015], abv: [4.5, 6.2], ibu: [30, 50], srm: [5, 10] },
      grainBill: [
        { name: '2-Row Pale Malt', weightKg: 4.08, ppg: 37, lovibond: 2 },
        { name: 'Crystal 40L', weightKg: 0.34, ppg: 35, lovibond: 40 },
        { name: 'Crystal 10L', weightKg: 0.23, ppg: 35, lovibond: 10 }
      ],
      hopSchedule: [
        { name: 'Centennial', weightG: 28, aaPct: 10.5, minutes: 60, purpose: 'Bittering' },
        { name: 'Cascade', weightG: 14, aaPct: 6.0, minutes: 15, purpose: 'Flavor' },
        { name: 'Cascade', weightG: 28, aaPct: 6.0, minutes: 5, purpose: 'Aroma' }
      ],
      yeast: { name: 'American Ale (e.g. Fermentis US-05)', attenuationLow: 70, attenuationHigh: 75, tempLowC: 18, tempHighC: 22 },
      description: 'The style that defined American craft brewing — clean 2-row base, a touch of crystal malt, citrusy American hops throughout.',
      processNotes: 'Middle-of-the-road mash temp for a balanced, forgiving first all-grain brew. Ferment clean and let the malt/hop balance carry the beer.',
      tags: ['Beginner-friendly', 'Hoppy', 'American classic']
    },
    {
      id: 'ipa-us', name: 'American IPA', style: 'American IPA', styleCode: '21A',
      region: 'US', difficulty: 'Intermediate', volumeL: 20, mashEfficiency: 0.71,
      mashTempC: 65.5, fermentTempC: { low: 19, high: 21 },
      bjcpRange: { og: [1.056, 1.070], fg: [1.008, 1.014], abv: [5.5, 7.5], ibu: [40, 70], srm: [6, 14] },
      grainBill: [
        { name: '2-Row Pale Malt', weightKg: 5.44, ppg: 37, lovibond: 2 },
        { name: 'Munich Malt (light)', weightKg: 0.34, ppg: 37, lovibond: 9 },
        { name: 'Crystal 40L', weightKg: 0.23, ppg: 35, lovibond: 40 }
      ],
      hopSchedule: [
        { name: 'Columbus/CTZ', weightG: 20, aaPct: 15.0, minutes: 60, purpose: 'Bittering' },
        { name: 'Centennial', weightG: 25, aaPct: 12.0, minutes: 15, purpose: 'Flavor' },
        { name: 'Citra', weightG: 40, aaPct: 12.0, minutes: 5, purpose: 'Whirlpool/aroma' }
      ],
      dryHop: [{ name: 'Citra + Mosaic', weightG: 60 }],
      yeast: { name: 'Clean American Ale (e.g. Fermentis US-05)', attenuationLow: 76, attenuationHigh: 82, tempLowC: 19, tempHighC: 21 },
      description: 'Bigger malt backbone than a Pale Ale to support an aggressive three-stage hop schedule — clean bittering, mid-boil flavor, big whirlpool aroma.',
      processNotes: 'Slightly lower mash temp to dry the finish and let hop character lead. Dry hop only after fermentation is confirmed complete to avoid compounding hop creep.',
      tags: ['Hop-forward', 'American classic', 'Drink fresh']
    },
    {
      id: 'brown-us', name: 'American Brown Ale', style: 'American Brown Ale', styleCode: '19C',
      region: 'US', difficulty: 'Beginner', volumeL: 20, mashEfficiency: 0.71,
      mashTempC: 68, fermentTempC: { low: 18, high: 20 },
      bjcpRange: { og: [1.045, 1.060], fg: [1.010, 1.016], abv: [4.3, 6.2], ibu: [20, 30], srm: [18, 35] },
      grainBill: [
        { name: '2-Row Pale Malt', weightKg: 3.86, ppg: 37, lovibond: 2 },
        { name: 'Munich Malt', weightKg: 0.45, ppg: 37, lovibond: 9 },
        { name: 'Crystal 60L', weightKg: 0.34, ppg: 35, lovibond: 60 },
        { name: 'Crystal 120L', weightKg: 0.23, ppg: 35, lovibond: 120 },
        { name: 'Chocolate Malt', weightKg: 0.16, ppg: 28, lovibond: 400 }
      ],
      hopSchedule: [
        { name: 'East Kent Golding', weightG: 25, aaPct: 7.0, minutes: 60, purpose: 'Bittering' },
        { name: 'Fuggle', weightG: 14, aaPct: 5.5, minutes: 15, purpose: 'Light flavor' }
      ],
      yeast: { name: 'American Ale, low-ester (e.g. Fermentis US-05)', attenuationLow: 70, attenuationHigh: 72, tempLowC: 18, tempHighC: 20 },
      description: 'Malt-forward and moderate on bitterness — crystal and chocolate malt layer caramel and light roast character without tipping into porter territory.',
      processNotes: 'Deliberately higher mash temp for body and residual sweetness that supports the malt-forward character.',
      tags: ['Malty', 'Sessionable', 'Beginner-friendly']
    },
    {
      id: 'helles-de', name: 'Munich Helles', style: 'Munich Helles', styleCode: '4A',
      region: 'DE', difficulty: 'Intermediate', volumeL: 20, mashEfficiency: 0.71,
      mashTempC: 65.5, fermentTempC: { low: 9, high: 10 },
      bjcpRange: { og: [1.044, 1.048], fg: [1.006, 1.012], abv: [4.7, 5.4], ibu: [16, 22], srm: [3, 5] },
      grainBill: [
        { name: 'Pilsner Malt', weightKg: 4.0, ppg: 37, lovibond: 2.0 },
        { name: 'Munich Malt (light)', weightKg: 0.34, ppg: 37, lovibond: 8 }
      ],
      hopSchedule: [
        { name: 'Hallertau Mittelfrüh', weightG: 28, aaPct: 4.0, minutes: 60, purpose: 'Bittering' },
        { name: 'Hallertau Mittelfrüh', weightG: 12, aaPct: 4.0, minutes: 20, purpose: 'Light noble flavor' }
      ],
      yeast: { name: 'German Lager (e.g. Fermentis W-34/70)', attenuationLow: 74, attenuationHigh: 79, tempLowC: 9, tempHighC: 13 },
      description: 'The patient lager — clean, malty, and unmistakably German, with a delicate noble-hop balance and nothing else to hide behind.',
      processNotes: 'Cold ferment (9-10°C), diacetyl rest near the end of fermentation, then several weeks of cold lagering before packaging — plan the schedule and fridge space before brew day.',
      tags: ['Lager', 'Patient brew', 'Clean & malty']
    },
    {
      id: 'tripel-be', name: 'Belgian Tripel', style: 'Belgian Tripel', styleCode: '26C',
      region: 'BE', difficulty: 'Advanced', volumeL: 20, mashEfficiency: 0.71,
      mashTempC: 64.5, fermentTempC: { low: 20, high: 24 },
      bjcpRange: { og: [1.075, 1.085], fg: [1.008, 1.014], abv: [7.5, 9.5], ibu: [20, 40], srm: [4.5, 7] },
      grainBill: [
        { name: 'Pilsner Malt', weightKg: 6.12, ppg: 37, lovibond: 2.0 },
        { name: 'Dextrose (candi sugar sub)', weightKg: 1.0, ppg: 46, lovibond: 0 }
      ],
      sugarPctOfFermentables: 14,
      hopSchedule: [
        { name: 'Styrian Golding', weightG: 50, aaPct: 4.0, minutes: 60, purpose: 'Bittering' },
        { name: 'Saaz', weightG: 20, aaPct: 4.0, minutes: 15, purpose: 'Light continental flavor' }
      ],
      yeast: { name: 'Belgian Abbey (e.g. Wyeast 1214 or Lallemand Abbaye)', attenuationLow: 80, attenuationHigh: 88, tempLowC: 20, tempHighC: 26, notes: 'Blended attenuation runs higher than the yeast\'s grain-only rating because the 14% dextrose addition ferments out essentially completely, pulling the overall apparent attenuation up.' },
      description: 'Deceptively drinkable — a substantial sugar addition keeps the body light and dry despite the strength, exactly as the style demands.',
      processNotes: 'Low mash temp maximizes fermentability; ferment warm on purpose (rising freely into the low 20s°C) so the yeast’s ester/phenol character — the entire point of the style — comes through.',
      tags: ['Belgian', 'Strong ale', 'Yeast-driven']
    },
    {
      id: 'stout-us', name: 'American Stout', style: 'American Stout', styleCode: '20B',
      region: 'US', difficulty: 'Intermediate', volumeL: 20, mashEfficiency: 0.71,
      mashTempC: 67, fermentTempC: { low: 18, high: 20 },
      bjcpRange: { og: [1.050, 1.075], fg: [1.010, 1.022], abv: [5, 7], ibu: [35, 75], srm: [30, 40] },
      grainBill: [
        { name: '2-Row Pale Malt', weightKg: 5.0, ppg: 37, lovibond: 2 },
        { name: 'Crystal 60L', weightKg: 0.45, ppg: 35, lovibond: 60 },
        { name: 'Roasted Barley', weightKg: 0.35, ppg: 25, lovibond: 300 },
        { name: 'Chocolate Malt', weightKg: 0.25, ppg: 28, lovibond: 400 }
      ],
      hopSchedule: [
        { name: 'Cascade', weightG: 45, aaPct: 6.0, minutes: 60, purpose: 'Bittering' },
        { name: 'Centennial', weightG: 20, aaPct: 10.0, minutes: 15, purpose: 'Flavor' }
      ],
      yeast: { name: 'American Ale (e.g. Fermentis US-05)', attenuationLow: 75, attenuationHigh: 80, tempLowC: 18, tempHighC: 22 },
      description: 'Roast and chocolate character pushed harder than an English/Irish stout, with a more assertive American hop presence to match.',
      processNotes: 'Standard single-infusion mash; ferment clean like a hopped-up American ale — no lagering, no nitrogen dispense.',
      tags: ['Dark', 'Roasty', 'American']
    },
    {
      id: 'neipa-us', name: 'New England IPA (Hazy IPA)', style: 'Hazy IPA', styleCode: '21C',
      region: 'US', difficulty: 'Intermediate', volumeL: 20, mashEfficiency: 0.71,
      mashTempC: 67, fermentTempC: { low: 18, high: 22 },
      bjcpRange: { og: [1.060, 1.085], fg: [1.010, 1.015], abv: [6, 9], ibu: [25, 60], srm: [3, 7] },
      grainBill: [
        { name: '2-Row Pale Malt', weightKg: 5.2, ppg: 37, lovibond: 2 },
        { name: 'Flaked Oats', weightKg: 0.9, ppg: 33, lovibond: 1 },
        { name: 'Flaked Wheat', weightKg: 0.6, ppg: 34, lovibond: 2 }
      ],
      hopSchedule: [
        { name: 'Citra', weightG: 16, aaPct: 12.0, minutes: 60, purpose: 'Light bittering' },
        { name: 'Mosaic', weightG: 63, aaPct: 11.5, minutes: 5, purpose: 'Whirlpool' },
        { name: 'Galaxy', weightG: 42, aaPct: 14.0, minutes: 5, purpose: 'Whirlpool' }
      ],
      dryHop: [{ name: 'Citra + Mosaic + Galaxy', weightG: 120 }],
      yeast: { name: 'London Ale III (e.g. Wyeast 1318 or Omega OYL-052)', attenuationLow: 80, attenuationHigh: 86, tempLowC: 18, tempHighC: 22 },
      description: 'Minimal bittering, massive whirlpool and dry-hop charges — haze and juicy hop aroma from protein-rich oats/wheat plus a low-flocculation yeast, not from any starch trick.',
      processNotes: 'Consider dry-hopping in two rounds, with at least one addition during active fermentation ("biotransformation") for extra juiciness. Confirm fermentation is fully complete before packaging — hop creep from the heavy dry hop can restart fermentation and over-carbonate bottles.',
      tags: ['Hazy', 'Juicy', 'Modern American']
    },
    {
      id: 'calcommon-us', name: 'California Common', style: 'California Common', styleCode: '19B',
      region: 'US', difficulty: 'Intermediate', volumeL: 20, mashEfficiency: 0.71,
      mashTempC: 66, fermentTempC: { low: 16, high: 18 },
      bjcpRange: { og: [1.048, 1.054], fg: [1.011, 1.014], abv: [4.5, 5.5], ibu: [30, 45], srm: [9, 14] },
      grainBill: [
        { name: '2-Row Pale Malt', weightKg: 3.75, ppg: 37, lovibond: 2 },
        { name: 'Crystal 40L', weightKg: 0.96, ppg: 35, lovibond: 40 }
      ],
      hopSchedule: [
        { name: 'Northern Brewer', weightG: 32, aaPct: 8.0, minutes: 60, purpose: 'Bittering' },
        { name: 'Northern Brewer', weightG: 18, aaPct: 8.0, minutes: 15, purpose: 'Flavor' }
      ],
      yeast: { name: 'California Lager (e.g. Wyeast 2112 or WLP810)', attenuationLow: 72, attenuationHigh: 78, tempLowC: 15, tempHighC: 18 },
      description: 'A lager yeast fermented warm, ale-style — historically brewed in shallow open coolships in San Francisco before refrigeration was available. Piney/minty Northern Brewer hop character is the signature.',
      processNotes: 'No diacetyl rest or extended lagering typically used, despite being a lager strain — that\'s the whole point of the style.',
      tags: ['American original', 'Historic', 'Lager yeast, ale temps']
    },
    {
      id: 'pils-de', name: 'German Pilsner', style: 'German Pils', styleCode: '5D',
      region: 'DE', difficulty: 'Intermediate', volumeL: 20, mashEfficiency: 0.71,
      mashTempC: 65, fermentTempC: { low: 9, high: 13 },
      bjcpRange: { og: [1.044, 1.050], fg: [1.008, 1.013], abv: [4.4, 5.2], ibu: [22, 40], srm: [2, 4] },
      grainBill: [
        { name: 'Pilsner Malt', weightKg: 4.3, ppg: 37, lovibond: 1.6 }
      ],
      hopSchedule: [
        { name: 'Hallertau Mittelfrüh', weightG: 51, aaPct: 4.0, minutes: 60, purpose: 'Bittering' },
        { name: 'Tettnang', weightG: 29, aaPct: 4.0, minutes: 15, purpose: 'Aroma' }
      ],
      yeast: { name: 'Bohemian Lager (e.g. Wyeast 2124)', attenuationLow: 75, attenuationHigh: 80, tempLowC: 9, tempHighC: 13 },
      description: '100% Pilsner malt, noble hops, and nothing else to hide behind — crisp, clean, and assertively (but cleanly) bitter.',
      processNotes: 'Full lager regimen: primary fermentation cold, diacetyl rest, then several weeks of cold lagering near 0°C before packaging.',
      tags: ['Lager', 'Noble hops', 'Crisp']
    },
    {
      id: 'marzen-de', name: 'Märzen (Oktoberfest)', style: 'Märzen', styleCode: '6A',
      region: 'DE', difficulty: 'Intermediate', volumeL: 20, mashEfficiency: 0.71,
      mashTempC: 66, fermentTempC: { low: 9, high: 13 },
      bjcpRange: { og: [1.054, 1.060], fg: [1.010, 1.014], abv: [5.6, 6.3], ibu: [18, 24], srm: [8, 17] },
      grainBill: [
        { name: 'Munich Malt', weightKg: 4.08, ppg: 37, lovibond: 9 },
        { name: 'Pilsner Malt', weightKg: 0.95, ppg: 37, lovibond: 1.6 },
        { name: 'CaraMunich', weightKg: 0.19, ppg: 34, lovibond: 60 }
      ],
      hopSchedule: [
        { name: 'Hallertau Mittelfrüh', weightG: 49, aaPct: 4.0, minutes: 60, purpose: 'Bittering' }
      ],
      yeast: { name: 'Bavarian Lager (e.g. Wyeast 2206)', attenuationLow: 76, attenuationHigh: 82, tempLowC: 9, tempHighC: 13 },
      description: 'Munich malt is the star — rich, toasty, bready maltiness with just enough noble hop bittering to keep it in balance. Hops are restrained on purpose.',
      processNotes: 'A decoction mash is traditional and considered to deepen the Munich malt character. Full lager fermentation and extended cold lagering — originally brewed in March and cellared through summer.',
      tags: ['Lager', 'Malty', 'Oktoberfest']
    },
    {
      id: 'hefe-de', name: 'Hefeweizen', style: 'Weissbier', styleCode: '10A',
      region: 'DE', difficulty: 'Beginner', volumeL: 20, mashEfficiency: 0.71,
      mashTempC: 66, fermentTempC: { low: 18, high: 22 },
      bjcpRange: { og: [1.044, 1.053], fg: [1.008, 1.014], abv: [4.3, 5.6], ibu: [8, 15], srm: [2, 6] },
      grainBill: [
        { name: 'Wheat Malt', weightKg: 2.32, ppg: 38, lovibond: 2 },
        { name: 'Pilsner Malt', weightKg: 2.05, ppg: 37, lovibond: 1.6 }
      ],
      hopSchedule: [
        { name: 'Hallertau', weightG: 25, aaPct: 4.0, minutes: 60, purpose: 'Bittering only' }
      ],
      yeast: { name: 'Weihenstephan Weizen (e.g. Wyeast 3068)', attenuationLow: 74, attenuationHigh: 80, tempLowC: 18, tempHighC: 22 },
      description: 'The yeast strain, not the hops or grain bill, defines this style — its banana (isoamyl acetate) and clove (4-vinyl guaiacol) character is the whole point.',
      processNotes: 'Fermentation temperature controls the banana:clove ratio — warmer pulls more banana. Best served fresh; doesn\'t age well. Traditionally a decoction mash, though a modern single-infusion works fine.',
      tags: ['Wheat beer', 'Beginner-friendly', 'Yeast-driven']
    },
    {
      id: 'esb-uk', name: 'Strong Bitter (ESB)', style: 'Strong Bitter', styleCode: '11C',
      region: 'UK', difficulty: 'Intermediate', volumeL: 20, mashEfficiency: 0.71,
      mashTempC: 67, fermentTempC: { low: 18, high: 20 },
      bjcpRange: { og: [1.048, 1.060], fg: [1.010, 1.016], abv: [4.6, 6.2], ibu: [30, 50], srm: [8, 18] },
      grainBill: [
        { name: 'Maris Otter Pale Ale Malt', weightKg: 4.2, ppg: 37, lovibond: 3 },
        { name: 'Crystal 40L', weightKg: 1.06, ppg: 35, lovibond: 40 }
      ],
      hopSchedule: [
        { name: 'East Kent Golding', weightG: 58, aaPct: 5.5, minutes: 60, purpose: 'Bittering' },
        { name: 'Fuggle', weightG: 26, aaPct: 4.5, minutes: 10, purpose: 'Flavor/dry hop' }
      ],
      yeast: { name: 'London ESB Ale (e.g. Wyeast 1968)', attenuationLow: 73, attenuationHigh: 79, tempLowC: 18, tempHighC: 20 },
      description: '"ESB" isn\'t an official BJCP style name (it\'s a Fuller\'s trademark) — this is the Strong Bitter category the American-craft "ESB" style maps to. Malt-forward with earthy, floral English hop character.',
      processNotes: 'Burton-style versions use high-sulfate water to sharpen the bitterness. Traditionally cask-conditioned (real ale) rather than force-carbonated.',
      tags: ['English', 'Malty', 'Session-strong']
    },
    {
      id: 'irishstout-ie', name: 'Irish Stout', style: 'Irish Stout', styleCode: '15B',
      region: 'IE', difficulty: 'Beginner', volumeL: 20, mashEfficiency: 0.71,
      mashTempC: 66, fermentTempC: { low: 17, high: 21 },
      bjcpRange: { og: [1.036, 1.044], fg: [1.007, 1.011], abv: [3.8, 5], ibu: [25, 45], srm: [25, 40] },
      grainBill: [
        { name: 'Pale Ale Malt', weightKg: 2.35, ppg: 37, lovibond: 3 },
        { name: 'Flaked Barley', weightKg: 0.97, ppg: 32, lovibond: 1 },
        { name: 'Roasted Barley', weightKg: 0.68, ppg: 25, lovibond: 300 }
      ],
      hopSchedule: [
        { name: 'East Kent Golding', weightG: 50, aaPct: 5.5, minutes: 60, purpose: 'Bittering' }
      ],
      yeast: { name: 'Irish Ale (e.g. Wyeast 1084)', attenuationLow: 74, attenuationHigh: 81, tempLowC: 17, tempHighC: 21 },
      description: 'Roasted (unmalted) barley — not chocolate or black malt — is what gives this its dry, coffee-ish roast bite. Low gravity, easy-drinking, classically served on nitro for a creamy cascading head.',
      processNotes: 'Nitrogen dispense is a serving-side detail (needs a nitro faucet/widget), not a brewing step — the beer itself is brewed like any other ale.',
      tags: ['Dark', 'Sessionable', 'Beginner-friendly']
    },
    {
      id: 'dubbel-be', name: 'Belgian Dubbel', style: 'Belgian Dubbel', styleCode: '26B',
      region: 'BE', difficulty: 'Advanced', volumeL: 20, mashEfficiency: 0.71,
      mashTempC: 66, fermentTempC: { low: 20, high: 25 },
      bjcpRange: { og: [1.062, 1.075], fg: [1.008, 1.018], abv: [6.0, 7.6], ibu: [15, 25], srm: [10, 17] },
      grainBill: [
        { name: 'Pilsner Malt', weightKg: 5.5, ppg: 37, lovibond: 1.6 },
        { name: 'Munich Malt', weightKg: 0.35, ppg: 37, lovibond: 9 },
        { name: 'Special B', weightKg: 0.14, ppg: 34, lovibond: 180 },
        { name: 'Dark Candi Syrup (D-90)', weightKg: 0.27, ppg: 36, lovibond: 90 }
      ],
      hopSchedule: [
        { name: 'Styrian Golding', weightG: 46, aaPct: 4.5, minutes: 60, purpose: 'Bittering (background only)' }
      ],
      yeast: { name: 'Belgian Abbey (e.g. Wyeast 1214)', attenuationLow: 78, attenuationHigh: 84, tempLowC: 20, tempHighC: 26 },
      description: 'Dark fruit — raisin, plum, fig — comes from dark candi syrup and warm-fermentation esters, not roasted grain. Keep specialty malt % modest to avoid heaviness.',
      processNotes: 'Ferment warm, allowed to free-rise, for the ester/phenol complexity that defines the style.',
      tags: ['Belgian', 'Dark ale', 'Trappist-inspired']
    },
    {
      id: 'bga-be', name: 'Belgian Golden Strong Ale', style: 'Belgian Golden Strong Ale', styleCode: '25C',
      region: 'BE', difficulty: 'Advanced', volumeL: 20, mashEfficiency: 0.71,
      mashTempC: 64, fermentTempC: { low: 18, high: 27 },
      bjcpRange: { og: [1.070, 1.095], fg: [1.005, 1.016], abv: [7.5, 10.5], ibu: [22, 35], srm: [3, 6] },
      grainBill: [
        { name: 'Pilsner Malt', weightKg: 5.84, ppg: 37, lovibond: 1.6 },
        { name: 'Dextrose (clear candi sub)', weightKg: 1.36, ppg: 46, lovibond: 0 }
      ],
      sugarPctOfFermentables: 19,
      hopSchedule: [
        { name: 'Saaz', weightG: 70, aaPct: 4.0, minutes: 60, purpose: 'Bittering' },
        { name: 'Styrian Golding', weightG: 23, aaPct: 4.5, minutes: 15, purpose: 'Light flavor' }
      ],
      yeast: { name: 'Belgian Strong Ale (e.g. Wyeast 1388)', attenuationLow: 82, attenuationHigh: 90, tempLowC: 18, tempHighC: 27 },
      description: 'Nearly all-Pilsner-malt grist plus a large sugar addition and a highly attenuative yeast add up to the lightest body-to-ABV ratio of any Belgian style — deceptively easy to drink for its strength.',
      processNotes: 'Attenuation is exceptionally high because so much of the fermentables come from 100%-fermentable sugar. Ferment warm and give it time to finish fully dry.',
      tags: ['Belgian', 'Strong ale', 'High attenuation']
    },
    {
      id: 'blond-be', name: 'Belgian Blond Ale', style: 'Belgian Blond Ale', styleCode: '25A',
      region: 'BE', difficulty: 'Intermediate', volumeL: 20, mashEfficiency: 0.71,
      mashTempC: 65, fermentTempC: { low: 18, high: 24 },
      bjcpRange: { og: [1.062, 1.075], fg: [1.008, 1.018], abv: [6.0, 7.5], ibu: [15, 30], srm: [4, 6] },
      grainBill: [
        { name: 'Pilsner Malt', weightKg: 5.28, ppg: 37, lovibond: 1.6 },
        { name: 'Aromatic Malt', weightKg: 0.25, ppg: 36, lovibond: 20 },
        { name: 'Dextrose', weightKg: 0.59, ppg: 46, lovibond: 0 }
      ],
      hopSchedule: [
        { name: 'Saaz', weightG: 45, aaPct: 4.0, minutes: 60, purpose: 'Bittering (background)' },
        { name: 'Styrian Golding', weightG: 23, aaPct: 4.5, minutes: 15, purpose: 'Light flavor' }
      ],
      yeast: { name: 'Belgian Abbey (e.g. Wyeast 1214) or Belgian Ardennes (Wyeast 3522)', attenuationLow: 78, attenuationHigh: 84, tempLowC: 18, tempHighC: 26 },
      description: 'The session-strength entry point to the Belgian strong-ale family — same "sugar for lightness" trick as the Tripel/Dubbel, at a friendlier gravity.',
      processNotes: 'Avoid crystal/dark malts, which push this out of style — the aim is light body and easy drinkability, not caramel richness.',
      tags: ['Belgian', 'Sessionable', 'Approachable']
    },
    {
      id: 'saison-be', name: 'Saison', style: 'Saison', styleCode: '25B',
      region: 'BE', difficulty: 'Advanced', volumeL: 20, mashEfficiency: 0.71,
      mashTempC: 64, fermentTempC: { low: 21, high: 32 },
      bjcpRange: { og: [1.048, 1.065], fg: [1.002, 1.008], abv: [5.0, 7.0], ibu: [20, 35], srm: [5, 14] },
      grainBill: [
        { name: 'Pilsner Malt', weightKg: 3.81, ppg: 37, lovibond: 1.6 },
        { name: 'Wheat Malt', weightKg: 0.71, ppg: 38, lovibond: 2 },
        { name: 'CaraMunich (amber saison variant)', weightKg: 0.44, ppg: 34, lovibond: 60 },
        { name: 'Dextrose', weightKg: 0.36, ppg: 46, lovibond: 0 }
      ],
      hopSchedule: [
        { name: 'Saaz', weightG: 48, aaPct: 4.0, minutes: 60, purpose: 'Bittering' },
        { name: 'Styrian Golding', weightG: 27, aaPct: 4.5, minutes: 15, purpose: 'Herbal flavor' }
      ],
      yeast: { name: 'Belgian Saison (e.g. Wyeast 3724)', attenuationLow: 84, attenuationHigh: 90, tempLowC: 24, tempHighC: 35 },
      description: 'Bone-dry and peppery — the driest style in this whole library. Sugar addition and an extremely attenuative yeast strain drive the finish down to almost nothing.',
      processNotes: 'Needs to be pushed WARM — often let free-rise into the high 20s or even 30s°C — to avoid stalling partway through and to develop the style\'s signature spicy, dry character. The opposite of most "ferment it cool" advice.',
      tags: ['Belgian', 'Farmhouse', 'Bone-dry', 'Warm ferment']
    },
    {
      id: 'wit-be', name: 'Witbier', style: 'Witbier', styleCode: '24A',
      region: 'BE', difficulty: 'Intermediate', volumeL: 20, mashEfficiency: 0.68,
      mashTempC: 65, fermentTempC: { low: 18, high: 22 },
      bjcpRange: { og: [1.044, 1.052], fg: [1.008, 1.012], abv: [4.5, 5.5], ibu: [8, 20], srm: [2, 4] },
      grainBill: [
        { name: 'Pilsner Malt', weightKg: 2.3, ppg: 37, lovibond: 1.6 },
        { name: 'Unmalted Wheat (raw)', weightKg: 2.1, ppg: 36, lovibond: 2 },
        { name: 'Flaked Oats', weightKg: 0.35, ppg: 33, lovibond: 1 }
      ],
      hopSchedule: [
        { name: 'Hallertau', weightG: 30, aaPct: 4.0, minutes: 60, purpose: 'Bittering only' }
      ],
      yeast: { name: 'Belgian Witbier (e.g. Wyeast 3944)', attenuationLow: 76, attenuationHigh: 82, tempLowC: 17, tempHighC: 24 },
      description: 'Unmalted wheat and raw oats build the hazy, silky body; coriander seed and dried bitter (Curaçao) orange peel — not hops — carry the aroma.',
      processNotes: 'Add ~15g crushed coriander seed and ~15g dried bitter orange peel at 10 minutes remaining in the boil. Unmalted wheat has no husk, so expect a stickier lauter — mash thick and consider rice hulls if using a traditional lauter tun.',
      tags: ['Belgian', 'Wheat beer', 'Spiced']
    },
    {
      id: 'bdsa-be', name: 'Belgian Dark Strong Ale', style: 'Belgian Dark Strong Ale', styleCode: '26D',
      region: 'BE', difficulty: 'Advanced', volumeL: 20, mashEfficiency: 0.71,
      mashTempC: 64, fermentTempC: { low: 20, high: 26 },
      bjcpRange: { og: [1.075, 1.110], fg: [1.010, 1.024], abv: [8.0, 12.0], ibu: [20, 35], srm: [12, 22] },
      grainBill: [
        { name: 'Pilsner Malt', weightKg: 6.87, ppg: 37, lovibond: 1.6 },
        { name: 'Munich Malt', weightKg: 0.14, ppg: 37, lovibond: 9 },
        { name: 'Special B', weightKg: 0.09, ppg: 34, lovibond: 180 },
        { name: 'Dark Candi Syrup (D-180)', weightKg: 0.31, ppg: 36, lovibond: 180 }
      ],
      hopSchedule: [
        { name: 'Styrian Golding', weightG: 78, aaPct: 4.5, minutes: 60, purpose: 'Bittering (background)' }
      ],
      yeast: { name: 'Belgian Abbey / Trappist High Gravity (e.g. Wyeast 3787)', attenuationLow: 78, attenuationHigh: 85, tempLowC: 20, tempHighC: 27 },
      description: 'The quadrupel end of the Belgian spectrum — deep dark-fruit, caramel and toffee complexity from dark candi syrup, not from roasted malt, so it stays smooth rather than tasting burnt.',
      processNotes: 'Allow fermentation to warm progressively through the vigorous phase to fully attenuate this high-gravity wort. Give it real conditioning time — this style rewards months, not weeks.',
      tags: ['Belgian', 'Strong ale', 'Sipper']
    },
    {
      id: 'flandersred-be', name: 'Flanders Red Ale', style: 'Flanders Red Ale', styleCode: '23B',
      region: 'BE', difficulty: 'Advanced', volumeL: 20, mashEfficiency: 0.71,
      mashTempC: 67, fermentTempC: { low: 18, high: 24 },
      bjcpRange: { og: [1.048, 1.057], fg: [1.002, 1.012], abv: [4.6, 6.5], ibu: [10, 25], srm: [10, 17] },
      grainBill: [
        { name: 'Vienna Malt', weightKg: 3.6, ppg: 36, lovibond: 3.5 },
        { name: 'Munich Malt', weightKg: 0.9, ppg: 37, lovibond: 9 },
        { name: 'CaraMunich', weightKg: 0.3, ppg: 34, lovibond: 60 },
        { name: 'Special B', weightKg: 0.15, ppg: 34, lovibond: 180 }
      ],
      hopSchedule: [
        { name: 'Aged/low-alpha Styrian Golding', weightG: 44, aaPct: 3.5, minutes: 60, purpose: 'Minimal preservative bittering only' }
      ],
      yeast: { name: 'Mixed culture (e.g. Wyeast 3763 Roeselare Ale Blend — Belgian ale strain + Brettanomyces + Lactobacillus + Pediococcus)', attenuationLow: 83, attenuationHigh: 90, tempLowC: 18, tempHighC: 24 },
      description: 'By far the most involved recipe in this library — sour-cherry, vinous, barnyard complexity from a mixed fermentation culture, not from any single ingredient.',
      processNotes: 'Ferment primary with a clean Belgian ale strain, then rack onto the mixed culture (or pitch it alongside) for extended souring/aging — traditionally many months to ~2 years, historically in oak foeders. Needs dedicated equipment (a vessel you\'re willing to dedicate to souring) to avoid cross-contaminating future clean batches.',
      tags: ['Belgian', 'Sour', 'Advanced', 'Long-term project']
    },

    // ==================== COMMERCIAL CLONE-INSPIRED RECIPES ====================
    // These are homebrew APPROXIMATIONS of well-known commercial beers, built the
    // same way every published "clone recipe" (BYO magazine, CloneBrews, etc.) is:
    // from the beer's real published ABV, its style category, and publicly
    // discussed general character (color, bitterness estimates, known adjuncts/
    // hop varieties where the brewery itself has publicized them). None of this
    // is or claims to be the actual proprietary commercial formula — nobody
    // outside the brewery has that. Recipes/ingredient lists are not copyrightable,
    // and "clone" recipes are standard, legal homebrewing practice.
    {
      id: 'stella-clone-be', name: 'Stella Artois-Inspired Pale Lager', style: 'International Pale Lager', styleCode: '2A',
      region: 'BE', difficulty: 'Intermediate', volumeL: 20, mashEfficiency: 0.71, commercialInspiration: true, realAbv: 5.2,
      mashTempC: 65, fermentTempC: { low: 9, high: 12 },
      bjcpRange: { og: [1.040, 1.050], fg: [1.004, 1.010], abv: [4.2, 5.3], ibu: [8, 18], srm: [2, 3.5] },
      grainBill: [
        { name: 'Pilsner Malt', weightKg: 4.08, ppg: 37, lovibond: 1.6 },
        { name: 'Flaked Maize', weightKg: 0.5, ppg: 32, lovibond: 0 }
      ],
      hopSchedule: [
        { name: 'Saaz', weightG: 33, aaPct: 4.0, minutes: 60, purpose: 'Bittering' }
      ],
      yeast: { name: 'Clean Continental Lager (e.g. Wyeast 2278 or Saflager W-34/70)', attenuationLow: 78, attenuationHigh: 82, tempLowC: 9, tempHighC: 12 },
      description: 'A homebrew approximation of the classic Belgian "premium" pale lager character — clean, crisp, moderately bittered, with a touch of maize to lighten body. Not the actual AB InBev formula, which is proprietary.',
      processNotes: 'Full lager regimen: cold primary, diacetyl rest, several weeks cold lagering. Reported bitterness has reportedly dropped over the decades (~33 IBU in the 1970s to ~20 today per industry commentary) — this recipe targets the lighter modern end.',
      tags: ['Clone-inspired', 'Belgian lager', 'Session']
    },
    {
      id: 'jupiler-clone-be', name: 'Jupiler-Inspired Pale Lager', style: 'International Pale Lager', styleCode: '2A',
      region: 'BE', difficulty: 'Intermediate', volumeL: 20, mashEfficiency: 0.71, commercialInspiration: true, realAbv: 5.2,
      mashTempC: 65, fermentTempC: { low: 9, high: 12 },
      bjcpRange: { og: [1.040, 1.050], fg: [1.004, 1.010], abv: [4.2, 5.3], ibu: [8, 18], srm: [2, 3.5] },
      grainBill: [
        { name: 'Pilsner Malt', weightKg: 3.75, ppg: 37, lovibond: 1.6 },
        { name: 'Flaked Maize', weightKg: 0.88, ppg: 32, lovibond: 0 }
      ],
      hopSchedule: [
        { name: 'Saaz', weightG: 34, aaPct: 4.0, minutes: 60, purpose: 'Bittering' }
      ],
      yeast: { name: 'Clean Continental Lager (e.g. Wyeast 2278 or Saflager W-34/70)', attenuationLow: 79, attenuationHigh: 83, tempLowC: 9, tempHighC: 12 },
      description: 'Belgium\'s best-selling pils — a higher proportion of maize (corn) adjunct than Stella per publicly available brewing/retail descriptions, for an even lighter, crisper body.',
      processNotes: 'Same full lager regimen as any pale lager. Not the actual AB InBev formula.',
      tags: ['Clone-inspired', 'Belgian lager', 'Session']
    },
    {
      id: 'duvel-clone-be', name: 'Duvel-Inspired Golden Strong Ale', style: 'Belgian Golden Strong Ale', styleCode: '25C',
      region: 'BE', difficulty: 'Advanced', volumeL: 20, mashEfficiency: 0.71, commercialInspiration: true, realAbv: 8.5,
      mashTempC: 63, fermentTempC: { low: 18, high: 27 },
      bjcpRange: { og: [1.070, 1.095], fg: [1.005, 1.016], abv: [7.5, 10.5], ibu: [22, 35], srm: [3, 6] },
      grainBill: [
        { name: 'Pilsner Malt', weightKg: 4.95, ppg: 37, lovibond: 1.6 },
        { name: 'Dextrose (clear candi sub)', weightKg: 1.3, ppg: 46, lovibond: 0 }
      ],
      sugarPctOfFermentables: 21,
      hopSchedule: [
        { name: 'Saaz', weightG: 48, aaPct: 4.0, minutes: 60, purpose: 'Bittering' },
        { name: 'Styrian Golding', weightG: 28, aaPct: 4.5, minutes: 15, purpose: 'Light flavor' }
      ],
      yeast: { name: 'Belgian Strong Ale, Duvel-derived (e.g. Wyeast 1388)', attenuationLow: 87, attenuationHigh: 93, tempLowC: 18, tempHighC: 27 },
      description: 'The best-documented Belgian clone target in homebrewing — pilsner malt plus a large dextrose addition (~20% of fermentables), Saaz and Styrian Golding hops, fermented warm with a highly attenuative strain for the "sneaky" light-body-at-high-ABV effect the beer is famous for.',
      processNotes: 'Multiple independently published homebrew/industry sources (Craft Beer & Brewing, BYO) converge on this general approach. Ferment warm and patiently — this yeast is notoriously slow to finish.',
      tags: ['Clone-inspired', 'Belgian', 'Strong ale', 'Well-documented']
    },
    {
      id: 'leffeblonde-clone-be', name: 'Leffe Blonde-Inspired Abbey Ale', style: 'Belgian Blond Ale', styleCode: '25A',
      region: 'BE', difficulty: 'Intermediate', volumeL: 20, mashEfficiency: 0.71, commercialInspiration: true, realAbv: 6.6,
      mashTempC: 65, fermentTempC: { low: 18, high: 24 },
      bjcpRange: { og: [1.062, 1.075], fg: [1.008, 1.018], abv: [6.0, 7.5], ibu: [15, 30], srm: [4, 6] },
      grainBill: [
        { name: 'Pilsner Malt', weightKg: 4.9, ppg: 37, lovibond: 1.6 },
        { name: 'Aromatic Malt', weightKg: 0.25, ppg: 36, lovibond: 20 },
        { name: 'Dextrose', weightKg: 0.5, ppg: 46, lovibond: 0 }
      ],
      hopSchedule: [
        { name: 'Saaz', weightG: 32, aaPct: 4.0, minutes: 60, purpose: 'Bittering (background)' },
        { name: 'Styrian Golding', weightG: 16, aaPct: 4.5, minutes: 15, purpose: 'Light flavor' }
      ],
      yeast: { name: 'Belgian Abbey (e.g. Wyeast 1214)', attenuationLow: 78, attenuationHigh: 82, tempLowC: 18, tempHighC: 24 },
      description: 'A golden abbey-style ale with a hint of wheaty softness and orange-peel-like fruitiness (per brewery-published descriptions), moderate bitterness compared to its Golden Strong Ale cousins.',
      processNotes: 'No single famous published Leffe clone recipe exists — this follows the standard Belgian Blond Ale template tuned to Leffe\'s real 6.6% ABV.',
      tags: ['Clone-inspired', 'Belgian', 'Abbey ale']
    },
    {
      id: 'hoegaarden-clone-be', name: 'Hoegaarden-Inspired Witbier', style: 'Witbier', styleCode: '24A',
      region: 'BE', difficulty: 'Intermediate', volumeL: 20, mashEfficiency: 0.68, commercialInspiration: true, realAbv: 4.9,
      mashTempC: 65, fermentTempC: { low: 18, high: 22 },
      bjcpRange: { og: [1.044, 1.052], fg: [1.008, 1.012], abv: [4.5, 5.5], ibu: [8, 20], srm: [2, 4] },
      grainBill: [
        { name: 'Pilsner Malt', weightKg: 2.3, ppg: 37, lovibond: 1.6 },
        { name: 'Unmalted Wheat (raw)', weightKg: 2.1, ppg: 36, lovibond: 2 },
        { name: 'Flaked Oats', weightKg: 0.35, ppg: 33, lovibond: 1 }
      ],
      hopSchedule: [
        { name: 'Hallertau', weightG: 22, aaPct: 4.0, minutes: 60, purpose: 'Bittering only' }
      ],
      yeast: { name: 'Belgian Witbier (e.g. Wyeast 3944)', attenuationLow: 76, attenuationHigh: 80, tempLowC: 17, tempHighC: 22 },
      description: 'The archetype witbier — Hoegaarden (Pierre Celis lineage) is the beer that essentially reinvented this style, and its raw-wheat-plus-spice approach is what every witbier recipe (including this app\'s generic Witbier recipe) is modeled on.',
      processNotes: 'Add ~15g crushed coriander seed and ~15g dried bitter (Curaçao) orange peel at 10 minutes remaining in the boil — both openly listed as ingredients by the brewery.',
      tags: ['Clone-inspired', 'Belgian', 'Wheat beer', 'Well-documented']
    },
    {
      id: 'chimayred-clone-be', name: 'Chimay Red-Inspired Trappist Dubbel', style: 'Belgian Dubbel', styleCode: '26B',
      region: 'BE', difficulty: 'Advanced', volumeL: 20, mashEfficiency: 0.71, commercialInspiration: true, realAbv: 7.0,
      mashTempC: 66, fermentTempC: { low: 20, high: 25 },
      bjcpRange: { og: [1.062, 1.075], fg: [1.008, 1.018], abv: [6.0, 7.6], ibu: [15, 25], srm: [10, 17] },
      grainBill: [
        { name: 'Pilsner Malt', weightKg: 5.7, ppg: 37, lovibond: 1.6 },
        { name: 'Munich Malt', weightKg: 0.37, ppg: 37, lovibond: 9 },
        { name: 'Special B', weightKg: 0.15, ppg: 34, lovibond: 180 },
        { name: 'Dark Candi Syrup (D-90)', weightKg: 0.28, ppg: 36, lovibond: 90 }
      ],
      hopSchedule: [
        { name: 'Styrian Golding', weightG: 48, aaPct: 4.5, minutes: 60, purpose: 'Bittering (background)' }
      ],
      yeast: { name: 'Trappist Ale (e.g. Wyeast 1214)', attenuationLow: 76, attenuationHigh: 81, tempLowC: 20, tempHighC: 26 },
      description: 'A genuine Trappist ale — one of only a handful of breweries entitled to the "Authentic Trappist Product" label. Coppery-brown with dried-fruit (apricot, raisin) esters from the yeast and dark candi syrup, not roasted malt.',
      processNotes: 'A HomeBrewTalk community clone thread discusses this general approach (dark candi sugar, Belgian dark malts, Trappist-type yeast) — treat as forum-level guidance, not an official published recipe.',
      tags: ['Clone-inspired', 'Belgian', 'Trappist', 'Dark ale']
    },
    {
      id: 'heineken-clone-nl', name: 'Heineken-Inspired Pale Lager', style: 'International Pale Lager', styleCode: '2A',
      region: 'NL', difficulty: 'Intermediate', volumeL: 20, mashEfficiency: 0.71, commercialInspiration: true, realAbv: 5.0,
      mashTempC: 65, fermentTempC: { low: 9, high: 12 },
      bjcpRange: { og: [1.040, 1.050], fg: [1.004, 1.010], abv: [4.2, 5.3], ibu: [8, 18], srm: [2, 3.5] },
      grainBill: [
        { name: 'Pilsner Malt', weightKg: 4.34, ppg: 37, lovibond: 1.6 }
      ],
      hopSchedule: [
        { name: 'Magnum', weightG: 10, aaPct: 12.0, minutes: 60, purpose: 'Bittering' },
        { name: 'Saaz', weightG: 10, aaPct: 4.0, minutes: 15, purpose: 'Late/aroma' }
      ],
      yeast: { name: 'Clean Continental Lager, "A-yeast" style (e.g. Wyeast 2042)', attenuationLow: 78, attenuationHigh: 82, tempLowC: 9, tempHighC: 12 },
      description: 'Nearly all-malt per the brewery\'s own published ingredient statement (minimal adjunct vs. many mass lagers). Heineken\'s own "A-yeast" is famously publicized by the brewery as producing a subtle fruity note that is largely filtered out before packaging.',
      processNotes: 'A published BYO "Heineken International" clone recipe uses Magnum for bittering and a late Saaz addition, which this recipe follows.',
      tags: ['Clone-inspired', 'Dutch lager', 'Well-documented']
    },
    {
      id: 'grolsch-clone-nl', name: 'Grolsch-Inspired Premium Lager', style: 'International Pale Lager', styleCode: '2A',
      region: 'NL', difficulty: 'Intermediate', volumeL: 20, mashEfficiency: 0.71, commercialInspiration: true, realAbv: 5.0,
      mashTempC: 65, fermentTempC: { low: 9, high: 12 },
      bjcpRange: { og: [1.040, 1.050], fg: [1.004, 1.010], abv: [4.2, 5.3], ibu: [8, 18], srm: [2, 3.5] },
      grainBill: [
        { name: 'Pilsner Malt', weightKg: 4.34, ppg: 37, lovibond: 1.6 }
      ],
      hopSchedule: [
        { name: 'Hallertau', weightG: 25, aaPct: 4.0, minutes: 60, purpose: 'Bittering' },
        { name: 'Saaz', weightG: 15, aaPct: 4.0, minutes: 5, purpose: 'Late dry-hop-style aroma' }
      ],
      yeast: { name: 'Clean Continental Lager (e.g. Saflager W-34/70)', attenuationLow: 78, attenuationHigh: 82, tempLowC: 9, tempHighC: 12 },
      description: 'A Dutch premium pale lager marketed around late/dry hopping for aroma. Published IBU estimates for the real beer vary widely (12-28 across different sources) — treat any bitterness figure for this beer as a rough guess.',
      processNotes: 'A "Grolsch Premium Lager Clone" recipe is published on the homebrew site Let\'s Brew Beer, which this follows loosely.',
      tags: ['Clone-inspired', 'Dutch lager']
    },
    {
      id: 'latrappedubbel-clone-nl', name: 'La Trappe Dubbel-Inspired Trappist Ale', style: 'Belgian Dubbel', styleCode: '26B',
      region: 'NL', difficulty: 'Advanced', volumeL: 20, mashEfficiency: 0.71, commercialInspiration: true, realAbv: 7.0,
      mashTempC: 66, fermentTempC: { low: 20, high: 25 },
      bjcpRange: { og: [1.062, 1.075], fg: [1.008, 1.018], abv: [6.0, 7.6], ibu: [15, 25], srm: [10, 17] },
      grainBill: [
        { name: 'Pilsner Malt', weightKg: 5.7, ppg: 37, lovibond: 1.6 },
        { name: 'Munich Malt', weightKg: 0.37, ppg: 37, lovibond: 9 },
        { name: 'Special B', weightKg: 0.15, ppg: 34, lovibond: 180 },
        { name: 'Dark Candi Syrup (D-90)', weightKg: 0.28, ppg: 36, lovibond: 90 }
      ],
      hopSchedule: [
        { name: 'Styrian Golding', weightG: 46, aaPct: 4.5, minutes: 60, purpose: 'Bittering (background)' }
      ],
      yeast: { name: 'Trappist Ale (e.g. Wyeast 1214)', attenuationLow: 76, attenuationHigh: 81, tempLowC: 20, tempHighC: 26 },
      description: 'The Netherlands\' own Trappist brewery (Bierbrouwerij De Koningshoeven) — deep red-brown with date/dried-fruit character from dark candi sugar and warm-fermentation esters, in the same tradition as the Belgian Trappist dubbels.',
      processNotes: 'No single famous published clone recipe exists specifically for this beer (unlike Chimay/Westmalle) — this follows the standard Trappist Dubbel template.',
      tags: ['Clone-inspired', 'Dutch', 'Trappist', 'Dark ale']
    },
    {
      id: 'samadams-clone-us', name: 'Boston Lager-Inspired Vienna Lager', style: 'Vienna Lager', styleCode: '7A',
      region: 'US', difficulty: 'Intermediate', volumeL: 20, mashEfficiency: 0.71, commercialInspiration: true, realAbv: 5.0,
      mashTempC: 65, fermentTempC: { low: 9, high: 13 },
      bjcpRange: { og: [1.046, 1.052], fg: [1.010, 1.014], abv: [4.5, 5.5], ibu: [18, 30], srm: [10, 16] },
      grainBill: [
        { name: 'Vienna Malt', weightKg: 3.2, ppg: 36, lovibond: 3.5 },
        { name: 'Munich Malt', weightKg: 1.3, ppg: 37, lovibond: 9 },
        { name: 'CaraMunich', weightKg: 0.3, ppg: 34, lovibond: 60 }
      ],
      hopSchedule: [
        { name: 'Hallertau Mittelfrüh', weightG: 42, aaPct: 4.0, minutes: 60, purpose: 'Bittering' },
        { name: 'Tettnang', weightG: 21, aaPct: 4.0, minutes: 15, purpose: 'Aroma' }
      ],
      yeast: { name: 'German/Bavarian Lager (e.g. Wyeast 2124)', attenuationLow: 71, attenuationHigh: 75, tempLowC: 9, tempHighC: 13 },
      description: 'All-malt, amber, and built around two openly-publicized German noble hop varieties (Hallertau Mittelfrüh and Tettnang) — the brewery itself publicizes its use of a traditional decoction mash.',
      processNotes: 'A decoction mash is part of the brewery\'s own publicized process. Full lager fermentation and cold conditioning apply as with any lager.',
      tags: ['Clone-inspired', 'American craft pioneer', 'Lager', 'Well-documented']
    },
    {
      id: 'sierranevada-clone-us', name: 'Sierra Nevada-Inspired Pale Ale', style: 'American Pale Ale', styleCode: '18B',
      region: 'US', difficulty: 'Beginner', volumeL: 20, mashEfficiency: 0.71, commercialInspiration: true, realAbv: 5.6,
      mashTempC: 67, fermentTempC: { low: 18, high: 20 },
      bjcpRange: { og: [1.045, 1.060], fg: [1.010, 1.015], abv: [4.5, 6.2], ibu: [30, 50], srm: [5, 10] },
      grainBill: [
        { name: '2-Row Pale Malt', weightKg: 4.6, ppg: 37, lovibond: 2 },
        { name: 'Crystal 60L', weightKg: 0.4, ppg: 35, lovibond: 60 }
      ],
      hopSchedule: [
        { name: 'Perle', weightG: 30, aaPct: 8.0, minutes: 60, purpose: 'Bittering' },
        { name: 'Cascade', weightG: 25, aaPct: 6.0, minutes: 30, purpose: 'Flavor' },
        { name: 'Cascade', weightG: 20, aaPct: 6.0, minutes: 0, purpose: 'Flameout aroma' }
      ],
      yeast: { name: 'Clean American Ale (e.g. Fermentis US-05, Wyeast 1056, or WLP001)', attenuationLow: 76, attenuationHigh: 81, tempLowC: 18, tempHighC: 20 },
      description: 'The beer that arguably defined the entire American Pale Ale style and, by extension, this app\'s own generic APA recipe. Perle-for-bittering, Cascade-for-flavor/aroma is Sierra Nevada\'s own publicized hop bill.',
      processNotes: 'Sierra Nevada itself publishes an official homebrew version of this recipe on its own website, and BYO magazine independently publishes a closely matching clone — both converge on 2-row + a crystal malt, Perle + Cascade, clean American ale yeast, no dry hop needed.',
      tags: ['Clone-inspired', 'American craft pioneer', 'Beginner-friendly', 'Well-documented']
    },
    {
      id: 'budweiser-clone-us', name: 'Budweiser-Inspired American Lager', style: 'American Lager', styleCode: '1B',
      region: 'US', difficulty: 'Intermediate', volumeL: 20, mashEfficiency: 0.71, commercialInspiration: true, realAbv: 5.0,
      mashTempC: 64, fermentTempC: { low: 9, high: 12 },
      bjcpRange: { og: [1.040, 1.055], fg: [0.998, 1.008], abv: [4.2, 5.8], ibu: [8, 15], srm: [2, 3.5] },
      grainBill: [
        { name: '2-Row Pale Malt', weightKg: 3.0, ppg: 37, lovibond: 2 },
        { name: 'Flaked Rice', weightKg: 1.3, ppg: 38, lovibond: 0 }
      ],
      hopSchedule: [
        { name: 'Hallertau', weightG: 22, aaPct: 4.0, minutes: 60, purpose: 'Bittering' }
      ],
      yeast: { name: 'Clean American Lager (e.g. Wyeast 2035 or Saflager W-34/70)', attenuationLow: 84, attenuationHigh: 88, tempLowC: 9, tempHighC: 12 },
      description: 'Rice adjunct (roughly 30% of the grist per widely-published brewing commentary) is the defining, openly-discussed ingredient — it lightens body and dries the finish relative to an all-malt lager.',
      processNotes: 'Rice (like corn) has no diastatic power of its own and must be cooked/gelatinized before mashing in with the base malt — a cereal mash step, not a simple addition.',
      tags: ['Clone-inspired', 'American macro lager', 'Light body']
    },
    {
      id: 'guinness-clone-ie', name: 'Guinness Draught-Inspired Dry Stout', style: 'Irish Stout', styleCode: '15B',
      region: 'IE', difficulty: 'Beginner', volumeL: 20, mashEfficiency: 0.71, commercialInspiration: true, realAbv: 4.2,
      mashTempC: 66, fermentTempC: { low: 17, high: 21 },
      bjcpRange: { og: [1.036, 1.044], fg: [1.007, 1.011], abv: [3.8, 5], ibu: [25, 45], srm: [25, 40] },
      grainBill: [
        { name: 'Pale Ale Malt', weightKg: 3.2, ppg: 37, lovibond: 3 },
        { name: 'Flaked Barley', weightKg: 0.4, ppg: 32, lovibond: 1 },
        { name: 'Roasted Barley', weightKg: 0.55, ppg: 25, lovibond: 300 }
      ],
      hopSchedule: [
        { name: 'East Kent Golding', weightG: 45, aaPct: 5.5, minutes: 60, purpose: 'Bittering only' }
      ],
      yeast: { name: 'Irish Ale (e.g. Wyeast 1084)', attenuationLow: 73, attenuationHigh: 77, tempLowC: 17, tempHighC: 21 },
      description: 'Roasted (unmalted) barley — openly publicized by the brewery as a defining ingredient — gives the dry, coffee-ish roast bite. The nitrogen (not CO2) dispense that makes the real thing so creamy is a serving-side detail, not a brewing step.',
      processNotes: 'A BYO "Guinness Draught clone" recipe (English 2-row, flaked barley, roasted barley, East Kent Goldings, Irish ale yeast) is well-documented and closely matches this approach. To approximate nitro character at home, use a nitro-capable keg/faucet setup or nitro widget cans/bottles.',
      tags: ['Clone-inspired', 'Irish', 'Dark', 'Beginner-friendly', 'Well-documented']
    },
    {
      id: 'pilsnerurquell-clone-cz', name: 'Pilsner Urquell-Inspired Czech Pale Lager', style: 'Czech Premium Pale Lager', styleCode: '3B',
      region: 'CZ', difficulty: 'Advanced', volumeL: 20, mashEfficiency: 0.71, commercialInspiration: true, realAbv: 4.4,
      mashTempC: 63, fermentTempC: { low: 8, high: 12 },
      bjcpRange: { og: [1.044, 1.060], fg: [1.013, 1.017], abv: [4.2, 5.8], ibu: [30, 45], srm: [3.5, 6] },
      grainBill: [
        { name: 'Pilsner Malt (Moravian tradition)', weightKg: 4.3, ppg: 37, lovibond: 2.0 }
      ],
      hopSchedule: [
        { name: 'Saaz', weightG: 65, aaPct: 3.5, minutes: 60, purpose: 'Bittering' },
        { name: 'Saaz', weightG: 32, aaPct: 3.5, minutes: 20, purpose: 'Flavor' },
        { name: 'Saaz', weightG: 24, aaPct: 3.5, minutes: 5, purpose: 'Aroma' }
      ],
      yeast: { name: 'Czech/Bohemian Lager (e.g. Wyeast 2278 or 2124)', attenuationLow: 68, attenuationHigh: 74, tempLowC: 8, tempHighC: 12 },
      description: 'The beer that defines this style — exclusively Saaz hops grown in the nearby Žatec region, added in three traditional stages, on soft water. This is the original pilsner all others are compared to.',
      processNotes: 'A traditional triple-decoction mash (acid rest ~35°C, protein rest ~53°C, saccharification ~62°C, mash-out ~73°C) is openly documented as the brewery\'s process; a simplified single-infusion mash works too and is what most published homebrew clones (BYO, Brewer\'s Friend) offer as an alternative.',
      tags: ['Clone-inspired', 'Czech', 'Original pilsner', 'Well-documented']
    },
    {
      id: 'asahi-clone-jp', name: 'Asahi Super Dry-Inspired Rice Lager', style: 'International Pale Lager', styleCode: '2A',
      region: 'JP', difficulty: 'Intermediate', volumeL: 20, mashEfficiency: 0.71, commercialInspiration: true, realAbv: 5.2,
      mashTempC: 63, fermentTempC: { low: 9, high: 12 },
      bjcpRange: { og: [1.040, 1.050], fg: [1.004, 1.010], abv: [4.2, 5.3], ibu: [8, 18], srm: [2, 3.5] },
      grainBill: [
        { name: 'Pilsner Malt', weightKg: 3.15, ppg: 37, lovibond: 1.6 },
        { name: 'Flaked Rice', weightKg: 0.7, ppg: 38, lovibond: 0 },
        { name: 'Flaked Maize', weightKg: 0.3, ppg: 32, lovibond: 0 }
      ],
      hopSchedule: [
        { name: 'Saaz', weightG: 32, aaPct: 4.0, minutes: 60, purpose: 'Bittering only' }
      ],
      yeast: { name: 'Ultra-high-attenuation Clean Lager (proprietary "yeast #318" on the real beer; approximate with e.g. Wyeast 2007 or a very healthy-pitched Saflager W-34/70)', attenuationLow: 85, attenuationHigh: 90, tempLowC: 9, tempHighC: 12 },
      description: 'The beer that pioneered the "karakuchi" (dry) style in Japan in 1987 — a rice-and-corn-lightened lager fermented to an unusually high, bone-dry attenuation rather than left with typical adjunct-lager residual sweetness. The real beer uses a proprietary in-house yeast strain; this recipe approximates its ultra-dry finish with an aggressively high attenuation target on a normal lager strain.',
      processNotes: 'Pitch a large, healthy yeast starter/packet count and consider a slightly warmer secondary rest near the end of fermentation to help push attenuation as high as possible — the entire character of this beer depends on finishing drier than a typical pale lager, not on any single ingredient.',
      tags: ['Clone-inspired', 'Japanese', 'Rice lager', 'Bone-dry']
    }
  ];
}

if (typeof module !== 'undefined' && module.exports) module.exports = { BUILTIN_RECIPES };
