// Recipe history — aggregates a brewer's own past batches of a given recipe
// into simple averages (attenuation, days to fermentation-complete). This is
// deliberately separate from the Advisor: a plain read of your own past
// numbers, not a new inference rule. Averages only ever come from batches
// that actually have the underlying data (a real second gravity reading, a
// checked confirm-complete/lager step) — nothing is estimated, and a single
// data point never gets labeled an "average" (see the >=2 guard in avg()).

function computeRecipeHistory(batches, recipeId) {
  const matches = batches.filter(b => b.recipeId === recipeId);
  const attenuations = [];
  const daysToComplete = [];

  matches.forEach(b => {
    const first = b.gravityLogs[0], last = b.gravityLogs[b.gravityLogs.length - 1];
    if (first && last && first !== last) {
      attenuations.push(apparentAttenuation(first.sg, last.sg));
    }
    const completeKey = ['confirm-complete', 'lager'].find(k => isTaskDone(taskId(b.id, k)));
    if (completeKey) {
      const completedDate = APP.tasksDone[taskId(b.id, completeKey)];
      const days = (new Date(completedDate) - new Date(b.startDate)) / 86400000;
      if (days > 0) daysToComplete.push(days);
    }
  });

  const avg = arr => arr.length >= 2 ? arr.reduce((sum, v) => sum + v, 0) / arr.length : null;
  return {
    batchCount: matches.length,
    avgAttenuation: avg(attenuations),
    avgDaysToComplete: avg(daysToComplete)
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { computeRecipeHistory };
}
