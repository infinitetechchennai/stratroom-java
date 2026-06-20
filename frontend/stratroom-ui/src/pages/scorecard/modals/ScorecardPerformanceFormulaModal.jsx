import React from 'react';

const ScorecardPerformanceFormulaModal = () => {
  return (
    <div
      className="modal custom-modal fade scorecard_custom_threshold_popup"
      id="kpi-calculator-modal"
      data-backdrop="static"
      data-keyboard="false"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
      modal-backdrop="false"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-lg-down">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="myLargeModalLabel">
              Performance Calculator
            </h5>
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
              aria-label="Close"
              id="scorecardClosePopupId"
            ></button>
          </div>
          <div className="modal-body">
            <div className="card border-0">
              <div className="card-header bg-transparent border-0">
                <ul className="nav nav-underline gap-3" role="tablist">
                  <li className="nav-item" role="Formula Builder">
                    <button
                      className="nav-link text-uppercase active"
                      id="kpiFormulaBuilderTab"
                      data-toggle="tab"
                      data-target="#kpiFormulaBuilderTab-pane"
                      type="button"
                      role="tab"
                      aria-controls="kpiFormulaBuilderTab-pane"
                      aria-selected="true"
                    >
                      Formula Builder
                    </button>
                  </li>
                </ul>
              </div>

              <div className="card-body">
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="kpiFormulaBuilderTab-pane"
                    role="tabpanel"
                    aria-labelledby="kpiFormulaBuilderTab-pane"
                    tabIndex="0"
                  >
                    <div className="grid gap-3">
                      <div className="g-col-12">
                        <textarea
                          className="form-control"
                          name="formulaScoreCardPerspective"
                          id="formulaScoreCardPerspective"
                          placeholder=""
                          cols=""
                          rows="4"
                        ></textarea>
                      </div>
                      <div className="g-col-12">
                        <div className="keypad d-flex flex-wrap gap-2">
                          <button
                            type="button"
                            className="kpiPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective('+')}
                          >
                            +
                          </button>
                          <button
                            type="button"
                            className="kpiPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective('-')}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            className="kpiPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective('*')}
                          >
                            *
                          </button>
                          <button
                            type="button"
                            className="kpiPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective('/')}
                          >
                            /
                          </button>
                          <button
                            type="button"
                            className="kpiPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective('%')}
                          >
                            %
                          </button>
                          <button
                            type="button"
                            className="kpiPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective('(')}
                          >
                            (
                          </button>
                          <button
                            type="button"
                            className="kpiPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective(')')}
                          >
                            )
                          </button>
                          <button
                            type="button"
                            className="kpiPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective('[')}
                          >
                            [
                          </button>
                          <button
                            type="button"
                            className="kpiPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective(']')}
                          >
                            ]
                          </button>
                          <button
                            type="button"
                            className="kpiPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective(':')}
                          >
                            :
                          </button>
                          <button
                            type="button"
                            className="kpiPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective('AND')}
                          >
                            AND
                          </button>
                          <button
                            type="button"
                            className="kpiPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective('OR')}
                          >
                            OR
                          </button>
                          <button
                            type="button"
                            className="kpiPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective('NOT')}
                          >
                            NOT
                          </button>
                          <button
                            type="button"
                            className="kpiPerformance-kepad btn btn-sm btn-sm btn-secondary"
                            onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective('IN')}
                          >
                            IN
                          </button>
                          <button
                            type="button"
                            className="kpiPerformance-kepad btn btn-sm btn-secondary text-nowrap"
                            onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective('==')}
                          >
                            ==
                          </button>
                          <button
                            type="button"
                            className="kpiPerformance-kepad btn btn-sm btn-secondary text-nowrap"
                            onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective('!=')}
                          >
                            !=
                          </button>
                          <button
                            type="button"
                            className="kpiPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective('>')}
                          >
                            &gt;
                          </button>
                          <button
                            type="button"
                            className="kpiPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective('<')}
                          >
                            &lt;
                          </button>
                          <button
                            type="button"
                            className="kpiPerformance-kepad btn btn-sm btn-secondary text-nowrap"
                            onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective('>=')}
                          >
                            &gt;=
                          </button>
                          <button
                            type="button"
                            className="kpiPerformance-kepad btn btn-sm btn-secondary text-nowrap"
                            onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective('<=')}
                          >
                            =&lt;
                          </button>
                        </div>
                      </div>
                      <div className="g-col-12 g-col-md-4">
                        <div className="measuresWrap">
                          <div className="panel panel-primary" id="result_panel">
                            <div className="panel-heading">
                              <div className="searchMeasures">
                                <h6 className="panel-title">Fields and measures:</h6>
                                <div className="input-group mb-3">
                                  <input
                                    onKeyUp={() => {
                                      if (window.fieldmeasurefilter)
                                        window.fieldmeasurefilter('scorecardMeasureNames', 'scoreCardmeasurefilter');
                                    }}
                                    id="scoreCardmeasurefilter"
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="basic-addon2"
                                  />
                                  <button
                                    className="btn btn-outline-secondary searchformulaicon"
                                    type="button"
                                    id="basic-addon2"
                                  >
                                    <i className="fas fa-search"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="panel-body" data-spy="scroll">
                              <ul
                                className="list-group overflow-auto"
                                style={{ maxHeight: '180px' }}
                                id="scorecardMeasureNames"
                              ></ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="g-col-12 g-col-md-4">
                        <div className="panel panel-primary" id="result_panel1">
                          <div className="panel-heading">
                            <h6 className="panel-title">Functions:</h6>
                          </div>
                          <div className="panel-body">
                            <ul className="list-group overflow-auto" style={{ maxHeight: '240px' }}>
                              <li
                                className="list-group-item kpiPerFuncton"
                                onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective('if', 'if')}
                              >
                                If
                              </li>
                              <li
                                className="list-group-item kpiPerFuncton"
                                onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective('avg', 'avg')}
                              >
                                avg
                              </li>
                              <li
                                className="list-group-item kpiPerFuncton"
                                onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective('agg', 'agg')}
                              >
                                agg
                              </li>
                              <li
                                className="list-group-item kpiPerFuncton"
                                onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective('count', 'count')}
                              >
                                count
                              </li>
                              <li
                                className="list-group-item kpiPerFuncton"
                                onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective('sum', 'sum')}
                              >
                                sum
                              </li>
                              <li
                                className="list-group-item kpiPerFuncton"
                                onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective('min', 'min')}
                              >
                                min
                              </li>
                              <li
                                className="list-group-item kpiPerFuncton"
                                onClick={() => window.updateScorecardPerspective && window.updateScorecardPerspective('max', 'max')}
                              >
                                max
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="g-col-12 g-col-md-4">
                        <div className="panel panel-primary formuladynamicdesc" id="result_panel1">
                          <div className="panel-heading">
                            <h6 className="panel-title">Function Description:</h6>
                          </div>
                          <div className="panel-body">
                            <h6 className="formulaheaderdesc"></h6>
                            <p className="formulacontentdesc"></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap gap-2 mt-4">
                      <button
                        name="validate"
                        id="validate"
                        className="btn btn-sm btn-secondary"
                        onClick={() => {
                          if (window.handleFormulaValidate) window.handleFormulaValidate('SCORECARDCONFIG');
                        }}
                      >
                        Validate
                      </button>
                      <button
                        name="add"
                        id="add"
                        className="btn btn-sm btn-primary mt-2"
                        onClick={() => {
                          if (window.handleFormulaAdd) window.handleFormulaAdd('SCORECARDCONFIG');
                        }}
                        style={{ height: '30px' }}
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="kpiSummaryCalculationTab-pane"
                    role="tabpanel"
                    aria-labelledby="summaryCalculationTab-tab"
                    tabIndex="0"
                  >
                    <div className="col-md-12">
                      <div className="panel panel-primary" id="summary_calculation">
                        <div className="panel-heading">
                          <h6 className="panel-title">Formula</h6>
                        </div>
                        <div className="panel-body">
                          <ul className="list-group formula-panel overflow-auto" style={{ maxHeight: '240px' }}>
                            <li className="list-group-item">Elapsed Year</li>
                            <li className="list-group-item">Ends With</li>
                            <li className="list-group-item">If</li>
                            <li className="list-group-item">Is Null</li>
                            <li className="list-group-item">Max</li>
                            <li className="list-group-item">Min</li>
                            <li className="list-group-item">Median</li>
                            <li className="list-group-item">Mid</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScorecardPerformanceFormulaModal;
