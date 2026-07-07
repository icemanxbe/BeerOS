// Yeast Library view — browsable reference independent of any recipe. Mirrors
// malts.js/hops.js/recipes.js's list+detail pattern and reuses the same CSS.

const yeastViewState = { filterCategory: 'all', openYeastId: null };
const YEAST_CATEGORY_LABELS = { american: 'Clean American Ale', english: 'English Ale', belgian: 'Belgian', wheat: 'Wheat Beer', lager: 'Lager', kveik: 'Kveik (Norwegian Farmhouse)' };

function renderYeastsPage() {
  if (yeastViewState.openYeastId) return renderYeastDetail(yeastViewState.openYeastId);

  const all = BUILTIN_YEASTS();
  const categories = ['all', ...Array.from(new Set(all.map(y => y.category)))];
  const filtered = yeastViewState.filterCategory === 'all' ? all : all.filter(y => y.category === yeastViewState.filterCategory);

  const filterBtns = categories.map(cat =>
    `<button class="region-btn${cat === yeastViewState.filterCategory ? ' active' : ''}" onclick="setYeastFilter('${cat}')">${cat === 'all' ? 'All' : (YEAST_CATEGORY_LABELS[cat] || cat)}</button>`
  ).join('');

  const cards = filtered.map(y => `<div class="recipe-card" onclick="openYeast('${y.id}')">
      <div class="recipe-card-top">
        <div class="recipe-name">${y.name}</div>
        <div class="recipe-style">${YEAST_CATEGORY_LABELS[y.category] || y.category} &middot; ${y.form}</div>
      </div>
      <div class="recipe-stats">
        ${y.attenuationPct ? `<span>${fmtRange(y.attenuationPct, '%')} att.</span>` : ''}
        <span>${fmtRange(y.tempRangeC, '&deg;C')}</span>
      </div>
    </div>`).join('');

  return `<div class="recipes-page">
    <h1>Yeast Library</h1>
    <p class="recipes-sub">${all.length} commercial strains &middot; attenuation, temperature range, flocculation, and character from the knowledge base.</p>
    <div class="region-filters">${filterBtns}</div>
    <div class="recipe-grid">${cards}</div>
  </div>`;
}

function setYeastFilter(cat) { yeastViewState.filterCategory = cat; rerenderYeastsPage(); }
function openYeast(id) { yeastViewState.openYeastId = id; rerenderYeastsPage(); }
function closeYeast() { yeastViewState.openYeastId = null; rerenderYeastsPage(); }

function renderYeastDetail(id) {
  const y = BUILTIN_YEASTS().find(x => x.id === id);
  if (!y) return '<p>Yeast not found.</p>';

  return `<div class="recipe-detail">
    <button class="back-btn" onclick="closeYeast()">&larr; Back to Yeast Library</button>
    <h1>${y.name}</h1>
    <div class="recipe-style">${YEAST_CATEGORY_LABELS[y.category] || y.category} &middot; ${y.form}</div>
    <p class="recipe-desc">${y.character}</p>
    <div class="stat-row">
      <div class="stat"><span class="stat-val">${y.attenuationPct ? fmtRange(y.attenuationPct, '%') : '—'}</span><span class="stat-label">Attenuation</span></div>
      <div class="stat"><span class="stat-val">${fmtRange(y.tempRangeC, '&deg;C')}</span><span class="stat-label">Temp Range</span></div>
      <div class="stat"><span class="stat-val" style="font-size:16px">${y.flocculation}</span><span class="stat-label">Flocculation</span></div>
    </div>
    <div class="bjcp-range-note">Pitch-rate style: ${y.pitchStyle}</div>
    ${renderUsedInRecipes(recipesUsingYeast(BUILTIN_RECIPES(), y))}
  </div>`;
}

function rerenderYeastsPage() {
  const mount = document.getElementById('yeasts-mount');
  if (mount) mount.innerHTML = renderYeastsPage();
}
