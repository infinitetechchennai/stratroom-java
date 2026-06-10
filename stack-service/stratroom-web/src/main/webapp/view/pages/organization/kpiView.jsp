<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />
<head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>StratRoom</title>
       <script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>

  <link href="assets/css/main.css?v0.004" rel="stylesheet">
    <link href="assets/css/responsive.css" rel="stylesheet">
     <link href="assets/css/bootstrap.min.css" rel="stylesheet">
	   <link href="assets/css/basic.css?v0.006" rel="stylesheet">

     <!-- Font Awsome Icons -->
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  <style>
    #kpiTargetActual table th,
#kpiTargetActual table td {
    text-align: center !important;
    vertical-align: middle !important;
    font-family: 'Poppins', sans-serif !important;
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
/* Comment System Styling */
.comment-container {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
    padding: 16px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.comment-container.reply {
    margin-left: 40px;
    background: #f9f9f9;
}

.comment-avatar {
    flex-shrink: 0;
}

.user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    background-color: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #555;
    font-weight: bold;
}
.form-check-sign {
  display: none !important;
}
.comment-body {
    flex-grow: 1;
}

.comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

.comment-user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}

.user-name {
    font-weight: 600;
    color: #333;
}

.user-title {
    font-size: 0.85em;
    color: #666;
}

.comment-time {
    font-size: 0.8em;
    color: #999;
}

.comment-content {
    margin-bottom: 12px;
    line-height: 1.5;
    color: #333;
}

.comment-footer {
    display: flex;
    align-items: center;
    gap: 16px;
}

.btn-like, .btn-reply {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.9em;
    color: #666;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.2s;
}

.btn-like:hover, .btn-reply:hover {
    background: #f0f0f0;
    color: #333;
}

.btn-like.green {
    color: #4CAF50;
}

.like-count {
    background-color: #f0f0f0;
    color: #666;
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 0.8em;
}

.comment-actions {
    position: relative;
}

/* Dropdown menu styling */
.dropdown-menu {
    min-width: 120px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    border: none;
    border-radius: 4px;
    padding: 4px 0;
}

.dropdown-menu a {
    padding: 6px 12px;
    font-size: 0.9em;
    color: #333;
}

.dropdown-menu a:hover {
    background-color: #f5f5f5;
    color: #000;
}
.kpi-table {
    width: 100%;
    border-collapse: collapse; /* ensures borders don’t double */
}

.kpi-table th, .kpi-table td {
    border: 1px solid #ccc;
    padding: 5px;
    text-align: right;
}
.centered-table th,
.centered-table td {
    text-align: center !important;
}
.negativeHighlight{
	color:red !important;
}
  </style>
    <script>
        function preview_images() 
            {
            var total_file=document.getElementById("images").files.length;
            for(var i=0;i<total_file;i++)
            {
            $('#image_preview').append("<div class='col-md-3' style='padding-bottom: 4%' '><img class='img-responsive' src='"+URL.createObjectURL(event.target.files[i])+"'></div>");
            }
            }
    </script>       
    </head>

    <body class="light">
    <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
    <jsp:include page="../common/top-navigation.jsp"></jsp:include>
		  <header id="header" class="header shadow-sm">
	  
		<jsp:include page="../common/left-navigation.jsp"></jsp:include>
    </header>
		
		<jsp:include page="templates/kpiViewTemplate.jsp"></jsp:include> 
		<jsp:include page="templates/kpiInitiativeTemplate.jsp"></jsp:include>
        <jsp:include page="templates/kpiRiskTemplate.jsp"></jsp:include>
        <jsp:include page="templates/kpiAttachmentemplate.jsp"></jsp:include>
		<jsp:include page="templates/kpiHeaderViewTemplate.jsp"></jsp:include>
		<jsp:include page="templates/kpiDetailViewTemplate.jsp"></jsp:include>
		<jsp:include page="templates/kpiCommentsTemplate.jsp"></jsp:include>
		<jsp:include page="templates/kpiActualTargetTemplate.jsp"></jsp:include>
		<jsp:include page="templates/kpiActualTargetRowTemplate.jsp"></jsp:include>
		<jsp:include page="templates/kpiChart.jsp"></jsp:include>
		<jsp:include page="templates/kpiComments.jsp"></jsp:include>
		<jsp:include page="modal/riskDetailModal.jsp"></jsp:include>
        <jsp:include page="modal/kpi_InitiatiesModal.jsp"></jsp:include>
		<jsp:include page="modal/kpi_initiative_view.jsp"></jsp:include>
		<jsp:include page="modal/kpi_comments_view.jsp"></jsp:include>
		<jsp:include page="modal/kpiReportTableModal.jsp"></jsp:include>
       <jsp:include page="modal/kpiDescriptionModal.jsp"></jsp:include>
		<jsp:include page="templates/kpiReportTableTemplate.jsp"></jsp:include>
         <div style="--stratroom-offcanvas-width: 280px;"
    class="offcanvas offcanvas-toggle offcanvas-start offcanvasKPI border-0 shadow-lg" data-bs-scroll="true"
    data-bs-backdrop="false" tabindex="-1" id="offcanvasKPI" aria-labelledby="offcanvasKPILabel">

    <div class="offcanvas-toggle-menu toggle-right">
      <button id="toggleButton" class="btn p-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasKPI"
        aria-controls="offcanvasKPI">
        <i class="fas fa-arrow-right"></i>
      </button>
      <button class="btn p-0" data-bs-dismiss="offcanvas" aria-label="Close">
        <i class="fas fa-arrow-left"></i>
      </button>
    </div>

    <div class="offcanvas-header border-bottom justify-content-between gap-3">
      <h5 class="offcanvas-title text-uppercase fs-6 fw-bold" id="offcanvasKPILabel">KPI</h5>
      <div class="d-flex align-items-center gap-2">

       </div>
    </div>

    <div class="offcanvas-body">
    <input type="hidden" id="ischeckkpiurlornot" value="KPI">
    <span id="listkpisidebar"></span>
    
    <div class="grid gap-2 kpi_score_objective">
      <div class="g-col-12">
        <div class="form-group">
          <label for="kpi_scorecard_page" class="form-label fw-bold">Scorecard(s)</label>
          <select id="kpi_scorecard_page" name="kpi_scorecard_page_drop" class="form-select form-select-sm select-dropdown-offcanvasKPI" onchange="populateScoreCard(this.value)">
            <option value="">Select Scorecard</option>
            <c:if test="${pageList != null}">
              <c:forEach items="${pageList}" var="pageObj">
                <c:if test="${pageObj.pageType eq 'Standard_View'}">
                  <option value="${pageObj.id}">${pageObj.pageName}</option>
                </c:if>
              </c:forEach>
            </c:if>
          </select>
        </div>
      </div>
      
      <div class="g-col-12">
        <div class="form-group">
          <label for="kpi_scorecard" class="form-label fw-bold">Perspectives</label>
          <select id="kpi_scorecard" name="kpi_scorecard_drop" class="form-select form-select-sm select-dropdown-offcanvasKPI" onchange="populateObjectives(this.value)">
            <option value="">Select Perspective</option>
          </select>
        </div>
      </div>
      
      <div class="g-col-12">
        <div class="form-group">
          <label for="kpi_objectives_id" class="form-label fw-bold">Objectives</label>
          <select id="kpi_objectives_id" name="kpi_objectives_drop" class="form-select form-select-sm select-dropdown-offcanvasKPI" onchange="populateKpi(this.value)">
            <option value="">Select Objective</option>
          </select>
        </div>
      </div>
    </div>

     <div class="mt-3">
      <label class="form-label fw-bold">KPIs</label>
      <div class="kpis-cards d-flex flex-column gap-2" id="initiate_sidebar">
        <!-- KPI cards will be dynamically inserted here via JS -->
        <!-- Use the design from new structure: card > header/body with icon, period, values -->
      </div>
    </div>
    <div class="mt-3">
      <label class="form-label fw-bold">SUB KPIs</label>
      <div class="kpis-cards d-flex flex-column gap-2" id="subinitiate_sidebar">
        <!-- KPI cards will be dynamically inserted here via JS -->
        <!-- Use the design from new structure: card > header/body with icon, period, values -->
      </div>
    </div>
  </div>
  </div>
            <table class="table dashboard-task-infos align-center dashboard-table" id="reportTableViewCsv" style="display:none !important;">
					</table>
			<a href="#" class="downloadcasfile" style="display:none"></a>		
          
<div class="modal custom-modal custom-delete-modal fade" id="deleteModalKpi" data-bs-backdrop="static"
data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" style="--stratroom-modal-width:320px">
    <div class="modal-content">
        <div class="modal-body">
            <div class="card custom-card delete-card border-0">
                <div class="card-body">

                    <div class="delete-box">
                        	<input type="hidden" id="deletekpirecordid"/>
							<input type="hidden" id="deletekpirecordtype"/>
                        <h4 class="title">Do you really want to delete?</h4>
                        <div class="btn-wrap">
                            <button type="button" class="btn btn-sm btn-label-secondary rounded-pill"
                                data-bs-dismiss="modal" aria-label="Close">
                                Cancel
                            </button>
                            <button class="btn btn-sm btn-danger rounded-pill" onclick="handlekpieventdelete()">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
</div>
            <!--#START Data Collection Form -->
            <div class="modal fade data_collection_form" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header modalheadercolor">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                             <span aria-hidden="true">&times;</span>
                         </button>
                        </div>
                        <div class="modal-body">
                            <form id="sub_initative_Form">
                                <div class="form-row justify-content-center">
                                    <img width="110" class="rounded-circle" id="upload_link1" src="images/user/usrbig7.jpg" alt="">
                                    <input id="upload1" type="file" style="display:none" />
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="sub_initative_desc">KPI Name</label>
                                        <select id="kpi_id" name="sub_initative_desc" class="form-control data_field">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group browser-default">
                                        <label for="attachment" data-i18n="Frequency">Frequency</label>
                                        <select id="attachment" name="attachment" class="form-control data_field">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="sub_initative_desc">Element ID</label>
                                        <input type="text" class="form-control data_field" name="sub_initative_desc" id="kpi_id" placeholder="">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="attachment">Element Type</label>
                                        <select id="attachment" name="attachment" class="form-control data_field">
                                        <option></option>
                                    </select>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="sub_initative_desc">Data</label>
                                        <select id="kpi_data" name="kpi_data" class="form-control data_field">
                                            <option></option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="attachment">Scheduler</label>
                                        <select id="attachment" name="attachment" class="form-control data_field">
                                        <option></option>
                                    </select>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="sub_initative_desc">Responsible</label>
                                        <select id="responsible" name="responsible" class="form-control data_field">
                                            <option></option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="attachment">Cutoff Date</label>
                                        <input type="text" class="form-control data_field date_pickers" name="cuttoff_date" id="cutoff_date" placeholder="">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6 d-flex">
                                        <div class="employee_approval">Approval By</div>
                                        <div>
                                            <ul class="list-unstyled order-list">
                                                <li class="avatar avatar-sm">
                                                    <img class="rounded-circle" src="images/user/user7.jpg" alt="user">
                                                </li>
                                                <li class="avatar avatar-sm">
                                                    <img class="rounded-circle" src="images/user/user8.jpg" alt="user">
                                                </li>
                                                <li _ngcontent-hhc-c5="" class="avatar avatar-sm"><span _ngcontent-hhc-c5="" class="badge">+2</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="form-group col-md-6 d-flex">
                                        <div class="employee_approval">First Approval By</div>
                                        <div>
                                            <ul class="list-unstyled order-list">
                                                <li class="avatar avatar-sm">
                                                    <img class="rounded-circle" src="images/user/user7.jpg" alt="user">
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-line right">
                                    <button type="button" class="dataform_save_btn" data-dismiss="modal" aria-label="Close" data-i18n="Save">Save</button>
                                    <button class="dataform_resend_btn" value="Save">Resend</button>
                                    <button class="dataform_submit_btn" value="Save">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!--#END Data Collection Form -->
            
            <!-- #Start Kpi Comments PopUp -->

            <div class="modal fade kpi_comments_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header modalheadercolor">
                            <h6 class="modal-title" id="myLargeModalLabel_1">Kpi Comments Update</h6>
                            <button type="button" class="close" id="kpiComments" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="kpi_comments_Form">
                                <input type="hidden" name="kpi_comments_id" id="kpi_comments_id" />
                                <input type="hidden" name="kpi_comments_kpiid" id="kpi_comments_kpiid" />
                                 <div class="form-row">   
                                    <div class="form-group col-md-12">
                                        <label for="sub_initative_desc" data-i18n="Comments">Comments</label>
                                        <textarea rows="3" cols="" class="form-control browser-default" name="kpi_Comments" id="kpi_Comments" placeholder=""></textarea> 
                                    </div>
                                  </div><hr/>
                                    <input type="hidden" name="action" value="" />
                               
                                <div class="form-line right">
                                    <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
                                    <button class="initative_save_btn" value="Save" data-i18n="Save">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade kpi_commentsreply_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header modalheadercolor">
                            <h6 class="modal-title" id="myLargeModalLabel_1">Kpi Comments Update</h6>
                            <button type="button" class="close" id="kpiComments" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="kpi_comments_Form">
                                <input type="hidden" name="kpi_commentsreply_id" id="kpi_commentsreply_id" />
                                <input type="hidden" name="kpi_commentsreply_kpiid" id="kpi_commentsreply_kpiid" />
                                <input type="hidden" name="kpi_CommentsReply_desc" id="kpi_CommentsReply_desc" />
                                 <div class="form-row">   
                                    <div class="form-group col-md-12">
                                        <label for="sub_initative_desc" data-i18n="Comments">Comments</label>
                                        <textarea rows="3" cols="" class="form-control browser-default" name="kpi_CommentsReply" id="kpi_CommentsReply" placeholder=""></textarea> 
                                    </div>
                                  </div><hr/>
                                    <input type="hidden" name="action" value="" />
                               
                                <div class="form-line right">
                                    <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
                                    <button class="initative_save_btn" value="Save" onclick="handleKPICommentsReplyUpate(event)" data-i18n="Save">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- #END# kpi Comments PopUp -->


            <!--#START Sub Initiatives Edit -->
            <div class="modal fade sub_initative_edit_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h6 class="modal-title" id="myLargeModalLabel_1">Edit My Initiative Description</h6>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="sub_initative_Form">
                                <div class="form-row">
                                    <div class="form-group col-md-9">
                                        <label for="sub_initative_desc">Description</label>
                                        <input type="text" class="form-control browser-default" name="sub_initative_desc" id="kpi_id" placeholder="">
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label for="sub_initative_progress">Progress</label>
                                        <input type="text" class="form-control browser-default" name="sub_initative_progress" id="sub_initative_progress" placeholder="">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="sub_initative_start_end">Start / End Date</label>
                                        <input type="text" class="form-control browser-default date_pickers datepicker-here" data-range="true" data-multiple-dates-separator=" - " data-language="en" id="air-date-sub-init-edit" />
                                    </div>
                                    
                                </div>
                                <div class="form-line right">
                                    <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
                                    <button class="initative_save_btn" value="Save" data-i18n="Save">Save</button>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <div class="d-flex flex-column flex-fill ml-4 mb-5 text-left font-11">
                                <div class="d-flex flex-row">
                                    <p class="kpi_audit">Audit</p>
                                </div>
                                <div class="d-flex flex-row">
                                    <div class="d-flex flex-column">
                                        <p><span>Created By : </span><span>Arun</span></p>
                                        <p><span>Created Date : </span><span>Oct 02, 2019</span></p>
                                    </div>
                                    <div class="d-flex flex-column pl-5">
                                        <p><span>Modified By : </span><span>Karthik</span></p>
                                        <p><span>Modified Date : </span><span>Oct 02, 2019</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--#END Sub Initiatives Edit -->

            <!--#START Sub Initiatives View -->
           <div  class="modal custom-modal fade sub_initative_view_popup" data-bs-backdrop="static"
     data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
     aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-lg-600">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Data Table</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
             
                             <div class="modal-body">
          <div class="card border-0">
            <div class="card-body" id="actualtargetview">
											<table class="table dashboard-task-infos align-center dashboard-table" style="width:100%;overflow-x:scroll !important;" id="actualtargettablepaging">
												<thead>
													<tr>
														<th style="font-family:'Poppins;', sans-serif !important;text-align:center !important;width:15%;" data-i18n="Period">Period</th>
														<th style="font-family:'Poppins', sans-serif !important;text-align:right !important;width:17%;" data-i18n="Actual">Actual</th>
														<th style="font-family:'Poppins', sans-serif !important;width:17%;" data-i18n="Target">Target</th>
														<th style="font-family:'Poppins', sans-serif !important;width:17%;" data-i18n="Annual Target">Annual Target</th>
														<th style="font-family:'Poppins', sans-serif !important;width:17%;" data-i18n='Gap'>Gap</th>
														<th style="font-family:'Poppins', sans-serif !important;width:17%;" data-i18n="YTD">YTD</th>
													</tr>
												</thead>
												<tbody>
												
												</tbody>
											</table>
										</div>
                                </div>
                            </div>
                     
        </div>
    </div>
</div>
            <!--#END Sub Initiatives Edit -->


            <!--#START Sub Activitie Edit -->
            <div class="modal fade sub_activitie_edit_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header modalheadercolor">
                            <h6 class="modal-title" id="myLargeModalLabel_1">Edit Activitive Description</h6>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="sub_initative_Form">
                                <div class="form-row">
                                    <div class="form-group col-md-9">
                                        <label for="sub_initative_desc">Description</label>
                                        <input type="text" class="form-control browser-default" name="sub_initative_desc" id="kpi_id" placeholder="">
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label for="sub_initative_progress">Progress</label>
                                        <input type="text" class="form-control browser-default" name="sub_initative_progress" id="sub_initative_progress" placeholder="">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="sub_initative_start_end">Start / End Date</label>
                                        <input type="text" class="form-control browser-default date_pickers datepicker-here" data-range="true" data-multiple-dates-separator=" - " data-language="en" id="" />
                                    </div>
                                    
                                </div>
                                <div class="form-line right">
                                    <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
                                    <button class="initative_save_btn" value="Save" data-i18n="Save">Save</button>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <div class="d-flex flex-column flex-fill ml-4 mb-5 text-left font-11">
                                <div class="d-flex flex-row">
                                    <p class="kpi_audit">Audit</p>
                                </div>
                                <div class="d-flex flex-row">
                                    <div class="d-flex flex-column">
                                        <p><span>Created By : </span><span>Arun</span></p>
                                        <p><span>Created Date : </span><span>Oct 02, 2019</span></p>
                                    </div>
                                    <div class="d-flex flex-column pl-5">
                                        <p><span>Modified By : </span><span>Karthik</span></p>
                                        <p><span>Modified Date : </span><span>Oct 02, 2019</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--#END Sub Activitie Edit -->

            <!--#START Sub Activitie View -->
            <div  class="modal custom-modal fade kpi_initiaties_view_popup" data-bs-backdrop="static"
     data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
     aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-lg-600">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">View My Initiatives</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card border-0">
                    <div class="card-body p-0">
                        <div class="list-group risks-list" id="kpi_initiaties_viewrow">
                            <!-- Dynamic content will be inserted here -->
                            <div class="text-center py-4">
                                <i class="fa fa-spinner fa-spin fa-2x"></i>
                                <p>Loading initiatives...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
            <!--#END Sub Activitie View -->
<div  class="modal custom-modal fade kpi_risk_view_popup" data-bs-backdrop="static"
     data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
     aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-lg-600">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">View My Risks</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card border-0">
                    <div class="card-body p-0">
                        <div class="list-group risks-list" id="kpi_risk_viewrow">
                            <!-- Dynamic content will be inserted here -->
                            <div class="text-center py-4">
                                <i class="fa fa-spinner fa-spin fa-2x"></i>
                                <p>Loading risks...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
            <!--#END risk View -->

            <!--#START Sub Milestone -->
            <div class="modal fade sub_milestone_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header modalheadercolor">
                            <h6 class="modal-title" id="myLargeModalLabel_1">Add Milestone Description</h6>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="sub_initative_Form">
                                <div class="form-row">
                                    <div class="form-group col-md-12">
                                        <label for="sub_initative_desc">Description</label>
                                        <input type="text" class="form-control browser-default" name="sub_initative_desc" id="kpi_id" placeholder="">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="sub_initative_progress">Progress</label>
                                        <input type="text" class="form-control browser-default" name="sub_initative_progress" id="sub_initative_progress" placeholder="">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="sub_initative_start_end">End Date</label>
                                        <input type="text" class="form-control browser-default date_pickers_single datepicker-here" data-language="en" id="" />
                                    </div>
                                </div>
                                <div class="form-line right">
                                    <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close" data-i18n="Cancel" >Cancel</button>
                                    <button class="initative_save_btn" value="Save" data-i18n="Save">Save</button>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <div class="d-flex flex-column flex-fill ml-4 mb-5 text-left font-11">
                                <div class="d-flex flex-row">
                                    <p class="kpi_audit">Audit</p>
                                </div>
                                <div class="d-flex flex-row">
                                    <div class="d-flex flex-column">
                                        <p><span>Created By : </span><span>Arun</span></p>
                                        <p><span>Created Date : </span><span>Oct 02, 2019</span></p>
                                    </div>
                                    <div class="d-flex flex-column pl-5">
                                        <p><span>Modified By : </span><span>Karthik</span></p>
                                        <p><span>Modified Date : </span><span>Oct 02, 2019</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--#END Sub Milestone -->

            <!--#START Sub Milestone Edit -->
            <div class="modal fade sub_milestone_edit_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header modalheadercolor">
                            <h6 class="modal-title" id="myLargeModalLabel_1">Edit Milestone Description</h6>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="sub_initative_Form">
                                <div class="form-row">
                                    <div class="form-group col-md-9">
                                        <label for="sub_initative_desc">Description</label>
                                        <input type="text" class="form-control browser-default" name="sub_initative_desc" id="kpi_id" placeholder="">
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label for="sub_initative_progress">Progress</label>
                                        <input type="text" class="form-control browser-default" name="sub_initative_progress" id="sub_initative_progress" placeholder="">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="sub_initative_start_end">End Date</label>
                                        <input type="text" class="form-control browser-default date_pickers_single datepicker-here" data-language="en" id="" />
                                    </div>
                                   
                                </div>
                                <div class="form-line right">
                                    <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
                                    <button class="initative_save_btn" value="Save" data-i18n="Save">Save</button>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <div class="d-flex flex-column flex-fill ml-4 mb-5 text-left font-11">
                                <div class="d-flex flex-row">
                                    <p class="kpi_audit">Audit</p>
                                </div>
                                <div class="d-flex flex-row">
                                    <div class="d-flex flex-column">
                                        <p><span>Created By : </span><span>Arun</span></p>
                                        <p><span>Created Date : </span><span>Oct 02, 2019</span></p>
                                    </div>
                                    <div class="d-flex flex-column pl-5">
                                        <p><span>Modified By : </span><span>Karthik</span></p>
                                        <p><span>Modified Date : </span><span>Oct 02, 2019</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--#END Sub Milestone Edit -->

            <!--#START Sub Milestone View -->
            <div class="modal fade sub_milestone_view_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header modalheadercolor">
                            <h6 class="modal-title" id="myLargeModalLabel_1">View Milestones</h6>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="col-lg-12 col-md-12 sub_initiatives">
                            <div class="card">
                                <div class="header d-flex flex-row">
                                    <h5 class="prob d-flex flex-fill"><strong class="editableTxt1" onkeypress="return (this.innerText.length <= 25)" editable="true">Milestones</strong> </h5>
                                </div>
                                <div class="d-flex flex-column employee_div_body_box" id="milestone_view">
                                    <div class="d-flex flex-row employe_content_border sub_initiative_details">
                                        <div class="d-flex flex-column flex-fill profile_content">
                                            <div class="d-flex flex-row">
                                                <div class="d-flex flex-column init_flex_profile">
                                                    <p>Milestones-1 Lorem ipsum dolor sit amet, nam ea, ei putent oblique probatus ve 1 </p>
                                                </div>
                                                <div class="d-flex flex-column">
                                                    <div><strong>Completed</strong></div>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row">
                                                <div class="d-flex flex-column flex-fill">
                                                    <div class="d-flex flex-row">
                                                        <div class="progress-s progress">
                                                            <div class="progress-bar progress-bar-success width-per-35 rounded-pill bar_height" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">
                                                            </div>
                                                        </div>
                                                        <div class="progress_value">35%</div>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-column">
                                                    <div><strong>Oct 09, 2019</strong></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row employe_content_border sub_initiative_details">
                                        <div class="d-flex flex-column flex-fill profile_content">
                                            <div class="d-flex flex-row">
                                                <div class="d-flex flex-column init_flex_profile">
                                                    <p>Milestones-2 Lorem ipsum dolor sit amet, nam ea, ei putent oblique probatus ve 1 </p>
                                                </div>
                                                <div class="d-flex flex-column">
                                                    <div><strong>Pending</strong></div>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row">
                                                <div class="d-flex flex-column flex-fill">
                                                    <div class="d-flex flex-row">
                                                        <div class="progress-s progress">
                                                            <div class="progress-bar width-per-40 rounded-pill bar_height yellow_bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                                                            </div>
                                                        </div>
                                                        <div class="progress_value">40%</div>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-column">
                                                    <div><strong>Oct 09, 2019</strong></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="d-flex flex-row employe_content_border sub_initiative_details">
                                        <div class="d-flex flex-column flex-fill profile_content">
                                            <div class="d-flex flex-row">
                                                <div class="d-flex flex-column init_flex_profile">
                                                    <p>Milestones-3 Lorem ipsum dolor sit amet, nam ea, ei putent oblique probatus ve 1 </p>
                                                </div>
                                                <div class="d-flex flex-column">
                                                    <div><strong>Completed</strong></div>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row">
                                                <div class="d-flex flex-column flex-fill">
                                                    <div class="d-flex flex-row">
                                                        <div class="progress-s progress">
                                                            <div class="progress-bar progress-bar-success width-per-80 rounded-pill bar_height" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
                                                            </div>
                                                        </div>
                                                        <div class="progress_value">80%</div>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-column">
                                                    <div><strong>Oct 09, 2019</strong></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row employe_content_border sub_initiative_details">
                                        <div class="d-flex flex-column flex-fill profile_content">
                                            <div class="d-flex flex-row">
                                                <div class="d-flex flex-column init_flex_profile">
                                                    <p>Milestones-4 Lorem ipsum dolor sit amet, nam ea, ei putent oblique probatus ve 1 </p>
                                                </div>
                                                <div class="d-flex flex-column">
                                                    <div><strong>Completed</strong></div>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row">
                                                <div class="d-flex flex-column flex-fill">
                                                    <div class="d-flex flex-row">
                                                        <div class="progress-s progress">
                                                            <div class="progress-bar width-per-15 rounded-pill bar_height orange_bar" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">
                                                            </div>
                                                        </div>
                                                        <div class="progress_value">15%</div>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-column">
                                                    <div><strong>Oct 09, 2019</strong></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row employe_content_border sub_initiative_details">
                                        <div class="d-flex flex-column flex-fill profile_content">
                                            <div class="d-flex flex-row">
                                                <div class="d-flex flex-column init_flex_profile">
                                                    <p>Milestones-5 Lorem ipsum dolor sit amet, nam ea, ei putent oblique probatus ve 1 </p>
                                                </div>
                                                <div class="d-flex flex-column">
                                                    <div><strong>Completed</strong></div>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row">
                                                <div class="d-flex flex-column flex-fill">
                                                    <div class="d-flex flex-row">
                                                        <div class="progress-s progress">
                                                            <div class="progress-bar progress-bar-success width-per-60 rounded-pill bar_height" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
                                                            </div>
                                                        </div>
                                                        <div class="progress_value">60%</div>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-column">
                                                    <div><strong>Oct 09, 2019</strong></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row employe_content_border sub_initiative_details">
                                        <div class="d-flex flex-column flex-fill profile_content">
                                            <div class="d-flex flex-row">
                                                <div class="d-flex flex-column init_flex_profile">
                                                    <p>Milestones-6 Lorem ipsum dolor sit amet, nam ea, ei putent oblique probatus ve 1 </p>
                                                </div>
                                                <div class="d-flex flex-column">
                                                    <div><strong>Completed</strong></div>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-row">
                                                <div class="d-flex flex-column flex-fill">
                                                    <div class="d-flex flex-row">
                                                        <div class="progress-s progress">
                                                            <div class="progress-bar progress-bar-success width-per-35 rounded-pill bar_height" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">
                                                            </div>
                                                        </div>
                                                        <div class="progress_value">35%</div>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-column">
                                                    <div><strong>Oct 09, 2019</strong></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--#END Sub Milestone View -->
              <!-- File Validate Form -->
       <div class="modal custom-modal fade file_upload_popup" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">File Upload</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card custom-card border-0">
            <div class="card-body">
            <div class="grid gap-3">
              <div class="g-col-12">
                <div class="form-group">
                  <label for="kpiDesName" class="form-label">Name</label>
                  <input type="text" class="form-control" name="kpiDesName" id="fileName" placeholder="Name">
                </div>
              </div>
              <div class="g-col-12">
                <div class="form-group">
                  <label for="" class="form-label">Upload File</label>
                  <label for="login" class="upload-label upload-box">
                    <div class="upload">Choose a file or drag it here.</div>
                    <input type="file" id="fileInput" accept=".doc,.docx,.pdf,.xls,.xlsx,.jpg,.jpeg,.png">
                  </label>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
            Cancel
          </button>
          <button class="btn btn-primary" value="Save" onclick="kpiattachment()">Save
          </button>
          
        </div>
      </div>
    </div>
  </div>
                

<!-- #END# KPI chart PopUp -->
		 <div  class="modal custom-modal fade kpi_chart_view_popup" data-bs-backdrop="static"
     data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
     aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-lg-600">
        <div class="modal-content">
					<div class="modal-header modalheadercolor">
						<h6 class="modal-title" id="myLargeModalLabel_1">View KPI Chart Status</h6>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
					</div>
					<div class="modal-body">
					<div class="card border-0">
                      <div class="card-body p-0">
							<div class=" list-group viewkpichartmodal" id="chart_modal"></div>
						</div></div>
					</div>
				</div>
			</div>
		</div>
<!-- #END# KPI chart PopUp -->

    <!-- Column Large -->
    <div
      class="modal fade"
      id="column-large"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel_1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-body">
            <div id="Columnlarge"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- END Column Large -->
    
           <main class="pt-3 pb-3">

    <div class="container-lg">
      <!---------Initiatives--------->
      <div class="row g-2">
        <div class="col-12">
          <div class="accordion card-accordion accordionExample" id="kpiDetailsView">
           
          </div>
        </div>
        <!-- Data Table Section -->
        <div class="col-12 col-md-5 datatable" id="kpiTargetActual">
            
		<jsp:include page="templates/kpiActualTargetTemplate.jsp"></jsp:include>
        
        </div>
        <!-- Data Table Section END -->
        <div class="col-12 col-md-7 actualvtarget" id="kpiChart">
       
        </div>
        <div class="col-lg-12 datadrill" id="kpiReportTemplate">
        
        </div>
        <!-- My Initiative-->
        <div class="col-lg-4 col-md-6 myinitiative" id="headerInitiativeTemplate">
        </div>
        <!-- My Risks-->
        <div class="col-lg-4 col-md-6 risks" id="headerRiskTemplate">
        </div>
        <!-- Comment Section -->
        <div class="col-lg-4 col-md-6 comments-show" id="kpi_comments">
    
        </div>

        <!-- Files-->
        <div class="col-lg-4 col-md-6 files" id="headerAttachmentTemplate">
         
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

            <c:if test="${kpiId != null}">
            	<input type="hidden" value="${kpiId}" id="kpiId" />
            </c:if>
            <c:if test="${userPrincipal != null}">
				<input id="userDept" type="hidden" name="userDept" value="${userPrincipal.profile.department}">
			</c:if>
            <c:if test="${objId != null}">
            	<input type="hidden" value="${objId}" id="objId" />
            </c:if>
            <c:if test="${scoreCardId != null}">
            	<input type="hidden" value="${scoreCardId}" id="scoreCardId" />
            </c:if>
             <c:if test="${scordCardPageId != null}">
            	<input type="hidden" value="${scordCardPageId}" id="scordCardPageId" />
            </c:if>
            <!-- Plugins Js -->
          <link href="assets/css/pickr.min.css" rel="stylesheet">
    <link href="assets/css/daterangepicker.min.css" rel="stylesheet">
    <link href="assets/css/jquery-ui.min.css" rel="stylesheet">
    <link href="assets/css/select2.min.css" rel="stylesheet" />
		<script src="${contextroot}/js/app.min.js"></script>
		<script type="text/javascript"
			src="${contextroot}/js/knockout-3.5.0.js"></script>
            <script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
			<script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
            <!-- Custom Js -->
            <script src="${contextroot}/js/admin.js"></script>
            <script src="${contextroot}/js/paging.js"></script>
			<script src="${contextroot}/js/bundles/amcharts4/core.js"></script>
			<script src="${contextroot}/js/bundles/amcharts4/maps.js"></script>
			<script src="${contextroot}/js/bundles/amcharts4/worldLow.js"></script>
			<script src="${contextroot}/js/bundles/amcharts4/usaLow.js"></script>
			<script src="${contextroot}/js/bundles/amcharts4/animated.js"></script>
			<script src="${contextroot}/js/bundles/amcharts4/charts.js"></script>
			<script src="${contextroot}/js/jquery.editable.min.js"></script>
			<script src="${contextroot}/js/pages/widgets/chart-widget.js"></script>
			<script src="${contextroot}/js/handlebars.js"></script>
            <script type="text/javascript" src="${contextroot}/js/knockout-3.5.0.js"></script>
            <script src="${contextroot}/js/daterangepicker.min.js"></script>
			<script src="${contextroot}/js/amcharts.js"></script>
            <script src="${contextroot}/js/jquery-ui.min.js"></script>
            
            <!-- Knob Js -->
            <script src="${contextroot}/js/moment.js"></script>
            <script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
            <script src="${contextroot}/js/pickr.es5.min.js"></script>
            <script src="${contextroot}/js/chosen.jquery.min.js"></script>
            <script src="${contextroot}/js/widgets.js"></script>
            <script src="${contextroot}/js/kpiview.js"></script>
            <!-- <script src="${contextroot}/js/initiative.js"></script>-->
            <script src="${contextroot}/js/initial.js"></script>
            <script src="${contextroot}/js/notify.js"></script>
            <script src="${contextroot}/js/apexcharts.js"></script>
            <script src="${contextroot}/js/risk.js"></script>
     <script src="js/main.js"></script>
     
  <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdn.datatables.net/rowgroup/1.3.0/js/dataTables.rowGroup.min.js"></script>
            <script>
const popoverTrigger = document.getElementById('popoverFilter');
    new bootstrap.Popover(popoverTrigger, {
      html: true,
      content: `
          <div>
    <div class="d-flex justify-content-between gap-3 mb-3 align-items-center">
              <h5 class="h6 mb-0">View</h5>
              <button type="button" class="btn-close" aria-label="Close"></button>
            </div>
  
            
            <div class="d-flex flex-column gap-2 pageViewOption">
             <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" checked id="dataTableView" name="datatable" value="datatable">
      <label class="form-check-label" for="dataTableView">Data Table</label>
    </div>
  
  <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" checked id="actualvtargetView" name="actualvtarget" value="actualvtarget">
      <label class="form-check-label" for="actualvtargetView">Actual vs Target</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" checked id="dataDrillView" name="datadrill" value="datadrill">
      <label class="form-check-label" for="dataDrillView">Data Drill</label>
    </div>

    <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" checked id="chartMyInitiative" name="myinitiative" value="myinitiative">
      <label class="form-check-label" for="chartMyInitiative">My Initiative</label>
    </div>
  <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" checked id="risksView" name="chart" value="risks">
      <label class="form-check-label" for="risksView">Risks</label>
    </div>
   <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" checked id="commentsView" name="comments" value="comments-show">
      <label class="form-check-label" for="commentsView">Comments</label>
    </div>
  <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" checked id="filesView" name="tables" value="files">
      <label class="form-check-label" for="filesView">Files</label>
    </div>
 
 
  
      
              </div>
          </div>
        `,
      sanitize: false // Disable sanitization
    });

    // Handle close button click
    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('btn-close')) {
        const popover = bootstrap.Popover.getInstance(popoverTrigger);
        popover.hide();
      }
    });
	//$('.kpi_chart_view_popup,.kpi_initiaties_popup').modal({show: false, backdrop: 'static',keyboard: false});
	
	jQuery.validator.setDefaults({
		  debug: false,
		  success: "valid"
		});
		$( "#kpi_comments_Form" ).validate({
		  rules: {
			  kpi_Comments: {
			      required: true
			    },
			    kpi_comments_id: {
		      required: true
		    },
		    kpi_comments_kpiid: {
		      required: true
		    }
		  },
		   messages: {
	            required: "Name is required"
	        },
	        submitHandler: function(form) {
	        	handleKPICommentsSave('','edit');
	        }
		});
      	$('.modal-dialog').draggable({
            handle: ".modal-header"
        });
      	
      	$('[data-toggle="tooltip"]').attr("data-placement","bottom");
      	$('[data-toggle="tooltip"]').tooltip({ 
            delay: { "show": 0, "hide": 0 } 
    		});
	</script>
			<script>
                document.getElementById('fileInput').addEventListener('change', function (e) {
                  var fileName = e.target.files.length > 0 ? e.target.files[0].name : 'Choose a file or drag it here.';
                  document.querySelector('.dropzone-desc p').textContent = fileName;
                });
                </script>
                
    </body>