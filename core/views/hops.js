// Hop Library view — browsable reference independent of any recipe. Mirrors
// malts.js/recipes.js's list+detail pattern and reuses the same CSS classes.

const hopViewState = { filterFamily: 'all', openHopId: null };
const HOP_FAMILY_LABELS = { american: 'American C-hops', noble: 'Noble (European)', english: 'English', newworld: 'New World / Southern Hemisphere' };

function renderHopsPage() {
  if (hopViewState.openHopId) return renderHopDetail(hopViewState.openHopId);

  const all = BUILTIN_HOPS();
  const families = ['all', ...Array.from(new Set(all.map(h => h.family)))];
  const filtered = hopViewState.filterFamily === 'all' ? all : all.filter(h => h.family === hopViewState.filterFamily);

  const filterBtns = families.map(fam =>
    `<button class="region-btn${fam === hopViewState.filterFamily ? ' active' : ''}" onclick="setHopFilter('${fam}')">${fam === 'all' ? 'All' : (HOP_FAMILY_LABELS[fam] || fam)}</button>`
  ).join('');

  const cards = filtered.map(h => `<div class="recipe-card" onclick="openHop('${h.id}')">
      <div class="recipe-card-top">
        <div class="recipe-name">${h.name}</div>
        <div class="recipe-style">${HOP_FAMILY_LABELS[h.family] || h.family}</div>
      </div>
      <div class="recipe-stats">
        <span>${fmtRange(h.aaPct, '% AA')}</span>
        <span>${h.role}</span>
      </div>
    </div>`).join('');

  return `<div class="recipes-page">
    <h1>Hop Library</h1>
    <p class="recipes-sub">${all.length} hop varieties &middot; alpha acid %, role, and flavor/aroma descriptors from the knowledge base.</p>
    <div class="region-filters">${filterBtns}</div>
    <div class="recipe-grid">${cards}</div>
  </div>`;
}

function setHopFilter(fam) { hopViewState.filterFamily = fam; rerenderHopsPage(); }
function openHop(id) { hopViewState.openHopId = id; rerenderHopsPage(); }
function closeHop() { hopViewState.openHopId = null; rerenderHopsPage(); }

function renderHopDetail(id) {
  const h = BUILTIN_HOPS().find(x => x.id === id);
  if (!h) return '<p>Hop not found.</p>';

  return `<div class="recipe-detail">
    <button class="back-btn" onclick="closeHop()">&larr; Back to Hop Library</button>
    <h1>${h.name}</h1>
    <div class="recipe-style">${HOP_FAMILY_LABELS[h.family] || h.family}</div>
    <p class="recipe-desc">${h.flavor}</p>
    <div class="stat-row">
      <div class="stat"><span class="stat-val">${fmtRange(h.aaPct, '%')}</span><span class="stat-label">Alpha Acid</span></div>
    </div>
    <div class="bjcp-range-note">Role: ${h.role} &middot; AA% varies by crop year/region — always check the lot-specific % on your actual package before calculating IBUs.</div>
  </div>`;
}

function rerenderHopsPage() {
  const mount = document.getElementById('hops-mount');
  if (mount) mount.innerHTML = renderHopsPage();
}
