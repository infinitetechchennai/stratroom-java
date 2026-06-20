import React from 'react';

const PerspectiveModal = () => {
  return (
    <div
      className="modal custom-modal fade kpi_setting perspectives_description_popup"
      id="prespective-edit-modal"
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
            <h4 className="modal-title" data-translate="page.scorecard.editPerspective">
              Edit Prespective
            </h4>
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form id="perspectiveForm" className="card custom-card border-0">
              <div className="card-body">
                <div className="grid gap-3">
                  <div className="g-col-12 g-col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor="perspective_id"
                        data-i18n="ID"
                        data-translate="page.scorecard.scorecardItems.id"
                      >
                        ID
                      </label>{' '}
                      <input
                        type="text"
                        className="form-control browser-default"
                        name="perspective_id"
                        id="perspective_id"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="g-col-12 g-col-md-8">
                    <div className="form-group">
                      <label
                        htmlFor="perspective_name"
                        data-i18n="Name"
                        data-translate="page.scorecard.scorecardItems.name"
                      >
                        Name
                      </label>{' '}
                      <input
                        type="text"
                        className="form-control browser-default"
                        name="perspective_name"
                        id="perspective_name"
                        placeholder=""
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="g-col-12">
                    <div className="form-group">
                      <label
                        htmlFor="perspective_description"
                        data-i18n="Description"
                        data-translate="page.scorecard.scorecardItems.description"
                      >
                        Description
                      </label>
                      <textarea
                        className="form-control browser-default"
                        name="perspective_description"
                        id="perspective_description"
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
                        htmlFor="perspective_owner"
                        data-i18n="Owner"
                        data-translate="page.scorecard.scorecardItems.owner"
                      >
                        Owner
                      </label>{' '}
                      <select
                        id="perspective_owner"
                        name="perspective_owner"
                        className="form-control browser-default"
                        style={{ display: 'block' }}
                      ></select>
                    </div>
                  </div>
                  <div className="g-col-12 g-col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="perspective_start_end_date"
                        data-i18n="Start/End Date"
                        data-translate="page.scorecard.scorecardItems.startEndDate"
                      >
                        Start/End Date
                      </label>
                      <input
                        type="text"
                        className="form-control browser-default date_pickers"
                        data-range="true"
                        data-multiple-dates-separator=" - "
                        data-language="en"
                        id="perspective_start_end_date"
                        name="perspective_start_end_date"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="g-col-12">
                    <div className="form-group">
                      <label
                        htmlFor="custom_perspective"
                        data-i18n="Performance"
                        data-translate="page.scorecard.scorecardItems.performance"
                      >
                        Performance
                      </label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control browser-default"
                          name="custom_perspective"
                          id="custom_perspective"
                          readOnly
                          data-toggle="modal"
                        />

                        <button
                          className="btn btn-label-secondary"
                          type="button"
                          id="button-addon2"
                          data-toggle="modal"
                          data-target=".perspective_custom_threshold_popup"
                          onClick={() => {
                            if (window.handleCustomThresholdEvent)
                              window.handleCustomThresholdEvent('PERSPECTIVE');
                          }}
                          data-translate="page.scorecard.scorecardItems.calculator"
                        >
                          Calculator
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="g-col-12 g-col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor="perspective_weight"
                        data-i18n="Weight(%)"
                        data-translate="page.scorecard.scorecardItems.weight"
                      >
                        Weight(%)
                      </label>{' '}
                      <input
                        type="text"
                        className="form-control browser-default"
                        name="perspective_weight"
                        id="perspective_weight"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="g-col-12 g-col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor="perspective_sub_weight"
                        data-i18n="Sub Weight(%)"
                        data-translate="page.scorecard.scorecardItems.subWeight"
                      >
                        Sub Weight(%)
                      </label>
                      <input
                        type="text"
                        className="form-control browser-default"
                        name="perspective_sub_weight"
                        id="perspective_sub_weight"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="g-col-12 g-col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor="perspective_status"
                        data-i18n="Status"
                        data-translate="page.scorecard.scorecardItems.status"
                      >
                        Status
                      </label>{' '}
                      <select
                        name="perspective_status"
                        id="perspective_status"
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

                    <input type="hidden" name="createdById" id="createdById" defaultValue="" />
                    <input type="hidden" name="action" defaultValue="" />
                    <input type="hidden" name="defaultscr" defaultValue="" />
                    <input type="hidden" name="scorecardweight" defaultValue="" />
                    <input type="hidden" name="scoreCardDetailsId" id="scoreCardDetailsId" defaultValue="" />
                    <input type="hidden" name="scorecardFormula" id="perspectivescorecardFormula" defaultValue="" />
                    <input type="hidden" name="perspectiveId" id="perspectiveId" defaultValue="" />
                    <input type="hidden" name="perspectiveheader3" id="perspectiveheader3" defaultValue="" />
                    <input type="hidden" id="perspectivecustomreportee" defaultValue="" />
                    <input type="hidden" name="perspectiveheader4" id="perspectiveheader4" defaultValue="" />
                    <input type="hidden" name="perspectiveheader5" id="perspectiveheader5" defaultValue="" />
                    <input type="hidden" name="perspectiveheader6" id="perspectiveheader6" defaultValue="" />
                    <input type="hidden" name="perspectiveheader7" id="perspectiveheader7" defaultValue="" />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-label-secondary btn-default1 btn"
                  data-i18n="Cancel"
                  data-dismiss="modal"
                  aria-label="Close"
                  data-translate="page.scorecard.scorecardItems.cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary initative_save_btn"
                  data-i18n="Save"
                  data-translate="page.scorecard.scorecardItems.save"
                  value="Save"
                >
                  Save
                </button>
                <div className="modal-audit">
                  <div className="audit-listing">
                    <div className="audit-box">
                      <div className="title" data-translate="page.scorecard.audit.createdBy">
                        Created By :
                      </div>
                      <div className="text">
                        <span id="createdBy"></span>
                      </div>
                    </div>
                    <div className="audit-box">
                      <div className="title" data-translate="page.scorecard.audit.lastModifiedBy">
                        Modified By :
                      </div>
                      <div className="text">
                        <span id="updatedBy"></span>
                      </div>
                    </div>
                    <div className="audit-box">
                      <div className="title" data-translate="page.scorecard.audit.createdOn">
                        Created Date :
                      </div>
                      <div className="text">
                        <span id="createdByDate"></span>
                      </div>
                    </div>
                    <div className="audit-box">
                      <div className="title" data-translate="page.scorecard.audit.lastModifiedOn">
                        Modified Date :
                      </div>
                      <div className="text">
                        <span id="updatedByDate"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerspectiveModal;
