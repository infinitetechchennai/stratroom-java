import React from 'react';

const KpiYtdFormulaModal = () => {
  return (
    <div
      className="modal custom-modal fade kpiYtdFormulaPoPUp"
      id="ytd-calculator-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
      modal-backdrop="false"
      data-backdrop="false"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-lg-down">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="myLargeModalLabel">
              YTD Formula Calculator
            </h5>
            <button
              type="button"
              id="ytdClosePopupId"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="card border-0">
              <div className="card-header bg-transparent border-0">
                <ul className="nav nav-underline gap-3" role="tablist">
                  <li className="nav-item" role="Formula Builder">
                    <button
                      className="nav-link text-uppercase active"
                      id="ytdFormulaBuilder-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#ytdFormulaBuilderTab-pane"
                      type="button"
                      role="tab"
                      aria-controls="ytdFormulaBuilder-tab-pane"
                      aria-selected="true"
                    >
                      YTD Formula Builder
                    </button>
                  </li>
                </ul>
              </div>

              <div className="card-body">
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="ytdFormulaBuilderTab-pane"
                    role="tabpanel"
                    aria-labelledby="ytdFormulaBuilderTab-tab"
                    tabIndex="0"
                  >
                    <div className="grid gap-3">
                      <div className="g-col-12">
                        <textarea
                          className="form-control"
                          name="customYtdformula"
                          id="customYtdformula"
                          placeholder=""
                          cols=""
                          rows="4"
                        ></textarea>
                      </div>
                      <div className="g-col-12">
                        <div className="keypad d-flex flex-wrap gap-2">
                          <button
                            type="button"
                            className="ytdPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateYTDFormula && window.updateYTDFormula('+')}
                          >
                            +
                          </button>
                          <button
                            type="button"
                            className="ytdPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateYTDFormula && window.updateYTDFormula('-')}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            className="ytdPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateYTDFormula && window.updateYTDFormula('*')}
                          >
                            *
                          </button>
                          <button
                            type="button"
                            className="ytdPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateYTDFormula && window.updateYTDFormula('/')}
                          >
                            /
                          </button>
                          <button
                            type="button"
                            className="ytdPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateYTDFormula && window.updateYTDFormula('%')}
                          >
                            %
                          </button>
                          <button
                            type="button"
                            className="ytdPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateYTDFormula && window.updateYTDFormula('(')}
                          >
                            (
                          </button>
                          <button
                            type="button"
                            className="ytdPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateYTDFormula && window.updateYTDFormula(')')}
                          >
                            )
                          </button>
                          <button
                            type="button"
                            className="ytdPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateYTDFormula && window.updateYTDFormula('[')}
                          >
                            [
                          </button>
                          <button
                            type="button"
                            className="ytdPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateYTDFormula && window.updateYTDFormula(']')}
                          >
                            ]
                          </button>
                          <button
                            type="button"
                            className="ytdPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateYTDFormula && window.updateYTDFormula(':')}
                          >
                            :
                          </button>
                          <button
                            type="button"
                            className="ytdPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateYTDFormula && window.updateYTDFormula('AND')}
                          >
                            AND
                          </button>
                          <button
                            type="button"
                            className="ytdPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateYTDFormula && window.updateYTDFormula('OR')}
                          >
                            OR
                          </button>
                          <button
                            type="button"
                            className="ytdPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateYTDFormula && window.updateYTDFormula('NOT')}
                          >
                            NOT
                          </button>
                          <button
                            type="button"
                            className="ytdPerformance-kepad btn btn-sm btn-sm btn-secondary"
                            onClick={() => window.updateYTDFormula && window.updateYTDFormula('IN')}
                          >
                            IN
                          </button>
                          <button
                            type="button"
                            className="ytdPerformance-kepad btn btn-sm btn-secondary text-nowrap"
                            onClick={() => window.updateYTDFormula && window.updateYTDFormula('==')}
                          >
                            ==
                          </button>
                          <button
                            type="button"
                            className="ytdPerformance-kepad btn btn-sm btn-secondary text-nowrap"
                            onClick={() => window.updateYTDFormula && window.updateYTDFormula('!=')}
                          >
                            !=
                          </button>
                          <button
                            type="button"
                            className="ytdPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateYTDFormula && window.updateYTDFormula('>')}
                          >
                            &gt;
                          </button>
                          <button
                            type="button"
                            className="ytdPerformance-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateYTDFormula && window.updateYTDFormula('<')}
                          >
                            &lt;
                          </button>
                          <button
                            type="button"
                            className="ytdPerformance-kepad btn btn-sm btn-secondary text-nowrap"
                            onClick={() => window.updateYTDFormula && window.updateYTDFormula('>=')}
                          >
                            &gt;=
                          </button>
                          <button
                            type="button"
                            className="ytdPerformance-kepad btn btn-sm btn-secondary text-nowrap"
                            onClick={() => window.updateYTDFormula && window.updateYTDFormula('<=')}
                          >
                            =&lt;
                          </button>
                        </div>
                      </div>

                      <div className="g-col-12 g-col-md-4">
                        <div className="measuresWrap">
                          <h6 className="panel-title">Fields and measures:</h6>
                          <ul className="nav nav-pills mb-2" id="pills-tab" role="tablist">
                            <li className="nav-item">
                              <a
                                className="nav-link active rounded-0"
                                id="pills-measures-tab"
                                data-bs-toggle="pill"
                                href="#pills-measures"
                                role="tab"
                                aria-controls="pills-measures"
                                aria-selected="true"
                              >
                                Measures
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link rounded-0"
                                id="pills-subMeasures-tab"
                                data-bs-toggle="pill"
                                href="#pills-subMeasures"
                                role="tab"
                                aria-controls="pills-subMeasures"
                                aria-selected="false"
                              >
                                Sub Measures
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link rounded-0"
                                id="pills-initiatives-tab"
                                data-bs-toggle="pill"
                                href="#pills-initiatives"
                                role="tab"
                                aria-controls="pills-initiatives"
                                aria-selected="false"
                              >
                                Initiatives
                              </a>
                            </li>
                          </ul>

                          <div className="tab-content" id="pills-tabContent">
                            <div
                              className="tab-pane fade show active"
                              id="pills-measures"
                              role="tabpanel"
                              aria-labelledby="pills-measures-tab"
                            >
                              <div className="panel panel-primary" id="result_panel">
                                <div className="panel-heading">
                                  <div className="searchMeasures">
                                    <div className="input-group mb-3">
                                      <input
                                        id="ytdSearchMeasure"
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder="Search"
                                        aria-label="Search"
                                        aria-describedby="basic-addon2"
                                      />
                                      <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        id="basic-addon2"
                                      >
                                        <i className="fas fa-search"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="panel-body" data-spy="scroll">
                                  <ul className="list-group" id="ytdMeasureNames"></ul>
                                </div>
                              </div>
                            </div>

                            <div
                              className="tab-pane fade"
                              id="pills-subMeasures"
                              role="tabpanel"
                              aria-labelledby="pills-subMeasures-tab"
                            >
                              <div className="panel panel-primary" id="result_panel">
                                <div className="panel-heading">
                                  <div className="searchMeasures">
                                    <div className="input-group mb-3">
                                      <input
                                        id="ytdSearchSubMeasure"
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder="Search"
                                        aria-label="Search"
                                        aria-describedby="basic-addon2"
                                      />
                                      <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        id="basic-addon3"
                                      >
                                        <i className="fas fa-search"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="panel-body" data-spy="scroll">
                                  <ul className="list-group" id="ytdsubMeasureNames"></ul>
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="pills-initiatives"
                              role="tabpanel"
                              aria-labelledby="pills-initiatives-tab"
                            >
                              <div className="panel panel-primary" id="result_panel">
                                <div className="panel-heading">
                                  <div className="searchMeasures">
                                    <div className="input-group mb-3">
                                      <input
                                        id="ytdSearchInitiatives"
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder="Search"
                                        aria-label="Search"
                                        aria-describedby="basic-addon2"
                                      />
                                      <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        id="basic-addon3"
                                      >
                                        <i className="fas fa-search"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="panel-body" data-spy="scroll">
                                  <ul className="list-group" id="ytdinitiativeNames"></ul>
                                </div>
                              </div>
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
                                className="list-group-item ytdPerFuncton"
                                onClick={() => window.updateYTDFormula && window.updateYTDFormula('if', 'if')}
                              >
                                If
                              </li>
                              <li
                                className="list-group-item ytdPerFuncton"
                                onClick={() => window.updateYTDFormula && window.updateYTDFormula('avg', 'avg')}
                              >
                                avg
                              </li>
                              <li
                                className="list-group-item ytdPerFuncton"
                                onClick={() => window.updateYTDFormula && window.updateYTDFormula('agg', 'agg')}
                              >
                                agg
                              </li>
                              <li
                                className="list-group-item ytdPerFuncton"
                                onClick={() => window.updateYTDFormula && window.updateYTDFormula('count', 'count')}
                              >
                                count
                              </li>
                              <li
                                className="list-group-item ytdPerFuncton"
                                onClick={() => window.updateYTDFormula && window.updateYTDFormula('sum', 'sum')}
                              >
                                sum
                              </li>
                              <li
                                className="list-group-item ytdPerFuncton"
                                onClick={() => window.updateYTDFormula && window.updateYTDFormula('min', 'min')}
                              >
                                min
                              </li>
                              <li
                                className="list-group-item ytdPerFuncton"
                                onClick={() => window.updateYTDFormula && window.updateYTDFormula('max', 'max')}
                              >
                                max
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="g-col-12 g-col-md-4">
                        <div className="panel panel-primary" id="ytdPerResult_panel">
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
                          if (window.handleFormulaValidate) window.handleFormulaValidate('YTD');
                        }}
                      >
                        Validate
                      </button>
                      <button
                        name="add"
                        id="add"
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          if (window.handleFormulaAdd) window.handleFormulaAdd('YTD');
                        }}
                        style={{ height: '20px', marginTop: '9px', width: '45px' }}
                      >
                        Add
                      </button>
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

export default KpiYtdFormulaModal;
