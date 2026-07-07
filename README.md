# BeerOS

A self-hosted batch tracker and reference library for home beer brewers. No build step, no framework, no account — a Python stdlib server plus a SQLite file on one side, plain HTML/CSS/JS on the other.

**Status:** actively developed, not yet a 1.0. This repo was reset from an earlier fork-of-[MeadOS](https://github.com/icemanxbe/MeadOS) attempt that carried too much mead/cider-shaped dead code; everything below was built from scratch for beer only.

## What's here

**Batches**
- Track batches from pitch to package: gravity log with live OG/FG/ABV/attenuation-so-far, and a linear fermentation-completion projection once you have two readings.
- A per-recipe step checklist (brew day → fermentation checks → dry hop / diacetyl rest / lagering → packaging) generated from the recipe's own grain bill, hop schedule, and yeast — not hand-authored, so it can't drift out of sync with the recipe.
- Batch status (fermenting / conditioning / done) follows your checked steps and gravity trend automatically, with a one-click manual override when you want to set it yourself.
- Search, filter, sort, pagination, CSV export, and batch deletion.
- An animated SVG fermenter/keg per batch — liquid tint from the recipe's real computed SRM, rising-bubble/krausen animation while fermenting, settling particles while conditioning, a kegged-and-capped icon when done.

**Recipe Library** — 35 recipes (20 original US/European/Belgian styles plus 15 homebrew-clone-inspired takes on real commercial beers, built from each beer's published ABV/style rather than proprietary formulas). Every OG/FG/ABV/IBU/SRM is computed live from the actual grain bill and hop schedule and checked against real BJCP 2021 ranges — nothing is a hand-typed number. "Brew This Recipe" starts a tracked batch directly from any recipe.

**Ingredient libraries** — browsable reference views for 32 malts/grains, 16 hop varieties, 20 yeast strains, and water chemistry (6 brewing salts + 4 classic historical city water profiles), independent of any specific recipe.

**Brewing Tools** — live calculators for OG (grain bill), ABV (standard + high-gravity), IBU (Tinseth), color (Morey SRM/EBC), strike water temperature, priming sugar (bottle carbonation), force carbonation (kegging — pressure/temp/CO₂-volumes), residual alkalinity, yeast pitch rate, refractometer FG correction, and brewhouse efficiency. Every formula is unit-tested against a written specification (see Knowledge Base below); the force-carbonation calculator specifically interpolates over a real cited reference table rather than trusting an unverifiable formula.

**Knowledge Base** ([docs/knowledge-base/](docs/knowledge-base/)) — a ~77,000-word, source-cited reference on ingredients, equipment, process, troubleshooting, recipe design, and every calculator's underlying math, written for brewers from complete beginners to all-grain veterans. This is also the spec the calculator code is verified against.

## What's not here yet

- A reasoning/advisor layer (fermentation-health diagnosis, recommendations) — deferred; a substantial undertaking on its own.
- Equipment/multi-vessel tracking (e.g. animating a transfer from fermenter to a bright tank).
- PWA packaging (manifest/icons).

## Running it

```
python3 server.py --port 8200 --db /path/to/beeros.db
```

Serves the app as static files plus a tiny `GET/POST /api/state` JSON-blob API backed by SQLite. Single shared instance, no multi-user auth — add that complexity if/when a second brewer or device actually needs it.

Run the test suites with Node:
```
node core/domain/calculators.test.js   # calculator functions vs. the KB's worked examples
node core/data/recipes.verify.js       # every recipe's stats vs. real BJCP ranges
```

## License

[PolyForm Noncommercial 1.0.0](LICENSE).
