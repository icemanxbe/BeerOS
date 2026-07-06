# Brouwland Deep Dive

A brand-specific companion to [`equipment-overview.md`](./equipment-overview.md), mapping the generic equipment categories described there to real, current products sold by **Brouwland**, a major Belgian home-brewing, winemaking, and craft-supply retailer. This document is aimed at Benelux/European home brewers using BeerOS who want to know what's actually available through a well-known regional supplier, and how those products map onto the generic RIMS/HERMS/all-in-one/fermentation categories.

> **Verification note:** Brouwland's site (brouwland.com) blocks direct automated page fetches (HTTP 403 to non-browser requests), so the specifics below were gathered via targeted web searches that surfaced Brouwland's own product-page text, plus one manufacturer press release (Ss Brewtech) confirming the distribution partnership. Every claim below is either sourced to a specific URL in the [Sources](#sources) section or explicitly flagged as unverified/approximate. Prices mentioned are illustrative examples pulled from search snippets at the time of research (mid-2026) and **will drift** — always check the live product page for current pricing.

---

## 1. Company overview

Brouwland was founded in Belgium in **1972**, originally as a pharmacy/drugstore operation, and grew over subsequent decades into what it now describes as Europe's largest specialist wholesaler for home and craft production of beer, wine, cider, mead, dairy (cheese-making), and spirits. It remains a family-run business today while also operating as a clear market leader in its category, with a large and constantly expanding catalog (search results reference "5,000+ products" / SKUs) and several own-developed brands (see below).

Key facts (sourced to Brouwland's own "About Us" page and search-snippet summaries of it):

- **Location/logistics:** ships from a roughly 5,000 m² warehouse in **Beverlo, Belgium**, to 50+ countries — relevant to BeerOS users in Belgium/Netherlands/broader EU since it means short intra-EU shipping times and no customs friction for buyers inside the EU, versus ordering from UK or US retailers post-Brexit/for non-EU import duties.
- **Customer base:** primarily home/hobby brewers, winemakers, and distillers, but Brouwland also supplies **commercial/craft breweries and distilleries** to some degree — it distributes professional equipment lines (e.g., Ss Brewtech's professional brewhouses, see §2.3) and sells "professional brew kettles" as a distinct catalog segment, so the line between hobbyist and small-commercial supply is blurrier here than at a purely hobbyist-focused US retailer.
- **Own brands:** **Brewferm** (ingredient kits, malt kits, yeast, and equipment accessories — Brewferm-branded beer kits have reportedly been sold since 1984), **Vinoferm** (winemaking equivalent), **Brew Monk** (Brouwland's own all-in-one electric brewing system line, see §2.1), and **Chemipro** (cleaning/sanitizing chemical line, see §7). Having in-house brands across equipment, ingredients, and chemicals is a notable structural difference from a retailer that only resells third-party brands.
- **Regional catalog emphasis:** given the company's Belgian roots, its catalog visibly emphasizes Belgian and Benelux brewing traditions — Belgian-style yeast strains (saison/farmhouse, witbier, Belgian ale strains from multiple yeast labs), Belgian-style ingredient kits (Brewferm "Belgian Saison," "Belgian Wit," "Belgian Brown," "Special Belge" kits), and swing-top ("beugel") bottle formats that are culturally native to Belgium/Netherlands rather than an import curiosity (see §5).

---

## 2. All-in-one / electric brewing systems

### 2.1 Brew Monk — Brouwland's own all-in-one line

**Brew Monk** is Brouwland's in-house-branded electric all-in-one brewing system — a single-vessel unit that (per the generic category description in `equipment-overview.md` §3) collapses mash tun + HLT + boil kettle + recirculation into one footprint. It is a real, current, actively-sold product line (not a legacy/discontinued item) with multiple size variants and a "Wi-Fi" generation:

| Model | Kettle capacity | Malt pipe capacity | Notes |
|---|---|---|---|
| Brew Monk B40 Wi-Fi | 40 L | up to ~8 kg malt | Entry size of the current Wi-Fi generation |
| Brew Monk B50 Wi-Fi | 50 L | up to ~12 kg malt | Mid size |
| Brew Monk B70 Wi-Fi | 70 L | not confirmed | Largest of the three current Wi-Fi models found |
| Brew Monk Magnus | ~50 L class (compatible with the B50 circulation pipe) | not confirmed | Appears to be a related/earlier or parallel model line to the B-series; exact relationship to B50 not fully confirmed from available sources |

Confirmed general specs (from Brouwland product-page search snippets):

- **Heating element power: 2,500 W**, described by Brouwland as roughly 25% higher output than many competing all-in-one systems, meant to bring a filtered wort to boil faster.
- **Malt pipe:** a stainless steel basket/pipe insert with adjustable stainless screens and a removable lifting handle — this is the "malt pipe" all-in-one design pattern (grain sits in an internal perforated basket rather than a separate mash tun).
- **Integrated magnetic-drive pump** that can also be run independently of a brew program (e.g., for manual recirculation or transfers).
- **Programmable digital controller**: supports up to 9 brewing steps and up to 9 hop additions per program.
- **Wi-Fi connectivity** on the current generation, linking to Brouwland's own online brewing platform (**mybrewmonk.eu**), which stores recipes ("My Recipes" — create or import recipes, upload them to the kettle over Wi-Fi to run later even without a live connection) and brew logs ("My Brews" — session history and notes), plus receives firmware updates over Wi-Fi. The unit can also be operated fully offline via its on-unit display without ever touching the platform.
- **Warranty:** referenced in search results as a 3-year warranty.
- Brouwland also sells **"Mega Deal" and "Duo/Combo Deal" bundles** pairing a Brew Monk kettle with a matching conical fermenter (e.g., "C40," "C60," "C80" — sized to roughly match the kettle's batch size), a counterflow chiller, a sparge water heater, and/or a malt kit — i.e., a packaged path from kettle to fermenter rather than a bare kettle.
- There is also a **Brew Monk-branded wireless (Wi-Fi) hydrometer** accessory, extending the platform to unattended gravity/fermentation tracking — directly relevant to what BeerOS's data model would want to ingest if a user owns this ecosystem.

**Comparison to the generic categories in `equipment-overview.md`:** Brew Monk is a textbook example of the "All-in-one electric brewing systems" category described in §3 of the overview — malt-pipe-in-kettle design, internal recirculation pump, integrated controller. It is **not** a RIMS or HERMS system in the strict sense (there's no separate HLT feeding a heat-exchange coil, and no inline-heated recirculation tube outside the kettle) — like most all-in-one units, it approximates HERMS-like temperature stability by recirculating wort through/around the same vessel that's being directly heated, with the controller cycling the element rather than exposing a separate exchange path. The direct-immersion-style heating element inside the same vessel the grain sits in does carry the same generic scorching-risk profile noted for direct immersion elements in the overview (§3), though the malt pipe's job is partly to keep grain off the element/base.

### 2.3 Professional / semi-professional electric brewhouses (Ss Brewtech partnership)

Brouwland is the confirmed **European distributor for Ss Brewtech**, a US brewing equipment manufacturer (a Middleby Corporation brand), per Ss Brewtech's own press release. Through this partnership Brouwland carries:

- **Ss Brewtech Chronical 2.0** cylindro-conical fermenters (confirmed sizes found: 27 L / 7 gal and 64 L / 17 gal), marketed as an advanced homebrew conical fermenter line — see §3.2.
- **Ss Brewtech SVBS (Single Vessel Brewing System)**, a 45 L electric all-in-one unit — another entrant in the same all-in-one category as Brew Monk, giving Brouwland customers a second brand choice at a similar functional tier.
- **Ss Brewtech electric malt mill** (see §6).
- Ss Brewtech's professional/"Pro" brewhouse and tank lines, extending Brouwland's catalog into small-commercial/nano-brewery equipment, consistent with the company's stated reach into commercial craft-brewing supply.

This partnership matters for a European buyer: it means Ss Brewtech's popular US conical fermenter line is available with EU-based stock/support/warranty handling through Brouwland rather than requiring import from the US.

---

## 3. Fermentation equipment

### 3.1 Speidel fermenters (confirmed carried)

Brouwland does carry **Speidel** fermenters — confirmed via multiple direct Brouwland product-page listings in search results (not just Speidel's own site or third-party US retailers). Speidel is a well-known German manufacturer of both plastic and stainless conical fermentation vessels widely used across European homebrewing and small commercial operations.

**Plastic fermenters (confirmed Brouwland catalog, "Speidel round/rectangular plastic fermenter"):**

| Shape | Sizes seen in Brouwland catalog |
|---|---|
| Round | 20 L, 30 L, 60 L, 120 L |
| Rectangular | 60 L, 100 L, 200 L, 300 L, 500 L |

- Material: described by Brouwland as food-safe, **undyed PE (polyethylene) plastic**, with particularly thick walls (cited as a stability and aroma-preservation feature) and smooth interior walls for cleaning. These are conventional open-top or bucket/tank-style fermenters — not conical/pressure-rated — fitted with an outlet tap (Brouwland notes an "NW10" tap fitting included).
- Illustrative pricing from search snippets (approximate, will drift): round 20 L ≈ €39.99, round 30 L ≈ €49.99, round 60 L ≈ €79.99.
- These map to the generic "plastic buckets"/large-format plastic fermentation vessel category in the overview, just scaled up to sizes (100–500 L) well beyond typical 19–23 L home-batch fermenters — relevant for Benelux users doing larger batches or semi-commercial volumes.

**Stainless conical Speidel fermenters:** Speidel's own stainless conical line (marketed under the "Braumeister"/fermentation-tank branding on Speidel's own site) is **pressure-capable** — third-party listings describe Speidel stainless conicals rated to roughly **1.2 bar (~17.4 psi)**, usable as bright tanks or unitanks, with Tri-Clamp (TC) fittings and conical "pocketed" bottoms for full drainage. **This specific pressure rating and TC-fitting detail comes from Speidel/third-party (MoreBeer) listings, not a directly confirmed Brouwland product page** — treat the exact spec as approximate/unverified for Brouwland's specific SKUs until checked on brouwland.com directly, though Brouwland's general Speidel fermentation-vessel catalog page (`/en/1239-fermentation-vessels?q=Brand-Speidel`) confirms Speidel is a stocked brand in that category.

### 3.2 Ss Brewtech conical fermenters (confirmed carried)

As noted in §2.3, Brouwland stocks the **Ss Brewtech Chronical 2.0** stainless conical fermenter line (confirmed sizes: 27 L/7 gal, 64 L/17 gal), sold under Ss Brewtech's own brand rather than Speidel's — giving Benelux buyers a second stainless-conical option alongside Speidel, both distributed through the same retailer.

### 3.3 How this maps to the generic categories

Both the Speidel plastic line and the Ss Brewtech/Speidel stainless conical lines map directly onto the "Fermentation vessels" taxonomy in `equipment-overview.md` §5: Speidel plastic = the large-format version of the plastic bucket/tank category (non-pressure-rated, general-purpose); Ss Brewtech Chronical and Speidel stainless conicals = the "stainless conical fermenters" and "pressure-capable fermenters" categories, complete with racking-arm/dump-valve style conical geometry and (for the pressure-rated stainless units) support for pressure fermentation and spunding as described generically in that section.

---

## 4. Kegging and bottling equipment

### 4.1 Keg formats

Brouwland's catalog is organized around a distinct **"Kegs"** category and a separate **"Beer dispensing systems"** category. Confirmed keg-related offerings:

- **Corny / soda kegs (Cornelius kegs):** confirmed as a stocked category — Brouwland's own copy describes these as stainless pressure kegs popular with hobby brewers, with a removable oval lid for filling/cleaning access. A specific confirmed SKU: **"Soda Keg AEB Jolly 23 L"** — an Italian-made (AEB) ball-lock-style soda keg, 23 L capacity, sold directly by Brouwland. This confirms the US-style ball-lock/Corny keg format (as opposed to only pin-lock, which is rarer in Europe) is what's available.
- **"Party keg" / European draft formats:** search results reference **Party Star Deluxe** CO2 dispenser systems sized for **5 L barrels** — this is the small disposable/refillable steel "party keg" format (5 L mini-kegs, sometimes called "partyvaten" in Dutch) that's common in the European market for small-batch home dispensing, distinct from the 19–23 L Corny keg format. Brouwland stocks dispensing hardware specifically sized for this smaller format alongside full-size Corny/soda kegs — meaning a European home brewer via Brouwland genuinely has both the US-style Corny-keg ecosystem AND the smaller party-keg format available, whereas a US retailer would typically only carry the former.

### 4.2 Bottling equipment and European bottle standards

- **Cappers:** confirmed products include a **"Pneumatic table top crown capper"** (rated in one listing for a lifetime of roughly 8,000–10,000 bottles, with a replaceable capping head) and a **"Besserbrauer Crown capper with crown caps"** bundle (includes 100 white crown caps). Both are standard bench/table-mounted crown cappers for standard crown-cap bottles.
- **Swing-top ("beugel") bottles — confirmed sold by Brouwland.** Brouwland's own blog/product copy explicitly discusses "de beugel" (Dutch for the wire bail/swing-top closure, literally "the brace/bracket") as the Grolsch-style flip-top bottle, and confirms Brouwland carries **flip-top bottles**, including a specific listed SKU: **"Flip-top bottle 75 cl, brown, without flip-top, COMBI, box of 12 pcs."** — sold as a "COMBI" bottle, meaning it's designed to accept **either** a flip-top swing closure or a standard crown cap (requiring a separate capper) — giving buyers format flexibility on the same bottle. This confirms the brief's expectation: beugel/swing-top bottles are a mainstream, culturally native format in the Belgian/Dutch home-brewing market and Brouwland stocks them as a first-class bottle option, not a novelty import.
- **European bottle standard note:** the research did not turn up an explicit Brouwland statement comparing EU vs. US crown cap crown diameter/liner standards. It is well known in the broader homebrew community that standard crown caps (26 mm "crown cork" size) are essentially the same international standard used in both the EU and US, so this is not expected to be a major compatibility issue — but this specific claim about cross-region crown-cap interchangeability was **not independently verified against a Brouwland source** and should be treated as general background knowledge rather than something confirmed on brouwland.com.

### 4.3 CO2 / gas systems

Confirmed Brouwland gas-dispensing catalog items:

- **CO2 regulators:** multiple confirmed SKUs, including a basic **"CO2-regulator with 2 manometers"** (adjustable 0–3 bar outlet pressure, 8 mm push-fit tube connection, plus an inlet manometer showing cylinder content), a **Kegland MK5 CO2 regulator** (tool-free nut-wheel cylinder connection, integrated check valve, ball valve, and 8 mm Duotight push-in fitting), and a **"CO2-regulator 3 bar with 2 outputs"** (HIWI brand, dual 3/4" BSP outputs for running two kegs/lines off one regulator).
- **CO2 cylinders:** a confirmed **"CO2 cylinder 2 kg filled"** product, with Brouwland's own policy noted (cylinder exchange/refill service, limited to Brewferm-branded cylinders or cylinders originally purchased from Brouwland) — an important practical/logistics detail for a Belgium-based user (you generally need to have bought your first cylinder from them to use their exchange program).
- **Small-format gas options:** a **"Brewferm Beerstream" pressure regulator adapter for Sodastream cylinders** — letting a home brewer use a widely available Sodastream CO2 cylinder for small-scale dispensing/carbonation rather than a full-size cylinder, notable as a European-market-specific convenience product (Sodastream is a very common household item in the EU).
- **BSP thread note:** the regulator listed above uses **3/4" BSP (British Standard Pipe)** thread fittings rather than the US-standard CGA320 cylinder valve/NPT thread conventions common on North American CO2 hardware — this is a real practical incompatibility point: hardware bought through Brouwland (BSP-threaded) will generally not directly mate with US-sourced CO2 hoses/fittings (NPT-threaded) without an adapter. This detail is inferred from the specific "3/4-inch BSP" wording in the product description rather than a general Brouwland statement about regional standards, but it's a concrete, sourced data point.

---

## 5. Malt mills and mash equipment

### 5.1 Malt mills (grain mills)

Brouwland's "Milling" category carries both own/partner-branded and third-party mills:

| Product | Type | Throughput (as stated by Brouwland) |
|---|---|---|
| Brewferm Grain Grizzly | Manual, cast iron (tin-plated), budget-tier | not specified in sources found |
| Brewferm Grain Gorilla | Manual, adjustable stainless steel rollers | up to ~50 kg/h |
| Brewferm Grain Gorilla Pro | Manual, 3 stainless steel rollers | up to ~100 kg/h |
| MattMill Classic Complete | Manual, hardened rollers, made in Germany | described as "professional," throughput not specified |
| Grainfather Electric Grain Mill | Electric, with mounting board | up to ~100 kg/h |
| Ss Brewtech Electric Malt Mill | Electric, 2 stainless steel rollers, continuous-duty DC motor | up to ~160 kg/h |

This gives Brouwland customers a full spread from an inexpensive cast-iron hand mill up to a continuous-duty electric mill suitable for frequent or larger-batch brewing — notably including Brouwland's own **Brewferm**-branded mill line alongside third-party brands (MattMill, Grainfather, Ss Brewtech).

### 5.2 Mash tuns, HLTs, and larger brewhouse equipment

Direct confirmation here is thinner than for other categories. What was found:

- A promotional/partner document reference (not a live product page) describes Brouwland as offering **complete 3-vessel brewing installations in the 500–3,000 liter range** — a brew kettle, lauter tun, and combined whirlpool/hot-water tank mounted in a compact shared frame — plus compact units combining an integrated kettle with an insulated, double-wall ("bain-marie" style) heated lauter tun. **This describes semi-commercial/nano-brewery scale equipment, not typical 20–50 L home-batch mash tuns/HLTs**, and the source (a hosted PDF, not a live brouwland.com product page) could not be re-verified directly — treat this as indicative of Brouwland's reach into larger-scale brewhouse equipment rather than a confirmed current catalog listing.
- At the homebrew scale, Brouwland's mash/lauter needs for all-in-one users are largely absorbed into the Brew Monk and Ss Brewtech SVBS malt-pipe designs (§2), which eliminate the need for a separate mash tun/HLT entirely — consistent with the broader European homebrew retail trend toward all-in-one systems over separate 3-vessel BIAB/cooler setups documented generically in `equipment-overview.md` §1.4–1.5.
- No specific standalone cooler-conversion mash tun or HLT kettle product pages were confirmed in this research pass; this should be treated as **not verified** rather than assumed absent — Brouwland almost certainly carries basic brew kettles and possibly cooler/mash-tun components given the breadth of its catalog, but specific current SKUs were not surfaced.

---

## 6. Cleaning and sanitizing chemicals

Brouwland's "Cleaning products" category, as documented on Brouwland's own blog post about cleaning/sanitizing, draws a clear macro (cleaning) vs. micro (sanitizing/disinfecting) distinction and stocks specific branded chemical lines:

- **Alkaline cleaners (organic-residue removal, "macro" cleaning step):** **Five Star PBW** (Powdered Brewery Wash) — confirmed stocked in both powder (450 g) and liquid (946 mL) formats — and **Chemipro Wash**, Brouwland's own in-house-branded equivalent alkaline cleaner. This is the direct European-available equivalent/parallel to PBW as known in the US market (same PBW brand is actually sold, plus Brouwland's own Chemipro alternative).
- **Acid sanitizers ("micro"/final sanitizing step):** **Five Star Star San** is confirmed as directly stocked (same globally known brand as used in the US), alongside **Chemipro San**, again Brouwland's own-brand acid sanitizer positioned as an alternative/equivalent to Star San.
- **Chemipro DES:** an ethanol-based (~80% ethanol), no-rinse surface disinfectant/spray, marketed by Brouwland as effective against viruses, bacteria, yeast, and mold, food-safe. This is a Brouwland/Chemipro-specific product without a direct 1:1 US-market name-brand equivalent called out in the sources found (functionally similar in purpose to a Star San-style contact sanitizer, but delivered as a ready spray rather than a diluted soak/rinse).
- **SaniClean (Five Star)** — also confirmed as a stocked 946 mL product, a no-rinse sanitizer alternative to Star San within the same Five Star product family.

**Takeaway for the regional-naming question the brief raised:** Brouwland actually stocks the *same globally known US brand names* (Five Star PBW, Five Star Star San, Five Star SaniClean) directly, rather than exclusively substituting European-only equivalents — but it also maintains its own parallel **Chemipro** house brand (Wash/San/DES) as a same-purpose alternative. A European buyer via Brouwland therefore has a choice between the familiar US brand names and Brouwland's own house brand for the same cleaning/sanitizing jobs.

---

## 7. Ingredients (brief note — see ingredient-specific docs for depth)

This document is scoped to equipment, but Brouwland is also a major **ingredient** supplier for the European home-brewing market — malt, hops, yeast (confirmed stocking multiple yeast labs' Belgian-specialty strains, e.g., Wyeast XL 3724 Belgian Saison, White Labs WLP565 Belgian Saison Ale, plus house-brand Brewferm dry yeast), and complete ingredient/malt kits under the **Brewferm** house brand (confirmed kits include Belgian-style recipes: "Belgian Saison," "Belgian Wit," "Belgian Brown," "Special Belge," as well as hop-forward and other styles). Brewferm kits have reportedly been sold since 1984. For ingredient-specific detail (malt types, hop varieties, yeast strain characteristics), see the ingredient docs elsewhere in this knowledge base rather than duplicating that content here — this section exists only to flag that Brouwland's equipment catalog sits alongside an equally large ingredients catalog from the same supplier, which is convenient for one-stop ordering.

---

## 8. Practical guidance for a European (especially Benelux) home brewer sourcing through Brouwland

- **Metric units throughout.** All capacities, temperatures, and pressures on Brouwland's site are in liters, °C, bar, and kg — unlike US retailers' gallon/°F/psi/lb convention. If you're cross-referencing recipes or equipment specs from US-centric sources (including much of the generic guidance in `equipment-overview.md`, which is written gallon/°F-first with metric conversions), expect to do unit conversion in the other direction when working from a Brouwland spec sheet.
- **EU electrical standards (220–240V) change heating-element math.** Brouwland's all-in-one systems (e.g., Brew Monk's 2,500 W element) are designed around EU household 220–240V single-phase circuits, which deliver meaningfully more power through a standard wall outlet than a US 110-120V circuit can (a 110V/15A US circuit tops out around 1,650–1,800W continuous, which is why US all-in-one systems often need 240V "dryer-outlet" wiring or dual-element designs to hit similar wattage). A European buyer benefits from higher-wattage single-element, single-standard-outlet systems being the norm rather than the exception — faster heat-up and boil times off a standard wall socket than an equivalent-capacity US-market unit would achieve without special wiring. Conversely, a European system's 2,500W+ element specs are not directly portable to a US 110V circuit without a step-up transformer or dedicated 240V circuit, so this is a real consideration for anyone importing Brouwland electric equipment to North America (not a typical BeerOS user scenario, but worth noting for completeness).
- **BSP vs. NPT threading on gas/liquid fittings.** As noted in §4.3, at least some Brouwland CO2 regulator hardware uses BSP threading rather than the NPT threading standard on US-sourced CO2/keg hardware. A Benelux user buying entirely through Brouwland won't notice this (everything is internally consistent), but anyone mixing Brouwland-sourced gas hardware with US-imported kegging parts (or vice versa) should check thread compatibility before assuming a fitting will simply screw together.
- **Party keg / small-format dispensing is a genuinely regional option.** The 5 L "party keg" format and its dedicated dispenser hardware (§4.1) is a Benelux/European home-dispensing pattern without a close US equivalent at retail scale — worth knowing about specifically because a US-focused equipment guide would never mention it, and it may suit a smaller Benelux household's serving needs better than committing to a full 19–23 L Corny keg system.
- **Swing-top ("beugel") bottles are a first-class, not novelty, packaging path.** Given how central this closure style is to Belgian/Dutch commercial beer (Grolsch, many Belgian abbey/farmhouse producers), a Benelux home brewer sourcing through Brouwland can lean on flip-top bottles as a primary bottling format (no capper needed at all, and the "COMBI" bottle style still allows a crown-cap option later) rather than treating crown-cap-and-capper as the only normal path, which is the default assumption in most US-centric brewing guides.
- **Shipping/availability from a Belgium-based warehouse.** For a Belgium-based (or broader Benelux/EU) user, ordering from Brouwland means short intra-EU transit, no import VAT/customs friction, and stock levels/warranty support handled from an EU entity — a meaningfully different experience than ordering all-in-one systems, conical fermenters, or bulk ingredients from a US retailer and dealing with international shipping cost, customs duties, and VAT-at-import.
- **One-stop equipment + ingredients + chemicals ordering.** Because Brouwland sells equipment, ingredients, and cleaning chemicals under one roof (including several own-brands spanning all three), a Benelux brewer can realistically consolidate an entire order — grain mill, fermenter, PBW/Chemipro Wash, yeast, and bottles — into a single shipment, which is less commonly true of equipment-focused US retailers that treat ingredients as an afterthought.

---

## Sources

All URLs below were either directly searched (surfacing Brouwland's own product-page text in search snippets) or, where noted, directly fetched. Direct `WebFetch` requests to brouwland.com pages returned HTTP 403 (bot-blocked) throughout this research session, so **no brouwland.com page was fetched and rendered in full** — all Brouwland-sourced claims above come from search-engine-surfaced snippets of Brouwland's own page text, which is a weaker verification level than a full page fetch and is flagged accordingly throughout this document.

- [About Brouwland | Europe's Largest Homebrew & Craft Brewing Supplier](https://brouwland.com/en/content/4-about-us) — company history, founding year, warehouse location, own-brand names
- [For the Love of Craft | Brewing, Winemaking & More • Brouwland](https://brouwland.com/en/) — homepage / general positioning
- [Brew Monk • Brouwland](https://brouwland.com/en/brew-monk-all-in-one-brewing-system) — Brew Monk product line landing page
- [Brew Monk® B40 Wi-Fi brewing system • Brouwland](https://brouwland.com/en/electric-brew-kettles/20634-brew-monk-b40-wifi-brouwketel.html) — B40 specs
- [Brew Monk® B50 Wi-Fi brewing system • Brouwland](https://brouwland.com/en/electric-brew-kettles/20710-brew-monk-b50-wi-fi-brewing-system.html) — B50 specs
- [Brew Monk® B70 Wi-Fi brewing system • Brouwland](https://brouwland.com/en/electric-brew-kettles/20711-brew-monk-b70-wi-fi-brewing-system.html) — B70 listing
- [Brew Monk Mega Deal: B40 Wi-Fi & fermenter 30 l & Counterflow chiller & Sparge water heater • Brouwland](https://brouwland.com/en/electric-brew-kettles/20714-brew-monk-mega-deal-brew-monk-b40-wi-fi-fermenter-30-l-counterflow-chiller-sparge-water-heater.html) — bundle example
- [Brew Monk Mega Deal: B50 Wi-Fi & C60 Conical Fermenter & Counterflow chiller & Sparge water heater • Brouwland](https://brouwland.com/en/electric-brew-kettles/21064-brew-monk-mega-deal-brew-monk-b40-wi-fi-c60-conical-fermenter-counterflow-chiller-sparge-water-heater.html) — bundle example
- [Brew Monk Mega Deal: B70 Wi-Fi & C80 Conical Fermenter • Brouwland](https://brouwland.com/en/electric-brew-kettles/21065-brew-monk-mega-deal-brew-monk-b70-wi-fi-c80-conical-fermenter-counterflow-chiller-sparge-water-heater.html) — bundle example
- [Brew Monk™ Magnus - All-in-one brewing system (dev subdomain)](https://dev.brouwland.com/en/electric-brew-kettles/11887-brew-monk-magnus-all-in-one-brewing-system.html) — Magnus reference
- [Brew Monk™ B50 reinforced transparent circulation pipe • Brouwland](https://brouwland.com/en/other/20139-brew-monk-magnus-versterkte-transparante-circulatiepijp-met-litergradering-en-rvs-kraan.html) — accessory confirming Magnus/B50 relationship
- [Brew Monk® Wi-Fi Wireless Hydrometer • Brouwland](https://brouwland.com/en/densimeters/21251-brew-monk-wireless-hydrometer.html) — wireless hydrometer accessory
- [Brew Monk • Content page 89](https://brouwland.com/en/content/89-brew-monk) — mybrewmonk.eu platform description
- [Ss Brewtech partners with Brouwland for European distribution](https://www.ssbrewtech.com/blogs/newss/ss-brewtech-partners-with-brouwland-for-european-distribution) — distribution partnership confirmation (Ss Brewtech's own site)
- [Ss Brewtech™ Chronical 2.0 64 l (17 gal) • Brouwland](https://brouwland.com/en/fermentation-vessels/20243-ss-brewtech-tc-chronical-reva-64-l-17-gal.html)
- [Ss Brewtech™ Chronical 2.0 27 l (7 gal) • Brouwland](https://brouwland.com/en/fermentation-vessels/20242-ss-brewtech-tc-chronical-reva-27-l-7-gal.html)
- [Ss Brewtech™ SVBS Single Vessel Brewing System 45 l • Brouwland](https://brouwland.com/en/electric-brew-kettles/20778-ss-brewtech-svbs-single-vessel-brewing-system-45-l.html)
- [Ss Brewtech • Brouwland (brand page)](https://brouwland.com/en/brand/195-ss-brewtech)
- [Beer - Professional brew kettles • Brouwland](https://brouwland.com/en/1091-professional-brew-kettles?q=Segment-beer)
- [Speidel round plastic fermenter - 30 l • Brouwland](https://brouwland.com/en/fermentation-vessels/10752-speidel-round-plastic-fermenter-30-l.html)
- [Speidel round plastic fermenter - 20 l • Brouwland](https://brouwland.com/en/fermentation-vessels/10751-speidel-round-plastic-fermenter-20-l.html)
- [Speidel round plastic fermenter - 60 l • Brouwland](https://brouwland.com/en/fermentation-vessels/10753-speidel-round-plastic-fermenter-60-l.html)
- [Speidel round plastic fermenter - 120 l • Brouwland](https://brouwland.com/en/fermentation-vessels/10750-speidel-round-plastic-fermenter-120-l.html)
- [Speidel rectangular plastic fermenter - 60 l • Brouwland](https://brouwland.com/en/fermentation-vessels/754-speidel-rectangular-plastic-fermenter-60-l.html)
- [Speidel rectangular plastic fermenter - 100 l • Brouwland](https://brouwland.com/en/fermentation-vessels/10762-speidel-rectangular-plastic-fermenter-100-l.html)
- [Speidel rectangular plastic fermenter - 200 l • Brouwland](https://brouwland.com/en/fermentation-vessels/755-speidel-rectangular-plastic-fermenter-200-l.html)
- [Speidel rectangular plastic fermenter - 300 l • Brouwland](https://brouwland.com/en/fermentation-vessels/10763-speidel-rectangular-plastic-fermenter-300-l.html)
- [Speidel rectangular plastic fermenter - 500 l • Brouwland](https://brouwland.com/en/fermentation-vessels/756-speidel-rectangular-plastic-fermenter-500-l.html)
- [Fermentation vessels • Brouwland (Speidel brand filter)](https://brouwland.com/en/1239-fermentation-vessels?q=Brand-Speidel)
- [Speidel Jacketed Conical Fermenter — MoreBeer (third-party, for pressure-rating cross-check only)](https://www.morebeer.com/products/speidel-stainless-conical-pressure-fermenter-cooling-jacket-5-bbl.html)
- [Speidel fermentation tanks (manufacturer's own site, for cross-check only)](https://shop.speidels-braumeister.de/en/fermentation-tanks)
- [Beer - Kegs • Brouwland](https://brouwland.com/en/1228-kegs?q=Segment-beer)
- [Soda Keg AEB Jolly 23 l • Brouwland](https://brouwland.com/en/kegs/20931-soda-keg-aeb-jolly-23-l.html)
- [Beer - Beer dispensing systems • Brouwland](https://brouwland.com/en/1246-beer-dispensing-systems?q=Segment-beer)
- [Party Star Deluxe CO2 dispenser for 5 l barrels • Brouwland](https://brouwland.com/en/kegging/15873-party-star-deluxe-co2-dispenser-for-5-l-barrels.html)
- [CO2-regulator with 2 manometers • Brouwland](https://brouwland.com/en/beer-dispensing-systems/15879-co2-regulator-with-2-manometers.html)
- [Kegland MK5 CO2 regulator with 2 manometers • Brouwland](https://brouwland.com/en/beer-dispensing-systems/21087-kegland-mk5-co2-regulator-with-2-manometers.html)
- [CO2-regulator 3 bar with 2 outputs • Brouwland](https://brouwland.com/en/our-products/brewing/beer-kegs-and-accessories/soda-kegs-and-accessories/d/co2-regulator-3-bar-with-2-outputs)
- [CO2 cylinder 2 kg filled • Brouwland](https://brouwland.com/en/beer-dispensing-systems/15875-co2-cylinder-2-kg-filled.html)
- [Brewferm Beerstream pressure regulator for Sodastream cylinder • Brouwland](https://brouwland.com/en/beer-dispensing-systems/20415-brewferm-beerstream-drukregelaar-voor-sodastream-cilinder.html)
- [CO2, let's get started! • Brouwland (blog)](https://brouwland.com/en/blog/post/co2-begin-ermee.html)
- [Pneumatic table top crown capper • Brouwland](https://brouwland.com/en/corkers-cappers/15551-pneumatic-table-top-crown-capper.html)
- [Besserbrauer Crown capper with crown caps • Brouwland](https://brouwland.com/en/all-grain-kits/21553-besserbrauer-crown-capper-with-crown-caps.html)
- [Flip-top bottle 75 cl, brown, without flip-top, COMBI, box 12 pcs • Brouwland](https://brouwland.com/en/bottles/702-flip-top-bottle-75-cl-brown-without-flip-top-combi-box-12-pcs.html)
- [Beer - Bottles • Brouwland](https://brouwland.com/en/1129-bottles?q=Segment-beer)
- [SS Brewtech Electric Malt Mill • Brouwland](https://brouwland.com/en/milling/12213-ss-brewtech-grain-mill.html)
- [Brewferm Grain Gorilla malt mill • Brouwland](https://brouwland.com/en/milling/12195-brewferm-grain-gorilla-malt-mill-with-adjustable-stainless-steel-rollers.html)
- [Brewferm Grain Gorilla Pro malt mill • Brouwland](https://brouwland.com/en/milling/19798-brewferm-grain-gorilla-pro-malt-mill-with-3-stainless-steel-rollers.html)
- [Brewferm Grain Grizzly cast iron malt mill • Brouwland](https://brouwland.com/en/milling/20142-brewferm-grain-grizzly-moutmolen.html)
- [MattMill Classic Complete – Professional Grain Mill • Brouwland](https://brouwland.com/en/milling/21890-mattmill-classic-complete.html)
- [Grainfather Electric Grain Mill with mounting board • Brouwland](https://brouwland.com/en/milling/20118-grainfather-electrische-moutmolen-basisplaat.html)
- [Beer - Grain mills • Brouwland](https://brouwland.com/en/1236-milling?q=Segment-beer)
- [The importance of thorough cleaning and sanitising • Brouwland (blog)](https://brouwland.com/en/blog/post/het-belang-van-grondig-reinigen-en-ontsmetten.html)
- [Beer - Cleaning products • Brouwland](https://brouwland.com/en/1156-cleaning-products?q=Segment-beer)
- [SaniClean Five Star 946 ml • Brouwland](https://brouwland.com/en/cleaning-products/21076-saniclean-five-star-946-ml.html)
- [PBW Liquid Five Star 946 ml • Brouwland](https://brouwland.com/en/cleaning-products/20620-pbw-liquid-five-star-946-ml.html)
- [Brewferm beer kit Belgian Saison • Brouwland](https://brouwland.com/en/extract-beer-kits/15742-brewferm-beer-kit-belgian-saison.html)
- [Brewferm beer kit Belgian Brown • Brouwland](https://brouwland.com/en/extract-beer-kits/15744-brewferm-beer-kit-belgian-brown.html)
- [Brewferm beer kit Belgian Wit • Brouwland](https://brouwland.com/en/extract-beer-kits/2389-brewferm-beer-kit-belgian-wit.html)
- [Brewferm beer kit Special Belge • Brouwland](https://brouwland.com/en/extract-beer-kits/2384-brewferm-beer-kit-special-belge.html)
- [Beer yeast WYEAST XL 3724 Belgian Saison • Brouwland](https://brouwland.com/en/yeast-and-bacteria/11345-beeryeast-wyeast-xl-3724-belgian-saison.html)
- [Brewferm • Brouwland (brand page)](https://brouwland.com/en/brewferm)
- [Beer - Yeast • Brouwland](https://brouwland.com/en/1078-yeast-and-bacteria?q=Segment-beer)
- [Brands • Brouwland](https://brouwland.com/en/brands)

### What could not be verified

- Exact Brew Monk B70/Magnus wattage, dimensions, and precise malt-pipe capacity (only B40/B50 malt-pipe kg figures and the shared 2,500W element figure were confirmed).
- Whether Brouwland's Speidel *stainless* conical fermenters carry the same ~1.2 bar pressure rating and TC-fitting spec reported on Speidel's own site and MoreBeer — Brouwland is confirmed to stock the Speidel brand in the fermentation-vessels category, but a Brouwland-specific stainless-conical product page with matching specs was not directly surfaced.
- Specific current home-scale mash tun / HLT kettle SKUs (as opposed to large 500–3,000 L commercial brewhouse installations, which were only found via an indirect/hosted document, not a live catalog page).
- Direct confirmation of EU vs. US crown-cap physical/liner standard differences from a Brouwland source (this section relies on general homebrewing-community knowledge, not a Brouwland statement).
- Live pricing for any product — all prices mentioned are illustrative snippets from the research date and should not be treated as current.
- Full site navigation/category tree, since brouwland.com blocked direct automated fetches throughout this session; the categories and URLs above were reconstructed from search-engine snippets rather than by browsing the live site structure directly.
