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
  </head>

  <body class="light">
  <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
		<jsp:include page="../common/top-navigation.jsp"></jsp:include>
		<div>
			<jsp:include page="../common/left-navigation.jsp"></jsp:include>
			<jsp:include page="../common/right-navigation.jsp"></jsp:include>
		</div>

      
	<section class="content">
		<div class="page-header row no-gutters py-2 m-t--70">
	       	<div class="col-lg-6 col-md-6 text-center text-sm-left pt-2 mb-0 ml-4">
	         		<h5 class="page-title" style="font-weight: 600; text-transform: uppercase" data-i18n="Excel Upload">
	           		Excel Upload
	         		</h5>
	       	</div>
	    </div>
		<br />
		<!-- File Validate Form -->

	<div class="container-fluid">
        <div class="row" id="file-validate-form" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        	<div class="col-lg-12">
          		<div class="modal-content">
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

						<div class="row" id="file-upload">
							<div class="col-md-12">
								<div class="form-group">
									<label for="risk_rating"
										style="font-size: 14px; font-weight: 600;"> Import
										Category</label> <select id="uploadcategory" name="category"
										class="form-control browser-default" style="height:30px !important;">
										<option value="" data-i18n="Choose">Choose</option>
										<option value="Organisation Import">Organisation</option>
										<option value="ETLUpload" data-i18n="Data Upload">Data Upload</option>
										<option value="XLSUpload" data-i18n="Excel File Upload">Excel File Upload</option>
										<option value="Scorecard Import" data-i18n="Scorecard">Scorecard</option>
										<option value="Initiative Import" data-i18n="Initiatives & Projects">Initiatives & Projects</option>
										<option value="Risk Import" data-i18n="Risk">Risk</option>
										<option value="User">User</option>
										<option value="Project Formulation" data-i18n="Project Formulation">Project Formulation</option>
										<option value="Risk Formulation" data-i18n="Risk Formulation">Risk Formulation</option>
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
					

					<div class="row" id="file-validate" style="display: none;">
						<div class="col-md-12 img-center">
							<img id="imagevalidate1" src="images/Not-Verified.png"
								alt="Not-Verified" />
							<div class="error-div">
								<table class="error-table">
									<thead>
										<tr>
											<th style="width: 200px; text-align: center;">Row-Number</th>
											<th style="width: 300px; text-align: center;">HighLighted
												CellName</th>
											<th style="width: 300px; text-align: center;">Error
												Reason</th>
										</tr>

									</thead>
									<tbody class="uploadvalidationSuccess">
									</tbody>
								</table>
							</div>
						</div>
						<div class="col-md-12">
							<hr />
						</div>
						<div class="col-md-12">
							<div class="form-line" id="validateImportHide">
							
							</div>
						</div>
					</div>


					<div class="row" id="file-validate1" style="display: none;">
						<div class="col-md-12 img-center">
							<img id="imagevalidate" src="images/Not-Verified.png"
								alt="Not-Verified" />
							<div class="error-div">
								<table class="error-table">
									<thead>
										<tr>
											<th style="width: 150px; text-align: center;">SheetName</th>
											<th style="width: 150px; text-align: center;">Row-Number</th>
											<th style="width: 150px; text-align: center;">CellName</th>
											<th style="width: 250px; text-align: center;">Reason</th>
										</tr>
									</thead>
									<tbody class="uploadvalidationSuccess">
			
									</tbody>
								</table>
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
								<div class="error-div">
									<table class="error-table">
										<thead>
											<tr>
												<th style="width: 150px; text-align: left;">
													Statististics</th>
												<th style="text-align: center;">Message</th>
											</tr>

										</thead>
										<tbody class="uploadStatististics">
										</tbody>
									</table>
								</div>
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
      <script src="${contextroot}/js/notify.js"></script>
      <script src="js/initial.js"></script>
      <script>
      
      
      $(document).ready(function(){

    	  if($("#userrolename").val()	==	"Super User" || $("#userrolename").val()	==	"Admin"){
    			if($("#userPrincipal").val()	!= $("#userPrincipalnavigate").val()){
    				//$(".subusermenuname").text('Excel Upload');
    				$(".orgtracker").addClass("homepageHighlight");
    				if($(".topmenubreadcrumb").length){
    					$(".topmenubreadcrumb").show();
    				}
    				if($(".sidebarNavigate").length){
    					$(".sidebarNavigate").show();
    				}
    			}
    		}

			if(jQuery.inArray("Create", initiativePermission) == -1){
				$("#uploadcategory option[value='Initiative Import']").remove()
			}

			if(jQuery.inArray("Create", projectforPermission) == -1){
				$("#uploadcategory option[value='Project Formulation']").remove()
			}

			if(jQuery.inArray("Create", riskforPermission) == -1){
				$("#uploadcategory option[value='Risk Formulation']").remove()
			}

			if(jQuery.inArray("Create", riskPermission) == -1){
				$("#uploadcategory option[value='Risk Import']").remove()
			}

			if(jQuery.inArray("Create", scorecardPermission) == -1){
				$("#uploadcategory option[value='Scorecard Import']").remove()
			}


    	  
  		var implementationtypemethod	=	false;
  		if((controlpanelgeneralsiteSettings.implementation !=	null && controlpanelgeneralsiteSettings.implementation !=	undefined) && (controlpanelgeneralsiteSettings.implementationType !=	null && controlpanelgeneralsiteSettings.implementationType !=	undefined)){
    			if(controlpanelgeneralsiteSettings.implementationType	==	"Department"){
  	    		implementationtypemethod	=	true
  	    	}
      	}
	  	$("#datasourcesubmenu li a").each(function(){
			$(this).removeClass("toggled");
		});
      
	  	
	
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
				url = (implementationtypemethod?"/stratroom/createBulkDeptMapping":"/stratroom/createBulkEmployee");
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					if(implementationtypemethod){
						formdata.append("deptdata", file);	
					}else{
						formdata.append("employeedata", file);
					}
					
				}
			} else if (category == "Initiative Import") {
				url = "/stratroom/importBulkInitiativesDetails";
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					formdata.append("initiativeData", file);
				}
			} else if (category == "Risk Import") {
				url = "/stratroom/saveBulkRiskDetails";
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					formdata.append("riskData", file);
				}
			}else if (category == "Project Formulation") {
				url = "/stratroom/import/projectFormulation";
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					formdata.append("projectFormulationData", file);
				}
			}else if (category == "Risk Formulation") {
				url = "/stratroom/import/riskFormulation";
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					formdata.append("riskFormulationData", file);
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
            } else if (category == "Risk Import") {
				url = "/stratroom/saveBulkRiskDetails";
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					formdata.append("riskData", file);
				}
			}else if (category == "Project Formulation") {
				url = "/stratroom/import/projectFormulation";
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					formdata.append("projectFormulationData", file);
				}
			}else if (category == "Risk Formulation") {
				url = "/stratroom/import/riskFormulation";
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					formdata.append("riskFormulationData", file);
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
			if (category == "Organisation Import"){				
				$("#file-validate").show();
			} else if (category == "Initiative Import" || category == "Risk Import" || category == "Scorecard Import" || category == "Project Formulation" || category == "Risk Formulation") {				
				$("#file-validate1").show();
			} else if(category == "XLSUpload") {

				$(".uploadStatististics").empty();
			$("#file-upload").hide();		
			$("#file-validate").hide();
			$("#file-validate1").hide();
			$("#file-save").show();
			$(".form-progressbar li:nth-child(3)").addClass("active");
			var category = $("#uploadcategory").val();
			}else{
				$("#file-validate").show();
			}
			if(category != "XLSUpload")
			{
			$("#file-save").hide();
			$(".form-progressbar li:nth-child(2)").addClass("active");
			}
			var formdata = new FormData();
			$(".page-loader-wrapper").css("display", "block");
			
			if (category == "ETLUpload") {
				formdata.append("etlFile", file);	
				Url = "/stratroom/uploadETLFile?type=validation";			
			}else if (category == "Initiative Import") {
				formdata.append("initiativeData", file);	
				Url = "/stratroom/importBulkInitiativesDetails?type=validation";
			}else if (category == "Risk Import") {
				formdata.append("riskData", file);	
				Url = "/stratroom/saveBulkRiskDetails?type=validation";				
			} else if (category == "Scorecard Import") {
				formdata.append("scoreCardData", file);	
				Url = "/stratroom/saveScoreCardDetails?type=validation";				
			}  else if (category == "Organisation Import") {
				if(implementationtypemethod){
					formdata.append("deptdata", file);	
				}else{
					formdata.append("employeedata", file);
				}
				Url = (implementationtypemethod?"/stratroom/createBulkDeptMapping?type=validation":"/stratroom/createBulkEmployee?type=validation");
			}else if (category == "XLSUpload") {
				formdata.append("xlsfile", file);	
				Url = "/stratroom/uploadXLFile?type=save";
			} else if (category == "User") {
				formdata.append("userdata", file);	
				Url = "/stratroom/createBulkUser?type=validation";
			}else if (category == "Project Formulation") {
				formdata.append("projectFormulationData", file);	
				Url = "/stratroom/import/projectFormulation?type=validation";
			}else if (category == "Risk Formulation") {
				formdata.append("riskFormulationData", file);	
				Url = "/stratroom/import/riskFormulation?type=validation";
			} 
			if(category && file){
				
					if(category == "XLSUpload"  || category == "ETLUpload" || category == "Initiative Import" || category == "Risk Import" || category == "Scorecard Import" || category == "Organisation Import" || category == "User" || category == "Project Formulation" || category == "Risk Formulation"){								
						$.ajax({
							url: Url,
							type: "POST",
							data: formdata,
							processData: false,
							contentType: false,
							success: function (data, status) {				
								if (category == "Initiative Import" || category == "Risk Import" || category == "Project Formulation" || category == "Risk Formulation") {
									initiativeUploadNotFoundData(data,data.parsingError);
								} else if (category == "Scorecard Import") {
									scorecardUploadNotFoundData(data,data.parsingError);
								} else if (category == "Organisation Import"){
									orgStructureUploadNotFoundData(data,data.parsingError);
								}else if (category == "ETLUpload"){
									EtlUploadNotFoundData(data,data.parsingError);
								}else if (category == "XLSUpload"){
									UploadXlsSuccess();
									//XLSUploadNotFoundData(data,data.parsingError);
								}else if (category == "User"){
									UserUploadNotFoundData(data,data.parsingError);
								}
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
					}else{				
						window.location.reload();
					}
					
			
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
			if (category == "ETLUpload") {
				formdata.append("etlFile", file);	
				url = "/stratroom/uploadETLFile?type=save";
			}else if (category == "XLSUpload") {
				formdata.append("xlsfile", file);	
				url = "/stratroom/uploadXLFile?type=save";
			}else if (category == "Initiative Import") {
				formdata.append("initiativeData", file);	
				url = "/stratroom/importBulkInitiativesDetails?type=save";
			}else if (category == "Risk Import") {
				formdata.append("riskData", file);	
				url = "/stratroom/saveBulkRiskDetails?type=save";				
			} else if (category == "Scorecard Import") {
				formdata.append("scoreCardData", file);	
				url = "/stratroom/saveScoreCardDetails?type=save";				
			} else if (category == "User") {
				formdata.append("userdata", file);	
				url = "/stratroom/createBulkUser?type=save";
			} else if (category == "Project Formulation") {
				formdata.append("projectFormulationData", file);	
				url = "/stratroom/import/projectFormulation?type=save";
			} else if (category == "Risk Formulation") {
				formdata.append("riskFormulationData", file);	
				url = "/stratroom/import/riskFormulation?type=save";
			} else {
				if(implementationtypemethod){
					formdata.append("deptdata", file);	
				}else{
					formdata.append("employeedata", file);
				}
				url = (implementationtypemethod?"/stratroom/createBulkDeptMapping?type=save":"/stratroom/createBulkEmployee?type=save");
			}
						
				$.ajax({
					url:url ,
					type: "POST",
					data: formdata,
					processData: false,
					contentType: false,
					success: function (data, status) {
						
						$(".page-loader-wrapper").css("display", "none");
						if (category == "Initiative Import" || category == "Project Formulation" || category == "Risk Formulation") {
							initiativeUploadSuccess(data);	
						} else if (category == "Risk Import") {
							riskUploadSuccess(data);		
						} else if (category == "Scorecard Import") {
							scorecardUploadSuccess(data);			
						} else if (category == "Organisation Import") {
							UploadSuccess(data);
						} else if (category == "User") {
							UploadSuccess(data);
						} else if (category == "ETLUpload") {
							UploadEtlSuccess();
						}else if (category == "XLSUpload") {
							UploadXlsSuccess();
						}
						
					},
				});
		});

		
		$(document).on('click', '#prev-btn1', function() {					
			$("#file-upload").show();
			if (category == "Organisation Import"){				
				$("#file-validate").hide();				
			} else if (category == "Initiative Import" || category == "Risk Import" || category == "Scorecard Import" || category == "Project Formulation" || category == "Risk Formulation") {				
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
			if (category == "Organisation Import"){				
				$("#file-validate").show();
				$(".error-div").hide();
				$("#imagevalidate1").attr("src","images/Success.png");
			} else if (category == "Initiative Import" || category == "Risk Import" || category == "Scorecard Import" || category == "Project Formulation" || category == "Risk Formulation") {				
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


		function orgStructureUploadNotFoundData(data,result) {
			var orgstructure_import_error;
			var validateImport;
			$("#validateImportHide").empty();
			$.each(result, function (i, List) {
				orgstructure_import_error = '<tr>' +
					'<td style="width: 200px; text-align: center;">' + List.rowNo + '</td>' +
					'<td style="width: 300px; text-align: center;">' + (List.columnName !=	undefined?List.columnName:"") + '</td>' +
					'<td style="width: 300px; text-align: center;">' + List.error + '</td>' +
					'</tr>';
				$(".uploadvalidationSuccess").append(orgstructure_import_error);
			});
			if(!jQuery.isEmptyObject(data) && data.result	==	"Not-Success"){
				$("#imagevalidate1").attr("src","images/Not-Verified.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
			}
			if(!jQuery.isEmptyObject(data) && (data.result	==	"success" || data.result	==	"Success")){
				$(".error-div").hide();
				$("#imagevalidate1").attr("src","images/Success.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';
			}
			/*if(result != undefined){	
				$("#imagevalidate1").attr("src","images/Not-Verified.png");
				$(".error-div").show();

				 validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
					'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';		
			} else {	
				$(".error-div").hide();
				$("#imagevalidate1").attr("src","images/Success.png");
				 validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';
			}*/
			if (jQuery.isEmptyObject(data)) {
				$(".error-div").hide();
				$("#imagevalidate1").attr("src","images/Not-Verified.png");
				
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
			}	
			$("#validateImportHide").append(validateImport);
			$("#file-upload").hide();				
		}
		
		function UserUploadNotFoundData(data,result) {
			var orgstructure_import_error;
			var validateImport;
			$("#validateImportHide").empty();
			$.each(result, function (i, List) {
				orgstructure_import_error = '<tr>' +
					'<td style="width: 200px; text-align: center;">' + List.rowNo + '</td>' +
					'<td style="width: 300px; text-align: center;">' + (List.columnName !=	undefined?List.columnName:"") + '</td>' +
					'<td style="width: 300px; text-align: center;">' + List.error + '</td>' +
					'</tr>';
				$(".uploadvalidationSuccess").append(orgstructure_import_error);
			});
			if(!jQuery.isEmptyObject(data) && data.result	==	"Not-Success"){
				$("#imagevalidate1").attr("src","images/Not-Verified.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
			}
			if(!jQuery.isEmptyObject(data) && (data.result	==	"success" || data.result	==	"Success")){
				$(".error-div").hide();
				$("#imagevalidate1").attr("src","images/Success.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';
			}
			
			if (jQuery.isEmptyObject(data)) {
				$(".error-div").hide();
				$("#imagevalidate1").attr("src","images/Not-Verified.png");
				
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
			}	
			$("#validateImportHide").append(validateImport);
			$("#file-upload").hide();				
		}
		
		function EtlUploadNotFoundData(data,result) {
			var etl_import_error;
			var validateImport;
			$("#validateImportHide").empty();
			$.each(result, function (i, List) {
				etl_import_error = '<tr>' +
					'<td style="width: 200px; text-align: center;">' + List.rowNo + '</td>' +
					'<td style="width: 300px; text-align: center;">' + (List.cellName !=	undefined?List.cellName:"") + '</td>' +
					'<td style="width: 300px; text-align: center;">' + List.error + '</td>' +
					'</tr>';
				$(".uploadvalidationSuccess").append(etl_import_error);
			});
			if(!jQuery.isEmptyObject(data) && data.result	==	"Not-Success"){
				$("#imagevalidate1").attr("src","images/Not-Verified.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
			}
			if(!jQuery.isEmptyObject(data) && (data.result	==	"success" || data.result	==	"Success")){
				$(".error-div").hide();
				$("#imagevalidate1").attr("src","images/Success.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';
			}
			
			if (jQuery.isEmptyObject(data)) {
				$(".error-div").hide();
				$("#imagevalidate1").attr("src","images/Not-Verified.png");
				
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
			}
			$("#validateImportHide").append(validateImport);
			$("#file-upload").hide();				
		}


		function XLSUploadNotFoundData(data,result) {
			var etl_import_error;
			var validateImport;
			$("#validateImportHide").empty();
			$.each(result, function (i, List) {
				etl_import_error = '<tr>' +
					'<td style="width: 200px; text-align: center;">' + List.rowNo + '</td>' +
					'<td style="width: 300px; text-align: center;">' + (List.cellName !=	undefined?List.cellName:"") + '</td>' +
					'<td style="width: 300px; text-align: center;">' + List.error + '</td>' +
					'</tr>';
				$(".uploadvalidationSuccess").append(etl_import_error);
			});
			if(!jQuery.isEmptyObject(data) && data.result	==	"Not-Success"){
				$("#imagevalidate1").attr("src","images/Not-Verified.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
			}
			if(!jQuery.isEmptyObject(data) && (data.result	==	"success" || data.result	==	"Success")){
				$(".error-div").hide();
				$("#imagevalidate1").attr("src","images/Success.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';
			}
			
			if (jQuery.isEmptyObject(data)) {
				$(".error-div").hide();
				$("#imagevalidate1").attr("src","images/Not-Verified.png");
				
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
			}
			$("#validateImportHide").append(validateImport);
			$("#file-upload").hide();				
		}


		function initiativeUploadNotFoundData(data,result) {
			var initiative_import_error;
			var validateImport;
			$("#validatescoreCardImportHide").empty();
			
			if(!jQuery.isEmptyObject(data) && data.result	==	"Not-Success"){
				$("#imagevalidate").attr("src","images/Not-Verified.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
			}
			if(!jQuery.isEmptyObject(data) && (data.result	==	"success" || data.result	==	"Success")){
				$(".error-div").hide();
				$("#imagevalidate").attr("src","images/Success.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';
			}
			
			$.each(result, function (i, List) {
				initiative_import_error = '<tr>' +
					'<td style="width: 150px; text-align: center;">' + List.Excel_SheetName + '</td>' +			
					'<td style="width: 150px; text-align: center;">' + List.rowNo + '</td>' +
					'<td style="width: 150px; text-align: center;">' + (List.highLightcellName !=	undefined?List.highLightcellName:"")+ '</td>' +
					'<td style="width: 250px; text-align: center;">' + List.error + '</td>' +
					'</tr>';
				$(".uploadvalidationSuccess").append(initiative_import_error);
			});	
			
			/*if(result != undefined){	
				$("#imagevalidate").attr("src","images/Not-Verified.png");
				$(".error-div").show();

				 validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
					'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';		
			} else {	
				$(".error-div").hide();
				$("#imagevalidate").attr("src","images/Success.png");
				 validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';
			}*/
			if (jQuery.isEmptyObject(data)) {
				$(".error-div").hide();
				$("#imagevalidate").attr("src","images/Not-Verified.png");
				
				var validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
			}
			
			$("#validatescoreCardImportHide").append(validateImport);
			$("#file-upload").hide();		
			
		}
		
		function scorecardUploadNotFoundData(data,result) {
			var scorecard_import_error = '';
			var validateImport = '';
			$("#validatescoreCardImportHide").empty();
			$.each(result, function (i, List) {
				scorecard_import_error = '<tr>' +
					'<td style="width: 150px; text-align: center;">' + List.Excel_SheetName + '</td>' +
					'<td style="width: 150px; text-align: center;">' + List.rowNo + '</td>' +
					'<td style="width: 150px; text-align: center;">' + (List.cellName !=	undefined?List.cellName:"") + '</td>' +
					'<td style="width: 250px; text-align: center;">' + List.error + '</td>' +
					'</tr>';
				$(".uploadvalidationSuccess").append(scorecard_import_error);
			});	
			
			if(!jQuery.isEmptyObject(result)){
				$(".error-div").show();
			}
			
			if(!jQuery.isEmptyObject(data) && data.result	==	"Not-Success"){
				$("#imagevalidate").attr("src","images/Not-Verified.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
			}
			if(!jQuery.isEmptyObject(data) && (data.result	==	"success" || data.result	==	"Success")){
				$(".error-div").hide();
				$("#imagevalidate").attr("src","images/Success.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';
			}
			
			if (jQuery.isEmptyObject(data)) {
				$(".error-div").hide();
				$("#imagevalidate").attr("src","images/Not-Verified.png");
				
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
			}
			
			/*if(result != undefined){	
				$("#imagevalidate").attr("src","images/Not-Verified.png");
				$(".error-div").show();

				 validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
					'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';		
			} else {	
				$(".error-div").hide();
				$("#imagevalidate").attr("src","images/Success.png");
				 validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';
			}*/	
			$("#validatescoreCardImportHide").append(validateImport);
			$("#file-upload").hide();	
		}
		
			
		function UploadSuccess(data) {
			$(".error-div").show();
			$("#imagevalidate").attr("src","images/Success.png");
			//$("#statisticmessage").append('Import Successful');
			if(data.no_of_processed != undefined){
				uploadSuccessStatistics('No_of_Processed',data.no_of_processed);
			}else{
				uploadSuccessStatistics('No_of_Processed',0);
			}
			if(data.no_of_processed != undefined){
				uploadSuccessStatistics('No_of_Failed',data.no_of_failed);
			}else{
				uploadSuccessStatistics('No_of_Failed',0);	
			}
			
					
		}
		
		function scorecardUploadSuccess(data) {
			$(".error-div").show();
			$("#imagevalidate").attr("src","images/Success.png");
			//$("#statisticmessage").append('Import Successful');
			if(data.no_of_processed != undefined){
				uploadSuccessStatistics('No of Records Processed',data.no_of_processed);
			}else{
				uploadSuccessStatistics('No of Records Processed',0);
			}
			if(data.no_of_created != undefined){
				uploadSuccessStatistics('No of Scorecards created',data.no_of_created);
			}else{
				uploadSuccessStatistics('No of Scorecards created',0);
			}
			if(data.no_of_updated != undefined){
				uploadSuccessStatistics('No of Records updated',data.no_of_updated);
			}else{
				uploadSuccessStatistics('No of Records updated',0);
			}
			if(data.no_of_failed != undefined){
				uploadSuccessStatistics('No of Failed',data.no_of_failed);
			}else{
				uploadSuccessStatistics('No of Failed',0);
			}
			
			
					
		}

		function initiativeUploadSuccess(data) {
			$(".error-div").show();
			$("#imagevalidate").attr("src","images/Success.png");
			//$("#statisticmessage").append('Import Successful');
			if(data.no_of_processed != undefined){
				uploadSuccessStatistics('No of Records Processed',data.no_of_processed);
			}else{
				uploadSuccessStatistics('No of Records Processed',0);
			}
			if(data.no_of_created != undefined){
				uploadSuccessStatistics('No of Scorecards created',data.no_of_created);
			}else{
				uploadSuccessStatistics('No of Scorecards created',0);
			}
			if(data.no_of_updated != undefined){
				uploadSuccessStatistics('No of Records updated',data.no_of_updated);
			}else{
				uploadSuccessStatistics('No of Records updated',0);
			}
			if(data.no_of_failed != undefined){
				uploadSuccessStatistics('No of Failed',data.no_of_failed);
			}else{
				uploadSuccessStatistics('No of Failed',0);
			}
		}

		function riskUploadSuccess(data) {
			$(".error-div").show();
			$("#imagevalidate").attr("src","images/Success.png");
			//$("#statisticmessage").append('Import Successful');
			if(data.no_of_processed != undefined){
				uploadSuccessStatistics('No of Risk Processed',data.no_of_processed);
			}else {
				uploadSuccessStatistics('No of Risk Processed',0);
			}
			
			if(data.no_of_created != undefined){
				uploadSuccessStatistics('No of Risk created',data.no_of_created);
			}else {
				uploadSuccessStatistics('No of Risk created',0);
			}
			
			if(data.no_of_updated != undefined){
				uploadSuccessStatistics('No of Risk updated',data.no_of_updated);
			}else {
				uploadSuccessStatistics('No of Risk updated',0);
			}

			if(data.no_of_failed != undefined){
				uploadSuccessStatistics('No of Failed',data.no_of_failed);	
			}else {
				uploadSuccessStatistics('No of Failed',0);	
			}
		}
		
		
		function uploadSuccessStatistics(staticsvalue,fnresult) {
			var upload_Statistics = '<tr>' +
			'<td style="width: 150px; text-align: left;">'+staticsvalue+'</td>' +
			'<td style="width: 300px; text-align: center;">' +fnresult+ '</td>' +	
			'</tr>';
			$(".uploadStatististics").append(upload_Statistics);
		}


		$(document).on('click', '#done-btn', function() {					
			location.reload(true);
		});
		
		
		function UploadEtlSuccess() {			
			$("#imagevalidate").attr("src","images/Success.png");
			 validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
			'<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';	
			 $("#validatescoreCardImportHide").append(validateImport);
			 uploadSuccessStatistics('Files loaded',1);

		}


		function UploadXlsSuccess() {			
			$("#imagevalidate").attr("src","images/Success.png");
			 validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
			'<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';	
			 $("#validatescoreCardImportHide").append(validateImport);
			 uploadSuccessStatistics('Files loaded',1);

		}
		
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
		  	
      });		  	
		  	
	</script>
  </body>
