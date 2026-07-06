# Equipment Overview

A brand-agnostic map of home-brewing equipment, organized by brewing method and by brewing stage. This document explains what each category of equipment does, how options within a category differ mechanically, and what failure modes or trade-offs to expect. It does not recommend specific products or brands.

For brand-specific product mappings (which real-world SKUs correspond to which categories below), see:

- `../equipment/kegland-deep-dive.md`
- `../equipment/brouwland-deep-dive.md`

For the underlying math (priming sugar dosing, refractometer alcohol correction, carbonation targets, efficiency calculations), see `../math/calculators-and-formulas.md`.

---

## 1. Brewing method tiers

Home brewing scales from a stockpot on a stove to multi-vessel automated rigs. Each tier is defined by how sugar is extracted from grain (or not extracted at all, in extract brewing) and how much control that gives you over the process.

### 1.1 Extract brewing

**What it requires:** A brew kettle (large enough to boil your batch — often a partial boil for beginners, e.g. 3–4 US gal / 11–15 L, topped up with water after the boil) and a fermenter. No mashing equipment at all.

**How it works:** Malt extract (liquid malt extract/LME or dried malt extract/DME) has already had its starches converted to fermentable sugar by the maltster. You simply dissolve it in hot water, boil it with hops, cool, and pitch yeast. There is no starch-to-sugar conversion step for you to manage.

**Why it's the lowest barrier to entry:** No mash tun, no lautering, no need to hit and hold a specific temperature for an hour, no sparge. Equipment cost and counter space are minimal, and the process fits in under 2 hours of active time. The trade-off is less control over the wort's fermentability profile and body — you're working with the extract manufacturer's conversion, not your own — and many extract-only beers rely on a partial boil, which changes hop utilization and can affect color (a full boil is more representative of what all-grain brewers get).

### 1.2 Partial mash

**What it requires:** Everything extract brewing needs, plus a small mash vessel (a large pot, a small cooler, or even a straining bag in the brew kettle) to steep a limited amount of base and specialty grain.

**How it works:** You mash a portion of your fermentables (say, 1–3 lb / 0.5–1.5 kg of base malt plus specialty grains) at a controlled temperature for 45–60 minutes to convert those starches yourself, then sparge or strain that mini-mash and supplement the rest of the fermentables with extract to hit your target gravity.

**Why it exists as a tier:** It's a bridge — it introduces starch conversion, mash temperature/enzyme behavior, and grain-bed straining at small scale without requiring a dedicated mash tun, HLT, or the volume of specialty equipment all-grain brewing needs. It's a good way to learn mash chemistry before committing to all-grain gear.

### 1.3 All-grain: Brew-in-a-Bag (BIAB)

**What it requires:** A single vessel large enough to hold your full water volume (strike + sparge water combined, often 7+ US gal / 26+ L for a 5-gallon batch) and a large, fine-mesh grain bag. No separate mash tun or lauter tun.

**How it works:** All the grain goes into the bag, which sits inside the same kettle used for the boil. You mash directly in that kettle, then lift the bag out (draining it) instead of running the wort off through a false bottom into a separate vessel. The bag itself is the lautering device.

**Pros:**
- Single vessel — lowest all-grain equipment cost and smallest footprint.
- No stuck sparges in the traditional sense (see §2), since there's no compressible grain bed sitting on a false bottom to clog.
- Fast: often a 60–90 minute brew day reduction versus 3-vessel systems since there's no transferring mash to a separate lauter tun.

**Cons / trade-offs:**
- **Efficiency:** BIAB traditionally uses a thicker mash (less water relative to grain) than 3-vessel sparging, which can leave more sugar behind in the grain unless you sparge the bag afterward (dunk or pour-over sparge) or use a full-volume, no-sparge approach with a finer crush to compensate. Efficiency numbers are close to 3-vessel with good technique, but many first attempts run lower until dialed in.
- **Heating-element risk:** On electric all-in-one or DIY builds where the heating element sits inside the kettle, the grain bag can rest directly against or on top of the element, causing localized scorching (grain packed against a hot surface with poor liquid circulation). Mitigations include a false bottom or "bag riser" to keep the bag off the element, or gentle stirring during heating.
- **Bag handling:** A saturated grain bag full of 5–6 kg of spent grain is heavy (often 10–15 kg / 20–30+ lb when soaked) and awkward to lift out of a kettle safely, especially at higher volumes. Pulley/hoist systems or a helper are common solutions at scale.

### 1.4 All-grain: 3-vessel

**What it requires:** Three separate vessels:
1. **Hot Liquor Tank (HLT)** — heats and holds brewing water (called "liquor" in brewing) for mash-in (strike water) and sparge water.
2. **Mash Tun (MLT)** — insulated vessel where grain and strike water combine and convert; fitted with a false bottom, braid, or manifold (see §2) to let wort drain while holding grain back.
3. **Boil Kettle (BK)** — receives the lautered wort for the boil with hops.

**How it works:** Strike water is heated in the HLT and transferred to the mash tun to hit mash temperature. After conversion, wort is run off (lautered) from the mash tun into the boil kettle while sparge water from the HLT is added over the grain bed to rinse remaining sugars, either as a batch sparge (dump and drain in one or two large additions) or fly sparge (continuous slow sparge matching the runoff rate).

**Why brewers step up to it:** Separating the vessels gives you:
- **Step mashing control** — you can hold at one temperature (e.g., a protein or beta-glucan rest) and raise to another (e.g., saccharification rest, mash-out) with a dedicated heat source per vessel, rather than juggling a single pot.
- **More consistent sparge water availability** — the HLT can hold sparge water at the right temperature (typically ~168–170°F / 76–77°C) ready to go the moment lautering starts.
- **Better volume/temperature bookkeeping** — separate tuns make it easier to track strike vs. sparge volumes precisely for recipe formulation software.

**Trade-off:** Three vessels means three heat sources (or a lot of pot-shuffling on one burner), more plumbing (valves, hoses, pumps if used), more counter/floor space, more cleaning, and meaningfully higher upfront cost than BIAB.

### 1.5 RIMS vs. HERMS

Both RIMS and HERMS are automation layers added to a mash tun (usually in a 3-vessel or 2-vessel system) to hold or step mash temperature automatically via recirculation, rather than relying on stovetop/direct-fire adjustment or manual infusions. Both use a pump to continuously draw wort from the bottom of the mash tun and return it to the top (recirculating mash — this also has a side benefit of clarifying the wort and improving lauter efficiency, sometimes called "vorlauf" when done manually).

**RIMS — Recirculating Infusion Mash System.** The pump pushes wort through a tube containing an inline electric heating element. A temperature probe near the outlet feeds a controller (e.g., a PID) that switches the element on and off to hit the setpoint. The heat source is direct and in-line with the flow.

- *Why it exists:* Simpler plumbing — one extra tube with an embedded heating element, no second heated vessel needed to supply heat.
- *Failure mode:* If the pump stops (airlock, clog, power blip) while the element is still energized, wort sitting in the tube can scorch against the element in seconds, producing burnt/astringent off-flavors that can ruin the batch. RIMS tubes also need to be fully disassembled and cleaned after each use since residue bakes onto the element.

**HERMS — Heat Exchange Recirculating Mash System.** The pump pushes wort through a coil (usually stainless) that is physically submerged in the HLT, rather than through a directly-heated tube. The HLT water is heated to slightly above the target mash temperature, and the coil transfers that heat to the wort passing through it indirectly.

- *Why it exists:* Because the heat source (HLT water) is far cooler than a bare heating element's surface, there's no realistic scorching risk even if flow stops temporarily — the coil just sits at HLT temperature. This makes HERMS more forgiving of pump hiccups.
- *Trade-off:* The HLT must already be hot (and stay hot) before/while you rely on it for mash temperature control — it's now doing double duty as both sparge-water heater and mash heat-exchange source, meaning its temperature has to be managed relative to two different jobs at once. HERMS coils are also generally easier to clean (a CIP/rinse-through is usually enough) than a RIMS tube.

In short: **RIMS = simpler build, direct heat, scorching risk if flow interrupts; HERMS = gentler indirect heat via the HLT, no scorching risk, but couples HLT temperature management to mash control and needs the HLT pre-heated.** ([The Electric Brewery FAQ](https://shop.theelectricbrewery.com/pages/faq-herms-vs-rims); [Brew Your Own](https://byo.com/articles/rims-and-herms/); [Brewer's Friend](https://www.brewersfriend.com/2009/02/22/introduction-to-rims-and-herms/))

---

## 2. Mash tun options and lautering methods

The mash tun's job is twofold: hold mash temperature steady during conversion, and let clear-ish wort drain out while keeping the grain bed (and hot break/husk material) behind. The lautering component — false bottom, braid, or manifold — is what makes that separation possible.

### 2.1 Vessel types

- **Cooler-based (insulated, passive).** A repurposed drink cooler (round "Igloo"-style or rectangular) fitted with a false bottom or manifold and an outlet valve/bulkhead. Extremely common DIY/budget build. Passive insulation holds mash temperature within a couple degrees over 60–90 minutes with minimal loss — no heat source needed once strike water is mixed in, which also means no direct step-mashing without pulling and reheating liquid (or adding boiling infusions).
- **Stainless conical or cylindrical vessels.** Stand-alone stainless pots, often with a welded thermometer port, sight glass, and ball valve. Can be heated directly (if placed over a burner or fitted with an element) which enables step mashing and mash-out without infusions. Costs more than a cooler conversion; sizing and insulation (or lack thereof) matter more since bare stainless loses heat faster than an insulated cooler unless jacketed or wrapped.

### 2.2 Lautering methods

- **False bottom.** A rigid perforated disc (often stainless) that sits a small gap above the vessel floor, creating a plenum wort can flow into and drain from while grain sits on top. Generally the most even, most reliable draw across the whole grain bed; the standard on stainless conical mash tuns.
- **Braided hose manifold.** A length of braided stainless hose (like a flexible braided water-supply line) coiled in the bottom of the vessel, with the braid's tiny weave acting as the filter medium. Cheap and easy DIY option for cooler mash tuns; slightly less even flow distribution than a full false bottom since it's a line rather than a full-diameter plane, and can be pinched/tangled if kinked.
- **Slotted manifold (rigid pipe with slots or holes cut in a radial/parallel pattern).** Similar concept to a braid but built from rigid pipe (copper or CPVC), covering more of the tun floor's area than a single braid. Better flow distribution than a lone braid, but a rigid manifold can leave dead zones at the vessel's edges/corners if not designed to match the vessel shape.

### 2.3 Stuck sparge: causes and channeling

A "stuck sparge" is when wort flow through the grain bed slows to a trickle or stops entirely during lautering. Common root causes:

- **Grain bed collapse.** Once the liquid level drops and grain husks are no longer buoyed by liquid, the bed compresses under its own weight against the false bottom/manifold, closing off the tiny gaps that let wort through.
- **Poor crush.** Too fine a crush (crushing beyond what husks can structurally support) turns part of the grain into flour-like particles that pack tightly and clog the filter medium; too coarse hurts efficiency but rarely causes stuck sparges. Husks are the structural component that keeps the bed permeable — for wheat, oats, rye, or high-adjunct grists (low or no husk material), adding rice hulls (roughly 0.5 cup / grain-pound as a rule of thumb) restores permeability.
- **Channeling.** When sparge water is added too fast, unevenly, or onto a bed that's already run dry, the water finds the path of least resistance and bores narrow channels through the grain bed instead of percolating evenly through the whole mass. Channeled water rinses only the material along the channel, leaving un-rinsed sugar elsewhere — this both risks a stuck sparge nearby (as un-wetted grain compacts) and lowers extraction efficiency.
- **Sparge water pH/temperature.** Sparge water that's too hot (over ~170°F/77°C) or too alkaline can extract tannins and cause proteins to coagulate in ways that clog the bed; keeping runoff/sparge in the ~168–170°F (76–77°C) range and mash pH around 5.2–5.5 avoids this.

**Fixes when it happens:** stop, don't force it. Gently stir/rouse the grain bed to break up compaction (accepting some haziness), or "underlet" — introduce hot water from below the false bottom so it lifts and re-suspends the bed rather than compacting it further — then resume runoff more slowly. ([Brew Your Own — Troubleshooting a Stuck Sparge](https://byo.com/articles/troubleshooting-stuck-sparge/); [BeerSmith — Avoiding a Stuck Sparge](https://beersmith.com/blog/2009/04/24/avoiding-a-stuck-sparge-for-all-grain-beer/))

---

## 3. Heating

- **Propane burners.** High BTU output, fast heat-up and rolling boils even for large batch volumes, and location-independent (no dedicated electrical circuit needed) — the default for outdoor brewing. Must be used outdoors or in a well-ventilated space only: propane combustion consumes oxygen and produces carbon monoxide, so indoor/garage use without serious ventilation is a real carbon-monoxide risk, not just a fire-code technicality.
- **Electric heating elements.**
  - *Direct immersion elements* (e.g., a water-heater-style element mounted through the kettle wall, submerged directly in the wort) heat efficiently since there's no vessel wall between the element and the liquid, but they're the type most prone to scorching wort or caramelizing sugars onto the element surface if not kept covered by liquid or if flow stops around them (relevant to RIMS tubes and BIAB bag placement, see §1.3 and §1.5).
  - *Vessel-mounted/external elements* (heat applied to or through the vessel wall, e.g., an induction-style hob or a wrapped heating band) avoid direct wort contact with the hottest surface, trading a little efficiency for lower scorching risk.
- **Induction.** Uses an induction-compatible (ferromagnetic, typically stainless with a magnetic base) pot placed on an induction hob; the pot itself becomes the heat source via magnetic induction rather than the burner heating up first. Fast, efficient, and produces no open flame or exposed hot element, but requires induction-compatible cookware and a suitably sized/powered hob for full-volume boils.
- **All-in-one electric brewing systems.** A single-vessel category (brand examples covered in the brand-specific docs) that integrates a heating element, a recirculation pump, and a temperature controller into one unit, essentially collapsing mash tun + HLT + boil kettle + RIMS/HERMS-style recirculation into one footprint. Generically, these systems mash, recirculate, and boil in the same vessel, controlled via a built-in panel or app, trading some of the flexibility/capacity of a multi-vessel rig for a dramatically smaller footprint and simpler brew day.

**Electrical safety:** Any electric brewing setup — all-in-one systems, RIMS controllers, immersion elements, pumps — should be run on a **GFCI/RCD-protected circuit** (Ground Fault Circuit Interrupter in North America, Residual Current Device in Europe/UK/AU terminology). Brewing mixes mains-voltage electrical equipment with large volumes of hot liquid, spills, and grounded metal vessels; a GFCI/RCD cuts power within milliseconds of detecting a current leak (e.g., through a person or spilled wort) well before it would otherwise be dangerous. Dedicated brew controllers marketed for RIMS/HERMS builds usually include GFCI protection built in, but DIY builds and any element plugged into a standard outlet should have GFCI/RCD protection confirmed, not assumed.

---

## 4. Wort chilling

Cooling wort quickly from boiling to pitching temperature matters for three reasons: it promotes **cold break** formation (proteins and polyphenols coagulating and dropping out of solution, which reduces chill haze and gives cleaner beer), it helps drive off/reduce **DMS (dimethyl sulfide)** — a corn-like off-flavor precursor that's particularly relevant in pale, lightly-hopped, pilsner-malt-heavy worts (Pilsner malt is more prone to producing SMM, the DMS precursor, and DMS continues to off-gas usefully during a vigorous boil and while hot, but re-forms if wort sits hot for too long during cooling) and it **shrinks the window of time wort sits in the temperature danger zone where wild yeast and bacteria can gain a foothold before your pitched yeast establishes dominance.**

- **Immersion chiller.** A coil of tubing (usually copper or stainless) submerged directly into the boiling wort; cold water (tap or ice-water-recirculated) runs through the coil to pull heat out via conduction. Simple, cheap, no wort-side cleaning risk since the coil never contacts wort internally — you sanitize only the outside. Chill rate is limited by the temperature differential and surface area, so it's the slowest of the three at low incoming water temperatures.
- **Counterflow chiller.** Two concentric tubes: wort flows through the inner tube while cold water flows the opposite direction through the outer jacket. Running the two fluids countercurrent (rather than the same direction) keeps a bigger average temperature difference across the whole length of the exchanger, giving faster, more efficient heat transfer than an immersion chiller of similar size — but wort now flows *through* an enclosed tube, so the interior must be flushed and sanitized between uses (harder to visually verify it's clean than an immersion coil).
- **Plate chiller.** A stack of thin, corrugated metal plates brazed together, with wort and cold water each flowing through alternating narrow channels between plates. Enormous surface area in a small footprint makes this the fastest and most thermally efficient option of the three, but the narrow, hard-to-see internal channels are also the hardest to clean and inspect — any trapped hop debris or protein film left inside becomes a hidden infection source on the next use, so a diligent backflush/cleaning routine (hot PBW or similar circulated through immediately after use) is essential.

Faster chilling isn't just about convenience — it's directly tied to break formation quality, DMS control in delicate/pale styles, and minimizing the contamination window before pitching.

---

## 5. Fermentation vessels

- **Plastic buckets (food-grade HDPE, usually with a drilled/grommeted lid for an airlock).** Cheapest option, light, easy to find in multiple sizes, easy to clean when new. Downsides: the plastic scratches easily (from brushes, racking canes, etc.), and scratches harbor bacteria/wild yeast that get progressively harder to fully sanitize out over the vessel's life; plastic is also somewhat oxygen-permeable compared to glass or stainless, which is a bigger concern for long-term aging/storage (months) than for a normal 1–4 week primary fermentation.
- **Glass carboys.** Fully see-through, so you can watch fermentation activity, krausen, and clarity directly — genuinely useful for beginners learning to read fermentation progress. Downsides: heavy, especially full (a 5-gallon/19L glass carboy full of beer is 50+ lb / 23+ kg), slippery when wet, and can shatter if bumped, dropped, or thermally shocked, which is both a safety hazard (glass + broken skin) and a total batch loss. Note: despite sometimes being called "carboys" interchangeably with conical fermenters in casual conversation, **glass carboys are essentially always straight/rounded-body vessels, not conical** — true cone-bottomed vessels for easy yeast harvesting are a separate category (see below), so "conical" should not be assumed just because a vessel is glass.
- **Plastic/PET carboys (e.g., "Better Bottle"-style).** Same carboy form factor as glass but in food-grade PET plastic — much lighter and shatterproof, easier to move when full, but like buckets it can scratch (interior scratching is less of an issue than buckets since nothing abrasive is normally inserted) and PET is not rated for indefinite reuse — deep scratches or repeated exposure to certain cleaners over years is a reason to retire and replace rather than an infinite-life vessel.
- **Stainless conical fermenters.** A cylindrical stainless vessel with a genuine cone-shaped bottom, typically fitted with a **racking arm** (a rotatable dip tube at the vessel wall you can turn to draw liquid from just above the settled trub/yeast layer) and a **bottom dump valve** at the apex of the cone for periodically opening and dropping the compacted yeast/trub cake out without disturbing the beer above it. This makes yeast harvesting/repitching and clean racking dramatically easier than siphoning off a flat-bottomed bucket or carboy. Many stainless conicals are also **pressure-rated** (see below), and stainless is non-porous and doesn't scratch the way plastic does, making long-term sanitation more reliable. Cost is the main trade-off — stainless conicals are the most expensive vessel category.
- **Pressure-capable fermenters.** Any vessel (often but not exclusively a stainless conical) built and rated to hold internal gas pressure rather than just vent it passively through an airlock. This unlocks two related techniques:
  - **Fermenting under pressure.** CO2 produced by fermentation is allowed to build up inside the sealed vessel instead of escaping through an airlock, held at a chosen pressure (commonly cited ranges are roughly 10–15 psi during active fermentation, sometimes raised to 15–25 psi during conditioning). The generally cited mechanism is that elevated pressure suppresses yeast ester production, which allows fermenting some yeast strains (notably lager strains) warmer than their traditional temperature range while still producing a "cleaner," less fruity/ester-forward beer than that same warm fermentation would produce unpressurized — useful because warmer fermentation also finishes faster. **Caveat worth noting:** while this is the widely repeated theory (and mechanistically plausible — pressure is known to affect yeast metabolism), controlled blind-tasting experiments from Brülosophy across multiple pressure-fermented lager trials have repeatedly found tasters could *not* reliably distinguish pressure-fermented warm lagers from traditionally cold-fermented ones, suggesting the real-world perceptible effect is smaller or more style/strain-dependent than the simple theory implies. Treat "pressure fermentation = guaranteed clean warm lager" as a popular but not fully settled claim.
  - **Spunding.** Once fermentation is nearly finished (commonly recommended: cap the vessel with a spunding valve when there's roughly 1 °Plato / a few points of gravity left to ferment out — capping too early risks clogging the valve with active krausen), a spunding valve is fitted in place of an airlock. The valve is a spring-loaded, adjustable pressure-relief regulator: it holds back the CO2 the yeast is still producing until the set pressure is reached, then vents any excess, holding the vessel at a constant pressure while the last bit of fermentation naturally carbonates the beer in place — no separate priming-sugar or forced-CO2 step needed. This is popular for two reasons: it produces natural carbonation without the extra bottling/kegging carbonation step, and because the vessel stays sealed and pressurized rather than open to an airlock, it minimizes oxygen exposure during the transition from fermentation to packaging — a meaningful quality factor for hop-forward and lager styles where oxidation shows up as stale/cardboard flavors over time. A vessel used for spunding must have a pressure rating and, ideally, its own pressure-relief valve (PRV) as a safety backstop above the spunding valve's set point. ([Precision Fermentation — Natural Beer Carbonation Through Spunding](https://www.precisionfermentation.com/blog/natural-beer-carbonation-spunding/); [BYO — Using Spunding Valves](https://byo.com/articles/advanced-brewing-9/); [Brülosophy — Pressurized Fermentation xBmt series](https://brulosophy.com/2022/07/04/exbeeriment-impact-of-pressurized-warm-fermentation-on-a-german-pils/))

---

## 6. Temperature control

Fermentation vessel choice is only half the story — controlling *where* that vessel sits, temperature-wise, is arguably more important to final beer quality than almost any other equipment decision.

- **Fridge/freezer conversion + external controller.** A standard household fridge or chest freezer (which natively can only cool, and only to its own fixed thermostat setting) is plugged into an external temperature controller (classic budget example: an STC-1000-style single-stage or dual-stage digital controller) with a temperature probe taped to or inserted near the fermenter. The controller switches the fridge/freezer's compressor on and off to hold a chosen setpoint — a single-stage controller only handles cooling; a dual-stage controller can also drive a heat source (e.g., a heat belt or small heater, see below) plugged into its second outlet, letting one chamber both cool and heat to hold a tight range year-round regardless of ambient room temperature.
- **Glycol chiller loops.** Used mostly with stainless conicals or jacketed fermenters: a chiller unit circulates a glycol/water mixture through a jacket wrapped around or built into the fermenter wall (rather than cooling the whole surrounding air like a fridge does). This allows precise, vessel-specific temperature control (including running multiple fermenters at different temperatures from one glycol loop with individual solenoids) and is the standard approach once someone moves to conical fermenters at a scale where a fridge is no longer practical.
- **Fermentation chambers.** A broad term for any dedicated enclosed space (converted fridge/freezer, insulated cabinet, closet with heating/cooling added) built specifically to hold fermentation temperature independent of the room it's in.
- **Heat belts / heat pads.** Wrap-around or under-vessel resistive heating elements, typically also paired with a temperature controller, used when the problem is a room that's *too cold* for the target fermentation temperature — e.g., a cold basement or garage where ale yeast (commonly wanting ~18–22°C / 64–72°F depending on strain) would otherwise stall or produce off-flavors from underpitched-temperature stress. Cheaper and lower-effort than a full chamber when heating (not cooling) is the only need.

### Why stability matters more than hitting a number once

A single accurate temperature reading at pitch time is not the same as *holding* that temperature. Fermentation is exothermic — actively fermenting yeast, especially during the first 24–48 hours at high krausen, generates its own heat and can push the beer's actual internal temperature several degrees above the surrounding air/chamber temperature, even if the room or fridge reads exactly on target. A chamber or room that itself swings (e.g., a garage or unconditioned room cycling several degrees between day and night) compounds this: the yeast is now experiencing a moving target rather than a stable one. Temperature swings — not just an elevated average — are what drive off-flavor production (excess esters, fusel alcohols, diacetyl in some strains) because yeast metabolic byproducts are highly temperature-sensitive, and a swing exposes the yeast to a worse combination of stress and peak heat than a controller holding a steady, slightly-off-ideal setpoint would. This is why active temperature control (fridge+controller, glycol, chamber) is considered a bigger single-purchase quality upgrade for most home brewers than most other equipment, and why simply "keeping the fermenter in a closet" is a common but often underappreciated source of unexplained off-flavors.

---

## 7. Packaging equipment

### 7.1 Bottling

- **Bottling wand.** A rigid tube attached to the end of a bottling bucket's spigot/hose with a spring-loaded valve at the tip that only opens when pressed against the bottom of the bottle — this fills from the bottom up with minimal splashing/aeration (oxygen pickup at this stage causes staling) and automatically leaves the right headspace when you lift it out.
- **Capper.** Crimps a bottle cap onto a pry-off bottle. Common styles are a two-handed "wing" capper (fast, good for volume) and a single bench-mount capper (more consistent, better leverage, easier for beginners to get a reliable seal).
- **Bottle types:**
  - *Pry-off* — the standard commercial beer bottle crown-cap format; requires a capper and single-use caps (in principle caps are single-use, though some brewers reuse them successfully — new caps are cheap enough that it's not worth the risk of a bad seal).
  - *Twist-off* — visually similar to pry-off but with a slightly different, more brittle cap thread finish; can usually still be capped with a standard capper and standard crimp-on caps, but twist-off bottles are generally considered more prone to chipping/cracking under repeated reuse and are less preferred for home bottling than pry-off.
  - *Belgian/champagne-style bottles* — thicker glass rated for higher internal pressure, typically used for higher-carbonation styles (Belgian ales, some sours, anything bottle-conditioned to higher volumes of CO2) and usually paired with a wired cage-and-cork or a heavy-duty crown cap rather than a standard bottle. Their thicker glass and (often) rounder punt base also make them more suited to long-term aging and reuse than standard pry-off bottles.
- **Priming sugar dosing.** Bottle conditioning relies on adding a small, calculated amount of fermentable sugar at bottling time so the residual yeast in suspension carbonates the beer inside the sealed bottle. Getting this dose right (per style, per batch volume, accounting for the beer's temperature and existing dissolved CO2) is a calculation, not a rule of thumb — see `../math/calculators-and-formulas.md` for the actual carbonation math (target volumes of CO2 by style, priming sugar tables, temperature-adjustment factors). Under-dosing gives flat beer; over-dosing risks over-carbonated or, in the worst case, exploding bottles.

### 7.2 Kegging

- **Ball lock ("Cornelius"/"corny") kegs vs. pin lock kegs.** Both are the two common used-soda-keg formats repurposed for homebrewing, distinguished mainly by their post/fitting design: ball lock posts are round with a collar that a quick-disconnect locks onto via internal ball bearings; pin lock posts have two protruding pins the disconnect clips onto. They hold beer identically well — the difference is purely in the disconnect/fitting hardware (and ball lock disconnects/kegs are generally more common and easier to source new fittings for today). The two types are not cross-compatible without adapters.
- **Sizes.** Common full-size format is 5 US gallons / ~19 L (matching a typical homebrew batch), with smaller format kegs (e.g., 2.5 gal / ~9.5 L or smaller "mini kegs") used for smaller batches, splitting a batch across styles, or portability. **Torpedo-style/growler-style small kegs** are aimed at takeaway/serving-away-from-home use — small, often mostly-insulated or double-walled, pressurizable containers (distinct from a plain growler, which is usually just a sealed glass jug with no pressure/tap system) that let you dispense a carbonated pour without a full kegerator setup.
- **CO2 systems.**
  - *Tank sizes* — common home setups range from small disposable/refillable cartridges up through 5 lb and 10-20 lb (roughly 2.5–9 kg) refillable cylinders; bigger tanks mean fewer refills but more upfront cost and space.
  - *Regulators — single vs. dual gauge.* A single-gauge regulator shows only the output/working pressure being delivered to the keg; a dual-gauge regulator additionally shows tank pressure, letting you see how much gas is left in the cylinder without guessing by weight or feel.
  - *Single-body vs. dual-body (multi-output) regulators* — a single-body regulator delivers one regulated pressure to everything downstream of it; a dual-body (or manifold-style multi-output) regulator lets you set and deliver two (or more) independently regulated pressures from one CO2 tank, which matters once you're serving multiple kegs at different styles' target carbonation/serving pressures at once (e.g., a highly-carbonated Belgian-style next to a lower-carbonation English bitter) without needing a separate tank per pressure.
  - *Force carbonation vs. natural/spunding carbonation.* Force carbonating (applying CO2 at serving or higher pressure directly to a sealed keg, either at a high "burst" pressure with agitation for a quick carbonate, or at serving pressure over several days for a gentler approach) gets beer carbonated and ready to serve in anywhere from under an hour (agitation method) to about a week (steady low-pressure method), trading a bit of hands-on effort or gas usage for speed. Natural/spunding carbonation (see §5) requires no extra CO2 tank interaction after the fact — the beer carbonates itself as fermentation finishes — but requires the vessel to already be pressure-capable and sealed before fermentation completes, and gives you less on-demand control over timing.
- **Taps/faucets.**
  - *Picnic taps* — a simple, inexpensive plastic squeeze-lever faucet on the end of a beer line, with no permanent mounting; common for portable setups, parties, or kegerator conversions where drilling a tower/shank isn't wanted.
  - *Tower/shank-mounted faucets* — a metal faucet threaded onto a shank that passes through a wall, tower, or fridge door, giving a more "commercial bar" look and feel and generally better durability/cleanability than a picnic tap for a permanent setup.
  - *Flow control faucets* — a faucet with a built-in adjustable restrictor (usually a knob at the base) that lets you dial in extra resistance at the tap itself, useful for nitro-style pours (which need much more restriction to form a tight cascade/head) or as a fix for line-balance issues (see below) without re-running new beer line.
- **Line balancing basics.** The length and internal diameter of the beer line between keg and faucet creates flow resistance; that resistance needs to roughly match the keg's serving pressure (which is set by your target carbonation level, since serving pressure and carbonation level are linked at a given temperature) or pours come out too foamy (not enough resistance for the pressure pushing the beer) or too slow/flat-pouring (too much resistance). This is why beer line is typically several feet of narrow-bore vinyl or (increasingly) polyethylene tubing rather than a short, wide hose — the length is deliberately adding resistance, not just plumbing convenience. Exact line-length-to-pressure tables exist and are commonly published by suppliers and brewing references; the key conceptual point for this document is simply that **line length/diameter is a tuning variable for pour quality, not just plumbing**, and a persistently foamy or slow pour is often a line-balance problem rather than a keg or CO2 problem.

---

## 8. Cleaning and sanitizing equipment

- **Carboy/keg brushes.** Long-handled, often bent or angled brushes sized to reach the bottom and sides of narrow-necked vessels (carboys) or through a keg's opening — mechanical scrubbing is often necessary to physically dislodge dried residue (krausen rings, protein films, beer stone) that a soak alone won't remove.
- **Cleaning solutions vs. sanitizers — a critical, non-interchangeable distinction:**
  - **Cleaners (e.g., alkaline oxygen-based cleaners in the PBW/OxiClean-free-rinse-type category)** are for removing organic and mineral **soil** — dried wort, proteins, hop residue, beer stone, krausen rings — from a dirty surface. They work by chemically breaking down and lifting that soil so it rinses away, generally used at a moderate concentration, often with warm/hot water and soak time, and always require a thorough rinse afterward. They are not designed to reliably kill microorganisms on contact and are not a substitute for a sanitizing step.
  - **No-rinse sanitizers (e.g., acid-based sanitizers in the Star San/iodophor category)** are for killing microbes on a surface that is **already visibly clean** — sanitizers do not remove soil, and organic material on a surface can shield microbes from the sanitizer or simply chemically consume/neutralize the sanitizer before it can act on anything else. Used at a much lower concentration than cleaners, typically flash-contact (seconds to a couple minutes) is sufficient, and "no-rinse" formulations are safe to leave residual traces of on a fermenter or keg since they break down to food-safe byproducts.
  - **Why the order and the distinction both matter:** cleaning and sanitizing are two separate steps solving two separate problems — soil removal and microbial kill — and neither substitutes for the other. Sanitizing a dirty surface just protects the soil (and anything living under it); cleaning without sanitizing leaves a visually clean but still-contaminated surface. The standard workflow is **clean → rinse → sanitize → (no additional rinse for a no-rinse sanitizer) → use**, and skipping either step independently causes problems: skip cleaning and you get infections hiding under visible residue that a quick sanitizer spray won't reach; skip sanitizing (or sanitize before cleaning) and a visually spotless vessel can still carry a live contaminating culture. ([Great Fermentations — PBW vs. Star San](https://www.greatfermentations.com/blog/great-fermentations-blog-1/star-san-vs-pbw-cleaning-sanitizing-505); [Home Brew Press — Cleaning vs. Sanitizing Guide](https://www.homebrewpress.com/blog/cleaning-sanitizing-homebrew-guide))

---

## 9. Measurement tools

- **Hydrometer vs. refractometer.** Both estimate the sugar content (and therefore potential alcohol) of a liquid via density/refraction, but they work differently and have different practical trade-offs:
  - A **hydrometer** is a weighted glass float read by the liquid level against a printed specific-gravity scale; it needs a reasonably large sample (enough to float freely in a test jar) and a temperature correction if the sample isn't at the hydrometer's calibration temperature, but its reading stays accurate throughout fermentation — alcohol in the sample doesn't distort a hydrometer reading the way it does a refractometer.
  - A **refractometer** reads the bending of light through a couple of drops of liquid on a prism, giving a Brix or Plato reading instantly with a tiny sample — convenient for quick mash/pre-boil checks. However, once fermentation has started and alcohol is present in the sample, **a raw refractometer reading is no longer an accurate gravity value** — alcohol bends light differently than dissolved sugar does, so the raw reading needs a correction formula (using the original gravity and the current refractometer reading together) to back out a usable current gravity estimate. This correction (and the underlying wort correction factor most refractometers also need calibrated) exists and is necessary — the actual formulas are covered in `../math/calculators-and-formulas.md`. ([Brewer's Friend — Refractometer Correction Factor](https://www.brewersfriend.com/how-to-determine-your-refractometers-wort-correction-factor/); [BYO — Understanding & Using a Refractometer](https://byo.com/articles/refractometer/))
- **pH meter vs. pH strips.** Strips are cheap and give a rough, visually-judged color-match estimate — fine for a sanity check but imprecise, especially in the narrow mash-pH range (5.2–5.5) that actually matters for enzyme activity and tannin extraction. A digital pH meter gives a precise numeric reading but needs periodic **calibration** against known buffer solutions (accuracy drifts over time/with probe age) and ideally **automatic or manual temperature compensation**, since pH readings shift with sample temperature — a meter used without calibration or temperature compensation can be confidently wrong, which is arguably worse than a rough strip reading you already know to distrust.
- **Thermometers.** Used at multiple points (strike water, mash temperature, sparge water, wort pre-pitch, fermentation) — accuracy and response time matter more than most brewers assume, since mash temperature alone shifts the fermentability/body of the final beer by a meaningful margin per degree. Dial thermometers, digital probe thermometers, and permanently mounted vessel thermometers are all common; whichever type, periodic calibration (e.g., checking against a known ice-water 0°C/32°F reference) is worth doing since a thermometer reading a few degrees off silently skews every mash you do with it.

---

## 10. Equipment upgrade decision points

A practical, symptom-driven guide for when a piece of equipment (rather than technique alone) is the right fix.

### "I keep getting stuck sparges"

- **WHY it's happening:** Almost always one or more of: too-fine a crush packing the grain bed too tightly, a grist low in husk material (wheat/oats/rye/adjunct-heavy) with nothing to keep the bed permeable, sparge water added too fast or onto a bed that's run dry, or a false bottom/manifold with poor flow distribution across the vessel floor.
- **WHAT it means:** Wort flow through the grain bed has clogged or channeled — you're not draining evenly (or at all), and efficiency and brew-day time are both taking a hit.
- **WHEN to treat it as an equipment problem vs. a technique problem:** If it happens occasionally with high-adjunct or high-wheat grists, it's likely technique (add rice hulls, sparge slower, keep the bed submerged). If it happens on nearly every batch regardless of grist, suspect the lautering hardware itself — a single thin braid may be under-sized for your vessel diameter, or your crush gap needs opening slightly.
- **ACTION:** Cheapest fixes first: add rice hulls for low-husk grists, slow down sparge rate, keep at least an inch of liquid over the grain bed at all times, and try underletting (introducing hot water from below the false bottom) to re-suspend a compacted bed rather than fighting it from above. If it's still chronic, upgrade to a full-diameter false bottom (if currently on a single braid) or check/open your mill gap.
- **CONSEQUENCE of not fixing it:** Repeated stuck sparges mean inconsistent (usually lower) efficiency batch to batch, longer brew days, and in bad cases a partially stuck runoff that stresses fittings/valves or requires disruptive intervention mid-lauter that can introduce oxygen or hot-side stress into the wort.

### "My fermentation temperature swings 5°C/9°F day to night"

- **WHY it matters:** As covered in §6, yeast is highly sensitive to temperature during active fermentation, and a swinging *ambient* temperature compounds with the yeast's *own* self-generated heat during high krausen — the beer's actual internal temperature is likely swinging by even more than the room does.
- **WHAT the consequence is:** Off-flavors that are temperature-swing-specific rather than simply "too warm" — elevated esters (fruity/solvent-like), fusel alcohols (harsh, hot), and in strains prone to it, diacetyl (buttery/butterscotch) that a stable fermentation at even a slightly-too-warm-but-steady temperature would have avoided. These flavors are frequently misdiagnosed as a "bad yeast batch" or recipe problem when the real cause is chamber instability.
- **CHEAPEST fix:** Insulate what you have — wrap the fermenter in a wet towel with a fan for evaporative cooling, move it to the most temperature-stable room/location available (an interior closet swings less than a garage), or submerge it in a water bath (a plastic tub of water around the fermenter dramatically slows how fast its internal temperature can follow ambient swings, since water has much higher thermal mass than air).
- **BEST fix:** An active fridge/freezer conversion with an external controller (§6) removes the ambient swing from the equation almost entirely, since the controller reacts to the actual (or probe-side) temperature rather than depending on the room being stable. For conicals or multiple simultaneous batches, a glycol loop is the higher-end version of the same fix.

### "I want to move from extract to all-grain — what's the minimum jump?"

- **WHY make the jump:** All-grain gives full control over fermentability (mash temperature dictates body/dryness), grain bill (any base malt combination, not limited to what's sold pre-converted as extract), and is usually cheaper per batch at volume since base grain costs less than equivalent extract.
- **WHAT the minimum equipment jump looks like:** You do **not** need a 3-vessel HLT/MLT/BK setup to go all-grain. The smallest step up is **BIAB (§1.3)** — a single kettle large enough for your full water volume plus a grain bag. If your existing extract-brewing kettle is already large enough (roughly 7+ US gal / 26+ L for a 5-gallon all-grain batch, since you need full strike+sparge volume in the kettle rather than a partial boil), the bag itself may be the only new purchase required.
- **ACTION:** Verify kettle volume first — this is the most common blocker. Add a grain bag sized to the kettle. A basic instant-read or clip-on thermometer (if not already owned) to hit and monitor mash temperature. Everything else (boiling, chilling, fermenting) carries over unchanged from extract brewing.
- **CONSEQUENCE of skipping straight to 3-vessel instead:** Not a safety or quality consequence, but a cost/complexity one — a first all-grain 3-vessel purchase before ever having mashed a single batch means learning mash chemistry, lautering, and sparge management for the first time on more complex, more expensive equipment at once. Starting with BIAB isolates "did I convert and extract sugar correctly" as a skill before adding "and manage three vessels and a sparge process" on top of it.

---

## Sources

- [The Electric Brewery — FAQ: HERMS vs RIMS?](https://shop.theelectricbrewery.com/pages/faq-herms-vs-rims)
- [Brew Your Own — RIMS and HERMS](https://byo.com/articles/rims-and-herms/)
- [Brewer's Friend — Introduction to RIMS and HERMS](https://www.brewersfriend.com/2009/02/22/introduction-to-rims-and-herms/)
- [Craft Beer & Brewing — RIMS? HERMS?](https://www.beerandbrewing.com/rims-herms)
- [Brew Your Own — Troubleshooting a Stuck Sparge](https://byo.com/articles/troubleshooting-stuck-sparge/)
- [BeerSmith — Avoiding a Stuck Sparge for All Grain Beer](https://beersmith.com/blog/2009/04/24/avoiding-a-stuck-sparge-for-all-grain-beer/)
- [Adventures in Homebrewing — How To Fix A Stuck Mash](https://blog.homebrewing.org/an-all-grain-brewers-worst-nightmare-how-to-fix-a-stuck-mash/)
- [The Brew Bag — Brew In A Bag vs. The Dreaded Stuck Sparge](https://www.brewinabag.com/blogs/news/brew-in-a-bag-vs-the-dreaded-stuck-sparge)
- [Precision Fermentation — Natural Beer Carbonation Through Spunding](https://www.precisionfermentation.com/blog/natural-beer-carbonation-spunding/)
- [Brew Your Own — Using Spunding Valves](https://byo.com/articles/advanced-brewing-9/)
- [Brew Your Own — Pressurizing Your Fermenter: Tips from the Pros](https://byo.com/articles/pressurizing-your-fermenter/)
- [Beer Maverick — Guide to Fermenting Homebrew in a Corny Keg](https://beermaverick.com/guide-to-fermenting-homebrew-in-a-corny-keg/)
- [Brülosophy — Impact Of Pressurized Warm Fermentation On A German Pils](https://brulosophy.com/2022/07/04/exbeeriment-impact-of-pressurized-warm-fermentation-on-a-german-pils/)
- [Brülosophy — Impact Pressurized Fermentation Has On A Warm Fermented German Helles Exportbier](https://brulosophy.com/2024/01/08/exbeeriment-impact-pressurized-fermentation-has-on-a-warm-fermented-german-helles-exportbier/)
- [Brülosophy — Examining The Impact Of Fermenting Pale Lager Under Pressure At Ale Temperature](https://brulosophy.com/2020/07/30/examining-the-qualitative-and-quantitative-impact-of-fermenting-pale-lager-under-pressure-at-ale-temperature-the-bru-club-xbmt-series/)
- [Great Fermentations — PBW vs. Star San: The Essential Guide to Cleaning & Sanitizing](https://www.greatfermentations.com/blog/great-fermentations-blog-1/star-san-vs-pbw-cleaning-sanitizing-505)
- [Home Brew Press — Cleaning vs. Sanitizing Homebrew Equipment Guide](https://www.homebrewpress.com/blog/cleaning-sanitizing-homebrew-guide)
- [Craft Beer & Brewing — Cleanser and Sanitizer Showdown](https://www.beerandbrewing.com/cleanser-and-sanitizer-showdown)
- [Brewer's Friend — How to Determine your Refractometer's Wort Correction Factor](https://www.brewersfriend.com/how-to-determine-your-refractometers-wort-correction-factor/)
- [Brew Your Own — Understanding & Using Refractometer](https://byo.com/articles/refractometer/)
- [Lacada Brewery — Refractometer Correction Calculator](https://www.lacadabrewery.com/brew-tools/refractometer-calculator)

*(General homebrewing process and equipment fundamentals in this document are also consistent with John Palmer's "How to Brew," the r/Homebrewing wiki, and MoreBeer/Northern Brewer educational content, referenced as background knowledge alongside the searched sources above.)*
