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
		<link href="assets/css/orgchartnewbasic.css" rel="stylesheet">





	</head>

	<style>
		/* ─── AUDIT WIZARD STEPPER ──────────────────────── */
.audit-stepper {
  display: flex;
  align-items: flex-start;
  gap: 0;
  margin-bottom: 1.75rem;
  padding: 0 0.5rem;
}

.audit-stepper .audit-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
}

.audit-stepper .audit-step:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 15px;
  left: 50%;
  width: 100%;
  height: 2px;
  background: var(--bs-border-color, #dee2e6);
  z-index: 0;
}

.audit-stepper .audit-step.done::after {
  background: var(--bs-primary, #0d6efd);
}

.audit-step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--bs-border-color, #dee2e6);
  background: var(--bs-body-bg, #fff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: var(--bs-secondary-color, #6c757d);
  z-index: 1;
  transition: all 0.2s ease;
}

.audit-step.active .audit-step-circle {
  border-color: var(--bs-primary, #0d6efd);
  background: var(--bs-primary, #0d6efd);
  color: #fff;
}

.audit-step.done .audit-step-circle {
  border-color: var(--bs-primary, #0d6efd);
  background: var(--bs-primary, #0d6efd);
  color: #fff;
}

.audit-step-label {
  font-size: 11px;
  color: var(--bs-secondary-color, #6c757d);
  margin-top: 6px;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
}

.audit-step.active .audit-step-label {
  color: var(--bs-primary, #0d6efd);
  font-weight: 600;
}

.audit-step-panel {
  display: none;
}

.audit-step-panel.active {
  display: block;
}

/* ─── CHIP SELECTORS ────────────────────────────── */
.audit-check-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.audit-check-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border: 1.5px solid var(--bs-border-color, #dee2e6);
  border-radius: 20px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.15s ease;
  background: transparent;
  color: var(--bs-body-color, #212529);
}

.audit-check-chip input {
  display: none;
}

.audit-check-chip:hover {
  border-color: var(--bs-primary, #0d6efd);
  color: var(--bs-primary, #0d6efd);
}

.audit-check-chip.selected {
  border-color: var(--bs-primary, #0d6efd);
  background: rgba(13, 110, 253, 0.08);
  color: var(--bs-primary, #0d6efd);
}

.audit-risk-chip.high {
  border-color: #fca5a5;
}

.audit-risk-chip.high.selected {
  background: #fee2e2;
  color: #dc3545;
  border-color: #dc3545;
}

.audit-risk-chip.medium {
  border-color: #fcd34d;
}

.audit-risk-chip.medium.selected {
  background: #fef9c3;
  color: #92400e;
  border-color: #f59e0b;
}

.audit-risk-chip.low {
  border-color: #86efac;
}

.audit-risk-chip.low.selected {
  background: #dcfce7;
  color: #198754;
  border-color: #198754;
}

/* ─── DROP ZONE ─────────────────────────────────── */
.audit-drop-zone {
  border: 2px dashed var(--bs-border-color, #dee2e6);
  border-radius: 10px;
  padding: 24px;
  text-align: center;
  color: var(--bs-secondary-color, #6c757d);
  cursor: pointer;
  transition: all 0.2s ease;
}

.audit-drop-zone:hover {
  border-color: var(--bs-primary, #0d6efd);
  background: rgba(13, 110, 253, 0.04);
}

.audit-drop-zone i {
  font-size: 28px;
  margin-bottom: 8px;
  color: var(--bs-primary, #0d6efd);
}

/* ─── REVIEW SUMMARY ───────────────────────────── */
.audit-review-box {
  background: var(--bs-tertiary-bg, #f8f9fa);
  border-radius: 10px;
  padding: 1.25rem;
}

.audit-review-box .review-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.audit-review-box .review-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--bs-secondary-color, #6c757d);
  font-weight: 600;
}

.audit-review-box .review-value {
  font-size: 13px;
  font-weight: 500;
  color: var(--bs-body-color, #212529);
}

.required-star {
  color: #dc3545;
}

@media (max-width: 767.98px) {
  .audit-stepper {
    overflow-x: auto;
    overflow-y: hidden;
    flex-wrap: nowrap;
    padding-bottom: 0.5rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    /* Firefox */
  }
  .audit-stepper::-webkit-scrollbar {
    display: none;
    /* Chrome/Safari */
  }
  .audit-stepper .audit-step {
    min-width: 100px;
    flex: 1 0 auto;
  }
  .audit-step-label {
    font-size: 10px;
    white-space: normal;
    line-height: 1.2;
    padding: 0 4px;
  }
}
/* ─── MODAL TABS (LINED ACTIVE) ─────────────────────────────────── */
.audit-line-tabs {
  border-bottom: 1px solid var(--bs-border-color, #dee2e6) !important;
  gap: 1.5rem;
  padding: 0 1rem;
}
.audit-line-tabs .nav-item {
  margin-bottom: -1px;
}
.audit-line-tabs .nav-link {
  border: none !important;
  background: transparent !important;
  color: var(--bs-secondary-color, #6c757d) !important;
  font-weight: 500 !important;
  font-size: 14px !important;
  padding: 0.5rem 0.2rem !important;
  border-bottom: 2px solid transparent !important;
  border-radius: 0 !important;
}
.audit-line-tabs .nav-link:hover {
  color: var(--stratroom-primary, #7B2D8B) !important;
}
.audit-line-tabs .nav-link.active {
  color: var(--stratroom-primary, #7B2D8B) !important;
  border-bottom: 2px solid var(--stratroom-primary, #7B2D8B) !important;
}
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

		.org-tree-container .drag-point {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: .5rem;
			cursor: move;
			background: rgba(var(--stratroom-black-rgb), 0.01);
			color: rgba(var(--stratroom-black-rgb), 0.5);
			border-bottom-left-radius: 10px;
			border-top-right-radius: 10px;
		}

		.org-section .org-content .org-label {
			font-size: clamp(12px, 5vw, 13px);
			margin-bottom: 0;
			line-height: 1.2;
		}

		.org-section .org-content .content {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
			gap: .2rem;
			flex: 1;
			align-items: center;
		}
	</style>
	<script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>

	<body class="light" data-page="org-structure-new">
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
              <i data-lucide="file-search" style="width: 18px; height: 18px;"></i>
            </span>
            Audit Management
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
                Audit List</strong>
            </h5>
          </div>
          <div class="card-actions">
              <a href="#" onclick="loadDataAndGeneratePDF()" data-bs-toggle="tooltip" data-bs-placement="bottom"
              data-bs-title="Generate Report" class="btn btn-sm btn-icon">
              <i data-lucide="file-text" style="width: 16px; height: 16px;"></i>
            </a>
            <div id="popoverFilterProjectPlanningCategory">
              <span type="button" class="btn btn-sm btn-icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
                title="Project Planning Category">
                <i data-lucide="funnel" style="width: 16px; height: 16px;"></i>
              </span>
            </div>
            <button type="button" class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#audit-add-modal">
              <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Create Meeting">
                <i data-lucide="plus" style="width: 16px; height: 16px;"></i>
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


  <!-- audit-add-modal Start-->
  <!-- <div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    id="audit-add-modalold" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title headerText">Create Audit</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card custom-card border-0">
            <div class="card-body">
              <div class="grid gap-3">
                <div class="g-col-12 g-col-md-2">
                  <div class="form-group">
                    <label for="aw_audit_id" class="form-label">Audit ID</label>
                    <input type="text" class="form-control" name="aw_audit_id" id="aw_audit_id" placeholder="Audit ID" readonly>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-10">
                  <div class="form-group">
                    <label for="aw_title" class="form-label">Name</label>
                    <input type="text" class="form-control" id="aw_title" name="aw_title" placeholder="Name" />
                  </div>
                </div>
               

                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="aw_category" class="form-label">Audit Category</label>
                    <select id="aw_category" name="aw_category" class="form-select modal-custom-select"
                      data-placeholder="Select an Audit Type">
                      
                      <option value="Legal Compliance">Legal Compliance</option>
                      <option value="Tax Compliance">Tax Compliance</option>
                      <option value="Corporate Governance">Corporate Governance</option>
                      <option value="Financial Reporting">Financial Reporting</option>
                      <option value="AML & ABAC">AML & ABAC</option>
                      <option value="Data Privacy">Data Privacy</option>
                      <option value="ESG Compliance">ESG Compliance</option>
                      <option value="HSE Compliance">HSE Compliance</option>
                      <option value="Labor Compliance">Labor Compliance</option>
                      <option value="Industry Regulations">Industry Regulations</option>
                    </select>
                  </div>
                </div>

                
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="aw_period" class="form-label">Audit Period</label>
                    <select id="aw_period" name="aw_period" class="form-select modal-custom-select"
                      data-placeholder="Select Audit Period">
                     
                        <option value="Q1">Q1</option>
						<option value="Q2">Q2</option>
						<option value="Q3">Q3</option>
						<option value="Q4">Q4</option>
						<option value="H1">H1</option>
						<option value="H2">H2</option>
						<option value="Annual">Annual</option>


                    </select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="aw_dept" class="form-label">Department</label>
                   <select id="aw_dept" name="" class="form-select modal-custom-select"
                        data-placeholder="Select a Department" >

                      </select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="am_audit_start_date" class="form-label">Audit Start/End Date</label>
                    <input type="text" class="form-control date-range-picker" data-language="en"
                      name="am_audit_start_date" id="am_audit_start_date" placeholder="Audit Start Date" />
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="aw_auditor_type" class="form-label">Auditor(s)</label>
                    <select id="aw_auditor_type" name="aw_auditor_type" class="form-select modal-custom-select"
                      data-placeholder="Select Auditor(s)">

                      <option value="Internal">Internal</option>
                      <option value="External">External</option>
                      <option value="External">Third Party</option>

                    </select>

                  </div>
                </div>





                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="am_assigned_to" class="form-label">Updated By</label>
                       <select id="aw_updated_by" name="Risk_owner"
                                            class="form-select modal-custom-select"
                                            data-placeholder="Select">
                                          
                                        </select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="aw_next_review" class="form-label">Next Review Date</label>
                    <input type="text" class="form-control datePicker" data-language="en" name="aw_next_review"
                      id="aw_next_review" placeholder="Next Review Date" />
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="aw_status" class="form-label">Status</label>
                    <select id="aw_status" name="aw_status" class="form-select modal-custom-select"
                      aria-invalid="false">
                      <option value="" selected disabled>Select Status</option>
                      <option value="planned">Planned</option>
                      <option value="in_progress">In Progress</option>
                      <option value="under_review">Under Review</option>
                      <option value="completed">Completed</option>
                      <option value="closed">Closed</option>
                      <option value="on_hold">On Hold</option>
                      <option value="cancelled">Cancelled</option>


                    </select>
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="aw_findings" class="form-label"># of Findings</label>
                    <input type="text" class="form-control" name="aw_findings" id="aw_findings" placeholder="Findings">
                  </div>
                </div>
                <div class="g-col-12 g-col-md-6">
                  <div class="form-group">
                    <label for="aw_issues" class="form-label"># of Issues</label>
                    <input type="text" class="form-control" name="aw_issues" id="aw_issues"
                      placeholder="Open Issues">
                  </div>
                </div>
                <div class="g-col-12">
                  <div class="form-group">
                    <label for="kpi_fields" class="form-label">Risk Rating</label>
                    <div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input green" type="radio" name="status" id="statusGreen" value="High">
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
          <button class="btn btn-primary buttonText" value="Save" onclick="handleRiskSave()">Save</button>

        </div>
      </div>
    </div>
  </div> -->
  <!-- audit-add-modal End-->

  <!-- Audit Modal New -->
     <div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    id="audit-add-modal" role="dialog" aria-labelledby="auditModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="auditModalTitle">Create / Edit Audit</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card custom-card border-0">
            <div class="card-body">
              <!-- ── Stepper ──────────────────────────── -->
              <div class="audit-stepper" id="auditStepper">
                <div class="audit-step active" data-step="1">
                  <div class="audit-step-circle">1</div>
                  <div class="audit-step-label">Basic Info</div>
                </div>
                <div class="audit-step" data-step="2">
                  <div class="audit-step-circle">2</div>
                  <div class="audit-step-label">Classification</div>
                </div>
                <div class="audit-step" data-step="3">
                  <div class="audit-step-circle">3</div>
                  <div class="audit-step-label">Team & Schedule</div>
                </div>
                <div class="audit-step" data-step="4">
                  <div class="audit-step-circle">4</div>
                  <div class="audit-step-label">Scope & Criteria</div>
                </div>
                <div class="audit-step" data-step="5">
                  <div class="audit-step-circle">5</div>
                  <div class="audit-step-label">Review & Submit</div>
                </div>
              </div>

              <!-- ═══ STEP 1 — Basic Info ═══════════════ -->
              <div class="audit-step-panel active" data-panel="1">
                <div class="row g-3">
                  <div class="col-md-4">
                    <label for="aw_audit_id" class="form-label">Audit ID <span class="required-star">*</span></label>
                    <input type="text" class="form-control" id="aw_audit_id"  readonly
                      style="background:var(--bs-tertiary-bg);color:var(--bs-secondary-color);">
                  </div>
                  <div class="col-md-8">
                    <label for="aw_title" class="form-label">Audit Title <span class="required-star">*</span></label>
                    <input type="text" class="form-control" id="aw_title" placeholder="e.g. IT Controls Annual Review">
                  </div>
                  <div class="col-12">
                    <label for="aw_objective" class="form-label">Objective / Purpose</label>
                    <textarea class="form-control" id="aw_objective" rows="3"
                      placeholder="Describe the objective of this audit"></textarea>
                  </div>
                  <div class="col-md-6">
                    <label for="aw_type" class="form-label">Audit Type <span class="required-star">*</span></label>
                    <select id="aw_type" class="form-select modal-custom-select">
                      <option value="">Select type</option>
                      <option>Internal</option>
                      <option>External</option>
                      <option>Regulatory</option>
                      <option>Certification</option>
                      <option>Follow-up</option> 
                      <option>Special</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="aw_category" class="form-label">Audit Category <span
                        class="required-star">*</span></label>
                    <select id="aw_category" class="form-select modal-custom-select">
                      <option value="">Select category</option>
                      <option>Legal Compliance</option>
                      <option>Tax Compliance</option>
                      <option>Corporate Governance</option>
                      <option>Financial Reporting</option>
                      <option>AML &amp; ABAC</option>
                      <option>Data Privacy</option>
                      <option>ESG Compliance</option>
                      <option>HSE Compliance</option>
                      <option>IT &amp; Cybersecurity</option>
                      <option>Operational</option>
                      <option>Supply Chain</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="aw_period" class="form-label">Audit Period</label>
                    <select id="aw_period" class="form-select modal-custom-select">
                      <option>Q1</option>
                      <option>Q2</option>
                      <option>Q3</option>
                      <option>Q4</option>
                      <option>H1</option>
                      <option>H2</option>
                      <option>Annual</option>
                      <option>Custom</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="aw_framework" class="form-label">Regulatory Framework</label>
					<input type="text" class="form-control" id="aw_framework" 
                      style="background:var(--bs-tertiary-bg);color:var(--bs-secondary-color);">
                    <!-- <select id="aw_framework" class="form-select modal-custom-select">
                      <option value="">None</option>
                      <option>ISO 27001</option>
                      <option>SOX</option>
                      <option>GDPR</option>
                      <option>PCI-DSS</option>
                      <option>ISO 9001</option>
                      <option>IFRS</option>
                      <option>Basel III</option>
                      <option>FATCA</option>
                    </select> -->
                  </div>
                </div>
              </div>

              <!-- ═══ STEP 2 — Classification ═══════════ -->
              <div class="audit-step-panel" data-panel="2">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="aw_dept" class="form-label">Department / Business Unit <span
                        class="required-star">*</span></label>
                      <select id="aw_dept" name="" class="form-select modal-custom-select"
                        data-placeholder="Select a Department" >
                      </select>
                    <!-- <select id="aw_dept" class="form-select modal-custom-select">
                      <option value="">Select</option>
                      <option>IT</option>
                      <option>Finance</option>
                      <option>Procurement</option>
                      <option>HR</option>
                      <option>Legal</option>
                      <option>Operations</option>
                      <option>Retail Banking</option>
                      <option>Facilities</option>
                      <option>Risk Management</option>
                    </select> -->
                  </div>
                  <div class="col-md-6">
                    <label for="aw_entity" class="form-label">Entity / Legal Entity</label>
					<input type="text" class="form-control" id="aw_entity" 
                      style="background:var(--bs-tertiary-bg);color:var(--bs-secondary-color);">
                    <!-- <select id="aw_entity" class="form-select modal-custom-select">
                      <option value="">All Entities</option>
                      <option>HQ</option>
                      <option>Subsidiary A</option>
                      <option>Subsidiary B</option>
                      <option>Joint Venture</option>
                    </select> -->
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label class="form-label">Risk Rating <span class="required-star">*</span></label>
                      <div class="audit-check-group" id="awRiskGroup">
                        <label class="audit-check-chip audit-risk-chip high">
                          <input type="radio" name="aw_risk" value="High"><i class="fas fa-exclamation-circle"></i> High
                        </label>
                        <label class="audit-check-chip audit-risk-chip medium">
                          <input type="radio" name="aw_risk" value="Medium"><i class="fas fa-exclamation-triangle"></i>
                          Medium
                        </label>
                        <label class="audit-check-chip audit-risk-chip low">
                          <input type="radio" name="aw_risk" value="Low"><i class="fas fa-check-circle"></i> Low
                        </label>
                      </div>
                    </div>
                  </div>
                  <!-- Materiality / Impact Areas -->
                  <div class="col-12">

                    <label for="aw_materiality" class="form-label">Materiality / Impact Areas</label>
                    <select id="aw_materiality" class="form-select modal-custom-select" multiple
                      data-placeholder="Select Materiality / Impact Areas">
                      <option value="Financial">Financial</option>
                      <option value="Reputational">Reputational</option>
                      <option value="Regulatory">Regulatory</option>
                      <option value="Operational">Operational</option>
                      <option value="Strategic">Strategic</option>
                      <option value="Legal">Legal</option>
                    </select>

                  </div>
                  <div class="col-md-6">
                    <label for="aw_risk_score" class="form-label">Inherent Risk Score (1-10)</label>
                    <input type="number" class="form-control" id="aw_risk_score" min="1" max="10" placeholder="e.g. 7">
                  </div>
                  <div class="col-md-6">
                    <label for="aw_control_eff" class="form-label">Control Effectiveness</label>
                    <select id="aw_control_eff" class="form-select modal-custom-select">
                      <option value="">Select</option>
                      <option>Strong</option>
                      <option>Adequate</option>
                      <option>Needs Improvement</option>
                      <option>Inadequate</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="aw_status" class="form-label">Status <span class="required-star">*</span></label>
                    <select id="aw_status" class="form-select modal-custom-select">
                      <option>Planned</option>
                      <option>In Progress</option>
                      <option>Under Review</option>
                      <option>Completed</option>
                      <option>On Hold</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="aw_priority" class="form-label">Priority</label>
                    <select id="aw_priority" class="form-select modal-custom-select">
                      <option>Normal</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>

                  <div class="col-md-6">
                    <label for="aw_progress" class="form-label">Progress</label>
                    <input type="number" class="form-control" id="aw_progress" min="1" max="100" placeholder="e.g. 7">
                  </div>
                </div>
              </div>

              <!-- ═══ STEP 3 — Team & Schedule ══════════ -->
              <div class="audit-step-panel" data-panel="3">
                <div class="row g-3">
                  <!-- <div class="col-md-6">
                    <label for="aw_start_date" class="form-label">Audit Start Date <span
                        class="required-star">*</span></label>
                    <input type="text" class="form-control datePicker" id="aw_start_date"
                      placeholder="Select start date">
                  </div>
                  <div class="col-md-6">
                    <label for="aw_end_date" class="form-label">Audit End Date <span
                        class="required-star">*</span></label>
                    <input type="text" class="form-control datePicker" id="aw_end_date" placeholder="Select end date">
                  </div> -->
                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group">
                      <label for="am_audit_start_date" class="form-label">Audit Start/End Date</label>
                      <input type="text" class="form-control date-range-picker" data-language="en"
                        name="am_audit_start_date" id="am_audit_start_date" placeholder="Audit Start Date" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label for="aw_next_review" class="form-label">Next Review Date</label>
                    <input type="text" class="form-control datePicker" id="aw_next_review" placeholder="Select date">
                  </div>
                  <div class="col-md-6">
                    <label for="aw_report_due" class="form-label">Report Due Date</label>
                    <input type="text" class="form-control datePicker" id="aw_report_due" placeholder="Select date">
                  </div>
                  <div class="col-md-6">
                    <label for="aw_updated_by_lead" class="form-label">Lead Auditor <span
                        class="required-star">*</span></label>
                         <select id="aw_updated_by_lead" name="Risk_owner"
                                            class="form-select modal-custom-select"
                                            data-placeholder="Select">
                                          
                          </select>
                   
                  </div>
                  <div class="col-md-6">
                    <label for="aw_auditor_type" class="form-label">Auditor Type</label>
                    <select id="aw_auditor_type" class="form-select modal-custom-select">
                      <option>Internal</option>
                      <option>External</option>
                      <option>Third Party</option>
                      <option>Joint</option>
                    </select>
                  </div>
                  <div class="col-12">
                    <label for="aw_team_members" class="form-label">Additional Auditors / Team Members</label>
                    <select id="aw_team_members" class="form-select modal-custom-select" multiple
                      data-placeholder="Select Team Members">
                      <!-- <option value="Kim Karlos">Kim Karlos</option>
                      <option value="John Doe">John Doe</option>
                      <option value="Sarah O.">Sarah O.</option>
                      <option value="Tom Wilson">Tom Wilson</option>
                      <option value="Arjun Mehta">Arjun Mehta</option>
                      <option value="Priya Sharma">Priya Sharma</option> -->
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="aw_auditee" class="form-label">Auditee (Management Contact)</label>
                    <select id="aw_auditee" class="form-select modal-custom-select">
                      <option value="">Select</option>
                      <option>Head of IT</option>
                      <option>CFO</option>
                      <option>COO</option>
                      <option>CISO</option>
                      <option>Head of HR</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="aw_updated_by" class="form-label">Updated By</label>
                     <input type="text" class="form-control" data-language="en"
                        name="aw_updated_by" id="aw_updated_byName" placeholder="Updated By"  readonly/>
                    
                  </div>
                </div>
              </div>

              <!-- ═══ STEP 4 — Scope & Criteria ═════════ -->
              <div class="audit-step-panel" data-panel="4">
                <div class="row g-3">
                  <div class="col-12">
                    <label for="aw_scope" class="form-label">Scope of Audit</label>
                    <textarea class="form-control" id="aw_scope" rows="3"
                      placeholder="Define what is in scope and out of scope"></textarea>
                  </div>
                  <div class="col-12">
                    <label for="aw_criteria" class="form-label">Audit Criteria / Standards</label>
                    <textarea class="form-control" id="aw_criteria" rows="2"
                      placeholder="e.g. ISO 27001:2022 clause 9, SOX Section 404"></textarea>
                  </div>
                  <div class="col-md-6">
                    <label for="aw_findings" class="form-label"># of Findings (expected)</label>
                    <input type="number" class="form-control" id="aw_findings" placeholder="0">
                  </div>
                  <div class="col-md-6">
                    <label for="aw_issues" class="form-label"># of Issues (expected)</label>
                    <input type="number" class="form-control" id="aw_issues" placeholder="0">
                  </div>
                  <div class="col-12">
                    <label for="aw_checklist" class="form-label">Audit Checklist / Workprogram Reference</label>
                    <input type="text" class="form-control" id="aw_checklist"
                      placeholder="Link or reference to audit work program">
                  </div>
                  <!-- <div class="col-12">
                    <div class="form-group">
                      <label class="form-label">Supporting Documents / Attachments</label>
                      <div class="audit-drop-zone" onclick="document.getElementById('awAttachInput').click()">
                        <i class="fas fa-cloud-upload-alt d-block"></i>
                        <div style="font-size:13px;margin-top:4px;">Click to upload or drag & drop files here</div>
                        <div class="text-muted" style="font-size:11px;margin-top:2px;">
                          Supports: PDF, DOCX, XLSX, PPTX, JPEG — max 20MB
                        </div>
                        <input type="file" id="awAttachInput" style="display:none" multiple
                          accept=".pdf,.docx,.xlsx,.pptx,.jpg,.jpeg">
                      </div>
                    </div>
                  </div> -->
                  <div class="col-12">
                    <label for="aw_notes" class="form-label">Internal Notes / Comments</label>
                    <textarea class="form-control" id="aw_notes" rows="2"
                      placeholder="Any additional notes for internal use"></textarea>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label class="form-label">Notifications</label>
                      <div class="audit-check-group">
                        <label class="audit-check-chip"><input type="checkbox" class="notification-checkbox" checked> Email lead auditor on
                          creation</label>
                        <label class="audit-check-chip"><input type="checkbox" class="notification-checkbox"> Notify management on
                          High/Critical</label>
                        <!-- <label class="audit-check-chip"><input type="checkbox" class="notification-checkbox"> Daily digest to auditee</label>
                        <label class="audit-check-chip"><input type="checkbox" class="notification-checkbox"> Slack/Teams alert</label> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ═══ STEP 5 — Review & Submit ══════════ -->
              <div class="audit-step-panel" data-panel="5">
                <div class="audit-review-box mb-3">
                  <h6 class="fw-bold text-primary mb-3">Review Audit Details</h6>
                  <div class="row g-3" id="awReviewSummary">
                    <!-- Filled by JS -->
                  </div>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="awConfirmCheck">
                  <label class="form-check-label" for="awConfirmCheck" style="font-size:13px;">
                    I confirm that the information provided is accurate and complete to the best of my knowledge.
                  </label>
                </div>
              </div>
            </div>
          </div>


        </div><!-- /modal-body -->

        <div class="modal-footer">
          <button type="button" class="btn btn-label-secondary" id="awPrevBtn" style="display:none;"
            onclick="auditWizardStep(-1)">
            <i class="fas fa-arrow-left me-1"></i> Back
          </button>
          <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
            Cancel
          </button>
          <button type="button" class="btn btn-primary" id="awNextBtn" onclick="auditWizardStep(1)">
            Next <i class="fas fa-arrow-right ms-1"></i>
          </button>
          <button type="button" class="btn btn-primary" id="awSaveBtn" style="display:none;"
            onclick="handleRiskSave()">
            <i class="fas fa-check me-1"></i> Save Audit
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Audit Modal New -->


  <!-- Attachments  Pop Up -->
  	<div class="modal custom-modal fade" id="uploaded_files" tabindex="-1" role="dialog"
        aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <!-- <div class="modal-header">
                    <h5 >Attachments</h5>
                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                </div> -->
                <div class="modal-header">
                    <h4 data-i18n="File Upload" data-translate="page.meetings.meetingsListAction.attachments">Attachments</h4>
                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">
                            <div class="row">
                                <div class="attachment-upload">
                                    <div class="input-group mb-1"
                                        style="display: flex; align-items: stretch; width: 100%;">
                                        <input type="file" class="form-control" id="attachementuploadfile"
                                            accept=".pdf,.ppt,.jpeg,.xlsx,.doc,.docx"
                                            style="flex: 1; border-top-right-radius: 0; border-bottom-right-radius: 0;">
                                        <button type="button" id="attachementupload"
                                            style="border: 1px solid #ced4da; background-color: #e9ecef; padding: 6px 12px; border-left: none; border-top-left-radius: 0; border-bottom-left-radius: 0;">
                                            Upload
                                        </button>
                                    </div>
                                    <div class="mb-3 form-text" data-translate="page.meetings.meetingsListAction.attachmentsItems.upload_info">Supported file type (jpeg, pdf, pptx, xlsx, docx)</div>
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
                    <button type="button" class="btn btn-label-secondary" data-dismiss="modal" aria-label="Close" data-translate="page.meetings.cancel">
                        Cancel
                    </button>
                    <button class="btn btn-primary" value="Save" data-dismiss="modal" data-translate="page.meetings.save">Save
                    </button>
                </div>
            </div>
        </div>
    </div>
  <!-- Attachments  Pop Up -->

		

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


	<div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="recommendationOld"
		tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div
			class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
			<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Findings and Issues</h5>

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
	</div>  <div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="recommendation"
    tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg">
      <div class="modal-content">
        <div class="modal-header pb-0">
          <ul class="nav nav-tabs audit-line-tabs flex-nowrap" role="tablist" style="margin-bottom: -1px;">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-finding" type="button"
                role="tab">Finding</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-issue" type="button"
                role="tab">Issue</button>
            </li>
          </ul>
          <button type="button" class="btn-close mb-auto mt-2" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body pt-3">
          <div class="tab-content">
            <div class="tab-pane fade show active" id="tab-finding" role="tabpanel">
              <div class="card custom-card border-0">
                <div class="card-body">


                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Linked Audit <span class="required-star">*</span></label>
                         <input type="text" class="form-control" data-language="en"
                        name="linked_audit_name" id="linked_audit_name"   readonly/>
                        <!-- <select class="form-select modal-custom-select" data-placeholder="Select Audit">
                          <option value="">Select Audit</option>
                          <option>AUD-2025-001</option>
                          <option>AUD-2025-002</option>
                          <option>AUD-2025-003</option>
                        </select> -->
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Finding Type</label>
                        <select class="form-select modal-custom-select" id="findings_type" data-placeholder="Select Type">
                          <option value="">Select Type</option>
                          <option>Observation</option>
                          <option>Non-Conformance</option>
                          <option>Major Non-Conformance</option>
                          <option>Opportunity for Improvement</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <!-- Add Multiple Findings -->
                  <div class="d-flex justify-content-between align-items-center mb-3 mt-4">
                    <h5 class="mb-0"># of Findings</h5>
                    <button type="button" id="btnAddFinding" class="btn btn-sm btn-primary rounded-pill"><i
                        data-lucide="plus" style="width: 16px; height: 16px;" class="me-1"></i> Add
                      Finding</button>
                  </div>
                  <div id="findingsContainer">
                    <div class="finding-block p-3 border rounded mb-3 position-relative">
                      <button type="button"
                        class="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center position-absolute top-0 end-0 m-2 btn-remove-finding"
                        style="width: 32px; height: 32px; padding: 0;" aria-label="Remove"><i data-lucide="trash-2"
                          style="width: 16px; height: 16px;"></i></button>
                      <h6 class="mb-3 text-primary font-semibold">Finding #1</h6>
                      <div class="row g-3">
                        <div class="col-12">
                          <div class="form-group">
                            <label class="form-label">Finding Title <span class="required-star">*</span></label>
                            <input type="text" class="form-control finding-title" placeholder="Brief description of the finding">
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="form-group">
                            <label class="form-label">Detailed Description</label>
                            <textarea class="form-control finding-description" rows="3"
                              placeholder="Provide a detailed description of the finding, evidence, and criteria"></textarea>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">Severity <span class="required-star">*</span></label>
                            <select class="form-select modal-custom-select finding-severity" data-placeholder="Select Severity">
                              <option value="">Select Severity</option>
                              <option>Critical</option>
                              <option>High</option>
                              <option>Medium</option>
                              <option>Low</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">Root Cause Category</label>
                            <select class="form-select modal-custom-select root-cause-category" data-placeholder="Select Root Cause">
                              <option value="">Select Root Cause</option>
                              <option>Process Gap</option>
                              <option>Human Error</option>
                              <option>System Failure</option>
                              <option>Policy Violation</option>
                              <option>Operational Lapse</option>
                              <option>Third-Party Failure</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">Root Cause Detail</label>
                            <input type="text" class="form-control root-cause-detail" placeholder="Explain the root cause">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">Owner / Responsible</label>
                            <select class="form-select modal-custom-select finding-owner" id="finding-owner" data-placeholder="Select Owner">
                              <!-- <option value="">Select Owner</option>
                              <option>John Smith</option>
                              <option>Sarah Johnson</option>
                              <option>Mark Lewis</option> -->
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">Target Resolution Date</label>
                            <div class="input-group">
                              <input type="text" class="form-control datePicker flatpickr-input finding-target-date" id="findingResolutionDate-01"
                                placeholder="Select Date">
                              <span class="input-group-text"><i data-lucide="calendar"
                                  style="width: 14px; height: 14px;"></i></span>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">Status</label>
                            <select class="form-select modal-custom-select finding-status" data-placeholder="Select Status">
                              <option>Open</option>
                              <option>In Progress</option>
                              <option>Resolved</option>
                              <option>Accepted Risk</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="form-group">
                            <label class="form-label">Recommendation / Corrective Action</label>
                            <textarea class="form-control finding-recommendation" rows="2"
                              placeholder="Recommended action to address this finding"></textarea>
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="form-group">
                            <label class="form-label">Management Response</label>
                            <textarea class="form-control finding-management-response" rows="2"
                              placeholder="Auditee management response / agreed action"></textarea>
                          </div>
                        </div>
                      </div>
                    </div>








                  </div>
                </div>
              </div>
            </div>
            <!-- End Finding Tab -->
            <!-- Start Issue Tab -->
            <div class="tab-pane fade" id="tab-issue" role="tabpanel">
              <div class="card custom-card border-0">
                <div class="card-body">


                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Linked Audit <span class="required-star">*</span></label>
                         <input type="text" class="form-control" data-language="en"
                        name="linked_audit_name_issue" id="linked_audit_name_issue"   readonly/>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">Issue Type</label>
                        <select class="form-select modal-custom-select" id="issues_type" data-placeholder="Select Type">
                          <option value="">Select Type</option>
                          <option>Observation</option>
                          <option>Non-Conformance</option>
                          <option>Major Non-Conformance</option>
                          <option>Opportunity for Improvement</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <!-- Add Multiple Issues -->
                  <div class="d-flex justify-content-between align-items-center mb-3 mt-4">
                    <h5 class="mb-0"># of Issue</h5>
                    <button type="button" id="btnAddIssue" class="btn btn-sm btn-primary rounded-pill"><i
                        data-lucide="plus" style="width: 16px; height: 16px;" class="me-1"></i> Add
                      Issue</button>
                  </div>
                  <div id="issuesContainer">
                    <div class="issue-block p-3 border rounded mb-3 position-relative">
                      <button type="button"
                        class="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center position-absolute top-0 end-0 m-2 btn-remove-issue"
                        style="width: 32px; height: 32px; padding: 0;" aria-label="Remove"><i data-lucide="trash-2"
                          style="width: 16px; height: 16px;"></i></button>
                      <h6 class="mb-3 text-primary font-semibold">Issue #1</h6>
                      <div class="row g-3">
                        <div class="col-12">
                          <div class="form-group">
                            <label class="form-label">Issue Title <span class="required-star">*</span></label>
                            <input type="text" class="form-control issue-title" placeholder="Brief description of the issue">
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="form-group">
                            <label class="form-label">Detailed Description</label>
                            <textarea class="form-control issue-description" rows="3"
                              placeholder="Provide a detailed description of the issue, evidence, and criteria"></textarea>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">Severity <span class="required-star">*</span></label>
                            <select class="form-select modal-custom-select issue-severity" data-placeholder="Select Severity">
                              <option value="">Select Severity</option>
                              <option>Critical</option>
                              <option>High</option>
                              <option>Medium</option>
                              <option>Low</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">Root Cause Category</label>
                            <select class="form-select modal-custom-select issue-root-cause" data-placeholder="Select Root Cause">
                              <option value="">Select Root Cause</option>
                              <option>Process Gap</option>
                              <option>Human Error</option>
                              <option>System Failure</option>
                              <option>Policy Violation</option>
                              <option>Operational Lapse</option>
                              <option>Third-Party Failure</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">Root Cause Detail</label>
                            <input type="text" class="form-control issue-root-cause-detail" placeholder="Explain the root cause">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">Owner / Responsible</label>
                            <select class="form-select modal-custom-select issue-owner" id="issue-owner" data-placeholder="Select Owner">
                              <option value="">Select Owner</option>
                              <option>John Smith</option>
                              <option>Sarah Johnson</option>
                              <option>Mark Lewis</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">Target Resolution Date</label>
                            <div class="input-group">
                              <input type="text" class="form-control datePicker issue-target-date" id="issueResolutionDate-01"
                                placeholder="Select Date">
                              <span class="input-group-text"><i data-lucide="calendar"
                                  style="width: 14px; height: 14px;"></i></span>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">Status</label>
                            <select class="form-select modal-custom-select issue-status" data-placeholder="Select Status">
                              <option>Open</option>
                              <option>In Progress</option>
                              <option>Resolved</option>
                              <option>Accepted Risk</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="form-group">
                            <label class="form-label">Recommendation / Corrective Action</label>
                            <textarea class="form-control issue-recommendation" rows="2"
                              placeholder="Recommended action to address this issue"></textarea>
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="form-group">
                            <label class="form-label">Management Response</label>
                            <textarea class="form-control issue-management-response" rows="2"
                              placeholder="Auditee management response / agreed action"></textarea>
                          </div>
                        </div>
                      </div>
                    </div>








                  </div>
                </div>
              </div>
              <!-- End Issue Tab -->
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal"
            aria-label="Close">Cancel</button>
          <button type="button" class="btn btn-primary" onclick="saveFindingsIssuesData()">Save</button>
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
            <h5 class="modal-title">Action/Tasks</h5>
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


  <!-- Findings Details Modal -->
  <div class="modal custom-modal fade" id="findings-details-modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Findings Details</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="table-responsive">
            <table class="table table-sm table-bordered text-nowrap">
              <thead class="table-light">
                <tr>
                  <th>ID</th>
                  <th>Linked Audit</th>
                  <th>Type</th>
                  <th>Title</th>
                  <th>Detailed Description</th>
                  <th>Severity</th>
                  <th>Root Cause Category</th>
                  <th>Root Cause Detail</th>
                  <th>Owner</th>
                  <th>Target Resolution Date</th>
                  <th>Status</th>
                  <th>Recommendation</th>
                  <th>Management Response</th>
                </tr>
              </thead>
              <tbody id="findings-details-tbody">
                <!-- <tr>
                  <td>FND-001</td>
                  <td>AUD-2025-001</td>
                  <td>Observation</td>
                  <td>Missing Documentation</td>
                  <td>Several compliance documents were missing in the final review.</td>
                  <td><span class="badge bg-danger">High</span></td>
                  <td>Process Gap</td>
                  <td>Documentation process not followed</td>
                  <td>John Smith</td>
                  <td>Oct 15, 2025</td>
                  <td>Open</td>
                  <td>Implement a checklist before final review.</td>
                  <td>Agreed, we will create a standard checklist.</td>
                </tr>
                <tr>
                  <td>FND-002</td>
                  <td>AUD-2025-002</td>
                  <td>Non-Conformance</td>
                  <td>Process Deviation</td>
                  <td>The standard operating procedure was not adhered to during testing.</td>
                  <td><span class="badge bg-warning">Medium</span></td>
                  <td>Human Error</td>
                  <td>Lack of proper training</td>
                  <td>Sarah Johnson</td>
                  <td>Oct 20, 2025</td>
                  <td>In Progress</td>
                  <td>Conduct refresher training for the team.</td>
                  <td>Training is scheduled for next week.</td>
                </tr> -->
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- Issues Details Modal -->
  <div class="modal custom-modal fade" id="issues-details-modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Issues Details</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="table-responsive">
            <table class="table table-sm table-bordered text-nowrap">
              <thead class="table-light">
                <tr>
                  <th>ID</th>
                  <th>Linked Audit</th>
                  <th>Type</th>
                  <th>Title</th>
                  <th>Detailed Description</th>
                  <th>Severity</th>
                  <th>Root Cause Category</th>
                  <th>Root Cause Detail</th>
                  <th>Owner</th>
                  <th>Target Resolution Date</th>
                  <th>Status</th>
                  <th>Recommendation</th>
                  <th>Management Response</th>
                </tr>
              </thead>
              <tbody id="issues-details-tbody">
               
              </tbody>
            </table>
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
		<script src="${contextroot}/js/notify.js"></script>
		<script src="js/initial.js"></script>
		<!-- <script src="js/custom/jquery.orgchart.js"></script>
		<script src="js/custom/org_structure.js"></script> -->
		






		<script type="text/javascript">
      
			$(document).ready(function () {
         var userId = $("#userPrincipal").val().trim();
         console.log(userId, "userIdData");

         
       

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
					"aw_updated_by": $("#ownername").val(),
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

					if ((elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) && (!$(this).hasClass("aw_updated_by-name") && !$(this).hasClass("userdept-name-multi-select"))) {
						$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}
					/*else if (elementVal.length != 0 && elementVal != undefined && elementVal != "" && (elementVal.length < minchar || elementVal.length >= maxchar)) {
						spanerrorMsg = "This field length should be greater than " + minchar + " and less than " + maxchar;
						$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}*/

					if ((elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) && ($(this).hasClass("aw_updated_by-name"))) {
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
    <script src="${contextroot}/js/select2.min.js"></script>
		<script src="${contextroot}/js/initial.js"></script>
		<script src="js/custom/file_upload_new.js"></script>
    <script src="${contextroot}/js/jspdf.umd.min.js"></script>
  <script src="${contextroot}/js/jspdf.plugin.autotable.min.js"></script>
		<script src="${contextroot}/js/auditManagementPage.js"></script>
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
				var parentHeader = "Parent";
				var ownerHeader = "Owner";
				var deptHeader = "Department";
				var emailHeader = "Email";
				var pagesHeader = "Pages";
				var fromDateHeader = "From Date";
				var toDateHeader = "To Date";
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
					aw_updated_by: $("#ownernameValue").val(),
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





		</script>


  <script>
    $('.modal-custom-select').each(function () {
      let $this = $(this);
      $this.select2({
        width: "100%",
        dropdownParent: $this.closest('.modal')
      });
    });

   
    // document.querySelectorAll('.datePicker').forEach(function (el) {
    //   const pickerId = el.getAttribute('id'); // Get the element’s ID
    //   flatpickr(`#${pickerId}`, {
    //     dateFormat: "M j, Y",  // Example: Oct 23, 2025
    //     allowInput: true
    //   });
    // });

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