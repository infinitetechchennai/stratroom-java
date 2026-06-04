<div class="modal fade" id="activity_desc_add_popup" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content">
			<div class="modal-header modalheadercolor">
				<h6 class="modal-title" id="myLargeModalLabel_1">Action Description</h6>
				<button type="button" class="close" id="activClosePopup"
					data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<form id="riskActivitiesForm">
					<div class="row">
						<div class="form-group col-md-12"  id="activities_id_wrapper" style="display: none">
							<label for="activities_id">ID</label> 
							<input type="text" class="modal-custom-input" name="activities_id" id="activities_id" placeholder="" style="width: 97% !important; height: 38px !important;"/>
						</div>
					</div>
					<div class="row">
						<div class="form-group col-md-12">
							<label for="sub_initative_desc" data-i18n="Name">Name</label>
							<textarea class="modal-custom-textarea" name="activities_desc" id="activities_desc" placeholder="" cols="" rows="6" autocomplete="off" style="height: 35px !important;" ></textarea>
						</div>
					</div>
					
				 <div class="row m-t-10">
                  <div class="form-group col-md-6">
                    <label for="kpi_start_end_date">Resolve By</label>
                    <i class="far fa-calendar input-calender-icon"></i>
                    <input type="text" class="modal-custom-input date_pickers_single datepicker-here" data-language="en" id="activitiesresolved" name="activitiesresolved" style="width: 96% !important; height: 38px !important;" autocomplete="off"/>
                  </div>
                  
                  <div class="form-group col-md-6">
                    <label for="type">Status</label>
                    <select id="activitiesstatus" name="activitiesstatus" class="modal-custom-select" style="height: 40px !important;">
                      <option value="" data-i18n="Choose">Choose</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  
                </div>
					
				<div class="row m-t-10">
                  <div class="form-group col-md-12">
                    <label for="meeting-name">Progress(%)</label>
                    <input type="number" min="0" max="100" class="modal-custom-input" id="activitiesprogress" name="activitiesprogress" style="height: 38px !important; width: 98% !important;" autocomplete="off"/>
                  </div>
                </div>
				
				<div class="row m-t-10">
					<div class="col-md-12">
					  <hr />
					</div>
					<div class="col-12">
						<div class="form-line right">
							<button type="button" class="btn btn-label-secondary btn-default1 btn"
									data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
							<button class="initative_save_btn activitysubmit" data-i18n="Save">
							  Save
							</button>
						</div>
					</div>
				</div>
				
        			<input type="hidden" name="action" value="" />
        			<input type="hidden" name="id" value="" />
				 	<input type="hidden" name="riskPlanId" id="riskPlanId" value="" />
				</form>
			
			</div>
			<div class="modal-footer">
				<div
					class="d-flex flex-column flex-fill ml-4 mb-5 text-left font-11">
					<div class="d-flex flex-row">
						<p class="kpi_audit">Audit</p>
					</div>
					<div class="d-flex flex-row">
						<div class="d-flex flex-column">
							<p>
								<span>Created By : </span><span id="activCreatedBy"></span>
							</p>
							<p>
								<span>Created Date : </span><span id="activCreatedByDate"></span>
							</p>
						</div>
						<div class="d-flex flex-column pl-5">
							<p>
								<span>Modified By : </span><span id="activUpdatedBy"></span>
							</p>
							<p>
								<span>Modified Date : </span><span id="activUpdatedByDate"></span>
							</p>
						</div>
					</div>
				</div>
			</div>
		
	</div>
</div>
</div>

<script>
		 $(document).ready(function () {

	jQuery.validator.setDefaults({
		debug : false,
		success : "valid"
	});
	$("#riskActivitiesForm").validate({
		rules : {
			activities_desc : {
				required : true
			},
			activitiesstatus : {
				required : true
			},
			activitiesprogress : {
				required : true,
				digits: true,
				min:0,
				max:100
			},
			activitiesresolved : {
				required : true
			}
		},
		messages : {
			required : "Name is required"
		},
		submitHandler : function(form) {
			handleRiskActivitiesSave();
		}
	});
});
</script>