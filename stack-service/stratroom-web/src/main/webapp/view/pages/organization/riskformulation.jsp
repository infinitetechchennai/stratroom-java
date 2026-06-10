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
		<!-- <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}"> -->


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
                            <img src="/stratroom/images/meetings-i.svg" alt="meetings" title="meetings">
                        </span>
                        Risk Planning
                    </h4>
                </div>

            </div>
        </div>
        <div class="container-lg py-2">
            <div class="card custom-card">
                <div class="card-header">
                    <div class="c-header-left">
                        <h5 class="card-title me-auto">
                            <strong editable="true" contenteditable="true"
                                onkeypress="return (this.innerText.length <= 36)">
                                Risk Planning List</strong>
                        </h5>
                    </div>
                    <div class="card-actions">
                        <div id="popoverFilterRiskPlanningCategory">
                            <span type="button" class="btn btn-sm btn-icon" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" title="Risk Planning Category">
                                <!-- <i class="fas fa-filter title_edit_icon"></i> -->
								 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="funnel" style="width: 16px; height: 16px;" class="lucide lucide-funnel"><path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"></path></svg>
                            </span>
                        </div>
                        <button type="button" class="btn btn-sm btn-icon" data-bs-toggle="modal"
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
			<a class="control-link" href="#"><span class="icon"><img src="/stratroom/images/organization-i.svg"
						width="18" height="18" alt="organization"></span></a>
			<a class="control-link" href="#"><span class="icon"><img src="/stratroom/images/template.svg" width="18"
						height="18" alt="organization"></span></a>
		</div>



		  <div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        id="project-planning-add-modal" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title headerText">Create Risk Planning</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card custom-card border-0">
                        <div class="card-body">
                            <div class="grid gap-3">
                                <div class="g-col-12 g-col-md-2">
                    <div class="form-group">
                      <label for="Risk_id" class="form-label">ID</label>
                      <input type="text" class="form-control" name="Risk_show_id" id="Risk_show_id" disabled
                        placeholder="ID">
                    </div>
                  </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="Risk_title" class="form-label">Title</label>
                                        <input type="text" class="form-control" id="Risk_title" name="Risk_title"
                                            placeholder="Title" />
                                    </div>

                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="Risk_description" class="form-label">Risk Description</label>
                                        <textarea class="form-control modal-custom-textarea" id="Risk_description"
                                            name="Risk_description" placeholder="Risk Description" rows="3"></textarea>
                                    </div>

                                </div>


                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="Risk_Department" class="form-label">Department</label>
                                        <select id="Risk_Department" name="" class="form-select modal-custom-select"
											data-placeholder="Select a Department" >
										</select>
                                    </div>

                                </div>
								<div class="g-col-12 g-col-md-6">
									<div class="form-group">
										<label for="Project_Risk" class="form-label">Risk</label>
										<select id="Project_Risk" name="" class="form-select modal-custom-select"
											data-placeholder="Select a Department">

										</select>
									</div>
								</div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="category" class="form-label">Category</label>
                                        <select id="rf_category" name="category" class="form-select modal-custom-select"
                                            data-placeholder="Select Category">
                                            <option value="Strategic Risk">Strategic Risk</option>
                                            <option value="Operational Risk">Operational Risk</option>
                                            <option value="Financial Risk">Financial Risk</option>
                                            <option value="Compliance & Legal Risk">Compliance & Legal Risk</option>
                                            <option value="Technology Risk">Technology Risk</option>
                                            <option value="Reputational Risk">Reputational Risk</option>
                                            <option value="Human Capital Risk">Human Capital Risk</option>
                                            <option value="Environmental, Social & Governance (ESG) Risk">Environmental, Social & Governance (ESG) Risk</option>
                                            <option value="Political Risk">Political Risk</option>
                                            <option value="Regulatory Risk">Regulatory Risk</option>
                                            <option value="Market Risk">Market Risk</option>
                                            <option value="Cybersecurity Risk">Cybersecurity Risk</option>
                                            <option value="Supply Chain Risk">Supply Chain Risk</option>
                                            <option value="Project & Program Risk">Project & Program Risk</option>
                                            <option value="Third-Party/Vendor Risk">Third-Party/Vendor Risk</option>
                                            <option value="Innovation & R&D Risk">Innovation & R&D Risk</option>
                                            <option value="Health & Safety Risk">Health & Safety Risk</option>
                                            <option value="Business Continuity & Resilience Risk">Business Continuity & Resilience Risk</option>
                                            <option value="Ethical/Conduct Risk">Ethical/Conduct Risk</option>
                                            <option value="Investment Risk">Investment Risk</option>
                                        </select>

                                    </div>

                                </div>

                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="Risk_DateIdentified" class="form-label">Date Identified</label>
                                        <input type="text" class="form-control datePicker" data-language="en"
                                            name="Risk_DateIdentified" id="Risk_DateIdentified"
                                            placeholder="Date Identified" />
                                    </div>

                                </div>

                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="Risk_Likelihood" class="form-label">Risk Likelihood</label>
                                        <select id="Risk_Likelihood" name="Risk_Likelihood"
                                            class="form-select modal-custom-select"
                                            data-placeholder="Select Risk Likelihood"  onchange="updateRiskScore()">
                                            <option value="Almost_Never">Almost Never</option>
                                            <option value="Happen_Very_Rarely">Happen Very Rarely</option>
                                            <option value="Seldom">Seldom</option>
                                            <option value="Often">Often</option>
											<option value="Very_Often">Very Often</option>

                                        </select>

                                    </div>

                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="Risk_Impact" class="form-label">Risk Impact</label>
                                        <select id="Risk_Impact" name="Risk_Impact"
                                            class="form-select modal-custom-select"
                                            data-placeholder="Select Risk Impact"  onchange="updateRiskScore()">
                                            <option value="Not_Signific">Not Signific</option>
                                            <option value="Minor">Minor</option>
                                            <option value="Moderate">Moderate</option>
                                            <option value="Major">Major</option>
                                            <option value="Catastrophic">Catastrophic</option>
                                        </select>

                                    </div>

                                </div>

								<div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="Risk_score" class="form-label">Risk Score</label>
                                        <input type="text" class="form-control" id="Risk_score" name="Risk_score"
                                            placeholder="Risk Score" readonly/>
                                    </div>

                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="kpi_fields" class="form-label">Priority</label>
                                        <div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input green" type="radio" name="status"
                                                    id="statusGreen" value="High">
                                                <label class="form-check-label" for="statusGreen">High</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input orange" type="radio" name="status"
                                                    id="statusOrange" value="Medium">
                                                <label class="form-check-label" for="statusOrange">Medium</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input red" type="radio" name="status"
                                                    id="statusRed" value="Low">
                                                <label class="form-check-label" for="statusRed">Low</label>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="Risk_Mitigation_Strategy" class="form-label">Mitigation
                                            Strategy</label>
                                        <input type="text" class="form-control" id="Risk_Mitigation_Strategy"
                                            name="Risk_Mitigation_Strategy" placeholder="Mitigation Strategy" />
                                    </div>

                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="Risk_Contingency_Plan" class="form-label">Contingency Plan</label>
                                        <input type="text" class="form-control" id="Risk_Contingency_Plan"
                                            name="Risk_Contingency_Plan" placeholder="Contingency Plan" />
                                    </div>

                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="Risk_owner" class="form-label">Owner/Responsible Person</label>
                                        <select id="Risk_owner" name="Risk_owner"
                                            class="form-select modal-custom-select"
                                            data-placeholder="Select">
                                          
                                        </select>
                                    </div>

                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="statusTypeobjective" class="form-label">Status</label>
                                        <select id="riskStatus" name="riskStatus"
                                            class="form-select modal-custom-select" aria-invalid="false">
                                            <option value="" selected disabled>Select Status</option>
                                            <option value="identified">Identified</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="mitigated">Mitigated</option>
                                            <option value="closed">Closed</option>


                                        </select>
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
                    <button class="btn btn-primary buttonText" value="Save" onclick="handleRiskSave()">Save</button>

                </div>
            </div>
        </div>
    </div>


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
            <h5 class="modal-title">Mitigation Strategy</h5>

            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input type="hidden" name="recommendationtype" id="recommendationtype">
            <input type="hidden" name="recommendationtype" id="recommendationcount">
            <table class="table tab-sm table-bordered align-center" id="note_table">
              <thead>
                <tr>
                  <th class="text-center">Mitigation Strategy</th>
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
		<script src="js/custom/jquery.orgchart.js"></script>
		<script src="js/custom/org_structure.js"></script>
		<script src="${contextroot}/js/select2.min.js"></script>






		<script type="text/javascript">
			$(document).ready(function () {

				$('#org-import').on('show.bs.modal', function () {
					console.log('Modal is opening - clear data now');

					$('#uploadcategory').val('');


					$('#login').val('');

					$('#file-validate').hide();
					$("#file-save").hide();
					$("#file-next-btn").hide();
					$("#file-upload").show();

				});

				if ($("#userrolename").val() == "Super User" || $("#userrolename").val() == "Admin") {
					if ($("#userPrincipal").val() != $("#userPrincipalnavigate").val()) {
						$(".subusermenuname").text('Organization');
						$(".subuserlink").addClass("homepageHighlight");
						if ($(".topmenubreadcrumb").length) {
							$(".topmenubreadcrumb").show();
						}
						if ($(".sidebarNavigate").length) {
							$(".sidebarNavigate").show();
						}
					}
				}
				$('.orgchartuserimage').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
				var currZoom = $("#chart-container").css("zoom");
				if (currZoom == "normal") currZoom = 1;

				$(".zoomIn").click(function () {
					currZoom *= 1.2;
					$("#chart-container").css("zoom", currZoom);
					$("#chart-container").css(
						"-moz-transform",
						"Scale(" + currZoom + ")"
					);
					$("#chart-container").css("-moz-transform-origin", "0 0");
				});
				$(".zoomOff").click(function () {
					$("#chart-container").css("zoom", 1);
					$("#chart-container").css(
						"-moz-transform",
						"Scale(" + currZoom + ")"
					);
					$("#chart-container").css("-moz-transform-origin", "0 0");
				});
				$(".zoomOut").click(function () {
					currZoom *= 0.8;
					$("#chart-container").css("zoom", currZoom);
					$("#chart-container").css(
						"-moz-transform",
						"Scale(" + currZoom + ")"
					);
					$("#chart-container").css("-moz-transform-origin", "0 0");
				});
			});

			$(document).on("keypress", ".required", function () {
				var elementVal = $(this).val();
				var currentElement = $(this);
				var spanerrorMsg = "This field is required";
				var attrID = $(currentElement).attr("id");
				var checkexistspan = $(currentElement).next().length;
				var minchar = 1;
				var maxchar = 200;
				if (attrID != undefined && attrID != "" && attrID == "email_add") {
					minchar = 6;
					maxchar = 200;
				}
				if (checkexistspan == 1) {
					$(currentElement).next().remove();
				}
				if (elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) {
					$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
				}
				/*else if (elementVal.length != 0 && elementVal != undefined && elementVal != "" && (elementVal.length < minchar || elementVal.length >= maxchar)) {
					spanerrorMsg = "This field length should be greater than " + minchar + " and less than " + maxchar;
					$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
				}*/
				else {
					if (checkexistspan == 1 && attrID != "email_add") {
						var currenttext = $(currentElement).next().text();
						$(currentElement).next().remove();
					}
				}

			}).on("keyup", ".required", function () {
				var elementVal = $(this).val();
				var currentElement = $(this);
				var spanerrorMsg = "This field is required";
				var attrID = $(currentElement).attr("id");
				var checkexistspan = $(currentElement).next().length;
				var minchar = 1;
				var maxchar = 200;
				if (attrID != undefined && attrID != "" && attrID == "email_add") {
					minchar = 6;
					maxchar = 200;
				}
				if (checkexistspan == 1) {
					$(currentElement).next().remove();
				}
				if (elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) {
					$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
				} else if (elementVal.length != 0 && elementVal != undefined && elementVal != "" && (elementVal.length < minchar || elementVal.length >= maxchar)) {
					spanerrorMsg = "This field length should be greater than " + minchar + " and less than " + maxchar;
					$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
				} else {
					if (checkexistspan == 1) {
						var currenttext = $(currentElement).next().text();
						$(currentElement).next().remove();
					}
				}
			});

			function getEmployeeObj() {
				var curr = $("#currency").find(':selected').attr('data-currency');
				var imageUpdate = $("#upload_link1").attr("src");
				if (imageUpdate == "/stratroom/images/media.png") {
					imageUpdate = "";
				}
				if ($("#upload_link1").attr("data-imageset") == "notset") {
					imageUpdate = "";
				}
				var employeeObj = {
					"id": $("#org_new_id").val(),
					"name": $("#name_add").val(),
					"title": $('#desg_add').val(),
					"dept": $("#dept_add").val(),
					"email": $("#email_add").val(),
					"phoneNumber": $("#org_phone").val(),
					//	"kpiname": $("#org_kpiname").val(),
					"location": $("#location_add").val(),
					"currency": $("#currency").val(),
					"currencySymbol": curr,
					"image": imageUpdate,
					"deptUniqueId": $("#deptuniqueid").val()
				}
				return employeeObj;
			}

			function getdeptEmployeePagesObj() {

				var employeeObj = [];

				if ($("#deptuserscorecard").val() != "") {
					employeeObj.push({
						"active": 0,
						"pageId": $("#deptuserscorecard").val(),
						"type": "SCORECARD",
						"typeName": "SCORECARD",
						"typeId": $("#deptuserscorecard").val(),
						"empId": $("#dept_emp_show_id").val()
					});
				}

				if ($("#deptuserinitiative").val() != "") {
					employeeObj.push({
						"active": 0,
						"pageId": $("#deptuserinitiative").val(),//$("#userinitiative").find(':selected').data('pageid')
						"type": "INITIATIVE",
						"typeName": "INITIATIVE",
						"typeId": $("#deptuserinitiative").val(),
						"empId": $("#dept_emp_show_id").val()
					});
				}

				if ($("#deptuserkpi").val() != "") {
					employeeObj.push({
						"active": 0,
						"pageId": $("#deptuserkpi").find(':selected').data('pageid'),
						"type": "KPI",
						"typeName": "KPI",
						"typeId": $("#deptuserkpi").val(),
						"empId": $("#dept_emp_show_id").val()
					});
				}

				if ($("#deptuserrisk").val() != "") {
					employeeObj.push({
						"active": 0,
						"pageId": $("#deptuserrisk").val(),
						"type": "RISK",
						"typeName": "RISK",
						"typeId": $("#deptuserrisk").val(),
						"empId": $("#dept_emp_show_id").val()
					});
				}

				return employeeObj;
			}


			function getNewEmployeeObj() {
				var imagesrc = $("#upload_link2").attr("src");
				if (imagesrc == "/stratroom/images/media.png") {
					imagesrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=";
					imagesrc = "";
				}
				if ($("#upload_link2").attr("data-imageset") == "notset") {
					imageUpdate = "";
				}
				var employeeObj = {
					"name": $("#name_add1").val(),
					"title": $('#desg_add1').val(),
					"dept": $("#dept_add1").val(),
					"deptUniqueId": $("#dept_id_add1").val(),
					//"kpiname": $("#kpi_name_add1").val(),
					"kpiname": "",
					"email": $("#email_add1").val(),
					"location": $("#location_add1").val(),
					"image": imagesrc

				}
				return employeeObj;
			}

			function updateformvalidationerrorreset() {
				$("#edit_org_structure_form span[style='color: red']").each(function () {
					$(this).not("#emailerrorshow").remove();
				});
				$("#emailerrorshow").hide();
			}

			function updateEmployee() {
				//console.log($("#upload_link1").attr("src"));
				updateformvalidationerrorreset();
				var employeeObj = getEmployeeObj();
				var validationFlag = formvalidationorg("#edit_org_structure_form");
				var emailaddress = $("#email_add").val();
				if (emailaddress == "" || emailaddress == undefined || emailaddress == " " || emailaddress == 0) {
					$("#emailerrorshow").css('display', 'block').html("This field is required");
					validationFlag = true;
				} else {
					$("#emailerrorshow").css('display', 'none').html("");
				}

				if (validationFlag == true) {
					return false;
				}
				/*var drogdropid 	=	$("#currentimgdivid").val();
				if(drogdropid !=	undefined && drogdropid !=	""){
					$("div #"+drogdropid).find(".org_box_top img").attr('src',employeeObj.image);
				}*/
				var emailaddress = $("#email_add").val();
				if (emailaddress != "" && emailaddress != undefined && emailaddress != " " && emailaddress != 0) {
					if (!validateEmail(emailaddress)) {
						$("#emailerrorshow").css('display', 'block').html("Please enter valid emailAddress");
						return false;
					} else {
						$("#emailerrorshow").css('display', 'none').html("");
					}
				}

				var methodType = 'post';
				$.ajax({
					url: "/stratroom/editEmployee/",
					type: methodType,
					contentType: "application/json",
					data: JSON.stringify(employeeObj),
					success: function (data, status) {
						location.reload(true);
						//updateemployeeaftercall(employeeObj.image,employeeObj.id);
						$("#close-org-aside").click();
					},
					error: readErrorMsg
				});
			}

			function getEmployeePagesObj() {

				var employeeObj = [];

				if ($("#userscorecard").val() != "") {
					employeeObj.push({
						"active": 0,
						"pageId": $("#userscorecard").val(),
						"type": "SCORECARD",
						"typeName": "SCORECARD",
						"typeId": $("#userscorecard").val(),
						"empId": $("#emp_show_id").val()
					});
				}

				if ($("#userinitiative").val() != "") {
					employeeObj.push({
						"active": 0,
						"pageId": $("#userinitiative").val(),//$("#userinitiative").find(':selected').data('pageid')
						"type": "INITIATIVE",
						"typeName": "INITIATIVE",
						"typeId": $("#userinitiative").val(),
						"empId": $("#emp_show_id").val()
					});
				}

				if ($("#userkpi").val() != "") {
					employeeObj.push({
						"active": 0,
						"pageId": $("#userkpi").find(':selected').data('pageid'),
						"type": "KPI",
						"typeName": "KPI",
						"typeId": $("#userkpi").val(),
						"empId": $("#emp_show_id").val()
					});
				}

				if ($("#userrisk").val() != "") {
					employeeObj.push({
						"active": 0,
						"pageId": $("#userrisk").val(),
						"type": "RISK",
						"typeName": "RISK",
						"typeId": $("#userrisk").val(),
						"empId": $("#emp_show_id").val()
					});
				}

				return employeeObj;
			}

			function updatePageEmployee() {
				//updateformvalidationerrorreset();
				var employeeObj = getEmployeePagesObj();

				var methodType = 'post';
				$.ajax({
					url: "/stratroom/pageLink/",
					type: methodType,
					contentType: "application/json",
					data: JSON.stringify(employeeObj),
					success: function (data, status) {
						location.reload(true);
						//updateemployeeaftercall(employeeObj.image,employeeObj.id);
						$("#close-org-aside").click();
					},
					error: readErrorMsg
				});
			}


			$(document).on('keydown', function (e) {
				if (e.keyCode == 27) { // ESC
					$("#close-org-aside").click();
				}
			});

			$("#editorgdeptid").on('keypress focusout blur', function () {
				$("#deptiduniqeueerrorshow").hide();
				if ($(this).prop("readonly")) {
					return false;
				}
				var deptuniname = $(this).val();
				var currentElement = $(this);
				var checkexistspan = $(currentElement).next().length;
				if (checkexistspan == 1 && (deptuniname == "" || deptuniname == undefined || deptuniname == " " || deptuniname == 0)) {
					$(currentElement).next().text('');
				}

				if (deptuniname != "" && deptuniname != undefined) {
					var addBtn = $(".dept_struct_add_btn");
					$(addBtn).attr("disabled", true).css("cursor", "not-allowed");

					$.ajax({
						url: "findByDeptUniqueId?deptUniqueId=" + deptuniname,
						contentType: "application/json",
						async: false,
						success: function (data) {
							if (data.status != "Active" && data.status != "") {
								$(addBtn).removeAttr("disabled").css("cursor", "pointer");
								$("#deptiduniqeueerrorshow").hide();
								//$("#editorgdeptid").next().append('<span id="deptiduniqeueerrorshow" style="color: red; display: none"></span>');
								//$("#deptiduniqeueerrorshow").css('display', 'none').html("");
							} else {
								$(".editdeptidSelect").append('<p id="deptiduniqeueerrorshow" style="color:red">Dept Id is already taken</p>');
							}
						}
					});
				}
			});

			/*$("#dept_id_add1").on('keypress focusout blur', function () {
				$("#employeedepterrorshow1").hide();
				
				var deptuniname = $(this).val();
				var currentElement = $(this);
				var checkexistspan = $(currentElement).next().length;
				if (checkexistspan == 1 && (deptuniname == "" || deptuniname == undefined || deptuniname == " " || deptuniname == 0)) {
					$(currentElement).next().text('');
				}
	
				if (deptuniname != "" && deptuniname != undefined) {
					var addBtn = $("#add-org-object");
					$(addBtn).attr("disabled", true).css("cursor", "not-allowed");
					$("#employeedepterrorshow1").show();
					$.ajax({
						url: "findByDeptUniqueId?deptUniqueId=" + deptuniname,
						contentType: "application/json",
						async: false,
						success: function (data) {
							if (data.status != "Active" && data.status != "") {
								$(addBtn).removeAttr("disabled").css("cursor", "pointer");
								$("#employeedepterrorshow1").css('display', 'none').html("");
							} else {
								$("#employeedepterrorshow1").html("Dept Id is already taken");
							}
						}
					});
				}
			});*/


			$(document).on('blur', "#email_add", function () {
				var emailAddredd = $(this).val();
				var currentElement = $(this);
				var empId = $("#org_new_id").val();
				var checkexistspan = $(currentElement).next().length;
				if (checkexistspan == 1 && (emailAddredd == "" || emailAddredd == undefined || emailAddredd == " " || emailAddredd == 0)) {
					$(currentElement).next().text('');
				}

				if (emailAddredd != "" && emailAddredd != undefined) {
					var addBtn = $("#edit-org-object");
					$(addBtn).attr("disabled", true).css("cursor", "not-allowed");
					$("#emailerrorshow").css('display', 'block');
					$.ajax({
						url: "checkEmail?email=" + emailAddredd + "&empId=" + empId,
						contentType: "application/json",
						async: false,
						success: function (data) {
							if (data.success != undefined && data.success != "") {
								$(addBtn).removeAttr("disabled").css("cursor", "pointer");
								$("#emailerrorshow").css('display', 'none').html("");
							} else {
								$("#emailerrorshow").css('display', 'block').html("Email address is already taken");
							}
						}
					});
				}
			});

			$(document).on('blur', "#email_add1", function () {
				var emailAddredd = $(this).val();
				var currentElement = $(this);
				var empId = $("#org_new_id1").val();
				var checkexistspan = $(currentElement).next().length;
				if (checkexistspan == 1 && (emailAddredd == "" || emailAddredd == undefined || emailAddredd == " " || emailAddredd == 0)) {
					$(currentElement).next().text('');
				}

				if (emailAddredd != "" && emailAddredd != undefined) {
					var addBtn = $("#add-org-object");
					$(addBtn).attr("disabled", true).css("cursor", "not-allowed");
					$("#emailerrorshow1").css('display', 'block');
					$.ajax({
						url: "checkEmail?email=" + emailAddredd + "&empId=" + empId,
						contentType: "application/json",
						async: false,
						success: function (data) {
							if (data.success != undefined && data.success != "") {
								$(addBtn).removeAttr("disabled").css("cursor", "pointer");
								$("#emailerrorshow1").css('display', 'none').html("");
							} else {
								$("#emailerrorshow1").css('display', 'block').html("Email address is already taken");
							}
						}
					});
				}
			});

			$(".dept_struct_add_btn").mouseover(function () {
				if ($("#orgdept").is(":focus")) {
					$("#orgdept").trigger("blur");
				}
				if ($("#editorgdeptid").is(":focus")) {
					$("#editorgdeptid").trigger("blur");
				}
				if ($("#deptiduniqeueerrorshow").css('display') == "none") {
					$(".dept_struct_add_btn").attr("disabled", true).css("cursor", "not-allowed");
				}
			});

			/*$(document).on('blur', "#orgdept", function () {
				var emailAddredd = $(this).val();
				var currentElement = $(this);
				//var empId = $("#org_new_id1").val();
				var checkexistspan = $(currentElement).next().length;
				if (checkexistspan == 1 && (emailAddredd == "" || emailAddredd == undefined || emailAddredd == " " || emailAddredd == 0)) {
					$(currentElement).next().text('');
				}
	
				if (emailAddredd != "" && emailAddredd != undefined) {
					var addBtn = $(".dept_struct_add_btn");
					$(addBtn).attr("disabled", true).css("cursor", "not-allowed");
					$.ajax({
						url: "checkDept?deptName=" + emailAddredd,
						contentType: "application/json",
						async: false,
						success: function (data) {
							if (data.success != undefined && data.success != "") {
								$(addBtn).removeAttr("disabled").css("cursor", "pointer");
								$(this).next().remove();
							} else {
								$("#orgdept").after('<span style="color: red">Department is already taken</span>');
							}
						}
					});
				}
			});*/

			$("#edit-org-object").mouseover(function () {
				if ($("#email_add").is(":focus")) {
					$("#email_add").trigger("blur");
				}
			});

			$("#add-org-object").mouseover(function () {
				if ($("#email_add1").is(":focus")) {
					$("#email_add1").trigger("blur");
				}
				if ($("#dept_id_add1").is(":focus")) {
					$("#dept_id_add1").trigger("blur");
				}
				if ($("#employeedepterrorshow1").css('display') != "none") {
					$("#add-org-object").attr("disabled", true).css("cursor", "not-allowed");
				}
			});

			/*$("#email_add").blur(function(){
				if($("#email_add").val().length >= 6){
					if($("#email_add").is(":focus")){
						$("#email_add").trigger("blur");
					}
				}
			});*/

			function formvalidationorg(formElement) {
				var validationFlag = false;
				$(formElement + " .required").each(function (index, value) {
					var spanerrorMsg = "This field is required";
					var elementVal = $(this).val();
					var currentElement = $(this);
					var attrID = $(currentElement).attr("id");
					var checkexistspan = $(currentElement).next().length;
					var minchar = 3;
					var maxchar = 200;
					/*if(checkexistspan 	==	1){
						$(currentElement).next().remove();
					}*/

					if (attrID != undefined && attrID != "" && attrID == "email_add") {
						minchar = 6;
						maxchar = 200;
					}

					if (elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) {
						$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}
					/*else if (elementVal.length != 0 && elementVal != undefined && elementVal != "" && (elementVal.length < minchar || elementVal.length >= maxchar)) {
						spanerrorMsg = "This field length should be greater than " + minchar + " and less than " + maxchar;
						$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}*/
					else {
						if (checkexistspan == 1 && attrID != "email_add") {
							$(currentElement).next().remove();
						}
					}

				});
				return validationFlag;
			}

			function addformvalidationerrorreset() {
				$("#add_org_structure_form span[style='color: red']").each(function () {
					$(this).not("#emailerrorshow1").remove();
				});
				$("#emailerrorshow1").hide();
			}


			function getNewdeptEmployeeObj() {
				var imagesrc = $("#upload_link_dept").attr("src");
				if (imagesrc == "/stratroom/images/media.png") {
					imagesrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=";
					imagesrc = "";
				}
				if ($("#upload_link_dept").attr("data-imageset") == "notset") {
					imagesrc = "";
				}
				var dept = "";
				if ($("#deptmode").val() == "add") {
					dept = $("#orgdept").val();
				} else {
					//dept	=	$("#editorgdept option:selected").text();
					dept = $("#editorgdept").val();
				}

				var employeeObj = {
					"owner": $("#ownername").val(),
					"empIdList": $(".userdept-name-multi-selectadd").val(),
					"scorecardPageId": $('#deptuserscorecard').val(),
					"initiativePageId": $("#deptuserinitiative").val(),
					"kpiId": $("#deptuserkpi").val(),
					"riskPageId": $("#deptuserrisk").val(),
					"emailAddress": $("#deptemailadd").val(),
					"deptParentId": $("#dept_parentid").val(),
					"deptUniqueId": $("#editorgdeptid").val(),
					"deptName": dept,
					"deptImage": imagesrc

				}
				return employeeObj;
			}

			function createEmployee() {
				addformvalidationerrorreset();
				var validationFlag = formvalidationorg("#add_org_structure_form");
				var emailaddress = $("#email_add1").val();
				if (emailaddress == "" || emailaddress == undefined || emailaddress == " " || emailaddress == 0) {
					$("#emailerrorshow1").css('display', 'block').html("This field is required");
					validationFlag = true;
				} else {
					$("#emailerrorshow1").css('display', 'none').html("");
				}

				if (validationFlag == true) {
					return false;
				}

				var emailaddress = $("#email_add1").val();
				if (emailaddress != "" && emailaddress != undefined && emailaddress != " " && emailaddress != 0) {
					if (!validateEmail(emailaddress)) {
						$("#emailerrorshow1").css('display', 'block').html("Please enter valid emailAddress");
						return false;
					} else {
						$("#emailerrorshow1").css('display', 'none').html("");
					}
				}

				var employeeObj = getNewEmployeeObj();
				employeeObj.pid = $("#org_new_id").val();
				var methodType = 'post';

				$.ajax({
					url: "/stratroom/createEmployee/",
					type: methodType,
					contentType: "application/json",
					data: JSON.stringify(employeeObj),
					success: function (data, status) {
						//console.log("employee hass been created..");
						location.reload(true);
						//callaftercreatedemployee(employeeObj.image, data.employeeId);
						//$("#close-org-aside1").click();
					},
					error: readErrorMsg
				});
			}

			function adddeptformvalidationerrorreset() {
				$("#add_dept_structure_form span[style='color: red']").each(function () {
					$(this).remove();
				});
				$("#deptemailerrorshow1").hide();
			}

			function deptformvalidationorg(formElement) {
				var validationFlag = false;
				$(formElement + " .required").each(function (index, value) {
					var spanerrorMsg = "This field is required";
					var elementVal = $(this).val();
					var currentElement = $(this);
					var attrID = $(currentElement).attr("id");
					var checkexistspan = $(currentElement).next().length;
					var minchar = 3;
					var maxchar = 200;

					if (attrID != undefined && attrID != "" && attrID == "deptemailadd") {
						minchar = 6;
						maxchar = 200;
					}

					if ((elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) && (!$(this).hasClass("owner-name") && !$(this).hasClass("userdept-name-multi-select"))) {
						$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}
					/*else if (elementVal.length != 0 && elementVal != undefined && elementVal != "" && (elementVal.length < minchar || elementVal.length >= maxchar)) {
						spanerrorMsg = "This field length should be greater than " + minchar + " and less than " + maxchar;
						$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}*/

					if ((elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) && ($(this).hasClass("owner-name"))) {
						$(currentElement).next().after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}

					if ((elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) && $(this).hasClass("editdeptelem")) {
						$(currentElement).next().after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}

					if ((elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) && $(this).hasClass("userdept-name-multi-select")) {
						$(currentElement).next().after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}


					/*if((elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) && $(this).hasClass("userdept-name-multi-select")){
						$(".userdept-name-multi-select").next().after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}*/
				});
				return validationFlag;
			}

			function createdeptEmployee() {
				adddeptformvalidationerrorreset();
				if ($("#orgdept").is(":visible") == true) {
					$("#deptmode").val('add');
				} else {
					$("#deptmode").val('edit');
				}
				var validationFlag = deptformvalidationorg("#add_dept_structure_form");

				/*var emailaddress = $("#deptemailadd").val();
				if (emailaddress == "" || emailaddress == undefined || emailaddress == " " || emailaddress == 0) {
					$("#deptemailerrorshow1").css('display', 'block').html("This field is required");
					validationFlag = true;
				} else {
					$("#deptemailerrorshow1").css('display', 'none').html("");
				}*/

				if (validationFlag == true) {
					return false;
				}

				var employeeObj = getNewdeptEmployeeObj();
				if ($("#deptmode").val() == "add") {
					if (employeeObj.deptParentId == undefined || employeeObj.deptParentId == "" || employeeObj.deptParentId == null) {
						$.notify("Department Parent id is missing", {
							style: 'success',
							className: 'graynotify'
						});
						return false;
					}
				}


				var methodType = 'post';
				/*if($("#dept_new_id1").val() !=	""){
					methodType = 'put';
				}*/

				if ($("#deptmode").val() == "edit") {
					methodType = 'put';
					employeeObj.deptId = $("#updatedeptId").val();
				}

				console.log(employeeObj, "employeeObj");

				$.ajax({
					url: "/stratroom/addDepartmentMapping",
					type: methodType,
					contentType: "application/json",
					data: JSON.stringify(employeeObj),
					success: function (data, status) {
						console.log(JSON.stringify(employeeObj));
						console.log("dept hass been created..");
						//	location.reload(true);
						/*if($("#deptmode") == "add"){
							callafterdeptcreatedemployee(employeeObj.image, data.deptId);
						}else{
							updatedeptaftercall(employeeObj.image, data.deptId);
						}*/
						$("#close-dept-aside1").click();
						location.reload(true);
					},
					error: readErrorMsg
				});
			}

			function validateEmail(email) {
				var regexPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return regexPattern.test(String(email).toLowerCase());
			}

		</script>
		<script src="${contextroot}/js/chosen.jquery.min.js"></script>
		<script type="text/javascript" src="${contextroot}/js/notify.js"></script>

		<script src="${contextroot}/js/initial.js"></script>
		<script src="js/custom/file_upload_new.js"></script>
		<script src="${contextroot}/js/riskPlanning.js"></script>

		<link href="assets/css/flatpickr.min.css" rel="stylesheet">
	<script src="${contextroot}/js/flatpickr.js"></script>


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



			// var toggler = document.getElementsByClassName("caret");
			// var i;

			// for (i = 0; i < toggler.length; i++) {
			//   toggler[i].addEventListener("click", function () {
			//     this.parentElement.querySelector(".nested").classList.toggle("active");
			//     this.classList.toggle("caret-down");
			//   });
			// }

		</script>

		<script>
			$(function () {
				function updateSortableEmptyState() {
					$(".nested-area").each(function () {
						if ($(this).children(".nested-item").length == 0) {
							if ($(this).find("li.sortable-empty").length == 0) {
								$(this).prepend('<li class="sortable-empty"></li>'); // Change append → prepend
							}
						}
					});
				}

				// Initial check for empty lists
				updateSortableEmptyState();

				$(".nested-area").sortable({
					items: "> .nested-item:not(.non-draggable-parent)", // Allow sorting for draggable items only
					handle: ".org-box", // Handle for dragging
					connectWith: ".nested-area", // Allow connected sorting between nested areas
					placeholder: "ui-sortable-placeholder", // Placeholder during sorting

					start: function (event, ui) {
						ui.item.addClass("dragging-highlight");

						// Check and update sortable-empty class for the source list
						updateSortableEmptyState();
					},

					stop: function (event, ui) {
						ui.item.removeClass("dragging-highlight");

						// Check and update sortable-empty class for the target list
						updateSortableEmptyState();
					},

					receive: function (event, ui) {
						$(this).find("li.sortable-empty").remove();
					},

					update: function () {
						updateSortableEmptyState();
					},

					over: function (event, ui) {
						let $parent = ui.placeholder.parent();
						if ($parent.children(".nested-item:not(.ui-sortable-placeholder)").length == 0) {
							if ($parent.find("li.sortable-empty").length == 0) {
								$parent.prepend('<li class="sortable-empty"></li>'); // Change append → prepend
							}

						}
					},

					out: function (event, ui) {
						let $parent = ui.placeholder.parent();
						if ($parent.children(".nested-item:not(.ui-sortable-placeholder)").length == 0) {
							$parent.find("li.sortable-empty").remove();
						}
					}
				});

				// Prevent dragging for non-draggable items explicitly
				// $(".nested-item.non-draggable").on("mousedown", function (e) {
				//   e.stopPropagation(); // Prevent dragging
				// });
			});


			$("#boardTypeEdit").select2({
				width: '100%',
				placeholder: "Select Department",
				// //allowClear: true,
				// dropdownParent: $('#add-user')
			});



			//Update Employee Dept
			function updateEmployeeDept() {
				const payload = {
					owner: $("#ownernameValue").val(),
					empIdList: $(".userdept-name-multi-select").val(),
					scorecardPageId: $('#deptuserscorecardValue').val(),
					initiativePageId: $("#deptuserinitiativeValue").val(),
					kpiId: $("#deptuserkpiValue").val(),
					riskPageId: $("#deptuserriskValue").val(),
					emailAddress: $("#emialIdValue").val(),
					deptParentId: $("#dept_parentid").val(),
					deptUniqueId: $("#editorgdeptidValue").val(),
					deptName: $("#editorgdept").val(),
					deptImage: "",
					deptId: $("#updatedeptId").val()
				}

				console.log(payload, "payload");

				$.ajax({
					url: "/stratroom/addDepartmentMapping",
					type: "put",
					contentType: "application/json",
					data: JSON.stringify(payload),
					success: function (data, status) {
						console.log("dept hass been created..");

						$("#close-dept-aside1").click();
						location.reload(true);
					},
					error: readErrorMsg
				});
			}


			$(document).on('click', '#done-btn', function () {
				location.reload(true);
			});


			function handleOrgView() {
				
				console.log("function clicked");
				var daterange2 = $("#datePeriod").val();

				$.ajax({
					url: "/stratroom/allDepartmentListByLoginUser",
					type: "GET",
					data: { datePeriod: daterange2 },
					success: function (data) {
						console.log(data, "data");

						if (data.length > 0) {

							var html = '';

							html += '<div id="dropdownMenuButtonWrap" >';
							html += '<ul class="dropdown-menu" id="v-pills-tab" role="tablist" aria-orientation="vertical">';

							for (var i = 0; i < data.length; i++) {
								var deptName = data[i].name;
								var safeId = "v-pills-" + deptName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() + "-tab"; // Sanitize for ID
								var targetId = "#v-pills-" + deptName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

								html += '<button class="card nav-link" id="' + safeId + '" data-bs-toggle="pill" ';
								html += 'data-bs-target="' + targetId + '" type="button" role="tab" aria-controls="' + targetId.substring(1) + '" ';
								html += 'aria-selected="false" ';
								html += 'onclick="handleDepartmentClick(\'' + deptName.replace(/'/g, "\\'") + '\')">';
								html += '<span class="nav-text">' + deptName + '</span>';
								html += '</button>';
							}

							html += '</ul>';
							html += '</div>';


							$("#org-tracker-tabs").empty().append(html);


							var orgModal = new bootstrap.Modal(document.getElementById('org-view'));
							orgModal.show();
						}
					},
					error: function (xhr, status, err) {
						console.error("Error fetching department list:", err);
						$("#v-pills-tab").html('<div class="text-danger px-3">Failed to load data</div>');

						openOrgModalWithContent([]);
					}
				});
			}



			function handleDepartmentClick(deptName) {
				$("#org-tracker-tab-section-data").empty();
				console.log("Department clicked:", deptName);
				var daterange2 = $("#datePeriod").val();
				$.ajax({
					url: "/stratroom/orgTrackList?flagType=" + deptName + "&datePeriod=" + daterange2 + "&id=" + deptName,
					type: "GET",
					success: function (data) {
						console.log(data, "suceessssss");
					var html = '<div class="control-panel-content">';
    html += '<div class="mb-2 section-title">';
    html += '<h5>CEO</h5>';
    html += '</div>';
    html += '<div class="org-structure-table">';
    html += '<table class="table table-bordered organisationTracker" style="width: 100%;">';
    html += '<thead class="text-center">';
    html += '<tr>';
    html += '<th>Parent</th>';
    html += '<th>Owner</th>';
    html += '<th>Department</th>';
    html += '<th>Email</th>';
    html += '<th>Pages</th>';
    html += '<th>From Date</th>';
    html += '<th>To Date</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';

    // Loop through the data and create a row for each item
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        html += '<tr>';
        html += '<td>' + (item.parentName || '') + '</td>';
        html += '<td>' + (item.ownerName || '') + '</td>';
        html += '<td>' + (item.designation || '') + '</td>';
        html += '<td>' + (item.email || '') + '</td>';
        html += '<td>' + (item.pages || '') + '</td>';
        html += '<td>' + (item.fromDate || '') + '</td>';
        html += '<td>' + (item.toDate || '') + '</td>';
        html += '</tr>';
    }

    html += '</tbody>';
    html += '</table>';
    html += '</div>';
    html += '</div>';


    $("#org-tracker-tab-section-data").append(html);

					}
				});
			}



		</script>

 <script>
        $('.modal-custom-select').each(function () {
            let $this = $(this);
            $this.select2({
                width: "100%",
                dropdownParent: $this.closest('.modal')
            });
        });
       
    </script>

	<script>
	document.addEventListener('DOMContentLoaded', function() {
		document.querySelectorAll('.datePicker').forEach(function(el) {
			console.log("Initializing flatpickr for element with ID:", el.id);
			flatpickr(el, {  // Pass the element directly instead of selector
				dateFormat: "M j, Y",
				allowInput: true
			});
		});
	});
	</script>


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






	</body>