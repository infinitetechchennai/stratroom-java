$(document).ready(function () {
    $.ajax({
        url: "pestel.json",
        method: "GET",
        dataType: "json",
        success: function (data) {
            let scorecard = data[0]; // Extract main scorecard object
           // renderTabs(scorecard.tab);
            renderTabContent(scorecard.tab);
            lucide.createIcons();
        },
        error: function (xhr, status, error) {
            console.error("Error loading data:", error);
        }
    });


    const pestelImageUrls = {
        good: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-green-i.svg",
        warning: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-yellow-i.svg",
        critical: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-red-i.svg"
    };
    const pestelIconsUrls = {
        strengths: "./assets/images/icons/strengths-i.svg",
        weaknesses: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-yellow-i.svg",
        opportunities: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-red-i.svg",
        threats: "./assets/images/icons/threats-i.svg"
    };
  

    



  
   


    function renderTabContent(tabs) {
        let tabContent = $("#contentload");
        tabContent.empty();

        tabs.forEach((tab, index) => {
            // console.log("tab",tab)
            let isActive = index === 0 ? "show active" : "";
            let tablePrefix = tab.title.toLowerCase().replace(/\s+/g, "-");
            // let tabId = `tab${tab.title}-${index}`;
            let tabId = `card-${tablePrefix}`;
 const groupedData = groupByName(tab.tabledata);
            tabContent.append(`
                  <div class="card custom-card" id="${tabId}">
                    <div class="card-header">
                                <div class="c-header-left">
                                   
                                    <h5 class="card-title me-auto">

                                        <strong editable="true" contenteditable="true"
                                            onkeypress="return (this.innerText.length <= 36)">${tab.title}</strong>
                                    </h5>

                                </div>
                               

                            </div>
                  <div class="card-body p-3">
                    <div class="pestel-analysis-tree">
                        <ul class="nested-area analysis-nested-main" id="strategy-${tablePrefix}">
                        ${renderList(tab.tabledata,tablePrefix)}
                        </ul>
                    </div>
                     <div class="pestel-analysis-table" style="display:none;">
                   

                    <table class="table table-sm border w-100" id="table-${tablePrefix}" style="--stratroom-border-color:rgba(var(--stratroom-black-rgb),0.04)">
                                <thead class="text-center">
                                    <tr>                                     
                                        <th>description</th>
                                         <th>Status</th>
                                        <th>Type</th>
                                        <th>Next Due</th>  
                                        <th class="text-start">Department</th>
                                        <th class="text-start">Business Impact </th>                
                                        <th>Responsible </th>                
                                        <th>Recommendation</th>                
                                       
                                    </tr>
                                </thead>
                                 <tbody>${renderGroupedTable(groupedData, tablePrefix)}</tbody>
                            </table>
                             </div>
               
                </div>
                </div>`);
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

    data.forEach(parent => {
        const category = parent.name || "Unnamed";

        if (!grouped[category]) grouped[category] = [];

        // Only push children (not parent)
        if (parent.children && parent.children.length > 0) {
            parent.children.forEach(child => {
                child.parentName = parent.name; 
                grouped[category].push(child);
            });
        }
    });

    return grouped;
}



 function renderGroupedTable(groupedData, parentId = "") {
        let html = "";
        let groupIndex = 0;

        for (const [category, items] of Object.entries(groupedData)) {

console.log("category",category);
console.log("items",items);
{/* <i data-lucide="${item.icon}" style="width: 24px; height: 24px;"></i> */}
            const groupId = `group-${parentId}-${groupIndex++}`;
            const toggleIcon = `<i class="fas fa-minus toggle-icon" data-group="${groupId}" style="cursor:pointer;"></i>`;

            html += `<tr class="level-0 bg-light group-header" data-id="${groupId}" role="row">             
             <td colspan="9">
             <div class="d-flex gap-3 justify-content-between align-items-center">
             <div>${toggleIcon} <strong class="text-uppercase">${category}</strong></div>
             
             
                
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




    // Available badge colors
const badgeColors = [
    'label-bg-indigo',
    'label-bg-blue',
    'label-bg-orange',
    'label-bg-dark',
    'label-bg-cyan',
    'label-bg-teal',
    'label-bg-red'
];

// Random class selector
const getRandomBadgeClass = () =>
    badgeColors[Math.floor(Math.random() * badgeColors.length)];

// Render businessImpact badges
const renderBusinessImpactBadges = (impacts) => {
    if (!Array.isArray(impacts)) return "";

    const impactHTML = impacts
        .map(impact => `<span class="badge ${getRandomBadgeClass()}">${impact}</span>`)
        .join("");

    return `
        <div class="d-flex gap-1 flex-wrap" style="min-width:200px;max-width:240px;">
            ${impactHTML}
        </div>
    `;
};

 function renderTable(data, parentId = "", level = 1, groupId = "") {
     let html = "";

data.forEach((item, index) => {
             const rowId = `${parentId}-row-${index}`;
            const toggleTarget = item.children ? `${rowId}-child` : "";
            // console.log("rowId",rowId);
            // console.log("item.children",item.children < 0);
            const toggleIcon = item.children && item.children.length > 0 ?
                `<i class="fas fa-plus toggle-icon" data-target="${toggleTarget}" style="cursor:pointer;"></i>` :
                "";

                const indent = level * 20;
            const displayStyle = level === 1 ? "" : "display: none;";
            html += `<tr class="level-${level}" data-id="${rowId}" data-group-id="${groupId}" style="${displayStyle}">

                <!-- <td class="text-center text-nowrap" style="padding-left:${indent}px;">
             <div class="d-flex gap-2">${toggleIcon} ${item.id || ""}</div></td>-->

<td class="text-start"><div class="d-flex gap-1 flex-wrap" style="width:260px">${item.descripion || ""}</div></td>
<td class="text-center text-nowrap"><img width="16" src="${pestelImageUrls[item.status]}"></td>
<td class="text-start text-nowrap"><span class="badge label-bg-dark">${item.type || ""}</span></td>
<td class="text-start text-nowrap">${item.nextDue || ""}</td>
<td class="text-start text-nowrap">${renderBusinessImpactBadges(item.department)}</td>
<td class="text-start text-nowrap">${renderBusinessImpactBadges(item.businessImpact)}</td>


<td class="text-start text-nowrap"><ul class="list-unstyled d-flex align-items-center align-items-center justify-content-center avatar-group mb-0">

${item.responsible.map(r => `<li class="avatar avatar-xs pull-up" title="User">
        <img src="assets/images/user/${r}" class="rounded-circle" width="24" height="24">
    </li>`).join("")}
</ul></td>
     <td class="text-start"><div class="d-flex gap-1 flex-wrap" style="width:260px">${item.action ? item.action.map(a => a.recommendation).join(", ") : ""}</div></td>   
            
            </tr>`;

            if (item.children) {
                html += renderTable(item.children, `${rowId}-child`, level + 1, groupId);
            }
})
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
                

            } else {
                $(selector).DataTable().columns.adjust().draw();
            }
        }, 200);
    }

    function renderList(data, parentId = "", level = 0) {
        let html = "";
    
        data.forEach((item, index) => {
            const rowId = parentId ? `${parentId}-child-${index + 1}` : `row-${index}`;
           
            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
            
    
            const toggleIcon = hasChildren ? `<div class="caret" data-toggle-id="${rowId}"></div>` : "";
            const actionsMenu = getActionsMenu(level);
    
            const rowClass = parentId ? `child-of-${parentId}` : "";
            const rowbg = parentId ? `bg-${parentId}-${index + 1}` : "";
            console.log(rowClass);
            
            // const rowStyle = level >= 2 ? `display: none;` : "";
    
            // const bgClass = level === 0 ? "level-0" : level === 1 ? "level-1" : "level-2";

            const analysisType = item.analysisType.toLowerCase().replace(/\s+/g, "-");
           
            const pestelImg = pestelIconsUrls[analysisType] ?
            `<img src="${pestelIconsUrls[analysisType]}" width="18" height="18">` : "";
            console.log(pestelImg);
    
            // Parent Row
            html += `<li class="nested-item non-draggable ${rowbg}" data-id="${rowId}">
                        ${toggleIcon}
                        <div class="card analysis-box parent">
                            <div class="analysis-section" id="${item.id}">
                                <div class="analysis-content">
                                    <div class="icon text-white">
                                      <i data-lucide="${item.icon}" style="width: 24px; height: 24px;"></i>                                                                           
                                    </div>
                                    <div class="content">
                                        <p class="analysis-label text-uppercase text-white">
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

                    const pestelStatus = child.status || "good";
                    
                    const riskImg = pestelImageUrls[pestelStatus] ?
                        `<img src="${pestelImageUrls[pestelStatus]}" width="16" height="16">` : "";

                       



                    const maxVisible = 2;
const responsible = child.responsible || [];
const visibleAvatars = responsible.slice(0, maxVisible);
const remainingCount = responsible.length - visibleAvatars.length;

const responsibleAvatars = visibleAvatars.map(img => `
    <li class="avatar avatar-xs pull-up" title="User">
        <img src="assets/images/user/${img}" class="rounded-circle" width="24" height="24">
    </li>`).join("");

const moreAvatar = `
    <li class="avatar avatar-xs pull-up" href="#attendess-list" data-bs-toggle="modal">
        <span class="avatar-initial rounded-circle" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="${remainingCount} more">+${remainingCount}</span>
    </li>`;

const avatarHTML = responsibleAvatars + moreAvatar;

const badgeColors = ['label-bg-indigo', 'label-bg-blue', 'label-bg-orange', 'label-bg-dark','label-bg-cyan','label-bg-teal','label-bg-red'];
// Utility to get a random class
const getRandomBadgeClass = () => badgeColors[Math.floor(Math.random() * badgeColors.length)];

const departments = Array.isArray(child["department "]) ? child["department "] : [child["department "]];
const departmentBadges = departments.map(dep => `
    <span class="badge ${getRandomBadgeClass()}">${dep}</span>
`).join("");

const impacts = Array.isArray(child.businessImpact) ? child.businessImpact : [child.businessImpact];
const impactBadges = impacts.map(impact => `
    <span class="badge ${getRandomBadgeClass()}">${impact}</span>
`).join("");


    
                    html += `<li class="nested-item non-draggable">
                                <div class="card analysis-box parent">
                                    <div class="analysis-section flex-column">
                                        <div class="analysis-content border-bottom">
                                            <div class="icon">
                                                 ${riskImg}
                                            </div>
                                            <div class="content">
                                                <div class="analysis-head flex flex-wrap flex-sm-nowrap">
                                                    <p class="analysis-label"><strong>${child.descripion}</strong></p>
                                                    ${getActionsMenu(level + 1)}
                                                </div>                                                  
                                            </div>
                                        </div>
                                        <div class="analysis-details"> 
                                    <div class="form-group">
                            <label class="form-label">Department</label>
                            <div class="d-flex flex-wrap gap-1">${departmentBadges}</div>
                           </div>
                           <div class="form-group">
                            <label class="form-label">Business Impact</label>
                            <div class="d-flex flex-wrap gap-1">${impactBadges}</div>
                           </div>

                           <div class="form-group">
                            <label class="form-label">Next Due</label>
                            <p class="form-control-plaintext">${child.nextDue}</p>
                           </div>

                           <div class="form-group">
                            <label class="form-label">Responsible</label>
                             <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
                               ${avatarHTML}
                             </ul>
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
    // Toggle: Group - toggles only level-1 rows and icon updates accordingly
    $(document).on("click", ".toggle-icon[data-group]", function() {
        const groupId = $(this).data("group");
        const icon = $(this);

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
                    $(this).find(".toggle-icon").removeClass("fa-minus").addClass("fa-plus");
                }
            });
        } else {
            // Show only level-1 rows
            level1Rows.show();
        }

        // Toggle icon on current group
        icon.toggleClass("fa-minus", !isVisible).toggleClass("fa-plus", isVisible);
    });

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
            return `<div class="analysis-action">
                                        <ul class="list-unstyled action-list">
                                            <li>
                                                <a href="#pestelanalysis-add-modal" data-bs-toggle="modal">
                                                    <span class="icon" data-bs-toggle="tooltip"
                                                        data-bs-placement="bottom" data-bs-title="Add Objective">
                                                        <i class="fas fa-plus title_edit_icon"></i>
                                                    </span>
                                                </a>
                                            </li>

                                        </ul>
                                    </div>`;
        } else {
            return `<div class="analysis-action p-0">
                                                            <ul class="list-unstyled action-list">
                                                                <li>
                                                                    <a href="#notes-modal" data-bs-toggle="modal">
                                                                        <span class="icon" data-bs-toggle="tooltip"
                                                                            data-bs-placement="bottom"
                                                                            data-bs-title="Notes">
                                                                            <i
                                                                                class="fas fa-file-alt title_edit_icon"></i>
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#action-modal" data-bs-toggle="modal">
                                                                        <span class="icon" data-bs-toggle="tooltip"
                                                                            data-bs-placement="bottom"
                                                                            data-bs-title="Action">
                                                                            <i class="fas fa-cog title_edit_icon"></i>

                                                                        </span>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#attachment-modal" data-bs-toggle="modal">
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

$(document).on("click", ".toggle-pestel-view", function () {

    const container = $("#contentload");

    const treeView = container.find(".pestel-analysis-tree");
    const tableView = container.find(".pestel-analysis-table");

     const icon = $(this).find("svg[data-lucide]");

    // Toggle
    if (treeView.is(":visible")) {
        treeView.hide();
        tableView.show();

        // Change to TABLE icon
        icon.attr("data-lucide", "table-properties");
        lucide.createIcons();
         // Adjust DataTable columns after showing
        setTimeout(() => {
            container.find("table.dataTable").DataTable().columns.adjust();
        }, 200);
    } else {
        tableView.hide();
        treeView.show();

         // Change to TREE icon
        icon.attr("data-lucide", "list-tree");
        lucide.createIcons();
    }
});
$(".pestel-analysis-table").hide();

});