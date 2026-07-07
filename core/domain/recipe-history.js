// Recipe history — aggregates a brewer's own past batches of a given recipe
// into simple averages (attenuation, days to fermentation-complete). This is
// deliberately separate from the Advisor: a plain read of your own past
// numbers, not a new inference rule. Averages only ever come from batches
// that actually have the underlying data (a real second gravity reading, a
// checked confirm-complete/lager step) — nothing is estimated, and a single
// data point never gets labeled an "average" (see the >=2 guard in avg()).

// Shared per-batch read: real attenuation/final-SG from gravityLogs, real
// days-to-complete from a checked confirm-complete/lager step's own
// completion date — the same two "real data" checks computeRecipeHistory
// and mostRecentBatchOfRecipe both need, kept in one place.
function batchOutcome(b) {
  const first = b.gravityLogs[0], last = b.gravityLogs[b.gravityLogs.length - 1];
  const attenuation = (first && last && first !== last) ? apparentAttenuation(first.sg, last.sg) : null;
  const finalSG = last ? last.sg : null;

  const completeKey = ['confirm-complete', 'lager'].find(k => isTaskDone(taskId(b.id, k)));
  let daysToComplete = null;
  if (completeKey) {
    const completedDate = APP.tasksDone[taskId(b.id, completeKey)];
    const days = (new Date(completedDate) - new Date(b.startDate)) / 86400000;
    if (days > 0) daysToComplete = days;
  }
  return { attenuation, finalSG, daysToComplete };
}

function computeRecipeHistory(batches, recipeId) {
  const matches = batches.filter(b => b.recipeId === recipeId);
  const outcomes = matches.map(batchOutcome);

  const avg = arr => arr.length >= 2 ? arr.reduce((sum, v) => sum + v, 0) / arr.length : null;
  return {
    batchCount: matches.length,
    avgAttenuation: avg(outcomes.map(o => o.attenuation).filter(v => v !== null)),
    avgDaysToComplete: avg(outcomes.map(o => o.daysToComplete).filter(v => v !== null))
  };
}

// The single most recent OTHER batch of this recipe — surfaced on the batch
// detail page as "Last time you brewed this," a point of comparison right
// when you're mid-brew, not just when browsing the recipe library.
function mostRecentBatchOfRecipe(batches, recipeId, excludeBatchId) {
  const matches = batches
    .filter(b => b.recipeId === recipeId && b.id !== excludeBatchId)
    .sort((a, b) => b.startDate.localeCompare(a.startDate));
  if (!matches.length) return null;
  const b = matches[0];
  const outcome = batchOutcome(b);
  return {
    name: b.name,
    finalSG: outcome.finalSG,
    attenuation: outcome.attenuation,
    daysToComplete: outcome.daysToComplete !== null ? Math.round(outcome.daysToComplete) : null,
    notes: b.notes || null
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { computeRecipeHistory, mostRecentBatchOfRecipe };
}
