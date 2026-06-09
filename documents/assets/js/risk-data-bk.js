
$(document).ready(function () {
    loadRiskData();
});

function loadRiskData() {
    const container = $('#risk-main-container');

    // Check if container exists
    if (container.length === 0) {
        console.error("Risk main container not found!");
        return;
    }

    // Show loading state
    container.html('<div class="text-center p-5"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>');

    $.getJSON("assets/json/risk.json", function (data) {
        container.empty(); // Clear loading state

        if (!data || data.length === 0) {
            container.html('<div class="text-center p-3">No risk data found.</div>');
            return;
        }

        let mainHtml = '<div class="accordion card-accordion" id="accordionExample">';
        data.forEach((item, index) => {
            mainHtml += renderRiskMainCard(item, index);
        });
        mainHtml += '</div>';
        
        container.html(mainHtml);

        const item = data[0]; // Currently rendering sidebars for the first risk item

        const causeContainer = $('.causenconsequence');
        const controlsContainer = $('.controls');
        const treatmentContainer = $('.treatment');
        const monitoringContainer = $('.monitoring');
        const filesContainer = $('.attachmentsView');
        const commentsContainer = $('.commentsView');

        function renderSidebars(item) {
            if (!item) return;

            if (causeContainer.length) {
                if (item.causesAndConsequences && item.causesAndConsequences.length > 0) {
                    causeContainer.html(renderCausesAndConsequences(item.causesAndConsequences, item.causeAndConsequenceTitle || 'Cause and Consequence'));
                } else {
                    causeContainer.empty();
                }
            }
            if (controlsContainer.length) {
                if (item.controls && item.controls.length > 0) {
                    controlsContainer.html(renderControls(item.controls, item.controlsTitle || 'Controls'));
                } else {
                    controlsContainer.empty();
                }
            }
            if (treatmentContainer.length) {
                if (item.riskTreatments && item.riskTreatments.length > 0) {
                    treatmentContainer.html(renderRiskTreatments(item.riskTreatments, item.riskTreatmentsTitle || 'Risk Treatment'));
                } else {
                    treatmentContainer.empty();
                }
            }
            if (monitoringContainer.length) {
                if (item.reviewMonitoring && item.reviewMonitoring.length > 0) {
                    monitoringContainer.html(renderReviewMonitoring(item.reviewMonitoring, item.reviewMonitoringTitle || 'Review & Monitoring'));
                } else {
                    monitoringContainer.empty();
                }
            }
            if (filesContainer.length) {
                if (item.files && item.files.length > 0) {
                    filesContainer.html(renderRiskFiles(item.files, item.filesTitle || 'Attachments'));
                } else {
                    filesContainer.empty();
                }
            }
            if (commentsContainer.length) {
                if (item.comments && item.comments.length > 0) {
                    commentsContainer.html(renderRiskComments(item.comments, item.commentsTitle || 'Comments'));
                } else {
                    commentsContainer.empty();
                }
            }
        }

        // Render sidebars for the initially expanded item
        renderSidebars(data[0]);

        // Re-render sidebars when an accordion item is expanded
        $('#accordionExample').on('show.bs.collapse', function(e) {
            const targetId = $(e.target).attr('id');
            if (targetId && targetId.startsWith('collapseRisk')) {
                const index = parseInt(targetId.replace('collapseRisk', ''), 10);
                if (!isNaN(index) && data[index]) {
                    renderSidebars(data[index]);
                    
                    // Re-initialize plugins inside sidebars
                    if (typeof initPopoverFilter === "function") initPopoverFilter();
                    if (window.lucide) { window.lucide.createIcons(); }
                    if (typeof initCardChart === "function") initCardChart();
                }
            }
        });

        // Re-initialize plugins
        if (typeof initPopoverFilter === "function") initPopoverFilter();

        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Initialize sparklines for chart-pie elements
        if (typeof initCardChart === "function") initCardChart();

        // Initialize Tooltips
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    }).fail(function (jqxhr, textStatus, error) {
        console.error("Error loading risk JSON: ", textStatus, error);
        container.html('<div class="text-danger text-center p-3">Failed to load risk data.</div>');
    });
}


function renderRiskMainCard(item, index) {
    const collapseId = `collapseRisk${index}`;
    const showClass = index === 0 ? "show" : "";
    const collapsedClass = index === 0 ? "" : "collapsed";
    const isExpanded = index === 0 ? "true" : "false";

    return `
  <div class="card custom-card table-card kpi_page_details accordion-item">
   <div class="accordion-header flex-wrap">
    <div class="card-header kpi_details-title">
     <div class="c-header-left kpi_details-title-box flex-nowrap">
      <div aria-controls="${collapseId}" aria-expanded="${isExpanded}" class="accordion-button ${collapsedClass}" data-bs-target="#${collapseId}" data-bs-toggle="collapse" type="button">
      </div>
      <div class="user-card">
        <div class="user-image user-image-sm user-active">
          <img alt="${item.owner.name}" class="rounded-circle" height="24" src="${item.owner.image}" width="24">
        </div>
      </div>
      <h5 class="card-title me-auto">
       <strong class="editableTxt1" editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">
        ${item.title}
       </strong>
      </h5>
     </div>
     <div class="card-actions justify-content-end">
                  <div class="heat-map">

                    <select name="" class="form-select form-select-sm">
                      <option value="" selected disabled>Select Version</option>
                      <option value="version_3">Version 3</option>
                      <option value="version_2">Version 2</option>
                      <option value="version_1">Version 1</option>
                    </select>
                  </div>

                  <button type="button" class="btn btn-sm btn-icon">
                    <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Approval">
                      <i data-lucide="check" style="width: 14px; height: 14px;"></i>
                    </span>
                  </button>

                  <a href="#risk-edit-modal" data-bs-toggle="modal" class="btn btn-sm btn-icon">
                    <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Edit">
                      <i data-lucide="pencil" style="width: 14px; height: 14px;"></i>
                    </span>
                  </a>

                  <a href="#attachments-modal" data-bs-toggle="modal" class="btn btn-sm btn-icon">
                    <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="File Upload">
                      <i data-lucide="paperclip" style="width: 14px; height: 14px;"></i>
                    </span>
                  </a>

                  <button type="button" class="btn btn-sm btn-icon" id="popoverFilter">
                    <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="View">
                      <i data-lucide="eye" style="width: 14px; height: 14px;"></i>
                    </span>
                  </button>
                    <a href="#" onclick="loadDataAndGeneratePDF()" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        data-bs-title="Generate Report" class="btn btn-sm btn-icon">
                        <i data-lucide="file-text" style="width: 16px; height: 16px;"></i>
                    </a>
                  <div class="dropdown">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">

                      <i data-lucide="ellipsis-vertical" style="width: 14px; height: 14px;"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                      <li>
                        <a class="dropdown-item" href="#">Download</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Delete</a>
                      </li>
                    </ul>
                  </div>
     </div>
    </div>
   </div>
   <div class="accordion-collapse collapse ${showClass}" data-bs-parent="#accordionExample" id="${collapseId}">
    <div class="accordion-body">
     <div class="kpi_page_details-content risk_page_details-content">
      <div class="card-body">
       <div class="kpi_details">
        <div class="table-responsive">
         <table class="table table-bordered align-center mb-0">
          <tbody>
           <tr>
            <th style="vertical-align: middle;">
             Department
            </th>
            <td style="vertical-align: middle;">
             ${item.department}
            </td>
           </tr>
           <tr>
            <th style="vertical-align: middle;">
             ${item.relatedParties}
            </th>
            <td style="vertical-align: middle;">
             ${item.relatedParties}
            </td>
           </tr>
           <tr>
            <th style="vertical-align: middle;">
             ${item.riskCategory}
            </th>
            <td style="vertical-align: middle;">
             ${item.riskCategory}
            </td>
           </tr>
           <tr>
            <th style="vertical-align: middle;">
             <p class="m-0 p-0 i-alert">
              <strong>
               Inherent Risk Score
              </strong>
              <span class="icon">
               <img src="assets/images/icons/info-i.svg"/>
              </span>
             </p>
            </th>
            <td style="vertical-align: middle;">
             ${item.inherentRiskScore}
            </td>
           </tr>
           <tr>
            <th style="vertical-align: middle;">
             <p class="i-alert">
              <strong>
               Residual Risk Score
              </strong>
              <span class="icon">
               <img src="assets/images/icons/info-i.svg"/>
              </span>
             </p>
            </th>
            <td style="vertical-align: middle;">
             ${item.residualRiskScore}</td>
           </tr>
           <tr>
            <th style="vertical-align: middle;">
             Risk Level
            </th>
            <td style="vertical-align: middle;">
             ${item.riskLevel}
            </td>
           </tr>
           <tr>
            <th style="vertical-align: middle;">
             Risk Code
            </th>
            <td style="vertical-align: middle;">
             ${item.riskCode}
            </td>
           </tr>
          </tbody>
         </table>
        </div>
       </div>
       <div class="kpi_details">
        <div class="table-responsive">
         <table class="table table-bordered align-center mb-0">
          <tbody>
           <tr>
            <th style="vertical-align: middle;">
             Date Raised
            </th>
            <td style="vertical-align: middle;">
             ${item.dateRaised}
            </td>
           </tr>
           <tr>
            <th style="vertical-align: middle;">
             Raised by
            </th>
            <td style="vertical-align: middle;">
             ${item.dateRaised}
            </td>
           </tr>
           <tr>
            <th style="vertical-align: middle;">
             KPI
            </th>
            <td style="vertical-align: middle;">
             ${item.businessImpactKPI.join(", ")}
            </td>
           </tr>
           <tr>
            <th style="vertical-align: middle;">
             Financial Impact
            </th>
            <td style="vertical-align: middle;">
             ${item.financialImpact.join(", ")}
            </td>
           </tr>
           <tr>
            <th style="vertical-align: middle;">
             Next Assessment
            </th>
            <td style="vertical-align: middle;">
             ${item.nextAssessment}
            </td>
           </tr>
           <tr>
            <th style="vertical-align: middle;">
             Date Completed
            </th>
            <td style="vertical-align: middle;">
             ${item.dateCompleted}
            </td>
           </tr>
          </tbody>
         </table>
        </div>
       </div>
       <div class="kpi_details">
        <div class="table-responsive">
         <table class="table table-bordered align-center mb-0">
          <tbody>
           <tr>
            <th style="vertical-align: middle;">
             POS
            </th>
            <td style="vertical-align: middle;">
             ${item.pos}
            </td>
           </tr>
           <tr>
            <th style="vertical-align: middle;">
             ISO
            </th>
            <td style="vertical-align: middle;">
             ${item.iso}
            </td>
           </tr>
           <tr>
            <th style="vertical-align: middle;">
             Information Asset
            </th>
            <td style="vertical-align: middle;">
             ${item.informationAsset.join(", ")}
            </td>
           </tr>
           <tr>
            <th style="vertical-align: middle;">
             Others
            </th>
            <td style="vertical-align: middle;">
            </td>
           </tr>
          </tbody>
         </table>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>`;
}

function renderOwners(owners, remaining) {
    if (!owners) return '';
    let html = '<ul class="list-unstyled d-flex align-items-center avatar-group mb-0">';

    owners.forEach(owner => {
        html += `
            <li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip" data-bs-placement="top" title="${owner.name}">
                <img src="${owner.image}" class="rounded-circle" alt="${owner.name}" width="24" height="24">
            </li>
        `;
    });

    if (remaining > 0) {
        html += `
             <li class="avatar avatar-xs pull-up" data-bs-toggle="modal" data-bs-target="#user_edit_popup">
                <span class="avatar-initial rounded-circle" data-bs-toggle="tooltip" data-bs-placement="top" title="${remaining} more">+${remaining}</span>
            </li>
        `;
    }

    html += '</ul>';
    return html;
}

function renderCausesAndConsequences(causes, title) {
    let bodyHtml = '';
    if (causes && causes.length > 0) {
        bodyHtml += `<div class="accordion accordion-flush-risk accordion-custom accordion-collopse-content" id="accordionCauseandConsequence">`;
        
        causes.forEach((cause, index) => {
            const collapseId = `causeandConsequence-collapse-${index}`;
            const headerId = `flush-risk-heading-${index}`;
            const isFirst = index === 0;
            const showClass = isFirst ? 'show' : '';
            const expanded = isFirst ? 'true' : 'false';

            const badgeTextHtml = `<span class="d-flex"><span class="${cause.badgeClass.replace('status-bg-', 'text-')}">${cause.badge}</span></span>`;

            bodyHtml += `
            <div class="accordion-item">
             <div class="accordion-header bg-light justify-content-between d-flex gap-2" id="${headerId}">
              <button aria-controls="${collapseId}" aria-expanded="${expanded}" class="btn btn-title d-flex justify-content-between p-0 p-2${isFirst ? '' : ' collapsed'}" data-bs-target="#${collapseId}" data-bs-toggle="collapse">
               '${cause.title}'
               ${badgeTextHtml}
              </button>
              <div class="dropdown p-2">
               <button aria-expanded="true" class="btn btn-link p-0" data-bs-toggle="dropdown" type="button">
                <img height="16" src="assets/images/icons/menu-dot-vertical-i.svg" width="16"/>
               </button>
               <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                <li><a class="dropdown-item" data-bs-toggle="modal" href="#cansuconse_desc_add_popup">Add</a></li>
                <li><a class="dropdown-item" data-bs-toggle="modal" href="#cause_conq_popup">Edit</a></li>
                <li><a class="dropdown-item" href="#" onclick="return false;">Delete</a></li>
               </ul>
              </div>
             </div>
             
             <div aria-labelledby="${headerId}" class="accordion-collapse collapse ${showClass}" data-bs-parent="#accordionCauseandConsequence" id="${collapseId}">
              <div class="accordion-body p-2">`;

            // Render consequences
            if (cause.consequences) {
                cause.consequences.forEach(con => {
                    const conBadgeTextHtml = `<span class="d-flex"><span class="${con.badgeClass.replace('status-bg-', 'text-')}">${con.badge}</span></span>`;
                    bodyHtml += `
               <div class="accordion-list shadow-sm justify-content-between d-flex gap-2">
                <h6 class="title d-flex justify-content-between mb-0">
                 ${con.title}
                 ${conBadgeTextHtml}
                </h6>
                <div class="dropdown">
                 <button aria-expanded="true" class="btn btn-link p-0" data-bs-toggle="dropdown" type="button">
                  <img height="16" src="assets/images/icons/menu-dot-vertical-i.svg" width="16"/>
                 </button>
                 <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                  <li><a class="dropdown-item" data-bs-toggle="modal" href="#cansuconse_desc_add_popup">Edit</a></li>
                  <li><a class="dropdown-item" href="#" onclick="return false;">Delete</a></li>
                 </ul>
                </div>
               </div>`;
                });
            }

            bodyHtml += `
              </div>
             </div>
            </div>`;
        });
        bodyHtml += `</div>`;
    }

    return `
    <div class="card custom-card table-card table-container h-100">
     <div class="card-header">
      <div class="c-header-left">
       <h5 class="card-title">
        <strong class="editableTxt1" editable="true" onkeypress="return (this.innerText.length <= 25)">
         ${title}
        </strong>
       </h5>
      </div>
      <div class="card-actions">
       <button class="btn btn-light p-1" data-bs-target="#cause_conq_popup" data-bs-toggle="modal" type="button">
        <span data-bs-placement="bottom" data-bs-title="Add" data-bs-toggle="tooltip">
         <i class="fas fa-plus title_edit_icon"></i>
        </span>
       </button>
       <div class="dropdown">
        <button aria-expanded="true" class="btn btn-light p-1" data-bs-toggle="dropdown" type="button">
         <img height="16" src="assets/images/icons/menu-dot-vertical-i.svg" width="16"/>
        </button>
        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
         <li><a class="dropdown-item" data-bs-toggle="modal" href="#cause_conq_view_popup">View</a></li>
         <li><a class="dropdown-item" href="#" onclick="return false;">Delete</a></li>
        </ul>
       </div>
      </div>
     </div>
     <div class="card-body overflow-auto" style="height: 340px;">
        <div id="risk-cause-consequence">
            ${bodyHtml}
        </div>
     </div>
    </div>`;
}

function renderControls(controls, title) {
    let bodyHtml = '';
    if (controls && controls.length > 0) {
        bodyHtml += `<div class="accordion accordion-flush-risk accordion-custom accordion-collopse-content" id="accordionControls">`;
        
        controls.forEach((ctrl, index) => {
            const collapseId = `controls-collapse-${index}`;
            const headerId = `controls-heading-${index}`;
            const isFirst = index === 0;
            const expanded = isFirst ? 'true' : 'false';
            const showClass = isFirst ? 'show' : '';
            const ownersHtml = renderOwners(ctrl.owners, ctrl.remainingOwners);

            bodyHtml += `
            <div class="accordion-item">
             <div class="accordion-header bg-light" id="${headerId}">
              <div class="d-flex justify-content-between p-2 gap-1">
               <button aria-controls="${collapseId}" aria-expanded="${expanded}" class="btn p-0 btn-title d-flex${isFirst ? '' : ' collapsed'}" data-bs-target="#${collapseId}" data-bs-toggle="collapse">
                <div class="row row-cols-1 g-2">
                 <p class="col mb-0">${ctrl.title}</p>
                </div>
               </button>
               <div class="py-2 ps-0 d-flex align-items-start ms-auto">
                ${ownersHtml}
               </div>
               <div class="dropdown py-2 ps-0">
                <button aria-expanded="true" class="btn btn-link p-0" data-bs-toggle="dropdown" type="button">
                 <img height="16" src="assets/images/icons/menu-dot-vertical-i.svg" width="16"/>
                </button>
                <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                 <li><a class="dropdown-item" data-bs-toggle="modal" href="#activity_desc_edit_popup">Add</a></li>
                 <li><a class="dropdown-item" data-bs-toggle="modal" href="#plan_desc_add_popup">Edit</a></li>
                 <li><a class="dropdown-item" href="#" onclick="return false;">Delete</a></li>
                </ul>
               </div>
              </div>
              <div class="p-2 d-flex flex-row w-100">
               <div class="d-flex flex-column flex-fill">
                <div class="d-flex flex-row align-items-center gap-2">
                 <div class="icon">
                  <div class="chart_yellow chart-pie" data-percent="${ctrl.progress}"></div>
                 </div>
                 <div class="pie-progress">${ctrl.progress}%</div>
                </div>
               </div>
               <div class="d-flex flex-column flex-fill">
                <div><strong>${ctrl.strategy}</strong></div>
               </div>
               <div class="d-flex flex-column">
                <div><strong>${ctrl.date}</strong></div>
               </div>
              </div>
             </div>
             
             <div aria-labelledby="${headerId}" class="accordion-collapse collapse ${showClass}" data-bs-parent="#accordionControls" id="${collapseId}">`;

            // Render control items
            if (ctrl.items) {
                ctrl.items.forEach(item => {
                    const statusClass = item.statusClass.replace('status-bg-', 'text-');
                    bodyHtml += `
               <div class="accordion-header control-child">
                <div class="d-flex justify-content-between p-2 gap-1">
                 <button class="btn p-0 btn-title d-flex">
                  <div class="row row-cols-1 g-2">
                   <p class="col mb-0">${item.title}</p>
                  </div>
                 </button>
                 <div class="py-2 ps-0 d-flex align-items-start ms-auto">
                  <span class="${statusClass}">${item.status}</span>
                 </div>
                 <div class="dropdown py-2 ps-0">
                  <button aria-expanded="true" class="btn btn-link p-0" data-bs-toggle="dropdown" type="button">
                   <img height="16" src="assets/images/icons/menu-dot-vertical-i.svg" width="16"/>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                   <li><a class="dropdown-item" data-bs-toggle="modal" href="#activity_desc_edit_popup">Edit</a></li>
                   <li><a class="dropdown-item" href="#" onclick="return false;">Delete</a></li>
                  </ul>
                 </div>
                </div>
                <div class="p-2 d-flex flex-row w-100">
                 <div class="d-flex flex-column flex-fill">
                  <div class="d-flex flex-row align-items-center gap-2">
                   <div class="icon">
                    <div class="chart_yellow chart-pie" data-percent="${item.progress}"></div>
                   </div>
                   <div class="pie-progress">${item.progress}%</div>
                  </div>
                 </div>
                 <div class="d-flex flex-column">
                  <div><strong>${item.date}</strong></div>
                 </div>
                </div>
               </div>`;
                });
            }

            bodyHtml += `
             </div>
            </div>`;
        });
        bodyHtml += `</div>`;
    }

    return `
    <div class="card custom-card table-card h-100">
     <div class="card-header">
      <div class="c-header-left">
       <h5 class="card-title">
        <strong class="editableTxt1" editable="true" onkeypress="return (this.innerText.length <= 25)">
         ${title}
        </strong>
       </h5>
      </div>
      <div class="card-actions">
       <button class="btn btn-light p-1" data-bs-target="#plan_desc_add_popup" data-bs-toggle="modal">
        <span data-bs-placement="bottom" data-bs-title="Add" data-bs-toggle="tooltip">
         <i class="fas fa-plus title_edit_icon"></i>
        </span>
       </button>
       <div class="dropdown">
        <button aria-expanded="true" class="btn btn-light p-1" data-bs-toggle="dropdown" type="button">
         <img height="16" src="assets/images/icons/menu-dot-vertical-i.svg" width="16"/>
        </button>
        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
         <li><a class="dropdown-item" data-bs-toggle="modal" href="#sub_initative_view_popup">View</a></li>
         <li><a class="dropdown-item" href="#" onclick="return false;">Delete</a></li>
        </ul>
       </div>
      </div>
     </div>
     <div class="card-body employee_div_body_box sub-ini-box overflow-auto" style="height: 340px;">
        <div id="risk-controls">
            ${bodyHtml}
        </div>
     </div>
    </div>`;
}

function renderRiskTreatments(treatments, title) {
    let bodyHtml = '';
    if (treatments && treatments.length > 0) {
        bodyHtml += `<div class="accordion accordion-flush-risk accordion-custom accordion-collopse-content" id="accordionTreatment">`;
        
        treatments.forEach((treat) => {
            const ownersHtml = renderOwners(treat.owners, treat.remainingOwners);

            bodyHtml += `
            <div class="accordion-item">
             <div class="accordion-header bg-light">
              <div class="d-flex justify-content-between p-2 gap-1">
               <button class="btn p-0 btn-title d-flex text-start">
                <div class="row row-cols-1 g-2">
                 <p class="col mb-0"><strong>Reducing Impact:</strong> '${treat.reducingImpact}'</p>
                 <p class="col mb-0"><strong>Reducing Possibility:</strong> '${treat.reducingPossibility}'</p>
                </div>
               </button>
               <div class="py-2 ps-0 d-flex align-items-start ms-auto">
                ${ownersHtml}
               </div>
               <div class="dropdown py-2 ps-0">
                <button aria-expanded="true" class="btn btn-link p-0" data-bs-toggle="dropdown" type="button">
                 <img height="16" src="assets/images/icons/menu-dot-vertical-i.svg" width="16"/>
                </button>
                <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                 <li><a class="dropdown-item" data-bs-toggle="modal" href="#risk_desc_edit_popup">Edit</a></li>
                 <li><a class="dropdown-item" href="#" onclick="return false;">Delete</a></li>
                </ul>
               </div>
              </div>
              <div class="p-2 d-flex flex-row w-100">
               <div class="d-flex flex-column flex-fill">
                <div class="d-flex flex-row align-items-center gap-2">
                 <div class="icon">
                  <div class="chart_yellow chart-pie" data-percent="${treat.progress}"></div>
                 </div>
                 <div class="pie-progress">${treat.progress}%</div>
                </div>
               </div>
               <div class="d-flex flex-column flex-fill">
                <div><strong>${treat.strategy}</strong></div>
               </div>
               <div class="d-flex flex-column">
                <div><strong>${treat.date}</strong></div>
               </div>
              </div>
             </div>
            </div>`;
        });
        bodyHtml += `</div>`;
    }

    return `
    <div class="card custom-card table-card h-100">
     <div class="card-header">
      <div class="c-header-left">
       <h5 class="card-title">
        <strong class="editableTxt1" editable="true" onkeypress="return (this.innerText.length <= 25)">
         ${title}
        </strong>
       </h5>
      </div>
      <div class="card-actions">
       <button class="btn btn-light p-1" data-bs-target="#risk_desc_add_popup" data-bs-toggle="modal">
        <i class="fas fa-plus"></i>
       </button>
       <div class="dropdown">
        <button aria-expanded="true" class="btn btn-light p-1" data-bs-toggle="dropdown" type="button">
         <img height="16" src="assets/images/icons/menu-dot-vertical-i.svg" width="16"/>
        </button>
        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
         <li><a class="dropdown-item" data-bs-toggle="modal" href="#treatment_view_popup">View</a></li>
         <li><a class="dropdown-item" href="#" onclick="return false;">Delete</a></li>
        </ul>
       </div>
      </div>
     </div>
     <div class="card-body employee_div_body_box sub-ini-box overflow-auto" style="height: 340px;">
        <div id="risk-treatment">
            ${bodyHtml}
        </div>
     </div>
    </div>`;
}

function renderReviewMonitoring(items, title) {
    let bodyHtml = '';
    if (items && items.length > 0) {
        bodyHtml += `<div class="accordion accordion-flush-risk accordion-custom accordion-collopse-content">`;
        
        items.forEach((item) => {
            const ownersHtml = renderOwners(item.owners, item.remainingOwners);

            bodyHtml += `
            <div class="accordion-item">
             <div class="accordion-header bg-light">
              <div class="d-flex justify-content-between p-2 gap-1">
               <button class="btn p-0 btn-title d-flex">
                <div class="row row-cols-1 g-2">
                 <p class="col mb-0">${item.title}</p>
                </div>
               </button>
               <div class="py-2 ps-0 d-flex align-items-start ms-auto">
                ${ownersHtml}
               </div>
               <div class="dropdown py-2 ps-0">
                <button aria-expanded="true" class="btn btn-link p-0" data-bs-toggle="dropdown" type="button">
                 <img height="16" src="assets/images/icons/menu-dot-vertical-i.svg" width="16"/>
                </button>
                <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                 <li><a class="dropdown-item" data-bs-toggle="modal" href="#reviewMonitoring-edit-modal">Edit</a></li>
                 <li><a class="dropdown-item" href="#" onclick="return false;">Delete</a></li>
                </ul>
               </div>
              </div>
              <div class="p-2 d-flex flex-row w-100">
               <div class="d-flex flex-column flex-fill">
                <div class="d-flex flex-row align-items-center gap-2">
                 <div class="icon">
                  <div class="chart_yellow chart-pie" data-percent="${item.progress}"></div>
                 </div>
                 <div class="pie-progress">${item.progress}%</div>
                </div>
               </div>
               <div class="d-flex flex-column flex-fill">
                <div><strong>${item.status}</strong></div>
               </div>
               <div class="d-flex flex-column">
                <div><strong>${item.date}</strong></div>
               </div>
              </div>
             </div>
            </div>`;
        });
        bodyHtml += `</div>`;
    }

    return `
    <div class="card custom-card table-card h-100">
     <div class="card-header">
      <div class="c-header-left">
       <h5 class="card-title">
        <strong class="editableTxt1" editable="true" onkeypress="return (this.innerText.length <= 25)">
         ${title}
        </strong>
       </h5>
      </div>
      <div class="card-actions">
       <button class="btn btn-light p-1" data-bs-target="#reviewMonitoring-add-modal" data-bs-toggle="modal">
        <span data-bs-placement="bottom" data-bs-title="Add" data-bs-toggle="tooltip">
         <i class="fas fa-plus title_edit_icon"></i>
        </span>
       </button>
       <div class="dropdown">
        <button aria-expanded="true" class="btn btn-light p-1" data-bs-toggle="dropdown" type="button">
         <img height="16" src="assets/images/icons/menu-dot-vertical-i.svg" width="16"/>
        </button>
        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
         <li><a class="dropdown-item" data-bs-toggle="modal" href="#monitoring_view_popup">View</a></li>
         <li><a class="dropdown-item" href="#" onclick="return false;">Delete</a></li>
        </ul>
       </div>
      </div>
     </div>
     <div class="card-body employee_div_body_box sub-ini-box overflow-auto" style="height: 340px;">
        <div id="risk-monitoring">
            ${bodyHtml}
        </div>
     </div>
    </div>`;
}

function renderRiskFiles(files, title) {
    let bodyHtml = '';
    if (files && files.length > 0) {
        bodyHtml += '<div class="list-group initiatives-bar">';
        files.forEach(file => {
            bodyHtml += `
            <div class="list-group-item">
            <div class="bar-chart">
                <div class="d-flex gap-2"><h4 class="title mb-0">${file.title}</h4></div>
                <div class="numbers">
                <div class="text-muted left">${file.fileName} (${file.size})</div>
                <div class="text-muted right">${file.date}</div>
                </div>
            </div>
            <div class="list-actions">
                <div class="dropdown">
                <a href="#" class="btn btn-sm btn-outline-icon" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i data-lucide="more-vertical" style="width: 14px; height: 14px;"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                    <li><a href="#attachments-modal" class="dropdown-item" data-bs-toggle="modal">Edit</a></li>
                    <li><a href="#delete-modal" class="dropdown-item" data-bs-toggle="modal">Delete</a></li>
                </ul>
                </div>
            </div>
            </div>`;
        });
        bodyHtml += '</div>';
    }

    return `
    <div class="card custom-card table-card h-100">
      <div class="card-header">
        <div class="c-header-left">
          <h5 class="card-title">
            <strong contenteditable="true" onkeypress="return (this.innerText.length <= 36)">${title}</strong>
          </h5>
        </div>
        <div class="card-actions">
          <div class="dropdown">
            <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
              <i data-lucide="more-vertical" style="width: 14px; height: 14px;"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
              <li>
                <a class="dropdown-item" href="#attachments-view-modal" data-bs-toggle="modal" onclick="return false;">View</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="card-body overflow-auto">
        <div id="risk-files">
            ${bodyHtml}
        </div>
      </div>
    </div>`;
}

function renderRiskComments(comments, title) {
    let bodyHtml = '';
    if (comments && comments.length > 0) {
        bodyHtml += '<ul class="list-unstyled d-flex flex-column gap-4">';
        
        comments.forEach(comment => {
            bodyHtml += `
            <li class="d-flex flex-column gap-3">
             <div class="d-flex gap-2 commentsheight">
              <div class="flex-column comment_image">
               <img alt="User" class="rounded-circle" src="${comment.user.avatar}" width="40">
              </div>
              <div class="flex-column comment_details">
               <ul class="list-unstyled">
                <li><span class="message-data-name"><strong>${comment.user.name}</strong></span></li>
                <li>${comment.text}</li>
                <li>
                 <ul class="list-unstyled d-flex gap-2 mt-2">
                  <li class="reply">Reply</li>
                  <li class="likes">Like</li>
                  <li>${comment.time}, Today</li>
                 </ul>
                </li>
               </ul>
               <ul class="list-unstyled d-flex flex-column gap-3">
                <li>
                 <div class="comment_send" style="display: none">
                  <div class="form-group d-flex flex-row">
                   <div class="form-line">
                    <input class="form-control comment" placeholder="Type a comment..." type="text"/>
                   </div>
                   <div class="send_btn reply-btn">
                    <i class="fas fa-arrow-right"></i>
                   </div>
                  </div>
                 </div>
                </li>
               </ul>
              </div>
              <div class="flex-column">
               <div class="dropdown">
                <a aria-expanded="true" aria-haspopup="true" data-bs-toggle="dropdown" href="#" onclick="return false;" role="button">
                 <img height="16" src="assets/images/icons/menu-dot-vertical-i.svg" width="16"/>
                </a>
                <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                 <li><a class="dropdown-item" data-bs-toggle="modal" href="#comment_edit_popup" onclick="return false;">Edit</a></li>
                 <li><a class="dropdown-item" href="#" onclick="return false;">Delete</a></li>
                </ul>
               </div>
              </div>
             </div>
            </li>`;
        });
        bodyHtml += '</ul>';
    }

    return `
    <div class="card custom-card table-card h-100 table-container">
     <div class="card-header">
      <div class="c-header-left">
       <h5 class="card-title">
        <strong class="editableTxt1" editable="true" onkeypress="return (this.innerText.length <= 25)">
         ${title}
        </strong>
       </h5>
      </div>
      <div class="card-actions">
       <div class="dropdown">
        <button aria-expanded="true" class="btn btn-light p-1" data-bs-toggle="dropdown" type="button">
         <img height="16" src="assets/images/icons/menu-dot-vertical-i.svg" width="16"/>
        </button>
        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
         <li><a class="dropdown-item" data-bs-toggle="modal" href="#" onclick="return false;">View</a></li>
         <li><a class="dropdown-item" href="#" onclick="return false;">Delete</a></li>
        </ul>
       </div>
      </div>
     </div>
     <div class="card-body">
      <div class="chat-widget p-3 slimscroll" id="chat">
        ${bodyHtml}
      </div>
     </div>
     <div class="card-footer comment_send">
      <div class="input-group">
       <input aria-describedby="button-addon2" aria-label="Type a comment..." class="form-control" id="comment" placeholder="Type a comment..." type="text"/>
       <button class="btn btn-outline-dark" id="send-btn" type="button">
        <i class="fas fa-arrow-right"></i>
       </button>
      </div>
     </div>
    </div>`;
}
