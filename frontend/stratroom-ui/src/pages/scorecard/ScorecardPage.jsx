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
import { PerspectiveCalculatorModal, ObjectiveCalculatorModal } from '../../components/scorecard/modals/CalculatorModals';
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
                if (window.bootstrap?.Modal) new window.bootstrap.Modal(lastOpenedModal).show();
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
                    perspectiveId: val('eodPerspectiveId') || window._editPerspectiveId,
                });
            },
            // ── KPI Add ──────────────────────────────────────────────────────
            'kpi-add-modal': () => {
                addKpi({
                    name: val('akName'),
                    description: val('akDescription'),
                    targetValue: val('akTarget'),
                    actualValue: val('akActual'),
                    measurementFrequency: val('akMeasurement') || val('akFrequency'),
                    weight: val('akWeight'),
                    subWeight: val('akSubWeight'),
                    status: val('akStatus'),
                    ownerId: val('akOwner'),
                    createdBy: getEmpId(),
                    objectiveId: val('akObjectiveId') || window._editObjectiveId,
                });
            },
            // ── KPI Edit ──────────────────────────────────────────────────────
            'kpi-edit-modal': () => {
                editKpi({
                    id: val('ekId') || window._editKpiId,
                    name: val('ekName'),
                    description: val('ekDescription'),
                    targetValue: val('ekTarget'),
                    actualValue: val('ekActual'),
                    measurementFrequency: val('ekMeasurement') || val('ekFrequency'),
                    weight: val('ekWeight'),
                    subWeight: val('ekSubWeight'),
                    status: val('ekStatus'),
                    ownerId: val('ekOwner'),
                    objectiveId: val('ekObjectiveId') || window._editObjectiveId,
                });
            },
            // ── SubKPI Add ────────────────────────────────────────────────────
            'subkpi-add-modal': () => {
                addSubKpi({
                    name: val('askName'),
                    description: val('askDescription'),
                    targetValue: val('askTarget'),
                    actualValue: val('askActual'),
                    measurementFrequency: val('askMeasurement') || val('askFrequency'),
                    weight: val('askWeight'),
                    createdBy: getEmpId(),
                    kpiId: val('askKpiId') || window._editKpiId,
                });
            },
            // ── SubKPI Edit ────────────────────────────────────────────────────
            'subkpi-edit-modal': () => {
                editSubKpi({
                    id: val('eskId') || window._editSubKpiId,
                    name: val('eskName'),
                    description: val('eskDescription'),
                    targetValue: val('eskTarget'),
                    actualValue: val('eskActual'),
                    measurementFrequency: val('eskMeasurement') || val('eskFrequency'),
                    weight: val('eskWeight'),
                    kpiId: val('eskKpiId') || window._editKpiId,
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
            openEditPerspective: (id, data) => {
                window._editPerspectiveId = id;
                if (data) {
                    const set = (elId, v) => { const el = document.getElementById(elId); if (el) el.value = v || ''; };
                    set('epid', data.scoreCardValue?.displayId || '');
                    set('epName', data.scoreCardValue?.name);
                    set('epDescription', data.scoreCardValue?.description);
                    set('epWeight', data.scoreCardValue?.weight);
                    set('epSubWeight', data.scoreCardValue?.subWeight);
                    set('epStatus', data.scoreCardValue?.status);
                    set('epOwner', data.scoreCardValue?.ownerId);
                    if (data.scoreCardValue?.startDate) {
                        const d = new Date(data.scoreCardValue.startDate);
                        if (!isNaN(d.getTime())) set('epStartDate', d.toISOString().split('T')[0]);
                    }
                    if (data.scoreCardValue?.endDate) {
                        const d = new Date(data.scoreCardValue.endDate);
                        if (!isNaN(d.getTime())) set('epEndDate', d.toISOString().split('T')[0]);
                    }
                }
                if (window.bootstrap?.Modal) {
                    const el = document.getElementById('prespective-edit-modal');
                    if (el) new window.bootstrap.Modal(el).show();
                }
            },
            openEditObjective: (id, data) => {
                window._editObjectiveId = id;
                if (data) {
                    const set = (elId, v) => { const el = document.getElementById(elId); if (el) el.value = v || ''; };
                    set('eodName', data.objectivesValue?.name);
                    set('eodDescription', data.objectivesValue?.description);
                    set('eodWeight', data.objectivesValue?.weight);
                    set('eodSubWeight', data.objectivesValue?.subWeight);
                    set('eodStatus', data.objectivesValue?.status);
                    set('eodOwner', data.objectivesValue?.ownerId);
                    if (data.objectivesValue?.startDate) {
                        const d = new Date(data.objectivesValue.startDate);
                        if (!isNaN(d.getTime())) set('eodStartDate', d.toISOString().split('T')[0]);
                    }
                    if (data.objectivesValue?.endDate) {
                        const d = new Date(data.objectivesValue.endDate);
                        if (!isNaN(d.getTime())) set('eodEndDate', d.toISOString().split('T')[0]);
                    }
                }
                if (window.bootstrap?.Modal) {
                    const el = document.getElementById('objective-edit-modal');
                    if (el) new window.bootstrap.Modal(el).show();
                }
            },
            openEditKpi: (id, data) => {
                window._editKpiId = id;
                if (data) {
                    const set = (elId, v) => { const el = document.getElementById(elId); if (el) el.value = v || ''; };
                    set('ekName', data.kpiValue?.name);
                    set('ekDescription', data.kpiValue?.description);
                    set('ekTarget', data.kpiValue?.target);
                    set('ekActual', data.kpiValue?.actual);
                    set('ekWeight', data.kpiValue?.weight);
                    set('ekSubWeight', data.kpiValue?.subWeight);
                    set('ekStatus', data.kpiValue?.status);
                    set('ekOwner', data.kpiValue?.ownerId);
                    set('ekMeasurement', data.kpiValue?.kpi_measurement);
                }
                if (window.bootstrap?.Modal) {
                    const el = document.getElementById('kpi-edit-modal');
                    if (el) new window.bootstrap.Modal(el).show();
                }
            },
        };
        return () => { delete window.scorecardActions; };
    }, [removePerspective, removeObjective, removeKpi, removeSubKpi]);

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

            <PerspectiveCalculatorModal />
            <ObjectiveCalculatorModal />
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
