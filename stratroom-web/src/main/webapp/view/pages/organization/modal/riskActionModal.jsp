<div class="modal custom-modal fade risk_action_desc_popup" id="risk_action_desc_popup" data-bs-backdrop="static"
data-bs-keyboard="false" tabindex="-1" role="dialog"
  aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" data-translate = "Reducing the Possibility"> Reducing the Possibility</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

		<form id="riskActionmonitoringForm">
		<div class="row">
					<div class="form-group col-md-12" id="riskaction_id_wrapper" style="display: none">
						<label for="riskplan_id" data-translate = "ID">ID</label>
						<input type="text" class="modal-custom-input" name="riskaction_id" id="riskaction_id" style="height: 38px !important; width: 98% !important;"/>
					</div>
				</div>
        <div class="card border-0">
        <div class="card-body">
          <div class="grid gap-3">
            <div class="g-col-12">
              <div class="form-group">
              <label for="meeting-name" data-i18n="Name"class="form-label" data-translate = "Name">Name</label>
              <input type="text" class="form-control" id="possibility-name" placeholder="Name" />
            </div>
            </div>
            <div class="g-col-12 g-col-lg-6">
              <label for="type" class="form-label" data-translate = "Risk Impact Category">Risk Impact Category</label>
              <div class="form-group">
              <select id="possibility-category-select" class="form-select selectdrop-add-reducingPossibility" data-placeholder="Select Risk Impact Category">
                <option value="" selected disabled>Select Risk Impact Category"</option>
                <option value="Financial">Financial</option>
                <option value="Operational">Operational</option>
                <option value="Reputation">Reputation</option>
                <option value="Strategic">Strategic</option>
                <option value="Law">Law</option>
              </select>
            </div>
            </div>
            <div class="g-col-12 g-col-lg-6">
              <label for="type" class="form-label" data-translate = "Control Types">Control Types</label>
              <select id="possibility-controltypes-select"  class="form-select selectdrop-add-reducingPossibility" data-placeholder="Select Control Types">
                <option value="" selected disabled>Select Control Types</option>
                <option value="Preventive">Preventive</option>
                <option value="Corrective">Corrective</option>

              </select>
            </div>
            <div class="g-col-12 g-col-lg-6">
              <label for="type" class="form-label" data-translate = "Control Effectivenesss">Control effectivenesss</label>
              <select id="possibility-controleffectiveness-select"  class="form-select selectdrop-add-reducingPossibility" data-placeholder="Select Control Effectivenesss">
                <option value="" selected disabled>Select Control Effectivenesss</option>
                <option value="Fully effective">Fully effective</option>
                <option value="Partially effective">Partially effective</option>
                <option value="Not effective">Not effective</option>
              </select>
            </div>
            <div class="g-col-12 g-col-md-6">
              <label for="reducingPossibilityAdd-Likelihood" class="form-label" data-translate = "Likelihood">Likelihood</label>
              <select id="possibility-likelihood-select"name="reducingPossibilityAdd-Likelihood" class="form-select selectdrop-add-reducingPossibility" data-placeholder="Select Likelihood">
                <option value="" selected disabled>Select Likelihood</option>
                <option value="Rare">Rare</option>
                <option value="Likely">Likely</option>
                <option value="Unlikely">Unlikely</option>
                <option value="possible">possible</option>
                <option value="Almost Certain">Almost Certain</option>
              </select>
            </div>
            <div class="g-col-12 g-col-md-6">
              <label for="reducingPossibilityAdd-impact" class="form-label" data-translate = "Impact">Impact</label>
              <select id="possibility-impact-select" name="" class="form-select selectdrop-add-reducingPossibility" data-placeholder="Select Impact">
                <option value="" selected disabled>Select Impact</option>
                <option value="Insignificant">Insignificant</option>
                <option value="Major">Major</option>
                <option value="Minor">Minor</option>
                <option value="Moderate">Moderate</option>
                <option value="Catastrophic">Catastrophic</option>
              </select>
            </div>
            <div class="g-col-12 g-col-md-6">
              <label for="reducingPossibilityAdd-riskScore" class="form-label" data-translate = "Risk Score">Risk Score</label>
              <input type="text" class="form-control" id="possibility-score" placeholder="" />
            </div>
            <div class="g-col-12 g-col-md-6">
              <label for="reducingPossibilityAdd-resolveBy" class="form-label" data-translate = "Resolve By">Resolve By</label>
              <input type="date" class="form-control" id="possibility-resolve-by" />
            </div>
            <div class="g-col-12 g-col-md-6">
              <label for="reducingPossibilityAdd-status" class="form-label" data-translate = "Status">Status</label>
              <select id="possibility-status-select"  class="form-select selectdrop-add-reducingPossibility" data-placeholder="Select Status">
                <option value="" selected disabled>Select Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div class="g-col-12 g-col-md-6">
              <label for="reducingPossibilityAdd-Progress" class="form-label" data-translate = "Progress %">Progress(%)</label>
              <input type="number" class="form-control" id="possibility-progress" />
            </div>
          </div>
        </div>
		<input type="hidden" name="action"  id="riskActionPlanId" value="" />
				<input type="hidden" name="riskId" id="riskId" />
				<input type="hidden" name="riskPlanId" id="riskPlanId" />
				<input type="hidden" name="activitieschangeid" id="activitieschangeid" />
				<input type="hidden" name="activitieschangeiddraft" id="activitieschangeiddraft" />
				<input type="hidden" name="activitiesriskId" id="activitiesriskId" />
        </div>
		<div class="modal-footer">
        <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close" data-translate = "Cancel">Cancel</button>
        <button class="btn btn-primary" data-translate = "Save">Save</button>
        
      </div>
      </form>
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
	$("#riskActionmonitoringForm").validate({
		rules : {
			action_desc : {
				required : true
			},
			action_status : {
				required : true
			},
			action_date : {
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

