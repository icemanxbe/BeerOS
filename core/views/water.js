// Water Chemistry reference view — two distinct small reference sets
// (brewing salts, classic historical city water profiles), so it's a single
// page with two sections rather than one filterable list like the other
// ingredient libraries. Reuses the same recipe-card/stat-row CSS throughout.

const waterViewState = { openProfileId: null };

function renderWaterPage() {
  if (waterViewState.openProfileId) return renderWaterProfileDetail(waterViewState.openProfileId);

  const salts = BUILTIN_SALTS();
  const profiles = BUILTIN_WATER_PROFILES();

  const saltCards = salts.map(s => `<div class="recipe-card">
      <div class="recipe-card-top">
        <div class="recipe-name">${s.name}</div>
        <div class="recipe-style">Adds: ${s.adds}</div>
      </div>
      <p class="recipe-desc" style="margin-bottom:6px">${s.use}</p>
      ${s.perGramPerGallon ? `<div class="recipe-stats"><span>${s.perGramPerGallon}</span></div>` : ''}
      ${s.caution ? `<div class="clone-disclaimer" style="margin-top:8px">${s.caution}</div>` : ''}
    </div>`).join('');

  const profileCards = profiles.map(p => `<div class="recipe-card" onclick="openWaterProfile('${p.id}')">
      <div class="recipe-card-top">
        <div class="recipe-name">${p.name}</div>
        <div class="recipe-style">${p.country} &middot; ${p.style}</div>
      </div>
      <div class="recipe-stats">
        <span>Ca ${p.ca}</span><span>SO4 ${p.so4}</span><span>Cl ${p.cl}</span><span>HCO3 ${p.hco3}</span>
      </div>
    </div>`).join('');

  return `<div class="recipes-page">
    <h1>Water Chemistry</h1>
    <p class="recipes-sub">Brewing salts for building up RO/distilled water, and the classic historical city water profiles, from the knowledge base.</p>
    <h2>Brewing Salts</h2>
    <div class="recipe-grid">${saltCards}</div>
    <h2>Classic Historical Water Profiles</h2>
    <p class="recipes-sub">All values ppm. Click a profile for the full ion breakdown and style context.</p>
    <div class="recipe-grid">${profileCards}</div>
  </div>`;
}

function openWaterProfile(id) { waterViewState.openProfileId = id; rerenderWaterPage(); }
function closeWaterProfile() { waterViewState.openProfileId = null; rerenderWaterPage(); }

function renderWaterProfileDetail(id) {
  const p = BUILTIN_WATER_PROFILES().find(x => x.id === id);
  if (!p) return '<p>Profile not found.</p>';

  return `<div class="recipe-detail">
    <button class="back-btn" onclick="closeWaterProfile()">&larr; Back to Water Chemistry</button>
    <h1>${p.name}</h1>
    <div class="recipe-style">${p.country} &middot; associated with ${p.style}</div>
    <p class="recipe-desc">${p.notes}</p>
    <div class="stat-row">
      <div class="stat"><span class="stat-val">${p.ca}</span><span class="stat-label">Calcium</span></div>
      <div class="stat"><span class="stat-val">${p.mg}</span><span class="stat-label">Magnesium</span></div>
      <div class="stat"><span class="stat-val">${p.na}</span><span class="stat-label">Sodium</span></div>
      <div class="stat"><span class="stat-val">${p.so4}</span><span class="stat-label">Sulfate</span></div>
      <div class="stat"><span class="stat-val">${p.cl}</span><span class="stat-label">Chloride</span></div>
      <div class="stat"><span class="stat-val">${p.hco3}</span><span class="stat-label">Bicarbonate</span></div>
    </div>
    <div class="bjcp-range-note">All values ppm. Historical figures vary by source/well — treat as directional character, not a precision target.</div>
    ${renderUsedInRecipes(recipesMatchingWaterProfile(BUILTIN_RECIPES(), p))}
  </div>`;
}

function rerenderWaterPage() {
  const mount = document.getElementById('water-mount');
  if (mount) mount.innerHTML = renderWaterPage();
}
