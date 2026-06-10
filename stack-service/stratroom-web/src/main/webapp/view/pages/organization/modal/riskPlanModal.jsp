<div class="modal custom-modal fade plan_desc_add_popup"  data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
    <div class="modal-content">
      <div class="modal-header modalheadercolor">
        <h5 class="modal-title" data-translate="Reducing Impact">Reducing Impact</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" id="riskPlanClosePopup" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="riskPlanForm">
          <div class="card border-0">
            <div class="card-body">
              <div class="grid gap-3">
                <!-- Hidden ID field -->
                <div class="g-col-12" id="riskplan_id_wrapper" style="display: none">
                  <div class="form-group">
                    <label for="riskplan_id" class="form-label" data-translate="ID">ID</label>
                    <input type="text" class="form-control" name="riskplan_id" id="riskplan_id">
                  </div>
                </div>
                
                <!-- Plan Type and Cause fields -->
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="plantype-select" class="form-label" data-translate="Plan Type">Plan Type</label>
                    <select id="plantype-select" class="form-select">
                      <option data-i18n="Choose">Choose</option>
                      <option value="tolerable">Initiative</option>
                      <option value="very high">Task</option>
                    </select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="plancause-select" class="form-label" data-translate="Casue">Cause</label>
                    <input type="hidden" name="selectcauseId" id="selectcauseId" value="">
                    <select id="plancause-select" class="form-select">
                      <option data-i18n="Choose">Choose</option>
                      <option value="tolerable">The Eclears system has a problem. The support system has a problem. The user network has a problem. The storage capacity (EKU sharing folder) of data is problematic. The main site is experiencing problems</option>
                    </select>
                  </div>
                </div>
                
                <!-- Name field -->
                <div class="g-col-12">
                  <div class="form-group">
                    <label for="riskplan_name" class="form-label" data-translate="Name">Name</label>
                    <textarea class="form-control" id="riskplan_name" rows="1" style="white-space:pre-wrap;"></textarea>
                  </div>
                </div>
                
                <!-- First row of fields -->
                <div class="g-col-12 g-col-md-4">
                  <div class="form-group">
                    <label for="planresolveby" class="form-label" data-translate="Resolve By">Resolve By</label>
                    <input type="date" class="form-control" data-language="en" name="kpi_start_end_date" id="planresolveby">
                  </div>
                </div>
                <div class="g-col-12 g-col-md-4">
                  <div class="form-group">
                    <label for="plan-controltypes-select" class="form-label" data-translate="Control Types">Control Types</label>
                    <select id="plan-controltypes-select" class="form-select">
                      <option data-i18n="Choose">Choose</option>
                      <option value="tolerable">Preventive</option>
                      <option value="very high">Corrective</option>
                    </select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-4">
                  <div class="form-group">
                    <label for="plan-controleffectiveness-select" class="form-label" data-translate="Control Effectiveness">Control effectiveness</label>
                    <select id="plan-controleffectiveness-select" class="form-select">
                      <option data-i18n="Choose">Choose</option>
                      <option value="tolerable">Fully effective</option>
                      <option value="very high">Partially effective</option>
                      <option value="very high">Not effective</option>
                    </select>
                  </div>
                </div>
                
                <!-- Second row of fields -->
                <div class="g-col-12 g-col-md-4">
                  <div class="form-group">
                    <label for="plan-category-select" class="form-label" data-translate="Risk Impact Category">Risk Impact Category</label>
                    <select id="plan-category-select" class="form-select">
                      <option data-i18n="Choose">Choose</option>
                      <option value="tolerable" data-i18n="Financial">Financial</option>
                      <option value="very high">Operational</option>
                      <option value="very low">Reputation</option>
                      <option value="very low">Strategic</option>
                      <option value="very low">Law</option>
                    </select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-4">
                  <div class="form-group">
                    <label for="plan-likelihood-select" class="form-label" data-translate="Likelihood">Likelihood</label>
                    <select id="plan-likelihood-select" name="" class="form-select">
                      <option data-i18n="Choose">Choose</option>
                      <option>Rare</option>
                      <option>Likely</option>
                      <option>Unlikely</option>
                      <option>possible</option>
                      <option>Almost Certain</option>
                    </select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-4">
                  <div class="form-group">
                    <label for="plan-impact-select" class="form-label" data-translate="Impact">Impact</label>
                    <select id="plan-impact-select" name="" class="form-select">
                      <option data-i18n="Choose">Choose</option>
                      <option>Insignificant</option>
                      <option>Major</option>
                      <option>Minor</option>
                      <option>Moderate</option>
                      <option>Catastrophic</option>
                    </select>
                  </div>
                </div>
                
                <!-- Third row of fields -->
                <div class="g-col-12 g-col-md-4">
                  <div class="form-group">
                    <label for="plan-score" class="form-label" data-translate="Risk Score">Risk Score</label>
                    <input id="plan-score" type="text" class="form-control" value="" disabled>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-4">
                  <div class="form-group">
                    <label for="plan-progress-name" class="form-label" data-translate="Progress %">Progress(%)</label>
                    <input type="number" class="form-control" id="plan-progress-name" placeholder="">
                  </div>
                </div>
                <div class="g-col-12 g-col-md-4">
                  <div class="form-group">
                    <label for="plan-action-select" class="form-label" data-translate="Action">Action</label>
                    <select id="plan-action-select" class="form-select">
                      <option data-i18n="Choose">Choose</option>
                      <option value="tolerable">Avoid</option>
                      <option value="very high">Reduce</option>
                      <option value="very low">Share</option>
                      <option value="very low">Transfer</option>
                      <option value="very low">Accept</option>
                      <option value="very low">Mitigate</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="g-col-12" style="float: right;">
                  <div class="form-group">
                     <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close" data-translate="Cancel">
          Cancel
        </button>
        <button class="btn btn-primary initative_save_btn" id="submitplanevent" value="Save" data-translate="Save">
          Save
        </button>
                  </div>
                </div>
          <!-- Hidden fields -->
          <input type="hidden" name="action" id="riskplanaction" value="">
          <input type="hidden" name="riskPlanCreatedById" id="activCreatedById" value="">
          <input type="hidden" name="planchangeId" id="planchangeId" value="">
          <input type="hidden" name="planchangeIddraft" id="planchangeIddraft" value="">
          <input type="hidden" name="planriskId" id="planriskId" value="">
          <input type="hidden" name="riskId" id="riskId">
        </form>
      </div>
      
      <div class="modal-footer">
       
        
        <div class="modal-audit">
          <h5 class="title" data-translate="Audit">Audit</h5>
          <div class="audit-listing">
            <div class="audit-box">
              <div class="title" data-translate="Created By">Created By:</div>
              <div class="text" id="riskPlanCreatedBy"></div>
            </div>
            <div class="audit-box">
              <div class="title" data-translate="Modified By">Modified By:</div>
              <div class="text" id="riskPlanUpdatedBy"></div>
            </div>
            <div class="audit-box">
              <div class="title" data-translate="Created Date">Created Date:</div>
              <div class="text" id="riskPlanCreatedByDate"></div>
            </div>
            <div class="audit-box">
              <div class="title" data-translate="Modified Date">Modified Date:</div>
              <div class="text" id="riskPlanUpdatedByDate"></div>
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
      debug: false,
      success: "valid"
    });
    
    $("#riskPlanForm").validate({
      rules: {
        riskplan_name: {
          required: true
        }
      },
      messages: {
        riskplan_name: {
          required: "Name is required"
        }
      },
      submitHandler: function(form) {
        handleRiskPlanSave("RiskPlan");
      }
    });
  });
</script>