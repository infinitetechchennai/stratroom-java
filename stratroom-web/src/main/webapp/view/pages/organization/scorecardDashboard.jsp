<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta content="width=device-width, initial-scale=1" name="viewport" />
<title>StratRoom</title>

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>


<style>
  .perspectives-title {
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: black;
  font-weight: 800;
}

.perspective-card {
  border-radius: 10px;
  padding: 16px 12px;
  border: 1px solid var(--stratroom-border-color);
  background-color: var(--stratroom-body-bg);
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}
.perspective-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
.perspective-card.active {
  outline: 2px solid var(--persp-color);
  outline-offset: 2px;
}
.perspective-card .persp-donut-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.perspective-card .persp-donut-wrap canvas {
  width: 80px !important;
  height: 80px !important;
}
.perspective-card .persp-donut-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 15px;
  font-weight: 800;
}
.perspective-card .persp-name {
  font-weight: 700;
  font-size: 13px;
  color: var(--stratroom-body-color);
  margin-bottom: 2px;
}
.perspective-card .persp-sub {
  font-size: 11px;
  color: #94a3b8;
  margin-bottom: 6px;
}
.perspective-card .persp-kpi-count {
  font-size: 11px;
  font-weight: 600;
}

.sc-drilldown-panel {
  border-radius: 10px;
  padding: 20px 24px;
  border: 1px solid var(--stratroom-border-color);
  background-color: var(--stratroom-body-bg);
  animation: fadeInPanel 0.35s ease forwards;
}

.sc-drilldown-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--stratroom-body-color);
}

.sc-drilldown-col-title {
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}

.sc-bar-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.sc-bar-label {
  font-size: 12px;
  color: var(--stratroom-body-color);
  min-width: 80px;
}

.sc-bar-count {
  font-size: 11px;
  color: #94a3b8;
  min-width: 36px;
  text-align: right;
}

.sc-kpi-table-section {
  border-radius: 10px;
  border: 1px solid var(--stratroom-border-color);
  background-color: var(--stratroom-body-bg);
  padding: 18px 20px;
}

.sc-kpi-table-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--stratroom-body-color);
}

.sc-filter-btn {
  font-size: 11px;
  border: 1px solid var(--stratroom-border-color);
  border-radius: 4px;
  padding: 3px 10px;
  cursor: pointer;
  background: var(--stratroom-body-bg);
  color: var(--stratroom-body-color);
  transition: all 0.15s ease;
}
.sc-filter-btn.active {
  background: var(--stratroom-primary, #2d2d6b);
  color: #fff;
  border-color: var(--stratroom-primary, #2d2d6b);
}

.sc-kpi-table {
  width: 100%;
  border-collapse: collapse;
}
.sc-kpi-table thead th {
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  padding: 6px 10px;
  background: var(--stratroom-secondary-bg, #fafafa);
  border-bottom: 1px solid var(--stratroom-border-color);
  text-align: left;
}
.sc-kpi-table tbody tr {
  border-bottom: 1px solid var(--stratroom-border-color);
}
.sc-kpi-table tbody tr:hover {
  background: var(--stratroom-secondary-bg, #fafbff);
}
.sc-kpi-table tbody td {
  padding: 9px 10px;
  font-size: 12px;
  color: var(--stratroom-body-color);
  vertical-align: middle;
}

.sc-pill {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 600;
}
.sc-pill.pill-green {
  background: #e8f8f0;
  color: #27ae60;
}
.sc-pill.pill-blue {
  background: #e8f3fb;
  color: #2980b9;
}
.sc-pill.pill-orange {
  background: #fef3e2;
  color: #e67e22;
}
.sc-pill.pill-red {
  background: #fde8e8;
  color: #e74c3c;
}
.sc-pill.pill-gray {
  background: #f0f0f0;
  color: #888;
}

.sc-persp-badge {
  display: inline-flex;
  align-items: center;
  padding: 1px 7px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 600;
  margin-right: 4px;
}

.sc-prog-bar {
  width: 80px;
  height: 6px;
  background: var(--stratroom-secondary-bg, #eee);
  border-radius: 3px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 6px;
}
.sc-prog-bar .sc-prog-fill {
  height: 6px;
  border-radius: 3px;
  display: block;
}

.sc-trend {
  font-size: 14px;
}

.sc-legend-row {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.sc-legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #64748b;
}

.sc-legend-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.sc-legend-sq {
  width: 10px;
  height: 10px;
  border-radius: 2px;
}

.sc-donut-center-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.sc-donut-center-text .big {
  font-size: 22px;
  font-weight: 800;
  color: var(--stratroom-body-color);
}
.sc-donut-center-text .sm {
  font-size: 10px;
  color: #94a3b8;
}

.sc-achieve-card {
  border-radius: 10px;
  border: 1px solid var(--stratroom-border-color);
  background-color: var(--stratroom-body-bg);
  padding: 14px 16px;
}
.sc-achieve-card .sc-a-persp {
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 4px;
}
.sc-achieve-card .sc-a-count {
  font-size: 11px;
  color: #94a3b8;
  margin-bottom: 8px;
}

.sc-achieve-bar-bg {
  width: 100%;
  height: 8px;
  background: var(--stratroom-secondary-bg, #eee);
  border-radius: 4px;
  overflow: hidden;
}

.sc-achieve-bar-fill {
  height: 8px;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.sc-achieve-pct {
  font-size: 13px;
  font-weight: 800;
  margin-top: 6px;
}

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
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: black;
  font-weight: 800;
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
    color: black;
    font-weight: 800;
    margin-bottom: 4px;
  }
  .compliance-kpi-card .kpi-sub {
    font-size: 12px;
    color: black;
    font-weight: 800;
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
      <!-- Page Header -->
      <div class="page-header grid gap-2 pb-1">
        <div class="g-col-12 g-col-md-8 d-flex align-items-center">
          <h4 class="title mb-0 fs-5 fw-bold d-flex align-items-center gap-1 text-uppercase"
            style="letter-spacing: 0.05em; color: var(--bs-body-color);">
            <span class="icon d-flex align-items-center" style="color: var(--bs-body-color);">
              <i data-lucide="monitor" style="width: 18px; height: 18px; stroke-width: 2px;"></i>
            </span>
            <span data-translate="page.scorecardDashboard.title">Scorecard Dashboard</span>
          </h4>
        </div>
        
      
        <!-- overall score -->
<div
  class="g-col-12 g-col-md-4 d-flex justify-content-md-end justify-content-start align-items-center mt-2 mt-md-0">

  <!-- SELECT CONTAINER -->
  <div class="page-icons d-flex me-2" style="gap:8px; min-width:560px;">

    <div class="form-group" style="flex:1 1 0;">
      <select id="department_selectdw"
        class="dept_select form-select form-select-sm"
        style="width:100%;">
        <option value="">Select Department</option>
      </select>
    </div>

    <div class="form-group" style="flex:1 1 0;">
      <select id="page_selectdw"
        class="form-select form-select-sm"
        style="width:100%;">
        <option value="">Select Page</option>
      </select>
    </div>

  </div>

  <!-- SCORE BLOCK -->
  <div class="overall-score-v2 d-flex p-2">
    <div>
      <div class="score-label">OVERALL SCORE</div>
      <div class="score-detail" id="sc-overall-sub"></div>
    </div>
    <div class="score-percent" id="sc-overall-pct" style="color: #27ae60; font-size: 30px;"></div>
  </div>

</div>
      </div>

     
    </div>

    

    <div class="container-lg py-2">

      <!-- Summary KPI Cards -->
      <div class="row g-3 mb-3">
        <div class="col-lg-3 col-md-6">
          <div class="compliance-kpi-card" id="sc-kpi-total">
            <div class="kpi-label">Total KPIs</div>
            <div class="kpi-value text-primary" id="sc-total-val"></div>
            <div class="kpi-sub" id="sc-total-sub"></div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="compliance-kpi-card" id="sc-kpi-ontrack">
            <div class="kpi-label">On Track</div>
            <div class="kpi-value text-success" id="sc-ontrack-val"></div>
            <div class="kpi-sub" id="sc-ontrack-sub"></div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="compliance-kpi-card" id="sc-kpi-atrisk">
            <div class="kpi-label">At Risk</div>
            <div class="kpi-value" style="color:#e67e22;" id="sc-atrisk-val"></div>
            <div class="kpi-sub">needs attention</div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="compliance-kpi-card" id="sc-kpi-critical">
            <div class="kpi-label">Critical</div>
            <div class="kpi-value text-danger" id="sc-critical-val"></div>
            <div class="kpi-sub">require immediate action</div>
          </div>
        </div>
      </div>

      <!-- Perspectives -->
      <div class="mb-3">
        <div class="mb-2 perspectives-title">
          PERSPECTIVES click to drill down
        </div>
        <div class="row g-2" id="perspectiveCards">
          <!-- Generated by JS -->
        </div>
      </div>

      <!-- Drill-Down Panel -->
      <div id="sdDrillPanel" class="sc-drilldown-panel mb-3" style="display:none;"></div>

      <!-- KPI Register Table -->
      <div class="sc-kpi-table-section mb-3">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <div class="sc-kpi-table-title">KPI Register</div>
          <div class="d-flex gap-2">
            <span class="sc-filter-btn active" onclick="sdFilter(this,'all')">All</span>
            <span class="sc-filter-btn" onclick="sdFilter(this,'On Track')">On Track</span>
            <span class="sc-filter-btn" onclick="sdFilter(this,'At Risk')">At Risk</span>
            <span class="sc-filter-btn" onclick="sdFilter(this,'Critical')">Critical</span>
          </div>
        </div>
        <div style="max-height: 360px; overflow-y:auto; overflow-x:auto;">
          <table class="table sc-kpi-table align-middle" id="sdKpiTable" style="width:100%">
            <thead style="position: sticky; top: 0; background: #fff; z-index: 2;" >
              <tr>
                <th>KPI Name</th>
                <th>Perspective</th>
                <th>Objective</th>
                <th>Target</th>
                <th>Actual</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Trend</th>
                <th>Frequency</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody id="sdKpiBody">
    
            </tbody>
          </table>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="row g-3 mb-3">
        <div class="col-lg-8">
          <div class="chart-card">
            <div class="chart-title">KPI Status by Perspective</div>
            <div class="chart-container"><canvas id="sdBarChart"></canvas></div>
            <div class="d-flex gap-3 mt-2 justify-content-center chart-legend">
              <span><span class="legend-dot me-1" style="background:#27ae60;"></span>On Track</span>
              <span><span class="legend-dot me-1" style="background:#2980b9;"></span>In Progress</span>
              <span><span class="legend-dot me-1" style="background:#e67e22;"></span>At Risk</span>
              <span><span class="legend-dot me-1" style="background:#e74c3c;"></span>Critical</span>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="chart-card">
            <div class="chart-title">Portfolio Status Mix</div>
            <div class="chart-container d-flex align-items-center justify-content-center position-relative">
              <canvas id="sdDonutMix" style="max-width:180px;max-height:180px;"></canvas>
              <div class="sc-donut-center-text">
                <div class="big" id="totalKpiData"></div>
                <div class="sm">Total KPIs</div>
              </div>
            </div>
            <div class="sc-legend-row justify-content-center mt-2">
              <div class="sc-legend-item">
                <div class="sc-legend-dot" style="background:#27ae60;"></div>On Track <strong class="ms-1"
                  style="color:#27ae60;" id="onTrackData"></strong>
              </div>
              <div class="sc-legend-item">
                <div class="sc-legend-dot" style="background:#e67e22;"></div>At Risk <strong class="ms-1"
                  style="color:#e67e22;" id="atRiskData"></strong>
              </div>
              <div class="sc-legend-item">
                <div class="sc-legend-dot" style="background:#e74c3c;"></div>Critical <strong class="ms-1"
                  style="color:#e74c3c;" id="criticalData"></strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Achievement Progress -->
      <div class="mb-2 perspectives-title">
        ACHIEVEMENT PROGRESS BY PERSPECTIVE
      </div>
      <div class="row g-3 mb-3" id="prespectiveIdCards">
        <!-- <div class="col-lg-3 col-md-6">
          <div class="sc-achieve-card">
            <div class="sc-a-persp" style="color:#27ae60;">Financial</div>
            <div class="sc-a-count">26 of 32 KPIs on track</div>
            <div class="sc-achieve-bar-bg">
              <div class="sc-achieve-bar-fill" style="background:#27ae60;width:82%;"></div>
            </div>
            <div class="sc-achieve-pct" style="color:#27ae60;">82% impl.</div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="sc-achieve-card">
            <div class="sc-a-persp" style="color:#2980b9;">Customer</div>
            <div class="sc-a-count">18 of 28 KPIs on track</div>
            <div class="sc-achieve-bar-bg">
              <div class="sc-achieve-bar-fill" style="background:#2980b9;width:65%;"></div>
            </div>
            <div class="sc-achieve-pct" style="color:#2980b9;">65% impl.</div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="sc-achieve-card">
            <div class="sc-a-persp" style="color:#e67e22;">Internal Process</div>
            <div class="sc-a-count">17 of 30 KPIs on track</div>
            <div class="sc-achieve-bar-bg">
              <div class="sc-achieve-bar-fill" style="background:#e67e22;width:58%;"></div>
            </div>
            <div class="sc-achieve-pct" style="color:#e67e22;">58% impl.</div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="sc-achieve-card">
            <div class="sc-a-persp" style="color:#9b59b6;">Learning &amp; Growth</div>
            <div class="sc-a-count">16 of 22 KPIs on track</div>
            <div class="sc-achieve-bar-bg">
              <div class="sc-achieve-bar-fill" style="background:#9b59b6;width:74%;"></div>
            </div>
            <div class="sc-achieve-pct" style="color:#9b59b6;">74% impl.</div>
          </div>
        </div> -->
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
	<script src="${contextroot}/js/scorecardDashboard.js"></script>
	<script src="${contextroot}/js/initial.js"></script>
  <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>

<!-- DataTables CSS -->
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
	
<script>
    
  
    

</script>



  
</body>