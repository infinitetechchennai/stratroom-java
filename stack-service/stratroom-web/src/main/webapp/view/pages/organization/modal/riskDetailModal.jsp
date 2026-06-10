<style>
  .chosen-search input[type=text] {
    padding: 4px 10px 4px 5px !important;
  }
  label.text-danger {
  color: red;
  font-weight: 500;
}

</style>


<div class="modal custom-modal fade riskDetail_description_popup" tabindex="-1"  
  data-bs-keyboard="false" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
    <div class="modal-content">
      <div class="modal-header modalheadercolor">
        <h5 class="modal-title" data-translate="Risk Description">Risk Description</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="riskDetailClosePopup"></button>
      </div>
      <div class="modal-body" style="overflow-y: auto">
        <form id="riskDetailForm">
          <div class="card border-0">
            <div class="card-body">
              <div class="grid gap-3">
                <div class="g-col-12 g-col-md-3" id="riskDetail_id_wrapper" style="display: none">
                  <div class="form-group">
                    <label for="riskDetail_id" class="form-label" data-translate="ID">ID</label>
                    <input type="text" class="form-control" name="riskDetail_id" id="riskDetail_id" placeholder="">
                  </div>
                </div>
                <div class="g-col-12 g-col-md-3" id="riskUnique_id_wrapper">
                  <div class="form-group">
                    <label for="riskUniqueId" class="form-label" data-translate="Risk Code">Risk Code</label>
                    <input type="text" class="form-control" name="riskUnique_id" id="riskUniqueId" placeholder="">
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="riskDetail_name" class="form-label" data-translate="Name">Name</label>
                    <input type="text" class="form-control" name="riskDetail_name" id="riskDetail_name" placeholder="" autocomplete="off">
                  </div>
                </div>
                <div class="g-col-12">
                  <div class="form-group">
                    <label for="riskDetail_description" class="form-label" data-translate="Description">Description</label>
                    <textarea class="form-control" name="riskDetail_description" id="riskDetail_description" placeholder="" rows="3" autocomplete="off"></textarea>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="Initiative_Department" class="form-label" data-translate="Department">Department</label>
                    <select id="Initiative_Department" name="Initiative_Department" class="form-select select-dropdown-edit-org w-100 select2" data-placeholder="Select Department">
                    </select>
                    <input type="text" id="initiative_dept" class="form-control" style="display: none;">
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="relatedparties_select" class="form-label" data-translate="Related Parties">Related Parties</label>
                    <select id="relatedparties_select" name="relatedparties[]" class="form-select select-dropdown-edit-org w-100 select2" multiple="multiple">
                    </select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="riskcategory-select" class="form-label" data-translate="Risk Impact Category">Risk Impact Category</label>
                    <select id="riskcategory-select" name="riskcategory" class="form-select">
                      <option value="" data-i18n="Choose">Choose</option>
                      <option value="Operational Risk">Operational Risk</option>
                      <option value="Financial Risk">Financial Risk</option>
                      <option value="Compliance & Legal Risk">Compliance & Legal Risk</option>
                      <option value="Technology Risk">Technology Risk</option>
                       <option value="Reputational Risk">Reputational Risk</option>
                       <option value="Human Capital Risk">Human Capital Risk</option>
                       <option value="Environmental, Social & Governance (ESG) Risk">Environmental, Social & Governance (ESG) Risk</option>
                       <option value="Political Risk">Political Risk</option>
                       <option value="Regulatory Risk">Regulatory Risk</option>
                       <option value="Market Risk">Market Risk</option>
                       <option value="Cybersecurity Risk">Cybersecurity Risk</option>
                       <option value="Supply Chain Risk">Supply Chain Risk</option>
                       <option value="Project & Program Risk">Project & Program Risk</option>
                       <option value="Third-Party/Vendor Risk">Third-Party/Vendor Risk</option>
                       <option value="Innovation & R&D Risk">Innovation & R&D Risk</option>
                       <option value="Health & Safety Risk">Health & Safety Risk</option>
                       <option value="Business Continuity & Resilience Risk">Business Continuity & Resilience Risk</option>
                       <option value="Ethical/Conduct Risk">Ethical/Conduct Risk</option>
                       <option value="Investment Risk">Investment Risk</option>
                    </select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="impact-select" class="form-label" data-translate="Impact">Impact</label>
                    <select id="impact-select" name="impact" class="form-select">
                      <option value="" data-i18n="Choose">Choose</option>
                      <option data-score="1" value="Insignificant">Insignificant</option>
                      <option data-score="2" value="Minor">Minor</option>
                      <option data-score="3" value="Moderate">Moderate</option>
                      <option data-score="4" value="Major">Major</option>
                      <option data-score="5" value="Catastrophic">Catastrophic</option>
                    </select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="Likelihood-select" class="form-label" data-translate="Likelihood">Likelihood</label>
                    <select id="Likelihood-select" name="Likelihood" class="form-select">
                      <option value="" data-i18n="Choose">Choose</option>
                      <option data-score="1" data-status="Insignificant" value="Rare">Rare</option>
                      <option data-score="2" data-status="Minor" value="Unlikely">Unlikely</option>
                      <option data-score="3" data-status="Moderate" value="Possible">Possible</option>
                      <option data-score="4" data-status="Major" value="Likely">Likely</option>
                      <option data-score="5" data-status="Catastrophic" value="Almost Certain">Almost Certain</option>
                    </select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="calculate_score" class="form-label" data-translate="Risk Score">Risk Score</label>
                    <input type="text" class="form-control" name="calculate_score" id="calculate_score" disabled>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="calculate_status" class="form-label" data-translate="Status">Status</label>
                    <input type="text" class="form-control" name="calculate_status" id="calculate_status" disabled>
                  </div>
                </div>
                <div class="g-col-12">
                  <div class="form-group">
                    <label class="form-label" data-translate="Context">Context</label>
                    <div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" id="riskkpicheck" type="checkbox">
                        <label class="form-check-label" for="riskkpicheck">KPI</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" id="riskposcheck" type="checkbox">
                        <label class="form-check-label" for="riskposcheck">POS</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" id="riskisocheck" type="checkbox">
                        <label class="form-check-label" for="riskisocheck">ISO</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" id="riskinformatiomassetcheck" type="checkbox">
                        <label class="form-check-label" for="riskinformatiomassetcheck">Information Asset</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" id="riskotherscheck" type="checkbox">
                        <label class="form-check-label" for="riskotherscheck">Others</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-4" id="inputElementpos">
                  <div class="form-group">
                    <label for="riskposval" class="form-label" data-translate="POS">POS</label>
                    <select class="form-select select-dropdown-edit-org w-100 select2" multiple="multiple" name="riskposval" id="riskposval"></select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-4" id="inputElementiso">
                  <div class="form-group">
                    <label for="riskisoval" class="form-label" data-translate="ISO">ISO</label>
                    <input type="text" class="form-control" id="riskisoval" autocomplete="off">
                  </div>
                </div>
                <div class="g-col-12 g-col-md-4" id="inputElementia">
                  <div class="form-group">
                    <label for="riskinformationassetval" class="form-label" data-translate="Information Asset">Information Asset</label>
                    <input type="text" class="form-control" id="riskinformationassetval" autocomplete="off">
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="businessimpact" class="form-label" data-translate="Business Impact (KPI)">Business Impact(KPI)</label>
                    <select  id="businessimpact" name="businessimpact[]" class="form-select select-dropdown-edit-org w-100 select2" multiple="multiple">
                    </select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="financialimpact" class="form-label" data-translate="Financial Impact">Financial Impact</label>
                    <input type="number" class="form-control" name="financialimpact" id="financialimpact" autocomplete="off">
                  </div>
                </div>
                <div class="g-col-12">
                  <div class="form-group">
                    <label for="riskothersval" class="form-label" data-translate="Others">Others</label>
                    <textarea class="form-control" id="riskothersval" rows="3" autocomplete="off"></textarea>
                  </div>
                </div>
                <!-- <div class="g-col-12 g-col-md-4">
                  <div class="form-group">
                    <label for="raise_date" class="form-label" data-translate="Date Raised">Date Raised</label>
                    <input type="date" class="form-control" autocomplete="off" name="raise_date" data-range="true" data-language="en" id="raise_date" autocomplete="off">
                    
                  </div>
                </div> -->
                <div class="g-col-12 g-col-md-4">
                  <div class="form-group">
                    <label for="riskDetail_complete_date" class="form-label" data-translate="Date Raised">Date Raised</label>
                    <input type="date" class="form-control" autocomplete="off" name="riskDetail_complete_date" data-range="true" data-language="en" id="raise_date" >
                  </div>
                </div>
               
                <div class="g-col-12 g-col-md-4">
                  <div class="form-group">
                    <label for="riskDetail_complete_date" class="form-label" data-translate="Date Completed">Date Completed</label>
                    <input type="date" class="form-control" autocomplete="off" name="riskDetail_complete_date" data-range="true" data-language="en" id="riskDetail_complete_date" >
                  </div>
                </div>

                 
                <div class="g-col-12 g-col-md-4">
                  <div class="form-group">
                    <label for="riskDetail_next_date" class="form-label" data-translate="Next Assessment">Next Assessment</label>
                    <input type="date" class="form-control" autocomplete="off" name="riskDetail_next_date" data-range="true"  data-language="en" id="riskDetail_next_date" >
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
        <button class="btn btn-primary submitevent" value="Save" data-translate="Save">Save</button>
                  </div>
                </div>
          <input type="hidden" id="riskDetailaction" name="action" value="">
          <input type="hidden" id="riskDetailChangeId" name="changeId" value="">
          <input type="hidden" name="riskDetailCreatedById" id="riskDetailCreatedById" value="">
          <input type="hidden" name="impact" id="impact" value="">
        </form>
      </div>
      
      <div class="modal-footer">
       <div class="modal-audit">
          <h5 class="title" data-translate="Audit">Audit</h5>
          <div class="audit-listing">
            <div class="audit-box">
              <div class="title" data-translate="Created By">Created By:</div>
              <div class="text" id="riskDetailCreatedBy"></div>
            </div>
            <div class="audit-box">
              <div class="title" data-translate="Modified By">Modified By:</div>
              <div class="text" id="riskDetailUpdatedBy"></div>
            </div>
            <div class="audit-box">
              <div class="title" data-translate="Created Date">Created Date:</div>
              <div class="text" id="riskDetailCreatedByDate"></div>
            </div>
            <div class="audit-box">
              <div class="title" data-translate="Modified Date">Modified Date:</div>
              <div class="text" id="riskDetailUpdatedByDate"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  $(document).ready(function () {
    jQuery.validator.addMethod("greaterThan", 
    function(value, element, params) {
      if (!/Invalid|NaN/.test(new Date(value))) {
        return new Date(value) > new Date($(params).val());
      }
      return isNaN(value) && isNaN($(params).val()) 
        || (Number(value) > Number($(params).val())); 
    },'Must be greater than {0}.');

    jQuery.validator.setDefaults({
      debug: false,
      success: "valid",
      // ignore: ":hidden:not(.chosen-select)"
    });
    
   $("#riskDetailForm").validate({
  errorClass: "text-danger", // custom class name
  rules: {
    riskDetail_name: {
      required: true
    }
  },
  messages: {
    riskDetail_name: {
      required: "Name is required *"  // ✅ Fix: specify field name
    },
    riskDetail_next_date: {
      greaterThan: "Must be greater than Date completed."
    }
  },
  submitHandler: function(form) {
    handleRiskDetailSave();
  }
});
  });
</script>