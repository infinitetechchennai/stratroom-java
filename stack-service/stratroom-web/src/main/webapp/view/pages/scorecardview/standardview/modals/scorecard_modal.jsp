<div class="modal fade scorecard_description_popup" tabindex="-1"
	role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content modal-content-setscrollheight">
			<div class="modal-header">
				<h6 class="modal-title" id="myLargeModalLabel" data-i18n="Scorecard">Scorecard
					Description</h6>
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<form id="scorecardForm">
					<div class="form-row">
						<div class="form-group col-md-3" id="scorecard_id_wrapper">
							<label for="scorecard_id">ID</label> <input type="text"
								class="form-control browser-default" name="scorecard_id"
								id="scorecard_id" placeholder="" autocomplete="off">
						</div>
						<div class="form-group col-md-9">
							<label for="scorecard_name" data-i18n="Name">Name</label> <input type="text"
								class="form-control browser-default" name="scorecard_name"
								id="scorecard_name" placeholder="" autocomplete="off" onKeyPress="return scorecardname(event);">
						</div>
					</div>
					<hr />
					<div class="form-group mt--10">
						<label for="scorecard_description">Description</label>
						<textarea class="form-control browser-default"
							name="scorecard_description" id="scorecard_description"
							placeholder="" cols="" rows="6" autocomplete="off"></textarea>
					</div>
					<hr />
					<div class="form-row">
						<div class="form-group browser-default col-md-6">
							<label for="scorecard_owner">Owner</label> <select
								id="scorecard_owner" name="scorecard_owner"
								class="form-control browser-default" style="display: block !important;">
							</select>
						</div>
						
						<div class="form-group col-md-6">
							<label for="" data-i18n="Department">Department</label>
							<select class="form-control select2" name="scorecarddept" id="scorecarddept">
           					</select>
						</div>
					</div>
					<hr/>
					<div class="form-row">
						<!-- div class="form-group col-md-4">
							<label for="scorecard_weight">Weight(%)</label> <input type="text"
								class="form-control browser-default" name="scorecard_weight"
								id="scorecard_weight" autocomplete="off">
						</div>
						<div class="form-group col-md-4">
							<label for="objective_weight">Sub Weight(%)</label> <input
								type="text" class="form-control browser-default"
								name="scorecard_sub_weight" id="scorecard_sub_weight"
								autocomplete="off">
						</div-->
						<div class="form-group col-md-6">
							<label for="kpi_start_end_date" data-i18n="Start/End Date">Start/End Date</label> <input
								type="text" id="date_range" name="date_range"
								class="form-control browser-default date_pickers datepicker-here"
								data-range="true" data-multiple-dates-separator=" - "
								data-language="en" autocomplete="off" />
						</div>
						
						<div class="form-group col-md-6">
							<label for="scorecard_status">Status</label> <select
								id="scorecard_status" name="scorecard_status"
								class="form-control browser-default">
								<option value="" data-i18n="Choose">Choose</option>
								<option value="Manual" data-i18n="Manual">Manual</option>
								<option value="Weighted">Weighted</option>
								<!--option value="First">First</option>
								<option value="Second">Second</option>
								<option value="Third">Third</option>
								<option value="Fourth">Fourth</option-->
							</select>
						</div>
						<!-- <div class="col-md-4">
							<label for="scorecard_attachment">Attachment</label> <input
								type="file" class="" id="perspective_attachment">
						</div>-->
					</div>
					<hr/>
					
					<div class="form-row performancehidescorecard">
	                  <div class="form-group col-md-12 focused">
	                    <label for="objective_name" class="" data-i18n="Performance">Performance</label>
	                    <input type="text" class="form-control browser-default" name="scorecard_formula" id="scorecard_formula" readonly="readonly" data-toggle="modal" data-target=".scorecard_custom_threshold_popup" onclick='handleCustomThresholdEvent("SCORECARDCONFIG")' role="button">
	                  </div>
                	</div>
                	<hr/>	
					<!-- <div class="form-row">
					<div class="form-row mt-2" id="scorecard_reportee">
						<ul class="d-flex flex-row flex-wrap ml-2">
							<li>
								<div class="form-check">
									<div class="form-check">
										<label class="form-check-label"> <input
											class="form-check-input" id="chk_include_reportee"
											type="checkbox" value="Include"> Include <span
											class="form-check-sign"> <span class="check"></span>
										</span>
										</label>
									</div>
								</div>
							</li>
						</ul>
					</div>
					
					<div class="form-group col-md-6">
						<label for="scorecard_owner">Custom </label>
						<select id="scorecard_Custom_reportee" name="perspective_owner[]" class="form-control browser-default perspective-multi-select"
							multiple="multiple">
						</select>
					</div>
				</div> -->

					<div class="form-row customaggregationElement">
						<div class="form-group col-md-12" id="scorecard_reportee">
						<!--<div class="col-12 mt-2" style="display: none" id="ca_input">-->
							<label>Custom Aggregation</label>
							<select id="scorecard_Custom_reportee" name="perspective_owner[]" class="form-control browser-default perspective-multi-select"  multiple="multiple" disabled="disabled" readonly>
							</select>
						<!--</div>-->							
							<!--<div class="row">
								<div class="col-4"><div class="form-check" style="margin-top: 8px">
										<div class="form-check">
											<label class="form-check-label"> 
											<input class="form-check-input" type="checkbox" id="chk_include_reportee"
												value="Include" /> Custom Aggregation 
												<span class="form-check-sign"> 
												<span class="check"></span>
											</span>
											</label>
										</div>
									</div>
								</div>
								<div class="col-12 mt-2" style="display: none" id="ca_input">
									<label>Custom Aggregation</label>
									<select id="scorecard_Custom_reportee" name="perspective_owner[]" class="form-control browser-default perspective-multi-select"  multiple="multiple">
									</select>
								</div>
							</div>-->
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
					<input type="hidden" name="createdById" id="createdById" value="" />
					<input type="hidden" name="action" value="" /> <input
						type="hidden" name="defaultscr" value="" />
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
								<span>Created By : </span><span id="configcreatedBy"></span>
							</p>
							<p>
								<span>Created Date : </span><span id="configcreatedByDate"></span>
							</p>
						</div>
						<div class="d-flex flex-column pl-5">
							<p>
								<span>Modified By : </span><span id="configupdatedBy"></span>
							</p>
							<p>
								<span>Modified Date : </span><span id="configupdatedByDate"></span>
							</p>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</div>
<script>
	jQuery.validator.setDefaults({
		debug : false,
		success : "valid"
	});
	$("#scorecardForm").validate({
		rules : {
			scorecard_name : {
				required : true
			},
			scorecard_owner : {
				required : true
			},
			date_range:{
				required : true
			}
		},
		messages : {
			required : "Please fill all required fields"
		},
		submitHandler : function(form) {
			handleScorecardSave();
		}
	});
	
	
</script>