<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta content="width=device-width, initial-scale=1" name="viewport" />
<title>StratRoom</title>
<link rel="stylesheet"
	href="${contextroot}/css/fonts/fontawesome_v_5/font-awesome.min.css">
<link rel="stylesheet"
	href="${contextroot}/css/fonts/fontawesome_v_5/all.css">

<link href="${contextroot}/css/app.min.css" rel="stylesheet">
<!-- Custom Css -->
<link href="${contextroot}/css/style.css" rel="stylesheet" />
<link href="${contextroot}/css/custom.css" rel="stylesheet" />
<link href="${contextroot}/css/initatives.css" rel="stylesheet" />
<link href="${contextroot}/css/startroom/wedgets.css" rel="stylesheet" />
<!-- You can choose a theme from css/styles instead of get all themes -->
<link href="${contextroot}/css/styles/all-themes.css" rel="stylesheet" />
<link href="${contextroot}/css/select2.min.css" rel="stylesheet" />
<link href="${contextroot}/css/employee.css" rel="stylesheet" />
<link href="${contextroot}/css/daterangepicker.min.css" rel="stylesheet">
<link rel="stylesheet" href="${contextroot}/css/datepickerair.css">
<link rel="stylesheet" href="${contextroot}/css/jquery-ui.min.css">
<script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>
<script type="text/javascript"
	src="${contextroot}/js/jquery/jquery.validate.min.js"></script>
<link href="${contextroot}/css/jquery.contextMenu.min.css" rel="stylesheet">

<style>

	.select2 .select2-search--dropdown {
		padding: 3px 2px 0px 0px;
	}
	
	
	input.select2-search__field {
		height:26px !important;
		font-size:12px !important;
font-weight: normal !important;
	}
	
	
	.select2-selection--single{
    border: 1px solid #ced4da !important;
    border-radius: 0px !important;
	}
	
    .orientation-right {
        top: 60px !important;
        right: 0 !important;
        left: auto !important;
        position: fixed;
      }

    #notifications .row::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
      }

  .btn-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 10px;
  max-width: 600px;
  border: 1px solid #ced4da;
  }

  .file-upload-container {
    display: inline-block;
    margin: 5px;
    width: 120px;
    position: relative;
  }

  /* Document Upload Button */
  .btn-document {
    width: 60px;
    height: 60px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }


  /* Icons size */
  .btn-document i {
    font-size: 30px;
  }

  .action-buttons {
    display: flex;
    margin-top: 5px;
  }

  .action-buttons button {
    margin: 2px;
    height: 24px;
    width: 24px;
    border: none;
  }

  /* Remove borders from icons */
  .action-buttons button i {
    font-size: 12px;
  }

  .fa-file-pdf{
    color: red;
  }
  .fa-file-excel{
    color: #1D6F42;
  }
  .fa-file-word{
    color: #2A5699;
  }
  .fa-file-code{
    color: #E44D26;
  }
  .fa-file-image{
    color: green;
  }

  .file-name {
    font-size: 14px;
    margin-top: 5px;
    color: #000;
    display: none;
    margin-left: -60px !important;
  }

  .file-upload-container .btn-document i {
    font-size: 30px;
  }

  /* Ensures proper layout on small devices */
  @media (max-width: 600px) {
    .btn-container {
      justify-content: center;
    }

    .file-upload-container {
      margin: 10px;
    }
  }

  </style>
</head>


<body class="light">
<input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
	<!-- Page Loader -->
	<jsp:include page="../common/top-navigation.jsp"></jsp:include>
	<!-- #Top Bar -->
	<div>
		<jsp:include page="../common/left-navigation.jsp"></jsp:include>
		<jsp:include page="../common/right-navigation.jsp"></jsp:include>

		<div id="deleteModalswot" class="modal fade">
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
								data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
							<button type="button"
								class="btn btn-danger confirm-modal-deleteBtn"
								onclick="handleswoteventdelete()">Delete</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--#END View -->
	<section class="content">
		<div class="page-header row no-gutters py-2 m-t--70">
			<div class="col-lg-6 col-md-6 text-center text-sm-left pt-2 mb-0 ml-4">
				<h5 class="page-title" style="font-weight: 600; text-transform: uppercase">Data Entry Form</h5>
			</div>
		</div>
		
		<c:if test="${userPrincipal != null}">
			<input id="userPrincipal" type="hidden" name="userPrincipal" value="<c:out value="
				${userPrincipal.profile.empId}" />">
		</c:if>
		<c:if test="${pagenumber != null}">
			<input id="pagenumber" type="hidden" name="pagenumber" value="<c:out value=" ${pagenumber}" />">
		</c:if>
		
		<!-- End Page Header -->
		<div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-md-5">
		  <form id="kpi_data_form" name="kpi_data_form">
            <div class="card" style="padding: 16px 32px">
              <div class="row kpi_data_form">
				
                <div class="col-12 form-heading">
                  <h4>KPI Data Form</h4>
                </div>
                <div class="col-12 text-center rounded-circle employeeprofile">
                  
                </div>
				
				<div class="col-12 form-group">
                  <label for="Name" data-i18n="Scorecard">Scorecard</label>
                  <select id="kpiscorecard" style="padding-left: 6px !important" class="form-control browser-default persp_status">
                    <option value="" data-i18n="Choose">Choose</option>
                  </select>
                </div>
                
                <div class="col-12 form-group">
                  <label for="Name">KPI</label>
                  <select name="kpidataformname" class="form-control browser-default select2" id="kpiname">
                  <option value="" data-i18n="Choose">Choose</option>
                  </select>
                </div>
                
                <div class="col-6 form-group">
                  <label for="Name" data-i18n="Measures">Measures</label>
				  <select name="kpi_measurement" id="kpi_measurement" class="form-control browser-default select2">
				  <option value="" data-i18n="Choose">Choose</option>
					</select>
                </div>
				
				<div class="col-6 form-group">
                  <label for="Name" data-i18n="Sub Measures">Sub Measures</label>
					<select id="subMeasuressearch" name="subMeasuressearch" class="form-control browser-default select2">
					<option value="" data-i18n="Choose">Choose</option>
					</select>
                </div>
				
				<div class="col-6 form-group departmentnamekpiform" style="display:none;">
                  <label for="Name" data-i18n="Department Name">Department Name</label>
				  <input type="text" class="form-control browser-default departmentnamekpiname" readonly/>
				  <input type="hidden" class="form-control browser-default departmentnamekpiid" readonly/>
                </div>

				<div class="col-6 form-group">
                  <label for="Measurement Frequency" data-i18n="Measurement Frequency">Measurement Frequency</label>
                  <input type="text" class="form-control browser-default measurement_frequency" readonly/>
                </div>
                
                <div class="col-6 form-group">
                  <label for="Measurement Frequency">KPI Type</label>
                  <input type="text" name="kpiDataType" id="kpiDataType" class="form-control browser-default" readonly/>
                </div>
				
				<div class="col-6 form-group">
                  <label for="Target" data-i18n="Actual">Actual</label>
                  <input
                    type="text" id="kpiactual" name="kpiactual"
                    class="form-control browser-default editkpiActual"
                    autocomplete="off" onkeypress="return allowDecimal(event)"
                  />
                </div>
				
                <div class="col-6 form-group">
                  <label for="Target" data-i18n="Target">Target</label>
                  <input
                    type="text" id="kpitarget" name="kpitarget"
                    class="form-control browser-default"
                    autocomplete="off" onkeypress="return allowDecimal(event)" readonly
                  />
                </div>
                
                <!-- <div class="col-6 form-group">
                  <label for="Target">Budget</label>
                  <input
                    type="text" id="kpibudget" name="kpibudget"
                    class="form-control browser-default"
                    autocomplete="off" onkeypress="return allowDecimal(event)" readonly
                  />
                </div>
				
                <div class="col-6 form-group">
                  <label for="Target">Forecast</label>
                  <input
                    type="text" id="kpiforecast" name="kpiforecast"
                    class="form-control browser-default"
                    autocomplete="off" onkeypress="return allowDecimal(event)" readonly
                  />
                </div> -->

                <div class="col-6 form-group">
                  <label for="Name">Start / End Date</label>
                  <input
                    type="text" id="kpistartdate" name="kpistartdate"
                    disabled
                    class="form-control browser-default"
                  />
                </div>

                <div class="col-6 form-group">
                  <label for="Period" data-i18n="Period">Period</label>
                  <input
                    type="text"
                    class="form-control persp_date browser-default" id="kpidatashowformperiod" name="kpidatashowformperiod" readonly disabled
                  />
                  <input type="hidden" name="kpidataformperiod" id="kpidataformperiod">
                  <input type="hidden" name="realDateFrom" id="realDateFrom">
                  <input type="hidden" name="realDateTo" id="realDateTo">
                  <input type="hidden" id="kpihiddenactual">
                  <input type="hidden" id="kpihiddentarget">
                  <input type="hidden" id="submeasurekpiidhidden">
                </div>

                <div class="col-6 form-group">
                  <label for="Valid Till" data-i18n="Valid Till">Valid Till</label>
                  <input
                    type="text" id="kpivalidtill" name="kpivalidtill"
                    class="form-control browser-default"
                    readonly
                  />
                </div>

        		<div class="col-6 form-group">
        			<label for="Comments" data-i18n="Comments">Comments</label>
        			<textarea
        			  class="form-control browser-default comments" id="savecommentsService"
        			></textarea>
        		</div>

            <div class="col-12 form-group center file-upload">
              <div class="btn-container">
                <div class="file-upload-container">
                  <!-- Upload Button -->
                  <button type="button" class="btn btn-document" onclick="fileUploadBtn(this)">
                    <i class="fas fa-paperclip" data-toggle="tooltip" data-placement="bottom" title="Attachment" style="font-size: 40px !important;"></i>
                  </button>
                  <input type="file" class="fileInput" onchange="handleFileSelect(event)" style="display: none;">
                  <div class="file-name"></div>
            
                  <!-- Action buttons -->
                  <div class="action-buttons">
                    <button type="button" class="btn btn-download" onclick="downloadDocument()">
                      <i class="fa fa-download" data-toggle="tooltip" data-placement="bottom" title="Download" style="margin-left: -4px !important;"></i>
                    </button>
                    <button type="button" class="btn btn-delete" onclick="deleteDocument(this)">
                      <i class="fa fa-trash" data-toggle="tooltip" data-placement="bottom" title="Delete" style="margin-left: -2.5px !important;"></i>
                    </button>
                    <button type="button" class="btn btn-add" onclick="addDocument()">
                      <i class="fa fa-plus" data-toggle="tooltip" data-placement="bottom" title="Add" style="margin-left: -6px !important;position: relative;top: -4.5px;"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

                <div class="col-12">
                  <div class="form-line right">
                    <!--<button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close">
                      Submit
                    </button>-->
                    <input type="hidden" id="changeIdKpi">
                    <button class="initative_save_btn" value="Save" data-i18n="Save">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
			</form>
          </div>
        </div>
      </div>
	</section>

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
	<script src="${contextroot}/js/kpidata_formView.js"></script>
	<script src="${contextroot}/js/initial.js"></script>
	<script>
	$('.modal-dialog').draggable({
            handle: ".modal-header"
        });
	

	$.fn.select2.amd.define("SearchableSingleSelection", [
		  "select2/utils",
		  "select2/selection/single",
		  "select2/selection/eventRelay",
		  "select2/dropdown/search"
		],
		function (Utils, SingleSelection, EventRelay, DropdownSearch) {
		  var adapter = Utils.Decorate(SingleSelection, DropdownSearch);
		  adapter = Utils.Decorate(adapter, EventRelay);

		  adapter.prototype.render = function () {
		    var $rendered = DropdownSearch.prototype.render.call(this, SingleSelection.prototype.render);

		    this.$searchContainer.hide();
		    this.$element.siblings('.select2').find('.selection').prepend(this.$searchContainer);

		    return $rendered;
		  };

		  var bindOrigin = adapter.prototype.bind;
		  adapter.prototype.bind = function (container) {
		    var self = this;

		    bindOrigin.apply(this, arguments);

		    container.on('open', function () {
		      self.$selection.hide();
		      self.$searchContainer.show();
		    });

		    container.on('close', function () {
		      self.$searchContainer.hide();
		      self.$selection.show();
		    });
		  };

		  return adapter;
		});

		/*
		* A select2 adapter to show simple dropdown list without a searchbox inside
		*/
		$.fn.select2.amd.define("UnsearchableDropdown", [
		  "select2/utils",
		  "select2/dropdown",
		  "select2/dropdown/attachBody",
		  "select2/dropdown/closeOnSelect"
		],
		function (Utils, Dropdown, AttachBody, CloseOnSelect) {
		  var adapter = Utils.Decorate(Dropdown, AttachBody);
		  adapter = Utils.Decorate(adapter, CloseOnSelect);
		  return adapter;
		});

		$('#kpiname').select2({
		  selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
		  dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
		});
		
		$('#kpi_measurement').select2({
			  selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
			  dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
			});

			$('#subMeasuressearch').select2({
			  selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
			  dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
			});
	</script>

    <script>
      var attachment = {
        kpiAttachment: [] 
      };
    
      function fileUploadBtn(btn) {
        $(btn).closest('.file-upload-container').find('input[type="file"]').click();
      }
    
      function handleFileSelect(event) {
        var file = event.target.files[0];
        if (file) {
            var fileType = file.type || getFileExtension(file.name);
            var fileIcon = getFileIcon(fileType);
    
            $(event.target).siblings('.btn-document').find('i').attr('class', fileIcon);
            $(event.target).siblings('.file-name').text(file.name).show();
    
            var reader = new FileReader();
            reader.onload = function(e) {
              var uniqueFileReference = generateUniqueFileReference();

                var fileDetail = {
                    "name": file.name,
                    "size": file.size + " bytes",
                    "type": fileType,
                    "file": e.target.result.split(',')[1], // Base64 encoded file content
                    "uniqueFileReference": uniqueFileReference

                };
                attachment.kpiAttachment.push(fileDetail);
                console.log(attachment.kpiAttachment);
            };
            reader.readAsDataURL(file);
        } else {
            $(event.target).siblings('.btn-document').find('i').attr('class', 'fas fa-paperclip');
        }
    }

    function generateUniqueFileReference() {
    var timestamp = new Date().getTime();
    var random = Math.random().toString(36).substring(2, 15);
    return timestamp + '_' + random;
}
    function getFileExtension(filename) {
        return filename.split('.').pop();
    }

    function getFileIcon(fileType) {
        var iconClass = "fas fa-paperclip";
        if (fileType === "image/jpeg") {
            iconClass = "fas fa-file-image";
        } else if (fileType === "application/pdf") {
            iconClass = "fas fa-file-pdf";
        } else if (fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            iconClass = "fas fa-file-excel";
        } else if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            iconClass = "fas fa-file-word";
        } else if (fileType === "text/html") {
            iconClass = "fas fa-file-code";
        }
        return iconClass;
    }

    function deleteDocument(btn) {
        var container = $(btn).closest('.file-upload-container');
        if ($(".file-upload-container").index(container) === 0) {
            alert("You cannot delete the first paperclip.");
        } else {
            container.remove();
            arrangeDocumentRows();
        }
    }
    
    function arrangeDocumentRows() {
        $(".row-separator").remove();
        var fileUploadContainers = $(".file-upload-container");
        var rows = [];
        fileUploadContainers.each(function (index) {
            if (index % 3 === 0) {
                rows.push([]);
            }
            rows[rows.length - 1].push(this);
        });
        if (rows.length > 0 && rows[rows.length - 1].length < 3) {
            var lastRow = rows[rows.length - 1];
            if (lastRow.length < 3) {
                $(lastRow).each(function () {
                    $(this).remove();
                });
            }
        }
        rows.forEach(function (rowElements, index) {
            rowElements.forEach(function (element) {
                $(element).appendTo(".btn-container");
            });
            if (index < rows.length - 1) {
                $("<div class='row-separator' style='flex-basis: 100%;'></div>").insertAfter($(rowElements[rowElements.length - 1]));
            }
        });
    }

  function addDocument() {
    var newFileUpload = $(".file-upload-container:first").clone();
    newFileUpload.find("input[type='file']").val("");
    newFileUpload.find('.btn-document i').attr('class', 'fas fa-paperclip');
    newFileUpload.find('.file-name').hide().text("");
    $(".btn-container").append(newFileUpload);
    arrangeDocumentRows();
  }

  $(document).ready(function () {
      arrangeDocumentRows();
  });
  </script>
  
</body>