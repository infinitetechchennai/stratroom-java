<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />
<link href="${contextroot}/css/frappe-gantt.css" rel="stylesheet">


    <link href="assets/css/main.css?v0.004" rel="stylesheet">
    <link href="assets/css/responsive.css" rel="stylesheet">
     <link href="assets/css/bootstrap.min.css" rel="stylesheet">
	   <link href="assets/css/basic.css?v0.006" rel="stylesheet">

     <!-- Font Awsome Icons -->
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />


<style>
.initiative-eye-btn::after {
    display: none !important;
}

	.gantt-arrow {
  fill: none;
  stroke: #666;   /* arrow line color */
  stroke-width: 1.5px;
}

.gantt-arrow-head {
  fill: #666;     /* arrowhead color */
}
.status-bg-gray { background-color: #adb5bd !important; color: #fff; }
.status-bg-blue { background-color: #0d6efd !important; color: #fff; }
.status-bg-green { background-color: #28a745 !important; color: #fff; }
.status-bg-red { background-color: #dc3545 !important; color: #fff; }
.status-bg-orange { background-color: #fd7e14 !important; color: #fff; }
.status-bg-yellow { background-color: #ffc107 !important; color: #000; }

  .progress-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
  padding: 30px;
  background: #fff;
}

.progress-item {
  text-align: center;
}

.pie-chart {
  width: 32px;      /* Increased from 32px */
  height: 32px;     /* Increased from 32px */
  position: relative;
  margin-bottom: 15px;
}

.pie-chart::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid #f0f0f0; /* Reduced from 6px */
  z-index: 1;
}

.pie-prog {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #ffc107; /* fallback */
  transform: rotate(-90deg);
  transform-origin: center;
  transition: transform 1s ease-out;
  z-index: 2;
}

.progress-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10px;
  font-weight: bold;
  color: #333;
  line-height: 1;
}

.progress-label {
  font-size: 12px;
  color: #555;
  margin-top: 8px;
}
.userprofileimage {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #ddd; /* default color */
  color: #fff;
  font-weight: bold;
  font-size: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  position: relative;
}

/* Display initials from data-name when no src */
.userprofileimage[data-name]::before {
  content: attr(data-name);
}
.list-group {
  max-height: none !important;
  margin-bottom: 0 !important;
  overflow: visible !important;
  border: none !important;
}
</style>


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
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="chevron-left" style="width: 14px; height: 14px;" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"></path></svg>
    </button>
    <button class="btn p-0" data-bs-dismiss="offcanvas" aria-label="Close">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="chevron-left" style="width: 14px; height: 14px;" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"></path></svg>
    </button>
  </div>

  <!-- Header -->
  <div class="offcanvas-header border-bottom justify-content-between gap-3">
    <h5 class="offcanvas-title text-uppercase fs-6 fw-bold" id="offcanvasSettingsLabel" data-translate = "Initiatives & Projects">
      Initiatives & Projects
    </h5>

	   <div class="page-icons">
        <ul>
    
          <li>
            <a href=".initatives_description_popup" data-bs-toggle="modal" contenteditable="false" style="cursor: pointer;" onclick="handleinitiativeevent('{{id}}', 'add')">
              <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="plus" style="width: 14px; height: 14px;" class="lucide lucide-plus"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
              </span>
            </a>
          </li>
          <li>
            <a href="#file-validate-form" data-bs-toggle="modal" contenteditable="false" style="cursor: pointer;">
              <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Import">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="import" style="width: 14px; height: 14px;" class="lucide lucide-import"><path d="M12 3v12"></path><path d="m8 11 4 4 4-4"></path><path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"></path></svg>
              </span>
            </a>
          </li>
          <li>
            <a href="" target="_blank" class="exceldownloadlink"  style="cursor: pointer;">
              <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Export">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="file-up" style="width: 16px; height: 16px;" class="lucide lucide-file-up"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M12 12v6"></path><path d="m15 15-3-3-3 3"></path></svg>
              </span>
            </a>
          </li>
        </ul>
      </div>
  </div>

  <!-- Filter bar -->
  <div class="offcanvas-tab d-flex justify-content-between align-items-end gap-2 border-bottom px-3 ps-2 pt-2 bg-light">
    <div id="popoverFilterInitiativesCategory">
       <span type="button" class="btn btn-sm btn-icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
            title="Initiatives Category">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="funnel" style="width: 12px; height: 12px;" class="lucide lucide-funnel"><path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"></path></svg> <strong data-translate="Filter Initiatives Category">Filter Initiatives
              Category</strong>
          </span>
    </div>
  </div>

  <!-- Sidebar body -->
  <div class="offcanvas-body sub_initiatives" id="sub_initiatives">
    <div class="card border-0" style="height: 100%;overflow-y:auto;">
      <div class="card-body p-0" >
		  <div class="d-grid gap-2 kpis-cards" id="initiate_sidebar"></div>
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
<!-- <div class="modal fade file_upload_popup" id="file-validate-form"
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
</div> -->
<!-- END File Validate Form -->
<div class="modal custom-modal fade file_upload_popup"  data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" data-translate="Attachments">Attachments</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="attachmentForm">
          <div class="card border-0">
            <div class="card-body">
              <div class="grid gap-3">
                <!-- Name field -->
                <div class="g-col-12">
                  <div class="form-group">
                    <label for="attachmentName" class="form-label" data-translate="Name">Name</label>
                    <input type="text" class="form-control" name="attachmentName" id="attachmentName" placeholder="Name">
                  </div>
                </div>
                
                <!-- File upload section -->
                <div class="g-col-12">
                  <div class="form-group">
                    <label class="form-label" data-translate="Upload File">Upload File</label>
                    <div class="dropzone-wrapper">
                      <div class="preview-zone d-none">
                        <div class="box box-solid">
                          <div class="box-body"></div>
                        </div>
                      </div>
                      <div class="dropzone-desc">
                        <i class="fas fa-file-upload" style="font-size: 20px;"></i>
                        <p data-translate="Choose a file or Drag Here" >Choose a file or drag it here.</p>
                      </div>
                      <input type="file" name="img_logo" class="dropzone form-control" id="attachementuploadfile" accept=".pdf,.ppt,.jpeg,.xlsx,.doc,.docx">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <input type="text" id="initiativeInput" class="d-none">
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close" data-translate="Cancel">
          Cancel
        </button>
        <button class="btn btn-primary initative_save_btn" id="attachementupload" value="Save" data-translate="Save">
          Save
        </button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade " id="file-validate-form"
	tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
	aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h4 data-i18n="File Upload">File Upload</h4>
				 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
								<input type="file" name="img_logo" class="dropzone"
									accept=".xlsx, .xls, .csv" />
							</div>
							<span id="fileerrorshow" style="color: red; display: none"></span>
						</div>
					</div>
					<div class="col-md-12">
						<hr />
					</div>
					<!-- <div class="col-md-12">
						<div class="form-line right">
							<button class="initative_save_btn" id="next-btn-1"
								style="font-weight: 600;">Next</button>
						</div>
					</div> -->
             <div class="card-footer">
              <div class="d-flex justify-content-between form-line">
                <button class="btn btn-primary initative_save_btn ms-auto" id="next-btn-1" style="margin-left: 427px !important;"> 
                  Next
                </button>
              </div>
            </div>
				</div>

				<div class="row" id="file-validate" style="display: none;">
					<div class="col-md-12 img-center">
						<img id="imagevalidate" src="../images/Not-Verified.png"
							alt="Not-Verified" />
						<div class="error-div">
							<table class="error-table">
								<thead>
									<tr>
										<th style="width: 150px; text-align: center;">SheetName</th>
										<!-- <th style="width: 150px; text-align: -webkit-center;">Owner</th> -->
										<th style="width: 150px; text-align: center;">Row-Number</th>
										<th style="width: 150px; text-align: center;">CellName</th>
										<th style="width: 250px; text-align: center;">Reason</th>
									</tr>

								</thead>
								<tbody class="uploadvalidationSuccess">
									<!-- <tr>
										<td style="width: 150px;">1</td>
										<td>Contain Special Character</td>
									</tr>
									<tr>
										<td style="width: 150px;">3</td>
										<td>Contain Special Character</td>
									</tr>
									<tr>
										<td style="width: 150px;">5</td>
										<td>Contain Special Character</td>
									</tr>
									<tr>
										<td style="width: 150px;">8</td>
										<td>Contain Special Character</td>
									</tr>
									<tr>
										<td style="width: 150px;">10</td>
										<td>Contain Special Character</td>
									</tr>
									<tr>
										<td style="width: 150px;">19</td>
										<td>Contain Special Character</td>
									</tr> -->
								</tbody>
							</table>
						</div>
					</div>
					<div class="col-md-12">
						<hr />
					</div>
					<div class="col-md-12">
						<div class="form-line" id="validateImportHide">
							<!-- <button type="button" class="btn-default1 btn" id="prev-btn1"
										style="font-weight: 600;">Previous</button>
									<button class="initative_save_btn pull-right" id="next-btn-2"
										style="font-weight: 600;">Next</button> -->
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
											<th style="width: 300px; text-align: center;">
												Statististics</th>
											<th style="width: 300px; text-align: center;">Message</th>
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
							<button type="button" class="btn btn-primary initative_save_btn" id="prev-btn2"
								style="font-weight: 600;">Previous</button>
							<button class="btn btn-primary initative_save_btn" id="done-btn"
								style="font-weight: 600;" data-dismiss="modal"
								aria-label="Close">Done</button>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
</div>

<div class="modal fade chart_view_popup" tabindex="-1" role="dialog" aria-labelledby="ganttChartModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl" style="max-width: 95%;">
    <div class="modal-content">
      
      <!-- Modal Header -->
      <div class="modal-header bg-light border-bottom">
        <h5 class="modal-title" id="ganttChartModalLabel" data-translate="View Gantt Chart">View Gantt Chart</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <!-- Modal Body -->
      <div class="modal-body">
        <div class="card shadow-sm">
          
          <!-- Top Controls -->
          <div class="d-flex justify-content-between align-items-center p-3">
            <button onclick="menuToggle()" class="btn btn-outline-secondary btn-sm" data-bs-toggle="tooltip" data-bs-placement="right" title="Collapse Table">
              <i id="toggleIcon" class="fa fa-angle-double-left"></i>
            </button>
            
            <div id="control-view" class="btn-group" role="group" aria-label="View Mode">
              <button type="button" class="btn btn-outline-secondary btn-sm" data-value="Day">D</button>
              <button type="button" class="btn btn-outline-secondary btn-sm" data-value="Week">W</button>
              <button type="button" class="btn btn-outline-secondary btn-sm active" data-value="Month">M</button>
            </div>
          </div>

          <!-- Content Section -->
          <div class="row g-3 px-3 pb-3">
            <!-- Collapsible Table -->
            <div class="col-md-4" id="TreeTable" hidden>
              <div class="table-responsive border rounded">
                <table id="ganttChartTable" class="table table-bordered w-100">
                  <thead class="table-light">
                    <tr>
                      <th>Task Name</th>
                      <th class="text-center">Start Date</th>
                      <th class="text-center">End Date</th>
                      <th class="text-center">Owner</th>
                    </tr>
                  </thead>
                  <tbody id="ganttchart_table">
                    <!-- Rows dynamically injected -->
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Gantt Chart -->
            <div class="col-md-12" id="FrappeGantt">
              <div id="chart_modal" class="chartviewtemplatediv border rounded p-2" style="min-height: 400px;"></div>
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

<!-- <div id="deleteModalinitiative" class="modal fade">
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
</div> -->
<div class="modal custom-modal custom-delete-modal fade" id="deleteModalinitiative" data-bs-backdrop="static"
        data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" style="--stratroom-modal-width:320px">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="card custom-card delete-card border-0">
                        <div class="card-body">
<input type="hidden" id="deleterecordid" /> <input type="hidden"
						id="deleterecordtype" />
                            <div class="delete-box">
                                <h4 class="title">Do you really want to delete?</h4>
                                <div class="btn-wrap">
                                    <button type="button" class="btn btn-sm btn-label-secondary rounded-pill"
                                        data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                    <button class="btn btn-sm btn-danger rounded-pill" onclick="handlesubinitiativeeventdelete()">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
<jsp:include page="modals/sub_initiative_user_modal.jsp"></jsp:include>
  <main class="pt-3 pb-3">
    <div class="container-lg">
		<jsp:include page="template/initiativedet_template.jsp"></jsp:include>
      <!---------Initiatives--------->
      <div class="row g-2">
        <div class="col-12">

          <div class="accordion card-accordion" id="accordionExample">
            <div class="card custom-card kpi_page_details accordion-item employee_top_section" id="initiative_details">
             
            </div>
          </div>


        </div>

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
<jsp:include page="modals/sub_initiative_view.jsp"></jsp:include>
		<jsp:include page="modals/subinitiatives_modal.jsp"></jsp:include>
	    <jsp:include page="modals/activities_modal.jsp"></jsp:include>
		<jsp:include page="modals/subactivities_modal.jsp"></jsp:include>
		<jsp:include page="template/subinitiatives.jsp"></jsp:include>
		<jsp:include page="modals/initiative_activities_user_modal.jsp"></jsp:include>
		<jsp:include page="template/subinitiativesparent.jsp"></jsp:include>



        <div class="col-md-4 subInitiativeActivities" id="subinitiative_initial_template">
        
        </div>

<!---------Chart-------->
		<jsp:include page="template/intiatives_chart.jsp"></jsp:include>
		<!---------Chart-------->
       <div class="col-md-8 sub_initiatives select-toggle chart" id="chartdiv_ini">
        </div>
      <!-- Tasks-->
		<jsp:include page="modals/task_modal.jsp"></jsp:include>
		<jsp:include page="template/tasks.jsp"></jsp:include>
		<jsp:include page="template/tasks_template.jsp"></jsp:include>
        <div class="col-lg-4 col-md-4 task-show" id="tasks">
         
        </div>
		<jsp:include page="template/milestone.jsp"></jsp:include>
		<jsp:include page="template/milestones_row_template.jsp"></jsp:include>
		<jsp:include page="modals/milestones_modal.jsp"></jsp:include>
		<jsp:include page="modals/milestones_view.jsp"></jsp:include>

        <div class="col-md-4 milestones" id="milestones">

        </div>

         <!-- Files-->
         <div class="col-lg-4 col-md-6 files" id="attachments">
        
        </div>
		<jsp:include page="template/comments.jsp"></jsp:include>
		<jsp:include page="template/comments_template.jsp"></jsp:include>
		<jsp:include page="modals/initiative_comments_view.jsp"></jsp:include>
        <!-- Comment Section -->
        <div class="col-lg-4 col-md-6 comments-show " id="comments">
        
        </div>
      </div>
    </div>
  </main>
  <footer class="col-12 text-center py-2 copyright">
    <p class="mb-0">Copyright &copy; <span id="year"></span> <strong>StratRoom</strong></p>

    <script>
      document.getElementById("year").textContent = new Date().getFullYear();
    </script>

  </footer>

  <script src="${contextroot}/js/jspdf.umd.min.js"></script>
  <script src="${contextroot}/js/jspdf.plugin.autotable.min.js"></script>
<script src="${contextroot}/js/bundles/amcharts4/core.js"></script>
<script src="${contextroot}/js/bundles/amcharts4/charts.js"></script>
<script src="${contextroot}/js/bundles/amcharts4/animated.js"></script>
<script src="${contextroot}/js/datepickerair.js"></script>
<script src="${contextroot}/js/datepicker.en.js"></script>
<script src="${contextroot}/js/pages/widgets/chart-widget.js"></script>
<script type="text/javascript" src="${contextroot}/js/d3.min.js"></script>
<script src="${contextroot}/js/jquery.treetable.js"></script>
<script src="${contextroot}/js/file-upload.js"></script>
  <script src="assets/js/paging.js"></script>
 <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
  <script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery-sparkline/jquery.sparkline.min.js"></script>
  
<script src="${contextroot}/js/jquery.sparkline.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js"></script>
  <script type="text/javascript"
    src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>

  

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
function generateUniqueFileReference() {
    var timestamp = new Date().getTime();
    var random = Math.random().toString(36).substring(2, 15);
    return timestamp + '_' + random;
}
var attachment = [];
var uniqueFileReference = generateUniqueFileReference();

var readerValue = null; // Global to hold base64 content
var selectedFile = null; // Global to hold the file object

// 1. Read file on change (store file + extract base64)
function readFiles(input) {
  if (input.files && input.files[0]) {
    selectedFile = input.files[0]; // Store file for later use
    
    var reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    
    reader.onload = function () {
      // ✅ Get ONLY Base64 content (no "data:..." prefix)
      readerValue = reader.result.split(',')[1];
    };
    
    reader.onerror = function() {
      $.notify("Error reading file", { style: "error", className: "graynotify" });
      readerValue = null;
    };
  }
}

// 2. Bind change event to file input (call readFiles when file is selected)
$("#attachementuploadfile").on('change', function() {
  readFiles(this);
});
// MIME type mapping for common extensions
const mimeTypes = {
  pdf: "application/pdf",
  json: "application/json",
  txt: "text/plain",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  zip: "application/zip",
  mp4: "video/mp4",
  mp3: "audio/mpeg",
  csv: "text/csv",
  html: "text/html",
  xml: "application/xml"
};

// Helper to get MIME type from filename
function getMimeType(fileName) {
  const ext = fileName.split(".").pop()?.toLowerCase();
  return mimeTypes[ext] || "application/octet-stream"; // fallback
}
// 3. Upload button click handler
$("#attachementupload").click(function () {
  // Validate: check if file was actually selected AND read
  if (!selectedFile || !readerValue) {
    $.notify("Error: Kindly upload a file", {
      style: "error",
      className: "graynotify",
    });
    return false;
  }

var file = selectedFile;
var fileName = file.name;
const words = fileName.split(".");

var objvalue = {
  name: $("#attachmentName").val(),
  fileName: words[0],
  type: getMimeType(fileName),  // ✅ Now returns "application/pdf", etc.
  size: bytesToSize(file.size),
  file: readerValue,
  uniqueFileReference: generateUniqueFileReference(),
  active: 0,
  initiativesId: $("#initative_ID").text(),
  createdBy: currentEmp,
};

  $.ajax({
    url: "/stratroom/initiativeAttach",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(objvalue),
    success: function (data) {
      console.log("File uploaded successfully");
      $.notify("Upload successful!", { style: "success", className: "graynotify" });
      location.reload(true);
    },
    error: function (xhr, status, error) {
      console.error("Upload error:", error);
      $.notify("Upload failed: " + error, { style: "error", className: "graynotify" });
    }
  });
});

</script>

<script src="${contextroot}/js/frappe-gantt.min.js"></script>

<script src="${contextroot}/js/initiative.js"></script>