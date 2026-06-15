import React from 'react';

const ScorecardModal = () => {
  return (
    <div
      className="modal custom-modal fade kpi_setting scorecard_description_popup"
      id="add-settings-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel_1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-lg-600">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" data-translate="page.scorecard.settings">
              Settings
            </h4>
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form id="scorecardForm">
              <div className="card custom-card border-0">
                <div className="card-body">
                  <div className="grid gas-3">
                    <div className="form-group col-md-3" id="scorecard_id_wrapper" style={{ display: 'none' }}>
                      <label htmlFor="scorecard_id" data-i18n="ID">
                        ID
                      </label>
                      <input
                        type="text"
                        className="form-control browser-default"
                        name="scorecard_id"
                        id="scorecard_id"
                        placeholder=""
                        autoComplete="off"
                      />
                    </div>
                    <div className="g-col-12">
                      <div className="form-group">
                        <label
                          htmlFor="scorecard_name"
                          className="form-label"
                          data-translate="page.scorecard.scorecardItems.name"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control browser-default"
                          name="scorecard_name"
                          id="scorecard_name"
                          placeholder=""
                          autoComplete="off"
                          onKeyPress={(e) => {
                            if (window.scorecardname) return window.scorecardname(e);
                          }}
                        />
                      </div>
                    </div>
                    <div className="g-col-12">
                      <div className="form-group">
                        <label
                          htmlFor="scorecard_description"
                          className="form-label"
                          data-translate="page.scorecard.scorecardItems.description"
                        >
                          Description
                        </label>
                        <textarea
                          className="form-control browser-default"
                          name="scorecard_description"
                          id="scorecard_description"
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
                          htmlFor="scorecard_owner"
                          className="form-label"
                          data-translate="page.scorecard.scorecardItems.owner"
                        >
                          Owner
                        </label>
                        <select
                          id="scorecard_owner"
                          name="scorecard_owner"
                          className="form-control browser-default"
                          style={{ display: 'block !important' }}
                        ></select>
                      </div>
                    </div>
                    <div className="g-col-12 g-col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="scorecarddept"
                          className="form-label"
                          data-translate="page.scorecard.scorecardItems.department"
                        >
                          Department
                        </label>
                        <select
                          className="form-control select2"
                          name="scorecarddept"
                          id="scorecarddept"
                        ></select>
                      </div>
                    </div>
                    <div className="g-col-12 g-col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="date_range"
                          className="form-label"
                          data-translate="page.scorecard.scorecardItems.startEndDate"
                        >
                          Start/End Date
                        </label>
                        <input
                          type="text"
                          id="date_range"
                          name="date_range"
                          className="form-control browser-default date_pickers datepicker-here"
                          data-range="true"
                          data-multiple-dates-separator=" - "
                          data-language="en"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="g-col-12 g-col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="scorecard_status"
                          className="form-label"
                          data-translate="page.scorecard.scorecardItems.status"
                        >
                          Status
                        </label>
                        <select
                          id="scorecard_status"
                          name="scorecard_status"
                          className="form-control browser-default"
                          defaultValue=""
                        >
                          <option value="" data-i18n="Choose">
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
                    <div className="g-col-12">
                      <div className="form-group">
                        <label
                          htmlFor="scorecard_formula"
                          className="form-label"
                          data-translate="page.scorecard.scorecardItems.performance"
                        >
                          Performance
                        </label>
                        <input
                          type="text"
                          className="form-control browser-default"
                          name="scorecard_formula"
                          id="scorecard_formula"
                          readOnly
                          data-toggle="modal"
                          data-target=".scorecard_custom_threshold_popup"
                          onClick={() => {
                            if (window.handleCustomThresholdEvent)
                              window.handleCustomThresholdEvent('SCORECARDCONFIG');
                          }}
                          role="button"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="g-col-12">
                <div className="form-group">
                  <label
                    htmlFor="scorecardFields"
                    className="form-label"
                    data-translate="scorecard.Scorecard Fields"
                  >
                    Scorecard Fields
                  </label>
                  <div className="d-grid grid-template gap-2">
                    <div className="form-check">
                      <input
                        className="form-check-input scorecardviewsettingchange"
                        type="checkbox"
                        id="scorecardactual"
                        name="scorecard_fields"
                        value="Actual"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="scorecardactual"
                        data-i18n="Actual"
                        data-translate="scorecard.Actual"
                      >
                        Actual
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input scorecardviewsettingchange"
                        type="checkbox"
                        id="scorecardtarget"
                        value="Target"
                        name="scorecard_fields"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="scorecardtarget"
                        data-translate="scorecard.Target"
                      >
                        Target
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input scorecardviewsettingchange"
                        type="checkbox"
                        id="scorecardbudget"
                        value="Budget"
                        name="scorecard_fields"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="scorecardbudget"
                        data-translate="scorecard.Budget"
                      >
                        Strech
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input scorecardviewsettingchange"
                        type="checkbox"
                        id="scorecardforecast"
                        value="Forecast"
                        name="scorecard_fields"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="scorecardforecast"
                        data-translate="scorecard.Forecast"
                      >
                        Stable
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input scorecardviewsettingchange"
                        type="checkbox"
                        id="scorecardbaseline"
                        value="Baseline"
                        name="scorecard_fields"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="scorecardbaseline"
                        data-translate="controlpanel.baseLine"
                      >
                        Baseline
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input scorecardviewsettingchange"
                        type="checkbox"
                        id="scorecardscore"
                        value="Index"
                        name="scorecard_fields"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="scorecardscore"
                        data-translate="scorecard.Index"
                      >
                        Index
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input scorecardviewsettingchange"
                        type="checkbox"
                        id="scorecardtrend"
                        value="Trend"
                        name="scorecard_fields"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="scorecardtrend"
                        data-translate="scorecard.Trend"
                      >
                        Trend
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input scorecardviewsettingchange"
                        type="checkbox"
                        id="scorecardrisk"
                        value="Risk"
                        name="scorecard_fields"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="scorecardrisk"
                        data-translate="modules.Risk"
                      >
                        Risk
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input scorecardviewsettingchange"
                        type="checkbox"
                        id="scorecarddecline"
                        value="Decline"
                        name="scorecard_fields"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="scorecarddecline"
                        data-translate="scorecard.Decline"
                      >
                        Shrink
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input scorecardviewsettingchange"
                        type="checkbox"
                        id="scorecardtype"
                        value="Type"
                        name="scorecard_fields"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="scorecardtype"
                        data-translate="scorecard.Type"
                      >
                        Type
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-label-secondary"
                  data-dismiss="modal"
                  aria-label="Close"
                  data-translate="page.scorecard.scorecardItems.cancel"
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary initative_save_btn"
                  value="Save"
                  data-translate="page.scorecard.scorecardItems.save"
                >
                  Save
                </button>
              </div>
              <input type="hidden" name="createdById" id="createdById" defaultValue="" />
              <input type="hidden" name="action" defaultValue="" />
              <input type="hidden" name="defaultscr" defaultValue="" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScorecardModal;
