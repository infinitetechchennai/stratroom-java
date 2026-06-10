
<div class="modal fade kpi_description_popup" role="dialog"
	aria-labelledby="myLargeModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content modal-content-setscrollheight">
			<div class="modal-header">
				<h6 class="modal-title" id="myLargeModalLabel">KPI Description</h6>
				<button type="button" id="closeKpimodal" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<form id="kpiForm" style="display: none">
					<div class="form-row">
						<div class="form-group col-md-2" id="kpi_id_wrapper"
							style="display: none">
							<label for="kpi_id">ID</label> <input type="text"
								class="form-control browser-default" name="kpi_display_id"
								id="kpi_display_id" placeholder="" readonly>
						</div>
						<div class="form-group col-md-8">
							<label for="kpi_name" data-i18n="Name">Name</label> <input type="text"
								class="form-control browser-default" name="kpi_name"
								id="kpi_name" placeholder="" autocomplete="off">
						</div>
						<div class="form-group col-md-2">
							<label for="objective_start_end_date" data-i18n='Polarity'>Polarity</label> <select
								id="kpi_type" name="kpi_type" class="form-control browser-default">
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
							<textarea class="form-control browser-default"
								name="kpi_description" id="kpi_description" placeholder=""
								cols="" rows="6" autocomplete="off"></textarea>
						</div>
					</div>
					<hr />
					<div class="form-row">
						<div class="form-group browser-default col-md-4">
							<label for="kpi_measurement" data-i18n="Measurement Frequency">Measurement Frequency</label> <select
								id="kpi_measurement" name="kpi_measurement"
								class="form-control mt-1">
								<option value="" data-i18n="Choose">Choose</option>
								<option value="Monthly" data-i18n="Monthly">Monthly</option>
								<option value="Quarterly" data-i18n="Quarterly">Quarterly</option>
								<option value="Half Yearly" data-i18n="Half Yearly">Half Yearly</option>
								<option value="Annually" data-i18n="Annually">Annually</option>
							</select>
						</div>
						<div class="form-group browser-default col-md-4">
							<label for="kpi_owner">Owner</label> <select id="kpi_owner"
								name="kpi_owner" class="form-control mt-1"
								style="display: block !important;">
							</select>
						</div>
						<div class="form-group browser-default col-md-4">
							<label for="kpi_datasource" data-i18n="Data Source">Data Source</label> <select
								id="kpi_datasource" name="kpi_datasource"
								class="form-control mt-1">
								<option data-i18n="Choose">Choose</option>
								<option value="Manual" data-i18n="Manual">Manual</option>
								<option value="Source" data-i18n="Source">Source</option>
							</select>
						</div>
					</div>
					<hr />
					<!-- <div class="form-row mt-4">
						<label for="kpi_fields" class="ml-2 mr-3">KPI Fields </label>
						<ul class="d-flex flex-row flex-wrap ml-2">
							<li>
								<div class="form-check">
									<div class="form-check">
										<label class="form-check-label"> <input
											name="kpi_fields" class="form-check-input" type="checkbox"
											value="Actual"> Actual <span class="form-check-sign">
												<span class="check"></span>
										</span>
										</label>
									</div>
								</div>
							</li>
							<li>
								<div class="form-check">
									<div class="form-check">
										<label class="form-check-label"> <input
											name="kpi_fields" class="form-check-input" type="checkbox"
											value="Target"> Target <span class="form-check-sign">
												<span class="check"></span>
										</span>
										</label>
									</div>
								</div>
							</li>
							<li>
								<div class="form-check">
									<div class="form-check">
										<label class="form-check-label"> <input
											name="kpi_fields" class="form-check-input" type="checkbox"
											value="Budget"> Budget <span class="form-check-sign">
												<span class="check"></span>
										</span>
										</label>
									</div>
								</div>
							</li>
							<li>
								<div class="form-check">
									<div class="form-check">
										<label class="form-check-label"> <input
											name="kpi_fields" class="form-check-input" type="checkbox"
											value="Forecast"> Forecast <span
											class="form-check-sign"> <span class="check"></span>
										</span>
										</label>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<hr> -->

					<div class="form-row kpiactualdisplay">
						<div class="form-group col-md-12">
							<label for="inputState" data-i18n="Actual">Actual</label> <input type="text"
								class="form-control browser-default kpi_formula" name="kpi_formula"
								id="" readonly> <a href="#" class="kpi_trigger"
								data-toggle="modal" data-target=".kpi_formula_popup"
								onclick="handleFormulaEvent('KPI')"></a>
							<!-- input type="text"
								class="form-control browser-default" name="kpi_formula"
								id="kpi_formula"-->
						</div>
						<!-- <div class="form-group col-md-4 kpitargetdisplay">
							<label for="kpi_name">Target</label> <input type="text"
								class="form-control browser-default" name="targetamount"
								id="targetamount" placeholder="" autocomplete="off">
						</div>-->
					</div>
					<hr class="kpiactualdisplay"/>
					<div class="form-row kpiperformanceElement">
						<div class="form-group col-md-12">
							<label for="obj_custom_objective" data-i18n="Performance">Performance</label> 
							<input type="text" class="form-control browser-default"  name="kpi_performance" id="kpi_performance" readonly="readonly" autocomplete="off"
							data-toggle="modal" data-target=".kpi_performanceformula_popup"  onclick='handleFormulaEvent("KPIPERFORMANCE")'>	
						</div>
					</div><hr class="kpiperformanceElement"/>
					
					<div class="form-row">	
						<div class="form-group col-md-6 kpiytdElement">
							<label for="inputState">Year To Date (YTD)</label>
							
												<input type="text" class="form-control browser-default kpiYtdFormula"
													name="kpiYtdFormula" id="" autocomplete="off"
													readonly><a href="#" class="kpiYtdFormulaTrigger" data-toggle="modal" data-target=".kpiYtdFormulaPoPUp" onclick="handleYTDFormulaEvent()"></a>
											
						</div>
						<div class="form-group col-md-3 kpikpitypedisplay">
							<label for="kpiDataType">KPI Type</label> <select id="kpiDataType" name="kpiDataType"
								class="form-control browser-default">
								<option value="" data-i18n="Choose">Choose</option>
								<option value="Number" data-i18n="Number">Number</option>
								<option value="Percentage" data-i18n="Percentage">Percentage</option>
								<option value="Currency" data-i18n="Currency">Currency</option>
							</select>
						</div>
						<div class="form-group col-md-3 kpiCurrencyfield" style="display:none;">
							<label for="inputState">KPI Currency</label>
								<input type="text" class="form-control browser-default"
									name="kpiCurrencyvalue" id="kpiCurrencyvalue" autocomplete="off">
							
						</div>
						<!--<div class="form-group col-md-3">
							<label for="kpi_threshold">Threshold</label> <select
								id="kpi_threshold" class="form-control browser-default">
								<option value="">Choose</option>
								
								<option value="option_2">Three Status</option>
							</select>
						</div>-->
						<!-- <option value="option_1">Two Status</option>
						<option value="option_3">Five Status</option>-->
					</div><hr/>	
					<div class="form-row">

						<div class="form-group col-md-3">
							<label for="kpi_threshold" data-i18n="Threshold">Threshold</label> 
							<input type="text" id="kpi_threshold" class="form-control browser-default"
							name="kpi_threshold" readonly>
											</div>
						<!--<option value="">Choose</option>
								<option value="option_1">Two Status</option>
								<option value="option_3">Five Status</option>-->
						<!-- <div class="form-group col-md-3 color_picks_1"
							style="display: none;">
							<div class="input-group m-t-24" style="width:90%">
								<input id="optioncolor1" type="text"
									class="form-control browser-default">
								<div class="input-group-append">
									<span class="input-group-text pickr"></span>
								</div>
							</div>
						</div>

						<div class="form-group col-md-3 color_picks_1"
							style="display: none;">
							<div class="input-group m-t-24" style="width:90%">
								<input id="optioncolor2" type="text"
									class="form-control browser-default">
								<div class="input-group-append">
									<span class="input-group-text pickr"></span>
								</div>
							</div>
						</div>-->


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

						<!-- <div class="form-group col-md-3 color_picks_3"
							style="display: none;">
							<div class="input-group m-t-24" style="width:90%">
								<input id="optioncolor1" type="text"
									class="form-control browser-default">
								<div class="input-group-append">
									<span class="input-group-text pickr"></span>
								</div>
							</div>
						</div>

						<div class="form-group col-md-3 color_picks_3"
							style="display: none;">
							<div class="input-group m-t-24" style="width:90%">
								<input id="optioncolor2" type="text"
									class="form-control browser-default">
								<div class="input-group-append">
									<span class="input-group-text pickr"></span>
								</div>
							</div>
						</div>

						<div class="form-group col-md-3 color_picks_3"
							style="display: none;">
							<div class="input-group m-t-24" style="width:90%">
								<input id="optioncolor3" type="text"
									class="form-control browser-default">
								<div class="input-group-append">
									<span class="input-group-text pickr"></span>
								</div>
							</div>
						</div>

						<div class="form-group col-md-3 color_picks_3"
							style="display: none;">
							<div class="input-group m-t-24" style="width:90%">
								<input id="optioncolor4" type="text"
									class="form-control browser-default">
								<div class="input-group-append">
									<span class="input-group-text pickr"></span>
								</div>
							</div>
						</div>

						<div class="form-group col-md-3 color_picks_3"
							style="display: none;">
							<div class="input-group m-t-24" style="width:90%">
								<input id="optioncolor5" type="text"
									class="form-control browser-default">
								<div class="input-group-append">
									<span class="input-group-text pickr"></span>
								</div>
							</div>
						</div> -->
					</div>
					<hr/>
					<!--<div class="form-row">
						<div class="form-group col-md-6">
						<label for="inputState">Custom Threshold</label>
							<input type="text" class="form-control position-static browser-default" 
													name="kpi_custom_threshold" id="kpi_custom_threshold" autocomplete="off"
													readonly disabled data-toggle="modal" data-target=".kpi_custom_threshold_popup"  onclick='handleCustomThresholdEvent("KPI")'><a id="check"></a>				
						</div>
						<div class="form-group col-md-3">
							<label for="kpiCurrency">KPI Currency</label> 
							<input type="text" class="form-control browser-default"
													name="kpiCurrency" id="kpiCurrency" autocomplete="off">
						</div>
						<div class="form-group col-md-8">
							<label for="inputState">Custom Threshold</label>

												 <label  class="form-check-label">
													<input name="check_custhreshold" class="form-check-input"
													id="chk_custom_threshold" type="checkbox" value="Enable">
													<span class="form-check-sign"> <span
														class="check"></span>
												</span>
												</label>

												<input type="text" class="form-control browser-default"
													name="kpi_custom_threshold" id="kpi_custom_threshold" data-toggle="modal" data-target=".kpi_custom_threshold_popup"  onclick=handleCustomThresholdEvent("KPI")' readonly>
				
						</div>
						<div class="form-group col-md-3">
							<label for="kpiCurrency">KPI Currency</label> 
							<input type="text" class="form-control browser-default"
													name="kpiCurrency" id="kpiCurrency">
						</div>
						
					</div>
					
						
					<hr />-->
					<div class="form-row">
						<div class="form-group col-md-3">
							<label for="kpi_start_end_date" data-i18n="Start/End Date">Start/End Date</label> <input
								type="text"
								class="form-control browser-default datepicker-here date_pickers"
								data-range="true" data-multiple-dates-separator=" - "
								data-language="en" id="kpi_start_end_date"
								name="kpi_start_end_date" autocomplete="off">
						</div>
						<div class="form-group col-md-3">
							<label for="kpi_weight" data-i18n="Weight(%)">Weight(%)</label> <input type="text"
								class="form-control browser-default" name="kpi_weight"
								id="kpi_weight" autocomplete="off">
						</div>
						<div class="form-group col-md-3">
							<label for="kpi_weight" data-i18n="Sub Weight(%)">Sub Weight(%)</label> <input type="text"
								class="form-control browser-default" name="kpi_sub_weight"
								id="kpi_sub_weight" autocomplete="off">
						</div>

						<div class="form-group col-md-3">
							<label>Status</label> <select
								id="inputState" class="form-control browser-default">
								<option value="" data-i18n="Choose">Choose</option>
								<option value="Manual" data-i18n="Manual">Manual</option>
								<option value="Weighted">Weighted</option>
								<!--option value="First">First</option>
								<option value="Second">Second</option>
								<option value="Third">Third</option>
								<option value="Fourth">Fourth</option-->
							</select>
						</div>
					</div>
					
			<div class="row mt-2">
              <div class="col-12">
                <div class="form-line right">
                  <button type="button" class="btn-default1 btn"
							data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
					<button type="submit" class="initative_save_btn" value="Save" data-i18n="Save">Save</button>
                </div>
              </div>
            </div>
					<input type="hidden" name="action" value="" /> <input
						type="hidden" name="objectiveId" value="" /> <input type="hidden"
						name="kpi_id" id="kpi_id" value="" /> <input type="hidden"
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
</div>

<script>

	
	$(document).ready(function() {
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
		debug : false,
		success : "valid"
	});
	$("#kpiForm").validate({
		rules : {
			kpi_name : {
				required : true
			},
			kpi_owner : {
				required : true
			},
			kpi_type:{
				required : true
			},
			kpiDataType:{
				required : true
			},
			kpi_start_end_date:{
				required : true
			},
			kpi_measurement:{
				required : true
			}
		},
		messages : {
			required : "Name is required"
		},
		submitHandler : function(form) {
			handleKpiSave();
		}
	});
</script>