import React from 'react';

const SubKpiModal = () => {
  return (
    <>
      {/* sub kpi add new design */}
      <div
        className="modal custom-modal fade kpi_setting subkpi_description_popup"
        id="subkpi-add-modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="Add Sub Kpi"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title subKpiHeaderText" data-translate="page.scorecard.addSubKPI">
                Add Sub KPI
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="subkpiForm">
                <div className="card custom-card border-0">
                  <div className="card-body">
                    <div className="grid gap-3">
                      <div className="g-col-12 g-col-md-8">
                        <div className="form-group">
                          <label htmlFor="subkpi_display_id" className="form-label">
                            KPI ID
                          </label>
                          <input
                            type="text"
                            className="form-control browser-default"
                            name="subkpi_display_id"
                            id="subkpi_display_id"
                            placeholder=""
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="g-col-12 g-col-md-8">
                        <div className="form-group">
                          <label
                            htmlFor="subkpi_name"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.name"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control browser-default"
                            name="subkpi_name"
                            id="subkpi_name"
                            placeholder=""
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="g-col-12 g-col-md-4">
                        <div className="form-group">
                          <label
                            htmlFor="subkpi_type"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.polarity"
                          >
                            Polarity
                          </label>
                          <select
                            id="subkpi_type"
                            name="subkpi_type"
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
                          <label
                            htmlFor="subkpi_description"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.description"
                          >
                            Description
                          </label>
                          <textarea
                            className="form-control browser-default"
                            name="subkpi_description"
                            id="subkpi_description"
                            placeholder=""
                            cols=""
                            rows="6"
                            autoComplete="off"
                          ></textarea>
                        </div>
                      </div>
                      <div className="g-col-12 g-col-md-4">
                        <div className="form-group">
                          <label
                            htmlFor="subkpi_measurement"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.measurementFrequency"
                          >
                            Measurement Frequency
                          </label>
                          <select
                            id="subkpi_measurement"
                            name="subkpi_measurement"
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
                          <label
                            htmlFor="subkpi_owner"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.owner"
                          >
                            Owner
                          </label>
                          <select
                            id="subkpi_owner"
                            name="subkpi_owner"
                            className="form-control mt-1"
                            style={{ display: 'block !important' }}
                          ></select>
                        </div>
                      </div>
                      <div className="g-col-12 g-col-md-4">
                        <div className="form-group">
                          <label
                            htmlFor="subkpi_datasource"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.dataSource"
                          >
                            Data Source
                          </label>
                          <select
                            id="subkpi_datasource"
                            name="subkpi_datasource"
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

                      <div className="g-col-12">
                        <div className="form-group">
                          <label
                            htmlFor="subkpi_performance"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.performance"
                          >
                            Performance
                          </label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              name="subkpi_performance"
                              id="subkpi_performance"
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
                              onClick={() => {
                                if (window.handleFormulaEvent) window.handleFormulaEvent('KPIPERFORMANCE');
                              }}
                              data-translate="page.scorecard.scorecardItems.kpiCalculator"
                            >
                              KPI Calculator
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="g-col-12 g-col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="subkpiDataType"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.kpiType"
                          >
                            KPI Type
                          </label>
                          <select
                            id="subkpiDataType"
                            name="subkpiDataType"
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
                          <label
                            htmlFor="subkpiCurrencyvalue"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.kpiType"
                          >
                            KPI Currency
                          </label>
                          <input
                            type="text"
                            className="form-control browser-default"
                            name="subkpiCurrencyvalue"
                            id="subkpiCurrencyvalue"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="g-col-12">
                        <div className="form-group">
                          <label
                            htmlFor="subkpi_threshold"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.threshold"
                          >
                            Threshold
                          </label>
                          <div className="grid gap-3">
                            <div className="g-col-12">
                              <input
                                type="text"
                                id="subkpi_threshold"
                                className="form-control browser-default"
                                name="subkpi_threshold"
                                readOnly
                              />
                            </div>
                            <div className="g-col-12">
                              <div className="color-pickers">
                                <div className="scorecard-color-pickers">
                                  <div className="input-group">
                                    <input id="option1color1" type="text" className="form-control" />
                                    <span
                                      className="input-group-text pickr"
                                      id="p-1"
                                      role="button"
                                      aria-label="threshold"
                                    ></span>
                                  </div>
                                  <div className="input-group">
                                    <input id="option1color12" type="text" className="form-control" />
                                    <span
                                      className="input-group-text pickr"
                                      id="p-2"
                                      role="button"
                                      aria-label="threshold"
                                    ></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="g-col-12 g-col-md-6 g-col-lg-3">
                        <div className="form-group">
                          <label
                            htmlFor="subkpi_start_end_date"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.startEndDate"
                          >
                            Start/End Date
                          </label>
                          <input
                            type="text"
                            className="form-control browser-default datepicker-here date_pickers"
                            data-range="true"
                            data-multiple-dates-separator=" - "
                            data-language="en"
                            id="subkpi_start_end_date"
                            name="subkpi_start_end_date"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="g-col-12 g-col-md-6 g-col-lg-3">
                        <div className="form-group">
                          <label
                            htmlFor="subkpi_contribution"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.contribution"
                          >
                            Contribution(%)
                          </label>
                          <input
                            type="text"
                            className="form-control browser-default"
                            name="subkpi_contribution"
                            id="subkpi_contribution"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="g-col-12 g-col-md-6 g-col-lg-3">
                        <div className="form-group">
                          <label
                            htmlFor="subkpi_weight"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.weight"
                          >
                            Weight (%)
                          </label>
                          <input
                            type="text"
                            className="form-control browser-default"
                            name="subkpi_weight"
                            id="subkpi_weight"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="g-col-12 g-col-md-6 g-col-lg-3">
                        <div className="form-group">
                          <label
                            htmlFor="subkpi_sub_weight"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.subWeight"
                          >
                            Sub Weight (%)
                          </label>
                          <input
                            type="text"
                            className="form-control browser-default"
                            name="subkpi_sub_weight"
                            id="subkpi_sub_weight"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="g-col-12 g-col-md-6 g-col-lg-3">
                        <div className="form-group">
                          <label
                            htmlFor="subkpiinputState"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.status"
                          >
                            Status
                          </label>
                          <select
                            id="subkpiinputState"
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
                <hr />
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-label-secondary"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    data-translate="page.scorecard.scorecardItems.cancel"
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary initative_save_btn"
                    value="Save"
                    onClick={(e) => {
                      if (window.handleSubKpiSave) window.handleSubKpiSave(e);
                    }}
                    data-translate="page.scorecard.scorecardItems.save"
                  >
                    Save
                  </button>
                </div>

                <input type="hidden" name="sub" defaultValue="" />
                <input type="hidden" name="action" defaultValue="" />
                <input type="hidden" name="subobjectiveId" defaultValue="" />
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

      {/* update subkpi edit pop up new design */}
      <div
        className="modal custom-modal fade kpi_setting updateSubkpi_description_popup"
        id="subkpi-add-modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="Add Sub Kpi"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title subKpiHeaderText">Add Sub Kpi</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="editSubkpiForm">
                <div className="card custom-card border-0">
                  <div className="card-body">
                    <div className="grid gap-3">
                      <div className="g-col-12 g-col-md-8">
                        <div className="form-group">
                          <label
                            htmlFor="editsubkpi_display_id"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.id"
                          >
                            KPI ID
                          </label>
                          <input
                            type="text"
                            className="form-control browser-default"
                            name="editsubkpi_display_id"
                            id="editsubkpi_display_id"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <input
                        className="form-control browser-default"
                        name="subKpi_display_id"
                        id="subKpi_display_id"
                        type="hidden"
                        placeholder=""
                      />
                      <input
                        className="form-control browser-default"
                        name="subKpi_id"
                        id="subKpi_id"
                        type="hidden"
                        placeholder=""
                      />
                      <div className="g-col-12 g-col-md-8">
                        <div className="form-group">
                          <label
                            htmlFor="editsubkpi_name"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.name"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control browser-default"
                            name="editsubkpi_name"
                            id="editsubkpi_name"
                            placeholder=""
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="g-col-12 g-col-md-4">
                        <div className="form-group">
                          <label
                            htmlFor="editsubkpi_type"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.polarity"
                          >
                            Polarity
                          </label>
                          <select
                            id="editsubkpi_type"
                            name="editsubkpi_type"
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
                          <label
                            htmlFor="editsubkpi_description"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.description"
                          >
                            Description
                          </label>
                          <textarea
                            className="form-control browser-default"
                            name="editsubkpi_description"
                            id="editsubkpi_description"
                            placeholder=""
                            cols=""
                            rows="6"
                            autoComplete="off"
                          ></textarea>
                        </div>
                      </div>
                      <div className="g-col-12 g-col-md-4">
                        <div className="form-group">
                          <label
                            htmlFor="editsubkpi_measurement"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.measurementFrequency"
                          >
                            Measurement Frequency
                          </label>
                          <select
                            id="editsubkpi_measurement"
                            name="editsubkpi_measurement"
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
                          <label
                            htmlFor="editsubkpi_owner"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.owner"
                          >
                            Owner
                          </label>
                          <select
                            id="editsubkpi_owner"
                            name="editsubkpi_owner"
                            className="form-control mt-1"
                            style={{ display: 'block !important' }}
                          ></select>
                        </div>
                      </div>
                      <div className="g-col-12 g-col-md-4">
                        <div className="form-group">
                          <label
                            htmlFor="editsubkpi_datasource"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.dataSource"
                          >
                            Data Source
                          </label>
                          <select
                            id="editsubkpi_datasource"
                            name="editsubkpi_datasource"
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

                      <div className="g-col-12 g-col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="ekpiActual"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.actual"
                          >
                            Actual
                          </label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              id="ekpiActual"
                              placeholder="Actual"
                              aria-label=""
                              aria-describedby="button-addon2"
                              name="kpi_formula"
                            />
                            <button
                              className="btn btn-label-secondary"
                              type="button"
                              id="button-addon2"
                              data-bs-toggle="modal"
                              data-bs-target=".kpi_formula_popup"
                              onClick={() => {
                                if (window.handleFormulaEvent) window.handleFormulaEvent('KPI');
                              }}
                              data-translate="page.scorecard.scorecardItems.kpiCalculator"
                            >
                              KPI Calculator
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="g-col-12 g-col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="editsubkpi_performance"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.performance"
                          >
                            Performance
                          </label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              name="editsubkpi_performance"
                              id="editsubkpi_performance"
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
                              data-bs-target="#kpi_performanceformula_popup"
                              onClick={() => {
                                if (window.handleFormulaEvent)
                                  window.handleFormulaEvent('KPIPERFORMANCE');
                              }}
                              data-translate="page.scorecard.scorecardItems.kpiCalculator"
                            >
                              KPI Calculator
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="g-col-12 g-col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="eskpiYearToDate"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.kpiCalculator"
                          >
                            Year To Date (YTD)
                          </label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              id="eskpiYearToDate"
                              placeholder="Year To Date (YTD)"
                              aria-label=""
                              aria-describedby="button-addon2"
                              name="kpiYtdFormula"
                              readOnly
                            />
                            <button
                              className="btn btn-label-secondary"
                              type="button"
                              id="button-addon2"
                              data-bs-toggle="modal"
                              data-bs-target=".kpiYtdFormulaPoPUp"
                              onClick={() => {
                                if (window.handleYTDFormulaEvent) window.handleYTDFormulaEvent();
                              }}
                              data-translate="page.scorecard.scorecardItems.kpiCalculator"
                            >
                              YTD Calculator
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="g-col-12 g-col-md-6">
                        <div className="form-group">
                          <label
                            htmlFor="editsubkpiDataType"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.kpiType"
                          >
                            KPI Type
                          </label>
                          <select
                            id="editsubkpiDataType"
                            name="subkpiDataType"
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
                            <option
                              value="Currency"
                              data-i18n="Currency"
                              data-translate="page.scorecard.scorecardItems.kpiType"
                            >
                              Currency
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="g-col-12 g-col-md-6">
                        <div className="form-group">
                          <label htmlFor="editsubkpiCurrencyvalue" className="form-label">
                            KPI Currency
                          </label>
                          <input
                            type="text"
                            className="form-control browser-default"
                            name="editsubkpiCurrencyvalue"
                            id="editsubkpiCurrencyvalue"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="g-col-12">
                        <div className="form-group">
                          <label
                            htmlFor="editkpi_threshold"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.threshold"
                          >
                            Threshold
                          </label>
                          <input
                            type="text"
                            id="editkpi_threshold"
                            className="form-control browser-default"
                            name="editkpi_threshold"
                            readOnly
                          />
                        </div>
                        <div className="g-col-12" style={{ marginTop: '15px' }}>
                          <div className="color-pickers">
                            <div className="scorecard-color-pickers">
                              <div className="input-group">
                                <input id="option1color1" type="text" className="form-control" />
                                <span
                                  className="input-group-text pickr"
                                  id="p-1"
                                  role="button"
                                  aria-label="threshold"
                                ></span>
                              </div>
                              <div className="input-group">
                                <input id="option1color12" type="text" className="form-control" />
                                <span
                                  className="input-group-text pickr"
                                  id="p-2"
                                  role="button"
                                  aria-label="threshold"
                                ></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="g-col-12 g-col-md-6 g-col-lg-3">
                        <div className="form-group">
                          <label
                            htmlFor="editsubkpi_start_end_date"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.startEndDate"
                          >
                            Start/End Date
                          </label>
                          <input
                            type="text"
                            className="form-control browser-default datepicker-here date_pickers"
                            data-range="true"
                            data-multiple-dates-separator=" - "
                            data-language="en"
                            id="editsubkpi_start_end_date"
                            name="editsubkpi_start_end_date"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="g-col-12 g-col-md-6 g-col-lg-3">
                        <div className="form-group">
                          <label
                            htmlFor="editsubkpi_weight"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.weight"
                          >
                            Weight (%)
                          </label>
                          <input
                            type="text"
                            className="form-control browser-default"
                            name="editsubkpi_weight"
                            id="editsubkpi_weight"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="g-col-12 g-col-md-6 g-col-lg-3">
                        <div className="form-group">
                          <label
                            htmlFor="editsubkpi_sub_weight"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.subWeight"
                          >
                            Sub Weight (%)
                          </label>
                          <input
                            type="text"
                            className="form-control browser-default"
                            name="editsubkpi_sub_weight"
                            id="editsubkpi_sub_weight"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="g-col-12 g-col-md-6 g-col-lg-3">
                        <div className="form-group">
                          <label
                            htmlFor="editsubkpiinputState"
                            className="form-label"
                            data-translate="page.scorecard.scorecardItems.status"
                          >
                            Status
                          </label>
                          <select
                            id="editsubkpiinputState"
                            className="form-control browser-default"
                            defaultValue=""
                          >
                            <option value="" data-i18n="Choose">
                              Choose
                            </option>
                            <option value="Manual" data-i18n="Manual">
                              Manual
                            </option>
                            <option value="Weighted">Weighted</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-label-secondary"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    data-translate="page.scorecard.scorecardItems.cancel"
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary initative_save_btn"
                    value="Save"
                    onClick={(e) => {
                      if (window.handleUpdateSubKpiSave) window.handleUpdateSubKpiSave(e);
                    }}
                    data-translate="page.scorecard.scorecardItems.save"
                  >
                    Save
                  </button>
                </div>

                <input type="hidden" name="sub" defaultValue="" />
                <input type="hidden" name="action" defaultValue="" />
                <input type="hidden" name="editobjectiveId" defaultValue="" />
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
    </>
  );
};

export default SubKpiModal;
