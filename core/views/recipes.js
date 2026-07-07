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

// Read-only preview of the same day-by-day step schedule used once a batch
// is actually started (see getRecipeSteps() in state.js) — one shared
// source of truth so the Recipe Library preview can't drift from what the
// batch checklist actually shows.
function renderRecipeSteps(r) {
  return getRecipeSteps(r).map(s => `Day ${s.day} — ${s.title}: ${s.desc}`);
}

function renderRecipeDetail(id) {
  const r = BUILTIN_RECIPES().find(x => x.id === id);
  if (!r) return '<p>Recipe not found.</p>';
  const s = computeRecipeStats(r);

  const grainRows = r.grainBill.map(g => `<tr><td>${g.name}</td><td>${g.weightKg.toFixed(2)} kg</td><td>${g.ppg} PPG</td><td>${g.lovibond}&deg;L</td></tr>`).join('');
  const hopRows = r.hopSchedule.map(h => `<tr><td>${h.name}</td><td>${h.weightG} g</td><td>${h.aaPct}%</td><td>${h.minutes} min</td><td>${h.purpose || ''}</td></tr>`).join('');
  const dryHopRow = r.dryHop ? `<div class="dry-hop-note">Dry hop: ${r.dryHop.map(d => `${d.name} (${d.weightG}g)`).join(', ')}</div>` : '';

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

    <h2>Grain Bill</h2>
    <div class="table-scroll"><table class="ingredient-table"><thead><tr><th>Fermentable</th><th>Weight</th><th>Potential</th><th>Color</th></tr></thead><tbody>${grainRows}</tbody></table></div>

    <h2>Hop Schedule</h2>
    <div class="table-scroll"><table class="ingredient-table"><thead><tr><th>Hop</th><th>Weight</th><th>AA%</th><th>Time</th><th>Purpose</th></tr></thead><tbody>${hopRows}</tbody></table></div>
    ${dryHopRow}

    <h2>Yeast</h2>
    <p>${r.yeast.name} &middot; ${r.yeast.attenuationLow}-${r.yeast.attenuationHigh}% attenuation &middot; ${r.yeast.tempLowC}-${r.yeast.tempHighC}&deg;C${r.yeast.notes ? `<br><em>${r.yeast.notes}</em>` : ''}</p>

    <h2>Brewing Steps</h2>
    <ol class="step-list">${renderRecipeSteps(r).map(step => `<li>${step}</li>`).join('')}</ol>
    ${r.processNotes ? `<p class="stat-hint">${r.processNotes}</p>` : ''}
  </div>`;
}

function rerenderRecipesPage() {
  const mount = document.getElementById('recipes-mount');
  if (mount) mount.innerHTML = renderRecipesPage();
}
