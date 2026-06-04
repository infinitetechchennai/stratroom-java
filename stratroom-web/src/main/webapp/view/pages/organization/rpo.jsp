<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
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
<script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>


    <link href="assets/css/main.css?v0.004" rel="stylesheet">
    <link href="assets/css/responsive.css" rel="stylesheet">
     <link href="assets/css/bootstrap.min.css" rel="stylesheet">
	   <link href="assets/css/basic.css?v0.006" rel="stylesheet">

     <!-- Font Awsome Icons -->
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

</head>
<style>
	.select2 .select2-search--dropdown {
        padding: 3px 2px 0px 0px;
    }
    .select2-container--default .select2-selection--single .select2-selection__rendered {
        height: 38px !important;
        font-size: 14px !important;
    }
    #updated {
        font-size: 15px !important;
    }
    #filess {
        font-size: 15px !important;
    }
    #activity {
        font-size: 15px !important;
    }
    .activated {
        border-bottom: 5px solid rgb(140, 140, 148);
    }
    .select2-results ul li {
        font-size: 14px !important;
    }
    #lblCartCount {
        font-size: 8px;
        background: #4b61ca;
        color: #fff;
        padding: 0px 5px;
        font-weight: 600;
        vertical-align: top;
        margin-left: -10px;
        border-radius: 50%;
        height: 20px;
    }
    #table12 {
        width: 150% !important;
    }
    .select2-container--default .select2-search--dropdown .select2-search__field {
        border: 1px solid #aaa;
        border-radius: 4px !important;
        font-size: 14px !important;
    }
    .select2-container .select2-selection--single {
        height: 38px !important;
        border-radius: 4px !important;
    }
    .select2-selection--single .select2-selection__rendered {
        line-height: 38px;
    }
    .select2-container--default .select2-selection--single .select2-selection__arrow {
        height: 38px !important;
    }
    .select2-container--default .select2-selection--single .select2-selection__rendered {
        color: #444;
        font-size: 14px !important;
        line-height: 38px !important;
    }
    input.select2-search__field {
        height: 38px !important;
        font-size: 14px !important;
        font-weight: normal !important;
    }
    .select2-selection--single {
        border: 1px solid #ced4da !important;
        border-radius: 4px !important;
        font-size: 14px !important;
    }
</style>
<body class="light">
		<input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
		<jsp:include page="../common/top-navigation.jsp"></jsp:include>
		  <header id="header" class="header shadow-sm">
	  
		<jsp:include page="../common/left-navigation.jsp"></jsp:include>
    </header>
<div class="modal fade file_upload_popup" id="file-validate-form"
			tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
			aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered modal-lg">
				<div class="modal-content">
					<div class="modal-header" style="height:45px !important;padding: 10px 16px 10px 16px !important;margin: -10px -10px 12px -10px !important;">
						<h4 style="color: #fff;">File Upload</h4>
						<button type="button" class="close pull-right"
							data-dismiss="modal" style="color: #fff;">&times;</button>
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
						<input type="hidden" id="orgimportmethodtype">
						<div class="row" id="file-upload">
							<div class="col-md-12">
								<div class="form-group">
									<label for="risk_rating"
										style="font-size: 14px; font-weight: 600;"> Import
										Category</label> <select id="uploadcategory" name="category"
										class="form-control browser-default" style="height:30px !important;">
										<option value="">Choose</option>
										<option value="Organisation">Organisation</option>
										<option value="Scorecard">Scorecard</option>
										<option value="Initiative & Projects">Initiatives & Projects</option>
										<option value="Risk">Risk</option>
										<option value="ProjectFormulation">Project Formulation</option>
										<option value="RiskFormulation">Risk Formulation</option>
										<option value="StrategyFormulation">Strategy Formulation</option>
										<option value="UserRole">User</option>
									</select> <span id="categoryerrorshow" style="color: red; display: none"></span>
								</div>

								<div class="form-group">
									<label class="control-label" style="font-size: 14px; font-weight: 600;">Upload File</label>
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
										<input type="file" id="importfile" name="img_logo"
											class="dropzone" accept=".xlsx, .xls, .csv" />
									</div>
									<span id="fileerrorshow" style="color: red; display: none"></span>
								</div>
							</div>
							<div class="col-md-12" id="lineD">
								<hr />
							</div>
						</div>

						<div class="col-md-12">
							<div class="form-line right" id="lineS">
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

							</div>
						</div>
						<div class="col-md-12">
							<hr />
						</div>
						<div class="col-md-12">
							<div class="form-line" id="validatescoreCardImportHide">
							</div>
						</div>
					</div>

					<div class="row" id="file-save" style="display: none;">
						<div class="col-md-12">
							<div class="col-md-12 img-center">
								<img src="images/Success.png" alt="Verified" />
								<span id="statisticmessage" style="text-align: center; margin-left: 42% !important; color :green; width: 100%; margin-right: 25% !important;"></span>

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

		
    <main class="pt-2 pb-2">
		<c:if test="${pageId != null}">
        <input id="pagenumber" type="hidden" name="pagenumber" value="<c:out value="${pageId}" />">
    </c:if>
        <div class="container-lg">
            <div class="page-header grid gap-2 pb-1">
                <div class="g-col-8 d-flex align-items-center">
                    <h4 class="title">
                        <span class="icon">
                            <img src="/stratroom/images/rpo-i.svg" alt="control-panel" title="control-panel">
                        </span>
                        RPO
                    </h4>
                </div>
                <div class="load-page page-actions g-col-4">
					<select class="btn btn-custom-secondary pull-right" id="approvedDraft" style="border-radius: 5px;border: 1px solid #dddd;"> 
                       <option value="APPROVED">Approved</option>
                       <option value="DRAFT">In Progress</option>
                    </select>
                       <input type="hidden" id="changeId" name="changeId" value="">
                    <div class="page-icons">
                        <ul>
                            <li>
                                <!-- <span >
                                    <i class="fas fa-eye" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                        title="View"></i>
                                </span> -->
                                <a href="#" class="action" id="popoverFilter">
                                    <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="View">
                                        <img src="/stratroom/images/view-i.svg" />
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="icon"  data-bs-toggle="tooltip" data-bs-placement="bottom"
                                    data-bs-title="Export">
                                    <img src="/stratroom/images/export-i.svg" alt="export" title="export">
                                </span>
                                </a>
                            </li>
                            <li>
                                <a href=".scorecard_description_popup" data-bs-toggle="modal">
                                    <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                                    <i class="fas fa-plus title_edit_icon"></i>
                                    </span>
                                </a>
                            </li>
                        </ul>
							
                    </div>
				
                </div>
            </div>
        </div>
            <div class="container-lg py-2">
            <div class="rpo-container">
                <div class="row g-2">
                    <div class="col-12">
                        <div class="card table-card border">
                            <div
                                class="card-header border-0 bg-transparent pb-0 d-flex gap-2 align-items-center justify-content-between">
                                <h5 class="card-title fs-6 mb-0">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">Business Impact
                                        Analysis</strong>
                                </h5>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive" id="rpo_table">
                                   
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


<!-- Popoup Start -->
<div class="modal fade scorecard_description_popup" tabindex="-1" aria-labelledby="biaModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <!-- Modal Header -->
      <div class="modal-header">
        <h6 class="modal-title fs-5" id="biaModalLabel">Business Impact Analysis</h6>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <!-- Modal Body -->
      <div class="modal-body">
        <form id="objectiveForm">
          <div class="row g-3">
            <div class="col-12 col-md-6">
              <label for="saveprocessService" class="form-label">Process (POS)</label>
              <select class="form-Select Service int-status-multi-select"
        multiple
        id="saveprocessService"></select>

            </div>

            <div class="col-12 col-md-6">
              <label for="savevitalService" class="form-label">Name of Vital Records</label>
              <select class="form-control form-select vitalService int-status-multi-select" multiple="multiple" id="savevitalService"></select>
            </div>

            <div class="col-12 col-md-6">
              <label for="savemediaService" class="form-label">Type of Media</label>
              <select class="form-control form-select mediaService int-status-multi-select" multiple="multiple" id="savemediaService"></select>
            </div>

            <div class="col-12 col-md-6">
              <label for="savebackupService" class="form-label">Backup Method</label>
              <select class="form-control form-select backupService int-status-multi-select" multiple="multiple" id="savebackupService"></select>
            </div>

            <div class="col-12 col-md-6">
              <label for="savebackuptimeService" class="form-label">Backup Time</label>
              <select class="form-control form-select backuptimeService int-status-multi-select" multiple="multiple" id="savebackuptimeService"></select>
            </div>

            <div class="col-12 col-md-6">
              <label for="saveretentionService" class="form-label">Retention</label>
              <select class="form-control form-select retentionService int-status-multi-select" multiple="multiple" id="saveretentionService"></select>
            </div>

            <div class="col-12 col-md-6">
              <label for="saverecoveryService" class="form-label">Database Recovery Strategy</label>
              <select class="form-control form-select recoveryService int-status-multi-select" multiple="multiple" id="saverecoveryService"></select>
            </div>
          </div>
        </form>
      </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary secondary-btn" data-bs-dismiss="modal"
                        aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary  initative_save_btn" value="Save" onclick="saveRPOpage()">Save
                    </button>
                    <div class="modal-audit">
                        <h5 class="title">
                            Audit
                        </h5>
                        <div class="audit-listing">
                            <div class="audit-box">
                                <div class="title">Created By :</div>
                                <div  id="nameCreated"></div>
                            </div>
                            <div class="audit-box">
                                <div class="title">Modified By :</div>
                                <div id="nameUpdated"></div>
                            </div>
                            <div class="audit-box">
                                <div class="title">Created Date :</div>
                                <div id="dateCreated"></div>
                            </div>
                            <div class="audit-box">
                                <div class="title">Modified Date :</div>
                                <div id="dateUpdated"></div>
                            </div>
                        </div>
                    </div>
                </div>
      <!-- Modal Footer -->
    
    </div>
  </div>
</div>
<!-- Popup end -->

<!-- Update Popup start -->
<div class="modal fade edit_update_table" tabindex="-1"
     aria-labelledby="editBiaModalLabel" aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">

            <!-- Header -->
            <div class="modal-header">
                <h6 class="modal-title fs-5" id="editBiaModalLabel">
                    Business Impact Analysis
                </h6>
                <button type="button" class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"></button>
            </div>

            <!-- Body -->
            <div class="modal-body">
                <form id="objectiveForm">
                    <div class="row g-3">

                        <!-- ID -->
                        <div class="col-12">
                            <label class="form-label">ID</label>
                            <input class="form-control updateid"
                                   id="updateid"
                                   readonly>
                        </div>

                        <div class="col-12 col-md-6">
                            <label class="form-label">Process (POS)</label>
                            <select class="form-control form-SelectService int-status-multi-select"
                                    multiple="multiple"
                                    id="processServiceUpdate"></select>
                        </div>

                        <div class="col-12 col-md-6">
                            <label class="form-label">Name of Vital Records</label>
                            <select class="form-control form-select vitalService int-status-multi-select"
                                    multiple="multiple"
                                    id="vitalServiceUpdate"></select>
                        </div>

                        <div class="col-12 col-md-6">
                            <label class="form-label">Type of Media</label>
                            <select class="form-control form-select mediaService int-status-multi-select"
                                    multiple="multiple"
                                    id="mediaServiceUpdate"></select>
                        </div>

                        <div class="col-12 col-md-6">
                            <label class="form-label">Backup Method</label>
                            <select class="form-control form-select backupService int-status-multi-select"
                                    multiple="multiple"
                                    id="backupServiceUpdate"></select>
                        </div>

                        <div class="col-12 col-md-6">
                            <label class="form-label">Backup Time</label>
                            <select class="form-control form-select backuptimeService int-status-multi-select"
                                    multiple="multiple"
                                    id="backuptimeServiceUpdate"></select>
                        </div>

                        <div class="col-12 col-md-6">
                            <label class="form-label">Retention</label>
                            <select class="form-control form-select retentionService int-status-multi-select"
                                    multiple="multiple"
                                    id="retentionServiceUpdate"></select>
                        </div>

                        <div class="col-12 col-md-6">
                            <label class="form-label">Database Recovery Strategy</label>
                            <select class="form-control form-select recoveryService int-status-multi-select"
                                    multiple="multiple"
                                    id="recoveryServiceUpdate"></select>
                        </div>

                    </div>
                </form>
            </div>
  <input type="hidden" id="rpocreatedTime">
                    <input type="hidden" id="rpoupdatedTime">
                    <input type="hidden" id="createId">

            <!-- Footer -->
              <div class="modal-footer">
                    <button type="button" class="btn btn-secondary secondary-btn" data-bs-dismiss="modal"
                        aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary  initative_save_btn" value="Save" onclick="updateRPOpage()">Save
                    </button>
                    <div class="modal-audit">
                        <h5 class="title">
                            Audit
                        </h5>
                        <div class="audit-listing">
                            <div class="audit-box">
                                <div class="title">Created By :</div>
                                <div  id="nameCreated"></div>
                            </div>
                            <div class="audit-box">
                                <div class="title">Modified By :</div>
                                <div id="nameUpdated"></div>
                            </div>
                            <div class="audit-box">
                                <div class="title">Created Date :</div>
                                <div id="dateCreated"></div>
                            </div>
                            <div class="audit-box">
                                <div class="title">Modified Date :</div>
                                <div id="dateUpdated"></div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</div>

<!-- Update Popup end -->

<!-- Delete Popup Start -->
<div class="modal custom-modal custom-delete-modal fade" id="delete_popup" data-bs-backdrop="static"
data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" style="--stratroom-modal-width:320px">
    <div class="modal-content">
        <div class="modal-body">
            <div class="card custom-card delete-card border-0">
                <div class="card-body">

                    <div class="delete-box">
                        <h4 class="title">Do you really want to delete?</h4>
                        <div class="btn-wrap">
                            <button type="button" class="btn btn-sm btn-label-secondary rounded-pill"
                                data-bs-dismiss="modal" aria-label="Close">
                                Cancel
                            </button>
                            <button class="btn btn-sm btn-danger rounded-pill" onclick="deleteRPOpage()">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
</div>
<!-- Delete Popup End -->


<!-- jQuery Start -->
<!-- Plugins Js -->
   		<!-- Plugins Js -->
<link href="assets/css/pickr.min.css" rel="stylesheet">
    <link href="assets/css/daterangepicker.min.css" rel="stylesheet">
    <link href="assets/css/jquery-ui.min.css" rel="stylesheet">
    <link href="assets/css/select2.min.css" rel="stylesheet" />
		<script src="${contextroot}/js/app.min.js"></script>
		<script type="text/javascript"
			src="${contextroot}/js/knockout-3.5.0.js"></script>
<script type="text/javascript"
			src="${contextroot}/js/daterangepicker.min.js"></script>
      <script src="${contextroot}/js/datepickerair.js"></script>
<script src="${contextroot}/js/datepicker.en.js"></script>
		<!-- Custom Js -->

<!-- Custom Js -->
    <script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
	<script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
    <script src="js/admin.js"></script>
    <script src="js/file-preview.js"></script>
    <script type="text/javascript" src="${contextroot}/js/knockout-3.5.0.js"></script>

<!-- Knob Js -->
    <script src="js/jquery-ui.min.js"></script>
    <script src="js/moment.js"></script>
    <script src="js/pages/animated.js"></script>
    <script src="js/jquery.editable.min.js"></script>
    <script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
    <script src="js/jquery-resize.js"></script>
    <script src="${contextroot}/js/widgets.js"></script>
    <script src="js/exceltemplate.js"></script>
    <script src="${contextroot}/js/notify.js"></script>
    <script src="js/initial.js"></script>
	<script src="${contextroot}/js/select2.min.js"></script>

	<!-- multi-select dropdown -->
	
	<!-- multi-select dropdown -->

  <!-- Get the Page Start -->
        <script>
	    $(document).ready(function () {
		var datePeriod = $('#datePeriod').val();
		console.log(datePeriod,"dateperiod");
	    var currentEmp = $("#userPrincipal").val();
	    var pageNo = $('#pagenumber').val();
	    console.log("pageNo",pageNo);
	    
		getpagenameView();

if ($("#userrolename").val() == "Super User" || $("#userrolename").val() == "Admin") {
	if ($("#userPrincipal").val() != $("#userPrincipalnavigate").val()) {
		//$(".subusermenuname").text('Audit Trail');
		if ($(".topmenubreadcrumb").length) {
			$(".topmenubreadcrumb").show();
		}
		if ($(".sidebarNavigate").length) {
			$(".sidebarNavigate").show();
		}
	}
}
$('.int-status-multi-select').select2();
function getpagenameView() {
	$.ajax({
		type: "GET",
		url: "/stratroom/pages/" + pageNo,
		async: false,
		success: function (data) {
			if ($("#userPrincipal").val() != $("#userPrincipalnavigate").val()) {
				$("." + data.id).addClass("homepageHighlight");
			}

			if ($(".superusertopmenu").hasClass(data.id)) {
				$(".subusermenuname").text(data.pageName);
			}
		}
	});
}
	    });


		$("#open_search").click(function () {
			$(".nav-search").show();
			$("#open_search").hide();
		});

		$("#close_search").click(function () {
			$("#open_search").show();
			$(".nav-search").hide();
		});

		$(document).ready(function () {
			// $('select').val([1]);
			$(
				"#multiSelect1, #multiSelect2, #multiSelect3, #multiSelect4"
			).formSelect();
			$("select.select_all")
				.siblings("ul")
				.prepend("<li id=sm_select_all><span>Select All</span></li>");
			$("li#sm_select_all").on("click", function () {
				var jq_elem = $(this),
					jq_elem_span = jq_elem.find("span"),
					select_all = jq_elem_span.text() == "Select All",
					set_text = select_all ? "Select None" : "Select All";
				jq_elem_span.text(set_text);
				jq_elem
					.siblings("li")
					.filter(function () {
						return $(this).find("input").prop("checked") != select_all;
					})
					.click();
			});
		});

		$(function () {
			$("#ca_checkbox").click(function () {
				if ($(this).is(":checked")) {
					$("#ca_input").show();
				} else {
					$("#ca_input").hide();
				}
			});
		});

		$(document).ready(function () {
			$("#kpi_type_select").change(function () {
				var value = $("#kpi_type_select").val();
				if (value == "Currency") {
					$("#currency_input").show();
					$("#currency_input").focus();
				} else {
					$("#currency_input").hide();
				}
			});
		});

		$(document).ready(function () {
			$("#kpi_type_select_1").change(function () {
				var value = $("#kpi_type_select_1").val();
				if (value == "Currency") {
					$("#currency_input_1").show();
					$("#currency_input_1").focus();
				} else {
					$("#currency_input_1").hide();
				}
			});
		});

		$(document).ready(function () {
			$('input[type="checkbox"]').click(function () {
				var inputValue = $(this).attr("value");
				$("." + inputValue).toggle();
			});
		});

		$(".dropdown-hide").on("click", function (e) {
			e.stopPropagation();
		});

		$("#OpenImgUpload").click(function () {
			$("#imgupload").trigger("click");
		});

		$(document).ready(function () {
			$(".multi-select").select2();
		});
	</script>

	<script>

		$("#owner").select2({
			tags: true
		});
	</script>

	<script>

		$("#department").select2({
			tags: true
		});
		$("#department-1").select2({
			tags: true
		});
		$("#department-2").select2({
			tags: true
		});
		$("#department-3").select2({
			tags: true
		});
		$("#department-4").select2({
			tags: true
		});
		$("#department-5").select2({
			tags: true
		});
		$("#department-6").select2({
			tags: true
		});
		$("#department-7").select2({
			tags: true
		});
		$("#department-8").select2({
			tags: true
		});
		$("#department-9").select2({
			tags: true
		});
		$("#department-10").select2({
			tags: true
		});
		$("#department-11").select2({
			tags: true
		});
		$("#department-12").select2({
			tags: true
		});
		$("#department-13").select2({
			tags: true
		});
		$("#department-14").select2({
			tags: true
		});
		$("#department-33").select2({
			tags: false
		});
		$("#department-15").select2({
			tags: false
		});

	</script>
	
	<script>
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
		document.addEventListener("DOMContentLoaded", function () {
			const dropdown = document.getElementById("multi-select-dropdown");

			// Create an array to store the options
			const options = Array.from(dropdown.options);

			// Function to filter options based on user input
			function filterOptions() {
				const searchValue = dropdown.value.toLowerCase();

				options.forEach(function (option) {
					if (searchValue === "" || option.text.toLowerCase().includes(searchValue)) {
						option.style.display = "block";
					} else {
						option.style.display = "none";
					}
				});
			}

			// Attach an event listener to the input event for search functionality
			dropdown.addEventListener("input", filterOptions);
		});
		$(document).ready(function () {
			$("#scroll-left").click(function () {
				$(".dashboard-table").animate({ scrollLeft: "-=1000px" }, "slow");
			});

			$("#scroll-right").click(function () {
				$(".dashboard-table").scrollLeft(position)

			});

		})

		$(document).ready(function() {
            $('#toggleProcess').change(function() {
                if ($(this).is(':checked')) {
                    $('.viewprocess').show();
                } else {
                    $('.viewprocess').hide();
                }
            }).change();
        });

		$(document).ready(function() {
            $('#toggleVital').change(function() {
                if ($(this).is(':checked')) {
                    $('.viewvital').show();
                } else {
                    $('.viewvital').hide();
                }
            }).change();
        });

		$(document).ready(function() {
            $('#toggleMedia').change(function() {
                if ($(this).is(':checked')) {
                    $('.viewmedia').show();
                } else {
                    $('.viewmedia').hide();
                }
            }).change();
        });

		$(document).ready(function() {
            $('#toggleBackup').change(function() {
                if ($(this).is(':checked')) {
                    $('.viewbackup').show();
                } else {
                    $('.viewbackup').hide();
                }
            }).change();
        });

		$(document).ready(function() {
            $('#toggleBackupTime').change(function() {
                if ($(this).is(':checked')) {
                    $('.viewbackuptime').show();
                } else {
                    $('.viewbackuptime').hide();
                }
            }).change();
        });

		$(document).ready(function() {
            $('#toggleRetention').change(function() {
                if ($(this).is(':checked')) {
                    $('.viewretention').show();
                } else {
                    $('.viewretention').hide();
                }
            }).change();
        });

		$(document).ready(function() {
            $('#toggleRecovery').change(function() {
                if ($(this).is(':checked')) {
                    $('.viewrecovery').show();
                } else {
                    $('.viewrecovery').hide();
                }
            }).change();
        });



	</script>
<!-- -----------------------------GET Method----------------------- -->
<script>

// Process
function processSelect(data) {
    var $select =  $('#saveprocessService');

    $select.empty();

    data.forEach(function (list) {
        const name = list?.data?.processName;
        if (name && name.trim() !== "") {
            $select.append(
                $('<option>', {
                    value: name,
                    text: name
                })
            );
        }
    });

    // IMPORTANT: reinitialize Select2
    $select.select2({
        width: '100%',
        dropdownParent: $('.scorecard_description_popup'),
        placeholder: 'Select'
    });
}
function getProcesslist() {
    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=Process",
        dataType: 'json',
        success: function (response) {
            processSelect(response);
        }
    });
}
getProcesslist();



  function vitalSelect(data) {
     var $select = $('#savevitalService');
    $select.empty();

    data.forEach(function (list) {
        const name = list?.data?.vitalName;
        if (name && name.trim() !== "") {
            $select.append(
                $('<option>', {
                    value: name,
                    text: name
                })
            );
        }
    });

    // IMPORTANT: reinitialize Select2
    $select.select2({
        width: '100%',
        dropdownParent: $('.scorecard_description_popup'),
        placeholder: 'Select'
    });

}
// Vital
function getVitallist() {
    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=Vital",
        dataType: 'json',
        success: function (employeeList) {
		vitalSelect(employeeList);
		
        }
    });
}
getVitallist();


function mediaSelect(data) {
    var $select =$('#savemediaService');

    $select.empty();

    data.forEach(function (list) {
        const name = list?.data?.itName;
        if (name && name.trim() !== "") {
            $select.append(
                $('<option>', {
                    value: name,
                    text: name
                })
            );
        }
    });

    // IMPORTANT: reinitialize Select2
    $select.select2({
        width: '100%',
        dropdownParent: $('.scorecard_description_popup'),
        placeholder: 'Select'
    });
}
function populateRpoMediaCode() {
    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=technology",
        dataType: 'json',
        success: function (response) {
            mediaSelect(response);
        }
    });
}
populateRpoMediaCode();

// Backup Methods
              
  function backupSelect(data) {

      var $select =$('#savebackupService');
    $select.empty();

    data.forEach(function (list) {
        const name = list?.data?.backupMethod;
        if (name && name.trim() !== "") {
            $select.append(
                $('<option>', {
                    value: name,
                    text: name
                })
            );
        }
    });

    // IMPORTANT: reinitialize Select2
    $select.select2({
        width: '100%',
        dropdownParent: $('.scorecard_description_popup'),
        placeholder: 'Select'
    });
}
function getBackuplist() {
     $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=technology",
        dataType: 'json',
        success: function (response) {
            backupSelect(response);
        }
    });
}  
getBackuplist();

// BackupTime Methods
function getBackuptimelist() {
    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=technology",
        dataType: 'json',
        success: function (response) {
            backuptimeSelect(response);
        }
    });
}                
  function backuptimeSelect(data) {
    var $select = $('#savebackuptimeService');

    $select.empty();

    data.forEach(function (list) {
        const name = list?.data?.backupTime;
        if (name && name.trim() !== "") {
            $select.append(
                $('<option>', {
                    value: name,
                    text: name
                })
            );
        }
    });

    // IMPORTANT: reinitialize Select2
    $select.select2({
        width: '100%',
        dropdownParent: $('.scorecard_description_popup'),
        placeholder: 'Select'
    });
}
getBackuptimelist();

// Retention
function getRetentionlist() {
    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=technology",
        dataType: 'json',
        success: function (response) {
            retentionSelect(response);
        }
    });
}                
  function retentionSelect(data) {
    var $select =  $('#saveretentionService');

    $select.empty();

    data.forEach(function (list) {
        const name = list?.data?.retention;
        if (name && name.trim() !== "") {
            $select.append(
                $('<option>', {
                    value: name,
                    text: name
                })
            );
        }
    });

    // IMPORTANT: reinitialize Select2
    $select.select2({
        width: '100%',
        dropdownParent: $('.scorecard_description_popup'),
        placeholder: 'Select'
    });
}
getRetentionlist();

// Database Recovery Strategy
function getRecoverylist() {
  $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=technology",
        dataType: 'json',
        success: function (response) {
            recoverySelect(response);
        }
    });
}                
  function recoverySelect(data) {
    var $select = $('#saverecoveryService');

    $select.empty();

    data.forEach(function (list) {
        const name = list?.data?.databaseRecoveryStrategy;
        if (name && name.trim() !== "") {
            $select.append(
                $('<option>', {
                    value: name,
                    text: name
                })
            );
        }
    });

    // IMPORTANT: reinitialize Select2
    $select.select2({
        width: '100%',
        dropdownParent: $('.scorecard_description_popup'),
        placeholder: 'Select'
    });
}
getRecoverylist();

// Process
function updateprocessSelect(data) {
    var $select =  $('#processServiceUpdate');

    $select.empty();

    data.forEach(function (list) {
        const name = list?.data?.processName;
        if (name && name.trim() !== "") {
            $select.append(
                $('<option>', {
                    value: name,
                    text: name
                })
            );
        }
    });

    // IMPORTANT: reinitialize Select2
    $select.select2({
        width: '100%',
        dropdownParent: $('.edit_update_table'),
        placeholder: 'Select'
    });
}
function updategetProcesslist() {
    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=Process",
        dataType: 'json',
        success: function (response) {
            updateprocessSelect(response);
        }
    });
}
updategetProcesslist();



  function updatevitalSelect(data) {
     var $select = $('#vitalServiceUpdate');
    $select.empty();

    data.forEach(function (list) {
        const name = list?.data?.vitalName;
        if (name && name.trim() !== "") {
            $select.append(
                $('<option>', {
                    value: name,
                    text: name
                })
            );
        }
    });

    // IMPORTANT: reinitialize Select2
    $select.select2({
        width: '100%',
        dropdownParent: $('.edit_update_table'),
        placeholder: 'Select'
    });

}
// Vital
function updategetVitallist() {
    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=Vital",
        dataType: 'json',
        success: function (employeeList) {
		updatevitalSelect(employeeList);
		
        }
    });
}
updategetVitallist();


function updatemediaSelect(data) {
    var $select =$('#mediaServiceUpdate');

    $select.empty();

    data.forEach(function (list) {
        const name = list?.data?.itName;
        if (name && name.trim() !== "") {
            $select.append(
                $('<option>', {
                    value: name,
                    text: name
                })
            );
        }
    });

    // IMPORTANT: reinitialize Select2
    $select.select2({
        width: '100%',
        dropdownParent: $('.edit_update_table'),
        placeholder: 'Select'
    });
}
function updatepopulateRpoMediaCode() {
    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=technology",
        dataType: 'json',
        success: function (response) {
            updatemediaSelect(response);
        }
    });
}
updatepopulateRpoMediaCode();

// Backup Methods
              
  function updatebackupSelect(data) {

      var $select =$('#backupServiceUpdate');
    $select.empty();

    data.forEach(function (list) {
        const name = list?.data?.backupMethod;
        if (name && name.trim() !== "") {
            $select.append(
                $('<option>', {
                    value: name,
                    text: name
                })
            );
        }
    });

    // IMPORTANT: reinitialize Select2
    $select.select2({
        width: '100%',
        dropdownParent: $('.edit_update_table'),
        placeholder: 'Select'
    });
}
function updategetBackuplist() {
     $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=technology",
        dataType: 'json',
        success: function (response) {
            updatebackupSelect(response);
        }
    });
}  
updategetBackuplist();

// BackupTime Methods
function updategetBackuptimelist() {
    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=technology",
        dataType: 'json',
        success: function (response) {
            updatebackuptimeSelect(response);
        }
    });
}                
  function updatebackuptimeSelect(data) {
    var $select = $('#backuptimeServiceUpdate');

    $select.empty();

    data.forEach(function (list) {
        const name = list?.data?.backupTime;
        if (name && name.trim() !== "") {
            $select.append(
                $('<option>', {
                    value: name,
                    text: name
                })
            );
        }
    });

    // IMPORTANT: reinitialize Select2
    $select.select2({
        width: '100%',
        dropdownParent: $('.edit_update_table'),
        placeholder: 'Select'
    });
}
updategetBackuptimelist();

// Retention
function updategetRetentionlist() {
    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=technology",
        dataType: 'json',
        success: function (response) {
            updateretentionSelect(response);
        }
    });
}                
  function updateretentionSelect(data) {
    var $select =  $('#retentionServiceUpdate');

    $select.empty();

    data.forEach(function (list) {
        const name = list?.data?.retention;
        if (name && name.trim() !== "") {
            $select.append(
                $('<option>', {
                    value: name,
                    text: name
                })
            );
        }
    });

    // IMPORTANT: reinitialize Select2
    $select.select2({
        width: '100%',
        dropdownParent: $('.edit_update_table'),
        placeholder: 'Select'
    });
}
updategetRetentionlist();

// Database Recovery Strategy
function updategetRecoverylist() {
  $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=technology",
        dataType: 'json',
        success: function (response) {
            updaterecoverySelect(response);
        }
    });
}                
  function updaterecoverySelect(data) {
    var $select = $('#recoveryServiceUpdate');

    $select.empty();

    data.forEach(function (list) {
        const name = list?.data?.databaseRecoveryStrategy;
        if (name && name.trim() !== "") {
            $select.append(
                $('<option>', {
                    value: name,
                    text: name
                })
            );
        }
    });

    // IMPORTANT: reinitialize Select2
    $select.select2({
        width: '100%',
        dropdownParent: $('.edit_update_table'),
        placeholder: 'Select'
    });
}
updategetRecoverylist();


// Totally get Function
$(document).ready(function () {
	getRPOData();
	getProcesslist();
	getVitallist();
	getMedialist();
	getBackuplist();
	getBackuptimelist();
	getRetentionlist();
	getRecoverylist();
    updategetProcesslist();
	updategetVitallist();
	updategetMedialist();
	updategetBackuplist();
	updategetBackuptimelist();
	updategetRetentionlist();
	updategetRecoverylist();
    })


// Totally get Function
$(document).ready(function () {
	getRPOData();
	getProcesslist();
	getVitallist();
	getMedialist();
	getBackuplist();
	getBackuptimelist();
	getRetentionlist();
	getRecoverylist();
    })

//---------------------------------------------------------------------------------

// Function to save RPO Service
function saveRPOpage() {
	var processsave = $("#saveprocessService").val().join('|');
    var vitalsave = $("#savevitalService").val().join('|');
	var mediasave = $("#savemediaService").val().join('|');
    var backupsave = $("#savebackupService").val().join('|');
    var backuptimesave = $("#savebackuptimeService").val().join('|');
    var retentionsave = $("#saveretentionService").val().join('|');
    var recoverysave = $("#saverecoveryService").val().join('|');
	var pagenumber = $("#pagenumber").val();
    
    var RPOServiceData = {
		"createBy":"",
        "owner":"",
        "deptId":"",
		"pageId":pagenumber,
		"rpoValues":{
                    "process": processsave,
                    "vital": vitalsave,
		            "media" : mediasave,
                    "backupMethode": backupsave,
                    "backupTime": backuptimesave,
                    "retention": retentionsave,
                    "dataBaseRecoveryStratagy": recoverysave
                }
    }
    console.log(RPOServiceData);

    $.ajax({
        url: "/stratroom/saveRpoTable",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify(RPOServiceData),
        success: function (data, status) {
                                       
            location.reload(true);
        },
        error: function (xhr, status, error) {
            console.error("Error: " + xhr.responseText);
        }
    });
}

//---------------------------------------------------------------------------------

function getRPOData() {
    var pageNo = $('#pagenumber').val();
    var datePeriod = $('#datePeriod').val();
    var approvedStatus = $("#approvedDraft").val(); // APPROVED / DRAFT / IN PROGRESS

    $.ajax({
        url: "/stratroom/retrieveRpolist?pageId=" + pageNo + "&dateRange=" + datePeriod + "&status=" + approvedStatus,
        type: "GET",
        contentType: "application/json",
         success: function (data, status) {
            console.log(data, "RPO Data");
            $('#rpo_table').empty();

            var uploadShowData = "";
            var i;
            $.each(data, function (i, List) {
                i++;
				console.log(List,"RPO");
                uploadShowData += '<tr>' +
                    
                    '<td class="position viewprocess" >' + List.rpoValues.process.split('|').join('<br>') + '</td>' + 
                    '<td class="viewvital" >' + List.rpoValues.vital.split('|').join('<br>') + '</td>' + 
					'<td class="viewmedia" >' + List.rpoValues.media.split('|').join('<br>') + '</td>' + 
                    '<td class="viewbackup" >' + List.rpoValues.backupMethode.split('|').join('<br>') + '</td>' + 
                    '<td class="viewbackuptime" >' + List.rpoValues.backupTime.split('|').join('<br>') + '</td>' + 
                    '<td class="viewretention" >' + List.rpoValues.retention.split('|').join('<br>') + '</td>' + 
                    '<td class="viewrecovery" >' + List.rpoValues.dataBaseRecoveryStratagy.split('|').join('<br>') + '</td>' +
                     '<td class="sendApprovalCell" style="text-align: start;padding-left: 59px;"><button class="btn btn-custom-secondary pull-right" ' +
                        'onclick="sendApprovalOnce(this,' + List.changeId + ')">' +
                        '<i class="fa fa-check-circle" title="Send To Approval" style="margin-left: -2px;"></i>' +
                        '</button></td>'+ 
                        '<td >' +
                        '<select id="versionDropdown_' + List.id + '" ' +
                        'onchange="getRpoVersion(' + List.id + ', this.value)" ' +
                        'style="width: 100px; font-size: 11px;"></select>' +
                    '</td>' +
                    // Edit & Delete Popup
                    '<td>' + 
                    ' <div class="table-actions"><div class="action-btn" href=".edit_update_table" data-bs-toggle="modal" onclick="editRPOpage(' + List.id + ')"><span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Edit"> <img src="images/edit-i.svg" width="12" height="12"  /> </span></div> <div class="action-btn" href="#delete_popup"  data-bs-toggle="modal" onclick="deleteData(' + List.id + ')">  <span data-bs-toggle="tooltip" data-bs-placement="bottom"     data-bs-title="Delete"><img src="images/delete-i.svg" width="12" height="12"  /> </span> </div></div>' +
                    '</td>'; 
					getVersion(List.id);
						uploadShowData += '</tr>';
            });

            var table = `                                        
                <table class="table table-bordered">
                    <thead>
                        <tr>

                            <th class="position viewprocess" width="100px" id="blue">Process (POS)</th>

                            <th class="viewvital" width="100px" id="grey">Name of Vital Records</th>

                            <th class="viewmedia" width="100px" id="grey">Type of Media</th>

                            <th class="viewbackup" width="100px" id="grey">Backup Method</th>

                            <th class="viewbackuptime" width="100px" id="grey">Backup Time</th>

                            <th class="viewretention" width="100px" id="moa">Retention</th>

                            <th class="viewrecovery" width="120px" id="moa">Database Recovery Strategy</th>
                           <th class="sendApprovalHeader" width="120px" id="moa" >Approval Button</th>
							
							<th class="" width="120px" id="moa">Select Version</th>
							
                            <th width="40px" id="moa" >Action</th>
                        </tr>
                    </thead>
                    <tbody>` + uploadShowData + `</tbody>
                </table>`;

            $("#rpo_table").append(table);
			  if (approvedStatus === "DRAFT") {
                $(".sendApprovalCell, .sendApprovalHeader").show();
            } else {
                $(".sendApprovalCell, .sendApprovalHeader").hide();
            }     
            $('[rel="tooltip"]').tooltip();
        },
        error: function (xhr, status, error) {
            console.error("Error: " + xhr.responseText);
        }
    });
}

// 🔄 Refresh on status change
$("#approvedDraft").on("change", function () {
    $("#rpo_table").empty();
    getRPOData();
});

function getVersion(ropId) {
     $.ajax({
        url: "/stratroom/rpohistorylist?rpoId=" + ropId + "&version=",
        type: "GET",
        contentType: "application/json",
        success: function (response) {
            console.log("Version response for ropId", ropId, response);

            var $dropdown = $("#versionDropdown_" + ropId);

            if ($dropdown.length === 0) {
                console.warn("Dropdown not found for ropId:", ropId);
                return;
            }

            // Clear old options
            $dropdown.empty();
            $dropdown.append($('<option>', { value: '' }).text('Select'));

            // Sort by version (latest first)
            response.sort((a, b) => b.version - a.version);

            // Append versions safely
            response.forEach(function (item, index) {
                console.log("Item.version:", item.version); // should log 2, 1

                var $option = $('<option>', {
                    value: item.version,
                    text: "Version " + item.version,
                    selected: index === 0 // auto-select the latest version
                });

                $dropdown.append($option);
            });
        },
        error: function (err) {
            console.log("Error fetching version for ropId:", ropId, err);
        }
    });

}

function getRpoVersion(eventId, selectedVersion) {
    console.log("rpo t")
    if (!selectedVersion) return; 
console.log("rpo")
    $.ajax({
        url: "/stratroom/rpohistorylist?rpoId=" + eventId + "&version=" + selectedVersion,
        type: "GET",
        contentType: "application/json",
      success: function (data, status) {
            console.log(data, "RPO Data");
            $('#rpo_table').empty();

            var uploadShowData = "";
            var i;
            $.each(data, function (i, List) {
                i++;
				console.log(List,"RPO");
                uploadShowData += '<tr>' +
                    
                    '<td class="position viewprocess" >' + List.rpoValues.process.split('|').join('<br>') + '</td>' + 
                    '<td class="viewvital" >' + List.rpoValues.vital.split('|').join('<br>') + '</td>' + 
					'<td class="viewmedia" >' + List.rpoValues.media.split('|').join('<br>') + '</td>' + 
                    '<td class="viewbackup" >' + List.rpoValues.backupMethode.split('|').join('<br>') + '</td>' + 
                    '<td class="viewbackuptime" >' + List.rpoValues.backupTime.split('|').join('<br>') + '</td>' + 
                    '<td class="viewretention" >' + List.rpoValues.retention.split('|').join('<br>') + '</td>' + 
                    '<td class="viewrecovery" >' + List.rpoValues.dataBaseRecoveryStratagy.split('|').join('<br>') + '</td>' +
                    '<td class="" style="text-align: start;padding-left: 10px; cursor: pointer; color: blue; text-decoration: underline;" onclick="getRPOData()">Back</td>'; 
						uploadShowData += '</tr>';
            });

            var table = `                                        
                <table class="table table-bordered">
                    <thead>
                        <tr>

                            <th class="position viewprocess" width="100px" id="blue">Process (POS)</th>

                            <th class="viewvital" width="100px" id="grey">Name of Vital Records</th>

                            <th class="viewmedia" width="100px" id="grey">Type of Media</th>

                            <th class="viewbackup" width="100px" id="grey">Backup Method</th>

                            <th class="viewbackuptime" width="100px" id="grey">Backup Time</th>

                            <th class="viewretention" width="100px" id="moa">Retention</th>

                            <th class="viewrecovery" width="120px" id="moa">Database Recovery Strategy</th>

							
							<th class="" width="120px" id="moa">Select Version</th>
                        </tr>
                    </thead>
                    <tbody>` + uploadShowData + `</tbody>
                </table>`;

            $("#rpo_table").append(table);
            $('[rel="tooltip"]').tooltip();
        },
        error: function (xhr, status, error) {
            console.error("Error: " + xhr.responseText);
        }
    });
}


function sendApprovalOnce(button, changeId) {
    if (!button.disabled) {
        button.disabled = true; // Disable to prevent multiple clicks
        sendApproval(changeId); // Pass changeId
    }
}

function sendApproval(changeId) {
    var requestData = {
        status: "IN PROGRESS"
    };

    $.ajax({
        url: "/stratroom/api/workflowevents/" + changeId + "/action", // use changeId here
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(requestData),
        success: function (response) {
            location.reload(true);
        }
    });
} 
//---------------------------------------------------------------------------------
// delete

let deleteId; 
function deleteData(id) {
    deleteId = id;

    $.ajax({
        url: "/stratroom/retriveRpoId/" + deleteId,
        method: 'GET',
        success: function (data, status) {
            console.log(data);           
        },
        error: readErrorMsg
    });
}

function deleteRPOpage() {
    if (!deleteId) {
        console.error("DeleteID is not Set");
        return;
    }
    console.log(deleteId, "DeleteD");

    $.ajax({
        url: "/stratroom/deleteRpo/" + deleteId,
        type: "DELETE",
        contentType: "application/json",
        success: function (data, status) {
            $.notify("Success: Deleted Successfully", {
                style: 'success',
                className: 'graynotify'
            });
            location.reload(true);
        },
        error: readErrorMsg
    });
}

// Helper function to safely format ISO date strings (e.g., 2025-11-07T23:08:31.93)
function formatDate(dateString) {
    if (!dateString) return ''; // if null or undefined, return empty
    return dateString.split('T')[0]; // take only the date part
}
//---------------------------------------------------------------------------------
function editRPOpage(id) {
    editId = id;

    $.ajax({
        url: "/stratroom/retriveRpoId/" + editId,
        method: 'GET',
        success: function (data, status) {
            console.log(data,'EditResult')
			
			// ID
            $("#updateid").val(data.id);

            // Process
			var processEdit = data.rpoValues.process.split('|');
            $("#processServiceUpdate").val(processEdit).trigger('change');

            // Vital
			var vitalEdit = data.rpoValues.vital.split('|');
			$("#vitalServiceUpdate").val(vitalEdit).trigger('change');

            // Media
			var mediaEdit = data.rpoValues.media.split('|');
			$("#mediaServiceUpdate").val(mediaEdit).trigger('change');

            // Backup Method
			var backupEdit = data.rpoValues.backupMethode.split('|');
			$("#backupServiceUpdate").val(backupEdit).trigger('change');

            // Backup Time
			var backupTimeEdit = data.rpoValues.backupTime.split('|');
			$("#backuptimeServiceUpdate").val(backupTimeEdit).trigger('change');

            // Retention
			var retentionEdit = data.rpoValues.retention.split('|');
			$("#retentionServiceUpdate").val(retentionEdit).trigger('change');

            // Database Recovery Strategy
			var recoveryStrategyEdit = data.rpoValues.dataBaseRecoveryStratagy.split('|');
			$("#recoveryServiceUpdate").val(recoveryStrategyEdit).trigger('change');
			var rpocreatedTime = $("#rpocreatedTime").val(data.createTime);
            console.log(rpocreatedTime,"Create a Id Number Creation");
			var rpoupdatedTime = $("#rpoupdatedTime").val(data.updateTime);
            console.log(createIdNumber,"Create a Id Number Creation");


			// Get the "createBy" Id 
			var createIdNumber = $("#createId").val(data.createBy);
            console.log(createIdNumber,"Create a Id Number Creation");

           // Created by Name
           var createName = $("#nameCreated").text(data.rpoValues.createdByName);
           console.log(createName,"Name Creation");
		   var createDate = data.createTime ? data.createTime.split('T')[0] : '';
$("#dateCreated").text(createDate);
console.log(createDate, "Date Creation");

// Updated by Name
var updateName = data.rpoValues.updatedByName || ''; // if undefined, keep empty
$("#nameUpdated").text(updateName);
console.log(updateName, "Name Updation");

// Updated by Date
var updateDate = data.updateTime ? data.updateTime.split('T')[0] : '';
$("#dateUpdated").text(updateDate);
console.log(updateDate, "Date Updated");
        },
        error: readErrorMsg,                            
    });
}

function updateRPOpage() {
    var id = $("#updateid").val();
    var updateprocess = $("#processServiceUpdate").val().join('|');
    var updatevital  = $("#vitalServiceUpdate").val().join('|');
    var updatemedia = $("#mediaServiceUpdate").val().join('|');
    var updatebackup = $("#backupServiceUpdate").val().join('|');
    var updatebackuptime = $("#backuptimeServiceUpdate").val().join('|');
    var updateretention = $("#retentionServiceUpdate").val().join('|');
    var updaterecovery = $("#recoveryServiceUpdate").val().join('|');
	var pagenumber = $("#pagenumber").val();

	var generateId = $("#createId").val();
    var generateDate = $("#rpocreatedTime").val();
    var updateBy = $("#nameUpdated").val();

    var updateRPOdata = {
		"createBy":generateId,
		"createTime": generateDate,
		"updateTime":"",
		"id": id,
		"pageId":pagenumber,
		"rpoValues":{ 
                        "process": updateprocess,
                        "vital": updatevital,
                        "media": updatemedia,
                        "backupMethode": updatebackup,
                        "backupTime": updatebackuptime,
                        "retention": updateretention,
                        "dataBaseRecoveryStratagy": updaterecovery
                    }
        }
        console.log(updateRPOdata);

    $.ajax({
        url: "/stratroom/updateRpo/",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updateRPOdata),
        success: function (data, status) {
            $.notify("Success: RPO Page Data Successfully Updated", {
                style: 'success',
                className: 'graynotify'
            });
            location.reload(true);
        },
        error: readErrorMsg
    });
}
</script>
</body>