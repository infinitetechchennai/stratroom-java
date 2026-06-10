<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
    <%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <c:set var="contextroot" value="${pageContext.request.contextPath}" />

        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=Edge">
            <meta content="width=device-width, initial-scale=1" name="viewport" />
            <title>StratRoom</title>
            <!-- Plugins Core Css -->

            <link href="assets/css/bootstrap.min.css" rel="stylesheet">
            <link href="assets/css/basic.css?v0.004" rel="stylesheet">
            <link href="assets/css/main.css?v0.004" rel="stylesheet">
            <link href="assets/css/responsive.css" rel="stylesheet">
            <link rel="stylesheet" href="${contextroot}/css/datepickerair.css">

            <!-- <link href="${contextroot}/css/employee.css" rel="stylesheet" /> -->


            <!-- Font Awsome Icons -->
            <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
            <link rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />


            <style>
                .align-items-start {
                    align-items: flex-start !important;
                }

                .justify-content-center {
                    justify-content: center !important;
                }

                .d-flex {
                    display: flex !important;
                }

                .gap-2 {
                    gap: 0.5rem !important;
                }

                .d-grid {
                    display: grid !important;
                }

                .offcanvas .offcanvas-title {
                    font-size: 15px;
                    font-weight: 500;
                }

                .nested-area {
                    list-style-type: none;
                    margin: 0;
                    padding: 0;
                    position: relative;
                    padding-left: 35px;
                }

                .nested-area.nested {
                    display: none;
                }

                .nested-area.active {
                    display: block;
                }

                .nested-area.sortable-empty::before,
                .nested-area.sortable-empty::after {
                    display: none;
                }

                .nested-area::before,
                .nested-area::after {
                    content: "";
                    position: absolute;
                    background-color: var(--primary-color);
                }

                .nested-area::before {
                    width: 1px;
                    height: 100%;
                    top: 0;
                    left: 18px;
                    bottom: 0;
                    min-height: 55px;
                }

                .nested-area::after {
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    left: 16px;
                    bottom: 0;
                }

                .nested-area .nested-item {
                    padding-top: 12px;
                }

                .nested-area .nested-item:first-child,
                .nested-area .nested-item.non-draggable,
                .nested-area .nested-item.nested-item-parent {
                    padding-top: 20px;
                }

                .nested-area .nested-item.dragging-highlight {
                    opacity: 0.7;
                }

                .nested-area .nested-item.dragging-highlight::before,
                .nested-area .nested-item.dragging-highlight::after {
                    display: none;
                }

                .nested-area .nested-item.dragging-highlight .org-box {
                    border-style: dashed;
                }

                .nested-area .nested-item .caret {
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    left: -27px;
                    top: 10px;
                    text-align: center;
                    border-radius: 50%;
                    background-color: #FFF;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid rgba(0, 0, 0, 0.3);
                    cursor: pointer;
                    user-select: none;
                }

                .nested-area .nested-item .caret::before {
                    content: "";
                    color: #85798c;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    /* background-image: url(/carat-i.svg); */
                    background-position: center center;
                    background-repeat: no-repeat;
                    background-size: 6px;
                    width: 20px;
                    height: 20px;
                    position: relative;
                    transform: rotate(180deg);
                    transition: 0.15s ease-in-out;
                }

                .nested-area .nested-item .caret.caret-down::before {
                    transform: rotate(360deg);
                }

                .nested-area.nested {
                    padding-left: 35px;
                }

                .nested-area.nested::before {
                    left: 18px;
                }

                .nested-area .nested-item {
                    position: relative;
                }

                .nested-area .nested-item:first-child::before {
                    content: "";
                    position: absolute;
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background-color: var(--primary-color);
                    left: -19px;
                    top: 0;
                }

                .nested-area .nested-item .parent::before,
                .nested-area .nested-item .child::before {
                    content: "";
                    position: absolute;
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background-color: var(--primary-color);
                    left: -20px;
                    top: 16px;
                }

                .nested-area .nested-item .parent::after,
                .nested-area .nested-item .child::after {
                    content: "";
                    width: 15px;
                    height: 1px;
                    background-color: var(--primary-color);
                    top: 18px;
                    position: absolute;
                    left: -15px;
                    bottom: 0;
                }

                /* Placeholder styling */
                .ui-sortable-placeholder {
                    padding-top: 12px;
                }

                .ui-sortable-placeholder::before {
                    content: 'drag & drop here';
                    display: flex;
                    height: 48px;
                    width: 100%;
                    border: 1px dashed var(--card-border-color);
                    border-radius: var(--border-radius);
                    text-align: center;
                    justify-content: center;
                    align-items: center;
                }

                .sortable-empty {
                    padding-top: 12px;
                }

                .sortable-empty::before {
                    content: 'drag & drop here';
                    display: flex;
                    height: 48px;
                    width: 100%;
                    border: 1px dashed var(--card-border-color);
                    border-radius: var(--border-radius);
                    text-align: center;
                    justify-content: center;
                    align-items: center;
                }

                .select2-container--open {
                    z-index: 99999 !important;
                    /* Ensure this is higher than the modal's z-index */
                }

                .sidebar-strategy .modal-dialog {
        min-height: 600px; /* or whatever height works for your calendar */
    }
    
    /* Make sure date picker appears above modal */
    .datepicker {
        z-index: 1060 !important; /* Higher than modal's default 1050 */
    }
    
    /* Adjust input field styling */
    .date_pickers {
        position: relative;
    }


     .hover-effect {
        background-color: white;
    }
    .hover-effect:hover {
        background-color: #ddd;
    }


   
            </style>

        </head>
        <script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>

        <body class="light">
            <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
            <!-- Page Loader -->
         
            <!-- #Top Bar -->

            <div>
                <!-- Left Sidebar -->
                
            </div>
            <!-- #END# Left Sidebar -->
            <div style="display: none;">
                <jsp:include page="templates/formulation_sidebar_template.jsp"></jsp:include>
            </div>
            <!-- <aside id="initiative_sidebar" class="initiative_sidebar">
      <div class="sub_initiatives" id="sub_initiatives" style="height: 100%">
        <div class="card sidebarstrategy" style="height: 100%;overflow-y:scroll !important;">
          <div
            class="header d-flex flex-row initiate_sidebar"
            style="margin-top: 5%; padding: 5px 16px 14px 5px"
          >
            <h5 class="prob flex-fill">
              <strong style="color: #333; font-size: 14px">Formulation Register</strong>
            </h5>
            
              	<span class="pull-right addformulation" style="margin-right: 2px" onclick="openStrategyAdd('','add')">
              		<i class="fas fa-plus border-box" data-toggle="tooltip"
                data-placement="bottom"
                title="Add Formulation" style="font-size: 11px; color: #212529"></i>
              	</span>	
              	<span class="pull-right"> 
              		<i class="fas fa-filter border-box" data-toggle="tooltip"
                data-placement="bottom"
                title="Filter" style="font-size: 11px; color: #212529"></i>
            	</span>
            
          </div>
          <div class="d-flex flex-column" id="initiate_sidebar">
            
            
          </div>
        </div>
      </div>
    </aside> -->

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

              <div id="deletePerspectiveold" class="modal fade">
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
                                <input type="hidden" id="deleteperspectiveid" />
                                <input type="hidden" id="deleterecordtype" />
                                <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close"
                                    data-i18n="Cancel">Cancel</button>
                                <button type="button" class="btn btn-danger confirm-modal-deleteBtn"
                                    onclick="handleperspectivedelete()">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal custom-modal custom-delete-modal fade" id="deletePerspective" data-backdrop="static"
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
                                            <input type="hidden" id="deleteperspectiveid" />
                                            <input type="hidden" id="deleterecordtype" />
											<button type="button" class="btn btn-sm btn-label-secondary rounded-pill"
												data-bs-dismiss="modal" aria-label="Close" data-translate="page.orgstructure.cancel">
												Cancel
											</button>
											<button class="btn btn-sm btn-danger rounded-pill"
												value="Yes" data-translate="page.orgstructure.delete" onclick="handleperspectivedelete()">Delete</button>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>

            <!--#Start User Edit Popup -->
            <div class="modal fade" id="user_edit_popup_old" tabindex="-1" role="dialog"
                aria-labelledby="myLargeModalLabel_1" aria-modal="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4>Edit Users</h4>
                            <button type="button" class="close pull-right getselectedActivitiesUsers"
                                data-formulationid="" data-dismiss="modal">
                                &times;
                            </button>
                        </div>
                        <div class="row showactivitiesusers" style="
                            padding: 0 50px;
                            margin-bottom: 10px !important;
                            margin-top: 10px;">
                            <div class="col-5">
                                <div class="form-check allusersdisable">
                                    <label class="form-check-label" style="padding-left: 12px"><input
                                            class="form-check-input" id="allusersactivities" type="checkbox"
                                            value="" /><span class="form-check-sign">
                                            <span class="check"
                                                style="margin-left: -17px; margin-top: 0"></span></span>All
                                        Users</label>
                                </div>
                            </div>

                            <div class="col-7 pr-0">
                                <span class="pull-right" id="activities_search2" style="margin-right: -12px">
                                    <i class="fas fa-search border-box"></i>
                                </span>
                                <span class="pull-right search-section" style="display: none; margin-right: 0px"
                                    id="activities_search_section2">
                                    <input type="text" class="search" autocomplete="off" id="searchactivities"
                                        placeholder="Search" />
                                    <i class="fas fa-search"></i>
                                    <i class="fas fa-times" id="activities_close_search2" style="right:15px;"></i>
                                </span>
                            </div>
                        </div>
                        <div class="col-lg-12 col-md-12 sub_initiatives">
                            <div class="d-flex flex-column employee_div_body_box sub-ini-box" id="sub-ini-box_view"
                                style="overflow: hidden; width: auto; height: 350px">
                                <span id="sub-ini-box_view_users">

                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--#End User Edit Popup -->

                <div class="modal custom-modal fade" id="user_edit_popup" data-backdrop="static" data-keyboard="false"
                    tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Edit Users</h4>
                                <button type="button" class="btn-close getselectedActivitiesUsers" data-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div class="modal-body d-grid gap-3">
                                <div class="attendees-search">
                                    <div>
                                        <div class="form-check cusom-check">
                                            <input class="form-check-input" type="checkbox" value="" id="allusersactivities">
                                            <label class="form-check-label" for="allusers">
                                                All Users
                                            </label>
                                        </div>
                                    </div>
                                    <div class="search">
                                        <div class="input-group input-group-sm">
                                            <input type="text" class="form-control" placeholder="Recipient's username"
                                                aria-label="Recipient's username" aria-describedby="button-addon2" id="searchactivities_new">
                                            <button class="btn btn-outline-secondary" type="button" id="button-addon2">
                                                <i class="fas fa-search" data-toggle="tooltip" data-placement="bottom" title=""
                                                    data-original-title="Files"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="list-group add-attendees" id="sub-ini-box_view_users_new">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            <!-- KPI Calculator -->

            <div class="modal fade kpi_formula_popup" id="kpi_formula_popup" tabindex="-1" role="dialog"
                aria-labelledby="myLargeModalLabel" aria-hidden="true" modal-backdrop="false" data-backdrop="false">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h6 class="modal-title" id="myLargeModalLabel">KPI Calculator</h6>
                            <button type="button" id="closePopupId" class="close" data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" style="padding: 0 25px">
                            <div class="col-md-8" style="padding: 0">Field Name: &nbsp;
                                <!-- <input type="text" class="browser-default" name="objective_id" id="objective_id" placeholder="">-->
                                <select id="fieldId" name="fieldName" class="form-control browser-default">
                                    <option value="" data-i18n="Choose">Choose</option>
                                    <option value="Actual" data-i18n="Actual">Actual</option>
                                    <option value="Target" data-i18n="Target">Target</option>
                                    <option value="Budget" data-i18n="Budget">Budget</option>
                                </select>
                            </div>
                            <div class="card">
                                <ul class="nav nav-tabs" role="tablist">
                                    <li class="nav-item m-l-10">
                                        <a class="nav-link active" data-toggle="tab" href="#formula_builder">Formula
                                            Builder</a>
                                    </li>
                                    <li class="nav-item m-l-10">
                                        <a class="nav-link" data-toggle="tab" href="#summary_calculation">Summary
                                            Calculation</a>
                                    </li>
                                </ul>
                                <div class="tab-content" style="padding: 10px">
                                    <div class="tab-pane body active" id="formula_builder">
                                        <div class="row col-md-12">
                                            <textarea class="browser-default" name="formula_actual" id="formula_actual"
                                                placeholder="" cols="" rows="1" autocomplete="off"></textarea>
                                            <!-- <textarea name="formula" id="formula"></textarea> -->
                                        </div>
                                        <div class="row col-md-12">
                                            <button type="button" class="opr btn btn-secondary"
                                                onclick="updateFormula('+')">+</button>
                                            <button type="button" class="opr btn btn-secondary"
                                                onclick="updateFormula('-')">-</button>
                                            <button type="button" class="opr btn btn-secondary"
                                                onclick="updateFormula('*')">*</button>
                                            <button type="button" class="opr btn btn-secondary"
                                                onclick="updateFormula('/')">/</button>
                                            <button type="button" class="opr btn btn-secondary"
                                                onclick="updateFormula('%')">%</button>
                                            <button type="button" class="opr btn btn-secondary"
                                                onclick="updateFormula('(')">(</button>
                                            <button type="button" class="opr btn btn-secondary"
                                                onclick="updateFormula(')')">)</button>
                                            <button type="button" class="opr btn btn-secondary"
                                                onclick="updateFormula('[')">[</button>
                                            <button type="button" class="opr btn btn-secondary"
                                                onclick="updateFormula(']')">]</button>
                                            <button type="button" class="opr btn btn-secondary"
                                                onclick="updateFormula(':')">:</button>
                                            <button type="button" class="opr btn btn-secondary"
                                                onclick="updateFormula('AND')">AND</button>
                                            <button type="button" class="opr btn btn-secondary"
                                                onclick="updateFormula('OR')">OR</button>
                                            <button type="button" class="opr btn btn-secondary"
                                                onclick="updateFormula('NOT')">NOT</button>
                                            <button type="button" class="opr btn btn-secondary"
                                                onclick="updateFormula('IN')">IN</button>
                                            <button type="button" class="opr btn btn-secondary"
                                                onclick="updateFormula('==')">==</button>
                                            <button type="button" class="opr btn btn-secondary"
                                                onclick="updateFormula('!=')">!=</button>
                                            <button type="button" class="opr btn btn-secondary"
                                                onclick="updateFormula('>')">></button>
                                            <button type="button" class="opr btn btn-secondary"
                                                onclick="updateFormula('<')">
                                                << /button>
                                                    <button type="button" class="opr btn btn-secondary"
                                                        onclick="updateFormula('>=')">>=</button>
                                                    <button type="button" class="opr btn btn-secondary"
                                                        onclick="updateFormula('<=')">
                                                        <=< /button>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="panel panel-primary" id="result_panel">
                                                    <div class="panel-heading">
                                                        <h6 class="panel-title">Fields and measures:</h6>
                                                    </div>
                                                    <div class="panel-body" data-spy="scroll">
                                                        <input type="text" class="form-control browser-default"
                                                            onkeyup="fieldmeasurefilter('measureNames','fieldmeasurefilter')"
                                                            id="fieldmeasurefilter" autocomplete="off"
                                                            placeholder="Search">
                                                        <button type="button" class="searchformulaicon"><i
                                                                class="fa fa-search"></i></button>
                                                        <ul class="list-group" id="measureNames">
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="panel panel-primary" id="result_panel1">
                                                    <div class="panel-heading">
                                                        <h6 class="panel-title">Functions:</h6>
                                                    </div>
                                                    <div class="panel-body">
                                                        <ul class="list-group">
                                                            <li class="list-group-item"
                                                                onclick="updateFormula('if','if')">if</li>
                                                            <li class="list-group-item"
                                                                onclick="updateFormula('avg','avg')">avg</li>
                                                            <li class="list-group-item"
                                                                onclick="updateFormula('agg','agg')">agg</li>
                                                            <li class="list-group-item"
                                                                onclick="updateFormula('count','count')">count</li>
                                                            <li class="list-group-item"
                                                                onclick="updateFormula('sum','sum')">sum</li>
                                                            <li class="list-group-item"
                                                                onclick="updateFormula('min','min')">min</li>
                                                            <li class="list-group-item"
                                                                onclick="updateFormula('max','max')">max</li>
                                                            <!-- <li class="list-group-item" onclick="updateFormula('median','median')">median</li>-->
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="panel panel-primary formuladynamicdesc" id="result_panel1">
                                                    <div class="panel-heading">
                                                        <h6 class="panel-title">Function Description:</h6>
                                                    </div>
                                                    <div class="panel-body">
                                                        <h6 class="formulaheaderdesc"></h6>
                                                        <p class="formulacontentdesc">

                                                        </p>
                                                    </div>
                                                    <!-- <input type="checkbox" name="check" /> Show argumnets in formula -->
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4" style="margin-bottom: 0px">
                                                <button name="validate" id="validate" class="btn btn-secondary"
                                                    onclick="handleFormulaValidate('KPI')">Validate</button>
                                                <button name="add" id="add" class="btn btn-secondary"
                                                    onclick="handleFormulaAdd('KPI')">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane body" id="summary_calculation">
                                        <div class="col-md-12">
                                            <div class="panel panel-primary" id="final_panel">
                                                <div class="panel-heading">
                                                    <h6 class="panel-title">Formula</h6>
                                                </div>
                                                <div class="panel-body">
                                                    <ul class="list-group formula-panel">
                                                        <li class="list-group-item">Elapsed Year</li>
                                                        <li class="list-group-item">Ends With</li>
                                                        <li class="list-group-item">If</li>
                                                        <li class="list-group-item">Is Null</li>
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
            <!-- END KPI Calculator -->
               <jsp:include page="../common/top-navigation.jsp"></jsp:include>
            <header id="header" class="header shadow-sm">
              
                <jsp:include page="../common/left-navigation.jsp"></jsp:include> 
            </header>

            <main class="pt-2 pb-2">


                <div class="container-lg">
                    <div class="page-header grid gap-2 pb-1">
                        <div class="g-col-8 d-flex align-items-center">
                            <h4 class="title">
                                <span class="icon">
                                    <img src="images/strategy-planning-i.svg" alt="strategy-planning"
                                        title="strategy-planning" width="16" height="16">
                                </span>
                                <span data-translate="Strategy Formulation">Strategy Formulation</span>
                            </h4>
                        </div>
                        <div class="load-page page-actions g-col-4">


                            <div class="page-icons">
                                <ul>
                                    <li>
                                        <a href="#" data-bs-toggle="modal">
                                            <span data-bs-toggle="tooltip" data-bs-placement="bottom"
                                                data-bs-title="View">
                                                <img src="images/view-i.svg" width="12" height="12" />
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#file-validate-form" data-bs-toggle="modal">
                                            <span data-bs-toggle="tooltip" data-bs-placement="bottom"
                                                data-bs-title="Import">
                                                <img src="images/import-i.svg" width="12" height="12" alt="import"
                                                    title="import">
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" data-bs-toggle="modal">
                                            <span data-bs-toggle="tooltip" data-bs-placement="bottom"
                                                data-bs-title="Export">
                                                <img src="images/export-i.svg" width="12" height="12" alt="import"
                                                    title="Export">
                                            </span>
                                        </a>
                                    </li>


                                </ul>
                            </div>

                        </div>
                    </div>
                </div>



                <div class="container-lg py-2">
                    <div class="card custom-card org-structure-card">

                        <jsp:include page="templates/formulation_desc_template.jsp"></jsp:include>
                        <div class="col-12 strategy-formula">
                        </div>



                        <div class="card-body">
                            <div class="col-12" id="persp-colored-div">

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
                <a class="control-link" href="#"><span class="icon"><img src="images/organization-i.svg" width="18"
                            height="18" alt="organization"></span></a>
                <a class="control-link" href="#"><span class="icon"><img src="images/template.svg" width="18"
                            height="18" alt="organization"></span></a>
            </div>



            <div class="offcanvas offcanvas-toggle offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false"
                tabindex="-1" id="offcanvasRiskRegister" aria-labelledby="offcanvasRiskRegisterLabel">

                <div class="offcanvas-toggle-menu">
                    <button id="toggleButton" class="btn p-0" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRiskRegister" aria-controls="offcanvasRiskRegister">
                        <i class="fas fa-caret-right"></i>
                    </button>
                    <button class="btn p-0" data-bs-dismiss="offcanvas" aria-label="Close">
                        <i class="fas fa-caret-left"></i>
                    </button>
                </div>

                <div class="offcanvas-header justify-content-between gap-2">
                    <h5 class="offcanvas-title" id="offcanvasRiskRegisterLabel" data-translate="Formulation Register">Formulation Register</h5>
                    <div class="canvas-header-actions">
                        <a class="btn btn-sm btn-outline-icon" data-bs-toggle="modal">
                            <span class="icon hover-effect" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                data-bs-title="Add Strategic plan" onclick="openStrategyAdd('','add')">
                                <i class="fas fa-plus"></i>
                            </span>

                        </a>
                        <a class="btn btn-sm btn-outline-icon" href="#file-validate-form" data-bs-toggle="modal">
                            <span class="icon hover-effect" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                data-bs-title="Import">
                                <img src="images/import-i.svg" alt="import" width="12" height="12">
                            </span>
                        </a>
                        <a class="btn btn-sm btn-outline-icon" href="#">
                            <span class="icon hover-effect" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                data-bs-title="Export">
                                <img src="images/export-i.svg" alt="export" width="12" height="12">
                            </span>
                        </a>


                    </div>
                </div>

                <div class="offcanvas-body">

                    <div class="d-flex flex-column" id="initiate_sidebar">

                    </div>
                </div>
            </div>
            <!--#START Plan Description -->

            <!-- #Start Risk Desc PopUp -->
            <div class="modal custom-modal fade sidebar-strategy" data-bs-backdrop="static" data-bs-keyboard="false"
                tabindex="-1" id="strategy_add" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-lg-600">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="formulationHeader">Add Formulation</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="stragey_formulation_Form">
                                <div class="card-body">
                                    <div class="grid gap-3">
                                        <div class="g-col-12">
                                            <label for="Name" data-i18n="Name">Name</label>
                                            <input type="text" id="formulationName" name="formulationName"
                                                class="form-control browser-default" autocomplete="off" />
                                        </div>
                                        <input type="hidden" name="action">
                                        <input type="hidden" name="id">
                                       
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="riskUniqueId" class="form-label">Department</label>
                                            <select class="multi-select-2" name="formulationDept[]" id="formulationDept"
                                                multiple="multiple" autocomplete="off" style="width: 100%;"></select>
                                        </div>

                                        <div class="g-col-12 g-col-md-6">
                                            <label for="Name">Start / End Date</label>
                                            <input
                                                type="text"
                                                class="form-control browser-default date_pickers"
                                                data-range="true"
                                                data-multiple-dates-separator=" - "
                                                data-language="en"
                                                id="startDate" 
                                                name="startDate" 
                                                autocomplete="off"
                                                style="background-color: white; cursor: pointer;"
                                            />
                                        </div>

                                        <div class="g-col-12 g-col-md-6">
                                            <label for="Name">Plan Type</label>
                                            <select id="planType" name="planType" style="padding-left: 6px !important"
                                                class="form-control browser-default">
                                                <option value="" data-i18n="Choose">Choose</option>
                                                <option value="Long Term">Long Term</option>
                                                <option value="Medium Term">Medium Term</option>
                                                <option value="Short Term">Short Term</option>
                                            </select>
                                        </div>

                                        <div class="g-col-12 g-col-md-6">
                                            <label for="Import">Import Formulation</label>
                                            <select id="importFormulation" name="importFormulation"
                                                style="padding-left: 6px !important"
                                                class="form-control browser-default">
                                                <option value="" data-i18n="Choose">Choose</option>
                                            </select>
                                        </div>

                                        <div class="g-col-12 g-col-md-6">
                                            <label for="Name">Formulation Team</label>
                                            <div class="owner" style="padding-right: 12px">
                                                <input type="hidden" id="formulationteamid">
                                                <ul id="formulationTeam" class="list-unstyled d-flex align-items-center avatar-group mb-0 order-list"
                                                    style="cursor:pointer">
                                                </ul>
                                            </div>
                                        </div>

                                        <div class="g-col-12 g-col-md-6 form-group approvedbyemployee">
                                            <label for="Name">Approved By</label>
                                            <div class="owner" style="padding-right: 12px">
                                                <input type="hidden" id="approvedbyemployee">
                                                <ul class="list-unstyled order-list" id="approvedemp"
                                                    style="cursor: pointer">

                                                </ul>
                                            </div>
                                        </div>

                                        <div class="g-col-12 g-col-md-6">
                                            <label for="Name">Approved Date</label>
                                            <input type="text" class="form-control browser-default date_pickers_single"
                                                data-language="en" name="approvedDate" id="approvedDate"
                                                autocomplete="off" readonly />
                                        </div>

                                    </div>
                                </div>

                                <hr>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary btn-default1" data-bs-dismiss="modal"
                                        aria-label="Close">
                                        Cancel
                                    </button>
                                    <button class="btn btn-primary initative_save_btn pull-right" id="formulationsave"
                                        value="Save" data-i18n="Save">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>


                        <!-- <div class="modal-footer">
                            <div class="col-12 form-group">
                                <button class="btn btn-secondary initative_save_btn pull-right"  value="Cancel" data-i18n="Cancel">
                                    Cancel
                                  </button>
                                <button class="btn btn-primary initative_save_btn pull-right" id="formulationsave" value="Save" data-i18n="Save">
                                    Save
                                  </button>
                                
                                <button class="initative_save_btn pull-right" value="Save" id="approve_str">
                                  Approved
                                </button>
                                
                                <button style="display: none" class="initative_save_btn pull-right" value="Save" id="reset_str">
                                  Reset
                                </button>
                              </div>
                            
                        </div> -->
                    </div>
                </div>
            </div>

            <div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                id="edit-formulation" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-lg-600">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Edit Formulation</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="objectiveForm" class="card custom-card border-0">
                                <div class="card-body">
                                    <div class="grid gap-3">
                                        <div class="g-col-12">
                                            <label for="objective_name" class="form-label">Name</label>
                                            <input type="text" class="form-control" name="name" />
                                        </div>

                                        <div class="g-col-12">
                                            <label for="objective_description" class="form-label">Description</label>
                                            <textarea class="form-control" placeholder="" rows="3"></textarea>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="riskUniqueId" class="form-label">Department</label>
                                            <input type="text" class="form-control" name="riskUnique_id"
                                                id="riskUniqueId" />
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="kpi_start_end_date" class="form-label">Plan Type</label>
                                            <select id="" name="" class="form-select">
                                                <option>Choose</option>
                                                <option>Long Term</option>
                                                <option>Medium Term</option>
                                                <option>Short Term</option>
                                            </select>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="riskUniqueId" class="form-label">Start / End Date</label>
                                            <input type="date" class="form-control" name="riskUnique_id"
                                                id="riskUniqueId" />
                                        </div>

                                        <div class="g-col-12 g-col-md-6">
                                            <label for="kpi_start_end_date" class="form-label">Import
                                                Formulation</label>
                                            <select id="" name="" class="form-select">
                                                <option>Choose</option>
                                                <option value="1">Strategy Formulation 2023</option>
                                                <option value="2">Strategy Formulation 2024</option>
                                            </select>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="" class="form-label">Formulation Team</label>
                                            <div class="d-flex align-items-start">
                                                <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">

                                                    <li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip"
                                                        data-bs-placement="top" title="Kim Karlos">
                                                        <img src="images/user9.jpg" class="rounded-circle"
                                                            alt="Kim Karlos" width="24" height="24">
                                                    </li>

                                                    <li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip"
                                                        data-bs-placement="top" title="John Doe">
                                                        <img src="images/user9.jpg" class="rounded-circle"
                                                            alt="John Doe" width="24" height="24">
                                                    </li>


                                                    <li class="avatar avatar-xs pull-up" href="#attendess-list"
                                                        data-bs-toggle="modal">
                                                        <span class="avatar-initial rounded-circle"
                                                            data-bs-toggle="tooltip" data-bs-placement="top"
                                                            title="3 more">+3</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="" class="form-label">Approved By</label>
                                            <div class="d-flex align-items-start">
                                                <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">

                                                    <li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip"
                                                        data-bs-placement="top" title="Kim Karlos">
                                                        <img src="images/user9.jpg" class="rounded-circle"
                                                            alt="Kim Karlos" width="24" height="24">
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>


                        <div class="modal-footer">
                            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal"
                                aria-label="Close">
                                Cancel
                            </button>
                            <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
                        </div>
                    </div>
                </div>
            </div>



            <div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                id="add-prespective" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-lg-600">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title perspectiveHeader">Add Prespective</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="objectiveForm" class="card custom-card border-0">
                                <div class="card-body">
                                    <input type="hidden" id="perspectiveIdValue" value="">
                                    <input type="hidden" id="formulationIdValue" value="">
                                    <input type="hidden" id="formulationTypeValue" value="">
                                    <input type="hidden" id="formulationIdValue" value="">
                                    <div class="grid gap-3">
                                        
                                        <div class="g-col-12">
                                            <label for="objective_name" class="form-label">Name</label>
                                            <input type="text" class="form-control" name="name" id="formulationNameValue"/>
                                        </div>
                                        <div class="g-col-12">
                                            <label for="objective_description" class="form-label" >Description</label>
                                            <textarea class="form-control modal-custom-textarea" placeholder=""
                                                rows="3" id="formulationDescription"></textarea>
                                        </div>

                                        <div class="g-col-12 g-col-md-6">
                                            <label for="objective_name" class="form-label">Weight (%)</label>
                                            <input type="text" class="form-control" name="name" id="formulationWeight"/>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="objective_name" class="form-label">Sub Weight (%)</label>
                                            <input type="text" class="form-control" name="name" id="formulationSubWeight"/>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="riskUniqueId" class="form-label">Start  Date</label>
                                            <input type="date" class="form-control" name="riskUnique_id"
                                                id="formulationStartDate" />
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="riskUniqueId" class="form-label">End  Date</label>
                                            <input type="date" class="form-control" name="riskUnique_id"
                                                id="formulationEndDate" />
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="kpi_start_end_date" class="form-label">Status</label>
                                            <select id="formulationStatus" name="" class="form-select modal-custom-select">
                                                <option>Choose</option>
                                                <option value="manual">Manual</option>
                                                <option value="weighted">Weighted</option>
                                                <option value="first">First</option>
                                                <option value="second">Second</option>
                                                <option value="third">Third</option>
                                                <option value="fourth">Fourth</option>
                                            </select>
                                        </div>
                                       


                                    </div>
                                </div>
                            </form>
                        </div>


                        <div class="modal-footer">
                            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal"
                                aria-label="Close">
                                Cancel
                            </button>
                            <button class="btn btn-primary initative_save_btn" value="Save" onclick="savePrespective()">Save</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                id="add-objective" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div
                    class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" class="objectiveheader" data-translate="Add Objective">Add Objective</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="objective_Form" class="card custom-card border-0">
                                <div class="card-body">
                                    <div class="grid gap-3">
        
                                        <div class="g-col-12">
                                            <label for="objective_name" class="form-label" data-translate="Name">Name</label>
                                            <input type="text" class="form-control"  name="name" id="objective_name" />
                                        </div>
                                        <input type="hidden" name="action">
				<input type="hidden" name="id">
				<input type="hidden" name="scorecardid" id="scorecardid">
                                        <!-- <div class="g-col-12">
                                            <label for="objective_description" class="form-label">Description</label>
                                            <textarea class="form-control modal-custom-textarea" placeholder=""
                                                rows="3"></textarea>
                                        </div> -->
        
        
        
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="objective_name" class="form-label" data-translate="Weight (%)">Weight (%)</label>
                                            <input type="text" class="form-control" id="objectiveweight" name="objectiveweight" />
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="objective_name" class="form-label" data-translate="Sub Weight (%)">Sub Weight (%)</label>
                                            <input type="text" class="form-control" id="objective_sub_weight" name="objective_sub_weight" />
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="riskUniqueId" class="form-label" data-translate="Start/End Date">Start / End Date</label>
                                            <input
                                            type="text" class="form-control browser-default date_pickers_bottom datepicker-here"
                                            data-range="true"	
                                            id="objective_start_end_date" name="objectiveStartDate" autocomplete="off" 
                                            data-multiple-dates-separator=" - "
                                            data-language="en"
                                            />
                                        </div>
        
        
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="kpi_start_end_date" class="form-label" data-translate="Status">Status</label>
                                            <select  id="objective_status" name="" class="form-select modal-custom-select">
                                                <option data-i18n="Choose">Choose</option>
                                                <option value="Manual" data-i18n="Manual">Manual</option>
                                                <option value="Weighted">Weighted</option>
                                            </select>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="" class="form-label" data-translate="Owner">Owner</label>
                                            <select class="form-control browser-default select2" name="owner" id="objective_owner" style="width: 100%">
                                        </select>

                                        </div>
        
                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal"
                                        aria-label="Close" data-translate="Cancel">
                                        Cancel
                                    </button>
                                    <!-- <button class="btn btn-primary initative_save_btn" value="Save">Save</button> -->
                                    <button class="btn btn-primary initative_save_btn pull-right objectivesave" value="Save" data-i18n="Save" data-translate="Save">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>


                        <!-- <div class="modal-footer">
                            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal"
                                aria-label="Close">
                                Cancel
                            </button>
                            <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
                        </div> -->
                    </div>
                </div>
            </div>

            <div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                id="edit-objective" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div
                    class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Edit Objective</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="card custom-card border-0">
                                <div class="card-body">
                                    <div class="grid gap-3">

                                        <div class="g-col-12">
                                            <label for="objective_name" class="form-label">Name</label>
                                            <input type="text" class="form-control" name="name" />
                                        </div>
                                        <div class="g-col-12">
                                            <label for="objective_description" class="form-label">Description</label>
                                            <textarea class="form-control modal-custom-textarea" placeholder=""
                                                rows="3"></textarea>
                                        </div>



                                        <div class="g-col-12 g-col-md-6">
                                            <label for="objective_name" class="form-label">Weight (%)</label>
                                            <input type="text" class="form-control" name="name" />
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="objective_name" class="form-label">Sub Weight (%)</label>
                                            <input type="text" class="form-control" name="name" />
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="riskUniqueId" class="form-label">Start / End Date</label>
                                            <input type="date" class="form-control" name="riskUnique_id"
                                                id="riskUniqueId" />
                                        </div>


                                        <div class="g-col-12 g-col-md-6">
                                            <label for="kpi_start_end_date" class="form-label">Status</label>
                                            <select id="" name="" class="form-select modal-custom-select">
                                                <option>Choose</option>
                                                <option value="manual">Manual</option>
                                                <option value="weighted">Weighted</option>
                                                <option value="first">First</option>
                                                <option value="second">Second</option>
                                                <option value="third">Third</option>
                                                <option value="fourth">Fourth</option>
                                            </select>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="" class="form-label">Owner</label>
                                            <div class="d-flex align-items-start">
                                                <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">

                                                    <li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip"
                                                        data-bs-placement="top" title="Kim Karlos">
                                                        <img src="images/user9.jpg" class="rounded-circle"
                                                            alt="Kim Karlos" width="24" height="24">
                                                    </li>

                                                    <li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip"
                                                        data-bs-placement="top" title="John Doe">
                                                        <img src="images/user9.jpg" class="rounded-circle"
                                                            alt="John Doe" width="24" height="24">
                                                    </li>


                                                    <li class="avatar avatar-xs pull-up" href="#attendess-list"
                                                        data-bs-toggle="modal">
                                                        <span class="avatar-initial rounded-circle"
                                                            data-bs-toggle="tooltip" data-bs-placement="top"
                                                            title="3 more">+3</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>


                        <div class="modal-footer">
                            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal"
                                aria-label="Close">
                                Cancel
                            </button>
                            <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
                        </div>
                    </div>
                </div>
            </div>



            <div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                id="add-kpi" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div
                    class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down  modal-lg modal-lg-600">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" data-translate="Add KPI">Add KPI</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="kpi_Form" class="card custom-card border-0">
                                <div class="card-body">
                                    <div class="grid gap-3">
                                        <div class="g-col-12">
                                            <label for="objective_name" class="form-label" data-translate="Name">Name</label>
                                            <input type="text" class="form-control" name="kpi_name" id="kpi_name" />
                                        </div>
                                        <input type="hidden" name="action">
                                        <input type="hidden" name="id">
                                        <input type="hidden" name="scorecardid" id="scorecardid">
                                        <input type="hidden" name="objectiveid" id="objectiveid">
                                        <!-- <div class="g-col-12">
                                            <label for="objective_description" class="form-label">Description</label>
                                            <textarea class="form-control modal-custom-textarea" placeholder=""
                                                rows="3"></textarea>
                                        </div> -->
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="Polarity" class="form-label" data-translate="Polarity">Polarity</label>
                                            <select id="kpi_type" name="" class="form-select modal-custom-select">
                                                
                                                <option value="" data-i18n="Choose">Choose</option>
                                                <option value="Lead" data-i18n="Lead">Lead</option>
                                                <option value="Lag" data-i18n="Lag">Lag</option>

                                            </select>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="Measurement Frequency" class="form-label" data-translate="Measurement Frequency">Measurement
                                                Frequency</label>
                                            <select id="kpi_measurement" name="kpi_measurement"
                                                class="form-select modal-custom-select">
                                                <option value="" data-i18n="Choose">Choose</option>
                                                <option value="Monthly" data-i18n="Monthly">Monthly</option>
                                                <option value="Quarterly" data-i18n="Quarterly">Quarterly</option>
                                                <option value="Half Yearly" data-i18n="Half Yearly">Half Yearly</option>
                                                <option value="Annually" data-i18n="Annually">Annually</option>
                                            </select>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="" class="form-label" data-translate="Owner">Owner</label>
                                            <select class="form-control browser-default" name="kpi_owner"
                                                id="kpi_owner" style="width: 100%;">
                                            </select>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="kpi_start_end_date" class="form-label" data-translate="Data Source">Data Source</label>
                                            <select id="kpi_datasource" name="" class="form-select modal-custom-select">
                                                <option value="" data-i18n="Choose">Choose</option>
                                                <option value="Manual" data-i18n="Manual">Manual</option>
                                                <option value="Source" data-i18n="Source">Source</option>
                                            </select>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="kpiDataType" class="form-label" data-translate="KPI Type">KPI Type</label>
                                            <select id="kpiDataType" name="" class="form-select modal-custom-select">
                                                <option value="" data-i18n="Choose">Choose</option>
                                                <option value="Number" data-i18n="Number">Number</option>
                                                <option value="Percentage" data-i18n="Percentage">Percentage</option>
                                                <option value="Currency" data-i18n="Currency">Currency</option>
                                            </select>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="kpi_threshold" class="form-label" data-translate="Threshold">Threshold</label>
                                            <select id="kpi_threshold" name="" class="form-select modal-custom-select">
                                                <option value="" data-i18n="Choose">Choose</option>
                                                <option value="0ption_2" data-i18n="Three Status">Three Status</option>
                                            </select>
                                        </div>
                                        <!-- <div class="g-col-12 g-col-md-6">
                                            <label for="kpi_start_end_date" class="form-label">Actual</label>
                                            <input
                                                type="text"
                                                class="form-control browser-default"
                                                id="kpi_formula"
                                                readonly
                                                data-toggle="modal"
                                                data-target=".kpi_formula_popup"
                                                role="button" onclick="handleFormulaEvent('KPI')"
                                            />
                                        </div> -->
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="kpi_start_end_date" class="form-label" data-translate="Target">Target</label>
                                            <input type="text" class="form-control" name="targetamount"
                                                id="targetamount" autocomplete="off" />
                                        </div>
                                        <!-- <div class="g-col-12 g-col-md-6">
                                            <label for="kpi_start_end_date" class="form-label">YTD</label>
                                            <select id="" name="" class="form-select modal-custom-select">
                                                <option>Choose</option>
                                                <option value="Option 1">Option 1</option>
                                                <option value="Option 2">Option 2</option>
                                            </select>
                                        </div> -->
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="objective_name" class="form-label" data-translate="Start/End Date">Start / End Date</label>
                                            <input
                                            type="text"
                                            class="form-control browser-default date_pickers_bottom datepicker-here"
                                            data-range="true"
                                            data-multiple-dates-separator=" - "
                                            data-language="en"
                                            id="kpi_start_end_date" name="kpi_start_end_date" autocomplete="off"
                                          />
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="objective_name" class="form-label" data-translate="Weight (%)">Weight (%)</label>
                                            <input type="text" class="form-control" name="kpi_weight" id="kpi_weight"
                                                autocomplete="off" />
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="objective_name" class="form-label" data-translate="Sub Weight (%)">Sub Weight (%)</label>
                                            <input type="text" class="form-control" name="kpi_sub_weight"
                                                id="kpi_sub_weight" autocomplete="off" />
                                        </div>

                                        <div class="g-col-12 g-col-md-6">
                                            <label for="Polarity" class="form-label" data-translate="Status">Status</label>
                                            <select id="kpi_status" name="kpi_status"
                                                class="form-select modal-custom-select">

                                                <option value="" data-i18n="Choose">Choose</option>
                                                <option value="Manual" data-i18n="Manual">Manual</option>
                                                <option value="Weighted">Weighted</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal"
                                        aria-label="Close" data-translate="Cancel">
                                        Cancel
                                    </button>
                                    <!-- <button class="btn btn-primary initative_save_btn" value="Save">Save</button> -->
                                    <button class="btn btn-primary initative_save_btn pull-right kpisavebtn" value="Save" data-i18n="Save" data-translate="Save">
                                        Save
                                      </button>
                                </div>
                            </form>
                        </div>
                       
                    </div>
                </div>
            </div>
            <div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                id="edit-kpi" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div
                    class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down  modal-lg modal-lg-600">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Edit KPI</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="objectiveForm" class="card custom-card border-0">
                                <div class="card-body">
                                    <div class="grid gap-3">
                                        <div class="g-col-12">
                                            <label for="objective_name" class="form-label">Name</label>
                                            <input type="text" class="form-control" name="name" />
                                        </div>
                                        <div class="g-col-12">
                                            <label for="objective_description" class="form-label">Description</label>
                                            <textarea class="form-control modal-custom-textarea" placeholder=""
                                                rows="3"></textarea>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="kpi_start_end_date" class="form-label">Polarity</label>
                                            <select id="" name="" class="form-select modal-custom-select">
                                                <option>Choose</option>
                                                <option value="Option 1">Option 1</option>
                                                <option value="Option 2">Option 2</option>
                                            </select>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="kpi_start_end_date" class="form-label">Measurement
                                                Frequency</label>
                                            <select id="" name="" class="form-select modal-custom-select">
                                                <option>Choose</option>
                                                <option value="Option 1">Option 1</option>
                                                <option value="Option 2">Option 2</option>
                                            </select>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="" class="form-label">Owner</label>
                                            <div class="d-flex align-items-start">
                                                <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">

                                                    <li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip"
                                                        data-bs-placement="top" title="Kim Karlos">
                                                        <img src="images/user9.jpg" class="rounded-circle"
                                                            alt="Kim Karlos" width="24" height="24">
                                                    </li>

                                                    <li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip"
                                                        data-bs-placement="top" title="John Doe">
                                                        <img src="images/user9.jpg" class="rounded-circle"
                                                            alt="John Doe" width="24" height="24">
                                                    </li>


                                                    <li class="avatar avatar-xs pull-up" href="#attendess-list"
                                                        data-bs-toggle="modal">
                                                        <span class="avatar-initial rounded-circle"
                                                            data-bs-toggle="tooltip" data-bs-placement="top"
                                                            title="3 more">+3</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="kpi_start_end_date" class="form-label">Data Source</label>
                                            <select id="" name="" class="form-select modal-custom-select">
                                                <option>Choose</option>
                                                <option value="Option 1">Option 1</option>
                                                <option value="Option 2">Option 2</option>
                                            </select>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="kpi_start_end_date" class="form-label">KPI Type</label>
                                            <select id="" name="" class="form-select modal-custom-select">
                                                <option>Choose</option>
                                                <option value="Option 1">Option 1</option>
                                                <option value="Option 2">Option 2</option>
                                            </select>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="kpi_start_end_date" class="form-label">Threshold</label>
                                            <select id="" name="" class="form-select modal-custom-select">
                                                <option>Choose</option>
                                                <option value="Option 1">Option 1</option>
                                                <option value="Option 2">Option 2</option>
                                            </select>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="kpi_start_end_date" class="form-label">Actual</label>
                                            <select id="" name="" class="form-select modal-custom-select">
                                                <option>Choose</option>
                                                <option value="Option 1">Option 1</option>
                                                <option value="Option 2">Option 2</option>
                                            </select>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="kpi_start_end_date" class="form-label">Target</label>
                                            <select id="" name="" class="form-select modal-custom-select">
                                                <option>Choose</option>
                                                <option value="Option 1">Option 1</option>
                                                <option value="Option 2">Option 2</option>
                                            </select>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="kpi_start_end_date" class="form-label">YTD</label>
                                            <select id="" name="" class="form-select modal-custom-select">
                                                <option>Choose</option>
                                                <option value="Option 1">Option 1</option>
                                                <option value="Option 2">Option 2</option>
                                            </select>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="objective_name" class="form-label">Start / End Date</label>
                                            <input type="date" class="form-control" name="name" />
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="objective_name" class="form-label">Weight (%)</label>
                                            <input type="date" class="form-control" name="name" />
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="objective_name" class="form-label">Sub Weight (%)</label>
                                            <input type="date" class="form-control" name="name" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal"
                                aria-label="Close">
                                Cancel
                            </button>
                            <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                id="add-sub-kpi" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div
                    class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" class="subkpiheader" data-translate="Add Sub-KPI">Add Sub-KPI</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                             <form id="subKpi_Form" class="card custom-card border-0">
                                <div class="card-body">
                                    <div class="grid gap-3">
                                        <div class="g-col-12">
                                            <label for="objective_name" class="form-label" data-translate="Name">Name</label>
                                            <input type="text" class="form-control" name="subkpi_name" id="subkpi_name" />
                                        </div>
                                        <input type="hidden" name="action">
                                        <input type="hidden" name="id">
                                        <input type="hidden" name="scorecardid" id="scorecardid">
                                        <input type="hidden" name="objectiveid" id="objectiveid">
                                        <!-- <div class="g-col-12">
                                            <label for="objective_description" class="form-label">Description</label>
                                            <textarea class="form-control modal-custom-textarea" placeholder=""
                                                rows="3"></textarea>
                                        </div> -->
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="Polarity" class="form-label" data-translate="Polarity">Polarity</label>
                                            <select id="kpi_type" name="" class="form-select modal-custom-select">
                                                
                                                <option value="" data-i18n="Choose">Choose</option>
                                                <option value="Lead" data-i18n="Lead">Lead</option>
                                                <option value="Lag" data-i18n="Lag">Lag</option>

                                            </select>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="Measurement Frequency" class="form-label" data-translate="Measurement Frequency">Measurement
                                                Frequency</label>
                                            <select id="subkpi_measurement" name="subkpi_measurement"
                                                class="form-select modal-custom-select">
                                                <option value="" data-i18n="Choose">Choose</option>
                                                <option value="Monthly" data-i18n="Monthly">Monthly</option>
                                                <option value="Quarterly" data-i18n="Quarterly">Quarterly</option>
                                                <option value="Half Yearly" data-i18n="Half Yearly">Half Yearly</option>
                                                <option value="Annually" data-i18n="Annually">Annually</option>
                                            </select>
                                        </div>
                                       <div class="g-col-12 g-col-md-6">
                                            <label for="" class="form-label" data-translate="Owner">Owner</label>
                                            <select class="form-control browser-default" name="subKpi_owner"
                                                id="subKpi_owner">
                                            </select>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="kpi_start_end_date" class="form-label" data-translate="Data Source">Data Source</label>
                                            <select id="subkpi_datasource" name="" class="form-select modal-custom-select">
                                                <option value="" data-i18n="Choose">Choose</option>
                                                <option value="Manual" data-i18n="Manual">Manual</option>
                                                <option value="Source" data-i18n="Source">Source</option>
                                            </select>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="kpiDataType" class="form-label" data-translate="KPI Type">KPI Type</label>
                                            <select id="subkpiDataType" name="" class="form-select modal-custom-select">
                                                <option value="" data-i18n="Choose">Choose</option>
                                                <option value="Number" data-i18n="Number">Number</option>
                                                <option value="Percentage" data-i18n="Percentage">Percentage</option>
                                                <option value="Currency" data-i18n="Currency">Currency</option>
                                            </select>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="kpi_threshold" class="form-label" data-translate="Threshold">Threshold</label>
                                            <select id="subkpi_threshold" name="" class="form-select modal-custom-select">
                                                <option value="" data-i18n="Choose">Choose</option>
                                                <option value="0ption_2" data-i18n="Three Status">Three Status</option>
                                            </select>
                                        </div>
                                        <!-- <div class="g-col-12 g-col-md-6">
                                            <label for="kpi_start_end_date" class="form-label">Actual</label>
                                            <input
                                                type="text"
                                                class="form-control browser-default"
                                                id="kpi_formula"
                                                readonly
                                                data-toggle="modal"
                                                data-target=".kpi_formula_popup"
                                                role="button" onclick="handleFormulaEvent('KPI')"
                                            />
                                        </div> -->
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="kpi_start_end_date" class="form-label" data-translate="Target">Target</label>
                                            <input type="text" class="form-control" name="targetamount"
                                                id="subtargetamount" autocomplete="off" />
                                        </div>
                                        <!-- <div class="g-col-12 g-col-md-6">
                                            <label for="kpi_start_end_date" class="form-label">YTD</label>
                                            <select id="" name="" class="form-select modal-custom-select">
                                                <option>Choose</option>
                                                <option value="Option 1">Option 1</option>
                                                <option value="Option 2">Option 2</option>
                                            </select>
                                        </div> -->
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="objective_name" class="form-label" data-translate="Start/End Date">Start / End Date</label>
                                            <input
                                            type="text"
                                            class="form-control browser-default date_pickers_bottom datepicker-here"
                                            data-range="true"
                                            data-multiple-dates-separator=" - "
                                            data-language="en"
                                            id="subkpi_start_end_date" name="subkpi_start_end_date" autocomplete="off"
                                          />
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="objective_name" class="form-label" data-translate="Weight (%)">Weight (%)</label>
                                            <input type="text" class="form-control" name="subkpi_weight" id="subkpi_weight"
                                                autocomplete="off" />
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="objective_name" class="form-label" data-translate="Sub Weight (%)">Sub Weight (%)</label>
                                            <input type="text" class="form-control" name="subkpi_sub_weight"
                                                id="subkpi_sub_weight" autocomplete="off" />
                                        </div>

                                        <div class="g-col-12 g-col-md-6">
                                            <label for="Polarity" class="form-label" data-translate="Status">Status</label>
                                            <select id="subkpi_status" name="subkpi_status"
                                                class="form-select modal-custom-select">

                                                <option value="" data-i18n="Choose">Choose</option>
                                                <option value="Manual" data-i18n="Manual">Manual</option>
                                                <option value="Weighted">Weighted</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                            </form>
                        </div>


                        <div class="modal-footer">
                            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal"
                                aria-label="Close" data-translate="Cancel">
                                Cancel
                            </button>
                            <button class="btn btn-primary initative_save_btn" value="Save" onclick="saveSubKpi()" data-translate="Save">Save Sub Kpi</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                id="edit-sub-kpi" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div
                    class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Edit Sub-KPI</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="card custom-card border-0">
                                <div class="card-body">
                                    <div class="grid gap-3">

                                        <div class="g-col-12">
                                            <label for="objective_name" class="form-label">Name</label>
                                            <input type="text" class="form-control" name="name" />
                                        </div>
                                        <div class="g-col-12">
                                            <label for="objective_description" class="form-label">Description</label>
                                            <textarea class="form-control modal-custom-textarea" placeholder=""
                                                rows="3"></textarea>
                                        </div>



                                        <div class="g-col-12 g-col-md-6">
                                            <label for="objective_name" class="form-label">Weight (%)</label>
                                            <input type="text" class="form-control" name="name" />
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="objective_name" class="form-label">Sub Weight (%)</label>
                                            <input type="text" class="form-control" name="name" />
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="riskUniqueId" class="form-label">Start / End Date</label>
                                            <input type="date" class="form-control" name="riskUnique_id"
                                                id="riskUniqueId" />
                                        </div>


                                        <div class="g-col-12 g-col-md-6">
                                            <label for="kpi_start_end_date" class="form-label">Status</label>
                                            <select id="" name="" class="form-select modal-custom-select">
                                                <option>Choose</option>
                                                <option value="manual">Manual</option>
                                                <option value="weighted">Weighted</option>
                                                <option value="first">First</option>
                                                <option value="second">Second</option>
                                                <option value="third">Third</option>
                                                <option value="fourth">Fourth</option>
                                            </select>
                                        </div>
                                        <div class="g-col-12 g-col-md-6">
                                            <label for="" class="form-label">Owner</label>
                                            <div class="d-flex align-items-start">
                                                <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">

                                                    <li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip"
                                                        data-bs-placement="top" title="Kim Karlos">
                                                        <img src="images/user9.jpg" class="rounded-circle"
                                                            alt="Kim Karlos" width="24" height="24">
                                                    </li>

                                                    <li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip"
                                                        data-bs-placement="top" title="John Doe">
                                                        <img src="images/user9.jpg" class="rounded-circle"
                                                            alt="John Doe" width="24" height="24">
                                                    </li>


                                                    <li class="avatar avatar-xs pull-up" href="#attendess-list"
                                                        data-bs-toggle="modal">
                                                        <span class="avatar-initial rounded-circle"
                                                            data-bs-toggle="tooltip" data-bs-placement="top"
                                                            title="3 more">+3</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>


                        <div class="modal-footer">
                            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal"
                                aria-label="Close">
                                Cancel
                            </button>
                            <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
                        </div>
                    </div>
                </div>
            </div>



            <div class="modal custom-modal fade" id="attendess-list" data-bs-backdrop="static" data-bs-keyboard="false"
                tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Edit Users</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body d-grid gap-3">
                            <div class="attendees-search">
                                <div>
                                    <div class="form-check cusom-check">
                                        <input class="form-check-input" type="checkbox" value="" id="allusers">
                                        <label class="form-check-label" for="allusers">
                                            All Users
                                        </label>
                                    </div>
                                </div>
                                <div class="search">
                                    <div class="input-group input-group-sm">
                                        <input type="text" class="form-control" placeholder="Recipient's username"
                                            aria-label="Recipient's username" aria-describedby="button-addon2">
                                        <button class="btn btn-outline-secondary" type="button" id="button-addon2">
                                            <i class="fas fa-search" data-toggle="tooltip" data-placement="bottom"
                                                title="" data-original-title="Files"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="list-group add-attendees">
                                <div class="list-group-item attendee">
                                    <div class="form-check cusom-check form-check-reverse">
                                        <input class="form-check-input" type="checkbox" name="attendees"
                                            id="attendees1">
                                        <label class="form-check-label" for="attendees1">
                                            <span class="image">
                                                <img src="images/speaker-1.svg" alt="Chris" width="18" height="18">
                                            </span>
                                            <span class="name">Chris</span>

                                        </label>
                                    </div>
                                </div>
                                <div class="list-group-item attendee">
                                    <div class="form-check cusom-check form-check-reverse">
                                        <input class="form-check-input" type="checkbox" name="attendees"
                                            id="attendees2">
                                        <label class="form-check-label" for="attendees2">
                                            <span class="image">
                                                <img src="images/speaker.svg" alt="Kevin" width="18" height="18">
                                            </span>
                                            <span class="name">Kevin</span>

                                        </label>
                                    </div>
                                </div>
                                <div class="list-group-item attendee">
                                    <div class="form-check cusom-check form-check-reverse">
                                        <input class="form-check-input" type="checkbox" name="attendees"
                                            id="attendees3">
                                        <label class="form-check-label" for="attendees3">

                                            <span class="image">
                                                <img src="images/speaker.svg" alt="" width="18" height="18">
                                            </span>
                                            <span class="name">Richard</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="list-group-item attendee">
                                    <div class="form-check cusom-check form-check-reverse">
                                        <input class="form-check-input" type="checkbox" name="attendees"
                                            id="attendees4">
                                        <label class="form-check-label" for="attendees4">

                                            <span class="image">
                                                <img src="images/speaker.svg" alt="" width="18" height="18">
                                            </span>
                                            <span class="name">Stark</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="list-group-item attendee">
                                    <div class="form-check cusom-check form-check-reverse">
                                        <input class="form-check-input" type="checkbox" name="attendees"
                                            id="attendees5">
                                        <label class="form-check-label" for="attendees5">

                                            <span class="image">
                                                <img src="images/speaker.svg" alt="" width="18" height="18">
                                            </span>
                                            <span class="name">Warner</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="list-group-item attendee">
                                    <div class="form-check cusom-check form-check-reverse">
                                        <input class="form-check-input" type="checkbox" name="attendees"
                                            id="attendees6">
                                        <label class="form-check-label" for="attendees6">
                                            <span class="image">
                                                <img src="images/speaker.svg" alt="" width="18" height="18">
                                            </span>
                                            <span class="name">Williamson</span>

                                        </label>
                                    </div>
                                </div>
                                <div class="list-group-item attendee">
                                    <div class="form-check cusom-check form-check-reverse">
                                        <input class="form-check-input" type="checkbox" name="attendees"
                                            id="attendees7">
                                        <label class="form-check-label" for="attendees7">
                                            <span class="image">
                                                <img src="images/speaker.svg" alt="" width="18" height="18">
                                            </span>
                                            <span class="name">Zara</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- #END# Risk Desc PopUp -->



            <!-- import-modal Start -->
            <div class="modal custom-modal fade" id="file-validate-form" data-bs-backdrop="static"
                data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
                aria-hidden="true">
                <div
                    class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">File Upload</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="card-header-progress">
                                <ul class="form-progressbar w-100">
                                    <li>Upload</li>
                                    <li>Validation</li>
                                    <li>Import</li>
                                </ul>
                            </div>


                            <div id="file-upload" class="card custom-card">
                                <div class="card-body grid gap-3">

                                    <!-- <div class="g-col-12">
         <div class="form-group">
           <label for="importCategory" class="form-label">Import Category</label>
           <select class="form-select select-dropdown-file-upload w-100" name="importCategory"
             id="importCategory" data-placeholder="Select Import Category">
             <option value="" disabled selected hidden>
               Select Import Category
             </option>
             <option value="Organisation Import">Organisation</option>
             <option value="ETLUpload">Data Upload</option>
             <option value="XLSUpload">Excel File Upload</option>
             <option value="Scorecard Import">Scorecard</option>
             <option value="InitiativeDataLoad">Initiatives Data Load</option>
             <option value="InitiativeBudgetLoad">Initiatives Budget Load</option>
             <option value="Initiative Import">Initiatives & Projects</option>
             <option value="Risk Import">Risk</option>
           </select>
         </div>
       </div> -->
                                    <div class="g-col-12">
                                        <div class="form-group">
                                            <label for="" class="form-label">Upload File</label>
                                            <label for="login" class="upload-label upload-box">
                                                <div class="upload">Choose a file or drag it here.</div>
                                                <input type="file" id="login">
                                            </label>
                                        </div>


                                    </div>
                                </div>
                                <div class="card-footer">
                                    <div class="d-flex justify-content-between form-line">
                                        <button class="btn btn-primary initative_save_btn ms-auto" id="next-btn-1">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="card custom-card" id="file-validate" style="display: none">
                                <div class="card-body grid gap-3">
                                    <div class="g-col-12 img-center">
                                        <!-- <img
     src="images/verified.png"
     alt="Verified"
   /> -->
                                        <img src="images/not-verified.png" alt="Not-Verified" />
                                        <div class="error-div">
                                            <table class="error-table">
                                                <thead>
                                                    <tr>
                                                        <th style="width: 150px">Row</th>
                                                        <th>Error</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td style="width: 150px">1</td>
                                                        <td>Contain Special Character</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 150px">3</td>
                                                        <td>Contain Special Character</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 150px">5</td>
                                                        <td>Contain Special Character</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 150px">8</td>
                                                        <td>Contain Special Character</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 150px">10</td>
                                                        <td>Contain Special Character</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 150px">19</td>
                                                        <td>Contain Special Character</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>


                                </div>
                                <div class="card-footer">
                                    <div class="d-flex justify-content-between form-line">
                                        <button type="button" class="btn btn-label-secondary btn-default1"
                                            id="prev-btn1">
                                            Previous
                                        </button>
                                        <button class="btn btn-primary initative_save_btn" id="next-btn-2">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="card custom-card" id="file-save" style="display: none">
                                <div class="card-body grid gap-3">
                                    <div class="g-col-12">
                                        <div class="text-center">
                                            <img src="images/success.png" alt="Verified" width="140" />
                                        </div>
                                    </div>
                                </div>

                                <div class="card-footer">
                                    <div class="d-flex justify-content-between form-line">
                                        <button type="button" class="btn btn-label-secondary" id="prev-btn2">
                                            Previous
                                        </button>
                                        <button class="btn btn-primary initative_save_btn" id="done-btn"
                                            data-dismiss="modal" aria-label="Close">
                                            Done
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <link href="assets/css/pickr.min.css" rel="stylesheet">
            <link href="assets/css/daterangepicker.min.css" rel="stylesheet">
            <link href="assets/css/jquery-ui.min.css" rel="stylesheet">
            <link href="assets/css/select2.min.css" rel="stylesheet" />

            <!-- Plugins Js -->
            <script src="${contextroot}/js/app.min.js"></script>
            <script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
            <script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
            <!-- Custom Js -->
            <script src="${contextroot}/js/admin.js"></script>
            <!-- Knob Js -->
            <script type="text/javascript" src="${contextroot}/js/knockout-3.5.0.js"></script>
            <script type="text/javascript" src="${contextroot}/js/daterangepicker.min.js"></script>

            <!-- Knob Js -->
            <script src="${contextroot}/js/jquery-ui.min.js"></script>
            <script src="${contextroot}/js/moment.js"></script>
            <script src="${contextroot}/js/jquery.editable.min.js"></script>
            <script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
            <script src="${contextroot}/js/datepickerair.js"></script>
            <script src="${contextroot}/js/datepicker.en.js"></script>
            <script src="${contextroot}/js/select2.min.js"></script>
            <script src="${contextroot}/js/handlebars.js"></script>
            <script src="${contextroot}/js/widgets.js"></script>
            <script src="${contextroot}/js/strategyformulanew.js"></script>
            <script src="${contextroot}/js/initial.js"></script>
            <script src="${contextroot}/js/notify.js"></script>
            <script>
                $('#user_edit_popup').modal({
                    show : false,
                    backdrop : 'static',
                    keyboard : false
                });
                $('.modal-dialog').draggable({
                    handle: ".modal-header"
                });

                $('[data-toggle="tooltip"]').attr("data-placement", "bottom");
                $('[data-toggle="tooltip"]').tooltip({
                    delay: { "show": 0, "hide": 0 }
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

                $('#perspective_owner,#objective_owner,#kpi_owner').select2({
                    selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
                    dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
                });



            </script>

            
        </body>