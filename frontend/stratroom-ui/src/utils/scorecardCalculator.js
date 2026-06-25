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

let parentModalId = null;

// component -> DOM ids it owns
const COMPONENTS = {
  KPI: {
    modalId: 'kpiActual-calculator-modal',
    // The KPI Actual calculator textarea is id="formula" (same target the keypad's
    // window.updateFormula writes to), so measure clicks / Add / modal-show all use it.
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
    modalId: 'prespective_custom_threshold_popup',
    textareaId: 'formulaCustomPerspective',
    lists: { main: 'perspectiveMeasureNames' },
  },
  OBJECTIVE: {
    modalId: 'objective_custom_threshold_popup',
    textareaId: 'formulaCustomObjective',
    lists: { main: 'objectiveMeasureNames' },
  },
  THRESSHOLD: {
    modalId: 'kpi_custom_threshold_popup',
    textareaId: 'thresholdformula',
    lists: {},
  },
};

const MODAL_TO_COMPONENT = Object.fromEntries(
  Object.entries(COMPONENTS).map(([k, v]) => [v.modalId, k])
);

const FUNCTION_DESC = {
  if: "Returns second argument if first argument is true; Returns optional third argument if first argument is false; IF([KPI1, KPI2], 'trueCalc', 'falseCalc')",
  avg: 'Returns the sum of the given expressions\navg(ACTUAL)\navg[RG]\navg(avg[RG],avg[OG])',
  agg: 'Returns the sum of the given expressions\nagg(ACTUAL)\nagg(sum[RG],sum[OG])',
  count: 'Returns the count of the given expressions\ncount[ACTUAL]+count[RG] = value',
  sum: 'Returns the sum of the given expressions\nSUM(ACTUAL)\nSUM(agg[RG],agg[OG])',
  min: 'Returns the smallest of the given expressions\nMIN(ACTUAL, TARGET)\nMIN(agg[RG],agg[OG])',
  max: 'Returns the biggest of the given expressions\nMAX(ACTUAL, TARGET)\nMAX(agg[RG],agg[OG])',
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

// Writes a value into an input/textarea in a way React's controlled inputs detect.
// Setting `.value` directly bypasses React's value tracker, so we use the native
// prototype setter and then dispatch a bubbling input event to trigger onChange.
function setInputValue(el, value) {
  const proto = el.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
  if (setter) setter.call(el, value); else el.value = value;
  el.dispatchEvent(new Event('input', { bubbles: true }));
}

function setDescription(component, name, descKey) {
  const cfg = COMPONENTS[component];
  const modal = cfg && document.getElementById(cfg.modalId);
  if (!modal) return;
  const head = modal.querySelector('.formulaheaderdesc');
  const body = modal.querySelector('.formulacontentdesc');
  if (head) head.textContent = String(name).toUpperCase();
  if (body) body.innerHTML = (FUNCTION_DESC[String(descKey).toLowerCase()] || '').replace(/\n/g, '<br>');
}

function insertMeasure(component, name) {
  const cfg = COMPONENTS[component];
  if (!cfg) return;
  insertToken(cfg.textareaId, name);
}

function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (!el || !window.bootstrap?.Modal) return;
  const inst = window.bootstrap.Modal.getInstance(el) || window.bootstrap.Modal.getOrCreateInstance(el);
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

// Reads the hierarchy node id from a hidden field inside the modal that launched
// the calculator (parentModalId). More reliable than the window globals because it
// reflects the row currently being edited, even across rapid open/close cycles.
function readParentNodeId(fieldIds) {
  const parent = parentModalId && document.getElementById(parentModalId);
  if (!parent) return '';
  for (const fid of fieldIds) {
    const el = parent.querySelector('#' + fid);
    if (el && el.value) return el.value;
  }
  return '';
}

// ── Measure list population ───────────────────────────────────
async function loadMeasures(component) {
  const cfg = COMPONENTS[component];
  if (!cfg) return;

  // KPI Performance calculator shows only 4 fixed fields — no API call needed
  if (component === 'KPIPERFORMANCE') {
    const fixedList = [
      { measureName: 'Actual' },
      { measureName: 'Target' },
      { measureName: 'Weight' },
      { measureName: 'Contribution' },
    ];
    document.dispatchEvent(new CustomEvent('scorecardMeasuresLoaded', { detail: { component, data: fixedList } }));
    const ul = document.getElementById(cfg.lists.main);
    if (ul) {
      ul.innerHTML = '';
      fixedList.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = item.measureName;
        li.style.cursor = 'pointer';
        li.addEventListener('click', () => insertMeasure('KPIPERFORMANCE', item.measureName));
        ul.appendChild(li);
      });
    }
    return;
  }

  try {
    const params = new URLSearchParams(window.location.search);
    const pageId = params.get('pageId') || window.location.pathname.split('/').pop();
    const y = new Date().getFullYear();
    const dateRange = localStorage.getItem('customperiod') || `01/01/${y}-12/31/${y}`;

    // --- Component-specific direct resolution (most reliable) ---
    // For KPIPERFORMANCE (KPI Performance Calculator), always use the currently
    // edited KPI's ID directly — do NOT depend on activeInput which may be null
    // if the modal was opened by Bootstrap's data-bs-target attribute.
    let nodeType = '';
    let nodeId = '';

    if (component === 'KPIPERFORMANCE') {
      // Performance calculator shows only fixed fields: Actual, Target, Weight, Contribution.
      // No API call needed — skip straight to the hardcoded list below.
      nodeType = '';
      nodeId = '';
    } else if (component === 'KPI') {
      // KPI Actual calculator: ALL KPIs (Measures tab) + ALL Sub-KPIs (Sub Measures tab) from entire scorecard.
      nodeType = '';
      nodeId = '';
    } else if (component === 'YTD') {
      // YTD calculator shows the full tree (all Perspectives, Objectives, KPIs, Sub-KPIs).
      nodeType = '';
      nodeId = '';
    } else if (component === 'SCORECARDCONFIG') {
      nodeType = 'SCORECARD';
      nodeId = pageId;
    } else if (component === 'PERSPECTIVE') {
      nodeType = 'PERSPECTIVE';
      // Prefer the id field inside the open parent modal (always reflects the row
      // being edited); fall back to the global set by openEditPerspective.
      nodeId = readParentNodeId(['epid', 'apid']) || window._editPerspectiveId || '';
    } else if (component === 'OBJECTIVE') {
      nodeType = 'OBJECTIVE';
      nodeId = readParentNodeId(['eodId', 'eodid', 'aoId']) || window._editObjectiveId || '';
    } else if (activeInput) {
      // For KPI / YTD / THRESSHOLD: use activeInput to identify context
      if (['abPerformance', 'eodPerformance', 'vodPerformance', 'objectivePerformance'].includes(activeInput.id)) {
        nodeType = 'OBJECTIVE';
        nodeId = window._editObjectiveId || '';
      } else if (['apPerformance', 'epPerformance', 'vpPerformance', 'prespectivePerformance', 'perspectivePerformance'].includes(activeInput.id)) {
        nodeType = 'PERSPECTIVE';
        nodeId = window._editPerspectiveId || '';
      } else if (['akpiPerformance', 'ekpiPerformance', 'vkpiPerformance', 'ekpiActual', 'vkpiActual', 'kpiPerformance', 'kpiActualPerformance'].includes(activeInput.id)) {
        nodeType = 'KPI';
        nodeId = window._editKpiId || '';
      } else if (['askpiPerformance', 'eskpiPerformance', 'vskpiPerformance', 'subkpiPerformance'].includes(activeInput.id)) {
        nodeType = 'SUBKPI';
        nodeId = window._editSubKpiId || '';
      } else if (['scorecard_formula'].includes(activeInput.id)) {
        nodeType = 'SCORECARD';
        nodeId = pageId;
      } else {
        // Fallback to form-based identification for Legacy jQuery / Bootstrap forms
        const form = activeInput.closest('form');
        if (form) {
          if (form.id === 'kpiForm' || form.id === 'editKpiForm') {
            nodeType = 'KPI';
            nodeId = form.querySelector('#kpi_id')?.value || window._editKpiId || '';
          } else if (form.id === 'objectiveForm' || form.id === 'editObjectiveForm') {
            nodeType = 'OBJECTIVE';
            nodeId = form.querySelector('#objective_id')?.value || window._editObjectiveId || '';
          } else if (form.id === 'perspectiveForm' || form.id === 'editPerspectiveForm') {
            nodeType = 'PERSPECTIVE';
            nodeId = form.querySelector('#perspectiveId')?.value || window._editPerspectiveId || '';
          } else if (form.id === 'scorecardForm') {
            nodeType = 'SCORECARD';
            nodeId = pageId;
          } else if (form.id === 'subkpiForm' || form.id === 'editSubkpiForm') {
            nodeType = 'SUBKPI';
            nodeId = form.querySelector('#subkpi_id')?.value || form.querySelector('input[name="sub"]')?.value || window._editSubKpiId || '';
          }
        }
      }
    }

    // KPI Actual and YTD use empty nodeType to get the full scorecard tree.
    const isFullScorecardComponent = (component === 'KPI' || component === 'YTD');
    const cacheKey = `${pageId}_${dateRange}_${nodeType || 'ALL'}_${nodeId || 'ALL'}`;
    console.log('[Calculator] component:', component, 'nodeType:', nodeType || '(all)', 'nodeId:', nodeId || '(all)', 'isFullScorecardComponent:', isFullScorecardComponent);
    if (!nodeKeyCache || nodeKeyCache.key !== cacheKey) {
      // The backend now returns the full list of elements for the scorecard level 
      // regardless of nodeId. This solves the issue when creating new elements.
      const data = nodeType || isFullScorecardComponent
        ? await retrieveNodeKeyList(pageId, dateRange, nodeType || '', nodeId || '')
        : [];
      console.log('[Calculator] API returned', data?.length, 'items');
      nodeKeyCache = { key: cacheKey, data };
    } else {
      console.log('[Calculator] Using cached data:', nodeKeyCache.data?.length, 'items');
    }
  } catch (err) {
    console.error('retrieveNodeKeyList failed:', err);
    return;
  }
  const list = Array.isArray(nodeKeyCache?.data) ? [...nodeKeyCache.data] : [];

  // Dispatch custom event for React components
  const event = new CustomEvent('scorecardMeasuresLoaded', {
    detail: {
      component: component,
      data: list
    }
  });
  document.dispatchEvent(event);

  // Fallback DOM manipulation for any legacy non-React modals
  Object.values(cfg.lists).forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = '';
  });

  list.forEach((nk) => {
    const name = nk?.measureName;
    if (!name) return;
    const type = Number(nk.measureType);
    const elementType = nk?.elementType || '';

    // KPI Actual + YTD: full tree — KPIs → Measures tab, Sub-KPIs → Sub Measures tab, skip everything else.
    if ((component === 'KPI' || component === 'YTD') && elementType) {
      if (elementType !== 'KPI' && elementType !== 'SUBKPI') return;
    }

    // Route to correct list: sub-KPIs (measureType=1) go to sub list when one exists.
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
      setInputValue(activeInput, formula);
    }
    // If opened from the scorecard header + button (no parent modal), auto-save formula.
    if (component === 'SCORECARDCONFIG' && !parentModalId && window.saveScorecardFormula) {
      window.saveScorecardFormula(formula);
    }
    toast('Formula added', true);
    closeModal(cfg.modalId);
  } else {
    toast('Formula is valid', true);
  }
}

// ── Event handlers ────────────────────────────────────────────
function onLaunchClick(e) {
  // Capture clicks on any button or input that opens a modal
  const trigger = e.target.closest('[data-bs-target], [data-target]');
  if (!trigger) return;

  const parentModal = trigger.closest('.modal');
  if (parentModal) {
    parentModalId = parentModal.id;
  } else {
    parentModalId = null;
  }

  // Scorecard header + button opens the SCORECARDCONFIG calculator directly.
  // Set activeInput to the scorecard formula textarea so insertMeasure works.
  if (trigger.dataset.scorecardFormulaLauncher) {
    activeInput = document.getElementById(COMPONENTS.SCORECARDCONFIG.textareaId);
    return;
  }

  // Find the associated input field to know which element is being edited
  const group = trigger.closest('.input-group');
  if (group) {
    activeInput = group.querySelector('input, textarea');
  } else if (trigger.tagName === 'INPUT' || trigger.tagName === 'TEXTAREA') {
    activeInput = trigger;
  }
}

function onModalHidden(e) {
  const id = e.target?.id;
  const component = MODAL_TO_COMPONENT[id];
  if (component && parentModalId) {
    const parentEl = document.getElementById(parentModalId);
    if (parentEl && window.bootstrap?.Modal) {
      const inst = window.bootstrap.Modal.getInstance(parentEl) || window.bootstrap.Modal.getOrCreateInstance(parentEl);
      inst.show();
    } else if (parentEl && window.jQuery) {
      window.jQuery(parentEl).modal('show');
    }
    parentModalId = null;
  }
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
  window.updateCustomPerspective = (input, desc) => {
    insertToken('formulaCustomPerspective', input);
    if (desc) setDescription('PERSPECTIVE', input, desc);
  };
  window.updateCustomObjective = (input, desc) => {
    insertToken('formulaCustomObjective', input);
    if (desc) setDescription('OBJECTIVE', input, desc);
  };
  window.updateCustomThreshold = (input, desc) => {
    insertToken('thresholdformula', input);
    if (desc) setDescription('THRESSHOLD', input, desc);
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
  document.addEventListener('hidden.bs.modal', onModalHidden);

  return () => {
    document.removeEventListener('click', onLaunchClick, true);
    document.removeEventListener('show.bs.modal', onModalShow);
    document.removeEventListener('hidden.bs.modal', onModalHidden);
    delete window.updateFormula;
    delete window.updateYTDFormula;
    delete window.updatePerformance;
    delete window.updateScorecardPerspective;
    delete window.updateCustomPerspective;
    delete window.updateCustomObjective;
    delete window.updateCustomThreshold;
    delete window.fieldmeasurefilter;
    delete window.handleFormulaValidate;
    delete window.handleFormulaAdd;
    activeInput = null;
  };
}
