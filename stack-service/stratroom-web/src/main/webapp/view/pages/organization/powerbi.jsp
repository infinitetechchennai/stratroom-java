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
<link href="${contextroot}/css/frappe-gantt.css" rel="stylesheet">
<link href="${contextroot}/css/daterangepicker.min.css" rel="stylesheet">
<link rel="stylesheet" href="${contextroot}/css/datepickerair.css">
<link rel="stylesheet" href="${contextroot}/css/jquery-ui.min.css">
<link rel="stylesheet" href="${contextroot}/css/employee.css"
	rel="stylesheet" />
<link href="${contextroot}/css/select2.min.css" rel="stylesheet" />	
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
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

.dollar-line-clamp {
	display: -webkit-box;
	-webkit-line-clamp: 1;
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


#section#report-container {
    height: calc(0.8 * 60vw); /* 16:9 aspect ratio */
}

@media only screen and (max-width: 700px) {
    section#report-container {
        height: calc(0.5625 * 100vw); /* 16:9 aspect ratio */
    }
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
<input type="hidden" id="flagapplychart" value="flagapplychart">
	<input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
	<!-- Page Loader -->
	<jsp:include page="../common/top-navigation.jsp"></jsp:include>
	<!-- #Top Bar -->

	<input id="userdept" type="hidden" name="userdept" value="${userPrincipal.profile.department}">
	<div>
		<jsp:include page="../common/left-navigation.jsp"></jsp:include>
		<jsp:include page="../common/right-navigation.jsp"></jsp:include>
	
		<div class="page-header row no-gutters py-2 m-t-70">
			<div
				class="col-lg-6 col-md-6 text-center text-sm-left pt-2 mb-0 ml-4">
				<h5 class="page-title"
					style="font-weight: 600; text-transform: uppercase;">Power BI Report</h5>
			</div>
		</div>
		<section id="report-container" class="embed-container col-lg-offset-4 col-lg-12 col-md-offset-7 col-md-12 col-sm-offset-7 col-sm-12 mt-5"></section>
		
		<!-- Used to display report embed error message -->
		<section class="error-container m-5"></section>
	

	<!-- Plugins Js -->

	<script src="${contextroot}/js/app.min.js"></script>
	<script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
	<script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
	<!-- Custom Js -->
	<script src="${contextroot}/js/admin.js"></script>
	

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
	<script src="${contextroot}/js/select2.min.js"></script>
	<script src="${contextroot}/js/datepickerair.js"></script>
	<script src="${contextroot}/js/datepicker.en.js"></script>
	<script src="${contextroot}/js/select2.min.js"></script>
	<script src="${contextroot}/js/colors.js"></script>
	<script src="${contextroot}/js/shards.min.js"></script>
	<script src="${contextroot}/js/jquery.sharrre.min.js"></script>
	<script src="${contextroot}/js/chosen.jquery.min.js"></script>

	<script src="${contextroot}/js/notify.js"></script>
	<script src="${contextroot}/js/powerbi.min.js"></script>

	<script>
      

      

      $(document).ready(function () {

		models = window['powerbi-client'].models;
					
					reportContainer = $("#report-container").get(0);
					
					// Initialize iframe for embedding report
					powerbi.bootstrap(reportContainer, { type: "report" });
					
					// Request to get embed details
					$.ajax({
						type: "GET",
						url: "/stratroom/getembedinfo",
						dataType: "json",
						success: function (embedData) {
							reportLoadConfig = {
								type: "report",
								tokenType: models.TokenType.Embed,
								accessToken: embedData.embedToken,
								  
								// Use other embed report config based on the requirement. We have used the first one for demo purpose
								embedUrl: embedData.embedReports[0].embedUrl,
								/*
								// Enable this setting to remove gray shoulders from embedded report
								settings: {
									background: models.BackgroundType.Transparent
								}
								*/
							};
							
							// Use the token expiry to regenerate Embed token for seamless end user experience
							// Refer https://aka.ms/RefreshEmbedToken
							tokenExpiry = embedData["tokenExpiry"]
							const dropdownMenu = document.createElement('div');
							// code to style the dropdown menu
							document.body.appendChild(dropdownMenu);
							
							// Embed Power BI report when Access token and Embed URL are available
							report = powerbi.embed(reportContainer, reportLoadConfig);
							var customButton = {
									  name: 'Custom Button',
									  icon: 'https://your-icon-url.png',
									  action: function() {
										// Custom button action code goes here
										console.log('Custom button clicked');
									  }
									};
		
									report.setToolbar({
									  customToolbarItems: [customButton]
									});
							// Triggers when a report schema is successfully loaded
							report.on("loaded", function () {
								console.log("Report load successful");
							report.getPages().then( function (pages) {
										// inspect pages in browser console
										console.log(pages);
										// display specific page in report
									  for (const page of pages) {
											const visuals = page.getVisuals();
											console.log(visuals)
											visuals.then( function (vis) {
												for (const visual of vis) {
													const button = document.createElement('button');
													button.innerText = visual.title;
													button.addEventListener('click', function() {
														visual.focus();
													});
													dropdownMenu.appendChild(button);
												}
											});
									
									  }
									  });
							});
							 
							// Triggers when a report is successfully embedded in UI
							report.on("rendered", function () {
								var visual = report;
								  
								  console.log(visual)
								  // Use the visual object to capture the Y-axis label
								  // For example:
								  var yaxisLabel = visual.yaxisLabel;
								  
								  // Create a custom action that shows an alert with the Y-axis label
								  // For example:
								  var button = document.createElement("button");
								  button.innerText = "Create Alert";
								  button.addEventListener("click", function() {
									alert("Y-axis Label: " + yaxisLabel);
								  });
								  
								  // Add the button to the visual element
								  var visualElement = visual.element;
								  visualElement.appendChild(button);
								console.log("Report render successful");
							});
						
							
						
							// Clear any other error handler event
							report.off("error");
		
							// Below patch of code is for handling errors that occur during embedding
							report.on("error", function (event) {
								errorMsg = event.detail;
								
								// Use errorMsg variable to log error in any destination of choice
								console.error(errorMsg);
								return;
							});
						},
						error: function (err) {
							
							// Show error container
							$(".embed-container").hide();
							var errorContainer = $(".error-container");
							errorContainer.show();
							
							// Format error message
							var errMessageHtml = "<strong> Error Details: </strong> <br/>"
							errMessageHtml += err.responseText.split("\n").join("<br/>")
							
							// Show error message on UI
							errorContainer.html(errMessageHtml);
						}
					});

	  })
    </script>
</body>