import React from 'react';

const goBackToCallerModal = () => {
  const calcModal = document.getElementById('kpiActual-calculator-modal');
  const callerModalId = window._kpiCalcCallerModalId || 'kpi-view-modal';
  const callerModal = document.getElementById(callerModalId);
  if (!calcModal || !callerModal || !window.bootstrap) return;

  const bsCalc = window.bootstrap.Modal.getInstance(calcModal);
  if (bsCalc) {
    calcModal.addEventListener('hidden.bs.modal', function reopenParent() {
      calcModal.removeEventListener('hidden.bs.modal', reopenParent);
      const bsCaller = window.bootstrap.Modal.getOrCreateInstance(callerModal);
      bsCaller.show();
    });
    bsCalc.hide();
  }
};

const KpiFormulaModal = () => {
  return (
    <div
      className="modal custom-modal fade kpi_formula_popup"
      id="kpiActual-calculator-modal"
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
              KPI Calculator
            </h5>
            <button
              type="button"
              id="closePopupId"
              className="btn-close"
              aria-label="Close"
              onClick={goBackToCallerModal}
            ></button>
          </div>
          <div className="modal-body">
            <div className="p-2">
              <label htmlFor="kpiActualCalfieldName" className="form-label">
                <small>Field Name</small>
              </label>
              <select id="fieldId" name="fieldName" className="form-control browser-default">
                <option value="A" data-i18n="Actual">
                  Actual
                </option>
                <option value="T" data-i18n="Target">
                  Target
                </option>
                <option value="B" data-i18n="Budget">
                  Budget
                </option>
              </select>
            </div>
            <div className="card border-0">
              <div className="card-header bg-transparent border-0">
                <ul className="nav nav-underline gap-3" role="tablist">
                  <li className="nav-item" role="Formula Builder">
                    <button
                      className="nav-link text-uppercase active"
                      id="kpiActualFormulaBuilderTab"
                      data-bs-toggle="tab"
                      data-bs-target="#kpiActualFormulaBuilderTab-pane"
                      type="button"
                      role="tab"
                      aria-controls="kpiActualFormulaBuilderTab-pane"
                      href="#formula_builder"
                      aria-selected="true"
                    >
                      Formula Builder
                    </button>
                  </li>
                  <li className="nav-item" role="Summary Calculation">
                    <button
                      className="nav-link text-uppercase"
                      id="kpiActualSummaryCalculationTab"
                      data-bs-toggle="tab"
                      data-bs-target="#kpiActualSummaryCalculationTab-pane"
                      type="button"
                      role="tab"
                      aria-controls="kpiActualSummaryCalculationTab-pane"
                      aria-selected="false"
                      href="#summary_calculation"
                    >
                      Summary Calculation
                    </button>
                  </li>
                </ul>
              </div>

              <div className="card-body">
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="kpiActualFormulaBuilderTab-pane"
                    role="tabpanel"
                    aria-labelledby="kpiActualFormulaBuilderTab-pane"
                    tabIndex="0"
                  >
                    <div className="grid gap-3">
                      <div className="g-col-12">
                        <textarea
                          className="form-control"
                          name="formula"
                          id="formula"
                          placeholder=""
                          cols=""
                          rows="4"
                        ></textarea>
                      </div>
                      <div className="g-col-12">
                        <div className="keypad d-flex flex-wrap gap-2">
                          <button
                            type="button"
                            className="kpiActual-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateFormula && window.updateFormula('+')}
                          >
                            +
                          </button>
                          <button
                            type="button"
                            className="kpiActual-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateFormula && window.updateFormula('-')}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            className="kpiActual-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateFormula && window.updateFormula('*')}
                          >
                            *
                          </button>
                          <button
                            type="button"
                            className="kpiActual-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateFormula && window.updateFormula('/')}
                          >
                            /
                          </button>
                          <button
                            type="button"
                            className="kpiActual-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateFormula && window.updateFormula('%')}
                          >
                            %
                          </button>
                          <button
                            type="button"
                            className="kpiActual-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateFormula && window.updateFormula('(')}
                          >
                            (
                          </button>
                          <button
                            type="button"
                            className="kpiActual-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateFormula && window.updateFormula(')')}
                          >
                            )
                          </button>
                          <button
                            type="button"
                            className="kpiActual-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateFormula && window.updateFormula('[')}
                          >
                            [
                          </button>
                          <button
                            type="button"
                            className="kpiActual-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateFormula && window.updateFormula(']')}
                          >
                            ]
                          </button>
                          <button
                            type="button"
                            className="kpiActual-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateFormula && window.updateFormula(':')}
                          >
                            :
                          </button>
                          <button
                            type="button"
                            className="kpiActual-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateFormula && window.updateFormula('AND')}
                          >
                            AND
                          </button>
                          <button
                            type="button"
                            className="kpiActual-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateFormula && window.updateFormula('OR')}
                          >
                            OR
                          </button>
                          <button
                            type="button"
                            className="kpiActual-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateFormula && window.updateFormula('NOT')}
                          >
                            NOT
                          </button>
                          <button
                            type="button"
                            className="kpiActual-kepad btn btn-sm btn-sm btn-secondary"
                            onClick={() => window.updateFormula && window.updateFormula('IN')}
                          >
                            IN
                          </button>
                          <button
                            type="button"
                            className="kpiActual-kepad btn btn-sm btn-secondary text-nowrap"
                            onClick={() => window.updateFormula && window.updateFormula('==')}
                          >
                            ==
                          </button>
                          <button
                            type="button"
                            className="kpiActual-kepad btn btn-sm btn-secondary text-nowrap"
                            onClick={() => window.updateFormula && window.updateFormula('!=')}
                          >
                            !=
                          </button>
                          <button
                            type="button"
                            className="kpiActual-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateFormula && window.updateFormula('>')}
                          >
                            &gt;
                          </button>
                          <button
                            type="button"
                            className="kpiActual-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateFormula && window.updateFormula('<')}
                          >
                            &lt;
                          </button>
                          <button
                            type="button"
                            className="kpiActual-kepad btn btn-sm btn-secondary text-nowrap"
                            onClick={() => window.updateFormula && window.updateFormula('>=')}
                          >
                            &gt;=
                          </button>
                          <button
                            type="button"
                            className="kpiActual-kepad btn btn-sm btn-secondary text-nowrap"
                            onClick={() => window.updateFormula && window.updateFormula('<=')}
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
                                id="pills-kpiActualMeasures-tab"
                                data-bs-toggle="pill"
                                href="#pills-kpiActualMeasures"
                                role="tab"
                                aria-controls="pills-kpiActualMeasures"
                                aria-selected="true"
                                data-value="kpiformeasure"
                              >
                                Measures
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link rounded-0"
                                id="pills-kpiActualSubMeasures-tab"
                                data-bs-toggle="pill"
                                href="#pills-kpiActualSubMeasures"
                                role="tab"
                                aria-controls="pills-kpiActualSubMeasures"
                                aria-selected="false"
                                data-value="kpiforsubmeasure"
                              >
                                Sub Measures
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link rounded-0"
                                id="pills-kpiActualInitiatives-tab"
                                data-bs-toggle="pill"
                                href="#pills-kpiActualInitiatives"
                                role="tab"
                                aria-controls="pills-kpiActualInitiatives"
                                aria-selected="false"
                                data-value="kpiforinitiatives"
                              >
                                Initiatives
                              </a>
                            </li>
                          </ul>

                          <div className="tab-content" id="pills-tabContent">
                            <div
                              className="tab-pane fade show active"
                              id="pills-kpiActualMeasures"
                              role="tabpanel"
                              aria-labelledby="pills-kpiActualMeasures-tab"
                            >
                              <div className="panel panel-primary" id="result_panel">
                                <div className="panel-heading">
                                  <div className="searchMeasures">
                                    <div className="input-group mb-3">
                                      <input
                                        onKeyUp={() => {
                                          if (window.fieldmeasurefilter)
                                            window.fieldmeasurefilter('measureNames', 'fieldmeasurefilter');
                                        }}
                                        id="fieldmeasurefilter"
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
                                  <ul className="list-group" id="measureNames"></ul>
                                </div>
                              </div>
                            </div>

                            <div
                              className="tab-pane fade"
                              id="pills-kpiActualSubMeasures"
                              role="tabpanel"
                              aria-labelledby="pills-kpiActualSubMeasures-tab"
                            >
                              <div className="panel panel-primary" id="result_panel">
                                <div className="panel-heading">
                                  <div className="searchMeasures">
                                    <div className="input-group mb-3">
                                      <input
                                        onKeyUp={() => {
                                          if (window.fieldmeasurefilter)
                                            window.fieldmeasurefilter('kpisubmeasureNames', 'kpiActualSearchSubMeasure');
                                        }}
                                        id="kpiActualSearchSubMeasure"
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder="Search"
                                        aria-label="Search"
                                        aria-describedby="basic-addon2"
                                      />
                                      <button
                                        className="btn btn-outline-secondary searchformulaicon"
                                        type="button"
                                        id="basic-addon3"
                                      >
                                        <i className="fas fa-search"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="panel-body" data-spy="scroll">
                                  <ul className="list-group" id="kpisubmeasureNames"></ul>
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="pills-kpiActualInitiatives"
                              role="tabpanel"
                              aria-labelledby="pills-kpiActualInitiatives-tab"
                            >
                              <div className="panel panel-primary" id="result_panel">
                                <div className="panel-heading">
                                  <div className="searchMeasures">
                                    <div className="input-group mb-3">
                                      <input
                                        id="kpiActualSearchInitiatives"
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder="Search"
                                        aria-label="Search"
                                        aria-describedby="basic-addon2"
                                        onKeyUp={() => {
                                          if (window.fieldmeasurefilter)
                                            window.fieldmeasurefilter('kpiinitiativeNames', 'kpiActualSearchInitiatives');
                                        }}
                                      />
                                      <button
                                        className="btn btn-outline-secondary searchformulaicon"
                                        type="button"
                                        id="basic-addon3"
                                      >
                                        <i className="fas fa-search"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="panel-body" data-spy="scroll">
                                  <ul className="list-group" id="kpiinitiativeNames"></ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="g-col-12 g-col-md-4">
                        <div className="panel panel-primary" id="kpiActualResult_panel1">
                          <div className="panel-heading">
                            <h6 className="panel-title">Functions:</h6>
                          </div>
                          <div className="panel-body">
                            <ul className="list-group overflow-auto" style={{ maxHeight: '240px' }}>
                              <li
                                className="list-group-item kpiActualFuncton"
                                onClick={() => window.updateFormula && window.updateFormula('if', 'if')}
                              >
                                If
                              </li>
                              <li
                                className="list-group-item kpiActualFuncton"
                                onClick={() => window.updateFormula && window.updateFormula('avg', 'avg')}
                              >
                                avg
                              </li>
                              <li
                                className="list-group-item kpiActualFuncton"
                                onClick={() => window.updateFormula && window.updateFormula('agg', 'agg')}
                              >
                                agg
                              </li>
                              <li
                                className="list-group-item kpiActualFuncton"
                                onClick={() => window.updateFormula && window.updateFormula('count', 'count')}
                              >
                                count
                              </li>
                              <li
                                className="list-group-item kpiActualFuncton"
                                onClick={() => window.updateFormula && window.updateFormula('sum', 'sum')}
                              >
                                sum
                              </li>
                              <li
                                className="list-group-item kpiActualFuncton"
                                onClick={() => window.updateFormula && window.updateFormula('min', 'min')}
                              >
                                min
                              </li>
                              <li
                                className="list-group-item kpiActualFuncton"
                                onClick={() => window.updateFormula && window.updateFormula('max', 'max')}
                              >
                                max
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="g-col-12 g-col-md-4">
                        <div className="panel panel-primary" id="kpiActualResult_panel">
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
                          if (window.handleFormulaValidate) window.handleFormulaValidate('KPI');
                        }}
                      >
                        Validate
                      </button>
                      <button
                        name="add"
                        id="add"
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          if (window.handleFormulaAdd) window.handleFormulaAdd('KPI');
                        }}
                        style={{ height: '20px', marginTop: '9px', width: '45px' }}
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="kpiActualSummaryCalculationTab-pane"
                    role="tabpanel"
                    aria-labelledby="kpiActualsummaryCalculationTab-tab"
                    tabIndex="0"
                  >
                    <div className="col-md-12">
                      <div className="panel panel-primary" id="final_panel">
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

export default KpiFormulaModal;
