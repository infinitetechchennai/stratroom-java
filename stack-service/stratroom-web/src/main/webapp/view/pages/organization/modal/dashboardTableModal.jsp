<div class="modal fade" id="drilldown_setting" tabindex="-1" role="dialog" aria-labelledby="drilldownModalLabel"
     aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title fs-5" id="drilldownModalLabel">Drill Down Table Settings</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
        <form id="dashbard_table_Form">
          <!-- KPI Name -->
          <div class="row mb-3">
            <div class="col-12">
              <label for="drilltable_kpi_formula" class="form-label">KPI Name</label>
              <input type="text"
                     class="form-control"
                     name="drilltable_kpi_formula"
                     id="drilltable_kpi_formula"
                     readonly
                     onclick="handleFormulaEvent('DRILLTABLE')"
                     data-bs-toggle="modal"
                     data-bs-target="#kpi_formula_popup"
                     role="button" />
            </div>
          </div>

          <!-- Measurement Frequency -->
          <div class="row mb-3">
            <div class="col-12">
              <label for="drillfrequency" class="form-label">Measurement Frequency</label>
              <select class="form-select" name="drillfrequency" id="drillfrequency">
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Half Yearly">Half Yearly</option>
                <option value="Annually">Annually</option>
              </select>
            </div>
          </div>

          <!-- Data Fields -->
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Data Fields</label>
              <div class="d-flex flex-wrap gap-3 mt-2">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="drillactual" value="actual">
                  <label class="form-check-label" for="drillactual">Actual</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="drilltarget" value="target">
                  <label class="form-check-label" for="drilltarget">Target</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="drillgap" value="gap">
                  <label class="form-check-label" for="drillgap">Gap</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="drillytd" value="ytd">
                  <label class="form-check-label" for="drillytd">YTD</label>
                </div>
              </div>
            </div>
          </div>

          <!-- Hidden Inputs -->
          <input type="hidden" name="action" value="" />
          <input type="hidden" name="id" value="" />
          <input type="hidden" id="tableFieldName" value="Actual" />
          <input type="hidden" id="tabletypeField" value="drilltable" />
        </form>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" onclick="savedashboardTable()">Save</button>
      </div>
    </div>
  </div>
</div>


<div class="modal fade" id="kpidrilldown_setting" tabindex="-1" role="dialog" aria-labelledby="kpiDrilldownModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title fs-5" id="kpiDrilldownModalLabel">KPI DrillDown Settings</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <form id="kpidrilldownform">
                    <div class="row">

                        <!-- Organisation -->
                        <div class="col-12 form-group mb-3">
                            <label for="kpidrillOrg" class="form-label">Organisation</label>
                            <select class="int-status-multi-select form-select" name="kpidrillOrg[]" multiple="multiple" id="kpidrillOrg">
                                <!-- Options will be populated dynamically -->
                            </select>
                        </div>

                        <!-- Scorecard -->
                        <div class="col-12 form-group mb-3">
                            <label for="kpidrillScorecard" class="form-label">Scorecard</label>
                            <select class="int-status-multi-select form-select" name="kpidrillScorecard[]" multiple="multiple" id="kpidrillScorecard">
                                <!-- Options will be populated dynamically -->
                            </select>
                        </div>

                        <!-- KPI -->
                        <div class="col-12 form-group mb-3">
                            <label for="kpidrillkpi" class="form-label">KPI</label>
                            <select class="int-status-multi-select form-select kpiDrillCheckbox" name="kpidrillkpi[]" multiple="multiple" id="kpidrillkpi">
                                <option value="All">All</option>
                                <!-- Additional options can be added dynamically -->
                            </select>
                        </div>

                        <!-- Status -->
                        <div class="col-12 form-group mb-3">
                            <label for="kpidrillstatus" class="form-label">Status</label>
                            <select class="int-status-multi-select form-select" name="kpidrillstatus[]" multiple="multiple" id="kpidrillstatus">
                                <option value="RED">Red</option>
                                <option value="YELLOW">Amber</option>
                                <option value="GREEN">Green</option>
                            </select>
                        </div>

                        <!-- Data Fields (Checkboxes) -->
                        <div class="col-12 form-group mb-3">
                            <label class="form-label">Data Fields</label>
                            <div class="d-flex flex-wrap gap-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="kpidrillactual" value="actual">
                                    <label class="form-check-label" for="kpidrillactual">Actual</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="kpidrilltarget" value="target">
                                    <label class="form-check-label" for="kpidrilltarget">Target</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="kpidrillgap" value="gap">
                                    <label class="form-check-label" for="kpidrillgap">Gap</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="kpidrillBaseline" value="baseline">
                                    <label class="form-check-label" for="kpidrillBaseline">Baseline</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="kpidrillytd" value="ytd">
                                    <label class="form-check-label" for="kpidrillytd">YTD</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="kpidrillScore" value="score">
                                    <label class="form-check-label" for="kpidrillScore">Index</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="kpidrillStatusCheck" value="status">
                                    <label class="form-check-label" for="kpidrillStatusCheck">Status</label>
                                </div>
                            </div>
                        </div>

                        <!-- Hidden Fields -->
                        <input type="hidden" name="action" value="" />
                        <input type="hidden" name="id" class="id" value="" />
                        <input type="hidden" id="kpiDrillInput" value="" />
                        <input type="hidden" id="tableFieldName" value="Actual" />
                        <input type="hidden" id="tabletypeField" class="tabletypeField" value="" />

                    </div>
                      <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary initative_save_btn" id="kpiDrillSaveBtn">Save</button>
            </div>
                </form>
            </div>

          
        </div>
    </div>
</div>
  

<div class="modal fade" id="kpistatuscount_setting" tabindex="-1" role="dialog" aria-labelledby="kpiStatusCountModalLabel"
     aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title fs-5" id="kpiStatusCountModalLabel">KPI Status Count Settings</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
        <form id="kpistatusform">
          <!-- Organisation -->
          <div class="row mb-3">
            <div class="col-12">
              <label for="kpistatusOrg" class="form-label">Organisation</label>
              <select class="int-status-multi-select form-select" name="kpistatusOrg[]" multiple="multiple" id="kpistatusOrg">
                <!-- Options populated dynamically -->
              </select>
            </div>
          </div>

          <!-- Scorecard -->
          <div class="row mb-3">
            <div class="col-12">
              <label for="kpistatusScorecard" class="form-label">Scorecard</label>
              <select class="int-status-multi-select form-select scorecardStatusCheckbox" name="kpistatusScorecard[]" multiple="multiple" id="kpistatusScorecard">
                <option value="All">All</option>
                <!-- Additional options populated dynamically -->
              </select>
            </div>
          </div>

          <!-- Data Fields (Checkboxes) -->
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Data Fields</label>
              <div class="d-flex flex-wrap gap-3 mt-2">
                <!-- Parent / Child -->
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="kpistatusparent" value="parent">
                  <label class="form-check-label" for="kpistatusparent">Parent</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="kpistatuschild" value="child">
                  <label class="form-check-label" for="kpistatuschild">Child</label>
                </div>

                <!-- Status Colors -->
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="kpistatusred" value="red">
                  <label class="form-check-label" for="kpistatusred">Red</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="kpistatuslightred" value="lightred">
                  <label class="form-check-label" for="kpistatuslightred">Light Red</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="kpistatusamber" value="amber">
                  <label class="form-check-label" for="kpistatusamber">Amber</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="kpistatuslightgreen" value="lightgreen">
                  <label class="form-check-label" for="kpistatuslightgreen">Light Green</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="kpistatusgreen" value="green">
                  <label class="form-check-label" for="kpistatusgreen">Green</label>
                </div>
              </div>
            </div>
          </div>

          <!-- Hidden Fields -->
          <input type="hidden" name="action" value="" />
          <input type="hidden" name="id" class="id" value="" />
          <input type="hidden" id="tableFieldName" value="Actual" />
          <input type="hidden" id="tabletypeField" class="tabletypeField" value="" />
          <input type="hidden" id="scorecardStatusInput" value="" />
           <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" id="kpistatusCountSave" class="btn btn-primary initative_save_btn">Save</button>
      </div>
        </form>
      </div>

     
    </div>
  </div>
</div>
<div class="modal fade" id="initiativeCount_setting" tabindex="-1" role="dialog" aria-labelledby="initiativeProgressCountModalLabel"
     aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title fs-5" id="initiativeProgressCountModalLabel">Initiative Progress Count Settings</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
        <form id="initiativeprogressform">
          <!-- Organisation -->
          <div class="row mb-3">
            <div class="col-12">
              <label for="initiativeprogressOrg" class="form-label">Organisation</label>
              <select class="int-status-multi-select form-select" name="initiativeprogressOrg[]" multiple="multiple" id="initiativeprogressOrg">
                <!-- Options populated dynamically -->
              </select>
            </div>
          </div>

          <!-- Initiatives -->
          <div class="row mb-3">
            <div class="col-12">
              <label for="initiativeprogressinitiatives" class="form-label">Initiatives</label>
              <select class="int-status-multi-select form-select initiativeProgressCheckbox" name="initiativeprogressinitiatives[]" multiple="multiple" id="initiativeprogressinitiatives">
                <option value="All">All</option>
                <!-- Additional options populated dynamically -->
              </select>
            </div>
          </div>

          <!-- Data Fields -->
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Data Fields</label>
              <div class="d-flex flex-wrap gap-3 mt-2">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="initiativeprogresschild" value="child">
                  <label class="form-check-label" for="initiativeprogresschild">Child</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="initiativeprogressinprogress" value="inProgress">
                  <label class="form-check-label" for="initiativeprogressinprogress">In Progress</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="initiativeprogresscompleted" value="completed">
                  <label class="form-check-label" for="initiativeprogresscompleted">Completed</label>
                </div>
              </div>
            </div>
          </div>

          <!-- Hidden Fields -->
          <input type="hidden" name="action" value="" />
          <input type="hidden" name="id" class="id" value="" />
          <input type="hidden" id="tableFieldName" value="Actual" />
          <input type="hidden" id="tabletypeField" class="tabletypeField" value="" />
          <input type="hidden" id="initiativeProgressInput" value="" />
           <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" id="initiativeProgressSave" class="btn btn-primary initative_save_btn">Save</button>
      </div>
        </form>
      </div>

     
    </div>
  </div>
</div>

<div class="modal fade" id="blankkpireports_setting" tabindex="-1" role="dialog"
     aria-labelledby="blankKpiReportsModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title fs-5" id="blankKpiReportsModalLabel">Blank KPI Reports Count Settings</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
        <form id="blankpiform">
          <!-- Organisation -->
          <div class="row mb-3">
            <div class="col-12">
              <label for="blankkpiOrg" class="form-label">Organisation</label>
              <select class="int-status-multi-select form-select" name="blankkpiOrg[]" multiple="multiple" id="blankkpiOrg">
                <!-- Options will be populated dynamically -->
              </select>
            </div>
          </div>

          <!-- Scorecard -->
          <div class="row mb-3">
            <div class="col-12">
              <label for="blankkpiScorecard" class="form-label">Scorecard</label>
              <select class="int-status-multi-select form-select" name="blankkpiScorecard[]" multiple="multiple" id="blankkpiScorecard">
                <!-- Options will be populated dynamically -->
              </select>
            </div>
          </div>

          <!-- Data Fields -->
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Data Fields</label>
              <div class="d-flex flex-wrap gap-3 mt-2">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="blankkpiparent" value="parent">
                  <label class="form-check-label" for="blankkpiparent">Parent</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="blankkpichild" value="child">
                  <label class="form-check-label" for="blankkpichild">Child</label>
                </div>
              </div>
            </div>
          </div>

          <!-- Hidden Inputs -->
          <input type="hidden" name="action" value="" />
          <input type="hidden" name="id" class="id" value="" />
          <input type="hidden" id="tableFieldName" value="Actual" />
          <input type="hidden" id="tabletypeField" class="tabletypeField" value="" />
           <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" id="blankKpiSave" class="btn btn-primary initative_save_btn">Save</button>
      </div>
        </form>
      </div>

     
    </div>
  </div>
</div>

<div class="modal fade" id="projectstatuscount_setting" tabindex="-1" role="dialog"
     aria-labelledby="projectStatusCountModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title fs-5" id="projectStatusCountModalLabel">Project Status Count Settings</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
        <form id="projectstatusform">
          <!-- Organisation -->
          <div class="row mb-3">
            <div class="col-12">
              <label for="projectstatusOrg" class="form-label">Organisation</label>
              <select class="int-status-multi-select form-select" name="projectstatusOrg[]" multiple="multiple" id="projectstatusOrg">
                <!-- Options will be populated dynamically -->
              </select>
            </div>
          </div>

          <!-- Initiatives -->
          <div class="row mb-3">
            <div class="col-12">
              <label for="projectstatusinitiatives" class="form-label">Initiatives</label>
              <select class="int-status-multi-select form-select projectStatusCheckbox" name="projectstatusinitiatives[]" multiple="multiple" id="projectstatusinitiatives">
                <option value="All">All</option>
                <!-- Additional options will be populated dynamically -->
              </select>
            </div>
          </div>

          <!-- Data Fields -->
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Data Fields</label>
              <div class="d-flex flex-wrap gap-3 mt-2">
                <!-- Hierarchy -->
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="projectstatusparent" value="parent">
                  <label class="form-check-label" for="projectstatusparent">Parent</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="projectstatuschild" value="child">
                  <label class="form-check-label" for="projectstatuschild">Child</label>
                </div>

                <!-- Status Colors -->
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="projectstatusred" value="red">
                  <label class="form-check-label" for="projectstatusred">Red</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="projectstatusamber" value="amber">
                  <label class="form-check-label" for="projectstatusamber">Amber</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="projectstatusgreen" value="green">
                  <label class="form-check-label" for="projectstatusgreen">Green</label>
                </div>
              </div>
            </div>
          </div>

          <!-- Hidden Inputs -->
          <input type="hidden" name="action" value="" />
          <input type="hidden" name="id" class="id" value="" />
          <input type="hidden" id="tableFieldName" value="Actual" />
          <input type="hidden" id="tabletypeField" class="tabletypeField" value="" />
          <input type="hidden" id="projectStatusInput" value="" />
            <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" id="projectSave" class="btn btn-primary initative_save_btn">Save</button>
      </div>
        </form>
      </div>

    
    </div>
  </div>
</div>

  
 <div class="modal fade" id="initiativeblankCount_setting" tabindex="-1" role="dialog"
     aria-labelledby="initiativeBlankReportModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title fs-5" id="initiativeBlankReportModalLabel">Initiative Blank Report Settings</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
        <form id="initiativenoprogressform">
          <!-- Organisation -->
          <div class="row mb-3">
            <div class="col-12">
              <label for="initiativenoprogressOrg" class="form-label">Organisation</label>
              <select class="int-status-multi-select form-select" name="initiativenoprogressOrg[]" multiple="multiple" id="initiativenoprogressOrg">
                <!-- Options will be populated dynamically -->
              </select>
            </div>
          </div>

          <!-- Initiatives -->
          <div class="row mb-3">
            <div class="col-12">
              <label for="initiativenoprogressinitiatives" class="form-label">Initiatives</label>
              <select class="int-status-multi-select form-select initiativeBlankCheckbox" name="initiativenoprogressinitiatives[]" multiple="multiple" id="initiativenoprogressinitiatives">
                <option value="All">All</option>
                <!-- Additional options will be populated dynamically -->
              </select>
            </div>
          </div>

          <!-- Data Fields -->
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Data Fields</label>
              <div class="d-flex flex-wrap gap-3 mt-2">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="initiativenoprogresschild" value="child">
                  <label class="form-check-label" for="initiativenoprogresschild">Child</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="blankinitiativecount" value="blankinitiativecount">
                  <label class="form-check-label" for="blankinitiativecount">Blank</label>
                </div>
              </div>
            </div>
          </div>

          <!-- Hidden Inputs -->
          <input type="hidden" name="action" value="" />
          <input type="hidden" name="id" class="id" value="" />
          <input type="hidden" id="tableFieldName" value="Actual" />
          <input type="hidden" id="tabletypeField" class="tabletypeField" value="" />
          <input type="hidden" id="initiativeBlankInput" value="" />
           <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" id="initBlankSave" class="btn btn-primary initative_save_btn">Save</button>
      </div>
        </form>
      </div>

     
    </div>
  </div>
</div>
<!-- #END# kpi Desc PopUp -->
<script>
 
 
</script>

<!-- 1 - KPI DrillDown Settings -->
<script>
    $(document).ready(function () {
        var drillkpi_all = [];
        $(".kpiDrillCheckbox").select2({
            templateResult: formatKpiResult,
            closeOnSelect: true,
            width: '100%'
        });

        $(".kpiDrillCheckbox").on("select2:select", function (event) {
            var selectedValues = $(this).val();
            if (selectedValues.includes("All")) {
                $("li.select2-results__option").find("input:checkbox").prop("checked", true);
                $(this).val(drillkpi_all).trigger("change");
            }
            $(this).select2("close");
        });

        $(".kpiDrillCheckbox").on("select2:unselect", function (event) {
            var selectedValues = $(this).val();
            if (!selectedValues || !selectedValues.includes("All")) {
                $("li.select2-results__option #kpiDrillInput").prop("checked", false);
            }
        });
        function formatKpiResult(state) {
            if (!state.id) {
                return $(
                    '<div class="text-right"><button id="all-branch" style="margin-right: 10px;" class="btn btn-default">Select All</button><button id="clear-branch" class="btn btn-default">Clear All</button></div>'
                );
            }

            drillkpi_all.push(state.id);

            var id = 'kpiDrillCheckbox' + state.id;
            var isAll = state.id === "All";
            var checkbox = $('<div class="checkbox"><input class="' + id + '" type="checkbox" ' + (state.selected ? 'checked' : '') + '><label class="select2labelelem" for="' + id + '">' + state.text + '</label></div>', { id: id });

            if (isAll) {
                checkbox.find('input').addClass('#kpiDrillInput');
            }
            return checkbox;
        }
        $(".kpiDrillCheckbox").trigger("change");
    });
</script>

<!-- 2 - KPI Status Count Settings -->
<script>
    $(document).ready(function () {
        var statuscountkpi_all = [];
        $(".scorecardStatusCheckbox").select2({
            templateResult: formatKpiStatusCountResult,
            closeOnSelect: true,
            width: '100%'
        });

        $(".scorecardStatusCheckbox").on("select2:select", function (event) {
            var selectedValues = $(this).val();
            if (selectedValues.includes("All")) {
                $("li.select2-results__option").find("input:checkbox").prop("checked", true);
                $(this).val(statuscountkpi_all).trigger("change");
            }
            $(this).select2("close");
        });

        $(".scorecardStatusCheckbox").on("select2:unselect", function (event) {
            var selectedValues = $(this).val();
            if (!selectedValues || !selectedValues.includes("All")) {
                $("li.select2-results__option #scorecardStatusInput").prop("checked", false);
            }
        });
        function formatKpiStatusCountResult(state) {
            if (!state.id) {
                return $(
                    '<div class="text-right"><button id="all-branch" style="margin-right: 10px;" class="btn btn-default">Select All</button><button id="clear-branch" class="btn btn-default">Clear All</button></div>'
                );
            }

            statuscountkpi_all.push(state.id);

            var id = 'scorecardStatusCheckbox' + state.id;
            var isAll = state.id === "All";
            var checkbox = $('<div class="checkbox"><input class="' + id + '" type="checkbox" ' + (state.selected ? 'checked' : '') + '><label class="select2labelelem" for="' + id + '">' + state.text + '</label></div>', { id: id });

            if (isAll) {
                checkbox.find('input').addClass('#scorecardStatusInput');
            }
            return checkbox;
        }
        $(".scorecardStatusCheckbox").trigger("change");
    });
</script>

<!-- 3 - Project Status Count Settings -->
<script>
    $(document).ready(function () {
        var projectstatus_all = [];
        $(".projectStatusCheckbox").select2({
            templateResult: formatProjectStatusResult,
            closeOnSelect: true,
            width: '100%'
        });

        $(".projectStatusCheckbox").on("select2:select", function (event) {
            var selectedValues = $(this).val();
            if (selectedValues.includes("All")) {
                $("li.select2-results__option").find("input:checkbox").prop("checked", true);
                $(this).val(projectstatus_all).trigger("change");
            }
            $(this).select2("close");
        });

        $(".projectStatusCheckbox").on("select2:unselect", function (event) {
            var selectedValues = $(this).val();
            if (!selectedValues || !selectedValues.includes("All")) {
                $("li.select2-results__option #projectStatusInput").prop("checked", false);
            }
        });
        function formatProjectStatusResult(state) {
            if (!state.id) {
                return $(
                    '<div class="text-right"><button id="all-branch" style="margin-right: 10px;" class="btn btn-default">Select All</button><button id="clear-branch" class="btn btn-default">Clear All</button></div>'
                );
            }

            projectstatus_all.push(state.id);

            var id = 'projectStatusCheckbox' + state.id;
            var isAll = state.id === "All";
            var checkbox = $('<div class="checkbox"><input class="' + id + '" type="checkbox" ' + (state.selected ? 'checked' : '') + '><label class="select2labelelem" for="' + id + '">' + state.text + '</label></div>', { id: id });

            if (isAll) {
                checkbox.find('input').addClass('#projectStatusInput');
            }
            return checkbox;
        }
        $(".projectStatusCheckbox").trigger("change");
    });
</script>

<!-- 5 - Initiative Progress Count Settings -->
<script>
    $(document).ready(function () {
        var initiativeprogress_all = [];
        $(".initiativeProgressCheckbox").select2({
            templateResult: formatInitiativeProgressResult,
            closeOnSelect: true,
            width: '100%'
        });

        $(".initiativeProgressCheckbox").on("select2:select", function (event) {
            var selectedValues = $(this).val();
            if (selectedValues.includes("All")) {
                $("li.select2-results__option").find("input:checkbox").prop("checked", true);
                $(this).val(initiativeprogress_all).trigger("change");
            }
            $(this).select2("close");
        });

        $(".initiativeProgressCheckbox").on("select2:unselect", function (event) {
            var selectedValues = $(this).val();
            if (!selectedValues || !selectedValues.includes("All")) {
                $("li.select2-results__option #initiativeProgressInput").prop("checked", false);
            }
        });
        function formatInitiativeProgressResult(state) {
            if (!state.id) {
                return $(
                    '<div class="text-right"><button id="all-branch" style="margin-right: 10px;" class="btn btn-default">Select All</button><button id="clear-branch" class="btn btn-default">Clear All</button></div>'
                );
            }

            initiativeprogress_all.push(state.id);

            var id = 'initiativeProgressCheckbox' + state.id;
            var isAll = state.id === "All";
            var checkbox = $('<div class="checkbox"><input class="' + id + '" type="checkbox" ' + (state.selected ? 'checked' : '') + '><label class="select2labelelem" for="' + id + '">' + state.text + '</label></div>', { id: id });

            if (isAll) {
                checkbox.find('input').addClass('#initiativeProgressInput');
            }
            return checkbox;
        }
        $(".initiativeProgressCheckbox").trigger("change");
    });
</script>

<!-- 6 - Initiative Blank Report Settings -->
<script>
    $(document).ready(function () {
        var initiativeblank_all = [];
        $(".initiativeBlankCheckbox").select2({
            templateResult: formatInitiativeBlankResult,
            closeOnSelect: true,
            width: '100%'
        });

        $(".initiativeBlankCheckbox").on("select2:select", function (event) {
            var selectedValues = $(this).val();
            if (selectedValues.includes("All")) {
                $("li.select2-results__option").find("input:checkbox").prop("checked", true);
                $(this).val(initiativeblank_all).trigger("change");
            }
            $(this).select2("close");
        });

        $(".initiativeBlankCheckbox").on("select2:unselect", function (event) {
            var selectedValues = $(this).val();
            if (!selectedValues || !selectedValues.includes("All")) {
                $("li.select2-results__option #initiativeBlankInput").prop("checked", false);
            }
        });
        function formatInitiativeBlankResult(state) {
            if (!state.id) {
                return $(
                    '<div class="text-right"><button id="all-branch" style="margin-right: 10px;" class="btn btn-default">Select All</button><button id="clear-branch" class="btn btn-default">Clear All</button></div>'
                );
            }

            initiativeblank_all.push(state.id);

            var id = 'initiativeBlankCheckbox' + state.id;
            var isAll = state.id === "All";
            var checkbox = $('<div class="checkbox"><input class="' + id + '" type="checkbox" ' + (state.selected ? 'checked' : '') + '><label class="select2labelelem" for="' + id + '">' + state.text + '</label></div>', { id: id });

            if (isAll) {
                checkbox.find('input').addClass('#initiativeBlankInput');
            }
            return checkbox;
        }
        $(".initiativeBlankCheckbox").trigger("change");
    });
</script>