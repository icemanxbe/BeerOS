// Yeast strain reference library — extracted from docs/knowledge-base/
// ingredients/yeast.md. Real commercial products (Fermentis, Lallemand,
// Wyeast, White Labs); ranges are the KB's own manufacturer-sourced figures.

function BUILTIN_YEASTS() {
  return [
    // ---- Clean American ale strains ----
    { id: 'us-05', name: 'Fermentis SafAle US-05', category: 'american', form: 'dry', pitchStyle: 'ale',
      attenuationPct: [78, 82], tempRangeC: [18, 26], flocculation: 'Medium',
      character: 'Low esters, medium fusel alcohols, no phenolics — clean, crisp, versatile "American ale" profile. Many brewers run it cooler (16-22°C) than Fermentis\'s full range for a cleaner result.' },
    { id: 'wyeast-1056', name: 'Wyeast 1056 American Ale', category: 'american', form: 'liquid', pitchStyle: 'ale',
      attenuationPct: [73, 77], tempRangeC: [16, 21], flocculation: 'Low-medium',
      character: 'Soft, smooth, clean, well-balanced; mild citrus notes at the cooler end. The "Chico" strain.' },
    { id: 'wlp001', name: 'White Labs WLP001 California Ale', category: 'american', form: 'liquid', pitchStyle: 'ale',
      attenuationPct: [73, 80], tempRangeC: [18, 23], flocculation: 'Medium-high',
      character: 'Clean, crisp, slightly fruity; a Chico-lineage strain; extremely versatile.' },
    { id: 'bry-97', name: 'Lallemand LalBrew BRY-97 American West Coast', category: 'american', form: 'dry', pitchStyle: 'ale',
      attenuationPct: [78, 84], tempRangeC: [15, 22], flocculation: 'High',
      character: 'Neutral with slight esters; vigorous, fast fermentation.' },

    // ---- English ale strains ----
    { id: 's-04', name: 'Fermentis SafAle S-04', category: 'english', form: 'dry', pitchStyle: 'ale',
      attenuationPct: [72, 82], tempRangeC: [15, 20], flocculation: 'High',
      character: 'Fruity and floral; cleaner at the low end of its range (tolerates up to 25°C), more traditional English ester character near 20°C.' },
    { id: 'wyeast-1968', name: 'Wyeast 1968 London ESB', category: 'english', form: 'liquid', pitchStyle: 'ale',
      attenuationPct: [67, 71], tempRangeC: [18, 22], flocculation: 'Very high',
      character: 'Malty, fruity, distinctly sweeter finish due to lower attenuation; excellent for cask conditioning.' },
    { id: 'wlp002', name: 'White Labs WLP002 English Ale', category: 'english', form: 'liquid', pitchStyle: 'ale',
      attenuationPct: [63, 70], tempRangeC: [18, 20], flocculation: 'Very high',
      character: 'Malty, leaves noticeable residual sweetness; classic ESB-lineage strain; very easy to harvest and reuse.' },

    // ---- Belgian strains ----
    { id: 'wyeast-1214', name: 'Wyeast 1214 Belgian Abbey', category: 'belgian', form: 'liquid', pitchStyle: 'ale',
      attenuationPct: [74, 78], tempRangeC: [20, 26], flocculation: 'Medium-low',
      character: 'Spicy phenolics blending with clove and banana esters; can be slow to start but attenuates well; ~12% alcohol tolerance.' },
    { id: 'wlp530', name: 'White Labs WLP530 Abbey Ale', category: 'belgian', form: 'liquid', pitchStyle: 'ale',
      attenuationPct: [75, 80], tempRangeC: [19, 22], flocculation: 'Medium-high',
      character: 'Cherry, plum, and pear esters; pushing toward the top of its 16-29°C tolerated range (up to ~88% reported attenuation) produces a more aggressive, highly attenuative character.' },
    { id: 'abbaye', name: 'Lallemand LalBrew Abbaye', category: 'belgian', form: 'dry', pitchStyle: 'ale',
      attenuationPct: [77, 83], tempRangeC: [17, 25], flocculation: 'Medium-high',
      character: 'Fruity and spicy with a hint of alcohol warmth; vigorous fermentation, ~14% alcohol tolerance.' },
    { id: 'belle-saison', name: 'Lallemand LalBrew Belle Saison', category: 'belgian', form: 'dry', pitchStyle: 'ale',
      attenuationPct: [86, 94], tempRangeC: [20, 35], flocculation: 'Low',
      character: 'Very high, aggressive attenuation; classic peppery/spicy saison character; thrives at temperatures (upper 20s-30s°C) that would stress most other strains; ~15% alcohol tolerance.' },

    // ---- Wheat beer strains ----
    { id: 'wb-06', name: 'Fermentis SafAle WB-06', category: 'wheat', form: 'dry', pitchStyle: 'ale',
      attenuationPct: [82, 90], tempRangeC: [12, 25], flocculation: 'Low',
      character: 'Clove character below ~22°C, banana above ~23°C — fermentation temperature is the primary flavor lever.' },
    { id: 'wyeast-3068', name: 'Wyeast 3068 Weihenstephan Weizen', category: 'wheat', form: 'liquid', pitchStyle: 'ale',
      attenuationPct: [73, 77], tempRangeC: [18, 24], flocculation: 'Low',
      character: 'Classic, well-balanced banana ester and clove phenol combination; the archetypal German hefeweizen strain. Overpitching can nearly eliminate banana character.' },
    { id: 'wlp300', name: 'White Labs WLP300 Hefeweizen Ale', category: 'wheat', form: 'liquid', pitchStyle: 'ale',
      attenuationPct: [72, 76], tempRangeC: [20, 22], flocculation: 'Low',
      character: 'Traditional Bavarian hefeweizen profile; pitch rate and temperature dramatically affect flavor — underpitching intensifies classic banana/clove character.' },

    // ---- Lager strains ----
    { id: 'w-34-70', name: 'Fermentis SafLager W-34/70', category: 'lager', form: 'dry', pitchStyle: 'lager',
      attenuationPct: [80, 84], tempRangeC: [12, 18], flocculation: 'Fast/high',
      character: 'The Weihenstephan lager strain — clean, malty, the standard workhorse for pilsners, helles, and Oktoberfest/Märzen; low esters and fusel alcohols.' },
    { id: 'wyeast-2124', name: 'Wyeast 2124 Bohemian Lager', category: 'lager', form: 'liquid', pitchStyle: 'lager',
      attenuationPct: [69, 73], tempRangeC: [9, 14], flocculation: 'Medium',
      character: 'Rich, malty character suited to Czech pilsners; benefits from a diacetyl rest around 14°C for ~24 hours after primary fermentation completes.' },
    { id: 'wlp830', name: 'White Labs WLP830 German Lager', category: 'lager', form: 'liquid', pitchStyle: 'lager',
      attenuationPct: [74, 79], tempRangeC: [10, 13], flocculation: 'Medium',
      character: 'Clean and malty; widely used across German lager styles (pilsner, helles, Oktoberfest); 5-10% alcohol tolerance.' },
    { id: 'diamond', name: 'Lallemand LalBrew Diamond', category: 'lager', form: 'dry', pitchStyle: 'lager',
      attenuationPct: null, tempRangeC: [10, 15], flocculation: 'High',
      character: 'Neutral, traditional lager flavor and aroma; ~13% alcohol tolerance; vigorous 5-7 day fermentation at 12°C. Manufacturer describes attenuation qualitatively as "high" without a published %.' },
    { id: 'novalager', name: 'Lallemand LalBrew Novalager', category: 'lager', form: 'dry', pitchStyle: 'lager',
      attenuationPct: [78, 84], tempRangeC: [10, 20], flocculation: 'Not separately published',
      character: 'Marketed as a "modern hybrid" lager yeast tolerant of a wider temperature band than traditional lager strains, intended to shorten total lager production time.' },

    // ---- Kveik ----
    { id: 'voss-kveik', name: 'Lallemand LalBrew Voss Kveik', category: 'kveik', form: 'dry', pitchStyle: 'ale',
      attenuationPct: null, tempRangeC: [25, 40], flocculation: 'Very high',
      character: 'Medium-to-high attenuation, ferments cleanly (neutral, subtle orange/citrus) at temperatures — 35-40°C optimal — that would produce harsh solvent-like off-flavors in any standard ale or lager strain. Full attenuation in as little as 2 days at 40°C. Not recommended below ~25°C, outside the range it was selected for.' }
  ];
}
