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
                    <button title="Addition"
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('+')}
                    >
                      +
                    </button>
                    <button title="Subtraction"
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('-')}
                    >
                      -
                    </button>
                    <button title="Multiplication"
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('*')}
                    >
                      *
                    </button>
                    <button title="Division"
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('/')}
                    >
                      /
                    </button>
                    <button title="Percentage"
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('%')}
                    >
                      %
                    </button>
                    <button title="Open Parenthesis"
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('(')}
                    >
                      (
                    </button>
                    <button title="Close Parenthesis"
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula(')')}
                    >
                      )
                    </button>
                    <button title="Open Bracket"
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('[')}
                    >
                      [
                    </button>
                    <button title="Close Bracket"
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula(']')}
                    >
                      ]
                    </button>
                    <button title="Colon"
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula(':')}
                    >
                      :
                    </button>
                    <button title="Logical AND"
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('AND')}
                    >
                      AND
                    </button>
                    <button title="Logical OR"
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('OR')}
                    >
                      OR
                    </button>
                    <button title="Logical NOT"
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('NOT')}
                    >
                      NOT
                    </button>
                    <button title="Included IN"
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('IN')}
                    >
                      IN
                    </button>
                    <button title="Equals"
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('==')}
                    >
                      ==
                    </button>
                    <button title="Not Equals"
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('!=')}
                    >
                      !=
                    </button>
                    <button title="Greater Than"
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('>')}
                    >
                      &gt;
                    </button>
                    <button title="Less Than"
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('<')}
                    >
                      &lt;
                    </button>
                    <button title="Greater Than or Equals"
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('>=')}
                    >
                      &gt;=
                    </button>
                    <button title="Less Than or Equals"
                      type="button"
                      className="opr btn btn-secondary"
                      onClick={() => window.updateThresholdFormula && window.updateThresholdFormula('<=')}
                    >
                      &lt;=
                    </button>
                  </div>
                  <div className="row" style={{ display: 'flex', flexWrap: 'nowrap', gap: '15px' }}>
                    <div style={{ flex: 1 }}>
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
                    <div style={{ flex: 1 }}>
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
