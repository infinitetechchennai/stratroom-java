<!-- <div class="modal fade subkpi_description_popup" role="dialog"
	aria-labelledby="myLargeModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content modal-content-setscrollheight">
			<div class="modal-header">
				<h6 class="modal-title" id="myLargeModalLabel"  data-i18n="SUB KPI Description">SUB KPI Description</h6>
				<button type="button" id="subcloseKpimodal" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
		<form id="subkpiForm">
					<div class="form-row">
						
						<div class="form-group col-md-2" id="subkpi_id_wrapper"
							>
							<label for="kpi_id" data-i18n="KPI ID">KPI ID</label> <input type="text"
								class="form-control browser-default" name="subkpi_display_id"
								id="subkpi_display_id" placeholder="" readonly>
						</div>
						<div class="form-group col-md-8">
							<label for="subkpi_name" data-i18n="Name">Name</label> <input type="text"
								class="form-control browser-default" name="subkpi_name"
								id="subkpi_name" placeholder="" autocomplete="off">
						</div>
						<div class="form-group col-md-2">
							<label for="objective_start_end_date" data-i18n='Polarity'>Polarity</label> <select
								id="subkpi_type" name="subkpi_type" class="form-control browser-default">
								<option value="" data-i18n="Choose">Choose</option>
								<option value="Lead" data-i18n="Lead">Lead</option>
								<option value="Lag" data-i18n="Lag">Lag</option>
							</select>
						</div>
					</div>
					<hr />
					<div class="form-row">
						<div class="form-group mt--10">
							<label for="kpi_description" data-i18n="Description">Description</label>
							<textarea class="form-control browser-default"
								name="subkpi_description" id="subkpi_description" placeholder=""
								cols="" rows="6" autocomplete="off"></textarea>
						</div>
					</div>
					<hr />
					<div class="form-row">
						<div class="form-group browser-default col-md-4">
							<label for="kpi_measurement" data-i18n="Measurement Frequency">Measurement Frequency</label> <select
								id="subkpi_measurement" name="subkpi_measurement"
								class="form-control mt-1">
								<option value="" data-i18n="Choose">Choose</option>
								<option value="Monthly" data-i18n="Monthly">Monthly</option>
								<option value="Quarterly" data-i18n="Quarterly">Quarterly</option>
								<option value="Half Yearly" data-i18n="Half Yearly">Half Yearly</option>
								<option value="Annually" data-i18n="Annually">Annually</option>
							</select>
						</div>
						<div class="form-group browser-default col-md-4">
							<label for="subkpi_owner" data-i18n="Owner">Owner</label> <select id="subkpi_owner"
								name="subkpi_owner" class="form-control mt-1"
								style="display: block !important;">
							</select>
						</div>
						<div class="form-group browser-default col-md-4">
							<label for="subkpi_datasource" data-i18n="Data Source">Data Source</label> <select
								id="subkpi_datasource" name="subkpi_datasource"
								class="form-control mt-1">
								<option data-i18n="Choose">Choose</option>
								<option value="Manual" data-i18n="Manual">Manual</option>
								<option value="Source" data-i18n="Source">Source</option>
							</select>
						</div>
					</div>
					<hr />
					
					
					<div class="form-row kpiactualdisplay">
						<div class="form-group col-md-12">
							<label for="inputState" data-i18n="Actual">Actual</label> <input type="text"
								class="form-control browser-default kpi_formula" name="kpi_formula"
								id="" readonly> <a href="#" class="kpi_trigger"
								data-toggle="modal" data-target=".kpi_formula_popup"
								onclick="handleFormulaEvent('KPI')"></a>
							
						</div>
						
					</div>
					<hr class="kpiactualdisplay"/>
					<div class="form-row kpiperformanceElement">
						<div class="form-group col-md-12">
							<label for="obj_custom_objective" data-i18n="Performance">Performance</label> 
							<input type="text" class="form-control browser-default"  name="subkpi_performance" id="subkpi_performance" readonly="readonly" autocomplete="off"
							data-toggle="modal" data-target=".kpi_performanceformula_popup"  onclick='handleFormulaEvent("KPIPERFORMANCE")'>	
						</div>
					</div><hr class="kpiperformanceElement"/>
					
					<div class="form-row">	
					
						<div class="form-group col-md-3 kpikpitypedisplay">
							<label for="subkpiDataType" data-i18n="Kpi Type">KPI Type</label> <select id="subkpiDataType" name="subkpiDataType"
								class="form-control browser-default">
								<option value="" data-i18n="Choose">Choose</option>
								<option value="Number" data-i18n="Number">Number</option>
								<option value="Percentage" data-i18n="Percentage">Percentage</option>
								<option value="Currency" data-i18n="Currency">Currency</option>
							</select>
						</div>
						<div class="form-group col-md-3 kpiCurrencyfield" style="display:none;">
							<label for="inputState" data-i18n="Kpi Currency">KPI Currency</label>
								<input type="text" class="form-control browser-default"
									name="subkpiCurrencyvalue" id="subkpiCurrencyvalue" autocomplete="off">
							
						</div>
						
					</div><hr/>	
					<div class="form-row">

						<div class="form-group col-md-3">
							<label for="subkpi_threshold" data-i18n="Threshold">Threshold</label> 
							<input type="text" id="subkpi_threshold" class="form-control browser-default"
							name="subkpi_threshold" readonly>
											</div>
						


						<div class="form-group col-md-3 color_picks_2 color_picks_3 color_picks_5"
							style="display: none;">
							<div class="input-group m-t-24" style="width:90%">
								<input id="optioncolor1" type="text"
									class="form-control browser-default">
								<div class="input-group-append">
									<span class="input-group-text"></span>
								</div>
							</div>
						</div>

						<div class="form-group col-md-3 color_picks_2 color_picks_3 color_picks_5"
							style="display: none;">
							<div class="input-group m-t-24" style="width:90%">
								<input id="optioncolor2" type="text"
									class="form-control browser-default">
								<div class="input-group-append">
									<span class="input-group-text"></span>
								</div>
							</div>
						</div>

						<div class="form-group col-md-3 color_picks_3 color_picks_5"
							style="display: none;">
							<div class="input-group m-t-24" style="width:90%">
								<input id="optioncolor3" type="text"
									class="form-control browser-default">
								<div class="input-group-append">
									<span class="input-group-text"></span>
								</div>
							</div>
						</div>


						<div class="form-group col-md-3 color_picks_5"
							style="display: none;">
							<div class="input-group m-t-24" style="width:90%">
								<input id="optioncolor4" type="text"
									class="form-control browser-default">
								<div class="input-group-append">
									<span class="input-group-text"></span>
								</div>
							</div>
						</div>

						<div class="form-group col-md-3 color_picks_5"
							style="display: none;">
							<div class="input-group m-t-24" style="width:90%">
								<input id="optioncolor5" type="text"
									class="form-control browser-default">
								<div class="input-group-append">
									<span class="input-group-text"></span>
								</div>
							</div>
						</div>

						
					</div>
					<hr/>
					
					<div class="form-row">
						<div class="form-group col-md-3">
							<label for="subkpi_start_end_date" data-i18n="Start/End Date">Start/End Date</label> <input
								type="text"
								class="form-control browser-default datepicker-here date_pickers"
								data-range="true" data-multiple-dates-separator=" - "
								data-language="en" id="subkpi_start_end_date"
								name="subkpi_start_end_date" autocomplete="off">
						</div>
						<div class="form-group col-md-3">
							<label for="subkpi_weight" data-i18n="Weight(%)">Weight(%)</label> <input type="text"
								class="form-control browser-default" name="subkpi_weight"
								id="subkpi_weight" autocomplete="off">
						</div>
						<div class="form-group col-md-3">
							<label for="subkpi_weight" data-i18n="Sub Weight(%)">Sub Weight(%)</label> <input type="text"
								class="form-control browser-default" name="subkpi_sub_weight"
								id="subkpi_sub_weight" autocomplete="off">
						</div>

						<div class="form-group col-md-3">
							<label>Status</label> <select
								id="subkpiinputState" class="form-control browser-default">
								<option value="" data-i18n="Choose">Choose</option>
								<option value="Manual" data-i18n="Manual">Manual</option>
								<option value="Weighted" data-i18n="Weighted">Weighted</option>
								
							</select>
						</div>
					</div>
					
			<div class="row mt-2">
              <div class="col-12">
                <div class="form-line right">
                  <button type="button" class="btn-default1 btn"
							data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
							<button class="initative_save_btn" value="Save" data-i18n="Save" onclick="handleSubKpiSave(event)">Save</button>

                </div>
              </div>
            </div>
			<input type="hidden" name="sub" value="" /> 
					<input type="hidden" name="action" value="" /> <input
						type="hidden" name="subobjectiveId" value="" /> <input type="hidden"
						name="kpi_id" id="kpi_id" value="" /> <input type="text"
						name="kpiCreatedById" id="kpiCreatedById" value="" /> <input
						type="hidden" name="kpiFieldName" id="kpiFieldName" />
						<input
						type="hidden" name="performanceFieldName" id="performanceFieldName" />
						<input
						type="hidden" name="includeReportees" id="includeReportees" value="" />
						<input
						type="hidden" name="customreportee" id="customreportee" value=""/>
						
</form>
			</div>
			<hr>
			<div class="modal-footer">
				<div
					class="d-flex flex-column flex-fill ml-4 mb-5 text-left font-11">
					<div class="d-flex flex-row">
						<p class="kpi_audit">Audit</p>
					</div>
					<div class="d-flex flex-row">
						<div class="d-flex flex-column">
							<p>
								<span>Created By : </span><span id="kpiCreatedBy"></span>
							</p>
							<p>
								<span>Created Date : </span><span id="kpiCreatedByDate"></span>
							</p>
						</div>
						<div class="d-flex flex-column pl-5">
							<p>
								<span>Modified By : </span><span id="kpiUpdatedBy"></span>
							</p>
							<p>
								<span>Modified Date : </span><span id="kpiUpdatedByDate"></span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div> -->

<!-- sub kpi add new design -->
<div
  class="modal custom-modal fade kpi_setting subkpi_description_popup"
  id="subkpi-add-modal"
  tabindex="-1"
  role="dialog"
  aria-labelledby="Add Sub Kpi"
  aria-hidden="true"
>
  <div
    class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600"
  >
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title subKpiHeaderText" data-translate="page.scorecard.addSubKPI">Add Sub KPI</h4>
        <button
          type="button"
          class="btn-close"
           data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <form id="subkpiForm">
          <div class="card custom-card border-0">
            <div class="card-body">
              <div class="grid gap-3">
                <div class="g-col-12 g-col-md-8">
                  <div class="form-group">
                    <label for="askpiName" class="form-label">KPI ID</label>
                    <input
                      type="text"
                      class="form-control browser-default"
                      name="subkpi_display_id"
                      id="subkpi_display_id"
                      placeholder=""
                      readonly
                    />
                  </div>
                </div>
                <div class="g-col-12 g-col-md-8">
                  <div class="form-group">
                    <label for="askpiName" class="form-label" data-translate="page.scorecard.scorecardItems.name">Name</label>
                    <input
                      type="text"
                      class="form-control browser-default"
                      name="subkpi_name"
                      id="subkpi_name"
                      placeholder=""
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="g-col-12 g-col-md-4">
                  <div class="form-group">
                    <label for="askpiPolarity" class="form-label" data-translate="page.scorecard.scorecardItems.polarity"
                      >Polarity</label
                    >
                    <select
                      id="subkpi_type"
                      name="subkpi_type"
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
                    <label for="askpiDescription" class="form-label"
                      data-translate="page.scorecard.scorecardItems.description">Description</label
                    >
                    <textarea
                      class="form-control browser-default"
                      name="subkpi_description"
                      id="subkpi_description"
                      placeholder=""
                      cols=""
                      rows="6"
                      autocomplete="off"
                    ></textarea>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-4">
                  <div class="form-group">
                    <label for="askpiMeasurementFrequency" class="form-label" data-translate="page.scorecard.scorecardItems.measurementFrequency"
                      >Measurement Frequency</label
                    >
                    <select
                      id="subkpi_measurement"
                      name="subkpi_measurement"
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
                    <label for="askpiOwner" class="form-label" data-translate="page.scorecard.scorecardItems.owner">Owner</label>
                    <select
                      id="subkpi_owner"
                      name="subkpi_owner"
                      class="form-control mt-1"
                      style="display: block !important"
                    ></select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-4">
                  <div class="form-group">
                    <label for="askpiDataSource" class="form-label" data-translate="page.scorecard.scorecardItems.dataSource"
                      >Data Source</label
                    >
                    <select
                      id="subkpi_datasource"
                      name="subkpi_datasource"
                      class="form-control mt-1"
                    >
                      <option data-i18n="Choose">Choose</option>
                      <option value="Manual" data-i18n="Manual">Manual</option>
                      <option value="Source" data-i18n="Source">Source</option>
                    </select>
                  </div>
                </div>
                <!-- <div class="g-col-12">
										<div class="form-group">
											<label for="askpiFields" class="form-label">KPI Fields</label>
											<div>
												<div class="form-check form-check-inline">
													<input class="form-check-input" type="checkbox" id="askpifActual">
													<label class="form-check-label" for="askpifActual">Actual</label>
												</div>
												<div class="form-check form-check-inline">
													<input class="form-check-input" type="checkbox" id="askpifTarget">
													<label class="form-check-label" for="askpifTarget">Target</label>
												</div>
												<div class="form-check form-check-inline">
													<input class="form-check-input" type="checkbox" id="askpifBudget">
													<label class="form-check-label" for="askpifBudget">Budget</label>
												</div>
												<div class="form-check form-check-inline">
													<input class="form-check-input" type="checkbox" id="askpifForecast">
													<label class="form-check-label" for="askpifForecast">Forecast</label>
												</div>
											</div>
										</div>
									</div> -->
                <!-- <div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="askpiActual" class="form-label">Actual</label>
											<input type="text" class="form-control" id="askpiActual" placeholder="Actual" />
										</div>
									</div> -->
                <!-- <div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="askpiTarget" class="form-label">Target</label>
											<input type="text" class="form-control" name="askpiTarget"
												placeholder="Target" />
										</div>
									</div> -->
                <div class="g-col-12">
                  <div class="form-group">
                    <label for="askpiPerformance" class="form-label" data-translate="page.scorecard.scorecardItems.performance"
                      >Performance</label
                    >
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        name="subkpi_performance"
                        id="subkpi_performance"
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
                        onclick='handleFormulaEvent("KPIPERFORMANCE")'
                        data-translate="page.scorecard.scorecardItems.kpiCalculator"
                      >
                        KPI Calculator
                      </button>
                    </div>
                  </div>
                </div>
                <!-- <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="askpiYearToDate" class="form-label"
                      >Year To Date (YTD)</label
                    >
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        id="askpiYearToDate"
                        placeholder="Year To Date (YTD)"
                        aria-label=""
                        aria-describedby="button-addon2"
                      />
                      <button
                        class="btn btn-label-secondary"
                        type="button"
                        id="button-addon2"
                        data-toggle="modal"
                        data-target="#kpi-calculator-modal"
                      >
                        KPI Calculator
                      </button>
                    </div>
                  </div>
                </div> -->
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="askpiType" class="form-label" data-translate="page.scorecard.scorecardItems.kpiType">KPI Type</label>
                    <select
                      id="subkpiDataType"
                      name="subkpiDataType"
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
                    <label for="askpICurrency" class="form-label" data-translate="page.scorecard.scorecardItems.kpiType"
                      >KPI Currency</label
                    >
                    <input
                      type="text"
                      class="form-control browser-default"
                      name="subkpiCurrencyvalue"
                      id="subkpiCurrencyvalue"
                      autocomplete="off"
                    />
                  </div>
                </div>
                   <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="askpiThreshold" class="form-label" data-translate="page.scorecard.scorecardItems.threshold">Threshold</label>
                                        <div class="grid gap-3">
                                            <div class="g-col-12">
                                                <input type="text" id="subkpi_threshold" class="form-control browser-default"
							name="subkpi_threshold" readonly>
                                            </div>
                                            <div class="g-col-12">
                                                <div class="color-pickers">
                                                    <div class="scorecard-color-pickers">
                                                        <div class="input-group">
                                                            <input id="option1color1" type="text" class="form-control">
                                                            <span class="input-group-text pickr" id="p-1" role="button"
                                                                aria-label="threshold"
                                                                ></span>
                                                        </div>
                                                        <div class="input-group">
                                                            <input id="option1color12" type="text" class="form-control">
                                                            <span class="input-group-text pickr" id="p-2" role="button"
                                                                aria-label="threshold"
                                                                ></span>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                <div class="g-col-12 g-col-md-6 g-col-lg-3">
                  <div class="form-group">
                    <label for="askpiStartEndDate" class="form-label" data-translate="page.scorecard.scorecardItems.startEndDate"
                      >Start/End Date</label
                    >
                    <input
                      type="text"
                      class="form-control browser-default datepicker-here date_pickers"
                      data-range="true"
                      data-multiple-dates-separator=" - "
                      data-language="en"
                      id="subkpi_start_end_date"
                      name="subkpi_start_end_date"
                      autocomplete="off"
                    />
                  </div>
                </div>
                 <div class="g-col-12 g-col-md-6 g-col-lg-3">
                  <div class="form-group">
                    <label for="askpiWeight" class="form-label" data-translate="page.scorecard.scorecardItems.contribution"
                      >Contribution(%)</label
                    >
                    <input
                      type="text"
                      class="form-control browser-default"
                      name="subkpi_contribution"
                      id="subkpi_contribution"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6 g-col-lg-3">
                  <div class="form-group">
                    <label for="askpiWeight" class="form-label" data-translate="page.scorecard.scorecardItems.weight"
                      >Weight (%)</label
                    >
                    <input
                      type="text"
                      class="form-control browser-default"
                      name="subkpi_weight"
                      id="subkpi_weight"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6 g-col-lg-3">
                  <div class="form-group">
                    <label for="akipSubWeight" class="form-label" data-translate="page.scorecard.scorecardItems.subWeight"
                      >Sub Weight (%)</label
                    >
                    <input
                      type="text"
                      class="form-control browser-default"
                      name="subkpi_sub_weight"
                      id="subkpi_sub_weight"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6 g-col-lg-3">
                  <div class="form-group">
                    <label for="askpiStatus" class="form-label" data-translate="page.scorecard.scorecardItems.status">Status</label>
                    <select
                      id="subkpiinputState"
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
		  <hr />
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-label-secondary"
              data-bs-dismiss="modal"
              aria-label="Close"
              data-translate="page.scorecard.scorecardItems.cancel"
            >
              Cancel
            </button>
            <button class="btn btn-primary initative_save_btn" value="Save" onclick="handleSubKpiSave(event)" data-translate="page.scorecard.scorecardItems.save">
              Save
            </button>
          </div>

          <input type="hidden" name="sub" value="" />
          <input type="hidden" name="action" value="" />
          <input type="hidden" name="subobjectiveId" value="" />
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
<!-- --------------------- -->

<!--update subkpi edit pop up new design-->
<div
  class="modal custom-modal fade kpi_setting updateSubkpi_description_popup"
  id="subkpi-add-modal"
  tabindex="-1"
  role="dialog"
  aria-labelledby="Add Sub Kpi"
  aria-hidden="true"
>
  <div
    class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600"
  >
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title subKpiHeaderText" >Add Sub Kpi</h4>
        <button
          type="button"
          class="btn-close"
           data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <form id="editSubkpiForm">
          <div class="card custom-card border-0">
            <div class="card-body">
              <div class="grid gap-3">
                <div class="g-col-12 g-col-md-8">
                  <div class="form-group">
                    <label for="askpiName" class="form-label" data-translate="page.scorecard.scorecardItems.id">KPI ID</label>
                   <input
                    type="text"
                    class="form-control browser-default"
                    name="editsubkpi_display_id"
                    id="editsubkpi_display_id"
                    placeholder=""
                  />
                  </div>
                </div>
                <input
              class="form-control browser-default"
              name="subKpi_display_id"
              id="subKpi_display_id"
              type="hidden"
              placeholder=""
            />
            <input
              class="form-control browser-default"
              name="subKpi_id"
              id="subKpi_id"
              type="hidden"
              placeholder=""
            />
                <div class="g-col-12 g-col-md-8">
                  <div class="form-group">
                    <label for="askpiName" class="form-label" data-translate="page.scorecard.scorecardItems.name">Name</label>
                   <input
                    type="text"
                    class="form-control browser-default"
                    name="editsubkpi_name"
                    id="editsubkpi_name"
                    placeholder=""
                    autocomplete="off"
                  />
                  </div>
                </div>
                <div class="g-col-12 g-col-md-4">
                  <div class="form-group">
                    <label for="askpiPolarity" class="form-label" data-translate="page.scorecard.scorecardItems.polarity"
                      >Polarity</label
                    >
                    <select
                      id="editsubkpi_type"
                      name="editsubkpi_type"
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
                    <label for="askpiDescription" class="form-label" data-translate="page.scorecard.scorecardItems.description"
                      >Description</label
                    >
                     <textarea
                      class="form-control browser-default"
                      name="editsubkpi_description"
                      id="editsubkpi_description"
                      placeholder=""
                      cols=""
                      rows="6"
                      autocomplete="off"
                    ></textarea>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-4">
                  <div class="form-group">
                    <label for="askpiMeasurementFrequency" class="form-label" data-translate="page.scorecard.scorecardItems.measurementFrequency"
                      >Measurement Frequency</label
                    >
                    <select
                      id="editsubkpi_measurement"
                      name="editsubkpi_measurement"
                      class="form-control mt-1"
                    >
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
                </div>
                <div class="g-col-12 g-col-md-4">
                  <div class="form-group">
                    <label for="askpiOwner" class="form-label" data-translate="page.scorecard.scorecardItems.owner">Owner</label>
                    <select
                      id="editsubkpi_owner"
                      name="editsubkpi_owner"
                      class="form-control mt-1"
                      style="display: block !important"
                    ></select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-4">
                  <div class="form-group">
                    <label for="askpiDataSource" class="form-label" data-translate="page.scorecard.scorecardItems.dataSource"
                      >Data Source</label
                    >
                    <select
                      id="editsubkpi_datasource"
                      name="editsubkpi_datasource"
                      class="form-control mt-1"
                    >
                      <option data-i18n="Choose">Choose</option>
                      <option value="Manual" data-i18n="Manual">Manual</option>
                      <option value="Source" data-i18n="Source">Source</option>
                    </select>
                  </div>
                </div>
                <!-- <div class="g-col-12">
										<div class="form-group">
											<label for="askpiFields" class="form-label">KPI Fields</label>
											<div>
												<div class="form-check form-check-inline">
													<input class="form-check-input" type="checkbox" id="askpifActual">
													<label class="form-check-label" for="askpifActual">Actual</label>
												</div>
												<div class="form-check form-check-inline">
													<input class="form-check-input" type="checkbox" id="askpifTarget">
													<label class="form-check-label" for="askpifTarget">Target</label>
												</div>
												<div class="form-check form-check-inline">
													<input class="form-check-input" type="checkbox" id="askpifBudget">
													<label class="form-check-label" for="askpifBudget">Budget</label>
												</div>
												<div class="form-check form-check-inline">
													<input class="form-check-input" type="checkbox" id="askpifForecast">
													<label class="form-check-label" for="askpifForecast">Forecast</label>
												</div>
											</div>
										</div>
									</div> -->
                <!-- <div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="askpiActual" class="form-label">Actual</label>
											<input type="text" class="form-control" id="askpiActual" placeholder="Actual" />
										</div>
									</div> -->
                <!-- <div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="askpiTarget" class="form-label">Target</label>
											<input type="text" class="form-control" name="askpiTarget"
												placeholder="Target" />
										</div>
									</div> -->
                <!-- <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="askpiPerformance" class="form-label"
                      >Performance</label
                    >
                    <div class="input-group">
                       <input
                          type="text"
                          class="form-control browser-default"
                          name="editsubkpi_performance"
                          id="editsubkpi_performance"
                          readonly="readonly"
                          autocomplete="off"
                          data-toggle="modal"
                          data-target=".kpi_performanceformula_popup"
                          onclick='handleFormulaEvent("KPIPERFORMANCE")'
                        />
                      
                    </div>
                  </div>
                </div> -->
                 <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="ekpiActual" class="form-label" data-translate="page.scorecard.scorecardItems.actual">Actual</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="ekpiActual"
                                                placeholder="Actual" aria-label=""
                                                aria-describedby="button-addon2"  name="kpi_formula">
                                            <button class="btn btn-label-secondary" type="button" id="button-addon2"
                                                data-bs-toggle="modal"
                data-bs-target=".kpi_formula_popup"
                onclick="handleFormulaEvent('KPI')"
                data-translate="page.scorecard.scorecardItems.kpiCalculator">
                                                KPI Calculator
                                            </button>
                                        </div>
                                    </div>
                                </div>
                 <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="askpiPerformance" class="form-label" data-translate="page.scorecard.scorecardItems.performance"
                      >Performance</label
                    >
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                       name="editsubkpi_performance"
                          id="editsubkpi_performance"
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
                        data-bs-target="#kpi_performanceformula_popup"
                        onclick='handleFormulaEvent("KPIPERFORMANCE")'
                        data-translate="page.scorecard.scorecardItems.kpiCalculator"
                      >
                        KPI Calculator
                      </button>
                    </div>
                  </div>
                </div>

                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="eskpiYearToDate" class="form-label" data-translate="page.scorecard.scorecardItems.kpiCalculator">Year To Date (YTD)</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="eskpiYearToDate"
                                                placeholder="Year To Date (YTD)" aria-label=""
                                                aria-describedby="button-addon2" name="kpiYtdFormula" readonly>
                                            <button class="btn btn-label-secondary" type="button" id="button-addon2"
                                               data-bs-toggle="modal"
                data-bs-target=".kpiYtdFormulaPoPUp"
                onclick="handleYTDFormulaEvent()"
                data-translate="page.scorecard.scorecardItems.kpiCalculator">
                                                YTD Calculator
                                            </button>
                                        </div>
                                    </div>
                                </div>
                <!-- <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="askpiYearToDate" class="form-label"
                      >Year To Date (YTD)</label
                    >
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        id="askpiYearToDate"
                        placeholder="Year To Date (YTD)"
                        aria-label=""
                        aria-describedby="button-addon2"
                      />
                      <button
                        class="btn btn-label-secondary"
                        type="button"
                        id="button-addon2"
                        data-toggle="modal"
                        data-target="#kpi-calculator-modal"
                      >
                        KPI Calculator
                      </button>
                    </div>
                  </div>
                </div> -->
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="askpiType" class="form-label" data-translate="page.scorecard.scorecardItems.kpiType">KPI Type</label>
                    <select
                id="editsubkpiDataType"
                name="subkpiDataType"
                class="form-control browser-default"
              >
                <option value="" data-i18n="Choose">Choose</option>
                <option value="Number" data-i18n="Number">Number</option>
                <option value="Percentage" data-i18n="Percentage">
                  Percentage
                </option>
                <option value="Currency" data-i18n="Currency" data-translate="page.scorecard.scorecardItems.kpiType">Currency</option>
              </select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="askpICurrency" class="form-label"
                      >KPI Currency</label
                    >
                    <input
                type="text"
                class="form-control browser-default"
                name="editsubkpiCurrencyvalue"
                id="editsubkpiCurrencyvalue"
                autocomplete="off"
              />
                  </div>
                </div>
                <div class="g-col-12">
                  <div class="form-group">
                    <label for="askpiThreshold" class="form-label" data-translate="page.scorecard.scorecardItems.threshold"
                      >Threshold</label
                    >
                   <input
                type="text"
                id="editkpi_threshold"
                class="form-control browser-default"
                name="editkpi_threshold"
                readonly
              />
                  </div>
                   <div class="g-col-12" style="margin-top: 15px">
                                                <div class="color-pickers">
                                                    <div class="scorecard-color-pickers">
                                                        <div class="input-group">
                                                            <input id="option1color1" type="text" class="form-control">
                                                            <span class="input-group-text pickr" id="p-1" role="button"
                                                                aria-label="threshold"
                                                                ></span>
                                                        </div>
                                                        <div class="input-group">
                                                            <input id="option1color12" type="text" class="form-control">
                                                            <span class="input-group-text pickr" id="p-2" role="button"
                                                                aria-label="threshold"
                                                                ></span>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                </div>

                <div class="g-col-12 g-col-md-6 g-col-lg-3">
                  <div class="form-group">
                    <label for="askpiStartEndDate" class="form-label" data-translate="page.scorecard.scorecardItems.startEndDate"
                      >Start/End Date</label
                    >
                   <input
                      type="text"
                      class="form-control browser-default datepicker-here date_pickers"
                      data-range="true"
                      data-multiple-dates-separator=" - "
                      data-language="en"
                      id="editsubkpi_start_end_date"
                      name="editsubkpi_start_end_date"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6 g-col-lg-3">
                  <div class="form-group">
                    <label for="askpiWeight" class="form-label" data-translate="page.scorecard.scorecardItems.weight"
                      >Weight (%)</label
                    >
                       <input
                        type="text"
                        class="form-control browser-default"
                        name="editsubkpi_weight"
                        id="editsubkpi_weight"
                        autocomplete="off"
                      />
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6 g-col-lg-3">
                  <div class="form-group">
                    <label for="akipSubWeight" class="form-label" data-translate="page.scorecard.scorecardItems.subWeight"
                      >Sub Weight (%)</label
                    >
                    <input
                type="text"
                class="form-control browser-default"
                name="editsubkpi_sub_weight"
                id="editsubkpi_sub_weight"
                autocomplete="off"
              />
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6 g-col-lg-3">
                  <div class="form-group">
                    <label for="askpiStatus" class="form-label" data-translate="page.scorecard.scorecardItems.status">Status</label>
                   <select
                id="editsubkpiinputState"
                class="form-control browser-default"
              >
                <option value="" data-i18n="Choose">Choose</option>
                <option value="Manual" data-i18n="Manual">Manual</option>
                <option value="Weighted">Weighted</option>
               
              </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
		  <hr />
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-label-secondary"
              data-bs-dismiss="modal"
              aria-label="Close"
              data-translate="page.scorecard.scorecardItems.cancel"
            >
              Cancel
            </button>
            <button class="btn btn-primary initative_save_btn" value="Save" onclick="handleUpdateSubKpiSave(event)" data-translate="page.scorecard.scorecardItems.save">
              Save
            </button>
          </div>

         <input type="hidden" name="sub" value="" />
          <input type="hidden" name="action" value="" />
          <input type="hidden" name="editobjectiveId" value="" />
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
<!--  -->
<!-- <div
  class="modal fade updateSubkpi_description_popup"
  role="dialog"
  aria-labelledby="myLargeModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content modal-content-setscrollheight">
      <div class="modal-header">
        <h6 class="modal-title" id="myLargeModalLabel">SUB KPI Description</h6>
        <button
          type="button"
          id="editsubcloseKpimodal"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="editSubkpiForm">
          <div class="form-row">
            <div class="form-group col-md-2" id="subkpi_id_wrapper">
              <label for="kpi_id"> ID</label>
              <input
                type="text"
                class="form-control browser-default"
                name="editsubkpi_display_id"
                id="editsubkpi_display_id"
                placeholder=""
              />
            </div>
            <input
              class="form-control browser-default"
              name="subKpi_display_id"
              id="subKpi_display_id"
              type="hidden"
              placeholder=""
            />
            <input
              class="form-control browser-default"
              name="subKpi_id"
              id="subKpi_id"
              type="hidden"
              placeholder=""
            />
            <div class="form-group col-md-8">
              <label for="subkpi_name" data-i18n="Name">Name</label>
              <input
                type="text"
                class="form-control browser-default"
                name="editsubkpi_name"
                id="editsubkpi_name"
                placeholder=""
                autocomplete="off"
              />
            </div>
            <div class="form-group col-md-2">
              <label for="objective_start_end_date" data-i18n="Polarity"
                >Polarity</label
              >
              <select
                id="editsubkpi_type"
                name="editsubkpi_type"
                class="form-control browser-default"
              >
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
              <textarea
                class="form-control browser-default"
                name="editsubkpi_description"
                id="editsubkpi_description"
                placeholder=""
                cols=""
                rows="6"
                autocomplete="off"
              ></textarea>
            </div>
          </div>
          <hr />
          <div class="form-row">
            <div class="form-group browser-default col-md-4">
              <label for="kpi_measurement" data-i18n="Measurement Frequency"
                >Measurement Frequency</label
              >
              <select
                id="editsubkpi_measurement"
                name="editsubkpi_measurement"
                class="form-control mt-1"
              >
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
              <label for="subkpi_owner">Owner</label>
              <select
                id="editsubkpi_owner"
                name="editsubkpi_owner"
                class="form-control mt-1"
                style="display: block !important"
              ></select>
            </div>
            <div class="form-group browser-default col-md-4">
              <label for="subkpi_datasource" data-i18n="Data Source"
                >Data Source</label
              >
              <select
                id="editsubkpi_datasource"
                name="editsubkpi_datasource"
                class="form-control mt-1"
              >
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
              <input
                type="text"
                class="form-control browser-default kpi_formula"
                name="kpi_formula"
                id=""
                readonly
              />
              <a
                href="#"
                class="kpi_trigger"
                data-toggle="modal"
                data-target=".kpi_formula_popup"
                onclick="handleFormulaEvent('KPI')"
              ></a>
             
            </div>
           
          </div>
          <hr class="kpiactualdisplay" />
          <div class="form-row kpiperformanceElement">
            <div class="form-group col-md-12">
              <label for="obj_custom_objective" data-i18n="Performance"
                >Performance</label
              >
              <input
                type="text"
                class="form-control browser-default"
                name="editsubkpi_performance"
                id="editsubkpi_performance"
                readonly="readonly"
                autocomplete="off"
                data-toggle="modal"
                data-target=".kpi_performanceformula_popup"
                onclick='handleFormulaEvent("KPIPERFORMANCE")'
              />
            </div>
          </div>
          <hr class="kpiperformanceElement" />

          <div class="form-row">
            <div class="form-group col-md-6 kpiytdElement">
              <label for="inputState">Year To Date (YTD)</label>

              <input
                type="text"
                class="form-control browser-default kpiYtdFormula"
                name="kpiYtdFormula"
                id=""
                autocomplete="off"
                readonly
              /><a
                href="#"
                class="kpiYtdFormulaTrigger"
                data-toggle="modal"
                data-target=".kpiYtdFormulaPoPUp"
                onclick="handleYTDFormulaEvent()"
              ></a>
            </div>
            <div class="form-group col-md-3 kpikpitypedisplay">
              <label for="editsubkpiDataType">KPI Type</label>
              <select
                id="editsubkpiDataType"
                name="subkpiDataType"
                class="form-control browser-default"
              >
                <option value="" data-i18n="Choose">Choose</option>
                <option value="Number" data-i18n="Number">Number</option>
                <option value="Percentage" data-i18n="Percentage">
                  Percentage
                </option>
                <option value="Currency" data-i18n="Currency">Currency</option>
              </select>
            </div>
            <div
              class="form-group col-md-3 kpiCurrencyfield"
              style="display: none"
            >
              <label for="inputState">KPI Currency</label>
              <input
                type="text"
                class="form-control browser-default"
                name="editsubkpiCurrencyvalue"
                id="editsubkpiCurrencyvalue"
                autocomplete="off"
              />
            </div>
          
          </div>
          <hr />
          <div class="form-row">
            <div class="form-group col-md-3">
              <label for="editkpi_threshold">Threshold</label>
              <input
                type="text"
                id="editkpi_threshold"
                class="form-control browser-default"
                name="editkpi_threshold"
                readonly
              />
            </div>
          

            <div
              class="form-group col-md-3 color_picks_2 color_picks_3 color_picks_5"
              style="display: none"
            >
              <div class="input-group m-t-24" style="width: 90%">
                <input
                  id="optioncolor1"
                  type="text"
                  class="form-control browser-default"
                />
                <div class="input-group-append">
                  <span class="input-group-text"></span>
                </div>
              </div>
            </div>

            <div
              class="form-group col-md-3 color_picks_2 color_picks_3 color_picks_5"
              style="display: none"
            >
              <div class="input-group m-t-24" style="width: 90%">
                <input
                  id="optioncolor2"
                  type="text"
                  class="form-control browser-default"
                />
                <div class="input-group-append">
                  <span class="input-group-text"></span>
                </div>
              </div>
            </div>

            <div
              class="form-group col-md-3 color_picks_3 color_picks_5"
              style="display: none"
            >
              <div class="input-group m-t-24" style="width: 90%">
                <input
                  id="optioncolor3"
                  type="text"
                  class="form-control browser-default"
                />
                <div class="input-group-append">
                  <span class="input-group-text"></span>
                </div>
              </div>
            </div>

            <div
              class="form-group col-md-3 color_picks_5"
              style="display: none"
            >
              <div class="input-group m-t-24" style="width: 90%">
                <input
                  id="optioncolor4"
                  type="text"
                  class="form-control browser-default"
                />
                <div class="input-group-append">
                  <span class="input-group-text"></span>
                </div>
              </div>
            </div>

            <div
              class="form-group col-md-3 color_picks_5"
              style="display: none"
            >
              <div class="input-group m-t-24" style="width: 90%">
                <input
                  id="optioncolor5"
                  type="text"
                  class="form-control browser-default"
                />
                <div class="input-group-append">
                  <span class="input-group-text"></span>
                </div>
              </div>
            </div>

            
          </div>
          <hr />
         
          <div class="form-row">
            <div class="form-group col-md-3">
              <label for="subkpi_start_end_date" data-i18n="Start/End Date"
                >Start/End Date</label
              >
              <input
                type="text"
                class="form-control browser-default datepicker-here date_pickers"
                data-range="true"
                data-multiple-dates-separator=" - "
                data-language="en"
                id="editsubkpi_start_end_date"
                name="editsubkpi_start_end_date"
                autocomplete="off"
              />
            </div>
            <div class="form-group col-md-3">
              <label for="subkpi_weight" data-i18n="Weight(%)">Weight(%)</label>
              <input
                type="text"
                class="form-control browser-default"
                name="editsubkpi_weight"
                id="editsubkpi_weight"
                autocomplete="off"
              />
            </div>
            <div class="form-group col-md-3">
              <label for="subkpi_weight" data-i18n="Sub Weight(%)"
                >Sub Weight(%)</label
              >
              <input
                type="text"
                class="form-control browser-default"
                name="editsubkpi_sub_weight"
                id="editsubkpi_sub_weight"
                autocomplete="off"
              />
            </div>

            <div class="form-group col-md-3">
              <label>Status</label>
              <select
                id="editsubkpiinputState"
                class="form-control browser-default"
              >
                <option value="" data-i18n="Choose">Choose</option>
                <option value="Manual" data-i18n="Manual">Manual</option>
                <option value="Weighted">Weighted</option>
               
              </select>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-12">
              <div class="form-line right">
                <button
                  type="button"
                  class="btn-default1 btn"
                  data-dismiss="modal"
                  aria-label="Close"
                  data-i18n="Cancel"
                >
                  Cancel
                </button>
                <button
                  class="initative_save_btn"
                  value="Save"
                  onclick="handleUpdateSubKpiSave(event)"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <input type="hidden" name="sub" value="" />
          <input type="hidden" name="action" value="" />
          <input type="hidden" name="editobjectiveId" value="" />
          <input type="hidden" name="kpi_id" id="kpi_id" value="" />
          <input
            type="text"
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
      <hr />
      <div class="modal-footer">
        <div class="d-flex flex-column flex-fill ml-4 mb-5 text-left font-11">
          <div class="d-flex flex-row">
            <p class="kpi_audit">Audit</p>
          </div>
          <div class="d-flex flex-row">
            <div class="d-flex flex-column">
              <p><span>Created By : </span><span id="kpiCreatedBy"></span></p>
              <p>
                <span>Created Date : </span><span id="kpiCreatedByDate"></span>
              </p>
            </div>
            <div class="d-flex flex-column pl-5">
              <p><span>Modified By : </span><span id="kpiUpdatedBy"></span></p>
              <p>
                <span>Modified Date : </span><span id="kpiUpdatedByDate"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> -->


<div id="delete_popup_subKpiold" class="modal fade">
  <div class="modal-dialog modal-confirm">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Delete</h4>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-hidden="true"
        >
          &times;
        </button>
      </div>
      <div class="modal-body">
        <div id="delete_subKpi"></div>
        <h5 class="confirm-modal-content">Do you really want to delete?</h5>
        <br />
        <div class="form-line right">
          <input type="hidden" id="deleterecordid" />
          <input type="hidden" id="deleterecordtype" />
          <button
            type="button"
            class="btn-default1 btn"
            data-dismiss="modal"
            aria-label="Close"
            data-i18n="Cancel"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-danger confirm-modal-deleteBtn"
            onclick="deleteSubKpi()"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</div>


	<div class="modal custom-modal custom-delete-modal fade" id="delete_popup_subKpi" data-backdrop="static"
				data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
				aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" style="--stratroom-modal-width:320px">
					<div class="modal-content">
						<div class="modal-body">
							<div class="card custom-card delete-card border-0">
								<div class="card-body">

									<div class="delete-box">
										<h4 class="title" data-translate="page.orgstructure.delete_confirmation">Do you really want to delete?</h4>
										<div class="btn-wrap">
                      <input type="hidden" id="deleterecordid" />
                      <input type="hidden" id="deleterecordtype" />
											<button type="button" class="btn btn-sm btn-label-secondary rounded-pill"
												data-bs-dismiss="modal" aria-label="Close" data-translate="page.orgstructure.cancel">
												Cancel
											</button>
											<button class="btn btn-sm btn-danger rounded-pill"
												value="Yes" data-translate="page.orgstructure.delete"  onclick="deleteSubKpi()">Delete</button>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
