<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />
<link href="${contextroot}/css/frappe-gantt.css" rel="stylesheet">
<link href="assets/css/main.css?v0.004" rel="stylesheet">

<style>
.initiative-eye-btn::after {
    display: none !important;
}

	.gantt-arrow {
  fill: none;
  stroke: #666;   /* arrow line color */
  stroke-width: 1.5px;
}

.gantt-arrow-head {
  fill: #666;     /* arrowhead color */
}
.status-bg-gray { background-color: #adb5bd !important; color: #fff; }
.status-bg-blue { background-color: #0d6efd !important; color: #fff; }
.status-bg-green { background-color: #28a745 !important; color: #fff; }
.status-bg-red { background-color: #dc3545 !important; color: #fff; }
.status-bg-orange { background-color: #fd7e14 !important; color: #fff; }
.status-bg-yellow { background-color: #ffc107 !important; color: #000; }

  .progress-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
  padding: 30px;
  background: #fff;
}

.progress-item {
  text-align: center;
}

.pie-chart {
  width: 32px;      /* Increased from 32px */
  height: 32px;     /* Increased from 32px */
  position: relative;
  margin-bottom: 15px;
}

.pie-chart::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid #f0f0f0; /* Reduced from 6px */
  z-index: 1;
}

.pie-prog {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #ffc107; /* fallback */
  transform: rotate(-90deg);
  transform-origin: center;
  transition: transform 1s ease-out;
  z-index: 2;
}

.progress-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10px;
  font-weight: bold;
  color: #333;
  line-height: 1;
}

.progress-label {
  font-size: 12px;
  color: #555;
  margin-top: 8px;
}
.userprofileimage {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #ddd; /* default color */
  color: #fff;
  font-weight: bold;
  font-size: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  position: relative;
}

/* Display initials from data-name when no src */
.userprofileimage[data-name]::before {
  content: attr(data-name);
}
.list-group {
  max-height: none !important;
  margin-bottom: 0 !important;
  overflow: visible !important;
  border: none !important;
}
</style>



<script>
	function preview_images() {
		var total_file = document.getElementById("images").files.length;
		for (var i = 0; i < total_file; i++) {
			$('#image_preview')
					.append(
							"<div class='col-md-3' style='padding-bottom: 4%' '><img class='img-responsive' src='"
									+ URL
											.createObjectURL(event.target.files[i])
									+ "'></div>");
		}
	}
</script>

<style>
.list-group {
    max-height: 325px !important;
}
</style>

<jsp:include page="modals/initiative_description_modal.jsp"></jsp:include>
<input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
<!-- #END# Right Sidebar -->
<!-- #END# FormEdit Sidebar -->
<!-- #END# KPI Desc Sidebar 364780743841-->
<jsp:include page="template/sidebar_template.jsp"></jsp:include>
    <div style="--stratroom-offcanvas-width: 280px;"
        class="offcanvas offcanvas-toggle offcanvas-start offcanvasSettings border-0 shadow-lg" data-bs-scroll="true"
        data-bs-backdrop="false" tabindex="-1" id="offcanvasSettings" aria-labelledby="offcanvasSettingsLabel">

        <div class="offcanvas-toggle-menu shadow toggle-right">
            <button id="toggleButton" class="btn p-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSettings"
                aria-controls="offcanvasSettings">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="chevrons-right" style="width: 14px; height: 14px;" class="lucide lucide-chevrons-right"><path d="m6 17 5-5-5-5"></path><path d="m13 17 5-5-5-5"></path></svg>
            </button>
            <button class="btn p-0" data-bs-dismiss="offcanvas" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="chevrons-right" style="width: 14px; height: 14px;" class="lucide lucide-chevrons-right"><path d="m6 17 5-5-5-5"></path><path d="m13 17 5-5-5-5"></path></svg>
            </button>
        </div>
        

        <div class="offcanvas-header border-bottom justify-content-between gap-3">
            <h5 class="offcanvas-title text-uppercase fs-6 fw-bold" id="offcanvasSettingsLabel">Initiatives & Projects
            </h5>
            <div class="page-icons">
                <ul>


                    <li>
                        <a href="#file-validate-form" data-bs-toggle="modal" contenteditable="false"
                            style="cursor: pointer;">
                            <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                data-bs-title="Import">
                                <i data-lucide="import" style="width: 14px; height: 14px;"></i>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#" contenteditable="false" style="cursor: pointer;">
                            <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                data-bs-title="Export">
                                <i data-lucide="file-up" style="width: 16px; height: 16px;"></i>
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
            
        </div>
        <div>
            <div
                class="offcanvas-tab d-flex justify-content-between align-items-end gap-2 border-bottom px-3 ps-2 pt-2">
                <div id="popoverFilterInitiativesCategory">
                    <span type="button" class="btn btn-sm btn-icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Initiatives Category">
                        <i data-lucide="funnel" style="width: 12px; height: 12px;"></i> <strong>Filter Initiatives
                            Category</strong>
                    </span>
                </div>
            </div>
        </div>
        <div class="offcanvas-body">
            <div class="card border-0">
                <div class="card-body p-0">
                    <!-- <div class="d-grid gap-2">
                        <div class="g-col-12">
                            <div class="form-group">
                                <label for="Initiative_Department_01" class="form-label">Department</label>
                                <select id="Initiative_DepartmentData" name="" class="form-select select2-picker"
                                    data-placeholder="Select a Department">
                                   
                                </select>
                            </div>
                        </div>
                        <div class="g-col-12">
                            <div class="form-group">
                                <label for="Initiative_Pages" class="form-label">Pages</label>
                                <select id="Initiative_Pages" name="" class="form-select select2-picker"
                                    data-placeholder="Select a Pages">
                                </select>
                            </div>
                        </div>
                    </div> -->
                    <div class="d-grid gap-2 kpis-cards mt-3">
                        <div class="d-grid gap-2 kpis-cards" id="initiate_sidebar"></div>
                        

                    </div>

                </div>
            </div>
        </div>
    </div>


<jsp:include page="modals/sub_initiative_user_modal.jsp"></jsp:include>
   <main class="pt-3 pb-3">
        <div class="container-lg">
           
            <!---------Initiatives--------->
            <div class="row g-2">
                <div class="col-12" id="initiatives-container">
                    <!-- Dynamic Initiatives will be loaded here -->
                </div>
                <div class="col-md-4 sub-initiative-show">
                    <!-- Dynamic Sub-Initiatives will be loaded here -->
                </div>

                <!-- Chart -->
                
                            <jsp:include page="template/intiatives_chart.jsp"></jsp:include>
                             <div class="col-md-8 sub_initiatives select-toggle chart" id="chartdiv_ini">
                             </div>
                       
                
                
              
               
                <!-- <div class="col-md-8 sub_initiatives select-toggle chart">
                    <div class="card custom-card table-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                    <strong editable="true" contenteditable="true"
                                        onkeypress="return (this.innerText.length <= 36)">Chart</strong>

                                </h5>
                            </div>

                            <div class="card-actions">

                                <div class="dropdown">
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="true">
                                        <i data-lucide="ellipsis-vertical" style="width: 14px; height: 14px;"></i>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">

                                        <li>
                                            <a class="dropdown-item" href="#chart_view_popup" data-bs-toggle="modal"
                                                onclick="return false;">View</a>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body overflow-auto gantt-chart" style="height: 340px;">

                          
                            <div id="gantt" style="width: 100%"></div>
                        </div>
                    </div>
                </div> -->
                <!-- Task -->
                <div class="col-lg-4 col-md-4 task-show"></div>

                <!-- milestones -->
                <div class="col-md-4 milestones"></div>

                <!-- Files-->
                <div class="col-lg-4 col-md-6 files">

                </div>
                <!-- Comment Section -->
                <div class="col-lg-4 col-md-6 comments-show">

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

    <!-- Sub Initiative Edit Pop Up  -->
  
    <div id="subinitative-edit-modal" class="modal custom-modal fade sub_initative_edit_popup" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myLargeModalLabel_1">
                        Edit Sub Initiative Description
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card custom-card border-0">
                        <div class="card-body">

                            <div class="grid gap-3">

                                <div class="g-col-12 g-col-md-4">

                                    <div class="form-group" id="sub_Initiative_id_wrapper">
                                        <label for="sub_Initiative_id" class="form-label">ID</label>
                                        <input type="text" class="form-control" name="sub_Initiative_id"
                                            id="sub_Initiative_id" disabled="" placeholder="ID">
                                    </div>
                                </div>

                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="sub_initative_desc" class="form-label">Name</label>
                                        <textarea class="form-control" autocomplete="off" name="subinitiative_desc"
                                            id="subinitiative_desc" cols="" rows="3" placeholder="Name"></textarea>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-3">
                                    <div class="form-group">
                                        <label for="sub_initative_progress" class="form-label">Progress</label>
                                        <input type="text" class="form-control" name="sub_initative_progress"
                                            id="sub_initative_progress" placeholder="Progress" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-3">
                                    <div class="form-group">
                                        <label for="sub_initative_contribution" class="form-label">Contribution
                                            (%)</label>
                                        <input type="number" min="0" max="100" class="form-control"
                                            name="sub_initative_contribution" id="sub_initative_contribution"
                                            aria-invalid="false" placeholder="Contribution %">

                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="sub_initative_start_end" class="form-label">Start / End Date</label>
                                        <input type="text" class="form-control datepicker-here" data-range="true"
                        data-multiple-dates-separator=" - " id="sub_initative_start_end" name="sub_initative_start_end"
                                            placeholder="Start / End Date" />
                                    </div>
                                </div>

                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="sub_initative_desc" class="form-label">Implementation Remarks</label>
                                         <input type="text" class="form-control" id="implementation_remarks"
                                            placeholder="Implementation Remarks" />
                                    </div>
                                </div>
                                  <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="sub_initative_desc" class="form-label">Performance Analysis Observations / Recommendation</label>
                                         <input type="text" class="form-control" id="performance_analysis_observations_recommendation"
                                            placeholder="" />
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
                    <button class="btn btn-primary" value="Save" onclick="updateSubInitiative()">Save</button>
                  
                </div>
            </div>
        </div>
    </div>
    <!-- Sub Initiative Edit Pop Up  -->

     <!--#START Activities Edit -->
    <div id="activities-edit-modal" class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myLargeModalLabel_1">Edit Activities Description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card custom-card border-0">
                        <div class="modal-body">
                            <div class="grid gap-3">
                                <div class="g-col-12 g-col-md-4">

                                    <div class="form-group">
                                        <label for="" class="form-label">ID</label>
                                        <input type="text" class="form-control" name=""
                                            id="activity_id" disabled placeholder="ID">
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-8">
                                    <div class="form-group">
                                        <label for="subInitiatives" class="form-label">Sub Initiative</label>

                                         <input type="text" class="form-control" name=""
                                            id="subinitiative_name" disabled placeholder="ID" readonly>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-12">
                                    <div class="form-group">
                                        <label for="" class="form-label">Name</label>
                                        <textarea class="form-control" autocomplete="off" name=""
                                            id="activity_desc" cols="" rows="3" placeholder="Name"></textarea>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="" class="form-label">Progress (%)</label>
                                        <input type="text" class="form-control" name="activity_progress"
                                            id="activity_progress" placeholder="Progress (%)" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="milestone_start_end" class="form-label">Start / End Date</label>
                                        <input type="text" class="form-control datepicker-here"  data-range="true"
                        data-multiple-dates-separator=" - " placeholder="Start / End Date"
                                            name="" data-language="en" autocomplete="off"
                                            id="activity_start_end">
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="budget" class="form-label">Budget</label>
                                        <input type="text" class="form-control" name="budget" id="activity_budget"
                                            placeholder="Budget" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="actual" class="form-label">Actual</label>
                                        <input type="text" class="form-control" name="actual" id="activity_actual"
                                            placeholder="Actual" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary initative_save_btn" value="Save" onclick="activityUpdate()">Save</button>
                </div>
            </div>
        </div>
    </div>
    <!--#END Activities Edit -->

        <!--#START Sub Activities Edit -->
    <div id="sub-activities-edit-modal" class="modal custom-modal fade" data-bs-backdrop="static"
        data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myLargeModalLabel_1">Edit Sub Activitie Description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card custom-card border-0">
                        <div class="modal-body">
                            <div class="grid gap-3">
                                <div class="g-col-12 g-col-md-4">

                                    <div class="form-group">
                                        <label for="" class="form-label">ID</label>
                                        <input type="text" class="form-control" name=""
                                            id="sub_activity_id" disabled placeholder="ID">
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="" class="form-label">Name</label>
                                        <textarea class="form-control" autocomplete="off" name="milestone_desc"
                                            id="sub_activity_desc" cols="" rows="3" placeholder="Name"></textarea>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="" class="form-label">Progress (%)</label>
                                        <input type="text" class="form-control" name=""
                                            id="sub_activity_progress" placeholder="Progress (%)" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="" class="form-label">Start / End Date</label>
                                        <input type="text" class="form-control datepicker-here"  data-range="true"
                        data-multiple-dates-separator=" - " placeholder="Start / End Date"
                                            name="" data-language="en" autocomplete="off"
                                            id="sub_activity_start_end">
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="budget" class="form-label">Budget</label>
                                        <input type="text" class="form-control" name="budget" id="sub_activity_budget"
                                            placeholder="Budget" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="actual" class="form-label">Actual</label>
                                        <input type="text" class="form-control" name="actual" id="sub_activity_actual"
                                            placeholder="Actual" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary initative_save_btn" value="Save" onclick="subactivityUpdate()">Save</button>

                   
                </div>
            </div>
        </div>
    </div>
    <!--#END Sub Activities Edit -->

    <div id="sub_initative_view_popup" class="modal custom-modal fade" data-bs-backdrop="static"
        data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">View Sub Initatives</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body" id="subInitiativesModalBody">
                            
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>

      <div id="task-view-modal" class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fs-5">View Task</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">
                            <div class="list-group initiatives-bar" id="taskList">



                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>


      <div id="sub_milestone_view_popup" class="modal custom-modal fade" data-bs-backdrop="static"
        data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fs-5">View Milestones</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">
                            <div class="list-group initiatives-bar" id="mileStoneData">
                         
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div id="attachments-view-modal" class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">View Attachments</h5>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">
                            <div class="list-group initiatives-bar" id="attachmentList">
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal custom-modal fade subinitiatives_add_user_popup" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
    aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content"> 
			<div class="modal-header modalheadercolor">
				<h6 class="modal-title" id="myLargeModalLabel_1" data-i18n="Edit Activities Users">Edit Activities Users</h6>
				<button type="button" class="close getselectedActivitiesUsers" id="activities_current_id" data-activities_sub_current_id="" data-activities_parent_id="" data-dismiss="modal"
					aria-label="Close" style="border: none;background-color: white;   margin-left: 322px; font-size: 18px;" >&times;
				</button>
			</div>
			<div id="user_subview" class=""></div>
			<input type="hidden" id="activitiesuserajaxid">
			<input type="hidden" id="activitiesparentajaxid">
			<div class="">
				<div class="col-lg-12 col-md-12">
						<div class="d-flex flex-column employee_div_body_box sub-ini-box" id="sub-ini-box_view">
							<span id="subinitiatives-ini-box_view_users"></span>
							</div>
						</div>
				</div>
			</div>
		</div>
    </div> 

    <div class="modal custom-modal fade activities_add_user_popup" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
    aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content"> 
			<div class="modal-header modalheadercolor">
				<h6 class="modal-title" id="myLargeModalLabel_1" data-i18n="Edit Activities Users">Edit Activities Users</h6>
				<button type="button" class="close getselectedActivitiesUsers" id="activities_current_id" data-activities_sub_current_id="" data-activities_parent_id="" data-dismiss="modal"
					aria-label="Close" style="border: none;background-color: white;   margin-left: 322px; font-size: 18px;" >&times;
				</button>
			</div>
			<div id="user_subview" class=""></div>
			<input type="hidden" id="activitiesuserajaxid">
			<input type="hidden" id="activitiesparentajaxid">
			<div class="">
				<div class="col-lg-12 col-md-12">
						<div class="d-flex flex-column employee_div_body_box sub-ini-box" id="sub-ini-box_view">
							<span id="activities-ini-box_view_users"></span>
							</div>
						</div>
				</div>
			</div>
		</div>
    </div> 
<script src="${contextroot}/js/bundles/amcharts4/core.js"></script>
<script src="${contextroot}/js/bundles/amcharts4/charts.js"></script>
<script src="${contextroot}/js/bundles/amcharts4/animated.js"></script>
<script src="${contextroot}/js/datepickerair.js"></script>
<script src="${contextroot}/js/datepicker.en.js"></script>
<script src="${contextroot}/js/pages/widgets/chart-widget.js"></script>
<script type="text/javascript" src="${contextroot}/js/d3.min.js"></script>
<script src="${contextroot}/js/jquery.treetable.js"></script>
<script>


  $(document).on('click', '#budgetDetailView', function() {
    console.log("click thru");
	if ($(this).hasClass('fa-angle-down')) {
            $(this).removeClass('fa-angle-down').addClass('fa-angle-up');
        } else {
            $(this).removeClass('fa-angle-up').addClass('fa-angle-down');
        }

        // Toggling the other class - replace 'your-toggle-class' with the actual class you want to toggle
        $(".initiative_rating_detailsdown").toggleClass('d-none');
	});
	$('.date_pickers').datepicker({
		language : 'en',
		minDate : new Date(),
		range : true,
		autoClose : true,
		position : "top left",
		todayButton : true,
		onSelect : function(fd) {
			// $('.datepickers-container').hide();
		}
	});

	$('.sub_initative_add_user_popup,.activities_add_user_popup,.initatives_description_popup')
			.modal({
				show : false,
				backdrop : 'static',
				keyboard : false
			});
	$('.modal-dialog').draggable({
            handle: ".modal-header"
        });		
	
	$.fn.select2.amd.define("SearchableSingleSelection", [
		  "select2/utils",
		  "select2/selection/single",
		  "select2/selection/eventRelay",
		  "select2/dropdown/search"
		],
		function (Utils, SingleSelection, EventRelay, DropdownSearch) {
		  var adapter = Utils.Decorate(SingleSelection, DropdownSearch);
		  adapter = Utils.Decorate(adapter, EventRelay);

		  adapter.prototype.render = function () {
		    var $rendered = DropdownSearch.prototype.render.call(this, SingleSelection.prototype.render);

		    this.$searchContainer.hide();
		    this.$element.siblings('.select2').find('.selection').prepend(this.$searchContainer);

		    return $rendered;
		  };

		  var bindOrigin = adapter.prototype.bind;
		  adapter.prototype.bind = function (container) {
		    var self = this;

		    bindOrigin.apply(this, arguments);

		    container.on('open', function () {
		      self.$selection.hide();
		      self.$searchContainer.show();
		    });

		    container.on('close', function () {
		      self.$searchContainer.hide();
		      self.$selection.show();
		    });
		  };

		  return adapter;
		});

		/*
		* A select2 adapter to show simple dropdown list without a searchbox inside
		*/
		$.fn.select2.amd.define("UnsearchableDropdown", [
		  "select2/utils",
		  "select2/dropdown",
		  "select2/dropdown/attachBody",
		  "select2/dropdown/closeOnSelect"
		],
		function (Utils, Dropdown, AttachBody, CloseOnSelect) {
		  var adapter = Utils.Decorate(Dropdown, AttachBody);
		  adapter = Utils.Decorate(adapter, CloseOnSelect);
		  return adapter;
		});

		$('#Initiative_Department,#InitiativeForm #impact').select2({
		  selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
		  dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
		});
</script>
<script src="${contextroot}/js/jspdf.umd.min.js"></script>
<script src="${contextroot}/js/jspdf.plugin.autotable.min.js"></script>
<script src="${contextroot}/js/frappe-gantt.min.js"></script>

<script src="${contextroot}/js/initiativeview.js"></script>
<!-- <script src="${contextroot}/js/initiative.js"></script> -->