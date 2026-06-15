import React from 'react';

const ObjectiveModal = () => {
  return (
    <div
      className="modal custom-modal fade kpi_setting objective_description_popup"
      id="objective-add-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel_1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Add Objective</h4>
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form id="objectiveForm" className="card custom-card border-0">
              <div className="card-body">
                <div className="grid gap-3">
                  <div className="g-col-12">
                    <div className="form-group" style={{ display: 'none' }}>
                      <label htmlFor="objective_id" data-i18n="ID">
                        ID
                      </label>{' '}
                      <input
                        type="text"
                        className="form-control browser-default"
                        name="objective_display_id"
                        id="objective_display_id"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="g-col-12">
                    <div className="form-group">
                      <label
                        htmlFor="objective_name"
                        data-i18n="Name"
                        data-translate="page.scorecard.scorecardItems.name"
                      >
                        Name
                      </label>{' '}
                      <input
                        type="text"
                        className="form-control browser-default"
                        name="objective_name"
                        id="objective_name"
                        placeholder=""
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="g-col-12">
                    <div className="form-group">
                      <label
                        htmlFor="objective_description"
                        data-i18n="Description"
                        data-translate="page.scorecard.scorecardItems.description"
                      >
                        Description
                      </label>
                      <textarea
                        className="form-control browser-default"
                        name="objective_description"
                        id="objective_description"
                        placeholder=""
                        cols=""
                        rows="6"
                        autoComplete="off"
                      ></textarea>
                    </div>
                  </div>
                  <div className="g-col-12 g-col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="objective_owner"
                        data-i18n="Owner"
                        data-translate="page.scorecard.scorecardItems.owner"
                      >
                        Owner
                      </label>{' '}
                      <select
                        id="objective_owner"
                        name="objective_owner"
                        className="form-control browser-default"
                        style={{ display: 'block !important' }}
                      ></select>
                    </div>
                  </div>
                  <div className="g-col-12 g-col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="objective_start_end_date"
                        data-i18n="Start/End Date"
                        data-translate="page.scorecard.scorecardItems.startEndDate"
                      >
                        Start and End Date
                      </label>
                      <input
                        type="text"
                        name="objective_start_end_date"
                        id="objective_start_end_date"
                        className="form-control browser-default date_pickers"
                        data-range="true"
                        data-multiple-dates-separator=" - "
                        data-language="en"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="g-col-12">
                    <div className="form-group">
                      <label
                        htmlFor="custom_objective"
                        className="form-label"
                        data-translate="page.scorecard.scorecardItems.performance"
                      >
                        Performance
                      </label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control browser-default"
                          id="custom_objective"
                          name="custom_objective"
                          placeholder="Performance"
                          aria-label="Performance"
                          aria-describedby="button-addon2"
                          readOnly
                        />

                        <button
                          className="btn btn-label-secondary"
                          type="button"
                          id="button-addon2"
                          data-toggle="modal"
                          data-target=".objective_custom_threshold_popup"
                          onClick={() => {
                            if (window.handleCustomThresholdEvent)
                              window.handleCustomThresholdEvent('OBJECTIVE');
                          }}
                          data-translate="page.scorecard.scorecardItems.kpiCalculator"
                        >
                          Calculator
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="g-col-12 g-col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor="objective_weight"
                        data-i18n="Weight(%)"
                        data-translate="page.scorecard.scorecardItems.weight"
                      >
                        Weight(%)
                      </label>
                      <input
                        type="text"
                        className="form-control browser-default"
                        name="objectiveweight"
                        id="objectiveweight"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="g-col-12 g-col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor="objective_sub_weight"
                        data-i18n="Sub Weight(%)"
                        data-translate="page.scorecard.scorecardItems.subWeight"
                      >
                        Sub Weight(%)
                      </label>
                      <input
                        type="text"
                        className="form-control browser-default"
                        name="objective_sub_weight"
                        id="objective_sub_weight"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="g-col-12 g-col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor="objective_status"
                        data-i18n="Status"
                        data-translate="page.scorecard.scorecardItems.status"
                      >
                        Status
                      </label>{' '}
                      <select
                        id="objective_status"
                        name=""
                        className="form-control browser-default"
                        defaultValue="0"
                      >
                        <option value="0" data-i18n="Choose">
                          Choose
                        </option>
                        <option value="Manual" data-i18n="Manual">
                          Manual
                        </option>
                        <option value="Weighted" data-i18n="Weighted">
                          Weighted
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-label-secondary btn-default1 btn"
                  data-dismiss="modal"
                  aria-label="Close"
                  data-i18n="Cancel"
                  data-translate="page.scorecard.scorecardItems.cancel"
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary scorecard_save_btn"
                  value="Save"
                  data-i18n="Save"
                  data-translate="page.scorecard.scorecardItems.save"
                >
                  Save
                </button>
              </div>

              <input type="hidden" name="action" defaultValue="" />
              <input type="hidden" name="objCreatedById" id="objCreatedById" defaultValue="" />
              <input type="hidden" name="scoreCardId" defaultValue="" />
              <input type="hidden" name="objective_id" id="objective_id" defaultValue="" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectiveModal;
