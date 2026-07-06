// Water chemistry reference data — extracted from docs/knowledge-base/
// ingredients/water-chemistry.md: brewing salts (for building up RO/distilled
// water) and the classic historical city water profiles brewers reference
// for style character. Per-gram-per-gallon figures are Bru'n Water's
// published stoichiometric values, as cited in the KB doc.

function BUILTIN_SALTS() {
  return [
    { id: 'gypsum', name: 'Gypsum (CaSO4, dihydrate)', adds: 'Calcium and sulfate',
      use: 'Raise calcium and push sulfate:chloride toward "hoppy".', perGramPerGallon: '+61 ppm Ca, +147 ppm SO4 per 1g/US gal' },
    { id: 'cacl2', name: 'Calcium Chloride (CaCl2, dihydrate)', adds: 'Calcium and chloride',
      use: 'Raise calcium and push sulfate:chloride toward "malty".', perGramPerGallon: '+72 ppm Ca, +127 ppm Cl per 1g/US gal' },
    { id: 'epsom', name: 'Epsom Salt (MgSO4, heptahydrate)', adds: 'Magnesium and sulfate',
      use: 'Minor magnesium nutrient boost, or add sulfate without adding calcium.', perGramPerGallon: '+26 ppm Mg, +103 ppm SO4 per 1g/US gal' },
    { id: 'table-salt', name: 'Table Salt (NaCl)', adds: 'Sodium and chloride',
      use: 'Mouthfeel/malt sweetness in small doses.', perGramPerGallon: null },
    { id: 'chalk', name: 'Chalk (CaCO3)', adds: 'Calcium and alkalinity',
      use: 'Raise alkalinity for dark/acidic beers.', perGramPerGallon: null,
      caution: 'Dissolves poorly in the mash — often doesn\'t fully dissolve or take effect as predicted. Pre-dissolved "chalk water" is more reliable than dosing solid chalk.' },
    { id: 'baking-soda', name: 'Baking Soda (NaHCO3)', adds: 'Sodium and alkalinity',
      use: 'Raise alkalinity without adding calcium.', perGramPerGallon: null,
      caution: 'Watch total sodium level — it has its own upper limit for flavor.' }
  ];
}

function BUILTIN_WATER_PROFILES() {
  return [
    { id: 'burton', name: 'Burton-on-Trent', country: 'England', style: 'Burton pale ales, IPAs',
      ca: 352, mg: 24, na: 24, so4: 607, cl: 66, hco3: 259,
      notes: 'Famously very hard, high-sulfate water — shaped the crisp, dry bitterness of Burton pale ales/IPAs. Published figures vary meaningfully by source (sulfate cited anywhere from ~600-800+ ppm) — treat as directionally very-high-sulfate, not a precise target.' },
    { id: 'pilsen', name: 'Pilsen', country: 'Czech Republic', style: 'Czech Pilsner',
      ca: 7, mg: 2, na: 2, so4: 6, cl: 5, hco3: 15,
      notes: 'Extremely soft, low-mineral water — about as close to distilled water as a natural municipal source gets. Pilsner character comes from malt and hop selection, not water.' },
    { id: 'dublin', name: 'Dublin', country: 'Ireland', style: 'Dry Stout',
      ca: 118, mg: 4, na: 12, so4: 55, cl: 19, hco3: 319,
      notes: 'Moderately hard with meaningful carbonate/bicarbonate alkalinity — historically well-suited to dark, roasty stouts, since that alkalinity balances the natural acidity of dark roasted malt.' },
    { id: 'munich', name: 'Munich', country: 'Germany', style: 'Munich Dunkel, Festbier',
      ca: 75, mg: 18, na: 2, so4: 4, cl: 1, hco3: 262,
      notes: 'Moderately hard with fairly high alkalinity and low sulfate — suited to malt-forward amber lagers wanting a soft, round malt character without hop crispness.' }
  ];
}
