<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
  <c:set var="contextroot" value="${pageContext.request.contextPath}" />




<style>
  /* Prevent text wrapping in table cells */
.truncate-cell {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 260px;
}

/* Fix DataTables scroll alignment */
.dataTables_scrollHeadInner,
.dataTables_scrollBody {
    width: 100% !important;
}

/* Optional: Force fixed width on table */
.table {
    table-layout: fixed;
    width: 100%;
}

/* Make sure all th/td use same width */
th, td {
    box-sizing: border-box;
}
  #performanceformula {
    pointer-events: auto !important;
    user-select: auto !important;
  }
  
</style>
  <!-- <style>

.nestedEmpty{
	border-left: 52px solid;
}

.nestedEmpty span{
	color:white !important;
}

.select2 .select2-search--dropdown {
		padding: 3px 2px 0px 0px;
	}
	
	
	input.select2-search__field {
		height:26px !important;
		font-size:12px !important;
font-weight: normal !important;
	}
	
	
	.select2-selection--single{
    border: 1px solid #ced4da !important;
    border-radius: 0px !important;
	}

.kpiformuladescHighlight{
	background-color:#c0baba;
}

.standard_dropdown-hide.pull-right {
        position: absolute !important;
        left: auto !important;
        right: 78px !important;
        top: 74px !important;
        transform: none !important;
        width: 260px;
      }
 
.checkbuttoncolor {
	background-color: aliceblue !important;
}

	.calendar-selects select {
		display: block !important;
		/* height: 2rem !important; */
		height: 2rem;
	}

            .toggle-dropdown li {
        cursor: pointer;
      }

      .multi-column-dropdown h4 {
        font-weight: 600;
        font-size: 15px;
        padding: 7px 0px 4px 10px;
      }

      .dropdown-menu {
        min-width: 200px;
      }
      .dropdown-menu.columns-2 {
        min-width: 400px;
      }
      .dropdown-menu.columns-3 {
        min-width: 600px;
      }
      .dropdown-menu li a {
        padding: 3px 15px;
        font-weight: 300;
      }
      .multi-column-dropdown {
        list-style: none;
        margin: 0px;
        padding: 0px;
      }
      .multi-column-dropdown li a {
        display: block;
        clear: both;
        line-height: 1.428571429;
        color: #333;
        white-space: normal;
      }
      .multi-column-dropdown li a:hover {
        text-decoration: none;
        color: #333;
        background-color: #f5f5f5;
      }

      @media (max-width: 767px) {
        .dropdown-menu.multi-column {
          min-width: 240px !important;
          overflow-x: hidden;
        }
      }


	ul li label {
		font-size: 14px;
	}

	.orientation-right {
		top: 60px !important;
		right: 0 !important;
		left: auto !important;
		position: fixed;
	}
	
	.checkbuttoncolor {
	background-color: aliceblue;
}
.btn-secondary {
        color: #fff;
        background-color: #6c757d;
        border-color: #6c757d;
        padding: 0px 12px;
        font-size: 12px;
        background-color: #02162a;
        margin-right: 3px;
        margin-bottom: 9px;
        border-radius: 8px !important;
        margin-top: 8px;
      }

      .btn-secondary:hover {
        color: #fff !important;
        background-color: #6c757d !important;
        border-color: #6c757d !important;
        padding: 0px 12px !important;
        font-size: 12px !important;
        background-color: #02162a !important;
        margin-right: 3px !important;
        margin-bottom: 9px !important;
        border-radius: 8px !important;
        margin-top: 8px !important;
      }

      .list-group {
        max-height: 215px;
        margin-bottom: 10px;
        overflow: scroll;
        overflow-x: inherit;
        -webkit-overflow-scrolling: touch;
        font-size: 11px;
        border: 1px solid #e9ecef;
      }

      #result_panel > .panelbody > .list-group > .list-group-item {
        padding: 5px 10px !important;
      }

      #formula_builder,
      #summary_calculation {
        font-size: 11px !important;
      }

      #kpi_formula_popup > .modal-content > .modal-body {
        padding: 0 25px !important;
      }

      #kpi_formula_popup > .modal-content > .modal-body.card > .tab-content {
        padding: 0;
      }

      #formula_builder {
        padding-bottom: 0px;
      }

      .panel:hover {
        cursor: pointer;
      }

      #formula-builder .col-md-4 {
        margin-bottom: 0px;
      }

      .modal #kpi_formula_popup {
        background-color: rgba(238, 238, 238, 0) !important;
      }

      .modal-backdrop {
        opacity: 0.5 !important;
      }

      #kpi_formula_popup .modal-content .nav li a.nav-link {
        font-size: 12px !important;
      }

      #datepickers-container {
        z-index: 10000;
      }

      .datepicker--nav {
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        -ms-box-shadow: none;
        box-shadow: none;
        background-color: #ffff;
        color: #9c9c9c;
        width: 100%;
        height: 36px;
      }

      .orientation-right {
        top: 60px !important;
        right: 0 !important;
        left: auto !important;
        position: fixed;
      }

      
      .initative_save_btn {
        padding: 5px 12px;
        width: 90px;
        height: 28px;
        font-size: 12px;
        background-color: #1e252d;
        color: #fff;
        border-radius: 5px;
      }

      .input-group {
        margin-bottom: 0;
      }

      .modal-content-setscrollheight {
        height: 720px;
      }

      .modal-body {
        overflow-y: auto;
      }

      .modal-footer {
        margin-top: 12px;
      }
      
    #initiate_sidebar .sub_initiative_sidebar_details:hover {
	  -ms-transform: scale(1.025);
	  -moz-transform: scale(1.025);
	  -webkit-transform: scale(1.025);
	  transform: scale(1.025);
	}
	
	.p-b-5 {
	    padding-bottom: 5px;
	    padding-top: 3px;
	}
	
#initiate_sidebar .sub_initiative_sidebar_details {
  padding: 0 5px;
  border: 1px solid #e9ecef;
  margin: 5px 12px 5px 5px;
  -webkit-box-shadow: 1px 1px 6px 0px #d8d4d4;
  -moz-box-shadow: 1px 1px 6px 0px #d8d4d4;
  -ms-box-shadow: 1px 1px 6px 0px #d8d4d4;
  box-shadow: 1px 1px 6px 0px #d8d4d4;
  background: #fff;
  -webkit-transition: transform 0.3s ease-in-out;
  -moz-transition: transform 0.3s ease-in-out;
  -ms-transition: transform 0.3s ease-in-out;
  -o-transition: transform 0.3s ease-in-out;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.profile_content .init_flex_profile {
  flex: 1 1 85%;

}

#initiative_sidebar .sub_initiatives .card {
  background: #ffffff;
}	
</style> -->

  <!-- <style id="dynamic-style">
    :root,
    [data-bs-theme=light] {
      --stratroom-primary: #883B71;
      --stratroom-primary-rgb: 136, 59, 113;
    }

    .btn-primary {
      --stratroom-btn-bg: #883B71;
      --stratroom-btn-border-color: #883B71;
      --stratroom-btn-hover-bg: rgb(162, 85, 139);
      /* Darker shade for hover */
      --stratroom-btn-hover-border-color: rgb(174, 97, 151);
      --stratroom-btn-active-bg: rgb(187, 110, 164);
      /* Even darker for active state */
      --stratroom-btn-active-border-color: rgb(200, 123, 177);
      --stratroom-btn-color: white;
      /* Ensuring text contrast */
    }

    /* .nav-pills {
      --stratroom-nav-pills-link-active-bg: #883B71;
    } */
  </style> -->

  <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
  <!-- #START# Page level body content -->
  <div id="deleteModalscorecardold" class="modal fade">
    <div class="modal-dialog modal-confirm">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Delete</h4>
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        </div>
        <div class="modal-body">
          <h5 class="confirm-modal-content">Do you really want to delete?</h5>
          <br>
          <div class="form-line right">
            <input type="hidden" id="deletescoreid" />
            <input type="hidden" id="deleterecordtype" />
            <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close"
              data-i18n="Cancel">Cancel</button>
            <button type="button" class="btn btn-danger confirm-modal-deleteBtn"
              onclick="handlescoreeventdelete()">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="nameUpdatePopUp" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down ">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title createTemplateHeader">Update Scorecard Name</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="card custom-card border-0">
                    <div class="card-body">
                      <form id="menuForm">
                        <div class="grid gap-3">
                          <div class="g-col-12">
                            <div class="form-group">
                              <label for="menuName" class="form-label nameHeader">Name</label>

                              <input type="text" class="form-control" id="scorcardUpdateName" placeholder="Enter Name" required>
                            </div>
                          </div>
                        
                          

                        </div>
                      </form>
                    </div>
                  </div>

                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-label-secondary cancelHeader" data-bs-dismiss="modal" aria-label="Close">
                    Cancel
                  </button>
                  <button class="btn btn-primary saveHeader"  onclick="updateScoreCarddName()">Update
                  </button>
                </div>
              </div>
            </div>
  </div>


  	<div class="modal custom-modal custom-delete-modal fade" id="deleteModalscorecard" data-backdrop="static"
				data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
				aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" style="--stratroom-modal-width:320px">
					<div class="modal-content">
						<div class="modal-body">
							<div class="card custom-card delete-card border-0">
								<div class="card-body">

									<div class="delete-box">
										<h4 class="title" data-translate="page.orgstructure.delete_confirmation">Do you really want to delete?</h4>
										<div class="btn-wrap">
                                            <input type="hidden" id="deletescoreid" />
            <input type="hidden" id="deleterecordtype" />
											<button type="button" class="btn btn-sm btn-label-secondary rounded-pill"
												data-bs-dismiss="modal" aria-label="Close" data-translate="page.orgstructure.cancel">
												Cancel
											</button>
											<button class="btn btn-sm btn-danger rounded-pill"
												value="Yes" data-translate="page.orgstructure.delete" onclick="handlescoreeventdelete()">Delete</button>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>

  <div class="modal fade" tabindex="-1" role="dialog" id="formulation_popup" aria-labelledby="myLargeModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content" style="height: 360px; overflow: hidden">
        <div class="modal-header">
          <h4>Formulation Register</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div style="height: 300px">
            <div class="d-flex flex-column" id="initiate_sidebar">


            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <jsp:include page="modals/perspective_modal.jsp"></jsp:include>
  <jsp:include page="modals/objective_modal.jsp"></jsp:include>
  <jsp:include page="modals/kpi_modal.jsp"></jsp:include>
  <jsp:include page="modals/subkpi_modal.jsp"></jsp:include>
  <jsp:include page="modals/kpi_formula_modal.jsp"></jsp:include>
  <jsp:include page="modals/kpi_custom_threshold.jsp"></jsp:include>
  <jsp:include page="modals/kpi_ytd_formula.jsp"></jsp:include>
  <jsp:include page="modals/scorecard_modal.jsp"></jsp:include>
  <jsp:include page="templates/scorecard_template.jsp"></jsp:include>
  <jsp:include page="modals/scorecard_import_modal.jsp"></jsp:include>
  <jsp:include page="modals/objective_custom_threshold.jsp"></jsp:include>
  <jsp:include page="modals/perspective_custom_threshold.jsp"></jsp:include>
  <jsp:include page="modals/scorecard_performance_formula.jsp"></jsp:include>
  <jsp:include page="modals/kpi_performanceformula_modal.jsp"></jsp:include>

   <!-- KPI Story Card modal :::::::::::::::::::::::::::::::::::::::: -->
 <div class="modal custom-modal fade" id="kpi-story-card-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog"
 aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
 <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg">
     <div class="modal-content">
         <div class="modal-header">
             <h4 class="modal-title">KPI Story Card</h4>
             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>

         <div class="modal-body">
             <div class="card custom-card table-card">

                 <div class="card-body">
                     <div class="row-table">
                         <div class="row">
                             <div class="col-12 col-form-text">
                                 <div class="user-image avatar m-auto">
                                     <!-- <img src="/startroom/images/user1.jpg" width="72" height="72"
                                         class="rounded-circle"> -->
                                 </div>
                             </div>
                         </div>
                         <div class="row">
                             <label for="staticEmail" class="col-md-3 col-form-label">KPI Name</label>
                             <div class="col-md-9 col-form-text">
                                 <p><span id="kpiName"></span></p>
                             </div>
                         </div>

                         <div class="row">
                             <label for="staticEmail" class="col-md-3 col-form-label">Alignment
                                 Objectives</label>
                             <div class="col-md-9 col-form-text">
                                 <div class="d-flex flex-wrap gap-2">
                                     <span class="badge rounded-pill label-bg-dark" id="objectiveName">Increase net revenue by 15%</span>
                                    
                                 </div>
                             </div>
                         </div>
                         <div class="row">
                             <label for="staticEmail" class="col-md-3 col-form-label">Owner</label>
                             <div class="col-md-9 col-form-text">
                                 <div class="d-flex flex-wrap gap-2">
                                     <span class="badge rounded-pill label-bg-green" id="ownerName"></span>
                                 </div>
                             </div>
                         </div>
                         <div class="row">
                             <label for="staticEmail" class="col-md-3 col-form-label">Target Audience</label>
                             <div class="col-md-9 col-form-text">
                                 <div class="d-flex flex-wrap gap-2">
                                     <span class="badge rounded-pill label-bg-red">N/A</span>
                                     
                                 </div>
                             </div>
                         </div>
                         <div class="row">
                             <label for="staticEmail" class="col-md-3 col-form-label">Current Actual</label>
                             <div class="col-md-9 col-form-text">
                                 <div class="d-flex flex-wrap gap-2"><span
                                         class="badge rounded-pill label-bg-yellow" id="actualValue"></span></div>
                             </div>
                         </div>
                         <div class="row">
                             <label for="staticEmail" class="col-md-3 col-form-label">Target</label>
                             <div class="col-md-9 col-form-text">
                                 <div class="d-flex flex-wrap gap-2">
                                     <span class="badge rounded-pill label-bg-blue" id="targetValue"></span>
                                 </div>
                             </div>
                         </div>

                         <div class="row">
                             <label for="staticEmail" class="col-md-3 col-form-label">Measurement Method</label>
                             <div class="col-md-9 col-form-text">
                                 <div class="d-flex flex-wrap gap-2">
                                     <span class="badge rounded-pill label-bg-orange">N/A</span>
                                     
                                 </div>
                             </div>
                         </div>

                         <div class="row">
                             <label for="staticEmail" class="col-md-3 col-form-label">Strategic
                                 Initiatives</label>
                             <div class="col-md-9 col-form-text">
                                 <div class="d-flex flex-wrap gap-2"><span
                                         class="badge rounded-pill label-bg-info" id="initiatives">N/A</span> </div>
                             </div>
                         </div>
                         <div class="row">
                             <label for="staticEmail" class="col-md-3 col-form-label">Timelines</label>
                             <div class="col-md-9 col-form-text">
                                 <div class="d-flex flex-wrap gap-2"><span
                                         class="badge rounded-pill label-bg-secondary" id="initiativeTimeline">N/A</span>
                
                                 </div>
                             </div>
                         </div>
                         <div class="row">
                             <label for="staticEmail" class="col-md-3 col-form-label">Reporting Frequency</label>
                             <div class="col-md-9 col-form-text">
                                 <div class="d-flex flex-wrap gap-2">
                                     <span class="badge rounded-pill label-bg-green" id="reportFrequency"></span>
                                
                                 </div>
                             </div>
                         </div>
                         <div class="row">
                             <label for="staticEmail" class="col-md-3 col-form-label">Success Criteria</label>
                             <div class="col-md-9 col-form-text">
                                 <div class="d-flex flex-wrap gap-2"><span
                                         class="badge rounded-pill label-bg-orange">N/A</span> </div>
                             </div>
                         </div>
                         <div class="row">
                             <label for="staticEmail" class="col-md-3 col-form-label">Risks</label>
                             <div class="col-md-9 col-form-text">
                                 <div class="d-flex flex-wrap gap-2"><span
                                         class="badge rounded-pill label-bg-red" id="riskData"></span> </div>
                             </div>
                         </div>

                         <div class="row">
                             <label for="supportNeeded" class="col-md-3 col-form-label">Support Needed</label>
                             <div class="col-md-9 col-form-text">
                                 <textarea class="form-control" id="supportNeeded" rows="3"></textarea>
                             </div>
                         </div>
                         <div class="row">
                             <label for="remarks" class="col-md-3 col-form-label">Remarks</label>
                             <div class="col-md-9 col-form-text">
                                 <textarea class="form-control" id="remarks" rows="3"></textarea>
                             </div>
                         </div>

                        
                     </div>

                 </div>
             </div>
         </div>
         <div class="modal-footer">
             <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal"
                 aria-label="Close">
                 Cancel
             </button>
             <button class="btn btn-primary" value="Save" onclick="handleSaveStoryCard()">Save
             </button>

         </div>
     </div>
 </div>
</div>
<!-- KPI Story Card END -->

<!-- Objective Performance Calculator Pop Up Start-->
 <div class="modal custom-modal fade objective_custom_threshold_popup" id="objective_custom_threshold_popup" data-bs-backdrop="static"
        data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="objectiveCalculatorModalLabel"
        aria-hidden="true"  data-backdrop="false">
        <div class="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-lg-down">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="objectiveCalculatorModalLabel">Performance Calculator</h5>
                    <button type="button" id="objectiveClosePopupId" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-header bg-transparent border-0">
                            <ul class="nav nav-underline gap-3" role="tablist">

                                <li class="nav-item" role="Formula Builder">
                                    <button class="nav-link text-uppercase active"
                                        id="objectivePerformanceformulaBuilder-tab" data-bs-toggle="tab"
                                        data-bs-target="#objectivePerformanceformulaBuilder-pane" type="button"
                                        role="tab" aria-controls="objectivePerformanceformulaBuilder-tab-pane"
                                        aria-selected="true">Formula
                                        Builder</button>
                                </li>



                            </ul>
                        </div>

                        <div class="card-body">
                            <div class="tab-content">

                                <div class="tab-pane fade show active" id="objectivePerformanceformulaBuilder-pane"
                                    role="tabpanel" aria-labelledby="objectivePerformanceformulaBuilder-tab"
                                    tabindex="0">



                                    <div class="grid gap-3">
                                        <div class="g-col-12">
                                            <!-- <textarea class="form-control" name="formula"
                                                id="objectivePerformanceformulaBuilder" placeholder cols
                                                rows="4"></textarea> -->

                                                <textarea class="form-control" name="formulaCustomObjective" id="formulaCustomObjective" placeholder="" cols="" rows="4" autocomplete="off"></textarea>
                                        </div>
                                        <div class="g-col-12">
                                            <div class="keypad d-flex flex-wrap gap-2">
                                                <button type="button"
                                                    class="performance-kepad btn btn-sm btn-secondary" onclick="updateCustomObjective('+')">+</button>
                                                <button type="button"
                                                    class="performance-kepad btn btn-sm btn-secondary" onclick="updateCustomObjective('-')">-</button>
                                                <button type="button"
                                                    class="performance-kepad btn btn-sm btn-secondary" onclick="updateCustomObjective('*')">*</button>
                                                <button type="button"
                                                    class="performance-kepad btn btn-sm btn-secondary" onclick="updateCustomObjective('/')">/</button>
                                                <button type="button"
                                                    class="performance-kepad btn btn-sm btn-secondary" onclick="updateCustomObjective('%')">%</button>
                                                <button type="button"
                                                    class="performance-kepad btn btn-sm btn-secondary" onclick="updateCustomObjective('(')">(</button>
                                                <button type="button"
                                                    class="performance-kepad btn btn-sm btn-secondary" onclick="updateCustomObjective(')')">)</button>
                                                <button type="button"
                                                    class="performance-kepad btn btn-sm btn-secondary" onclick="updateCustomObjective('[')">[</button>
                                                <button type="button"
                                                    class="performance-kepad btn btn-sm btn-secondary" onclick="updateCustomObjective(']')">]</button>
                                                <button type="button"
                                                    class="performance-kepad btn btn-sm btn-secondary" onclick="updateCustomObjective(':')">:</button>
                                                <button type="button"
                                                    class="performance-kepad btn btn-sm btn-secondary" onclick="updateCustomObjective('AND')">AND</button>
                                                <button type="button"
                                                    class="performance-kepad btn btn-sm btn-secondary" onclick="updateCustomObjective('OR')">OR</button>
                                                <button type="button"
                                                    class="performance-kepad btn btn-sm btn-secondary" onclick="updateCustomObjective('NOT')">NOT</button>
                                                <button type="button"
                                                    class="performance-kepad btn btn-sm btn-sm btn-secondary" onclick="updateCustomObjective('IN')">IN</button>
                                                <button type="button"
                                                    class="performance-kepad btn btn-sm btn-secondary text-nowrap" onclick="updateCustomObjective('==')">==</button>
                                                <button type="button"
                                                    class="performance-kepad btn btn-sm btn-secondary text-nowrap" onclick="updateCustomObjective('!=')">!=</button>
                                                <button type="button"
                                                    class="performance-kepad btn btn-sm btn-secondary" onclick="updateCustomObjective('>')">></button>
                                                <button type="button"
                                                    class="performance-kepad btn btn-sm btn-secondary" onclick="updateCustomObjective('<')"><</button>
                                                <button type="button"
                                                    class="performance-kepad btn btn-sm btn-secondary text-nowrap" onclick="updateCustomObjective('>=')">>=</button>
                                                <button type="button"
                                                    class="performance-kepad btn btn-sm btn-secondary text-nowrap" onclick="updateCustomObjective('<=')"><=</button>
                                            </div>

                                        </div>


                                        <div class="g-col-12 g-col-md-4">

                                            <div class="measuresWrap">

                                                <div class="panel panel-primary" id="result_panel">
                                                    <div class="panel-heading">
                                                        <div class="searchMeasures">
                                                            <h6 class="panel-title">Fields and measures:</h6>
                                                            <div class="input-group mb-3">
                                                                <input  onkeyup="fieldmeasurefilter('objectiveMeasureNames','objectivecustomfieldmeasurefilter')" id="objectivecustomfieldmeasurefilter" type="text"
                                                                    class="form-control form-control-sm"
                                                                    placeholder="Search" aria-label="Search"
                                                                    aria-describedby="basic-addon2">
                                                                <button class="btn btn-outline-secondary searchformulaicon" type="button"
                                                                    id="basic-addon2"><i
                                                                        class="fas fa-search"></i></button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div class="panel-body" data-spy="scroll">
                                                       <ul class="list-group" id="objectiveMeasureNames"></ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="g-col-12 g-col-md-4">
                                            <div class="panel panel-primary" id="result_panel1">
                                                <div class="panel-heading">
                                                    <h6 class="panel-title">Functions:</h6>
                                                </div>
                                                <div class="panel-body">
                                                    <ul class="list-group overflow-auto" style="max-height: 240px">
                                                        <li class="list-group-item perFuncton" onclick="updateCustomObjective('if','if')">If</li>
                                                        <li class="list-group-item perFuncton" onclick="updateCustomObjective('avg','avg')">avg</li>
                                                        <li class="list-group-item perFuncton" onclick="updateCustomObjective('agg','agg')">agg</li>
                                                        <li class="list-group-item perFuncton" onclick="updateCustomObjective('count','count')">count</li>
                                                        <li class="list-group-item perFuncton" onclick="updateCustomObjective('sum','sum')">sum</li>
                                                        <li class="list-group-item perFuncton" onclick="updateCustomObjective('min','min')">min</li>
                                                        <li class="list-group-item perFuncton" onclick="updateCustomObjective('max','max')">max</li>
                                                    </ul>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="g-col-12 g-col-md-4">
                                            <div class="panel panel-primary" id="perResult_panel">
                                                <div class="panel-heading">
                                                    <h6 class="panel-title">Function
                                                        Description:</h6>
                                                </div>
                                                <div class="panel-body">
                                                     <h6 class="formulaheaderdesc"></h6>
                                                     <p class="formulacontentdesc">
                                                </div>



                                            </div>
                                        </div>
                                    </div>

                                    <div class="d-flex flex-wrap gap-2 mt-4">
                                        <button name="validate" id="validate" class="btn btn-sm btn-secondary" onclick="handleFormulaValidate('OBJECTIVE')">
                                            Validate
                                        </button>
                                        <button name="add" id="add" class="btn btn-sm btn-primary" onclick="handleFormulaAdd('OBJECTIVE')" style="height: 20px; margin-top: 9px; width: 45px;">
                                            Add
                                        </button>

                                        
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
 </div>
<!-- Objective Performance Calculator Pop Up End-->

<!-- Kpi Calculator Start -->
         <div class="modal custom-modal fade kpi_performanceformula_popup" id="kpi_performanceformula_popup"  data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" 
        >
        <div class="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-lg-down">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myLargeModalLabel">KPI Performance Calculator</h5>
                    <button type="button" id="kpiperclosePopupId" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="p-2">
                        <label for="KPICalfieldName" class="form-label"><small>Field Name</small></label>
                        <select class="form-select form-select-sm select-dropdown-kpi-calculator"
                            data-placeholder="Select Field Name" id="performancefieldId" name="performancefieldName">
                            <option value disabled selected hidden>Select Field Name</option>
                            <option value="A">Actual</option>
                            <option value="T">Target</option>
                            <option value="B">Strech</option>
                            <option value="F">Stable</option>
                            <option value="S">Shrink</option>
                            <option value="G">Gap</option>
                        </select>
                        <!-- <select class="form-select form-select-sm select-dropdown-kpi-calculator"
                            data-placeholder="Select Field Name" id="performancefieldId" name="performancefieldName">
                            <option value="A" data-i18n="Actual">Actual</option>
							<option value="T" data-i18n="Target">Target</option>
							<option value="B" data-i18n="Budget">Budget</option>
                        </select> -->
                    </div>
                    <div class="card border-0">
                        <div class="card-header bg-transparent border-0">
                            <ul class="nav nav-underline gap-3" role="tablist">
                                <li class="nav-item" role="Formula Builder">
                                    <button class="nav-link text-uppercase active" id="kpiFormulaBuilderTab"
                                        data-toggle="tab" href="#formula_builder"
                                        aria-selected="true">Formula
                                        Builder</button>
                                </li>
                                <li class="nav-item" role="Summary Calculation">
                                    <button class="nav-link text-uppercase" id="kpiSummaryCalculationTab"
                                    data-toggle="tab" href="#summary_calculation">Summary Calculation</button>
                                </li>
                            </ul>
                        </div>

                        <div class="card-body">
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="formula_builder" role="tabpanel"
                                    aria-labelledby="kpiFormulaBuilderTab-pane" tabindex="0">
                                    <div class="grid gap-3">
                                        <div class="g-col-12">
                                            <textarea class="form-control" name="performanceformula" id="performanceformula"
    placeholder="Enter formula here" rows="4" style="resize: both;" tabindex="0"></textarea>

                                                
                                        </div>
                                        <div class="g-col-12">
                                            <div class="keypad d-flex flex-wrap gap-2">
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updatePerformance('+')">+</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updatePerformance('-')">-</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updatePerformance('*')">*</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updatePerformance('/')">/</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updatePerformance('%')">%</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updatePerformance('(')">(</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updatePerformance(')')">)</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updatePerformance('[')">[</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updatePerformance(']')">]</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updatePerformance(':')">:</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updatePerformance('AND')">AND</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updatePerformance('OR')">OR</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updatePerformance('NOT')">NOT</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-sm btn-secondary" onclick="updatePerformance('IN')">IN</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary text-nowrap" onclick="updatePerformance('==')">==</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary text-nowrap" onclick="updatePerformance('!=')">!=</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updatePerformance('>')">&gt;</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary" onclick="updatePerformance('<')">&lt;</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary text-nowrap" onclick="updatePerformance('>=')">&gt;=</button>
                                                <button type="button"
                                                    class="kpiPerformance-kepad btn btn-sm btn-secondary text-nowrap" onclick="updatePerformance('<=')">=&lt;</button>
                                            </div>

                                        </div>
                                        <div class="g-col-12 g-col-md-4">

                                            <div class="measuresWrap">

                                                <div class="panel panel-primary" id="result_panel">
                                                    <div class="panel-heading">

                                                        <div class="searchMeasures">
                                                            <h6 class="panel-title">Fields and measures:</h6>
                                                            <div class="input-group mb-3">
                                                                <input  type="text"
                                                                    class="form-control form-control-sm"
                                                                    placeholder="Search" aria-label="Search"
                                                                    aria-describedby="basic-addon2" onkeyup="fieldmeasurefilter('PerformancemeasureNames','Performancefieldmeasurefilter')" id="Performancefieldmeasurefilter">
                                                                <button class="btn btn-outline-secondary searchformulaicon" type="button"
                                                                    id="basic-addon2"><i
                                                                        class="fas fa-search"></i></button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div class="panel-body" data-spy="scroll">
                                                        <ul class="list-group" id="PerformancemeasureNames">
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="g-col-12 g-col-md-4">
                                            <div class="panel panel-primary" id="result_panel1">
                                                <div class="panel-heading">
                                                    <h6 class="panel-title">Functions:</h6>
                                                </div>
                                                <div class="panel-body">
                                                    <ul class="list-group overflow-auto" style="max-height: 240px">
                                                        <li class="list-group-item kpiPerFuncton" onclick="updatePerformance('if','if')">If</li>
                                                        <li class="list-group-item kpiPerFuncton" onclick="updatePerformance('avg','avg')">avg</li>
                                                        <li class="list-group-item kpiPerFuncton" onclick="updatePerformance('agg','agg')">agg</li>
                                                        <li class="list-group-item kpiPerFuncton" onclick="updatePerformance('count','count')">count</li>
                                                        <li class="list-group-item kpiPerFuncton" onclick="updatePerformance('sum','sum')">sum</li>
                                                        <li class="list-group-item kpiPerFuncton" onclick="updatePerformance('min','min')">min</li>
                                                        <li class="list-group-item kpiPerFuncton" onclick="updatePerformance('max','max')">max</li>
                                                    </ul>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="g-col-12 g-col-md-4">
                                            <div class="panel panel-primary" id="kpiPerResult_panel">
                                                <div class="panel-heading">
                                                    <h6 class="panel-title">Function Description:</h6>
                                                </div>
                                                <div class="panel-body">
                                                   <h6 class="formulaheaderdesc"></h6>
                                                        <p class="formulacontentdesc">
                                                            
                                                        </p>
                                                </div>



                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-wrap gap-2 mt-4">
                                        <button name="validate" id="validate" class="btn btn-sm btn-secondary" onclick="handleFormulaValidate('KPIPERFORMANCE')">
                                            Validate
                                        </button>
                                        <button name="add" id="add" class="btn btn-sm btn-primary" onclick="handleFormulaAdd('KPIPERFORMANCE')" style="height: 20px; margin-top: 9px; width: 45px;">
                                            Add
                                        </button>
                                    </div>

                                </div>


                                <div class="tab-pane fade" id="summary_calculation" role="tabpanel"
                                    aria-labelledby="summaryCalculationTab-tab" tabindex="0">
                                    
                                    <div class="col-md-12">
                                        <div class="panel panel-primary" id="final_panel">
                                            <div class="panel-heading">
                                                <h6 class="panel-title">Formula</h6>
                                            </div>
                                            <div class="panel-body">
                                                <ul class="list-group formula-panel overflow-auto"
                                                    style="max-height: 240px">
                                                    <li class="list-group-item">Elapsed
                                                        Year</li>
                                                    <li class="list-group-item">Ends
                                                        With</li>
                                                    <li class="list-group-item">If</li>
                                                    <li class="list-group-item">Is
                                                        Null</li>
                                                    <li class="list-group-item">Max</li>
                                                    <li class="list-group-item">Min</li>
                                                    <li class="list-group-item">Median</li>
                                                    <li class="list-group-item">Mid</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<!-- Kpi Calculator End -->

<!-- Kpi Add Pop Up -->
 

 <!-- Kpi Add Pop Up End -->



  <main class="pt-2 pb-2">
    <div class="container-lg">
      <div class="page-header grid gap-2 pb-1">
        <div class="g-col-8 d-flex align-items-center">
          <h4 class="title" >
            <span class="icon">
              <img src="/stratroom/images/scorecard-i.svg" alt="Scorecard" width="16" height="16">
            </span>
             <span class="sorecardTitleHeader">Scorecard</span> <span class="badge text-bg-success scorecardValue">100%</span>
          </h4>


        </div>
        <div class="load-page page-actions g-col-4">
          <div class="page-icons">
            <ul>
              <!-- <li>
                <a href="#add-prespective-modal" data-bs-toggle="modal">
                  <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
                    data-bs-title="Add Prespective">
                    <i class="fas fa-plus"></i>
                  </span>
                </a>
              </li> -->
              
              <li>
                <a href="#import-modal" data-toggle="modal"
						data-target=".file_upload_popup">
                  <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Import" >
                    <img src="/stratroom/images/import-i.svg" width="12" height="12" alt="import">
                  </span>
                </a>
              </li>


              <li>
                <a href="#" onclick="loadDataAndGeneratePDF()">
                  <img src="/stratroom/images/stamp-i.svg" width="12" height="12" alt="import">
                </a>
              </li>

              <li>
                <a href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Export" target="_blank" class="exceldownloadlink" >
                  <img src="/stratroom/images/export-i.svg" width="12" height="12" alt="export">
                </a>
              </li>



              <li>
                <a href="#add-settings-modal" data-toggle="modal" data-target=".scorecard_description_popup" onclick="handleScoreCardEvent()">
                  <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Settings">
                    <img src="/stratroom/images/control-panel-i.svg" width="12" height="12" alt="Settings">
                  </span>
                </a>
              </li>


            </ul>
          </div>
        </div>
      </div>


    </div>

    <div class="container-lg py-2">
      <div class="card custom-card-tab">
        <div class="card-header p-0">
          <div class="c-header-left">
            <!-- <div class="dropdown dropdown-tab dropdown-tab-ellipsis" id="tab-navigationWrap">


            </div> -->

          </div>
        </div>
        <c:if test="${userPrincipal != null}">
          <input id="userPrincipal" type="hidden" name="userPrincipal" value="<c:out value="
            ${userPrincipal.profile.empId}" />">
        </c:if>
        <c:if test="${pagenumber != null}">
          <input id="pagenumber" type="hidden" name="pagenumber" value="<c:out value=" ${pagenumber}" />">
        </c:if>

        <div class="container-fluid">
          <div class="tableview">

            <div id="scordcard-wrapper" class="row"></div>

            <jsp:include page="templates/perspective_template.jsp"></jsp:include>
            <jsp:include page="templates/perspective_header_row_template.jsp"></jsp:include>
            <jsp:include page="templates/objective_row_template.jsp"></jsp:include>
            <jsp:include page="templates/kpi_row_template.jsp"></jsp:include>
          </div>
        </div>
      </div>

    </div>
  </main>
  <footer class="col-12 text-center py-2 copyright" 
          style="position:fixed; bottom:0; left:0; width:100%; margin:0; padding:8px;">
    <p class="mb-0" style="margin:0;">Copyright &copy; 
      <span id="year"></span> <strong>StratRoom</strong>
    </p>

    <script>
      document.getElementById("year").textContent = new Date().getFullYear();
    </script>
  </footer>
   <div class="floating-box shadow-sm">
		<a class="control-link" href="#"><span class="icon"><img src="/stratroom/images/organization-i.svg" width="18"
			  height="18" alt="organization"></span></a>
		<a class="control-link" href="#"><span class="icon"><img src="/stratroom/images/template.svg" width="18"
			  height="18" alt="organization"></span></a>
	  </div>





  <!-- #END# Page level body content -->

  <script src="${contextroot}/js/jspdf.umd.min.js"></script>
  <script src="${contextroot}/js/jspdf.plugin.autotable.min.js"></script>
  <script src="${contextroot}/js/select2.min.js"></script>
  <script src="${contextroot}/js/standard_view.js"></script>
  
  <!-- <script src="${contextroot}/js/mainn.js"></script> -->
  <script>
    /*$('.date_pickers').datepicker({
      language: 'en',
      minDate: new Date(),
      range: true,
      autoClose: true,
      position: "top left",
      //todayButton: true,
      onSelect: function (fd) {
        // $('.datepickers-container').hide();
      }
    });*/
    if (!strategyforlink) {
      var button = document.getElementById("fomulationbutton");
      button.style.display = "none";
    }
    $('.kpi_formula').on('click', function () {
      $(".kpi_trigger").trigger("click");
    });
    $('#kpi_custom_threshold').on('click', function () {
      $("#kpi_custom_trigger").trigger("click");
    });
    $('#custom_objective').on('click', function () {
      $("#objective_custom_trigger").trigger("click");
    });
    $('#custom_perspective').on('click', function () {
      $("#perspective_custom_trigger").trigger("click");
    });
    $('.kpiYtdFormula').on('click', function () {
      $(".kpiYtdFormulaTrigger").trigger("click");
    });

    $(".list-group-item, .opr").click(function () {

    });

    $("#add").click(function () {
      var value = $("#formula").val();
      var ul = $(".formula-panel");
      var li = document.createElement("li");
      li.setAttribute("class", "list-group-item");
      li.appendChild(document.createTextNode(value));
      ul.append(li);
      $("#formula").val('');
    });

    $(".dropdown-hide").on("click", function (e) {
      e.stopPropagation();
    });

    /*$("#OpenImgUpload").click(function () {
      $("#importscorescrd").trigger("click");
      return false;
      });*/
    $(document).on('keydown', function (e) {
      if (e.keyCode === 27) { // ESC
        $("#closeKpimodal").click();
      }
    });
    $('.kpi_formula_popup,.kpi_custom_threshold_popup,.kpiYtdFormulaPoPUp').modal({
      show: false,
      backdrop: 'static',
      keyboard: false
    });
    $('.modal-dialog').draggable({
      handle: ".modal-header"
    });
    $(".perspective-multi-select").select2();

    $(".custom-tab-kpiformula").on("click", "button", function (e) {
      var CustomTabValue = this.dataset.value;
      if (CustomTabValue) {
        $(".customTabContent").not("." + CustomTabValue).hide();
        $("." + CustomTabValue).show();
      } else {
        $(".customTabContent").hide();
      }
      $(this).parent().find("button").removeClass("active");
      $(this).addClass("active");
    });

    $(".custom-tab-ytdkpiformula").on("click", "button", function (e) {
      var CustomTabValue = this.dataset.value;
      if (CustomTabValue) {
        $(".ytdcustomTabContent").not("." + CustomTabValue).hide();
        $("." + CustomTabValue).show();
      } else {
        $(".ytdcustomTabContent").hide();
      }
      $(this).parent().find("button").removeClass("active");
      $(this).addClass("active");
    });

    $.fn.select2.amd.define("SearchableSingleSelection", [
      "select2/utils",
      "select2/selection/single",
      "select2/selection/eventRelay",
      "select2/dropdown/search"
    ],
      function (Utils, SingleSelection, EventRelay, DropdownSearch) {
        var adapter = Utils.Decorate(SingleSelection, DropdownSearch);
        adapter = Utils.Decorate(adapter, EventRelay);

        adapter.prototype.render = function () {
          var $rendered = DropdownSearch.prototype.render.call(this, SingleSelection.prototype.render);

          this.$searchContainer.hide();
          this.$element.siblings('.select2').find('.selection').prepend(this.$searchContainer);

          return $rendered;
        };

        var bindOrigin = adapter.prototype.bind;
        adapter.prototype.bind = function (container) {
          var self = this;

          bindOrigin.apply(this, arguments);

          container.on('open', function () {
            self.$selection.hide();
            self.$searchContainer.show();
          });

          container.on('close', function () {
            self.$searchContainer.hide();
            self.$selection.show();
          });
        };

        return adapter;
      });

    /*
    * A select2 adapter to show simple dropdown list without a searchbox inside
    */
    $.fn.select2.amd.define("UnsearchableDropdown", [
      "select2/utils",
      "select2/dropdown",
      "select2/dropdown/attachBody",
      "select2/dropdown/closeOnSelect"
    ],
      function (Utils, Dropdown, AttachBody, CloseOnSelect) {
        var adapter = Utils.Decorate(Dropdown, AttachBody);
        adapter = Utils.Decorate(adapter, CloseOnSelect);
        return adapter;
      });

    $('#scorecarddept').select2({
      selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
      dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
    });

  </script>

     <script>

      



     
      $('#kpi_performanceformula_popup').on('show.bs.modal', function () {
          $('#kpi-add-modal').modal('hide'); 
          $(this).attr('data-parent-modal', '#kpi-add-modal'); 
      });

      // When second modal closes, re-open the first one
      $('#kpi_performanceformula_popup').on('hidden.bs.modal', function () {
          let parentModal = $(this).attr('data-parent-modal');
          if (parentModal) {
              $(parentModal).modal('show');
          }
      });

      /////////
      $('#kpiActual-calculator-modal').on('show.bs.modal', function () {
          $('#kpi-add-modal').modal('hide'); 
          $(this).attr('data-parent-modal', '#kpi-add-modal'); 
      });

      // When second modal closes, re-open the first one
      $('#kpiActual-calculator-modal').on('hidden.bs.modal', function () {
          let parentModal = $(this).attr('data-parent-modal');
          if (parentModal) {
              $(parentModal).modal('show');
          }
      });


      /////////////////////
        $('#ytd-calculator-modal').on('show.bs.modal', function () {
          $('#kpi-add-modal').modal('hide'); 
          $(this).attr('data-parent-modal', '#kpi-add-modal'); 
      });

      // When second modal closes, re-open the first one
      $('#ytd-calculator-modal').on('hidden.bs.modal', function () {
          let parentModal = $(this).attr('data-parent-modal');
          if (parentModal) {
              $(parentModal).modal('show');
          }
      });

        $(document).ready(function () {
            $(".select-dropdown").select2({
                // allowClear: true,
                width: "100%"
            });

             $(".select2").select2({
                // allowClear: true,
                width: "100%"
            });
            $(".select-dropdown-add-objective").select2({
                // allowClear: true,
                width: "100%",
                dropdownParent: $('#objective-add-modal')
            });
            $(".select-dropdown-edit-objective").select2({
                // allowClear: true,
                width: "100%",
                dropdownParent: $('#objective-edit-modal')
            });
            $(".select-dropdown-view-objective").select2({
                // allowClear: true,
                width: "100%",
                dropdownParent: $('#objective-view-modal')
            });

            $(".select-dropdown-add-kpi").select2({
                // allowClear: true,
                width: "100%",
                dropdownParent: $('#kpi-add-modal')
            });
            $(".select-dropdown-edit-kpi").select2({
                // allowClear: true,
                width: "100%",
                dropdownParent: $('#kpi-edit-modal')
            });

            $(".select-dropdown-view-kpi").select2({
                // allowClear: true,
                width: "100%",
                dropdownParent: $('#kpi-view-modal')
            });


            $(".select-dropdown-add-subkpi").select2({
                // allowClear: true,
                width: "100%",
                dropdownParent: $('#subkpi-add-modal')
            });
            $(".select-dropdown-edit-subkpi").select2({
                // allowClear: true,
                width: "100%",
                dropdownParent: $('#subkpi-edit-modal')
            });

            $(".select-dropdown-view-subkpi").select2({
                // allowClear: true,
                width: "100%",
                dropdownParent: $('#subkpi-view-modal')
            });

            $(".select-dropdown-edit-subsubkpi").select2({
                // allowClear: true,
                width: "100%",
                dropdownParent: $('#subsubkpi-edit-modal')
            });

            $(".select-dropdown-view-subsubkpi").select2({
                // allowClear: true,
                width: "100%",
                dropdownParent: $('#subsubkpi-view-modal')
            });
            $(".select-dropdown-add-prespective").select2({
                // allowClear: true,
                width: "100%",
                dropdownParent: $('#prespective-add-modal')
            });
            $(".select-dropdown-edit-prespective").select2({
                // allowClear: true,
                width: "100%",
                dropdownParent: $('#prespective-edit-modal')
            });

            $(".select-dropdown-file-upload").select2({
                // allowClear: true,
                width: "100%",
                dropdownParent: $('#import-modal')
            });
            $(".select-dropdown-add-settings").select2({
                // allowClear: true,
                width: "100%",
                dropdownParent: $('#add-settings-modal')
            });
            $(".select-dropdown-kpi-calculator").select2({
                // allowClear: true,
                width: "100%",
                dropdownParent: $('#kpi_performanceformula_popup')
            });


        });
    </script>

    <script>
        let lastOpenedModal = null;
        document.querySelectorAll('.kpi_setting').forEach(modal => {
            modal.addEventListener('show.bs.modal', function () {
                lastOpenedModal = this; // Track the last opened modal
            });
        });


        document.getElementById('objective-calculator-modal').addEventListener('show.bs.modal', function () {
            //document.querySelectorAll('.kpi_setting').forEach(el => el.classList.add('modal-static'));
            if (lastOpenedModal) {
                lastOpenedModal.classList.add('modal-static');
            }
        });
        document.getElementById('objective-calculator-modal').addEventListener('hidden.bs.modal', function () {
            document.querySelectorAll('.kpi_setting').forEach(el => el.classList.remove('modal-static'));
            if (lastOpenedModal) {
                const reopenModal = new bootstrap.Modal(lastOpenedModal);
                reopenModal.show();
                lastOpenedModal = null; // Reset after reopening
            }
        });


        //////////////////////////

            let isRestoringParent = false;

            const childModalEl = document.getElementById("kpi_performanceformula_popup");
            const parentModalEl = document.querySelector(".subkpi_description_popup");

            /* ===============================
            CHILD MODAL OPEN
            ================================ */
            childModalEl.addEventListener("show.bs.modal", () => {
            if (!parentModalEl) return;

            const parentInstance =
                bootstrap.Modal.getInstance(parentModalEl) ||
                new bootstrap.Modal(parentModalEl, {
                backdrop: true,
                keyboard: true,
                focus: false
                });

            if (parentModalEl.classList.contains("show")) {
                lastOpenedModal = parentInstance;
                parentModalEl.dataset.childOpened = "true";
                parentInstance.hide();
            }
            });

            /* ===============================
            CHILD MODAL CLOSE
            ================================ */
            childModalEl.addEventListener("hidden.bs.modal", () => {
            if (isRestoringParent) return;
            if (!parentModalEl) return;

            if (parentModalEl.dataset.childOpened === "true" && lastOpenedModal) {
                isRestoringParent = true;

                setTimeout(() => {
                lastOpenedModal.show();

                delete parentModalEl.dataset.childOpened;
                lastOpenedModal = null;
                isRestoringParent = false;
                }, 300);
            }
            });


        //////////////////////////


        //////////////////////////

let isUpdateRestoringParent = false;


const childUpdateModalEl = document.getElementById(
  "kpi_performanceformula_popup"
);
const parentUpdateModalEl = document.querySelector(
  ".updateSubkpi_description_popup"
);

/* ===============================
   CHILD MODAL OPEN
================================ */
childUpdateModalEl.addEventListener("show.bs.modal", () => {
  if (!parentUpdateModalEl) return;

  const parentInstance =
    bootstrap.Modal.getOrCreateInstance(parentUpdateModalEl, {
      backdrop: true,
      keyboard: true,
      focus: false
    });

  if (parentUpdateModalEl.classList.contains("show")) {
    lastOpenedModal = parentInstance;
    parentUpdateModalEl.dataset.childOpened = "true";
    parentInstance.hide();
  }
});

/* ===============================
   CHILD MODAL CLOSE
================================ */
childUpdateModalEl.addEventListener("hidden.bs.modal", () => {
  if (isUpdateRestoringParent) return;
  if (!parentUpdateModalEl) return;
  if (!lastOpenedModal) return;

  if (parentUpdateModalEl.dataset.childOpened === "true") {
    isUpdateRestoringParent = true;

    setTimeout(() => {
      lastOpenedModal.show();

      delete parentUpdateModalEl.dataset.childOpened;
      lastOpenedModal = null;
      isUpdateRestoringParent = false;
    }, 200);
  }
});


        //////////////////////////


        document.getElementById('kpi-calculator-modal').addEventListener('show.bs.modal', function () {
            //document.querySelectorAll('.kpi_setting').forEach(el => el.classList.add('modal-static'));
            if (lastOpenedModal) {
                lastOpenedModal.classList.add('modal-static');
            }
        });
        document.getElementById('kpi-calculator-modal').addEventListener('hidden.bs.modal', function () {
            document.querySelectorAll('.kpi_setting').forEach(el => el.classList.remove('modal-static'));
            if (lastOpenedModal) {
                const reopenModal = new bootstrap.Modal(lastOpenedModal);
                reopenModal.show();
                lastOpenedModal = null; // Reset after reopening
            }
        });

        document.getElementById('prespective-calculator-modal').addEventListener('show.bs.modal', function () {
            //document.querySelectorAll('.kpi_setting').forEach(el => el.classList.add('modal-static'));
            if (lastOpenedModal) {
                lastOpenedModal.classList.add('modal-static');
            }
        });
        document.getElementById('prespective-calculator-modal').addEventListener('hidden.bs.modal', function () {
            document.querySelectorAll('.kpi_setting').forEach(el => el.classList.remove('modal-static'));
            if (lastOpenedModal) {
                const reopenModal = new bootstrap.Modal(lastOpenedModal);
                reopenModal.show();
                lastOpenedModal = null; // Reset after reopening
            }
        });

        // document.getElementById('kpi_performanceformula_popup').addEventListener('show.bs.modal', function () {
        //     //document.querySelectorAll('.kpi_setting').forEach(el => el.classList.add('modal-static'));
        //     if (lastOpenedModal) {
        //         lastOpenedModal.classList.add('modal-static');
        //     }
        // });

        // document.getElementById('kpi_performanceformula_popup').addEventListener('hidden.bs.modal', function () {
        //     document.querySelectorAll('.kpi_description_popup').forEach(el => el.classList.remove('modal-static'));
        //     if (lastOpenedModal) {
        //         const reopenModal = new bootstrap.Modal(lastOpenedModal);
        //         reopenModal.show();
        //         lastOpenedModal = null; // Reset after reopening
        //     }
        // });

        



    </script>

<!-- Pdf work -->
<!-- <script>

const scorecardJsonListDate = []  

let data = []; // Global variable to store the loaded data


// Function to load JSON data and generate PDF
function loadDataAndGeneratePDF() {
    // $.getJSON("scorecard.json", function(response) {
    //     console.log("Data Loaded Successfully", response);
    //     data = response; // Assign data
    //     console.log(data);
    //     generatePDF();   // Call function after loading data
    // }).fail(function(jqxhr, textStatus, error) {
    //     console.error("Error loading JSON: ", textStatus, error);
    //     alert("Failed to load data!");
    // });

    const response = [
    {
        "pageTitle": "Scorecard",
        "overallScore": "100%",
        "userName": "Sajin",
        "period": "3/01/2025 - 3/22/2025",
        "tab": [
            {
                "title": "Financial",
                "totalScore": "100%",
                "tabledata": [
                    {
                        "flag": [
                            {
                                "status": "green"
                            }
                        ],
                        "id": "F1",
                        "url": "",
                        "name": "% Completion of scorecard",
                        "period": "",
                        "trend": [],
                        "score": "80%",
                        "baseline": "75%",
                        "actual": "",
                        "target": "",
                        "risk": [
                            {
                                "status": "yellow"
                            }
                        ],
                        "actions": "",
                        "children": [
                            {
                                "flag": [
                                    {
                                        "status": "green"
                                    }
                                ],
                                "id": "F1.1",
                                "url": "kpi.html",
                                "name": "ROCE",
                                "period": "Month",
                                "trend": [
                                    {
                                        "status": "down"
                                    }
                                ],
                                "score": "90%",
                                "baseline": "70%",
                                "actual": "12.9%",
                                "target": "13.4%",
                                "risk": [
                                    {
                                        "status": "red"
                                    }
                                ],
                                "actions": "",
                                "children": [
                                    {
                                        "flag": [
                                            {
                                                "status": "green"
                                            }
                                        ],
                                        "id": "F1.1.1",
                                        "url": "kpi.html",
                                        "name": "ROCE",
                                        "period": "Month",
                                        "trend": [
                                            {
                                                "status": "up"
                                            }
                                        ],
                                        "score": "90%",
                                        "baseline": "70%",
                                        "actual": "12.9%",
                                        "target": "13.4%",
                                        "risk": [
                                            {
                                                "status": "green"
                                            }
                                        ],
                                        "actions": ""
                                    },
                                    {
                                        "flag": [
                                            {
                                                "status": "green"
                                            }
                                        ],
                                        "id": "F1.1.2",
                                        "url": "",
                                        "name": "ROCE",
                                        "period": "Month",
                                        "trend": [
                                            {
                                                "status": "up"
                                            }
                                        ],
                                        "score": "90%",
                                        "baseline": "70%",
                                        "actual": "12.9%",
                                        "target": "13.4%",
                                        "risk": [
                                            {
                                                "status": "green"
                                            }
                                        ],
                                        "actions": ""
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "title": "Customer",
                "totalScore": "100%",
                "tabledata": [
                    {
                        "flag": [
                            {
                                "status": "green"
                            }
                        ],
                        "id": "C1",
                        "url": "kpi.html",
                        "name": "% Completion of scorecard",
                        "period": "",
                        "trend": [],
                        "score": "80%",
                        "baseline": "75%",
                        "actual": "",
                        "target": "",
                        "risk": [
                            {
                                "status": "red"
                            }
                        ],
                        "actions": "",
                        "children": [
                            {
                                "flag": [
                                    {
                                        "status": "green"
                                    }
                                ],
                                "id": "C1.1",
                                "url": "kpi.html",
                                "name": "Customer Satisfaction",
                                "period": "Month",
                                "trend": [
                                    {
                                        "status": "up"
                                    }
                                ],
                                "score": "90%",
                                "baseline": "70%",
                                "actual": "85%",
                                "target": "90%",
                                "risk": [
                                    {
                                        "status": "yellow"
                                    }
                                ],
                                "actions": "",
                                "children": [
                                    {
                                        "flag": [
                                            {
                                                "status": "green"
                                            }
                                        ],
                                        "id": "C1.1.1",
                                        "url": "kpi.html",
                                        "name": "Survey Response",
                                        "period": "Month",
                                        "trend": [
                                            {
                                                "status": "down"
                                            }
                                        ],
                                        "score": "95%",
                                        "baseline": "80%",
                                        "actual": "88%",
                                        "target": "92%",
                                        "risk": [
                                            {
                                                "status": "green"
                                            }
                                        ],
                                        "actions": ""
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

    data = response;
     generatePDF();
}


function getBase64Image(url) {
    return new Promise((resolve) => {
        let img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function () {
            let canvas = document.createElement("canvas");
            canvas.width = this.width;
            canvas.height = this.height;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(this, 0, 0);
            resolve(canvas.toDataURL("image/png"));
        };
        img.src = url;
    });
}

const riskImageUrls = {
    green: "/stratroom/images/buzzer-green-i.svg",
    yellow: "/stratroom/images/buzzer-green-i.svg",
    red: "/stratroom/images/buzzer-green-i.svg"
};
const flagImageUrls = {
    green: "/stratroom/images/buzzer-green-i.svg",
    yellow: "/stratroom/images/buzzer-green-i.svg",
    red: "/stratroom/images/buzzer-green-i.svg"
};
const trendImageUrls = {
    up: "/stratroom/images/up-i.png",
    down: "/stratroom/images/up-i.png",
};
const riskImages = {};
const flagImages = {};
const trendImages = {};

async function preloadImages() {
    await Promise.all(
        Object.entries(riskImageUrls).map(async ([key, url]) => {
            riskImages[key] = await getBase64Image(url);
        })
    );
    await Promise.all(
        Object.entries(flagImageUrls).map(async ([key, url]) => {
            flagImages[key] = await getBase64Image(url);
        })
    );
    await Promise.all(
        Object.entries(trendImageUrls).map(async ([key, url]) => {
            trendImages[key] = await getBase64Image(url);
        })
    );
}

const { jsPDF } = window.jspdf;

async function generatePDF() {
    await preloadImages();
    let pdf = new jsPDF();
    let pageWidth = pdf.internal.pageSize.width;
    let pageHeight = pdf.internal.pageSize.height;
    var submissionDate = new Date().toLocaleDateString();
    const logoUrl = "/stratroom/images/logo.png";
    const coverImage = "/stratroom/images/scorecard-bg.jpg";
    const marginLeft = 10;
    const marginRight = pageWidth - marginLeft;

    // Helper function to add full-page images
    function addCoverPage(section) {
        const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
        const textStartY = imgY + 5;
        let cfh = 20;
        let cfhs = 10;
        let bgColor = [120, 45, 90];
        let periodText = section?.period ? `Period: ${section.period}` : "Period: N/A";
        let titleText = section?.pageTitle ? `${section.pageTitle}` : "N/A";
             pdf.addImage(coverImage, 'JPEG', 0, 0, pageWidth, pageHeight);
            //pdf.addImage(logoUrl, "PNG", pageWidth / 2 - 25, 20, 50, 15); 
            pdf.addImage(logoUrl, "PNG", marginRight - imgWidth, imgY, imgWidth, imgHeight,{ align: "right" });


            pdf.setTextColor(171, 80, 103);
            pdf.setFontSize(32);
            pdf.setFont("helvetica", "bold");
            // pdf.text("Performance <br/>Report".toUpperCase(), pageWidth / 2, 50, { align: "center" });

            pdf.text(titleText.toUpperCase(), pageWidth / 2, 57, { align: "center" });
             pdf.text("Report".toUpperCase(), pageWidth / 2, 70, { align: "center" });

             pdf.setTextColor(0, 0, 0);
            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.text(periodText, pageWidth / 2, 85, { align: "center" });


            pdf.setFillColor(...bgColor);
            pdf.rect(0, pageHeight - cfhs, pageWidth, cfhs, 'F');
            // Draw angled shape
            pdf.setFillColor(...bgColor);
            pdf.lines([[pageWidth/2, 0],[20, cfh],  [-90, 0] ], -20, pageHeight - cfh, [1, 1], 'F');

           
            const shapeWidth = 20;
const shapeHeight = pageHeight / 2; // 50% of the page height

pdf.setFillColor(...bgColor);
pdf.lines(
    [
        [15, 0],    // Move right (width of the shape)
        [0, pageHeight / 3],  // Move down (50% of page height)
        [-15, 15], // Move left and diagonally up for the slanted bottom
        [0, - (pageHeight / 2 - 15)]  // Move straight up to close the shape
    ],
    0,  // Start from X = 0 (left edge)
    0,  // Start from Y = top of the page
    [1, 1],
    'F'
);






            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(10);
            pdf.setFont("helvetica", "bold");      
            pdf.text(`Generated Date:  ${submissionDate} `, 10, pageHeight - 12);          
            pdf.text(periodText, 10, pageHeight - 6);

            pdf.addPage();
        };

        // Add Cover Page
      
       
    function header(section) {
        const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
         const textStartY = imgY + 5;
         let title = (section?.pageTitle ? section.pageTitle + " Report" : "Performance Report");
         let score = section?.overallScore ? `${section.overallScore}` : "";
         let name = section?.userName ? `${section.userName}` : "";
         let period = section?.period ? `${section.period}` : "";
         

        pdf.addImage(logoUrl, "PNG", imgX, imgY, imgWidth, imgHeight);
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(13);
        pdf.setFont("helvetica", "bold");
        pdf.text(title, marginRight, textStartY - 3, { align: "right" });
        pdf.setTextColor(0, 0, 0);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.text(`Generated Date: ${submissionDate}`, marginRight, textStartY + 1, { align: "right" });
        pdf.text(`Name: ${name} | Score: ${score}`, marginRight, textStartY + 6, { align: "right" });
        pdf.text(`Period: ${period}`, marginRight, textStartY + 10, { align: "right" });           
        pdf.line(10, imgHeight + 12, pageWidth - 10, imgHeight + 12);
        return imgHeight + 20;
    }


    function footer(pageNumber, totalPages) {
        let footerHeight = 20;
        let footerHeightsm = 10;
        let bgColor = [120, 45, 90]; // Adjusted color to match

    // Draw footer base rectangle
    pdf.setFillColor(...bgColor);
    pdf.rect(0, pageHeight - footerHeightsm, pageWidth, footerHeightsm, 'F');

    // Draw angled shape
    pdf.setFillColor(...bgColor);
    pdf.lines([
    [pageWidth/2, 0],   // Move right (top horizontal line)
    [20, footerHeight],  // Diagonal slant
    [-90, 0]   // Move left to close the shape
    ], -20, pageHeight - footerHeight, [1, 1], 'F');

    // White Text Styling
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");

    // Footer Title
    pdf.text("Corporate Performance Report", 10, pageHeight - 10);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    // Page Number
    pdf.text(`Page ${pageNumber} of ${totalPages}`, marginRight, pageHeight - 4,{ align: "right" });
    }

    addCoverPage(data[0]);


let reportStartPage = pdf.internal.getNumberOfPages(); // First actual report page

    data.forEach(section => {
        let y = header(section);
        section.tab.forEach(tab => {
            if (!tab.tabledata) return;

        if (y + (tab.tabledata.length * 6 + 16) > pageHeight - 40) {
            pdf.addPage();
            y = header(section);
        }
        pdf.setFontSize(12).setFont("helvetica", "bold");
        pdf.text(`${tab.title} (Total Score: ${tab.totalScore})`, 10, y);
        y += 5;

        pdf.autoTable({
            startY: y,
            head: [["Flag", "ID", "Name", "Period", "Score", "Trend", "Baseline", "Actual", "Target", "Risk"]],
            body: processTableData(tab.tabledata),
            theme: 'grid',
            styles: { fontSize: 10, cellPadding: 2, lineColor: [201, 201, 201] },
            headStyles: { fillColor: [147, 69, 120], textColor: [255, 255, 255] },
            margin: { top: 8, left: 10, right: 10 },
            pageBreak: 'avoid',
            didDrawCell: function (data) {
                let imgSize = 4;
                if (data.section === "body") {
                   
                    if (data.column.index === 0) {
                        let flagStatus = data.row.raw[0]?.toLowerCase();
                        if (flagImages[flagStatus]) {
                            pdf.setFillColor(255, 255, 255);
                    pdf.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, "F");
                    pdf.setDrawColor(201,201,201); 
                    pdf.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);
                            pdf.addImage(flagImages[flagStatus], "PNG", data.cell.x + (data.cell.width - imgSize) / 2, data.cell.y + (data.cell.height - imgSize) / 2, imgSize, imgSize);
                            
                        }
                    }
                    if (data.column.index === 5) {
                        let trendStatus = data.row.raw[5]?.toLowerCase();
                        if (trendImages[trendStatus]) {
                            pdf.setFillColor(255, 255, 255);
                    pdf.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, "F");
                    pdf.setDrawColor(201,201,201); 
                    pdf.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);
                            pdf.addImage(trendImages[trendStatus], "PNG", data.cell.x + (data.cell.width - imgSize) / 2, data.cell.y + (data.cell.height - imgSize) / 2, imgSize, imgSize);
                        }
                    }
                    if (data.column.index === 9) {
                        let riskStatus = data.row.raw[9]?.toLowerCase();
                        if (riskImages[riskStatus]) {
                            pdf.setFillColor(255, 255, 255);
                    pdf.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, "F");
                    pdf.setDrawColor(201,201,201); 
                    pdf.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);
                            pdf.addImage(riskImages[riskStatus], "PNG", data.cell.x + (data.cell.width - imgSize) / 2, data.cell.y + (data.cell.height - imgSize) / 2, imgSize, imgSize);
                        }
                    }
                }
            }
        });
        y = pdf.lastAutoTable.finalY + 10;
    });
    });
    let totalReportPages = pdf.internal.getNumberOfPages() - (reportStartPage - 1);
    for (let i = reportStartPage; i <= pdf.internal.getNumberOfPages(); i++) {
        pdf.setPage(i);
        footer(i - (reportStartPage - 1), totalReportPages);
    }
    pdf.save("report.pdf");
}


function processTableData(items, level = 0) {
    let tableRows = [];
    items.forEach(item => {
        tableRows.push([
            item.flag[0]?.status || "",
            "\u00A0\u00A0".repeat(level) + item.id,
            "\u00A0\u00A0".repeat(level) + item.name,
            item.period || "",
            item.score || "",
            item.trend[0]?.status || "",
            item.baseline || "",
            item.actual || "",
            item.target || "",
            item.risk[0]?.status || ""
        ]);

        if (item.children?.length) {
            tableRows = tableRows.concat(processTableData(item.children, level + 1));
        }
    });
    return tableRows;
}


</script> -->