<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
  <%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <c:set var="contextroot" value="${pageContext.request.contextPath}" />

    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=Edge">
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <title>StratRoom</title>


      <!-- Font Awsome Icons -->
      <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
      <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <link href="${contextroot}/css/jquery.contextMenu.min.css" rel="stylesheet">

     
    </head>
    <script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>


    <body class="light">
      <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
      <!-- Page Loader -->
     
      <!-- #Top Bar -->
      <div>



        <!-- <div id="createPathFailed" class="modal fade">
          <div class="modal-dialog modal-confirm">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Message</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div class="modal-body">
                <p>Path Provided is incorrect or doesn't have permission!
                <p>
                  <br>
                <div class="form-line right">
                  <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close">Ok</button>

                </div>
              </div>
            </div>
          </div>
        </div> -->

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
                    <img src="images/control-panel-i.svg" alt="control-panel" width="18" height="18">
                  </span>
                 <span data-translate="controlpanel.title">Control Panel</span> 
                </h4>
              </div>
            </div>
          </div>
          <div class="container-lg py-2">
            <div class="card custom-card-tab controlpanel-container">
              <div class="card-body p-0">
                <div class="grid gap-0 control-panel-tabs">
                  <div id="dropdownMenuButtonWrap" class="dropdown control-panel-wrap g-col-12 g-col-lg-3">
                    <button class="btn btn-primary dropdown-toggle d-lg-none" type="button" id="dropdownMenuButton"
                      data-bs-toggle="dropdown" aria-expanded="false" data-translate="general.General">
                      General
                    </button>

                    <!-- <ul class="nav flex-column nav-pills control-panel-tab dropdown-menu" id="v-pills-tab" role="tablist" aria-orientation="vertical"> -->
                    <ul class="dropdown-menu" id="v-pills-tab" role="tablist" aria-orientation="vertical">

                      <button class="nav-link active" id="v-pills-general-tab" data-bs-toggle="pill"
                        data-bs-target="#v-pills-general" type="button" role="tab" aria-controls="v-pills-general"
                        aria-selected="true" onClick="controlPanelEvent('general')">
                        <span class="icon">
                          <img src="images/control-panel-i.svg" alt="General" width="16" height="16">
                        </span>
                        <span class="nav-text" data-translate="general.General">General</span>
                      </button>
                      <button class="nav-link" id="v-pills-theme-tab" data-bs-toggle="pill"
                        data-bs-target="#v-pills-theme" type="button" role="tab" aria-controls="v-pills-theme"
                        aria-selected="false" onClick="controlPanelEvent('theme')">
                        <span class="icon">
                          <img src="images/theme-i.svg" alt="Theme" width="16" height="16">
                        </span>
                        <span class="nav-text" data-translate="themes.Themes">Theme</span>
                      </button>
                      <button class="nav-link" id="v-pills-license-tab" data-bs-toggle="pill"
                        data-bs-target="#v-pills-license" type="button" role="tab" aria-controls="v-pills-license"
                        aria-selected="false" onClick="controlPanelEvent('license')">
                        <span class="icon">
                          <img src="images/licence-i.svg" alt="License" width="16" height="16">
                        </span>
                        <span class="nav-text" data-translate="license.License">License</span>
                      </button>
                      <button class="nav-link" id="v-pills-notifications-tab" data-bs-toggle="pill"
                        data-bs-target="#v-pills-notifications" type="button" role="tab"
                        aria-controls="v-pills-notifications" aria-selected="false">
                        <span class="icon" onClick="controlPanelEvent('notification')">
                          <img src="images/notification-i.svg" alt="Notifications" width="16" height="16">
                        </span>
                        <span class="nav-text" data-translate="system.Notification">Notifications</span>
                      </button>
                      <button class="nav-link" id="v-pills-security-tab" data-bs-toggle="pill"
                        data-bs-target="#v-pills-security" type="button" role="tab" aria-controls="v-pills-security"
                        aria-selected="false">
                        <span class="icon" onClick="controlPanelEvent('security')">
                          <img src="images/security-i.svg" alt="Security" width="16" height="16">
                        </span>
                        <span class="nav-text" data-translate="system.Security">Security</span>
                      </button>
                      <button class="nav-link" id="v-pills-scheduler-tab" data-bs-toggle="pill"
                        data-bs-target="#v-pills-scheduler" type="button" role="tab" aria-controls="v-pills-scheduler"
                        aria-selected="false">
                        <span class="icon" onClick="controlPanelEvent('scheduler')">
                          <img src="images/schedule-i.svg" alt="Scheduler" width="16" height="16">
                        </span>
                        <span class="nav-text" data-translate="system.Schedular">Scheduler</span>
                      </button>
                      <button class="nav-link" id="v-pills-device-tab" data-bs-toggle="pill"
                        data-bs-target="#v-pills-device" type="button" role="tab" aria-controls="v-pills-device"
                        aria-selected="false" onClick="controlPanelEvent('device')">
                        <span class="icon">
                          <img src="images/device-i.svg" alt="Device" width="16" height="16">
                        </span>
                        <span class="nav-text" data-translate="device.Device">Device</span>
                      </button>
                      <button class="nav-link" id="v-pills-backup-restore-tab" data-bs-toggle="pill"
                        data-bs-target="#v-pills-backup-restore" type="button" role="tab"
                        aria-controls="v-pills-backup-restore" aria-selected="false">
                        <span class="icon" onClick="controlPanelEvent('backup')">
                          <img src="images/backup-i.svg" alt="Back Up & Restore" width="16" height="16">
                        </span>
                        <span class="nav-text" data-translate="backup.Backup & Restore">Back Up & Restore</span>
                      </button>
                      <button class="nav-link" id="v-pills-scorecard-tab" data-bs-toggle="pill"
                        data-bs-target="#v-pills-scorecard" type="button" role="tab" aria-controls="v-pills-scorecard"
                        aria-selected="false" onClick="controlPanelEvent('scorecardsettings')">
                        <span class="icon">
                          <img src="images/scorecard-i.svg" alt="Scorecard" width="16" height="16">
                        </span>
                        <span class="nav-text" data-translate="modules.Scorecard">Scorecard</span>
                      </button>
                      <button class="nav-link" id="v-pills-okr-tab" data-bs-toggle="pill" data-bs-target="#v-pills-okr"
                        type="button" role="tab" aria-controls="v-pills-okr" aria-selected="false">
                        <span class="icon">
                          <img src="images/okr-i.svg" alt="OKR" width="16" height="16">
                        </span>
                        <span class="nav-text" data-translate="controlpanel.OKR">OKR</span>
                      </button>
                      <button class="nav-link" id="v-pills-risk-tab" data-bs-toggle="pill"
                        data-bs-target="#v-pills-risk" type="button" role="tab" aria-controls="v-pills-risk"
                        aria-selected="false">
                        <span class="icon" onClick="controlPanelEvent('risksettings')">
                          <img src="images/risk-i.svg" alt="Risk" width="16" height="16">
                        </span>
                        <span class="nav-text" data-translate="modules.Risk">Risk</span>
                      </button>
                      <button class="nav-link" id="v-pills-workflow-setting-tab" data-bs-toggle="pill"
                        data-bs-target="#v-pills-workflow-setting" type="button" role="tab"
                        aria-controls="v-pills-workflow-setting" aria-selected="false" onClick="controlPanelEvent('workflowsettings')">
                        <span class="icon">
                          <img src="images/risk-i.svg" alt="Workflow Setting" width="16" height="16">
                        </span>
                        <span class="nav-text" data-translate="controlpanel.Workflow Setting">Workflow Setting</span>
                      </button>
                    </ul>

                  </div>

                  <div class="tab-content g-col-12 g-col-lg-9" id="v-pills-tabContent">

                    <!-- general :::::::::::::::::::::::::::: -->
                    <div class="tab-pane fade show active" id="v-pills-general" role="tabpanel"
                      aria-labelledby="v-pills-general-tab" tabindex="0">
                      <div class="card custom-card">
                        <div class="card-header">
                          <div class="c-header-left">
                            <h5 class="card-title" data-translate="general.General Settings">General Settings</h5>
                          </div>
                        </div>
                        <div class="card-body">
                          <form id="generalsettingForm">
                            <div class="grid gap-3 p-2">
                              <!-- Site Name -->
                              <div class="g-col-12 g-col-md-6">
                                <div class="form-group">
                                  <label for="sitename" class="form-label" data-translate="general.Site Name">Site Name <span
                                      class="text-danger">*</span></label>
                                  <input type="text" id="sitename" name="sitename" class="form-control"
                                    autocomplete="off" />
                                </div>
                              </div>

                              <!-- Site Language -->
                              <!-- <div class="g-col-12 g-col-md-6">
                                <div class="form-group">
                                  <label for="sitelanguage" class="form-label">Site Language <span
                                      class="text-danger">*</span></label>
                                  <select id="sitelanguage" name="sitelanguage" class="form-select select-dropdown"
                                    disabled>
                                    <option value="English">English</option>
                                    <option value="Arabic">Arabic</option>
                                    <option value="Amharic">Amharic</option>
                                    <option value="Vietnamese">Vietnamese</option>
                                    <option value="French">French</option>
                                    <option value="German">German</option>
                                    <option value="Portuguese">Portuguese</option>
                                    <option value="Spanish">Spanish</option>
                                  </select>
                                </div>
                              </div> -->

                                     <div class="g-col-12 g-col-md-6">
                                       <div class="form-group d-flex flex-wrap gap-2">
                                          <label class="form-label d-block" data-translate="general.Site Language">Site Languages <span class="text-danger">*</span></label>

                                          <div class="form-check">
                                            <input class="form-check-input lang-checkbox" type="checkbox" value="en" id="langEn">
                                            <label class="form-check-label" for="langEn">English</label>
                                          </div>

                                          <div class="form-check">
                                            <input class="form-check-input lang-checkbox" type="checkbox" value="ar" id="langAr">
                                            <label class="form-check-label" for="langAr">Arabic</label>
                                          </div>

                                          <div class="form-check">
                                            <input class="form-check-input lang-checkbox" type="checkbox" value="am" id="langAm">
                                            <label class="form-check-label" for="langAm">Amharic</label>
                                          </div>

                                        
                                        </div>
                                      </div>
                                      <input type="hidden" id="sitelanguage" name="sitelanguage" value="">

                              <!-- Admin Email -->
                              <div class="g-col-12 g-col-md-6">
                                <div class="form-group">
                                  <label for="adminEmailID" class="form-label" data-translate="general.Admin EMail ID">Admin Email ID <span
                                      class="text-danger">*</span></label>
                                  <input type="email" name="adminemailId" id="adminemailId" class="form-control"
                                    value="${userPrincipal.profile.emailAddress}" disabled />
                                  <input id="siteadminemailId" type="hidden" class="form-control" value="${userPrincipal.profile.emailAddress}"/>
                                  <input id="generalid" type="hidden" value="">
                                </div>
                              </div>

                              <!-- Currency -->
                              <div class="g-col-12 g-col-md-6">
                                <div class="form-group">
                                  <label for="settingcurrency" class="form-label" data-translate="general.Currency">Currency <span
                                      class="text-danger">*</span></label>
                                  <select id="settingcurrency" name="settingcurrency"
                                    class="form-select select-dropdown">
                                    <option value="">Select currency</option>
                                    <!-- Currency options would be populated dynamically -->
                                  </select>
                                </div>
                              </div>

                              <!-- Currency View -->
                              <div class="g-col-12 g-col-md-6">
                                <div class="form-group">
                                  <label for="currencyview" class="form-label" data-translate="general.Currency View">Currency View <span
                                      class="text-danger">*</span></label>
                                  <select id="currencyview" name="currencyview" class="form-select select-dropdown">
                                    <option value="">Select</option>
                                    <option value="Thousands(K)">Thousands (K)</option>
                                    <option value="Milions(M)">Milions (M)</option>
                                  </select>
                                </div>
                              </div>

                              <!-- Default Date Period -->
                              <div class="g-col-12 g-col-md-6">
                                <div class="form-group">
                                  <label for="defaultperiod" class="form-label" data-translate="general.Default Data period">Default Date Period <span
                                      class="text-danger">*</span></label>
                                  <select id="defaultperiod" name="defaultperiod" class="form-select select-dropdown">
                                    <option value="">Select</option>
                                    <option value="Month">Month</option>
                                    <option value="Quarter">Quarter</option>
                                    <option value="Half Year">Half Year</option>
                                    <option value="Year">Year</option>
                                  </select>
                                </div>
                              </div>

                              <!-- Financial Cycle -->
                              <div class="g-col-12">
                                <div class="form-group">
                                  <label class="form-label" data-translate="general.Financial Cycle">Financial Cycle <span class="text-danger">*</span></label>
                                  <div class="row">
                                    <div class="col-md-6">
                                      <label class="form-label small" data-translate="general.Start Month">Start Month</label>
                                      <select id="financialstart" name="financialstart"
                                        class="form-select select-dropdown">
                                        <option value="">Select</option>
                                        <option value="Jan">January</option>
                                        <option value="Feb">February</option>
                                        <option value="Mar">March</option>
                                        <option value="Apr">April</option>
                                        <option value="May">May</option>
                                        <option value="Jun">June</option>
                                        <option value="Jul">July</option>
                                        <option value="Aug">August</option>
                                        <option value="Sep">September</option>
                                        <option value="Oct">October</option>
                                        <option value="Nov">November</option>
                                        <option value="Dec">December</option>
                                      </select>
                                    </div>
                                    <div class="col-md-6">
                                      <label class="form-label small" data-translate="general.End Month">End Month</label>
                                      <select id="financialend" name="financialend" class="form-select select-dropdown">
                                        <option value="">Select</option>
                                        <option value="Jan">January</option>
                                        <option value="Feb">February</option>
                                        <option value="Mar">March</option>
                                        <option value="Apr">April</option>
                                        <option value="May">May</option>
                                        <option value="Jun">June</option>
                                        <option value="Jul">July</option>
                                        <option value="Aug">August</option>
                                        <option value="Sep">September</option>
                                        <option value="Oct">October</option>
                                        <option value="Nov">November</option>
                                        <option value="Dec">December</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <!-- Time Zone -->
                              <div class="g-col-12 g-col-md-6">
                                <div class="form-group">
                                  <label for="timeZone" class="form-label" data-translate="general.Time Zone">Time Zone <span
                                      class="text-danger">*</span></label>
                                  <select id="timeZone" name="timeZone" class="form-select select-dropdown">
                                    <option timeZoneId="1" gmtAdjustment="GMT-12:00" useDaylightTime="0" value="">
                                      Select Time Zone
                                    </option>
                                    <option timeZoneId="1" gmtAdjustment="GMT-12:00" useDaylightTime="0" value="-12">
                                      (GMT-12:00) International Date Line West
                                    </option>
                                    <!-- All other timezone options would be included here -->
                                    <!-- ... -->
                                    <option timeZoneId="82" gmtAdjustment="GMT+13:00" useDaylightTime="0" value="13">
                                      (GMT+13:00) Nuku'alofa
                                    </option>
                                  </select>
                                </div>
                              </div>

                              <!-- Implementation -->
                              <div class="g-col-12 g-col-md-6">
                                <div class="form-group">
                                  <label for="implementation" class="form-label" data-translate="general.Implementation">Implementation <span
                                      class="text-danger">*</span></label>
                                  <select id="implementation" name="implementation" class="form-select select-dropdown">
                                    <option value="">Select implementation</option>
                                    <option value="BSC">BSC</option>
                                  </select>
                                </div>
                              </div>

                              <!-- Implementation Type (hidden by default) -->
                              <div class="g-col-12 g-col-md-6 implementation-option BSC" style="display: none">
                                <div class="form-group">
                                  <label for="implementationtype" class="form-label" data-translate="general.Implementation Type">Implementation Type <span
                                      class="text-danger">*</span></label>
                                  <select id="implementationtype" name="implementationtype"
                                    class="form-select select-dropdown">
                                    <option value="">Select Implementation Type</option>
                                    <option value="Department">Department</option>
                                    <option value="Employee">Employee</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div class="card-footer text-end">
                              <button type="submit" class="btn btn-primary" data-translate="general.Save">Update</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <!-- general END:::::::::::::::::::::::::::: -->

                    <!-- theme :::::::::::::::::::::::::::: -->
                    <div class="tab-pane fade" id="v-pills-theme" role="tabpanel" aria-labelledby="v-pills-theme-tab"
                      tabindex="0">
                      <div class="card custom-card">
                        <div class="card-header">
                          <div class="c-header-left">
                            <h5 class="card-title" data-translate="themes.Themes">Theme</h5>
                          </div>

                        </div>
                        <div class="card-body">
                          <div class="grid gap-3 p-2">


                            <div class="g-col-12">
                              <h6 class="section-title mb-0" data-translate="themes.Logo">Logo</h6>
                            </div>

                            <div class="g-col-12">
                              <div class="form-group logo-card align-items-start border-bottom pb-3">

                                <div class="user-image user-image-xl">
                                  <!-- <img id="imagePreview" src="images/logo.png" alt="Preview" width="100" height="100"> -->
                                   <img class="applogofinal" width="180" height="30" src="<c:out value="${contextroot}"/>/images/Startroom_Final logo-01_1.png" alt="">
                                </div>

                                <div class="preview-drag flex-fill">

                                  <label for="fileUpload" class="upload-label">
                                    <div class="upload" data-translate="controlpanel.Choose a File or Drag it Here">Choose a file or drag it here.</div>
                                    <input type="file" class="input-upload" id="application_logo"
                                      accept="image/png, image/jpeg, image/gif">
                                  </label>
                                  <div class="form-text" data-translate="controlpanel.Login logo should be within 700kb and dimension should be 8050x3350">Login logo should be within 700kb and dimension should be 8050x3350
                                    <button id="resetBtn" class="btn btn-link btn-sm d-none" data-translate="themes.General">Reset</button>
                                  </div>
                                  <div id="errorMsg" class="invalid-feedback d-none"></div>

                                </div>

                              </div>
                            </div>

                            <div class="g-col-12">
                              <h6 class="section-title mb-0" data-translate="themes.Login">Login Banner</h6>
                            </div>

                            <div class="g-col-12">
                              <div class="form-group banner-card align-items-start border-bottom pb-3">

                                <div class="user-image user-image-xl">
                                  <img id="imagePreview" src="images/login-bg-01.png" alt="Preview" width="100"
                                    height="100">
                                </div>

                                <div class="preview-drag flex-fill">

                                  <label for="fileUpload" class="upload-label">
                                    <div class="upload" data-translate="controlpanel.Choose a File or Drag it Here">Choose a file or drag it here.</div>
                                    <input type="file" class="input-upload" id="login_logo"
                                      accept="image/png, image/jpeg, image/gif">
                                  </label>
                                  <div class="form-text" data-translate="controlpanel.Login theme should be within 300kb and dimension should be 1310x1100">Login theme should be within 300kb and dimension should be
                                    1310x1100
                                    <button id="resetBtn" class="btn btn-link btn-sm d-none" data-translate="themes.General">Reset</button>
                                  </div>
                                  <div id="errorMsg" class="invalid-feedback d-none"></div>

                                </div>

                              </div>
                            </div>

                            <div class="g-col-12 template-customizer-color">
                              <label class="form-label d-block mb-2" data-translate="themes.Branding Colour">Primary Color</label>
                              <div class="d-flex flex-wrap gap-3 template-customizer-colors-options">
                                <div class="custom-option custom-option-icon">
                                  <span class="custom-option-body selected" style="background-color: #883B71;"
                                    data-color="#883B71"
                                    data-css-var='["--stratroom-primary", "--stratroom-btn-bg","--stratroom-btn-hover-bg", "--stratroom-btn-border-color"]'></span>
                                </div>
                                <div class="custom-option custom-option-icon">
                                  <span class="custom-option-body" style="background-color: #7367f0;"
                                    data-color="#7367f0"
                                    data-css-var='["--stratroom-primary", "--stratroom-btn-bg", "--stratroom-btn-hover-bg", "--stratroom-btn-border-color"]'></span>
                                </div>
                                <div class="custom-option custom-option-icon">
                                  <span class="custom-option-body" style="background-color: #0D9394;"
                                    data-color="#0D9394"
                                    data-css-var='["--stratroom-primary", "--stratroom-btn-bg","--stratroom-btn-hover-bg", "--stratroom-btn-border-color"]'></span>
                                </div>

                                  <div class="custom-option custom-option-icon">
                                    <span class="custom-option-body" style="background-color: #FFAB1D;" data-color="#FFAB1D"  
                                     data-css-var='["--stratroom-primary", "--stratroom-btn-bg","--stratroom-btn-hover-bg", "--stratroom-btn-border-color"]'></span>
                                  </div>
                                  <div class="custom-option-icon">
                                    <span class="custom-option-body" style="background-color: #EB3D63;" data-color="#EB3D63"
                                    data-css-var='["--stratroom-primary", "--stratroom-btn-bg","--stratroom-btn-hover-bg", "--stratroom-btn-border-color"]'></span>
                                  </div>
                                  <div class="custom-option custom-option-icon">
                                    <span class="custom-option-body" style="background-color: #2092EC;" data-color="#2092EC"
                                    data-css-var='["--stratroom-primary", "--stratroom-btn-bg","--stratroom-btn-hover-bg", "--stratroom-btn-border-color"]'></span>
                                  </div>
                                
                                <div class="custom-option custom-option-icon">
                                  <button id="customColorPicker" class="pcr-button" ></button>
                                </div>
                              </div>
                            </div>


                            <div class="g-col-12 template-customizer-theme">
                              <label class="form-label d-block mb-2" data-translate="controlpanel.Theme">Theme</label>

                              <div class="d-flex flex-wrap gap-3 template-customizer-themes-options">
                                <div class="custom-option custom-option-icon">
                                  <input type="radio" id="themeLight" name="theme" class="custom-option-body"
                                    data-theme="light" checked>
                                  <label class="small text-nowrap" for="themeLight" data-translate="controlpanel.Light">Light</label>
                                </div>
                                <div class="custom-option custom-option-icon">
                                  <input type="radio" id="themeDark" name="theme" class="custom-option-body"
                                    data-theme="dark">
                                  <label class="small text-nowrap" for="themeDark" data-translate="controlpanel.Dark">Dark</label>
                                </div>
                                <div class="custom-option custom-option-icon">
                                  <input type="radio" id="themeSystem" name="theme" class="custom-option-body"
                                    data-theme="system">
                                  <label class="small text-nowrap" for="themeSystem" data-translate="controlpanel.System">System</label>
                                </div>
                              </div>
                            </div>


                          </div>

                        </div>
                        <div class="card-footer text-end">
                          <button class="btn btn-primary  initative_save_btn themesavesettings" value="Save" data-translate="general.Save">Save
                          </button>
                        </div>
                      </div>

                    </div>
                    <!-- theme END:::::::::::::::::::::::::::: -->

                    <!-- license :::::::::::::::::::::::::::: -->
                    <div class="tab-pane fade" id="v-pills-license" role="tabpanel"
                      aria-labelledby="v-pills-license-tab" tabindex="0">
                      <div class="card custom-card">
                        <div class="card-header">
                          <div class="c-header-left">
                            <h5 class="card-title" data-i18n="License" data-translate="license.License">License</h5>
                          </div>
                        </div>
                        <div class="card-body">
                          <div class="grid gap-3 p-2">
                            <div class="g-col-12 g-col-md-6">
                              <div class="form-group">
                                <label for="licensevaliddate" class="form-label" data-i18n="Valid" data-translate="license.Valid">Valid</label>
                                <input type="text" id="licensevaliddate" class="form-control" readonly />
                              </div>
                            </div>
                            <div class="g-col-12 g-col-md-6">
                              <div class="form-group">
                                <label for="licensevalidusers" class="form-label" data-i18n="Total Users" data-translate="license.Total Users">Total
                                  Users</label>
                                <input type="text" id="licensevalidusers" class="form-control" readonly />
                              </div>
                            </div>
                          </div>

                         <div class="row gap-3 p-2 mt-3">
    <div class="col-12">
        <h6 class="section-title mb-0" data-i18n="Modules Subscribed" data-translate="license.Modules Subscribed">Modules Subscribed</h6>
    </div>
    <div id="modulelistdata" class="row g-3">
        <!-- Dynamically injected items go here -->
    </div>
</div>
                        </div>
                        <div class="card-footer text-end">
                          <button class="btn btn-primary" data-i18n="Update" data-translate="general.Save">Update</button>
                        </div>
                      </div>
                    </div>
                    <!-- license END:::::::::::::::::::::::::::: -->

                    <!-- notifications :::::::::::::::::::::::::::: -->
                    <div class="tab-pane fade" id="v-pills-notifications" role="tabpanel"
                      aria-labelledby="v-pills-notifications-tab" tabindex="0">
                      <div class="card custom-card">
                        <div class="card-header">
                          <div class="c-header-left">
                            <h5 class="card-title" data-i18n="Notification" data-translate="system.Notification">Notification</h5>
                          </div>
                        </div>
                        <div class="card-body">
                          <div class="grid gap-3 p-2">
                            <div class="g-col-12">
                              <div class="form-check form-switch license-switch">
                                <input type="hidden" id="notificationid">
                                <input class="form-check-input notificationonoff" type="checkbox" role="switch"
                                  id="notificationYesNo">
                                <label class="form-check-label" for="notificationYesNo"
                                  data-i18n="Enable" data-translate="system.Enable">Enable</label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="card-footer text-end">
                          <button class="btn btn-primary" value="Save" data-i18n="Update" data-translate="general.Save">Update</button>
                        </div>
                      </div>
                    </div>
                    <!-- notifications END:::::::::::::::::::::::::::: -->

                    <!-- security :::::::::::::::::::::::::::: -->
                    <div class="tab-pane fade" id="v-pills-security" role="tabpanel"
                      aria-labelledby="v-pills-security-tab" tabindex="0">
                      <div class="card custom-card">
                        <div class="card-header">
                          <div class="c-header-left">
                            <h5 class="card-title" data-translate="system.Security">Security (Sign on method)</h5>
                          </div>

                        </div>
                        <div class="card-body">


                          <!-- Tab Navigation -->
                          <div class="g-col-12 p-2" id="nav-tab" role="tablist">
                            <div class="form-check form-check-inline">
                              <input class="form-check-input security-tab" type="radio" id="securitySAML"
                                name="security" data-bs-target="#nav-securitySAML" role="tab"
                                aria-controls="nav-securitySAML" aria-selected="true" checked>
                              <label class="form-check-label" for="securitySAML">SAML 2.0</label>
                            </div>

                            <div class="form-check form-check-inline">
                              <input class="form-check-input security-tab" type="radio" id="securityOpenIDConnect"
                                name="security" data-bs-target="#nav-securityOpenIDConnect" role="tab"
                                aria-controls="nav-securityOpenIDConnect" aria-selected="false">
                              <label class="form-check-label" for="securityOpenIDConnect">OpenID Connect</label>
                            </div>
                          </div>

                          <!-- Tab Content -->
                          <div class="tab-content tab-content-security p-0" id="nav-tabContent">
                            <!-- SAML 2.0 Tab -->
                            <div class="tab-pane fade" id="nav-securitySAML" role="tabpanel"
                              aria-labelledby="securitySAML" tabindex="0">
                              <div class="card custom-card border-0 p-2">
                                <div class="card-header px-0">
                                  <div class="c-header-left">
                                    <h5 class="card-title">SAML 2.0</h5>
                                  </div>
                                </div>
                                <div class="card-body px-0">
                                  <div class="grid gap-3 py-2">
                                    <div class="g-col-12 g-col-md-4">
                                      <div class="form-group">
                                        <label class="form-label">Application Name</label>
                                        <input type="text" class="form-control" placeholder="Application Name">
                                      </div>
                                    </div>
                                    <div class="g-col-12 g-col-md-4">
                                      <div class="form-group">
                                        <label class="form-label">Client Name</label>
                                        <input type="text" class="form-control" placeholder="Client Name">
                                      </div>
                                    </div>
                                    <div class="g-col-12 g-col-md-4">
                                      <div class="form-group">
                                        <label class="form-label">Redirect URL</label>
                                        <input type="text" class="form-control" placeholder="Redirect URL">
                                      </div>
                                    </div>
                                    <div class="g-col-12">
                                      <div class="form-group">
                                        <label class="form-label">Description</label>
                                        <textarea class="form-control" placeholder="Description" rows="3"></textarea>
                                      </div>
                                    </div>
                                    <div class="g-col-12 g-col-md-4">
                                      <div class="form-group">
                                        <label class="form-label">Access Token Expiry (in hours)</label>
                                        <input type="text" class="form-control"
                                          placeholder="Access Token Expiry (in hours)">
                                      </div>
                                    </div>
                                    <div class="g-col-12 g-col-md-4">
                                      <div class="form-group">
                                        <label class="form-label">JWT Token Expiry (in hours)</label>
                                        <input type="text" class="form-control"
                                          placeholder="JWT Token Expiry (in hours)">
                                      </div>
                                    </div>
                                    <div class="g-col-12 g-col-md-4">
                                      <div class="form-group">
                                        <label class="form-label">Refresh Token Expiry (in days)</label>
                                        <input type="text" class="form-control" placeholder="Refresh Token Expiry">
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="card-footer px-0 text-end ">
                                  <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal"
                                    aria-label="Close">
                                    Discard
                                  </button>
                                  <button class="btn btn-primary" value="Save">Save</button>
                                </div>

                              </div>

                            </div>

                            <!-- OpenID Connect Tab -->
                            <div class="tab-pane fade" id="nav-securityOpenIDConnect" role="tabpanel"
                              aria-labelledby="securityOpenIDConnect" tabindex="0">
                              <div class="card custom-card border-0 p-2">
                                <div class="card-header px-0">
                                  <div class="c-header-left">
                                    <h5 class="card-title">SAML Settings</h5>
                                  </div>
                                </div>
                                <div class="card-body px-0">
                                  <div class="grid gap-3 py-2">
                                    <div class="g-col-12 g-col-md-4">
                                      <div class="form-group">
                                        <label class="form-label" for="SAMSettingsName">Name</label>
                                        <input type="text" class="form-control" id="SAMSettingsName" placeholder="Name">
                                      </div>
                                    </div>

                                    <!-- <div class="g-col-12">
          <h6>Configure Using</h6>
        </div> -->

                                    <div class="g-col-12 mb-3">
                                      <label class="form-label text-uppercase fw-bold mb-2"
                                        for="SAMSettingsName">Configure Using</label>
                                      <div class="form-group d-flex flex-wrap gap-3">
                                        <div class="form-check">
                                          <input class="form-check-input" type="radio" name="configure-using"
                                            id="MetadataURL">
                                          <label class="form-check-label" for="MetadataURL">
                                            Metadata URL
                                          </label>
                                        </div>
                                        <div class="form-check">
                                          <input class="form-check-input" type="radio" name="configure-using"
                                            id="metadataFile">
                                          <label class="form-check-label" for="metadataFile">
                                            Metadata File
                                          </label>
                                        </div>
                                        <div class="form-check">
                                          <input class="form-check-input" type="radio" name="configure-using"
                                            id="manualSettings">
                                          <label class="form-check-label" for="manualSettings">
                                            Manual Settings
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div class="grid gap-3 py-2 samldiv" id="URL">
                                    <div class="g-col-12 g-col-md-6">
                                      <div class="form-group">
                                        <label class="form-label" for="metadataurl">Metadata URL</label>
                                        <input type="text" class="form-control" id="metadataurl"
                                          placeholder="Metadata URL">
                                      </div>
                                    </div>
                                    <div class="g-col-12 g-col-md-6">
                                      <div class="form-group">
                                        <label class="form-label" for="samlconsumer">SAML Consumer URL</label>
                                        <input type="text" class="form-control" id="samlconsumer"
                                          placeholder="SAML Consumer URL">
                                      </div>
                                    </div>
                                    <div class="g-col-12 g-col-md-6">
                                      <div class="form-group">
                                        <label class="form-label" for="samlservice">SAML Service Provider Metadata
                                          URL</label>
                                        <input type="text" class="form-control" id="samlservice"
                                          placeholder="SAML Service Provider Metadata URL">
                                      </div>
                                    </div>
                                    <div class="g-col-12 g-col-md-6">
                                      <div class="form-group">
                                        <label class="form-label" for="samlentity">SAML Entity ID</label>
                                        <input type="text" class="form-control" id="samlentity"
                                          placeholder="SAML Entity">
                                      </div>
                                    </div>
                                    <div class="g-col-12 g-col-md-6">
                                      <div class="form-group">
                                        <label class="form-label" for="certificatefingerprintalg">Certificate
                                          Fingerprint Algorithm</label>
                                        <input type="text" class="form-control" id="certificatefingerprintalg"
                                          placeholder="Certificate Fingerprint Algorithm">
                                      </div>
                                    </div>
                                  </div>

                                  <div class="grid gap-3 py-2" id="MSettings" style="display: none;">
                                    <div class="g-col-12 g-col-md-6">
                                      <div class="form-group">
                                        <label class="form-label" for="manualsinglesignon">Single Sign On
                                          Endpoint</label>
                                        <input type="text" class="form-control" id="manualsinglesignon"
                                          placeholder="Single Sign On Endpoint">
                                      </div>
                                    </div>
                                    <div class="g-col-12 g-col-md-6">
                                      <div class="form-group">
                                        <label class="form-label" for="manualcertificatefingerprint">Certificate
                                          Fingerprint</label>
                                        <input type="text" class="form-control" id="manualcertificatefingerprint"
                                          placeholder="Certificate Fingerprint">
                                      </div>
                                    </div>
                                    <div class="g-col-12 g-col-md-6">
                                      <div class="form-group">
                                        <label class="form-label" for="manualsamlconsumer">SAML Consumer URL</label>
                                        <input type="text" class="form-control" id="manualsamlconsumer"
                                          placeholder="SAML Consumer URL">
                                      </div>
                                    </div>
                                    <div class="g-col-12 g-col-md-6">
                                      <div class="form-group">
                                        <label class="form-label" for="manualsamlservice">SAML Service Provider Metadata
                                          URL</label>
                                        <input type="text" class="form-control" id="manualsamlservice"
                                          placeholder="SAML Service Provider Metadata URL">
                                      </div>
                                    </div>
                                    <div class="g-col-12 g-col-md-6">
                                      <div class="form-group">
                                        <label class="form-label" for="manualsamlentity">SAML Entity ID</label>
                                        <input type="text" class="form-control" id="manualsamlentity"
                                          placeholder="SAML Entity ID">
                                      </div>
                                    </div>
                                    <div class="g-col-12 g-col-md-6">
                                      <div class="form-group">
                                        <label class="form-label" for="manualcertificatefingerprintalg">Certificate
                                          Fingerprint Algorithm</label>
                                        <input type="text" class="form-control" id="manualcertificatefingerprintalg"
                                          placeholder="Certificate Fingerprint Algorithm">
                                      </div>
                                    </div>
                                  </div>

                                </div>
                                <div class="card-footer px-0 text-end ">
                                  <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal"
                                    aria-label="Close">
                                    Discard
                                  </button>
                                  <button class="btn btn-primary" value="Save">Save</button>
                                </div>

                              </div>
                            </div>
                          </div>



                          <!-- <div class="grid gap-3 p-2">
      
      
                            <div class="g-col-12">
                              <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" id="securitySAML" value="option1"
                                  name="security">
                                <label class="form-check-label" for="securitySAML">SAML 2.0</label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" id="securityOpenIDConnect" value="option2"
                                  name="security">
                                <label class="form-check-label" for="securityOpenIDConnect">OpenID Connect</label>
                              </div>
                            </div>
      
      
                           
                          </div> -->

                        </div>

                      </div>
                    </div>
                    <!-- security END:::::::::::::::::::::::::::: -->

                    <!-- scheduler :::::::::::::::::::::::::::: -->
                    <div class="tab-pane fade" id="v-pills-scheduler" role="tabpanel"
                      aria-labelledby="v-pills-scheduler-tab" tabindex="0">
                      <div class="card custom-card">
                        <div class="card-header">
                          <div class="c-header-left">
                            <h5 class="card-title" data-i18n="Schedular" data-translate="system.Schedular">Scheduler</h5>
                          </div>
                        </div>
                        <div class="card-body">
                          <div class="grid gap-3 p-2">
                            <div class="g-col-12">
                              <div class="form-group">
                                <input type="hidden" id="schedulerid">
                                <div class="input-group">
                                  <select id="schedulertype" class="form-select select-dropdown"
                                    data-placeholder="Select Archive">
                                    <option value="6 months" data-i18n="6 months">6 months</option>
                                    <option value="3 months" data-i18n="3 months">3 months</option>
                                    <option value="Monthly" data-i18n="Monthly">Monthly</option>
                                    <option value="Now" data-i18n="Now">Now</option>
                                  </select>
                                  <button class="btn btn-primary schedulerevent" type="button" value="Archive"
                                    data-i18n="Archive" data-translate="system.Archive">
                                    Archive
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- scheduler END:::::::::::::::::::::::::::: -->

                    <!-- device :::::::::::::::::::::::::::: -->
                    <div class="tab-pane fade" id="v-pills-device" role="tabpanel" aria-labelledby="v-pills-device-tab"
                      tabindex="0">
                      <div class="card custom-card">
                        <div class="card-header">
                          <div class="c-header-left">
                            <h5 class="card-title" data-i18n="Device" data-translate="device.Device">Device</h5>
                          </div>
                        </div>
                        <div class="card-body">
                          <div class="grid gap-3 p-2">
                            <div class="g-col-12">
                              <div class="form-check form-switch">
                                <input class="form-check-input devicechange" type="checkbox" role="switch"
                                  id="webappdevice" value="Web" disabled>
                                <label class="form-check-label" for="webappdevice" data-i18n="Web" data-translate="device.Web">Web</label>
                              </div>
                            </div>
                            <div class="g-col-12">
                              <div class="form-check form-switch">
                                <input class="form-check-input devicechange" type="checkbox" role="switch"
                                  id="mobileappdevice" value="Mobile App" disabled>
                                <label class="form-check-label" for="mobileappdevice" data-i18n="Mobile App" data-translate="device.Mobile App">Mobile
                                  App</label>
                              </div>
                              <input type="hidden" id="deviceid">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- device END:::::::::::::::::::::::::::: -->

                    <!-- backup-restore:::::::::::::::::::::::::::: -->
                    <div class="tab-pane fade" id="v-pills-backup-restore" role="tabpanel"
                      aria-labelledby="v-pills-backup-restore-tab" tabindex="0">
                      <div class="card custom-card">
                        <div class="card-header">
                          <div class="c-header-left">
                            <h5 class="card-title" data-i18n="Back Up & Restore" data-translate="backup.Backup & Restore">Back Up & Restore</h5>
                          </div>
                        </div>
                        <div class="card-body">
                          <!-- Backup Section -->
                          <div class="grid gap-3 p-2">
                            <div class="g-col-12">
                              <h6 class="section-title mb-0" data-i18n="Backup" data-translate="backup.Backup">Back Up</h6>
                            </div>
                            <div class="g-col-12 g-col-md-6">
                              <div class="form-group">
                                <label for="backupduration" class="form-label" data-i18n="Backup" data-translate="backup.Backup">Back Up</label>
                                <select id="backupduration" class="form-select select-dropdown">
                                  <option value="6 months" data-i18n="6 months">6 months</option>
                                  <option value="3 months" data-i18n="3 months">3 months</option>
                                  <option value="Monthly" data-i18n="Monthly">Monthly</option>
                                  <option value="Weekly" data-i18n="Weekly">Weekly</option>
                                  <option value="Now" data-i18n="Now">Now</option>
                                </select>
                              </div>
                            </div>
                            <div class="g-col-12 g-col-md-6">
                              <div class="form-group">
                                <label for="backupPath" class="form-label" data-i18n="Browse" data-translate="backup.Browse">Browse</label>
                                <div class="input-group">
                                  <input type="text" name="browse_logo" class="form-control"
                                    placeholder="give a back path ex: D:/mysql/" />
                                  <button class="btn btn-primary backupevent" type="button" value="Back up"
                                    data-i18n="Backup" data-translate="backup.Backup">Back up</button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <hr />

                          <!-- Restore Section -->
                          <div class="grid gap-3 p-2">
                            <div class="g-col-12">
                              <h6 class="section-title mb-0" data-i18n="Restore" data-translate="backup.Restore">Restore</h6>
                              <input type="hidden" id="restoreid">
                            </div>
                            <div class="g-col-12 g-col-md-6">
                              <div class="form-group">
                                <label for="restorePath" class="form-label"
                                  data-i18n="Appliction Restore Path" data-translate="backup.Application restore path">Application Restore Path</label>
                                <div class="input-group">
                                  <select id="restorePath" class="form-select select-dropdown">
                                    <!-- Options will be populated dynamically -->
                                  </select>
                                  <button class="btn btn-primary restoreevent" type="button" id="restorebutton"
                                    value="Save" data-i18n="Restore" data-translate="backup.Restore">Restore</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- backup-restore END:::::::::::::::::::::::::::: -->

                    <!-- scorecard :::::::::::::::::::::::::::: -->
                  <div class="tab-pane fade" id="v-pills-scorecard" role="tabpanel" aria-labelledby="v-pills-scorecard-tab" tabindex="0">
  <div class="card custom-card">
    <div class="card-header">
      <div class="c-header-left">
        <h5 class="card-title" data-translate="modules.Scorecard">Scorecard</h5>
      </div>
    </div>
    <div class="card-body">

      <!-- Scorecard Fields -->
      <div class="grid gap-3 p-2">
        <div class="g-col-12">
          <div class="form-group">
            <label for="scorecardFields" class="form-label" data-translate="scorecard.Scorecard Fields">Scorecard Fields</label>
            <div class="d-grid grid-template gap-2">
            <div class="form-check">
              <input class="form-check-input scorecardviewsettingchange" type="checkbox" id="scorecardactual" name="scorecard_fields" value="Actual" >
              <label class="form-check-label" for="scorecardactual" data-i18n="Actual" data-translate="scorecard.Actual">Actual</label>
            </div>
              <div class="form-check">
                <input class="form-check-input scorecardviewsettingchange" type="checkbox" id="scorecardtarget" value="Target" name="scorecard_fields">
                <label class="form-check-label" for="scorecardtarget" data-translate="scorecard.Target">Target</label>
              </div>
              <div class="form-check">
                <input class="form-check-input scorecardviewsettingchange" type="checkbox" id="scorecardbudget" value="Budget" name="scorecard_fields">
                <label class="form-check-label" for="scorecardbudget" data-translate="scorecard.Budget">Growth</label>
              </div>
              <div class="form-check">
                <input class="form-check-input scorecardviewsettingchange" type="checkbox" id="scorecardforecast" value="Forecast" name="scorecard_fields">
                <label class="form-check-label" for="scorecardforecast" data-translate="scorecard.Forecast">Conservative</label>
              </div>
               <div class="form-check">
                <input class="form-check-input scorecardviewsettingchange" type="checkbox" id="scorecardbaseline" value="Baseline" name="scorecard_fields">
                <label class="form-check-label" for="scorecardbaseline" data-translate="controlpanel.baseLine">Baseline</label>
              </div>
              <div class="form-check">
                <input class="form-check-input scorecardviewsettingchange" type="checkbox" id="scorecardscore" value="Index" name="scorecard_fields">
                <label class="form-check-label" for="scorecardscore" data-translate="scorecard.Index">Index</label>
              </div>
              <div class="form-check">
                <input class="form-check-input scorecardviewsettingchange" type="checkbox" id="scorecardtrend" value="Trend" name="scorecard_fields">
                <label class="form-check-label" for="scorecardtrend" data-translate="scorecard.Trend">Trend</label>
              </div>
              <div class="form-check">
                <input class="form-check-input scorecardviewsettingchange" type="checkbox" id="scorecardrisk" value="Risk" name="scorecard_fields">
                <label class="form-check-label" for="scorecardrisk" data-translate="modules.Risk">Risk</label>
              </div>

              <div class="form-check">
                <input class="form-check-input scorecardviewsettingchange" type="checkbox" id="scorecarddecline" value="Decline" name="scorecard_fields">
                <label class="form-check-label" for="scorecarddecline" data-translate="scorecard.Decline">Decline</label>
              </div>
            </div>
          </div>
        </div>

        <!-- Year to Date (YTD) -->
        <div class="g-col-12">
          <div class="form-check form-switch">
            <input class="form-check-input customperformancechange" type="checkbox" role="switch" id="yearToDate">
            <label class="form-check-label" for="yearToDate" data-translate="scorecard.Year to Date (YTD)">Year to Date (YTD)</label>
          </div>
        </div>

        <!-- Aggregation -->
        <div class="g-col-12">
          <div class="switch-accordion">
            <button class="form-check form-switch" data-bs-toggle="collapse" href="#scorecard-switch-collapse1" role="button" aria-expanded="false" aria-controls="scorecard-switch-collapse1">
              <input class="form-check-input customperformancechange" type="checkbox" role="switch" id="aggregation">
              <label class="form-check-label" for="aggregation" data-translate="scorecard.Aggregation">Aggregation</label>
            </button>

            <div class="collapse" id="agg_type"  style="display: none">
              <div class="grid pt-2">
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="ag-type" class="form-label" data-translate="scorecard.Type">Type</label>
                    <select id="ag-type" class="form-select select-dropdown w-100" data-placeholder="Select Type">
                      <option data-i18n="Choose">Choose</option>
                      <option value="Default">Default</option>
                      <option value="Custom">Custom</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Status -->
        <div class="g-col-12">
          <div class="switch-accordion">
            <button class="form-check form-switch" data-bs-toggle="collapse" href="#scorecard-switch-collapse2" role="button" aria-expanded="false" aria-controls="scorecard-switch-collapse2">
              <input class="form-check-input customperformancechange" type="checkbox" role="switch" id="custom_status">
              <label class="form-check-label" for="custom_status" data-translate="performance.Status">Status</label>
            </button>
            <div class="collapse" id="scorecard-switch-collapse2">
              <div class="grid pt-2">
                <div class="g-col-12">
                  <div class="d-grid grid-template gap-2">
                    <div class="form-check form-switch">
                      <input class="form-check-input statusperformance" type="checkbox" role="switch" id="kpistatus">
                      <label class="form-check-label" for="kpistatus" data-translate="performance.KPI">KPI</label>
                    </div>
                    <div class="form-check form-switch">
                      <input class="form-check-input statusperformance" type="checkbox" role="switch" id="objectivestatus">
                      <label class="form-check-label" for="objectivestatus" data-translate="performance.Ojective">Objective</label>
                    </div>
                    <div class="form-check form-switch">
                      <input class="form-check-input statusperformance" type="checkbox" role="switch" id="perspectivestatus">
                      <label class="form-check-label" for="perspectivestatus" data-translate="performance.Perspective">Perspective</label>
                    </div>
                    <div class="form-check form-switch">
                      <input class="form-check-input statusperformance" type="checkbox" role="switch" id="scorecardstatus">
                      <label class="form-check-label" for="scorecardstatus" data-translate="modules.Scorecard">Scorecard</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Index -->
        <div class="g-col-12">
          <div class="switch-accordion">
            <button class="form-check form-switch" data-bs-toggle="collapse" href="#scorecard-switch-collapse3" role="button" aria-expanded="false" aria-controls="scorecard-switch-collapse3">
              <input class="form-check-input customperformancechange" type="checkbox" role="switch" id="custom_score">
              <label class="form-check-label" for="custom_score" data-translate="scorecard.Index">Index</label>
            </button>
            <div class="collapse" id="scorecard-switch-collapse3">
              <div class="grid pt-2">
                <div class="g-col-12">
                  <div class="d-grid grid-template gap-2">
                    <div class="form-check form-switch">
                      <input class="form-check-input scoreperformance" type="checkbox" role="switch" id="kpiscore">
                      <label class="form-check-label" for="kpiscore" data-translate="performance.KPI">KPI</label>
                    </div>
                    <div class="form-check form-switch">
                      <input class="form-check-input scoreperformance" type="checkbox" role="switch" id="objectivescore">
                      <label class="form-check-label" for="objectivescore" data-translate="performance.Objective">Objective</label>
                    </div>
                    <div class="form-check form-switch">
                      <input class="form-check-input scoreperformance" type="checkbox" role="switch" id="perspectivescore">
                      <label class="form-check-label" for="perspectivescore" data-translate="performance.Prespective">Perspective</label>
                    </div>
                    <div class="form-check form-switch">
                      <input class="form-check-input scoreperformance" type="checkbox" role="switch" id="scorecardscoreper">
                      <label class="form-check-label" for="scorecardscoreper" data-translate="modules.Scorecard">Scorecard</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Performance -->
        <div class="g-col-12 perfor_sow">
          <div class="switch-accordion">
            <button class="form-check form-switch" data-bs-toggle="collapse" href="#scorecard-switch-collapse4" role="button" aria-expanded="false" aria-controls="scorecard-switch-collapse4">
              <input class="form-check-input customperformancechange" type="checkbox" role="switch" id="performance">
              <label class="form-check-label" for="performance" data-translate="performance.Performance">Performance</label>
            </button>
            <div class="collapse" id="scorecard-switch-collapse4">
              <div class="grid pt-2">
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="kpi_threshold1" class="form-label" data-translate="performance.Threshold">Threshold</label>
                    <select id="kpi_threshold1" class="form-select select-dropdown w-100">
                      <option value="three_status" ></option>Three Status</option>
                      <option value="five_status" >Five Status</option>
                    </select>
                  </div>
                </div>
                <!-- Color Pickers will be dynamically shown based on threshold selection -->
                <div class="g-col-12">
                  <div class="color-pickers scorecard-color-pickers">
                    <div class="input-group">
                      <input id="optioncolor1" type="text" class="form-control colorvalueedit">
                      <span class="input-group-text pickr optioncolor1" role="button" aria-label="Color picker"></span>
                    </div>
                    <div class="input-group">
                      <input id="optioncolor2" type="text" class="form-control colorvalueedit">
                      <span class="input-group-text pickr optioncolor2" role="button" aria-label="Color picker"></span>
                    </div>
                    <div class="input-group">
                      <input id="optioncolor3" type="text" class="form-control colorvalueedit">
                      <span class="input-group-text pickr optioncolor3" role="button" aria-label="Color picker"></span>
                    </div>
                    <div class="input-group">
                      <input id="optioncolor4" type="text" class="form-control colorvalueedit" style="display: none;">
                      <span class="input-group-text pickr optioncolor4" role="button" aria-label="Color picker" style="display: none;"></span>
                    </div>
                    <div class="input-group">
                      <input id="optioncolor5" type="text" class="form-control colorvalueedit" style="display: none;">
                      <span class="input-group-text pickr optioncolor5" role="button" aria-label="Color picker" style="display: none;"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Custom Performance -->
        <div class="g-col-12 cus_perfor_sow">
          <div class="switch-accordion">
            <button class="form-check form-switch" data-bs-toggle="collapse" href="#scorecard-switch-collapse5" role="button" aria-expanded="false" aria-controls="scorecard-switch-collapse5">
              <input class="form-check-input customperformancechange" type="checkbox" role="switch" id="custom_performance">
              <label class="form-check-label" for="custom_performance" data-translate="controlpanel.Custom Performance">Custom Performance</label>
            </button>
            <div class="collapse" id="custom_performances">
            <div class="row" style="display: none" id="custom_threshold">

                                        <div class="col-12 mb-4">
                                          <label for="kpi_threshold" class="control-label"
                                            data-i18n='Custom Threshold' data-translate="controlpanel.Custom Threshold">Custom Threshold</label>
                                          <select id="kpi_threshold" class="form-control browser-default">
                                            <option value="three_status" data-i18n="Three Status" >Three Status</option>
                                            <option value="five_status" data-i18n='Five Status' >Five Status</option>

                                          </select>
                                        </div>


                                        <div
                                          class="col-md-4 mb-4 color_picks_one color_picks_two color_picks_three color_picks_five"
                                          style="display: none">
                                          <div class="input-group">
                                            <input id="optioncolor1" type="text"
                                              class="form-control browser-default colorvalueedit" autocomplete="off" />
                                            <div class="input-group-append">
                                              <span class="input-group-text pickr optioncolor1" role="button"
                                                aria-label="toggle color picker dialog" style="height: 5vh"></span>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="col-md-4 mb-4 color_picks_two color_picks_three color_picks_five"
                                          style="display: none">
                                          <div class="input-group">
                                            <input id="optioncolor2" type="text"
                                              class="form-control browser-default colorvalueedit" autocomplete="off" />
                                            <div class="input-group-append">
                                              <span class="input-group-text pickr optioncolor2" role="button"
                                                aria-label="toggle color picker dialog" style="height: 5vh"></span>
                                            </div>
                                          </div>
                                        </div>

                                        <div class="col-md-4 mb-4 color_picks_three color_picks_five"
                                          style="display: none">
                                          <div class="input-group">
                                            <input id="optioncolor3" type="text"
                                              class="form-control browser-default colorvalueedit" autocomplete="off" />
                                            <div class="input-group-append">
                                              <span class="input-group-text pickr optioncolor3" role="button"
                                                aria-label="toggle color picker dialog" style="height: 5vh"></span>
                                            </div>
                                          </div>
                                        </div>

                                        <div class="col-md-4 mb-4 color_picks_five" style="display: none">
                                          <div class="input-group">
                                            <input id="optioncolor4" type="text"
                                              class="form-control browser-default colorvalueedit" autocomplete="off" />
                                            <div class="input-group-append">
                                              <span class="input-group-text pickr optioncolor4" role="button"
                                                aria-label="toggle color picker dialog" style="height: 5vh"></span>
                                            </div>
                                          </div>
                                        </div>

                                        <div class="col-md-4 mb-4 color_picks_five" style="display: none">
                                          <div class="input-group">
                                            <input id="optioncolor5" type="text"
                                              class="form-control browser-default colorvalueedit" autocomplete="off" />
                                            <div class="input-group-append">
                                              <span class="input-group-text pickr optioncolor5" role="button"
                                                aria-label="toggle color picker dialog" style="height: 5vh"></span>
                                            </div>
                                          </div>
                                        </div>

                                      </div>
            </div>
          </div>
        </div>
      </div>

      <hr>

      <!-- KPI View Settings -->
      <div class="grid gap-3 p-2">
        <div class="g-col-12">
          <h6 class="section-title mb-0" data-translate="kpi.Kpi View Settings">KPI View Settings</h6>
        </div>

        <!-- Data Table Fields -->
        <div class="g-col-12">
          <div class="form-group">
            <label for="datatable_fields" class="form-label" data-translate="kpi.Data tables Fields">Data Table Fields</label>
            <div class="d-grid grid-template gap-2">
              <div class="form-check">
                <input class="form-check-input kpiviewsettingchange" type="checkbox" id="datatableactual">
                <label class="form-check-label" for="datatableactual" data-translate="scorecard.Actual">Actual</label>
              </div>
              <div class="form-check">
                <input class="form-check-input kpiviewsettingchange" type="checkbox" id="datatabletarget">
                <label class="form-check-label" for="datatabletarget" data-translate="scorecard.Target">Target</label>
              </div>
              <div class="form-check">
                <input class="form-check-input kpiviewsettingchange" type="checkbox" id="datatablegap">
                <label class="form-check-label" for="datatablegap" data-translate="kpi.Gap">Gap</label>
              </div>
               <div class="form-check">
                <input class="form-check-input kpiviewsettingchange" type="checkbox" id="datatablebaseline">
                <label class="form-check-label" for="datatablebaseline" data-translate="controlpanel.baseLine">Baseline</label>
              </div>
              <div class="form-check">
                <input class="form-check-input kpiviewsettingchange" type="checkbox" id="datatableytd">
                <label class="form-check-label" for="datatableytd" data-translate="scorecard.YTD">YTD</label>
              </div>
              <div class="form-check">
                <input class="form-check-input kpiviewsettingchange" type="checkbox" id="datatableannualtarget">
                <label class="form-check-label" for="datatableannualtarget" data-translate="kpi.Annual Target">Annual Target</label>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Drill Down Fields -->
        <div class="g-col-12">
          <div class="form-group">
            <label for="drilldown_fields" class="form-label" data-translate="kpi.Data Drilldown Fields">Data Drill Down Fields</label>
            <div class="d-grid grid-template gap-2">
              <div class="form-check">
                <input class="form-check-input kpiviewsettingchange" type="checkbox" id="drilltableactual">
                <label class="form-check-label" for="drilltableactual" data-translate="scorecard.Actual">Actual</label>
              </div>
              <div class="form-check">
                <input class="form-check-input kpiviewsettingchange" type="checkbox" id="drilltabletarget">
                <label class="form-check-label" for="drilltabletarget" data-translate="scorecard.Target">Target</label>
              </div>
              <div class="form-check">
                <input class="form-check-input kpiviewsettingchange" type="checkbox" id="drilltablegap">
                <label class="form-check-label" for="drilltablegap" data-translate="kpi.Gap">Gap</label>
              </div>
                <div class="form-check">
                <input class="form-check-input kpiviewsettingchange" type="checkbox" id="drilltablebaseline">
                <label class="form-check-label" for="drilltablebaseline" data-translate="controlpanel.baseLine">Baseline</label>
              </div>
            </div>
          </div>
        </div>

        <!-- Sub Measures Required -->
        <div class="g-col-12 g-col-md-6">
          <div class="form-check form-switch">
            <input class="form-check-input customperformancechange" type="checkbox" role="switch" id="submeasurerequired">
            <label class="form-check-label" for="submeasurerequired" data-translate="controlpanel.Are Sub Measures required?">Are Sub Measures required?</label>
          </div>
        </div>
      </div>

      <hr>

      <!-- KPI Form Schedule Settings -->
      <div class="grid gap-3 p-2">
        <div class="g-col-12">
          <h6 class="section-title mb-0" data-translate="kpi.Kpi Form Schedule settings">KPI Form Schedule Settings</h6>
        </div>
        <div class="g-col-12 g-col-md-6">
          <div class="form-group">
            <label for="openformon" class="form-label" data-translate="kpi.Open the form on">Open the form on</label>
            <select id="openformon" class="form-select select-dropdown kpidataformchange w-100 openform">
              <!-- Options will be dynamically populated -->
            </select>
          </div>
        </div>
        <div class="g-col-12 g-col-md-6">
          <div class="form-group">
            <label for="closeformon" class="form-label" data-translate="kpi.Close the form on">Close the form on</label>
            <select id="closeformon" class="form-select select-dropdown w-100 kpidataformchange closeform">
              <!-- Options will be dynamically populated -->
            </select>
          </div>
        </div>
      </div>

    </div>

    <!-- Card Footer -->
    <div class="card-footer text-end">
      <button class="btn btn-primary initative_save_btn" value="Save" data-translate="general.Save">Update</button>
    </div>
  </div>
                  </div>
                  <!-- Scorecard end -->

                  <!-- Risk Start -->
                    <div class="tab-pane fade" id="v-pills-risk" role="tabpanel"
                            aria-labelledby="v-pills-risk-tab" tabindex="0">
                            <div class="card custom-card">
                              <div class="card-header">
                                <div class="c-header-left">
                                  <h5 class="card-title" data-translate="RiskPage.Risk Settings">Risk Settings</h5>
                                </div>
                              </div>
                              <div class="card-body">
                                <!-- Risk Fields Section -->
                                <div class="grid gap-3 p-2">
                                  <div class="g-col-12">
                                    <h6 class="section-title mb-0" data-translate="RiskPage.Risk Fields">Risk Fields</h6>
                                     <div class="d-grid grid-template gap-2">
                                       
                                        <div class="form-check">
                                          <input class="form-check-input riskviewsettingchange" type="checkbox"
                                            id="riskinherentscore">
                                          <label class="form-check-label" for="riskinherentscore">
                                            <strong class="editableTxt1"
                                              onkeypress="return (this.innerText.length <= 25)" editable="true" data-translate="RiskPage.Inherent Risk Score">Inherent
                                              Risk Score</strong>
                                          </label>
                                        </div>
                                     
                                        <div class="form-check">
                                          <input class="form-check-input riskviewsettingchange" type="checkbox"
                                            id="riskresidualscore">
                                          <label class="form-check-label" for="riskresidualscore">
                                            <strong class="editableTxt1"
                                              onkeypress="return (this.innerText.length <= 25)" editable="true" data-translate="RiskPage.Residual Risk Score">Residual
                                              Risk Score</strong>
                                          </label>
                                        </div>
                                     
                                        <div class="form-check">
                                          <input class="form-check-input riskviewsettingchange" type="checkbox"
                                            id="riskrelatedparties">
                                          <label class="form-check-label" for="riskrelatedparties">
                                            <strong class="editableTxt1"
                                              onkeypress="return (this.innerText.length <= 25)" editable="true" data-translate="RiskPage.Related Parties">Related
                                              Parties</strong>
                                          </label>
                                        </div>
                                      
                                        <div class="form-check">
                                          <input class="form-check-input riskviewsettingchange" type="checkbox"
                                            id="riskpos">
                                          <label class="form-check-label" for="riskpos">
                                            <strong class="editableTxt1"
                                              onkeypress="return (this.innerText.length <= 25)"
                                              editable="true" data-translate="RiskPage.POS">POS</strong>
                                          </label>
                                        </div>
                                      
                                        <div class="form-check">
                                          <input class="form-check-input riskviewsettingchange" type="checkbox"
                                            id="riskiso">
                                          <label class="form-check-label" for="riskiso">
                                            <strong class="editableTxt1"
                                              onkeypress="return (this.innerText.length <= 25)"
                                              editable="true" data-translate="RiskPage.ISO Standard">ISO</strong>
                                          </label>
                                        </div>
                                     
                                        <div class="form-check">
                                          <input class="form-check-input riskviewsettingchange" type="checkbox"
                                            id="riskinformationasset">
                                          <label class="form-check-label" for="riskinformationasset">
                                            <strong class="editableTxt1"
                                              onkeypress="return (this.innerText.length <= 25)"
                                              editable="true" data-translate="RiskPage.Information Asset">Information Asset</strong>
                                          </label>
                                        </div>
                                      
                                     
                                        <div class="form-check">
                                          <input class="form-check-input riskviewsettingchange" type="checkbox"
                                            id="riskpersonincharge">
                                          <label class="form-check-label" for="riskpersonincharge" data-translate="RiskPage.Person In Charge">
                                            <strong class="editableTxt1"
                                              onkeypress="return (this.innerText.length <= 25)" editable="true">Person
                                              in Charge</strong>
                                          </label>
                                        </div>
                                     
                                   
                                        <div class="form-check">
                                          <input class="form-check-input riskviewsettingchange" type="checkbox"
                                            id="riskothers">
                                          <label class="form-check-label" for="riskothers" data-translate="RiskPage.Others">
                                            <strong class="editableTxt1"
                                              onkeypress="return (this.innerText.length <= 25)"
                                              editable="true">Others</strong>
                                          </label>
                                        </div>
                                     
                                    
                                     </div>
                                    <!-- <ul class="d-flex flex-row flex-wrap gap-3 mt-3">
                                      <li>
                                        <div class="form-check">
                                          <input class="form-check-input riskviewsettingchange" type="checkbox"
                                            id="riskinherentscore">
                                          <label class="form-check-label" for="riskinherentscore">
                                            <strong class="editableTxt1"
                                              onkeypress="return (this.innerText.length <= 25)" editable="true">Inherent
                                              Risk Score</strong>
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div class="form-check">
                                          <input class="form-check-input riskviewsettingchange" type="checkbox"
                                            id="riskresidualscore">
                                          <label class="form-check-label" for="riskresidualscore">
                                            <strong class="editableTxt1"
                                              onkeypress="return (this.innerText.length <= 25)" editable="true">Residual
                                              Risk Score</strong>
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div class="form-check">
                                          <input class="form-check-input riskviewsettingchange" type="checkbox"
                                            id="riskrelatedparties">
                                          <label class="form-check-label" for="riskrelatedparties">
                                            <strong class="editableTxt1"
                                              onkeypress="return (this.innerText.length <= 25)" editable="true">Related
                                              Parties</strong>
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div class="form-check">
                                          <input class="form-check-input riskviewsettingchange" type="checkbox"
                                            id="riskpos">
                                          <label class="form-check-label" for="riskpos">
                                            <strong class="editableTxt1"
                                              onkeypress="return (this.innerText.length <= 25)"
                                              editable="true">POS</strong>
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div class="form-check">
                                          <input class="form-check-input riskviewsettingchange" type="checkbox"
                                            id="riskiso">
                                          <label class="form-check-label" for="riskiso">
                                            <strong class="editableTxt1"
                                              onkeypress="return (this.innerText.length <= 25)"
                                              editable="true">ISO</strong>
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div class="form-check">
                                          <input class="form-check-input riskviewsettingchange" type="checkbox"
                                            id="riskinformationasset">
                                          <label class="form-check-label" for="riskinformationasset">
                                            <strong class="editableTxt1"
                                              onkeypress="return (this.innerText.length <= 25)"
                                              editable="true">Information Asset</strong>
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div class="form-check">
                                          <input class="form-check-input riskviewsettingchange" type="checkbox"
                                            id="riskpersonincharge">
                                          <label class="form-check-label" for="riskpersonincharge">
                                            <strong class="editableTxt1"
                                              onkeypress="return (this.innerText.length <= 25)" editable="true">Person
                                              in Charge</strong>
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div class="form-check">
                                          <input class="form-check-input riskviewsettingchange" type="checkbox"
                                            id="riskothers">
                                          <label class="form-check-label" for="riskothers">
                                            <strong class="editableTxt1"
                                              onkeypress="return (this.innerText.length <= 25)"
                                              editable="true">Others</strong>
                                          </label>
                                        </div>
                                      </li>
                                    </ul> -->
                                  </div>
                                </div>

                                <hr />

                                <!-- Risk Settings Accordions -->
                                <div class="grid gap-3 p-2">
                                  <!-- Cause Description -->
                                  <div class="g-col-12">
                                    <div class="switch-accordion">
                                      <button class="form-check form-switch" data-bs-toggle="collapse"
                                        href="#causeDescription-collapse" aria-expanded="false"
                                        aria-controls="causeDescription-collapse">
                                        <input class="form-check-input riskviewsettingchange" type="checkbox"
                                          id="cause-input">
                                        <label class="form-check-label" for="cause-input" data-translate="RiskPage.Cause Description">Cause Description</label>
                                      </button>
                                      <div class="collapse" id="causeDescription-collapse">
                                        <div class="grid pt-2">
                                          <div class="g-col-12 g-col-md-6">
                                            <div class="form-group">
                                              <label for="cause-select" class="form-label" data-translate="RiskPage.TYpe">Type</label>
                                              <select id="cause-select" class="form-select">
                                                <option data-i18n="Choose">Choose</option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <!-- Category -->
                                  <div class="g-col-12">
                                    <div class="switch-accordion">
                                      <button class="form-check form-switch" data-bs-toggle="collapse"
                                        href="#category-collapse" aria-expanded="false"
                                        aria-controls="category-collapse">
                                        <input class="form-check-input riskviewsettingchange" type="checkbox"
                                          id="cousecategory">
                                        <label class="form-check-label" for="cousecategory" data-translate="RiskPage.Category">
                                          <strong class="editableTxt1" onkeypress="return (this.innerText.length <= 25)"
                                            editable="true">Category</strong>
                                        </label>
                                      </button>
                                      <div class="collapse" id="category-collapse">
                                        <div class="grid pt-2">
                                          <div class="g-col-12 g-col-md-6">
                                            <div class="form-group">
                                              <select id="category-select" class="form-select">
                                                <option data-i18n="Choose">Choose</option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <!-- Consequence Description -->
                                  <div class="g-col-12">
                                    <div class="switch-accordion">
                                      <button class="form-check form-switch" data-bs-toggle="collapse"
                                        href="#consequence-collapse" aria-expanded="false"
                                        aria-controls="consequence-collapse">
                                        <input class="form-check-input riskviewsettingchange" type="checkbox"
                                          id="Consequence-input">
                                        <label class="form-check-label" for="Consequence-input" data-translate="RiskPage.Consequence Description">Consequence
                                          Description</label>
                                      </button>
                                      <div class="collapse" id="consequence-collapse">
                                        <div class="grid pt-2">
                                          <div class="g-col-12 g-col-md-6">
                                            <div class="form-group">
                                              <label for="consequence-select" class="form-label" data-translate="RiskPage.Risk Fields">Type</label>
                                              <select id="consequence-select" class="form-select">
                                                <option data-i18n="Choose">Choose</option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <!-- Possible Event -->
                                  <div class="g-col-12">
                                    <div class="switch-accordion">
                                      <button class="form-check form-switch" data-bs-toggle="collapse"
                                        href="#possibleEvent-collapse" aria-expanded="false"
                                        aria-controls="possibleEvent-collapse">
                                        <input class="form-check-input riskviewsettingchange" type="checkbox"
                                          id="possibleeve">
                                        <label class="form-check-label" for="possibleeve" data-translate="RiskPage.Possible Event">
                                          <strong class="editableTxt1" onkeypress="return (this.innerText.length <= 25)"
                                            editable="true">Possible Event</strong>
                                        </label>
                                      </button>
                                      <div class="collapse" id="possibleEvent-collapse">
                                        <div class="grid pt-2">
                                          <div class="g-col-12 g-col-md-6">
                                            <div class="form-group">
                                              <select id="possible-select" class="form-select">
                                                <option data-i18n="Choose">Choose</option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <!-- Reducing Impact Description -->
                                  <div class="g-col-12">
                                    <div class="switch-accordion">
                                      <button class="form-check form-switch" data-bs-toggle="collapse"
                                        href="#reducingImpact-collapse" aria-expanded="false"
                                        aria-controls="reducingImpact-collapse">
                                        <input class="form-check-input riskviewsettingchange" type="checkbox"
                                          id="ImpactDescription">
                                        <label class="form-check-label" for="ImpactDescription" data-translate="RiskPage.Reducing Impact Description">Reducing Impact
                                          Description</label>
                                      </button>
                                      <div class="collapse" id="reducingImpact-collapse">
                                        <div class="grid pt-2">
                                          <div class="g-col-12 g-col-md-6">
                                            <div class="form-group">
                                              <label for="reducingimpact-select" class="form-label" data-translate="RiskPage.Type">Type</label>
                                              <select id="reducingimpact-select" class="form-select">
                                                <option data-i18n="Choose">Choose</option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <!-- Rating -->
                                  <div class="g-col-12">
                                    <div class="switch-accordion">
                                      <button class="form-check form-switch" data-bs-toggle="collapse"
                                        href="#rating-collapse" aria-expanded="false" aria-controls="rating-collapse">
                                        <input class="form-check-input riskviewsettingchange" type="checkbox"
                                          id="couserating">
                                        <label class="form-check-label" for="couserating" data-translate="RiskPage.Rating">
                                          <strong class="editableTxt1" onkeypress="return (this.innerText.length <= 25)"
                                            editable="true">Rating</strong>
                                        </label>
                                      </button>
                                      <div class="collapse" id="rating-collapse">
                                        <div class="grid pt-2">
                                          <div class="g-col-12 g-col-md-6">
                                            <div class="form-group">
                                              <select id="rating-select" class="form-select">
                                                <option data-i18n="Choose">Choose</option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <!-- Reducing Possibility Description -->
                                  <div class="g-col-12">
                                    <div class="switch-accordion">
                                      <button class="form-check form-switch" data-bs-toggle="collapse"
                                        href="#reducingPossibility-collapse" aria-expanded="false"
                                        aria-controls="reducingPossibility-collapse">
                                        <input class="form-check-input riskviewsettingchange" type="checkbox"
                                          id="possibilitydescription">
                                        <label class="form-check-label" for="possibilitydescription" data-translate="RiskPage.Reducing Possibility Description">Reducing
                                          Possibility Description</label>
                                      </button>
                                      <div class="collapse" id="reducingPossibility-collapse">
                                        <div class="grid pt-2">
                                          <div class="g-col-12 g-col-md-6">
                                            <div class="form-group">
                                              <label for="reducingpossibility-select" class="form-label" data-translate="RiskPage.Type">Type</label>
                                              <select id="reducingpossibility-select" class="form-select">
                                                <option data-i18n="Choose">Choose</option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <!-- Risk Category -->
                                  <div class="g-col-12">
                                    <div class="switch-accordion">
                                      <button class="form-check form-switch" data-bs-toggle="collapse"
                                        href="#riskCategory-collapse" aria-expanded="false"
                                        aria-controls="riskCategory-collapse">
                                        <input class="form-check-input riskviewsettingchange" type="checkbox"
                                          id="riskcategory">
                                        <label class="form-check-label" for="riskcategory" data-translate="RiskPage.Risk Category">Risk Category</label>
                                      </button>
                                      <div class="collapse" id="riskCategory-collapse">
                                        <div class="grid pt-2">
                                          <div class="g-col-12 g-col-md-6">
                                            <div class="form-group">
                                              <select id="riskcategory-select" class="form-select">
                                                <option data-i18n="Choose">Choose</option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <!-- Control Types -->
                                  <div class="g-col-12">
                                    <div class="switch-accordion">
                                      <button class="form-check form-switch" data-bs-toggle="collapse"
                                        href="#controlTypes-collapse" aria-expanded="false"
                                        aria-controls="controlTypes-collapse">
                                        <input class="form-check-input riskviewsettingchange" type="checkbox"
                                          id="controlbtn">
                                        <label class="form-check-label" for="controlbtn" data-translate="RiskPage.Control Types">
                                          <strong class="editableTxt1" onkeypress="return (this.innerText.length <= 25)"
                                            editable="true">Control Types</strong>
                                        </label>
                                      </button>
                                      <div class="collapse" id="controlTypes-collapse">
                                        <div class="grid pt-2">
                                          <div class="g-col-12 g-col-md-6">
                                            <div class="form-group">
                                              <select id="controltypes-select" class="form-select">
                                                <option data-i18n="Choose">Choose</option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <!-- Control effectivenesss -->
                                  <div class="g-col-12">
                                    <div class="switch-accordion">
                                      <button class="form-check form-switch" data-bs-toggle="collapse"
                                        href="#controlEffectiveness-collapse" aria-expanded="false"
                                        aria-controls="controlEffectiveness-collapse">
                                        <input class="form-check-input riskviewsettingchange" type="checkbox"
                                          id="effectivenessbtn">
                                        <label class="form-check-label" for="effectivenessbtn" data-translate="RiskPage.Control effectivenesss">
                                          <strong class="editableTxt1" onkeypress="return (this.innerText.length <= 25)"
                                            editable="true">Control effectivenesss</strong>
                                        </label>
                                      </button>
                                      <div class="collapse" id="controlEffectiveness-collapse">
                                        <div class="grid pt-2">
                                          <div class="g-col-12 g-col-md-6">
                                            <div class="form-group">
                                              <select id="controleffectiveness-select" class="form-select">
                                                <option data-i18n="Choose">Choose</option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <!-- Action -->
                                  <div class="g-col-12">
                                    <div class="switch-accordion">
                                      <button class="form-check form-switch" data-bs-toggle="collapse"
                                        href="#action-collapse" aria-expanded="false" aria-controls="action-collapse">
                                        <input class="form-check-input riskviewsettingchange" type="checkbox"
                                          id="actionbtn">
                                        <label class="form-check-label" for="actionbtn" data-translate="RiskPage.Action">
                                          <strong class="editableTxt1" onkeypress="return (this.innerText.length <= 25)"
                                            editable="true">Action</strong>
                                        </label>
                                      </button>
                                      <div class="collapse" id="action-collapse">
                                        <div class="grid pt-2">
                                          <div class="g-col-12 g-col-md-6">
                                            <div class="form-group">
                                              <select id="action-select" class="form-select">
                                                <option data-i18n="Choose">Choose</option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <hr />

                                <!-- Risk Scores Section -->
                                <div class="grid gap-3 p-2">
                                  <!-- Risk Custom Score -->
                                  <div class="g-col-12">
                                    <div class="form-check form-switch">
                                      <input class="form-check-input riskviewsettingchange" type="checkbox"
                                        id="riskcustomscore">
                                      <label class="form-check-label" for="riskcustomscore" data-translate="RiskPage.Risk Custom Score">Risk Custom Score</label>
                                    </div>
                                    <div class="collapse" id="riskcustomscore-collapse">
                                      <div class="grid pt-2">
                                        <div class="g-col-12">
                                          <div class="row">
                                            <div class="col-lg-6">
                                              <div class="row firstsectionscore">
                                                <!-- Content will be populated dynamically -->
                                              </div>
                                            </div>
                                            <div class="col-lg-6">
                                              <div class="row secondsectionscore">
                                                <!-- Content will be populated dynamically -->
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <!-- Inherent Risk Score -->
                                  <div class="g-col-12">
                                    <div class="switch-accordion">
                                      <button class="form-check form-switch" data-bs-toggle="collapse"
                                        href="#inherentRiskScore-collapse" aria-expanded="false"
                                        aria-controls="inherentRiskScore-collapse">
                                        <input class="form-check-input riskviewsettingchange" type="checkbox"
                                          id="riskderivations">
                                        <label class="form-check-label" for="riskderivations" data-translate="RiskPage.Inherent Risk Score">Inherent Risk
                                          Score</label>
                                      </button>
                                      <div class="collapse" id="inherentRiskScore-collapse">
                                        <div class="grid pt-2">
                                          <div class="g-col-12 g-col-md-6">
                                            <div class="form-group">
                                              <label for="inherentriskscore-select"
                                                class="form-label" data-translate="RiskPage.Derivation">Derivation</label>
                                              <select id="inherentriskscore-select" class="form-select">
                                                <option data-i18n="Choose">Choose</option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <!-- Residual Risk Score -->
                                  <div class="g-col-12">
                                    <div class="switch-accordion">
                                      <button class="form-check form-switch" data-bs-toggle="collapse"
                                        href="#residualRiskScore-collapse" aria-expanded="false"
                                        aria-controls="residualRiskScore-collapse">
                                        <input class="form-check-input riskviewsettingchange" type="checkbox"
                                          id="riskresidual">
                                        <label class="form-check-label" for="riskresidual" data-translate="RiskPage.Residual Risk Score">Residual Risk Score</label>
                                      </button>
                                      <div class="collapse" id="residualRiskScore-collapse">
                                        <div class="grid pt-2">
                                          <div class="g-col-12 g-col-md-6">
                                            <div class="form-group">
                                              <label for="residualriskscore-select"
                                                class="form-label" data-translate="RiskPage.Derivation">Derivation</label>
                                              <select id="residualriskscore-select" class="form-select">
                                                <option data-i18n="Choose">Choose</option>
                                              </select>
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
                  <!-- Risk End -->

                  <!-- Workflow Start -->
                    <div class="tab-pane fade" id="v-pills-workflow-setting" role="tabpanel"
                aria-labelledby="v-pills-workflow-setting-tab" tabindex="0">
                <div class="card custom-card">
                  <div class="card-header">
                    <div class="c-header-left">
                      <h5 class="card-title" data-translate="controlpanel.Workflow Setting">Workflow Setting</h5>
                    </div>
                    <div class="card-actions">
                      <button type="button" class="btn btn-sm btn-outline-icon" data-bs-toggle="modal" data-bs-target="#add-workflow" style="background-color: white;">
                        <span class="icon" data-bs-toggle="tooltip" data-bs-title="Add ">
                          <i class="fas fa-plus title_edit_icon"></i>
                        </span>
                      </button>
          
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive" id="controlpanel_table"
                              style="height: 570px; margin-top: 30px;">
                    </div>
                    <!-- <table class="table table-bordered workflowSetting" style="width: 100%;">
                      <thead class="text-center">
                        <tr>
                          <th>Workflow Name</th>
                          <th>Workflow Type</th>
                          <th>Department</th>
                          <th>Conditions</th>
                          <th>Description</th>
                          <th>Approvers</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td></td>
                          <td>Risk</td>
                          <td>Agricultural Mechanization Research Institute</td>
                          <td>Change in any field within Document</td>
                          <td></td>
                          <td>Roshan, Andrea</td>
                          <td>
                            <div class="table-actions justify-content-end">
                              <div class="btn btn-sm btn-outline-icon" href="#edit-workflow" data-bs-toggle="modal">
                                <span class="icon" data-bs-toggle="tooltip" data-bs-title="Edit">
                                  <img src="/stratroom/images/edit-i.svg" width="12" height="12" />
                                </span>
                              </div>
                              
                              <div class="btn btn-sm btn-outline-icon" href="#delete-modal" data-bs-toggle="modal">
                                <span class="icon" data-bs-toggle="tooltip" data-bs-title="Delete">
                                  <img src="/stratroom/images/delete-i.svg" width="12" height="12" />
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>new risk</td>
                          <td>Risk</td>
                          <td> ERM HEAD</td>
                          <td>NA</td>
                          <td></td>
                          <td>Raza</td>
                          <td>
                            <div class="table-actions justify-content-end">
                              <div class="btn btn-sm btn-outline-icon" href="#edit-workflow" data-bs-toggle="modal">
                                <span class="icon" data-bs-toggle="tooltip" data-bs-title="Edit">
                                  <img src="/stratroom/images/edit-i.svg" width="12" height="12" />
                                </span>
                              </div>
                              
                              <div class="btn btn-sm btn-outline-icon" href="#delete-modal" data-bs-toggle="modal">
                                <span class="icon" data-bs-toggle="tooltip" data-bs-title="Delete">
                                  <img src="/stratroom/images/delete-i.svg" width="12" height="12" />
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>risk event </td>
                          <td>Risk Event</td>
                          <td> ERM HEAD</td>
                          <td>NA</td>
                          <td></td>
                          <td>Raza</td>
                          <td>
                            <div class="table-actions justify-content-end">
                              <div class="btn btn-sm btn-outline-icon" href="#edit-workflow" data-bs-toggle="modal">
                                <span class="icon" data-bs-toggle="tooltip" data-bs-title="Edit">
                                  <img src="/stratroom/images/edit-i.svg" width="12" height="12" />
                                </span>
                              </div>
                              
                              <div class="btn btn-sm btn-outline-icon" href="#delete-modal" data-bs-toggle="modal">
                                <span class="icon" data-bs-toggle="tooltip" data-bs-title="Delete">
                                  <img src="/stratroom/images/delete-i.svg" width="12" height="12" />
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>clary risk</td>
                          <td>Risk</td>
                          <td>GRI</td>
                          <td>NA</td>
                          <td></td>
                          <td></td>
                          <td>
                            <div class="table-actions justify-content-end">
                              <div class="btn btn-sm btn-outline-icon" href="#edit-workflow" data-bs-toggle="modal">
                                <span class="icon" data-bs-toggle="tooltip" data-bs-title="Edit">
                                  <img src="/stratroom/images/edit-i.svg" width="12" height="12" />
                                </span>
                              </div>
                              
                              <div class="btn btn-sm btn-outline-icon" href="#delete-modal" data-bs-toggle="modal">
                                <span class="icon" data-bs-toggle="tooltip" data-bs-title="Delete">
                                  <img src="/stratroom/images/delete-i.svg" width="12" height="12" />
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>Social Welfare</td>
                          <td>Risk</td>
                          <td> ERM HEAD</td>
                          <td>Change in any field within Document</td>
                          <td></td>
                          <td>Saj Abraham, TomBrown</td>
                          <td>
                            <div class="table-actions justify-content-end">
                              <div class="btn btn-sm btn-outline-icon" href="#edit-workflow" data-bs-toggle="modal">
                                <span class="icon" data-bs-toggle="tooltip" data-bs-title="Edit">
                                  <img src="/stratroom/images/edit-i.svg" width="12" height="12" />
                                </span>
                              </div>
                              
                              <div class="btn btn-sm btn-outline-icon" href="#delete-modal" data-bs-toggle="modal">
                                <span class="icon" data-bs-toggle="tooltip" data-bs-title="Delete">
                                  <img src="/stratroom/images/delete-i.svg" width="12" height="12" />
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>New Development</td>
                          <td>Risk</td>
                          <td> ERM HEAD</td>
                          <td>NA</td>
                          <td></td>
                          <td>Raza</td>
                          <td>
                            <div class="table-actions justify-content-end">
                              <div class="btn btn-sm btn-outline-icon" href="#edit-workflow" data-bs-toggle="modal">
                                <span class="icon" data-bs-toggle="tooltip" data-bs-title="Edit">
                                  <img src="/stratroom/images/edit-i.svg" width="12" height="12" />
                                </span>
                              </div>
                              
                              <div class="btn btn-sm btn-outline-icon" href="#delete-modal" data-bs-toggle="modal">
                                <span class="icon" data-bs-toggle="tooltip" data-bs-title="Delete">
                                  <img src="/stratroom/images/delete-i.svg" width="12" height="12" />
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>Harsh Work Flow Risk</td>
                          <td>Risk</td>
                          <td>Smackdown</td>
                          <td>Change in any field within Document</td>
                          <td>risk</td>
                          <td>sid, SEKA</td>
                          <td>
                            <div class="table-actions justify-content-end">
                              <div class="btn btn-sm btn-outline-icon" href="#edit-workflow" data-bs-toggle="modal">
                                <span class="icon" data-bs-toggle="tooltip" data-bs-title="Edit">
                                  <img src="/stratroom/images/edit-i.svg" width="12" height="12" />
                                </span>
                              </div>
                              
                              <div class="btn btn-sm btn-outline-icon" href="#delete-modal" data-bs-toggle="modal">
                                <span class="icon" data-bs-toggle="tooltip" data-bs-title="Delete">
                                  <img src="/stratroom/images/delete-i.svg" width="12" height="12" />
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>harsh workflow initiative</td>
                          <td>Initiative</td>
                          <td>Smackdown</td>
                          <td>Change in any field within Document</td>
                          <td>initiative</td>
                          <td>sid, SEKA</td>
                          <td>
                            <div class="table-actions justify-content-end">
                              <div class="btn btn-sm btn-outline-icon" href="#edit-workflow" data-bs-toggle="modal">
                                <span class="icon" data-bs-toggle="tooltip" data-bs-title="Edit">
                                  <img src="/stratroom/images/edit-i.svg" width="12" height="12" />
                                </span>
                              </div>
                              
                              <div class="btn btn-sm btn-outline-icon" href="#delete-modal" data-bs-toggle="modal">
                                <span class="icon" data-bs-toggle="tooltip" data-bs-title="Delete">
                                  <img src="/stratroom/images/delete-i.svg" width="12" height="12" />
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>qwerty 1234567789</td>
                          <td>Risk</td>
                          <td>ZIMRA</td>
                          <td>NA</td>
                          <td>asdfghjk</td>
                          <td>Chris, Kevin</td>
                          <td>
                            <div class="table-actions justify-content-end">
                              <div class="btn btn-sm btn-outline-icon" href="#edit-workflow" data-bs-toggle="modal">
                                <span class="icon" data-bs-toggle="tooltip" data-bs-title="Edit">
                                  <img src="/stratroom/images/edit-i.svg" width="12" height="12" />
                                </span>
                              </div>
                              
                              <div class="btn btn-sm btn-outline-icon" href="#delete-modal" data-bs-toggle="modal">
                                <span class="icon" data-bs-toggle="tooltip" data-bs-title="Delete">
                                  <img src="/stratroom/images/delete-i.svg" width="12" height="12" />
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>qwerty 1234567</td>
                          <td>Risk</td>
                          <td>CEO</td>
                          <td>Change in any field within Document</td>
                          <td>xzcvvbnbm,</td>
                          <td>Chris, Kevin</td>
                          <td>
                            <div class="table-actions justify-content-end">
                              <div class="btn btn-sm btn-outline-icon" href="#edit-workflow" data-bs-toggle="modal">
                                <span class="icon" data-bs-toggle="tooltip" data-bs-title="Edit">
                                  <img src="/stratroom/images/edit-i.svg" width="12" height="12" />
                                </span>
                              </div>
                              
                              <div class="btn btn-sm btn-outline-icon" href="#delete-modal" data-bs-toggle="modal">
                                <span class="icon" data-bs-toggle="tooltip" data-bs-title="Delete">
                                  <img src="/stratroom/images/delete-i.svg" width="12" height="12" />
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td>null</td>
                          <td>null</td>
                          <td></td>
                          <td></td>
                          <td>
                            <div class="table-actions justify-content-end">
                              <div class="btn btn-sm btn-outline-icon" href="#edit-workflow" data-bs-toggle="modal">
                                <span class="icon" data-bs-toggle="tooltip" data-bs-title="Edit">
                                  <img src="/stratroom/images/edit-i.svg" width="12" height="12" />
                                </span>
                              </div>
                              
                              <div class="btn btn-sm btn-outline-icon" href="#delete-modal" data-bs-toggle="modal">
                                <span class="icon" data-bs-toggle="tooltip" data-bs-title="Delete">
                                  <img src="/stratroom/images/delete-i.svg" width="12" height="12" />
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table> -->
                  </div>
                </div>



              </div>
                      <!-- <div class="tab-pane fade" id="v-pills-workflow-setting">
                            <div class="row mb-4">
                              <div class="col-md-12">
                                <h4>Workflow Setting</h4>
                              </div>
                              <button class="btn btn-custom-secondary pull-right" data-toggle="modal"
                                data-target=".add_workflow_popup" style="margin-left: 4px">
                                <i class="fa fa-plus-square" aria-hidden="true"></i>
                              </button>
                            </div>

                            <div class="table-responsive" id="controlpanel_table"
                              style="height: 570px; margin-top: 30px;">

                            </div>
                      </div> -->
                 


                  


              </div>
        </main>

          <div class="modal custom-modal fade" id="add-workflow" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title ">Add Workflow</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <form class="card custom-card border-0 addWorkflowForm" id="">
            <div class="modal-body">

              <form class="card custom-card border-0" id="">
                <div class="card-body">
                  <div class="grid gap-3">
                    <div class="g-col-12 g-col-md-12">
                      <div class="form-group">
                        <label for="workflowNameAdd" class="form-label">Workflow Name</label>
                        <input type="text" class="form-control workflownameService" name="workflowNameAdd" id="workflowName"
                          placeholder="Enter a Workflow Name">
                      </div>
                    </div>
                    <div class="g-col-12 g-col-md-12">
                      <div class="form-group">
                        <label for="workflowTypeAdd" class="form-label">Workflow Type</label>
                        <select id="workflowtype" name="workflowTypeAdd"
                          class="form-select select-dropdown-add-workflow w-100 workflowtypeService" data-placeholder="Select Workflow Type">
                          <option value="" disabled selected hidden>
                            Select Workflow Type
                          </option>
                          <!-- <option value="Risk">Risk</option>
                          <option value="Risk Event">Risk Event</option>
                          <option value="Process to Enabler">Process to Enabler</option>
                          <option value="Initiative">Initiative</option>
                          <option value="RPO">RPO</option>
                           <option value="Budget">BUDGET</option> -->
                        </select>
                      </div>
                    </div>
                    <div class="g-col-12 g-col-md-12">
                      <div class="form-group">
                        <label for="departmentAdd" class="form-label">Department</label>
                        <select id="departmentworkflow" name="departmentAdd" class="form-select select-dropdown-add-workflow w-100 departmentworkflow"
                          data-placeholder="Select Department">
                          <option value="" disabled selected hidden>
                            Select Department
                          </option>
                          <!-- <option value="576" data-select2-id="3">CEO</option>
                          <option value="1055" data-select2-id="17">CEO ASPIRE</option>
                          <option value="1081" data-select2-id="18">Tata Trust </option>
                          <option value="1082" data-select2-id="19">India</option>
                          <option value="1083" data-select2-id="20">Maharashtra</option> -->
                          
                        </select>
                      </div>
                    </div>
    
    
    
                    <div class="g-col-12 g-col-md-12">
                      <div class="form-group">
                        <label for="conditionsAdd" class="form-label">Conditions</label>
                        <select id="condition" name="conditionsAdd" class="form-select select-dropdown-add-workflow w-100 conditionService"
                          data-placeholder="Select Conditions">
                          <option value="" disabled selected hidden>
                            Select Conditions
                          </option>
                         
                        </select>
                      </div>
                    </div>
    
                    <div class="g-col-12 g-col-md-12">
                      <div class="form-group">
                        <label for="descriptionAdd" class="form-label">Description</label>
                        <input type="text" class="form-control descriptionService" name="descriptionAdd" id="description"
                          placeholder="description">
                      </div>
                    </div>
    
    
                    <div class="g-col-12 g-col-md-12">
                      <div class="form-group">
                        <label for="approvedByAdd" class="form-label">Approved By</label>
                        <select class="form-select select-dropdown-add-workflow w-100 settingapproved" id="settingapproved" name="approvedByAdd"
                          data-placeholder="Select Approved By">
                          <option value="" disabled selected hidden>
                            Select Approved By
                          </option>
                          <option value="User">User</option>
                        </select>
                        <div class="approved-fields-container"></div>
                      </div>
                       <div id="additionalFieldsContainer"></div>
                    </div>
    
                  </div>
                </div>
              </form>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
            Cancel
          </button>
          <button class="btn btn-primary" value="Save" onclick="saveControlPanel()">Save
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- edit-workflow -->
  <div class="modal custom-modal fade" id="edit-workflow" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title ">Edit Workflow</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <form class="card custom-card border-0 addWorkflowForm" id="">
            <div class="card-body">
              <div class="grid gap-3">

                <div class="g-col-12 g-col-md-12">
                  <div class="form-group">
                    <label for="workflowName" class="form-label">Workflow ID</label>
                    <input type="text" class="form-control" name="workflowId" id="workflowId"
                      placeholder="Enter a Workflow Name">
                  </div>
                </div>

                <div class="g-col-12 g-col-md-12">
                  <div class="form-group">
                    <label for="workflowName" class="form-label">Workflow Name</label>
                    <input type="text" class="form-control" name="editworkflowName" id="editworkflowName"
                      placeholder="Enter a Workflow Name">
                  </div>
                </div>


                <div class="g-col-12 g-col-md-12">
                  <div class="form-group">
                    <label for="workflowType" class="form-label">Workflow Type</label>
                    <select  name="workflowType"
                      class="form-select select-dropdown-edit-workflow w-100 workflowtypeService" data-placeholder="Select Workflow Type"  id="editworkflowtype">
                      
                     
                    </select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-12">
                  <div class="form-group">
                    <label for="department" class="form-label">Department</label>
                    <select id="editdepartmentworkflow" name="department" class="form-select select-dropdown-edit-workflow w-100 departmentworkflow"
                      data-placeholder="Select Department">
                      <option value="" disabled selected hidden>
                        Select Department
                      </option>
                    
                    </select>
                  </div>
                </div>



                <div class="g-col-12 g-col-md-12">
                  <div class="form-group">
                    <label for="conditions" class="form-label">Conditions</label>
                    <select id="editcondition" name="conditions" class="form-select select-dropdown-edit-workflow w-100 conditionService"
                      data-placeholder="Select Conditions">
                      <option value="" disabled selected hidden>
                        Select Conditions
                      </option>
                     
                    </select>
                  </div>
                </div>

                <div class="g-col-12 g-col-md-12">
                  <div class="form-group">
                    <label for="description" class="form-label">Description</label>
                    <input type="text" class="form-control" name="description" id="editdescription"
                      placeholder="description">
                  </div>
                </div>


                <div class="g-col-12 g-col-md-12">
                  <div class="form-group">
                    <label for="approvedBy" class="form-label">Approved By</label>
                    <select class="form-select select-dropdown-edit-workflow w-100" id="editsettingapproved" name="approvedBy"
                      data-placeholder="Select Approved By">
                      <option value="" >
                        Select 
                      </option>
                      <option value="User">User</option>
                    </select>
                     <div  class="approved-field"></div>
                  </div>
                    <div id="editadditionalFieldsContainer"></div>
                </div>

               

                  <input type="hidden" name="" id="approverId">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
            Cancel
          </button>
          <button class="btn btn-primary" value="Save" onclick="updateWorkFLow()" data-translate="general.Save">Update
          </button>
        </div>
      </div>
    </div>
  </div>

  <!--  delete modal :::::::::::::::::::::::::::::::::::::::: -->

  <div class="modal custom-modal custom-delete-modal fade" id="delete-modal" data-bs-backdrop="static"
    data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" style="--stratroom-modal-width:320px">
      <div class="modal-content">
        <div class="modal-body">
          <div class="card custom-card delete-card border-0">
            <div class="card-body">

               <div class="delete-box">
              <h4 class="title">Do you really want to delete?</h4>              
              <div class="btn-wrap">
                <button type="button" class="btn btn-sm btn-label-secondary rounded-pill" data-bs-dismiss="modal" aria-label="Close">
                  Cancel
                </button>
                <button class="btn btn-sm btn-danger rounded-pill" value="Yes" onclick="deleteWorkFlow()">Delete</button>
              </div>
            </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

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


        <script src="${contextroot}/js/app.min.js"></script>
        <script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
        <script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
        <script src="${contextroot}/js/admin.js"></script>
        <script src="${contextroot}/js/jquery-ui.min.js"></script>
        <script src="${contextroot}/js/datepickerair.js"></script>
        <script src="${contextroot}/js/datepicker.en.js"></script>
        <script src="${contextroot}/js/pickr.es5.min.js"></script>
        <script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
        <script type="text/javascript" src="${contextroot}/js/knockout-3.5.0.js"></script>
        <script type="text/javascript" src="${contextroot}/js/daterangepicker.min.js"></script>
        <script type="text/javascript" src="${contextroot}/js/file-upload.js"></script>
        <script src="${contextroot}/js/widgets.js"></script>
        <script src="${contextroot}/js/initial.js"></script>
        <script type="text/javascript" src="${contextroot}/js/notify.js"></script>
        <script src="${contextroot}/js/select2.min.js"></script>
        <script src="${contextroot}/js/controlpanel.js"></script>

        <!-- multi-select dropdown -->
        <script src="${contextroot}/js/select2.min.js"></script>
        <!-- multi-select dropdown -->

        <!-- multi-select dropdown -->
        <script>
          $(document).ready(function () {
            $(".int-status-multi-select").select2();


            function controlPanelEvent(controlpaneltype) {
              localStorage.setItem("controlpaneltype",controlpaneltype);
              getControlPanelList(controlpaneltype);
            }
          }
          );
        </script>
        <!-- multi-select dropdown -->


        <script>
          $(document).ready(function () {
            $('#departmentworkflow').select2({
              dropdownParent: $("#addworkflowpopup"),
              placeholder: "Select a Department"
            });

            $('#editdepartmentworkflow').select2({
              dropdownParent: $("#editworkflowpopup"),
              placeholder: "Select a Department"
            });
            $("div.panel-tab-menu>div.list-group>div.row>div").click(function (e) {
              e.preventDefault();
              $(this).siblings("div.active").removeClass("active");
              $(this).addClass("active");
              var index = $(this).index();
              $("div.panel-tab>div.panel-tab-content").removeClass("active");
              $("div.panel-tab>div.panel-tab-content").eq(index).addClass("active");
            });

            $(".opennextbtn").click(function () {
              var radioValue = $("input[name='SOMethod']:checked").val();
              if (radioValue == "SAML") {
                $("#configSAML").show();
                $("#openID").hide();
                $("#soMethod").hide();
              }
              if (radioValue == "OC") {
                $("#openID").show();
                $("#configSAML").hide();
                $("#soMethod").hide();
              }
            });
            $("#cancel_btn1").click(function () {
              $("#soMethod").show();
              $("#openID").hide();
              $("#configSAML").hide();
            });
            $("#cancel_btn2").click(function () {
              $("#soMethod").show();
              $("#openID").hide();
              $("#configSAML").hide();
            });
            $("#back_btn1").click(function () {
              $("#soMethod").show();
              $("#openID").hide();
              $("#configSAML").hide();
            });
            $("#back_btn2").click(function () {
              $("#soMethod").show();
              $("#openID").hide();
              $("#configSAML").hide();
            });

            $("input[name=Config]").click(function () {
              $(".samldiv").hide();
              if ($(this).val() == "URL" || $(this).val() == "File") {
                $("#URL").show();
              } else if ($(this).val() == "MSettings") {
                $("#" + $(this).val()).show();
              }
            });

          });

          function openCity(evt, securitySections) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
              tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
              tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(securitySections).style.display = "block";
            evt.currentTarget.className += " active";
          }

          $(
            '.swot_add_multiuser_popup')
            .modal({
              show: false,
              backdrop: 'static',
              keyboard: false
            });
          $('.modal-dialog').draggable({
            handle: ".modal-header"
          });


          $(document).ready(function () {
            $("#custom_status").change(function () {
              if (this.checked) {

                $("#cust_status").show();

              } else {
                $("#cust_status").hide();
              }
            });
          });
          $(document).ready(function () {
            $("#cause_status").change(function () {
              if (this.checked) {

                $("#cause").show();

              } else {
                $("#cause").hide();
              }
            });
          }); $(document).ready(function () {
            $("#possibleeve").change(function () {
              if (this.checked) {

                $("#possibleeve-1").show();

              } else {
                $("#possibleeve-1").hide();
              }
            });
          });

          $(document).ready(function () {
            $("#customscore").change(function () {
              if (this.checked) {

                $("#customscore-1").show();

              } else {
                $("#customscore-1").hide();
              }
            });
          });
          $(document).ready(function () {
            $("#riskmanagement").change(function () {
              if (this.checked) {

                $("#riskmanagement-1").show();

              } else {
                $("#riskmanagement-1").hide();
              }
            });
          });
          $(document).ready(function () {
            $("#cousecategory").change(function () {
              if (this.checked) {

                $("#cousecategory-1").show();

              } else {
                $("#cousecategory-1").hide();
              }
            });
          });
          $(document).ready(function () {
            $("#couserating").change(function () {
              if (this.checked) {

                $("#couserating-1").show();

              } else {
                $("#couserating-1").hide();
              }
            });
          });
          $(document).ready(function () {
            $("#cause-input").change(function () {
              if (this.checked) {

                $("#cause-input-1").show();

              } else {
                $("#cause-input-1").hide();
              }
            });
          });
          $(document).ready(function () {
            $("#riskcategory").change(function () {
              if (this.checked) {

                $("#riskcategory-1").show();

              } else {
                $("#riskcategory-1").hide();
              }
            });
          });
          $(document).ready(function () {
            $("#Consequence-input").change(function () {
              if (this.checked) {

                $("#Consequence-input-1").show();

              } else {
                $("#Consequence-input-1").hide();
              }
            });
          });
          $(document).ready(function () {
            $("#possibilitydescription").change(function () {
              if (this.checked) {

                $("#possibilitydescription-1").show();

              } else {
                $("#possibilitydescription-1").hide();
              }
            });
          });
          $(document).ready(function () {
            $("#ImpactDescription").change(function () {
              if (this.checked) {

                $("#ImpactDescription-1").show();

              } else {
                $("#ImpactDescription-1").hide();
              }
            });
          });
          $(document).ready(function () {
            $("#actionbtn").change(function () {
              if (this.checked) {

                $("#actionbtn-1").show();

              } else {
                $("#actionbtn-1").hide();
              }
            });
          });
          $(document).ready(function () {
            $("#controlbtn").change(function () {
              if (this.checked) {

                $("#controlbtn-1").show();

              } else {
                $("#controlbtn-1").hide();
              }
            });
          });
          $(document).ready(function () {
            $("#effectivenessbtn").change(function () {
              if (this.checked) {

                $("#effectivenessbtn-1").show();

              } else {
                $("#effectivenessbtn-1").hide();
              }
            });
          });
          $(document).ready(function () {
            $("#riskcustomscore").change(function () {
              if (this.checked) {

                $("#riskcustomscore-1").show();

              } else {
                $("#riskcustomscore-1").hide();
              }
            });

            $("#riskderivations").change(function () {
              if (this.checked) {

                $("#riskderivations-1").show();

              } else {
                $("#riskderivations-1").hide();
              }
            });

            $("#riskresidual").change(function () {
              if (this.checked) {

                $("#riskresidual-1").show();

              } else {
                $("#riskresidual-1").hide();
              }
            });
          });

        </script>

        <script>
          function saveControlPanel() {
            const approverList = $(".approved-fields-container select").map(function () {
              const userName = $(this).find("option:selected").text();
              const approvalRoleId = $(this).val(); // Get the employee ID as the approvalRoleId
              return userName ? { userName: userName, aprovalRoleId: approvalRoleId } : null;
            }).get().filter(Boolean);

            // Get departmentName and convert it to string if it's an array
            let departmentName = $(".departmentworkflow").val();

            const ControlPanelData = {
              name: $(".workflownameService").val(),
              type: $(".workflowtypeService").val(),
              department: departmentName, // Save the converted string
              conditions: $(".conditionService").val(),
              description: $(".descriptionService").val(),
              approvedBy: $(".settingapproved").val(),
              approverList: approverList
            };

            $.ajax({
              url: "/stratroom/saveWorkFlow",
              type: "POST",
              contentType: "application/json",
              data: JSON.stringify(ControlPanelData),
              success: function () {
                $.notify("Success: Successfully Saved", { style: 'success', className: 'graynotify' });
                location.reload();
              },
              error: function (xhr, status, error) {
                console.error("Save error:", status, error);
                $.notify("Error saving workflow. Please try again.", { style: 'error', className: 'rednotify' });
              }
            });
          }

          $(document).ready(function () {
            var userCount = 1;
            var employeeList = [];
            var workflowData = [];

            function addApprovedField(containerClass, userName = '', level = userCount) {
              console.log("Adding approved field");

              const fieldId = 'userField' + level;
            const fieldHtml =
    '<div class="g-col-12 g-col-md-12 additional-field" id="' + fieldId + '" style="margin-top: 12px;">' +
        '<div class="form-group" style="display: flex; align-items: center; gap: 5px;">' +
            '<label style="margin-right: 5px;">Approver Level ' + level + '</label>' +
            '<select class="form-select select-dropdown-add-workflow user-select" style="flex: 1;">' +
                '<option value="">Select</option>' +
            '</select>' +
            '<button type="button" class="btn btn-sm btn-outline-icon add-approved-btn" >'+
              '<span class="icon" data-bs-toggle="tooltip" data-bs-title="Add ">' +
              '<i class="fas fa-plus title_edit_icon" style="color: black"></i>' + 
              '</span>'+
            '</button>' +
            '<button type="button" class="btn btn-sm btn-outline-icon remove-approved-btn" >'+
              '<span class="icon" data-bs-toggle="tooltip" data-bs-title="Add ">' +
              '<i class="fas fa-minus title_edit_icon" style="color: black"></i>' + 
              '</span>'+
              '</button>' +
        '</div>' +
    '</div>';


              console.log(fieldHtml);
              $('.' + containerClass).append(fieldHtml); // Add the new approver field
              userCount++;
              populateUserSelect('#' + fieldId + ' select.user-select', userName); // Populate the select field
              updateApprovedFieldLabels(containerClass); // Update the labels for the approvers
              toggleApprovedButtons(containerClass); // Manage the add/remove buttons
            }

            function toggleApprovedButtons(containerClass) {
              const $fields = $('.' + containerClass + ' .additional-field');
              const $lastField = $fields.last();
              const $secondLastField = $fields.eq(-2);

              $('.' + containerClass + ' .add-approved-btn, .' + containerClass + ' .remove-approved-btn').hide();
              $lastField.find('.add-approved-btn').show();
              if ($fields.length > 1) {
                $lastField.find('.remove-approved-btn').show();
                $secondLastField.find('.remove-approved-btn').show();
              }
              $fields.first().find('.remove-approved-btn').hide();
            }

            function updateApprovedFieldLabels(containerClass) {
              $('.' + containerClass + ' .additional-field').each(function (index) {
                $(this).find('label').text('Approver Level ' + (index + 1));
              });
            }

            function populateUserSelect(selector, selectedUserName = '') {
              const $select = $(selector);
              $select.empty();
              $select.append(new Option('Select', ''));
              employeeList.forEach(function (item) {
                const selected = item.name === selectedUserName;
                $select.append(new Option(item.name, item.id, selected, selected)); // Store employee ID as value
              });
            }

            // function getDepartmentlist() {
            //   $.ajax({
            //     url: "/stratroom/allDepartmentList",
            //     method: 'GET',
            //     dataType: 'json',
            //     success: function (data) {
            //       populateSelectDept('.departmentworkflow', data, 'id', 'name');
            //     },
            //     error: function (xhr, status, error) {
            //       console.error('Department Server Error:', status, error);
            //       $.notify("Error loading departments. Please try again later.", { style: 'error', className: 'rednotify' });
            //     }
            //   });
            // }

            function getDepartmentlist() {
                $.ajax({
                    url: "/stratroom/allDepartmentList",
                    method: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        var select = $('#departmentworkflow');
                        var selectEdit = $('#editdepartmentworkflow');
                        select.empty(); 
                        selectEdit.empty();

                
                        select.append('<option value="" disabled selected hidden>Select Department</option>');
                        selectEdit.append('<option value="" disabled selected hidden>Select Department</option>');

                      
                        $.each(data, function(index, dept) {
                            select.append('<option value="' + dept.id + '">' + dept.name + '</option>');
                        });
                        $.each(data, function(index, dept) {
                            selectEdit.append('<option value="' + dept.id + '">' + dept.name + '</option>');
                        });

                        
                        if (select.hasClass('select2-hidden-accessible')) {
                            select.trigger('change');
                        }
                        if (selectEdit.hasClass('select2-hidden-accessible')) {
                            selectEdit.trigger('change');
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('Department Server Error:', status, error);
                        $.notify("Error loading departments. Please try again later.", { style: 'error', className: 'rednotify' });
                    }
                });
            }

            function getAllUserlist() {
              return $.ajax({
                url: "/stratroom/organization/employeeList",
                method: 'GET',
                success: function (data) {
                  employeeList = data;
                },
                error: function (xhr, status, error) {
                  console.error('User list loading error:', status, error);
                  $.notify("Error loading users. Please try again later.", { style: 'error', className: 'rednotify' });
                }
              });
            }

            function populateSelect(selector, data, valueField, textField) {
              const $select = $(selector);
              $select.empty();
              data.forEach(function (item) {
                $select.append(new Option(item[textField], item[valueField]));
              });
            }

            function populateSelectDept(selector, data, valueKey, textKey, placeholder = "Select...") {
              console.log(selector, "selector");
              $(selector).append(`<option  value="${data.id}">${data.name}</option>`);
            }

            function workflowtypeSelect() {
              const workflowtypeData = [
                { value: 'Select', name: 'Select' },
                { value: 'Risk', name: 'Risk' },
                { value: 'Risk Event', name: 'Risk Event' },
                { value: 'Process to Enabler', name: 'Process to Enabler' },
                // { value: 'Initiative', name: 'Initiative' },
                { value: 'RPO', name: 'RPO' },
                { value: 'Kpi Data Form', name: 'Kpi Data Form' },
                { value: 'Budget', name: 'Budget' }
              ];
              populateSelect('.workflowtypeService', workflowtypeData, 'value', 'name');
            }

            function conditionSelect() {
              const conditionData = [
                { value: 'Select', name: 'Select' },
                { value: 'Manual', name: 'Manual' },
                { value: 'NA', name: 'NA' },
                { value: 'Change in any field within Document', name: 'Change in any field within Document' }
              ];
              populateSelect('.conditionService', conditionData, 'value', 'name');
            }



            window.editPOSpage = function (id) {
              editId = id;
              console.log(editId, "editid");

              $.ajax({
                url: "/stratroom/retriveWorkFlow/" + editId,
                method: 'GET',
                success: function (workflow, status) {
                  console.log(workflow, "workflow");
                  // Set the values for the input fields
                  $("#workflowId").val(workflow.id);
                  $("#editworkflowName").val(workflow.name);
                  $("#editworkflowtype").val(workflow.type).trigger('change');
                  $("#editsettingapproved").val(workflow.approvedBy).trigger('change');
                  // $("#editdepartmentworkflow").val(workflow.departmentName);
                  $("#editcondition").val(workflow.conditions).trigger('change');
                  $("#editdescription").val(workflow.description);
                  $("#editsettingapproved").val(workflow.approvedBy);

                  $('#editdepartmentworkflow').val(workflow.department).trigger('change');

                  // Reset the user count
                  userCount = 1;

                  // Clear existing approver fields
                  $(".additional-field").remove();

                  // Create a set to track added approvers
                  let addedApprovers = new Set();

                  // Loop through the approver list and add the approver levels, avoiding duplicates
                  workflow.approverList.forEach(function (approver, index) {
                    const fieldId = 'userField' + (index + 1);
                    $("#approverId").val(approver.id);
                    // Add the approved field if it's not a duplicate
                    if (!addedApprovers.has(approver.userName)) {
                      addApprovedField('approved-field', approver.userName, index + 1);
                      addedApprovers.add(approver.userName);  // Mark this approver as added
                    }
                  });
                },
                error: function (xhr, status, error) {
                  console.log("Error: " + error);
                }
              });
            }


            // Event listener for the "Approved By" dropdown change
            $('#settingapproved').change(function () {
              const selectedValue = $(this).val();
              $('.approved-fields-container').empty();  // Clear previous fields

              if (selectedValue === 'User') {
                console.log("User selected");
                addApprovedField('approved-fields-container');

              }
            });
            $('#editsettingapproved').change(function () {
              const selectedValue = $(this).val();
              $('.approved-field').empty();
              if (selectedValue === 'User') {
                console.log("User selected");
                addApprovedField('approved-field');
              }
            });
            // Event listener for adding new approver fields when "+" button is clicked
            $(document).on('click', '.add-approved-btn', function () {
              addApprovedField('approved-fields-container');
              addApprovedField('approved-field');
            });

            // Event listener for removing approver fields when "-" button is clicked
            $(document).on('click', '.remove-approved-btn', function () {
              $(this).closest('.additional-field').remove();
              userCount--;
              updateApprovedFieldLabels('approved-fields-container');
              toggleApprovedButtons('approved-fields-container');
              updateApprovedFieldLabels('approved-field');
              toggleApprovedButtons('approved-field');
            });

            function init() {
              $.when(getAllUserlist()).done(function () {
                getControlPanelData();
                getDepartmentlist();
                workflowtypeSelect();
                conditionSelect();
              });
            }

            init();

            $('#saveControlPanelButton').on('click', saveControlPanel); // Bind save button click event to saveControlPanel function
          });

          let deleteId;
          function deleteData(id) {
            deleteId = id;

            $.ajax({
              url: "/stratroom/retriveWorkFlow/" + deleteId,
              method: 'GET',
              success: function (data, status) {
                console.log(data);
              },
              error: readErrorMsg
            });
          }

          function deleteWorkFlow() {
            if (!deleteId) {
              console.error(" DeleteID is not Set");
              return;
            }
            console.log(deleteId, "DeleteID");

            $.ajax({
              url: "/stratroom/deleteWorkFlow/" + deleteId,
              type: "DELETE",
              contentType: "application/json",
              success: function (data, status) {
                $.notify("Success: Deleted Successfully", {
                  style: 'success',
                  className: 'graynotify'
                });
                location.reload(true);
              },
              error: readErrorMsg
            });
          }

        </script>

        <script>
          function updateWorkFLow() {
            var id = $("#workflowId").val();
            var updateworkflowName = $("#editworkflowName").val();
            var updateworkflowtype = $("#editworkflowtype").val();
            // var updatedepartmentworkflow = $("#editdepartmentworkflow").val();
            var updatecondition = $("#editcondition").val();
            var updatedescription = $("#editdescription").val();
            var updatesettingapproved = $("#editsettingapproved").val();

            // Capture the approver list
            const approverList = $(".approved-field select").map(function () { // Make sure the selector is correct
              const userName = $(this).find("option:selected").text();
              const approvalRoleId = $(this).val();
              const id = $("#approverId").val();  // Get the employee ID as the approvalRoleId
              return userName ? { userName: userName, approvalRoleId: approvalRoleId, id: id } : null;
            }).get().filter(Boolean);

            let updatedepartmentworkflow = $("#editdepartmentworkflow").val();
            var updateControlPanelData = {
              "id": id,
              "name": updateworkflowName,
              "type": updateworkflowtype,
              "department": updatedepartmentworkflow,
              "conditions": updatecondition,
              "description": updatedescription,
              "approvedBy": updatesettingapproved,
              "approverList": approverList // Set the updated approver list
            };

            // Make the AJAX call to update
            $.ajax({
              url: "/stratroom/updateWorkFlow",
              type: "PUT",
              contentType: "application/json",
              data: JSON.stringify(updateControlPanelData),
              success: function (data, status) {
                $.notify("Success: Updated Successfully", {
                  style: 'success',
                  className: 'graynotify'
                });
                location.reload(true);
              },
              error: function (xhr, status, error) {
                console.log("Error: " + error);
              }
            });
          }

        </script>

        <script>
          $(document).ready(function () {

            $('.nav-link').on('click', function () {

              $('.nav-link').removeClass('active');

              $(this).addClass('active');


              $('.tab-pane').removeClass('show active');

              $($(this).data('bs-target')).addClass('show active');
            });


            $('.dropdown-menu .nav-link').on('click', function () {

              $('#dropdownMenuButton').text($(this).find('.nav-text').text());
            });
          });
        </script>

        <script>
          $(document).ready(function () {
            $('#v-pills-tab .nav-link').on('click', function () {
              var selectedText = $(this).find('.nav-text').text();
              $('#dropdownMenuButton').text(selectedText);
            });
          });
        </script>

        <script>
          document.addEventListener("DOMContentLoaded", function () {
            console.log("DOM fully loaded and parsed");
            document.querySelectorAll(".security-tab").forEach(function (radio) {
              radio.addEventListener("change", function () {
                let target = this.getAttribute("data-bs-target");
                let tabContent = document.querySelector(".tab-content-security");

                // Remove active and show class from all tab panes
                tabContent.querySelectorAll(".tab-pane").forEach(function (pane) {
                  pane.classList.remove("show", "active");
                });

                // Add active and show class to the selected tab pane
                document.querySelector(target).classList.add("show", "active");
              });
            });
          });
        </script>


        <script>
          document.addEventListener('DOMContentLoaded', function () {
            // Get all color options
            const colorOptions = document.querySelectorAll('.template-customizer-colors-options .custom-option-body');

            // Function to update multiple CSS variables
            function updateCssVariables(color, cssVars) {
              try {
                // Parse the JSON array from the attribute
                const variables = JSON.parse(cssVars);

                // Update each CSS variable
                variables.forEach(varName => {
                  document.documentElement.style.setProperty(varName, color);
                });

                // Store the color in localStorage
                localStorage.setItem('stratroomPrimaryColor', color);

                // Return true if successful
                return true;
              } catch (e) {
                console.error('Error updating CSS variables:', e);
                return false;
              }
            }

            // Add click event to each color option
            colorOptions.forEach(option => {
              option.addEventListener('click', function () {
                const color = this.getAttribute('data-color');
                const cssVars = this.getAttribute('data-css-var');

                if (updateCssVariables(color, cssVars)) {
                  // Update selected class only if successful
                  colorOptions.forEach(opt => opt.classList.remove('selected'));
                  this.classList.add('selected');
                }
              });
            });

     // Color picker implementation
const customColorPicker = document.getElementById('customColorPicker');
if (customColorPicker) {
  const pickr = Pickr.create({
    el: '#customColorPicker',
    theme: 'classic',
    default: localStorage.getItem('stratroomPrimaryColor') || '#883B71',
    components: {
      preview: true,
      opacity: true,
      hue: true,
      interaction: {
        hex: true,
        rgba: true,
        input: true,
        save: true
      }
    }
  });

  pickr.on('save', (color, instance) => {
    const hexColor = color.toHEXA().toString();
    
    // Calculate brightness (lightness)
    const rgb = color.toRGBA();
    const brightness = (0.299 * rgb[0]) + (0.587 * rgb[1]) + (0.114 * rgb[2]);

    // Variables used in your HTML
    const cssVars = [
      "--stratroom-primary",
      "--stratroom-btn-bg",
      "--stratroom-btn-border-color",
      "--stratroom-btn-hover-bg",
      "--stratroom-nav-pills-link-active-bg"
    ];

    // Update main color variables
    if (updateCssVariables(hexColor, JSON.stringify(cssVars))) {
      colorOptions.forEach(opt => opt.classList.remove('selected'));
    }

    // If color is light → use dark text; else use white text
    if (brightness > 180) {
      document.documentElement.style.setProperty("--stratroom-white", "#222222"); // dark color
     
    } else {
      document.documentElement.style.setProperty("--stratroom-white", "#FFFFFF"); // light color
  
    }

    // Optionally save to localStorage
    localStorage.setItem('stratroomPrimaryColor', hexColor);
  });
}

            // Load saved color on page load
            const savedColor = localStorage.getItem('stratroomPrimaryColor');
            if (savedColor) {
              // Use the same variables as in your HTML
              const cssVars = '["--stratroom-primary", "--stratroom-btn-bg", "--stratroom-btn-hover-bg", "--stratroom-btn-border-color" ,"--stratroom-nav-pills-link-active-bg"]';
              updateCssVariables(savedColor, cssVars);
            }
          });


        </script>

        <script>
          document.addEventListener('DOMContentLoaded', function () {
            // Get all theme radio buttons
            const themeRadios = document.querySelectorAll('input[name="theme"]');

            // Add click event listeners to each radio button
            themeRadios.forEach(radio => {
              radio.addEventListener('change', function () {
                const selectedTheme = this.getAttribute('data-theme');
                applyTheme(selectedTheme);

                console.log(selectedTheme, "selected theme");
                // Optionally save the preference to localStorage
                localStorage.setItem('theme', selectedTheme);
              });
            });

            // Function to apply the selected theme
            function applyTheme(theme) {
              if (theme === 'system') {
                // Use system preference
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.body.setAttribute('data-bs-theme', 'dark');
                } else {
                  document.body.setAttribute('data-bs-theme', 'light');
                }
              } else {
                document.body.setAttribute('data-bs-theme', theme);
              }
            }

            // Check for saved theme preference
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
              document.querySelector(`input[data-theme="${savedTheme}"]`).checked = true;
              applyTheme(savedTheme);
            }

            // Listen for system theme changes (if system theme is selected)
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
              if (document.querySelector('input[data-theme="system"]:checked')) {
                applyTheme('system');
              }
            });
          });



                function getLoginLogo() {
        $.ajax({
          url: "/stratroom/loginTheme",
          type: "GET",
          contentType: "application/json",
          success: function (response, status) {
            if (!jQuery.isEmptyObject(response)) {
              if (
                response["loginLogo"] != undefined &&
                response["loginLogo"] != null &&
                response["loginLogo"] != ""
              ) {
                // if (response["loginLogo"] != "true") {
                //   $(".login-img").css(
                //     "background-image",
                //     "url(" + response["loginLogo"] + ")"
                //   );
                // }
                if (response["loginLogo"] !== "true") {
                    // $(".login-img").css({
                    //     "background": "url(" + response["loginLogo"] + ") center center no-repeat",
                    //     "background-size": "cover"  
                    // });

                     $("#imagePreview").attr("src", response["loginLogo"]);
                }
              }
              if (
                response["loginTheme"] != undefined &&
                response["loginTheme"] != null &&
                response["loginTheme"] != ""
              ) {
                $(".loginindexlogo").attr("src", response["loginTheme"]);
              }
            } else {
              $(".login-img").css(
                "background-image",
                "url('/stratroom/img/Login-img.png')"
              );
            }
          },
        });

        setTimeout(function () {
          $(".page-loader-wrapper").hide();
        }, 2000);
      }

      getLoginLogo()
        </script>


  <script>
    $(document).ready(function () {
      $(".select-dropdown").select2({
        // allowClear: true,
        width: "100%"
      });
      $(".select-dropdown-add-workflow").select2({
        // allowClear: true,
        width: "100%",
        dropdownParent: $('#add-workflow')
      });
      $(".select-dropdown-edit-workflow").select2({
        // allowClear: true,
        width: "100%",
        dropdownParent: $('#edit-workflow')
      });
    });
  </script>





    </body>