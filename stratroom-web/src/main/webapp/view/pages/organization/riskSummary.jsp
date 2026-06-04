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
<style>
    .form-group .form-line {
    width: 100%;
    position: relative;
    margin-left: 3% !important;
}
td{
    white-space: nowrap !important;
    }
.orientation-right {
        top: 60px !important;
        right: 0 !important;
        left: auto !important;
        position: fixed;
      }

      .hidden {
        display: none;
      }

      .shown {
        display: block;
      }

      .select2-container {
        width: 360px !important;
      }

      .select2-container--default .select2-selection--multiple {
        border: none;
        border-bottom: 1px solid #9e9e9e !important;
        border-radius: 0 !important;
        height: 30px;
      }

      .select2-container--default.select2-container--focus
        .select2-selection--multiple {
        border: none;
        border-bottom: 1px solid #9e9e9e !important;
      }

      .toggle-dropdown li {
        cursor: pointer;
      }

      .multi-column-dropdown h4 {
        font-weight: 600;
        font-size: 15px;
        padding: 7px 0px 4px 10px;
      }

      .dropdown-menu {
        min-width: 200px;
      }
      .dropdown-menu.columns-2 {
        min-width: 400px;
      }
      .dropdown-menu.columns-3 {
        min-width: 600px;
      }
      .dropdown-menu li a {
        padding: 3px 15px;
        font-weight: 300;
      }
      .multi-column-dropdown {
        list-style: none;
        margin: 0px;
        padding: 0px;
      }
      .multi-column-dropdown li a {
        display: block;
        clear: both;
        line-height: 1.428571429;
        color: #333;
        white-space: normal;
      }
      .multi-column-dropdown li a:hover {
        text-decoration: none;
        color: #333;
        background-color: #f5f5f5;
      }

      @media (max-width: 767px) {
        .dropdown-menu.multi-column {
          min-width: 240px !important;
          overflow-x: hidden;
        }
      }

      .dashboard-table tbody tr td,
      .dashboard-table tbody tr th {
        border: 1px solid #ececec !important;
        padding: 14px 5px 14px 5px;
        font-size: 12px !important;
      }

      .dashboard-table tbody tr th {
        background-color: #f7f7f7;
      }

      .dashboard-table tbody tr td {
        font-weight: 500 !important;
        color: #555;
      }

      .dashboard-table tbody tr th {
        font-weight: 600 !important;
        color: #1e252d;
      }

      .risk-icon i:hover {
        color: #fff !important;
      }
    </style>

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
  </head>

  <body class="light">
		<jsp:include page="../common/top-navigation.jsp"></jsp:include>
		<div>
			<jsp:include page="../common/left-navigation.jsp"></jsp:include>
			<jsp:include page="../common/right-navigation.jsp"></jsp:include>
		</div>

<div id="deleteModalrisksummary" class="modal fade">
	<div class="modal-dialog modal-confirm">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">Delete</h4>	
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
				<h5 class="confirm-modal-content">Do you really want to delete?</h5>
				<br>
				<div class="form-line right">
					<input type="hidden" id="deleterecordid"/>
					<button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close"  data-i18n="Cancel">Cancel</button>
					<button type="button" class="btn btn-danger confirm-modal-deleteBtn" onclick="handleriskeventdelete()">Delete</button>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- table view start -->
			<div class="modal fade Risktableview" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" style="max-width:80%;">
					<div class="modal-content">
						<div class="modal-header modalheadercolor">
							<h6 class="modal-title" id="myLargeModalLabel_1">View Risk Register</h6>
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						
						<div class="body table-responsive sub-ini-box">
			                <div class="col-lg-12 col-md-12">
			                  <div class="card">
			                    <div class="tableBody">
			                      <div class="table-responsive Month box">
			                        <table class="table dashboard-task-infos align-center dashboard-table" id="table1" style="margin-bottom: 0px !important;table-layout: fixed;">
						              	<tbody class="viewsummarytable1">
						              	
										</tbody>            
			                        </table>
			                      </div>
			                    </div>
			                  </div>
			                </div>
			              </div>
						
					</div>
				</div>
			</div>
			<!-- table view end -->
	
		<jsp:include page="modal/risksummary_comments_popup.jsp"></jsp:include>
      <div class="risk_chart_view_popup modal fade" tabindex="-1" role="dialog"
	aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-lg">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title">View Heat Map</h4>
							<button type="button" class="close" data-dismiss="modal"
								aria-hidden="true">&times;</button>
						</div>
						<div class="modal-body">
							<div id="risksumchart_modal" class="chartviewtemplatediv"></div>
						</div>
					</div>
				</div>
			</div>
      <!--#START Sub Comment View -->
      <div class="modal fade" id="risksum_comments_view_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4>View Comments</h4>
               <button type="button" class="close pull-right" data-dismiss="modal">
                &times;
              </button>
            </div>
            	
            	<div class="col-lg-12 col-md-12 sub_initiatives">
	              	<div class="card">
	                	<div class="d-flex flex-column" style="padding:8px !important;">
		                	<div class="comment-history" id="comment-conversation_1">	
			                  <ul id="common-comment-conversation_employee" style="border: 1px solid #e9ecef;">
			                  	<div id="view_summarycomment-conversation"></div>
			                  </ul>
		                	</div> 
	                	</div>  
	                </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
      <section class="content">
        <!-- Page Header -->
        <div class="page-header row no-gutters py-2 m-t--70">
          <div
            class="col-lg-12 col-md-12 text-center text-sm-left pt-2 mb-0 ml-4"
          >
            <h5
              class="page-title"
              style="font-weight: 600; text-transform: uppercase;"
            >
              Risk Summary
              <a href="../organisation/risk.html" class="risk-icon">
                <i
                  class="fas fa-exclamation-triangle pull-right"
                  style="color: #fff; margin-right: 3%;"
                ></i
              ></a>
            </h5>
          </div>
        </div>
        <!-- End Page Header -->

        <div class="row row-padding m-0">
          <!-------Heat Map------->
          <div
            class="col-lg-8 col-md-6 sub_initiatives select-toggle causenconsequence"
          >
            <div class="card">
              <div class="header d-flex flex-row">
                <h5 class="prob d-flex flex-fill">
                  <strong
                    class="editableTxt1"
                    onkeypress="return (this.innerText.length <= 25)"
                    editable="true"
                    >Heat Map</strong
                  >
                </h5>
                <ul class="header-dropdown m-r--2">
                  <li class="dropdown m-t--10">
                    <a
                      href="#"
                      onclick="return false;"
                      class="dropdown-toggle"
                      data-toggle="dropdown"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="true"
                    >
                      <i class="material-icons">more_vert</i>
                    </a>
                    <ul
                      class="dropdown-menu editoptionparentdropdown-menu pull-right"
                      x-placement="bottom-start"
                      style="
                        position: absolute;
                        will-change: transform;
                        top: 0px;
                        left: 0px;
                        transform: translate3d(0px, 24px, 0px);
                      "
                    >
                      <li>
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target=".risk_chart_view_popup"
														onclick="risksumchartviewdetails();">View</a
                        >
                      </li>
                      <li>
                        <a href="#" onclick="return false;" class="delete-row"
                          >Delete</a
                        >
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="d-flex flex-column employee_div_body_box chartrisktemplatediv">
              <div id="chartdiv_risksum"></div>
              </div>
            </div>
          </div>

          <!-- Comment Section -->
          	<!--<jsp:include page="templates/summarycomments.jsp"></jsp:include>
			<jsp:include page="templates/summarycomments_template.jsp"></jsp:include>-->
          	<div class="col-lg-4 col-md-6 sub_initiatives select-toggle summarycomments">
          	<div class="card">
              <div class="header d-flex flex-row">
                <h5 class="prob d-flex flex-fill">
                  <strong class="editableTxt1" onkeypress="return (this.innerText.length <= 25)" editable="true" data-i18n="Comments">Comments</strong>
                </h5>
                <ul class="header-dropdown m-r--2 d-flex viewrisksummarycomments">
                  <li class="dropdown m-t--10">
                    <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                      <i class="material-icons">more_vert</i>
                    </a>
                    <ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute;will-change: transform;top: 0px;left: 0px;transform: translate3d(0px, 24px, 0px);">
                      <li>
                        <a href="#" data-toggle="modal" data-target="#risksum_comments_view_popup" onclick="risksummarycommentsviewdetails()">View</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="comment-history" id="comment-conversation_1">
				<ul id="comment-conversation" class="summarycomment-conversation_1">
              	<jsp:include page="templates/summarycomments_template.jsp"></jsp:include>
      			<script id="summarycomment-template-parent" type="x-tmpl-mustache">
					{{{commentRows}}}
				</script>
				</ul>
				</div>
				<div class="comment_send risksumcomment_send">
                <div class="form-group d-flex flex-row align-items-center">
                  <div class="form-line">
                    <input type="text" class="form-control" id="risksumarycommentval" placeholder="Type a comment..." autocomplete="off"/>
                  </div>
                  <div class="send_btn" id="send-btn" onclick="handleRiskSummaryCommentsSave('add')" >
                    <i class="fas fa-arrow-right"></i>
                  </div>
                </div>
              </div>
          	</div>    
          </div>
		
		

          <!---------Table-------->
          <div class="col-lg-12 col-md-12 select-toggle tables sub_initiatives">
            <div class="card">
              <div class="header d-flex flex-row">
                <h5 class="prob d-flex flex-fill">
                  <strong class="editableTxt1" onkeypress="return (this.innerText.length <= 25)" editable="true">Tables</strong
                  >
                </h5>
                <c:if test="${RoleUtil.hasPrivilege('Employee,Risksummary','View,Delete',false)}">
                <ul class="header-dropdown m-r--2 d-flex">
                  <li class="dropdown m-t--10">
                    <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                      <i class="material-icons">more_vert</i>
                    </a>
                    <ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute;will-change: transform;top: 0px;left: 0px;transform: translate3d(0px, 24px, 0px);">
                    	<c:if test="${RoleUtil.hasPrivilege('Employee,Risksummary','View',false)}">
                      <li><a href="#" data-toggle="modal" data-target=".Risktableview" onclick="viewsummaryviewdetails()">View</a>
                      </li>
                      </c:if>
                      <c:if test="${RoleUtil.hasPrivilege('Employee,Risksummary','Delete',false)}">
                      <li><a href="#" onclick="return false;" class="delete-row">Delete</a>
                      </li>
                      </c:if>
                    </ul>
                  </li>
                </ul>
                </c:if>
              </div>
              
              <div class="body table-responsive sub-ini-box">
                <div class="col-lg-12 col-md-12">
                  <div class="card">
                    <div class="tableBody">
                      <div class="table-responsive Month box">
                        <table class="table dashboard-task-infos align-center dashboard-table" id="table1" style="margin-bottom: 0px !important;table-layout: fixed;">
			              	<tbody class="summarytable1">
			              	<jsp:include page="templates/summaryTable.jsp"></jsp:include>
			      			<script id="summary-template-parent" type="x-tmpl-mustache">
								{{{bodyRows}}}
							</script>
							</tbody>            
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
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
      <script src="js/pages/core.js"></script>
      <script src="js/pages/charts.js"></script>
      <script src="js/pages/spiritedaway.js"></script>
      <script src="js/pages/animated.js"></script>
      <script src="js/jquery.editable.min.js"></script>
      <script src="js/bootstrap-popover-x.js" type="text/javascript"></script>
      <script src="js/amcharts.js"></script>
      <script src="js/serial.js"></script>
      <script src="js/light.js"></script>
      <script src="js/d3.v4.js"></script>
      <script src="js/d3-scale-chromatic.v1.min.js"></script>
      <script src="js/jquery-resize.js"></script>
      <script src="js/datepickerair.js"></script>
      <script src="js/datepicker.en.js"></script>
      <script src="${contextroot}/js/notify.js"></script>
      <script src="js/initial.js"></script>
      <script src="js/widgets.js"></script>
      <script src="js/pages/widgets/chart-widget.js"></script>
      <script src="js/select2.min.js"></script>
      <script src="js/apexcharts.js"></script>
      <script src="js/risksummary.js"></script>
      <script>
      $('.modal-dialog').draggable({
            handle: ".modal-header"
        });
      </script>
  </body>
