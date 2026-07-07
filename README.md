# BeerOS

A self-hosted batch tracker and reference library for home beer brewers. No build step, no framework, no account — a Python stdlib server plus a SQLite file on one side, plain HTML/CSS/JS on the other.

**Status:** actively developed, not yet a 1.0. This repo was reset from an earlier fork-of-[MeadOS](https://github.com/icemanxbe/MeadOS) attempt that carried too much mead/cider-shaped dead code; everything below was built from scratch for beer only.

## What's here

**Batches**
- Track batches from pitch to package: gravity log with live OG/FG/ABV/attenuation-so-far, and a linear fermentation-completion projection once you have two readings.
- Log gravity manually, or point an iSpindel/GravityMon at BeerOS directly (native HTTP-post format) — or anything that can target a "Brewfather Custom Stream"-compatible URL (Tilt/RAPT/Plaato via their existing bridge apps) — and readings land in the log automatically.
- A per-recipe step checklist (brew day → fermentation checks → dry hop / diacetyl rest / lagering → packaging) generated from the recipe's own grain bill, hop schedule, and yeast — not hand-authored, so it can't drift out of sync with the recipe.
- Batch status (fermenting / conditioning / done) follows your checked steps and gravity trend automatically, with a one-click manual override when you want to set it yourself.
- A rule-based **Advisor**: reads the gravity trend against the recipe's own yeast attenuation range to flag "looks done fermenting" or "possible stall," surfaces the linear fermentation projection as a forward-looking "on track, done in about N days" while nothing's wrong yet, compares this batch's fermentation length against your own average for this exact recipe once you have it ("slower than your usual pace for this recipe" — takes priority over the generic checks above when it applies), and reminds you when dry hop/diacetyl rest/packaging is coming up or due — each insight cites the actual numbers it's reasoning from, nothing is asserted without evidence. A "Continue Brewing" panel surfaces the most urgent insight across all active batches right on the My Batches page.
- Search, filter, sort, pagination, CSV export, and batch deletion.
- An animated SVG fermenter/keg per batch — liquid tint from the recipe's real computed SRM, rising-bubble/krausen animation while fermenting, settling particles while conditioning, a kegged-and-capped icon when done.

**Recipe Library** — 35 recipes (20 original US/European/Belgian styles plus 15 homebrew-clone-inspired takes on real commercial beers, built from each beer's published ABV/style rather than proprietary formulas). Every OG/FG/ABV/IBU/SRM is computed live from the actual grain bill and hop schedule and checked against real BJCP 2021 ranges — nothing is a hand-typed number. "Brew This Recipe" starts a tracked batch directly from any recipe.

**Ingredient libraries** — browsable reference views for 32 malts/grains, 16 hop varieties, 20 yeast strains, and water chemistry (6 brewing salts + 4 classic historical city water profiles), independent of any specific recipe. Every entry cross-links to the recipes that use it and back — a miss shows plain text rather than risking a wrong link, so coverage grows as the libraries do rather than needing new code.

**Recipe history** — every recipe's detail page shows "Your Batches": every batch you've actually brewed from it, plus a plain average of your own attenuation and days-to-fermentation-complete across them once there are two or more to average — your own numbers, not a generic estimate, and never shown until there's real data behind it. Each batch also has a free-text Notes field, and opening a batch of a recipe you've brewed before shows a "Compared to Last Time" table — OG, latest/final SG, attenuation, days, and notes, this batch side-by-side with the most recent other one — right when you're mid-brew and might want the comparison.

**Brewing Tools** — live calculators for OG (grain bill), ABV (standard + high-gravity), IBU (Tinseth), color (Morey SRM/EBC), strike water temperature, priming sugar (bottle carbonation), force carbonation (kegging — pressure/temp/CO₂-volumes), residual alkalinity, yeast pitch rate, refractometer FG correction, and brewhouse efficiency. Every formula is unit-tested against a written specification (see Knowledge Base below); the force-carbonation calculator specifically interpolates over a real cited reference table rather than trusting an unverifiable formula.

**Knowledge Base** ([docs/knowledge-base/](docs/knowledge-base/)) — a ~77,000-word, source-cited reference on ingredients, equipment, process, troubleshooting, recipe design, and every calculator's underlying math, written for brewers from complete beginners to all-grain veterans. This is also the spec the calculator code is verified against.

## What's not here yet

- The Advisor has exactly one history-aware rule (fermentation pace vs. your own average for the exact recipe) by design — it's not yet comparing attenuation, temperature, or efficiency against your own history, only day count. Deliberately narrow rather than wiring history into every existing rule at once.
- Ingredient cross-linking connects existing data (a recipe already references a malt/hop/yeast/water-profile by name); it doesn't yet synthesize new content like hop pairing or substitution suggestions.
- Equipment/multi-vessel tracking (e.g. animating a transfer from fermenter to a bright tank).
- PWA packaging (manifest/icons).

## Running it

```
python3 server.py --port 8200 --db /path/to/beeros.db
```

Serves the app as static files plus a tiny `GET/POST /api/state` JSON-blob API backed by SQLite. Single shared instance, no multi-user auth — add that complexity if/when a second brewer or device actually needs it.

Run the test suites:
```
node core/domain/calculators.test.js      # calculator functions vs. the KB's worked examples
node core/domain/advisor.test.js          # Advisor insight rules
node core/domain/ingredient-links.test.js # recipe <-> ingredient/water cross-linking, vs. real data
node core/domain/recipe-history.test.js   # per-recipe personal-average aggregation (attenuation, days-to-complete)
node core/data/recipes.verify.js          # every recipe's stats vs. real BJCP ranges
python3 server.test.py                    # telemetry webhook normalization (iSpindel/Brewfather shapes)
```

## License

[PolyForm Noncommercial 1.0.0](LICENSE).
