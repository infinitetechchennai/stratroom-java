$(document).ready(function () {
var table;
let collapsedGroups = {};
const maxVisiblePerGroup = 5;

    if (!$.fn.DataTable.isDataTable('#table-compliance')) {
        table = $('#table-compliance').DataTable({
            paging: false,
            // pageLength: 20,
            lengthChange: false,
            // searching: false,
            ordering: false,
            info: false,
            responsive: true,
            scrollX: true,
            scrollY: "400px",
            processing: true,
            deferRender: true,
            language: {
                paginate: {
                    previous: "<i class='fas fa-arrow-left'></i>",
                    next: "<i class='fas fa-arrow-right'></i>"
                }
            },
            ajax: {
                    url: "compliance.json", // Your JSON file path
                    method: "GET",
                    dataType: "json",
                    dataSrc: function (json) {
                        console.log("Fetched Data:", json);
                        const data = json[0] ?.tab[0] ?.tabledata || [];
                        console.log("Table Data:", data);
                        return data;
                    },                
            },
            columns: [{
                        data: 'control_id',
                        title: 'Control ID',
                        className:'editableControl_id',
                         render: function (data) {
            return `<span class="badge label-bg-dark rounded-pill">${data || ''}</span>`;
          }
                    },
                    {
                        data: 'control_description',
                        title: 'Control Description',
                        className:'editableControl_description text-start',
                         render: function (data) {
    return `<div class="notswrap" style="min-width:250px">${data || "N/A"}</div>`;
  }
                    },
                    {
                        data: 'compliance_area',
                        title: 'Compliance Area',
                        className:'editableCompliance_area text-center',
                    },
                    {
                        data: 'regulation',
                        title: 'Regulation/Standard',
                        className:'editableRegulations',
                       render: function (data) {
                       return getRegulationBadges(data);
                }
                    },
                   {
                      data: 'owner',
                      title: 'Owner',
                      orderable: false,
                      render: function (data, type, row, meta) {
                        if (!Array.isArray(data) || data.length === 0) {
                          return 'N/A';
                        }

                        const maxVisible = 2;
                        const visibleOwners = data.slice(0, maxVisible);
                        const remainingCount = data.length - maxVisible;

                        const avatars = visibleOwners.map(o => `
                          <li class="avatar avatar-xs pull-up" title="${o.name}">
                            <img src="assets/images/user/${o.image}" class="rounded-circle" width="24" height="24" alt="${o.name}">
                          </li>`).join("");

                        const moreAvatar = remainingCount > 0 ? `
                          <li class="avatar avatar-xs pull-up" data-bs-toggle="modal" href="#attendess-list">
                            <span class="avatar-initial rounded-circle" data-bs-toggle="tooltip" title="${remainingCount} more">+${remainingCount}</span>
                          </li>` : "";

                        // Wrap in <ul> for layout (if needed)
                        return `<ul class="list-unstyled d-flex align-items-center align-items-center justify-content-center avatar-group mb-0">${avatars}${moreAvatar}</ul>`;
                      }
                    },
                    {
                        data: 'risk_level',
                        title: 'Risk Level',
                        className:'editableRisk_level',
                        render: function (data) {
                          return getRiskLevelBadge(data);
                        }
                    },
                    {
                        data: 'control_type',
                        title: 'Control Type',
                        className:'editableControl_type',
                        defaultContent: 'N/A',
                        render:function(data){
                          return getControlTypeBadge(data);
                        }
                    },
                    {
                        data: 'implementation_status',
                        title: 'Implementation Status',
                        className:'editableImplementation_status',
                        defaultContent: 'N/A',
                        render:function(data){
                          return getImplementationStatusBadge(data);
                        }
                    },
                    {
                        data: 'last_assessment_date',
                        title: 'Last Assessment Date',
                        className:'editableLast_assessment_date',
                        defaultContent: 'N/A'
                    },
                    {
                        data: 'next_review_date',
                        title: 'Next Review Date',
                        className:'editableNext_review_date',
                        defaultContent: 'N/A'
                    },
                    {
                        data: 'status',
                        title: 'Status',
                        className:'editableStatus',
                        defaultContent: 'N/A',
                        render:function(data){
                          return getStatusBadge(data);
                         },visible: true,searchable: true 
                    },
                    {
                        data: 'audit_required',
                        title: 'Audit Required',
                        className:'editableAudit_required',
                        defaultContent: 'N/A',
                        render:function(data){
                          return getAuditRequiredBadge(data);
                        }
                    },
                    {
                        data: 'last_audit_date',
                        title: 'Last Audit Date',
                        className:'editableLast_audit_date',
                        defaultContent: 'N/A'
                    },
                    {
                        data: 'audit_findings',
                        title: 'Audit Findings',
                        className:'editableAudit_findings',
                        defaultContent: 'N/A'
                    },
                    {
                        data: 'corrective_actions',
                        title: 'Corrective Actions',
                        className:'editableCorrective_actions',
                        defaultContent: 'N/A'
                    },
                    {
                        data: 'action_due_date',
                        title: 'Action Due Date',
                        className:'editableAction_due_date',
                        defaultContent: 'N/A'
                    },
                    {
                      data: 'responsible_person',
                      title: 'Responsible',
                      orderable: false,
                      render: function (data, type, row, meta) {
                        if (!Array.isArray(data) || data.length === 0) {
                          return 'N/A';
                        }

                        const maxVisible = 2;
                        const visibleList = data.slice(0, maxVisible);
                        const remainingCount = data.length - maxVisible;

                        const avatars = visibleList.map(p => `
                          <li class="avatar avatar-xs pull-up" title="${p.name}">
                            <img src="assets/images/user/${p.image}" class="rounded-circle" width="24" height="24" alt="${p.name}">
                          </li>`).join("");

                        const moreAvatar = remainingCount > 0 ? `
                          <li class="avatar avatar-xs pull-up" data-bs-toggle="modal" href="#attendess-list">
                            <span class="avatar-initial rounded-circle" data-bs-toggle="tooltip" title="${remainingCount} more">+${remainingCount}</span>
                          </li>` : "";

                        return `<ul class="list-unstyled d-flex align-items-center align-items-center justify-content-center avatar-group mb-0">${avatars}${moreAvatar}</ul>`;
                      }
                    },
                                      {
                      data: 'evidence_file_reference',
                      title: 'Evidence File Reference',
                      defaultContent: 'N/A',
                      orderable: false,
                      render: function (data) {
                      if (!data) return 'N/A';

                        return `
                          <a href="/path/to/files/${data}" download class="btn btn-sm btn-icon text-decoration-none" title="Download Evidence">
                            <i class="fas fa-file-pdf text-danger"></i>
                          </a>
                        `;
                      }
                    },
                                      {
                      data: 'notes',
                      title: 'Notes',
                      className:'editableNotes',
                      defaultContent: 'N/A',
                      render: function (data) {
                        return `<div class="notswrap" style="min-width:250px">${data || "N/A"}</div>`;
                      }
                    },
                    {
                        data: null,
                        title: 'Actions',
                        orderable: false,
                        render: function () {
                            return getActionsMenu();
                        }
                    }
                ],
                order: [[2, 'asc']], // column index of 'compliance_area'
                rowGroup: {
  dataSrc: 'compliance_area',
  startRender: function (rows, group) {
    const totalCount = rows.count();
    const loadedCount = Math.min(totalCount, collapsedGroups[group] || 5);
    const showMore = loadedCount < totalCount;
      const shownCount = collapsedGroups[group] || 10;
    const remainingCount = totalCount - shownCount;

    return $('<tr/>')
      .addClass('group-header')
      .attr('data-group', group)
      .append(`<td colspan="100%" class="bg-light text-dark">
        <div class="d-flex gap-3 justify-content-between align-items-center">
        <div class="d-flex gap-1">
        <span class="toggle-group"><span class="group-toggle-icon"><i class="fas fa-minus toggle-icon"></i></span></span>
        
        ${group ? `<strong class="fw-bold">${group}</strong>`:``} <span class="text-muted">(${totalCount} items)</span>

        ${showMore ? ` <a href="#" class="load-more-link text-primary ms-3" data-group="${group}">+ ${remainingCount} more</a>` : ''  }
</div>
<div class="table-actions justify-content-end">
                <a data-bs-toggle="modal" data-bs-target="#task-add-modal" class="btn btn-sm btn-outline-icon" style="--stratroom-btn-color:var(--stratroom-primary);--stratroom-btn-border-color:rgba(var(--stratroom-primary-rgb),0.1);--stratroom-btn-hover-color:var(--stratroom-primary);--stratroom-btn-hover-bg:rgba(var(--stratroom-primary-rgb),0.1)">
                    <span class="icon">
                    <i class="fas fa-plus"></i></span>
                </a>               
            </div>
</div>
      </td>`);
  }
},

                drawCallback: function () {
                    const api = this.api();
                    const groupRows = {};

                    // Group rows by compliance_area
                    api.rows({
                        page: 'all'
                    }).every(function () {
                        const rowData = this.data();
                        const rowNode = this.node();
                        const group = rowData.compliance_area;
                        groupRows[group] = groupRows[group] || [];
                        groupRows[group].push(rowNode);
                    });

                    Object.entries(groupRows).forEach(([group, rows]) => {
                        const shownCount = collapsedGroups[group] || 5;

                        rows.forEach((row, idx) => {
                            if (idx < shownCount) {
                                $(row).show();
                            } else {
                                $(row).hide().addClass(`extra-${group}`);
                            }
                        });
                    });                    
                }


        })

        
        // ==========================
// Column Visibility Filter with Select All / Deselect All
// ==========================
const theadCells = table.table().header().rows[0].cells;
const excludedIndices = [1, 2, 3, 4, 5, 8, 9, 10, 12]; // Customize

let columnPopoverContent = `
  <div>
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h5 class="h6 mb-0">Filter Table Columns</h5>
      <button type="button" class="btn-close" aria-label="Close"></button>
    </div>
    <div class="d-flex justify-content-between mb-2">
      <button class="btn btn-sm btn-light select-all-cols">Select All</button>
      <button class="btn btn-sm btn-light deselect-all-cols">Deselect All</button>
    </div>
    <div class="d-flex flex-column gap-2 pageViewOption">
`;

for (let i = 1; i < theadCells.length - 1; i++) {
  if (excludedIndices.includes(i)) continue;

  const title = $(theadCells[i]).text().trim();
  const id = `ftablethead-column-${i.toString().padStart(4, '0')}`;
  columnPopoverContent += `
    <div class="form-check">
      <input class="form-check-input filter-table-th" id="${id}" type="checkbox" value="${title}" checked data-col="${i}">
      <label class="form-check-label" for="${id}">${title}</label>
    </div>
  `;
}
columnPopoverContent += `</div></div>`;

const popoverTriggerTh = document.getElementById('popoverFiltertableHead');
new bootstrap.Popover(popoverTriggerTh, {
  html: true,
  placement: 'bottom',
  content: columnPopoverContent,
  sanitize: false,
  container: 'body',
});

popoverTriggerTh.addEventListener('shown.bs.popover', () => {
  $('.filter-table-th').each(function () {
    const colIndex = $(this).data('col');
    $(this).prop('checked', table.column(colIndex).visible());
  });
});

// Toggle individual columns
$(document).on('change', '.filter-table-th', function () {
  const colIndex = $(this).data('col');
  const visible = $(this).is(':checked');
  table.column(colIndex).visible(visible);

  // Save to localStorage
  const state = JSON.parse(localStorage.getItem('tableColVisibility') || '{}');
  state[colIndex] = visible;
  localStorage.setItem('tableColVisibility', JSON.stringify(state));
});

// Apply saved visibility on load
const savedVisibility = JSON.parse(localStorage.getItem('tableColVisibility') || '{}');
Object.entries(savedVisibility).forEach(([colIndex, isVisible]) => {
  table.column(Number(colIndex)).visible(isVisible);
});

// Select All / Deselect All (columns)
$(document).on('click', '.select-all-cols', () => {
  $('.filter-table-th').each(function () {
    $(this).prop('checked', true).trigger('change');
  });
});
$(document).on('click', '.deselect-all-cols', () => {
  $('.filter-table-th').each(function () {
    $(this).prop('checked', false).trigger('change');
  });
});


// ==========================
// Status Filter with Select All / Deselect All
// ==========================
const statusPopoverTrigger = document.getElementById('popoverFilterStatus');
const statusPopoverContent = `
  <div>
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h5 class="h6 mb-0">Filter Status</h5>
      <button type="button" class="btn-close" aria-label="Close"></button>
    </div>
    <div class="d-flex justify-content-between mb-2">
      <button class="btn btn-sm btn-light select-all-status">Select All</button>
      <button class="btn btn-sm btn-light deselect-all-status">Deselect All</button>
    </div>
    <div class="d-flex flex-column gap-2 pageViewOption">   
      ${['Not Started', 'Pending', 'Ongoing', 'Effective'].map(status => `
        <div class="form-check">
          <input class="form-check-input filter-status" id="status-${status.replace(/\s/g, '')}" type="checkbox" value="${status}">
          <label class="form-check-label" for="status-${status.replace(/\s/g, '')}">${status}</label>
        </div>`).join('')}
    </div>
  </div>
`;

new bootstrap.Popover(statusPopoverTrigger, {
  html: true,
  placement: 'bottom',
  content: statusPopoverContent,
  sanitize: false,
  container: 'body',
});

// Get status column index
const statusColumnIndex = $('#table-compliance thead th').filter('.editableStatus').index();

// Handle individual status filtering
$(document).on('change', '.filter-status', function () {
  const terms = $('.filter-status:checked').map(function () {
    return `^${$(this).val()}$`;
  }).get();
  table.column(statusColumnIndex).search(terms.join('|'), true, false).draw();
});

// Select All / Deselect All (status)
$(document).on('click', '.select-all-status', () => {
  $('.filter-status').prop('checked', true).trigger('change');
});
$(document).on('click', '.deselect-all-status', () => {
  $('.filter-status').prop('checked', false).trigger('change');
   table.column(statusColumnIndex).search('', true, false).draw();
});

// Example compliance area options (you can replace with dynamic values)
const complianceAreas = ['ESG', 'GDPR', 'SOX', 'COBIT', 'CSCRF'];

const compliancePopoverContent = `
  <div>
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h5 class="h6 mb-0">
        <i class="fas fa-shield-alt me-1 text-primary"></i> Filter Compliance Area
      </h5>
      <button type="button" class="btn-close" aria-label="Close"></button>
    </div>
    <div class="d-flex justify-content-between mb-2">
      <button class="btn btn-sm btn-light select-all-compliance">Select All</button>
      <button class="btn btn-sm btn-light deselect-all-compliance">Deselect All</button>
    </div>
    <div class="d-flex flex-column gap-2 pageViewOption">
      ${complianceAreas.map(area => `
        <div class="form-check">
          <input class="form-check-input filter-compliance" id="ca-${area.replace(/\s+/g, '')}" type="checkbox" value="${area}" checked>
          <label class="form-check-label" for="ca-${area.replace(/\s+/g, '')}">${area}</label>
        </div>
      `).join('')}
    </div>
  </div>
`;

const compliancePopoverTrigger = document.getElementById('popoverFilterComplianceArea');
new bootstrap.Popover(compliancePopoverTrigger, {
  html: true,
  placement: 'bottom',
  content: compliancePopoverContent,
  sanitize: false,
  container: 'body',
});

// Get column index for compliance_area
const complianceColumnIndex = $('#table-compliance thead th').filter('.editableCompliance_area').index();

// Handle compliance checkbox filter
$(document).on('change', '.filter-compliance', function () {
  const terms = $('.filter-compliance:checked').map(function () {
    return `^${$(this).val()}$`;
  }).get();
  table.column(complianceColumnIndex).search(terms.join('|'), true, false).draw();
});

// Select All / Deselect All
$(document).on('click', '.select-all-compliance', () => {
  $('.filter-compliance').prop('checked', true).trigger('change');
});
$(document).on('click', '.deselect-all-compliance', () => {
  $('.filter-compliance').prop('checked', false).trigger('change');
  table.column(complianceColumnIndex).search('', true, false).draw();
});



// ==========================
// Close Button for Both Popovers
// ==========================
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn-close')) {
    bootstrap.Popover.getInstance(popoverTriggerTh)?.hide();
    bootstrap.Popover.getInstance(statusPopoverTrigger)?.hide();
       bootstrap.Popover.getInstance(compliancePopoverTrigger)?.hide();
  }
});



    }

 
// Regulation column only
$(document).on("click", "td.editableRegulations", function() {
    const $cell = $(this);
    const table = $('#table-compliance').DataTable();

    // Prevent editing if a select is already present
    if ($cell.find('select').length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const colIndex = $cell.index();
    const currentText = $cell.text().trim();
    
    // IMPORTANT: Extract current values BEFORE emptying the cell
    const currentBadges = $cell.find(".badge").map(function() {
        return $(this).text().trim();
    }).get();
    
    console.log("currentBadges", currentBadges);
    
    const allRegulations = ["GDPR", "CCPA", "HIPAA", "ISO 27701", "GRI 101", "GRI 102", "GRI 103"];
    const $select = $('<select class="editor-select2" style="width:100%;" multiple></select>');

    // Append options
    allRegulations.forEach(option => {
        $select.append(`<option value="${option}">${option}</option>`);
    });

    // Replace cell content with select
    $cell.empty().append($select);

    // Parse current value to array format
    let currentValues = [];
    if (currentBadges.length > 0) {
        // Use extracted badge values
        currentValues = currentBadges;
    } else if (Array.isArray(currentText)) {
        currentValues = currentText;
    } else if (typeof currentText === 'string' && currentText.trim() !== '' && currentText !== 'N/A') {
        // Try to match known regulations in the text
        currentValues = allRegulations.filter(reg => currentText.includes(reg));
        
        // If no matches, fall back to comma splitting
        if (currentValues.length === 0) {
            currentValues = currentText.split(',').map(v => v.trim()).filter(v => v !== '');
        }
    }
    
    console.log("currentValues", currentValues);

    // Initialize Select2
    $select.select2({
        placeholder: "Select Regulation(s)",
        tags: true,
        width: 'resolve',
        closeOnSelect: false
    }).val(currentValues).trigger('change');

    // Open immediately
    $select.select2("open");

    // On close, update value
    $select.on('select2:close', function () {
        const newVal = $select.val();
        const cellIndex = table.cell($cell).index();

        console.log("newVal", newVal);

        if (newVal && newVal.length > 0) {
            // Update DataTable cell value
            table.cell(cellIndex.row, cellIndex.column).data(newVal).draw(false);

            // Replace with badge HTML
            const badgeHTML = getRegulationBadges(newVal);
            $cell.html(badgeHTML);
        } else {
            table.cell(cellIndex.row, cellIndex.column).data(null).draw(false);
            $cell.html('<span class="text-muted">N/A</span>');
        }
    });
});


// Risk Level column only
$(document).on("click", "td.editableRisk_level", function() {
  const $cell = $(this);
    const table = $('#table-compliance').DataTable();

    // Prevent editing if a select is already present
    if ($cell.find('select').length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const colIndex = $cell.index();
    const currentText = $cell.text().trim();
    const risk_levelOptions = ["High", "Medium", "Low"];
    const $select = $('<select class="editor-select2" style="width:100%;"></select>');

  // Append options
  risk_levelOptions.forEach(option => {
    $select.append(`<option value="${option}">${option}</option>`);
  });

  // Replace cell content with select
  $cell.empty().append($select);

  // Initialize Select2
  $select.select2({
    placeholder: "Select Risk Level",
    width: 'resolve',
  }).val(currentText).trigger('change');

  // Open immediately
  $select.select2("open");

  // On close, update value
  $select.on('select2:close', function () {
    const newVal = $select.val();
    const cellIndex = table.cell($cell).index();

    console.log(newVal)

    if (newVal) {
      // Update DataTable cell value
      table.cell(cellIndex.row, cellIndex.column).data(newVal).draw(false);

      // Replace with badge HTML
      const badgeHTML = getRiskLevelBadge(newVal);
      $cell.html(badgeHTML);
    } else {
      $cell.text("N/A");
    }
  });
});



// Control Type column only
$(document).on("click", "td.editableControl_type", function() {
    const $cell = $(this);
    const table = $('#table-compliance').DataTable();

    // Prevent editing if a select is already present
    if ($cell.find('select').length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const colIndex = $cell.index();
    const currentText = $cell.text().trim();

 const control_typeOptions = ["Preventive", "Detective", "Corrective"];
  const $select = $('<select class="editor-select2" style="width:100%;"></select>');

  // Append options
  control_typeOptions.forEach(option => {
    $select.append(`<option value="${option}">${option}</option>`);
  });

  // Replace cell content with select
  $cell.empty().append($select);

  // Initialize Select2
  $select.select2({
    placeholder: "Select Control Type",
    width: 'resolve',
  }).val(currentText).trigger('change');

  // Open immediately
  $select.select2("open");

  // On close, update value
  $select.on('select2:close', function () {
    const newVal = $select.val();
    const cellIndex = table.cell($cell).index();

    console.log(newVal)

    if (newVal) {
      // Update DataTable cell value
      table.cell(cellIndex.row, cellIndex.column).data(newVal).draw(false);

      // Replace with badge HTML
      const badgeHTML = getControlTypeBadge(newVal);
      $cell.html(badgeHTML);
    } else {
      $cell.text("N/A");
    }
  });
});


// Implementation Status column only
$(document).on("click", "td.editableImplementation_status", function() {
    const $cell = $(this);
    const table = $('#table-compliance').DataTable();

    // Prevent editing if a select is already present
    if ($cell.find('select').length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const colIndex = $cell.index();
    const currentText = $cell.text().trim();

 const implement_statusOptions = ["Planned", "In Progress", "Implemented"];
  const $select = $('<select class="editor-select2" style="width:100%;"></select>');

  // Append options
  implement_statusOptions.forEach(option => {
    $select.append(`<option value="${option}">${option}</option>`);
  });

  // Replace cell content with select
  $cell.empty().append($select);

  // Initialize Select2
  $select.select2({
    placeholder: "Select Implementation Status",
    width: 'resolve',
  }).val(currentText).trigger('change');

  // Open immediately
  $select.select2("open");

  // On close, update value
  $select.on('select2:close', function () {
    const newVal = $select.val();
    const cellIndex = table.cell($cell).index();

    console.log(newVal)

    if (newVal) {
      // Update DataTable cell value
      table.cell(cellIndex.row, cellIndex.column).data(newVal).draw(false);

      // Replace with badge HTML
      const badgeHTML = getImplementationStatusBadge(newVal);
      $cell.html(badgeHTML);
    } else {
      $cell.text("N/A");
    }
  });
});

// Date
$(document).on("click", "td.editableLast_assessment_date, td.editableNext_review_date, td.editableLast_audit_date, td.editableAction_due_date", function() {

   const $cell = $(this);
    const table = $('#table-compliance').DataTable();

    // Prevent editing if a select is already present
    if ($cell.find('select').length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const colIndex = $cell.index();
    const currentText = $cell.text().trim();

    const parsedDate = currentText ? parseCustomDate(currentText) : null;
 
    console.log(parsedDate)

    // Create readonly input (prevent manual typing)
    const $input = $('<input type="text" readonly class="form-control form-control-sm" style="min-width:150px;" />');
    $cell.empty().append($input);

    // Init flatpickr
    $input.flatpickr({
        dateFormat: "Y-m-d", // internal format
        defaultDate: parsedDate,
        allowInput: true,
        onClose: function (selectedDates) {
            if (selectedDates.length) {
                const formatted = formatToCustomDate(selectedDates[0]); // Sep15, 2025
                $cell.text(formatted);
            } else {
                // No selection, restore original
                $cell.text(currentText);
            }
        }
    });
    // Auto open calendar
    setTimeout(() => {
        $input.focus();
        $input[0]._flatpickr.open();
    }, 0);
     // Format: Date → "Sep15, 2025"
    function formatToCustomDate(date) {
        const shortMonth = date.toLocaleString("en-US", { month: "short" }); // Sep
        const day = date.getDate(); // 15
        const year = date.getFullYear(); // 2025
        return `${shortMonth}${day}, ${year}`;
    }
    function parseCustomDate(str) {
    str = str.trim();

    // Match format: Sep15, 2025 or Sep 15, 2025
    const customMatch = str.match(/^([A-Za-z]{3})\s*(\d{1,2}),\s*(\d{4})$/);
    if (customMatch) {
        const [, mon, day, year] = customMatch;
        const monthIndex = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(mon);
        if (monthIndex !== -1) {
            return new Date(parseInt(year), monthIndex, parseInt(day));
        }
    }

    // Match format: 2024-01-20 (ISO)
    const isoMatch = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (isoMatch) {
        const [, year, month, day] = isoMatch;
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }

    console.warn("Unmatched date format:", str);
    return null;
  }


});

// Status column only
$(document).on("click", "td.editableStatus", function() {
    const $cell = $(this);
    const table = $('#table-compliance').DataTable();

    // Prevent editing if a select is already present
    if ($cell.find('select').length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const colIndex = $cell.index();
    const currentText = $cell.text().trim();


 const statusOptions = ["Not Started", "Pending", "Ongoing","Effective"];
  const $select = $('<select class="editor-select2" style="width:100%;"></select>');

  // Append options
  statusOptions.forEach(option => {
    $select.append(`<option value="${option}">${option}</option>`);
  });

  // Replace cell content with select
  $cell.empty().append($select);

  // Initialize Select2
  $select.select2({
    placeholder: "Select Status",
    width: 'resolve',
  }).val(currentText).trigger('change');

  // Open immediately
  $select.select2("open");

  // On close, update value
  $select.on('select2:close', function () {
    const newVal = $select.val();
    const cellIndex = table.cell($cell).index();

    console.log(newVal)

    if (newVal) {
      // Update DataTable cell value
      table.cell(cellIndex.row, cellIndex.column).data(newVal).draw(false);

      // Replace with badge HTML
      const badgeHTML = getStatusBadge(newVal);
      $cell.html(badgeHTML);
    } else {
      $cell.text("N/A");
    }
  });
});


// Audit Required column only
$(document).on("click", "td.editableAudit_required", function() {
    const $cell = $(this);
    const table = $('#table-compliance').DataTable();

    // Prevent editing if a select is already present
    if ($cell.find('select').length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const colIndex = $cell.index();
    const currentText = $cell.text().trim();


 const audit_requiredOptions = ["Yes", "No"];
  const $select = $('<select class="editor-select2" style="width:100%;"></select>');

  // Append options
  audit_requiredOptions.forEach(option => {
    $select.append(`<option value="${option}">${option}</option>`);
  });

  // Replace cell content with select
  $cell.empty().append($select);

  // Initialize Select2
  $select.select2({
    placeholder: "Select Status",
    width: 'resolve',
  }).val(currentText).trigger('change');

  // Open immediately
  $select.select2("open");

  // On close, update value
  $select.on('select2:close', function () {
    const newVal = $select.val();
    const cellIndex = table.cell($cell).index();

    console.log(newVal)

    if (newVal) {
      // Update DataTable cell value
      table.cell(cellIndex.row, cellIndex.column).data(newVal).draw(false);

      // Replace with badge HTML
      const badgeHTML = getAuditRequiredBadge(newVal);
      $cell.html(badgeHTML);
    } else {
      $cell.text("N/A");
    }
  });
});

// Notes column only

$(document).on("click", "td.editableControl_description, td.editableNotes", function() {
    const $cell = $(this);
    const table = $('#table-compliance').DataTable();

    // Prevent editing if a select is already present
    if ($cell.find('select').length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const colIndex = $cell.index();
    const currentText = $cell.text().trim();


  const editor = $('<textarea class="form-control form-control-sm text-center" rows="2"></textarea>');
  editor.val(currentText);
  $cell.empty().append(editor);
  editor.focus().select();
  editor.on("blur change", function () {
    const newVal = editor.val().trim();
    $cell.html(`<div class="notswrap" style="min-width:250px">${newVal}</div>`);
  });
});


$(document).on("click", "td.editableAudit_findings,td.editableCorrective_actions", function() {
    const $cell = $(this);
    const table = $('#table-compliance').DataTable();

    // Prevent editing if a select is already present
    if ($cell.find('select').length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const colIndex = $cell.index();
    const currentText = $cell.text().trim();
  const editor = $('<input type="text" class="form-control form-control-sm text-center">');
  editor.val(currentText);
  $cell.empty().append(editor);
  editor.focus().select();
  editor.on("blur change", function () {
    const newVal = editor.val().trim();
    $cell.html(`${newVal}`);
  });
})

 

$(`#table-compliance`).on('click', '.toggle-group', function () {
  const groupName = $(this).closest('tr').data('group');
  collapsedGroups[groupName] = !collapsedGroups[groupName];

  const table = $(`#table-compliance`).DataTable();
  table.rows().every(function () {
    const rowData = this.data();
    const rowNode = this.node();
    if (rowData.compliance_area === groupName) {
      if (collapsedGroups[groupName]) {
        $(rowNode).hide();
      } else {
        $(rowNode).show();
      }
    }
  });

  // Update icon
  const $icon = $(this).find('.group-toggle-icon');
  $icon.html(collapsedGroups[groupName] ? '<i class="fas fa-plus toggle-icon"></i>' : '<i class="fas fa-minus toggle-icon"></i>');
});

$(document).on('click', '.load-more-link', function (e) {
  e.preventDefault();
  const group = $(this).data('group');
  collapsedGroups[group] = (collapsedGroups[group] || 10) + 10;
  $('#table-compliance').DataTable().draw(false);
});



});


function getRegulationBadges(regulations) {
    // Ensure regulations is an array
    if (!Array.isArray(regulations)) {
        // Handle different data types
        if (typeof regulations === 'string') {
            regulations = regulations.split(',').map(r => r.trim());
        } else if (regulations == null || regulations === '') {
            return '<span class="text-muted">N/A</span>';
        } else {
            regulations = [];
        }
    }
    
    // Filter out empty values
    regulations = regulations.filter(reg => reg && reg.trim() !== '');
    
    if (regulations.length === 0) {
        return '<span class="text-muted">N/A</span>';
    }
    
    // Define color classes to cycle through for badges
    const colorClasses = ['label-bg-blue', 'label-bg-orange'];
    
    // Generate badge HTML for each regulation
    const badgesHTML = regulations.map((regulation, index) => {
        const colorClass = colorClasses[index % colorClasses.length];
        return `<span class="badge ${colorClass} rounded-pill">${regulation}</span>`;
    }).join(' '); // Add space between badges
    
    // Wrap badges in flex container
    return `<div class="d-flex gap-1 flex-wrap">${badgesHTML}</div>`;
}

function renderRegulationBadges(data) {
    return getRegulationBadges(data);
}




// risk_levelOptions
function getRiskLevelBadge(level) {
  const colorMap = {
    High: 'label-bg-red',
    Medium: 'label-bg-yellow',
    Low: 'label-bg-green'
  };
  const badgeClass = colorMap[level] || 'label-bg-secondary';
  return `<span class="badge ${badgeClass} rounded-pill dropdown-toggle ms-auto">${level || 'N/A'}</span>`;
}
// getControlTypeBadge
function getControlTypeBadge(control_type) {
  const control_typeMap = {
    "Preventive": "label-bg-red",
    "Detective": "label-bg-yellow",
    "Corrective": "label-bg-green",
  };
  const badgeControlTypeClass = control_typeMap[control_type] || "label-bg-gray";
  return `<span class="badge ${badgeControlTypeClass} rounded-pill dropdown-toggle ms-auto">${control_type || 'N/A'}</span>`;
}
// getImplementationStatusBadger
function getImplementationStatusBadge(implement_status) {
  const implement_statusMap = {
    "Planned": "label-bg-red",
    "In Progress": "label-bg-yellow",
    "Implemented": "label-bg-green",
  };
  const badgeImplementStatusClass = implement_statusMap[implement_status] || "label-bg-gray";
  return `<span class="badge ${badgeImplementStatusClass} rounded-pill dropdown-toggle ms-auto">${implement_status || 'N/A'}</span>`;
}

// getStatusBadge
function getStatusBadge(status) {
  const statusMap = {
    "Not Started": "status-bg-red",
    "Pending": "status-bg-yellow",
    "Ongoing": "status-bg-blue",
    "Effective": "status-bg-green",    
  };
  const badgeStatusClass = statusMap[status] || "label-bg-gray";
  return `<span class="badge ${badgeStatusClass} rounded-pill dropdown-toggle ms-auto">${status || 'N/A'}</span>`;
}

// getAuditRequiredBadge
function getAuditRequiredBadge(audit_required) {
  const auditRequiredMap = {
   "Yes": "status-bg-green",
    "No": "status-bg-red",
  };
  const badgeAuditRequiredClass = auditRequiredMap[audit_required] || "label-bg-gray";
  return `<span class="badge ${badgeAuditRequiredClass} rounded-pill dropdown-toggle ms-auto">${audit_required || 'N/A'}</span>`;
}

// getActionsMenu
 function getActionsMenu() {
         return `         
                <div class="table-actions justify-content-end">
                 <button class="btn btn-sm btn-primary px-2" type="button">
                       Save
                    <i class="fas fa-save"></i>
                    </button>
                <div class="dropdown">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                    </button>
                    <ul class="dropdown-menu border-0 shadow">                      
                        <li><a class="dropdown-item" href="#task-add-modal" data-bs-toggle="modal">Edit</a></li>                        
                        <li><a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal">Delete</a></li>
                    </ul>
                </div>
            </div></div>`;
    }


   