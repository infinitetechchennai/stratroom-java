<div class="modal custom-modal fade risk_monitoring_popup"  data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
    <div class="modal-content">
      <div class="modal-header modalheadercolor">
        <h5 class="modal-title" data-tranlate = "Review & Monitoring">Review & Monitoring</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" id="riskMonitorClosePopup" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="riskMonitorForm">
          <div class="card border-0">
            <div class="card-body">
              <div class="grid gap-3">
                <!-- Hidden ID field -->
                <div class="g-col-12" id="riskMonitor_riskid_wrapper" style="display: none">
                  <div class="form-group">
                    <label for="riskMonitor_riskid" class="form-label" data-tranlate = "ID">ID</label>
                    <input type="text" class="form-control" name="riskMonitor_riskid" id="riskMonitor_riskid" placeholder="" value="">
                  </div>
                </div>
                
                <!-- Risk Code field -->
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="monitoring_name" class="form-label" data-tranlate = "Risk Code">Risk Code</label>
                    <input type="text" class="form-control" id="monitoring_name">
                  </div>
                </div>
                
                <!-- Mitigation Plan field -->
                <div class="g-col-12">
                  <div class="form-group">
                    <label for="monitoring_plan" class="form-label" data-tranlate = "Mitigation Plan">Mitigation Plan</label>
                    <textarea id="monitoring_plan" class="form-control" rows="3"></textarea>
                  </div>
                </div>
                
                <!-- Notes field -->
                <div class="g-col-12">
                  <div class="form-group">
                    <label for="monitoring_notes" class="form-label" data-tranlate = "Notes">Notes</label>
                    <textarea id="monitoring_notes" class="form-control" rows="3"></textarea>
                  </div>
                </div>
                
                <!-- Completion Time fields -->
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="monitoring_completion" class="form-label" data-tranlate = "Target Completion Time">Target completion time</label>
                    <input type="date" class="form-control " data-language="en" name="kpi_start_end_date" id="monitoring_completion" autocomplete="off">
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="monitoring_changes-target_time" class="form-label" data-tranlate = "Changes in the Target Completion Time">Changes in the target completion time</label>
                    <input type="date" class="form-control" data-language="en" name="kpi_start_end_date" id="monitoring_changes-target_time" autocomplete="off">
                  </div>
                </div>
                
                <!-- Progress and Status fields -->
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="monitoring_progress" class="form-label" data-tranlate = "Progress %">Progress(%)</label>
                    <input type="number" class="form-control" id="monitoring_progress">
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="monitoring_status" class="form-label" data-tranlate = "Status">Status</label>
                    <select id="monitoring_status" class="form-select">
                      <option data-i18n="Choose">Choose</option>
                      <option value="Open">Open</option>
                      <option value="Close">Close</option>
                    </select>
                  </div>
                </div>
                
                <!-- Person in Charge field -->
                  <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="monitoring_person" class="form-label" data-tranlate = "Person in Charge">Person in Charge</label>
                    <select id="monitoring_person" name="relatedparties[]" class="form-select select-dropdown-edit-org w-100 select2" multiple="multiple">
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <div class="g-col-12" style="float: right;">
                  <div class="form-group">
                      <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close" data-tranlate = "Cancel">
          Cancel
        </button>
        <button class="btn btn-primary initative_save_btn" value="Save" data-tranlate = "Save">
          Save
        </button>
                  </div>
                </div>
          <!-- Hidden fields -->
          <input type="hidden" name="action" id="monitoring-action" value="">
          <input type="hidden" name="riskMonitorCreatedById" id="riskMonitorCreatedById" value="">
          <input type="hidden" name="riskMonitorChangeId" id="riskMonitorChangeId" value="">
          <input type="hidden" name="riskMonitorChangeIddraft" id="riskMonitorChangeIddraft" value="">
          <input type="hidden" name="riskMonitorriskId" id="riskMonitorriskId" value="">
          <input type="hidden" name="monitoringriskId" id="monitoringriskId" value="">
        </form>
      </div>
      
      <div class="modal-footer">
       
        
        <div class="modal-audit">
          <h5 class="title" data-tranlate = "Audit">Audit</h5>
          <div class="audit-listing">
            <div class="audit-box">
              <div class="title" data-tranlate = "Created By">Created By:</div>
              <div class="text" id="riskMonitorCreatedBy"></div>
            </div>
            <div class="audit-box">
              <div class="title" data-tranlate = "Modified By">Modified By:</div>
              <div class="text" id="riskMonitorUpdatedBy"></div>
            </div>
            <div class="audit-box">
              <div class="title" data-tranlate = "Created Date">Created Date:</div>
              <div class="text" id="riskMonitorCreatedByDate"></div>
            </div>
            <div class="audit-box">
              <div class="title" data-tranlate = "Modified Date">Modified Date:</div>
              <div class="text" id="riskMonitorUpdatedByDate"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  $(document).ready(function () {
  
    
    $("#riskMonitorForm").validate({
      rules: {
        riskMonitor_desc: {
          required: true
        },
        riskMonitor_progress: {
          required: true,
          digits: true,
          min: 0,
          max: 100
        },
        riskMonitor_dateRange: {
          required: true
        }
      },
      messages: {
        required: "Field is required"
      },
      submitHandler: function(form) {
        handleRiskMonitorSave();
      }
    });
  });
</script>