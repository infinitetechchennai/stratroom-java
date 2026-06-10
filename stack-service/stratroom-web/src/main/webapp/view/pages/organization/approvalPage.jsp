<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
	<c:set var="contextroot" value="${pageContext.request.contextPath}" />
	<!DOCTYPE html>
	<html lang="en">

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge">
		<meta content="width=device-width, initial-scale=1" name="viewport" />
		<title>StratRoom</title>
		<link href="assets/css/file-upload.css" rel="stylesheet">
		<link href="assets/css/orgchartnewbasic.css" rel="stylesheet">





	</head>

	<style>
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
			background-image: url(images/carat-i.svg);
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

		.org-tree-container .drag-point {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: .5rem;
			cursor: move;
			background: rgba(var(--stratroom-black-rgb), 0.01);
			color: rgba(var(--stratroom-black-rgb), 0.5);
			border-bottom-left-radius: 10px;
			border-top-right-radius: 10px;
		}

		.org-section .org-content .org-label {
			font-size: clamp(12px, 5vw, 13px);
			margin-bottom: 0;
			line-height: 1.2;
		}

		.org-section .org-content .content {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
			gap: .2rem;
			flex: 1;
			align-items: center;
		}
	</style>
	<script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>

	<body class="light" data-page="org-structure-new">
		<!-- <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}"> -->


		<div style="display: none;">
			<jsp:include page="../common/right-navigation.jsp"></jsp:include>
		</div>

		<jsp:include page="../common/top-navigation.jsp"></jsp:include>
		<header id="header" class="header shadow-sm">

			<jsp:include page="../common/left-navigation.jsp"></jsp:include>
		</header>
		 <jsp:include page="modal/riskActivitiesModal.jsp"></jsp:include>
      <jsp:include page="modal/riskActionModal.jsp"></jsp:include>
      <jsp:include page="modal/riskTreatmentModal.jsp"></jsp:include>
      <jsp:include page="modal/riskPlanModal.jsp"></jsp:include>
      <jsp:include page="modal/riskMonitoringModal.jsp"></jsp:include>
      <jsp:include page="modal/riskDetailModal.jsp"></jsp:include>
      <jsp:include page="modal/CauseAndConsequenceModal.jsp"></jsp:include>
      <jsp:include page="modal/CauseAndConseqSubModal.jsp"></jsp:include>
      <jsp:include page="modal/riskeventmodal.jsp"></jsp:include>
		<main class="pt-2 pb-2">

        <div class="container-lg">
            <div class="page-header grid gap-2 pb-1">
                <div class="g-col-8 d-flex align-items-center">
                    <h4 class="title">
                        <span class="icon">
                             <i data-lucide="clipboard-list" style="width: 18px; height: 18px;"></i>
                        </span>
                         Approval Page
                    </h4>


                </div>
                <div class="load-page page-actions g-col-4">
                    <div class="page-icons">
                        <ul>
                           

                            <li>
                                
                                <a href="#" id="popoverFilterStatus">
                                <span type="button" class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Filter">
                                   <i data-lucide="funnel" style="width: 16px; height: 16px;"></i>
                                  </span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Export">
                                   <i data-lucide="file-up" style="width: 16px; height: 16px;"></i>
                                   </span>
                                </a>
                            </li>

                            

                             

                        </ul>
                    </div>
                </div>
            </div>


        </div>
        

        <div class="container-lg py-2">
            <div id="task-content"></div>


        </div>
    </main>
  <div class="modal fade" id="riskDetailsModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-fullscreen">
              <div class="modal-content">
                <div class="modal-header d-flex justify-content-between align-items-center"s>
                  <h5 class="modal-title" id="riskDetailsModalLabel">Risk Details</h5>
                 <div class="d-flex gap-1">
                            <div class="page-icons ms-auto">
                                <ul>

                                    <!-- <li>
                                        <button onclick="editBudgetDetails()"
                                            style="cursor: pointer; background-color: white;">
                                            <span class="icon" data-bs-toggle="tooltip" 
                                                data-bs-title="Add">
                                                <i data-lucide="pencil" style="width: 14px; height: 14px;"></i>
                                            </span>
                                        
                                        </button> -->

										<li>
    <a href="#" onclick="editRiskDetails()">
        <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
            <i data-lucide="pencil" style="width: 14px; height: 14px; cursor:pointer;"></i>
        </span>
    </a>
</li>


                                </ul>
                            </div>
                            <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                </div>
                <div class="modal-body">
                  <!-- Section 1: Risk Information -->
                  <h5>Risk Information</h5>
                  <div class="table-responsive" id="riskDetails_table"></div>
                  <br>

                  <!-- Section 2: Cause and Consequence -->
                  <h5>Cause and Consequence</h5>
                  <div class="table-responsive" id="causeConseq_table"></div>
                  <br>

                  <!-- Section 3: Controls and Activities -->
                  <h5>Controls and Activities</h5>
                  <div class="table-responsive" id="controlDetails_table"></div>
                  <br>

                  <!-- Section 4: Risk Treatment -->
                  <h5>Risk Treatment</h5>
                  <div class="table-responsive" id="riskTreatment_table"></div>
                  <br>

                  <!-- Section 5: Risk Monitoring -->
                  <h5>Risk Monitoring</h5>
                  <div class="table-responsive" id="riskMonitoring_table"></div>
                  <br>
                  
                  <input type="hidden" id="changeid_risk">
                </div>
              </div>
            </div>
          </div>

          <!-- risk event -->
          <div class="modal fade" id="riskEventDetailsModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-fullscreen">
              <div class="modal-content">
                <div class="modal-header d-flex justify-content-between align-items-center">
                  <h5 class="modal-title" id="riskDetailsModalLabel">RiskEvent Details</h5>
                <div class="d-flex gap-1">
                            <div class="page-icons ms-auto">
                                <ul>

                                    <!-- <li>
                                        <button onclick="editBudgetDetails()"
                                            style="cursor: pointer; background-color: white;">
                                            <span class="icon" data-bs-toggle="tooltip" 
                                                data-bs-title="Add">
                                                <i data-lucide="pencil" style="width: 14px; height: 14px;"></i>
                                            </span>
                                        
                                        </button> -->

										<li>
    <a href="#" onclick="editRiskEventDetails()">
        <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
            <i data-lucide="pencil" style="width: 14px; height: 14px; cursor:pointer;"></i>
        </span>
    </a>
</li>


                                </ul>
                            </div>
                            <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                </div>
                <div class="modal-body">

                  <!-- <h5>RiskEvent </h5> -->
                  <div class="table-responsive" id="riskEventDetails_table"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- pos -->
          <div class="modal fade" id="processEnablerDetailsModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-fullscreen">
              <div class="modal-content">
                <div class="modal-header d-flex justify-content-between align-items-center">
                  <h5 class="modal-title" id="processEnablerDetailsModalLabel">ProcessEnabler Details</h5>
                  <div class="d-flex gap-1">
                            <div class="page-icons ms-auto">
                                <ul>
										<li>
    <a href="#" onclick="editPosDetails()">
        <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
            <i data-lucide="pencil" style="width: 14px; height: 14px; cursor:pointer;"></i>
        </span>
    </a>
</li>


                                </ul>
                            </div>
                            <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                </div>
                <div class="modal-body">

                  <!-- <h5>RiskEvent </h5> -->
                  <div class="table-responsive" id="posDetails_table"></div>

                
                </div>
              </div>
            </div>
          </div>

          <!-- rpo -->
          <div class="modal fade" id="rpoDetailsModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-fullscreen">
              <div class="modal-content">
                <div class="modal-header d-flex justify-content-between align-items-center">
                  <h5 class="modal-title" id="rpoDetailsModalLabel">RPO Details</h5>
                  <div class="d-flex gap-1">
                            <div class="page-icons ms-auto">
                                <ul>
										<li>
    <a href="#" onclick="editRpoDetails()">
        <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
            <i data-lucide="pencil" style="width: 14px; height: 14px; cursor:pointer;"></i>
        </span>
    </a>
</li>


                                </ul>
                            </div>
                            <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                </div>
                <div class="modal-body">

                  <!-- <h5>RiskEvent </h5> -->
                  <div class="table-responsive" id="rpoDetails_table"></div>


                </div>
              </div>
            </div>
          </div>
         <!-- budgetEventDetailsModal start-->
        <div class="modal fade" id="budgetEventDetailsModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header d-flex justify-content-between align-items-center">
                        <h5 class="modal-title">Budget  Details</h5>
                        <div class="d-flex gap-1">
                            <div class="page-icons ms-auto">
                                <ul>

                                    <!-- <li>
                                        <button onclick="editBudgetDetails()"
                                            style="cursor: pointer; background-color: white;">
                                            <span class="icon" data-bs-toggle="tooltip" 
                                                data-bs-title="Add">
                                                <i data-lucide="pencil" style="width: 14px; height: 14px;"></i>
                                            </span>
                                        
                                        </button> -->

										<li>
    <a href="#" onclick="editBudgetDetails()">
        <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
            <i data-lucide="pencil" style="width: 14px; height: 14px; cursor:pointer;"></i>
        </span>
    </a>
</li>


                                </ul>
                            </div>
                            <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                    </div>
                    <div class="modal-body">
                        <table class="table table-bordered w-100 text-center text-nowrap" id="table-budget-event">
                            <thead>
                              
                                <tr>
                                    <th>SI.No</th>
                                    <th>Year</th>
                                    <th>Month</th>
                                    <th>Version</th>
                                    <th>GL Account</th>
                                    <th>GL Name</th>
                                    <th>Budget Type</th>
                                    <th>Project / Initiative</th>
                                    <th>Outcome</th>
                                    <th>Objective</th>
                                    <th>Sub Initiative</th>
                                    <th>Activity</th>
                                    <th>Sub Activity</th>
                                    <th>Currency</th>
                                    <th>Number of Days/Quantity	</th>
                                    <th>Unit Amount</th>
                                    <th>Total Budget</th>
                                    <th>Department</th>
                                    <th>Employee</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- budgetEventDetailsModal end-->

          <!-- Status Update Modal start-->
    <div class="modal custom-modal fade" id="statusUpdateModal" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="statusUpdateModalLabel" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="statusUpdateModalLabel">Update Status</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card custom-card border-0">
                        <div class="card-body">
                            <form id="statusUpdateForm">
                                <div class="mb-3">
                                    <label for="statusComments" class="form-label">Comments</label>
                                    <textarea class="form-control" id="statusComments" rows="3"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="statusSelect" class="form-label">Status</label>
                                    <select class="form-select selectdrop-update-status" id="statusSelect">
                                        <!-- <option value="Pending">Pending</option> -->
                                        <option value="APPROVED">Approved</option>
                                        <option value="REJECTED">Rejected</option>
                                    </select>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="saveStatusBtn" onclick="handleBudgetStatusChange()">Save</button>
                </div>
            </div>
        </div>
    </div>

	    <!--#approval-history start -->
    <div id="approval-history-modal" class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myLargeModalLabel_1">Approval History</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card custom-card border-0">
                        <div class="card-body">
                            <table class="table table-bordered w-100" id="table-approval-history">
                                <thead>
                                    <tr>

                                        <th>Approver</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Comments</th>

                                    </tr>
                                </thead>
                                <tbody>
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!--#approval-history end -->

	 <!-- History Modal -->
          <div class="modal fade view_history" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" style="max-width: 650px !important;">
              <div class="modal-content" style="height: 290px;">
                <div class="modal-header">
                  <h4>Approval History</h4>
                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <table class="custom-table">
                      <thead>
                        <tr>
                          <th
                            style="border: 1px solid #dddddd; text-align: center;background-color: rgba(var(--stratroom-primary-rgb), 0.4);color: #000;">
                            Approver</th>
                          <th
                             style="border: 1px solid #dddddd; text-align: center;background-color: rgba(var(--stratroom-primary-rgb), 0.4);color: #000;">
                            Date</th>
                          <th
                             style="border: 1px solid #dddddd; text-align: center;background-color: rgba(var(--stratroom-primary-rgb), 0.4);color: #000;" data-i18n="Status">
                            Status</th>
                          <th
                             style="border: 1px solid #dddddd; text-align: center;background-color: rgba(var(--stratroom-primary-rgb), 0.4);color: #000;" data-i18n="Comments">
                            Comments</th>
                        </tr>
                      </thead>
                      <tbody id="historyTableBody">
                        <!-- Dynamic history rows will be injected here -->
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
		    <div class="modal fade pos_description_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
            aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-dialog-centered modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h4>Business Impact Analysis</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form id="approvalobjectiveposForm">

                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="objective_name">Product/Services</label>
                        <select class="form-control approvalproductService" id="approvalsaveproductService"
                          style="width: 50%;">
                          <option>Select</option>
                        </select>
                      </div>

                      <div class="form-group col-md-6" style="float: right;">
                        <label for="objective_name">Process (POS)</label>
                        <select class="form-control posapprovalprocessService int-status-multi-select"
                          id="approvalsaveprocessService" name="states[]" multiple="multiple"
                          style="border: 1px solid #dddddd;">
                        </select>
                      </div>

                      <div class="form-group col-md-6">
                        <label for="objective_name">Sub Process (Activities in POS)</label> <br>
                        <select class="form-control approvalsubprocessService int-status-multi-select" name="states[]"
                          multiple="multiple" id="approvalsavesubprocessService" style="border: 1px solid #dddddd;">
                        </select>
                      </div>

                      <div class="form-group col-md-6" style="float: right;">
                        <label for="objective_name">Classification</label>
                        <select class="form-control approvalclassificationService selectFieldEmpty">
                          <option>Select</option>
                          <option value="After Trading Hour">After Trading Hour</option>
                          <option value="Before Trading Hour">Before Trading Hour</option>
                          <option value="Trading Time">Trading Time</option>
                        </select>
                      </div>

                      <div class="form-group col-md-3">
                        <label for="kpi_start_end_date">Working Time Start</label>
                        <input type="time" class="form-control browser-default tim_pickers approvaltimestartselect"
                          id="kpi_start_end_date" name="kpi_start_end_date" />
                      </div>

                      <div class="form-group col-md-3">
                        <label for="kpi_start_end_date"> Working Time End</label>
                        <input type="time" class="form-control browser-default tim_pickers approvaltimeendselect" />
                      </div>

                      <div class="form-group col-md-6" style="float: right;">
                        <label for="objective_name">Amount Service</label>
                        <input type="text" class="approvalamountService" style="border: 1px solid #dddddd;">
                      </div>

                      <div class="form-group col-md-6">
                        <label for="objective_name">Frequency</label>
                        <select class="form-control approvalfrequencyService" id="department-33">
                          <option value="">Select</option>
                          <option value="Harian">Harian</option>
                          <option value="Mingguan">Mingguan</option>
                          <option value="Bulanan">Bulanan</option>
                          <option value="Insidentil">Insidentil</option>
                          <option value="Kuartalan">Kuartalan</option>

                        </select>
                      </div>

                      <div class="form-group col-md-6" style="float: right;">
                        <label for="objective_name">Technology</label> <br>
                        <select class="form-control approvaltechnologyService int-status-multi-select" name="states[]"
                          multiple="multiple" id="approvalsavetechnologyService">
                        </select>
                      </div>

                      <div class="form-group col-md-6">
                        <label for="objective_name">Input (Vital Record)</label> <br>
                        <select class="form-control approvalinputsService int-status-multi-select"
                          id="approvalsaveinputsService" name="states[]" multiple="multiple">
                        </select>
                      </div>

                      <!-- Changes for MultiSelect Dropdown -->
                      <div class="form-group col-md-6" style="float: right;">
                        <label for="meeting-name">People-Internal</label>
                        <div style="width: 100%;height: 45px;">
                          <select id="approvalsavepeopleInternalService"
                            class="int-status-multi-select approvalpeopleInternalService" name="states[]"
                            multiple="multiple">
                            <input type="hidden" class="peopleInternalselect">
                          </select>
                        </div>
                      </div>

                      <!-- Changes for MultiSelect Dropdown -->
                      <div class="form-group col-md-6">
                        <label for="meeting-name">People-External</label>
                        <div style="width: 100%;height: 45px;">
                          <select class="int-status-multi-select approvalpeopleExternalService"
                            id="approvalsavepeopleExternalService" name="states[]" multiple="multiple">
                          </select>
                          <input type="hidden" class="peopleExternalselect">
                        </div>
                      </div>

                      <div class="form-group col-md-6" style="float: right;">
                        <label for="objective_name">Output (Vital Record)</label> <br>
                        <select class="form-control approvaloutputService int-status-multi-select" name="states[]"
                          multiple="multiple" id="approvalsaveoutputsService">
                        </select>
                      </div>

                      <div class="form-group col-md-6">
                        <label for="objective_name">Final MAO</label> <br>
                        <input type="text" class="approvalfinalMaoService" style="border: 1px solid #dddddd;">
                      </div>

                      <div class="form-group col-md-6" style="float: right;">
                        <label for="objective_name">RTO</label> <br>
                        <input type="text" class="approvalrtoService" style="border: 1px solid #dddddd;">
                      </div>

                      <div class="form-group col-md-6">
                        <label for="objective_name">Business Strategies and Solutions</label> <br>
                        <select class="form-control approvalstrategiesService int-status-multi-select" name="states[]"
                          multiple="multiple" id="approvalsavestrategiesService">
                        </select>
                      </div>
                    </div>
                    <hr />
                  </form>
                </div>
						<div class="modal-footer d-flex flex-column align-items-stretch">
        <div class="d-flex justify-content-end gap-2 mb-3">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary initative_save_btn" onclick="savePOS()">Save</button>
        </div>

		<input id="approvalposid" type="hidden" name="posid" />
                    <input type="hidden" name="" id="posChangeId">
                    <input type="hidden" name="pupdateid" id="pupdateid">
                    <input type="hidden" name="pdateCreated" id="pdateCreated">
                    <input id="pageId" type="hidden" name="pagenumber" value="${pagenumber}" />
                    <input type="hidden" id="pcreateId" name="pcreateId">
                     <input type="hidden" id="ppageID" name="ppageID">
      </div>
             

              </div>
            </div>
          </div>

          <!-- rpo modal -->
          <div class="modal fade rpo_description_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
            aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-dialog-centered modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h4>Business Impact Analysis</h4>
                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form id="approvalrpoobjectiveForm">
                    <div class="form-row">

                      <div class="form-group col-md-6">
                        <label for="objective_name">Process (POS)</label><br>
                        <select class="form-control approvalprocessService int-status-multi-select" name="states[]"
                          multiple="multiple" id="approvalsaverpoprocessService">
                        </select>
                      </div>

                      <div class="form-group col-md-6">
                        <label for="objective_name">Name of Vital Records</label> <br>
                        <select class="form-control approvalvitalService int-status-multi-select" name="states[]"
                          multiple="multiple" id="approvalsavevitalService">
                        </select>
                      </div>

                      <div class="form-group col-md-6">
                        <label for="objective_name">Type of Media</label> <br>
                        <select class="form-control approvalmediaService int-status-multi-select" name="states[]"
                          multiple="multiple" id="approvalsavemediaService">
                        </select>
                      </div>

                      <div class="form-group col-md-6">
                        <label for="objective_name">Backup Method</label> <br>
                        <select class="form-control approvalbackupService int-status-multi-select" name="states[]"
                          multiple="multiple" id="approvalsavebackupService">
                        </select>
                      </div>

                      <div class="form-group col-md-6">
                        <label for="objective_name">Backup Time</label> <br>
                        <select class="form-control approvalbackuptimeService int-status-multi-select" name="states[]"
                          multiple="multiple" id="approvalsavebackuptimeService">
                        </select>
                      </div>

                      <div class="form-group col-md-6">
                        <label for="objective_name">Retention</label> <br>
                        <select class="form-control approvalretentionService int-status-multi-select" name="states[]"
                          multiple="multiple" id="approvalsaveretentionService">
                        </select>
                      </div>

                      <div class="form-group col-md-6">
                        <label for="objective_name">Database Recovery Strategy</label> <br>
                        <select class="form-control approvalrecoveryService int-status-multi-select" name="states[]"
                          multiple="multiple" id="approvalsaverecoveryService">
                        </select>
                      </div>

                    </div>
                    <hr />
                  </form>
                </div>
				<div class="modal-footer d-flex flex-column align-items-stretch">
        <div class="d-flex justify-content-end gap-2 mb-3">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary initative_save_btn" onclick="saveRPOpage()">Save</button>
        </div>

 <input type="hidden" name="updateid" id="updateid">
                    <input type="hidden" name="dateCreated" id="dateCreated">
                    <input id="pageId" type="hidden" name="pagenumber" value="${pagenumber}" />
                    <input type="hidden" name="" id="rpoid">
                    <input type="hidden" name="rpoChangeid" id="rpoChangeid">
                    <input type="hidden" id="createId" name="createId">
                     <input type="hidden" id="pageID" name="pageID">
      </div>
              

              </div>
            </div>
          </div>
    <!-- Status Update Modal end-->
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
			<a class="control-link" href="#"><span class="icon"><img src="/stratroom/images/organization-i.svg"
						width="18" height="18" alt="organization"></span></a>
			<a class="control-link" href="#"><span class="icon"><img src="/stratroom/images/template.svg" width="18"
						height="18" alt="organization"></span></a>
		</div>

		<!--  org-add modal :::::::::::::::::::::::::::::::::::::::: -->

		<!-- Modal Structure -->
		<div class="modal custom-modal fade" id="add-org" data-backdrop="static" data-keyboard="false" tabindex="-1"
			role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
			<div
				class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title" data-translate="page.orgstructure.create_orgstructure">Create Org</h4>
						<button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form class="card custom-card border-0">
							<div class="card-body">
								<div class="grid gap-3">

									<input type="hidden" name="dept_new_id1" id="dept_new_id1" />
									<input type="hidden" name="dept_parentid" id="dept_parentid" />
									<input type="hidden" name="deptmode" id="deptmode" />
									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="sub_initative_progress" class="form-label" data-translate="page.orgstructure.form_items.department">Department</label>
											<input type="text" class="form-control browser-default" name="orgdept"
												id="orgdept" placeholder="Department">
										</div>
									</div>
									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="sub_initative_progress" class="form-label" data-translate="page.orgstructure.form_items.department_id">Department ID</label>
											<input type="text" class="form-control browser-default" name="editorgdeptid"
												id="editorgdeptid" placeholder="Department ID">
										</div>
									</div>
									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="boardTypeEdit" class="form-label" data-translate="page.orgstructure.form_items.owner">Owner</label>
											<select class="form-select select-dropdown-edit-org w-100 select2"
												name="ownernamemapping" id="ownername" data-placeholder="Select Owner"
												style="width: 100%;">
											</select>
										</div>
									</div>
									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="sub_initative_progress" class="form-label" data-translate="page.orgstructure.form_items.email">Email</label>
											<input type="text" class="form-control browser-default" name="deptemailadd"
												id="deptemailadd" placeholder="Email">
										</div>
									</div>
									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="boardTypeEdit" class="form-label" data-translate="page.orgstructure.form_items.members">Members</label>
											<select
												class="userdept-name-multi-selectadd form-select select-dropdown-add-org w-100 select2"
												style="width: 100%;" name="boardTypeCreate" id="boardTypeEdit"
												data-placeholder="Select Member" multiple="multiple"
												name="namemapping[]">

											</select>
										</div>
									</div>

									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="ScorecardEdit" class="form-label" data-translate="page.orgstructure.form_items.scorecard">Scorecard</label>
											<select class="form-select select-dropdown-edit-org w-100"
												id="deptuserscorecard" name="deptuserscorecard"
												data-placeholder="Select Scorecard">
												<option value="" disabled selected hidden>
													Select Scorecard
												</option>

											</select>
										</div>
									</div>
									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="InitiativeEdit" class="form-label" data-translate="page.orgstructure.form_items.initiative">Initiative</label>
											<select class="form-select select-dropdown-edit-org w-100"
												id="deptuserinitiative" name="deptuserinitiative"
												data-placeholder="Select Initiative">
												<option value="" disabled selected hidden>
													Select Initiative
												</option>
											</select>
										</div>
									</div>
									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="KPIEdit" class="form-label" data-translate="page.orgstructure.form_items.kpi">KPI</label>
											<select class="form-select select-dropdown-edit-org w-100" id="deptuserkpi"
												name="deptuserkpi" data-placeholder="Select KPI">
												<option value="" disabled selected hidden>
													Select KPI
												</option>
											</select>

										</div>
									</div>
									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="RiskEdit" class="form-label" data-translate="page.orgstructure.form_items.risk">Risk</label>
											<select class="form-select select-dropdown-edit-org w-100" id="deptuserrisk"
												name="deptuserrisk" data-placeholder="Select Risk">
												<option value="" disabled selected hidden>
													Select Risk
												</option>
											</select>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-label-secondary" data-dismiss="modal" aria-label="Close" data-translate="page.orgstructure.cancel">
							Cancel
						</button>
						<button class="btn btn-primary" value="Save" onclick="return createdeptEmployee()" data-translate="page.orgstructure.save">Save</button>
					</div>
				</div>
			</div>
		</div>


		<!--  org-add modal :::::::::::::::::::::::::::::::::::::::: -->

		<!--  org-edit modal :::::::::::::::::::::::::::::::::::::::: -->

		<div class="modal custom-modal fade" id="edit-org" data-backdrop="static" data-bs-keyboard="false" tabindex="-1"
			role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
			<div
				class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title" data-translate="page.orgstructure.edit_orgstructure">Edit Org</h4>
						<button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form class="card custom-card border-0">
							<div class="card-body">
								<div class="grid gap-3">

									<input type="hidden" name="dept_new_id1" id="dept_new_id1" />
									<input type="hidden" name="dept_parentid" id="dept_parentid" />
									<input type="hidden" name="deptmode" id="deptmode" />
									<input type="hidden" id="updatedeptId">
									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="sub_initative_progress" class="form-label" data-translate="page.orgstructure.form_items.department">Department</label>
											<input type="text" class="form-control browser-default" name="editorgdept"
												id="editorgdept" placeholder="Department">
										</div>
									</div>

									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="sub_initative_progress" class="form-label" data-translate="page.orgstructure.form_items.department_id">Department ID</label>
											<input type="text" class="form-control browser-default"
												name="editorgdeptidValue" id="editorgdeptidValue"
												placeholder="Department ID" readonly>
										</div>
									</div>

									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="boardTypeEdit" class="form-label" data-translate="page.orgstructure.form_items.owner">Owner</label>
											<select class="form-select select-dropdown-edit-org w-100"
												name="ownernamemapping" id="ownernameValue"
												data-placeholder="Select Owner" style="width: 100%;">


											</select>
										</div>
									</div>

									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="" class="form-label" data-translate="page.orgstructure.form_items.email">Email</label>
											<input type="text" class="form-control browser-default" id="emialIdValue"
												placeholder="Email" readonly>
										</div>
									</div>

									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="boardTypeEdit" class="form-label" data-translate="page.orgstructure.form_items.members">Members</label>
											<select
												class="userdept-name-multi-select form-select select-dropdown-edit-org w-100 select2"
												style="width: 100%;" name="boardTypeCreate" id="boardTypeEdit"
												data-placeholder="Select Member" multiple="multiple"
												name="namemapping[]">

											</select>
										</div>
									</div>

									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="ScorecardEdit" class="form-label" data-translate="page.orgstructure.form_items.scorecard">Scorecard</label>
											<select class="form-select select-dropdown-edit-org w-100"
												name="deptuserscorecardValue" id="deptuserscorecardValue"
												data-placeholder="Select Scorecard" style="width: 100%;">
												<option value="" disabled selected hidden>
													Select Scorecard
												</option>

											</select>
										</div>
									</div>
									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="InitiativeEdit" class="form-label" data-translate="page.orgstructure.form_items.initiative">Initiative</label>
											<select class="form-select select-dropdown-edit-org w-100"
												name="deptuserinitiativeValue" id="deptuserinitiativeValue"
												data-placeholder="Select Initiative" style="width: 100%;">
												<option value="" disabled selected hidden>
													Select Initiative
												</option>
											</select>
										</div>
									</div>
									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="KPIEdit" class="form-label" data-translate="page.orgstructure.form_items.kpi">KPI</label>
											<select class="form-select select-dropdown-edit-org w-100"
												name="deptuserkpiValue" id="deptuserkpiValue"
												data-placeholder="Select KPI" style="width: 100%;">
												<option value="" disabled selected hidden>
													Select KPI
												</option>
											</select>

										</div>
									</div>
									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="RiskEdit" class="form-label" data-translate="page.orgstructure.form_items.risk">Risk</label>
											<select class="form-select select-dropdown-edit-org w-100"
												name="deptuserriskValue" id="deptuserriskValue"
												data-placeholder="Select Risk" style="width: 100%;">
												<option value="" disabled selected hidden>
													Select Risk
												</option>
											</select>

										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-label-secondary" data-dismiss="modal" aria-label="Close" data-translate="page.orgstructure.cancel">
							Cancel
						</button>
						<button class="btn btn-primary" value="Save" onclick="updateEmployeeDept()" data-translate="page.orgstructure.save">Save</button>
					</div>
				</div>
			</div>
		</div>

		<!--  org-edit modal :::::::::::::::::::::::::::::::::::::::: -->

		<!--  delete modal :::::::::::::::::::::::::::::::::::::::: -->

		<div class="modal custom-modal custom-delete-modal fade" id="delete-modal" data-backdrop="static"
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
										<button type="button" class="btn btn-sm btn-label-secondary rounded-pill"
											data-bs-dismiss="modal" aria-label="Close" data-translate="page.orgstructure.cancel">
											Cancel
										</button>
										<button class="btn btn-sm btn-danger rounded-pill orgDeleteconfirm"
											value="Yes" data-translate="page.orgstructure.delete">Delete</button>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>


		<div class="modal custom-modal custom-delete-modal fade" id="dragmap-modal" data-backdrop="static"
			data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
			aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" style="--stratroom-modal-width:320px">
				<div class="modal-content">
					<div class="modal-body">
						<div class="card custom-card delete-card border-0">
							<div class="card-body">

								<div class="delete-box">
									<h4 class="title" >Do you really want to save the changes?</h4>
									<div class="btn-wrap">
										<button type="button" class="btn btn-sm btn-label-secondary rounded-pill"
											data-bs-dismiss="modal" aria-label="Close" data-translate="page.orgstructure.cancel">
											Cancel
										</button>
										<button class="btn btn-sm btn-primary rounded-pill dragMapconfirm"
											value="Yes" data-translate="page.orgstructure.save">Save</button>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>


		

		<!--  delete modal :::::::::::::::::::::::::::::::::::::::: -->


		<!--  org-view modal :::::::::::::::::::::::::::::::::::::::: -->

		<div class="modal custom-modal fade" id="org-view" tabindex="-1" role="dialog"
			aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
			<div class="modal-dialog modal-dialog-scrollable modal-xl modal-fullscreen-xl-down">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title" data-translate="page.orgstructure.organisation_tracker">Organisation Tracker</h4>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="card controlpanel-container org-structure-tab-container">
							<div class="grid gap-0 control-panel-tabs org-structure-tabs">
								<div id="org-tracker-tabs" class="dropdown control-panel-wrap  g-col-12 g-col-lg-3"></div>


								<!-- data displyed here -->
								<div class="tab-content g-col-12 g-col-lg-9" id="v-pills-tabContent">
									<div class="tab-pane fade show active" id="v-pills-general" role="tabpanel"
										aria-labelledby="v-pills-general-tab" tabindex="0">
										
											<div id="org-tracker-tab-section-data"></div>
										
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>

		<!-- org-view END -->

		<!-- File Validate Form -->
		<div class="modal custom-modal fade" id="org-import" tabindex="-1" role="dialog"
			aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
			<div
				class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title" data-translate="page.orgstructure.file_upload">File Upload</h4>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="card-header-progress">
							<ul class="form-progressbar w-100">
								<li data-translate="page.orgstructure.form_items.upload">Upload</li>
								<li data-translate="page.orgstructure.form_items.validation">Validation</li>
								<li data-translate="page.orgstructure.form_items.import">Import</li>
							</ul>
						</div>

						<input type="hidden" id="orgimportmethodtype">


						<div id="file-upload" class="card custom-card">
							<div class="card-body grid gap-3">

								<div class="g-col-12">
									<div class="form-group">
										<label for="importCategory" class="form-label" data-translate="page.orgstructure.form_items.import_category">Import Category</label>
										<select class="form-select select-dropdown-file-upload w-100"
											name="importCategory" id="uploadcategory"
											data-placeholder="Select Import Category">
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
								</div>
								<div class="g-col-12 dropzone-wrapper">
									<div class="form-group dropzone-desc">
										<label for="" class="form-label" data-translate="page.orgstructure.form_items.upload_file">Upload File</label>
										<label for="login" class="upload-label upload-box">
											<div class="upload">Choose a file or drag it here.</div>
											<input type="file" id="login" class="dropzone">
										</label>
									</div>


								</div>
							</div>
							<div class="card-footer">
								<div class="d-flex justify-content-between form-line">
									<button type="button" class="btn btn-primary initative_save_btn ms-auto" data-translate="page.orgstructure.next"
										id="next-btn-1">
										Next
									</button>
								</div>
							</div>
						</div>

						<div class="card custom-card" id="file-validate" style="display: none">
							<div class="card-body grid gap-3">
								<div class="g-col-12 img-center">

									<img src="/stratroom/images/not-verified.png" alt="not-verified" />
									<div class="error-div">
										<table class="error-table">
											<thead>
												<tr>
													<th style="width: 150px" data-translate="page.orgstructure.form_items.row">Row</th>
													<th data-translate="page.orgstructure.form_items.error">Error</th>
												</tr>
											</thead>
											<tbody>

											</tbody>
										</table>
									</div>
								</div>
								<div class="card-footer">
									<div class="d-flex justify-content-between form-line">
										<button type="button" class="btn btn-label-secondary btn-default1"
											id="prev-btnerror" data-translate="page.orgstructure.previous">
											Previous
										</button>
										<!-- <button class="btn btn-primary initative_save_btn" id="next-btn-2">
                Next
              </button> -->
									</div>
								</div>


							</div>

						</div>

						<div class="card custom-card" id="file-next-btn" style="display: none">
							<div class="card-body grid gap-3">
								<div class="g-col-12">
									<div class="text-center">
										<img src="/stratroom/images/success.png" alt="Verified" width="140" />
									</div>
								</div>
							</div>
							<div class="card-footer">
								<div class="d-flex justify-content-between form-line">
									<button type="button" class="btn btn-label-secondary btn-default1" id="prev-btnone" data-translate="page.orgstructure.previous">
										Previous
									</button>
									<button class="btn btn-primary initative_save_btn" id="next-btn-2" data-translate="page.orgstructure.next">
										Next
									</button>
								</div>
							</div>
						</div>

						<div class="card custom-card" id="file-save" style="display: none">
							<div class="card-body grid gap-3">
								<div class="g-col-12">
									<div class="text-center">
										<img src="/stratroom/images/success.png" alt="Verified" width="140" />
									</div>
								</div>
							</div>

							<div class="card-footer">
								<div class="d-flex justify-content-between form-line">
									<button type="button" class="btn btn-label-secondary" id="prev-btn2" data-translate="page.orgstructure.previous">
										Previous
									</button>
									<button class="btn btn-primary initative_save_btn" id="done-btn"
										data-bs-dismiss="modal" aria-label="Close" data-translate="page.orgstructure.done">
										Done
									</button>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>

		<!--  delete modal :::::::::::::::::::::::::::::::::::::::: -->

		<link href="assets/css/pickr.min.css" rel="stylesheet">
		<link href="assets/css/daterangepicker.min.css" rel="stylesheet">
		<link href="assets/css/jquery-ui.min.css" rel="stylesheet">
		<link href="assets/css/select2.min.css" rel="stylesheet" />

		<!-- Plugins Js -->
		<script src="js/app.min.js"></script>
		<!-- Custom Js -->
		<script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
		<script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
		<script src="js/admin.js"></script>
		<script src="js/file-preview.js"></script>
		<script type="text/javascript" src="${contextroot}/js/knockout-3.5.0.js"></script>
		<script type="text/javascript" src="${contextroot}/js/daterangepicker.min.js"></script>
		<!-- Knob Js -->
		<script src="${contextroot}/js/jquery-ui.min.js"></script>
		<script src="js/moment.js"></script>
		<script src="js/pages/animated.js"></script>
		<script src="js/jquery.editable.min.js"></script>
		<script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
		<script src="js/jquery-resize.js"></script>
		<!-- <script src="js/datepickerair.js"></script> -->
		<!-- <script src="js/datepicker.en.js"></script> -->
		<script src="${contextroot}/js/widgets.js"></script>
		<script src="${contextroot}/js/notify.js"></script>
		<script src="js/initial.js"></script>
		<script src="js/custom/jquery.orgchart.js"></script>
		<script src="js/custom/org_structure.js"></script>
		<script src="${contextroot}/js/select2.min.js"></script>
<script type="text/javascript" src="${contextroot}/js/riskchangeview.js"></script>





		<script type="text/javascript">
			$(document).ready(function () {

				$('#org-import').on('show.bs.modal', function () {
					console.log('Modal is opening - clear data now');

					$('#uploadcategory').val('');


					$('#login').val('');

					$('#file-validate').hide();
					$("#file-save").hide();
					$("#file-next-btn").hide();
					$("#file-upload").show();

				});

				if ($("#userrolename").val() == "Super User" || $("#userrolename").val() == "Admin") {
					if ($("#userPrincipal").val() != $("#userPrincipalnavigate").val()) {
						$(".subusermenuname").text('Organization');
						$(".subuserlink").addClass("homepageHighlight");
						if ($(".topmenubreadcrumb").length) {
							$(".topmenubreadcrumb").show();
						}
						if ($(".sidebarNavigate").length) {
							$(".sidebarNavigate").show();
						}
					}
				}
				$('.orgchartuserimage').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
				var currZoom = $("#chart-container").css("zoom");
				if (currZoom == "normal") currZoom = 1;

				$(".zoomIn").click(function () {
					currZoom *= 1.2;
					$("#chart-container").css("zoom", currZoom);
					$("#chart-container").css(
						"-moz-transform",
						"Scale(" + currZoom + ")"
					);
					$("#chart-container").css("-moz-transform-origin", "0 0");
				});
				$(".zoomOff").click(function () {
					$("#chart-container").css("zoom", 1);
					$("#chart-container").css(
						"-moz-transform",
						"Scale(" + currZoom + ")"
					);
					$("#chart-container").css("-moz-transform-origin", "0 0");
				});
				$(".zoomOut").click(function () {
					currZoom *= 0.8;
					$("#chart-container").css("zoom", currZoom);
					$("#chart-container").css(
						"-moz-transform",
						"Scale(" + currZoom + ")"
					);
					$("#chart-container").css("-moz-transform-origin", "0 0");
				});
			});

			$(document).on("keypress", ".required", function () {
				var elementVal = $(this).val();
				var currentElement = $(this);
				var spanerrorMsg = "This field is required";
				var attrID = $(currentElement).attr("id");
				var checkexistspan = $(currentElement).next().length;
				var minchar = 1;
				var maxchar = 200;
				if (attrID != undefined && attrID != "" && attrID == "email_add") {
					minchar = 6;
					maxchar = 200;
				}
				if (checkexistspan == 1) {
					$(currentElement).next().remove();
				}
				if (elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) {
					$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
				}
				/*else if (elementVal.length != 0 && elementVal != undefined && elementVal != "" && (elementVal.length < minchar || elementVal.length >= maxchar)) {
					spanerrorMsg = "This field length should be greater than " + minchar + " and less than " + maxchar;
					$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
				}*/
				else {
					if (checkexistspan == 1 && attrID != "email_add") {
						var currenttext = $(currentElement).next().text();
						$(currentElement).next().remove();
					}
				}

			}).on("keyup", ".required", function () {
				var elementVal = $(this).val();
				var currentElement = $(this);
				var spanerrorMsg = "This field is required";
				var attrID = $(currentElement).attr("id");
				var checkexistspan = $(currentElement).next().length;
				var minchar = 1;
				var maxchar = 200;
				if (attrID != undefined && attrID != "" && attrID == "email_add") {
					minchar = 6;
					maxchar = 200;
				}
				if (checkexistspan == 1) {
					$(currentElement).next().remove();
				}
				if (elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) {
					$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
				} else if (elementVal.length != 0 && elementVal != undefined && elementVal != "" && (elementVal.length < minchar || elementVal.length >= maxchar)) {
					spanerrorMsg = "This field length should be greater than " + minchar + " and less than " + maxchar;
					$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
				} else {
					if (checkexistspan == 1) {
						var currenttext = $(currentElement).next().text();
						$(currentElement).next().remove();
					}
				}
			});

			function getEmployeeObj() {
				var curr = $("#currency").find(':selected').attr('data-currency');
				var imageUpdate = $("#upload_link1").attr("src");
				if (imageUpdate == "/stratroom/images/media.png") {
					imageUpdate = "";
				}
				if ($("#upload_link1").attr("data-imageset") == "notset") {
					imageUpdate = "";
				}
				var employeeObj = {
					"id": $("#org_new_id").val(),
					"name": $("#name_add").val(),
					"title": $('#desg_add').val(),
					"dept": $("#dept_add").val(),
					"email": $("#email_add").val(),
					"phoneNumber": $("#org_phone").val(),
					//	"kpiname": $("#org_kpiname").val(),
					"location": $("#location_add").val(),
					"currency": $("#currency").val(),
					"currencySymbol": curr,
					"image": imageUpdate,
					"deptUniqueId": $("#deptuniqueid").val()
				}
				return employeeObj;
			}

			function getdeptEmployeePagesObj() {

				var employeeObj = [];

				if ($("#deptuserscorecard").val() != "") {
					employeeObj.push({
						"active": 0,
						"pageId": $("#deptuserscorecard").val(),
						"type": "SCORECARD",
						"typeName": "SCORECARD",
						"typeId": $("#deptuserscorecard").val(),
						"empId": $("#dept_emp_show_id").val()
					});
				}

				if ($("#deptuserinitiative").val() != "") {
					employeeObj.push({
						"active": 0,
						"pageId": $("#deptuserinitiative").val(),//$("#userinitiative").find(':selected').data('pageid')
						"type": "INITIATIVE",
						"typeName": "INITIATIVE",
						"typeId": $("#deptuserinitiative").val(),
						"empId": $("#dept_emp_show_id").val()
					});
				}

				if ($("#deptuserkpi").val() != "") {
					employeeObj.push({
						"active": 0,
						"pageId": $("#deptuserkpi").find(':selected').data('pageid'),
						"type": "KPI",
						"typeName": "KPI",
						"typeId": $("#deptuserkpi").val(),
						"empId": $("#dept_emp_show_id").val()
					});
				}

				if ($("#deptuserrisk").val() != "") {
					employeeObj.push({
						"active": 0,
						"pageId": $("#deptuserrisk").val(),
						"type": "RISK",
						"typeName": "RISK",
						"typeId": $("#deptuserrisk").val(),
						"empId": $("#dept_emp_show_id").val()
					});
				}

				return employeeObj;
			}


			function getNewEmployeeObj() {
				var imagesrc = $("#upload_link2").attr("src");
				if (imagesrc == "/stratroom/images/media.png") {
					imagesrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=";
					imagesrc = "";
				}
				if ($("#upload_link2").attr("data-imageset") == "notset") {
					imageUpdate = "";
				}
				var employeeObj = {
					"name": $("#name_add1").val(),
					"title": $('#desg_add1').val(),
					"dept": $("#dept_add1").val(),
					"deptUniqueId": $("#dept_id_add1").val(),
					//"kpiname": $("#kpi_name_add1").val(),
					"kpiname": "",
					"email": $("#email_add1").val(),
					"location": $("#location_add1").val(),
					"image": imagesrc

				}
				return employeeObj;
			}

			function updateformvalidationerrorreset() {
				$("#edit_org_structure_form span[style='color: red']").each(function () {
					$(this).not("#emailerrorshow").remove();
				});
				$("#emailerrorshow").hide();
			}

			function updateEmployee() {
				//console.log($("#upload_link1").attr("src"));
				updateformvalidationerrorreset();
				var employeeObj = getEmployeeObj();
				var validationFlag = formvalidationorg("#edit_org_structure_form");
				var emailaddress = $("#email_add").val();
				if (emailaddress == "" || emailaddress == undefined || emailaddress == " " || emailaddress == 0) {
					$("#emailerrorshow").css('display', 'block').html("This field is required");
					validationFlag = true;
				} else {
					$("#emailerrorshow").css('display', 'none').html("");
				}

				if (validationFlag == true) {
					return false;
				}
				/*var drogdropid 	=	$("#currentimgdivid").val();
				if(drogdropid !=	undefined && drogdropid !=	""){
					$("div #"+drogdropid).find(".org_box_top img").attr('src',employeeObj.image);
				}*/
				var emailaddress = $("#email_add").val();
				if (emailaddress != "" && emailaddress != undefined && emailaddress != " " && emailaddress != 0) {
					if (!validateEmail(emailaddress)) {
						$("#emailerrorshow").css('display', 'block').html("Please enter valid emailAddress");
						return false;
					} else {
						$("#emailerrorshow").css('display', 'none').html("");
					}
				}

				var methodType = 'post';
				$.ajax({
					url: "/stratroom/editEmployee/",
					type: methodType,
					contentType: "application/json",
					data: JSON.stringify(employeeObj),
					success: function (data, status) {
						location.reload(true);
						//updateemployeeaftercall(employeeObj.image,employeeObj.id);
						$("#close-org-aside").click();
					},
					error: readErrorMsg
				});
			}

			function getEmployeePagesObj() {

				var employeeObj = [];

				if ($("#userscorecard").val() != "") {
					employeeObj.push({
						"active": 0,
						"pageId": $("#userscorecard").val(),
						"type": "SCORECARD",
						"typeName": "SCORECARD",
						"typeId": $("#userscorecard").val(),
						"empId": $("#emp_show_id").val()
					});
				}

				if ($("#userinitiative").val() != "") {
					employeeObj.push({
						"active": 0,
						"pageId": $("#userinitiative").val(),//$("#userinitiative").find(':selected').data('pageid')
						"type": "INITIATIVE",
						"typeName": "INITIATIVE",
						"typeId": $("#userinitiative").val(),
						"empId": $("#emp_show_id").val()
					});
				}

				if ($("#userkpi").val() != "") {
					employeeObj.push({
						"active": 0,
						"pageId": $("#userkpi").find(':selected').data('pageid'),
						"type": "KPI",
						"typeName": "KPI",
						"typeId": $("#userkpi").val(),
						"empId": $("#emp_show_id").val()
					});
				}

				if ($("#userrisk").val() != "") {
					employeeObj.push({
						"active": 0,
						"pageId": $("#userrisk").val(),
						"type": "RISK",
						"typeName": "RISK",
						"typeId": $("#userrisk").val(),
						"empId": $("#emp_show_id").val()
					});
				}

				return employeeObj;
			}

			function updatePageEmployee() {
				//updateformvalidationerrorreset();
				var employeeObj = getEmployeePagesObj();

				var methodType = 'post';
				$.ajax({
					url: "/stratroom/pageLink/",
					type: methodType,
					contentType: "application/json",
					data: JSON.stringify(employeeObj),
					success: function (data, status) {
						location.reload(true);
						//updateemployeeaftercall(employeeObj.image,employeeObj.id);
						$("#close-org-aside").click();
					},
					error: readErrorMsg
				});
			}


			$(document).on('keydown', function (e) {
				if (e.keyCode == 27) { // ESC
					$("#close-org-aside").click();
				}
			});

			$("#editorgdeptid").on('keypress focusout blur', function () {
				$("#deptiduniqeueerrorshow").hide();
				if ($(this).prop("readonly")) {
					return false;
				}
				var deptuniname = $(this).val();
				var currentElement = $(this);
				var checkexistspan = $(currentElement).next().length;
				if (checkexistspan == 1 && (deptuniname == "" || deptuniname == undefined || deptuniname == " " || deptuniname == 0)) {
					$(currentElement).next().text('');
				}

				if (deptuniname != "" && deptuniname != undefined) {
					var addBtn = $(".dept_struct_add_btn");
					$(addBtn).attr("disabled", true).css("cursor", "not-allowed");

					$.ajax({
						url: "findByDeptUniqueId?deptUniqueId=" + deptuniname,
						contentType: "application/json",
						async: false,
						success: function (data) {
							if (data.status != "Active" && data.status != "") {
								$(addBtn).removeAttr("disabled").css("cursor", "pointer");
								$("#deptiduniqeueerrorshow").hide();
								//$("#editorgdeptid").next().append('<span id="deptiduniqeueerrorshow" style="color: red; display: none"></span>');
								//$("#deptiduniqeueerrorshow").css('display', 'none').html("");
							} else {
								$(".editdeptidSelect").append('<p id="deptiduniqeueerrorshow" style="color:red">Dept Id is already taken</p>');
							}
						}
					});
				}
			});

			/*$("#dept_id_add1").on('keypress focusout blur', function () {
				$("#employeedepterrorshow1").hide();
				
				var deptuniname = $(this).val();
				var currentElement = $(this);
				var checkexistspan = $(currentElement).next().length;
				if (checkexistspan == 1 && (deptuniname == "" || deptuniname == undefined || deptuniname == " " || deptuniname == 0)) {
					$(currentElement).next().text('');
				}
	
				if (deptuniname != "" && deptuniname != undefined) {
					var addBtn = $("#add-org-object");
					$(addBtn).attr("disabled", true).css("cursor", "not-allowed");
					$("#employeedepterrorshow1").show();
					$.ajax({
						url: "findByDeptUniqueId?deptUniqueId=" + deptuniname,
						contentType: "application/json",
						async: false,
						success: function (data) {
							if (data.status != "Active" && data.status != "") {
								$(addBtn).removeAttr("disabled").css("cursor", "pointer");
								$("#employeedepterrorshow1").css('display', 'none').html("");
							} else {
								$("#employeedepterrorshow1").html("Dept Id is already taken");
							}
						}
					});
				}
			});*/


			$(document).on('blur', "#email_add", function () {
				var emailAddredd = $(this).val();
				var currentElement = $(this);
				var empId = $("#org_new_id").val();
				var checkexistspan = $(currentElement).next().length;
				if (checkexistspan == 1 && (emailAddredd == "" || emailAddredd == undefined || emailAddredd == " " || emailAddredd == 0)) {
					$(currentElement).next().text('');
				}

				if (emailAddredd != "" && emailAddredd != undefined) {
					var addBtn = $("#edit-org-object");
					$(addBtn).attr("disabled", true).css("cursor", "not-allowed");
					$("#emailerrorshow").css('display', 'block');
					$.ajax({
						url: "checkEmail?email=" + emailAddredd + "&empId=" + empId,
						contentType: "application/json",
						async: false,
						success: function (data) {
							if (data.success != undefined && data.success != "") {
								$(addBtn).removeAttr("disabled").css("cursor", "pointer");
								$("#emailerrorshow").css('display', 'none').html("");
							} else {
								$("#emailerrorshow").css('display', 'block').html("Email address is already taken");
							}
						}
					});
				}
			});

			$(document).on('blur', "#email_add1", function () {
				var emailAddredd = $(this).val();
				var currentElement = $(this);
				var empId = $("#org_new_id1").val();
				var checkexistspan = $(currentElement).next().length;
				if (checkexistspan == 1 && (emailAddredd == "" || emailAddredd == undefined || emailAddredd == " " || emailAddredd == 0)) {
					$(currentElement).next().text('');
				}

				if (emailAddredd != "" && emailAddredd != undefined) {
					var addBtn = $("#add-org-object");
					$(addBtn).attr("disabled", true).css("cursor", "not-allowed");
					$("#emailerrorshow1").css('display', 'block');
					$.ajax({
						url: "checkEmail?email=" + emailAddredd + "&empId=" + empId,
						contentType: "application/json",
						async: false,
						success: function (data) {
							if (data.success != undefined && data.success != "") {
								$(addBtn).removeAttr("disabled").css("cursor", "pointer");
								$("#emailerrorshow1").css('display', 'none').html("");
							} else {
								$("#emailerrorshow1").css('display', 'block').html("Email address is already taken");
							}
						}
					});
				}
			});

			$(".dept_struct_add_btn").mouseover(function () {
				if ($("#orgdept").is(":focus")) {
					$("#orgdept").trigger("blur");
				}
				if ($("#editorgdeptid").is(":focus")) {
					$("#editorgdeptid").trigger("blur");
				}
				if ($("#deptiduniqeueerrorshow").css('display') == "none") {
					$(".dept_struct_add_btn").attr("disabled", true).css("cursor", "not-allowed");
				}
			});

			/*$(document).on('blur', "#orgdept", function () {
				var emailAddredd = $(this).val();
				var currentElement = $(this);
				//var empId = $("#org_new_id1").val();
				var checkexistspan = $(currentElement).next().length;
				if (checkexistspan == 1 && (emailAddredd == "" || emailAddredd == undefined || emailAddredd == " " || emailAddredd == 0)) {
					$(currentElement).next().text('');
				}
	
				if (emailAddredd != "" && emailAddredd != undefined) {
					var addBtn = $(".dept_struct_add_btn");
					$(addBtn).attr("disabled", true).css("cursor", "not-allowed");
					$.ajax({
						url: "checkDept?deptName=" + emailAddredd,
						contentType: "application/json",
						async: false,
						success: function (data) {
							if (data.success != undefined && data.success != "") {
								$(addBtn).removeAttr("disabled").css("cursor", "pointer");
								$(this).next().remove();
							} else {
								$("#orgdept").after('<span style="color: red">Department is already taken</span>');
							}
						}
					});
				}
			});*/

			$("#edit-org-object").mouseover(function () {
				if ($("#email_add").is(":focus")) {
					$("#email_add").trigger("blur");
				}
			});

			$("#add-org-object").mouseover(function () {
				if ($("#email_add1").is(":focus")) {
					$("#email_add1").trigger("blur");
				}
				if ($("#dept_id_add1").is(":focus")) {
					$("#dept_id_add1").trigger("blur");
				}
				if ($("#employeedepterrorshow1").css('display') != "none") {
					$("#add-org-object").attr("disabled", true).css("cursor", "not-allowed");
				}
			});

			/*$("#email_add").blur(function(){
				if($("#email_add").val().length >= 6){
					if($("#email_add").is(":focus")){
						$("#email_add").trigger("blur");
					}
				}
			});*/

			function formvalidationorg(formElement) {
				var validationFlag = false;
				$(formElement + " .required").each(function (index, value) {
					var spanerrorMsg = "This field is required";
					var elementVal = $(this).val();
					var currentElement = $(this);
					var attrID = $(currentElement).attr("id");
					var checkexistspan = $(currentElement).next().length;
					var minchar = 3;
					var maxchar = 200;
					/*if(checkexistspan 	==	1){
						$(currentElement).next().remove();
					}*/

					if (attrID != undefined && attrID != "" && attrID == "email_add") {
						minchar = 6;
						maxchar = 200;
					}

					if (elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) {
						$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}
					/*else if (elementVal.length != 0 && elementVal != undefined && elementVal != "" && (elementVal.length < minchar || elementVal.length >= maxchar)) {
						spanerrorMsg = "This field length should be greater than " + minchar + " and less than " + maxchar;
						$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}*/
					else {
						if (checkexistspan == 1 && attrID != "email_add") {
							$(currentElement).next().remove();
						}
					}

				});
				return validationFlag;
			}

			function addformvalidationerrorreset() {
				$("#add_org_structure_form span[style='color: red']").each(function () {
					$(this).not("#emailerrorshow1").remove();
				});
				$("#emailerrorshow1").hide();
			}


			function getNewdeptEmployeeObj() {
				var imagesrc = $("#upload_link_dept").attr("src");
				if (imagesrc == "/stratroom/images/media.png") {
					imagesrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=";
					imagesrc = "";
				}
				if ($("#upload_link_dept").attr("data-imageset") == "notset") {
					imagesrc = "";
				}
				var dept = "";
				if ($("#deptmode").val() == "add") {
					dept = $("#orgdept").val();
				} else {
					//dept	=	$("#editorgdept option:selected").text();
					dept = $("#editorgdept").val();
				}

				var employeeObj = {
					"owner": $("#ownername").val(),
					"empIdList": $(".userdept-name-multi-selectadd").val(),
					"scorecardPageId": $('#deptuserscorecard').val(),
					"initiativePageId": $("#deptuserinitiative").val(),
					"kpiId": $("#deptuserkpi").val(),
					"riskPageId": $("#deptuserrisk").val(),
					"emailAddress": $("#deptemailadd").val(),
					"deptParentId": $("#dept_parentid").val(),
					"deptUniqueId": $("#editorgdeptid").val(),
					"deptName": dept,
					"deptImage": imagesrc

				}
				return employeeObj;
			}

			function createEmployee() {
				addformvalidationerrorreset();
				var validationFlag = formvalidationorg("#add_org_structure_form");
				var emailaddress = $("#email_add1").val();
				if (emailaddress == "" || emailaddress == undefined || emailaddress == " " || emailaddress == 0) {
					$("#emailerrorshow1").css('display', 'block').html("This field is required");
					validationFlag = true;
				} else {
					$("#emailerrorshow1").css('display', 'none').html("");
				}

				if (validationFlag == true) {
					return false;
				}

				var emailaddress = $("#email_add1").val();
				if (emailaddress != "" && emailaddress != undefined && emailaddress != " " && emailaddress != 0) {
					if (!validateEmail(emailaddress)) {
						$("#emailerrorshow1").css('display', 'block').html("Please enter valid emailAddress");
						return false;
					} else {
						$("#emailerrorshow1").css('display', 'none').html("");
					}
				}

				var employeeObj = getNewEmployeeObj();
				employeeObj.pid = $("#org_new_id").val();
				var methodType = 'post';

				$.ajax({
					url: "/stratroom/createEmployee/",
					type: methodType,
					contentType: "application/json",
					data: JSON.stringify(employeeObj),
					success: function (data, status) {
						//console.log("employee hass been created..");
						location.reload(true);
						//callaftercreatedemployee(employeeObj.image, data.employeeId);
						//$("#close-org-aside1").click();
					},
					error: readErrorMsg
				});
			}

			function adddeptformvalidationerrorreset() {
				$("#add_dept_structure_form span[style='color: red']").each(function () {
					$(this).remove();
				});
				$("#deptemailerrorshow1").hide();
			}

			function deptformvalidationorg(formElement) {
				var validationFlag = false;
				$(formElement + " .required").each(function (index, value) {
					var spanerrorMsg = "This field is required";
					var elementVal = $(this).val();
					var currentElement = $(this);
					var attrID = $(currentElement).attr("id");
					var checkexistspan = $(currentElement).next().length;
					var minchar = 3;
					var maxchar = 200;

					if (attrID != undefined && attrID != "" && attrID == "deptemailadd") {
						minchar = 6;
						maxchar = 200;
					}

					if ((elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) && (!$(this).hasClass("owner-name") && !$(this).hasClass("userdept-name-multi-select"))) {
						$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}
					/*else if (elementVal.length != 0 && elementVal != undefined && elementVal != "" && (elementVal.length < minchar || elementVal.length >= maxchar)) {
						spanerrorMsg = "This field length should be greater than " + minchar + " and less than " + maxchar;
						$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}*/

					if ((elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) && ($(this).hasClass("owner-name"))) {
						$(currentElement).next().after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}

					if ((elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) && $(this).hasClass("editdeptelem")) {
						$(currentElement).next().after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}

					if ((elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) && $(this).hasClass("userdept-name-multi-select")) {
						$(currentElement).next().after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}


					/*if((elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) && $(this).hasClass("userdept-name-multi-select")){
						$(".userdept-name-multi-select").next().after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}*/
				});
				return validationFlag;
			}

			function createdeptEmployee() {
				adddeptformvalidationerrorreset();
				if ($("#orgdept").is(":visible") == true) {
					$("#deptmode").val('add');
				} else {
					$("#deptmode").val('edit');
				}
				var validationFlag = deptformvalidationorg("#add_dept_structure_form");

				/*var emailaddress = $("#deptemailadd").val();
				if (emailaddress == "" || emailaddress == undefined || emailaddress == " " || emailaddress == 0) {
					$("#deptemailerrorshow1").css('display', 'block').html("This field is required");
					validationFlag = true;
				} else {
					$("#deptemailerrorshow1").css('display', 'none').html("");
				}*/

				if (validationFlag == true) {
					return false;
				}

				var employeeObj = getNewdeptEmployeeObj();
				if ($("#deptmode").val() == "add") {
					if (employeeObj.deptParentId == undefined || employeeObj.deptParentId == "" || employeeObj.deptParentId == null) {
						$.notify("Department Parent id is missing", {
							style: 'success',
							className: 'graynotify'
						});
						return false;
					}
				}


				var methodType = 'post';
				/*if($("#dept_new_id1").val() !=	""){
					methodType = 'put';
				}*/

				if ($("#deptmode").val() == "edit") {
					methodType = 'put';
					employeeObj.deptId = $("#updatedeptId").val();
				}

				console.log(employeeObj, "employeeObj");

				$.ajax({
					url: "/stratroom/addDepartmentMapping",
					type: methodType,
					contentType: "application/json",
					data: JSON.stringify(employeeObj),
					success: function (data, status) {
						console.log(JSON.stringify(employeeObj));
						console.log("dept hass been created..");
						//	location.reload(true);
						/*if($("#deptmode") == "add"){
							callafterdeptcreatedemployee(employeeObj.image, data.deptId);
						}else{
							updatedeptaftercall(employeeObj.image, data.deptId);
						}*/
						$("#close-dept-aside1").click();
						location.reload(true);
					},
					error: readErrorMsg
				});
			}

			function validateEmail(email) {
				var regexPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return regexPattern.test(String(email).toLowerCase());
			}

		</script>
		<script src="${contextroot}/js/chosen.jquery.min.js"></script>
		<script type="text/javascript" src="${contextroot}/js/notify.js"></script>

		<script src="${contextroot}/js/initial.js"></script>
		<script src="js/custom/file_upload_new.js"></script>
    <script src="${contextroot}/js/approval-page.js"></script>


		<script type="text/javascript">

			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = "https://api.ipify.org?format=jsonp&callback=DisplayIP";
			//script.src = "http://jsonip.com?callback=DisplayIP";
			script.crossorigin = "anonymous";
			document.getElementsByTagName("head")[0].appendChild(script);

			function DisplayIP(response) {
				localStorage.setItem('systemip', response.ip)
			}



			// var toggler = document.getElementsByClassName("caret");
			// var i;

			// for (i = 0; i < toggler.length; i++) {
			//   toggler[i].addEventListener("click", function () {
			//     this.parentElement.querySelector(".nested").classList.toggle("active");
			//     this.classList.toggle("caret-down");
			//   });
			// }

		</script>

		<script>
				var parentHeader = "Parent";
				var ownerHeader = "Owner";
				var deptHeader = "Department";
				var emailHeader = "Email";
				var pagesHeader = "Pages";
				var fromDateHeader = "From Date";
				var toDateHeader = "To Date";
			$(function () {
				function updateSortableEmptyState() {
					$(".nested-area").each(function () {
						if ($(this).children(".nested-item").length == 0) {
							if ($(this).find("li.sortable-empty").length == 0) {
								$(this).prepend('<li class="sortable-empty"></li>'); // Change append → prepend
							}
						}
					});
				}

				// Initial check for empty lists
				updateSortableEmptyState();

				$(".nested-area").sortable({
					items: "> .nested-item:not(.non-draggable-parent)", // Allow sorting for draggable items only
					handle: ".org-box", // Handle for dragging
					connectWith: ".nested-area", // Allow connected sorting between nested areas
					placeholder: "ui-sortable-placeholder", // Placeholder during sorting

					start: function (event, ui) {
						ui.item.addClass("dragging-highlight");

						// Check and update sortable-empty class for the source list
						updateSortableEmptyState();
					},

					stop: function (event, ui) {
						ui.item.removeClass("dragging-highlight");

						// Check and update sortable-empty class for the target list
						updateSortableEmptyState();
					},

					receive: function (event, ui) {
						$(this).find("li.sortable-empty").remove();
					},

					update: function () {
						updateSortableEmptyState();
					},

					over: function (event, ui) {
						let $parent = ui.placeholder.parent();
						if ($parent.children(".nested-item:not(.ui-sortable-placeholder)").length == 0) {
							if ($parent.find("li.sortable-empty").length == 0) {
								$parent.prepend('<li class="sortable-empty"></li>'); // Change append → prepend
							}

						}
					},

					out: function (event, ui) {
						let $parent = ui.placeholder.parent();
						if ($parent.children(".nested-item:not(.ui-sortable-placeholder)").length == 0) {
							$parent.find("li.sortable-empty").remove();
						}
					}
				});

				// Prevent dragging for non-draggable items explicitly
				// $(".nested-item.non-draggable").on("mousedown", function (e) {
				//   e.stopPropagation(); // Prevent dragging
				// });
			});


			$("#boardTypeEdit").select2({
				width: '100%',
				placeholder: "Select Department",
				// //allowClear: true,
				// dropdownParent: $('#add-user')
			});



			//Update Employee Dept
			function updateEmployeeDept() {
				
				const payload = {
					owner: $("#ownernameValue").val(),
					empIdList: $(".userdept-name-multi-select").val(),
					scorecardPageId: $('#deptuserscorecardValue').val(),
					initiativePageId: $("#deptuserinitiativeValue").val(),
					kpiId: $("#deptuserkpiValue").val(),
					riskPageId: $("#deptuserriskValue").val(),
					emailAddress: $("#emialIdValue").val(),
					deptParentId: $("#dept_parentid").val(),
					deptUniqueId: $("#editorgdeptidValue").val(),
					deptName: $("#editorgdept").val(),
					deptImage: "",
					deptId: $("#updatedeptId").val()
				}

				console.log(payload, "payload");

				$.ajax({
					url: "/stratroom/addDepartmentMapping",
					type: "put",
					contentType: "application/json",
					data: JSON.stringify(payload),
					success: function (data, status) {
						console.log("dept hass been created..");

						$("#close-dept-aside1").click();
						location.reload(true);
					},
					error: readErrorMsg
				});
			}


			$(document).on('click', '#done-btn', function () {
				location.reload(true);
			});


			function handleOrgView() {
				
				console.log("function clicked");
				var daterange2 = $("#datePeriod").val();

				$.ajax({
					url: "/stratroom/allDepartmentListByLoginUser",
					type: "GET",
					data: { datePeriod: daterange2 },
					success: function (data) {
						console.log(data, "data");

						if (data.length > 0) {

							var html = '';

							html += '<div id="dropdownMenuButtonWrap" >';
							html += '<ul class="dropdown-menu" id="v-pills-tab" role="tablist" aria-orientation="vertical">';

							for (var i = 0; i < data.length; i++) {
								var deptName = data[i].name;
								var safeId = "v-pills-" + deptName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() + "-tab"; // Sanitize for ID
								var targetId = "#v-pills-" + deptName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

								html += '<button class="card nav-link" id="' + safeId + '" data-bs-toggle="pill" ';
								html += 'data-bs-target="' + targetId + '" type="button" role="tab" aria-controls="' + targetId.substring(1) + '" ';
								html += 'aria-selected="false" ';
								html += 'onclick="handleDepartmentClick(\'' + deptName.replace(/'/g, "\\'") + '\')">';
								html += '<span class="nav-text">' + deptName + '</span>';
								html += '</button>';
							}

							html += '</ul>';
							html += '</div>';


							$("#org-tracker-tabs").empty().append(html);


							var orgModal = new bootstrap.Modal(document.getElementById('org-view'));
							orgModal.show();
						}
					},
					error: function (xhr, status, err) {
						console.error("Error fetching department list:", err);
						$("#v-pills-tab").html('<div class="text-danger px-3">Failed to load data</div>');

						openOrgModalWithContent([]);
					}
				});
			}





		</script>




   <script>
        $(document).ready(function () {
            $(".select-dropdown").select2({
                // allowClear: true,
                width: "100%"
            });

            $(".selectdrop-add-task").select2({
                // allowClear: true,
                width: "100%",
                dropdownParent: $('#task-add-modal')
            });
            $(".selectdrop-update-status").select2({
                // allowClear: true,
                width: "100%",
                dropdownParent: $('#statusUpdateModal')
            });
        });
    </script>

    <script>
        document.querySelectorAll('.date-picker').forEach(function (el) {
            const pickerId = el.getAttribute('id'); // Get the element’s ID
            flatpickr(`#${pickerId}`, {
                dateFormat: "M j, Y",  // Example: Oct 23, 2025
                allowInput: true
            });
        });
        document.querySelectorAll('.date-range-picker').forEach(function (el) {
            const pickerId = el.getAttribute('id'); // Find the element's ID
            flatpickr(`#${pickerId}`, {
                mode: "range",
                dateFormat: "M j, Y",
                // defaultDate: ["2025-08-12", "2025-08-13"],
                onClose: function (selectedDates, dateStr, instance) {
                    if (selectedDates.length === 2) {
                        const start = instance.formatDate(selectedDates[0], "M j, Y");
                        const end = instance.formatDate(selectedDates[1], "M j, Y");
                        el.value = `${start} to ${end}`; // Set formatted value in input
                    }
                }
            });
        });
        $('.modal-custom-select').each(function () {
            let $this = $(this);
            $this.select2({
                width: "100%",
                dropdownParent: $this.closest('.modal')
            });
        });
    </script>

    <script>
        // Popover content
        const popoverTrigger = document.getElementById('popoverFilterStatus');
        new bootstrap.Popover(popoverTrigger, {
            html: true,
            placement: 'bottom',
            content: `
        <div>
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="h6 mb-0">Filter Status</h5>
            <button type="button" class="btn-close" aria-label="Close"></button>
          </div>
          <div class="d-flex flex-column gap-2 pageViewOption">   
            
            <div class="form-check">
              <input class="form-check-input filter-status" id="status-pending" type="checkbox" value="Pending">
              <label class="form-check-label" for="status-pending">Pending</label>
            </div>
            <div class="form-check">
              <input class="form-check-input filter-status" id="status-approved" type="checkbox" value="Approved">
              <label class="form-check-label" for="status-approved">Approved</label>
            </div>
            <div class="form-check">
              <input class="form-check-input filter-status" id="status-rejected" type="checkbox" value="Rejected">
              <label class="form-check-label" for="status-rejected">Rejected</label>
            </div>
           
          </div>
        </div>
      `,
            sanitize: false
        });

        // Close popover on close button click
        document.addEventListener('click', function (event) {
            if (event.target.classList.contains('btn-close')) {
                bootstrap.Popover.getInstance(popoverTrigger)?.hide();
            }
        });

    </script>




	</body>