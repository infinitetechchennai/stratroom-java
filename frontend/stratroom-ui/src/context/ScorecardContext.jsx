import React, { createContext, useContext, useCallback, useState } from 'react';
import {
  savePerspective,
  updatePerspective,
  deletePerspective,
  saveObjective,
  updateObjective,
  deleteObjective,
  saveKpi,
  updateKpi,
  deleteKpi,
  saveSubKpi,
  updateSubKpi,
  deleteSubKpi,
  saveOrgKpiDetails,
  saveOrgSubKpiEntry,
  downloadKpiPdf,
  downloadKpiExcel,
  renamePerspective,
} from '../services/scorecardApi';

// ─────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────
const ScorecardContext = createContext(null);

export const useScorecardContext = () => {
  const ctx = useContext(ScorecardContext);
  if (!ctx)
    throw new Error('useScorecardContext must be used inside ScorecardProvider');
  return ctx;
};

// ─────────────────────────────────────────────────────────────
// Toast helper (uses Bootstrap toast API if available, else console)
// ─────────────────────────────────────────────────────────────
function showToast(message, type = 'success') {
  // Bootstrap 5 toast container must exist in the DOM (ScorecardPage renders it)
  const container = document.getElementById('scorecard-toast-container');
  if (!container) {
    console[type === 'error' ? 'error' : 'log']('[Scorecard]', message);
    return;
  }
  const id = `sc-toast-${Date.now()}`;
  const html = `
    <div id="${id}" class="toast align-items-center text-bg-${type === 'error' ? 'danger' : 'success'} border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>`;
  container.insertAdjacentHTML('beforeend', html);
  const el = document.getElementById(id);
  if (window.bootstrap?.Toast) {
    const t = new window.bootstrap.Toast(el, { delay: 3500 });
    t.show();
    el.addEventListener('hidden.bs.toast', () => el.remove());
  }
}

// Close a Bootstrap modal by ID.
// IMPORTANT: hide via the Bootstrap Modal API so the instance's internal _isShown
// state is reset. A previous manual DOM-only close (remove .show / set display:none)
// left _isShown = true, so the SAME modal could not be reopened a second time
// (show()/toggle() became a no-op) until a full page refresh recreated the instance.
function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (!el) return;
  const Modal = window.bootstrap?.Modal;
  if (Modal) {
    const inst = Modal.getInstance(el) || Modal.getOrCreateInstance(el);
    inst.hide();
  } else {
    // Fallback only when Bootstrap isn't present.
    el.classList.remove('show');
    el.style.display = 'none';
    el.setAttribute('aria-hidden', 'true');
    el.removeAttribute('aria-modal');
    el.removeAttribute('role');
  }
  // Safety net for stacked (nested calculator) modals: after the hide transition, if
  // nothing is still open, clear any leftover backdrop / body lock that would otherwise
  // sit on top of the page and swallow clicks (the "controls become unresponsive" symptom).
  setTimeout(() => {
    if (!document.querySelector('.modal.show')) {
      document.querySelectorAll('.modal-backdrop').forEach((b) => b.remove());
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }, 300);
}

// ─────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────
export function ScorecardProvider({ children, reload, pageId }) {
  const [saving, setSaving] = useState(false);
  const [storyCardItem, setStoryCardItem] = useState(null);

  // Generic action wrapper: sets loading, calls fn, shows toast, reloads
  const act = useCallback(
    async (fn, successMsg, modalId) => {
      setSaving(true);
      try {
        await fn();
        showToast(successMsg, 'success');
        if (modalId) closeModal(modalId);
        if (reload) await reload();
      } catch (err) {
        console.error('[Scorecard action]', err);
        showToast(err?.message || 'An error occurred. Please try again.', 'error');
      } finally {
        setSaving(false);
      }
    },
    [reload]
  );

  // ── PERSPECTIVE ─────────────────────────────────────────────
  const addPerspective = useCallback(
    (data) => act(() => savePerspective(data), 'Perspective saved successfully.', 'prespective-add-modal'),
    [act]
  );

  const editPerspective = useCallback(
    (data) => act(() => updatePerspective(data), 'Perspective updated successfully.', 'prespective-edit-modal'),
    [act]
  );

  const removePerspective = useCallback(
    (id) => act(() => deletePerspective(id), 'Perspective deleted.', 'delete-modal'),
    [act]
  );

  const editPerspectiveName = useCallback(
    (id, name) => act(() => renamePerspective(id, name), 'Perspective name updated.'),
    [act]
  );

  // ── OBJECTIVE ───────────────────────────────────────────────
  const addObjective = useCallback(
    (data) => act(() => saveObjective(data), 'Objective saved successfully.', 'objective-add-modal'),
    [act]
  );

  const editObjective = useCallback(
    (data) => act(() => updateObjective(data), 'Objective updated successfully.', 'objective-edit-modal'),
    [act]
  );

  const removeObjective = useCallback(
    (id) => act(() => deleteObjective(id), 'Objective deleted.', 'delete-modal'),
    [act]
  );

  // ── KPI ─────────────────────────────────────────────────────
  const addKpi = useCallback(
    (data) => act(() => saveKpi(data), 'KPI saved successfully.', 'kpi-add-modal'),
    [act]
  );

  const editKpi = useCallback(
    (data) => act(() => updateKpi(data), 'KPI updated successfully.', 'kpi-edit-modal'),
    [act]
  );

  const removeKpi = useCallback(
    (id) => act(() => deleteKpi(id), 'KPI deleted.', 'delete-modal'),
    [act]
  );

  const saveKpiEntry = useCallback(
    (data) => act(() => saveOrgKpiDetails(data), 'KPI entry saved.', 'kpi-view-modal'),
    [act]
  );

  // ── SUB-KPI ──────────────────────────────────────────────────
  const addSubKpi = useCallback(
    (data) => act(() => saveSubKpi(data), 'Sub-KPI saved successfully.', 'subkpi-add-modal'),
    [act]
  );

  const editSubKpi = useCallback(
    (data) => act(() => updateSubKpi(data), 'Sub-KPI updated successfully.', 'subkpi-edit-modal'),
    [act]
  );

  const editSubKpiView = useCallback(
    (data) => act(() => updateSubKpi(data), 'Sub-KPI updated successfully.', 'subkpi-view-modal'),
    [act]
  );

  const removeSubKpi = useCallback(
    (id) => act(() => deleteSubKpi(id), 'Sub-KPI deleted.', 'delete-modal'),
    [act]
  );

  const saveSubKpiEntry = useCallback(
    (data) => act(() => saveOrgSubKpiEntry(data), 'Sub-KPI entry saved.'),
    [act]
  );

  // ── DOWNLOAD ────────────────────────────────────────────────
  const exportKpiPdf = useCallback(async (kpiId) => {
    try {
      const url = await downloadKpiPdf(kpiId);
      window.open(url, '_blank');
    } catch (err) {
      showToast(err?.message || 'PDF download failed.', 'error');
    }
  }, []);

  const exportKpiExcel = useCallback(async (kpiId) => {
    try {
      const url = await downloadKpiExcel(kpiId);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kpi_${kpiId}.xlsx`;
      a.click();
    } catch (err) {
      showToast(err?.message || 'Excel download failed.', 'error');
    }
  }, []);

  const value = {
    saving,
    pageId,
    reload,
    // Perspective
    addPerspective,
    editPerspective,
    removePerspective,
    editPerspectiveName,
    // Objective
    addObjective,
    editObjective,
    removeObjective,
    // KPI
    addKpi,
    editKpi,
    removeKpi,
    saveKpiEntry,
    // SubKPI
    addSubKpi,
    editSubKpi,
    editSubKpiView,
    removeSubKpi,
    saveSubKpiEntry,
    // Download
    exportKpiPdf,
    exportKpiExcel,
    storyCardItem,
    setStoryCardItem,
  };

  return (
    <ScorecardContext.Provider value={value}>
      {children}
    </ScorecardContext.Provider>
  );
}
