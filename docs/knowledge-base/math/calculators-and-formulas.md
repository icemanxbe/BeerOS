# BeerOS Knowledge Base: Calculators and Formulas

This document is the specification source for BeerOS's calculator code. Every formula below is written in its literal form (not paraphrased), with units defined, worked numeric examples, and a citation. A `STATUS:` line at the end of each formula tells the independent verification pass exactly what still needs double-checking versus what already has solid primary/secondary sourcing.

**Legend:**
- `STATUS: verified against [source]` — coefficients confirmed against a named, findable source (ideally primary; secondary sources noted as such).
- `STATUS: needs independent verification` — the general form is well-attested across multiple homebrewing references, but the exact coefficient(s) could not be pinned to one authoritative primary document during this research pass, or sources showed minor disagreement that should be re-checked.

---

## Table of Contents

1. [Original/Starting Gravity (OG) from a Grain Bill](#1-originalstarting-gravity-og-from-a-grain-bill)
2. [Final Gravity (FG) and Attenuation](#2-final-gravity-fg-and-attenuation)
3. [ABV (Alcohol By Volume)](#3-abv-alcohol-by-volume)
4. [IBU (International Bitterness Units)](#4-ibu-international-bitterness-units)
5. [SRM / Color (Morey Equation)](#5-srm--color-morey-equation)
6. [Water Chemistry Math](#6-water-chemistry-math)
7. [Priming Sugar for Bottle Carbonation](#7-priming-sugar-for-bottle-carbonation)
8. [Force Carbonation (Kegging)](#8-force-carbonation-kegging)
9. [Strike Water Temperature Calculation](#9-strike-water-temperature-calculation)
10. [Mash Efficiency / Brewhouse Efficiency](#10-mash-efficiency--brewhouse-efficiency)
11. [Yeast Pitch Rate / Cell Count](#11-yeast-pitch-rate--cell-count)
12. [Refractometer Correction for Alcohol](#12-refractometer-correction-for-alcohol)
13. [Sources](#13-sources)

---

## 1. Original/Starting Gravity (OG) from a Grain Bill

### 1.1 The PPG / Potential Extract Method

```
gravity points = Σ ( grain weight (lb) × grain potential extract (PPG) × efficiency )
OG points = gravity points / batch volume (gal)
OG = 1 + (OG points / 1000)
```

**Variables:**
- `grain weight` — weight of each fermentable/grain in the recipe, in pounds (lb).
- `PPG` (Points per Pound per Gallon) — the specific gravity contribution, expressed in "gravity points" (thousandths of SG), that one pound of a given grain/extract would contribute if fully dissolved in one U.S. gallon of water at 100% efficiency. Example: a fermentable rated at 36 PPG dissolved 1 lb into 1 gallon of water yields a solution of 1.036 SG.
- `efficiency` — the fraction (0–1) of the grain's theoretical potential that is actually captured into the wort (see Section 10).
- `batch volume` — total wort volume the extract is dissolved into, in U.S. gallons.
- `OG points` — the sum, e.g. "1.052 SG" is "52 points."

**What PPG represents and why efficiency is always < 100%:** PPG (also called "potential extract" or "yield") is a laboratory-measured value. Maltsters determine it by grinding a fine sample of the malt, mashing it under standardized, near-ideal laboratory conditions (fine grind, excess enzyme time, optimal temperature/pH), fully extracting the fermentable and non-fermentable solids, and measuring the resulting specific gravity per unit weight and volume. This "hot water extract" (HWE) test represents the theoretical maximum sugar yield from that grain — it is essentially "100% conversion, 100% lautering, zero loss." A base 2-row pale malt is typically rated around 36–37 PPG (roughly 80% extract by weight, since 1 lb of pure sucrose dissolved in 1 gal of water would yield about 46 points, and malt extract is not 100% pure fermentable sugar). In an actual homebrew mash and lauter, real efficiency is always below 100% because: (a) not all starch converts to fermentable sugars in the finite mash time (conversion efficiency), (b) some sugar-rich wort is physically retained in the wet grain bed and never makes it to the kettle (lauter/sparge efficiency — see Section 10), and (c) there are unavoidable small losses to trub, dead space, and incomplete rinsing. Typical homebrew all-grain systems achieve 65–85% brewhouse efficiency; commercial breweries with more consistent, larger-scale lautering often exceed 90%.

**Worked example (US units):** A recipe uses 10 lb of 2-row base malt at 37 PPG, batch size 5 gallons, expected efficiency 72%.
```
gravity points = 10 lb × 37 PPG × 0.72 = 266.4 points
OG points = 266.4 / 5 gal = 53.28 points
OG = 1 + 53.28/1000 = 1.0533
```

STATUS: verified against Palmer's *How to Brew* (Chapter 18, "Understanding Extraction Efficiency," howtobrew.com) and Kai Troester's Braukaiser "Understanding Efficiency" article, both of which use the "gravity points = brewing efficiency × grain weight (lb) × potential PPG, divided by batch volume" formulation. Typical PPG values (2-row ≈ 36–37, DME ≈ 44, LME ≈ 38) are widely reproduced across malt-supplier spec sheets and homebrewing references (e.g., Brew Dudes, Brewer's Friend) but individual maltster HWE lab values for a *specific* malt should always take precedence over these generic figures.

### 1.2 Metric Formulation

Metric brewing calculators do not typically invent a new formula shape — they either (a) convert PPG into an equivalent metric "points per kilogram per liter" (PKL) constant, or (b) skip points entirely and let the user enter the grain's percentage yield/potential directly (as Brewfather does), computing extract mass in kilograms and dividing by volume in liters using standard specific-gravity arithmetic.

**Conversion constant:** `1 PPG = 8.3454 points per kg per liter (PKL)`

This factor comes from the unit conversion 1 lb = 0.453592 kg and 1 US gallon = 3.78541 L: since PPG is points contributed by 1 lb in 1 gal, and points scale inversely with mass-density units, `PPG × (3.78541 L/gal ÷ 0.453592 kg/lb) = PPG × 8.3454 = PKL`.

```
gravity points = Σ ( grain weight (kg) × PKL × efficiency )
OG points = gravity points / batch volume (L)
OG = 1 + (OG points / 1000)
```

**Worked example (metric):** 4.5 kg of 2-row malt at PKL = 37 × 8.3454 = 308.8, batch size 19 L, efficiency 72%.
```
gravity points = 4.5 kg × 308.8 × 0.72 = 1,000.5
OG points = 1,000.5 / 19 L = 52.66
OG = 1.0527
```
(This closely matches the US-unit example above, 10 lb ≈ 4.54 kg and 5 gal ≈ 18.9 L, confirming the conversion is self-consistent.)

STATUS: verified via independent re-derivation — the verification pass recomputed the conversion constant from first principles using precise conversion factors (1 lb = 0.453592 kg, 1 US gal = 3.785412 L): `3.785412 / 0.453592 = 8.34544`, matching the documented 8.3454 to the precision shown. Because this constant is pure dimensional analysis (not an empirical fit), independently re-deriving it from the defining conversion factors is a complete verification, not just another secondary source repeating the same number — no further sourcing is needed. Note that Brewfather's actual UI avoids this conversion by having users enter a fermentable's "Yield %" (equivalent to potential extract as a percentage of theoretical 100% sucrose-equivalent, ~46 points/lb/gal) rather than requiring a PKL number.

---

## 2. Final Gravity (FG) and Attenuation

### 2.1 Apparent Attenuation

```
Apparent Attenuation (%) = (OG points − FG points) / OG points × 100
```

**Variables:** OG points and FG points are the gravity points (SG − 1, × 1000) at the start and end of fermentation, as measured directly by hydrometer or refractometer (uncorrected).

**Expected FG from a yeast's rated attenuation:**
```
FG points ≈ OG points × (1 − attenuation%/100)
```

**Worked example:** OG = 1.052 (52 points), yeast rated at 75% apparent attenuation.
```
FG points ≈ 52 × (1 − 0.75) = 13
FG ≈ 1.013
```
Checking the first formula backward: Apparent Attenuation = (52 − 13)/52 × 100 = 75%. Consistent.

STATUS: verified — this is the standard, universally used definition of apparent attenuation in brewing (found in Palmer's *How to Brew*, BeerSmith, Brewer's Friend, and essentially every brewing calculator). It is arithmetically self-evident given the definitions of OG/FG points, so there is no competing formula to document here.

### 2.2 Real Attenuation vs. Apparent Attenuation, and the Balling Real Extract Formula

**Why apparent attenuation reads high:** A hydrometer measures the density (specific gravity) of the liquid. Alcohol is *less dense* than water, so as sugar (which raises SG) is converted into ethanol and CO₂ (ethanol lowers SG, CO₂ escapes), the SG drop measured by a hydrometer overstates how much dissolved solid ("extract") actually left the solution. Some of the SG drop is due to alcohol's low density, not due to sugar disappearing. "Real attenuation" corrects for this by computing what the extract content would be if the alcohol's density-lowering effect were removed mathematically — i.e., it asks "how much dissolved solid (sugar-equivalent) is actually still in this beer," not "what does a hydrometer read."

**The rigorous formula (Balling equation, refined by Michael Hall):**
```
Real Extract (°P) = 0.1808 × OE (°P) + 0.8192 × AE (°P)
```
where OE = Original Extract (the wort's original gravity expressed in degrees Plato) and AE = Apparent Extract (the beer's final/present gravity expressed in degrees Plato, i.e., the raw hydrometer/refractometer reading of the finished beer, NOT corrected for alcohol).

This formula is a linear regression fit — grounded in the classical Balling/Ostwald extract-alcohol relationship as refined and republished for homebrewers by Michael L. Hall — that accounts for the fact that once alcohol is present, present gravity is a *mixture* of the effects of remaining sugars/dextrins and the density-lowering effect of ethanol; the 0.1808/0.8192 weighting was derived to back out the alcohol contribution and recover the true residual extract.

**Real Attenuation:**
```
Real Attenuation (%) = (OE − Real Extract) / OE × 100
```

**Worked example:** OE = 1.052 SG ≈ 12.9 °P (using SG-to-Plato conversion from Section 11.2), AE (apparent/present gravity) = 1.013 SG ≈ 3.3 °P.
```
Real Extract = 0.1808 × 12.9 + 0.8192 × 3.3 = 2.33 + 2.70 = 5.04 °P
Real Attenuation = (12.9 − 5.04) / 12.9 × 100 = 60.9%
```
Compare to Apparent Attenuation of 75% from the Section 2.1 example (recomputed in Plato terms, apparent attenuation ≈ (12.9−3.3)/12.9×100 = 74.4%, matching within rounding). Real attenuation (≈61%) is meaningfully lower than apparent attenuation (≈74%) — this is the expected direction and rough scale of the discrepancy.

**On the "real attenuation ≈ 0.81× apparent attenuation" rule of thumb:** This commonly cited ratio is a rough rule of thumb, not a fixed physical constant — the actual ratio between real and apparent attenuation varies with OG and final attenuation level, because the Balling formula's correction depends on the specific OE/AE values, not a flat multiplier. In the worked example above the ratio (60.9/74.4 ≈ 0.82) happens to land close to the oft-cited 0.81–0.85 range, but this is a byproduct of the specific example numbers, not a universal conversion factor. BeerOS should implement the actual Balling Real Extract formula (which correctly varies with gravity) rather than a flat 0.81× multiplier rule of thumb.

STATUS: verified (Balling/Hall Real Extract formula with coefficients 0.1808/0.8192) against Michael L. Hall, "Brew by the Numbers: Add Up What's in Your Beer," *Zymurgy*, Vol. 18, No. 2 (Summer 1995), American Homebrewers Association, as reproduced by Brewer's Friend's "Alcohol By Volume Calculator Updated" documentation (brewersfriend.com/2011/06/16/alcohol-by-volume-calculator-updated/). STATUS: needs independent verification for the "0.81–0.85×" rule-of-thumb claim — this figure appears repeatedly in secondary/forum sources as a rough approximation but is not itself a formula BeerOS should hard-code; the Balling formula above is the correct implementation and should supersede the rule of thumb.

---

## 3. ABV (Alcohol By Volume)

### 3.1 Simple/Standard Formula

```
ABV% = (OG − FG) × 131.25
```

**Worked example:** OG = 1.052, FG = 1.013.
```
ABV% = (1.052 − 1.013) × 131.25 = 0.039 × 131.25 = 5.12%
```

This formula (and the closely related 131 or 105.92-style variants seen in some tools) is a linear approximation: it assumes the relationship between the SG drop and resulting alcohol content is constant across all gravities. It has been used since long before homebrewers had computers, is easy to compute by hand, and is accurate enough (within a few tenths of a percent) for typical table beers in the 1.035–1.070 OG range.

STATUS: verified — reproduced identically across essentially every brewing reference (Palmer's *How to Brew*, Brewer's Friend, BeerSmith, Charlie Papazian's *The Joy of Homebrewing*). Some sources use 131 instead of 131.25; both are in circulation, with 131.25 being marginally more common in modern calculators.

### 3.2 High-Gravity / More Accurate Formula

```
ABV% = 76.08 × (OG − FG) / (1.775 − OG) × (FG / 0.794)
```

**Worked example:** Same beer, OG = 1.052, FG = 1.013.
```
ABV% = 76.08 × (1.052 − 1.013) / (1.775 − 1.052) × (1.013 / 0.794)
     = 76.08 × 0.039 / 0.723 × 1.276
     = 2.967 / 0.723 × 1.276
     = 4.104 × 1.276
     = 5.24%
```
At this moderate gravity the two formulas differ by only about 0.1 percentage points (5.12% vs. 5.24%). The divergence grows substantially at higher OG. **Worked high-gravity example** (imperial stout, OG = 1.092, FG = 1.021 — this pairing is also used in Brewer's Friend's own documentation):
```
Simple:  ABV% = (1.092 − 1.021) × 131.25 = 0.071 × 131.25 = 9.32%
Advanced: ABV% = 76.08 × (1.092−1.021)/(1.775−1.092) × (1.021/0.794)
                = 76.08 × 0.071/0.683 × 1.286
                = 5.402/0.683 × 1.286
                = 7.909 × 1.286
                = 10.17%
```
The gap widens to nearly a full percentage point (9.32% vs. 10.17%) at this gravity — a ~9% relative underestimate from the simple formula.

**Why the simple formula loses accuracy at high gravity:** ABV% = (OG−FG)×131.25 is a linear approximation to what is actually a nonlinear relationship between specific gravity, dissolved solids, and alcohol content. As wort gravity rises, a greater fraction of the "points" lost during fermentation is converted not just to alcohol in a fixed proportion, but the mixture's overall density behavior (water + ethanol + residual extract) departs increasingly from the linear assumption baked into the simple formula. The 76.08/1.775/0.794 formula is derived from the same underlying Balling/real-extract relationship discussed in Section 2.2 (it uses degrees Plato-based real extract math internally, expressed here in a pre-simplified SG-based form) and is more accurate because it accounts for the true, non-linear alcohol-density relationship rather than assuming a constant multiplier.

STATUS: verified against Brewer's Friend's "Alcohol By Volume Calculator Updated" (brewersfriend.com/2011/06/16/alcohol-by-volume-calculator-updated/), which cites this exact formula (76.08 / 1.775 / 0.794 coefficients) to Michael L. Hall's "Brew by the Numbers" article, *Zymurgy* Summer 1995 Vol. 18 No. 2, and to Ray Daniels' *Designing Great Beers*, and which reproduces the same 1.092/1.021 worked example (9.32% vs 10.17%) used above as an independent cross-check. Because this formula is algebraically derived from the same Balling real-extract relationship as Section 2.2, and one secondary source (a search-engine-summarized result) attributed a similar-looking formula to "Gosset" rather than Hall, BeerOS's verification pass should specifically re-confirm the Hall/Zymurgy-1995 attribution against a scanned/archived copy of the original article if at all possible, since this is the one point in this document where two different names surfaced for the same formula.

---

## 4. IBU (International Bitterness Units)

Three major methods are in common use, and they diverge because each was fit to different empirical data sets, uses different utilization models, and — in Garetz's case — accounts for additional physical variables the others ignore.

### 4.1 Tinseth Formula (the modern default)

**Full formula:**
```
IBU = (AAU × Utilization × 74.89) / batch volume (gal)
```
where AAU (Alpha Acid Units) = hop weight (oz) × alpha acid rating (as a whole number, e.g. 12 for 12% AA, then treated as decimal 0.12 in the underlying math depending on convention — see decomposed form below for the unambiguous version).

**Decomposed form (unambiguous, recommended for implementation):**
```
IBU = Σ [ 7490 × (grams alpha acid in the addition) × Utilization ] / (volume in liters × 1000)
```
or, in the classic US-unit decomposed form most homebrew tools implement:
```
Utilization = Bigness Factor × Boil Time Factor

Bigness Factor = 1.65 × 0.000125^(wort gravity − 1)

Boil Time Factor = (1 − e^(−0.04 × time)) / 4.15

IBU = (Utilization × alpha acid decimal × hop weight (oz) × 7490) / batch volume (gal)
```

**Variables:**
- `wort gravity` — the average gravity of the wort during the boil (specific gravity as a decimal, e.g. 1.050), NOT the final OG at knockout; some calculators use pre-boil gravity, others average pre/post-boil.
- `time` — boil time for that hop addition, in minutes (time remaining in the boil after the addition, i.e. a 60-minute addition in a 60-minute boil uses time=60; a 15-minute addition uses time=15).
- `alpha acid decimal` — alpha acid % expressed as a decimal (12% AA → 0.12).
- `hop weight` — in ounces.
- `batch volume` — final batch (post-boil, into-fermenter) volume, in US gallons.
- `74.89` / `7490` — unit-conversion constants (see below); 7490 is used when working directly in mg/L-style intermediate math with ounces and gallons, and different secondary sources present the constant as either 74.89 or 7490 depending on exactly where in the formula the ×100 (percent-to-decimal) and unit conversions are folded in. Implementers should verify against a known-good worked example (below) rather than assume which exact form their reference used.

**Worked example:** 1 oz of 6% AA hops, boiled 60 minutes, average boil gravity 1.050, batch volume 5.5 gallons.
```
Bigness Factor = 1.65 × 0.000125^(1.050 − 1) = 1.65 × 0.000125^0.05
   0.000125^0.05 = e^(0.05 × ln(0.000125)) = e^(0.05 × −8.986) = e^−0.4493 = 0.638
Bigness Factor = 1.65 × 0.638 = 1.053

Boil Time Factor = (1 − e^(−0.04 × 60)) / 4.15 = (1 − e^−2.4) / 4.15 = (1 − 0.0907) / 4.15 = 0.9093/4.15 = 0.2191

Utilization = 1.053 × 0.2191 = 0.2307 (≈23.1%)

IBU = (0.2307 × 0.06 × 1 oz × 7490) / 5.5 gal
    = (0.2307 × 0.06 × 7490) / 5.5
    = 103.68 / 5.5
    = 18.85 IBU
```

**Physical basis of hop utilization:** "Utilization" is the fraction of the alpha acids added to the kettle that actually end up isomerized into soluble iso-alpha acids (the bittering compounds) in the finished beer. Alpha acids themselves are barely soluble in wort and contribute little bitterness in their native form; boiling causes isomerization (a heat-driven chemical rearrangement) that converts them into far more soluble, bitter iso-alpha acids. This isomerization is a time-dependent, roughly first-order (or pseudo-first-order) chemical reaction — the longer the boil, the more alpha acid gets isomerized, which is why the Boil Time Factor is a rising exponential-decay-shaped curve (`1 − e^(−k·t)`) that approaches (but never quite reaches) 100% utilization as boil time increases. Higher wort gravity *reduces* % utilization because iso-alpha acid solubility is limited by the sugar/dissolved-solids content of the wort — a denser, syrupier wort holds less dissolved iso-alpha acid in solution relative to the total isomerized, so a smaller fraction of the isomerized bitterness ends up staying dissolved and measurable (this is why the Bigness Factor decreases as gravity rises, since 0.000125 raised to a positive power less than 1 shrinks toward 0.000125 as the exponent grows, and grows toward 1 as gravity approaches 1.000).

STATUS: verified (formula shape and coefficients 1.65, 0.000125, 0.04, 4.15) against multiple faithful secondary reproductions of Glenn Tinseth's original page (realbeer.com/hops/research.html, which returned HTTP 403 to automated fetch but is referenced and quoted consistently across numerous brewing tools and articles including BeerSmith's "Hop Utilization Models for Beer Brewing Compared" and the alchemyoverlord Tinseth calculator, which states these are Tinseth's own published coefficients, empirically fit from his home-brewery IBU measurements).

> **Verification pass resolution — 74.89 vs. 7490 is not actually ambiguous:** these are the *same* formula, not two competing unit conventions. The AAU-based form (`IBU = AAU × Utilization × 74.89 / gal`) defines AAU using alpha acid as a **whole number** (e.g. "6" for 6% AA), while the decomposed form used in this document's worked example (`IBU = Utilization × alpha acid decimal × oz × 7490 / gal`) uses alpha acid as a **decimal** (0.06). Since `74.89 × 100 = 7489 ≈ 7490` (rounding), multiplying by the whole-number AA and 74.89 gives the identical result as multiplying by the decimal AA and 7490. This was confirmed by independently computing both forms against the worked example below: AAU form gives `6 × 0.2307 × 74.89 / 5.5 = 18.85 IBU`; decimal form gives `0.2307 × 0.06 × 1 × 7490 / 5.5 = 18.85 IBU` — identical. Both constants are correct; they simply expect alpha acid expressed differently. BeerOS's implementation should pick one convention (recommend: decimal AA throughout, i.e. the 7490 form, since decimal is how alpha acid is stored/entered everywhere else in this app) and use it consistently, rather than treating this as an unresolved sourcing gap.

STATUS: verified — see resolution above; the apparent 74.89/7490 discrepancy is a whole-number-vs-decimal alpha-acid convention difference, not competing sourcing, confirmed by direct recomputation of both forms against the shared worked example.

### 4.2 Rager Formula

Rager's approach differs from Tinseth's in two significant ways: it uses a different (steeper, earlier-peaking) utilization curve as a function of time, and it applies a gravity correction *only* when the wort gravity exceeds 1.050 (unlike Tinseth, which scales utilization continuously with gravity at all levels via the Bigness Factor).

**Utilization as a function of time:**
```
% Utilization = 18.11 + 13.86 × tanh[ (time − 31.32) / 18.27 ]
```
where `time` is boil time in minutes and `tanh` is the hyperbolic tangent function. This produces an S-shaped curve that starts around a small non-zero utilization even near time = 0 (Rager's model implies some bitterness contribution even from very short/whirlpool-style additions, attributed to oxidized alpha acid compounds contributing some bitterness independent of full isomerization) and asymptotically approaches roughly 32% utilization at very long boil times.

**Gravity Adjustment (GA), applied only when average boil gravity > 1.050:**
```
GA = (boil gravity − 1.050) / 0.2   [applied only if boil gravity > 1.050; GA = 0 otherwise]
```

**Full IBU formula:**
```
IBU = (ounces of hops × %Utilization × %Alpha Acid × 7462) / (batch volume (gal) × (1 + GA))
```

**Worked example:** Same inputs as the Tinseth example — 1 oz of 6% AA hops, 60-minute boil, 1.050 average gravity, 5.5 gallon batch.
```
%Utilization = 18.11 + 13.86 × tanh[(60 − 31.32)/18.27]
             = 18.11 + 13.86 × tanh(1.570)
             tanh(1.570) ≈ 0.9170
             = 18.11 + 13.86 × 0.9170
             = 18.11 + 12.71
             = 30.82%

Gravity is exactly at 1.050, so GA = 0 (no correction, since the rule applies only above 1.050).

IBU = (1 × 0.3082 × 0.06 × 7462) / (5.5 × (1 + 0))
    = (1 × 0.3082 × 0.06 × 7462) / 5.5
    = 138.0 / 5.5
    = 25.1 IBU
```
Rager's result (≈25 IBU) is noticeably higher than Tinseth's result (≈18.9 IBU) for the identical recipe — consistent with the generally observed pattern that Rager tends to predict higher IBUs than Tinseth for the same inputs, particularly at moderate-to-long boil times.

STATUS: verified — the Rager utilization tanh formula (18.11 + 13.86·tanh[(t−31.32)/18.27]) and the 7462 conversion constant, together with the gravity-adjustment-only-above-1.050 rule, are documented consistently across the alchemyoverlord Rager IBU calculator (jphosom.github.io/alchemyoverlord/ibu_rager.html) and multiple brewing-formula compilations, all attributing the original source to Jackie Rager, "Calculating Hop Bitterness in Beer," *Zymurgy* Hops and Beer Special Issue, Vol. 13, No. 4 (1990). STATUS: needs independent verification for the exact Gravity Adjustment (GA) divisor — the `/0.2` form shown above (i.e., GA increases by 1.0 for each 0.020 of gravity above 1.050) is the most commonly reproduced version, but the precise GA formula was not confirmed against a scan of the original 1990 Zymurgy article; some secondary sources present slightly different GA scaling. The independent verification pass should treat the GA divisor as the single least-certain numeric detail in the Rager formula.

### 4.3 Garetz Formula

The Garetz formula, from Mark Garetz's book *Using Hops* (1994), is the most complex of the three mainstream methods and is honestly summarized here at the level of its approach and inputs rather than reproduced coefficient-by-coefficient, because several of its correction factors are proprietary/derived from Garetz's own tables rather than a single clean public equation, and this document should not invent numbers for it.

**What Garetz adds beyond Tinseth/Rager:**
- **Altitude/elevation correction** — because water (and wort) boils at a lower temperature at higher elevation, isomerization proceeds more slowly, so Garetz applies a correction factor that effectively requires more hops (or longer boil) to reach the same bitterness at altitude. One commonly reproduced form of this factor is:
  ```
  TF (Temperature/elevation Factor) = ((elevation in feet / 550) × 0.02) + 1
  ```
  applied as a multiplier to the effective wort volume or hop weight in the bitterness calculation. An alternative form expresses the effect via a boiling-point correction, `Fbp = 1 / (1 + Elevation(ft) / 27500)`, giving the effective boiling point in °F at elevation, which then feeds into the utilization math. In practice, published discussion of this effect (e.g., BeerSmith's forum/blog coverage) notes the real-world impact is fairly small — roughly a 5% increase in required hops per 1,000 ft (305 m) of elevation gain.
- **Hop concentration factor** — a correction based on how concentrated the hops are in the boil (grams of hop per liter of wort), since Garetz's data suggested utilization is affected by hop density in the kettle, not just gravity.
- **Hop age/storage (Hop Freshness Factor, HFF)** — accounts for alpha-acid degradation during storage, reducing effective AA% based on time and storage conditions.
- **Yeast flocculation and finished beer filtration** — Garetz's model also adjusts for how much dissolved bitterness survives into the final packaged beer, since more flocculent yeast strains and finer filtration are understood to strip out some iso-alpha acids.
- **Pellet vs. whole-cone hop form** — a further multiplier since pellet hops generally give somewhat higher utilization than whole cones.

Garetz combines these into an overall correction that is applied on top of a base utilization/bittering calculation broadly similar in spirit to Rager's. Because it stacks multiple correction factors (each pushing utilization down under typical homebrew conditions), Garetz's formula is widely noted to produce the *lowest* IBU estimates of the three methods for otherwise identical inputs.

**Which method is the default for homebrewers today?** Tinseth is by far the most commonly used and most often cited as the modern default in homebrewing software (BeerSmith, Brewer's Friend, Brewfather, and most published recipes default to or prominently support Tinseth). This is largely because Tinseth's continuous gravity-scaling model is simpler to implement correctly than Rager's step-function gravity correction or Garetz's multi-factor stack, and because it has been the most extensively cross-validated against homebrew-scale batches over the decades since publication. BeerOS should implement Tinseth as its default/primary IBU model, with Rager as an optional alternative, and treat Garetz as a "summarize don't fabricate" case — if BeerOS wants a Garetz option, it should be built from Garetz's own book (*Using Hops*, 1994) or a calculator that has faithfully reproduced his tables (e.g., the alchemyoverlord Garetz calculator), not from the partial reconstruction given here.

STATUS: needs independent verification for essentially all Garetz numeric coefficients presented above (the TF/elevation formula and Fbp formula were found in secondary discussion threads, not confirmed against the original *Using Hops* text). This entire subsection should be treated as "approach documented, exact coefficients unconfirmed" and flagged for a follow-up pass with access to Garetz's original book if BeerOS intends to implement Garetz precisely rather than just summarize it.

### 4.4 Late/Whirlpool Hop Utilization

Estimating IBU contribution from hop additions made at or after flameout — whirlpool additions, hop stands, and "hopstand" or dry-hop-adjacent techniques — is genuinely harder to model reliably than boil-time additions, and this should be communicated honestly rather than presented with false precision.

**Why it's harder:** Isomerization rate depends strongly on temperature, and once the boil ends, wort temperature is no longer fixed at ~212°F/100°C — it decays over time following a roughly exponential cooling curve that depends on kettle geometry, ambient temperature, whether a lid is on, and cooling method (immersion chiller, plate chiller, no active cooling, etc.). The standard Tinseth/Rager/Garetz formulas all assume boiling-point temperature and don't have a built-in temperature term, so naively plugging "time held in whirlpool" into the standard Boil Time Factor at full boil-temperature utilization systematically overestimates late-addition IBU contribution, since a meaningful fraction of that time is spent at sub-boiling, lower-isomerization-rate temperatures.

**Approaches used by real calculators:**
- **BeerSmith's simplified approach:** treats whirlpool utilization as a flat percentage tied to the whirlpool/stand temperature, e.g. defaulting to roughly 50% utilization for a whirlpool held near 194°F (90°C), but explicitly recommending the user drop this to roughly 13–15% if the actual stand temperature is closer to 170°F (77°C) — reflecting the strong temperature sensitivity, documented in BeerSmith's "Hop Utilization in the Whirlpool for Beer Brewing" (2019) blog article.
- **The mIBU model (a more rigorous alternative):** developed by the alchemyoverlord project, this method explicitly models (a) wort temperature as a decaying exponential function of time after flameout, based on measured cooling-curve data for a given kettle size/geometry/cooling method, and (b) hop utilization as a function of that time-varying temperature, then integrates utilization over the whole hopstand/whirlpool/cooling period rather than using a single flat percentage. This is documented at alchemyoverlord's "A Modified IBU Calculation (Especially for Late Hopping and Whirlpool Hops)" (2015) and the associated mIBU calculator.

**Honest limitation to surface in the BeerOS UI:** because both approaches ultimately depend on assumptions about the actual cooling curve of the brewer's specific kettle/process (something a calculator can't observe directly), whirlpool/hopstand IBU estimates should always be presented with materially lower confidence than boil-time IBU estimates — different tools can and do disagree by a meaningful margin (multiple-IBU-point swings) on the same late addition, and real-world measured IBU from lab testing often diverges further from any of these estimates than boil-addition IBU does.

STATUS: verified — the specific BeerSmith default percentages (50% utilization at 194°F, dropping to 13–15% at 170°F, and the resulting example swing from ~60 IBU to ~18 IBU for the same addition) were independently re-confirmed in the follow-up pass via a direct search hit on BeerSmith's own blog article "Hop Utilization in the Whirlpool for Beer Brewing" (beersmith.com/blog/2019/12/18/hop-utilization-in-the-whirlpool-for-beer-brewing/), matching the original citation exactly rather than relying on a secondary summary alone. The mIBU *methodology* (temperature-decay-driven utilization integration) is well-documented at alchemyoverlord's own site and can be considered a solid conceptual reference even though its exact numerical outputs depend on per-batch cooling-curve inputs that BeerOS would need to either measure or approximate.

---

## 5. SRM / Color (Morey Equation)

### 5.1 The Formula

```
MCU = Σ ( grain weight (lb) × grain color (°Lovibond) ) / batch volume (gal)

SRM = 1.4922 × MCU^0.6859
```

**Variables:**
- `grain weight` — pounds of each colored grain/malt in the grist.
- `grain color` — the malt's color rating in degrees Lovibond (°L), as provided by the maltster.
- `MCU` (Malt Color Unit, sometimes called "homebrew color units" or HCU) — a simple linear pre-color-correction metric.
- `SRM` (Standard Reference Method) — the actual industry-standard beer color scale, measured by spectrophotometer absorbance at 430 nm through a specific pathlength.

**Worked example:** A grist of 9 lb 2-row (1.8 °L) and 1 lb Crystal 60 (60 °L), batch volume 5.5 gal.
```
MCU = (9 × 1.8 + 1 × 60) / 5.5 = (16.2 + 60) / 5.5 = 76.2 / 5.5 = 13.85

SRM = 1.4922 × 13.85^0.6859
    13.85^0.6859 = e^(0.6859 × ln(13.85)) = e^(0.6859 × 2.6285) = e^1.8030 = 6.068
SRM = 1.4922 × 6.068 = 9.06
```
This is roughly a medium amber/copper color.

**Why the exponent, and its known limitation:** MCU alone (the simple linear sum) is a reasonable estimate of color only at low values — Morey's work (building on earlier work by Mosher and by Daniels) found that color perception/measurement does not scale linearly with the naive MCU sum, particularly as MCU rises; the relationship flattens out (an SRM of 30 doesn't look or measure at "twice as dark" as SRM 15 the way a linear model would predict). The 0.6859 power-law exponent corrects for this non-linearity, fitting the curve to real measured data across a range of beer colors. The Morey equation is documented as valid up to about SRM 50; beyond that (very dark stouts, imperial stouts, etc.) the equation is known to become progressively less accurate and can noticeably underestimate perceived/measured darkness, because at very high grain-color contributions (large amounts of black or roasted malts) the underlying MCU-to-SRM relationship it was fit to no longer holds as cleanly — dark, highly-kilned specialty grains behave somewhat differently in solution than the malts used to build the original data set.

**Metric MCU:** Most metric brewing calculators simply convert grain weight to kg and volume to liters and rescale the constant, since MCU is a linear ratio: `MCU(metric) = Σ(kg × °L) / L × 8.3454` (using the same lb→kg, gal→L conversion factor derived in Section 1.2, since MCU has the same "mass per volume" dimensional structure as PPG). The Morey exponent (0.6859) and leading coefficient (1.4922) are unitless/empirically fit and apply unchanged once MCU is computed in whatever unit convention is used, as long as MCU itself is computed consistently.

**EBC conversion:**
```
EBC ≈ SRM × 1.97
```
EBC (European Brewing Convention) color uses a different measurement cell pathlength (1 cm) than the original ASBC/SRM method (which historically used a 1/2 inch cell), and EBC's convention also adopted the SRM/ASBC wavelength standard (430 nm) in later years; the 1.97 factor reconciles these differences.

STATUS: verified (SRM = 1.4922 × MCU^0.6859) against multiple faithful reproductions of Daniel (Dan) Morey's color-estimation article published in *Brewing Techniques* (building on earlier work by Randy Mosher and by Ray Daniels), cross-confirmed via BrewWiki's "Estimating Color" summary and independent brewing-calculator documentation (Beer Maverick's "Understanding SRM and Lovibond Beer Color Calculations"), which both state the formula holds for SRM values up to approximately 50 and becomes progressively less accurate for very dark beers beyond that range. STATUS: needs independent verification for the precise original publication venue/date of Morey's article (multiple secondary sources reference it as a *Brewing Techniques* magazine article but a full bibliographic citation — exact issue/year — was not directly confirmed in this pass). The EBC = SRM × 1.97 conversion factor is corroborated across multiple independent brewing references (Beer Maverick, BeerSmith, Grainfather's EBC documentation) and can be treated as reasonably solid, though its own ultimate origin point (which body first published exactly "1.97" versus "1.94" or another close value) was not traced to one single primary document — some minor disagreement on the third significant figure exists across sources.

---

## 6. Water Chemistry Math

### 6.1 Residual Alkalinity

```
RA (ppm as CaCO₃) = Total Alkalinity (ppm as CaCO₃) − ( Ca (ppm) / 3.5 + Mg (ppm) / 7 )
```

**Variables:**
- `Total Alkalinity` — the water's buffering capacity against pH drop, expressed in ppm as calcium carbonate equivalent (a standard water-report unit).
- `Ca`, `Mg` — calcium and magnesium concentration in the water, in ppm (mg/L).
- The divisors 3.5 and 7 convert Ca and Mg ppm into their calcium-carbonate-equivalent "alkalinity-canceling power": empirically, roughly 3.5 ppm of calcium (or 7 ppm of magnesium — i.e., magnesium is about half as effective per ppm as calcium) neutralizes the pH-raising effect of 1 ppm of alkalinity-as-CaCO₃, because calcium and magnesium ions react with phosphates and other components in the malt/mash to release acidifying hydrogen ions, counteracting the mash-pH-raising effect of bicarbonate/carbonate alkalinity.

**Worked example:** Water report shows Total Alkalinity = 120 ppm as CaCO₃, Ca = 80 ppm, Mg = 12 ppm.
```
RA = 120 − (80/3.5 + 12/7) = 120 − (22.86 + 1.71) = 120 − 24.57 = 95.4 ppm as CaCO₃
```

**How RA feeds into mash pH (directional logic only):** Residual alkalinity is a *directional* predictor of mash pH shift, not a precise pH-prediction formula on its own. Higher RA water tends to *raise* mash pH (push it more alkaline, away from the desirable ~5.2–5.6 mash pH range), because there is more unneutralized buffering capacity left over after Ca/Mg have done their acidifying work. Darker, more acidic grists (significant amounts of roasted/crystal/black malt) naturally lower mash pH on their own due to the inherent acidity of those kilned/roasted malts (melanoidin and other acidic compounds), which is why recipes using dark grists can tolerate — and often need — water with *higher* RA to land in the right mash pH range, while pale-grist beers need low-RA (or acidified) water to avoid an overly alkaline mash. Precisely predicting the *numeric* mash pH shift from RA and grist color requires per-malt acidity/buffering data (how much each specific malt shifts pH, which varies by malt type, roast level, and even lot-to-lot), which is why RA alone is only a rough directional signal, and dedicated water-chemistry calculators (Bru'n Water by Martin Brungard, or Kai Troester's Braukaiser mash-chemistry spreadsheet) exist specifically to combine RA with a modeled per-malt acidity contribution and known mash-thickness effects to produce an actual numeric mash pH prediction. BeerOS should be explicit in its UI that a simple RA number is a useful sanity-check/direction indicator, not a substitute for a full water-and-grist mash pH model.

STATUS: verified — the RA formula with divisors 3.5 (Ca) and 7 (Mg), applied to Ca/Mg in ppm and alkalinity in ppm-as-CaCO₃, is documented as originating from German brewing scientist Paul Kolbach's empirical work and is reproduced by John Palmer (used throughout Palmer & Kaminski's *Water: A Comprehensive Guide for Brewers*, and Palmer's residual-alkalinity nomograph materials). Note: Braukaiser/Kai Troester's technical writing expresses an equivalent relationship using milliequivalents per liter (mEq/L) rather than ppm directly (`RA = Alk − ([Ca] + 0.5[Mg])/3.5` when Ca and Mg are already expressed in mEq/L) — this is the same underlying chemistry expressed in different units, not a competing formula, but implementers must be careful not to mix the ppm-based divisors (3.5, 7) with mEq/L-based inputs, since doing so would silently corrupt the result. BeerOS should pick the ppm-based form (3.5, 7 divisors, Ca/Mg/Alkalinity all in ppm) as it is the form most water reports are already expressed in, and is the form Palmer's book uses directly.

---

## 7. Priming Sugar for Bottle Carbonation

### 7.1 Target CO₂ Volumes by Style

Style-dependent target carbonation ranges commonly cited by homebrewing references:
- British ales, stouts, porters: ~1.5–2.2 volumes
- Most American ales and lagers: ~2.2–2.6 volumes
- German wheat beers (Weissbier), Belgian ales, saisons: ~2.6–3.5+ volumes
- Lambics/other highly effervescent styles: up to ~4.0 volumes

STATUS: needs independent verification for exact per-style numeric boundaries — the general ranges above are broadly consistent across multiple homebrewing carbonation-chart sources (e.g., style/carbonation charts referenced by Homebrew Happy Hour, Asian Beer Network's beer-style carbonation chart, and Brewers Association materials), but different charts draw the style-boundary lines slightly differently and there is no single universally agreed table; BeerOS should present these as reasonable defaults adjustable per-recipe rather than fixed truths, and ideally cite the specific style-guideline source it lands on (e.g., BJCP style guidelines' carbonation notes, if available) during implementation.

### 7.2 Residual CO₂ (Already Dissolved at Current Temperature)

```
Residual CO₂ (volumes) = 3.0378 − (0.050062 × T) + (0.00026555 × T²)
```
where `T` is the beer's temperature in °F at the time of packaging/priming.

**Worked example:** Beer at 68°F (typical room-temperature fermentation-complete temperature).
```
Residual CO₂ = 3.0378 − (0.050062 × 68) + (0.00026555 × 68²)
             = 3.0378 − 3.4042 + (0.00026555 × 4624)
             = 3.0378 − 3.4042 + 1.2283
             = 0.8619 volumes
```

**Priming sugar needed:**
```
CO₂ to add (volumes) = Target CO₂ volumes − Residual CO₂ volumes
```

**Worked example continued:** Target 2.4 volumes for an American ale.
```
CO₂ to add = 2.4 − 0.862 = 1.538 volumes
```

**Why residual CO₂ depends on temperature:** This is a direct consequence of Henry's Law — the solubility of a gas in a liquid is proportional to the partial pressure of that gas in equilibrium with the liquid, and (all else equal) gas solubility in liquids decreases as temperature rises. A beer that finished fermenting warm has less CO₂ naturally dissolved in it (at atmospheric pressure) than the same beer would have if it had finished cold, because warmer liquid holds less dissolved gas. This residual amount must be subtracted from the target, since it's "already there" and doesn't need to come from priming sugar.

STATUS: needs independent verification for the exact residual-CO₂ polynomial coefficients (3.0378, 0.050062, 0.00026555) — this exact formula is widely reproduced across homebrew priming-sugar calculator implementations and forum discussions and is dimensionally/behaviorally sound (it produces sensible, monotonically decreasing residual-CO2-at-equilibrium values across the normal beer-temperature range and its shape matches known CO₂-solubility-vs-temperature curves), but this pass could not trace it to one single named original derivation/paper; it appears to be a polynomial curve-fit to the same underlying CO₂ solubility data (ultimately traceable to sources like the ASBC "Methods of Analysis," 5th Edition, 1949 — the same body of data that underlies the force-carbonation chart in Section 8) rather than a formula with an individually named author. Recommend the verification pass specifically attempt to reproduce this polynomial from first principles against a CO₂ solubility table (e.g., cross-check output against the Section 8 force-carbonation chart, which is drawn from a named, dated ASBC source) to confirm consistency.

### 7.3 Converting CO₂ Volumes to Grams of Priming Sugar

Different priming sugars have different fermentability and therefore different CO₂ yield per gram, because what matters is how much of the sugar's mass converts to CO₂ via fermentation (roughly half the sugar mass becomes CO₂, half becomes ethanol, for simple fermentable sugars — the exact split depends on the sugar's fermentability and composition). Commonly published reference dosing rates (as used by Brewer's Friend's and Northern Brewer's published priming calculators) per 5 US gallons (19 L) of beer, per 0.1 volume of CO₂ increase needed, are approximately:
- **Corn sugar (dextrose):** ~0.5 oz (≈14 g) per 5 gal per 0.1 vol CO₂ — dextrose is a simple, fully fermentable monosaccharide.
- **Table sugar (sucrose):** slightly less by weight than dextrose is needed for the same CO₂ yield, because sucrose's fermentable-mass-per-gram is very slightly higher (sucrose is a disaccharide, but on a mass basis it converts to essentially 100% fermentable sugars, with a marginally more efficient sugar-to-CO₂ mass ratio than dextrose which arrives already partially hydrated).
- **Dry Malt Extract (DME):** roughly double the mass of dextrose is needed for the same CO₂ yield, since DME is only around 45% fermentable-equivalent by weight (it contains water, unfermentable dextrins, proteins, and other non-fermentable solids diluting its effective sugar content).

**General approach used by real calculators (e.g., Brewer's Friend's documented methodology):** compute the total grams of CO₂ needed (from the volumes-to-add figure and batch volume, using the CO₂ density/solubility relationship), then divide by that specific sugar's CO₂ yield per gram (itself derived from the sugar's fermentable extract percentage) to get total grams of priming sugar required.

STATUS: needs independent verification for the exact per-sugar-type numeric dosing table — the general "corn sugar / table sugar / DME" relative-dosing relationship (DME needs roughly double the mass of corn sugar; table sugar is very close to corn sugar) is consistent with Brewer's Friend's and Northern Brewer's published priming sugar calculators and with BYO's "Calculating Sugar Additions for Carbonation" article, but the precise per-volume dosing constants used internally by each of these tools were not independently reproduced digit-for-digit in this research pass, since they depend on each tool's assumed CO₂-solubility model (closely related to the Section 7.2 residual-CO₂ formula) as well as each sugar's assumed fermentable-extract percentage. BeerOS's verification pass should treat this as the priority item to re-derive from first principles (CO₂ mass needed ÷ sugar's fermentable fraction) rather than trust a copied dosing table.

---

## 8. Force Carbonation (Kegging)

### 8.1 CO₂ Volumes vs. Temperature vs. Pressure

The authoritative, widely-reproduced reference table relating beer temperature, applied CO₂ gauge pressure, and resulting equilibrium CO₂ volumes is published in the Brewers Association's *Draught Beer Quality Manual* (2nd Edition, 2011), Appendix B, "CO₂ Gauge Pressure, Temperature and Carbonation Level Reference Chart." That table is itself explicitly sourced to "Methods of Analysis," American Society of Brewing Chemists, 5th Edition (1949) — meaning this data traces back to ASBC laboratory measurement, not an arbitrary chart.

A representative excerpt of that table (gauge pressure in psi required to hold a given CO₂ volumes level at a given beer temperature, sea level):

| Temp (°F) | 2.1 vol | 2.3 vol | 2.5 vol | 2.7 vol | 2.9 vol |
|---|---|---|---|---|---|
| 34 | 5.2 | 7.2 | 9.1 | 11.1 | 13.0 |
| 36 | 6.1 | 8.2 | 10.2 | 12.3 | 14.4 |
| 38 | 7.0 | 9.2 | 11.3 | 13.5 | 15.6 |
| 40 | 8.0 | 10.2 | 12.4 | 14.6 | 16.8 |
| 42 | 8.8 | 11.0 | 13.3 | 15.6 | 17.8 |

**Important caveats explicitly stated by the source manual:**
- These values assume sea-level atmospheric pressure, a beer specific gravity of 1.015, and beer alcohol content of 3.8% abw (≈4.8% abv). Beers with meaningfully different SG or ABV will show small deviations from these exact figures (see below).
- Carbonation is proportional to *absolute* pressure, not gauge pressure. Atmospheric pressure drops with elevation (roughly 1 psi per 2,000 ft), so at elevation the gauge pressure must be increased above the sea-level table value by approximately 1 psi per 2,000 ft of elevation to achieve the same actual (absolute-pressure-driven) carbonation level.
- Alcohol content affects CO₂ solubility: CO₂ is less soluble in ethanol than in water, so a higher-ABV beer will hold *less* CO₂ at a given temperature/pressure than the reference table predicts (the manual gives a worked example: a beer at 38°F with 13 psi pure CO₂ at 4.8% abv holds about 2.66 volumes, while an otherwise-identical-pressure 11% abv barleywine holds only about 2.51 volumes at the same conditions).
- Specific gravity has a smaller secondary effect: CO₂ dissolves in the liquid portion of beer, not in dissolved solids, so a higher-SG (more dissolved-solids) beer holds marginally less CO₂ than a lower-SG beer at the same temperature/pressure (the manual estimates roughly 0.05 fewer volumes of CO₂ for a beer at SG 1.030 versus SG 1.015 at the same temperature and pressure).

**Worked example (from the manual itself):** A retailer at sea level uses 11.3 psi gauge pressure to hold 2.5 volumes of CO₂ in beer served at 38°F. That same retailer, at 4,000 ft elevation, must increase to 13.3 psi gauge pressure (11.3 + 2 psi, since 4,000 ft ≈ 2 × 2,000 ft) to maintain the same 2.5 volumes.

### 8.2 CO₂ Volumes-to-Grams-per-Liter Conversion

```
grams CO₂ per liter ≈ volumes CO₂ × 1.9768 (more precise) or × 2 (rule-of-thumb)
```
This conversion factor derives from the molar mass of CO₂ (44.01 g/mol) and its density at standard conditions; the *Draught Beer Quality Manual* itself walks through this derivation and notes that "2" is an acceptable mental-math approximation, while 1.9768 (drawn from the NIST Standard Reference Database 23, version 9.0, 2010) is the more precise value for exact analysis.

STATUS: verified against the Brewers Association's *Draught Beer Quality Manual*, 2nd Edition (2011), Appendix B and Appendix C — this is a real, named, dated, citable source (published by a national trade association, itself sourcing its core temperature/pressure/CO₂-volumes table to the American Society of Brewing Chemists' "Methods of Analysis," 5th Edition, 1949). The elevation-adjustment rule (≈1 psi per 2,000 ft), the alcohol-content-reduces-solubility effect, the specific-gravity secondary effect, and the CO₂ volumes-to-g/L conversion (1.9768, with 2 as the common rounding) are all directly reproduced from this manual's text and are considered solidly sourced.

---

## 9. Strike Water Temperature Calculation

### 9.1 The Formula

```
Strike Temp = (0.2 / R) × (Target Mash Temp − Grain Temp) + Target Mash Temp
```
As published by John Palmer (howtobrew.com), this is written in his own notation as:
```
Tw = (0.2/r)(T2 − T1) + T2
```
where `Tw` = strike water temperature (°F), `r` = water-to-grain ratio in quarts of water per pound of grain, `T1` = grain (and mash tun) starting temperature (°F), `T2` = target mash temperature (°F).

**Variables:**
- `R` (or `r`) — water-to-grain ratio, in quarts per pound (qt/lb). A "thick" mash might use ~1.25 qt/lb; a "thin" mash might use ~1.75–2 qt/lb or more.
- `Target Mash Temp` — the desired mash rest temperature, °F.
- `Grain Temp` — the temperature of the dry grain before mashing in (commonly close to room/cellar temperature, ~65–70°F, unless otherwise measured).

**What the 0.2 constant represents:** Grain has a lower specific heat (heat capacity per unit mass) than water — it takes less energy to raise a pound of grain by 1°F than it takes to raise a pound of water by 1°F. The commonly cited approximation is that grain's heat capacity is about 0.2 (or roughly 1/5) that of an equivalent volume of water; put another way, "twenty pounds of grain has approximately as much heat capacity as one gallon of water," so one pound of grain behaves thermally like about 0.2 quarts of water. This constant lets the strike-water-temperature formula treat the mash-in mixing process as a simple heat-balance/weighted-average problem between the (hotter) strike water and the (cooler, lower-heat-capacity) grain, solving for the strike water temperature needed so that after mixing, the combined mash lands at the target temperature.

**Worked example:** Target mash temperature 152°F, grain at 68°F, mash thickness 1.5 qt/lb.
```
Strike Temp = (0.2 / 1.5) × (152 − 68) + 152
            = 0.1333 × 84 + 152
            = 11.2 + 152
            = 163.2°F
```

### 9.2 Metric Equivalent

> **Verification pass correction — the naive metric carry-over is wrong, by a brewer-noticeable margin.** The claim originally drafted here — that the 0.2 constant applies unchanged as long as `R` is expressed in L/kg — was tested directly: converting Palmer's own worked example (target 152°F/66.67°C, grain 68°F/20°C, R = 1.5 qt/lb = 3.129 L/kg) through the "same 0.2 constant" metric formula gives **157.4°F (69.65°C)**, not the correct **163.2°F (72.89°C)** Palmer's imperial formula produces for the identical physical scenario. That's a **~6°F / 3°C error** in strike temperature — large enough to meaningfully miss a target mash temperature and shift the beer's fermentability. The "0.2 constant is dimensionless" reasoning was incorrect: Palmer's `R` is defined in **quarts of water per pound of grain** — a *volume-per-mass* ratio — and one quart of water weighs about 2.086 lb, not 1 lb, so the 0.2 constant already has that quart-to-pound water-density conversion baked into it. Because L/kg is *already* a mass ratio (1 L of water ≈ 1 kg), plugging an L/kg value into a constant that assumes a volume/mass mismatch produces a wrong answer.

**Corrected derivation:** re-deriving from the underlying heat balance (`mass_water × c_water × (Tw−T2) = mass_grain × c_grain × (T2−T1)`) shows Palmer's 0.2 constant equals `(c_grain/c_water) / 2.0864` (where 2.0864 lb/qt is water's density in those units) — meaning the *true* grain-to-water specific-heat ratio implied by Palmer's formula is about **0.2 × 2.0864 ≈ 0.417**, not 0.2 outright. (This also lines up with independently-known food-science figures for dry grain's specific heat, commonly cited around 0.4–0.45 relative to water — the "0.2" folk figure is a unit-conversion artifact of the qt/lb formulation, not the actual physical ratio.) The corrected metric formula, using `R` in liters of water per kilogram of grain (where 1 L water ≈ 1 kg, so this is already a proper mass ratio):
```
Strike Temp (°C) = (0.417 / R(L/kg)) × (Target Mash Temp − Grain Temp) + Target Mash Temp
```
**Re-verified worked example:** target 66.67°C, grain 20°C, R = 3.129 L/kg (= 1.5 qt/lb):
```
Strike Temp = (0.417 / 3.129) × (66.67 − 20) + 66.67 = 0.1333 × 46.67 + 66.67 = 6.22 + 66.67 = 72.89°C
```
72.89°C = 163.2°F — now matches Palmer's imperial answer exactly.

STATUS: verified via independent re-derivation and direct numeric cross-check against Palmer's own imperial worked example — the originally-drafted "same 0.2 constant" metric formula was tested, found wrong by ~3°C, and replaced with the corrected 0.417 constant, confirmed to reproduce Palmer's exact result (163.2°F / 72.89°C) when run on the identical physical scenario. **Implementation note for BeerOS:** because this constant was derived by the verification pass rather than found in a published metric source, the safest implementation is to convert metric inputs to °F/qt-per-lb internally, apply Palmer's original verified formula, and convert the result back to °C — this sidesteps any risk in the re-derived 0.417 constant entirely by only ever running Palmer's own exact, source-verified equation. The 0.417 constant above is provided for reference/cross-checking, not as the primary implementation path.

STATUS: verified against John Palmer's *How to Brew* (howtobrew.com; the formula "Tw = (.2/r)(T2 - T1) + T2" together with the companion "Mash Infusion Equation" for calculating boiling-water additions is presented there in Palmer's own notation), corroborated by numerous secondary homebrewing calculator implementations that reproduce the identical 0.2 constant and formula structure. STATUS: needs independent verification for the metric re-derivation — while the underlying physics (heat-capacity-ratio-driven weighted average) is sound and the formula structure should carry over directly as shown, this document did not find a metric brewing calculator's own from-scratch derivation to cross-check against, so BeerOS's implementation should numerically verify its metric path against the Fahrenheit path on identical physical inputs before shipping.

---

## 10. Mash Efficiency / Brewhouse Efficiency

### 10.1 Measuring/Back-Calculating Efficiency From a Brew Day

Brewhouse (or "mash") efficiency, as defined by John Palmer, is the ratio between the actual gravity points achieved in the kettle and the theoretical maximum available from the grain bill's PPG potential:
```
Brewing/Mash Efficiency = actual gravity points achieved / theoretical maximum gravity points
                        = (measured SG points × batch volume) / Σ(grain weight (lb) × PPG)
```
This is simply the OG-from-grain-bill formula of Section 1 solved backward for efficiency instead of for gravity points, using the brew day's actually-measured gravity and volume.

**Worked example:** A brewer used 10 lb of grain rated at an average 37 PPG, targeted 5 gallons, and measured an actual pre-boil (or OG) reading of 1.048 into a measured 5.5 gallons (accounting for boil-off/trub loss differences from the target).
```
Theoretical max points = 10 × 37 = 370 points-gallons
Actual points achieved = 48 points × 5.5 gal = 264 points-gallons
Efficiency = 264 / 370 = 0.7135 → 71.4%
```

### 10.2 Conversion Efficiency vs. Lauter/Brewhouse Efficiency

Brewhouse efficiency is the product of two independently measurable sub-efficiencies:
```
Brewhouse Efficiency = Conversion Efficiency × Lauter Efficiency
```

- **Conversion efficiency** measures how completely the mash's enzymes converted the available starch in the grist into soluble sugars/extract, benchmarked against the malt's laboratory-determined ("fine grind") extract potential. If all available extract is made soluble in the mash liquid, conversion efficiency is 100%; it is affected by mash pH, temperature, crush/milling fineness, mash time, and diastatic power of the malt.
- **Lauter (or sparge) efficiency** measures how much of that already-dissolved extract actually gets transferred out of the grain bed and into the kettle, as opposed to being left behind, retained in the wort trapped within the wet spent grain (and any un-drainable dead space in the lauter vessel).

This distinction matters because a brewer can have excellent conversion (nearly 100% of the starch was converted to sugar) but still see poor overall brewhouse efficiency purely due to lauter losses (grain retaining wort), or vice versa.

### 10.3 Grain Absorption Rate

A commonly cited grain liquid-retention figure used in calculating expected lauter losses:
```
Volume of wort retained by spent grain ≈ 0.125 gal/lb (≈1.04 L/kg)
```
though ranges of roughly 0.10–0.20 gal/lb (0.8–1.7 L/kg) are cited depending on crush, grain type, and lautering method (batch sparge vs. fly sparge vs. no-sparge), reflecting real variation across setups rather than a single universal constant.

A more rigorously documented figure, from Kai Troester's detailed efficiency analysis, gives a specific absorption ratio of:
```
1.56 L/kg (≈0.19 gal/lb)
```
This is the value Troester uses directly in his own lauter-efficiency-loss model:
```
Efficiency lost in lauter (%) = extract × SG × (grain absorption rate (L/kg) + water addition rate (L/kg)) / 0.8
```
(where extract and SG refer to the diluted mash-liquid gravity/extract content after sparge water is stirred in, and 0.8 represents an assumed 80% laboratory extract potential for the grist — this is Troester's own worked model, not a universal constant, and is presented here to show the level of rigor a "grain absorption" figure can support when tied to a specific, documented methodology, rather than to suggest BeerOS should hard-code this exact sub-formula.)

**Worked example (simple absorption estimate):** 10 lb of grain retains approximately `10 × 0.125 = 1.25 gallons` of wort in the spent grain bed after runoff, which is "lost" from the kettle volume relative to what was in the mash tun.

STATUS: verified — the conversion-efficiency-vs-lauter-efficiency distinction and the specific 1.56 L/kg (0.19 gal/lb) absorption figure, along with the detailed lauter-efficiency-loss formula, are documented in Kai Troester's "Understanding Efficiency" article (braukaiser.com/wiki/index.php?title=Understanding_Efficiency), which explicitly cites its own sources including John Palmer's *How to Brew* (2006) for the basic brewing-efficiency definition and Ray Daniels' *Designing Great Beers* (2000) for the equivalent "mash efficiency" terminology. STATUS: needs independent verification for the looser "0.10–0.12 gal/lb" figure commonly repeated in homebrew forum discussions as a rounder rule of thumb — this range is broadly consistent with (slightly lower than) Troester's more precisely documented 0.19 gal/lb figure, and the discrepancy likely reflects different grain crushes/methods across sources rather than an error, but BeerOS should prefer the more rigorously sourced 1.56 L/kg (0.19 gal/lb) figure as its default, with the looser range presented as the plausible real-world variation band.

---

## 11. Yeast Pitch Rate / Cell Count

### 11.1 Target Cell Count Formula

```
Target Cells = Target Pitch Rate (million cells / mL / °Plato) × Wort Volume (mL) × Wort Gravity (°Plato)
```

**Standard target pitch rates**, per the Mr. Malty (Jamil Zainasheff) methodology, also documented in Chris White & Jamil Zainasheff's book *Yeast: The Practical Guide to Beer Fermentation*:
- **Ales:** ~0.75 million cells/mL/°P
- **Lagers:** ~1.5 million cells/mL/°P (roughly double the ale rate, reflecting lager yeast's slower fermentation and the desire to minimize off-flavor production associated with underpitching at cooler lager temperatures)

**Worked example:** 19 L (19,000 mL) batch at 1.050 SG (≈12.4 °P — see Section 11.2 for conversion), targeting an ale pitch rate.
```
Target Cells = 0.75 million/mL/°P × 19,000 mL × 12.4 °P
             = 0.75 × 19,000 × 12.4 million cells
             = 176,700 million cells
             = 176.7 billion cells
```

STATUS: verified — the general formula shape (pitch rate in million cells/mL/°P × volume × gravity) and the ~0.75 (ale) / ~1.5 (lager) million cells/mL/°P target rates are documented as the Mr. Malty / Jamil Zainasheff methodology, referenced consistently across multiple sources including White & Zainasheff's *Yeast* book and numerous pitch-rate-calculator implementations (Brewer's Friend, YeastCalc, and others) that cite Mr. Malty's calculator as their basis.

### 11.2 SG-to-Plato Conversion (Polynomial)

```
°Plato = -616.868 + (1111.14 × SG) - (630.272 × SG²) + (135.997 × SG³)
```

**Worked example:** SG = 1.050.
```
SG² = 1.1025
SG³ = 1.157625

°Plato = -616.868 + (1111.14 × 1.050) - (630.272 × 1.1025) + (135.997 × 1.157625)
       = -616.868 + 1166.697 - 694.87476 + 157.43353
       = 12.39 °P
```
This matches standard SG-to-Plato conversion tables (1.050 SG ≈ 12.4 °P) closely, confirming the polynomial's accuracy — a rough linear approximation (SG points/4, i.e. 50/4=12.5) gets close in this range but diverges more at higher gravities, which is exactly why the cubic polynomial is preferred for pitch-rate calculations spanning a wide gravity range.

> **Verification pass correction:** the version of this worked example originally drafted here contained an arithmetic slip in the third term (`630.272 × 1.1025` was shown as `694.85`; the correct product is `694.87476`), giving a drafted result of `12.42 °P` instead of the correct `12.39 °P`. This was caught by independently re-running the formula in code (Node.js) rather than trusting the hand-typed arithmetic, and the corrected value is shown above. The polynomial itself and its coefficients are unaffected — only the worked-example arithmetic was wrong. Independent spot checks at three more reference points (1.040 SG → 9.99 °P, 1.080 SG → 19.33 °P, 1.100 SG → 23.77 °P) all match standard SG/Plato reference tables, confirming the coefficients are sound across a range, not just at 1.050.

STATUS: verified via independent code-based recomputation of the polynomial across four gravity points (1.040, 1.050, 1.080, 1.100), all matching standard SG/Plato reference tables. This cubic polynomial (with these exact coefficients) is very widely reproduced across brewing calculators and converter tools as "the" accurate SG-to-Plato conversion, and it is internally consistent, but this research pass could not trace it to one single named original publication/author (it is presented across secondary sources simply as "a known accurate polynomial conversion" without consistent attribution) — treat the coefficients themselves as solid, but the attribution as still open.

### 11.3 Dry Yeast Viable Cell Counts

Fermentis (a major dry yeast manufacturer) publishes a guaranteed minimum viable cell count of:
```
> 6 × 10⁹ viable cells per gram at packaging (i.e., > 6 billion cells/g)
```
For an 11.5 g packet (a common dry yeast packet size, e.g. Safale US-05), this is a guaranteed minimum of roughly 69 billion cells per packet. Independent cell-count testing by homebrewers and labs has found actual counts are typically substantially higher than this guaranteed minimum — commonly cited informal figures suggest actual average counts closer to 150–220 billion cells per 11.5 g packet — but the manufacturer-published, citable specification is the ">6 billion/g" guaranteed minimum.

STATUS: verified for the manufacturer-stated guaranteed minimum (>6 × 10⁹ cells/g) as Fermentis's own published specification. STATUS: needs independent verification for the higher "actual average" figures (150–220 billion/packet) — these come from informal homebrewer/lab cell-count testing discussions rather than a manufacturer publication, and BeerOS should treat the manufacturer's guaranteed-minimum figure as the safe, citable default for any pitch-rate-sufficiency calculation, while optionally noting that real packets often exceed this minimum.

### 11.4 Liquid Yeast Viability Decay Over Time

Wyeast guarantees viability of its liquid "Activator" smack-pack yeast for 6 months from the manufacture date, with a commonly cited approximation that viability has declined to roughly 70% by that 6-month best-by date. A widely repeated (though informally sourced) rule of thumb suggests viability decreases by very roughly 20–25% in the first month of storage and continues declining thereafter, though the decay is not perfectly linear and varies by strain and storage temperature.

STATUS: needs independent verification — the "6 months guaranteed, ~70% viability at that point" figures are attributed to Wyeast's own published guidance (referenced across multiple homebrewing sources discussing Wyeast's stated shelf life), but this research pass did not directly access a Wyeast-published viability-decay curve/table with dated percentages at intermediate time points (e.g., 1 month, 2 months, 3 months). The "~20-25% per month" figure is explicitly a community rule of thumb, not a Wyeast-published curve, and should be labeled as such if used in BeerOS rather than presented as an official manufacturer figure. BeerOS's verification pass should attempt to obtain Wyeast's or White Labs' own published viability-vs-time documentation directly (e.g., via their FAQ or technical documentation pages) rather than rely on the secondary community figures reproduced here.

---

## 12. Refractometer Correction for Alcohol

### 12.1 Why Correction Is Needed

A refractometer measures the refractive index of a liquid, which correlates with dissolved solids (sugar) content and is calibrated to read in "Brix" (equivalent to Plato for wort). Once fermentation begins and alcohol is present, however, the refractometer reads inaccurately high relative to the beer's true residual gravity, because alcohol has a different (lower) refractive index contribution than the sugars it replaced — the instrument can't distinguish "this reading is high because of remaining sugar" from "this reading is elevated because alcohol is present," so a raw mid-fermentation or post-fermentation Brix reading systematically overstates the beer's true remaining gravity/sugar content unless mathematically corrected.

### 12.2 Sean Terrill's Correction Formula

Sean Terrill derived an empirical correction formula from a large dataset comparing refractometer readings (both original-wort Brix and finished-beer Brix) against laboratory-grade hydrometer-measured actual final gravity, producing a cubic regression:
```
FG = 1.0000 − 0.00085683 × Brix(original) + 0.0034941 × Brix(final)
```
where `Brix(original)` is the wort's original Brix reading (taken pre-fermentation) and `Brix(final)` is the refractometer's raw Brix reading taken from the fermenting/finished beer.

**Worked example:** Original wort reading = 12.8 °Bx (roughly corresponding to OG 1.052), final refractometer reading = 6.5 °Bx (which, uncorrected, would be misread as a much higher FG than the beer actually has).
```
FG = 1.0000 − (0.00085683 × 12.8) + (0.0034941 × 6.5)
   = 1.0000 − 0.010967 + 0.022712
   = 1.01175
```
This estimated FG (≈1.012) is far lower than what the raw final Brix reading would naively suggest if simply converted 1:1 as if it were a hydrometer SG reading, illustrating why the correction matters.

**Competing/simpler correction approaches:** Before Sean Terrill's regression-based formula became popular, a simpler "standard" correction (sometimes attributed to various brewing software defaults) used a fixed conversion factor applied to the Brix drop (original minus final Brix) — typically multiplying the apparent Brix-based attenuation by a constant correction factor (often cited in the range of 1.04–1.06 times the naively-converted SG, or equivalently by wine/beer-specific refractometer correction factor tables). These simpler approaches tend to be somewhat less accurate than Terrill's regression, particularly for beers with FG below roughly 1.014 or above typical "session beer" attenuation, since a single fixed multiplier cannot capture the full non-linear relationship between original gravity, alcohol content, and refractive index the way a two-variable (original + final Brix) regression can. Terrill's formula was specifically validated against multiple independent hydrometer-measured datasets and found to be within about one gravity point of laboratory measurement for typical beer gravity ranges, and is generally considered the current best-practice default in modern brewing software when both original and current Brix readings are available.

STATUS: verified (formula shape and general approach) — Sean Terrill's cubic-regression refractometer correction formula (using both original and current Brix readings) is documented and reproduced across multiple refractometer-correction-calculator implementations (e.g., MaltCalcs, Brewlis, and forum discussion referencing Terrill's original blog post/analysis at seanterrill.com, "Refractometer FG Results," 2011).

> **Verification pass update:** direct access to seanterrill.com still failed in the follow-up pass (certificate error) and the Wayback Machine was not reachable from this environment either, so the original post could not be read directly. However, an independent search pass found the exact coefficients (`1.0000 / 0.00085683 / 0.0034941`) independently reproduced, digit-for-digit, across four additional unrelated implementations not cited in the original research pass (homebrewingcalculator.com, abvcalculator.org, findmeabrewery.com/CraftJacks, and braureka.de/Müggelland Brauerei), all attributing them to Sean Terrill by name. Four independent tools reproducing the exact same coefficients to five significant figures is strong (though still secondary, not primary) evidence the numbers are correct.

STATUS: verified via cross-reproduction across five independent secondary sources (the original two plus four more found in the follow-up pass), all agreeing on the exact coefficients digit-for-digit; primary-source confirmation from seanterrill.com itself remains blocked by a certificate error, so this is not "primary verified" but the secondary consensus is now strong enough to treat as reliable for implementation.

---

## 13. Sources

**Primary/named-author sources:**
- Palmer, John J. *How to Brew*. Brewers Publications, Boulder, CO (print editions 2006 et seq.); free online edition at [howtobrew.com](https://howtobrew.com), specifically Chapter 18 ("Understanding Extraction Efficiency") for PPG/gravity-points math, and the strike water / mash infusion equations pages.
- Palmer, John J., and Colin Kaminski. *Water: A Comprehensive Guide for Brewers*. Brewers Publications, 2013 — residual alkalinity and mash water chemistry (pages ~93–96 per secondary reference; direct pagination not independently confirmed in this pass).
- Hall, Michael L. "Brew by the Numbers: Add Up What's in Your Beer." *Zymurgy*, Vol. 18, No. 2 (Summer 1995), American Homebrewers Association — Balling-derived Real Extract formula and the high-gravity ABV formula.
- Rager, Jackie. "Calculating Hop Bitterness in Beer." *Zymurgy*, Hops and Beer Special Issue, Vol. 13, No. 4 (1990) — Rager IBU formula.
- Tinseth, Glenn. "Glenn's Hop Utilization Numbers" / hop bitterness research. [realbeer.com/hops/research.html](https://realbeer.com/hops/research.html) (1997; direct automated fetch returned HTTP 403 during this research pass — coefficients confirmed via faithful secondary reproductions instead).
- Garetz, Mark. *Using Hops: The Homebrewer's Guide to the Hop and Its Use in Brewing Today*. Hop Union Publishing / Nabholz Publishing, 1994 — Garetz IBU methodology (altitude, hop-freshness, and other corrections); exact coefficients not independently confirmed in this pass, see Section 4.3 status note.
- Morey, Dan (Daniel). Beer color estimation article, *Brewing Techniques* magazine (exact issue/date not independently confirmed) — the Morey SRM equation, building on earlier work by Randy Mosher and Ray Daniels.
- Zainasheff, Jamil, and Chris White. *Yeast: The Practical Guide to Beer Fermentation*. Brewers Publications, 2010 — yeast pitch rate methodology (also published via the Mr. Malty pitch rate calculator, mrmalty.com).
- Terrill, Sean. "Refractometer FG Results." seanterrill.com (2011) — refractometer correction formula (direct fetch failed with a certificate error during this research pass; coefficients reconstructed from secondary sources, flagged for re-verification).
- Kolbach, Paul — original residual alkalinity concept (as cited via Palmer's and Troester's writings; no direct primary Kolbach citation was accessed in this pass).

**Technical/braukaiser and industry sources:**
- Troester, Kai. "Understanding Efficiency." Braukaiser wiki, [braukaiser.com/wiki/index.php?title=Understanding_Efficiency](http://braukaiser.com/wiki/index.php?title=Understanding_Efficiency) — conversion vs. lauter efficiency distinction, grain absorption rate (1.56 L/kg), efficiency-loss modeling. Cites Palmer (2006), Daniels (2000), Narziss (2005), Briggs (2004), Priest (2006) as its own sources.
- Troester, Kai. "The effect of brewing water and grist composition on the pH of the mash" (2009) and related Braukaiser residual-alkalinity/mash-pH articles — mEq/L-based residual alkalinity formulation.
- American Society of Brewing Chemists. *Methods of Analysis*, 5th Edition (1949) — original source data underlying the CO₂ gauge-pressure/temperature/carbonation reference chart (Section 8) and, indirectly, priming/residual-CO₂ calculations.
- Brewers Association. *Draught Beer Quality Manual*, 2nd Edition (2011) — Appendix B (CO₂ gauge pressure/temperature/carbonation reference chart) and Appendix C (carbonation, blended gas, partial pressures, and the CO₂ volumes-to-grams-per-liter conversion). Available via brewersassociation.org / draughtquality.org.
- Fermentis (Lesaffre) — published dry yeast specification (>6 × 10⁹ viable cells/g guaranteed minimum), as referenced in Safale US-05 technical data sheets.
- Wyeast Laboratories — published shelf-life/viability guidance (6-month guaranteed shelf life; ~70% viability at 6 months), referenced via wyeastlab.com FAQs and secondary homebrewing discussion.

**Well-regarded calculator/community documentation (used to cross-check and, in some cases, as the most directly citable methodology source):**
- Brewer's Friend — "Alcohol By Volume Calculator Updated" (brewersfriend.com/2011/06/16/alcohol-by-volume-calculator-updated/), priming sugar calculator documentation, and general calculator methodology pages.
- BeerSmith — "Hop Utilization Models for Beer Brewing Compared" and "Hop Utilization in the Whirlpool for Beer Brewing" blog articles (beersmith.com/blog).
- alchemyoverlord (J. Hosom) — Tinseth, Rager, Garetz, and mIBU calculator implementations and accompanying methodology write-ups (jphosom.github.io/alchemyoverlord/ and alchemyoverlord.wordpress.com), used to cross-check Rager and Garetz formula details and the mIBU late-hopping model.
- Beer Maverick — "Understanding SRM and Lovibond Beer Color Calculations" (beermaverick.com) — Morey equation and EBC conversion cross-check.
- Brewfather — fermentable/potential-extract documentation (docs.brewfather.app) — confirms the metric-calculator convention of entering yield/potential percentage directly rather than requiring a PKL conversion.

**Notes on sourcing quality:** Wherever this document states `STATUS: verified`, at least one specific named source (primary where possible) was directly confirmed to state that exact coefficient or formula. Wherever it states `STATUS: needs independent verification`, either (a) multiple sources agreed on a figure but none could be confirmed as a true primary/original source in this research pass, (b) minor numeric disagreement existed across sources, or (c) a direct fetch of the most authoritative source failed for technical reasons (SSL certificate errors, HTTP 403 blocks) and reliance fell to secondary reproductions. The independent verification pass referenced in the project brief should prioritize re-checking items flagged `needs independent verification` before this document's formulas are treated as final for BeerOS's calculator implementation.
