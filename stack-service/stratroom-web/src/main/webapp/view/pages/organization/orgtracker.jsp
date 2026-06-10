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
<link rel="stylesheet" href="${contextroot}/css/select2.min.css"/>
<link href="${contextroot}/css/jquery.contextMenu.min.css" rel="stylesheet">
<link href="${contextroot}/css/file-upload.css" rel="stylesheet">
<style>
.dropdown-menu.pull-right.show {
    position: absolute !important;
    left: auto !important;
    right: 0px !important;
    top: 50px !important;
    transform: none !important;
}
.dropdown-menu.pull.show {
    position: absolute !important;
    left: auto !important;
    right: 20px !important;
    top: 189px !important;
    transform: none !important;
}
	.pointer{
		cursor: pointer;
	}

h5{
    font-size: 14px;
    font-weight: normal;
    color: #444;
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

      .navbar-nav li a i:hover {
        color: gray !important;
      }

.access-control-table thead tr th {
        font-size: 16px;
        font-weight: 600;
        z-index: 1;
        color: #333;
        position: sticky;
        top: 0;
        background-color: #fff;
        padding: 12px 0px;
        text-align: center;
      }

      .access-control-table tbody tr td {
        font-size: 12px;
        font-weight: 500 !important;
        color: #555;
        text-align: center;
        padding: 10px 0px;
      }

  
      .access-control-table tbody tr td  {
        font-size: 12px;
      }



      .table-responsive {
        width: 100%;
        height: 450px;
        overflow-y: auto;
        
      }
/* width */
::-webkit-scrollbar {
        width: 8px !important;
        padding-top: 5% !important;
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
     
      .responsive {
        width: 100%;
        height: 830px;
        overflow-y: auto;
        
      }
      

.button {
  display: inline-block;
  border-radius: 50px;
  background-color: white;
  color: black;
  text-align: center;
  font-size: 18px;
  width: 200px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}



.button:hover span {
  background-color: #b0bec5;
  display: inline-block;
  border-radius: 50px;
  color: black;
  text-align: center;
  font-size: 18px;
  padding: 10px;
  width: 200px;
  transition: all 0.5s;
  cursor: pointer;
}

.button:hover span:after {
  opacity: 1;
  right: 15px;
  top: 5px;
}

.search{
    margin-top: 7px;
    background-color: #fff;
    border-radius: 20px;
    height: 37px;
   
}
.cicon{
  float: right; margin-top: -20px !important; margin-right: 10px;
}
.divcorner{
    border-radius: 10px;
    background-color: #fff; padding: 1px;
    margin-top: 5px;
    width: 100%;
}

.icon{
  margin-top: 18px !important;
}

#message {
  padding-top: 5px;
padding-left: 20px;
}
.first{
  margin-top: 4%;
}
</style>
  </head>

  <body class="light">
  <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
		<jsp:include page="../common/top-navigation.jsp"></jsp:include>
		<div>
			<jsp:include page="../common/left-navigation.jsp"></jsp:include>
			<jsp:include page="../common/right-navigation.jsp"></jsp:include>
		</div>
<div id="deleteModalPageorg" class="modal fade">
	<div class="modal-dialog modal-confirm">
		<div class="modal-content" style="height:auto !important;">
			<div class="modal-header">
				<h4 class="modal-title org-modal-title">Delete</h4>
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
				<h5 class="confirm-modal-content">Do you really want to
					delete?</h5>
				<br>
				<div class="form-line right">
					<input type="hidden" id="deleterecordorgtrackerid" />
					<button type="button" class="btn-default1 btn"
						data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
					<button type="button"
						class="btn btn-danger confirm-modal-deleteBtn"
						onclick="handleorgeventdelete()">Delete</button>
				</div>
			</div>
		</div>
	</div>
</div>
      
	<section class="content">
      <!-- Page Header -->
      <div class="page-header row no-gutters py-2 m-t--70">
        <div class="col-lg-6 col-md-6 text-center text-sm-left pt-2 mb-0 ml-4">
          <h5 class="page-title" style="font-weight: 600; text-transform: uppercase;">ORGANISATION TRACKER
          </h5>
        </div>
      </div>
    
    <!--Main-->
   	<div class="container-fluid">
      	<c:if test="${principal.profile.userRoleName == 'Super User'}">
			<button class="btn btn-custom-secondary pull-right resetvalue" data-name="" data-id="" style="margin-left: 4px; margin-top: 4px;">
	        	<i class="fas fa-backspace" style="font-size: 14px" data-toggle="tooltip" data-placement="bottom" title="Clear All"></i>
	      	</button>
	    </c:if>  	
  
   
  		<button onclick="window.location.href='organizationHome'" class="btn btn-custom-secondary pull-right organizationHomebtn" style="margin-left: 4px; margin-top: 4px;">
        	<i class="fas fa-project-diagram" style="font-size: 14px" data-placement="bottom" title="Organisation" data-toggle="tooltip"></i>
      	</button>
      	<button class="btn btn-custom-secondary pull-right exportbtn dropdown-toggle" style="margin-left: 4px; margin-top: 4px;"
      		href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
      		<i class="fas fa-upload" style="font-size: 14px" data-toggle="tooltip" data-placement="bottom" title="Export"></i>
  		</button>

      
		<ul class="dropdown-menu pull" x-placement="bottom-start" style="position: absolute;will-change: transform;top: 0px;left: 0px;
 			 transform: translate3d(0px, 24px, 0px);">
			<li>
			  <a href="#" id="orgdownloadpdf">Export PDF</a>
			</li>
			<li>
			  <a href="#" id="orgdownloadcsv" data-i18n="Download CSV">Download CSV</a>
			</li>
		</ul>
    	
    	<div class="pull-right">    
      		<div class="col-auto pr-0">
	        	<span id="search1">
		        	<button class="btn btn-custom-secondary pull-right" style="margin-left: 4px; margin-top: 4px;">
		         		<i class="fas fa-search" data-toggle="tooltip" data-placement="bottom" title="Search" ></i>
		         	</button>
	        	</span>
	        	<span class="pull-right search-section search" style=" display: none" id="search_section1">
		          	<input type="text" id="message" onfocus="this.placeholder=''" placeholder="Search..." style="width: 400px;" autocomplete="off"/>
		          	<i class="fas fa-times icon" id="close_search1"></i>
	        	</span>
      		</div>
      	</div>
   <br><br><br>
        <div id="orgtrackerlist">
	   </div>
        
      </div>
      <!-- End Page Body -->
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
      <script src="${contextroot}/js/jquery-ui.min.js"></script>
      <script src="js/moment.js"></script>
      <script src="js/pages/animated.js"></script>
      <script src="js/jquery.editable.min.js"></script>
      <script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
      <script src="js/jquery-resize.js"></script>
      <script src="js/datepickerair.js"></script>
      <script src="js/datepicker.en.js"></script>
      <script src="${contextroot}/js/widgets.js"></script>
      <script src="js/orgtracker.js"></script>
      <script src="${contextroot}/js/notify.js"></script>
      <script src="js/initial.js"></script>
      <script src="${contextroot}/js/select2.min.js"></script>
      <script>
      	$('[data-toggle="tooltip"]').attr("data-placement","bottom");
	  	$('[data-toggle="tooltip"]').tooltip({ 
          	delay: { "show": 0, "hide": 0 } 
 		});
	  </script>	
  </body>
