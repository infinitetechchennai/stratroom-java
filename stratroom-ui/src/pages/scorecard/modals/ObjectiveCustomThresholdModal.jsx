import React from 'react';

const ObjectiveCustomThresholdModal = () => {
  return (
    <div
      className="modal fade objective_custom_threshold_popup"
      id="objective_custom_threshold_popup"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
      modal-backdrop="false"
      data-backdrop="false"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0 pt-4 px-4">
            <h5 className="modal-title fw-bold" id="myLargeModalLabel" style={{ fontSize: '18px' }}>
              Performance Calculator
            </h5>
            <button
              type="button"
              id="objectiveClosePopupId"
              className="btn-close"
              data-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-4 pt-2">
            <ul className="nav nav-underline mb-3">
              <li className="nav-item">
                <a className="nav-link active text-dark fw-bold text-uppercase border-bottom border-dark border-2 px-0" style={{ paddingBottom: '8px' }} href="#">
                  Formula Builder
                </a>
              </li>
            </ul>

            <div className="mb-4">
              <textarea
                className="form-control"
                name="formulaCustomObjective"
                id="formulaCustomObjective"
                placeholder=""
                cols=""
                rows="3"
                autoComplete="off"
              ></textarea>
            </div>

            <div className="d-flex flex-wrap gap-2 mb-4">
              {[
                '+', '-', '*', '/', '%', '(', ')', '[', ']', ':', 'AND', 'OR', 'NOT', 'IN', '==', '!=', '>', '<', '>=', '<='
              ].map((op) => (
                <button
                  key={op}
                  type="button"
                  className="btn btn-secondary text-white rounded"
                  style={{ minWidth: '42px', fontWeight: '500', fontSize: '12px', padding: '6px 10px' }}
                  onClick={() => window.updateCustomObjective && window.updateCustomObjective(op)}
                >
                  {op}
                </button>
              ))}
            </div>

            <div className="row g-4">
              {/* Column 1: Fields and measures */}
              <div className="col-md-4 d-flex flex-column">
                <h6 className="fw-bold mb-3" style={{ fontSize: '14px' }}>Fields and measures:</h6>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    id="objectivecustomfieldmeasurefilter"
                    autoComplete="off"
                    onKeyUp={() => {
                      if (window.fieldmeasurefilter)
                        window.fieldmeasurefilter('objectiveMeasureNames', 'objectivecustomfieldmeasurefilter');
                    }}
                  />
                  <button className="btn border bg-white" type="button">
                    <i className="fa fa-search text-muted"></i>
                  </button>
                </div>
                <div className="border rounded flex-grow-1" style={{ height: '220px', overflowY: 'auto' }}>
                  <ul className="list-group list-group-flush m-0" id="objectiveMeasureNames"></ul>
                </div>
                
                <div className="mt-4 d-flex gap-2">
                  <button
                    name="validate"
                    id="validate"
                    className="btn btn-secondary text-white"
                    onClick={() => {
                      if (window.handleFormulaValidate) window.handleFormulaValidate('OBJECTIVE');
                    }}
                  >
                    Validate
                  </button>
                  <button
                    name="add"
                    id="add"
                    className="btn btn-primary text-white"
                    onClick={() => {
                      if (window.handleFormulaAdd) window.handleFormulaAdd('OBJECTIVE');
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Column 2: Functions */}
              <div className="col-md-4">
                <h6 className="fw-bold mb-3" style={{ fontSize: '14px' }}>Functions:</h6>
                <div className="border rounded" style={{ height: '220px', overflowY: 'auto' }}>
                  <ul className="list-group list-group-flush m-0">
                    {[
                      { label: 'If', val: 'if' },
                      { label: 'avg', val: 'avg' },
                      { label: 'agg', val: 'agg' },
                      { label: 'count', val: 'count' },
                      { label: 'sum', val: 'sum' },
                      { label: 'min', val: 'min' },
                      { label: 'max', val: 'max' },
                    ].map((fn, idx) => (
                      <li
                        key={fn.val}
                        className={`list-group-item list-group-item-action ${idx === 0 ? 'bg-primary text-white' : ''}`}
                        style={{ cursor: 'pointer', padding: '12px 16px', fontSize: '13px' }}
                        onClick={(e) => {
                          e.currentTarget.parentElement.childNodes.forEach(node => {
                            node.classList.remove('bg-primary', 'text-white');
                          });
                          e.currentTarget.classList.add('bg-primary', 'text-white');

                          if (window.updateCustomObjective) window.updateCustomObjective(fn.val, fn.val);
                        }}
                      >
                        {fn.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Column 3: Function Description */}
              <div className="col-md-4 objectiveformuladynamicdesc">
                <h6 className="fw-bold mb-3" style={{ fontSize: '14px' }}>Function Description:</h6>
                <div className="pt-1">
                  <h6 className="formulaheaderdesc fw-bold text-uppercase" style={{ fontSize: '14px' }}>IF</h6>
                  <p className="formulacontentdesc text-dark" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                    Returns second argument if first argument is true; Returns optional third argument if first argument is false;<br /><br />
                    IF([KPI1, KPI2], 'trueCalc', 'falseCalc')
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectiveCustomThresholdModal;
