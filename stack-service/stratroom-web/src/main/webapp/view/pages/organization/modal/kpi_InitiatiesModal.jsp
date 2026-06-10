
            <!-- #Start Kpi Initiaties PopUp -->

            <div class="modal fade kpi_initiaties_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header modalheadercolor">
                            <h6 class="modal-title" id="myLargeModalLabel_1">Initiative Description</h6>
                            <button type="button" class="close" id="kpiInitiatiesModal" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="kpi_initative_Form">
                                <div class="form-row" id="kpi_Initiative_id_wrapper" style="display: none">
                                	<div class="form-group col-md-12">
										<label for="sub_Initiative_id">ID</label> <input type="text"
											class="form-control browser-default" name="kpi_Initiative_id"
											id="kpi_Initiative_id" placeholder="">
											<input type="hidden" name="kpiinitiativeID" id="kpiinitiativeID" />
									</div>
                                </div>
                                <input type="hidden" name="impact_kpi_id" id="impact_kpi_id" />
                                <div class="form-row">
                                    <div class="form-group col-md-12">
                                        <label for="sub_initative_desc" data-i18n="Name">Name</label>
                                        <textarea type="text" class="form-control browser-default" name="kpi_initative_desc" id="kpi_initative_desc" rows="6" placeholder="" autocomplete="off"></textarea>
                                    </div>
                                    <input type="hidden" name="action" value="" />
                                </div><hr/>
                                <div class="form-row">
                                
                                    <div class="form-group col-md-6">
                                        <label for="sub_initative_progress">Progress</label>
                                        <input type="number" min="0" max="100" class="form-control browser-default" name="kpi_initative_progress" id="kpi_initative_progress" placeholder="" autocomplete="off">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="sub_initative_start_end">Start / End Date</label>
                                        <input type="text" name="kpi_initiaties_date" id="kpi_initiaties_date" data-range="true" data-multiple-dates-separator=" - " data-language="en" class="form-control browser-default date_pickers" autocomplete="off" />
                                    </div>
                                   <!--<div class="form-group browser-default col-md-4">
                                        <label for="attachment">Attachment</label>
                                        <select id="attachment" name="attachment" class="form-control">
                                        	<option value="">--Select Option--</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                        </select>
                                    </div>-->
                                </div>
                                <div class="form-line right">
                                    <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
                                    <button class="initative_save_btn" value="Save" data-i18n="Save">Save</button>
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
                                        <p><span>Created By : </span><span id="createdBy"></span></p>
                                        <p><span>Created Date : </span><span id="createdByDate"></span></p>
                                    </div>
                                    <div class="d-flex flex-column pl-5">
                                        <p><span>Modified By : </span><span id="updatedBy"></span></p>
                                        <p><span>Modified Date : </span><span id="updatedByDate"></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- #END# kpi Initiaties PopUp -->
            <script>
	jQuery.validator.setDefaults({
		  debug: false,
		  success: "valid"
		});
		$( "#kpi_initative_Form" ).validate({
		  rules: {
			  kpi_initative_desc: {
		      required: true
		    },
		    kpi_initative_progress: {
		      required: true,
		      digits: true,
				min:0,
				max:100
		    },
		    kpi_initiaties_date: {
		      required: true
		    },
		    kpi_initiaties_date: {
			      required: true
			    }
		  },
		   messages: {
	            required: "Name is required"
	        },
	        submitHandler: function(form) {
	        	handleKpiInitiativeSave();
	        }
		});
</script>