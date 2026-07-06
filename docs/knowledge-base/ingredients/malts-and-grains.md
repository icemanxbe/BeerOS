# Malts and Grains

Malted barley (and, to a lesser extent, malted wheat and rye) is the backbone of nearly every beer. This document covers the malts and adjunct grains a home brewer will actually encounter — what they are, how they're made, what they contribute to a beer, and how to reason about swapping one for another. It is written to be useful both to a first-time extract brewer and to an experienced all-grain brewer tuning a grain bill.

Throughout, color is given in both **°Lovibond (°L)** — the traditional American scale for grain color — and **°EBC**, the European Brewery Convention scale used on most European (especially German) maltster spec sheets. Diastatic power is given in **°Lintner (°L, sometimes written °ASBC or WK)**, a measure of enzyme strength, not to be confused with color degrees Lovibond (unfortunately both use "°L" as an informal shorthand — context makes clear which is meant).

---

## 1. How malt color is measured, and why EBC and °Lovibond don't match 1:1

Malt (and beer) color is measured by shining light through a solution and reading its absorbance on a spectrophotometer. Historically the U.S. brewing industry adopted the **Lovibond** scale (originally based on matching color to a set of tinted glass slides) while Europe adopted the **EBC** scale, a more standardized spectrophotometric method. Both scales measure the same physical property, so they are close to linearly related, but they are not identical, and different sources round the ratio slightly differently.

The commonly cited approximate conversions are:

- **EBC ≈ 1.97 × °L** (equivalently °L ≈ EBC / 1.97)
- Some sources use the older, cruder approximation **EBC ≈ 2 × °L**, which is close enough for a quick mental estimate but understates EBC slightly at higher color values.

For finished *beer* color (as opposed to raw grain color), the standard reference is John Palmer's *How to Brew*, which gives the SRM-to-EBC relationship as **EBC = SRM × 1.97** (and, since SRM and °Lovibond are approximately equal for typical brewing-strength worts, this same 1.97 factor is commonly reused for malt-to-EBC conversions). Palmer's site and most modern brewing calculators (Beer Maverick, Brewer's Friend, BeerSmith, Kaiser's braukaiser.com) all converge on 1.97 as the standard multiplier. Always treat any single-multiplier conversion as an approximation — maltster spec sheets that publish both values directly (Weyermann in particular publishes both °L and EBC on every spec sheet) are more accurate than a computed conversion, because the two measurement methods don't track perfectly linearly across the entire color range.

The MCU/Morey-equation math for computing a *finished beer's* SRM from a grain bill is covered in depth in the calculators doc — see [`../math/calculators-and-formulas.md`](../math/calculators-and-formulas.md) for the full worked formulas. The concept is introduced in section 7 below.

---

## 2. Diastatic power: why some malts can convert starch and others can't

**Diastatic power (DP)** measures the amount of active starch-converting enzymes (mainly alpha-amylase and beta-amylase) present in a malt, expressed in **°Lintner** (sometimes reported in °WK/Windisch-Kolbach on European spec sheets — the two scales are related but not identical, so always check which unit a spec sheet uses).

These enzymes are produced during malting (germination) and partially destroyed by kilning heat — the more aggressively a malt is kilned or roasted, the less enzyme survives. This is why:

- **Pale base malts** are kilned gently and retain high DP.
- **Darker base malts** (e.g., dark Munich) retain much less DP.
- **Crystal, roasted, and other specialty malts** are essentially **zero-DP** — the enzymes are destroyed or, in crystal malt's case, already used up converting the kernel's own starch during stewing (see section 3). They contribute no conversion power and rely entirely on base malt elsewhere in the mash.

**Rule of thumb: a malt needs roughly 35 °Lintner or more to be considered "self-converting"** — meaning it has enough enzyme power to convert its own starch to fermentable sugar in a normal single-infusion mash without help. Malts below that threshold must be mashed alongside a sufficient proportion of a high-DP base malt to supply the missing enzymes; used alone, their starches would simply gelatinize and dissolve into the mash as unconverted, largely unfermentable starch, producing very poor efficiency and a starch haze.

Typical DP figures (°Lintner) reported by maltsters and standard references:

| Malt | Typical DP (°Lintner) | Self-converting? |
|---|---|---|
| American 2-row pale malt | ~120–160 | Yes, comfortably |
| American 6-row pale malt | ~160–180+ | Yes, highest of common base malts |
| German Pilsner malt | ~100–130 | Yes |
| Vienna malt | ~90–110 | Yes |
| Munich malt, light (~10 °L) | ~60–70 | Yes, but reduced |
| Munich malt, dark (~20 °L) | ~25–45 (maltster-dependent; some as low as ~20) | Marginal to no — check the specific spec sheet |
| Maris Otter (English pale ale malt) | ~100–150 | Yes |
| Wheat malt | ~120–160 (similar to or higher than barley pale malt) | Yes |
| Rye malt | Moderate; lower than 2-row, sufficient in small proportions | Marginal alone at high %, fine as a minority grain |
| Crystal/caramel malts (all colors) | ~0 | No |
| Roasted malts (chocolate, black patent, roasted barley, Carafa) | ~0 | No |
| Flaked/unmalted adjuncts (corn, rice, oats, wheat, torrified wheat) | 0 (not malted at all) | No — always require base malt enzymes |

Numbers vary meaningfully by maltster, harvest year, and specific product line — always check the actual Certificate of Analysis (COA) or spec sheet for the exact bag you're using rather than treating table values as exact. The general shape (pale base malts high, dark base malts marginal, specialty/roasted/adjuncts effectively zero) is what matters for recipe design.

---

## 3. Base malts

Base malts form the bulk (typically 60–100%) of most grain bills. They are kilned just enough to stop germination and develop basic malty flavor while preserving the enzymes needed for starch conversion.

### 2-row pale malt (American)
The default base malt for most American ale styles. Kilned to a light color (roughly **1.8–2 °L / 3.5–4 °EBC** for premium 2-row, up to ~3.5 °L for some "pale ale" labeled 2-row products), with high diastatic power (commonly **120–160 °Lintner**). "2-row" refers to the barley variety's spike structure (two rows of kernels per spike, versus six), which gives a plumper kernel, thinner husk, lower protein, and cleaner flavor than 6-row. Used from 40% up to 100% of a grain bill.

### 6-row pale malt (American)
Historically the dominant American brewing barley before 2-row became widely available; still used by large adjunct-lager breweries and some homebrewers. 6-row has a thinner, more numerous kernel structure, **higher protein content**, a **thicker husk**, and **higher diastatic power** than 2-row (a comparative Briess/industry commonplace: roughly 10–20+ °Lintner higher than an equivalent 2-row). The higher enzyme reserve is specifically valuable when mashing large proportions of low/no-DP adjuncts (corn, rice) because 6-row can supply enough enzyme to convert both its own starch and the adjunct's. The thicker husk also improves lauter-bed filtration when adjunct load is high, though it also carries a higher risk of tannin extraction/husky harshness if oversparged. Typical American light-lager grists using 6-row run it at roughly 50–70% with the balance being corn or rice.

### Pilsner malt (German/Continental)
The palest base malt commercially available, kilned very gently to preserve a delicate, slightly bready-sweet flavor with minimal Maillard/toasty character. Typically **1.2–2 °L / ~2.5–4 °EBC**, DP commonly **100–130 °Lintner** or higher depending on maltster. Because it's so pale and delicately flavored, it is unforgiving of mash mistakes (scorching, poor temperature control) that would be masked in a darker beer — it's the base malt of choice for pilsners, helles, and other pale lagers where malt character needs to be clean and let the hops/yeast character show. Frequently used at up to 100% of the grist.

### Vienna malt
Kilned somewhat darker/longer than Pilsner malt, developing more toasty, biscuity, lightly caramel malt character while still retaining strong diastatic power. Typically **3–4 °L / ~6–8 °EBC**, DP roughly **90–110 °Lintner**. Classic base for Vienna lager, Märzen/Oktoberfest (often blended with Munich), and as a flavor-boosting substitute for a portion of 2-row/Pilsner malt in ales. Can be used up to 100% of the grist, though it's most often blended with Pilsner or 2-row (10–100% depending on desired malt intensity).

### Munich malt (light and dark)
Kilned notably longer/hotter than Vienna, developing pronounced malty, bready, sometimes faintly toasty/nutty character via Maillard reactions. Comes in two common strengths:
- **Light Munich**, roughly **6–10 °L / ~12–20 °EBC**, DP roughly **40–70 °Lintner** — still self-converting on its own, though with less surplus enzyme than a pale base malt.
- **Dark Munich**, roughly **15–20+ °L / ~30–40+ °EBC**, DP drops further, and depending on the maltster can fall **below the ~35 °Lintner self-converting threshold** — treat any dark Munich as needing verification against its actual COA, and blend with a higher-DP base malt if there's any doubt.

Munich malt is used anywhere from 10% (as a flavor accent in an ale) up to 100% (traditional Munich Dunkel, Bock). The German brewing tradition of "decoction mashing" was originally developed in part to compensate for undermodified, low-enzyme Munich malts of the era; modern well-modified Munich malt makes decoction largely optional (a flavor/tradition choice rather than a technical necessity) for most home brewers.

### Maris Otter
A specific English 2-row winter barley variety (not a generic term), prized for a rich, biscuity, slightly nutty malt character and long-standing reputation among English/craft brewers for consistency. Color runs similarly to American 2-row, roughly **2.5–3.5 °L / ~5–7 °EBC**, with good diastatic power (~**100–150 °Lintner**, varies by maltster/crop year). It costs more than generic 2-row and is chosen specifically for English ale styles (bitters, English pale ale, porter) where its distinctive malt flavor is a defining character, not just a fermentable-sugar source.

### Wheat malt
Malted wheat (as opposed to unmalted flaked wheat, see section 5) contributes to head retention and a soft, sometimes slightly tart or bready flavor, and is essential to German wheat beer styles (Weizen/Weissbier, typically 50–70% wheat malt) and a common minority addition (5–20%) in American wheat beers and hazy IPAs for body/haze/head retention. Wheat malt itself carries decent diastatic power (often comparable to or higher than base barley malt) and typical color around **1.5–2 °L / ~3–4 °EBC**, but it has **no husk**, which can cause a stuck or slow lauter at high percentages — mixing in rice hulls is a common home-brewer fix when running high wheat-malt percentages in a traditional lauter tun.

### Rye malt
Malted rye contributes a distinctive spicy, slightly sour/dry, "rye bread" character and a silky-to-gummy mouthfeel from its high beta-glucan and pentosan content. It has moderate diastatic power (generally usable at minority percentages without additional enzyme support) but, like wheat, is huskless and very high in gums, so mashes with significant rye content (much above ~20–30%) can become viscous and difficult to lauter without a protein/glucan rest and/or rice hulls. Typically used at 10–30% for a Roggenbier or as a smaller specialty accent elsewhere.

### Base malt summary table

| Malt | Typical color | Typical DP | Self-converting alone? | Typical usage % |
|---|---|---|---|---|
| 2-row pale (American) | ~1.8–3.5 °L / 3.5–7 °EBC | ~120–160 °L | Yes | 40–100% |
| 6-row pale (American) | ~1.8–3.5 °L / 3.5–7 °EBC | ~160–180+ °L | Yes (highest) | 50–70% (with adjuncts) |
| Pilsner malt | ~1.2–2 °L / 2.5–4 °EBC | ~100–130 °L | Yes | up to 100% |
| Vienna malt | ~3–4 °L / 6–8 °EBC | ~90–110 °L | Yes | 10–100% |
| Munich malt, light | ~6–10 °L / 12–20 °EBC | ~40–70 °L | Yes (reduced margin) | 10–100% |
| Munich malt, dark | ~15–20+ °L / 30–40+ °EBC | ~20–45 °L (verify COA) | Marginal/no | 10–50% |
| Maris Otter | ~2.5–3.5 °L / 5–7 °EBC | ~100–150 °L | Yes | 40–100% |
| Wheat malt | ~1.5–2 °L / 3–4 °EBC | High (≥ base barley, varies) | Yes | 5–70% |
| Rye malt | Light-moderate | Moderate | Marginal at high % | 10–30% |

---

## 4. Specialty / crystal / caramel malts

Crystal and caramel malt (the terms are used interchangeably in North America; some maltsters distinguish "caramel" as the American-style product and "crystal" as the British-style, but functionally they're the same process) are made completely differently from base and roasted malts.

### How they're made: stewing, not just kilning
Base and roasted malts are dried/roasted **dry** — the malt is fully kilned (dried out) before any color-developing heat is applied. Crystal/caramel malt is made from **green (undried, still-wet) malt**, which is loaded into a rotating drum roaster and held at a mash-like temperature (roughly **60–79°C / 140–175°F**, squarely in the alpha/beta-amylase activity range) while still full of moisture. This effectively "mashes" the starch **inside each individual kernel** — the kernel's own enzymes convert the internal starch to sugar before any drying occurs. The roaster is then ramped up to higher, browning/caramelizing temperatures, which — because the sugary kernel interior is still wet — causes the sugars to **caramelize and then solidify into a hard, glassy, unfermentable structure** when the kernel cools. Cut a crystal malt kernel open and the center looks like hard candy or glass; this is why crystal malt contributes sweetness (some fermentable, much of it not) rather than fermentable extract in the way base malt does. This stewing step is also exactly why crystal/caramel malts carry **zero diastatic power** — the enzymes are entirely consumed converting the kernel's own starch during the stew, leaving nothing to contribute to the rest of the mash.

Color in this family is a direct function of how long/hot the stewing and subsequent kilning runs, giving a continuum typically labeled by Lovibond rating:

| Product | Typical color | Flavor/aroma contributed |
|---|---|---|
| Crystal/Caramel 10L | ~10 °L / ~20 °EBC | Very light sweetness, barely perceptible caramel note |
| Crystal/Caramel 20L | ~20 °L / ~39 °EBC | Light caramel, light sweetness |
| Crystal/Caramel 40L | ~40 °L / ~79 °EBC | Medium caramel, toffee, light raisin |
| Crystal/Caramel 60L | ~60 °L / ~118 °EBC | Rich caramel, toffee, light dried-fruit |
| Crystal/Caramel 80L | ~80 °L / ~158 °EBC | Deep caramel, dark toffee, raisin/dried fruit |
| Crystal/Caramel 120L | ~120 °L / ~236 °EBC | Very dark, burnt-sugar/molasses, raisin, minimal sweetness (starts overlapping roasted-malt territory) |
| Honey malt | ~15–25 °L | Distinctive intense honey/bready/toast character, sweetness without the "caramel" note — made by a different (non-stewed, low-temperature Maillard) proprietary kilning process, notably by Gambrinus |
| Victory / Biscuit malt | ~25–28 °L | Toasty, biscuity, baked-bread, light nutty note — dry-kilned (not stewed) like a base malt taken to a higher toast, contributes essentially no sweetness, more like a "flavor" malt than a "caramel" malt |
| Aromatic malt | ~20 °L | Intensified Munich-like malt aroma and flavor; hybrid Munich-style kilning taken further |
| Melanoidin malt | ~25–30 °L | Rich malty, honey/biscuit-like character, boosts "malty depth" without much sweetness; associated with Maillard/melanoidin reaction compounds |

(Honey malt, Victory/biscuit, aromatic, and melanoidin malts are **not** stewed the same way true crystal/caramel malts are — they're dry-kilned at controlled temperatures to develop Maillard browning flavors rather than caramelized-sugar sweetness. They're grouped here with "specialty malts" because they serve the same recipe role: added in small percentages purely for flavor/color rather than as a primary fermentable source.)

### Usage limits and why "more" backfires
Most homebrewing references converge on **5–10% of the grain bill as a sensible target for combined crystal/caramel malt**, with 20% cited as a hard outer ceiling that is rarely advisable. The reasons more is not better:

- **Unfermentable sugar and cloying sweetness**: the caramelized sugars inside a crystal kernel are largely non-fermentable dextrins. Every percentage point of crystal malt raises the beer's residual sweetness and final gravity contribution disproportionately to how much it raises fermentable extract. Small amounts (a few percent) round out body and add complexity; too much and the beer finishes sweet, heavy, and one-dimensional — brewers often describe the failure mode as the beer tasting "sticky" or like liquid candy.
- **Flavor stacking is nonlinear** — caramel/toffee/raisin notes intensify quickly with added percentage, and darker crystal malts (80L+) can tip into a slightly burnt or medicinal quality if overused.
- **Diminishing "authenticity" for style** — many styles (English bitters, Scottish ales, amber ales) rely on a *specific* small addition (often just one crystal malt at 5–10%) for their identity; doubling that amount doesn't intensify the style, it distorts it.

---

## 5. Roasted malts

Roasted malts are dry-kilned (not stewed) at very high temperatures, essentially a coffee-roasting process applied to malted (or, for roasted barley, unmalted) barley. They contribute color and dark-roast flavor almost exclusively — negligible or no diastatic power, and minimal fermentable extract contribution relative to their color impact.

| Malt | Typical color | Flavor character | Typical usage % |
|---|---|---|---|
| Chocolate malt | ~350–450 °L / ~700–900+ °EBC | Coffee, mild chocolate, roasty but not sharply burnt | 1–10% (stouts/porters), small % elsewhere for color |
| Black patent malt | ~500–600 °L / ~985–1180+ °EBC | Sharp, dry, burnt/acrid, minimal sweetness; can taste ashy if overused | 1–5%, used sparingly for color and dry roast edge |
| Roasted barley | ~300–550 °L / ~590–1080+ °EBC | Coffee, espresso, dry roasty bite — **unmalted**, roasted straight from raw barley, giving a sharper, more "coffee-like" roast than chocolate malt; the signature grain of dry Irish stout | 3–10% (classic dry stout territory) |
| Carafa I / Carafa Special I (dehusked) | ~300–375 °L / ~590–740 °EBC | Smooth, mild roast, coffee/dark chocolate, much less harsh than an equivalent-color husked roast malt | 1–5%+ for color with minimal harshness |
| Carafa II / Carafa Special II (dehusked) | ~375–450 °L / ~740–885 °EBC | Deeper roast, espresso/cocoa, still smooth relative to husked equivalents | 1–5% |
| Carafa III / Carafa Special III (dehusked) | ~500–600 °L / ~985–1180+ °EBC | Very dark, espresso/dark cocoa, jet-black color contribution, minimal harsh bitterness | 0.5–3% (extremely high color yield per pound, used sparingly) |

### Why "dehusked" (Carafa Special) variants exist
Barley husk is rich in tannins and harsh, astringent polyphenolic compounds. Roasting a malt to very high color intensifies extraction of these compounds along with the desired roast flavor, which is why heavily roasted **husked** malts (standard chocolate, black patent, roasted barley) can taste harsh, acrid, or astringent if used too generously. Weyermann's Carafa Special line (and equivalent "dehusked" products from other maltsters) mechanically removes a large portion — commonly cited around 60% — of the husk **before roasting**, which substantially reduces tannin/astringency extraction while still delivering deep color and roast flavor. The practical result: Carafa Special malts let a brewer hit a very dark color (even jet black, as in a schwarzbier or black IPA) without the beer tasting bitter/harsh/tannic the way an equivalent amount of standard husked black malt would. This matters especially for **lagers and lighter-bodied dark styles** (schwarzbier, dunkles bock, black lager) where a brewer wants deep color without the assertive roast bitterness that fits a stout but not a smooth dark lager.

---

## 6. Adjunct grains and unmalted starches

"Adjunct" here means any starch source used alongside base malt that is not itself malted barley — flaked/rolled grains, raw/torrified grains, and malted grains other than barley (wheat, rye — covered above since they're malted and self-sufficient in enzymes). The unmalted adjuncts below have **no diastatic power of their own** (they were never malted, so no enzymes were ever produced) and therefore **always require enough base malt in the same mash to supply all the conversion enzymes**, both for their own starch and the base malt's.

### Flaked oats
Rolled/steamed oat flakes (pre-gelatinized during flaking, so no separate cereal mash is needed — they can go straight into a normal single-infusion mash). Contribute body, a silky/creamy mouthfeel, and — thanks to high beta-glucan and protein content — significant **haze**, which is exactly why they're a defining ingredient in New England IPA ("hazy IPA") grists, often used at **10–20%** (some NEIPA recipes push 15–30% of "thickening grains" total, of which oats are commonly the largest share) specifically for mouthfeel and haze stability. At high percentages, the beta-glucans can make lautering slow/gummy; a **beta-glucan rest around 35–45°C / 95–113°F** is the traditional fix, though many homebrewers skip it at moderate (≤15%) percentages without serious issue, especially with a modern well-modified base malt and efficient lautering setup (e.g., BIAB).

### Flaked wheat
Similar role to flaked oats but with less beta-glucan and more emphasis on **head retention and a light haze/body boost** without oats' distinctive silkiness. Common in Belgian wits and American wheat beers, typically 5–15% (higher in wit, alongside or instead of wheat malt).

### Flaked corn (maize)
Used to **lighten body and dry out the finish** — corn contributes fermentable extract with none of barley's protein/flavor baggage, producing the crisp, light-bodied character of American adjunct lagers. Typically used at **10–30%+** in American lager clones (classic pre-Prohibition lager recipes and modern "cheap lager" clones alike). Corn starch does **not gelatinize in the normal barley mash range** — it requires much higher temperatures (see cereal mash section below) — so flaked corn (pre-gelatinized during flaking) is the practical home-brewer-friendly form; raw corn grits require a cereal mash.

### Flaked rice
Similar role to corn: lightens body, ferments very cleanly, and contributes essentially no flavor of its own, which is exactly the point in styles like American light lager where a crisp, neutral profile is the goal. Typically **10–20%+**. Like corn, raw rice's gelatinization temperature is above the normal mash range, so flaked (pre-gelatinized) rice is the practical choice; the famous macro-lager approach of cooking rice separately is a cereal mash by another name.

### Torrified wheat
Wheat that has been puffed/popped by rapid heating (similar in principle to popcorn), which gelatinizes the starch and makes it usable in a normal mash without a cereal mash step. Used similarly to flaked wheat — head retention, light body, minor haze contribution — at similarly modest percentages (roughly 5–10%).

### Malted wheat vs. flaked wheat — why the difference matters
Malted wheat (section 3) has its own diastatic power and can be pushed to very high percentages (German Weizen at 50-70% wheat malt) without external enzyme concerns, because the wheat malt itself is carrying real conversion capacity alongside the base malt. **Flaked (unmalted) wheat has none of that** — it's pure starch with no enzymes, so it must be treated exactly like corn or rice: always paired with enough diastatic base malt in the same mash, and typically kept to a modest minority percentage (5-15%) unless the base malt's enzyme reserve is verified to be more than sufficient to convert everything present.

### Gelatinization temperatures and why they matter
Starch must gelatinize (its granular structure must swell and open up in hot water) before amylase enzymes can access and convert it. Barley malt's own starch gelatinizes within the normal mash range, which is part of why a single-infusion mash of malted barley works at all. Other grains gelatinize at different — sometimes much higher — temperatures:

| Grain starch | Approximate gelatinization range |
|---|---|
| Barley | ~140–150°F / 60–65°C |
| Wheat | ~136–147°F / 58–64°C |
| Rye | ~135–158°F / 57–70°C |
| Oats | ~127–138°F / 53–59°C |
| Corn (maize) | ~143–165°F / 62–74°C |
| Rice | ~154–172°F / 68–78°C |

Corn and rice in particular gelatinize at temperatures that overlap the *upper* end or exceed the top of a typical saccharification mash (usually conducted around 148–158°F / 64–70°C), and raw/flaked forms can require heat beyond what a single-infusion mash comfortably reaches while still preserving enzyme activity. This is the historical reason for the **cereal mash**: raw corn grits or rice, mixed with a small proportion (roughly 10–15%) of crushed base malt for a little starting enzyme activity, is heated to gelatinization temperature and briefly boiled to fully break down the starch structure, then blended into the main mash where the bulk of the base malt's enzymes complete conversion at normal saccharification temperature. **Pre-gelatinized flaked forms of corn and rice sidestep this entirely** — the flaking process (steam-cooking and rolling) already gelatinizes the starch at the maltster, which is why homebrewers can use flaked corn/rice directly in a normal mash without a separate cereal mash step, while raw grits/uncooked rice still require one.

---

## 7. Malt extract (for extract and partial-mash brewers)

Malt extract is wort that has already been produced (mashed, lautered, and concentrated) at a commercial facility, sold either as a syrup (**liquid malt extract, LME**) or spray-dried powder (**dry malt extract, DME**). It lets extract brewers skip mashing and lautering entirely, and lets partial-mash brewers supplement a smaller mash to hit a target gravity.

### PPG / potential extract
"PPG" (points per pound per gallon) expresses how many gravity points one pound of a fermentable, fully dissolved in one gallon of water, will contribute. It's the standard unit for comparing fermentable potential across malt, extract, and adjuncts, and underpins gravity-prediction formulas covered in [`../math/calculators-and-formulas.md`](../math/calculators-and-formulas.md). Representative reference values, drawn from maltster/extract-producer data and cross-checked against standard homebrewing references (Palmer's *How to Brew*, Brewer's Friend, BeerSmith):

| Fermentable | Typical potential (PPG) | Notes |
|---|---|---|
| 2-row pale malt (100% mash efficiency basis) | ~36–37 | Actual realized PPG in a real batch = this value × your mash efficiency (commonly 65–80% for home all-grain systems) |
| Maris Otter / Pilsner / most other base malts | ~36–38 | Very similar to 2-row; minor maltster-to-maltster variation |
| Liquid malt extract (LME) | ~34–37 | Lower than DME because LME still contains roughly 20% residual water |
| Dry malt extract (DME) | ~42–46 | Higher than LME on a per-pound basis because virtually all water has been removed, concentrating the sugar per unit weight |
| Flaked corn / flaked rice | ~37–40 | High extract, contributes little flavor |
| Flaked oats / flaked wheat | ~33–35 | Lower than base malt; used for body/haze more than gravity |
| Crystal/caramel malts (general) | ~34–35, declining somewhat as color rises | Extract yield is real but a larger share is unfermentable dextrin, so actual attenuation of that extract is lower than base malt's |
| Roasted malts (chocolate, roasted barley, etc.) | ~25–34 | Contributes color/flavor far more than gravity; extract yield drops as roast level increases |

Because DME has had its water removed, **1 lb of DME ≈ 1.25 lb of LME** in terms of gravity contribution (roughly matching the ~42-46 vs ~34-37 PPG ratio above) — a useful rule of thumb when substituting one for the other in a recipe. Extract brewers converting an all-grain recipe (or vice versa) should scale by these PPG ratios rather than assuming a 1:1 substitution by weight.

### Extract for partial-mash and specialty-grain flavor
Extract itself is produced almost entirely from base malt, so it carries little of the flavor complexity that specialty/crystal/roasted grains bring. This is why even "extract" recipes commonly steep a small amount of crystal or roasted grain (in a steeping bag, well below mash temperature precision requirements since there's no starch-conversion goal for pre-converted specialty grains) to add color and flavor complexity that plain extract can't provide on its own. True starch-containing grains (base malt, unconverted adjuncts) cannot simply be "steeped" this way — they need an actual mash with enzyme activity and proper temperature control to convert; only already-modified/already-converted specialty grains (crystal, roasted) can be steeped for flavor/color extraction alone.

---

## 8. How grain-bill color combines: MCU and the Morey equation

Every grain in a recipe contributes color proportional to both its own color rating and how much of it is used, scaled by the batch size. The standard first step is computing **Malt Color Units (MCU)** for the grain bill:

**MCU = (grain weight in lb × grain color in °L) ⁄ batch volume in gallons**

Each grain's individual MCU contribution is summed across the whole grain bill to get a total MCU for the batch. Because color perception (and the physics of light absorbance) is not linear with concentration, total MCU is **not** the finished beer's SRM directly — a correction curve is needed. The widely adopted correction is the **Morey equation** (published by Dan Morey in 1995 in *Brewing Techniques* and since adopted as the de facto standard in essentially all homebrewing software):

**SRM = 1.4922 × (MCU^0.6859)**

This document only needs to introduce the concept — the full worked formula, unit conversions, and a worked numeric example (plus the SRM→EBC step) live in the calculators reference: see [`../math/calculators-and-formulas.md`](../math/calculators-and-formulas.md). The practical takeaway for grain-bill design: **doubling a dark specialty grain's usage does not double the beer's final color** — the Morey curve compresses at higher MCU values, so small amounts of very dark grain (roasted malts, dark Carafa) go a long way, while base and lightly-kilned malts need to be used in bulk to move color meaningfully.

---

## 9. Storage and freshness

Malt is a raw agricultural product and does stale, though slowly if stored well.

- **Whole (uncrushed) grain** stores well for an extended period — commonly cited as a year or more — when kept cool, dry, and away from light and pests, because the intact husk and dense kernel structure limit oxygen exposure to the interior.
- **Crushed grain oxidizes and stales much faster** than whole grain, because crushing exposes far more surface area (particularly the soft, oil- and enzyme-containing interior) to air, moisture, and light. Typical guidance is that crushed grain remains in good condition for roughly **a few weeks to a few months** (commonly cited outer bound: two to three months, with degradation becoming more noticeable toward six months) versus a year-plus for whole grain — a large relative difference even though controlled brewing experiments (e.g., Brülosophy's comparisons of freshly-milled vs. 6-month-old crushed grain) have had trouble getting tasters to reliably distinguish the two in finished beer, suggesting the practical flavor impact for a home brewer is smaller than the shelf-life numbers alone might imply.
- **Practical guidance**: buy whole grain and crush it yourself close to brew day whenever practical (this is the main reason home brewers own a grain mill rather than relying solely on pre-crushed grain from a shop). If buying pre-crushed grain (common when a homebrew shop mills to order, or for beginners without a mill), try to brew within a few weeks and store it airtight, cool, and dark in the meantime — a sealed container in a pantry or, better, a refrigerator, slows staling further.
- **Symptoms of stale/oxidized grain**: cardboard/papery off-flavors carried into the beer, reduced mash efficiency (enzyme activity can degrade somewhat with prolonged storage, particularly in humid conditions), and in extreme cases (grain stored damp) mold risk.

---

## 10. Practical decision guide

The sections below apply the "why it matters / what changes / when you'd want it / what to do / what happens if you do nothing" framing to the most common grain-bill decisions a brewer will face.

### Swapping a crystal malt for a different color (e.g., Crystal 60L → Crystal 40L)

- **Why it matters**: color, sweetness, and flavor intensity in the caramel/toffee family all scale with the stewing/kilning degree of the specific crystal malt — they are not interchangeable pound-for-pound just because they're both "crystal malt."
- **What the effect is**: a lower-Lovibond crystal (e.g., 40L vs 60L) contributes noticeably less color and a lighter, less intense caramel character at the same weight; a higher-Lovibond crystal pushes toward deeper caramel/toffee/dried-fruit notes and more color per pound.
- **When you'd want to do this**: to lighten a beer's color/flavor profile without removing the "caramel malt" character entirely (e.g., dialing back an amber ale toward a golden ale), or conversely to add more richness/darkness to a beer that's tasting thin or too pale for style.
- **What actions to take**: substitute by adjusting the weight to roughly hold the total MCU contribution constant if color match matters more than flavor match (weight × new °L ≈ weight × old °L, i.e., scale weight inversely to color change), but recognize this is only a good target for color — the flavor intensity does not scale identically to color, so taste-driven adjustment (small-batch testing, or trusting published flavor descriptors) matters more than pure math for getting the flavor right.
- **What happens if you don't adjust anything** (i.e., you substitute the same weight without recalculating): using the same weight of a lower-Lovibond crystal for a higher one will under-color and under-flavor the beer relative to the original recipe's intent; substituting a higher-Lovibond crystal for a lower one at the same weight will over-color and over-intensify the caramel character, and can push a recipe that was balanced at, say, 8% Crystal 40L into a cloying, too-dark result if swapped 1:1 for Crystal 90L.

### Using flaked oats above ~10-15%

- **Why it matters**: oats bring beta-glucans and protein that build body/haze/mouthfeel, but the same compounds that create the desirable "juicy," silky NEIPA texture also increase mash viscosity and can slow or stick a lauter.
- **What the effect is**: more oats = more body, more haze, softer/rounder mouthfeel, but rising risk of a slow or gummy lauter/sparge, and (since oats are lower-PPG than base malt) a mild drag on overall mash efficiency if not compensated for with extra base malt.
- **When you'd want to do this**: brewing a New England IPA or other hazy/juicy style where soft mouthfeel and persistent haze are explicitly desired style characteristics, not a flaw.
- **What actions to take**: consider a beta-glucan rest (roughly 95–113°F / 35–45°C for 10–20 minutes) before ramping to saccharification temperature at high oat percentages; use a fine mesh or BIAB-style full-volume mash setup that tolerates a stickier grain bed better than a traditional lauter tun with a false bottom; add a touch of extra base malt or a longer mash/higher efficiency target to offset oats' lower PPG contribution; consider rice hulls if lautering with a traditional tun and struggling with stuck sparges.
- **What happens if you don't adjust anything**: at moderate percentages (roughly ≤15%) with a reasonably efficient system (especially BIAB), many brewers report no meaningful issue skipping the beta-glucan rest and hull addition. Push much higher (20-30%+) without any mitigation on a traditional lauter setup, however, and the realistic risk is a slow or fully stuck sparge, lower-than-expected mash efficiency (and thus a lower final gravity/ABV than the recipe intended), and a longer, more frustrating brew day.

### Using 6-row instead of 2-row

- **Why it matters**: 6-row and 2-row are not flavor-equivalent substitutes — 6-row carries more husk, more protein, and more diastatic power, all of which change more than just fermentable extract.
- **What the effect is**: more enzyme headroom (useful if adjunct-heavy), but also more husk tannin/astringency risk and a somewhat huskier, grainier flavor profile than a clean 2-row; higher protein can also mean more haze risk and a slightly fuller, sometimes coarser mouthfeel if not managed.
- **When you'd want to do this**: brewing an adjunct-heavy American-style lager (with significant corn or rice) where the extra enzyme reserve is actually needed to fully convert both the 6-row's own starch and the adjunct's; historically also chosen for cost/yield-per-acre reasons at commercial scale.
- **What actions to take**: if using 6-row specifically to support adjuncts, size the 6-row percentage to the adjunct load using the maltster's DP figures (both grains') rather than 1:1 substituting for 2-row in a recipe that wasn't designed around adjuncts; watch sparge water chemistry and avoid oversparging/scorching, since the thicker husk carries more tannin-extraction risk at high sparge temperatures or over-long lautering.
- **What happens if you don't adjust anything** (straight 1:1 swap of 6-row for 2-row in a normal all-malt ale recipe with no adjuncts): the beer will likely still ferment fine (there's ample enzyme either way for an all-malt grist), but expect a slightly grainier/huskier flavor edge and marginally more haze/protein content than the recipe's original 2-row version — a subtle rather than catastrophic difference, but noticeable in a delicate, pale style where 6-row's coarser character has nowhere to hide.

### Using a low-DP dark base malt (e.g., dark Munich) as a large % of the grist

- **Why it matters**: unlike pale base malts, some dark base malts (especially darker Munich) can fall below the self-converting DP threshold depending on the specific maltster and crop year.
- **What the effect is**: if the *average* DP across the whole grist (weighted by proportion) is too low, starch conversion will be incomplete, leaving unconverted starch in the wort — this shows up as lower-than-expected efficiency, a starch haze that won't clear, and potentially a beer that's thinner in body/lower in ABV than intended despite "looking" like a normal-strength grain bill on paper.
- **When you'd want to use a lot of dark Munich anyway**: traditional Munich Dunkel or Bock styles, which are essentially built around dark Munich malt as the primary grain.
- **What actions to take**: check the actual COA/spec sheet DP value for the specific dark Munich malt being used (don't assume — DP varies noticeably between maltsters and lots), and if it's below or marginal against the ~35°Lintner self-converting threshold, blend in enough Pilsner, 2-row, or light Munich to bring the *grist-weighted average* DP comfortably above that line.
- **What happens if you don't adjust anything**: with a genuinely low-DP dark Munich used at high percentage and no supplementing base malt, expect a stuck or incomplete conversion — a mash that doesn't fully convert to negative-iodine-test completion, lower efficiency than the recipe predicted, and a wort/beer with residual starch haze and body/flavor that doesn't match what the recipe intended.

### Using unmalted adjuncts (corn, rice, flaked wheat) without enough base malt

- **Why it matters**: these have zero enzyme power of their own — full conversion of the whole mash's starch load depends entirely on the base malt present.
- **What the effect is**: if the adjunct percentage is high relative to the base malt's enzyme reserve, some fraction of the starch (base malt's and/or the adjunct's) may not convert, again producing lower efficiency, unconverted starch, and haze.
- **When you'd want to push adjunct percentage higher**: lightening body/flavor for an American lager, cream ale, or similar style where a crisp, light profile is the style target, and/or reducing ingredient cost.
- **What actions to take**: use a base malt with ample DP headroom (2-row or, at higher adjunct loads, 6-row) sized to comfortably exceed what's needed for the whole batch's starch (rough industry practice keeps adjuncts to somewhere under half the grist even with 6-row's higher enzyme reserve, though the safe ceiling depends on the exact DP numbers involved); use pre-gelatinized (flaked) forms rather than raw grits/rice for anything not going through a dedicated cereal mash; run a cereal mash (raw adjunct + ~10-15% crushed base malt, heated to gelatinization temperature and briefly boiled, then blended into the main mash) if using raw/uncooked corn or rice.
- **What happens if you don't adjust anything**: using too much unmalted adjunct relative to the base malt's enzyme supply risks incomplete conversion — reduced efficiency, a starch haze that won't clear with normal cold-crashing/fining, and a wort that reads lower gravity than the recipe predicted even though plenty of "sugar-bearing" grain went into the mash tun.

---

## Sources

- John Palmer, *How to Brew* (howtobrew.com) — general reference for malt classification, extract PPG/gravity-point methodology, and SRM/EBC relationships (site experienced an intermittent TLS certificate issue during research; content cross-verified via secondary citations of Palmer's published figures).
- [Beer Maverick — Understanding SRM and Lovibond Beer Color Calculations](https://beermaverick.com/understanding-srm-and-lovibond-beer-color-calculations/) and [Beer Maverick — Beer Grain Color Conversion Calculators](https://beermaverick.com/beer-grain-color-conversion-calculators/) — EBC/SRM/Lovibond conversion factors, Morey equation.
- [BeerSmith — Beer Color: Understanding SRM, Lovibond and EBC](https://beersmith.com/blog/2008/04/29/beer-color-understanding-srm-lovibond-and-ebc/) — EBC ≈ 1.97 × SRM/°L relationship.
- [Brewer's Friend — Color Calculator](https://www.brewersfriend.com/color-calculator/) and [Brewer's Friend — Fermentables database](https://www.brewersfriend.com/fermentables/) — MCU/Morey equation, PPG reference values across base malts, extracts, adjuncts, crystal, and roasted malts.
- [Crescent City Brew Talk — Has It Got The Power?](https://crescentcitybrewtalk.com/has-it-got-the-power/) and [Adventures in Homebrewing — What is Diastatic Power?](https://blog.homebrewing.org/what-is-diastatic-power-definition-chart/) — diastatic power reference values and the ~35°Lintner self-conversion threshold.
- [ProBrewer — Understanding Malt Analysis Sheets](https://probrewer.com/library/malt/understanding-malt-analysis-sheets/) and [HomeBrewTalk — Munich Malt as Base Grain (Diastatic Power)](https://homebrewtalk.com/threads/munich-malt-as-base-grain-diastatic-power.400931/) — dark Munich malt DP variability and self-conversion marginality.
- Briess Malt & Ingredients Co. — [Brewers Malt (2-Row) Product Spec Sheet](https://www.brewingwithbriess.com/wp-content/uploads/documents/Briess-PISB-Brewers-Malt.pdf), [Aromatic Munich Malt 20L Spec Sheet](https://www.brewingwithbriess.com/wp-content/uploads/documents/Briess-PISB-Aromatic-Munich-Malt-20L.pdf) — color/DP spec data; and [Is it Crystal or Caramel Malt?](https://brewingwithbriess.com/blog/is-it-crystal-or-caramel-malt/).
- Weyermann Malt — [CARAFA Special Type 1](https://www.weyermann.de/en-us/product/weyermann-carafa-special-type-1-1/), [Type 2](https://www.weyermann.de/en-us/product/weyermann-carafa-special-type-2-2/) product pages, and retailer listings (Homebrewers Mercantile, RahrBSG, Hop Craft Supply) — dehusking process, tannin/astringency reduction rationale, and Carafa I/II/III color ranges.
- [BYO (Brew Your Own) — Cereal Mashing Techniques](https://byo.com/article/cereal-mashing-techniques/) — cereal mash process and gelatinization temperature rationale.
- [BYO — A Look Inside Crystal Malts](https://byo.com/mr-wizard/a-look-inside-crystal-malts/) and [Holyrood Distillery — Crystal Malts Explained](https://holyrooddistillery.co.uk/crystal-malts-explained/) — green-malt stewing process, caramelization/crystallization mechanism.
- [American Homebrewers Association — Two-Row vs Six-Row Barley](https://homebrewersassociation.org/zymurgy/zymurgy-extra-2-row-vs-6-row-barley/) and [MoreBeer — A Comparison of North American Two-Row and Six-Row Malting Barley](https://www.morebeer.com/articles/Comparison_Two_Six_Row) — 6-row protein/DP/husk characteristics and adjunct-lager rationale.
- Gambrinus Malting Corporation — [Honey Malt product page](https://gambrinusmalting.com/gambrinus-honey-malt/) — honey malt kilning process and flavor description; various retailer listings (Northern Brewer, MoreBeer, SoCal Brewing Supply) cross-referencing Victory, biscuit, aromatic, and melanoidin malt flavor descriptors.
- [Homebrew Talk — How much is too much crystal malt](https://homebrewtalk.com/threads/how-much-is-to-much-crystal-malt.307536/) and [BeerSmith — Caramel and Crystal Malt in Beer Brewing](https://beersmith.com/blog/2014/06/26/caramel-and-crystal-malt-in-beer-brewing/) — practical crystal-malt usage percentage guidance.
- [American Homebrewers Association — The Impact of Flaked Oats on New England IPA](https://homebrewersassociation.org/how-to-brew/impact-flaked-oats-new-england-ipa/) and [Brülosophy exBEERiment series on flaked oats](https://brulosophy.com/2016/11/21/the-impact-of-flaked-oats-on-new-england-ipa-exbeeriment-results/) — oats' beta-glucan/protein role in NEIPA body and haze, typical usage percentages.
- [BeerSmith — Storing Your Beer Brewing Hops, Grains and Yeast](https://beersmith.com/blog/2014/02/08/storing-your-beer-brewing-hops-grains-and-yeast/), [Beer Creation — Storing Malt Grains Before Brewing](https://beercreation.com/storing-grains/), and [Brülosophy — The Impact of Age on Crushed Malt](https://brulosophy.com/2018/10/29/the-impact-of-age-on-crushed-malt-exbeeriment-results/) — whole vs. crushed grain shelf life and staling/oxidation guidance.

*Note on methodology: numeric ranges in this document (color, DP, PPG, gelatinization temperatures) are drawn from multiple cross-checked homebrewing and maltster references rather than a single source, because individual maltsters' actual lot-to-lot spec sheets vary; treat the ranges here as reference/planning values and always defer to the specific product's Certificate of Analysis for precision brewing (e.g., competition-grade recipe formulation).*
