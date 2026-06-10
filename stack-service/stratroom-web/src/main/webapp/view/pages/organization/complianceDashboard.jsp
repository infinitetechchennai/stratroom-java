<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta content="width=device-width, initial-scale=1" name="viewport" />
<title>StratRoom</title>

<link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>


<style>

  .chart-card {
  border-radius: 10px;
  padding: 20px 16px;
  border: 1px solid var(--stratroom-border-color);
  background-color: var(--stratroom-body-bg);
}
.chart-card .chart-title {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #64748b;
  margin-bottom: 14px;
}

.chart-container {
  position: relative;
  height: 200px;
}

.chart-legend {
  font-size: 11px;
  color: #64748b;
}
.chart-legend .legend-item {
  color: #64748b;
}

.impl-bar-container {
  display: flex;
  flex-direction: column-reverse;
  height: 80px;
  background: var(--stratroom-secondary-bg);
  border-radius: 6px;
  overflow: hidden;
}

.impl-progress-title {
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 6px;
}

.impl-progress-stat {
  font-size: 10px;
  color: #64748b;
  margin-top: 5px;
}
.impl-progress-stat .pct {
  font-weight: 600;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  display: inline-block;
}

.legend-effective {
  background: #22c55e;
}

.legend-ongoing {
  background: #3b82f6;
}

.legend-pending {
  background: #f59e0b;
}

.legend-not-started {
  background: #6b7280;
}

.legend-implemented {
  background: #22c55e;
}

.legend-in-progress {
  background: #3b82f6;
}

.legend-planned {
  background: #f59e0b;
}
.bar-track {
  height: 5px;
  background: var(--stratroom-secondary-bg);
  border-radius: 3px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.6s ease;
}

.drilldown-panel {
  border-radius: 10px;
  padding: 20px 24px;
  border: 1px solid var(--stratroom-border-color);
  background-color: var(--stratroom-body-bg);
  animation: fadeInPanel 0.35s ease forwards;
}

@keyframes fadeInPanel {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.drilldown-section-title {
  font-size: 11px;
  letter-spacing: 0.1em;
  color: #64748b;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.drilldown-header-title {
  font-size: 18px;
  font-weight: bold;
  color: var(--stratroom-body-color);
}

.drilldown-header-subtitle {
  font-size: 12px;
  color: #64748b;
  margin-left: 0.5rem;
}

  .frameworks-title {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #64748b;
}

.framework-card {
  border-radius: 10px;
  padding: 16px 12px;
  border: 1px solid var(--stratroom-border-color);
  background-color: var(--stratroom-body-bg);
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}
.framework-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
.framework-card.active {
  outline: 2px solid var(--fw-color);
  outline-offset: 2px;
  background: rgba(var(--fw-color-rgb), 0.04);
}
.framework-card .fw-name {
  font-weight: 700;
  font-size: 14px;
  color: var(--stratroom-body-color);
}
.framework-card .fw-subtitle {
  font-size: 10px;
  color: #94a3b8;
}
.framework-card .fw-controls {
  font-size: 10px;
  margin-top: 4px;
}

.radial-progress {
  position: relative;
  display: inline-block;
}
.radial-progress .pct-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 13px;
  font-weight: 700;
  color: var(--stratroom-body-color);
}

.radial-svg {
  transform: rotate(-90deg);
}
.radial-svg .radial-bg {
  fill: none;
  stroke: #e2e8f0;
  stroke-width: 6;
}
.radial-svg .radial-progress-circle {
  fill: none;
  stroke-width: 6;
  stroke-linecap: round;
  transition: stroke-dasharray 0.8s ease;
}
.radial-svg .radial-text {
  text-anchor: middle;
  fill: var(--stratroom-body-color);
  font-size: 12px;
  font-weight: 700;
  transform: rotate(90deg);
}
.overall-score-box {
  border-radius: 12px;
  padding: 16px 24px;
  text-align: center;
  min-width: 140px;
  border: 1px solid var(--stratroom-border-color);
  background-color: var(--stratroom-body-bg);
}

.overall-score-v2 {
  background-color: var(--stratroom-body-bg);
  border-radius: 8px;
  padding: 12px 24px;
  text-align: left;
  border: 1px solid var(--stratroom-border-color);
  min-width: 180px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  align-items: center;
  gap: 16px;
}
.overall-score-v2 .score-label {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 2px;
}
.overall-score-v2 .score-percent {
  font-size: 42px;
  font-weight: 700;
  color: var(--stratroom-primary, #0d6efd);
  line-height: 1;
}
.overall-score-v2 .score-detail {
  font-size: 10px;
  letter-spacing: 0.02em;
  color: #94a3b8;
  text-transform: uppercase;
}
  .compliance-kpi-card {
    border-radius: 10px;
    padding: 18px 20px;
    border: 1px solid var(--stratroom-border-color);
    background-color: var(--stratroom-body-bg);
    transition: box-shadow 0.2s ease;
  }
  .compliance-kpi-card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }
  .compliance-kpi-card .kpi-value {
    font-size: 28px;
    font-weight: 700;
    line-height: 1.1;
  }
  .compliance-kpi-card .kpi-label {
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #64748b;
    margin-bottom: 4px;
  }
  .compliance-kpi-card .kpi-sub {
    font-size: 11px;
    color: #94a3b8;
  }
</style>
<!-- <style>

	.select2 .select2-search--dropdown {
		padding: 3px 2px 0px 0px;
	}
	
	
	input.select2-search__field {
		height:26px !important;
		font-size:12px !important;
font-weight: normal !important;
	}
	
	
	.select2-selection--single{
    border: 1px solid #ced4da !important;
    border-radius: 0px !important;
	}
	
    .orientation-right {
        top: 60px !important;
        right: 0 !important;
        left: auto !important;
        position: fixed;
      }

    #notifications .row::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
      }

  .btn-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 10px;
  max-width: 600px;
  border: 1px solid #ced4da;
  }

  .file-upload-container {
    display: inline-block;
    margin: 5px;
    width: 120px;
    position: relative;
  }

  /* Document Upload Button */
  .btn-document {
    width: 60px;
    height: 60px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }


  /* Icons size */
  .btn-document i {
    font-size: 30px;
  }

  .action-buttons {
    display: flex;
    margin-top: 5px;
  }

  .action-buttons button {
    margin: 2px;
    height: 24px;
    width: 24px;
    border: none;
  }

  /* Remove borders from icons */
  .action-buttons button i {
    font-size: 12px;
  }

  .fa-file-pdf{
    color: red;
  }
  .fa-file-excel{
    color: #1D6F42;
  }
  .fa-file-word{
    color: #2A5699;
  }
  .fa-file-code{
    color: #E44D26;
  }
  .fa-file-image{
    color: green;
  }

  .file-name {
    font-size: 14px;
    margin-top: 5px;
    color: #000;
    display: none;
    margin-left: -60px !important;
  }

  .file-upload-container .btn-document i {
    font-size: 30px;
  }

  /* Ensures proper layout on small devices */
  @media (max-width: 600px) {
    .btn-container {
      justify-content: center;
    }

    .file-upload-container {
      margin: 10px;
    }
  }

</style> -->
<style>
  .image-styles {
    margin-top: 20px !important;
  }
</style>
</head>

<script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>
<body class="light">
<input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
	<!-- Page Loader -->
  
	<!-- #Top Bar -->
	<div>
    

		<!-- <div id="deleteModalswot" class="modal fade">
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
							<input type="hidden" id="deleterecordid" /> <input type="hidden"
								id="deleterecordtype" />
							<button type="button" class="btn-default1 btn"
								data-dismiss="modal" aria-label="Close"  data-i18n="Cancel">Cancel</button>
							<button type="button"
								class="btn btn-danger confirm-modal-deleteBtn"
								onclick="handleswoteventdelete()">Delete</button>
						</div>
					</div>
				</div>
			</div>
		</div> -->
	</div>
	<!--#END View -->

 <div style="display: none;">
      <jsp:include page="../common/right-navigation.jsp"></jsp:include>
    </div>

	<jsp:include page="../common/top-navigation.jsp"></jsp:include>
    <header id="header" class="header shadow-sm">
	  
		<jsp:include page="../common/left-navigation.jsp"></jsp:include>
    </header>

<main class="pt-2 pb-2">
    <div class="container-lg">
      <div class="page-header grid gap-2 pb-1">
        <div class="g-col-12 g-col-md-8 d-flex align-items-center">
          <h4 class="title mb-0 fs-5 fw-bold d-flex align-items-center gap-1 text-uppercase"
            style="letter-spacing: 0.05em; color: var(--bs-body-color);">
            <span class="icon d-flex align-items-center" style="color: var(--bs-body-color);">
              <i data-lucide="shield-check" style="width: 18px; height: 18px; stroke-width: 2px;"></i>
            </span>
            <span data-translate="page.complianceDashboard.title">Compliance Dashboard</span>
          </h4>
        </div>
        <!-- overall score -->
        <div
          class="g-col-12 g-col-md-4 d-flex justify-content-md-end justify-content-start align-items-center mt-2 mt-md-0">

           <!-- SELECT CONTAINER -->
            <div class="page-icons d-flex me-2" style="gap:8px; min-width:560px;">

              <div class="form-group" style="flex:1 1 0;">
                <select id="department_selectdw" class="dept_select form-select form-select-sm" style="width:100%;">
                  <option value="">Select Department</option>
                </select>
              </div>

              <div class="form-group" style="flex:1 1 0;">
                <select id="page_selectdw" class="form-select form-select-sm" style="width:100%;">
                  <option value="">Select Page</option>
                </select>
              </div>

            </div>

             <!-- SCORE BLOCK -->
            <div class="overall-score-v2 d-flex">
              <div>
                <div class="score-label">OVERALL SCORE</div>
                <div class="score-detail" id="overall-score-detail"></div>
              </div>
              <div class="score-percent" id="overall-score-percent"></div>

            </div>
        </div>
      </div>
     
    </div>

    <div class="container-lg py-2">

      <!-- Overall Score + KPIs -->
      <div class="row g-3 mb-3">
        <div class="col-lg-3 col-md-6">
          <div class="compliance-kpi-card" id="kpi-total">
            <div class="kpi-label">Total Controls</div>
            <div class="kpi-value text-primary" id="kpi-total-val"></div>
            <div class="kpi-sub" id="kpi-total-sub">across 6 frameworks</div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="compliance-kpi-card" id="kpi-effective">
            <div class="kpi-label">Effective</div>
            <div class="kpi-value text-success" id="kpi-effective-val"></div>
            <div class="kpi-sub" id="kpi-effective-sub">compliance rate</div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="compliance-kpi-card" id="kpi-critical">
            <div class="kpi-label">Critical Risk</div>
            <div class="kpi-value text-danger" id="kpi-critical-val"></div>
            <div class="kpi-sub">require immediate attention</div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="compliance-kpi-card" id="kpi-high">
            <div class="kpi-label">High Risk</div>
            <div class="kpi-value" style="color:#f97316;" id="kpi-high-val"></div>
            <div class="kpi-sub">active monitoring needed</div>
          </div>
        </div>
      </div>

      <!-- Framework Cards -->
      <div class="mb-3">
        <div class="mb-2 frameworks-title">
          FRAMEWORKS click to drill down
        </div>
        <div class="row g-2" id="frameworkCards">
          <!-- Generated by JS -->
        </div>
      </div>

      <!-- Drill-down panel -->
      <div id="drilldownPanel" class="mb-3" style="display:none;"></div>

      <!-- Charts Row -->
      <div class="row g-3 mb-3">
        <div class="col-lg-8">
          <div class="chart-card">
            <div class="chart-title">Control Status by Framework</div>
            <div class="chart-container"><canvas id="stackedBarChart"></canvas></div>
            <div class="d-flex gap-3 mt-2 justify-content-center chart-legend">
              <span><span class="legend-dot me-1 legend-effective"></span>Effective</span>
              <span><span class="legend-dot me-1 legend-ongoing"></span>Ongoing</span>
              <span><span class="legend-dot me-1 legend-pending"></span>Pending</span>
              <span><span class="legend-dot me-1 legend-not-started"></span>Not Started</span>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="chart-card">
            <div class="chart-title">Portfolio Risk Mix</div>
            <div class="chart-container"><canvas id="riskPieChart"></canvas></div>
            <div class="row g-1 mt-2 chart-legend" id="riskLegend">
              <!-- Generated by JS -->
            </div>
          </div>
        </div>
      </div>

      <!-- Implementation Progress -->
      <div class="chart-card mb-3">
        <div class="chart-title">Implementation Progress</div>
        <div class="row g-3" id="implProgress">
          <!-- Generated by JS -->
        </div>
        <div class="d-flex gap-4 mt-3 justify-content-center chart-legend">
          <span><span class="legend-dot me-1 legend-implemented"></span>Implemented</span>
          <span><span class="legend-dot me-1 legend-in-progress"></span>In Progress</span>
          <span><span class="legend-dot me-1 legend-planned"></span>Planned</span>
        </div>
      </div>
    </div>
  </main>
	<footer class="col-12 text-center py-2 copyright" 
			style="position:fixed; bottom:0; left:0; width:100%; margin:0; padding:8px;">
				<p class="mb-0" style="margin:0;">Copyright &copy; 
				<span id="year"></span> <strong>StratRoom</strong>
				</p>

				<script>
				document.getElementById("year").textContent = new Date().getFullYear();
				</script>
			</footer>
	

  <link href="assets/css/pickr.min.css" rel="stylesheet">
  <link href="assets/css/daterangepicker.min.css" rel="stylesheet">
  <link href="assets/css/jquery-ui.min.css" rel="stylesheet">
  <link href="assets/css/select2.min.css" rel="stylesheet" />
	<!-- Plugins Js -->

	<script src="js/app.min.js"></script>
	<script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
	<script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
	<!-- Custom Js -->
	<script src="${contextroot}/js/admin.js"></script>
<!-- Knob Js -->
	<script type="text/javascript"
		src="${contextroot}/js/knockout-3.5.0.js"></script>
	<script type="text/javascript"
		src="${contextroot}/js/daterangepicker.min.js"></script>
	
	<!-- Knob Js -->
	<script src="${contextroot}/js/jquery-ui.min.js"></script>
	<script src="${contextroot}/js/moment.js"></script>
	<script src="${contextroot}/js/jquery.editable.min.js"></script>
	<script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
	<script src="${contextroot}/js/datepickerair.js"></script>
	<script src="${contextroot}/js/datepicker.en.js"></script>
	<script src="${contextroot}/js/handlebars.js"></script>
	<script src="${contextroot}/js/widgets.js"></script>
	<script src="${contextroot}/js/notify.js"></script>
	<script src="${contextroot}/js/select2.min.js"></script>
	<!-- <script src="${contextroot}/js/kpidata_form.js"></script> -->
	<script src="${contextroot}/js/initial.js"></script>
    <script src="${contextroot}/js/compliancedashboard.js"></script>
	




  
</body>