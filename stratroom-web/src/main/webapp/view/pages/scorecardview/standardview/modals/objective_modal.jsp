
<div class="modal fade objective_description_popup" tabindex="-1"
	role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content modal-content-setscrollheight">
			<div class="modal-header">
				<h6 class="modal-title" id="myLargeModalLabel">Objective
					Description</h6>
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<form id="objectiveForm" style="display:none">
					<div class="form-row">
						<div class="form-group col-md-3" id="objective_id_wrapper" style="display:none">
							<label for="objective_id">ID</label> <input type="text"
								class="form-control browser-default" name="objective_display_id"
								id="objective_display_id" placeholder="">
						</div>
						<div class="form-group col-md-9 objectivenamediv">
							<label for="objective_name" data-i18n="Name">Name</label> <input type="text"
								class="form-control browser-default" name="objective_name"
								id="objective_name" placeholder="" autocomplete="off">
						</div>
					</div><hr/>
					<div class="form-row">
						<div class="form-group col-md-12">
							<label for="objective_description">Description</label>
							<textarea class="form-control browser-default"
								name="objective_description" id="objective_description"
								placeholder="" cols="" rows="6" autocomplete="off"></textarea>
						</div>
					</div><hr/>
					<div class="form-row">
						<div class="form-group browser-default col-md-6">
							<label for="objective_owner">Owner</label> <select
								id="objective_owner" name="objective_owner" class="form-control browser-default" style="display: block !important;">
							</select>
						</div>
						<div class="form-group col-md-6">
							<label for="kpi_start_end_date" data-i18n="Start/End Date">Start/End Date</label> 
							<input type="text" name="objective_start_end_date" id="objective_start_end_date" class="form-control browser-default date_pickers"  data-range="true" data-multiple-dates-separator=" - " data-language="en" autocomplete="off"/>
						
						</div>
					</div>
					<hr/>
					<div class="form-row objectiveperformanceElement">
						<div class="form-group col-md-12">
							<label for="obj_custom_objective" data-i18n="Performance">Performance</label> 
							<input type="text" class="form-control browser-default"  name="custom_objective" id="custom_objective" readonly="readonly" data-toggle="modal" data-target=".objective_custom_threshold_popup" onclick='handleCustomThresholdEvent("OBJECTIVE")'>	
						</div>
					</div>	
					<hr class="objectiveperformanceElement"/>
					<div class="form-row">
						<div class="form-group col-md-4">
							<label for="objective_weight" data-i18n="Weight(%)">Weight(%)</label> 
							<input type="text" class="form-control browser-default" name="objectiveweight" id="objectiveweight" autocomplete="off">
						</div>
						<div class="form-group col-md-4">
                                    <label for="objective_weight" data-i18n="Sub Weight(%)">Sub Weight(%)</label>
                                    <input type="text" class="form-control browser-default" name="objective_sub_weight"
                                        id="objective_sub_weight" autocomplete="off">
                                </div>
						<div class="form-group col-md-4">
							<label for="objective_start_end_date">Status</label> <select
								id="objective_status" name="" class="form-control browser-default">
								<option value="0" data-i18n="Choose">Choose</option>
								<option value="Manual" data-i18n="Manual">Manual</option>
								<option value="Weighted">Weighted</option>
								<!--option value="First">First</option>
								<option value="Second">Second</option>
								<option value="Third">Third</option>
								<option value="Fourth">Fourth</option-->
							</select>
						</div>
					</div>
					<hr>
					
					<div class="row mt-2">
					  <div class="col-12">
						<div class="form-line right">
						  <button type="button" class="btn-default1 btn"
									data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
						  <button class="scorecard_save_btn" value="Save" data-i18n="Save">Save</button>
						</div>
					  </div>
					</div>
					<input type="hidden" name="action" value="" />
					<input type="hidden" name="objCreatedById" id="objCreatedById" value="" />
					<input type="hidden" name="scoreCardId" value="" />
					<input type="hidden" name="objective_id" id="objective_id" value="" />
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
								<span >Created By : </span><span id="objCreatedBy"></span>
							</p>
							<p>
								<span>Created Date : </span><span id="objCreatedByDate"></span>
							</p>
						</div>
						<div class="d-flex flex-column pl-5">
							<p>
								<span>Modified By : </span><span id="objUpdatedBy"></span>
							</p>
							<p>
								<span>Modified Date : </span><span id="objUpdatedByDate"></span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script>
		/*$(document).ready(function() {
			$("#custom_objective")
					.click(function() {
									var link = '<a href="#" id="objective_custom_trigger"'
											+ 'data-toggle="modal"'
											+ 'data-target=".objective_custom_threshold_popup"'
											+ 'onclick=handleCustomThresholdEvent("OBJECTIVE")></a>';
									$("#check").append(link);
							});
		});*/
	jQuery.validator.setDefaults({
		  debug: false,
		  success: "valid"
		});
		$( "#objectiveForm" ).validate({
		  rules: {
			  objective_name: {
		      required: true
		    },
		    objective_owner: {
		      required: true
		    },objective_start_end_date:{
		    	required: true
		    }
		  },
		   messages: {
	            required: "Name is required"
	        },
	        submitHandler: function(form) {
	        	handleObjectiveSave();
	        }
		});
</script>