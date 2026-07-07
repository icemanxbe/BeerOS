// Cross-references recipes <-> the malt/hop/yeast reference libraries by
// name, since recipe ingredient entries store a display name, not a foreign
// key into the library data. Matching is heuristic (there's no clean join),
// so it's built to fail toward "no link shown" rather than a wrong one —
// a missing cross-reference is honest; a false one isn't.

function normalizeIngredientName(s) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}
function stripParens(s) {
  return s.replace(/\s*\([^)]*\)/g, '').trim();
}

// Malts/hops: recipe ingredient names are plain (e.g. "2-Row Pale Malt",
// "Cascade") with no "(e.g. ...)" pattern, so strip any parenthetical
// qualifier from both sides before comparing.
function nameBasedMatch(recipeIngredientName, libraryName) {
  const a = normalizeIngredientName(stripParens(recipeIngredientName));
  const b = normalizeIngredientName(stripParens(libraryName));
  return !!a && !!b && (a === b || a.includes(b) || b.includes(a));
}

// Yeast: recipe yeast names deliberately keep "(e.g. Product Name)" as the
// actual identifying detail (the display name itself is just a style
// descriptor like "Clean American Ale"), so match the library entry's own
// id (e.g. "us-05", "wyeast-1214") as a substring of the recipe's name
// instead of comparing display names.
function yeastIdMatch(recipeYeastName, libraryYeastId) {
  const recipeNorm = normalizeIngredientName(recipeYeastName);
  const idNorm = normalizeIngredientName(libraryYeastId);
  return !!idNorm && recipeNorm.includes(idNorm);
}

function recipesUsingMalt(recipes, maltEntry) {
  return recipes.filter(r => r.grainBill.some(g => nameBasedMatch(g.name, maltEntry.name)));
}
function recipesUsingHop(recipes, hopEntry) {
  return recipes.filter(r =>
    r.hopSchedule.some(h => nameBasedMatch(h.name, hopEntry.name)) ||
    (r.dryHop || []).some(d => nameBasedMatch(d.name, hopEntry.name))
  );
}
function recipesUsingYeast(recipes, yeastEntry) {
  return recipes.filter(r => yeastIdMatch(r.yeast.name, yeastEntry.id));
}

// Reverse direction: given one recipe ingredient row, which library entries
// (if any) describe it — used to link a recipe's grain bill/hop schedule
// rows out to the reference libraries.
function maltsMatchingName(malts, ingredientName) {
  return malts.filter(m => nameBasedMatch(ingredientName, m.name));
}
function hopsMatchingName(hops, ingredientName) {
  return hops.filter(h => nameBasedMatch(ingredientName, h.name));
}
function yeastsMatchingRecipeYeast(yeasts, recipeYeastName) {
  return yeasts.filter(y => yeastIdMatch(recipeYeastName, y.id));
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    nameBasedMatch, yeastIdMatch,
    recipesUsingMalt, recipesUsingHop, recipesUsingYeast,
    maltsMatchingName, hopsMatchingName, yeastsMatchingRecipeYeast
  };
}
