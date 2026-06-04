            <!--#START Sub Milestone -->
            <div class="modal fade sub_milestone_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header modalheadercolor">
                            <h6 class="modal-title" id="myLargeModalLabel_1">Milestone Description</h6>
                            <button type="button" class="close" id="mileClosePopup" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="mileStonesForm">
                                <div class="form-row">
                                    <input type="hidden" name="initiativeID" id="initiativeID" />
	                       <div class="form-group col-md-12" id="milstone_id_wrapper" style="display: none">
								<label for="milestone_id">ID</label> <input type="text"
									class="form-control browser-default" name="milestone_id"
									id="milestone_id" placeholder="">
							</div>
						</div>
						<div class="form-row">
                                    <div class="form-group col-md-12">
                                        <label for="sub_initative_desc" data-i18n="Name">Name</label>
                                        <textarea class="form-control browser-default" name="milestone_desc" id="milestone_desc" cols="" rows="6" autocomplete="off"></textarea>
                                    </div>
                                </div><hr/>
                                <div class="form-row">
                                     <div class="form-group col-md-6">
                                        <label for="sub_initative_progress">Progress (%)</label>
                                        <input type="number" min="0" max="100" class="form-control browser-default" name="milestone_progress" id="milestone_progress" placeholder="" value="0">
                                    </div>
                                
                                    <div class="form-group col-md-6">
                                        <label for="sub_initative_start_end">End Date</label>
                                        <input type="text" class="form-control browser-default date_pickers_single datepicker-here" name="milestone_enddate" data-language="en" autocomplete="off" id="milestone_start_end"/>
                                    </div>
                                   
                                </div>
                                <div class="form-line right">
                                    <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
                                    <button type="submit" class="initative_save_btn" value="Save" data-i18n="Save">Save</button>
                                    <input type="hidden" name="action" value="" />
                                    <input type="hidden" name="mileCreatedById" id="mileCreatedById" value="" />
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
											<span >Created By : </span><span id="mileCreatedBy"></span>
										</p>
										<p>
											<span>Created Date : </span><span id="mileCreatedByDate"></span>
										</p>
									</div>
									<div class="d-flex flex-column pl-5">
										<p>
											<span>Modified By : </span><span id="mileUpdatedBy"></span>
										</p>
										<p>
											<span>Modified Date : </span><span id="mileUpdatedByDate"></span>
										</p>
									</div>
							</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--#END Sub Milestone -->
 
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