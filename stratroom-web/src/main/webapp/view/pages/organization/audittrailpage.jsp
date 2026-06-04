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


  </head>


  <script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>

  <body class="light">
  <!-- <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}"> -->
		<div style="display: none;">
      <jsp:include page="../common/right-navigation.jsp"></jsp:include>
    </div>

		<jsp:include page="../common/top-navigation.jsp"></jsp:include>
    <header id="header" class="header shadow-sm">
	  
		<jsp:include page="../common/left-navigation.jsp"></jsp:include>
    </header>

      
  <main class="pt-2 pb-2">
    <div class="container-lg">
      <div class="page-header grid gap-2 pb-1">
        <div class="g-col-8 d-flex align-items-center">
          <h4 class="title">
            <span class="icon">
              <img src="/stratroom/images/audit-trail-i.svg" alt="control-panel" title="control-panel">
            </span>
           <span data-translate="Title"> Audit Trail </span>
          </h4>
        </div>
        <div class="load-page page-actions g-col-4">
          <div class="page-icons">
            <ul>
              <li>
                <a href="#" class="audittrailexport">
                  <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Export">
              <img src="/stratroom/images/export-i.svg" alt="" title="">
            </span>
            </a>
              </li>
              <li>
                <a href="#">
                  <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Filter">
              <img src="/stratroom/images/filter-i.svg" alt="" title="">
            </span>
            </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
    <div class="container-lg py-2">
      <div class="audit-trail-container">
        <div class="row g-4">
          <div class="col-12">
            <div class="card table-card border">
              <div
                class="card-header border-0 bg-transparent pb-0 d-flex gap-2 align-items-center justify-content-between">
                <h5 class="card-title fs-6 mb-0">
                  <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)" data-translate="Title">Audit
                    Trail</strong>
                </h5>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-bordered align-center">
                    <thead>
                      <tr>
                        <th class="text-start text-nowrap" data-translate="Performed By">Performed by</th>
                        <th class="text-center text-nowrap" data-translate="Action">Action</th>
                        <th class="text-center text-nowrap" data-translate="Additional Information">Additional Information</th>
                        <th class="text-center text-nowrap" data-translate="Date/Time">Date / Time</th>
                        <th class="text-center text-nowrap" data-translate="IP Address">IP Address</th>
                      </tr>
                    </thead>
                    <tbody id="auditrailcontent"></tbody>
                  </table>
                </div>
                <nav aria-label="Page navigation example" class="paginations">
                  <ul class="pagination justify-content-end pagination-sm mb-0">
                    <li class="page-item disabled">
                      <a class="page-link"><i class="fas fa-arrow-left"></i></a>
                    </li>
                    <li class="page-item active"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                      <a class="page-link" href="#"><i class="fas fa-arrow-right"></i></a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

	<footer class="col-12 text-center py-2 copyright" 
			style="position:fixed; bottom:0; left:0; width:100%; margin:0; padding:8px;">
				<p class="mb-0" style="margin:0;">Copyright &copy; 
				<span id="year"></span> <strong>StratRoom</strong>
				</p>

				<script>
				document.getElementById("year").textContent = new Date().getFullYear();
				</script>
			</footer>


<link href="assets/css/pickr.min.css" rel="stylesheet">
    <link href="assets/css/daterangepicker.min.css" rel="stylesheet">
    <link href="assets/css/jquery-ui.min.css" rel="stylesheet">
    <link href="assets/css/select2.min.css" rel="stylesheet" />
    
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
      <script src="js/audittrail.js"></script>
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
