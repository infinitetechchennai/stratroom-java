            <div class="modal fade sub_activities_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header modalheadercolor">
                            <h6 class="modal-title" id="myLargeModalLabel_1">Activities Description</h6>
                            <button type="button" class="close" id="activClosePopup" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="activitiesForm">
                                <div class="form-row">
                                    <input type="hidden" name="initiativeID" id="initiativeID" />
                                    
			                       <div class="form-group col-md-12" id="activities_id_wrapper" style="display: none">
										<label for="activities_id">ID</label> 
										<input type="text" class="form-control browser-default" name="activities_id" id="activities_id" placeholder="">
										<input type="hidden" name="activities_hidden_id" id="activities_hidden_id">
									</div>
								</div>
								<div class="form-row">
                                    <div class="form-group col-md-12">
                                        <input type="text" name="initiativeIdd" id="initiativeIdd">
                                        <label for="subInitative_desc">Sub Initiatives</label>
									     <select name="subInitative_desc" id="subInitative_desc"></select>
                                    </div>
                                </div><hr/>
								<div class="form-row">
                                    <div class="form-group col-md-12">
                                        <label for="sub_initative_desc" data-i18n="Name">Name</label>
                                        <textarea class="form-control browser-default" name="activities_desc" id="activities_desc"  cols="" rows="6" autocomplete="off"></textarea>
                                    </div>
                                </div><hr/>
                                <div class="form-row">
                                	<!--<div class="form-group col-md-4">
                                        <label for="sub_initative_desc">Name</label>
                                        <input type="text" class="form-control browser-default" name="activities_name" id="activities_name" placeholder="">
                                    </div>-->
                                    <div class="form-group col-md-6">
                                        <label for="sub_initative_progress">Progress (%)</label>
                                        <input type="number" min="0" max="100" autocomplete="off" class="form-control browser-default" name="activities_progress" id="activities_progress" placeholder="" value="0">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="sub_initative_start_end">Start / End Date</label>
                                        <input type="text" class="form-control browser-default datepicker-here" autocomplete="off" name="activitierange" data-range="true" data-multiple-dates-separator=" - " data-language="en" id="activities_start_end"/>
                                    </div>
                                  </div>
                                <div class="form-line right">
                                    <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
                                    <button type="submit" class="initative_save_btn activity_save_btn" value="Save" data-i18n="Save">Save</button>
                                    <input type="hidden" name="action" value="" />
                                    <input type="hidden" name="activCreatedById" id="activCreatedById" value="" />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <div class="d-flex flex-column flex-fill ml-4 mb-5 text-left font-11">
                                <div class="d-flex flex-row">
                                    <p class="kpi_audit">Audit</p>
                                </div>
                                <div class="d-flex flex-row">
									<div class="d-flex flex-column">
										<p>
											 <span >Created By : </span><span id="activCreatedBy"></span>
										</p>
										<p>
											<span>Created Date : </span><span id="activCreatedByDate"></span>
										</p>
									</div>
									<div class="d-flex flex-column pl-5">
										<p>
											<span>Modified By : </span><span id="activUpdatedBy"></span>
										</p>
										<p>
											<span>Modified Date : </span><span id="activUpdatedByDate"></span>
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