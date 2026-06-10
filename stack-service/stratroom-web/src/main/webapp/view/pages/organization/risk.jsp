<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page import="com.estrat.web.util.RoleUtil" %>
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
<script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>


    <link href="assets/css/main.css?v0.004" rel="stylesheet">
    <link href="assets/css/responsive.css" rel="stylesheet">
     <link href="assets/css/bootstrap.min.css" rel="stylesheet">
	   <link href="assets/css/basic.css?v0.006" rel="stylesheet">

     <!-- Font Awsome Icons -->
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
</head>
<style>
	.select2-container--open {
        z-index: 99999 !important;
        /* Ensure this is higher than the modal's z-index */
    }
	   .bar-chart .title {
  font-size: 13px;
  line-height: 1.3;
  font-weight: 400;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
.bar-chart .text-muted {
  font-size: 11px;
  font-weight: 500;
}

.initiatives-bar .list-group-item.popup {
  grid-template-columns: 1fr;
}

.status-bg-red {
  color: #fff !important;
  background-color: RGBA(220, 53, 69) !important;
}

.status-bg-orange {
  color: #000 !important;
  background-color: RGBA(253, 126, 20) !important;
}
.status-bg-green {
  color: #fff !important;
  background-color: RGBA(25, 135, 84) !important;
}
.status-bg-yellow {
  color: #000 !important;
  background-color: RGBA(255, 193, 7) !important;
}

.status-bg-lime-green {
  color: #000 !important;
  background-color: RGBA(126, 217, 87) !important;
}

.status-bg-sky-blue {
  color: #000 !important;
  background-color: RGBA(92, 225, 230) !important;
}
.popover{
position: absolute;
    inset: 0px auto auto 0px;
    margin: 0px;
    transform: translate(0px, 85.5556px);
}
.btn-title .col {
    opacity: 1 !important;
    color: inherit !important; /* keep the original text color */
}
.btn-title:hover .col {
    opacity: 1 !important;
    color: inherit !important;
}

.audit-box {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 0.2rem;
    font-size: 12px;
}
</style>


	<body class="light">
	<input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
		<!-- Page Loader -->
		<jsp:include page="../common/top-navigation.jsp"></jsp:include>
		  <header id="header" class="header shadow-sm">
	  
		<jsp:include page="../common/left-navigation.jsp"></jsp:include>
    </header>
		<!-- #Top Bar -->
		<div>
			<jsp:include page="modal/riskActivitiesModal.jsp"></jsp:include>
			<jsp:include page="modal/riskActionModal.jsp"></jsp:include>
			<jsp:include page="modal/riskTreatmentModal.jsp"></jsp:include>
			<jsp:include page="modal/riskPlanModal.jsp"></jsp:include>
			<jsp:include page="modal/riskMonitoringModal.jsp"></jsp:include>
			<jsp:include page="modal/riskDetailModal.jsp"></jsp:include>
			<jsp:include page="modal/CauseAndConsequenceModal.jsp"></jsp:include>
			<jsp:include page="modal/CauseAndConseqSubModal.jsp"></jsp:include>

      <div class="modal custom-modal custom-delete-modal fade" id="deleteModalrisk" data-bs-backdrop="static"
data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" style="--stratroom-modal-width:320px">
    <div class="modal-content">
        <div class="modal-body">
            <div class="card custom-card delete-card border-0">
                <div class="card-body">

                    <div class="delete-box">
                        <h4 class="title">Do you really want to delete?</h4>
                        <div class="btn-wrap">
                          	<input type="hidden" id="deleterecordid" /> <input
									type="hidden" id="deleterecordtype" />
                            <button type="button" class="btn btn-sm btn-label-secondary rounded-pill"
                                data-bs-dismiss="modal" aria-label="Close">
                                Cancel
                            </button>
                            <button class="btn btn-sm btn-danger rounded-pill" value="Yes" onclick="handleriskeventdelete()">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
</div>
<div class="modal custom-modal custom-delete-modal fade" id="delete_popup_reply" data-bs-backdrop="static"
data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" style="--stratroom-modal-width:320px">
    <div class="modal-content">
        <div class="modal-body">
            <div class="card custom-card delete-card border-0">
                <div class="card-body">

                    <div class="delete-box">
                        <h4 class="title">Do you really want to delete?</h4>
                        <div class="btn-wrap">
                          <input type="hidden" id="deleterecordid" /> <input
									type="hidden" id="deleterecordtype" />
                            <button type="button" class="btn btn-sm btn-label-secondary rounded-pill"
                                data-bs-dismiss="modal" aria-label="Close">
                                Cancel
                            </button>
                            <button class="btn btn-sm btn-danger rounded-pill" value="Yes" onclick="deleteReplyRisk()">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
</div>
			<div id="delete_popup_reply" class="modal fade">
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
								
								<button type="button" class="btn-default1 btn"
									data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
								<button type="button"
									class="btn btn-danger confirm-modal-deleteBtn"
									onclick="deleteReplyRisk()">Delete</button>
							</div>
						</div>
					</div>
				</div>
			</div>
	<div  class="modal custom-modal fade chart_view_popup" data-bs-backdrop="static" data-bs-keyboard="false"
     tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-modal="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">View Heat Map</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="card border-0">
          <div class="card-body">
							<div id="chart_modal" class="chartviewtemplatediv" style="width:100%; height:320px;"></div>
						</div>
					</div>
				</div>
			</div>

		</div>
    </div>
		
		<jsp:include page="templates/risk_sidebar_template.jsp"></jsp:include>
	
		<div style="--stratroom-offcanvas-width: 280px;"
    class="offcanvas offcanvas-toggle offcanvas-start initiative_sidebar offcanvasSettings border-0 shadow-lg" data-bs-scroll="true"
    data-bs-backdrop="false" tabindex="-1" id="initiative_sidebar offcanvasSettings" aria-labelledby="offcanvasSettingsLabel">
<input type="hidden" id="ischeckriskurlornot" value="RISK">
    <div class="offcanvas-toggle-menu shadow toggle-right">
      <button id="toggleButton" class="btn p-0" data-bs-toggle="offcanvas" data-bs-target=".offcanvasSettings"
        aria-controls="offcanvasSettings">
        <i class="fas fa-caret-right"></i>
      </button>
      <button class="btn p-0" data-bs-dismiss="offcanvas" aria-label="Close">
        <i class="fas fa-caret-left"></i>
      </button>
    </div>

    <div class="offcanvas-header border-bottom justify-content-between gap-3">
      <h5 class="offcanvas-title text-uppercase fs-6 fw-bold" id="offcanvasSettingsLabel" data-translate = "Risk Register">Risk Register</h5>
      <div class="page-icons">
        <ul>
          
          <li>
            <a href=".riskDetail_description_popup" data-bs-toggle="modal" contenteditable="false" style="cursor: pointer;">
              <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add" onclick="handleRiskDetailEvent(0,'add')">
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
            <a href="" target="_blank"  class="exceldownloadlink" contenteditable="false" style="cursor: pointer;">
              <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Export">
              <img src="/stratroom/images/export-i.svg" width="12" height="12" alt="export" title="export">
            </span>
            </a>
          </li>
        </ul>
      </div>

    
      <!-- <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button> -->
    </div>
<div class="offcanvas-tab d-flex justify-content-between align-items-center gap-2 border-bottom px-3 pt-2 bg-light">
        <div id="popoverFilterRiskCategory" style="margin-left: -20px;">
  <span type="button" class="btn btn-sm btn-icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Risk Category">                                    
    <img src="/stratroom/images/filter-i.svg" width="12" height="12" alt="Filter"><strong data-translate = "Filter Risk Category">Filter Risk Category</strong>
  </span>
</div>

            <ul class="nav nav-underline" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link pt-0 pb-1 active" id="RiskListDraft-tab" data-bs-toggle="tab"
                        data-bs-target="#RiskListDraft-tab-pane" type="button" role="tab"
                        aria-controls="RiskListDraft-tab-pane" aria-selected="true" data-translate = "Draft">Draft</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link pt-0 pb-1" id="RiskListApproved-tab" data-bs-toggle="tab"
                        data-bs-target="#RiskListApproved-tab-pane" type="button" role="tab"
                        aria-controls="RiskListApproved-tab-pane" aria-selected="false" data-translate = "Approved">Approved</button>
                </li>

            </ul>
    </div>
 <div class="offcanvas-body">
    <input type="hidden" id="ischeckriskurlornot" value="RISK">
    <div class="tab-content" id="riskTabContent">
      <div class="tab-pane fade show active draftrisk_sidebar" id="RiskListDraft-tab-pane" role="tabpanel"
        aria-labelledby="RiskListDraft-tab">
       <div class="d-grid gap-2 kpis-cards" id="draftrisk_sidebar">
          
            <!-- Draft risks will be injected here -->
 
          </div>
      </div>
      <div class="tab-pane fade" id="RiskListApproved-tab-pane" role="tabpanel"
        aria-labelledby="RiskListApproved-tab">
          <div class="d-grid gap-2 kpis-cards" id="risk_sidebar">
         
  </div>
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
<!-- END File Validate Form -->		
<!-- File Validate Form -->
<div class="modal custom-modal fade file_upload_popupattachment" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
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
                        <p data-translate="Choose a file or Drag Here">Choose a file or drag it here.</p>
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

<style>
  .dropzone-wrapper {
    border: 2px dashed #ddd;
    border-radius: 4px;
    padding: 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .dropzone-wrapper:hover {
    border-color: #aaa;
  }
  
  .dropzone-desc {
    color: #666;
  }
  
  .dropzone-desc i {
    margin-bottom: 0.5rem;
  }
  
  .preview-zone {
    margin-bottom: 1rem;
  }
</style>

<script>
  // Initialize any file upload handlers here
  $(document).ready(function() {
    // File upload preview functionality can be added here
    $('#attachementuploadfile').change(function() {
      // Handle file preview logic
    });
    
    $('#attachementupload').click(function() {
      // Handle file upload logic
    });
  });
</script>
<!-- END File Validate Form -->		
		<main class="pt-3 pb-3">
      <jsp:include page="templates/risk_topdesc_template.jsp"></jsp:include>
      	<c:if test="${userPrincipal != null}">
				<input id="userPrincipal" type="hidden" name="userPrincipal"
					value="<c:out value="
				${userPrincipal.profile.empId}" />">
			</c:if>
			<c:if test="${pagenumber != null}">
				<input id="pagenumber" type="hidden" name="pagenumber"
					value="<c:out value=" ${pagenumber}" />">
			</c:if>
			<input id="userdept" type="hidden" name="userdept" value="${userPrincipal.profile.department}">
        <div class="container-lg">
            <!-------Sub Initiatives------->
            <div class="row g-2">
                <div class="col-12">

                  <div class="accordion card-accordion" id="accordionExample">
                    <div class="card custom-card kpi_page_details accordion-item employee_top_section" id="risk_top_details">
        
                     
                    </div>
                  </div>

                    
                </div>
                 <jsp:include page="templates/cause_consequence_template.jsp"></jsp:include>
                <div class="col-md-4 select-toggle sub_initiatives causenconsequence" id="causeconsequencebody">
                  
                    
                </div>
<!-- cause and consequence view start -->
<div class="modal custom-modal fade cause_conq_view_popup" data-bs-backdrop="static"
data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
  aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">View Cause and Consequence</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
<div class="card border-0">
  <div class="card-body">
        <div class="accordion accordion-flush-risk accordion-custom accordion-collopse-content"
        id="cause-row-box_view">
    
  
      </div>
    </div>
    </div>


      </div>
    </div>
  </div>
</div>

					<!-- cause and consequence view end -->
                <!---------Chart-------->
                <jsp:include page="templates/risk_chart.jsp"></jsp:include>
                <div class="col-md-8 select-toggle sub_initiatives chart " id="chartdiv_risk" >
                    
                </div>

<jsp:include page="templates/risk_reducing_impact.jsp"></jsp:include>              
                <div class="col-md-4 select-toggle sub_initiatives plan" id="riskreducingimpactbody">
                   
                </div>

				<div class="modal custom-modal fade sub_initative_view_popup" data-bs-backdrop="static"
data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
  aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">View Controls</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
<div class="card border-0">
  <div class="card-body">
        <div class="accordion accordion-flush-risk accordion-custom accordion-collopse-content"
        id="subinitiaties-row-box_view">
    
  
      </div>
    </div>
    </div>


      </div>
    </div>
  </div>
</div>
<jsp:include page="templates/risk_treatment_template.jsp"></jsp:include>
                <div class="col-md-4 select-toggle sub_initiatives treatment" id="risktreatmentbody">
                   
                </div>

				<div class="modal custom-modal fade treatment_view_popup" data-bs-backdrop="static"
data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
  aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">View Risk Treatment</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
<div class="card border-0">
  <div class="card-body">
        <div class="accordion accordion-flush-risk accordion-custom accordion-collopse-content"
        id="treatment_view">
    
  
      </div>
    </div>
    </div>


      </div>
    </div>
  </div>
</div>
<jsp:include page="templates/risk_review_template.jsp"></jsp:include>
                <div class="col-md-4 select-toggle sub_initiatives monitoring" id="riskreviewmonitoringbody">
                    
                </div>

<div class="modal custom-modal fade monitoring_view_popup" data-bs-backdrop="static"
data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
  aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">View Review & Monitoring</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
<div class="card border-0">
  <div class="card-body">
        <div class="accordion accordion-flush-risk accordion-custom accordion-collopse-content"
        id="milestone_view">
    
  
      </div>
    </div>
    </div>


      </div>
    </div>
  </div>
</div>
             <!-- Files-->
              <jsp:include page="templates/risk_attachment.jsp"></jsp:include>
         <div class="col-lg-4 col-md-4  attachmentsView attachment" id="riskattachmentbody">
        
        </div>

<jsp:include page="modal/risk_comments_update_popup.jsp"></jsp:include>
					<jsp:include page="modal/risk_commentsreply_update_popup.jsp"></jsp:include>
					<jsp:include page="templates/riskcomments.jsp"></jsp:include>
					<jsp:include page="templates/risk_comments_template.jsp"></jsp:include>
               <!-- Comment Section -->
        <div class="col-lg-4 col-md-4 commentsView comments" id="riskcomments">
      
        </div>
<div class="modal custom-modal fade comments_view_popup" data-bs-backdrop="static"
data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
  aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">View Comments</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
<div class="card border-0">
  <div class="card-body">
        <div class="accordion accordion-flush-risk accordion-custom accordion-collopse-content"
        id="comments-row-box_view">
    
  
      </div>
    </div>
    </div>


      </div>
    </div>
  </div>
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

		<!-- Plugins Js -->
<link href="assets/css/pickr.min.css" rel="stylesheet">
    <link href="assets/css/jquery-ui.min.css" rel="stylesheet">
    <link href="assets/css/select2.min.css" rel="stylesheet" />
     <link href="assets/css/daterangepicker.min.css" rel="stylesheet">
		<script src="${contextroot}/js/app.min.js"></script>
		<script type="text/javascript"
			src="${contextroot}/js/knockout-3.5.0.js"></script>
      <script type="text/javascript"
			src="${contextroot}/js/daterangepicker.min.js"></script>

<script src="${contextroot}/js/datepickerair.js"></script>
<script src="${contextroot}/js/datepicker.en.js"></script>
		<!-- Custom Js -->
     		<script src="${contextroot}/js/jquery-ui.min.js"></script>
		<script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
		<script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
		<script src="${contextroot}/js/admin.js"></script>
		<!-- Knob Js -->
		<script src="${contextroot}/js/moment.js"></script>
		<script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
    	<script src="${contextroot}/js/bundles/amcharts4/core.js"></script>
    	<script src="${contextroot}/js/bundles/amcharts4/charts.js"></script>
    	<script src="${contextroot}/js/bundles/amcharts4/animated.js"></script>
		<script src="${contextroot}/js/bootstrap-popover-x.js"
			type="text/javascript"></script>
		<script src="${contextroot}/js/chosen.jquery.min.js"></script>
		<script src="${contextroot}/js/widgets.js"></script>	
    <script src="${contextroot}/js/jspdf.umd.min.js"></script>
<script src="${contextroot}/js/jspdf.plugin.autotable.min.js"></script>
		<script type="text/javascript" src="${contextroot}/js/risk.js"></script>
		<script src="${contextroot}/js/handlebars.js"></script>
		<script src="${contextroot}/js/notify.js"></script>
		<script src="${contextroot}/js/apexcharts.js"></script>
		<script src="${contextroot}/js/initial.js"></script>
		<script src="${contextroot}/js/select2.min.js"></script>
 <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
  <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
 <script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>
 
    <script src="https://cdn.jsdelivr.net/npm/jquery-sparkline/jquery.sparkline.min.js"></script>

   

		<script>
	$(".commentReply").click(function () {
		$("#riskComments").hide();
		$("#riskCommentsReply").show();
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

	  $(document).ready(function() {
        function toggleElements() {
            $('.pageViewOption input[type="checkbox"]').each(function() {
                $("." + $(this).val()).toggle($(this).is(':checked'));
                console.log($("." + $(this).val()).toggle($(this).is(':checked')))
            });
        }

        toggleElements(); // Initialize on page load
        $(document).on('click', '.pageViewOption input[type="checkbox"]', toggleElements); // Handle clicks
    });
	$(document).ready(function(){
				
		$('.riskplan_add_user_popup,.riskactivities_add_user_popup').modal({show: false, backdrop: 'static',keyboard: false});
		
    });
     $('.modal-dialog').draggable({
            handle: ".modal-header"
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

  // 1. Create a variable to hold the clean base64 string
// The result looks like "data:application/pdf;base64,JVBERi0x...", so we split at the comma and take the second part [1]
var cleanBase64 = readerValue.split(',')[1];

var objvalue = {
    name: $("#attachmentName").val(),
    type: words[words.length - 1],
    size: bytesToSize(file.size),
    file: cleanBase64, // <-- Use the clean variable here
    active: 0,
    riskId: $("#selectcauseId").val(),
    createdBy: currentEmp,
    fileName: words[0]
};
    $.ajax({
      url: "/stratroom/riskAttach",
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


<script>
  document.addEventListener('DOMContentLoaded', function () {
    const modal = document.querySelector('.riskDetail_description_popup');
    if (modal) {
      modal.addEventListener('hidden.bs.modal', function () {
       
        document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      });
    }
  });


  document.addEventListener('DOMContentLoaded', function () {
    const modal = document.querySelector('.sub_initative_view_popup');
    if (modal) {
      modal.addEventListener('hidden.bs.modal', function () {
       
        document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      });
    }
  });


    document.addEventListener('DOMContentLoaded', function () {
    const modal = document.querySelector('.monitoring_view_popup');
    if (modal) {
      modal.addEventListener('hidden.bs.modal', function () {
       
        document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      });
    }
  });
</script>

</body>