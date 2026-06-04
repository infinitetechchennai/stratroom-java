 <div  class="modal custom-modal fade sub_activities_popup" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title activityHeaderText" id="myLargeModalLabel_1" >Add Activities Description</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
             <form id="activitiesForm">
          <div class="card custom-card border-0">
            <div class="modal-body">
              <div class="grid gap-3">
                <!-- <div class="g-col-12 g-col-md-4">

                  <div class="form-group">
                    <label for="sub_Initiative_id" class="form-label">ID</label>
                    <input type="text" class="form-control" name="sub_Initiative_id" id="sub_Initiative_id" disabled
                      placeholder="ID">
                  </div>
                </div> -->
                <div class="form-row">
                                    <input type="hidden" name="initiativeID" id="initiativeID" />
                                    
			                       <div class="form-group col-md-12" id="activities_id_wrapper" style="display: none">
										<label for="activities_id" data-i18n="ID">ID</label> 
										<input type="text" class="form-control browser-default" name="activities_id" id="activities_id" placeholder="">
										<input type="hidden" name="activities_hidden_id" id="activities_hidden_id">
									</div>
								</div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="subInitative_desc" class="form-label" data-translate="Sub Initiative">Sub Initiatives</label>
                    
                    <select class="form-select" name="subInitative_desc" id="subInitative_desc">
                     </select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-12">
                  <div class="form-group">
                    <label for="activities_desc" class="form-label" data-translate="Name">Name</label>
                    <textarea class="form-control" autocomplete="off" name="activities_desc" id="activities_desc" cols=""
                      rows="3" placeholder="Name"></textarea>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="activities_progress" class="form-label" data-translate="Progress (%)">Progress (%)</label>
                    <input type="text" class="form-control" name="activities_progress" id="activities_progress"
                      placeholder="Progress (%)" />
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="activities_start_end" class="form-label" data-translate="Start / End Date">Start / End Date</label>
                    <input type="text" class="form-control browser-default datepicker-here" autocomplete="off"
                        name="activities_start_end" data-range="true" data-multiple-dates-separator=" - " data-language="en"
                        id="activities_start_end">
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="activities_budget" class="form-label" data-translate="Budget">Budget</label>
                    <input type="text" class="form-control" name="activities_budget" id="activities_budget"
                      placeholder="Budget" />
                  </div>
                </div>
                  <input type="hidden" name="action" value="" />
                  <input type="hidden" name="activity_multipleowners" id="activity_multipleowners" value="" />
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="activities_Actual" class="form-label" data-translate="Actual">Actual</label>
                    <input type="text" class="form-control" name="activities_Actual" id="activities_Actual"
                      placeholder="Actual" />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close" data-translate="Cancel">
            Cancel
          </button>
          <button class="btn btn-primary initative_save_btn" value="Save" data-translate="Save">Save</button>

        
        </div>
          </div>
        </form>
    </div>
        
      </div>
    </div>
  </div>

<script>
	jQuery.validator.setDefaults({
		  debug: false,
		  success: "valid"
		});
		$( "#activitiesForm" ).validate({
		  rules: {
			  activities_desc: {
		      required: true
		    },
		    activitierange: {
			      required: true
			},
		    activities_progress: {
		      required: true,
		      digits: true,
		      min: 0,
		      max: 100
		    }
		  },
		   messages: {
	            required: "Name is required"
	        },
	        submitHandler: function(form) {
	        	handleActivitiesSave();
	        }
		});
</script>
