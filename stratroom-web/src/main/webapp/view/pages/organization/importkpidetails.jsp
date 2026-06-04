<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />


	<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta content="width=device-width, initial-scale=1" name="viewport" />
<title>StratRoom</title>
<!-- Favicon-->
<!-- <link rel="icon" href="images/favicon.ico" type="image/x-icon"> -->
<!-- Plugins Core Css -->
<link href="css/app.min.css" rel="stylesheet">
<!-- Custom Css -->
<link href="css/style.css" rel="stylesheet" />
<link href="css/startroom/wedgets.css" rel="stylesheet" />
<!-- You can choose a theme from css/styles instead of get all themes -->
<link href="css/styles/all-themes.css" rel="stylesheet" />
<link href="css/table-view.css" rel="stylesheet" />
<link rel="stylesheet" href="css/daterangepicker.css">
<link rel="stylesheet" href="css/jquery-ui.min.css">
<link href="${contextroot}/css/jquery.contextMenu.min.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery.min.js"></script>

<!-- <link href="daterangepicker/daterangepicker.min.css" rel="stylesheet"> -->


	</head>

	<body class="light">

			<jsp:include page="../common/top-navigation.jsp"></jsp:include>
		<!-- #Top Bar -->
		<div>
			<jsp:include page="../common/left-navigation.jsp"></jsp:include>
			<jsp:include page="../common/right-navigation.jsp"></jsp:include>
		</div>
			<section class="content">
				<div class="container-fluid">
					<div class="m-t--50">
						<div aria-label="breadcrumb">
							<ol class="breadcrumb mb_bcrumb">
								<li class="breadcrumb-item"><a href="#">Import Data</a></li>
							</ol>
						</div>
						<hr>
					</div>
					<div class="row">
						<div class="col-lg-12 col-md-12 import_kpi]">
							<div class="card">
								<div class="header d-flex flex-row">
									<h5 class="prob d-flex flex-fill">
										<strong>Import Kpi / Element</strong>
									</h5>
								</div>
							<form id="nodeForm"   name="nodeForm" method="post" action="saveKpiDetails" enctype="multipart/form-data">
                            <div class="form-row">
								<div class="form-group col-md-6" id="file_wrapper">
									<label for="id"  class="left">Select File</label>
									<input type="file" class="form-control browser-default" name="nodeData" id="nodeData" />  
								</div>
								</div>
								<div class="form-line right">
								<input type="submit" value="Import" name="Import" class="smallButton" />
							</div>
                        </form>
							</div>
						</div>
					</div>
				<div>
				<c:if test="${uploadSuccess != null}">
				<script type="text/javascript"></script>
					<strong><c:out value="${uploadSuccess}" /></strong>
				</c:if>
			</div>
				</div>
				<div>
				<div id="target">
					<img src="images/KPIWeb.PNG">
				</div>
				<div id="target2">
					<img src="images/kpipage.PNG">
				</div>
				</div>
			</section>
		</div>
		<!-- Plugins Js -->
		<script src="js/app.min.js"></script>
		<script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
		<script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
		<!-- Custom Js -->
		<script src="js/admin.js"></script>
		<script src="js/bundles/amcharts4/core.js"></script>
		<script src="js/bundles/amcharts4/charts.js"></script>
		<script src="js/bundles/amcharts4/animated.js"></script>
		<script src="js/pages/dashboard/dashboard3.js"></script>
		<!-- Knob Js -->
		<script src="js/pages/todo/todo.js"></script>
		<script src="js/bundles/datamaps/d3.min.js"></script>
		<script src="js/bundles/datamaps/topojson.min.js"></script>
		<script src="js/bundles/datamaps/datamaps.world.min.js"></script>
		<script src="js/pages/maps/datamap.js"></script>
		<script src="js/knockout-3.5.0.js"></script>
		<script src="js/jquery-ui.min.js"></script>
		<script src="js/moment.js"></script>
		<script src="${contextroot}/js/notify.js"></script>
		<script src="js/daterangepicker.min.js"></script>
		<script src="js/jscolor.js"></script>
		<script src="js/widgets.js"></script>
		<!-- <script src="daterangepicker/daterangepicker.min.js"></script> -->
		<script>
		$('.modal-dialog').draggable({
            handle: ".modal-header"
        });
        
        </script>
	</body>