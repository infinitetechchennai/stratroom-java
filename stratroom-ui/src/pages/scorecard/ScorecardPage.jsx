import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import ScorecardPerformanceFormulaModal from './modals/ScorecardPerformanceFormulaModal';
import KpiCustomThresholdModal from './modals/KpiCustomThresholdModal';
import KpiFormulaModal from './modals/KpiFormulaModal';
import KpiPerformanceFormulaModal from './modals/KpiPerformanceFormulaModal';
import KpiYtdFormulaModal from './modals/KpiYtdFormulaModal';
import { DeleteModal, ImportModal, CreateTemplateModal, EditModal } from '../../components/scorecard/modals/UtilityModals';
import { KpiStoryCardModal } from '../../components/scorecard/modals/KpiStoryCardModal';
import { initScorecardCalculator } from '../../utils/scorecardCalculator';
import { getPerspectiveById, getObjectiveById, getKpiById, updateScorecardFormula } from '../../services/scorecardApi';
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
                addPerspective({
                    name: val('apName'),
                    description: val('apDescription'),
                    startDate: val('apStartEndDate').split(' - ')[0] || '',
                    endDate: val('apStartEndDate').split(' - ')[1] || '',
                    weight: val('apWeight'),
                    subWeight: val('apSubWeight'),
                    status: val('apStatus'),
                    ownerId: val('apOwner'),
                    createdBy: getEmpId(),
                    scorecardId: val('apScoreCardDetailsId') || window._currentScoreCardDetailsId || '',
                    formula: val('custom_perspective'),
                });
            },
            // ── Perspective Edit ────────────────────────────────────────────
            'prespective-edit-modal': () => {
                const formula = val('epPerformance');
                editPerspective({
                    id: val('epid') || window._editPerspectiveId,
                    name: val('epName'),
                    description: val('epDescription'),
                    startDate: val('epStartEndDate').split(' - ')[0] || '',
                    endDate: val('epStartEndDate').split(' - ')[1] || '',
                    weight: val('epWeight'),
                    subWeight: val('epSubWeight'),
                    status: val('epStatus'),
                    ownerId: val('epOwner'),
                    scorecardId: val('epScoreCardDetailsId') || window._currentScoreCardDetailsId,
                    formula: formula,
                    aggregationMethod: formula ? 'FORMULA' : 'WEIGHTED',
                });
            },
            // ── Objective Add ────────────────────────────────────────────────
            'objective-add-modal': () => {
                addObjective({
                    name: val('apName') || val('abName'), // legacy often used ap/ab
                    description: val('abDescription'),
                    startDate: val('abStartEndDate') ? val('abStartEndDate').split(' - ')[0] : '',
                    endDate: val('abStartEndDate') ? val('abStartEndDate').split(' - ')[1] : '',
                    weight: val('abWeight'),
                    subWeight: val('abSubWeight'),
                    status: val('abStatus'),
                    ownerId: val('abOwner'),
                    createdBy: getEmpId(),
                    perspectiveId: val('abPerspectiveId') || window._editPerspectiveId,
                    formula: val('abPerformance'),
                });
            },
            // ── Objective Edit ────────────────────────────────────────────────
            'objective-edit-modal': () => {
                const formula = val('eodPerformance');
                editObjective({
                    id: val('eodId') || window._editObjectiveId,
                    name: val('eodName'),
                    description: val('eodDescription'),
                    startDate: val('eodStartEndDate') ? val('eodStartEndDate').split(' - ')[0] : '',
                    endDate: val('eodStartEndDate') ? val('eodStartEndDate').split(' - ')[1] : '',
                    weight: val('eodWeight'),
                    subWeight: val('eodSubWeight'),
                    status: val('eodStatus'),
                    ownerId: val('eodOwner'),
                    perspectiveId: val('eodPerspectiveId') || window._editPerspectiveId,
                    formula: formula,
                    aggregationMethod: formula ? 'FORMULA' : 'WEIGHTED',
                });
            },
            // ── KPI Add ──────────────────────────────────────────────────────
            'kpi-add-modal': () => {
                addKpi({
                    name: val('akpiName'),
                    description: val('akpiDescription'),
                    targetValue: val('akpiTarget'),
                    actualValue: val('akpiActual'),
                    measurementFrequency: val('akpiMeasurementFrequency'),
                    weight: val('akpiWeight'),
                    subWeight: val('akipSubWeight'),
                    status: val('akpiStatus'),
                    ownerId: val('akpiOwner'),
                    createdBy: getEmpId(),
                    objectiveId: val('akpiObjectiveId') || window._editObjectiveId,
                    formula: val('akpiPerformance'),
                });
            },
            // ── KPI Edit ──────────────────────────────────────────────────────
            'kpi-edit-modal': () => {
                editKpi({
                    id: val('ekpiId') || window._editKpiId,
                    name: val('ekpiName'),
                    description: val('ekpiDescription'),
                    targetValue: val('ekpiTarget'),
                    actualValue: val('ekpiActual'),
                    measurementFrequency: val('ekpiMeasurementFrequency'),
                    weight: val('ekpiWeight'),
                    subWeight: val('ekipSubWeight'),
                    status: val('ekpiStatus'),
                    ownerId: val('ekpiOwner'),
                    objectiveId: val('ekpiObjectiveId') || window._editObjectiveId,
                    formula: val('ekpiPerformance'),
                });
            },
            // ── SubKPI Add ────────────────────────────────────────────────────
            'subkpi-add-modal': () => {
                addSubKpi({
                    name: val('askpiName'),
                    description: val('askpiDescription'),
                    targetValue: val('askpiTarget'),
                    actualValue: val('askpiActual'),
                    measurementFrequency: val('askpiMeasurementFrequency'),
                    weight: val('askpiWeight'),
                    subWeight: val('akipSubWeight'),
                    createdBy: getEmpId(),
                    kpiId: val('askpiKpiId') || window._editKpiId,
                    formula: val('askpiPerformance'),
                });
            },
            // ── SubKPI Edit ────────────────────────────────────────────────────
            'subkpi-edit-modal': () => {
                editSubKpi({
                    id: val('eskpiId') || window._editSubKpiId,
                    name: val('eskpiName'),
                    description: val('eskpiDescription'),
                    targetValue: val('eskpiTarget'),
                    actualValue: val('eskpiActual'),
                    measurementFrequency: val('eskpiMeasurementFrequency'),
                    weight: val('eskpiWeight'),
                    subWeight: val('ekipSubWeight'),
                    kpiId: val('eskpiKpiId') || window._editKpiId,
                    formula: val('eskpiPerformance'),
                });
            },
        };

        // Click delegation: find the modal ancestor and call the matching handler
        const handleSaveClick = (e) => {
            const saveBtn = e.target.closest('.btn-primary[data-translate="actions.save"], .btn-primary[value="Save"], .btn-primary.initative_save_btn, .btn-primary.scorecard_save_btn');
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
                    if (el) new window.bootstrap.Modal(el).show();
                }
            },
            openAddObjective: (perspectiveId) => {
                window._editPerspectiveId = perspectiveId;
                if (window.bootstrap?.Modal) {
                    const el = document.getElementById('objective-add-modal');
                    if (el) new window.bootstrap.Modal(el).show();
                }
            },
            openAddKpi: (objectiveId) => {
                window._editObjectiveId = objectiveId;
                if (window.bootstrap?.Modal) {
                    const el = document.getElementById('kpi-add-modal');
                    if (el) new window.bootstrap.Modal(el).show();
                }
            },
            openAddSubKpi: (kpiId) => {
                window._editKpiId = kpiId;
                if (window.bootstrap?.Modal) {
                    const el = document.getElementById('subkpi-add-modal');
                    if (el) new window.bootstrap.Modal(el).show();
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
                    if (el) new window.bootstrap.Modal(el).show();
                }
            },
            openEditObjective: async (id) => {
                window._editObjectiveId = id;
                const set = (elId, v) => { const el = document.getElementById(elId); if (el) el.value = v ?? ''; };
                // Clear fields before populating so stale data from previous edits is gone
                ['eodId', 'eodName', 'eodDescription', 'eodWeight', 'eodSubWeight', 'eodStatus', 'eodOwner', 'eodPerformance'].forEach(elId => set(elId, ''));
                try {
                    const obj = await getObjectiveById(id);
                    if (obj && obj.id) {
                        set('eodId', obj.id);
                        set('eodName', obj.name);
                        set('eodDescription', obj.description);
                        set('eodWeight', obj.weight);
                        set('eodPerformance', obj.formula || '');
                    }
                } catch (e) {
                    console.error('Failed to load objective data', e);
                }
                if (window.bootstrap?.Modal) {
                    const el = document.getElementById('objective-edit-modal');
                    if (el) new window.bootstrap.Modal(el).show();
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
                        const polEl = document.getElementById('ekpiPolarity');
                        if (polEl && kpi.polarity) polEl.value = kpi.polarity;
                        const freqEl = document.getElementById('ekpiMeasurementFrequency');
                        if (freqEl && kpi.measurement_frequency) freqEl.value = kpi.measurement_frequency;
                    }
                } catch (e) {
                    console.error('Failed to load KPI data', e);
                }
                if (window.bootstrap?.Modal) {
                    const el = document.getElementById('kpi-edit-modal');
                    if (el) new window.bootstrap.Modal(el).show();
                }
            },
        };
        return () => { delete window.scorecardActions; };
    }, [removePerspective, removeObjective, removeKpi, removeSubKpi]);

    // Expose scorecard formula save for the header + button calculator
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
            <ScorecardPerformanceFormulaModal />
            <KpiCustomThresholdModal />
            <KpiFormulaModal />
            <KpiPerformanceFormulaModal />
            <KpiYtdFormulaModal />

            <DeleteModal />
            <ImportModal />
            <KpiStoryCardModal />
            <CreateTemplateModal />
            <EditModal />
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

    const USE_SAMPLE_FALLBACK = false;
    const { scorecardData: liveDTO, loading: liveLoading, error: liveError, reload } = useScorecard(pageId);

    useEffect(() => {
        const live = cardDetailsToTabs(liveDTO);
        if (live && live.tab.length > 0) {
            setScorecardData(live);
            return;
        }
        if (!liveLoading) {
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
