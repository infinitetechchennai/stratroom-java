import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import scorecardDataFile from '../../data/scorecard.json';
import { useScorecard } from '../../hooks/useScorecard';
import { cardDetailsToTabs } from '../../utils/scorecardTransform';
import { ScorecardHeader } from '../../components/scorecard/layout/ScorecardHeader';
import { ScorecardTabs } from '../../components/scorecard/layout/ScorecardTabs';
import { PerspectiveCard } from '../../components/scorecard/layout/PerspectiveCard';
import { StrategyMap } from '../../components/scorecard/strategy-map/StrategyMap';
import { PerspectiveAddModal, PerspectiveEditModal, PerspectiveViewModal } from '../../components/scorecard/modals/PerspectiveModal';
import { ObjectiveAddModal, ObjectiveEditModal, ObjectiveViewModal } from '../../components/scorecard/modals/ObjectiveModal';
import { KpiAddModal, KpiEditModal, KpiViewModal } from '../../components/scorecard/modals/KpiModal';
import { SubKpiAddModal, SubKpiEditModal, SubKpiViewModal } from '../../components/scorecard/modals/SubKpiModal';
import { SubSubKpiEditModal, SubSubKpiViewModal } from '../../components/scorecard/modals/SubSubKpiModal';
import { PerspectiveCalculatorModal, ObjectiveCalculatorModal, KpiCalculatorModal, KpiActualCalculatorModal, YtdCalculatorModal } from '../../components/scorecard/modals/CalculatorModals';
import { DeleteModal, ImportModal, KpiStoryCardModal, CreateTemplateModal, EditModal } from '../../components/scorecard/modals/UtilityModals';
import '../../assets/scorecard/css/bootstrap.min.css';
import '../../assets/scorecard/css/jquery-ui.min.css';
import '../../assets/scorecard/css/daterangepicker.min.css';
import '../../assets/scorecard/css/file-upload.css';
import '../../assets/scorecard/css/pickr.min.css';
import '../../assets/scorecard/css/select2.min.css';
import '../../assets/scorecard/css/basic.css';
import '../../assets/scorecard/css/main.css';
import '../../assets/scorecard/css/responsive.css';
// Theme color variables — mirrors what main.js:158 sets dynamically from localStorage
const THEME_CSS_VARS = {
    '--stratroom-primary': '#883B71',
    '--stratroom-primary-rgb': '136, 59, 113',
    '--stratroom-primary-contrast': '#fff',
    '--stratroom-primary-contrast-rgb': '255, 255, 255',
    '--stratroom-card-cap-bg': '#883B71',
    '--stratroom-card-title-color': '#fff',
    '--stratroom-accordion-border-color': '#883B71',
};

const ScorecardPage = ({ pageId: pageIdProp }) => {
    const [searchParams] = useSearchParams();
    const pageId = pageIdProp || searchParams.get('pageId') || '1';
    const [scorecardData, setScorecardData] = useState(null);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'smap'

    // Live backend data (cardDetailsDTO). Set to true only to demo without a backend.
    const USE_SAMPLE_FALLBACK = false;
    const { scorecardData: liveDTO, loading: liveLoading, error: liveError } = useScorecard(pageId);
    
    useEffect(() => {
        let lastOpenedModal = null;
        const kpiSettingsModals = document.querySelectorAll('.kpi_setting');

        const handleKpiSettingShow = function() {
            lastOpenedModal = this;
        };

        kpiSettingsModals.forEach(modal => {
            modal.addEventListener('show.bs.modal', handleKpiSettingShow);
        });

        const calculatorIds = ['objective-calculator-modal', 'kpi-calculator-modal', 'prespective-calculator-modal'];
        
        const handleCalculatorShow = function() {
            if (lastOpenedModal) {
                lastOpenedModal.classList.add('modal-static');
            }
        };

        const handleCalculatorHidden = function() {
            document.querySelectorAll('.kpi_setting').forEach(el => el.classList.remove('modal-static'));
            if (lastOpenedModal) {
                // Reopen using global window.bootstrap if available
                if (window.bootstrap && window.bootstrap.Modal) {
                    const reopenModal = new window.bootstrap.Modal(lastOpenedModal);
                    reopenModal.show();
                }
                lastOpenedModal = null;
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
            kpiSettingsModals.forEach(modal => {
                modal.removeEventListener('show.bs.modal', handleKpiSettingShow);
            });
            calculatorIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.removeEventListener('show.bs.modal', handleCalculatorShow);
                    el.removeEventListener('hidden.bs.modal', handleCalculatorHidden);
                }
            });
        };
    }, []);

    useEffect(() => {
        // Inject theme CSS variables on :root (same as main.js does)
        const root = document.documentElement;
        Object.entries(THEME_CSS_VARS).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });

        return () => {
            // Cleanup on unmount
            Object.keys(THEME_CSS_VARS).forEach((key) => {
                root.style.removeProperty(key);
            });
        };
    }, []);

    // Feed the UI from live backend data; fall back to the bundled sample so the
    // page always renders (e.g. backend down or empty scorecard).
    useEffect(() => {
        const live = cardDetailsToTabs(liveDTO);
        if (live && live.tab.length > 0) {
            setScorecardData(live);
            return;
        }
        if (!liveLoading) {
            // No live data: only use the bundled sample if explicitly enabled,
            // otherwise leave it null so the render shows a real error/empty state.
            if (USE_SAMPLE_FALLBACK && scorecardDataFile && scorecardDataFile.length > 0) {
                console.warn('[Scorecard] Using bundled sample data (USE_SAMPLE_FALLBACK=true).');
                setScorecardData(scorecardDataFile[0]);
            } else {
                setScorecardData(null);
            }
        }
    }, [liveDTO, liveLoading]);

    // Re-initialize icon libraries whenever view changes
    useEffect(() => {
        if (window.lucide) window.lucide.createIcons();
        if (window.feather) window.feather.replace();
    }, [viewMode, activeTabIndex]);

    if (!scorecardData) {
        if (liveLoading) return <div style={{ padding: 24 }}>Loading scorecard…</div>;
        if (liveError) {
            return (
                <div style={{ padding: 24, color: '#b91c1c' }}>
                    <strong>Could not load scorecard data from the backend.</strong>
                    <div style={{ marginTop: 8, fontSize: 13 }}>{liveError}</div>
                      <p style={{ margin: '10px 0 0', color: 'var(--text-sec)' }}>
                        Check that stratroom-web (:8080) and stratroom-backend (:8085) are running and you are logged in.
                      </p>
                    </div>
            );
        }
        return <div style={{ padding: 24 }}>No scorecard data for this page.</div>;
    }

    const tabs = scorecardData.tab || [];

    return (
        <React.Fragment>
            <div className="page-grid"></div>
            <main className="pt-2 pb-2">
                <div className="container-lg">
                    <ScorecardHeader />
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
            <KpiCalculatorModal />
            <KpiActualCalculatorModal />
            <YtdCalculatorModal />

            <DeleteModal />
            <ImportModal />
            <KpiStoryCardModal />
            <CreateTemplateModal />
            <EditModal />
        </React.Fragment>
    );
};

export default ScorecardPage;
