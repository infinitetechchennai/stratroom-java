$(document).ready(function () {
  var table;

  if (!$.fn.DataTable.isDataTable('#table-compliance')) {
    table = $('#table-compliance').DataTable({
      paging: false,
      lengthChange: false,
      ordering: false,
      info: false,
      initComplete: function () {
        $('#table-compliance thead th').css({
          'padding-top': '0',
          'padding-bottom': '0',
          'border': 'none',
          'height': '0'
        }).wrapInner('<div style="height: 0px; overflow: hidden;"></div>');
      },
      responsive: {
        details: {
          renderer: function (api, rowIdx, columns) {
            const data = $.map(columns, function (col) {
              if (!col.hidden) {
                return '';
              }
              const columnClass = api.settings()[0].aoColumns[col.columnIndex].className || '';
              let cellContent = col.data || '';

              return `
                <li data-row="${rowIdx}" data-column="${col.columnIndex}">
                  <div class="dtr-data ${columnClass} w-100">
                    ${cellContent}
                  </div>
                </li>
              `;
            }).join('');
            return data ? $('<ul class="dtr-details m-0" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem; list-style: none;"/>').append(data) : false;
          }
        }
      },
      processing: true,
      deferRender: true,
      language: {
        paginate: {
          previous: "<i class='fas fa-arrow-left'></i>",
          next: "<i class='fas fa-arrow-right'></i>"
        }
      },
      ajax: {
        url: "compliance.json",
        method: "GET",
        dataType: "json",
        dataSrc: function (json) {
          console.log("Fetched Data:", json);
          const data = json[0]?.tab[0]?.tabledata || [];
          console.log("Table Data:", data);
          return data;
        },
      },
      columns: [
        {
          data: 'control_id',
          title: 'Control ID',
          className: 'editableControl_id',
          responsivePriority: 1,
          render: function (data) {
            return `<div class="d-flex flex-column align-items-start">
              <span class="mobile-label">Control ID</span>
              <div class="editableControl_id" data-field="control_id">
                <span class="badge label-bg-dark rounded-pill">${data || ''}</span>
              </div>
            </div>`;
          }
        },
        {
          data: 'control_description',
          title: 'Control Description',
          className: 'editableControl_description text-start',
          render: function (data) {
            return `<div class="d-flex flex-column align-items-start">
              <span class="mobile-label">Control Description</span>
              <div class="editableControl_description" data-field="control_description">${data || "N/A"}</div>
            </div>`;
          }
        },
        {
          data: 'compliance_area',
          title: 'Compliance Area',
          className: 'editableCompliance_area text-center',
          render: function (data) {
            return `<div class="d-flex flex-column align-items-start">
              <span class="mobile-label">Compliance Area</span>
              <div class="editableCompliance_area" data-field="compliance_area">${data || "N/A"}</div>
            </div>`;
          }
        },
        {
          data: 'regulation',
          title: 'Regulation/Standard',
          className: 'editableRegulations',
          render: function (data) {
            return `<div class="d-flex flex-column align-items-start">
              <span class="mobile-label">Regulation/Standard</span>
              <div class="editableRegulations" data-field="regulation">${getRegulationBadges(data)}</div>
            </div>`;
          }
        },
        {
          data: 'owner',
          title: 'Owner',
          orderable: false,
          render: function (data) {
            let content = 'N/A';
            if (Array.isArray(data) && data.length > 0) {
              const maxVisible = 2;
              const visibleOwners = data.slice(0, maxVisible);
              const remainingCount = data.length - maxVisible;
              const avatars = visibleOwners.map(o => `
                <li class="avatar avatar-xs pull-up" title="${o.name}">
                  <img src="assets/images/user/${o.image}" class="rounded-circle" width="24" height="24" alt="${o.name}">
                </li>`).join("");
              const moreAvatar = remainingCount > 0 ? `
                <li class="avatar avatar-xs pull-up">
                  <span class="avatar-initial rounded-circle">+${remainingCount}</span>
                </li>` : "";
              content = `<ul class="list-unstyled d-flex align-items-center justify-content-center avatar-group mb-0">${avatars}${moreAvatar}</ul>`;
            }
            return `<div class="d-flex flex-column align-items-start">
              <span class="mobile-label">Owner</span>
              ${content}
            </div>`;
          }
        },
        {
          data: 'risk_level',
          title: 'Risk Level',
          className: 'editableRisk_level',
          render: function (data) {
            return `<div class="d-flex flex-column align-items-start">
              <span class="mobile-label">Risk Level</span>
              <div class="editableRisk_level" data-field="risk_level">${getRiskLevelBadge(data)}</div>
            </div>`;
          }
        },
        {
          data: 'control_type',
          title: 'Control Type',
          className: 'editableControl_type',
          defaultContent: 'N/A',
          render: function (data) {
            return `<div class="d-flex flex-column align-items-start">
              <span class="mobile-label">Control Type</span>
              <div class="editableControl_type" data-field="control_type">${getControlTypeBadge(data)}</div>
            </div>`;
          }
        },
        {
          data: 'implementation_status',
          title: 'Implementation Status',
          className: 'editableImplementation_status',
          defaultContent: 'N/A',
          render: function (data) {
            return `<div class="d-flex flex-column align-items-start">
              <span class="mobile-label">Implementation Status</span>
              <div class="editableImplementation_status" data-field="implementation_status">${getImplementationStatusBadge(data)}</div>
            </div>`;
          }
        },
        {
          data: 'last_assessment_date',
          title: 'Last Assessment Date',
          className: 'editableLast_assessment_date',
          defaultContent: 'N/A',
          render: function (data) {
            return `<div class="d-flex flex-column align-items-start">
              <span class="mobile-label">Last Assessment Date</span>
              <div class="editableLast_assessment_date" data-field="last_assessment_date">${data || "N/A"}</div>
            </div>`;
          }
        },
        {
          data: 'next_review_date',
          title: 'Next Review Date',
          className: 'editableNext_review_date',
          defaultContent: 'N/A',
          render: function (data) {
            return `<div class="d-flex flex-column align-items-start">
              <span class="mobile-label">Next Review Date</span>
              <div class="editableNext_review_date" data-field="next_review_date">${data || "N/A"}</div>
            </div>`;
          }
        },
        {
          data: 'status',
          title: 'Status',
          className: 'editableStatus',
          defaultContent: 'N/A',
          render: function (data) {
            return `<div class="d-flex flex-column align-items-start">
              <span class="mobile-label">Status</span>
              <div class="editableStatus" data-field="status">${getStatusBadge(data)}</div>
            </div>`;
          }
        },
        {
          data: 'audit_required',
          title: 'Audit Required',
          className: 'editableAudit_required',
          defaultContent: 'N/A',
          render: function (data) {
            return `<div class="d-flex flex-column align-items-start">
              <span class="mobile-label">Audit Required</span>
              <div class="editableAudit_required" data-field="audit_required">${getAuditRequiredBadge(data)}</div>
            </div>`;
          }
        },
        {
          data: 'last_audit_date',
          title: 'Last Audit Date',
          className: 'editableLast_audit_date',
          defaultContent: 'N/A',
          render: function (data) {
            return `<div class="d-flex flex-column align-items-start">
              <span class="mobile-label">Last Audit Date</span>
              <div class="editableLast_audit_date" data-field="last_audit_date">${data || "N/A"}</div>
            </div>`;
          }
        },
        {
          data: 'audit_findings',
          title: 'Audit Findings',
          className: 'editableAudit_findings',
          defaultContent: 'N/A',
          render: function (data) {
            return `<div class="d-flex flex-column align-items-start">
              <span class="mobile-label">Audit Findings</span>
              <div class="editableAudit_findings" data-field="audit_findings">${data || "N/A"}</div>
            </div>`;
          }
        },
        {
          data: 'corrective_actions',
          title: 'Corrective Actions',
          className: 'editableCorrective_actions',
          defaultContent: 'N/A',
          render: function (data) {
            return `<div class="d-flex flex-column align-items-start">
              <span class="mobile-label">Corrective Actions</span>
              <div class="editableCorrective_actions" data-field="corrective_actions">${data || "N/A"}</div>
            </div>`;
          }
        },
        {
          data: 'action_due_date',
          title: 'Action Due Date',
          className: 'editableAction_due_date',
          defaultContent: 'N/A',
          render: function (data) {
            return `<div class="d-flex flex-column align-items-start">
              <span class="mobile-label">Action Due Date</span>
              <div class="editableAction_due_date" data-field="action_due_date">${data || "N/A"}</div>
            </div>`;
          }
        },
        {
          data: 'responsible_person',
          title: 'Responsible',
          orderable: false,
          render: function (data) {
            let content = 'N/A';
            if (Array.isArray(data) && data.length > 0) {
              const maxVisible = 2;
              const visibleList = data.slice(0, maxVisible);
              const remainingCount = data.length - maxVisible;
              const avatars = visibleList.map(p => `
                <li class="avatar avatar-xs pull-up" title="${p.name}">
                  <img src="assets/images/user/${p.image}" class="rounded-circle" width="24" height="24" alt="${p.name}">
                </li>`).join("");
              const moreAvatar = remainingCount > 0 ? `
                <li class="avatar avatar-xs pull-up">
                  <span class="avatar-initial rounded-circle">+${remainingCount}</span>
                </li>` : "";
              content = `<ul class="list-unstyled d-flex align-items-center justify-content-center avatar-group mb-0">${avatars}${moreAvatar}</ul>`;
            }
            return `<div class="d-flex flex-column align-items-start">
              <span class="mobile-label">Responsible</span>
              ${content}
            </div>`;
          }
        },
        {
          data: 'evidence_file_reference',
          title: 'Evidence File Reference',
          defaultContent: 'N/A',
          orderable: false,
          render: function (data) {
            let content = 'N/A';
            if (data) {
              content = `<a href="${data}" download class="btn btn-sm btn-icon text-decoration-none">
                <i class="fas fa-file-pdf text-danger"></i>
              </a>`;
            }
            return `<div class="d-flex flex-column align-items-start">
              <span class="mobile-label">Evidence File Reference</span>
              ${content}
            </div>`;
          }
        },
        {
          data: 'notes',
          title: 'Notes',
          className: 'editableNotes',
          defaultContent: 'N/A',
          render: function (data) {
            return `<div class="d-flex flex-column align-items-start">
              <span class="mobile-label">Notes</span>
              <div class="editableNotes" data-field="notes">${data || "N/A"}</div>
            </div>`;
          }
        },
        {
          data: null,
          title: 'Actions',
          orderable: false,
          responsivePriority: 2,
          render: function () {
            return `<div class="d-flex flex-column align-items-start">
              ${getActionsMenu()}
            </div>`;
          }
        }
      ],
      order: [[2, 'asc']]
    });

    // ========== HELPER: Get the actual editable div that contains the content ==========
    function getActualEditableDiv($clickedElement) {
      // If clicked element is the editable div itself
      if ($clickedElement.hasClass('editableRegulations') ||
        $clickedElement.hasClass('editableRisk_level') ||
        $clickedElement.hasClass('editableControl_type') ||
        $clickedElement.hasClass('editableImplementation_status') ||
        $clickedElement.hasClass('editableStatus') ||
        $clickedElement.hasClass('editableAudit_required') ||
        $clickedElement.hasClass('editableCompliance_area') ||
        $clickedElement.hasClass('editableControl_description') ||
        $clickedElement.hasClass('editableNotes') ||
        $clickedElement.hasClass('editableAudit_findings') ||
        $clickedElement.hasClass('editableCorrective_actions') ||
        $clickedElement.hasClass('editableLast_assessment_date') ||
        $clickedElement.hasClass('editableNext_review_date') ||
        $clickedElement.hasClass('editableLast_audit_date') ||
        $clickedElement.hasClass('editableAction_due_date')) {
        return $clickedElement;
      }

      // Otherwise find the closest parent div with an editable class
      return $clickedElement.closest('div[class*="editable"]');
    }

    // ========== HELPER: Get original table cell from responsive click ==========
    function getOriginalTableCell($clickedElement, tableInstance) {
      // Check if we're in responsive child row
      const $li = $clickedElement.closest('li[data-row]');
      if ($li.length) {
        const rowIdx = parseInt($li.attr('data-row'));
        const columnIdx = parseInt($li.attr('data-column'));
        const cell = tableInstance.cell(rowIdx, columnIdx);
        if (cell && cell.node()) {
          return $(cell.node());
        }
      }

      // Otherwise try direct parent td
      const $td = $clickedElement.closest('td');
      if ($td.length) {
        return $td;
      }

      return null;
    }

    // ========== HELPER: Update both main cell and responsive view ==========
    function updateBothViews($originalCell, $editableDiv, newDisplayHtml, newPlainValue, tableInstance) {
      // Get cell indices
      const cellIndex = tableInstance.cell($originalCell).index();
      if (!cellIndex) return;

      // Update DataTable data
      tableInstance.cell(cellIndex.row, cellIndex.column).data(newPlainValue).draw(false);

      // Update the main table cell's editable div
      const $mainEditable = $originalCell.find('div[class*="editable"]');
      if ($mainEditable.length) {
        $mainEditable.html(newDisplayHtml);
      }

      // Update the responsive child row
      const $parentRow = $originalCell.closest('tr');
      const $childRow = $parentRow.next('.child');
      if ($childRow.length) {
        const $targetLi = $childRow.find(`li[data-row="${cellIndex.row}"][data-column="${cellIndex.column}"]`);
        if ($targetLi.length) {
          const $targetDtrData = $targetLi.find('.dtr-data');
          if ($targetDtrData.length) {
            // Find the inner editable div and update it
            const $innerEditable = $targetDtrData.find('div[class*="editable"]');
            if ($innerEditable.length) {
              $innerEditable.html(newDisplayHtml);
            } else {
              $targetDtrData.html(newDisplayHtml);
            }
          }
        }
      }

      // Visual feedback
      $editableDiv.css('background-color', '#d4edda');
      setTimeout(() => {
        $editableDiv.css('background-color', '');
      }, 300);

      console.log(`Updated: Row ${cellIndex.row}, Col ${cellIndex.column} to:`, newPlainValue);
    }

    // ========== REGULATION EDITOR (Multi-select) ==========
    $(document).on("click", ".editableRegulations", function (e) {
      e.stopPropagation();

      const $editableDiv = getActualEditableDiv($(this));
      if (!$editableDiv.length || $editableDiv.find('select').length > 0) return;

      const tableInstance = $('#table-compliance').DataTable();
      const $originalCell = getOriginalTableCell($editableDiv, tableInstance);
      if (!$originalCell) return;

      // Get current values from badges
      const currentBadges = $editableDiv.find(".badge").map(function () {
        return $(this).text().trim();
      }).get();

      const allRegulations = ["GDPR", "CCPA", "HIPAA", "ISO 27701", "GRI 101", "GRI 102", "GRI 103"];
      const $select = $('<select class="editor-select2" style="width:100%;" multiple></select>');

      allRegulations.forEach(option => {
        $select.append(`<option value="${option}">${option}</option>`);
      });

      $editableDiv.empty().append($select);

      $select.select2({
        placeholder: "Select Regulation(s)",
        tags: true,
        width: '100%',
        closeOnSelect: false
      }).val(currentBadges).trigger('change');

      $select.select2("open");

      $select.on('select2:close', function () {
        const newVal = $select.val();
        let newHtml, newPlain;

        if (newVal && newVal.length > 0) {
          newHtml = getRegulationBadges(newVal);
          newPlain = newVal;
          updateBothViews($originalCell, $editableDiv, newHtml, newPlain, tableInstance);
        } else {
          newHtml = '<span class="text-muted">N/A</span>';
          newPlain = null;
          updateBothViews($originalCell, $editableDiv, newHtml, newPlain, tableInstance);
        }

        $select.select2('destroy');
        $select.remove();
      });
    });

    // ========== SINGLE SELECT EDITORS ==========
    $(document).on("click", ".editableRisk_level, .editableControl_type, .editableImplementation_status, .editableStatus, .editableAudit_required, .editableCompliance_area", function (e) {
      e.stopPropagation();

      const $editableDiv = getActualEditableDiv($(this));
      if (!$editableDiv.length || $editableDiv.find('select').length > 0) return;

      const tableInstance = $('#table-compliance').DataTable();
      const $originalCell = getOriginalTableCell($editableDiv, tableInstance);
      if (!$originalCell) return;

      // Get current value (strip badge HTML)
      let currentText = $editableDiv.text().trim();
      if (currentText === 'N/A') currentText = '';

      let options = [];
      let getBadgeFunction = null;

      if ($editableDiv.hasClass('editableRisk_level')) {
        options = ["High", "Medium", "Low"];
        getBadgeFunction = getRiskLevelBadge;
      } else if ($editableDiv.hasClass('editableControl_type')) {
        options = ["Preventive", "Detective", "Corrective"];
        getBadgeFunction = getControlTypeBadge;
      } else if ($editableDiv.hasClass('editableImplementation_status')) {
        options = ["Planned", "In Progress", "Implemented"];
        getBadgeFunction = getImplementationStatusBadge;
      } else if ($editableDiv.hasClass('editableStatus')) {
        options = ["Not Started", "Pending", "Ongoing", "Effective"];
        getBadgeFunction = getStatusBadge;
      } else if ($editableDiv.hasClass('editableAudit_required')) {
        options = ["Yes", "No"];
        getBadgeFunction = getAuditRequiredBadge;
      } else if ($editableDiv.hasClass('editableCompliance_area')) {
        options = ["ESG", "GDPR", "SOX", "COBIT", "CSCRF", "HIPAA", "PCI DSS"];
        getBadgeFunction = null;
      }

      const $select = $('<select class="editor-select2" style="width:100%;"></select>');
      options.forEach(option => {
        $select.append(`<option value="${option}">${option}</option>`);
      });

      $editableDiv.empty().append($select);

      $select.select2({
        placeholder: "Select Option",
        width: '100%'
      }).val(currentText).trigger('change');

      $select.select2("open");

      $select.on('select2:close', function () {
        const newVal = $select.val();
        let newHtml, newPlain;

        if (newVal) {
          if (getBadgeFunction) {
            newHtml = getBadgeFunction(newVal);
          } else {
            newHtml = newVal;
          }
          newPlain = newVal;
          updateBothViews($originalCell, $editableDiv, newHtml, newPlain, tableInstance);
        } else {
          newHtml = '<span class="text-muted">N/A</span>';
          newPlain = null;
          updateBothViews($originalCell, $editableDiv, newHtml, newPlain, tableInstance);
        }

        $select.select2('destroy');
        $select.remove();
      });
    });

    // ========== TEXTAREA EDITORS ==========
    $(document).on("click", ".editableControl_description, .editableNotes", function (e) {
      e.stopPropagation();

      const $editableDiv = getActualEditableDiv($(this));
      if (!$editableDiv.length || $editableDiv.find('textarea').length > 0) return;

      const tableInstance = $('#table-compliance').DataTable();
      const $originalCell = getOriginalTableCell($editableDiv, tableInstance);
      if (!$originalCell) return;

      const currentText = $editableDiv.text().trim();
      const $textarea = $('<textarea class="form-control form-control-sm" rows="2"></textarea>');
      $textarea.val(currentText === 'N/A' ? '' : currentText);
      $editableDiv.empty().append($textarea);
      $textarea.focus().select();

      const saveHandler = function () {
        const newVal = $textarea.val().trim();
        const displayText = newVal || 'N/A';
        const newHtml = displayText;
        updateBothViews($originalCell, $editableDiv, newHtml, newVal || null, tableInstance);
        $textarea.remove();
      };

      $textarea.on('blur', saveHandler);
      $textarea.on('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          saveHandler();
        }
      });
    });

    // ========== INPUT EDITORS ==========
    $(document).on("click", ".editableAudit_findings, .editableCorrective_actions", function (e) {
      e.stopPropagation();

      const $editableDiv = getActualEditableDiv($(this));
      if (!$editableDiv.length || $editableDiv.find('input').length > 0) return;

      const tableInstance = $('#table-compliance').DataTable();
      const $originalCell = getOriginalTableCell($editableDiv, tableInstance);
      if (!$originalCell) return;

      const currentText = $editableDiv.text().trim();
      const $input = $('<input type="text" class="form-control form-control-sm">');
      $input.val(currentText === 'N/A' ? '' : currentText);
      $editableDiv.empty().append($input);
      $input.focus().select();

      const saveHandler = function () {
        const newVal = $input.val().trim();
        const displayText = newVal || 'N/A';
        updateBothViews($originalCell, $editableDiv, displayText, newVal || null, tableInstance);
        $input.remove();
      };

      $input.on('blur', saveHandler);
      $input.on('keypress', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          saveHandler();
        }
      });
    });

    // ========== DATE EDITORS ==========
    $(document).on("click", ".editableLast_assessment_date, .editableNext_review_date, .editableLast_audit_date, .editableAction_due_date", function (e) {
      e.stopPropagation();

      const $editableDiv = getActualEditableDiv($(this));
      if (!$editableDiv.length || $editableDiv.find('.flatpickr-input').length > 0) return;

      const tableInstance = $('#table-compliance').DataTable();
      const $originalCell = getOriginalTableCell($editableDiv, tableInstance);
      if (!$originalCell) return;

      const currentText = $editableDiv.text().trim();
      const parsedDate = (currentText && currentText !== 'N/A') ? parseCustomDate(currentText) : null;

      const $input = $('<input type="text" readonly class="form-control form-control-sm" style="min-width:150px;" />');
      $editableDiv.empty().append($input);

      $input.flatpickr({
        dateFormat: "Y-m-d",
        defaultDate: parsedDate,
        allowInput: true,
        onClose: function (selectedDates) {
          if (selectedDates && selectedDates.length > 0) {
            const isoDate = formatToISODate(selectedDates[0]);
            const displayDate = formatToCustomDate(selectedDates[0]);
            updateBothViews($originalCell, $editableDiv, displayDate, isoDate, tableInstance);
          } else {
            updateBothViews($originalCell, $editableDiv, 'N/A', null, tableInstance);
          }
          $input.remove();
        }
      });

      setTimeout(() => {
        $input.focus();
        if ($input[0]._flatpickr) {
          $input[0]._flatpickr.open();
        }
      }, 100);
    });
  }

  // ========== HELPER FUNCTIONS ==========
  function formatToCustomDate(date) {
    if (!date || isNaN(date.getTime())) return 'N/A';
    const shortMonth = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${shortMonth}${day}, ${year}`;
  }

  function formatToISODate(date) {
    if (!date || isNaN(date.getTime())) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function parseCustomDate(str) {
    if (!str || str === 'N/A') return null;
    str = str.trim();
    const customMatch = str.match(/^([A-Za-z]{3})\s*(\d{1,2}),\s*(\d{4})$/);
    if (customMatch) {
      const [, mon, day, year] = customMatch;
      const monthIndex = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(mon);
      if (monthIndex !== -1) {
        return new Date(parseInt(year), monthIndex, parseInt(day));
      }
    }
    const isoMatch = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (isoMatch) {
      const [, year, month, day] = isoMatch;
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    return null;
  }
});

// ========== BADGE RENDERING FUNCTIONS ==========
function getRegulationBadges(regulations) {
  if (!Array.isArray(regulations)) {
    if (typeof regulations === 'string') {
      regulations = regulations.split(',').map(r => r.trim());
    } else if (regulations == null || regulations === '') {
      return '<span class="text-muted">N/A</span>';
    } else {
      regulations = [];
    }
  }
  regulations = regulations.filter(reg => reg && reg.trim() !== '');
  if (regulations.length === 0) return '<span class="text-muted">N/A</span>';

  const colorClasses = ['label-bg-blue', 'label-bg-orange'];
  const badgesHTML = regulations.map((regulation, index) => {
    const colorClass = colorClasses[index % colorClasses.length];
    return `<span class="badge ${colorClass} rounded-pill">${escapeHtml(regulation)}</span>`;
  }).join(' ');
  return `<div class="d-flex gap-1 flex-wrap">${badgesHTML}</div>`;
}

function getRiskLevelBadge(level) {
  const colorMap = { High: 'label-bg-red', Medium: 'label-bg-yellow', Low: 'label-bg-green' };
  const badgeClass = colorMap[level] || 'label-bg-secondary';
  return `<span class="badge ${badgeClass} rounded-pill">${level || 'N/A'}</span>`;
}

function getControlTypeBadge(control_type) {
  const control_typeMap = { "Preventive": "label-bg-red", "Detective": "label-bg-yellow", "Corrective": "label-bg-green" };
  const badgeClass = control_typeMap[control_type] || "label-bg-gray";
  return `<span class="badge ${badgeClass} rounded-pill">${control_type || 'N/A'}</span>`;
}

function getImplementationStatusBadge(implement_status) {
  const implement_statusMap = { "Planned": "label-bg-red", "In Progress": "label-bg-yellow", "Implemented": "label-bg-green" };
  const badgeClass = implement_statusMap[implement_status] || "label-bg-gray";
  return `<span class="badge ${badgeClass} rounded-pill">${implement_status || 'N/A'}</span>`;
}

function getStatusBadge(status) {
  const statusMap = { "Not Started": "status-bg-red", "Pending": "status-bg-yellow", "Ongoing": "status-bg-blue", "Effective": "status-bg-green" };
  const badgeClass = statusMap[status] || "label-bg-gray";
  return `<span class="badge ${badgeClass} rounded-pill">${status || 'N/A'}</span>`;
}

function getAuditRequiredBadge(audit_required) {
  const auditRequiredMap = { "Yes": "status-bg-green", "No": "status-bg-red" };
  const badgeClass = auditRequiredMap[audit_required] || "label-bg-gray";
  return `<span class="badge ${badgeClass} rounded-pill">${audit_required || 'N/A'}</span>`;
}

function getActionsMenu() {
  return `<div class="table-actions justify-content-end">
    <button class="btn btn-sm btn-primary px-2" type="button">Save <i class="fas fa-save"></i></button>
    <div class="dropdown">
      <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg" alt="Menu">
      </button>
      <ul class="dropdown-menu border-0 shadow">
        <li><a class="dropdown-item" href="#task-add-modal" data-bs-toggle="modal">Edit</a></li>
        <li><a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal">Delete</a></li>
      </ul>
    </div>
  </div>`;
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}