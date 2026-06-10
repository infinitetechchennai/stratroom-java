<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />
<a lang="en">
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
<link href="css/risk.css" rel="stylesheet" />
<link href="css/custom.css" rel="stylesheet" />
<link href="css/startroom/wedgets.css" rel="stylesheet" />
<!-- You can choose a theme from css/styles instead of get all themes -->
<link href="css/styles/all-themes.css" rel="stylesheet" />
<link href="css/bootstrap-popover-x.css" media="all" rel="stylesheet" />
<link href="css/circle.css" rel="stylesheet" />
<link href="${contextroot}/css/daterangepicker.min.css" rel="stylesheet"> 
<link rel="stylesheet" href="${contextroot}/css/datepickerair.css">
<link rel="stylesheet" href="css/jquery-ui.min.css">
<link rel="stylesheet" href="css/employee.css">
<link rel="stylesheet" href="css/fonts/fontawesome_v_5/font-awesome.min.css">
<link rel="stylesheet" href="css/fonts/fontawesome_v_5/all.css">
<script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>
<script type="text/javascript" src="${contextroot}/js/jquery/jquery.validate.min.js"></script>
<script type="text/javascript" src="${contextroot}/js/jquery/additional-methods.min.js"></script>
<link href="css/select2.min.css" rel="stylesheet" />
<link href="${contextroot}/css/jquery.contextMenu.min.css" rel="stylesheet">
<link href="${contextroot}/css/file-upload.css" rel="stylesheet">
<style>
.orientation-right {
        top: 60px !important;
        right: 0 !important;
        left: auto !important;
        position: fixed;
      }

.error-div{
	border:none !important;
}
      #notifications .row::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
      }

      .navbar-nav li a i:hover {
        color: gray !important;
      }
      .divbox{
  height: 200px;
  width: 200px;
  -webkit-box-shadow: 0 0 10px #fff;
        box-shadow: 0 0 10px #fff;
        border-radius: 10px !important;
      }
      .sicon{
  padding: 2px;
  font-size: 15px;
  width: 15px;
  text-align: center;
  color: rgb(48, 47, 47) !important;
  float: right !important;

   }

  .file{
  padding: 5px;
  font-size: 80px;
  width: 80px;
  text-align: center;
  text-decoration: none;
  margin-left: 30%;
      margin-top: 10%;
  color: green;
      }

      #myInput {
        padding: 1%;
  width: 100%;
  font-size: 16px;
  border: 1px solid #ddd;
}
p{
  font-size: 12px;
  text-align: center;
text-justify: none;
}
</style>
  </head>

  <body class="light">
  <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
		<jsp:include page="../common/top-navigation.jsp"></jsp:include>
		<input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
		<div>
			<jsp:include page="../common/left-navigation.jsp"></jsp:include>
			<jsp:include page="../common/right-navigation.jsp"></jsp:include>
		</div>

      <div class="modal fade file_upload_popup" id="file-validate-form"
			tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
			aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered modal-lg">
				<div class="modal-content">
					<div class="modal-header" style="height:45px !important;padding: 10px 16px 10px 16px !important;margin: -10px -10px 12px -10px !important;">
						<h4 style="color: #fff;" data-i18n="File Upload">File Upload</h4>
						<button type="button" class="close pull-right"
							data-dismiss="modal" style="color: #fff;">&times;</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-md-12">
								<ul class="form-progressbar">
									<li>Upload</li>
									<li>Validation</li>
									<li>Import</li>
								</ul>
							</div>
							<div class="col-md-12">
								<hr />
							</div>
						</div>
						<input type="hidden" id="orgimportmethodtype">
						<div class="row" id="file-upload">
							<div class="col-md-12">
								<div class="form-group">
									<label for="risk_rating"
										style="font-size: 14px; font-weight: 600;" > Import
										Category</label> <select id="uploadcategory" name="category"
										class="form-control browser-default" style="height:30px !important;">
										<option value="" data-i18n="Choose">Choose</option>
										<option value="Organisation">Organisation</option>
										<option value="Scorecard" data-i18n="Scorecard">Scorecard</option>
										<option value="Initiative & Projects" data-i18n="Initiatives & Projects">Initiatives & Projects</option>
										<option value="Risk" data-i18n="Risk">Risk</option>
										<option value="ProjectFormulation" data-i18n="Project Formulation">Project Formulation</option>
										<option value="RiskFormulation" data-i18n="Risk Formulation">Risk Formulation</option>
										<option value="StrategyFormulation">Strategy Formulation</option>
										<option value="UserRole">User</option>
										<!-- <option value="ETL">ETL</option> -->
									</select> <span id="categoryerrorshow" style="color: red; display: none"></span>
								</div>

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
											class="dropzone" accept=".xlsx, .xls, .csv" />
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
									style="font-weight: 600;">Next</button>
							</div>
						</div>
					</div>

					<div class="row" id="file-validate" style="display: none;">
						<div class="col-md-12 img-center">
							<img id="imagevalidate" src="images/Not-Verified.png"
								alt="Not-Verified" />
							<div class="error-div">

							</div>
						</div>
						<div class="col-md-12">
							<hr />
						</div>
						<div class="col-md-12">
							<div class="form-line" id="validatescoreCardImportHide">
							</div>
						</div>
					</div>

					<div class="row" id="file-save" style="display: none;">
						<div class="col-md-12">
							<div class="col-md-12 img-center">
								<img src="images/Success.png" alt="Verified" />
								<span id="statisticmessage" style="text-align: center; margin-left: 42% !important; color :green; width: 100%; margin-right: 25% !important;"></span>

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
	<section class="content">
		<div class="page-header row no-gutters py-2 m-t--70">
	       	<div class="col-lg-6 col-md-6 text-center text-sm-left pt-2 mb-0 ml-4">
	         		<h5 class="page-title" style="font-weight: 600; text-transform: uppercase" data-i18n="Excel Templates">
	           		Excel Templates
	         		</h5>
	       	</div>
	    </div>
	    <c:if test="${userPrincipal.profile.userRoleName == 'Super User'}">
		    <button class="btn btn-custom-secondary pull-right excelimport" style="margin-left: 4px; margin-top: 4px;" data-toggle="modal" data-target="#file-validate-form">
	      		<i style="font-size: 14px" class="fas fa-download" data-toggle="tooltip" data-placement="bottom" title="Import"></i>
	    	</button>
    	</c:if>
        
        <div class="pull-right">
          <div class="col-auto pr-0">
            <span id="search1" style="margin-right: -20px">
	            <button class="btn excelsearchbtn btn-custom-secondary pull-right" style="margin-left: 4px; margin-top: 4px;">
	    			<i class="fas fa-search" data-toggle="tooltip" data-placement="bottom" title="Search" ></i>
	    		</button>
            </span>
            <span class="pull-right search-section" style="margin-right: 5px;margin-top:2px; display: none" id="search_section1">
              <input type="text" class="search templatesearch" placeholder="Search" style="background-color: #fff; height: 40px !important; margin-top: 1px !important;" />
              <i class="fas fa-search" style="margin-top: 15px;"></i>
              <i class="fas fa-times" id="close_search1" style="margin-top: 15px;"></i>
            </span>
          </div>
        </div>
		<br />
		<!-- File Validate Form -->

	
     <div class="container-fluid">
        <div class="col-lg-12 row exceltemplatecontent" style="margin-left: 4%;">
        
          <!-- <div class="col-lg-3">
            <div class="card divbox">
            
              <div class="card-body">
                <i class="fas fa-save sicon" data-toggle="tooltip"
                data-placement="bottom"
                title="Save"></i>
                <i class="fas fa-file-excel file"></i>
                <br /><br />
              <p>Organogram</p>
              </div>
            </div>
          </div>
        
          <div class="col-lg-3">
            <div class="card divbox">
           
              <div class="card-body">
                 <i class="fas fa-save sicon"
                 data-toggle="tooltip"
        data-placement="bottom"
        title="Save"></i>
                <i class="fas fa-file-excel file"></i>
                <br /><br />
              <p>Initiative/ Project</p>
              </div>
            </div>
          </div>
        
          <div class="col-lg-3">
            <div class="card divbox">
              
              <div class="card-body">
                <i class="fas fa-save sicon"
                data-toggle="tooltip"
        data-placement="bottom"
        title="Save"></i>
                <i class="fas fa-file-excel file"></i>
                <br /><br />
                <p>Risk</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="card divbox">
              
              <div class="card-body">
                 <i class="fas fa-save sicon"
                 data-toggle="tooltip"
        data-placement="bottom"
        title="Save"></i>
                <i class="fas fa-file-excel file"></i>
                <br /><br />
              <p>Strategy Formulation</p>
              </div>
            </div>
          </div> --> 
        </div>
	</div>
	<!-- END File Validate Form -->      
      
      </section>
      <!-- Plugins Js -->
      <script src="js/app.min.js"></script>
      <!-- Custom Js -->
      <script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
	  <script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
      <script src="js/admin.js"></script>
      <script src="js/file-preview.js"></script>
      <script type="text/javascript" src="${contextroot}/js/knockout-3.5.0.js"></script>
	  <script type="text/javascript" src="${contextroot}/js/daterangepicker.min.js"></script>
      <!-- Knob Js -->
      <script src="js/jquery-ui.min.js"></script>
      <script src="js/moment.js"></script>
      <script src="js/pages/animated.js"></script>
      <script src="js/jquery.editable.min.js"></script>
      <script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
      <script src="js/jquery-resize.js"></script>
      <script src="js/datepickerair.js"></script>
      <script src="js/datepicker.en.js"></script>
      <script src="${contextroot}/js/widgets.js"></script>
      <script src="js/exceltemplate.js"></script>
      <script src="${contextroot}/js/notify.js"></script>
      <script src="js/initial.js"></script>
      <script>
	
		console.log(initiativePermission)
		console.log(scorecardPermission)

		
			

	
		$(document).on("change", "#importorgstructure", function (e) {
			e.preventDefault();
			var formdata = new FormData();
			if ($(this).prop('files').length > 0) {
				file = $(this).prop('files')[0];
				formdata.append("employeedata", file);
			}
			$(".page-loader-wrapper").css("display", "block");
			$.ajax({
				url: "/stratroom/createBulkEmployee",
				type: "POST",
				data: formdata,
				processData: false,
				contentType: false,
				success: function (data, status) {
					$(this).val('');
					location.reload(true);
					$(".page-loader-wrapper").css("display", "none");
					$.notify(data,{
							  style: 'success',
							  className: 'graynotify'
							});
				},
				error: function (msg, status) {
					$(this).val('');
					$(".page-loader-wrapper").css("display", "none");
					if (!jQuery.isEmptyObject(msg.responseText)) {
						var errorparse = JSON.parse(msg.responseText);
						if (errorparse.status == "404") {
							$.notify("Error:" + errorparse.exception, {
							  style: 'error',
							  className: 'graynotify'
							});
						} else {
							$.notify("Error:" + errorparse.exception, {
							  style: 'error',
							  className: 'graynotify'
							});
						}
					}
				}
			});

		});
		$(document).on("change", "#importfile", function (e) {
			e.preventDefault();
			$("#categoryerror").css("display", "none");
			$("#uploaderror").css("display", "none");

			var category = $("#category").val();
			if (category == "") {
				$("#categoryerror").css("display", "block");
				return false;
			}
			var formdata = new FormData();
			var url = "";
			var element = $("#importfile");
			if (category == "Organisation Import") {
				url = "/stratroom/createBulkEmployee";
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					formdata.append("employeedata", file);
				}
			} else if (category == "Initiative Import") {
				url = "/stratroom/importBulkInitiativesDetails";
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					formdata.append("initiativeData", file);
				}
			} else if (category == "Scorecard Import") {
				url = "/stratroom/saveScoreCardDetails";
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					formdata.append("scoreCardData", file);
				}
			}

			if (element.prop('files').length == 0) {
				$("#uploaderror").css("display", "block");
				return false;
			}
			$(".page-loader-wrapper").css("display", "block");
			$.ajax({
				url: url,
				type: "POST",
				data: formdata,
				processData: false,
				contentType: false,
				success: function (data, status) {
					$(".fileuploadclose").trigger('click');
					$(".page-loader-wrapper").css("display", "none");
					$.notify(data.result,{
							  style: 'success',
							  className: 'graynotify'
							});
					setTimeout(function () {
						location.reload(true);
					}, 3000);

				},
				error: function (msg, status) {
					$(".fileuploadclose").trigger('click');
					$(".page-loader-wrapper").css("display", "none");
					if (!jQuery.isEmptyObject(msg.responseText)) {
						var errorparse = JSON.parse(msg.responseText);
						if (errorparse.status == "404") {
							$.notify("Error:" + errorparse.exception, {
							  style: 'error',
							  className: 'graynotify'
							});
						} else {
							$.notify("Error:" + errorparse.exception,{
							  style: 'error',
							  className: 'graynotify'
							});
						}
					}
				}
			});

		});

		$(document).on("change", "#category", function (e) {
			e.preventDefault();
			$("#categoryerror").css("display", "none");
			$("#uploaderror").css("display", "none");

			var category = $("#category").val();
			if (category == "") {
				$("#categoryerror").css("display", "block");
				return false;
			}
			var formdata = new FormData();
			var url = "";
			var element = $("#importfile");
			if (category == "Organisation Import") {
				url = "/stratroom/createBulkEmployee";
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					formdata.append("employeedata", file);
				}
			} else if (category == "Initiative Import") {
				url = "/stratroom/importBulkInitiativesDetails";
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					formdata.append("initiativeData", file);
				}
			} else if (category == "Scorecard Import") {
				url = "/stratroom/saveScoreCardDetails";
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					formdata.append("scoreCardData", file);
				}
			}

			if (element.prop('files').length == 0) {
				$("#uploaderror").css("display", "block");
				return false;
			}

			$(".page-loader-wrapper").css("display", "block");
			$.ajax({
				url: url,
				type: "POST",
				data: formdata,
				processData: false,
				contentType: false,
				success: function (data, status) {
					$(".fileuploadclose").trigger('click');
					$(".page-loader-wrapper").css("display", "none");
					$.notify(data,{
							  style: 'success',
							  className: 'graynotify'
							});
					setTimeout(function () {
						location.reload(true);
					}, 3000);

				},
				error: function (msg, status) {
					$(".fileuploadclose").trigger('click');
					$(".page-loader-wrapper").css("display", "none");
					if (!jQuery.isEmptyObject(msg.responseText)) {
						var errorparse = JSON.parse(msg.responseText);
						if (errorparse.status == "404") {
							$.notify("Error:" + errorparse.exception, {
							  style: 'error',
							  className: 'graynotify'
							});
						} else {
							$.notify("Error:" + errorparse.exception, {
							  style: 'error',
							  className: 'graynotify'
							});
						}
					}
				}
			});

		});


		$(".orgimportbtn").click(function () {
			$("#importfile").val('');
			$("#uploadcategory").val('');
		});

		$(".fileuploadclose").click(function () {
			$("#importfile").val('');
			$('.file_upload_popup').modal('toggle');
		});

		$('.file_upload_popup').modal({ show: false, backdrop: 'static', keyboard: false });




		var file;

		function readFile(input) {
			if (input.files && input.files[0]) {
				var reader = new FileReader();
				file = input.files[0];
				reader.onload = function () {
					var htmlPreview =
						'<div class="box-body-border">' +
						'<img width="20" src="images/file-icon.png"/>' +
						"<span>" + input.files[0].name + "</span>" +
						"<span><i class='fa fa-times remove-preview'></i></span>" +
						"</div>";
					var wrapperZone = $(input).parent();
					var previewZone = $(input).parent().parent().find(".preview-zone");
					var boxZone = $(input)
						.parent()
						.parent()
						.find(".preview-zone")
						.find(".box")
						.find(".box-body");
					wrapperZone.removeClass("dragover");
					previewZone.removeClass("hidden");
					boxZone.empty();
					boxZone.append(htmlPreview);
					removeFile();
				};
				reader.readAsDataURL(input.files[0]);
			}
			$(".form-progressbar li:nth-child(1)").addClass("active");
			$("#fileerrorshow").html("");
		}

		function reset(e) {
			e.wrap("<form>").closest("form").get(0).reset();
			e.unwrap();
		}

		$(".dropzone").change(function () {
			readFile(this);
		});

		$(".dropzone-wrapper").on("dragover", function (e) {
			e.preventDefault();
			e.stopPropagation();
			$(this).addClass("dragover");
		});

		$(".dropzone-wrapper").on("dragleave", function (e) {
			e.preventDefault();
			e.stopPropagation();
			$(this).removeClass("dragover");
		});

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
		
		var category ='';
		$(document).on('click', '#next-btn-1', function() {		
			$("#categoryerrorshow").html("");
			$("#fileerrorshow").html("");
			$(".uploadvalidationSuccess").empty();
			 category = $("#uploadcategory").val();		 
			var Url ='';
			$("#file-upload").hide();
			$("#lineS").hide();
			$("#lineD").hide();
			$("#file-save").hide();
			$(".form-progressbar li:nth-child(2)").addClass("active");
			var formdata = new FormData();
			$(".page-loader-wrapper").css("display", "block");
			formdata.append("templateFile", file);
			formdata.append("templateType", category);
			formdata.append("type", "validation");
			Url = "/stratroom/uploadTemplateFile";
			
			if(category && file){								
				$.ajax({
					url: Url,
					type: "POST",
					data: formdata,
					processData: false,
					contentType: false,
					success: function (data, status) {			
						initiativeUploadNotFoundData(data,data.parsingError);
						$(".page-loader-wrapper").css("display", "none");		
					},error:function(msg,status){
						$(this).val('');
						$("#file-validate").show();
						$("#imagevalidate").attr("src","images/Not-Verified.png");
						validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
						'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
						$("#validatescoreCardImportHide").empty();
						$("#validatescoreCardImportHide").append(validateImport);
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
				if(category != ''){
					$("#categoryerrorshow").hide();
					$("#fileerrorshow").append('Please select upload file');
					$("#fileerrorshow").show();
					$(".page-loader-wrapper").css("display", "none");
					$("#file-upload").show();		
					$("#file-validate").hide();
					$("#file-validate1").hide();
					$("#file-save").hide();
					$(".form-progressbar li:nth-child(1)").removeClass("active");
					$(".form-progressbar li:nth-child(2)").removeClass("active");
					$("#lineS").show();
					$("#lineD").show();
				}else{
					$("#fileerrorshow").hide();
					$("#categoryerrorshow").append('Kindly select category to upload a file');
					$("#categoryerrorshow").show();
					$(".page-loader-wrapper").css("display", "none");
					$("#file-upload").show();		
					$("#file-validate").hide();
					$("#file-validate1").hide();
					$("#file-save").hide();
					$(".form-progressbar li:nth-child(1)").removeClass("active");
					$(".form-progressbar li:nth-child(2)").removeClass("active");
					$("#lineS").show();
					$("#lineD").show();
				}
			}
		});		
		
		$(document).on('click', '#next-btn-2', function() {	
			$(".uploadStatististics").empty();
			$("#file-upload").hide();		
			$("#file-validate").hide();
			$("#file-validate1").hide();
			$("#file-save").show();
			$(".form-progressbar li:nth-child(3)").addClass("active");
			var formdata = new FormData();
			var url = "";
			var category = $("#uploadcategory").val();
			$(".page-loader-wrapper").css("display", "block");
			formdata.append("templateFile", file);
			formdata.append("templateType", category);
			formdata.append("type", "save");
			url = "/stratroom/uploadTemplateFile";
			$.ajax({
				url:url ,
				type: "POST",
				data: formdata,
				processData: false,
				contentType: false,
				success: function (data, status) {
					$(".page-loader-wrapper").css("display", "none");
					initiativeUploadSuccess(data);
				},
			});
		});

		
		$(document).on('click', '#prev-btn1', function() {					
			$("#file-upload").show();
			if (category == "Organisation Import"){				
				$("#file-validate").hide();				
			} else if (category == "Initiative Import" || category == "Scorecard Import") {				
				$("#file-validate1").hide();
			} else {
				$("#file-validate").hide();
			}	
			$("#file-save").hide();
			$(".form-progressbar li:nth-child(2)").removeClass("active");
			$("#lineS").show();
			$("#lineD").show();
		});
		
		
		$(document).on('click', '#prev-btn2', function() {		
			$(".uploadStatististics").empty();
			$("#statisticmessage").html("");
			$("#file-upload").hide();
			if (category == "Organisation"){				
				$("#file-validate").show();
				$(".error-div").hide();
				$("#imagevalidate1").attr("src","images/Success.png");
			} else if (category == "Initiative & Projects" || category == "Scorecard") {				
				$("#file-validate1").show();
				$(".error-div").hide();
				$("#imagevalidate").attr("src","images/Success.png");
			} else {
				$("#file-validate").show();
				$(".error-div").hide();
				$("#imagevalidate1").attr("src","images/Success.png");
			}			
			$("#file-save").hide();
			$(".form-progressbar li:nth-child(3)").removeClass("active");
		});
		
		function initiativeUploadNotFoundData(data,result) {
			var initiative_import_error;
			var validateImport;
			$("#validatescoreCardImportHide").empty();
			$("#file-validate").show();
			$(".error-div").text('');
			if(data !=	"Success"){
				$("#imagevalidate").attr("src","images/Not-Verified.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
				$(".error-div").html('<center>'+data+'</center>');
			}
			if(data == "Success"){
				$(".error-div").hide();
				$("#imagevalidate").attr("src","images/Success.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';
			}
			
			/*$.each(result, function (i, List) {
				initiative_import_error = '<tr>' +
					'<td style="width: 150px; text-align: center;">' + List.Excel_SheetName + '</td>' +			
					'<td style="width: 150px; text-align: center;">' + List.rowNo + '</td>' +
					'<td style="width: 150px; text-align: center;">' + (List.highLightcellName !=	undefined?List.highLightcellName:"")+ '</td>' +
					'<td style="width: 250px; text-align: center;">' + List.error + '</td>' +
					'</tr>';
				$(".uploadvalidationSuccess").append(initiative_import_error);
			});*/
			
			$("#validatescoreCardImportHide").append(validateImport);
			$("#file-upload").hide();		
			
		}
		function initiativeUploadSuccess(data) {
			$(".error-div").show();
			$("#imagevalidate").attr("src","images/Success.png");
			//$("#statisticmessage").append('Import Successful');		
		}

		$(document).on('click', '#done-btn', function() {					
			location.reload(true);
		});
		
		$(document).on('click',".close",function () {
			$(".box-body").empty();
			$("#uploadcategory").val("");
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
		
		  	$('[data-toggle="tooltip"]').attr("data-placement","bottom");
		  	$('[data-toggle="tooltip"]').tooltip({ 
	            delay: { "show": 0, "hide": 0 } 
	   		}); 
		  	
		  	$(document).ready(function(){
		  		$(".exceltemplatesmenu a").removeClass('toggled');
		  	});
		  	
	</script>
  </body>
