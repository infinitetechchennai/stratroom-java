$(document).ready(function () {
    $.ajax({
        url: "strategy-analysis.json",
        method: "GET",
        dataType: "json",
        success: function (data) {
            let scorecard = data[0]; // Extract main scorecard object
           // renderTabs(scorecard.tab);
            renderTabContent(scorecard.tab);
        },
        error: function (xhr, status, error) {
            console.error("Error loading data:", error);
        }
    });


    const swotImageUrls = {
        good: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-green-i.svg",
        warning: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-yellow-i.svg",
        critical: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-red-i.svg"
    };
    const swotIconsUrls = {
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
                  <div class="card-body">

                   <ul class="nested-area swot-nested-main" id="strategy-${tablePrefix}">
                   ${renderList(tab.tabledata,tablePrefix)}
                   </ul>

               
                </div>
                </div>`);
        });
       
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
           
            const swotImg = swotIconsUrls[analysisType] ?
            `<img src="${swotIconsUrls[analysisType]}" width="18" height="18">` : "";
            console.log(swotImg);
    
            // Parent Row
            html += `<li class="nested-item non-draggable ${rowbg}" data-id="${rowId}">
                        ${toggleIcon}
                        <div class="card swot-box parent">
                            <div class="swot-section" id="${item.id}">
                                <div class="swot-content">
                                    <div class="icon text-white">
                                      
                                       <i class=" ${item.icon}"></i> 
                                    </div>
                                    <div class="content">
                                        <p class="swot-label text-uppercase text-white">
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

                    const swotStatus = child.status || "good";
                    
                    const riskImg = swotImageUrls[swotStatus] ?
                        `<img src="${swotImageUrls[swotStatus]}" width="16" height="16">` : "";

                       



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
                                <div class="card swot-box parent">
                                    <div class="swot-section flex-column">
                                        <div class="swot-content border-bottom">
                                            <div class="icon">
                                                 ${riskImg}
                                            </div>
                                            <div class="content">
                                                <div class="swot-head flex flex-wrap flex-sm-nowrap">
                                                    <p class="swot-label"><strong>${child.descripion}</strong></p>
                                                    ${getActionsMenu(level + 1)}
                                                </div>                                                  
                                            </div>
                                        </div>
                                        <div class="swot-details"> 
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
            return `<div class="swot-action">
                                        <ul class="list-unstyled action-list">
                                            <li>
                                                <a href="#swotanalysis-add-modal" data-bs-toggle="modal">
                                                    <span class="icon" data-bs-toggle="tooltip"
                                                        data-bs-placement="bottom" data-bs-title="Add Objective">
                                                        <i class="fas fa-plus title_edit_icon"></i>
                                                    </span>
                                                </a>
                                            </li>

                                        </ul>
                                    </div>`;
        } else {
            return `<div class="swot-action p-0">
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
});