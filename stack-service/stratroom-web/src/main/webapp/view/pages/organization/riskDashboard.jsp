<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta content="width=device-width, initial-scale=1" name="viewport" />
<title>StratRoom</title>


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

/* HEAT MAP */
.hm-card {
  background: var(--stratroom-body-bg);
  border: 1px solid var(--stratroom-border-color);
  border-radius: 10px;
  padding: 18px 20px;
}

.hm-title {
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: .5px;
  margin-bottom: 14px;
}

.hm-wrap {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}

.hm-y-label {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 10px;
  color: #888;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
}

.hm-grid-wrap {
  flex: 1;
}

.hm-row {
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
  align-items: center;
}

.hm-row-label {
  font-size: 10px;
  color: #888;
  width: 70px;
  text-align: right;
  padding-right: 8px;
  flex-shrink: 0;
}

.hm-cell {
  flex: 1;
  height: 48px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 800;
  color: #fff;
  cursor: pointer;
  transition: opacity .15s;
  position: relative;

  &:hover {
    opacity: .85;
  }
}

.hm-low {
  background: #27ae60;
}

.hm-low-med {
  background: #82c341;
}

.hm-med {
  background: #f1c40f;
  color: #333;
}

.hm-high {
  background: #e67e22;
}

.hm-critical {
  background: #e74c3c;
}

.hm-x-labels {
  display: flex;
  padding-left: 78px;
  gap: 4px;
  margin-top: 4px;

  span {
    flex: 1;
    text-align: center;
    font-size: 9px;
    color: #888;
  }
}

.hm-x-axis-label {
  text-align: center;
  font-size: 10px;
  color: #888;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding-left: 78px;
  margin-top: 4px;
}

.hm-legend {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 15px;

  .hm-legend-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    color: #555;

    .hm-legend-sq {
      width: 10px;
      height: 10px;
      border-radius: 2px;
    }
  }
}

/* RISK STATUS BREAKDOWN BARS */
.hm-status-card {
  background: var(--stratroom-body-bg);
  border: 1px solid var(--stratroom-border-color);
  border-radius: 10px;
  padding: 18px 20px;
}

.hm-chart-title {
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: .5px;
  margin-bottom: 15px;
}

.hm-bar-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
}

.hm-bar-label {
  font-size: 12px;
  min-width: 90px;
  font-weight: 600;
}

.hm-bar-track {
  flex: 1;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  margin: 0 10px;
}

.hm-bar-fill {
  height: 8px;
  border-radius: 4px;
}

.hm-bar-count {
  font-size: 11px;
  color: #888;
  min-width: 46px;
  text-align: right;
  font-weight: 600;
}
/* RISK TREATMENT BARS */
.hm-status-tcard {
  background: var(--stratroom-body-bg);
  border: 1px solid var(--stratroom-border-color);
  border-radius: 10px;
  padding: 18px 20px;
}

.hm-chart-ttitle {
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: .5px;
  margin-bottom: 15px;
}

.hm-bar-trow {
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
}.hm-bar-ttrack {
    position: relative;
    width: 100%;
    height: 10px;
    background-color: #ecf0f1;
    border-radius: 5px;
    overflow: hidden;
    display: block;
}

.hm-bar-tfill {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0%;
    background-color: #27ae60;
    border-radius: 5px;
    transition: width 0.6s ease-in-out;
    display: block;
    visibility: visible;
    opacity: 1;
}

.hm-bar-tfill.bar-filled {
    /* Ensure filled bars are visible */
    background-clip: padding-box;
}

.hm-bar-trow {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
}

.hm-bar-tlabel {
    min-width: 80px;
    font-weight: 500;
}

.hm-bar-tcount {
    min-width: 50px;
    text-align: right;
    font-size: 13px;
    color: #666;
}

/* .hm-bar-ttrack {
  flex: 1;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  margin: 0 10px;
}

.hm-bar-tfill {
  height: 8px;
  border-radius: 4px;
}

.hm-bar-tcount {
  font-size: 11px;
  color: #888;
  min-width: 46px;
  text-align: right;
  font-weight: 600;
} */

/* RISK REGISTER */
.reg-filter-btn {
  font-size: 11px;
  border: 1px solid var(--stratroom-border-color);
  border-radius: 4px;
  padding: 4px 12px;
  cursor: pointer;
  background: var(--stratroom-body-bg);
  color: #555;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background: #f1f5f9;
  }

  &.active {
    background: var(--stratroom-primary, #2d2d6b);
    color: #fff;
    border-color: var(--stratroom-primary, #2d2d6b);
  }
}
/* Legend Item Styling */
.legend-item {
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 4px 8px;
    background: #f8f9fa;
    border-radius: 6px;
    margin-bottom: 4px;
    transition: transform 0.2s ease;
}

.legend-item:hover {
    transform: translateY(-1px);
    background: #e9ecef;
}

.legend-color {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 6px;
    flex-shrink: 0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.15);
}

.legend-label {
    color: #495057;
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 500;
}

.legend-value {
    font-weight: 700;
    margin-left: 6px;
    min-width: 20px;
    text-align: right;
}

/* Responsive tweak for mobile */
@media (max-width: 576px) {
    .legend-item { font-size: 11px; padding: 3px 6px; }
    .legend-label { max-width: 100px; }
}
.sc-pill { padding: 2px 6px; border-radius: 3px; font-weight: bold; font-size: 10px; }
.pill-red { background-color: #fadbd8; color: #e74c3c; }
.pill-orange { background-color: #fdebd0; color: #e67e22; }
.pill-blue { background-color: #d6eaf8; color: #2980b9; }
.pill-green { background-color: #d5f5e3; color: #27ae60; }
.pill-gray { background-color: #f0f0f0; color: #7f8c8d; }
.action-two-col { display:flex; justify-content:space-between; width:100%; }
.action-col { font-size:11px; color:#555; flex:1; }
.action-col.left { text-align:left; padding-right:4px; }
.action-col.right { text-align:right; padding-left:4px; border-left:1px dashed #ccc; }
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
        <div class="container-lg">
            <div class="page-header grid gap-2 pb-1">
                <div class="g-col-12 g-col-md-4 d-flex align-items-center">
                    <h4 class="title mb-0 fs-5 fw-bold d-flex align-items-center gap-2 text-uppercase"
                        style="letter-spacing: 0.05em; color: var(--bs-body-color);">
                        <span class="icon d-flex align-items-center" style="color: var(--bs-body-color);">
                            <i data-lucide="shield-alert" style="width: 20px; height: 20px; stroke-width: 2px;"></i>
                        </span>
                        <span>RISK MANAGEMENT DASHBOARD</span>
                    </h4>
                </div>

                <!-- overall score -->
                <div class="g-col-12 g-col-md-8 d-flex justify-content-md-end justify-content-start align-items-center mt-2 mt-md-0">
                  <select name="deptrepotees" id="deptrepotees" style="border: 1px solid #dddd;border-radius: 5px;margin-right: 20px;height: 28px;width: 130px;"></select>
                    <div class="overall-score-v2 d-flex">
                        <div>
                            <div class="score-label">RISK EXPOSURE</div>
                            <div class="score-detail"> total risks identified</div>
                        </div>
                        <div class="score-percent" style="color: #e74c3c; font-size: 24px;">HIGH</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container-lg py-3">

            <!-- Summary KPI Cards -->
            <div class="row g-3 mb-4">
                <div class="col-lg-2 col-md-6" style="width: 20.966667%;">
                    <div class="compliance-kpi-card" style="border-left: 4px solid #e74c3c;">
                        <div class="kpi-label text-uppercase">Critical Risk</div>
                        <div class="Critical-value" style="color:#e74c3c;">0</div>
                        <div class="kpi-sub">require immediate action</div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6" style="width: 20.966667%;">
                    <div class="compliance-kpi-card" style="border-left: 4px solid #e67e22;">
                        <div class="kpi-label text-uppercase">High Risk</div>
                        <div class="High-value" style="color:#e67e22;">0</div>
                        <div class="kpi-sub">active monitoring needed</div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6" style="width: 20.966667%;">
                    <div class="compliance-kpi-card" style="border-left: 4px solid #f1c40f;">
                        <div class="kpi-label text-uppercase">Medium Risk</div>
                        <div class="Medium-value" style="color:#f39c12;">0</div>
                        <div class="kpi-sub">scheduled review</div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6" style="width: 20.966667%;">
                    <div class="compliance-kpi-card" style="border-left: 4px solid #27ae60;">
                        <div class="kpi-label text-uppercase">Low Risk</div>
                        <div class="Low-value" style="color:#27ae60;">0</div>
                        <div class="kpi-sub">routine monitoring</div>
                    </div>
                </div>
                 <div class="col-lg-2 col-md-6" style="width: 20.966667%;">
                    <div class="compliance-kpi-card" style="border-left: 4px solid #71f689;">
                        <div class="kpi-label text-uppercase">Very Low Risk</div>
                        <div class="VeryLow-value" style="color:#71f689;">0</div>
                        <div class="kpi-sub">routine monitoring</div>
                    </div>
                </div>
            </div>

            <!-- Heat Map & Status Mix -->
            <div class="row g-3 mb-4">
                <div class="col-lg-8">
                    <!-- Heatmap Card -->
                   
              <div class="hm-card h-100">
    <div class="hm-title">RISK HEAT MAP - LIKELIHOOD x IMPACT</div>
    <div class="hm-wrap">
        <div class="hm-y-label">Likelihood</div>
        <div class="hm-grid-wrap">
            <!-- Row 5: Almost Certain -->
            <div class="hm-row">
                <div class="hm-row-label">Almost Certain</div>
                <div class="hm-cell hm-high" data-cell="A5">0</div>
                <div class="hm-cell hm-high" data-cell="B5">0</div>
                <div class="hm-cell hm-critical" data-cell="C5">0</div>
                <div class="hm-cell hm-critical" data-cell="D5">0</div>
                <div class="hm-cell hm-critical" data-cell="E5">0</div>
            </div>
            <!-- Row 4: Likely -->
            <div class="hm-row">
                <div class="hm-row-label">Likely</div>
                <div class="hm-cell hm-med" data-cell="A4">0</div>
                <div class="hm-cell hm-high" data-cell="B4">0</div>
                <div class="hm-cell hm-high" data-cell="C4">0</div>
                <div class="hm-cell hm-critical" data-cell="D4">0</div>
                <div class="hm-cell hm-critical" data-cell="E4">0</div>
            </div>
            <!-- Row 3: Possible -->
            <div class="hm-row">
                <div class="hm-row-label">Possible</div>
                <div class="hm-cell hm-low-med" data-cell="A3">0</div>
                <div class="hm-cell hm-med" data-cell="B3">0</div>
                <div class="hm-cell hm-high" data-cell="C3">0</div>
                <div class="hm-cell hm-high" data-cell="D3">0</div>
                <div class="hm-cell hm-critical" data-cell="E3">0</div>
            </div>
            <!-- Row 2: Unlikely -->
            <div class="hm-row">
                <div class="hm-row-label">Unlikely</div>
                <div class="hm-cell hm-low" data-cell="A2">0</div>
                <div class="hm-cell hm-low-med" data-cell="B2">0</div>
                <div class="hm-cell hm-med" data-cell="C2">0</div>
                <div class="hm-cell hm-high" data-cell="D2">0</div>
                <div class="hm-cell hm-high" data-cell="E2">0</div>
            </div>
            <!-- Row 1: Rare -->
            <div class="hm-row">
                <div class="hm-row-label">Rare</div>
                <div class="hm-cell hm-low" data-cell="A1">0</div>
                <div class="hm-cell hm-low" data-cell="B1">0</div>
                <div class="hm-cell hm-low-med" data-cell="C1">0</div>
                <div class="hm-cell hm-med" data-cell="D1">0</div>
                <div class="hm-cell hm-high" data-cell="E1">0</div>
            </div>
            
            <div class="hm-x-labels">
                <span>Insignificant</span><span>Minor</span><span>Moderate</span><span>Major</span><span>Catastrophic</span>
            </div>
            <div class="hm-x-axis-label">Impact <i class="fas fa-arrow-right"></i></div>
            <div class="hm-legend">
                <div class="hm-legend-item"><div class="hm-legend-sq" style="background:#27ae60;"></div>Low</div>
                <div class="hm-legend-item"><div class="hm-legend-sq" style="background:#82c341;"></div>Low-Med</div>
                <div class="hm-legend-item"><div class="hm-legend-sq" style="background:#f1c40f;"></div>Medium</div>
                <div class="hm-legend-item"><div class="hm-legend-sq" style="background:#e67e22;"></div>High</div>
                <div class="hm-legend-item"><div class="hm-legend-sq" style="background:#e74c3c;"></div>Critical</div>
            </div>
        </div>
    </div>
</div>
                      </div>

                <div class="col-lg-4 d-flex flex-column gap-3">
                    <!-- <div class="hm-status-card flex-grow-1">
                        <div class="hm-chart-title">RISK STATUS BREAKDOWN</div>
                        <div class="hm-bar-row"><span class="hm-bar-label" style="color:#27ae60;">Mitigated</span><div class="hm-bar-track"><div class="hm-bar-fill" style="background:#27ae60;width:52%;"></div></div><span class="hm-bar-count">0/0</span></div>
                        <div class="hm-bar-row"><span class="hm-bar-label" style="color:#2980b9;">In Treatment</span><div class="hm-bar-track"><div class="hm-bar-fill" style="background:#2980b9;width:32%;"></div></div><span class="hm-bar-count">0/0</span></div>
                        <div class="hm-bar-row"><span class="hm-bar-label" style="color:#e67e22;">Monitoring</span><div class="hm-bar-track"><div class="hm-bar-fill" style="background:#e67e22;width:13%;"></div></div><span class="hm-bar-count">0/0</span></div>
                        <div class="hm-bar-row"><span class="hm-bar-label" style="color:#e74c3c;">Escalated</span><div class="hm-bar-track"><div class="hm-bar-fill" style="background:#e74c3c;width:3%;"></div></div><span class="hm-bar-count">6/173</span></div> -->
                    <!-- </div> --> 
                    <div class="hm-status-tcard h-100">
                        <div class="hm-chart-ttitle">TREATMENT STRATEGY MIX</div>
                        <div class="hm-bar-trow"><span class="hm-bar-tlabel text-dark">Mitigate</span><div class="hm-bar-ttrack"><div class="hm-bar-tfill" ></div></div><span class="hm-bar-tcount"></span></div>
                        <div class="hm-bar-trow"><span class="hm-bar-tlabel text-dark">Transfer</span><div class="hm-bar-ttrack"><div class="hm-bar-tfill" ></div></div><span class="hm-bar-tcount"></span></div>
                        <div class="hm-bar-trow"><span class="hm-bar-tlabel text-dark">Accept</span><div class="hm-bar-ttrack"><div class="hm-bar-tfill" ></div></div><span class="hm-bar-tcount"></span></div>
                        <div class="hm-bar-trow"><span class="hm-bar-tlabel text-dark">Avoid</span><div class="hm-bar-ttrack"><div class="hm-bar-tfill" ></div></div><span class="hm-bar-tcount"></span></div>
                        <div class="hm-bar-trow"><span class="hm-bar-tlabel text-dark">Reduce</span><div class="hm-bar-ttrack"><div class="hm-bar-tfill" ></div></div><span class="hm-bar-tcount"></span></div>
                        <div class="hm-bar-trow"><span class="hm-bar-tlabel text-dark">Share</span><div class="hm-bar-ttrack"><div class="hm-bar-tfill" ></div></div><span class="hm-bar-tcount"></span></div>
                    </div>
                </div>
            </div>

            <!-- Charts Row -->
            <div class="row g-3 mb-4">
             <div class="col-lg-4">
                    <div class="chart-card h-100">
                        <div class="chart-title">RISK BY CATEGORY</div>
                        <div class="chart-container d-flex align-items-center justify-content-center position-relative">
                            <canvas id="catDonut" style="max-width:160px;max-height:160px;"></canvas>
                            <div class="sc-donut-center-text" style="position:absolute; text-align:center;">
                                <div class="fs-4 fw-bold text-dark"></div>
                                <div class="text-muted" style="font-size:11px;">Total</div>
                            </div>
                        </div>
                        <div class="d-flex flex-wrap justify-content-center gap-3 mt-3">
                            <div class="text-muted" style="font-size:11px;"><span class="d-inline-block rounded-circle me-1" style="width:8px;height:8px;background:#e74c3c;"></span>Operational <strong style="color:#e74c3c;">42</strong></div>
                            <div class="text-muted" style="font-size:11px;"><span class="d-inline-block rounded-circle me-1" style="width:8px;height:8px;background:#e67e22;"></span>Financial <strong style="color:#e67e22;">38</strong></div>
                            <div class="text-muted" style="font-size:11px;"><span class="d-inline-block rounded-circle me-1" style="width:8px;height:8px;background:#2980b9;"></span>Strategic <strong style="color:#2980b9;">35</strong></div>
                            <div class="text-muted" style="font-size:11px;"><span class="d-inline-block rounded-circle me-1" style="width:8px;height:8px;background:#27ae60;"></span>Compliance <strong style="color:#27ae60;">31</strong></div>
                            <div class="text-muted" style="font-size:11px;"><span class="d-inline-block rounded-circle me-1" style="width:8px;height:8px;background:#9b59b6;"></span>Technology <strong style="color:#9b59b6;">27</strong></div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="chart-card h-100">
                        <div class="chart-title text-uppercase">Risk Level Distribution</div>
                        <div style="height: 180px;"><canvas id="levelBar"></canvas></div>
                    </div>
                </div>
                <div class="col-lg-4">
                   <div class="hm-status-card h-100">
                        <div class="hm-chart-title">RISK STATUS BREAKDOWN</div>
                        <div class="hm-bar-row"><span class="hm-bar-label" style="color:#27ae60;">Mitigated</span><div class="hm-bar-track"><div class="hm-bar-fill" style="background:#27ae60;width:52%;"></div></div><span class="hm-bar-count">0/0</span></div>
                        <div class="hm-bar-row"><span class="hm-bar-label" style="color:#2980b9;">In Treatment</span><div class="hm-bar-track"><div class="hm-bar-fill" style="background:#2980b9;width:32%;"></div></div><span class="hm-bar-count">0/0</span></div>
                        <div class="hm-bar-row"><span class="hm-bar-label" style="color:#e67e22;">Monitoring</span><div class="hm-bar-track"><div class="hm-bar-fill" style="background:#e67e22;width:13%;"></div></div><span class="hm-bar-count">0/0</span></div>
                    <!-- <div class="hm-bar-row"><span class="hm-bar-label" style="color:#e74c3c;">Escalated</span><div class="hm-bar-track"><div class="hm-bar-fill" style="background:#e74c3c;width:3%;"></div></div><span class="hm-bar-count">6/173</span></div> -->
                    </div>
                </div> 
            </div>

            <!-- Risk Register Array Rendering Container -->
      <div class="ms-card mb-4" style="background:var(--stratroom-body-bg); border:1px solid var(--stratroom-border-color); border-radius:10px; padding:18px 20px;">
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
        <div class="text-uppercase fw-bold text-muted" style="font-size:11px; letter-spacing:0.5px;">RISK REGISTER</div>
        <div class="d-flex flex-wrap gap-2">
           <select id="riskcategory-select" name="riskcategory" class="form-select">
                      <option value="All">All</option>
                      <option value="Operational Risk">Operational Risk</option>
                      <option value="Financial Risk">Financial Risk</option>
                      <option value="Compliance & Legal Risk">Compliance & Legal Risk</option>
                      <option value="Technology Risk">Technology Risk</option>
                       <option value="Reputational Risk">Reputational Risk</option>
                       <option value="Human Capital Risk">Human Capital Risk</option>
                       <option value="Environmental, Social & Governance (ESG) Risk">Environmental, Social & Governance (ESG) Risk</option>
                       <option value="Political Risk">Political Risk</option>
                       <option value="Regulatory Risk">Regulatory Risk</option>
                       <option value="Market Risk">Market Risk</option>
                       <option value="Cybersecurity Risk">Cybersecurity Risk</option>
                       <option value="Supply Chain Risk">Supply Chain Risk</option>
                       <option value="Project & Program Risk">Project & Program Risk</option>
                       <option value="Third-Party/Vendor Risk">Third-Party/Vendor Risk</option>
                       <option value="Innovation & R&D Risk">Innovation & R&D Risk</option>
                       <option value="Health & Safety Risk">Health & Safety Risk</option>
                       <option value="Business Continuity & Resilience Risk">Business Continuity & Resilience Risk</option>
                       <option value="Ethical/Conduct Risk">Ethical/Conduct Risk</option>
                       <option value="Investment Risk">Investment Risk</option>
                    </select>
        </div>
    </div>
    <div class="table-responsive"> 
        <table class="table sc-table align-middle" id="riskTable" style="width:100%">
            <thead>
                <tr class="text-muted" style="font-size:11px; text-transform:uppercase; letter-spacing:0.5px;">
                    <th class="sorting_1">Risk ID</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Score</th>
                    <th>Level</th>
                    <th>Status</th>
                    <th>Treatment</th>
                    <th class="text-center">Trend</th>
                    <th>Owner</th>
                    <th>Review Date</th>
                </tr>
            </thead>
            <tbody>
                <!-- Rows generated by JS -->
            </tbody>
        </table> 
    </div>
</div>

            <!-- Treatment Plans Grid -->
            <div class="mb-4">
                <div class="text-uppercase fw-bold text-muted mb-3" style="font-size:11px; letter-spacing:0.5px;">
                    TOP RISK TREATMENT PLANS
                </div>
                <div class="row g-3" id="treatmentPlans">
                 
              </div>
            </div>

        </div>
    </main>

    <footer class="col-12 text-center py-2 copyright">
        <p data-translate="footer.copyright" class="mb-0">Copyright &copy; <span id="year"></span>
            <strong>StratRoom</strong>
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
	<script src="${contextroot}/js/kpidata_form.js"></script>
	<script src="${contextroot}/js/initial.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
	 <script>

var allRisks = [];        // Stores the full dataset from API
var filteredRisks = [];   // Stores the currently visible dataset
var rsTable = null;    

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
       $('#riskcategory-select').on('change', function() {
        var selectedCategory = $(this).val();
        applyRiskFilter(selectedCategory);
    });
       rsTable = $('#riskTable').DataTable({
        "pageLength": 10,
        "ordering": true,
        "searching": false,
        "info": false,
        "autoWidth": false,
        "columnDefs": [
            { "orderable": true, "targets": 0 }
        ]
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

// ============================================
// HEATMAP: Update heatmap cells with likelihoodCount
// ============================================
function updateHeatmap(likelihoodCount) {
    console.log('🔥 Updating Heatmap with ', likelihoodCount);
    
    if (!likelihoodCount) {
        console.warn('⚠️ No likelihoodCount data provided');
        return;
    }
    
    // Reset all cells first
    document.querySelectorAll('.hm-cell').forEach(function(cell) {
        cell.textContent = '';
        cell.style.opacity = '1';
        cell.style.fontWeight = 'normal';
    });
    
    // Update cells with actual data
    var updatedCount = 0;
    Object.keys(likelihoodCount).forEach(function(cellId) {
        if (cellId === 'UNKNOWN') {
            console.log('⊘ Skipping UNKNOWN');
            return;
        }
        
        var count = likelihoodCount[cellId];
        var cell = document.querySelector('.hm-cell[data-cell="' + cellId + '"]');
        
        if (cell) {
            cell.textContent = count;
            cell.style.opacity = '1';
            cell.style.fontWeight = 'bold';
            // Add pulse effect for high values
            if (count >= 3) {
                cell.style.boxShadow = '0 0 10px rgba(231, 76, 60, 0.7)';
            }
            updatedCount++;
            console.log('✓ Cell ' + cellId + ' = ' + count);
        } else {
            console.warn('✗ Cell not found: ' + cellId);
        }
    });
    
    console.log('✅ Heatmap updated: ' + updatedCount + ' cells');
}

function applyRiskFilter(category) {
    if (!category || category === "All") {
        // Show all risks
        filteredRisks = [...allRisks];
    } else {
        // Filter by exact category match
        filteredRisks = allRisks.filter(function(risk) {
            // Safely access nested property
            var riskCat = (risk.riskValue && risk.riskValue.riskcategory) ? risk.riskValue.riskcategory : "";
            return riskCat === category;
        });
    }

    // Update UI Badge (Optional)
    updateFilterBadge(category, filteredRisks.length);

    // Re-render Table
    populateRiskTable(filteredRisks);
}

/**
 * Optional: Updates a badge to show how many items are visible
 */
function updateFilterBadge(category, count) {
    // You can add a <span id="filter-count-badge"></span> in your HTML header if desired
    var badgeEl = document.getElementById('filter-count-badge');
    if (badgeEl) {
        var label = category === "All" ? "All Risks" : category;
        badgeEl.textContent = `${count} found in ${label}`;
        badgeEl.style.display = 'inline-block';
    }
}

// ==========================================
// 4. DATA LOADING (AJAX)
// ==========================================

function loadRiskDashboardData(deptId) {
    $.ajax({
        type: "GET",
        url: "riskDashBoardData", // Ensure this URL is correct for your backend
        data: { deptId: deptId },
        dataType: "json",
        success: function (response) {
            try {
                console.log("✅ Data loaded successfully", response);

                // 1. Total Risk KPI
                var totalRisks = response.totalRisk || 0;
                var scoreDetailEl = document.querySelector('.score-detail');
                if (scoreDetailEl) {
                    scoreDetailEl.textContent = totalRisks + " total risks identified";
                }

                // 2. Status KPIs
                var status = response.statusCount || {};
                setValueIfExists('.Critical-value', status["Very High"]);
                setValueIfExists('.High-value', status["High"]);
                setValueIfExists('.Medium-value', status["Tolerable"]); // Assuming 'Tolerable' maps to Medium
                setValueIfExists('.Low-value', status["Low"]);
                setValueIfExists('.VeryLow-value', status["Very Low"]);

                // 3. Category Chart Center Text
                var centerTotalEl = document.querySelector('.sc-donut-center-text .fs-4.fw-bold.text-dark');
                if (centerTotalEl) {
                    centerTotalEl.textContent = totalRisks;
                }
                if (response.categoryCount) {
                    // Ensure this function exists in your charting logic
                    if(typeof updateCategoryDashboard === 'function') {
                        updateCategoryDashboard(response.categoryCount);
                    }
                }

                // 4. Initialize/Update Charts
                if(typeof initCharts === 'function') {
                    initCharts(response.statusCount || {});
                }
                if(typeof updateTreatmentStrategyChart === 'function') {
                    updateTreatmentStrategyChart(response.treatmentSrategyCount || {}, response.totalTreatment);
                }

                // 5. ⭐ STORE RISKS GLOBALLY FOR FILTERING ⭐
                if (response.riskDTO && Array.isArray(response.riskDTO)) {
                    allRisks = response.riskDTO;       // Save original data
                    filteredRisks = [...allRisks];     // Create initial copy
                    
                    // Reset dropdown to "All" in case it was changed previously
                    $('#riskcategory-select').val('All');
                    
                    // Render initial table
                    populateRiskTable(filteredRisks);
                } else {
                    allRisks = [];
                    filteredRisks = [];
                    populateRiskTable([]);
                }

                // 6. Populate Treatment Plans Cards
                if(typeof populateTreatmentPlans === 'function') {
                    populateTreatmentPlans(response.riskDTO || []);
                }
                
                // 7. Update Risk Status Breakdown Bars
                if(typeof updateRiskStatusBreakdown === 'function') {
                    updateRiskStatusBreakdown(
                        response.totalRisk || 0,
                        response.totalTreatment || 0,
                        response.totalMonitoring || 0,
                        response.totalPlan || 0
                    );
                }

                // 8. Update Heatmap
                if (response.likelihoodCount) {
                    console.log('📊 Received likelihoodCount:', response.likelihoodCount);
                    if(typeof updateHeatmap === 'function') {
                        updateHeatmap(response.likelihoodCount);
                    }
                }

            } catch (e) {
                console.error('❌ Logic Error in Success Callback:', e);
                showErrorUI('Error processing data');
            }
        },
        error: function (xhr, status, error) {
            console.error('❌ Network/Error Status:', status, error);
            showErrorUI('Failed to load data');
        }
    });
}

// Helper to safely set text content
function setValueIfExists(selector, value) {
    var el = document.querySelector(selector);
    if (el) el.textContent = value || 0;
}

function showErrorUI(msg) {
    var scoreDetailEl = document.querySelector('.score-detail');
    if (scoreDetailEl) scoreDetailEl.textContent = msg;
}

// ==========================================
// 5. TABLE POPULATION (Your Existing Logic + Minor Fixes)
// ==========================================

function populateRiskTable(risks) {
    var tbody = $('#riskTable tbody');
    tbody.empty();

    // Handle Empty State
    if (!risks || risks.length === 0) {
        tbody.append('<tr><td colspan="10" class="text-center text-muted py-4">No risks found for this selection</td></tr>');
        
        // If using DataTables, destroy/clear it properly if needed, or just draw empty
        if (typeof rsTable !== 'undefined' && rsTable !== null) {
            rsTable.clear().draw();
        }
        return;
    }

    risks.forEach(function(risk) {
        var rv = risk.riskValue || {};
        
        // --- Basic Data Extraction ---
        var description = rv.name || rv.desc || "";
        var category = rv.riskcategory || "";
        var score = rv.score || "";
        var status = rv.riskStatus || "";
        var owner = rv.ownerName || "";
        
        // --- Date Handling ---
        var reviewDate = rv.nextAssessment;
        if (!reviewDate && risk.updatedTime) {
            reviewDate = risk.updatedTime.split('T')[0];
        }
        if (!reviewDate) reviewDate = "";

        // --- Level/Status Styling Classes ---
        var levelClass = "";
        var statusUpper = status.toUpperCase();

        if (statusUpper === "VERY HIGH" || statusUpper === "CRITICAL") {
            levelClass = "pill-red";
        } else if (statusUpper === "HIGH") {
            levelClass = "pill-orange";
        } else if (statusUpper === "LOW" || statusUpper === "VERY LOW") {
            levelClass = "pill-green";
        } else {
            levelClass = "pill-gray"; // Default for Medium/Tolerable
        }

        // --- Treatment Logic ---
        var treatment = "Review";
        if (risk.riskPlanList && risk.riskPlanList.length > 0) {
            var fp = risk.riskPlanList[0];
            if (fp.riskPlanValue && fp.riskPlanValue.action) {
                treatment = fp.riskPlanValue.action;
            }
        } else if (risk.riskTreatmentList && risk.riskTreatmentList.length > 0) {
            var ft = risk.riskTreatmentList[0];
            if (ft.riskPlanValue && ft.riskPlanValue.action) {
                treatment = ft.riskPlanValue.action;
            }
        }
        // Capitalize first letter
        treatment = treatment.charAt(0).toUpperCase() + treatment.slice(1).toLowerCase();

        // --- Trend Icon Logic ---
        // Note: Your original logic had High=Green(ArrowUp) and Low=Red(ArrowDown). 
        // Usually Green=Good(Low Risk) and Red=Bad(High Risk). 
        // I have adjusted colors to be semantically standard (Red for High Risk, Green for Low Risk).
        // If you prefer the original colors, swap the hex codes back.
        
        var trendIcon = "";
        if (statusUpper === "HIGH" || statusUpper === "VERY HIGH" || statusUpper === "CRITICAL") {
            // High Risk -> Red Arrow Up (Bad trend/High severity)
            trendIcon = `<span style='color:#e74c3c;' title='High Severity'><i class="fas fa-arrow-up"></i></span>`;
        } else if (statusUpper === "LOW" || statusUpper === "VERY LOW") {
            // Low Risk -> Green Arrow Down (Good/Low severity)
            trendIcon = `<span style='color:#27ae60;' title='Low Severity'><i class="fas fa-arrow-down"></i></span>`;
        } else {
            // Medium/Stable -> Grey Dash or Circle
            trendIcon = `<span style='color:#95a5a6;' title='Stable/Medium'><i class="fas fa-minus"></i></span>`;
        }

        // --- Build Row HTML ---
        var rowHtml = '<tr>' +
            '<td class="sorting_1"><strong>' + (risk.riskUniqueId || "N/A") + '</strong></td>' +
            '<td>' + escapeHtml(description) + '</td>' + // Prevent XSS
            '<td><span class="sc-pill" style="background:#f0f0f0;color:#555;font-size:10px;padding:2px 6px;border-radius:4px;">' + escapeHtml(category) + '</span></td>' +
            '<td>' +
                '<span class="d-inline-flex align-items-center justify-content-center rounded" ' +
                'style="width:28px;height:22px;background:#eee;color:#333;font-weight:800;font-size:11px;">' +
                score +
                '</span>' +
            '</td>' +
            '<td><span class="sc-pill ' + levelClass + '">' + status + '</span></td>' +
            '<td><span class="sc-pill ' + levelClass + '">' + status + '</span></td>' + // Duplicate column in your original code?
            '<td><span class="sc-pill" style="background:#e8f3fb;color:#2980b9;font-size:10px;padding:2px 6px;border-radius:4px;">' + escapeHtml(treatment) + '</span></td>' +
            '<td class="text-center">' + trendIcon + '</td>' +
            '<td>' + escapeHtml(owner) + '</td>' +
            '<td>' + reviewDate + '</td>' +
        '</tr>';

        tbody.append(rowHtml);
    });

    // Safe DataTables redraw
    if (typeof rsTable !== 'undefined' && rsTable !== null) {
        rsTable.draw();
    }
}

// Helper to prevent HTML injection in descriptions
function escapeHtml(text) {
    if (!text) return "";
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}



// ============================================
// MAIN: Load dashboard data from API
// ============================================
function loadRiskDashboardData(deptId) {
    $.ajax({
        type: "GET",
        url: "riskDashBoardData",
        data: { deptId: deptId },
        dataType: "json",
        success: function (response) {
            try {
                // 1. Total Risk
                var totalRisks = response.totalRisk || 0;
                var scoreDetailEl = document.querySelector('.score-detail');
                if (scoreDetailEl) {
                    scoreDetailEl.textContent = totalRisks + " total risks identified";
                }

                // 2. Status KPIs
                var status = response.statusCount || {};
                var criticalEl = document.querySelector('.Critical-value');
                if (criticalEl) criticalEl.textContent = status["Very High"] || 0;
                
                var highEl = document.querySelector('.High-value');
                if (highEl) highEl.textContent = status["High"] || 0;
                
                var mediumEl = document.querySelector('.Medium-value');
                if (mediumEl) mediumEl.textContent = status["Tolerable"] || 0;
                
                var lowEl = document.querySelector('.Low-value');
                if (lowEl) lowEl.textContent = status["Low"] || 0;
                
                var veryLowEl = document.querySelector('.VeryLow-value');
                if (veryLowEl) veryLowEl.textContent = status["Very Low"] || 0;

                // 3. Category Chart - Update donut center
                var centerTotalEl = document.querySelector('.sc-donut-center-text .fs-4.fw-bold.text-dark');
                if (centerTotalEl) {
                    centerTotalEl.textContent = response.totalRisk || 0;
                }
                if (response.categoryCount) {
                    updateCategoryDashboard(response.categoryCount);
                }

                // 4. Initialize Charts
                initCharts(response.statusCount || {});
                updateTreatmentStrategyChart(response.treatmentSrategyCount || {}, response.totalTreatment);

             // 5. Populate Risk Register Table
if (response.riskDTO) {
    allRisks = response.riskDTO;              // ✅ Store full dataset
    filteredRisks = [...allRisks];            // ✅ Reset filtered copy
    if (typeof populateRiskTable === 'function') {
        populateRiskTable(filteredRisks);     // ✅ Render initial table
    }
}

                // 6. Populate Treatment Plans Cards
                populateTreatmentPlans(response.riskDTO || []);
                
                // 7. Update Risk Status Breakdown Bars
               // 7. Update Risk Status Breakdown Bars
if(typeof updateRiskStatusBreakdown === 'function') {
    updateRiskStatusBreakdown(
        response.totalPlan || 0,       // Mitigated Count (Green)
        response.totalTreatment || 0,  // In Treatment Count (Blue)
        response.totalMonitoring || 0, // Monitoring Count (Orange)
        response.totalRisk || 0        // ✅ DENOMINATOR: Total Risks (The "9")
    );
}

                // ✅ 8. Update Heatmap with likelihoodCount
                if (response.likelihoodCount) {
                    console.log('📊 Received likelihoodCount:', response.likelihoodCount);
                    updateHeatmap(response.likelihoodCount);
                } else {
                    console.warn('⚠️ No likelihoodCount in response');
                }

            } catch (e) {
                console.error('❌ Logic Error in Success Callback:', e);
                var scoreDetailEl = document.querySelector('.score-detail');
                if (scoreDetailEl) {
                    scoreDetailEl.textContent = 'Error processing data';
                }
            }
        },
        error: function (xhr, status, error) {
            console.error('❌ Network/Error Status:', status, error);
            var scoreDetailEl = document.querySelector('.score-detail');
            if (scoreDetailEl) {
                scoreDetailEl.textContent = 'Failed to load data';
            }
        }
    });
}

function updateRiskStatusBreakdown(mitigatedCount, treatmentCount, monitoringCount, totalRiskCount) {
    
    // 1. Calculate Sum for Bar Widths (Visual Proportion)
    var sumOfCounts = mitigatedCount + treatmentCount + monitoringCount;

    // Handle edge case where everything is 0
    if (sumOfCounts === 0 && totalRiskCount === 0) {
        document.querySelectorAll('.hm-bar-fill').forEach(el => el.style.width = '0%');
        document.querySelectorAll('.hm-bar-count').forEach(el => el.textContent = '0/0');
        return;
    }

    // 2. Helper to update a single row
    function updateBarRow(labelColorClass, count, denominator) {
        var row = null;
        var countEl = null;
        var fillEl = null;

        // Find the correct row based on color
        if (labelColorClass === '#27ae60') { // Green - Mitigated
            row = document.querySelector('.hm-bar-label[style*="color:#27ae60"]')?.closest('.hm-bar-row');
        } else if (labelColorClass === '#2980b9') { // Blue - In Treatment
            row = document.querySelector('.hm-bar-label[style*="color:#2980b9"]')?.closest('.hm-bar-row');
        } else if (labelColorClass === '#e67e22') { // Orange - Monitoring
            row = document.querySelector('.hm-bar-label[style*="color:#e67e22"]')?.closest('.hm-bar-row');
        }

        if (row) {
            countEl = row.querySelector('.hm-bar-count');
            fillEl = row.querySelector('.hm-bar-fill');
            
            // ✅ A. UPDATE TEXT: Format is "Count / TotalRisk" (e.g., 18/9)
            if (countEl) {
                // Use totalRiskCount as denominator. If 0, fallback to sum to avoid division by zero error in UI
                var safeDenom = (denominator > 0) ? denominator : sumOfCounts;
                countEl.textContent = count + "/" + safeDenom;
            }

            // ✅ B. UPDATE BAR WIDTH: Based on sumOfCounts (so bars fill the container relatively)
            if (fillEl) {
                var percentage = 0;
                if (sumOfCounts > 0) {
                    percentage = (count / sumOfCounts) * 100;
                }
                fillEl.style.width = percentage + "%";
            }
        }
    }

    // 3. Execute Updates
    // Pass 'totalRiskCount' as the denominator argument
    updateBarRow('#27ae60', mitigatedCount, totalRiskCount);   // Green
    updateBarRow('#2980b9', treatmentCount, totalRiskCount);   // Blue
    updateBarRow('#e67e22', monitoringCount, totalRiskCount);  // Orange
}

function updateTreatmentStrategyChart(strategyData, totalOverride) {
    if (!strategyData || typeof strategyData !== 'object') return;

    // 1. Calculate total
    var total = totalOverride || Object.values(strategyData).reduce((a, b) => a + b, 0);
    if (total === 0) {
        document.querySelectorAll('.hm-bar-tfill').forEach(el => el.style.width = '0%');
        document.querySelectorAll('.hm-bar-tcount').forEach(el => el.textContent = '0');
        return;
    }

    // 2. Mapping: API keys → Display Labels
    var labelMap = {
        'mitigate': 'Mitigate',
        'transfer': 'Transfer',
        'tolerable': 'Accept',
        'avoid': 'Avoid',
        'reduce': 'Reduce',
        'share': 'Share',
        'choose': 'Share',      // Map Choose to Share
        'unknown': 'Unknown'     // Handle UNKNOWN
    };

    // 3. Update each bar row
    Object.keys(labelMap).forEach(apiKey => {
        var displayLabel = labelMap[apiKey];
        var count = strategyData[apiKey] || 0;
        
        // Find the row by matching the label text
        var row = Array.from(document.querySelectorAll('.hm-bar-trow')).find(r => {
            var labelEl = r.querySelector('.hm-bar-tlabel');
            return labelEl && labelEl.textContent.trim().toLowerCase() === displayLabel.toLowerCase();
        });

        if (row) {
            var fillEl = row.querySelector('.hm-bar-tfill');
            var countEl = row.querySelector('.hm-bar-tcount');
            
            // ✅ Update count text: "7/18" format
            if (countEl) {
                countEl.textContent = count + '/' + total;
            }
            
            // Update bar width
            if (fillEl) {
                var percentage = (count / total) * 100;
                fillEl.style.width = percentage.toFixed(1) + '%';
                fillEl.title = displayLabel + ': ' + count + '/' + total + ' (' + percentage.toFixed(1) + '%)';
            }
        }
    });
}


const ALL_RISK_CATEGORIES = [ 
    "Strategic Risk",
    "Operational Risk",
    "Financial Risk", 
    "Compliance & Legal Risk",
    "Technology Risk",
    "Reputational Risk",
    "Human Capital Risk",
    "Environmental, Social & Governance (ESG) Risk",
    "Political Risk",
    "Regulatory Risk",
    "Market Risk",
    "Cybersecurity Risk",
    "Supply Chain Risk",
    "Project & Program Risk",
    "Third-Party/Vendor Risk",
    "Innovation & R&D Risk",
    "Health & Safety Risk",
    "Business Continuity & Resilience Risk",
    "Ethical/Conduct Risk",
    "Investment Risk"
];

// A global variable to hold the chart instance so we can destroy/update it
let categoryChartInstance = null;

/**
 * Helper: Generate distinct colors for the categories
 */
function getCategoryColors(count) {
    // You can expand this list or use a generator function
    const baseColors = [
        '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#1abc9c', 
        '#3498db', '#9b59b6', '#34495e', '#7f8c8d', '#d35400',
        '#c0392b', '#16a085', '#2980b9', '#8e44ad', '#2c3e50'
    ];
    // If we have more categories than colors, repeat or generate randoms
    let colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(baseColors[i % baseColors.length]);
    }
    return colors;
}

/**
 * Main Function to Update Category Chart
 * Call this from your success callback: updateCategoryDashboard(response.categoryCount);
 */
function updateCategoryDashboard(apiCategoryCount) {
    if (!apiCategoryCount) return;

    // 1. Prepare Data Arrays based on ALL_RISK_CATEGORIES order
    const labels = [];
    const dataValues = [];
    
    // Optional: Group anything not in our main list into "Other"
    let otherCount = 0;

    ALL_RISK_CATEGORIES.forEach(cat => {
        // Check if this category exists in the API response
        // Note: Ensure keys match exactly. If API has "Operational Risk" and list has "Operational Risk", it matches.
        if (apiCategoryCount.hasOwnProperty(cat)) {
            labels.push(cat);
            dataValues.push(apiCategoryCount[cat]);
        } else {
            // If you want to show 0 values, uncomment below. 
            // Usually better to hide 0s in donut charts to keep it clean.
            // labels.push(cat);
            // dataValues.push(0);
        }
    });

    // Handle "UNKNOWN" or categories not in our master list
    Object.keys(apiCategoryCount).forEach(key => {
        if (!ALL_RISK_CATEGORIES.includes(key)) {
            otherCount += apiCategoryCount[key];
        }
    });

    if (otherCount > 0) {
        labels.push("Other");
        dataValues.push(otherCount);
    }

    // If no data, show empty state or default
    if (labels.length === 0) {
        labels.push("No Data");
        dataValues.push(1);
    }

    // 2. Generate Colors
    const backgroundColors = getCategoryColors(labels.length);

    // 3. Update Chart.js
    const ctx = document.getElementById('catDonut').getContext('2d');

    // Destroy previous instance if it exists to prevent canvas errors
    if (categoryChartInstance) {
        categoryChartInstance.destroy();
    }

    categoryChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: dataValues,
                backgroundColor: backgroundColors,
                borderWidth: 1,
                borderColor: '#fff'
            }]
        },
        options: {
            cutout: '65%',
            plugins: {
                legend: {
                    display: false // We are using custom HTML legend
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.parsed;
                            return label;
                        }
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: true
        }
    });

    // 4. Update Custom HTML Legend
    updateCustomLegend(labels, dataValues, backgroundColors);
    
    // 5. Update Total Count in Center (Optional, if you want it dynamic)
    // Assuming you passed totalRisk to this function or can access it globally
    // document.querySelector('.sc-donut-center-text .fs-4').textContent = totalRisks;
}

/**
 * Updates the HTML legend below the chart
 */
function updateCustomLegend(labels, dataValues, colors) {
    const legendContainer = document.querySelector('.d-flex.flex-wrap.justify-content-center.gap-3.mt-3');
    if (!legendContainer) return;

    legendContainer.innerHTML = ''; // Clear existing

    labels.forEach((label, index) => {
        const count = dataValues[index];
        const color = colors[index];
        
        // Skip items with 0 count if you prefer cleaner UI
        if (count === 0) return;

        const itemHtml = `
            <div class="text-muted" style="font-size:11px;">
                <span class="d-inline-block rounded-circle me-1" style="width:8px;height:8px;background:${color};"></span>
                ${label} 
                <strong style="color:${color};">${count}</strong>
            </div>
        `;
        legendContainer.insertAdjacentHTML('beforeend', itemHtml);
    });
}



function populateTreatmentPlans(risks) {
    var container = document.getElementById('treatmentPlans');
    if (!container) return;
    
    container.innerHTML = '';

    if (!risks || risks.length === 0) {
        container.innerHTML = '<div class="col-12 text-center text-muted">No treatment plans found.</div>';
        return;
    }

    for (var i = 0; i < risks.length; i++) {
        var risk = risks[i];
        
        // Extract risk-level data
        var riskId = risk.riskUniqueId || "R-" + risk.id;
        var riskValue = risk.riskValue || {};
        var riskName = riskValue.name || "";
        var status = riskValue.riskStatus || "";
        var owner = riskValue.ownerName || "";
        
        // Determine which plan list to use (riskPlanList, riskTreatmentList, or riskMonitoringList)
        var plans = [];
        if (risk.riskPlanList && risk.riskPlanList.length > 0) {
            plans = risk.riskPlanList;
        } else if (risk.riskTreatmentList && risk.riskTreatmentList.length > 0) {
            plans = risk.riskTreatmentList;
        } else if (risk.riskMonitoringList && risk.riskMonitoringList.length > 0) {
            plans = risk.riskMonitoringList;
        }

        // Get strategy and progress from first plan (for card header)
        var strategy = "Mitigate";
        var progress = 0;
        
        if (plans.length > 0) {
            var firstPlan = plans[0];
            var planVal = firstPlan.riskPlanValue || firstPlan.riskTreatmentValue || firstPlan.riskMonitoringValue || {};
            
            // Map action field to strategy text
            if (planVal.action && planVal.action !== "Choose") {
                strategy = planVal.action.charAt(0).toUpperCase() + planVal.action.slice(1);
            } else if (planVal.mitigation) {
                strategy = "Monitor";
            }
            
            // Get progress
            progress = planVal.progress ? parseInt(planVal.progress) : 0;
            if (isNaN(progress)) progress = 0;
        }

        // Build action items HTML
        var actionsHtml = '';
        if (plans.length > 0) {
            for (var j = 0; j < plans.length; j++) {
                var plan = plans[j];
                var pVal = plan.riskPlanValue || plan.riskTreatmentValue || plan.riskMonitoringValue || {};
                
                // Get reducingimpact and reducingpossibility
                var reducingImpact = pVal.reducingimpact || "";
                var reducingPossibility = pVal.reducingpossibility || "";
                
                // Determine completion status
                var isComplete = pVal.status === "Completed" || pVal.status === "Close" || (parseInt(pVal.progress) === 100);
                var checkBg = isComplete ? "#27ae60" : "#e0e0e0";
                var checkIcon = isComplete ? "✓" : "";
                var textColor = isComplete ? "#555" : "#999";
                
                // Build two-column content for reducingimpact | reducingpossibility
                var actionContent = '';
                if (reducingImpact || reducingPossibility) {
                    actionContent = '<div style="display:flex;justify-content:space-between;width:100%;align-items:center;">' +
                        '<span style="font-size:11px;color:' + textColor + ';text-decoration:none;flex:1;text-align:left;padding-right:4px;">' + 
                            (reducingImpact ? reducingImpact : '-') + 
                        '</span>' +
                        '<span style="font-size:11px;color:' + textColor + ';text-decoration:none;flex:1;text-align:right;padding-left:4px;border-left:1px dashed #ccc;">' + 
                            (reducingPossibility ? reducingPossibility : '-') + 
                        '</span>' +
                        '</div>';
                } else {
                    // Fallback to name/mitigation if reducing fields are empty
                    var fallbackName = pVal.name || pVal.mitigation || "Action Item";
                    actionContent = '<span style="font-size:11px;color:' + textColor + ';text-decoration:none;">' + fallbackName + '</span>';
                }

                actionsHtml += '<div class="treat-action-item d-flex align-items-center py-1 border-bottom border-light">' +
                    actionContent +
                    '</div>';
            }
        } else {
            actionsHtml = '<div class="treat-action-item d-flex align-items-center py-1 border-bottom border-light">' +
                '<span style="font-size:11px;color:#999;">No actions defined</span>' +
                '</div>';
        }

        // Determine colors based on status
        var pillClass = "pill-gray";
        var progressBarColor = "#95a5a6";
        var progressTextColor = "#555";

        if (status === "Very High" || status === "Critical") {
            pillClass = "pill-red";
            progressBarColor = "#e74c3c";
            progressTextColor = "#e74c3c";
        } else if (status === "High") {
            pillClass = "pill-orange";
            progressBarColor = "#e67e22";
            progressTextColor = "#e67e22";
        } else if (status === "Medium" || status === "Tolerable") {
            pillClass = "pill-blue";
            progressBarColor = "#2980b9";
            progressTextColor = "#2980b9";
        } else if (status === "Low") {
            pillClass = "pill-green";
            progressBarColor = "#27ae60";
            progressTextColor = "#27ae60";
        } else if (status === "Very Low") {
            pillClass = "pill-lightgreen";
            progressBarColor = "#2ecc71";
            progressTextColor = "#2ecc71";
        }

        // Build the full card HTML using + concatenation
        var cardHtml = '<div class="col-lg-4 col-md-6 mb-3">' +
            '<div class="treat-card h-100" style="background:var(--stratroom-body-bg); border:1px solid var(--stratroom-border-color); border-radius:10px; padding:14px 16px;">' +
            '<div class="d-flex align-items-start justify-content-between mb-2">' +
            '<span style="font-size:10px;font-weight:700;color:#888;background:#f0f0f0;border-radius:3px;padding:2px 6px;">' + riskId + '</span>' +
            '<span class="sc-pill ' + pillClass + '" style="font-size:10px; padding: 2px 6px; border-radius: 3px; background: ' + progressBarColor + '20; color: ' + progressBarColor + '; font-weight:bold;">' + status + '</span>' +
            '</div>' +
            '<div style="font-size:13px;font-weight:700;color:var(--stratroom-body-color);margin-bottom:4px;">' + riskName + '</div>' +
            '<div class="text-muted" style="font-size:11px;margin-bottom:8px;">Strategy: ' + strategy + ' · Owner: ' + owner + '</div>' +
            '<div style="width:100%;height:6px;background:#eee;border-radius:3px;margin-bottom:6px;">' +
            '<div style="height:6px;border-radius:3px;background:' + progressBarColor + ';width:' + progress + '%;"></div>' +
            '</div>' +
            '<div class="d-flex justify-content-between mb-2" style="font-size:11px;color:#555;">' +
            '<span>Treatment Progress</span><strong style="color:' + progressTextColor + ';">' + progress + '%</strong>' +
            '</div>' +
            '<div class="treat-actions mt-2 pt-2 border-top border-light">' +
            actionsHtml +
            '</div>' +
            '</div>' +
            '</div>';

        container.insertAdjacentHTML('beforeend', cardHtml);
    }
}

$(document).ready(function() {
    // Auto-load from URL parameter or fallback
    // const deptId = new URLSearchParams(window.location.search).get('deptId') || 'default';
    loadRiskDashboardData(deptId);
    initCharts();
});       


function initCharts(statusCount) {
    // Map statusCount values to chart order: [Very High, High, Tolerable, Low, Very Low]
    const chartData = statusCount ? [
        statusCount["Very High"] || 0,   // Critical
        statusCount["High"] || 0,        // High
        statusCount["Tolerable"] || 0,   // Medium
        statusCount["Low"] || 0,         // Low
        statusCount["Very Low"] || 0     // Very Low
    ] : [0, 0, 0, 0, 0]; // Fallback empty data

    // Destroy existing chart if it exists (prevent canvas overlap)
    const existingChart = Chart.getChart(document.getElementById('levelBar'));
    if (existingChart) {
        existingChart.destroy();
    }

    // Create new chart with dynamic data
    new Chart(document.getElementById('levelBar'), {
        type: 'bar',
        data: {
            labels: ['Critical', 'High', 'Medium', 'Low', 'Very Low'],
            datasets: [{
                data: chartData,  // ← Dynamic data from API
                backgroundColor: ['#e74c3c', '#e67e22', '#f1c40f', '#27ae60', '#71f689'],
                borderRadius: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { display: false } },
                y: { grid: { color: '#f0f0f0' } }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}


  </script>




  
</body>