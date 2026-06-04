
 <div class="modal custom-modal fade sub_tasks_popup" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
  role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="myLargeModalLabel_1" data-translate="Task Description">Task Description</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
         <form id="tasksForm">
        <div class="card custom-card border-0">
          <div class="modal-body">
            <div class="grid gap-3">
              <div class="g-col-12 g-col-md-4">
 <input type="hidden" name="initiativeID" id="initiativeID" />
                 <div class="form-group">
                                    <input type="hidden" name="initiativeID" id="initiativeID" />
	                       <div class="form-group col-md-12" id="tasks_id_wrapper" style="display: none">
								<label for="tasks_id" data-i18n="ID">ID</label> <input type="text"
									class="form-control browser-default" name="milestone_id"
									id="tasks_id" placeholder="">
							</div>
						</div>
              </div>
              <div class="g-col-12 g-col-md-12">
                <div class="form-group">
                  <label for="tasks_desc" class="form-label" data-translate="Name">Name</label>
                  <textarea class="form-control" autocomplete="off" name="tasks_desc" id="tasks_desc" cols=""
                    rows="3" placeholder="Name"></textarea>
                </div>
              </div>
              <div class="g-col-12 g-col-md-6">
                <div class="form-group">
                  <label for="tasks_status" class="form-label" data-translate="Status">Status</label>
                  <select id="tasks_status" name="tasks_status" class="form-select selectdrop-add-task" aria-invalid="false">
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
                  <label for="tasks_progress" class="form-label" data-translate="Progress (%)">Progress (%)</label>
                  <input type="text" class="form-control" name="tasks_progress" id="tasks_progress"
                    placeholder="Progress (%)" />
                </div>
              </div>
              <div class="g-col-12 g-col-md-6">
                <div class="form-group">
                  <label for="tasks_start_end" class="form-label" data-translate="Start / End Date">Start / End Date</label>
                  <input type="text" class="form-control browser-default datepicker-here" autocomplete="off"
                        name="tasks_start_end" data-range="true" data-multiple-dates-separator=" - " data-language="en" id="tasks_start_end">
                </div>
              </div>
            </div>
          </div>
            <input type="hidden" name="action" value="" />
           <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close" data-translate="Cancel">
          Cancel
        </button>
        <button class="btn btn-primary initative_save_btn" value="Save" data-translate="Save">Save</button>

        <div class="modal-audit">

          <div class="audit-listing">
            <div class="audit-box">
              <div class="title">Created By :</div>
              <div class="text"></div>
            </div>
            <div class="audit-box">
              <div class="title">Modified By :</div>
              <div class="text"></div>
            </div>
            <div class="audit-box">
              <div class="title">Created Date :</div>
              <div class="text"></div>
            </div>
            <div class="audit-box">
              <div class="title">Modified Date :</div>
              <div class="text"></div>
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
		$( "#tasksForm" ).validate({
		  rules: {
			  tasks_name: {
		      required: true
		    },
			tasks_status:{
				required: true
			},
		    tasks_desc: {
		      required: true
		    },
		    tasks_enddate: {
			      required: true
			},
		    tasks_progress: {
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
	        	handletasksSave();
	        	
	        }
		});
</script>

