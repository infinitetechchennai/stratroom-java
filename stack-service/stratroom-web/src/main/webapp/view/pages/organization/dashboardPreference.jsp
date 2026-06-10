<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta content="width=device-width, initial-scale=1" name="viewport" />
<meta http-equiv="Content-Type" content="\"text/html;" charset="utf-8\"">
<title>StratRoom</title>



<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">



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

      .access-control-table thead tr th {
        font-size: 14px;
        font-weight: 600;
        z-index: 1;
        color: #333;
        position: sticky;
        top: 0;
        background-color: rgb(216, 211, 211);
        padding: 12px 0px;
        text-align: center;
      }

      .access-control-table tbody tr td {
        font-size: 12px;
        font-weight: 500 !important;
        color: #555;
        text-align: center;
        padding: 4px 0px 0px 16px;
      }

      .access-control-table tbody tr td ul {
        margin-top: 8px;
      }

     

      .access-control-table tbody tr td  {
        font-size: 12px;
      }

      .access-control-table tbody tr td ul  {
        font-size: 12px;
      }

.kpiformuladescHighlight{
	background-color:#c0baba;
}

.select2labelelem{
	padding-left: 15px !important;
    height: 20px !important;
    line-height: 20px !important;
    font-size: 12px !important;
}

.select2-selection__choice__remove {
        display: none !important;
    }
.gantt .bar-label {
    fill: #3c3636 !important;
}

#chartdiv>div.gantt-container {
	overflow: scroll !important;
	height: 340px  !important;
}

svg.gantt{
    min-height: 340px  !important;
}

.initiatives-gantt-color .bar-progress {
	fill: #96aed0 !important;
}

.subinitiatives-gantt-color .bar-progress {
	fill: #c24fc3 !important;
}

.activities-gantt-color .bar-progress {
	fill: #46b7b7 !important;
}

.risk_yellow_color {
  color: #ffd500 !important;
}

.risk_red_color {
  color: #e84343 !important;
}

.risk_green_color {
  color: #2b982b !important;
}

.risk_lightorange_color {
  color: #f58c41 !important;
}

.chartgreenbarcircle{
	color: #1aa243 !important;
}

.chartyellowbarcircle{
	color: #ffd500 !important;
}

.chartorangebarcircle{
	color: #e84343 !important;
}

.defaultchartbarimagecircle{
	color: #948d8d !important;
}

.select2-container {
        width: 100% !important;
      }

      .select2-container--default.select2-container--focus
        .select2-selection--multiple {
        border: solid #ced4da 1px;
        outline: 0;
      }

      .select2-container .select2-search--inline .select2-search__field {
        box-sizing: border-box;
        border: none;
        font-size: 100%;
        margin-top: -4px;
        margin-left: 5px;
        padding: 0;
        margin-bottom: -10px;
      }

      .select2-container--default .select2-selection--multiple {
        background-color: white;
        border: 1px solid #ced4da;
        border-radius: 4px;
        cursor: text;
        padding-bottom: 5px;
        padding-right: 5px;
      }

.select2-container {
        width: 100% !important;
      }

      .select2-container--default.select2-container--focus
        .select2-selection--multiple {
        border: solid #ced4da 1px;
        outline: 0;
      }

      .select2-container .select2-search--inline .select2-search__field {
        box-sizing: border-box;
        border: none;
        font-size: 100%;
        margin-top: -4px;
        margin-left: 5px;
        padding: 0;
        margin-bottom: -10px;
      }

      .select2-container--default .select2-selection--multiple {
        background-color: white;
        border: 1px solid #ced4da;
        border-radius: 4px;
        cursor: text;
        padding-bottom: 5px;
        padding-right: 5px;
      }


.remove-btn {
    background-color: #fff;
    float: right;
}

.nameText {
	margin: 5px 0 1em 0;
	overflow: hidden;
}

.nameText p {
	margin: 0;
}

.display-line-clamp {
	display: -webkit-box;
	/* -webkit-line-clamp: 2; */
	-webkit-box-orient: vertical;
}

.dollar-line-clamp {
	display: -webkit-box;
	/* -webkit-line-clamp: 1; */
	-webkit-box-orient: vertical;
}

.displayoftextvalue {
	min-height: 38px !important;
	max-height: 38px !important;
}

.dollarvalueoftext {
	min-height: 19px !important;
	max-height: 19px !important;
}

.pointer {
	cursor: pointer;
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
    overflow-y: scroll !important;
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
      .table-centered th,
.table-centered td {
  text-align: center !important;
  vertical-align: middle !important;
}
</style>
</head>


<body class="light">

  <jsp:include page="../common/top-navigation.jsp"></jsp:include>
		  <header id="header" class="header shadow-sm">
	  
		<jsp:include page="../common/left-navigation.jsp"></jsp:include>
    </header>
    
<input type="hidden" id="flagapplychart" value="flagapplychart">
	<input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
		<!-- Page Loader -->
	

    
	<c:if test="${pageId != null}">
		<input id="pagenumber" type="hidden" name="pagenumber" value ="<c:out value="${pageId}" />">
	</c:if>
	<input id="userdept" type="hidden" name="userdept" value="${userPrincipal.profile.department}">
	<div>
		<jsp:include page="modal/dashboardTextModal.jsp"></jsp:include>
		<jsp:include page="modal/dashboardChartModal.jsp"></jsp:include>
		<jsp:include page="modal/dashboardTableModal.jsp"></jsp:include>

<!-- Share Modal -->
    <div id="share-popup" class="modal fade" role="dialog">
      <div class="modal-dialog modal-lg" style="margin-top: 10%">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <h4>Share</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         
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
              <div class="modal-footer">
                   <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                       Cancel
                   </button>
                   <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    	<div id="downloadpdf" style="display: none;">
		<table class="table dashboard-task-infos align-center dashboard-table"
			id="downloadPdfView" style="margin-bottom: 0px !important;">
		</table>
	</div>


	<!-- Drill Down Table View -->
	<div class="modal fade" id="drilldown_view" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-header">
					<h4>Drill Down Table View</h4>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						
				</div>
				<div class="modal-body">
					<table
						class="table dashboard-task-infos align-center dashboard-table"
						id="drilldownTableView1" style="margin-bottom: 0px !important;">
					</table>
				</div>
			</div>
		</div>
	</div>
	<!-- END Drill Down Table View  -->

	<!-- Data Table Setting -->
	<!-- <div class="modal fade" id="datatable_setting" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h4>Data Table Settings</h4>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						
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
	</div> -->
	<!-- END Data Table Setting -->

	<!-- Data Table View -->
	<div class="modal fade" id="datatable_view" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-header">
					<h4>Data Table View</h4>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						
				</div>
				<div class="modal-body">
					<table
						class="table dashboard-task-infos align-center dashboard-table"
						id="dataTableView1" style="margin-bottom: 0px !important;">
					</table>
				</div>
			</div>
		</div>
	</div>
	<a href="#" class="downloadcasfile" style="display:none"></a>
	<!-- END Data Table View  -->
	
	<!-- Column DD Large -->
	<!-- <div class="modal fade" id="column-largeDD" tabindex="-1" role="dialog"
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
	</div> -->
	<!-- END Column DD Large -->

	<!-- Chart View -->
	<!-- <div class="modal fade" id="viewchartsettings" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="chartviewsettingsclass" id=""></div>
					<div class="chartviewsettingslarge" id="" style="display: none;"></div>
				</div>
			</div>
		</div>
	</div> -->
	<!-- Chart View -->




	<!-- chart KPI Calculator -->

	<!-- END CHART KPI Calculator -->
<!-- Risk Register Setting -->
   <div class="modal fade" id="riskreg_setting" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
       aria-hidden="true">
       <div class="modal-dialog modal-dialog-centered modal-lg">
           <div class="modal-content">
               <div class="modal-header">
                   <h4 class="modal-title fs-5">Risk Register Settings</h4>
                   <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <div class="modal-body">
                 <form id="risk_register_Form">
                   <div class="row">

                       <div class="col-12 form-group mb-3">
                           <label for="Name" class="form-label">Departments</label>
                           <select class="risk-dept-multi-select departmentmulti riskregisterdeptfilter" name="states[]" multiple="multiple">
                               
                           </select>
                       </div>

                       <div class="col-12 form-group mb-3">
                           <label for="Name" class="form-label">Status</label>
                           <select class="risk-status-multi-select riskstatusmulti form-select" name="riskstatusmulti[]" multiple="multiple">
                               <option value="Very good">Very good</option>
                               <option value="Good">Good</option>
                               <option value="Tolerable">Tolerable</option>
                               <option value="High">High</option>
                               <option value="Very high">Very high</option>
                           </select>
                       </div>

                       <div class="col-12 form-group mb-3">
                           <label for="Name" class="form-label">Risks</label>
                           <select class="risk-reg-multi-select form-select risknamesmulti reviewriskfilter" name="states[]" multiple="multiple">
                                <option value="All">All</option>
                           </select>
                       </div>
	<input type="hidden" name="action" value="" />
				<input type="hidden" name="riskid" id="riskregisterid" value="" />
				<input type="hidden" id="risktabletypeField" value="" />
                       <div class="form-group col-md-12 mb-3">
                           <label for="kpi_fields" class="form-label">Select
                               Fields</label>

                           <div>

                               <div class="form-check form-check-inline">
                                   <input class="form-check-input" type="checkbox" id="riskname">
                                   <label class="form-check-label" for="riskname">Name</label>
                               </div>
                               <div class="form-check form-check-inline">
                                   <input class="form-check-input" type="checkbox" id="riskcategory">
                                   <label class="form-check-label" for="riskcategory">Category</label>
                               </div>
                               <div class="form-check form-check-inline">
                                   <input class="form-check-input" type="checkbox" id="fContext">
                                   <label class="form-check-label" for="fContext">Context</label>
                               </div>
                               <div class="form-check form-check-inline">
                                   <input class="form-check-input" type="checkbox" id="riskimpact">
                                   <label class="form-check-label" for="riskimpact">Impact</label>
                               </div>
                               <div class="form-check form-check-inline">
                                   <input class="form-check-input" type="checkbox" id="fLikelihood">
                                   <label class="form-check-label" for="fLikelihood">Likelihood</label>
                               </div>
                               <div class="form-check form-check-inline">
                                   <input class="form-check-input" type="checkbox" id="fScore">
                                   <label class="form-check-label" for="fScore">Score</label>
                               </div>
                               <div class="form-check form-check-inline">
                                   <input class="form-check-input" type="checkbox" id="fStatus">
                                   <label class="form-check-label" for="fStatus">Status</label>
                               </div>
                               <div class="form-check form-check-inline">
                                   <input class="form-check-input" type="checkbox" id="fRaisedon">
                                   <label class="form-check-label" for="fRaisedon">Raised
                                       on</label>
                               </div>
                               <div class="form-check form-check-inline">
                                   <input class="form-check-input" type="checkbox" id="fNextAssessment">
                                   <label class="form-check-label" for="fNextAssessment">Next Assessment</label>
                               </div>

                           </div>

                       </div>

                   </div>
                 
               </div>
               <div class="modal-footer">
                   <button type="button" class="btn btn-secondary secondary-btn" data-bs-dismiss="modal"
                       aria-label="Close">
                       Cancel
                   </button>
                   <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
               </div>
                 </form>
           </div>
       </div>
   </div>
    <!-- END Risk Register Setting -->
	<!-- Review monitoring Setting -->
    <div
      class="modal fade"
      id="reviewMonitoring_setting"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel_1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4>Risk Monitoring Settings</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             
          </div>
          <div class="modal-body">
          <form id="review_register_Form">
            <div class="row">
              <div class="col-12 form-group">
                <label for="Name" data-i18n="Departments">Departments</label>
                <select class="risk-dept-multi-select reviewdepartmentmulti deptfilter" id="reviewdept" name="reviewdepartmentmulti[]" multiple="multiple">
                </select>
              </div>

              <input type="hidden" id="riskMonitorInput" value="" />
			  <div class="col-12 form-group">
                <label for="Name">Risks</label>
                <select class="risk-reg-multi-select reviewnamesmulti riskfilter" id="reviewrisk" name="reviewnamesmulti[]" multiple="multiple">
                  <option value="All">All</option>
                </select>
              </div>

              <div class="col-12 form-group">
                <label for="Name">Status</label>
                <select class="int-status-multi-select reviewstatusmulti" name="reviewstatusmulti[]" multiple="multiple">
                  <option value="Open">Open</option>
                  <option value="Close">Close</option>
                </select>
              </div>
             
             
				<input type="hidden" name="action" value="" />
				<input type="hidden" name="reviewid" id="reviewregisterid" value="" />
				<input type="hidden" id="reviewtabletypeField" value="" />
                <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Select Fields</label>

              <div class="d-flex flex-wrap gap-3 mt-2">

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="departmentName">
                  <label class="form-check-label" for="departmentName">
                    Department Name
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="reviewCode">
                  <label class="form-check-label" for="reviewCode">
                    Risk Code
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="reviewName">
                  <label class="form-check-label" for="reviewName">
                    Risk Name
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="reviewMitigation">
                  <label class="form-check-label" for="reviewMitigation">
                    Mitigation Plan
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="reviewNotes">
                  <label class="form-check-label" for="reviewNotes">
                    Notes
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="reviewTarget">
                  <label class="form-check-label" for="reviewTarget">
                    Target Completion Time
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="reviewTargetChanges">
                  <label class="form-check-label" for="reviewTargetChanges">
                    Changes in Target Completion Time
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="reviewProgress">
                  <label class="form-check-label" for="reviewProgress">
                    Progress (%)
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="reviewStatus">
                  <label class="form-check-label" for="reviewStatus">
                    Status
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="reviewPersonIncharge">
                  <label class="form-check-label" for="reviewPersonIncharge">
                    Person in Charge
                  </label>
                </div>

              </div>
            </div>
          </div>

                <div class="modal-footer">
                   <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                       Cancel
                   </button>
                   <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
               </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- END Review monitoring Setting -->
    <!-- ERM RISK Register Setting -->
    <div
      class="modal fade"
      id="ermRiskReg_setting"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel_1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4>ERM Risk Register Settings</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <form id="ermRiskReg_Form">
            <div class="row">
              <div class="col-12 form-group">
                <label for="Name" data-i18n="Departments">Departments</label>
                <select class="risk-dept-multi-select ermdepartmentmulti ermdeptfilter" id="ermRiskRegdept" name="ermdepartmentmulti[]" multiple="multiple">
                </select>
              </div>
              <input type="hidden" id="ermInput" value="" />
			  <div class="col-12 form-group">
                <label for="Name">Risks</label>
                <select class="risk-reg-multi-select ermRiskRegnamesmulti ermriskfilter" id="ermRiskRegrisk" name="ermRiskRegnamesmulti[]" multiple="multiple">
                </select>
              </div>
              <div class="col-12 form-group">
                <label for="Name">Risk Level</label>
                <select class="int-status-multi-select risklevel ermRiskRegstatusmulti" id="ermRiskLevel" name="ermRiskRegstatusmulti[]" multiple="multiple">
                  <option value="low">Low</option>
                  <option value="medium"> Medium</option>
                  <option value="high">High</option>
                  <option value="extreme">Extreme</option>
                </select>
              </div>
              <div class="col-12 form-group">
                <label for="Name">Top Level</label>
                <select class="int-status-multi-select ermRiskRegRangemulti" id="ermtoplevel"  name="ermRiskRegRangemulti[]">
                  <!-- <option value="All">All</option> -->
                  <option value="10">10</option>
                  <option value="5">5</option>
                </select>
              </div>
             
				<input type="hidden" name="action" value="" />
				<input type="hidden" name="ermRiskRegid" id="ermRiskRegid" value="" />
				<input type="hidden" id="ermRiskRegtabletypeField" value="" />
             <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Select Fields</label>

              <div class="d-flex flex-wrap gap-3 mt-2">

                <div class="form-check"><input class="form-check-input" type="checkbox" id="ermRiskStatus"><label class="form-check-label" for="ermRiskStatus">Risk Status</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="ermdepartmentName"><label class="form-check-label" for="ermdepartmentName">Department Name</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="ermRiskId"><label class="form-check-label" for="ermRiskId">Risk ID</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="ermRiskName"><label class="form-check-label" for="ermRiskName">Risk Name</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="ermKpi"><label class="form-check-label" for="ermKpi">KPI</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="ermPos"><label class="form-check-label" for="ermPos">POS</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="ermIso"><label class="form-check-label" for="ermIso">ISO</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="ermInfoAsset"><label class="form-check-label" for="ermInfoAsset">Information Asset</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="ermOthers"><label class="form-check-label" for="ermOthers">Others</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="ermInherentScore"><label class="form-check-label" for="ermInherentScore">Inherent Score</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="ermResidualRiskScore"><label class="form-check-label" for="ermResidualRiskScore">Residual Risk Score</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="ermRiskLevelField"><label class="form-check-label" for="ermRiskLevelField">Risk Level</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="ermMitigation"><label class="form-check-label" for="ermMitigation">Mitigation Plan</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="ermPersonIncharge"><label class="form-check-label" for="ermPersonIncharge">Person in Charge</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="ermTarget"><label class="form-check-label" for="ermTarget">Target Completion Time</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="ermTargetChanges"><label class="form-check-label" for="ermTargetChanges">Changes in Target Completion Time</label></div>

              </div>
            </div>
          </div>

              <div class="col-12">
                <hr style="border: 1px solid #505050" />
              </div>
              <div class="modal-footer">
                   <button type="button" class="btn btn-secondary secondary-btn" data-bs-dismiss="modal"
                       aria-label="Close">
                       Cancel
                   </button>
                   <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
               </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- END  ERM RISK Register Setting -->
     <!-- Riskevent Frequency Setting -->
     <div
     class="modal fade"
     id="riskeventfreq_setting"
     tabindex="-1"
     role="dialog"
     aria-labelledby="myLargeModalLabel_1"
     aria-hidden="true"
   >
     <div class="modal-dialog modal-dialog-centered modal-lg">
       <div class="modal-content">
         <div class="modal-header">
           <h4>Risk Events Frequency of Occurrence Settings</h4>
           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body">
         <form id="riskeventfreq_Form">
           <div class="row">
             <div class="col-12 form-group">
              <label for="Name" data-i18n="Departments">Departments</label>
              <select class="risk-dept-multi-select freqdepartmentmulti riskeventfreqdeptfilter" id="Riskeventfreqdept" name="freqdepartmentmulti[]" multiple="multiple">
              </select>
            </div>
            <input type="hidden" id="riskeventfreqInput" value="" />
      <div class="col-12 form-group">
              <label for="Name">RiskEvents</label>
              <select class="risk-reg-multi-select riskeventfreqnamesmulti riskeventfreqnames" id="riskeventfreqpagenames" name="riskeventfreqnamesmulti[]" multiple="multiple">
                <option value="All">All</option>
              </select>
            </div>
            <div class="col-12 form-group">
              <label for="Name">Top Level</label>
              <select class="int-status-multi-select riskeventfreqstatusmulti" id="Riskeventfreqtoplevel"  >
                <option value="All">All</option>
                 <option value="Ten">Ten</option>
                 <option value="Five">Five</option>
              </select>
            </div>
            
       <input  type="hidden" name="action" value="" />
       <input type="hidden" name="Riskeventfreqid" id="riskeventfreqregisterid" value="" />
       <input type="hidden" id="riskeventfreqtabletypeField" value="" />
              <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Select Fields</label>

              <div class="d-flex flex-wrap gap-3 mt-2">

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="riskeventfreqdepartmentName">
                  <label class="form-check-label" for="riskeventfreqdepartmentName">
                    Department Name
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="riskEventFreqName">
                  <label class="form-check-label" for="riskEventFreqName">
                    Risk Event Name
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="riskEventFrequency">
                  <label class="form-check-label" for="riskEventFrequency">
                    Frequency
                  </label>
                </div>

              </div>
            </div>
          </div>


               <div class="modal-footer">
                   <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                       Cancel
                   </button>
                   <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
               </div>
           </div>
           </form>
         </div>
       </div>
     </div>
   </div>
   <!-- END  Riskevent Frequency Setting -->
<!-- Risk status count  -->
<div
class="modal fade"
id="riskcount_setting"
tabindex="-1"
role="dialog"
aria-labelledby="myLargeModalLabel_1"
aria-hidden="true"
>
<div class="modal-dialog modal-dialog-centered modal-lg">
  <div class="modal-content">
    <div class="modal-header">
      <h4>Risk Status Count Settings</h4>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <form id="riskStatus_count_Form">
      <div class="row">
        <div class="col-12 form-group">
          <label for="Name" data-i18n="Departments">Departments</label>
          <select class="risk-dept-multi-select riskcountdepartmentmulti riskcountdeptfilter" id="riskCountdept" name="riskcountdepartmentmulti[]" multiple="multiple">
          </select>
        </div>

        <input type="hidden" id="riskCountInput" value="" />
        <div class="col-12 form-group">
          <label for="Name">Risks</label>
          <select class="risk-reg-multi-select riskcountnamesmulti riskCountfilter" id="riskCountnamesmulti" name="riskcountnamesmulti[]" multiple="multiple">
            <option value="All">All</option>
          </select>
        </div>
  
  <input type="hidden" name="action" value="" />
  <input type="hidden" name="riskcountid" id="riskcountregisterid" value="" />
  <input type="hidden" id="riskcounttabletypeField" value="" />
        <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Select Fields</label>

              <div class="d-flex flex-wrap gap-3 mt-2">

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="riskcountdepartmentName">
                  <label class="form-check-label" for="riskcountdepartmentName">
                    Department Name
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="riskCountlow">
                  <label class="form-check-label" for="riskCountlow">Low</label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="riskCountMedium">
                  <label class="form-check-label" for="riskCountMedium">Medium</label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="riskcountHigh">
                  <label class="form-check-label" for="riskcountHigh">High</label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="riskCountExtreme">
                  <label class="form-check-label" for="riskCountExtreme">Extreme</label>
                </div>

              </div>
            </div>
          </div>
  <div class="modal-footer">
                   <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                       Cancel
                   </button>
                   <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
               </div>
      </div>
      </form>
    </div>
  </div>
</div>
</div>
<!-- END Risk status count Setting -->
	<!-- RiskEvent monitoring Setting -->
    <div
      class="modal fade"
      id="riskevent_setting"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel_1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4>Risk Event Settings</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             
          </div>
          <div class="modal-body">
          <form id="riskEvent_register_Form">
            <div class="row">
              <div class="col-12 form-group">
                <label for="Name" data-i18n="Departments">Departments</label>
                <select class="int-status-multi-select riskEventdepartmentmulti  deptriskEventFilter" name="riskEventdepartmentmulti[]" multiple="multiple">
                </select>
              </div>

              <input type="hidden" id="riskEventInput" value="" />
              <div class="col-12 form-group">
                <label for="Name">Types of Event</label>
                <select class="risk-reg-multi-select riskeventnamesmulti riskEventFilter" name="riskeventnamesmulti[]" multiple="multiple">
                  <option value="All">All</option>
                </select>
              </div>

              <div class="col-12 form-group">
                <label for="Name">Status</label>
                <select class="int-status-multi-select riskeventstatusmulti" name="riskeventstatusmulti[]" multiple="multiple">
                  <option value="Open">Open</option>
                  <option value="Close">Close</option>
                </select>
              </div>

             
				<input type="hidden" name="action" value="" />
				<input type="hidden" name="riskEventid" id="riskeventregisterid" value="" />
				<input type="hidden" id="riskeventtabletypeField" value="" />
                     <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Select Fields</label>

              <div class="d-flex flex-wrap gap-3 mt-2">

                <div class="form-check"><input class="form-check-input" type="checkbox" id="departmentNamerikevent"><label class="form-check-label" for="departmentNamerikevent">Department Name</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="eventDate"><label class="form-check-label" for="eventDate">Date of Risk Event</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="eventRiskReg"><label class="form-check-label" for="eventRiskReg">Risk Register</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="eventRisk"><label class="form-check-label" for="eventRisk">Risk Event</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="eventType"><label class="form-check-label" for="eventType">Type of Event</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="eventIncidentCategory"><label class="form-check-label" for="eventIncidentCategory">Cause of Incident Category</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="eventIncidentDescription"><label class="form-check-label" for="eventIncidentDescription">Cause of Incident Description</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="eventLossCategory"><label class="form-check-label" for="eventLossCategory">Impact Loss Category</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="eventLossDescription"><label class="form-check-label" for="eventLossDescription">Impact Loss Description</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="eventImactLevel"><label class="form-check-label" for="eventImactLevel">Impact Loss Level</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="eventCorrection"><label class="form-check-label" for="eventCorrection">Correction Action</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="eventMitigation"><label class="form-check-label" for="eventMitigation">Risk Mitigation</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="eventStatus"><label class="form-check-label" for="eventStatus">Mitigation Status</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="eventInventor"><label class="form-check-label" for="eventInventor">Inventor / Reporter</label></div>

              </div>
            </div>
          </div>

                <div class="modal-footer">
                   <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                       Cancel
                   </button>
                   <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
               </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- END Risk Event monitoring Setting -->

	<!-- Pos monitoring Setting -->
    <div
      class="modal fade"
      id="pos_setting"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel_1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4>BIA - POS Setting</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            
          </div>
          <div class="modal-body">
          <form id="pos_Form">
            <div class="row">
              <div class="col-12 form-group">
                <label for="Name" data-i18n="Departments">Departments</label>
                <select class="risk-dept-multi-select posdepartmentmulti deptpos" name="posdepartmentmulti[]" multiple="multiple">
                </select>
              </div>

              <input type="hidden" id="biaPosInput" value="" />
			  <div class="col-12 form-group">
                <label for="Name">Business Impact Analysis (BIA - POS)</label>
                <select class="risk-reg-multi-select posnamesmulti posBusinessName" name="posnamesmulti[]" multiple="multiple">
                  <option value="All">All</option>
                </select>
              </div>
             
				<input type="hidden" name="action" value="" />
				<input type="hidden" name="posid" id="posregisterid" value="" />
				<input type="hidden" id="postabletypeField" value="" />
            <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Select Fields</label>

              <div class="d-flex flex-wrap gap-3 mt-2">

                <div class="form-check"><input class="form-check-input" type="checkbox" id="deptPos"><label class="form-check-label" for="deptPos">Department Name</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="posProductServices"><label class="form-check-label" for="posProductServices">Product/Services</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="posProcess"><label class="form-check-label" for="posProcess">Process (POS)</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="posSubProcess"><label class="form-check-label" for="posSubProcess">Sub Process</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="posClassification"><label class="form-check-label" for="posClassification">Classification</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="posTimeStart"><label class="form-check-label" for="posTimeStart">Working Time Start</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="posTimeEnd"><label class="form-check-label" for="posTimeEnd">Working Time End</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="posAmountService"><label class="form-check-label" for="posAmountService">Amount Service</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="posFrequency"><label class="form-check-label" for="posFrequency">Frequency</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="posTechnology"><label class="form-check-label" for="posTechnology">Technology</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="posInputs"><label class="form-check-label" for="posInputs">Inputs (Vital Record)</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="posInternal"><label class="form-check-label" for="posInternal">People - Internal</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="posExternal"><label class="form-check-label" for="posExternal">People - External</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="posOutput"><label class="form-check-label" for="posOutput">Output (Vital Record)</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="posFinalMao"><label class="form-check-label" for="posFinalMao">Final MAO</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="posStrategies"><label class="form-check-label" for="posStrategies">Business Strategies & Solutions</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="posRto"><label class="form-check-label" for="posRto">RTO</label></div>

              </div>
            </div>
          </div>


                <div class="modal-footer">
                   <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                       Cancel
                   </button>
                   <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
               </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- END Pos monitoring Setting -->
     	<!-- Pos monitoring Setting -->
    <div
    class="modal fade"
    id="posTrading_setting"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel_1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4>Business Process Based on Trading Hours Setting</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         
        </div>
        <div class="modal-body">
        <form id="posTrading_Form">
          <div class="row">
            <div class="col-12 form-group">
              <label for="Name" data-i18n="Departments">Departments</label>
              <select class="risk-dept-multi-select posTradingdepartmentmulti deptTradingpos" name="posTradingdepartmentmulti[]" multiple="multiple">
              </select>
            </div>

            <input type="hidden" id="biaposTradingInput" value="" />
      <div class="col-12 form-group">
              <label for="Name">Business Impact Analysis (BIA - POS)</label>
              <select class="risk-reg-multi-select posTradingnamesmulti posTradingBusinessName" name="posTradingnamesmulti[]" multiple="multiple">
                <option value="All">All</option>
              </select>
            </div>
           
      <input type="hidden" name="action" value="" />
      <input type="hidden" name="posid" id="posTradingregisterid" value="" />
      <input type="hidden" id="posTradingtabletypeField" value="" />
                <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Select Fields</label>

              <div class="d-flex flex-wrap gap-3 mt-2">

                <div class="form-check"><input class="form-check-input" type="checkbox" id="deptPosTrading"><label class="form-check-label" for="deptPosTrading">Department Name</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="posTradingClassification"><label class="form-check-label" for="posTradingClassification">Classification</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="posTimeCrtical"><label class="form-check-label" for="posTimeCrtical">Time Critical</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="posTradingAmountService"><label class="form-check-label" for="posTradingAmountService">Amount Service</label></div>

              </div>
            </div>
          </div>
             <div class="modal-footer">
                   <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                       Cancel
                   </button>
                   <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
               </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- END Pos monitoring Setting -->

	<!-- Rpo monitoring Setting -->
    <div
      class="modal fade"
      id="rpo_setting"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel_1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4>BIA - RPO Setting</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            
          </div>
          <div class="modal-body">
          <form id="rpo_register_Form">
            <div class="row">
              <div class="col-12 form-group">
                <label for="Name" data-i18n="Departments">Departments</label>
                <select class="risk-dept-multi-select rpodepartmentmulti deptrpo" name="rpodepartmentmulti[]" multiple="multiple">
                </select>
              </div>

              <input type="hidden" id="biaRpoInput" value="" />
			  <div class="col-12 form-group">
                <label for="Name">Business Impact Analysis (BIA - RPO) </label>
                <select class="risk-reg-multi-select rponamesmulti  rpoBusinessName" name="rponamesmulti[]" multiple="multiple">
                  <!-- <option value="All">All</option>/ -->
                </select>
              </div>
             
				<input type="hidden" name="action" value="" />
				<input type="hidden" name="rporegisterid" id="rporegisterid" value="" /> 
				<input type="hidden" id="rpotabletypeField" value="" />
             <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Select Fields</label>

              <div class="d-flex flex-wrap gap-3 mt-2">

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="deptRpo">
                  <label class="form-check-label" for="deptRpo">Department Name</label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="rpoProcess">
                  <label class="form-check-label" for="rpoProcess">Process (POS)</label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="rpoVitalRecords">
                  <label class="form-check-label" for="rpoVitalRecords">Name of Vital Records</label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="rpoTypeMedia">
                  <label class="form-check-label" for="rpoTypeMedia">Type of Media</label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="rpoBackupMethod">
                  <label class="form-check-label" for="rpoBackupMethod">Backup Method</label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="rpoBackupTime">
                  <label class="form-check-label" for="rpoBackupTime">Backup Time</label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="rpoRetention">
                  <label class="form-check-label" for="rpoRetention">Retention</label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="rpoDatabase">
                  <label class="form-check-label" for="rpoDatabase">Database Recovery Strategy</label>
                </div>

              </div>
            </div>
          </div>



               <div class="modal-footer">
                   <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                       Cancel
                   </button>
                   <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
               </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- END rpo monitoring Setting -->

    		<!-- Report Template Setting -->
      <div
      class="modal custom-modal fade"
      id="report_setting"
     data-bs-backdrop="static"
        data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-lg-600">
        <div class="modal-content">
          <div class="modal-header">
             <h4 class="modal-title">Report Template Settings</h4>
             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <form id="report_template_Form">
            <div class="row">
                                <div class="g-col-12 form-group">
                                        <label for="departments" class="form-label">Departments</label>
                                        <select class="risk-dept-multi-select reportdepartmentmulti deptreportTemplate" name="reportdepartmentmulti[]" multiple="multiple"></select>
                                </div>
                                <div class="g-col-12 form-group">
                                        <label for="business_impact_analysis" class="form-label">Business Impact Analysis (Report Template)</label>
                                         <select class="risk-reg-multi-select reportnamesmulti reportInitiativeName" name="reportnamesmulti[]" multiple="multiple"></select>
                                </div>
                                 <input type="hidden" id="biaReportTemplateInput" value="" />
                               <input type="hidden" name="action" value="" />
				<input type="hidden" name="reportregisterid" id="reportregisterid" value="" /> 
				<input type="hidden" id="reporttabletypeField" value="" />
                                
        <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Select Fields</label>

              <div class="d-flex flex-wrap gap-3 mt-2">

                <div class="form-check"><input class="form-check-input" type="checkbox" id="deptRepTemplate" checked><label class="form-check-label" for="deptRepTemplate">Department Name</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="reportStraoutcomes" checked><label class="form-check-label" for="reportStraoutcomes">Strategic Outcomes</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="reportStraobjectives" checked><label class="form-check-label" for="reportStraobjectives">Strategic Objectives</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="reportCoherentActions" checked><label class="form-check-label" for="reportCoherentActions">Coherent Actions</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="reportSubActions" checked><label class="form-check-label" for="reportSubActions">Sub-Actions</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="reportOutput" checked><label class="form-check-label" for="reportOutput">Output</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="reportResponsibile" checked><label class="form-check-label" for="reportResponsibile">Responsible</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="reportTarget" checked><label class="form-check-label" for="reportTarget">Target Period 2024/25</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="reportPlanImp" checked><label class="form-check-label" for="reportPlanImp">Planned Implementation Months</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="reportActualImp" checked><label class="form-check-label" for="reportActualImp">Actual Implementation Months</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="reportTempPerformanceStatus" checked><label class="form-check-label" for="reportTempPerformanceStatus">Performance Status (30 Sept 2024)</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="reportImpRemarks" checked><label class="form-check-label" for="reportImpRemarks">Implementation Remarks</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="reportPeformanceAnalysis" checked><label class="form-check-label" for="reportPeformanceAnalysis">Performance Analysis / Recommendations</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="consolidatereportImpRemarks" checked><label class="form-check-label" for="consolidatereportImpRemarks">Consolidated Implementation Remarks</label></div>

                <div class="form-check"><input class="form-check-input" type="checkbox" id="consolidatereportPeformanceAnalysis" checked><label class="form-check-label" for="consolidatereportPeformanceAnalysis">Consolidated Performance Analysis</label></div>

              </div>
            </div>
          </div>

                     

                           <div class="col-12">
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary">Save</button>
                </div>
              </div>
                    </div>
           
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- END Reprt Template Setting -->
     
	<!--Process Business Critical Setting -->
  <div
  class="modal fade"
  id="critical_setting"
  tabindex="-1"
  role="dialog"
  aria-labelledby="myLargeModalLabel_1"
  aria-hidden="true"
>
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4>Process Business Critical Setting</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

      </div>
      <div class="modal-body">
      <form id="critical_register_Form">
        <div class="row">
          <div class="col-12 form-group">
            <label for="Name" data-i18n="Departments">Departments</label>
            <select id="deptarmentcritical" class="risk-dept-multi-select criticaldepartmentmulti deptcritical" name="criticaldepartmentmulti[]" multiple="multiple">
            </select>
          </div>

          <input type="hidden" id="criticalbusinessInput" value="" />
    <div class="col-12 form-group">
            <label for="Name">Impact Survey</label>
            <select class="risk-reg-multi-select criticalbusinessnamesmulti criticalBusinessName" name="criticalbusinessnamesmulti[]" multiple="multiple">
              <option value="All">All</option>
            </select>
          </div>
 
    <input type="hidden" name="action" value="" />
    <input type="hidden" name="criticalregisterid" id="criticalregisterid" value="" />
    <input type="hidden" id="criticaltabletypeField" value="" />
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Select Fields</label>

              <div class="d-flex flex-wrap gap-3 mt-2">

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="deptCritical">
                  <label class="form-check-label" for="deptCritical">Department Name</label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="totalCritical">
                  <label class="form-check-label" for="totalCritical">Critical</label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="lessCritical">
                  <label class="form-check-label" for="lessCritical">Less Critical</label>
                </div>

              </div>
            </div>
          </div>
  <div class="modal-footer">
                   <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                       Cancel
                   </button>
                   <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
               </div>
        </div>
        </form>
      </div>
    </div>
  </div>
</div>
<!-- END Process Business Critical Setting -->
<!-- Initiative Register Setting -->
    <div
      class="modal fade"
      id="intreg_setting"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel_1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4>Initiative Register Settings</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          
          </div>
          <div class="modal-body">
			<form id="Initiative_register_Form">
            <div class="row">
              <div class="col-12 form-group">
                <label for="Name" data-i18n="Departments">Departments</label>
                <select class="int-dept-multi-select initiativedepartmentmulti deptinitiative" name="initiativedepartmentmulti[]" multiple="multiple">
                </select>
              </div>
              <!-- <input type="hidden" id="riskMonitorInput" value="" /> -->
              <div class="col-12 form-group">
                <label for="Name">Status</label>
                <select class="int-status-multi-select initiativestatusmulti " name="initiativestatusmulti[]" multiple="multiple">
                  <option value="Red">Red</option>
                  <option value="Yellow">Yellow</option>
                  <option value="Green">Green</option>
                </select>
              </div>

				<!-- <input type="hidden" name="action" value="" />
				<input type="hidden" name="riskid" id="initiativeregisterid" value="" />
				<input type="hidden" id="initiativetabletypeField" value="initiativetable" />
        <input type="hidden" id="initiativeRegInput" value="initiativetable" />
              <div class="col-12 form-group">
                <label for="Name">Initiatives</label>
                <select class="int-reg-multi-select initiativenamesmulti initiativenames" name="initiativenamesmulti[]" multiple="multiple">
                  <option value="All">All</option>
                </select>
              </div> -->
              <input type="hidden" name="action" value="" /> 
 <input type="hidden" name="riskid" id="initiativeregisterid" value="" />
<input type="hidden" id="initiativetabletypeField" value="initiativetable" />
<input type="hidden" id="initiativeRegInput" value="initiativetable" />
          <div class="col-12 form-group">
              <label for="Name" data-i18n="Initiatives">Initiatives</label>
              <select class="int-reg-multi-select initiativenamesmulti  initiativeRegiterFilter" name="initiativenamesmulti[]" multiple="multiple">
                  <option value="All">All</option>
              </select>
          </div>

           <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Select Fields</label>

              <div class="d-flex flex-wrap gap-3 mt-2">

                <div class="form-check"><input class="form-check-input" type="checkbox" id="initiativedeptname"><label class="form-check-label">Department Name</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="initiativename"><label class="form-check-label">Name</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="initiativeimpact"><label class="form-check-label">Impact</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="initiativeplanstartend"><label class="form-check-label">Planned Start/End Date</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="initiativeactualstartend"><label class="form-check-label">Actual Start/End Date</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="initiativeprogress"><label class="form-check-label">Progress</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="initiativetarget"><label class="form-check-label">Target</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="initiativestatus"><label class="form-check-label">Status</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="initiativetotal"><label class="form-check-label">Total</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="initiativeutilised"><label class="form-check-label">Utilised</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="initiativebalance"><label class="form-check-label">Balance</label></div>

              </div>
            </div>
          </div>
  <div class="modal-footer">
                   <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                       Cancel
                   </button>
                   <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
               </div>
            </div>
			</form>
          </div>
        </div>
      </div>
    </div>
    <!-- END Initiative Register Setting -->



	<!-- Initiative Budget Project Setting -->
    <div
      class="modal fade"
      id="intprj_setting"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel_1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4>Budget And Realization Settings</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            
          </div>
          <div class="modal-body">
			<form id="Initiative_Budget_Project_Form">
            <div class="row">
              <div class="col-12 form-group">
                <label for="Name">Organisation</label>
                <select class="int-prjdept-multi-select initiativeprjdepartmentmulti" name="initiativeprjdepartmentmulti[]" multiple="multiple">
                </select>
              </div>
             
				<input type="hidden" name="action" value="" />
				<input type="hidden" name="initiativeprjid" id="initiativeprjid" value="" />
				<input type="hidden" id="initiativetabletypeFieldprj" value="" />
              <div class="col-12 form-group">
                <label for="Name">Initiative</label>
                <select class="int-prj-multi-select initiativeprjnamesmulti" name="initiativeprjnamesmulti[]" multiple="multiple">
                  <option value="All">All</option>
                </select>
              </div>

             <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Select Fields</label>

              <div class="d-flex flex-wrap gap-3 mt-2">

                <div class="form-check"><input class="form-check-input" type="checkbox" id="assetbudget"><label class="form-check-label">Total Asset Budget</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="assetrealization"><label class="form-check-label">Total Asset Realization</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="assetrealizationpercent"><label class="form-check-label">Total Asset Realization %</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="totalliabilitiesasset"><label class="form-check-label">Total Liabilities Budget</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="totalliabilitiesrealization"><label class="form-check-label">Total Liabilities Realization</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="totalliabilitiesrealizationpercent"><label class="form-check-label">Total Liabilities Realization %</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="totalbudget"><label class="form-check-label">Total Budget</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="totalrealization"><label class="form-check-label">Total Budget Realization</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="totalrealizationpercent"><label class="form-check-label">Total Budget Realization %</label></div>

              </div>
            </div>
          </div>
                <div class="modal-footer">
                   <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                       Cancel
                   </button>
                   <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
               </div>
            </div>
			</form>
          </div>
        </div>
      </div>
    </div>
    <!-- END Initiative Register Setting -->


<!-- Initiative Budget Organization Setting -->
<div
class="modal fade"
id="intorg_setting"
tabindex="-1"
role="dialog"
aria-labelledby="myLargeModalLabel_1"
aria-hidden="true"
>
<div class="modal-dialog modal-dialog-centered modal-lg">
  <div class="modal-content">
	<div class="modal-header">
	  <h4>Budget And Realization Settings</h4>
	  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

	</div>
	<div class="modal-body">
	  <form id="Initiative_Budget_Org_Form">
	  <div class="row">
		<div class="col-12 form-group">
		  <label for="Name">Organisation</label>
		  <select class="int-orgdept-multi-select initiativeorgdepartmentmulti" name="initiativeorgdepartmentmulti[]" multiple="multiple">
		  </select>
		</div>
	   
		  <input type="hidden" name="action" value="" />
		  <input type="hidden" name="initiativeorgid" id="initiativeorgid" value="" />
		  <input type="hidden" id="orginitiativetabletypeField" value="" />
		

		<div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Select Fields</label>

              <div class="d-flex flex-wrap gap-3 mt-2">

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="orgassetbudget">
                  <label class="form-check-label" for="orgassetbudget">
                    Total Asset Budget
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="orgassetrealization">
                  <label class="form-check-label" for="orgassetrealization">
                    Total Asset Realization
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="orgassetrealizationpercent">
                  <label class="form-check-label" for="orgassetrealizationpercent">
                    Total Asset Realization %
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="orgtotalliabilitiesasset">
                  <label class="form-check-label" for="orgtotalliabilitiesasset">
                    Total Liabilities Budget
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="orgtotalliabilitiesrealization">
                  <label class="form-check-label" for="orgtotalliabilitiesrealization">
                    Total Liabilities Realization
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="orgtotalliabilitiesrealizationpercent">
                  <label class="form-check-label" for="orgtotalliabilitiesrealizationpercent">
                    Total Liabilities Realization %
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="orgtotalbudget">
                  <label class="form-check-label" for="orgtotalbudget">
                    Total Budget
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="orgtotalrealization">
                  <label class="form-check-label" for="orgtotalrealization">
                    Total Budget Realization
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="orgtotalrealizationpercent">
                  <label class="form-check-label" for="orgtotalrealizationpercent">
                    Total Budget Realization %
                  </label>
                </div>

              </div>
            </div>
          </div>
		  <div class="modal-footer">
                   <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                       Cancel
                   </button>
                   <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
               </div>
	  </div>
	  </form>
	</div>
  </div>
</div>
</div>
<!-- END Initiative Register Setting -->

<!-- Kpi Register Setting -->
    <div
      class="modal fade"
      id="kpireg_setting"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel_1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4>KPI Register Settings</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            
          </div>
          <div class="modal-body">
			<form id="Kpi_register_Form">
            <div class="row">
              <div class="col-12 form-group">
                <label for="Name" data-i18n="Department">Department</label>
                <select id="kpidept" class="risk-dept-multi-select kpideptmulti kpidept" name="kpideptmulti[]" multiple="multiple">
                </select>
              </div>
              <div class="col-12 form-group">
                <label for="Name" data-i18n="Scorecard">Scorecard</label>
                <select class="risk-dept-multi-select kpiscorecard" name="kpiscorecard[]"  multiple="multiple">
                </select>
              </div>
              <div class="col-12 form-group">
                <label for="Name">Status</label>
                <select class="kpi-status-multi-select kpistatusmulti" name="kpistatusmulti[]" multiple="multiple">
                  <option value="Red">Red</option>
                  <option value="Amber">Amber</option>
                  <option value="Green">Green</option>
                </select>
              </div>
				<input type="hidden" name="action" value="" />
				<input type="hidden" name="kpiid" id="kpiregisterid" value="" />
				<input type="hidden" id="kpitabletypeField" value="" />
				<input type="hidden" id="kpitabledaterange" value="" />
				<input type="hidden" id="kpinamesmultiexist" value="" />
              <div class="col-12 form-group">
                <label for="Name">KPI's</label>
                <select class="kpi-reg-multi-select kpinamesmulti" name="kpinamesmulti[]" multiple="multiple">
                </select>
              </div>

            <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Select Fields</label>

              <div class="d-flex flex-wrap gap-3 mt-2">

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="kpiactual">
                  <label class="form-check-label" for="kpiactual">
                    Actual
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="kpitarget">
                  <label class="form-check-label" for="kpitarget">
                    Target
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="kpiytd">
                  <label class="form-check-label" for="kpiytd">
                    YTD
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="kpigap">
                  <label class="form-check-label" for="kpigap">
                    Gap
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="kpiscore">
                  <label class="form-check-label" for="kpiscore">
                    Index
                  </label>
                </div>

              </div>
            </div>
          </div>


               <div class="modal-footer">
                   <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                       Cancel
                   </button>
                   <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
               </div>
            </div>
			</form>
          </div>
        </div>
      </div>
    </div>
    <!-- END KPI Register Setting -->


<!-- Heat map Setting -->
    <div
      class="modal fade"
      id="heatreg_setting"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel_1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4>Heatmap Settings</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          
          </div>
          <div class="modal-body">
          <form id="heatmap_register_Form">
            <div class="row">
              <div class="col-12 form-group">
                <label for="Name" data-i18n="Departments">Departments</label>
                <select class="risk-dept-multi-select heatdepartmentmulti  heatdeptfilter" id="deptheatmapcockpit" name="heatdepartmentmulti[]" multiple="multiple">
                </select>
              </div>

              <input type="hidden" id="heatRiskInput" value="" />
              <div class="col-12 form-group">
                <label for="Name">Risks</label>
                <select class="risk-reg-multi-select heatnamesmulti heatriskfilter" name="heatnamesmulti[]" multiple="multiple">
                  <option value="All">All</option>
                </select>
              </div>

              <div class="col-12 form-group">
                <label for="Name">Status</label>
                <select class="risk-status-multi-select heatstatusmulti" name="heatstatusmulti[]" multiple="multiple">
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="VeryHigh">Very High</option>
                </select>
              </div>

              <div class="col-12 form-group">
                <label for="Name">Top Level</label>
                <select class="int-status-multi-select ermRiskRegRangemulti" id="heatmaptoplevel"  name="ermRiskRegRangemulti[]">
                  <option value="All">All</option>
                  <option value="10">10</option>
                  <option value="5">5</option>
                </select>
              </div>
				<input type="hidden" name="action" value="" />
				<input type="hidden" name="heatmapidid" id="heatmapidid" value="" />

              <div class="modal-footer">
                   <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                       Cancel
                   </button>
                   <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
               </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- END Heat map Setting -->
    
    <!-- Gantt map Setting -->
    <div
      class="modal fade"
      id="ganttreg_setting"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel_1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4>Gantt Chart Settings</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
           
          </div>
          <div class="modal-body">
          <form id="gantt_register_Form">
            <div class="row">
              <div class="col-12 form-group">
                <label for="Name" data-i18n="Departments" data-i18n="Departments">Departments</label>
                <select class="risk-dept-multi-select ganttdepartmentmulti deptganttinitiative" name="ganttdepartmentmulti[]" multiple="multiple">
                </select>
              </div>

              <div class="col-12 form-group">
                <label for="Name">Status</label>
                <select class="risk-status-multi-select ganttstatusmulti" name="ganttstatusmulti[]" multiple="multiple">
                  <option value="Red">Red</option>
                  <option value="Yellow">Yellow</option>
                  <option value="Green">Green</option>
                </select>
              </div>

              <div class="col-12 form-group">
                <label for="Name" data-i18n="Initiatives">Initiatives</label>
                <select class="risk-reg-multi-select ganttnamesmulti initiativeGanttFilter" name="ganttnamesmulti[]" multiple="multiple">
                  <option value="All">All</option>
                </select>
              </div>
              
				<input type="hidden" name="action" value="" />
				<input type="hidden" name="ganttid" id="ganttid" value="" />

               <div class="modal-footer">
                   <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                       Cancel
                   </button>
                   <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
               </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- END Initiative map Setting -->

		<!-- Color Palette -->
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
                    value="Save"
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
                        aria-controls="WidgetTypeOne-tab-pane" aria-selected="true">Charts</button>
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
                            <option value="chart-type-1">Chart</option>
                            <option value="text-type-1">Text</option>
                            <option value="table-type-1">Table</option>
                            <!-- <option value="map-chart-type-1">Map</option> -->
                        </select>
                    </div>
                    <!-- widget chart start -->
                    <div class="widget widget-1 chart-type-1">
                        <div class="grid g-2 chart-w-card">
                         <!-- <div class="icon" data-bs-toggle="tooltip" data-bs-title="Bubble">
                            <span class="border rounded" data-bs-toggle="tooltip" >
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="BubbleChart" src="images/widgets/bubble-chart-i.svg" alt="Bubble Chart" />
                            </span>
                            </div> -->

                            <!-- <div class="icon" data-bs-toggle="tooltip" data-bs-title="Column">
                            <span class="border rounded" data-bs-toggle="tooltip" >
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="ColumnChart" src="images/widgets/column-chart-i.svg" alt="Column Chart" />
                            </span>
                            </div> -->

                            <!-- <div class="icon" data-bs-toggle="tooltip" data-bs-title="Line">
                            <span class="border rounded" data-bs-toggle="tooltip">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="LineChart" src="images/widgets/line-chart-i.svg" alt="Line Chart" />
                            </span>
                            </div> -->

                            <!-- <div class="icon" data-bs-toggle="tooltip" data-bs-title="Area">
                            <span class="border rounded" data-bs-toggle="tooltip">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="AreaChart" src="images/widgets/area-chart-i.svg" alt="Area Chart" />
                            </span>
                            </div> -->

                            <!-- <div class="icon" data-bs-toggle="tooltip" data-bs-title="Pie">
                            <span class="border rounded" data-bs-toggle="tooltip">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="PieChart" src="images/widgets/pie-chart-i.svg" alt="Pie Chart" />
                            </span>
                            </div> -->

                            <!-- <div class="icon" data-bs-toggle="tooltip" data-bs-title="Waterfall">
                            <span class="border rounded" data-bs-toggle="tooltip">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="WaterfallChart" src="images/widgets/waterfall-chart-i.svg"
                                    alt="Waterfall Chart" />
                            </span>
                            </div> -->

                            <!-- <div class="icon" data-bs-toggle="tooltip" data-bs-title="Multi axis">
                            <span class="border rounded" data-bs-toggle="tooltip">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="MultiAxis" src="images/widgets/multi-axis-chart-i.svg"
                                    alt="Multi axis Chart" />
                            </span>
                            </div> -->

                            <!-- <div class="icon" data-bs-toggle="tooltip" data-bs-title="Stacked">
                            <span class="border rounded" data-bs-toggle="tooltip" >
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="StackedChart" src="images/widgets/stcked-chart-i.svg"
                                    alt="Stacked Chart" />
                            </span>
                            </div> -->

                            <!-- <div class="icon" data-bs-toggle="tooltip" data-bs-title="Radial">
                            <span class="border rounded" data-bs-toggle="tooltip" >
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="RadialMulti" src="images/widgets/radial-chart-i.svg" alt="Radial Chart" />
                            </span>
                            </div> -->

                       
<!-- StackedEcharts -->
<div class="icon" data-bs-toggle="tooltip" data-bs-title="StackedEcharts">
    <span style="border: 0.5px solid #dddd;height: 30px;width: 30px;display: inline-flex;align-items: center;justify-content: center;border-radius: 25%; overflow: hidden;">
        <img width="28" height="28"
             draggable="true"
             ondragstart="dragStart(event)"
             id="StackedEcharts"
            src="images/widgets/column-chart-i.svg"
             alt="StackedEcharts" />
    </span>
</div>

<!-- StackedHBcharts -->
<div class="icon" data-bs-toggle="tooltip" data-bs-title="StackedHBcharts">
   <span style="border: 0.5px solid #dddd;height: 30px;width: 30px;display: inline-flex;align-items: center;justify-content: center;border-radius: 25%; overflow: hidden;">
        <img width="28" height="28"   style="transform: rotate(90deg);"
             draggable="true"
             ondragstart="dragStart(event)"
             id="StackedHBcharts"
              src="images/widgets/column-chart-i.svg"
             alt="StackedHBcharts" />
    </span>
</div>

<!-- BarNegativeChart -->
<div class="icon" data-bs-toggle="tooltip" data-bs-title="BarNegativeChart">
    <span style="border: 0.5px solid #dddd;height: 30px;width: 30px;display: inline-flex;align-items: center;justify-content: center;border-radius: 25%; overflow: hidden;">
        <img width="28" height="28"
             draggable="true"
             ondragstart="dragStart(event)"
             id="BarNegativeChart"
             src="images/widgets/negative bar-i.png"
             alt="BarNegativeChart" />
    </span>
</div>

<!-- DoughnutROWcharts -->
<div class="icon" data-bs-toggle="tooltip" data-bs-title="DoughnutROWcharts">
    <span >
        <img width="28" height="28"
             draggable="true"
             ondragstart="dragStart(event)"
             id="DoughnutROWcharts"
             src="images/widgets/pie-chart-i.svg"
             alt="DoughnutROWcharts" />
    </span>
</div>

<!-- DoughnutRCcharts -->
<div class="icon" data-bs-toggle="tooltip" data-bs-title="DoughnutRCcharts">
    <span >
        <img width="28" height="28"
             draggable="true"
             ondragstart="dragStart(event)"
             id="DoughnutRCcharts"
            src="images/widgets/radial-chart-i.svg"
             alt="DoughnutRCcharts" />
    </span>
</div>

<!-- BarDatasetObjectArrayChart -->
<div class="icon" data-bs-toggle="tooltip" data-bs-title="BarDatasetObjectArrayChart">
    <span style="border: 0.5px solid #dddd;height: 30px;width: 30px;display: inline-flex;align-items: center;justify-content: center;border-radius: 25%; overflow: hidden;">
        <img width="28" height="28"
             draggable="true"
             ondragstart="dragStart(event)"
             id="BarDatasetObjectArrayChart"
             src="images/widgets/BarDatasetObjectArrayChart-i.png"
             alt="BarDatasetObjectArrayChart" />
    </span>
</div>

<!-- BarDynamicDataChart -->
<div class="icon" data-bs-toggle="tooltip" data-bs-title="BarDynamicDataChart">
    <span style="border: 0.5px solid #dddd;height: 30px;width: 30px;display: inline-flex;align-items: center;justify-content: center;border-radius: 25%; overflow: hidden;">
        <img width="28" height="28"
             draggable="true"
             ondragstart="dragStart(event)"
             id="BarDynamicDataChart"
             src="images/widgets/stcked-chart-i.svg"
             alt="BarDynamicDataChart" />
    </span>
</div>

<!-- MixedLineBarChart -->
<div class="icon" data-bs-toggle="tooltip" data-bs-title="MixedLineBarChart">
    <span>
        <img width="28" height="28"
             draggable="true"
             ondragstart="dragStart(event)"
             id="MixedLineBarChart"
            src="images/widgets/line-chart-i.svg"
             alt="MixedLineBarChart" />
    </span>
</div>

<!-- StackedAreaChart -->
<div class="icon" data-bs-toggle="tooltip" data-bs-title="StackedAreaChart">
    <span>
        <img width="28" height="28"
             draggable="true"
             ondragstart="dragStart(event)"
             id="StackedAreaChart"
             src="images/widgets/area-chart-i.svg"
             alt="StackedAreaChart" />
    </span>
</div>
 <!-- <div class="icon" data-bs-toggle="tooltip" data-bs-title="Gantt">
                            <span class="border rounded" data-bs-toggle="tooltip" >
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="GanttChart" src="images/widgets/gantt-i.svg" alt="Gantt Chart" />
                            </span>
                            </div> -->

                             <!-- Heat Map -->
<div class="icon" data-bs-toggle="tooltip" data-bs-title="Heat Map">
    <span class="border rounded">
        <img width="28" height="28"
             draggable="true"
             ondragstart="dragStart(event)"
             id="HeatMap"
             src="images/widgets/heatmap-i.svg"
             alt="HeatMap" />
    </span>
</div>

                        </div>
                    </div>
                    <!-- widget chart end -->

                    <!-- widget text start -->
                    <div class="widget widget-1 text-type-1" style="display: none;">

                        <div class="d-grid gap-2">
                            <div ondragstart="dragStart(event)" draggable="true" id="normalTextType1">
                                <div class="card text-start text-card text-card-main border"
                                     style="--stratroom-border-color:#d3f4f1; --stratroom-card-bg:#f2fbfa">
                                    <div
                                        class="card-header border-0 bg-transparent pb-0 px-2 gap-1 d-flex align-items-center justify-content-between">
                                        <div class="border rounded">
                                            <img width="16" height="16" src="images/dollar-i.svg" alt="dollar">
                                        </div>
                                       
                                        <div class="dropdown">
                                            <button class="btn btn-link p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <img width="16" height="16" src="images/menu-dot-vertical-i.svg">
                                            </button>
                                            <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                                <li>
                                                    <a class="dropdown-item" href="#text_setting" data-bs-toggle="modal" onclick="return false">
                                                        Settings
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="card-body p-2">
                                        <h4 class="card-title mb-2">--</h4>
                                        <h5 class="amount mb-1 mt-auto text-danger">--</h5>
                                        <div class="d-flex gap-2 align-items-center">
                                            <div class="amount-trend">--</div>
                                            <div class="d-flex gap-1 ms-auto">
                                                <a href="#kpi-story-card-modal" data-bs-toggle="modal" class="icon link">
                                                    <img width="16" height="16" src="images/link-i.svg" alt="Link">
                                                </a>
                                                <span class="icon trend-low">
                                                    <img width="16" height="16" src="images/down-i.png" alt="Trend Low">
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div ondragstart="dragStart(event)" draggable="true" id="normalTextType2">
                                <div class="card text-start text-card text-card-main border"
                                    style="--stratroom-border-color:#e1fec9; --stratroom-card-bg:#f1ffe5">
                                    <div
                                        class="card-header border-0 bg-transparent pb-0 px-2 gap-1 d-flex align-items-center justify-content-between">
                                        <div class="border rounded">
                                            <img width="16" height="16" src="images/percent-i.svg" alt="percent">
                                        </div>
                                        <div class="dropdown">
                                            <button class="btn btn-link p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <img width="16" height="16" src="images/menu-dot-vertical-i.svg">
                                            </button>
                                            <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                                <li>
                                                    <a class="dropdown-item" href="#text_setting" data-bs-toggle="modal" onclick="return false">
                                                        Settings
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="card-body p-2">
                                        <h4 class="card-title mb-2">--</h4>
                                        <h5 class="amount mb-1 mt-auto text-success">--</h5>
                                        <div class="d-flex gap-2 align-items-center">
                                            <div class="amount-trend">--</div>
                                            <div class="d-flex gap-1 ms-auto">
                                                <a href="#kpi-story-card-modal" data-bs-toggle="modal" class="icon link">
                                                    <img width="16" height="16" src="images/link-i.svg" alt="Link">
                                                </a>
                                                <span class="icon trend-up">
                                                    <img width="16" height="16" src="images/up-i.png" alt="Trend Low">
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div ondragstart="dragStart(event)" draggable="true" id="chartTextType">
                               <div class="card text-start text-card text-card-main border"
            style="--stratroom-border-color:#f5eeeb; --stratroom-card-bg:#faf7f6">
            <div class="card-header border-0 bg-transparent pb-0 px-2 gap-1 d-flex align-items-center justify-content-between">
                <div class="border rounded">
                    <img width="16" height="16" src="images/kpi-i.svg" alt="kpi">
                </div>
                <div class="dropdown">
                    <button class="btn btn-link p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img width="16" height="16" src="images/menu-dot-vertical-i.svg">
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                        <li>
                            <a class="dropdown-item" href="#text_setting" data-bs-toggle="modal" onclick="return false">
                                Settings
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="card-body p-2">
                <h4 class="card-title mb-2">--</h4>
                <h5 class="amount mb-1 mt-auto text-danger">--</h5>
                <div class="d-flex gap-2 align-items-center">
                    <div class="amount-trend">--</div>
                    <div class="d-flex gap-1 ms-auto">
                        <a href="#kpi-story-card-modal" data-bs-toggle="modal" class="icon link">
                            <img width="16" height="16" src="images/link-i.svg" alt="Link">
                        </a>
                        <span class="icon trend-low">
                            <!-- <img width="16" height="16" src="images/down-i.png" alt="Trend Low"> -->
                             --
                        </span>
                    </div>
                </div>
            </div>
        </div>
                            </div>

                            <div ondragstart="dragStart(event)" draggable="true" id="normalTextType4">
                                 <div class="card text-start text-card text-card-main border" style="--stratroom-border-color:#fef4c7; --stratroom-card-bg:#fffbea">
            <div class="card-header border-0 bg-transparent pb-0 px-2 gap-1 d-flex align-items-center justify-content-between">
              <div class="border rounded">
                <img width="16" height="16" src="images/hash-i.svg" alt="hash">
              </div>
              
              <div class="dropdown">
                <button class="btn btn-link p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img width="16" height="16" src="images/menu-dot-vertical-i.svg">
                </button>
                <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                  <li>
                    <a class="dropdown-item" href="#text_setting" data-bs-toggle="modal" onclick="return false">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-body p-2">
              <h4 class="card-title mb-2">--</h4>
              <h5 class="amount mb-1 mt-auto text-success">--</h5>
              <div class="d-flex gap-2 align-items-center">               
                <div class="amount-trend">--</div>
                <div class="d-flex gap-1 ms-auto">
                   <a href="#kpi-story-card-modal" data-bs-toggle="modal"
                                                            class="icon link">
                                                            <img width="16" height="16"
                                                                src="images/link-i.svg" alt="Link">
                                                        </a>
                <span class="icon trend-up">
                  <img width="16" height="16" src="images/up-i.png" alt="Trend Low">
                   --
                </span>
              </div>
              </div>
            </div>
          </div>
                            </div>

                        </div>
                    </div>
                    <!-- widget text end -->

                    <!-- widget table start -->
                    <div class="widget widget-1 table-type-1" style="display: none">
                        <div class="d-grid gap-2">
                            <div class="card-box">
                                <label for="drilldown" class="form-label p-0">Drill Down
                                    Table</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="drilldownDragDiv"
                                            src="images/widgets/drilldown-i.png" alt="Drilldown" />
                                    </div>
                                </div>
                            </div>
                            <div class="card-box">
                                <label for="kpidrilldownDragDiv" class="form-label p-0">KPI
                                    Drill Down Table</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="kpidrilldownDragDiv"
                                            src="images/widgets/drilldown-i.png"
                                            alt="KPI Drill Down Table" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="kpistatusCountDragDiv" class="form-label p-0">KPI Status
                                    Count</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="kpistatusCountDragDiv"
                                            src="images/widgets/drilldown-i.png" alt="KPI Status Count" />
                                    </div>
                                </div>
                            </div>
                            <div class="card-box">
                                <label for="projectstatusCountDragDiv" class="form-label p-0">Project
                                    Status Count</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="projectstatusCountDragDiv"
                                            src="images/widgets/drilldown-i.png"
                                            alt="Project Status Count" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="riskstatusCountDragDiv" class="form-label p-0">Risk
                                    Status Count</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="riskstatusCountDragDiv"
                                            src="images/widgets/drilldown-i.png" alt="Risk Status Count" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="riskEventReg" class="form-label p-0">Risk
                                    Event Data Base</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="riskEventReg"
                                            src="images/widgets/drilldown-i.png"
                                            alt="Risk Event Data Base" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="dataDragDiv" class="form-label p-0">Data
                                    Table</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="dataDragDiv"
                                            src="images/widgets/data-i.png" alt="Data Table" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="riskDragDiv" class="form-label p-0">Risk
                                    Register</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="riskDragDiv"
                                            src="images/widgets/risk-i.png" alt="Risk Register" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="ermRiskRegDragDiv" class="form-label p-0">ERM Risk
                                    Register</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="ermRiskRegDragDiv"
                                            src="images/widgets/risk-i.png" alt="Risk Register" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="reviewMonitoringReg" class="form-label p-0">Risk
                                    Monitoring</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="reviewMonitoringReg"
                                            src="images/widgets/risk-i.png"
                                            alt="Risk Monitoring" />
                                    </div>
                                </div>
                            </div>

                            <!-- <div class="card-box">
                                <label for="posReg" class="form-label p-0">BIA
                                    Report</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="posReg" src="images/widgets/risk-i.png"
                                            alt="BIA Report" />
                                    </div>
                                </div>
                            </div> -->

                            <div class="card-box">
                                <label for="rporeg" class="form-label p-0">BIA RPO
                                    Report</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="rporeg"
                                            src="images/widgets/risk-i.png" alt="BIA RPO Report" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="posReg" class="form-label p-0">BIA-POS
                                    Report</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="posReg"
                                            src="images/widgets/risk-i.png" alt="BIA –POS Report" />
                                    </div>
                                </div>
                            </div>
                            <div class="card-box">
                                <label for="reportreg" class="form-label p-0">Report Template</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="reportreg"
                                            src="images/widgets/risk-i.png" alt="BIA –POS Report" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="posTradingReg" class="form-label p-0">Business
                                    Process Based on Trading Hours</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="posTradingReg"
                                            src="images/widgets/risk-i.png"
                                            alt="Business Process Based on Trading Hours" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="RiskEventFrequencyReg" class="form-label p-0">Risk Events
                                    Frequency of Occurrence</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="RiskEventFrequencyReg"
                                            src="images/widgets/risk-i.png"
                                            alt="Risk Events Frequency of Occurrence" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="processCriticalReg" class="form-label p-0">Process
                                    Business Critical</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="processCriticalReg"
                                            src="images/widgets/risk-i.png"
                                            alt="Process Business Critical" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="drcavailability" class="form-label p-0">List of
                                    Availability of a DRC system </label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="drcavailability"
                                            src="images/widgets/risk-i.png"
                                            alt="List of Availability of a DRC system" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="initiativeDragDiv" class="form-label p-0">Initiative
                                    Register </label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="initiativeDragDiv" src="images/widgets/risk-i.png"
                                            alt="Initiative Register" />
                                    </div>
                                </div>
                            </div>

                             <div class="card-box">
                                <label for="intProgressCountDiv" class="form-label p-0">Initiative Progress Count</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="intProgressCountDiv" src="images/widgets/risk-i.png"
                                            alt="Initiative Progress Count" />
                                    </div>
                                </div>
                            </div>
                             <div class="card-box">
                                <label for="kpiregisterDragDiv" class="form-label p-0">KPI Register</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="kpiregisterDragDiv" src="images/widgets/risk-i.png"
                                            alt="KPI Register" />
                                    </div>
                                </div>
                            </div>

                            <!-- <div class="card-box">
                                <label for="cockTypeDiv" class="form-label p-0">R M
                                    Table</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="cockTypeDiv"
                                            src="images/widgets/risk-i.png" alt="R M Table" />
                                    </div>
                                </div>
                            </div>

                            <div class="card-box">
                                <label for="singleWindow" class="form-label p-0">Single
                                    Window</label>
                                <div class="card table-card border p-0">
                                    <div class="card-body p-1">
                                        <img width="220" height="80" class="img-fluid" ondragstart="dragStart(event)"
                                            draggable="true" id="singleWindow"
                                            src="images/widgets/risk-i.png" alt="Single Window" />
                                    </div>
                                </div>
                            </div> -->

                        </div>
                    </div>
                    <!-- widget table end -->
                </div>
                <div class="tab-pane fade" id="WidgetTypeTwo-tab-pane" role="tabpanel"
                    aria-labelledby="WidgetTypeTwo-tab" tabindex="0">
                    <div class="browser-default text-start mb-3">
                        <!-- <label for="widget_type_02" class="form-label">Widget Type 2</label> -->
                        <select id="widget_type_02" name="Initiative_owner" class="form-select form-select-sm"
                            aria-invalid="false">
                            <option value="chart-type-2">Chart</option>
                            <option value="drilldown-type-2">Drilldown Chart</option>
                        </select>
                    </div>
                    <!-- widget chart start -->
                    <div class="widget widget-2 chart-type-2">
                        <div class="grid g-2 chart-w-card">

                            <div class="icon" data-bs-toggle="tooltip" data-bs-title="Bubble">
                            <span class="border rounded" data-bs-toggle="tooltip" data-bs-title="Bubble">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="bubble-chart-type-02" src="images/widgets/bubble-chart-i.svg"
                                    alt="Bubble Chart" />
                            </span>
                            </div>

                            <div class="icon" data-bs-toggle="tooltip" data-bs-title="Bubble">
                            <span class="border rounded" data-bs-toggle="tooltip" data-bs-title="Column">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="column-chart-type-02" src="images/widgets/column-chart-i.svg"
                                    alt="Column Chart" />
                            </span>
                            </div>

                            <div class="icon" data-bs-toggle="tooltip" data-bs-title="Bubble">
                            <span class="border rounded" data-bs-toggle="tooltip" data-bs-title="Line">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="line-chart-type-02" src="images/widgets/line-chart-i.svg"
                                    alt="Line Chart" />
                            </span>
                            </div>

                            <div class="icon" data-bs-toggle="tooltip" data-bs-title="Bubble">
                            <span class="border rounded" data-bs-toggle="tooltip" data-bs-title="Area">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="area-chart-type-02" src="images/widgets/area-chart-i.svg"
                                    alt="Area Chart" />
                            </span>
                            </div>

                            <div class="icon" data-bs-toggle="tooltip" data-bs-title="Bubble">
                            <span class="border rounded" data-bs-toggle="tooltip" data-bs-title="Pie">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="pie-chart-type-02" src="images/widgets/pie-chart-i.svg" alt="Pie Chart" />
                            </span>
                            </div>

                            <!-- <div class="icon" data-bs-toggle="tooltip" data-bs-title="Bubble">
                            <span class="border rounded" data-bs-toggle="tooltip" data-bs-title="Waterfall">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="waterfall-chart-type-02" src="images/widgets/waterfall-chart-i.svg"
                                    alt="Waterfall Chart" />
                            </span>
                            </div> -->

                            <div class="icon" data-bs-toggle="tooltip" data-bs-title="Bubble">
                            <span class="border rounded" data-bs-toggle="tooltip" data-bs-title="Multi axis">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="multiaxis-chart-type-02" src="images/widgets/multi-axis-chart-i.svg"
                                    alt="Multi axis Chart" />
                            </span>
                            </div>

                            <div class="icon" data-bs-toggle="tooltip" data-bs-title="Bubble">
                            <span class="border rounded" data-bs-toggle="tooltip" data-bs-title="Stacked">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="stacked-chart-type-02" src="images/widgets/stcked-chart-i.svg"
                                    alt="Stacked Chart" />
                            </span>
                            </div>

                            <!-- <div class="icon" data-bs-toggle="tooltip" data-bs-title="Bubble">
                            <span class="border rounded" data-bs-toggle="tooltip" data-bs-title="Negative Column">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="negativeColumn-chart-type-02" src="images/widgets/radial-chart-i.svg"
                                    alt="Negative Column" />
                            </span>
                            </div> -->

                            <div class="icon" data-bs-toggle="tooltip" data-bs-title="Bubble">
                            <span class="border rounded" data-bs-toggle="tooltip" data-bs-title="Radial Chart">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="radialMulti-chart-type-02" src="images/widgets/radial-chart-i.svg"
                                    alt="Radial Chart" />
                            </span>
                            </div>

                        </div>
                    </div>
                    <!-- widget chart end -->
                    <!-- widget drilldown start -->
                    <div class="widget widget-2 drilldown-type-2" style="display: none;">
                        <div class="grid g-2 chart-w-card">

                            <div class="icon" data-bs-toggle="tooltip" data-bs-title="Bubble">
                            <span class="border rounded" data-bs-toggle="tooltip" data-bs-title="Bubble">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="bubble-dchart-type-02" src="images/widgets/bubble-chart-i.svg"
                                    alt="Bubble Chart" />
                            </span>
                            </div>

                            <div class="icon" data-bs-toggle="tooltip" data-bs-title="Bubble">
                            <span class="border rounded" data-bs-toggle="tooltip" data-bs-title="Column">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="column-dchart-type-02" src="images/widgets/column-chart-i.svg"
                                    alt="Column Chart" />
                            </span>
                            </div>

                            <div class="icon" data-bs-toggle="tooltip" data-bs-title="Bubble">
                            <span class="border rounded" data-bs-toggle="tooltip" data-bs-title="Line">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="line-dchart-type-02" src="images/widgets/line-chart-i.svg"
                                    alt="Line Chart" />
                            </span>
                            </div>

                            <div class="icon" data-bs-toggle="tooltip" data-bs-title="Bubble">
                            <span class="border rounded" data-bs-toggle="tooltip" data-bs-title="Area">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="area-dchart-type-02" src="images/widgets/area-chart-i.svg"
                                    alt="Area Chart" />
                            </span>
                            </div>
                            <div class="icon" data-bs-toggle="tooltip" data-bs-title="Bubble">
                            <span class="border rounded" data-bs-toggle="tooltip" data-bs-title="Multi axis">
                                <img width="28" height="28" ondragstart="dragStart(event)" draggable="true"
                                    id="multiaxis-dchart-type-02" src="images/widgets/multi-axis-chart-i.svg"
                                    alt="Multi axis Chart" />
                            </span>
                            </div>
                        </div>
                    </div>
                    <!-- widget drilldown end -->
                </div>

                <div class="chart-column column-option">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="updategridRadio" id="column2" checked>
                        <label class="form-check-label" for="column2">
                            2 Column
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="updategridRadio" id="column3">
                        <label class="form-check-label" for="column3">
                            3 Column
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
	</div>
	<!--#END View -->
	<div id="downloadpdf" style="display: none;">
		<div id="downloaddrillTablepdf" style="padding-left:15px;padding-right:15px;">
		<br>
		<div><h3><center id="downloadpdftitle"></center></h3></div><br>
		<div class="table-responsive sub_initiatives tableheight" id="downloadPdfView">
		</div>
		</div>
	</div>

   
	

	<!-- Chart Period -->
	<div class="modal fade" id="chart_period" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h4>Chart Period</h4>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						
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

						  <div class="modal-footer">
                   <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                       Cancel
                   </button>
                   <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
               </div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- END Chart Period -->
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
	<!-- Drill Down Table View -->
	<div class="modal fade" id="drilldown_view" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-header">
					<h4>Drill Down Table View</h4>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						
				</div>
				<div class="modal-body">
					<div class="table-responsive tableheight" id="drilldownTableView">
					</div>
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
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						
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
											<label class="form-check-label" data-i18n="Target"> <input
												class="form-check-input" type="checkbox" value="" />
												Target <span class="form-check-sign"> <span
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
						  <div class="modal-footer">
                   <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                       Cancel
                   </button>
                   <button class="btn btn-primary initative_save_btn" value="Save">Save</button>
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
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						
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
	
		<!-- RISK Data Table View -->
	<div class="modal fade" id="viewriskregisterdatatable_view" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 100%;margin-top:3px;">
			<div class="modal-content">
				<div class="modal-header">
					<h4 id="viewtableriskinitiativeheader"></h4>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body sub_initiatives" style="height: 550px;">
					<div class="tabledata table-responsive tableheight" style="margin-top: -5px;
    margin-left: -15px;width: 103%;height:500px ;">
						<table
							class="table dashboard-task-infos align-center dashboard-table"
							id="riskRegisterdataTableView" style="margin-bottom: 0px !important; height: 200px;">
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- END RISK Data Table View  -->

	<!-- Review Data Table View -->
	<div class="modal fade" id="viewreviewregisterdatatable_view" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-header">
					<h4 id="viewtablereviewinitiativeheader"></h4>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						
				</div>
				<div class="modal-body sub_initiatives">
					<div class="reviewtabledata table-responsive tableheight" style="height:400px;">
						<table
							class="table dashboard-task-infos align-center dashboard-table reviewRegisterdataTableView"
							id="" style="margin-bottom: 0px !important;height: 200px !important;">
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- END Review Data Table View  -->
  
  <!-- ERM Risk Register Data Table View -->
	<div class="modal fade" id="viewermriskregisterdatatable_view" tabindex="-1" role="dialog"
  aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
    <div class="modal-content">
      <div class="modal-header">
        <h4 id="viewtablereviewinitiativeheader"></h4>
       	<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body sub_initiatives" style="height: 550px;">
        <div class="ermriskregtabledata tabledata table-responsive tableheight" style="height:400px;">
          <table
            class="table dashboard-task-infos align-center dashboard-table ermriskregisterdataTableView"
            id="" style="margin-bottom: 0px !important;height: 200px !important;">
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- END ERM Risk Register Data Table View  -->

   <!-- Risk Status Count Table View -->
	<div class="modal fade" id="viewriskcountregisterdatatable_view" tabindex="-1" role="dialog"
  aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
    <div class="modal-content">
      <div class="modal-header">
        <h4 id="viewtablereviewinitiativeheader"></h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          
      </div>
      <div class="modal-body sub_initiatives">
        <div class="riskcounttabledata table-responsive tableheight" style="height:400px;">
          <table
            class="table dashboard-task-infos align-center dashboard-table riskCountRegisterdataTableView"
            id="" style="margin-bottom: 0px !important;height: 200px !important;height: 200px !important;">
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- END Risk Status Count Table View  -->
   <!-- Risk Events Frequency of Occurrence Table View -->
   <div class="modal fade" id="viewRiskeventfreqdatatable_view" tabindex="-1" role="dialog"
   aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
     <div class="modal-content">
       <div class="modal-header">
         <h4 id="viewtableRiskeventfreqinitiativeheader"></h4>
         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
       </div>
       <div class="modal-body sub_initiatives">
         <div class="Riskeventfreqtabledata table-responsive tableheight" style="height:400px;">
           <table
             class="table dashboard-task-infos align-center dashboard-table RiskeventfreqdataTableView"
             id="" style="margin-bottom: 0px !important;height: 200px !important;">
           </table>
         </div>
       </div>
     </div>
   </div>
 </div>
 <!-- END Risk Events Frequency of Occurrence Table View  -->
  	<!-- Risk event Data Table View -->
	<div class="modal fade" id="viewriskeventregisterdatatable_view" tabindex="-1" role="dialog"
  aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
    <div class="modal-content">
      <div class="modal-header">
        <h4 id="viewtableriskeventinitiativeheader"></h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          
      </div>
      <div class="modal-body sub_initiatives">
        <div class="riskeventtabledata table-responsive tableheight" style="height:400px;">
          <table
            class="table dashboard-task-infos align-center dashboard-table riskEventRegisterdataTableView"
            id="" style="margin-bottom: 0px !important;height: 200px !important;">
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- END Risk evet Data Table View  -->
 	<!-- POS Data Table View -->
   <div class="modal fade" id="viewposregisterdatatable_view" tabindex="-1" role="dialog"
   aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
     <div class="modal-content">
       <div class="modal-header">
         <h4 id="viewtableposinitiativeheader"></h4>
         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
       </div>
       <div class="modal-body sub_initiatives">
         <div class="postabledata table-responsive tableheight" style="height:400px;">
           <table
             class="table dashboard-task-infos align-center dashboard-table posRegisterdataTableView"
             id="" style="margin-bottom: 0px !important;height: 200px !important;">
           </table>
         </div>
       </div>
     </div>
   </div>
 </div>
 <!-- END POS Data Table View  -->
<!-- Process Based on Trading Hours Data Table View -->
<div class="modal fade" id="viewtradinghoursregisterdatatable_view" tabindex="-1" role="dialog"
    aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 90%">
      <div class="modal-content">
        <div class="modal-header">
          <h4 id="viewtabletradinghoursinitiativeheader"></h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            
        </div>
        <div class="modal-body sub_initiatives">
          <div class="tradinghourstabledata table-responsive tableheight" style="height:400px;">
            <table
              class="table dashboard-task-infos align-center dashboard-table tradingHoursRegisterdataTableView"
              id="" style="margin-bottom: 0px !important;height: 200px !important;">
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- END Process Based on Trading Hours Data Table View  -->
  	<!-- Rpo Data Table View -->
	<div class="modal fade" id="viewrporegisterdatatable_view" tabindex="-1" role="dialog"
  aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
    <div class="modal-content">
      <div class="modal-header">
        <h4 id="viewtablerpoinitiativeheader"></h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          
      </div>
      <div class="modal-body sub_initiatives">
        <div class="rpotabledata table-responsive tableheight" style="height:400px;">
          <table
            class="table dashboard-task-infos align-center dashboard-table rpoRegisterdataTableView"
            id="" style="margin-bottom: 0px !important;height: 200px !important;">
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- END RPO Data Table View  -->

 <div class="modal custom-modal fade" id="viewreportregisterdatatable_view" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="viewtablereportinitiativeheader"></h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                

                    <table class="table table-bordered w-100 text-nowrap" id="reportTemplatedataTableView" style="--stratroom-border-color:rgba(var(--stratroom-black-rgb),0.04)">
                                    </table>
                </div>
            </div>
        </div>
    </div>
  	<!-- Report Template Data Table View -->
  
  <!-- END Report Template Data Table View  -->


	<!-- Process Business Critical Data Table View -->
	<div class="modal fade" id="viewcriticalregisterdatatable_view" tabindex="-1" role="dialog"
  aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
    <div class="modal-content">
      <div class="modal-header">
        <h4 id="viewtablecriticalinitiativeheader"></h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          
      </div>
      <div class="modal-body sub_initiatives">
        <div class="criticaltabledata table-responsive tableheight" style="height:400px;">
          <table
            class="table dashboard-task-infos align-center dashboard-table criticalRegisterdataTableView"
            id="" style="margin-bottom: 0px !important;">
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- END Process Business Critical Data Table View  -->

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
					<div class="Columnchart"></div>
					<div id="Columnchart-1"></div>
					<div id="Columnlarge-1" style="display: none;"></div>
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
					<div class="Areachart"></div>
					<div id="Areachart-1"></div>
					<div id="Arealarge-1" style="display: none;"></div>
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
					<div class="Multiaxis"></div>
					<div id="Multiaxis-1"></div>
					<div id="Multiaxislarge-1" style="display: none;"></div>
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
					<div id="Bubblechart-1"></div>
					<div class="Bubblechart"></div>
					<div id="Bubblelarge-1" style="display: none;"></div>
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
					<div class="Linechart"></div>
					<div id="Linechart-1"></div>
					<div id="Linelarge-1" style="display: none;"></div>
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
					<div class="Piechart"></div>
					<div id="Piechart-1"></div>
					<div id="Pielarge-1" style="display: none;"></div>
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
					<div class="Waterfallchart"></div>
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
					<div class="Stackedchart"></div>
					<div id="Stackedchart-1"></div>
					<div id="Stackedlarge-1" style="display: none;"></div>
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
					<div class="RadialMultichart"></div>
					<div id="RadialMultichart-1"></div>
					<div id="RadialMultilarge-1" style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- END Column Large -->
	
		<!-- Gantt Large -->
	<div class="modal fade" id="gantt-large" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="GanttMultichart"></div>
					<div id="GanttMultichart-1"></div>
					<div id="GanttMultilarge-1" style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- END Gantt Large -->

	<!-- Heatmap Large -->
	<div class="modal fade" id="heatmap-large" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="Heatmap"></div>
					<div id="Heatmap-1" style="height: 338px;"></div>
					<div id="Heatmaplarge-1" style="display: none;"></div>
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
					<div style="height: 338px;" id="Maplarge"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- END Heatmap Large -->

  <!-- E-Charts -->
   <div class="modal fade" id="StackedEcharts-large" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="StackedEcharts"></div>
					<div id="StackedEcharts-1"></div>
					<div id="StackedEchartslarge-1" style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>

  <div class="modal fade" id="StackedHBcharts-large" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="StackedHBcharts"></div>
					<div id="StackedHBcharts-1"></div>
					<div id="StackedHBchartslarge-1" style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>

  <div class="modal fade" id="BarNegativeChart-large" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="BarNegativeChart"></div>
					<div id="BarNegativeChart-1"></div>
					<div id="BarNegativeChartlarge-1" style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>
  
  <div class="modal fade" id="DoughnutROWcharts-large" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="DoughnutROWcharts"></div>
					<div id="DoughnutROWcharts-1"></div>
					<div id="DoughnutROWchartslarge-1" style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>

  <div class="modal fade" id="DoughnutRCcharts-large" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="DoughnutRCcharts"></div>
					<div id="DoughnutRCcharts-1"></div>
					<div id="DoughnutRCchartslarge-1" style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>

  <div class="modal fade" id="BarDatasetObjectArrayChart-large" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="BarDatasetObjectArrayChart"></div>
					<div id="BarDatasetObjectArrayChart-1"></div>
					<div id="BarDatasetObjectArrayChartlarge-1" style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>

  <div class="modal fade" id="BarDynamicDataChart-large" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="BarDynamicDataChart"></div>
					<div id="BarDynamicDataChart-1"></div>
					<div id="BarDynamicDataChartlarge-1" style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>

  <div class="modal fade" id="MixedLineBarChart-large" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="MixedLineBarChart"></div>
					<div id="MixedLineBarChart-1"></div>
					<div id="MixedLineBarChartlarge-1" style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>

  <div class="modal fade" id="StackedAreaChart-large" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 80%">
			<div class="modal-content">
				<div class="modal-body">
					<div class="StackedAreaChart"></div>
					<div id="StackedAreaChartStackedAreaChart-1"></div>
					<div id="StackedAreaChartlarge-1" style="display: none;"></div>
				</div>
			</div>
		</div>
	</div>
   <!--END E-Charts -->

	<!-- KPI Calculator text -->
<div class="modal custom-modal fade" 
     id="text_kpi_formula_popup" 
     data-bs-backdrop="static" 
     data-bs-keyboard="false"
     tabindex="-1" 
     aria-hidden="true">

  <div class="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-lg-down">
    <div class="modal-content">

      <!-- Header -->
      <div class="modal-header">
        <h5 class="modal-title">KPI Calculator</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="textclosePopupId"></button>
      </div>

      <!-- Body -->
      <div class="modal-body p-2">

        <!-- Field Name Dropdown (optional: add if needed like in chart version) -->
        <!-- Uncomment if you want the same field selector as in chart modal -->
        <!--
        <div class="p-2 mb-3">
          <label class="form-label"><small>Field Name</small></label>
          <select class="form-select form-select-sm select-dropdown-kpi-calculator" id="textfieldId">
            <option value disabled selected hidden>Select Field Name</option>
            <option value="Actual">Actual</option>
            <option value="Target">Target</option>
            <option value="Budget">Budget</option>
            <option value="Forecast">Forecast</option>
            <option value="Gap">Gap</option>
          </select>
        </div>
        -->

        <div class="card border-0">
          <div class="card-header bg-transparent border-0">
            <ul class="nav nav-underline gap-3" role="tablist">
              <li class="nav-item">
                <button class="nav-link text-uppercase active" 
                        data-bs-toggle="tab" 
                        data-bs-target="#formula_builder_text" 
                        type="button">
                  Formula Builder
                </button>
              </li>
              <li class="nav-item">
                <button class="nav-link text-uppercase"
                        data-bs-toggle="tab"
                        data-bs-target="#summary_calculation_text"
                        type="button">
                  Summary Calculation
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div class="card-body">
          <div class="tab-content">

            <!-- Formula Builder Tab -->
            <div class="tab-pane fade show active" id="formula_builder_text">

              <textarea 
                class="form-control mb-3 browser-default" 
                id="textwidformula" 
                rows="2"
                style="font-size:11px !important;"
                placeholder="Build your formula here..."></textarea>

              <!-- Operators -->
              <div class="d-flex flex-wrap gap-2 mb-3">
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateTextFormula('+')">+</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateTextFormula('-')">-</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateTextFormula('*')">*</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateTextFormula('/')">/</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateTextFormula('%')">%</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateTextFormula('(')">(</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateTextFormula(')')">)</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateTextFormula('[')">[</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateTextFormula(']')">]</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateTextFormula(':')">:</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateTextFormula('AND')">AND</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateTextFormula('OR')">OR</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateTextFormula('NOT')">NOT</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateTextFormula('IN')">IN</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateTextFormula('==')">==</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateTextFormula('!=')">!=</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateTextFormula('>')">&gt;</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateTextFormula('<')">&lt;</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateTextFormula('>=')">&gt;=</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateTextFormula('<=')">&lt;=</button>
              </div>

              <!-- Panels Row -->
              <div class="row g-3">
                <!-- Fields & Measures -->
                <div class="col-md-4">
                  <div class="card h-100">
                    <div class="card-header">
                      <h6 class="mb-0">Fields & Measures</h6>
                    </div>
                    <div class="card-body p-2">
                      <input type="text" 
                             class="form-control form-control-sm browser-default"
                             id="fieldtextmeasurefilter"
                             onkeyup="fieldtextmeasurefilter()"
                             placeholder="Search">
                      <ul class="list-group mt-2 overflow-auto" 
                          style="max-height:200px" 
                          id="textmeasureNames">
                        <!-- Dynamically populated -->
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Functions -->
                <div class="col-md-4">
                  <div class="card h-100">
                    <div class="card-header"><h6 class="mb-0">Functions</h6></div>
                    <div class="card-body p-2">
                      <ul class="list-group overflow-auto" style="max-height:220px">
                        <li class="list-group-item" onclick="updateTextFormula('if','if')">if</li>
                        <li class="list-group-item" onclick="updateTextFormula('avg','avg')">avg</li>
                        <li class="list-group-item" onclick="updateTextFormula('agg','agg')">agg</li>
                        <li class="list-group-item" onclick="updateTextFormula('count','count')">count</li>
                        <li class="list-group-item" onclick="updateTextFormula('sum','sum')">sum</li>
                        <li class="list-group-item" onclick="updateTextFormula('min','min')">min</li>
                        <li class="list-group-item" onclick="updateTextFormula('max','max')">max</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Function Description -->
                <div class="col-md-4">
                  <div class="card h-100">
                    <div class="card-header"><h6 class="mb-0">Function Description</h6></div>
                    <div class="card-body">
                      <h6 class="formulaheaderdesc fw-bold mb-2"></h6>
                      <p class="formulacontentdesc text-muted mb-0"></p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="mt-3">
                <input type="hidden" id="textformulaHandletype">
                <button class="btn btn-secondary btn-sm me-2" onclick="handleTextFormulaValidate()">Validate</button>
                <button class="btn btn-primary btn-sm" onclick="handleTextFormulaAdd()">Add</button>
              </div>

            </div>

            <!-- Summary Calculation Tab -->
            <div class="tab-pane fade" id="summary_calculation_text">
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

          </div>
        </div>

      </div>
    </div>
  </div>
</div>
	<!-- END KPI Calculator -->


<!-- KPI Calculator -->
<div class="modal custom-modal fade" 
     id="kpi_formula_popup" 
     data-bs-backdrop="static" 
     data-bs-keyboard="false"
     tabindex="-1" 
     aria-hidden="true">

  <div class="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-lg-down">
    <div class="modal-content">

      <!-- Header -->
      <div class="modal-header">
        <h5 class="modal-title">KPI Calculator</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closePopupId"></button>
      </div>

      <!-- Body -->
      <div class="modal-body p-2">

        <!-- Field Name Dropdown (Commented per your original structure) -->
        <!--
        <div class="p-2 mb-3">
          <label class="form-label"><small>Field Name</small></label>
          <select class="form-select form-select-sm browser-default" id="fieldId">
            <option value="Actual" data-i18n="Actual">Actual</option>
            <option value="Target" data-i18n="Target">Target</option>
            <option value="Budget" data-i18n="Budget">Budget</option>
            <option value="Forecast" data-i18n="Forecast">Forecast</option>
            <option value="Gap" data-i18n="Gap">Gap</option>
          </select>
        </div>
        -->

        <div class="card border-0">
          <div class="card-header bg-transparent border-0">
            <ul class="nav nav-underline gap-3" role="tablist">
              <li class="nav-item">
                <button class="nav-link text-uppercase active" 
                        data-bs-toggle="tab" 
                        data-bs-target="#formula_builder" 
                        type="button">
                  Formula Builder
                </button>
              </li>
              <li class="nav-item">
                <button class="nav-link text-uppercase"
                        data-bs-toggle="tab"
                        data-bs-target="#summary_calculation"
                        type="button">
                  Summary Calculation
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div class="card-body">
          <div class="tab-content">

            <!-- Formula Builder Tab -->
            <div class="tab-pane fade show active" id="formula_builder">

              <textarea 
                class="form-control mb-3 browser-default" 
                id="datatableformula" 
                rows="2"
                style="font-size:11px !important;"
                placeholder="Build your formula here..."></textarea>

              <!-- Operators (including [ ] as in your original) -->
              <div class="d-flex flex-wrap gap-2 mb-3">
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateFormula('+')">+</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateFormula('-')">-</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateFormula('*')">*</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateFormula('/')">/</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateFormula('%')">% </button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateFormula('(')">(</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateFormula(')')">)</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateFormula('[')">[</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateFormula(']')">]</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateFormula(':')">:</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateFormula('AND')">AND</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateFormula('OR')">OR</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateFormula('NOT')">NOT</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateFormula('IN')">IN</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateFormula('==')">==</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateFormula('!=')">!=</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateFormula('>')">&gt;</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateFormula('<')">&lt;</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateFormula('>=')">&gt;=</button>
                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updateFormula('<=')">&lt;=</button>
              </div>

              <!-- Panels Row -->
              <div class="row g-3">
                <!-- Fields & Measures -->
                <div class="col-md-4">
                  <div class="card h-100">
                    <div class="card-header">
                      <h6 class="mb-0">Fields & Measures</h6>
                    </div>
                    <div class="card-body p-2">
                      <input type="text" 
                             class="form-control form-control-sm browser-default"
                             id="fieldmeasurefilter"
                             onkeyup="fieldmeasurefilter()"
                             placeholder="Search">
                      <ul class="list-group mt-2 overflow-auto" 
                          style="max-height:200px" 
                          id="measureNames">
                        <!-- Dynamically populated -->
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Functions (Preserved order from your original) -->
                <div class="col-md-4">
                  <div class="card h-100">
                    <div class="card-header"><h6 class="mb-0">Functions</h6></div>
                    <div class="card-body p-2">
                      <ul class="list-group overflow-auto" style="max-height:220px">
                        <li class="list-group-item" onclick="updateFormula('if','if')">if</li>
                        <li class="list-group-item" onclick="updateFormula('avg','avg')">avg</li>
                        <li class="list-group-item" onclick="updateFormula('agg','agg')">agg</li>
                        <li class="list-group-item" onclick="updateFormula('count','count')">count</li>
                        <li class="list-group-item" onclick="updateFormula('sum','sum')">sum</li>
                        <li class="list-group-item" onclick="updateFormula('max','max')">max</li>
                        <li class="list-group-item" onclick="updateFormula('min','min')">min</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Function Description -->
                <div class="col-md-4">
                  <div class="card h-100">
                    <div class="card-header"><h6 class="mb-0">Function Description</h6></div>
                    <div class="card-body">
                      <h6 class="formulaheaderdesc fw-bold mb-2"></h6>
                      <p class="formulacontentdesc text-muted mb-0"></p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Buttons (Add = primary per modern UX) -->
              <div class="mt-3">
                <input type="hidden" id="kpiformulaHandletype">
                <button class="btn btn-secondary btn-sm me-2" onclick="handleFormulaValidate()">Validate</button>
                <button class="btn btn-primary btn-sm" onclick="handleFormulaAdd()">Add</button>
              </div>

            </div>

            <!-- Summary Calculation Tab -->
            <div class="tab-pane fade" id="summary_calculation">
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

          </div>
        </div>

      </div>
    </div>
  </div>
</div>
	<!-- END KPI Calculator -->

  <!-- kkkkkkkkkkkkkk -->

  <!-- kkkkkkkkkkkkkk -->

<!-- chart KPI Calculator -->

<!-- chart KPI Calculator -->
  
<!-- <div class="modal custom-modal fade" id="chart_formula_popup" data-bs-backdrop="static" role="dialog" data-bs-keyboard="false"
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

                           
                            <div class="d-flex flex-wrap gap-2 mb-3">
                              
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

                            
                            <div class="row g-3">

                     
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

                     
                            <div class="mt-3">
                                <input type="hidden" id="chartormulaHandletype">
                                <button class="btn btn-secondary btn-sm"
                                    onclick="handleChartFormulaValidate()">Validate</button>
                                <button class="btn btn-primary btn-sm"
                                    onclick="handleChartFormulaAdd()">Add</button>
                            </div>

                        </div>

                     
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

                    </div> 
                </div> 

            </div> 

        </div>
    </div>

</div> -->


  <div class="modal custom-modal fade" 
     id="chart_formula_popup" 
     data-bs-backdrop="static" 
     data-bs-keyboard="false"
     tabindex="-1" 
     aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-lg-down">
        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">KPI Calculator</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close" id="chartclosePopupId"></button>
            </div>

            <div class="modal-body">

                <div class="p-2 mb-3">
                    <label class="form-label"><small>Field Name</small></label>
                    <select class="form-select form-select-sm select-dropdown-kpi-calculator" id="chartfieldId">
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
                                        type="button">
                                    Formula Builder
                                </button>
                            </li>
                            <li class="nav-item">
                                <button class="nav-link text-uppercase"
                                        data-bs-toggle="tab"
                                        data-bs-target="#summary_calculation1"
                                        type="button">
                                    Summary Calculation
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="card-body">
                    <div class="tab-content">

                        <!-- Formula builder -->
                        <div class="tab-pane fade show active" id="formula_builder1">

                            <textarea class="form-control mb-3" 
                                      id="chartsettingformula" 
                                      rows="2"
                                      style="font-size:11px !important;"></textarea>

                            <div class="d-flex flex-wrap gap-2 mb-3">
                                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updatechartFormula('+')">+</button>
                                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updatechartFormula('-')">-</button>
                                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updatechartFormula('*')">*</button>
                                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updatechartFormula('/')">/</button>
                                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updatechartFormula('%')">%</button>
                                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updatechartFormula('(')">(</button>
                                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updatechartFormula(')')">)</button>
                                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updatechartFormula('[')">[</button>
                                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updatechartFormula(']')">]</button>
                                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updatechartFormula(':')">:</button>
                                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updatechartFormula('AND')">AND</button>
                                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updatechartFormula('OR')">OR</button>
                                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updatechartFormula('NOT')">NOT</button>
                                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updatechartFormula('IN')">IN</button>
                                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updatechartFormula('==')">==</button>
                                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updatechartFormula('!=')">!=</button>
                                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updatechartFormula('>')">&gt;</button>
                                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updatechartFormula('<')">&lt;</button>
                                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updatechartFormula('>=')">&gt;=</button>
                                <button type="button" class="opr btn btn-sm btn-secondary" onclick="updatechartFormula('<=')">&lt;=</button>
                            </div>

                            <div class="row g-3">

                                <!-- Fields -->
                                <div class="col-md-4">
                                    <div class="card h-100">
                                        <div class="card-header">
                                            <h6 class="mb-0">Fields & Measures</h6>
                                        </div>
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

                                <!-- Functions -->
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

                                <!-- Function Description -->
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

                            <div class="mt-3">
                                <input type="hidden" id="chartormulaHandletype">
                                <button class="btn btn-secondary btn-sm" onclick="handleChartFormulaValidate()">Validate</button>
                                <button class="btn btn-primary btn-sm" onclick="handleChartFormulaAdd()">Add</button>
                            </div>

                        </div>

                        <!-- Summary -->
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

                    </div> 
                </div> 

            </div>
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
            <div class="grid gap-2 grid-fill-220 align-self-start" id="text-body"></div>
            <div class="grid gap-2 align-self-start" id="dashboard-body"></div>
            </div>
        </div>
    </main>
    <footer class="col-12 text-center py-2 copyright">
    <p class="mb-0">Copyright &copy; <span id="year"></span> <strong>StratRoom</strong></p>

<script>
    document.getElementById("year").textContent = new Date().getFullYear();
</script>

</footer>
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
    <script type="text/javascript"
			src="${contextroot}/js/datepickercockpitcharts.js"></script>
      <script src="${contextroot}/js/datepickerair.js"></script>
<script src="${contextroot}/js/datepicker.en.js"></script>

	<script src="${contextroot}/js/jquery-ui.min.js"></script>
	<script src="${contextroot}/js/moment.js"></script>
	<script src="${contextroot}/js/paging.js"></script>
	<!--<script src="js/pages/spiritedaway.js"></script>-->
	<script src="${contextroot}/js/html2pdf.bundle.min.js"></script>
	<script src="${contextroot}/js/jquery.editable.min.js"></script>
	<script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
	<script src="${contextroot}/js/pickr.es5.min.js"></script>
	<script src="${contextroot}/js/select2.min.js"></script>
	<script src="${contextroot}/js/select2.min.js"></script>
	<script src="${contextroot}/js/widgets.js"></script>
	<script src="${contextroot}/js/pages/widgets/chart-widget.js"></script>
	<script src="${contextroot}/js/colors.js"></script>
	<script src="${contextroot}/js/shards.min.js"></script>
	<script src="${contextroot}/js/jquery.sharrre.min.js"></script>
	<script src="${contextroot}/js/chosen.jquery.min.js"></script>
	<script src="${contextroot}/js/DrillDownCockpit.js"></script>
	<script src="${contextroot}/js/dashboardpreference.js"></script>
	<script src="${contextroot}/js/d3.v5.js"></script>
	<script src="${contextroot}/js/frappe-gantt.min.js"></script>
	<script src="${contextroot}/js/apexcharts.js"></script>
	<script src="${contextroot}/js/initial.js"></script>
   <script src="${contextroot}/js/drop.js"></script>
 <!-- <script src="${contextroot}/js/cockpit-drilldown-charts.js"></script> -->
	<script src="${contextroot}/js/notify.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.15.1/xlsx.full.min.js"></script>
     <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdn.datatables.net/rowgroup/1.3.0/js/dataTables.rowGroup.min.js"></script>
     <!-- <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script> -->
 <script src="${contextroot}/js/jquery.dataTables.min.js"></script>
<!-- <script src="${contextroot}/js/dataTables.bootstrap5.min.js"></script> -->
    <script src="${contextroot}/js/dataTables.rowGroup.min.js"></script>
  <script src="${contextroot}/js/jspdf.umd.min.js"></script>
    <script src="${contextroot}/js/jspdf.plugin.autotable.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.27/jspdf.plugin.autotable.min.js"></script>

  <script type="text/javascript" src="https://fastly.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>


	<script>


/*function mapRender() {
        am4core.ready(function () {
          // Themes begin
          am4core.useTheme(am4themes_animated);
          // Themes end

          // Create map instance
          var chart = am4core.create("mapdiv", am4maps.MapChart);

          // Set map definition
          chart.geodata = am4geodata_worldLow;

          // Set projection
          chart.projection = new am4maps.projections.Miller();

          // Series for World map
          var worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
          worldSeries.exclude = ["AQ"];
          worldSeries.useGeodata = true;

          var polygonTemplate = worldSeries.mapPolygons.template;
          polygonTemplate.tooltipText = "{name}";
          polygonTemplate.fill = chart.colors.getIndex(0);
          polygonTemplate.nonScalingStroke = true;

          // Hover state
          var hs = polygonTemplate.states.create("hover");
          hs.properties.fill = am4core.color("#565678");

          // Series for United States map
          var usaSeries = chart.series.push(new am4maps.MapPolygonSeries());
          usaSeries.geodata = am4geodata_usaLow;

          var usPolygonTemplate = usaSeries.mapPolygons.template;
          usPolygonTemplate.tooltipText = "{name}";
          usPolygonTemplate.fill = chart.colors.getIndex(1);
          usPolygonTemplate.nonScalingStroke = true;

          // Hover state
          var hs = usPolygonTemplate.states.create("hover");
          hs.properties.fill = am4core.color("#red");
          chart.logo.disabled = true;
        }); // end am4core.ready()
      }*/

      /*am4core.ready(function () {
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create map instance
        var chart = am4core.create("Maplarge", am4maps.MapChart);

        // Set map definition
        chart.geodata = am4geodata_worldLow;

        // Set projection
        chart.projection = new am4maps.projections.Miller();

        // Series for World map
        var worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
        worldSeries.exclude = ["AQ"];
        worldSeries.useGeodata = true;

        var polygonTemplate = worldSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.fill = chart.colors.getIndex(0);
        polygonTemplate.nonScalingStroke = true;

        // Hover state
        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#565678");

        // Series for United States map
        var usaSeries = chart.series.push(new am4maps.MapPolygonSeries());
        usaSeries.geodata = am4geodata_usaLow;

        var usPolygonTemplate = usaSeries.mapPolygons.template;
        usPolygonTemplate.tooltipText = "{name}";
        usPolygonTemplate.fill = chart.colors.getIndex(1);
        usPolygonTemplate.nonScalingStroke = true;

        // Hover state
        var hs = usPolygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#red");
        chart.logo.disabled = true;
      }); // end am4core.ready()
		*/

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
	
      /*document.getElementById("chart-setting").onclick = duplicateChart;

      var i = 0;
      var originalChart = document.getElementById("chart-setting-div");

      function duplicateChart() {
        var clone = originalChart.cloneNode(true); // "deep" clone
        clone.id = "chart" + ++i; // there can only be one element with an ID
        $(clone).find('.multidisplayname').val('');
        $(clone).find('.chart_formula').val('');
        $(clone).find('.multiaxis').val('');
        $(clone).find('.multitypefield').val('');
        originalChart.parentNode.appendChild(clone);
      }*/

        /*document.getElementById("chart-setting").onclick = duplicateChart;

        var i = 0;
        var originalChart = document.getElementById("chart-setting-div");

        function duplicateChart() {
          var clone = originalChart.cloneNode(true);
          clone.id = "chart" + ++i;
          originalChart.parentNode.appendChild(clone);
        }*/

        /*document.getElementById("drilldown-setting").onclick = duplicateDrilldown;

        var i = 0;
        var originalDrilldown = document.getElementById("drilldown-setting-div");

        function duplicateDrilldown() {
          var clone = originalDrilldown.cloneNode(true); // "deep" clone
          clone.id = "drilldown" + ++i; // there can only be one element with an ID
          originalDrilldown.parentNode.appendChild(clone);
        }

        document.getElementById("datatable-setting").onclick = duplicateDatatable;

        var i = 0;
        var originalDatatable = document.getElementById("datatable-setting-div");

        function duplicateDatatable() {
          var clone = originalDatatable.cloneNode(true); // "deep" clone
          clone.id = "datatable" + ++i; // there can only be one element with an ID
          originalDatatable.parentNode.appendChild(clone);
        }*/
      
      $('#chart_setting,#color_palette_popup').modal({
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
document.addEventListener("DOMContentLoaded", function () {
    var tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(function (el) {
        new bootstrap.Tooltip(el);
    });
});
  
	$(".risk-reg-multi-select").select2();
    $(".int-reg-multi-select").select2();
    var optionSelect1 = {
            templateResult: formatResult,
            closeOnSelect: false,
            width: '100%'
        };
    $(".kpi-reg-multi-select").select2(optionSelect1);
    $(".risk-status-multi-select").select2();
    $(".int-status-multi-select").select2();
    $(".kpi-status-multi-select").select2();
    $(".risk-dept-multi-select").select2();
    $(".int-dept-multi-select").select2();
	$(".int-prjdept-multi-select").select2();
    $(".int-orgdept-multi-select").select2();

    $(".heatmap-dept-multi-select").select2();
    $(".gantt-dept-multi-select").select2();
    $(".heatmap-status-multi-select").select2();
    $(".gantt-status-multi-select").select2();
    
        for (var i = 0; i < 1000; i++) {
            $(".risk-dept-multi-select").append(
                "<option value='" +
                (i + 1) +
                "'>Value test " +
                (i + 1) +
                "</option>"
            );
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
       $(document).ready(function () {
          $('#text_kpi_formula_popup').on('hidden.bs.modal', function () {
              $('#text_setting').modal('show');
          });
      });
       $(document).ready(function () {
          $('#kpi_formula_popup').on('hidden.bs.modal', function () {
              $('#drilldown_setting').modal('show');
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
       $('#text_kpi_formula_popup').on('show.bs.modal', function () {
          $('#text_setting').modal('hide'); 
          $(this).attr('data-parent-modal', '#kpi-add-modal'); 
      });

      // When second modal closes, re-open the first one
      $('#text_kpi_formula_popup').on('hidden.bs.modal', function () {
          let parentModal = $(this).attr('data-parent-modal');
          if (parentModal) {
              $(parentModal).modal('show');
          }
      });
         $('#kpi_formula_popup').on('show.bs.modal', function () {
          $('#drilldown_setting').modal('hide'); 
          $(this).attr('data-parent-modal', '#kpi-add-modal'); 
      });

      // When second modal closes, re-open the first one
      $('#kpi_formula_popup').on('hidden.bs.modal', function () {
          let parentModal = $(this).attr('data-parent-modal');
          if (parentModal) {
              $(parentModal).modal('show');
          }
      });

    </script>


<!-- 4 - Risk Status Count Settings -->
<script>
    $(document).ready(function () {
        var riskcount_all = [];
        $(".riskCountfilter").select2({
            templateResult: formatRiskcountResult,
            closeOnSelect: true,
            width: '100%'
        });

        $(".riskCountfilter").on("select2:select", function () {
            var selectedValues = $(this).val();
            if (selectedValues.includes("All")) {
                $("li.select2-results__option").find("input:checkbox").prop("checked", true);
                $(this).val(riskcount_all).trigger("change");
            }
            $(this).select2("close");
        });

        $(".riskCountfilter").on("select2:unselect", function () {
            var selectedValues = $(this).val();
            if (!selectedValues || !selectedValues.includes("All")) {
                $("li.select2-results__option #riskCountInput").prop("checked", false);
            }
        });

        function formatRiskcountResult(state) {
            if (!state.id) {
                return $('<div class="text-right"><button id="all-branch" style="margin-right: 10px;" class="btn btn-default">Select All</button><button id="clear-branch" class="btn btn-default">Clear All</button></div>');
            }

            riskcount_all.push(state.id);

            var id = 'riskCountfilter' + state.id;
            var isAll = state.id === "All";
            var checkbox = $('<div class="checkbox"><input class="' + id + '" type="checkbox" ' + (state.selected ? 'checked' : '') + '><label class="select2labelelem" for="' + id + '">' + state.text + '</label></div>', { id: id });

            if (isAll) {
                checkbox.find('input').addClass('#riskCountInput');
            }
            return checkbox;
        }
      $(".riskCountfilter").trigger("change");
  });
</script>

<!-- 8 - Risk Monitoring Settings -->
<script>
  $(document).ready(function () {
      var riskmonitor_all = [];
      $(".riskfilter").select2({
          templateResult: formatRiskmonitorResult,
          closeOnSelect: true,
          width: '100%'
      });

      $(".riskfilter").on("select2:select", function () {
          var selectedValues = $(this).val();
          if (selectedValues.includes("All")) {
              $("li.select2-results__option").find("input:checkbox").prop("checked", true);
              $(this).val(riskmonitor_all).trigger("change");
          }
          $(this).select2("close");
      });

      $(".riskfilter").on("select2:unselect", function () {
          var selectedValues = $(this).val();
          if (!selectedValues || !selectedValues.includes("All")) {
              $("li.select2-results__option #riskMonitorInput").prop("checked", false);
          }
      });

      function formatRiskmonitorResult(state) {
          if (!state.id) {
              return $(
                  '<div class="text-right">' +
                  '<button id="all-branch" style="margin-right: 10px;" class="btn btn-default">Select All</button>' +
                  '<button id="clear-branch" class="btn btn-default">Clear All</button>' +
                  '</div>'
              );
          }

          riskmonitor_all.push(state.id);

          var id = 'riskfilter' + state.id;
          var isAll = state.id === "All";
          var checkbox = $(
              '<div class="checkbox">' +
              '<input class="' + id + '" type="checkbox" ' + (state.selected ? 'checked' : '') + '>' +
              '<label class="select2labelelem" for="' + id + '">' + state.text + '</label>' +
              '</div>',
              { id: id }
          );

          if (isAll) {
              checkbox.find('input').addClass('#riskMonitorInput');
          }
          return checkbox;
      }
      $(".riskfilter").trigger("change");
  });
</script>


<!-- Risk Register -->
<script>
  $(document).ready(function () {
      var riskmonitor_all = [];
      $(".reviewriskfilter").select2({
          templateResult: formatRiskmonitorResult,
          closeOnSelect: true,
          width: '100%'
      });

      $(".reviewriskfilter").on("select2:select", function () {
          var selectedValues = $(this).val();
          if (selectedValues.includes("All")) {
              $("li.select2-results__option").find("input:checkbox").prop("checked", true);
              $(this).val(riskmonitor_all).trigger("change");
          }
          $(this).select2("close");
      });

      $(".reviewriskfilter").on("select2:unselect", function () {
          var selectedValues = $(this).val();
          if (!selectedValues || !selectedValues.includes("All")) {
              $("li.select2-results__option #riskMonitorInput").prop("checked", false);
          }
      });

      function formatRiskmonitorResult(state) {
          if (!state.id) {
              return $(
                  '<div class="text-right">' +
                  '<button id="all-branch" style="margin-right: 10px;" class="btn btn-default">Select All</button>' +
                  '<button id="clear-branch" class="btn btn-default">Clear All</button>' +
                  '</div>'
              );
          }

          riskmonitor_all.push(state.id);

          var id = 'reviewriskfilter' + state.id;
          var isAll = state.id === "All";
          var checkbox = $(
              '<div class="checkbox">' +
              '<input class="' + id + '" type="checkbox" ' + (state.selected ? 'checked' : '') + '>' +
              '<label class="select2labelelem" for="' + id + '">' + state.text + '</label>' +
              '</div>',
              { id: id }
          );

          if (isAll) {
              checkbox.find('input').addClass('#riskMonitorInput');
          }
          return checkbox;
      }
      $(".reviewriskfilter").trigger("change");
  });
</script>


<!-- Initiative Register Settings -->
<script>
  $(document).ready(function () {
      var riskmonitor_all = [];
      $(".initiativeRegiterFilter").select2({
          templateResult: formatRiskmonitorResult,
          closeOnSelect: true,
          width: '100%'
      });

      $(".initiativeRegiterFilter").on("select2:select", function () {
          var selectedValues = $(this).val();
          if (selectedValues.includes("All")) {
              $("li.select2-results__option").find("input:checkbox").prop("checked", true);
              $(this).val(riskmonitor_all).trigger("change");
          }
          $(this).select2("close");
      });

      $(".initiativeRegiterFilter").on("select2:unselect", function () {
          var selectedValues = $(this).val();
          if (!selectedValues || !selectedValues.includes("All")) {
              $("li.select2-results__option #riskMonitorInput").prop("checked", false);
          }
      });

      function formatRiskmonitorResult(state) {
          if (!state.id) {
              return $(
                  '<div class="text-right">' +
                  '<button id="all-branch" style="margin-right: 10px;" class="btn btn-default">Select All</button>' +
                  '<button id="clear-branch" class="btn btn-default">Clear All</button>' +
                  '</div>'
              );
          }

          riskmonitor_all.push(state.id);

          var id = 'initiativeRegiterFilter' + state.id;
          var isAll = state.id === "All";
          var checkbox = $(
              '<div class="checkbox">' +
              '<input class="' + id + '" type="checkbox" ' + (state.selected ? 'checked' : '') + '>' +
              '<label class="select2labelelem" for="' + id + '">' + state.text + '</label>' +
              '</div>',
              { id: id }
          );

          if (isAll) {
              checkbox.find('input').addClass('#riskMonitorInput');
          }
          return checkbox;
      }
      $(".initiativeRegiterFilter").trigger("change");
  });
</script>


<!-- Heat Map -->
<script>
  $(document).ready(function () {
      var riskmonitor_all = [];
      $(".heatriskfilter").select2({
          templateResult: formatRiskmonitorResult,
          closeOnSelect: true,
          width: '100%'
      });

      $(".heatriskfilter").on("select2:select", function () {
          var selectedValues = $(this).val();
          if (selectedValues.includes("All")) {
              $("li.select2-results__option").find("input:checkbox").prop("checked", true);
              $(this).val(riskmonitor_all).trigger("change");
          }
          $(this).select2("close");
      });

      $(".heatriskfilter").on("select2:unselect", function () {
          var selectedValues = $(this).val();
          if (!selectedValues || !selectedValues.includes("All")) {
              $("li.select2-results__option #riskMonitorInput").prop("checked", false);
          }
      });

      function formatRiskmonitorResult(state) {
          if (!state.id) {
              return $(
                  '<div class="text-right">' +
                  '<button id="all-branch" style="margin-right: 10px;" class="btn btn-default">Select All</button>' +
                  '<button id="clear-branch" class="btn btn-default">Clear All</button>' +
                  '</div>'
              );
          }

          riskmonitor_all.push(state.id);

          var id = 'heatriskfilter' + state.id;
          var isAll = state.id === "All";
          var checkbox = $(
              '<div class="checkbox">' +
              '<input class="' + id + '" type="checkbox" ' + (state.selected ? 'checked' : '') + '>' +
              '<label class="select2labelelem" for="' + id + '">' + state.text + '</label>' +
              '</div>',
              { id: id }
          );

          if (isAll) {
              checkbox.find('input').addClass('#riskMonitorInput');
          }
          return checkbox;
      }
      $(".heatriskfilter").trigger("change");
  });
</script>




<!-- 9 - Risk Event Settings -->
<script>
  
  $(document).ready(function () {

    var riskevent_all = [];

    $(".riskEventFilter").select2({
        templateResult: formatRiskeventResult,
        templateSelection: formatRiskeventSelection,
        closeOnSelect: false,
        width: '100%',
        escapeMarkup: function(markup) { 
            return markup; 
        }
    });

    // Handle selection
    $(".riskEventFilter").on("select2:select", function (e) {
        var selectedValues = $(this).val();

        if (selectedValues && selectedValues.includes("All")) {
            var allValues = riskevent_all.filter(v => v !== "All");
            $(this).val(allValues).trigger("change");
        }
        
        // Sync checkboxes immediately
        syncCheckboxes($(this));
    });

    $(".riskEventFilter").on("select2:unselect", function () {
        var selectedValues = $(this).val();
        
        if (!selectedValues || selectedValues.length === 0) {
            $(this).val(null).trigger("change");
        }
        
        // Sync checkboxes immediately
        syncCheckboxes($(this));
    });

    // Custom rendering with checkbox
    function formatRiskeventResult(state) {
        if (!state.id) return state.text;

        if (!riskevent_all.includes(state.id)) {
            riskevent_all.push(state.id);
        }

        var $result = $(
            '<div class="checkbox" style="display: flex; align-items: center;">' +
                '<input type="checkbox" class="risk-event-checkbox" data-value="' + state.id + '" /> ' +
                '<span style="margin-left: 8px;">' + state.text + '</span>' +
            '</div>'
        );

        return $result;
    }

    function formatRiskeventSelection(state) {
        return state.text;
    }

    // Sync checkboxes with Select2 state
    function syncCheckboxes($select) {
        var selectedValues = $select.val() || [];
        
        // Update all checkboxes in the dropdown
        $('.select2-results__option').each(function() {
            var $option = $(this);
            var $checkbox = $option.find('input[type="checkbox"]');
            var value = $checkbox.attr('data-value');
            
            if (value) {
                var isChecked = selectedValues.includes(value);
                $checkbox.prop('checked', isChecked);
            }
        });
    }

    // Handle checkbox clicks
    $(document).on('click', '.risk-event-checkbox', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var $checkbox = $(this);
        var value = $checkbox.attr('data-value');
        var $select = $('.riskEventFilter');
        var selectedValues = $select.val() || [];
        
        if ($checkbox.is(':checked')) {
            if (!selectedValues.includes(value)) {
                selectedValues.push(value);
            }
        } else {
            selectedValues = selectedValues.filter(v => v !== value);
        }
        
        $select.val(selectedValues).trigger('change');
    });

    // Initial sync when dropdown opens
    $('.riskEventFilter').on('select2:open', function() {
        setTimeout(function() {
            syncCheckboxes($(this));
        }.bind(this), 100);
    });

});
  
  </script>

<!-- 10 - BIA - RPO Setting -->
<script>
  $(document).ready(function () {
      var rpobia_all = [];
      $(".rponamesmulti").select2({
          templateResult: formatRpoResult,
          closeOnSelect: true,
          width: '100%'
      });

      $(".rponamesmulti").on("select2:select", function (event) {
          var selectedValues = $(this).val();
          if (selectedValues.includes("All")) {
              $("li.select2-results__option").find("input:checkbox").prop("checked", true);
              $(this).val(rpobia_all).trigger("change");
          }
          $(this).select2("close");
      });

      $(".rponamesmulti").on("select2:unselect", function (event) {
          var selectedValues = $(this).val();
          if (!selectedValues || !selectedValues.includes("All")) {
              $("li.select2-results__option #biaRpoInput").prop("checked", false);
          }
      });
      function formatRpoResult(state) {
          if (!state.id) {
              return $(
                  '<div class="text-right"><button id="all-branch" style="margin-right: 10px;" class="btn btn-default">Select All</button><button id="clear-branch" class="btn btn-default">Clear All</button></div>'
              );
          }

          rpobia_all.push(state.id);

          var id = 'rponamesmulti' + state.id;
          var isAll = state.id === "All";
          var checkbox = $('<div class="checkbox"><input class="' + id + '" type="checkbox" ' + (state.selected ? 'checked' : '') + '><label class="select2labelelem" for="' + id + '">' + state.text + '</label></div>', { id: id });

          if (isAll) {
              checkbox.find('input').addClass('#biaRpoInput');
          }
          return checkbox;
      }
      $(".rponamesmulti").trigger("change");
  });
</script>

<!-- 18 - REPORT TEMPLATE Setting -->
<script>
  $(document).ready(function () {
      var report_all = [];
      $(".reportnamesmulti").select2({
          templateResult: formatRpoResult,
          closeOnSelect: true,
          width: '100%'
      });

      $(".reportnamesmulti").on("select2:select", function (event) {
          var selectedValues = $(this).val();
          if (selectedValues.includes("All")) {
              $("li.select2-results__option").find("input:checkbox").prop("checked", true);
              $(this).val(report_all).trigger("change");
          }
          $(this).select2("close");
      });

      $(".reportnamesmulti").on("select2:unselect", function (event) {
          var selectedValues = $(this).val();
          if (!selectedValues || !selectedValues.includes("All")) {
              $("li.select2-results__option #biaReportTemplateInput").prop("checked", false);
          }
      });
      function formatRpoResult(state) {
          if (!state.id) {
              return $(
                  '<div class="text-right"><button id="all-branch" style="margin-right: 10px;" class="btn btn-default">Select All</button><button id="clear-branch" class="btn btn-default">Clear All</button></div>'
              );
          }

          report_all.push(state.id);

          var id = 'reportnamesmulti' + state.id;
          var isAll = state.id === "All";
          var checkbox = $('<div class="checkbox"><input class="' + id + '" type="checkbox" ' + (state.selected ? 'checked' : '') + '><label class="select2labelelem" for="' + id + '">' + state.text + '</label></div>', { id: id });

          if (isAll) {
              checkbox.find('input').addClass('#biaReportTemplateInput');
          }
          return checkbox;
      }
      $(".reportnamesmulti").trigger("change");
  });
</script>

<!-- 11 - BIA - POS Setting -->
<script>
  $(document).ready(function () {
      var posbia_all = [];
      $(".posnamesmulti").select2({
          templateResult: formatPosResult,
          closeOnSelect: true,
          width: '100%'
      });

      $(".posnamesmulti").on("select2:select", function (event) {
          var selectedValues = $(this).val();
          if (selectedValues.includes("All")) {
              $("li.select2-results__option").find("input:checkbox").prop("checked", true);
              $(this).val(posbia_all).trigger("change");
          }
          $(this).select2("close");
      });

      $(".posnamesmulti").on("select2:unselect", function (event) {
          var selectedValues = $(this).val();
          if (!selectedValues || !selectedValues.includes("All")) {
              $("li.select2-results__option #biaPosInput").prop("checked", false);
          }
      });
      function formatPosResult(state) {
          if (!state.id) {
              return $(
                  '<div class="text-right"><button id="all-branch" style="margin-right: 10px;" class="btn btn-default">Select All</button><button id="clear-branch" class="btn btn-default">Clear All</button></div>'
              );
          }

          posbia_all.push(state.id);

          var id = 'posnamesmulti' + state.id;
          var isAll = state.id === "All";
          var checkbox = $('<div class="checkbox"><input class="' + id + '" type="checkbox" ' + (state.selected ? 'checked' : '') + '><label class="select2labelelem" for="' + id + '">' + state.text + '</label></div>', { id: id });

          if (isAll) {
              checkbox.find('input').addClass('#biaPosInput');
          }
          return checkbox;
      }
      $(".posnamesmulti").trigger("change");
  });
</script>

<!-- 12 - Business Process Based on Trading Hours Setting -->
<script>
  $(document).ready(function () {
      var postradebia_all = [];
      $(".posTradingnamesmulti").select2({
          templateResult: formatTradePosResult,
          closeOnSelect: true,
          width: '100%'
      });

      $(".posTradingnamesmulti").on("select2:select", function (event) {
          var selectedValues = $(this).val();
          if (selectedValues.includes("All")) {
              $("li.select2-results__option").find("input:checkbox").prop("checked", true);
              $(this).val(postradebia_all).trigger("change");
          }
          $(this).select2("close");
      });

      $(".posTradingnamesmulti").on("select2:unselect", function (event) {
          var selectedValues = $(this).val();
          if (!selectedValues || !selectedValues.includes("All")) {
              $("li.select2-results__option #biaposTradingInput").prop("checked", false);
          }
      });
      function formatTradePosResult(state) {
          if (!state.id) {
              return $(
                  '<div class="text-right"><button id="all-branch" style="margin-right: 10px;" class="btn btn-default">Select All</button><button id="clear-branch" class="btn btn-default">Clear All</button></div>'
              );
          }

          postradebia_all.push(state.id);

          var id = 'posTradingnamesmulti' + state.id;
          var isAll = state.id === "All";
          var checkbox = $('<div class="checkbox"><input class="' + id + '" type="checkbox" ' + (state.selected ? 'checked' : '') + '><label class="select2labelelem" for="' + id + '">' + state.text + '</label></div>', { id: id });

          if (isAll) {
              checkbox.find('input').addClass('#biaposTradingInput');
          }
          return checkbox;
      }
      $(".posTradingnamesmulti").trigger("change");
  });
</script>

<!-- 13 - Process Business Critical Setting -->
<script>
  $(document).ready(function () {
      var criticalbusiness_all = [];
      $(".criticalbusinessnamesmulti").select2({
          templateResult: formatCriticalbusinessResult,
          closeOnSelect: true,
          width: '100%'
      });

      $(".criticalbusinessnamesmulti").on("select2:select", function (event) {
          var selectedValues = $(this).val();
          if (selectedValues.includes("All")) {
              $("li.select2-results__option").find("input:checkbox").prop("checked", true);
              $(this).val(criticalbusiness_all).trigger("change");
          }
          $(this).select2("close");
      });

      $(".criticalbusinessnamesmulti").on("select2:unselect", function (event) {
          var selectedValues = $(this).val();
          if (!selectedValues || !selectedValues.includes("All")) {
              $("li.select2-results__option #criticalbusinessInput").prop("checked", false);
          }
      });
      function formatCriticalbusinessResult(state) {
          if (!state.id) {
              return $(
                  '<div class="text-right"><button id="all-branch" style="margin-right: 10px;" class="btn btn-default">Select All</button><button id="clear-branch" class="btn btn-default">Clear All</button></div>'
              );
          }

          criticalbusiness_all.push(state.id);

          var id = 'criticalbusinessnamesmulti' + state.id;
          var isAll = state.id === "All";
          var checkbox = $('<div class="checkbox"><input class="' + id + '" type="checkbox" ' + (state.selected ? 'checked' : '') + '><label class="select2labelelem" for="' + id + '">' + state.text + '</label></div>', { id: id });

          if (isAll) {
              checkbox.find('input').addClass('#criticalbusinessInput');
          }
          return checkbox;
      }
      $(".criticalbusinessnamesmulti").trigger("change");
  });
</script>
<script>
  $(document).ready(function () {
      var posbia_all = [];
      $(".ermriskfilter").select2({
          templateResult: formatPosResult,
          closeOnSelect: true,
          width: '100%'
      });

      $(".ermriskfilter").on("select2:select", function (event) {
          var selectedValues = $(this).val();
          if (selectedValues.includes("All")) {
              $("li.select2-results__option").find("input:checkbox").prop("checked", true);
              $(this).val(posbia_all).trigger("change");
          }
          $(this).select2("close");
      });

      $(".ermriskfilter").on("select2:unselect", function (event) {
          var selectedValues = $(this).val();
          if (!selectedValues || !selectedValues.includes("All")) {
              $("li.select2-results__option #ermInput").prop("checked", false);
          }
      });
      function formatPosResult(state) {
          if (!state.id) {
              return $(
                  '<div class="text-right"><button id="all-branch" style="margin-right: 10px;" class="btn btn-default">Select All</button><button id="clear-branch" class="btn btn-default">Clear All</button></div>'
              );
          }

          posbia_all.push(state.id);

          var id = 'ermriskfilter' + state.id;
          var isAll = state.id === "All";
          var checkbox = $('<div class="checkbox"><input class="' + id + '" type="checkbox" ' + (state.selected ? 'checked' : '') + '><label class="select2labelelem" for="' + id + '">' + state.text + '</label></div>', { id: id });

          if (isAll) {
              checkbox.find('input').addClass('#ermInput');
          }
          return checkbox;
      }
      $(".ermriskfilter").trigger("change");
  });
</script>
<script>
  $(document).ready(function () {
      var riskeventfreqInput_all = [];
      $(".riskeventfreqnames").select2({
          templateResult: formatPosResult,
          closeOnSelect: true,
          width: '100%'
      });

      $(".riskeventfreqnames").on("select2:select", function (event) {
          var selectedValues = $(this).val();
          if (selectedValues.includes("All")) {
              $("li.select2-results__option").find("input:checkbox").prop("checked", true);
              $(this).val(riskeventfreqInput_all).trigger("change");
          }
          $(this).select2("close");
      });

      $(".riskeventfreqnames").on("select2:unselect", function (event) {
          var selectedValues = $(this).val();
          if (!selectedValues || !selectedValues.includes("All")) {
              $("li.select2-results__option #riskeventfreqInput").prop("checked", false);
          }
      });
      function formatPosResult(state) {
          if (!state.id) {
              return $(
                  '<div class="text-right"><button id="all-branch" style="margin-right: 10px;" class="btn btn-default">Select All</button><button id="clear-branch" class="btn btn-default">Clear All</button></div>'
              );
          }

          riskeventfreqInput_all.push(state.id);

          var id = 'riskeventfreqnames' + state.id;
          var isAll = state.id === "All";
          var checkbox = $('<div class="checkbox"><input class="' + id + '" type="checkbox" ' + (state.selected ? 'checked' : '') + '><label class="select2labelelem" for="' + id + '">' + state.text + '</label></div>', { id: id });

          if (isAll) {
              checkbox.find('input').addClass('#riskeventfreqInput');
          }
          return checkbox;
      }
      $(".riskeventfreqnames").trigger("change");
  });
</script>
<!-- Gantt Chart -->
<script>
  $(document).ready(function () {
      var riskmonitor_all = [];
      $(".initiativeGanttFilter").select2({
          templateResult: formatRiskmonitorResult,
          closeOnSelect: true,
          width: '100%'
      });

      $(".initiativeGanttFilter").on("select2:select", function () {
          var selectedValues = $(this).val();
          if (selectedValues.includes("All")) {
              $("li.select2-results__option").find("input:checkbox").prop("checked", true);
              $(this).val(riskmonitor_all).trigger("change");
          }
          $(this).select2("close");
      });

      $(".initiativeGanttFilter").on("select2:unselect", function () {
          var selectedValues = $(this).val();
          if (!selectedValues || !selectedValues.includes("All")) {
              $("li.select2-results__option #riskMonitorInput").prop("checked", false);
          }
      });

      function formatRiskmonitorResult(state) {
          if (!state.id) {
              return $(
                  '<div class="text-right">' +
                  '<button id="all-branch" style="margin-right: 10px;" class="btn btn-default">Select All</button>' +
                  '<button id="clear-branch" class="btn btn-default">Clear All</button>' +
                  '</div>'
              );
          }

          riskmonitor_all.push(state.id);

          var id = 'initiativeGanttFilter' + state.id;
          var isAll = state.id === "All";
          var checkbox = $(
              '<div class="checkbox">' +
              '<input class="' + id + '" type="checkbox" ' + (state.selected ? 'checked' : '') + '>' +
              '<label class="select2labelelem" for="' + id + '">' + state.text + '</label>' +
              '</div>',
              { id: id }
          );

          if (isAll) {
              checkbox.find('input').addClass('#riskMonitorInput');
          }
          return checkbox;
      }
      $(".initiativeGanttFilter").trigger("change");
  });
</script>

</body>