<!--#START View -->
      <div class="modal custom-modal fade add_goals_popup" id="edit_goal" data-bs-backdrop="static" data-bs-keyboard="false"  tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title">Goal Description</h6>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
           <form id="goal_Form">
          <div class="card custom-card border-0">
            <div class="card-body">
            <div class="grid gap-3">
              <!-- <div class="g-col-12">
                <div class="form-group">
                  <label for="sub_Initiative_id" class="form-label">ID</label>
                  <input type="text" class="form-control browser-default" name="sub_Initiative_id"
                    id="sub_Initiative_id" disabled="">
                </div>
              </div> -->
              <div class="g-col-12">
                <div class="form-group">
                  <label for="sub_initative_desc" class="form-label">Name</label>
                  <input type="text" class="form-control browser-default" name="sub_Initiative_id"
                   id="goalname">
                </div>
              </div>
              <div class="g-col-12 g-col-md-4">
                <div class="form-group">
                  <label for="sub_initative_progress" class="form-label">Due On</label>
                  <input type="date" class="form-control browser-default" name="goaldueon" id="goaldueon" placeholder="" />
                </div>
              </div>
              <div class="g-col-12 g-col-md-4">
                <div class="form-group">
                  <label for="sub_initative_progress" class="form-label">Progress (%)</label>
                  <input type="text" class="form-control browser-default" name="sub_initative_progress"
                    id="goalprogress" placeholder="" />
                </div>
              </div>
              <div class="g-col-12 g-col-md-4">
                <div class="form-group">
                  <label for="sub_initative_contribution" class="form-label">Status</label>
                  <select class="form-control form-select" name="goalstatus" id="goalstatus">
                    <option>Pending</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
            
            </div>
          </div>
          </div>
           <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs--dismiss="modal" aria-label="Close">
            Cancel
          </button>
          <button class="btn btn-primary  goalsubmit" value="Save">Save</button>
          <div class="modal-audit">
            <h5 class="title">
              Audit
            </h5>
            <div class="audit-listing">
              <div class="audit-box">
                <div class="title">Created By :</div>
                <div class="text" id="goalCreatedBy"></div>
              </div>
              <div class="audit-box">
                <div class="title">Modified By :</div>
                <div class="text"  id="goalUpdatedBy"></div>
              </div>
              <div class="audit-box">
                <div class="title">Created Date :</div>
                <div class="text" id="goalCreatedByDate"></div>
              </div>
              <div class="audit-box">
                <div class="title">Modified Date :</div>
                <div class="text" id="goalUpdatedByDate"></div>
              </div>
            </div>
          </div>
        </div>
           </form>
        </div>
       
      </div>
    </div>
  </div>
      <!-- <div
        class="modal fade add_goals_popup"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel_1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h4>Goal Description</h4>
              <button type="button" class="close pull-right" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div class="modal-body">
              <form id="goal_Form">
              <div class="row">
					<div class="form-group col-md-12" id="goal_id_wrapper" style="display: none">
						<label for="meeting-name">ID</label>
						<input type="text" class="modal-custom-input" id="goal_id" style="height: 38px !important; width: 98% !important;"/>
					</div>
				</div>
            					
                <div class="row">
                  <div class="form-group col-md-12">
                    <label for="sub_initative_desc" data-i18n="Name">Name</label>
                    <textarea class="modal-custom-textarea" placeholder="" name="goalname" id="goalname" rows="6" autocomplete="off"></textarea>
                  </div>
                </div>
                <div class="row m-t-10">
                  <div class="form-group col-md-4">
                    <i class="far fa-calendar input-calender-icon goal-input-calender-icon"></i>
                    <label for="sub_initative_start_end">Due On</label>
                    <input type="text" class="modal-custom-input date_pickers_single" name="goaldueon" id="goaldueon" style="height:38px !important;width: 94% !important;" autocomplete="off"/>
                  </div>
                  <div class="form-group col-md-4">
                    <label for="sub_initative_progress">Progress (%)</label>
                    <input type="number" class="modal-custom-input" id="goalprogress" min="0" max="100" name="goalprogress" style="height:38px !important;width: 94% !important;" autocomplete="off"/>
                  </div>
                  <div class="form-group col-md-4">
                    <label for="sub_initative_progress">Status</label>
                    <select class="modal-custom-input" style="height:38px !important;" name="goalstatus" id="goalstatus">
                      <option value="" data-i18n="Choose">Choose</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
                <input type="hidden" name="action" value="" />
				<input type="hidden" name="goalId" id="goalId" />
                <div class="row m-t-10">
                  <div class="col-md-12">
                    <hr />
                  </div>
                  <div class="form-group col-lg-8 col-md-4 col-sm-12"></div>
                  <div class="form-group col-lg-2 col-md-4 col-sm-6" style="padding-right: 4px;">
                    <button type="button" class="btn custom-form-control btn-custom-secondary" data-dismiss="modal">
                      Close
                    </button>
                  </div>
                  <div class="form-group col-lg-2 col-md-4 col-sm-6" style="padding-left: 4px;">
                    <button type="submit" class="btn custom-form-control btn-custom-primary goalsubmit">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <div
                class="d-flex flex-column flex-fill ml-4 mb-5 text-left font-11"
              >
                <div class="d-flex flex-row">
                  <p class="kpi_audit">Audit</p>
                </div>
                <div class="d-flex flex-row">
                  <div class="d-flex flex-column">
                    <p><span>Created By : </span><span id="goalCreatedBy"></span></p>
                    <p><span>Created Date : </span><span id="goalCreatedByDate"></span></p>
                  </div>
                  <div class="d-flex flex-column pl-5">
                    <p><span>Modified By : </span><span id="goalUpdatedBy"></span></p>
                    <p>
                      <span>Modified Date : </span><span id="goalUpdatedByDate"></span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <!--#END View -->
<script>
	jQuery.validator.setDefaults({
		debug : false,
		success : "valid"
	});
	$("#goal_Form").validate({
		rules : {
			goalname : {
				required : true
			},
			goaldueon : {
				required : true
			},
			goalprogress : {
				required : true,
				digits: true,
				min:0,
				max:100
			},
			goalstatus : {
				required : true
			}
		},
		messages : {
			required : "Name is required"
		},
		submitHandler : function(form) {
			handleEmployeeGoalSave();
		}
	});
</script>