import React from 'react';

const KpiCustomThresholdModal = () => {
  return (
    <div
      className="modal fade kpi_custom_threshold_popup"
      id="kpi_custom_threshold_popup"
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
              Performance Calculator
            </h6>
            <button
              type="button"
              id="threClosePopupId"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" style={{ padding: '0 25px' }}>
            <div className="card">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item m-l-10">
                  <a className="nav-link active" data-toggle="tab" href="#formula_builder">
                    Formula Builder
                  </a>
                </li>
              </ul>
              <div className="tab-content" style={{ padding: '10px' }}>
                <div className="tab-pane body active" id="formula_builder">
                  <div className="mb-3 w-100">
                    <textarea
                      className="form-control browser-default"
                      name="thresholdformula"
                      id="thresholdformula"
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
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('+')}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('-')}
                    >
                      -
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('*')}
                    >
                      *
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('/')}
                    >
                      /
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('%')}
                    >
                      %
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('(')}
                    >
                      (
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula(')')}
                    >
                      )
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('[')}
                    >
                      [
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula(']')}
                    >
                      ]
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula(':')}
                    >
                      :
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('AND')}
                    >
                      AND
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('OR')}
                    >
                      OR
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('NOT')}
                    >
                      NOT
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('IN')}
                    >
                      IN
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('==')}
                    >
                      ==
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('!=')}
                    >
                      !=
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('>')}
                    >
                      &gt;
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('<')}
                    >
                      &lt;
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('>=')}
                    >
                      &gt;=
                    </button>
                    <button
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('<=')}
                    >
                      &lt;=
                    </button>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="panel panel-primary" id="result_panel1">
                        <div className="panel-heading">
                          <h6 className="panel-title">Functions:</h6>
                        </div>
                        <div className="panel-body">
                          <ul className="list-group">
                            <li
                              className="list-group-item"
                              onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('if')}
                            >
                              if
                            </li>
                            <li
                              className="list-group-item"
                              onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('avg')}
                            >
                              avg
                            </li>
                            <li
                              className="list-group-item"
                              onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('agg')}
                            >
                              agg
                            </li>
                            <li
                              className="list-group-item"
                              onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('count')}
                            >
                              count
                            </li>
                            <li
                              className="list-group-item"
                              onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('sum')}
                            >
                              sum
                            </li>
                            <li
                              className="list-group-item"
                              onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('min')}
                            >
                              min
                            </li>
                            <li
                              className="list-group-item"
                              onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('max')}
                            >
                              max
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="panel panel-primary" id="result_panel1">
                        <div className="panel-heading">
                          <h6 className="panel-title">Function Description:</h6>
                        </div>
                        <div className="panel-body">
                          <h6>IF</h6>
                          <p>
                            Returns second argument if first argument is true; Returns optional third argument if first argument is false; IF('element', 'trueCalc', 'falseCalc')
                          </p>
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
                          if (window.handleFormulaValidate) window.handleFormulaValidate('THRESSHOLD');
                        }}
                      >
                        Validate
                      </button>
                      <button
                        name="add"
                        id="add"
                        className="btn btn-secondary"
                        onClick={() => {
                          if (window.handleFormulaAdd) window.handleFormulaAdd('THRESSHOLD');
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
  );
};

export default KpiCustomThresholdModal;
