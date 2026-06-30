import React from 'react';

const goBackToCallerModal = () => {
  const calcModal = document.getElementById('kpi_formula_popup');
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

const KpiPerformanceFormulaModal = () => {
  return (
    <>
      <style>{`
        .kpi_performanceformula_popup .list-group-item {
          cursor: default;
        }
      `}</style>
      <div
        className="modal fade kpi_performanceformula_popup"
        id="kpi_formula_popup"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
        modal-backdrop="false"
        data-backdrop="false"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content modal-content-setscrollheight">
          <div className="modal-header">
            <h6 className="modal-title" id="myLargeModalLabel">
              KPI Performance Calculator
            </h6>
            <button
              type="button"
              id="kpiperclosePopupId"
              className="btn-close"
              aria-label="Close"
              onClick={goBackToCallerModal}
            ></button>
          </div>
          <div className="modal-body" style={{ padding: '0 25px' }}>
            <div className="col-md-8" style={{ padding: '0' }}>
              Field Name: &nbsp;
              <select
                id="performancefieldId"
                name="performancefieldName"
                className="form-control browser-default"
              >
                <option value="Target" data-i18n="Target">Target</option>
                <option value="Actual" data-i18n="Actual">Actual</option>
                <option value="Strech" data-i18n="Strech">Strech</option>
                <option value="Stable" data-i18n="Stable">Stable</option>
                <option value="Shrink" data-i18n="Shrink">Shrink</option>
                <option value="Gap" data-i18n="Gap">Gap</option>
              </select>
            </div>
            <div className="card">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item m-l-10">
                  <a className="nav-link active" data-toggle="tab" href="#formula_builder">
                    Formula Builder
                  </a>
                </li>
                <li className="nav-item m-l-10">
                  <a className="nav-link" data-toggle="tab" href="#summary_calculation">
                    Summary Calculation
                  </a>
                </li>
              </ul>
              <div className="tab-content" style={{ padding: '10px' }}>
                <div className="tab-pane body active" id="formula_builder">
                  <div className="mb-3 w-100">
                    <textarea
                      className="form-control browser-default"
                      name="performanceformula"
                      id="performanceformula"
                      placeholder=""
                      cols=""
                      rows="3"
                      autoComplete="off"
                    ></textarea>
                  </div>
                  <div className="mb-3 w-100" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updatePerformance && window.updatePerformance('+')}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updatePerformance && window.updatePerformance('-')}
                    >
                      -
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updatePerformance && window.updatePerformance('*')}
                    >
                      *
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updatePerformance && window.updatePerformance('/')}
                    >
                      /
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updatePerformance && window.updatePerformance('%')}
                    >
                      %
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updatePerformance && window.updatePerformance('(')}
                    >
                      (
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updatePerformance && window.updatePerformance(')')}
                    >
                      )
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updatePerformance && window.updatePerformance('[')}
                    >
                      [
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updatePerformance && window.updatePerformance(']')}
                    >
                      ]
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updatePerformance && window.updatePerformance(':')}
                    >
                      :
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updatePerformance && window.updatePerformance('AND')}
                    >
                      AND
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updatePerformance && window.updatePerformance('OR')}
                    >
                      OR
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updatePerformance && window.updatePerformance('NOT')}
                    >
                      NOT
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updatePerformance && window.updatePerformance('IN')}
                    >
                      IN
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updatePerformance && window.updatePerformance('==')}
                    >
                      ==
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updatePerformance && window.updatePerformance('!=')}
                    >
                      !=
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updatePerformance && window.updatePerformance('>')}
                    >
                      &gt;
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updatePerformance && window.updatePerformance('<')}
                    >
                      &lt;
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updatePerformance && window.updatePerformance('>=')}
                    >
                      &gt;=
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updatePerformance && window.updatePerformance('<=')}
                    >
                      &lt;=
                    </button>
                  </div>
                  <div className="row" style={{ display: 'flex', flexWrap: 'nowrap' }}>
                    <div className="col-md-4">
                      <div className="panel panel-primary" id="result_panel">
                        <div className="panel-heading">
                          <h6 className="panel-title">Fields and measures:</h6>
                        </div>
                        <div className="panel-body" data-spy="scroll">
                          <input
                            type="text"
                            className="form-control browser-default"
                            onKeyUp={() => {
                              if (window.fieldmeasurefilter)
                                window.fieldmeasurefilter('PerformancemeasureNames', 'Performancefieldmeasurefilter');
                            }}
                            id="Performancefieldmeasurefilter"
                            autoComplete="off"
                            placeholder="Search"
                          />
                          <button type="button" className="searchformulaicon">
                            <i className="fa fa-search"></i>
                          </button>
                          <ul className="list-group" id="PerformancemeasureNames"></ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="panel panel-primary" id="result_panel1">
                        <div className="panel-heading">
                          <h6 className="panel-title">Functions:</h6>
                        </div>
                        <div className="panel-body">
                          <ul className="list-group">
                            <li
                              className="list-group-item"
                              onClick={() => window.updatePerformance && window.updatePerformance('if', 'if')}
                            >
                              if
                            </li>
                            <li
                              className="list-group-item"
                              onClick={() => window.updatePerformance && window.updatePerformance('avg', 'avg')}
                            >
                              avg
                            </li>
                            <li
                              className="list-group-item"
                              onClick={() => window.updatePerformance && window.updatePerformance('agg', 'agg')}
                            >
                              agg
                            </li>
                            <li
                              className="list-group-item"
                              onClick={() => window.updatePerformance && window.updatePerformance('count', 'count')}
                            >
                              count
                            </li>
                            <li
                              className="list-group-item"
                              onClick={() => window.updatePerformance && window.updatePerformance('sum', 'sum')}
                            >
                              sum
                            </li>
                            <li
                              className="list-group-item"
                              onClick={() => window.updatePerformance && window.updatePerformance('min', 'min')}
                            >
                              min
                            </li>
                            <li
                              className="list-group-item"
                              onClick={() => window.updatePerformance && window.updatePerformance('max', 'max')}
                            >
                              max
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="panel panel-primary kpiperformuladynamicdesc" id="result_panel1">
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
                  <div className="row">
                    <div className="col-md-4" style={{ marginBottom: '0px' }}>
                      <button
                        name="validate"
                        id="validate"
                        className="btn btn-secondary"
                        onClick={() => {
                          if (window.handleFormulaValidate) window.handleFormulaValidate('KPIPERFORMANCE');
                        }}
                      >
                        Validate
                      </button>
                      <button
                        name="add"
                        id="add"
                        className="btn btn-secondary"
                        onClick={() => {
                          if (window.handleFormulaAdd) window.handleFormulaAdd('KPIPERFORMANCE');
                        }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
                <div className="tab-pane body" id="summary_calculation">
                  <div className="col-md-12">
                    <div className="panel panel-primary" id="final_panel">
                      <div className="panel-heading">
                        <h6 className="panel-title">Formula</h6>
                      </div>
                      <div className="panel-body">
                        <ul className="list-group formula-panel">
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
    </>
  );
};

export default KpiPerformanceFormulaModal;
