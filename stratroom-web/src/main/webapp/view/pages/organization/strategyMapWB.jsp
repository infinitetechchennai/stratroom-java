<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta content="width=device-width, initial-scale=1" name="viewport" />
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
<link href="${contextroot}/css/daterangepicker.min.css" rel="stylesheet">
<link rel="stylesheet" href="${contextroot}/css/datepickerair.css">
<link rel="stylesheet" href="${contextroot}/css/jquery-ui.min.css">
<link rel="stylesheet" href="${contextroot}/css/employee.css"
	rel="stylesheet" />
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

	  .container-fluid >img{
        margin: 10px;
      }
</style>
</head>


<body class="light">
	<!-- Page Loader -->
	<jsp:include page="../common/top-navigation.jsp"></jsp:include>
	<!-- #Top Bar -->
	<input type="hidden" id="flagapplychart" value="flagapplychart">
	<input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
	<c:if test="${pageId != null}">
		<input id="pagenumber" type="hidden" name="pagenumber"
			value="<c:out value="${pageId}" />">
	</c:if>
	<div>
		<jsp:include page="../common/left-navigation.jsp"></jsp:include>
		<jsp:include page="../common/right-navigation.jsp"></jsp:include>
		<jsp:include page="modal/dashboardTextModal.jsp"></jsp:include>
		<jsp:include page="modal/dashboardChartModal.jsp"></jsp:include>
		<jsp:include page="modal/dashboardTableModal.jsp"></jsp:include>
		<!-- Color Palette -->
		<!-- Share Modal -->


		<!-- File Validate Form -->
 <div class="modal fade file_upload_popup" id="file-validate-form"
 tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
 aria-hidden="true">
 <div class="modal-dialog modal-dialog-centered modal-lg">
	 <div class="modal-content">
		 <div class="modal-header">
			 <h4 style="color: #fff;" data-i18n="File Upload">File Upload</h4>
			 <button type="button" class="close pull-right"
				 data-dismiss="modal" style="color: #fff;">&times;</button>
		 </div>
		 <div class="modal-body">

			 <input type="hidden" id="orgimportmethodtype">
			 <div class="row" id="file-upload">
				 <div class="col-md-12">

					 <div class="form-group">
						 <label class="control-label" style="font-size: 14px; font-weight: 600;">Upload File</label>
						 <div class="preview-zone hidden">
							 <div class="box box-solid">
								 <div class="box-body"></div>
							 </div>

						 </div>
						 <div class="dropzone-wrapper">
							 <div class="dropzone-desc">
								 <i class="fas fa-file-upload" style="font-size: 20px;"></i>
								 <p>Choose a file or drag it here.</p>
							 </div>
							 <input type="file" id="importfile" name="img_logo"
								 class="dropzone" accept="image/*" multiple/>
						 </div>
						 <span id="fileerrorshow" style="color: red; display: none"></span>
					 </div>
				 </div>
				 <div class="col-md-12" id="lineD">
					 <hr />
				 </div>
			 </div>

			 <div class="col-md-12">
				 <div class="form-line right" id="lineS">
					 <button class="initative_save_btn" id="next-btn-1"
						 style="font-weight: 600;">Upload</button>
				 </div>
			 </div>
		 </div>

		 

		 <div class="row" id="file-save" style="display: none;">
			 <div class="col-md-12">
				 <div class="col-md-12 img-center">
					 <img src="images/Success.png" alt="Verified" />
					
				 </div>
			 </div>
			 <div class="col-md-12">
				 <hr />
			 </div>
			 <div class="col-md-12">
				 <div class="form-line">
					 <button type="button" class="btn-default1 btn" id="prev-btn2"
						 style="font-weight: 600;">Previous</button>
					 <button class="initative_save_btn pull-right" id="done-btn"
						 style="font-weight: 600;" data-dismiss="modal"
						 aria-label="Close">Done</button>
				 </div>
			 </div>
		 </div>

	 </div>
 </div>
</div>
</div>
    

<section class="content">
	<div class="page-header row no-gutters py-2 m-t-70">
			<div
				class="col-lg-6 col-md-6 text-center text-sm-left pt-2 mb-0 ml-4">
				<h5 class="page-title"
					style="font-weight: 600; text-transform: uppercase;">Strategy Map</h5>
			</div>
		</div>
		<div class="row" style="padding-right: 14px; padding-bottom: 8px">
			<div class="col-md-9">
				<!--<h5 style="margin-top : -27px;"><span class="scorecardname"></span> <span
						id="scorecardstatusicon"></span></h5>-->
			</div>

			<div class="col-md-3 mt-2">
				
				<a href="#"
					style="float:right; padding: 0px;position: relative;overflow: hidden;display: inline-block;" class="scorecardimportviewicon">
					<button class="btn btn-custom-secondary pull-right" data-toggle="modal"
						data-target=".file_upload_popup" style="margin-left: 4px;">
						<i class="fas fa-download" data-placement="bottom" title="Import" data-toggle="tooltip"></i>
						<!-- <input type="file" accept=".xlsx, .xls, .csv" id="importscorescrd"
							style="position: absolute; left: 0; top: 0; opacity: 0; cursor: pointer;" /> -->
					</button>
				</a>
				<!--<input type="file" type="file" accept=".xlsx, .xls, .csv" id="importscorescrd" style="display: none;" />
              <button class="btn btn-custom-secondary pull-right" id="OpenImgUpload" style="margin-left: 4px;">
                	<i class="fas fa-upload"></i>
              </button>-->
				
				<button class="btn btn-custom-secondary pull-right scorecardexportlink" style="margin-left: 4px">
          			<a href="" style="color:#2e2e2e !important" target="_blank" class="exceldownloadlink">
            		<i style="font-size: 14px" class="fas fa-upload" data-toggle="tooltip" data-placement="bottom"title="Export"></i></a>
          		</button>
			
			  </div>
			</div>
		<div class="container-fluid" style="height: 600px; overflow-y: auto" id="imagesContainer"></div>>
		
		</div>
	</div>

	
	</section>

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
		src="${contextroot}/js/daterangepicker.min.js"></script>

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
	<script>
     $(document).ready(function () {
       
		function fetchImagesByPage(pagenumber) {
        $.get('/stratroom/downloadStrategyMap/images/' + pagenumber, function(data) {
            $('#imagesContainer').empty(); // clear previous images
			
			data.forEach(function(imageName) {
				$.get('/stratroom/downloadStrategyMap/imagesbyname/' + pagenumber + '?imageName=' + imageName, function(base64Image) {
					let imgSrc = "data:image/jpeg;base64," + base64Image;
					$('#imagesContainer').append('<img src="' + imgSrc + '" alt="Image" />');
				});
    });
		
        });
    }

	var pageNumberValue = $("#pagenumber").val();

        fetchImagesByPage(pageNumberValue);

		function removeFile() {
	$(".remove-preview").on("click", function () {
		var boxZone = $(this).parents(".preview-zone").find(".box-body");
		var previewZone = $(this).parents(".preview-zone");
		var dropzone = $(this).parents(".form-group").find(".dropzone");
		boxZone.empty();
		console.log("done");
		previewZone.addClass("hidden");
		reset(dropzone);
	});
}



$(document).on('click', '#next-btn-1', function() {
	$("#fileerrorshow").html("");
	$(".uploadvalidationSuccess").empty();		 
	$("#file-upload").hide();
	$("#lineS").hide();
	$("#lineD").hide();				
	$("#file-save").show();
	$(".form-progressbar li:nth-child(2)").addClass("active");
	var formdata = new FormData();
	$(".page-loader-wrapper").css("display", "block");
	var pageNumberValue = $("#pagenumber").val();

	var url	=	"/stratroom/uploadStrategyMap/"+ pageNumberValue;
		var file	=	$('input[name="img_logo"]')[0].files;
		for (var i = 0; i < file.length; i++) {
   		formdata.append("scoreCardData[]", file[i]);
		}
	
	
	if(file){								
		$.ajax({
			url: url,
			type: "POST",
			data: formdata,
			processData: false,
			contentType: false,
			success: function (data, status) {	
					$("#imagevalidate").attr("src","images/Success.png");		
					$("#file-validate").show();
					$(".page-loader-wrapper").css("display", "none");		
			},error:function(msg,status){
				$(this).val('');
				$(".page-loader-wrapper").css("display","none");
				if(!jQuery.isEmptyObject(msg.responseText)){
					var errorparse	=	JSON.parse(msg.responseText);
					if(errorparse.status 	==	"404"){
						$.notify("Error:"+errorparse.exception, {
								  style: 'error',
								  className: 'graynotify'
								});
					}else{
						$.notify("Error:"+errorparse.exception, {
								  style: 'error',
								  className: 'graynotify'
								});
					}
				}
			},
		});
			
	
	} else {
			$("#fileerrorshow").append('Please select upload file');
			$("#fileerrorshow").show();
			$(".page-loader-wrapper").css("display", "none");
			$("#file-upload").show();		
			$("#file-validate").hide();
			$("#file-save").hide();
			$(".form-progressbar li:nth-child(1)").removeClass("active");
			$(".form-progressbar li:nth-child(2)").removeClass("active");
			$("#lineS").show();
			$("#lineD").show();
	}
	
});





$(document).on('click', '#prev-btn1', function() {					
	$("#file-upload").show();				
	$("#file-validate").hide();
	$("#file-save").hide();
	$(".form-progressbar li:nth-child(2)").removeClass("active");
	$("#lineS").show();
	$("#lineD").show();
});




$(document).on('click', '#done-btn', function() {					
	location.reload(true);
});

$(document).on('click',".close",function () {
	$(".box-body").empty();
	$("#fileerrorshow").html("");
	$("#statisticmessage").html("");
	$("#categoryerrorshow").html("");
	$("#file-upload").show();			
	$("#file-validate").hide();
	$("#file-validate1").hide();
	$("#file-save").hide();
	$("#lineS").show();
	$("#lineD").show();
	$(".form-progressbar li:nth-child(1)").removeClass("active");
	$(".form-progressbar li:nth-child(2)").removeClass("active");
	$(".form-progressbar li:nth-child(3)").removeClass("active");
});
$('.modal-dialog').draggable({
    handle: ".modal-header"
});



      });


	  $('.scorecardexportlink').on('click', function() {
		var pageNumberValue = $("#pagenumber").val();

        var downloadUrl = "/stratroom/downloadStrategyMap/"+ pageNumberValue;; // Replace with your file's URL
        $('.exceldownloadlink').attr('href', downloadUrl);
        window.open(downloadUrl, '_blank'); // This line is optional, it will force the download if href is not working due to some reason.
    });


	
      
    </script>
</body>
