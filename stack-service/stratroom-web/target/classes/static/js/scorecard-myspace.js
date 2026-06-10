$(document).ready(function () {
    $.ajax({
        url: "scorecard-myspace.json",
        method: "GET",
        dataType: "json",
        success: function (data) {
            let scorecard = data[0]; 
            renderTabs(scorecard.tab);
            renderTabContent(scorecard.tab);
        },
        error: function (xhr, status, error) {
            console.error("Error loading data:", error);
        }
    });


    const riskImageUrls = {
        green: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-green-i.svg",
        yellow: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-yellow-i.svg",
        red: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-red-i.svg"
    };
    const flagImageUrls = {
        green: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/flag-green-i.svg",
        yellow: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/flag-yellow-i.svg",
        red: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/flag-red-i.svg"
    };
    const trendImageUrls = {
        up: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/up-i.png",
        down: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/down-i.png",
    };

   

    function renderTabs(tabs) {
        let tabNavWrap = $("#tab-navigationWrap");
        tabNavWrap.empty();
    
        // Create dropdown button (visible only on small screens)
        let dropdownButton = `<button class="btn btn-primary dropdown-toggle d-lg-none" type="button"
                                id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                Users
                              </button>`;
    
        // Create dropdown menu with tabs
        let tabNav = $('<ul class="dropdown-menu nav nav-pills" id="tab-navigation" role="tablist" aria-orientation="horizontal"></ul>');
    
        tabs.forEach((tab, index) => {
            let isActive = index === 0 ? "active" : "";
            let tablePrefix = tab.title.toLowerCase().replace(/\s+/g, "-");
            let tabId = `v-pills-${tablePrefix}`;
            let tabView = `scorecard${tablePrefix.charAt(0).toUpperCase() + tablePrefix.slice(1)}View`;
    
            let tabButton = `<button class="nav-link ${tabView} ${isActive}" id="${tabId}-tab" data-bs-toggle="pill"
                                data-bs-target="#${tabId}" type="button" role="tab" aria-controls="${tabId}"
                                aria-selected="${index === 0 ? "true" : "false"}">
                                <span class="nav-text" contenteditable="true"
                                    oninput="if (this.innerText.length > 36) this.innerText = this.innerText.substring(0, 36);">
                                    ${tab.title}
                                </span>
                             </button>`;
            
            tabNav.append(tabButton);
        });
    
        // Append dropdown button and tab navigation to wrapper
        tabNavWrap.append(dropdownButton);
        tabNavWrap.append(tabNav);
    }
    
    // Event listener to update dropdown button text
    $(document).on('click', '#tab-navigation .nav-link', function () {
        var selectedText = $(this).find('.nav-text').text().trim();
        $('#dropdownMenuButton').text(selectedText);
    });
        

    function renderTabContent(tabs) {
        console.log(tabs, "tabsData");
        let tabContent = $("#tab-content");
        tabContent.empty();

        tabs.forEach((tab, index) => {
            // console.log("tab",tab)
            let isActive = index === 0 ? "show active" : "";
            let tablePrefix = tab.title.toLowerCase().replace(/\s+/g, "-");
            // let tabId = `tab${tab.title}-${index}`;
            let tabId = `v-pills-${tablePrefix}`;
            let tabView = `scorecard${tablePrefix.charAt(0).toUpperCase() + tablePrefix.slice(1)}View`;

            tabContent.append(`<div id="${tabId}" class="tab-pane fade ${tabView} ${isActive}">
                  <div class="card custom-card table-card">
                    <div class="card-header">
                                <div class="c-header-left">
                                    <span class="badge text-bg-success">${tab.totalScore}</span>
                                    <h5 class="card-title me-auto">

                                        <strong editable="true" contenteditable="true"
                                            onkeypress="return (this.innerText.length <= 36)">${tab.title}</strong>
                                    </h5>

                                </div>
                                <div class="card-actions">
                                    <div class="dropdown">
                                        <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                            aria-expanded="true">
                                            <span class="icon">
                                                <img width="16" height="16"
                                                    src="assets/images/icons/menu-dot-vertical-i.svg">
                                            </span>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                            <li>
                                                <a class="dropdown-item" href="#objective-add-modal"
                                                    data-bs-toggle="modal" onclick="return false;">Add</a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="#objective-edit-modal"
                                                    data-bs-toggle="modal" onclick="return false;">Edit</a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="#objective-view-modal"
                                                    data-bs-toggle="modal" onclick="return false;">View</a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                  <div class="card-body">
                <table class="table table-bordered w-100" id="table-${tablePrefix}">
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Period</th>
                            <th>Score</th>
                            <th>Trend</th>
                            <th>Baseline</th>
                            <th>Actual</th>
                            <th>Target</th>
                            <th>Risk</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>${renderTable(tab.tabledata,tablePrefix)}</tbody>
                </table>
                </div>
                </div>
            </div>`);
        });
        setTimeout(() => {
        tabs.forEach((tab) => {
            let tablePrefix = tab.title.toLowerCase().replace(/\s+/g, "-");
            initializeDataTable(`#table-${tablePrefix}`);
        });
    }, 300);
    }

   

    function initializeDataTable(selector) {
        setTimeout(() => {
            if ($.fn.DataTable && !$.fn.DataTable.isDataTable(selector)) {
                $(selector).DataTable({
                    paging: false,
                    searching: false,
                    ordering: false,
                    info: false,
                    responsive: true,
                    scrollX: true
                });
            } else {
                // Recalculate DataTable when it becomes visible
                $(selector).DataTable().columns.adjust().draw();
            }
        }, 500);
    }
    $(document).on("shown.bs.tab", 'button[data-bs-toggle="pill"]', function (e) {
        let targetTableId = $(e.target).data("bs-target"); // Example: #v-pills-performance
        let tableSelector = `${targetTableId} table`; // Select the table inside the active tab
    
        if ($.fn.DataTable && !$.fn.DataTable.isDataTable(tableSelector)) {
            initializeDataTable(tableSelector);
        } else {
            $(tableSelector).DataTable().columns.adjust().draw();
        }
    });
    
        

    function renderTable(data, parentId = "", level = 0) {
        let html = "";
        data.forEach((item, index) => {
            let rowId = parentId ? `${parentId}-child-${index + 1}` : `row-${index}`;
            let toggleTarget = item.children ? `${rowId}-child` : "";
    
            // Show toggle icon only if item has children
            let toggleIcon = item.children && level > 0  
                ? `<i class="fas fa-plus toggle-icon" data-target="${toggleTarget}"></i>`
                : "";
    
            // console.log(`Level ${level} → ${rowId}`);
    
            let actionsMenu = getActionsMenu(level);
    
            // **Apply class for parent-child hierarchy & hide deeper levels**
            let rowClass = parentId ? `child-of-${parentId}` : "";
            let rowStyle = level >= 2 ? `display: none;` : ""; // **Hide Level 2 & deeper rows initially**
    
            // **Background color based on hierarchy level**
            let bgClass = level === 0 ? "level-0"
                : level === 1 ? "level-1"
                : "level-2"; 
    
            // **Extract image paths from the JSON object**
            // let flagStatus = item.flag?.[0]?.status || "gray"; // Default to gray if missing
            // let riskStatus = item.risk?.[0]?.status || "gray"; 
            // let flagImg = `<img src="icons/${flagStatus}.png" width="16" height="16">`;
            // let riskImg = `<img src="icons/${riskStatus}.png" width="16" height="16">`;

            // Fetch flag, risk, and trend images based on status
        let flagStatus = item.flag?.[0]?.status || "red"; 
        let riskStatus = item.risk?.[0]?.status || "red"; 
        let trendStatus = item.trend?.[0]?.status || "";

        let flagImg = flagImageUrls[flagStatus] 
            ? `<img src="${flagImageUrls[flagStatus]}" width="16" height="16">` 
            : "";

        let riskImg = riskImageUrls[riskStatus] 
            ? `<img src="${riskImageUrls[riskStatus]}" width="16" height="16">` 
            : "";

        let trendImg = trendImageUrls[trendStatus] 
            ? `<img src="${trendImageUrls[trendStatus]}" width="12" height="12">`
            : "";


            let nameLink = level === 0 ? `${item.name}`
                : level === 1 ? `<a class="text-decoration-none" href="${item.url}">${item.name}</a>`
                : `<a class="text-decoration-none" href="${item.url}">${item.name}</a>`; 
    
            // **Trend Mapping (Up / Down)**
            // let trendStatus = item.trend?.[0]?.status || "";
            // let trendIcon = trendStatus
            //     ? `<i class="fas fa-arrow-${trendStatus === "up" ? "up" : "down"} text-${trendStatus}"></i>`
            //     : "";
    
            html += `<tr class="${rowClass} ${bgClass}" data-id="${rowId}" style="${rowStyle}">
                <td width="30"><div class="d-flex justify-content-end gap-2">${toggleIcon} ${flagImg}</div></td>
                <td width="80">${item.id}</td>
                <td><div style="min-width:260px">${nameLink}</div></td>
                <td width="50" class="text-center">${item.period}</td>
                <td width="50" class="text-center">${item.score}</td>
                <td width="50" class="text-center">${trendImg}</td>
                <td width="50" class="text-center">${item.baseline}</td>
                <td width="50" class="text-end">${item.actual}</td>
                <td width="50" class="text-end">${item.target}</td>
                <td width="50" class="text-center">${riskImg}</td>
                <td width="70">${actionsMenu}</td>
            </tr>`;
    
            if (item.children) {
                html += renderTable(item.children, rowId, level + 1);  
            }
        });
        return html;
    }
    

    $(document).on("click", ".toggle-icon", function () {
        let target = $(this).data("target");
        $(`tr[data-id^="${target}"]`).toggle();
        $(this).toggleClass("fa-plus fa-minus");
    });

    function getActionsMenu(level) {
        if (level === 0) {
            return `<div class="table-actions justify-content-end">
                <a href="#kpi-view-modal" data-bs-toggle="modal" type="button"
                   class="btn btn-sm btn-icon">
                    <span class="icon"><img src="assets/images/icons/info-i.svg" width="12" height="12"></span>
                </a>
                <div class="dropdown">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                    </button>
                    <ul class="dropdown-menu border-0 shadow">
                        <li><a class="dropdown-item" href="#kpi-add-modal" data-bs-toggle="modal">Add</a></li>
                        <li><a class="dropdown-item" href="#kpi-edit-modal" data-bs-toggle="modal">Edit</a></li>
                        <li><a class="dropdown-item" href="#kpi-view-modal" data-bs-toggle="modal">View</a></li>
                        <li><a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal">Delete</a></li>
                    </ul>
                </div>
            </div>`;
        } else if (level === 1) {
            return `<div class="table-actions justify-content-end">
             <a href="#kpi-story-card-modal" data-bs-toggle="modal" type="button"
                   class="btn btn-sm btn-icon">
                    <span class="icon"><img src="assets/images/icons/link-i.svg" width="12" height="12"></span>
                </a>
                <a href="#subkpi-view-modal" data-bs-toggle="modal" type="button"
                   class="btn btn-sm btn-icon">
                    <span class="icon"><img src="assets/images/icons/info-i.svg" width="12" height="12"></span>
                </a>
                <div class="dropdown">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                    </button>
                    <ul class="dropdown-menu border-0 shadow">
                        <li><a class="dropdown-item" href="#subkpi-add-modal" data-bs-toggle="modal">Add</a></li>
                        <li><a class="dropdown-item" href="#subkpi-edit-modal" data-bs-toggle="modal">Edit</a></li>
                        <li><a class="dropdown-item" href="#subkpi-view-modal" data-bs-toggle="modal">View</a></li>
                        <li><a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal">Delete</a></li>
                    </ul>
                </div>
            </div>`;
        } else {
            return `<div class="table-actions justify-content-end">
            <a href="#kpi-story-card-modal" data-bs-toggle="modal" type="button"
                   class="btn btn-sm btn-icon">
                    <span class="icon"><img src="assets/images/icons/link-i.svg" width="12" height="12"></span>
                </a>
                <a href="#subsubkpi-view-modal" data-bs-toggle="modal" type="button"
                   class="btn btn-sm btn-icon">
                    <span class="icon"><img src="assets/images/icons/info-i.svg" width="12" height="12"></span>
                </a>
                <div class="dropdown">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                    </button>
                    <ul class="dropdown-menu border-0 shadow">
                        <li><a class="dropdown-item" href="#subsubkpi-edit-modal" data-bs-toggle="modal">Edit</a></li>
                        <li><a class="dropdown-item" href="#subsubkpi-view-modal" data-bs-toggle="modal">View</a></li>
                        <li><a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal">Delete</a></li>
                    </ul>
                </div>
            </div>`;
        }
    }
});
