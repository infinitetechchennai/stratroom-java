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
.audit-custom-tabs {
  border-bottom: 1px solid #cbd5e1 !important;
  gap: 4px;
  
  .nav-item {
    margin-bottom: -1px;
  }
  
  .nav-link {
    border: 1px solid transparent !important;
    background: transparent !important;
    color: #4e78b7 !important; /* Muted blue */
    font-weight: 600 !important;
    font-size: 11px !important;
    letter-spacing: 0.05em;
    padding: 8px 18px !important;
    border-radius: 6px 6px 0 0 !important;

    &:hover {
      color: #1e3a8a !important;
      background: rgba(0, 0, 0, 0.02) !important;
    }
    
    &.active {
      background: #897989 !important; /* Purple-gray from screenshot */
      color: #ffffff !important;
      border-color: #897989 #897989 transparent #897989 !important;
    }
  }
}

/* Custom filter buttons for Findings tab */
.aud-filter-btn {
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  user-select: none;
  background: #ffffff;
  color: #3b71b8; /* Blue text */
  border: 1px solid #cbd5e1;

  &:hover {
    transform: scale(1.02);
    border-color: #94a3b8;
  }

  &.active {
    background: #8b3e6e; /* Plum from screenshot */
    color: #ffffff;
    border-color: #8b3e6e;
  }
}

/* Custom mini-bars used for Severity and Audit Scores */
.aud-mini-bar-bg {
  height: 5px;
  background: var(--bs-border-color); /* Usually a light gray or #e2e8f0 */
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.aud-mini-bar-fill {
  height: 100%;
  border-radius: 3px;
  width: 0%; /* Initial width for animation */
  transition: width 0.8s ease-out;
}

/* Base Badge class for Status and Priority */
.aud-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 5px;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

/* Simple fade-in animation for bars */
.fade-width {
  animation: loadWidth 0.8s ease-out forwards;
}

@keyframes loadWidth {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
        <div class="container-lg">
            <div class="page-header grid gap-2 pb-1">
                <div class="g-col-12 g-col-md-8 d-flex flex-column align-items-start pb-2">

                    <h4 class="title mb-0 fs-5 fw-bold d-flex align-items-center gap-1 text-uppercase"
                        style="letter-spacing: 0.05em; color: var(--bs-body-color);">
                        <span class="icon d-flex align-items-center" style="color: var(--bs-body-color);">
                            <i data-lucide="shield" style="width: 18px; height: 18px; stroke-width: 2px;"></i>
                        </span>
                        <span data-translate="page.auditDashboard.title">Audit Management</span>
                    </h4>
                </div>
                <!-- overall score -->
                <div
                    class="g-col-12 g-col-md-4 d-flex justify-content-md-end justify-content-start align-items-center mt-2 mt-md-0 gap-3">
                       <select name="deptrepotees" id="deptrepotees" style="border: 1px solid #dddd;border-radius: 5px;margin-right: 20px;height: 28px;width: 130px;"></select>
                    <div class="d-flex align-items-center gap-2 px-3 py-1 rounded" id="ov-overdue"
                        style="display:none; background:#450a0a33; border:1px solid #ef444444;">
                        <span style="font-size:10px; font-weight:700; color:#ef4444" id="ov-overdue-val">1
                            OVERDUE</span>
                    </div>
                    <div class="overall-score-v2 d-flex">
                        <div>
                            <div class="score-label">AVG AUDIT SCORE</div>
                            <div class="score-detail" id="avg-score-detail">82/100</div>
                        </div>
                        <div class="score-percent" id="avg-score-percent">82</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- TABS NAVIGATION -->
        <div class="container-lg overflow-auto">
            <ul class="nav nav-tabs dashboard-tabs audit-custom-tabs mb-4 px-2 flex-nowrap" id="auditTabs" role="tablist"
                style="min-width: max-content;">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active text-uppercase"
                        id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview" type="button"
                        role="tab">Overview</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link text-uppercase"
                        id="audits-tab" data-bs-toggle="tab" data-bs-target="#audits" type="button"
                        role="tab">Audits</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link text-uppercase"
                        id="findings-tab" data-bs-toggle="tab" data-bs-target="#findings" type="button"
                        role="tab">Findings</button>
                </li>
            </ul>
        </div>

        <div class="container-lg py-2 tab-content" id="auditTabContent">

            <!-- ============================== OVERVIEW TAB ============================== -->
            <div class="tab-pane fade show active" id="overview" role="tabpanel">

                <!-- Summary KPI Cards -->
                <div class="row g-3 mb-4">
                    <div class="col-lg-2 col-md-4 col-sm-6 col-6">
                        <div class="compliance-kpi-card" id="kpi-audits">
                            <div class="kpi-label text-uppercase">Total Audits</div>
                            <div class="kpi-value text-primary" id="val-audits">10</div>
                            <div class="kpi-sub">FY 2025</div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 col-6">
                        <div class="compliance-kpi-card" id="kpi-closed">
                            <div class="kpi-label text-uppercase">Closed</div>
                            <div class="kpi-value text-success" id="val-closed">4</div>
                            <div class="kpi-sub" id="sub-closed">40% completion</div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 col-6">
                        <div class="compliance-kpi-card" id="kpi-inprog">
                            <div class="kpi-label text-uppercase">In Progress</div>
                            <div class="kpi-value text-primary" id="val-inprog">3</div>
                            <div class="kpi-sub">active engagements</div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 col-6">
                        <div class="compliance-kpi-card" id="kpi-overdue">
                            <div class="kpi-label text-uppercase">Overdue</div>
                            <div class="kpi-value text-danger" id="val-overdue">1</div>
                            <div class="kpi-sub">needs escalation</div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 col-6">
                        <div class="compliance-kpi-card" id="kpi-findings">
                            <div class="kpi-label text-uppercase">Open Findings</div>
                            <div class="kpi-value" style="color:#f97316;" id="val-findings">12</div>
                            <div class="kpi-sub" id="sub-findings">of 13 total</div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 col-6">
                        <div class="compliance-kpi-card" id="kpi-crit">
                            <div class="kpi-label text-uppercase">Critical Open</div>
                            <div class="kpi-value text-danger" id="val-crit">2</div>
                            <div class="kpi-sub">immediate action</div>
                        </div>
                    </div>
                </div>

                <!-- Charts Row 1 -->
                <div class="row g-3 mb-4">
                    <div class="col-lg-5">
                        <div class="chart-card h-100">
                            <div class="chart-title mb-2">FINDINGS TREND VS AUDIT SCORE</div>
                            <div class="chart-container"><canvas id="trendChart"></canvas></div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="chart-card h-100">
                            <div class="chart-title mb-2">AUDIT TYPE MIX</div>
                            <div
                                class="chart-container d-flex align-items-center justify-content-center position-relative">
                                <canvas id="typePieChart" style="max-width:180px;max-height:180px;"></canvas>
                            </div>
                            <div class="row g-1 mt-2 chart-legend justify-content-center" id="typeLegend">
                                <!-- Generated by JS -->
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="chart-card h-100">
                            <div class="chart-title mb-2">FINDINGS BY SEVERITY</div>
                            <div id="sevBarsContainer" class="mt-3">
                                <!-- JS Generated -->
                            </div>
                            <div class="border-top mt-3 pt-2 d-flex justify-content-between"
                                style="font-size:11px; color:var(--bs-secondary-color);">
                                <span>Total open</span>
                                <span style="color:#f97316; font-weight:700;" id="sevTotalOpen">12</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Charts Row 2 -->
                <div class="row g-3 mb-4">
                    <div class="col-lg-7">
                        <div class="chart-card h-100">
                            <div class="chart-title mb-2">FINDINGS BY FRAMEWORK</div>
                            <div class="chart-container"><canvas id="fwBarChart"></canvas></div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="chart-card h-100">
                            <div class="chart-title mb-2">AUDIT SCORES</div>
                            <div id="scoresContainer" class="mt-2 d-flex flex-column gap-3"
                                style="max-height: 250px; overflow-y:auto; overflow-x:hidden;">
                                <!-- JS Generated -->
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <!-- ============================== AUDITS TAB ============================== -->
            <div class="tab-pane fade" id="audits" role="tabpanel">
                <div class="table-responsive bg-white rounded shadow-sm border p-3">
                    <table class="table sc-table align-middle" id="auditsTable" style="width:100%">
                        <thead>
                            <tr>
                                <th>AUDIT ID</th>
                                <th>TITLE</th>
                                <th>FRAMEWORK</th>
                                <th>TYPE</th>
                                <th>STATUS</th>
                                <th>PRIORITY</th>
                                <th>PROGRESS</th>
                                <th>SCORE</th>
                                <th>FINDINGS</th>
                                <th>OWNER</th>
                            </tr>
                        </thead>
                        <tbody id="auditsTableBody">
                            <!-- JS Rendered -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- ============================== FINDINGS TAB ============================== -->
            <div class="tab-pane fade" id="findings" role="tabpanel">
                <!-- Findings Filters -->
                <div class="row g-2 align-items-center mb-3 p-3 bg-white rounded shadow-sm border mx-0">
                    <div class="col-12 col-md-6 col-lg-5 d-flex flex-wrap align-items-center gap-2">
                        <span
                            style="font-size: 11px; font-weight:700; color: var(--bs-secondary-color);">SEVERITY:</span>
                        <div class="d-flex flex-wrap gap-2" id="sevFilters">
                            <span class="aud-filter-btn active" data-filter="All" data-type="sev">All</span>
                            <span class="aud-filter-btn" data-filter="Critical" data-type="sev">Critical</span>
                            <span class="aud-filter-btn" data-filter="High" data-type="sev">High</span>
                            <span class="aud-filter-btn" data-filter="Medium" data-type="sev">Medium</span>
                            <span class="aud-filter-btn" data-filter="Low" data-type="sev">Low</span>
                        </div>
                    </div>

                    <div class="col-12 col-md-6 col-lg-4 d-flex flex-wrap align-items-center gap-2 mt-2 mt-md-0">
                        <span style="font-size: 11px; font-weight:700; color: var(--bs-secondary-color);">STATUS:</span>
                        <div class="d-flex flex-wrap gap-2" id="statusFilters">
                            <span class="aud-filter-btn active" data-filter="All" data-type="status">All</span>
                            <span class="aud-filter-btn" data-filter="Open" data-type="status">Open</span>
                            <span class="aud-filter-btn" data-filter="In Progress" data-type="status">In Progress</span>
                        </div>
                    </div>


                </div>

                <div class="table-responsive bg-white rounded shadow-sm border p-3">
                    <table class="table sc-table align-middle" id="findingsTable" style="width:100%">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>FINDING</th>
                                <th>SEVERITY</th>
                                <th>STATUS</th>
                                <th>FRAMEWORK</th>
                                <th>OWNER</th>
                                <th>DUE DATE</th>
                                <th title="Age in days">AGE</th>
                            </tr>
                        </thead>
                        <tbody id="findingsTableBody">
                            <!-- JS Rendered -->
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </main>

    <footer class="col-12 text-center py-2 copyright mt-auto">
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
  	<script type="text/javascript" src="${contextroot}/js/auditdashboard.js"></script>
	 <script>

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
        url: "auditDashBoardData", // Ensure this URL is correct for your backend
        data: { deptId: deptId },
        dataType: "json",
        success: function (response) {
             console.log("✅ Data loaded successfully", response);
        },
        error: function (xhr, status, error) {
            console.error('❌ Network/Error Status:', status, error);
            showErrorUI('Failed to load data');
        }
    });
}


  </script>




  
</body>