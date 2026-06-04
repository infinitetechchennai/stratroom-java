// Code By Webdevtrick ( https://webdevtrick.com )
var file;
var category = '';
function readFile(input) {
	console.log(input, "inputData");
  if (input.files && input.files[0]) {
    var reader = new FileReader();
	  file = input.files[0];
    console.log(file, "file");
    reader.onload = function () {
      var htmlPreview =
        '<div class="box-body-border">' +
        '<img width="20" src="' +
        "assets/images/file-icon.png" +
        '" />' +
        "<span>" +
        input.files[0].name +
        "</span>" +
        "<span>" +
        "<i class='fa fa-times remove-preview'></i>" +
        "</span>" +
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

$("#next-btn-1").click(function (e) {
  e.preventDefault(); 
 
  $("#file-upload").hide();
  $("#file-validate").hide();

  // $("#file-validate").show();
  $("#file-save").hide();
  $(".form-progressbar li:nth-child(1)").addClass("active");
  category = $("#uploadcategory").val();
  var orgimportmethodtype = $("#orgimportmethodtype").val();
   console.log(file,category, orgimportmethodtype,  "file");



                if (category == "Organisation Import") {
					$("#file-validate").hide();
				} else if (category == "Initiative Import" || category == "Risk Import" || category == "Scorecard Import" || category == "InitiativeDataLoad" || category == "InitiativeBudgetLoad" || category == "Budget Import" || category == "Compliance") {
					$("#file-validate1").show();
				} else {
					$("#file-validate").hide();
				}
				$("#file-save").hide();
				$(".form-progressbar li:nth-child(2)").addClass("active");
				var formdata = new FormData();
				$(".page-loader-wrapper").css("display", "block");
				if (category == "ETLUpload") {
					formdata.append("etlFile", file);
					Url = "/stratroom/uploadETLFile?type=validation";
				} else if (category == "Initiative Import") {
					formdata.append("initiativeData", file);
					Url = "/stratroom/importBulkInitiativesDetails?type=validation";
				} else if (category == "InitiativeDataLoad") {
					formdata.append("initiativeDataLoad", file);
					Url = "/stratroom/importInitiativesData?type=validation";
				} else if (category == "InitiativeBudgetLoad") {
					formdata.append("initiativeBudget", file);
					Url = "/stratroom/importInitiativesBudget?type=validation";
				} else if (category == "Risk Import") {
					formdata.append("riskData", file);
					Url = "/stratroom/saveBulkRiskDetails?type=validation";
				} else if (category == "Scorecard Import") {
					formdata.append("scoreCardData", file);
					Url = "/stratroom/saveScoreCardDetails?type=validation&language=en";
				}else if (category == "Budget Import") {
					console.log("function Clicked");
				    formdata.append("budgetData", file);	
				    Url = "/stratroom/importBulkBudgetDetails?type=validation";			
			    }else if (category == "Compliance") {
					console.log("function Clicked");
				    formdata.append("complianceData", file);	
				    Url = "/stratroom/importBulkComplainceDetails?type=validation";			
			    } else if (category == "Organisation Import") {
					if (orgimportmethodtype == "departmentChart") {
						formdata.append("deptdata", file);
						Url = "/stratroom/createBulkDeptMapping?type=validation";
					} else {
						formdata.append("employeedata", file);
						Url = "/stratroom/createBulkEmployee?type=validation";
					}
				} else if (category == "XLSUpload") {
					formdata.append("xlsfile", file);
					$(".uploadStatististics").empty();
					$("#file-upload").hide();
					$("#file-validate").hide();
					$("#file-validate1").hide();
					$("#file-save").show();
					var orgimportmethodtype = $("#orgimportmethodtype").val();
					$(".form-progressbar li:nth-child(3)").addClass("active");
					Url = "/stratroom/uploadXLFile?type=save";
				}


				if (category && file) {

					if (category == "XLSUpload" || category == "ETLUpload" || category == "Initiative Import" || category == "Risk Import" || category == "Scorecard Import" || category == "Organisation Import" || category == "InitiativeDataLoad" || category == "InitiativeBudgetLoad" || category == "Budget Import" || category == "Compliance") {
						$.ajax({
							url: Url,
							type: "POST",
							data: formdata,
							processData: false,
							contentType: false,
							success: function (data, status) {
                console.log(data, "responsedata");
								if (category == "Initiative Import") {
									orgStructureUploadNotFoundData(data, data.parsingError);
								} if (category == "InitiativeDataLoad") {
									initiativeUploadNotFoundData(data, data.parsingError);
								} if (category == "InitiativeBudgetLoad") {
									initiativeUploadNotFoundData(data, data.parsingError);
								} else if (category == "Risk Import") {
									orgStructureUploadNotFoundData(data, data.parsingError);
								} else if (category == "Scorecard Import") {
									orgStructureUploadNotFoundData(data, data.parsingError);
								} else if (category == "Organisation Import") {
									orgStructureUploadNotFoundData(data, data.parsingError);
								} else if (category == "ETLUpload") {
									orgStructureUploadNotFoundData(data, data.parsingError);
								}
								else if (category == "XLSUpload") {
									//			XLSUploadNotFoundData(data,data.parsingError);
									UploadXlsSuccess();

								}else if(category == "Budget Import"){
									console.log(data, "datadata");
									orgStructureUploadNotFoundData(data, data.parsingError);
								}else if(category == "Compliance"){
									console.log(data, "datadata");
									orgStructureUploadNotFoundData(data, data.parsingError);
								}
								$(".page-loader-wrapper").css("display", "none");
							}, error: function (msg, status) {
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
							},
						});
					} else {
						window.location.reload();
					}


				} else {
					if (category != '') {
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
					} else {
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


$("#next-btn-2").click(function () {
  $("#file-upload").hide();
  $("#file-validate").hide();
  $("#file-next-btn").hide();
  $("#file-save").hide();
  $(".form-progressbar li:nth-child(2)").addClass("active");

  
  var orgimportmethodtype = $("#orgimportmethodtype").val();

  var formdata = new FormData();
				var url = "";
				var category = $("#uploadcategory").val();
				$(".page-loader-wrapper").css("display", "block");
				if (category == "ETLUpload") {
					formdata.append("etlFile", file);
					url = "/stratroom/uploadETLFile?type=save";
				} else if (category == "XLSUpload") {
					formdata.append("xlsfile", file);
					url = "/stratroom/uploadXLFile?type=save";
				} else if (category == "InitiativeDataLoad") {
					formdata.append("initiativeDataLoad", file);
					url = "/stratroom/importInitiativesData?type=save";
				} else if (category == "InitiativeBudgetLoad") {
					formdata.append("initiativeBudget", file);
					url = "/stratroom/importInitiativesBudget?type=save";
				} else if (category == "Initiative Import") {
					formdata.append("initiativeData", file);
					url = "/stratroom/importBulkInitiativesDetails?type=save";
				} else if (category == "Risk Import") {
					formdata.append("riskData", file);
					url = "/stratroom/saveBulkRiskDetails?type=save";
				} else if (category == "Scorecard Import") {
					formdata.append("scoreCardData", file);
					url = "/stratroom/saveScoreCardDetails?type=save";
				}else if (category == "Budget Import") {
					formdata.append("budgetData", file);	
					url = "/stratroom/importBulkBudgetDetails?type=save";	
				} else if (category == "Compliance") {
					formdata.append("complianceData", file);	
					url = "/stratroom/importBulkComplainceDetails?type=save";	
				} else {
					if (orgimportmethodtype == "departmentChart") {
						formdata.append("deptdata", file);
						url = "/stratroom/createBulkDeptMapping?type=save";
					} else {
						formdata.append("employeedata", file);
						url = "/stratroom/createBulkEmployee?type=save";
					}
				}


				$.ajax({
					url: url,
					type: "POST",
					data: formdata,
					processData: false,
					contentType: false,
					success: function (data, status) {

						$(".page-loader-wrapper").css("display", "none");
						if (category == "InitiativeDataLoad") {
							UploadSuccess(data);
						} if (category == "InitiativeBudgetLoad") {
							UploadSuccess(data);
						} if (category == "Initiative Import") {
							initiativeUploadSuccess(data);
						} else if (category == "Risk Import") {
							riskUploadSuccess(data);
						} else if (category == "Scorecard Import") {
							UploadSuccess(data);
						} else if (category == "Organisation Import") {
							UploadSuccess(data);
						} else if (category == "ETLUpload") {
							UploadEtlSuccess(data);
						} else if (category == "XLSUpload") {
							UploadXlsSuccess();
						}else if (category == "Budget Import") {
							UploadSuccess(data);
						}else if (category == "Compliance") {
							UploadSuccess(data);
						}

					},
				});
});

$("#prev-btnone").click(function () {
console.log("Prev button clicked");
$("#file-upload").removeAttr("style");
  $("#file-upload").show();
  $("#file-next-btn").hide();
  $("#file-validate").hide();
  $("#file-save").hide();
  $(".form-progressbar li:nth-child(1)").removeClass("active");
});


$("#prev-btnerror").click(function () {
console.log("Prev button clicked");
$("#file-upload").removeAttr("style");
  $("#file-upload").show();
  $("#file-next-btn").hide();
  $("#file-validate").hide();
  $("#file-save").hide();
  $(".form-progressbar li:nth-child(1)").removeClass("active");
});

$("#prev-btn2").click(function () {
  $("#file-next-btn").hide();
  $("#file-validate").hide();
  $("#file-save").hide();
  $("#file-upload").show();
  $(".form-progressbar li:nth-child(2)").removeClass("active");

});



function orgStructureUploadNotFoundData(data, result) {
    $("#file-validate").hide();
    console.log(data, "data");
    if (!jQuery.isEmptyObject(data)) {
        if (data.result == "Not-Success") {
           
            $("#file-validate").show();
            $("#file-save").hide();

            $("#file-validate .img-center img").attr("src", "/stratroom/images/not-verified.png");

            const errorRows = result && result.length > 0 
                ? result.map(error => 
                    `<tr>
                        <td style="width: 150px">${error.rowNo}</td>
                        <td>${error.error}</td>
                    </tr>`
                  ).join('')
                : `<tr><td colspan="2">No specific errors reported</td></tr>`;

            $(".error-table tbody").html(errorRows);
            // $("#next-btn-2").prop("disabled", true);

        } else if (data.result.toLowerCase() == "success") {
          console.log(data, "data result success");
          
            $("#file-next-btn").show();  
            $("#file-save").hide();        
            $("#file-validate").hide();
            $("#file-upload").hide();          
            $("#file-save .img-center img").attr("src", "/stratroom/images/success.png");   
        }
    } else {
      
        $("#file-validate").show();
        $("#file-save").hide();
        $("#file-validate .img-center img").attr("src", "/stratroom/images/not-verified.png");
        $(".error-table tbody").html(`<tr><td colspan="2">No validation data received</td></tr>`);
        // $("#next-btn-2").prop("disabled", true);
    }
}


function UploadSuccess(data) {
    $("#file-validate").hide();
    $("#file-next-btn").hide();
    console.log(data, "data");
    if (!jQuery.isEmptyObject(data)) {
        if (data.result == "Not-Success") {
           
            $("#file-validate").show();
            $("#file-save").hide();

            $("#file-validate .img-center img").attr("src", "/stratroom/images/not-verified.png");

            const errorRows = result && result.length > 0 
                ? result.map(error => 
                    `<tr>
                        <td style="width: 150px">${error.rowNo}</td>
                        <td>${error.error}</td>
                    </tr>`
                  ).join('')
                : `<tr><td colspan="2">No specific errors reported</td></tr>`;

            $(".error-table tbody").html(errorRows);
            // $("#next-btn-2").prop("disabled", true);

        } else if (data.result.toLowerCase() == "success") {
          console.log(data, "data result success");
          
            $("#file-next-btn").hide();  
            $("#file-save").show();        
            $("#file-validate").hide();
            $("#file-upload").hide();
            $("#file-save .img-center img").attr("src", "/stratroom/images/success.png");   
        }
    } else {
      
        $("#file-validate").show();
        $("#file-save").hide();
        $("#file-validate .img-center img").attr("src", "/stratroom/images/not-verified.png");
        $(".error-table tbody").html(`<tr><td colspan="2">No validation data received</td></tr>`);
        // $("#next-btn-2").prop("disabled", true);
    }
}