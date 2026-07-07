// Verifies getAdvisorInsights against constructed batch/recipe/stats fixtures.
// Run: node core/domain/advisor.test.js
// Needs state.js's step/task functions in global scope (advisor.js calls them
// as bare identifiers, matching how it's loaded in the browser after state.js).
const state = require('../state/state.js');
global.getRecipeSteps = state.getRecipeSteps;
global.isTaskDone = state.isTaskDone;
global.taskId = state.taskId;
global.toggleTask = state.toggleTask;
global.APP = state.APP;
global.apparentAttenuation = require('./calculators.js').apparentAttenuation;
global.computeRecipeHistory = require('./recipe-history.js').computeRecipeHistory;
const { getAdvisorInsights } = require('./advisor.js');
const daysAgo = n => { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10); };

let failures = 0;
function check(label, got, expected) {
  const ok = got === expected;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}: got ${got}, expected ${expected}`);
  if (!ok) failures++;
}
function firstTitle(insights) { return insights.length ? insights[0].title : null; }
function firstLevel(insights) { return insights.length ? insights[0].level : null; }

const recipe = {
  mashTempC: 66, fermentTempC: { low: 18, high: 20 }, dryHop: null,
  hopSchedule: [{ name: 'Test Hop', minutes: 60, weightG: 20, aaPct: 6 }],
  yeast: { name: 'Test Yeast', tempLowC: 18, tempHighC: 22, attenuationLow: 75, attenuationHigh: 82 }
};

const baseBatch = { id: 'b1', startDate: '2026-06-01', gravityLogs: [], status: 'fermenting', statusManual: false };
const baseStats = { daysSinceStart: 0, attenuationToDate: null };

// No readings, too early
check('no readings, day 1 -> no insight', getAdvisorInsights({ ...baseBatch }, recipe, { ...baseStats, daysSinceStart: 1 }).length, 0);

// No readings, day 3 -> nudge, with evidence/action split
{
  const insights = getAdvisorInsights({ ...baseBatch }, recipe, { ...baseStats, daysSinceStart: 3 });
  check('no readings, day 3 -> nudge', firstTitle(insights), 'No gravity readings yet');
  check('no readings -> evidence has no action verb', insights[0].detail.includes('Log a reading'), false);
  check('no readings -> action is the suggested step', insights[0].action, "Log a reading to start tracking real progress instead of the recipe's estimate.");
}

// Flat + in-range attenuation -> good, with a suggested next step
{
  const batch = { ...baseBatch, gravityLogs: [{ date: '2026-06-01', sg: 1.050 }, { date: '2026-06-10', sg: 1.012 }, { date: '2026-06-11', sg: 1.0115 }] };
  const stats = { daysSinceStart: 10, attenuationToDate: 77 }; // (50-11.5)/50*100 ~ 77
  const insights = getAdvisorInsights(batch, recipe, stats);
  check('flat + in-range attenuation -> good', firstLevel(insights), 'good');
  check('good insight has a suggested next step', typeof insights[0].action, 'string');
}

// Flat + below-range attenuation -> warning, with a suggested next step
{
  const batch = { ...baseBatch, gravityLogs: [{ date: '2026-06-01', sg: 1.050 }, { date: '2026-06-10', sg: 1.025 }, { date: '2026-06-11', sg: 1.0245 }] };
  const stats = { daysSinceStart: 10, attenuationToDate: 51 };
  const insights = getAdvisorInsights(batch, recipe, stats);
  check('flat + below-range attenuation -> warning', firstLevel(insights), 'warning');
  check('warning insight has a suggested next step', insights[0].action, 'Double-check pitch rate and temperature, and consider a gentle rouse before assuming it\'s finished.');
  check('warning detail has no temp note without sensor data', insights[0].detail.includes('recent temperature'), false);
}

// Same stall, but with a single real cold sensor reading (below
// recipe.fermentTempC.low) -> the warning names it as a plausible explanation
{
  const batch = { ...baseBatch, gravityLogs: [{ date: '2026-06-01', sg: 1.050 }, { date: '2026-06-10', sg: 1.025 }, { date: '2026-06-11', sg: 1.0245, tempC: 14.2 }] };
  const stats = { daysSinceStart: 10, attenuationToDate: 51 };
  const insights = getAdvisorInsights(batch, recipe, stats);
  check('cold reading -> warning detail cites it', insights[0].detail.includes('14.2°C, below this recipe\'s 18-20°C range'), true);
}

// Same stall, but the latest sensor reading is IN range -> no temp note added
// (a stall with normal temperature shouldn't imply a temperature cause)
{
  const batch = { ...baseBatch, gravityLogs: [{ date: '2026-06-01', sg: 1.050 }, { date: '2026-06-10', sg: 1.025 }, { date: '2026-06-11', sg: 1.0245, tempC: 19.0 }] };
  const stats = { daysSinceStart: 10, attenuationToDate: 51 };
  const insights = getAdvisorInsights(batch, recipe, stats);
  check('in-range reading -> no temp note', insights[0].detail.includes('recent temperature'), false);
}

// A single cold-looking reading buried among several in-range ones (e.g. a
// fridge/compressor cycling) -> the median of the last 3 readings stays
// in range, so no note (this is exactly the false-positive review feedback
// flagged: sensors log far more often than a hydrometer, so "latest reading"
// alone isn't representative)
{
  const batch = {
    ...baseBatch,
    gravityLogs: [
      { date: '2026-06-01', sg: 1.050 },
      { date: '2026-06-10', sg: 1.025, tempC: 19.2 },
      { date: '2026-06-10', sg: 1.0248, tempC: 19.0 },
      { date: '2026-06-11', sg: 1.0245, tempC: 14.2 } // one-off blip
    ]
  };
  const stats = { daysSinceStart: 10, attenuationToDate: 51 };
  const insights = getAdvisorInsights(batch, recipe, stats);
  check('one-off cold blip among in-range readings -> no note (median filters it out)', insights[0].detail.includes('recent temperature'), false);
}

// A genuinely sustained cold run (last 3 readings all below range) -> flagged,
// using the median of those readings rather than just the latest one
{
  const batch = {
    ...baseBatch,
    gravityLogs: [
      { date: '2026-06-01', sg: 1.050 },
      { date: '2026-06-10', sg: 1.025, tempC: 15.0 },
      { date: '2026-06-10', sg: 1.0248, tempC: 14.0 },
      { date: '2026-06-11', sg: 1.0245, tempC: 14.5 }
    ]
  };
  const stats = { daysSinceStart: 10, attenuationToDate: 51 };
  const insights = getAdvisorInsights(batch, recipe, stats);
  check('sustained cold run -> flagged using the median (14.5, not the max/min)', insights[0].detail.includes('14.5°C, below this recipe\'s 18-20°C range'), true);
  check('wording is evidence-oriented ("contributing to"), not causal ("could explain it")', insights[0].detail.includes('this could be contributing to the slowdown'), true);
}

// Still dropping, past due day, below range -> info
{
  const batch = { ...baseBatch, gravityLogs: [{ date: '2026-06-01', sg: 1.050 }, { date: '2026-06-11', sg: 1.030 }, { date: '2026-06-12', sg: 1.025 }] };
  const stats = { daysSinceStart: 11, attenuationToDate: 50 };
  check('still dropping past due day, below range -> info', firstLevel(getAdvisorInsights(batch, recipe, stats)), 'info');
}

// Still dropping, on track -> no insight
{
  const batch = { ...baseBatch, gravityLogs: [{ date: '2026-06-01', sg: 1.050 }, { date: '2026-06-04', sg: 1.030 }, { date: '2026-06-05', sg: 1.025 }] };
  const stats = { daysSinceStart: 5, attenuationToDate: 50 };
  check('still dropping, on track -> no insight', getAdvisorInsights(batch, recipe, stats).length, 0);
}

// Still dropping, on track, WITH a projection available -> forward-looking
// info insight reusing the projection's own numbers (nothing new computed)
{
  const batch = { ...baseBatch, gravityLogs: [{ date: '2026-06-01', sg: 1.050 }, { date: '2026-06-04', sg: 1.030 }, { date: '2026-06-05', sg: 1.025 }] };
  const stats = { daysSinceStart: 5, attenuationToDate: 50, projection: { fgLow: 1.010, fgHigh: 1.012, daysToEarliest: 3.4, daysToLatest: 4.9 } };
  const insights = getAdvisorInsights(batch, recipe, stats);
  check('on track + projection -> title mentions days', firstTitle(insights), 'On track — projected done in about 3 days');
  check('on track + projection -> level info', firstLevel(insights), 'info');
  check('on track + projection -> detail cites the projected FG range', insights[0].detail.includes('1.010-1.012'), true);
}

// Personal pace: compares THIS batch's day count against the brewer's own
// average for this exact recipe (see recipe-history.js), not the yeast's
// generic textbook range or the recipe's own day-based schedule. Takes
// priority over both of those generic rules when it has something to say.
{
  const paceRecipe = { ...recipe, id: 'pace-recipe' };
  APP.batches = [
    { id: 'prior1', recipeId: 'pace-recipe', startDate: daysAgo(10), gravityLogs: [] },
    { id: 'prior2', recipeId: 'pace-recipe', startDate: daysAgo(12), gravityLogs: [] }
  ];
  toggleTask('prior1', 'confirm-complete', paceRecipe); // completes "today" -> ~10 days
  toggleTask('prior2', 'confirm-complete', paceRecipe); // completes "today" -> ~12 days
  // avg ~11 days

  const slowBatch = { ...baseBatch, id: 'pace-slow', recipeId: 'pace-recipe', gravityLogs: [{ date: '2026-06-01', sg: 1.050 }, { date: '2026-06-04', sg: 1.030 }, { date: '2026-06-05', sg: 1.025 }] };
  const slowInsights = getAdvisorInsights(slowBatch, paceRecipe, { daysSinceStart: 14, attenuationToDate: 50 }); // 3+ days over the ~11 day average, and past paceRecipe's own day-10 check-in
  check('slower than personal pace -> flagged first', firstTitle(slowInsights), 'Slower than your usual pace for this recipe');
  check('slower than personal pace -> level info', firstLevel(slowInsights), 'info');
  check('personal pace takes priority over the generic check-in-day rule', slowInsights.some(i => i.title === 'Still fermenting past the usual check-in day'), false);

  const onPaceBatch = { ...baseBatch, id: 'pace-ontrack', recipeId: 'pace-recipe', gravityLogs: [{ date: '2026-06-01', sg: 1.050 }, { date: '2026-06-04', sg: 1.030 }, { date: '2026-06-05', sg: 1.025 }] };
  const onPaceInsights = getAdvisorInsights(onPaceBatch, paceRecipe, { daysSinceStart: 12, attenuationToDate: 50 }); // only ~1 day over average, within the slack
  check('within personal-pace slack -> not flagged as slow', onPaceInsights.some(i => i.title === 'Slower than your usual pace for this recipe'), false);

  APP.batches = []; // reset so later tests see no personal history
}

// Custom batch (no recipe) -> no insight even with readings
{
  const batch = { ...baseBatch, gravityLogs: [{ date: '2026-06-01', sg: 1.050 }, { date: '2026-06-10', sg: 1.012 }] };
  check('no recipe -> no insight', getAdvisorInsights(batch, null, { daysSinceStart: 10, attenuationToDate: 76 }).length, 0);
}

// Done status -> no insight regardless of data
{
  const batch = { ...baseBatch, status: 'done', gravityLogs: [{ date: '2026-06-01', sg: 1.050 }, { date: '2026-06-10', sg: 1.030 }] };
  check('done status -> no insight', getAdvisorInsights(batch, recipe, { daysSinceStart: 30, attenuationToDate: 40 }).length, 0);
}

// Due-step reminder: package due once confirm-complete is already checked,
// surfaced ALONGSIDE the "looks done" insight (not instead of it)
{
  const batch = { ...baseBatch, id: 'due1', gravityLogs: [{ date: '2026-06-01', sg: 1.050 }, { date: '2026-06-10', sg: 1.012 }, { date: '2026-06-11', sg: 1.0115 }] };
  toggleTask(batch.id, 'confirm-complete', recipe);
  const insights = getAdvisorInsights(batch, recipe, { daysSinceStart: 13, attenuationToDate: 77 });
  check('package due -> 2 insights (good + due)', insights.length, 2);
  check('package due -> second is the due-step reminder', insights[1] && insights[1].title, 'Package is due');
}

// Due-step reminder never jumps ahead: with dry hop in the recipe, dry-hop
// must not be suggested before confirm-complete is actually checked, even
// once dry-hop's own day has passed (mirrors the step's own hop-creep warning)
const dryHopRecipe = { ...recipe, dryHop: [{ name: 'Citra', weightG: 30 }] };
{
  const batch = { ...baseBatch, id: 'due2', gravityLogs: [{ date: '2026-06-01', sg: 1.050 }, { date: '2026-06-10', sg: 1.012 }, { date: '2026-06-11', sg: 1.0115 }] };
  const insights = getAdvisorInsights(batch, dryHopRecipe, { daysSinceStart: 12, attenuationToDate: 77 });
  check('dry hop not suggested before confirm-complete checked', (insights.find(i => i.title === 'Dry Hop is due')), undefined);
}
{
  const batch = { ...baseBatch, id: 'due3', gravityLogs: [{ date: '2026-06-01', sg: 1.050 }, { date: '2026-06-10', sg: 1.012 }, { date: '2026-06-11', sg: 1.0115 }] };
  toggleTask(batch.id, 'confirm-complete', dryHopRecipe);
  const insights = getAdvisorInsights(batch, dryHopRecipe, { daysSinceStart: 12, attenuationToDate: 77 });
  check('dry hop suggested once confirm-complete is checked and day has arrived', insights.some(i => i.title === 'Dry Hop is due'), true);
}

// Upcoming tier: package step 2 days out (still within the window) after
// confirm-complete is checked -> "coming up", not yet "due"
{
  const batch = { ...baseBatch, id: 'due4', gravityLogs: [{ date: '2026-06-01', sg: 1.050 }, { date: '2026-06-10', sg: 1.012 }, { date: '2026-06-11', sg: 1.0115 }] };
  toggleTask(batch.id, 'confirm-complete', recipe);
  const insights = getAdvisorInsights(batch, recipe, { daysSinceStart: 11, attenuationToDate: 77 }); // package day is 13
  check('package 2 days out -> "coming up"', insights.some(i => i.title === 'Package coming up in 2 days'), true);
}
// Outside the upcoming window entirely -> no due/upcoming insight yet
{
  const batch = { ...baseBatch, id: 'due5', gravityLogs: [{ date: '2026-06-01', sg: 1.050 }, { date: '2026-06-08', sg: 1.030 }, { date: '2026-06-09', sg: 1.025 }] };
  toggleTask(batch.id, 'confirm-complete', recipe);
  const insights = getAdvisorInsights(batch, recipe, { daysSinceStart: 9, attenuationToDate: 50 }); // package day 13, 4 days out
  check('4 days out -> no due/upcoming insight yet', insights.some(i => i.title && i.title.startsWith('Package')), false);
}

// Recipe-authored yeast notes surface as their own insight while a batch is active
{
  const notedRecipe = { ...recipe, yeast: { ...recipe.yeast, name: 'Belgian Abbey (e.g. Wyeast 1214)', notes: 'Blended attenuation runs higher than the strain rating alone would suggest.' } };
  const batch = { ...baseBatch, id: 'notes1', gravityLogs: [{ date: '2026-06-01', sg: 1.050 }, { date: '2026-06-04', sg: 1.030 }, { date: '2026-06-05', sg: 1.025 }] };
  const insights = getAdvisorInsights(batch, notedRecipe, { daysSinceStart: 5, attenuationToDate: 50 });
  check('yeast note surfaced', insights.some(i => i.title === 'About Belgian Abbey' && i.detail === notedRecipe.yeast.notes), true);
}

console.log(`\n${failures === 0 ? 'ALL PASS' : failures + ' FAILURE(S)'}`);
process.exit(failures === 0 ? 0 : 1);
