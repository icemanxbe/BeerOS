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
// its day has arrived, but only when it's genuinely NEXT — since
// nextGatedStep respects chronological order, this can't fire "dry hop"
// before "confirm fermentation complete" is actually checked, matching the
// step's own warning that dry hopping too early risks restarting fermentation.
function getDueStepInsight(batch, recipe, stats, steps) {
  const next = nextGatedStep(batch, steps);
  if (!next || !ADVISOR_DUE_STEP_KEYS.includes(next.key) || stats.daysSinceStart < next.day) return null;
  return {
    level: 'info', title: `${next.title} is due`,
    detail: `Based on this recipe's schedule, day ${next.day} is when to ${next.desc.charAt(0).toLowerCase()}${next.desc.slice(1)}`
  };
}

function getAdvisorInsights(batch, recipe, stats) {
  if (batch.status === 'done') return []; // no fermentation advice once packaged

  const logs = batch.gravityLogs;
  const daysSinceStart = stats.daysSinceStart;

  if (!logs.length) {
    if (daysSinceStart >= 2) {
      return [{
        level: 'info', title: 'No gravity readings yet',
        detail: `It's been ${daysSinceStart} day(s) since you started this batch. Log a reading to start tracking real progress instead of the recipe's estimate.`
      }];
    }
    return [];
  }

  if (!recipe) return []; // no yeast attenuation range to reason about without a recipe

  const steps = getRecipeSteps(recipe);
  const dueStep = getDueStepInsight(batch, recipe, stats, steps);

  const last = logs[logs.length - 1];
  const prev = logs.length >= 2 ? logs[logs.length - 2] : null;
  const isFlat = !!prev && Math.abs(prev.sg - last.sg) <= ADVISOR_FLAT_SG_DELTA;
  const att = stats.attenuationToDate;
  const { attenuationLow, attenuationHigh } = recipe.yeast;

  const completeStep = steps.find(s => s.key === 'confirm-complete' || s.key === 'lager');
  const completeStepDue = !!completeStep && daysSinceStart >= completeStep.day;

  if (att === null) return dueStep ? [dueStep] : [];

  if (isFlat && att >= attenuationLow - ADVISOR_ATTENUATION_SLACK) {
    return [{
      level: 'good', title: 'Looks done fermenting',
      detail: `Gravity hasn't moved in your last two readings (${prev.sg.toFixed(3)} → ${last.sg.toFixed(3)}), and attenuation is ${att.toFixed(0)}% — within this yeast's usual ${attenuationLow}-${attenuationHigh}% range.${completeStep ? ` Check the "${completeStep.title}" step below if you haven't.` : ''}`
    }, ...(dueStep ? [dueStep] : [])];
  }
  if (isFlat && att < attenuationLow - ADVISOR_ATTENUATION_SLACK) {
    return [{
      level: 'warning', title: 'Gravity flat below expected attenuation',
      detail: `Gravity is flat at ${last.sg.toFixed(3)} (${att.toFixed(0)}% attenuation), short of this yeast's usual ${attenuationLow}-${attenuationHigh}% range. This can mean a stalled fermentation — double-check pitch rate and temperature, and consider a gentle rouse before assuming it's finished.`
    }];
  }
  if (!isFlat && completeStepDue && att < attenuationLow) {
    return [{
      level: 'info', title: 'Still fermenting past the usual check-in day',
      detail: `You're ${daysSinceStart - completeStep.day} day(s) past this recipe's usual "${completeStep.title}" check-in, and gravity is still dropping (${att.toFixed(0)}% so far). Not necessarily a problem — some batches just run longer — but worth a closer look if it keeps going.`
    }];
  }
  return dueStep ? [dueStep] : [];
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getAdvisorInsights, ADVISOR_FLAT_SG_DELTA, ADVISOR_ATTENUATION_SLACK };
}
