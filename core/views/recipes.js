// Recipe Library view — list + detail, computing every stat live via the
// real calculator functions (never hand-typed/stored numbers).

const recipeViewState = { filterRegion: 'all', openRecipeId: null };
const REGION_LABELS = { US: 'United States', DE: 'Germany', UK: 'United Kingdom', IE: 'Ireland', BE: 'Belgium', NL: 'Netherlands', CZ: 'Czech Republic', JP: 'Japan' };

function computeRecipeStats(r) {
  const og = ogFromGrainBill(r.grainBill, r.volumeL, r.mashEfficiency);
  const avgAtt = (r.yeast.attenuationLow + r.yeast.attenuationHigh) / 2;
  const fg = fgFromAttenuation(og, avgAtt);
  const abv = abvSimple(og, fg);
  const ibu = tinsethIBU(r.hopSchedule, r.volumeL, og);
  const srm = moreySRM(r.grainBill.map(g => ({ weightKg: g.weightKg, lovibond: g.lovibond })), r.volumeL);
  return { og, fg, abv, ibu, srm };
}

function renderRecipesPage() {
  if (recipeViewState.openRecipeId) return renderRecipeDetail(recipeViewState.openRecipeId);

  const all = BUILTIN_RECIPES();
  const regions = ['all', ...Array.from(new Set(all.map(r => r.region)))];
  const filtered = recipeViewState.filterRegion === 'all' ? all : all.filter(r => r.region === recipeViewState.filterRegion);

  const filterBtns = regions.map(reg =>
    `<button class="region-btn${reg === recipeViewState.filterRegion ? ' active' : ''}" onclick="setRecipeFilter('${reg}')">${reg === 'all' ? 'All' : (REGION_LABELS[reg] || reg)}</button>`
  ).join('');

  const cards = filtered.map(r => {
    const s = computeRecipeStats(r);
    return `<div class="recipe-card" onclick="openRecipe('${r.id}')">
      <div class="recipe-card-top">
        <div class="recipe-name">${r.name}${r.commercialInspiration ? ' <span class="clone-badge">clone-inspired</span>' : ''}</div>
        <div class="recipe-style">${r.style} &middot; ${r.styleCode}</div>
      </div>
      <div class="recipe-stats">
        <span>OG ${s.og.toFixed(3)}</span><span>ABV ${s.abv.toFixed(1)}%</span><span>IBU ${s.ibu.toFixed(0)}</span><span>SRM ${s.srm.toFixed(1)}</span>
      </div>
      <div class="recipe-tags">${(r.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}</div>
    </div>`;
  }).join('');

  return `<div class="recipes-page">
    <h1>Recipe Library</h1>
    <p class="recipes-sub">${all.length} recipes &middot; every OG/FG/ABV/IBU/SRM computed live from the actual grain bill and hop schedule.</p>
    <div class="region-filters">${filterBtns}</div>
    <div class="recipe-grid">${cards}</div>
  </div>`;
}

function setRecipeFilter(region) { recipeViewState.filterRegion = region; rerenderRecipesPage(); }
function openRecipe(id) { recipeViewState.openRecipeId = id; rerenderRecipesPage(); }
function closeRecipe() { recipeViewState.openRecipeId = null; rerenderRecipesPage(); }

// Shared by the malt/hop/yeast library detail views (ingredient-links.js
// does the matching; this just renders the result as clickable pills,
// reusing the existing filter-button look rather than inventing a new one).
function renderUsedInRecipes(recipeMatches) {
  if (!recipeMatches.length) return '';
  const links = recipeMatches.map(r => `<button class="region-btn" onclick="switchPage('recipes');openRecipe('${r.id}')">${r.name}</button>`).join('');
  return `<h2>Used in These Recipes</h2><div class="region-filters">${links}</div>`;
}

// Read-only preview of the same day-by-day step schedule used once a batch
// is actually started (see getRecipeSteps() in state.js) — one shared
// source of truth so the Recipe Library preview can't drift from what the
// batch checklist actually shows.
function renderRecipeSteps(r) {
  return getRecipeSteps(r).map(s => `Day ${s.day} — ${s.title}: ${s.desc}`);
}

// The reverse of "Brew This Recipe" — batches already store their
// recipeId, so this just reads that back rather than tracking it separately.
// The averages below (see recipe-history.js) are a plain read of your own
// past numbers, not an Advisor rule — shown only once there's real data
// behind them.
function renderYourBatches(recipe) {
  const matches = APP.batches.filter(b => b.recipeId === recipe.id).sort((a, b) => b.startDate.localeCompare(a.startDate));
  if (!matches.length) return '';
  const history = computeRecipeHistory(APP.batches, recipe.id);
  const statParts = [];
  if (history.avgAttenuation !== null) statParts.push(`avg attenuation ${history.avgAttenuation.toFixed(0)}% (yeast spec: ${recipe.yeast.attenuationLow}-${recipe.yeast.attenuationHigh}%)`);
  if (history.avgDaysToComplete !== null) statParts.push(`avg ${history.avgDaysToComplete.toFixed(0)} day(s) to fermentation-complete`);
  const statsLine = statParts.length ? `<p class="stat-hint">Across ${matches.length} batch${matches.length === 1 ? '' : 'es'} of this recipe: ${statParts.join(' &middot; ')} — your own numbers, not a generic estimate.</p>` : '';
  const rows = matches.map(b => `<button class="region-btn" onclick="switchPage('batches');openBatch('${b.id}')">${b.name} <span class="status-pill status-${b.status}">${b.status}</span></button>`).join('');
  return `<h2>Your Batches</h2>${statsLine}<div class="region-filters">${rows}</div>`;
}

function renderRecipeDetail(id) {
  const r = BUILTIN_RECIPES().find(x => x.id === id);
  if (!r) return '<p>Recipe not found.</p>';
  const s = computeRecipeStats(r);

  // Links out to the matching Malt/Hop/Yeast Library entry where one exists
  // (heuristic name match, see ingredient-links.js) — a miss just falls back
  // to plain text rather than a broken/wrong link.
  const linkTo = (page, openFn, id, label) => id ? `<a href="#" onclick="switchPage('${page}');${openFn}('${id}');return false;">${label}</a>` : label;
  const malts = BUILTIN_MALTS(), hopsLib = BUILTIN_HOPS(), yeastsLib = BUILTIN_YEASTS();
  const grainRows = r.grainBill.map(g => {
    const match = maltsMatchingName(malts, g.name)[0];
    return `<tr><td>${linkTo('malts', 'openMalt', match && match.id, g.name)}</td><td>${g.weightKg.toFixed(2)} kg</td><td>${g.ppg} PPG</td><td>${g.lovibond}&deg;L</td></tr>`;
  }).join('');
  const hopRows = r.hopSchedule.map(h => {
    const match = hopsMatchingName(hopsLib, h.name)[0];
    return `<tr><td>${linkTo('hops', 'openHop', match && match.id, h.name)}</td><td>${h.weightG} g</td><td>${h.aaPct}%</td><td>${h.minutes} min</td><td>${h.purpose || ''}</td></tr>`;
  }).join('');
  const dryHopRow = r.dryHop ? `<div class="dry-hop-note">Dry hop: ${r.dryHop.map(d => `${d.name} (${d.weightG}g)`).join(', ')}</div>` : '';
  const yeastMatch = yeastsMatchingRecipeYeast(yeastsLib, r.yeast.name)[0];
  const yeastNameHtml = linkTo('yeasts', 'openYeast', yeastMatch && yeastMatch.id, r.yeast.name);
  const waterMatches = waterProfilesMatchingRecipe(BUILTIN_WATER_PROFILES(), r);
  const waterProfileNote = waterMatches.length
    ? `<div class="bjcp-range-note">Historically associated water profile: ${waterMatches.map(p => linkTo('water', 'openWaterProfile', p.id, p.name)).join(', ')} &mdash; see Water Chemistry for the full ion breakdown.</div>`
    : '';

  return `<div class="recipe-detail">
    <button class="back-btn" onclick="closeRecipe()">&larr; Back to Recipe Library</button>
    <div class="recipe-detail-top">
      <h1>${r.name}</h1>
      <button class="brew-btn" onclick="startBatchFromRecipe('${r.id}')">Brew This Recipe</button>
    </div>
    <div class="recipe-style">${r.style} &middot; ${r.styleCode} &middot; ${REGION_LABELS[r.region] || r.region} &middot; ${r.difficulty}</div>
    <p class="recipe-desc">${r.description}</p>
    <div class="stat-row">
      <div class="stat"><span class="stat-val">${s.og.toFixed(3)}</span><span class="stat-label">OG</span></div>
      <div class="stat"><span class="stat-val">${s.fg.toFixed(3)}</span><span class="stat-label">FG</span></div>
      <div class="stat"><span class="stat-val">${s.abv.toFixed(1)}%</span><span class="stat-label">ABV</span></div>
      <div class="stat"><span class="stat-val">${s.ibu.toFixed(0)}</span><span class="stat-label">IBU</span></div>
      <div class="stat"><span class="stat-val">${s.srm.toFixed(1)}</span><span class="stat-label">SRM</span></div>
    </div>
    <div class="bjcp-range-note">BJCP ${r.styleCode} target: OG ${r.bjcpRange.og[0]}-${r.bjcpRange.og[1]} &middot; FG ${r.bjcpRange.fg[0]}-${r.bjcpRange.fg[1]} &middot; ABV ${r.bjcpRange.abv[0]}-${r.bjcpRange.abv[1]}% &middot; IBU ${r.bjcpRange.ibu[0]}-${r.bjcpRange.ibu[1]} &middot; SRM ${r.bjcpRange.srm[0]}-${r.bjcpRange.srm[1]}</div>
    ${r.commercialInspiration ? `<div class="clone-disclaimer">This is a homebrew approximation inspired by ${r.name.replace(/-Inspired.*/, '')}'s real published ABV (${r.realAbv}%) and publicly known style/character — not the actual proprietary commercial recipe.</div>` : ''}
    ${waterProfileNote}
    ${renderYourBatches(r)}

    <h2>Grain Bill</h2>
    <div class="table-scroll"><table class="ingredient-table"><thead><tr><th>Fermentable</th><th>Weight</th><th>Potential</th><th>Color</th></tr></thead><tbody>${grainRows}</tbody></table></div>

    <h2>Hop Schedule</h2>
    <div class="table-scroll"><table class="ingredient-table"><thead><tr><th>Hop</th><th>Weight</th><th>AA%</th><th>Time</th><th>Purpose</th></tr></thead><tbody>${hopRows}</tbody></table></div>
    ${dryHopRow}

    <h2>Yeast</h2>
    <p>${yeastNameHtml} &middot; ${r.yeast.attenuationLow}-${r.yeast.attenuationHigh}% attenuation &middot; ${r.yeast.tempLowC}-${r.yeast.tempHighC}&deg;C${r.yeast.notes ? `<br><em>${r.yeast.notes}</em>` : ''}</p>

    <h2>Brewing Steps</h2>
    <ol class="step-list">${renderRecipeSteps(r).map(step => `<li>${step}</li>`).join('')}</ol>
    ${r.processNotes ? `<p class="stat-hint">${r.processNotes}</p>` : ''}
  </div>`;
}

function rerenderRecipesPage() {
  const mount = document.getElementById('recipes-mount');
  if (mount) mount.innerHTML = renderRecipesPage();
}
