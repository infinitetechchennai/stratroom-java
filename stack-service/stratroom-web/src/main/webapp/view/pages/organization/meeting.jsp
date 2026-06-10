<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta content="width=device-width, initial-scale=1" name="viewport" />
<title>StratRoom</title>
<link href="${contextroot}/css/app.min.css" rel="stylesheet">
<!-- Custom Css -->
<link href="${contextroot}/css/style.css" rel="stylesheet" />
<link href="${contextroot}/css/custom.css" rel="stylesheet" />
<link href="${contextroot}/css/initatives.css" rel="stylesheet" />
<link href="${contextroot}/css/icheck-bootstrap.min.css" rel="stylesheet" />
<link href="${contextroot}/css/startroom/wedgets.css" rel="stylesheet" />
<!-- You can choose a theme from css/styles instead of get all themes -->
<link href="${contextroot}/css/styles/all-themes.css" rel="stylesheet" />
<link href="${contextroot}/css/daterangepicker.min.css" rel="stylesheet">
<link rel="stylesheet" href="${contextroot}/css/datepickerair.css">
<link rel="stylesheet" href="${contextroot}/css/jquery-ui.min.css">
<link rel="stylesheet" href="${contextroot}/css/employee.css" rel="stylesheet" />
<script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>
<script type="text/javascript"
	src="${contextroot}/js/jquery/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="${contextroot}/js/jquery/additional-methods.min.js"></script>
<script src="${contextroot}/js/gijgo.min.js" type="text/javascript"></script>
<link href="${contextroot}/css/gijgo.min.css" rel="stylesheet"
	type="text/css" />
<script async defer src="${contextroot}/js/buttons.js"></script>
<link rel="stylesheet"
	href="${contextroot}/css/fonts/fontawesome_v_5/font-awesome.min.css">
<link rel="stylesheet" href="${contextroot}/css/fonts/fontawesome_v_5/all.css">
<link href="${contextroot}/css/jquery.contextMenu.min.css" rel="stylesheet">
<script>
	function preview_images() {
		var total_file = document.getElementById("images").files.length;
		for (var i = 0; i < total_file; i++) {
			$("#image_preview")
					.append(
							"<div class='col-md-3' style='padding-bottom: 4%' '><img class='img-responsive' src='"
									+ URL
											.createObjectURL(event.target.files[i])
									+ "'></div>");
		}
	}
</script>

<style>
.meetinggreen {
	color: #20eaab;
}

.meetingyellow {
	color: #ffd500;
}

.meetingred {
	color: #e84343;
}

.nameText {
	margin: 0 0 1em 0;
	overflow: hidden;
}

.nameText h4 {
	margin: 0;
}

.line-clamp {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	-webkit-box-pack: end;
	overflow: hidden;
}

.meetingtimeText {
	margin: 10px 0 1em 0;
	overflow: hidden;
}

.meetingtimeText p {
	margin: 0;
}

.meetingline-clamp {
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}

.locationText {
	margin: 0 0 0 0;
	overflow: hidden;
}

.locationText p {
	margin: 0;
}

.locationline-clamp {
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}

.employee_div_body_box {
	padding: 25px !important;
}

input, button, select, optgroup, textarea {
	font-family: "Poppins", sans-serif !important;
}

#awsviewlink {
	word-break: break-all;
}

.pagecolumncontent {
	min-height: 52px !important;
	max-height: 52px !important;
}

.meetingtimecontent {
	min-height: 32px !important;
	max-height: 32px !important;
}

.locationcontent {
	min-height: 18px !important;
	max-height: 18px !important;
}

.swotboxdefaultBox {
	min-height: 270px !important;
	max-height: 270px !important;
}

.orientation-right {
	top: 60px !important;
	right: 0 !important;
	left: auto !important;
	position: fixed;
}

.cardBox {
	border-radius: 8px !important;
	border: none !important;
	padding: 16px 16px 0 16px;
}

.card-icons i {
	font-size: 12px;
	color: #919191;
	cursor: pointer;
}

.card-icons i:nth-child(2) {
	margin-left: 8px;
	font-size: 15px;
}

.page-card-title {
	color: #1e252d;
	font-size: 15px;
}

.meeting-time {
	color: #919191;
}

.meeting-time span:nth-child(2) {
	margin-left: 8px;
}

.meeting-time span:nth-child(3) {
	text-align: right;
}

.meeting-location span {
	color: #1e252d;
	font-weight: 500;
	font-size: 12px;
}

.card-footer {
	display: flex !important;
	-webkit-box-orient: horizontal !important;
	-webkit-box-direction: normal !important;
	flex-direction: row !important;
	justify-content: space-evenly;
	text-align: center;
	padding: 10px 0;
}

.card-footer-icon i {
	font-size: 18px;
	color: rgb(226, 226, 226) !important;
	cursor: pointer;
}

.modal-custom-input {
	border: 1px solid #e5e5e5 !important;
	border-radius: 4px !important;
	width: 98% !important;
	height: 65% !important;
	padding: 0 8px !important;
	font-size: 14px !important;
}

.gj-datepicker-md [role="right-icon"] {
	top: 6px;
}

.gj-timepicker-md [role="right-icon"] {
	top: 5px;
}

.input-calender-icon-from {
	color: #5a6169;
	position: absolute;
	bottom: 30%;
	right: 8%;
	font-size: 16px;
}

.input-calender-icon-to {
	color: #5a6169;
	position: absolute;
	bottom: 30%;
	right: 8%;
	font-size: 16px;
}

.input-calender-icon1 {
	color: #5a6169;
	position: absolute;
	bottom: 40%;
	right: 2%;
	font-size: 16px;
}

.paging-nav {
	text-align: right;
	padding-top: 2px;
}

.paging-nav a {
	margin: 6px 2px;
	text-decoration: none;
	display: inline-block;
	padding: 4px 10px;
	background: #71767a;
	color: #fff !important;
	border-radius: 3px;
}

.paging-nav .selected-page {
	background: #1e252d;
	font-weight: bold;
}

#fileuploadTable thead tr th {
	border: 1px solid #cecece !important;
	padding: 6px 4px 6px 4px;
	font-size: 12px !important;
	color: #4e4e4e;
	background: #f7f7f7;
	font-weight: 600;
}

#fileuploadTable tbody tr td {
	border: 1px solid #cecece !important;
	padding: 8px 4px 8px 4px !important;
	font-size: 12px !important;
	color: #535353;
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
		<jsp:include page="modal/meetingModal.jsp"></jsp:include>

		<div id="deleteModalswot" class="modal fade">
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
							<input type="hidden" id="deleterecordid" />
							<button type="button" class="btn-default1 btn"
								data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
							<button type="button"
								class="btn btn-danger confirm-modal-deleteBtn"
								onclick="handleswoteventdelete()">Delete</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!--#Multionwer add swot start -->
		<div class="modal fade swot_add_multiuser_popup" tabindex="-1"
			role="dialog" aria-labelledby="myLargeModalLabel_1"
			aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header modalheadercolor">
						<h6 class="modal-title" id="myLargeModalLabel_1">Edit Users</h6>
						<button type="button" class="close getselectedActivitiesUsers"
							id="activities_current_id" data-activities_sub_current_id=""
							data-dismiss="modal" aria-label="Close">&times;</button>
					</div>
					<div id="user_subview" class=""></div>
					<input type="hidden" id="swotajaxid">
					<div class="">
						<div class="col-lg-12 col-md-12">
							<div class="d-flex flex-column employee_div_body_box sub-ini-box"
								id="sub-ini-box_view" style="padding: 8px !important;">
								<span id="activities-ini-box_view_users"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--#Multionwer add swot end -->

		<div id="addpeople" class="modal fade" role="dialog">
			<div class="modal-dialog">
				<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-header"
						style="background-color: #1e252d; color: #fff;">
						<h6 class="modal-title" color : #f0f2f5; id="myLargeModalLabel_1">Edit
							People</h6>
						<button type="button" class="close peopleselectedUsers"
							id="closePopupId" data-dismiss="modal" aria-label="Close">&times;
						</button>
					</div>
					<!--<div class="modal-body">-->

					<input type="hidden" id="responsibleid">
					<div class="d-flex flex-column employee_div_body_box sub-ini-box"
						id="sub-ini-box_view">
						<span class="listusers"> </span>
					</div>

					<!--<button type="button" class="form-control add" id="peopleSave" style="background-color: #1e252d; color: #fff;">
						Save</button>
				</div>
				<div class="modal-footer">
					<button type="button" id="closePopupId" onclick="checkmodalisclosedornot()" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>-->
				</div>
			</div>
		</div>

		<div id="addpeopleactions" class="modal fade" role="dialog">
			<div class="modal-dialog">
				<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-header"
						style="background-color: #1e252d; color: #fff;">
						<h6 class="modal-title" color : #f0f2f5; id="myLargeModalLabel_1">Edit
							People</h6>
						<button type="button" class="close actionpeopleselectedUsers"
							id="actionsclosePopupId" data-dismiss="modal" aria-label="Close">&times;
						</button>
					</div>
					<!--<div class="modal-body">-->

					<div class="d-flex flex-column employee_div_body_box sub-ini-box"
						id="sub-ini-box_view">
						<input type="hidden" id="actionsresponsibleid"> <span
							class="actionslistusers"> </span>
					</div>

					<!--<button type="button" class="form-control add" id="actionspeopleSave" style="background-color: #1e252d; color: #fff;">
						Save</button>
				</div>
				<div class="modal-footer">
					<button type="button" id="closePopupId" onclick="checkmodalisclosedornot()" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>-->
				</div>
			</div>
		</div>

		<div id="SendingAttachment" class="modal fade" role="dialog">
			<div class="modal-dialog">
				<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-header"
						style="background-color: #1e252d; color: #fff;">
						<h6 class="modal-title" color : #f0f2f5; id="">Please wait</h6>
					</div>
					<div class="modal-body">
						<h6>Sending Attachment...</h6>
					</div>
				</div>
			</div>
		</div>

		<div id="ViewAttachment" class="modal fade" role="dialog">
			<div class="modal-dialog">
				<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-header"
						style="background-color: #1e252d; color: #fff;">
						<h6 class="modal-title" color : #f0f2f5; id="">View Link</h6>
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<h6>Click view below link</h6>
						<a href="" target="_blank" id="awsviewlink"></a>
					</div>
				</div>
			</div>
		</div>

		<!-- Recommendation Modal -->
		<div id="recommendation" class="modal fade" role="dialog">
			<div class="modal-dialog modal-lg" style="margin-top: 8%;">
				<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-header">
						<h4>Recommendation</h4>
						<div class="float-right">
							<button onclick="notes('note_table')"
								class="form-control recommendationevent rounded-circle" disabled
								style="margin-top: -4px; border: none;">
								<i class="fa fa-plus"></i>
							</button>
						</div>
					</div>
					<div class="modal-body">
						<table id="note_table" class="table table-bordered">
							<thead class="bg-light">
								<tr>
									<th>Recommendation</th>
									<th style="width: 50px;">Responsible</th>
									<th style="width: 50px;">Actions</th>
								</tr>
							</thead>
							<tbody id="recommendationbody">
							</tbody>
						</table>

					<div class="row m-t-10">
						<div class="col-md-12">
						  <hr />
						</div>
						<div class="col-12">
							<div class="form-line right actionsbtn">
								<button type="button" class="btn-default1 btn recommendationclose" data-dismiss="modal" data-i18n="Cancel">
								  Cancel
								</button>
								<button class="initative_save_btn" onclick="recommendationsubmit()" data-i18n="Save">
								  Save
								</button>
							</div>
						</div>
					</div>

					</div>
				</div>
			</div>
		</div>

		<!-- Action Modal -->
		<div id="action" class="modal fade" role="dialog">
			<div class="modal-dialog modal-lg"
				style="margin-top: 6%; max-width: 60% !important;">
				<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-header">
						<h4>Actions</h4>
						<div class="float-right">
							<button onclick="action('action_table')" disabled
								class="form-control actionaddevent rounded-circle"
								style="margin-top: -4px; border: none;">
								<i class="fa fa-plus"></i>
							</button>
						</div>
					</div>
					<div class="modal-body">
						<input type="hidden" id="actionsid">
						<table id="action_table" class="table table-bordered">
							<thead class="bg-light">
								<tr>
									<th>Actions</th>
									<th style="width: 150px;">By Date</th>
									<th style="width: 50px;">Responsible</th>
									<th style="width: 50px;">Status</th>
									<th style="width: 50px;">Actions</th>
								</tr>
							</thead>
							<tbody id="actionbody">

							</tbody>
						</table>

					<div class="row m-t-10">
						<div class="col-md-12">
						  <hr />
						</div>
						<div class="col-12">
							<div class="form-line right actionsbtn">
								<button type="button" class="btn-default1 btn actionclose" data-dismiss="modal" data-i18n="Cancel">
								  Cancel
								</button>
								<button class="initative_save_btn" onclick="actionssubmit()" data-i18n="Save">
								  Save
								</button>
							</div>
						</div>
					</div>

					</div>
				</div>
			</div>
		</div>

		<!-- File upload Modal -->
		<div id="uploaded_files" class="modal fade" role="dialog">
			<div class="modal-dialog modal-dialog-centered modal-lg">
				<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-header">
						<h4 data-i18n="File Upload">File Upload</h4>
						<button type="button" class="close pull-right"
							data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body">
						<div class="row" style="padding: 16px;">
							<div class="col-md-12"
								style="margin-top: -12px; padding-bottom: 8px;">
								<button class="btn btn-custom-secondary" data-toggle="modal"
									data-target="#file_upload_popup">
									<i class="fa fa-plus"></i>
								</button>
							</div>
							<div class="col-md-12">
								<div class="tableBody">
									<div class="table-responsive" id="listfileuploadTable">
							
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- File Upload PopUp -->
		
		<div class="modal fade" id="file_upload_popup" tabindex="-1"
			role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h4 data-i18n="File Upload">File Upload</h4>
						<button type="button" id="closeUpload" class="close pull-right"
							data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="form-group col-md-10" style="padding-right: 4px;">
								<input type="file" class="modal-custom-input" id="attachementuploadfile"
									style="height: 38px !important; padding: 5px !important; margin-bottom: 8px;"
									accept=".pdf,.ppt,.jpeg,.xlsx,.doc,.docx" /> <span>Supported
									file type (jpeg,pdf,pptx,xlsx,docx)</span>
							</div>
							<div class="form-group col-md-2" style="padding-left: 4px;">
								<button type="button" id="attachementupload"
									class="btn custom-form-control btn-custom-primary saveUpload">
									Upload</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div id="deleteAttachmentModal" class="modal fade">
			<div class="modal-dialog modal-confirm">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Delete</h4>
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						<h5 class="confirm-modal-content">Do you really want to
							delete these records?</h5>
						<br>
						<div class="form-line right">
							<button type="button" class="btn-default1 btn"
								data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
							<button type="button"
								class="btn btn-danger confirm-modal-deleteBtn"
								onclick="deleteuploadAttachment()">Delete</button>
						</div>
					</div>
				</div>
			</div>
		</div>



		<section class="content">

			<!-- Page Header -->

			<div class="page-header row no-gutters py-2 m-t--70">
				<div
					class="col-lg-6 col-md-6 text-center text-sm-left pt-2 mb-0 ml-4">
					<h5 class="page-title"
						style="font-weight: 600; text-transform: uppercase;" data-i18n="Meetings">Meetings</h5>
				</div>
			</div>

			<c:if test="${userPrincipal != null}">
				<input id="userPrincipal" type="hidden" name="userPrincipal"
					value="<c:out value="
				${userPrincipal.profile.empId}" />">
			</c:if>
			<c:if test="${pagenumber != null}">
				<input id="pagenumber" type="hidden" name="pagenumber"
					value="<c:out value=" ${pagenumber}" />">
			</c:if>

			<!-- End Page Header -->
			<div class="container-fluid">
				<!-- COl -->

				<jsp:include page="templates/meetingchild.jsp"></jsp:include>
				<script id="swot-strength-template-parent" type="x-tmpl-mustache">
			{{{bodyRows}}}
		</script>

				<div class="row" id="strength_section"></div>
			</div>


			<!-- Modal -->
			<div id="impact" class="modal fade" role="dialog">
				<div class="modal-dialog">
					<!-- Modal content-->
					<div class="modal-content">
						<div class="modal-header">
							<!--button type="button" class="close pull-right" data-dismiss="modal">&times;</button-->
							<h4>Impacts</h4>
						</div>
						<div class="modal-body">
							<p>Impact</p>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>


<c:if test="${userPrincipal != null}">
			<input id="userPrincipal" type="hidden" name="userPrincipal" value="<c:out value="
				${userPrincipal.profile.empId}" />">
		</c:if>
		<c:if test="${pagenumber != null}">
			<input id="pagenumber" type="hidden" name="pagenumber" value="<c:out value=" ${pagenumber}" />">
		</c:if>

			<!-- File Upload PopUp -->
			<div class="modal fade file_upload_popup" tabindex="-1" role="dialog"
				aria-labelledby="myLargeModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-lg">
					<div class="modal-content">
						<div class="modal-header">
							<h6 class="modal-title" id="myLargeModalLabel" data-i18n="File Upload">File Upload</h6>
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<div class="row">
								<form action="" method="post" enctype="multipart/form-data">
									<div class="col-md-12" style="width: 100%; margin-bottom: 2%;">
										<input type="file"
											style="padding-bottom: 12%; padding-top: 3%; padding-right: 5%;"
											class="form-control" id="images" name="images[]"
											onchange="preview_images();" multiple />
									</div>
									<div class="col-md-12" style="margin-bottom: 6%;">
										<input type="submit" class="btn" name="submit_image"
											style="background-color: #1e252d; color: #ffff;"
											value="Upload Multiple Image" />
									</div>
								</form>
							</div>
							<div class="row" id="image_preview"></div>
						</div>
					</div>
				</div>
			</div>

			<!-- End of File Upload PopUp -->

			<!-- Modal -->
			<div id="input" class="modal fade" role="dialog">
				<div class="modal-dialog">
					<!-- Modal content-->
					<div class="modal-content">
						<div class="modal-header"
							style="background-color: #1e252d; color: #fff;">
							<!--button type="button" class="close pull-right" data-dismiss="modal">&times;</button-->
							<h4>Input Form</h4>
						</div>
						<div class="modal-body">
							<div>
								<textarea class="form-control" rows="4" cols="80"
									name="input_form_text" id="input_form_text"> </textarea>
								<div class="text-right color-white">
									<br /> <input class="btn green_btn" id="inputform_sbt"
										style="background-color: #1e252d; color: #fff;" type="submit"
										value="Submit" />
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default"
								data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>

			<!-- Modal -->
			<div id="flag" class="modal fade" role="dialog">
				<div class="modal-dialog">
					<!-- Modal content-->
					<div class="modal-content">
						<div class="modal-header">
							<!--button type="button" class="close pull-right" data-dismiss="modal">&times;</button-->
							<h4>Status</h4>
						</div>
						<div class="modal-body">
							<div>
								<div class="row">
									<div class="col-md-4 custom-control custom-radio">
										<input type="radio" class="custom-control-input"
											id="defaultChecked1" name="statusflag" value="flag-green"
											checked /> <label class="custom-control-label"
											for="defaultChecked1"><img
											src="images/flag-green.png" alt="status" width="23px"
											height="23px" /></label>
									</div>
									<div class="col-md-4 custom-control custom-radio">
										<input type="radio" class="custom-control-input"
											id="defaultChecked2" name="statusflag" value="flag-orange" />
										<label class="custom-control-label" for="defaultChecked2"><img
											src="images/flag-orange.png" alt="status" width="23px"
											height="23px" /></label>
									</div>
									<div class="col-md-4 custom-control custom-radio">
										<input type="radio" class="custom-control-input"
											id="defaultChecked3" name="statusflag" value="flag-red" /> <label
											class="custom-control-label" for="defaultChecked3"> <img
											src="images/flag-red.png" alt="status" width="23px"
											height="23px" />
										</label>
									</div>
								</div>
								<br />

								<button type="button" class="form-control green_form addflagb">
									Submit</button>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default"
								data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Plugins Js -->

		<script src="${contextroot}/js/app.min.js"></script>
		<script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
		<script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
		<!-- Custom Js -->
		<script src="${contextroot}/js/admin.js"></script>
		<script src="${contextroot}/js/file-preview.js"></script>
		<script src="${contextroot}/js/bundles/amcharts4/core.js"></script>
		<script src="${contextroot}/js/bundles/amcharts4/charts.js"></script>
		<script src="${contextroot}/js/bundles/amcharts4/animated.js"></script>

		<!-- Knob Js -->

		<script src="${contextroot}/js/jquery-ui.min.js"></script>
		<script src="${contextroot}/js/moment.js"></script>
		<script src="${contextroot}/js/paging.js"></script>
		<script src="${contextroot}/js/pages/core.js"></script>
		<script src="${contextroot}/js/pages/charts.js"></script>
		<script src="${contextroot}/js/jquery.editable.min.js"></script>
		<script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
		<script src="${contextroot}/js/pickr.es5.min.js"></script>
		<script src="${contextroot}/js/datepickerair.js"></script>
		<script src="${contextroot}/js/datepicker.en.js"></script>
		<script src="${contextroot}/js/widgets.js"></script>
		<script src="${contextroot}/js/pages/widgets/chart-widget.js"></script>
		<script type="text/javascript"
			src="${contextroot}/js/knockout-3.5.0.js"></script>
		<script type="text/javascript"
			src="${contextroot}/js/daterangepicker.min.js"></script>

		<script src="${contextroot}/js/meeting.js"></script>
		<script src="${contextroot}/js/initial.js"></script>
		<script src="${contextroot}/js/datepickerair.js"></script>
		<script src="${contextroot}/js/datepicker.en.js"></script>
		<script src="${contextroot}/js/notify.js"></script>
		<script>
			$(
					'.swot_add_multiuser_popup,#addpeople,#recommendation,#addpeopleactions')
					.modal({
						show : false,
						backdrop : 'static',
						keyboard : false
					});
					$('.modal-dialog').draggable({
            handle: ".modal-header"
        });
		</script>
</body>