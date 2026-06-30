$(document).ready(function() {
    // Load JSON and render
    $.ajax({
        url: "task.json",
        method: "GET",
        dataType: "json",
        success: function(data) {
            const scorecard = data[0];
            renderTabContent(scorecard.tab);
            lucide.createIcons();
        },
        error: function(xhr, status, error) {
            console.error("Error loading data:", error);
        }
    });

    function renderTabContent(tabs) {
        const tabContent = $("#task-content").empty();
        tabs.forEach((tab, index) => {
            const tablePrefix = tab.title.toLowerCase().replace(/\s+/g, "-");
            const tabId = `task-${tablePrefix}`;
            const groupedData = groupByName(tab.tabledata);

            tabContent.append(`
                <div id="${tabId}">
                    <div class="card custom-card table-card">
                        <div class="card-header">
                            <div class="c-header-left">                              
                                <h5 class="card-title">                 
                                <strong editable="true" contenteditable="true"
                                onkeypress="return (this.innerText.length <= 36)">${tab.title}</strong>
                                </h5>
                            </div>
                            <div class="card-actions">
                            <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#task-add-modal">
                  <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                   <i data-lucide="plus" style="width: 16px; height: 16px;"></i>
                  </span>
                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <table class="table table-sm border w-100" id="table-${tablePrefix}" style="--stratroom-border-color:rgba(var(--stratroom-black-rgb),0.04)">
                                <thead class="text-center">
                                    <tr>
                                        <th>Task Id</th>
                                        <th>Task Name</th>
                                        <th>Impact</th>  
                                        <th>Owner</th>
                                        <th>Dependency </th>                
                                        <th>Priority</th>
                                        <th>Status</th>
                                        <th>Start Date</th>
                                        <th>Due Date</th>
                                        <th>Duration</th>
                                        <th>% Complete</th>
                                        <th>Attachments</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>${renderGroupedTable(groupedData, tablePrefix)}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `);
        });
        setTimeout(() => {
            tabs.forEach((tab) => {
                const tablePrefix = tab.title.toLowerCase().replace(/\s+/g, "-");
                initializeDataTable(`#table-${tablePrefix}`);
            });
        }, 300);
    }

    function groupByName(data) {
        const grouped = {};
        data.forEach(item => {
            const category = item.category || "Unnamed";
            if (!grouped[category]) grouped[category] = [];
            grouped[category].push(item);
        });
        return grouped;
    }

    function renderGroupedTable(groupedData, parentId = "") {
        let html = "";
        let groupIndex = 0;

        for (const [category, items] of Object.entries(groupedData)) {
            const groupId = `group-${parentId}-${groupIndex++}`;
            const toggleIcon = `<span class="icon toggle-icon" data-group="${groupId}">
  <i data-lucide="plus" style="width: 14px; height: 14px;"></i>
</span>`;

            html += `<tr class="level-0 bg-light group-header" data-id="${groupId}" role="row">             
             <td colspan="13">
             <div class="d-flex gap-3 justify-content-between align-items-center">
             <div class="d-flex gap-1 align-items-center">${toggleIcon} <strong>${category}</strong></div>
             
             
                <div class="table-actions justify-content-end">
                    <a data-bs-toggle="modal" data-bs-target="#task-add-modal" class="btn btn-sm btn-outline-icon" style="--stratroom-btn-color:var(--stratroom-primary);--stratroom-btn-border-color:rgba(var(--stratroom-primary-rgb),0.1);--stratroom-btn-hover-color:var(--stratroom-primary);--stratroom-btn-hover-bg:rgba(var(--stratroom-primary-rgb),0.1)">
                        <span class="icon">
                        <i data-lucide="plus" style="width: 16px; height: 16px;"></i>
                        </span>
                    </a>    
                     <div class="dropdown">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                        <i data-lucide="ellipsis-vertical" style="width: 16px; height: 16px;"></i>
                    </button>
                    <ul class="dropdown-menu border-0 shadow">                      
                        <li><a class="dropdown-item" href="#task-add-modal" data-bs-toggle="modal">Edit</a></li>                        
                        <li><a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal">Delete</a></li>
                    </ul>
                </div>            
                </div>
             </div>
             
             </td>
             
             </tr>`;

            items.forEach((item, index) => {
                const childId = `${groupId}-item-${index}`;
                html += renderTable([item], childId, 1, groupId);
            });
        }
        return html;
    }

    function renderTable(data, parentId = "", level = 1, groupId = "") {
        let html = "";

        data.forEach((item, index) => {
            const rowId = `${parentId}-row-${index}`;
            const toggleTarget = item.children ? `${rowId}-child` : "";
            console.log(item.children < 0);
            const toggleIcon = item.children && item.children.length > 0 ?
                `<i class="fas fa-plus toggle-icon" data-target="${toggleTarget}" style="cursor:pointer;"></i>` :
                "";
            const maxVisible = 2;
            const owner = item.owner || [];
            const visibleOwners = owner.slice(0, maxVisible);
            const remainingOwnersCount = owner.length - visibleOwners.length;

            const dependency = item.dependency || [];
            const visibleDependency = dependency.slice(0, maxVisible);
            const remainingDependencyCount = owner.length - visibleDependency.length;

            const responsibleOwners = visibleOwners.map(img => `
                        <li class="avatar avatar-xs pull-up" title="User">
                            <img src="assets/images/user/${img}" class="rounded-circle" width="24" height="24">
                        </li>`).join("");
            const moreOwners = `
            <li class="avatar avatar-xs pull-up" href="#attendess-list" data-bs-toggle="modal">
                <span class="avatar-initial rounded-circle" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="${remainingOwnersCount} more">+${remainingOwnersCount}</span>
            </li>`;

            const ownersHTML = responsibleOwners + moreOwners;

            const responsibleDependency = visibleDependency.map(img => `
                <li class="avatar avatar-xs pull-up" title="User">
                    <img src="assets/images/user/${img}" class="rounded-circle" width="24" height="24">
                </li>`).join("");
            const moreDependency = `
    <li class="avatar avatar-xs pull-up" href="#attendess-list" data-bs-toggle="modal">
        <span class="avatar-initial rounded-circle" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="${remainingDependencyCount} more">+${remainingDependencyCount}</span>
    </li>`;

            const dependencyHTML = responsibleDependency + moreDependency;
            const statusOptions = ["Open", "In Progress", "Completed", "Pending"];
            function getStatusBadge(status) {
                const statusMap = {
                    "Open": "status-bg-red",
                    "In Progress": "status-bg-yellow",
                    "Completed": "status-bg-green",
                    "Pending": "status-bg-gray"
                };

                const badgeStatusClass = statusMap[status] || "status-bg-gray";
                return `<span class="badge ${badgeStatusClass} rounded-pill dropdown-toggle ms-auto">${status}</span>`;
            }
            $(document).on("click", "td.editable-status", function() {
                const $cell = $(this);
                // const currentText = $cell.text().trim();

                // Avoid creating multiple selects
                if ($cell.find("select").length) return;

                // Create and populate the <select>
                const $select = $("<select class='form-select form-select-sm'>").append(
                    statusOptions.map(status =>
                        // $("<option>").val(status).text(status).prop("selected", status === currentText)
                        $("<option>").val(status).text(status).prop("selected", status)
                    )
                );

                $cell.empty().append($select);
                $select.select2({
                    width: "100%",
                    selectionCssClass: 'form-control form-control-sm p-0'
                }).focus();
                // $select.focus();

                // Update badge on change/blur
                $select.on("blur change", function() {
                    const newStatus = $select.val();
                    $cell.html(getStatusBadge(newStatus));
                });
                // Handle outside click
                $(document).on("mousedown.select2Outside", function(event) {
                    if (!$(event.target).closest(".select2-container, .select-dropdown").length) {
                        const newStatus = $select.val();
                        $cell.html(getStatusBadge(newStatus));
                        $(document).off("mousedown.select2Outside");                        
                    }
                });
            });

            const priorityOptions = ["High", "Medium", "Low"];

            function getPriorityBadge(priority) {
                const priorityMap = {
                    "High": "label-bg-red",
                    "Medium": "label-bg-yellow",
                    "Low": "label-bg-green",
                };
                const badgePriorityClass = priorityMap[priority] || "label-bg-gray";
                return `<span class="badge ${badgePriorityClass} rounded-pill dropdown-toggle ms-auto">${priority}</span>`;
            }
            $(document).on("click", "td.editable-priority", function() {
                const $cell = $(this);
                // const currentText = $cell.text().trim();

                // Avoid creating multiple selects
                if ($cell.find("select").length) return;

                // Create and populate the <select>
                const $select = $("<select class='form-select form-select-sm'>").append(
                    priorityOptions.map(priority =>
                        // $("<option>").val(priority).text(priority).prop("selected", priority === currentText)
                        $("<option>").val(priority).text(priority).prop("selected", priority)
                    )
                );
                $cell.empty().append($select);
                $select.select2({
                    width: "100%",
                    selectionCssClass: 'form-control form-control-sm p-0'
                }).focus();

                // Update badge on change/blur
                $select.on("blur change", function() {
                    const newPriority = $select.val();
                    $cell.html(getPriorityBadge(newPriority));
                });

                $(document).on("mousedown.select2Outside", function(event) {
                    if (!$(event.target).closest(".select2-container, .select-dropdown").length) {
                        const newPriority = $select.val();
                        $cell.html(getPriorityBadge(newPriority));
                        $(document).off("mousedown.select2Outside");
                    }
                });

            });
            const allImpacts = ["Scorecard", "Initiatives", "Risk", "Swot", "Pestle", "Meetings"];
            const badgeColors = ['label-bg-indigo', 'label-bg-blue', 'label-bg-orange', 'label-bg-dark', 'label-bg-cyan', 'label-bg-teal', 'label-bg-red'];
            // Utility to get a random class
            const getRandomBadgeClass = () => badgeColors[Math.floor(Math.random() * badgeColors.length)];
            const renderImpactBadges = (impacts) => {
                const impact = impacts.map(impact =>
                    `<span class="badge ${getRandomBadgeClass(impact)}">${impact}</span>`
                ).join("");
                return `<div class="d-flex gap-1 flex-wrap" style="min-width:200px">${impact}</div>`;
            };

            $(document).on("click", "td.editable-impacts", function() {
                const $cell = $(this);
                const currentImpacts = $cell.find(".badge").map(function() {
                    return $(this).text();
                }).get();

                // Prevent multiple selects
                if ($cell.find("select").length) return;

                // Create <select multiple>
                const $select = $('<select multiple class="form-select form-select-sm" size="6" style="max-width:160px">');
                allImpacts.forEach(impact => {
                    const $option = $('<option>').val(impact).text(impact);
                    if (currentImpacts.includes(impact)) $option.prop("selected", true);
                    $select.append($option);
                });

                $cell.empty().append($select);
                $select.select2({
                    width: "200px",
                    selectionCssClass: 'form-control form-control-sm p-0'
                }).focus();
                //   $select.focus();

                $select.on("blur change", function() {
                    const selected = $select.val() || [];
                    $cell.html(renderImpactBadges(selected));
                });
                $(document).on("mousedown.select2Outside", function(event) {
                    if (!$(event.target).closest(".select2-container, .select-dropdown").length) {
                        const selected = $select.val() || [];
                        $cell.html(renderImpactBadges(selected));
                        $(document).off("mousedown.select2Outside");
                    }
                });
            });
            const impacts = Array.isArray(item["impact"]) ? item["impact"] : [item["impact"]];
            const impactsBadges = impacts.map(dep => `
    <span class="badge ${getRandomBadgeClass()}">${dep}</span>
`).join("");


            $(document).on("click", "td.editable-percent", function() {
                const $cell = $(this);
                const current = parseInt($cell.find(".badge").text()) || 0;

                if ($cell.find("input").length) return;

                const $input = $('<input type="number" min="0" max="100" class="form-control form-control-sm">');
                $input.val(current);
                $cell.empty().append($input);
                $input.focus().select();

                $input.on("blur change", function() {
                    const newVal = Math.max(0, Math.min(100, parseInt($input.val()) || 0));
                    const progressHtml = `
        <div class="progress-wrap d-flex align-items-center gap-2">
          <div class="progress w-100" style="height:6px;">
            <div class="progress-bar" data-percent="${newVal}" style="width:0%" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <span class="badge">${newVal}%</span>
        </div>`;

                    $cell.html(progressHtml);
                    updateAllProgressBars(); // refresh style and values
                });
            });



            // Date
$(document).on("click", "td.editable-startdate, td.editable-duedate", function() {

   const $cell = $(this);


    // Prevent editing if a select is already present
    if ($cell.find('select').length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;


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



let actionsMenu = getActionsMenu();

            const indent = level * 20;
            const displayStyle = level === 1 ? "" : "display: none;";
            html += `<tr class="level-${level}" data-id="${rowId}" data-group-id="${groupId}" style="${displayStyle}">

                <td class="text-center text-nowrap" style="padding-left:${indent}px;">
                <div class="d-flex gap-2">${toggleIcon} ${item.task_id || ""}</div></td>
            
                <td class="text-start text-nowrap"><div class="d-flex gap-1 flex-wrap" style="min-width:260px">${item.task_name || ""}</div></td>
             
                <td class="text-start editable-impacts"><div class="d-flex gap-1 flex-wrap" style="min-width:160px">${impactsBadges}</div></td>
                <td class="text-center text-nowrap"><ul class="list-unstyled d-flex align-items-center align-items-center justify-content-center avatar-group mb-0">${ownersHTML}</ul></td>
                <td class="text-center text-nowrap"><ul class="list-unstyled d-flex align-items-center justify-content-center avatar-group mb-0">${dependencyHTML}</ul></td>
                <td class="text-center text-nowrap editable-priority">${getPriorityBadge(item.priority)}</td>
                <td class="text-center text-nowrap editable-status">${getStatusBadge(item.status)}</td>
                <td class="text-center text-nowrap editable-startdate">${item.start_date || ""}</td>
                <td class="text-center text-nowrap editable-duedate">${item.due_date || ""}</td>
                <td class="text-center text-nowrap">${item.duration || ""}</td>
                 <td class="text-center text-nowrap editable-percent">
    <div class="progress-wrap green">
    <div class="progress flex-grow-1" style="--stratroom-bg-opacity:1">
      <div class="progress-bar progress-bar-striped rounded-pill" role="progressbar" style="width: 0%;" data-percent="${item.percent_complete || ""}"></div>
    </div>
    <span class="badge"></span>
  </div></td>
  <td class="text-center text-nowrap">${item.attachments ? 
    `<a href="/path/to/files/${item.attachments}" download class="btn btn-sm btn-icon text-decoration-none">
    <span class="icon">
      <i data-lucide="file-text" style="width: 16px; height: 16px;"></i>
    </span>
    </a>` : 
    ""
  }</td>
                <td class="text-center">${actionsMenu}</td>
            </tr>`;

            if (item.children) {
                html += renderTable(item.children, `${rowId}-child`, level + 1, groupId);
            }
        });

        return html;
    }
    function initializeDataTable(selector) {
        setTimeout(() => {
            const $table = $(selector);
            updateAllProgressBars();
            
            // Store and remove group-header rows
            const groupHeaders = {};
            $table.find("tr.group-header").each(function () {
                const groupId = $(this).data("id");
                groupHeaders[groupId] = $(this).clone(true);
                $(this).remove();
            });
    
            if (!$.fn.DataTable.isDataTable(selector)) {
                var table = $(selector).DataTable({
                    paging: false,
                    searching: true,
                    ordering: false,
                    info: false,
                    responsive: true,
                    scrollX: true,
                    rowCallback: function (row) {
                        if ($(row).hasClass("group-header")) {
                            return;
                        }
                    },
                    createdRow: function (row, data, dataIndex) {
                        if ($(row).hasClass("group-header")) {
                            row._DT_RowSkip = true;
                        }
                    },
                    drawCallback: function (settings) {
                        const api = new $.fn.dataTable.Api(settings);
                        const rows = api.rows({ page: 'current' }).nodes().to$();
                        const insertedGroups = new Set();
    
                        rows.each(function () {
                            const groupId = $(this).data("group-id");
                            if (groupId && groupHeaders[groupId] && !insertedGroups.has(groupId)) {
                                groupHeaders[groupId].insertBefore($(this));
                                insertedGroups.add(groupId);
                            }
                        });
    
                        // Cleanup DT styling
                        $(settings.nTable).find("tr.group-header").removeClass("odd even");
                        $('.dataTables_filter').addClass('d-none');
                    }
                });                
                $(document).on('change', '.filter-status', function () {
                    let searchTerms = [];
                    $('.filter-status:checked').each(function () {
                      searchTerms.push("^" + $(this).val() + "$");
                    });
                
                    table.column(6).search(searchTerms.join('|'), true, false).draw();
                  });

            } else {
                $(selector).DataTable().columns.adjust().draw();
            }
        }, 200);
    }
    
    // Toggle: Group - toggles only level-1 rows and icon updates accordingly
    $(document).on("click", ".toggle-icon[data-group]", function() {
        const groupId = $(this).data("group");
        const iconWrapper = $(this);
        const icon = iconWrapper.find("svg[data-lucide]");

        // Select all rows under the group
        const allRows = $(`tr[data-group-id='${groupId}']`);

        // Filter only level-1 rows
        const level1Rows = allRows.filter(function() {
            const level = parseInt($(this).attr("class").match(/level-(\d+)/)?.[1]);
            return level === 1;
        });

        const isVisible = level1Rows.is(":visible");

        if (isVisible) {
            // Hide all nested rows (level-1 and beyond)
            allRows.each(function() {
                const rowLevel = parseInt($(this).attr("class").match(/level-(\d+)/)?.[1]) || 0;
                if (rowLevel > 0) {
                    $(this).hide();
                    // Reset inner toggle icons
                    $(this).find(".toggle-icon svg[data-lucide]").attr("data-lucide", "plus");
                }
            });
        } else {
            // Show only level-1 rows
            level1Rows.show();
        }

        // Toggle icon on current group
        //icon.toggleClass("fa-minus", !isVisible).toggleClass("fa-plus", isVisible);
        const currentType = icon.attr("data-lucide");
      icon.attr("data-lucide", currentType === "plus" ? "minus" : "plus");
      lucide.createIcons({ width: 14, height: 14 });
    });
    // Toggle: Nested
    $(document).on("click", ".toggle-icon[data-target]", function() {
        const target = $(this).data("target");
        const icon = $(this);
        const currentRow = icon.closest("tr");
        const currentLevel = parseInt(currentRow.attr("class").match(/level-(\d+)/)?.[1]) || 1;

        const allChildren = $(`tr[data-id^="${target}"]`).filter(function() {
            const rowLevel = parseInt($(this).attr("class").match(/level-(\d+)/)?.[1]) || 0;
            return rowLevel > currentLevel;
        });

        const immediateChildren = allChildren.filter(function() {
            return parseInt($(this).attr("class").match(/level-(\d+)/)?.[1]) === currentLevel + 1;
        });

        const isVisible = immediateChildren.is(":visible");

        if (isVisible) {
            allChildren.hide();
            allChildren.find(".toggle-icon").removeClass("fa-minus").addClass("fa-plus");
            icon.removeClass("fa-minus").addClass("fa-plus");
        } else {
            immediateChildren.show();
            icon.removeClass("fa-plus").addClass("fa-minus");
        }
        $("#table-my-task").DataTable().columns.adjust().draw();
    });
    function updateAllProgressBars() {
        $(".progress-bar[data-percent]").each(function() {
            const $bar = $(this);
            const rawPercent = $bar.data("percent");

            if (rawPercent === undefined || isNaN(rawPercent)) return;

            const percent = Math.max(0, Math.min(100, parseInt(rawPercent, 10)));

            $bar.css("width", percent + "%");
            $bar.attr("aria-valuenow", percent);

            $bar.removeClass("status-bg-green status-bg-yellow status-bg-red");
            if (percent < 40) {
                $bar.addClass("status-bg-red");
            } else if (percent < 75) {
                $bar.addClass("status-bg-yellow");
            } else {
                $bar.addClass("status-bg-green");
            }
            const $progressWrap = $bar.closest(".progress-wrap");
            $progressWrap.find(".badge").text(percent + "%");
        });
    }
    function getActionsMenu() {
         return `
         <div class="table-actions justify-content-end">
         <button class="btn btn-sm btn-primary px-2" type="button">
                       Save
                    <i data-lucide="save" style="width: 16px; height: 16px;"></i>
                    </button>
                <div class="dropdown">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                        <i data-lucide="ellipsis-vertical" style="width: 16px; height: 16px;"></i>
                    </button>
                    <ul class="dropdown-menu border-0 shadow">                      
                        <li><a class="dropdown-item" href="#task-add-modal" data-bs-toggle="modal">Edit</a></li>                        
                        <li><a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal">Delete</a></li>
                    </ul>
                </div>
            </div></div>`;
    }
});