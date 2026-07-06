// Brewing Tools UI — renders calculator cards into #tools-mount and wires
// live recompute on input. Pure DOM string rendering, no framework, matching
// the rest of BeerOS's no-build-step architecture.

const toolsState = {
  ogGrains: [{ weightKg: 4.5, ppg: 37 }],
  srmGrains: [{ weightKg: 4.5, lovibond: 2 }],
  ibuHops: [{ weightG: 28, aaPct: 6, minutes: 60 }]
};

function fmt(n, dp) { return Number(n).toFixed(dp === undefined ? 3 : dp); }

function renderBrewingTools() {
  return '<div class="tools-page">'
    + '<h1>Brewing Tools</h1>'
    + renderOgCard()
    + renderAbvCard()
    + renderIbuCard()
    + renderSrmCard()
    + renderStrikeTempCard()
    + renderPrimingCard()
    + '</div>';
}

// ---- OG from grain bill ----
function renderOgCard() {
  const rows = toolsState.ogGrains.map((g, i) =>
    '<div class="calc-row">'
    + `<input type="number" step="0.01" value="${g.weightKg}" oninput="updateOgGrain(${i},'weightKg',this.value)"> kg`
    + `<input type="number" step="1" value="${g.ppg}" oninput="updateOgGrain(${i},'ppg',this.value)"> PPG`
    + `<button onclick="removeOgGrain(${i})">&times;</button>`
    + '</div>'
  ).join('');
  const volEl = document.getElementById && document.getElementById('og-vol');
  const vol = volEl ? parseFloat(volEl.value) || 20 : 20;
  const effEl = document.getElementById && document.getElementById('og-eff');
  const eff = effEl ? parseFloat(effEl.value) || 71 : 71;
  const og = ogFromGrainBill(toolsState.ogGrains, vol, eff / 100);
  return '<div class="calc-card"><h2>Original Gravity (grain bill)</h2>'
    + rows
    + '<button onclick="addOgGrain()">+ grain</button>'
    + '<div class="calc-row">Batch volume <input type="number" id="og-vol" value="' + vol + '" step="0.1" oninput="rerenderTools()"> L</div>'
    + '<div class="calc-row">Efficiency <input type="number" id="og-eff" value="' + eff + '" step="1" oninput="rerenderTools()"> %</div>'
    + '<div class="calc-result">OG = ' + fmt(og, 4) + '</div>'
    + '</div>';
}
function addOgGrain() { toolsState.ogGrains.push({ weightKg: 1, ppg: 37 }); rerenderTools(); }
function removeOgGrain(i) { toolsState.ogGrains.splice(i, 1); rerenderTools(); }
function updateOgGrain(i, field, val) { toolsState.ogGrains[i][field] = parseFloat(val) || 0; rerenderTools(); }

// ---- ABV ----
function renderAbvCard() {
  const ogEl = document.getElementById && document.getElementById('abv-og');
  const fgEl = document.getElementById && document.getElementById('abv-fg');
  const og = ogEl ? parseFloat(ogEl.value) || 1.050 : 1.050;
  const fg = fgEl ? parseFloat(fgEl.value) || 1.010 : 1.010;
  const simple = abvSimple(og, fg);
  const high = abvHighGravity(og, fg);
  return '<div class="calc-card"><h2>ABV</h2>'
    + '<div class="calc-row">OG <input type="number" id="abv-og" value="' + og + '" step="0.001" oninput="rerenderTools()"></div>'
    + '<div class="calc-row">FG <input type="number" id="abv-fg" value="' + fg + '" step="0.001" oninput="rerenderTools()"></div>'
    + '<div class="calc-result">Simple: ' + fmt(simple, 2) + '% &middot; High-gravity: ' + fmt(high, 2) + '%'
    + (Math.abs(simple - high) > 0.3 ? ' <span class="calc-note">(diverging — use high-gravity formula above ~1.070 OG)</span>' : '')
    + '</div></div>';
}

// ---- IBU (Tinseth) ----
function renderIbuCard() {
  const rows = toolsState.ibuHops.map((h, i) =>
    '<div class="calc-row">'
    + `<input type="number" step="1" value="${h.weightG}" oninput="updateIbuHop(${i},'weightG',this.value)"> g`
    + `<input type="number" step="0.1" value="${h.aaPct}" oninput="updateIbuHop(${i},'aaPct',this.value)"> % AA`
    + `<input type="number" step="1" value="${h.minutes}" oninput="updateIbuHop(${i},'minutes',this.value)"> min`
    + `<button onclick="removeIbuHop(${i})">&times;</button>`
    + '</div>'
  ).join('');
  const volEl = document.getElementById && document.getElementById('ibu-vol');
  const vol = volEl ? parseFloat(volEl.value) || 20 : 20;
  const ogEl = document.getElementById && document.getElementById('ibu-og');
  const og = ogEl ? parseFloat(ogEl.value) || 1.050 : 1.050;
  const ibu = tinsethIBU(toolsState.ibuHops, vol, og);
  return '<div class="calc-card"><h2>IBU (Tinseth)</h2>'
    + rows
    + '<button onclick="addIbuHop()">+ hop addition</button>'
    + '<div class="calc-row">Batch volume <input type="number" id="ibu-vol" value="' + vol + '" step="0.1" oninput="rerenderTools()"> L</div>'
    + '<div class="calc-row">Avg boil gravity <input type="number" id="ibu-og" value="' + og + '" step="0.001" oninput="rerenderTools()"></div>'
    + '<div class="calc-result">IBU = ' + fmt(ibu, 1) + '</div>'
    + '</div>';
}
function addIbuHop() { toolsState.ibuHops.push({ weightG: 28, aaPct: 6, minutes: 60 }); rerenderTools(); }
function removeIbuHop(i) { toolsState.ibuHops.splice(i, 1); rerenderTools(); }
function updateIbuHop(i, field, val) { toolsState.ibuHops[i][field] = parseFloat(val) || 0; rerenderTools(); }

// ---- SRM (Morey) ----
function renderSrmCard() {
  const rows = toolsState.srmGrains.map((g, i) =>
    '<div class="calc-row">'
    + `<input type="number" step="0.01" value="${g.weightKg}" oninput="updateSrmGrain(${i},'weightKg',this.value)"> kg`
    + `<input type="number" step="1" value="${g.lovibond}" oninput="updateSrmGrain(${i},'lovibond',this.value)"> &deg;L`
    + `<button onclick="removeSrmGrain(${i})">&times;</button>`
    + '</div>'
  ).join('');
  const volEl = document.getElementById && document.getElementById('srm-vol');
  const vol = volEl ? parseFloat(volEl.value) || 20 : 20;
  const srm = moreySRM(toolsState.srmGrains, vol);
  return '<div class="calc-card"><h2>Color (Morey SRM)</h2>'
    + rows
    + '<button onclick="addSrmGrain()">+ grain</button>'
    + '<div class="calc-row">Batch volume <input type="number" id="srm-vol" value="' + vol + '" step="0.1" oninput="rerenderTools()"> L</div>'
    + '<div class="calc-result">SRM = ' + fmt(srm, 1) + ' &middot; EBC = ' + fmt(srmToEBC(srm), 1) + '</div>'
    + '</div>';
}
function addSrmGrain() { toolsState.srmGrains.push({ weightKg: 1, lovibond: 2 }); rerenderTools(); }
function removeSrmGrain(i) { toolsState.srmGrains.splice(i, 1); rerenderTools(); }
function updateSrmGrain(i, field, val) { toolsState.srmGrains[i][field] = parseFloat(val) || 0; rerenderTools(); }

// ---- Strike water temperature ----
function renderStrikeTempCard() {
  const g = id => { const el = document.getElementById && document.getElementById(id); return el ? parseFloat(el.value) : null; };
  const target = g('strike-target') ?? 67;
  const grain = g('strike-grain') ?? 20;
  const ratio = g('strike-ratio') ?? 3;
  const strike = strikeWaterTempC(target, grain, ratio);
  return '<div class="calc-card"><h2>Strike Water Temperature</h2>'
    + '<div class="calc-row">Target mash temp <input type="number" id="strike-target" value="' + target + '" step="0.5" oninput="rerenderTools()"> &deg;C</div>'
    + '<div class="calc-row">Grain temp <input type="number" id="strike-grain" value="' + grain + '" step="0.5" oninput="rerenderTools()"> &deg;C</div>'
    + '<div class="calc-row">Water:grain ratio <input type="number" id="strike-ratio" value="' + ratio + '" step="0.1" oninput="rerenderTools()"> L/kg</div>'
    + '<div class="calc-result">Strike water = ' + fmt(strike, 1) + ' &deg;C</div>'
    + '</div>';
}

// ---- Priming sugar ----
function renderPrimingCard() {
  const g = id => { const el = document.getElementById && document.getElementById(id); return el ? parseFloat(el.value) : null; };
  const target = g('prime-target') ?? 2.4;
  const vol = g('prime-vol') ?? 20;
  const temp = g('prime-temp') ?? 20;
  const typeEl = document.getElementById && document.getElementById('prime-type');
  const sugarType = typeEl ? typeEl.value : 'dextrose';
  const grams = primingSugarGrams(target, vol, temp, sugarType);
  return '<div class="calc-card"><h2>Priming Sugar (Bottle Carbonation)</h2>'
    + '<div class="calc-row">Target CO&#8322; volumes <input type="number" id="prime-target" value="' + target + '" step="0.1" oninput="rerenderTools()"></div>'
    + '<div class="calc-row">Batch volume <input type="number" id="prime-vol" value="' + vol + '" step="0.1" oninput="rerenderTools()"> L</div>'
    + '<div class="calc-row">Beer temp <input type="number" id="prime-temp" value="' + temp + '" step="0.5" oninput="rerenderTools()"> &deg;C</div>'
    + '<div class="calc-row">Sugar type <select id="prime-type" onchange="rerenderTools()">'
    + ['dextrose', 'sucrose', 'dme'].map(t => '<option value="' + t + '"' + (t === sugarType ? ' selected' : '') + '>' + t + '</option>').join('')
    + '</select></div>'
    + '<div class="calc-result">' + fmt(grams, 1) + ' g</div>'
    + '</div>';
}

function rerenderTools() {
  const mount = document.getElementById('tools-mount');
  if (mount) mount.innerHTML = renderBrewingTools();
}
