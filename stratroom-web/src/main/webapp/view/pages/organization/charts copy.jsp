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
<link href="${contextroot}/css/icheck-bootstrap.min.css"
	rel="stylesheet" />
<link href="${contextroot}/css/color1.css" rel="stylesheet" />
<link href="${contextroot}/css/startroom/wedgets.css" rel="stylesheet" />
<!-- You can choose a theme from css/styles instead of get all themes -->
<link href="${contextroot}/css/styles/all-themes.css" rel="stylesheet" />
<link href="${contextroot}/css/daterangepicker.min.css" rel="stylesheet">
<link rel="stylesheet" href="${contextroot}/css/datepickerair.css">
<link rel="stylesheet" href="${contextroot}/css/jquery-ui.min.css">
<link rel="stylesheet" href="${contextroot}/css/employee.css"
	rel="stylesheet" />
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
<link rel="stylesheet"
	href="${contextroot}/css/fonts/fontawesome_v_5/all.css">
<link rel="stylesheet" href="${contextroot}/css/nano.min.css" />
<link rel="stylesheet" href="${contextroot}/css/monolith.min.css" />
<link rel="stylesheet" href="${contextroot}/css/classic.min.css" />
<script src="${contextroot}/js/plotly-latest.min.js"></script>
<link href="${contextroot}/css/select2.min.css" rel="stylesheet" />
<link rel="stylesheet" href="${contextroot}/css/chosen.min.css">
<link href="${contextroot}/css/jquery.contextMenu.min.css" rel="stylesheet">
<script>
		function preview_images() {
			var total_file = document.getElementById("images").files.length;
			for (var i = 0; i < total_file; i++) {
				$("#image_preview").append(
					"<div class='col-md-3' style='padding-bottom: 4%' '><img class='img-responsive' src='" +
					URL.createObjectURL(event.target.files[i]) +
					"'></div>"
				);
			}
		}
	</script>

<style>
.kpiformuladescHighlight{
	background-color:#c0baba;
}

.pointer {
	cursor: pointer;
}

.remove-btn {
    background-color: #fff;
    float: right;
}

.textspinprogress {
	width: 50px;
	height: 50px;
	background: none;
	position: relative;
}

.textspinprogress::after {
	content: "";
	width: 100%;
	height: 100%;
	border-radius: 50%;
	border: 6px solid #eee;
	position: absolute;
	top: 0;
	left: 0;
}

.textspinprogress>span {
	width: 50%;
	height: 100%;
	overflow: hidden;
	position: absolute;
	top: 0;
	z-index: 1;
}

.textspinprogress .textspinprogress-left {
	left: 0;
}

.textspinprogress .textspinprogress-bar {
	width: 100%;
	height: 100%;
	background: none;
	border-width: 6px;
	border-style: solid;
	position: absolute;
	top: 0;
}

.textspinprogress .textspinprogress-left .textspinprogress-bar {
	left: 100%;
	border-top-right-radius: 80px;
	border-bottom-right-radius: 80px;
	border-left: 0;
	-webkit-transform-origin: center left;
	transform-origin: center left;
}

.textspinprogress .textspinprogress-right {
	right: 0;
}

.textspinprogress .textspinprogress-right .textspinprogress-bar {
	left: -100%;
	border-top-left-radius: 80px;
	border-bottom-left-radius: 80px;
	border-right: 0;
	-webkit-transform-origin: center right;
	transform-origin: center right;
}

.textspinprogress .textspinprogress-value {
	position: absolute;
	top: 0;
	left: 0;
}

.chosen-search input[type=text] {
	width: 92% !important;
}

#section .container-fluid .collapse_arrow_left .arrow_collapse_size {
	position: fixed;
	background: #fff;
	font-size: 20px !important;
	top: 22%;
	z-index: 999;
	color: #a3a3a3;
	margin-left: -30px;
	padding: 14px 6px 14px 2px;
	border-top: 1px solid #e9ecef;
	border-right: 1px solid #e9ecef;
	border-bottom: 1px solid #e9ecef;
	border-left: 0px solid #e9ecef;
	border-radius: 0px 12px 12px 0px;
	cursor: pointer;
	transition: 0.5s;
}

#section .container-fluid .collapse_arrow_right .arrow_collapse_size {
	position: fixed;
	background: #fff;
	font-size: 20px !important;
	top: 22%;
	z-index: 999;
	color: #a3a3a3;
	margin-left: -30px;
	padding: 14px 6px 14px 2px;
	border-top: 1px solid #e9ecef;
	border-right: 1px solid #e9ecef;
	border-bottom: 1px solid #e9ecef;
	border-left: 0px solid #e9ecef;
	border-radius: 0px 12px 12px 0px;
	cursor: pointer;
	transition: 0.5s;
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

.chart-type {
	padding-top: 12px;
}

.chart-type img {
	width: 100%;
	height: auto;
}

center {
	cursor: pointer;
}

center:hover {
	padding: 8px;
	background: #e4e4e4;
	margin: -6px;
	border-radius: 4px;
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

#result_panel>.panelbody>.list-group>.list-group-item {
	padding: 5px 10px !important;
}

#formula_builder1
      #summary_calculation1 {
	font-size: 11px !important;
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

#formula_builder, #formula_builder1 {
	padding-bottom: 0px;
}

.panel:hover {
	cursor: pointer;
}

#formula-builder .col-md-4 {
	margin-bottom: 0px;
}

#formula-builder1 .col-md-4 {
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

.bg-blue {
	background: linear-gradient(270deg, #10316b 0%, #4574c6 98.08%);
}

.bg-green {
	background: linear-gradient(270deg, #1e6262 0%, #09a2a2 98.08%);
}

.bg-purple {
	background: linear-gradient(90deg, #8b4fcb 0%, #581b98 98.44%);
}

.bg-pink {
	background: linear-gradient(270.12deg, #fd3270 0.05%, #fd5c8d 98.04%);
}

.text-type-card {
	height: 133px;
	box-shadow: 0px 0px 16px rgba(21, 21, 23, 0.14);
	border-radius: 16px !important;
}

.text-type-card .row {
	padding: 12px 18px;
}

.text-type-card .text-type-period {
	font-size: 9px;
	color: #fff;
	font-weight: 600;
	float: right;
	margin-right: -6%;
}

.text-type-card .header-dropdown i {
	font-size: 12px;
	color: #fff;
	text-align: right;
}

.text-type-card .header-dropdown i:hover {
	color: #fff !important;
}

.text-type-card h4 {
	font-size: 18px;
	font-weight: 500;
	color: #fff;
}

.text-type-card strong {
	font-weight: bold;
	font-size: 18px;
	color: #ffffff;
}

.text-type-card .text-type-trend {
	font-weight: 500;
	font-size: 12px;
	color: #ffffff;
}

.text-type-card span img {
	width: 16px;
	margin-top: -1%;
	margin-right: 2%;
}

.text-type-card .card-icon {
	width: 50px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	background-color: #fff;
}

.text-type-card .card-icon i {
	font-size: 24px;
}

.text-type-card .card-chart i {
	font-size: 64px;
	color: #fff;
}

.text-type-card-mini {
	height: 94px;
	box-shadow: 0px 0px 16px rgba(21, 21, 23, 0.14);
	border-radius: 8px !important;
}

.text-type-card-mini .row {
	padding: 10px 12px;
}

.text-type-card-mini .text-type-period {
	font-size: 8px;
	color: #fff;
	font-weight: 600;
	float: right;
}

.text-type-card-mini h4 {
	font-size: 12px;
	font-weight: 500;
	color: #fff;
}

.text-type-card-mini strong {
	font-weight: bold;
	font-size: 12px;
	color: #ffffff;
}

.text-type-card-mini .text-type-trend {
	font-weight: 500;
	font-size: 10px;
	color: #ffffff;
}

.text-type-card-mini span img {
	width: 14px;
	margin-top: -1%;
	margin-right: 2%;
}

.text-type-card-mini .card-icon {
	width: 40px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	background-color: #fff;
}

.text-type-card-mini .card-icon i {
	font-size: 18px;
}

.text-type-card-mini .card-chart img {
	width: 48px;
}

.sub_initiatives .header {
	background: #ffffff !important;
	border-top-left-radius: 16px !important;
	border-top-right-radius: 16px !important;
	color: #565656 !important;
}

.sub_initiatives .card .header .prob {
	text-align: center;
}

.sub_initiatives .card {
	border-radius: 16px !important;
}

.card .header .header-dropdown i {
	color: #565656 !important;
	font-size: 18px;
}

.dashboard-table thead tr th {
	border: 1px solid #1e252d !important;
	padding: 6px 4px 6px 4px;
	font-size: 12px !important;
	color: #ffffff;
	background: #383838;
	font-weight: 600;
}

.sub_initiatives .dashboard-table tbody tr td {
	border: 1px solid #1e252d !important;
	padding: 8px 4px 8px 4px !important;
	font-size: 12px !important;
	color: #4a4a4a;
	text-align: center !important;
}

.sub_initiatives .card .header .prob {
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

.chartPeriodCustom {
	position: initial !important;
}

.ddPeriodCustom {
	position: initial !important;
}

.dtPeriodCustom {
	position: initial !important;
}

#mapdiv {
	width: 100%;
	height: 322px;
}

.apexcharts-menu-item.exportSVG {
	display: none;
}

.btn-custom-secondary {
        background-color: #fff;
        color: #2e2e2e;
        border: 1px solid #e5e5e5;
        font-size: 14px;
        border-radius: 4px !important;
        margin-left: 4px !important;
        box-shadow: none !important;
      }

      .btn-group > .btn.active {
        z-index: 1;
        background-color: #1f262d;
        color: #fff;
        padding: 12px 16px !important;
        border-radius: 28px !important;
      }

      .shareButtonActive {
        color: #008bff;
      }
</style>
</head>


<body class="light">
	<!-- Page Loader -->
	<jsp:include page="../common/top-navigation.jsp"></jsp:include>
	<!-- #Top Bar -->
	<input type="hidden" id="flagapplychart" value="flagapplychart">
	<input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
	<c:if test="${pageId != null}">
		<input id="pagenumber" type="hidden" name="pagenumber"
			value="<c:out value="${pageId}" />">
	</c:if>
	<div>
		<jsp:include page="../common/left-navigation.jsp"></jsp:include>
		<jsp:include page="../common/right-navigation.jsp"></jsp:include>
		<jsp:include page="modal/dashboardTextModal.jsp"></jsp:include>
		<jsp:include page="modal/dashboardChartModal.jsp"></jsp:include>
		<jsp:include page="modal/dashboardTableModal.jsp"></jsp:include>
		<!-- Color Palette -->
		<!-- Share Modal -->
    <div id="share-popup" class="modal fade" role="dialog">
      <div class="modal-dialog modal-lg" style="margin-top: 10%">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <h4>Share</h4>
            <button type="button" class="close pull-right" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12 form-group">
                <label for="Department" data-i18n="Departments">Departments</label>
                <select
                  class="dept-multi-select"
                  name="states[]"
                  multiple="multiple"
                >
                  <option value="971">Human Resource</option>
                  <option value="972">Designer</option>
                  <option value="973">Developer</option>
                  <option value="973">Tester</option>
                  <option value="973">Manager</option>
                  <option value="973">Marketing</option>
                </select>
              </div>

              <div class="col-12 form-group">
                <label for="Department">Users</label>
                <select
                  class="user-multi-select"
                  name="states[]"
                  multiple="multiple"
                >
                  <option value="972">Yasir Patton</option>
                  <option value="973">Zander Bonner</option>
                  <option value="973">Sila Redmond</option>
                  <option value="973">Jayden Ortega</option>
                  <option value="973">Milan Potts</option>
                  <option value="973">Ernest Best</option>
                </select>
              </div>

              <div class="co-md-12">
                <label for="kpi_fields" class="ml-4">Access </label>
                <ul class="d-flex flex-row flex-wrap ml-4 mt-1">
                  <li>
                    <div class="form-check">
                      <div class="form-check">
                        <label class="form-check-label">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                          />
                          View
                          <span class="form-check-sign">
                            <span class="check"></span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="form-check">
                      <div class="form-check">
                        <label class="form-check-label">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                          />
                          Create
                          <span class="form-check-sign">
                            <span class="check"></span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="form-check">
                      <div class="form-check">
                        <label class="form-check-label">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                          />
                          Edit
                          <span class="form-check-sign">
                            <span class="check"></span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="form-check">
                      <div class="form-check">
                        <label class="form-check-label">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                          />
                          Delete
                          <span class="form-check-sign">
                            <span class="check"></span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="form-group col-md-12">
                <hr />
              </div>
              <div class="col-12">
                <div class="form-line right">
                  <button
                    type="button"
                    class="btn-default1 btn"
                    data-dismiss="modal"
                    aria-label="Close"
					data-i18n="Cancel"
                  >
                    Cancel
                  </button>
                  <button class="initative_save_btn" value="Save" data-i18n="Save">Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="color_palette_popup"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel_1"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-lg"
        style="flex-flow: column-reverse; margin-top: 8%"
      >
        <div class="modal-content" style="width: auto">
          <div class="modal-body">
            <div class="displayNone">
              <div class="color-box" id="color-div-box">
                <i class="fas fa-check" id="color-check"></i>
              </div>
            </div>

            <!-- Colors Container -->
            <div class="colors-container">
              <div id="color1"></div>
              <div id="color2"></div>
              <div id="color3"></div>
              <div id="color4"></div>
              <div id="color5"></div>
              <div id="color6"></div>
              <div id="color7"></div>
              <div id="color8"></div>
              <div id="color9"></div>
              <div id="color10"></div>
              <div id="color11"></div>
              <div id="color12"></div>
              <div id="color13"></div>
              <div id="color14"></div>
              <!-- <div id="color15"></div>
              <div id="color16"></div>
              <div id="color17"></div> -->
              <div id="color18"></div>
            </div>
            <input type="hidden" id="colorplatElement">
            <input type="hidden" id="colorplatDiv">
            <div class="row" style="padding-bottom: 6px">
              <div class="col-12">
                <div class="form-line right" style="margin-top: 3%">
                  <button
                    class="initative_save_btn colorsavechanges"
                    data-dismiss="modal"
                    value="Save" data-i18n="Save"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END Setting -->
		<div id="deleteModaldashboard" class="modal fade">
			<div class="modal-dialog modal-confirm">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title" data-i18n="Delete">Delete</h4>
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						<h5 class="confirm-modal-content" data-i18n="Do you really want to delete?">Do you really want to delete?</h5>
						<br>
						<div class="form-line right">
							<input type="hidden" id="deleterecordid" />
							<button type="button" class="btn-default1 btn"
								data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
							<button type="button"
								class="btn btn-danger confirm-modal-deleteBtn"
								onclick="handleeventdelete()" data-i18n="Delete" >Delete</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<aside id="initiative_sidebar" class="initiative_sidebar">
			<div class="sub_initiatives" id="sub_initiatives"
				style="height: 100%;">
				<div class="card" style="height: 100%;">
					<div class="header d-flex flex-row initiate_sidebar"
						style="margin-top: 5%;">
						<h5 class="prob flex-fill" style="text-align: center;">
							<strong style="color: #333; font-size: 16px;"  data-i18n="Settings">Settings</strong>
						</h5>
					</div>
					<div class="d-flex flex-column" id="initiate_sidebar">

						<div
							class="d-flex flex-column sub_initiative_sidebar_details side_border_p"
							style="cursor: auto;">
							<div class="d-flex flex-row p-b-5">
								<div class="d-flex flex-column profile_content"
									style="border-bottom: 1px solid #ececec;">
									<span
										style="font-size: 13px; font-weight: 600; color: #1e252d; margin: 8px 0 6px 0px;"  data-i18n="Widget Type">Widget
										Type</span>
								</div>
							</div>
							<div class="row createcharticon" style="padding-top: 8px;">
								<div class="form-group browser-default col-12">
									<select id="widget_type" name="widget_type"
										class="form-control valid" aria-invalid="false">
										<option value="Chart" data-i18n="Chart">Chart</option>
										<option value="Drilldown" data-i18n="Drilldown Chart">Drilldown Chart</option>
									</select>
								</div>
							</div>

							<div class="row widget Chart createcharticon"
								style="padding: 8px; display: none;">
								<div class="col-3 form-group chart-type">
									<center data-toggle="tooltip" title="Bubble" data-placement="bottom">
										<img ondragstart="dragStart(event)" draggable="true"
											id="BubbleChart"
											src="${contextroot}/images/widgets/Bubble.png"
											alt="Bubble Chart" />
									</center>
								</div>
								<div class="col-3 form-group chart-type">
									<center data-toggle="tooltip" title="Column" data-placement="bottom">
										<img ondragstart="dragStart(event)" draggable="true"
											id="ColumnChart"
											src="${contextroot}/images/widgets/Column.png"
											alt="Column Chart" />
									</center>
								</div>
								<div class="col-3 form-group chart-type">
									<center data-toggle="tooltip" title="Line" data-placement="bottom">
										<img ondragstart="dragStart(event)" draggable="true"
											id="LineChart" src="${contextroot}/images/widgets/Line.png"
											alt="Line Chart" />
									</center>
								</div>
								<div class="col-3 form-group chart-type">
									<center data-toggle="tooltip" title="Area" data-placement="bottom">
										<img ondragstart="dragStart(event)" draggable="true"
											id="AreaChart" src="${contextroot}/images/widgets/Area.png"
											alt="Area Chart" />
									</center>
								</div>
								<div class="col-3 form-group chart-type">
									<center data-toggle="tooltip" title="Pie" data-placement="bottom">
										<img ondragstart="dragStart(event)" draggable="true"
											id="PieChart" src="${contextroot}/images/widgets/Pie.png"
											alt="Pie Chart" />
									</center>
								</div>

								<div class="col-3 form-group chart-type">
									<center data-toggle="tooltip" title="Multi axis" data-placement="bottom">
										<img ondragstart="dragStart(event)" draggable="true"
											id="MultiAxis"
											src="${contextroot}/images/widgets/Multiaxis.png"
											alt="MultiAxis Chart" />
									</center>
								</div>
								<div class="col-3 form-group chart-type">
									<center data-toggle="tooltip" title="Stacked" data-placement="bottom">
										<img ondragstart="dragStart(event)" draggable="true"
											id="StackedChart"
											src="${contextroot}/images/widgets/Stacked.png"
											alt="StackedChart Chart" />
									</center>
								</div>

								<div class="col-3 form-group chart-type">
									<center data-toggle="tooltip" title="Negative Column" data-placement="bottom">
										<img ondragstart="dragStart(event)" draggable="true"
											id="NegativeColumnChart"
											src="${contextroot}/images/widgets/NegativeC.png"
											alt="Negative Column Chart" />
									</center>
								</div>

							</div>

							<div class="row widget Drilldown createcharticon"
								style="padding: 8px; display: none;">
								<div class="col-3 form-group chart-type">
									<center data-toggle="tooltip" title="Bubble" data-placement="bottom">
										<img ondragstart="dragStart(event)" draggable="true"
											id="BubbleChartDD"
											src="${contextroot}/images/widgets/Bubble.png"
											alt="Bubble Chart" />
									</center>
								</div>

								<div class="col-3 form-group chart-type">
									<center data-toggle="tooltip" title="Column" data-placement="bottom">
										<img ondragstart="dragStart(event)" draggable="true"
											id="ColumnChartDD"
											src="${contextroot}/images/widgets/Column.png"
											alt="Column Chart" />
									</center>
								</div>

								<div class="col-3 form-group chart-type">
									<center data-toggle="tooltip" title="Line" data-placement="bottom">
										<img ondragstart="dragStart(event)" draggable="true"
											id="LineChartDD" src="${contextroot}/images/widgets/Line.png"
											alt="Line Chart" />
									</center>
								</div>

								<div class="col-3 form-group chart-type">
									<center data-toggle="tooltip" title="Area" data-placement="bottom">
										<img ondragstart="dragStart(event)" draggable="true"
											id="AreaChartDD" src="${contextroot}/images/widgets/Area.png"
											alt="Area Chart" />
									</center>
								</div>

								<div class="col-3 form-group chart-type">
									<center data-toggle="tooltip" title="Multi axis" data-placement="bottom">
										<img ondragstart="dragStart(event)" draggable="true"
											id="MultiAxisDD"
											src="${contextroot}/images/widgets/Multiaxis.png"
											alt="Multi axis Chart" />
									</center>
								</div>
							</div>

						</div>
					</div>


				</div>
			</div>
		</aside>
	</div>
	<!--#END View -->
	<div id="downloadpdf" style="display: none;">
		<table class="table dashboard-task-infos align-center dashboard-table"
			id="downloadPdfView" style="margin-bottom: 0px !important;">
		</table>
	</div>

	<!-- Chart Period -->
	<div class="modal fade" id="chart_period" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h4>Chart Period</h4>
					<button type="button" class="close pull-right" data-dismiss="modal">
						&times;</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-md-12">
							<div class="container">
								<div
									data-bind="
                    daterangepicker: dateRange,
                    daterangepickerOptions: {
                      standalone: true
                    }
                    "></div>
							</div>
						</div>

						<div class="col-12">
							<hr />
						</div>
						<div class="col-12">
							<div class="form-line right">
								<button type="button" class="btn-default1 btn"
									data-dismiss="modal" aria-label="Close" data-i18n="Cancel">
									Cancel</button>
								<button class="initative_save_btn" value="Save" data-i18n="Save">Save</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- END Chart Period -->

	<!-- Drill Down Table View -->
	<div class="modal fade" id="drilldown_view" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-header">
					<h4>Drill Down Table View</h4>
					<button type="button" class="close pull-right" data-dismiss="modal">
						&times;</button>
				</div>
				<div class="modal-body">
					<table
						class="table dashboard-task-infos align-center dashboard-table"
						id="drilldownTableView" style="margin-bottom: 0px !important;">
					</table>
				</div>
			</div>
		</div>
	</div>
	<!-- END Drill Down Table View  -->

	<!-- Data Table Setting -->
	<div class="modal fade" id="datatable_setting" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h4>Data Table Settings</h4>
					<button type="button" class="close pull-right" data-dismiss="modal">
						&times;</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="form-group col-md-12">
							<label for="">KPI Name</label> <input type="text"
								class="form-control browser-default" id="kpi_formula" readonly
								data-toggle="modal" data-target="#kpi_formula_popup"
								role="button" />
						</div>
						<div class="form-group col-md-12 mt-2">
							<label for="kpi_fields" data-i18n="Data Fields">Data Fields</label>
							<ul class="d-flex flex-row flex-wrap ml-2">
								<li>
									<div class="form-check">
										<div class="form-check">
											<label class="form-check-label"> <input
												class="form-check-input" type="checkbox" value="" />
												Actual <span class="form-check-sign"> <span
													class="check"></span>
											</span>
											</label>
										</div>
									</div>
								</li>
								<li>
									<div class="form-check">
										<div class="form-check">
											<label class="form-check-label"> <input
												class="form-check-input" type="checkbox" value="" />
												Target <span class="form-check-sign" data-i18n="Target"> <span
													class="check"></span>
											</span>
											</label>
										</div>
									</div>
								</li>
								<li>
									<div class="form-check">
										<div class="form-check">
											<label class="form-check-label"> <input
												class="form-check-input" type="checkbox" value="" />
												Gap <span class="form-check-sign"> <span
													class="check"></span>
											</span>
											</label>
										</div>
									</div>
								</li>
								<li>
									<div class="form-check">
										<div class="form-check">
											<label class="form-check-label"> <input
												class="form-check-input" type="checkbox" value="" />
												YTD <span class="form-check-sign"> <span
													class="check"></span>
											</span>
											</label>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<div class="col-12">
							<hr style="border: 1px solid #505050;" />
						</div>
						<div class="col-12">
							<div class="form-line right">
								<button type="button" class="btn-default1 btn"
									data-dismiss="modal" aria-label="Close" data-i18n="Cancel">
									Cancel</button>
								<button class="initative_save_btn" value="Save" data-i18n="Save">Save</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- END Data Table Setting -->

	<!-- Data Table View -->
	<div class="modal fade" id="datatable_view" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-header">
					<h4>Data Table View</h4>
					<button type="button" class="close pull-right" data-dismiss="modal">
						&times;</button>
				</div>
				<div class="modal-body">
					<table
						class="table dashboard-task-infos align-center dashboard-table"
						id="dataTableView" style="margin-bottom: 0px !important;">
					</table>
				</div>
			</div>
		</div>
	</div>
	<a href="#" class="downloadcasfile" style="display:none"></a>
	<!-- END Data Table View  -->
	
	<!-- Column DD Large -->
	<div class="modal fade" id="column-largeDD" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="row">
						<div class="col-6">					
							<div id="ColumnchartDD-1"></div>
						</div>
						<div class="col-6">
							<div class="d-flex flex-column employee_div_body_box activities-box">
								<div class="table-responsive tableheight drilldownTableDD">
								  <table
									class="table dashboard-task-infos align-center dashboard-table"
									id="drilldownTableDD"
									style="margin-bottom: 0px !important;white-space:nowrap;"
								  >
									<tbody>
									</tbody>
								  </table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- END Column DD Large -->

	<!-- Chart View -->
	<div class="modal fade" id="viewchartsettings" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="chartviewsettingsclass" id=""></div>
					<div class="chartviewsettingslarge" id="" style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- Chart View -->

	<!-- Column Large -->
	<div class="modal fade" id="column-large" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
                	<div class="columnchartlargeview" style="display: none !important;">
						<div class="Columnlarge"></div>
						<div id="Columnchart-1"></div>
						<div id="Columnlarge-1" style="display: none;"></div>
					</div>
					<div class="columntablelargeview" style="display: none !important;">
						<div class="table-responsive tableheight ColumnenlargechartdrilldownTable" style="min-height:338px !important;"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- END Column Large -->

	<!-- Area Large -->
	<div class="modal fade" id="area-large" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="areachartlargeview" style="display: none !important;">
						<div class="Arealarge"></div>
						<div id="Areachart-1"></div>
						<div id="Arealarge-1" style="display: none;"></div>
					</div>
					<div class="areatablelargeview" style="display: none !important;">
						<div class="table-responsive tableheight ArealargechartdrilldownTable" style="min-height:338px !important;"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- END Area Large -->

	<!-- Multiaxis Large -->
	<div class="modal fade" id="multiaxis-large" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="multiaxischartlargeview" style="display: none !important;">
						<div class="Multiaxislarge"></div>
						<div id="Multiaxis-1"></div>
						<div id="Multiaxislarge-1" style="display: none;"></div>
					</div>
					<div class="multiaxistablelargeview" style="display: none !important;">
						<div class="table-responsive tableheight MultiaxislargechartdrilldownTable" style="min-height:338px !important;"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- END Multiaxis Large -->

	<!-- Bubble Large -->
	<div class="modal fade" id="bubble-large" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="bubblechartlargeview" style="display: none !important;">
						<div id="Bubblechart-1"></div>
						<div class="Bubblechart"></div>
						<div id="Bubblelarge-1" style="display: none;"></div>
					</div>
					<div class="bubbletablelargeview" style="display: none !important;">
						<div class="table-responsive tableheight BubblelargechartdrilldownTable" style="min-height:338px !important;"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- END Bubble Large -->

	<!-- Line Large -->
	<div class="modal fade" id="line-large" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="linechartlargeview" style="display: none !important;">
						<div class="Linelarge"></div>
						<div id="Linechart-1"></div>
						<div id="Linelarge-1" style="display: none;"></div>
					</div>
					<div class="linetablelargeview" style="display: none !important;">
						<div class="table-responsive tableheight LinelargechartdrilldownTable" style="min-height:338px !important;"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- END Line Large -->

	<!-- Pie Large -->
	<div class="modal fade" id="pie-large" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="piechartlargeview" style="display: none !important;">
						<div class="Pielarge"></div>
						<div id="Piechart-1"></div>
						<div id="Pielarge-1" style="display: none;"></div>
					</div>
					<div class="pietablelargeview" style="display: none !important;">
						<div class="table-responsive tableheight PielargechartdrilldownTable" style="min-height:338px !important;"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- END Pie Large -->

	<!-- test Large -->
	<div class="modal fade" id="test-large" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="largechart"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- END teste Large -->
	
	<!-- Waterfall Large -->
	<div class="modal fade" id="waterfall-large" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="Waterfalllarge"></div>
					<div id="Waterfallchart-1"></div>
					<div id="Waterfalllarge-1" style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- END Waterfall Large -->

	<!-- Stacked Large -->
	<div class="modal fade" id="stacked-large" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="stackedchartlargeview" style="display: none !important;">
						<div class="Stackedlarge"></div>
						<div id="Stackedchart-1"></div>
						<div id="Stackedlarge-1" style="display: none;"></div>
					</div>
					<div class="stackedtablelargeview" style="display: none !important;">
						<div class="table-responsive tableheight StackedlargechartdrilldownTable" style="min-height:338px !important;"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- END Stacked Large -->

	<!-- Radial Large -->
	<div class="modal fade" id="radial-large" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="RadialMultilarge"></div>
					<div id="RadialMultichart-1"></div>
					<div id="RadialMultilarge-1" style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- END Column Large -->

	<!-- Heatmap Large -->
	<div class="modal fade" id="heatmap-large" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="Heatmaplarge"></div>
					<div id="Heatmap-1"></div>
					<div id="Heatmaplarge-1" style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- END Heatmap Large -->
	
	<!-- Heatmap Large -->
	<div class="modal fade" id="negative-large" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="negativechartlargeview" style="display: none !important;">
						<div class="NegativeColumnlarge"></div>
						<div id="NegativeColumnchart-1"></div>
						<div id="NegativeColumnlarge-1" style="display: none;"></div>
					</div>
					<div class="negativetablelargeview" style="display: none !important;">
						<div class="table-responsive tableheight NegativelargechartdrilldownTable" style="min-height:338px !important;"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- END Heatmap Large -->

	<!-- Heatmap Large -->
	<div class="modal fade" id="map-large" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div style="height: 400px;" id="Maplarge"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- END Heatmap Large -->

	<!-- KPI Calculator -->
	<div class="modal fade" id="kpi_formula_popup" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true"
		modal-backdrop="false" data-backdrop="false">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h6 class="modal-title" id="myLargeModalLabel">KPI Calculator</h6>
					<button type="button" class="close" data-dismiss="modal"
						id="closePopupId" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body" style="padding: 0 25px;">
					<div class="col-md-8" style="padding: 0;">
						Field Name: &nbsp; <select class="form-control browser-default"
							id="fieldId">
							<option value="Actual" data-i18n="Actual">Actual</option>
							<option value="Target" data-i18n="Target">Target</option>
							<option value="Budget" data-i18n="Budget">Budget</option>
							<option value="Forecast" data-i18n="Forecast">Forecast</option>
							<option value="Gap" data-i18n='Gap'>Gap</option>
						</select>
					</div>
					<div class="card">
						<ul class="nav nav-tabs" role="tablist"
							style="padding-bottom: 10px;">
							<li class="nav-item m-l-10"
								style="top: -4px; background: transparent;"><a
								class="nav-link active" data-toggle="tab"
								style="max-width: 170px;" href="#formula_builder">Formula
									Builder</a></li>
							<li class="nav-item m-l-10"
								style="top: -4px; background: transparent;"><a
								class="nav-link" data-toggle="tab" style="max-width: 170px;"
								href="#summary_calculation">Summary Calculation</a></li>
						</ul>
						<div class="tab-content" style="padding: 0;">
							<div class="tab-pane body active" id="formula_builder">
								<div class="row col-md-12">
									<textarea class="browser-default" name="formula" id="formula"
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
									<!--<button type="button" class="opr btn btn-secondary" onclick="updateFormula('[')">[</button>
                        <button type="button" class="opr btn btn-secondary" onclick="updateFormula(']')">]</button>-->
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
										onclick="updateFormula('<')"><</button>
									<button type="button" class="opr btn btn-secondary"
										onclick="updateFormula('>=')">>=</button>
									<button type="button" class="opr btn btn-secondary"
										onclick="updateFormula('<=')"><=</button>
								</div>

								<div class="row">
									<div class="col-md-4">
										<div class="panel panel-primary" id="result_panel">
											<div class="panel-heading">
												<h6 class="panel-title">Fields and measures:</h6>
											</div>
											<div class="panel-body" data-spy="scroll">
												<input type="text" class="form-control browser-default"
													onkeyup="fieldmeasurefilter()" id="fieldmeasurefilter"
													autocomplete="off" placeholder="Search">
												<button type="button" class="searchformulaicon1"><i class="fa fa-search"></i></button>	
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
													<li class="list-group-item" onclick="updateFormula('if','if')">if</li>
													<li class="list-group-item" onclick="updateFormula('avg','avg')">avg</li>
													<li class="list-group-item" onclick="updateFormula('agg','agg')">agg</li>
													<li class="list-group-item" onclick="updateFormula('count','count')">count</li>
													<li class="list-group-item" onclick="updateFormula('sum','sum')">sum</li>
													<li class="list-group-item" onclick="updateFormula('min','min')">min</li>
													<li class="list-group-item" onclick="updateFormula('max','max')">max</li>
													<!-- <li class="list-group-item" onclick="updateFormula('median','median')">median</li> -->
												</ul>
											</div>
										</div>
									</div>
									<div class="col-md-4">
										<div class="panel panel-primary chartformuladynamicdesc" id="result_panel1">
											<div class="panel-heading">
												<h6 class="panel-title">Function Description:</h6>
											</div>
											<div class="panel-body">
												<h6 class="formulaheaderdesc"></h6>
                                                <p class="formulacontentdesc"></p>
											</div>
											<!-- <input type="checkbox" name="check" /> <span style="font-size:11px !important;">Show argumnets in formula</span> -->
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-4" style="margin-bottom: 0px;">
										<input type="hidden" id="kpiformulaHandletype">
										<button name="validate" id="validate"
											class="btn btn-secondary" onclick="handleFormulaValidate()">Validate</button>
										<button name="add" id="add" class="btn btn-secondary"
											onclick="handleFormulaAdd()">Add</button>
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

	<!-- chart KPI Calculator -->
	<div class="modal fade" id="chart_formula_popup" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true"
		modal-backdrop="false" data-backdrop="false">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h6 class="modal-title" id="myLargeModalLabel">KPI Calculator</h6>
					<button type="button" class="close" data-dismiss="modal"
						id="chartclosePopupId" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body" style="padding: 0 25px;">
					<!--<div class="col-md-8" style="padding: 0;">
						Field Name: &nbsp; <select class="form-control browser-default"
							id="chartfieldId">
							<option value="Actual">Actual</option>
							<option value="Target">Target</option>
							<option value="Budget">Budget</option>
							<option value="Forecast">Forecast</option>
							<option value="Gap">Gap</option>
						</select>
					</div>-->
					<div class="card">
						<ul class="nav nav-tabs" role="tablist"
							style="padding-bottom: 10px;">
							<li class="nav-item m-l-10"
								style="top: -4px; background: transparent;"><a
								class="nav-link active" data-toggle="tab"
								style="max-width: 170px;" href="#formula_builder1">Formula
									Builder</a></li>
							<li class="nav-item m-l-10"
								style="top: -4px; background: transparent;"><a
								class="nav-link" data-toggle="tab" style="max-width: 170px;"
								href="#summary_calculation1">Summary Calculation</a></li>
						</ul>
						<div class="tab-content" style="padding: 0;">
							<div class="tab-pane body active" id="formula_builder1">
								<div class="row col-md-12">
									<textarea class="browser-default" name="chartsettingformula"
										id="chartsettingformula" placeholder="" cols="" rows="1"
										autocomplete="off" style="font-size: 11px !important;"></textarea>
									<!-- <textarea name="formula" id="formula"></textarea> -->
								</div>
								<div class="row col-md-12">
									<button type="button" class="opr btn btn-secondary"
										onclick="updatechartFormula('+')">+</button>
									<button type="button" class="opr btn btn-secondary"
										onclick="updatechartFormula('-')">-</button>
									<button type="button" class="opr btn btn-secondary"
										onclick="updatechartFormula('*')">*</button>
									<button type="button" class="opr btn btn-secondary"
										onclick="updatechartFormula('/')">/</button>
									<button type="button" class="opr btn btn-secondary"
										onclick="updatechartFormula('%')">%</button>
									<button type="button" class="opr btn btn-secondary"
										onclick="updatechartFormula('(')">(</button>
									<button type="button" class="opr btn btn-secondary"
										onclick="updatechartFormula(')')">)</button>
									<button type="button" class="opr btn btn-secondary" onclick="updatechartFormula('[')">[</button>
                        <button type="button" class="opr btn btn-secondary" onclick="updatechartFormula(']')">]</button>
									<button type="button" class="opr btn btn-secondary"
										onclick="updatechartFormula(':')">:</button>
									<button type="button" class="opr btn btn-secondary"
										onclick="updatechartFormula('AND')">AND</button>
									<button type="button" class="opr btn btn-secondary"
										onclick="updatechartFormula('OR')">OR</button>
									<button type="button" class="opr btn btn-secondary"
										onclick="updatechartFormula('NOT')">NOT</button>
									<button type="button" class="opr btn btn-secondary"
										onclick="updatechartFormula('IN')">IN</button>
									<button type="button" class="opr btn btn-secondary"
										onclick="updatechartFormula('==')">==</button>
									<button type="button" class="opr btn btn-secondary"
										onclick="updatechartFormula('!=')">!=</button>
									<button type="button" class="opr btn btn-secondary"
										onclick="updatechartFormula('>')">></button>
									<button type="button" class="opr btn btn-secondary"
										onclick="updatechartFormula('<')"><</button>
									<button type="button" class="opr btn btn-secondary"
										onclick="updatechartFormula('>=')">>=</button>
									<button type="button" class="opr btn btn-secondary"
										onclick="updatechartFormula('<=')"><=</button>
								</div>

								<div class="row">
									<div class="col-md-4">
										<div class="panel panel-primary" id="result_panel">
											<div class="panel-heading">
												<h6 class="panel-title">Fields and measures:</h6>
											</div>
											<div class="panel-body" data-spy="scroll">
												<input type="text" class="form-control browser-default"
													onkeyup="fieldchartmeasurefilter()"
													id="fieldchartmeasurefilter" autocomplete="off" placeholder="Search">
													<button type="button" class="searchformulaicon1"><i class="fa fa-search"></i></button>
												<ul class="list-group" id="chartmeasureNames">
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
														onclick="updatechartFormula('if','if')">if</li>
													<li class="list-group-item"
														onclick="updatechartFormula('avg','avg')">avg</li>
													<li class="list-group-item"
														onclick="updatechartFormula('agg','agg')">agg</li>
													<li class="list-group-item"
														onclick="updatechartFormula('count','count')">count</li>
													<li class="list-group-item"
														onclick="updatechartFormula('sum','sum')">sum</li>
													<li class="list-group-item"
														onclick="updatechartFormula('min','min')">min</li>
													<li class="list-group-item"
														onclick="updatechartFormula('max','max')">max</li>
													<!--<li class="list-group-item"
														onclick="updatechartFormula('median','median')">median</li>-->
												</ul>
											</div>
										</div>
									</div>
									<div class="col-md-4">
										<div class="panel panel-primary chartformuladynamicdesc" id="result_panel1">
											<div class="panel-heading">
												<h6 class="panel-title">Function Description:</h6>
											</div>
											<div class="panel-body">
												<h6 class="formulaheaderdesc"></h6>
                                                <p class="formulacontentdesc"></p>
											</div>
											<!-- <input type="checkbox" name="check" /> <span style="font-size:11px !important;">Show argumnets in formula</span> -->
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-4" style="margin-bottom: 0px;">
										<input type="hidden" id="chartormulaHandletype">
										<button name="validate" id="validate"
											class="btn btn-secondary"
											onclick="handleChartFormulaValidate()">Validate</button>
										<button name="add" id="add" class="btn btn-secondary"
											onclick="handleChartFormulaAdd()">Add</button>
									</div>
								</div>
							</div>
							<div class="tab-pane body" id="summary_calculation1">
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
	<!-- END CHART KPI Calculator -->

	<section class="content" id="section">
		<div class="page-header row no-gutters py-2 m-t-70">
			<div
				class="col-lg-6 col-md-6 text-center text-sm-left pt-2 mb-0 ml-4">
				<h5 class="page-title"
					style="font-weight: 600; text-transform: uppercase;" data-i18n="Charts">Charts</h5>
			</div>
		</div>
		<!-- <div class="row">
        <div class="col-md-10"></div>
        <div class="col-md-2 mt-2">
          <button
            class="btn btn-custom-secondary pull-right"
            style="margin-left: 4px"
            data-toggle="modal"
            data-target="#delete_popup"
          >
            <i
              class="fas fa-trash"
              style="font-size: 14px"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Delete"
            ></i>
          </button>
          <button
            class="btn btn-custom-secondary pull-right"
            style="margin-left: 4px"
          >
            <i
              class="fas fa-expand"
              style="font-size: 14px"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Full Screen"
            ></i>
          </button>

          <button
            class="btn btn-custom-secondary pull-right"
            id="share_btn"
            data-toggle="modal"
            data-target="#share-popup"
            style="margin-left: 4px"
          >
            <i
              class="fas fa-share-alt"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Share"
            ></i>
          </button>
        </div>
      </div> -->
		<!-- End Page Header -->
		<div class="container-fluid" style="height: 600px;"
			ondrop="drop(event)" ondragover="allowDrop(event)">
			<!-- COl -->
			<div class="collapse_arrow_right" style="display: none;">
				<i class="arrow_collapse_size fas fa-caret-right"></i>
			</div>
			<div class="collapse_arrow_left">
				<i class="arrow_collapse_size fas fa-caret-left"></i>
			</div>

			<div class="row row-padding m-0" id="drill-chart-body"></div>
			<div class="row row-padding m-0" id="chart-body"></div>
		</div>
		<!-- <div class="container-fluid customTabContent NewTab"></div>
		<div class="container-fluid">
        <div
          class="row"
          style="
            position: fixed;
            bottom: 0px;
            width: 100%;
            background: #fff;
            margin-left: -39px;
            padding-top: 4px;
            padding-bottom: 4px;
            box-shadow: 1px -2px 9px 0px rgb(0 0 0 / 9%);
          "
        >
          <div class="col-md-12" style="width: 100%; margin-left: -8px">
            <button
              class="btn btn-custom-secondary"
              id="tabAddBtn"
              style="margin-right: 2px"
            >
              <i
                class="fas fa-plus"
                data-toggle="tooltip"
                data-placement="top"
                title="Add"
              ></i>
            </button>
            <div
              id="custom-tab"
              class="btn-group custom-tab-control"
              role="group"
              aria-label="Custom Tab"
            >
              <button
                type="button"
                class="btn btn-custom-secondary active"
                data-value="Overall"
                style="
                  border: none;
                  padding: 12px 16px;
                  border-radius: 28px !important;
                "
              >
                Overall Performance Report
              </button>
            </div>
          </div> -->
	</section>

	<!-- Plugins Js -->

	<script src="${contextroot}/js/app.min.js"></script>
	<script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
	<script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
	<!-- Custom Js -->
	<script src="${contextroot}/js/admin.js"></script>
	<script src="${contextroot}/js/bundles/amcharts4/core.js"></script>
	<script src="${contextroot}/js/bundles/amcharts4/maps.js"></script>
	<script src="${contextroot}/js/bundles/amcharts4/worldLow.js"></script>
	<script src="${contextroot}/js/bundles/amcharts4/usaLow.js"></script>
	<script src="${contextroot}/js/bundles/amcharts4/animated.js"></script>
	<script src="${contextroot}/js/bundles/amcharts4/charts.js"></script>

	<!-- Knob Js -->
	<script type="text/javascript"
		src="${contextroot}/js/knockout-3.5.0.js"></script>
	<script type="text/javascript"
		src="${contextroot}/js/daterangepicker.min.js"></script>

	<script src="${contextroot}/js/jquery-ui.min.js"></script>
	<script src="${contextroot}/js/moment.js"></script>
	<script src="${contextroot}/js/paging.js"></script>
	<!--<script src="js/pages/spiritedaway.js"></script>-->
	<script src="${contextroot}/js/html2pdf.bundle.min.js"></script>
	<script src="${contextroot}/js/jquery.editable.min.js"></script>
	<script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
	<script src="${contextroot}/js/pickr.es5.min.js"></script>
	<script src="${contextroot}/js/datepickerair.js"></script>
	<script src="${contextroot}/js/datepicker.en.js"></script>
	<script src="${contextroot}/js/select2.min.js"></script>
	<script src="${contextroot}/js/widgets.js"></script>
	<script src="${contextroot}/js/pages/widgets/chart-widget.js"></script>
	<script src="${contextroot}/js/colors.js"></script>
	<script src="${contextroot}/js/shards.min.js"></script>
	<script src="${contextroot}/js/jquery.sharrre.min.js"></script>
	<script src="${contextroot}/js/chosen.jquery.min.js"></script>
	<script src="${contextroot}/js/chartsmodule.js"></script>
	<script src="${contextroot}/js/datepickerair.js"></script>
	<script src="${contextroot}/js/d3.v5.js"></script>
	<script src="${contextroot}/js/apexcharts.js"></script>
	<script src="${contextroot}/js/initial.js"></script>
	<script src="${contextroot}/js/notify.js"></script>
	<script>
     $(document).ready(function () {
        $("#card_type_select").change(function () {
          var value = $("#card_type_select").val();
          if (value == "Chart") {
            $("#icon_select").prop("disabled", true);
          } else {
            $("#icon_select").prop("disabled", false);
          }
        });
      });

      
      $('#chart_setting,#text_setting,#kpi_formula_popup,#color_palette_popup').modal({
		show : false,
		backdrop : 'static',
		keyboard : false
	});
	$('.modal-dialog').draggable({
            handle: ".modal-header"
        });
	
	var count = 10;

	for (i = 1; i <= count; i++) {

	    $('#color1').append($('#color-div-box').clone().addClass( "brown_v1_" + i + "0" ));
	    $( "#color-div-box" );

	}

	for (i = 1; i <= count; i++) {

	    $('#color2').append($('#color-div-box').clone().addClass( "brown_v2_" + i + "0" ));
	    $( "#color-div-box" );

	}

	for (i = 1; i <= count; i++) {

	    $('#color3').append($('#color-div-box').clone().addClass( "purple_v1_" + i + "0" ));
	    $( "#color-div-box" );

	}

	for (i = 1; i <= count; i++) {

	    $('#color4').append($('#color-div-box').clone().addClass( "purple_v2_" + i + "0" ));
	    $( "#color-div-box" );

	}

	for (i = 1; i <= count; i++) {

	    $('#color5').append($('#color-div-box').clone().addClass( "blue_v1_" + i + "0" ));
	    $( "#color-div-box" );

	}

	for (i = 1; i <= count; i++) {

	    $('#color6').append($('#color-div-box').clone().addClass( "blue_v2_" + i + "0" ));
	    $( "#color-div-box" );

	}

	for (i = 1; i <= count; i++) {

	    $('#color7').append($('#color-div-box').clone().addClass( "green_v1_" + i + "0" ));
	    $( "#color-div-box" );

	}

	for (i = 1; i <= count; i++) {

	    $('#color8').append($('#color-div-box').clone().addClass( "green_v2_" + i + "0" ));
	    $( "#color-div-box" );

	}

	for (i = 1; i <= count; i++) {

	    $('#color9').append($('#color-div-box').clone().addClass( "green_v3_" + i + "0" ));
	    $( "#color-div-box" );

	}

	for (i = 1; i <= count; i++) {

	    $('#color10').append($('#color-div-box').clone().addClass( "green_v4_" + i + "0" ));
	    $( "#color-div-box" );

	}

	for (i = 1; i <= count; i++) {

	    $('#color11').append($('#color-div-box').clone().addClass( "yellow_v1_" + i + "0" ));
	    $( "#color-div-box" );

	}

	for (i = 1; i <= count; i++) {

	    $('#color12').append($('#color-div-box').clone().addClass( "yellow_v2_" + i + "0" ));
	    $( "#color-div-box" );

	}

	for (i = 1; i <= count; i++) {

	    $('#color13').append($('#color-div-box').clone().addClass( "orange_v1_" + i + "0" ));
	    $( "#color-div-box" );

	}

	for (i = 1; i <= count; i++) {

	    $('#color14').append($('#color-div-box').clone().addClass( "orange_v2_" + i + "0" ));
	    $( "#color-div-box" );

	}

	for (i = 1; i <= count; i++) {

	    $('#color15').append($('#color-div-box').clone().addClass( "gray_v1_" + i + "0" ));
	    $( "#color-div-box" );

	}

	for (i = 1; i <= count; i++) {

	    $('#color16').append($('#color-div-box').clone().addClass( "gray_v2_" + i + "0" ));
	    $( "#color-div-box" );

	}

	for (i = 1; i <= count; i++) {

	    $('#color17').append($('#color-div-box').clone().addClass( "gray_v3_" + i + "0" ));
	    $( "#color-div-box" );

	}

	for (i = 1; i <= count; i++) {

	    $('#color18').append($('#color-div-box').clone().addClass( "gray_v4_" + i + "0" ));
	    $( "#color-div-box" );

	}
	
	var x = 0;
    $("#tabAddBtn").click(function (e) {
      //on add input button click
      if (x < 5) {
        //max input box allowed
        x++; //text box increment
        $("#custom-tab").append(
          `<button
            type="button"
            class="btn btn-custom-secondary"
            data-value="NewTab"
            style="border: none; padding: 12px 24px; border-radius: 28px !important;"
          >Tab Name</button>`
        ); //add input box
        if (x == 4) {
          $(this).hide();
        }
      }
    });
    
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
        $(".active").attr("contenteditable", "true");
      });

      $("#share_btn").click(function () {
        $("#share_btn i").toggleClass("shareButtonActive");
      });
      
      $(".dept-multi-select").select2();
      $(".user-multi-select").select2();
      
      $('[data-toggle="tooltip"]').attr("data-placement","bottom");
	   	$('[data-toggle="tooltip"]').tooltip({ 
	         delay: { "show": 0, "hide": 0 } 
	 		});
    </script>
</body>
