// ============================================================
// Scorecard formula calculators (KPI / Performance / YTD)
//
// The formula-builder modals (KpiFormulaModal, KpiPerformanceFormulaModal,
// KpiYtdFormulaModal) are plain markup that delegate all behaviour to a set of
// `window.*` globals — exactly as the legacy stratroom-web `standard_view.js`
// did via jQuery. This module reimplements those globals in vanilla DOM +
// the app's fetch-based API client, and wires them to the backend
// `POST /validateFormula` and `GET /retrieveNodeKeyList` endpoints.
//
// Call `initScorecardCalculator()` once (from the Scorecard page) — it returns
// a cleanup function that tears everything down.
// ============================================================

import { validateFormula, retrieveNodeKeyList } from '../services/scorecardApi';

// component -> DOM ids it owns
const COMPONENTS = {
  KPI: {
    modalId: 'kpiActual-calculator-modal',
    textareaId: 'formula',
    lists: { main: 'measureNames', sub: 'kpisubmeasureNames', init: 'kpiinitiativeNames' },
  },
  KPIPERFORMANCE: {
    modalId: 'kpi_formula_popup',
    textareaId: 'performanceformula',
    lists: { main: 'PerformancemeasureNames' },
  },
  YTD: {
    modalId: 'ytd-calculator-modal',
    textareaId: 'customYtdformula',
    lists: { main: 'ytdMeasureNames', sub: 'ytdsubMeasureNames', init: 'ytdinitiativeNames' },
  },
  SCORECARDCONFIG: {
    modalId: 'kpi-calculator-modal',
    textareaId: 'formulaScoreCardPerspective',
    lists: { main: 'scorecardMeasureNames' },
  },
  PERSPECTIVE: {
    modalId: 'perspectiveCustomThreshold',
    textareaId: 'perspectiveCustomformula',
    lists: { main: 'perspectiveMeasureNames' },
  },
  OBJECTIVE: {
    modalId: 'objectiveCustomThreshold',
    textareaId: 'objectiveCustomformula',
    lists: { main: 'objectiveMeasureNames' },
  },
  THRESSHOLD: {
    modalId: 'kpiCustomThreshold',
    textareaId: 'kpiCustomformula',
    lists: { main: 'thressholdMeasureNames' },
  },
};

const MODAL_TO_COMPONENT = Object.fromEntries(
  Object.entries(COMPONENTS).map(([k, v]) => [v.modalId, k])
);

const FUNCTION_DESC = {
  if: "Returns second argument if first argument is true; Returns optional third argument if first argument is false; IF([KPI1, KPI2], 'trueCalc', 'falseCalc') IF(ACTUAL=0,0,ACTUAL/TARGET), IF(sum(ACTUAL)=0,0,sum(ACTUAL)/sum(TARGET)) , IF(sum[RG|OG]=0,0,sum[RG|OG]/sum[RG|OG])",
  avg: "Returns the sum of the given expressions avg(ACTUAL) avg[RG] avg(avg[RG],avg[OG])",
  agg: "Returns the sum of the given expressions agg(ACTUAL) agg(sum[RG],sum[OG])",
  count: "Returns the count of the given expressions count[ACTUAL]+count[RG] = value",
  sum: "Returns the sum of the given expressions SUM(ACTUAL) SUM(agg[RG],agg[OG])",
  min: "Returns the smallest of the given expressions MIN(ACTUAL, TARGET) MIN(agg[RG],agg[OG])",
  max: "Returns the biggest of the given expressions MAX(ACTUAL, TARGET) MAX(agg[RG],agg[OG])",
};

// The KPI input that launched the currently-open calculator. On "Add" the
// validated formula is written back here.
let activeInput = null;
// Cache the node-key list across opens (same data for every calculator).
let nodeKeyCache = null;

// ── DOM helpers ───────────────────────────────────────────────
function insertToken(textareaId, token) {
  const box = document.getElementById(textareaId);
  if (!box) return;
  const start = typeof box.selectionStart === 'number' ? box.selectionStart : box.value.length;
  const end = typeof box.selectionEnd === 'number' ? box.selectionEnd : box.value.length;
  box.value = box.value.slice(0, start) + token + box.value.slice(end);
  const pos = start + token.length;
  box.focus();
  try { box.setSelectionRange(pos, pos); } catch { /* unsupported */ }
}

function setDescription(component, name, descKey) {
  const cfg = COMPONENTS[component];
  const modal = cfg && document.getElementById(cfg.modalId);
  if (!modal) return;
  const head = modal.querySelector('.formulaheaderdesc');
  const body = modal.querySelector('.formulacontentdesc');
  if (head) head.textContent = String(name).toUpperCase();
  if (body) body.textContent = FUNCTION_DESC[String(descKey).toLowerCase()] || '';
}

function insertMeasure(component, name) {
  const cfg = COMPONENTS[component];
  if (!cfg) return;
  // Bracket-wrap so the backend's `\[(.*?)\]` node-key matcher picks it up.
  insertToken(cfg.textareaId, `[${name}]`);
}

function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (!el || !window.bootstrap?.Modal) return;
  const inst = window.bootstrap.Modal.getInstance(el) || new window.bootstrap.Modal(el);
  inst.hide();
}

function toast(message, ok) {
  const container = document.getElementById('scorecard-toast-container');
  if (!container) return;
  const el = document.createElement('div');
  el.className = `toast align-items-center text-bg-${ok ? 'success' : 'danger'} border-0`;
  el.setAttribute('role', 'alert');
  el.innerHTML =
    `<div class="d-flex"><div class="toast-body">${message}</div>` +
    '<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>';
  container.appendChild(el);
  if (window.bootstrap?.Toast) {
    const t = new window.bootstrap.Toast(el, { delay: 4000 });
    t.show();
    el.addEventListener('hidden.bs.toast', () => el.remove());
  } else {
    setTimeout(() => el.remove(), 4000);
  }
}

// ── Measure list population ───────────────────────────────────
async function loadMeasures(component) {
  const cfg = COMPONENTS[component];
  if (!cfg) return;

  // clear this component's lists
  Object.values(cfg.lists).forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = '';
  });

  if (component === 'KPIPERFORMANCE') {
    const listId = cfg.lists.main;
    const ul = document.getElementById(listId);
    if (ul) {
      ['Actual', 'Target', 'Weight', 'Contribution'].forEach(name => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = name;
        li.style.cursor = 'pointer';
        li.addEventListener('click', () => insertMeasure(component, name));
        ul.appendChild(li);
      });
    }
    return;
  }

  try {
    if (!nodeKeyCache) nodeKeyCache = await retrieveNodeKeyList();
  } catch (err) {
    console.error('retrieveNodeKeyList failed:', err);
    return;
  }
  console.log("loadMeasures nodeKeyCache:", nodeKeyCache);
  const list = Array.isArray(nodeKeyCache) ? nodeKeyCache : [];

  list.forEach((nk) => {
    const name = nk?.measureName;
    if (!name) return;
    const type = Number(nk.measureType);
    let listId = cfg.lists.main;
    if (type === 1 && cfg.lists.sub) listId = cfg.lists.sub;
    const ul = document.getElementById(listId);
    if (!ul) return;
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = name;
    li.style.cursor = 'pointer';
    li.addEventListener('click', () => insertMeasure(component, name));
    ul.appendChild(li);
  });
}

// ── Validate / Add ────────────────────────────────────────────
async function runValidate(mode, component) {
  const cfg = COMPONENTS[component];
  if (!cfg) return;
  const box = document.getElementById(cfg.textareaId);
  if (!box) return;
  const formula = box.value;

  let result;
  try {
    result = await validateFormula(formula, component);
  } catch (err) {
    result = `Validation failed: ${err.message}`;
  }
  const valid = typeof result === 'string' && result.trim() === 'valid';

  if (!valid) {
    box.style.border = '2px solid red';
    toast(typeof result === 'string' ? result : 'Invalid formula', false);
    return;
  }

  box.style.border = '2px solid green';
  if (mode === 'Add') {
    if (activeInput) {
      activeInput.value = formula;
      activeInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
    toast('Formula added', true);
    closeModal(cfg.modalId);
  } else {
    toast('Formula is valid', true);
  }
}

// ── Event handlers ────────────────────────────────────────────
function onLaunchClick(e) {
  const btn = e.target.closest('[data-bs-target]');
  if (!btn) return;
  const target = btn.getAttribute('data-bs-target') || '';
  const id = target.replace('#', '');
  if (!MODAL_TO_COMPONENT[id]) return;
  const group = btn.closest('.input-group');
  activeInput = group ? group.querySelector('input, textarea') : null;
}

function onModalShow(e) {
  const id = e.target?.id;
  const component = MODAL_TO_COMPONENT[id];
  if (!component) return;
  const cfg = COMPONENTS[component];
  const box = document.getElementById(cfg.textareaId);
  if (box) {
    box.value = activeInput ? activeInput.value || '' : box.value;
    box.style.border = '';
  }
  loadMeasures(component);
}

// ── Public init ───────────────────────────────────────────────
export function initScorecardCalculator() {
  window.updateFormula = (input, desc) => {
    insertToken('formula', input);
    if (desc) setDescription('KPI', input, desc);
  };
  window.updateYTDFormula = (input, desc) => {
    insertToken('customYtdformula', input);
    if (desc) setDescription('YTD', input, desc);
  };
  window.updatePerformance = (input, desc) => {
    insertToken('performanceformula', input);
    if (desc) setDescription('KPIPERFORMANCE', input, desc);
  };
  window.updateScorecardPerspective = (input, desc) => {
    insertToken('formulaScoreCardPerspective', input);
    if (desc) setDescription('SCORECARDCONFIG', input, desc);
  };
  window.updateThresshold = (input, desc) => {
    insertToken('kpiCustomformula', input);
    if (desc) setDescription('THRESSHOLD', input, desc);
  };
  window.updateCustomObjective = (input, desc) => {
    insertToken('objectiveCustomformula', input);
    if (desc) setDescription('OBJECTIVE', input, desc);
  };
  window.updateCustomPerspective = (input, desc) => {
    insertToken('perspectiveCustomformula', input);
    if (desc) setDescription('PERSPECTIVE', input, desc);
  };
  window.showFunctionDescription = (component, name, descKey) => {
    setDescription(component, name, descKey);
  };
  window.fieldmeasurefilter = (listId, inputId) => {
    const input = document.getElementById(inputId);
    const ul = document.getElementById(listId);
    if (!input || !ul) return;
    const q = input.value.toLowerCase();
    ul.querySelectorAll('li').forEach((li) => {
      li.style.display = li.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  };
  window.handleFormulaValidate = (component) => runValidate('Validate', component);
  window.handleFormulaAdd = (component) => runValidate('Add', component);

  document.addEventListener('click', onLaunchClick, true);
  document.addEventListener('show.bs.modal', onModalShow);

  return () => {
    document.removeEventListener('click', onLaunchClick, true);
    document.removeEventListener('show.bs.modal', onModalShow);
    delete window.updateFormula;
    delete window.updateYTDFormula;
    delete window.updatePerformance;
    delete window.updateScorecardPerspective;
    delete window.updateThresshold;
    delete window.updateCustomObjective;
    delete window.updateCustomPerspective;
    delete window.showFunctionDescription;
    delete window.fieldmeasurefilter;
    delete window.handleFormulaValidate;
    delete window.handleFormulaAdd;
    activeInput = null;
  };
}
