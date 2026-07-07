// My Batches view — list (search/filter/sort/paginated so it holds up
// whether someone has 3 batches or 300) + start-from-recipe + detail
// with live gravity-log-driven stats. "New Batch" is a global modal since
// it's reachable from the sidebar on every page, not just this one.

const PAGE_SIZE = 20;
const batchViewState = { search: '', statusFilter: 'all', sort: 'newest', page: 1, openBatchId: null };
const ADVISOR_LEVEL_ICONS = { good: '&#10003;', warning: '&#9888;', info: '&#8505;' }; // checkmark / warning triangle / info — a second, non-color cue for the insight level

function addDaysISO(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + Math.round(days));
  return d.toISOString().slice(0, 10);
}

// Renders the projected-finish hint, collapsing "3–3 day(s)" / a repeated
// date to a single value when rounding makes both ends of the range equal.
function renderProjectionHint(projection, lastLogDate) {
  const earliestDays = Math.round(projection.daysToEarliest);
  const latestDays = Math.round(projection.daysToLatest);
  const dayText = earliestDays === latestDays ? `~${earliestDays}` : `${earliestDays}–${latestDays}`;
  const earliestDate = addDaysISO(lastLogDate, projection.daysToEarliest);
  const latestDate = addDaysISO(lastLogDate, projection.daysToLatest);
  const dateText = earliestDate === latestDate ? `around ${earliestDate}` : `around ${earliestDate} to ${latestDate}`;
  return `<p class="stat-hint">Projected finish: FG ${projection.fgLow.toFixed(3)}–${projection.fgHigh.toFixed(3)}, roughly ${dayText} more day(s) at the current rate (${dateText}). A straight-line estimate from your recent readings, not a fermentation curve model — expect it to move as more readings come in.</p>`;
}

// "What should I care about today" — the Advisor's top insight per active
// batch, surfaced above the list instead of making you open each one to
// find out. Reuses getAdvisorInsights as-is; doesn't invent a new signal.
function getTodaySummary() {
  const active = APP.batches.filter(b => b.status !== 'done');
  const items = [];
  active.forEach(b => {
    const recipe = BUILTIN_RECIPES().find(r => r.id === b.recipeId);
    const stats = computeBatchStats(b, recipe);
    const insights = getAdvisorInsights(b, recipe, stats);
    if (insights.length) items.push({ batch: b, insight: insights[0] });
  });
  const levelOrder = { warning: 0, info: 1, good: 2 };
  items.sort((a, b) => levelOrder[a.insight.level] - levelOrder[b.insight.level]);
  return { activeCount: active.length, items };
}

function renderTodaySummary() {
  const { activeCount, items } = getTodaySummary();
  if (activeCount === 0) return '';
  if (!items.length) {
    return `<div class="today-panel">
      <h2>Continue Brewing</h2>
      <p class="stat-hint">Nothing needs your attention right now — ${activeCount} batch${activeCount === 1 ? '' : 'es'} fermenting normally.</p>
    </div>`;
  }
  const rows = items.slice(0, 5).map(({ batch, insight }) => `
    <div class="advisor-item level-${insight.level} today-item" onclick="openBatch('${batch.id}')">
      <div class="advisor-title"><span class="advisor-icon">${ADVISOR_LEVEL_ICONS[insight.level] || ''}</span>${insight.title}</div>
      <div class="advisor-batch-ref">${batch.name}${batch.recipeName ? ` &middot; ${batch.recipeName}` : ''}</div>
      <div class="advisor-detail">${insight.detail}</div>
      ${insight.action ? `<div class="advisor-action">${insight.action}</div>` : ''}
      <button class="brew-btn today-continue-btn">Continue Batch &rarr;</button>
    </div>`
  ).join('');
  return `<div class="today-panel"><h2>Continue Brewing</h2><div class="advisor-card">${rows}</div></div>`;
}

function renderBatchesPage() {
  if (batchViewState.openBatchId) return renderBatchDetail(batchViewState.openBatchId);

  let list = APP.batches.slice();

  if (batchViewState.search.trim()) {
    const q = batchViewState.search.trim().toLowerCase();
    list = list.filter(b => b.name.toLowerCase().includes(q) || (b.recipeName || '').toLowerCase().includes(q));
  }
  if (batchViewState.statusFilter !== 'all') {
    list = list.filter(b => b.status === batchViewState.statusFilter);
  }
  list.sort((a, b) => {
    if (batchViewState.sort === 'name') return a.name.localeCompare(b.name);
    if (batchViewState.sort === 'oldest') return a.startDate.localeCompare(b.startDate);
    return b.startDate.localeCompare(a.startDate); // newest first, default
  });

  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  batchViewState.page = Math.min(batchViewState.page, totalPages);
  const pageItems = list.slice((batchViewState.page - 1) * PAGE_SIZE, batchViewState.page * PAGE_SIZE);

  const statusCounts = { fermenting: 0, conditioning: 0, done: 0 };
  APP.batches.forEach(b => { if (statusCounts[b.status] !== undefined) statusCounts[b.status]++; });

  const rows = pageItems.map(b => {
    const recipe = BUILTIN_RECIPES().find(r => r.id === b.recipeId);
    const s = computeBatchStats(b, recipe);
    return `<div class="batch-row" onclick="openBatch('${b.id}')">
      <div class="batch-row-vessel">${renderVesselSVG(b, recipe, 'sm')}</div>
      <div class="batch-row-main">
        <div class="batch-name">${b.name}</div>
        <div class="batch-sub">${b.recipeName || 'Custom'} &middot; started ${b.startDate} &middot; ${s.daysSinceStart}d ago</div>
      </div>
      <div class="batch-row-meta">
        <div class="batch-row-stats">
          ${s.og ? `<span>OG ${s.og.toFixed(3)}${s.ogIsActual ? '' : ' (est.)'}</span>` : ''}
          ${s.abvToDate !== null ? `<span>${s.abvToDate.toFixed(1)}% ABV so far</span>` : '<span class="dim">no readings yet</span>'}
        </div>
        <span class="status-pill status-${b.status}">${b.status}</span>
      </div>
    </div>`;
  }).join('');

  const pagerHtml = totalPages > 1 ? `<div class="pager">
      <button ${batchViewState.page <= 1 ? 'disabled' : ''} onclick="setBatchPage(${batchViewState.page - 1})">&larr; Prev</button>
      <span>Page ${batchViewState.page} of ${totalPages} &middot; ${list.length} batch${list.length === 1 ? '' : 'es'}</span>
      <button ${batchViewState.page >= totalPages ? 'disabled' : ''} onclick="setBatchPage(${batchViewState.page + 1})">Next &rarr;</button>
    </div>` : `<div class="pager-note">${list.length} batch${list.length === 1 ? '' : 'es'}</div>`;

  return `<div class="batches-page">
    <h1>My Batches</h1>
    ${renderTodaySummary()}
    <div class="batch-controls">
      <input type="text" placeholder="Search batches..." value="${batchViewState.search}" oninput="setBatchSearch(this.value)">
      <select onchange="setBatchSort(this.value)">
        <option value="newest"${batchViewState.sort === 'newest' ? ' selected' : ''}>Newest first</option>
        <option value="oldest"${batchViewState.sort === 'oldest' ? ' selected' : ''}>Oldest first</option>
        <option value="name"${batchViewState.sort === 'name' ? ' selected' : ''}>Name</option>
      </select>
      ${APP.batches.length ? '<button class="region-btn" onclick="exportBatchesCSV()">Export CSV</button>' : ''}
    </div>
    <div class="status-filters">
      <button class="region-btn${batchViewState.statusFilter === 'all' ? ' active' : ''}" onclick="setBatchStatusFilter('all')">All (${APP.batches.length})</button>
      <button class="region-btn${batchViewState.statusFilter === 'fermenting' ? ' active' : ''}" onclick="setBatchStatusFilter('fermenting')">Fermenting (${statusCounts.fermenting})</button>
      <button class="region-btn${batchViewState.statusFilter === 'conditioning' ? ' active' : ''}" onclick="setBatchStatusFilter('conditioning')">Conditioning (${statusCounts.conditioning})</button>
      <button class="region-btn${batchViewState.statusFilter === 'done' ? ' active' : ''}" onclick="setBatchStatusFilter('done')">Done (${statusCounts.done})</button>
    </div>
    ${APP.batches.length === 0 ? `<div class="empty-state">
      <p class="empty-note">No batches yet.</p>
      <p class="empty-sub">New to brewing? Browse the Recipe Library for a guided, verified recipe to start from. Already know what you're doing? Hit "+ New Batch" in the sidebar and pick "Custom" to track your own.</p>
      <button class="empty-cta" onclick="switchPage('recipes')">Browse Recipe Library</button>
    </div>` : `<div class="batch-list">${rows}</div>`}
    ${pagerHtml}
  </div>`;
}

// One row per gravity log (denormalized) so a spreadsheet can group/filter
// either by batch or by reading; batches with no logs still get one row.
function batchesToCSV() {
  const esc = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
  const header = ['Batch Name', 'Recipe', 'Status', 'Start Date', 'Volume (L)', 'Log Date', 'SG'];
  const rows = [header];
  APP.batches.forEach(b => {
    const base = [b.name, b.recipeName || 'Custom', b.status, b.startDate, b.volumeL];
    if (!b.gravityLogs.length) rows.push([...base, '', '']);
    else b.gravityLogs.forEach(g => rows.push([...base, g.date, g.sg]));
  });
  return rows.map(r => r.map(esc).join(',')).join('\r\n');
}
function exportBatchesCSV() {
  const blob = new Blob([batchesToCSV()], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'beeros-batches-' + new Date().toISOString().slice(0, 10) + '.csv';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function setBatchSearch(v) { batchViewState.search = v; batchViewState.page = 1; rerenderBatchesPage(true); }
function setBatchSort(v) { batchViewState.sort = v; rerenderBatchesPage(); }
function setBatchStatusFilter(v) { batchViewState.statusFilter = v; batchViewState.page = 1; rerenderBatchesPage(); }
function setBatchPage(p) { batchViewState.page = p; rerenderBatchesPage(); }
function openBatch(id) { batchViewState.openBatchId = id; rerenderBatchesPage(); }
function closeBatch() { batchViewState.openBatchId = null; rerenderBatchesPage(); }

// ---- New Batch modal (opened from the sidebar's pinned button, reachable from any page) ----
function openNewBatchModal() {
  const recipes = BUILTIN_RECIPES();
  const opts = recipes.map(r => `<option value="${r.id}">${r.name} (${r.style})</option>`).join('');
  document.getElementById('modal-root').innerHTML = `<div class="modal-overlay" onclick="if(event.target===this)closeModal()">
    <div class="modal">
      <h2>Start a New Batch</h2>
      <label class="form-label">Recipe</label>
      <select id="nb-recipe" onchange="onNewBatchRecipeChange()">
        <option value="">— Custom (no recipe) —</option>
        ${opts}
      </select>
      <label class="form-label">Batch name</label>
      <input type="text" id="nb-name" placeholder="e.g. Summer Batch #1">
      <label class="form-label">Volume (L)</label>
      <input type="number" id="nb-vol" step="0.5" value="20">
      <div class="form-actions">
        <button onclick="closeModal()">Cancel</button>
        <button class="primary" onclick="submitNewBatch()">Start Batch</button>
      </div>
    </div>
  </div>`;
}
function onNewBatchRecipeChange() {
  const recipe = BUILTIN_RECIPES().find(r => r.id === document.getElementById('nb-recipe').value);
  const nameEl = document.getElementById('nb-name'), volEl = document.getElementById('nb-vol');
  if (recipe) { if (!nameEl.value) nameEl.placeholder = recipe.name; volEl.value = recipe.volumeL; }
}
function closeModal() { const m = document.getElementById('modal-root'); if (m) m.innerHTML = ''; }
function submitNewBatch() {
  const recipeId = document.getElementById('nb-recipe').value;
  const recipe = recipeId ? BUILTIN_RECIPES().find(r => r.id === recipeId) : null;
  const name = document.getElementById('nb-name').value.trim() || (recipe ? recipe.name : 'Custom Batch');
  const vol = parseFloat(document.getElementById('nb-vol').value) || (recipe ? recipe.volumeL : 20);
  const batch = createBatch(recipe, name, vol);
  closeModal();
  switchPage('batches');
  openBatch(batch.id);
  renderSidebarBatches();
}
// Called from the Recipe Library detail view's "Brew This Recipe" button.
function startBatchFromRecipe(recipeId) {
  const recipe = BUILTIN_RECIPES().find(r => r.id === recipeId);
  if (!recipe) return;
  const batch = createBatch(recipe, recipe.name, recipe.volumeL);
  switchPage('batches');
  openBatch(batch.id);
  renderSidebarBatches();
}

function renderBatchDetail(id) {
  const b = APP.batches.find(x => x.id === id);
  if (!b) return '<p>Batch not found.</p>';
  const recipe = BUILTIN_RECIPES().find(r => r.id === b.recipeId);
  const s = computeBatchStats(b, recipe);
  const lastTime = recipe ? mostRecentBatchOfRecipe(APP.batches, b.recipeId, b.id) : null;

  const logRows = b.gravityLogs.map((g, i) =>
    `<tr><td>${g.date}</td><td>${g.sg.toFixed(3)}</td><td>${g.tempC !== undefined && g.tempC !== null ? g.tempC.toFixed(1) + '&deg;C' : ''}</td><td>${g.source ? `<span class="device-tag">${g.source}</span>` : ''}</td><td><button class="mini-btn" onclick="removeLog('${b.id}',${i})">&times;</button></td></tr>`
  ).join('');
  const webhookUrl = APP.telemetryToken ? `${location.origin}/api/telemetry?token=${APP.telemetryToken}` : '';

  return `<div class="batch-detail">
    <button class="back-btn" onclick="closeBatch()">&larr; Back to My Batches</button>
    <div class="batch-detail-top">
      <div class="vessel-hero">${renderVesselSVG(b, recipe, 'lg')}</div>
      <div class="batch-detail-head">
        <h1>${b.name}</h1>
        <div class="recipe-style">${b.recipeName || 'Custom'} &middot; ${b.volumeL} L &middot; started ${b.startDate} &middot; ${s.daysSinceStart} days ago</div>
        <div class="status-row">
          Status:
          ${['fermenting', 'conditioning', 'done'].map(st =>
            `<button class="status-btn${b.status === st ? ' active' : ''}" onclick="setBatchStatus('${b.id}','${st}');rerenderBatchesPage();renderSidebarBatches()">${st}</button>`
          ).join('')}
        </div>
        ${recipe && !b.statusManual ? '<p class="status-auto-note">Following your checked steps below &mdash; pick a status above any time to set it manually instead.</p>' : ''}
        ${recipe && b.statusManual ? `<p class="status-auto-note">Set manually. <a href="#" onclick="resetBatchStatusToAuto('${b.id}');return false;">Follow checked steps instead</a>.</p>` : ''}
      </div>
    </div>

    ${renderAdvisorInsights(b, recipe, s)}
    ${renderLastTime(b, s, lastTime)}

    <div class="stat-row">
      <div class="stat"><span class="stat-val">${s.og ? s.og.toFixed(3) : '—'}</span><span class="stat-label">OG${s.og && !s.ogIsActual ? ' (est.)' : ''}</span></div>
      <div class="stat"><span class="stat-val">${s.fg ? s.fg.toFixed(3) : '—'}</span><span class="stat-label">Latest SG</span></div>
      <div class="stat"><span class="stat-val">${s.abvToDate !== null ? s.abvToDate.toFixed(1) + '%' : '—'}</span><span class="stat-label">ABV so far</span></div>
      <div class="stat"><span class="stat-val">${s.attenuationToDate !== null ? s.attenuationToDate.toFixed(0) + '%' : '—'}</span><span class="stat-label">Attenuation</span></div>
    </div>
    ${s.fg && b.status !== 'done' ? '<p class="stat-hint">"So far" numbers are a snapshot from your latest reading, not the final result — fermentation may still be in progress.</p>' : ''}
    ${s.projection ? renderProjectionHint(s.projection, b.gravityLogs[b.gravityLogs.length - 1].date) : ''}
    ${!s.ogIsActual && s.og ? '<p class="stat-hint">OG shown is the recipe\'s computed target — log your first real gravity reading to replace it with the actual number for this batch.</p>' : ''}
    ${recipe ? `<div class="bjcp-range-note">Recipe target: OG ${s.recipeStats.og.toFixed(3)} &middot; ABV ${s.recipeStats.abv.toFixed(1)}% &middot; IBU ${s.recipeStats.ibu.toFixed(0)} &middot; SRM ${s.recipeStats.srm.toFixed(1)}</div>` : ''}

    ${recipe ? renderStepChecklist(b, recipe) : ''}

    <details class="sensor-device-card"${b.deviceName ? ' open' : ''}>
      <summary>Sensor Device${b.deviceName ? ` <span class="device-tag">${b.deviceName}</span>` : ''}</summary>
      <div class="add-log-row">
        <input type="text" value="${b.deviceName || ''}" placeholder="e.g. Fermenter1" onchange="setBatchDeviceName('${b.id}', this.value); rerenderBatchesPage()">
      </div>
      <p class="stat-hint">Set your iSpindel/GravityMon, or a Tilt/RAPT/Plaato bridge app, to use this exact name as its device name, and point it at this URL. New readings show up here next time you reload (or within a minute while this page stays open):</p>
      <div class="add-log-row"><code class="webhook-url">${webhookUrl}</code><button class="mini-btn" onclick="navigator.clipboard.writeText('${webhookUrl}')">Copy</button></div>
      <p class="stat-hint">Works with: iSpindel/GravityMon (native HTTP-post format), and anything that can target a "Brewfather Custom Stream"-compatible URL (Tilt via a bridge app, RAPT via a bridge/forwarder, Plaato via open-plaato-keg or similar) — this endpoint accepts both JSON shapes directly.</p>
    </details>

    <details class="sensor-device-card"${b.notes ? ' open' : ''}>
      <summary>Notes</summary>
      <textarea class="batch-notes-input" placeholder="e.g. slightly underpitched, fermented a bit warm..." onchange="setBatchNotes('${b.id}', this.value)">${b.notes || ''}</textarea>
      <p class="stat-hint">Shows up as "Last time you brewed this" next time you start another batch from this recipe.</p>
    </details>

    <h2>Gravity Log</h2>
    <div class="add-log-row">
      <input type="date" id="log-date" value="${new Date().toISOString().slice(0, 10)}">
      <input type="number" id="log-sg" step="0.001" placeholder="1.050">
      <button onclick="submitLog('${b.id}')">Add Reading</button>
    </div>
    ${b.gravityLogs.length ? `<div class="table-scroll"><table class="ingredient-table"><thead><tr><th>Date</th><th>SG</th><th>Temp</th><th>Source</th><th></th></tr></thead><tbody>${logRows}</tbody></table></div>` : '<p class="empty-note">No readings yet. The first reading you log becomes this batch\'s OG.</p>'}

    <div class="danger-zone">
      <button class="btn-danger" onclick="confirmDeleteBatch('${b.id}')">Delete Batch</button>
    </div>
  </div>`;
}

function renderAdvisorInsights(b, recipe, stats) {
  const insights = getAdvisorInsights(b, recipe, stats);
  if (!insights.length) return '';
  const rows = insights.map(i => `<div class="advisor-item level-${i.level}">
    <div class="advisor-title"><span class="advisor-icon">${ADVISOR_LEVEL_ICONS[i.level] || ''}</span>${i.title}</div>
    <div class="advisor-detail">${i.detail}</div>
    ${i.action ? `<div class="advisor-action"><strong>Suggested next step:</strong> ${i.action}</div>` : ''}
  </div>`).join('');
  return `<h2 class="advisor-heading">Advisor</h2><div class="advisor-card">${rows}</div>`;
}

// Side-by-side comparison right when you're mid-brew, not just when
// browsing the recipe library — see mostRecentBatchOfRecipe() in
// recipe-history.js. Every cell is a real number or "—"; nothing here
// is estimated or backfilled.
function renderLastTime(b, s, lastTime) {
  if (!lastTime) return '';
  const fmtSG = v => v === null ? '—' : v.toFixed(3);
  const fmtPct = v => v === null ? '—' : `${v.toFixed(0)}%`;
  const gravityLabel = b.status === 'done' ? 'Final SG' : 'Current SG';
  const rows = [
    ['OG', fmtSG(s.og), fmtSG(lastTime.og)],
    [gravityLabel, fmtSG(s.fg), fmtSG(lastTime.finalSG)],
    ['Attenuation', fmtPct(s.attenuationToDate), fmtPct(lastTime.attenuation)],
    ['Days', String(s.daysSinceStart), lastTime.daysToComplete !== null ? String(lastTime.daysToComplete) : '—'],
    ['Notes', b.notes || '—', lastTime.notes || '—']
  ];
  const rowsHtml = rows.map(([label, cur, prev]) => `<tr><td>${label}</td><td>${cur}</td><td>${prev}</td></tr>`).join('');
  return `<h2>Compared to Last Time</h2>
    <div class="table-scroll"><table class="ingredient-table"><thead><tr><th></th><th>This Batch</th><th>${lastTime.name}</th></tr></thead><tbody>${rowsHtml}</tbody></table></div>`;
}

function renderStepChecklist(b, recipe) {
  const steps = getRecipeSteps(recipe);
  const rows = steps.map(st => {
    const id = taskId(b.id, st.key);
    const done = isTaskDone(id);
    const dueDate = addDaysISO(b.startDate, st.day);
    return `<div class="task-item${done ? ' done' : ''}" onclick="onToggleTask('${b.id}','${st.key}')">
      <span class="task-cb${done ? ' checked' : ''}">${done ? '&#10003;' : ''}</span>
      <div class="task-body">
        <div class="task-title">Day ${st.day} &middot; ${st.title} <span class="task-due">(around ${dueDate})</span></div>
        <div class="task-desc">${st.desc}</div>
      </div>
    </div>`;
  }).join('');
  return `<h2>Brewing Steps</h2><div class="task-list">${rows}</div>`;
}
function onToggleTask(batchId, stepKey) {
  const batch = APP.batches.find(x => x.id === batchId);
  const recipe = batch ? BUILTIN_RECIPES().find(r => r.id === batch.recipeId) : null;
  toggleTask(batchId, stepKey, recipe);
  rerenderBatchesPage();
  renderSidebarBatches();
}
function resetBatchStatusToAuto(batchId) {
  const batch = APP.batches.find(x => x.id === batchId);
  if (!batch) return;
  batch.statusManual = false;
  const recipe = BUILTIN_RECIPES().find(r => r.id === batch.recipeId);
  refreshBatchStatus(batch, recipe);
  scheduleSave();
  rerenderBatchesPage();
  renderSidebarBatches();
}
function confirmDeleteBatch(batchId) {
  const batch = APP.batches.find(x => x.id === batchId);
  if (!batch) return;
  if (!confirm(`Permanently delete "${batch.name}" and all its gravity readings?`)) return;
  deleteBatch(batchId);
  closeBatch();
  rerenderBatchesPage();
  renderSidebarBatches();
}

function submitLog(batchId) {
  const date = document.getElementById('log-date').value;
  const sg = document.getElementById('log-sg').value;
  if (!sg) return;
  addGravityLog(batchId, sg, date);
  rerenderBatchesPage();
}
function removeLog(batchId, index) { deleteGravityLog(batchId, index); rerenderBatchesPage(); }

function rerenderBatchesPage(preserveFocus) {
  const mount = document.getElementById('batches-mount');
  if (!mount) return;
  const activeId = preserveFocus && document.activeElement ? document.activeElement.id : null;
  mount.innerHTML = renderBatchesPage();
  if (activeId) { const el = document.getElementById(activeId); if (el) { el.focus(); const v = el.value; el.value = ''; el.value = v; } }
}

// Sidebar "Active Batches" — fermenting/conditioning batches only, so it
// stays short and useful even if the full batch history is long.
function renderSidebarBatches() {
  const mount = document.getElementById('sidebar-batches');
  if (!mount) return;
  const active = APP.batches.filter(b => b.status === 'fermenting' || b.status === 'conditioning')
    .sort((a, b) => b.startDate.localeCompare(a.startDate))
    .slice(0, 8);
  mount.innerHTML = active.map(b => `<div class="sidebar-batch-item" onclick="switchPage('batches');openBatch('${b.id}')">
    <span class="sidebar-batch-dot status-${b.status}"></span>
    <span class="sidebar-batch-name">${b.name}</span>
  </div>`).join('') || '<div class="sidebar-batch-empty">None active</div>';
}
