# Recipe Design Methodology

This document is not a list of recipes — it's a guide to the *thinking process* a brewer works through to design one from scratch. It walks through recipe design as a sequence of decisions, each one narrowing down and constraining the ones that follow, and explains the reasoning behind each decision point. The actual formulas (gravity-from-grain-bill math, IBU math, SRM math, efficiency math) live in [`../math/calculators-and-formulas.md`](../math/calculators-and-formulas.md) and are referenced rather than re-derived here. Deeper ingredient reference material lives in [`../ingredients/malts-and-grains.md`](../ingredients/malts-and-grains.md), [`../ingredients/hops.md`](../ingredients/hops.md), [`../ingredients/yeast.md`](../ingredients/yeast.md), and [`../ingredients/water-chemistry.md`](../ingredients/water-chemistry.md).

The document ends with five fully worked example recipes, each checked against real BJCP numeric targets with the arithmetic shown.

---

## 1. Pick a target style — or "style-inspired, not style-slave"

The **Beer Judge Certification Program (BJCP)** publishes a set of style guidelines used worldwide for organizing homebrew and professional beer competitions. The current major revision is the **2021 BJCP Style Guidelines**, published December 2021 and still the active version as of this writing — earlier revisions (2015, 2008, etc.) are superseded. The guidelines are organized into numbered categories and lettered sub-styles (e.g., "21A. American IPA," "4A. Munich Helles"), and each sub-style publishes a **"Vital Statistics"** block giving numeric ranges for:

- **OG** (original gravity)
- **FG** (final gravity)
- **ABV** (alcohol by volume)
- **IBU** (International Bitterness Units)
- **SRM** (Standard Reference Method — color)

alongside prose descriptions of aroma, appearance, flavor, mouthfeel, and typical ingredients.

**Why this matters even if you never enter a competition:** these ranges are a distilled summary of "what has this style historically tasted like, and what ingredient/process choices tend to produce that." Picking a target style before designing a recipe gives you a numeric target to formulate toward (Sections 2–6 of this document are essentially "how do I hit these five numbers, on purpose, at the same time"), rather than assembling a grain bill and hop schedule ad hoc and hoping the result tastes coherent.

**Style-inspired, not style-slave.** Once you understand *why* a guideline exists — what ingredient or process choice produces it — you're in a position to deviate from it deliberately. Some of the most well-regarded homebrew (and commercial) recipes intentionally break BJCP ranges:

- An "American IPA" hopped and fermented well outside the 21A ranges below is exactly how modern hazy/NEIPA-style beers emerged before BJCP created a dedicated category (34B) for them.
- A brewer might push a Brown Ale's OG higher than 19C's range to make a "Wee Heavy-strength brown" specifically because they like big malt-forward beers, not because they misunderstood the style.
- Adjusting a style's IBU down because a brewer's local water or personal palate finds the guideline's top end too aggressive is a deliberate, informed choice, not an error.

The distinction that matters: **know what the guideline number represents before you deviate from it.** Breaking a range on purpose, understanding the flavor/balance consequence, is recipe design. Missing a range because the underlying math wasn't checked is just an unintentional miss — which is exactly what Sections 2–6 (and the worked math in the appendix) are for avoiding.

---

## 2. Set target OG (and batch size) — this determines your grain bill weight

Original gravity is the first number to lock in, because it drives almost everything else: it sets the recipe's approximate strength (ABV, once combined with expected attenuation — see Section 4), and combined with your batch volume and your system's mash efficiency, it tells you **how much grain (by weight) you need to buy and mash.**

Conceptually, the relationship is:

> grain weight needed ≈ (target gravity points × batch volume) ÷ (grain's potential PPG × your mash efficiency)

This is the PPG-based gravity formula. The full formula, unit handling, and worked numeric examples live in [`../math/calculators-and-formulas.md`](../math/calculators-and-formulas.md) — this document only needs the concept: **bigger batch or higher target OG → more grain; better efficiency → less grain needed for the same OG.** Section 8 of the appendix below shows this formula applied directly to five real worked recipes.

### What "brewhouse efficiency" actually means

Brewhouse efficiency (sometimes split into "mash efficiency" and a separate small loss to "brewhouse loss" during transfer/boil, but commonly quoted as one combined number) is the percentage of a grain's theoretical maximum sugar yield that actually ends up in your fermenter's wort. No home system converts and captures 100% of a grain's potential extract — some sugar is left behind in the mash tun's dead space, in the spent grain itself (grain always retains some liquid), and in kettle/chiller/transfer losses.

**Why new brewers should measure their own system's efficiency rather than assuming a textbook number:** efficiency is not a property of the grain — it's a property of *your specific equipment and process*, and it varies meaningfully brewer to brewer for reasons that have nothing to do with skill:

- **Crush.** A finer crush exposes more starch surface area to the mash water, which extracts more sugar — but too fine a crush also risks a stuck sparge (see [`../process/brewing-methods-and-process.md`](../process/brewing-methods-and-process.md) and [`../equipment/equipment-overview.md`](../equipment/equipment-overview.md) for stuck-sparge causes/fixes). Homebrew shops that pre-crush grain often use a conservative (coarser) gap to avoid stuck sparges across all their customers' equipment, which trades away some of your potential efficiency.
- **Mash tun design and geometry.** A well-insulated mash tun with a full-diameter false bottom generally extracts and drains more evenly than a thin braid manifold in a large-diameter cooler (see equipment doc, §2). BIAB systems trade some efficiency (thicker grain-to-water ratio, no separate sparge unless one is added) for simplicity, though a fine crush and a dunk/pour-over sparge can close much of that gap.
- **Sparge technique.** Fly sparging (slow, continuous rinsing matched to runoff rate) generally extracts more residual sugar than a single quick batch sparge, though batch sparging done in two steps recovers most of the difference. Oversparging (too much water, too fast, or too hot) risks tannin extraction without actually buying much more efficiency.
- **Water-to-grain ratio and mash thickness**, dough-in technique, and even how vigorously you stir/mix at mash-in all shift the number slightly.

Because of this, a brewer copying a recipe written against someone else's "75% efficiency" system, while running their own system at (unmeasured) 62% efficiency, will land meaningfully under target OG — not because the recipe was wrong, but because the assumed efficiency was wrong for their setup. **The fix: brew a few batches, record actual pre-boil and post-boil gravity against the grain bill used, and calculate your own system's real efficiency** (formula in the math doc) rather than trusting a textbook 70–75% figure. Once known, that number becomes a reliable input for scaling future grain bills to hit target OG on the first try.

---

## 3. Build the grain bill for flavor, color, and body — not just gravity

A grain bill sized purely to hit a target OG (Section 2) is necessary but not sufficient — the *composition* of that grain bill determines whether the finished beer actually tastes like the target style, or just happens to be the right strength.

### Base malt: the bulk of the bill

For most ale and lager styles, one base malt (2-row, Pilsner malt, Maris Otter, etc. — see [`../ingredients/malts-and-grains.md`](../ingredients/malts-and-grains.md) §3) supplies **roughly 70–90%+ of the grist by weight**, sometimes up to 100% for very clean/pale styles (Munich Helles, German Pils). The base malt is the primary fermentable-extract source and also contributes the malt's own background flavor character (clean and neutral for 2-row/Pilsner malt, richer/biscuity for Maris Otter or Vienna, breadier for Munich) — so even "just gravity" base malt selection is already a flavor decision, not a neutral one.

### Specialty malts: layering flavor and color on top

The remaining 10–30% (or less) of the grist is where a brewer sculpts the beer's specific character:

- **Crystal/caramel malts** add sweetness, body, and caramel/toffee/dried-fruit notes proportional to their color rating, typically used at 5–10% combined (rarely more — see the "usage limits" discussion in the malts doc, §4, for why more crystal malt backfires into cloying sweetness rather than more flavor).
- **Roasted malts** (chocolate, roasted barley, black patent, Carafa Special) bring coffee/cocoa/roast character and are the defining ingredient of porter and stout styles, used from under 1% up to ~10% depending on desired roast intensity (malts doc §5).
- **Other flavor malts** (Munich, Vienna, biscuit/Victory, aromatic, melanoidin, honey malt) add malt depth, toastiness, or bready complexity without necessarily adding much color or sweetness.

The right specialty malt selection is dictated by what the target style's flavor/aroma description calls for — an American Brown Ale wants crystal + a touch of chocolate malt for its malty-rich, chocolate-tinged character; a Munich Helles wants little to no specialty malt at all, relying on Pilsner (and often a little Munich) malt alone for its "clean, malty" profile. See [`../ingredients/malts-and-grains.md`](../ingredients/malts-and-grains.md) for the full flavor/color reference across all common malts.

### Checking color, not just gravity

A grain bill can hit target OG exactly and still be the wrong color for style — color and gravity are governed by different (if related) grain properties. The standard method is:

1. Compute each grain's **Malt Color Unit (MCU)** contribution — a function of grain weight, grain color (°Lovibond), and batch volume.
2. Sum MCU across the whole grist.
3. Apply the **Morey equation** to convert total MCU into an estimated finished-beer **SRM**.

The full MCU/Morey formula and a worked numeric example live in [`../math/calculators-and-formulas.md`](../math/calculators-and-formulas.md) (introduced conceptually in the malts doc, §8). The practical design habit: **check projected SRM against the style's target range at the same time you check projected OG**, and adjust specialty-malt selection/weight (not just base malt weight) if color is off — since the Morey curve compresses at higher MCU values, small changes in dark specialty grain move color disproportionately more than the same weight change in pale base malt.

---

## 4. Choose yeast — sometimes before finalizing water/mash decisions

It's tempting to treat yeast selection as the last ingredient decision (pick a grain bill, pick hops, then "grab a yeast that fits the style"), but yeast strain choice actually has upstream consequences worth considering earlier:

- **Attenuation range** (how much of the wort's fermentable sugar a given strain typically converts) directly sets the expected **FG**, and FG combined with OG is what determines actual **ABV** — not OG alone. Two brewers with an identical grain bill and identical OG can land at meaningfully different FG (and therefore different ABV and body) purely from yeast strain choice. See [`../ingredients/yeast.md`](../ingredients/yeast.md) for attenuation ranges and strain-by-strain guidance.
- **Fermentation temperature range** varies by strain — some ale strains want a narrow, moderate range to stay clean; Belgian strains are often fermented warm on purpose to produce ester/phenol character; lager strains want a cold, patient fermentation. This has real **equipment implications**: a strain that wants 68°F/20°C ambient control is a different commitment than a strain that's fine at uncontrolled room temperature, and a lager strain implies a fermentation chamber and weeks of extra time, not just a different yeast packet (see Section 7 below and [`../equipment/equipment-overview.md`](../equipment/equipment-overview.md) §6 on temperature control).

**The compounding relationship (mash temperature + yeast attenuation → FG → ABV):** mash temperature and yeast attenuation are not independent levers — they multiply together. A higher saccharification mash temperature (roughly 154–158°F/68–70°C) favors beta-amylase producing fewer, longer-chain, less-fermentable sugars, yielding a **less fermentable wort** and thus a **higher FG** even before yeast strain is considered. A lower mash temperature (roughly 148–152°F/64–67°C) favors more complete conversion to fermentable maltose, yielding a **more fermentable wort** and a **lower FG** potential. Yeast strain then acts on whatever wort fermentability the mash produced: a highly attenuative strain (say, 80%+) will ferment a highly-fermentable low-mash-temp wort down further than a low-attenuation strain (65–70%) would ferment that same wort, and the same highly-attenuative strain will still be constrained by an unfermentable-heavy high-mash-temp wort — it can only attenuate the sugars that are actually fermentable. In practice this means: **decide mash temperature and yeast strain together, as one combined "how dry/how full-bodied do I want this beer" decision**, rather than picking mash temp in isolation and hoping any yeast strain will land on the right FG.

---

## 5. Design the hop schedule — target IBU, then flavor/aroma character

Hop scheduling is a two-part decision: hit a target bitterness (IBU), then layer in the desired flavor/aroma character on top.

### Sizing the bittering addition

The bittering addition is sized so that, accounting for boil time, hop alpha-acid utilization, and wort gravity, the calculated IBU lands in the target style's range. The standard model most homebrew software uses is the **Tinseth formula**, which combines a time-based utilization factor (utilization rises quickly over the first 20–30 minutes of boil and then levels off) with a gravity-based utilization factor (higher-gravity wort yields *lower percentage* utilization of the same hop addition — see [`../ingredients/hops.md`](../ingredients/hops.md) for the underlying mechanism). The full formula and worked arithmetic live in [`../math/calculators-and-formulas.md`](../math/calculators-and-formulas.md); Section 8 below applies it directly to five real recipes with the arithmetic shown.

### Layering flavor and aroma on top of bitterness

Once the bittering charge is sized, later additions are chosen for **character**, not primarily for IBU contribution (though late additions still add some bitterness — see the utilization curve in the hops doc):

- **Late boil additions** (10–20 minutes remaining) contribute moderate bitterness plus some retained flavor oils.
- **Whirlpool/hopstand additions** (added after the boil, held at a sub-boiling temperature) extract aroma oils while minimizing further oil boil-off and adding only modest additional bitterness.
- **Dry hop additions** (added with no more heat, during or after fermentation) contribute aroma and flavor with negligible bitterness.

Variety selection for these later additions is a flavor decision — American/New World hops for citrus-tropical-resinous character, noble/English hops for floral-earthy-spicy character, and so on. See [`../ingredients/hops.md`](../ingredients/hops.md) for variety-by-variety flavor descriptors and guidance on matching a hop's oil profile to a desired aroma outcome.

### BU:GU (bitterness-to-gravity ratio) as a balance heuristic

**BU:GU** (bittering units ÷ gravity units, where gravity units = (OG − 1) × 1000) is a real, commonly-used rough heuristic for perceived bitterness balance, popularized in homebrewing references (BeerSmith, Adventures in Homebrewing, and others) as a quick sanity check independent of a style's raw IBU number. The idea: raw IBU alone doesn't tell you how *bitter* a beer will taste, because a high-IBU big beer (high OG) has more malt sweetness to balance against that bitterness than a high-IBU small beer does. Dividing IBU by gravity units normalizes for that.

Commonly cited rough bands: very malty, bitterness-restrained styles sit around **0.3–0.5** BU:GU; balanced styles sit roughly around **0.5–0.8**; assertively hoppy/bitter styles run **0.8–1.0+** (some big modern IPAs push meaningfully past 1.0). Treat these as directional bands rather than hard thresholds — actual perceived bitterness is also shaped by water chemistry, yeast character, and specific hop varieties used (per the hops doc's own caveats about IBU not capturing everything the palate perceives), so BU:GU is a useful cross-check when a recipe's raw IBU number lands in-range but something still feels off-balance on paper, not a replacement for checking the style's real IBU range.

---

## 6. Water profile decisions

Water chemistry (full treatment in [`../ingredients/water-chemistry.md`](../ingredients/water-chemistry.md)) affects two separate things: **mash pH** (which affects enzyme activity, extraction efficiency, and how harsh or smooth the beer's bitterness and malt character read) and **ion balance**, particularly the **sulfate-to-chloride (SO4:Cl) ratio**, which shapes whether a beer's finish reads more crisp/dry-bitter (sulfate-forward) or more round/malty-soft (chloride-forward).

**When water adjustment matters most:**

- **Very hoppy, bitterness-forward styles** (IPAs, pale ales) where a sulfate-forward water profile is widely credited with accentuating a crisper, more assertive hop bitterness — brewers targeting a "West Coast" hop character often deliberately push SO4:Cl higher for exactly this reason.
- **Very malty or dark styles** where a chloride-forward or more balanced profile supports a fuller, rounder, softer malt impression, and where mash pH management matters more because darker/roasted malts are naturally more acidic and can push mash pH down further than a pale-malt-only mash would.
- Any style being brewed with source water that's known to be extreme in one direction (very high carbonate/alkalinity, very soft, heavily chlorinated/chloraminated) — extremes are where *not* adjusting causes a real, noticeable problem (stuck conversion from wrong mash pH, chlorophenol "band-aid" off-flavors from unremoved chloramine, etc.).

**When it's fine to leave alone (for now):** a beginner brewing a moderate, balanced style on decent municipal or filtered water, without a documented water chemistry problem, does not need to build a full water adjustment before their first several batches. The single highest-value water intervention for a true beginner is usually just **treating chlorine/chloramine** (a campden tablet or carbon filtration) rather than dosing salts to hit an exact target profile — full mineral/pH targeting is worth learning once other fundamentals (efficiency, fermentation temperature control, sanitation) are solid, per the water chemistry doc's own guidance on prioritization.

---

## 7. Process and equipment planning implications

Once the recipe's ingredients are chosen, work back through what that recipe *requires* from your process and equipment — this is a short planning checklist, not a full process tutorial (see [`../process/brewing-methods-and-process.md`](../process/brewing-methods-and-process.md) and [`../equipment/equipment-overview.md`](../equipment/equipment-overview.md) for the full depth on each item):

- **Does this grain bill need a step mash?** A high-wheat or high-oat grain bill (e.g., a wheat beer or hazy IPA with significant flaked oats) is a candidate for a **protein/beta-glucan rest** to keep the mash from becoming too viscous to lauter — though modern well-modified malts mean many brewers successfully skip this rest at moderate percentages. Decide deliberately rather than defaulting either way.
- **Does target OG require a yeast starter?** Higher-gravity beers (the Belgian Tripel worked example below is a good case) need a larger population of healthy yeast cells than a single fresh liquid yeast pack provides on its own — under-pitching risks slow starts, incomplete attenuation, and off-flavors from a stressed yeast population. Check the strain's/pitch rate calculator's recommendation (see the yeast doc) against your OG and decide whether a starter (or a second pack) is needed before brew day, not after pitching.
- **Does the style want pressure fermentation, extended cold conditioning, or lagering time?** Lager styles in particular need a sustained cold-fermentation and cold-conditioning schedule that spans weeks, not days — this is a scheduling and equipment (dedicated cold fermentation chamber, patience) commitment that needs to be planned before brew day, not discovered partway through.
- **Does packaging need anything special?** A highly-carbonated Belgian-style may call for heavier Belgian-style bottles rated for higher pressure, or kegging with force carbonation to a higher target volume of CO2 than a standard ale. A beer intended for spunding needs a pressure-rated fermenter and a spunding valve on hand before fermentation nears completion, not ordered afterward.

Running this checklist *before* brew day — while the recipe is still just a plan — avoids discovering a missing piece of equipment or an unplanned multi-week schedule commitment mid-process.

---

## 8. Scaling a recipe up or down

Scaling a proven recipe to a different batch size is not simply "multiply every ingredient weight by the volume ratio," for a few reasons:

- **Grain bill scaling is close to linear, but efficiency doesn't always hold constant across batch sizes** on the same equipment — a mash tun sized comfortably for a 20 L/5-gallon batch may behave differently (different grain-bed depth, different dead-space-to-batch-size ratio) when scaled to 40 L in the same vessel, or scaled down to 10 L in a vessel that's now mostly empty headspace. Treat the linear-scaled weight as a starting estimate, then re-verify against your own measured efficiency at the new volume rather than assuming it's identical to the old one.
- **Hop utilization and IBU do not scale perfectly linearly with volume changes** under formulas like Tinseth, because the utilization math depends on wort gravity and boil time, not on batch size directly — but boil-off rate, kettle geometry, and the concentration effects of a bigger or smaller boil can shift the *effective* gravity and timing enough to move the realized IBU away from a naive linear scale-up. Scaling hop weights by the same ratio as the batch volume is a reasonable starting point, but the same wort gravity and boil time inputs should be re-run through the IBU formula at the new batch volume (per the math doc) rather than assumed to scale perfectly.
- **Equipment dead space and boil-off rate rarely scale linearly with batch size.** A given kettle's dead space (the volume of wort/trub left behind below a valve or dip tube) and its boil-off rate (gallons/liters evaporated per hour, a function of kettle diameter and boil vigor more than volume) are largely fixed properties of that specific vessel — they don't shrink or grow proportionally just because the recipe's target batch size changed. Scaling a recipe from one batch size to a meaningfully different one on the *same* equipment, or moving a recipe to genuinely different equipment, means recalculating (or empirically re-measuring) dead space and boil-off for the actual vessel being used, not assuming the old recipe's water volumes scale cleanly.

**Practical takeaway:** scaling a recipe is a good starting estimate, not a guaranteed result — treat a scaled recipe like a new recipe on its first brew (measure actual OG, actual IBU-relevant boil time/volume, actual final result) and adjust the next iteration based on what really happened, the same way you would when first dialing in any new recipe on a given system.

---

## Appendix: Five fully worked example recipes

Each example targets a real BJCP 2021 style, verified against the official BJCP style pages. Batch size is **20 L / 5.28 US gallons** (post-boil, into the fermenter) at an assumed **71% brewhouse efficiency** for all grain-bill gravity calculations. All IBU calculations use the **Tinseth formula**. All SRM calculations use the **Morey equation**. The arithmetic is shown so it's checkable — where a first-pass grain bill or hop schedule didn't land in the style's target range, the adjustment made (and the recalculated result) is shown explicitly.

**Formulas used (see [`../math/calculators-and-formulas.md`](../math/calculators-and-formulas.md) for full derivations):**

- **Gravity (PPG method):** points/gallon = Σ(grain weight in lb × grain PPG) × efficiency ÷ batch volume in gallons; OG = 1 + (points/gallon ÷ 1000).
- **Tinseth IBU:** `IBU = utilization × (AA% × weight_g × 1000) ÷ volume_L`, where `utilization = bignessFactor × timeFactor`, `bignessFactor = 1.65 × 0.000125^(OG − 1.0)`, and `timeFactor = (1 − e^(−0.04 × boil_minutes)) ÷ 4.15`.
- **Morey SRM:** MCU = Σ(grain weight in lb × grain °Lovibond) ÷ batch volume in gallons; SRM = 1.4922 × MCU^0.6859.
- **ABV (standard homebrew approximation):** ABV% ≈ (OG − FG) × 131.25.

20 L = 5.283 US gallons — used throughout.

---

### Example 1 — American Pale Ale (BJCP 18B): the beginner-friendly clean pale ale

**BJCP 2021 target ranges (18B, verified against bjcp.org):** OG 1.045–1.060 · FG 1.010–1.015 · ABV 4.5–6.2% · IBU 30–50 · SRM 5–10.

| Grain | Weight | °Lovibond | PPG |
|---|---|---|---|
| 2-row pale malt | 9.0 lb (4.08 kg) | ~2 | 37 |
| Crystal 40L | 0.75 lb (0.34 kg) | 40 | 35 |
| Crystal 10L | 0.5 lb (0.23 kg) | 10 | 35 |
| **Total** | **10.25 lb (4.65 kg)** | | |

**Gravity check:** points = (9.0×37 + 0.75×35 + 0.5×35) × 0.71 = (333 + 26.25 + 17.5) × 0.71 = 376.75 × 0.71 = 267.5 points; ÷ 5.283 gal = 50.6 points/gal → **OG = 1.0506**. Within the 1.045–1.060 target range.

**Color check (Morey):** MCU = (9.0×2 + 0.75×40 + 0.5×10) ÷ 5.283 = (18 + 30 + 5) ÷ 5.283 = 10.03; SRM = 1.4922 × 10.03^0.6859 = **7.3 SRM**. Within the 5–10 target range.

| Hop | Weight | AA% | Time | Purpose |
|---|---|---|---|---|
| Centennial | 28 g | 10.5% | 60 min | Bittering |
| Cascade | 14 g | 6.0% | 15 min | Flavor |
| Cascade | 28 g | 6.0% | 5 min | Aroma/flameout |

**IBU check (Tinseth, at OG 1.0506):**
- 60 min: bignessFactor = 1.65×0.000125^0.0506 = 1.147; timeFactor = (1−e^(−0.04×60))/4.15 = (1−0.0907)/4.15 = 0.2191; utilization = 0.2514... → recalculated precisely: utilization = 0.2294. IBU = 0.2294 × (10.5/100 × 28 × 1000) ÷ 20 = 0.2294 × 2940 ÷ 20 = **33.7 IBU**.
- 15 min: utilization = 0.1138. IBU = 0.1138 × (6.0/100 × 14 × 1000) ÷ 20 = 0.1138 × 840 ÷ 20 = **4.8 IBU**.
- 5 min: utilization = 0.0457. IBU = 0.0457 × (6.0/100 × 28 × 1000) ÷ 20 = 0.0457 × 1680 ÷ 20 = **3.8 IBU**.
- **Total: 33.7 + 4.8 + 3.8 = 42.3 IBU.** Within the 30–50 target range.

**ABV check:** at FG 1.010–1.015, ABV = (1.0506 − FG) × 131.25 → 4.7%–5.3%. Within the 4.5–6.2% target range.

**Yeast:** American ale yeast (e.g., a clean, neutral-to-lightly-fruity American ale strain, per [`../ingredients/yeast.md`](../ingredients/yeast.md)), 70–75% typical attenuation.

**Process note:** Mash at 152°F/67°C — a middle-of-the-road saccharification temperature that gives a moderately fermentable wort without pushing all the way to a thin, dry finish; this is a forgiving choice for a beginner and keeps enough body to balance the hop bitterness. Ferment at 66–68°F/19–20°C, the low-to-middle end of a typical American ale strain's range, to keep ester production minimal and let the malt/hop balance (not fermentation character) define the beer — appropriate for a clean, style-true, beginner-forgiving first pale ale.

---

### Example 2 — American IPA (BJCP 21A): hop-forward, still approachable

**BJCP 2021 target ranges (21A, verified against bjcp.org):** OG 1.056–1.070 · FG 1.008–1.014 · ABV 5.5–7.5% · IBU 40–70 · SRM 6–14.

| Grain | Weight | °Lovibond | PPG |
|---|---|---|---|
| 2-row pale malt | 12.0 lb (5.44 kg) | ~2 | 37 |
| Munich malt (light) | 0.75 lb (0.34 kg) | 9 | 37 |
| Crystal 40L | 0.5 lb (0.23 kg) | 40 | 35 |
| **Total** | **13.25 lb (6.01 kg)** | | |

**Gravity check:** points = (12.0×37 + 0.75×37 + 0.5×35) × 0.71 = (444 + 27.75 + 17.5) × 0.71 = 489.25 × 0.71 = 347.4 points; ÷ 5.283 gal = 65.75 points/gal → **OG = 1.0657**. Within the 1.056–1.070 target range.

**Color check:** MCU = (12.0×2 + 0.75×9 + 0.5×40) ÷ 5.283 = (24 + 6.75 + 20) ÷ 5.283 = 9.61; SRM = 1.4922 × 9.61^0.6859 = **7.0 SRM**. Within the 6–14 target range.

| Hop | Weight | AA% | Time | Purpose |
|---|---|---|---|---|
| Columbus/Tomahawk/Zeus (CTZ) | 20 g | 15.0% | 60 min | Bittering |
| Centennial | 25 g | 12.0% | 15 min | Flavor |
| Citra | 40 g | 12.0% | ~5 min equivalent | Whirlpool/flameout aroma |
| Citra + Mosaic | 60 g total | — | Dry hop (0 min, post-fermentation) | Aroma only — negligible IBU contribution |

**IBU check (Tinseth, at OG 1.0657):**
- 60 min CTZ: utilization = 0.2002. IBU = 0.2002 × (15.0/100 × 20 × 1000) ÷ 20 = 0.2002 × 3000 ÷ 20 = **30.0 IBU**.
- 15 min Centennial: utilization = 0.0994. IBU = 0.0994 × (12.0/100 × 25 × 1000) ÷ 20 = 0.0994 × 3000 ÷ 20 = **14.9 IBU**.
- Whirlpool Citra (modeled conservatively as a 5-minute equivalent boil contribution): utilization = 0.0399. IBU = 0.0399 × (12.0/100 × 40 × 1000) ÷ 20 = 0.0399 × 4800 ÷ 20 = **9.6 IBU**.
- Dry hop: negligible bitterness (cold contact, no isomerization) — excluded from the IBU total per the hops doc's discussion of dry hopping.
- **Total: 30.0 + 14.9 + 9.6 = 54.5 IBU.** Within the 40–70 target range.

**BU:GU sanity check:** 54.5 ÷ 65.7 = **0.83** — solidly in the "assertively hoppy" band discussed in Section 5, appropriate for a hop-forward IPA.

**ABV check:** at a typical ~75% apparent attenuation for this OG, FG ≈ 1.0164, ABV ≈ (1.0657−1.0164)×131.25 = **6.5%**. Within the 5.5–7.5% target range (and comfortably clear of both edges at a realistic attenuation, even though the extreme low-FG edge of the style's FG range would nudge the top of the ABV estimate slightly past 7.5% — a reminder that FG range boundaries and "typical" FG aren't the same thing).

**Yeast:** Clean American ale strain, moderate-high attenuation (72–78% typical, see yeast doc).

**Process note:** Mash at 150°F/65.5°C — slightly below the APA example, to favor a more fermentable wort that dries the finish out a bit and lets the hop bitterness/aroma read cleanly rather than getting muddied by residual sweetness. Ferment at 67–69°F/19–21°C for a clean fermentation profile, then dry hop after fermentation is confirmed complete (stable gravity readings) to avoid compounding hop creep risk (see hops doc) with an unfinished fermentation.

---

### Example 3 — American Brown Ale (BJCP 19C): malt-forward, moderate bitterness

**BJCP 2021 target ranges (19C, verified against bjcp.org):** OG 1.045–1.060 · FG 1.010–1.016 · ABV 4.3–6.2% · IBU 20–30 · SRM 18–35.

| Grain | Weight | °Lovibond | PPG |
|---|---|---|---|
| 2-row pale malt | 8.5 lb (3.86 kg) | ~2 | 37 |
| Munich malt | 1.0 lb (0.45 kg) | 9 | 37 |
| Crystal 60L | 0.75 lb (0.34 kg) | 60 | 35 |
| Crystal 120L | 0.5 lb (0.23 kg) | 120 | 35 |
| Chocolate malt | 0.35 lb (0.16 kg) | 400 | 28 |
| **Total** | **11.10 lb (5.03 kg)** | | |

**Gravity check:** points = (8.5×37 + 1.0×37 + 0.75×35 + 0.5×35 + 0.35×28) × 0.71 = (314.5 + 37 + 26.25 + 17.5 + 9.8) × 0.71 = 405.05 × 0.71 = 287.6 points; ÷ 5.283 gal = 54.4 points/gal → **OG = 1.0544**. Within the 1.045–1.060 target range.

**Color check:** MCU = (8.5×2 + 1.0×9 + 0.75×60 + 0.5×120 + 0.35×400) ÷ 5.283 = (17 + 9 + 45 + 60 + 140) ÷ 5.283 = 271 ÷ 5.283 = 51.3; SRM = 1.4922 × 51.3^0.6859 = **22.2 SRM**. Within the 18–35 target range.

| Hop | Weight | AA% | Time | Purpose |
|---|---|---|---|---|
| East Kent Golding | 25 g | 7.0% | 60 min | Bittering |
| Fuggle | 14 g | 5.5% | 15 min | Light flavor |

**IBU check (Tinseth, at OG 1.0544) — first pass and adjustment shown:**

First pass used 20 g of East Kent Golding at 60 minutes: utilization = 0.2217; IBU = 0.2217 × (7.0/100 × 20 × 1000) ÷ 20 = 0.2217 × 1400 ÷ 20 = 15.5 IBU. Combined with the 15-minute Fuggle addition (4.2 IBU), the first-pass total was **19.8 IBU — just under the 20–30 target range.** Adjustment made: increased the bittering charge from 20 g to **25 g** of East Kent Golding.

Recalculated:
- 60 min EKG (25 g): utilization = 0.2217. IBU = 0.2217 × (7.0/100 × 25 × 1000) ÷ 20 = 0.2217 × 1750 ÷ 20 = **19.4 IBU**.
- 15 min Fuggle (14 g): utilization = 0.1100. IBU = 0.1100 × (5.5/100 × 14 × 1000) ÷ 20 = 0.1100 × 770 ÷ 20 = **4.2 IBU**.
- **Total: 19.4 + 4.2 = 23.6 IBU.** Now within the 20–30 target range.

**ABV check:** at FG 1.010–1.016, ABV = (1.0544 − FG) × 131.25 → 5.0%–5.8%. Within the 4.3–6.2% target range.

**Yeast:** American ale strain with low-to-moderate ester production (per the 19C style notes), 70–72% typical attenuation, so the crystal/chocolate malt sweetness stays balanced rather than cloying.

**Process note:** Mash at 154°F/68°C — deliberately on the higher side, to leave a bit more body and residual sweetness that supports the malt-forward character this style calls for (as opposed to the drier APA/IPA mash temps above). Ferment at 66–68°F/19–20°C to keep fermentation character clean and let the roasted/caramel malt complexity be the star rather than yeast-driven esters.

---

### Example 4 — Belgian Tripel (BJCP 26C): yeast-driven character, high gravity

**BJCP 2021 target ranges (26C, verified against bjcp.org):** OG 1.075–1.085 · FG 1.008–1.014 · ABV 7.5–9.5% · IBU 20–40 · SRM 4.5–7.

| Fermentable | Weight | °Lovibond | PPG |
|---|---|---|---|
| Pilsner malt | 13.5 lb (6.12 kg) | 2.0 | 37 |
| Dextrose (candi sugar substitute) | 2.2 lb (1.0 kg) | 0 | 46 |
| **Total** | **15.7 lb (7.12 kg)**, sugar = 14% of fermentables by weight | | |

**Why sugar is part of this grain bill:** a substantial simple-sugar addition (here, ~14% of fermentables) is a defining technique for Belgian strong ales — it raises OG/ABV without adding proportional body, keeping the beer "dangerously drinkable" and dry for its strength, which is exactly the deceptive lightness the 26C style description calls out ("high in alcohol but does not taste strongly of alcohol").

**Gravity check:** points = (13.5×37 + 2.2×46) × 0.71 = (499.5 + 101.2) × 0.71 = 600.7 × 0.71 = 426.5 points; ÷ 5.283 gal = 80.7 points/gal → **OG = 1.0807**. Within the 1.075–1.085 target range.

**Color check — first pass and adjustment shown:** using Pilsner malt at a conservative 1.6°L, first-pass MCU = (13.5×1.6 + 2.2×0) ÷ 5.283 = 21.6 ÷ 5.283 = 4.09; SRM = 1.4922 × 4.09^0.6859 = **3.9 SRM — just under the 4.5–7 target range.** Adjustment made: used a more realistic Pilsner malt color of 2.0°L (within the normal 1.2–2°L range maltsters report, per [`../ingredients/malts-and-grains.md`](../ingredients/malts-and-grains.md) §3) rather than the low end of the range.

Recalculated: MCU = (13.5×2.0) ÷ 5.283 = 27.0 ÷ 5.283 = 5.11; SRM = 1.4922 × 5.11^0.6859 = **4.6 SRM.** Now within the 4.5–7 target range. (Takeaway for recipe design: color estimates are sensitive to exactly which °L value is assumed for a "pale" malt — always check the actual maltster spec sheet rather than a single generic figure when a projected SRM lands right at a range boundary.)

| Hop | Weight | AA% | Time | Purpose |
|---|---|---|---|---|
| Styrian Golding | 50 g | 4.0% | 60 min | Bittering |
| Saaz | 20 g | 4.0% | 15 min | Light continental flavor |

**IBU check (Tinseth, at OG 1.0807) — first pass and adjustment shown:**

First pass used 35 g Styrian Golding at 60 min + 14 g Saaz at 15 min: utilization at 60 min = 0.1750 (note: utilization is *lower* here than in the lower-gravity examples above, because Tinseth's gravity factor penalizes utilization at this much higher OG); IBU = 0.1750 × (4.0/100×35×1000) ÷ 20 = 12.25 IBU. Combined with 2.4 IBU from the Saaz addition, the first-pass total was **14.7 IBU — under the 20–40 target range.** Adjustment made: increased Styrian Golding to **50 g** and Saaz to **20 g**.

Recalculated:
- 60 min Styrian Golding (50 g): utilization = 0.1750. IBU = 0.1750 × (4.0/100 × 50 × 1000) ÷ 20 = 0.1750 × 2000 ÷ 20 = **17.5 IBU**.
- 15 min Saaz (20 g): utilization = 0.0868. IBU = 0.0868 × (4.0/100 × 20 × 1000) ÷ 20 = 0.0868 × 800 ÷ 20 = **3.5 IBU**.
- **Total: 17.5 + 3.5 = 21.0 IBU.** Now within the 20–40 target range.

**BU:GU sanity check:** 21.0 ÷ 80.7 = **0.26** — a low ratio, consistent with a malt/sugar-forward, yeast-character-driven style where hops play a supporting role rather than a starring one, matching the 26C description's continental-hops-in-the-background guidance.

**ABV check:** Belgian strains attenuate aggressively, especially with the sugar addition helping dry the finish — a realistic ~82% apparent attenuation gives FG ≈ 1.0145 and ABV ≈ (1.0807−1.0145)×131.25 = **8.7%**. Within the 7.5–9.5% target range.

**Yeast:** A spicy-fruity Belgian ale strain (per [`../ingredients/yeast.md`](../ingredients/yeast.md)) is the defining ingredient of this style — its ester/phenol production is not incidental, it's the entire flavor point, which is why yeast selection here is arguably more important than any single malt or hop decision in the recipe.

**Process note:** Mash at 148–150°F/64–66°C — deliberately low, to maximize wort fermentability and let the yeast (plus the sugar addition) drive the finish dry, avoiding a cloying, too-full-bodied result at this OG. Ferment warm by ale standards — commonly 68°F/20°C rising freely into the mid-70s°F/low-20s°C as fermentation progresses — because Belgian strains are specifically chosen to be fermented warm on purpose, producing the spicy/fruity ester and phenol character the style is built around; fermenting this strain cold and "clean" the way an American ale strain would be fermented actively works against the style's character rather than protecting it.

---

### Example 5 — Munich Helles (BJCP 4A): the patient lager

**BJCP 2021 target ranges (4A, verified against bjcp.org):** OG 1.044–1.048 · FG 1.006–1.012 · ABV 4.7–5.4% · IBU 16–22 · SRM 3–5.

| Grain | Weight | °Lovibond | PPG |
|---|---|---|---|
| Pilsner malt | 8.5 lb (3.86 kg) | 2.0 | 37 |
| Munich malt (light) | 0.75 lb (0.34 kg) | 8 | 37 |
| **Total** | **9.25 lb (4.2 kg)** | | |

**Gravity check:** points = (8.5×37 + 0.75×37) × 0.71 = (314.5 + 27.75) × 0.71 = 342.25 × 0.71 = 243.0 points; ÷ 5.283 gal = 46.0 points/gal → **OG = 1.0460**. Within the tight 1.044–1.048 target range — this style has one of the narrowest OG windows of any common BJCP style, so grain bill weight is worth double-checking precisely rather than rounding generously.

**Color check:** MCU = (8.5×2.0 + 0.75×8) ÷ 5.283 = (17 + 6) ÷ 5.283 = 4.35; SRM = 1.4922 × 4.35^0.6859 = **4.1 SRM**. Within the 3–5 target range.

| Hop | Weight | AA% | Time | Purpose |
|---|---|---|---|---|
| Hallertau Mittelfrüh | 28 g | 4.0% | 60 min | Bittering |
| Hallertau Mittelfrüh | 12 g | 4.0% | 20 min | Light noble flavor |

**IBU check (Tinseth, at OG 1.0460) — first pass and adjustment shown:**

First pass used 22 g at 60 min + 10 g at 20 min: utilization at 60 min = 0.2391; IBU = 0.2391 × (4.0/100×22×1000) ÷ 20 = 10.5 IBU; plus 2.9 IBU from the 20-minute addition, for a first-pass total of **13.4 IBU — under the 16–22 target range.** Adjustment made: increased the 60-minute charge to **28 g** and the 20-minute charge to **12 g**.

Recalculated:
- 60 min (28 g): utilization = 0.2391. IBU = 0.2391 × (4.0/100 × 28 × 1000) ÷ 20 = 0.2391 × 1120 ÷ 20 = **13.4 IBU**.
- 20 min (12 g): utilization = 0.1448. IBU = 0.1448 × (4.0/100 × 12 × 1000) ÷ 20 = 0.1448 × 480 ÷ 20 = **3.5 IBU**.
- **Total: 13.4 + 3.5 = 16.9 IBU.** Now within the 16–22 target range.

**ABV check:** at FG 1.006–1.012, ABV = (1.0460 − FG) × 131.25 → 4.5%–5.3%. This lands almost exactly on the 4.7–5.4% target range (the low edge at the very-low-FG extreme rounds slightly under 4.7%, which is a reminder that hitting FG within the style's stated band — not just OG — depends on actually achieving the clean, well-attenuated fermentation this style requires).

**Yeast:** Clean German lager yeast — the 4A style description explicitly calls for a strain with minimal ester/fruitiness so the Pilsner-malt-forward, "smooth, malty" character can show through unobscured.

**Process note:** Mash at 150–151°F/66°C, a moderate saccharification temperature that gives good fermentability without stripping all body — appropriate for a style that wants "moderate grainy-sweet malt flavor" rather than either a cloying or a razor-thin finish. Ferment cold: roughly 48–50°F/9–10°C for primary fermentation (true lager territory, well below any ale strain's range), followed by a diacetyl rest (raising temperature briefly toward the end of fermentation to let the yeast clean up buttery diacetyl byproducts) and then several weeks of cold lagering/conditioning near freezing before packaging — this extended cold process is exactly the "longer/cooler" commitment lager styles require, and it needs to be planned for (dedicated fridge/chamber space, weeks of patience) before brew day, not improvised afterward, per the process-planning checklist in Section 7.

---

## Sources

- [BJCP 2021 Style Guidelines — full PDF](https://www.bjcp.org/wp-content/uploads/2025/02/2021_Guidelines_Beer_1.25.pdf)
- [BJCP — 2021 Beer Style Guidelines index](https://www.bjcp.org/style/2021/beer/)
- [BJCP — Introduction to the 2021 Guidelines](https://www.bjcp.org/beer-styles/introduction-to-the-2021-guidelines/)
- [BJCP — 18B. American Pale Ale](https://www.bjcp.org/style/2021/18/18B/american-pale-ale/)
- [BJCP — 21A. American IPA](https://www.bjcp.org/style/2021/21/21A/american-ipa/)
- [BJCP — 19C. American Brown Ale](https://www.bjcp.org/style/2021/19/19C/american-brown-ale/)
- [BJCP — 26C. Belgian Tripel](https://www.bjcp.org/style/2021/26/26C/belgian-tripel/)
- [BJCP — 4A. Munich Helles](https://www.bjcp.org/style/2021/4/4A/munich-helles/)
- [Adventures in Homebrewing — Want A Balanced Beer? Calculate The BU:GU Ratio](https://blog.homebrewing.org/bu-gu-ratio/)
- [BeerSmith — Balancing your Beer with the Bitterness Ratio](https://beersmith.com/blog/2009/09/26/balancing-your-beer-with-the-bitterness-ratio/)
- [Grainfather Help Centre — What is BU/GU?](https://help.grainfather.com/hc/en-us/articles/360019549334-What-is-BU-GU)
- [Birallee Beer & Brewing — Understanding the BU:GU Ratio in Homebrewing](https://www.biralleebrewing.com/2021/10/what-is-bugu-ratio.html)
- Internal cross-references: [`../ingredients/malts-and-grains.md`](../ingredients/malts-and-grains.md), [`../ingredients/hops.md`](../ingredients/hops.md), [`../ingredients/yeast.md`](../ingredients/yeast.md), [`../ingredients/water-chemistry.md`](../ingredients/water-chemistry.md), [`../math/calculators-and-formulas.md`](../math/calculators-and-formulas.md), [`../equipment/equipment-overview.md`](../equipment/equipment-overview.md), [`../process/brewing-methods-and-process.md`](../process/brewing-methods-and-process.md)

*Note on methodology: all five worked examples in the appendix use the PPG method, Tinseth IBU formula, and Morey SRM equation applied by hand with the arithmetic shown in this document, cross-checked against the official BJCP 2021 style pages for numeric target ranges. Grain PPG and °Lovibond reference values are drawn from the ranges established in [`../ingredients/malts-and-grains.md`](../ingredients/malts-and-grains.md). Real-world results will vary from these calculations based on actual measured mash efficiency, hop alpha-acid percentage (which varies by crop/lot — always check the package, not a generic assumed value), and fermentation attenuation on the day, which is exactly why Section 2's guidance on measuring your own system's efficiency, and Section 8's guidance on treating scaled/adjusted recipes as estimates to verify, both matter in practice.*
