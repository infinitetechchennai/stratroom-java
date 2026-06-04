<!-- <div id="create_meeting" class="modal fade" role="dialog">
      <div class="modal-dialog modal-lg" style="margin-top: 8%;">
     
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="meetingtitle"></h4>
            <button type="button" class="close pull-right" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div class="modal-body">
          <form id="meeting_Form">
            <div class="row">
				<div class="form-group col-md-12" id="swot_id_wrapper" style="display: none">
					<label for="meeting-name">ID</label>
					<input type="text" class="modal-custom-input" id="swot_id" style="height: 38px !important; width: 98% !important;"/>
				</div>
			</div>
			
            <div class="row">
            	<input type="hidden" name="action" value="" />
            	<input type="hidden" name="id" value="" />
              	<div class="form-group col-md-12">
                	<label for="meeting-name">Subject</label>
                	<input type="text" class="modal-custom-input" name="meetingname" id="meetingname" style="width: 98% !important;height:38px !important;" autocomplete="off"/>
              	</div>
            </div>

			
                        
            <div class="row m-t-20">
              <div class="form-group col-md-6">
                <label for="timepicker">From Date & Time</label>
                <i class="far fa-calendar input-calender-icon-from"></i>
                <input type="text" class="modal-custom-input date_pickers_single" data-language="en" data-timepicker="true" name="starttime" autocomplete="off" id="starttime" style="height: 38px !important;width: 94% !important;"/>                
              </div>

              <div class="form-group col-md-6">
                <label for="timepicker1">To Date & Time</label>
                <i class="far fa-calendar input-calender-icon-to"></i>
                <input type="text" class="modal-custom-input date_pickers_single" name="endtime" id="endtime" data-language="en" autocomplete="off" data-timepicker="true" style="height: 38px !important;width: 94% !important;"/>
              </div>
            </div>

            <div class="row m-t-10">
              <div class="form-group col-md-6">
                <label for="location">Location</label>
                <input type="text" class="modal-custom-input" name="location" id="meetinglocation" style="height: 38px !important;" autocomplete="off"/>
              </div>

              <div class="form-group col-md-6">
                <label for="type">Status</label>
                <select id="status" name="status" class="modal-custom-select" style="height: 38px !important;">
                  <option value="" data-i18n="Choose">Choose</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Rescheduled">Rescheduled</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
			</div>			
			<div class="row m-t-10">
				<div class="col-md-12">
				  <hr />
				</div>
				<div class="col-12">
					<div class="form-line right">
						<button type="button" class="btn-default1 btn" data-dismiss="modal" data-i18n="Cancel">
						  Cancel
						</button>
						<button class="initative_save_btn submitevent" data-i18n="Save">
						  Save
						</button>
					</div>
				</div>
			</div>	
			</form>
        </div>
      </div>
    </div>
	</div> -->

	
	<div class="modal custom-modal fade" id="create_meeting" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div
		class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
		<div class="modal-content">
			<div class="modal-header">
			<h5 class="modal-title" data-translate="page.meetings.createMeeting">Create Meeting</h5>
			<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
			<form id="meeting_Form">
				<div class="card custom-card border-0">
				<div class="card-body">
					<div class="grid gap-3">
					<!-- <div class="g-col-12">
						<div class="form-group">
						<label for="meeting-name" class="form-label">Subject</label>
						
						<input type="text" class="modal-custom-input" id="swot_id" style="height: 38px !important; width: 98% !important;"/>
						</div>
					</div> -->
					<div class="g-col-12">
						<input type="hidden" name="action" value="" />
						<input type="hidden" name="id" value="" />
						<div class="form-group">
						<label for="sub_initative_progress" class="form-label" data-translate="page.meetings.createMeetingItems.subject">Subject</label>
						<input type="text" class="form-control" name="meetingname" id="meetingname" placeholder="">
						</div>
					</div>
					<div class="g-col-12 g-col-md-6">
						<div class="form-group">
						<label for="sub_initative_desc" class="form-label" data-translate="page.meetings.createMeetingItems.from_date_time">From Date & Time</label>
						<input type="text" class="form-control date-time-picker" name="starttime" id="starttime" placeholder="">
						</div>
					</div>
					<div class="g-col-12 g-col-md-6">
						<div class="mb-3 form-group">
						<label for="sub_initative_desc" class="form-label" data-translate="page.meetings.createMeetingItems.to_date_time">To Date & Time</label>
						<input type="text" class="form-control date-time-picker" name="endtime" id="endtime" placeholder="">
						</div>
					</div>
					<div class="g-col-12 g-col-md-6">
						<div class="form-group">
						<label for="sub_initative_desc" class="form-label" data-translate="page.meetings.createMeetingItems.location">Location</label>
						<input type="text" class="form-control" name="location" id="meetinglocation" placeholder="">
						</div>
					</div>
					<div class="g-col-12 g-col-md-6">
						<div class="form-group">
						<label for="sub_initative_desc" class="form-label" data-translate="page.meetings.createMeetingItems.meeting_link">Meeting Link</label>
						<input type="text" class="form-control" name="meetLink" id="meetLink" placeholder="">
						</div>
					</div>
					<div class="g-col-12 g-col-md-6">
						<div class="form-group">
						<label for="sub_initative_desc" class="form-label" data-translate="page.meetings.createMeetingItems.status">Status</label>
						<select id="status" name="status" class="form-select">
							<option value="">Choose</option>
							<option value="Scheduled">Scheduled</option>
							<option value="Rescheduled">Rescheduled</option>
							<option value="Ongoing">Ongoing</option>
							<option value="Completed">Completed</option>
							<option value="Cancelled">Cancelled</option>
						</select>
						</div>
					</div>
					</div>
				</div>
				</div>

				<div class="modal-footer">
			<button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close" data-translate="page.meetings.cancel">
				Cancel
			</button>
			<button class="btn btn-primary  initative_save_btn submitevent" value="Save" data-translate="page.meetings.save">Save
			</button>
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
		$( "#meeting_Form" ).validate({
		  rules: {
			meetingname: {
				required: true
			},
		    starttime: {
		      required: true
		    },
		    endtime: {
		      required: true
		    },
		    location: {
		      required: true
		    },
		    status: {
		      required: true
		    }
		  },
		   messages: {
	            required: "Name is required"
	        },
	        submitHandler: function(form) {
	        	saveSwot('','edit');
	        }
		});
</script>