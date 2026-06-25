import React, { useState, useEffect } from 'react';
import { useScorecard } from '../../hooks/useScorecard';

// Modals
import PerspectiveModal from './modals/PerspectiveModal';
import ObjectiveModal from './modals/ObjectiveModal';
import KpiModal from './modals/KpiModal';
import SubKpiModal from './modals/SubKpiModal';
import KpiFormulaModal from './modals/KpiFormulaModal';
import KpiCustomThresholdModal from './modals/KpiCustomThresholdModal';
import KpiYtdFormulaModal from './modals/KpiYtdFormulaModal';
import ScorecardModal from './modals/ScorecardModal';
import ScorecardImportModal from './modals/ScorecardImportModal';
import ObjectiveCustomThresholdModal from './modals/ObjectiveCustomThresholdModal';
import PerspectiveCustomThresholdModal from './modals/PerspectiveCustomThresholdModal';
import ScorecardPerformanceFormulaModal from './modals/ScorecardPerformanceFormulaModal';
import KpiPerformanceFormulaModal from './modals/KpiPerformanceFormulaModal';

// Templates/Components
import ScorecardTemplate from './components/ScorecardTemplate';
import PerspectiveTemplate from './components/PerspectiveTemplate';
import PerspectiveHeaderRowTemplate from './components/PerspectiveHeaderRowTemplate';
import ObjectiveRowTemplate from './components/ObjectiveRowTemplate';
import { KpiRowTemplate, SubKpiRowTemplate, KpiGroupTemplate } from './components/KpiRowTemplate';

const StandardView = ({ pageId = '1' }) => {
  const { scorecardData, loading, error } = useScorecard(pageId);
  
  const scoreCardDTOS = scorecardData?.cardDetailsDTO?.scoreCardDTOS || [];

  const [activeTabId, setActiveTabId] = useState(null);

  useEffect(() => {
    if (scoreCardDTOS.length > 0 && !activeTabId) {
      setActiveTabId(scoreCardDTOS[0].id);
    }
  }, [scoreCardDTOS, activeTabId]);

  useEffect(() => {
    // Global Bootstrap 5 Modal Stacking Fix for nested modals
    const modalHistory = [];

    const handleShow = (e) => {
      if (e.relatedTarget) {
        const parentModal = e.relatedTarget.closest('.modal');
        if (parentModal && parentModal.id) {
          modalHistory.push({
            current: e.target.id,
            parent: parentModal.id
          });
        }
      }
    };

    const handleHidden = (e) => {
      const closedModalId = e.target.id;
      // Reverse find to get the most recent history entry for this modal
      for (let i = modalHistory.length - 1; i >= 0; i--) {
        if (modalHistory[i].current === closedModalId) {
          const parentId = modalHistory[i].parent;
          modalHistory.splice(i, 1);
          
          const parentModalEl = document.getElementById(parentId);
          if (parentModalEl && window.bootstrap) {
            const bsModal = window.bootstrap.Modal.getOrCreateInstance(parentModalEl);
            bsModal.show();
          }
          break;
        }
      }
    };

    document.addEventListener('show.bs.modal', handleShow);
    document.addEventListener('hidden.bs.modal', handleHidden);

    return () => {
      document.removeEventListener('show.bs.modal', handleShow);
      document.removeEventListener('hidden.bs.modal', handleHidden);
    };
  }, []);

  const activePerspective = scoreCardDTOS.find(s => s.id === activeTabId) || scoreCardDTOS[0];

  const getStatusIcon = (status) => {
    if (!status) return null;
    const s = status.toLowerCase();
    if (s.includes('green')) return <img src="https://stratroom.io/projects/mg-portal-html/assets/images/icons/flag-green-i.svg" width="16" height="16" alt="green" />;
    if (s.includes('yellow')) return <img src="https://stratroom.io/projects/mg-portal-html/assets/images/icons/flag-yellow-i.svg" width="16" height="16" alt="yellow" />;
    if (s.includes('red')) return <img src="https://stratroom.io/projects/mg-portal-html/assets/images/icons/flag-red-i.svg" width="16" height="16" alt="red" />;
    return <i className={status} />;
  };

  const getTrendIcon = (trend) => {
    if (!trend) return null;
    const t = trend.toLowerCase();
    if (t === 'up') return <img src="https://stratroom.io/projects/mg-portal-html/assets/images/icons/up-i.png" width="12" height="12" alt="up" />;
    if (t === 'down') return <img src="https://stratroom.io/projects/mg-portal-html/assets/images/icons/down-i.png" width="12" height="12" alt="down" />;
    return <i className={t} />;
  };

  const getActionsMenu = () => (
    <div className="d-flex justify-content-end gap-2 align-items-center text-muted">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
    </div>
  );

  if (loading) return <div>Loading Scorecard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div id="deleteModalscorecardold" className="modal fade">
        <div className="modal-dialog modal-confirm">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Delete</h4>
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <h5 className="confirm-modal-content">Do you really want to delete?</h5>
              <br />
              <div className="form-line right">
                <input type="hidden" id="deletescoreid" />
                <input type="hidden" id="deleterecordtype" />
                <button
                  type="button"
                  className="btn-default1 btn"
                  data-dismiss="modal"
                  aria-label="Close"
                  data-i18n="Cancel"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger confirm-modal-deleteBtn"
                  onClick={() => window.handlescoreeventdelete && window.handlescoreeventdelete()}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="nameUpdatePopUp"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel_1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title createTemplateHeader">Update Scorecard Name</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="card custom-card border-0">
                <div className="card-body">
                  <form id="menuForm">
                    <div className="grid gap-3">
                      <div className="g-col-12">
                        <div className="form-group">
                          <label htmlFor="menuName" className="form-label nameHeader">
                            Name
                          </label>

                          <input
                            type="text"
                            className="form-control"
                            id="scorcardUpdateName"
                            placeholder="Enter Name"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-label-secondary cancelHeader"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => window.handleScorecardNameUpdate && window.handleScorecardNameUpdate()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="delete_confirmation_popup"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel_1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" style={{ '--stratroom-modal-width': '320px' }}>
          <div className="modal-content">
            <div className="modal-body">
              <div className="card custom-card delete-card border-0">
                <div className="card-body">
                  <div className="delete-box">
                    <h4 className="title" data-translate="page.orgstructure.delete_confirmation">
                      Do you really want to delete?
                    </h4>
                    <div className="btn-wrap">
                      <input type="hidden" id="deletescoreid" />
                      <input type="hidden" id="deleterecordtype" />
                      <button
                        type="button"
                        className="btn btn-label-secondary w-100"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        data-translate="page.orgstructure.cancel"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger w-100 confirm-modal-deleteBtn"
                        onClick={() => window.handlescoreeventdelete && window.handlescoreeventdelete()}
                        data-translate="page.orgstructure.delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        id="formulation_popup"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content" style={{ height: '360px', overflow: 'hidden' }}>
            <div className="modal-header">
              <h4>Formulation Register</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div style={{ height: '300px' }}>
                <div className="d-flex flex-column" id="initiate_sidebar"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PerspectiveModal />
      <ObjectiveModal />
      <KpiModal />
      <SubKpiModal />
      <KpiFormulaModal />
      <KpiCustomThresholdModal />
      <KpiYtdFormulaModal />
      <ScorecardModal />
      <ScorecardImportModal />
      <ObjectiveCustomThresholdModal />
      <PerspectiveCustomThresholdModal />
      <ScorecardPerformanceFormulaModal />
      <KpiPerformanceFormulaModal />

      <div
        className="modal fade scorecard_description_popup"
        id="add-settings-modal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Settings</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-0">
              <div className="card custom-card border-0">
                <div className="card-body">
                  <input type="hidden" id="storycardid" />
                  <div className="form-group grid gap-3">
                    <div className="row">
                      <label htmlFor="keyIssues" className="col-md-3 col-form-label">
                        Key Issues
                      </label>
                      <div className="col-md-9 col-form-text">
                        <textarea className="form-control" id="keyIssues" rows="3"></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <label htmlFor="staticEmail" className="col-md-3 col-form-label">
                        Risks
                      </label>
                      <div className="col-md-9 col-form-text">
                        <textarea className="form-control" id="risks" rows="3"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => window.handleScoreCardSettingsSave && window.handleScoreCardSettingsSave()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal custom-modal fade"
        id="kpi-story-card-modal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel_1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">KPI Story Card</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <div className="card custom-card table-card">
                <div className="card-body">
                  <div className="row-table">
                    <div className="row">
                      <div className="col-12 col-form-text">
                        <div className="user-image avatar m-auto"></div>
                      </div>
                    </div>
                    <div className="row">
                      <label htmlFor="staticEmail" className="col-md-3 col-form-label">
                        KPI Name
                      </label>
                      <div className="col-md-9 col-form-text">
                        <p>
                          <span id="kpiName"></span>
                        </p>
                      </div>
                    </div>

                    <div className="row">
                      <label htmlFor="staticEmail" className="col-md-3 col-form-label">
                        Alignment Objectives
                      </label>
                      <div className="col-md-9 col-form-text">
                        <div className="d-flex flex-wrap gap-2">
                          <span className="badge rounded-pill label-bg-dark" id="objectiveName">
                            Increase net revenue by 15%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <label htmlFor="staticEmail" className="col-md-3 col-form-label">
                        Owner
                      </label>
                      <div className="col-md-9 col-form-text">
                        <div className="d-flex flex-wrap gap-2">
                          <span className="badge rounded-pill label-bg-green" id="ownerName"></span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <label htmlFor="staticEmail" className="col-md-3 col-form-label">
                        Target Audience
                      </label>
                      <div className="col-md-9 col-form-text">
                        <div className="d-flex flex-wrap gap-2">
                          <span className="badge rounded-pill label-bg-red">N/A</span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <label htmlFor="staticEmail" className="col-md-3 col-form-label">
                        Current Actual
                      </label>
                      <div className="col-md-9 col-form-text">
                        <div className="d-flex flex-wrap gap-2">
                          <span className="badge rounded-pill label-bg-yellow" id="actualValue"></span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <label htmlFor="staticEmail" className="col-md-3 col-form-label">
                        Target
                      </label>
                      <div className="col-md-9 col-form-text">
                        <div className="d-flex flex-wrap gap-2">
                          <span className="badge rounded-pill label-bg-blue" id="targetValue"></span>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <label htmlFor="staticEmail" className="col-md-3 col-form-label">
                        Measurement Method
                      </label>
                      <div className="col-md-9 col-form-text">
                        <div className="d-flex flex-wrap gap-2">
                          <span className="badge rounded-pill label-bg-orange">N/A</span>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <label htmlFor="staticEmail" className="col-md-3 col-form-label">
                        Strategic Initiatives
                      </label>
                      <div className="col-md-9 col-form-text">
                        <div className="d-flex flex-wrap gap-2">
                          <span className="badge rounded-pill label-bg-info" id="initiatives">
                            N/A
                          </span>{' '}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <label htmlFor="staticEmail" className="col-md-3 col-form-label">
                        Timelines
                      </label>
                      <div className="col-md-9 col-form-text">
                        <div className="d-flex flex-wrap gap-2">
                          <span className="badge rounded-pill label-bg-secondary" id="initiativeTimeline">
                            N/A
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <label htmlFor="staticEmail" className="col-md-3 col-form-label">
                        Reporting Frequency
                      </label>
                      <div className="col-md-9 col-form-text">
                        <div className="d-flex flex-wrap gap-2">
                          <span className="badge rounded-pill label-bg-green" id="reportFrequency"></span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <label htmlFor="staticEmail" className="col-md-3 col-form-label">
                        Success Criteria
                      </label>
                      <div className="col-md-9 col-form-text">
                        <div className="d-flex flex-wrap gap-2">
                          <span className="badge rounded-pill label-bg-orange">N/A</span>{' '}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <label htmlFor="staticEmail" className="col-md-3 col-form-label">
                        Risks
                      </label>
                      <div className="col-md-9 col-form-text">
                        <div className="d-flex flex-wrap gap-2">
                          <span className="badge rounded-pill label-bg-red" id="riskData"></span>{' '}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <label htmlFor="supportNeeded" className="col-md-3 col-form-label">
                        Support Needed
                      </label>
                      <div className="col-md-9 col-form-text">
                        <textarea className="form-control" id="supportNeeded" rows="3"></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <label htmlFor="remarks" className="col-md-3 col-form-label">
                        Remarks
                      </label>
                      <div className="col-md-9 col-form-text">
                        <textarea className="form-control" id="remarks" rows="3"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-label-secondary"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                value="Save"
                onClick={() => window.handleSaveStoryCard && window.handleSaveStoryCard()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="pt-2 pb-2">
        <div className="container-lg">
          <div className="page-header grid gap-2 pb-1">
            <div className="g-col-8 d-flex align-items-center">
              <h4 className="title">
                <span className="icon">
                  <img src="/images/scorecard-i.svg" alt="Scorecard" width="16" height="16" />
                </span>
                <span className="sorecardTitleHeader">Scorecard</span>{' '}
                <span className="badge text-bg-success scorecardValue">100%</span>
              </h4>
            </div>
            <div className="load-page page-actions g-col-4">
              <div className="page-icons">
                <ul>
                  <li>
                    <a href="#import-modal" data-toggle="modal" data-target=".file_upload_popup">
                      <span
                        className="icon"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        data-bs-title="Import"
                      >
                        <img src="/images/import-i.svg" width="12" height="12" alt="import" />
                      </span>
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (window.loadDataAndGeneratePDF) window.loadDataAndGeneratePDF();
                      }}
                    >
                      <img src="/images/stamp-i.svg" width="12" height="12" alt="import" />
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      data-bs-title="Export"
                      target="_blank"
                      className="exceldownloadlink"
                    >
                      <img src="/images/export-i.svg" width="12" height="12" alt="export" />
                    </a>
                  </li>

                  <li>
                    <a
                      href="#add-settings-modal"
                      data-toggle="modal"
                      data-target=".scorecard_description_popup"
                      onClick={() => window.handleScoreCardEvent && window.handleScoreCardEvent()}
                    >
                      <span className="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Settings">
                        <img src="/images/control-panel-i.svg" width="12" height="12" alt="Settings" />
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="container-lg py-2">
          {/* TAB NAVIGATION */}
          <div className="dropdown dropdown-tab dropdown-tab-ellipsis mb-2" id="tab-navigationWrap">
            <button className="btn btn-primary dropdown-toggle d-lg-none" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
              {activePerspective ? activePerspective.scoreCardValue?.name : "Select"}
            </button>
            <ul className="dropdown-menu nav nav-pills" id="tab-navigation" role="tablist" aria-orientation="horizontal" style={{ flexWrap: 'nowrap', overflowX: 'auto' }}>
              {scoreCardDTOS.map((tab) => {
                const isActive = activeTabId === tab.id;
                return (
                  <button
                    key={tab.id}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    type="button"
                    role="tab"
                    onClick={() => setActiveTabId(tab.id)}
                    style={{ 
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span className="nav-text">{tab.scoreCardValue?.name}</span>
                  </button>
                );
              })}
            </ul>
          </div>
          
          <div className="container-fluid p-0">
            <div className="tableview">
              <div id="scordcard-wrapper" className="row m-0 p-2">
                {activePerspective && (
                  <PerspectiveTemplate
                    id={activePerspective.id}
                    Scrid={activePerspective.id}
                    title={activePerspective.scoreCardValue?.name}
                    scorecardStatuslight={activePerspective.scoreCardValue?.statusLight}
                    scorecardStatusvalueofweight={activePerspective.scoreCardValue?.thresholdResult}
                    defaultscr={activePerspective.scoreCardValue?.defaultscr}
                    headerRow={<PerspectiveHeaderRowTemplate />}
                    bodyRows={
                      activePerspective.objectiveList?.map((objective) => {
                        const obj = objective.objectivesValue || {};
                        return (
                          <ObjectiveRowTemplate
                            key={objective.id}
                            scoreCardId={activePerspective.id}
                            objectiveId={objective.id}
                            objectiveDisplayId={objective.objectiveId}
                            objectiveName={obj.name}
                            statusLight={getStatusIcon(obj.statusLight)}
                            actual=""
                            target=""
                            score={obj.thresholdResult}
                            trendIcon={getTrendIcon(obj.trend)}
                            objectiveOptionsicon={getActionsMenu()}
                          >
                            {objective.kpiList?.map((kpi) => (
                              <KpiGroupTemplate
                                key={kpi.id}
                                kpi={kpi}
                                objectiveId={objective.id}
                                getStatusIcon={getStatusIcon}
                                getTrendIcon={getTrendIcon}
                                getActionsMenu={getActionsMenu}
                              />
                            ))}
                          </ObjectiveRowTemplate>
                        );
                      })
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer
        className="col-12 text-center py-2 copyright"
        style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', margin: 0, padding: '8px' }}
      >
        <p className="mb-0" style={{ margin: 0 }}>
          Copyright &copy; <span id="year">{new Date().getFullYear()}</span> <strong>StratRoom</strong>
        </p>
      </footer>
      <div className="floating-box shadow-sm">
        <a className="control-link" href="#">
          <span className="icon">
            <img src="/images/organization-i.svg" width="18" height="18" alt="organization" />
          </span>
        </a>
        <a className="control-link" href="#">
          <span className="icon">
            <img src="/images/template.svg" width="18" height="18" alt="organization" />
          </span>
        </a>
      </div>
    </>
  );
};

export default StandardView;
