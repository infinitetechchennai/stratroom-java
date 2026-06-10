<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page import="com.estrat.web.util.RoleUtil" %>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />
<a lang="en">

	<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta content="width=device-width, initial-scale=1" name="viewport" />
<title>StratRoom</title>
<!-- Favicon-->
<!-- <link rel="icon" href="images/favicon.ico" type="image/x-icon"> -->
<!-- Plugins Core Css -->
<link href="${contextroot}/css/app.min.css" rel="stylesheet">
<!-- Custom Css -->
<link href="${contextroot}/css/style.css" rel="stylesheet" />
<link href="${contextroot}/css/custom.css" rel="stylesheet" />
<link href="${contextroot}/css/risk.css" rel="stylesheet" />
<link href="${contextroot}/css/employee.css" rel="stylesheet">
<link href="${contextroot}/css/icheck-bootstrap.min.css" rel="stylesheet" />
<link href="${contextroot}/css/startroom/wedgets.css" rel="stylesheet" />
<!-- You can choose a theme from css/styles instead of get all themes -->
<link href="${contextroot}/css/styles/all-themes.css" rel="stylesheet" />
<link href="${contextroot}/css/bootstrap-popover-x.css" media="all"
	rel="stylesheet" />
<link href="${contextroot}/css/daterangepicker.min.css" rel="stylesheet">
<link rel="stylesheet" href="${contextroot}/css/datepickerair.css">
<link rel="stylesheet" href="${contextroot}/css/jquery-ui.min.css">
<link rel="stylesheet" href="${contextroot}/css/chosen.min.css">
<link rel="stylesheet"
	href="${contextroot}/css/fonts/fontawesome_v_5/font-awesome.min.css">
<link rel="stylesheet"
	href="${contextroot}/css/fonts/fontawesome_v_5/all.css">
<script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>
<script type="text/javascript"
	src="${contextroot}/js/jquery/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="${contextroot}/js/jquery/additional-methods.min.js"></script>
	<link href="${contextroot}/css/file-upload.css" rel="stylesheet">
<link href="${contextroot}/css/jquery.contextMenu.min.css" rel="stylesheet">
<link href="${contextroot}/css/select2.min.css" rel="stylesheet" />

<style>
.orientation-right {
        top: 60px !important;
        right: 0 !important;
        left: auto !important;
        position: fixed;
      }

      .hidden {
        display: none;
      }

      .shown {
        display: block;
      }


.checkbuttoncolor {
	background-color: aliceblue;
}
.riskdropdown-hide.pull-right {
        position: absolute !important;
        left: auto !important;
        right: 0px !important;
        top: 74px !important;
        transform: none !important;
      }
      
      .riskdeletedropdown-hide.pull-right {
        position: absolute !important;
        left: auto !important;
        right: 0px !important;
        top: 74px !important;
        transform: none !important;
      }
 
.chosen-search input[type=text] {
	width: 92% !important;
}
.modal-content-setscrollheight .modal-body{
	overflow-y: auto
}

.modal-content-setscrollheight {
  	height: 720px;
}

span.badge {
 cursor:pointer;
}

.apexcharts-menu-item.exportSVG {
	display: none;
}

img[data-toggle='modal']{
cursor:pointer;
}

.line-clamp {
	display: -webkit-box !important;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical !important;
	-webkit-box-pack: end;
	overflow: hidden;
}

ul li label {
	font-size: 12px;
}

.ini_side_due p {
	white-space: nowrap;
}

.form-group .form-line {
	width: 100%;
	position: relative;
	margin-left: 3% !important;
}

.input-calender-icon {
	color: #5a6169;
	position: absolute;
	bottom: 30%;
	right: 8%;
	font-size: 16px;
}

.init_flex_profile p {
	word-break: break-all;
}
#chart_modal {
  width: 100%;
  height: 250px;
}
#risk_score, .popover {
	top: 41px !important;
	left: 1068.45px !important;
	padding: 0px !important;
}

.riskSidebarHighLight {
	border-top: 2px solid black !important;
	border-right: 2px solid black !important;
	border-bottom: 2px solid black !important;
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
</style>

	</head>

	<body class="light">
	<input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
		<!-- Page Loader -->
		<jsp:include page="../common/top-navigation.jsp"></jsp:include>
		<!-- #Top Bar -->
		<div>
			<jsp:include page="../common/left-navigation.jsp"></jsp:include>
			<jsp:include page="../common/right-navigation.jsp"></jsp:include>
			<jsp:include page="modal/riskActivitiesModal.jsp"></jsp:include>
			<jsp:include page="modal/riskActionModal.jsp"></jsp:include>
			<jsp:include page="modal/riskTreatmentModal.jsp"></jsp:include>
			<jsp:include page="modal/riskPlanModal.jsp"></jsp:include>
			<jsp:include page="modal/riskMonitoringModal.jsp"></jsp:include>
			<jsp:include page="modal/riskDetailModal.jsp"></jsp:include>
			<jsp:include page="modal/CauseAndConsequenceModal.jsp"></jsp:include>
			<jsp:include page="modal/CauseAndConseqSubModal.jsp"></jsp:include>

			<div id="deleteModalrisk" class="modal fade">
				<div class="modal-dialog modal-confirm">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title">Delete</h4>
							<button type="button" class="close" data-dismiss="modal"
								aria-hidden="true">&times;</button>
						</div>
						<div class="modal-body">
							<h5 class="confirm-modal-content">Do you really want to
								delete?</h5>
							<br>
							<div class="form-line right">
								<input type="hidden" id="deleterecordid" /> <input
									type="hidden" id="deleterecordtype" />
								<button type="button" class="btn-default1 btn"
									data-dismiss="modal" aria-label="Close"  data-i18n="Cancel">Cancel</button>
								<button type="button"
									class="btn btn-danger confirm-modal-deleteBtn"
									onclick="handleriskeventdelete()">Delete</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="delete_popup_reply" class="modal fade">
				<div class="modal-dialog modal-confirm">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title">Delete</h4>
							<button type="button" class="close" data-dismiss="modal"
								aria-hidden="true">&times;</button>
						</div>
						<div class="modal-body">
							<h5 class="confirm-modal-content">Do you really want to
								delete?</h5>
							<br>
							<div class="form-line right">
								<input type="hidden" id="deleterecordid" /> <input
									type="hidden" id="deleterecordtype" />
								<button type="button" class="btn-default1 btn"
									data-dismiss="modal" aria-label="Close"  data-i18n="Cancel">Cancel</button>
								<button type="button"
									class="btn btn-danger confirm-modal-deleteBtn"
									onclick="deleteReplyRisk()">Delete</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="chart_view_popup modal fade" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-lg">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title">View Heat Map</h4>
							<button type="button" class="close" data-dismiss="modal"
								aria-hidden="true">&times;</button>
						</div>
						<div class="modal-body">
							<div id="chart_modal" class="chartviewtemplatediv"></div>
						</div>
					</div>
				</div>
			</div>

		</div>
		
		<jsp:include page="templates/risk_sidebar_template.jsp"></jsp:include>
		<aside id="initiative_sidebar" class="initiative_sidebar">
			<input type="hidden" id="ischeckriskurlornot" value="RISK">
			<div class="sub_initiatives" id="sub_initiatives" style="height: 100%">
				<div class="card" style="height: 100%;overflow-y:scroll !important;">
					<div class="header d-flex flex-row risk_sidebar"
						style="margin-top: 5%;">
						<h5 class="prob d-flex flex-fill" style="margin-left: -22px">
							<strong style="color: #333;" data-i18n="Risk Register">Risk Register</strong>
						</h5>
						<a href="#" class="initativesdescription riskcreateicon" style="margin-right: 6px" data-toggle="modal" data-target=".riskDetail_description_popup">
		                	<img src="${contextroot}/images/icon/Plus.png" alt="Add Risk" style="width: 24px" onclick="handleRiskDetailEvent(0,'add')" data-toggle="tooltip" data-placement="bottom" title="Add">
		              	</a>
		              	<a href="#" style="margin-right: 6px" data-toggle="modal" data-target=".file_upload_popup" class="initiativeCreateIcon">
		                	<img src="${contextroot}/images/icon/Import.png" alt="Import" style="width: 24px" data-toggle="tooltip" data-placement="bottom" title="Import">
		              	</a>
							<a href="" target="_blank" style="margin-right: -18px;padding: 2px 2px 2px 2px !important;" class="exceldownloadlink">
						  <i style="font-size: 14px;width: 24px;color:#2e2e2e !important;padding: 4px !important;border:1px solid rgb(241, 240, 238);border-width: thin;" class="fas fa-upload" data-toggle="tooltip" data-placement="bottom"title="Export"></i></a>
						<!--<a href="risksummary" style="margin-right: 6px;">
                <img src="images/risk.png" alt="risk-summary" style="width: 20px;"/>
              </a>-->
				
			</div>
					
					
				<div class="d-flex flex-column" id="risk_sidebar">
					
				</div>
	
			</div>
			</div>
		</aside>
		
		<!-- File Upload PopUp -->

<div class="modal fade file_upload_popup1" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="myLargeModalLabel" data-i18n="File Upload">File Upload</h6>
				<button type="button" class="close fileuploadclose"
					data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<div class="row">
					<form action="" method="post" enctype="multipart/form-data">
						<div class="col-md-12" style="width: 100%; margin-bottom: 2%;">
							<input type="file" accept=".xlsx, .xls, .csv"
								style="padding-bottom: 12%; padding-top: 3%; padding-right: 5%;"
								class="form-control" id="importinitiative"
								name="importinitiative" />
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>


<!-- End of File Upload PopUp -->

<!-- File Validate Form -->
<div class="modal fade file_upload_popup" id="file-validate-form"
	tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
	aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h4 data-i18n="File Upload">File Upload</h4>
				<button type="button" class="close pull-right" data-dismiss="modal">
					&times;</button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-md-12">
						<ul class="form-progressbar">
							<li>Upload</li>
							<li>Validation</li>
							<li>Import</li>
						</ul>
					</div>
					<div class="col-md-12">
						<hr />
					</div>
				</div>

				<div class="row" id="file-upload">
					<div class="col-md-12">
						<div class="form-group">
							<label class="control-label">Upload File</label>
							<div class="preview-zone hidden">
								<div class="box box-solid">
									<div class="box-body"></div>
								</div>
							</div>
							<div class="dropzone-wrapper">
								<div class="dropzone-desc">
									<i class="fas fa-file-upload" style="font-size: 20px;"></i>
									<p>Choose a file or drag it here.</p>
								</div>
								<input type="file" name="img_logo" class="dropzone"
									accept=".xlsx, .xls, .csv" />
							</div>
							<span id="fileerrorshow" style="color: red; display: none"></span>
						</div>
					</div>
					<div class="col-md-12">
						<hr />
					</div>
					<div class="col-md-12">
						<div class="form-line right">
							<button class="initative_save_btn" id="next-btn-1"
								style="font-weight: 600;">Next</button>
						</div>
					</div>
				</div>

				<div class="row" id="file-validate" style="display: none;">
					<div class="col-md-12 img-center">
						<img id="imagevalidate" src="images/Not-Verified.png"
							alt="Not-Verified" />
						<div class="error-div">
							<table class="error-table">
								<thead>
									<tr>
										<th style="width: 150px; text-align: center;">SheetName</th>
										<!-- <th style="width: 150px; text-align: -webkit-center;">Owner</th> -->
										<th style="width: 150px; text-align: center;">Row-Number</th>
										<th style="width: 150px; text-align: center;">CellName</th>
										<th style="width: 250px; text-align: center;">Reason</th>
									</tr>

								</thead>
								<tbody class="uploadvalidationSuccess">
									<!-- <tr>
										<td style="width: 150px;">1</td>
										<td>Contain Special Character</td>
									</tr>
									<tr>
										<td style="width: 150px;">3</td>
										<td>Contain Special Character</td>
									</tr>
									<tr>
										<td style="width: 150px;">5</td>
										<td>Contain Special Character</td>
									</tr>
									<tr>
										<td style="width: 150px;">8</td>
										<td>Contain Special Character</td>
									</tr>
									<tr>
										<td style="width: 150px;">10</td>
										<td>Contain Special Character</td>
									</tr>
									<tr>
										<td style="width: 150px;">19</td>
										<td>Contain Special Character</td>
									</tr> -->
								</tbody>
							</table>
						</div>
					</div>
					<div class="col-md-12">
						<hr />
					</div>
					<div class="col-md-12">
						<div class="form-line" id="validateImportHide">
							<!-- <button type="button" class="btn-default1 btn" id="prev-btn1"
										style="font-weight: 600;">Previous</button>
									<button class="initative_save_btn pull-right" id="next-btn-2"
										style="font-weight: 600;">Next</button> -->
						</div>
					</div>
				</div>

				<div class="row" id="file-save" style="display: none;">
					<div class="col-md-12">
						<div class="col-md-12 img-center">
							<img src="images/Success.png" alt="Verified" />
							<span id="statisticmessage" style="text-align: center; margin-left: 42% !important; color :green; width: 100%; margin-right: 25% !important;"></span>							
							<div class="error-div">
								<table class="error-table">
									<thead>
										<tr>
											<th style="width: 300px; text-align: center;">
												Statististics</th>
											<th style="width: 300px; text-align: center;">Message</th>
										</tr>

									</thead>
									<tbody class="uploadStatististics">
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div class="col-md-12">
						<hr />
					</div>
					<div class="col-md-12">
						<div class="form-line">
							<button type="button" class="btn-default1 btn" id="prev-btn2"
								style="font-weight: 600;">Previous</button>
							<button class="initative_save_btn pull-right" id="done-btn"
								style="font-weight: 600;" data-dismiss="modal"
								aria-label="Close">Done</button>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
</div>
<!-- END File Validate Form -->		
		
		<section class="content" id="section">
			<div>
				<div class="button_filter" style="padding-top: 30px;">
					<!-- Department Dropdown -->
					<label for="department_select" data-i18n="Department">Department:</label>
					<select class="dept_select" id="department_select" style="display: block; width: 20%;">
					  <option></option>
					
					</select>
			
					<!-- Pages Dropdown -->
					<label for="page_select">Pages:</label>
					<select class="page_select" id="page_select" style="display: block; width: 20%;">
					  <option></option>
		  
					</select>
				</div>
			</div>
				<jsp:include page="templates/risk_topdesc_template.jsp"></jsp:include>
			<c:if test="${userPrincipal != null}">
				<input id="userPrincipal" type="hidden" name="userPrincipal"
					value="<c:out value="
				${userPrincipal.profile.empId}" />">
			</c:if>
			<c:if test="${pagenumber != null}">
				<input id="pagenumber" type="hidden" name="pagenumber"
					value="<c:out value=" ${pagenumber}" />">
			</c:if>
			<input id="userdept" type="hidden" name="userdept" value="${userPrincipal.profile.department}">
				
					<div class="initiative_details">
						<div class="container-fluid text-dark bg-white p-0">
							<div id="risk_top_details" class="d-flex_name employee_top_section">
				
							</div>
						</div>
				
					</div>
				<!-------Cause and Consequence------->	
				<div class="row row-padding m-0">
					<jsp:include page="templates/cause_consequence_template.jsp"></jsp:include>
					<div class="col-lg-5 col-md-5 sub_initiatives select-toggle causenconsequence" id="causeconsequencebody">
						
					</div>

					<!-- cause and consequence view start -->
					<div class="modal fade cause_conq_view_popup" tabindex="-1"
						role="dialog" aria-labelledby="myLargeModalLabel_1"
						aria-hidden="true">
						<div class="modal-dialog modal-dialog-centered"
							style="max-width: 60%;">
							<div class="modal-content">
								<div class="modal-header modalheadercolor">
									<h6 class="modal-title" id="myLargeModalLabel_1">View
										Cause and consequence</h6>
									<button type="button" class="close" data-dismiss="modal"
										aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="">
									<div class="col-lg-12 col-md-12 sub_initiatives">
										<div class="card">
											<div
												class="d-flex flex-column employee_div_body_box sub-ini-box"
												id="sub-ini-box_view">
												<div id="cause-row-box_view"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- cause and consequence view end -->


				
					<!---------Chart-------->
					<jsp:include page="templates/risk_chart.jsp"></jsp:include>
					<div  class="col-lg-7 col-md-7 sub_initiatives select-toggle chart" id="chartdiv_risk">

					</div>


				<!-------Plan------->
					<jsp:include page="templates/risk_reducing_impact.jsp"></jsp:include>
					<div class="col-lg-4 col-md-4 sub_initiatives select-toggle plan" id="riskreducingimpactbody">
						
					</div>


					<div class="modal fade sub_initative_view_popup" tabindex="-1" 
						role="dialog" aria-labelledby="myLargeModalLabel_1"
						aria-hidden="true">
						<div class="modal-dialog modal-dialog-centered">
							<div class="modal-content">
								<div class="modal-header modalheadercolor">
									<h6 class="modal-title" id="myLargeModalLabel_1">View Controls</h6>
									<button type="button" class="close" data-dismiss="modal"
										aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="">
									<div class="col-lg-12 col-md-12 sub_initiatives">
										<div class="card">
											<div
												class="d-flex flex-column employee_div_body_box sub-ini-box"
												id="sub-ini-box_view">
												<div id="subinitiaties-row-box_view"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>


					<div class="modal fade riskplan_add_user_popup" tabindex="-1"
						role="dialog" aria-labelledby="myLargeModalLabel_1"
						aria-hidden="true">
						<div class="modal-dialog modal-dialog-centered">
							<div class="modal-content">
								<div class="modal-header modalheadercolor">
									<h6 class="modal-title" id="myLargeModalLabel_1">Edit Plan
										Users</h6>
									<button type="button" class="close getselectedplanUsers"
										id="plans_current_id" data-plans_sub_current_id=""
										data-plans_parent_id="" data-dismiss="modal"
										aria-label="Close">&times;</button>
								</div>
								<div id="user_subview" class=""></div>
								<div class="">
									<div class="col-lg-12 col-md-12">
										<div
											class="d-flex flex-column employee_div_body_box sub-ini-box"
											id="sub-ini-box_view">
											<span id="plan-ini-box_view_users"></span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="modal fade monitoring_add_user_popup" tabindex="-1"
						role="dialog" aria-labelledby="myLargeModalLabel_1"
						aria-hidden="true">
						<div class="modal-dialog modal-dialog-centered">
							<div class="modal-content">
								<div class="modal-header modalheadercolor">
									<h6 class="modal-title" id="myLargeModalLabel_1">Edit
										Monitoring Users</h6>
									<button type="button" class="close getselectedmonitoringUsers"
										id="monitoring_current_id" data-monitoring_sub_current_id=""
										data-monitoring_parent_id="" data-dismiss="modal"
										aria-label="Close">&times;</button>
								</div>
								<div id="user_subview" class=""></div>
								<div class="">
									<div class="col-lg-12 col-md-12">
										<div
											class="d-flex flex-column employee_div_body_box sub-ini-box"
											id="sub-ini-box_view">
											<span id="monitoring-ini-box_view_users"></span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!---------Monitoring-------->
					

					<!--#START Risk treatment View -->
					<div class="modal fade treatment_view_popup" tabindex="-1"
						role="dialog" aria-labelledby="myLargeModalLabel_1"
						aria-hidden="true">
						<div class="modal-dialog modal-dialog-centered">
							<div class="modal-content">
								<div class="modal-header modalheadercolor">
									<h6 class="modal-title" id="myLargeModalLabel_1">View Risk Treatment</h6>
									<button type="button" class="close" data-dismiss="modal"
										aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="col-lg-12 col-md-12 sub_initiatives">
									<div class="card">
										<div class="d-flex flex-column employee_div_body_box"
											id="treatment_view"></div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!---------risk treatment-------->
					<jsp:include page="templates/risk_treatment_template.jsp"></jsp:include>
					<div class="col-lg-4 col-md-4 sub_initiatives select-toggle treatment" id="risktreatmentbody">
						
					</div>



					<!--#END risk treatment View -->

					<!--#START monitoring View -->
					<div class="modal fade monitoring_view_popup" tabindex="-1" 
						role="dialog" aria-labelledby="myLargeModalLabel_1"
						aria-hidden="true">
						<div class="modal-dialog modal-dialog-centered">
							<div class="modal-content">
								<div class="modal-header modalheadercolor">
									<h6 class="modal-title" id="myLargeModalLabel_1">View
										Review & Monitoring</h6>
									<button type="button" class="close" data-dismiss="modal"
										aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="col-lg-12 col-md-12 sub_initiatives">
									<div class="card">
										<div class="d-flex flex-column employee_div_body_box"
											id="milestone_view"></div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!---------Monitoring-------->
					<jsp:include page="templates/risk_review_template.jsp"></jsp:include>
					<div class="col-lg-4 col-md-4 sub_initiatives select-toggle monitoring" id="riskreviewmonitoringbody">
						
					</div>



					<!--#END monitoring View -->

					<!-- comments view start -->
					<div class="modal fade comments_view_popup" tabindex="-1"
						role="dialog" aria-labelledby="myLargeModalLabel_1"
						aria-hidden="true">
						<div class="modal-dialog modal-dialog-centered">
							<div class="modal-content">
								<div class="modal-header modalheadercolor">
									<h6 class="modal-title" id="myLargeModalLabel_1">View
										Comments</h6>
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
														<div id="comments-row-box_view"></div>
													</ul>
												</div>	
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- comments view end -->
					<jsp:include page="modal/risk_comments_update_popup.jsp"></jsp:include>
					<jsp:include page="modal/risk_commentsreply_update_popup.jsp"></jsp:include>
					<jsp:include page="templates/riskcomments.jsp"></jsp:include>
					<jsp:include page="templates/risk_comments_template.jsp"></jsp:include>
					<div class="col-lg-4 col-md-6 sub_initiatives select-toggle comments" id="riskcomments">
					
					</div>
			  
				</div>
		</section>
		<!-- Plugins Js -->
		<script src="${contextroot}/js/app.min.js"></script>
		<script type="text/javascript"
			src="${contextroot}/js/knockout-3.5.0.js"></script>
		<script type="text/javascript"
			src="${contextroot}/js/daterangepicker.min.js"></script>

		<!-- Custom Js -->
		<script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
		<script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
		<script src="${contextroot}/js/admin.js"></script>
		<!-- Knob Js -->
		<script src="${contextroot}/js/jquery-ui.min.js"></script>
		<script src="${contextroot}/js/moment.js"></script>
		<script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
    	<script src="${contextroot}/js/bundles/amcharts4/core.js"></script>
    	<script src="${contextroot}/js/bundles/amcharts4/charts.js"></script>
    	<script src="${contextroot}/js/bundles/amcharts4/animated.js"></script>
		<script src="${contextroot}/js/bootstrap-popover-x.js"
			type="text/javascript"></script>
		<script src="${contextroot}/js/datepickerair.js"></script>
		<script src="${contextroot}/js/datepicker.en.js"></script>
		<script src="${contextroot}/js/chosen.jquery.min.js"></script>
		<script src="${contextroot}/js/widgets.js"></script>	
		<script type="text/javascript" src="${contextroot}/js/riskview.js"></script>
		<script src="${contextroot}/js/handlebars.js"></script>
		<script src="${contextroot}/js/notify.js"></script>
		<script src="${contextroot}/js/apexcharts.js"></script>
		<script src="${contextroot}/js/initial.js"></script>
		<script src="${contextroot}/js/select2.min.js"></script>

		<script>
	$(".commentReply").click(function () {
		$("#riskComments").hide();
		$("#riskCommentsReply").show();
	});	
	$(document).ready(function(){
				
		$('.riskplan_add_user_popup,.riskactivities_add_user_popup').modal({show: false, backdrop: 'static',keyboard: false});
		
    });
     $('.modal-dialog').draggable({
            handle: ".modal-header"
        }); 		
	</script>

	</body>