<!-- <div class="modal fade scorecard_description_popup" tabindex="-1"
	role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content modal-content-setscrollheight">
			<div class="modal-header">
				<h6 class="modal-title" id="myLargeModalLabel" data-i18n="Scorecard Description">Scorecard Description</h6>
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<form id="scorecardForm">
					<div class="form-row">
						<div class="form-group col-md-3" id="scorecard_id_wrapper">
							<label for="scorecard_id" data-i18n="ID">ID</label> <input type="text"
								class="form-control browser-default" name="scorecard_id"
								id="scorecard_id" placeholder="" autocomplete="off">
						</div>
						<div class="form-group col-md-9">
							<label for="scorecard_name" data-i18n="Name">Name</label> <input type="text"
								class="form-control browser-default" name="scorecard_name"
								id="scorecard_name" placeholder="" autocomplete="off" onKeyPress="return scorecardname(event);">
						</div>
					</div>
					<hr />
					<div class="form-group mt--10">
						<label for="scorecard_description" data-i18n="Description">Description</label>
						<textarea class="form-control browser-default"
							name="scorecard_description" id="scorecard_description"
							placeholder="" cols="" rows="6" autocomplete="off"></textarea>
					</div>
					<hr />
					<div class="form-row">
						<div class="form-group browser-default col-md-6">
							<label for="scorecard_owner" data-i18n="Owner">Owner</label> <select
								id="scorecard_owner" name="scorecard_owner"
								class="form-control browser-default" style="display: block !important;">
							</select>
						</div>
						
						<div class="form-group col-md-6">
							<label for="" data-i18n="Department">Department</label>
							<select class="form-control select2" name="scorecarddept" id="scorecarddept">
           					</select>
						</div>
					</div>
					<hr/>
					<div class="form-row">
						
						<div class="form-group col-md-6">
							<label for="kpi_start_end_date" data-i18n="Start/End Date">Start/End Date</label> <input
								type="text" id="date_range" name="date_range"
								class="form-control browser-default date_pickers datepicker-here"
								data-range="true" data-multiple-dates-separator=" - "
								data-language="en" autocomplete="off" />
						</div>
						
						<div class="form-group col-md-6">
							<label for="scorecard_status" data-i18n="Status">Status</label> <select
								id="scorecard_status" name="scorecard_status"
								class="form-control browser-default">
								<option value="" data-i18n="Choose">Choose</option>
								<option value="Manual" data-i18n="Manual">Manual</option>
								<option value="Weighted" data-i18n="Weighted">Weighted</option>
								
							</select>
						</div>

					</div>
					<hr/>
					
					<div class="form-row performancehidescorecard">
	                  <div class="form-group col-md-12 focused">
	                    <label for="objective_name" class="" data-i18n="Performance">Performance</label>
	                    <input type="text" class="form-control browser-default" name="scorecard_formula" id="scorecard_formula" readonly="readonly" data-toggle="modal" data-target=".scorecard_custom_threshold_popup" onclick='handleCustomThresholdEvent("SCORECARDCONFIG")' role="button">
	                  </div>
                	</div>
                	<hr/>	
					
					<div class="form-row customaggregationElement">
						<div class="form-group col-md-12" id="scorecard_reportee">
						
							<label  data-i18n="Custom Aggregation">Custom Aggregation</label>
							<select id="scorecard_Custom_reportee" name="perspective_owner[]" class="form-control browser-default perspective-multi-select"  multiple="multiple" disabled="disabled" readonly>
							</select>
						
						</div>
					</div>
					
					<div class="row mt-2">
					  <div class="col-12">
						<div class="form-line right">
						  <button type="button" class="btn-default1 btn"
									data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
						  <button type="submit" class="initative_save_btn" data-i18n="Save" value="Save">Save</button>
						</div>
					  </div>
					</div>
					<input type="hidden" name="createdById" id="createdById" value="" />
					<input type="hidden" name="action" value="" /> <input
						type="hidden" name="defaultscr" value="" />
				</form>
			</div>
			<hr>
			<div class="modal-footer">
				<div
					class="d-flex flex-column flex-fill ml-4 mb-5 text-left font-11">
					<div class="d-flex flex-row">
						<p class="kpi_audit" data-i18n="Audit">Audit</p>
					</div>
					<div class="d-flex flex-row">
						<div class="d-flex flex-column">
							<p>
								<span data-i18n="Created By">Created By : </span><span id="configcreatedBy"></span>
							</p>
							<p>
								<span data-i18n="Created Date">Created Date : </span><span id="configcreatedByDate"></span>
							</p>
						</div>
						<div class="d-flex flex-column pl-5">
							<p>
								<span data-i18n="Modified By">Modified By : </span><span id="configupdatedBy"></span>
							</p>
							<p>
								<span data-i18n="Modified Date">Modified Date : </span><span id="configupdatedByDate"></span>
							</p>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</div> -->

<div
  class="modal custom-modal fade kpi_setting scorecard_description_popup"
  id="add-settings-modal"
  data-bs-backdrop="static"
  data-bs-keyboard="false"
  tabindex="-1"
  role="dialog"
  aria-labelledby="myLargeModalLabel_1"
  aria-hidden="true"
>
  <div
    class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-lg-600"
  >
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" data-translate="page.scorecard.settings">Settings</h4>
        <button
          type="button"
          class="btn-close"
          data-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>

      <div class="modal-body">
        <form id="scorecardForm">
          <div class="card custom-card border-0">
            <div class="card-body">
              <div class="grid gas-3">
                <div class="form-group col-md-3" id="scorecard_id_wrapper" style="display: none;">
                  <label for="scorecard_id" data-i18n="ID">ID</label>
                  <input
                    type="text"
                    class="form-control browser-default"
                    name="scorecard_id"
                    id="scorecard_id"
                    placeholder=""
                    autocomplete="off"
                  />
                </div>
                <div class="g-col-12">
                  <div class="form-group">
                    <label for="asName" class="form-label" data-translate="page.scorecard.scorecardItems.name">Name</label>
                   <input type="text"
								class="form-control browser-default" name="scorecard_name"
								id="scorecard_name" placeholder="" autocomplete="off" onKeyPress="return scorecardname(event);">
                  </div>
                </div>
                <div class="g-col-12">
                  <div class="form-group">
                    <label for="asDescription" class="form-label" data-translate="page.scorecard.scorecardItems.description"
                      >Description</label
                    >
                   <textarea class="form-control browser-default"
							name="scorecard_description" id="scorecard_description"
							placeholder="" cols="" rows="6" autocomplete="off"></textarea>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="asOwner" class="form-label" data-translate="page.scorecard.scorecardItems.owner">Owner</label>
                     <select
								id="scorecard_owner" name="scorecard_owner"
								class="form-control browser-default" style="display: block !important;">
							</select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="asDepartment" class="form-label" data-translate="page.scorecard.scorecardItems.department"
                      >Department</label
                    >
                   <select class="form-control select2" name="scorecarddept" id="scorecarddept">
           					</select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="asStartEndDate" class="form-label" data-translate="page.scorecard.scorecardItems.startEndDate"
                      >Start/End Date</label
                    >
                    <input
								type="text" id="date_range" name="date_range"
								class="form-control browser-default date_pickers datepicker-here"
								data-range="true" data-multiple-dates-separator=" - "
								data-language="en" autocomplete="off" />
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="asStatus" class="form-label" data-translate="page.scorecard.scorecardItems.status">Status</label>
                    <select
								id="scorecard_status" name="scorecard_status"
								class="form-control browser-default">
								<option value="" data-i18n="Choose">Choose</option>
								<option value="Manual" data-i18n="Manual">Manual</option>
								<option value="Weighted" data-i18n="Weighted">Weighted</option>
								
							</select>
                  </div>
                </div>
                <div class="g-col-12">
                  <div class="form-group">
                    <label for="asPerformance" class="form-label" data-translate="page.scorecard.scorecardItems.performance"
                      >Performance</label
                    >
                   <input type="text" class="form-control browser-default" name="scorecard_formula" id="scorecard_formula" readonly="readonly" data-toggle="modal" data-target=".scorecard_custom_threshold_popup" onclick='handleCustomThresholdEvent("SCORECARDCONFIG")' role="button">
                  </div>
                </div>
              </div>
            </div>
          </div>

		   <div class="g-col-12">
				<div class="form-group">
					<label for="scorecardFields" class="form-label" data-translate="scorecard.Scorecard Fields">Scorecard Fields</label>
					<div class="d-grid grid-template gap-2">
					<div class="form-check">
					<input class="form-check-input scorecardviewsettingchange" type="checkbox" id="scorecardactual" name="scorecard_fields" value="Actual" >
					<label class="form-check-label" for="scorecardactual" data-i18n="Actual" data-translate="scorecard.Actual">Actual</label>
					</div>
					<div class="form-check">
						<input class="form-check-input scorecardviewsettingchange" type="checkbox" id="scorecardtarget" value="Target" name="scorecard_fields">
						<label class="form-check-label" for="scorecardtarget" data-translate="scorecard.Target">Target</label>
					</div>
					<div class="form-check">
						<input class="form-check-input scorecardviewsettingchange" type="checkbox" id="scorecardbudget" value="Budget" name="scorecard_fields">
						<label class="form-check-label" for="scorecardbudget" data-translate="scorecard.Budget">Strech</label>
					</div>
					<div class="form-check">
						<input class="form-check-input scorecardviewsettingchange" type="checkbox" id="scorecardforecast" value="Forecast" name="scorecard_fields">
						<label class="form-check-label" for="scorecardforecast" data-translate="scorecard.Forecast">Stable</label>
					</div>
					<div class="form-check">
						<input class="form-check-input scorecardviewsettingchange" type="checkbox" id="scorecardbaseline" value="Baseline" name="scorecard_fields">
						<label class="form-check-label" for="scorecardbaseline" data-translate="controlpanel.baseLine">Baseline</label>
					</div>
					<div class="form-check">
						<input class="form-check-input scorecardviewsettingchange" type="checkbox" id="scorecardscore" value="Index" name="scorecard_fields">
						<label class="form-check-label" for="scorecardscore" data-translate="scorecard.Index">Index</label>
					</div>
					<div class="form-check">
						<input class="form-check-input scorecardviewsettingchange" type="checkbox" id="scorecardtrend" value="Trend" name="scorecard_fields">
						<label class="form-check-label" for="scorecardtrend" data-translate="scorecard.Trend">Trend</label>
					</div>
					<div class="form-check">
						<input class="form-check-input scorecardviewsettingchange" type="checkbox" id="scorecardrisk" value="Risk" name="scorecard_fields">
						<label class="form-check-label" for="scorecardrisk" data-translate="modules.Risk">Risk</label>
					</div>

					<div class="form-check">
						<input class="form-check-input scorecardviewsettingchange" type="checkbox" id="scorecarddecline" value="Decline" name="scorecard_fields">
						<label class="form-check-label" for="scorecarddecline" data-translate="scorecard.Decline">Shrink</label>
					</div>

					<div class="form-check">
						<input class="form-check-input scorecardviewsettingchange" type="checkbox" id="scorecardtype" value="Type" name="scorecard_fields">
						<label class="form-check-label" for="scorecardtype" data-translate="scorecard.Type">Type</label>
					</div>
					</div>
				</div>
            </div>

		   <div class="modal-footer">
        <button
          type="button"
          class="btn btn-label-secondary"
          data-dismiss="modal"
          aria-label="Close"
		  data-translate="page.scorecard.scorecardItems.cancel"
        >
          Cancel
        </button>
        <button class="btn btn-primary initative_save_btn" value="Save" data-translate="page.scorecard.scorecardItems.save">Save</button>
      </div>
		  <input type="hidden" name="createdById" id="createdById" value="" />
		  <input type="hidden" name="action" value="" />
		  <input type="hidden" name="defaultscr" value="" />
        </form>
      </div>
     
    </div>
  </div>
</div>
<script>
  jQuery.validator.setDefaults({
    debug: false,
    success: "valid",
  });
  $("#scorecardForm").validate({
    rules: {
      scorecard_name: {
        required: true,
      },
      scorecard_owner: {
        required: true,
      },
      date_range: {
        required: true,
      },
    },
    messages: {
      required: "Please fill all required fields",
    },
    submitHandler: function (form) {
      handleScorecardSave();
    },
  });
</script>
