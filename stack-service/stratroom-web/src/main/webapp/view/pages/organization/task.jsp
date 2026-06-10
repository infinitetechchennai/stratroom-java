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
	 <link href="assets/css/bootstrap.min.css" rel="stylesheet">

	 <!-- Flatpickr CSS -->
	<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css"> -->
	<link href="assets/css/flatpickr.min.css" rel="stylesheet">
	<script src="${contextroot}/js/flatpickr.js"></script>

	<!-- Flatpickr JS -->
	<!-- <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script> -->



    

    
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

	.avatar.avatar-xs {
    width: 24px;
    height: 24px;
    transition: all 0.25s ease;
}
.avatar-group .avatar {
    margin-inline-start: -0.6rem;
    transition: all 0.25s ease;
    position: relative;
}
.avatar {
    width: 72px;
    height: 72px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    padding: 3px;
    background-color: var(--color-white);
}
.avatar {
    display: inline-flex
;
    justify-items: center;
    justify-content: center;
}

.row {
	padding-top: 0.5rem;
    padding-right: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.5rem;
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
        <div class="container-lg">
            <div class="page-header grid gap-2 pb-1">
                <div class="g-col-8 d-flex align-items-center">
                    <h4 class="title">
                        <span class="icon">
                             <i data-lucide="clipboard-list" style="width: 18px; height: 18px;"></i>
                        </span>
                        Task Management
                    </h4>


                </div>
                <div class="load-page page-actions g-col-4">
                    <div class="page-icons">
                        <ul>
                           

                            <li>
                                
                                <a href="#" id="popoverFilterStatus">
                                <span type="button" class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Filter">
                                   <i data-lucide="funnel" style="width: 16px; height: 16px;"></i>
                                  </span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Export">
                                   <i data-lucide="file-up" style="width: 16px; height: 16px;"></i>
                                   </span>
                                </a>
                            </li>

                            

                             

                        </ul>
                    </div>
                </div>
            </div>


        </div>

        <div class="container-lg py-2">
          <div class="card custom-card-tab">
          <div class="card-header p-0">
                    <div class="c-header-left">
                        <div class="dropdown dropdown-tab dropdown-tab-ellipsis" id="tab-navigationWrap"></div>
                    </div>
                </div>
            <div class="card-body tab-content" id="task-content"></div>
</div>
        </div>
    </main>
	  <footer class="col-12 text-center py-2 copyright">
		<p class="mb-0">Copyright &copy; <span id="year"></span> <strong>StratRoom</strong></p>
	
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
	<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
	<div class="modal-content">
	<div class="modal-header">
	<h4 class="modal-title">Create Org</h4>
	<button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
	</div>
	<div class="modal-body">
		<form class="card custom-card border-0">
            <div class="card-body">
              <div class="grid gap-3">
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="sub_initative_progress" class="form-label">Attachment</label>
                    <div class="attachment-upload">
                      <div class="input-group mb-1">
                        <input type="file" class="form-control" id="inputGroupFile02"
                          accept=".pdf,.ppt,.jpeg,.xlsx,.doc,.docx">
                        <!-- <label class="input-group-text" for="inputGroupFile02">Upload</label> -->
                      </div>
                      <div class="form-text">Supported file type (jpeg,pdf,pptx,xlsx,docx)</div>
                    </div>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="sub_initative_progress" class="form-label">Department</label>
                    <input type="text" class="form-control browser-default" name="" id="" placeholder="Department">
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="sub_initative_progress" class="form-label">Department ID</label>
                    <input type="text" class="form-control browser-default" name="" id="" placeholder="Department ID">
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="boardTypeEdit" class="form-label">Owner</label>
                    <select class="userdept-name-multi-select form-select select-dropdown-edit-org w-100 select2" name="boardTypeCreate" id="boardTypeEdit"
                      data-placeholder="Select Board Type" style="width: 100%;"> 
                    </select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="sub_initative_progress" class="form-label">Email</label>
                    <input type="text" class="form-control browser-default" name="" id="" placeholder="Email">
                  </div>
                </div>
				<div class="g-col-12 g-col-md-6">
					<div class="form-group">
					  <label for="boardTypeEdit" class="form-label">Members</label>
					  <select class="userdept-name-multi-select form-select select-dropdown-edit-org w-100 select2" style="width: 100%;" name="boardTypeCreate" id="boardTypeEdit"
						data-placeholder="Select Board Type"  multiple="multiple">
						
					  </select>
					</div>
				  </div>
              
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="ScorecardEdit" class="form-label">Scorecard</label>
                    <select class="form-select select-dropdown-edit-org w-100" name="ScorecardEdit" id="ScorecardEdit"
                      data-placeholder="Select Scorecard">
                      <option value="" disabled selected hidden>
                        Select Scorecard
                      </option>
                      
                    </select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="InitiativeEdit" class="form-label">Initiative</label>
                    <select class="form-select select-dropdown-edit-org w-100" name="InitiativeEdit" id="InitiativeEdit"
                    data-placeholder="Select Initiative">
                    <option value="" disabled selected hidden>
                      Select Initiative
                    </option>
                    </select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="KPIEdit" class="form-label">KPI</label>
                    <select class="form-select select-dropdown-edit-org w-100" name="KPIEdit" id="KPIEdit"
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
                    <select class="form-select select-dropdown-edit-org w-100" name="RiskEdit" id="RiskEdit"
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
		
	
	  <!--  org-add modal :::::::::::::::::::::::::::::::::::::::: -->
	
	  <!--  org-edit modal :::::::::::::::::::::::::::::::::::::::: -->
	
	  <div class="modal custom-modal fade" id="edit-org" data-backdrop="static" data-bs-keyboard="false" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
		  <div class="modal-content">
			<div class="modal-header">
			  <h4 class="modal-title">Edit Org</h4>
			  <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
			  <form class="card custom-card border-0">
				<div class="card-body">
				  <div class="grid gap-3">
					<div class="g-col-12 g-col-md-6">
					  <div class="form-group">
						<label for="sub_initative_progress" class="form-label">Attachment</label>
						<div class="attachment-upload">
						  <div class="input-group mb-1">
							<input type="file" class="form-control" id="inputGroupFile02"
							  accept=".pdf,.ppt,.jpeg,.xlsx,.doc,.docx">
							<!-- <label class="input-group-text" for="inputGroupFile02">Upload</label> -->
						  </div>
						  <div class="form-text">Supported file type (jpeg,pdf,pptx,xlsx,docx)</div>
						</div>
					  </div>
					</div>
					<div class="g-col-12 g-col-md-6">
					  <div class="form-group">
						<label for="sub_initative_progress" class="form-label">Department</label>
						<input type="text" class="form-control browser-default" name="" id="" placeholder="Department">
					  </div>
					</div>
					<div class="g-col-12 g-col-md-6">
					  <div class="form-group">
						<label for="sub_initative_progress" class="form-label">Department ID</label>
						<input type="text" class="form-control browser-default" name="" id="" placeholder="Department ID">
					  </div>
					</div>
					<div class="g-col-12 g-col-md-6">
					  <div class="form-group">
						<label for="boardTypeEdit" class="form-label">Owner</label>
						<select class="form-select select-dropdown-edit-org w-100" name="boardTypeCreate" id="boardTypeEdit"
						  data-placeholder="Select Board Type">
						  <option value="" disabled selected hidden>
							Select Board Type
						  </option>
						  <option>Select Board Type</option>
						  <option>Chris</option>
						  <option>Kevin</option>
						  <option>Richard</option>
						  <option>Dhoni</option>
						  <option>Zampa</option>
						  <option>Stark</option>
						  <option>Warner</option>
						  <option>Williamson</option>
						  <option>Finch</option>
						  <option>Zara</option>
						  <option>Rayn</option>
						  <option>Roger</option>
						  <option>Rahul</option>
						  <option>Sandeep</option>
						  <option>Roshan</option>
						  <option>Andrea</option>
						  <option>Nevil</option>
						  <option>Antony</option>
						  <option>Wazim</option>
						  <option>Akram</option>
						  <option>Raza</option>
						  <option>Anderson</option>
						  <option>Rodan</option>
						  <option>Nortch</option>
						  <option>Azeem</option>
						  <option>Kim</option>
						  <option>Rocket</option>
						  <option>gig</option>
						  <option>Zayn</option>
						  <option>Harish</option>
						  <option>Mervin</option>
						  <option>Kiran</option>
						  <option>Rohan</option>
						  <option>Fin</option>
						  <option>Adharsh</option>
							<option>Franck</option>
							<option>Oscar</option>
							<option>Alex</option>
							<option>Brunt</option>
							<option>Ghosh</option>
							<option>verma</option>
							<option>kaur</option>
							<option>capsey</option>
							<option>Glenncy</option>
							<option>Neo</option>
							<option>magesh</option>
							<option>matt</option>
							<option>joseph</option>
							<option>zendaya</option>
						</select>
					  </div>
					</div>
					<div class="g-col-12 g-col-md-6">
					  <div class="form-group">
						<label for="sub_initative_progress" class="form-label">Email</label>
						<input type="text" class="form-control browser-default" name="" id="" placeholder="Email">
					  </div>
					</div>
					<div class="g-col-12 g-col-md-6">
					  <div class="form-group">
						<label for="sub_initative_progress" class="form-label">Members</label>
						<input type="text" class="form-control browser-default" name="" id="" placeholder="Members">
					  </div>
					</div>
					<div class="g-col-12 g-col-md-6">
					  <div class="form-group">
						<label for="ScorecardEdit" class="form-label">Scorecard</label>
						<select class="form-select select-dropdown-edit-org w-100" name="ScorecardEdit" id="ScorecardEdit"
						  data-placeholder="Select Scorecard">
						  <option value="" disabled selected hidden>
							Select Scorecard
						  </option>
						  
						</select>
					  </div>
					</div>
					<div class="g-col-12 g-col-md-6">
					  <div class="form-group">
						<label for="InitiativeEdit" class="form-label">Initiative</label>
						<select class="form-select select-dropdown-edit-org w-100" name="InitiativeEdit" id="InitiativeEdit"
						data-placeholder="Select Initiative">
						<option value="" disabled selected hidden>
						  Select Initiative
						</option>
						</select>
					  </div>
					</div>
					<div class="g-col-12 g-col-md-6">
					  <div class="form-group">
						<label for="KPIEdit" class="form-label">KPI</label>
						<select class="form-select select-dropdown-edit-org w-100" name="KPIEdit" id="KPIEdit"
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
						<select class="form-select select-dropdown-edit-org w-100" name="RiskEdit" id="RiskEdit"
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
			  <button class="btn btn-primary" value="Save">Save</button>
			</div>
		  </div>
		</div>
	  </div>
	
	  <!--  org-edit modal :::::::::::::::::::::::::::::::::::::::: -->
	
	  <!--  delete modal :::::::::::::::::::::::::::::::::::::::: -->
	
	  <div class="modal custom-modal custom-delete-modal fade" id="delete-modal" data-backdrop="static"
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
					<button class="btn btn-sm btn-danger rounded-pill taskConfirmDelete" value="Yes">Delete</button>
				  </div>
				</div>
				</div>
			  </div>
			</div>
	
		  </div>
		</div>
	  </div>


	   <div class="modal custom-modal custom-delete-modal fade" id="delete-modalParent" data-backdrop="static"
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
					<button class="btn btn-sm btn-danger rounded-pill taskConfirmDeleteParent" value="Yes">Delete</button>
				  </div>
				</div>
				</div>
			  </div>
			</div>
	
		  </div>
		</div>
	  </div>
	
	  <!--  delete modal :::::::::::::::::::::::::::::::::::::::: -->
	
	
	  <!--  org-view modal :::::::::::::::::::::::::::::::::::::::: -->
	
	  <div class="modal custom-modal fade" id="org-view" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
		aria-hidden="true">
		<div class="modal-dialog modal-dialog-scrollable modal-xl modal-fullscreen-xl-down">
		  <div class="modal-content">
			<div class="modal-header">
			  <h4 class="modal-title">Organisation Tracker</h4>
			  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
			  <div class="card controlpanel-container org-structure-tab-container">
				<div class="grid gap-0 control-panel-tabs org-structure-tabs">
	
				  <div id="dropdownMenuButtonWrap" class="dropdown control-panel-wrap  g-col-12 g-col-lg-3">
					<button class="btn btn-dark dropdown-toggle d-lg-none" type="button" id="dropdownMenuButton"
					  data-bs-toggle="dropdown" aria-expanded="false">
					  General
					</button>
	
					<!-- <ul class="nav flex-column nav-pills control-panel-tab dropdown-menu" id="v-pills-tab" role="tablist" aria-orientation="vertical"> -->
					<ul class="dropdown-menu" id="v-pills-tab" role="tablist" aria-orientation="vertical">
	
					  <button class="card nav-link active" id="v-pills-general-tab" data-bs-toggle="pill"
						data-bs-target="#v-pills-general" type="button" role="tab" aria-controls="v-pills-general"
						aria-selected="true">
						<span class="nav-text">CEO</span>
					  </button>
					  <button class="card nav-link" id="v-pills-theme-tab" data-bs-toggle="pill"
						data-bs-target="#v-pills-theme" type="button" role="tab" aria-controls="v-pills-theme"
						aria-selected="false">
						<span class="nav-text">ZIMRA</span>
					  </button>
					  <button class="card nav-link" id="v-pills-license-tab" data-bs-toggle="pill"
						data-bs-target="#v-pills-license" type="button" role="tab" aria-controls="v-pills-license"
						aria-selected="false">
						<span class="nav-text">Customer Service</span>
					  </button>
					  <button class="card nav-link" id="v-pills-notifications-tab" data-bs-toggle="pill"
						data-bs-target="#v-pills-notifications" type="button" role="tab"
						aria-controls="v-pills-notifications" aria-selected="false">
						<span class="nav-text">Marketing</span>
					  </button>
					  <button class="card nav-link" id="v-pills-security-tab" data-bs-toggle="pill"
						data-bs-target="#v-pills-security" type="button" role="tab" aria-controls="v-pills-security"
						aria-selected="false">
						<span class="nav-text">Operations</span>
					  </button>
					  <button class="card nav-link" id="v-pills-scheduler-tab" data-bs-toggle="pill"
						data-bs-target="#v-pills-scheduler" type="button" role="tab" aria-controls="v-pills-scheduler"
						aria-selected="false">
						<span class="nav-text">Project Services</span>
					  </button>
					  <button class="card nav-link" id="v-pills-device-tab" data-bs-toggle="pill"
						data-bs-target="#v-pills-device" type="button" role="tab" aria-controls="v-pills-device"
						aria-selected="false">
						<span class="nav-text">Compliance</span>
					  </button>
					  <button class="card nav-link" id="v-pills-backup-restore-tab" data-bs-toggle="pill"
						data-bs-target="#v-pills-backup-restore" type="button" role="tab"
						aria-controls="v-pills-backup-restore" aria-selected="false">
						<span class="nav-text">Product</span>
					  </button>
					  <button class="card nav-link" id="v-pills-scorecard-tab" data-bs-toggle="pill"
						data-bs-target="#v-pills-scorecard" type="button" role="tab" aria-controls="v-pills-scorecard"
						aria-selected="false">
						<span class="nav-text">India</span>
					  </button>
					  <button class="card nav-link" id="v-pills-okr-tab" data-bs-toggle="pill" data-bs-target="#v-pills-okr"
						type="button" role="tab" aria-controls="v-pills-okr" aria-selected="false">
						<span class="nav-text">Kenya</span>
					  </button>
					  <button class="card nav-link" id="v-pills-risk-tab" data-bs-toggle="pill"
						data-bs-target="#v-pills-risk" type="button" role="tab" aria-controls="v-pills-risk"
						aria-selected="false">
						<span class="nav-text">South Africa</span>
					  </button>
					</ul>
	
				  </div>
	
				  <div class="tab-content g-col-12 g-col-lg-9" id="v-pills-tabContent">
					<!-- general :::::::::::::::::::::::::::: -->
					<div class="tab-pane fade show active" id="v-pills-general" role="tabpanel"
					  aria-labelledby="v-pills-general-tab" tabindex="0">
					  <div class="control-panel-content">
						<div class="mb-2 section-title">
						  <h5>CEO</h5>
						</div>
						<div class="org-structure-table">
						  <table class="table table-bordered organisationTracker" style="width: 100%;">
							<thead class="text-center">
							  <tr>
								<th>Parent</th>
								<th>Owner</th>
								<th>Department</th>
								<th>Email</th>
								<th>Pages</th>
								<th>From Date</th>
								<th>To Date</th>
							  </tr>
							</thead>
							<tbody>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>CEO Scorecard</td>
								<td>19/10/2022</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>My Meetings</td>
								<td>08/11/2022</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>PESTEL</td>
								<td>08/11/2022</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>SWOT</td>
								<td>08/11/2022</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>Raza Page</td>
								<td>10/11/2022</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>Strategy Formulation</td>
								<td>28/01/2023</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>Project Planning</td>
								<td>03/02/2023</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>RIsk Plan</td>
								<td>08/02/2023</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>TIMB PESTEL</td>
								<td>07/03/2023</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>TIMB SWOT</td>
								<td>07/03/2023</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>TIMB Initiatives</td>
								<td>08/03/2023</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>TIMB RISK</td>
								<td>08/03/2023</td>
								<td>13/07/2024</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>Project Trial</td>
								<td>13/04/2023</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>Esg score card</td>
								<td>11/05/2023</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>Esg initiatives</td>
								<td>12/05/2023</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>Esg risk</td>
								<td>12/05/2023</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>Esg cockpit</td>
								<td>12/05/2023</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td></td>
								<td>28/07/2023</td>
								<td>25/07/2024</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>Cockpit Layer</td>
								<td>15/08/2023</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>Charts Layer</td>
								<td>15/08/2023</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>initiative test</td>
								<td>20/09/2023</td>
								<td>19/03/2024</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>charts test</td>
								<td>21/09/2023</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>charts new</td>
								<td>21/09/2023</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>Berhan Reports</td>
								<td>21/09/2023</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>meetings</td>
								<td>25/09/2023</td>
								<td>19/03/2024</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>kleen heat</td>
								<td>11/11/2023</td>
								<td>19/03/2024</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>Scorecard new test1</td>
								<td>02/01/2024</td>
								<td>02/01/2024</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>LTD SCORECARD</td>
								<td>15/04/2024</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>LTD SCORECARD</td>
								<td>15/04/2024</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>new</td>
								<td>13/05/2024</td>
								<td>04/07/2024</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>VGN Reports</td>
								<td>24/05/2024</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>STRATEMAP2024</td>
								<td>30/05/2024</td>
								<td>04/07/2024</td>
							  </tr>
							  <tr>
								<td>CEO</td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>Risk new</td>
								<td>11/07/2024</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>New Risk</td>
								<td>12/07/2024</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>RPO New</td>
								<td>12/07/2024</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>Impact Survey</td>
								<td>12/07/2024</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>Process Enabaler</td>
								<td>12/07/2024</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>Performance Cockpit</td>
								<td>13/07/2024</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>KRA risk</td>
								<td>13/07/2024</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td></td>
								<td>25/07/2024</td>
								<td>03/09/2024</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>intiative</td>
								<td>29/07/2024</td>
								<td>31/07/2024</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>Kpi drilldown report</td>
								<td>01/08/2024</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>Financial scorecard</td>
								<td>01/08/2024</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td></td>
								<td>03/09/2024</td>
								<td>20/09/2024</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>raza approval page </td>
								<td>12/09/2024</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td></td>
								<td>20/09/2024</td>
								<td>23/09/2024</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td></td>
								<td>23/09/2024</td>
								<td>24/09/2024</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td></td>
								<td>24/09/2024</td>
								<td>24/09/2024</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td></td>
								<td>24/09/2024</td>
								<td>24/09/2024</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td></td>
								<td>24/09/2024</td>
								<td>24/09/2024</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td></td>
								<td>24/09/2024</td>
								<td>24/09/2024</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td></td>
								<td>24/09/2024</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>CEO Strategy Map</td>
								<td>17/10/2024</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td></td>
								<td>Raza</td>
								<td>CEO</td>
								<td>Roman@demo.com</td>
								<td>All Initiatives View</td>
								<td>17/10/2024</td>
								<td>Present</td>
							  </tr>
							</tbody>
						  </table>
						</div>
					  </div>
					</div>
					<!-- general END:::::::::::::::::::::::::::: -->
	
					<!-- theme :::::::::::::::::::::::::::: -->
					<div class="tab-pane fade" id="v-pills-theme" role="tabpanel" aria-labelledby="v-pills-theme-tab"
					  tabindex="0">
					  <div class="control-panel-content">
						<div class="mb-2 section-title">
						  <h5>ZIMRA</h5>
						</div>
						<div class="org-structure-table">
						  <table class="table table-bordered organisationTracker" style="width: 100%;">
							<thead class="text-center">
							  <tr>
								<th>Parent</th>
								<th>Owner</th>
								<th>Department</th>
								<th>Email</th>
								<th>Pages</th>
								<th>From Date</th>
								<th>To Date</th>
							  </tr>
							</thead>
							<tbody>
							  <tr>
								<td>MOF</td>
								<td>Chris</td>
								<td>ZIMRA</td>
								<td></td>
								<td>Sales Scorecard</td>
								<td>19/10/2022</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td>MOF</td>
								<td>Chris</td>
								<td>ZIMRA</td>
								<td></td>
								<td>Sales Initiatives</td>
								<td>27/10/2022</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td>MOF</td>
								<td>Chris</td>
								<td>ZIMRA</td>
								<td></td>
								<td>Chris Space</td>
								<td>24/11/2022</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td>MOF</td>
								<td>Chris</td>
								<td>ZIMRA</td>
								<td></td>
								<td>charts</td>
								<td>19/04/2023</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td>MOF</td>
								<td>Chris</td>
								<td>ZIMRA</td>
								<td></td>
								<td>cockpit</td>
								<td>19/04/2023</td>
								<td>Present</td>
							  </tr>
							  <tr>
								<td>MOF</td>
								<td>Chris</td>
								<td>ZIMRA</td>
								<td></td>
								<td></td>
								<td>03/08/2023</td>
								<td>25/07/2024</td>
							  </tr>
							  <tr>
								<td>MOF</td>
								<td>Chris</td>
								<td>ZIMRA</td>
								<td></td>
								<td></td>
								<td>25/07/2024</td>
								<td>Present</td>
							  </tr>
							</tbody>
						  </table>
						  
						</div>
					  </div>
	
					</div>
					<!-- theme END:::::::::::::::::::::::::::: -->
	
					<!-- license :::::::::::::::::::::::::::: -->
					<div class="tab-pane fade" id="v-pills-license" role="tabpanel" aria-labelledby="v-pills-license-tab"
					  tabindex="0">
					  <div class="control-panel-content">
						<div class="mb-2 section-title">
						  <h5>Customer Services</h5>
						</div>
						<div class="org-structure-table">
						  <!-- <div class="table-responsive"> -->
						  <div>
							<table class="table table-bordered organisationTracker" style="width: 100%;">
							  <thead class="text-center">
								<tr>
								  <th>Parent</th>
								  <th>Owner</th>
								  <th>Department</th>
								  <th>Email</th>
								  <th>Pages</th>
								  <th>From Date</th>
								  <th>To Date</th>
								</tr>
							  </thead>
							  <tbody>
								<tr>
								  <td>MOF</td>
								  <td>Kevin</td>
								  <td>Customer Services</td>
								  <td></td>
								  <td>Customer Services Scorecard</td>
								  <td>19/10/2022</td>
								  <td>Present</td>
								</tr>
								<tr>
								  <td>MOF</td>
								  <td>Kevin</td>
								  <td>Customer Services</td>
								  <td></td>
								  <td></td>
								  <td>19/10/2022</td>
								  <td>Present</td>
								</tr>
								<tr>
								  <td>MOF</td>
								  <td>Kevin</td>
								  <td>Customer Services</td>
								  <td></td>
								  <td>Customer initiative</td>
								  <td>27/10/2022</td>
								  <td>Present</td>
								</tr>
							  </tbody>
							</table>
						  </div>
						  <!-- <nav aria-label="Page navigation example" class="mt-3 paginations">
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
						  </nav> -->
						</div>
					  </div>
					</div>
					<!-- license END:::::::::::::::::::::::::::: -->
	
					<!-- notifications :::::::::::::::::::::::::::: -->
					<div class="tab-pane fade" id="v-pills-notifications" role="tabpanel"
					  aria-labelledby="v-pills-notifications-tab" tabindex="0">
					  <div class="control-panel-content">
						<div class="mb-2 section-title">
						  <h5>Marketing</h5>
						</div>
						<div class="org-structure-table">
						  <!-- <div class="table-responsive"> -->
						  <div>
							<table class="table table-bordered organisationTracker" style="width: 100%;">
							  <thead class="text-center">
								<tr>
								  <th>Parent</th>
								  <th>Owner</th>
								  <th>Department</th>
								  <th>Email</th>
								  <th>Pages</th>
								  <th>From Date</th>
								  <th>To Date</th>
								</tr>
							  </thead>
							  <tbody>
								<tr>
								  <td>MOF</td>
								  <td>Kevin</td>
								  <td>Customer Services</td>
								  <td></td>
								  <td>Customer Services Scorecard</td>
								  <td>19/10/2022</td>
								  <td>Present</td>
								</tr>
								<tr>
								  <td>MOF</td>
								  <td>Kevin</td>
								  <td>Customer Services</td>
								  <td></td>
								  <td></td>
								  <td>19/10/2022</td>
								  <td>Present</td>
								</tr>
								<tr>
								  <td>MOF</td>
								  <td>Kevin</td>
								  <td>Customer Services</td>
								  <td></td>
								  <td>Customer initiative</td>
								  <td>27/10/2022</td>
								  <td>Present</td>
								</tr>
							  </tbody>
							</table>
						  </div>
						 
						</div>
					  </div>
					</div>
					<!-- notifications END:::::::::::::::::::::::::::: -->
	
					<!-- security :::::::::::::::::::::::::::: -->
					<div class="tab-pane fade" id="v-pills-security" role="tabpanel" aria-labelledby="v-pills-security-tab"
					  tabindex="0">
					  <div class="control-panel-content">
						<div class="mb-2 section-title">
						  <h5>Operations</h5>
						</div>
						<div class="org-structure-table">
						  <!-- <div class="table-responsive"> -->
						  <div>
							<table class="table table-bordered organisationTracker" style="width: 100%;">
							  <thead class="text-center">
								<tr>
								  <th>Parent</th>
								  <th>Owner</th>
								  <th>Department</th>
								  <th>Email</th>
								  <th>Pages</th>
								  <th>From Date</th>
								  <th>To Date</th>
								</tr>
							  </thead>
							  <tbody>
								<tr>
								  <td>MOF</td>
								  <td>Dhoni</td>
								  <td>Operations</td>
								  <td>Dhoni@demo.com</td>
								  <td>Operations Scorecard</td>
								  <td>19/10/2022</td>
								  <td>Present</td>
								</tr>
								<tr>
								  <td>MOF</td>
								  <td>Dhoni</td>
								  <td>Operations</td>
								  <td>Dhoni@demo.com</td>
								  <td>Operations Initiative</td>
								  <td>28/10/2022</td>
								  <td>Present</td>
								</tr>
								<tr>
								  <td>Board of directors</td>
								  <td>Dhoni</td>
								  <td>Operations</td>
								  <td>Dhoni@demo.com</td>
								  <td>Tobacco Industry Operations Scorecard</td>
								  <td>30/11/2022</td>
								  <td>Present</td>
								</tr>
								<tr>
								  <td>Ministry of Agriculture</td>
								  <td>Dhoni</td>
								  <td>Operations</td>
								  <td>Dhoni@demo.com</td>
								  <td></td>
								  <td>06/12/2022</td>
								  <td>06/02/2024</td>
								</tr>
								<tr>
								  <td>Ministry of Agriculture</td>
								  <td>Dhoni</td>
								  <td>Operations</td>
								  <td>Dhoni@demo.com</td>
								  <td>My Space</td>
								  <td>09/03/2023</td>
								  <td>Present</td>
								</tr>
								<tr>
								  <td>Ministry of Agriculture</td>
								  <td>Zampa</td>
								  <td>Operations</td>
								  <td>Dhoni@demo.com</td>
								  <td></td>
								  <td>06/02/2024</td>
								  <td>06/02/2024</td>
								</tr>
								<tr>
								  <td>Public Service Commission</td>
								  <td>Zampa</td>
								  <td>Operations</td>
								  <td>Dhoni@demo.com</td>
								  <td></td>
								  <td>06/02/2024</td>
								  <td>Present</td>
								</tr>
							  </tbody>
							</table>
						  </div>
						
						</div>
					  </div>
					</div>
					<!-- security END:::::::::::::::::::::::::::: -->
	
					<!-- scheduler :::::::::::::::::::::::::::: -->
					<div class="tab-pane fade" id="v-pills-scheduler" role="tabpanel"
					  aria-labelledby="v-pills-scheduler-tab" tabindex="0">
					  <div class="control-panel-content">
						<div class="mb-2 section-title">
						  <h5>Project Services</h5>
						</div>
						<div class="org-structure-table">
						  <!-- <div class="table-responsive"> -->
						  <div>
							<table class="table table-bordered organisationTracker" style="width: 100%;">
							  <thead class="text-center">
								<tr>
								  <th>Parent</th>
								  <th>Owner</th>
								  <th>Department</th>
								  <th>Email</th>
								  <th>Pages</th>
								  <th>From Date</th>
								  <th>To Date</th>
								</tr>
							  </thead>
							  <tbody>
								<tr>
								  <td>MOF</td>
								  <td>Zampa</td>
								  <td>Project Services</td>
								  <td>Zampa@demo.com</td>
								  <td>Project Services Scorecard</td>
								  <td>19/10/2022</td>
								  <td>Present</td>
								</tr>
								<tr>
								  <td>MOF</td>
								  <td>Zampa</td>
								  <td>Project Services</td>
								  <td>Zampa@demo.com</td>
								  <td>ScoreCard</td>
								  <td>06/12/2022</td>
								  <td>Present</td>
								</tr>
								<tr>
								  <td>Digital Sales</td>
								  <td>Zampa</td>
								  <td>Project Services</td>
								  <td>Zampa@demo.com</td>
								  <td></td>
								  <td>01/09/2023</td>
								  <td>Present</td>
								</tr>
							  </tbody>
							</table>
						  </div>
						  
						</div>
					  </div>
					</div>
					<!-- scheduler END:::::::::::::::::::::::::::: -->
	
					<!-- device :::::::::::::::::::::::::::: -->
					<div class="tab-pane fade" id="v-pills-device" role="tabpanel" aria-labelledby="v-pills-device-tab"
					  tabindex="0">
					  <div class="control-panel-content">
						<div class="mb-2 section-title">
						  <h5>Compliance</h5>
						</div>
						<div class="org-structure-table">
						  <!-- <div class="table-responsive"> -->
						  <div>
							<table class="table table-bordered organisationTracker" style="width: 100%;">
							  <thead class="text-center">
								<tr>
								  <th>Parent</th>
								  <th>Owner</th>
								  <th>Department</th>
								  <th>Email</th>
								  <th>Pages</th>
								  <th>From Date</th>
								  <th>To Date</th>
								</tr>
							  </thead>
							  <tbody>
								<tr>
								  <td>MOF</td>
								  <td>Stark</td>
								  <td>Compliance</td>
								  <td></td>
								  <td>Compliance Scorecard</td>
								  <td>19/10/2022</td>
								  <td>Present</td>
								</tr>
								<tr>
								  <td>MOF</td>
								  <td>Stark</td>
								  <td>Compliance</td>
								  <td></td>
								  <td></td>
								  <td>19/10/2022</td>
								  <td>Present</td>
								</tr>
								<tr>
								  <td>MOF</td>
								  <td>Stark</td>
								  <td>Compliance</td>
								  <td></td>
								  <td>PSOB Compliance Scorecard</td>
								  <td>06/11/2022</td>
								  <td>Present</td>
								</tr>
							  </tbody>
							</table>
						  </div>
						  
						</div>
					  </div>
					</div>
					<!-- device END:::::::::::::::::::::::::::: -->
	
					<!-- backup-restore:::::::::::::::::::::::::::: -->
					<div class="tab-pane fade" id="v-pills-backup-restore" role="tabpanel"
					  aria-labelledby="v-pills-backup-restore-tab" tabindex="0">
					  <div class="control-panel-content">
						<div class="mb-2 section-title">
						  <h5>Product</h5>
						</div>
						<div class="org-structure-table">
						  <!-- <div class="table-responsive"> -->
						  <div>
							<table class="table table-bordered organisationTracker" style="width: 100%;">
							  <thead class="text-center">
								<tr>
								  <th>Parent</th>
								  <th>Owner</th>
								  <th>Department</th>
								  <th>Email</th>
								  <th>Pages</th>
								  <th>From Date</th>
								  <th>To Date</th>
								</tr>
							  </thead>
							  <tbody>
								<tr>
								  <td>MOF</td>
								  <td>Zara</td>
								  <td>Product</td>
								  <td></td>
								  <td>Product Scorecard</td>
								  <td>19/10/2022</td>
								  <td>Present</td>
								</tr>
								<tr>
								  <td>MOF</td>
								  <td>Zara</td>
								  <td>Product</td>
								  <td></td>
								  <td></td>
								  <td>19/10/2022</td>
								  <td>Present</td>
								</tr>
							  </tbody>
							</table>
						  </div>
						  
						</div>
					  </div>
					</div>
					<!-- backup-restore END:::::::::::::::::::::::::::: -->
	
					<!-- scorecard :::::::::::::::::::::::::::: -->
					<div class="tab-pane fade" id="v-pills-scorecard" role="tabpanel"
					  aria-labelledby="v-pills-scorecard-tab" tabindex="0">
					  <div class="control-panel-content">
						<div class="mb-2 section-title">
						  <h5>India</h5>
						</div>
						<div class="org-structure-table">
						  <!-- <div class="table-responsive"> -->
						  <div>
							<table class="table table-bordered organisationTracker" style="width: 100%;">
							  <thead class="text-center">
								<tr>
								  <th>Parent</th>
								  <th>Owner</th>
								  <th>Department</th>
								  <th>Email</th>
								  <th>Pages</th>
								  <th>From Date</th>
								  <th>To Date</th>
								</tr>
							  </thead>
							  <tbody>
								<tr>
								  <td>Country Sales</td>
								  <td>Roshan</td>
								  <td>India</td>
								  <td></td>
								  <td>India Sales Scorecard</td>
								  <td>19/10/2022</td>
								  <td>Present</td>
								</tr>
								<tr>
								  <td>Country Sales</td>
								  <td>Roshan</td>
								  <td>India</td>
								  <td></td>
								  <td></td>
								  <td>19/10/2022</td>
								  <td>27/03/2024</td>
								</tr>
								<tr>
								  <td>Country Sales</td>
								  <td>Roshan</td>
								  <td>India</td>
								  <td></td>
								  <td></td>
								  <td>27/03/2024</td>
								  <td>Present</td>
								</tr>
								<tr>
								  <td>Country Sales</td>
								  <td>Roshan</td>
								  <td>India</td>
								  <td></td>
								  <td>India Scorecard</td>
								  <td>24/09/2024</td>
								  <td>24/09/2024</td>
								</tr>
							  </tbody>
							</table>
						  </div>
						
						</div>
					  </div>
					</div>
					<!-- scorecard END:::::::::::::::::::::::::::: -->
	
					<!-- okr :::::::::::::::::::::::::::: -->
					<div class="tab-pane fade" id="v-pills-okr" role="tabpanel" aria-labelledby="v-pills-okr-tab"
					  tabindex="0">
					  <div class="control-panel-content">
						<div class="mb-2 section-title">
						  <h5>Kenya</h5>
						</div>
						<div class="org-structure-table">
						  <!-- <div class="table-responsive"> -->
						  <div>
							<table class="table table-bordered organisationTracker" style="width: 100%;">
							  <thead class="text-center">
								<tr>
								  <th>Parent</th>
								  <th>Owner</th>
								  <th>Department</th>
								  <th>Email</th>
								  <th>Pages</th>
								  <th>From Date</th>
								  <th>To Date</th>
								</tr>
							  </thead>
							  <tbody>
								<tr>
								  <td>Country Sales</td>
								  <td>Andrea</td>
								  <td>Kenya</td>
								  <td></td>
								  <td>Kenya Sales Scorecard</td>
								  <td>19/10/2022</td>
								  <td>Present</td>
								</tr>
								<tr>
								  <td>Country Sales</td>
								  <td>Andrea</td>
								  <td>Kenya</td>
								  <td></td>
								  <td></td>
								  <td>19/10/2022</td>
								  <td>Present</td>
								</tr>
							  </tbody>
							</table>
						  </div>
						 
						</div>
					  </div>
					</div>
					<!-- okr END:::::::::::::::::::::::::::: -->
	
					<!-- risk END:::::::::::::::::::::::::::: -->
					<div class="tab-pane fade" id="v-pills-risk" role="tabpanel" aria-labelledby="v-pills-risk-tab"
					  tabindex="0">
					  <div class="control-panel-content">
						<div class="mb-2 section-title">
						  <h5>South Africa</h5>
						</div>
						<div class="org-structure-table">
						  <!-- <div class="table-responsive"> -->
						  <div>
							<table class="table table-bordered organisationTracker" style="width: 100%;">
							  <thead class="text-center">
								<tr>
								  <th>Parent</th>
								  <th>Owner</th>
								  <th>Department</th>
								  <th>Email</th>
								  <th>Pages</th>
								  <th>From Date</th>
								  <th>To Date</th>
								</tr>
							  </thead>
							  <tbody>
								<tr>
								  <td>Country Sales</td>
								  <td>Nevil</td>
								  <td>South Africa</td>
								  <td></td>
								  <td>South Africa Sales Scorecard</td>
								  <td>19/10/2022</td>
								  <td>Present</td>
								</tr>
								<tr>
								  <td>Country Sales</td>
								  <td>Nevil</td>
								  <td>South Africa</td>
								  <td></td>
								  <td></td>
								  <td>19/10/2022</td>
								  <td>Present</td>
								</tr>
							  </tbody>
							</table>
						  </div>
						  
						</div>
					  </div>
					</div>
					<!-- risk END:::::::::::::::::::::::::::: -->
	
	
				  </div>
				  <!-- TAB CONTENT END:::::::::::::::::::::::::::: -->
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	
	  <!-- org-view END -->
	
	  <!-- File Validate Form -->
	  <div class="modal custom-modal fade" id="org-import" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
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
	
	
			  <div id="file-upload" class="card custom-card" >
				<div class="card-body grid gap-3">                   
					  
					  <div class="g-col-12">
						<div class="form-group">
						  <label for="importCategory" class="form-label">Import Category</label>
						  <select class="form-select select-dropdown-file-upload w-100" name="importCategory" id="importCategory"
						  data-placeholder="Select Import Category">
						  <option value="" disabled selected hidden>
							Select Import Category
						  </option>
							<option value="Organisation Import">Organisation</option>
							<option value="ETLUpload">Data Upload</option>
							<option value="XLSUpload">Excel File Upload</option>
							<option value="Scorecard Import">Scorecard</option>
							<option value="InitiativeDataLoad">Initiatives Data Load</option>
							<option value="InitiativeBudgetLoad">Initiatives Budget Load</option>
							<option value="Initiative Import">Initiatives & Projects</option>
							<option value="Risk Import">Risk</option>
						  </select>
						</div>
					  </div>
					  <div class="g-col-12">
						<div class="form-group">
						  <label for="" class="form-label">Upload File</label>
						  <label for="login" class="upload-label upload-box">
							<div class="upload">Choose a file or drag it here.</div>
							<input type="file" id="login">
						  </label>
						</div>
									 
								   
					</div>                           
				</div>   
				<div class="card-footer">
				  <div class="d-flex justify-content-between form-line">
				  <button class="btn btn-primary initative_save_btn ms-auto" id="next-btn-1">
				  Next
				</button>
			  </div> 
			  </div>         
			  </div>
	
			  <div class="card custom-card" id="file-validate" style="display: none">
				<div class="card-body grid gap-3">
				<div class="g-col-12 img-center">
				  <!-- <img
						src="assets/images/verified.png"
						alt="Verified"
					  /> -->
				  <img src="/stratroom/images/Not-Verified.png" alt="Not-Verified" />
				  <div class="error-div">
					<table class="error-table">
					  <thead>
						<tr>
						  <th style="width: 150px">Row</th>
						  <th>Error</th>
						</tr>
					  </thead>
					  <tbody>
						<tr>
						  <td style="width: 150px">1</td>
						  <td>Contain Special Character</td>
						</tr>
						<tr>
						  <td style="width: 150px">3</td>
						  <td>Contain Special Character</td>
						</tr>
						<tr>
						  <td style="width: 150px">5</td>
						  <td>Contain Special Character</td>
						</tr>
						<tr>
						  <td style="width: 150px">8</td>
						  <td>Contain Special Character</td>
						</tr>
						<tr>
						  <td style="width: 150px">10</td>
						  <td>Contain Special Character</td>
						</tr>
						<tr>
						  <td style="width: 150px">19</td>
						  <td>Contain Special Character</td>
						</tr>
					  </tbody>
					</table>
				  </div>
				</div>
			   
				
			  </div>
			  <div class="card-footer">
				<div class="d-flex justify-content-between form-line">
				  <button type="button" class="btn btn-label-secondary btn-default1" id="prev-btn1">
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
					<img src="/stratroom/images/Success.png" alt="Verified" width="140" />
				  </div>
				</div>
			  </div>
			   
				<div class="card-footer">
				  <div class="d-flex justify-content-between form-line">
					<button type="button" class="btn btn-label-secondary" id="prev-btn2">
					  Previous
					</button>
					<button class="btn btn-primary initative_save_btn" id="done-btn" data-dismiss="modal"
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

    <!--  delete modal :::::::::::::::::::::::::::::::::::::::: -->
	  <div id="task-add-modal" class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
  role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="myLargeModalLabel_1" data-translate="Task Description">Task Description</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="card custom-card border-0">
          <div class="modal-body">
            <div class="grid gap-3">
              <div class="g-col-12 g-col-md-4">

                <div class="form-group">
                  <label for="taskId-add" class="form-label" data-translate="Task ID">Task Id</label>
                  <input type="text" class="form-control" name="taskId" id="taskId" disabled
                    placeholder="Task Id">
                </div>
              </div>
              <div class="g-col-12 g-col-md-12">
                <div class="form-group">
                  <label for="taskName-add" class="form-label" data-translate="Task Name">Task Name</label>
                  <textarea class="form-control" autocomplete="off" name="taskName" id="taskName-add" cols=""
                    rows="3" placeholder="Task Name"></textarea>
                </div>
              </div>
              <!-- <div class="g-col-12 g-col-md-6">
                <div class="form-group">
                  <label for="taskCategory-add" class="form-label">Category</label>
                  <select id="taskCategory-add" name="taskCategory" class="form-select selectdrop-add-task" aria-invalid="false" data-placeholder="Select category">
                    <option value="" selected disabled>Select Category</option>
                    <option value="concrete_work">Concrete Work</option>
                    <option value="electrical_work">Electrical Work</option>
                    <option value="dinishing">Finishing</option>
                    
                  </select>
                </div>
              </div> -->

              <!-- <div class="g-col-12 g-col-md-6">
                <div class="form-group">
                  <label for="taskImpact-add" class="form-label" data-translate="Impact">Impact</label>
                  <select id="taskImpact-add" name="taskImpact" class="form-select selectdrop-add-task" aria-invalid="false" data-placeholder="Select Impact">
                    
                    <option value="scorecard">Scorecard </option>
                    <option value="initiatives">Initiatives </option>
                    <option value="risk">Risk</option>
                    <option value="swot">Swot</option>
                    <option value="pestle">Pestle</option>
                    <option value="meetings">Meetings</option>                                                     
                  </select>
                </div>
              </div> -->

              <div class="g-col-12 g-col-md-6">
                <div class="form-group">
                  <label for="taskPriority-add" class="form-label" data-translate="Priority">Priority</label>
                  <select id="taskPriority-add" name="taskPriority" class="form-select selectdrop-add-task" aria-invalid="false" data-placeholder="Select Priority">
                    <option value="" selected disabled>Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                                 
                    
                  </select>
                </div>
              </div>
              <div class="g-col-12 g-col-md-6">
                <div class="form-group">
                  <label for="taskStatus-add" class="form-label" data-translate="Status">Status</label>
                  <select id="taskStatus-add" name="taskStatus-add" class="form-select selectdrop-add-task" aria-invalid="false" data-placeholder="Select Status">
                    <option value="" selected disabled>Select Status</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>                  
                    
                  </select>
                </div>
              </div>
              <div class="g-col-12 g-col-md-6">
                <div class="form-group">
                  <label for="taskStartDueDate-add" class="form-label" data-translate="Start Date">Start Date</label>
                  <input type="text" class="form-control datePicker" placeholder="Start Date" name="startDate"
                    data-language="en" autocomplete="off" id="askStartDate-add">
                </div>
              </div>

			  <div class="g-col-12 g-col-md-6">
                <div class="form-group">
                  <label for="taskStartDueDate-add" class="form-label" data-translate="Due Date">Due Date</label>
                  <input type="text" class="form-control datePicker" placeholder="Due Date" name="endDate"
                    data-language="en" autocomplete="off" id="askDueDate-add">
                </div>
              </div>
              <div class="g-col-12 g-col-md-6">
                <div class="form-group">
                  <label for="taskProgress-add" class="form-label" data-translate="Progress (%)">Progress (%)</label>
                  <input type="text" class="form-control" name="taskProgress" id="taskProgress-add"
                    placeholder="Progress (%)" />
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close" data-translate="Cancel">
          Cancel
        </button>
        <button class="btn btn-primary" value="Save" onclick="handleSave()" data-translate="Save">Save</button>

        <div class="modal-audit">

          <div class="audit-listing">
            <div class="audit-box">
              <div class="title" data-translate="Created By">Created By :</div>
              <!-- <div class="text">Arun</div> -->
            </div>
            <div class="audit-box">
              <div class="title" data-translate="Modified By"> Modified By :</div>
              <!-- <div class="text">Karthik</div> -->
            </div>
            <div class="audit-box">
              <div class="title" data-translate="Created Date">Created Date :</div>
              <!-- <div class="text">Oct 02, 2019</div> -->
            </div>
            <div class="audit-box">
              <div class="title" data-translate="Modified Date">Modified Date :</div>
              <!-- <div class="text">Oct 02, 2019</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



<div class="modal custom-modal fade" id="parent_attendess-list" data-bs-backdrop="static" data-bs-keyboard="false"
  tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Edit Users</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="handleParentAddUsers()"></button>
      </div>

      <div class="modal-body d-grid gap-3">
        <div class="attendees-search">
          <div>
            <div class="form-check cusom-check">
              <input class="form-check-input" type="checkbox" value="" id="allusers">
              <label class="form-check-label" for="allusers">
                All Users
              </label>
            </div>
          </div>
          <div class="search">
            <div class="input-group input-group-sm">
              <input type="text" class="form-control" placeholder="Search users"
                aria-label="Search users" aria-describedby="button-addon2" id="userSearchInputParent">
              <button class="btn btn-outline-secondary" type="button" id="button-addon2">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="list-group add-attendees" id="attendeesListContainerParent">
          <!-- Users will be dynamically added here -->
        </div>
      </div>
    </div>
  </div>
</div>




<div class="modal custom-modal fade" id="attendess-list" data-bs-backdrop="static" data-bs-keyboard="false"
  tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Edit Users</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="handleAddUsers()"></button>
      </div>

      <div class="modal-body d-grid gap-3">
        <div class="attendees-search">
          <div>
            <div class="form-check cusom-check">
              <input class="form-check-input" type="checkbox" value="" id="allusers">
              <label class="form-check-label" for="allusers">
                All Users
              </label>
            </div>
          </div>
          <div class="search">
            <div class="input-group input-group-sm">
              <input type="text" class="form-control" placeholder="Search users"
                aria-label="Search users" aria-describedby="button-addon2" id="userSearchInput">
              <button class="btn btn-outline-secondary" type="button" id="button-addon2">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="list-group add-attendees" id="attendeesListContainer">
          <!-- Users will be dynamically added here -->
        </div>
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
    <!-- <script src="js/datepickerair.js"></script>
    <script src="js/datepicker.en.js"></script> -->
    <script src="${contextroot}/js/widgets.js"></script>
    <script src="${contextroot}/js/notify.js"></script>
    <script src="js/initial.js"></script>
	<script src="js/custom/jquery.orgchart.js"></script>
	<script src="${contextroot}/js/task.js"></script>
    <script src="${contextroot}/js/select2.min.js"></script>






    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>





	<script type="text/javascript">
		$(document).ready(function () {
			if($("#userrolename").val()	==	"Super User" || $("#userrolename").val()	==	"Admin"){
				if($("#userPrincipal").val()	!= $("#userPrincipalnavigate").val()){
					$(".subusermenuname").text('Organization');
					$(".subuserlink").addClass("homepageHighlight");
					if($(".topmenubreadcrumb").length){
						$(".topmenubreadcrumb").show();
					}
					if($(".sidebarNavigate").length){
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
			var imageUpdate	=	$("#upload_link1").attr("src");
			if(imageUpdate	==	"/stratroom/images/media.png"){
				imageUpdate	=	"";
			}
			if($("#upload_link1").attr("data-imageset")	==	"notset"){
				imageUpdate	=	"";
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
			
			if($("#deptuserscorecard").val()	!=	""){	
				employeeObj.push({
					"active":0,
					"pageId":$("#deptuserscorecard").val(),
					"type":"SCORECARD",
					"typeName":"SCORECARD",
					"typeId":$("#deptuserscorecard").val(),
					"empId":$("#dept_emp_show_id").val()
				});
			}
			
			if($("#deptuserinitiative").val()	!=	""){	
				employeeObj.push({
					"active":0,
					"pageId":$("#deptuserinitiative").val(),//$("#userinitiative").find(':selected').data('pageid')
					"type":"INITIATIVE",
					"typeName":"INITIATIVE",
					"typeId":$("#deptuserinitiative").val(),
					"empId":$("#dept_emp_show_id").val()
				});
			}
			
			if($("#deptuserkpi").val()	!=	""){	
				employeeObj.push({
					"active":0,
					"pageId":$("#deptuserkpi").find(':selected').data('pageid'),
					"type":"KPI",
					"typeName":"KPI",
					"typeId":$("#deptuserkpi").val(),
					"empId":$("#dept_emp_show_id").val()
				});
			}
			
			if($("#deptuserrisk").val()	!=	""){	
				employeeObj.push({
					"active":0,
					"pageId":$("#deptuserrisk").val(),
					"type":"RISK",
					"typeName":"RISK",
					"typeId":$("#deptuserrisk").val(),
					"empId":$("#dept_emp_show_id").val()
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
			if($("#upload_link2").attr("data-imageset")	==	"notset"){
				imageUpdate	=	"";
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
		
		function updateformvalidationerrorreset(){
			$("#edit_org_structure_form span[style='color: red']").each(function() {
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
			
			if($("#userscorecard").val()	!=	""){	
				employeeObj.push({
					"active":0,
					"pageId":$("#userscorecard").val(),
					"type":"SCORECARD",
					"typeName":"SCORECARD",
					"typeId":$("#userscorecard").val(),
					"empId":$("#emp_show_id").val()
				});
			}
			
			if($("#userinitiative").val()	!=	""){	
				employeeObj.push({
					"active":0,
					"pageId":$("#userinitiative").val(),//$("#userinitiative").find(':selected').data('pageid')
					"type":"INITIATIVE",
					"typeName":"INITIATIVE",
					"typeId":$("#userinitiative").val(),
					"empId":$("#emp_show_id").val()
				});
			}
			
			if($("#userkpi").val()	!=	""){	
				employeeObj.push({
					"active":0,
					"pageId":$("#userkpi").find(':selected').data('pageid'),
					"type":"KPI",
					"typeName":"KPI",
					"typeId":$("#userkpi").val(),
					"empId":$("#emp_show_id").val()
				});
			}
			
			if($("#userrisk").val()	!=	""){	
				employeeObj.push({
					"active":0,
					"pageId":$("#userrisk").val(),
					"type":"RISK",
					"typeName":"RISK",
					"typeId":$("#userrisk").val(),
					"empId":$("#emp_show_id").val()
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
			if (e.keyCode === 27) { // ESC
				$("#close-org-aside").click();
			}
		});

		$("#editorgdeptid").on('keypress focusout blur', function () {
			$("#deptiduniqeueerrorshow").hide();
			if($(this).prop("readonly")){
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
			if($("#deptiduniqeueerrorshow").css('display') ==	"none"){
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
			if($("#employeedepterrorshow1").css('display') !=	"none"){
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
		
		function addformvalidationerrorreset(){
			$("#add_org_structure_form span[style='color: red']").each(function() {
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
			if($("#upload_link_dept").attr("data-imageset")	==	"notset"){
				imagesrc	=	"";
			}
			var dept	=	"";
			if($("#deptmode").val() == "add"){
				dept	=	$("#orgdept").val();
			}else{
				//dept	=	$("#editorgdept option:selected").text();
				dept	=	$("#editorgdept").val();
			}
			
			var employeeObj = {
				"owner":$("#ownername").val(),	
				"empIdList": $(".userdept-name-multi-select").val(),
				"scorecardPageId": $('#deptuserscorecard').val(),
				"initiativePageId": $("#deptuserinitiative").val(),
				"kpiId": $("#deptuserkpi").val(),
				"riskPageId": $("#deptuserrisk").val(),
				"emailAddress":$("#deptemailadd").val(),
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
				error:readErrorMsg
			});
		}
		
		function adddeptformvalidationerrorreset(){
			$("#add_dept_structure_form span[style='color: red']").each(function() {
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
			if($("#orgdept").is(":visible")	==	true){
				$("#deptmode").val('add');
			}else{
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
			if($("#deptmode").val() == "add"){
				if(employeeObj.deptParentId	==	undefined || employeeObj.deptParentId	==	""	|| employeeObj.deptParentId	==	null){
					$.notify("Department Parent id is missing",{
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
			
			if($("#deptmode").val() == "edit"){
				methodType = 'put';
				employeeObj.deptId	=	$("#updatedeptId").val();
			}
			
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
	<script>
	
	
		$(document).on("change", "#importorgstructure", function (e) {
			e.preventDefault();
			var orgimportmethodtype	=	$("#orgimportmethodtype").val();
			if(orgimportmethodtype	==	"" && orgimportmethodtype	==	undefined){
				return false;
			}
			
			var formdata = new FormData();
			var url	=	"";
			if ($(this).prop('files').length > 0) {
				file = $(this).prop('files')[0];
				if(orgimportmethodtype == "departmentChart"){
					formdata.append("deptdata", file);
					url	=	"/stratroom/createBulkDeptMapping";
				}else{
					formdata.append("employeedata", file);
					url	=	"/stratroom/createBulkEmployee";
				}
			}
			$(".page-loader-wrapper").css("display", "block");
			$.ajax({
				url: url,
				type: "POST",
				data: formdata,
				processData: false,
				contentType: false,
				success: function (data, status) {
					$(this).val('');
					location.reload(true);
					$(".page-loader-wrapper").css("display", "none");
					$.notify(data,{
							  style: 'success',
							  className: 'graynotify'
							});
				},
				error: function (msg, status) {
					$(this).val('');
					$(".page-loader-wrapper").css("display", "none");
					if (!jQuery.isEmptyObject(msg.responseText)) {
						var errorparse = JSON.parse(msg.responseText);
						if (errorparse.status == "404") {
							$.notify("Error:" + errorparse.exception, {
							  style: 'error',
							  className: 'graynotify'
							});
						} else {
							$.notify("Error:" + errorparse.exception, {
							  style: 'error',
							  className: 'graynotify'
							});
						}
					}
				}
			});

		});
		$(document).on("change", "#importfile", function (e) {
			e.preventDefault();
			$("#categoryerror").css("display", "none");
			$("#uploaderror").css("display", "none");
			var orgimportmethodtype	=	$("#orgimportmethodtype").val();
			var category = $("#category").val();
			if (category == "") {
				$("#categoryerror").css("display", "block");
				return false;
			}
			var formdata = new FormData();
			var url = "";
			var element = $("#importfile");
			if (category == "Organisation Import") {
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					if(orgimportmethodtype == "departmentChart"){
						formdata.append("deptdata", file);
						url	=	"/stratroom/createBulkDeptMapping";
					}else{
						formdata.append("employeedata", file);
						url	=	"/stratroom/createBulkEmployee";
					}
				}
			} else if (category == "Initiative Import") {
				url = "/stratroom/importBulkInitiativesDetails";
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					formdata.append("initiativeData", file);
				}
			} else if (category == "InitiativeDataLoad") {
				url = "/stratroom/importInitiativesData";
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					formdata.append("initiativeDataLoad", file);
				}
			} else if (category == "InitiativeBudgetLoad") {
				url = "/stratroom/importInitiativesBudget";
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					formdata.append("initiativeBudget", file);
				}
			}else if (category == "Risk Import") {
				url = "/stratroom/saveBulkRiskDetails";
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					formdata.append("riskData", file);
				}
			} else if (category == "Scorecard Import") {
				url = "/stratroom/saveScoreCardDetails";
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					formdata.append("scoreCardData", file);
				}
			}

			if (element.prop('files').length == 0) {
				$("#uploaderror").css("display", "block");
				return false;
			}
			$(".page-loader-wrapper").css("display", "block");
			$.ajax({
				url: url,
				type: "POST",
				data: formdata,
				processData: false,
				contentType: false,
				success: function (data, status) {
					$(".fileuploadclose").trigger('click');
					$(".page-loader-wrapper").css("display", "none");
					$.notify(data.result,{
							  style: 'success',
							  className: 'graynotify'
							});
					setTimeout(function () {
						location.reload(true);
					}, 3000);

				},
				error: function (msg, status) {
					$(".fileuploadclose").trigger('click');
					$(".page-loader-wrapper").css("display", "none");
					if (!jQuery.isEmptyObject(msg.responseText)) {
						var errorparse = JSON.parse(msg.responseText);
						if (errorparse.status == "404") {
							$.notify("Error:" + errorparse.exception, {
							  style: 'error',
							  className: 'graynotify'
							});
						} else {
							$.notify("Error:" + errorparse.exception,{
							  style: 'error',
							  className: 'graynotify'
							});
						}
					}
				}
			});

		});

		$(document).on("change", "#category", function (e) {
			e.preventDefault();
			$("#categoryerror").css("display", "none");
			$("#uploaderror").css("display", "none");
			var orgimportmethodtype	=	$("#orgimportmethodtype").val();
			var category = $("#category").val();
			if (category == "") {
				$("#categoryerror").css("display", "block");
				return false;
			}
			var formdata = new FormData();
			var url = "";
			var element = $("#importfile");
			if (category == "Organisation Import") {
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					if(orgimportmethodtype == "departmentChart"){
						formdata.append("deptdata", file);
						url	=	"/stratroom/createBulkDeptMapping";
					}else{
						formdata.append("employeedata", file);
						url	=	"/stratroom/createBulkEmployee";
					}
				}
			} else if (category == "Initiative Import") {
				url = "/stratroom/importBulkInitiativesDetails";
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					formdata.append("initiativeData", file);
				}
			}else if (category == "InitiativeDataLoad") {
				url = "/stratroom/importInitiativesData";
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					formdata.append("initiativeDataLoad", file);
				}
			}else if (category == "InitiativeBudgetLoad") {
				url = "/stratroom/importInitiativesBudget";
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					formdata.append("initiativeBudget", file);
				}
			}  else if (category == "Risk Import") {
				url = "/stratroom/saveBulkRiskDetails";
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					formdata.append("riskData", file);
				}
			} else if (category == "Scorecard Import") {
				url = "/stratroom/saveScoreCardDetails";
				if (element.prop('files').length > 0) {
					file = element.prop('files')[0];
					formdata.append("scoreCardData", file);
				}
			}

			if (element.prop('files').length == 0) {
				$("#uploaderror").css("display", "block");
				return false;
			}

			$(".page-loader-wrapper").css("display", "block");
			$.ajax({
				url: url,
				type: "POST",
				data: formdata,
				processData: false,
				contentType: false,
				success: function (data, status) {
					$(".fileuploadclose").trigger('click');
					$(".page-loader-wrapper").css("display", "none");
					$.notify(data,{
							  style: 'success',
							  className: 'graynotify'
							});
					setTimeout(function () {
						location.reload(true);
					}, 3000);

				},
				error: function (msg, status) {
					$(".fileuploadclose").trigger('click');
					$(".page-loader-wrapper").css("display", "none");
					if (!jQuery.isEmptyObject(msg.responseText)) {
						var errorparse = JSON.parse(msg.responseText);
						if (errorparse.status == "404") {
							$.notify("Error:" + errorparse.exception, {
							  style: 'error',
							  className: 'graynotify'
							});
						} else {
							$.notify("Error:" + errorparse.exception, {
							  style: 'error',
							  className: 'graynotify'
							});
						}
					}
				}
			});

		});


		$(".orgimportbtn").click(function () {
			$("#importfile").val('');
			$("#uploadcategory").val('');
		});

		$(".fileuploadclose").click(function () {
			$("#importfile").val('');
			$('.file_upload_popup').modal('toggle');
		});

		$('.file_upload_popup').modal({ show: false, backdrop: 'static', keyboard: false });




		var file;

		function readFile(input) {
			if (input.files && input.files[0]) {
				var reader = new FileReader();
				file = input.files[0];
				reader.onload = function () {
					var htmlPreview =
						'<div class="box-body-border">' +
						'<img width="20" src="/stratroom/images/file-icon.png"/>' +
						"<span>" + input.files[0].name + "</span>" +
						"<span><i class='fa fa-times remove-preview'></i></span>" +
						"</div>";
					var wrapperZone = $(input).parent();
					var previewZone = $(input).parent().parent().find(".preview-zone");
					var boxZone = $(input)
						.parent()
						.parent()
						.find(".preview-zone")
						.find(".box")
						.find(".box-body");
					wrapperZone.removeClass("dragover");
					previewZone.removeClass("hidden");
					boxZone.empty();
					boxZone.append(htmlPreview);
					removeFile();
				};
				reader.readAsDataURL(input.files[0]);
			}
			$(".form-progressbar li:nth-child(1)").addClass("active");
			$("#fileerrorshow").html("");
		}

		function reset(e) {
			e.wrap("<form>").closest("form").get(0).reset();
			e.unwrap();
		}

		$(".dropzone").change(function () {
			readFile(this);
		});

		$(".dropzone-wrapper").on("dragover", function (e) {
			e.preventDefault();
			e.stopPropagation();
			$(this).addClass("dragover");
		});

		$(".dropzone-wrapper").on("dragleave", function (e) {
			e.preventDefault();
			e.stopPropagation();
			$(this).removeClass("dragover");
		});

		function removeFile() {
			$(".remove-preview").on("click", function () {
				var boxZone = $(this).parents(".preview-zone").find(".box-body");
				var previewZone = $(this).parents(".preview-zone");
				var dropzone = $(this).parents(".form-group").find(".dropzone");
				boxZone.empty();
				console.log("done");
				previewZone.addClass("hidden");
				reset(dropzone);
			});
		}
		
		var category ='';
		$(document).on('click', '#next-btn-1', function() {		
			$("#categoryerrorshow").html("");
			$("#fileerrorshow").html("");
			$(".uploadvalidationSuccess").empty();
			 category = $("#uploadcategory").val();		 
			var Url ='';
			$("#file-upload").hide();
			$("#lineS").hide();
			$("#lineD").hide();
			var orgimportmethodtype	=	$("#orgimportmethodtype").val();
			if (category == "Organisation Import"){				
				$("#file-validate").show();
			} else if (category == "Initiative Import" || category == "Risk Import" || category == "Scorecard Import" || category == "InitiativeDataLoad" || category == "InitiativeBudgetLoad") {				
				$("#file-validate1").show();
			} else {
				$("#file-validate").show();
			}
			$("#file-save").hide();
			$(".form-progressbar li:nth-child(2)").addClass("active");
			var formdata = new FormData();
			$(".page-loader-wrapper").css("display", "block");
			if (category == "ETLUpload") {
				formdata.append("etlFile", file);	
				Url = "/stratroom/uploadETLFile?type=validation";			
			}else if (category == "Initiative Import") {
				formdata.append("initiativeData", file);	
				Url = "/stratroom/importBulkInitiativesDetails?type=validation";
			}else if (category == "InitiativeDataLoad") {
				formdata.append("initiativeDataLoad", file);	
				Url = "/stratroom/importInitiativesData?type=validation";
			}else if (category == "InitiativeBudgetLoad") {
				formdata.append("initiativeBudget", file);	
				Url = "/stratroom/importInitiativesBudget?type=validation";
			}else if (category == "Risk Import") {
				formdata.append("riskData", file);	
				Url = "/stratroom/saveBulkRiskDetails?type=validation";					
			} else if (category == "Scorecard Import") {
				formdata.append("scoreCardData", file);	
				Url = "/stratroom/saveScoreCardDetails?type=validation";				
			}  else if (category == "Organisation Import") {
				if(orgimportmethodtype == "departmentChart"){
					formdata.append("deptdata", file);
					Url = "/stratroom/createBulkDeptMapping?type=validation";
				}else{
					formdata.append("employeedata", file);	
					Url = "/stratroom/createBulkEmployee?type=validation";
				}
			} else if (category == "XLSUpload") {
				formdata.append("xlsfile", file);	
				$(".uploadStatististics").empty();
			$("#file-upload").hide();		
			$("#file-validate").hide();
			$("#file-validate1").hide();
			$("#file-save").show();
			var orgimportmethodtype	=	$("#orgimportmethodtype").val();
			$(".form-progressbar li:nth-child(3)").addClass("active");
				Url = "/stratroom/uploadXLFile?type=save";
			}
			
			
			if(category && file){
				
					if(category == "XLSUpload" || category == "ETLUpload" || category == "Initiative Import" || category == "Risk Import"|| category == "Scorecard Import" || category == "Organisation Import" || category == "InitiativeDataLoad" || category == "InitiativeBudgetLoad"){								
						$.ajax({
							url: Url,
							type: "POST",
							data: formdata,
							processData: false,
							contentType: false,
							success: function (data, status) {				
								if (category == "Initiative Import") {
									initiativeUploadNotFoundData(data,data.parsingError);
								}if (category == "InitiativeDataLoad") {
									initiativeUploadNotFoundData(data,data.parsingError);
								}if (category == "InitiativeBudgetLoad") {
									initiativeUploadNotFoundData(data,data.parsingError);
								} else if (category == "Risk Import") {
									riskUploadNotFoundData(data,data.parsingError);
								} else if (category == "Scorecard Import") {
									scorecardUploadNotFoundData(data,data.parsingError);
								} else if (category == "Organisation Import"){
									orgStructureUploadNotFoundData(data,data.parsingError);
								}else if (category == "ETLUpload"){
									EtlUploadNotFoundData(data,data.parsingError);
								}
								else if (category == "XLSUpload"){
						//			XLSUploadNotFoundData(data,data.parsingError);
									UploadXlsSuccess();

								}
								$(".page-loader-wrapper").css("display", "none");		
							},error:function(msg,status){
								$(this).val('');
								$(".page-loader-wrapper").css("display","none");
								if(!jQuery.isEmptyObject(msg.responseText)){
									var errorparse	=	JSON.parse(msg.responseText);
									if(errorparse.status 	==	"404"){
										$.notify("Error:"+errorparse.exception, {
												  style: 'error',
												  className: 'graynotify'
												});
									}else{
										$.notify("Error:"+errorparse.exception, {
												  style: 'error',
												  className: 'graynotify'
												});
									}
								}
							},
						});
					}else{				
						window.location.reload();
					}
					
			
			} else {
				if(category != ''){
					$("#categoryerrorshow").hide();
					$("#fileerrorshow").append('Please select upload file');
					$("#fileerrorshow").show();
					$(".page-loader-wrapper").css("display", "none");
					$("#file-upload").show();		
					$("#file-validate").hide();
					$("#file-validate1").hide();
					$("#file-save").hide();
					$(".form-progressbar li:nth-child(1)").removeClass("active");
					$(".form-progressbar li:nth-child(2)").removeClass("active");
					$("#lineS").show();
					$("#lineD").show();
				}else{
					$("#fileerrorshow").hide();
					$("#categoryerrorshow").append('Kindly select category to upload a file');
					$("#categoryerrorshow").show();
					$(".page-loader-wrapper").css("display", "none");
					$("#file-upload").show();		
					$("#file-validate").hide();
					$("#file-validate1").hide();
					$("#file-save").hide();
					$(".form-progressbar li:nth-child(1)").removeClass("active");
					$(".form-progressbar li:nth-child(2)").removeClass("active");
					$("#lineS").show();
					$("#lineD").show();
				}
				
				
			}
			
		});

		
		
		
		$(document).on('click', '#next-btn-2', function() {	
			$(".uploadStatististics").empty();
			$("#file-upload").hide();		
			$("#file-validate").hide();
			$("#file-validate1").hide();
			$("#file-save").show();
			var orgimportmethodtype	=	$("#orgimportmethodtype").val();
			$(".form-progressbar li:nth-child(3)").addClass("active");
			var formdata = new FormData();
			var url = "";
			var category = $("#uploadcategory").val();
			$(".page-loader-wrapper").css("display", "block");
			if (category == "ETLUpload") {
				formdata.append("etlFile", file);	
				url = "/stratroom/uploadETLFile?type=save";
			}else if (category == "XLSUpload") {
				formdata.append("xlsfile", file);	
				url = "/stratroom/uploadXLFile?type=save";
			}else if (category == "InitiativeDataLoad") {
				formdata.append("initiativeDataLoad", file);	
				url = "/stratroom/importInitiativesData?type=save";
			}else if (category == "InitiativeBudgetLoad") {
				formdata.append("initiativeBudget", file);	
				url = "/stratroom/importInitiativesBudget?type=save";
			}else if (category == "Initiative Import") {
				formdata.append("initiativeData", file);	
				url = "/stratroom/importBulkInitiativesDetails?type=save";
			}else if (category == "Risk Import") {
				formdata.append("riskData", file);	
				url = "/stratroom/saveBulkRiskDetails?type=save";				
			} else if (category == "Scorecard Import") {
				formdata.append("scoreCardData", file);	
				url = "/stratroom/saveScoreCardDetails?type=save";				
			} else {
				if(orgimportmethodtype == "departmentChart"){
					formdata.append("deptdata", file);
					url = "/stratroom/createBulkDeptMapping?type=save";
				}else{
					formdata.append("employeedata", file);	
					url = "/stratroom/createBulkEmployee?type=save";
				}
			}
			
			
				$.ajax({
					url:url ,
					type: "POST",
					data: formdata,
					processData: false,
					contentType: false,
					success: function (data, status) {
						
						$(".page-loader-wrapper").css("display", "none");
						if (category == "InitiativeDataLoad") {
							UploadSuccess(data);
						}if (category == "InitiativeBudgetLoad") {
							UploadSuccess(data);
						}if (category == "Initiative Import") {
							initiativeUploadSuccess(data);
						} else if (category == "Risk Import") {
							riskUploadSuccess(data);			
						} else if (category == "Scorecard Import") {
							scorecardUploadSuccess(data);			
						} else if (category == "Organisation Import") {
							UploadSuccess(data);
						} else if (category == "ETLUpload") {
							UploadEtlSuccess();
						} else if (category == "XLSUpload") {
							UploadXlsSuccess();
						}
						
					},
				});
		});

		
		$(document).on('click', '#prev-btn1', function() {					
			$("#file-upload").show();
			if (category == "Organisation Import"){				
				$("#file-validate").hide();				
			} else if (category == "Initiative Import" || category == "Risk Import"|| category == "Scorecard Import" || category == "InitiativeDataLoad" || category == "InitiativeBudgetLoad") {				
				$("#file-validate1").hide();
			} else {
				$("#file-validate").hide();
			}	
			$("#file-save").hide();
			$(".form-progressbar li:nth-child(2)").removeClass("active");
			$("#lineS").show();
			$("#lineD").show();
		});
		
		
		$(document).on('click', '#prev-btn2', function() {		
			$(".uploadStatististics").empty();
			$("#statisticmessage").html("");
			$("#file-upload").hide();
			if (category == "Organisation Import"){				
				$("#file-validate").show();
				$(".error-div").hide();
				$("#imagevalidate1").attr("src","/stratroom/images/Success.png");
			} else if (category == "Initiative Import" || category == "Risk Import" || category == "Scorecard Import" || category=="InitiativeDataLoad" || category=="InitiativeBudgetLoad") {				
				$("#file-validate1").show();
				$(".error-div").hide();
				$("#imagevalidate").attr("src","/stratroom/images/Success.png");
			} else {
				$("#file-validate").show();
				$(".error-div").hide();
				$("#imagevalidate1").attr("src","/stratroom/images/Success.png");
			}			
			$("#file-save").hide();
			$(".form-progressbar li:nth-child(3)").removeClass("active");
		});


		function orgStructureUploadNotFoundData(data,result) {
			var orgstructure_import_error;
			var validateImport;
			$("#validateImportHide").empty();
			console.log(data.result);
			$.each(result, function (i, List) {
				orgstructure_import_error = '<tr>' +
					'<td style="width: 200px; text-align: center;">' + List.rowNo + '</td>' +
					'<td style="width: 300px; text-align: center;">' + (List.columnName !=	undefined?List.columnName:"") + '</td>' +
					'<td style="width: 300px; text-align: center;">' + List.error + '</td>' +
					'</tr>';
				$(".uploadvalidationSuccess").append(orgstructure_import_error);
			});
			if(!jQuery.isEmptyObject(data) && data.result	==	"Not-Success"){
				$(".error-div").show();
				$("#imagevalidate1").attr("src","/stratroom/images/Not-Verified.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
			}
			if(!jQuery.isEmptyObject(data) && (data.result	==	"success" || data.result	==	"Success")){
				$(".error-div").hide();
				
				$("#imagevalidate1").attr("src","/stratroom/images/Success.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';
			}

			if (jQuery.isEmptyObject(data)) {
				$(".error-div").hide();
				$("#imagevalidate1").attr("src","/stratroom/images/Not-Verified.png");
				
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
			}	
			$("#validateImportHide").append(validateImport);
			$("#file-upload").hide();				
		}
		
		function EtlUploadNotFoundData(data,result) {
			var etl_import_error;
			var validateImport;
			$("#validateImportHide").empty();
			$.each(result, function (i, List) {
				etl_import_error = '<tr>' +
					'<td style="width: 200px; text-align: center;">' + List.rowNo + '</td>' +
					'<td style="width: 300px; text-align: center;">' + (List.cellName !=	undefined?List.cellName:"") + '</td>' +
					'<td style="width: 300px; text-align: center;">' + List.error + '</td>' +
					'</tr>';
				$(".uploadvalidationSuccess").append(etl_import_error);
			});
			if(!jQuery.isEmptyObject(data) && data.result	==	"Not-Success"){
				$(".error-div").show();
				$("#imagevalidate1").attr("src","/stratroom/images/Not-Verified.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
			}
			if(!jQuery.isEmptyObject(data) && (data.result	==	"success" || data.result	==	"Success")){
				$(".error-div").hide();
				$("#imagevalidate1").attr("src","/stratroom/images/Success.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';
			}
			
			if (jQuery.isEmptyObject(data)) {
				$(".error-div").hide();
				$("#imagevalidate1").attr("src","/stratroom/images/Not-Verified.png");
				
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
			}
			$("#validateImportHide").append(validateImport);
			$("#file-upload").hide();				
		}


		function XLSUploadNotFoundData(data,result) {
			var etl_import_error;
			var validateImport;
			$("#validateImportHide").empty();
			$.each(result, function (i, List) {
				etl_import_error = '<tr>' +
					'<td style="width: 200px; text-align: center;">' + List.rowNo + '</td>' +
					'<td style="width: 300px; text-align: center;">' + (List.cellName !=	undefined?List.cellName:"") + '</td>' +
					'<td style="width: 300px; text-align: center;">' + List.error + '</td>' +
					'</tr>';
				$(".uploadvalidationSuccess").append(etl_import_error);
			});
			if(!jQuery.isEmptyObject(data) && data.result	==	"Not-Success"){
				$(".error-div").show();
				$("#imagevalidate1").attr("src","/stratroom/images/Not-Verified.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
			}
			if(!jQuery.isEmptyObject(data) && (data.result	==	"success" || data.result	==	"Success")){
				$(".error-div").hide();
				$("#imagevalidate1").attr("src","/stratroom/images/Success.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';
			}
			
			if (jQuery.isEmptyObject(data)) {
				$(".error-div").hide();
				$("#imagevalidate1").attr("src","/stratroom/images/Not-Verified.png");
				
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
			}
			$("#validateImportHide").append(validateImport);
			$("#file-upload").hide();				
		}



		function initiativeUploadNotFoundData(data,result) {
			var initiative_import_error;
			var validateImport;
			$("#validatescoreCardImportHide").empty();
			
			if(!jQuery.isEmptyObject(data) && data.result	==	"Not-Success"){
				$(".error-div").show();
				$("#imagevalidate").attr("src","/stratroom/images/Not-Verified.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
			}
			if(!jQuery.isEmptyObject(data) && (data.result	==	"success" || data.result	==	"Success")){
				$(".error-div").hide();
				$("#imagevalidate").attr("src","/stratroom/images/Success.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';
			}
			
			$.each(result, function (i, List) {
				initiative_import_error = '<tr>' +
					'<td style="width: 150px; text-align: center;">' + List.Excel_SheetName + '</td>' +			
					'<td style="width: 150px; text-align: center;">' + List.rowNo + '</td>' +
					'<td style="width: 150px; text-align: center;">' + (List.highLightcellName !=	undefined?List.highLightcellName:"")+ '</td>' +
					'<td style="width: 250px; text-align: center;">' + List.error + '</td>' +
					'</tr>';
				$(".uploadvalidationSuccess").append(initiative_import_error);
			});	
			

			if (jQuery.isEmptyObject(data)) {
				$(".error-div").hide();
				$("#imagevalidate").attr("src","/stratroom/images/Not-Verified.png");
				
				var validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
			}
			
			$("#validatescoreCardImportHide").append(validateImport);
			$("#file-upload").hide();		
			
		}

		function riskUploadNotFoundData(data,result) {
			var risk_import_error;
			var validateImport;
			$("#validatescoreCardImportHide").empty();
			
			if(!jQuery.isEmptyObject(data) && data.result	==	"Not-Success"){
				$(".error-div").show();
				$("#imagevalidate").attr("src","/stratroom/images/Not-Verified.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
			}
			if(!jQuery.isEmptyObject(data) && (data.result	==	"success" || data.result	==	"Success")){
				$(".error-div").hide();
				$("#imagevalidate").attr("src","/stratroom/images/Success.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';
			}
			
			$.each(result, function (i, List) {
				risk_import_error = '<tr>' +
					'<td style="width: 150px; text-align: center;">' + List.Excel_SheetName + '</td>' +			
					'<td style="width: 150px; text-align: center;">' + List.rowNo + '</td>' +
					'<td style="width: 150px; text-align: center;">' + (List.highLightcellName !=	undefined?List.highLightcellName:"")+ '</td>' +
					'<td style="width: 250px; text-align: center;">' + List.error + '</td>' +
					'</tr>';
				$(".uploadvalidationSuccess").append(risk_import_error);
			});	
			

			if (jQuery.isEmptyObject(data)) {
				$(".error-div").hide();
				$("#imagevalidate").attr("src","/stratroom/images/Not-Verified.png");
				
				var validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
			}
			
			$("#validatescoreCardImportHide").append(validateImport);
			$("#file-upload").hide();		
			
		}
		
		function scorecardUploadNotFoundData(data,result) {
			var scorecard_import_error = '';
			var validateImport = '';
			$("#validatescoreCardImportHide").empty();
			$.each(result, function (i, List) {
				scorecard_import_error = '<tr>' +
					'<td style="width: 150px; text-align: center;">' + List.Excel_SheetName + '</td>' +
					'<td style="width: 150px; text-align: center;">' + List.rowNo + '</td>' +
					'<td style="width: 150px; text-align: center;">' + (List.cellName !=	undefined?List.cellName:"") + '</td>' +
					'<td style="width: 250px; text-align: center;">' + List.error + '</td>' +
					'</tr>';
				$(".uploadvalidationSuccess").append(scorecard_import_error);
			});	
			if(!jQuery.isEmptyObject(result)){
				$(".error-div").show();
			}
			if(!jQuery.isEmptyObject(data) && data.result	==	"Not-Success"){
				$(".error-div").show();
				$("#imagevalidate").attr("src","/stratroom/images/Not-Verified.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
			}
			if(!jQuery.isEmptyObject(data) && (data.result	==	"success" || data.result	==	"Success")){
				$(".error-div").hide();
				$("#imagevalidate").attr("src","/stratroom/images/Success.png");
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';
			}
			
			if (jQuery.isEmptyObject(data)) {
				$(".error-div").hide();
				$("#imagevalidate").attr("src","/stratroom/images/Not-Verified.png");
				
				validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
				'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
			}
			
			$("#validatescoreCardImportHide").append(validateImport);
			$("#file-upload").hide();	
		}
		
			
		function UploadSuccess(data) {
			$(".error-div").show();
			$("#imagevalidate").attr("src","/stratroom/images/Success.png");
			//$("#statisticmessage").append('Import Successful');
			if(data.no_of_processed != undefined){
				uploadSuccessStatistics('No_of_Processed',data.no_of_processed);
			}else{
				uploadSuccessStatistics('No_of_Processed',0);
			}
			if(data.no_of_processed != undefined){
				uploadSuccessStatistics('No_of_Failed',data.no_of_failed);
			}else{
				uploadSuccessStatistics('No_of_Failed',0);	
			}
			
					
		}
		
		function scorecardUploadSuccess(data) {
			$(".error-div").show();
			$("#imagevalidate").attr("src","/stratroom/images/Success.png");
			//$("#statisticmessage").append('Import Successful');
			if(data.no_of_processed != undefined){
				uploadSuccessStatistics('No of Records Processed',data.no_of_processed);
			}else{
				uploadSuccessStatistics('No of Records Processed',0);
			}
			if(data.no_of_created != undefined){
				uploadSuccessStatistics('No of Scorecards created',data.no_of_created);
			}else{
				uploadSuccessStatistics('No of Scorecards created',0);
			}
			if(data.no_of_updated != undefined){
				uploadSuccessStatistics('No of Records updated',data.no_of_updated);
			}else{
				uploadSuccessStatistics('No of Records updated',0);
			}
			if(data.no_of_failed != undefined){
				uploadSuccessStatistics('No of Failed',data.no_of_failed);
			}else{
				uploadSuccessStatistics('No of Failed',0);
			}
			
			
					
		}

		function initiativeUploadSuccess(data) {
			$(".error-div").show();
			$("#imagevalidate").attr("src","/stratroom/images/Success.png");
			//$("#statisticmessage").append('Import Successful');
			if(data.no_of_processed != undefined){
				uploadSuccessStatistics('No of Initiative Processed',data.no_of_processed);
			}else {
				uploadSuccessStatistics('No of Initiative Processed',0);
			}
			
			if(data.no_of_created != undefined){
				uploadSuccessStatistics('No of Initiative created',data.no_of_created);
			}else {
				uploadSuccessStatistics('No of Initiative created',0);
			}
			
			if(data.no_of_updated != undefined){
				uploadSuccessStatistics('No of Initiative updated',data.no_of_updated);
			}else {
				uploadSuccessStatistics('No of Initiative updated',0);
			}

			if(data.no_of_failed != undefined){
				uploadSuccessStatistics('No of Failed',data.no_of_failed);	
			}else {
				uploadSuccessStatistics('No of Failed',0);	
			}
		}
		
		function riskUploadSuccess(data) {
			$(".error-div").show();
			$("#imagevalidate").attr("src","/stratroom/images/Success.png");
			//$("#statisticmessage").append('Import Successful');
			if(data.no_of_processed != undefined){
				uploadSuccessStatistics('No of Risk Processed',data.no_of_processed);
			}else {
				uploadSuccessStatistics('No of Risk Processed',0);
			}
			
			if(data.no_of_created != undefined){
				uploadSuccessStatistics('No of Risk created',data.no_of_created);
			}else {
				uploadSuccessStatistics('No of Risk created',0);
			}
			
			if(data.no_of_updated != undefined){
				uploadSuccessStatistics('No of Risk updated',data.no_of_updated);
			}else {
				uploadSuccessStatistics('No of Risk updated',0);
			}

			if(data.no_of_failed != undefined){
				uploadSuccessStatistics('No of Failed',data.no_of_failed);	
			}else {
				uploadSuccessStatistics('No of Failed',0);	
			}
		}
		
		function uploadSuccessStatistics(staticsvalue,fnresult) {
			var upload_Statistics = '<tr>' +
			'<td style="width: 300px; text-align: left;">'+staticsvalue+'</td>' +
			'<td style="width: 300px; text-align: center;">' +fnresult+ '</td>' +	
			'</tr>';
			$(".uploadStatististics").append(upload_Statistics);
		}


		$(document).on('click', '#done-btn', function() {					
			location.reload(true);
		});
		
		
		function UploadEtlSuccess(data) {			
			$("#imagevalidate").attr("src","/stratroom/images/Success.png");
			 validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
			'<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';	
			 $("#validatescoreCardImportHide").append(validateImport);
			 uploadSuccessStatistics('Files Loaded',1);

		}

		function UploadXlsSuccess(data) {			
			$("#imagevalidate").attr("src","/stratroom/images/Success.png");
			 validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
			'<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';	
			 $("#validatescoreCardImportHide").append(validateImport);
			 uploadSuccessStatistics('Files Loaded',1);

		}
		
		$(document).on('click',".close",function () {
			$(".box-body").empty();
			$("#uploadcategory").val("");
			$("#fileerrorshow").html("");
			$("#statisticmessage").html("");
			$("#categoryerrorshow").html("");
			$("#file-upload").show();			
			$("#file-validate").hide();
			$("#file-validate1").hide();
			$("#file-save").hide();
			$("#lineS").show();
			$("#lineD").show();
			$(".form-progressbar li:nth-child(1)").removeClass("active");
			$(".form-progressbar li:nth-child(2)").removeClass("active");
			$(".form-progressbar li:nth-child(3)").removeClass("active");
		});
		$('.modal-dialog').draggable({
            handle: ".modal-header"
        });
		
		$("#custom-tab").on("click", "button", function (e) {
	        var CustomTabValue = this.dataset.value;
	        if (CustomTabValue) {
	          $(".customTabContent")
	            .not("." + CustomTabValue)
	            .hide();
	          $("." + CustomTabValue).show();
	        } else {
	          $(".customTabContent").hide();
	        }
	        $(this).parent().find("button").removeClass("active");
	        $(this).addClass("active");
	      });
		
		  	$('[data-toggle="tooltip"]').attr("data-placement","bottom");
		  	$('[data-toggle="tooltip"]').tooltip({ 
	            delay: { "show": 0, "hide": 0 } 
	   		}); 

	</script>
	<script src="${contextroot}/js/initial.js"></script>
	<script src="${contextroot}/js/mainn.js"></script>
  

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
	   if ($(this).children(".nested-item").length === 0) {
		   if ($(this).find("li.sortable-empty").length === 0) {
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
	   if ($parent.children(".nested-item:not(.ui-sortable-placeholder)").length === 0) {
		 if ($parent.find("li.sortable-empty").length === 0) {
		   $parent.prepend('<li class="sortable-empty"></li>'); // Change append → prepend
	 }
		 
	   }
	 },
 
	 out: function (event, ui) {
	   let $parent = ui.placeholder.parent();
	   if ($parent.children(".nested-item:not(.ui-sortable-placeholder)").length === 0) {
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
 
   </script>


   <script>
    // Popover content
    const popoverTrigger = document.getElementById('popoverFilterStatus');
    new bootstrap.Popover(popoverTrigger, {
      html: true,
      placement: 'bottom',
      content: `
        <div>
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="h6 mb-0">Filter Status</h5>
            <button type="button" class="btn-close" aria-label="Close"></button>
          </div>
          <div class="d-flex flex-column gap-2 pageViewOption">   
            
            <div class="form-check">
              <input class="form-check-input filter-status" id="status-open" type="checkbox" value="Open">
              <label class="form-check-label" for="status-open">Open</label>
            </div>
            <div class="form-check">
              <input class="form-check-input filter-status" id="status-inProgress" type="checkbox" value="In Progress">
              <label class="form-check-label" for="status-inProgress">In Progress</label>
            </div>
            <div class="form-check">
              <input class="form-check-input filter-status" id="status-completed" type="checkbox" value="Completed">
              <label class="form-check-label" for="status-completed">Completed</label>
            </div>
            <div class="form-check">
              <input class="form-check-input filter-status" id="status-pending" type="checkbox" value="Pending">
              <label class="form-check-label" for="status-pending">Pending</label>
            </div>
          </div>
        </div>
      `,
      sanitize: false
    });

    // Close popover on close button click
    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('btn-close')) {
        bootstrap.Popover.getInstance(popoverTrigger)?.hide();
      }
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



  </body>