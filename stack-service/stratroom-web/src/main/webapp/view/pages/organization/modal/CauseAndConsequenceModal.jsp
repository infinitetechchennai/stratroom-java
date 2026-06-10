<div class="modal custom-modal fade cause_conq_popup"  data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
    <div class="modal-content">
      <div class="modal-header modalheadercolor">
        <h5 class="modal-title" data-translate = "Cause Description">Cause Description</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" id="riskCauseClosePopup" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="riskCauseForm">
          <div class="card border-0">
            <div class="card-body">
              <div class="grid gap-3">
                <!-- Hidden ID field -->
                <div class="g-col-12 g-col-md-2" id="riskCauseId_wrapper" style="display: none">
                  <div class="form-group">
                    <label for="riskCauseId" class="form-label" data-translate = "ID">ID</label>
                    <input type="text" class="form-control" name="riskCauseId" id="riskCauseId" placeholder="">
                  </div>
                </div>
                
                <!-- Name field -->
                <div class="g-col-12">
                  <div class="form-group">
                    <label for="riskCauseName" class="form-label" data-translate = "Name">Name</label>
                    <textarea type="text" class="form-control" name="riskCauseName" id="riskCauseName" placeholder="" autocomplete="off" rows="1"></textarea>
                  </div>
                </div>
                
                <!-- Rating field -->
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="cause-rating-select" class="form-label" data-translate = "Rating">Rating</label>
                    <select id="cause-rating-select" name="risk_rating" class="form-select">
                      <option value="" data-i18n="Choose">Choose</option>
                      <option value="tolerable">Tolerable</option>
                      <option value="very high">Very High</option>
                      <option value="very low">Very Low</option>
                      <option value="tolerable">Extreme Risk</option>
                      <option value="very high">High Risk</option>
                      <option value="very low">Medium Risk</option>
                      <option value="very low">Low</option>
                    </select>
                  </div>
                </div>
                
                <!-- Risk Cause Category field -->
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="cause_riskcategory_select" class="form-label" data-translate = "Risk Cause Category">Risk Cause Category</label>
                    <select id="cause_riskcategory_select" name="cause_category" class="form-select">
                      <option data-i18n="Choose">Choose</option>
                      <option value="people">People</option>
                      <option value="very high">Tools</option>
                      <option value="very low">Procedure</option>
                      <option value="very low">External</option>
                      <option value="very low">Others</option>
                    </select>
                  </div>
                </div>
                
                <!-- Possible Event field -->
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="cause-possible-select" class="form-label" data-translate = "Possible Event">Possible Event</label>
                    <select id="cause-possible-select" name="cause-possible-select" class="form-select">
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
                    <label for="cause-likelihood-select" class="form-label" data-translate = "Likelihood">Likelihood</label>
                    <select id="cause-likelihood-select" name="cause-likelihood-select" class="form-select">
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
                    <label for="cause-impact-select" class="form-label" data-translate = "Impact">Impact</label>
                    <select id="cause-impact-select" name="cause-impact-select" class="form-select">
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
                    <label for="cause-score" class="form-label" data-translate = "Risk Score">Risk Score</label>
                    <input type="text" class="form-control" id="cause-score" name="cause-score" placeholder="">
                  </div>
                </div>
                
                <!-- Description field -->
                <div class="g-col-12">
                  <div class="form-group">
                    <label for="riskCauseDesc" class="form-label" data-translate = "Description">Description</label>
                    <textarea class="form-control" name="riskCauseDesc" id="riskCauseDesc" placeholder="" rows="3" autocomplete="off"></textarea>
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
          <input type="hidden" id="causeaction" name="action" value="">
          <input type="hidden" name="causeCreatedById" id="causeCreatedById" value="">
          <input type="hidden" name="riskId" id="riskId">
          <input type="hidden" id="causeChangeId" name="changeId" value="">
          <input type="hidden" id="causeChangeIddraft" name="causeChangeIddraft" value="">
          <input type="hidden" id="causeriskId" name="causeriskId" value="">
        </form>
      </div>
      
      <div class="modal-footer">
        <div class="modal-audit">
          <h5 class="title" data-translate = "Audit">Audit</h5>
          <div class="audit-listing">
            <div class="audit-box">
              <div class="title" data-translate = "Created By">Created By:</div>
              <div class="text" id="riskCauseCreatedBy"></div>
            </div>
            <div class="audit-box">
              <div class="title" data-translate = "Modified By">Modified By:</div>
              <div class="text" id="riskCauseUpdatedBy"></div>
            </div>
            <div class="audit-box">
              <div class="title" data-translate = "Created Date">Created Date:</div>
              <div class="text" id="riskCauseCreatedByDate"></div>
            </div>
            <div class="audit-box">
              <div class="title" data-translate = "Modified Date">Modified Date:</div>
              <div class="text" id="riskCauseUpdatedByDate"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
  });
  
  $("#riskCauseForm").validate({
    rules: {
      riskCauseName: {
        required: true
      }
    },
    messages: {
      riskCauseName: {
        required: "Name is required"
      }
    },
    submitHandler: function(form) {
      handleRiskCauseSave();
    }
  });
</script>