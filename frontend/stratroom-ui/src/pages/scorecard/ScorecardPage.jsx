import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPerspectiveById, getObjectiveById, getKpiById, getSubKpiById, updateScorecardFormula } from '../../services/scorecardApi';
import { useScorecard } from '../../hooks/useScorecard';
import { cardDetailsToTabs } from '../../utils/scorecardTransform';
import { ScorecardProvider, useScorecardContext } from '../../context/ScorecardContext';
import { ScorecardHeader } from '../../components/scorecard/layout/ScorecardHeader';
import { ScorecardTabs } from '../../components/scorecard/layout/ScorecardTabs';
import { PerspectiveCard } from '../../components/scorecard/layout/PerspectiveCard';
import { StrategyMap } from '../../components/scorecard/strategy-map/StrategyMap';
import { PerspectiveAddModal, PerspectiveEditModal, PerspectiveViewModal } from '../../components/scorecard/modals/PerspectiveModal';
import { ObjectiveAddModal, ObjectiveEditModal, ObjectiveViewModal } from '../../components/scorecard/modals/ObjectiveModal';
import { KpiAddModal, KpiEditModal, KpiViewModal } from '../../components/scorecard/modals/KpiModal';
import { SubKpiAddModal, SubKpiEditModal, SubKpiViewModal } from '../../components/scorecard/modals/SubKpiModal';
import { SubSubKpiEditModal, SubSubKpiViewModal } from '../../components/scorecard/modals/SubSubKpiModal';
import PerspectiveCustomThresholdModal from './modals/PerspectiveCustomThresholdModal';
import ObjectiveCustomThresholdModal from './modals/ObjectiveCustomThresholdModal';
import KpiCustomThresholdModal from './modals/KpiCustomThresholdModal';
import ScorecardPerformanceFormulaModal from './modals/ScorecardPerformanceFormulaModal';
import KpiFormulaModal from './modals/KpiFormulaModal';
import KpiPerformanceFormulaModal from './modals/KpiPerformanceFormulaModal';
import KpiYtdFormulaModal from './modals/KpiYtdFormulaModal';
import { DeleteModal, ImportModal, CreateTemplateModal, EditModal } from '../../components/scorecard/modals/UtilityModals';
import { KpiStoryCardModal } from '../../components/scorecard/modals/KpiStoryCardModal';
import { ScorecardSettingsModal } from '../../components/scorecard/modals/ScorecardSettingsModal';
import { initScorecardCalculator } from '../../utils/scorecardCalculator';
import '../../assets/scorecard/css/bootstrap.min.css';
import '../../assets/scorecard/css/jquery-ui.min.css';
import '../../assets/scorecard/css/daterangepicker.min.css';
import '../../assets/scorecard/css/file-upload.css';
import '../../assets/scorecard/css/pickr.min.css';
import '../../assets/scorecard/css/select2.min.css';
import '../../assets/scorecard/css/basic.css';
import '../../assets/scorecard/css/main.css';
import '../../assets/scorecard/css/responsive.css';

// Theme color variables — mirrors what main.js sets dynamically from localStorage
const THEME_CSS_VARS = {
    '--stratroom-primary': '#883B71',
    '--stratroom-primary-rgb': '136, 59, 113',
    '--stratroom-primary-contrast': '#fff',
    '--stratroom-primary-contrast-rgb': '255, 255, 255',
    '--stratroom-card-cap-bg': '#883B71',
    '--stratroom-card-title-color': '#fff',
    '--stratroom-accordion-border-color': '#883B71',
};

// ─────────────────────────────────────────────────────────────
// Helper: read a value from a DOM element by id
// ─────────────────────────────────────────────────────────────
const val = (id) => document.getElementById(id)?.value?.trim() ?? '';

// Display name of the logged-in user (for created/modified-by audit fields).
const currentUserName = () => {
    try {
        const p = JSON.parse(localStorage.getItem('profile') || '{}');
        return [p.firstName, p.lastName].filter(Boolean).join(' ')
            || p.name || p.displayName || p.userName || p.emailAddress || p.email || '';
    } catch {
        return '';
    }
};

// ThresholdSelector dropdown value -> sc_kpis.classification_type
const classFromThreshold = (v) => (v === 'option_4' ? 'FIVE_COLOR' : 'THREE_COLOR');

// Collect the visible threshold band inputs (option1color1.._<prefix>) as a JSON
// array string, or undefined when none are filled in.
const collectBands = (prefix) => {
    const out = [];
    for (let i = 1; i <= 5; i++) {
        const el = document.getElementById(`option1color${i}_${prefix}`);
        const v = el?.value?.trim();
        if (v) out.push(Number(v));
    }
    return out.length ? JSON.stringify(out) : undefined;
};

// Populate the ThresholdSelector (controlled dropdown + band inputs) from saved data.
// The dropdown is React-controlled, so set it via the native setter + change event so
// the component re-renders the right number of band inputs before we fill them.
const setThreshold = (prefix, classificationType, thresholdsJson) => {
    const sel = document.getElementById(`${prefix}Threshold`);
    if (sel) {
        const option = classificationType === 'FIVE_COLOR' ? 'option_4' : 'option_3';
        const setter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value')?.set;
        if (setter) setter.call(sel, option); else sel.value = option;
        sel.dispatchEvent(new Event('change', { bubbles: true }));
    }
    let bands = [];
    try { bands = JSON.parse(thresholdsJson || '[]'); } catch { bands = []; }
    setTimeout(() => {
        bands.forEach((b, i) => {
            const el = document.getElementById(`option1color${i + 1}_${prefix}`);
            if (el) el.value = b ?? '';
        });
    }, 0);
};

// ─────────────────────────────────────────────────────────────
// Inner page component — has access to ScorecardProvider context
// ─────────────────────────────────────────────────────────────
function ScorecardPageInner({ pageId, scorecardData, liveLoading, liveError, reload }) {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [viewMode, setViewMode] = useState('table');

    const {
        addPerspective, editPerspective, removePerspective,
        addObjective, editObjective, removeObjective,
        addKpi, editKpi, removeKpi,
        addSubKpi, editSubKpi, removeSubKpi,
        saving,
    } = useScorecardContext();


    // ── Bootstrap modal stacking (calculator over kpi_setting modals) ───────
    useEffect(() => {
        let lastOpenedModal = null;
        const kpiSettingsModals = document.querySelectorAll('.kpi_setting');
        const handleKpiSettingShow = function () { 
            if (!this.id.includes('calculator') && this.id !== 'kpi_formula_popup') {
                lastOpenedModal = this; 
            }
        };
        kpiSettingsModals.forEach(m => m.addEventListener('show.bs.modal', handleKpiSettingShow));

        const calculatorIds = ['objective-calculator-modal', 'prespective-calculator-modal', 'kpiActual-calculator-modal', 'kpi-calculator-modal', 'kpi_formula_popup', 'ytd-calculator-modal'];
        const handleCalculatorShow = () => { if (lastOpenedModal) lastOpenedModal.classList.add('modal-static'); };
        const handleCalculatorHidden = () => {
            document.querySelectorAll('.kpi_setting').forEach(el => el.classList.remove('modal-static'));
            if (lastOpenedModal) {
                if (window.bootstrap?.Modal) window.bootstrap.Modal.getOrCreateInstance(lastOpenedModal).show();
            }
        };
        calculatorIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('show.bs.modal', handleCalculatorShow);
                el.addEventListener('hidden.bs.modal', handleCalculatorHidden);
            }
        });
        return () => {
            kpiSettingsModals.forEach(m => m.removeEventListener('show.bs.modal', handleKpiSettingShow));
            calculatorIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.removeEventListener('show.bs.modal', handleCalculatorShow);
                    el.removeEventListener('hidden.bs.modal', handleCalculatorHidden);
                }
            });
        };
    }, []);

    // ── Theme CSS vars ──────────────────────────────────────────────────────
    useEffect(() => {
        const root = document.documentElement;
        Object.entries(THEME_CSS_VARS).forEach(([k, v]) => root.style.setProperty(k, v));
        return () => Object.keys(THEME_CSS_VARS).forEach(k => root.style.removeProperty(k));
    }, []);

    // ── Set global IDs for legacy modal handlers ─────────────────────────────
    useEffect(() => {
        if (scorecardData?.scoreCardDetailsId) {
            window._currentScoreCardDetailsId = scorecardData.scoreCardDetailsId;
        }
    }, [scorecardData]);

    // ── KPI / Performance / YTD formula calculators ──────────────────────────
    // Defines window.updateFormula / handleFormulaValidate / handleFormulaAdd /
    // fieldmeasurefilter etc. that the formula-builder modals delegate to, and
    // wires them to the backend validate / node-key endpoints.
    useEffect(() => initScorecardCalculator(), []);

    // ── Icon libraries ───────────────────────────────────────────────────────
    useEffect(() => {
        if (window.lucide) window.lucide.createIcons();
        if (window.feather) window.feather.replace();
    }, [viewMode, activeTabIndex]);

    // ── Wire Save buttons on modals via DOM event delegation ─────────────────
    // Strategy: delegate click on document, match button by modal context.
    // This mirrors how legacy main.js attached jQuery click handlers to Save buttons.
    useEffect(() => {
        const getEmpId = () => {
            try { return JSON.parse(localStorage.getItem('profile') || '{}').empId ?? ''; } catch { return ''; }
        };

        const handlers = {
            // ── Perspective Add ────────────────────────────────────────────
            'prespective-add-modal': () => {
                const startStr = val('apStartDate');
                const endStr = val('apEndDate');
                addPerspective({
                    name: val('apName'),
                    description: val('apDescription'),
                    startDate: startStr ? `${startStr.split('-')[1]}/${startStr.split('-')[2]}/${startStr.split('-')[0]}` : '',
                    endDate: endStr ? `${endStr.split('-')[1]}/${endStr.split('-')[2]}/${endStr.split('-')[0]}` : '',
                    weight: val('apWeight'),
                    subWeight: val('apSubWeight'),
                    status: val('apStatus'),
                    ownerId: val('apOwner'),
                    createdBy: getEmpId(),
                    scorecardId: val('apScoreCardDetailsId') || window._currentScoreCardDetailsId || '',
                });
            },
            // ── Perspective Edit ────────────────────────────────────────────
            'prespective-edit-modal': () => {
                const startStr = val('epStartDate');
                const endStr = val('epEndDate');
                editPerspective({
                    id: val('epid') || window._editPerspectiveId,
                    name: val('epName'),
                    description: val('epDescription'),
                    startDate: startStr ? `${startStr.split('-')[1]}/${startStr.split('-')[2]}/${startStr.split('-')[0]}` : '',
                    endDate: endStr ? `${endStr.split('-')[1]}/${endStr.split('-')[2]}/${endStr.split('-')[0]}` : '',
                    weight: val('epWeight'),
                    subWeight: val('epSubWeight'),
                    status: val('epStatus'),
                    ownerId: val('epOwner'),
                    formula: val('epPerformance') || undefined,
                    aggregationMethod: val('epPerformance') ? 'FORMULA' : 'WEIGHTED',
                    scorecardId: val('epScoreCardDetailsId') || window._currentScoreCardDetailsId,
                });
            },
            // ── Objective Add ────────────────────────────────────────────────
            'objective-add-modal': () => {
                const startStr = val('abStartDate');
                const endStr = val('abEndDate');
                addObjective({
                    name: val('abName'),
                    description: val('abDescription'),
                    startDate: startStr ? `${startStr.split('-')[1]}/${startStr.split('-')[2]}/${startStr.split('-')[0]}` : '',
                    endDate: endStr ? `${endStr.split('-')[1]}/${endStr.split('-')[2]}/${endStr.split('-')[0]}` : '',
                    weight: val('abWeight'),
                    subWeight: val('abSubWeight'),
                    status: val('abStatus'),
                    ownerId: val('abOwner'),
                    createdBy: getEmpId(),
                    perspectiveId: val('abPerspectiveId') || window._editPerspectiveId,
                });
            },
            // ── Objective Edit ────────────────────────────────────────────────
            'objective-edit-modal': () => {
                const startStr = val('eodStartDate');
                const endStr = val('eodEndDate');
                editObjective({
                    id: val('eodId') || window._editObjectiveId,
                    name: val('eodName'),
                    description: val('eodDescription'),
                    startDate: startStr ? `${startStr.split('-')[1]}/${startStr.split('-')[2]}/${startStr.split('-')[0]}` : '',
                    endDate: endStr ? `${endStr.split('-')[1]}/${endStr.split('-')[2]}/${endStr.split('-')[0]}` : '',
                    weight: val('eodWeight'),
                    subWeight: val('eodSubWeight'),
                    status: val('eodStatus'),
                    ownerId: val('eodOwner'),
                    formula: val('eodPerformance') || undefined,
                    aggregationMethod: val('eodPerformance') ? 'FORMULA' : 'WEIGHTED',
                    perspectiveId: val('eodPerspectiveId') || window._editPerspectiveId,
                });
            },
            // ── KPI Add ──────────────────────────────────────────────────────
            'kpi-add-modal': () => {
                addKpi({
                    name: val('akpiName'),
                    description: val('akpiDescription'),
                    indicatorType: val('akpiPolarity') || undefined,
                    measurementFrequency: val('akpiMeasurementFrequency') || undefined,
                    weight: val('akpiWeight') || undefined,
                    formula: val('akpiPerformance') || undefined,
                    contribution: val('akpiContribution') || undefined,
                    subWeight: val('akipSubWeight') || undefined,
                    dataSource: val('akpiDataSource') || undefined,
                    dataType: val('akpiType') || undefined,
                    currencyCode: val('akpiCurrency') || undefined,
                    owner: val('akpiOwner') || undefined,
                    classificationType: classFromThreshold(val('akpiThreshold')),
                    thresholds: collectBands('akpi'),
                    createdBy: getEmpId(),
                    createdByName: currentUserName() || undefined,
                    objectiveId: window._editObjectiveId,
                });
            },
            // ── KPI Edit ──────────────────────────────────────────────────────
            'kpi-edit-modal': () => {
                editKpi({
                    id: val('ekpiId') || window._editKpiId,
                    name: val('ekpiName') || undefined,
                    description: val('ekpiDescription') || undefined,
                    indicatorType: val('ekpiPolarity') || undefined,
                    measurementFrequency: val('ekpiMeasurementFrequency') || undefined,
                    weight: val('ekpiWeight') || undefined,
                    formula: val('ekpiPerformance') || undefined,
                    actualFormula: val('ekpiActual') || undefined,
                    ytdFormula: val('ekpiYearToDate') || undefined,
                    contribution: val('ekpiContribution') || undefined,
                    subWeight: val('ekipSubWeight') || undefined,
                    dataSource: val('ekpiDataSource') || undefined,
                    dataType: val('ekpiType') || undefined,
                    currencyCode: val('ekpiCurrency') || undefined,
                    owner: val('ekpiOwner') || undefined,
                    classificationType: classFromThreshold(val('ekpiThreshold')),
                    thresholds: collectBands('ekpi'),
                    updatedByName: currentUserName() || undefined,
                    objectiveId: window._editObjectiveId,
                });
            },
            // ── SubKPI Add ────────────────────────────────────────────────────
            'subkpi-add-modal': () => {
                addSubKpi({
                    name: val('askpiName'),
                    indicatorType: val('askpiPolarity') || undefined,
                    measurementFrequency: val('askpiMeasurementFrequency') || undefined,
                    weight: val('askpiWeight') || undefined,
                    dataType: val('askpiType') || undefined,
                    createdBy: getEmpId(),
                    kpiId: window._editKpiId,
                });
            },
            // ── SubKPI Edit ────────────────────────────────────────────────────
            'subkpi-edit-modal': () => {
                editSubKpi({
                    id: val('eskpiId') || window._editSubKpiId,
                    name: val('eskpiName') || undefined,
                    indicatorType: val('eskpiPolarity') || undefined,
                    measurementFrequency: val('eskpiMeasurementFrequency') || undefined,
                    weight: val('eskpiWeight') || undefined,
                    dataType: val('eskpiType') || undefined,
                });
            },
            // ── SubKPI View (Save from view modal) ────────────────────────────
            'subkpi-view-modal': () => {
                editSubKpi({
                    id: window._viewSubKpiId,
                    name: val('vskpiName') || undefined,
                    indicatorType: val('vskpiPolarity') || undefined,
                    measurementFrequency: val('vskpiMeasurementFrequency') || undefined,
                    weight: val('vskpiWeight') || undefined,
                    dataType: val('vskpiType') || undefined,
                    formula: val('vskpiPerformance') || undefined,
                    actualFormula: val('ekpiActual') || undefined,
                    ytdFormula: val('eskpiYearToDate') || undefined,
                    updatedByName: currentUserName() || undefined,
                });
            },
        };

        // Click delegation: find the modal ancestor and call the matching handler
        const handleSaveClick = (e) => {
            const saveBtn = e.target.closest('.btn-primary[data-translate="actions.save"], .btn-primary.initative_save_btn, .btn-primary.scorecard_save_btn');
            if (!saveBtn) return;
            const modal = saveBtn.closest('.modal');
            if (!modal) return;
            const handler = handlers[modal.id];
            if (handler) {
                e.preventDefault();
                handler();
            }
        };

        document.addEventListener('click', handleSaveClick);
        return () => document.removeEventListener('click', handleSaveClick);
    }, [addPerspective, editPerspective, addObjective, editObjective, addKpi, editKpi, addSubKpi, editSubKpi]);

    // ── Delete modal confirmation button ─────────────────────────────────────
    // The legacy code stores { type, id } in window._deleteTarget before opening the modal.
    // We listen for the red "Delete" button click in #delete-modal.
    useEffect(() => {
        const handleDeleteConfirm = (e) => {
            const btn = e.target.closest('#delete-modal .btn-danger');
            if (!btn) return;
            e.preventDefault();
            const target = window._deleteTarget || {};
            const { type, id } = target;
            if (!id) return;
            const fn = { perspective: removePerspective, objective: removeObjective, kpi: removeKpi, subkpi: removeSubKpi }[type];
            if (fn) fn(id);
            window._deleteTarget = null;
        };
        document.addEventListener('click', handleDeleteConfirm);
        return () => document.removeEventListener('click', handleDeleteConfirm);
    }, [removePerspective, removeObjective, removeKpi, removeSubKpi]);

    // ── Expose actions on window so row buttons / legacy JS can call them ────
    useEffect(() => {
        window.scorecardActions = {
            openDeleteModal: (type, id) => {
                window._deleteTarget = { type, id };
                if (window.bootstrap?.Modal) {
                    const el = document.getElementById('delete-modal');
                    if (el) window.bootstrap.Modal.getOrCreateInstance(el).show();
                }
            },
            openAddObjective: (perspectiveId) => {
                window._editPerspectiveId = perspectiveId;
                if (window.bootstrap?.Modal) {
                    const el = document.getElementById('objective-add-modal');
                    if (el) window.bootstrap.Modal.getOrCreateInstance(el).show();
                }
            },
            openAddKpi: (objectiveId) => {
                window._editObjectiveId = objectiveId;
                if (window.bootstrap?.Modal) {
                    const el = document.getElementById('kpi-add-modal');
                    if (el) window.bootstrap.Modal.getOrCreateInstance(el).show();
                }
            },
            openAddSubKpi: (kpiId) => {
                window._editKpiId = kpiId;
                if (window.bootstrap?.Modal) {
                    const el = document.getElementById('subkpi-add-modal');
                    if (el) window.bootstrap.Modal.getOrCreateInstance(el).show();
                }
            },
            openEditPerspective: async (id) => {
                window._editPerspectiveId = id;
                const set = (elId, v) => { const el = document.getElementById(elId); if (el) el.value = v ?? ''; };
                ['epid', 'epName', 'epDescription', 'epWeight', 'epSubWeight', 'epPerformance'].forEach(elId => set(elId, ''));
                try {
                    const p = await getPerspectiveById(id);
                    if (p && p.id) {
                        set('epid', p.id);
                        set('epName', p.name);
                        set('epDescription', p.description);
                        set('epWeight', p.weight);
                        set('epPerformance', p.formula || '');
                    }
                } catch (e) {
                    console.error('Failed to load perspective data', e);
                }
                if (window.bootstrap?.Modal) {
                    const el = document.getElementById('prespective-edit-modal');
                    if (el) window.bootstrap.Modal.getOrCreateInstance(el).show();
                }
            },
            openEditObjective: async (id) => {
                window._editObjectiveId = id;
                const set = (elId, v) => { const el = document.getElementById(elId); if (el) el.value = v ?? ''; };
                ['eodId', 'eodName', 'eodDescription', 'eodWeight', 'eodPerformance'].forEach(elId => set(elId, ''));
                try {
                    const o = await getObjectiveById(id);
                    if (o && o.id) {
                        set('eodId', o.id);
                        set('eodName', o.name);
                        set('eodDescription', o.description);
                        set('eodWeight', o.weight);
                        // Pre-fill the saved Performance formula so editing other fields and
                        // saving doesn't wipe it (Save sends eodPerformance back as the formula).
                        set('eodPerformance', o.formula || '');
                    }
                } catch (e) {
                    console.error('Failed to load objective data', e);
                }
                if (window.bootstrap?.Modal) {
                    const el = document.getElementById('objective-edit-modal');
                    if (el) window.bootstrap.Modal.getOrCreateInstance(el).show();
                }
            },
            openEditSubKpi: async (id) => {
                window._editSubKpiId = id;
                const set = (elId, v) => { const el = document.getElementById(elId); if (el) el.value = v ?? ''; };
                ['eskpiName', 'eskpiDescription', 'eskpiWeight', 'eskpiContribution',
                 'eskpiPerformance', 'eskpiYearToDate'].forEach(elId => set(elId, ''));
                try {
                    const sk = await getSubKpiById(id);
                    if (sk && sk.id) {
                        set('eskpiName', sk.name);
                        set('eskpiWeight', sk.weight);
                        // Polarity dropdown holds the Lead/Lag indicator type.
                        const polEl = document.getElementById('eskpiPolarity');
                        if (polEl && sk.indicator_type) polEl.value = sk.indicator_type;
                        const typeEl = document.getElementById('eskpiType');
                        if (typeEl && sk.data_type) typeEl.value = sk.data_type;
                    }
                } catch (e) {
                    console.error('Failed to load sub-KPI data', e);
                }
                if (window.bootstrap?.Modal) {
                    const el = document.getElementById('subkpi-edit-modal');
                    if (el) window.bootstrap.Modal.getOrCreateInstance(el).show();
                }
            },
            openEditKpi: async (id) => {
                window._editKpiId = id;
                const set = (elId, v) => { const el = document.getElementById(elId); if (el) el.value = v ?? ''; };
                ['ekpiId', 'ekpiName', 'ekpiDescription', 'ekpiWeight', 'ekpiContribution', 'ekipSubWeight',
                 'ekpiActual', 'ekpiPerformance', 'ekpiYearToDate'].forEach(elId => set(elId, ''));
                try {
                    const kpi = await getKpiById(id);
                    if (kpi && kpi.id) {
                        set('ekpiId', kpi.id);
                        set('ekpiName', kpi.name);
                        set('ekpiDescription', kpi.description);
                        set('ekpiWeight', kpi.weight);
                        set('ekpiPerformance', kpi.formula || '');
                        set('ekpiActual', kpi.actual_formula || '');
                        set('ekpiYearToDate', kpi.ytd_formula || '');
                        const polEl = document.getElementById('ekpiPolarity');
                        if (polEl && kpi.indicator_type) polEl.value = kpi.indicator_type;
                        const freqEl = document.getElementById('ekpiMeasurementFrequency');
                        if (freqEl && kpi.measurement_frequency) freqEl.value = kpi.measurement_frequency;
                        set('ekpiContribution', kpi.contribution);
                        set('ekipSubWeight', kpi.sub_weight);
                        set('ekpiCurrency', kpi.currency_code);
                        const dsEl = document.getElementById('ekpiDataSource');
                        if (dsEl && kpi.data_source) dsEl.value = kpi.data_source;
                        const typeEl = document.getElementById('ekpiType');
                        if (typeEl && kpi.data_type) typeEl.value = kpi.data_type;
                        const ownEl = document.getElementById('ekpiOwner');
                        if (ownEl && kpi.owner) ownEl.value = kpi.owner;
                        setThreshold('ekpi', kpi.classification_type, kpi.thresholds);
                        // Audit footer (created/modified by + dates)
                        const setText = (elId, v) => { const el = document.getElementById(elId); if (el) el.textContent = v || '-'; };
                        const fmtDate = (v) => {
                            if (!v) return '-';
                            const d = new Date(v);
                            return isNaN(d.getTime()) ? '-' : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
                        };
                        setText('ekpiCreatedBy', kpi.created_by);
                        setText('ekpiModifiedBy', kpi.updated_by);
                        setText('ekpiCreatedDate', fmtDate(kpi.created_at));
                        setText('ekpiModifiedDate', fmtDate(kpi.updated_at));
                    }
                } catch (e) {
                    console.error('Failed to load KPI data', e);
                }
                if (window.bootstrap?.Modal) {
                    const el = document.getElementById('kpi-edit-modal');
                    if (el) window.bootstrap.Modal.getOrCreateInstance(el).show();
                }
            },
            openViewPerspective: async (id) => {
                const set = (elId, v) => { const el = document.getElementById(elId); if (el) { if (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA') el.value = v ?? ''; else el.textContent = v ?? ''; } };
                const setText = (elId, v) => { const el = document.getElementById(elId); if (el) el.textContent = v || '-'; };
                const fmtDate = (v) => {
                    if (!v) return '-';
                    const d = new Date(v);
                    return isNaN(d.getTime()) ? '-' : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
                };
                
                // Clear fields
                ['vpid', 'vpName', 'vpDescription', 'vpOwner', 'vpPerformance', 'vpWeight', 'vpSubWeight', 'vpStatus'].forEach(elId => set(elId, ''));
                ['vpCreatedBy', 'vpModifiedBy', 'vpCreatedDate', 'vpModifiedDate'].forEach(elId => setText(elId, '-'));
                set('vpStartDate', '');
                set('vpEndDate', '');
                
                try {
                    const p = await getPerspectiveById(id);
                    if (p && p.id) {
                        set('vpid', p.id);
                        set('vpName', p.name);
                        set('vpDescription', p.description);
                        set('vpOwner', p.owner || '');
                        
                        if (p.start_date) set('vpStartDate', p.start_date.split('T')[0]);
                        if (p.end_date) set('vpEndDate', p.end_date.split('T')[0]);
                        
                        set('vpPerformance', p.formula || '');
                        set('vpWeight', p.weight);
                        set('vpSubWeight', p.sub_weight);
                        set('vpStatus', p.status || '');
                        
                        setText('vpCreatedBy', p.created_by);
                        setText('vpModifiedBy', p.updated_by);
                        setText('vpCreatedDate', fmtDate(p.created_at));
                        setText('vpModifiedDate', fmtDate(p.updated_at));
                    }
                } catch (e) {
                    console.error('Failed to load perspective view data', e);
                }
                if (window.bootstrap?.Modal) {
                    const el = document.getElementById('prespective-view-modal');
                    if (el) window.bootstrap.Modal.getOrCreateInstance(el).show();
                }
            },
            openViewObjective: async (id) => {
                const set = (elId, v) => { const el = document.getElementById(elId); if (el) { if (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA') el.value = v ?? ''; else el.textContent = v ?? ''; } };
                const setText = (elId, v) => { const el = document.getElementById(elId); if (el) el.textContent = v || '-'; };
                const fmtDate = (v) => {
                    if (!v) return '-';
                    const d = new Date(v);
                    return isNaN(d.getTime()) ? '-' : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
                };
                
                // Clear fields
                ['vodID', 'vodName', 'vodDescription', 'vodOwner', 'vodPerformance', 'vodWeight', 'vodSubWeight', 'vodStatus'].forEach(elId => set(elId, ''));
                ['vodCreatedBy', 'vodModifiedBy', 'vodCreatedDate', 'vodModifiedDate'].forEach(elId => setText(elId, '-'));
                set('vodStartDate', '');
                set('vodEndDate', '');
                
                try {
                    const o = await getObjectiveById(id);
                    if (o && o.id) {
                        set('vodID', o.id);
                        set('vodName', o.name);
                        set('vodDescription', o.description);
                        set('vodOwner', o.owner || '');
                        
                        if (o.start_date) set('vodStartDate', o.start_date.split('T')[0]);
                        if (o.end_date) set('vodEndDate', o.end_date.split('T')[0]);
                        
                        set('vodPerformance', o.formula || '');
                        set('vodWeight', o.weight);
                        set('vodSubWeight', o.sub_weight);
                        set('vodStatus', o.status || '');
                        
                        setText('vodCreatedBy', o.created_by);
                        setText('vodModifiedBy', o.updated_by);
                        setText('vodCreatedDate', fmtDate(o.created_at));
                        setText('vodModifiedDate', fmtDate(o.updated_at));
                    }
                } catch (e) {
                    console.error('Failed to load objective view data', e);
                }
                if (window.bootstrap?.Modal) {
                    const el = document.getElementById('objective-view-modal');
                    if (el) window.bootstrap.Modal.getOrCreateInstance(el).show();
                }
            },
            openViewSubKpi: async (id) => {
                window._viewSubKpiId = id;
                const set = (elId, v) => { const el = document.getElementById(elId); if (el) { if (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA') el.value = v ?? ''; else el.textContent = v ?? ''; } };
                const setText = (elId, v) => { const el = document.getElementById(elId); if (el) el.textContent = v || '-'; };
                const fmtDate = (v) => {
                    if (!v) return '-';
                    const d = new Date(v);
                    return isNaN(d.getTime()) ? '-' : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
                };

                // Clear fields
                ['vskpiName', 'vskpiDescription', 'vskpiPolarity', 'vskpiMeasurementFrequency', 'vskpiOwner', 'vskpiPerformance', 'vskpiType', 'vskpiWeight', 'vskpiStatus', 'ekpiActual', 'eskpiYearToDate'].forEach(elId => set(elId, ''));
                ['vskpiCreatedBy', 'vskpiModifiedBy', 'vskpiCreatedDate', 'vskpiModifiedDate'].forEach(elId => setText(elId, '-'));

                try {
                    const sk = await getSubKpiById(id);
                    if (sk && sk.id) {
                        set('vskpiName', sk.name);
                        set('vskpiDescription', sk.description);
                        set('vskpiPolarity', sk.indicator_type || '');
                        set('vskpiMeasurementFrequency', sk.measurement_frequency || '');
                        set('vskpiOwner', sk.owner || '');
                        set('vskpiPerformance', sk.formula || '');
                        set('ekpiActual', sk.actual_formula || '');
                        set('eskpiYearToDate', sk.ytd_formula || '');
                        set('vskpiType', sk.data_type || '');
                        set('vskpiWeight', sk.weight);
                        set('vskpiStatus', sk.status || '');

                        setText('vskpiCreatedBy', sk.created_by);
                        setText('vskpiModifiedBy', sk.updated_by);
                        setText('vskpiCreatedDate', fmtDate(sk.created_at));
                        setText('vskpiModifiedDate', fmtDate(sk.updated_at));
                    }
                } catch (e) {
                    console.error('Failed to load sub kpi view data', e);
                }
                if (window.bootstrap?.Modal) {
                    const el = document.getElementById('subkpi-view-modal');
                    if (el) window.bootstrap.Modal.getOrCreateInstance(el).show();
                }
            },
            openViewKpi: async (id) => {
                const set = (elId, v) => { const el = document.getElementById(elId); if (el) el.value = v ?? ''; };
                const setText = (elId, v) => { const el = document.getElementById(elId); if (el) el.textContent = v || '-'; };
                const fmtDate = (v) => {
                    if (!v) return '-';
                    const d = new Date(v);
                    return isNaN(d.getTime()) ? '-' : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
                };
                ['vkpiName', 'vkpiDescription', 'vkpiWeight', 'vkpiContribution', 'vkipSubWeight',
                 'vkpiActual', 'vkpiPerformance', 'vkpiYearToDate'].forEach(elId => set(elId, ''));
                ['vkpiCreatedBy', 'vkpiModifiedBy', 'vkpiCreatedDate', 'vkpiModifiedDate'].forEach(elId => setText(elId, '-'));
                try {
                    const kpi = await getKpiById(id);
                    if (kpi && kpi.id) {
                        set('vkpiName', kpi.name);
                        set('vkpiDescription', kpi.description);
                        set('vkpiWeight', kpi.weight);
                        set('vkpiPerformance', kpi.formula || '');
                        set('vkpiActual', kpi.actual_formula || '');
                        set('vkpiYearToDate', kpi.ytd_formula || '');
                        const polEl = document.getElementById('vkpiPolarity');
                        if (polEl && kpi.indicator_type) polEl.value = kpi.indicator_type;
                        const freqEl = document.getElementById('vkpiMeasurementFrequency');
                        if (freqEl && kpi.measurement_frequency) freqEl.value = kpi.measurement_frequency;
                        set('vkpiContribution', kpi.contribution);
                        set('vkipSubWeight', kpi.sub_weight);
                        set('vkpiCurrency', kpi.currency_code);
                        const dsEl = document.getElementById('vkpiDataSource');
                        if (dsEl && kpi.data_source) dsEl.value = kpi.data_source;
                        const typeEl = document.getElementById('vkpiType');
                        if (typeEl && kpi.data_type) typeEl.value = kpi.data_type;
                        const ownEl = document.getElementById('vkpiOwner');
                        if (ownEl && kpi.owner) ownEl.value = kpi.owner;
                        setThreshold('vkpi', kpi.classification_type, kpi.thresholds);
                        setText('vkpiCreatedBy', kpi.created_by);
                        setText('vkpiModifiedBy', kpi.updated_by);
                        setText('vkpiCreatedDate', fmtDate(kpi.created_at));
                        setText('vkpiModifiedDate', fmtDate(kpi.updated_at));
                    }
                } catch (e) {
                    console.error('Failed to load KPI data', e);
                }
                if (window.bootstrap?.Modal) {
                    const el = document.getElementById('kpi-view-modal');
                    if (el) window.bootstrap.Modal.getOrCreateInstance(el).show();
                }
            },
        };
        return () => { delete window.scorecardActions; };
    }, [removePerspective, removeObjective, removeKpi, removeSubKpi]);

    useEffect(() => {
        window.saveScorecardFormula = async (formula) => {
            const scorecardPk = scorecardData?.scoreCardDetailsId;
            if (!scorecardPk) return;
            try {
                await updateScorecardFormula(scorecardPk, formula);
                if (reload) reload();
            } catch (e) {
                console.error('Failed to save scorecard formula', e);
            }
        };
        return () => { delete window.saveScorecardFormula; };
    }, [scorecardData?.scoreCardDetailsId, reload]);

    const tabs = scorecardData?.tab || [];

    useEffect(() => {
        if (tabs.length > 0 && activeTabIndex >= tabs.length) {
            setActiveTabIndex(Math.max(0, tabs.length - 1));
        } else if (tabs.length === 0 && activeTabIndex !== 0) {
            setActiveTabIndex(0);
        }
    }, [tabs.length, activeTabIndex]);

    if (!scorecardData) {
        if (liveLoading) return <div style={{ padding: 24 }}>Loading scorecard…</div>;
        if (liveError) {
            return (
                <div style={{ padding: 24, color: '#b91c1c' }}>
                    <strong>Could not load scorecard data from the backend.</strong>
                    <div style={{ marginTop: 8, fontSize: 13 }}>{liveError}</div>
                    <p style={{ margin: '10px 0 0', color: 'var(--text-sec)' }}>
                        Check that stratroom-backend (:8085) is running and you are logged in.
                    </p>
                </div>
            );
        }
        return <div style={{ padding: 24 }}>No scorecard data for this page.</div>;
    }

    return (
        <React.Fragment>
            {/* Toast notifications container */}
            <div
                id="scorecard-toast-container"
                className="toast-container position-fixed bottom-0 end-0 p-3"
                style={{ zIndex: 9999 }}
            />

            {/* Saving overlay */}
            {saving && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9998
                }}>
                    <div style={{
                        background: '#fff', borderRadius: 8, padding: '16px 24px',
                        display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                    }}>
                        <div style={{
                            width: 20, height: 20, border: '3px solid rgba(136,59,113,0.2)',
                            borderTopColor: '#883b71', borderRadius: '50%', animation: 'spin 0.7s linear infinite'
                        }} />
                        <span style={{ fontSize: 14, color: '#374151' }}>Saving…</span>
                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    </div>
                </div>
            )}

            <div className="page-grid"></div>
            <main className="pt-2 pb-2">
                <div className="container-lg">
                    <ScorecardHeader scorecardData={scorecardData} pageId={pageId} onReload={reload} />
                </div>

                <div className="container-lg py-2">
                    <div className="card custom-card-tab">
                        <div className="card-header p-0 d-flex align-items-end justify-content-between flex-wrap gap-2">
                            <div className="c-header-left">
                                <div className="dropdown dropdown-tab dropdown-tab-ellipsis" id="tab-navigationWrap">
                                    <ScorecardTabs
                                        tabs={tabs}
                                        activeTabIndex={activeTabIndex}
                                        onTabChange={setActiveTabIndex}
                                    />
                                </div>
                            </div>

                            <div className="c-header-right py-1">
                                <div className="view-tog" role="group" aria-label="View mode">
                                    <button
                                        id="btn-view-table"
                                        className={viewMode === 'table' ? 'active' : ''}
                                        onClick={() => setViewMode('table')}
                                    >
                                        <i data-feather="table" style={{ width: '13px', height: '13px' }}></i> Table
                                    </button>
                                    <button
                                        id="btn-view-smap"
                                        className={viewMode === 'smap' ? 'active' : ''}
                                        onClick={() => setViewMode('smap')}
                                    >
                                        <i data-lucide="git-fork" style={{ width: '13px', height: '13px' }}></i> Strategy Map
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="card-body" id="table-view" style={{ display: viewMode === 'table' ? 'block' : 'none' }}>
                            <div className="tab-content" id="tab-content">
                                {tabs.map((tab, index) => (
                                    <PerspectiveCard
                                        key={index}
                                        tab={tab}
                                        isActive={index === activeTabIndex}
                                    />
                                ))}
                            </div>
                        </div>

                        <div id="smap-view" className="card-body" style={{ display: viewMode === 'smap' ? 'block' : 'none' }}>
                            <div id="smap-canvas" className="smap-wrap">
                                {viewMode === 'smap' && (
                                    <StrategyMap tabs={tabs} onBackToTable={() => setViewMode('table')} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="col-12 text-center py-2 copyright">
                <p data-translate="footer.copyright" className="mb-0">
                    Copyright &copy; 2025 StratRoom. All rights reserved.
                </p>
            </footer>

            {/* Modals */}
            <PerspectiveAddModal />
            <PerspectiveEditModal />
            <PerspectiveViewModal />

            <ObjectiveAddModal />
            <ObjectiveEditModal />
            <ObjectiveViewModal />

            <KpiAddModal />
            <KpiEditModal />
            <KpiViewModal />

            <SubKpiAddModal />
            <SubKpiEditModal />
            <SubKpiViewModal />

            <SubSubKpiEditModal />
            <SubSubKpiViewModal />

            <PerspectiveCustomThresholdModal />
            <ObjectiveCustomThresholdModal />
            <KpiCustomThresholdModal />
            <ScorecardPerformanceFormulaModal />
            <KpiFormulaModal />
            <KpiPerformanceFormulaModal />
            <KpiYtdFormulaModal />

            <DeleteModal />
            <ImportModal />
            <KpiStoryCardModal />
            <CreateTemplateModal />
            <EditModal />
            <ScorecardSettingsModal scorecardData={scorecardData} />
        </React.Fragment>
    );
}

// ─────────────────────────────────────────────────────────────
// Outer shell — loads data, wraps in ScorecardProvider
// ─────────────────────────────────────────────────────────────
import { ScorecardSettingsProvider } from '../../hooks/useScorecardSettings';

const ScorecardPage = ({ pageId: pageIdProp }) => {
    const [searchParams] = useSearchParams();
    const pageId = pageIdProp || searchParams.get('pageId') || '1';
    const [scorecardData, setScorecardData] = useState(null);

    // Persist the pageId so the KPI sidebar (on the KPI story card page) can
    // load the same scorecard hierarchy without needing a separate API.
    useEffect(() => {
      if (pageId) localStorage.setItem('scorecardPageId', pageId);
    }, [pageId]);

    const USE_SAMPLE_FALLBACK = false;
    const { scorecardData: liveDTO, loading: liveLoading, error: liveError, reload } = useScorecard(pageId);

    useEffect(() => {
        const live = cardDetailsToTabs(liveDTO);
        if (live && live.tab.length > 0) {
            setScorecardData(live);
            return;
        }
        // Only clear data once loading is fully done AND we have received a response
        // (liveDTO !== undefined). This prevents wiping data before the first fetch
        // even starts (the race condition where liveLoading starts as false).
        if (!liveLoading && liveDTO !== undefined) {
            setScorecardData(null);
        }
    }, [liveDTO, liveLoading]);

    return (
        <ScorecardSettingsProvider>
            <ScorecardProvider reload={reload} pageId={pageId}>
                <ScorecardPageInner
                    pageId={pageId}
                    scorecardData={scorecardData}
                    liveLoading={liveLoading}
                    liveError={liveError}
                    reload={reload}
                />
            </ScorecardProvider>
        </ScorecardSettingsProvider>
    );
};

export default ScorecardPage;
