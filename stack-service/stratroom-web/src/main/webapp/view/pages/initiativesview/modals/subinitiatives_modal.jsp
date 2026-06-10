<div class="modal fade sub_initative_edit_popup" tabindex="-1"
	role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content">
			<div class="modal-header modalheadercolor">
				<h6 class="modal-title" id="myLargeModalLabel_1">Edit Sub
					Initiative Description</h6>
				<button type="button" class="close" data-dismiss="modal" id="subIniClosePopup"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<form id="sub_initative_Form">
					<div class="form-row">
						<div class="form-group col-md-12" id="sub_Initiative_id_wrapper"
							style="display: none">
							<label for="sub_Initiative_id">ID</label> <input type="text"
								class="form-control browser-default" name="sub_Initiative_id"
								id="sub_Initiative_id" placeholder="">
								<input type="hidden" name="initiativeID" id="initiativeID" />
								<input type="hidden" name="subinitiativeID" id="subinitiativeID" />
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-12">
							<label for="sub_initative_desc" data-i18n="Name">Name</label> 
							<textarea class="form-control browser-default" autocomplete="off" name="subinitiative_desc" id="subinitiative_desc" cols="" rows="6"></textarea>
						</div>
					</div><hr/>
					<div class="form-row">
					
						<div class="form-group col-md-4">
							<label for="sub_initative_progress">Progress (%)</label> <input
								type="number" min="0" max="100" class="form-control browser-default"
								name="sub_initative_progress" id="sub_initative_progress"
								placeholder="" value="0">
						</div>
						<div class="form-group col-md-4">
							<label for="sub_initative_progress">Contribution (%)</label> <input
								type="number" min="0" max="100" class="form-control browser-default"
								name="sub_initative_contribution" id="sub_initative_contribution"
								placeholder="" value="0">
						</div>
						<div class="form-group col-md-4">
							<label for="sub_initative_start_end">Start / End Date</label> 
							<input type="text" autocomplete="off" name="sub_Initiative_date" class="form-control browser-default datepicker-here sub_initative_start_end" data-range="true" data-multiple-dates-separator=" - " data-language="en" id="air-date-sub-init"/>
							<input type="hidden" name="Sub_Initiative_owner" id="Sub_Initiative_owner"/>
							<input type="hidden" name="subinitiative_name" id="subinitiative_name"/>
						</div>
						<!-- <div class="form-group browser-default col-md-6">
							<label for="Sub_Initiative_owner">Owner</label> 
							<select id="Sub_Initiative_owner" name="Sub_Initiative_owner" class="form-control">
								<option value="">Choose</option>

							</select>
						</div>-->
						
						<!--<div class="form-group browser-default col-md-4">
                              <label for="attachment">Attachment</label>
                              <select id="initiativeattachment" name="initiativeattachment" class="form-control">
                                  <option value="">--Select Option--</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                              </select>
                          </div>-->
						
						
					</div>
					<div class="form-line right">
						<button type="button" class="btn-default1 btn"
							data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
						<button type="submit" class="initative_save_btn" value="Save" data-i18n="Save">Save</button>
						<input type="hidden" name="action" value="" />
						<input type="hidden" name="subCreatedById" id="subCreatedById" value="" />
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<div
					class="d-flex flex-column flex-fill ml-4 mb-5 text-left font-11">
					<div class="d-flex flex-row">
						<p class="kpi_audit">Audit</p>
					</div>
					<div class="d-flex flex-row">
						<div class="d-flex flex-column">
							<p>
								<span >Created By : </span><span id="subCreatedBy"></span>
							</p>
							<p>
								<span>Created Date : </span><span id="subCreatedByDate"></span>
							</p>
						</div>
						<div class="d-flex flex-column pl-5">
							<p>
								<span>Modified By : </span><span id="subUpdatedBy"></span>
							</p>
							<p>
								<span>Modified Date : </span><span id="subUpdatedByDate"></span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script>
	jQuery.validator.setDefaults({
		  debug: false,
		  success: "valid"
		});
		$( "#sub_initative_Form" ).validate({
		  rules: {
			  subinitiative_name: {
		      required: true
		    },
		    subinitiative_desc: {
		      required: true
		    },
		    sub_initative_progress: {
		      required: true,
		      digits: true,
		      min: 0,
		      max: 100
		    },
		    sub_Initiative_date: {
			      required: true
			}
		  },
		   messages: {
	            required: "Name is required"
	        },
	        submitHandler: function(form) {
	        	handleSubInitiativeSave();
	        }
		});
</script>