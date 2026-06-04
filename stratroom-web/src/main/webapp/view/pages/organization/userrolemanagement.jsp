<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
  <c:set var="contextroot" value="${pageContext.request.contextPath}" />
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <title>StratRoom</title>


    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/css/basic.css?v0.004" rel="stylesheet">
    <link href="assets/css/main.css?v0.004" rel="stylesheet">
    <link href="assets/css/responsive.css" rel="stylesheet">
    <link href="assets/css/file-upload.css" rel="stylesheet">

    <!-- Font Awsome Icons -->
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />


    <style>
      .select2-container--open {
        z-index: 99999 !important;
        /* Ensure this is higher than the modal's z-index */
      }

      .nav-item.active {
        background-color: #883b71;
        color: #fff;
      }


    </style>
  </head>
  	<script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>

  <body class="light">

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
                <img src="images/user-role-i.svg" alt="User Role" width="18" height="18">
              </span>
              <span data-translate="user_management.title">Users & Permissions</span>
            </h4>
          </div>
          <div class="load-page page-actions g-col-4">
            <div class="page-icons">
              <ul>
                <!-- <li>
                <a href="#">
                  <img src="images/filter-i.svg" alt="view" title="view">
                </a>
              </li> -->
                <li>
                  <a href="#add-user" data-bs-toggle="modal">
                    <span class="icon" data-bs-toggle="tooltip" data-bs-title="Add">
                      <i class="fas fa-plus title_edit_icon"></i>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/stratroom/downloadUserRole">
                    <span class="icon userdownloadlink" data-bs-toggle="tooltip" data-bs-title="Import" >
                      <img src="images/import-i.svg" alt="import" width="12" height="12">
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" data-bs-toggle="modal" id="file-uploadopen" data-bs-target="#file-validate-form">
                    <span class="icon" data-bs-toggle="tooltip" data-bs-title="Export">
                      <img src="images/export-i.svg" alt="export" width="12" height="12">
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="container-lg py-2">
        <div class="card custom-card-tab controlpanel-container">
          <div class="card-header">
            <div class="c-header-left">
              <div class="dropdown dropdown-tab">
                <button class="btn btn-primary dropdown-toggle d-lg-none" type="button" id="dropdownMenuButton"
                  data-bs-toggle="dropdown" aria-expanded="false" data-value="User" data-translate="user_management.User">
                  Users
                </button>

                <ul class="dropdown-menu nav nav-pills horizontal-tab-menu custom-tab-control" id="custom-tab"
                  role="tablist" aria-orientation="horizontal">

                  <button class="card nav-link active" id="v-pills-user-tab" data-toggle="pill"
                    data-target="#v-pills-user" type="button" role="tab" aria-controls="v-pills-user"
                    aria-selected="true" data-value="User">
                    <span class="nav-text" data-translate="user_management.User">Users</span>
                  </button>
                  <button class="card nav-link" id="v-pills-permission-tab" data-toggle="pill"
                    data-target="#v-pills-permission" type="button" role="tab" aria-controls="v-pills-permission"
                    aria-selected="false" data-value="Role">
                    <span class="nav-text" data-translate="user_management.permission">Permissions</span>
                  </button>
                </ul>
              </div>
            </div>
            <div class="card-actions">

              <div class="input-group input-group-sm">
                <span class="input-group-text bg-transparent">
                  <i class="fa fa-search"></i>
                </span>
                <input type="text" class="form-control" placeholder="Search by name, email, role or department" id="searchUser">
              </div>

              <button type="button" class="btn btn-sm btn-outline-icon" data-toggle="modal" data-target="#add_user"
                onclick="handleUserRoleevent('','add')" style="background-color: white">
                <span class="icon" data-toggle="tooltip" data-title="Add">
                  <i class="fas fa-plus title_edit_icon"></i>
                </span>
              </button>

            </div>
          </div>

          <div class="card-body tab-content horizontal-tab-content" id="v-pills-tabContent">
            <!-- user :::::::::::::::::::::::::::: -->
            <div class="tab-pane fade show active customTabContent User" id="v-pills-user" role="tabpanel"
              aria-labelledby="v-pills-user-tab" tabindex="0">
              <div class="row userrolecontent" style="padding: 0.5rem 1rem 0rem 1rem;">
              </div>
            </div>
            <!-- user END:::::::::::::::::::::::::::: -->

            <!-- permission :::::::::::::::::::::::::::: -->
            <div class="customTabContent Role" style="display: none;">
              <div class="permission-section">
                <div class="dropdown permission-panel-warp">
                  <ul class="dropdown-menu permission-tab-menu" id="permission-pills-tab" role="tablist">
                    <li>
                      <h6 class="nav-title defaultRolesHeader" data-translate="user_management.Default Roles">Default Roles (0)</h6>
                    </li>

                    <li>
                      <hr class="dropdown-divider">
                    </li>
                    <li>
                      <h6 class="nav-title custumRoles" data-translate="user_management.Custom Roles">Custom Roles (0)</h6>
                    </li>

                    <!-- need to display default role list here  -->

                  </ul>
                </div>

                <div class="permission-content tab-content">

                  <!-- active module array object module  name i need to display here -->





                </div>

              </div>

            </div>
          </div>
          <!-- permission END:::::::::::::::::::::::::::: -->


          <!-- File Validate Form -->
          <div class="modal custom-modal fade" id="file-validate-form" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">File Upload</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card-header-progress">
            <ul class="form-progressbar w-100">
              <li>Upload</li>
              <li>Validation</li>
              <li>Import</li>
            </ul>
          </div>

		  <input type="hidden" id="orgimportmethodtype">


          <div id="file-upload" class="card custom-card" >
            <div class="card-body grid gap-3">                   
                
                  <div class="g-col-12 dropzone-wrapper">
                    <div class="form-group dropzone-desc">
                      <label for="" class="form-label">Upload File</label>
                      <label for="login" class="upload-label upload-box">
                        <div class="upload">Choose a file or drag it here.</div>
                        <input type="file" id="importfile" class="dropzone">
                      </label>
                    </div>
                                 
                               
                </div>                           
            </div>   
            <div class="card-footer">
              <div class="d-flex justify-content-between form-line">
              <button  type="button" class="btn btn-primary initative_save_btn ms-auto" id="next-btn-1">
              Next
            </button>
          </div> 
          </div>         
          </div>

          <div class="card custom-card" id="file-validate" style="display: none">
            <div class="card-body grid gap-3">
            <div class="g-col-12 img-center">
            
              <img src="/stratroom/images/not-verified.png" alt="not-verified" />
              <div class="error-div">
                <table class="error-table">
                  <thead>
                    <tr>
                      <th style="width: 150px">Row</th>
                      <th>Error</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                  </tbody>
                </table>
              </div>
            </div>
          <div class="card-footer">
			      <div class="d-flex justify-content-between form-line">
              <button type="button" class="btn btn-label-secondary btn-default1" id="prev-btnerror">
                Previous
              </button>
            </div>
            </div>

           
            
          </div>
          
          </div>

		      <div class="card-footer" id="file-next-btn" style="display: none">
			 <div class="card-body grid gap-3">
            <div class="g-col-12">
              <div class="text-center">
                <img src="/stratroom/images/success.png" alt="Verified" width="140" />
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-between form-line">
              <button type="button" class="btn btn-label-secondary btn-default1" id="prev-btnone">
                Previous
              </button>
              <button class="btn btn-primary initative_save_btn" id="next-btn-2">
                Next
              </button>
            </div>
            </div>
          </div>

          <div class="card custom-card" id="file-save" style="display: none">
            <div class="card-body grid gap-3">
            <div class="g-col-12">
              <div class="text-center">
                <img src="/stratroom/images/success.png" alt="Verified" width="140" />
              </div>
            </div>
          </div>
           
            <div class="card-footer">
              <div class="d-flex justify-content-between form-line">
                <button type="button" class="btn btn-label-secondary" id="prev-btn2">
                  Previous
                </button>
                <button class="btn btn-primary initative_save_btn" id="done-btn" data-bs-dismiss="modal"
                  aria-label="Close">
                  Done
                </button>
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
    	<footer class="col-12 text-center py-2 copyright" 
			style="position:fixed; bottom:0; left:0; width:100%; margin:0; padding:8px;">
				<p class="mb-0" style="margin:0;">Copyright &copy; 
				<span id="year"></span> <strong>StratRoom</strong>
				</p>

				<script>
				document.getElementById("year").textContent = new Date().getFullYear();
				</script>
			</footer>

    <div class="floating-box shadow-sm">
      <a class="control-link" href="#"><span class="icon"><img src="images/organization-i.svg" width="18" height="18"
            alt="organization"></span></a>
      <a class="control-link" href="#"><span class="icon"><img src="images/template.svg" width="18" height="18"
            alt="organization"></span></a>
    </div>




    <!-- add-user -->
    <div class="modal fade" id="add_user" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
      <div
        class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" data-translate="user_management.Add User">Add User</h4>
            <button type="button" class="btn-close close pull-right" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <form id="userroleFormadd">
              <div class="card-body">
                <div class="grid gap-3">
                  <input type="hidden" name="userroleid" id="userroleid">
                  <input type="hidden" name="userprofileimage" id="userprofileimage">

                   <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="" data-i18n="userId" data-translate="user_management.userId">Employee Id</label>
                      <input type="text" name="userUniqId" id="userUniqId" class="form-control browser-default"
                        style="border-radius: 5px!important;" autocomplete="off" />
                    </div>
                  </div>
                  
                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="" data-i18n="Email" data-translate="user_management.Email">Email</label>
                      <input type="text" name="userroleemail" id="userroleemail" class="form-control browser-default"
                        style="border-radius: 5px!important;" autocomplete="off" />
                    </div>
                  </div>

                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="" data-i18n="Name" data-translate="user_management.Name">Name</label>
                      <input type="text" name="userrolename1" id="userrolename1" class="form-control browser-default"
                        style="border-radius: 5px!important;" autocomplete="off" maxlength="50" />
                    </div>
                  </div>

                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="" data-i18n="Designation" data-translate="user_management.Designation">Designation</label>
                      <input type="text" name="userroledesignation" id="userroledesignation"
                        class="form-control browser-default" style="border-radius: 5px!important;" autocomplete="off"
                        maxlength="50" />
                    </div>
                  </div>

                  <div class="g-col-12">
                    <div class="form-group">
                      <label for="" data-i18n="Department" data-translate="user_management.Department">Department</label><br>
                      <select class="form-control select2" name="userroledepartment" id="userroledepartment"
                        style="width: 100%;" multiple="multiple">
                      </select>
                    </div>
                  </div>

                  

                   <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="" data-i18n="Role" data-translate="user_management.Category">User Category</label>
                      <select class="form-control selectroleuser" name="userrolecategory" id="userrolecategory"
                        style="width: 100%;">
                        <option data-roleid="" value="internal">Internal</option>
                        <option data-roleid="" value="external">External</option>
                      </select>
                    </div>
                  </div>

                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="" data-i18n="Role" data-translate="user_management.Type">User Type</label>
                      <select class="form-control selectroleuser" name="userroleType" id="userroleType"
                        style="width: 100%;">
                         <!-- internal selects -->
                       
                      </select>
                    </div>
                  </div>

                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="" data-i18n="Role" data-translate="user_management.Role">Role</label>
                      <select class="form-control selectroleuser" name="userrolerole" id="userrolerole"
                        style="width: 100%;">
                       
                      </select>
                    </div>
                  </div>

                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="" data-i18n="Location" data-translate="user_management.Location">Location</label>
                      <input type="text" name="userrolelocation" id="userrolelocation"
                        class="form-control browser-default" style="border-radius: 5px!important;" autocomplete="off"
                        maxlength="50" />
                    </div>
                  </div>

                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="" data-i18n="Phone no" data-translate="user_management.Phone no">Phone No</label>
                      <input type="text" name="userrolephone" id="userrolephone" class="form-control browser-default"
                        style="border-radius: 5px!important;" autocomplete="off" maxlength="15" />
                    </div>
                  </div>

                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="" data-i18n="Status" data-translate="user_management.Status">Status</label>
                      <select class="form-control" name="userrolestatus" id="userrolestatus"
                        style="border-radius: 5px!important;">
                        <option data-i18n="Active">Active</option>
                        <option data-i18n="In active">Inactive</option>
                      </select>
                    </div>
                  </div>
            </form>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-dismiss="modal" aria-label="Close"
              data-i18n="Cancel" data-translate="user_management.Cancel">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary initative_save_btn" value="Save" data-i18n="Save" data-translate="user_management.Save">
              Save
            </button>
          </div>
        </div>
      </div>

    </div>
    </div>
    </div>


    <!-- create-template END -->

    <!--  delete modal :::::::::::::::::::::::::::::::::::::::: -->
    <div class="modal custom-modal custom-delete-modal fade" id="deleteModaldashboard" data-bs-backdrop="static"
      data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" style="--stratroom-modal-width:320px">
        <div class="modal-content">
          <div class="modal-body">
            <div class="card custom-card delete-card border-0">
              <div class="card-body">

                <div class="delete-box"> 
                  <h4 class="title" data-translate="user_management.Do you really want to delete?">Do you really want to delete?</h4>
                  <div class="btn-wrap">
                    <input type="hidden" id="deleterecordid" />
                    <input type="hidden" id="deleterecordtype" />
                    <button type="button" class="btn btn-sm btn-label-secondary rounded-pill" data-bs-dismiss="modal"
                      aria-label="Close" data-translate="user_management.Cancel">Cancel</button>
                    <button class="btn btn-sm btn-danger rounded-pill" onclick="handleeventdelete()" data-translate="user_management.Delete">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!--  delete modal :::::::::::::::::::::::::::::::::::::::: -->

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
    <script src="js/userrolemanagement.js"></script>
    <script src="${contextroot}/js/notify.js"></script>
    <script src="js/initial.js"></script>
    <script src="${contextroot}/js/select2.min.js"></script>
    <script>

      var coll = document.getElementsByClassName("collapsible");
      var i;

      for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
          this.classList.toggle("active");
          var content = this.nextElementSibling;
          if (content.style.display === "block") {
            content.style.display = "none";
          } else {
            content.style.display = "block";
          }
        });
      }

      $("#open_search").click(function () {
        $(".nav-search").show();
        $("#open_search").hide();
      });

      $("#close_search").click(function () {
        $("#open_search").show();
        $(".nav-search").hide();
      });


      $('[data-toggle="tooltip"]').attr("data-placement", "bottom");
      $('[data-toggle="tooltip"]').tooltip({
        delay: { "show": 0, "hide": 0 }
      });
    </script>

    <script type="text/javascript">

      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://api.ipify.org?format=jsonp&callback=DisplayIP";
      //script.src = "http://jsonip.com?callback=DisplayIP";
      script.crossorigin = "anonymous";
      document.getElementsByTagName("head")[0].appendChild(script);

      function DisplayIP(response) {
        localStorage.setItem('systemip', response.ip)
      }

    </script>


    <script>
      $("#userrolerole").select2({
        width: '100%',
        placeholder: "Select Role",
        //allowClear: true,
        dropdownParent: $('#add-user')
      });
      $("#userRoleEdit").select2({
        width: '100%',
        placeholder: "Select Role",
        //allowClear: true,
        dropdownParent: $('#edit-user')
      });

      $("#userroledepartment").select2({
        width: '100%',
        placeholder: "Select Department",
        //allowClear: true,
        dropdownParent: $('#add-user')
      });
      $("#userDepartmentEdit").select2({
        width: '100%',
        placeholder: "Select Department",
        //allowClear: true,
        dropdownParent: $('#edit-user')
      });

      $("#userStatus").select2({
        width: '100%',
        placeholder: "Select Status",
        //allowClear: true,
        dropdownParent: $('#add-user')
      });
      $("#userStatusEdit").select2({
        width: '100%',
        placeholder: "Select Status",
        //allowClear: true,
        dropdownParent: $('#edit-user')
      });
    </script>


    <script>

  

      //Custum Roles
      function custumRoleListShow() {
        const data = [
          {
            "roleId": 53,
            "roleName": "Super User",
            "roleType": null,
            "type": 0,
            "status": 0,
            "createdBy": 990,
            "updatedBy": 0,
            "createdTime": "2021-07-12T17:18:11",
            "updatedTime": "2021-07-12T17:18:11",
            "moduleList": null,
            "privilegeList": null,
            "employeeList": null,
            "employeeIDs": null
          },
          {
            "roleId": 54,
            "roleName": "Admin",
            "roleType": null,
            "type": 0,
            "status": 0,
            "createdBy": 990,
            "updatedBy": 0,
            "createdTime": "2021-07-12T17:18:42",
            "updatedTime": "2021-07-12T17:18:42",
            "moduleList": null,
            "privilegeList": null,
            "employeeList": null,
            "employeeIDs": null
          }
        ];

        console.log(data, "data");
        $(".content2:eq(0)").empty();
        var bodyRows = "";
        var custom = 0;
        var defaultinc = 0;
        var chartsOptions = "";
        var currentrolename = $("#superuserrolename").val();

        $.each(data, function (i, List) {
          // Append the role to the Custom Roles section (after the header)
          $(".permission-tab-menu .custumRoles").each(function () {
            if ($(this).text().trim().startsWith("Custom Roles (")) {
              $(this).closest("li").after(
                '<li class="nav-item" role="presentation">' + List.roleName + '</li>'
              );
            }
          });
        });

        // Update the count of Custom Roles
        $(".permission-tab-menu .custumRoles").each(function () {
          if ($(this).text().trim().startsWith("Custom Roles (")) {
            const roleCount = data?.length || 0;
            $(this).text("Custom Roles (" + roleCount + ")");
          }
        });


      }

    </script>


    <script>
      $(document).ready(function () {

         $('#file-uploadopen').on('click', function() {
              console.log('File upload clicked - clear data now');
              
              $('#uploadcategory').val('');
              $('#login').val('');
              
              $('#file-validate').hide();
              $("#file-save").hide();
              $("#file-next-btn").hide();
              $("#file-upload").show();
          });
        $('#v-pills-tab .nav-link').on('click', function () {
          var selectedText = $(this).find('.nav-text').text();
          $('#dropdownMenuButton').text(selectedText);
        });
      });


      // Live search functionality
$(document).on('input', '#searchUser', function () {
    const searchTerm = $(this).val().trim().toLowerCase();

    if (searchTerm === '') {
        // Show all rows if search is empty
        $('#userTable tbody tr').show();
        return;
    }

    $('#userTable tbody tr').each(function () {
        const $row = $(this);
        const fullName = $row.find('td:eq(0) .text-heading').text().toLowerCase();
        const email = $row.find('td:eq(0) small').text().toLowerCase();
        const role = $row.find('td:eq(1) .badge').text().toLowerCase();
        const department = $row.find('td:eq(2) .badge').text().toLowerCase();
        const status = $row.find('td:eq(3) .text-bg-success, td:eq(3) .text-bg-danger').text().toLowerCase();

     
        const matches = (
            fullName.includes(searchTerm) ||
            email.includes(searchTerm) ||
            role.includes(searchTerm) ||
            department.includes(searchTerm) ||
            status.includes(searchTerm)
        );

        $row.toggle(matches);
    });
});
    </script>







  </body>