// Fermenter/keg vessel visualization — a small SVG whose shape, liquid color
// and animation all come from real batch state (recipe SRM, batch status),
// not decoration bolted on after the fact. Fermenting = active airlock bubbles
// + krausen foam. Conditioning = calm, settling particles. Done = kegged.

function vesselLiquidColor(recipe) {
  if (!recipe) return '#8a6a3a'; // no recipe (custom batch) — generic amber, can't compute real SRM
  const srm = moreySRM(recipe.grainBill.map(g => ({ weightKg: g.weightKg, lovibond: g.lovibond })), recipe.volumeL);
  return srmToHex(srm);
}

// size: 'lg' (batch detail hero) or 'sm' (batch list row icon)
function renderVesselSVG(batch, recipe, size) {
  const liquid = vesselLiquidColor(recipe);
  const status = batch.status;
  const w = size === 'sm' ? 34 : 108, h = size === 'sm' ? 48 : 152;
  const uid = 'v' + batch.id.replace(/[^a-z0-9]/gi, '');

  const fermenting = status === 'fermenting';
  const conditioning = status === 'conditioning';
  const done = status === 'done';

  // Conical fermenter: cylindrical body + tapered cone bottom + domed lid + airlock.
  const body = !done ? `
    <clipPath id="clip-${uid}"><path d="M14 18 h80 v58 l-40 46 l-40 -46 z"/></clipPath>
    <path d="M14 18 h80 v58 l-40 46 l-40 -46 z" fill="#2b2f36" stroke="#454b56" stroke-width="2"/>
    <g clip-path="url(#clip-${uid})">
      <rect x="10" y="46" width="88" height="90" fill="${liquid}" opacity="0.88"/>
      ${fermenting ? `<path d="M14 46 q10 -5 20 0 t20 0 t20 0 t20 0 v6 h-80 z" fill="${liquid}" opacity="0.6"><animate attributeName="d" dur="2.4s" repeatCount="indefinite"
        values="M14 46 q10 -5 20 0 t20 0 t20 0 t20 0 v6 h-80 z;
                M14 47 q10 3 20 0 t20 0 t20 0 t20 0 v6 h-80 z;
                M14 46 q10 -5 20 0 t20 0 t20 0 t20 0 v6 h-80 z"/></path>` : ''}
      ${conditioning ? `
        <circle class="vessel-particle" cx="30" cy="60" r="1.6" fill="#00000055"/>
        <circle class="vessel-particle p2" cx="55" cy="70" r="1.3" fill="#00000055"/>
        <circle class="vessel-particle p3" cx="72" cy="58" r="1.8" fill="#00000055"/>
      ` : ''}
    </g>
    <path d="M14 18 h80 v58 l-40 46 l-40 -46 z" fill="none" stroke="#454b56" stroke-width="2"/>
    <ellipse cx="54" cy="18" rx="40" ry="8" fill="#3a3f48" stroke="#4d545f" stroke-width="2"/>
    <rect x="47" y="4" width="14" height="14" rx="3" fill="#3a3f48" stroke="#4d545f" stroke-width="2"/>
    ${fermenting ? `
      <g class="vessel-airlock">
        <circle cx="54" cy="2" r="2" fill="var(--copper2)"><animate attributeName="cy" values="10;-2;10" dur="1.8s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite"/></circle>
      </g>` : ''}
  ` : `
    <rect x="24" y="16" width="60" height="112" rx="14" fill="#3a3f48" stroke="#4d545f" stroke-width="2"/>
    <rect x="24" y="16" width="60" height="112" rx="14" fill="${liquid}" opacity="0.22"/>
    <rect x="38" y="4" width="32" height="14" rx="4" fill="#4d545f"/>
    <circle cx="54" cy="70" r="16" fill="none" stroke="var(--copper2)" stroke-width="2" opacity="0.7"/>
    <path d="M47 70 l5 5 l10 -11" fill="none" stroke="var(--copper2)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  `;

  return `<svg class="vessel-svg vessel-${size||'lg'} vessel-${status}" viewBox="0 0 108 152" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
}
