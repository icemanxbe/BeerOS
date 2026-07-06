// Hop variety reference library — extracted from docs/knowledge-base/
// ingredients/hops.md. AA% ranges are the KB's own reported spread across
// recent crop years, not a single-lot guarantee — always check the actual
// package before calculating IBUs (same caveat the KB doc gives).

function BUILTIN_HOPS() {
  return [
    // ---- American C-hops & modern high-alpha/high-oil ----
    { id: 'cascade', name: 'Cascade', family: 'american', aaPct: [4.5, 7.0], role: 'dual-purpose (aroma-leaning)',
      flavor: 'Grapefruit, citrus, floral — the defining aroma of classic American Pale Ale.' },
    { id: 'centennial', name: 'Centennial', family: 'american', aaPct: [9.5, 11.5], role: 'dual-purpose',
      flavor: 'Often called "Super Cascade" — floral, citrus, some pine.' },
    { id: 'chinook', name: 'Chinook', family: 'american', aaPct: [12.0, 14.0], role: 'dual-purpose (bittering-leaning)',
      flavor: 'Piney, resinous, grapefruit, a little spicy/earthy.' },
    { id: 'ctz', name: 'Columbus / Tomahawk / Zeus (CTZ)', family: 'american', aaPct: [15.0, 18.0], role: 'bittering',
      flavor: 'Pungent, resinous, dank, black-pepper spice. The three names are nearly indistinguishable clonal/descendant varieties, sold interchangeably.' },
    { id: 'citra', name: 'Citra', family: 'american', aaPct: [11, 13], role: 'dual-purpose (aroma-leaning)',
      flavor: 'Tropical fruit, citrus, gooseberry, subtle catty note.' },
    { id: 'simcoe', name: 'Simcoe', family: 'american', aaPct: [12, 14], role: 'dual-purpose',
      flavor: 'Pine, passionfruit, earthy/woody undertone.' },
    { id: 'mosaic', name: 'Mosaic', family: 'american', aaPct: [11, 14], role: 'dual-purpose (aroma-leaning)',
      flavor: 'Complex — blueberry, tropical fruit, citrus, pine, herbal.' },

    // ---- Noble hops (European, low-alpha, aroma-focused) ----
    { id: 'hallertau-mittelfruh', name: 'Hallertau Mittelfrüh', family: 'noble', aaPct: [3, 5.5], role: 'aroma',
      flavor: 'Mild, elegant, floral/herbal — the archetypal German lager hop.' },
    { id: 'tettnanger', name: 'Tettnang(er)', family: 'noble', aaPct: [3, 5.8], role: 'aroma',
      flavor: 'Balanced floral and herbal, soft spiciness; comparatively high farnesene.' },
    { id: 'spalt', name: 'Spalt', family: 'noble', aaPct: [2.5, 5.5], role: 'aroma',
      flavor: 'Mild, spicy, slightly herbal/earthy.' },
    { id: 'saaz', name: 'Saaz (Czech Saaz)', family: 'noble', aaPct: [2.5, 4], role: 'aroma',
      flavor: 'Delicate, spicy, earthy, mildly floral — signature Czech Pilsner hop.' },

    // ---- English hops ----
    { id: 'ekg', name: 'East Kent Golding', family: 'english', aaPct: [4, 6], role: 'aroma',
      flavor: 'Delicate, honeyed, floral, slightly earthy — classic English bitter/pale ale hop.' },
    { id: 'fuggle', name: 'Fuggle', family: 'english', aaPct: [3.5, 5.5], role: 'dual-purpose (aroma-leaning)',
      flavor: 'Earthy, woody, mildly minty/grassy, subtle fruit. Some sources cite up to ~7% AA.' },

    // ---- New World / Southern Hemisphere ----
    { id: 'nelson-sauvin', name: 'Nelson Sauvin', family: 'newworld', aaPct: [12, 13], role: 'dual-purpose',
      flavor: 'Named for its resemblance to Sauvignon Blanc wine — white grape, gooseberry, tropical fruit.' },
    { id: 'galaxy', name: 'Galaxy', family: 'newworld', aaPct: [13, 18.5], role: 'dual-purpose (aroma-leaning)',
      flavor: 'Intense passionfruit and citrus; very high total oil content.' },
    { id: 'motueka', name: 'Motueka', family: 'newworld', aaPct: [6.5, 8], role: 'dual-purpose',
      flavor: 'Lime, lemon, tropical, subtle herbal note.' }
  ];
}
