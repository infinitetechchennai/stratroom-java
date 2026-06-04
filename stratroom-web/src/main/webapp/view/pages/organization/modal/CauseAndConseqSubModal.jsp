<div class="modal custom-modal fade sub_cause_conq_popup" id="" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
    <div class="modal-content">
      <div class="modal-header modalheadercolor">
        <h5 class="modal-title" data-translate = "RiskPage.Consequence Description">Consequence Description</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" id="riskConqClosePopup" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="riskConqForm">
          <div class="card border-0">
            <div class="card-body">
              <div class="grid gap-3">
                <!-- Hidden ID field -->
                <div class="g-col-12 g-col-md-2" id="riskConqId_wrapper" style="display: none">
                  <div class="form-group">
                    <label for="riskConqId" class="form-label" data-translate = "ID">ID</label>
                    <input type="text" class="form-control" name="riskConqId" id="riskConqId" placeholder="">
                  </div>
                </div>
                
                <!-- Name field -->
                <div class="g-col-12">
                  <div class="form-group">
                    <label for="riskConqName" class="form-label" data-translate = "Name">Name</label>
                    <textarea type="text" class="form-control" name="riskConqName" id="riskConqName" placeholder="" autocomplete="off" rows="1"></textarea>
                  </div>
                </div>
                
                <!-- Rating field -->
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="conq-rating-select" class="form-label" data-translate = "Rating">Rating</label>
                    <select id="conq-rating-select" name="risk_conq_rating" class="form-select">
                      <option value="" data-i18n="Choose">Choose</option>
                      <option value="Very Low">Very Low</option>
                      <option value="Low">Low</option>
                      <option value="Tolerable">Tolerable</option>
                      <option value="High">High</option>
                      <option value="Very High">Very High</option>
                    </select>
                  </div>
                </div>
                
                <!-- Impact Category field -->
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="conq-impactcategory-select" class="form-label" data-translate = "Impact Category">Impact Category</label>
                    <select id="conq-impactcategory-select" class="form-select">
                      <option data-i18n="Choose">Choose</option>
                      <option value="tolerable" data-i18n="Financial">Financial</option>
                      <option value="very high">Operational</option>
                      <option value="very low">Reputation</option>
                      <option value="very low">Strategic</option>
                      <option value="very low">Law</option>
                    </select>
                  </div>
                </div>
                
                <!-- Possible Event field -->
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="conq-possible-select" class="form-label" data-translate = "Possible Event">Possible Event</label>
                    <select id="conq-possible-select" class="form-select">
                      <option data-i18n="Choose">Choose</option>
                      <option value="tolerable" data-i18n="Frequency">Frequency</option>
                      <option value="very high">Possibilities</option>
                      <option value="very low">Possible events (bribery risk)</option>
                    </select>
                  </div>
                </div>
                
                <!-- Likelihood field -->
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="conq-likelihood-select" class="form-label" data-translate = "Likelihood">Likelihood</label>
                    <select id="conq-likelihood-select" name="" class="form-select">
                      <option data-i18n="Choose">Choose</option>
                      <option>Rare</option>
                      <option>Likely</option>
                      <option>Unlikely</option>
                      <option>possible</option>
                      <option>Almost Certain</option>
                    </select>
                  </div>
                </div>
                
                <!-- Impact field -->
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="conq-impact-select" class="form-label" data-translate = "Impact">Impact</label>
                    <select id="conq-impact-select" name="" class="form-select">
                      <option data-i18n="Choose">Choose</option>
                      <option>Insignificant</option>
                      <option>Major</option>
                      <option>Minor</option>
                      <option>Moderate</option>
                      <option>Catastrophic</option>
                    </select>
                  </div>
                </div>
                
                <!-- Risk Score field -->
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="conq-score" class="form-label" data-translate = "Risk Score">Risk Score</label>
                    <input type="text" class="form-control" id="conq-score" placeholder="">
                  </div>
                </div>
                
                <!-- Description field -->
                <div class="g-col-12">
                  <div class="form-group">
                    <label for="riskConqDesc" class="form-label" data-translate = "Description">Description</label>
                    <textarea class="form-control" name="riskConqDesc" id="riskConqDesc" placeholder="" rows="3" autocomplete="off"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="g-col-12" style="float: right;">
                  <div class="form-group">
                     <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close" data-translate = "Cancel">
          Cancel
        </button>
        <button class="btn btn-primary initative_save_btn" value="Save" data-translate = "Save">
          Save
        </button>
                  </div>
                </div>
          <!-- Hidden fields -->
          <input type="hidden" name="action" id="conqaction" value="">
          <input type="hidden" name="conqCreatedById" id="conqCreatedById" value="">
          <input type="hidden" name="causeId" id="conqcauseId" value="">
          <input type="hidden" id="conqChangeId" name="conqChangeId" value="">
          <input type="hidden" id="conqChangeIddraft" name="conqChangeIddraft" value="">
          <input type="hidden" id="conqriskId" name="conqriskId" value="">
        </form>
      </div>
      
      <div class="modal-footer">
       
        
        <div class="modal-audit">
          <h5 class="title" data-translate = "Audit">Audit</h5>
          <div class="audit-listing">
            <div class="audit-box">
              <div class="title" data-translate = "Created By">Created By:</div>
              <div class="text" id="riskConqCreatedBy"></div>
            </div>
            <div class="audit-box">
              <div class="title" data-translate = "Modified By">Modified By:</div>
              <div class="text" id="riskConqUpdatedBy"></div>
            </div>
            <div class="audit-box">
              <div class="title" data-translate="Created Date">Created Date:</div>
              <div class="text" id="riskConqCreatedByDate"></div>
            </div>
            <div class="audit-box">
              <div class="title" data-tranlate="Modified Date">Modified Date:</div>
              <div class="text" id="riskConqUpdatedByDate"></div>
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
    
    $("#riskConqForm").validate({
      rules: {
        riskConqName: {
          required: true
        }
      },
      messages: {
        riskConqName: {
          required: "Name is required"
        }
      },
      submitHandler: function(form) {
        handleRiskConqSave();
      }
    });
  });
</script>