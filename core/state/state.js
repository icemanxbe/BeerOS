// App state — batches persisted server-side as a single JSON blob via
// GET/POST /api/state. One brewer, one instance: no per-user auth, no
// delta saves/sync protocol yet — add that complexity if/when a second
// device or user actually needs it.

const APP = { batches: [], tasksDone: {}, telemetryToken: null, lastTelemetryId: 0 };
let saveTimer = null;

async function loadState() {
  const res = await fetch('/api/state');
  const data = await res.json();
  APP.batches = data.batches || [];
  APP.tasksDone = data.tasksDone || {};
  APP.telemetryToken = data.telemetryToken || null;
  APP.lastTelemetryId = data.lastTelemetryId || 0;
}

function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveState, 400);
}
async function saveState() {
  await fetch('/api/state', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ batches: APP.batches, tasksDone: APP.tasksDone, lastTelemetryId: APP.lastTelemetryId })
  });
}

// Pulls new hydrometer/sensor readings (see server.py's /api/telemetry — an
// append-only table, deliberately NOT merged into the state blob server-side,
// so a stale browser tab's next full-blob save can never clobber a reading
// that arrived while it was open) and folds them into the matching batch's
// gravityLogs by device name. Called on load and on a light poll interval —
// readings appear next time this runs, not the instant they're posted.
async function mergeTelemetry() {
  const res = await fetch(`/api/telemetry?after=${APP.lastTelemetryId || 0}`);
  const readings = await res.json();
  if (!readings.length) return false;

  let changed = false;
  for (const r of readings) {
    APP.lastTelemetryId = Math.max(APP.lastTelemetryId, r.id);
    const batch = APP.batches.find(b => b.deviceName && b.deviceName.trim().toLowerCase() === r.deviceName.trim().toLowerCase());
    if (!batch) continue;
    batch.gravityLogs.push({ date: r.date, sg: r.sg, tempC: r.tempC, source: r.source });
    batch.gravityLogs.sort((a, b) => a.date.localeCompare(b.date));
    changed = true;
  }
  if (changed) scheduleSave();
  return changed;
}

// Recipe steps as day-offsets from the batch's start date (day 0 = brew day),
// same trigger model MeadOS uses — a suggested check-in point, not a rigid
// due date; the real signal is still the gravity readings. Derived from the
// recipe's own already-verified fields (mash temp, hop schedule, yeast temp/
// attenuation, dry hop) so it can't drift from the ingredient tables shown
// alongside it. Day offsets themselves are standard homebrew-timeline
// approximations (~2 weeks grain-to-bottle for an ale, ~5-6 weeks for a
// lagered beer) — soft guidance, not a guarantee.
function getRecipeSteps(r) {
  const isLager = r.yeast.tempLowC <= 15;
  const steps = [];

  const boilMinutes = Math.max(...r.hopSchedule.map(h => h.minutes));
  const sortedHops = r.hopSchedule.slice().sort((a, b) => b.minutes - a.minutes);
  const hopLines = sortedHops.map(h => `With ${h.minutes} minute${h.minutes === 1 ? '' : 's'} left in a ${boilMinutes}-minute boil, add ${h.weightG}g ${h.name}${h.purpose ? ` (${h.purpose})` : ''}.`);
  steps.push({
    key: 'brew-day', day: 0, title: 'Brew Day',
    desc: [
      `Mill and mash all grains at ${r.mashTempC}°C for 60 minutes.`,
      'Lauter/sparge to collect your full pre-boil volume, then bring the wort to a boil.',
      ...hopLines,
      `Chill the wort to fermentation temperature (${r.fermentTempC.low}-${r.fermentTempC.high}°C) and pitch ${r.yeast.name}.`
    ].join(' ')
  });

  steps.push({
    key: 'check-fermentation', day: 2, title: 'Check Fermentation',
    desc: `Confirm active fermentation (krausen, airlock activity, or an early gravity drop) at ${r.fermentTempC.low}-${r.fermentTempC.high}°C.`
  });

  let lastDay = 2;
  if (isLager) {
    steps.push({ key: 'diacetyl-rest', day: 14, title: 'Diacetyl Rest',
      desc: 'Once gravity is stable across multiple readings, raise the temperature to 18-20°C for 1-3 days before cold-crashing.' });
    steps.push({ key: 'lager', day: 18, title: 'Cold-Crash & Lager',
      desc: 'Cold-crash and lager near 0-4°C for at least 2-4 weeks before packaging.' });
    lastDay = 18;
  } else {
    steps.push({ key: 'confirm-complete', day: 10, title: 'Confirm Fermentation Complete',
      desc: `Gravity should be stable across multiple readings (expect roughly ${r.yeast.attenuationLow}-${r.yeast.attenuationHigh}% apparent attenuation from this yeast) before moving on.` });
    lastDay = 10;
  }

  if (r.dryHop) {
    const dh = r.dryHop.map(d => `${d.weightG}g ${d.name}`).join(', ');
    const dryHopDay = lastDay + 1;
    steps.push({ key: 'dry-hop', day: dryHopDay, title: 'Dry Hop',
      desc: `Confirm fermentation is fully complete (stable gravity over several days) before dry hopping with ${dh} for 2-5 days — dry hopping too early risks hop creep restarting fermentation.` });
    lastDay = dryHopDay + 4;
  }

  const packageDay = isLager ? lastDay + 21 : lastDay + 3;
  steps.push({
    key: 'package', day: packageDay, title: 'Package',
    desc: 'Bottling: dose priming sugar (see the Priming Sugar calculator), cap, and condition 1-3+ weeks at room temperature for the yeast to naturally carbonate it. '
      + 'Kegging: force-carbonate by chilling to serving temp and applying CO2 at the pressure this style needs (see the Force Carbonation calculator) for 1-2 days, or prime the keg with sugar exactly like a bottle and let it condition sealed. '
      + 'Advanced: spund instead — cap the fermenter itself under pressure near the end of fermentation to carbonate without a separate packaging step.'
  });
  return steps;
}

function taskId(batchId, stepKey) { return `${batchId}-step-${stepKey}`; }
function isTaskDone(id) { return !!APP.tasksDone[id]; }
function toggleTask(batchId, stepKey, recipe) {
  const id = taskId(batchId, stepKey);
  if (APP.tasksDone[id]) delete APP.tasksDone[id];
  else APP.tasksDone[id] = new Date().toISOString().slice(0, 10);
  const batch = APP.batches.find(b => b.id === batchId);
  if (batch && !batch.statusManual) refreshBatchStatus(batch, recipe);
  scheduleSave();
}

// Status follows step completion by default (fluent — no separate manual
// toggling needed once you're checking off real steps), with gravity-stall
// detection as a secondary signal for when steps haven't been checked yet.
// A batch flips to statusManual once the user picks a status directly, and
// stays on whatever they picked until they check a later step forward.
function deriveBatchStatus(batch, recipe) {
  if (!recipe) return batch.status || 'fermenting';
  const steps = getRecipeSteps(recipe);
  const done = key => isTaskDone(taskId(batch.id, key));

  const packageStep = steps.find(s => s.key === 'package');
  if (packageStep && done('package')) return 'done';

  const conditionKeys = ['confirm-complete', 'diacetyl-rest', 'lager', 'dry-hop'];
  if (conditionKeys.some(done)) return 'conditioning';

  const logs = batch.gravityLogs;
  if (logs.length >= 2) {
    const last = logs[logs.length - 1].sg, prev = logs[logs.length - 2].sg;
    if (Math.abs(prev - last) <= 0.002) return 'conditioning'; // gravity flat = likely done fermenting
  }
  return 'fermenting';
}
function refreshBatchStatus(batch, recipe) {
  batch.status = deriveBatchStatus(batch, recipe);
}

function genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

function createBatch(recipe, name, volumeL) {
  const batch = {
    id: genId(),
    recipeId: recipe ? recipe.id : null,
    recipeName: recipe ? recipe.name : name,
    name: name || (recipe ? recipe.name : 'New Batch'),
    volumeL: volumeL || (recipe ? recipe.volumeL : 20),
    startDate: new Date().toISOString().slice(0, 10),
    status: 'fermenting',
    gravityLogs: [],
    notes: ''
  };
  APP.batches.unshift(batch);
  scheduleSave();
  return batch;
}

function addGravityLog(batchId, sg, date) {
  const batch = APP.batches.find(b => b.id === batchId);
  if (!batch) return;
  batch.gravityLogs.push({ date: date || new Date().toISOString().slice(0, 10), sg: parseFloat(sg) });
  batch.gravityLogs.sort((a, b) => a.date.localeCompare(b.date));
  scheduleSave();
}

function deleteGravityLog(batchId, index) {
  const batch = APP.batches.find(b => b.id === batchId);
  if (!batch) return;
  batch.gravityLogs.splice(index, 1);
  scheduleSave();
}

function setBatchStatus(batchId, status) {
  const batch = APP.batches.find(b => b.id === batchId);
  if (!batch) return;
  batch.status = status;
  batch.statusManual = true;
  scheduleSave();
}

function deleteBatch(batchId) {
  APP.batches = APP.batches.filter(b => b.id !== batchId);
  scheduleSave();
}

function setBatchDeviceName(batchId, deviceName) {
  const batch = APP.batches.find(b => b.id === batchId);
  if (!batch) return;
  batch.deviceName = deviceName.trim() || null;
  scheduleSave();
}

function setBatchNotes(batchId, notes) {
  const batch = APP.batches.find(b => b.id === batchId);
  if (!batch) return;
  batch.notes = notes;
  scheduleSave();
}

// Computes live stats for a batch: OG is the first logged reading if one
// exists, else the recipe's own computed target (a planning estimate).
// FG/ABV/attenuation are computed to-date from the latest reading, so an
// actively fermenting batch shows real progress, not just a final number.
function computeBatchStats(batch, recipe) {
  const firstLog = batch.gravityLogs[0];
  const lastLog = batch.gravityLogs[batch.gravityLogs.length - 1];
  const recipeStats = recipe ? computeRecipeStats(recipe) : null;

  const og = firstLog ? firstLog.sg : (recipeStats ? recipeStats.og : null);
  const ogIsActual = !!firstLog;
  const fg = lastLog ? lastLog.sg : null;
  const attenuationToDate = (og && fg) ? apparentAttenuation(og, fg) : null;
  const abvToDate = (og && fg) ? abvSimple(og, fg) : null;
  const daysSinceStart = Math.floor((new Date() - new Date(batch.startDate)) / 86400000);

  // Only project while actively fermenting, and only once we have two distinct
  // readings to derive a rate from — a single point can't project a trend.
  let projection = null;
  if (batch.status === 'fermenting' && recipe && firstLog && lastLog && firstLog !== lastLog) {
    const daysElapsed = (new Date(lastLog.date) - new Date(firstLog.date)) / 86400000;
    projection = projectFermentation(og, fg, daysElapsed, recipe.yeast.attenuationLow, recipe.yeast.attenuationHigh);
  }

  return { og, ogIsActual, fg, attenuationToDate, abvToDate, daysSinceStart, recipeStats, projection };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createBatch, addGravityLog, deleteGravityLog, setBatchStatus, deleteBatch, setBatchDeviceName, computeBatchStats,
    getRecipeSteps, taskId, isTaskDone, toggleTask, deriveBatchStatus, refreshBatchStatus, mergeTelemetry, setBatchNotes, APP
  };
}
