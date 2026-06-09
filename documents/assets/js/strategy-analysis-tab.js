$(document).ready(function () {
    $.ajax({
        url: "strategy-analysis.json",
        method: "GET",
        dataType: "json",
        success: function (data) {
            let scorecard = data[0]; // Extract main scorecard object
            renderTabs(scorecard.tab);
            renderTabContent(scorecard.tab);
        },
        error: function (xhr, status, error) {
            console.error("Error loading data:", error);
        }
    });


    const riskImageUrls = {
        good: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-green-i.svg",
        warning: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-yellow-i.svg",
        critical: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-red-i.svg"
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

            let tabButton = `<button class="nav-link ${isActive}" id="${tabId}-tab" data-bs-toggle="pill"
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
        let tabContent = $("#tab-content");
        tabContent.empty();

        tabs.forEach((tab, index) => {
            // console.log("tab",tab)
            let isActive = index === 0 ? "show active" : "";
            let tablePrefix = tab.title.toLowerCase().replace(/\s+/g, "-");
            // let tabId = `tab${tab.title}-${index}`;
            let tabId = `v-pills-${tablePrefix}`;

            tabContent.append(`<div id="${tabId}" class="tab-pane fade ${isActive}">
                  <div class="card custom-card table-card">
                    <div class="card-header">
                                <div class="c-header-left">
                                   
                                    <h5 class="card-title me-auto">

                                        <strong editable="true" contenteditable="true"
                                            onkeypress="return (this.innerText.length <= 36)">${tab.title}</strong>
                                    </h5>

                                </div>
                               

                            </div>
                  <div class="card-body">

                   <ul class="nested-area strategy-nested-main" id="strategy-tablePrefix">
                   ${renderList(tab.tabledata,tablePrefix)}
                   </ul>

               
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





    function renderList(data, parentId = "", level = 0) {
        let html = "";
    
        data.forEach((item, index) => {
            const rowId = parentId ? `${parentId}-child-${index + 1}` : `row-${index}`;
            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
            
    
            const toggleIcon = hasChildren ? `<div class="caret" data-toggle-id="${rowId}"></div>` : "";
            const actionsMenu = getActionsMenu(level);
    
            const rowClass = parentId ? `child-of-${parentId}` : "";
            
            const rowStyle = level >= 2 ? `display: none;` : "";
    
            const bgClass = level === 0 ? "level-0" : level === 1 ? "level-1" : "level-2";
    
           
    
            // Parent Row
            html += `<li class="nested-item non-draggable ${rowClass} ${bgClass}" data-id="${rowId}" style="${rowStyle}">
                        ${toggleIcon}
                        <div class="card strategy-box parent">
                            <div class="strategy-section" id="${item.id}">
                                <div class="strategy-content">
                                    <div class="icon">
                                        <img src="assets/images/icons/dollar-i.svg" width="16" height="16">
                                    </div>
                                    <div class="content">
                                        <p class="strategy-label d-flex flex-column gap-1">
                                            <strong>${item.analysisType || item.name}</strong>
                                        </p>
                                    </div>
                                </div>
                                
                                    ${actionsMenu}
                               
                            </div>
                        </div>`;
    
            // Children, if any
            if (hasChildren) {


                html += `<ul class="nested nested-area">`;
    
                item.children.forEach(child => {

                    const riskStatus = child.status || "good";
                    const riskImg = riskImageUrls[riskStatus] ?
                        `<img src="${riskImageUrls[riskStatus]}" width="16" height="16">` : "";

                    const responsibleAvatars = (child.responsible || []).map(img => `
                        <li class="avatar avatar-xs pull-up" title="User">
                            <img src="assets/images/user/${img}" class="rounded-circle" width="24" height="24">
                        </li>`).join("");
    
                    html += `<li class="nested-item non-draggable">
                                <div class="card strategy-box parent">
                                    <div class="strategy-section">
                                        <div class="strategy-content">
                                            <div class="image">
                                                <img src="assets/images/user/${child.image}" loading="lazy" width="26" height="26" alt="${child.image}">
                                            </div>
                                            <div class="content">
                                                <div class="strategy-head">
                                                    <p class="strategy-label">${child.descripion}</p>
                                                    <div class="strategy-action p-0">
                                                        ${getActionsMenu(level + 1)}
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-column gap-1">
                                                    <p class="strategy-label"><strong>Department</strong> - ${child["department "]}</p>
                                                    <p class="strategy-label"><strong>Business Impact</strong> - ${child.businessImpact}</p>
                                                    <p class="strategy-label"><strong>Next Due</strong> - ${child.nextDue || child["Next Due"]}</p>
                                                </div>
                                                <div class="d-flex flex-column gap-1">
                                                    <p class="strategy-label"><strong>Status</strong> - 
                                                        <span>${child.status}
                                                        ${riskImg}
                                                        </span>
                                                    </p>
                                                    <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
                                                        ${responsibleAvatars}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>`;
                });
    
                html += `</ul>`;
            }
    
            html += `</li>`; // Close main list item
        });
    
        return html;
    }
    
    
    // Function to toggle the visibility of child items
    function toggleVisibility(rowId) {
        const childList = document.getElementById(`${rowId}-child`);
        if (childList) {
            //childList.style.display = childList.style.display === "none" ? "block" : "none";
            this.parentElement.querySelector(".nested").classList.toggle("active");
            this.classList.toggle("caret-down");
        }
    }
    

    $(document).on("click", ".caret", function () {
        const rowId = $(this).data("toggle-id");
        const $nestedList = $(`[data-id="${rowId}"]`).find(".nested").first();
    
        if ($nestedList.length) {
            $nestedList.toggleClass("active");
            $(this).toggleClass("caret-down");
        }
    });
    


   

    function getActionsMenu(level) {
        if (level === 0) {
            return `<div class="strategy-action">
                                        <ul class="list-unstyled action-list">
                                            <li>
                                                <a href="#add-objective" data-bs-toggle="modal">
                                                    <span class="icon" data-bs-toggle="tooltip"
                                                        data-bs-placement="bottom" data-bs-title="Add Objective">
                                                        <i class="fas fa-plus title_edit_icon"></i>
                                                    </span>
                                                </a>
                                            </li>

                                        </ul>
                                    </div>`;
        } else {
            return `<div class="strategy-action p-0">
                                                            <ul class="list-unstyled action-list">
                                                                <li>
                                                                    <a href="#notes-pestal" data-bs-toggle="modal">
                                                                        <span class="icon" data-bs-toggle="tooltip"
                                                                            data-bs-placement="bottom"
                                                                            data-bs-title="Notes">
                                                                            <i
                                                                                class="fas fa-file-alt title_edit_icon"></i>
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#action-pestal" data-bs-toggle="modal">
                                                                        <span class="icon" data-bs-toggle="tooltip"
                                                                            data-bs-placement="bottom"
                                                                            data-bs-title="Action">
                                                                            <i class="fas fa-cog title_edit_icon"></i>

                                                                        </span>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#attachment-pestal" data-bs-toggle="modal">
                                                                        <span class="icon" data-bs-toggle="tooltip"
                                                                            data-bs-placement="bottom"
                                                                            data-bs-title="Attchment">
                                                                            <i
                                                                                class="fas fa-paperclip title_edit_icon"></i>
                                                                        </span>
                                                                    </a>
                                                                </li>

                                                                <li class="dropdown">
                                                                    <a class="btn btn-link p-0 show" type="button"
                                                                        data-bs-toggle="dropdown" aria-expanded="true">

                                                                        <span class="icon">
                                                                            <i class="fas fa-ellipsis-v"></i>
                                                                        </span>
                                                                    </a>

                                                                    <ul
                                                                        class="dropdown-menu dropdown-menu-end border-0 shadow">
                                                                        <li>
                                                                            <a class="dropdown-item"
                                                                                href="#edit-objective"
                                                                                data-bs-toggle="modal">Edit</a>
                                                                        </li>

                                                                        <li>
                                                                            <a class="dropdown-item"
                                                                                href="#delete-modal"
                                                                                data-bs-toggle="modal">Delete</a>
                                                                        </li>
                                                                    </ul>
                                                                </li>




                                                            </ul>

                                                        </div>`;
        }
    }
});