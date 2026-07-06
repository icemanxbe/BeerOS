# KegLand Deep Dive

> Company and product research for BeerOS's knowledge base. KegLand is a real Australian homebrew retailer/manufacturer (kegland.com.au). All specs, prices, and features below were pulled directly from their live site via search and page fetches in July 2026 unless explicitly flagged as unverified. Prices are AUD, sourced from kegland.com.au (not kegland.co.nz — see caveat in Sources). Treat prices as a snapshot; they change frequently and this document should not be relied on as a live price list.

## 1. Company Overview

KegLand (kegland.com.au) describes itself as the leading home brewing supplier in Australia, based at 410 Princes Hwy, Noble Park North, Victoria. It holds an Australian liquor licence (No. 36312659) and operates a customer-facing storefront alongside its online store.

Structurally, KegLand runs a hybrid model rather than being a pure reseller:

- **Own-brand manufacturing/product development**: BrewZilla, FermZilla, DigiBoil, NukaTap, Duotight, StellarClean, and the "MK4/MK5" regulator lines are all KegLand-developed product lines (some manufactured in partnership with contract factories, some under related entities such as Oxebar for blow-moulded plastics). Search results referencing KegLand's manufacturing partnerships mention KegLand Distribution partnering with Oxebar on blow-moulding facilities for plastic keg/fermenter production — consistent with them controlling more of their supply chain than a typical reseller.
- **Distribution of third-party brands**: they also stock and distribute ingredients (malt, hops, yeast) and hardware brands they don't manufacture themselves.
- **RAPT ecosystem**: KegLand is closely tied to RAPT (rapt.io), the WiFi/Bluetooth brewing telemetry platform (hydrometers, controllers, glycol chillers, portal/app). BrewZilla Gen 4 and several fermentation/temperature-control products integrate with the RAPT Portal and app. Product documentation is split across `docs.kegland.com.au` and `docs.rapt.io`.
- **International footprint**: a `kegland.eu` storefront exists serving Europe with mirrored product listings (confirmed via search results returning parallel `kegland.eu` product pages). A `kegland.co.nz` domain was referenced as a possibility in the brief, but it did not resolve during this research (DNS lookup failed) — **unverified**, and possibly folded into the .com.au store's NZ shipping rather than being a separate live site.

KegLand's most consequential contribution to the hobby is arguably normalizing **pressure fermentation and closed, pressurized transfers** as an accessible, affordable home-brewing technique — historically this was mostly a professional-brewery/DIY-conical concept. Their FermZilla line and BlowTie/RAPT spunding valves put pressure-capable fermentation vessels and rigs within reach of an average homebrewer's budget, which is a big part of why they're discussed as much as they are in online homebrew communities (Aussie Homebrewer forum, Homebrew Finds, various YouTube reviewers).

## 2. All-in-One Brewing Systems: BrewZilla

BrewZilla is KegLand's electric, single-vessel all-grain brewing system — a "brew-in-a-bag meets RIMS" style all-in-one (AIO) that combines a heated kettle, a perforated "malt pipe" basket, an integrated pump for recirculation, and a digital controller, all in one unit run off a single power outlet.

### Generations

Two generations are sold side by side on the current site:

- **Gen 3.1.1** — the older, simpler generation, still sold at a lower price point (e.g. 35L Gen 3.1.1 listed at **$350.00 AUD** vs. $619.95 for the Gen 4.1 equivalent). Uses a simpler dial/knob-style PID controller without WiFi/RAPT connectivity.
- **Gen 4 / Gen 4.1** — current flagship generation, the first to connect to the RAPT Portal (WiFi + Bluetooth), with a full-colour controller screen, redesigned malt pipe, and a "CIP" (clean-in-place) spray rotor accessory for hands-off cleaning. "4.1" specifically denotes the sub-revision that standardized the PPSU (heat-resistant plastic) graduated sight glass.

### Size tiers (Gen 4 / 4.1, verified from product pages)

| Model | Vessel size | Typical batch size | Element power | Pump | Price (AUD) |
|---|---|---|---|---|---|
| BrewZilla 35L Gen 4.1 | 35 L | up to ~30 L | 1900 W | 500 W integrated pump | $619.95 |
| BrewZilla 65L Gen 4.1 | 65 L | up to ~60 L | 2000 W / 1000 W / 500 W selectable | 25 W integrated pump | $949.95 |
| BrewZilla 100L Gen 4 | 100 L | large-batch/small-commercial | 2200 W / 2200 W / 2200 W selectable | 25 W integrated pump | $1,349.00 |

At the very top end, KegLand also lists multi-vessel **200L / 300L / 400L BrewZilla** systems ($19,500–$38,000 AUD) aimed at nano-breweries/commercial pilot systems rather than home use — these are 3-vessel brewhouses, a different category from the single-vessel home BrewZilla, and are included here only to show the top of KegLand's range, not as a home-brewer recommendation.

### Key features (Gen 4.1, from the 35L product page)

- **Single-vessel, "RIMS-style" recirculation**: an integrated pump continuously recirculates wort up through a recirculation arm and back over the grain bed, improving conversion efficiency and temperature uniformity without a separate mash tun/HLT/kettle setup.
- **Digital PID-style controller**: Gen 4/4.1 uses a full-colour touch/button RAPT controller (tilting frame) with step-mash programs, delay-start timing, and variable power output; Gen 3.1.1 uses a simpler analogue-style controller.
- **False bottom / malt pipe**: a two-stage, oversized (30% larger than earlier generations) perforated "malt pipe" basket acts as the false bottom and grain basket in one, with a "False Bottom Pump Protection Screen" that filters out hops/hot break before the pump.
- **Complete concave draining base**: designed to fully drain wort without needing to tilt the unit.
- **RAPT/WiFi + Bluetooth connectivity** (Gen 4/4.1 only): remote monitoring/control via the RAPT Portal and mobile app, push notifications for brew steps, and compatibility with Bluetooth iBeacon-style thermometers reading both malt-pipe and element-area temperatures.
- **Multi-purpose use**: KegLand markets BrewZilla units as also usable for distilling (mash-in for spirits), preserve canning, and sous vide, not just beer brewing.
- Extended **5-year warranty** included on Gen 4/4.1 units.

## 3. Fermentation Equipment: FermZilla

FermZilla is KegLand's line of pressure-capable fermenters, sold as tanks alone, as "Easy-Grip" starter kits, or bundled into complete pressure-brewing kits with airlocks/spunding valves/handles included.

### Product family (as listed on the FermZilla collection page)

| Line | Sizes | Body material | Pressure rating | Notable design |
|---|---|---|---|---|
| **All Rounder** | 30 L, 60 L | PET (clear, food-grade plastic) | up to 2.5 bar (~36 psi) | Flat/domed bottom, large 120 mm lid opening, simplest and cheapest of the three lines |
| **Tri-Conical (Gen3)** | 27 L, 55 L | PET tank + stainless stand/handle/tri-clover fittings | up to 2.4 bar (~35 psi) | True conical bottom with a 3" tri-clover ferrule and a removable 600 mL yeast-collection jar for harvesting yeast without opening the vessel; Gen3 replaced earlier generations' dump-valve designs with the simpler tri-clover fitting |
| **Conical Uni-Tank / "Hop Bong" kits** | 27 L, 55 L | PET/stainless hybrid, same tank as Tri-Conical | same as Tri-Conical | Adds a "Hop Bong" dry-hopping attachment that lets you add hops into a pressurized fermenter without opening it and losing CO₂/introducing oxygen |

Approximate pricing found on the collection page (**note: a standalone 30L All Rounder product page separately showed $59.95 AUD, apparently as an out-of-stock/older price point, versus $99.95 AUD on the current collection listing — there's a real discrepancy between pages on KegLand's own site, so treat the exact All Rounder price as approximate/unverified until confirmed at checkout**):

- 30L All Rounder Easy-Grip: ~$99.95 AUD (collection listing)
- 60L All Rounder Easy-Grip: ~$120.15 AUD
- 27L Tri-Conical Easy-Grip: ~$170.10 AUD
- 55L Tri-Conical Easy-Grip: ~$210.00 AUD

All FermZilla tanks are rated for pressure fermentation, force carbonation, and pressurized/closed transfer, and ship with (or are commonly bundled with) a pressure relief valve (PRV), airlock/pressure lid, and a stainless stand. KegLand explicitly recommends their **StellarClean** cleaner for the PET tanks (soak-and-wipe, no scrubbing) and notes the PET material is not rated above 50°C.

### Why pressure fermentation / spunding matters (brief — see equipment-overview.md for full mechanism)

Pressure fermentation means fermenting inside a sealed vessel that holds back some of the CO₂ the yeast produces, rather than venting it all through an airlock. A **spunding valve** is the adjustable pressure-relief valve that sets how much back-pressure the vessel holds — CO₂ vents once fermentation pressure exceeds the valve's set point, and the vessel naturally carbonates as a side effect (no separate force-carbonation step needed afterward). KegLand's own marketing and community discussion around this centers on three practical benefits: (1) suppressing ester/fusel-alcohol production so **lagers and clean ales can be fermented at warmer ale-range temperatures** without the fruity/hot off-flavors that would normally result, (2) enabling **closed, pressurized transfers** straight from fermenter to keg with minimal oxygen pickup (a major driver of staling/oxidation in finished beer), and (3) skipping a separate carbonation step because the beer carbonates naturally under its own fermentation CO₂. The full technical mechanism (ester suppression chemistry, typical pressure/temperature targets, transfer technique) is documented separately in `../equipment/equipment-overview.md` — this section exists only to explain why FermZilla and the spunding-valve products below are built the way they are.

## 4. Kegging Equipment

KegLand's kegging catalogue spans several keg standards and dispensing hardware types:

- **Ball lock kegs** — the standard homebrew "Corny keg" format. Example listing found: a 19 L ball lock keg with rubber base and handle at ~$99 AUD.
- **Pin lock kegs** — the other legacy Cornelius-style standard, still stocked for compatibility with older setups.
- **K-Lok (Snaplock/FatLock) fittings** — an alternative/adapter connection system for cross-compatibility between keg standards.
- **Commercial kegs & parts** — Euro/Sankey-style commercial kegs and couplers, for brewers scaling toward small commercial packaging or wanting compatibility with commercial draft systems.
- **Oxebar mono-polymer kegs** — durable polymer (plastic) alternative kegs, lighter than stainless, sold with matching accessories. (Oxebar is a KegLand-linked manufacturing partner per the company-overview search results.)
- **Mini kegs / growlers** — stainless steel take-away/portable kegs in multiple sizes, each carrying a 5-year warranty and usable upright or on their side:
  - 2 L (135 × 195 mm) — $26.00 AUD
  - 4 L (135 × 326 mm) — $35.00 AUD
  - 5 L, 8 L, 10 L variants also listed (175 mm diameter family)
  - A "Vacuum Insulated Ultimate Growler" (2 L, 304 stainless, double-walled/insulated) is also sold as a premium option.
  These use a ball-lock-style lid so they can be naturally primed or force-carbonated and dispensed like a small keg.
- **Taps/faucets** — **NukaTap** is KegLand's own-brand forward-sealing faucet line (stainless steel model found at $24.95 AUD), designed to self-close and resist drips/oxidation better than older compression faucets.
- **Kegerators** — KegLand sells complete kegerator "Series 4" and "Series X" base fridge units, sold either as a bare base-fridge-with-regulator or as bundled "draught packs" with font, taps (NukaTap), and Duotight ball-lock disconnects for 1, 2 ("duoTAP"), or 4 tap configurations.

## 5. CO2 / Gas System Components

### Regulators

KegLand's regulators are one of their most community-discussed product families, sold under the "Type 30" (standard AU/NZ CO₂ cylinder thread) designation:

| Model | Gauge config | PRV rating | Notable features | Price (AUD) |
|---|---|---|---|---|
| **MK4** | Dual gauge | 4.5 bar / 65 psi | Large 2½" diaphragm for high flow / multi-keg use, requires spanner to fit cylinder | $46.95 |
| **MK5** | Dual gauge (kPa/Bar/PSI triple scale) | 4.5 bar / 65 psi | Tool-free one-handed cylinder fitting, chrome-plated brass body, built-in 8 mm Duotight push-in outlet + check valve, 10-year warranty | $64.95 |
| **Dual Pressure MK4** | Dual-body | 4.5 bar / 65 psi per body | Two independent outlets at two independently set pressures from one cylinder — e.g. carbonate one keg while serving another at a different pressure — with built-in Duotight fittings | $79.95 |
| **Add-On Regulator Adapter** | — | — | Modular accessory to turn a single-body regulator into a dual-pressure setup after the fact | listed, exact price not confirmed |

A higher-pressure "MK5 Tool-Free" variant was also referenced in search results at 6.5 bar PRV / 100 psi gauge — **this may be a different/newer sub-variant than the 4.5bar/65psi MK5 fetched directly; treat the higher-pressure spec as approximate/unverified since it came from search snippets rather than a directly fetched page.**

### Spunding valves

- **BlowTie Diaphragm Spunding Valve** — a diaphragm-actuated adjustable pressure-relief valve, designed to hold fermentation head pressure more precisely than a simple ball-and-spring PRV.
- **Spund G2** — a compact ball-lock-disconnect-mounted spunding valve, handy for keg-to-keg or fermenter transfers under counter-pressure.
- **RAPT Digital Regulator & Spunding Valve** — see Section 7 (notably innovative product).

### Fittings and disconnects

- **Duotight** — KegLand's own push-to-connect fitting system (no hose clamps needed), sold across 6.5 mm (1/4"), 8 mm (5/16"), and 9.5 mm (3/8") line sizes, colour-coded grey/red for gas and black/yellow for liquid.
- **Duotight ball-lock disconnects** — disconnects with the Duotight push-fitting built directly into the QD body (no separate barbed adapter needed), described by KegLand as using chemical-resistant materials with stainless springs/ball bearings rather than ABS plastic. Available in gas and liquid (including flow-control liquid "POK" variants) versions across the three line sizes.
- **Ball lock disconnects & posts**, **CO₂ cylinder adaptors**, replacement washers/diaphragms/seat assemblies for the MK4/MK5 regulators are all sold as spare parts, indicating a maintain-rather-than-replace philosophy for their gas hardware.

## 6. Temperature Control Products

- **RAPT Pill** — a wireless, floating digital hydrometer + thermometer that sits inside the fermenter and reports specific gravity and temperature over WiFi/Bluetooth to the RAPT app/portal, removing the need to open the fermenter (and expose it to oxygen) to take a gravity reading. Sold in multiple colour housings; onboard USB-C rechargeable battery rated ~5 months on WiFi or 2+ years on Bluetooth-only.
- **RAPT Bluetooth Glycol Chiller** — compact glycol chiller, 400 W cooling capacity, chills up to two fermenters simultaneously via Bluetooth/app control, reaches sub-zero temps (down to about -10°C) using R290 refrigerant; $469.00 AUD.
- **IceMaster G20** — larger glycol chiller (500 W cooling) described as able to chill a single large (up to ~200 L) insulated fermenter or several smaller ones.
- **IceMaster G40** — top-tier glycol chiller with **4 built-in submersible pumps**, each independently digitally controlled, letting one chiller manage up to four separate fermenters/brite tanks at different temperatures simultaneously (780 W / 1 HP cooling).
- **Temp Twister** — a glycol cooling/heating coil accessory that retrofits into a FermZilla (or similar) to add active temperature control without a full jacketed fermenter.
- **RAPT Fermentation Chambers / Temperature Controllers** — referenced in the RAPT digital regulator/spunding-valve description as mountable hardware that pairs with the same ecosystem (WiFi controllers, chamber controllers). Full spec details for the chamber-controller hardware itself were not independently fetched in this pass — **flagging as not fully verified beyond the cross-references found**.

Temperature-control products across the board push toward the same design philosophy as BrewZilla/FermZilla: WiFi/Bluetooth telemetry through the RAPT Portal/app, so gravity, temperature, and pressure can all be logged and automated from one ecosystem.

## 7. Cleaning & Sanitizing Products

- **StellarClean (PBW-style Powdered Brewery Wash)** — KegLand's own buffered alkaline cleaner, positioned as a caustic-soda alternative. Marketed as safe on stainless, aluminium, and plastics (including the PET FermZilla tanks), free-rinsing, and effective across a wide soil/temperature range via "8 active ingredients." Sold as a 1 kg tub ($12.95 AUD) and a 50 g single-use sachet ($3.95 AUD).
- **StellarSan** — a no-rinse acid sanitizer in the same family (Star San-style), sold alongside phosphoric- and lactic-acid based sanitizing chemicals.
- Separate collection pages exist for **Cleaning Products**, **Sanitising Products**, and **Commercial Cleaners, Salts, Enzymes and Other Additions** (the latter aimed at more advanced/commercial-adjacent users — water treatment salts, enzymes, etc.).

## 8. Notable / Innovative Products

- **RAPT Digital Regulator & Spunding Valve** — a single device that can act as either a spunding valve (0–1.5 bar / 22 psi) during fermentation or a full CO₂ regulator (0–8 bar / 115 psi) for dispensing, switchable by reversing gas flow direction, and fully WiFi-controlled through the RAPT app. KegLand's own product copy calls it a way to close the "missing link in fermentation automation," letting a brewer program a pressure ramp (e.g., low pressure early in fermentation, increasing as activity slows) entirely through software. This is a genuinely distinctive product in the home-brew market — most competitors' spunding valves are mechanical/manual-only.
- **FermZilla "Hop Bong"** — a dry-hop delivery attachment that lets hops be added to a sealed, pressurized fermenter without breaking the seal, avoiding both oxygen ingress and CO₂/aroma loss. Frequently referenced by name in community discussion (the "Hop Bong" branding shows up repeatedly in KegLand's own product titles, e.g. "Gen3 27L FermZilla Tri-Conical Hop Bong Pressure Brewing Kit").
- **Duotight push-fitting ecosystem** — reviewed positively by third-party outlets (Homebrew Finds) as a meaningfully simpler alternative to barbed-fitting-plus-hose-clamp designs, and the built-in-Duotight ball lock disconnects specifically were called out as a "smart upgrade for anyone building a clean, clamp-free draft system."
- **Community reputation caveat**: research on the Aussie Homebrewer forum (aussiehomebrewer.com) surfaced a real mix of sentiment, not unqualified praise. Reported issues include defective FermZilla butterfly valves not sealing without pressure, stress cracks on some early FermZilla necks after repeated use (KegLand reportedly replaced affected units), and — more seriously — a specific accusation from forum discussion that KegLand had posted customer reviews on its site that were copied word-for-word from competitors (Beerco.com.au, Northern Brewer). There is also a long-running, sometimes heated Kegland-vs-Keg King rivalry/fandom split on that forum. These are community claims surfaced via search, not independently verified by KegLand or a neutral third party in this research pass, but are worth including because they reflect genuine, findable community sentiment rather than uncritical marketing copy.

## 9. Practical Guidance: Is KegLand's Pressure-Fermentation Ecosystem Right for You?

**A good fit when you:**
- Have been frustrated by oxidized, cardboard/sherry-like off-flavors creeping into finished beer — FermZilla + Duotight closed-transfer fittings + a spunding valve directly target oxygen pickup at the two weakest points (fermenter headspace and the fermenter-to-keg transfer).
- Want to brew clean lagers or crisp ales without a dedicated cold-fermentation chamber — pressure suppresses ester/fusel production enough that many brewers ferment "lager-clean" beers at normal ale-range room temperatures, which is one of FermZilla's biggest selling points for anyone without spare fridge space.
- Like the idea of naturally carbonating in the fermenter via a spunding valve rather than running a separate force-carbonation step on every batch.
- Want a connected/data-logged brewing setup (RAPT Pill + RAPT Portal + optionally the RAPT digital spunding valve) and don't mind the WiFi/app dependency that comes with it.
- Are already comfortable with (or want to grow into) all-grain brewing and would benefit from BrewZilla's all-in-one RIMS-style single-vessel format to simplify a three-vessel HERMS/RIMS setup into one unit and one power outlet.

**When a simpler/cheaper setup makes more sense:**
- **True beginners** still on extract or simple kit brewing: an ordinary food-grade plastic bucket fermenter with a basic airlock and a $15–20 mechanical bung-and-airlock setup will make good beer for a fraction of the cost, and pressure/spunding gear adds complexity (PRV maintenance, o-ring seals, pressure-testing) that isn't needed to learn fermentation fundamentals.
- **Budget-constrained brewers**: a FermZilla All Rounder plus a spunding valve plus Duotight fittings plus a glycol chiller adds up quickly (potentially several hundred AUD beyond a basic fermenter), whereas a $30–50 plastic ale pail gets a beginner brewing immediately.
- **Brewers who don't yet control fermentation temperature at all**: pressure fermentation's biggest benefit (fermenting clean at warm temperatures) matters most to brewers who currently lack temperature control. If you already have a chest freezer + controller keeping fermentation cool, the marginal benefit of adding pressure capability is smaller, and normal atmospheric fermentation plus a keg-conditioning step will get you most of the way there.
- **Occasional/small-batch brewers**: BrewZilla's all-in-one convenience is most valuable to brewers doing frequent batches who want to save setup/teardown time; if you brew a few times a year, a simple three-vessel stovetop or basic single-vessel BIAB setup (even KegLand's own cheaper DigiBoil kettle, sold separately from the full BrewZilla) may be more cost-effective than the full RAPT-connected Gen 4 system.

The general rule of thumb worth encoding in BeerOS guidance: recommend KegLand's pressure ecosystem (FermZilla + spunding valve + closed transfer fittings) to brewers who have already made a few solid batches and have identified oxidation or lager-fermentation-temperature as their specific bottleneck — not as a default first-fermenter recommendation for a total beginner.

## Sources

All of the following were fetched or searched directly during this research pass (July 2026):

**Fetched pages (WebFetch):**
- https://kegland.com.au/pages/about-kegland
- https://kegland.com.au/ (homepage)
- https://kegland.com.au/products/brewzilla-35l-gen-4
- https://kegland.com.au/collections/fermzilla-range-accessories
- https://kegland.com.au/products/fermzilla-30l-all-rounder-pressure-rated-keg-fermenter-now-with-stainless-handle
- https://kegland.com.au/collections/kegging
- https://kegland.com.au/products/fermzilla-27l-tri-conical-uni-tank-fermenter-gen3
- https://kegland.com.au/products/rapt-bluetooth-glycol-chiller
- https://kegland.com.au/products/type-30-mk5-tool-free-co2-dual-gauge-regulator-6-5bar-prv-100psi-gauge
- https://kegland.com.au/collections/regulators-parts-for-refillable-tanks
- https://kegland.com.au/products/rapt-digital-regulator-spunding-valve
- https://kegland.com.au/products/brewzilla-65l-gen-4
- https://kegland.com.au/collections/brewzilla-range-accessories
- https://kegland.com.au/collections/35l-brewzilla
- https://kegland.co.nz/ (failed — DNS did not resolve; NZ-specific site presence unverified)
- https://kegland.com.au/collections/co2-regulators (failed — 404, superseded by /collections/regulators-parts-for-refillable-tanks above)
- https://kegland.com.au/products/65l-brewzilla-gen-4 and /products/65l-brewzilla-gen-4-with-25w-pump-2000w-1000-500w-220-240v-ac (404s; correct URL was /products/brewzilla-65l-gen-4)

**Searched (WebSearch, used to locate URLs and cross-check specs found on fetched pages):**
- kegland.com.au BrewZilla Gen 4 all grain brewing system
- kegland.com.au FermZilla All Rounder Tri-Conical pressure fermenter
- kegland.com.au about us company history
- kegland.com.au dual gauge CO2 regulator dual body multiple kegs
- kegland.com.au glycol chiller fermentation temperature controller (site: search)
- kegland.com.au RAPT pill digital hydrometer temperature probe
- kegland.com.au mini keg growler takeaway 2L 4L polymer
- kegland.com.au Duotight push-in fittings disconnects ball lock
- kegland.com.au cleaning sanitizer StellarClean PBW products
- kegland.com.au spunding valve adjustable pressure fermentation
- kegland.com.au kegerator series 4 dual tap conversion
- "kegland.com.au" 65L BrewZilla Gen 4 price specs
- aussiehomebrewer forum kegland FermZilla BrewZilla review reputation (source of the community-sentiment/reputation caveats in Section 8; primary thread: aussiehomebrewer.com/threads/fermzilla.100624 and aussiehomebrewer.com/threads/kegland-questions-and-answers.98306)

**Explicitly unverified / flagged in text above:**
- Exact current price of the FermZilla 30L All Rounder (conflicting $59.95 vs $99.95 seen across two of KegLand's own pages)
- Whether a separate kegland.co.nz storefront currently exists (DNS did not resolve during this research)
- The 6.5 bar/100psi "MK5 Tool-Free" regulator variant's exact spec sheet (found only in search snippets, not a directly fetched product page)
- Full spec sheet for standalone "RAPT Fermentation Chamber" / temperature controller hardware (referenced only in passing on another product's page, not independently fetched)
- Add-On CO2 Regulator Adapter price (listed in collection but not confirmed on its own product page)
