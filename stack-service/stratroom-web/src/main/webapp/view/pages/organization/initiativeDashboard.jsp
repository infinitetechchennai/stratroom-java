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

.init-card {
  background: var(--stratroom-body-bg);
  border: 1px solid var(--stratroom-border-color);
  border-radius: 10px;
  padding: 16px;
  cursor: pointer;
  transition: box-shadow .15s, transform .2s ease;
  
  &:hover { 
    box-shadow: 0 4px 16px rgba(0,0,0,0.1); 
    transform: translateY(-2px);
  }
  &.active { 
    outline: 2px solid var(--stratroom-primary, #2980b9);
    outline-offset: 2px;
  }
  
  .init-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 10px; }
  .init-id { 
    font-size: 10px; font-weight: 700; color: #888; 
    background: #f0f0f0; border-radius: 3px; padding: 2px 6px; 
  }
  .init-name { font-size: 13px; font-weight: 700; color: var(--stratroom-body-color); margin-bottom: 4px; }
  .init-owner { font-size: 11px; color: #888; margin-bottom: 10px; }
  
  .init-prog-bg { width: 100%; height: 6px; background: #eee; border-radius: 3px; margin-bottom: 6px; }
  .init-prog-fill { height: 6px; border-radius: 3px; }
  .init-prog-row { display: flex; justify-content: space-between; font-size: 11px; color: #555; margin-bottom: 10px; }
  
  .init-counts { display: flex; gap: 8px; margin-top: 8px; }
  .count-badge { font-size: 10px; font-weight: 600; border-radius: 3px; padding: 2px 6px; }
}
.pill-purple { background: #f5eeff; color: #9b59b6; }


.tree-panel { 
  background: var(--stratroom-body-bg); 
  border: 1px solid var(--stratroom-border-color); 
  border-radius: 10px; 
  padding: 18px 20px; 
  margin-bottom: 20px; 
  animation: fadeInPanel 0.35s ease forwards;
}

.tree-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.tree-title { font-size: 14px; font-weight: 700; color: var(--stratroom-body-color); }

.tree-node { 
  display: flex; align-items: center; padding: 7px 10px; border-radius: 5px; margin-bottom: 3px; cursor: pointer; 
  transition: background 0.15s;
  &:hover { background: var(--stratroom-secondary-bg, #f8f8ff); }
}
.tree-indent { display: inline-block; }
.tree-icon { 
  width: 16px; height: 16px; border-radius: 3px; display: flex; align-items: center; 
  justify-content: center; font-size: 9px; font-weight: 700; color: #fff; margin-right: 8px; flex-shrink: 0; 
}
.tree-label { font-size: 12px; font-weight: 600; color: var(--stratroom-body-color); flex: 1; }
.tree-sublabel { font-size: 11px; color: #888; margin-left: 8px; }
.tree-right { display: flex; align-items: center; gap: 8px; margin-left: auto; }
.tree-bar-bg { width: 60px; height: 5px; background: #eee; border-radius: 3px; }
.tree-bar-fill { height: 5px; border-radius: 3px; }
.tree-pct { font-size: 10px; color: #888; min-width: 30px; text-align: right; }
.tree-date { font-size: 10px; color: #888; min-width: 70px; }


.gantt-card { 
  background: var(--stratroom-body-bg); 
  border: 1px solid var(--stratroom-border-color); 
  border-radius: 10px; padding: 18px 20px; margin-bottom: 20px; 
}
.gantt-title { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 14px; }
.gantt-table { width: 100%; }
.gantt-row { display: flex; align-items: center; border-bottom: 1px solid var(--stratroom-border-color); padding: 7px 0; }
.gantt-label { width: 180px; font-size: 12px; color: var(--stratroom-body-color); flex-shrink: 0; }
.gantt-track { flex: 1; height: 22px; background: #f5f5f5; border-radius: 3px; position: relative; }
.gantt-bar { 
  position: absolute; height: 100%; border-radius: 3px; display: flex; align-items: center; 
  padding-left: 6px; font-size: 10px; font-weight: 600; color: #fff; white-space: nowrap; overflow: hidden; 
}
.gantt-milestone { 
  position: absolute; top: 50%; transform: translateY(-50%); width: 10px; height: 10px; 
  background: #e74c3c; border-radius: 50%; 
}
.gantt-months { display: flex; padding: 4px 0 8px 180px; }
.gantt-month { flex: 1; text-align: center; font-size: 10px; color: #888; font-weight: 600; }

.ms-card { 
  background: var(--stratroom-body-bg); 
  border: 1px solid var(--stratroom-border-color); 
  border-radius: 10px; padding: 18px 20px; margin-bottom: 20px; 
}
.ms-title { font-size: 14px; font-weight: 700; color: var(--stratroom-body-color); margin-bottom: 12px; }

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
</style>
</head>

<script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>
  <link href="assets/css/main.css?v0.004" rel="stylesheet">
    <link href="assets/css/responsive.css" rel="stylesheet">
     <link href="assets/css/bootstrap.min.css" rel="stylesheet">
	   <link href="assets/css/basic.css?v0.006" rel="stylesheet">

     <!-- Font Awsome Icons -->
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
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
        <!-- Page Header -->
        <div class="container-lg">
            <div class="page-header grid gap-2 pb-1">
                <div class="g-col-12 g-col-md-4 d-flex align-items-center">
                    <h4 class="title mb-0 fs-5 fw-bold d-flex align-items-center gap-2 text-uppercase"
                        style="letter-spacing: 0.05em; color: var(--bs-body-color);">
                        <span class="icon d-flex align-items-center" style="color: var(--bs-body-color);">
                            <i data-lucide="presentation" style="width: 20px; height: 20px; stroke-width: 2px;"></i>
                        </span>
                        <span>STRATEGIC INITIATIVES DASHBOARD</span>
                    </h4>
                </div>
                <div
                    class="g-col-12 g-col-md-8 d-flex justify-content-md-end justify-content-start align-items-center mt-2 mt-md-0">
                    <select name="deptrepotees" id="deptrepotees" style="border: 1px solid #dddd;border-radius: 5px;margin-right: 20px;height: 28px;width: 130px;"></select>
                    <div class="overall-score-v2 d-flex">
                        <div>
                            <div class="score-label">PORTFOLIO PROGRESS</div>
                            <div class="score-detail"></div>
                        </div>
                        <div class="score-percent" style="color: #2980b9;"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container-lg py-3">

            <!-- Summary KPI Cards -->
            <div class="row g-3 mb-3">
                <div class="col-lg col-md-6">
                    <div class="compliance-kpi-card">
                        <div class="kpi-label text-uppercase">Initiatives</div>
                        <div class="kpi-value text-primary totalInitiative">-</div>
                        <div class="kpi-sub">active this cycle</div>
                    </div>
                </div>
                <div class="col-lg col-md-6">
                    <div class="compliance-kpi-card">
                        <div class="kpi-label text-uppercase">Sub-Initiatives</div>
                        <div class="kpi-value totalSubInitiative" style="color:#9b59b6; ">-</div>
                        <div class="kpi-sub">across all initiatives</div>
                    </div>
                </div>
                <div class="col-lg col-md-6">
                    <div class="compliance-kpi-card">
                        <div class="kpi-label text-uppercase">Activities</div>
                        <div class="kpi-value text-success totalActivity">-</div>
                        <div class="kpi-sub">32 in progress</div>
                    </div>
                </div>
                <div class="col-lg col-md-6">
                    <div class="compliance-kpi-card">
                        <div class="kpi-label text-uppercase ">Tasks</div>
                        <div class="kpi-value totalTask" style="color:#e67e22;">-</div>
                        <div class="kpi-sub">89 completed</div>
                    </div>
                </div>
                <div class="col-lg col-md-6">
                    <div class="compliance-kpi-card">
                        <div class="kpi-label text-uppercase">Milestones</div>
                        <div class="kpi-value text-danger totalMilestone">-</div>
                        <div class="kpi-sub">6 overdue</div>
                    </div>
                </div>
            </div>

            <!-- Initiatives Grid -->
            <div class="mb-4">
                <div class="text-uppercase fw-bold text-muted mb-3" style="font-size:11px; letter-spacing:0.5px;">
                    INITIATIVES - CLICK TO EXPAND HIERARCHY
                </div>
              <div class="row g-3" id="initiativeCards">

              </div>    
            </div>

            <!-- Hierarchy Tree Panel -->
            <div id="treePanel" class="tree-panel" style="display:none;"></div>

            <!-- Gantt Timeline -->
            <div class="row mb-4">
                <div class="col-12">
                    <div class="gantt-card mb-0">
                        <div class="gantt-title">TIMELINE - GANTT VIEW</div>
                        <div class="table-responsive">
                            <div style="min-width: 700px;">
                                <div class="gantt-months">
                                    <span class="gantt-month">Jan</span><span class="gantt-month">Feb</span><span
                                        class="gantt-month">Mar</span>
                                    <span class="gantt-month">Apr</span><span class="gantt-month">May</span><span
                                        class="gantt-month">Jun</span>
                                    <span class="gantt-month">Jul</span><span class="gantt-month">Aug</span><span
                                        class="gantt-month">Sep</span>
                                    <span class="gantt-month">Oct</span><span class="gantt-month">Nov</span><span
                                        class="gantt-month">Dec</span>
                                </div>
                                <div class="gantt-table" id="ganttContainer">
                                    <!-- JS Rendered -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Charts Row -->
            <div class="row g-3 mb-4">
                <div class="col-lg-4">
                    <div class="chart-card h-100">
                        <div class="chart-title">ACTIVITY STATUS MIX</div>
                        <div class="chart-container d-flex align-items-center justify-content-center position-relative">
                            <canvas id="actDonut" style="max-width:160px;max-height:160px;"></canvas>
                            <div class="sc-donut-center-text" style="position:absolute; text-align:center;">
                                <div class="fs-4 fw-bold text-dark">47</div>
                                <div class="text-muted" style="font-size:11px;">Activities</div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center gap-3 mt-3">
                            <div class="text-muted" style="font-size:12px;"><span
                                    class="d-inline-block rounded-circle me-1"
                                    style="width:8px;height:8px;background:#27ae60;"></span>Done <strong
                                    style="color:#27ae60;">18</strong></div>
                            <div class="text-muted" style="font-size:12px;"><span
                                    class="d-inline-block rounded-circle me-1"
                                    style="width:8px;height:8px;background:#2980b9;"></span>Active <strong
                                    style="color:#2980b9;">19</strong></div>
                            <div class="text-muted" style="font-size:12px;"><span
                                    class="d-inline-block rounded-circle me-1"
                                    style="width:8px;height:8px;background:#e67e22;"></span>Pending <strong
                                    style="color:#e67e22;">10</strong></div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="chart-card h-100">
                        <div class="chart-title">MILESTONE STATUS</div>
                        <div class="chart-container d-flex align-items-center justify-content-center position-relative">
                            <canvas id="msDonut" style="max-width:160px;max-height:160px;"></canvas>
                            <div class="sc-donut-center-text" style="position:absolute; text-align:center;">
                                <div class="fs-4 fw-bold text-dark">28</div>
                                <div class="text-muted" style="font-size:11px;">Milestones</div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center gap-3 mt-3">
                            <div class="text-muted" style="font-size:12px;"><span
                                    class="d-inline-block rounded-circle me-1"
                                    style="width:8px;height:8px;background:#27ae60;"></span>Met <strong
                                    style="color:#27ae60;">14</strong></div>
                            <div class="text-muted" style="font-size:12px;"><span
                                    class="d-inline-block rounded-circle me-1"
                                    style="width:8px;height:8px;background:#e67e22;"></span>Upcoming <strong
                                    style="color:#e67e22;">8</strong></div>
                            <div class="text-muted" style="font-size:12px;"><span
                                    class="d-inline-block rounded-circle me-1"
                                    style="width:8px;height:8px;background:#e74c3c;"></span>Overdue <strong
                                    style="color:#e74c3c;">6</strong></div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="chart-card h-100">
                        <div class="chart-title">TASK COMPLETION BY INITIATIVE</div>
                        <div style="height: 180px;"><canvas id="taskBar"></canvas></div>
                    </div>
                </div>
            </div>

            <!-- MILESTONE REGISTER (DataTable) -->
            <div class="ms-card mb-3">
                <div class="ms-title">MILESTONE REGISTER</div>
                <div class="table-responsive">
                    <table class="table sc-table align-middle" id="msTable" style="width:100%">
                        <thead>
                            <tr>
                                <th>MILESTONE</th>
                                <th>INITIATIVE</th>
                                <th>OWNER</th>
                                <th>DUE DATE</th>
                                <th>COMPLETION</th>
                                <th>STATUS</th>
                                <th>DAYS LEFT</th>
                            </tr>
                        </thead>
                        <tbody>
                         
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </main>

    <footer class="col-12 text-center py-2 copyright">
        <p class="mb-0">Copyright &copy; <span id="year"></span> <strong>StratRoom</strong></p>
        <script>document.getElementById("year").textContent = new Date().getFullYear();</script>
    </footer>s

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
	<script src="${contextroot}/js/kpidata_form.js"></script>
	<script src="${contextroot}/js/initial.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  
	 <script>
    // ===== INIT DATA & VARIABLES =====

$(document).ready(function() {
    // Load departments on page load
    loadDepartments();
  // initCharts();
    // Listen for changes on the department dropdown
    $("#deptrepotees").on("change", function() {
        var selectedDeptId = $(this).val();
        
        if (selectedDeptId) {
            loadRiskDashboardData(selectedDeptId);
        }
    });
});
function loadDepartments() {
    const $dropdown = $("#deptrepotees");
    $dropdown.empty().append('<option></option>'); // Visual feedback

    $.ajax({
        type: "GET",
        url: "/stratroom/departmentReportees",
        dataType: "json", // Explicitly expect JSON
        success: function (data) {
            console.log("Server Response:", data);
            $dropdown.empty(); // Clear "Loading..."

            if (!data || data.length === 0) {
                $dropdown.append('<option value="">No departments found</option>');
                return;
            }

            $.each(data, function (index, dept) {
                // Double check if 'id' and 'name' are the correct keys
                if(dept.id && dept.name) {
                    $dropdown.append(
                        $('<option>', { value: dept.id, text: dept.name })
                    );
                } else {
                    console.error("Unexpected item structure at index " + index, dept);
                }
            });

            // Set default and trigger change
            const firstDeptId = $dropdown.find('option:first').val();
            if (firstDeptId) {
                $dropdown.val(firstDeptId).trigger("change");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $dropdown.empty().append('<option>Error loading data</option>');
            console.error("AJAX Error:", textStatus, errorThrown);
            console.log("Response Text:", jqXHR.responseText);
        }
    });
}

function loadRiskDashboardData(deptId) {
    $.ajax({
        type: "GET",
        url: "initiativeDashBoardData",
        data: { deptId: deptId },
        dataType: "json",
        success: function (response) {
            console.log(response, "response");

            var totalProgress = response.totalProgress || 0;
            var scoreDetailEl1 = document.querySelector('.score-percent');
            if (scoreDetailEl1) scoreDetailEl1.textContent = totalProgress + " %";
            // === 1. Update Summary Counters (Your Original Logic) ===
            var totalInitiatives = response.totalInitiative || 0;
            var scoreDetailEl = document.querySelector('.score-detail');
            if (scoreDetailEl) scoreDetailEl.textContent = totalInitiatives + " active initiatives";

            var scoretotalInitiative = document.querySelector('.totalInitiative');
            if (scoretotalInitiative) scoretotalInitiative.textContent = totalInitiatives;

            var totalSubInitiative = response.totalSubInitiative || 0;
            var scoretotalSubInitiative = document.querySelector('.totalSubInitiative');
            if (scoretotalSubInitiative) scoretotalSubInitiative.textContent = totalSubInitiative;

            var totalActivity = response.totalActivity || 0;
            var scoretotalActivity = document.querySelector('.totalActivity');
            if (scoretotalActivity) scoretotalActivity.textContent = totalActivity;

            var totalTask = response.totalTask || 0;
            var scoretotalTask = document.querySelector('.totalTask');
            if (scoretotalTask) scoretotalTask.textContent = totalTask;

            var totalMilestone = response.totalMilestone || 0;
            var scoretotalMilestone = document.querySelector('.totalMilestone');
            if (scoretotalMilestone) scoretotalMilestone.textContent = totalMilestone;


            // === 2. Update KPI Sub-texts (Your Original Logic) ===
            
            // 📊 Activities Sub
            var activityCard = document.querySelector('.totalActivity');
            if (activityCard && activityCard.closest) {
                var activitySub = activityCard.closest('.compliance-kpi-card').querySelector('.kpi-sub');
                if (activitySub) {
                    var inProgress = response.activityStatusDTO?.Inprogress || 0;
                    activitySub.textContent = inProgress + " in progress";
                }
            }

            // ✅ Tasks Sub
            var taskCard = document.querySelector('.totalTask');
            if (taskCard && taskCard.closest) {
                var taskSub = taskCard.closest('.compliance-kpi-card').querySelector('.kpi-sub');
                if (taskSub) {
                    var taskInProgress = response.taskStatusCount?.['in progress'] || 0;
                    var totalTasks = response.totalTask || 0;
                    var completedTasks = totalTasks - taskInProgress;
                    taskSub.textContent = completedTasks + " completed";
                }
            }

            // 🎯 Milestones Sub
            var milestoneCard = document.querySelector('.totalMilestone');
            if (milestoneCard && milestoneCard.closest) {
                var milestoneSub = milestoneCard.closest('.compliance-kpi-card').querySelector('.kpi-sub');
                if (milestoneSub) {
                    var pending = response.milestoneStatusCount?.Pending || 0;
                    milestoneSub.textContent = pending + " overdue";
                }
            }

            // === 3. NEW: Generate Initiative Cards HTML ===
            renderInitiativeCards(response.initiveDTO);

              // Render Milestone Table
            renderMilestoneTable(response.initiveDTO);

            renderGantt(response.initiveDTO);
          
                initCharts(response);
        }
    });
}

/**
 * Helper function to generate and inject HTML cards using + concatenation
 */
function renderInitiativeCards(initiatives) {
    var container = document.getElementById('initiativeCards');
    if (!container) return;

    var htmlContent = '';

    if (initiatives && initiatives.length > 0) {
        for (var i = 0; i < initiatives.length; i++) {
            var item = initiatives[i];
            var val = item.initiativeValue;
            
            // 1. Determine ID
            var cardId = val.initiativeId || (item.initiativeId);

            // 2. Determine Status Color & Label
            var statusInfo = getStatusDetails(val.statusIndicator);

            // 3. Get Progress
            var progress = val.progressval || val.actualValue || 0;

            // 4. Get Owner Name
            var ownerName = val.ownerName || val.createdByName || "";
            
            // 5. Get Due Date
            var dueDate = "";
            if (val.dateString) {
                var parts = val.dateString.split('-');
                if (parts.length > 1) {
                    dueDate = parts[1].trim();
                } else {
                    dueDate = val.dateString;
                }
            }

            // 6. Get Counts
            var subInitCount = item.subInitiativeCount || (item.subInitiativeList ? item.subInitiativeList.length : 0);
            var actCount = item.activityCount || (item.activitiesList ? item.activitiesList.length : 0);
            var mileCount = item.milestoneCount || (item.mileStonesList ? item.mileStonesList.length : 0);

            // 7. Build HTML String using + concatenation
            htmlContent += 
            '<div class="col-lg-4 col-md-6">' +
              '<div class="init-card" onclick="toggleTree(\'' + cardId + '\')" style="--stratroom-primary: ' + statusInfo.colorHex + '">' +
                '<div class="init-top">' +
                  '<span class="init-id">' + cardId + '</span>' +
                  '<span class="sc-pill ' + statusInfo.pillClass + '">' + statusInfo.label + '</span>' +
                '</div>' +
                '<div class="init-name">' + val.name + '</div>' +
                '<div class="init-owner">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user" style="width:12px; height:12px;">' +
                        '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>' +
                        '<circle cx="12" cy="7" r="4"></circle>' +
                    '</svg> ' +
                    ownerName + ' - Due: ' + dueDate +
                '</div>' +
                '<div class="init-prog-bg">' +
                    '<div class="init-prog-fill" style="background:' + statusInfo.colorHex + ';width:' + progress + '%;"></div>' +
                '</div>' +
                '<div class="init-prog-row">' +
                    '<span>Progress</span>' +
                    '<strong style="color:' + statusInfo.colorHex + ';">' + progress + '%</strong>' +
                '</div>' +
                '<div class="init-counts">' +
                  '<span class="count-badge pill-purple">' + subInitCount + ' Sub-Init</span>' +
                  '<span class="count-badge" style="background:#e8f3fb;color:#2980b9;">' + actCount + ' Activities</span>' +
                  '<span class="count-badge" style="background:#fef3e2;color:#e67e22;">' + mileCount + ' Milestones</span>' +
                '</div>' +
              '</div>' +
            '</div>';
        }
    } else {
        htmlContent = '<div class="col-12 text-center text-muted p-4">No initiatives found.</div>';
    }

    container.innerHTML = htmlContent;
}

/**
 * Helper to map API status strings to CSS classes and Hex colors
 */
function getStatusDetails(statusIndicator) {
    var result = {
        label: "In Progress",
        pillClass: "pill-blue",
        colorHex: "#2980b9"
    };

    if (!statusIndicator) return result;

    var status = statusIndicator.toUpperCase();

    if (status === 'GREEN' || status === 'ON TRACK') {
        result.label = "On Track";
        result.pillClass = "pill-green";
        result.colorHex = "#27ae60";
    } else if (status === 'ORANGE' || status === 'AT RISK' || status === 'WARNING') {
        result.label = "At Risk";
        result.pillClass = "pill-orange";
        result.colorHex = "#e67e22";
    } else if (status === 'RED' || status === 'CRITICAL' || status === 'DANGER') {
        result.label = "Critical";
        result.pillClass = "pill-red";
        result.colorHex = "#e74c3c";
    }
    // Default remains Blue/In Progress

    return result;
}


/**
 * Renders the Milestone Register table from API data
 */
function renderMilestoneTable(initiatives) {
    var tbody = document.querySelector('#msTable tbody');
    if (!tbody) return;

    // 1. Get the "Current Date" from the input field
    var datePeriodVal = $('#datePeriod').val(); 
    var currentDateObj = parseDate(datePeriodVal); 
    
    // Fallback to actual today if input is empty or invalid
    if (!currentDateObj) {
        currentDateObj = new Date();
    }

    var rows = '';

    if (initiatives && initiatives.length > 0) {
        for (var i = 0; i < initiatives.length; i++) {
            var item = initiatives[i];
            var initVal = item.initiativeValue;
            var initName = initVal.name || '';
            var initId = initVal.initiativeId ||""
            var initOwner = initVal.ownerName || initVal.createdByName || '';

            var milestones = item.mileStonesList || [];
            
            for (var j = 0; j < milestones.length; j++) {
                var ms = milestones[j];
                var msVal = ms.mileStonesValue || {};
                
                // Milestone name
                var msName = msVal.desc || msVal.name || '';
                
                // Owner (use milestone owner if exists, else initiative owner)
                var owner = msVal.ownerName || initOwner;
                
                // Due Date & Days Left
                var dueDateDisplay = '';
                var daysLeft = null;
                
                if (msVal.dateRange) {
                    // API format: "07/31/2025" or "01 Jul 2024 - 30 Dec 2025"
                    var dateStr = msVal.dateRange;
                    
                    // Extract the end date if it's a range
                    if (dateStr.indexOf('-') > -1) {
                        var parts = dateStr.split('-');
                        dueDateDisplay = parts[1].trim();
                    } else {
                        dueDateDisplay = formatDateReadable(dateStr);
                    }

                    // Calculate Days Left based on the #datePeriod value
                    var dueDateObj = parseDate(dueDateDisplay);
                    if (dueDateObj && currentDateObj) {
                        // Reset hours to ensure accurate day calculation
                        currentDateObj.setHours(0,0,0,0);
                        dueDateObj.setHours(0,0,0,0);
                        
                        var diffTime = dueDateObj.getTime() - currentDateObj.getTime();
                        daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    }
                }
                
                // Progress
                var progress = msVal.progress || msVal.progressval || 0;
                
                // Status determination
                var statusInfo = getMilestoneStatus(progress, daysLeft, msVal.status);
                
                // Build row HTML using + concatenation
                rows += 
                '<tr>' +
                    '<td><strong>' + msName + '</strong></td>' +
                    '<td>' + initId + '</td>' +
                    '<td>' + owner + '</td>' +
                    '<td>' + dueDateDisplay + '</td>' +
                    '<td>' +
                        '<span class="sc-prog-bar d-inline-block me-2 align-middle" style="width:70px;">' +
                            '<span class="sc-prog-fill" style="background:' + statusInfo.colorHex + ';width:' + progress + '%;"></span>' +
                        '</span>' + progress + '%' +
                    '</td>' +
                    '<td><span class="sc-pill ' + statusInfo.pillClass + '">' + statusInfo.label + '</span></td>' +
                    '<td style="color:' + statusInfo.colorHex + ';font-weight:600;">' + (daysLeft !== null ? daysLeft : '-') + '</td>' +
                '</tr>';
            }
        }
    }

    if (rows === '') {
        rows = '<tr><td colspan="7" class="text-center text-muted p-4">No milestones found</td></tr>';
    }

    tbody.innerHTML = rows;
}

/**
 * Helper: Robust Date Parser
 * Handles "YYYY-MM-DD", "MM/DD/YYYY", and "DD MMM YYYY"
 */
function parseDate(dateString) {
    if (!dateString) return null;
    
    // Try standard JS parsing first (works for YYYY-MM-DD and most US formats)
    var d = new Date(dateString);
    if (!isNaN(d.getTime())) {
        return d;
    }

    // Manual parsing for DD/MM/YYYY or MM/DD/YYYY if standard fails
    // Note: Adjust split logic based on your specific #datePeriod format
    var parts = dateString.split('/');
    if (parts.length === 3) {
        // Assuming MM/DD/YYYY based on previous API examples
        return new Date(parts[2], parts[0] - 1, parts[1]);
    }
    
    // Manual parsing for "30 Dec 2025"
    var months = { jan:0, feb:1, mar:2, apr:3, may:4, jun:5, jul:6, aug:7, sep:8, oct:9, nov:10, dec:11 };
    var match = dateString.match(/(\d{1,2})\s([a-z]{3})\s(\d{4})/i);
    if (match) {
        var day = parseInt(match[1]);
        var month = months[match[2].toLowerCase()];
        var year = parseInt(match[3]);
        if (month !== undefined) {
            return new Date(year, month, day);
        }
    }

    return null;
}

/**
 * Helper: Format date string to readable format for display
 */
function formatDateReadable(dateStr) {
    if (!dateStr) return 'TBD';
    // If already in "DD MMM YYYY" format, return as-is
    if (/[A-Za-z]{3}/.test(dateStr)) return dateStr;
    
    try {
        var parts = dateStr.split('/');
        if (parts.length === 3) {
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            // Assuming MM/DD/YYYY from API
            return parts[1] + ' ' + months[parseInt(parts[0])-1] + ' ' + parts[2];
        }
    } catch(e) {}
    return dateStr;
}

/**
 * Helper: Determine milestone status based on progress and days left
 */
function getMilestoneStatus(progress, daysLeft, apiStatus) {
    var result = {
        label: "In Progress",
        pillClass: "pill-blue",
        colorHex: "#2980b9"
    };

    // If API provides explicit status, use it
    if (apiStatus) {
        var status = apiStatus.toUpperCase();
        if (status === 'COMPLETE' || status === 'COMPLETED') {
            result.label = "Completed";
            result.pillClass = "pill-green";
            result.colorHex = "#27ae60";
            return result;
        }
        if (status === 'OVERDUE' || status === 'CRITICAL') {
            result.label = "Overdue";
            result.pillClass = "pill-red";
            result.colorHex = "#e74c3c";
            return result;
        }
        if (status === 'AT RISK' || status === 'WARNING') {
            result.label = "At Risk";
            result.pillClass = "pill-orange";
            result.colorHex = "#e67e22";
            return result;
        }
    }

    // Auto-determine based on progress and days calculated from #datePeriod
    if (progress >= 100) {
        result.label = "Completed";
        result.pillClass = "pill-green";
        result.colorHex = "#27ae60";
    } else if (daysLeft !== null && daysLeft < 0) {
        result.label = "Overdue";
        result.pillClass = "pill-red";
        result.colorHex = "#e74c3c";
    } else if (daysLeft !== null && daysLeft <= 7 && progress < 80) {
        result.label = "At Risk";
        result.pillClass = "pill-orange";
        result.colorHex = "#e67e22";
    } else if (progress < 30) {
        result.label = "Behind";
        result.pillClass = "pill-orange";
        result.colorHex = "#e67e22";
    }
    // Default: In Progress (blue)

    return result;
}


// ===== GANTT CHART =====
    function renderGantt(initiatives) {
    var container = document.getElementById('ganttContainer');
    if (!container) return;

    if (!initiatives || initiatives.length === 0) {
        container.innerHTML = '<div class="text-muted p-3">No initiatives found</div>';
        return;
    }

    // 1. Parse dates and find global timeline bounds
    var parsedItems = [];
    var minDate = null;
    var maxDate = null;

    for (var i = 0; i < initiatives.length; i++) {
        var item = initiatives[i];
        var val = item.initiativeValue;
        var dateStr = val.daterange || val.dateString || "";
        
        var dates = dateStr.split('-');
        var start = parseDate(dates[0].trim());
        var end = parseDate(dates.length > 1 ? dates[1].trim() : dates[0].trim());

        if (start && end) {
            if (!minDate || start.getTime() < minDate.getTime()) minDate = start;
            if (!maxDate || end.getTime() > maxDate.getTime()) maxDate = end;
            
            parsedItems.push({
                id: val.initiativeId || (item.initiativeId),
                name: val.name,
                start: start,
                end: end,
                status: val.statusIndicator
            });
        }
    }

    if (parsedItems.length === 0) {
        container.innerHTML = '<div class="text-muted p-3">No valid date ranges found</div>';
        return;
    }

    // Calculate total timeline duration in milliseconds
    var totalMs = maxDate.getTime() - minDate.getTime();
    if (totalMs <= 0) totalMs = 1; // Prevent division by zero

    // 2. Build HTML rows
    var html = '';
    for (var j = 0; j < parsedItems.length; j++) {
        var p = parsedItems[j];
        var statusInfo = getStatusDetails(p.status);
        var color = statusInfo.colorHex;

        // Calculate percentages for left position and width
        var leftPct = ((p.start.getTime() - minDate.getTime()) / totalMs) * 100;
        var widthPct = ((p.end.getTime() - p.start.getTime()) / totalMs) * 100;

        // Safety caps to keep bars inside container
        if (leftPct < 0) leftPct = 0;
        if (widthPct < 1) widthPct = 1;
        if (leftPct + widthPct > 100) widthPct = 100 - leftPct;

        html += '<div class="gantt-row">' +
            '<div class="gantt-label"><strong>' + p.id + '</strong> ' + p.name + '</div>' +
            '<div class="gantt-track">' +
                '<div class="gantt-bar" style="background:' + color + ';left:' + leftPct + '%;width:' + widthPct + '%;">' + p.name + '</div>' +
            '</div>' +
        '</div>';
    }

    container.innerHTML = html;
}
 // ===== CHARTS =====
       
function initCharts(response) {
    // === 1. Activity Status Donut (actDonut) ===
    var activityComplete = response.activityStatusDTO?.Complete || 0;
    var activityInProgress = response.activityStatusDTO?.Inprogress || 0;
    var activityTotal = response.totalActivity || 0;
    var activityPending = activityTotal - activityComplete - activityInProgress;
    if (activityPending < 0) activityPending = 0;
    
    var actDonutCtx = document.getElementById('actDonut');
    if (actDonutCtx) {
        // Update center text total
        var actCard = actDonutCtx.closest('.chart-card');
        if (actCard) {
            var actCenter = actCard.querySelector('.sc-donut-center-text .fs-4');
            if (actCenter) actCenter.textContent = activityTotal;
            
            // Update legend numbers
            var actLegend = actCard.querySelectorAll('.d-flex.gap-3 .text-muted strong');
            if (actLegend.length >= 3) {
                actLegend[0].textContent = activityComplete;
                actLegend[1].textContent = activityInProgress;
                actLegend[2].textContent = activityPending;
            }
        }
        
        // Destroy existing chart if any
        if (window.actDonutChart) window.actDonutChart.destroy();
        
        // Create new chart
        window.actDonutChart = new Chart(actDonutCtx, {
            type: 'doughnut',
            data: { 
                labels: ['Done', 'Active', 'Pending'], 
                datasets: [{ 
                    data: [activityComplete, activityInProgress, activityPending], 
                    backgroundColor: ['#27ae60', '#2980b9', '#e67e22'], 
                    borderWidth: 1, 
                    borderColor: '#fff' 
                }] 
            },
            options: { 
                cutout: '65%', 
                plugins: { legend: { display: false } }, 
                responsive: true, 
                maintainAspectRatio: true 
            }
        });
    }

    // === 2. Milestone Status Donut (msDonut) ===
    var milestoneTotal = response.totalMilestone || 0;
    var milestonePending = response.milestoneStatusCount?.Pending || 0;
    
    // Note: API only provides "Pending" count. 
    // Adjust this logic based on your actual business rules for Met/Upcoming/Overdue
    var milestoneMet = 0; // Would need API field for completed milestones
    var milestoneUpcoming = milestonePending;
    var milestoneOverdue = milestoneTotal - milestoneMet - milestoneUpcoming;
    if (milestoneOverdue < 0) milestoneOverdue = 0;
    
    var msDonutCtx = document.getElementById('msDonut');
    if (msDonutCtx) {
        // Update center text total
        var msCard = msDonutCtx.closest('.chart-card');
        if (msCard) {
            var msCenter = msCard.querySelector('.sc-donut-center-text .fs-4');
            if (msCenter) msCenter.textContent = milestoneTotal;
            
            // Update legend numbers
            var msLegend = msCard.querySelectorAll('.d-flex.gap-3 .text-muted strong');
            if (msLegend.length >= 3) {
                msLegend[0].textContent = milestoneMet;
                msLegend[1].textContent = milestoneUpcoming;
                msLegend[2].textContent = milestoneOverdue;
            }
        }
        
        // Destroy existing chart if any
        if (window.msDonutChart) window.msDonutChart.destroy();
        
        // Create new chart
        window.msDonutChart = new Chart(msDonutCtx, {
            type: 'doughnut',
            data: { 
                labels: ['Met', 'Upcoming', 'Overdue'], 
                datasets: [{ 
                    data: [milestoneMet, milestoneUpcoming, milestoneOverdue], 
                    backgroundColor: ['#27ae60', '#e67e22', '#e74c3c'], 
                    borderWidth: 1, 
                    borderColor: '#fff' 
                }] 
            },
            options: { 
                cutout: '65%', 
                plugins: { legend: { display: false } }, 
                responsive: true, 
                maintainAspectRatio: true 
            }
        });
    }

    // === 3. Task Completion Bar Chart (taskBar) ===
    var taskBarCtx = document.getElementById('taskBar');
    if (taskBarCtx) {
        var initiativeLabels = [];
        var taskDoneData = [];
        var taskOpenData = [];
        
        // Try to get per-initiative data from initiveDTO
        if (response.initiveDTO && response.initiveDTO.length > 0) {
            for (var i = 0; i < response.initiveDTO.length; i++) {
                var init = response.initiveDTO[i];
                var initId = init.initiativeValue?.initiativeId || (init.initiativeId);
                var initTasks = init.taskCount || 0;
                var initDone = init.taskCompleteCount || 0;
                var initOpen = initTasks - initDone;
                
                initiativeLabels.push(initId);
                taskDoneData.push(initDone);
                taskOpenData.push(initOpen);
            }
        } else {
            // Fallback to summary data
            var taskTotal = response.totalTask || 0;
            var taskInProgress = response.taskStatusCount?.['in progress'] || 0;
            var taskDone = taskTotal - taskInProgress;
            
            initiativeLabels = ['All Initiatives'];
            taskDoneData = [taskDone];
            taskOpenData = [taskInProgress];
        }
        
        // Destroy existing chart if any
        if (window.taskBarChart) window.taskBarChart.destroy();
        
        // Create new chart
        window.taskBarChart = new Chart(taskBarCtx, {
            type: 'bar',
            data: {
                labels: initiativeLabels,
                datasets: [
                    { label: 'Done', data: taskDoneData, backgroundColor: '#27ae60' },
                    { label: 'Open', data: taskOpenData, backgroundColor: '#e0e0e0' }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: { 
                    x: { stacked: true, grid: { display: false } }, 
                    y: { stacked: true, grid: { color: '#f0f0f0' } } 
                },
                plugins: { legend: { display: false } }
            }
        });
    }
}

$(document).ready(function() {
    // Auto-load from URL parameter or fallback
    // const deptId = new URLSearchParams(window.location.search).get('deptId') || 'default';
    loadRiskDashboardData(deptId);
});       
   document.addEventListener('DOMContentLoaded', function () {
          
            renderGantt();
            initCharts();
            // try { lucide.createIcons(); } catch (e) { console.error(e); }

            // $('#msTable').DataTable({
            //     lengthChange: false,
            //     ordering: true,
            //     info: true,
            //     autoWidth: false,
            //     responsive: true,
            //     scrollX: true,
            //     info: false,
            //     dom: 't'

            // });
            // $('.dataTables_filter input').addClass('form-control form-control-sm');
        });
  
       



  </script>




  
</body>