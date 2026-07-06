# BeerOS Knowledge Base

A comprehensive, accuracy-first reference on home beer brewing — ingredients, equipment, process, troubleshooting, recipe design, and the exact math BeerOS's calculators are built on. Written for brewers from complete beginners to seasoned all-grain veterans.

**Philosophy:** every claim here is either cited to a real, named source or independently derived/computed and shown as such. Where sources disagreed or a number couldn't be pinned down, that's stated honestly rather than smoothed over — see the `STATUS:` notes throughout [`math/calculators-and-formulas.md`](math/calculators-and-formulas.md) in particular. Every worked numeric example in this knowledge base has been independently recomputed in code (not just hand-typed) as part of a dedicated verification pass; the one arithmetic error that pass caught (a Plato conversion worked example) is documented and corrected in place, alongside several formula-sourcing gaps that were resolved rather than left open.

Throughout, practical guidance sections follow a consistent framing: **why** something happens, **what** the effect is, **when** a brewer needs to act on it, **what actions** are available, and **what happens if you do nothing**.

## Ingredients

- [Malts & Grains](ingredients/malts-and-grains.md) — base malts, specialty/crystal/roasted malts, adjunct grains, color and diastatic power, extract potential.
- [Hops](ingredients/hops.md) — varieties, alpha acids, forms (pellet/whole cone/Cryo/extract), timing and utilization, hop creep, storage.
- [Yeast](ingredients/yeast.md) — ale/lager/Belgian/wheat/kveik strains, attenuation (apparent vs. real), flocculation, pitch rates, starters.
- [Water Chemistry](ingredients/water-chemistry.md) — key ions, sulfate:chloride ratio, residual alkalinity, RO/salt building, style water profiles.

## Equipment

- [Equipment Overview](equipment/equipment-overview.md) — brewing method tiers (extract → BIAB → 3-vessel → RIMS/HERMS), mash tuns, chillers, fermenters, temperature control, packaging, cleaning/sanitizing.
- [Kegland Deep Dive](equipment/kegland-deep-dive.md) — BrewZilla, FermZilla, RAPT ecosystem, kegging/CO2 gear, researched directly from kegland.com.au.
- [Brouwland Deep Dive](equipment/brouwland-deep-dive.md) — Brew Monk, Speidel/Ss Brewtech fermenters, European keg/bottle formats, researched via brouwland.com.

## Process

- [Brewing Methods & Process](process/brewing-methods-and-process.md) — mashing chemistry, lautering/sparging, the boil, fermentation biology, packaging, cleaning/sanitation — end to end.
- [Troubleshooting & Off-Flavors](process/troubleshooting-and-off-flavors.md) — diacetyl, DMS, oxidation, infection, and more, each with root cause, timing, fix-or-prevent-only status, and consequence of inaction.

## Recipes

- [Recipe Design Methodology](recipes/recipe-design-methodology.md) — the decision sequence for building a recipe from scratch (style → OG → grain bill → yeast → hops → water → process planning → scaling), plus 5 fully worked example recipes with hand-computed, independently-verified OG/IBU/SRM checked against real BJCP 2021 ranges.

## Math

- [Calculators & Formulas](math/calculators-and-formulas.md) — the specification for BeerOS's calculator code: OG/FG/attenuation, ABV (standard and high-gravity), IBU (Tinseth/Rager/Garetz), SRM (Morey), water chemistry (residual alkalinity), priming sugar and force carbonation, strike water temperature, brewhouse efficiency, yeast pitch rate, and refractometer correction. Every formula is cited and every worked example has been independently recomputed.

---

*Built by parallel research passes, each grounded in real sources (Palmer's* How to Brew*, Braukaiser, BJCP, Brülosophy, manufacturer documentation, and direct retailer site research for the equipment deep dives), followed by a dedicated math-verification pass that recomputed every formula and worked example in code rather than trusting hand arithmetic.*
