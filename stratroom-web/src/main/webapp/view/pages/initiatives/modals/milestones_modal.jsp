<div  class="modal custom-modal fade sub_milestone_popup" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="myLargeModalLabel_1" data-translate="Milestone Description">
            Milestone Description
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
             <form id="mileStonesForm">
          <div class="card custom-card border-0">
            <div class="modal-body">
                <input type="hidden" name="initiativeID" id="initiativeID" />
              <div class="grid gap-3">
                <div class="g-col-12 g-col-md-4">

                 <div class="form-group col-md-12" id="milstone_id_wrapper" style="display: none">
								<label for="milestone_id" data-i18n="ID" data-translate="ID">ID</label> <input type="text"
									class="form-control browser-default" name="milestone_id"
									id="milestone_id" placeholder="">
							</div>
                </div>
                <div class="g-col-12 g-col-md-12">
                  <div class="form-group">
                    <label for="milestone_desc" class="form-label" data-translate="Name">Name</label>
                    <textarea class="form-control" autocomplete="off" name="milestone_desc" id="milestone_desc" cols=""
                      rows="3" placeholder="Name"></textarea>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="statusTypeMilestone" class="form-label" data-translate="Status">Status</label>
                    <select id="statusTypeMilestone" name="statusTypeMilestone" class="form-select selectdrop-add-milestone" aria-invalid="false">
                      <option value="" selected disabled>Select Status</option>
<option value="not started">Not Started</option>
<option value="in progress">In Progress</option>
<option value="completed">Completed</option>
<option value="delayed">Delayed</option>
<option value="on hold">On Hold</option>

                    </select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="milestone_progress" class="form-label" data-translate="Progress (%)">Progress (%)</label>
                    <input type="text" class="form-control" name="milestone_progress" id="milestone_progress"
                      placeholder="Progress (%)" />
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="milestone_start_end" class="form-label" data-translate="End Date">End Date</label>
                    <input type="text" class="form-control" placeholder="End Date" name="milestone_enddate"
                      data-language="en" autocomplete="off" id="milestone_start_end">
                  </div>
                </div>
              </div>
            </div>
              <input type="hidden" name="action" value="" />
               <div class="modal-footer">
          <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close" data-translate="Cancel">
            Cancel
          </button>
          <button class="btn btn-primary" value="Save" data-translate="Save">Save</button>

          <div class="modal-audit">

            <div class="audit-listing">
              <div class="audit-box">
                <div class="title">Created By :</div>
                <div class="text"><span id="mileCreatedBy"></span></div>
              </div>
              <div class="audit-box">
                <div class="title">Modified By :</div>
                <div class="text"><span id="mileUpdatedBy"></span></div>
              </div>
              <div class="audit-box">
                <div class="title">Created Date :</div>
                <div class="text"><span id="mileCreatedByDate"></span></div>
              </div>
              <div class="audit-box">
                <div class="title">Modified Date :</div>
                <div class="text"><span id="mileUpdatedByDate"></span></div>
              </div>
            </div>
          </div>
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
		$( "#mileStonesForm" ).validate({
		  rules: {
			  milestones_name: {
		      required: true
		    },
		    milestone_desc: {
		      required: true
		    },
		    milestone_enddate: {
			      required: true
			},
		    milestone_progress: {
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
	        	handleMileStonesSave();
	        	
	        }
		});
</script>