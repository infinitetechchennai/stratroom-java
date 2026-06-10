<!DOCTYPE html>
<html>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="com.estrat.web.util.RoleUtil" %>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <title>StratRoom</title>
    <script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>


    <link href="assets/css/main.css?v0.004" rel="stylesheet">
    <link href="assets/css/responsive.css" rel="stylesheet">
     <link href="assets/css/bootstrap.min.css" rel="stylesheet">
	   <link href="assets/css/basic.css?v0.006" rel="stylesheet">

     <!-- Font Awsome Icons -->
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
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
    <script>
        function preview_images() {
            var total_file = document.getElementById("images").files.length;
            for (var i = 0; i < total_file; i++) {
                $('#image_preview').append("<div class='col-md-3' style='padding-bottom: 4%' '><img class='img-responsive' src='" + URL.createObjectURL(event.target.files[i]) + "'></div>");
            }
        }
    </script>
</head>

<body class="light">
  <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
		<input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
		<jsp:include page="../common/top-navigation.jsp"></jsp:include>
		  <header id="header" class="header shadow-sm">
	  
		<jsp:include page="../common/left-navigation.jsp"></jsp:include>
    </header>
        <jsp:include page="modal/riskeventmodal.jsp"></jsp:include>

        <div class="modal fade file_upload_popup" id="file-validate-form" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4>File Upload</h4>
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
                                        <input type="file" name="img_logo" class="dropzone" accept=".xlsx, .xls, .csv" />
                                    </div>
                                    <span id="fileerrorshow" style="color: red; display: none"></span>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <hr />
                            </div>
                            <div class="col-md-12">
                                <div class="form-line right">
                                    <button class="initative_save_btn" id="next-btn-1" style="font-weight: 600;">Next</button>
                                </div>
                            </div>
                        </div>

                        <div class="row" id="file-validate" style="display: none;">
                            <div class="col-md-12 img-center">
                                <img id="imagevalidate" src="images/Not-Verified.png" alt="Not-Verified" />
                                <div class="error-div">
                                    <table class="error-table">
                                        <thead>
                                            <tr>
                                                <th style="width: 150px; text-align: center;">SheetName</th>
                                                <th style="width: 150px; text-align: center;">Row-Number</th>
                                                <th style="width: 150px; text-align: center;">CellName</th>
                                                <th style="width: 250px; text-align: center;">Reason</th>
                                            </tr>
                                        </thead>
                                        <tbody class="uploadvalidationSuccess">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <hr />
                            </div>
                            <div class="col-md-12">
                                <div class="form-line" id="validateImportHide">
                                </div>
                            </div>
                        </div>

                        <div class="row" id="file-save" style="display: none;">
                            <div class="col-md-12">
                                <div class="col-md-12 img-center">
                                    <img src="images/Success.png" alt="Verified" />
                                    <span id="statisticmessage" style="text-align: center; margin-left: 42% !important; color: green; width: 100%; margin-right: 25% !important;"></span>
                                    <div class="error-div">
                                        <table class="error-table">
                                            <thead>
                                                <tr>
                                                    <th style="width: 300px; text-align: center;">Statististics</th>
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
                                    <button type="button" class="btn-default1 btn" id="prev-btn2" style="font-weight: 600;">Previous</button>
                                    <button class="initative_save_btn pull-right" id="done-btn" style="font-weight: 600;" data-dismiss="modal" aria-label="Close">Done</button>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
        <!-- END Column Large -->
        <div class="modal fade" id="delete_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-md">
                <div class="modal-content">
                    <div class="modal-header" style="height: 50px;">
                        <h4>Delete</h4>
                        <button type="button" class="close pull-right" data-dismiss="modal" style="margin-top: -15px;">
                            &times;
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12" style="text-align: center; padding-bottom: 12px">
                                <h5>Do you really want to delete?</h5>
                             
                            </div>
                            <div class="col-12">
                                <div class="form-line right">
                                    <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close">
                                        Cancel
                                    </button>
                                    <button class="initative_save_btn" data-dismiss="modal"  value="Save" style="background-color: #f2675f" id="confirmDelete">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
       <main class="pt-2 pb-2">
        <c:if test="${pagenumber != null}">
            <input id="pagenumber" type="hidden" name="pagenumber" value="<c:out value=" ${pagenumber}" />">
        </c:if>
        <div class="container-lg">
            <div class="page-header grid gap-2 pb-1">
                <div class="g-col-8 d-flex align-items-center">
                    <h4 class="title">
                        <span class="icon">
                            <img src="/stratroom/images/rpo-i.svg" alt="control-panel" title="control-panel">
                        </span>
                        Risk Event Database
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
                                        <img ssrc="/stratroom/images/view-i.svg" />
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                    data-bs-title="Import">
                                    <img src="/stratroom/images/import-i.svg" alt="" title="">
                                </span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                    data-bs-title="Export">
                                    <img class="exceldownloadlink" src="/stratroom/images/export-i.svg" alt="export" title="export">
                                </span>
                                </a>
                            </li>
                            <li>
                                <a href=".scorecard_description_popup" data-bs-toggle="modal">
                                    <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                    data-bs-title="Add">
                                    <i id="resetform"  class="fas fa-plus title_edit_icon" onclick="resetRiskEventForm()"></i>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
            <div class="container-lg py-2">
            <div class="process-enabler-container">
                <div class="row">
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
                                <div class="table-responsive">
                                    <table class="table table-bordered">
                                             <thead>
                                            <tr>
                                                <!-- <th class="position" width="60px" id="blue" rowspan="2">NO</th> -->
                                                <th class="position" width="130px" id="blue" rowspan="2">DATE OF RISK EVENT</th>
                                                <th class="position" width="180px" id="blue" rowspan="2">RISK CODE</th>
                                                <th width="280px" id="blue" rowspan="2">RISK EVENT</th>
                                                <th width="190px" id="blue" rowspan="2">TYPE OF EVENT</th>
                                                <th width="440px" id="blue" colspan="2" >THE CAUSE OF THE INCIDENT</th>
                                                <th width="400px" id="blue" colspan="3">IMPACT / LOSS</th>
                                                <th width="390px" id="blue" rowspan="2">CORRECTION ACTION</th>
                                                <th width="390px" id="moa" rowspan="2">CORRECTIVE ACTION (MITIGATION PLAN)</th>
                                                <th width="190px" id="moa" rowspan="2">MITIGATION STATUS</th>
                                                <th width="140px" id="grey" rowspan="2">INVENTOR / REPORTER</th>
                                                <th width="140px" id="grey" class="sendApprovalHeader" rowspan="2">Approval Button</th>
                                                <th width="140px" id="grey" rowspan="2">Select Version</th>
                                                
                                                <th width="140px" id="grey" rowspan="2">Action</th>
                                            </tr>
                                            <tr>
                                                <th width="60px" id="blue">CATEGORY</th>
                                                <th width="40px" id="blue">DESCRIPTION</th>
                                                <th width="190px" id="blue">CATEGORY</th>
                                                <th width="160px" id="blue">DESCRIPTION</th>
                                                <th width="160px" id="blue">IMPACT LEVELS</th>
                                            </tr>
                                        </thead>
                                         <tbody class="riskeventtablebody">
                                            <!-- Rows will be dynamically generated here -->
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

    <c:if test="${userPrincipal != null}">
        <input id="userDept" type="hidden" name="userDept" value="${userPrincipal.profile.department}">
    </c:if>

    <c:if test="${scordCardPageId != null}">
        <input type="hidden" value="${scordCardPageId}" id="scordCardPageId" />
    </c:if>
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
    <script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
    <script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
    <!-- Custom Js -->
    <script src="${contextroot}/js/admin.js"></script>
    <script src="${contextroot}/js/paging.js"></script>
    <script src="${contextroot}/js/bundles/amcharts4/core.js"></script>
    <script src="${contextroot}/js/bundles/amcharts4/maps.js"></script>
    <script src="${contextroot}/js/bundles/amcharts4/worldLow.js"></script>
    <script src="${contextroot}/js/bundles/amcharts4/usaLow.js"></script>
    <script src="${contextroot}/js/bundles/amcharts4/animated.js"></script>
    <script src="${contextroot}/js/bundles/amcharts4/charts.js"></script>
    <script src="${contextroot}/js/jquery.editable.min.js"></script>
    <script src="${contextroot}/js/pages/widgets/chart-widget.js"></script>
    <script src="${contextroot}/js/handlebars.js"></script>
    <script type="text/javascript" src="${contextroot}/js/knockout-3.5.0.js"></script>
    <script src="${contextroot}/js/daterangepicker.min.js"></script>
    <script src="${contextroot}/js/amcharts.js"></script>
    <script src="${contextroot}/js/jquery-ui.min.js"></script>
    <script src="${contextroot}/js/moment.js"></script>
    <script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
    <script src="${contextroot}/js/pickr.es5.min.js"></script>
    <script src="${contextroot}/js/widgets.js"></script>
    <script src="${contextroot}/js/initial.js"></script>
    <script src="${contextroot}/js/notify.js"></script>
    <script src="${contextroot}/js/apexcharts.js"></script>
    <script src="${contextroot}/js/select2.min.js"></script>

    <script>
        $(document).ready(function () {
            var datePeriod = $('#datePeriod').val();
            console.log(datePeriod,"dateperiod");
            var currentEmp = $("#userPrincipal").val();
            console.log(currentEmp,"empid");
            var pageNo = $('#pagenumber').val();

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

            function resetRiskEventForm() {
                $('#riskeventform').trigger("reset");
                $('#riskeventform').data('is-new', true);
                // $('#riskcode').val('');
                $('#department-2').val('');
                $('#riskcode').val(null).trigger('change');
                        $('#incident').val(null).trigger('change');
                // $('#incident').val('');
                $('#incidentdate').val('');
                $('#pageId').val('');
                $('#eventid').val('');
                $('#correctiveaction').val('');
                $('#mitigation').val('');
                $('#eventStatus').val('');
                // $('#department_select').val('');
                $('#department_select').val(null).trigger('change');
                $('#createdBy').text('');
                $('#modifiedBy').text('');
                $('#createdDate').text('');
                $('#modifiedDate').text('');

                var incidentImpactContainer = $('#incident-and-impact-container');
                incidentImpactContainer.empty();
                addIncidentImpactRow();
            }

            // Add more incident and impact rows
            $(document).on('click', '.add-more-incident-impact', function () {
                addIncidentImpactRow();
            });
            $(document).on('click', '.remove_btn', function () {
                $(this).closest('.incident-and-impact-row').remove();
            });

            // Load risk events and risk options
            loadRiskEvents();
            loadRiskOptions();
            populateOwnerDropdowndepartment();
            populateRiskCode();
            



            function addIncidentImpactRow(item) {
                var row = $('<div>').addClass('incident-and-impact-row d-flex align-items-center mb-3').append(
                    $('<div>').addClass('col-md-2').append(
                        $('<label>').text('Category'),
                        $('<select>').addClass('form-select category-select').append('<option selected="selected">Select</option>')
                    ),
                    $('<div>').addClass('col-md-2').append(
                        $('<label>').text('Description'),
                        $('<input style="border: 1px solid #dddddd; height:30px">').addClass('form-control category-description').val(item ? item.categoryDescription : '')
                    ),
                    $('<div>').addClass('col-md-2').append(
                        $('<label>').text('Impact Category'),
                        $('<select>').addClass('form-select impact-category-select').append('<option selected="selected">Select</option>')
                    ),
                    $('<div>').addClass('col-md-2').append(
                        $('<label>').text('Impact Description'),
                        $('<input style="border: 1px solid #dddddd;height:30px">').addClass('form-control impact-description').val(item ? item.impactDescription : '')
                    ),
                    $('<div>').addClass('col-md-2').append(
                        $('<label>').text('Impact'),
                        $('<select>').addClass('form-select impact-select').append(`<option value="">Choose</option>
                                <option value="Tidak Signifikan">Tidak Signifikan</option>
                                <option  value="Ringan">Ringan</option>
                                <option value="Moderat">Moderat</option>
                                <option  value="Berat">Berat</option>
                                <option  value="Fatal">Fatal</option>`)
                    ),
                    $('<div >').addClass('form-group').append(
                        $('<button>').attr('type', 'button').addClass('btn btn-link add-more-incident-impact').text('+')
                    ),
                    $('<div >').addClass('form-group').append(
                        $('<button>').attr('type', 'button').addClass('btn btn-link remove_btn').text('-')
                    )
                );

                // Populate dropdowns with options
                populateDropdown(row.find('.category-select'), riskOptions.categoryOptions);
                populateDropdown(row.find('.impact-category-select'), riskOptions.impactOptions);
                //      populateDropdown(row.find('.action-select'), riskOptions.actionOptions);

                if (item) {
                    row.find('.category-select').val(item.category);
                    row.find('.impact-category-select').val(item.impactCategory);
                    row.find('.impact-select').val(item.actionSelect);
                }

                $('#incident-and-impact-container').append(row);
            }

            $("#approvedDraft").on("change", function () {
    var status = $(this).val();

    if (status === "APPROVED") {
        $(".sendApprovalHeader").hide();   // hide header
        $(".sendApprovalCell").hide();     // hide all td cells
    } else {
        $(".sendApprovalHeader").show();   // show header
        $(".sendApprovalCell").show();     // show td cells
    }

    // reload table data
    $("#riskeventtablebody").empty();
    loadRiskEvents();
});
$(document).ready(function () {
         $(".sendApprovalHeader").hide();
         $(".sendApprovalCell").hide();   
  })

// ✅ Global helper functions
function sendApprovalOnce(button, changeId) {
    if (!button.disabled) {
        button.disabled = true; // Prevent multiple clicks
        sendApproval(changeId);
    }
}

function sendApproval(changeId) {
    var requestData = { status: "IN PROGRESS" };

    $.ajax({
        url: "/stratroom/api/workflowevents/" + changeId + "/action",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(requestData),
        success: function (response) {
            location.reload(true);
        },
        error: function (err) {
            console.error("Approval failed:", err);
        }
    });
}

// ✅ Main function
function loadRiskEvents() {
    var approvedStatus = $("#approvedDraft").val(); // Approved or Draft

    $.ajax({
        url: '/stratroom/riskeventlist?pageId=' + $('#pagenumber').val() + "&status=" + approvedStatus,
        type: 'GET',
        success: function (data) {
            // Clear the table body before rendering new data
            $('.riskeventtablebody').empty();

            data.forEach(function (event) {
                var impactData = event.incidentImpactData || [{}];
                var rowspan = impactData.length;
                var inventors = inventor(event.reporter);

                // Create the main row for the event
                var mainRow = $('<tr>').append(
                    $('<td>').text(event.incidentDate).attr('rowspan', rowspan),
                    $('<td class="statusCell">').text(event.riskCode).attr('rowspan', rowspan),
                    $('<td>').text(event.incident).attr('rowspan', rowspan),
                    $('<td>').text(event.eventType).attr('rowspan', rowspan),
                    $('<td class="statusCell">').text(impactData[0].category || ''),
                    $('<td>').text(impactData[0].categoryDescription || ''),
                    $('<td class="statusCell">').text(impactData[0].impactCategory || ''),
                    $('<td>').text(impactData[0].impactDescription || ''),
                    $('<td>').text(impactData[0].actionSelect || ''),
                    $('<td>').text(event.correctiveAction).attr('rowspan', rowspan),
                    $('<td>').text(event.riskMitigation).attr('rowspan', rowspan),
                    $('<td class="statusCell">').text(event.eventStatus).attr('rowspan', rowspan),
                    $('<td>').html(inventors).attr('rowspan', rowspan),

                    // ✅ Send to Approval Button
                    $('<td>').attr('rowspan', rowspan).addClass('sendApprovalCell').append(
                        $('<button>', { class: 'btn btn-custom-secondary pull-right' })
                            .append($('<i>', { class: 'fa fa-check-circle', title: 'Send To Approval' }))
                            .on('click', function () { sendApprovalOnce(this, event.changeId); })
                    ),

                    // ✅ Version dropdown
                    $('<td>').attr('rowspan', rowspan).append(
                        $('<select>', {
                            class: 'btn btn-custom-secondary pull-right',
                            id: 'versionDropdown_' + event.id,
                            style: 'width: 93px;font-size: 10px;'
                        }).append(
                            $('<option>', { value: '' }).text('Select')
                        ).on('change', function () {
                            getRiskVersion(event.id, this.value);
                        })
                    ),

                    // ✅ Edit & Delete icons
                    $('<td>').attr('rowspan', rowspan).append(
    $('<img>', {
        src: 'images/edit-i.svg',
        width: 12,
        height: 12,
        css: {
            cursor: 'pointer',
            marginRight: '13px'
        },
        title: 'Edit'
    }).on('click', function () {
        editRiskEvent(event.id);
    }),

    $('<img>', {
        src: 'images/delete-i.svg',
        width: 12,
        height: 12,
        css: {
            cursor: 'pointer'
        },
        title: 'Delete',
        'data-toggle': 'modal',
        'data-target': '#delete_popup',
        'data-id': event.id
    })
)

                );

                $('.riskeventtablebody').append(mainRow);

                // Append additional rows for remaining impact data if any
                for (var i = 1; i < impactData.length; i++) {
                    var impactRow = $('<tr>').append(
                        $('<td>').text(impactData[i].category || ''),
                        $('<td>').text(impactData[i].categoryDescription || ''),
                        $('<td>').text(impactData[i].impactCategory || ''),
                        $('<td>').text(impactData[i].impactDescription || ''),
                        $('<td>').text(impactData[i].actionSelect || '')
                    );
                    $('.riskeventtablebody').append(impactRow);
                }

                // 🔹 Fetch version history for this event
                getVersion(event.id);
            });

            // ✅ Set last changeId after loop
            if (data.length > 0) {
                var lastChangeId = data[data.length - 1].changeId;
                $("#changeId").val(lastChangeId);
            }
        },
        error: function (error) {
            console.log('Error fetching risk events:', error);
        }
    });
}




// Modified getVersion for specific riskId
function getVersion(riskId) {
    $.ajax({
        url: "/stratroom/riskEventhistorylist?eventId=" + riskId + "&version=",
        type: "GET",
        contentType: "application/json",
        success: function (response) {
            console.log("Version response for riskId", riskId, response);

            var $dropdown = $("#versionDropdown_" + riskId);

            if ($dropdown.length === 0) {
                console.warn("Dropdown not found for riskId:", riskId);
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
            console.log("Error fetching version for riskId:", riskId, err);
        }
    });
}


function getRiskVersion(eventId, selectedVersion) {
    if (!selectedVersion) return; 

    $.ajax({
        url: "/stratroom/riskEventhistorylist?eventId=" + eventId + "&version=" + selectedVersion,
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            // Clear the table body before rendering new data
            $('.riskeventtablebody').empty();
             $(".sendApprovalHeader").hide();   // hide header
             $(".sendApprovalCell").hide(); 
          // Suppose your JSON response is stored in `data`
             if (data && data.length > 0) {
                  var lastChangeId = data[data.length - 1].changeId; // get last object's changeId
               $("#changeId").val(lastChangeId);
              }
console.log(lastChangeId,"lc")
            // Iterate over the sorted data and render rows
            data.forEach(function (event) {
                // Calculate rowspan based on impact data length
                var impactData = event.incidentImpactData || [{}];
                var rowspan = impactData.length;
                var inventors = inventor(event.reporter);
                    $("#changeId").val(event.changeId); 
                // Create the main row for the event
                var mainRow = $('<tr>').append(
                    $('<td>').text(event.incidentDate).attr('rowspan', rowspan),
                    $('<td class="statusCell">').text(event.riskCode).attr('rowspan', rowspan),
                    $('<td>').text(event.incident).attr('rowspan', rowspan),
                    $('<td>').text(event.eventType).attr('rowspan', rowspan),
                    $('<td class="statusCell">').text(impactData[0].category || ''),
                    $('<td>').text(impactData[0].categoryDescription || ''),
                    $('<td class="statusCell">').text(impactData[0].impactCategory || ''),
                    $('<td>').text(impactData[0].impactDescription || ''),
                    $('<td>').text(impactData[0].actionSelect || ''),
                    $('<td>').text(event.correctiveAction).attr('rowspan', rowspan),
                    $('<td>').text(event.riskMitigation).attr('rowspan', rowspan),
                    $('<td class="statusCell">').text(event.eventStatus).attr('rowspan', rowspan),
                    $('<td>').html(inventors).attr('rowspan', rowspan),
                     $('<td>')
      .text('Back')
      .attr('rowspan', rowspan)
      .css({ cursor: 'pointer', color: 'blue', 'text-decoration': 'underline' })
      .on('click', function () {
          loadRiskEvents();
      }),
                    $('<td>').attr('rowspan', rowspan).append(
                        $('<i style="margin-right: 13px;">').addClass('fas fa-pen').click(function () { editRiskEvent(event.id); }),
                        $(`<i data-toggle="modal"
            data-target="#delete_popup" data-id=` + event.id + `>`).addClass('fas fa-trash')
                    )
                );

                // Append the main row to the table body
                $('.riskeventtablebody').append(mainRow);

                // Append additional rows for remaining impact data if any
                for (var i = 1; i < impactData.length; i++) {
                    var impactRow = $('<tr>').append(
                        $('<td>').text(impactData[i].category || ''),
                        $('<td>').text(impactData[i].categoryDescription || ''),
                        $('<td>').text(impactData[i].impactCategory || ''),
                        $('<td>').text(impactData[i].impactDescription || ''),
                        $('<td>').text(impactData[i].actionSelect || '')
                    );

                    // Append the impact row to the table body
                    $('.riskeventtablebody').append(impactRow);
                }
            });
        },
        error: function (error) {
            console.log('Error fetching risk events:', error);
        }
    });
}

            // Load risk options for dropdowns
            function loadRiskOptions() {
                $.ajax({
                    url: '/stratroom/riskoptionlist',
                    type: 'GET',
                    success: function (data) {
                        riskOptions = {
                            categoryOptions: data.filter(option => option.type === 'riskcategory'),
                            impactOptions: data.filter(option => option.type === 'category'),
                            actionOptions: data.filter(option => option.type === 'action')
                        };

                        populateDropdown($('.category-select'), riskOptions.categoryOptions);
                        

                        populateDropdown($('.impact-category-select'), riskOptions.impactOptions);
                        //   populateDropdown($('.action-select'), riskOptions.actionOptions);
                    },
                    error: function (error) {
                        console.log('Error fetching risk options:', error);
                    }
                });
            }

            function populateDropdown(dropdown, options) {
                dropdown.empty().append('<option value=" " selected="selected">Select</option>');
                options.forEach(function (option) {
                    dropdown.append($('<option>', {
                        value: option.value,
                        text: option.option
                    }));
                });
            }

            // Populate owner dropdown
            function populateOwnerDropdowndepartment() {
                $.ajax({
                    url: "/stratroom/allDepartmentList",
                    async: false,
                    success: function (data) {
                        var departmentDropdown = $('#department_select');
                        departmentDropdown.empty().append();
                        data.forEach(function (dept) {
                            departmentDropdown.append($('<option>', {
                                value: dept.id,
                                text: dept.name
                            }));
                        });
                    }
                });
            }
            function inventor(reporterData) {
                console.log(reporterData, "inventor");
                let reporterNames = [];

                try {
                    const reporters = JSON.parse(reporterData);
                    if (Array.isArray(reporters)) {
                        reporters.forEach(reporter => {
                            reporterNames.push(reporter.name);
                        });
                    } else {
                        reporterNames.push(reporters.name);
                    }
                } catch (e) {
                    console.log('Error parsing reporter data:', e);
                }

                return reporterNames.join(', ');
            }


            window.handleriskeventsave = function (event) {
                event.preventDefault(); // Prevent default form submit

                var incidentImpactArray = [];
                $('#incident-and-impact-container .incident-and-impact-row').each(function () {
                    var categorySelect = $(this).find('.category-select').val();
                    var categoryDescription = $(this).find('.category-description').val();
                    var impactCategorySelect = $(this).find('.impact-category-select').val();
                    var impactDescription = $(this).find('.impact-description').val();
                    var actionSelect = $(this).find('.impact-select').val();

                    if (categorySelect !== 'Select' || categoryDescription || impactCategorySelect !== 'Select' || impactDescription || actionSelect !== 'Select') {
                        incidentImpactArray.push({
                            category: categorySelect,
                            categoryDescription: categoryDescription,
                            impactCategory: impactCategorySelect,
                            impactDescription: impactDescription,
                            actionSelect: actionSelect
                        });
                    }
                });

                const selectedValues = $('#department_select').val();

                const selectedDepartments = selectedValues.map(value => {
                    const option = $('#department_select option[value="' + value + '"]').text();
                    return { reporter: value, name: option };
                });


                var eventData = {
                    riskCode: $('#riskcode').val(),
                    eventType: $('#department-2').val(),
                    incident: $('#incident').val(),
                    incidentDate: $('#incidentdate').val(),
                    incidentImpactData: incidentImpactArray,
                    correctiveAction: $('#correctiveaction').val(),
                    riskMitigation: $('#mitigation').val(),
                    eventStatus: $('#eventStatus').val(),
                    reporter: JSON.stringify(selectedDepartments),
                    pageId: $('#pagenumber').val(),
                    createdBy:$('#createdByName').val(),
                };

                var methodType = $('#riskeventform').data('is-new') ? 'POST' : 'PUT';
                if (methodType === 'PUT') {
                    eventData.id = $('#eventid').val(); // Ensure the ID is included
                }
                var apiUrl = '/stratroom/riskevent';

                // AJAX call to save risk event
                $.ajax({
                    url: apiUrl,
                    type: methodType,
                    contentType: "application/json",
                    data: JSON.stringify(eventData),
                    success: function (response) {
                        console.log('Success:', response);
                        $('.scorecard_description_popup').modal('hide');
                        // alert('Risk event saved successfully.');
                        location.reload(true);
                        loadRiskEvents();
                        resetRiskEventForm(); // Reset the form

                    },
                    error: function (xhr, status, error) {
                        console.log('Error:', error);
                        alert('Failed to save the risk event.');
                    }
                });
            };

    $('.scorecard_description_popup').on('hidden.bs.modal', function() {
        resetRiskEventForm();
    });
            
 $(document).ready(function() {
    $('#delete_popup').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var id = button.data('id'); // Extract info from data-* attributes

        // Store the ID in the modal's confirm button
        $('#confirmDelete').data('id', id);
        $("#id").val(id);
    });

    $('#confirmDelete').click(function() {
        var id = $(this).data('id'); // Retrieve the ID from the confirm button

        // Perform the delete operation
        deleteRiskEvent(id);
    });
});

function deleteRiskEvent(id) {
    $.ajax({
        url: "/stratroom/riskevent?eventId=" + id,
        type: 'DELETE',
        success: function(data) {
            location.reload(true);
        },

    });
}


            window.editRiskEvent = function (id) {

                $.ajax({
                    url: '/stratroom/riskeventbyid?eventId=' + id,
                    type: 'GET',
                    success: function (data) {
                        // Reset the form
                        resetRiskEventForm();

                        // Set form values with data
                        $('#riskcode').val(data.riskCode);
                        $('#department-2').val(data.eventType);
                        $('#incident').val(data.incident);
                        $('#incidentdate').val(data.incidentDate);
                        $('#pageId').val($('#pagenumber').val());
                        $('#eventid').val(id);
                        $('#correctiveaction').val(data.correctiveAction);
                        $('#mitigation').val(data.riskMitigation);
                        $('#eventStatus').val(data.eventStatus);
                        $('#createdBy').text(data.createdBy);
                        $('#createdByName').val(data.createdBy);
                        $('#modifiedBy').text(data.updatedBy);
                        $('#createdDate').text(formatDate(data.createdAt));
                        $('#modifiedDate').text(formatDate(data.updatedAt));
                        $('#riskeventform').data('is-new', false);

                        if (data.reporter != null) {
                            const reporterData = JSON.parse(data.reporter); // Parse the JSON string into an array
                            let selectedValues = "";

                            if (reporterData != null && Array.isArray(reporterData)) {
                                selectedValues = reporterData.map(dept => dept.reporter);
                            } else {
                                selectedValues = reporterData;
                            }

                            $('#department_select').val(selectedValues).trigger('change');
                        }
                        var incidentImpactContainer = $('#incident-and-impact-container');
                        incidentImpactContainer.empty();

                        if (data.incidentImpactData && data.incidentImpactData.length > 0) {
                            data.incidentImpactData.forEach(function (item) {
                                addIncidentImpactRow(item);
                            });
                        } else {
                            addIncidentImpactRow();
                        }

                        $('.scorecard_description_popup').modal('show');
                       
                    },
                    
                    error: function (error) {
                        console.log('Error fetching risk event:', error);
                        alert('Failed to fetch details for the risk event.');
                    }
                    
                });
                
            };

            // Format date function
           function formatDate(dateString) {
    // Return blank if the value is undefined, null, or empty
    if (!dateString) return '';

    var date = new Date(dateString);

    // Return blank if the date is invalid
    if (isNaN(date.getTime())) return '';

    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();

    return year + '-' + month + '-' + day;
}



            // Read file for upload
            var file;
            function readFile(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    file = input.files[0];
                    reader.onload = function () {
                        var htmlPreview = '<div class="box-body-border">' +
                            '<img width="20" src="../stratroom/images/file-icon.png"/>' +
                            "<span>" + input.files[0].name + "</span>" +
                            "<span><i class='fa fa-times remove-preview'></i></span>" +
                            "</div>";
                        var wrapperZone = $(input).parent();
                        var previewZone = $(input).parent().parent().find(".preview-zone");
                        var boxZone = $(input).parent().parent().find(".preview-zone").find(".box").find(".box-body");
                        wrapperZone.removeClass("dragover");
                        previewZone.removeClass("hidden");
                        boxZone.empty();
                        boxZone.append(htmlPreview);
                        removeFile();
                    };
                    reader.readAsDataURL(input.files[0]);
                }
                $(".form-progressbar li:nth-child(1)").addClass("active");
            }

            function reset(e) {
                e.wrap("<form>").closest("form").get(0).reset();
                e.unwrap();
            }

            $(".dropzone").change(function () {
                readFile(this);
            });

            $(".dropzone-wrapper").on("dragover", function (e) {
                e.preventDefault();
                e.stopPropagation();
                $(this).addClass("dragover");
            });

            $(".dropzone-wrapper").on("dragleave", function (e) {
                e.preventDefault();
                e.stopPropagation();
                $(this).removeClass("dragover");
            });

            function removeFile() {
                $(".remove-preview").on("click", function () {
                    var boxZone = $(this).parents(".preview-zone").find(".box-body");
                    var previewZone = $(this).parents(".preview-zone");
                    var dropzone = $(this).parents(".form-group").find(".dropzone");
                    boxZone.empty();
                    previewZone.addClass("hidden");
                    reset(dropzone);
                });
            }

            $("#next-btn-1").click(function () {
                $("#validateImportHide").empty();
                $("#file-upload").hide();
                $("#file-validate").show();
                $("#file-save").hide();
                $(".form-progressbar li:nth-child(2)").addClass("active");
                var formdata = new FormData();
                formdata.append("riskevent", file);
                formdata.append("pageId", $('#pagenumber').val());

                $(".page-loader-wrapper").css("display", "block");
                if (file) {
                    $.ajax({
                        url: "/stratroom/saveRiskEvent?type=validation",
                        type: "POST",
                        data: formdata,
                        processData: false,
                        contentType: false,
                        success: function (data, status) {
                            console.log(data);
                            riskUploadNotFoundData(data, data.parsingError);
                            $(".page-loader-wrapper").css("display", "none");
                        }
                    });
                } else {
                    $("#fileerrorshow").html('Please select upload file');
                    $("#fileerrorshow").show();
                    $(".page-loader-wrapper").css("display", "none");
                    $("#file-upload").show();
                    $("#file-validate").hide();
                    $("#file-validate1").hide();
                    $("#file-save").hide();
                    $(".form-progressbar li:nth-child(1)").removeClass("active");
                    $(".form-progressbar li:nth-child(2)").removeClass("active");
                }
            });

            $(document).on('click', '#next-btn-2', function () {
                $("#file-upload").hide();
                $("#file-validate").hide();
                $("#file-save").show();
                $(".form-progressbar li:nth-child(3)").addClass("active");
                var formdata = new FormData();
                formdata.append("riskevent", file);
                formdata.append("pageId", $('#pagenumber').val());
                $(".page-loader-wrapper").css("display", "block");
                $.ajax({
                    url: "/stratroom/saveRiskEvent?type=save",
                    type: "POST",
                    data: formdata,
                    processData: false,
                    contentType: false,
                    success: function (data, status) {
                        $(".page-loader-wrapper").css("display", "none");
                        riskUploadSuccess(data);
                    }
                });
            });

            $(document).on('click', '#prev-btn1', function () {
                $(".uploadvalidationSuccess").empty();
                $("#validateImportHide").empty();
                $("#file-upload").show();
                $("#file-validate").hide();
                $("#file-save").hide();
                $(".form-progressbar li:nth-child(2)").removeClass("active");
                $(".form-progressbar li:nth-child(1)").addClass("active");
            });

            $(document).on('click', '#prev-btn2', function () {
                $(".uploadStatististics").empty();
                $("#statisticmessage").html("");
                $(".error-div").hide();
                $("#file-upload").hide();
                $("#file-validate").show();
                $("#file-save").hide();
                $(".form-progressbar li:nth-child(3)").removeClass("active");
                $(".form-progressbar li:nth-child(2)").addClass("active");
            });

            function riskUploadNotFoundData(data, result) {
                $(".uploadvalidationSuccess").empty();
                var initiative_import_error;
                if (!jQuery.isEmptyObject(data) && data.result == "Not-Success") {
                    $("#imagevalidate").attr("src", "images/Not-Verified.png");
                    var validateImport = '<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>' +
                        '<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
                }
                if (!jQuery.isEmptyObject(data) && (data.result == "success" || data.result == "Success")) {
                    $(".error-div").hide();
                    $("#imagevalidate").attr("src", 'images/Success.png');


                    var validateImport = '<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>' +
                        '<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';
                }

                $.each(result, function (i, List) {
                    initiative_import_error = '<tr>' +
                        '<td style="width: 150px; text-align: center;">' + List.Excel_SheetName + '</td>' +
                        '<td style="width: 150px; text-align: center; ">' + List.rowNo + '</td>' +
                        '<td style="width: 150px; text-align: center;">' + List.highLightcellName + '</td>' +
                        '<td style="width: 250px; text-align: center;">' + List.error + '</td>' +
                        '</tr>';
                    $(".uploadvalidationSuccess").append(initiative_import_error);
                });

                if (jQuery.isEmptyObject(data)) {
                    $(".error-div").hide();
                    $("#imagevalidate").attr("src", "images/Not-Verified.png");
                    var validateImport = '<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>' +
                        '<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
                }
                $("#validateImportHide").append(validateImport);
            }

            function riskUploadSuccess(data) {
                $(".uploadStatististics").empty();
                $(".error-div").show();
                $("#imagevalidate").attr("src", "images/Success.png");
                console.log(data);
                riskStatististics('No of Risk Processed', (data.no_of_processed != undefined ? data.no_of_processed : ""));
                riskStatististics('No of Failed', (data.no_of_failed != undefined ? data.no_of_failed : ""));
            }

            function riskStatististics(staticsvalue, fnresult) {
                var risk_Statististics = '<tr>' +
                    '<td style="width: 300px; text-align: left;">' + staticsvalue + '</td>' +
                    '<td style="width: 300px; text-align: center;">' + fnresult + '</td>' +
                    '</tr>';
                $(".uploadStatististics").append(risk_Statististics);
            }

            $(document).on('click', '#done-btn', function () {
                location.reload(true);
            });

            $(document).on('click', ".close", function () {
                $(".box-body").empty();
                $("#fileerrorshow").html("");
                $("#statisticmessage").html("");
                $("#file-upload").show();
                $("#file-validate").hide();
                $("#file-save").hide();
                $(".form-progressbar li:nth-child(1)").removeClass("active");
                $(".form-progressbar li:nth-child(2)").removeClass("active");
                $(".form-progressbar li:nth-child(3)").removeClass("active");
            });
        });
        $(document).ready(function () {

            $(".int-status-multi-select").select2();

        });


        function populateRiskCode() {
            var datePeriod = $('#datePeriod').val();
                $.ajax({
                    url: "/stratroom/riskCodeListByEmpId?dateRange="+datePeriod,
                    async: false,
                    success: function (data) {
                        var riskCodeDropdown = $('#riskcode');
                        riskCodeDropdown.empty().append();
                        $('#riskcode').append('<option value="select">Select</option>');
                        data.forEach(function (code) {
                            if (code.riskUniqueId && code.riskUniqueId.trim() !== "") { 
                            riskCodeDropdown.append($('<option>', {
                                value: code.riskUniqueId,
                                text: code.riskUniqueId
                            }));
                        }
                        });
                    }
                });
            }
            
    </script>
     <script>
        document.getElementsByClassName('selectField').addEventListener('change', function() {
            var statusCell = document.getElementsByClassName('statusCell');
            var selectedValue = this.value;

            if (selectedValue === 'Select') {
                statusCell.innerHTML = '';
            } else {
                statusCell.innerHTML = selectedValue;
            }
        });
</script>
</body>

</html>
