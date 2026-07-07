// Malt & Grain Library view — browsable reference independent of any recipe,
// for building/understanding custom grain bills. Mirrors recipes.js's
// list+detail pattern and reuses its card/filter CSS classes as-is.

const maltViewState = { filterCategory: 'all', openMaltId: null };
const MALT_CATEGORY_LABELS = { base: 'Base Malts', specialty: 'Specialty / Crystal', roasted: 'Roasted', adjunct: 'Adjuncts', extract: 'Extract' };

function fmtRange(range, unit) {
  if (!range) return null;
  return range[0] === range[1] ? `${range[0]}${unit}` : `${range[0]}–${range[1]}${unit}`;
}

function renderMaltsPage() {
  if (maltViewState.openMaltId) return renderMaltDetail(maltViewState.openMaltId);

  const all = BUILTIN_MALTS();
  const categories = ['all', ...Array.from(new Set(all.map(m => m.category)))];
  const filtered = maltViewState.filterCategory === 'all' ? all : all.filter(m => m.category === maltViewState.filterCategory);

  const filterBtns = categories.map(cat =>
    `<button class="region-btn${cat === maltViewState.filterCategory ? ' active' : ''}" onclick="setMaltFilter('${cat}')">${cat === 'all' ? 'All' : (MALT_CATEGORY_LABELS[cat] || cat)}</button>`
  ).join('');

  const cards = filtered.map(m => {
    const color = fmtRange(m.colorL, '°L');
    const usage = fmtRange(m.usagePct, '%');
    return `<div class="recipe-card" onclick="openMalt('${m.id}')">
      <div class="recipe-card-top">
        <div class="recipe-name">${m.name}</div>
        <div class="recipe-style">${MALT_CATEGORY_LABELS[m.category] || m.category}</div>
      </div>
      <div class="recipe-stats">
        ${color ? `<span>${color}</span>` : ''}
        ${usage ? `<span>${usage} typical</span>` : ''}
        <span>${m.ppg} PPG</span>
      </div>
    </div>`;
  }).join('');

  return `<div class="recipes-page">
    <h1>Malt &amp; Grain Library</h1>
    <p class="recipes-sub">${all.length} malts &amp; grains &middot; color, diastatic power, PPG, and typical usage from the knowledge base.</p>
    <div class="region-filters">${filterBtns}</div>
    <div class="recipe-grid">${cards}</div>
  </div>`;
}

function setMaltFilter(cat) { maltViewState.filterCategory = cat; rerenderMaltsPage(); }
function openMalt(id) { maltViewState.openMaltId = id; rerenderMaltsPage(); }
function closeMalt() { maltViewState.openMaltId = null; rerenderMaltsPage(); }

function renderMaltDetail(id) {
  const m = BUILTIN_MALTS().find(x => x.id === id);
  if (!m) return '<p>Malt not found.</p>';
  const color = fmtRange(m.colorL, '°L');
  const colorEBC = fmtRange(m.colorEBC, ' EBC');
  const dp = fmtRange(m.dpLintner, '°Lintner');
  const usage = fmtRange(m.usagePct, '%');
  const selfConvText = m.selfConverting === true ? 'Yes' : m.selfConverting === false ? 'No' : m.selfConverting === 'marginal' ? 'Marginal — check the spec sheet' : 'N/A (pre-converted extract)';

  return `<div class="recipe-detail">
    <button class="back-btn" onclick="closeMalt()">&larr; Back to Malt &amp; Grain Library</button>
    <h1>${m.name}</h1>
    <div class="recipe-style">${MALT_CATEGORY_LABELS[m.category] || m.category}</div>
    <p class="recipe-desc">${m.flavor}</p>
    <div class="stat-row">
      ${color ? `<div class="stat"><span class="stat-val">${color}</span><span class="stat-label">Color</span></div>` : ''}
      ${colorEBC ? `<div class="stat"><span class="stat-val">${colorEBC}</span><span class="stat-label">Color (EBC)</span></div>` : ''}
      ${dp ? `<div class="stat"><span class="stat-val">${dp}</span><span class="stat-label">Diastatic Power</span></div>` : ''}
      <div class="stat"><span class="stat-val">${m.ppg}</span><span class="stat-label">PPG</span></div>
    </div>
    <div class="bjcp-range-note">Self-converting alone: ${selfConvText}${usage ? ` &middot; Typical usage: ${usage} of the grain bill` : ''}</div>
    ${m.caution ? `<div class="clone-disclaimer">${m.caution}</div>` : ''}
    ${renderUsedInRecipes(recipesUsingMalt(BUILTIN_RECIPES(), m))}
  </div>`;
}

function rerenderMaltsPage() {
  const mount = document.getElementById('malts-mount');
  if (mount) mount.innerHTML = renderMaltsPage();
}
