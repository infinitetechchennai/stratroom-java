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
<script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>


    <link href="assets/css/main.css?v0.004" rel="stylesheet">
    <link href="assets/css/responsive.css" rel="stylesheet">
     <link href="assets/css/bootstrap.min.css" rel="stylesheet">
	   <link href="assets/css/basic.css?v0.006" rel="stylesheet">

     <!-- Font Awsome Icons -->
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />


<!-- ProcessEnabler Style Start -->
<style>
	.select2 .select2-search--dropdown {
        padding: 3px 2px 0px 0px;
    }
    .select2-container--default .select2-selection--single .select2-selection__rendered {
        height: 38px !important;
        font-size: 14px !important;
    }
    #updated {
        font-size: 15px !important;
    }
    #filess {
        font-size: 15px !important;
    }
    #activity {
        font-size: 15px !important;
    }
    .activated {
        border-bottom: 5px solid rgb(140, 140, 148);
    }
    .select2-results ul li {
        font-size: 14px !important;
    }
    #lblCartCount {
        font-size: 8px;
        background: #4b61ca;
        color: #fff;
        padding: 0px 5px;
        font-weight: 600;
        vertical-align: top;
        margin-left: -10px;
        border-radius: 50%;
        height: 20px;
    }
    #table12 {
        width: 150% !important;
    }
    .select2-container--default .select2-search--dropdown .select2-search__field {
        border: 1px solid #aaa;
        border-radius: 4px !important;
        font-size: 14px !important;
    }
    .select2-container .select2-selection--single {
        height: 38px !important;
        border-radius: 4px !important;
    }
    .select2-selection--single .select2-selection__rendered {
        line-height: 38px;
    }
    .select2-container--default .select2-selection--single .select2-selection__arrow {
        height: 38px !important;
    }
    .select2-container--default .select2-selection--single .select2-selection__rendered {
        color: #444;
        font-size: 14px !important;
        line-height: 38px !important;
    }
    input.select2-search__field {
        height: 38px !important;
        font-size: 14px !important;
        font-weight: normal !important;
    }
    .select2-selection--single {
        border: 1px solid #ced4da !important;
        border-radius: 4px !important;
        font-size: 14px !important;
    }
</style>
<!-- ProcessEnabler Style End -->
  </head>

  <body class="light">
  <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
		<input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
		<jsp:include page="../common/top-navigation.jsp"></jsp:include>
		  <header id="header" class="header shadow-sm">
	  
		<jsp:include page="../common/left-navigation.jsp"></jsp:include>
    </header>
      <div class="modal fade file_upload_popup" id="file-validate-form"
			tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
			aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered modal-lg">
				<div class="modal-content">
					<div class="modal-header" style="height:45px !important;padding: 10px 16px 10px 16px !important;margin: -10px -10px 12px -10px !important;">
						<h4 style="color: #fff;">File Upload</h4>
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
								<div class="">
									<label for="risk_rating"
										style="font-size: 14px; font-weight: 600;"> Import
										Category</label> <select id="uploadcategory" name="category"
										class="form-control browser-default" style="height:30px !important;">
										<option value="">Choose</option>
										<option value="Organisation">Organisation</option>
										<option value="Scorecard">Scorecard</option>
										<option value="Initiative & Projects">Initiatives & Projects</option>
										<option value="Risk">Risk</option>
										<option value="ProjectFormulation">Project Formulation</option>
										<option value="RiskFormulation">Risk Formulation</option>
										<option value="StrategyFormulation">Strategy Formulation</option>
										<option value="UserRole">User</option>
									</select> <span id="categoryerrorshow" style="color: red; display: none"></span>
								</div>

								<div class="">
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

   <main class="pt-2 pb-2">
		<c:if test="${pageId != null}">
        <input id="pagenumber" type="hidden" name="pagenumber" value="<c:out value="${pageId}" />">
    </c:if>
        <div class="container-lg">
            <div class="page-header grid gap-2 pb-1">
                <div class="g-col-8 d-flex align-items-center">
                    <h4 class="title">
                        <span class="icon">
                            <img src="/stratroom/images/process-enabler-i.svg" alt="control-panel" title="control-panel">
                        </span>
                         Process Enabler
                    </h4>
                </div>
                <div class="load-page page-actions g-col-4">
					<select class="btn btn-custom-secondary pull-right" id="approvedDraft" style="border-radius: 5px;border: 1px solid #dddd;"> 
                       <option value="APPROVED">Approved</option>
                       <option value="DRAFT">In Progress</option>
                    </select>
                       <input type="hidden" id="changeId" name="changeId" value="">
                    <div class="page-icons">
                        <ul>
                            <li>
                                <!-- <span >
                                    <i class="fas fa-eye" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                        title="View"></i>
                                </span> -->
                                <a href="#" class="action" id="popoverFilter">
                                    <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="View">
                                        <img src="/stratroom/images/view-i.svg" />
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="icon"  data-bs-toggle="tooltip" data-bs-placement="bottom"
                                    data-bs-title="Export">
                                    <img src="/stratroom/images/export-i.svg" alt="export" title="export">
                                </span>
                                </a>
                            </li>
                            <li>
                                <a href=".pos_description_popup" data-bs-toggle="modal">
                                    <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                                    <i class="fas fa-plus title_edit_icon"></i>
                                    </span>
                                </a>
                            </li>
                        </ul>
							
                    </div>
				
                </div>
            </div>
        </div>
            <div class="container-lg py-2">
            <div class="rpo-container">
                <div class="row g-2">
                    <div class="col-12">
                        <div class="card table-card border">
                            <div
                                class="card-header border-0 bg-transparent pb-0 d-flex gap-2 align-items-center justify-content-between">
                                <h5 class="card-title fs-6 mb-0">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">Business Impact
                                        Analysis</strong>
                                </h5>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive" id="processenabler_table">
                                   
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
    
    <input type="hidden" id="changeId" name="changeId" value="">

<div class="modal fade pos_description_popup" tabindex="-1" role="dialog"
    aria-labelledby="biaModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header bg-light">
                <h5 class="modal-title" id="biaModalLabel">Business Impact Analysis</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="objectiveposForm">
                    <div class="row g-3">
                        <!-- Row 1 -->
                        <div class="col-md-6">
                            <label for="saveproductService" class="form-label">Product/Services</label>
                            <select class="form-control form-select productService productinput" id="saveproductService">
                                <option value="">Select</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="saveprocessService" class="form-label">Process (POS)</label>
                            <select class="form-control form-select processService int-status-multi-select" id="saveprocessService"  multiple>
                            </select>
                        </div>

                        <!-- Row 2 -->
                        <div class="col-md-6">
                            <label for="savesubprocessService" class="form-label">Sub Process (Activities in POS)</label>
                            <select class="form-control form-select subprocessService int-status-multi-select" id="savesubprocessService"  multiple>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="classificationService" class="form-label">Classification</label>
                            <select class="form-control form-select classificationService selectFieldEmpty" id="classificationService">
                                <option value="">Select</option>
                                <option value="After Trading Hour">After Trading Hour</option>
                                <option value="Before Trading Hour">Before Trading Hour</option>
                                <option value="Trading Time">Trading Time</option>
                            </select>
                        </div>

                        <!-- Row 3: Working Time -->
                        <div class="col-md-3">
                            <label for="timestartselect" class="form-label">Working Time Start</label>
                            <input type="time" class="form-control timestartselect" id="timestartselect" name="kpi_start_end_date" />
                        </div>
                        <div class="col-md-3">
                            <label for="timeendselect" class="form-label">Working Time End</label>
                            <input type="time" class="form-control timeendselect" id="timeendselect" />
                        </div>
                        <div class="col-md-6">
                            <label for="amountService" class="form-label">Amount Service</label>
                            <input type="text" class="form-control amountService" id="amountService" />
                        </div>

                        <!-- Row 4 -->
                        <div class="col-md-6">
                            <label for="frequencyService" class="form-label">Frequency</label>
                            <select class="form-control form-select frequencyService" id="frequencyService">
                                <option value="">Select</option>
                                <option value="Harian">Harian</option>
                                <option value="Mingguan">Mingguan</option>
                                <option value="Bulanan">Bulanan</option>
                                <option value="Insidentil">Insidentil</option>
                                <option value="Kuartalan">Kuartalan</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="savetechnologyService" class="form-label">Technology</label>
                            <select class="form-control form-select technologyService int-status-multi-select" id="savetechnologyService"  multiple>
                            </select>
                        </div>

                        <!-- Row 5 -->
                        <div class="col-md-6">
                            <label for="saveinputsService" class="form-label">Input (Vital Record)</label>
                            <select class="form-control form-select inputsService int-status-multi-select" id="saveinputsService"  multiple>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="saveoutputsService" class="form-label">Output (Vital Record)</label>
                            <select class="form-control form-select outputService int-status-multi-select" id="saveoutputsService"  multiple>
                            </select>
                        </div>

                        <!-- Row 6: People -->
                        <div class="col-md-6">
                            <label for="savepeopleInternalService" class="form-label">People - Internal</label>
                            <select class="form-control form-select peopleInternalService int-status-multi-select" id="savepeopleInternalService"  multiple>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="savepeopleExternalService" class="form-label">People - External</label>
                            <select class="form-control form-select peopleExternalService " id="savepeopleExternalService" >
                            </select>
                        </div>

                        <!-- Row 7 -->
                        <div class="col-md-6">
                            <label for="finalMaoService" class="form-label">Final MAO</label>
                            <input type="text" class="form-control finalMaoService" id="finalMaoService" />
                        </div>
                        <div class="col-md-6">
                            <label for="rtoService" class="form-label">RTO</label>
                            <input type="text" class="form-control rtoService" id="rtoService" />
                        </div>

                        <!-- Row 8 -->
                        <div class="col-12">
                            <label for="savestrategiesService" class="form-label">Business Strategies and Solutions</label>
                            <select class="form-control form-select strategiesService int-status-multi-select" id="savestrategiesService"  multiple>
                            </select>
                        </div>
                    </div>
                </form>
                 <input type="hidden" id="pageId" name="pagenumber" value="${pagenumber}" />
                <input type="hidden" id="posid" name="posid" />
                <input type="hidden" id="posChangeId" />
                	<input type="hidden" id="poscreatedTime">
			<input type="hidden" id="posupdatedTime">
            </div>
          
            <div class="modal-footer">
                    <button type="button" class="btn btn-secondary secondary-btn" data-bs-dismiss="modal"
                        aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary  initative_save_btn" value="Save" onclick="savePOS()">Save
                    </button>
                    <div class="modal-audit">
                        <h5 class="title">
                            Audit
                        </h5>
                        <div class="audit-listing">
                            <div class="audit-box">
                                <div class="title">Created By :</div>
                                <div  id="nameCreated"></div>
                            </div>
                            <div class="audit-box">
                                <div class="title">Modified By :</div>
                                <div id="nameUpdated"></div>
                            </div>
                            <div class="audit-box">
                                <div class="title">Created Date :</div>
                                <div id="dateCreated"></div>
                            </div>
                            <div class="audit-box">
                                <div class="title">Modified Date :</div>
                                <div id="dateUpdated"></div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</div>

<!-- Update Popup Start -->
<div class="modal fade popupscorecard_description" tabindex="-1" role="dialog"
    aria-labelledby="biaModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header bg-light">
                <h5 class="modal-title" id="biaModalLabel">Business Impact Analysis</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <form id="objectiveForm">
                    <div class="row g-3">
                        <!-- Row 1: ID & Product/Services -->
                        <div class="col-md-6">
                            <label for="updateid" class="form-label">ID</label>
                            <input type="text" class="form-control updateid" id="updateid" readonly />
                        </div>
                        <div class="col-md-6">
                            <label for="productServiceUpdate" class="form-label">Product/Services</label>
                            <select class="form-select productServiceUpdate" id="productServiceUpdate">
                                <option value="">Select</option>
                            </select>
                        </div>

                        <!-- Row 2: Process & Sub Process -->
                        <div class="col-md-6">
                            <label for="processServiceUpdate" class="form-label">Process (POS)</label>
                            <select class="form-select processService int-status-multi-select" id="processServiceUpdate" multiple></select>
                        </div>
                        <div class="col-md-6">
                            <label for="subprocessServiceUpdate" class="form-label">Sub Process (Activities in POS)</label>
                            <select class="form-select subprocessService int-status-multi-select" id="subprocessServiceUpdate" multiple></select>
                        </div>

                        <!-- Row 3: Classification & Working Time -->
                        <div class="col-md-6">
                            <label for="classificationServiceUpdate" class="form-label">Classification</label>
                            <select class="form-select classificationService" id="classificationServiceUpdate">
                                <option value="">Select</option>
                                <option value="After Trading Hour">After Trading Hour</option>
                                <option value="Before Trading Hour">Before Trading Hour</option>
                                <option value="Trading Time">Trading Time</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label for="updatestarttimeselect" class="form-label">Working Time Start</label>
                            <input type="time" class="form-control tim_pickers updatestarttimeselect" id="updatestarttimeselect" />
                        </div>
                        <div class="col-md-3">
                            <label for="updateendtimeselect" class="form-label">Working Time End</label>
                            <input type="time" class="form-control tim_pickers updateendtimeselect" id="updateendtimeselect" />
                        </div>

                        <!-- Row 4: Amount Service & Frequency -->
                        <div class="col-md-6">
                            <label for="amountServiceUpdate" class="form-label">Amount Service</label>
                            <input type="text" class="form-control updateamountserviceselect" id="amountServiceUpdate" />
                        </div>
                        <div class="col-md-6">
                            <label for="frequencyServiceUpdate" class="form-label">Frequency</label>
                            <select class="form-select frequencyService" id="frequencyServiceUpdate">
                                <option value="">Select</option>
                                <option value="Harian">Harian</option>
                                <option value="Mingguan">Mingguan</option>
                                <option value="Bulanan">Bulanan</option>
                                <option value="Insidentil">Insidentil</option>
                                <option value="Kuartalan">Kuartalan</option>
                            </select>
                        </div>

                        <!-- Row 5: Technology & Input -->
                        <div class="col-md-6">
                            <label for="technologyServiceUpdate" class="form-label">Technology</label>
                            <select class="form-select technologyService int-status-multi-select" id="technologyServiceUpdate" multiple></select>
                        </div>
                        <div class="col-md-6">
                            <label for="inputServiceUpdate" class="form-label">Input (Vital Record)</label>
                            <select class="form-select inputsService int-status-multi-select" id="inputServiceUpdate" multiple></select>
                        </div>

                        <!-- Row 6: People Internal & External -->
                        <div class="col-md-6">
                            <label for="internalServiceUpdate" class="form-label">People - Internal</label>
                            <select class="form-select peopleInternalService int-status-multi-select" id="internalServiceUpdate" multiple></select>
                        </div>
                        <div class="col-md-6">
                            <label for="externalServiceUpdate" class="form-label">People - External</label>
                            <select class="form-select peopleExternalService " id="externalServiceUpdate" ></select>
                        </div>

                        <!-- Row 7: Output, Final MAO, RTO -->
                        <div class="col-md-6">
                            <label for="outputServiceUpdate" class="form-label">Output (Vital Record)</label>
                            <select class="form-select outputService int-status-multi-select" id="outputServiceUpdate" multiple></select>
                        </div>
                        <div class="col-md-6">
                            <label for="finalMAOUpdate" class="form-label">Final MAO</label>
                            <input type="text" class="form-control updatefinalMAOselect" id="finalMAOUpdate" />
                        </div>
                        <div class="col-md-6">
                            <label for="rtoUpdate" class="form-label">RTO</label>
                            <input type="text" class="form-control updatertoselect" id="rtoUpdate" />
                        </div>

                        <!-- Row 8: Business Strategies -->
                        <div class="col-12">
                            <label for="strategiesServiceUpdate" class="form-label">Business Strategies and Solutions</label>
                            <select class="form-select strategiesService int-status-multi-select" id="strategiesServiceUpdate" multiple></select>
                        </div>
                    </div>
                </form>

                <!-- Hidden Fields -->
                <input type="hidden" id="createId" />
                <input type="hidden" id="poscreatedTime" />
                <input type="hidden" id="posupdatedTime" />
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary secondary-btn" data-bs-dismiss="modal" aria-label="Close">
                    Cancel
                </button>
                <button class="btn btn-primary initative_save_btn" value="Save" onclick="updatePOS()">Save</button>

                <!-- Audit Section -->
                <div class="modal-audit">
                    <h5 class="title">Audit</h5>
                    <div class="audit-listing">
                        <div class="audit-box">
                            <div class="title">Created By:</div>
                            <div id="nameCreated"></div>
                        </div>
                        <div class="audit-box">
                            <div class="title">Modified By:</div>
                            <div id="nameUpdated"></div>
                        </div>
                        <div class="audit-box">
                            <div class="title">Created Date:</div>
                            <div id="dateCreated"></div>
                        </div>
                        <div class="audit-box">
                            <div class="title">Modified Date:</div>
                            <div id="dateUpdated"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Update Popup End -->

<!-- Delete Popup Start -->
<div class="modal custom-modal custom-delete-modal fade" id="delete_popup" data-bs-backdrop="static"
data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" style="--stratroom-modal-width:320px">
    <div class="modal-content">
        <div class="modal-body">
            <div class="card custom-card delete-card border-0">
                <div class="card-body">

                    <div class="delete-box">
                        <h4 class="title">Do you really want to delete?</h4>
                        <div class="btn-wrap">
                            <button type="button" class="btn btn-sm btn-label-secondary rounded-pill"
                                data-bs-dismiss="modal" aria-label="Close">
                                Cancel
                            </button>
                            <button class="btn btn-sm btn-danger rounded-pill" onclick="deleteService()">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
</div>
<!-- Delete Popup -->


<!-- Plugins Js -->
<link href="assets/css/pickr.min.css" rel="stylesheet">
    <link href="assets/css/daterangepicker.min.css" rel="stylesheet">
    <link href="assets/css/jquery-ui.min.css" rel="stylesheet">
    <link href="assets/css/select2.min.css" rel="stylesheet" />
		<script src="${contextroot}/js/app.min.js"></script>
		<script type="text/javascript"
			src="${contextroot}/js/knockout-3.5.0.js"></script>
<script type="text/javascript"
			src="${contextroot}/js/daterangepicker.min.js"></script>
      <script src="${contextroot}/js/datepickerair.js"></script>
<script src="${contextroot}/js/datepicker.en.js"></script>
    <script src="${contextroot}/js/select2.min.js"></script>

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
    <script src="${contextroot}/js/datepickerair.js"></script>
	<script src="${contextroot}/js/datepicker.en.js"></script>
    <script src="${contextroot}/js/widgets.js"></script>
    <script src="js/exceltemplate.js"></script>
    <script src="${contextroot}/js/notify.js"></script>
    <script src="js/initial.js"></script>

    <!-- multi-select dropdown -->
    <script src="${contextroot}/js/select2.min.js"></script>
    <!-- multi-select dropdown -->

    <!-- multi-select dropdown -->
    <script>
        $(document).ready(function () {
        $(".int-status-multi-select").select2();
         }
       );
        </script>
    <!-- multi-select dropdown -->

<!-- Get the Page Start -->
    <script>
$(document).ready(function () {
    var datePeriod = $('#datePeriod').val();
    console.log(datePeriod,"dateperiod");
var currentEmp = $("#userPrincipal").val();
var pageNo = $('#pagenumber').val();
console.log("pageNo",pageNo);

getpagenameView();

if ($("#userrolename").val() == "Super User" || $("#userrolename").val() == "Admin") {
    if ($("#userPrincipal").val() != $("#userPrincipalnavigate").val()) {
        //$(".subusermenuname").text('Audit Trail');
        if ($(".topmenubreadcrumb").length) {
            $(".topmenubreadcrumb").show();
        }
        if ($(".sidebarNavigate").length) {
            $(".sidebarNavigate").show();
        }
    }
}

function getpagenameView() {
    $.ajax({
        type: "GET",
        url: "/stratroom/pages/" + pageNo,
        async: false,
        success: function (data) {
            if ($("#userPrincipal").val() != $("#userPrincipalnavigate").val()) {
                $("." + data.id).addClass("homepageHighlight");
            }

            if ($(".superusertopmenu").hasClass(data.id)) {
                $(".subusermenuname").text(data.pageName);
            }
        }
    });
}       
});


		$("#open_search").click(function () {
			$(".nav-search").show();
			$("#open_search").hide();
		});

		$("#close_search").click(function () {
			$("#open_search").show();
			$(".nav-search").hide();
		});


		$(function () {
			$("#ca_checkbox").click(function () {
				if ($(this).is(":checked")) {
					$("#ca_input").show();
				} else {
					$("#ca_input").hide();
				}
			});
		});

		$(document).ready(function () {
			$("#kpi_type_select").change(function () {
				var value = $("#kpi_type_select").val();
				if (value == "Currency") {
					$("#currency_input").show();
					$("#currency_input").focus();
				} else {
					$("#currency_input").hide();
				}
			});
		});

		$(document).ready(function () {
			$("#kpi_type_select_1").change(function () {
				var value = $("#kpi_type_select_1").val();
				if (value == "Currency") {
					$("#currency_input_1").show();
					$("#currency_input_1").focus();
				} else {
					$("#currency_input_1").hide();
				}
			});
		});

		$(document).ready(function () {
			$('input[type="checkbox"]').click(function () {
				var inputValue = $(this).attr("value");
				$("." + inputValue).toggle();
			});
		});

		$(".dropdown-hide").on("click", function (e) {
			e.stopPropagation();
		});

		$("#OpenImgUpload").click(function () {
			$("#imgupload").trigger("click");
		});

	
    </script>

	

	<script>
	
		$(document).ready(function () {
			$("#scroll-left").click(function () {
				$(".dashboard-table").animate({ scrollLeft: "-=1000px" }, "slow");
			});

			$("#scroll-right").click(function () {
				$(".dashboard-table").scrollLeft(position)

			});
		})

        // View Button Function
        $(document).ready(function() {
            $('#toggleProduct').change(function() {
                if ($(this).is(':checked')) {
                    $('.viewproduct').show();
                } else {
                    $('.viewproduct').hide();
                }
            }).change();
            $('#toggleProcess').change(function() {
                if ($(this).is(':checked')) {
                    $('.viewprocess').show();
                } else {
                    $('.viewprocess').hide();
                }
            }).change();
            $('#togglesubProcess').change(function() {
                if ($(this).is(':checked')) {
                    $('.viewsubprocess').show();
                } else {
                    $('.viewsubprocess').hide();
                }
            }).change();
            $('#toggleClassification').change(function() {
                if ($(this).is(':checked')) {
                    $('.viewclassification').show();
                } else {
                    $('.viewclassification').hide();
                }
            }).change();
            $('#toggleWorkingtime').change(function() {
            if ($(this).is(':checked')) {
                $('.viewworkingtime').show();
            } else {
                $('.viewworkingtime').hide();
            }
            }).change();

            $('#toggleAmountservice').change(function() {
                if ($(this).is(':checked')) {
                    $('.viewamountservice').show();
                } else {
                    $('.viewamountservice').hide();
                }
            }).change();
            $('#toggleFrequency').change(function() {
                if ($(this).is(':checked')) {
                    $('.viewfrequency').show();
                } else {
                    $('.viewfrequency').hide();
                }
            }).change();

            $('#toggleResource').change(function() {
                if ($(this).is(':checked')) {
                    $('.viewresource').show();
                } else {
                    $('.viewresource').hide();
                }
            }).change();

            $('#toggleOutput').change(function() {
                if ($(this).is(':checked')) {
                    $('.viewoutput').show();
                } else {
                    $('.viewoutput').hide();
                }
            }).change();
            $('#toggleMao').change(function() {
                if ($(this).is(':checked')) {
                    $('.viewmao').show();
                } else {
                    $('.viewmao').hide();
                }
            }).change();
            $('#toggleStrategies').change(function() {
                if ($(this).is(':checked')) {
                    $('.viewstrategies').show();
                } else {
                    $('.viewstrategies').hide();
                }
            }).change();
        });
	</script>

<!-- -----------------------------GET Method----------------------- -->

<script>

// Product/Service
function getProductServiceList() {
    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=Product",
        async: false,
        dataType: 'json',
        success: function (productList) {
            $.ajax({
                url: "/stratroom/retrieveMasterTypes?type=Service",
                async: false,
                dataType: 'json',
                success: function (serviceList) {
                    var combinedList = productList.concat(serviceList);
                    productServiceSelect(combinedList);
                }
            });
        }
    });
}
function productServiceSelect(data) {
    var $select = $('.productService');
    $select.empty();
    $select.append('<option>Select</option>');
    data.forEach(function (list) {
        var value = list.data.productName || list.data.serviceName;
        if (value && value.trim() !== "") {
            var $option = $('<option>', {
                text: value,
                value: value
            });
            $select.append($option);
        }
    });
}
function productServiceSelectUpdate(data) {
    var $select = $('.productServiceUpdate');
    $select.empty();
    $select.append('<option>Select</option>');
    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=Product",
        async: false,
        dataType: 'json',
        success: function (productList) {
            $.ajax({
                url: "/stratroom/retrieveMasterTypes?type=Service",
                async: false,
                dataType: 'json',
                success: function (serviceList) {
                    var combinedList = productList.concat(serviceList);
                    combinedList.forEach(function (list) {
                        var value = list.data.productName || list.data.serviceName;
                        if (value && value.trim() !== "") {
                            var $option = $('<option>', {
                                text: value,
                                value: value
                            });
                            if (value === data) {
                                $option.attr('selected', 'selected');
                            }
                            $select.append($option);
                        }
                    });
                }
            });
        }
    });
}
$('.productService').change(function () {
    var selectedText = $(this).find('option:selected').text();
    console.log(selectedText);
    $(".productinput").val(selectedText);
});

getProductServiceList();

// Process
let processListCache = null;

function getProcesslist() {
    if (processListCache) {
        processSelect(processListCache);
        return;
    }

    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=Process",
        dataType: 'json',
        success: function (response) {
            console.log("Process List:", response);
            processListCache = response;
            processSelect(response);
        },
        error: function (xhr, status, err) {
            console.error("API Error:", err);
        }
    });
}

function processSelect(data) {
    $('.processService').each(function () {
        const $select = $(this);

        if ($select.data('select2')) {
            $select.select2('destroy');
        }

        $select.empty().append('<option value="">Select</option>');

        data.forEach(function (item) {
            const name = item?.data?.processName || item?.processName || '';
            if (name && name.trim()) {
                $select.append($('<option>', { value: name, text: name }));
            }
        });

        $select.select2({
            width: '100%',
            placeholder: 'Select Process',
            allowClear: true,
            dropdownParent: $select.closest('.modal')
        });
    });
}

// Initialize when modal opens
$('.pos_description_popup, .popupscorecard_description')
  .on('shown.bs.modal', getProcesslist);

let subprocessListCache = null;
// Sub Process
function getSubProcesslist() {
     if (subprocessListCache) {
        subProcessSelect(subprocessListCache);
        return;
    }

    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=SubProcess",
        dataType: 'json',
        success: function (response) {
        console.log("subProcess List:", response);
            subprocessListCache = response;
            subProcessSelect(response);
        }
    });
}                
  function subProcessSelect(data) {
 $('.subprocessService').each(function () {
        const $select = $(this);

        if ($select.data('select2')) {
            $select.select2('destroy');
        }

        $select.empty().append('<option value="">Select</option>');

        data.forEach(function (item) {
            const name = item?.data?.subProcessName || item?.subProcessName || '';
            if (name && name.trim()) {
                $select.append($('<option>', { value: name, text: name }));
            }
        });

        $select.select2({
            width: '100%',
            placeholder: 'Select',
            allowClear: true,
            dropdownParent: $select.closest('.modal')
        });
    });
}
$('.pos_description_popup, .popupscorecard_description')
  .on('shown.bs.modal', getSubProcesslist);

// Classification
var classificationData = [
    {
        value: 'After Trading Hour',
        name: 'After Trading Hour'
    },
    {
        value: 'Before Trading Hour',
        name: 'Before Trading Hour'
    },
    {
        value: 'Trading Time',
        name: 'Trading Time'
    },
];
function classificationSelect() {
    var $select = $('.classificationService');
    $select.empty();
    $select.append('<option>Select</option>');
    classificationData.forEach(function(list) {
        var $option = $('<option>', {
            text: list.name,
        });
        $select.append($option);
    });
    console.log(classificationData, 'classificationData');
}
function classificationSelectUpdate(data) {
    var $select = $('.classificationService');
    $select.empty();
    $select.append('<option>Select</option>');
    classificationData.forEach(function(list) {
        var $option = $('<option>', {
            text: list.name,
        });
        if (list.name === data) {
            $option.attr('selected', 'selected');
        }
        $select.append($option);
    });
}
classificationSelect();

//TimeStart & TimeEnd & Amount Service
function getcalculateAmountService(startTimeSelector, endTimeSelector, amountServiceSelector) {
    var Timestart = $(startTimeSelector).val();
    var Timeend = $(endTimeSelector).val();

    if (Timestart && Timeend) {
        var start = Timestart.split(':');
        var end = Timeend.split(':');

        var startHours = parseInt(start[0]);
        var startMinutes = parseInt(start[1]);

        var endHours = parseInt(end[0]);
        var endMinutes = parseInt(end[1]);

        var startTotalMinutes = startHours * 60 + startMinutes;
        var endTotalMinutes = endHours * 60 + endMinutes;

        var diffMinutes = endTotalMinutes - startTotalMinutes;
        if (diffMinutes < 0) {
            diffMinutes += 24 * 60;
        }
        var diffHours = Math.floor(diffMinutes / 60);
        $(amountServiceSelector).val(diffHours);
    }
}
$(document).ready(function () {
    $(".timestartselect, .timeendselect").on('change', function() {
        getcalculateAmountService(".timestartselect", ".timeendselect", ".amountService");
    });
    
    $(".updatestarttimeselect, .updateendtimeselect").on('change', function() {
        getcalculateAmountService(".updatestarttimeselect", ".updateendtimeselect", ".updateamountserviceselect");
    });
});

// frequency
var frequencyData = [
    {
        value: 'harian',
        name: 'Harian'
    },
    {
        value: 'mingguan',
        name: 'Mingguan'
    },
    {
        value: 'bulanan',
        name: 'Bulanan'
    },
    {
        value: 'insidentil ',
        name: 'Insidentil'
    },
    {
        value: 'kuartalan ',
        name: 'Kuartalan'
    },
];
function frequencySelect() {
    var $select = $('.frequencyService');
    $select.empty();
    $select.append('<option>Select</option>');
    frequencyData.forEach(function(list) {
        var $option = $('<option>', {
            text: list.name,
        });
        $select.append($option);
    });
    console.log(frequencyData, 'frequencyData');
}
function frequencySelectUpdate(data) {
    var $select = $('.frequencyService');
    $select.empty();
    $select.append('<option>Select</option>');
    frequencyData.forEach(function(list) {
        var $option = $('<option>', {
            text: list.name,
        });
        if (list.name === data) {
            $option.attr('selected', 'selected');
        }
        $select.append($option);
    });
}
frequencySelect();

// Technology
let technologyListCache = null;

function getTechnologylist() {
    // Use cache if available
    if (technologyListCache) {
        technologySelect(technologyListCache);
        return;
    }

    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=technology",
        dataType: 'json',
        success: function (response) {
            console.log("Technology List:", response);
            technologyListCache = response;
            technologySelect(response);
        },
        error: function (xhr, status, err) {
            console.error("Technology API Error:", err);
        }
    });
}

function technologySelect(data) {
    // Handle all matching selects (in case multiple exist)
    $('.technologyService').each(function () {
        const $select = $(this);

        // Destroy existing Select2 if initialized
        if ($select.data('select2')) {
            $select.select2('destroy');
        }

        // Clear and add placeholder
        $select.empty().append('<option value="">Select</option>');

        // Populate options
        data.forEach(function (item) {
            const name = item?.data?.itName || item?.itName || '';
            if (name && name.trim() !== "") {
                $select.append(
                    $('<option>', {
                        value: name,
                        text: name
                    })
                );
            }
        });

        // Reinitialize Select2 with modal as dropdown parent
        // Reinitialize Select2 inside modal if present
         $select.select2({
            width: '100%',
            placeholder: 'Select',
            allowClear: true,
            dropdownParent: $select.closest('.modal')
        });
    });
}

// Trigger when either modal is opened
$('.pos_description_popup, .popupscorecard_description')
    .on('shown.bs.modal', getTechnologylist);

let inputListCache = null;

// Fetch input processes (cached)
function getInputlist() {
    if (inputListCache) {
        inputSelect(inputListCache);
        return;
    }

    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=Vital",
        dataType: 'json',
        success: function (response) {
            console.log("Vital Input List:", response);
            inputListCache = response;
            inputSelect(response);
        },
        error: function (xhr, status, err) {
            console.error("Vital Input API Error:", err);
        }
    });
}

// Render Select2 dropdown
function inputSelect(data) {
    $('.inputsService').each(function () {
        const $select = $(this);

        // Destroy existing Select2 if initialized
        if ($select.data('select2')) {
            $select.select2('destroy');
        }

        // Clear and add placeholder
        $select.empty().append('<option value="">Select Input</option>');

        // Populate valid options
        data.forEach(function (item) {
            const inputProcess = String(item?.data?.inputProcess || '').trim();
            if (inputProcess !== "") {
                $select.append($('<option>', {
                    value: inputProcess,
                    text: inputProcess
                }));
            }
        });

         $select.select2({
            width: '100%',
            placeholder: 'Select ',
            allowClear: true,
            dropdownParent: $select.closest('.modal')
        });
    });
}

// Load when modal is opened
$('.pos_description_popup, .popupscorecard_description')
    .on('shown.bs.modal', getInputlist);


    let outputListCache = null;

// Fetch output processes (cached)
function getOutputlist() {
    if (outputListCache) {
        outputSelect(outputListCache);
        return;
    }

    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=Vital",
        dataType: 'json',
        success: function (response) {
            console.log("Vital Output List:", response);
            outputListCache = response;
            outputSelect(response);
        },
        error: function (xhr, status, err) {
            console.error("Vital Output API Error:", err);
        }
    });
}

// Render Select2 dropdown
function outputSelect(data) {
    $('.outputService').each(function () {
        const $select = $(this);

        // Destroy existing Select2 instance to avoid duplication
        if ($select.data('select2')) {
            $select.select2('destroy');
        }

        // Clear and add placeholder
        $select.empty().append('<option value="">Select Output</option>');

        // Populate valid options
        data.forEach(function (item) {
            const outputProcess = String(item?.data?.outputProcess || '').trim();
            if (outputProcess !== "") {
                $select.append($('<option>', {
                    value: outputProcess,
                    text: outputProcess
                }));
            }
        });

        // Reinitialize Select2 inside the closest modal
          $select.select2({
            width: '100%',
            placeholder: 'Select ',
            allowClear: true,
            dropdownParent: $select.closest('.modal')
        });
    });
}

// Load data only when modal is opened
$('.pos_description_popup, .popupscorecard_description')
    .on('shown.bs.modal', getOutputlist);


// PeopleInternal
let internalListCache = null;

// Fetch department list (cached)
function getInternallist() {
    if (internalListCache) {
        internalSelect(internalListCache);
        return;
    }

    $.ajax({
        url: "/stratroom/allDepartmentList",
        dataType: 'json',
        success: function (response) {
            console.log("Internal Department List:", response);
            internalListCache = response;
            internalSelect(response);
        },
        error: function (xhr, status, err) {
            console.error("Internal Department API Error:", err);
        }
    });
}

// Render Select2 dropdown
function internalSelect(data) {
    $('.peopleInternalService').each(function () {
        const $select = $(this);

        // Destroy existing Select2 to avoid duplicates
        if ($select.data('select2')) {
            $select.select2('destroy');
        }

        // Clear and add placeholder
        $select.empty().append('<option value="">Select Department</option>');

        // Populate options
        data.forEach(function (item) {
            const name = item?.data?.name || item?.name || '';
            if (name && name.trim() !== "") {
                $select.append($('<option>', {
                    value: name,
                    text: name
                }));
            }
        });

        // Reinitialize Select2
        // Reinitialize Select2 inside modal if present
         $select.select2({
            width: '100%',
            placeholder: 'Select',
            allowClear: true,
            dropdownParent: $select.closest('.modal')
        });
    });
}

// Sync selected TEXT (not values) to hidden input on change
$(document).on('change', '.peopleInternalService', function () {
    const $select = $(this);
    const selectedTexts = $select.find('option:selected')
        .filter('[value!=""]') // exclude placeholder
        .map(function () {
            return $(this).text().trim();
        })
        .get();

    console.log("Selected Internal Texts:", selectedTexts);

    // Assuming .peopleInternalselect is a hidden input (or text input)
    $(".peopleInternalselect").val(selectedTexts.join(', ')); // or JSON.stringify if needed
});

// Load when modal opens
$('.pos_description_popup, .popupscorecard_description')
    .on('shown.bs.modal', getInternallist);

// People External
// People External
let externalListCache = null;

function getExternallist() {
    if (externalListCache) {
        externalSelect(externalListCache);
        return;
    }

    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=Personal",
        dataType: 'json',
        success: function (response) {
            console.log("External List:", response);
            externalListCache = response;
            externalSelect(response);
        },
        error: function (xhr, status, err) {
            console.error("External API Error:", err);
        }
    });
}

function externalSelect(data) {
    $('.peopleExternalService').each(function () {
        const $select = $(this);

        if ($select.data('select2')) {
            $select.select2('destroy');
        }

        $select.empty().append('<option value="">Select External Entity</option>');

        data.forEach(function (item) {
            const name = item?.data?.externalEntity || '';
            if (name && name.trim() !== "") {
                $select.append($('<option>', {
                    value: name,
                    text: name
                }));
            }
        });

        $select.select2({
            width: '100%',
            placeholder: 'Select',
            allowClear: true,
            dropdownParent: $select.closest('.modal') // Ensures dropdown shows inside modal
        });
    });
}

// Sync selected TEXT to hidden input (.updateexternalselect)
$(document).on('change', '.peopleExternalService', function () {
    const $select = $(this);
    const selectedTexts = $select.find('option:selected')
        .filter('[value!=""]')
        .map(function () {
            return $(this).text().trim();
        })
        .get();

    console.log("Selected External Texts:", selectedTexts);

     $(".peopleExternalselect").val(selectedTexts.join(', '));
});
// Load data only when modal is opened
$('.pos_description_popup, .popupscorecard_description')
    .on('shown.bs.modal', getExternallist);


// Business Strategies and Solutions
let strategiesListCache = null;

// Fetch strategies list (cached)
function getStrategieslist() {
    if (strategiesListCache) {
        strategiesSelect(strategiesListCache);
        return;
    }

    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=Process",
        dataType: 'json',
        success: function (response) {
            console.log("Strategies List:", response);
            strategiesListCache = response;
            strategiesSelect(response);
        },
        error: function (xhr, status, err) {
            console.error("Strategies API Error:", err);
        }
    });
}

// Render Select2 dropdown
function strategiesSelect(data) {
    $('.strategiesService').each(function () {
        const $select = $(this);

        // Destroy existing Select2 instance to avoid conflicts
        if ($select.data('select2')) {
            $select.select2('destroy');
        }

        // Clear and add placeholder
        $select.empty().append('<option value="">Select Strategy</option>');

        // Populate options
        data.forEach(function (item) {
            const name = item?.data?.strategies || '';
            if (name && name.trim() !== "") {
                $select.append($('<option>', {
                    value: name,
                    text: name
                }));
            }
        });

        // Reinitialize Select2 inside modal if present
         $select.select2({
            width: '100%',
            placeholder: 'Select',
            allowClear: true,
            dropdownParent: $select.closest('.modal')
        });
    });
}

// Load only when modal is opened
$('.pos_description_popup, .popupscorecard_description')
    .on('shown.bs.modal', getStrategieslist);


// FinalMao & RTO 
$(document).ready(function() {
    function calculateRTO(value) {
        let numValue = parseFloat(value);
        if (!isNaN(numValue)) { 
            return (numValue * 75) / 100; 
        }
        return '';
    }
    $(".finalMaoService").on("input", function() {
        let calculatedValue = calculateRTO($(this).val());
        $(".rtoService").val(calculatedValue);
    });

    $("#finalMAOUpdate").on("input", function() {
        let calculatedValue = calculateRTO($(this).val());
        $("#rtoUpdate").val(calculatedValue);
    });
});



// Totally get Function
$(document).ready(function () {
    getPOSData();
    getProcesslist();
    getSubProcesslist();
    getcalculateAmountService();
    getTechnologylist();
    getInputlist();
    getOutputlist();
    getInternallist();
    getExternallist();
    getStrategieslist();
    })

//---------------------------------------------------------------------------------
// Function to save POS Service
function savePOS() {

    // 🔹 Helper – safe for single & multi select
    function getValueAsString(selector) {
        const val = $(selector).val();
        if (Array.isArray(val)) {
            return val.join(' , ');
        }
        return val || "";
    }

    var productsave        = $(".productinput").val() || "";
    var processsave        = getValueAsString("#saveprocessService");
    var subProcessSave     = getValueAsString("#savesubprocessService");
    var classificationsave = $(".classificationService").val() || "";
    var Timestartsave      = $(".timestartselect").val() || "";
    var Timeendsave        = $(".timeendselect").val() || "";
    var amountServicesave  = $(".amountService").val() || "";
    var frequencysave      = $(".frequencyService").val() || "";
    var technologysave     = getValueAsString("#savetechnologyService");
    var inputssave         = getValueAsString("#saveinputsService");
    var outputsave         = getValueAsString("#saveoutputsService");
    var peopleInternalsave = getValueAsString(".peopleInternalService");
    var peopleExternalsave = getValueAsString(".peopleExternalService");
    var finalMaosave       = $(".finalMaoService").val() || "";
    var rtosave            = $(".rtoService").val() || "";
    var strategiessave     = getValueAsString("#savestrategiesService");
    var pagenumber         = $("#pagenumber").val();

    // 🔹 Normalize "Select"
    if (productsave === "Select") productsave = "";
    if (classificationsave === "Select") classificationsave = "";
    if (frequencysave === "Select") frequencysave = "";

    var POSData = {
        createBy: "",
        deptId: "",
        pageId: pagenumber,
        posValue: {
            productService: productsave,
            process: processsave,
            subProcess: subProcessSave,
            classification: classificationsave,
            workingTimeStart: Timestartsave,
            workingTimeEnd: Timeendsave,
            amountService: amountServicesave,
            frequency: frequencysave,
            technology: technologysave,
            inputs: inputssave,
            output: outputsave,
            peopleInternal: peopleInternalsave,
            peopleExternal: peopleExternalsave,
            finalMao: finalMaosave,
            rto: rtosave,
            businessStrategies: strategiessave
        }
    };

    console.log("POS DATA 👉", POSData);

    $.ajax({
        url: "/stratroom/saveProcessEnabler",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(POSData),
        success: function () {
            location.reload(true);
        },
        error: readErrorMsg
    });
}

//---------------------------------------------------------------------------------
// get all API

function getPOSData() {
    var pageNo = $('#pagenumber').val();
    var datePeriod = $('#datePeriod').val();
    var approvedStatus = $("#approvedDraft").val(); // APPROVED / DRAFT / IN PROGRESS

    $.ajax({
        url: "/stratroom/retrievePoslist?pageId=" + pageNo + "&dateRange=" + datePeriod + "&status=" + approvedStatus,
        type: "GET",
        contentType: "application/json",
         success: function (data, status) {
        console.log(data, "Process");
        $('#processenabler_table').empty();

        var uploadShowData = "";
        var i;
            $.each(data, function (i, List) {
                i++;
                console.log(List,"Process");
                uploadShowData += '<tr>' +
                                // '<td >' + List.id + '</td>' +
                                '<td class="viewproduct">' + List.posValue.productService + '</td>' +
                                '<td class="viewprocess">' + List.posValue.process + '</td>' +
                                '<td class="viewsubprocess">' + List.posValue.subProcess + '</td>' +
                                '<td class="viewclassification">' + List.posValue.classification + '</td>' +
                                '<td class="viewworkingtime">' + List.posValue.workingTimeStart + '</td>' +
                                '<td class="viewworkingtime">' + List.posValue.workingTimeEnd + '</td>' +
                                '<td class="viewamountservice">' + List.posValue.amountService + '</td>' +    
                                '<td class="viewfrequency">' + List.posValue.frequency + '</td>' +
                                '<td class="viewresource">' + List.posValue.technology + '</td>' +
                                '<td class="viewresource">' + List.posValue.peopleInternal + '</td>' +
                                '<td class="viewresource">' + List.posValue.peopleExternal + '</td>' +
                                '<td class="viewresource">' + List.posValue.inputs + '</td>' +
                                '<td class="viewoutput">' + List.posValue.output + '</td>' +
                                '<td class="viewmao">' + List.posValue.finalMao + '</td>' +
                                '<td class="viewrto">' + List.posValue.rto + '</td>' +
                                '<td class="viewstrategies">' + List.posValue.businessStrategies + '</td>' +
                                '<td class="sendApprovalCell"  ><button class="btn btn-custom-secondary pull-right" ' +
                        'onclick="sendApprovalOnce(this,' + List.changeId + ')">' +
                        '<i class="fa fa-check-circle" title="Send To Approval" style="margin-left: -2px;"></i>' +
                        '</button></td>'+ 
                        '<td >' +
                        '<select id="versionDropdown_' + List.id + '" ' +
                        'onchange="getPosVersion(' + List.id + ', this.value)" ' +
                        'style="width: 100px; font-size: 11px;"></select>' +
                    '</td>' +
            // Edit & Delete Popup
            '<td >' + ' <div class="table-actions"><div class="action-btn" href=".popupscorecard_description" data-bs-toggle="modal" onclick="editPOSpage(' + List.id + ')"><span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Edit"> <img src="images/edit-i.svg" width="12" height="12"  /> </span></div> <div class="action-btn" href="#delete_popup"  data-bs-toggle="modal" onclick="deleteData(' + List.id + ')">  <span data-bs-toggle="tooltip" data-bs-placement="bottom"     data-bs-title="Delete"><img src="images/delete-i.svg" width="12" height="12"  /> </span> </div></div>' + '</td>';
  getVersion(List.id);
                                    uploadShowData += '</tr>';
                                    console.log(uploadShowData)
                                });

                                var table = `<table class="table table-bordered" id="myTable">

                                <thead>
                                    <tr>
                                        <th class="position viewproduct" width="130px" id="blue" rowspan="3">Product/Services</th>
                                       
                                        <th class="viewprocess" width="280px" id="blue" rowspan="3">Process (POS)</th>

                                        <th class="viewsubprocess" width="280px" id="blue" rowspan="3">Sub Process (Activities in POS) </th>

                                        <th class="viewclassification" width="280px" id="blue" rowspan="3">Classification</th>
											  
                                        <th class="viewworkingtime" width="190px" id="blue" colspan="2" rowspan="2">Working Time (during normal conditions)</th>   

                                        <th class="viewamountservice" width="280px" id="blue" rowspan="3">Amount Service</th>

                                        <th class="viewfrequency" width="40px" id="blue" rowspan="3">
                                            Frequency</th>

                                        <th class="viewresource" width="400px" id="green" colspan="4">
                                            Resource Support</th>

                                        <th class="viewoutput" width="490px" id="green" rowspan="3">
                                            Output</th>

                                        <th class="viewmao" width="180px " id="moa" rowspan="3">
                                            MAO Final</th>

                                        <th class="viewmao" width="180px " id="moa" rowspan="3">
                                            RTO</th>

                                        <th class="viewstrategies" width="490px" id="moa" rowspan="3">
                                            Strategies and Solutions</th>
							           <th class="sendApprovalHeader" width="120px" id="moa" rowspan="3">Approval Button</th>
						            	<th class="viewmao" width="180px " id="moa"  rowspan="3">Select Version</th>
                                        <th width="40px" id="moa" rowspan="3">
                                            Action</th>
                                    </tr>

                                    <tr>
                                        <th class="viewresource" width="60px" id="green" rowspan="2">Technology
                                        </th>

                                        <th class="viewresource" width="40px" id="green" colspan="2">People</th>

                                        <th class="viewresource" width="40px" id="green" rowspan="2">Input (Vital Record)</th>
                                    </tr>

                                    <tr>
                                <th width="40px" id="blue" class="viewworkingtime">Start</th>
                                <th width="40px" id="blue" class="viewworkingtime">End</th>

                                        <th class="viewresource" width="240px" id="green">Internal
                                        </th>
                                        <th class="viewresource" width="140px" id="green">External
                                        </th>
                                    </tr>
                                    </tr>

                                </thead>

                                <tbody>`+ uploadShowData + `
                                    </tbody>
                                    </table>`

                                 $("#processenabler_table").append(table);
            if (approvedStatus === "DRAFT") {
                $(".sendApprovalCell, .sendApprovalHeader").show();
            } else {
                $(".sendApprovalCell, .sendApprovalHeader").hide();
            }                              
                                $('[rel="tooltip"]').tooltip();
                            },
     error: readErrorMsg
    });
}
             
// 🔄 Refresh on status change
$("#approvedDraft").on("change", function () {
    $("#processenabler_table").empty();
    getPOSData();
});

function getVersion(posId) {
   $.ajax({
        url: "/stratroom/poshistorylist?posId=" + posId + "&version=",
        type: "GET",
        contentType: "application/json",
        success: function (response) {
            console.log("Version response for posId", posId, posId);

            var $dropdown = $("#versionDropdown_" + posId);

            if ($dropdown.length === 0) {
                console.warn("Dropdown not found for posId:", posId);
                return;
            }

            // Clear old options
            $dropdown.empty();
            $dropdown.append($('<option>', { value: '' }).text('Select'));

            // Sort by version (latest first)
            response.sort((a, b) => b.version - a.version);

            // Append versions safely
            response.forEach(function (item, index) {
                console.log("Item.version:", item.version); // should log 2, 1

                var $option = $('<option>', {
                    value: item.version,
                    text: "Version " + item.version,
                    selected: index === 0 // auto-select the latest version
                });

                $dropdown.append($option);
            });
        },
        error: function (err) {
            console.log("Error fetching version for posId:", posId, err);
        }
    });

}

function getPosVersion(eventId, selectedVersion) {
    if (!selectedVersion) return; 

    $.ajax({
        url: "/stratroom/poshistorylist?posId=" + eventId + "&version=" + selectedVersion,
        type: "GET",
        contentType: "application/json",
       success: function (data, status) {
        console.log(data, "Process");
        $('#processenabler_table').empty();

        var uploadShowData = "";
        var i;
            $.each(data, function (i, List) {
                i++;
                console.log(List,"Process");
                uploadShowData += '<tr>' +
                                // '<td >' + List.id + '</td>' +
                                '<td class="viewproduct">' + List.posValue.productService + '</td>' +
                                '<td class="viewprocess">' + List.posValue.process + '</td>' +
                                '<td class="viewsubprocess">' + List.posValue.subProcess + '</td>' +
                                '<td class="viewclassification">' + List.posValue.classification + '</td>' +
                                '<td class="viewworkingtime">' + List.posValue.workingTimeStart + '</td>' +
                                '<td class="viewworkingtime">' + List.posValue.workingTimeEnd + '</td>' +
                                '<td class="viewamountservice">' + List.posValue.amountService + '</td>' +    
                                '<td class="viewfrequency">' + List.posValue.frequency + '</td>' +
                                '<td class="viewresource">' + List.posValue.technology + '</td>' +
                                '<td class="viewresource">' + List.posValue.peopleInternal + '</td>' +
                                '<td class="viewresource">' + List.posValue.peopleExternal + '</td>' +
                                '<td class="viewresource">' + List.posValue.inputs + '</td>' +
                                '<td class="viewoutput">' + List.posValue.output + '</td>' +
                                '<td class="viewmao">' + List.posValue.finalMao + '</td>' +
                                '<td class="viewrto">' + List.posValue.rto + '</td>' +
                                '<td class="viewstrategies">' + List.posValue.businessStrategies + '</td>' +
                                '<td class="" style="text-align: start;padding-left: 10px; cursor: pointer; color: blue; text-decoration: underline;" onclick="getPOSData()">Back</td>'+
            // Edit & Delete Popup
            '<td >' + ` <i class="fas fa-pen" data-toggle="modal"
            data-target=".popupscorecard_description" style="cursor: pointer" onclick="editPOSpage(`+ List.id + `)"></i>
            <i class="fas fa-trash" data-toggle="modal"
                data-target="#delete_popup"
                style="margin-left: 16px" style="cursor: pointer" onclick=" deleteData(`+ List.id + `)"></i>` + '</td>';

                                    uploadShowData += '</tr>';
                                    console.log(uploadShowData)
                                });

                                var table = `<table class="table table-bordered" id="myTable">

                                <thead>
                                    <tr>
                                        <th class="position viewproduct" width="130px" id="blue" rowspan="3">Product/Services</th>
                                       
                                        <th class="viewprocess" width="280px" id="blue" rowspan="3">Process (POS)</th>

                                        <th class="viewsubprocess" width="280px" id="blue" rowspan="3">Sub Process (Activities in POS) </th>

                                        <th class="viewclassification" width="280px" id="blue" rowspan="3">Classification</th>
											  
                                        <th class="viewworkingtime" width="190px" id="blue" colspan="2" rowspan="2">Working Time (during normal conditions)</th>   

                                        <th class="viewamountservice" width="280px" id="blue" rowspan="3">Amount Service</th>

                                        <th class="viewfrequency" width="40px" id="blue" rowspan="3">
                                            Frequency</th>

                                        <th class="viewresource" width="400px" id="green" colspan="4">
                                            Resource Support</th>

                                        <th class="viewoutput" width="490px" id="green" rowspan="3">
                                            Output</th>

                                        <th class="viewmao" width="180px " id="moa" rowspan="3">
                                            MAO Final</th>

                                        <th class="viewmao" width="180px " id="moa" rowspan="3">
                                            RTO</th>

                                        <th class="viewstrategies" width="490px" id="moa" rowspan="3">
                                            Strategies and Solutions</th>
							
						            	<th class="viewmao" width="180px " id="moa"  rowspan="3">Select Version</th>
                                        <th width="40px" id="moa" rowspan="3">
                                            Action</th>
                                    </tr>

                                    <tr>
                                        <th class="viewresource" width="60px" id="green" rowspan="2">Technology
                                        </th>

                                        <th class="viewresource" width="40px" id="green" colspan="2">People</th>

                                        <th class="viewresource" width="40px" id="green" rowspan="2">Input (Vital Record)</th>
                                    </tr>

                                    <tr>
                                <th width="40px" id="blue" class="viewworkingtime">Start</th>
                                <th width="40px" id="blue" class="viewworkingtime">End</th>

                                        <th class="viewresource" width="240px" id="green">Internal
                                        </th>
                                        <th class="viewresource" width="140px" id="green">External
                                        </th>
                                    </tr>
                                    </tr>

                                </thead>

                                <tbody>`+ uploadShowData + `
                                    </tbody>
                                    </table>`

                                $("#processenabler_table").append(table);
                                $('[rel="tooltip"]').tooltip();
                            },
                          
    });
}

function sendApprovalOnce(button, changeId) {
    if (!button.disabled) {
        button.disabled = true; // Disable to prevent multiple clicks
        sendApproval(changeId); // Pass changeId
    }
}

function sendApproval(changeId) {
    var requestData = {
        status: "IN PROGRESS"
    };

    $.ajax({
        url: "/stratroom/api/workflowevents/" + changeId + "/action", // use changeId here
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(requestData),
        success: function (response) {
            location.reload(true);
        }
    });
}

//---------------------------------------------------------------------------------
// delete

let deleteId; 
function deleteData(id) {
    deleteId = id;

    $.ajax({
        url: "/stratroom/retrivePosId/" + deleteId,
        method: 'GET',
        success: function (data, status) {
            console.log(data);            
        },
        error: readErrorMsg
    });
}
function deleteService() {
    if (!deleteId) {
        console.error("DeleteID is not Set");
        return;
    }
    console.log(deleteId, "delete");

    $.ajax({
        url: "/stratroom/deletePos/" + deleteId,
        type: "DELETE",
        contentType: "application/json",
        success: function (data, status) {
            $.notify("Success: Successfully Deleted ", {
                style: 'success',
                className: 'graynotify'
            });
            location.reload(true);
        },
        error: readErrorMsg
    });
}

//---------------------------------------------------------------------------------
// edit
  function formatDate(dateString) {
    // Return blank if the value is undefined, null, or empty
    if (!dateString) return '';

    var date = new Date(dateString);

    // Return blank if the date is invalid
    if (isNaN(date.getTime())) return '';

    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();

    return year + '-' + month + '-' + day;
}


function editPOSpage(id) {
    editId = id;

    $.ajax({
        url: "/stratroom/retrivePosId/" + editId,
        method: 'GET',
        success: function(data, status) {
            console.log(data, 'EditResult')

            // Id
            $(".updateid").val(data.id);

            // Product
            $(".updateproductselect").val(data.posValue.productService);
            productServiceSelectUpdate(data.posValue.productService);

            // Process
            var processEdit;

            if (Array.isArray(data.posValue.process)) {
                // If process is already an array
                processEdit = data.posValue.process;
            } else {
                // If process is a string, split by comma and trim any spaces
                processEdit = data.posValue.process.split(',').map(item => item.trim());
            }           
             $("#processServiceUpdate").val(processEdit).trigger('change');

            // SubProcess
			var subProcessEdit;

            if (Array.isArray(data.posValue.subProcess)) {
                // If process is already an array
                subProcessEdit = data.posValue.subProcess;
            } else {
                // If process is a string, split by comma and trim any spaces
                subProcessEdit = data.posValue.subProcess.split(',').map(item => item.trim());
            }           

            $("#subprocessServiceUpdate").val(subProcessEdit).trigger('change');

            // Classification
            $(".updateclassificationselect").val(data.posValue.classification);
            classificationSelectUpdate(data.posValue.classification);

            // Start & End & Amount Service
            $(".updatestarttimeselect").val(data.posValue.workingTimeStart).attr('data-prev', data.posValue.workingTimeStart);
            $(".updateendtimeselect").val(data.posValue.workingTimeEnd).attr('data-prev', data.posValue.workingTimeEnd);
            $(".updateamountserviceselect").val(data.posValue.amountService);

            // Frequency
            $(".updatefrequencyselect").val(data.posValue.frequency);
            frequencySelectUpdate(data.posValue.frequency);

            // Technology
            var technologyEdit;
            if (Array.isArray(data.posValue.technology)) {
                // If process is already an array
                technologyEdit = data.posValue.technology;
            } else {
                // If process is a string, split by comma and trim any spaces
                technologyEdit = data.posValue.technology.split(',').map(item => item.trim());
            }   

            $("#technologyServiceUpdate").val(technologyEdit).trigger('change');

            // Input Vital
            var inputEdit;
            if (Array.isArray(data.posValue.inputs)) {
                // If process is already an array
                inputEdit = data.posValue.inputs;
            } else {
                // If process is a string, split by comma and trim any spaces
                inputEdit = data.posValue.inputs.split(',').map(item => item.trim());
            }   

            $("#inputServiceUpdate").val(inputEdit).trigger('change');

            // Output Vital
            var outputEdit;
            if (Array.isArray(data.posValue.output)) {
                // If process is already an array
                outputEdit = data.posValue.output;
            } else {
                // If process is a string, split by comma and trim any spaces
                outputEdit = data.posValue.output.split(',').map(item => item.trim());
            }   
            $("#outputServiceUpdate").val(outputEdit).trigger('change');

            // Internal & External
            var internalEdit;
            if (Array.isArray(data.posValue.peopleInternal)) {
                // If process is already an array
                internalEdit = data.posValue.peopleInternal;
            } else {
                // If process is a string, split by comma and trim any spaces
                internalEdit = data.posValue.peopleInternal.split(',').map(item => item.trim());
            }   
            $("#internalServiceUpdate").val(internalEdit).trigger('change');

            var externalEdit;
            if (Array.isArray(data.posValue.peopleExternal)) {
                // If process is already an array
                externalEdit = data.posValue.peopleExternal;
            } else {
                // If process is a string, split by comma and trim any spaces
                externalEdit = data.posValue.peopleExternal.split(',').map(item => item.trim());
            }   
            $("#externalServiceUpdate").val(externalEdit).trigger('change');

            // FinalMAO
            $(".updatefinalMAOselect").val(data.posValue.finalMao);

            // rto
            $(".updatertoselect").val(data.posValue.rto);

            // Strategies
            var strategiesEdit;
            if (Array.isArray(data.posValue.businessStrategies)) {
                // If process is already an array
                strategiesEdit = data.posValue.businessStrategies;
            } else {
                // If process is a string, split by comma and trim any spaces
                strategiesEdit = data.posValue.businessStrategies.split(',').map(item => item.trim());
            }   
            $("#strategiesServiceUpdate").val(strategiesEdit).trigger('change');


           
            // Get the "createBy" Id 
            var createIdNumber = $("#createId").val(data.createBy);
            console.log(createIdNumber,"Create a Id Number Creation");

           // Created by Name
           var createName = $("#nameCreated").text(data.posValue.createdByName);
           console.log(createName,"Name Creation");
           
           var poscreatedTime = $("#poscreatedTime").val(data.createTime);
            console.log(poscreatedTime,"Create a Id Number Creation");
			var posupdatedTime = $("#posupdatedTime").val(data.updateTime);
            console.log(posupdatedTime,"Create a Id Number Creation");



            // Created by Date
          // Extract only date part (YYYY-MM-DD)
var createDate = data.createTime ? data.createTime.split('T')[0] : '';
$("#dateCreated").text(createDate);
console.log(createDate, "Date Creation");

// Updated by Name
var updateName = data.posValue.updatedByName || ''; // if undefined, keep empty
$("#nameUpdated").text(updateName);
console.log(updateName, "Name Updation");

// Updated by Date
var updateDate = data.updateTime ? data.updateTime.split('T')[0] : '';
$("#dateUpdated").text(updateDate);
console.log(updateDate, "Date Updated");
           


        },
        error: function(xhr, status, error) {
            console.log("Error: " + error);
        }
    });
}

function prefillMultiSelect(selector, values) {
    $(selector).val(values).trigger('change');
}

//---------------------------------------------------------------------------------
// update function

function updatePOS() {
    var id = $(".updateid").val();
    var updateproduct = $("#productServiceUpdate").val();
    var updateprocess = $("#processServiceUpdate").val().join(' , ');
    var updateSubProcess = $("#subprocessServiceUpdate").val().join(' , ');
    var updateclassification = $("#classificationServiceUpdate").val();
    var updateTimestart = $(".updatestarttimeselect").val() || $(".updatestarttimeselect").attr('data-prev');
    var updateTimeend = $(".updateendtimeselect").val() || $(".updateendtimeselect").attr('data-prev');
    var updateamountservice = $("#amountServiceUpdate").val();
    var updatefrequency = $("#frequencyServiceUpdate").val();
    var updatetechnology = $("#technologyServiceUpdate").val().join(' , ');
    var updateinputs = $("#inputServiceUpdate").val().join(' , ');
    var updateoutput = $("#outputServiceUpdate").val().join(' , ');
    var updatepeopleInternal = $("#internalServiceUpdate").val().join(' , ');
    var updatepeopleExternal = $("#externalServiceUpdate").val().join(' , ');
    var updatefinalMao = $("#finalMAOUpdate").val();
    var updaterto = $("#rtoUpdate").val();
    var updatestrategies = $("#strategiesServiceUpdate").val().join(' , ');
    var pagenumber = $("#pagenumber").val();


    var generateId = $("#createId").val();
    var generateDate = $("#poscreatedTime").val();
    var updateBy = $("#nameUpdated").val();


    // Empty
    if (updateproduct === "Select") {
        updateproduct = "";
    }
    if (updateclassification === "Select") {
        updateclassification = "";
    }
    if (updatefrequency === "Select") {
        updatefrequency = "";
    }

    var updatePOSData = {
        "createBy": generateId,
        "createTime": generateDate,

        "updateTime":"",
        "deptId": "",
        "deptId": "",
        "id": id,
        "pageId":pagenumber,
        "posValue": {
            "productService": updateproduct,
            "process": updateprocess,
            "subProcess": updateSubProcess,
            "classification": updateclassification,
            "workingTimeStart": updateTimestart,
            "workingTimeEnd": updateTimeend,
            "amountService": updateamountservice,
            "frequency": updatefrequency,
            "technology": updatetechnology,
            "inputs": updateinputs,
            "output": updateoutput,
            "peopleInternal": updatepeopleInternal,
            "peopleExternal": updatepeopleExternal,
            "finalMao": updatefinalMao,
            "rto": updaterto,

            "businessStrategies": updatestrategies
        }
    }
    console.log(updatePOSData);

    $.ajax({
        url: "/stratroom/updatePos",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updatePOSData),
        success: function(data, status) {
            $.notify("Success: Updated Successfully", {
                style: 'success',
                className: 'graynotify'
            });
            location.reload(true);
        },
        error: function(xhr, status, error) {
            console.log("Error: " + error);
        }
    });
}
</script>
</body>