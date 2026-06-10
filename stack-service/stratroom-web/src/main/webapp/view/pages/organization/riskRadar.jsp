<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
	<c:set var="contextroot" value="${pageContext.request.contextPath}" />
	<!DOCTYPE html>
	<html lang="en">

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge">
		<meta content="width=device-width, initial-scale=1" name="viewport" />
		<title>StratRoom</title>
		<link href="assets/css/file-upload.css" rel="stylesheet">
		<link href="assets/css/orgchartnewbasic.css" rel="stylesheet">





	</head>

	<style>
		       /* .card-title {
      font-size: 1.1rem;
      font-weight: bold;
    } */
        .status-dot {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            display: inline-block;
        }

        .dot-green {
            background-color: #28a745;
        }

        .dot-yellow {
            background-color: #ffc107;
        }

        .dot-red {
            background-color: #dc3545;
        }

        .arrow-up {
            color: green;
        }

        .arrow-right {
            color: orange;
        }

        .arrow-down {
            color: red;
        }

        .progress-bar {
            background-color: #007bff;
        }
         /* .gauge-wrapper {
  position: relative;
  width: 120px;
  max-height: 200px;
  margin: 0 auto;
  aspect-ratio: 2/1;
}
.gauge-wrapper .gauge {
  width: 100%;
  height: 100%;
}
.gauge-wrapper .needle {
  position: absolute;
  width: 3px;
  background: linear-gradient(to top, #333, #666);
  border-radius: 2px;
  bottom: 32%;
  left: 50%;
  transform-origin: bottom center;
  transform: translateX(-50%) rotate(-90deg);
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
  height: 35%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
.gauge-wrapper .needle-circle {
  position: absolute;
  background: radial-gradient(circle, #333 0%, #000 100%);
  border-radius: 50%;
  bottom: 26%;
  left: 50%;
  transform: translate(-50%, 26%);
  z-index: 11;
  width: clamp(12px, 3vw, 18px);
  height: clamp(12px, 3vw, 18px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.gauge-labels {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.gauge-labels .label {
  flex: 1;
  font-size: 12px;
  color: #333;
  position: absolute;
  display: block;
  padding: 2px;
  line-height: 1;
}
.gauge-labels .low {
  text-align: left;
  color: green;
  bottom: 0;
  left: 0;
}
.gauge-labels .medium {
  text-align: center;
  color: orange;
  width: 100%;
}
.gauge-labels .high {
  text-align: right;
  color: red;
  right: 0;
  bottom: 0;
}
.gauge-labels .poor {
  bottom: 0;
  left: 0;
  color: red;
}
.gauge-labels .average {
  color: #999900;
}
.gauge-labels .good {
  right: 0;
  color: #228B22;
}
.gauge-labels .excellent {
  right: 0;
  bottom: 0;
  color: green;
} */
        
	</style>
	<script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>

	<body class="light" data-page="org-structure-new">
		<!-- <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}"> -->


		<div style="display: none;">
			<jsp:include page="../common/right-navigation.jsp"></jsp:include>
		</div>

		<jsp:include page="../common/top-navigation.jsp"></jsp:include>
		<header id="header" class="header shadow-sm">

			<jsp:include page="../common/left-navigation.jsp"></jsp:include>
		</header>

    <main>
         <c:if test="${pageId != null}">
        <input id="pagenumber" type="hidden" name="pagenumber" value="<c:out value="${pageId}" />">
    </c:if>

        <section id="heroSection1" class="py-3 hero-section theme-default"
            style="background: url(/stratroom/images/landing-theme/strategy-map-01.jpg) right top no-repeat;background-size: cover;">
            <div class="blur-overlay"></div>
            <div class="container-lg">
                <div class="page-header grid gap-2 pb-1">
                    <div class="g-col-8 d-flex align-items-center">
                        <h4 class="title text-white">
                            <span class="icon">
                                <img src="/stratroom/images/meetings-i.svg" alt="meetings" title="meetings">
                            </span>
                            Risk Radar
                        </h4>
                    </div>
                    <div class="load-page page-actions g-col-4">
                        <div class="page-icons">
            <ul>
            
            
              <li>
               <a href="javascript:;" id="popoverFilterRiskCategory" class="btn btn-sm btn-icon" >
                    <span data-bs-toggle="tooltip" data-bs-placement="bottom" title="Risk Category">
 <img src="/stratroom/images/filter-i.svg" width="12" height="12" alt="Filter" > 
                    </span>
                 
                </a>
              </li>
              
            </ul>
          </div>
                        <!-- <div id="popoverFilterRiskCategory">
  <span type="button" class="btn btn-sm btn-icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Risk Category">                                    
    <img src="assets/images/icons/filter-i.svg" width="12" height="12" alt="Filter"> 
  </span>
</div> -->
                        <div class="form-group">
                            <select id="riskDeptSelect" class="form-select form-select-sm">
                            </select>
                        </div>
                         <div class="form-group">
                            <select id="riskPageSelect" class="form-select form-select-sm">
                            </select>
                        </div>

                    </div>
                </div>
            </div>
            <div id="riskRadarContainer">

            </div>

        </section>

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
		<script src="${contextroot}/js/admin.js"></script>
		<!-- Knob Js -->
		<script src="${contextroot}/js/jquery-ui.min.js"></script>
		<script src="${contextroot}/js/moment.js"></script>
		<script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
    	<script src="${contextroot}/js/bundles/amcharts4/core.js"></script>
    	<script src="${contextroot}/js/bundles/amcharts4/charts.js"></script>
    	<script src="${contextroot}/js/bundles/amcharts4/animated.js"></script>
        	<script type="text/javascript" src="${contextroot}/js/riskRadar.js"></script>
		<script src="${contextroot}/js/bootstrap-popover-x.js"
			type="text/javascript"></script>
		<script src="${contextroot}/js/chosen.jquery.min.js"></script>
		<script src="${contextroot}/js/widgets.js"></script>	
		<script src="${contextroot}/js/handlebars.js"></script>
		<script src="${contextroot}/js/notify.js"></script>
		<script src="${contextroot}/js/apexcharts.js"></script>
		<script src="${contextroot}/js/initial.js"></script>
		<script src="${contextroot}/js/select2.min.js"></script>
 
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery-sparkline/jquery.sparkline.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>
   <script>
     $(document).ready(function () {

    // Initialize Select2
    $(".select-dropdown").select2({ width: "100%" });
    $(".selectdrop-add-task").select2({ width: "100%", dropdownParent: $('#task-add-modal') });
    $(".selectdrop-update-status").select2({ width: "100%", dropdownParent: $('#statusUpdateModal') });

    // Load department list after DOM ready
    loadStrategyMapDepartments();

    // Change Event
    $("#riskDeptSelect").on("change", function () {
        var deptId = $(this).val();
        loadRiskListByDeptId(deptId);
    });
});


// Load departments into the dropdown
function loadStrategyMapDepartments() {
    $("#riskDeptSelect").empty();

    $.ajax({
        type: "GET",
        url: "/stratroom/departmentReportees",
        success: function (data) {
            $.each(data, function (index, dept) {
                $("#riskDeptSelect").append(
                    '<option value="' + dept.id + '">' + dept.name + '</option>'
                );
            });

            if (data.length > 0) {
                const firstDeptId = data[0].id;
                $("#riskDeptSelect").val(firstDeptId).trigger("change");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Failed to load departments:", textStatus, errorThrown);
        }
    });
}

// Handle department selection change
$("#riskDeptSelect").on("change", function () {
    const selectedDeptId = $(this).val(); // 👈 this is what you selected

    if (!selectedDeptId) {
        $("#riskPageSelect").empty();
        return;
    }

    // ✅ Call risk list immediately with selected value
    loadRiskListByDeptId(selectedDeptId);

    // Existing call for page list
    $.ajax({
        type: "GET",
        url: "/stratroom/pageDeptList/" + selectedDeptId + "?pageType=Risk",
        success: function (response) {
            const $select = $("#riskPageSelect");
            $select.empty();

            if (Array.isArray(response) && response.length > 0) {
                response.forEach(item => {
                    $select.append(
                     `<option value="`+item.id+`">`+item.pageName+`</option>`
                    );
                });
            }
        },
        error: function () {
            $("#riskPageSelect").empty();
        }
    });
});

$("#riskPageSelect").on("change", function () {
    const selectedPageId = $(this).val();                 // page id
    const selectedPageName = $(this).find(":selected").text(); // page name (optional)

    console.log("Page ID:", selectedPageId);
    console.log("Page Name:", selectedPageName);

    if (selectedPageId) {
        loadRiskListByDeptId(selectedPageId); // passing selected page
    }
});

const riskCategories = [
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

function loadRiskListByDeptId(deptId) {
    var datePeriod = $('#datePeriod').val();
    
var currentEmp = $("#userPrincipal").val();
    console.log(datePeriod,"date")
    $.ajax({
        type: "GET",
        url :"riskList/"+currentEmp +"?pageId=" + deptId + "&dateRange=" + datePeriod,
        success: function (response) {
            console.log("Risk List:", response);
            renderRiskUI(response);
        },
        error: function (xhr, status, error) {
            console.error("❌ Failed to load risk list:", error);
        }
    });
}

// Helper: Map risk status to numeric score
function getRiskScore(status) {
    const map = {
        "Very Low": 10,
        "Low": 25,
        "Medium": 50,
        "High": 75,
        "Very High": 90
    };
    return map[status] || 50; // fallback to Medium if unknown
}

function renderRiskUI(riskList) {
    const container = $("#riskRadarContainer");

    if (container.length === 0) {
        console.error("❌ Risk container not found in DOM!");
        return;
    }

    container.empty();

    // Initialize grouped buckets: each has risks array + maxScore
    const grouped = {};
    riskCategories.forEach(cat => {
        grouped[cat] = { risks: [], maxScore: 0 };
    });

    // Group risks and compute max risk score per category
    riskList.forEach(risk => {
        let cat = risk.riskValue?.riskcategory;
        const status = (risk.riskValue?.riskStatus || "").trim();
        const score = getRiskScore(status);

        // Normalize category
        if (typeof cat === 'string') {
            cat = cat.trim();
        } else {
            cat = '';
        }

        if (cat !== '' && grouped.hasOwnProperty(cat)) {
            // Update max score if current risk is worse
            if (score > grouped[cat].maxScore) {
                grouped[cat].maxScore = score;
            }
            grouped[cat].risks.push(risk);
            console.log("✅ Included risk:", risk.riskUniqueId, "in category:", cat);
        } else {
            console.log("❌ Skipped risk (invalid/missing/unrecognized category):", risk.riskUniqueId, "| Category:", cat);
        }
    });

    // Render non-empty categories
    riskCategories.forEach((category, i) => {
        const { risks, maxScore } = grouped[category];
        if (risks.length === 0) return;

        let rows = "";
        risks.forEach(item => {
            const status = (item.riskValue?.riskStatus || "").trim();
            const isLow = status === "Low" || status === "Very Low";

            const iconUrl = isLow
                ? '/stratroom/images/buzzer-green-i.svg'
                : '/stratroom/images/buzzer-red-i.svg';

            const riskUniqueId = item.riskUniqueId || "";
            const riskName = item.riskValue?.name || "";
            const dateCompleted = item.riskValue?.dateCompleted || "";
            const draftStatus = item.draft || "APPROVED";
            const dateRaised = item.riskValue?.dateRaised || "";
            const nextAssessment = item.riskValue?.nextAssessment || "";

            rows += `
                <tr>
                    <td class="text-center">`+riskUniqueId+`</td>
                    <td ><div style="width:150px;white-space:normal">`+riskName+`</div></td>
                    <td class="text-center">`+draftStatus+`</td>
                    <td class="text-center">`+dateRaised+`</td>
                    <td class="text-center">`+dateCompleted+`</td>
                    <td class="text-center">`+nextAssessment+`</td>
                </tr>
            `;
        });

        // Use the computed maxScore for this category's gauge
        const gaugeValue = Math.max(0, Math.min(100, maxScore)); // clamp between 0–100

        container.append(`
            <div class="container-lg py-2">
                <div class="row g-4 riskRow">
                    <div class="col-md-3 col-12">
                        <div class="card border-0 h-100 c1">
                            <div class="card-header bg-transprant border-0 pb-0">
                                <h6 class="card-title fs-6 font-weight-medium mb-0">Risk Radar</h6>
                                <p class="small text-muted mb-0">What's emerging, escalating, or under control?</p>
                            </div>
                            <div class="card-body d-flex flex-column">
                                <div class="gauge-wrapper" data-id="g`+i+`">
                                    <div class="gauge" data-chart="" style="min-height: 82px;">    <div id="apexchartsrduweoas" class="apexcharts-canvas apexchartsrduweoas apexcharts-theme-light" style="width: 120px; height: 82px;"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" class="apexcharts-svg" xmlns:data="ApexChartsNS" transform="translate(0, 0)" width="120" height="82"><foreignObject x="0" y="0" width="120" height="82"><style type="text/css">.apexcharts-flip-y {
  transform: scaleY(-1) translateY(-100%);
  transform-origin: top;
  transform-box: fill-box;
}
.apexcharts-flip-x {
  transform: scaleX(-1);
  transform-origin: center;
  transform-box: fill-box;
}
.apexcharts-legend {
  display: flex;
  overflow: auto;
  padding: 0 10px;
}
.apexcharts-legend.apexcharts-legend-group-horizontal {
  flex-direction: column;
}
.apexcharts-legend-group {
  display: flex;
}
.apexcharts-legend-group-vertical {
  flex-direction: column-reverse;
}
.apexcharts-legend.apx-legend-position-bottom, .apexcharts-legend.apx-legend-position-top {
  flex-wrap: wrap
}
.apexcharts-legend.apx-legend-position-right, .apexcharts-legend.apx-legend-position-left {
  flex-direction: column;
  bottom: 0;
}
.apexcharts-legend.apx-legend-position-bottom.apexcharts-align-left, .apexcharts-legend.apx-legend-position-top.apexcharts-align-left, .apexcharts-legend.apx-legend-position-right, .apexcharts-legend.apx-legend-position-left {
  justify-content: flex-start;
  align-items: flex-start;
}
.apexcharts-legend.apx-legend-position-bottom.apexcharts-align-center, .apexcharts-legend.apx-legend-position-top.apexcharts-align-center {
  justify-content: center;
  align-items: center;
}
.apexcharts-legend.apx-legend-position-bottom.apexcharts-align-right, .apexcharts-legend.apx-legend-position-top.apexcharts-align-right {
  justify-content: flex-end;
  align-items: flex-end;
}
.apexcharts-legend-series {
  cursor: pointer;
  line-height: normal;
  display: flex;
  align-items: center;
}
.apexcharts-legend-text {
  position: relative;
  font-size: 14px;
}
.apexcharts-legend-text *, .apexcharts-legend-marker * {
  pointer-events: none;
}
.apexcharts-legend-marker {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 1px;
}

.apexcharts-legend-series.apexcharts-no-click {
  cursor: auto;
}
.apexcharts-legend .apexcharts-hidden-zero-series, .apexcharts-legend .apexcharts-hidden-null-series {
  display: none !important;
}
.apexcharts-inactive-legend {
  opacity: 0.45;
} </style></foreignObject><g class="apexcharts-inner apexcharts-graphical" transform="translate(0, 4)"><defs><clipPath id="gridRectMaskrduweoas"><rect width="132" height="124" x="-6" y="-6" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath><clipPath id="gridRectBarMaskrduweoas"><rect width="132" height="124" x="-6" y="-6" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath><clipPath id="gridRectMarkerMaskrduweoas"><rect width="132" height="112" x="-6" y="0" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath><clipPath id="forecastMaskrduweoas"></clipPath><clipPath id="nonForecastMaskrduweoas"></clipPath><linearGradient x1="0" y1="1" x2="1" y2="1"><stop stop-opacity="0.9" stop-color="#00dd44" offset="0"></stop><stop stop-opacity="0.9" stop-color="#88dd00" offset="0.3"></stop><stop stop-opacity="0.9" stop-color="#ffdd00" offset="0.5"></stop><stop stop-opacity="0.9" stop-color="#ff8800" offset="0.7"></stop><stop stop-opacity="0.9" stop-color="#ff4444" offset="1"></stop></linearGradient><linearGradient x1="0" y1="1" x2="1" y2="1" id="SvgjsLinearGradient1004"><stop stop-opacity="0.9" stop-color="#00dd44" offset="0"></stop><stop stop-opacity="0.9" stop-color="#88dd00" offset="0.3"></stop><stop stop-opacity="0.9" stop-color="#ffdd00" offset="0.5"></stop><stop stop-opacity="0.9" stop-color="#ff8800" offset="0.7"></stop><stop stop-opacity="0.9" stop-color="#ff4444" offset="1"></stop></linearGradient></defs><g class="apexcharts-radialbar"><g><g class="apexcharts-tracks"><g class="apexcharts-radialbar-track apexcharts-track" rel="1"><path d="M 19.256097560975604 55.99999999999999 A 40.743902439024396 40.743902439024396 0 0 1 100.7439024390244 56 " fill="none" fill-opacity="1" stroke="rgba(238, 238, 238, 0.8)" stroke-opacity="1" stroke-linecap="round" stroke-width="5.926829268292684" stroke-dasharray="0" class="apexcharts-radialbar-area" id="apexcharts-radialbarTrack-0" data:pathorig="M 19.256097560975604 55.99999999999999 A 40.743902439024396 40.743902439024396 0 0 1 100.7439024390244 56 "></path></g></g><g><g class="apexcharts-series apexcharts-radial-series" seriesname="Risk" rel="1" data:realindex="0"><path d="M 19.256097560975604 55.99999999999999 A 40.743902439024396 40.743902439024396 0 0 1 100.7439024390244 56 " fill="none" fill-opacity="0.85" stroke="url(#SvgjsLinearGradient1004)" stroke-opacity="1" stroke-linecap="round" stroke-width="5.926829268292684" stroke-dasharray="0" class="apexcharts-radialbar-area apexcharts-radialbar-slice-0" data:angle="180" data:value="100" index="0" j="0" data:pathorig="M 19.256097560975604 55.99999999999999 A 40.743902439024396 40.743902439024396 0 0 1 100.7439024390244 56 "></path></g><circle r="32.78048780487806" cx="60" cy="56" class="apexcharts-radialbar-hollow" fill="transparent"></circle></g></g></g><line x1="0" y1="0" x2="120" y2="0" stroke="#b6b6b6" stroke-dasharray="0" stroke-width="1" stroke-linecap="butt" class="apexcharts-ycrosshairs"></line><line x1="0" y1="0" x2="120" y2="0" stroke="#b6b6b6" stroke-dasharray="0" stroke-width="0" stroke-linecap="butt" class="apexcharts-ycrosshairs-hidden"></line></g><g class="apexcharts-datalabels-group" transform="translate(0, 0) scale(1)"></g><g class="apexcharts-datalabels-group" transform="translate(0, 0) scale(1)"></g></svg><div class="apexcharts-legend"></div></div></div>
                                    <div class="needle" data-needle></div>
                                    <div class="needle-circle"></div>
                                    <input hidden type="range" class="speedSlider" min="0" max="100" value="`+gaugeValue+`">
                                    <div class="gauge-labels"></div>
                                </div>
                                <div class="d-flex gap-2 align-items-center justify-content-between bg-primary rounded-pill text-white px-4 ps-1 py-1 mt-3">
                                    <img src="/stratroom/images/finance-w.svg" width="42" height="42" alt="Category Icon">
                                    <h6 class="fs-6 mb-0 text-uppercase riCategory">`+category+`</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-9 col-12">
                        <div class="card border-0 h-100">
                            <div class="card-header bg-transprant border-0 pb-0">
                                <h6 class="card-title fs-6 font-weight-medium mb-0">Risk Radar</h6>
                                <p class="small text-muted mb-0">What's emerging, escalating, or under control?</p>
                            </div>
                            <div class="card-body">
                                <table class="table table-sm table-striped table-bordered w-100 text-nowrap small">
                                    <thead>
                                        <tr>
                                            <th class="text-center">Risk ID</th>
                                            <th class="text-center">Risk Name</th>
                                            <th class="text-center">Approval</th>
                                            <th class="text-center">Date Raised</th>
                                            <th class="text-center">Date Completed</th>
                                            <th class="text-center">Next Assessment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        `+rows+`
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });

    console.log("✅ Risk UI rendering complete. Rendered categories:", 
        Object.keys(grouped).filter(cat => grouped[cat].risks.length > 0)
    );

    // Initialize all gauges after DOM insertion
    document.querySelectorAll(".gauge-wrapper").forEach((wrapper) => {
        const chartEl = wrapper.querySelector("[data-chart]");
        const needleEl = wrapper.querySelector("[data-needle]");
        const slider = wrapper.querySelector(".speedSlider");
        const defaultValue = parseInt(slider.value, 10) || 50;

        // Set gauge labels
        const gaugeLabels = wrapper.querySelector(".gauge-labels");
        if (gaugeLabels) {
            gaugeLabels.innerHTML = `
                <span class="label low">Low</span>
                <span class="label medium">Medium</span>
                <span class="label high">High</span>
            `;
        }

        // ApexChart config (background arc only)
        const options = {
            chart: {
                type: 'radialBar',
                height: 120,
                width: 120,
                sparkline: { enabled: true },
                offsetY: 0,
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    track: {
                        background: "rgba(238, 238, 238, 0.8)",
                        strokeWidth: '100%',
                    },
                    dataLabels: { show: false },
                    hollow: { size: '60%' }
                }
            },
            series: [100], // full background
            labels: ['Risk'],
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: "horizontal",
                    gradientToColors: ['#00FF00'],
                    stops: [0, 50, 100],
                    colorStops: [
                        { offset: 0, color: "#00DD44", opacity: 0.9 },
                        { offset: 30, color: "#88DD00", opacity: 0.9 },
                        { offset: 50, color: "#FFDD00", opacity: 0.9 },
                        { offset: 70, color: "#FF8800", opacity: 0.9 },
                        { offset: 100, color: "#FF4444", opacity: 0.9 }
                    ]
                }
            },
            stroke: {
                lineCap: "round",
                width: 8
            }
        };

        const chart = new ApexCharts(chartEl, options);
        chart.render();

        // Needle update logic
        const updateGauge = (val) => {
            const value = parseInt(val, 10);
            slider.value = value;
            const angle = -90 + (value * 180 / 100);
            needleEl.style.transform = `translateX(-50%) rotate(`+angle+`deg)`;
        };

        updateGauge(defaultValue);

        slider.addEventListener('input', (e) => {
            updateGauge(e.target.value);
        });

        // Optional: attach method for external use
        wrapper.updateGauge = updateGauge;
    });
}
</script>
    
	</body>