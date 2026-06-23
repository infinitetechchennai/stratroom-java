import React from 'react';

const KpiModal = () => {
  return (
    <div
      className="modal custom-modal fade kpi_description_popup"
      id="kpi-add-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="Add KPI"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title kpiHeader">Add KPI</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form id="kpiForm">
              <div className="card custom-card border-0">
                <div className="card-body">
                  <div className="grid gap-3">
                    <div className="g-col-12 g-col-md-8" style={{ display: 'none' }}>
                      <div className="form-group">
                        <label htmlFor="kpi_display_id" className="form-label">
                          ID
                        </label>
                        <input
                          type="text"
                          className="form-control browser-default"
                          name="kpi_display_id"
                          id="kpi_display_id"
                          placeholder=""
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="g-col-12 g-col-md-8">
                      <div className="form-group">
                        <label htmlFor="kpi_name" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control browser-default"
                          name="kpi_name"
                          id="kpi_name"
                          placeholder=""
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="g-col-12 g-col-md-4">
                      <div className="form-group">
                        <label htmlFor="kpi_type" data-i18n="Polarity">
                          Polarity
                        </label>
                        <select
                          id="kpi_type"
                          name="kpi_type"
                          className="form-control browser-default"
                          defaultValue=""
                        >
                          <option value="" data-i18n="Choose">
                            Choose
                          </option>
                          <option value="Lead" data-i18n="Lead">
                            Lead
                          </option>
                          <option value="Lag" data-i18n="Lag">
                            Lag
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="g-col-12">
                      <div className="form-group">
                        <label htmlFor="kpi_description" className="form-label">
                          Description
                        </label>
                        <textarea
                          className="form-control browser-default"
                          name="kpi_description"
                          id="kpi_description"
                          placeholder=""
                          cols=""
                          rows="6"
                          autoComplete="off"
                        ></textarea>
                      </div>
                    </div>
                    <div className="g-col-12 g-col-md-4">
                      <div className="form-group">
                        <label htmlFor="kpi_measurement" className="form-label">
                          Measurement Frequency
                        </label>
                        <select
                          id="kpi_measurement"
                          name="kpi_measurement"
                          className="form-control mt-1"
                          defaultValue=""
                        >
                          <option value="" data-i18n="Choose">
                            Choose
                          </option>
                          <option value="Monthly" data-i18n="Monthly">
                            Monthly
                          </option>
                          <option value="Quarterly" data-i18n="Quarterly">
                            Quarterly
                          </option>
                          <option value="Half Yearly" data-i18n="Half Yearly">
                            Half Yearly
                          </option>
                          <option value="Annually" data-i18n="Annually">
                            Annually
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="g-col-12 g-col-md-4">
                      <div className="form-group">
                        <label htmlFor="kpi_owner" className="form-label">
                          Owner
                        </label>
                        <select
                          id="kpi_owner"
                          name="kpi_owner"
                          className="form-control mt-1"
                          style={{ display: 'block !important' }}
                        ></select>
                      </div>
                    </div>
                    <div className="g-col-12 g-col-md-4">
                      <div className="form-group">
                        <label htmlFor="kpi_datasource" className="form-label">
                          Data Source
                        </label>
                        <select
                          id="kpi_datasource"
                          name="kpi_datasource"
                          className="form-control mt-1"
                          defaultValue="Choose"
                        >
                          <option data-i18n="Choose" value="Choose">
                            Choose
                          </option>
                          <option value="Manual" data-i18n="Manual">
                            Manual
                          </option>
                          <option value="Source" data-i18n="Source">
                            Source
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="g-col-12 g-col-md-6 kpiactualdisplay">
                      <div className="form-group">
                        <label htmlFor="ekpiActual" className="form-label">
                          Actual
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control kpi_formula"
                            id="ekpiActual"
                            aria-label=""
                            aria-describedby="button-addon2"
                            name="kpi_formula"
                            readOnly
                          />
                          <button
                            className="btn btn-label-secondary kpi_trigger"
                            type="button"
                            id="button-addon2"
                            data-bs-toggle="modal"
                            data-bs-target=".kpi_formula_popup"
                            onClick={() => { window._kpiCalcCallerModalId = 'kpi-add-modal'; 
                              if (window.handleFormulaEvent) window.handleFormulaEvent('KPI');
                             }}
                          >
                            KPI Calculator
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="g-col-12 g-col-md-6">
                      <div className="form-group">
                        <label htmlFor="kpi_performance" className="form-label">
                          Performance
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            name="kpi_performance"
                            id="kpi_performance"
                            placeholder="Performance"
                            aria-label="Performance"
                            aria-describedby="kpi-performance-button"
                            readOnly
                            autoComplete="off"
                          />
                          <button
                            className="btn btn-label-secondary"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target=".kpi_performanceformula_popup"
                            onClick={() => { window._kpiCalcCallerModalId = 'kpi-add-modal'; 
                              if (window.handleFormulaEvent)
                                window.handleFormulaEvent('KPIPERFORMANCE');
                             }}
                          >
                            Performance Calculator
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="g-col-12 g-col-md-6 form-row">
                      <div className="form-group kpiytdElement">
                        <label htmlFor="ekpiYearToDate" className="form-label">
                          Year To Date (YTD)
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control kpiYtdFormula"
                            name="kpiYtdFormula"
                            id="ekpiYearToDate"
                            placeholder="Year To Date (YTD)"
                            aria-label=""
                            aria-describedby="button-addon2"
                            readOnly
                          />
                          <button
                            className="btn btn-label-secondary"
                            type="button"
                            id="button-addon2"
                            data-bs-toggle="modal"
                            data-bs-target=".kpiYtdFormulaPoPUp"
                            onClick={() => { window._kpiCalcCallerModalId = 'kpi-add-modal'; 
                              if (window.handleYTDFormulaEvent) window.handleYTDFormulaEvent();
                             }}
                          >
                            YTD Calculator
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="g-col-12 g-col-md-6">
                      <div className="form-group">
                        <label htmlFor="kpiDataType" className="form-label">
                          KPI Type
                        </label>
                        <select
                          id="kpiDataType"
                          name="kpiDataType"
                          className="form-control browser-default"
                          defaultValue=""
                        >
                          <option value="" data-i18n="Choose">
                            Choose
                          </option>
                          <option value="Number" data-i18n="Number">
                            Number
                          </option>
                          <option value="Percentage" data-i18n="Percentage">
                            Percentage
                          </option>
                          <option value="Currency" data-i18n="Currency">
                            Currency
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="g-col-12 g-col-md-6">
                      <div className="form-group">
                        <label htmlFor="kpiCurrencyvalue" className="form-label">
                          KPI Currency
                        </label>
                        <input
                          type="text"
                          className="form-control browser-default"
                          name="kpiCurrencyvalue"
                          id="kpiCurrencyvalue"
                          autoComplete="off"
                        />
                      </div>
                    </div>

                    <div className="g-col-12">
                      <div className="form-group">
                        <label htmlFor="kpi_threshold" data-i18n="Threshold">
                          Threshold
                        </label>
                        <div className="grid gap-3">
                          <div className="g-col-12">
                            <input
                              type="text"
                              id="kpi_threshold"
                              className="form-control browser-default"
                              name="kpi_threshold"
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="g-col-12 mt-2">
                          <div className="color-pickers">
                            <div className="scorecard-color-pickers">
                              <div
                                className="form-group col-md-3 color_picks_2 color_picks_3 color_picks_5 me-2"
                                style={{ display: 'none' }}
                              >
                                <div
                                  className="input-group m-t-24"
                                  style={{
                                    width: '90%',
                                    display: 'flex',
                                    alignItems: 'stretch',
                                  }}
                                >
                                  <input
                                    id="optioncolor1"
                                    type="text"
                                    className="form-control browser-default"
                                    style={{ flex: '0 0 90%', width: '90%', height: '100%' }}
                                  />
                                  <div
                                    className="input-group-append"
                                    style={{ display: 'flex', flex: '0 0 10%', width: '10%' }}
                                  >
                                    <span
                                      className="input-group-text"
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}
                                    ></span>
                                  </div>
                                </div>
                              </div>

                              <div
                                className="form-group col-md-3 color_picks_2 color_picks_3 color_picks_5 me-2"
                                style={{ display: 'none' }}
                              >
                                <div
                                  className="input-group m-t-24"
                                  style={{
                                    width: '90%',
                                    display: 'flex',
                                    alignItems: 'stretch',
                                  }}
                                >
                                  <input
                                    id="optioncolor2"
                                    type="text"
                                    className="form-control browser-default"
                                    style={{ flex: '0 0 90%', width: '90%', height: '100%' }}
                                  />
                                  <div
                                    className="input-group-append"
                                    style={{ display: 'flex', flex: '0 0 10%', width: '10%' }}
                                  >
                                    <span
                                      className="input-group-text"
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}
                                    ></span>
                                  </div>
                                </div>
                              </div>

                              <div
                                className="form-group col-md-3 color_picks_3 color_picks_5 me-2"
                                style={{ display: 'none' }}
                              >
                                <div
                                  className="input-group m-t-24"
                                  style={{
                                    width: '90%',
                                    display: 'flex',
                                    alignItems: 'stretch',
                                  }}
                                >
                                  <input
                                    id="optioncolor3"
                                    type="text"
                                    className="form-control browser-default"
                                    style={{ flex: '0 0 90%', width: '90%', height: '100%' }}
                                  />
                                  <div
                                    className="input-group-append"
                                    style={{ display: 'flex', flex: '0 0 10%', width: '10%' }}
                                  >
                                    <span
                                      className="input-group-text"
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}
                                    ></span>
                                  </div>
                                </div>
                              </div>

                              <div
                                className="form-group col-md-3 color_picks_5 me-2"
                                style={{ display: 'none' }}
                              >
                                <div
                                  className="input-group m-t-24"
                                  style={{
                                    width: '90%',
                                    display: 'flex',
                                    alignItems: 'stretch',
                                  }}
                                >
                                  <input
                                    id="optioncolor4"
                                    type="text"
                                    className="form-control browser-default"
                                    style={{ flex: '0 0 90%', width: '90%', height: '100%' }}
                                  />
                                  <div
                                    className="input-group-append"
                                    style={{ display: 'flex', flex: '0 0 10%', width: '10%' }}
                                  >
                                    <span
                                      className="input-group-text"
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}
                                    ></span>
                                  </div>
                                </div>
                              </div>

                              <div
                                className="form-group col-md-3 color_picks_5 me-2"
                                style={{ display: 'none' }}
                              >
                                <div
                                  className="input-group m-t-24"
                                  style={{
                                    width: '90%',
                                    display: 'flex',
                                    alignItems: 'stretch',
                                  }}
                                >
                                  <input
                                    id="optioncolor5"
                                    type="text"
                                    className="form-control browser-default"
                                    style={{ flex: '0 0 90%', width: '90%', height: '100%' }}
                                  />
                                  <div
                                    className="input-group-append"
                                    style={{ display: 'flex', flex: '0 0 10%', width: '10%' }}
                                  >
                                    <span
                                      className="input-group-text"
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}
                                    ></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                      <div className="form-group">
                        <label htmlFor="kpi_start_end_date" className="form-label">
                          Start/End Date
                        </label>
                        <input
                          type="text"
                          className="form-control browser-default datepicker-here date_pickers"
                          data-range="true"
                          data-multiple-dates-separator=" - "
                          data-language="en"
                          id="kpi_start_end_date"
                          name="kpi_start_end_date"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                      <div className="form-group">
                        <label htmlFor="kpi_contribution" className="form-label">
                          Contribution(%)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="kpi_contribution"
                          id="kpi_contribution"
                        />
                      </div>
                    </div>
                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                      <div className="form-group">
                        <label htmlFor="kpi_weight" className="form-label">
                          Weight (%)
                        </label>
                        <input
                          type="text"
                          className="form-control browser-default"
                          name="kpi_weight"
                          id="kpi_weight"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                      <div className="form-group">
                        <label htmlFor="kpi_sub_weight" className="form-label">
                          Sub Weight (%)
                        </label>
                        <input
                          type="text"
                          className="form-control browser-default"
                          name="kpi_sub_weight"
                          id="kpi_sub_weight"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                      <div className="form-group">
                        <label htmlFor="inputState" className="form-label">
                          Status
                        </label>
                        <select
                          id="inputState"
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
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-label-secondary"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Cancel
                </button>
                <button className="btn btn-primary initative_save_btn" value="Save">
                  Save
                </button>
              </div>

              <input type="hidden" name="action" defaultValue="" />
              <input type="hidden" name="objectiveId" defaultValue="" />
              <input type="hidden" name="kpi_id" id="kpi_id" defaultValue="" />
              <input type="hidden" name="kpiCreatedById" id="kpiCreatedById" defaultValue="" />
              <input type="hidden" name="kpiFieldName" id="kpiFieldName" />
              <input type="hidden" name="performanceFieldName" id="performanceFieldName" />
              <input type="hidden" name="includeReportees" id="includeReportees" defaultValue="" />
              <input type="hidden" name="customreportee" id="customreportee" defaultValue="" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiModal;
