
$(document).ready(function() {
    // Load JSON and render
    $.ajax({
        url: "report-template.json",
        method: "GET",
        dataType: "json",
        success: function(data) {
             const scorecard = [data];
           renderTabContent(scorecard);
            lucide.createIcons();
            console.log("Data loaded:", data);
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
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="true">
                                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                        <li>
                                            <a class="dropdown-item" href="#report_template_setting" data-bs-toggle="modal"
                                                onclick="return false;">Settings</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#drilldown_view" data-bs-toggle="modal"
                                                onclick="return false;">View</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#"
                                                onclick="loadDataAndGeneratePDF()">Download PDF</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Download CSV</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            </div>
                        
                        <div class="card-body">
                            <table class="table table-sm table-bordered w-100" id="table-${tablePrefix}" style="--stratroom-border-color:rgba(var(--stratroom-black-rgb),0.04)">
                                <thead class="text-center align-middle">
                                    <tr>
                                        <th>Report Id</th>
                                      
                                        <th>Strategic Outcomes</th>
                                        <th>Strategic Objectives</th>
                                        <th>Coherent Actions</th>
                                        <th>Sub-Actions</th>
                                        <th>Output</th>
                                        <th>Responsible</th>
                                        <th>Target Period 2024/25</th>
                                        <th style="min-width: 280px;white-space: normal;">Planned Implementation Months</th>
                                        <th style="min-width: 280px;white-space: normal;">Actual Implementation Months</th>
                                        <th style="min-width: 280px;white-space: normal;">Performance Status As At 30 September 2024</th>
                                        <th style="min-width: 280px;white-space: normal;">Implementation Remarks</th>
                                        <th style="min-width: 280px;white-space: normal;">Performance Analysis Observations Recommendations</th>
                                        <th style="min-width: 280px;white-space: normal;">Consolidated Implementation Remarks</th>
                                        <th style="min-width: 280px;white-space: normal;">Consolidated Performance Analysis Observations Recommendations</th>
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
            const category = item.departmentName || "Unnamed";
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
             <td colspan="15">
             <div class="d-flex gap-3 justify-content-between align-items-center">
             <div class="d-flex gap-1 align-items-center">${toggleIcon} <strong>${category}</strong></div>
             
             
                          
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
                `<span class="icon toggle-icon" data-target="${toggleTarget}" style="cursor:pointer;">
  <i data-lucide="plus" style="width: 14px; height: 14px;"></i>
</span>` :
                "";



            const indent = level * 20;
            const displayStyle = level === 1 ? "" : "display: none;";
            html += `<tr class="level-${level}" data-id="${rowId}" data-group-id="${groupId}" style="${displayStyle}">

                <td class="text-center text-nowrap" style="padding-left:${indent}px;">
                <div class="d-flex gap-2">${toggleIcon} ${item.id || ""}</div></td>
                <td class="text-start editable-impacts"><div class="d-flex gap-1 flex-wrap" style="min-width:160px">${item.strategicOutcomes || ""}</div></td>
                <td class="text-center text-nowrap">${item.strategicObjectives || ""}</td>
                <td class="text-center text-nowrap">${item.coherentActions || ""}</td>
                <td class="text-center text-nowrap editable-priority">${item.subActions || ""}</td>
                <td class="text-center text-nowrap editable-status">${item.output || ""}</td>
                <td class="text-center text-nowrap editable-startdate">${item.responsible || ""}</td>
                <td class="text-center text-nowrap editable-duedate">${item.targetPeriod2024_25 || ""}</td>
                <td class="text-center text-nowrap">${item.plannedImplementationMonths || ""}</td>
                <td class="text-center text-nowrap">${item.actualImplementationMonths || ""}</td>
                <td class="text-center text-nowrap">${item.performanceStatusAsAt30September2024 || ""}</td>
                <td class="text-center text-nowrap">${item.implementationRemarks || ""}</td>
                <td class="text-center text-nowrap">${item.performanceAnalysisObservationsRecommendations || ""}</td>
                <td class="text-center text-nowrap">${item.consolidatedImplementationRemarks || ""}</td>
                <td class="text-center text-nowrap">${item.consolidatedPerformanceAnalysisObservationsRecommendations || ""}</td>
               
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
    const icon = $(this).find("svg[data-lucide]");
    const currentRow = $(this).closest("tr");
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
        allChildren.find(".toggle-icon svg[data-lucide]").attr("data-lucide", "plus");
        icon.attr("data-lucide", "plus");
    } else {
        immediateChildren.show();
        icon.attr("data-lucide", "minus");
    }
    
    // Recreate icons to reflect changes
    lucide.createIcons({ width: 14, height: 14 });
    $("#table-my-task").DataTable().columns.adjust().draw();
});
   
    
});