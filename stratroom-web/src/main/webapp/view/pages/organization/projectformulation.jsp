<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
  <c:set var="contextroot" value="${pageContext.request.contextPath}" />
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <title>StratRoom</title>
    <link href="assets/css/file-upload.css" rel="stylesheet">





  </head>

  <style>
    .nested-area {
      list-style-type: none;
      margin: 0;
      padding: 0;
      position: relative;
      padding-left: 35px;
    }

    .nested-area.nested {
      display: none;
    }

    .nested-area.active {
      display: block;
    }

    .nested-area.sortable-empty::before,
    .nested-area.sortable-empty::after {
      display: none;
    }

    .nested-area::before,
    .nested-area::after {
      content: "";
      position: absolute;
      background-color: var(--primary-color);
    }

    .nested-area::before {
      width: 1px;
      height: 100%;
      top: 0;
      left: 18px;
      bottom: 0;
      min-height: 55px;
    }

    .nested-area::after {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      left: 16px;
      bottom: 0;
    }

    .nested-area .nested-item {
      padding-top: 12px;
    }

    .nested-area .nested-item:first-child,
    .nested-area .nested-item.non-draggable,
    .nested-area .nested-item.nested-item-parent {
      padding-top: 20px;
    }

    .nested-area .nested-item.dragging-highlight {
      opacity: 0.7;
    }

    .nested-area .nested-item.dragging-highlight::before,
    .nested-area .nested-item.dragging-highlight::after {
      display: none;
    }

    .nested-area .nested-item.dragging-highlight .org-box {
      border-style: dashed;
    }

    .nested-area .nested-item .caret {
      position: absolute;
      width: 20px;
      height: 20px;
      left: -27px;
      top: 10px;
      text-align: center;
      border-radius: 50%;
      background-color: #FFF;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid rgba(0, 0, 0, 0.3);
      cursor: pointer;
      user-select: none;
    }

    .nested-area .nested-item .caret::before {
      content: "";
      color: #85798c;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-image: url(images/carat-i.svg);
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 6px;
      width: 20px;
      height: 20px;
      position: relative;
      transform: rotate(180deg);
      transition: 0.15s ease-in-out;
    }

    .nested-area .nested-item .caret.caret-down::before {
      transform: rotate(360deg);
    }

    .nested-area.nested {
      padding-left: 35px;
    }

    .nested-area.nested::before {
      left: 18px;
    }

    .nested-area .nested-item {
      position: relative;
    }

    .nested-area .nested-item:first-child::before {
      content: "";
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: var(--primary-color);
      left: -19px;
      top: 0;
    }

    .nested-area .nested-item .parent::before,
    .nested-area .nested-item .child::before {
      content: "";
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: var(--primary-color);
      left: -20px;
      top: 16px;
    }

    .nested-area .nested-item .parent::after,
    .nested-area .nested-item .child::after {
      content: "";
      width: 15px;
      height: 1px;
      background-color: var(--primary-color);
      top: 18px;
      position: absolute;
      left: -15px;
      bottom: 0;
    }

    /* Placeholder styling */
    .ui-sortable-placeholder {
      padding-top: 12px;
    }

    .ui-sortable-placeholder::before {
      content: 'drag & drop here';
      display: flex;
      height: 48px;
      width: 100%;
      border: 1px dashed var(--card-border-color);
      border-radius: var(--border-radius);
      text-align: center;
      justify-content: center;
      align-items: center;
    }

    .sortable-empty {
      padding-top: 12px;
    }

    .sortable-empty::before {
      content: 'drag & drop here';
      display: flex;
      height: 48px;
      width: 100%;
      border: 1px dashed var(--card-border-color);
      border-radius: var(--border-radius);
      text-align: center;
      justify-content: center;
      align-items: center;
    }

    .select2-container--open {
      z-index: 99999 !important;
      /* Ensure this is higher than the modal's z-index */
    }
  </style>
  <script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>

  <body class="light">
    <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">


    <div style="display: none;">
      <jsp:include page="../common/right-navigation.jsp"></jsp:include>
    </div>

    <jsp:include page="../common/top-navigation.jsp"></jsp:include>
    <header id="header" class="header shadow-sm">

      <jsp:include page="../common/left-navigation.jsp"></jsp:include>
    </header>
    <main class="pt-2 pb-2">

      <c:if test="${pageId != null}">
        <input id="pagenumber" type="hidden" name="pagenumber" value="<c:out
        value=" ${pageId}" />">
      </c:if>
      <c:if test="${principal != null}">
        <input id="userPrincipal" type="hidden" name="userPrincipal" value="<c:out value="
          ${principal.profile.empId}" />">
      </c:if>
      <div class="container-lg">
        <div class="page-header grid gap-2 pb-1">
          <div class="g-col-8 d-flex align-items-center">
            <h4 class="title">
              <span class="icon">
                <!-- <img src="/stratroom/images/meetings-i.svg" alt="meetings" title="meetings"> -->
                  <i data-lucide="calendar-cog" style="width: 18px; height: 18px;"></i>
              </span>
              Project Planning
            </h4>
          </div>

        </div>
      </div>
      <div class="container-lg py-2">
        <div class="card custom-card">
          <div class="card-header">
            <div class="c-header-left">
              <h5 class="card-title me-auto">
                <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">
                  Project Planning List</strong>
              </h5>
            </div>
            <div class="card-actions">
              <div id="popoverFilterProjectPlanningCategory">
                <span type="button" class="btn btn-sm btn-icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
                  title="Project Planning Category">
                  <!-- <i class="fas fa-filter title_edit_icon"></i> -->
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="funnel" style="width: 16px; height: 16px;" class="lucide lucide-funnel"><path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"></path></svg>
                </span>
              </div>
              <button type="button" class="btn btn-sm btn-icon openAddModal" data-bs-toggle="modal"
                data-bs-target="#project-planning-add-modal">
                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Create Meeting">
                  <!-- <i class="fas fa-plus title_edit_icon"></i> -->
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="plus" style="width: 16px; height: 16px;" class="lucide lucide-plus"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                </span>
              </button>
            </div>
          </div>
          <div class="card-body p-3">
            <div class="meetingList">
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
      <a class="control-link" href="#"><span class="icon"><img src="/stratroom/images/organization-i.svg" width="18"
            height="18" alt="organization"></span></a>
      <a class="control-link" href="#"><span class="icon"><img src="/stratroom/images/template.svg" width="18"
            height="18" alt="organization"></span></a>
    </div>

    <!--  org-add modal :::::::::::::::::::::::::::::::::::::::: -->

    <!-- Modal Structure -->
    <div class="modal custom-modal fade" id="add-org" data-backdrop="static" data-keyboard="false" tabindex="-1"
      role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
      <div
        class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Create Org</h4>
            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="card custom-card border-0">
              <div class="card-body">
                <div class="grid gap-3">

                  <input type="hidden" name="dept_new_id1" id="dept_new_id1" />
                  <input type="hidden" name="dept_parentid" id="dept_parentid" />
                  <input type="hidden" name="deptmode" id="deptmode" />
                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="sub_initative_progress" class="form-label">Department</label>
                      <input type="text" class="form-control browser-default" name="orgdept" id="orgdept"
                        placeholder="Department">
                    </div>
                  </div>
                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="sub_initative_progress" class="form-label">Department ID</label>
                      <input type="text" class="form-control browser-default" name="editorgdeptid" id="editorgdeptid"
                        placeholder="Department ID">
                    </div>
                  </div>
                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="boardTypeEdit" class="form-label">Owner</label>
                      <select class="form-select select-dropdown-edit-org w-100 select2" name="ownernamemapping"
                        id="ownername" data-placeholder="Select Owner" style="width: 100%;">
                      </select>
                    </div>
                  </div>
                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="sub_initative_progress" class="form-label">Email</label>
                      <input type="text" class="form-control browser-default" name="deptemailadd" id="deptemailadd"
                        placeholder="Email">
                    </div>
                  </div>
                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="boardTypeEdit" class="form-label">Members</label>
                      <select class="userdept-name-multi-selectadd form-select select-dropdown-add-org w-100 select2"
                        style="width: 100%;" name="boardTypeCreate" id="boardTypeEdit" data-placeholder="Select Member"
                        multiple="multiple" name="namemapping[]">

                      </select>
                    </div>
                  </div>

                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="ScorecardEdit" class="form-label">Scorecard</label>
                      <select class="form-select select-dropdown-edit-org w-100" id="deptuserscorecard"
                        name="deptuserscorecard" data-placeholder="Select Scorecard">
                        <option value="" disabled selected hidden>
                          Select Scorecard
                        </option>

                      </select>
                    </div>
                  </div>
                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="InitiativeEdit" class="form-label">Initiative</label>
                      <select class="form-select select-dropdown-edit-org w-100" id="deptuserinitiative"
                        name="deptuserinitiative" data-placeholder="Select Initiative">
                        <option value="" disabled selected hidden>
                          Select Initiative
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="KPIEdit" class="form-label">KPI</label>
                      <select class="form-select select-dropdown-edit-org w-100" id="deptuserkpi" name="deptuserkpi"
                        data-placeholder="Select KPI">
                        <option value="" disabled selected hidden>
                          Select KPI
                        </option>
                      </select>

                    </div>
                  </div>
                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="RiskEdit" class="form-label">Risk</label>
                      <select class="form-select select-dropdown-edit-org w-100" id="deptuserrisk" name="deptuserrisk"
                        data-placeholder="Select Risk">
                        <option value="" disabled selected hidden>
                          Select Risk
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-dismiss="modal" aria-label="Close">
              Cancel
            </button>
            <button class="btn btn-primary" value="Save" onclick="return createdeptEmployee()">Save</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      id="project-planning-add-modal" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div
        class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title headerText">Create Project Planning</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="card custom-card border-0">
              <div class="card-body">
                <div class="grid gap-3">
                  <!-- <div class="g-col-12 g-col-md-2">
                    <div class="form-group">
                      <label for="Project_id" class="form-label">ID</label>
                      <input type="text" class="form-control" name="Project_show_id" id="Project_show_id" disabled
                        placeholder="ID">
                    </div>
                  </div> -->
                  <div class="g-col-12" style="display:none;">
                    <div class="form-group">
                      <label for="Project_name" class="form-label">ID</label>
                      <input type="text" class="form-control" id="Project_Id" name="Project_name" placeholder="Name" />
                    </div>
                  </div>
                  <div class="g-col-12">
                    <div class="form-group">
                      <label for="Project_name" class="form-label">Name</label>
                      <input type="text" class="form-control" id="Project_name" name="Project_name"
                        placeholder="Name" />
                    </div>
                  </div>
                  <div class="g-col-12">
                    <div class="form-group">
                      <label for="Project_description" class="form-label">Description</label>
                      <textarea class="form-control modal-custom-textarea" id="Project_description"
                        name="Project_description" placeholder="Description" rows="3"></textarea>
                    </div>
                  </div>
                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="Project_owner" class="form-label">Sponsor</label>
                      <select id="Project_owner" name="Project_owner" class="form-select modal-custom-select"
                        data-placeholder="Select Sponsor">
                        <!-- <option value="" disabled selected>Select Sponsor</option>
                      <option value="2241">Nizam Goolam</option> -->
                      </select>
                    </div>
                  </div>
                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="Project_team" class="form-label">Team</label>
                      <select id="Project_team" name="Project_team" class="form-select modal-custom-select"
                        data-placeholder="Select Team" disabled>
                        <!-- <option value="" disabled selected>Select Team</option>
                      <option value="2241">Nizam Goolam</option> -->
                      </select>
                    </div>
                  </div>
                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="Project_Department" class="form-label">Department</label>
                      <select id="Project_Department" name="" class="form-select modal-custom-select"
                        data-placeholder="Select a Department" onchange="handeDepartmentChange()">

                      </select>
                    </div>
                  </div>
                   <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="Project_Initiative" class="form-label">Initiative</label>
                      <select id="Project_Initiative" name="" class="form-select modal-custom-select"
                        data-placeholder="Select a Department">

                      </select>
                    </div>
                  </div>
                   <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="statusTypeobjective" class="form-label">Category</label>
                      <select id="categoryValue" name="categoryValue" class="form-select modal-custom-select"
                        aria-invalid="false">
                        <option value="" selected disabled>Select</option>
                        <option value="Strategy & Leadership">Strategy & Leadership</option>
                        <option value="Operations">Operations</option>
                        <option value="Finance">Finance</option>
                        <option value="Sales">Sales</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Customer">Customer</option>
                        <option value="Human Resources (HR)">Human Resources (HR)</option>
                        <option value="Information Technology (IT)">Information Technology (IT)</option>
                        <option value="Risk Management">Risk Management</option>
                        <option value="Compliance">Compliance</option>
                        <option value="Legal">Legal</option>
                        <option value="Procurement & Supply Chain">Procurement & Supply Chain</option>
                        <option value="Product Development & Innovation">Product Development & Innovation</option>
                        <option value="Sustainability & ESG">Sustainability & ESG</option>


                      </select>
                    </div>
                  </div>
                  <!-- <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="category" class="form-label">Category</label>
                      <select id="category" name="category" class="form-select modal-custom-select">
                        <option value="" selected disabled>Select</option>
                        <option value="Strategy & Leadership">Strategy & Leadership</option>
                        <option value="Operations">Operations</option>
                        <option value="Finance">Finance</option>
                        <option value="Sales">Sales</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Customer">Customer</option>
                        <option value="Human Resources (HR)">Human Resources (HR)</option>
                        <option value="Information Technology (IT)">Information Technology (IT)</option>
                        <option value="Risk Management">Risk Management</option>
                        <option value="Compliance">Compliance</option>
                        <option value="Legal">Legal</option>
                        <option value="Procurement & Supply Chain">Procurement & Supply Chain</option>
                        <option value="Product Development & Innovation">Product Development & Innovation</option>
                        <option value="Sustainability & ESG">Sustainability & ESG</option>
                      </select>

                    </div>
                  </div> -->

                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="Project_start_date" class="form-label">Start End Date</label>
                      <input type="text" class="form-control date-range-picker" data-language="en"
                        name="Project_start_date" id="Project_start_end_date"
                        placeholder="Planned Start Date/End Date" />
                    </div>
                  </div>

                  <!-- <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="Project_start_end_date" class="form-label">End Date</label>
                    <input type="text" class="form-control date-range-picker" data-language="en"
                      name="Project_end_date" id="Project_end_date"
                      placeholder="Planned Start Date/End Date" />
                  </div>
                </div> -->

                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="Project_name" class="form-label">Budget</label>
                      <input type="text" class="form-control" id="budget" name="budget" placeholder="" />
                    </div>
                  </div>

                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="statusTypeobjective" class="form-label">Status</label>
                      <select id="status" name="statusTypeobjective" class="form-select modal-custom-select"
                        aria-invalid="false">
                        <option value="" selected disabled>Select Status</option>
                        <option value="not_started">Not Started</option>
                        <option value="in_progress">In Progress</option>
                        <option value="planned">Planned</option>


                      </select>
                    </div>
                  </div>


                  <div class="g-col-12">
                    <div class="form-group">
                      <label for="kpi_fields" class="form-label">Priority</label>
                      <div>
                        <div class="form-check form-check-inline">
                          <input class="form-check-input green" type="radio" name="status" id="statusGreen"
                            value="High">
                          <label class="form-check-label" for="statusGreen">High</label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input class="form-check-input orange" type="radio" name="status" id="statusOrange"
                            value="Medium">
                          <label class="form-check-label" for="statusOrange">Medium</label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input class="form-check-input red" type="radio" name="status" id="statusRed" value="Low">
                          <label class="form-check-label" for="statusRed">Low</label>
                        </div>

                      </div>
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
            <button class="btn btn-primary buttonText" value="Save" onclick="handleProjectPlaningSave()">Save</button>

          </div>
        </div>
      </div>
    </div>


    <!-- Modal Pop Ups -->
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
                    <button type="button" class="btn btn-sm btn-label-secondary rounded-pill" data-bs-dismiss="modal"
                      aria-label="Close">Cancel</button>
                    <button class="btn btn-sm btn-danger rounded-pill">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>



    <div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="recommendation"
      tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
      <div
        class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Recommendation</h5>

            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input type="hidden" name="recommendationtype" id="recommendationtype">
            <input type="hidden" name="recommendationtype" id="recommendationcount">
            <table class="table tab-sm table-bordered align-center" id="note_table">
              <thead>
                <tr>
                  <th class="text-center">Recommendation</th>
                  <th class="text-center">Responsible</th>
                  <th class="text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="tableBody">

              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary recommendationclose" data-bs-dismiss="modal"
              data-i18n="Cancel">
              Cancel
            </button>
            <button class="btn btn-primary" onclick="recommendationsubmit()" data-i18n="Save">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="action" tabindex="-1"
      role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Actions/Tasks</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input type="hidden" id="actionsid">
            <input type="hidden" name="recommendationtype" id="actiontype">
            <input type="hidden" name="recommendationtype" id="actioncount">
            <table class="table table-sm table-bordered align-center" id="action_table">
              <thead>
                <tr>
                  <th class="text-center">Actions/Tasks</th>
                  <!-- <th class="text-center">By Date</th>
                  <th class="text-center">Responsible</th>
                  <th class="text-center">Status</th> -->
                  <th class="text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="actionBodyData">

              </tbody>
            </table>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
              Cancel
            </button>
            <button class="btn btn-primary" value="Save" onclick="actionssubmit()">Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal custom-modal fade" id="addpeopleactions" data-bs-backdrop="static" data-keyboard="false"
      tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Edit Users</h4>
            <button type="button" class="btn-close actionpeopleselectedUsers" data-bs-dismiss="modal"
              id="actionsclosePopupId" aria-label="Close"></button>
          </div>

          <div class="modal-body d-grid gap-3">
            <div class="attendees-search">
              <div>
                <div class="form-check cusom-check">
                  <input class="form-check-input" type="checkbox" value="" id="allusersactions">
                  <label class="form-check-label" for="allusers">
                    All Users
                  </label>
                </div>
              </div>
              <div class="search">
                <div class="input-group input-group-sm">
                  <input type="text" class="form-control" placeholder="Recipient's username"
                    aria-label="Recipient's username" aria-describedby="button-addon2" id="searchactions">
                  <button class="btn btn-outline-secondary" type="button" id="button-addon2">
                    <i class="fas fa-search" data-toggle="tooltip" data-placement="bottom" title=""
                      data-original-title="Files"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="list-group add-attendees">
              <input type="hidden" id="actionsresponsibleid">
              <div class="actionsListUsers"> </div>


            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal custom-modal fade" id="addpeople" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Edit Users</h4>
            <button type="button" class="btn-close peopleselectedUsers" data-bs-dismiss="modal" id="actionsclosePopupId"
              aria-label="Close"></button>
          </div>

          <div class="modal-body d-grid gap-3">
            <div class="attendees-search">
              <div>
                <div class="form-check cusom-check">
                  <input class="form-check-input" type="checkbox" value="" id="allusersaccess">
                  <label class="form-check-label" for="allusers">
                    All Users
                  </label>
                </div>
              </div>
              <div class="search">
                <div class="input-group input-group-sm">
                  <input type="text" class="form-control" placeholder="Recipient's username"
                    aria-label="Recipient's username" aria-describedby="button-addon2" id="searchrecommendation">
                  <button class="btn btn-outline-secondary" type="button" id="button-addon2">
                    <i class="fas fa-search" data-toggle="tooltip" data-placement="bottom" title=""
                      data-original-title="Files"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="list-group add-attendees">
              <input type="hidden" id="responsibleid">
              <span class="listusers"> </span>


            </div>
          </div>
        </div>
      </div>
    </div>


        <div class="modal custom-modal fade" id="addteampeople" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Edit Users</h4>
            <button type="button" class="btn-close teampeopleselectedUsers" data-bs-dismiss="modal" id="actionsclosePopupId"
              aria-label="Close"></button>
          </div>

          <div class="modal-body d-grid gap-3">
            <div class="attendees-search">
              <div>
                <div class="form-check cusom-check">
                  <input class="form-check-input" type="checkbox" value="" id="teamallusersaccess">
                  <label class="form-check-label" for="allusers">
                    All Users
                  </label>
                </div>
              </div>
              <div class="search">
                <div class="input-group input-group-sm">
                  <input type="text" class="form-control" placeholder="Recipient's username"
                    aria-label="Recipient's username" aria-describedby="button-addon2" id="searchteam">
                  <button class="btn btn-outline-secondary" type="button" id="button-addon2">
                    <i class="fas fa-search" data-toggle="tooltip" data-placement="bottom" title=""
                      data-original-title="Files"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="list-group add-attendees">
              <input type="hidden" id="responsibleid">
              <span class="teamlistusers"> </span>


            </div>
          </div>
        </div>
      </div>
    </div>


    	<div class="modal custom-modal fade" id="uploaded_files" tabindex="-1" role="dialog"
        aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
               
                <div class="modal-header">
                    <h4 data-i18n="File Upload">Attachments</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">
                            <div class="row">
                                <div class="attachment-upload">
                                    <div class="input-group mb-1"
                                        style="display: flex; align-items: stretch; width: 100%;">
                                        <input type="file" class="form-control modal-custom-input" id="attachementuploadfile"
                                            accept=".pdf,.ppt,.jpeg,.xlsx,.doc,.docx"
                                            style="flex: 1; border-top-right-radius: 0; border-bottom-right-radius: 0;">
                                        <button type="button" id="attachementupload"
                                            style="border: 1px solid #ced4da; background-color: #e9ecef; padding: 6px 12px; border-left: none; border-top-left-radius: 0; border-bottom-left-radius: 0;">
                                            Upload
                                        </button>
                                    </div>
                                    <div class="mb-3 form-text">Supported file type (jpeg, pdf, pptx, xlsx, docx)</div>
                                </div>
                            </div>

                            <input type="hidden" id="fileuploadtype">
                            <input type="hidden" id="fileuploadcount">
                            <div class="table-responsive">
                                <div class="table-responsive" id="listfileuploadTableData"></div>
                            </div>
                        </div>

                    </div>


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary" value="Save" data-bs-dismiss="modal">Save
                    </button>
                </div>
            </div>
        </div>
    </div>


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
    <script src="${contextroot}/js/notify.js"></script>
    <script src="js/initial.js"></script>

    <script src="${contextroot}/js/select2.min.js"></script>


    <link href="assets/css/flatpickr.min.css" rel="stylesheet">
    <script src="${contextroot}/js/flatpickr.js"></script>





    <script src="${contextroot}/js/chosen.jquery.min.js"></script>
    <script type="text/javascript" src="${contextroot}/js/notify.js"></script>





<script>
  let lastOpenedModal = null;

  
  document.getElementById('recommendation').addEventListener('show.bs.modal', function () {
    lastOpenedModal = this;
  });

  
  document.getElementById('addpeople').addEventListener('show.bs.modal', function () {
    if (lastOpenedModal) {
      bootstrap.Modal.getInstance(lastOpenedModal)?.hide();
    }
  });

  
  document.getElementById('addpeople').addEventListener('hidden.bs.modal', function () {
    if (lastOpenedModal && lastOpenedModal.id == "recommendation") {
      const reopenModal = new bootstrap.Modal(lastOpenedModal);
      reopenModal.show();
    }
  });


  //Actions
    document.getElementById('action').addEventListener('show.bs.modal', function () {
    lastOpenedModal = this;
  });

  
  document.getElementById('addpeopleactions').addEventListener('show.bs.modal', function () {
    if (lastOpenedModal) {
      bootstrap.Modal.getInstance(lastOpenedModal)?.hide();
    }
  });

  
  document.getElementById('addpeopleactions').addEventListener('hidden.bs.modal', function () {
    if (lastOpenedModal && lastOpenedModal.id == "action") {
      const reopenModal = new bootstrap.Modal(lastOpenedModal);
      reopenModal.show();
    }
  });
</script>

    <!-- New Design APi Integration -->
    <script>
       var initiativeId = ""
       var attachment	=	[];
       var allListUsersData = [];
       var actionsDataArray = [];
       var recommendationDataArray = [];
       var employeeArray = [];
       var multipleOwnerData = ""
       var userId  = "";
       var userDeptId = ""
      
      $(document).ready(function () {
         userId = $("#userPrincipal").val();
        console.log(userId, "userdId...");


  $.ajax({
    url: "/stratroom/userRole/" +userId,
    type: "GET",
    success: function (data, status) {
      console.log(data, "dataaaaaaauser");
      userDeptId = data.departmentList[0].id || ""

         if(userDeptId){
        $.ajax({
            url: "/stratroom/pageDeptList/"+userDeptId+"?pageType=initiative",
            async: false,
            success: function (initiativeList) {
              console.log(initiativeList, "initiativeList");
              var select = document.getElementById("Project_Initiative");

              select.innerHTML = '<option value="" disabled selected>Select Initiative</option>';


              for (var i = 0; i < initiativeList.length; i++) {
                var department = initiativeList[i];
                var option = '<option value="' + department.id + '">' + department.pageName + '</option>';
                select.innerHTML += option;
              }
            }
          });
        }
    }
  });
        
        $('.modal-custom-select').each(function () {
          let $this = $(this);
          $this.select2({
            width: "100%",
            dropdownParent: $this.closest('.modal')
          });
        });


        document.querySelectorAll('.date-range-picker').forEach(function (el) {
          const pickerId = el.getAttribute('id'); // Find the element's ID
          flatpickr('#' + pickerId, {
            mode: "range",
            dateFormat: "M j, Y",
            onClose: function (selectedDates, dateStr, instance) {
              if (selectedDates.length == 2) {
                const start = instance.formatDate(selectedDates[0], "M j, Y");
                const end = instance.formatDate(selectedDates[1], "M j, Y");
                el.value = start + " to " + end;
              }
            }
          });
        });




        //Project Planning List Date 
//Project Planning List Date 
function getProjectPlaningListDate() {
  let urlparams = new URL(document.location).searchParams;
  let pageNo = urlparams.get("pageId");
  let daterange2 = $("#datePeriod").val();

  // Store employee list globally for reuse
  let employeeMap = {};

  // First: fetch employee list (module access users)
  $.ajax({
    url: "/stratroom/organization/employeeList",
    type: "GET",
    success: function (data, status) {
      console.log(data, "moduleAccessUserList");
      employeeArray = data; 
  
      if (Array.isArray(data)) {
        data.forEach(user => {
          if (user.id) {
            employeeMap[user.id] = user;
          }
        });
      }

      // After employees are loaded → fetch project planning
      fetchProjectPlanningList(pageNo, daterange2, employeeMap);
    },
    error: function () {
      console.error("Failed to load employee list");
      // Still load projects (with fallback sponsor)
      fetchProjectPlanningList(pageNo, daterange2, employeeMap);
    }
  });
}



// Separate function for project planning call
function fetchProjectPlanningList(pageNo, daterange2, employeeMap) {
  $.ajax({
    url: "/stratroom/projectPlanningList?pageId=" + pageNo + "&dateRange=" + daterange2,
    type: "GET",
    success: function (projectPlanningList) {
      console.log(projectPlanningList, "projectPlanningList");
      const meetingListContainer = $(".meetingList");
      meetingListContainer.empty();

      if (!projectPlanningList || projectPlanningList.length == 0) {
        meetingListContainer.append('<p class="text-muted">No projects found.</p>');
        return;
      }

      projectPlanningList.forEach(function (item) {
        
        const planning = item.planningValue;

        console.log(planning, "planning");

        let priorityClass = "status-bg-yellow";
        if (planning.priority == "Low") priorityClass = "status-bg-green";
        else if (planning.priority == "Medium") priorityClass = "label-bg-orange";
        else if (planning.priority == "High") priorityClass = "status-bg-red";

        let statusClass = "label-bg-blue";
        if (planning.status == "In Progress" || planning.status == "in_progress") statusClass = "label-bg-orange";
        else if (planning.status == "Completed") statusClass = "label-bg-blue";
        else if (planning.status == "not_started" || planning.status == "Not_started") statusClass = "label-bg-red";
        else if (planning.status == "Planned" || planning.status == "planned") statusClass = "label-bg-blue";

        const startDateFormatted = formatDate(planning.fromdate);
        const endDateFormatted = formatDate(planning.enddate);

        const category = planning.category;
        const categoryClass = getCategoryClass(category);

        const escapedProjectName = escapeHtml(planning.projectName);
        const escapedDescription = escapeHtml(planning.projectDescription);
        const displayStatus = capitalize(planning.status);
        const displayPriority = capitalize(planning.priority);
        const budget = planning.budget;

        // Sponsor (lookup employee by ID)
        let sponsorHtml = "";
        let ownerId = planning.projectOwner; 
        let ownerUser = employeeMap[ownerId];
        if (ownerUser) {
          let username = escapeHtml(ownerUser.name || "Unknown");
          let imgSrc = "";
          let dataNameAttr = "";

          if (ownerUser.image && ownerUser.image !== "") {
            imgSrc = ownerUser.image;
          } else {
            imgSrc = createSvgDataUrl(username);
            dataNameAttr = 'data-name="' + username + '" ';
          }

          sponsorHtml =
            '<li class="avatar avatar-xs pull-up" title="' + username + '">' +
            '<img class="rounded-circle swotuserimage" ' + dataNameAttr +
            'src="' + imgSrc + '" alt="' + username + '" width="24" height="24">' +
            '</li>';
        } else {
          sponsorHtml = '<li><span class="badge bg-secondary">Unknown</span></li>';
        }


       
       




        // Build card HTML
        var cardHtml = '<div class="card meeting-card">';
        cardHtml += '<div class="card-header flex-wrap flex-sm-nowrap">';
        cardHtml += '<div class="c-header-left">';
        cardHtml += '<span class="meeting-label badge ' + categoryClass + ' projectCategory">' + category + '</span>';
        cardHtml += '</div>';
        cardHtml += '<div class="meeting-action">';
        cardHtml += '<ul class="list-unstyled action-list mb-0">';
        cardHtml += '<li><a href="#notes-modal" data-bs-target="#recommendation" data-bs-toggle="modal" onclick="handlerecommendationevent(' + item.id + ',\'recommendation\')"><span class="icon" data-bs-toggle="tooltip" data-bs-title="Notes"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="notebook-pen" style="width: 12px; height: 12px;" class="lucide lucide-notebook-pen"><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"></path><path d="M2 6h4"></path><path d="M2 10h4"></path><path d="M2 14h4"></path><path d="M2 18h4"></path><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"></path></svg></span></a></li>';
        cardHtml += '<li><a href="#action-modal" data-bs-target="#action" data-bs-toggle="modal" onclick="handleactionevent(' + item.id + ',\'action\')"><span class="icon" data-bs-toggle="tooltip" data-bs-title="Action"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="settings" style="width: 12px; height: 12px;" class="lucide lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg></span></a></li>';
        cardHtml += '<li><a href="#" data-bs-target="#uploaded_files" data-bs-toggle="modal"><span class="icon" data-bs-toggle="tooltip" data-bs-title="Attachment" onclick="handleAttchmentevent(' + item.initiativeId + ',\'action\')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="paperclip" style="width: 12px; height: 12px;" class="lucide lucide-paperclip"><path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"></path></svg></span></a></li>';
              cardHtml += '<li class="dropdown">';
                cardHtml += '<a class="btn btn-link p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false" contenteditable="false" style="cursor: pointer;">';
                cardHtml += '<span class="icon">';
                cardHtml += '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis-vertical" style="width: 12px; height: 12px;" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>';
                cardHtml += '</span>';
                cardHtml += '</a>';
                cardHtml += '<ul class="dropdown-menu dropdown-menu-end border-0 shadow">';
                cardHtml += '<li>';
                cardHtml += '<a class="dropdown-item EditProject" href="#project-planning-add-modal" data-bs-toggle="modal" data-project-id="' + item.id + '" contenteditable="false" style="cursor: pointer;">Edit</a>';
                cardHtml += '</li>';
                cardHtml += '<li>';
                cardHtml += '<a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal" data-project-id="' + item.id + '" contenteditable="false" style="cursor: pointer;">Delete</a>';
                cardHtml += '</li>';
                cardHtml += '</ul>';
                cardHtml += '</li>';        
                cardHtml += '</ul></li></ul></div></div>';

        cardHtml += '<div class="card-body meeting-details d-flex flex-column">';
        cardHtml += '<div class="form-group"><label class="form-label">Title</label><p class="form-control-plaintext line-clamp-2">' + escapedProjectName + '</p></div>';
        cardHtml += '<div class="form-group"><label class="form-label">Description</label><p class="form-control-plaintext line-clamp-2">' + escapedDescription + '</p></div>';
        cardHtml += '<div class="d-flex justify-content-between">';
        cardHtml += '<div class="form-group"><label class="form-label">Status</label><span class="badge ' + statusClass + ' rounded-pill">' + displayStatus + '</span></div>';
        cardHtml += '<div class="form-group"><label class="form-label">Budget</label><p class="form-control-plaintext">' + budget + '</p></div>';
        cardHtml += '<div class="form-group text-end"><label class="form-label">Priority</label><span class="badge ' + priorityClass + ' rounded-pill">' + displayPriority + '</span></div>';
        cardHtml += '</div>';

        cardHtml += '<div class="d-flex justify-content-between">';
        cardHtml += '<div class="form-group"><label class="form-label">Planned Start Date</label><p class="form-control-plaintext">' + startDateFormatted + '</p></div>';
        cardHtml += '<div class="form-group text-end"><label class="form-label">End Date</label><p class="form-control-plaintext">' + endDateFormatted + '</p></div>';
        cardHtml += '</div>';

       
        cardHtml += '<div class="d-flex justify-content-between">';
        cardHtml += '<div class="form-group"><label class="form-label">Sponsor</label><ul class="list-unstyled d-inline-flex align-items-center avatar-group mb-0">' + sponsorHtml + '</ul></div>';
        cardHtml += '      <ul class="list-unstyled d-inline-flex align-items-center avatar-group mb-0 team-cell">';
          if (planning.multipleOwners) {
            var ownerIds = planning.multipleOwners.split(",");
            ownerIds.forEach(function(id) {
              
                var imgSrc = getUserImageById(id); 
                var userName = getUserNameById(id); 
                cardHtml += '<li class="avatar avatar-xs pull-up">';
                cardHtml += '<img src="' + imgSrc + '" alt="' + userName + '" title="' + userName + '" class="rounded-circle" />';
                cardHtml += '</li>';
            });
          }
        
            cardHtml += '        <li class="avatar avatar-xs pull-up" data-bs-target="#addteampeople" data-bs-toggle="modal" onclick="teamAddPeople(' + item.id + ', '+planning.multipleOwners+')">';
            cardHtml += '          <span class="avatar-initial rounded-circle" title="Add Responsible">+</span>';
            cardHtml += '        </li>';
            cardHtml += '      </ul>';

        cardHtml += '</div>';

        cardHtml += '</div></div>';

        meetingListContainer.append(cardHtml);
      });

      $('[data-bs-toggle="tooltip"]').tooltip();
    },
    error: function () {
      $(".meetingList").html('<p class="text-danger">Failed to load project data.</p>');
    }
  });
}




// function subinitiativePorfileContent(usersimg, resultId) {
//   console.log(usersimg, resultId, "imageIddata");

//   var subinitiativeUser = "";
//   var returnresult = {};
//   var functionParams = resultId + "," + '"edit"';
//   var functionName = "handleMultioownersuserevent";

//   // Extract user IDs
//   var userseslectedData = [];
//   $.each(usersimg, function (index, users) {
//     if (users.id != undefined && users.id != 0) {
//       userseslectedData.push(users.id);
//     }
//   });

//   // Fallback to parent
//   if (userseslectedData.length == 0 && typeof topparentswotDetails != 'undefined') {
//     userseslectedData.push(topparentswotDetails.id);
//   }

//   // Hidden input
//   returnresult["userownerlist_data"] =
//     '<input type="hidden" value="' +
//     userseslectedData.join(",") +
//     '" id="activities_selected_user_' +
//     resultId +
//     '">';

//   // Helper: Generate initials
//   function getInitials(name) {
//     var n = (name || "U").trim();
//     if (n.length == 0) return "U";
//     if (n.indexOf(" ") != -1) {
//       var parts = n.split(" ");
//       var initials = "";
//       for (var i = 0; i < 2 && i < parts.length; i++) {
//         initials += parts[i][0];
//       }
//       return initials.toUpperCase().substring(0, 2);
//     }
//     return n.substring(0, 2).toUpperCase();
//   }

//   // Helper: Generate color from string (deterministic)
//   function getColor(name) {
//     var colors = [
//       "rgb(236, 135, 191)", // pink
//       "rgb(135, 166, 236)", // blue
//       "rgb(135, 236, 213)", // green
//       "rgb(236, 204, 135)", // yellow
//       "rgb(236, 135, 135)", // red
//       "rgb(166, 135, 236)", // purple
//       "rgb(236, 135, 170)",
//       "rgb(135, 236, 135)"
//     ];
//     var hash = 0;
//     for (var i = 0; i < name.length; i++) {
//       hash = name.charCodeAt(i) + ((hash << 5) - hash);
//     }
//     return colors[Math.abs(hash) % colors.length];
//   }

//   // Helper: Create SVG Data URL
//   function createSvgDataUrl(name) {
//     var initials = getInitials(name);
//     var bgColor = getColor(name);
//     var width = 30;
//     var height = 30;

//     var svg = 
//       '<svg xmlns="http://www.w3.org/2000/svg" pointer-events="none" width="' + width + '" height="' + height + '" style="background-color: ' + bgColor + '; width: ' + width + 'px; height: ' + height + 'px; border-radius: 0px;">' +
//         '<text text-anchor="middle" y="50%" x="50%" dy="0.35em" pointer-events="auto" fill="#ffffff" font-family="HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande, sans-serif" style="font-weight: 400; font-size: 14px;">' +
//           initials +
//         '</text>' +
//       '</svg>';

//     return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
//   }

//   // Render users
//   if (usersimg && usersimg.length > 0) {
//     var badgeAdded = false;

//     $.each(usersimg, function (index, user) {
//       if (badgeAdded && index >= 2) return;

//       var username = (user.name || "User").trim();
//       if (!username || username == " ") username = "User";

//       var imgSrc = "";
//       var dataNameAttr = 'data-name="' + username + '" ';

//       if (user.image) {
//         imgSrc = user.image;
//         dataNameAttr = ""; // No need for data-name if real image
//       } else {
//         imgSrc = createSvgDataUrl(username);
//       }

//       var imgTag = 
//         '<img class="rounded-circle rec_res_multiuserimage" ' + 
//         dataNameAttr + 
//         'src="' + imgSrc + '" alt="' + username + '" width="50">';

//       if (usersimg.length >= 3 && index >= 2) {
//         var extraCount = usersimg.length - 2;
//         var plusSvg = createSvgDataUrl("+" + extraCount);
//         subinitiativeUser += 
//           '<li class="avatar avatar-xs pull-up" onclick="handleMultioownersuserevent(' + resultId + ', &quot;edit&quot;)">' +
//             '<img class="rounded-circle rec_res_multiuserimage" data-name="+'+ extraCount +'" src="' + plusSvg + '" alt="+" width="50">' +
//           '</li>';
//         badgeAdded = true;
//         return false;
//       }

//       subinitiativeUser += 
//         '<li class="avatar avatar-xs pull-up" onclick="handleMultioownersuserevent(' + resultId + ', &quot;edit&quot;)">' +
//           imgTag +
//         '</li>';
//     });

//     // Add "+" button if less than 3 users
//     if (!badgeAdded && usersimg.length < 3) {
//       var plusSvg = createSvgDataUrl("+");
//       subinitiativeUser += 
//         '<li class="avatar avatar-xs pull-up" onclick="handleMultioownersuserevent(' + resultId + ', &quot;edit&quot;)">' +
//           '<img class="rounded-circle rec_res_multiuserimage" data-name="+" src="' + plusSvg + '" alt="+" width="50">' +
//         '</li>';
//     }
//   } else {
   
//     var user = topparentswotDetails || { name: "User", id: 0 };
//     var username = (user.name || "User").trim();
//     if (!username || username == " ") username = "User";

//     var imgSrc = user.image ? user.image : createSvgDataUrl(username);
//     var dataNameAttr = user.image ? "" : 'data-name="' + username + '"';

//     var plusSvg = createSvgDataUrl("+");
//     subinitiativeUser += 
//       '<li class="avatar avatar-xs pull-up" onclick="handleMultioownersuserevent(' + resultId + ', &quot;edit&quot;)">' +
//         '<img class="rounded-circle rec_res_multiuserimage" ' + dataNameAttr + ' src="' + imgSrc + '" alt="' + username + '" width="50">' +
//       '</li>' +
//       '<li class="avatar avatar-xs pull-up" onclick="handleMultioownersuserevent(' + resultId + ', &quot;edit&quot;)">' +
//         '<img class="rounded-circle rec_res_multiuserimage" data-name="+" src="' + plusSvg + '" alt="+" width="50">' +
//       '</li>';
//   }

//   returnresult["userownerlist"] = subinitiativeUser;
//   return returnresult;
// }

        // Helper: Format date from "M/D/YYYY" to "MMM D, YYYY"
        function formatDate(dateStr) {
          if (!dateStr) return "N/A";
          var parts = dateStr.split('/');
          var month = parts[0];
          var day = parts[1];
          var year = parts[2];
          var date = new Date(year, month - 1, day);
          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }

        // Helper: Escape HTML to prevent XSS
        function escapeHtml(text) {
          var div = document.createElement('div');
          div.textContent = text;
          return div.innerHTML;
        }

        // Helper: Capitalize first letter
        function capitalize(str) {
          if (!str) return str;
          return str.charAt(0).toUpperCase() + str.slice(1);
        }

        // Helper: Map category to color class
        function getCategoryClass(category) {
          var map = {
            "Strategy & Leadership": "status-bg-pink",
            "Operations": "status-bg-blue",
            "Finance": "status-bg-yellow",
            "Information Technology (IT)": "status-bg-red",
            "Marketing": "status-bg-orange",
            "IT" : "status-bg-green",
            "Sales": "status-bg-blue",
            "Customer": "status-bg-yellow",
            "Human Resources (HR)": "status-bg-blue",
            "Risk Management": "status-bg-yellow",
            "Compliance": "status-bg-pink",
            "Legal": "status-bg-blue",
            "Procurement & Supply Chain": "status-bg-blue",
            "Product Development & Innovation": "status-bg-orange",
            "Sustainability & ESG": "status-bg-green",
            "Strategy & Leadership": "status-bg-green"

          };
          return map[category] || "status-bg-secondary";
        }

        //Project Planning List Date 


        //Employee List Date
        function getEmployeeListDate() {
          $.ajax({
            url: "/stratroom/organization/employeeList",
            async: false,
            success: function (employeeList) {
              var select = document.getElementById("Project_owner");
              var select1 = document.getElementById("Project_team");

              select.innerHTML = '<option value="" disabled selected>Select Sponsor</option>';
              select1.innerHTML = '<option value="" disabled selected>Select Team</option>';


              for (var i = 0; i < employeeList.length; i++) {
                var employee = employeeList[i];
                var option = '<option value="' + employee.id + '">' + employee.name + '</option>';
                select.innerHTML += option;
                select1.innerHTML += option;
              }
            }
          });
        }
        //Employee List Date

        //Department List Date
        function getDepartmentListDate() {
          $.ajax({
            url: "/stratroom/allDepartmentList",
            async: false,
            success: function (departmentList) {
              var select = document.getElementById("Project_Department");

              select.innerHTML = '<option value="" disabled selected>Select Department</option>';


              for (var i = 0; i < departmentList.length; i++) {
                var department = departmentList[i];
                var option = '<option value="' + department.id + '">' + department.name + '</option>';
                select.innerHTML += option;
              }
            }
          });
        }
        //Department List Date

 


        //Save Project Planning

        //Save Project Planning


        getEmployeeListDate();
        getDepartmentListDate();
        getProjectPlaningListDate();
        // getInitiativeListDate();

      });


      function handleProjectPlaningSave() {
        let urlparams = (new URL(document.location)).searchParams;
        let pageNo = urlparams.get("pageId");
        var projectName = $("#Project_name").val();
        var projectDesc = $("#Project_description").val();
        var projectDept = $("#Project_Department").val();
        var projectOwner = $("#Project_owner").val();
        var projectTeam = $("#Project_team").val();
        var projectStartDate = $("#Project_start_end_date").val();
        var selectedInitiativeValue = $("#Project_Initiative").val()
        // var projectEndDate = $("#Project_end_date").val();
        var pagenumber = $("#pagenumber").val();

        var formattedEndDate = "";
        var formattedStartDate = "";

        var parts = projectStartDate.split(" to ");
        if (parts.length == 2) {
          var startDateStr = parts[0];
          var endDateStr = parts[1];

          // Parse start date
          var startParts = startDateStr.split(" ");
          var startMonthName = startParts[0]; // "Sep"
          var startDay = startParts[1].replace(",", ""); // "1"
          var startYear = startParts[2]; // "2025"

          // Parse end date
          var endParts = endDateStr.split(" ");
          var endMonthName = endParts[0]; // "Sep"
          var endDay = endParts[1].replace(",", ""); // "23"
          var endYear = endParts[2]; // "2025"

          // Map month names to numbers (2-digit)
          var monthMap = {
            "Jan": "1",
            "Feb": "2",
            "Mar": "3",
            "Apr": "4",
            "May": "5",
            "Jun": "6",
            "Jul": "7",
            "Aug": "8",
            "Sep": "9",
            "Oct": "10",
            "Nov": "11",
            "Dec": "12"
          };

          var startMonth = monthMap[startMonthName];
          var endMonth = monthMap[endMonthName];


          formattedStartDate = startMonth + "/" + startDay + "/" + startYear;
          formattedEndDate = endMonth + "/" + endDay + "/" + endYear;
     


          console.log("Start Date:", formattedStartDate);
          console.log("End Date:", formattedEndDate);
        }

        if (projectName == "" || projectDesc == "" || projectDept == "" || projectOwner == "" || projectTeam == "" || projectStartDate == "" || selectedInitiativeValue == "") {
          $.notify("Please fill all the fields", {
            style: 'success',
            className: 'graynotify'
          });
          return false;
        }

       
        const payload = {
          id: $("#Project_Id").val() || "",
          owner: projectOwner,
          pageId: pageNo || "",
          departmentId: projectDept,
          // startDate: formattedStartDate,
          // endDate: formattedEndDate,
          departmentId: projectDept,
         initiativePageId: parseFloat($("#Project_Initiative").val()),
          planningValue: {
            projectName: projectName,
            projectDescription: projectDesc,
            projectTeam: projectTeam,
            multipleOwners: projectTeam, 
            projectOwner: projectOwner,
            fromdate: formattedStartDate,
            enddate: formattedEndDate,
            departmentId: projectDept,
            initiativePageId: $("#Project_Initiative").val(),
            category: $("#categoryValue").val(),
            budget: $("#budget").val(),
            status: $("#status").val(),
            priority: $("input[name='status']:checked").val() || "",
            projectStartEndDate: $("#Project_start_end_date").val() || "",
            recommendation: [],
            actions: [],
            attachment: [],
          }
        }

        console.log(payload, "payload");

        $.ajax({
          url: "/stratroom/projectPlanning",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(payload),
          success: function (data, status) {
            $.notify("Project Planning saved successfully", {
              style: 'success',
              className: 'graynotify'
            });
            $("#Project_name").val('');
            $("#Project_Description").val('');
            $("#Project_Department").val('');
            $("#Project_owner").val('');
            $("#Project_team").val('');
            $("#Project_start_date").val('');
            $("#Project_end_date").val('');

            window.location.reload();
          },
          error: function (xhr, status, error) {
            $.notify("Error saving Project Planning", {
              style: 'success',
              className: 'graynotify'
            });
          }
        });
      }

      // Save 

      // Delete Project Planning
      $(document).on('click', '.dropdown-item[href="#delete-modal"]', function () {
        var projectId = $(this).data('project-id');
        console.log(projectId, "projectId");

        $.ajax({
          url: "/stratroom/projectPlanning/" + projectId,
          type: "DELETE",
          contentType: "application/json",
          success: function (data, status) {
            location.reload(true);
          },
        });

      });

      // Delete Project Planning


      //Edit Project Planning
      $(document).on('click', '.EditProject', function () {
        var projectId = $(this).data('project-id');
        console.log(projectId, "projectId");
        $(".headerText").text("Edit Project Planning");
        $(".buttonText").text("Update");

        $.ajax({
          url: "/stratroom/projectPlanning/" + projectId,
          type: "GET",
          contentType: "application/json",
          success: function (data, status) {
            console.log(data, "getdata");

            // Ensure select options exist before setting value
            setSelectValue("#Project_owner", data.planningValue.projectOwner, data.planningValue.ownerName);
            setSelectValue("#Project_Initiative", data.planningValue.initiativePageId, data.planningValue.initiativePageId);
            setSelectValue("#Project_team", data.planningValue.projectTeam, "Team " + data.planningValue.projectTeam);
            setSelectValue("#Project_Department", data.planningValue.departmentId, "Dept " + data.planningValue.departmentId);

            // Simple inputs
            $("#Project_name").val(data.planningValue.projectName);
            $("#Project_description").val(data.planningValue.projectDescription);
            $("#budget").val(data.planningValue.budget);
            $("#status").val(data.planningValue.status).trigger('change');
            $("input[name='status'][value='" + data.planningValue.priority + "']").prop('checked', true);
            $("#Project_start_end_date").val(data.planningValue.projectStartEndDate);

            $("#Project_Id").val(data.id);
            
          
             $("#categoryValue").val(data.planningValue.category).trigger('change');


          },
        });
      });


$(document).on('click', '.openAddModal', function () {
  console.log("function called");
  
  $(".buttonText").text("Save");
  $(".headerText").text("Create Project Planning");

  // Reset text/textarea fields
  $('#Project_Id').val('');
  $("#Project_name").val('');
  $("#Project_description").val('');
  $("#budget").val('');
  $("#Project_start_end_date").val('');
  
  // Reset radio buttons
  $("input[name='status']").prop('checked', false);

  // Reset select dropdowns
  $("#Project_owner").val('').trigger("change");       
  $("#Project_team").val('').trigger("change");        
  $("#Project_Department").val('').trigger("change");  
  $("#categoryValue").val('').trigger("change");       
  $("#status").val('').trigger("change");              

 
});


      // helper function to insert option if not exists
      function setSelectValue(selector, value, text) {
        let $select = $(selector);
        if ($select.find("option[value='" + value + "']").length == 0) {
          $select.append(new Option(text, value, true, true));
        }
        $select.val(value).trigger('change');
      }

      //Edit Project Planning


// Recommendation Pop Up
function recommendationPopSuccessCallback(planList, typerequest) {
  console.log(planList, "planList");
  $("#tableBody").empty();

  var recommendations = planList.planningValue.recommendation || [];

if (recommendations.length > 0) {
    for (var i = 0; i < recommendations.length; i++) {
        var noteText = recommendations[i].name || "";
        var owners = recommendations[i].multipleOwners || ""; 
        console.log(owners, "owners");
        addRecommendationRow(true, false, noteText, owners);
    }
} else {
    addRecommendationRow(true, true, "", "");
}


  updateLastRow();
}


function actionPopSuccessCallback(planList, typerequest) {
  console.log(planList, "planList");
  $("#actionBodyData").empty();

  var actions = planList.planningValue.actions || [];

if (actions.length > 0) {
    for (var i = 0; i < actions.length; i++) {
        var noteText = actions[i].name || "";
        var owners = actions[i].multipleOwners || ""; 
        var byDate = actions[i].byDate || "";
        var status = actions[i].status || "";
        console.log(owners, "owners");
        addActionRow(true, false, noteText, owners, byDate, status);
    }
} else {
    addActionRow(true, true, "", "");
}


  updateActionLastRow();
}

let recommendationRowCounter = 0;


function addRecommendationRow(withAddBtn, isEmptyRecommendation, noteText, multipleOwners) {
  console.log(multipleOwners, "multipleOwners");
  noteText = noteText || "";
  multipleOwners = multipleOwners || "";

  recommendationRowCounter++;
  const rowIndex = recommendationRowCounter;

  var rowHtml = '';
  rowHtml += '<tr data-row-index="' + rowIndex + '" data-owners="' + multipleOwners + '">';
  rowHtml += '  <td>';
  rowHtml += '    <div class="form-group">';
  rowHtml += '      <textarea class="form-control" placeholder="Notes" rows="3">' + escapeHtml(noteText) + '</textarea>';
  rowHtml += '    </div>';
  rowHtml += '  </td>';
  rowHtml += '  <td class="align-middle">';
  rowHtml += '    <div class="d-flex align-items-start justify-content-center">';
  rowHtml += '      <ul class="list-unstyled d-inline-flex align-items-center avatar-group mb-0 responsible-cell">';

  // If multipleOwners has IDs, show images
  if (multipleOwners) {
    var ownerIds = multipleOwners.split(",");
    ownerIds.forEach(function(id) {
       
        var imgSrc = getUserImageById(id); 
        var userName = getUserNameById(id); 
        rowHtml += '<li class="avatar avatar-xs pull-up">';
        rowHtml += '<img src="' + imgSrc + '" alt="' + userName + '" title="' + userName + '" class="rounded-circle" />';
        rowHtml += '</li>';
    });
  }

  // Always keep the + badge
  rowHtml += '        <li class="avatar avatar-xs pull-up" data-bs-target="#addpeople" data-bs-toggle="modal" onclick="recommendationaddpeople(' + rowIndex + ')">';
  rowHtml += '          <span class="avatar-initial rounded-circle" title="Add Responsible">+</span>';
  rowHtml += '        </li>';

  rowHtml += '      </ul>';
  rowHtml += '    </div>';
  rowHtml += '  </td>';
  rowHtml += '  <td class="text-end align-middle">';
  rowHtml += '    <div class="table-actions justify-content-center">';

  if (withAddBtn) {
    rowHtml += '      <a class="btn btn-sm btn-icon" onclick="addRecommendationRow(true, true); updateLastRow();">';
    rowHtml += '        <span class="icon" data-bs-toggle="tooltip" title="Add">';
    rowHtml += '          <i class="fas fa-plus title_edit_icon"></i>';
    rowHtml += '        </span>';
    rowHtml += '      </a>';
  }

  rowHtml += '      <a class="btn btn-sm btn-icon" onclick="deleteRecommendationRow(this); updateLastRow();">';
  rowHtml += '        <span class="icon" data-bs-toggle="tooltip" title="Delete">';
  rowHtml += '          <img src="/stratroom/images/delete-i.svg" width="12" height="12">';
  rowHtml += '        </span>';
  rowHtml += '      </a>';

  rowHtml += '    </div>';
  rowHtml += '  </td>';
  rowHtml += '</tr>';

  $("#tableBody").append(rowHtml);
}


let actionRowCounter = 0;
function addActionRow(withAddBtn, isEmptyRecommendation, noteText, multipleOwners, byDate, status) {
  console.log(multipleOwners, byDate, status, "multipleOwners");
  noteText = noteText || "";
  multipleOwners = multipleOwners || "";
  byDate = byDate || "";
  status = status || "";

  actionRowCounter++;
  const rowIndex = actionRowCounter;

  var rowHtml = '';
  rowHtml += '<tr data-row-index="' + rowIndex + '" data-owners="' + multipleOwners + '">';
  
  // Notes
  rowHtml += '  <td>';
  rowHtml += '    <div class="form-group">';
  rowHtml += '      <textarea class="form-control" placeholder="Notes" rows="3">' + escapeHtml(noteText) + '</textarea>';
  rowHtml += '    </div>';
  rowHtml += '  </td>';

  // By Date (prefilled if value exists)
  // rowHtml += '  <td>';
  // rowHtml += '    <div class="form-group">';
  // rowHtml += '      <input type="date" class="form-control" value="' + byDate + '">';
  // rowHtml += '    </div>';
  // rowHtml += '  </td>';

  // // Responsible
  // rowHtml += '  <td class="align-middle">';
  // rowHtml += '    <div class="d-flex align-items-start justify-content-center">';
  // rowHtml += '      <ul class="list-unstyled d-inline-flex align-items-center avatar-group mb-0 responsible-cell">';

  // if (multipleOwners) {
  //   var ownerIds = String(multipleOwners).split(",");
  //   ownerIds.forEach(function (id) {
  //     var imgSrc = getUserImageById(id.trim());
  //     var userName = getUserNameById(id.trim());
  //     rowHtml += '<li class="avatar avatar-xs pull-up">';
  //     rowHtml += '<img src="' + imgSrc + '" alt="' + userName + '" title="' + userName + '" class="rounded-circle" />';
  //     rowHtml += '</li>';
  //   });
  // }

  // // Always keep the + badge
  // rowHtml += '        <li class="avatar avatar-xs pull-up" data-bs-target="#addpeopleactions" data-bs-toggle="modal" onclick="actionaddpeople(' + rowIndex + ')">';
  // rowHtml += '          <span class="avatar-initial rounded-circle" title="Add Responsible">+</span>';
  // rowHtml += '        </li>';

  // rowHtml += '      </ul>';
  // rowHtml += '    </div>';
  // rowHtml += '  </td>';

  // // Status (preselect if value exists)
  // rowHtml += '  <td class="text-center">';
  // rowHtml += '     <select name="action-status" class="form-select select-dropdown-action rowstatus" data-placeholder="Select Status">';
  // rowHtml += '      <option value="" ' + (status == "" ? "selected" : "") + ' disabled>Select Status</option>';
  // rowHtml += '      <option value="pending" ' + (status == "pending" ? "selected" : "") + '>Pending</option>';
  // rowHtml += '      <option value="completed" ' + (status == "completed" ? "selected" : "") + '>Completed</option>';
  // rowHtml += '    </select>';
  // rowHtml += '  </td>';

  // Action buttons
  rowHtml += '  <td class="text-end align-middle">';
  rowHtml += '    <div class="table-actions justify-content-center">';

  if (withAddBtn) {
    rowHtml += '      <a class="btn btn-sm btn-icon" onclick="addActionRow(true, true); updateActionLastRow();">';
    rowHtml += '        <span class="icon" data-bs-toggle="tooltip" title="Add">';
    rowHtml += '          <i class="fas fa-plus title_edit_icon"></i>';
    rowHtml += '        </span>';
    rowHtml += '      </a>';
  }

  rowHtml += '      <a class="btn btn-sm btn-icon" onclick="deleteActionRow(this); updateActionLastRow();">';
  rowHtml += '        <span class="icon" data-bs-toggle="tooltip" title="Delete">';
  rowHtml += '          <img src="/stratroom/images/delete-i.svg" width="12" height="12">';
  rowHtml += '        </span>';
  rowHtml += '      </a>';

  rowHtml += '    </div>';
  rowHtml += '  </td>';
  rowHtml += '</tr>';

  $("#actionBodyData").append(rowHtml);
}



// Utility to escape HTML to avoid XSS
function escapeHtml(text) {
  return text.replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
}


    function deleteRecommendationRow(el) {
        $(el).closest("tr").remove();
        updateLastRow();
    }

    function deleteActionRow(el) {
        $(el).closest("tr").remove();
        updateActionLastRow();
    }


    function updateLastRow() {
      $("#tableBody tr").each(function (index, row) {
        var addBtn = $(row).find(".fa-plus").closest("a");
        if (index == $("#tableBody tr").length - 1) {
          if (addBtn.length == 0) {
            $(row).find(".table-actions").prepend(
              '<a class="btn btn-sm btn-icon" onclick="addRecommendationRow(true, true); updateLastRow();">' +
              '<span class="icon" data-bs-toggle="tooltip" title="Add">' +
              '<i class="fas fa-plus title_edit_icon"></i>' +
              '</span></a>'
            );
          }
        } else {
          addBtn.remove(); 
        }
      });
    }


    function updateActionLastRow() {
      $("#actionBodyData tr").each(function (index, row) {
        var addBtn = $(row).find(".fa-plus").closest("a");
        if (index == $("#actionBodyData tr").length - 1) {
          if (addBtn.length == 0) {
            // add + if missing
            $(row).find(".table-actions").prepend(
              '<a class="btn btn-sm btn-icon" onclick="addActionRow(true, true); updateActionLastRow();">' +
              '<span class="icon" data-bs-toggle="tooltip" title="Add">' +
              '<i class="fas fa-plus title_edit_icon"></i>' +
              '</span></a>'
            );
          }
        } else {
          addBtn.remove(); // remove + from non-last rows
        }
      });
    }



      function handlerecommendationevent(id, type, action) {
        $("#tableBody").empty();
        $("#recommendationtype").val("create");
        $("#recommendationcount").val(0);
        $('[data-toggle="tooltip"]').tooltip("hide");
        $('[rel="tooltip"]').tooltip("hide");
        $.ajax({
          url: "/stratroom/projectPlanning/" + id,
          success: function (data) {
            console.log(data, "dataaaaa");
            // Ensure select options exist before setting value
            setSelectValue("#Project_owner", data.planningValue.projectOwner, data.planningValue.ownerName);
            setSelectValue("#Project_team", data.planningValue.projectTeam, "Team " + data.planningValue.projectTeam);
            setSelectValue("#Project_Initiative", data.planningValue.initiativePageId, data.planningValue.initiativePageId);
            setSelectValue("#Project_Department", data.planningValue.departmentId, "Dept " + data.planningValue.departmentId);

            // Simple inputs
            $("#Project_name").val(data.planningValue.projectName);
            $("#Project_description").val(data.planningValue.projectDescription);
            $("#budget").val(data.planningValue.budget);
            $("#status").val(data.planningValue.status).trigger('change');
            $("#categoryValue").val(data.planningValue.category).trigger('change');
            $("input[name='status'][value='" + data.planningValue.priority + "']").prop('checked', true);
            $("#Project_start_end_date").val(data.planningValue.projectStartEndDate);
            multipleOwnerData = data.planningValue.multipleOwners || "";

            $("#Project_Id").val(data.id);
            actionsDataArray = data.planningValue.actions || [];
           
            recommendationPopSuccessCallback(data, id, type);
          },
          error: readErrorMsg,
        });
      }


      function handleactionevent(id, type, action) {
         $("#actionBodyData").empty();
        $("#recommendationtype").val("create");
        $("#recommendationcount").val(0);
        $('[data-toggle="tooltip"]').tooltip("hide");
        $('[rel="tooltip"]').tooltip("hide");
        $.ajax({
          url: "/stratroom/projectPlanning/" + id,
          success: function (data) {

            // Ensure select options exist before setting value
            setSelectValue("#Project_Initiative", data.planningValue.initiativePageId, data.planningValue.initiativePageId);
            setSelectValue("#Project_owner", data.planningValue.projectOwner, data.planningValue.ownerName);
            setSelectValue("#Project_team", data.planningValue.projectTeam, "Team " + data.planningValue.projectTeam);
            setSelectValue("#Project_Department", data.planningValue.departmentId, "Dept " + data.planningValue.departmentId);

            // Simple inputs
            $("#Project_name").val(data.planningValue.projectName);
            $("#Project_description").val(data.planningValue.projectDescription);
            $("#budget").val(data.planningValue.budget);
            $("#status").val(data.planningValue.status).trigger('change');
            $("#categoryValue").val(data.planningValue.category).trigger('change');
            $("input[name='status'][value='" + data.planningValue.priority + "']").prop('checked', true);
            $("#Project_start_end_date").val(data.planningValue.projectStartEndDate);
            multipleOwnerData = data.planningValue.multipleOwners || "";
            $("#Project_Id").val(data.id);
            recommendationDataArray = data.planningValue.recommendation || [];
           
            actionPopSuccessCallback(data, id, type);
          },
          error: readErrorMsg,
        });
      }


      //Recommendation Save
  function recommendationsubmit() {
  let urlparams = (new URL(document.location)).searchParams;
  let pageNo = urlparams.get("pageId");

  var projectName = $("#Project_name").val();
  var projectDesc = $("#Project_description").val();
  var projectDept = $("#Project_Department").val();
  var projectOwner = $("#Project_owner").val();
  var projectTeam = $("#Project_team").val();
  var projectStartDate = $("#Project_start_end_date").val();
  var pagenumber = $("#pagenumber").val();

  var formattedEndDate = "";
  var formattedStartDate = "";

  // --- Date parsing ---
  var parts = projectStartDate.split(" to ");
  if (parts.length == 2) {
    var startDateStr = parts[0];
    var endDateStr = parts[1];

    var startParts = startDateStr.split(" ");
    var endParts = endDateStr.split(" ");

    var monthMap = {
      "Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4",
      "May": "5", "Jun": "6", "Jul": "7", "Aug": "8",
      "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12"
    };

    formattedStartDate = monthMap[startParts[0]] + "/" + startParts[1].replace(",", "") + "/" + startParts[2];
    formattedEndDate   = monthMap[endParts[0]] + "/" + endParts[1].replace(",", "") + "/" + endParts[2];
  }

  if (projectName == "" || projectDesc == "" || projectDept == "" || projectOwner == "" || projectTeam == "" || projectStartDate == "") {
    $.notify("Please fill all the fields", { style: 'success', className: 'graynotify' });
    return false;
  }


let recommendationList = [];
$("#tableBody tr").each(function () {
    let note = $(this).find("textarea").val().trim();
    let owners = $(this).data("owners") || ""; 
    let rowIndex = $(this).attr("data-row-index"); 

    if (note !== "") {
      recommendationList.push({
        id: rowIndex || 0,          
        name: note,                 
        multipleOwners: owners     
      });
    }
});





  const payload = {
    id: $("#Project_Id").val() || "",
    owner: projectOwner,
    pageId: pageNo || "",
    departmentId: projectDept,
    initiativePageId: parseFloat($("#Project_Initiative").val()),
    planningValue: {
      projectName: projectName,
      projectDescription: projectDesc,
      initiativePageId: parseFloat($("#Project_Initiative").val()),
      projectTeam: projectTeam,
      multipleOwners: multipleOwnerData,
      projectOwner: projectOwner,
      fromdate: formattedStartDate,
      enddate: formattedEndDate,
      departmentId: projectDept,
      category: $("#categoryValue").val() || "",
      budget: $("#budget").val(),
      status: $("#status").val(),
      priority: $("input[name='status']:checked").val() || "",
      projectStartEndDate: $("#Project_start_end_date").val() || "",
      recommendation: recommendationList,   
      actions: actionsDataArray || [],
      attachment: [],
    }
  };

  console.log(payload, "payload");

  $.ajax({
    url: "/stratroom/projectPlanning",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(payload),
    success: function (data, status) {
      $.notify("Project Planning saved successfully", { style: 'success', className: 'graynotify' });
      $("#Project_name").val('');
      $("#Project_Description").val('');
      $("#Project_Department").val('');
      $("#Project_owner").val('');
      $("#Project_team").val('');
      $("#Project_start_date").val('');
      $("#Project_end_date").val('');

      window.location.reload();
    },
    error: function (xhr, status, error) {
      $.notify("Error saving Project Planning", { style: 'success', className: 'graynotify' });
    }
  });
}



function actionssubmit() {
  let urlparams = (new URL(document.location)).searchParams;
  let pageNo = urlparams.get("pageId");

  var projectName = $("#Project_name").val();
  var projectDesc = $("#Project_description").val();
  var projectDept = $("#Project_Department").val();
  var projectOwner = $("#Project_owner").val();
  var projectTeam = $("#Project_team").val();
  var projectStartDate = $("#Project_start_end_date").val();
  var pagenumber = $("#pagenumber").val();

  var formattedEndDate = "";
  var formattedStartDate = "";

  // --- Date parsing ---
  var parts = projectStartDate.split(" to ");
  if (parts.length == 2) {
    var startDateStr = parts[0];
    var endDateStr = parts[1];

    var startParts = startDateStr.split(" ");
    var endParts = endDateStr.split(" ");

    var monthMap = {
      "Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4",
      "May": "5", "Jun": "6", "Jul": "7", "Aug": "8",
      "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12"
    };

    formattedStartDate = monthMap[startParts[0]] + "/" + startParts[1].replace(",", "") + "/" + startParts[2];
    formattedEndDate   = monthMap[endParts[0]] + "/" + endParts[1].replace(",", "") + "/" + endParts[2];
  }

  if (projectName == "" || projectDesc == "" || projectDept == "" || projectOwner == "" || projectTeam == "" || projectStartDate == "") {
    $.notify("Please fill all the fields", { style: 'success', className: 'graynotify' });
    return false;
  }


let recommendationList = [];
$("#tableBody tr").each(function () {
    let note = $(this).find("textarea").val().trim();
    let owners = $(this).data("owners") || ""; 
    let rowIndex = $(this).attr("data-row-index"); 

    if (note !== "") {
      recommendationList.push({
        id: rowIndex || 0,          
        name: note,                 
        multipleOwners: owners     
      });
    }
});


  let actionList = [];
  $("#actionBodyData tr").each(function () {
    let note = $(this).find("textarea").val().trim();
    let byDate = $(this).find("input[type='date']").val();
    let status = $(this).find(".rowstatus").val();
    let owners = $(this).data("owners") || ""; 
    let rowIndex = $(this).attr("data-row-index"); 

    if (note !== "" || byDate !== "" || status !== "" || owners !== "") {
      actionList.push({
        id: rowIndex || 0,
        name: note,
        byDate: byDate,
        multipleOwners: owners,
        status: status
      });
    }
  });


  const payload = {
    id: $("#Project_Id").val() || "",
    owner: projectOwner,
    pageId: pageNo || "",
    departmentId: projectDept,
    initiativePageId: parseFloat($("#Project_Initiative").val()),
    planningValue: {
      projectName: projectName,
      projectDescription: projectDesc,
      projectTeam: projectTeam,
      initiativePageId: parseFloat($("#Project_Initiative").val()),
      multipleOwners: multipleOwnerData || "",
      projectOwner: projectOwner,
      fromdate: formattedStartDate,
      enddate: formattedEndDate,
      departmentId: projectDept,
      category: $("#categoryValue").val() || "",
      budget: $("#budget").val(),
      status: $("#status").val(),
      priority: $("input[name='status']:checked").val() || "",
      projectStartEndDate: $("#Project_start_end_date").val() || "",
      recommendation: recommendationDataArray || [],   
      actions: actionList,
      attachment: [],
    }
  };

  console.log(payload, "ActionSavepayload");

  $.ajax({
    url: "/stratroom/projectPlanning",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(payload),
    success: function (data, status) {
      $.notify("Project Planning saved successfully", { style: 'success', className: 'graynotify' });
      $("#Project_name").val('');
      $("#Project_Description").val('');
      $("#Project_Department").val('');
      $("#Project_owner").val('');
      $("#Project_team").val('');
      $("#Project_start_date").val('');
      $("#Project_end_date").val('');

      window.location.reload();
    },
    error: function (xhr, status, error) {
      $.notify("Error saving Project Planning", { style: 'success', className: 'graynotify' });
    }
  });
}


let currentRowIndex  = null;
function recommendationaddpeople(noteId) {
    var container = $(".listusers");
    container.empty(); 
    currentRowIndex  = noteId;


    // Get existing owners from the row
    let $row = $("#tableBody").find("tr[data-row-index='" + noteId + "']");
    let existingOwners = $row.data("owners") ? $row.data("owners").toString().split(",") : [];

    $.ajax({
        url: "/stratroom/user/moduleAccessUserList?moduleName=Meetings",
        contentType: "application/json",
        success: function (data) {
            console.log(data, "data");

            

            if (!data || data.length == 0) {
                container.append('<div class="text-muted">No users found.</div>');
                return;
            }

            for (var i = 0; i < data.length; i++) {
                var user = data[i];
                var userId = user.id;
                var username = user.name || "Unknown";
                
                let imgSrc = "";
                let dataNameAttr = "";

                if (user.image && user.image !== "") {
                  imgSrc = user.image;
                } else {
                  imgSrc = createSvgDataUrl(username);
                  dataNameAttr = 'data-name="' + username + '" ';
                }

                // 🔑 Pre-check if userId exists in existingOwners
                let checked = existingOwners.includes(userId.toString()) ? "checked" : "";

                var itemHtml = '';
                itemHtml += '<div class="list-group-item attendee">';
                itemHtml += '  <div class="form-check cusom-check form-check-reverse">';
                itemHtml += '    <input class="form-check-input" type="checkbox" name="attendees" id="attendees_' + userId + '" value="' + userId + '" ' + checked + '>';
                itemHtml += '    <label class="form-check-label" for="attendees_' + userId + '">';
                itemHtml += '      <span class="image">';
                itemHtml += '        <img src="' + imgSrc + '" alt="' + username + '" ' + dataNameAttr + ' width="18" height="18">';
                itemHtml += '      </span>';
                itemHtml += '      <span class="name">' + username + '</span>';
                itemHtml += '    </label>';
                itemHtml += '  </div>';
                itemHtml += '</div>';

                container.append(itemHtml);
            }
        },
        error: function () {
            $(".recResponsibleListUsers").html('<div class="text-danger">Failed to load users.</div>');
        }
    });
}


function teamAddPeople(id, users) {
    console.log(id,users,  "id");
    
        $.ajax({
          url: "/stratroom/projectPlanning/" + id,
          type: "GET",
          contentType: "application/json",
          success: function (data, status) {
            console.log(data, "getdata");

            // Ensure select options exist before setting value
            setSelectValue("#Project_Initiative", data.planningValue.initiativePageId, data.planningValue.initiativePageId);
            setSelectValue("#Project_owner", data.planningValue.projectOwner, data.planningValue.ownerName);
            setSelectValue("#Project_team", data.planningValue.projectTeam, "Team " + data.planningValue.projectTeam);
            setSelectValue("#Project_Department", data.planningValue.departmentId, "Dept " + data.planningValue.departmentId);

            // Simple inputs
            $("#Project_name").val(data.planningValue.projectName);
            $("#Project_description").val(data.planningValue.projectDescription);
            $("#budget").val(data.planningValue.budget);
            $("#status").val(data.planningValue.status).trigger('change');
            $("input[name='status'][value='" + data.planningValue.priority + "']").prop('checked', true);
            $("#Project_start_end_date").val(data.planningValue.projectStartEndDate);

            $("#Project_Id").val(data.id);
            $("#categoryValue").val(data.planningValue.category).trigger('change');

            actionsDataArray = data.planningValue.actions || [];
            recommendationDataArray = data.planningValue.recommendation || [];



            var container = $(".teamlistusers");
    container.empty(); 

     let existingOwners = users ? users.toString().split(",") : [];
           if (!employeeArray || employeeArray.length == 0) {
                container.append('<div class="text-muted">No users found.</div>');
                return;
            }

            for (var i = 0; i < employeeArray.length; i++) {
                var user = employeeArray[i];
                var userId = user.id;
                var username = user.name || "Unknown";
                
                let imgSrc = "";
                let dataNameAttr = "";

                if (user.image && user.image !== "") {
                  imgSrc = user.image;
                } else {
                  imgSrc = createSvgDataUrl(username);
                  dataNameAttr = 'data-name="' + username + '" ';
                }

              
                let checked = existingOwners.includes(userId.toString()) ? "checked" : "";

                var itemHtml = '';
                itemHtml += '<div class="list-group-item attendee">';
                itemHtml += '  <div class="form-check cusom-check form-check-reverse">';
                itemHtml += '    <input class="form-check-input" type="checkbox" name="attendees" id="attendees_' + userId + '" value="' + userId + '" ' + checked + '>';
                itemHtml += '    <label class="form-check-label" for="attendees_' + userId + '">';
                itemHtml += '      <span class="image">';
                itemHtml += '        <img src="' + imgSrc + '" alt="' + username + '" ' + dataNameAttr + ' width="18" height="18">';
                itemHtml += '      </span>';
                itemHtml += '      <span class="name">' + username + '</span>';
                itemHtml += '    </label>';
                itemHtml += '  </div>';
                itemHtml += '</div>';

                container.append(itemHtml);
            }

          },
        });


    

}

let currentActionRowIndex  = null;
function actionaddpeople(noteId) {
    var container = $(".actionsListUsers");
    container.empty(); 
    currentActionRowIndex  = noteId;
  

    // Get existing owners from the row
    let $row = $("#actionBodyData").find("tr[data-row-index='" + noteId + "']");
    let existingOwners = $row.data("owners") ? $row.data("owners").toString().split(",") : [];

    $.ajax({
        url: "/stratroom/user/moduleAccessUserList?moduleName=Meetings",
        contentType: "application/json",
        success: function (data) {
            console.log(data, "data");

            

            if (!data || data.length == 0) {
                container.append('<div class="text-muted">No users found.</div>');
                return;
            }

            for (var i = 0; i < data.length; i++) {
                var user = data[i];
                var userId = user.id;
                var username = user.name || "Unknown";
                
                let imgSrc = "";
                let dataNameAttr = "";

                if (user.image && user.image !== "") {
                  imgSrc = user.image;
                } else {
                  imgSrc = createSvgDataUrl(username);
                  dataNameAttr = 'data-name="' + username + '" ';
                }

                // 🔑 Pre-check if userId exists in existingOwners
                let checked = existingOwners.includes(userId.toString()) ? "checked" : "";

                var itemHtml = '';
                itemHtml += '<div class="list-group-item attendee">';
                itemHtml += '  <div class="form-check cusom-check form-check-reverse">';
                itemHtml += '    <input class="form-check-input" type="checkbox" name="attendees" id="attendees_' + userId + '" value="' + userId + '" ' + checked + '>';
                itemHtml += '    <label class="form-check-label" for="attendees_' + userId + '">';
                itemHtml += '      <span class="image">';
                itemHtml += '        <img src="' + imgSrc + '" alt="' + username + '" ' + dataNameAttr + ' width="18" height="18">';
                itemHtml += '      </span>';
                itemHtml += '      <span class="name">' + username + '</span>';
                itemHtml += '    </label>';
                itemHtml += '  </div>';
                itemHtml += '</div>';

                container.append(itemHtml);
            }
        },
        error: function () {
            $(".actionsListUsers").html('<div class="text-danger">Failed to load users.</div>');
        }
    });
}







		function getInitials(name) {
			var n = (name || "U").trim();
			if (n.indexOf(" ") !== -1) {
				var parts = n.split(" ");
				var initials = "";
				for (var i = 0; i < parts.length && i < 2; i++) {
				if (parts[i].charAt(0)) {
					initials += parts[i].charAt(0).toUpperCase();
				}
				}
				return initials.substring(0, 2);
			} else {
				return n.substring(0, 2).toUpperCase();
			}
		}

    	function getColor(name) {
			var colors = [
				"rgb(236, 135, 191)", // pink
				"rgb(135, 166, 236)", // blue
				"rgb(135, 236, 213)", // green
				"rgb(236, 204, 135)", // yellow
				"rgb(236, 135, 135)", // red
				"rgb(166, 135, 236)", // purple
				"rgb(236, 135, 170)",
				"rgb(135, 236, 135)"
			];
			var hash = 0;
			for (var i = 0; i < name.length; i++) {
				hash = name.charCodeAt(i) + ((hash << 5) - hash);
			}
			var index = Math.abs(hash) % colors.length;
			return colors[index];
		}

		function createSvgDataUrl(name) {
			var initials = getInitials(name);
			var bgColor = getColor(name);
			var width = 55;
			var height = 55;

			var svg = '<svg xmlns="http://www.w3.org/2000/svg" pointer-events="none" width="' + width + '" height="' + height + '" style="background-color:' + bgColor + ';width:' + width + 'px;height:' + height + 'px;border-radius:50%;">';
			svg += '<text text-anchor="middle" y="50%" x="50%" dy="0.35em" pointer-events="auto" fill="#ffffff" font-family="HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif" style="font-weight:400;font-size:20px;">';
			svg += initials;
			svg += '</text></svg>';

			return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
		}


   
$(document).on("change", "#allusersaccess", function () {
  const checked = $(this).is(":checked");
  $(".listusers input[name='attendees']").prop("checked", checked);
});


$(document).on("change", ".listusers input[name='attendees']", function () {
  const allCount = $(".listusers input[name='attendees']").length;
  const checkedCount = $(".listusers input[name='attendees']:checked").length;
  $("#allusersaccess").prop("checked", allCount > 0 && allCount == checkedCount);
});


$(document).on("change", "#allusersactions", function () {
  const checked = $(this).is(":checked");
  $(".actionsListUsers input[name='attendees']").prop("checked", checked);
});


$(document).on("change", ".actionsListUsers input[name='attendees']", function () {
  const allCount = $(".allusersactions input[name='attendees']").length;
  const checkedCount = $(".listusers input[name='attendees']:checked").length;
  $("#allusersactions").prop("checked", allCount > 0 && allCount == checkedCount);
});



$(document).on("input", "#searchrecommendation", function () {
  const searchText = $(this).val().toLowerCase();
  $(".listusers .attendee").each(function () {
    const name = $(this).find(".name").text().toLowerCase();
    $(this).toggle(name.includes(searchText));
  });
});

$(document).on("input", "#searchactions", function () {
  const searchText = $(this).val().toLowerCase();
  $(".actionsListUsers .attendee").each(function () {
    const name = $(this).find(".name").text().toLowerCase();
    $(this).toggle(name.includes(searchText));
  });
});




$(document).on("click", ".peopleselectedUsers", function () {
    let selectedUsers = [];

    $(".listusers input[name='attendees']:checked").each(function () {
        const userId = $(this).val();
        const userName = $(this).closest(".attendee").find(".name").text();
        const userImg = $(this).closest(".attendee").find("img").attr("src");

        selectedUsers.push({ id: userId, name: userName, img: userImg });
    });

    if (!currentRowIndex) return;

    let $row = $("#tableBody").find("tr[data-row-index='" + currentRowIndex + "']");
    let $responsibleCell = $row.find(".responsible-cell");
    $responsibleCell.empty();

    // 🔑 Save owners in row’s data attribute for later submit
    let ids = selectedUsers.map(u => u.id).join(",");
    $row.data("owners", ids);  

    if (selectedUsers.length == 0) {
        $responsibleCell.append(
          '<li class="avatar avatar-xs pull-up" data-bs-target="#addpeople" data-bs-toggle="modal" onclick="recommendationaddpeople(' + currentRowIndex + ')">' +
          '<span class="avatar-initial rounded-circle" title="Add Responsible">+</span>' +
          '</li>'
        );
    } else {
        selectedUsers.forEach(user => {
            $responsibleCell.append(
              '<li class="avatar avatar-xs pull-up">' +
              ' <img src="' + user.img + '" alt="' + user.name + '" title="' + user.name + '" class="rounded-circle" />' +
              '</li>'
            );
        });

        $responsibleCell.append(
          '<li class="avatar avatar-xs pull-up" data-bs-target="#addpeople" data-bs-toggle="modal" onclick="recommendationaddpeople(' + currentRowIndex + ')">' +
          '<span class="avatar-initial rounded-circle" title="Add Responsible">+</span>' +
          '</li>'
        );
    }
});


$(document).on("click", ".actionpeopleselectedUsers", function () {
    let selectedUsers = [];

    $(".actionsListUsers input[name='attendees']:checked").each(function () {
        const userId = $(this).val();
        const userName = $(this).closest(".attendee").find(".name").text();
        const userImg = $(this).closest(".attendee").find("img").attr("src");

        selectedUsers.push({ id: userId, name: userName, img: userImg });
    });

    if (!currentActionRowIndex) return;

    let $row = $("#actionBodyData").find("tr[data-row-index='" + currentActionRowIndex + "']");
    let $responsibleCell = $row.find(".responsible-cell");
    $responsibleCell.empty();

    // 🔑 Save owners in row’s data attribute for later submit
    let ids = selectedUsers.map(u => u.id).join(",");
    $row.data("owners", ids);  

    if (selectedUsers.length == 0) {
        $responsibleCell.append(
          '<li class="avatar avatar-xs pull-up" data-bs-target="#addpeopleactions" data-bs-toggle="modal" onclick="actionaddpeople(' + currentActionRowIndex + ')">' +
          '<span class="avatar-initial rounded-circle" title="Add Responsible">+</span>' +
          '</li>'
        );
    } else {
        selectedUsers.forEach(user => {
            $responsibleCell.append(
              '<li class="avatar avatar-xs pull-up">' +
              ' <img src="' + user.img + '" alt="' + user.name + '" title="' + user.name + '" class="rounded-circle" />' +
              '</li>'
            );
        });

        $responsibleCell.append(
          '<li class="avatar avatar-xs pull-up" data-bs-target="#addpeopleactions" data-bs-toggle="modal" onclick="actionaddpeople(' + currentActionRowIndex + ')">' +
          '<span class="avatar-initial rounded-circle" title="Add Responsible">+</span>' +
          '</li>'
        );
    }
});


$(document).on("click", ".teampeopleselectedUsers", function () {
    let selectedUsers = [];

    $(".teamlistusers input[name='attendees']:checked").each(function () {
        const userId = $(this).val();
        const userName = $(this).closest(".attendee").find(".name").text();
        const userImg = $(this).closest(".attendee").find("img").attr("src");

        selectedUsers.push({ id: userId, name: userName, img: userImg });
    });

    // Build avatars
    var html = "";
    for (var i = 0; i < selectedUsers.length; i++) {
        var u = selectedUsers[i];
        html += '<li class="avatar avatar-xs pull-up">';
        html += '<img src="' + u.img + '" alt="' + u.name + '" title="' + u.name + '" class="rounded-circle" />';
        html += '</li>';
    }

    html += '<li class="avatar avatar-xs pull-up" data-bs-target="#addteampeople" data-bs-toggle="modal" onclick="teamAddPeople()">';
    html += '<span class="avatar-initial rounded-circle" title="Add Responsible">+</span>';
    html += '</li>';

    $(".team-cell").html(html);

    // --- convert selected user IDs into comma string ---
    var multipleOwners = selectedUsers.map(function (u) { return u.id; }).join(",");

    let urlparams = (new URL(document.location)).searchParams;
    let pageNo = urlparams.get("pageId");

    var projectName = $("#Project_name").val();
    var projectDesc = $("#Project_description").val();
    var projectDept = $("#Project_Department").val();
    var projectOwner = $("#Project_owner").val();
    var projectTeam = $("#Project_team").val();
    var projectStartDate = $("#Project_start_end_date").val();
    var pagenumber = $("#pagenumber").val();

    var formattedEndDate = "";
    var formattedStartDate = "";

    // --- Date parsing ---
    var parts = projectStartDate.split(" to ");
    if (parts.length == 2) {
        var startDateStr = parts[0];
        var endDateStr = parts[1];

        var startParts = startDateStr.split(" ");
        var endParts = endDateStr.split(" ");

        var monthMap = {
            "Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4",
            "May": "5", "Jun": "6", "Jul": "7", "Aug": "8",
            "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12"
        };

        formattedStartDate = monthMap[startParts[0]] + "/" + startParts[1].replace(",", "") + "/" + startParts[2];
        formattedEndDate   = monthMap[endParts[0]] + "/" + endParts[1].replace(",", "") + "/" + endParts[2];
    }

    const payload = {
        id: $("#Project_Id").val() || "",
        owner: projectOwner,
        pageId: pageNo || "",
        initiativePageId: parseFloat($("#Project_Initiative").val()),
        departmentId: projectDept,
        planningValue: {
            projectName: projectName,
            projectDescription: projectDesc,
            initiativePageId: parseFloat($("#Project_Initiative").val()),
            projectTeam: projectTeam,
            multipleOwners: multipleOwners, 
            projectOwner: projectOwner,
            fromdate: formattedStartDate,
            enddate: formattedEndDate,
            departmentId: projectDept,
            category: $("#categoryValue").val() || "",
            budget: $("#budget").val(),
            status: $("#status").val(),
            priority: $("input[name='status']:checked").val() || "",
            projectStartEndDate: $("#Project_start_end_date").val() || "",
            recommendation: recommendationDataArray || [],
            actions: actionsDataArray || [],
            attachment: []
        }
    };

    console.log(payload, "payload");

    $.ajax({
        url: "/stratroom/projectPlanning",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(payload),
        success: function (data, status) {
            $.notify("Project Planning saved successfully", { style: 'success', className: 'graynotify' });
            window.location.reload();
        },
        error: function (xhr, status, error) {
            $.notify("Error saving Project Planning", { style: 'success', className: 'graynotify' });
        }
    });
});





function moduleAccessUserListData () {
   
      $.ajax({
        url: "/stratroom/user/moduleAccessUserList?moduleName=Meetings",
        contentType: "application/json",
        success: function (data) {
            console.log(data, "data");
            allListUsersData = data;
        },
        error: function () {
           allListUsersData = [];
        }
    });
}


moduleAccessUserListData();



function getUserImageById(userId) {



   console.log(userId,allListUsersData,  "userId");
    var user = allListUsersData.find(u => u.id == userId);
    console.log(user, "user");
    if (user && user.image) return user.image;
    if (user) return createSvgDataUrl(user.name); 
    
}

function getUserNameById(userId) {
    var user = allListUsersData.find(u => u.id == userId);
    return user ? user.name : "Unknown";
}


var swotGlobalid	=	"";
function bytesToSize(bytes) {
	   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	   if (bytes == 0) return '0 Byte';
	   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

var readerValue = '';


function readFile(input) {		
	if (input.files && input.files[0]) {		
		file = input.files[0];			
		var reader = new FileReader();
		   reader.readAsDataURL(file);
		   reader.onload = function () {		        
		        readerValue = reader.result;
		 }  
	}
}

$(".modal-custom-input").change(function () {
	readFile(this);
});


$("#attachementupload").click(function(){	
	if(!$("#attachementuploadfile").val()){
		$.notify("Error:Kindly upload a file", {
							  style: 'error',
							  className: 'graynotify'
							});
		return false;
	}
	
	var file		=	$('#attachementuploadfile')[0].files[0];
	
	var fileName = file.name;
	const words = fileName.split('.');		
	    
	   var idindex	=	1;	 
	   if(attachment != undefined){
		  if(attachment.length > 0){		    
			   var array = attachment[attachment.length-1];
			   idindex = array.id;
			   idindex++;
		   }else {
			   idindex++;
		   }	
	   }
	   
	  //  var objvalue = {
		// 		"name":words[0],
		// 		"type":words[words.length - 1],
		// 		"size":bytesToSize(file.size),
		// 		"file":readerValue,
		// 		"active":0,
		// 		"meetingManagementId":swotGlobalid
	  //  }
    var currentEmp = $("#userPrincipal").val().trim();

       var objvalue = {
          name: words[0],
          type: words[words.length - 1],
          size: bytesToSize(file.size),
          file: readerValue,
          active: 0,
          initiativesId:initiativeId,
          createdBy:currentEmp,
        };
	   

	
	$.ajax({
        url: "/stratroom/initiativeAttach/",
        async:false,
		    method:'POST',
        contentType: "application/json",
        data: JSON.stringify(objvalue),
        success: function (result, status) {
        	$.ajax({
        		url : "/stratroom/initiativeAttach/" + initiativeId,
        		async:false,
        		method:'GET',
        		success : function(datafile,status){
        			var systemip = 	localStorage.getItem('systemip');
    				var action 	= 	"Meeting Attachment Uploaded";
    				var navigateempId = $("#userPrincipalnavigate").val();
				    var data	=	{"createdBy":currentEmp,"userId":navigateempId,"typeId":swotGlobalid,"action":action,"systemIp":systemip};
    				auditrailpage(data,'file');
        			$('#attachementuploadfile').val('');	
                	$("#closeUpload").click();
                	checkmodalisclosedornot();
                	uploadShow(datafile);
        		}
        	});   
        },
		error:readErrorMsg
    });
		
});	




function handleAttchmentevent(id){
  initiativeId = id; 
  console.log(id, "itemId");

        	$.ajax({
        		url : "/stratroom/initiativeAttach/" + id,
        		async:false,
        		method:'GET',
        		success : function(datafile,status){
        			var systemip = 	localStorage.getItem('systemip');
    				var action 	= 	"Meeting Attachment Uploaded";
    				var navigateempId = $("#userPrincipalnavigate").val();
				    var data	=	{"createdBy":currentEmp,"userId":navigateempId,"typeId":swotGlobalid,"action":action,"systemIp":systemip};
    				auditrailpage(data,'file');
        			$('#attachementuploadfile').val('');	
                	$("#closeUpload").click();
                	checkmodalisclosedornot();
                	uploadShow(datafile);
        		}
        	});   
      

}


       //Initiative Page api
        function handeDepartmentChange() {
          const departmentId = $("#Project_Department").val();
          // $.ajax({
          //   url: "/stratroom/pageDeptList/"+userDeptId+"?pageType=initiative",
          //   async: false,
          //   success: function (initiativeList) {
          //     var select = document.getElementById("Project_Initiative");

          //     select.innerHTML = '<option value="" disabled selected>Select Initiative</option>';


          //     for (var i = 0; i < initiativeList.length; i++) {
          //       var department = initiativeList[i];
          //       var option = '<option value="' + department.id + '">' + department.pageName + '</option>';
          //       select.innerHTML += option;
          //     }
          //   }
          // });
        }
        //Initiative Page api




    </script>










  </body>