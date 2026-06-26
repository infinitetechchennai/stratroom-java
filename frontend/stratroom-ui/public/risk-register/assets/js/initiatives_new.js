function getDynamicColor(text) {
    if (!text) return 'status-bg-gray';
    const colors = ['status-bg-blue', 'status-bg-indigo', 'status-bg-purple', 'status-bg-pink', 'status-bg-red', 'status-bg-orange', 'status-bg-yellow', 'status-bg-green', 'status-bg-teal', 'status-bg-cyan', 'status-bg-sky-blue', 'status-bg-lime-green'];
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
}

// --- Helper Functions for Table Toggle Panels ---
function renderSubInitiativesTable(subs) {
  if (!subs || !subs.length) return '<div class="empty">No sub-initiatives yet</div>';
  const rows = subs.map(sub => `
    <tr>
      <td><span class="type-badge">Sub-Init</span></td>
      <td><div class="sub-name"><span class="sub-name-text">${sub.title || sub.name || ''}</span></div></td>
      <td><span class="badge label-bg-primary">${sub.status || 'In Progress'}</span></td>
      <td style="min-width:110px">
        <div class="progress-wrap"><div class="progress flex-grow-1"><div class="progress-bar bg-info progress-bar-striped rounded-pill" style="width:${sub.progress?.value || 0}%"></div></div><span class="badge text-dark">${sub.progress?.value || 0}%</span></div>
      </td>
      <td style="color:#64748b;white-space:nowrap">${sub.startDate || ''}</td>
      <td style="color:#64748b;white-space:nowrap">${sub.endDate || ''}</td>
      <td>
        <div class="avatars">
           ${(sub.owners || []).map(o => `<div class="avatar-small"><img src="${o.image}"></div>`).join('')}
        </div>
      </td>
      <td>
        <div class="action-btns">
          <button class="action-btn edit"><i data-lucide="edit" style="width:14px;height:14px;"></i></button>
          <button class="action-btn del"><i data-lucide="trash" style="width:14px;height:14px;"></i></button>
        </div>
      </td>
    </tr>`).join('');
  return `<div class="sub-table-wrap"><table class="sub-table">
    <thead><tr>
      <th>Type</th><th>Name</th><th>Status</th><th>Progress</th>
      <th>Start</th><th>End</th><th>Assignees</th><th>Actions</th>
    </tr></thead>
    <tbody>${rows}</tbody>
  </table></div>`;
}

function renderTasksTable(tasks) {
  if (!tasks || !tasks.length) return '<div class="empty">No tasks available</div>';
  const rows = tasks.map(t => `
    <tr>
      <td><span class="sub-name-text">${t.title || t.name || ''}</span></td>
      <td><span class="badge label-bg-primary">${t.status || ''}</span></td>
      <td>
         <div class="avatars">
           ${(t.owners || []).map(o => `<div class="avatar-small"><img src="${o.image}"></div>`).join('')}
         </div>
      </td>
      <td style="color:#64748b">${t.endDate || t.due || ''}</td>
    </tr>`).join('');
  return `<div class="sub-table-wrap"><table class="sub-table">
    <thead><tr><th>Task Name</th><th>Status</th><th>Assignee</th><th>Due Date</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>`;
}

function renderMilestonesTable(milestones) {
  if (!milestones || !milestones.length) return '<div class="empty">No milestones available</div>';
  const rows = milestones.map(m => `
    <tr>
      <td><span class="sub-name-text">${m.title || m.name || ''}</span></td>
      <td style="color:#64748b">${m.date || m.endDate || ''}</td>
      <td><span class="badge label-bg-primary">${m.status || ''}</span></td>
    </tr>`).join('');
  return `<div class="sub-table-wrap"><table class="sub-table">
    <thead><tr><th>Milestone</th><th>Date</th><th>Status</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>`;
}

function renderFilesTable(files) {
  if (!files || !files.length) return '<div class="empty">No attachments available</div>';
  const rows = files.map(a => `
    <tr>
      <td><span class="sub-name-text" style="color:#06b6d4;cursor:pointer;text-decoration:underline">${a.title || a.name || ''}</span></td>
      <td style="color:#64748b">${a.fileName || a.type || ''}</td>
      <td style="color:#64748b">${a.size || ''}</td>
      <td style="color:#64748b">${a.date || a.uploadDate || ''}</td>
      <td>
        <div class="action-btns">
          <button class="action-btn del"><i data-lucide="trash" style="width:14px;height:14px;"></i></button>
        </div>
      </td>
    </tr>`).join('');
  return `<div class="sub-table-wrap"><table class="sub-table">
    <thead><tr><th>Title</th><th>File Name</th><th>Size</th><th>Date Uploaded</th><th>Actions</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>`;
}

function renderCommentsTable(comments) {
  if (!comments || !comments.length) return '<div class="empty">No comments available</div>';
  const rows = comments.map(c => {
    const userImg = c.user?.avatar || c.avatar?.image || c.owner?.image || '';
    const userName = c.user?.name || c.author || '';
    const time = c.time || c.date || '';
    return `
    <div style="display:flex;gap:12px;padding:16px;border-bottom:1px solid #f1f5f9;">
      ${userImg ? `<div class="avatar-small"><img src="${userImg}"></div>` : `<div class="avatar-small"></div>`}
      <div style="flex:1">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
          <div style="font-size:12px;font-weight:600;color:#334155">${userName} <span style="font-weight:400;color:#94a3b8;font-size:10px;margin-left:6px">${time}</span></div>
          <div class="action-btns"><button class="action-btn del"><i data-lucide="trash" style="width:14px;height:14px;"></i></button></div>
        </div>
        <div style="font-size:13px;color:#475569;line-height:1.5">${c.text || ''}</div>
      </div>
    </div>`;
  }).join('');
  return `<div class="sub-table-wrap" style="background:#fff">${rows}</div>`;
}

function renderTablePanel(init) {
  const iid = init.id;
  const subsCount = init.subInitiatives ? init.subInitiatives.length : 0;
  const tasksCount = init.tasks ? init.tasks.length : 0;
  const milestonesCount = init.milestones ? init.milestones.length : 0;
  const filesCount = init.files ? init.files.length : 0;
  const commentsCount = init.comments ? init.comments.length : 0;

  return `
    <ul class="nav nav-tabs tabs border-0 mb-3" id="myTab-${iid}" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link tab-btn active" id="sub-tab-${iid}" data-bs-toggle="tab" data-bs-target="#sub-${iid}" type="button" role="tab" aria-controls="sub" aria-selected="true">
          Sub-Initiatives ${subsCount > 0 ? `<span class="tab-count">${subsCount}</span>` : ''}
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link tab-btn" id="tasks-tab-${iid}" data-bs-toggle="tab" data-bs-target="#tasks-${iid}" type="button" role="tab" aria-controls="tasks" aria-selected="false">
          Tasks ${tasksCount > 0 ? `<span class="tab-count">${tasksCount}</span>` : ''}
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link tab-btn" id="milestones-tab-${iid}" data-bs-toggle="tab" data-bs-target="#milestones-${iid}" type="button" role="tab" aria-controls="milestones" aria-selected="false">
          Milestones ${milestonesCount > 0 ? `<span class="tab-count">${milestonesCount}</span>` : ''}
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link tab-btn" id="files-tab-${iid}" data-bs-toggle="tab" data-bs-target="#files-${iid}" type="button" role="tab" aria-controls="files" aria-selected="false">
          Attachments ${filesCount > 0 ? `<span class="tab-count">${filesCount}</span>` : ''}
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link tab-btn" id="comments-tab-${iid}" data-bs-toggle="tab" data-bs-target="#comments-${iid}" type="button" role="tab" aria-controls="comments" aria-selected="false">
          Comments ${commentsCount > 0 ? `<span class="tab-count">${commentsCount}</span>` : ''}
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent-${iid}">
      <div class="tab-pane fade show active" id="sub-${iid}" role="tabpanel" aria-labelledby="sub-tab-${iid}">
         ${renderSubInitiativesTable(init.subInitiatives)}
      </div>
      <div class="tab-pane fade" id="tasks-${iid}" role="tabpanel" aria-labelledby="tasks-tab-${iid}">
         ${renderTasksTable(init.tasks)}
      </div>
      <div class="tab-pane fade" id="milestones-${iid}" role="tabpanel" aria-labelledby="milestones-tab-${iid}">
         ${renderMilestonesTable(init.milestones)}
      </div>
      <div class="tab-pane fade" id="files-${iid}" role="tabpanel" aria-labelledby="files-tab-${iid}">
         ${renderFilesTable(init.files)}
      </div>
      <div class="tab-pane fade" id="comments-${iid}" role="tabpanel" aria-labelledby="comments-tab-${iid}">
         ${renderCommentsTable(init.comments)}
      </div>
    </div>
  `;
}
// --- End Helper Functions ---

$(document).on('click', '.chevron-btn', function () {
  $(this).toggleClass('open');
});

$(document).ready(function () {
  loadInitiatives();
});

function loadInitiatives() {
  const container = $('#initiatives-container');
  const tbody = $('#tbody');

  if (container.length === 0 && tbody.length === 0) {
    return;
  }

  if (container.length) {
    container.html('<div class="text-center p-5"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>');
  } else if (tbody.length) {
    tbody.html('<tr><td colspan="9" class="text-center p-3">Loading initiatives...</td></tr>');
  }

  function renderInitiativesData(data) {
    if (container.length) container.empty();
    window.__initiativesRows = data || [];

    if (!data || data.length === 0) {
      if (container.length) container.html('<div class="text-center p-3">No initiatives found.</div>');
      if (tbody.length) tbody.html('<tr><td colspan="9" class="text-center p-3">No initiatives found.</td></tr>');
      return;
    }

    const accordionId = "accordionInitiatives";
    let html = `<div class="accordion card-accordion" id="${accordionId}">`;
    let tbodyHtml = '';

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
        `<span class="badge ${getDynamicColor(kpi)}"># ${kpi}</span>`
      ).join(' ');

      tbodyHtml += `
      <tr class="main-row">
          <td><input type="checkbox" class="row-checkbox"></td>
          <td><button class="chevron-btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panel-${item.id}" aria-expanded="false" aria-controls="panel-${item.id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg></button></td>
          <td>
            <div class="initiative-name">${item.title}</div>
            <div class="initiative-meta">${item.department ? `<span class="type-badge ${getDynamicColor(item.department)} rounded-pill" style="margin-right: 6px;">${item.department}</span>` : ''}ID: ${item.id}</div>
          </td>
          <td>${item.department}</td>
          <td><span class="icon"><img src="${statusImg}" width="16" height="16" /></span></td>
          <td>
              <div class="progress-wrap ${item.progress.wrapClass}">
                  <div class="progress flex-grow-1">
                      <div class="progress-bar ${item.progress.colorClass} progress-bar-striped rounded-pill" role="progressbar" style="width: ${item.progress.value}%;" aria-valuenow="${item.progress.value}" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <span class="badge text-dark">${item.progress.value}%</span>
              </div>
          </td>
          <td>${item.startDate}</td>
          <td>${item.endDate}</td>
          <td>
              <div class="dropdown">
                  <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                      <i data-lucide="ellipsis-vertical" style="width: 14px; height: 14px;"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                      <li><a class="dropdown-item" href="#initatives-add-modal" data-bs-toggle="modal">Edit</a></li>
                      <li><a class="dropdown-item" href="#">View</a></li>
                      <li><a class="dropdown-item" href="#">Delete</a></li>
                  </ul>
              </div>
          </td>
      </tr>
      <tr class="expanded-panel-row p-0 m-0">
          <td colspan="9" class="p-0 border-0">
              <div class="collapse" id="panel-${item.id}">
                  <div class="panel-inner">
                      ${renderTablePanel(item)}
                  </div>
              </div>
          </td>
      </tr>`;

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

    html += `</div>`;

    if (container.length) container.html(html);
    if (tbody.length) tbody.html(tbodyHtml);

    const rowCountEl = document.getElementById('rowCount');
    if (rowCountEl) {
      rowCountEl.textContent = data.length + ' initiative' + (data.length !== 1 ? 's' : '');
    }

    if (data.length > 0) {
      const firstInitiative = data[0];
      const subInitiativesHtml = renderSubInitiatives(firstInitiative);

      if (subInitiativesHtml) {
        // Adjust layout: shrink main container
        //  const mainCol = $('#initiatives-container').parent();
        //  mainCol.removeClass('col-12').addClass('col-md-8');

        // Show sub-initiative container and inject HTML
        const subContainer = $('.sub-initiative-show');
        subContainer.html(subInitiativesHtml);

        // Initialize sparklines
        initSparklines();


        // Initialize sparklines
        initSparklines();

        // Load sidebar tasks from root tasks array
        if (firstInitiative.tasks && firstInitiative.tasks.length > 0) {
          renderSidebarTasks(firstInitiative.tasks, firstInitiative.tasksTitle);
        }

        // Load sidebar milestones from root milestones array
        if (firstInitiative.milestones && firstInitiative.milestones.length > 0) {
          renderMilestones(firstInitiative.milestones, firstInitiative.milestonesTitle);
        }

        // Load sidebar files from root files array
        if (firstInitiative.files && firstInitiative.files.length > 0) {
          renderFiles(firstInitiative.files, firstInitiative.filesTitle);
        }

        // Load sidebar comments from root comments array
        if (firstInitiative.comments && firstInitiative.comments.length > 0) {
          renderComments(firstInitiative.comments, firstInitiative.commentsTitle);
        }
      }
    }
    // Re-initialize any plugins
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Initialize Progress Bars
    initProgressBars();



    // Initialize Popovers
    initPopoverFilters();

    // Initialize Tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  }

  if (window.InitiativesApiBridge && window.InitiativesApiBridge.enabled) {
    window.InitiativesApiBridge.loadInitiatives(true)
      .then(renderInitiativesData)
      .catch(function (err) {
        console.error('Initiatives API failed, falling back to JSON', err);
        $.getJSON("assets/json/initiativesnew.json", function (response) {
          let data = [];
          if (response && response.length > 0 && response[0].data) data = response[0].data;
          else if (Array.isArray(response)) data = response;
          renderInitiativesData(data);
        }).fail(function () {
          const msg = '<div class="text-danger text-center p-3">Failed to load initiatives data.</div>';
          if (container.length) container.html(msg);
          if (tbody.length) tbody.html('<tr><td colspan="9" class="text-danger text-center p-3">Failed to load initiatives data.</td></tr>');
        });
      });
    return;
  }

  $.getJSON("assets/json/initiativesnew.json", function (response) {
    let data = [];
    if (response && response.length > 0 && response[0].data) data = response[0].data;
    else if (Array.isArray(response)) data = response;
    renderInitiativesData(data);
  }).fail(function (jqxhr, textStatus, error) {
    console.error("Error loading initiatives JSON: ", textStatus, error);
    const msg = '<div class="text-danger text-center p-3">Failed to load initiatives data.</div>';
    if (container.length) container.html(msg);
    if (tbody.length) tbody.html('<tr><td colspan="9" class="text-danger text-center p-3">Failed to load initiatives data.</td></tr>');
  });
}

function renderSubInitiatives(parentInitiative) {
  if (!parentInitiative || !parentInitiative.subInitiatives || parentInitiative.subInitiatives.length === 0) return '';

  const subInitiatives = parentInitiative.subInitiatives;
  // const parentCollapseId = `parent-initiative-collapse-${parentInitiative.id}`; // Unused var
  // const parentOwnersHtml = renderOwners(parentInitiative.owners, parentInitiative.remainingOwners); // Unused var

  let html = `
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

    const isFirst = index === 0;
    const resizeClass = isFirst ? '' : 'collapsed';
    const ariaExpanded = isFirst ? 'true' : 'false';
    const showClass = isFirst ? 'show' : '';

    html += `
             <div class="accordion-item test${sub.id}">
                  <div class="accordion-header bg-primary" style="--stratroom-bg-opacity:0.04">
                    <div class="d-flex justify-content-between p-2 gap-1">
                      <button class="btn p-0 btn-title justify-content-start ${resizeClass}" data-bs-toggle="collapse"
                        data-bs-target="#${collapseId}" aria-expanded="${ariaExpanded}"
                        aria-controls="${collapseId}">
                        <div class="row row-cols-1 g-2 w-100">
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
                          <div class="progress-bar progress-bar-striped rounded-pill status-bg-green" role="progressbar" style="width: ${sub.progress.value}%;" data-percent="${sub.progress.value}" aria-valuenow="${sub.progress.value}"></div>
                        </div>
                        <span class="badge">${sub.progress.value}%</span>
                      </div>

                    <div class="d-flex flex-column justify-content-center">
                        <span class="text-muted">${sub.startDate}- ${sub.endDate}</span>
                    </div>
                  </div>
                  </div>

                  <div id="${collapseId}" class="accordion-collapse collapse ${showClass}" data-bs-parent="#accordionSubInitiative">
                    <div id="accordionSubInitiative-${sub.id}-${index}" class="accordion-body accordion gap-0 p-0">
                      ${renderActivities(sub.activities, sub.id, index)}
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
  if (!activities || activities.length === 0) return '';

  let html = '';
  activities.forEach((act, actIndex) => {
    const collapseId = `subinitiative-collapse-${parentId}-${subIndex}-${actIndex}`;
    const ownersHtml = renderOwners(act.owners, act.remainingOwners);

    const isActFirst = actIndex === 0;
    const resizeActClass = isActFirst ? '' : 'collapsed';
    const ariaActExpanded = isActFirst ? 'true' : 'false';
    const showActClass = isActFirst ? 'show' : '';

    html += `
            <div class="accordion-item border-0">
                <div class="accordion-header bg-white">
                  <div class="d-flex justify-content-between p-2 gap-1">
                    <div class="btn p-0 btn-title ${resizeActClass}" data-bs-toggle="collapse"
                        data-bs-target="#${collapseId}" aria-expanded="${ariaActExpanded}"
                        aria-controls="${collapseId}">
                        <div class="row row-cols-1 g-2 w-100">
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

                <div id="${collapseId}" class="accordion-collapse collapse ${showActClass}" data-bs-parent="#accordionSubInitiative-${parentId}-${subIndex}">
                    <div class="accordion-body p-0">
                      ${renderTasks(act.tasks)}
                    </div>
                </div>
            </div>
        `;
  });
  return html;
}

function renderTasks(tasks) {
  if (!tasks || tasks.length === 0) return '';

  let html = '';
  tasks.forEach(task => {
    const ownersHtml = renderOwners(task.owners, task.remainingOwners);
    html += `
            <div class="list-group-item border-bottom">
                <div class="d-flex justify-content-between p-2 gap-1">
                    <div class="p-0 btn-title">
                    <div class="row row-cols-1 g-2 w-100">
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
  $('.chart-pie').each(function () {
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
  firstCard.find('th').each(function () {
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
            <input class="form-check-input row-filter-checkbox" type="checkbox" value="${header}" id="${safeId}" checked>
            <label class="form-check-label" for="${safeId}">
                ${header}
            </label>
        </div>
        `;
  });



  popoverContent += `</div></div>`;

  // Initialize Popover on all buttons
  $('.popover-filter-btn').each(function () {
    const btn = $(this);
    const collapseId = btn.data('target-id');

    // Dispose existing if any
    const existing = bootstrap.Popover.getInstance(this);
    if (existing) existing.dispose();

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

      popoverBody.find('.filter-row-checkbox').each(function () {
        const headerText = $(this).val();
        // Find the row in this specific card
        const isVisible = cardContext.find('th').filter(function () {
          return $(this).text().trim() === headerText;
        }).closest('tr').is(':visible');

        $(this).prop('checked', isVisible);

        // Attach data-card-target to checkbox for the change handler
        $(this).attr('data-card-target', collapseId);
      });

      // Bind close button
      popoverBody.find('.btn-close').on('click', function () {
        bootstrap.Popover.getInstance(btn[0]).hide();
      });

      // Bind Select/Deselect All inside this specific popover instance
      popoverBody.find('.select-all-rows').on('click', function () {
        popoverBody.find('.filter-row-checkbox').prop('checked', true).trigger('change');
      });
      popoverBody.find('.deselect-all-rows').on('click', function () {
        popoverBody.find('.filter-row-checkbox').prop('checked', false).trigger('change');
      });
    });
  });

  // ... inside initPopoverFilters ...
}

// Global event listener for checkbox changes (delegated)
$(document).on('change', '.filter-row-checkbox', function () {
  const headerText = $(this).val();
  const isChecked = $(this).is(':checked');
  const targetCardId = $(this).attr('data-card-target');

  if (targetCardId) {
    const cardContext = $(`#${targetCardId}`);
    cardContext.find('th').filter(function () {
      return $(this).text().trim() === headerText;
    }).closest('tr').toggle(isChecked);
  }
});

function renderSidebarTasks(tasks, title) {
  const container = $('.task-show'); // Modified to target the main container
  if (!container.length) return;

  let listHtml = '';
  if (!tasks || tasks.length === 0) {
    listHtml = '<div class="list-group-item text-center text-muted">No tasks available</div>';
  } else {
    tasks.forEach(task => {
      const progress = task.progress ? parseInt(task.progress.value) : 0;
      let statusText = task.status || 'In Progress';
      let statusClass = 'status-bg-blue';

      // Map status text to class
      switch (statusText) {
        case 'Not Started':
          statusClass = 'status-bg-gray';
          break;
        case 'In Progress':
          statusClass = 'status-bg-blue';
          break;
        case 'Completed':
          statusClass = 'status-bg-green';
          break;
        case 'Delayed':
          statusClass = 'status-bg-red';
          break;
        case 'On Hold':
          statusClass = 'status-bg-orange';
          break;
        default:
          // Fallback logic if status is missing but progress exists
          if (progress === 0) {
            statusText = 'Not Started';
            statusClass = 'status-bg-gray';
          } else if (progress === 100) {
            statusText = 'Completed';
            statusClass = 'status-bg-green';
          } else {
            statusClass = 'status-bg-blue';
          }
      }

      listHtml += `
                <div class="list-group-item">
                  <div class="bar-chart">
                    <div class="d-flex gap-2 align-items-start">
                      <h4 class="title m-0">${task.title}</h4>
                      <span class="badge ${statusClass} rounded-pill ms-auto">
                        ${statusText}
                      </span>
                    </div>
    
                    <div class="progress-wrap">
                      <div class="progress flex-grow-1">
                        <div class="progress-bar progress-bar-striped rounded-pill" role="progressbar"
                          style="width: ${progress}%;" data-percent="${progress}"></div>
                      </div>
                      <span class="badge"></span>
                    </div>
    
                    <span class="text-muted">${task.startDate}- ${task.endDate}</span>
                  </div>
                  <div class="list-actions">
    
    
                    <div class="dropdown">
                      <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown"
                        aria-expanded="true">
                        <i data-lucide="more-vertical" style="width: 14px; height: 14px;"></i>
                      </button>
                      <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
    
                        <li>
                          <a class="dropdown-item" href="#task-add-modal" data-bs-toggle="modal">Edit</a>
                        </li>
                        <li><a class="dropdown-item">Delete</a></li>
    
                      </ul>
                    </div>
                  </div>
                </div>
            `;
    });
  }

  // Full Card Structure
  const html = `
      <div class="card custom-card table-card h-100">
        <div class="card-header">
          <div class="c-header-left">
            <h5 class="card-title">
              <strong editable="true" contenteditable="true"
                onkeypress="return (this.innerText.length <= 36)">${title}</strong>
            </h5>
          </div>
          <div class="card-actions">
            <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#task-add-modal">
              <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                <i data-lucide="plus" style="width: 14px; height: 14px;"></i>
              </span>
            </button>
            <div class="dropdown">
              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                <i data-lucide="ellipsis-vertical" style="width: 14px; height: 14px;"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                <li>
                  <a class="dropdown-item" href="#task-view-modal" data-bs-toggle="modal">View</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card-body employee_div_body_box sub-ini-box overflow-auto" style="height: 340px;">
          <div class="list-group initiatives-bar">
            ${listHtml}
          </div>
        </div>
      </div>
    `;

  container.html(html);
  lucide.createIcons(); // Re-initialize icons
}

function renderMilestones(milestones, title) {
  const container = $('.milestones'); // Modified to target the main container
  if (!container.length) return;

  let listHtml = '';
  if (!milestones || milestones.length === 0) {
    listHtml = '<div class="list-group-item text-center text-muted">No milestones available</div>';
  } else {
    milestones.forEach(milestone => {
      const progress = milestone.progress ? parseInt(milestone.progress.value) : 0;

      listHtml += `
                <div class="list-group-item">
                    <div class="bar-chart">
                      <div class="d-flex gap-2 align-items-start">
                        <h4 class="title m-0">${milestone.title}</h4>
                        <span class="badge ${milestone.badgeClass} rounded-pill ms-auto">
                          ${milestone.status}
                        </span>
                      </div>
      
                      <div class="progress-wrap">
                        <div class="progress flex-grow-1">
                          <div class="progress-bar progress-bar-striped rounded-pill" role="progressbar" style="width: ${progress}%;"
                            data-percent="${progress}"></div>
                        </div>
                        <span class="badge"></span>
                      </div>
                      <span class="text-muted">${milestone.date}</span>
                    </div>
                    <div class="list-actions">
                      <div class="dropdown">
                        <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown"
                          aria-expanded="true">
                          <i data-lucide="more-vertical" style="width: 14px; height: 14px;"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                          <li>
                            <a class="dropdown-item" href="#milestone-add-modal" data-bs-toggle="modal">Edit</a>
                          </li>
                          <li><a class="dropdown-item">Delete</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
            `;
    });
  }

  // Full Card Structure
  const html = `
      <div class="card custom-card table-card h-100">
        <div class="card-header">
          <div class="c-header-left">
            <h5 class="card-title">
              <strong editable="true" contenteditable="true"
                onkeypress="return (this.innerText.length <= 36)">${title}</strong>
            </h5>
          </div>
          <div class="card-actions">
            <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#milestone-add-modal">
              <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                <i data-lucide="plus" style="width: 14px; height: 14px;"></i>
              </span>
            </button>
            <div class="dropdown">
              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                <i data-lucide="ellipsis-vertical" style="width: 14px; height: 14px;"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                <li>
                  <a class="dropdown-item" href="#sub_milestone_view_popup" data-bs-toggle="modal">View</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card-body employee_div_body_box sub-ini-box overflow-auto" style="height: 340px;">
          <div class="list-group initiatives-bar">
            ${listHtml}
          </div>
        </div>
      </div>
    `;

  container.html(html);
  lucide.createIcons(); // Re-initialize icons
}

function renderFiles(files, title) {
  const container = $('.files');
  if (!container.length) return;

  let listHtml = '';
  if (!files || files.length === 0) {
    listHtml = '<div class="list-group-item text-center text-muted">No files available</div>';
  } else {
    files.forEach(file => {
      listHtml += `
            <div class="list-group-item">
              <div class="bar-chart">
                <div class="d-flex gap-2">
                  <h4 class="title mb-0">${file.title}</h4>
                </div>

                <div class="numbers">
                  <div class="text-muted left">${file.fileName} (${file.size})</div>
                  <div class="text-muted right">${file.date}</div>
                </div>
              </div>
              <div class="list-actions">
                <div class="dropdown">
                  <a href="#" class="btn btn-sm btn-outline-icon" role="button" id="dropdownMenuFile${file.id}"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <i data-lucide="more-vertical" style="width: 14px; height: 14px;"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end border-0 shadow" aria-labelledby="dropdownMenuFile${file.id}">
                    <li>
                      <a href="#attachments-modal" class="dropdown-item" data-bs-toggle="modal">
                        Edit
                      </a>
                    </li>
                    <li>
                      <a href="#delete-modal" class="dropdown-item" data-bs-toggle="modal">
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            `;
    });
  }

  const html = `
      <div class="card custom-card table-card h-100">
        <div class="card-header">
          <div class="c-header-left">
            <h5 class="card-title">
              <strong editable="true" contenteditable="true"
                onkeypress="return (this.innerText.length <= 36)">${title}</strong>
            </h5>
          </div>
          <div class="card-actions">
            <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#attachments-modal">
              <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                <i data-lucide="plus" style="width: 14px; height: 14px;"></i>
              </span>
            </button>
            <div class="dropdown">
              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                <i data-lucide="ellipsis-vertical" style="width: 14px; height: 14px;"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                <li>
                  <a class="dropdown-item" href="#attachments-view-modal" data-bs-toggle="modal"
                    onclick="return false;">View</a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <div class="card-body overflow-auto">
          <div class="card-body-box">
            <div class="list-group initiatives-bar">
                ${listHtml}
            </div>
          </div>
        </div>
      </div>
    `;

  container.html(html);
  lucide.createIcons();
}

function renderComments(comments, title) {
  const container = $('.comments-show');
  if (!container.length) return;

  let commentsHtml = '';

  if (!comments || comments.length === 0) {
    commentsHtml = '<div class="text-center text-muted p-3">No comments yet</div>';
  } else {
    const renderSingleComment = (comment, isReply = false) => {
      let repliesHtml = '';
      if (comment.replies && comment.replies.length > 0) {
        repliesHtml = '<div class="replies">';
        comment.replies.forEach(reply => {
          repliesHtml += `<div class="reply">${renderSingleComment(reply, true)}</div>`;
        });
        repliesHtml += '</div>';
      }

      const contentHtml = `
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
                                <span class="like-btn">Like</span> ·
                                <span class="like-count">0</span> ·
                                <span class="reply-btn">Reply</span> ·
                                <span class="edit-btn">Edit</span> ·
                                <span class="delete-btn">Delete</span>
                            </div>
                        </div>
                    </div>
                     <div class="reply-section" style="display: none;">
                      <input type="text" class="form-control reply-input" placeholder="Write a reply...">
                      <button class="btn btn-sm label-bg-primary reply-post"><i data-lucide="arrow-right"
                          style="width: 14px; height: 14px;"></i></button>
                    </div>
                </div>
                ${repliesHtml}
            `;
      return contentHtml;
    };

    comments.forEach(comment => {
      commentsHtml += `<div class="comment">${renderSingleComment(comment)}</div>`;
    });
  }

  const html = `
      <div class="card custom-card table-card h-100">
        <div class="card-header">
          <div class="c-header-left">
            <h5 class="card-title">
              <strong editable="true" contenteditable="true"
                onkeypress="return (this.innerText.length <= 36)">${title}</strong>
            </h5>
          </div>
          <div class="card-actions">
            <div class="dropdown">
              <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                <i data-lucide="ellipsis-vertical" style="width: 14px; height: 14px;"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <a href="#comments_view_popup" class="dropdown-item" data-bs-toggle="modal" onclick="return false;">
                    View
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="card-body overflow-auto comment-history comments-list" id="comment-conversation_1"
          style="height: 262px;">
            ${commentsHtml}
        </div>
        <div class="card-footer comment_send">
          <div class="input-group">
            <input id="comment-input" type="text" class="form-control comment-input" placeholder="Type a comment..."
              aria-label="Write a comment..." aria-describedby="button-addon2">
            <button class="btn label-bg-primary post-comment" type="button"><i data-lucide="arrow-right"
                style="width: 14px; height: 14px;"></i></button>
          </div>
        </div>
      </div>
    `;

  container.html(html);
  lucide.createIcons();
}

function initProgressBars() {
  $(".progress-bar[data-percent]").each(function () {
    const $bar = $(this);
    const rawPercent = $bar.data("percent");

    if (rawPercent === undefined || isNaN(rawPercent)) return;

    const percent = Math.max(0, Math.min(100, parseInt(rawPercent, 10)));

    // Update width and aria
    $bar.css("width", percent + "%");
    $bar.attr("aria-valuenow", percent);

    // Set dynamic color
    $bar.removeClass("status-bg-green status-bg-yellow status-bg-red");
    if (percent < 40) {
      $bar.addClass("status-bg-red");
    } else if (percent < 75) {
      $bar.addClass("status-bg-yellow");
    } else {
      $bar.addClass("status-bg-green");
    }

    // Update the badge text next to this progress bar if it exists
    $bar.closest(".progress-wrap").find(".badge").text(percent + "%");
  });
}
const INITIATIVES = [
  {
    id: "SI-001", name: "Digital Transformation Program", owner: "CTO", due: "Dec 2026",
    status: "On Track", progress: 72, color: "#27ae60",
    counts: { sub: 4, act: 12, ms: 8 },
    gantt: { left: "0%", width: "100%", label: "Digital Transformation", milestone: "40%" },
    tree: [
      { type: 'S', name: "Cloud Infrastructure Migration", desc: "Sub-01 · IT Director", prog: 90, date: "Jun 2026", status: "On Track", color: "#2980b9", indent: 20 },
      { type: 'A', name: "Migrate Core Systems to AWS", desc: "Activity · IT Team", prog: 95, date: "May 2026", status: "On Track", color: "#27ae60", indent: 40 },
      { type: 'T', name: "Configure IAM Roles & Policies", desc: "Task · Infra Lead", prog: 100, date: "Apr 2026", status: "Complete", color: "#e67e22", indent: 60 },
      { type: 'M', name: "Cloud Migration Go-Live ★", desc: "Milestone", date: "TARGET: May 15, 2026", status: "On Track", color: "#e74c3c", indent: 60 }
    ]
  },
  {
    id: "SI-002", name: "Customer Experience Overhaul", owner: "CMO", due: "Sep 2026",
    status: "At Risk", progress: 45, color: "#e67e22",
    counts: { sub: 3, act: 9, ms: 5 },
    gantt: { left: "8%", width: "66%", label: "CX Overhaul", milestone: "50%" },
    tree: [
      { type: 'S', name: "Data Analytics Platform", desc: "Sub-02 · Data Director", prog: 55, date: "Sep 2026", status: "At Risk", color: "#2980b9", indent: 20 },
      { type: 'A', name: "Implement BI Dashboards", desc: "Activity · BI Team", prog: 60, date: "Aug 2026", status: "At Risk", color: "#27ae60", indent: 40 },
      { type: 'T', name: "Data Model Design & Review", desc: "Task · Data Architect", prog: 80, date: "Jul 2026", status: "In Progress", color: "#e67e22", indent: 60 }
    ]
  },
  {
    id: "SI-003", name: "Operational Excellence", owner: "COO", due: "Jun 2026",
    status: "On Track", progress: 88, color: "#27ae60",
    counts: { sub: 2, act: 7, ms: 4 },
    gantt: { left: "0%", width: "50%", label: "Operational Excellence", milestone: null }
  },
  {
    id: "SI-004", name: "Market Expansion – APAC", owner: "CEO", due: "Mar 2027",
    status: "Critical", progress: 28, color: "#e74c3c",
    counts: { sub: 4, act: 10, ms: 6 },
    gantt: { left: "16%", width: "84%", label: "APAC Expansion", milestone: "75%" }
  },
  {
    id: "SI-005", name: "Talent Development Initiative", owner: "CHRO", due: "Dec 2026",
    status: "In Progress", progress: 61, color: "#2980b9",
    counts: { sub: 3, act: 5, ms: 3 },
    gantt: { left: "8%", width: "83%", label: "Talent Development", milestone: null }
  },
  {
    id: "SI-006", name: "Sustainability & ESG Program", owner: "CFO", due: "Jun 2027",
    status: "On Track", progress: 54, color: "#27ae60",
    counts: { sub: 2, act: 4, ms: 2 },
    gantt: { left: "0%", width: "100%", label: "ESG Program", milestone: null }
  }
];


renderGantt();

// ===== GANTT CHART =====
function renderGantt() {
  const container = document.getElementById('ganttContainer');
  if (!container) return;
  container.innerHTML = INITIATIVES.map(i => {
    const msObj = i.gantt.milestone ? `<div class="gantt-milestone" style="left:${i.gantt.milestone};"></div>` : '';
    return `<div class="gantt-row">
          <div class="gantt-label"><strong>${i.id}</strong> ${i.gantt.label}</div>
          <div class="gantt-track">
            <div class="gantt-bar" style="background:${i.color};left:${i.gantt.left};width:${i.gantt.width};">${i.gantt.label}</div>
            ${msObj}
          </div>
        </div>`;
  }).join('');
}


// Dataset closely matching the image structure and values
const subInitiativesData = [
  {
    "id": "sub1",
    "title": "Upgrade Lighting Systems to LED",
    "startDate": "Oct 09, 2019",
    "endDate": "Oct 11, 2019",
    "progress": {
      "value": 90
    },
    "owners": [
      {
        "name": "Kim Karlos",
        "image": "assets/images/user/user9.jpg"
      },
      {
        "name": "John Doe",
        "image": "assets/images/user/user9.jpg"
      }
    ],
    "remainingOwners": 3,
    "activities": [
      {
        "id": "act1",
        "title": "Conduct a comprehensive audit of all existing lighting systems across facilities to identify areas where upgrades are needed",
        "startDate": "Sep 23, 2024",
        "endDate": "Sep 25, 2024",
        "progress": {
          "value": 90
        },
        "owners": [
          {
            "name": "Kim Karlos",
            "image": "assets/images/user/user9.jpg"
          },
          {
            "name": "John Doe",
            "image": "assets/images/user/user9.jpg"
          }
        ],
        "remainingOwners": 3,
        "tasks": [
          {
            "id": "task1",
            "title": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            "startDate": "Sep 23, 2024",
            "endDate": "Sep 25, 2024",
            "progress": {
              "value": 20
            },
            "owners": [
              {
                "name": "Kim Karlos",
                "image": "assets/images/user/user9.jpg"
              },
              {
                "name": "John Doe",
                "image": "assets/images/user/user9.jpg"
              }
            ],
            "remainingOwners": 3,
            "status": "Not Started"
          },
          {
            "id": "task2",
            "title": "Second sample task for demonstration purposes.",
            "startDate": "Sep 26, 2024",
            "endDate": "Sep 30, 2024",
            "progress": {
              "value": 50
            },
            "owners": [
              {
                "name": "Kim Karlos",
                "image": "assets/images/user/user9.jpg"
              }
            ],
            "remainingOwners": 0,
            "status": "In Progress"
          },
          {
            "id": "task3",
            "title": "Third sample task showing completed status.",
            "startDate": "Oct 01, 2024",
            "endDate": "Oct 05, 2024",
            "progress": {
              "value": 100
            },
            "owners": [
              {
                "name": "John Doe",
                "image": "assets/images/user/user9.jpg"
              }
            ],
            "remainingOwners": 0,
            "status": "Completed"
          },
          {
            "id": "task4",
            "title": "Fourth sample task showing delayed status.",
            "startDate": "Oct 06, 2024",
            "endDate": "Oct 10, 2024",
            "progress": {
              "value": 20
            },
            "owners": [],
            "remainingOwners": 0,
            "status": "Delayed"
          },
          {
            "id": "task5",
            "title": "Fifth sample task showing on hold status.",
            "startDate": "Oct 11, 2024",
            "endDate": "Oct 15, 2024",
            "progress": {
              "value": 10
            },
            "owners": [],
            "remainingOwners": 0,
            "status": "On Hold"
          }
        ]
      }
    ]
  },
  {
    "id": "sub2",
    "title": "Enhance Energy Efficiency",
    "startDate": "Oct 15, 2025",
    "endDate": "Dec 31, 2025",
    "progress": {
      "value": 45
    },
    "owners": [
      {
        "name": "Sarah Smith",
        "image": "assets/images/user/user8.jpg"
      }
    ],
    "remainingOwners": 0,
    "activities": [
      {
        "id": "act2",
        "title": "Install Solar Panels",
        "startDate": "Nov 01, 2025",
        "endDate": "Dec 15, 2025",
        "progress": {
          "value": 45
        },
        "owners": [
          {
            "name": "Sarah Smith",
            "image": "assets/images/user/user8.jpg"
          }
        ],
        "remainingOwners": 0,
        "tasks": [
          {
            "id": "task2",
            "title": "Vendor Selection",
            "startDate": "Nov 01, 2025",
            "endDate": "Nov 15, 2025",
            "progress": {
              "value": 100
            },
            "owners": [
              {
                "name": "Sarah Smith",
                "image": "assets/images/user/user8.jpg"
              }
            ],
            "remainingOwners": 0
          },
          {
            "id": "task3",
            "title": "Site Survey",
            "startDate": "Nov 16, 2025",
            "endDate": "Nov 30, 2025",
            "progress": {
              "value": 20
            },
            "owners": [
              {
                "name": "Sarah Smith",
                "image": "assets/images/user/user8.jpg"
              }
            ],
            "remainingOwners": 0
          }
        ]
      },
      {
        "id": "act3",
        "title": "Replace HVAC Systems",
        "startDate": "Dec 01, 2025",
        "endDate": "Dec 31, 2025",
        "progress": {
          "value": 10
        },
        "owners": [
          {
            "name": "Sarah Smith",
            "image": "assets/images/user/user8.jpg"
          }
        ],
        "remainingOwners": 0,
        "tasks": [
          {
            "id": "task4",
            "title": "Audit Current Systems",
            "startDate": "Dec 01, 2025",
            "endDate": "Dec 05, 2025",
            "progress": {
              "value": 0
            },
            "owners": [
              {
                "name": "Sarah Smith",
                "image": "assets/images/user/user8.jpg"
              }
            ],
            "remainingOwners": 0
          }
        ]
      }
    ]
  },
  {
    "id": "sub3",
    "title": "Waste Management Program",
    "startDate": "Jan 01, 2026",
    "endDate": "Mar 31, 2026",
    "progress": {
      "value": 80
    },
    "owners": [
      {
        "name": "Mike Johnson",
        "image": "assets/images/user/user6.jpg"
      },
      {
        "name": "Lisa Brown",
        "image": "assets/images/user/user5.jpg"
      }
    ],
    "remainingOwners": 1,
    "activities": [
      {
        "id": "act4",
        "title": "Recycling Training for Staff",
        "startDate": "Jan 10, 2026",
        "endDate": "Jan 20, 2026",
        "progress": {
          "value": 80
        },
        "owners": [
          {
            "name": "Mike Johnson",
            "image": "assets/images/user/user6.jpg"
          }
        ],
        "remainingOwners": 0,
        "tasks": [
          {
            "id": "task5",
            "title": "Create Training Material",
            "startDate": "Jan 10, 2026",
            "endDate": "Jan 15, 2026",
            "progress": {
              "value": 80
            },
            "owners": [
              {
                "name": "Mike Johnson",
                "image": "assets/images/user/user6.jpg"
              }
            ],
            "remainingOwners": 0
          }
        ]
      }
    ]
  }];
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function (m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}
// Helper: determine progress bar color
function getProgressColor(val) {
  if (val < 50) return 'var(--color-orange)';
  if (val >= 80) return 'var(--color-green)';
  return 'var(--color-blue)';
}
// Common renderer for progress
function renderProgress(val) {
  const color = getProgressColor(val);
  return `<div class="progress-wrapper">
                    <span class="progress-text">${val}%</span>
                    <div class="progress-track">
                        <div class="progress-fill" style="width: ${val}%; background-color: ${color};"></div>
                    </div>
                </div>`;
}
// Common renderer for actions
function renderActions(type) {
  let editModal, deleteModal, addModal;

  if (type === 'sub-initiative') {
    editModal = '#subinitative-edit-modal';
    deleteModal = '#delete-modal';
    addModal = '#activities-add-modal';
  } else if (type === 'activity') {
    editModal = '#activities-edit-modal';
    deleteModal = '#delete-modal';
    addModal = '#sub-activities-add-modal';
  } else if (type === 'task') {
    editModal = '#sub-activities-edit-modal';
    deleteModal = '#delete-modal';
    addModal = null;
  } else {
    editModal = '#activities-add-modal';
    deleteModal = '#activities-add-modal';
    addModal = '#activities-add-modal';
  }

  let addBtnHtml = '';
  if (addModal) {
    addBtnHtml = `<button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="${addModal}"> <span data-bs-toggle="tooltip"
                    data-bs-title="Add">
                    <i data-lucide="plus" style="width: 14px; height: 14px;"></i>
                  </span></button>`;
  }

  return `<div class="table-actions justify-content-end">
                  <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="${editModal}"> <span data-bs-toggle="tooltip"
                    data-bs-title="Edit">
                    <i data-lucide="square-pen" style="width: 14px; height: 14px;"></i>
                  </span></button>
                  <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="${deleteModal}"> <span data-bs-toggle="tooltip"
                    data-bs-title="Delete">
                    <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
                  </span></button>
                  ${addBtnHtml}
                </div>`;
}
// Build HTML for child row (activities + tasks)
function formatChildRow(initiative) {
  let html = `<table class="child-table">`;
  if (initiative.activities && initiative.activities.length > 0) {
    for (let act of initiative.activities) {

      // Add a toggle caret only if there are tasks
      let actCaret = `<span class="caret-icon me-2" style="visibility:hidden;"><i class="fas fa-caret-right"></i></span>`;
      if (act.tasks && act.tasks.length > 0) {
        actCaret = `<span class="caret-icon btn-expand-act me-2"><i class="fas fa-caret-right"></i></span>`;
      }
      html += `<tr class="activity-row" data-act-id="${act.id}">
                            <td style="padding-left: 1.5rem;">
                                ${actCaret}
                                <span style="font-weight: 600;">${escapeHtml(act.title)}</span>
                            </td>
                            <td>${escapeHtml(act.startDate)}</td>
                            <td>${escapeHtml(act.endDate)}</td>
                            <td>${renderProgress(act.progress.value)}</td>
                            <td>${renderActions('activity')}</td>
                         </tr>`;

      if (act.tasks && act.tasks.length > 0) {
        for (let task of act.tasks) {
          html += `<tr class="task-row task-for-${act.id}" style="display:none;">
                            <td style="padding-left: 3.5rem; font-weight: 500;">
                                ${escapeHtml(task.title)}
                            </td>
                            <td>${escapeHtml(task.startDate)}</td>
                            <td>${escapeHtml(task.endDate)}</td>
                            <td>${renderProgress(task.progress.value)}</td>
                            <td>${renderActions('task')}</td>
                        </tr>`;
        }
      }
    }
  }
  html += `</table>`;
  return html;
}

