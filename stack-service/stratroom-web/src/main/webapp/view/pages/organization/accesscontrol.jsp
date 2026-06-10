<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta content="width=device-width, initial-scale=1" name="viewport" />
<title>StratRoom</title>
<link href="${contextroot}/css/app.min.css" rel="stylesheet">
<!-- Custom Css -->
<link href="${contextroot}/css/style.css" rel="stylesheet" /> 
<link href="${contextroot}/css/custom.css" rel="stylesheet" />
<link href="${contextroot}/css/initatives.css" rel="stylesheet" />
<link href="${contextroot}/css/startroom/wedgets.css" rel="stylesheet" />

<link href="${contextroot}/css/styles/all-themes.css" rel="stylesheet" />
<link rel="stylesheet" href="${contextroot}/css/datepickerair.css">
<link href="css/daterangepicker.min.css" rel="stylesheet">
<link rel="stylesheet" href="${contextroot}/css/jquery-ui.min.css">
<link rel="stylesheet" href="${contextroot}/css/employee.css"/>
<link rel="stylesheet" href="${contextroot}/css/treeable/jquery.treetable.css"/>
<link rel="stylesheet" href="${contextroot}/css/select2.min.css"/>
<link rel="stylesheet" href="${contextroot}/css/treeable/jquery.treetable.theme.default.css"/>
<script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>
<script type="text/javascript" src="${contextroot}/js/jquery/jquery.validate.min.js"></script>
<link rel="stylesheet" href="${contextroot}/css/fonts/fontawesome_v_5/font-awesome.min.css">
<link rel="stylesheet" href="${contextroot}/css/fonts/fontawesome_v_5/all.css">
<link href="${contextroot}/css/jquery.contextMenu.min.css" rel="stylesheet">

<style>
.theadbg{
    background-color: #dcdcdc !important;
}
.orientation-right {
        top: 60px !important;
        right: 0 !important;
        left: auto !important;
        position: fixed;
      }

      .theme-black .swot-nav > li > a {
        max-width: 160px;
        overflow: hidden;
        margin-bottom: -10px;
      }

      .access-control-table thead tr th {
        font-size: 16px;
        font-weight: 600;
        z-index: 1;
        border: 1px solid #ececec !important;
        color: #333;
        position: sticky;
        top: 0;
        border: 1px solid #ececec !important;
        box-shadow: inset 1px 1px #ececec, 0 1px #ececec;
        background-color: #f7f7f7;
        padding: 12px 0px;
        text-align: center;
      }

      .access-control-table tbody tr td {
        font-size: 14px;
        font-weight: 500 !important;
        color: #555;
        border: 1px solid #ececec !important;
        box-shadow: inset 1px -1px #ececec;
        text-align: left;
        padding: 4px 0px 0px 16px;
      }

      .access-control-table tbody tr td ul {
        margin-top: 8px;
      }

      .access-control-table tbody tr td h4 {
        font-size: 15px;
        font-weight: 600;
      }

      .access-control-table tbody tr td i {
        font-size: 16px;
      }

      .access-control-table tbody tr td ul li {
        font-size: 13px;
      }

      .access-control-table tbody tr td ul li .far {
        font-size: 16px;
        color: #17b978;
      }

      .access-control-table tbody tr td ul li .fas {
        font-size: 16px;
        color: #ff304f;
      }

      .table-responsive {
        width: 100%;
        height: 560px;
        overflow-y: auto;
        box-shadow: inset 1px -1px #ececec;
      }

      /* width */
      ::-webkit-scrollbar {
        width: 8px !important;
      }

      /* Track */
      ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: rgb(172, 172, 172);
        border-radius: 10px;
      }
</style>
</head>


<body class="light">
	<!-- Page Loader -->
	<jsp:include page="../common/top-navigation.jsp"></jsp:include>
	<!-- #Top Bar -->
	<div>
		<jsp:include page="../common/left-navigation.jsp"></jsp:include>
		<jsp:include page="../common/right-navigation.jsp"></jsp:include>
		<jsp:include page="modal/accessControlModal.jsp"></jsp:include>

		<div id="deleteModalswot" class="modal fade">
			<div class="modal-dialog modal-confirm">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Delete</h4>
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						<h5 class="confirm-modal-content">Do you really want to delete?</h5>
						<br>
						<div class="form-line right">
							<input type="hidden" id="deleterecordid" />
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

		<!--#Multionwer add swot start -->
		<div class="modal fade swot_add_multiuser_popup" tabindex="-1"
			role="dialog" aria-labelledby="myLargeModalLabel_1"
			aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header modalheadercolor">
						<h6 class="modal-title" id="myLargeModalLabel_1">Edit Users</h6>
						<button type="button" class="close getselectedActivitiesUsers"
							id="activities_current_id" data-activities_sub_current_id=""
							data-dismiss="modal" aria-label="Close">&times;</button>
					</div>
					<div id="user_subview" class=""></div>
					<input type="hidden" id="swotajaxid">
					<div class="row showallusericon">
        				<div class="col-md-6 text-center">
            				<span class="float-md-left"></span>
        				</div>
				        <div class="col-md-6 text-center">
				            <span class="float-md-right"><div class="form-check">
				                      <div class="form-check">
				                        <label class="form-check-label">
				                          <input class="form-check-input" id="allusersaccess" type="checkbox" value=""/>
				                          All Users
				                          <span class="form-check-sign">
				                            <span class="check"></span>
				                          </span>
				                        </label>
				                      </div>
				                    </div></span>
						        </div>
						    </div>
						    
					<div class="">
						<div class="col-lg-12 col-md-12">
							<div class="d-flex flex-column employee_div_body_box sub-ini-box"
								id="sub-ini-box_view" style="padding: 8px !important;">
								<span id="activities-ini-box_view_users"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--#Multionwer add swot end -->	
		

		<section class="content">

			<!-- Page Header -->

			<div class="page-header row no-gutters py-2 m-t--70">
				<div
					class="col-lg-6 col-md-6 text-center text-sm-left pt-2 mb-0 ml-4">
					<h5 class="page-title"
						style="font-weight: 600; text-transform: uppercase;">Access Control</h5>
				</div>
			</div>

			<c:if test="${userPrincipal != null}">
				<input id="userPrincipal" type="hidden" name="userPrincipal"
					value="<c:out value="
				${userPrincipal.profile.empId}" />">
			</c:if>
			<c:if test="${pagenumber != null}">
				<input id="pagenumber" type="hidden" name="pagenumber"
					value="<c:out value=" ${pagenumber}" />">
			</c:if>

			<!-- End Page Header -->
			<div class="container-fluid">
				<jsp:include page="templates/accesscontrolchild.jsp"></jsp:include>
				<script id="accesscontrol-template-parent" type="x-tmpl-mustache">
					{{{bodyRows}}}
				</script>
				<div class="row">
		       		<div class="col-lg-12 col-md-12 col-sm-12">
		            	<div class="card" style="padding: 16px;">
			              	<div class="row">
			                	<div class="col-md-12">
			                  		<!-- Access Control -->
			                  		<div class="table-responsive">
				                    	<table class="access-control-table" style="table-layout: fixed;">
				                      		<thead>
				                        		<tr>
					                          		<th style="width: 180px;" class="theadbg">Group</th>
					                          		<th style="width: 280px;" class="theadbg">Users</th>
					                          		<th style="width: 340px;" class="theadbg">Modules</th>
					                          		<th style="width: 160px;" class="theadbg">Permissions</th>
					                          		<th style="width: 80px;" class="theadbg" data-i18n="Action">Action</th>
				                        		</tr>
				                      		</thead>
				                      		<tbody id="accesscontrol_section">                		
				                      		</tbody>
				                      	</table>
			                      	</div>
			                      	<!-- Access Control end-->
			                   	</div>
			                   	<div class="col-md-12 text-center creategroupicon" style="margin-top: 16px;">
                  					<a href="#" onclick="handleaccesscontrolevent('','add')" data-toggle="modal" data-target="#add_group" role="button" style="color: #1e252d !important;">
                    					<i class="fas fa-plus-circle" style="font-size: 18px; padding-right: 8px;"></i>
                    					<span style="font-size: 16px; font-weight: 600;" >Add a new group</span>
                  					</a>
                				</div>
			               	</div>
			           	</div>
			       	</div>
			   	</div>
			</div>



		<c:if test="${userPrincipal != null}">
			<input id="userPrincipal" type="hidden" name="userPrincipal" value="<c:out value="
				${userPrincipal.profile.empId}" />">
		</c:if>
		<c:if test="${pagenumber != null}">
			<input id="pagenumber" type="hidden" name="pagenumber" value="<c:out value=" ${pagenumber}" />">
		</c:if>

		</section>
		
		<script src="${contextroot}/js/app.min.js"></script>
		<script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
		<script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
		<script src="${contextroot}/js/admin.js"></script>
		<script src="${contextroot}/js/jquery-ui.min.js"></script>
		<script src="${contextroot}/js/datepickerair.js"></script>
		<script src="${contextroot}/js/datepicker.en.js"></script>
		<script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
		<script type="text/javascript" src="${contextroot}/js/knockout-3.5.0.js"></script>
		<script type="text/javascript" src="${contextroot}/js/daterangepicker.min.js"></script>
		<script src="${contextroot}/js/notify.js"></script>
		<script src="${contextroot}/js/initial.js"></script>
		<script src="${contextroot}/js/accesscontrol.js"></script>
		<script src="${contextroot}/js/select2.min.js"></script>
		<script>
		
  		$(document).ready(function () {
    		$(".module-multi-select").select2();
  		});
  		$(
					'.swot_add_multiuser_popup')
					.modal({
						show : false,
						backdrop : 'static',
						keyboard : false
					});
				$('.modal-dialog').draggable({
            handle: ".modal-header"
        });	
    	</script>

</body>