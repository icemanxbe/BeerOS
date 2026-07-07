// Verifies getAdvisorInsights against constructed batch/recipe/stats fixtures.
// Run: node core/domain/advisor.test.js
// Needs state.js's step/task functions in global scope (advisor.js calls them
// as bare identifiers, matching how it's loaded in the browser after state.js).
const state = require('../state/state.js');
global.getRecipeSteps = state.getRecipeSteps;
global.isTaskDone = state.isTaskDone;
global.taskId = state.taskId;
global.toggleTask = state.toggleTask;
const { getAdvisorInsights } = require('./advisor.js');

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

// No readings, day 3 -> nudge
check('no readings, day 3 -> nudge', firstTitle(getAdvisorInsights({ ...baseBatch }, recipe, { ...baseStats, daysSinceStart: 3 })), 'No gravity readings yet');

// Flat + in-range attenuation -> good
{
  const batch = { ...baseBatch, gravityLogs: [{ date: '2026-06-01', sg: 1.050 }, { date: '2026-06-10', sg: 1.012 }, { date: '2026-06-11', sg: 1.0115 }] };
  const stats = { daysSinceStart: 10, attenuationToDate: 77 }; // (50-11.5)/50*100 ~ 77
  check('flat + in-range attenuation -> good', firstLevel(getAdvisorInsights(batch, recipe, stats)), 'good');
}

// Flat + below-range attenuation -> warning
{
  const batch = { ...baseBatch, gravityLogs: [{ date: '2026-06-01', sg: 1.050 }, { date: '2026-06-10', sg: 1.025 }, { date: '2026-06-11', sg: 1.0245 }] };
  const stats = { daysSinceStart: 10, attenuationToDate: 51 };
  check('flat + below-range attenuation -> warning', firstLevel(getAdvisorInsights(batch, recipe, stats)), 'warning');
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

console.log(`\n${failures === 0 ? 'ALL PASS' : failures + ' FAILURE(S)'}`);
process.exit(failures === 0 ? 0 : 1);
