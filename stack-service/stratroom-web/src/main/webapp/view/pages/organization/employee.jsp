<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page import="com.estrat.web.util.RoleUtil"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta content="width=device-width, initial-scale=1" name="viewport" />

<style>
  .bar-chart .title {
    font-size: 13px;
    line-height: 1.3;
    font-weight: 400;
    display: -webkit-box;
    /* -webkit-line-clamp: 2; */
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
}

.bar-chart .text-muted {
    font-size: 11px;
    font-weight: 500;
}
.grid-from-box > .form-group {
    border: 1px solid #efefef;
    padding: 6px;
    margin-right: -1px;
    margin-bottom: -1px;
}

.grid .g-col-6 {
    grid-column: auto / span 6;
}

.employeedropdownmenuicon.pull-right.show {
        position: absolute !important;
        left: auto !important;
        right: 0px !important;
        top: 74px !important;
        transform: none !important;
      }
.employeedeletedropdownmenuicon.pull-right.show{
	position: absolute !important;
        left: auto !important;
        right: 0px !important;
        top: 74px !important;
        transform: none !important;
}      



.modal-content-setscrollheight .modal-body{
	overflow-y: auto
}

.modal-content-setscrollheight {
  	height: 720px;
}



.tableFixHead {
        overflow-y: auto;
        overflow-x: hidden;
        height: 320px;
      }
      .tableFixHead thead th {
        position: sticky;
        top: 0;
      }
/* .documents-table-response thead tr th {
	font-size:12px !important;
	font-weight:600 !important;
	background-color: #f7f7f7;
} */
.documents-table-response thead th {
    font-size: 12px !important;
    font-weight: 600 !important;
    background-color: #f7f7f7;
}

.highlightchartactive {
  	border:1px solid gray;
  }
  
.goal-input-calender-icon {
	color: #5a6169;
	position: absolute;
	bottom: 26%;
	right: 6%;
	font-size: 16px;
}

/* .documents-table-response{
  width: 100%;
  tbody{
    height:200px !important;
    overflow-y:auto !important;
    width: 100% !important;
    }
  thead,tbody,tr,td,th{
    display:block;
  }
  tbody{
    td{
      float:left;
    }
  }
  thead {
    tr{
      th{
        float:left;
      }
    }
  }
} */
.documents-table-response {
    width: 100%;
}

.documents-table-response tbody {
    max-height: 200px;
    overflow-y: auto;
    display: block;
}

.documents-table-response thead, .documents-table-response tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
}

.documents-table-response tbody td, .documents-table-response thead th {
    text-align: center;
}

#comment-conversation_employee {
	height: 325px !important;
}

#chartdiv>svg {
	margin: 0 auto;
	display: block;
}

#chartdiv_risksum {
  width: 100%;
  height: 300px;
}

#risksumchart_modal{
  width: 100%;
  height: 300px;
}
.orientation-right {
	top: 60px !important;
	right: 0 !important;
	left: auto !important;
	position: fixed;
}

#chartdiv_in {
	height: 340px !important;
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

#result_panel>.panelbody>.list-group>.list-group-item {
	padding: 5px 10px !important;
}

#formula_builder, #summary_calculation {
	font-size: 11px !important;
}

#kpi_formula_popup>.modal-content>.modal-body {
	padding: 0 25px !important;
}

#kpi_formula_popup>.modal-content>.modal-body.card>.tab-content {
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

/* .modal-backdrop {
	opacity: 0.5 !important;
} */

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

.top_datepicker {
	border-bottom: 1px solid #ece9ef !important;
	color: #7f7886 !important;
}

.top_datepicker {
	background-color: transparent;
	border: 0;
	border-bottom: 1px solid #9e9e9e;
	border-radius: 0;
	outline: 0;
	height: 3rem;
	width: 100%;
	font-size: 16px;
	margin: 0 0 8px 0;
	padding: 0;
	-webkit-box-shadow: none;
	box-shadow: none;
	-webkit-box-sizing: content-box;
	box-sizing: content-box;
	-webkit-transition: border .3s, -webkit-box-shadow .3s;
	transition: border .3s, -webkit-box-shadow .3s;
	transition: box-shadow .3s, border .3s;
	transition: box-shadow .3s, border .3s, -webkit-box-shadow .3s;
}

.top_datepicker {
	font-size: 12px !important;
	padding: 0 !important;
	text-align: center;
	margin-left: 5px !important;
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

@media ( max-width : 767px) {
	.dropdown-menu.multi-column {
		min-width: 240px !important;
		overflow-x: hidden;
	}
}
</style>
<script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>
<script type="text/javascript"
	src="${contextroot}/js/jquery/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="${contextroot}/js/jquery/additional-methods.min.js"></script>
</head>

<body class="light">
<input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
<input type="hidden" id="employeesupermode" value="employeesuper">
	<input type="hidden" id="ischeckemployeeurlornot" value="EMPLOYEE">
	<!-- Page Loader -->
	
	<!-- #Top Bar -->


	<jsp:include
		page="../initiatives/modals/initiative_description_modal.jsp"></jsp:include>
	<jsp:include page="../initiatives/modals/subinitiatives_modal.jsp"></jsp:include>
	<jsp:include page="../initiatives/modals/activities_modal.jsp"></jsp:include>
	<jsp:include page="../initiatives/modals/milestones_modal.jsp"></jsp:include>

	<!-- #scorescard -->
	<jsp:include
		page="../scorecard/standardview/modals/perspective_modal.jsp"></jsp:include>
	<jsp:include
		page="../scorecard/standardview/modals/scorecard_modal.jsp"></jsp:include>
	<jsp:include
		page="../scorecard/standardview/modals/objective_modal.jsp"></jsp:include>
	<jsp:include page="../scorecard/standardview/modals/kpi_modal.jsp"></jsp:include>
	<jsp:include
		page="../scorecard/standardview/modals/kpi_formula_modal.jsp"></jsp:include>
		<jsp:include page="../scorecard/standardview/modals/objective_custom_threshold.jsp"></jsp:include>
		<jsp:include page="../scorecard/standardview/modals/perspective_custom_threshold.jsp"></jsp:include>
		<jsp:include page="../scorecard/standardview/modals/scorecard_performance_formula.jsp"></jsp:include>
		<jsp:include page="../scorecard/standardview/modals/kpi_performanceformula_modal.jsp"></jsp:include>
    <jsp:include page="../organization/modal/goals.jsp"></jsp:include>
	<c:if test="${defaultPageId != null}">
		<input id="defaultpagenumber" type="hidden" name="pagenumber"
			value="${defaultPageId}" />
	</c:if>
	
	<input id="pagenumber" class="emppagenumber" type="hidden" name="pagenumber"
			value="" />
	<c:if test="${userPrincipal != null}">
		<input id="userPrincipal" type="hidden" name="userPrincipal"
			value="<c:out value="${userPrincipal.profile.empId}" />">
	</c:if>
	<!--<c:if test="${pagenumber != null}">
		<input id="pagenumber" type="hidden" name="pagenumber"
			value="${pagenumber}">
	</c:if>-->

   <div id="my_kpis-view_popup" class="modal custom-modal fade employee_add_view_popup"  data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-lg-600">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">View My KPIs</h5>

          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card border-0">
            <div class="card-body">
              <div id="my_kpi_view"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

	





  <div class="modal custom-modal fade file_upload_popup" id="fileupload-modal" data-bs-backdrop="static" data-bs-keyboard="false"
 tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
 <div
   class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
   <div class="modal-content">
     <div class="modal-header">
       <h4 class="modal-title">File Upload</h4>
       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
     </div>
     <div class="modal-body">
       <div class="card custom-card border-0">
         <div class="card-body">
         <div class="grid gap-3">
           <div class="g-col-12">
             <div class="form-group">
               <label for="kpiDesName" class="form-label">Name</label>
               <input type="text" class="form-control" name="kpiDesName" id="attachementuploadfile" placeholder="Name" accept=".pdf,.ppt,.jpeg,.xlsx,.doc,.docx">
             </div>
           </div>
           <div class="g-col-12">
             <div class="form-group">
               <label for="" class="form-label">Upload File</label>
               <label for="login" class="upload-label upload-box">
                 <div class="upload">Choose a file or drag it here.</div>
                 <input type="file" id="attachementupload" accept=".doc,.docx,.pdf,.xls,.xlsx,.jpg,.jpeg,.png">
               </label>
             </div>
           </div>
         </div>
       </div>
       </div>
     </div>
     <div class="modal-footer">
       <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
         Cancel
       </button>
       <button class="btn btn-primary" value="Save">Save
       </button>
       
     </div>
   </div>
 </div>
</div>


  <div id="goal-view_popup" class="modal fade goals_view_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title fs-5">View Goals</h4>

          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="col-lg-12 col-md-12 sub_initiatives">
													<div class="card">
														<div class="d-flex flex-column employee_div_body_box_emp"
															id="goals_box_view"></div>
													</div>
												</div>
        </div>
      </div>
    </div>
  </div>


	
	<!-- File file_upload_edit_popup PopUp -->
	<div class="modal fade file_upload_edit_popup" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h4 data-i18n="File Upload">File Upload</h4>
					<button type="button" class="close pull-right" data-dismiss="modal">
						&times;</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="form-group col-md-10" style="padding-right: 4px;">
							<input type="file"  class="modal-custom-input" id="attachementuploadfile1"
								style="height: 38px !important; padding: 5px !important; margin-bottom: 8px;"
								accept=".pdf,.ppt,.jpeg,.xlsx,.doc,.docx" />
							<span>Supported file type (jpeg,pdf,pptx,xlsx,docx)</span>
						</div>
						<div class="col-2" style="padding-left: 4px;">
							<div class="form-line left">
								<button class="initative_save_btn" id="attachementupload1" value="Upload">
									Upload</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	
	<div id="deleteModalDocument" class="modal fade documentdeleteModal">
		<div class="modal-dialog modal-confirm">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Delete</h4>
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">
					<h5 class="confirm-modal-content">Do you really want to delete?</h5>
					<br>
					<div class="form-line right">
						<input type="hidden" id="deleterecordid" /> <input
							type="hidden" id="deleterecordtype" />
						<button type="button" class="btn-default1 btn"
							data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
						<button type="button"
							class="btn btn-danger confirm-modal-deleteBtn documentdeletebtn"
							onclick="deletedocumentByConform()">Delete</button>
					</div>
				</div>
			</div>
		</div>
	</div>

    <div class="modal custom-modal custom-delete-modal fade" id="deleteModalDocument" data-bs-backdrop="static"
  data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" style="--stratroom-modal-width:320px">
      <div class="modal-content">
          <div class="modal-body">
              <div class="card custom-card delete-card border-0">
                  <div class="card-body">

                      <div class="delete-box">
                          <h4 class="title">Do you really want to delete?</h4>
                          <div class="btn-wrap">
                            <input type="hidden" id="deleterecordid" /> <input
							type="hidden" id="deleterecordtype" />
                              <button type="button" class="btn btn-sm btn-label-secondary rounded-pill"
                                  data-bs-dismiss="modal" aria-label="Close">
                                  Cancel
                              </button>
                              <button class="btn btn-sm btn-danger rounded-pill" value="Yes" onclick="deletedocumentByConform()">Delete</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

      </div>
  </div>
</div>

    <div id="view-myinitative-modal" class="modal custom-modal fade my_initative_view_popup" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-lg-600">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">View My Initiative</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
           <div class="card border-0">
            <div class="card-body">
              <div id="my_initiative_view"></div>
            </div>
          </div>
         <!-- <div class="col-lg-12 col-md-12 sub_initiatives">
										<div class="card">
											<div class="d-flex flex-column employee_div_body_box_emp"
												id="my_initiative_view"></div>
										</div>
									</div> -->
        </div>
      </div>
    </div>
  </div>

  <!-- Heat Map View -->
    <div id="heatmapViewModal" class="modal fade risk_chart_view_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
    aria-modal="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header ui-draggable-handle">
          <h6 class="modal-title fs-5">View Heat Map</h6>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          
							<div id="risksumchart_modal" class="chartviewtemplatediv"></div>
			

          

        </div>
      </div>
    </div>
  </div>

  <!-- Risk Register View -->
     <div id="risk-register-view" class="modal fade Risktableview" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">View Risk Register</h4>

          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card border-0">
            <div class="card-body">
            <table class="table border align-center mb-0 w-100" id="riskRegisterTable">
                            <thead>
                              <tr>
                                <th style="vertical-align:middle; text-align: center;">Status</th>
                                <th style="vertical-align:middle; text-align: center;">ID</th>
                                <th style="vertical-align:middle; text-align: center;">Name</th>
                                <th style="vertical-align:middle; text-align: center;">Category</th>
                                <th style="vertical-align:middle; text-align: center;">Impact</th>
                                <th style="vertical-align:middle; text-align: center;">Likelihood</th>
                                <th style="vertical-align:middle; text-align: center;">Score</th>
                                <th style="vertical-align:middle; text-align: center;">Raised on</th>
                                <th style="vertical-align:middle; text-align: center;">Next Assessment</th>
                              </tr>
                            </thead>
                            <tbody id="riskTableBody">
                              	<jsp:include
																	page="../organization/templates/summaryTable.jsp"></jsp:include>
																<script id="summary-template-parent"
																	type="x-tmpl-mustache">
													{{{bodyRows}}}
												</script>
                            </tbody>
                          </table>
          </div>
          </div>
       
        </div>
      </div>
    </div>
  </div>


  <!-- Activity Pop Up -->
   <div class="modal fade sub_activitie_view_popup" tabindex="-1"
						role="dialog" aria-labelledby="myLargeModalLabel_1"
						aria-hidden="true">
						<div class="modal-dialog modal-dialog-centered">
							<div class="modal-content">
								<div class="modal-header modalheadercolor">
									<h6 class="modal-title" id="myLargeModalLabel">View
										Activitives</h6>
									<button type="button" class="close" data-dismiss="modal"
										aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="col-lg-12 col-md-12 sub_initiatives">
									<div class="card">
										<!--<div class="header d-flex flex-row">
											<h5 class="prob d-flex flex-fill">
												<strong id="initactivitiesviewheader"></strong>
											</h5>
										</div>-->
										<div
											class="d-flex flex-column employee_div_body_box activities-box"
											id="activities-box_view"></div>
									</div>
								</div>
							</div>
						</div>
					</div>


  <!-- Sub Initiative View Pop Up -->
     <div id="" class="modal custom-modal fade sub_initative_view_popup" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">View Sub Initatives</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card border-0">
            <div class="card-body">
              <div id="subinitiaties-row-box_view"></div>
             
            </div>

          </div>

        </div>
      </div>
    </div>
  </div>

  <!-- Milestone View Pop Up -->
    <div id="sub_milestone_view_popup" class="modal custom-modal fade milestones_view_popup" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title fs-5">View Milestones</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card border-0">
            <div class="card-body">
              <div id="emp_milestone_view"></div>
             
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>


  <!-- Comments Pop Up -->
     <div id="risksum_comments_view_popup" class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">View Comments</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body msg-body">

          <ul class="ps-0">
            <li class="sender">
              <div class="user">
                <img src="assets/images/man.jpg">
              </div>
              <div class="comments">
                <div class="title">
                  <p class="m-0 name">John</p>
                  <p class="m-0 date">02, 12 2024</p>
                </div>
                <div class="comment">
                  <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus lectus in
                    lorem pulvinar accumsan. In metus nibh, scelerisque at erat non, suscipit congue
                    lorem. Suspendisse potenti. Fusce iaculis pellentesque elementum. Phasellus non
                    diam vitae mi varius iaculis. Duis in odio urna. Vivamus at nisl quis sapien
                    tempus consequat. Aliquam vitae odio dolor. Proin eu orci non lorem gravida
                    dictum. Proin sit amet mollis tellus. Donec et magna turpis.
                  </p>
                </div>
              </div>
            </li>
            <li class="sender">
              <div class="user">
                <img src="assets/images/man.jpg">
              </div>
              <div class="comments">
                <div class="title">
                  <p class="m-0 name">John</p>
                  <p class="m-0 date">02, 12 2024</p>
                </div>
                <div class="comment">
                  <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus lectus in
                    lorem pulvinar accumsan. In metus nibh, scelerisque at erat non, suscipit congue
                    lorem. Suspendisse potenti. Fusce iaculis pellentesque elementum. Phasellus non
                    diam vitae mi varius iaculis. Duis in odio urna. Vivamus at nisl quis sapien
                    tempus consequat. Aliquam vitae odio dolor. Proin eu orci non lorem gravida
                    dictum. Proin sit amet mollis tellus. Donec et magna turpis.
                  </p>
                </div>
              </div>
            </li>
          </ul>

        </div>
      </div>
    </div>
  </div>


<jsp:include page="../organization/modal/riskDetailModal.jsp"></jsp:include>
  <div id="myrisks-view-modal" class="modal custom-modal fade risk_view_popup" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-lg-600">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">View My Risks</h5>

          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
         <!-- <div class="col-lg-12 col-md-12 sub_initiatives">
														<div class="card">
															<div class="d-flex flex-column employee_div_body_box"
																id="myrisk_view_box"></div>
														</div>
													</div> -->
                           <div class="card border-0">
            <div class="card-body">
              <div id="myrisk_view_box"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
	
	
      <!--#START note Edit Description -->
      <div
        class="modal fade"
        id="note_edit_popup"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel_1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h4>Edit Note</h4>
              <button
                type="button"
                class="close pull-right"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>
            <div class="modal-body">
              <form id="note_comments_Form">
                <div class="row">
                  <div class="form-group col-md-12">
                    <label for="meeting-name">Comment</label>
                    <textarea class="form-control" rows="6" id="notesupdate" name="notesupdate" autocomplete="off"></textarea>
                  </div>
                </div>
                <input type="hidden" name="notes_comments_id" id="notes_comments_id" />
                <input type="hidden" name="action"/>
                <input type="hidden" id="notestatusaction" name="notestatusaction"/>
                <hr/>
                <div class="row m-t-10">
					<div class="col-12">
						<div class="form-line right">
							<button type="button" class="btn-default1 btn" data-dismiss="modal">
							  Cancel
							</button>
							<button class="initative_save_btn" data-i18n="Save">
							  Save
							</button>
						</div>
					</div>
				</div>
              </form>
            </div>
            <div class="modal-footer">
            </div>
          </div>
        </div>
      </div>
      <!--#END note Description -->

	<div id="deleteModalEmployee" class="modal fade">
		<div class="modal-dialog modal-confirm">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Delete</h4>
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">
					<h5 class="confirm-modal-content">Do you really want to delete?</h5>
					<br>
					<div class="form-line right">
						<input type="hidden" id="deleterecordid" /> <input
							type="hidden" id="deleterecordtype" />
						<button type="button" class="btn-default1 btn"
							data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
						<button type="button"
							class="btn btn-danger confirm-modal-deleteBtn"
							onclick="handleemployeeeventdelete()">Delete</button>
					</div>
				</div>
			</div>
		</div>
	</div>
								
	<div class="modal fade appraisal_view_popup" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content">
				<div class="modal-header modalheadercolor">
					<h6 class="modal-title" id="myLargeModalLabel_1">View
						Appraisal</h6>
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="">
					<!---------MileStones-------->
					<div class="col-lg-12 col-md-12 sub_initiatives">
						<div class="card">

							<div class="d-flex flex-column employee_div_body_box">
								<div
									class="d-flex flex-row employe_content_border appraisal_box">
									<div
										class="d-flex flex-column flex-fill profile_content justify-content-center">
										<p>Self</p>
									</div>
									<div class="d-flex flex-column">
										<p>
											<i class="green fas fa-circle"
												style="font-size: 10px !important; padding: 0px 5px 0 0;"></i>
											Completed
										</p>
										<div>
											<strong>Due on 30 Sep 2019</strong>
										</div>
									</div>
								</div>
								<div
									class="d-flex flex-row employe_content_border appraisal_box">
									<div
										class="d-flex flex-column flex-fill profile_content justify-content-center">
										<p>Manager</p>
									</div>
									<div class="d-flex flex-column">
										<p>
											<i class="red fas fa-circle"
												style="font-size: 10px !important; padding: 0px 5px 0 0;"></i>
											Not completed
										</p>
										<div>
											<strong>Due on 30 Sep 2019</strong>
										</div>
									</div>
								</div>
								<div
									class="d-flex flex-row employe_content_border appraisal_box">
									<div
										class="d-flex flex-column flex-fill profile_content justify-content-center">
										<p>Peers</p>
									</div>
									<div class="d-flex flex-column">
										<p>
											<i class="yellow fas fa-circle"
												style="font-size: 10px !important; padding: 0px 5px 0 0;"></i>
											Pending
										</p>
										<div>
											<strong>Due on 30 Sep 2019</strong>
										</div>
									</div>
								</div>
								<div
									class="d-flex flex-row employe_content_border appraisal_box">
									<div
										class="d-flex flex-column flex-fill profile_content justify-content-center">
										<p>Direct Reports</p>
									</div>
									<div class="d-flex flex-column">
										<p>
											<i class="green fas fa-circle"
												style="font-size: 10px !important; padding: 0px 5px 0 0;"></i>
											Completed
										</p>
										<div>
											<strong>Due on 30 Sep 2019</strong>
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

	<div class="modal fade emp_dashborad_comments_view_popup" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header modalheadercolor">
					<h6 class="modal-title" id="myLargeModalLabel_1">View Notes</h6>
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="">
					<div class="col-lg-12 col-md-12 sub_initiatives">
						<div class="card">
							<div class="d-flex flex-column" style="padding:8px !important;">
								<div class="comment-history" id="comment-conversation_1">	
									<ul id="common-comment-conversation_employee" style="border: 1px solid #e9ecef;">
										<div class="emp_comments-row-box_view"></div>
									</ul>
								</div>	
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


	<div class="modal fade emp_activities_comments_view_popup"
		tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
		aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header modalheadercolor">
					<h6 class="modal-title" id="myLargeModalLabel_1">View Notes</h6>
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="">
					<div class="col-lg-12 col-md-12 sub_initiatives">
						<div class="card">
							<div class="d-flex flex-column" style="padding:8px !important;">
								<div class="comment-history" id="comment-conversation_1">	
									<ul id="activitiesview-comment-conversation_employee" style="border: 1px solid #e9ecef;">
										<div class="emp_comments-row-box_view"></div>
									</ul>
								</div>	
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

    <div style="display: none;">
      <jsp:include page="../common/right-navigation.jsp"></jsp:include>
    </div>
	  <jsp:include page="../common/top-navigation.jsp"></jsp:include>
    <header id="header" class="header shadow-sm">
	  
		<jsp:include page="../common/left-navigation.jsp"></jsp:include>
    </header>


	<!--#END View -->
 <main class="pt-2 pb-2">
    <div class="container-lg">
      <div class="page-header grid gap-2 pb-1">
        <div class="g-col-8 d-flex align-items-center">
          <h4 class="title">
            <span class="icon">
              <img src="/stratroom/images/my-workspace-i.svg" alt="User Role" title="User Role">
            </span>
            My Space
          </h4>
        </div>
        <div class="load-page page-actions g-col-4">
          <div class="page-icons">
            <ul>
            
            
              <li>
                <a href="javascript:;" id="popoverFilter">
                  <i class="fas fa-eye" data-bs-toggle="tooltip" data-bs-placement="bottom" aria-label="View" data-bs-original-title="View"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Export">
                    <img src="/stratroom/images/export-i.svg" alt="export" title="export" width="12" height="12">
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="container-lg py-2">
       <div class="card custom-card-tab controlpanel-container">
            <div class="card-header">
              <div class="c-header-left">
                <div class="dropdown dropdown-tab">
                  <button class="btn btn-primary dropdown-toggle d-lg-none" type="button" id="dropdownMenuButton"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    Users
                  </button>
                  <ul class="dropdown-menu nav nav-pills" id="v-pills-tab" role="tablist" aria-orientation="horizontal">
                    <li class="nav-item" role="presentation">
                      <a class="nav-link active" aria-current="page" id="v-pills-Dashboard-tab" data-bs-toggle="pill"
                        href="#v-pills-Dashboard" type="button" role="tab" aria-controls="v-pills-Dashboard"
                        aria-selected="true">Dashboard</a>
                    </li>

                    <!-- <li class="nav-item dropdown dropdown-sub-mobile">
                      <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                        aria-expanded="false">Scorecard</a>
                     <ul style="background: white; min-width: 200px; padding: 5px 0; margin: 0; list-style: none; box-shadow: 0 2px 10px rgba(0,0,0,0.2); border: 1px solid #ddd; border-radius: 4px;">
      <c:if test="${pageList != null}">
        <c:forEach items="${pageList}" var="pageObj">
          <c:if test="${pageObj.pageType eq 'Standard_View'}">
            <li>
              <a style="display: block; padding: 10px 15px; text-decoration: none; color: #333; border-bottom: 1px solid #f5f5f5; cursor: pointer;"
                 href="javascript:void(0)"
                 >
                ${pageObj.pageName}
              </a>
            </li>
          </c:if>
        </c:forEach>
      </c:if>
    </ul>
                    </li> -->

               <li class="nav-item dropdown dropdown-sub-mobile" style="position: relative; display: inline-block;">
                <a class="nav-link dropdown-toggle" href="javascript:void(0)" onclick="toggleDropdown(event)"  aria-expanded="false" style="cursor: pointer;">Scorecard</a>
                
                <div id="scorecard-dropdown-container" style="position: absolute; top: 100%; left: 0; z-index: 9999; display: none;">
                  <ul style="background: white; min-width: 200px; padding: 5px 0; margin: 0; list-style: none; box-shadow: 0 2px 10px rgba(0,0,0,0.2); border: 1px solid #ddd; border-radius: 4px;">
                    <c:if test="${pageList != null}">
                      <c:forEach items="${pageList}" var="pageObj">
                        <c:if test="${pageObj.pageType eq 'Standard_View'}">
                          <li>
                            <a style="display: block; padding: 10px 15px; text-decoration: none; color: #333; border-bottom: 1px solid #f5f5f5; cursor: pointer;"
                              href="javascript:void(0)"
                              id="v-pills-vertical-scorecard-tab"
                              onclick="event.stopPropagation(); showScorecard('${pageObj.id}'); document.getElementById('scorecard-dropdown-container').style.display='none';">
                              ${pageObj.pageName}
                            </a>
                          </li>
                        </c:if>
                      </c:forEach>
                    </c:if>
                  </ul>
                </div>
               </li>

                    
                    <li class="nav-item" role="presentation">
                      <a class="nav-link" aria-current="page" id="v-pills-activities-tab" data-bs-toggle="pill"
                      href="#v-pills-activities" type="button" role="tab" aria-controls="v-pills-activities"
                        aria-selected="true">Activities</a>
                    </li>
                    <li class="nav-item" role="presentation">
                      <a class="nav-link" aria-current="page" id="v-pills-risk-tab" data-bs-toggle="pill"
                      href="#v-pills-risk" type="button" role="tab" aria-controls="v-pills-risk"
                        aria-selected="true">Risk</a>
                    </li>


                     <li class="nav-item" role="presentation">
                      <a class="nav-link" aria-current="page" id="v-pills-risk-tab" data-bs-toggle="pill"
                      href="#v-pills-risk" type="button" role="tab" aria-controls="v-pills-risk"
                        aria-selected="true">Performance Contract</a>
                    </li>

                    <li class="nav-item" role="presentation">
                      <a class="nav-link" aria-current="page" id="v-pills-ducuments-tab" data-bs-toggle="pill"
                      href="#v-pills-ducuments" type="button" role="tab" aria-controls="v-pills-ducuments"
                        aria-selected="true">Ducuments</a>
                    </li>

                  </ul>

                </div>
              </div>
            </div>
            <div class="card-body tab-content horizontal-tab-content" id="v-pills-tabContent">
              <!-- dashboard :::::::::::::::::::::::::::: -->
              <div class="tab-pane fade active show" id="v-pills-Dashboard" role="tabpanel"
                aria-labelledby="v-pills-Dashboard-tab" tabindex="0">
                <div class="card-body myspace-content dashboard">
                  <div class="row g-2">
                    <!-- chart :::::::::::::::::::::::::::: -->
                    <c:if test="${RoleUtil.hasPrivileges('Scorecard','KPI View','View')}">
                      <div class="col-md-6 col-lg-4 dashboardChartView">
                      <div class="card custom-card table-card h-100">
                        <div class="card-header">
                        <div class="heat-map">
                        

                          <select id="employeechart" name="" class="form-select form-select-sm">
                            <!-- <option value="119904">% Customer Satisfaction Index</option>
                            <option value="120062">% Audit Transparency Index</option> -->
                            <c:if test="${kpiList != null}">
                              <c:forEach items="${kpiList}" var="kpiOption">
                                <option value="${kpiOption.id}">${kpiOption.kpiValue.name}</option>
                              </c:forEach>
                            </c:if>
                          </select>
                        </div>
                        <div class="card-actions">
                          <div class="dropdown ">
                          
                        
                                                <buton class="btn btn-sm btn-icon">
                                                  <a href="#" id="chartofkpilastview" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                    <i class="fas fa-chart-line"></i>
                                                  </a>
                                                </button>
                                                  <ul class="dropdown-menu editoptionparentdropdown-menu apexchartsdrop pull-right" x-placement="bottom-start" style="min-width:160px !important;position: absolute;will-change: transform;top: 0px;left: 0px;transform: translate3d(0px, 24px, 0px);">
                                                    <li style="display: flex !important;-webkit-box-orient: horizontal !important;-webkit-box-direction: normal !important;flex-direction: row !important;justify-content: space-evenly;text-align: center;padding: 4px;">
                                                      <a href="#" class="highlightchart" id="columnchrtactive" onclick="drawChartemp('#chartdiv_in',2)" data-toggle="tooltip" title="Column" style="padding:7px 18px;">
                                                        <img src="images/widgets/Column.png" alt="Column Chart" width="13" style="max-width: none !important;"/>
                                                      </a>
                                                      <a href="#" class="highlightchart" id="linechrtactive" onclick="drawChartemp('#chartdiv_in',3)" data-toggle="tooltip" title="Line" style="padding:7px 18px;">
                                                        <img src="images/widgets/Line.png" alt="Line Chart" width="13" style="max-width: none !important;"/>
                                                      </a>
                                                      <a href="#" class="highlightchart" id="areachrtactive" onclick="drawChartemp('#chartdiv_in',4)" data-toggle="tooltip" title="Area" style="padding:7px 18px;">
                                                        <img src="images/widgets/Area.png" alt="Area Chart" width="13" style="max-width: none !important;"/>
                                                      </a>
                                                    </li>
                                                  </ul>
                                                
                                            
                          </div>
                          <c:if test="${RoleUtil.hasPrivileges('Scorecard','KPI View','View')}"> 
                            <div class="dropdown">
                              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                              </button>
                              <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                <li>
                                <a class="dropdown-item" href="#bubble-large" data-bs-toggle="modal" onclick="kpichartviewdetails();">View</a>
                                </li>
                              </ul>
                            </div>
                          </c:if>
                        </div>
                        </div>
                        <div class="card-body">
                        <div id="chartdiv_in"
                                  data-id="1"></div>
                                <div id="chartdiv_expandinit"
                                  style="display: none;"></div>
                        </div>
                      </div>
                      </div>
                    </c:if>
                    <!-- My KPIs :::::::::::::::::::::::::::::::: -->
                    <div class="col-md-6 col-lg-4 dashboardMyKPIsView">
                      <div class="card custom-card table-card h-100">
                        <div class="card-header">
                          <div class="c-header-left">
                            <h5 class="card-title">
                              <strong contenteditable="true" editable="true"
                                onkeypress="return (this.innerText.length <= 25)">My KPIs</strong>
                            </h5>
                          </div>
                          <div class="card-actions">
                            <div class="dropdown">
                              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                aria-expanded="true">
                                <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                              </button>
                              <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                <li>
                                  <a class="dropdown-item" 
                                    onclick="mykpiviewdetails();">View</a>
                                </li>
                                <!-- <li>
                                  <a class="dropdown-item" href="#sub_activitie_view_popup" data-bs-toggle="modal"
                                    onclick="return false;">Delete</a>
                                </li> -->
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div class="card-body overflow-auto" style="height: 310px;">
                            <c:if test="${kpiList != null}">
                                <c:forEach items="${kpiList}" var="kpiObj">
                                    <c:if test="${not empty kpiObj.kpiValue.statusLight}">
                                        <c:if test="${fn:contains(kpiObj.kpiValue.statusLight,'red')}">
                                          <div class="list-group initiatives-bar">
                                              <div class="list-group-item">
                                                  <div class="bar-chart">
                                                      <h4 class="title m-0"><strong>${kpiObj.kpiValue.name}</strong></h4>
                                                      <div class="d-flex justify-content-between gap-2">
                                                          <div class="text-muted"><strong>Actual : ${kpiObj.kpiValue.actual}</strong></div>
                                                          <div class="text-muted text-end"><strong>Target : ${kpiObj.kpiValue.target}</strong></div>
                                                      </div>
                                                  </div>
                                                  <div class="list-actions">
                                                      <c:if test="${RoleUtil.hasPrivileges('Scorecard','KPI View','Update')}">
                                                          <div class="dropdown">
                                                              <a href="#" class="btn btn-sm btn-outline-icon" role="button" id="dropdownMenu1"
                                                                  data-bs-toggle="dropdown" aria-expanded="false">
                                                                  <img width="14" height="14" src="/stratroom/images/menu-dot-vertical-i.svg">
                                                              </a>
                                                              <ul class="dropdown-menu dropdown-menu-end border-0 shadow"
                                                                  aria-labelledby="dropdownMenu1">
                                                                  <c:if test="${RoleUtil.hasPrivileges('Scorecard','KPI View','Update')}">
                                                                      <!-- <li>
                                                                          <a href="#" class="dropdown-item" data-toggle="modal"
                                                                              data-target=".kpi_description_popup"
                                                                              onclick="handleKpiEvent(${kpiObj.id}, 'edit', ${kpiObj.objectiveId})">
                                                                              Edit
                                                                          </a>
                                                                      </li> -->
                                                                  </c:if>
                                                                  <c:if test="${RoleUtil.hasPrivilege('Scorecard','Delete',false)}">
                                                                      <!--  
                                                                      <li>
                                                                          <a href="#delete-modal" class="dropdown-item" data-bs-toggle="modal"
                                                                              onclick="deleteEmploeedahsboard(${kpiObj.id},'kpi');">
                                                                              Delete
                                                                          </a>
                                                                      </li>
                                                                      -->
                                                                  </c:if>
                                                              </ul>
                                                          </div>
                                                      </c:if>
                                                  </div>
                                              </div>
                                            </div>
                                        </c:if>
                                    </c:if>
                                </c:forEach>
                            </c:if>
                        </div>

                      </div>
                    </div>

                    <!-- Goals :::::::::::::::::::::::::::::::: -->
                    <div class="col-md-6 col-lg-4 dashboardGoalsView">
                      <div class="card custom-card table-card h-100">
                        <div class="card-header">
                          <div class="c-header-left">
                            <h5 class="card-title">
                              <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 25)">Goals</strong>
                            </h5>
                          </div>
                       
                          <div class="card-actions">
                            <button class="btn btn-sm btn-icon" data-bs-toggle="modal"
                              data-bs-target=".add_goals_popup" onclick="handleGoalDetailEvent('','add');">
                              <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add" >
                                <i class="fas fa-plus"></i>
                              </span>
                            </button>
                            <div class="dropdown">
                              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                aria-expanded="true">
                                <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                              </button>
                              <c:if test="${RoleUtil.hasPrivileges('My Space','Goals','View')}">
                              <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                <li>
                                  <a class="dropdown-item" href="#goal-view_popup" data-bs-toggle="modal" data-bs-target=".goals_view_popup"
                                     onclick="goalsviewdetails()">View</a>
                                </li>
                               
                              </ul>
                              </c:if>
                            </div>
                          </div>
                        </div>
                        <div class="card-body overflow-auto" style="height: 310px;">
                          <div class="list-group initiatives-bar">
                            <div class="d-flex flex-column employee_div_body_box">
                                <c:if test="${goals != null}">
                                  <c:forEach items="${goals}" var="goal">
                                    <!-- Item -->
                                    <div class="list-group-item">
                                      <div class="bar-chart">
                                        <h4 class="title m-0">${goal.goalsValue.name}</h4>
                                        <div class="progress-wrap ${goal.isStatusRed() ? 'red' : 'yellow'}">
                                          <div class="progress flex-grow-1" style="--stratroom-bg-opacity:1">
                                            <div class="progress-bar progress-bar-striped rounded-pill ${goal.goalsValue.statusLight}" 
                                                role="progressbar" 
                                                data-percent="${goal.goalsValue.progress}"
                                                style="width: ${goal.goalsValue.progress}%">
                                            </div>
                                          </div>
                                          <span class="badge">${goal.goalsValue.progress}%</span>
                                        </div>
                                        <div class="text-muted">Due on ${goal.goalsValue.dateString}</div>
                                      </div>
                                      
                                      <c:if test="${RoleUtil.hasPrivileges('My Space','Goals','Update') || RoleUtil.hasPrivileges('My Space','Goals','Delete')}">
                                        <div class="list-actions">
                                          <div class="dropdown">
                                            <a href="#" class="btn btn-sm btn-outline-icon" role="button" id="dropdownMenu${goal.id}" data-bs-toggle="dropdown" aria-expanded="false">
                                              <img width="14" height="14" src="/stratroom/images/menu-dot-vertical-i.svg">
                                            </a>
                                            <ul class="dropdown-menu dropdown-menu-end border-0 shadow" aria-labelledby="dropdownMenu${goal.id}">
                                              <c:if test="${RoleUtil.hasPrivileges('My Space','Goals','Update')}">
                                                <li>
                                                  <a href="#edit_goal" class="dropdown-item" data-toggle="modal" onclick="handleGoalDetailEvent(${goal.id},'edit');">
                                                    Edit
                                                  </a>
                                                </li>
                                              </c:if>
                                              <c:if test="${RoleUtil.hasPrivileges('My Space','Goals','Delete')}">
                                                <li>
                                                  <a href="#" class="dropdown-item delete-row" onclick="deleteEmploeedahsboard(${goal.id},'goal');">
                                                    Delete
                                                  </a>
                                                </li>
                                              </c:if>
                                            </ul>
                                          </div>
                                        </div>
                                      </c:if>
                                    </div>
                                  </c:forEach>
                                </c:if>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- My Initiative-->
                    <c:if test="${RoleUtil.hasPrivileges('Initiatives & Projects','Initiatives','View')}">
                      <div class="col-md-6 col-lg-4 dashboardMyInitiativeView">
                        <div class="card custom-card table-card h-100">
                          <div class="card-header">
                            <div class="c-header-left">
                              <h5 class="card-title">
                                <strong contenteditable="true" editable="true"
                                  onkeypress="return (this.innerText.length <= 25)">My
                                  Initiative</strong>
                              </h5>
                            </div>
                            <div class="card-actions">
                              <div class="dropdown">
                                <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                  aria-expanded="true">
                                  <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                  <li>
                                    <a class="dropdown-item" href="#view-myinitative-modal" data-bs-toggle="modal" data-bs-target=".my_initative_view_popup"
                                       onclick="myinitiativeEmpView()">View</a>
                                  </li>
                                </ul>
                              </div>
                            </div>

                          </div>

                          <div class="card-body overflow-auto" style="height: 310px;">
                            <div class="list-group initiatives-bar">
                              <c:if test="${myInitiativesList != null}">
                                <c:forEach items="${myInitiativesList}" var="initiativesObj">
                                  <c:if test="${initiativesObj.isStatusRed()}">
                                    <div class="list-group-item">
                                      <div class="bar-chart">
                                        <h4 class="title m-0" style="cursor:pointer" data-id="${initiativesObj.pageId}" data-initiativeid="${initiativesObj.id}" class="initiativenavigate">
                                          ${initiativesObj.initiativeValue.name}
                                        </h4>
                                        <div class="progress-wrap ${initiativesObj.isStatusRed() ? 'red' : ''}">
                                          <div class="progress flex-grow-1" style="--stratroom-bg-opacity:1">
                                            <div class="progress-bar progress-bar-striped rounded-pill incomplete_bar" 
                                                role="progressbar" 
                                                data-percent="${initiativesObj.initiativeValue.progressval}"
                                                style="width: ${initiativesObj.initiativeValue.progressval}%">
                                            </div>
                                          </div>
                                          <span class="badge">${initiativesObj.initiativeValue.progressval}%</span>
                                        </div>
                                        <div class="text-muted">${initiativesObj.initiativeValue.dateString}</div>
                                      </div>

                                      <c:if test="${RoleUtil.hasPrivileges('Initiatives & Projects','Initiatives','Update')}">
                                        <div class="list-actions">
                                          <div class="dropdown">
                                            <a href="#" class="btn btn-sm btn-outline-icon" role="button" 
                                              id="dropdownMenu${initiativesObj.id}" data-bs-toggle="dropdown" 
                                              aria-expanded="false">
                                              <img width="14" height="14" src="/stratroom/images/menu-dot-vertical-i.svg">
                                            </a>
                                            <ul class="dropdown-menu dropdown-menu-end border-0 shadow" 
                                                aria-labelledby="dropdownMenu${initiativesObj.id}">
                                              <c:if test="${RoleUtil.hasPrivileges('Initiatives & Projects','Initiatives','Update')}">
                                                <!-- <li>
                                                  <a href="#edit-myinitative-list-modal" class="dropdown-item" 
                                                    data-toggle="modal" data-target=".initatives_description_popup"
                                                    onClick="handleinitiativeevent('${initiativesObj.id}', 'edit')">
                                                    Edit
                                                  </a>
                                                </li> -->
                                              </c:if>
                                              <c:if test="${RoleUtil.hasPrivilege('Initiatives & Projects','Delete',false)}">
                                               
                                              </c:if>
                                            </ul>
                                          </div>
                                        </div>
                                      </c:if>
                                    </div>
                                  </c:if>
                                </c:forEach>
                              </c:if>
                            </div>
                          </div>

                        </div>
                      </div>
                    </c:if>


                    <!-- My Risks-->
                     <c:if test="${RoleUtil.hasPrivileges('Risk','Risk','View')}">
                        <div class="col-md-6 col-lg-4 dashboardMyRisksView">
                          <div class="card custom-card table-card h-100">
                            <div class="card-header">
                              <div class="c-header-left">
                                <h5 class="card-title">
                                  <strong editable="true" contenteditable="true"
                                    onkeypress="return (this.innerText.length <= 36)">My Risks</strong>
                                </h5>
                              </div>
                              <div class="card-actions">
                                <c:if test="${RoleUtil.hasPrivileges('Risk','Risk','View')}"> 
                                  <div class="dropdown">
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                      aria-expanded="true">
                                      <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                      <li>
                                        <a class="dropdown-item" href="#myrisks-view-modal" data-bs-toggle="modal" data-bs-target=".risk_view_popup"
                                          onclick="riskListviewdetails()">View</a>
                                      </li>
                                    </ul>
                                  </div>
                                </c:if>
                              </div>

                            </div>

                            <div class="card-body overflow-auto" style="height: 310px;">
                              <div class="list-group initiatives-bar">
                             <c:if test="${riskDetailList != null}">
                                <c:forEach items="${riskDetailList}" var="risk">
                                  <c:if test="${risk.riskValue.likeliHood == 'Possible' || risk.riskValue.likeliHood == 'Likely' || risk.riskValue.likeliHood == 'Almost Certain' || risk.riskValue.likeliHood == 'Rare' || risk.riskValue.likeliHood == 'Unlikely'}">
                                    <div class="list-group-item">
                                      <div class="bar-chart">
                                        <div class="d-flex gap-2">
                                          <h4 class="title mb-0">${risk.riskValue.name}</h4>
                                          <span class="badge label-bg-dark rounded-pill ms-auto">${risk.riskValue.score}</span>
                                        </div>
                                        
                                        <div class="numbers">
                                          <div class="text-muted left">${risk.riskValue.riskStatus}</div>
                                          <div class="text-muted right">${risk.riskValue.dateString}</div>
                                        </div>
                                      </div>
                                      
                                      <c:if test="${RoleUtil.hasPrivileges('Risk','Risk','Update')}">
                                        <div class="list-actions">
                                          <div class="dropdown">
                                            <a href="#" class="btn btn-sm btn-outline-icon" role="button" 
                                              id="dropdownMenu${risk.id}" data-bs-toggle="dropdown" 
                                              aria-expanded="false">
                                              <img width="14" height="14" src="/stratroom/images/menu-dot-vertical-i.svg">
                                            </a>
                                            <ul class="dropdown-menu dropdown-menu-end border-0 shadow" 
                                                aria-labelledby="dropdownMenu${risk.id}">
                                              <c:if test="${RoleUtil.hasPrivileges('Risk','Risk','Update')}">
                                                <!-- <li>
                                                  <a href="#myrisks-edit-modal" class="dropdown-item" 
                                                    data-toggle="modal"
                                                    data-target=".riskDetail_description_popup"
                                                    onclick="handleRiskDetailEvent(${risk.id},'edit')"
                                                    >
                                                    Edit
                                                  </a>
                                                </li> -->
                                              </c:if>
                                              <c:if test="${RoleUtil.hasPrivilege('Risk','Delete',false)}">
                                                <li>
                                                  <a href="#delete-modal" class="dropdown-item" 
                                                    data-bs-toggle="modal"
                                                    onclick="deleteEmploeedahsboard(${risk.id},'risk')">
                                                    Delete
                                                  </a>
                                                </li>
                                              </c:if>
                                            </ul>
                                          </div>
                                        </div>
                                      </c:if>
                                    </div>
                                  </c:if>
                                </c:forEach>
                             </c:if>

                              </div>
                            </div>

                          </div>
                        </div>
                     </c:if> 
                    <!-- Notes :::::::::::::::::::::::::::::::: -->
                    <!-- Comment Section -->
                    <div class="col-md-6 col-lg-4 dashboardCommentsView">
                      <div class="card custom-card table-card h-100">
                        <div class="card-header">
                          <div class="c-header-left">
                            <h5 class="card-title">
                              <strong class="editableTxt1" 
                                      onkeypress="return (this.innerText.length <= 25)" 
                                      id="empcommentsHeader" 
                                      editable="true">Comments</strong>
                            </h5>
                          </div>
                          <div class="card-actions">
                            <div class="dropdown">
                              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                              </button>
                              <ul class="dropdown-menu dropdown-menu-end">
                                <li>
                                  <a href="#" class="dropdown-item" data-bs-toggle="modal" 
                                    onclick="empDashboardcommentsviewdetails()">
                                    View
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div class="card-body overflow-auto comment-history comments-list" id="comment-conversation_1" style="height: 262px;">
                          <c:if test="${commentsList != null}">
                            <c:forEach items="${commentsList}" var="commentsObj">
                              <c:if test="${fn:contains(commentsObj.commentsValue.statusaction,'employeeDashboard')}">
                                <div class="comment">
                                  <div class="comment-content">
                                    <div class="comment-card">
                                      <div class="flex-column comment_image">
                                        <c:if test="${not empty commentsObj.commentsValue.commentsImage}">
                                          <img src="${commentsObj.commentsValue.commentsImage}" class="user-img" width="28" height="28" alt="User">
                                        </c:if>
                                        <c:if test="${empty commentsObj.commentsValue.commentsImage}">
                                          <div class="initials-avatar" 
                                              data-name="${commentsObj.commentsValue.createdByName}" 
                                              style="width: 28px; height: 28px; border-radius: 50%; background-color: #ccc; 
                                                      display: flex; align-items: center; justify-content: center;
                                                      color: #fff; font-weight: bold; font-size: 10px;">
                                          
                                          </div>
                                        </c:if>
                                      </div>
                                      
                                      <div class="comment-cr">
                                        <div class="comment-highlight">
                                          <div class="comment-head">
                                            <h6 class="user-name">${commentsObj.commentsValue.createdByName}, ${commentsObj.commentsValue.title}</h6> 
                                            <span class="comment-time">
                                              <c:if test="${not empty commentsObj.commentsValue.formattedDateTime}">
                                                <script>document.write(formatofAmPm(new Date('${commentsObj.commentsValue.formattedDateTime}'))</script>
                                              </c:if>
                                              <c:if test="${empty commentsObj.commentsValue.formattedDateTime}">
                                                <script>document.write(formatofAmPm(new Date('${commentsObj.createdTime}'))</script>
                                              </c:if>
                                            </span>
                                          </div>
                                          <div class="comment-text">${commentsObj.commentsValue.desc}</div>
                                        </div>
                                        <div class="comment-actions">
                                            <span class="like-btn">Like</span>
                                            <span class="like-count">0</span>
                                            <span class="reply-btn">Reply</span>
                                            <span class="edit-btn">Edit</span>
                                            <span class="delete-btn">Delete</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </c:if>
                            </c:forEach>
                          </c:if>
                        </div>
                        
                        <div class="card-footer comment_send">
                          <div class="input-group">
                            <input type="text" data-name="employeeDashboard" 
                                  id="empDashboardComments" 
                                  class="form-control comment-input" 
                                  placeholder="Type a comment..." 
                                  autocomplete="off">
                            <button class="btn label-bg-primary post-comment" type="button"
                                    onclick="handleEmployeeCommentsSave('add','employeeDashboard')">
                              <i class="fas fa-arrow-right"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                   
                
                    
                </div>
              </div>
              </div>

              <!-- Scorecard Tab Content -->
              <div class="tab-pane fade" id="v-pills-vertical-scorecard" role="tabpanel"
                aria-labelledby="v-pills-vertical-scorecard-tab" tabindex="0">
                <div class="card custom-card-tab">
                  <div class="card-header p-0">
                      <div class="c-header-left">
                          <div class="dropdown dropdown-tab dropdown-tab-ellipsis" id="tab-navigationWrap"></div>
                      </div>
                  </div>
  
                  <div class="card-body scorecard-tabcontent" id="scorecard-tabcontent"></div>
              </div>
              </div>
              

             
             
              <!-- activities :::::::::::::::::::::::::::: -->
              <div class="tab-pane fade" id="v-pills-activities" role="tabpanel"
                aria-labelledby="v-pills-activities-tab" tabindex="0">
                <div class="card-body myspace-content sales-scorecard">
                  <div class="row g-2">
                    <!-- My Initiatives :::::::::::::::::::::::::::::::: -->
                    <div class="col-md-6 col-lg-4 activitiesInitiativesView">
                      <div class="card custom-card table-card h-100">
                        <div class="card-header">
                          <div class="c-header-left">
                            <h5 class="card-title">
                              <strong editable="true" contenteditable="true"
                                onkeypress="return (this.innerText.length <= 36)">Initiatives</strong>
                            </h5>
                          </div>


                          <div class="card-actions">
                            <div class="dropdown">
                              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                aria-expanded="true">
                                <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                              </button>
                              <c:if test="${RoleUtil.hasPrivileges('Initiatives & Projects','Initiatives','View')}">
                                <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                  <li>
                                    <a class="dropdown-item" href="#" data-bs-toggle="modal"
                                    data-bs-target=".my_initative_view_popup"
                                     onclick="initiativeEmpView()">View</a>
                                  </li>
                                  <!-- <li>
                                    <a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal"
                                      onclick="return false;">Delete</a>
                                  </li> -->
                                </ul>
                              </c:if>
                            </div>
                          </div>


                        </div>

                        <div class="card-body overflow-auto" style="height: 340px;">
                          <div class="list-group initiatives-bar">
                            <c:if test="${initiativesList != null}">
                              <c:forEach items="${initiativesList}" var="initiativesObj">
                                <div class="list-group-item">
                                  <div class="bar-chart">
                                    <div class="d-flex gap-2 align-items-start justify-content-between">
                                      <h4 class="title m-0 initiativenavigate" 
                                          style="cursor:pointer" 
                                          data-id="${initiativesObj.pageId}" 
                                          data-initiativeid="${initiativesObj.id}">
                                        ${initiativesObj.initiativeValue.name}
                                      </h4>
                                      <div class="d-flex align-items-start">
                                        <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
                                          <!-- Avatar placeholder - you can add dynamic avatars here if needed -->
                                          <li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip"
                                              data-bs-placement="top" title="Team Member">
                                            <img src="/stratroom/images/user-placeholder.jpg" class="rounded-circle" 
                                                alt="Team Member" width="24" height="24">
                                          </li>
                                        </ul>
                                      </div>
                                    </div>

                                    <div class="progress-wrap">
                                      <div class="progress flex-grow-1">
                                        <div class="progress-bar progress-bar-striped rounded-pill ${initiativesObj.initiativeValue.statusLight}" 
                                            role="progressbar"
                                            style="width: ${initiativesObj.initiativeValue.progressval}%" 
                                            data-percent="${initiativesObj.initiativeValue.progressval}"
                                            aria-valuenow="${initiativesObj.initiativeValue.progressval}" 
                                            aria-valuemin="0" 
                                            aria-valuemax="100">
                                        </div>
                                      </div>
                                      <span class="badge">${initiativesObj.initiativeValue.progressval}%</span>
                                    </div>
                                    <span class="text-muted">Due By : ${initiativesObj.initiativeValue.dateString}</span>
                                  </div>
                                  
                                  <!-- <c:if test="${RoleUtil.hasPrivileges('Initiatives & Projects','Initiatives','Update')}">
                                    <div class="list-actions">
                                      <div class="dropdown">
                                        <button class="btn btn-sm btn-outline-icon" type="button" 
                                                data-bs-toggle="dropdown" aria-expanded="true">
                                          <img width="14" height="14" src="/stratroom/images/menu-dot-vertical-i.svg">
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                          <c:if test="${RoleUtil.hasPrivileges('Initiatives & Projects','Initiatives','Update')}">
                                            <li>
                                              <a class="dropdown-item" href="#initatives-edit-modal" 
                                                data-bs-toggle="modal"
                                                onClick="handleinitiativeevent('${initiativesObj.id}', 'edit')">
                                                Edit
                                              </a>
                                            </li>
                                          </c:if>
                                          <c:if test="${RoleUtil.hasPrivilege('Initiatives & Projects','Delete',false)}">
                                           
                                          </c:if>
                                        </ul>
                                      </div>
                                    </div>
                                  </c:if> -->
                                </div>
                              </c:forEach>
                            </c:if>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Sub Initiatives -->
                    <c:if test="${RoleUtil.hasPrivileges('Initiatives & Projects','Sub Initiatives','View')}">
                      <div class="col-md-6 col-lg-4 activitiesSubView">
                        <div class="card custom-card table-card h-100">
                          <div class="card-header">
                            <div class="c-header-left">
                              <h5 class="card-title">
                                <strong editable="true" contenteditable="true"
                                  onkeypress="return (this.innerText.length <= 36)">Sub Initiative & Activities</strong>
                              </h5>


                            </div>

                            <div class="card-actions">

                              <button class="btn btn-sm btn-icon" data-bs-toggle="modal"
                                data-bs-target="#subinitative-add-modal">
                                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                                  <i class="fas fa-plus"></i>
                                </span>
                              </button>
                              <div class="dropdown">
                                <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                  aria-expanded="true">
                                  <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                                </button>
                                <c:if test="${RoleUtil.hasPrivileges('Initiatives & Projects','Sub Initiatives','View')}">
                                  <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                    <li>
                                      <a class="dropdown-item" href="#"
                                        data-bs-target=".sub_initative_view_popup"
                                        data-bs-toggle="modal" onclick="subinitiatiesviewdetails('','employee');">View</a>
                                    </li>
                                    <!-- <li>
                                      <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                    </li> -->
                                  </ul>
                                </c:if>
                              </div>
                            </div>
                          </div>
                         <div class="card-body overflow-auto" style="height: 340px;">
                            <div class="list-group initiatives-bar">
                              <c:if test="${subInitiativesList != null}">
                                <c:forEach items="${subInitiativesList}" var="subInitiativesObj">
                                  <div class="list-group-item">
                                    <div class="bar-chart">
                                      <div class="d-flex gap-2 align-items-start justify-content-between">
                                        <h4 class="title m-0">
                                          <c:if test="${not empty subInitiativesObj.subInitiativeValue.description}">
                                            ${subInitiativesObj.subInitiativeValue.description}
                                          </c:if>
                                        </h4>
                                        <div class="list-actions">
                                          <div class="d-flex align-items-start">
                                            <!-- Avatar group placeholder - you can implement dynamic avatars here -->
                                            <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
                                              <li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip" data-bs-placement="top" title="Team Member">
                                                <img src="/stratroom/images/user-placeholder.jpg" class="rounded-circle" alt="Team Member" width="24" height="24">
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>

                                      <div class="progress-wrap">
                                        <div class="progress flex-grow-1" style="--stratroom-bg-opacity:1">
                                          <div class="progress-bar progress-bar-striped rounded-pill ${subInitiativesObj.subInitiativeValue.statusLight}" 
                                              role="progressbar"
                                              style="width: ${subInitiativesObj.subInitiativeValue.progressval}%" 
                                              data-percent="${subInitiativesObj.subInitiativeValue.progressval}"
                                              aria-valuenow="${subInitiativesObj.subInitiativeValue.progressval}" 
                                              aria-valuemin="0" 
                                              aria-valuemax="100">
                                          </div>
                                        </div>
                                        <span class="badge">${subInitiativesObj.subInitiativeValue.progressval}%</span>
                                      </div>
                                      <span class="text-muted">Due By: ${subInitiativesObj.subInitiativeValue.dateString}</span>
                                    </div>
                                    
                                    <!-- <c:if test="${RoleUtil.hasPrivileges('Initiatives & Projects','Sub Initiatives','Update')}">
                                      <div class="list-actions">
                                        <div class="dropdown">
                                          <button class="btn btn-sm btn-outline-icon" type="button" 
                                                  data-bs-toggle="dropdown" aria-expanded="true">
                                            <img width="14" height="14" src="/stratroom/images/menu-dot-vertical-i.svg">
                                          </button>
                                          <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                            <c:if test="${RoleUtil.hasPrivileges('Initiatives & Projects','Sub Initiatives','Update')}">
                                              <li>
                                                <a class="dropdown-item" href="#sub_initative_edit_popup" 
                                                  data-bs-toggle="modal"
                                                  onclick="handlesubinitiativeevent('${subInitiativesObj.initiativeId}',${subInitiativesObj.id}, 'edit')">
                                                  Edit
                                                </a>
                                              </li>
                                            </c:if>
                                            <c:if test="${RoleUtil.hasPrivilege('Initiatives & Projects','Delete',false)}">
                                              
                                            </c:if>
                                          </ul>
                                        </div>
                                      </div>
                                    </c:if> -->
                                  </div>
                                </c:forEach>
                              </c:if>
                            </div>
                          </div>
                        </div>
                      </div>
                    </c:if>
                    <!-- Activities :::::::::::::::::::::::::::::::: -->
                    <c:if test="${RoleUtil.hasPrivileges('Initiatives & Projects','Activities','View')}">
                        <div class="col-md-6 col-lg-4 activitiesMilestoneView">
                      <div class="card custom-card table-card h-100">
                        <div class="card-header">
                          <div class="c-header-left">
                            <h5 class="card-title">
                              <strong editable="true" contenteditable="true"
                                onkeypress="return (this.innerText.length <= 36)">Activities</strong>

                            </h5>
                          </div>
                          <div class="card-actions">

                            <button class="btn btn-sm btn-icon" data-bs-toggle="modal"
                              data-bs-target="#milestone-add-modal">
                              <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                                <i class="fas fa-plus"></i>
                              </span>
                            </button>
                            <div class="dropdown">
                              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                aria-expanded="true">
                                <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                              </button>
                              <c:if
												test="${RoleUtil.hasPrivileges('Initiatives & Projects','Activities','View')}">
                              <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                <li>
                                  <a class="dropdown-item" href="#"
                                    data-bs-target=".sub_activitie_view_popup"
                                    data-bs-toggle="modal" onclick="activitiesviewdetails();">View</a>
                                </li>
                                
                              </ul>
                              </c:if>
                            </div>
                          </div>
                        </div>
                        <div class="d-flex flex-column employee_div_body_box">
											<c:if test="${activitiesList != null}">
												<c:forEach items="${activitiesList}" var="activitiesObj">
													<div
														class="d-flex flex-row employe_content_border goal_row_box">
														<div class="d-flex flex-column flex-fill profile_content">
															<div class="d-flex flex-row">
																<p>${activitiesObj.activitiesValue.desc}</p>
															</div>
															<div class="d-flex flex-row">
																<div class="d-flex flex-column flex-fill">
																	<div class="d-flex flex-row">
																		<div class="icon">
																			<div id="one"
																				class="chart_orange_${activitiesObj.id} chart-pie_${activitiesObj.id}"></div>
																		</div>
																		<div class="pie-progress">${activitiesObj.activitiesValue.progress}%</div>
																	</div>
																</div>
																<div class="d-flex flex-column">
																	<div>
																		<strong style="color: #bdbdbd;">Due on <br></strong>
																		<strong>${activitiesObj.activitiesValue.dateString}</strong>
																	</div>
																</div>
															</div>
														</div>

														<!-- <div class="flex-column">
															<c:if
																test="${RoleUtil.hasPrivileges('Initiatives & Projects','Activities','Update')}">
																<ul class="header-dropdown m-r--2 d-flex">
																	<li class="dropdown"><a href="#"
																		onclick="return false;" class="dropdown-toggle"
																		data-toggle="dropdown" role="button"
																		aria-haspopup="true" aria-expanded="true"> <i
																			class="material-icons">more_vert</i>
																	</a>
																		<ul class="dropdown-menu editoptionparentdropdown-menu pull-right"
																			x-placement="bottom-start"
																			style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
																			<c:if
																				test="${RoleUtil.hasPrivileges('Initiatives & Projects','Activities','Update')}">
																				<li><a href="#" data-toggle="modal"
																					data-target=".sub_activities_popup"
																					onclick="handleActivitiesEvent('${activitiesObj.initiativeId}',${activitiesObj.id}, 'edit')">Edit</a>
																				</li>
																			</c:if>
																			<c:if
																				test="${RoleUtil.hasPrivilege('Initiatives & Projects','Delete',false)}">
																				
																			</c:if>
																		</ul></li>
																</ul>
															</c:if>
														</div> -->
													</div>
												</c:forEach>
											</c:if>
										</div>
                      </div>
                    </div>
                    </c:if>

                    <!-- Milestones :::::::::::::::::::::::::::::::: -->
                    <div class="col-md-6 col-lg-4 activitiesMilestoneView">
                      <div class="card custom-card table-card h-100">
                        <div class="card-header">
                          <div class="c-header-left">
                            <h5 class="card-title">
                              <strong editable="true" contenteditable="true"
                                onkeypress="return (this.innerText.length <= 36)">Milestones</strong>

                            </h5>
                          </div>
                          <div class="card-actions">

                            <button class="btn btn-sm btn-icon" data-bs-toggle="modal"
                              data-bs-target="#milestone-add-modal">
                              <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                                <i class="fas fa-plus"></i>
                              </span>
                            </button>
                            <div class="dropdown">
                              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                aria-expanded="true">
                                <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                              </button>
                              <c:if
													test="${RoleUtil.hasPrivileges('Initiatives & Projects','Milestones','View')}">
                              <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                <li>
                                  <a class="dropdown-item" href="#"
                                    data-bs-target=".milestones_view_popup"
                                    data-bs-toggle="modal" onclick="empmilstoneviewdetails();">View</a>
                                </li>
                                <!-- <li>
                                  <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                </li> -->
                              </ul>
                              </c:if>
                            </div>
                          </div>
                        </div>
                        <div class="card-body employee_div_body_box sub-ini-box overflow-auto" style="height: 340px;">
                          <div class="list-group initiatives-bar">
                            <c:if test="${mileStonesList != null}">
                              <c:forEach items="${mileStonesList}" var="mileStonesObj">
                                <div class="list-group-item">
                                  <div class="bar-chart">
                                    <div class="d-flex gap-2 align-items-start">
                                      <h4 class="title m-0">${mileStonesObj.mileStonesValue.desc}</h4>
                                      <c:choose>
                                        <c:when test="${mileStonesObj.mileStonesValue.statusLight.contains('green')}">
                                          <span class="badge text-bg-success rounded-pill ms-auto">Completed</span>
                                        </c:when>
                                        <c:when test="${mileStonesObj.mileStonesValue.statusLight.contains('yellow')}">
                                          <span class="badge text-bg-warning rounded-pill ms-auto">In Progress</span>
                                        </c:when>
                                        <c:otherwise>
                                          <span class="badge text-bg-danger rounded-pill ms-auto">Pending</span>
                                        </c:otherwise>
                                      </c:choose>
                                    </div>

                                    <div class="progress-wrap">
                                      <div class="progress flex-grow-1">
                                        <div class="progress-bar progress-bar-striped rounded-pill ${mileStonesObj.mileStonesValue.statusLight}" 
                                            role="progressbar"
                                            style="width: ${mileStonesObj.mileStonesValue.progress}%" 
                                            data-percent="${mileStonesObj.mileStonesValue.progress}"
                                            aria-valuenow="${mileStonesObj.mileStonesValue.progress}" 
                                            aria-valuemin="0" 
                                            aria-valuemax="100">
                                        </div>
                                      </div>
                                      <span class="badge">${mileStonesObj.mileStonesValue.progress}%</span>
                                    </div>
                                    <span class="text-muted">${mileStonesObj.mileStonesValue.dateString}</span>
                                  </div>
                                  
                                  <!-- <c:if test="${RoleUtil.hasPrivileges('Initiatives & Projects','Milestones','Update')}">
                                    <div class="list-actions">
                                      <div class="dropdown">
                                        <button class="btn btn-sm btn-outline-icon" type="button" 
                                                data-bs-toggle="dropdown" aria-expanded="true">
                                          <img width="14" height="14" src="/stratroom/images/menu-dot-vertical-i.svg">
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                          <c:if test="${RoleUtil.hasPrivileges('Initiatives & Projects','Milestones','Update')}">
                                            <li>
                                              <a class="dropdown-item" href="#milestone-add-modal" 
                                                data-bs-toggle="modal"
                                                onclick="handleMileStonesEvent('${mileStonesObj.initiativeId}',${mileStonesObj.id}, 'edit')">
                                                Edit
                                              </a>
                                            </li>
                                          </c:if>
                                          <c:if test="${RoleUtil.hasPrivilege('My Space','Delete',false)}">
                                            
                                          </c:if>
                                        </ul>
                                      </div>
                                    </div>
                                  </c:if> -->
                                </div>
                              </c:forEach>
                            </c:if>
                          </div>
                        </div>
                      </div>
                    </div>
                 
                    <!-- Comments :::::::::::::::::::::::::::::::: -->
                    <div class="col-md-6 col-lg-4 activitiesCommentsView">
                      <div class="card custom-card table-card h-100">
                        <div class="card-header">
                          <div class="c-header-left">
                            <h5 class="card-title">
                              <strong editable="true" contenteditable="true"
                                onkeypress="return (this.innerText.length <= 36)">Comments</strong>
                            </h5>
                          </div>
                          <div class="card-actions">
                            <div class="dropdown">
                              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                aria-expanded="true">
                                <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                              </button>
                              <ul class="dropdown-menu dropdown-menu-end">
                                <li>
                                  <a href="#comments_view_popup" class="dropdown-item" data-bs-toggle="modal"
                                    onclick="return false;">
                                    View
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>

                        </div>


                        <div class="card-body overflow-auto comment-history comments-list" id="comment-conversation_1"
                          style="height: 262px;">



                          <div class="comment">
                            <div class="comment-content">
                              <div class="comment-card">
                                <img src="assets/images/user/usrbig6.jpg" class="user-img" width="28" height="28"
                                  alt="User">
                                <div class="comment-cr">
                                  <div class="comment-highlight">
                                    <div class="comment-head">
                                      <h6 class="user-name">karthik Ramani, CEO</h6> <span class="comment-time">11:44
                                        PM</span>
                                    </div>
                                    <div class="comment-text">It is a long established fact that a reader will be
                                      distracted by the
                                      readable content of a page when looking at its layout. The point of using Lorem
                                      Ipsum is that
                                      it has a more-or-less normal distribution of letters, as opposed to using 'Content
                                      here,
                                      content here', making it look like readable English.</div>
                                  </div>
                                  <div class="comment-actions">
                                    <span class="like-btn">Like</span> ·
                                    <span class="like-count">0</span> ·
                                    <span class="reply-btn">Reply</span> ·
                                    <span class="edit-btn">Edit</span> ·
                                    <span class="delete-btn">Delete</span>
                                  </div>
                                </div>
                              </div>
                              <div class="reply-section" style="display: none;">
                                <input type="text" class="form-control reply-input" placeholder="Write a reply...">
                                <button class="btn btn-sm label-bg-primary reply-post"><i
                                    class="fas fa-arrow-right"></i></button>
                              </div>
                            </div>
                            <div class="replies">
                              <div class="reply">
                                <div class="reply-content">
                                  <div class="reply-card">

                                    <img src="assets/images/user/usrbig6.jpg" class="user-img" alt="User">
                                    <div class="comment-cr">
                                      <div class="comment-highlight">
                                        <div class="comment-head">
                                          <h6 class="user-name">Saj Abraham</h6> <span class="comment-time">11:44
                                            PM</span>
                                        </div>
                                        <div class="comment-text">Contrary to popular belief, Lorem Ipsum is not simply
                                          random text.
                                          It has roots in a piece of classical Latin literature from 45 BC, making it
                                          over 2000
                                          years old.</div>
                                      </div>
                                      <div class="comment-actions">
                                        <span class="like-btn">Like</span> ·
                                        <span class="like-count">0</span> ·
                                        <span class="reply-btn">Reply</span> ·
                                        <span class="edit-btn">Edit</span> ·
                                        <span class="delete-btn">Delete</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="reply-section" style="display: none;">
                                    <input type="text" class="form-control reply-input" placeholder="Write a reply...">
                                    <button class="btn btn-sm label-bg-primary reply-post"><i
                                        class="fas fa-arrow-right"></i></button>
                                  </div>
                                </div>
                                <div class="replies">
                                  <div class="reply">
                                    <div class="reply-content">
                                      <div class="reply-card">

                                        <img src="assets/images/user/usrbig6.jpg" class="user-img" alt="User">
                                        <div class="comment-cr">
                                          <div class="comment-highlight">
                                            <div class="comment-head">
                                              <h6 class="user-name">Saj Abraham</h6> <span class="comment-time">11:45
                                                PM</span>
                                            </div>
                                            <div class="comment-text">The standard chunk of Lorem Ipsum used since the
                                              1500s is
                                              reproduced below for those interested.</div>
                                          </div>
                                          <div class="comment-actions">
                                            <span class="like-btn">Like</span> ·
                                            <span class="like-count">0</span> ·
                                            <span class="reply-btn">Reply</span> ·
                                            <span class="edit-btn">Edit</span> ·
                                            <span class="delete-btn">Delete</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="reply-section" style="display: none;">
                                        <input type="text" class="form-control reply-input"
                                          placeholder="Write a reply...">
                                        <button class="btn btn-sm label-bg-primary reply-post"><i
                                            class="fas fa-arrow-right"></i></button>
                                      </div>
                                    </div>
                                    <div class="replies"></div> 
                                  </div>
                                </div> 
                              </div>
                            </div> 
                          </div>
                          <div class="comment">
                            <div class="comment-content">
                              <div class="comment-card">
                                <img src="assets/images/user/usrbig6.jpg" class="user-img" width="28" height="28"
                                  alt="User">
                                <div class="comment-cr">
                                  <div class="comment-highlight">
                                    <div class="comment-head">
                                      <h6 class="user-name">karthik Ramani, CEO</h6> <span class="comment-time">11:44
                                        PM</span>
                                    </div>
                                    <div class="comment-text">Lorem Ipsum is simply dummy text of the printing and
                                      typesetting
                                      industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                                      1500s, when
                                      an unknown printer took a galley of type and scrambled it to make a type specimen
                                      book.</div>
                                  </div>
                                  <div class="comment-actions">
                                    <span class="like-btn">Like</span> ·
                                    <span class="like-count">0</span> ·
                                    <span class="reply-btn">Reply</span> ·
                                    <span class="edit-btn">Edit</span> ·
                                    <span class="delete-btn">Delete</span>
                                  </div>
                                </div>
                              </div>
                              <div class="reply-section" style="display: none;">
                                <input type="text" class="form-control reply-input" placeholder="Write a reply...">
                                <button class="btn btn-sm label-bg-primary reply-post"><i
                                    class="fas fa-arrow-right"></i></button>
                              </div>
                            </div>
                            <div class="replies">
                              <div class="reply">
                                <div class="reply-content">
                                  <div class="reply-card">

                                    <img src="assets/images/user/usrbig6.jpg" class="user-img" alt="User">
                                    <div class="comment-cr">
                                      <div class="comment-highlight">
                                        <div class="comment-head">
                                          <h6 class="user-name">Saj Abraham</h6> <span class="comment-time">11:45
                                            PM</span>
                                        </div>
                                        <div class="comment-text">Contrary to popular belief, Lorem Ipsum is not simply
                                          random text.
                                          It has roots in a piece of classical Latin literature from 45 BC, making it
                                          over 2000
                                          years old.</div>
                                      </div>
                                      <div class="comment-actions">
                                        <span class="like-btn">Like</span> ·
                                        <span class="like-count">0</span> ·
                                        <span class="reply-btn">Reply</span> ·
                                        <span class="edit-btn">Edit</span> ·
                                        <span class="delete-btn">Delete</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="reply-section" style="display: none;">
                                    <input type="text" class="form-control reply-input" placeholder="Write a reply...">
                                    <button class="btn btn-sm label-bg-primary reply-post"><i
                                        class="fas fa-arrow-right"></i></button>
                                  </div>
                                </div>
                                <div class="replies">
                                  <div class="reply">
                                    <div class="reply-content">
                                      <div class="reply-card">

                                        <img src="assets/images/user/usrbig6.jpg" class="user-img" alt="User">
                                        <div class="comment-cr">
                                          <div class="comment-highlight">
                                            <div class="comment-head">
                                              <h6 class="user-name">Saj Abraham</h6> <span class="comment-time">11:45
                                                PM</span>
                                            </div>
                                            <div class="comment-text">The standard chunk of Lorem Ipsum used since the
                                              1500s is
                                              reproduced below for those interested.</div>
                                          </div>
                                          <div class="comment-actions">
                                            <span class="like-btn">Like</span> ·
                                            <span class="like-count">0</span> ·
                                            <span class="reply-btn">Reply</span> ·
                                            <span class="edit-btn">Edit</span> ·
                                            <span class="delete-btn">Delete</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="reply-section" style="display: none;">
                                        <input type="text" class="form-control reply-input"
                                          placeholder="Write a reply...">
                                        <button class="btn btn-sm label-bg-primary reply-post"><i
                                            class="fas fa-arrow-right"></i></button>
                                      </div>
                                    </div>
                                    <div class="replies"></div> 
                                </div> 
                              </div>
                            </div> 
                          </div>
                        




                        </div>
                        <div class="card-footer comment_send">

                          <div class="input-group">
                            <input id="comment-input" type="text" class="form-control comment-input"
                              placeholder="Type a comment..." aria-label="Write a comment..."
                              aria-describedby="button-addon2">
                            <button class="btn label-bg-primary post-comment" type="button"><i
                                class="fas fa-arrow-right"></i></button>
                          </div>

                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- risk :::::::::::::::::::::::::::: -->
              <div class="tab-pane fade" id="v-pills-risk" role="tabpanel" aria-labelledby="v-pills-risk-tab"
                tabindex="0">
                <div class="card-body myspace-content myspace-risk">
                  <div class="row g-2">
                    <div class="col-lg-8 col-md-6 riskHeatMapView">
                      <div class="card custom-card table-card h-100">
                        <div
                          class="card-header">
                          
                          <div class="card-actions">
                           

                            <div class="dropdown">
                              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                aria-expanded="true">
                                <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                              </button>
                              <ul class="dropdown-menu dropdown-menu-end border-0 shadow">

                                <li>
                                  <a class="dropdown-item" href="#" data-bs-toggle="modal"
                                    data-bs-target=".risk_chart_view_popup"
                                    onclick="risksumchartviewdetails();">View</a>
                                </li>
                               
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div class="card-body overflow-auto" style="height: 340px;">

                         <div id="chartdiv_risksum"></div>

                        

                        </div>
                      </div>
                    </div>
                    <!-- Comment Section -->
                    <div class="col-lg-4 col-md-6 riskCommentsView">
                      <div class="card custom-card table-card h-100">
                        <div class="card-header">
                          <div class="c-header-left">
                            <h5 class="card-title">
                              <strong editable="true" contenteditable="true"
                                onkeypress="return (this.innerText.length <= 36)">Comments</strong>
                            </h5>
                          </div>
                          <div class="card-actions">
                            <div class="dropdown">
                              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                aria-expanded="true">
                                <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                              </button>
                              <ul class="dropdown-menu dropdown-menu-end">
                                <li>
                                  <a href="#comments_view_popup" class="dropdown-item" data-bs-toggle="modal"
                                    onclick="return false;">
                                    View
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>

                        </div>


                        <div class="card-body overflow-auto comment-history comments-list" id="comment-conversation_1"
                          style="height: 262px;">



                          <div class="comment">
                            <div class="comment-content">
                              <div class="comment-card">
                                <img src="assets/images/user/usrbig6.jpg" class="user-img" width="28" height="28"
                                  alt="User">
                                <div class="comment-cr">
                                  <div class="comment-highlight">
                                    <div class="comment-head">
                                      <h6 class="user-name">karthik Ramani, CEO</h6> <span class="comment-time">11:44
                                        PM</span>
                                    </div>
                                    <div class="comment-text">It is a long established fact that a reader will be
                                      distracted by the
                                      readable content of a page when looking at its layout. The point of using Lorem
                                      Ipsum is that
                                      it has a more-or-less normal distribution of letters, as opposed to using 'Content
                                      here,
                                      content here', making it look like readable English.</div>
                                  </div>
                                  <div class="comment-actions">
                                    <span class="like-btn">Like</span> ·
                                    <span class="like-count">0</span> ·
                                    <span class="reply-btn">Reply</span> ·
                                    <span class="edit-btn">Edit</span> ·
                                    <span class="delete-btn">Delete</span>
                                  </div>
                                </div>
                              </div>
                              <div class="reply-section" style="display: none;">
                                <input type="text" class="form-control reply-input" placeholder="Write a reply...">
                                <button class="btn btn-sm label-bg-primary reply-post"><i
                                    class="fas fa-arrow-right"></i></button>
                              </div>
                            </div>
                            <div class="replies">
                              <div class="reply">
                                <div class="reply-content">
                                  <div class="reply-card">

                                    <img src="assets/images/user/usrbig6.jpg" class="user-img" alt="User">
                                    <div class="comment-cr">
                                      <div class="comment-highlight">
                                        <div class="comment-head">
                                          <h6 class="user-name">Saj Abraham</h6> <span class="comment-time">11:44
                                            PM</span>
                                        </div>
                                        <div class="comment-text">Contrary to popular belief, Lorem Ipsum is not simply
                                          random text.
                                          It has roots in a piece of classical Latin literature from 45 BC, making it
                                          over 2000
                                          years old.</div>
                                      </div>
                                      <div class="comment-actions">
                                        <span class="like-btn">Like</span> ·
                                        <span class="like-count">0</span> ·
                                        <span class="reply-btn">Reply</span> ·
                                        <span class="edit-btn">Edit</span> ·
                                        <span class="delete-btn">Delete</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="reply-section" style="display: none;">
                                    <input type="text" class="form-control reply-input" placeholder="Write a reply...">
                                    <button class="btn btn-sm label-bg-primary reply-post"><i
                                        class="fas fa-arrow-right"></i></button>
                                  </div>
                                </div>
                                <div class="replies">
                                  <div class="reply">
                                    <div class="reply-content">
                                      <div class="reply-card">

                                        <img src="assets/images/user/usrbig6.jpg" class="user-img" alt="User">
                                        <div class="comment-cr">
                                          <div class="comment-highlight">
                                            <div class="comment-head">
                                              <h6 class="user-name">Saj Abraham</h6> <span class="comment-time">11:45
                                                PM</span>
                                            </div>
                                            <div class="comment-text">The standard chunk of Lorem Ipsum used since the
                                              1500s is
                                              reproduced below for those interested.</div>
                                          </div>
                                          <div class="comment-actions">
                                            <span class="like-btn">Like</span> ·
                                            <span class="like-count">0</span> ·
                                            <span class="reply-btn">Reply</span> ·
                                            <span class="edit-btn">Edit</span> ·
                                            <span class="delete-btn">Delete</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="reply-section" style="display: none;">
                                        <input type="text" class="form-control reply-input"
                                          placeholder="Write a reply...">
                                        <button class="btn btn-sm label-bg-primary reply-post"><i
                                            class="fas fa-arrow-right"></i></button>
                                      </div>
                                    </div>
                                    <div class="replies"></div> <!-- Nested replies go here -->
                                  </div>
                                </div> <!-- Nested replies go here -->
                              </div>
                            </div> <!-- Replies will be nested here -->
                          </div>
                          <div class="comment">
                            <div class="comment-content">
                              <div class="comment-card">
                                <img src="assets/images/user/usrbig6.jpg" class="user-img" width="28" height="28"
                                  alt="User">
                                <div class="comment-cr">
                                  <div class="comment-highlight">
                                    <div class="comment-head">
                                      <h6 class="user-name">karthik Ramani, CEO</h6> <span class="comment-time">11:44
                                        PM</span>
                                    </div>
                                    <div class="comment-text">Lorem Ipsum is simply dummy text of the printing and
                                      typesetting
                                      industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                                      1500s, when
                                      an unknown printer took a galley of type and scrambled it to make a type specimen
                                      book.</div>
                                  </div>
                                  <div class="comment-actions">
                                    <span class="like-btn">Like</span> ·
                                    <span class="like-count">0</span> ·
                                    <span class="reply-btn">Reply</span> ·
                                    <span class="edit-btn">Edit</span> ·
                                    <span class="delete-btn">Delete</span>
                                  </div>
                                </div>
                              </div>
                              <div class="reply-section" style="display: none;">
                                <input type="text" class="form-control reply-input" placeholder="Write a reply...">
                                <button class="btn btn-sm label-bg-primary reply-post"><i
                                    class="fas fa-arrow-right"></i></button>
                              </div>
                            </div>
                            <div class="replies">
                              <div class="reply">
                                <div class="reply-content">
                                  <div class="reply-card">

                                    <img src="assets/images/user/usrbig6.jpg" class="user-img" alt="User">
                                    <div class="comment-cr">
                                      <div class="comment-highlight">
                                        <div class="comment-head">
                                          <h6 class="user-name">Saj Abraham</h6> <span class="comment-time">11:45
                                            PM</span>
                                        </div>
                                        <div class="comment-text">Contrary to popular belief, Lorem Ipsum is not simply
                                          random text.
                                          It has roots in a piece of classical Latin literature from 45 BC, making it
                                          over 2000
                                          years old.</div>
                                      </div>
                                      <div class="comment-actions">
                                        <span class="like-btn">Like</span> ·
                                        <span class="like-count">0</span> ·
                                        <span class="reply-btn">Reply</span> ·
                                        <span class="edit-btn">Edit</span> ·
                                        <span class="delete-btn">Delete</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="reply-section" style="display: none;">
                                    <input type="text" class="form-control reply-input" placeholder="Write a reply...">
                                    <button class="btn btn-sm label-bg-primary reply-post"><i
                                        class="fas fa-arrow-right"></i></button>
                                  </div>
                                </div>
                                <div class="replies">
                                  <div class="reply">
                                    <div class="reply-content">
                                      <div class="reply-card">

                                        <img src="assets/images/user/usrbig6.jpg" class="user-img" alt="User">
                                        <div class="comment-cr">
                                          <div class="comment-highlight">
                                            <div class="comment-head">
                                              <h6 class="user-name">Saj Abraham</h6> <span class="comment-time">11:45
                                                PM</span>
                                            </div>
                                            <div class="comment-text">The standard chunk of Lorem Ipsum used since the
                                              1500s is
                                              reproduced below for those interested.</div>
                                          </div>
                                          <div class="comment-actions">
                                            <span class="like-btn">Like</span> ·
                                            <span class="like-count">0</span> ·
                                            <span class="reply-btn">Reply</span> ·
                                            <span class="edit-btn">Edit</span> ·
                                            <span class="delete-btn">Delete</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="reply-section" style="display: none;">
                                        <input type="text" class="form-control reply-input"
                                          placeholder="Write a reply...">
                                        <button class="btn btn-sm label-bg-primary reply-post"><i
                                            class="fas fa-arrow-right"></i></button>
                                      </div>
                                    </div>
                                    <div class="replies"></div> <!-- Nested replies go here -->
                                  </div>
                                </div> <!-- Nested replies go here -->
                              </div>
                            </div> <!-- Replies will be nested here -->
                          </div>
                          <!-- Comments will be dynamically added here -->




                        </div>
                        <div class="card-footer comment_send">

                          <div class="input-group">
                            <input id="comment-input" type="text" class="form-control comment-input"
                              placeholder="Type a comment..." aria-label="Write a comment..."
                              aria-describedby="button-addon2">
                            <button class="btn label-bg-primary post-comment" type="button"><i
                                class="fas fa-arrow-right"></i></button>
                          </div>

                        </div>

                      </div>
                    </div>

                    <div class="col-12 riskRegisterView">
                      <div class="card custom-card table-card h-100">
                        <div
                          class="card-header">
<div class="c-header-left">
                          <h5 class="card-title">
                            <strong editable="true" contenteditable="true"
                              onkeypress="return (this.innerText.length <= 36)">Risk Register</strong>
                          </h5>
                        </div>
                          <div class="card-actions">
                            <div class="dropdown">
                              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                aria-expanded="true">
                                <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                              </button>
                              <c:if test="${RoleUtil.hasPrivileges('Risk','Risk','View')}">
                                <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                  <li>
                                    <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target=".Risktableview"
                                      onclick="viewsummaryviewdetails()">View</a>
                                  </li>
                                  <!-- <li>
                                    <a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal"
                                      onclick="return false;">Delete</a>
                                  </li> -->
                                </ul>
                              </c:if>
                            </div>
                          </div>

                        </div>

                       <div class="card border-0">
                        <div class="card-body">
                        <table class="table border align-center mb-0 w-100" id="riskRegisterTable">
                                        <thead>
                                          <tr>
                                            <th style="vertical-align:middle; text-align: center;">Status</th>
                                            <th style="vertical-align:middle; text-align: center;">ID</th>
                                            <th style="vertical-align:middle; text-align: center;">Name</th>
                                            <th style="vertical-align:middle; text-align: center;">Category</th>
                                            <th style="vertical-align:middle; text-align: center;">Impact</th>
                                            <th style="vertical-align:middle; text-align: center;">Likelihood</th>
                                            <th style="vertical-align:middle; text-align: center;">Score</th>
                                            <th style="vertical-align:middle; text-align: center;">Raised on</th>
                                            <th style="vertical-align:middle; text-align: center;">Next Assessment</th>
                                          </tr>
                                        </thead>
                                        <tbody id="riskTableBody">
                                            <jsp:include
                                              page="../organization/templates/summaryTable.jsp"></jsp:include>
                                            <script id="summary-template-parent"
                                              type="x-tmpl-mustache">
                                      {{{bodyRows}}}
                                    </script>
                                        </tbody>
                                      </table>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ducuments :::::::::::::::::::::::::::: -->
              <div class="tab-pane fade" id="v-pills-ducuments" role="tabpanel" aria-labelledby="v-pills-ducuments-tab"
                tabindex="0">
                <div class="card-body myspace-content myspace-ducuments">

                  <div class="col-12">
                    <div class="card custom-card table-card h-100">
                      <div
                        class="card-header">
                        <div class="c-header-left">
                          <h5 class="card-title">
                            <strong editable="true" contenteditable="true"
                            
                             >File Upload</strong>
                          </h5>
                        </div>
                      
                        <div class="card-actions">
                          <button class="btn btn-sm btn-icon" data-bs-toggle="modal"
                            data-bs-target="#fileupload-modal">
                            <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add"  data-bs-target=".file_upload_popup">
                              <i class="fas fa-plus"></i>
                            </span>
                          </button>
                        </div>
                      </div>
                      <div class="card-body">
                        <table class="table border align-center w-100"
                        id="fileUploadTable" style="width: 100%;">
                        <thead>
                          <tr>
                            <th width="40" class="text-center">Sr. No.</th>
                            <th class="text-start">File Name</th>
                            <th width="100" class="text-center">Uploaded On</th>
                            <th width="100" class="text-center">Size</th>
                            <th width="100" class="text-center">Type</th>
                            <th width="100" class="text-end">Actions</th>
                          </tr>
                        </thead>
                       <tbody id="documents">
  
                       </tbody>
                      </table>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>

         
    </div>
  </main>
  <footer class="col-12 text-center py-2 copyright">
    <p class="mb-0">Copyright &copy; <span id="year"></span> <strong>StratRoom</strong></p>

    <script>
      document.getElementById("year").textContent = new Date().getFullYear();
    </script>

  </footer>

  <div style="--stratroom-offcanvas-width: 280px;"
    class="offcanvas offcanvas-toggle offcanvas-start offcanvasMyspace border-0 shadow-lg" data-bs-scroll="true"
    data-bs-backdrop="false" tabindex="-1" id="offcanvasMyspace" aria-labelledby="offcanvasSettingsLabel">
    <div class="offcanvas-toggle-menu shadow toggle-right">
      <button id="toggleButton" class="btn p-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMyspace"
        aria-controls="offcanvasMyspace">
        <i class="fas fa-caret-right"></i>
      </button>
      <button class="btn p-0" data-bs-dismiss="offcanvas" aria-label="Close">
        <i class="fas fa-caret-left"></i>
      </button>
    </div>
    <!-- <div class="offcanvas-header border-bottom justify-content-between gap-3">
      <h5 class="offcanvas-title text-uppercase fs-6 fw-bold" id="offcanvasSettingsLabel">My Space</h5>
    </div> -->
    <div class="offcanvas-body">
      <div class="card border-0">
        <div class="card-body p-0">

		
          <c:if test="${userPrincipal != null}">
			<c:set value="${userPrincipal.profile}" var="employeeProfileObj"
							scope="session" />
          <div class="d-flex flex-column justify-content-center text-center gap-2 p-3 bg-primary rounded mb-3"
            style="--stratroom-bg-opacity:0.1">
            <div class="user-card justify-content-center">
              <div class="user-image user-active" style="--stratroom-avatar-size:5rem">
				<c:if test="${not empty employeeProfileObj.profileImage}">
										<img src="${employeeProfileObj.profileImage}" alt="User"
									class="rounded-circle img_details" width="90">
									</c:if>
									<c:if test="${empty employeeProfileObj.profileImage}">
										<img data-name="${employeeProfileObj.formatImageName()}" alt="User"
									class="rounded-circle profileplanuser img_details" width="90">
									</c:if>
                <!-- <img src="assets/images/user/user7.jpg" alt="Chris" width="72" height="72"> -->
              </div>
            </div>
            <div>
              <h4 class="mb-0 fs-5">${employeeProfileObj.firstName}</h4>
              <p class="mb-0 text-muted">${employeeProfileObj.department}</p>
              <p class="mb-0"><span class="badge text-bg-primary rounded-pill"
                  style="--stratroom-bg-opacity:1">${employeeProfileObj.empId}</span></p>
            </div>
          </div>
          <div>
            <div class="grid gap-0 mb-3 grid-from-box">
              <div class="form-group g-col-6">
                <label class="form-label">Reporting to</label>
				<c:if test="${employeeProfileObj.parentEmployee != null}">
					<c:set value="${employeeProfileObj.parentEmployee}"
												var="parentEmployeeObj" scope="session" />
                <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
                  <!-- <li class="avatar avatar-xs pull-up" title="User">
                    <img src="assets/images/user/usrbig1.jpg" class="rounded-circle" width="24" height="24">
                  </li> -->
				  <li class="avatar avatar-xs pull-up" title="User">
													<c:if test="${not empty parentEmployeeObj.profileImage && parentEmployeeObj.profileImage	==	'images/media.png'}">
														<img src="/stratroom/${parentEmployeeObj.profileImage}"  class="rounded-circle" alt="User" width="24" height="24">
													</c:if> 
													<c:if test="${not empty parentEmployeeObj.profileImage && parentEmployeeObj.profileImage	!=	'images/media.png'}">
														<img src="${parentEmployeeObj.profileImage}"  class="rounded-circle" alt="User" width="24" height="24">
													</c:if> 
													<c:if test="${empty parentEmployeeObj.profileImage}">
														<img data-name="${parentEmployeeObj.formatImageName()}" class="rounded-circle profileplanuser" alt="User" width="24" height="24">
													</c:if>		
													</li>
                </ul>
				</c:if>
				<c:if test="${empty employeeProfileObj.parentEmployee}">
											<p></p>
										</c:if>
              </div>
              <div class="form-group g-col-6 text-end">
                <label class="form-label">Direct Reportees</label>
               <ul class="list-unstyled order-list">
												<c:if test="${employeeProfileObj.reporteeList != null}">
												<c:set value="${employeeProfileObj.reporteeList.size()}" var="count"></c:set>
						                         <c:set value="${employeeProfileObj.reporteeList}" var="list"></c:set>
						                         <c:if test="${count<3}">
						                            <c:forEach var="i" begin="1" end="${count}" step="1">
						                            <c:set var="reporteeObj" value="${list[i-1]}"/>
														<li class="avatar avatar-sm">
															<c:if test="${not empty reporteeObj.profileImage && reporteeObj.profileImage	==	'images/media.png'}">
																<img src="/stratroom/${reporteeObj.profileImage}"  class="rounded-circle" alt="User">
															</c:if> 
															<c:if test="${not empty reporteeObj.profileImage && parentEmployeeObj.profileImage	!=	'images/media.png'}">
																<img src="${reporteeObj.profileImage}"  class="rounded-circle" alt="User">
															</c:if> 
															<c:if test="${empty reporteeObj.profileImage}">
																<img data-name="${reporteeObj.formatImageName()}" class="rounded-circle profileplanuser" alt="User">
															</c:if>		
														</li>
														</c:forEach>
                                                     </c:if>
                                                     <c:if test="${count>=3}">
						                            <c:forEach var="i" begin="1" end="3" step="1">
						                            <c:set var="reporteeObj" value="${list[i-1]}"/>
														<li class="avatar avatar-sm">
															<c:if test="${not empty reporteeObj.profileImage && reporteeObj.profileImage	==	'images/media.png'}">
																<img src="/stratroom/${reporteeObj.profileImage}"  class="rounded-circle" alt="User">
															</c:if> 
															<c:if test="${not empty reporteeObj.profileImage && parentEmployeeObj.profileImage	!=	'images/media.png'}">
																<img src="${reporteeObj.profileImage}"  class="rounded-circle" alt="User">
															</c:if> 
															<c:if test="${empty reporteeObj.profileImage}">
																<img data-name="${reporteeObj.formatImageName()}" class="rounded-circle profileplanuser" alt="User">
															</c:if>		
														</li>
														</c:forEach>
                                                     </c:if>
												</c:if>
												<c:set value="${employeeProfileObj.reporteeList.size()}"
								var="reporteeCount" scope="session" />
								              <c:if test="${reporteeCount>3}">
												<li _ngcontent-hhc-c5="" class="avatar avatar-sm"><span
													_ngcontent-hhc-c5="" class="badge" style="background-color:white !important;height:30px;line-height:30px;width:30px;padding: 0 5px !important;margin-left: 3px !important;border-radius: 50% !important;font-size: 10px !important;">+${employeeProfileObj.reporteeList.size()-3}</span></li>
													</c:if>
												<c:if test="${reporteeCount<=3}">
												<li _ngcontent-hhc-c5="" class="avatar avatar-sm"><span
													_ngcontent-hhc-c5="" class="badge" style="background-color:white !important;height:30px;line-height:30px;width:30px;padding: 0 5px !important;margin-left: 3px !important;border-radius: 50% !important;font-size: 10px !important;">+0</span></li>
													</c:if>
												
											</ul>
              </div>
              <div class="form-group g-col-6">
                <label class="form-label">Overall Score</label>
                <p class="form-control-plaintext overall_score" id="score_overall"></p>
              </div>
              <div class="form-group g-col-6 text-end">
                <label class="form-label">Score</label>
                <p class="form-control-plaintext" id="score"></p>
              </div>
            </div>
            <div class="mb-3">
              <div class="grid gap-0 grid-from-box">
                <div class="form-group g-col-6">
                  <label class="form-label">Self Rating</label>
                  <p class="form-control-plaintext" id="selfRatingTotalDisplay">
                    </p>
                </div>
                <div class="form-group g-col-6 text-end">
                  <label class="form-label">Manager Rating</label>
                  <p class="form-control-plaintext" id="managerRatingTotalDisplay">
                   </p>
                </div>
                <div class="form-group g-col-6">
                  <label class="form-label">Consensual</label>
                  <p class="form-control-plaintext" id="consenualRatingTotalDisplay">
                  </p>
                </div>
                <!-- <div class="form-group g-col-6 text-end">
                  <label class="form-label">Direct Reports Rating</label>
                  <p class="form-control-plaintext"><i class="fa fa-star text-warning" aria-hidden="true"></i>
                    3/5</p>
                </div> -->
              </div>
            </div>
  
            <div class="mb-3">
              <h6 class="mb-2">Personal Details</h6>
              <div class="grid gap-0 grid-from-box">
                <div class="form-group g-col-12">
                  <label class="form-label"><i class="fa fa-phone text-muted me-1" aria-hidden="true"></i>
                    Phone</label>
                  <p class="form-control-plaintext">+91321654987</p>
                </div>
                <div class="form-group g-col-12">
                  <label class="form-label"><i class="fa fa-envelope text-muted me-1" aria-hidden="true"></i>
                    Email</label>
                  <p class="form-control-plaintext">${employeeProfileObj.empId}</p>
                </div>
                <div class="form-group g-col-12">
                  <label class="form-label"><i class="fa fa-map-marker text-muted me-1" aria-hidden="true"></i>
                    Address</label>
                  <p class="form-control-plaintext">dummyAddress</p>
                </div>
  
              </div>
            </div>
            <div class="mb-3">
              <h6 class="mb-2">Job Details</h6>
              <div class="grid gap-0 grid-from-box">
                <div class="form-group g-col-6">
                  <label class="form-label">Designation</label>
                  <p class="form-control-plaintext">${employeeProfileObj.title}</p>
                </div>
                <div class="form-group g-col-6">
                  <label class="form-label">Grade</label>
                  <p class="form-control-plaintext">F1</p>
                </div>
                <div class="form-group g-col-6">
                  <label class="form-label">Department</label>
                  <p class="form-control-plaintext">${employeeProfileObj.department}</p>
                </div>
                <div class="form-group g-col-6">
                  <label class="form-label">Date of Joining</label>
                  <p class="form-control-plaintext">24-10-2005</p>
                </div>
              </div>
            </div>
			</c:if>
  
  
  
          </div>
        </div>
      </div>
    </div>
  </div>

    <link href="assets/css/pickr.min.css" rel="stylesheet">
    <link href="assets/css/daterangepicker.min.css" rel="stylesheet">
    <link href="assets/css/jquery-ui.min.css" rel="stylesheet">
    <link href="assets/css/select2.min.css" rel="stylesheet" />

	<script src="js/app.min.js"></script>

	<script type="text/javascript"
		src="${contextroot}/js/jquery.contextMenu.min.js"></script>
	<script type="text/javascript"
		src="${contextroot}/js/jquery.ui.position.js"></script>

	<script src="js/admin.js"></script>
	<script src="js/bundles/amcharts4/core.js"></script>
	<script src="js/bundles/amcharts4/charts.js"></script>
	<script src="js/bundles/amcharts4/animated.js"></script>

	<script src="js/d3.v4.js"></script>
	<script src="js/d3pie.min.js"></script>
	<!-- Knob Js -->
	<script src="js/pages/todo/todo.js"></script>
	<script src="js/jquery-ui.min.js"></script>
	<script src="js/moment.js"></script>
	<script src="${contextroot}/js/pickr.es5.min.js"></script>
	<script src="${contextroot}/js/datepickerair.js"></script>
	<script src="${contextroot}/js/datepicker.en.js"></script>
	<script src="js/jquery.editable.min.js"></script>
	<script src="js/bootstrap.bundle.min.js"></script>
	<script src="js/widgets.js"></script>
	
	<script src="js/d3.v4.js"></script>
	<script src="js/d3pie.min.js"></script>
	<script src="js/jquery-resize.js"></script>
	<script src="js/pages/widgets/chart-widget.js"></script>
	<script src="${contextroot}/js/daterangepicker.min.js"></script>
	<script src="js/plotly-latest.min.js"></script>
	<script type="text/javascript"
		src="${contextroot}/js/chosen.jquery.min.js"></script>
	<script src="js/handlebars.js"></script>
	<!-- <script src="js/standard_view.js"></script> -->
	<!-- <script src="js/initial.js"></script> -->
	<script src="${contextroot}/js/notify.js"></script>
	<script src="js/apexcharts.js"></script>
	<!-- <script src="js/initiative.js"></script> -->
	<!-- <script src="js/risk.js"></script> -->
	<!-- <script src="js/risksummary.js"></script> -->
	<script src="js/employee.js"></script>

  <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
  <script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>
	<script>
    const scoreCradDataa =[{
	"pageTitle": "Scorecard",
	"overallScore": "100%",
	"userName": "Sajin",
	"period": "3/01/2025 - 3/22/2025",
	"tab": [{
			"title": "Financial",
			"totalScore": "100%",
			"tabledata": [{
				"flag": [{
					"status": "green"
				}],
				"id": "F1",
                "url":"",
				"name": "% Completion of scorecard",
				"period": "",
				"trend": [],
				"score": "80%",
				"baseline": "75%",
				"actual": "",
				"target": "",
				"risk": [{
					"status": "yellow"
				}],
				"actions": "",
				"children": [
                    {
					"flag": [{
						"status": "green"
					}],
					"id": "F1.1",
                    "url":"kpi.html",
					"name": "ROCE",
					"period": "Month",
					"trend": [{
						"status": "down"
					}],
					"score": "90%",
					"baseline": "70%",
					"actual": "12.9%",
					"target": "13.4%",
					"risk": [{
						"status": "red"
					}],
					"actions": "",
					"children": [
                        {
						"flag": [{
							"status": "green"
						}],
						"id": "F1.1.1",
                        "url":"kpi.html",
						"name": "ROCE",
						"period": "Month",
						"trend": [{
							"status": "up"
						}],
						"score": "90%",
						"baseline": "70%",
						"actual": "12.9%",
						"target": "13.4%",
						"risk": [{
							"status": "green"
						}],
						"actions": ""
					},
                    {
						"flag": [{
							"status": "green"
						}],
						"id": "F1.1.2",
                        "url":"",
						"name": "ROCE",
						"period": "Month",
						"trend": [{
							"status": "up"
						}],
						"score": "90%",
						"baseline": "70%",
						"actual": "12.9%",
						"target": "13.4%",
						"risk": [{
							"status": "green"
						}],
						"actions": ""
					}
                
                ]
				}]
			}]
		},
		{
			"title": "Customer",
			"totalScore": "100%",
			"tabledata": [{
				"flag": [{
					"status": "green"
				}],
				"id": "C1",
                "url":"kpi.html",
				"name": "% Completion of scorecard",
				"period": "",
				"trend": [],
				"score": "80%",
				"baseline": "75%",
				"actual": "",
				"target": "",
				"risk": [{
					"status": "red"
				}],
				"actions": "",
				"children": [{
					"flag": [{
						"status": "green"
					}],
					"id": "C1.1",
                    "url":"kpi.html",
					"name": "Customer Satisfaction",
					"period": "Month",
					"trend": [{
						"status": "up"
					}],
					"score": "90%",
					"baseline": "70%",
					"actual": "85%",
					"target": "90%",
					"risk": [{
						"status": "yellow"
					}],
					"actions": "",
					"children": [{
						"flag": [{
							"status": "green"
						}],
						"id": "C1.1.1",
                        "url":"kpi.html",
						"name": "Survey Response",
						"period": "Month",
						"trend": [{
							"status": "down"
						}],
						"score": "95%",
						"baseline": "80%",
						"actual": "88%",
						"target": "92%",
						"risk": [{
							"status": "green"
						}],
						"actions": ""
					}]
				}]
			}]
		}

	]
}]

    console.log("scoreCradDataa", scoreCradDataa);

$(document).ready(function () {
  
    // Api data map scorecard data
     window.showScorecard = function(pageId) {
        if (pageId) {
            fetchScorecardData(pageId);
        } else {
            console.error("No pageId provided to showScorecard");
        }
    };

        function fetchScorecardData(pageId) {
      console.log("Selected page ID:", pageId);
      var frequency = localStorage.getItem("customperiod");
      var pageno = pageId;
      var pageEmpId = $("#userPrincipal").val();
       var datePeriod = $("#datePeriod").val();
       var language =  "en";

       var pageUrl = "/stratroom/scoreCardList?pageId=" +
      pageno +
      "&empId=" +
      pageEmpId +
      "&datePeriod=" +
      datePeriod +
      "&frequency=" +
      frequency +
      "&language=" + language;

      $.ajax({
        url: pageUrl, 
        method: 'GET',
        async: false,
        success:scordcardSuccessCallbackk,
        error: function(xhr, status, error) {
        
          console.error("API call failed:", error);
        }
      });
    }

   function scordcardSuccessCallbackk(data) {
    console.log("Received data:", data);
    const tabContent = document.getElementById('scorecard-tabcontent');
    
    // Clear previous content
    tabContent.innerHTML = '';
    
    if (data && data.cardDetailsDTO) {
        // We have valid data - show just the scorecard name in h1
        tabContent.innerHTML = `<h1>Data Avilable</h1>`;
    } else {
        // No valid data available
        tabContent.innerHTML = `
            <div class="alert alert-info" role="alert">
                <i class="fas fa-info-circle me-2"></i> 
                Scorecard data is not available for the selected period.
            </div>
        `;
    }
}

  })
    
    
       
      
		$("#custom-tab").on("click", "button", function (e) {
        var CustomTabValue = this.dataset.value;
        if (CustomTabValue) {
          $(".customTabContent")
            .not("." + CustomTabValue)
            .hide();
          $("." + CustomTabValue).show();
        } else {
          $(".customTabContent").hide();
        }
        $(this).parent().find("button").removeClass("active");
        $(this).addClass("active");
      });
      

      
  	$('#kpi_formula').on('click', function() {
		$("#kpi_trigger").trigger("click");
	});

	$(".list-group-item, .opr").click(function() {

	});

	$("#add").click(function() {
		var value = $("#formula").val();
		var ul = $(".formula-panel");
		var li = document.createElement("li");
		li.setAttribute("class", "list-group-item");
		li.appendChild(document.createTextNode(value));
		ul.append(li);
		$("#formula").val('');
	});
      

      
		$("#OpenImgUpload").click(function () {
        	$("#importscorescrd").trigger("click");
        	return false;
      	});
		
		$('.date_pickers').datepicker({
		    language: 'en',
		    minDate: new Date(),
		    range: true,
		    autoClose: true,
		    position: "top left",
		    todayButton: true,
		    onSelect: function(fd) {
		        // $('.datepickers-container').hide();
		    }
		});
		
			<c:forEach items="${activitiesList}" var="riskActivity">
			var chartvalue		=	parseInt(100)-parseInt(${riskActivity.activitiesValue.progress});
			var chartbalance	=	${riskActivity.activitiesValue.progress};
			
			if(chartvalue	==	0){
				chartbalance	=	100;
			}
			
			/*var statusindi		=	${riskActivity.activitiesValue.statusIndicator};
			var colorstatus		=	"#1aa243";
			if(statusindi	==	"GREEN"){
				colorstatus		=	"#1aa243";
			}*/
			
			if(chartbalance 	==	100){
				$(".chart_orange_${riskActivity.id}, .chart-pie_${riskActivity.id}").sparkline([ chartbalance, chartvalue ], {
					type : 'pie',
					height : '30px',
					sliceColors : [ "#1aa243", "#ffffff" ]
				});
			}else{
				$(".chart_orange_${riskActivity.id}, .chart-pie_${riskActivity.id}").sparkline([ chartbalance, chartvalue ], {
					type : 'pie',
					height : '30px',
					sliceColors : [ "#ffd500", "#ffffff" ]
				});	
			}
		</c:forEach>
		
		$('[class^=chart_orange]').children(':first-child').css('border',
				'1px solid #c7c7c7').css('border-radius', '50%');

      		
	$('.riskuser,.commentsuser,.planuser').initial({
				 charCount : 2,
				 height : 30,
				 width : 30,
				 fontSize : 18
				});
		$('.modal-dialog').draggable({
            handle: ".modal-header"
        });
		$('[data-toggle="tooltip"]').attr("data-placement","bottom");
		$('[data-toggle="tooltip"]').tooltip({ 
			delay: { "show": 0, "hide": 0 } 
		});
	</script>

  <script>

//     function fetchScordcardData(pageId) {
//       console.log("Selected page ID:", pageId);
//       var frequency = localStorage.getItem("customperiod");
//       var pageno = pageId;
//       var pageEmpId = $("#userPrincipal").val();
//        var datePeriod = $("#datePeriod").val();
//        var language =  "en";

//        var pageUrl = "/stratroom/scoreCardList?pageId=" +
//       pageno +
//       "&empId=" +
//       pageEmpId +
//       "&datePeriod=" +
//       datePeriod +
//       "&frequency=" +
//       frequency +
//       "&language=" + language;

//       $.ajax({
//         url: pageUrl, 
//         method: 'GET',
//         async: false,
//         success:scordcardSuccessCallbackk,
//         error: function(xhr, status, error) {
        
//           console.error("API call failed:", error);
//         }
//       });
//     }



// function scordcardSuccessCallbackk(data) {
//   console.log("Received data:", data);
  
//  }



//   // function initializeDataTable(selector) {
//   //   setTimeout(() => {
//   //     if ($.fn.DataTable && !$.fn.DataTable.isDataTable(selector)) {
//   //       $(selector).DataTable({
//   //         paging: false,
//   //         searching: false,
//   //         ordering: false,
//   //         info: false,
//   //         responsive: true,
//   //         scrollX: true,
//   //       });
//   //     } else {
//   //       // Recalculate DataTable when it becomes visible
//   //       $(selector).DataTable().columns.adjust().draw();
//   //     }
//   //   }, 500);
//   // }

//   //  $(document).on("shown.bs.tab", 'button[data-bs-toggle="pill"]', function (e) {
//   //   let targetTableId = $(e.target).data("bs-target"); // Example: #v-pills-performance
//   //   let tableSelector = `${targetTableId} table`; // Select the table inside the active tab

//   //   if ($.fn.DataTable && !$.fn.DataTable.isDataTable(tableSelector)) {
//   //     initializeDataTable(tableSelector);
//   //   } else {
//   //     $(tableSelector).DataTable().columns.adjust().draw();
//   //   }
//   // });


function toggleDropdown(event) {
    event.stopPropagation();
    const container = document.getElementById('scorecard-dropdown-container');
    
    if (container.style.display == 'none') {
      // Hide all dropdowns first
      document.querySelectorAll('[id$="-container"]').forEach(el => {
        el.style.display = 'none';
      });
      container.style.display = 'block';
    } else {
      container.style.display = 'none';
    }
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', function() {
    document.getElementById('scorecard-dropdown-container').style.display = 'none';
  });


  function hideDropdown() {
    const dropdown = document.getElementById('scorecard-dropdown');
    const toggleLink = document.querySelector('.nav-link.dropdown-toggle');
    
    if (dropdown) {
      dropdown.style.display = 'none';
    }
    if (toggleLink) {
      toggleLink.setAttribute('aria-expanded', 'false');
    }
  }


  document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('scorecard-dropdown');
    const toggleLink = document.querySelector('.nav-link.dropdown-toggle');
    
    if (dropdown && (event.target !== toggleLink && !toggleLink.contains(event.target))) {
      dropdown.style.display = 'none';
      if (toggleLink) {
        toggleLink.setAttribute('aria-expanded', 'false');
      }
    }
  });


  //reply section
  $(document).on("click", ".reply-btn", function () {
    // $(this).closest(".comment").find(".reply-section").toggle();
    $(this).closest(".comment, .reply").find(".reply-section").first().toggle();
  });


  </script>


  <script>

document.addEventListener('DOMContentLoaded', function() {
  const avatarElements = document.querySelectorAll('.initials-avatar');
  
  avatarElements.forEach(el => {
    const name = el.getAttribute('data-name') || '';
    const initials = getInitials(name);
    el.textContent = initials;
    
    // Optional: Generate a consistent background color based on the name
    const color = stringToColor(name);
    el.style.backgroundColor = color;
  });
  
  function getInitials(name) {
    if (!name) return '';
    
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return '';
    
    let initials = parts[0].charAt(0).toUpperCase();
    if (parts.length > 1) {
      initials += parts[parts.length - 1].charAt(0).toUpperCase();
    }
    
    return initials.substring(0, 2);
  }
  
  function stringToColor(str) {
    // Simple hash function to generate consistent colors from strings
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const h = hash % 360;
    return `hsl(${h}, 60%, 50%)`;
  }
});
  </script>




</body>