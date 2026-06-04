<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
  <%@ page contentType="text/html; charset=UTF-8" %>
    <%@ page pageEncoding="UTF-8" %>
      <c:set var="contextroot" value="${pageContext.request.contextPath}" />
      <link href="/stratroom/assets/css/bootstrap.min.css" rel="stylesheet">
      <link href="/stratroom/assets/css/basic.css?v0.004" rel="stylesheet">
      <link href="/stratroom/assets/css/main.css?v0.004" rel="stylesheet">
      <link href="/stratroom/assets/css/responsive.css" rel="stylesheet">
      <link href="${contextroot}/css/basic.css?v0.004" rel="stylesheet">
      

      <!-- Font Awsome Icons -->
      <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
      <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

      <style>
        /* .top-date-picker .form-control {
    border: 0;
    border-radius: 0;
    font-size: 12px;
    display: inline-flex;
    height: 100%;
    width: 150px;
} */

/* Base — let Knockout control top */


        .daterangepicker.orientation-left {
  left: auto !important;
  right: 69px !important;
}

/* Arabic → right */
.daterangepicker.orientation-right {
  right: auto !important;
  left: 69px !important;
}

        .top-date-picker {
          position: relative;
          min-width: 150px;
          white-space: nowrap;
        }

        .top-date-picker .form-control {
          border: 0;
          border-radius: 0;
          font-size: 12px;
          display: inline-block;
          height: 100%;
          width: auto;
          min-width: 150px;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          padding-right: 20px;
        }


        .top-date-picker .daterangepicker {
          position: absolute;
          z-index: 1000;
        }

        .page-loader {
          background: var(--stratroom-body-bg);
          height: 100vh;
          width: 100vw;
          position: fixed;
          inset: 0;
          z-index: 9999;
          padding: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 1;
          visibility: visible;
          transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        .page-loader .circle-loader {
          width: 100px;
          height: 100px;
          margin: auto;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .page-loader .circle-loader::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 4px solid rgba(var(--stratroom-primary-rgb), 0.1);
          border-top-color: var(--stratroom-primary);
          animation: spinLoader 1.5s linear infinite;
        }
        .page-loader .circle-loader .centre-logo {
          width: 52px;
          height: 52px;
          animation: pulse 2s infinite;
        }
        .page-loader .loader-title {
          margin-top: 15px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(var(--stratroom-body-rgb), 0.6);
          text-align: center;
          max-width: 370px;
          line-height: 1.5;
          margin-bottom: 0;
        }
        .page-loader .loader-description {
          margin-bottom: 0;
          font-size: 12px;
          font-weight: 500;
          color: rgba(var(--stratroom-body-color-rgb), 0.6);
          text-align: center;
          max-width: 370px;
          line-height: 1.5;
        }
        .page-loader .loader-text {
          margin-top: 10px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(var(--stratroom-body-color-rgb), 0.6);
          text-align: center;
        }


        @-webkit-keyframes spinLoader {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
        @keyframes spinLoader {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
        @keyframes pulse {
          0% {
            transform: scale(0.95);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(0.95);
          }
        }
      </style>
      <!-- Page Loader -->
        <!-- <div class="page-loader-wrapper" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgb(255, 255, 255); display: flex; justify-content: center; align-items: center; z-index: 9999; flex-direction: column;">
        <div class="loader" style="text-align: center;">
          <div class="m-t-30" style="margin-top: 30px;">
            <img width="100" src="<c:out value="${contextroot}" />
          </div>
          <p style="margin-top: 20px; font-family: Arial, sans-serif; color: #555;">Please wait...</p>
        </div>
      </div> -->

       <div class="page-loader-wrapper" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgb(255, 255, 255); display: flex; justify-content: center; align-items: center; z-index: 9999; flex-direction: column;">
        <!-- <div class="loader" style="text-align: center;">
          <div class="m-t-30" style="margin-top: 30px;">
            <img width="100" src="<c:out value="${contextroot}" />
          </div>
          <p style="margin-top: 20px; font-family: Arial, sans-serif; color: #555;">Please wait...</p>
        </div> -->

        <div class="page-loader">
        <div class="d-flex flex-column justify-content-center gap-1">
            <div class="circle-loader">
                <img class="centre-logo" src="/stratroom/images/logo-icon.svg" alt="startroom" width="62" height="62">
            </div>
            <h5 class="loader-title">“While we load, grab your espresso and stay caffeinated.” <i class="fas fa-coffee text-primary"></i></h5>
            <p class="loader-description"> “it takes 42 beans for a single shot. StratRoom uses countless data points to deliver powerful insights!”</p>
            <p class="loader-text">Loading <span id="percent">0%</span></p>
        </div>
    </div>
      </div>

      <!-- #END# Page Loader -->
      <!-- Overlay For Sidebars -->
      <div class="overlay"></div>
      <!-- #END# Overlay For Sidebars -->

      <!-- Top Bar -->
      <div class="navbar-topbar">
        <div class="container-lg d-flex flex-wrap justify-content-between">
          <!-- Left side controls -->
          <div class="menu-controls d-flex">
            <!-- Logo/Brand -->
            <!-- <a class="navbar-brand control-link" href="#">
		  <img class="applogofinal" style="height: 30px; object-fit: contain;"
			src="<c:out value="${contextroot}"/>/images/Startroom_Final logo-01_1.png"
			alt="StratRoom">
		</a> -->

            <!-- Side menu collapse button -->
            <!-- <a
        class="control-link bar_nav sidemenu-collapse"
        href="#"
        onClick="return false;"
      >
        <span class="icon">
          <i class="nav-hdr-btn ti-menu"></i>
        </span>
      </a> -->

            <!-- Org Structure -->
            <a class="control-link" href="<c:out value='${contextroot}'/>/organizationHome" class="logo-preview"
              id="logoPreview" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Org-Structure">
              <span class="icon">

                <img src="/stratroom/images/org-structure-i.svg" width="18" height="18" alt="Org-Structure" />

              </span>
            </a>

            <!-- Templates -->
            <a class="control-link" href="#create-template" data-bs-toggle="modal" onclick="return false;">
              <span class="icon" data-bs-toggle="tooltip" data-bs-title="Templates">
                <img src="/stratroom/images/template.svg" width="18" height="18" alt="" />
              </span>
            </a>

            <!-- ETL -->
            <a class="control-link" href="${principal.dataManagementUrl}" data-bs-toggle="tooltip"
              data-bs-placement="bottom" data-bs-title="ETL">
              <span class="icon">
                <img src="/stratroom/images/other-i.svg" width="18" height="18" alt="ETL" />
              </span>
            </a>


            <!-- Node-RED -->
            <!-- <a class="control-link"
              href="http://127.0.0.1:1880/"
              target="_blank"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              data-bs-title="Node-RED">

              <span class="icon">
                <img src="/stratroom/images/node-red.svg"
                    width="18"
                    height="18"
                    alt="Node-RED" />
              </span>
            </a> -->

            <div class="nav-item dropdown dropdown-top-header ">
              <a class="control-link masterHeader" href="<c:out value='${contextroot}'/>/masters" aria-expanded="false" data-translate="topbar.masters">Masters</a>
            </div>
          </div>

          <!-- Middle controls (date picker) -->
          <div class="modal fade" id="create-template" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down ">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title createTemplateHeader">Create Templates</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="card custom-card border-0">
                    <div class="card-body">
                      <form id="menuForm">
                        <div class="grid gap-3">
                          <div class="g-col-12">
                            <div class="form-group">
                              <label for="menuName" class="form-label nameHeader">Name</label>

                              <input type="text" class="form-control" id="menuName" placeholder="Enter Name" required>
                            </div>
                          </div>
                          <div class="g-col-12 g-col-md-6">
                            <div class="form-group">
                              <label for="pageType" class="form-label pageTypeHeader">Page Type</label>

                              <select id="pageType" class="form-select" required>
                                <option value="" class="selectPageTypeHeader">Select Page Type</option>
                                <option value="Plan">Plan</option>
                                <option value="Measure">Measure</option>
                                <option value="Execute">Execute</option>
                                <option value="Govern">Govern</option>
                                <option value="Meet">Meet</option>
                                <option value="Report">Report</option>
                                <option value="LandingPage">Landing Page</option>
                              </select>
                            </div>
                          </div>
                          <div class="g-col-12 g-col-md-6">
                            <div class="form-group">
                              <label for="boardType" class="form-label boardTypeHeader">Board Type</label>
                              <select id="boardType" class="form-select" required>
                                <option value="">Select Board Type</option>
                              </select>
                            </div>
                          </div>

                        </div>
                      </form>
                    </div>
                  </div>

                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-label-secondary cancelHeader" data-bs-dismiss="modal" aria-label="Close">
                    Cancel
                  </button>
                  <button class="btn btn-primary saveHeader" id="saveMenuBtn" onclick="handlePageSave()">Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="menu-controls d-flex flex-wrap ms-auto">
          <div class="top-date-picker">
            <input class="top_datepicker form-control form-control-sm" id="daterangepickerperiod" />

          </div>
      </div> -->
          <input class="" id="startMonthDate" name="" hidden/>
              
          <div class="menu-controls d-flex flex-wrap ms-auto">
            <div class="top-date-picker">
              <input class="top_datepicker form-control form-control-sm" id="datePeriod" name="daterangepickerperiod" />
              <c:if test="${startdatePeriod != null}">
                <input type="hidden" id="sessionstartPeriodID" value="<c:out
            value=" ${startdatePeriod}" />" />
              </c:if>
              <c:if test="${enddatePeriod != null}">
                <input type="hidden" id="sessionendPeriodID" value="<c:out
            value=" ${enddatePeriod}" />" />
              </c:if>
            </div>
          </div>
          <div class="menu-controls d-flex flex-wrap">
            <div class="nav-item dropdown">
             <a class="control-link" href="#" id="languageDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
  <span class="icon">
    <img src="/stratroom/images/global-i.svg" width="14" height="14" alt="organization">
  </span>
  
</a>


              <ul class="dropdown-menu dropdown-menu-end border-0 shadow-sm" aria-labelledby="languageDropdown" style="
                  min-width: 120px;
                  padding: 0.5rem 0;
                  z-index: 1060;
                  position: absolute;
                  background-color: white;
                  border: 1px solid #ddd;
                  border-radius: 4px;
                  box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
                  overflow: visible;
                  display: none;
                " x-placement="bottom-end">
               
              </ul>
            </div>
          </div>




          <!-- User Profile -->
          <!-- <div class="nav-item dropdown">
		  <a class="control-link" href="#" data-bs-toggle="dropdown">
			<span class="icon">
			  <c:if test="${empty principal.profile.profileImage}">						
				<img data-name="${parentEmployee.formatImageName()}" data-close="true" 
					 data-bs-toggle="tooltip" data-bs-title="Profile" onclick="return false;" 
					 style="width:30px; height:30px; object-fit: cover;"  
					 alt="user" class="rounded-circle profileplanuser">
			  </c:if> 
			  <c:if test="${not empty principal.profile.profileImage && principal.profile.profileImage == 'images/media.png'}">									
				<img data-close="true" onclick="return false;" 
					 style="width:30px; height:30px; object-fit: cover;" 
					 data-bs-toggle="tooltip" data-bs-title="Profile" alt="user" 
					 class="rounded-circle" src="/stratroom/${principal.profile.profileImage}"/>
			  </c:if>
			  <c:if test="${not empty principal.profile.profileImage && principal.profile.profileImage != 'images/media.png'}">									
				<img data-close="true" onclick="return false;" 
					 style="width:30px; height:30px; object-fit: cover;" 
					 data-bs-toggle="tooltip" data-bs-title="Profile" alt="user" 
					 class="rounded-circle" src="${principal.profile.profileImage}" />
			  </c:if>
			</span>
		  </a>
		  <ul class="dropdown-menu dropdown-menu-end border-0 shadow-sm">
			<li>
			  <div class="d-flex align-items-center px-3 py-2">
				<c:if test="${empty principal.profile.profileImage}">						
				  <img data-name="${parentEmployee.formatImageName()}" 
					   style="width:40px; height:40px; object-fit: cover;"  
					   class="rounded-circle me-2 profileplanuser">
				</c:if> 
				<c:if test="${not empty principal.profile.profileImage}">									
				  <img src="${principal.profile.profileImage == 'images/media.png' ? '/stratroom/' : ''}${principal.profile.profileImage}" 
					   style="width:40px; height:40px; object-fit: cover;" 
					   class="rounded-circle me-2">
				</c:if>
				<div>
				  <div class="fw-bold">${principal.profile.firstName} ${principal.profile.lastName}</div>
				  <small class="text-muted">${principal.profile.userRoleName}</small>
				</div>
			  </div>
			</li>
			<li><hr class="dropdown-divider"></li>
			<li><a class="dropdown-item" href="#">Profile</a></li>
			<li><a class="dropdown-item" href="#">Settings</a></li>
			<li><hr class="dropdown-divider"></li>
			<li><a class="dropdown-item logoutip" href="#">Logout</a></li>
		  </ul>
		</div> -->
        </div>
      </div>
      </div>

      <!-- Super User/Admin Breadcrumb (hidden by default) -->
      <!-- <c:if
  test="${principal.profile.userRoleName == 'Super User' || principal.profile.userRoleName == 'Admin'}"
>
  <nav
    aria-label="breadcrumb"
    class="breadcrumb-wrap topmenubreadcrumb"
    style="display: none"
  >
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="#" class="superroothomepage"
          ><i class="fas fa-home superroothomepage"></i
        ></a>
      </li>
      <li class="breadcrumb-item breadcrumb-circle active" aria-current="page">
        <span class="s-profile">${userPrincipal.profile.firstName}</span>
      </li>
      <li class="breadcrumb-item breadcrumb-hover active" aria-current="page">
        <div class="dropdown d-inline-block">
          <button
            class="btn-new subusermenuname dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            note
            aria-expanded="false"
          ></button>
          <div
            class="dropdown-menu superadmindropdown"
            style="max-height: 500px; overflow-y: auto !important"
            aria-labelledby="dropdownMenuButton"
          ></div>
        </div>
      </li>
    </ol>
  </nav>
</c:if> -->
      <input type="hidden" id="userprincipalprofile" value="${principal.profile.profileImage}" />
      <div class="modal fade presentnotificationalert" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header modalheadercolor">
              <h6 class="modal-title" id="myLargeModalLabel_1">
                Current Meeting List
              </h6>
              <button type="button" class="close" data-dismiss="modal" id="closemeetingPopupId" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12" id="notific_sub-ini-box_view">
                  <ul class="notifics presentmeetingnotifics"></ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script type="text/javascript">
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://api.ipify.org?format=jsonp&callback=DisplayIP";
        //script.src = "http://jsonip.com?callback=DisplayIP";
        script.crossorigin = "anonymous";
        document.getElementsByTagName("head")[0].appendChild(script);

        function DisplayIP(response) {
          localStorage.setItem("systemip", response.ip);
        }
      </script>

      <script type="text/javascript">
        function apply() {
          console.log($("#datePeriod").val());
          var datePeriod = $("#datePeriod").val();
          var methodType = "get";
          $.ajax({
            url: "/stratroom/updateDatePeriod?datePeriod=" + datePeriod,
            type: methodType,
            contentType: "application/json",
            success: function (data, status) {
              location.reload();
            },
          });
        }

        $(document).ready(function () {
          
          const storedLanguage = localStorage.getItem("selectedLang") || "en";
          if(storedLanguage == "ar"){
            $(".masterHeader").text("الرؤساء");
            $(".createTemplateHeader").text("إنشاء القوالب");
            $(".selectPageTypeHeader").text("اختر نوع الصفحة");
            $(".boardTypeHeader").text("اختر نوع اللوحة");
            $(".saveHeader").text("حفظ");
            $(".cancelHeader").text("إلغاء");
            $(".pageTypeHeader").text("نوع الصفحة");
            $(".nameHeader").text("الاسم");
            
          }else if(storedLanguage == "am"){
            $(".masterHeader").text("መምሪያዎች");
            $(".createTemplateHeader").text("ቅንብር ፍጠር");
            $(".selectPageTypeHeader").text("የገጽ አይነት ይምረጡ");
            $(".boardTypeHeader").text("የቦርድ አይነት ይምረጡ");
            $(".saveHeader").text("አስቀምጥ");
            $(".cancelHeader").text("ይቅር");
            $(".pageTypeHeader").text("የገጽ አይነት");
            $(".nameHeader").text("ስም");
          }else{
             $(".masterHeader").text("Masters");
            $(".createTemplateHeader").text("Create Templates");
            $(".selectPageTypeHeader").text("Select Page Type");
            $(".boardTypeHeader").text("Select Board Type");
            $(".saveHeader").text("Save");
            $(".cancelHeader").text("Cancel");
            $(".pageTypeHeader").text("Page Type");
            $(".nameHeader").text("Name");
          }
          var useraccessid = localStorage.getItem("useraccessid");
          if (useraccessid != "" && useraccessid != null) {
            $.ajaxSetup({
              beforeSend: function (xhr) {
                xhr.setRequestHeader("useraccessid", useraccessid);
              },
            });
          }

          var newURL = window.location.href;
          newURL = newURL.toLowerCase();

          var systemip = localStorage.getItem("systemip");
          if (newURL.indexOf("error") != -1) {
            var existsystemreq = localStorage.getItem("existsystemreq");

            if (
              (systemip != null || systemip != "") &&
              (existsystemreq == null || existsystemreq == "")
            ) {
              //$.getJSON("https://api.ipify.org/?format=json", function(e) {
              //systemip	=	e.ip;
              localStorage.setItem("existsystemreq", "");
              var currentEmp = $("#userPrincipal").val();
              var data = {
                userId: currentEmp,
                createdBy: currentEmp,
                action: "User Login",
                systemIp: systemip,
              };
              $.ajax({
                url: "/stratroom/auditTrail",
                type: "post",
                async: false,
                contentType: "application/JSON",
                data: JSON.stringify(data),
                success: function (res) { },
              });
              /*}).fail(function(e){
                localStorage.setItem('systemip',"Cross site error");
                var data	=	{"action":"User Login","systemIp":"Cross site error"};
                $.ajax({
                  url:"/stratroom/auditTrail",
                  type:"post",
                  async:false,
                  contentType:"application/JSON",
                  data:JSON.stringify(data),
                  success:function(res){
                  	
                  }
                });
              });*/
            }
          }

          $(".presentnotificationalert").modal({
            show: false,
            backdrop: "static",
            keyboard: false,
          });

          $.ajaxSetup({
            beforeSend: function (xhr) {
              xhr.setRequestHeader("systemip", systemip);
            },
          });

          $(".profileplanuser").initial({
            charCount: 2,
            height: 30,
            width: 30,
            fontSize: 18,
          });
          var i = 0;
          var autorefresh = 0;
          var notreporteelist = {};
          getreportee();
          function callnotificationinterval() {
            i++;
            if (i == 1) {
              //clearInterval(autorefresh);
            }
            $.ajax({
              url: "/stratroom/notificationList?meetingIntervalCheck=true",
              type: "get",
              contentType: "application/json",
              success: function (data, status) {
                var notificationData = "";
                var ownerName = $("input[name='firstnametop']").val();
                if (data.length > 0 && !jQuery.isEmptyObject(notreporteelist)) {
                  $.each(data, function (i, List) {
                    $.each(notreporteelist, function (key, users) {
                      if (List.owner == users.id) {
                        var userProfileConcate =
                          users.image != undefined && users.image != ""
                            ? 'class="rounded-circle" src="' + users.image + '"'
                            : ' data-name="' +
                            ownerName +
                            '" class="rounded-circle notifyprofileplanuser" ';
                        /*var dateformat		=	new Date(List.notificationValue.formattedDate);
                          var dateformatted	=	dateFormatedtohumanread(dateformat);
                          var timeformatted 	= 	timeFormatedtohumanreadwithampmspace(dateformat);
                          dateformat	=	dateformatted+' '+timeformatted;*/

                        var dateformat = new Date();
                        var notificationcreatedTime = List.notificationValue.dateTime;
                        if (
                          notificationcreatedTime != "" &&
                          notificationcreatedTime != undefined
                        ) {
                          if (notificationcreatedTime.indexOf("Z") == -1) {
                            notificationcreatedTime = notificationcreatedTime + "Z";
                          }

                          dateformat = new Date(
                            notificationcreatedTime
                          ).toISOString();
                          /*var newDateOptions = {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit"
                            }
                            var localtimenoti	=	new Date(dateformat).toLocaleString("en-US", newDateOptions);*/
                          var date = new Date(
                            notificationcreatedTime
                          ).toLocaleDateString();
                          var time = new Date(
                            notificationcreatedTime
                          ).toLocaleTimeString();
                          dateformat = date + ", " + time;
                          //var dateformatted	=	dateFormatedtohumanread(localtimenoti);
                          //var timeformatted 	= 	timeFormatedtohumanreadwithampmspace(localtimenoti);
                          //dateformat	=	dateformatted+' '+timeformatted;
                        }

                        var cusr = "";
                        //check if meeting is assigned
                        if (List.meetingTime != "" && List.meetingTime != undefined) {
                          var meetingtimezone = List.meetingTime;
                          if (meetingtimezone.indexOf("Z") == -1) {
                            meetingtimezone = List.meetingTime + "Z";
                          }

                          var isotime = new Date(meetingtimezone).toISOString();
                          var localtime = new Date(isotime).toLocaleString();
                          var message = List.notificationValue.message;
                          var messageposition =
                            message != "" && message != undefined
                              ? message.indexOf("on")
                              : "";
                          if (messageposition != -1) {
                            message = message.substr(0, messageposition + 2);
                            message = message + " " + localtime;
                          }
                          notificationData +=
                            "<li " +
                            cusr +
                            "><img " +
                            userProfileConcate +
                            ' alt="" />' +
                            "<h6>" +
                            message +
                            "</h6><br>" +
                            "<p>" +
                            dateformat +
                            "</p></li>";
                        }
                      }
                    });
                  });

                  var meetingreadornot = localStorage.getItem("meetingclosed");
                  if (meetingreadornot != "" && meetingreadornot == "closed") {
                  } else {
                    if (!$(".presentnotificationalert").is(":visible")) {
                      $(".presentnotificationalert").modal("show");
                    }
                  }

                  $(".presentmeetingnotifics").html("");
                  $(".presentmeetingnotifics").html(notificationData);
                  $("#notific_sub-ini-box_view").slimscroll({
                    height: "420px",
                    size: "3px",
                    color: "#9c9c9c",
                  });
                  $(".notifyprofileplanuser").initial({
                    charCount: 2,
                    height: 30,
                    width: 30,
                    fontSize: 18,
                  });
                }
              },
            });
          }

          var interval = 1000 * 120 * 1;
          var meetingreadornot = localStorage.getItem("meetingclosed");
          /*if(meetingreadornot !=	"" && meetingreadornot ==	"closed"){
          	
          }else{
            autorefresh	=	setInterval(callnotificationinterval, interval);
          }*/

          autorefresh = setInterval(callnotificationinterval, interval);

          $(document).on("click", ".seeAll", function () {
            $(".notificationheight").attr(
              "style",
              "height:480px;overflow-y:scroll;overflow-x:hidden;margin-right:0;"
            );
            $(".seeAll").addClass("lessAll");
            $(".lessAll").removeClass("seeAll");
            $(".lessAll a").text("Less All");
          });

          $(document).on("click", ".lessAll", function () {
            $(".notificationheight").attr(
              "style",
              "height:350px;overflow-y:hidden;margin-right:0;"
            );
            $(".lessAll").addClass("seeAll");
            $(".seeAll").removeClass("lessAll");
            $(".seeAll a").text("See All");
          });

          $("#noti_Button").click(function (e) {
            // TOGGLE (SHOW OR HIDE) NOTIFICATION WINDOW.
            var resetheight = $(".notificationheight").css("height");
            if (resetheight == "480px") {
              $(".notificationheight").attr(
                "style",
                "height:350px;overflow-y:hidden;margin-right:0;"
              );
              $(".lessAll").addClass("seeAll");
              $(".seeAll").removeClass("lessAll");
              $(".seeAll a").text("See All");
            }

            var notifystorage = localStorage.getItem("notifystorage");
            if (notifystorage != undefined && notifystorage != "") {
              notifystorage = parseInt(parseInt(notifystorage) + 1);
              localStorage.setItem("notifystorage", notifystorage);
            } else {
              localStorage.setItem("notifystorage", 1);
            }

            var readflagupdate = false;
            var notifystorage = localStorage.getItem("notifystorage");
            if (notifystorage != undefined && notifystorage != "") {
              if (notifystorage % 2 == 0) {
                readflagupdate = true;
              }
            }

            if (
              $(".notificationsetting span").hasClass("heartbeat") &&
              readflagupdate == true
            ) {
              $.ajax({
                url: "/stratroom/notificationList?readFlag=true",
                success: function (data, status) {
                  $(".notificationsetting a span:first").removeClass("notify");
                  $(".notificationsetting a span:last").removeClass("heartbeat");
                  $(".notificationupdate li").attr("class", "read");
                },
              });
            }

            $("#notifications").fadeToggle("fast", "linear", function () {
              if ($("#notifications").is(":hidden")) {
              }
            });

            //return false;
          });

          // HIDE NOTIFICATIONS WHEN CLICKED ANYWHERE ON THE PAGE.

          $(document).click(function (event) {
            var element = event.target;
            if (!$(element).closest("li.read,li.unread,#notifications").length) {
              $("#notifications").hide();
            }
          });

          function getreportee() {
            if (jQuery.isEmptyObject(notreporteelist)) {
              $.ajax({
                url: "/stratroom/organization/employeeList",
                async: false,
                success: function (employeeList) {
                  notreporteelist = employeeList;
                },
              });
            }
          }

          getNotification();

          setInterval(getNotification, 1000 * 120 * 1);

          $(document).on("click", "li.unread", function () {
            var dataval = $(this).attr("data-status");
            var $this = $(this);
            if (dataval != "") {
              $.ajax({
                url: "/stratroom/notification/" + dataval,
                type: "put",
                contentType: "application/json",
                success: function (data, status) {
                  $($this).removeAttr("style");
                  $($this).removeClass("unread");
                  if ($(".notificationupdate li.unread").length == 0) {
                    $(".notificationsetting a span:first").removeClass("notify");
                    $(".notificationsetting a span:last").removeClass("heartbeat");
                  }
                },
              });
            }
          });
        });

        $(document).on("click", ".notificationsetting", function (e) {
          var heartbeat = $(e.target).attr("class");
          var showedornot = $("#notifications").css("display");
          var resetheight = $(".notificationheight").css("height");
          if (resetheight == "480px") {
            $(".notificationheight").attr(
              "style",
              "height:350px;overflow-y:hidden;margin-right:0;"
            );
            $(".lessAll").addClass("seeAll");
            $(".seeAll").removeClass("lessAll");
            $(".seeAll a").text("See All");
          }
          if (heartbeat != "" && heartbeat == "heartbeat" && showedornot == "block") {
            $.ajax({
              url: "/stratroom/notificationList?flag=true",
              success: function (data, status) {
                $(".notificationsetting a span:first").removeClass("notify");
                $(".notificationsetting a span:last").removeClass("heartbeat");
                $(".notificationupdate li").attr("class", "read");
              },
            });
          }
        });

        function getNotification() {
          var methodType = "get";
          $.ajax({
            url: "/stratroom/notificationList",
            type: methodType,
            contentType: "application/json",
            success: function (data, status) {
              var notificationData = "";
              var i;
              var ownerName = $("input[name='firstnametop']").val();
              var readFlag = false;
              if (data.length == 0) {
                $(".notificationsetting a span:first").removeClass("notify");
                $(".notificationsetting a span:last").removeClass("heartbeat");
              }
              $(".notificationupdate").empty();
              var currentuserprofile = $("#userprincipalprofile").val();
              $.each(data, function (i, List) {
                var userProfileConcate =
                  currentuserprofile != null && currentuserprofile != ""
                    ? ' class="rounded-circle" src="' + currentuserprofile + '"'
                    : 'data-name="' +
                    ownerName +
                    '" class="rounded-circle swotuserimage"';

                /*var dateformat		=	new Date(List.notificationValue.formattedDate);
                  var dateformatted	=	dateFormatedtohumanread(dateformat);
                  var timeformatted 	= timeFormatedtohumanreadwithampmspace(dateformat);
                  dateformat	=	dateformatted+' '+timeformatted;*/

                var dateformat = new Date();
                var notificationcreatedTime = List.notificationValue.dateTime;
                if (
                  notificationcreatedTime != "" &&
                  notificationcreatedTime != undefined &&
                  notificationcreatedTime != null
                ) {
                  if (notificationcreatedTime.indexOf(".") != -1) {
                    var data = notificationcreatedTime.split(".");
                    notificationcreatedTime = data[0];
                  }
                  if (notificationcreatedTime.indexOf("Z") == -1) {
                    notificationcreatedTime = notificationcreatedTime + ".000Z";
                  }

                  var date = new Date(notificationcreatedTime).toLocaleDateString();
                  var time = new Date(notificationcreatedTime).toLocaleTimeString();
                  dateformat = date + ", " + time;
                } else {
                  dateformat = new Date().toISOString();
                  var localtimenoti = new Date(dateformat).toLocaleString();
                  var dateformatted = dateFormatedtohumanread(localtimenoti);
                  var timeformatted =
                    timeFormatedtohumanreadwithampmspace(localtimenoti);
                  dateformat = dateformatted + " " + timeformatted;
                }

                var cusr = "";
                if (List.status == "unread") {
                  cusr = "style=cursor:pointer";
                }

                //check if meeting is assigned
                if (
                  List.meetingTime != "" &&
                  List.meetingTime != undefined &&
                  List.meetingTime != null
                ) {
                  var meetingtimezone = List.meetingTime;
                  if (meetingtimezone.indexOf("Z") == -1) {
                    meetingtimezone = List.meetingTime + ".000Z";
                  }
                  var isotime = new Date(meetingtimezone).toISOString();
                  var localtime = new Date(isotime).toLocaleString();
                  var message = List.notificationValue.message;
                  var messageposition =
                    message != "" && message != undefined
                      ? message.indexOf("on")
                      : "";
                  if (messageposition != -1) {
                    message = message.substr(0, messageposition + 2);
                    message = message + " " + localtime;
                  }
                  notificationData +=
                    '<li class="' +
                    List.status +
                    '"  data-status="' +
                    List.id +
                    '" ' +
                    cusr +
                    "><img " +
                    userProfileConcate +
                    ' alt="" />' +
                    "<h6>" +
                    message +
                    "</h6>" +
                    "<p>" +
                    dateformat +
                    "</p></li>";
                } else {
                  notificationData +=
                    '<li class="' +
                    List.status +
                    '"  data-status="' +
                    List.id +
                    '" ' +
                    cusr +
                    "><img " +
                    userProfileConcate +
                    ' alt="" />' +
                    "<h6>" +
                    List.notificationValue.message +
                    "</h6>" +
                    "<p>" +
                    dateformat +
                    "</p></li>";
                }

                if (List.status == "unread") {
                  readFlag = true;
                }
              });

              if (readFlag == false) {
                $(".notificationsetting a span:first").removeClass("notify");
                $(".notificationsetting a span:last").removeClass("heartbeat");
              }

              if (readFlag == true) {
                $(".notificationsetting a span:first").addClass("notify");
                $(".notificationsetting a span:last").addClass("heartbeat");
              }

              $(".notificationupdate").append(notificationData);
              $(".swotuserimage").initial({
                charCount: 2,
                height: 30,
                width: 30,
                fontSize: 18,
              });
            },

            //error:readErrorMsg
          });
        }

        $("#closemeetingPopupId").click(function () {
          setTimeout(function () {
            if ($(".modal").is(":visible") == true) {
              $(document.body).addClass("modal-open");
            }
          }, 1000);

          localStorage.setItem("meetingclosed", "closed");
        });

        $("#open_search").click(function () {
          $(".topsearch").val("");
          $(".nav-search").show();
          $("#open_search").hide();
        });

        $("#close_search").click(function () {
          $(".topsearch").val("");
          $("#open_search").show();
          $(".nav-search").hide();
        });
        $(".logoutip").click(function () {
          var systemip = localStorage.getItem("systemip");
          var currentEmp = $("#userPrincipal").val();
          var data = {
            userId: currentEmp,
            createdBy: currentEmp,
            action: "User Logout",
            systemIp: systemip,
          };
          $.ajax({
            url: "/stratroom/auditTrail",
            type: "post",
            async: false,
            contentType: "application/JSON",
            data: JSON.stringify(data),
            success: function (res) {
              localStorage.clear();
              window.location.href = "/stratroom/logout";
            },
            error: function () {
              localStorage.clear();
              window.location.href = "/stratroom/logout";
            },
          });
        });
        $(document).on("click", ".subuserlink", function () {
          localStorage.setItem("orglink", "subuser");
        });
      </script>

      <script>
        const boardTypes = [
          "Strategy Planer", "SWOT", "PESTEL", "Scorecard", "Initiatives & Projects", "Tasks","Initiative Dashboard","Initiatives Map","Strategy Map","Scorecard Dashboard","Compliance Dashboard","Audit Dashboard",
          "Budget Approval", "Budgets", "Risk Register", "Risk Approval", "Compliance","Risk Radar","Risk Dashboard","RiskEvent","Impact Assesment", "Rpo", "Process Enabaler",
          "Meetings", "My Cockpit", "My Charts","My Performance" ];

        const pageBoardMap = {
          Plan: ["Strategy Planner", "SWOT", "PESTEL", "Project Formulation", "Risk Planning", "Audit Management"],
          Measure: ["Scorecard"],
          Execute: ["Initiatives & Projects", "Shared Initiatives",  "Tasks", "Budget Approval", "Budgets"],
          Govern: ["Risk Register", "Risk Approval", "Compliance","Compliance Dashboard","RiskEvent","Impact Assesment", "Rpo", "Process Enabaler", "Incident Management"],
          Meet: ["Meetings"],
          Report: [ "My Cockpit","My Charts", "My Performance"],
          LandingPage: ["Strategy Map", "Initiatives Map", "Risk Radar","Scorecard Dashboard","Risk Dashboard","Initiative Dashboard","Compliance Dashboard", "Audit Dashboard"],
        };

        const pageSelect = document.getElementById("pageType");
        const boardSelect = document.getElementById("boardType");
        const menuList = document.getElementById("menuList");

        pageSelect.addEventListener("change", () => {
          const selected = pageSelect.value;
          boardSelect.innerHTML = '<option value="">Select Board Type</option>';
          if (pageBoardMap[selected]) {
            pageBoardMap[selected].forEach(board => {
              const option = document.createElement("option");
              option.value = board;
              option.textContent = board;
              boardSelect.appendChild(option);
            });
          }
        });



      </script>

      <script>
        function handlePageSave() {
          var currentEmp = $("#userPrincipal").val().trim();
          const payload = {
            "active": 0,
            "createdBy": currentEmp,
            "pageName": $("#menuName").val(),
            "pageType": $("#boardType").val() == "Risk Register" ? "Risk" : $("#boardType").val() == " Risk Radar" ? "Risk Radar" : $("#boardType").val() == "Risk Dashboard" ? "Risk Dashboard": $("#boardType").val() == "Audit Dashboard" ? "Audit Dashboard": $("#boardType").val() == "Initiative Dashboard" ? "Initiative Dashboard": $("#boardType").val() == "Process Enabaler" ? "Process Enabaler": $("#boardType").val() == "RiskEvent" ? "RiskEvent": $("#boardType").val() == "Impact Assesment" ? "Impact Assesment": $("#boardType").val() == "Rpo" ? "Rpo" : $("#boardType").val() == "Tasks" ? "Task" : $("#boardType").val() == "Strategy Planner" ? "Strategy Formulation" : $("#boardType").val() == "Budgets" ? "Budget" : $("#boardType").val() == "Budget Approval" ? "Approval Page" : $("#boardType").val() == "My Cockpit" ? "Cockpit":  $("#boardType").val() == "My Charts" ? "Charts" : $("#boardType").val() == "Risk Planning" ? "Risk Formulation" : $("#boardType").val() == "Shared Initiatives" ? "InitiativeView" : $("#boardType").val() == "Initiatives Map" ? "Initiative Strategic" :  $("#boardType").val() == "Incident Management" ? "Incident Management" : $("#boardType").val() == "Audit Management" ? "AuditManagement" : $("#boardType").val(),
            "groupType": $("#pageType").val(),

          }

          console.log("Saving page with payload:", payload);

          $.ajax({
            url: "/stratroom/pages",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(payload),
            success: function (data, status) {
              console.log(data, "data");
              // if (data.pageDTO.groupType == "Plan" || data.pageDTO.groupType == "Measure" || data.pageDTO.groupType == "Execute" || data.pageDTO.groupType == "Govern" || data.pageDTO.groupType == "Meet") {
              //   console.log("this one", data);
              //   window.location.href = "/stratroom/dashboard/" + data.pageDTO.createdBy + "?pageId=" + data.pageDTO.id;
              // } else if (data.pageDTO.groupType == "Report") {
              //   if (data.pageDTO.pageType == "My Performance") {
              //     window.location.href = "/stratroom/dashboard/" + data.pageDTO.createdBy + "?pageId=" + data.pageDTO.id;
              //   } else {
              //     window.location.href = "/stratroom/whiteboard/" + data.pageDTO.createdBy + "?pageId=" + data.pageDTO.id;
              //   }
              // }

              window.location.reload();
            },
            error: function (data, status) {
              if (data.exception == 'Duplicate PageName Provided') {
                $("#boardnamedup").nextAll().remove();
                $("#boardnamedup")
                  .append(
                    "<span id='spanid' style='color:red'>BoardName already exist</span>");
              } else {
                if (!jQuery.isEmptyObject(data.responseText)) {
                  $.each(JSON.parse(data.responseText), function (key, value) {
                    if (key == "exception") {
                      $.notify(value, {
                        style: 'error',
                        className: 'graynotify'
                      });
                    }
                  });

                }
              }
            }
          })
        }
      </script>

      <script>
        $(document).ready(function () {
          console.log($('input[name="daterangepickerperiod"]').val(), "datePeriodValue");
        });
      </script>

     <script>
    let progress = 0;
    const percentDisplay = document.getElementById("percent");
    const loaderWrapper = document.querySelector(".page-loader-wrapper");

   
    function updateProgress(increment) {
        progress = Math.min(100, progress + increment);
        percentDisplay.textContent = Math.round(progress) + "%";
    }

   
    updateProgress(10); 

   
    document.addEventListener("DOMContentLoaded", function () {
        updateProgress(20);
    });

    
    window.addEventListener("load", function () {
       
        if (progress < 95) {
            progress = 95;
            percentDisplay.textContent = "95%";
        }

        
        setTimeout(() => {
            progress = 100;
            percentDisplay.textContent = "100%";
            
            setTimeout(() => {
                loaderWrapper.style.display = "none";
            }, 150); 
        }, 200);
    });

   
    const images = document.querySelectorAll("img");
    let loadedImages = 0;

    if (images.length > 0) {
        images.forEach(img => {
            img.addEventListener("load", () => {
                loadedImages++;
                const imgProgress = 20 * (loadedImages / images.length); 
                updateProgress(imgProgress / images.length); 
            });
           
            img.addEventListener("error", () => {
                loadedImages++;
            });
        });
    }



  
</script>



