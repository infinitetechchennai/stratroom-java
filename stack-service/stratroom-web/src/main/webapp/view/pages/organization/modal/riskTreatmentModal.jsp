<div class="modal custom-modal fade risk_treatment_add_popup" id="risk_treatment_add_popup" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
    <div class="modal-content">
      <div class="modal-header modalheadercolor">
        <h5 class="modal-title" data-translate="Risk Treatment">Risk Treatment</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" id="riskTreatmentClosePopup" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="riskTreatmentForm">
          <div class="card border-0">
            <div class="card-body">
              <div class="grid gap-3">
                <!-- Hidden ID field -->
                <div class="g-col-12" id="risktreatment_id_wrapper" style="display: none">
                  <div class="form-group">
                    <label for="risktreatment_id" class="form-label" data-translate="ID">ID</label>
                    <input type="text" class="form-control" name="risktreatment_id" id="risktreatment_id">
                  </div>
                </div>
                
                <!-- Action field -->
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="treatment-action" class="form-label" data-translate="Action">Action</label>
                    <select id="treatment-action" class="form-select">
                      <option data-i18n="Choose">Choose</option>
                      
                    </select>
                  </div>
                </div>
                
                <!-- Reducing Impact field -->
                <div class="g-col-12">
                  <div class="form-group">
                    <label for="treatment-impact" class="form-label" data-translate="Reducing Impact">Reducing Impact</label>
                    <textarea class="form-control" id="treatment-impact" rows="3"></textarea>
                  </div>
                </div>
                
                <!-- Reducing Possibility field -->
                <div class="g-col-12">
                  <div class="form-group">
                    <label for="treatment-possibility" class="form-label" data-translate="Reducing the Possibility">Reducing the Possibility</label>
                    <textarea class="form-control" id="treatment-possibility" rows="3"></textarea>
                  </div>
                </div>
                
                <!-- Completion Time Target and Progress fields -->
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="treatment-kpi_start_end_date" class="form-label" data-translate="Completion Time Target">Completion Time Target</label>
                    <input type="date" class="form-control" data-language="en" name="kpi_start_end_date" id="treatment-kpi_start_end_date" autocomplete="off">
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="treatment-progress" class="form-label" data-translate="Progress %">Progress(%)</label>
                    <input type="number" class="form-control" id="treatment-progress">
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
        <button class="btn btn-primary initative_save_btn" value="Save" data-translate="Save">
          Save
        </button>
                  </div>
                </div>
          <!-- Hidden fields -->
          <input type="hidden" name="action" id="risktreatmentaction" value="">
          <input type="hidden" name="riskTreatmentCreatedById" id="riskTreatmentCreatedById" value="">
          <input type="hidden" name="riskTreatmentChangeId" id="riskTreatmentChangeId" value="">
          <input type="hidden" name="riskownertreatmentlist" id="riskownertreatmentlist" value="">
          <input type="hidden" name="riskTreatmentChangeIddraft" id="riskTreatmentChangeIddraft" value="">
          <input type="hidden" name="riskTreatmentriskId" id="riskTreatmentriskId" value="">
          <input type="hidden" name="riskId" id="riskId">
        </form>
      </div>
      
      <div class="modal-footer">
        
        
        <div class="modal-audit">
          <h5 class="title" data-translate="Audit">Audit</h5>
          <div class="audit-listing">
            <div class="audit-box">
              <div class="title" data-translate="Created By">Created By:</div>
              <div class="text" id="riskTreatmentCreatedBy"></div>
            </div>
            <div class="audit-box">
              <div class="title" data-translate="Modified By">Modified By:</div>
              <div class="text" id="riskTreatmentUpdatedBy"></div>
            </div>
            <div class="audit-box">
              <div class="title" data-translate="Created Date">Created Date:</div>
              <div class="text" id="riskTreatmentCreatedByDate"></div>
            </div>
            <div class="audit-box">
              <div class="title" data-translate="Modified Date">Modified Date:</div>
              <div class="text" id="riskTreatmentUpdatedByDate"></div>
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
    
    $("#riskTreatmentForm").validate({
      rules: {
        // Add validation rules if needed
      },
      messages: {
        required: "Field is required"
      },
      submitHandler: function(form) {
        handleRiskPlanSave("RiskTreatment");
      }
    });
  });
</script>