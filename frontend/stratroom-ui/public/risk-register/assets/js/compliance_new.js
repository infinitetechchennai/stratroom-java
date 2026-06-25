$(document).ready(function () {
    var table;

    if (!$.fn.DataTable.isDataTable('#table-compliance')) {
        table = $('#table-compliance').DataTable({
            paging: false,
            lengthChange: false,
            ordering: false,
            info: false,
            autoWidth: false,
            initComplete: function () {
                // $('#table-compliance thead th').css({
                //     'padding-top': '0',
                //     'padding-bottom': '0',
                //     'padding-left': '0',
                //     'padding-right': '0',
                //     'border': 'none',
                //     'height': '0'
                // }).wrapInner('<div style="height: 0px; overflow: hidden;"></div>');

                // Apply initial filter based on the active tab
                var $activeTab = $('#complianceTabsHeader .nav-link.active');
                if ($activeTab.length) {
                    var initialArea = $activeTab.data('area');
                    if (initialArea) {
                        this.api().column(3).search('^' + initialArea + '$', true, false).draw();
                    }
                }
            },
            // scrollX: true,
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
                <li data-row="${rowIdx}" data-column="${col.columnIndex}" style="display:flex; flex-direction:column; ">
                  <span class="mobile-label" style="display:block;">${col.title}</span>
                  <div class="dtr-data ${columnClass} w-100">
                    ${cellContent}
                  </div>
                </li>
              `;
                        }).join('');
                        return data ? $('<ul class="dtr-details m-0" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); list-style: none;"/>').append(data) : false;
                    }
                }
            },
            processing: true,
            deferRender: true,
            drawCallback: function () {
                if (typeof feather !== 'undefined') {
                    feather.replace();
                }
            },
            language: {
                paginate: {
                    previous: "<i class='fas fa-arrow-left'></i>",
                    next: "<i class='fas fa-arrow-right'></i>"
                }
            },
            ajax: function (_data, callback) {
                if (window.ComplianceApiBridge && window.ComplianceApiBridge.enabled) {
                    window.ComplianceApiBridge.loadComplianceTableRows()
                        .then(function (rows) { callback({ data: rows }); })
                        .catch(function (err) {
                            console.error('Compliance API failed', err);
                            callback({ data: [] });
                        });
                    return;
                }
                $.getJSON('assets/json/compliance.json', function (json) {
                    var rows = (json && json[0] && json[0].tab && json[0].tab[0]) ? json[0].tab[0].tabledata : [];
                    callback({ data: rows || [] });
                }).fail(function () {
                    callback({ data: [] });
                });
            },
            columns: [
                {
                    data: null,
                    title: '<div class="form-check m-0 d-flex justify-content-center align-items-center"><input class="form-check-input" type="checkbox" id="selectAllCheckbox"></div>',
                    className: 'dtr-control text-center align-middle all position-relative',
                    orderable: false,
                    responsivePriority: 1,
                    width: '40px',
                    render: function () {
                        return `<div class="form-check m-0 d-flex justify-content-center align-items-center" style="padding-right: 15px;">
                                  <input class="form-check-input row-checkbox" type="checkbox" onclick="event.stopPropagation();">
                                </div>`;
                    }
                },
                {
                    data: 'control_id', title: 'Control ID', className: 'editableControl_id text-center align-middle all',
                    responsivePriority: 2,
                    render: function (data) {
                        return `<div data-field="control_id">
                <span class="badge label-bg-dark rounded-pill">${data || ''}</span>
              </div>`;
                    }
                },
                {
                    data: 'control_description', title: 'Control Description', className: 'editableControl_description align-middle all',
                    render: function (data) {
                        return `<div data-field="control_description">${data || "N/A"}</div>`;
                    }
                },
                {
                    data: 'compliance_area', title: 'Compliance Area', className: 'editableCompliance_area align-middle',
                    visible: false,
                    render: function (data, type) {
                        if (type === 'filter' || type === 'sort' || type === 'type') return data || '';
                        return `<div data-field="compliance_area">${data || "N/A"}</div>`;
                    }
                },
                {
                    data: 'regulation', title: 'Regulation/Standard', className: 'editableRegulations align-middle all',
                    render: function (data) {
                        return `<div data-field="regulation">${getRegulationBadges(data)}</div>`;
                    }
                },
                {
                    data: 'owner', title: 'Owner', className: 'text-center align-middle all', orderable: false,
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
                        return content;
                    }
                },
                {
                    data: 'risk_level', title: 'Risk Level', className: 'editableRisk_level text-center align-middle all',
                    render: function (data) {
                        return `<div data-field="risk_level">${getRiskLevelBadge(data)}</div>`;
                    }
                },
                {
                    data: 'control_type', title: 'Control Type', className: 'editableControl_type align-middle none',
                    defaultContent: 'N/A',
                    render: function (data) {
                        return `<div data-field="control_type">${getControlTypeBadge(data)}</div>`;
                    }
                },
                {
                    data: 'implementation_status', title: 'Implementation Status', className: 'editableImplementation_status align-middle none',
                    defaultContent: 'N/A',
                    render: function (data) {
                        return `<div data-field="implementation_status">${getImplementationStatusBadge(data)}</div>`;
                    }
                },
                {
                    data: 'last_assessment_date', title: 'Last Assessment Date', className: 'editableLast_assessment_date align-middle none',
                    defaultContent: 'N/A',
                    render: function (data) {
                        return `<div data-field="last_assessment_date">${data || "N/A"}</div>`;
                    }
                },
                {
                    data: 'next_review_date', title: 'Next Review Date', className: 'editableNext_review_date align-middle none',
                    defaultContent: 'N/A',
                    render: function (data) {
                        return `<div data-field="next_review_date">${data || "N/A"}</div>`;
                    }
                },
                {
                    data: 'status', title: 'Status', className: 'editableStatus align-middle none',
                    defaultContent: 'N/A',
                    render: function (data, type) {
                        if (type === 'filter' || type === 'sort' || type === 'type') return data || '';
                        return `<div data-field="status">${getStatusBadge(data)}</div>`;
                    }
                },
                {
                    data: 'audit_required', title: 'Audit Required', className: 'editableAudit_required align-middle none',
                    defaultContent: 'N/A',
                    render: function (data) {
                        return `<div data-field="audit_required">${getAuditRequiredBadge(data)}</div>`;
                    }
                },
                {
                    data: 'last_audit_date', title: 'Last Audit Date', className: 'editableLast_audit_date align-middle none',
                    defaultContent: 'N/A',
                    render: function (data) {
                        return `<div data-field="last_audit_date">${data || "N/A"}</div>`;
                    }
                },
                {
                    data: 'audit_findings', title: 'Audit Findings', className: 'editableAudit_findings align-middle none',
                    defaultContent: 'N/A',
                    render: function (data) {
                        return `<div data-field="audit_findings">${data || "N/A"}</div>`;
                    }
                },
                {
                    data: 'corrective_actions', title: 'Corrective Actions', className: 'editableCorrective_actions  align-middle none',
                    defaultContent: 'N/A',
                    render: function (data) {
                        return `<div data-field="corrective_actions">${data || "N/A"}</div>`;
                    }
                },
                {
                    data: 'action_due_date', title: 'Action Due Date', className: 'editableAction_due_date align-middle none',
                    defaultContent: 'N/A',
                    render: function (data) {
                        return `<div data-field="action_due_date">${data || "N/A"}</div>`;
                    }
                },
                {
                    data: 'responsible_person', title: 'Responsible', className: ' align-middle none', orderable: false,
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
                            content = `<ul class="list-unstyled d-flex align-items-center 
                            avatar-group mb-0">${avatars}${moreAvatar}</ul>`;
                        }
                        return content;
                    }
                },
                {
                    data: 'evidence_file_reference', title: 'Evidence File Reference', className: 'align-middle none', defaultContent: 'N/A', orderable: false,
                    render: function (data) {
                        let content = 'N/A';
                        if (data) {
                            content = `<a href="${data}" download class="btn btn-sm btn-icon text-decoration-none">
                <i class="fas fa-file-pdf text-danger"></i>
              </a>`;
                        }
                        return content;
                    }
                },
                {
                    data: 'notes', title: 'Notes', className: 'editableNotes align-middle none',
                    defaultContent: 'N/A',
                    render: function (data) {
                        return `<div class="editableNotes" data-field="notes">${data || "N/A"}</div>`;
                    }
                },
                {
                    data: null, title: 'Actions', className: 'text-end align-middle all', orderable: false,
                    responsivePriority: 2,
                    render: function () {
                        return getActionsMenu();
                    }
                }
            ],
            order: [[3, 'asc']]
        });

        // ========== HELPER: Get original table cell from click target ==========
        function getOriginalTableCell($editableDiv, tableInstance) {
            // $editableDiv is the inner div with data-field attribute
            // Check if we're in responsive child row
            const $li = $editableDiv.closest('li[data-row]');
            if ($li.length) {
                const rowIdx = parseInt($li.attr('data-row'));
                const columnIdx = parseInt($li.attr('data-column'));
                const cell = tableInstance.cell(rowIdx, columnIdx);
                if (cell && cell.node()) {
                    return $(cell.node());
                }
            }

            // Otherwise find the parent td
            const $td = $editableDiv.closest('td');
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

            // Update the main table cell's inner editable div (direct)
            const $mainEditable = $originalCell.find('div[data-field]');
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
                        const $innerEditable = $targetDtrData.find('div[data-field]');
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
        $(document).on("click", "[data-field='regulation']", function (e) {
            e.stopPropagation();

            const $editableDiv = $(this);
            if ($editableDiv.find('select').length > 0) return;

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
        $(document).on("click", "[data-field='risk_level'], [data-field='control_type'], [data-field='implementation_status'], [data-field='status'], [data-field='audit_required'], [data-field='compliance_area']", function (e) {
            e.stopPropagation();

            const $editableDiv = $(this);
            if ($editableDiv.find('select').length > 0) return;

            const tableInstance = $('#table-compliance').DataTable();
            const $originalCell = getOriginalTableCell($editableDiv, tableInstance);
            if (!$originalCell) return;

            // Get current value (strip badge HTML)
            let currentText = $editableDiv.text().trim();
            if (currentText === 'N/A') currentText = '';

            let options = [];
            let getBadgeFunction = null;

            if ($editableDiv.attr('data-field') === 'risk_level') {
                options = ["High", "Medium", "Low"];
                getBadgeFunction = getRiskLevelBadge;
            } else if ($editableDiv.attr('data-field') === 'control_type') {
                options = ["Preventive", "Detective", "Corrective"];
                getBadgeFunction = getControlTypeBadge;
            } else if ($editableDiv.attr('data-field') === 'implementation_status') {
                options = ["Planned", "In Progress", "Implemented"];
                getBadgeFunction = getImplementationStatusBadge;
            } else if ($editableDiv.attr('data-field') === 'status') {
                options = ["Not Started", "Pending", "Ongoing", "Effective"];
                getBadgeFunction = getStatusBadge;
            } else if ($editableDiv.attr('data-field') === 'audit_required') {
                options = ["Yes", "No"];
                getBadgeFunction = getAuditRequiredBadge;
            } else if ($editableDiv.attr('data-field') === 'compliance_area') {
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
        $(document).on("click", "[data-field='control_description'], [data-field='notes']", function (e) {
            e.stopPropagation();

            const $editableDiv = $(this);
            if ($editableDiv.find('textarea').length > 0) return;

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
                updateBothViews($originalCell, $editableDiv, displayText, newVal || null, tableInstance);
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

        // ========== INPUT EDITORS (Audit Findings, Corrective Actions) ==========
        $(document).on("click", "[data-field='audit_findings'], [data-field='corrective_actions']", function (e) {
            e.stopPropagation();

            const $editableDiv = $(this);
            if ($editableDiv.find('input').length > 0) return;

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
        $(document).on("click", "[data-field='last_assessment_date'], [data-field='next_review_date'], [data-field='last_audit_date'], [data-field='action_due_date']", function (e) {
            e.stopPropagation();

            const $editableDiv = $(this);
            if ($editableDiv.find('.flatpickr-input').length > 0) return;

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

    // ========== TAB SWITCHING ==========
    // Apply initial filter for the default active tab (ESG)
    var $activeTab = $('#complianceTabsHeader .nav-link.active');
    if ($activeTab.length) {
        var initialArea = $activeTab.data('area');
        if (initialArea && $.fn.DataTable.isDataTable('#table-compliance')) {
            $('#table-compliance').DataTable().column(3).search('^' + initialArea + '$', true, false).draw();
        }
    }

    // Select All Checkbox logic
    $(document).on('change', '#selectAllCheckbox', function () {
        const isChecked = $(this).is(':checked');
        $('.row-checkbox').prop('checked', isChecked);
    });

    $(document).on('change', '.row-checkbox', function () {
        const total = $('.row-checkbox').length;
        const checked = $('.row-checkbox:checked').length;
        $('#selectAllCheckbox').prop('checked', total === checked);
        $('#selectAllCheckbox').prop('indeterminate', checked > 0 && checked < total);
    });

    // Filter table when a tab is clicked
    $('#complianceTabsHeader').on('click', '.nav-link', function (e) {
        e.preventDefault();
        $('#complianceTabsHeader .nav-link').removeClass('active');
        $(this).addClass('active');
        var area = $(this).data('area');
        var label = $(this).text().trim();
        var dt = $('#table-compliance').DataTable();
        // Update card title
        $('#complianceCardTitle').text(label);
        if (area) {
            dt.column(3).search('^' + area + '$', true, false).draw();
        } else {
            dt.column(3).search('').draw();
        }
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
          <input class="form-check-input filter-status" id="status-${status.replace(/\s/g, '')}" type="checkbox" value="${status}" checked>
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
const statusColumnIndex = 11; // Column index for 'status'

// ==========================
// Status Filter Logic
// ==========================
$(document).on('change', '.filter-status', function () {
    const selectedStatuses = $('.filter-status:checked').map(function () {
        return '^' + $.fn.dataTable.util.escapeRegex($(this).val()) + '$';
    }).get();
    
    let regexStr = '';
    if (selectedStatuses.length > 0) {
        regexStr = selectedStatuses.join('|');
    }
    
    if ($.fn.DataTable.isDataTable('#table-compliance')) {
        $('#table-compliance').DataTable().column(statusColumnIndex).search(regexStr, true, false).draw();
    }
});

$(document).on('click', '.select-all-status', function () {
    $('.filter-status').prop('checked', true).trigger('change');
});

$(document).on('click', '.deselect-all-status', function () {
    $('.filter-status').prop('checked', false).trigger('change');
});

$(document).on('click', '.popover .btn-close', function () {
    const popoverElement = $(this).closest('.popover');
    if (popoverElement.length) {
        const triggerElement = document.querySelector('[aria-describedby="' + popoverElement.attr('id') + '"]');
        if (triggerElement) {
            const popoverInstance = bootstrap.Popover.getInstance(triggerElement);
            if (popoverInstance) {
                popoverInstance.hide();
            }
        }
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
    return `<div class="table-actions justify-content-end d-flex gap-1 align-items-center">
    <button class="btn btn-sm btn-primary px-2" type="button">Save <i data-feather="save" style="width: 14px; height: 14px; color: #fff;"></i></button>
    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="modal" data-bs-target="#task-add-modal" title="Edit">
      <i data-feather="edit" style="width: 14px; height: 14px; color: #333;"></i>
    </button>
    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="modal" data-bs-target="#delete-modal" title="Delete">
      <i data-feather="trash-2" style="width: 14px; height: 14px; color: #333;"></i>
    </button>
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




