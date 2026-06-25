$(document).ready(function() {
    loadRisks();
});

function loadRisks() {
    const container = $('#risk-container');
    
    // Check if container exists
    if (container.length === 0) {
        console.error("Risk container not found!");
        return;
    }

    // Show loading state (optional)
    container.html('<div class="text-center p-5"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>');

    $.getJSON("assets/json/risk.json", function(data) {
        container.empty(); // Clear loading state
        
        if (!data || data.length === 0) {
            container.html('<div class="text-center p-3">No risks found.</div>');
            return;
        }

        const accordionId = "accordionExample";
        let html = `<div class="accordion card-accordion" id="${accordionId}">`;

        data.forEach((item, index) => {
            const collapseId = `collapseRisk${index}`;
            const isExpanded = index === 0 ? "true" : "false"; // First item expanded by default
            const showClass = index === 0 ? "show" : "";
            const collapsedClass = index === 0 ? "" : "collapsed";

            // Generate Impact KPI badges
            const kpiBadges = item.businessImpactKPI.map(kpi => 
                `<span class="badge label-bg-green"># ${kpi}</span>`
            ).join(' ');

            const financialBadges = item.financialImpact.map(impact => 
                `<span class="badge label-bg-indigo">${impact}</span>`
            ).join(' ');

            const informationAssetBadges = item.informationAsset.map(asset => 
                `<span class="badge label-bg-orange">${asset}</span>`
            ).join(' ');

            html += `
            <div class="card custom-card kpi_page_details accordion-item">
              <div class="card-header accordion-header flex-wrap">
                <div class="c-header-left kpi_details-title-box flex-nowrap">
                  <div class="accordion-button ${collapsedClass}" type="button" data-bs-toggle="collapse"
                    data-bs-target="#${collapseId}" aria-expanded="${isExpanded}" aria-controls="${collapseId}">
                  </div>

                  <div class="user-card">
                    <div class="user-image user-image-sm user-active">
                      <img src="${item.owner.image}" alt="${item.owner.name}" width="24" height="24">
                    </div>
                  </div>

                  <h5 class="card-title me-auto">
                    <strong class="editableTxt1">${item.title}</strong>
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
                  

                 <button type="button" class="btn btn-sm btn-icon popoverFilter">
                  <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="View">
                    <i data-lucide="eye" style="width: 14px; height: 14px;"></i>
                  </span>
                    </button>

                  <a href="#" onclick="loadRiskDataAndGeneratePDF()" data-bs-toggle="tooltip" data-bs-placement="bottom"
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
              <div id="${collapseId}" class="accordion-collapse collapse ${showClass}" data-bs-parent="#${accordionId}">
                <div class="accordion-body">
                  <div class="grid gap-2">
                    <div class="g-col-12 g-col-md-4">
                      <div class="table-responsive h-100">
                        <table class="table table-sm table-lefth table-bordered text-center mb-0 align-middle h-100">
                          <tbody>
                            <tr>
                              <th width="40%">Department</th>
                              <td>${item.department}</td>
                          </tr>
                          <tr>
                              <th>Related Parties</th>
                              <td>${item.relatedParties}</td>
                          </tr>
                          <tr>
                              <th>Risk Category</th>
                              <td>${item.riskCategory}</td>
                          </tr>
                            <tr>
                              <th>
                                  <p class="m-0 p-0 i-alert">
                                      <strong>Inherent Risk Score</strong>
                                      <span class="icon popoverInherentRS">
                                        <i data-lucide="badge-info" style="width:12px; height: 12px;"></i>
                                        </span>
                                  </p>
                              </th>
                              <td>${item.inherentRiskScore}</td>
                          </tr>
                          <tr>
                              <th>
                                  <p class="i-alert">
                                      <strong>Residual Risk Score</strong>
                                      <span class="icon popoverResidualRS">
                                        <i data-lucide="badge-info" style="width:12px; height: 12px;"></i>
                                        </span>
                                  </p>
                              </th>
                              <td>${item.residualRiskScore}</td>
                          </tr>
                           <tr>
                              <th>Version</th>
                              <td>${item.version}</td>
                          </tr>
                          <tr>
                              <th>Risk Level</th>
                              <td>${item.riskLevel}</td>
                          </tr>
                          <tr>
                              <th>Risk Code</th>
                              <td>${item.riskCode}</td>
                          </tr>

                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="g-col-12 g-col-md-4">
                      <div class="table-responsive h-100">
                        <table class="table table-sm table-lefth table-bordered text-center mb-0 align-middle h-100">
                          <tbody>

                            <tr>
                              <th>Date Raised</th>
                              <td>${item.dateRaised}</td>
                          </tr>
                          <tr>
                              <th>Business Impact(KPI)</th>
                           
                                <td>
                                  <div class="d-flex justify-content-center gap-1 flex-wrap">
                                    ${kpiBadges}
                                  </div>
                                </td>
                          </tr>
                          <tr>
                              <th>Financial Impact
                              </th>
                              <td>
                                  <div class="d-flex justify-content-center gap-1 flex-wrap">
                                    ${financialBadges}
                                  </div>
                                </td>

                          </tr>
                          <tr>
                              <th>Next Assessment</th>
                              <td>${item.nextAssessment}</td>
                          </tr>
                          <tr>
                              <th>Date Completed</th>
                              <td>${item.dateCompleted}</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="g-col-12 g-col-md-4">
                      <div class="table-responsive h-100">
                        <table class="table table-sm table-lefth table-bordered text-center mb-0 align-middle h-100">
                          <tbody>
                            <tr>
                              <th>POS</th>
                              <td>${item.pos}</td>
                          </tr>
                          <tr>
                              <th>ISO</th>
                              <td>${item.iso}</td>
                          </tr>
                          <tr>
                              <th>Information Asset
                              </th>
                             <td>
                              <div class="d-flex justify-content-center gap-1 flex-wrap">
                                ${informationAssetBadges}
                              </div>
                            </td>

                          </tr>
                          <tr>
                              <th>Others</th>
                              <td>${item.others}</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                   
                  </div>
                </div>

              </div>
            </div>
          </div>
            `;
        });

        html += `</div>`; // Close grid/accordion
        
        container.html(html);

        if (data.length > 0) {
            const firstRisk = data[0];
            
            if (firstRisk.causesAndConsequences && firstRisk.causesAndConsequences.length > 0) {
                 $('#accordionCauseandConsequence').html(renderCauseAndConsequence(firstRisk.causesAndConsequences));
            } else {
                 $('#accordionCauseandConsequence').empty();
            }

            if (firstRisk.controls && firstRisk.controls.length > 0) {
                 $('#accordionReducingImpactPossibility').html(renderControls(firstRisk.controls));
            } else {
                 $('#accordionReducingImpactPossibility').empty();
            }

            if (firstRisk.riskTreatments && firstRisk.riskTreatments.length > 0) {
                 $('.treatment .list-group').html(renderRiskTreatments(firstRisk.riskTreatments));
            } else {
                 $('.treatment .list-group').empty();
            }

            if (firstRisk.reviewMonitoring && firstRisk.reviewMonitoring.length > 0) {
                 $('.monitoring .list-group').html(renderReviewMonitoring(firstRisk.reviewMonitoring));
            } else {
                 $('.monitoring .list-group').empty();
            }

            if (firstRisk.files && firstRisk.files.length > 0) {
                 $('.attachmentsView .list-group').html(renderAttachments(firstRisk.files));
            } else {
                 $('.attachmentsView .list-group').empty();
            }

            if (firstRisk.comments && firstRisk.comments.length > 0) {
                 $('.commentsView .comment-history').html(renderComments(firstRisk.comments));
            } else {
                 $('.commentsView .comment-history').empty();
            }

            // Init pie charts for dynamically rendered content
            if ($.fn.sparkline) {
                $('.chart-pie').each(function() {
                    const value = parseInt($(this).data('percent'), 10) || 0;
                    const remaining = 100 - value;

                    let color = "#1aa243"; // green
                    if (value < 75 && value >= 40) {
                        color = "orange";
                    } else if (value < 40) {
                        color = "red";
                    }

                    const colors = [color, "#ffffff"];
                    $(this).sparkline([value, remaining], {
                        type: 'pie',
                        height: '30px',
                        sliceColors: colors
                    });
                    $(this).find('canvas').css({ 'border': '1px solid #c7c7c7', 'border-radius': '50%' });
                });
            }
        }

        // Re-initialize any plugins
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Initialize Tooltips
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

        initRiskPopovers();

    }).fail(function(jqxhr, textStatus, error) {
        console.error("Error loading risks JSON: ", textStatus, error);
        container.html('<div class="text-danger text-center p-3">Failed to load risks data.</div>');
    });
}

function renderOwners(owners, remaining) {
    if (!owners) return '';
    let html = '<ul class="list-unstyled d-flex align-items-center avatar-group mb-0">';
    owners.forEach(owner => {
        html += `<li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip" data-bs-placement="top" title="${owner.name}"><img src="${owner.image}" class="rounded-circle" alt="${owner.name}" width="24" height="24"></li>`;
    });
    if (remaining > 0) {
        html += `<li class="avatar avatar-xs pull-up" data-bs-toggle="modal" data-bs-target="#user_edit_popup"><span class="avatar-initial rounded-circle" data-bs-toggle="tooltip" data-bs-placement="top" title="${remaining} more">+${remaining}</span></li>`;
    }
    html += '</ul>'; return html;
}

function renderCauseAndConsequence(data) {
    if (!data || data.length === 0) return '';
    let html = '';
    data.forEach((cc, index) => {
        const collapseId = `causeandConsequence-collapse-0${index + 1}`;
        const isExpanded = index === 0 ? 'true' : 'false';
        const showClass = index === 0 ? 'show' : '';
        const btnClass = index === 0 ? '' : 'collapsed';

        html += `
        <div class="accordion-item">
            <div class="accordion-header bg-primary" style="--stratroom-bg-opacity:0.04">
            <div class="d-flex justify-content-between p-2 gap-1">
                <button class="btn p-0 btn-title justify-content-start ${btnClass}" data-bs-toggle="collapse"
                data-bs-target="#${collapseId}" aria-expanded="${isExpanded}" aria-controls="${collapseId}">
                <div class="row row-cols-1 g-2"><span class="col mb-0">${cc.title}</span></div>
                </button>
                <div class="list-actions">
                <div class="d-flex align-items-start">
                    <span class="badge ${cc.badgeClass} rounded-pill ms-auto" style="--stratroom-bg-opacity:1">${cc.badge}</span>
                </div>
                <div class="dropdown">
                    <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                    <i data-lucide="more-vertical" style="width: 14px; height: 14px;"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                    <li><a class="dropdown-item" href="#consequence-add-modal" data-bs-toggle="modal">Add</a></li>
                    <li><a class="dropdown-item" href="#cause-edit-modal" data-bs-toggle="modal">Edit</a></li>
                    <li><a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal">Delete</a></li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
            <div id="${collapseId}" class="accordion-collapse collapse ${showClass}" data-bs-parent="#accordionCauseandConsequence">
            <div class="accordion-body gap-0 p-0">
        `;

        cc.consequences.forEach(con => {
            html += `
            <div class="list-group-item border-bottom">
                <div class="d-flex justify-content-between p-2 gap-1">
                <div class="btn-title justify-content-start">
                    <div class="row row-cols-1 g-2"><span class="col mb-0">${con.title}</span></div>
                </div>
                <div class="list-actions">
                    <div class="d-flex align-items-start">
                    <span class="badge ${con.badgeClass} rounded-pill ms-auto">${con.badge}</span>
                    </div>
                    <div class="dropdown">
                    <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                        <i data-lucide="more-vertical" style="width: 14px; height: 14px;"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                        <li><a class="dropdown-item" href="#consequence-edit-modal" data-bs-toggle="modal">Edit</a></li>
                        <li><a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal">Delete</a></li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            `;
        });

        html += `</div></div></div>`;
    });
    return html;
}

function renderControls(data) {
    if (!data || data.length === 0) return '';
    let html = '';
    data.forEach((ctrl, index) => {
        const collapseId = `reducingImpactPossibility-collapse-0${index + 1}`;
        const isExpanded = index === 0 ? 'true' : 'false';
        const showClass = index === 0 ? 'show' : '';
        const btnClass = index === 0 ? '' : 'collapsed';
        const ownersHtml = renderOwners(ctrl.owners, ctrl.remainingOwners);

        html += `
        <div class="accordion-item">
            <div class="accordion-header bg-primary" style="--stratroom-bg-opacity:0.02">
            <div class="d-flex justify-content-between p-2 gap-1">
                <div class="btn p-0 btn-title justify-content-start ${btnClass}" data-bs-toggle="collapse"
                data-bs-target="#${collapseId}" aria-expanded="${isExpanded}" aria-controls="${collapseId}">
                <div class="row row-cols-1 g-2"><p class="col mb-0">${ctrl.title}</p></div>
                </div>
                <div class="list-actions">
                <div class="d-flex align-items-start">${ownersHtml}</div>
                <div class="dropdown">
                    <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                    <i data-lucide="more-vertical" style="width: 14px; height: 14px;"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                    <li><a class="dropdown-item" href="#reducingPossibility-add-modal" data-bs-toggle="modal">Add</a></li>
                    <li><a class="dropdown-item" href="#reducingImpact-edit-modal" data-bs-toggle="modal">Edit</a></li>
                    <li><a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal">Delete</a></li>
                    </ul>
                </div>
                </div>
            </div>
            <div class="p-2 d-flex flex-row gap-1 w-100">
                <div class="d-flex flex-column flex-fill">
                <div class="d-flex flex-row align-items-center gap-2">
                    <div class="chart-pie" data-percent="${ctrl.progress}"></div><span class="pie-progress"></span>
                </div>
                </div>
                <div class="d-flex flex-column justify-content-center text-center flex-fill">
                <span class="text-muted">${ctrl.strategy}</span>
                </div>
                <div class="d-flex flex-column justify-content-end text-end flex-fill">
                <span class="text-muted">${ctrl.date}</span>
                </div>
            </div>
            </div>
            <div id="${collapseId}" class="accordion-collapse collapse ${showClass}" data-bs-parent="#accordionReducingImpactPossibility">
        `;

        if (ctrl.items && ctrl.items.length > 0) {
            ctrl.items.forEach(item => {
                html += `
                <div class="list-group-item border-bottom">
                <div class="d-flex justify-content-between p-2 gap-1">
                    <div class="btn-title justify-content-start">
                    <div class="row row-cols-1 g-2"><p class="col mb-0">${item.title}</p></div>
                    </div>
                    <div class="list-actions">
                    <div class="d-flex align-items-start">
                        <span class="badge ${item.statusClass} rounded-pill ms-auto" style="--stratroom-bg-opacity:1">${item.status}</span>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                        <i data-lucide="more-vertical" style="width: 14px; height: 14px;"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                        <li><a class="dropdown-item" href="#reducingPossibility-edit-modal" data-bs-toggle="modal">Edit</a></li>
                        <li><a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal">Delete</a></li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div class="p-2 d-flex flex-row gap-1 w-100">
                    <div class="d-flex flex-column flex-fill">
                    <div class="d-flex flex-row align-items-center gap-2">
                        <div class="chart-pie" data-percent="${item.progress}"></div><span class="pie-progress"></span>
                    </div>
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                    <span class="text-muted">${item.date}</span>
                    </div>
                </div>
                </div>
                `;
            });
        }
        html += `</div></div>`;
    });
    return html;
}

function renderRiskTreatments(data) {
    if (!data || data.length === 0) return '';
    let html = '';
    data.forEach(rt => {
        const ownersHtml = renderOwners(rt.owners, rt.remainingOwners);
        html += `
        <div class="list-group-item flex-column p-0">
            <div class="d-flex justify-content-between p-2 gap-1">
            <div class="btn-title text-start justify-content-start" data-bs-toggle="collapse">
                <div class="row row-cols-1 g-2">
                <p class="col mb-0"><strong>Reducing Impact:</strong> '${rt.reducingImpact}'</p>
                <p class="col mb-0"><strong>Reducing Possibility:</strong> '${rt.reducingPossibility}'</p>
                </div>
            </div>
            <div class="list-actions">
                <div class="d-flex align-items-start">${ownersHtml}</div>
                <div class="dropdown">
                <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                    <i data-lucide="more-vertical" style="width: 14px; height: 14px;"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                    <li><a class="dropdown-item" href="#risktreatement-edit-modal" data-bs-toggle="modal">Edit</a></li>
                    <li><a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal">Delete</a></li>
                </ul>
                </div>
            </div>
            </div>
            <div class="p-2 d-flex flex-row gap-1 w-100">
            <div class="d-flex flex-column flex-fill">
                <div class="d-flex flex-row align-items-center gap-2">
                <div class="chart-pie" data-percent="${rt.progress}"></div><span class="pie-progress"></span>
                </div>
            </div>
            <div class="d-flex flex-column justify-content-center text-center flex-fill">
                <span class="text-muted">${rt.strategy}</span>
            </div>
            <div class="d-flex flex-column justify-content-end text-end flex-fill">
                <span class="text-muted">${rt.date}</span>
            </div>
            </div>
        </div>
        `;
    });
    return html;
}

function renderReviewMonitoring(data) {
    if (!data || data.length === 0) return '';
    let html = '';
    data.forEach(rm => {
        const ownersHtml = renderOwners(rm.owners, rm.remainingOwners);
        html += `
        <div class="list-group-item flex-column p-0">
            <div class="d-flex justify-content-between p-2 gap-1">
            <div class="btn-title text-start justify-content-start" data-bs-toggle="collapse">
                <div class="row row-cols-1 g-2"><p class="col mb-0">${rm.title}</p></div>
            </div>
            <div class="list-actions">
                <div class="d-flex align-items-start">${ownersHtml}</div>
                <div class="dropdown">
                <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                    <i data-lucide="more-vertical" style="width: 14px; height: 14px;"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                    <li><a class="dropdown-item" href="#reviewMonitoring-edit-modal" data-bs-toggle="modal">Edit</a></li>
                    <li><a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal">Delete</a></li>
                </ul>
                </div>
            </div>
            </div>
            <div class="p-2 d-flex flex-row gap-1 w-100">
            <div class="d-flex flex-column flex-fill">
                <div class="d-flex flex-row align-items-center gap-2">
                <div class="chart-pie" data-percent="${rm.progress}"></div><span class="pie-progress"></span>
                </div>
            </div>
            <div class="d-flex flex-column justify-content-center text-center flex-fill">
                <span class="text-muted">${rm.status}</span>
            </div>
            <div class="d-flex flex-column justify-content-end text-end flex-fill">
                <span class="text-muted">${rm.date}</span>
            </div>
            </div>
        </div>
        `;
    });
    return html;
}

function renderAttachments(data) {
    if (!data || data.length === 0) return '';
    let html = '';
    data.forEach(file => {
        html += `
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
        </div>
        `;
    });
    return html;
}

function renderComments(comments) {
    if (!comments || comments.length === 0) {
        return '<div class="text-center text-muted p-3">No comments yet</div>';
    }
    
    const renderSingleComment = (comment, isReply = false) => {
        let repliesHtml = '';
        if (comment.replies && comment.replies.length > 0) {
            repliesHtml = '<div class="replies">';
            comment.replies.forEach(reply => {
                repliesHtml += `<div class="reply">${renderSingleComment(reply, true)}</div>`;
            });
            repliesHtml += '</div>';
        }

        return `
        <div class="${isReply ? 'reply-content' : 'comment-content'}">
            <div class="${isReply ? 'reply-card' : 'comment-card'}">
                <img src="${comment.user.avatar}" class="user-img" width="28" height="28" alt="User">
                <div class="comment-cr">
                    <div class="comment-highlight">
                        <div class="comment-head">
                            <h6 class="user-name">${comment.user.name}</h6> <span class="comment-time">${comment.time}</span>
                        </div>
                        <div class="comment-text">${comment.text}</div>
                    </div>
                    <div class="comment-actions">
                        <span class="like-btn">Like</span> · <span class="like-count">0</span> · <span class="reply-btn">Reply</span> · <span class="edit-btn">Edit</span> · <span class="delete-btn">Delete</span>
                    </div>
                </div>
            </div>
            <div class="reply-section" style="display: none;">
                <input type="text" class="form-control reply-input" placeholder="Write a reply...">
                <button class="btn btn-sm label-bg-primary reply-post"><i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i></button>
            </div>
        </div>
        ${repliesHtml}
        `;
    };

    let commentsHtml = '';
    comments.forEach(comment => {
        commentsHtml += `<div class="comment">${renderSingleComment(comment)}</div>`;
    });
    return commentsHtml;
}

function initRiskPopovers() {
    const popoverFilterContent = `<div>
   <div class="d-flex justify-content-between gap-3 mb-3 align-items-center">
     <h5 class="h6 mb-0">View</h5>
     <button type="button" class="btn-close" aria-label="Close"></button>
   </div>
   <div class="d-flex flex-column gap-2 pageViewOption">
     <div class="form-check form-check-inline">
       <input class="form-check-input" type="checkbox" checked id="causenconsequenceView" name="causenconsequence" value="causenconsequence">
       <label class="form-check-label" for="causenconsequenceView">Cause And Consequence</label>
     </div>
     <div class="form-check form-check-inline">
       <input class="form-check-input" type="checkbox" checked id="chartView" name="chart" value="chart">
       <label class="form-check-label" for="chartView">Heat Map</label>
     </div>
      <div class="form-check form-check-inline">
       <input class="form-check-input" type="checkbox" checked id="controlsView" name="controls" value="controls">
       <label class="form-check-label" for="controlsView">Controls</label>
     </div>
     <div class="form-check form-check-inline">
       <input class="form-check-input" type="checkbox" checked id="riskTreatmentView" name="treatment" value="treatment">
       <label class="form-check-label" for="riskTreatmentView">Risk Treatment</label>
     </div>
     <div class="form-check form-check-inline">
       <input class="form-check-input" type="checkbox" checked id="monitoringView" name="monitoring" value="monitoring">
       <label class="form-check-label" for="monitoringView">Review & Monitoring</label>
     </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" checked id="attachmentsView" name="tables" value="attachmentsView">
      <label class="form-check-label" for="attachmentsView">Attachments</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" checked id="commentsView" name="comments" value="commentsView">
      <label class="form-check-label" for="commentsView">Comments</label>
    </div>
   </div>
 </div>`;

    document.querySelectorAll('.popoverFilter').forEach(el => {
        new bootstrap.Popover(el, {
            html: true,
            content: popoverFilterContent,
            sanitize: false
        });
    });

    const riskScoreContent = `
        <div>
          <div class="d-flex justify-content-between gap-3 mb-3 align-items-center">
     <h5 class="h6 mb-0">Risk Score Key</h5>
     <button type="button" class="btn-close" aria-label="Close"></button>
   </div>
        <table class="table table-sm border mb-0 w-100">
  <tbody>
    <tr>
      <th>Tidak Signifikan</th>
      <td width="30">1</td>
      <th>Hampir Pernah Terjadi</th>
      <td width="30">A</td>
    </tr>
    <tr>
      <th>Ringan</th>
      <td width="30">2</td>
      <th>Sangat Jarang</th>
      <td width="30">B</td>
    </tr>
    <tr>
      <th>Moderat</th>
      <td width="30">3</td>
      <th>Jarang</th>
      <td width="30">C</td>
    </tr>
    <tr>
      <th>Berat</th>
      <td width="30">4</td>
      <th>Sering</th>
      <td width="30">D</td>
    </tr>
    <tr>
      <th>Fatal</th>
      <td width="30">5</td>
      <th>Sangat Sering</th>
      <td width="30">E</td>
    </tr>
  </tbody>
</table></div>`;

    document.querySelectorAll('.popoverInherentRS, .popoverResidualRS').forEach(el => {
        new bootstrap.Popover(el, {
            html: true,
            content: riskScoreContent,
            sanitize: false
        });
    });

    if (!window.riskPopoversInitialized) {
        document.addEventListener('click', function (event) {
            if (event.target.classList.contains('btn-close')) {
                document.querySelectorAll('.popoverFilter, .popoverInherentRS, .popoverResidualRS').forEach(el => {
                    const popover = bootstrap.Popover.getInstance(el);
                    if (popover) popover.hide();
                });
            }
        });
        window.riskPopoversInitialized = true;
    }
}

