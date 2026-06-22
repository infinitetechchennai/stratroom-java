import React from 'react';

const PerspectiveCustomThresholdModal = () => {
  return (
    <div
      className="modal custom-modal fade perspective_custom_threshold_popup"
      id="prespective_custom_threshold_popup"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="prespectiveCalculatorModalLabel"
      aria-hidden="true"
      modal-backdrop="false"
      data-backdrop="false"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-lg-down">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="prespectiveCalculatorModalLabel">
              Performance Calculator
            </h5>
            <button
              type="button"
              id="perspectiveClosePopupId"
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
                      id="prespectiveformulaBuilder-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#prespectiveformulaBuilder-pane"
                      type="button"
                      role="tab"
                      aria-controls="prespectiveformulaBuilder-tab-pane"
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
                    id="prespectiveformulaBuilder-pane"
                    role="tabpanel"
                    aria-labelledby="prespectiveformulaBuilder-tab"
                    tabIndex="0"
                  >
                    <div className="grid gap-3">
                      <div className="g-col-12">
                        <textarea
                          className="form-control"
                          name="formula"
                          id="formulaCustomPerspective"
                          placeholder=""
                          cols=""
                          rows="4"
                        ></textarea>
                      </div>
                      <div className="g-col-12">
                        <div className="keypad d-flex flex-wrap gap-2">
                          <button title="Addition"
                            type="button"
                            className="prespective-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateCustomPerspective && window.updateCustomPerspective('+')}
                          >
                            +
                          </button>
                          <button title="Subtraction"
                            type="button"
                            className="prespective-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateCustomPerspective && window.updateCustomPerspective('-')}
                          >
                            -
                          </button>
                          <button title="Multiplication"
                            type="button"
                            className="prespective-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateCustomPerspective && window.updateCustomPerspective('*')}
                          >
                            *
                          </button>
                          <button title="Division"
                            type="button"
                            className="prespective-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateCustomPerspective && window.updateCustomPerspective('/')}
                          >
                            /
                          </button>
                          <button title="Percentage"
                            type="button"
                            className="prespective-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateCustomPerspective && window.updateCustomPerspective('%')}
                          >
                            %
                          </button>
                          <button title="Open Parenthesis"
                            type="button"
                            className="prespective-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateCustomPerspective && window.updateCustomPerspective('(')}
                          >
                            (
                          </button>
                          <button title="Close Parenthesis"
                            type="button"
                            className="prespective-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateCustomPerspective && window.updateCustomPerspective(')')}
                          >
                            )
                          </button>
                          <button title="Open Bracket"
                            type="button"
                            className="prespective-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateCustomPerspective && window.updateCustomPerspective('[')}
                          >
                            [
                          </button>
                          <button title="Close Bracket"
                            type="button"
                            className="prespective-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateCustomPerspective && window.updateCustomPerspective(']')}
                          >
                            ]
                          </button>
                          <button title="Colon"
                            type="button"
                            className="prespective-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateCustomPerspective && window.updateCustomPerspective(':')}
                          >
                            :
                          </button>
                          <button title="Logical AND"
                            type="button"
                            className="prespective-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateCustomPerspective && window.updateCustomPerspective('AND')}
                          >
                            AND
                          </button>
                          <button title="Logical OR"
                            type="button"
                            className="prespective-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateCustomPerspective && window.updateCustomPerspective('OR')}
                          >
                            OR
                          </button>
                          <button title="Logical NOT"
                            type="button"
                            className="prespective-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateCustomPerspective && window.updateCustomPerspective('NOT')}
                          >
                            NOT
                          </button>
                          <button title="Included IN"
                            type="button"
                            className="prespective-kepad btn btn-sm btn-sm btn-secondary"
                            onClick={() => window.updateCustomPerspective && window.updateCustomPerspective('IN')}
                          >
                            IN
                          </button>
                          <button title="Equals"
                            type="button"
                            className="prespective-kepad btn btn-sm btn-secondary text-nowrap"
                            onClick={() => window.updateCustomPerspective && window.updateCustomPerspective('==')}
                          >
                            ==
                          </button>
                          <button title="Not Equals"
                            type="button"
                            className="prespective-kepad btn btn-sm btn-secondary text-nowrap"
                            onClick={() => window.updateCustomPerspective && window.updateCustomPerspective('!=')}
                          >
                            !=
                          </button>
                          <button title="Greater Than"
                            type="button"
                            className="prespective-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateCustomPerspective && window.updateCustomPerspective('>')}
                          >
                            &gt;
                          </button>
                          <button title="Less Than"
                            type="button"
                            className="prespective-kepad btn btn-sm btn-secondary"
                            onClick={() => window.updateCustomPerspective && window.updateCustomPerspective('<')}
                          >
                            &lt;
                          </button>
                          <button title="Greater Than or Equals"
                            type="button"
                            className="prespective-kepad btn btn-sm btn-secondary text-nowrap"
                            onClick={() => window.updateCustomPerspective && window.updateCustomPerspective('>=')}
                          >
                            &gt;=
                          </button>
                          <button title="Less Than or Equals"
                            type="button"
                            className="prespective-kepad btn btn-sm btn-secondary text-nowrap"
                            onClick={() => window.updateCustomPerspective && window.updateCustomPerspective('<=')}
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
                                        window.fieldmeasurefilter('perspectiveMeasureNames', 'perspectivefieldmeasurefilter');
                                    }}
                                    id="perspectivefieldmeasurefilter"
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="basic-addon3"
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
                              <ul className="list-group" id="perspectiveMeasureNames"></ul>
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
                                className="list-group-item prespectiveFuncton"
                                onClick={() => window.updateCustomPerspective && window.updateCustomPerspective('if', 'if')}
                              >
                                If
                              </li>
                              <li
                                className="list-group-item prespectiveFuncton"
                                onClick={() => window.updateCustomPerspective && window.updateCustomPerspective('avg', 'avg')}
                              >
                                avg
                              </li>
                              <li
                                className="list-group-item prespectiveFuncton"
                                onClick={() => window.updateCustomPerspective && window.updateCustomPerspective('agg', 'agg')}
                              >
                                agg
                              </li>
                              <li
                                className="list-group-item prespectiveFuncton"
                                onClick={() => window.updateCustomPerspective && window.updateCustomPerspective('count', 'count')}
                              >
                                count
                              </li>
                              <li
                                className="list-group-item prespectiveFuncton"
                                onClick={() => window.updateCustomPerspective && window.updateCustomPerspective('sum', 'sum')}
                              >
                                sum
                              </li>
                              <li
                                className="list-group-item prespectiveFuncton"
                                onClick={() => window.updateCustomPerspective && window.updateCustomPerspective('min', 'min')}
                              >
                                min
                              </li>
                              <li
                                className="list-group-item prespectiveFuncton"
                                onClick={() => window.updateCustomPerspective && window.updateCustomPerspective('max', 'max')}
                              >
                                max
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="g-col-12 g-col-md-4">
                        <div className="panel panel-primary" id="prespectiveFunctonResult_panel">
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
                          if (window.handleFormulaValidate) window.handleFormulaValidate('PERSPECTIVE');
                        }}
                      >
                        Validate
                      </button>
                      <button
                        name="add"
                        id="add"
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          if (window.handleFormulaAdd) window.handleFormulaAdd('PERSPECTIVE');
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

export default PerspectiveCustomThresholdModal;
