<!-- #Start Swot Desc PopUp -->

<div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
	id="strength_desc_add_popup" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
	<div
		class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="swotheader_title">Add Strength Description</h4>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<form id="swot_strength_Form" class="card custom-card border-0">
					<div class="card-body">
						<div class="grid gap-3">
                            
                            <!-- Hidden ID field -->
                            <div class="g-col-12" id="swot_id_wrapper" style="display: none">
                                <label for="swot_id" data-translate="ID">ID</label>
                                <input type="text" class="form-control" id="swot_id"/>
                            </div>

							<div class="g-col-12">
								<label for="strength" class="form-label" id="swotlabeltitle">Strength</label>
								<textarea class="form-control" id="strength" name="swot_strength" placeholder="Add Description" rows="3" autocomplete="off"></textarea>
							</div>

							<div class="g-col-12 g-col-md-6">
								<label for="strength_type" class="form-label" data-translate="type">Type</label>
								<select id="strength_type" name="strength_type"
									class="form-select select-dropdown-add-swotanalysis" data-placeholder="Select Type">
									<option value="" selected disabled>Choose Type</option>
									<option value="Internal">Internal</option>
									<option value="External">External</option>
								</select>
							</div>

							<div class="g-col-12 g-col-md-6">
								<label for="strength_next_due_date" class="form-label" data-translate="nextDue">Next Due</label>
								<input type="text" class="form-control date_pickers_single" name="strength_next_due_date"
									id="strength_next_due_date" autocomplete="off" data-language="en"/>
							</div>

							<div class="g-col-12 g-col-md-6">
								<label for="department_swot" class="form-label" data-translate="Department">Department</label>
								<select id="department_swot" class="modal-custom-select select2" name="department_swot" style="width: 100%;">
				                </select>
							</div>

							<div class="g-col-12 g-col-md-6">
								<label for="strength_impact" class="form-label" data-translate="BusinessImpact">Business Impact
								</label>
								<select id="strength_impact" name="strength_impact"
									class="form-select select-dropdown-add-swotanalysis select2" multiple
									data-placeholder="Select Business Impact" style="width: 100%;">
									<!-- Options will be loaded dynamically -->
								</select>
							</div>

							<div class="g-col-12">
								<div class="form-group">
									<label class="form-label" data-translate="Status">Status</label>
									<div class="text-start">
										<div class="form-check form-check-inline">
											<input class="form-check-input" type="radio" name="strengthstatus"
												id="defaultChecked1" value="success" checked>
											<label class="form-check-label" for="defaultChecked1">
												<img src="/stratroom/images/buzzer-green-i.svg" width="16" height="16" alt="good">
											</label>
										</div>
										<div class="form-check form-check-inline">
											<input class="form-check-input" type="radio" name="strengthstatus"
												id="defaultChecked2" value="warning">
											<label class="form-check-label" for="defaultChecked2">
												<img src="/stratroom/images/buzzer-yellow-i.png" width="16" height="16" alt="good">
											</label>
										</div>
										<div class="form-check form-check-inline">
											<input class="form-check-input" type="radio" name="strengthstatus"
												id="defaultChecked3" value="danger">
											<label class="form-check-label" for="defaultChecked3">
												<img src="/stratroom/images/buzzer-red-i.svg" width="16" height="16" alt="critical">
											</label>
										</div>
									</div>
								</div>
							</div>
                            
                            <!-- Hidden fields from old form -->
                            <input type="hidden" name="action" value="" />
            				<input type="hidden" name="id" value="" />
            				<input type="hidden" name="flagtype" value="" />

						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close" data-translate="Cancel">
							Cancel
						</button>
						<button class="btn btn-primary initative_save_btn submitevent" value="Save" data-translate="Save">Save</button>
					</div>
				</form>
			</div>

			
		</div>
	</div>
</div>

<!-- <div class="modal fade" id="strength_desc_add_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        
                        <div class="modal-header">
				            <h4 id="swotheader_title"></h4>
				            <button type="button" class="close pull-right" data-dismiss="modal">
				              &times;
				            </button>
				        </div>
				        
                        <div class="modal-body">
                            <form id="swot_strength_Form">
                                
								<div class="row">
              						<div class="form-group col-md-12" id="swot_id_wrapper" style="display: none">
                						<label for="meeting-name">ID</label>
                						<input type="text" class="modal-custom-input" id="swot_id" style="height: 38px !important; width: 98% !important;"/>
              						</div>
            					</div>
            					
                                <div class="row">
					              <div class="form-group col-md-12">
					                <label for="meeting-name" id="swotlabeltitle"></label>
					                <textarea class="modal-custom-textarea" id="strength" name="swot_strength" rows="4" autocomplete="off"></textarea>
					              </div>
						        </div>
                                    <input type="hidden" name="action" value="" />
            						<input type="hidden" name="id" value="" />
            						<input type="hidden" name="flagtype" value="" />
                                
                             <div class="row m-t-10">
				              <div class="form-group col-md-6">
				                <label for="type" data-i18n="Type">Type</label>
				                <select name="strength_type" id="strength_type" class="modal-custom-select" style="height: 38px !important;">
				                  <option value="" data-i18n="Choose">Choose Type</option>
				                  <option value="Internal">Internal</option>
				                  <option value="External">External</option>
				                </select>
				              </div>
				
				              <div class="form-group col-md-6">
				                <label for="datepicker">Next Due</label>
				                <i class="far fa-calendar input-calender-icon"></i>
				                <input type="text" name="strength_next_due_date" id="strength_next_due_date" class="modal-custom-input date_pickers_single" autocomplete="off" style="height: 38px !important;width: 94% !important;" data-language="en"/>
				              </div>
				            </div>
                            
                            <div class="row m-t-10">
				              <div class="form-group col-md-12">
				                <label for="meeting-name" data-i18n="Department">Department</label>
				                <select id="department_swot" class="modal-custom-select select2" name="department_swot">
				                </select>
				              </div>
				            </div>
                            <div class="row m-t-10"></div>    
                            <div class="row m-t-10">
				              <div class="form-group col-md-12">
				                <label for="meeting-name">Business Impact</label>
				                <select id="strength_impact" class="modal-custom-select select2" name="strength_impact">
				                </select>
				              </div>
				            </div>
                          <div class="row m-t-10"></div>
                          <div class="row m-t-10">
              <div class="form-group col-12">
                <label for="meeting-name">Status</label>
              </div>
            </div>

            <div class="row">
              <div class="form-group col-4 custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="defaultChecked1" value="success" name="strengthstatus" checked/>
                <label class="custom-control-label" for="defaultChecked1">
                  <i class="fas fa-flag status-flag" style="color: #20eaab;"></i>
                </label>
              </div>

              <div class="form-group col-4 custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="defaultChecked2" value="warning" name="strengthstatus"/>
                <label class="custom-control-label" for="defaultChecked2">
                  <i class="fas fa-flag status-flag" style="color: #fffb10;"></i>
                </label>
              </div>

              <div class="form-group col-4 custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="defaultChecked3" value="danger" name="strengthstatus"/>
                <label class="custom-control-label" for="defaultChecked3">
                  <i class="fas fa-flag status-flag" style="color: #ea2020;"></i>
                </label>
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
						<button class="initative_save_btn submitevent">
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

<!-- #END# kpi Desc PopUp -->
<script>

	$.validator.setDefaults({ ignore: ":hidden:not(.chosen-select)" });
	jQuery.validator.setDefaults({
		debug: false,
		success: "valid"
	});
	$("#swot_strength_Form").validate({
		rules: {
			swot_strength: {
				required: true
			},
			strength_type: {
				required: true
			},
			strength_next_due_date: {
				required: true
			}
		},
		messages: {
			required: "Name is required"
		},
		submitHandler: function (form) {
			saveSwot();
		}
	});

</script>