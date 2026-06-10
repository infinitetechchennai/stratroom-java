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
<link href="css/app.min.css" rel="stylesheet">
<!-- Custom Css -->
<link href="css/style.css" rel="stylesheet" />
<link href="css/risk.css" rel="stylesheet" />
<link href="css/custom.css" rel="stylesheet" />
<link href="css/startroom/wedgets.css" rel="stylesheet" />
<!-- You can choose a theme from css/styles instead of get all themes -->
<link href="css/styles/all-themes.css" rel="stylesheet" />
<link href="css/bootstrap-popover-x.css" media="all" rel="stylesheet" />
<link href="css/circle.css" rel="stylesheet" />
<link href="${contextroot}/css/daterangepicker.min.css" rel="stylesheet"> 
<link rel="stylesheet" href="${contextroot}/css/datepickerair.css">
<link rel="stylesheet" href="css/jquery-ui.min.css">
<link rel="stylesheet" href="css/employee.css">
<link rel="stylesheet" href="css/fonts/fontawesome_v_5/font-awesome.min.css">
<link rel="stylesheet" href="css/fonts/fontawesome_v_5/all.css">
<script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>
<script type="text/javascript" src="${contextroot}/js/jquery/jquery.validate.min.js"></script>
<script type="text/javascript" src="${contextroot}/js/jquery/additional-methods.min.js"></script>

<!-- multi-select dropdown -->
<link rel="stylesheet" href="${contextroot}/css/select2.min.css" />
<!-- multi-select dropdown -->

<link href="css/select2.min.css" rel="stylesheet" />
<link href="${contextroot}/css/jquery.contextMenu.min.css" rel="stylesheet">
<link href="${contextroot}/css/file-upload.css" rel="stylesheet">

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-timepicker/1.13.18/jquery.timepicker.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-timepicker/1.13.18/jquery.timepicker.min.js"></script>

<!-- RPO Style Start -->
<style>

	#multi-select-dropdown {
		width: 200px;
		padding: 5px;
	}

.dashboard-table tbody tr td,
	.dashboard-table tbody tr th {
		border: 1px solid #ded4d4 !important ;
		padding: 10px 5px 10px 5px;
	}

	.position {
		position: static !important;
		left: 0;
	}

	.table-responsive {
		transform: rotateX(180deg);
		width: auto !important;
		overflow-x: auto !important;
		display: block !important;
	}
	table {
		transform: rotateX(180deg) !important;
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

	#moa {
		background: #dddddd49 !important;
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

	/* #red {} */
	#blue {
		background: #dddddd49;
	}

	#yellow {
		background: #dddddd49;
	}

	#green {
		background: #dddddd49;
		color: black;
	}

	#grey {
		background: #dddddd49;
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

	#formula_builder,
	#summary_calculation {
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

	.modal-content {
		/* height: 550px; */
		width: 750px;
		display: flex;
        justify-content: space-between;

	}

	.modal-body {
		overflow-y: auto;
	}

	.modal-footer {
		margin-top: 12px;
	}

	th {
		border: 1px solid rgba(12, 12, 12, 0.164) !important;
		font-weight: 1000 !important;
	}

    /* multi-select dropdown */
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
<!-- RPO Style End -->
</head>

<body class="light">
  <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
		<jsp:include page="../common/top-navigation.jsp"></jsp:include>
		<input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
		<div>
			<jsp:include page="../common/left-navigation.jsp"></jsp:include>
			<jsp:include page="../common/right-navigation.jsp"></jsp:include>
		</div>

      <div class="modal fade file_upload_popup" id="file-validate-form"
			tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
			aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered modal-lg">
				<div class="modal-content">
					<div class="modal-header" style="height:45px !important;padding: 10px 16px 10px 16px !important;margin: -10px -10px 12px -10px !important;">
						<h4 style="color: #fff;" data-i18n="File Upload">File Upload</h4>
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
										<option value="Scorecard" data-i18n="Scorecard">Scorecard</option>
										<option value="Initiative & Projects" data-i18n="Initiatives & Projects">Initiatives & Projects</option>
										<option value="Risk" data-i18n="Risk">Risk</option>
										<option value="ProjectFormulation" data-i18n="Project Formulation">Project Formulation</option>
										<option value="RiskFormulation" data-i18n="Risk Formulation">Risk Formulation</option>
										<option value="StrategyFormulation" data-i18n="Strategy Formulation">Strategy Formulation</option>
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

<!-- Section - Table Start -->
<section class="content">
	<c:if test="${pageId != null}">
        <input id="pagenumber" type="hidden" name="pagenumber" value="<c:out value="${pageId}" />">
    </c:if>
            <!-- Page Header -->
            <div class="page-header row no-gutters py-2 m-t--70">
                <div class="col-lg-6 col-md-6 text-center text-sm-left pt-2 mb-0 ml-4">
                    <h5 class="page-title" style="font-weight: 600; text-transform: uppercase">
                        LCA PERFORMANCE MANAGEMENT AND REPORTING PRINCIPLES
                    </h5>
                </div>
            </div>

            <!-- Top Buttons -->
            <div class="row">
                <div class="col-md-9">

                </div>
                <div class="col-md-3 mt-2">

                    <button class="btn btn-custom-secondary pull-right" data-toggle="modal"
                        data-target=".scorecard_description_popup" style="margin-left: 4px">
                        <i class="fa fa-plus-square" aria-hidden="true"></i>
                    </button>

                    <button class="btn btn-custom-secondary dropdown-toggle pull-right ml-1" data-toggle="dropdown">


                        <ul class="header-dropdown mt-1" style="color:black !important;">
                            <li class="dropdown title_edit_icon" data-toggle="tooltip" data-placement="bottom">
                                <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown"
                                    role="button" aria-haspopup="true" aria-expanded="true">
                                    <i class="fas fa-upload" aria-hidden="true" style="color: black !important;"></i>
                                </a>
                                <ul class="dropdown-menu pull-right" x-placement="bottom-start" style="
                                  position: absolute;
                                  will-change: transform;
                                  top: 0px;
                                  left: 0px;
                                  transform: translate3d(0px, 24px, 0px);
                                ">
                                    <li>
                                        <a href="#" onclick="return false;">Download PDF</a>
                                    </li>
                                    <li>
                                        <a href="#" onclick="return false;" class="delete-row" data-i18n="Download CSV">Download CSV</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </button>
                    <input type="file" id="imgupload" style="display: none" />
                    <button class="btn btn-custom-secondary pull-right" id="OpenImgUpload" style="margin-left: 4px">
                        <i class="fas fa-download"></i>
                    </button>

                    <ul class="dropdown-menu dropdown-hide multi-column columns pull-right" x-placement="bottom-start"
                        style="
                  position: absolute;
                  will-change: transform;
                  top: 0px;
                  left: 0px;
                  width: 180px;
                  transform: translate3d(0px, 24px, 0px);
                ">
                        <div class="row">
                            <div class="col-sm-12">
                                <ul class="multi-column-dropdown">

                                    <li>
                                        <a href="#">
                                            <label>
                                                <input type="checkbox" name="customer" value="customer" checked />
                                                DATE OF INCIDENT</label>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <label>
                                                <input type="checkbox" name="customer" value="customer" checked />
                                                RISK CODE</label>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <label>
                                                <input type="checkbox" name="internal-process" value="internal-process"
                                                    checked />
                                                INCIDENT</label>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <label>
                                                <input type="checkbox" name="internal-process" value="internal-process"
                                                    checked />
                                                TYPE OF EVENT</label>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <label>
                                                <input type="checkbox" name="internal-process" value="internal-process"
                                                    checked />
                                                THE CAUSE OF THE INCIDENT</label>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <label>
                                                <input type="checkbox" name="internal-process" value="internal-process"
                                                    checked />
                                                IMPACT / LOSS</label>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <label>
                                                <input type="checkbox" name="internal-process" value="internal-process"
                                                    checked />
                                                CORRECTIVE ACTION</label>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <label>
                                                <input type="checkbox" name="internal-process" value="internal-process"
                                                    checked />
                                                RISK MITIGATION (CORRECTIVE ACTION)</label>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <label>
                                                <input type="checkbox" name="internal-process" value="internal-process"
                                                    checked />
                                                EVENT STATUS</label>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <label>
                                                <input type="checkbox" name="internal-process" value="internal-process"
                                                    checked />
                                                INVENTOR / REPORTER</label>
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </ul>
                    </button>
                </div>
            </div>
            <!-- End Page Header -->
            <div class="container-fluid">
            
                <div class="tableview">
                    <div class="row">
                        <div class="col-lg-12 col-md-6 select-toggle financial">
                            <div class="card">

                                <div class="table-responsive" ;>
                                    <div class="tableBody">
                                        <table class="table dashboard-task-infos align-center dashboard-table">
                                            <thead>
                                                <tr style="width:inherit;">
                                                    <th class="position" id="blue">
                                                        STRATEGIC OUTCOMES
                                                    </th>
                                                    <th class="position" id="blue">
                                                        STRATEGIC OBJECTIVES
                                                    </th>
                                                    <th class="position" id="blue">
                                                        COHERENT ACTIONS 
                                                    </th>
                                                    <th id="blue">
                                                        SUB-ACTIONS
                                                    </th>
                                                    <th id="blue">
                                                        OUTPUT
                                                    </th>
                                                    <th id="blue">
                                                        RESPONSIBLE
                                                    </th>
                                                    <th id="green">
                                                        TARGET PERIOD 2024/25
                                                    </th>
                                                    <th id="green">
                                                        PLANNED IMPLEMENTATION MONTHS
                                                    </th>
                                                    <th id="moa">
                                                        ACTUAL IMPLEMENTATION  MONTHS
                                                    </th>
                                                    <th id="moa">
                                                        PERFORMANCE STATUS AS AT 30 SEPTEMBER 2024
                                                    </th>
                                                    <th id="grey">
                                                        IMPLEMENTATION REMARKS
                                                    </th>
                                                    <th id="grey">
                                                        PERFORMANCE ANALYSIS;OBSERVATIONS ; RECOMMENDATIONS
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <td rowspan="2">
                                                        SOU 1 EFFICIENT REGULATOR
                                                    </td>
                                                    <td rowspan="2">
                                                        SOB 1.1  ACCELERATE DIGITAL TRANSFORMATION IN THE AUTHORITY
                                                    </td>
                                                    <td rowspan="2">
                                                        1.1.1 Mould LCA into an employer of choice
                                                    </td>
                                                    <td>
                                                        1.1.1.2 Promote information and knowledge Sharing
                                                    </td>
                                                    <td>
                                                        Information and knowledge sharing Document
                                                    </td>
                                                    <td>
                                                        CEO
                                                    </td>
                                                    <td>
                                                        YR1 THROUGH TO YR 3
                                                    </td>
                                                    <td>
                                                        April 2024 to March 2025
                                                    </td>
                                                    <td>
                                                        
                                                    </td>
                                                    <td>
                                                        <img src="images/widgets/buzzer-red-i.png" width="20px" height="20px" />
                                                    </td>
                                                    <td>
                                                        There were no planned information and knowledge sharing sessions by different divisions in Quarter 2.
                                                    </td>
                                                    <td></td>
                                                    
                                                </tr>
                                                <tr>
                                                    <td>
                                                        1.1.1.3   Align structure to strategy
                                                    </td>
                                                    <td>
                                                        Organisational Structure 
                                                    </td>
                                                    <td>
                                                        CEO
                                                    </td>
                                                    <td>
                                                        YR2
                                                    </td>
                                                    <td>
                                                        April to September 2024
                                                    </td>
                                                    <td>
                                                        April to September 2024
                                                    </td>
                                                    <td>
                                                        <img src="images/widgets/buzzergreen.png" width="20px" height="20px" />
                                                    </td>
                                                    <td>
                                                        The alignment of the structure to strategy has been completed and the new organizational structure will be implemented from the 1st October, 2024.
                                                    </td>
                                                    <td>
                                                        
                                                    </td>
                                                    
                                                </tr>
                                                <tr>
                                                    <td rowspan="2">
                                                        1. Efficient regulator
                                                    </td>
                                                    <td rowspan="2">
                                                        SOB 1.1  ACCELERATE DIGITAL TRANSFORMATION IN THE AUTHORITY
                                                    </td>
                                                    <td rowspan="2">
                                                        1.1.2 Modernise business operations
                                                    </td>
                                                    <td>
                                                        1.1.2.1 Automate transport management systems
                                                    </td>
                                                    <td>
                                                        Automated transport management systems
                                                    </td>
                                                    <td>
                                                        CFO
                                                    </td>
                                                    <td>
                                                        YR2
                                                    </td>
                                                    <td>
                                                        April to September 2024
                                                    </td>
                                                    <td></td>
                                                    <td>
                                                        <img src="images/widgets/buzzer-yellow-i.png" width="20px" height="20px" />
                                                    </td>
                                                    <td>
                                                        Gathering of requirements was initiated. Automation of transport management system will also include facilities requests.
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        1.1.2.2 Automated procurement management system
                                                    </td>
                                                    <td>
                                                        Automated procurement management system
                                                    </td>
                                                    <td>
                                                        CFO
                                                    </td>
                                                    <td>
                                                        YR2
                                                    </td>
                                                    <td>
                                                        April to September 2024
                                                    </td>
                                                    <td></td>
                                                    <td>
                                                        <img src="images/widgets/buzzer-red-i.png" width="20px" height="20px" />
                                                    </td>
                                                    <td></td>
                                                    <td>
                                                        The system automation could not be started because:
                                                        <br>
                                                        All the resources were committed to the enterprise performance management  and reporting system
                                                        The procurement automation had to be done after upgrading Sage 300 and BPM; and the upgrade will completed at the beginning of Quarter 3
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td rowspan="3">
                                                        1. Efficient regulator
                                                    </td>
                                                    <td rowspan="3">
                                                        1.1 Accelerate digital transformation in the Authority
                                                    </td>
                                                    <td rowspan="3">
                                                        1.1.2 Modernise business operations
                                                    </td>
                                                    <td>
                                                        1.1.2.4 Automate enterprise performance management  and reporting
                                                    </td>
                                                    <td>
                                                        Automated enterprise performance management  and reporting
                                                    </td>
                                                    <td>
                                                        CEAO
                                                    </td>
                                                    <td>
                                                        YR2
                                                    </td>
                                                    <td>
                                                        April to September 2024
                                                    </td>
                                                    <td></td>
                                                    <td>
                                                        <img src="images/widgets/buzzer-yellow-i.png" width="20px" height="20px" />
                                                    </td>
                                                    <td>
                                                        Validation of the captured data on the Strategic Initiatives and Routine Initiatives was performed in this quarter.
                                                        <br>
                                                        In addition, Orchid Extender (another Sage 300 Module)  has been proposed and installed to enable seamless integration of the Budgeting Module into the Stratroom System (EPMBRS)
                                                    </td>
                                                    <td>
                                                        The project team had made a request to EXCO to extend project timelines from 30 September  2024 to 31 January 2025 due to the amount of work required to accommodate the new structure
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        1.1.2.5 Automate monitoring of broadcasting content
                                                    </td>
                                                    <td>
                                                        Automated monitoring of broadcasting content
                                                    </td>
                                                    <td>
                                                        CRO
                                                    </td>
                                                    <td>
                                                        YR2
                                                    </td>
                                                    <td>
                                                        April to September 2024
                                                    </td>
                                                    <td></td>
                                                    <td>
                                                        <img src="images/widgets/buzzer-yellow-i.png" width="20px" height="20px" />
                                                    </td>
                                                    <td>
                                                        Gathering of system requirements has been initiated. The Evaluation Committee to work on the procurement of the system will be appointed at the beginning  of quarter 3
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        1.1.2.7 Automate Performance management system
                                                    </td>
                                                    <td>
                                                        Automated Performance Management System
                                                    </td>
                                                    <td>
                                                        CEO
                                                    </td>
                                                    <td>
                                                        YR2
                                                    </td>
                                                    <td>
                                                        April to September 2024
                                                    </td>
                                                    <td></td>
                                                    <td>
                                                        <img src="images/widgets/buzzer-yellow-i.png" width="20px" height="20px" />
                                                    </td>
                                                    <td>
                                                        It is integrated in the in the implementation the EPMBRS
                                                    </td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
    </section>
<!-- Section - Table End -->

<!-- Popoup Start -->
	<div class="modal fade scorecard_description_popup" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h4>LCA PERFORMANCE MANAGEMENT AND REPORTING PRINCIPLES
                    </h4>
					<button type="button" class="close pull-right" data-dismiss="modal">
						&times;
					</button>
				</div>
				<div class="modal-body">
					<form id="objectiveForm">
						<div class="form-row">

							<div class="form-group col-md-6">
								<label for="objective_name">Process (POS)</label>
								<select class="form-control processService int-status-multi-select" name="states[]" multiple="multiple" id="saveprocessService">
								</select>
							</div>

							<div class="form-group col-md-6">
								<label for="objective_name">Name of Vital Records</label>	
								<select class="form-control vitalService int-status-multi-select"  name="states[]" multiple="multiple" id="savevitalService">                                           
								</select>
							</div>

							<div class="form-group col-md-6">
								<label for="objective_name">Type of Media</label>	
								<select class="form-control mediaService int-status-multi-select"  name="states[]" multiple="multiple" id="savemediaService">                                           
								</select>
							</div>

							<div class="form-group col-md-6">
								<label for="objective_name">Backup Method</label>	
								<select class="form-control backupService int-status-multi-select"  name="states[]" multiple="multiple" id="savebackupService">                                           
								</select>
							</div>

							<div class="form-group col-md-6">
								<label for="objective_name">Backup Time</label>	
								<select class="form-control backuptimeService int-status-multi-select"  name="states[]" multiple="multiple" id="savebackuptimeService">                                           
								</select>
							</div>

							<div class="form-group col-md-6">
								<label for="objective_name">Retention</label>	
								<select class="form-control retentionService int-status-multi-select"  name="states[]" multiple="multiple" id="saveretentionService">                                           
								</select>
							</div>

							<div class="form-group col-md-6">
								<label for="objective_name">Database Recovery Strategy</label>	
								<select class="form-control recoveryService int-status-multi-select"  name="states[]" multiple="multiple" id="saverecoveryService">                                           
								</select>
							</div>

						</div>
						<hr />
					</form>
				</div>
				<div class="row mt-2">
					<div class="col-12">
						<div class="form-line right">
							<button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close" data-i18n="Cancel">
								Cancel
							</button>
							<button class="initative_save_btn" value="Save" type="button" onclick="saveRPOpage()" data-i18n="Save">Save</button>
						</div>
						<input id="pageId" type="hidden" name="pagenumber" value="${pagenumber}" />
					</div>
				</div>
				<hr />
				<div class="modal-footer">
					<div class="d-flex flex-column flex-fill ml-4 mb-5 text-left font-11">
						<div class="d-flex flex-row">
							<p class="kpi_audit">Audit</p>
						</div>
						<div class="d-flex flex-row">
							<div class="d-flex flex-column">
								<p><span>Created By : </span><span></span></p>
								<p><span>Created Date : </span><span></span></p>
							</div>
							<div class="d-flex flex-column pl-5">
								<p><span>Modified By : </span><span></span></p>
								<p><span>Modified Date : </span><span></span></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- Popup end -->

<!-- Update Popup start -->
<div class="modal fade edit_update_table" tabindex="-1" role="dialog"
aria-labelledby="myLargeModalLabel" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered modal-lg">
	<div class="modal-content">
		<div class="modal-header">
			<h4>Business Impact Analysis</h4>
			<button type="button" class="close pull-right" data-dismiss="modal">
				&times;
			</button>
		</div>
		<div class="modal-body">
			<form id="objectiveForm">
				<div class="form-row">
					<div class="form-group col-md-12">
						<label for="id">ID</label><br>
						<input class="updateid" id="updateid" style="border: 1px solid #ded4d4 !important; height: 25px; width:49%" readonly>
					</div>

					<div class="form-group col-md-6">
						<label for="objective_name">Process (POS)</label>
						<select class="form-control processService int-status-multi-select" name="process" multiple="multiple" id="processServiceUpdate">
						</select>
					</div>
					
					<div class="form-group col-md-6">
						<label for="objective_name">Name of Vital Records</label>
						<select class="form-control vitalService int-status-multi-select" name="vital" multiple="multiple" id="vitalServiceUpdate">
						</select>
					</div>

					<div class="form-group col-md-6">
						<label for="objective_name">Type of Media</label>
						<select class="form-control mediaService int-status-multi-select" name="media" multiple="multiple" id="mediaServiceUpdate">
						</select>					
					</div>

					<div class="form-group col-md-6">
						<label for="objective_name">Backup Method</label>
						<select class="form-control backupService int-status-multi-select" name="backupMethod" multiple="multiple" id="backupServiceUpdate">
						</select>
					</div>

					<div class="form-group col-md-6">
						<label for="objective_name">Backup Time</label>
						<select class="form-control backuptimeService int-status-multi-select" name="backupTime" multiple="multiple" id="backuptimeServiceUpdate">
						</select>
					</div>

					<div class="form-group col-md-6">
						<label for="objective_name">Retention</label>
						<select class="form-control retentionService int-status-multi-select" name="retention" multiple="multiple" id="retentionServiceUpdate">
						</select>
					</div>

					<div class="form-group col-md-6">
						<label for="objective_name">Database Recovery Strategy</label>
						<select class="form-control recoveryService int-status-multi-select" name="databaseRecoveryStrategy" multiple="multiple" id="recoveryServiceUpdate">
						</select>
					</div>
				</div>
				<hr />
			</form>
		</div>
		<div class="row mt-2">
			<div class="col-12">
				<div class="form-line right">
					<button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close" data-i18n="Cancel">
						Cancel
					</button>
					<button class="initative_save_btn" value="Save" type="button" onclick="updateRPOpage()" data-i18n="Save">Save</button>
				</div>
			</div>
		</div>
		<hr />
		<div class="modal-footer">
			<div class="d-flex flex-column flex-fill ml-4 mb-5 text-left font-11">
				<div class="d-flex flex-row">
					<p class="kpi_audit">Audit</p>
				</div>
				<div class="d-flex flex-row">
					<div class="d-flex flex-column">
						<p><span>Created By : </span>
							<input type="text" id="nameCreated" 
							style="
							margin-left: 15px;margin-top: -40px;
							width: 60%;
							"readonly>
						</p>
						<p><span>Created Date : </span>
							<input type="text" id="dateCreated"
							style="
							margin-left: 2px;margin-top: -40px;
							width: 60%;
							"readonly>
						</p>
					</div>
					<div class="d-flex flex-column pl-5">
						<p><span>Modified By : </span>
							<input type="text" id="nameUpdated" 
							style="
							margin-left: 15px;margin-top: -40px;
							width: 60%;
							"readonly>
						</p>
						<p><span>Modified Date : </span>
							<input type="text" id="dateUpdated"
							style="
							margin-left: 2px;margin-top: -40px;
							width: 60%;
							"readonly>
						</p>
						<!-- Get the "createBy" Id -->
						<input type="hidden" id="createId">
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</div>
<!-- Update Popup end -->

<!-- Delete Popup Start -->
	<div class="modal fade" id="delete_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
		 aria-hidden="true">
		 <div class="modal-dialog modal-dialog-centered modal-md">
		   <div class="modal-content">
			 <div class="modal-header">
			   <h4>Delete</h4>
			   <button type="button" class="close pull-right" data-dismiss="modal">
				 &times;
			   </button>
			 </div>
			 <div class="modal-body">
			   <div class="row">
				 <div class="col-12" style="text-align: center; padding-bottom: 12px;height: 75px;">
				   <h5>Do you really want to delete?</h5>
				 </div>
				 <div class="col-12">
				   <div class="form-line right">
					 <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close">
					   Cancel
					 </button>
					 <button class="initative_save_btn" value="Save" style="background-color: #f2675f"
					 onclick="deleteRPOpage()" data-i18n="Save">
					   Delete 
					 </button>
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
    <script src="js/app.min.js"></script>

<!-- Custom Js -->
    <script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
	<script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
    <script src="js/admin.js"></script>
    <script src="js/file-preview.js"></script>
    <script type="text/javascript" src="${contextroot}/js/knockout-3.5.0.js"></script>
	<script type="text/javascript" src="${contextroot}/js/daterangepicker.min.js"></script>

<!-- Knob Js -->
    <script src="js/jquery-ui.min.js"></script>
    <script src="js/moment.js"></script>
    <script src="js/pages/animated.js"></script>
    <script src="js/jquery.editable.min.js"></script>
    <script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
    <script src="js/jquery-resize.js"></script>
    <script src="js/datepickerair.js"></script>
    <script src="js/datepicker.en.js"></script>
    <script src="${contextroot}/js/widgets.js"></script>
    <script src="js/exceltemplate.js"></script>
    <script src="${contextroot}/js/notify.js"></script>
    <script src="js/initial.js"></script>

	<!-- multi-select dropdown -->
	<script src="${contextroot}/js/select2.min.js"></script>
	<!-- multi-select dropdown -->

	<!-- multi-select dropdown -->
	<script>
		$(document).ready(function () {
		$(".int-status-multi-select").select2();
		 }
	   );
		</script>
	<!-- multi-select dropdown -->

  <!-- Get the Page Start -->
        <script>
	    $(document).ready(function () {
	    
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
		// Get the Page End 
	
		$(".daterangepicker-field").daterangepicker({
			forceUpdate: true,
			callback: function (startDate, endDate, period) {
				var title = startDate.format("L") + " – " + endDate.format("L");
				$(this).val(title);
			},
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
function getProcesslist() {
    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=Process",
        async: false,
        dataType: 'json',
        success: function (employeeList) {
            processSelect(employeeList);
        }
    });
}

function processSelect(data) {
    var $select = $('.processService, #processServiceUpdate');
    $select.empty();
    data.forEach(function (list) {
        if (list.data.processName && list.data.processName.trim() !== "") {
            var $option = $('<option>', {
                text: list.data.processName,
                value: list.data.processName
            });
            $select.append($option);
        }
    });
}
getProcesslist();

// Vital
function getVitallist() {
    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=Vital",
        async: false,
        dataType: 'json',
        success: function (employeeList) {
		vitalSelect(employeeList);
        }
    });
}
  function vitalSelect(data) {
    var $select = $('.vitalService,#vitalServiceUpdate');
	$select.empty();
    data.forEach(function (list) {
		if (list.data.vitalName && list.data.vitalName.trim() !== "") {
        var $option = $('<option>', {
            text: list.data.vitalName,
            value: list.data.vitalName
        });
        $select.append($option);
	}
    });
}
getVitallist();

// Media
function getMedialist() {
    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=technology",
        async: false,
        dataType: 'json',
        success: function (employeeList) {
		mediaSelect(employeeList);
        }
    });
}                
  function mediaSelect(data) {
    var $select = $('.mediaService, #mediaServiceUpdate');
	$select.empty();
    data.forEach(function (list) {
		if (list.data.itName && list.data.itName.trim() !== "") {
        var $option = $('<option>', {
            text: list.data.itName,
            value: list.data.itName
        });
        $select.append($option);
	}
    });
}
getMedialist();

// Backup Methods
function getBackuplist() {
    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=technology",
        async: false,
        dataType: 'json',
        success: function (employeeList) {
		backupSelect(employeeList);
        }
    });
}                
  function backupSelect(data) {
    var $select = $('.backupService, #backupServiceUpdate');
	$select.empty();
    data.forEach(function (list) {
		if (list.data.backupMethod && list.data.backupMethod.trim() !== "") {
        var $option = $('<option>', {
            text: list.data.backupMethod,
            value: list.data.backupMethod
        });
        $select.append($option);
	}
    });
}
getBackuplist();

// BackupTime Methods
function getBackuptimelist() {
    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=technology",
        async: false,
        dataType: 'json',
        success: function (employeeList) {
		backuptimeSelect(employeeList);
        }
    });
}                
  function backuptimeSelect(data) {
    var $select = $('.backuptimeService, #backuptimeServiceUpdate');
	$select.empty();
    data.forEach(function (list) {
		if (list.data.backupTime && list.data.backupTime.trim() !== "") {
        var $option = $('<option>', {
            text: list.data.backupTime,
            value: list.data.backupTime
        });
        $select.append($option);
	}
    });
}
getBackuptimelist();

// Retention
function getRetentionlist() {
    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=technology",
        async: false,
        dataType: 'json',
        success: function (employeeList) {
		retentionSelect(employeeList);
        }
    });
}                
  function retentionSelect(data) {
    var $select = $('.retentionService, #retentionServiceUpdate');
	$select.empty();
    data.forEach(function (list) {
		if (list.data.retention && list.data.retention.trim() !== "") {
        var $option = $('<option>', {
            text: list.data.retention,
            value: list.data.retention
        });
        $select.append($option);
	}
    });
}
getRetentionlist();

// Database Recovery Strategy
function getRecoverylist() {
    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=technology",
        async: false,
        dataType: 'json',
        success: function (employeeList) {
		recoverySelect(employeeList);
        }
    });
}                
  function recoverySelect(data) {
    var $select = $('.recoveryService, #recoveryServiceUpdate');
	$select.empty();
    data.forEach(function (list) {
		if (list.data.databaseRecoveryStrategy && list.data.databaseRecoveryStrategy.trim() !== "") {
        var $option = $('<option>', {
            text: list.data.databaseRecoveryStrategy,
            value: list.data.databaseRecoveryStrategy
        });
        $select.append($option);
	}
    });
}
getRecoverylist();


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
	var processsave = $("#saveprocessService").val().join(', ');
    var vitalsave = $("#savevitalService").val().join(' , ');
	var mediasave = $("#savemediaService").val().join(' , ');
    var backupsave = $("#savebackupService").val().join(' , ');
    var backuptimesave = $("#savebackuptimeService").val().join(' , ');
    var retentionsave = $("#saveretentionService").val().join(' , ');
    var recoverysave = $("#saverecoveryService").val().join(' , ');
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
</script>


<script>
    $(".daterangepicker-field").daterangepicker({
        forceUpdate: true,
        callback: function (startDate, endDate, period) {
            var title = startDate.format("L") + " – " + endDate.format("L");
            $(this).val(title);
        },
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

        $("#People").click(function () {
            if ($(this).is(":checked")) {
                $("#People-input").removeClass("d-none");
            } else {
                $("#People-input").addClass("d-none");
            }
        });
    });
    $(document).ready(function () {

        $("#Tools").click(function () {
            if ($(this).is(":checked")) {
                $("#Tools-input").removeClass("d-none");
            } else {
                $("#Tools-input").addClass("d-none");
            }
        });
    });
    $(document).ready(function () {

        $("#Procedure").click(function () {
            if ($(this).is(":checked")) {
                $("#Procedure-input").removeClass("d-none");
            } else {
                $("#Procedure-input").addClass("d-none");
            }
        });
    });
    $(document).ready(function () {

        $("#External").click(function () {
            if ($(this).is(":checked")) {
                $("#External-input").removeClass("d-none");
            } else {
                $("#External-input").addClass("d-none");
            }
        });
    });
    $(document).ready(function () {

        $("#Etc").click(function () {
            if ($(this).is(":checked")) {
                $("#Etc-input").removeClass("d-none");
            } else {
                $("#Etc-input").addClass("d-none");
            }
        });
    });
    $(document).ready(function () {

        $("#Financial").click(function () {
            if ($(this).is(":checked")) {
                $("#Financial-input").removeClass("d-none");
                $("#Financial-option").removeClass("d-none");
            } else {
                $("#Financial-input").addClass("d-none");
                $("#Financial-option").addClass("d-none");
            }
        });
    });
    $(document).ready(function () {

        $("#Service").click(function () {
            if ($(this).is(":checked")) {
                $("#Service-input").removeClass("d-none");
                $("#Service-option").removeClass("d-none");
            } else {
                $("#Service-input").addClass("d-none");
                $("#Service-option").removeClass("d-none");
            }
        });
    });
    $(document).ready(function () {

        $("#Reputation").click(function () {
            if ($(this).is(":checked")) {
                $("#Reputation-input").removeClass("d-none");
                $("#Reputation-option").removeClass("d-none");
            } else {
                $("#Reputation-input").addClass("d-none");
                $("#Reputation-option").removeClass("d-none");
            }
        });
    });
    $(document).ready(function () {

        $("#Strategic").click(function () {
            if ($(this).is(":checked")) {
                $("#Strategic-input").removeClass("d-none");
                $("#Strategic-option").removeClass("d-none");
            } else {
                $("#Strategic-input").addClass("d-none");
                $("#Strategic-option").removeClass("d-none");
            }
        });
    });
    $(document).ready(function () {

        $("#Law").click(function () {
            if ($(this).is(":checked")) {
                $("#Law-input").removeClass("d-none");
                $("#Law-option").removeClass("d-none");
            } else {
                $("#Law-input").addClass("d-none");
                $("#Law-option").removeClass("d-none");
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
</script>
</body>