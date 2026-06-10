<!-- <div class="modal fade kpi_description_popup" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content modal-content-setscrollheight">
      <div class="modal-header">
        <h4 class="modal-title">Add KPI</h4>
        <button type="button" id="closeKpimodal" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="kpiForm" style="display: none">
          <div class="form-row">
            <div class="form-group col-md-2" id="kpi_id_wrapper" style="display: none">
              <label for="kpi_id" data-i18n="ID">ID</label>
              <input type="text" class="form-control browser-default" name="kpi_display_id" id="kpi_display_id"
                placeholder="" readonly />
            </div>
            <div class="form-group col-md-8">
              <label for="kpi_name" data-i18n="Name">Nameee</label>
              <input type="text" class="form-control browser-default" name="kpi_name" id="kpi_name" placeholder=""
                autocomplete="off" />
            </div>
            <div class="form-group col-md-2">
              <label for="objective_start_end_date" data-i18n="Polarity">Polarity</label>
              <select id="kpi_type" name="kpi_type" class="form-control browser-default">
                <option value="" data-i18n="Choose">Choose</option>
                <option value="Lead" data-i18n="Lead">Lead</option>
                <option value="Lag" data-i18n="Lag">Lag</option>
              </select>
            </div>
          </div>
          <hr />
          <div class="form-row">
            <div class="form-group mt--10">
              <label for="kpi_description">Description</label>
              <textarea class="form-control browser-default" name="kpi_description" id="kpi_description" placeholder=""
                cols="" rows="6" autocomplete="off"></textarea>
            </div>
          </div>
          <hr />
          <div class="form-row">
            <div class="form-group browser-default col-md-4">
              <label for="kpi_measurement" data-i18n="Measurement Frequency">Measurement Frequency</label>
              <select id="kpi_measurement" name="kpi_measurement" class="form-control mt-1">
                <option value="" data-i18n="Choose">Choose</option>
                <option value="Monthly" data-i18n="Monthly">Monthly</option>
                <option value="Quarterly" data-i18n="Quarterly">
                  Quarterly
                </option>
                <option value="Half Yearly" data-i18n="Half Yearly">
                  Half Yearly
                </option>
                <option value="Annually" data-i18n="Annually">Annually</option>
              </select>
            </div>
            <div class="form-group browser-default col-md-4">
              <label for="kpi_owner">Owner</label>
              <select id="kpi_owner" name="kpi_owner" class="form-control mt-1"
                style="display: block !important"></select>
            </div>
            <div class="form-group browser-default col-md-4">
              <label for="kpi_datasource" data-i18n="Data Source">Data Source</label>
              <select id="kpi_datasource" name="kpi_datasource" class="form-control mt-1">
                <option data-i18n="Choose">Choose</option>
                <option value="Manual" data-i18n="Manual">Manual</option>
                <option value="Source" data-i18n="Source">Source</option>
              </select>
            </div>
          </div>
          <hr />

          <div class="form-row kpiactualdisplay">
            <div class="form-group col-md-12">
              <label for="inputState" data-i18n="Actual">Actual</label>
              <input type="text" class="form-control browser-default kpi_formula" name="kpi_formula" id="" readonly />
              <a href="#" class="kpi_trigger" data-toggle="modal" data-target=".kpi_formula_popup"
                onclick="handleFormulaEvent('KPI')"></a>
            </div>
          </div>
          <hr class="kpiactualdisplay" />
          <div class="form-row kpiperformanceElement">
            <div class="form-group col-md-12">
              <label for="obj_custom_objective" data-i18n="Performance">Performance</label>
              <input type="text" class="form-control browser-default" name="kpi_performance" id="kpi_performance"
                readonly="readonly" autocomplete="off" data-toggle="modal" data-target=".kpi_performanceformula_popup"
                onclick='handleFormulaEvent("KPIPERFORMANCE")' />
            </div>
          </div>
          <hr class="kpiperformanceElement" />

          <div class="form-row">
            <div class="form-group col-md-6 kpiytdElement">
              <label for="inputState" data-i18n="Year To Date(YTD)">Year To Date (YTD)</label>

              <input type="text" class="form-control browser-default kpiYtdFormula" name="kpiYtdFormula" id=""
                autocomplete="off" readonly /><a href="#" class="kpiYtdFormulaTrigger" data-toggle="modal"
                data-target=".kpiYtdFormulaPoPUp" onclick="handleYTDFormulaEvent()"></a>
            </div>
            <div class="form-group col-md-3 kpikpitypedisplay">
              <label for="kpiDataType" data-i18n="Kpi Type">KPI Type</label>
              <select id="kpiDataType" name="kpiDataType" class="form-control browser-default">
                <option value="" data-i18n="Choose">Choose</option>
                <option value="Number" data-i18n="Number">Number</option>
                <option value="Percentage" data-i18n="Percentage">
                  Percentage
                </option>
                <option value="Currency" data-i18n="Currency">Currency</option>
              </select>
            </div>
            <div class="form-group col-md-3 kpiCurrencyfield" style="display: none">
              <label for="inputState" data-i18n="Kpi Currency">KPI Currency</label>
              <input type="text" class="form-control browser-default" name="kpiCurrencyvalue" id="kpiCurrencyvalue"
                autocomplete="off" />
            </div>
          </div>
          <hr />
          <div class="form-row">
            <div class="form-group col-md-3">
              <label for="kpi_threshold" data-i18n="Threshold">Threshold</label>
              <input type="text" id="kpi_threshold" class="form-control browser-default" name="kpi_threshold"
                readonly />
            </div>

            <div class="form-group col-md-3 color_picks_2 color_picks_3 color_picks_5" style="display: none">
              <div class="input-group m-t-24" style="width: 90%">
                <input id="optioncolor1" type="text" class="form-control browser-default" />
                <div class="input-group-append">
                  <span class="input-group-text"></span>
                </div>
              </div>
            </div>

            <div class="form-group col-md-3 color_picks_2 color_picks_3 color_picks_5" style="display: none">
              <div class="input-group m-t-24" style="width: 90%">
                <input id="optioncolor2" type="text" class="form-control browser-default" />
                <div class="input-group-append">
                  <span class="input-group-text"></span>
                </div>
              </div>
            </div>

            <div class="form-group col-md-3 color_picks_3 color_picks_5" style="display: none">
              <div class="input-group m-t-24" style="width: 90%">
                <input id="optioncolor3" type="text" class="form-control browser-default" />
                <div class="input-group-append">
                  <span class="input-group-text"></span>
                </div>
              </div>
            </div>

            <div class="form-group col-md-3 color_picks_5" style="display: none">
              <div class="input-group m-t-24" style="width: 90%">
                <input id="optioncolor4" type="text" class="form-control browser-default" />
                <div class="input-group-append">
                  <span class="input-group-text"></span>
                </div>
              </div>
            </div>

            <div class="form-group col-md-3 color_picks_5" style="display: none">
              <div class="input-group m-t-24" style="width: 90%">
                <input id="optioncolor5" type="text" class="form-control browser-default" />
                <div class="input-group-append">
                  <span class="input-group-text"></span>
                </div>
              </div>
            </div>
          </div>
          <hr />

          <div class="form-row">
            <div class="form-group col-md-3">
              <label for="kpi_start_end_date" data-i18n="Start/End Date">Start/End Date</label>
              <input type="text" class="form-control browser-default datepicker-here date_pickers" data-range="true"
                data-multiple-dates-separator=" - " data-language="en" id="kpi_start_end_date" name="kpi_start_end_date"
                autocomplete="off" />
            </div>
            <div class="form-group col-md-3">
              <label for="kpi_weight" data-i18n="Weight(%)">Weight(%)</label>
              <input type="text" class="form-control browser-default" name="kpi_weight" id="kpi_weight"
                autocomplete="off" />
            </div>
            <div class="form-group col-md-3">
              <label for="kpi_weight" data-i18n="Sub Weight(%)">Sub Weight(%)</label>
              <input type="text" class="form-control browser-default" name="kpi_sub_weight" id="kpi_sub_weight"
                autocomplete="off" />
            </div>

            <div class="form-group col-md-3">
              <label>Status</label>
              <select id="inputState" class="form-control browser-default">
                <option value="" data-i18n="Choose">Choose</option>
                <option value="Manual" data-i18n="Manual">Manual</option>
                <option value="Weighted" data-i18n="Weighted">Weighted</option>
              </select>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-12">
              <div class="form-line right">
                <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close"
                  data-i18n="Cancel">
                  Cancel
                </button>
                <button type="submit" class="initative_save_btn" value="Save" data-i18n="Save">
                  Save
                </button>
              </div>
            </div>
          </div>
          <input type="hidden" name="action" value="" />
          <input type="hidden" name="objectiveId" value="" />
          <input type="hidden" name="kpi_id" id="kpi_id" value="" />
          <input type="hidden" name="kpiCreatedById" id="kpiCreatedById" value="" />
          <input type="hidden" name="kpiFieldName" id="kpiFieldName" />
          <input type="hidden" name="performanceFieldName" id="performanceFieldName" />
          <input type="hidden" name="includeReportees" id="includeReportees" value="" />
          <input type="hidden" name="customreportee" id="customreportee" value="" />
        </form>
      </div>
      <hr />
      <div class="modal-footer">
        <div class="d-flex flex-column flex-fill ml-4 mb-5 text-left font-11">
          <div class="d-flex flex-row">
            <p class="kpi_audit" data-i18n="Audit">Audit</p>
          </div>
          <div class="d-flex flex-row">
            <div class="d-flex flex-column">
              <p>
                <span data-i18n="Created By">Created By : </span><span id="kpiCreatedBy"></span>
              </p>
              <p>
                <span data-i18n="Created Date">Created Date : </span><span id="kpiCreatedByDate"></span>
              </p>
            </div>
            <div class="d-flex flex-column pl-5">
              <p>
                <span data-i18n="Modified By">Modified By : </span><span id="kpiUpdatedBy"></span>
              </p>
              <p>
                <span data-i18n="Modified Date">Modified Date : </span><span id="kpiUpdatedByDate"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> -->

<div
  class="modal custom-modal fade kpi_description_popup"
  id="kpi-add-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
	aria-hidden="true"
  
  tabindex="-1"
  role="dialog"
  aria-labelledby="Add KPI"
  aria-hidden="true"
>
  <div
    class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600"
  >
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title kpiHeader" >Add KPI</h4>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <form id="kpiForm">
          <div class="card custom-card border-0">
            <div class="card-body">
              <div class="grid gap-3">
                <div class="g-col-12 g-col-md-8" style="display: none">
                  <div class="form-group">
                    <label for="akpiName" class="form-label">ID</label>
                    <input
                      type="text"
                      class="form-control browser-default"
                      name="kpi_display_id"
                      id="kpi_display_id"
                      placeholder=""
                      readonly
                    />
                  </div>
                </div>
                <div class="g-col-12 g-col-md-8">
                  <div class="form-group">
                    <label for="akpiName" class="form-label" >Name</label>
                    <input
                      type="text"
                      class="form-control browser-default"
                      name="kpi_name"
                      id="kpi_name"
                      placeholder=""
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="g-col-12 g-col-md-4">
                  <div class="form-group">
                    <label for="objective_start_end_date" data-i18n="Polarity"
                     >Polarity</label
                    >
                    <select
                      id="kpi_type"
                      name="kpi_type"
                      class="form-control browser-default"
                    >
                      <option value="" data-i18n="Choose">Choose</option>
                      <option value="Lead" data-i18n="Lead">Lead</option>
                      <option value="Lag" data-i18n="Lag">Lag</option>
                    </select>
                  </div>
                </div>
                <div class="g-col-12">
                  <div class="form-group">
                    <label for="akpiDescription" class="form-label"
                     >Description</label
                    >
                    <textarea
                      class="form-control browser-default"
                      name="kpi_description"
                      id="kpi_description"
                      placeholder=""
                      cols=""
                      rows="6"
                      autocomplete="off"
                    ></textarea>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-4">
                  <div class="form-group">
                    <label for="akpiMeasurementFrequency" class="form-label"
                      >Measurement Frequency</label
                    >
                    <select
                      id="kpi_measurement"
                      name="kpi_measurement"
                      class="form-control mt-1"
                    >
                      <option value="" data-i18n="Choose">Choose</option>
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
                <div class="g-col-12 g-col-md-4">
                  <div class="form-group">
                    <label for="akpiOwner" class="form-label" >Owner</label>
                    <select
                      id="kpi_owner"
                      name="kpi_owner"
                      class="form-control mt-1"
                      style="display: block !important"
                    ></select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-4">
                  <div class="form-group">
                    <label for="akpiDataSource" class="form-label"
                      >Data Source</label
                    >
                    <select
                      id="kpi_datasource"
                      name="kpi_datasource"
                      class="form-control mt-1"
                    >
                      <option data-i18n="Choose">Choose</option>
                      <option value="Manual" data-i18n="Manual">Manual</option>
                      <option value="Source" data-i18n="Source">Source</option>
                    </select>
                  </div>
                </div>
                
                 <div class="g-col-12 g-col-md-6 kpiactualdisplay">
                                    <div class="form-group">
                                        <label for="ekpiActual" class="form-label" >Actual</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control kpi_formula" id="ekpiActual"
                                                 aria-label=""
                                                aria-describedby="button-addon2" name="kpi_formula" readonly>
                                            <button class="btn btn-label-secondary" type="button" id="button-addon2" 
                                                class="kpi_trigger" data-bs-toggle="modal" data-bs-target=".kpi_formula_popup"
                onclick="handleFormulaEvent('KPI')">
                                                KPI Calculator
                                            </button>
                                        </div>
                                    </div>
                                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="kpi_performance" class="form-label" 
                      >Performance</label
                    >
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        name="kpi_performance"
                        id="kpi_performance"
                        placeholder="Performance"
                        aria-label="Performance"
                        aria-describedby="kpi-performance-button"
                        readonly="readonly"
                        autocomplete="off"
                      
                      />
                      <button
                        class="btn btn-label-secondary"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target=".kpi_performanceformula_popup"
                        onclick='handleFormulaEvent("KPIPERFORMANCE");'
                      >
                        Performance Calculator
                      </button>
                    </div>
                  </div>
                </div>

                <div class="g-col-12 g-col-md-6 form-row">
                                    <div class="form-group kpiytdElement">
                                        <label for="ekpiYearToDate" class="form-label" >Year To Date (YTD)</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control kpiYtdFormula"  name="kpiYtdFormula" id=""
                                                placeholder="Year To Date (YTD)" aria-label=""
                                                aria-describedby="button-addon2" readonly>
                                            <button class="btn btn-label-secondary" type="button" id="button-addon2"
                                                data-bs-toggle="modal" 
                data-bs-target=".kpiYtdFormulaPoPUp" onclick="handleYTDFormulaEvent()">
                                                YTD Calculator
                                            </button>
                                        </div>
                                    </div>
                                </div>
               
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="akpiType" class="form-label" >KPI Type</label>
                    <select
                      id="kpiDataType"
                      name="kpiDataType"
                      class="form-control browser-default"
                    >
                      <option value="" data-i18n="Choose">Choose</option>
                      <option value="Number" data-i18n="Number">Number</option>
                      <option value="Percentage" data-i18n="Percentage">
                        Percentage
                      </option>
                      <option value="Currency" data-i18n="Currency">
                        Currency
                      </option>
                    </select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="aKPICurrency" class="form-label" 
                      >KPI Currency</label
                    >
                    <input
                      type="text"
                      class="form-control browser-default"
                      name="kpiCurrencyvalue"
                      id="kpiCurrencyvalue"
                      autocomplete="off"
                    />
                  </div>
                </div>

                 <div class="g-col-12">
                  <div class="form-group">
                    <label for="kpi_threshold" data-i18n="Threshold" >Threshold</label>
                    <div class="grid gap-3">
                    <div class="g-col-12">
                      <input type="text" id="kpi_threshold" class="form-control browser-default" name="kpi_threshold"
                        readonly />
                    </div>  
                  </div>
                  <div class="g-col-12 mt-2">
                    <div class="color-pickers">
                    <div class="scorecard-color-pickers">
                    <div class="form-group col-md-3 color_picks_2 color_picks_3 color_picks_5 me-2" style="display: none">
                      
                        <div class="input-group m-t-24" style="width: 90%; display: flex; align-items: stretch;">
                          <input id="optioncolor1" type="text" class="form-control browser-default" style="flex: 0 0 90%; width: 90%; height: 100%;" />
                          <div class="input-group-append" style="display: flex; flex: 0 0 10%; width: 10%;">
                            <span class="input-group-text" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"></span>
                          </div>
                        </div>
                      

                      
                    </div>
  
                    <div class="form-group col-md-3 color_picks_2 color_picks_3 color_picks_5 me-2" style="display: none">
                      
                      <div class="input-group m-t-24" style="width: 90%; display: flex; align-items: stretch;">
                          <input id="optioncolor2" type="text" class="form-control browser-default" style="flex: 0 0 90%; width: 90%; height: 100%;" />
                          <div class="input-group-append" style="display: flex; flex: 0 0 10%; width: 10%;">
                            <span class="input-group-text" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"></span>
                          </div>
                        </div>
                    </div>

                    <div class="form-group col-md-3 color_picks_3 color_picks_5 me-2" style="display: none">
                      <div class="input-group m-t-24" style="width: 90%; display: flex; align-items: stretch;">
                          <input id="optioncolor3" type="text" class="form-control browser-default" style="flex: 0 0 90%; width: 90%; height: 100%;" />
                          <div class="input-group-append" style="display: flex; flex: 0 0 10%; width: 10%;">
                            <span class="input-group-text" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"></span>
                          </div>
                        </div>
                    </div>

                    <div class="form-group col-md-3 color_picks_5 me-2" style="display: none">
                      <div class="input-group m-t-24" style="width: 90%; display: flex; align-items: stretch;">
                          <input id="optioncolor4" type="text" class="form-control browser-default" style="flex: 0 0 90%; width: 90%; height: 100%;" />
                          <div class="input-group-append" style="display: flex; flex: 0 0 10%; width: 10%;">
                            <span class="input-group-text" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"></span>
                          </div>
                        </div>
                    </div>

                    <div class="form-group col-md-3 color_picks_5 me-2" style="display: none">
                      <div class="input-group m-t-24" style="width: 90%; display: flex; align-items: stretch;">
                          <input id="optioncolor5" type="text" class="form-control browser-default" style="flex: 0 0 90%; width: 90%; height: 100%;" />
                          <div class="input-group-append" style="display: flex; flex: 0 0 10%; width: 10%;">
                            <span class="input-group-text" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"></span>
                          </div>
                        </div>
                    </div>

                    </div>
                  </div>
                  </div>

                  </div>
                </div>


                

                <div class="g-col-12 g-col-md-6 g-col-lg-3">
                  <div class="form-group">
                    <label for="akpiStartEndDate" class="form-label" 
                      >Start/End Date</label
                    >
                    <input
                      type="text"
                      class="form-control browser-default datepicker-here date_pickers"
                      data-range="true"
                      data-multiple-dates-separator=" - "
                      data-language="en"
                      id="kpi_start_end_date"
                      name="kpi_start_end_date"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6 g-col-lg-3">
                                    <div class="form-group">
                                        <label for="kpi_contribution" class="form-label" >Contribution(%)</label>
                                        <input type="text" class="form-control" name="kpi_contribution" id="kpi_contribution"
                                             />
                                    </div>
                                </div>
                <div class="g-col-12 g-col-md-6 g-col-lg-3">
                  <div class="form-group">
                    <label for="akpiWeight" class="form-label"
                     >Weight (%)</label
                    >
                    <input
                      type="text"
                      class="form-control browser-default"
                      name="kpi_weight"
                      id="kpi_weight"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6 g-col-lg-3">
                  <div class="form-group">
                    <label for="akipSubWeight" class="form-label"
                    >Sub Weight (%)</label
                    >
                    <input
                      type="text"
                      class="form-control browser-default"
                      name="kpi_sub_weight"
                      id="kpi_sub_weight"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6 g-col-lg-3">
                  <div class="form-group">
                    <label for="akpiStatus" class="form-label" >Status</label>
                    <select
                      id="inputState"
                      class="form-control browser-default"
                    >
                      <option value="" data-i18n="Choose">Choose</option>
                      <option value="Manual" data-i18n="Manual">Manual</option>
                      <option value="Weighted" data-i18n="Weighted">
                        Weighted
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-label-secondary"
              data-bs-dismiss="modal"
              aria-label="Close"
             
            >
              Cancel
            </button>
            <button class="btn btn-primary initative_save_btn" value="Save"  >
              Save
            </button>
          </div>

          <input type="hidden" name="action" value="" />
          <input type="hidden" name="objectiveId" value="" />
          <input type="hidden" name="kpi_id" id="kpi_id" value="" />
          <input
            type="hidden"
            name="kpiCreatedById"
            id="kpiCreatedById"
            value=""
          />
          <input type="hidden" name="kpiFieldName" id="kpiFieldName" />
          <input
            type="hidden"
            name="performanceFieldName"
            id="performanceFieldName"
          />
          <input
            type="hidden"
            name="includeReportees"
            id="includeReportees"
            value=""
          />
          <input
            type="hidden"
            name="customreportee"
            id="customreportee"
            value=""
          />
        </form>
      </div>
    </div>
  </div>
</div>
<script>
  $(document).ready(function () {
    /*$("#chk_custom_threshold")
                .click(function() {
                        if ($("#chk_custom_threshold").is(":checked")) {
                          $("#kpi_custom_threshold")
                              .removeAttr("disabled")
                              .css("background-color","white");
                        } else {
                          var link = '<a href="#" id="kpi_custom_trigger"'
                              + 'data-toggle="modal"'
                              + 'data-target=".kpi_custom_threshold_popup"'
                              + 'onclick=handleCustomThresholdEvent("KPI")></a>';
                          $("#check").append(link);
                          $("#kpi_custom_threshold")
                              .attr("disabled","disabled")
                              .css("background-color","unset");
                        }
                      });*/
    /*$("#kpi_custom_threshold")
                  .click(function() {
                        if ($("#chk_custom_threshold").is(":checked")) {
                          $("#kpi_custom_threshold")
                              .removeAttr("disabled")
                              .css("background-color","white");
                          var link = '<a href="#" id="kpi_custom_trigger"'
                              + 'data-toggle="modal"'
                              + 'data-target=".kpi_custom_threshold_popup"'
                              + 'onclick=handleCustomThresholdEvent("KPI")></a>';
                          $("#check").append(link);
                        } else {
                          $("#kpi_custom_threshold")
                              .attr("disabled","disabled")
                              .css("background-color","unset");
                          var link = '<a href="#" id="kpi_custom_trigger"'
                              + 'data-toggle="modal"'
                              + 'data-target=".kpi_custom_threshold_popup"'
                              + 'onclick=handleCustomThresholdEvent("KPI")></a>';
                          $("#check").append(link);
                        }
                      	
                          $("#kpi_custom_threshold")
                              .css("background-color","white");
                          var link = '<a href="#" id="kpi_custom_trigger"'
                              + 'data-toggle="modal"'
                              + 'data-target=".kpi_custom_threshold_popup"'
                              + 'onclick=handleCustomThresholdEvent("KPI")></a>';
                          $("#check").append(link);
                      });*/
  });

  jQuery.validator.setDefaults({
    debug: false,
    success: "valid",
  });
  $("#kpiForm").validate({
    rules: {
      kpi_name: {
        required: true,
      },
      kpi_owner: {
        required: true,
      },
      kpi_type: {
        required: true,
      },
      kpiDataType: {
        required: true,
      },
      kpi_start_end_date: {
        required: true,
      },
      kpi_measurement: {
        required: true,
      },
    },
    messages: {
      required: "Name is required",
    },
    submitHandler: function (form) {
      handleKpiSave();
    },
  });
</script>
