<div class="modal fade perspectives_description_popup" tabindex="-1"
	role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content modal-content-setscrollheight">
			<div class="modal-header">
				<h6 class="modal-title" id="myLargeModalLabel">Perspective
					Description</h6>
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<form id="perspectiveForm" style="display:none">
					<div class="form-row">
						<div class="form-group col-md-2" id="perspective_id_wrapper" style="display:none">
							<label for="perspective_id">ID</label> <input type="text"
								class="form-control browser-default" name="perspective_id"
								id="perspective_id" placeholder="">
						</div>
						<div class="form-group col-md-10">
							<label for="perspective_name" data-i18n="Name">Name</label> <input type="text"
								class="form-control browser-default" name="perspective_name"
								id="perspective_name" placeholder="" autocomplete="off">
						</div>
					</div><hr/>
					<div class="form-row">
						<div class="form-group col-md-12">
							<label for="perspective_description">Description</label>
							<textarea class="form-control browser-default"
								name="perspective_description" id="perspective_description"
								placeholder="" cols="" rows="6" autocomplete="off"></textarea>
						</div>
					</div><hr/>
					<div class="form-row">
						<div class="form-group browser-default col-md-6">
							<label for="perspective_owner">Owner</label> <select
								id="perspective_owner" name="perspective_owner" class="form-control browser-default" style="display: block !important;">
							</select>
						</div>
						<div class="form-group col-md-6">
							<label for="kpi_start_end_date" data-i18n="Start/End Date">Start/End Date</label> 
							<input type="text" class="form-control browser-default date_pickers" data-range="true" data-multiple-dates-separator=" - " data-language="en" id="perspective_start_end_date" name="perspective_start_end_date" autocomplete="off"/>
						</div>
					</div><hr/>
					<div class="form-row perspectiveperformanceElement">
						<div class="form-group col-md-12">
							<label for="obj_custom_perspective" data-i18n="Performance">Performance</label> 
							<input type="text" class="form-control browser-default"  name="custom_perspective" id="custom_perspective" readonly="readonly" data-toggle="modal" data-target=".perspective_custom_threshold_popup" onclick='handleCustomThresholdEvent("PERSPECTIVE")'/>	
						</div>
					</div>	
					<hr class="perspectiveperformanceElement"/>	
					<div class="form-row">
						<div class="form-group col-md-4">
							<label for="perspective_weight" data-i18n="Weight(%)">Weight(%)</label> <input type="text"
								class="form-control browser-default" name="perspective_weight"
								id="perspective_weight" autocomplete="off">
						</div>
						<div class="form-group col-md-4">
                                    <label for="objective_weight" data-i18n="Sub Weight(%)">Sub Weight(%)</label>
                                    <input type="text" class="form-control browser-default" name="perspective_sub_weight"
                                        id="perspective_sub_weight" autocomplete="off">
                                </div>
						<div class="form-group col-md-4">
							<label for="perspective_status">Status</label> <select name="perspective_status"
								id="perspective_status" name="" class="form-control browser-default">
								<option value="0" data-i18n="Choose">Choose</option>
								<option value="Manual" data-i18n="Manual">Manual</option>
								<option value="Weighted">Weighted</option>
								<!--option value="First">First</option>
								<option value="Second">Second</option>
								<option value="Third">Third</option>
								<option value="Fourth">Fourth</option-->
							</select>
						</div>
					</div><hr/>
					<div class="row mt-2">
						<div class="col-12">
							<div class="form-line right">
								<button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
								<button type="submit" class="initative_save_btn" value="Save" data-i18n="Save">Save</button>
							</div>
						</div>
					</div>	
					<input type="hidden" name="createdById" id="createdById" value="" />
					<input type="hidden" name="action" value="" />
					<input type="hidden" name="defaultscr" value="" />
					<input type="hidden" name="scorecardweight" value="" />
					<input type="hidden" name="scoreCardDetailsId" id="scoreCardDetailsId" value="" />
					<input type="hidden" name="scorecardFormula" id="perspectivescorecardFormula" value="" />
					<input type="hidden" name="perspectiveId" id="perspectiveId" value="" />
					<input type="hidden" name="perspectiveheader3" id="perspectiveheader3" value="" />
					<input type="hidden" id="perspectivecustomreportee" value="" />
					<input type="hidden" name="perspectiveheader4" id="perspectiveheader4" value="" />
					<input type="hidden" name="perspectiveheader5" id="perspectiveheader5" value="" />
					<input type="hidden" name="perspectiveheader6" id="perspectiveheader6" value="" />
					<input type="hidden" name="perspectiveheader7" id="perspectiveheader7" value="" />
					
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
								<span >Created By : </span><span id="createdBy"></span>
							</p>
							<p>
								<span>Created Date : </span><span id="createdByDate"></span>
							</p>
						</div>
						<div class="d-flex flex-column pl-5">
							<p>
								<span>Modified By : </span><span id="updatedBy"></span>
							</p>
							<p>
								<span>Modified Date : </span><span id="updatedByDate"></span>
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
	$("#custom_perspective")
			.click(function() {
							var link = '<a href="#" id="perspective_custom_trigger"'
									+ 'data-toggle="modal"'
									+ 'data-target=".perspective_custom_threshold_popup"'
									+ 'onclick=handleCustomThresholdEvent("PERSPECTIVE")></a>';
							$("#check").append(link);
					});
});*/
	jQuery.validator.setDefaults({
		  debug: false,
		  success: "valid"
		});
		$( "#perspectiveForm" ).validate({
		  rules: {
			  perspective_name: {
		      required: true
		    },
			perspective_owner: {
		      required: true
		    },
		    perspective_start_end_date:{
		    	required: true
		    }
		  },
		   messages: {
	            required: "Fill in all Required information"
	        },
	        submitHandler: function(form) {
	            handlePerspectiveSave();
	        }
		});
</script>