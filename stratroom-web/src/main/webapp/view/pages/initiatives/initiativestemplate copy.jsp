<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />
<link href="${contextroot}/css/frappe-gantt.css" rel="stylesheet">


    <link href="assets/css/main.css?v0.004" rel="stylesheet">
    <link href="assets/css/responsive.css" rel="stylesheet">
     <link href="assets/css/bootstrap.min.css" rel="stylesheet">

     <!-- Font Awsome Icons -->
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
<style></style>


<script>
	function preview_images() {
		var total_file = document.getElementById("images").files.length;
		for (var i = 0; i < total_file; i++) {
			$('#image_preview')
					.append(
							"<div class='col-md-3' style='padding-bottom: 4%' '><img class='img-responsive' src='"
									+ URL
											.createObjectURL(event.target.files[i])
									+ "'></div>");
		}
	}
</script>

<jsp:include page="modals/initiative_description_modal.jsp"></jsp:include>
<input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
<!-- #END# Right Sidebar -->
<!-- #END# FormEdit Sidebar -->
<!-- #END# KPI Desc Sidebar 364780743841-->
<jsp:include page="template/sidebar_template.jsp"></jsp:include>
<div style="--stratroom-offcanvas-width: 280px;"
  class="offcanvas offcanvas-toggle offcanvas-start offcanvasSettings border-0 shadow-lg"
  data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1"
  id="initiative_sidebar" aria-labelledby="offcanvasSettingsLabel">

  <!-- Toggle buttons -->
  <div class="offcanvas-toggle-menu shadow toggle-right">
    <button id="toggleButton" class="btn p-0" data-bs-toggle="offcanvas" data-bs-target="#initiative_sidebar"
      aria-controls="initiative_sidebar">
      <i class="fas fa-caret-right"></i>
    </button>
    <button class="btn p-0" data-bs-dismiss="offcanvas" aria-label="Close">
      <i class="fas fa-caret-left"></i>
    </button>
  </div>

  <!-- Header -->
  <div class="offcanvas-header border-bottom justify-content-between gap-3">
    <h5 class="offcanvas-title text-uppercase fs-6 fw-bold" id="offcanvasSettingsLabel" data-i18n="Initiatives">
      Initiatives & Projects
    </h5>
    <div class="page-icons d-flex gap-2">
      <!-- Add -->
      <a href="#" class="initativesdescription initiativeCreateIcon"
         data-bs-toggle="modal" data-bs-target=".initatives_description_popup"
         onclick="handleinitiativeevent('{{id}}', 'add')" style="cursor:pointer;">
        <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Add">
          <i class="fas fa-plus"></i>
        </span>
      </a>

      <!-- Import -->
      <!-- Keep hidden/commented if you don’t use -->
      <!-- <a href="#" data-bs-toggle="modal" data-bs-target=".file_upload_popup" class="initiativeCreateIcon">
        <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Import">
          <img src="${contextroot}/images/icon/Import.png" width="16" alt="Import">
        </span>
      </a> -->

      <!-- Export -->
      <a href="" target="_blank" class="exceldownloadlink" style="cursor:pointer;">
        <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Export">
          <img src="/stratroom/images/import-i.svg" width="14" alt="Export">
        </span>
      </a>
    </div>
  </div>

  <!-- Filter bar -->
  <div class="offcanvas-tab d-flex justify-content-between align-items-end gap-2 border-bottom px-3 ps-2 pt-2 bg-light">
    <div id="popoverFilterInitiativesCategory">
      <span type="button" class="btn btn-sm btn-icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
        title="Initiatives Category">
        <img src="assets/images/icons/filter-i.svg" width="12" height="12" alt="Filter">
        <strong>Filter Initiatives Category</strong>
      </span>
    </div>
  </div>

  <!-- Sidebar body -->
  <div class="offcanvas-body sub_initiatives" id="sub_initiatives">
    <div class="card border-0" style="height: 100%;overflow-y:auto;">
      <div class="card-body p-0 d-flex flex-column" id="initiate_sidebar">
        <!-- Existing JS will render initiative cards here -->
      </div>
    </div>
  </div>
</div>

<!-- File Upload PopUp -->

<div class="modal fade file_upload_popup1" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="myLargeModalLabel" data-i18n="File Upload">File Upload</h6>
				<button type="button" class="close fileuploadclose"
					data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<div class="row">
					<form action="" method="post" enctype="multipart/form-data">
						<div class="col-md-12" style="width: 100%; margin-bottom: 2%;">
							<input type="file" accept=".xlsx, .xls, .csv"
								style="padding-bottom: 12%; padding-top: 3%; padding-right: 5%;"
								class="form-control" id="importinitiative"
								name="importinitiative" />
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>


<!-- End of File Upload PopUp -->

<!-- File Validate Form -->
<div class="modal fade file_upload_popup" id="file-validate-form"
	tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
	aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h4 data-i18n="File Upload">Attachments</h4>
				<button type="button" class="close pull-right" data-dismiss="modal">
					&times;</button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-md-12">
						<label for="">Name</label>
						<input type="text" name="attachmentName" id="attachmentName" style="border: 1px solid #dddd;">
					</div>
					<div class="col-md-12">
						<hr />
					</div>
				</div>

				<div class="row" id="file-upload">
					<div class="col-md-12">
						<div class="form-group">
							<label class="control-label">Upload File</label>
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
								<input type="file" name="img_logo" class="dropzone" id="attachementuploadfile"
									   accept=".pdf,.ppt,.jpeg,.xlsx,.doc,.docx" />
							</div>
							<input type="text" id="initiativeInput" />

						</div>
					</div>
					<div class="col-md-12">
						<hr />
					</div>
					<div class="col-md-12">
						<div class="form-line right">
						<button type="button" class="btn btn-label-secondary btn-default1 btn"
									data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
						<button type="submit" class="initative_save_btn" value="Save" data-i18n="Save" id="attachementupload">Save</button>
					</div>
					</div>
				</div>
          </div>
		</div>
	</div>
</div>
<!-- END File Validate Form -->


<div class="modal fade chart_view_popup" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg"
		style="max-width: 100%">
		<div class="modal-content">
			<div class="modal-header modalheadercolor">
				<h6 class="modal-title" id="myLargeModalLabel_1">View
					Gantt Chart</h6>
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<div class="col-lg-12 col-md-12 col-sm-12">
					<div class="card">
						<div class="form-row" style="padding: 16px;">
							<div class="col-md-2 form-group">
								<button onclick="menuToggle()" class="btn btn-custom-secondary"
									data-toggle="tooltip" data-placement="right"
									title="Collapse Table">
									<i id="toggleIcon" class="fa fa-angle-double-left"></i>
								</button>
							</div>
							<div class="col-md-8"></div>
							<div class="col-md-2 custom-space-even">
								<div id="control-view" class="btn-group" role="group"
									aria-label="Basic example" style="width: 100%;">
									<button type="button" class="btn btn-custom-secondary"
										data-value="Day"
										style="border-top-left-radius: 4px; border-bottom-left-radius: 4px;">
										D</button>
									<button type="button" class="btn btn-custom-secondary"
										data-value="Week">W</button>
									<button type="button" class="btn btn-custom-secondary active"
										data-value="Month"
										style="border-top-right-radius: 4px; border-bottom-right-radius: 4px;">
										M</button>
								</div>
								<!--<button
                    class="btn btn-custom-secondary"
                    data-toggle="modal"
                    data-target="#create_task"
                  >
                    <i class="fas fa-plus"></i>
                  </button>-->
							</div>
						</div>
						<div class="form-row" style="padding: 16px; margin-top: -20px;">
							<div class="col-md-4" id="TreeTable" hidden>
								<div class="table-responsive">
									<table id="example-basic"
										class="table align-center dashboard-table dashboard-task-infos">
										<thead>
											<tr>
												<th>Task Name</th>
												<th>Start Date</th>
												<th>End Date</th>
												<th>Owner</th>
											</tr>
										</thead>
										<tbody id="ganttchart_table">

										</tbody>
									</table>
								</div>
							</div>
							<div class="col-md-12" id="FrappeGantt"
								style="border: 2px solid #e0e0e0;">
								<div id="chart_modal" class="chartviewtemplatediv"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!--#START Sub Activitie View -->
<div class="modal fade sub_activitie_view_popup" tabindex="-1"
	role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header modalheadercolor">
				<h6 class="modal-title" id="myLargeModalLabel">View Activitives</h6>
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="col-lg-12 col-md-12 sub_initiatives">
				<div class="card">
					<div
						class="d-flex flex-column employee_div_body_box activities-box"
						id="activities-box_view"></div>
				</div>
			</div>
		</div>
	</div>
</div>
<!--#END Sub Activitie View -->

<div id="deleteModalinitiative" class="modal fade">
	<div class="modal-dialog modal-confirm">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" data-i18n="Delete">Delete</h4>
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
				<h5 class="confirm-modal-content">Do you really want to delete?</h5>
				<br>
				<div class="form-line right">
					<input type="hidden" id="deleterecordid" /> <input type="hidden"
						id="deleterecordtype" />
					<button type="button" class="btn-default1 btn" data-dismiss="modal"
						aria-label="Close" data-i18n="Cancel">Cancel</button>
					<button type="button"
						class="btn btn-danger confirm-modal-deleteBtn" data-i18n="Delete"
						onclick="handlesubinitiativeeventdelete()">Delete</button>
				</div>
			</div>
		</div>
	</div>
</div>

<jsp:include page="modals/sub_initiative_user_modal.jsp"></jsp:include>
<section class="content" id="section">
	<jsp:include page="template/initiativedet_template.jsp"></jsp:include>
	<div class="initiative_details">
		<div class="container-fluid text-dark bg-white p-0">
			<div id="initiative_details" class="d-flex_name employee_top_section">

			</div>
		</div>

	</div>
	<!---------Initiatives--------->

	<c:if test="${userPrincipal != null}">
		<input id="userPrincipal" type="hidden" name="userPrincipal"
			value="<c:out value="
			${userPrincipal.profile.firstName}" />">
		<input id="userDept" type="hidden" name="userDept"
			value="<c:out value="
			${userPrincipal.profile.department}" />">
	</c:if>
	<c:if test="${pagenumber != null}">
		<input id="pagenumber" type="hidden" name="pagenumber"
			value="<c:out value=" ${pagenumber}" />">
	</c:if>
	<!-------Sub Initiatives------->
	<div class="row row-padding m-0">
		<jsp:include page="modals/sub_initiative_view.jsp"></jsp:include>
		<jsp:include page="modals/subinitiatives_modal.jsp"></jsp:include>
	    <jsp:include page="modals/activities_modal.jsp"></jsp:include>
		<jsp:include page="modals/subactivities_modal.jsp"></jsp:include>
		<jsp:include page="template/subinitiatives.jsp"></jsp:include>
		<jsp:include page="modals/initiative_activities_user_modal.jsp"></jsp:include>
		<jsp:include page="template/subinitiativesparent.jsp"></jsp:include>

		<div class="col-lg-4 col-md-6 sub_initiatives"
			id="subinitiative_initial_template">
			<div class="d-flex flex-column employee_div_body_box sub-ini-box"
				id="sub-ini-box_view"></div>
		</div>

		<!---------Chart-------->
		<jsp:include page="template/intiatives_chart.jsp"></jsp:include>
		<!---------Chart-------->
		<div class="col-lg-8 col-md-8 sub_initiatives" id="chartdiv_ini">

		</div>

		<!-- Tasks-->
		<jsp:include page="modals/task_modal.jsp"></jsp:include>
		<jsp:include page="template/tasks.jsp"></jsp:include>
		<jsp:include page="template/tasks_template.jsp"></jsp:include>
		<div class="col-lg-4 col-md-6 sub_initiatives" id="tasks"></div>

		<!---------MileStones-------->
		<jsp:include page="template/milestone.jsp"></jsp:include>
		<jsp:include page="template/milestones_row_template.jsp"></jsp:include>
		<jsp:include page="modals/milestones_modal.jsp"></jsp:include>
		<jsp:include page="modals/milestones_view.jsp"></jsp:include>
		<div class="col-lg-4 col-md-6  sub_initiatives" id="milestones"></div>

		<!-- -----Attachments----- -->
		 <div class="col-lg-4 col-md-6 sub_initiatives" id="attachments"></div>
		
		<!---------comments-------->
		<jsp:include page="template/comments.jsp"></jsp:include>
		<jsp:include page="template/comments_template.jsp"></jsp:include>
		<jsp:include page="modals/initiative_comments_view.jsp"></jsp:include>
		<div class="col-lg-4 col-md-6 sub_initiatives" id="comments"></div>


	</div>

	<jsp:include page="modals/initiative_comments_popup.jsp"></jsp:include>
	<jsp:include page="modals/initiative_commentsreply_popup.jsp"></jsp:include>
</section>
<script src="${contextroot}/js/bundles/amcharts4/core.js"></script>
<script src="${contextroot}/js/bundles/amcharts4/charts.js"></script>
<script src="${contextroot}/js/bundles/amcharts4/animated.js"></script>
<script src="${contextroot}/js/datepickerair.js"></script>
<script src="${contextroot}/js/datepicker.en.js"></script>
<script src="${contextroot}/js/pages/widgets/chart-widget.js"></script>
<script type="text/javascript" src="${contextroot}/js/d3.min.js"></script>
<script src="${contextroot}/js/jquery.treetable.js"></script>
<script src="${contextroot}/js/file-upload.js"></script>

<script>
	var currentEmp = $("#userPrincipal").val();
$(document).on('show.bs.modal', '.modal', function (event) {
    var zIndex = 1040 + (10 * $('.modal:visible').length);
    $(this).css('z-index', zIndex);
    setTimeout(function() {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
});

  $(document).on('click', '#budgetDetailView', function() {
    console.log("click thru");
	if ($(this).hasClass('fa-angle-down')) {
            $(this).removeClass('fa-angle-down').addClass('fa-angle-up');
        } else {
            $(this).removeClass('fa-angle-up').addClass('fa-angle-down');
        }

        // Toggling the other class - replace 'your-toggle-class' with the actual class you want to toggle
        $(".initiative_rating_detailsdown").toggleClass('d-none');
	});
	$('.date_pickers').datepicker({
		language : 'en',
		minDate : new Date(),
		range : true,
		autoClose : true,
		position : "top left",
		todayButton : true,
		onSelect : function(fd) {
			// $('.datepickers-container').hide();
		}
	});

	$('.sub_initative_add_user_popup,.activities_add_user_popup,.initatives_description_popup')
			.modal({
				show : false,
				backdrop : 'static',
				keyboard : false
			});
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

		$('#Initiative_Department,#InitiativeForm #impact').select2({
		  selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
		  dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
		});

		function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
$(document).ready(function() {
  var initiativeId = $("#initative_ID").text().trim();
  $("#initiativeInput").val(initiativeId);
});

$(".dropzone").change(function () {
	console.log("drop")
  readFiles(this);
});
var attachment = [];
var readerValue = "";

function readFiles(input) {
  if (input.files && input.files[0]) {
    file = input.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      readerValue = reader.result;
    };
  }
}
$("#attachementupload").click(function () {
	 if (!$("#attachementuploadfile").val()) {
    $.notify("Error:Kindly upload a file", {
      style: "error",
      className: "graynotify",
    });
    return false;
  }

  var file = $("#attachementuploadfile")[0].files[0];

  if (file == undefined) {
    return false;
  }

  var fileName = file.name;
  const words = fileName.split(".");

  var idindex = 1;
  if (attachment != undefined) {
    if (attachment.length > 0) {
      var array = attachment[attachment.length - 1];
      idindex = array.id;
      idindex++;
    } else {
      idindex++;
    }
  }

  var objvalue = {
    name: words[0],
    type: words[words.length - 1],
    size: bytesToSize(file.size),
    file: readerValue,
    active: 0,
    initiativesId:$("#initative_ID").text(),
    createdBy:currentEmp,
  };

    $.ajax({
      url: "/stratroom/initiativeAttach",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(objvalue),
      success: function (data) {
        console.log("File uploaded successfully");
        location.reload(true);
      },
      error: function (xhr, status, error) {
        console.error("Upload error:", error);
      }
    });
});
</script>
<script src="${contextroot}/js/frappe-gantt.min.js"></script>

<script src="${contextroot}/js/initiative.js"></script>