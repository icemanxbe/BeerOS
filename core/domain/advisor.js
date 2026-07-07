// Batch Advisor — rule-based fermentation insights, not a fabricated diagnosis
// engine. Every insight cites a real number already computed elsewhere
// (gravity trend, the recipe's own yeast attenuation range, the recipe's own
// step-day offsets) — nothing here invents a new formula or threshold beyond
// the same 0.002 SG "flat" threshold deriveBatchStatus already uses, so the
// Advisor can never disagree with the status/step logic it's built on top of.

const ADVISOR_FLAT_SG_DELTA = 0.002; // same threshold as deriveBatchStatus in state.js
const ADVISOR_ATTENUATION_SLACK = 3; // percentage points below the yeast's low end still counted as "in range"
const ADVISOR_TRIVIAL_STEP_KEYS = ['brew-day', 'check-fermentation']; // one-off "did this happen" boxes many brewers won't bother ticking — never gate a later reminder on them
const ADVISOR_DUE_STEP_KEYS = ['dry-hop', 'diacetyl-rest', 'package']; // confirm-complete/lager are covered by the gravity-based rules below
const ADVISOR_UPCOMING_WINDOW_DAYS = 2; // "coming up in N days" starts this far ahead of the step's own day
const ADVISOR_PERSONAL_PACE_SLACK_DAYS = 2; // days over your own average before it's worth mentioning, not just normal variance

// The one deliberately-chosen history-aware rule (see recipe-history.js):
// compares THIS batch's day count against the brewer's own past average for
// this exact recipe, not the yeast's generic textbook range. Only fires
// while still actively fermenting and only once there's real personal data
// (2+ prior completions) — a single comparison axis, not a running
// commentary on every past batch.
function getPersonalPaceInsight(batch, recipe, stats) {
  if (isTaskDone(taskId(batch.id, 'confirm-complete')) || isTaskDone(taskId(batch.id, 'lager'))) return null;
  const history = computeRecipeHistory(APP.batches, batch.recipeId);
  if (history.avgDaysToComplete === null) return null;
  const avgDays = Math.round(history.avgDaysToComplete);
  const daysOver = stats.daysSinceStart - avgDays;
  if (daysOver < ADVISOR_PERSONAL_PACE_SLACK_DAYS) return null;
  return {
    level: 'info',
    title: 'Slower than your usual pace for this recipe',
    detail: `Your past batches of this recipe typically reached fermentation-complete in about ${avgDays} day(s). This batch is currently on day ${stats.daysSinceStart}.`,
    action: `Not necessarily a problem — but worth a closer look if it keeps falling behind your own pattern.`
  };
}

// Folds real temperature evidence (from a hooked-up sensor — see mergeTelemetry
// in state.js) into the existing stall warning rather than a separate
// temperature insight: a cold reading is one of the most common real
// explanations for a stalled fermentation, so when the data is there, name
// it as evidence instead of leaving the brewer to guess. Silent whenever no
// device is reporting temperature, or the latest reading is in range.
function getColdTempNote(batch, recipe) {
  const withTemp = batch.gravityLogs.filter(g => g.tempC !== undefined && g.tempC !== null);
  if (!withTemp.length) return '';
  const latestTemp = withTemp[withTemp.length - 1].tempC;
  if (latestTemp >= recipe.fermentTempC.low) return '';
  return ` Your last logged temperature was ${latestTemp.toFixed(1)}°C, below this recipe's ${recipe.fermentTempC.low}-${recipe.fermentTempC.high}°C range — that alone could explain it.`;
}

// The next unchecked NON-TRIVIAL step in the recipe's own chronological order
// (getRecipeSteps already returns steps sorted by day), skipping brew-day/
// check-fermentation so this doesn't silently stay stuck on "next: brew day"
// forever for brewers who never bother checking those two boxes. Reused by
// both the fermentation-health rules and the due-step reminder, so "next
// step" always means the same thing.
function nextGatedStep(batch, steps) {
  return steps.filter(s => !ADVISOR_TRIVIAL_STEP_KEYS.includes(s.key)).find(s => !isTaskDone(taskId(batch.id, s.key)));
}

// Surfaces the next actionable step (dry hop / diacetyl rest / package) once
// it's due or coming up within a couple of days, but only when it's
// genuinely NEXT — since nextGatedStep respects chronological order, this
// can't fire "dry hop" before "confirm fermentation complete" is actually
// checked, matching the step's own warning that dry hopping too early risks
// restarting fermentation.
function getDueStepInsight(batch, recipe, stats, steps) {
  const next = nextGatedStep(batch, steps);
  if (!next || !ADVISOR_DUE_STEP_KEYS.includes(next.key)) return null;
  const daysUntil = next.day - stats.daysSinceStart;
  if (daysUntil > ADVISOR_UPCOMING_WINDOW_DAYS) return null;
  const action = `${next.desc.charAt(0).toLowerCase()}${next.desc.slice(1)}`;
  if (daysUntil <= 0) {
    return { level: 'info', title: `${next.title} is due`, detail: `Based on this recipe's schedule, day ${next.day} is when to ${action}` };
  }
  return { level: 'info', title: `${next.title} coming up in ${daysUntil} day${daysUntil === 1 ? '' : 's'}`, detail: `Based on this recipe's schedule, day ${next.day} is when to ${action}` };
}

function getAdvisorInsights(batch, recipe, stats) {
  if (batch.status === 'done') return []; // no fermentation advice once packaged

  const logs = batch.gravityLogs;
  const daysSinceStart = stats.daysSinceStart;

  if (!logs.length) {
    if (daysSinceStart < 2) return [];
    return [{
      level: 'info', title: 'No gravity readings yet',
      detail: `It's been ${daysSinceStart} day(s) since you started this batch.`,
      action: `Log a reading to start tracking real progress instead of the recipe's estimate.`
    }];
  }

  if (!recipe) return []; // no yeast attenuation range to reason about without a recipe

  const steps = getRecipeSteps(recipe);
  const insights = [];

  const last = logs[logs.length - 1];
  const prev = logs.length >= 2 ? logs[logs.length - 2] : null;
  const isFlat = !!prev && Math.abs(prev.sg - last.sg) <= ADVISOR_FLAT_SG_DELTA;
  const att = stats.attenuationToDate;
  const { attenuationLow, attenuationHigh } = recipe.yeast;

  const completeStep = steps.find(s => s.key === 'confirm-complete' || s.key === 'lager');
  const completeStepDue = !!completeStep && daysSinceStart >= completeStep.day;
  // Personal history is more specific than the recipe's own generic schedule
  // or a fresh-batch projection, so it takes priority over both when it has
  // something to say (computed once up front, checked below).
  const personalPace = !isFlat ? getPersonalPaceInsight(batch, recipe, stats) : null;

  if (att !== null) {
    if (isFlat && att >= attenuationLow - ADVISOR_ATTENUATION_SLACK) {
      insights.push({
        level: 'good', title: 'Looks done fermenting',
        detail: `Gravity hasn't moved in your last two readings (${prev.sg.toFixed(3)} → ${last.sg.toFixed(3)}), and attenuation is ${att.toFixed(0)}% — within this yeast's usual ${attenuationLow}-${attenuationHigh}% range.`,
        action: completeStep ? `Check the "${completeStep.title}" step below if you haven't, then proceed with packaging when you're ready.` : null
      });
    } else if (isFlat && att < attenuationLow - ADVISOR_ATTENUATION_SLACK) {
      insights.push({
        level: 'warning', title: 'Gravity flat below expected attenuation',
        detail: `Gravity is flat at ${last.sg.toFixed(3)} (${att.toFixed(0)}% attenuation), short of this yeast's usual ${attenuationLow}-${attenuationHigh}% range. This can mean a stalled fermentation.${getColdTempNote(batch, recipe)}`,
        action: `Double-check pitch rate and temperature, and consider a gentle rouse before assuming it's finished.`
      });
    } else if (personalPace) {
      insights.push(personalPace);
    } else if (!isFlat && completeStepDue && att < attenuationLow) {
      insights.push({
        level: 'info', title: 'Still fermenting past the usual check-in day',
        detail: `You're ${daysSinceStart - completeStep.day} day(s) past this recipe's usual "${completeStep.title}" check-in, and gravity is still dropping (${att.toFixed(0)}% so far).`,
        action: `Not necessarily a problem — some batches just run longer — but worth a closer look if it keeps going.`
      });
    } else if (!isFlat && stats.projection) {
      // Still dropping and nothing's wrong yet — reuses the same linear
      // projection already shown in the stat-row hint, just voiced as
      // forward-looking Advisor evidence instead of leaving this case silent.
      const { fgLow, fgHigh, daysToEarliest } = stats.projection;
      const days = Math.round(daysToEarliest);
      insights.push({
        level: 'info',
        title: days <= 0 ? 'On track to finish any day now' : `On track — projected done in about ${days} day${days === 1 ? '' : 's'}`,
        detail: `Based on your current gravity trend, you're progressing as expected — at this rate, final gravity should land around ${fgLow.toFixed(3)}-${fgHigh.toFixed(3)} in roughly ${days} more day(s).`
      });
    }
  }

  // A stall warning is already urgent on its own — skip the routine due-step
  // reminder in that case so it doesn't get lost underneath it.
  if (!insights.some(i => i.level === 'warning')) {
    const dueStep = getDueStepInsight(batch, recipe, stats, steps);
    if (dueStep) insights.push(dueStep);
  }

  // Recipe-authored yeast quirks (e.g. a blend whose apparent attenuation
  // runs unusually high) — real, already-verified content, surfaced only
  // while there's an active batch to apply it to rather than as a static doc.
  if (recipe.yeast.notes) {
    insights.push({ level: 'info', title: `About ${recipe.yeast.name.replace(/\s*\(.*\)$/, '')}`, detail: recipe.yeast.notes });
  }

  return insights;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getAdvisorInsights, ADVISOR_FLAT_SG_DELTA, ADVISOR_ATTENUATION_SLACK };
}
