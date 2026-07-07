// Verifies computeRecipeHistory against constructed batch fixtures.
// Run: node core/domain/recipe-history.test.js
// Needs state.js's task functions + calculators.js's apparentAttenuation in
// global scope (recipe-history.js calls them as bare identifiers, matching
// how it's loaded in the browser after state.js and calculators.js).
const state = require('../state/state.js');
const calculators = require('./calculators.js');
global.isTaskDone = state.isTaskDone;
global.taskId = state.taskId;
global.toggleTask = state.toggleTask;
global.APP = state.APP;
global.apparentAttenuation = calculators.apparentAttenuation;
const { computeRecipeHistory } = require('./recipe-history.js');

let failures = 0;
function check(label, got, expected) {
  const ok = got === expected;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}: got ${got}, expected ${expected}`);
  if (!ok) failures++;
}

const recipe = { yeast: { attenuationLow: 75, attenuationHigh: 82 } };

// No batches for this recipe -> no data
{
  const result = computeRecipeHistory([{ id: 'other', recipeId: 'other-recipe', gravityLogs: [], startDate: '2026-01-01' }], 'my-recipe');
  check('no matching batches -> count 0', result.batchCount, 0);
  check('no matching batches -> avgAttenuation null', result.avgAttenuation, null);
  check('no matching batches -> avgDaysToComplete null', result.avgDaysToComplete, null);
}

// A single matching batch with 2 readings -> count 1, but no "average" (needs 2+)
{
  const batches = [{ id: 'b1', recipeId: 'my-recipe', startDate: '2026-01-01', gravityLogs: [{ date: '2026-01-01', sg: 1.050 }, { date: '2026-01-10', sg: 1.012 }] }];
  const result = computeRecipeHistory(batches, 'my-recipe');
  check('single batch -> count 1', result.batchCount, 1);
  check('single batch -> avgAttenuation still null (needs 2+ data points)', result.avgAttenuation, null);
}

// Two matching batches with readings -> real average attenuation
{
  const batches = [
    { id: 'b1', recipeId: 'my-recipe', startDate: '2026-01-01', gravityLogs: [{ date: '2026-01-01', sg: 1.050 }, { date: '2026-01-10', sg: 1.010 }] }, // 80%
    { id: 'b2', recipeId: 'my-recipe', startDate: '2026-02-01', gravityLogs: [{ date: '2026-02-01', sg: 1.050 }, { date: '2026-02-10', sg: 1.020 }] }  // 60%
  ];
  const result = computeRecipeHistory(batches, 'my-recipe');
  check('two batches -> count 2', result.batchCount, 2);
  check('two batches -> avg attenuation is the mean of 80% and 60%', Math.round(result.avgAttenuation), 70);
}

// Days-to-complete only counts batches with a checked confirm-complete/lager step
{
  const batches = [
    { id: 'due1', recipeId: 'my-recipe', startDate: (() => { const d = new Date(); d.setDate(d.getDate() - 10); return d.toISOString().slice(0, 10); })(), gravityLogs: [] },
    { id: 'due2', recipeId: 'my-recipe', startDate: (() => { const d = new Date(); d.setDate(d.getDate() - 14); return d.toISOString().slice(0, 10); })(), gravityLogs: [] }
  ];
  toggleTask('due1', 'confirm-complete', recipe); // completes "today" -> ~10 days after due1's start
  toggleTask('due2', 'lager', recipe);            // completes "today" -> ~14 days after due2's start
  const result = computeRecipeHistory(batches, 'my-recipe');
  check('days-to-complete averages ~10 and ~14', Math.round(result.avgDaysToComplete), 12);
}

// Batches with an unchecked complete step don't contribute a days-to-complete point
{
  const batches = [{ id: 'nodone', recipeId: 'my-recipe', startDate: '2026-01-01', gravityLogs: [] }];
  const result = computeRecipeHistory(batches, 'my-recipe');
  check('no checked complete step -> avgDaysToComplete null', result.avgDaysToComplete, null);
}

console.log(`\n${failures === 0 ? 'ALL PASS' : failures + ' FAILURE(S)'}`);
process.exit(failures === 0 ? 0 : 1);
