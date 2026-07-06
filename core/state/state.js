// App state — batches persisted server-side as a single JSON blob via
// GET/POST /api/state. One brewer, one instance: no per-user auth, no
// delta saves/sync protocol yet — add that complexity if/when a second
// device or user actually needs it.

const APP = { batches: [] };
let saveTimer = null;

async function loadState() {
  const res = await fetch('/api/state');
  const data = await res.json();
  APP.batches = data.batches || [];
}

function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveState, 400);
}
async function saveState() {
  await fetch('/api/state', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ batches: APP.batches })
  });
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
  scheduleSave();
}

function deleteBatch(batchId) {
  APP.batches = APP.batches.filter(b => b.id !== batchId);
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
  module.exports = { createBatch, addGravityLog, deleteGravityLog, setBatchStatus, deleteBatch, computeBatchStats };
}
