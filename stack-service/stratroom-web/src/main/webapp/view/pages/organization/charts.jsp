<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta content="width=device-width, initial-scale=1" name="viewport" />
<title>StratRoom</title>

  <link href="/stratroom/assets/css/bootstrap.min.css" rel="stylesheet">
<link href="/stratroom/assets/css/basic.css?v0.004" rel="stylesheet">
<link href="/stratroom/assets/css/main.css?v0.004" rel="stylesheet">
<link href="/stratroom/assets/css/responsive.css" rel="stylesheet">


     <!-- Font Awsome Icons -->
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

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
	 .custom-card>.card-header .card-actions .btn.btn-sm {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .overflow-auto.gantt-chart .gantt-container {
            overflow: inherit;
        }

        .text-card .top_datepicker {
            padding: 0;
            border: 0;
            background: transparent;
            height: auto;
            font-size: 10px;
            font-weight: 500;
            min-height: inherit;
            text-align: right;
        }
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
		  <header id="header" class="header shadow-sm">
	  
		<jsp:include page="../common/left-navigation.jsp"></jsp:include>
    </header>
	<!-- #Top Bar -->
	<input type="hidden" id="flagapplychart" value="flagapplychart">
	<input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
	<c:if test="${pageId != null}">
		<input id="pagenumber" type="hidden" name="pagenumber"
			value="<c:out value="${pageId}" />">
	</c:if>
	<div>
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
   
    <!-- END Setting -->

 <div class="modal custom-modal custom-delete-modal fade" id="deleteModaldashboard" data-bs-backdrop="static"
        data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" style="--stratroom-modal-width:320px">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="card custom-card delete-card border-0">
                        <div class="card-body">
<input type="hidden" id="deleterecordid" />
                            <div class="delete-box">
                                <h4 class="title">Do you really want to delete?</h4>
                                <div class="btn-wrap">
                                    <button type="button" class="btn btn-sm btn-label-secondary rounded-pill"
                                        data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                    <button class="btn btn-sm btn-danger rounded-pill" onclick="handleeventdelete()">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

	
   <div style="--stratroom-offcanvas-width: 260px;"
    class="offcanvas offcanvas-toggle offcanvas-start offcanvasSettings border-0 shadow-lg" data-bs-scroll="true"
    data-bs-backdrop="false" tabindex="-1" id="offcanvasSettings" aria-labelledby="offcanvasSettingsLabel">
    <div class="offcanvas-toggle-menu shadow toggle-right">
        <button id="toggleButton" class="btn p-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSettings"
            aria-controls="offcanvasSettings">
            <i class="fas fa-caret-right"></i>
        </button>
        <button class="btn p-0" data-bs-dismiss="offcanvas" aria-label="Close">
            <i class="fas fa-caret-left"></i>
        </button>
    </div>

    <div class="offcanvas-header border-bottom">
        <h5 class="offcanvas-title" id="offcanvasSettingsLabel">Settings</h5>
        <!-- <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button> -->
    </div>
    <div class="offcanvas-tab d-flex justify-content-between align-items-center gap-2 border-bottom px-3 pt-2 bg-light">
        <!-- <h5 class="title text-start mb-1">Widget Type</h4> -->

            <ul class="nav nav-underline" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link pt-0 pb-1 active" id="WidgetTypeOne-tab" data-bs-toggle="tab"
                        data-bs-target="#WidgetTypeOne-tab-pane" type="button" role="tab"
                        aria-controls="WidgetTypeOne-tab-pane" aria-selected="true">Drilldown Charts</button>
                </li>
            </ul>
    </div>
    <div class="offcanvas-body">
        <div class="widget-wrap">
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="WidgetTypeOne-tab-pane" role="tabpanel"
                    aria-labelledby="WidgetTypeOne-tab" tabindex="0">

                    <div class="browser-default text-start mb-3">
                        <!-- <label for="widget_type" class="form-label">Widget Type 1</label> -->
                        <select id="widget_type_01" name="initiative_owner" class="form-select form-select-sm"
                            aria-invalid="false">
                           <option value="chart-type-2">Chart</option>
                        <option value="drilldown-type-2">Drilldown Chart</option>
						<option value="chartComment-type-2">Chart With Comment</option>
                        </select>
                    </div>
            <!-- widget chart start -->
                    <div class="widget widget-2 chart-type-2">
                        <div class="grid g-2 chart-w-card">

                            <!-- <span class="icon" data-bs-toggle="tooltip" data-bs-title="Bubble">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="BubbleChart" src="images/widgets/bubble-chart-i.svg"
                                    alt="Bubble Chart" />
                            </span> -->

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Column">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="ColumnChart" src="images/widgets/column-chart-i.svg"
                                    alt="Column Chart" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Line">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="LineChart" src="images/widgets/line-chart-i.svg"
                                    alt="Line Chart" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Area">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="AreaChart" src="images/widgets/area-chart-i.svg"
                                    alt="Area Chart" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Pie">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="PieChart" src="images/widgets/pie-chart-i.svg" alt="Pie Chart" />
                            </span>

                            <!-- <span class="icon" data-bs-toggle="tooltip" data-bs-title="Waterfall">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="waterfall-chart-type-02" src="images/widgets/waterfall-chart-i.svg"
                                    alt="Waterfall Chart" />
                            </span> -->

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Multi axis">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="MultiAxis" src="images/widgets/multi-axis-chart-i.svg"
                                    alt="Multi axis Chart" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Stacked">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="StackedChart" src="images/widgets/stcked-chart-i.svg"
                                    alt="Stacked Chart" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Negative Column">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="NegativeColumnChart" src="images/widgets/NegativeC.png"
                                    alt="Negative Column" />
                            </span>

                            <!-- <span class="icon" data-bs-toggle="tooltip" data-bs-title="Radial Chart">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="NegativeColumnChart" src="images/widgets/radial-chart-i.svg"
                                    alt="Radial Chart" />
                            </span> -->
							

                        </div>
                    </div>
                    <!-- widget chart end -->
                    <!-- widget drilldown start -->
                    <div class="widget widget-2 drilldown-type-2" style="display: none;">
                        <div class="grid g-2 chart-w-card">

                            <!-- <span class="icon" data-bs-toggle="tooltip" data-bs-title="Bubble">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="BubbleChartDD" src="images/widgets/bubble-chart-i.svg"
                                    alt="Bubble Chart" />
                            </span> -->

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Column">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="ColumnChartDD" src="images/widgets/column-chart-i.svg"
                                    alt="Column Chart" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Line">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="LineChartDD" src="images/widgets/line-chart-i.svg"
                                    alt="Line Chart" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Area">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="AreaChartDD" src="images/widgets/area-chart-i.svg"
                                    alt="Area Chart" />
                            </span>
                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Multi axis">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="MultiAxisDD" src="images/widgets/multi-axis-chart-i.svg"
                                    alt="Multi axis Chart" />
                            </span>
                        </div>
                    </div>
                    <!-- widget drilldown end -->
					 <!-- widget comment start -->
                    <div class="widget widget-2 chartComment-type-2" style="display: none;">
                        <div class="grid g-2 chart-w-card">
						
						  <!-- <span class="icon" data-bs-toggle="tooltip" data-bs-title="Bubble">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="BubbleChartComment" src="images/widgets/bubble-chart-i.svg"
                                    alt="Bubble Chart Comment" />
                          </span> -->

                          <span class="icon" data-bs-toggle="tooltip" data-bs-title="Column">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="ColumnChartComment" src="images/widgets/column-chart-i.svg"
                                    alt="Column Chart Comment" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Line">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="LineChartComment" src="images/widgets/line-chart-i.svg"
                                    alt="Line Chart Comment" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Area">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="AreaChartComment" src="images/widgets/area-chart-i.svg"
                                    alt="Area Chart Comment" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Pie">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="PieChartComment" src="images/widgets/pie-chart-i.svg" alt="Pie Chart Comment" />
                            </span>

                            <!-- <span class="icon" data-bs-toggle="tooltip" data-bs-title="Waterfall">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="waterfall-chart-type-02" src="images/widgets/waterfall-chart-i.svg"
                                    alt="Waterfall Chart" />
                            </span> -->

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Multi axis">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="MultiAxisComment" src="images/widgets/multi-axis-chart-i.svg"
                                    alt="Multi axis Chart Comment" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Stacked">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="StackedChartComment" src="images/widgets/stcked-chart-i.svg"
                                    alt="Stacked Chart Comment" />
                            </span>

                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Negative Column">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="negativeColumnChartComment" src="images/widgets/NegativeC.png"
                                    alt="Negative Column" />
                            </span>

                            <!-- <span class="icon" data-bs-toggle="tooltip" data-bs-title="Radial Chart">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="radialColumnChartComment" src="images/widgets/radial-chart-i.svg"
                                    alt="Radial Chart Comment" />
                            </span> -->
                        </div>
                    </div>
                    <!-- widget comment end -->
                </div>
            </div>
        </div>
    </div>
</div>
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
<div class="modal fade" id="ColumnChartComment" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
                	<div class="columnchartlargeview" style="display: none !important;">
						<div class="ColumnChartComment"></div>
						<div id="ColumnChartComment-1"></div>
						<div id="ColumnChartComment-1" style="display: none;"></div>
					</div>
					<div class="columntablelargeview" style="display: none !important;">
						<div class="table-responsive tableheight ColumnenlargechartdrilldownTable" style="min-height:338px !important;"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
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
<div class="modal custom-modal fade" id="chart_formula_popup" data-bs-backdrop="static" role="dialog" data-bs-keyboard="false"
    tabindex="-1" aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-lg-down">
        <div class="modal-content">

           
            <div class="modal-header">
                <h5 class="modal-title">KPI Calculator</h5>
               	<button type="button" style="margin-left: 650px !important;
    border: none;background-color: white;font-size: 18px;" class="close" data-dismiss="modal"
						id="chartclosePopupId" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
            </div>

            <div class="modal-body">

              
                <div class="p-2 mb-3">
                    <label class="form-label"><small>Field Name</small></label>
                    <select class="form-select form-select-sm select-dropdown-kpi-calculator"
                        id="chartfieldId">
                        <option value disabled selected hidden>Select Field Name</option>
                        <option value="Actual">Actual</option>
                        <option value="Target">Target</option>
                        <option value="Budget">Budget</option>
                        <option value="Forecast">Forecast</option>
                        <option value="Gap">Gap</option>
                    </select>
                </div>

               
                <div class="card border-0">
                    <div class="card-header bg-transparent border-0">
                        <ul class="nav nav-underline gap-3" role="tablist">
                            <li class="nav-item">
                                <button class="nav-link text-uppercase active"
                                    data-bs-toggle="tab"
                                    data-bs-target="#formula_builder1"
                                    type="button">Formula Builder</button>
                            </li>
                            <li class="nav-item">
                                <button class="nav-link text-uppercase"
                                    data-bs-toggle="tab"
                                    data-bs-target="#summary_calculation1"
                                    type="button">Summary Calculation</button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="card-body">
                    <div class="tab-content">

                        
                        <div class="tab-pane fade show active" id="formula_builder1">

                           
                            <textarea class="form-control mb-3" id="chartsettingformula"
                                name="chartsettingformula" rows="2"
                                style="font-size:11px !important;"></textarea>

                            <!-- KEYPAD -->
                            <div class="d-flex flex-wrap gap-2 mb-3">
                                <!-- All buttons unchanged -->
                                <button type="button" class="opr btn btn-sm btn-secondary"
                                    onclick="updatechartFormula('+')">+</button>
                                <button type="button" class="opr btn btn-sm btn-secondary"
                                    onclick="updatechartFormula('-')">-</button>
                                <button type="button" class="opr btn btn-sm btn-secondary"
                                    onclick="updatechartFormula('*')">*</button>
                                <button type="button" class="opr btn btn-sm btn-secondary"
                                    onclick="updatechartFormula('/')">/</button>
                                <button type="button" class="opr btn btn-sm btn-secondary"
                                    onclick="updatechartFormula('%')">%</button>
                                <button type="button" class="opr btn btn-sm btn-secondary"
                                    onclick="updatechartFormula('(')">(</button>
                                <button type="button" class="opr btn btn-sm btn-secondary"
                                    onclick="updatechartFormula(')')">)</button>
                                <button type="button" class="opr btn btn-sm btn-secondary"
                                    onclick="updatechartFormula('[')">[</button>
                                <button type="button" class="opr btn btn-sm btn-secondary"
                                    onclick="updatechartFormula(']')">]</button>
                                <button type="button" class="opr btn btn-sm btn-secondary"
                                    onclick="updatechartFormula(':')">:</button>
                                <button type="button" class="opr btn btn-sm btn-secondary"
                                    onclick="updatechartFormula('AND')">AND</button>
                                <button type="button" class="opr btn btn-sm btn-secondary"
                                    onclick="updatechartFormula('OR')">OR</button>
                                <button type="button" class="opr btn btn-sm btn-secondary"
                                    onclick="updatechartFormula('NOT')">NOT</button>
                                <button type="button" class="opr btn btn-sm btn-secondary"
                                    onclick="updatechartFormula('IN')">IN</button>
                                <button type="button" class="opr btn btn-sm btn-secondary"
                                    onclick="updatechartFormula('==')">==</button>
                                <button type="button" class="opr btn btn-sm btn-secondary"
                                    onclick="updatechartFormula('!=')">!=</button>
                                <button type="button" class="opr btn btn-sm btn-secondary"
                                    onclick="updatechartFormula('>')">&gt;</button>
                                <button type="button" class="opr btn btn-sm btn-secondary"
                                    onclick="updatechartFormula('<')">&lt;</button>
                                <button type="button" class="opr btn btn-sm btn-secondary"
                                    onclick="updatechartFormula('>=')">&gt;=</button>
                                <button type="button" class="opr btn btn-sm btn-secondary"
                                    onclick="updatechartFormula('<=')">&lt;=</button>
                            </div>

                            <!-- GRID SECTION -->
                            <div class="row g-3">

                                <!-- FIELDS LIST -->
                                <div class="col-md-4">
                                    <div class="card h-100">
                                        <div class="card-header"><h6 class="mb-0">Fields & Measures</h6></div>
                                        <div class="card-body p-2">
                                            <input type="text" class="form-control form-control-sm"
                                                id="fieldchartmeasurefilter"
                                                onkeyup="fieldchartmeasurefilter()"
                                                placeholder="Search">

                                            <ul class="list-group mt-2 overflow-auto"
                                                style="max-height:200px"
                                                id="chartmeasureNames">
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <!-- FUNCTIONS -->
                                <div class="col-md-4">
                                    <div class="card h-100">
                                        <div class="card-header"><h6 class="mb-0">Functions</h6></div>
                                        <div class="card-body p-2">
                                            <ul class="list-group overflow-auto" style="max-height:220px">
                                                <li class="list-group-item" onclick="updatechartFormula('if','if')">if</li>
                                                <li class="list-group-item" onclick="updatechartFormula('avg','avg')">avg</li>
                                                <li class="list-group-item" onclick="updatechartFormula('agg','agg')">agg</li>
                                                <li class="list-group-item" onclick="updatechartFormula('count','count')">count</li>
                                                <li class="list-group-item" onclick="updatechartFormula('sum','sum')">sum</li>
                                                <li class="list-group-item" onclick="updatechartFormula('min','min')">min</li>
                                                <li class="list-group-item" onclick="updatechartFormula('max','max')">max</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <!-- FUNCTION DESCRIPTION -->
                                <div class="col-md-4">
                                    <div class="card h-100">
                                        <div class="card-header"><h6 class="mb-0">Function Description</h6></div>
                                        <div class="card-body">
                                            <h6 class="formulaheaderdesc"></h6>
                                            <p class="formulacontentdesc mb-0"></p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <!-- BUTTONS -->
                            <div class="mt-3">
                                <input type="hidden" id="chartormulaHandletype">
                                <button class="btn btn-secondary btn-sm"
                                    onclick="handleChartFormulaValidate()">Validate</button>
                                <button class="btn btn-primary btn-sm"
                                    onclick="handleChartFormulaAdd()">Add</button>
                            </div>

                        </div>

                        <!-- SUMMARY TAB -->
                        <div class="tab-pane fade" id="summary_calculation1">
                            <div class="card">
                                <div class="card-header"><h6 class="mb-0">Formula</h6></div>
                                <div class="card-body">
                                    <ul class="list-group">
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

                    </div> <!-- tab content -->
                </div> <!-- card-body -->

            </div> <!-- modal body -->

        </div>
    </div>

</div>
	<!-- END CHART KPI Calculator -->

 <main class="pt-2 pb-2">
        <div class="container-lg">
            <div class="page-header grid gap-2 pb-1">
                <div class="g-col-8 d-flex align-items-center">
                    <h4 class="title">
                        <span class="icon">
                            <img src="/stratroom/images/white-board-i.svg" alt="White board" title="White board" width="16" height="16">
                        </span>
                        White Board
                    </h4>
                </div>
                <!-- <div class="load-page g-col-4">
                    <div class="dropdown ms-auto">
                        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Load Page
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                            <li><a class="dropdown-item" href="#">Select Page</a></li>
                            <li><a class="dropdown-item" href="#">Chart</a></li>
                            <li><a class="dropdown-item" href="#">Cockpit</a></li>
                        </ul>
                    </div>
                </div> -->
            </div>
        </div>
        <div class="container-lg ondrop-container customTabContent d-grid gap-2 py-2" ondrop="drop(event)"
            ondragover="allowDrop(event)">
   	<div class="grid gap-2 align-self-start" id="drill-chart-body"></div>
			<div class="row row-padding m-0" id="chart-body"></div>
            </div>
        </div>
    </main>
    <footer class="col-12 text-center py-2 copyright">
    <p class="mb-0">Copyright &copy; <span id="year"></span> <strong>StratRoom</strong></p>

<script>
    document.getElementById("year").textContent = new Date().getFullYear();
</script>

</footer>

	<!-- Plugins Js -->
  <link href="assets/css/pickr.min.css" rel="stylesheet">
        <link href="assets/css/daterangepicker.min.css" rel="stylesheet">
        <link href="assets/css/jquery-ui.min.css" rel="stylesheet">
        <link href="assets/css/select2.min.css" rel="stylesheet" />
<script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>
<script type="text/javascript"
	src="${contextroot}/js/jquery/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="${contextroot}/js/jquery/additional-methods.min.js"></script>
<script src="${contextroot}/js/gijgo.min.js" type="text/javascript"></script>
<link href="${contextroot}/css/gijgo.min.css" rel="stylesheet"
	type="text/css" />
<script async defer src="${contextroot}/js/buttons.js"></script>

<script src="${contextroot}/js/plotly-latest.min.js"></script>
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
	<!-- <script type="text/javascript"
		src="${contextroot}/js/daterangepicker.min.js"></script> -->

		<script type="text/javascript"
		src="${contextroot}/js/datepickercockpitcharts.js"></script>


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
  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.15.1/xlsx.full.min.js"></script>
     <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdn.datatables.net/rowgroup/1.3.0/js/dataTables.rowGroup.min.js"></script>
     <!-- <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script> -->
 <script src="${contextroot}/js/jquery.dataTables.min.js"></script>
<script src="${contextroot}/js/dataTables.bootstrap5.min.js"></script>
    <script src="${contextroot}/js/dataTables.rowGroup.min.js"></script>
  <script src="${contextroot}/js/jspdf.umd.min.js"></script>
    <script src="${contextroot}/js/jspdf.plugin.autotable.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.27/jspdf.plugin.autotable.min.js"></script>

 <script type="text/javascript" src="https://fastly.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>


	<script>

		document.addEventListener("DOMContentLoaded", function () {
    var tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(function (el) {
        new bootstrap.Tooltip(el);
    });
});
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
  document.addEventListener('DOMContentLoaded', function () {
    const widgetSelect = document.getElementById('widget_type_01');
    const chartWidget = document.querySelector('.widget-2.chart-type-2');
    const drilldownWidget = document.querySelector('.widget-2.drilldown-type-2');
	const commentWidget = document.querySelector('.widget-2.chartComment-type-2');

    widgetSelect.addEventListener('change', function () {
      if (this.value === 'drilldown-type-2') {
        chartWidget.style.display = 'none';
        drilldownWidget.style.display = 'block';
		commentWidget.style.display = 'none';
      } else if (this.value === 'chart-type-2') {
        chartWidget.style.display = 'block';
        drilldownWidget.style.display = 'none';
		commentWidget.style.display = 'none';
      }else if (this.value === 'chartComment-type-2') {
        chartWidget.style.display = 'none';
        drilldownWidget.style.display = 'none';
		commentWidget.style.display = 'block';
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


    <script>
      $(document).ready(function () {
          $('#chart_formula_popup').on('hidden.bs.modal', function () {
              $('#chart_setting').modal('show');
          });
      });
      </script>


    <script>
      // When child modal closed → reopen parent modal
      // document.getElementById("chart_formula_popup").addEventListener("hidden.bs.modal", function () {
      //     var parentModal = new bootstrap.Modal(document.getElementById("chart_setting"));
      //     parentModal.show();
      // });


     $('#chart_formula_popup').on('show.bs.modal', function () {
          $('#chart_setting').modal('hide'); 
          $(this).attr('data-parent-modal', '#kpi-add-modal'); 
      });

      // When second modal closes, re-open the first one
      $('#chart_formula_popup').on('hidden.bs.modal', function () {
          let parentModal = $(this).attr('data-parent-modal');
          if (parentModal) {
              $(parentModal).modal('show');
          }
      });

    </script>
</body>
