<div class="modal fade add_plan_desc_add_popup"  id="plan_desc_add_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content">
			
			<div class="modal-header modalheadercolor">
				<h6 class="modal-title" id="myLargeModalLabel_1">Reducing Impact</h6>
				<button type="button" class="close" data-dismiss="modal" id="riskPlanClosePopup"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			
			<div class="modal-body">
				<form id="riskPlanForm">
					<!-- <div class="row">
  						<div class="form-group col-md-12" id="riskplan_id_wrapper" style="display: none">
    						<label for="riskplan_id">ID</label>
    						<input type="text" class="modal-custom-input" name="riskplan_id" id="riskplan_id" style="height: 38px !important; width: 98% !important;"/>
  						</div>
					</div> -->
            					
					<div class="row">

						<div class="form-group col-md-6">
						  <label for="type">Plan Type</label>
						  <select id="plantype-select" class="modal-custom-select" style="height: 40px !important">
							<option data-i18n="Choose">Choose</option>
							<option value="tolerable">Initiative</option>
							<option value="very high">Task</option>
		
						  </select>
						</div>
						<div class="form-group col-md-6">
						  <label for="type">Cause</label>
						  <select id="plancause-select" class="modal-custom-select" style="height: 40px !important">
							<option data-i18n="Choose">Choose</option>
							<option value="tolerable">The Eclears system has a problem. The support system has a problem. The
							  user network has a
							  problem. The storage capacity (EKU sharing folder) of data is problematic. The main site is
							  experiencing problems</option>
		
						  </select>
						</div>
		
					  </div>

                <div class="row m-t-10">
                <div class="form-group col-md-12">
                  <label for="meeting-name" data-i18n="Name">Name</label>
                  <textarea class="form-control" id="riskplan_name" rows="6" style="height: 35px !important;" ></textarea>
                </div>
              </div>
              <div class="row m-t-10">
                <div class="form-group col-md-4">
                  <label for="kpi_start_end_date">Resolve By</label>
                  <i class="far fa-calendar input-calender-icon" style="bottom: 17%"></i>
                  <input type="text" class="modal-custom-input date_pickers_single" data-language="en"
                    name="kpi_start_end_date" id="planresolveby"
                    style="width: 93% !important; height: 60% !important" />
                </div>

                <div class="form-group col-lg-4">
                  <label for="type">Control Types</label>
                  <select id="plan-controltypes-select" class="modal-custom-select" style="height: 40px !important">
                    <option>Choose</option>
                    <option value="tolerable">Preventive</option>
                    <option value="very high">Corrective</option>

                  </select>
                </div>
                <div class="form-group col-lg-4">
                  <label for="type"> Control effectivenesss</label>
                  <select id="plan-controleffectiveness-select" class="modal-custom-select" style="height: 40px !important">
                    <option data-i18n="Choose">Choose</option>
                    <option value="tolerable">Fully effective</option>
                    <option value="very high"> Partially effective</option>
                    <option value="very high"> Not effective</option>
                  </select>
                </div>
                <div class="form-group col-lg-4">
                  <label for="type">Risk Impact Category</label>
                  <select id="plan-category-select" class="modal-custom-select" style="height: 40px !important">
                    <option data-i18n="Choose">Choose</option>
                    <option value="tolerable" data-i18n="Financial">Financial</option>
                    <option value="very high">Operational</option>
                    <option value="very low">Reputation</option>
                    <option value="very low">Strategic</option>
                    <option value="very low">Law</option>
                  </select>
                </div>
                <div class="form-group col-md-4">
                  <label for="impact" data-i18n="Likelihood">Likelihood</label>
                  <select style="height: 40px !important" id="plan-likelihood-select" name="" class="modal-custom-select">
                    <option data-i18n="Choose">Choose</option>
                    <option>Rare</option>
                    <option>Likely</option>
                    <option>Unlikely</option>
                    <option>possible</option>
                    <option>Almost Certain</option>
                  </select>
                </div>


                <div class="form-group col-md-4">
                  <label for="impact" data-i18n="Impact">Impact</label>
                  <select style="height: 40px !important" id="plan-impact-select" name="" class="modal-custom-select">
                    <option data-i18n="Choose">Choose</option>
                    <option>Insignificant</option>
                    <option>Major</option>
                    <option>Minor</option>
                    <option>Moderate</option>
                    <option>Catastrophic</option>
                  </select>
                </div>
                <div class="form-group col-md-4">
                  <label for="objective_name">Risk Score</label>
                  <input id="plan-score" type="text" class="modal-custom-input" style="width: 94% !important;height: 38px !important"
                    value="" disabled />
                </div>
                <div class="form-group col-md-4">
                  <label for="meeting-name">Progress(%)</label>
                  <input type="number" class="modal-custom-input" id="plan-progress-name"
                    style="height: 60% !important; width: 92% !important" placeholder="" />
                </div>
                <div class="form-group col-md-4">
                  <label for="type" data-i18n="Action">Action</label>
                  <select id="plan-action-select" class="modal-custom-select" style="height: 40px !important">
                    <option data-i18n="Choose">Choose</option>
                    <option value="tolerable">Avoid</option>
                    <option value="very high">Reduce</option>
                    <option value="very low">Share</option>
                    <option value="very low">Transfer</option>
                    <option value="very low">Accept</option>
                    <option value="very low"> Mitigate</option>


                  </select>
                </div>

              </div>
                
				<div class="row m-t-10" style="margin-left: 0% !important">
					<div class="col-md-12">
					  <hr />
					</div>
					<div class="col-12">
						<div class="form-line right">
							<button type="button" class="btn btn-label-secondary btn-default1 btn"
									data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
							<button class="initative_save_btn" id="submitplanevent" data-i18n="Save">
							  Save
							</button>
						</div>
					</div>
				</div>
				
      			 <input type="hidden" name="action" id="riskplanaction" value="" />
				 <input type="hidden" name="riskPlanCreatedById" id="activCreatedById" value="" />
				 <input type="hidden" name="riskId" id="riskId" />  
         <input type="hidden" name="riskPlanchangeiddraft" id="riskPlanchangeiddraft" value="" />       
         <input type="hidden" name="riskPlanriskId" id="riskPlanriskId" value="" /> 
				</form>
			</div>
			
			<div class="modal-footer">
              <div class="d-flex flex-column flex-fill ml-4 mb-5 text-left font-11">
                <div class="d-flex flex-row">
                  <p class="kpi_audit">Audit</p>
                </div>
                <div class="d-flex flex-row">
                  <div class="d-flex flex-column">
							<p>
								<span>Created By : </span><span id="riskPlanCreatedBy"></span>
							</p>
							<p>
								<span>Created Date : </span><span id="riskPlanCreatedByDate"></span>
							</p>
						</div>
						<div class="d-flex flex-column pl-5">
							<p>
								<span>Modified By : </span><span id="riskPlanUpdatedBy"></span>
							</p>
							<p>
								<span>Modified Date : </span><span id="riskPlanUpdatedByDate"></span>
							</p>
						</div>
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
	$("#riskPlanForm").validate({
		rules : {
			riskplan_name : {
				required : true
			}
		},
		messages : {
			required : "Name is required"
		},
		submitHandler : function(form) {
			handleRiskPlanSave("RiskPlan");
		}
	});
</script>