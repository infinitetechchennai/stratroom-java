
$(document).ready(function() {
    loadInitiatives();
});

function loadInitiatives() {
    const container = $('#initiatives-container');
    
    // Check if container exists
    if (container.length === 0) {
        console.error("Initiatives container not found!");
        return;
    }

    // Show loading state (optional)
    container.html('<div class="text-center p-5"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>');

    $.getJSON("assets/json/initiatives.json", function(data) {
        container.empty(); // Clear loading state
        
        if (!data || data.length === 0) {
            container.html('<div class="text-center p-3">No initiatives found.</div>');
            return;
        }

        const accordionId = "accordionInitiatives";
        let html = `<div class="accordion card-accordion" id="${accordionId}">`;

        data.forEach((item, index) => {
            const collapseId = `collapseInit${index}`;
            const isExpanded = index === 0 ? "true" : "false"; // First item expanded by default
            const showClass = index === 0 ? "show" : "";
            const collapsedClass = index === 0 ? "" : "collapsed";

            // Status Image URL mapping (assuming same logic as generatepdf.js or simple mapping)
            // Using a simple mapping based on the 'status' field (green, yellow, red)
            const statusImg = `assets/images/icons/buzzer-${item.status}-i.svg`;
            
            // Generate Impact KPI badges
            const kpiBadges = item.impactKPIs.map(kpi => 
                `<span class="badge label-bg-dark"># ${kpi}</span>`
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
                    <strong editable="true" contenteditable="true"
                    onkeypress="return (this.innerText.length <= 36)">${item.title}</strong>
                  </h5>

                </div>
                <div class="card-actions justify-content-end">
                    <a href="#initatives-add-modal" data-bs-toggle="modal" class="btn btn-sm btn-icon">
                        <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Edit">
                        <i data-lucide="pencil" style="width: 14px; height: 14px;"></i>
                        </span>
                    </a>

                   <a href="#attachments-modal" data-bs-toggle="modal" class="btn btn-sm btn-icon">
                        <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="File Upload">
                        <i data-lucide="paperclip" style="width: 14px; height: 14px;"></i>
                        </span>
                    </a>

                  <button type="button" class="btn btn-sm btn-icon popover-filter-btn" data-target-id="${collapseId}">
                          <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="View">
                            <i data-lucide="eye" style="width: 14px; height: 14px;"></i>
                          </span>
                    </button>

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
                              <th>Initiative ID</th>
                              <td>${item.id}</td>
                            </tr>

                            <tr>
                              <th>Progress</th>
                              <td>
                                <div class="pt-1 bar-chart">
                                  <div class="progress-wrap ${item.progress.wrapClass}">
                                    <div class="progress flex-grow-1">
                                      <div class="progress-bar ${item.progress.colorClass} progress-bar-striped rounded-pill"
                                        role="progressbar" style="width: ${item.progress.value}%;" aria-valuenow="${item.progress.value}" aria-valuemin="0"
                                        aria-valuemax="100"></div>
                                    </div>
                                    <span class="badge">${item.progress.value}%</span>
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <th>Start Date</th>
                              <td>${item.startDate}</td>
                            </tr>
                            <tr>
                              <th>End by</th>
                              <td>${item.endDate}</td>
                            </tr>
                            <tr>
                              <th>Remaining</th>
                              <td>${item.remainingDays} days</td>
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
                              <th>Status</th>
                              <td>
                                <span class="icon"><img src="${statusImg}" width="16" height="16" /></span>
                              </td>
                            </tr>
                            <tr>
                              <th>Reaction</th>
                              <td>
                                <p class="mb-0">
                                  <i data-lucide="thumbs-down" class="text-danger" style="width: 14px; height: 14px;"></i>
                                  <i data-lucide="thumbs-up" class="text-body-tertiary" style="width: 14px; height: 14px;"></i>
                                </p>
                              </td>
                            </tr>

                            <tr>
                              <th width="40%">Perspective</th>
                              <td>${item.perspective}</td>
                            </tr>
                            <tr>
                              <th width="40%">Objective</th>
                              <td>${item.objective}</td>
                            </tr>
                            
                            <tr>
                              <th width="40%">Impact-KPI</th>
                              <td>${kpiBadges}</td>
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
                              <th width="40%">Total Asset Budget</th>
                              <td>${item.financials.assetBudget}</td>
                            </tr>
                            <tr>
                              <th>Total Asset Realization</th>
                              <td>${item.financials.assetRealization}</td>
                            </tr>
                            <tr>
                              <th>Total Liabilities Budget</th>
                              <td>${item.financials.liabilitiesBudget}</td>
                            </tr>
                            <tr>
                              <th>Total Liabilities Realization</th>
                              <td>${item.financials.liabilitiesRealization}</td>
                            </tr>
                            <tr>
                              <th>Total Budget</th>
                              <td>${item.financials.totalBudget}</td>
                            </tr>
                            <tr>
                              <th>Total Budget Realization</th>
                              <td>${item.financials.totalBudgetRealization}</td>
                            </tr>
                            <tr>
                              <th>Total Asset Realization %</th>
                              <td>${item.financials.assetRealizationPercent} %</td>
                            </tr>
                            <tr>
                              <th>Total Liabilities Realization %</th>
                              <td>${item.financials.liabilitiesRealizationPercent} %</td>
                            </tr>
                            <tr>
                              <th>Total Budget Realization % </th>
                              <td>${item.financials.totalBudgetRealizationPercent} %</td>
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
            </div>
            
            <!-- Sub-initiative rendering removed from loop to avoid duplicates inside the grid -->
            <!-- Placeholder for other initiatives if they have sub-initiatives, 
                 currently only the first one is mocked in JSON with sub-data 
                 and the HTML structure suggests a side-by-side layout for open items. 
                 Adjust logic here if every card needs this column. 
            -->
            
            </div>`;
        });

// ... (existing code) ...

        html += `</div>`; // Close grid/accordion
        
        container.html(html);
        
        if (data.length > 0) {
            const firstInitiative = data[0];
            const subInitiativesHtml = renderSubInitiatives(firstInitiative);
            
            if (subInitiativesHtml) {
                 // Adjust layout: shrink main container
                 $('#initiatives-container').parent().removeClass('col-12').addClass('col-md-8');
                 
                 // Replace static placeholder with dynamic content
                 const placeholder = $('.subInitiativeActivities');
                 if(placeholder.length > 0) {
                    $('.subInitiativeActivities').replaceWith(subInitiativesHtml);
                 } else {
                     // If no placeholder, append to the row
                     $('#initiatives-container').parent().after(subInitiativesHtml);
                 }

                // Initialize sparklines
                initSparklines();
            }
        }
        // Re-initialize any plugins
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Initialize Popovers
        initPopoverFilters();
        
        // Initialize Tooltips
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    }).fail(function(jqxhr, textStatus, error) {
        console.error("Error loading initiatives JSON: ", textStatus, error);
        container.html('<div class="text-danger text-center p-3">Failed to load initiatives data.</div>');
    });
}

function renderSubInitiatives(parentInitiative) {
    if(!parentInitiative || !parentInitiative.subInitiatives || parentInitiative.subInitiatives.length === 0) return '';
    
    const subInitiatives = parentInitiative.subInitiatives;
    const parentCollapseId = `parent-initiative-collapse-${parentInitiative.id}`;
    const parentOwnersHtml = renderOwners(parentInitiative.owners, parentInitiative.remainingOwners);

    let html = `
        <div class="col-md-4 subInitiativeActivities">
          <div class="card custom-card table-card h-100">
            <div class="card-header">
              <div class="c-header-left">
                <h5 class="card-title">
                  <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">Sub
                    Initiative & Activities</strong>
                </h5>
              </div>
              <div class="card-actions">
                <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#subinitative-add-modal">
                  <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                    <i data-lucide="plus" style="width: 14px; height: 14px;"></i>
                  </span>
                </button>
                <div class="dropdown">
                  <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                    <i data-lucide="ellipsis-vertical" style="width: 14px; height: 14px;"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                    <li><a class="dropdown-item" href="#sub_initative_view_popup" data-bs-toggle="modal">View</a></li>
                    <li><a class="dropdown-item" href="#" onclick="return false;">Delete</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card-body overflow-auto" style="height: 340px;">
              <div id="accordionSubInitiative" class="accordion accordion-flush-initiative accordion-custom accordion-collopse-content">
    `;

    subInitiatives.forEach((sub, index) => {
        const collapseId = `initiative-collapse-${parentInitiative.id}-${index}`;
        const ownersHtml = renderOwners(sub.owners, sub.remainingOwners);
        
        html += `
             <div class="accordion-item test">
                  <div class="accordion-header bg-primary" style="--stratroom-bg-opacity:0.04">
                    <div class="d-flex justify-content-between p-2 gap-1">
                      <button class="btn p-0 btn-title justify-content-start" data-bs-toggle="collapse"
                        data-bs-target="#${collapseId}" aria-expanded="true"
                        aria-controls="${collapseId}">
                        <div class="row row-cols-1 g-2">
                          <span class="col mb-0">${sub.title}</span>
                        </div>
                      </button>
                      <div class="list-actions">
                        <div class="d-flex align-items-start">
                          ${ownersHtml}
                        </div>

                        <div class="dropdown">
                          <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown"
                            aria-expanded="true">
                            <i data-lucide="more-vertical" style="width: 14px; height: 14px;"></i>
                          </button>
                          <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                            <li><a class="dropdown-item" href="#activities-add-modal" data-bs-toggle="modal">Add</a></li>
                            <li><a class="dropdown-item" href="#subinitative-edit-modal" data-bs-toggle="modal">Edit</a></li>
                            <li><a class="dropdown-item">Delete</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="p-2 d-flex flex-column gap-1 w-100">

                      <div class="progress-wrap ${sub.progress.colorClass}">
                        <div class="progress flex-grow-1" style="--stratroom-bg-opacity:1">
                          <div class="progress-bar progress-bar-striped rounded-pill status-${sub.progress.colorClass}" role="progressbar" style="width: ${sub.progress.value}%" data-percent="${sub.progress.value}" aria-valuenow="${sub.progress.value}"></div>
                        </div>
                        <span class="badge">${sub.progress.value}%</span>
                      </div>
                      <div class="text-muted">${sub.startDate} - ${sub.endDate}</div>
                    </div>
                  </div>

                  <div id="${collapseId}" class="accordion-collapse collapse show" data-bs-parent="#accordionSubInitiative">
                    <div id="accordionSubInitiative-${parentInitiative.id}-${index}" class="accordion-body gap-0 p-0">
                      ${renderActivities(sub.activities, parentInitiative.id, index)}
                    </div>
                  </div>
                </div>
        `;
    });

    html += `
                      </div>
            </div>
          </div>
        </div>
    `;
    return html;
}

function renderActivities(activities, parentId, subIndex) {
    if(!activities || activities.length === 0) return '';
    
    let html = '';
    activities.forEach((act, actIndex) => {
        const collapseId = `subinitiative-collapse-${parentId}-${subIndex}-${actIndex}`;
        const ownersHtml = renderOwners(act.owners, act.remainingOwners);

        html += `
            <div class="list-group-item border-0">
                <div class="d-flex justify-content-between p-2 gap-1">
                    <div class="btn p-0 btn-title" data-bs-toggle="collapse"
                        data-bs-target="#${collapseId}" aria-expanded="true"
                        aria-controls="${collapseId}">
                        <div class="row row-cols-1 g-2">
                        <span class="col mb-0">${act.title}</span>
                        </div>
                    </div>

                    <div class="list-actions">
                        <div class="d-flex align-items-start">
                           ${ownersHtml}
                        </div>

                        <div class="dropdown">
                        <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                            <i data-lucide="more-vertical" style="width: 14px; height: 14px;"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                            <li><a class="dropdown-item" href="#sub-activities-add-modal" data-bs-toggle="modal">Add</a></li>
                            <li><a class="dropdown-item" href="#activities-edit-modal" data-bs-toggle="modal">Edit</a></li>
                            <li><a class="dropdown-item">Delete</a></li>
                        </ul>
                        </div>
                    </div>
                    </div>

                    <div class="p-2 d-flex flex-row gap-1 w-100">
                       <div class="d-flex flex-column flex-fill">
                            <div class="d-flex flex-row align-items-center gap-2">
                                <div class="chart-pie" data-value="${act.progress.value}"></div>
                                <span class="pie-progress" style="font-size:10px;">${act.progress.value}%</span>
                            </div>
                        </div>

                    <div class="d-flex flex-column justify-content-center">
                        <span class="text-muted">${act.startDate}- ${act.endDate}</span>
                    </div>
                    </div>
                </div>

                <div id="${collapseId}" class="accordion-collapse collapse show" data-bs-parent="#accordionSubInitiative-${parentId}-${subIndex}">
                    ${renderTasks(act.tasks)}
                </div>
            </div>
        `;
    });
    return html;
}

function renderTasks(tasks) {
     if(!tasks || tasks.length === 0) return '';
     
     let html = '';
     tasks.forEach(task => {
         const ownersHtml = renderOwners(task.owners, task.remainingOwners);
         html += `
            <div class="list-group-item border-bottom">
                <div class="d-flex justify-content-between p-2 gap-1">
                    <div class="p-0 btn-title">
                    <div class="row row-cols-1 g-2">
                        <span class="col mb-0">${task.title}</span>
                    </div>
                    </div>

                    <div class="list-actions">
                    <div class="d-flex align-items-start">
                        ${ownersHtml}
                    </div>

                    <div class="dropdown">
                        <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                        <i data-lucide="more-vertical" style="width: 14px; height: 14px;"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                        <li><a class="dropdown-item" href="#sub-activities-edit-modal" data-bs-toggle="modal">Edit</a></li>
                        <li><a class="dropdown-item">Delete</a></li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div class="p-2 d-flex flex-row gap-1 w-100">
                       <div class="d-flex flex-column flex-fill">
                            <div class="d-flex flex-row align-items-center gap-2">
                                <div class="chart-pie" data-value="${task.progress.value}"></div>
                                <span class="pie-progress" style="font-size:10px;">${task.progress.value}%</span>
                            </div>
                        </div>

                    <div class="d-flex flex-column justify-content-center">
                        <span class="text-muted">${task.startDate}- ${task.endDate}</span>
                    </div>
                    </div>
            </div>
         `;
     });
     return html;
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

function initSparklines() {
    // Target elements with class 'chart-pie'
    // Target elements with class 'chart-pie'
    $('.chart-pie').each(function() {
         const value = parseInt($(this).data('value'), 10) || 0;
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
        
        // Add border style similar to risk.js
        $(this).find('canvas').css({
             'border': '1px solid #c7c7c7',
             'border-radius': '50%'
        });
    });
}

function initPopoverFilters() {
    // Collect all possible row headers from the first card to build the filter list
    const firstCard = $('.kpi_page_details').first();
    const headers = [];
    firstCard.find('th').each(function() {
        headers.push($(this).text().trim());
    });

    // Remove duplicates if any
    const uniqueHeaders = [...new Set(headers)];
    
    // Build Popover Content
    let popoverContent = `
        <div>
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="mb-0">Filter Details</h6>
                <button type="button" class="btn-close" aria-label="Close"></button>
            </div>
             <div class="d-flex justify-content-between mb-2">
                <button class="btn btn-sm btn-light select-all-rows">Select All</button>
                <button class="btn btn-sm btn-light deselect-all-rows">Deselect All</button>
            </div>
            <div class="d-flex flex-column gap-2" style="max-height: 200px; overflow-y: auto;">
    `;
    
    uniqueHeaders.forEach((header, index) => {
        const safeId = `filter-row-${index}`;
        popoverContent += `
            <div class="form-check">
                <input class="form-check-input filter-row-checkbox" type="checkbox" value="${header}" id="${safeId}" checked>
                <label class="form-check-label" for="${safeId}">
                    ${header}
                </label>
            </div>
        `;
    });
    
    popoverContent += `</div></div>`;

    // Initialize Popover on all buttons
    $('.popover-filter-btn').each(function() {
        const btn = $(this);
        const collapseId = btn.data('target-id');
        
        // Dispose existing if any
        const existing = bootstrap.Popover.getInstance(this);
        if(existing) existing.dispose();

        new bootstrap.Popover(this, {
            html: true,
            placement: 'bottom',
            content: popoverContent,
            sanitize: false,
            container: 'body',
            trigger: 'click' 
        });

        // When popover shows, sync checkbox state with actual visibility in THIS card
        btn[0].addEventListener('shown.bs.popover', function () {
            const popoverBody = $('.popover-body'); // The currently open popover body
            const cardContext = $(`#${collapseId}`);
            
            popoverBody.find('.filter-row-checkbox').each(function() {
                const headerText = $(this).val();
                // Find the row in this specific card
                const isVisible = cardContext.find('th').filter(function() {
                    return $(this).text().trim() === headerText;
                }).closest('tr').is(':visible');
                
                $(this).prop('checked', isVisible);
                
                // Attach data-card-target to checkbox for the change handler
                $(this).attr('data-card-target', collapseId);
            });

             // Bind close button
            popoverBody.find('.btn-close').on('click', function() {
                 bootstrap.Popover.getInstance(btn[0]).hide();
            });
            
             // Bind Select/Deselect All inside this specific popover instance
            popoverBody.find('.select-all-rows').on('click', function() {
                popoverBody.find('.filter-row-checkbox').prop('checked', true).trigger('change');
            });
            popoverBody.find('.deselect-all-rows').on('click', function() {
                popoverBody.find('.filter-row-checkbox').prop('checked', false).trigger('change');
            });
        });
    });
    
    // ... inside initPopoverFilters ...
}

// Global event listener for checkbox changes (delegated)
$(document).on('change', '.filter-row-checkbox', function() {
    const headerText = $(this).val();
    const isChecked = $(this).is(':checked');
    const targetCardId = $(this).attr('data-card-target');
    
    if(targetCardId) {
            const cardContext = $(`#${targetCardId}`);
            cardContext.find('th').filter(function() {
            return $(this).text().trim() === headerText;
        }).closest('tr').toggle(isChecked);
    }
});
