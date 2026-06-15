var taskRetriveListData = [];
var typeValue = "Parent";
var deleteTaskId = null;
var deleteTaskParent = null;
// var typeChangeVlaue = "Swot"
var typeChangeVlaue = "GENERAL";
var taskDataList = []
var selectedCategory = {}
function retrivrtaskList(type) {
  console.log(type, "type");
  if (type == "GENERAL") {
    typeChangeVlaue = "General";
  }else if (type == "SWOT") {
    typeChangeVlaue = "Swot";
  } else if (type == "PESTEL") {
    typeChangeVlaue = "Pestel";
  }else if(type == "INITIATIVE"){
    typeChangeVlaue = "Initiative";
  }else if(type == "MEETINGS"){
    typeChangeVlaue = "Meetings";
  }else if(type == "INCIDENT"){
    typeChangeVlaue = "Incident";
  }else if(type == "AUDIT MANAGEMENT"){
    typeChangeVlaue = "AuditManagement";
  }else if(type == "RISK PLANNING"){
    typeChangeVlaue = "RiskPlanning";
  }
  console.log(type, "typeValue");
  const owner = $("#userPrincipal").val().trim();
  var datePeriod = $("#datePeriod").val();

  $.ajax({
    url:
      "/stratroom/retrieveTaskList/" +
      owner +
      "?dateRange=" +
      datePeriod +
      "&type=" +
      typeChangeVlaue,
    method: "GET",
    success: function (response) {
  
        taskDataList = response;
        console.log(response, "responseData"); 

        const tabsData = [
          { id: "general", title: "GENERAL" },
          { id: "swot", title: "SWOT" },
          { id: "pestel", title: "PESTEL" },
          { id: "initiative", title: "INITIATIVE" },
          { id: "meetings", title: "MEETINGS" },
          { id: "Incident", title: "INCIDENT" },
          { id: "AUDIT MANAGEMENT", title: "AUDIT MANAGEMENT" },
          { id: "RISK PLANNING", title: "RISK PLANNING" }
        ];
        let scorecard = response;
        renderTabs(tabsData);

           const processedResponse = response.map((category) => {
        if (category.taskDetailList.length == 0) {
          return {
            ...category,
            taskDetailList: [
              {
                id: 0,
                taskValue: { Name: "No tasks available" },
                priority: "LOW",
                status: "PENDING",
                startDate: null,
                endDate: null,
              },
            ],
          };
        }
        return category;
      });

      console.log(processedResponse, "processed response");
      renderTabContent(processedResponse);
        // renderTabContent(scorecard);
        lucide.createIcons();
      
    },
    error: function (xhr, status, error) {
      console.error("Error loading data:", error);
    },
  });
}


  //  function renderTabs(tabs) {
  //       console.log(tabs, "tabsData");
  //       let tabNavWrap = $("#tab-navigationWrap");
  //       tabNavWrap.empty();
  //       // Create dropdown button (visible only on small screens)
  //       let dropdownButton = `<button class="btn btn-primary dropdown-toggle d-lg-none" type="button"
  //                               id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
  //                               Users
  //                             </button>`;
    
  //       // Create dropdown menu with tabs
  //       let tabNav = $('<ul class="dropdown-menu nav nav-pills" id="tab-navigation" role="tablist" aria-orientation="horizontal"></ul>');
    
  //       tabs.forEach((tab, index) => {
  //           console.log(tab, index, "tabindex");
  //           let isActive = index == 0 ? "active" : "";
  //           let tablePrefix = tab.title.toLowerCase().replace(/\s+/g, "-");
  //           console.log(tablePrefix,typeChangeVlaue,  "tablePrefix");
  //           let tabId = `v-pills-${tablePrefix}`;
    
  //           let tabButton = `<button class="nav-link ${isActive}" id="${tabId}-tab" data-bs-toggle="pill"
  //                               data-bs-target="#${tabId}" type="button" role="tab" aria-controls="${tabId}"
  //                               aria-selected="${index == 0 ? "true" : "false"}">
  //                               <span class="nav-text" contenteditable="true"
  //                                   oninput="if (this.innerText.length > 36) this.innerText = this.innerText.substring(0, 36);">
  //                                   ${tab.title}
  //                               </span>
  //                            </button>`;
            
  //           tabNav.append(tabButton);
  //       });
    
  //       // Append dropdown button and tab navigation to wrapper
  //       tabNavWrap.append(dropdownButton);
  //       tabNavWrap.append(tabNav);
  //  }

  function renderTabs(tabs) {
    let tabNavWrap = $("#tab-navigationWrap");
    tabNavWrap.empty();

    let dropdownButton = `<button class="btn btn-primary dropdown-toggle d-lg-none" type="button"
                            id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            Users
                          </button>`;

    let tabNav = $('<ul class="dropdown-menu nav nav-pills" id="tab-navigation" role="tablist"></ul>');

    tabs.forEach((tab, index) => {
        let tablePrefix = tab.title.toLowerCase().replace(/\s+/g, "-");

        if(tablePrefix == "audit-management") {
            tablePrefix  = "auditmanagement";
        }else if(tablePrefix == "risk-planning") {
            tablePrefix  = "riskplanning"; 
        }
      

        let isActive = tablePrefix == typeChangeVlaue.toLowerCase() ? "active" : "";
        let isSelected = tablePrefix == typeChangeVlaue.toLowerCase() ? "true" : "false";

        let tabId = `v-pills-${tablePrefix}`;


        console.log(tablePrefix, isActive, "tablePrefix");
        let tabButton = `
            <button class="nav-link ${isActive}" 
                id="${tabId}-tab" 
                data-bs-toggle="pill"
                data-bs-target="#${tabId}" 
                type="button" 
                role="tab"
                aria-controls="${tabId}"
                aria-selected="${isSelected}">
                
                <span class="nav-text" contenteditable="true"
                    oninput="if (this.innerText.length > 36) this.innerText = this.innerText.substring(0, 36);">
                    ${tab.title}
                </span>
            </button>
        `;

        tabNav.append(tabButton);
    });

    tabNavWrap.append(dropdownButton);
    tabNavWrap.append(tabNav);
}


     $(document).on('click', '#tab-navigation .nav-link', function () {
        var selectedText = $(this).find('.nav-text').text().trim();
        console.log(selectedText, "selectedTest")
        $('#dropdownMenuButton').text(selectedText);
        retrivrtaskList(selectedText);
    });


  function renderTabContent(tabs) {
    const storedLanguage = localStorage.getItem("selectedLang") || "en"
    var myTaskHeader = "My Tasks"
    var taskIdHeader = "TASK ID"
    var taskNameHeader = "TASK NAME"
    var impactHeader = "IMPACT"
    var dependencyHeader = "DEPENDENCY"
    var ownerHeader = "OWNER"
    var priorityHeader = "PRIORITY"
    var statusHeader = "STATUS"
    var startdateHeader = "START DATE"
    var dueDateHeader = "DUE DATE"
    var durationHeader ="DURATION"
    var completeHeader = "COMPLETE %"
    var actionHeader = "ACTIONS"
    var saveHeader = "Save"
    var deleteHeader = "Edit"
    if (storedLanguage == "ar") {
    myTaskHeader = "مهامي";
    taskIdHeader = "معرّف المهمة";
    taskNameHeader = "اسم المهمة";
    impactHeader = "التأثير";
    dependencyHeader = "الاعتمادية";
    ownerHeader = "المالك";
    priorityHeader = "الأولوية";
    statusHeader = "الحالة";
    startdateHeader = "تاريخ البدء";
    dueDateHeader = "تاريخ الاستحقاق";
    durationHeader = "المدة";
    completeHeader = "٪ منجز";
    actionHeader = "الإجراءات";
    saveHeader = "حفظ";
    deleteHeader = "حذف";

    } else if (storedLanguage == "am") {
      myTaskHeader = "የእኔ ተግባሮች";
      taskIdHeader = "የተግባር መለያ";
      taskNameHeader = "የተግባር ስም";
      impactHeader = "ተፅእኖ";
      dependencyHeader = "ጥገኝነት";
      ownerHeader = "ባለቤት";
      priorityHeader = "ቅድሚያ";
      statusHeader = "ሁኔታ";
      startdateHeader = "የመጀመሪያ ቀን";
      dueDateHeader = "የመጨረሻ ቀን";
      durationHeader = "ቆይታ";
      completeHeader = "በመቶ ተጠናቋል";
      actionHeader = "እርምጃዎች";
      saveHeader = "አስቀምጥ";
      deleteHeader = "ሰርዝ";

    } else {
      myTaskHeader = "My Tasks";
      taskIdHeader = "TASK ID";
      taskNameHeader = "TASK NAME";
      impactHeader = "IMPACT";
      dependencyHeader = "DEPENDENCY";
      ownerHeader = "OWNER";
      priorityHeader = "PRIORITY";
      statusHeader = "STATUS";
      startdateHeader = "START DATE";
      dueDateHeader = "DUE DATE";
      durationHeader = "DURATION";
      completeHeader = "COMPLETE %";
      actionHeader = "ACTIONS";
      saveHeader = "Save";
      deleteHeader = "Delete";
    }

    console.log(tabs, "renderTabContent called");
    const tabContent = $("#task-content").empty();

    // Create a single "My Tasks" container
    const tabId = "task-my-tasks";
    const tablePrefix = "my-tasks";

    tabContent.append(`
      <div id="${tabId}">
        <div class="card custom-card table-card">
          <div class="card-header">
            <div class="c-header-left">                              
              <h5 class="card-title">                 
                <strong editable="true" contenteditable="true"
                onkeypress="return (this.innerText.length <= 36)">`+myTaskHeader+`</strong>
              </h5>
            </div>
            <div class="card-actions">
              <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#task-add-modal" onclick="handleAdd('parent')">
                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                  <i class="fas fa-plus"></i>
                </span>
              </button>

                  
         
            </div>
          </div>
          <div class="card-body">
            <table class="table table-sm border w-100" id="table-${tablePrefix}" style="--stratroom-border-color:rgba(var(--stratroom-black-rgb),0.04)">
              <thead class="text-center">
                <tr>
                  <th>`+taskIdHeader+`</th>
                  <th>`+taskNameHeader+`</th> 
                  <th>`+dependencyHeader+`</th>
                  <th>`+ownerHeader+` </th>                
                  <th>`+priorityHeader+`</th>
                  <th>`+statusHeader+`</th>
                  <th>`+startdateHeader+`</th>
                  <th>`+dueDateHeader+`</th>
                  <th>`+durationHeader+`</th>
                  <th>`+completeHeader+`</th>
                  <th>Attachments</th>
                  <th>`+actionHeader+`</th>
                </tr>
              </thead>
              <tbody>${renderTaskCategories(tabs, tablePrefix)}</tbody>
            </table>
          </div>
        </div>
      </div>
    `);

    setTimeout(() => {
      initializeDataTable(`#table-${tablePrefix}`);
    }, 300);
  }


function getInitials(name) {
    if (!name) return "?";
    const words = name.trim().split(" ");
    if (words.length == 1) {
        return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0][0] + words[1][0]).toUpperCase();
}





  function renderTaskCategories(tabs, parentId) {
    console.log(tabs, "tabsData");
    let html = "";
    let groupIndex = 0;
    const task = [];

    const maxVisible = 2;

    const owners = task?.taskCategoryValue?.dependency || [];
    const visibleOwners = owners.slice(0, maxVisible);

     const remainingOwnersCount = owners.length;


    const responsibleOwners = visibleOwners
      .map((user) => createAvatar(user, true))
      .join("");

    // Create the "+X more" button for owners
    const moreOwners = `  
 <li class="avatar avatar-xs pull-up" href="#parent_attendess-list" data-bs-toggle="modal" 
        onclick="openParentUserModal(this, 'dependencies', ${tabs.id})">
        <span class="avatar-initial rounded-circle bg-label-warning" 
              data-bs-toggle="tooltip" 
              data-bs-placement="top" 
             
              data-bs-original-title="${remainingOwnersCount} more">
            +${remainingOwnersCount}
        </span>
    </li>`;

    const ownersHTML = responsibleOwners + moreOwners;


    //priority
      function getPriorityBadge(priority, type) {
      console.log(priority, type, "getPriorityBadge called");
      var priorityMap = {};
      if( type == "status") {
        priorityMap = {
        Open: "label-bg-red",
        "In Progress": "label-bg-yellow",
        Completed: "label-bg-green",
        Pending: "label-bg-gray",
        }
      }else {
        priorityMap = {
        High: "label-bg-red",
        Medium: "label-bg-yellow",
        Low: "label-bg-green",
      };
      }
      const badgePriorityClass = priorityMap[priority] || "label-bg-gray";
      return `<span class="badge ${badgePriorityClass} rounded-pill dropdown-toggle ms-auto" style="font-size: 12px;">${priority}</span>`;
    }

    //priority

    function parseDependency(dep) {
    if (!dep) return [];

    // already array
    if (Array.isArray(dep)) return dep;

    // string → array
    return dep
        .split(",")
        .map(id => id.trim())
        .filter(Boolean);
}


    tabs.forEach((tab) => {
          const createAvatar = (user, isOwner = true) => {
      if (user.image) {
        return `
                <li class="avatar avatar-xs pull-up" title="${user.name}">
                    <img src="${user.image}" class="rounded-circle" width="24" height="24">
                </li>`;
      } else {
        // Get initials from name
        const initials = user.name
          ? user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
          : "?";
        const bgClass = isOwner ? "bg-label-primary" : "bg-label-secondary";
        return `
                <li class="avatar avatar-xs pull-up" title="${user.name}">
                    <span class="avatar-initial rounded-circle ${bgClass}">
                        ${initials.substring(0, 2)}
                    </span>
                </li>`;
      }
    };


    const task = [];

    const maxVisible = 2;

     
    const dependency = Array.isArray(tab?.taskCategoryValue?.dependencies)
    ? tab.taskCategoryValue.dependencies
    : []; 

     const owners = Array.isArray(tab?.taskCategoryValue?.owners)
    ? tab.taskCategoryValue.owners
    : []; 

    console.log(dependency, "owners");
    const visibleOwners =  owners?.slice(0, maxVisible);

    const visibleDependencies = dependency?.slice(0, maxVisible);

     const remainingOwnersCount = owners.length;

      const remainingdependencyCount = dependency.length;


    const responsibleOwners = visibleOwners
      .map((user) => createAvatar(user, true))
      .join("");

    const responsibleDependencies = visibleDependencies
      .map((user) => createAvatar(user, true))
      .join("");  

    // Create the "+X more" button for owners
    const moreOwners = `  
 <li class="avatar avatar-xs pull-up" href="#parent_attendess-list" data-bs-toggle="modal" 
        onclick="openParentUserModal(this, 'owners', ${tabs.id})">
        <span class="avatar-initial rounded-circle bg-label-warning" 
              data-bs-toggle="tooltip" 
              data-bs-placement="top" 
             
              data-bs-original-title="${remainingOwnersCount} more">
            +${remainingOwnersCount}
        </span>
    </li>`;


    const moreDependency = `  
 <li class="avatar avatar-xs pull-up" href="#parent_attendess-list" data-bs-toggle="modal" 
        onclick="openParentUserModal(this, 'dependencies', ${tabs.id})">
        <span class="avatar-initial rounded-circle bg-label-warning" 
              data-bs-toggle="tooltip" 
              data-bs-placement="top" 
             
              data-bs-original-title="${remainingdependencyCount} more">
            +${remainingdependencyCount}
        </span>
    </li>`;

    const ownersHTML = responsibleOwners + moreOwners;

    const dependencyHTML = responsibleDependencies + moreDependency;


    //priority
      function getPriorityBadge(priority, type) {
      console.log(priority, type, "getPriorityBadge called");
      var priorityMap = {};
      if( type == "status") {
        priorityMap = {
        Open: "label-bg-red",
        "In Progress": "label-bg-yellow",
        Completed: "label-bg-green",
        Pending: "label-bg-gray",
        }
      }else {
        priorityMap = {
        High: "label-bg-red",
        Medium: "label-bg-yellow",
        Low: "label-bg-green",
      };
      }
      const badgePriorityClass = priorityMap[priority] || "label-bg-gray";
      return `<span class="badge ${badgePriorityClass} rounded-pill dropdown-toggle ms-auto" style="font-size: 12px;">${priority}</span>`;
    }
      console.log(tab, "tabvaluedata");
      const category = tab.taskCategoryValue.category;
      const parentProgress = tab.taskCategoryValue.totalProgress || "0%";
      
      const groupId = `group-${parentId}-${groupIndex++}`;
      const hasTasks = tab.taskDetailList.length > 0;
      const toggleIcon = hasTasks
        ? `<i class="fas fa-minus toggle-icon" data-group="${groupId}" style="cursor:pointer;"></i>`
        : "";

      // Always render the category header row
      html += `<tr class="level-0 bg-light group-header"  data-id="${groupId}"
                  data-task-category-id="${tab.id}"
                  data-owner="${tab.owner}"
                  data-created-by="${tab.createdBy}"
                  role="row">             
                  <td class="text-nowrap">
                   <div class="d-flex gap-1 align-items-center">
                     <div>${toggleIcon} <strong>${tab.id}</strong></div>
                    
                    
                   </div>
                 </td>
                 <td class="text-center text-nowrap">${tab?.taskCategoryValue?.category || "N/A"}</td>

              <td class="text-center text-nowrap">
                <ul class="list-unstyled d-flex align-items-center align-items-center justify-content-center avatar-group mb-0">${dependencyHTML}</ul>
              </td>

              <td class="text-center text-nowrap">
                <ul class="list-unstyled d-flex align-items-center align-items-center justify-content-center avatar-group mb-0">${ownersHTML}</ul>
              </td>
                 
              <td class="text-center text-nowrap priority editable-priority"
                  data-type="priority"
                  data-task-id="" 
                  data-parent-id="" >
                ${getPriorityBadge(tab?.taskCategoryValue?.priority ? tab?.taskCategoryValue?.priority : "", "priority")}
              </td>
          
           <td class="text-center text-nowrap status editable-priority"
                   data-type="status"
                  data-task-id="" 
                  data-parent-id="" >
                ${getPriorityBadge(tab?.taskCategoryValue?.status ? tab?.taskCategoryValue?.status : "", "status")}
              </td>

          <td class="text-center text-nowrap editableNext_review_date_parent" id="editableNext_review_date"  data-type="startDate"
              data-task-id="" 
              data-parent-id="" >
                ${
                  tab?.taskCategoryValue?.startDate ? tab?.taskCategoryValue?.startDate
                    : ""
                }
          </td>

           <td class="text-center text-nowrap editableLast_assessment_date_parent"  data-type="endDate"
              data-task-id="" 
              data-parent-id="" >
                ${
                  tab?.taskCategoryValue?.endDate ? tab?.taskCategoryValue?.endDate
                    : ""
                }
          </td>
        
         

          <td class="text-center text-nowrap">
            ${tab?.taskCategoryValue?.startDate && tab?.taskCategoryValue?.endDate
              ? calculateDayDifference(tab?.taskCategoryValue?.startDate + " - " + tab?.taskCategoryValue?.endDate)
              : ""
            }
          </td>
          <td class="editable-percent"  date-type="progress" style="margin-top : 10px;">
              <div class="progress-wrap green">
                  <div class="progress flex-grow-1" style="--stratroom-bg-opacity:1">
                      <div class="progress-bar progress-bar-striped rounded-pill" 
                          role="progressbar" 
                          style="width: ${tab?.taskCategoryValue.progress}%;
                                  background-color: ${tab?.taskCategoryValue.progress <= 39 ? '#dc3545' : 
                                                    tab?.taskCategoryValue.progress <= 75 ? '#ffc107' : 
                                                    '#198754'};" 
                          data-percent="${tab?.taskCategoryValue.progress}"></div>
                  </div>
                  <span class="badge">${tab?.taskCategoryValue?.progress ? tab?.taskCategoryValue?.progress : 0}%</span>
              </div>
          </td>
          <td class="text-center text-nowrap">
            <span class="icon">
              <i data-lucide="file-text" style="width: 16px; height: 16px;"></i>
            </span>
          </td>
 
          <td><div class="d-flex gap-3 justify-content-between align-items-center">              
              <div class="table-actions justify-content-end">
                <button class="btn btn-sm btn-primary px-2" type="button" onclick=handleTaskCategoryUpdate(this)>
                       Save
                  <i data-lucide="save" style="width: 16px; height: 16px;"></i>
                </button>
                  <a data-bs-toggle="modal" data-bs-target="#task-add-modal" class="btn btn-sm btn-outline-icon" style="--stratroom-btn-color:var(--stratroom-primary);--stratroom-btn-border-color:rgba(var(--stratroom-primary-rgb),0.1);--stratroom-btn-hover-color:var(--stratroom-primary);--stratroom-btn-hover-bg:rgba(var(--stratroom-primary-rgb),0.1)" onclick="handleAdd('child', '${tab.id}')">
                      <span class="icon">
                        <i data-lucide="plus" style="width: 16px; height: 16px;"></i>
                      </span>
                  </a>    
                <div class="dropdown" data-task-id="${tab.id}">
                  <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                        <i data-lucide="ellipsis-vertical" style="width: 16px; height: 16px;"></i>
                  </button>
                  <ul class="dropdown-menu border-0 shadow">                      
                      <!-- <li><a class="dropdown-item" href="#task-add-modal" data-bs-toggle="modal">Edit</a></li> --!>                     
                      <li><a class="dropdown-item delete-taskParent" href="#delete-modalParent" data-bs-toggle="modal">Delete</a></li>
                  </ul>
                </div>            
                </div>
              </div>
        </td>
      </tr>`;

      // Render task details for this category if they exist
  if (hasTasks && Array.isArray(tab?.taskDetailList)) {
  tab.taskDetailList.forEach((task, index) => {
    try {
      const childId = `${groupId}-item-${index}`;
      if (task && typeof renderTaskRow == 'function') {
        const taskHtml = renderTaskRow(task, tab, childId, 1, groupId);
        if (taskHtml) {
          html += taskHtml;
        }
      }
    } catch (e) {
      console.error(`Error rendering task row ${index}:`, e);
      // Optionally add error placeholder HTML if needed
      html += `<div class="error">Error loading task ${index + 1}</div>`;
    }
  });
}else {
        // Add a placeholder row when there are no tasks
        html += `<tr class="level-1" data-group-id="${groupId}" style="">
                      <td colspan="12" class="text-center py-3">
                        <em>No tasks in this category</em>
                      </td>
                    </tr>`;
      }
    });

    return html;
  }

  function renderTaskRow(task, categoryValue, rowId, level, groupId) {
    const storedLanguage = localStorage.getItem("selectedLang")
    var saveHeader = "Save"
    var deleteHeader = "Edit"
      if (storedLanguage == "ar") {
        saveHeader = "حفظ";
        deleteHeader = "حذف";

      } else if (storedLanguage == "am") {
        saveHeader = "አስቀምጥ";
        deleteHeader = "ሰርዝ";

      } else {
        saveHeader = "Save";
        deleteHeader = "Delete";
      }

    console.log(task, categoryValue, "task in renderTaskRow");
    const maxVisible = 2;

    // Extract owners and dependencies from the task response
    const owners = task.multipleOwerlist || [];
    const dependencies = task.multipleUserlist || [];

    const visibleOwners = owners.slice(0, maxVisible);
    const remainingOwnersCount = owners.length;

    const visibleDependency = dependencies.slice(0, maxVisible);
    const remainingDependencyCount = dependencies.length;

    // Function to create avatar HTML
    const createAvatar = (user, isOwner = true) => {
      if (user.image) {
        return `
                <li class="avatar avatar-xs pull-up" title="${user.name}">
                    <img src="${user.image}" class="rounded-circle" width="24" height="24">
                </li>`;
      } else {
        // Get initials from name
        const initials = user.name
          ? user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
          : "?";
        const bgClass = isOwner ? "bg-label-primary" : "bg-label-secondary";
        return `
                <li class="avatar avatar-xs pull-up" title="${user.name}">
                    <span class="avatar-initial rounded-circle ${bgClass}">
                        ${initials.substring(0, 2)}
                    </span>
                </li>`;
      }
    };

    // Create owners HTML
    const responsibleOwners = visibleOwners
      .map((user) => createAvatar(user, true))
      .join("");

    // Create the "+X more" button for owners
    const moreOwners = `  
 <li class="avatar avatar-xs pull-up" href="#attendess-list" data-bs-toggle="modal" 
        onclick="openUserModal(this, 'owners', ${task.id}, ${categoryValue.id})">
        <span class="avatar-initial rounded-circle bg-label-warning" 
              data-bs-toggle="tooltip" 
              data-bs-placement="top" 
             
              data-bs-original-title="${remainingOwnersCount} more">
            +${remainingOwnersCount}
        </span>
    </li>`;

    const ownersHTML = responsibleOwners + moreOwners;

    // Create dependencies HTML
    const responsibleDependency = visibleDependency
      .map((user) => createAvatar(user, false))
      .join("");

    // Create the "+X more" button for dependencies

    const moreDependency = `
    <li class="avatar avatar-xs pull-up" href="#attendess-list" data-bs-toggle="modal" 
        onclick="openUserModal(this, 'users', ${task.id}, ${categoryValue.id})">
        <span class="avatar-initial rounded-circle bg-label-warning" 
              data-bs-toggle="tooltip" 
              data-bs-placement="top" 
             
              data-bs-original-title="${remainingDependencyCount} more">
            +${remainingDependencyCount}
        </span>
    </li>`;

    const dependencyHTML = responsibleDependency + moreDependency;

    // Rest of your existing functions (getStatusBadge, getPriorityBadge, etc.)
    // function getStatusBadge(status) {
    //   const statusMap = {
    //     Open: "label-bg-red",
    //     "In Progress": "label-bg-yellow",
    //     Completed: "label-bg-green",
    //     Pending: "label-bg-gray",
    //   };
    //   const badgeStatusClass = statusMap[status] || "label-bg-gray";
    //   return `<span class="badge ${badgeStatusClass} rounded-pill dropdown-toggle ms-auto" style="font-size: 12px;">${status}</span>`;
    // }

   
    // function getStatusBadge(priority) {
    //   const priorityMap = {
    //     Open: "label-bg-red",
    //     "In Progress": "label-bg-yellow",
    //     Completed: "label-bg-green",
    //     Pending: "label-bg-gray",
    //   };
    //   const badgePriorityClass = priorityMap[priority] || "label-bg-gray";
    //   return `<span class="badge ${badgePriorityClass} rounded-pill dropdown-toggle ms-auto" style="font-size: 12px;">${priority}</span>`;
    // }


    function getStatusBadgesValues(priority) {
       const priorityMap = {
        // High: "label-bg-red",
        // Medium: "label-bg-yellow",
        // Low: "label-bg-green",
        Open: "label-bg-red",
        "In Progress": "label-bg-yellow",
        Completed: "label-bg-green",
        Pending: "label-bg-gray",
      };
      const badgePriorityClass = priorityMap[priority] || "label-bg-gray";
      return `<span class="badge ${badgePriorityClass} rounded-pill dropdown-toggle ms-auto" style="font-size: 12px;">${priority}</span>`;
    }


    function getPriorityBadge(priority, type) {
      console.log(priority, type, "getPriorityBadge called");
      var priorityMap = {};
      if( type == "status") {
        priorityMap = {
        Open: "label-bg-red",
        "In Progress": "label-bg-yellow",
        Completed: "label-bg-green",
        Pending: "label-bg-gray",

        OPEN: "label-bg-red",
        "In Progress": "label-bg-yellow",
        COMPLETED: "label-bg-green",
        PENDING: "label-bg-gray",
        }
      }else {
        priorityMap = {
        High: "label-bg-red",
        Medium: "label-bg-yellow",
        Low: "label-bg-green",

        high: "label-bg-red",
        medium: "label-bg-yellow",
        low: "label-bg-green",

        hIGH: "label-bg-red",
        MEDIUM: "label-bg-yellow",
        LOW: "label-bg-green",
      };
      }
      const badgePriorityClass = priorityMap[priority] || "label-bg-gray";
      return `<span class="badge ${badgePriorityClass} rounded-pill dropdown-toggle ms-auto" style="font-size: 12px;">${priority}</span>`;
    }

    const badgeColors = [
      "label-bg-indigo",
      "label-bg-blue",
      "label-bg-orange",
      "label-bg-dark",
      "label-bg-cyan",
      "label-bg-teal",
      "label-bg-red",
      "label-bg-yellow",
      "label-bg-green",
      "label-bg-gray"
    ];

    const getRandomBadgeClass = () =>
      badgeColors[Math.floor(Math.random() * badgeColors.length)];

    const impactsBadge = Array.isArray(task.taskValue.impact)
      ? task.taskValue.impact
          .map(
            (impact) =>
              `<span class="badge ${getRandomBadgeClass()}">${impact}</span>`
          )
          .join("")
      : task.taskValue.impact
      ? `<span class="badge ${getRandomBadgeClass()}">${
          task.taskValue.impact
        }</span>`
      : "";

    const indent = level * 20;
    const ownerIds = task.multipleOwerlist?.map((u) => u.id).join(",") || "";
    const userIds = task.multipleUserlist?.map((u) => u.id).join(",") || "";

    let actionsMenu = getActionsMenu();

    return `<tr class="level-${level}" data-id="${rowId}" data-group-id="${groupId}" 
             data-parent-id="${categoryValue.id}" 
             data-multiple-owners="${ownerIds}" 
             data-multiple-users="${userIds}">
              <td class="text-center text-nowrap" style="padding-left:${indent}px;">
                <div class="d-flex gap-2">${task.id || ""}</div>
              </td>
              <td class="text-center text-nowrap">
                <div class="text-center flex-wrap" style="min-width:260px">${
                  task.taskValue.Name || ""
                }</div>
              </td>
             
              <td class="text-center text-nowrap">
                <ul class="list-unstyled d-flex align-items-center align-items-center justify-content-center avatar-group mb-0">${ownersHTML}</ul>
              </td>
              <td class="text-center text-nowrap">
                <ul class="list-unstyled d-flex align-items-center justify-content-center avatar-group mb-0">${dependencyHTML}</ul>
              </td>
              <td class="text-center text-nowrap priority editable-priority"
                  data-type="priority"
                  data-task-id="${task.id}" 
                  data-parent-id="${categoryValue.id}" >
                ${getPriorityBadge(task?.priority ? task?.priority : "", "priority")}
              </td>

                <td class="text-center text-nowrap status editable-priority"
                   data-type="status"
                  data-task-id="${task.id}" 
                  data-parent-id="${categoryValue.id}" >
                ${getPriorityBadge(task?.status ? task?.status : "", "status")}
              </td>
         
            <td class="text-center text-nowrap editableNext_review_date" id="editableNext_review_date"  data-type="startDate"
              data-task-id="${task.id}" 
              data-parent-id="${categoryValue.id}" >
                ${
                  task.taskValue.startDate ? task.taskValue.startDate
                    : ""
                }
            </td>
            <td class="text-center text-nowrap editableLast_assessment_date" data-type="dueDate"
              data-task-id="${task.id}" 
              data-parent-id="${categoryValue.id}" >
              ${task.taskValue.endDate ?
                    task.taskValue.endDate
                : ""
              }
            </td>
            <td class="text-center text-nowrap">
              ${task.taskValue.startDate && task.taskValue.endDate
                ? calculateDayDifference(task.taskValue.startDate + " - " + task.taskValue.endDate)
                : ""
              }
            </td>
          <td class="editable-percent"  date-type="progress">
              <div class="progress-wrap green">
                  <div class="progress flex-grow-1" style="--stratroom-bg-opacity:1">
                      <div class="progress-bar progress-bar-striped rounded-pill" 
                          role="progressbar" 
                          style="width: ${task.taskValue.progress}%;
                                  background-color: ${task.taskValue.progress <= 39 ? '#dc3545' : 
                                                    task.taskValue.progress <= 75 ? '#ffc107' : 
                                                    '#198754'};" 
                          data-percent="${task.taskValue.progress}"></div>
                  </div>
                  <span class="badge">${task?.taskValue?.progress ? task?.taskValue?.progress : 0}%</span>
              </div>
          </td>
          <td class="text-center text-nowrap">
            <span class="icon">
              <i data-lucide="file-text" style="width: 16px; height: 16px;"></i>
            </span>
          </td>
          <td class="text-center"   data-task-id="${task.id}" 
              data-parent-id="${categoryValue.id}"  data-multiple-owners="${ownerIds}"
              data-multiple-users="${userIds}"
              >
           <div class="table-actions justify-content-end">
         <button class="btn btn-sm btn-primary px-2" type="button" onclick="handleRowUpdate(this)">
                       `+saveHeader+`
                    <i class="fas fa-save"></i>
                    </button>
                <div class="dropdown" data-task-id="${task.id}">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" style="background: #e9ecef; width: 25px; height: 4vh; border-radius: 5px; text-align: center;">
                        <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                    </button>
                    <ul class="dropdown-menu border-0 shadow">                                            
                          <li><a class="dropdown-item delete-task" href="#delete-modal" data-bs-toggle="modal">`+deleteHeader+`</a></li>
                        </ul> 
                </div>
            </div></div>
          </td>
          </tr>`;
  }

  // Initialize DataTable with proper configuration
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
            const rows = api.rows({ page: "current" }).nodes().to$();
            const insertedGroups = new Set();

            rows.each(function () {
              const groupId = $(this).data("group-id");
              if (
                groupId &&
                groupHeaders[groupId] &&
                !insertedGroups.has(groupId)
              ) {
                groupHeaders[groupId].insertBefore($(this));
                insertedGroups.add(groupId);
              }
            });

            // Cleanup DT styling
            $(settings.nTable).find("tr.group-header").removeClass("odd even");
            $(".dataTables_filter").addClass("d-none");
          },
        });

        $(document).on("change", ".filter-status", function () {
          let searchTerms = [];
          $(".filter-status:checked").each(function () {
            searchTerms.push("^" + $(this).val() + "$");
          });

          table.column(6).search(searchTerms.join("|"), true, false).draw();
        });
      } else {
        $(selector).DataTable().columns.adjust().draw();
      }
    }, 200);
  }


  
function getActionsMenu() {
         return `
         <div class="table-actions justify-content-end">
         <button class="btn btn-sm btn-primary px-2" type="button" onclick="handleRowUpdate(this)">
                       Save
                    <i class="fas fa-save"></i>
                    </button>
                <div class="dropdown" >
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" >
                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                    </button>
                    <ul class="dropdown-menu border-0 shadow">                      
                       <!-- <li><a class="dropdown-item" href="#task-add-modal" data-bs-toggle="modal">Edit</a></li> --!>                
                        <li><a class="dropdown-item delete-task" href="#delete-modal" data-bs-toggle="modal">Delete</a></li>
                    </ul>
                </div>
            </div></div>`;
}


function calculateDayDifference(dateRange) {
  console.log(dateRange, "dateRange in calculateDayDifference");
  
  if (!dateRange || typeof dateRange !== 'string') return "Invalid date range";
  if (!dateRange.includes(" - ")) return "Invalid format";

  const [startStr, endStr] = dateRange.split(" - ").map(s => s.trim());
  if (!startStr || !endStr) return "Invalid dates";

  // Try parsing multiple date formats
  const parseDate = (str) => {
    let date;

    // Format 1: YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
      const [year, month, day] = str.split("-").map(Number);
      date = new Date(year, month - 1, day);
    }
    // Format 2: DD-MM-YYYY
    else if (/^\d{2}-\d{2}-\d{4}$/.test(str)) {
      const [day, month, year] = str.split("-").map(Number);
      date = new Date(year, month - 1, day);
    }
    // Format 3: MMM DD, YYYY
    else {
      date = new Date(str); // JS Date can parse "Aug 22, 2025"
    }

    if (isNaN(date.getTime())) return null;
    return date;
  };

  const startDate = parseDate(startStr);
  const endDate = parseDate(endStr);

  if (!startDate || !endDate) return "Invalid date";

  const diffTime = endDate - startDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays + " days";
}



  
  function updateAllProgressBars() {
    $(".progress-bar[data-percent]").each(function () {
      const $bar = $(this);
      const rawPercent = $bar.data("percent");

      if (rawPercent == undefined || isNaN(rawPercent)) return;

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

$(document).on("click", "td.editable-summaryPercent", function () {
  const $cell = $(this);
  const current = parseInt($cell.find(".badge").text()) || 0;

  if ($cell.find("input").length) return;

  const $input = $(
    '<input type="number" min="0" max="100" class="form-control form-control-sm">'
  );
  $input.val(current);
  $cell.empty().append($input);
  $input.focus().select();

  $input.on("blur change", function () {
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

$(document).ready(function () {
  // Load JSON and render
  retrivrtaskList("GENERAL");



  // Event listener to update dropdown button text
  $(document).on("click", "#tab-navigation .nav-link", function () {
    var selectedText = $(this).find(".nav-text").text().trim();
    $("#dropdownMenuButton").text(selectedText);
    console.log(selectedText, "selectedText");
    retrivrtaskList(selectedText);
  });

  $(document).on("shown.bs.tab", 'button[data-bs-toggle="pill"]', function (e) {
    let targetTableId = $(e.target).data("bs-target"); 
    let tableSelector = `${targetTableId} table`; 

    if ($.fn.DataTable && !$.fn.DataTable.isDataTable(tableSelector)) {
      initializeDataTable(tableSelector);
    } else {
      $(tableSelector).DataTable().columns.adjust().draw();
    }
  });
  // Toggle: Group - toggles only level-1 rows and icon updates accordingly
  $(document).on("click", ".toggle-icon[data-group]", function () {
    const groupId = $(this).data("group");
    const iconWrapper = $(this);
    const icon = iconWrapper.find("svg[data-lucide]");

    // Select all rows under the group
    const allRows = $(`tr[data-group-id='${groupId}']`);

    // Filter only level-1 rows
    const level1Rows = allRows.filter(function () {
      const level = parseInt(
        $(this)
          .attr("class")
          .match(/level-(\d+)/)?.[1]
      );
      return level == 1;
    });

    const isVisible = level1Rows.is(":visible");

    if (isVisible) {
      // Hide all nested rows (level-1 and beyond)
      allRows.each(function () {
        const rowLevel =
          parseInt(
            $(this)
              .attr("class")
              .match(/level-(\d+)/)?.[1]
          ) || 0;
        if (rowLevel > 0) {
          $(this).hide();
          // Reset inner toggle icons
          $(this)
            .find(".toggle-icon svg[data-lucide]")
            .attr("data-lucide", "plus");
        }
      });
    } else {
      // Show only level-1 rows
      level1Rows.show();
    }

    // Toggle icon on current group
    //icon.toggleClass("fa-minus", !isVisible).toggleClass("fa-plus", isVisible);
    const currentType = icon.attr("data-lucide");
    icon.attr("data-lucide", currentType == "plus" ? "minus" : "plus");
    lucide.createIcons({ width: 14, height: 14 });
  });
  // Toggle: Nested
  $(document).on("click", ".toggle-icon[data-target]", function () {
    const target = $(this).data("target");
    const icon = $(this);
    const currentRow = icon.closest("tr");
    const currentLevel =
      parseInt(currentRow.attr("class").match(/level-(\d+)/)?.[1]) || 1;

    const allChildren = $(`tr[data-id^="${target}"]`).filter(function () {
      const rowLevel =
        parseInt(
          $(this)
            .attr("class")
            .match(/level-(\d+)/)?.[1]
        ) || 0;
      return rowLevel > currentLevel;
    });

    const immediateChildren = allChildren.filter(function () {
      return (
        parseInt(
          $(this)
            .attr("class")
            .match(/level-(\d+)/)?.[1]
        ) ==
        currentLevel + 1
      );
    });

    const isVisible = immediateChildren.is(":visible");

    if (isVisible) {
      allChildren.hide();
      allChildren
        .find(".toggle-icon")
        .removeClass("fa-minus")
        .addClass("fa-plus");
      icon.removeClass("fa-minus").addClass("fa-plus");
    } else {
      immediateChildren.show();
      icon.removeClass("fa-plus").addClass("fa-minus");
    }
    $("#table-my-task").DataTable().columns.adjust().draw();
  });
  function updateAllProgressBars() {
    $(".progress-bar[data-percent]").each(function () {
      const $bar = $(this);
      const rawPercent = $bar.data("percent");

      if (rawPercent == undefined || isNaN(rawPercent)) return;

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
});

$(document).on("click", "td.editable-summaryPriority", function () {
  const $cell = $(this);
  // const currentText = $cell.text().trim();

  // Avoid creating multiple selects
  if ($cell.find("select").length) return;

  // Create and populate the <select>
  const $select = $("<select class='form-select form-select-sm'>").append(
    priorityOptions.map((priority) =>
      // $("<option>").val(priority).text(priority).prop("selected", priority == currentText)
      $("<option>").val(priority).text(priority).prop("selected", priority)
    )
  );
  $cell.empty().append($select);
  $select
    .select2({
      width: "100%",
      selectionCssClass: "form-control form-control-sm p-0",
    })
    .focus();

  // Update badge on change/blur
  $select.on("blur change", function () {
    const newSummaryPriority = $select.val();
    $cell.html(getSummaryPriorityBadge(newSummaryPriority));
  });

  $(document).on("mousedown.select2Outside", function (event) {
    if (
      !$(event.target).closest(".select2-container, .select-dropdown").length
    ) {
      const newSummaryPriority = $select.val();
      $cell.html(getSummaryPriorityBadge(newSummaryPriority));
      $(document).off("mousedown.select2Outside");
    }
  });
});

$(document).on("click", "td.editable-summaryStatus", function () {
  const $cell = $(this);
  // const currentText = $cell.text().trim();

  // Avoid creating multiple selects
  if ($cell.find("select").length) return;

  // Create and populate the <select>
  const $select = $("<select class='form-select form-select-sm'>").append(
    summaryStatusOptions.map((status) =>
      // $("<option>").val(status).text(status).prop("selected", status == currentText)
      $("<option>").val(status).text(status).prop("selected", status)
    )
  );

  $cell.empty().append($select);
  $select
    .select2({
      width: "100%",
      selectionCssClass: "form-control form-control-sm p-0",
    })
    .focus();
  // $select.focus();

  // Update badge on change/blur
  $select.on("blur change", function () {
    const newStatus = $select.val();
    $cell.html(getSummaryStatusBadge(newStatus));
  });
  // Handle outside click
  $(document).on("mousedown.select2Outside", function (event) {
    if (
      !$(event.target).closest(".select2-container, .select-dropdown").length
    ) {
      const newStatus = $select.val();
      $cell.html(getSummaryStatusBadge(newStatus));
      $(document).off("mousedown.select2Outside");
    }
  });
});

$(document).on(
  "click",
  "td.editable-summaryStartdate, td.editable-summaryDuedate",
  function () {
    const $cell = $(this);

    // Prevent editing if a select is already present
    if ($cell.find("select").length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const currentText = $cell.text().trim();

    const parsedDate = currentText ? parseCustomDate(currentText) : null;

    console.log(parsedDate);

    // Create readonly input (prevent manual typing)
    const $input = $(
      '<input type="text" readonly class="form-control form-control-sm" style="min-width:150px;" />'
    );
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
      },
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
        const monthIndex = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ].indexOf(mon);
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
  }
);



$(document).on("click", "td.editable-impacts", function () {
  const $cell = $(this);
  const $row = $cell.closest("tr");
  const taskId = $cell.data("task-id");
  const $container = $cell.find(".impacts-container");
  const parentId = $row.data("parent-id");
   const multipleOwners = $row.data("multiple-owners");
  const multipleUsers = $row.data("multiple-users");
  console.log(multipleOwners, multipleUsers, "multiownersusers");
  const currentImpacts = $container
    .find(".badge")
    .map(function () {
      return $(this).text();
    })
    .get();

  const allImpacts = [
    "Scorecard",
    "Initiatives",
    "Risk",
    "Swot",
    "Pestle",
    "Meetings",
    "Compliance",
  ];
  const badgeColors = [
     "label-bg-indigo",
      "label-bg-blue",
      "label-bg-orange",
      "label-bg-dark",
      "label-bg-cyan",
      "label-bg-teal",
      "label-bg-red",
      "label-bg-yellow",
      "label-bg-green",
      "label-bg-gray"
  ];

  const getRandomBadgeClass = () =>
    badgeColors[Math.floor(Math.random() * badgeColors.length)];

  const renderImpactBadges = (impacts) => {
    const impact = impacts
      .map(
        (impact) =>
          `<span class="badge ${getRandomBadgeClass(impact)}">${impact}</span>`
      )
      .join("");
    return `<div class="d-flex gap-1 flex-wrap" style="min-width:200px">${impact}</div>`;
  };

  if ($cell.find("select").length) return;

  const $select = $(
    '<select multiple class="form-select form-select-sm" size="6" style="max-width:160px">'
  );
  allImpacts.forEach((impact) => {
    const $option = $("<option>").val(impact).text(impact);
    if (currentImpacts.includes(impact)) $option.prop("selected", true);
    $select.append($option);
  });

  $container.empty().append($select);
  $select
    .select2({
      width: "200px",
      selectionCssClass: "form-control form-control-sm p-0",
    })
    .focus();

  // Handle save on change
  // $select.on("change", function () {
  //   const selected = $select.val() || [];
  //   $container.html(renderImpactBadges(selected));

  //   // Get the entire row data
  //   const $row = $cell.closest("tr");

  //   const rowData = {
  //     taskId: taskId,
  //     impacts: selected,
  //     parentId: parentId,
  //     taskName: $row.find("td:nth-child(2)").text().trim(),
  //     priority: $row.find("td[data-type='priority'] .badge").text().trim(), 
  //     status: $row.find("td[data-type='status'] .badge").text().trim(), 
  //     startDate: $row.find("td:nth-child(8)").text().trim(),
  //     dueDate: $row.find("td:nth-child(9)").text().trim(),
  //     percentComplete:
  //       parseInt($row.find(".editable-percent .badge").text()) || 0,
  //     multipleOwners: multipleOwners,
  //     multipleUsers: multipleUsers,  
  //   };

  //   // Call your save function
  //   saveTaskChanges(rowData);
  // });

  $(document).on("mousedown.select2Outside", function (event) {
    if (
      !$(event.target).closest(".select2-container, .select-dropdown").length
    ) {
      $select.trigger("change");
      $(document).off("mousedown.select2Outside");
    }
  });
});

$(document).on("click", "td.editable-priority", function () {
  const $cell = $(this);
  const fieldType = $cell.data("type"); 
  const $row = $cell.closest("tr");
  const taskId = $cell.data("task-id");
  const parentId = $cell.data("parent-id"); 
  const currentValue = $cell.find(".badge").text().trim();

  const multipleOwners = $row.data("multiple-owners");
  const multipleUsers = $row.data("multiple-users");

  console.log(fieldType, "fieldType");


  let options = [];
  if (fieldType == "priority") {
    options = ["Select", "High", "Medium", "Low"];
  } else if (fieldType == "status") {
    options = ["Select", "Open", "In Progress", "Completed", "Pending"]; 
  }

  console.log(fieldType, "fieldType");

  if ($cell.find("select").length) return;

  const $select = $("<select class='form-select form-select-sm'>").append(
    options.map((option) =>
      $("<option>")
        .val(option)
        .text(option)
        .prop("selected", option == currentValue)
    )
  );

  $cell.empty().append($select);
  $select
    .select2({
      width: "100%",
      selectionCssClass: "form-control form-control-sm p-0",
    })
    .focus();

  // Handle save on change
  // $select.on("change", function () {
  //   const newValue = $select.val();
  //   console.log(newValue, "newValue");
  //   // Get the entire row data
  //   const rowData = {
  //     taskId: taskId,
  //     parentId: parentId,
  //     // [fieldType]: newValue, // Dynamic property name based on fieldType
  //     taskName: $row.find("td:nth-child(2)").text().trim(),
  //     priority: fieldType == "priority" ? newValue : $row.find("td[data-type='priority'] .badge").text().trim(),
  //     status: fieldType == "status" ? newValue : $row.find("td[data-type='status'] .badge").text().trim(),
  //     startDate: $row.find("td:nth-child(8)").text().trim(),
  //     dueDate: $row.find("td:nth-child(9)").text().trim(),
  //     impacts: $row
  //       .find(".editable-impacts .badge")
  //       .map(function () {
  //         return $(this).text();
  //       })
  //       .get(),
  //     percentComplete: parseInt($row.find(".editable-percent .badge").text()) || 0,
  //     multipleOwners: multipleOwners,
  //     multipleUsers: multipleUsers,  
  //   };

  //   // Call the save function
  //   saveTaskChanges(rowData);
  // });

  $(document).on("mousedown.select2Outside", function (event) {
    if (!$(event.target).closest(".select2-container, .select-dropdown").length) {
      $select.trigger("change");
      $(document).off("mousedown.select2Outside");
    }
  });
});

$(document).on("click", "td.editable-status", function () {
  const $cell = $(this);
  const $row = $cell.closest("tr");
  const taskId = $cell.data("task-id");
  const parentId = $cell.data("parent-id");
  const currentStatus = $cell.text().trim();

  const multipleOwners = $row.data("multiple-owners");
  const multipleUsers = $row.data("multiple-users");
  console.log(multipleOwners, multipleUsers, "multiownersusers");

  const statusOptions = ["Not Started", "In Progress", "Completed", "On Hold"];

  if ($cell.find("select").length) {
    return;
  }

  const $select = $("<select class='form-select form-select-sm'>").append(
    statusOptions.map((status) =>
      $("<option>")
        .val(status)
        .text(status)
        .prop("selected", status == currentStatus)
    )
  );

  $cell.empty().append($select);

  $select
    .select2({
      width: "100%",
      minimumResultsForSearch: Infinity,
      dropdownParent: $cell,
    })
    .focus();

  const handleChange = function () {
    const newStatus = $select.val();

    // Get multiple owners and users as comma-separated strings
    //   const multipleOwners = $row
    //   .find(".avatar-group:first .avatar-initial[data-id]")
    //   .map(function () {
    //     return $(this).data("id");
    //   })
    //   .get()
    //   .join(", ");

    // const multipleUsers = $row
    //   .find(".avatar-group:last .avatar-initial[data-id]")
    //   .map(function () {
    //     return $(this).data("id");
    //   })
    //   .get()
    //   .join(", ");

    //   console.log(multipleOwners, multipleUsers, "multiple");

    const rowData = {
      taskId: taskId,
      parentId: parentId,
      status: newStatus,
      taskName: $row.find("td:nth-child(2)").text().trim(),
      priority: $row.find(".editable-priority .badge").text().trim(),
      startDate: $row.find("td:nth-child(8)").text().trim(),
      startDueDate: $row.find("td:nth-child(9)").text().trim(),
      impacts: $row
        .find(".editable-impacts .badge")
        .map(function () {
          return $(this).text();
        })
        .get(),
      percentComplete:
        parseInt($row.find(".editable-percent .badge").text()) || 0,
      multipleOwners: multipleOwners,
      multipleUsers: multipleUsers,
    };

    // saveTaskChanges(rowData);
    $select.off("change", handleChange);
    $(document).off("mousedown.select2Outside");
  };

  // $select.on("change", handleChange);

  $(document).on("mousedown.select2Outside", function (event) {
    if (
      !$(event.target).closest(
        ".select2-container, .select-dropdown, td.editable-status"
      ).length
    ) {
      $select.trigger("change");
    }
  });
});

$(document).on("click", "td.editable-percent", function () {
  const $td = $(this);
  const $progressBar = $td.find(".progress-bar");
  const currentVal = $progressBar.data("percent");

  // Prevent multiple inputs
  if ($td.find("input").length) return;

  // Create input box
  const $input = $('<input type="number" min="0" max="100" class="form-control form-control-sm">')
    .val(currentVal);

  // Replace content with input
  $td.html($input);

  // Focus input
  $input.focus();

  // On blur → commit new value
  $input.on("blur", function () {
    let newVal = parseInt($(this).val()) || 0;
    if (newVal < 0) newVal = 0;
    if (newVal > 100) newVal = 100;

    updateProgressCell($td, newVal); // reuse function below
  });

  // On Enter key → commit value
  $input.on("keypress", function (e) {
    if (e.which == 13) {
      $(this).blur();
    }
  });
});


function handleAddUsers() {
  const selectedUsers = $("input[name='attendees']:checked")
    .map(function () {
      return $(this).val();
    })
    .get()
    .join(",");

  // Get current values from the row data attributes
  const currentOwners = currentModalContext.row.data("multiple-owners") || "";
  const currentUsers = currentModalContext.row.data("multiple-users") || "";

  // Prepare the payload
  const payload = {
    owner: $("#userPrincipal").val().trim(),
    createdBy: $("#userPrincipal").val().trim(),
    pageId: $("#pageId").val(),
    deptId: "",
    priority: currentModalContext.row
      .find(".editable-priority .badge")
      .text()
      .trim(),
    status: currentModalContext.row.find(".editable-status").text().trim(),
    taskCategoryId: currentModalContext.parentId,
    id: currentModalContext.taskId,
    taskValue: {
      Name: currentModalContext.row.find("td:nth-child(2)").text().trim(),
      impact: currentModalContext.row
        .find(".editable-impacts .badge")
        .map(function () {
          return $(this).text();
        })
        .get(),
      priority: currentModalContext.row
        .find(".editable-priority .badge")
        .text()
        .trim(),
      status: currentModalContext.row.find(".editable-status").text().trim(),
      startDueDate:
        currentModalContext.row.find("td:nth-child(8)").text().trim() +
        " - " +
        currentModalContext.row.find("td:nth-child(9)").text().trim(),
      progress: currentModalContext.row
        .find(".editable-percent .badge")
        .text()
        .replace("%", ""),
      // Include both owners and users in payload, updating only the relevant one
      multipleOwners:
        currentModalContext.type == "owners" ? selectedUsers : currentOwners,
      multipleUsers:
        currentModalContext.type == "users" ? selectedUsers : currentUsers,
    },
  };

  console.log("Saving payload:", payload);

  // Make API call to update the task
  $.ajax({
    url: "/stratroom/task",
    method: "PUT",
    data: JSON.stringify(payload),
    contentType: "application/json",
    success: function (response) {
      console.log("Users updated successfully", response);
      $("#attendess-list").modal("hide");

      // Update the UI and data attributes
      if (currentModalContext.type == "owners") {
        currentModalContext.row.data("multiple-owners", selectedUsers);
        updateUserCountBadge(
          currentModalContext.row,
          "owners",
          selectedUsers.split(",").length
        );

        location.reload();
      } else {
        currentModalContext.row.data("multiple-users", selectedUsers);
        updateUserCountBadge(
          currentModalContext.row,
          "users",
          selectedUsers.split(",").length
        );
      }
    },
    error: function (error) {
      console.error("Error updating users", error);
      alert("Failed to save users. Please try again.");
    },
  });
}


function handleParentAddUsers() {
    console.log(slectedType, "Function Clicked");

    const dependencies = [];

    $('#attendeesListContainerParent input[name="attendees"]:checked').each(function () {
        dependencies.push({
            id: $(this).val(),
            name: $(this).data("name")
        });
    });

    console.log("Selected Dependencies:", dependencies);

    if (dependencies.length == 0) {
        alert("Please select at least one user");
        return;
    }

    let payload = {}

    if(slectedType == "owners"){
        payload = {
            id: selectedCategory?.id || "",
            owner: selectedCategory?.owner,
            createdBy: selectedCategory?.createdBy,
            pageId: "",
            deptId: "",
            type : typeChangeVlaue,
            taskCategoryValue: {
                category: selectedCategory?.taskCategoryValue?.category || "",
                priority: selectedCategory?.taskCategoryValue?.priority || "",
                status: selectedCategory?.taskCategoryValue?.status || "",
                startDate: selectedCategory?.taskCategoryValue?.startDate || "",
                endDate: selectedCategory?.taskCategoryValue?.endDate || "",
                progress: selectedCategory?.taskCategoryValue?.progress || "",
                dependencies: selectedCategory?.taskCategoryValue?.dependencies || [],  
                owners : dependencies,
            }
        };
    }else {
        payload = {
        id: selectedCategory?.id || "",
        owner: selectedCategory?.owner,
        createdBy: selectedCategory?.createdBy,
        pageId: "",
        deptId: "",
        type : typeChangeVlaue,
        taskCategoryValue: {
            category: selectedCategory?.taskCategoryValue?.category || "",
            priority: selectedCategory?.taskCategoryValue?.priority || "",
            status: selectedCategory?.taskCategoryValue?.status || "",
            startDate: selectedCategory?.taskCategoryValue?.startDate || "",
            endDate: selectedCategory?.taskCategoryValue?.endDate || "",
            progress: selectedCategory?.taskCategoryValue?.progress || "",
            dependencies: dependencies,   // ✅ ARRAY OBJECT
            owners : selectedCategory?.taskCategoryValue?.owners || "",
        }
    };
    }

   

    console.log("Final Payload:", payload);

    $.ajax({
        url: "/stratroom/taskCategory",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(payload),
        success: function (res) {
            console.log("Category updated:", res);
            location.reload();
        },
        error: function (err) {
            console.error("Category update failed:", err);
            alert("Failed to update category");
        }
    });
}



function openUserModal(element, type, taskId, parentId) {
  console.log("this function called");
  currentModalContext = {
    row: $(element).closest("tr"),
    type: type,
    taskId: taskId,
    parentId: parentId,
  };
  getUserList();
}

let selectedDependencyIds = [];

var slectedType  = "";

function openParentUserModal(element, type, taskParentId) {

   const container = $("#attendeesListContainerParent");
   container.empty();
  console.log(element,type, taskParentId,  "element");
  slectedType = type

    const $row = $(element).closest("tr");

    const currentTaskCategoryId = $row.data("task-category-id");

    console.log(currentTaskCategoryId, "currentTaskCategoryId");

     selectedCategory = taskDataList.find(
        item => item.id == Number(currentTaskCategoryId)
    );

    if(type  == "owners"){
      selectedDependencyIds = (selectedCategory?.taskCategoryValue?.owners || [])
        .map(d => String(d.id));
    }else {
      selectedDependencyIds = (selectedCategory?.taskCategoryValue?.dependencies || [])
        .map(d => String(d.id));
    }
     


    console.log(selectedCategory, "selectedCategory");


  getUserParentUserList();
}



function getUserParentUserList() {
  console.log("Fetching user list for modal");
  $.ajax({
    url: "/stratroom/user/moduleAccessUserList?moduleName=Meetings",
    method: "GET",
    success: function (response) {
      console.log(response, "response");
      const container = $("#attendeesListContainerParent");
      container.empty();


        response.forEach((user) => {
        const isChecked = selectedDependencyIds.includes(String(user.id));
        container.append(`
                    <div class="list-group-item attendee">
                        <div class="form-check cusom-check form-check-reverse">
                            <input class="form-check-input" type="checkbox" 
                                   name="attendees" 
                                   id="attendee_${user.id}" 
                                   value="${user.id}"
                                    data-name="${user.name}"
                                   ${isChecked ? "checked" : ""}>
                            <label class="form-check-label" for="attendee_${
                              user.id
                            }">
                                <span class="image">
                                    ${
                                      user.image
                                        ? `<img src="${user.image}" alt="${user.name}" width="18" height="18">`
                                        : `<span class="avatar-initial rounded-circle bg-label-primary">${
                                            user.name
                                              ? user.name
                                                  .charAt(0)
                                                  .toUpperCase()
                                              : "?"
                                          }</span>`
                                    }
                                </span>
                                <span class="name">${user.name}</span>
                            </label>
                        </div>
                    </div>
                `);
      });


      

      

    }
  });
};

function getUserList() {
  console.log("Fetching user list for modal");
  $.ajax({
    url: "/stratroom/user/moduleAccessUserList?moduleName=Meetings",
    method: "GET",
    success: function (response) {
      console.log(response, "usersList response");
      const container = $("#attendeesListContainer");
      container.empty();

      // Get current user IDs based on modal type
      const currentUserIds = (() => {
        const data =
          currentModalContext.type == "owners"
            ? currentModalContext.row.data("multipleOwners")
            : currentModalContext.row.data("multipleUsers");

        if (Array.isArray(data)) return data;
        if (typeof data == "string") return data.split(",").filter(Boolean);
        return [];
      })();

      response.forEach((user) => {
        const isChecked = currentUserIds.includes(user.id.toString());
        container.append(`
                    <div class="list-group-item attendee">
                        <div class="form-check cusom-check form-check-reverse">
                            <input class="form-check-input" type="checkbox" 
                                   name="attendees" 
                                   id="attendee_${user.id}" 
                                   value="${user.id}"
                                   ${isChecked ? "checked" : ""}>
                            <label class="form-check-label" for="attendee_${
                              user.id
                            }">
                                <span class="image">
                                    ${
                                      user.image
                                        ? `<img src="${user.image}" alt="${user.name}" width="18" height="18">`
                                        : `<span class="avatar-initial rounded-circle bg-label-primary">${
                                            user.name
                                              ? user.name
                                                  .charAt(0)
                                                  .toUpperCase()
                                              : "?"
                                          }</span>`
                                    }
                                </span>
                                <span class="name">${user.name}</span>
                            </label>
                        </div>
                    </div>
                `);
      });

      // Initialize search functionality
      $("#userSearchInput")
        .off("keyup")
        .on("keyup", function () {
          const searchText = $(this).val().toLowerCase();
          $(".list-group-item.attendee").each(function () {
            const userName = $(this).find(".name").text().toLowerCase();
            $(this).toggle(userName.includes(searchText));
          });
        });

      // Initialize "All Users" checkbox
      $("#allusers")
        .off("change")
        .on("change", function () {
          $("input[name='attendees']").prop("checked", $(this).is(":checked"));
        });

      // Show the modal
      $("#attendess-list").modal("show");
    },
    error: function (error) {
      console.error("Error fetching users", error);
    },
  });
}


$(document).on('click', 'td.editableLast_assessment_date, td.editableNext_review_date', function() {
  console.log("Editable cell clicked:", $(this).attr('class'));
  const $cell = $(this);
  const $row = $cell.closest("tr");
  const currentText = $cell.text().trim();
  const table = $cell.closest('table').DataTable();
  const cellIndex = table.cell($cell).index();
  const rowData = table.row(cellIndex.row).data();
  const taskId = $cell.data("task-id");
  const parentId = $cell.data("parent-id");
  const fieldType = $cell.data("type"); 
  console.log(fieldType, "fieldType in editable date cell");

  if ($cell.find("input").length) {
    return; // already editing
  }

  // Create input
  const $input = $('<input type="text" class="form-control form-control-sm">').val(currentText);
  $cell.empty().append($input);

  // Initialize flatpickr
  const fp = flatpickr($input[0], {
    dateFormat: "Y-m-d",
    allowInput: true,
    defaultDate: currentText || null,
    onClose: function(selectedDates, dateStr) {
      // Commit the value when picker closes
      if (dateStr) {
        $cell.text(dateStr);
      } else {
        $cell.text(""); // empty if no date
      }
    },
    onChange: function(selectedDates, dateStr) {
      // Optional: live update on select
      $input.val(dateStr);
    }
  });

  // Commit value on blur (when user tabs away without picking)
  $input.on("blur", function() {
    const newVal = $(this).val();
    $cell.text(newVal || "");
  });

  // Open picker immediately
  fp.open();
});



$(document).on(
  "click",
  "td.editableLast_assessment_date_parent, td.editableNext_review_date_parent",
  function () {

    console.log("Editable cell clicked:", $(this).attr("class"));

    const $cell = $(this);
    const currentText = $cell.text().trim();

    if ($cell.find("input").length) return;

    const $input = $('<input type="text" class="form-control form-control-sm">')
      .val(currentText);

    $cell.empty().append($input);

    const fp = flatpickr($input[0], {
      dateFormat: "Y-m-d",
      allowInput: true,
      defaultDate: currentText || null,
      onClose: function (_, dateStr) {
        $cell.text(dateStr || "");
      }
    });

    $input.on("blur", function () {
      $cell.text($(this).val() || "");
    });

    fp.open();
  }
);



function updateProgressCell($td, value) {
  const color =
    value <= 39 ? "#dc3545" : value <= 75 ? "#ffc107" : "#198754";

  // New HTML for progress bar + badge
  const html = `
    <div class="progress-wrap green">
      <div class="progress flex-grow-1" style="--stratroom-bg-opacity:1">
        <div class="progress-bar progress-bar-striped rounded-pill" 
            role="progressbar" 
            style="width: ${value}%; background-color: ${color};"
            data-percent="${value}">
        </div>
      </div>
      <span class="badge">${value}%</span>
    </div>
  `;

  $td.html(html);
};


function handleAdd(type, groupId) {
  console.log(type, "typeData");
  typeValue = type;
  parentId = groupId || "";
  console.log(typeValue, parentId, "typeValue in handleAdd");
}

function handleSave() {
  console.log(typeValue, "typeValue in handleSave");

  // ✅ Utility: Always return date in dd-mm-yyyy format
  function formatDate(inputDate) {
    console.log(inputDate, "inputDate");

    // Handle invalid or empty input
    if (!inputDate || typeof inputDate !== "string") {
      console.warn("⚠️ Invalid date passed to formatDate:", inputDate);
      return "";
    }

    // ✅ If already in dd-mm-yyyy format, return as-is
    if (/^\d{2}-\d{2}-\d{4}$/.test(inputDate.trim())) {
      return inputDate.trim();
    }

    // ✅ Try to parse formats like "Oct 27, 2025"
    const months = {
      Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
      Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
    };

    const parts = inputDate.trim().split(" ");
    if (parts.length < 3) {
      console.warn("⚠️ Unexpected date format in formatDate:", inputDate);
      return "";
    }

    const day = parts[1]?.replace(",", "").padStart(2, "0");
    const month = months[parts[0]] || "";
    const year = parts[2] || "";

    if (!day || !month || !year) {
      console.warn("⚠️ Could not parse date properly:", inputDate);
      return "";
    }

    return `${day}-${month}-${year}`;
  }

  // ✅ Convert dates to dd-mm-yyyy
  const startDate = formatDate($('#askStartDate-add').val());
  const endDate = formatDate($('#askDueDate-add').val());

  // ✅ Check which type of task is being saved
  if (typeValue == "parent") {
    const payload = {
      id: $("#taskId").val() || "",
      owner: $("#userPrincipal").val().trim(),
      createdBy: $("#userPrincipal").val().trim(),
      pageId: $("#pageId").val(),
      deptId: "",
      type : typeChangeVlaue,
      taskCategoryValue: {
        category: $("#taskName-add").val(),
        impact: $("#taskImpact-add").val(),
        priority: $("#taskPriority-add").val() ? $("#taskPriority-add").val() : "0" || "0",
        status: $("#taskStatus-add").val(),
        startDate: startDate,
        endDate: endDate,
        progress: $("#taskProgress-add").val(),
      },
    };

    console.log(payload, "✅ Payload for parent task creation");

    $.ajax({
      url: "/stratroom/taskCategory",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
      success: function (response) {
        console.log("✅ Task saved successfully:", response);
        $("#task-add-modal").modal("hide");
        location.reload();
      },
      error: function (error) {
        console.error("❌ Error saving task:", error);
        alert("Failed to save task. Please try again.");
      },
    });

  } else if(typeValue == "child")  {
    const payload = {
      owner: $("#userPrincipal").val().trim(),
      createdBy: $("#userPrincipal").val().trim(),
      pageId: $("#pageId").val(),
      deptId: "",
      priority: $("#taskPriority-add").val(),
      status: $("#taskStatus-add").val(),
      taskCategoryId: parentId,
      type : typeChangeVlaue,
      // startDate: startDate,
      taskValue: {
        Name: $("#taskName-add").val(),
        impact: [$("#taskImpact-add").val()],
        priority: $("#taskPriority-add").val(),
        status: $("#taskStatus-add").val(),
        startDate: startDate,
        endDate: endDate,
        progress: $("#taskProgress-add").val(),
        multipleOwners: $("#userPrincipal").val().trim(),
        multipleUsers: $("#userPrincipal").val().trim(),
      },
    };

    console.log(payload, "✅ Payload for child task creation");

    $.ajax({
      url: "/stratroom/task",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
      success: function (response) {
        console.log("✅ Task saved successfully:", response);
        $("#task-add-modal").modal("hide");
        location.reload();
      },
      error: function (error) {
        console.error("❌ Error saving task:", error);
        alert("Failed to save task. Please try again.");
      },
    });
  }
};



function getSelectedImpacts($tr) {
    const $cell = $tr.find('td.impacts-cell'); 
    const $select = $cell.find('select[multiple]');

    
    if ($select.length > 0) {
        return $select.val() || [];
    }

    
    const values = [];
    $cell.find('.badge').each(function () {
        const text = $(this).text().trim();
        if (text) values.push(text);
    });

    return values; // e.g., ["pestle"]
}


function handleRowUpdate(button) {   
    const $button = $(button);
    const $td = $button.closest('td'); 
    const $tr = $button.closest('tr'); 
    const progressVal = $tr.find("td.editable-percent .progress-bar").data("percent");
    console.log(progressVal, "progressVal in handleRowUpdate"); 

    const taskId = $td.data('task-id') || $tr.data('task-id');
    const parentId = $td.data('parent-id') || $tr.data('parent-id');
    const taskName = $tr.find('td:nth-child(2)').text().trim();

    const impacts = getSelectedImpacts($tr);

    console.log("Impacts:", impacts);

    const $priorityCell = $tr.find('td[data-type="priority"]');
    const $select = $priorityCell.find('select');

    let priority;

    if ($select.length > 0) {
        
        priority = $select.val(); 
    } else {
        priority = $priorityCell.find('.badge').text().trim(); 
    }

    const $statusCell = $tr.find('td[data-type="status"]');
    const $statusSelect = $statusCell.find('select');

    let status;

    if ($statusSelect.length > 0) {
      
        status = $statusSelect.val(); 
    } else {
      
        status = $statusCell.find('.badge').text().trim() ||
                $statusCell.text().trim(); 
    }

    const startDate = $tr.find('td[data-type="startDate"]').text().trim();

    const dueDate = $tr.find('td[data-type="dueDate"]').text().trim();
    
    const $tdd = $tr.find('td.editable-percent');
    const $progressBar = $tdd.find('.progress .progress-bar'); 
  
    const progress = $progressBar.attr('data-percent');
    
    console.log(progress); 

     const multipleOwners = $tr.data("multiple-owners");
     const multipleUsers = $tr.data("multiple-users");

    console.log(taskName, priority, status, startDate, impacts, progress, "Task details");

    console.log("Task ID:", taskId);   
    console.log("Parent ID:", parentId);

      const payload = {
        owner: $("#userPrincipal").val().trim(),
        createdBy: $("#userPrincipal").val().trim(),
        pageId: $("#pageId").val(),
        deptId: "",
        priority: priority,
        status: status,
        taskCategoryId: parentId,
        id: taskId,
        taskValue: {
          Name: taskName,
          impact: impacts,
          priority: priority,
          status: status,
          startDueDate: "",
          multipleOwners: multipleOwners, 
          multipleUsers: multipleUsers, 
          progress: progressVal ? progressVal : "0",
          startDate: startDate,
          endDate: dueDate, 
        },
  };

    console.log("Payload for task update:", payload);



      $.ajax({
      // url: "/stratroom/task",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
      success: function (response) {
        console.log("Task saved successfully:", response);
        $("#task-add-modal").modal("hide");

        location.reload();
      },
      error: function (error) {
        console.error("Error saving task:", error);
        alert("Failed to save task. Please try again.");
      },
    });

    
}




function getCellValue($tr, type) {
    const $cell = $tr.find(`td[data-type="${type}"]`);
    const $select = $cell.find("select");

    if ($select.length) {
        return $select.val(); // when editing
    }

    return $cell.find(".badge").text().trim(); // when not editing
};


function formatToDDMMYYYY(dateStr) {
    if (!dateStr) return "";

    // Normalize separator
    const clean = dateStr.replace(/\//g, "-");
    const parts = clean.split("-");

    if (parts.length !== 3) return dateStr;

    let day, month, year;

    // Detect format by year length
    if (parts[0].length == 4) {
        // YYYY-MM-DD
        year  = parts[0];
        month = parts[1];
        day   = parts[2];
    } else if (parts[2].length == 4) {
        // DD-MM-YYYY or MM-DD-YYYY
        year = parts[2];

        // Assume UI dates are YYYY-MM-DD or DD-MM-YYYY
        day   = parts[0];
        month = parts[1];
    } else {
        return dateStr; // unknown format
    }

    // Pad values
    day   = day.padStart(2, "0");
    month = month.padStart(2, "0");

    return `${day}-${month}-${year}`;
}





function handleTaskCategoryUpdate(button) {
    const $btn = $(button);
    const $tr = $btn.closest("tr");

    // 🔹 values from tab (stored in tr)
    const categoryId = $tr.data("task-category-id");
    const owner = $tr.data("owner");
    const createdBy = $tr.data("created-by");

    // 🔹 values from TDs
    const categoryName = $tr.find("td:nth-child(2)").text().trim();

    const priority = getCellValue($tr, "priority");
    const status   = getCellValue($tr, "status");

    const rawStartDate = $tr.find('td[data-type="startDate"]').eq(0).text().trim();
    const rawEndDate   = $tr.find('td[data-type="endDate"]').text().trim();

    const progress = $tr.find(".progress-bar").data("percent") || 0;

    // 🔹 payload
    const payload = {
        id: categoryId,
        owner: owner,
        createdBy: createdBy,
        pageId: $("#pageId").val(),
        deptId: "",
        type : typeChangeVlaue,
        taskCategoryValue: {
            category: categoryName,
            priority: priority,
            status: status,
            startDate: formatToDDMMYYYY(rawStartDate), 
            endDate: formatToDDMMYYYY(rawEndDate),  
            progress: progress
        }
    };

    console.log("Category Payload:", payload);

    // 🔹 API call
    $.ajax({
        url: "/stratroom/taskCategory",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(payload),
        success: function (res) {
            console.log("✅ Category updated:", res);
            location.reload();
        },
        error: function (err) {
            console.error("❌ Category update failed:", err);
            alert("Failed to update category");
        }
    });
};


$(document).on("click", ".delete-task", function (e) {
  e.preventDefault();
  const $dropdown = $(this).closest(".dropdown");
  const taskId = $dropdown.data("task-id");
  console.log(taskId, "taskId to delete");
  deleteTaskId = taskId;
});


$(document).on("click", ".delete-taskParent", function (e) {
  e.preventDefault();
  console.log("function Clicked");
  const $dropdown = $(this).closest(".dropdown");
  const taskId = $dropdown.data("task-id");
  console.log(taskId, "taskId to delete");
  deleteTaskParent = taskId;
});


$(document).on("click", ".taskConfirmDelete", function () {

  console.log(deleteTaskId, "deleteTaskId in confirm delete");
    $.ajax({
      url: "/stratroom/task/" + deleteTaskId,
      type: "DELETE",
      contentType: "application/json",
      success: function (response) {
        console.log("Task Deleted successfully:", response);
        location.reload();
      },
      error: function (error) {
        console.error("Error saving task:", error);
        alert("Failed to delete.");
      },
    });

});


$(document).on("click", ".taskConfirmDeleteParent", function () {

  console.log(deleteTaskParent, "deleteTaskId in confirm delete");
    $.ajax({
      url: "/stratroom/taskCategory/" + deleteTaskParent,
      type: "DELETE",
      contentType: "application/json",
      success: function (response) {
        console.log("Task Deleted successfully:", response);
        location.reload();
      },
      error: function (error) {
        console.error("Error saving task:", error);
        alert("Failed to delete.");
      },
    });

});

