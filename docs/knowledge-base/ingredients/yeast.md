# Yeast

Yeast is the ingredient that actually makes beer: it converts the sugars extracted from malt (and adjuncts) into ethanol and CO2, and along the way it produces the bulk of a beer's aroma and flavor character — esters, phenols, higher alcohols, and dozens of minor compounds. Malt and hops set the stage; yeast decides what the beer actually tastes like. Pick the wrong strain, or mistreat the right one, and no amount of grain or hop quality will save the batch.

This page covers the two brewing yeast species, real commercial strains sold to homebrewers today, the science of attenuation and flocculation, pitch rates, liquid vs. dry yeast logistics, repitching, and a practical troubleshooting section. Cell-count math (starter sizing, pitch-rate calculations) lives in [`../math/calculators-and-formulas.md`](../math/calculators-and-formulas.md) — this page explains the *why*, that page does the arithmetic.

## Ale yeast vs. lager yeast

Homebrewers usually learn this as "top-fermenting vs. bottom-fermenting," and that distinction has a long historical pedigree — but it's a simplification that describes what 19th-century brewers *observed*, not what's actually different at the biological level. Modern fermenters are enclosed cylindroconical vessels, so nobody is scooping yeast off the top of an open fermenter anymore; the useful differences are temperature tolerance, flavor-compound production, and flocculation behavior.

### The two species

- **Ale yeast — *Saccharomyces cerevisiae***. The same species used in bread, wine, and sake. Ferments best at warmer temperatures and tends to rise into a krausen during active fermentation (hence "top-fermenting").
- **Lager yeast — *Saccharomyces pastorianus***. A naturally occurring interspecies hybrid of *S. cerevisiae* and the cold-tolerant wild species *Saccharomyces eubayanus* (itself closely related to *S. bayanus*). It inherited *S. cerevisiae*'s ability to efficiently ferment wort sugars and *S. eubayanus*'s cold tolerance and ability to metabolize the sugar melibiose — a genetic trait ale strains lack. This hybrid vigor is why lager yeast can ferment cleanly at temperatures that would leave ale yeast sluggish and produces less character while doing it. Historically it tends to settle to the bottom of the fermenter as it flocculates ("bottom-fermenting"), though this is a consequence of its flocculation behavior at cold temperatures rather than a defining trait in itself.

### What's actually different

| Trait | Ale (*S. cerevisiae*) | Lager (*S. pastorianus*) |
|---|---|---|
| Optimal fermentation temperature | ~18–22°C (64–72°F), some strains much wider | ~8–13°C (46–55°F) |
| Ester/phenol production | Generally higher — esters (fruity) and, in some strains, phenols (spicy/clove) are prominent and often desired | Deliberately minimized — lager strains are selected specifically to ferment "clean," letting malt and hops speak |
| Flocculation timing | Varies widely by strain, often flocculates faster at ale temperatures | Tends to flocculate more slowly at cold temperatures, requiring longer conditioning |
| Cold tolerance | Poor — most ale strains stall or go dormant well above lager fermentation temps | Excellent — actively ferments down to ~7–9°C |
| Typical fermentation + conditioning time | Days (1–2 weeks total) | Weeks (2–4+ weeks including lagering) |

The underlying reason ale yeast produces more esters and phenols isn't just "it's a different species for its own sake" — ester production (via alcohol acetyltransferase enzymes) increases with fermentation temperature and yeast stress, and lager strains have been selected over centuries specifically for low ester/phenol output even when pushed slightly warmer. Lager strains fermented at ale temperatures will still throw more esters than at their intended cold range, but they were bred to stay clean at temperatures where ale strains simply can't survive well.

### Why lager fermentation takes longer

1. **Slower yeast metabolism at cold temperatures.** Enzymatic activity and cell reproduction both slow down in the cold, so lager fermentation simply proceeds at a slower rate than ale fermentation even before you account for anything else.
2. **The diacetyl rest.** Diacetyl (a buttery/butterscotch off-flavor) is produced by all fermenting yeast as a byproduct of amino acid (valine) synthesis, then normally reabsorbed and cleaned up by healthy, active yeast late in fermentation. Cold temperatures slow this cleanup dramatically. Lager brewers typically let the beer finish primary fermentation, then raise the temperature by several degrees for 1–3 days (a "diacetyl rest," commonly to around 18–20°C/64–68°F) so the yeast — still in suspension and still metabolically active — can finish scrubbing diacetyl and its precursor (alpha-acetolactate) out of the beer before it's chilled down.
3. **Lagering (cold conditioning).** After the diacetyl rest, the beer is chilled to near-freezing (around 0–4°C/32–39°F) and held for anywhere from 2 to 8+ weeks. "Lagern" is German for "to store." This slow cold conditioning drops remaining yeast and protein haze out of suspension, mellows harsh fermentation byproducts (notably sulfur compounds and acetaldehyde that lager strains are prone to producing), and rounds out the malt character. There's no real ale equivalent — ale strains are consumed and conditioned much faster and don't need anywhere near as long to clean up because they were fermented warm enough to do most of that cleanup during primary.

Skipping the diacetyl rest and going straight to cold lagering is one of the most common beginner lager mistakes — see the WHY/WHAT/WHEN section below for what actually happens if you do.

## Commercial strains

The strains below are real products currently sold to homebrewers, with specs verified against manufacturer technical data sheets (Fermentis, Lallemand Brewing, White Labs, Wyeast Labs) where available. Ranges vary slightly between the manufacturer's own literature and third-party retailer listings; where sources disagreed, the manufacturer spec sheet is used and noted.

### Clean American ale strains

The workhorse category — neutral, versatile strains used across pale ales, IPAs, browns, and anything where you want malt and hops to be the star, not the yeast.

| Strain | Attenuation | Temp range | Flocculation | Character |
|---|---|---|---|---|
| Fermentis SafAle US-05 (dry) | 78–82%¹ | 18–26°C (64–79°F)¹ | Medium | Low esters, medium fusel alcohols, no phenolics — clean, crisp, versatile "American ale" profile |
| Wyeast 1056 American Ale (liquid) | 73–77% | 16–21°C (60–72°F) | Low–medium | Soft, smooth, clean, well-balanced; mild citrus notes at cooler end of range; the "Chico" strain |
| White Labs WLP001 California Ale (liquid) | 73–80% | 18–23°C (64–73°F) | Medium–high | Clean, crisp, slightly fruity; also a Chico-lineage strain; extremely versatile |
| Lallemand LalBrew BRY-97 American West Coast (dry) | 78–84% | 15–22°C (59–72°F) | High | Neutral with slight esters; vigorous, fast fermentation |

¹ Fermentis lists US-05's *recommended* fermentation window as 18–26°C, though many retailers quote a narrower 12–25°C tolerance range and 60–72°F (~16–22°C) as the commonly-used homebrew range for a cleaner result — fermenting at the top of Fermentis's own range will produce more fruitiness than at the bottom.

US-05, WLP001, and Wyeast 1056 are widely understood to be different commercial preparations of the same or very closely related parent strain (often called "the Chico strain," after its origin at Sierra Nevada Brewing). Don't be surprised if recipes treat them as interchangeable — flavor differences between them are subtle.

### English ale strains

Fruitier and maltier than the American strains, with lower attenuation that leaves more residual sweetness and body — appropriate for bitters, milds, porters, and English-style stouts.

| Strain | Attenuation | Temp range | Flocculation | Character |
|---|---|---|---|---|
| Fermentis SafAle S-04 (dry) | 72–82% (commonly cited ~75%) | 15–20°C (59–68°F) optimal; tolerates up to 25°C (77°F) | High | Fruity and floral; cleaner at the low end of its range, more traditional English ester character near 20°C (68°F) |
| Wyeast 1968 London ESB (liquid) | 67–71% | 18–22°C (64–72°F) | Very high | Malty, fruity, distinctly sweeter finish due to lower attenuation; excellent for cask conditioning — clears quickly without filtration |
| White Labs WLP002 English Ale (liquid) | 63–70% | 18–20°C (65–68°F) | Very high | Malty, leaves noticeable residual sweetness; classic ESB-lineage strain; very easy to harvest and reuse due to how hard it flocculates |

These English strains' comparatively low attenuation isn't a flaw — it's the point. A beer fermented with WLP002 or 1968 finishing at 63–71% apparent attenuation instead of the ~78% you'd get from US-05 will taste maltier and rounder by design, which is exactly the character an English bitter or mild is going for.

### Belgian strains

Belgian strains occupy a completely different design philosophy: wide, warm temperature tolerance and prominent ester (fruity: banana, pear, plum, cherry) and phenolic (spicy: clove, pepper) production aren't flaws to be engineered out — they're the entire flavor identity of the style. A "clean" Belgian dubbel or tripel fermented with a neutral American strain would taste wrong.

| Strain | Attenuation | Temp range | Flocculation | Character |
|---|---|---|---|---|
| Wyeast 1214 Belgian Abbey (liquid) | 74–78% | 20–26°C (68–78°F) | Medium–low | Spicy phenolics blending with clove and banana esters; can be slow to start but attenuates well; ~12% alcohol tolerance |
| White Labs WLP530 Abbey Ale (liquid) | 75–80% (up to ~88% reported at higher temps) | 19–22°C (66–72°F) optimal, tolerates 16–29°C (60–85°F) | Medium–high | Cherry, plum, and pear esters; pushing toward the top of its temperature range produces a more aggressive, highly attenuative character |
| Lallemand LalBrew Abbaye (dry) | 77–83% | 17–25°C (63–77°F) | Medium–high | Fruity and spicy with a hint of alcohol warmth; vigorous fermentation, ~14% alcohol tolerance |
| Lallemand LalBrew Belle Saison (dry) | 86–94% | 20–35°C (68–95°F), tolerant down to ~15°C and up to 35°C+ | Low | Very high, aggressive attenuation; classic peppery/spicy saison character; thrives at temperatures that would stress most other strains; ~15% alcohol tolerance |

The temperature ranges above are dramatically wider than the American/English ale strains — Belle Saison alone spans a 15°C+ window and is often deliberately fermented warm (upper 20s to low 30s °C) specifically to drive more spicy/peppery saison character and finish bone-dry.

### Wheat beer strains

German-style wheat beer (Hefeweizen) yeast is defined by two flavor-active compounds that are normally considered flaws in other beer styles but are the entire point here:

- **Isoamyl acetate** — a fruity ester with a banana-like aroma.
- **4-vinyl guaiacol (4VG)** — a phenol with a clove-like aroma, produced when the yeast's ferulic acid decarboxylase (FDC) enzyme acts on ferulic acid naturally present in wheat and malt.

**Fermentation temperature controls the ratio between them.** Warmer fermentation favors banana ester production; cooler fermentation favors clove phenol character. This happens because the enzymes and metabolic pathways responsible for ester synthesis (alcohol acetyltransferases) are more temperature-sensitive and become more active as temperature rises, while phenol production via FDC is comparatively less temperature-driven — so as you raise fermentation temperature, the balance of yeast metabolic activity shifts to favor esters, and bananas start to dominate over clove. Pitch rate matters too: underpitching pushes ester production up (more banana), while overpitching can nearly eliminate banana character, allowing clove to dominate. Some traditional weizen brewers use a **ferulic acid rest** — a short mash rest around 40–43°C (104–109°F) — specifically to liberate more free ferulic acid from the grain, giving the yeast more raw material to convert into clove phenol later.

| Strain | Attenuation | Temp range | Flocculation | Character |
|---|---|---|---|---|
| Fermentis SafAle WB-06 (dry) | 82–90% (Fermentis lists a wide effective range; ~86% commonly cited) | 12–25°C (54–77°F), typically run 18–24°C | Low | Clove character below ~22°C, banana above ~23°C — fermentation temperature is the primary flavor lever |
| Wyeast 3068 Weihenstephan Weizen (liquid) | 73–77% | 18–24°C (64–75°F) | Low | Classic, well-balanced banana ester and clove phenol combination; the archetypal German hefeweizen strain; overpitching can nearly eliminate banana character |
| White Labs WLP300 Hefeweizen Ale (liquid) | 72–76% | 20–22°C (68–72°F) optimal | Low | Traditional Bavarian hefeweizen profile; pitch rate and temperature "dramatically" affect flavor — underpitching is traditionally used to intensify classic banana/clove character |

Low flocculation across all three strains is deliberate and expected — hefeweizen is traditionally served hazy, with yeast still in suspension contributing to both the cloudy appearance and some of the flavor.

### Lager strains

Selected for clean, minimal ester/phenol production even under stress, and for the ability to actively ferment at temperatures that would stall most ale strains.

| Strain | Attenuation | Temp range | Flocculation | Character |
|---|---|---|---|---|
| Fermentis SafLager W-34/70 (dry) | 80–84% (manufacturer); some homebrewers report 75–80% depending on mash/process | 12–18°C (54–64°F) ideal | Fast/high | The Weihenstephan lager strain — clean, malty, the standard workhorse for pilsners, helles, and Oktoberfest/Märzen; low esters and fusel alcohols |
| Wyeast 2124 Bohemian Lager (liquid) | 69–73% (some sources report up to 77%) | 9–14°C (48–58°F) optimal | Medium | Rich, malty character suited to Czech pilsners; benefits from a diacetyl rest around 14°C (58°F) for ~24 hours after primary fermentation completes |
| White Labs WLP830 German Lager (liquid) | 74–79% | 10–13°C (50–55°F) optimal | Medium | Clean and malty; widely used across German lager styles (pilsner, helles, Oktoberfest); 5–10% alcohol tolerance |
| Lallemand LalBrew Diamond (dry) | High (specific % not published; described qualitatively as "high") | 10–15°C (50–59°F) | High | Neutral, traditional lager flavor and aroma; ~13% alcohol tolerance; vigorous 5–7 day fermentation at 12°C |
| Lallemand LalBrew Novalager (dry) | 78–84% | 10–20°C (50–68°F) | Not separately published | Marketed as a "modern hybrid" lager yeast tolerant of a wider temperature band than traditional lager strains, intended to shorten total lager production time; high attenuation |

All of these strains benefit from — and traditional lager process assumes — a diacetyl rest after primary fermentation and before cold lagering (see the WHY/WHAT/WHEN section).

### Kveik (Norwegian farmhouse yeast)

Kveik (pronounced roughly "kvike") is a family of traditional Norwegian farmhouse yeast cultures, historically passed down within families and reused across generations, brought to modern commercial availability by researchers and yeast labs sequencing and isolating strains from Norwegian farmhouse brewers. Genetic studies have found some kveik strains to be interspecies hybrids of *S. cerevisiae* and other *Saccharomyces* species (in at least one documented case, *S. cerevisiae* × *S. uvarum*), which likely contributes to their unusual thermal tolerance.

**Lallemand LalBrew Voss Kveik** is the most widely available commercial kveik strain sold to homebrewers:

- **Fermentation temperature range:** 25–40°C (77–104°F), with Lallemand's own data sheet listing 35–40°C (95–104°F) as the optimal range for fastest, cleanest results — dramatically higher than any ale or lager strain above.
- **Fermentation speed:** Very fast. Lallemand's data shows full attenuation achievable in as little as 2 days at 40°C, 3–4 days at 30°C, and 5–7 days at 25°C.
- **Attenuation:** Medium to high.
- **Flocculation:** Very high — Lallemand states it produces clear beer without filtration or fining aids.
- **Flavor:** Notably consistent across its entire wide temperature range — neutral with subtle orange/citrus fruit notes, rather than the harsh fusel/solvent character you'd expect from an ordinary ale strain pushed that hot.

The headline claim worth verifying (and confirmed on Lallemand's own technical data sheet) is that Voss ferments *cleanly* at temperatures that would produce solvent-like, harsh fusel alcohol off-flavors in essentially any standard ale or lager strain. This is what makes kveik attractive to homebrewers without temperature control: it performs well at ambient summer temperatures that would ruin a batch fermented with US-05 or WLP001. It does not mean kveik is "better" in absolute terms — at its high end it still produces a specific, recognizable flavor profile (fruity, sometimes citrus/orange), and low-temperature use (below ~25°C) is generally not recommended, as it falls outside the range the strain was selected for.

## Attenuation: apparent vs. real

**Apparent attenuation** is what every yeast spec sheet quotes, and it's what you calculate yourself from a hydrometer or refractometer reading:

```
Apparent Attenuation (%) = 100 × (OG − FG) / (OG − 1.000)
```

using specific gravity points (e.g., OG 1.050, FG 1.012 → 100 × (0.050 − 0.012) / 0.050 = 76%).

The problem: a hydrometer measures the *density* of the liquid, and alcohol is less dense than water. As fermentation proceeds, the wort isn't just losing dissolved sugar (which would lower density) — it's simultaneously gaining ethanol (which *also* lowers density, independent of how much sugar is actually left). A hydrometer can't tell these two effects apart. It reads a lower gravity than the sugar content alone would produce, which makes apparent attenuation read *higher* than the true percentage of extract actually consumed by the yeast.

**Real (true) attenuation** corrects for this by calculating what the gravity reading *would* be if the alcohol weren't there — i.e., accounting for the alcohol's contribution to the drop in gravity separately from the sugar's contribution. Real attenuation is always numerically lower than apparent attenuation for any fermented beer.

The standard correction is derived from Balling's 19th-century alcohol-in-solution work. Braukaiser.com (Kai Troester's well-regarded brewing science reference) gives the formula in degrees Plato as:

```
Real Extract (°P) = 0.1808 × Original Extract (°P) + 0.8192 × Apparent Extract (°P)
```

As a simplified rule of thumb, brewing references commonly cite:

```
Real Attenuation ≈ 0.81 × Apparent Attenuation
```

This is an approximation — the true relationship is nonlinear and depends on original gravity — but it's close enough for homebrew purposes. In practice, real attenuation typically runs roughly 15–20% lower (relatively) than the apparent attenuation figure printed on a yeast packet. So a strain advertised as "80% attenuation" is really consuming closer to 65% of the actual extract — the rest of the gap between 65% and 80% is an artifact of how alcohol fools a hydrometer, not sugar the yeast somehow skipped. This matters mostly for understanding why manufacturer attenuation numbers look more aggressive than the beer's actual body/sweetness might suggest — it does not change anything about how you should use OG/FG for ABV calculations, which are already designed around apparent readings.

*(Sources: [Braukaiser — Understanding Attenuation](https://braukaiser.com/wiki/index.php/Understanding_Attenuation); [BYO — Calculating Alcohol Content, Attenuation, Extract, and Calories](https://byo.com/articles/calculating-alcohol/))*

## Flocculation

Flocculation is the tendency of yeast cells to clump together and drop out of suspension near the end of fermentation. Physically, it's a cell-surface phenomenon: flocculin proteins on the yeast cell wall bind to mannose sugars on neighboring cells once nutrient conditions signal that fermentation is winding down, causing cells to aggregate into larger clumps ("flocs") heavy enough to settle to the bottom of the fermenter (or occasionally cling to fermenter walls/rise with CO2, depending on strain and vessel).

Manufacturers rate flocculation qualitatively — low, medium (medium-low/medium-high in between), high, very high — because it isn't a single hard number but a description of settling *behavior*:

- **Low flocculation**: cells stay in suspension longer, producing a hazier beer that takes longer to clear on its own (fining agents or cold crashing help). More yeast stays active in suspension for longer, which can mean a more complete, thorough fermentation of complex sugars, but also more yeast character (contact time) in the finished beer. Wheat beer strains and Belle Saison are low-flocculating by design — haze is either desired (hefeweizen) or the trade-off for extreme attenuation (saison).
- **Medium flocculation**: settles at a moderate pace; the most common rating among general-purpose ale strains — a practical middle ground between clarity and complete attenuation.
- **High/very high flocculation**: cells clump and drop out quickly and thoroughly, giving fast, often filtration-free clarity (English ale strains like WLP002 and Wyeast 1968 are classic examples). The trade-off is the risk of cells flocculating out *before* they've fully fermented all the available sugars, which can leave a beer slightly under-attenuated or, if flocculation happens too early relative to a diacetyl cleanup window, can strand diacetyl precursors in the beer with too little active yeast left to clean them up. This is part of why some very-high-flocculating strains (and lager strains generally) are rated with slightly lower attenuation ranges than fast-fermenting low-flocculating strains.

Flocculation is a strain-specific trait but is also influenced by fermentation temperature, wort composition, and yeast health — stressed or aging yeast can flocculate earlier or less predictably than expected.

## Pitch rates

"Pitch rate" is how many viable yeast cells you add relative to the volume and gravity of the wort. Getting it right matters more than most beginner brewers assume, because yeast under stress doesn't just ferment slower — it actively changes what it produces.

### Why it matters

**Underpitching** (too few cells) forces the yeast that *is* present to reproduce more before it can finish the job. More reproduction cycles under stress conditions means:

- A longer lag phase before visible fermentation starts — and every hour of lag phase is an hour the wort sits at fermentation-friendly temperature with no protective yeast population and no CO2 blanket, which raises infection risk.
- Elevated production of fusel (higher) alcohols — harsh, hot, solvent-like alcohols produced when stressed yeast cells reproduce heavily.
2. Excessive ester production — beyond what the strain and temperature would normally give you, throwing off the intended flavor balance.
- Elevated diacetyl, since a smaller, more stressed population is slower to clean up its own fermentation byproducts.
- Risk of incomplete or stuck fermentation if the population never grows enough to finish attenuating.

**Overpitching** (too many cells) skips too much of the yeast's normal reproductive phase, which has its own consequences:

- Reduced ester production — can make a beer taste unexpectedly "thin" or flat/one-dimensional for styles (Belgian, English, wheat) where esters are part of the intended character.
- A "yeast-bready" or harshly yeasty character from the sheer biomass involved.
- In extreme cases, **autolysis risk** — when yeast cells run out of nutrients and die/rupture in large numbers (more likely with excessive pitch rates combined with extended time on the yeast cake), releasing intracellular compounds that produce a rubbery, meaty, or yeasty off-flavor. This is a real but relatively rare failure mode for homebrew-scale overpitching; it's more of a concern with repeated harvesting/reuse left too long, or industrial-scale mismanagement.

### Target cell counts

The widely cited home- and craft-brewing rule of thumb, popularized by Jamil Zainasheff's Mr. Malty pitch rate calculator (the standard reference tool in this space) and echoed by the American Homebrewers Association and Brew Your Own magazine, is:

- **Ale:** ~0.75 million cells per mL of wort per degree Plato of original gravity.
- **Lager:** ~1.5 million cells per mL per degree Plato — roughly double the ale rate, reflecting both lager yeast's slower cold-temperature metabolism and the desire for a cleaner fermentation profile.
- **High-gravity beers** (roughly >1.075 OG): often bumped to an intermediate 1.0–1.25 million cells/mL/°P even for ales, since high sugar concentration and eventual high alcohol content stress yeast more than a standard-gravity ale.

Some sources (including the AHA's own published guidance) simplify this to a flat "1 million cells/mL/°P for ales, multiplied by 1.5–2× for lagers," which lands in the same neighborhood. Treat these numbers as an industry-standard planning target, not a hard law — the acceptable working range for ale and lager pitching is commonly given as roughly 0.5–2 million cells/mL/°P, with the numbers above representing the well-tested "sweet spot" rather than a cliff edge.

The actual cell-count arithmetic — converting OG, batch volume, and yeast source into a target cell count and required starter size — is covered in [`../math/calculators-and-formulas.md`](../math/calculators-and-formulas.md); this page is about the reasoning behind the targets, not the computation.

*(Sources: [Mr. Malty pitch rate calculator, Jamil Zainasheff](https://www.mrmalty.com/calc/calc.html); [AHA — Determining Proper Yeast Pitch Rates](https://homebrewersassociation.org/how-to-brew/determining-proper-yeast-pitch-rates/); [BYO — Yeast Pitching Rates](https://byo.com/articles/pitching-rates-advanced-homebrewing/))*

## Liquid vs. dry yeast

### Dry yeast

Dry yeast sachets (typically 7–12 g, with 11.5 g being the Fermentis/Lallemand standard sachet size) are produced industrially, dehydrated, and packed with very high viable cell counts relative to their size, plus a longer, more temperature-tolerant shelf life than liquid yeast.

Cell-count specifics are a genuinely contested number, worth stating carefully rather than picking one figure and presenting it as settled fact:

- **Manufacturer's own guaranteed minimum**: Fermentis's SafAle US-05 technical data sheet states viable cell count "greater than 1.0 × 10¹⁰ CFU/g" at time of packaging (some older versions of the spec sheet state a more conservative "> 6 × 10⁹/g"). At 10 billion/g, an 11.5 g packet works out to roughly 115 billion cells guaranteed at packaging — and that's a floor, not an average.
- **Independent/practical measurements**: homebrewers and hobbyist labs who've actually plated and counted dry yeast packets have reported figures in the range of 150–220 billion cells per 11.5 g US-05 packet, and Jamil Zainasheff has cited a working estimate of roughly 20 billion cells per gram of dry yeast (which would put an 11.5 g packet around 230 billion cells) based on his own cell counts for pitch-rate calculator purposes.
- **Practical takeaway**: a single fresh 11.5 g dry yeast packet, pitched dry (no starter needed — dry yeast doesn't require or benefit from a starter the way liquid yeast does) provides a healthy, adequate pitch for a standard 19–23 L (5–6 US gallon) batch at typical ale gravities (roughly up to 1.055–1.060 OG). Above that, or for lagers (which want double the cell density), consider two packets rather than assuming one packet scales indefinitely.

### Liquid yeast

Liquid yeast (Wyeast "Activator" smack-packs and White Labs "PurePitch" vials/tubes) is sold as a live, unconcentrated slurry — typically **around 100 billion cells per package** at the time of manufacture for a standard pack, according to widely cited figures from both companies' product literature and retailers.

The key liability of liquid yeast is **viability decay over time and with imperfect storage**. Both Wyeast and White Labs date their packages and guarantee viability for a stated shelf window (commonly cited as around 4–6 months from manufacture under proper refrigeration), but viable cell counts decline continuously from the day the yeast is packaged, not just after the "best by" date. A commonly repeated industry rule of thumb — cited across multiple homebrewing references, though not a value this document can point to a single definitive peer-reviewed source for — puts the decline at roughly **20–25% viability loss per month** under good (refrigerated) storage conditions, with some sources citing a somewhat gentler ~15%/month. Treat that percentage as a widely used *planning estimate*, not an exact guaranteed figure — actual decay depends on strain, storage temperature stability, and the specific packaging technology (which both major manufacturers have iterated on over the years specifically to slow this decline).

**Practical implication:** always check the manufacture date on a liquid yeast package before brewing. A pack that's 2–3 months old at the time of pitching may need a larger starter (or a full step-up starter) to reach the same effective cell count you'd get from pitching a fresh pack directly.

### Yeast starters — when and why

A starter — growing yeast in a small batch of dilute wort before pitch day — exists to solve one problem: liquid yeast packages, even fresh, often don't contain enough viable cells to hit the pitch rate targets above for anything beyond a standard-gravity ale.

**When a starter is generally needed:**
- Liquid yeast pitched into any batch with OG above roughly 1.060, where a single fresh pack's ~100 billion cells fall short of the ~0.75 million cells/mL/°P ale target once you do the math.
- Liquid yeast for **any** lager, since the lager target (~1.5 million cells/mL/°P) is double the ale target — a single pack of liquid lager yeast is essentially never enough on its own without a starter (or multiple packs).
- Liquid yeast that isn't fresh — see the viability decay discussion above.

**When a starter is generally not needed:**
- Dry yeast, at essentially any homebrew-scale gravity — dry sachets already deliver a very high cell count per gram, and rehydrating dry yeast in a nutrient solution before pitching (a different, much shorter process than a starter) is a matter of yeast health, not cell count.
- Fresh liquid yeast on a standard-gravity ale (roughly ≤1.055–1.060 OG).

**Starter methodology, at a high level:**
1. Make a dilute wort using dried malt extract (DME) — commonly around 1.030–1.040 OG, well below beer strength, because the goal is maximizing yeast reproduction, not alcohol production.
2. Boil briefly (10–15 minutes) to sanitize and drive off DMS precursors, then cool and pitch the liquid yeast pack into it.
3. Ferment the starter on a **stir plate** if available — continuous agitation keeps the wort aerated and yeast in suspension, which measurably increases cell yield (commonly cited as a 25–50% improvement over a static starter) compared to just leaving it alone in a flask.
4. Once the starter has finished (krausen has fallen, typically 18–48 hours depending on size and temperature), **decant**: refrigerate the flask for 12–24 hours to let the yeast fully compact at the bottom, then carefully pour off and discard the spent, flavor-poor starter wort, leaving behind just the concentrated yeast slurry to pitch. Decanting matters most for lagers and other clean/delicate styles, where you don't want the starter wort's own (different, extract-derived) flavor contribution diluting or clashing with your actual beer.

## Repitching and harvesting yeast

Reusing yeast from a finished batch to pitch into the next one is standard practice for brewers who ferment regularly — it's economical and, done well, can actually improve consistency, since you're reusing a population that's already proven itself in your process.

**Basic process:**
1. After racking/kegging the finished beer off the yeast cake, collect a portion of the trub/yeast layer at the bottom of the fermenter into a sanitized container.
2. Optionally **wash** the harvested slurry: dilute it heavily with several volumes of cool, sanitized/pre-boiled water, shake, and let it settle briefly. Trub and dead cell matter settle out first (bottom layer) while healthy yeast stays suspended slightly longer, so decanting the middle layer into a fresh sanitized container gives you a cleaner yeast sample than the raw harvested slurry. This is a cleanup/quality step, not a sterilization step.
3. Store the washed/harvested yeast refrigerated, ideally used within about two weeks — it's a live culture, not a shelf-stable product, and viability declines faster in an unwashed slurry contaminated with dead cells and trub than in commercial packaging.
4. Pitch directly, or build a small starter first to verify viability and health before committing it to a full batch.

**Generation limits:** there's no hard cutoff, but commonly cited practical limits are **roughly 5–10 generations for ale strains** and a notably lower **3–4 generations for lager strains** before genetic drift, contamination accumulation, or gradually declining performance make starting from fresh commercial yeast the safer bet. Commercial breweries with tighter quality control and acid-washing protocols can push generation counts higher than homebrewers reasonably should.

**Contamination risk considerations:** every repitch is an opportunity for a wild yeast or bacterial contaminant introduced during harvesting to get carried forward and amplified in the next batch — and once established, that contamination compounds with every subsequent generation. Basic hygiene (sanitized harvesting vessels, minimizing time the harvested slurry sits exposed, not harvesting from a batch that showed any signs of infection) matters more here than with fresh commercial yeast, precisely because there's no quality-control step between "yeast cake" and "next batch" the way there is with a manufacturer's packaging process. Commercial breweries manage this risk at scale with acid washing (a brief, controlled exposure to food-grade phosphoric acid, which yeast tolerates far better than most bacteria) — a technique available to serious homebrewers too, though it's an extra step most casual repitchers skip in favor of simply not pushing generation counts too high and staying vigilant for off-smells or unusual fermentation behavior.

## Practical guidance: WHY / WHAT / WHEN / ACTION / CONSEQUENCE

### Your fermentation temperature read higher than the strain's stated range

- **WHY it matters:** Yeast metabolism, especially ester and fusel alcohol production, is strongly temperature-driven. Nearly every strain's spec sheet range represents the window where the manufacturer has verified the flavor profile they're advertising; exceeding it pushes metabolism into territory the strain wasn't characterized for.
- **WHAT's likely to happen:** Faster, more vigorous fermentation than expected; a bigger krausen; increased ester production (often fruity to the point of unbalanced); potential for harsh fusel alcohol character; for strains sensitive to it, increased diacetyl or (for wheat strains) a shift away from clove and hard toward banana.
- **WHEN to act:** As soon as you notice the reading — fermentation temperature control matters most in the first 24–72 hours, when the yeast is most metabolically active and most of the flavor-defining byproducts are produced.
- **ACTION you can take now:** Move the fermenter to a cooler location, use a water bath with frozen water bottles/ice packs (swapped periodically), a wet t-shirt with a fan (evaporative cooling), or a temperature-controlled chamber if you have one. Bringing the temperature down even partway helps — you don't need to hit the exact target instantly, just arrest further drift upward.
- **CONSEQUENCE if you do nothing:** The beer will likely still ferment to completion, but the flavor profile will skew toward more fruity/estery (or, if temperatures got high enough, solvent-like/hot) than the strain's typical character — for a clean American ale strain like US-05, this means an unwanted fruitiness that reads as a flaw rather than an intentional style trait. The beer isn't necessarily ruined, but it won't taste like the reference examples or descriptions you were expecting from that strain.

### You pitched a single dry packet into a 1.080 OG beer

- **WHY it's a risk:** A single fresh 11.5 g dry packet comfortably covers standard-gravity ales, but 1.080 is a high-gravity wort. Using the ~0.75 million cells/mL/°P ale target, a 1.080 (~19°P) wort in a 19 L batch needs meaningfully more cells than one packet reliably provides once you also account for the extra alcohol stress a high-gravity fermentation places on the population.
- **WHAT's likely to happen:** Effective underpitching — a longer lag phase, a slower and more stressed fermentation, elevated fusel alcohols and esters beyond what the strain would normally produce, and a real risk the fermentation stalls before reaching the strain's expected attenuation, leaving the beer sweeter and less alcoholic than intended.
- **WHEN you could have acted:** Before pitching — this is a planning-stage problem, not something you fix mid-fermentation.
- **ACTION you could have taken:** Pitch two packets instead of one (dry yeast is cheap and this is the simplest fix), or rehydrate the yeast properly in warm water with yeast nutrient before pitching to maximize the viable cells you do have.
- **What to watch for now, having already pitched one packet:** Monitor for an unusually long lag phase (more than 24–48 hours with no visible activity), and watch final gravity carefully against the strain's expected attenuation — if fermentation appears to stop well short of expectations, consider a gentle rousing of the yeast (swirling the fermenter) or, in a worse case, pitching a fresh packet of rehydrated yeast to restart a stalled fermentation. Taste for excessive hot/solvent character as a sign the existing population was pushed too hard.
- **CONSEQUENCE if you do nothing further:** Best case, the beer finishes slightly underattenuated and a bit rougher/hotter-tasting than it would have with a proper pitch, but is still drinkable. Worst case, fermentation stalls meaningfully short of target gravity, leaving a too-sweet, under-attenuated beer that may also be at elevated infection risk from the extended time spent at fermentation temperature without vigorous, protective yeast activity.

### Your lager finished primary fermentation — diacetyl rest, or straight to cold lagering?

- **WHY do a diacetyl rest:** All fermenting yeast produce diacetyl and its precursor (alpha-acetolactate) as a side effect of amino acid synthesis. Healthy, active yeast reabsorbs and metabolizes diacetyl back out of the beer late in fermentation — but this cleanup reaction is slow at cold lager fermentation temperatures. A diacetyl rest raises the temperature for a short period specifically to speed up that cleanup while the yeast is still in suspension and active enough to do it.
- **WHAT a diacetyl rest involves:** Once primary fermentation is substantially complete (gravity near or at expected terminal gravity), raise the beer's temperature by several degrees — commonly up into the 18–20°C (64–68°F) range — and hold for roughly 1–3 days before proceeding to lagering.
- **WHEN to do it:** After primary fermentation has finished or nearly finished (not during active, vigorous fermentation), and before transferring to cold lagering/crashing.
- **ACTION:** Let the fermenter warm up (simplest: just move it out of the fermentation chamber, or raise the chamber's setpoint) for the rest period, then proceed to cold-crash and lager as planned.
- **CONSEQUENCE if you skip it and go straight to cold lagering:** Chilling the beer immediately drops the yeast out of suspension and drastically slows its metabolic activity before it's had a chance to clean up the diacetyl and alpha-acetolactate already present. The alpha-acetolactate precursor can also continue slowly converting to diacetyl over time even in the cold, with no active yeast left to reabsorb it — so the finished beer can develop a noticeable buttery/butterscotch off-flavor that wasn't there (or wasn't yet perceptible) at the time you racked it cold. This is one of the most common reasons a home-lagered beer ends up tasting "off" in a way the brewer can't immediately place; a proper diacetyl rest is cheap insurance against it.

## Sources

- [Fermentis — SafAle US-05](https://fermentis.com/en/product/safale-us%E2%80%9105/)
- [Fermentis — SafAle S-04](https://fermentis.com/en/product/safale-s%E2%80%9104/)
- [Fermentis — SafAle WB-06](https://fermentis.com/en/product/safale-wb%E2%80%9106/)
- [Fermentis — SafLager W-34/70](https://fermentis.com/en/product/saflager-w-34-70/)
- [Lallemand Brewing — LalBrew BRY-97](https://www.lallemandbrewing.com/en/united-states/products/bry-97-west-coast-ale-yeast/)
- [Lallemand Brewing — LalBrew Abbaye](https://www.lallemandbrewing.com/en/united-states/products/abbaye-belgian-ale-yeast/)
- [Lallemand Brewing — LalBrew Belle Saison technical data sheet](https://files.scottlab.com/uploads/BELLE%20SAISON%20TDS.pdf)
- [Lallemand Brewing — LalBrew Diamond](https://www.lallemandbrewing.com/en/south-america/product-details/diamond-lager-yeast/)
- [Lallemand Brewing — LalBrew NovaLager](https://www.lallemandbrewing.com/en/global/product-details/)
- [Lallemand Brewing — LalBrew Voss Kveik technical data sheet](https://files.scottlab.com/uploads/VOSS%20TDS.pdf)
- [Wyeast Laboratories — 1056 American Ale](https://wyeastlab.com/product/american-ale/)
- [Wyeast Laboratories — 1968 London ESB](https://wyeastlab.com/product/london-esb-ale/)
- [Wyeast Laboratories — 1214 Belgian Abbey Style Ale](https://wyeastlab.com/product/belgian-abbey-style-ale/)
- [Wyeast Laboratories — 3068 Weihenstephan Weizen](https://wyeastlab.com/product/weihenstephan-weizen/)
- [Wyeast Laboratories — 2124 Bohemian Lager](https://wyeastlab.com/product/bohemian-lager/)
- [Wyeast Laboratories — Making a Yeast Starter](https://wyeastlab.com/resource/home-enthusiast-making-a-yeast-starter/)
- [Wyeast Laboratories — Yeast Harvesting & Repitching](https://wyeastlab.com/resource/professional-yeast-harvesting-repitching/)
- [White Labs — WLP001 California Ale](https://www.whitelabs.com/yeast-single?id=102&type=YEAST)
- [White Labs — WLP002 English Ale](https://www.whitelabs.com/yeast-single?id=102&type=YEAST)
- [White Labs — WLP300 Hefeweizen Ale](https://www.whitelabs.com/yeast-single?id=148&type=YEAST)
- [White Labs — WLP530 Abbey Ale](https://www.whitelabs.com/yeast-bank/wlp530-abbey-ale-yeast)
- [White Labs — WLP830 German Lager](https://www.whitelabs.com/yeast-single?id=102&type=YEAST)
- [White Labs — FAQ (viability/storage)](https://www.whitelabs.com/faq)
- [Braukaiser.com (Kai Troester) — Understanding Attenuation](https://braukaiser.com/wiki/index.php/Understanding_Attenuation)
- [Brew Your Own — Calculating Alcohol Content, Attenuation, Extract, and Calories](https://byo.com/articles/calculating-alcohol/)
- [Brew Your Own — Yeast Pitching Rates](https://byo.com/articles/pitching-rates-advanced-homebrewing/)
- [Brew Your Own — Understanding Pitching Rates](https://byo.com/mr-wizard/understanding-pitching-rates/)
- [Brew Your Own — Reusing Homebrew Yeast](https://byo.com/articles/reusing-homebrew-yeast/)
- [American Homebrewers Association — Determining Proper Yeast Pitch Rates](https://homebrewersassociation.org/how-to-brew/determining-proper-yeast-pitch-rates/)
- [American Homebrewers Association — Yeast Washing & Yeast Rinsing](https://homebrewersassociation.org/how-to-brew/yeast-washing-yeast-rinsing-whats-difference/)
- [Mr. Malty pitch rate calculator — Jamil Zainasheff](https://www.mrmalty.com/calc/calc.html)
- [Brülosophy — Yeast Comparison: WLP001 vs. Safale US-05](https://brulosophy.com/2017/04/03/yeast-comparison-white-labs-wlp001-california-ale-vs-safale-us-05-american-ale-exbeeriment-results/)
- [Brülosophy — Fermentation Temperature: Saflager W-34/70](https://brulosophy.com/2016/02/08/fermentation-temperature-pt-4-lager-yeast-saflager-3470-exbeeriment-results/)
- [Brülosophy — Yeast Starter Method](https://brulosophy.com/methods/yeast-starter-method/)
- [PMC — Lager-brewing yeasts in the era of modern genetics](https://pmc.ncbi.nlm.nih.gov/articles/PMC6790113/)
- [Frontiers in Microbiology — A Unique *S. cerevisiae* × *S. uvarum* Hybrid Isolated From Norwegian Farmhouse Beer](https://www.frontiersin.org/journals/microbiology/articles/10.3389/fmicb.2018.02253/full)
