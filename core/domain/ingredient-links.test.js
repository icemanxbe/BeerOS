// Verifies ingredient-links matching against the real recipe/ingredient
// data (not synthetic fixtures) — the risk here is false positives/negatives
// against real names, which synthetic data can't surface.
// Run: node core/domain/ingredient-links.test.js
const fs = require('fs');
const path = require('path');
// malts.js/hops.js/yeasts.js are browser-only (no module.exports), unlike
// recipes.js — load them the same way the project's other cross-file
// verification scripts do (see e.g. earlier BeerOS work), resolved from
// this file's own directory so it works regardless of invocation cwd.
function loadFn(relFile, fnName) {
  const src = fs.readFileSync(path.join(__dirname, relFile), 'utf8');
  const wrapped = src + `\nmodule.exports = { ${fnName} };`;
  const m = { exports: {} };
  new Function('module', 'exports', wrapped)(m, m.exports);
  return m.exports[fnName];
}
const { BUILTIN_RECIPES } = require('../data/recipes.js');
const recipes = BUILTIN_RECIPES();
const malts = loadFn('../data/malts.js', 'BUILTIN_MALTS')();
const hops = loadFn('../data/hops.js', 'BUILTIN_HOPS')();
const yeasts = loadFn('../data/yeasts.js', 'BUILTIN_YEASTS')();
const {
  nameBasedMatch, yeastIdMatch, recipesUsingMalt, recipesUsingHop, recipesUsingYeast,
  maltsMatchingName, hopsMatchingName, yeastsMatchingRecipeYeast
} = require('./ingredient-links.js');

let failures = 0;
function check(label, got, expected) {
  const ok = got === expected;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}: got ${got}, expected ${expected}`);
  if (!ok) failures++;
}

// Direct name matches (parenthetical qualifiers ignored)
check('malt: exact match after stripping region suffix', nameBasedMatch('2-Row Pale Malt', '2-Row Pale Malt (American)'), true);
check('hop: compound name contains library entry', nameBasedMatch('Columbus/CTZ', 'Columbus'), true);
check('malt: unrelated names do not match', nameBasedMatch('Crystal 60L', 'Pilsner Malt'), false);

// Yeast matches by id, not display name (display name is a style descriptor, not a product)
check('yeast: recipe name contains library id', yeastIdMatch('American Ale (e.g. Fermentis US-05)', 'us-05'), true);
check('yeast: unrelated id does not match', yeastIdMatch('American Ale (e.g. Fermentis US-05)', 'wyeast-1056'), false);

// Cascade hop should show up in at least one real recipe (it's a common American hop)
{
  const cascade = hops.find(h => h.id === 'cascade');
  const used = recipesUsingHop(recipes, cascade);
  check('Cascade used in at least one recipe', used.length > 0, true);
}

// US-05 should show up in multiple recipes (it's the most commonly referenced clean ale yeast)
{
  const us05 = yeasts.find(y => y.id === 'us-05');
  const used = recipesUsingYeast(recipes, us05);
  check('US-05 used in multiple recipes', used.length > 1, true);
}

// 2-Row Pale Malt should match despite the library's region qualifier
{
  const pale2row = malts.find(m => m.id === 'pale-2row');
  const used = recipesUsingMalt(recipes, pale2row);
  check('2-Row Pale Malt used in at least one recipe', used.length > 0, true);
}

// Reverse direction: a recipe's own yeast name should resolve back to the same library entry
{
  const recipeWithUS05 = recipes.find(r => yeastIdMatch(r.yeast.name, 'us-05'));
  const matches = yeastsMatchingRecipeYeast(yeasts, recipeWithUS05.yeast.name);
  check('reverse yeast lookup finds us-05', matches.some(y => y.id === 'us-05'), true);
}

// No false positives: an entirely fabricated ingredient name should match nothing
check('nonsense malt name matches nothing', maltsMatchingName(malts, 'Completely Fictional Grain XYZ').length, 0);
check('nonsense hop name matches nothing', hopsMatchingName(hops, 'Completely Fictional Hop XYZ').length, 0);

console.log(`\n${failures === 0 ? 'ALL PASS' : failures + ' FAILURE(S)'}`);
process.exit(failures === 0 ? 0 : 1);
