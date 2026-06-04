<!-- #Start Initatives Desc PopUp --> 
 <div class="modal custom-modal fade initatives_description_popup" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
 role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" data-translate="Initiative Description">Initiative Description</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
			<form id="InitiativeForm">
          <div class="card custom-card border-0">
            <div class="card-body">
              <div class="grid gap-3">
                <div class="g-col-12 g-col-md-2">
                  <div class="form-group mt-n2 col-md-2" id="Initiative_id_wrapper"
							style="display: none">
							<label for="Initiative_id" data-i18n="ID" data-translate="ID">ID</label> 
              <input type="text" class="form-control browser-default" name="Initiative_id"	id="Initiative_id" placeholder="">
						</div>
                </div>
                <div class="g-col-12">
                  <div class="form-group">
                    <label for="Initiative_name" class="form-label" data-translate="Name">Name</label>
                    <input type="text" class="form-control" id="Initiative_name" name="Initiative_name"
                      placeholder="Name" />
                  </div>
                </div>
                <div class="g-col-12">
                  <div class="form-group">
                    <label for="Initiative_description" class="form-label" data-translate="Description">Description</label>
                    <textarea class="form-control modal-custom-textarea" id="Initiative_description"
                      name="Initiative_description" placeholder="Description" rows="3"></textarea>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="Initiative_owner" class="form-label" data-translate="Owner">Owner</label>
                    <select id="Initiative_owner" name="Initiative_owner" class="form-select select-dropdown-add-objective" data-placeholder="Select Owner">
                      
                    </select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="Initiative_Department" class="form-label" data-translate="Department">Department</label>
                    <select id="Initiative_Department" name="" class="form-select select-dropdown-add-objective" data-placeholder="Select a Department">
                     
                    </select>
                  </div>
                </div>
                  <div class="g-col-12 g-col-md-6">
                <div class="form-group">
                <label for="category" class="form-label" data-translate="Category">Category</label>
<select id="categoryType" name="category" class="form-select select-dropdown-add-objective" data-placeholder="Select Category">
  <option value="">Select</option>
  <option value="Strategy & Leadership">Strategy & Leadership</option>
  <option value="Operations">Operations</option>
  <option value="Finance">Finance</option>
  <option value="Sales">Sales</option>
  <option value="Marketing">Marketing</option>
  <option value="Customer">Customer</option>
  <option value="Human Resources (HR)">Human Resources (HR)</option>
  <option value="Information Technology (IT)">Information Technology (IT)</option>
  <option value="Risk Management">Risk Management</option>
  <option value="Compliance">Compliance</option>
  <option value="Legal">Legal</option>
  <option value="Procurement & Supply Chain">Procurement & Supply Chain</option>
  <option value="Product Development & Innovation">Product Development & Innovation</option>
  <option value="Sustainability & ESG">Sustainability & ESG</option>
</select>

                </div>
              </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
					<span id="Scorecard_hidden" data-impact_hidden=""></span>
                    <label for="Scorecard_select" class="form-label" data-translate="Scorecard">Scorecard</label>
                    <select id="Scorecard_select" name="scorecard" class="form-select select-dropdown-add-objective" data-placeholder="Select a Scorecard">
                     
                    </select>
                  </div>
                </div>

                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
					<span id="Perspective_hidden" data-impact_hidden=""></span>
                    <label for="Perspective_select" class="form-label" data-translate="Perspective">Perspective</label>
                    <select id="Perspective_select" name="perspective" class="form-select select-dropdown-add-objective" data-placeholder="Select a Perspective">
                    
                    </select>
                  </div>
                </div>


                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
					<span id="Objective_hidden" data-impact_hidden=""></span>
                    <label for="Objective_select" class="form-label" data-translate="Objective">Objective</label>
                    <select id="Objective_select" name="objective"  class="form-select select-dropdown-add-objective" data-placeholder="Select an Objective">
                      
                    </select>
                  </div>
                </div>

                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="kpi_select" class="form-label" data-translate="KPI">KPI</label>
                    <select id="kpi_select" name="kpi_select" class="form-select select-dropdown-add-objective"  multiple  data-placeholder="Select an KPI">
                     
                    </select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="Initiative_start_end_date" class="form-label" data-translate="Planned Start Date/End Date">Planned Start Date/End Date</label>
                    <input type="text" class="form-control browser-default datepicker-here"
									name="Initiative_start_end_date" data-range="true" data-multiple-dates-separator=" - " data-language="en" 
                                 id="Initiative_start_end_date" autocomplete="off">
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="Actual_start_end_date" class="form-label" data-translate="Actual Start Date/End Date">Actual Start Date/End Date</label>
                  <input type="text" class="form-control browser-default datepicker-here"
                      				data-range="true" name="Actual_start_end_date" id="Actual_start_end_date" data-multiple-dates-separator=" - " data-language="en" id="air-date-sub-init" autocomplete="off"/>
                  			</div>						
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="statusType" class="form-label" data-translate="Status">Status</label>
                    <select id="statusType" name="statusType" class="form-select select-dropdown-add-objective" aria-invalid="false">
                      <option value="" data-i18n="Choose">Choose</option>
									<option value="manual" data-i18n="Manual">Manual</option>
									<option value="weighted">Weighted</option>
									<option value="first">First</option>
									<option value="second">Second</option>
									<option value="third">Third</option>
									<option value="fourth">Fourth</option>

                    </select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="Initiative_progress" data-translate="Progress (%)">Progress (%)</label>
                    <input type="number" min="0" max="100" class="form-control browser-default"
                      name="Initiative_progress" id="Initiative_progress" placeholder="Progress (%)" value="0">
                  </div>
                </div>
                <div class="g-col-12">
                  <div class="form-group">
                    <label for="kpi_fields" class="form-label" data-translate="Manual Status">Manual Status</label>
                    <div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input green" type="radio" name="status" id="primary1" value="green">
                        <label class="form-check-label" for="statusGreen">Green</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input orange" type="radio" name="status" id="primary2"
                          value="orange">
                        <label class="form-check-label" for="statusOrange">Orange</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input red" type="radio" name="status" id="primary3" value="red">
                        <label class="form-check-label" for="statusRed">Red</label>
                      </div>

                    </div>
                  </div>
                </div>
                <div class="g-col-12">
                  <div class="form-group">
                    <label for="kpi_fields" class="form-label" data-translate="Data Fields">Data Fields</label>

                    <div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="actualId">
                        <label class="form-check-label" id="actuallabel" for="actualId" data-translate="Actual">Actual</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="targetId">
                        <label class="form-check-label" for="targetId" id="targetlabel" data-translate="Target">Target</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="budgetID">
                        <label class="form-check-label" for="budgetID" id="budgetlabel" data-translate="Budget">Budget</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="forcastId">
                        <label class="form-check-label" for="forcastId" id="forecastlabel" data-translate="Forecast">Forecast</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="g-col-12">
                  <div class="form-group">
                    <label for="kpi_fields" class="form-label" data-translate="Amount">Amount</label>

                    <div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="Totalid">
                        <label class="form-check-label" id="totallabel" for="amTotal" data-translate="Total">Total</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="Utilizedid">
                        <label class="form-check-label"  id="utilizedlabel" for="amUtillized" data-translate="Utilized">Utillized</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="Balanceid">
                        <label class="form-check-label"  id="balancelabel" for="amBalance" data-translate="Balance">Balance</label>
                      </div>
                    </div>
                  </div>
                </div>
                	<input type="hidden" name="Initiative_show_id" value="" id="Initiative_show_id" />
                	<input type="hidden" name="action" value="" />
					<input type="hidden" name="createdById" id="createdById" value="" />
                 <div class="g-col-12 g-col-md-6">
                  <div class="form-group" style="float: right;">
                     <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close" data-translate="Cancel">
                  Cancel
                   </button>
                  <button class="btn btn-primary" value="Save" data-translate="Save">Save</button>
                  </div>
                </div>
                 
              </div>
            </div>
			
         
       </form>  </div>
        <div class="modal-footer">
       
          <div class="modal-audit">
              <h5 class="title" data-translate="Audit">Audit</h5>
            <div class="audit-listing">
              <div class="audit-box">
                <div class="title" data-translate="Created By">Created By :</div>
                <div class="text" id="createdBy"></div>
              </div>
              <div class="audit-box">
                <div class="title" data-translate="Modified By">Modified By :</div>
                <div class="text" id="updatedBy"></div>
              </div>
              <div class="audit-box">
                <div class="title" data-translate="Created Date">Created Date :</div>
                <div class="text" id="createdByDate"></div>
              </div>
              <div class="audit-box">
                <div class="title" data-translate="Modified Date">Modified Date :</div>
                <div class="text" id="updatedByDate"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
        
      </div>
    </div>


<!-- #END# Initatives Desc PopUp -->


<script>
	jQuery.validator.setDefaults({
		  debug: false,
		  success: "valid"
		});
		$( "#InitiativeForm" ).validate({
	        submitHandler: function(form) {
	        	handleInitiativeSave();
	        }
		});
		
</script>