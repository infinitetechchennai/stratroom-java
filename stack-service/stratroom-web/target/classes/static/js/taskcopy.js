var typeValue = "";
var parentId = "";
const responsess = [
  {
    id: 2,
    taskCategoryValue: {
      createdByName: "josephs",
      ownerName: "josephs",
      category: "concreate",
    },
    owner: 1681,
    createdBy: 1681,
    updatedBy: 0,
    createdTime: "2025-06-21T05:30:00",
    updatedTime: null,
    active: 0,
    deptId: 524,
    taskDetailList: [
      {
        id: 1,
        taskValue: {
          createdByName: "josephs",
          set: 34,
          ownerName: "josephs",
          Name: "Not Any data provide",
        },
        owner: 1681,
        createdBy: 1681,
        updatedBy: 0,
        createdTime: "2025-06-21T05:30:00",
        updatedTime: null,
        active: 0,
        taskCategoryId: 2,
        priority: "LOW",
        status: "PENDING",
        startDate: null,
        endDate: null,
      },
    ],
    pageId: 1,
  },
  {
    id: 5,
    taskCategoryValue: {
      createdByName: "josephs",
      startDueDate: "",
      ownerName: "josephs",
      impact: "initiatives",
      progress: "10%",
      category: "Currrent Work",
      priority: "high",
      status: "open",
    },
    owner: 1681,
    createdBy: 1681,
    updatedBy: 0,
    createdTime: "2025-06-24T05:30:00",
    updatedTime: null,
    active: 0,
    deptId: 0,
    taskDetailList: [
      {
        taskValue: {
          Name: "",
        },
      },
    ],
    pageId: 0,
  },
];

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



$(document).ready(function () {
  const storedLanguage = localStorage.getItem("selectedLang") || "en"
  loadLanguage(storedLanguage)
  const owner = $("#userPrincipal").val().trim()
  var datePeriod = $("#datePeriod").val();
  console.log(datePeriod, "datePeriod");
  $.ajax({
    url: "/stratroom/retrieveTaskList/" + owner + "?dateRange=" + datePeriod,
    method: "GET",
    success: function (response) {
     
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
    },
  });

  //  renderTabContent(response);

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
                  <th>`+impactHeader+`</th>  
                  <th>`+dependencyHeader+`</th>
                  <th>`+ownerHeader+` </th>                
                  <th>`+priorityHeader+`</th>
                  <th>`+statusHeader+`</th>
                  <th>`+startdateHeader+`</th>
                  <th>`+dueDateHeader+`</th>
                  <th>`+durationHeader+`</th>
                  <th>`+completeHeader+`</th>
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

  function formatDate(dateString) {
    if (!dateString) return "";

    // Parse DD-MM-YYYY format
    const [day, month, year] = dateString.split("-");
    const date = new Date(`${year}-${month}-${day}`);

    // Handle invalid dates (e.g., if dateString was malformed)
    if (isNaN(date.getTime())) return "Invalid date";

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function renderTaskCategories(tabs, parentId) {
    let html = "";
    let groupIndex = 0;

    tabs.forEach((tab) => {
      const category = tab.taskCategoryValue.category;
      const parentProgress = tab.taskCategoryValue.totalProgress || "0%";
      const groupId = `group-${parentId}-${groupIndex++}`;
      const hasTasks = tab.taskDetailList.length > 0;
      const toggleIcon = hasTasks
        ? `<i class="fas fa-minus toggle-icon" data-group="${groupId}" style="cursor:pointer;"></i>`
        : "";

      // Always render the category header row
      html += `<tr class="level-0 bg-light group-header" data-id="${groupId}" role="row">             
                 <td colspan="10">
                   <div class="d-flex gap-3 justify-content-between align-items-center">
                     <div>${toggleIcon} <strong>${category}</strong></div>
                    
                    
                   </div>
                 </td>

                   <td class="text-center">
                   <div class="d-flex gap-3 justify-content-between align-items-center">
                     <div>${parentProgress}</div>
                    
                    
                   </div>
                 </td>
                 

          <td class="text-center"    
              
              >
               <div class="table-actions justify-content-end">
                       <a data-bs-toggle="modal" data-bs-target="#task-add-modal" class="btn btn-sm btn-outline-icon" style="--stratroom-btn-color:var(--stratroom-primary);--stratroom-btn-border-color:rgba(var(--stratroom-primary-rgb),0.1);--stratroom-btn-hover-color:var(--stratroom-primary);--stratroom-btn-hover-bg:rgba(var(--stratroom-primary-rgb),0.1)" onclick="handleAdd('child', '${tab.id}')">
                         <span class="icon">
                           <i class="fas fa-plus"></i>
                         </span>
                       </a> 
                       
                       
                     
          <div class="dropdown"  data-task-id="${tab.id}">
                          <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" style="background: #e9ecef; width: 25px; height: 4vh; border-radius: 5px; text-align: center;">
                              <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                          </button>
                          <ul class="dropdown-menu border-0 shadow">        
                                <li><a class="dropdown-item delete-taskEdit" href="#task-add-modal" data-bs-toggle="modal">Edit</a></li>                                    
                                <li><a class="dropdown-item delete-taskParent" href="#delete-modalParent" data-bs-toggle="modal">Delete</a></li>
                               
                              </ul> 
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
                <div class="d-flex gap-1 flex-wrap" style="min-width:260px">${
                  task.taskValue.Name || ""
                }</div>
              </td>
             <td  id="impacts-container" class="text-center editable-impacts impacts-cell" data-task-id="${
               task.id
             }" data-parent-id="${categoryValue.id}" data-type="impact">
                <div class="d-flex gap-1 flex-wrap impacts-container" style="min-width:160px" >
                    ${impactsBadge || ""}
                </div>
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
                ${getPriorityBadge(task.priority, "priority")}
              </td>

                <td class="text-center text-nowrap status editable-priority"
                   data-type="status"
                  data-task-id="${task.id}" 
                  data-parent-id="${categoryValue.id}" >
                ${getPriorityBadge(task.status, "status")}
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
          <td class="text-center text-nowrap editable-percent progress-bar"  date-type="progress">
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
                  <span class="badge">${task.taskValue.progress}%</span>
              </div>
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

  // Toggle: Group - toggles only level-1 rows and icon updates accordingly
  $(document).on("click", ".toggle-icon[data-group]", function () {
    const groupId = $(this).data("group");
    const icon = $(this);

    // Select all rows under the group
    const allRows = $(`tr[data-group-id='${groupId}']`);

    // Filter only level-1 rows
    const level1Rows = allRows.filter(function () {
      return $(this).hasClass("level-1");
    });

    const isVisible = level1Rows.is(":visible");

    if (isVisible) {
      // Hide all nested rows
      level1Rows.hide();
      icon.removeClass("fa-minus").addClass("fa-plus");
    } else {
      // Show only level-1 rows
      level1Rows.show();
      icon.removeClass("fa-plus").addClass("fa-minus");
    }
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

function handleAdd(type, groupId) {
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
  if (typeValue === "parent") {
    const payload = {
      id: $("#taskId").val() || "",
      owner: $("#userPrincipal").val().trim(),
      createdBy: $("#userPrincipal").val().trim(),
      pageId: $("#pageId").val(),
      deptId: "",
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

  } else if (typeValue == "child") {
    const payload = {
      owner: $("#userPrincipal").val().trim(),
      createdBy: $("#userPrincipal").val().trim(),
      pageId: $("#pageId").val(),
      deptId: "",
      priority: $("#taskPriority-add").val(),
      status: $("#taskStatus-add").val(),
      taskCategoryId: parentId,
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
}

// function handleSave() {
//   console.log(typeValue, "typeValue in handleSave");


//   // function formatDate(inputDate) {
//   //   console.log(inputDate, "inputDate");
//   //     const months = {
//   //         Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
//   //         Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
//   //     };
      
//   //     const parts = inputDate.split(' ');
//   //     const day = parts[1].replace(',', '').padStart(2, '0');
//   //     const month = months[parts[0]];
//   //     const year = parts[2];
      
//   //     return `${day}-${month}-${year}`;
//   // }

//   function formatDate(inputDate) {
//   console.log(inputDate, "inputDate");

 
//   if (/^\d{2}-\d{2}-\d{4}$/.test(inputDate)) {
//     return inputDate;
//   }

  
//   if (!inputDate || typeof inputDate !== "string") {
//     console.warn("⚠️ Invalid date passed to formatDate:", inputDate);
//     return "";
//   }

//   const months = {
//     Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
//     Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
//   };

//   const parts = inputDate.trim().split(" ");
//   if (parts.length < 3) {
//     console.warn("Unexpected date format in formatDate:", inputDate);
//     return "";
//   }

//   const day = parts[1]?.replace(",", "").padStart(2, "0");
//   const month = months[parts[0]] || "";
//   const year = parts[2] || "";

//   if (!day || !month || !year) {
//     console.warn("⚠️ Could not parse date properly:", inputDate);
//     return "";
//   }

//   return `${day}-${month}-${year}`;
// }


// const startDate = formatDate($('#askStartDate-add').val());
// const endDate = formatDate($('#askDueDate-add').val());




 
//   // const startDate = formatDate($('#askStartDate-add').val());
//   // const endDate = formatDate($('#askDueDate-add').val());

//   if (typeValue == "parent") {
//     const payload = {
//       id:$("#taskId").val() || "",
//       owner: $("#userPrincipal").val().trim(),
//       createdBy: $("#userPrincipal").val().trim(),
//       pageId: $("#pageId").val(),
//       deptId: "",
//       taskCategoryValue: {
//         category: $("#taskName-add").val(),
//         impact: $("#taskImpact-add").val(),
//         priority: $("#taskPriority-add").val(),
//         status: $("#taskStatus-add").val(),
//         // startDueDate: $("#askStartDueDate-add").val(), 
//         startDate: startDate,
//         endDate: endDate,
//         progress: $("#taskProgress-add").val(),
//       },
//     };

//     console.log(payload, "Payload for task creation");
//     $.ajax({
//       url: "/stratroom/taskCategory",
//       method: "POST",
//       contentType: "application/json",
//       data: JSON.stringify(payload),
//       success: function (response) {
//         console.log("Task saved successfully:", response);
//         $("#task-add-modal").modal("hide");

//         location.reload();
//       },
//       error: function (error) {
//         console.error("Error saving task:", error);
//         alert("Failed to save task. Please try again.");
//       },
//     });
//   } else if (typeValue == "child") {
//     const payload = {
//       owner: $("#userPrincipal").val().trim(),
//       createdBy: $("#userPrincipal").val().trim(),
//       pageId: $("#pageId").val(),
//       deptId: "",
//       priority: $("#taskPriority-add").val(),
//       status: $("#taskStatus-add").val(),
//       taskCategoryId: parentId,
//       startDate: $("#taskStartDate-add").val(),
//       taskValue: {
//         Name: $("#taskName-add").val(),
//         impact: [$("#taskImpact-add").val()],
//         priority: $("#taskPriority-add").val(),
//         status: $("#taskStatus-add").val(),
//         // startDueDate: $("#askStartDueDate-add").val(),
//         startDate: startDate,
//         endDate: endDate,
//         progress: $("#taskProgress-add").val(),
//         multipleOwners: $("#userPrincipal").val().trim(),
//         multipleUsers: $("#userPrincipal").val().trim(),
//       },
//     };

//     console.log(payload, "Payload for child task creation");

//     $.ajax({
//       url: "/stratroom/task",
//       method: "POST",
//       contentType: "application/json",
//       data: JSON.stringify(payload),
//       success: function (response) {
//         console.log("Task saved successfully:", response);
//         $("#task-add-modal").modal("hide");

//         location.reload();
//       },
//       error: function (error) {
//         console.error("Error saving task:", error);
//         alert("Failed to save task. Please try again.");
//       },
//     });
//   }
// }

// Editable impacts handler with save on change
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
    options = ["High", "Medium", "Low"];
  } else if (fieldType == "status") {
    options = ["Open", "In Progress", "Completed", "Pending"]; 
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
  //     priority: fieldType === "priority" ? newValue : $row.find("td[data-type='priority'] .badge").text().trim(),
  //     status: fieldType === "status" ? newValue : $row.find("td[data-type='status'] .badge").text().trim(),
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

$(document).on(
  "click",
  "td.editable-percent .badge, td.editable-percent .progress-bar",
  function () {
    const $cell = $(this).closest("td.editable-percent");
    const $row = $cell.closest("tr");
    const taskId = $row.find("td.editable-status").data("task-id");
    const parentId = $row.find("td.editable-status").data("parent-id");
    const currentPercent = parseInt($cell.find(".badge").text()) || 0;

     const multipleOwners = $row.data("multiple-owners");
  const multipleUsers = $row.data("multiple-users");
  console.log(multipleOwners, multipleUsers, "multiownersusers");

    // Prevent multiple editors
    if ($cell.find("input").length) return;

    // Create input element
    const $input = $(`<input type="number" class="form-control form-control-sm" 
                         min="0" max="100" value="${currentPercent}">`);

    // Replace content with input
    $cell.find(".progress-wrap").hide();
    $cell.append($input);
    $input.focus();

    // Handle save on blur or enter key
    const saveChanges = function () {
      let newPercent = parseInt($input.val());

      // Validate input
      if (isNaN(newPercent)) newPercent = currentPercent;
      if (newPercent < 0) newPercent = 0;
      if (newPercent > 100) newPercent = 100;

      // Update the visual elements
      $cell
        .find(".progress-bar")
        .css("width", `${newPercent}%`)
        .attr("data-percent", newPercent);
      $cell.find(".badge").text(`${newPercent}%`);

      // Get all row data
      const rowData = {
        taskId: taskId,
        parentId: parentId,
        percentComplete: newPercent,
        taskName: $row.find("td:nth-child(2)").text().trim(),
        status: $row.find("td[data-type='status'] .badge").text().trim(),
        priority: $row.find("td[data-type='priority'] .badge").text().trim(),
        startDate: $row.find("td:nth-child(8)").text().trim(),
        dueDate: $row.find("td:nth-child(9)").text().trim(),
        multipleOwners: multipleOwners,
        multipleUsers: multipleUsers,
        impacts: $row
          .find(".editable-impacts .badge")
          .map(function () {
            return $(this).text();
          })
          .get(),
      };

      // Call save function
      // saveTaskChanges(rowData);

      // Restore original display
      $input.remove();
      $cell.find(".progress-wrap").show();

      // Clean up event listeners
      // $input.off("blur", saveChanges);
      $(document).off("keyup.percentEdit");
    };

    // $input.on("blur", saveChanges);

    // Also save on Enter key
    $(document).on("keyup.percentEdit", function (e) {
      if (e.key == "Enter") {
        saveChanges();
      }
    });

    // Handle Escape key to cancel
    $input.on("keyup", function (e) {
      if (e.key == "Escape") {
        $input.remove();
        $cell.find(".progress-wrap").show();
        $(document).off("keyup.percentEdit");
      }
    });
  }
);

// Save function example
function saveTaskChanges(taskData) {
  console.log(taskData, "taskData in saveTaskChanges");
  const formatToDDMMYYYY = (formattedDate) => {
    if (!formattedDate) return "";
    const date = new Date(formattedDate);
    if (isNaN(date.getTime())) return "";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const startDateFormatted = formatToDDMMYYYY(taskData.startDate);
  const endDateFormatted = formatToDDMMYYYY(taskData.startDueDate);
  const dateRangeString = `${startDateFormatted} - ${endDateFormatted}`;

  const payload = {
    owner: $("#userPrincipal").val().trim(),
    createdBy: $("#userPrincipal").val().trim(),
    pageId: $("#pageId").val(),
    deptId: "",
    priority: taskData.priority,
    status: taskData.status,
    taskCategoryId: taskData.parentId,
    id: taskData.taskId,
    taskValue: {
      Name: taskData.taskName,
      impact: taskData.impacts,
      priority: taskData.priority,
      status: taskData.status,
      startDueDate: dateRangeString,
      multipleOwners: taskData.multipleOwners, 
      multipleUsers: taskData.multipleUsers, 
      progress: taskData.percentComplete,
      startDate: taskData.startDate,
      endDate: taskData.dueDate, 
    },
  };

  console.log("Saving task changes:", payload);
  $.ajax({
    // url: "/stratroom/task",
    method: "PUT",
    data: JSON.stringify(payload),
    contentType: "application/json",
    success: function (response) {
      console.log("Save successful", response);
      location.reload();
    },
    error: function (error) {
      console.error("Save failed", error);
    },
  });
}

// Global variable to track current context
let currentModalContext = {
  row: null,
  type: null, // 'owners' or 'users'
  taskId: null,
  parentId: null,
};

function openUserModal(element, type, taskId, parentId) {
  currentModalContext = {
    row: $(element).closest("tr"),
    type: type,
    taskId: taskId,
    parentId: parentId,
  };
  getUserList();
}

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

function updateUserCountBadge(row, type, count) {
  const badge =
    type == "owners"
      ? row.find(".avatar-group").first().find(".avatar-initial.rounded-circle")
      : row.find(".avatar-group").last().find(".avatar-initial.rounded-circle");

  if (count > 0) {
    badge.text(`+${count}`).attr("data-bs-original-title", `${count} more`);
  } else {
    badge.parent().remove();
  }
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


// $(document).on('click', 'td.editableLast_assessment_date, td.editableNext_review_date', function() {
//   console.log("Editable cell clicked:", $(this).attr('class'));
//   const $cell = $(this);
//   const $row = $cell.closest("tr");
//   const currentText = $cell.text().trim();
//   const table = $cell.closest('table').DataTable();
//   const cellIndex = table.cell($cell).index();
//   const rowData = table.row(cellIndex.row).data();
//   const taskId = $cell.data("task-id");
//   const parentId = $cell.data("parent-id");
//   const fieldType = $cell.data("type"); 
//   console.log(fieldType, "fieldType in editable date cell");

//   const multipleOwners = $row.data("multiple-owners");
//   const multipleUsers = $row.data("multiple-users");
//   console.log(multipleOwners, multipleUsers, "multiownersusers");

//   if ($cell.find("input").length) {
//     return;
//   }

//   const $input = $('<input type="text">').val(currentText);
//   $cell.empty().append($input);

//   $("#editableNext_review_date").val($input.val());

//   console.log($input.val(), "inputValue");

//   const flatpickrInstance = flatpickr($input[0], {
//     dateFormat: "Y-m-d",
//     allowInput: true,
//     defaultDate: currentText || null,
//   });

//   $input[0]._flatpickr.open();


// });


function saveTaskDateChanges(taskData, fieldType) {
  console.log(taskData, "taskData in saveTaskDateChanges");

  function formatDateToDDMMYYYY(dateString) {
    const parts = dateString.split('-');
    if (parts.length == 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`; 
    }
    return dateString;   
  }

  var startDateFormatted = ""
  var endDateFormatted = "";
  if(fieldType == "startDate") {
    startDateFormatted = formatDateToDDMMYYYY(taskData.startDate);
    endDateFormatted = taskData.dueDate ? taskData.dueDate : "";
  }else {
    endDateFormatted = taskData.dueDate ? formatDateToDDMMYYYY(taskData.dueDate) : "";
    startDateFormatted = taskData.startDate ? taskData.startDate : "";
  }


  const payload = {
    owner: $("#userPrincipal").val().trim(),
    createdBy: $("#userPrincipal").val().trim(),
    pageId: $("#pageId").val(),
    deptId: "",
    priority: taskData.priority,
    status: taskData.status,
    taskCategoryId: taskData.parentId,
    id: taskData.taskId,
    taskValue: {
      Name: taskData.taskName,
      impact: taskData.impacts,
      priority: taskData.priority,
      status: taskData.status,
      startDueDate: "",
      multipleOwners: taskData.multipleOwners, 
      multipleUsers: taskData.multipleUsers, 
      progress: taskData.percentComplete,
      startDate: startDateFormatted,
      endDate: endDateFormatted, 
    },
  };


  console.log(payload, "payload");


  $.ajax({
      url: "/stratroom/task",
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


function getActionsMenu() {
         return `
         <div class="table-actions justify-content-end">
         <button class="btn btn-sm btn-primary px-2" type="button" onclick="handleRowUpdate(this)">
                       Save
                    <i class="fas fa-save"></i>
                    </button>
                <div class="dropdown">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" >
                        <img width="16" height="16" src="assets/images/icons/menu-dot-vertical-i.svg">
                    </button>
                    <ul class="dropdown-menu border-0 shadow">                      
                        <li><a class="dropdown-item" href="#task-add-modal" data-bs-toggle="modal">Edit</a></li>                        
                        <li><a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal">Delete</a></li>
                    </ul>
                </div>
            </div></div>`;
}


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
    if (e.which === 13) {
      $(this).blur();
    }
  });
});


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

var deleteTaskId = null;
var deleteTaskParent = null;
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

$(document).on("click", ".delete-taskEdit", function (e) {
  e.preventDefault();
  console.log("function Clicked");
  const $dropdown = $(this).closest(".dropdown");
  const taskId = $dropdown.data("task-id");
  console.log(taskId, "taskId to delete");
  deleteTaskParent = taskId;

    $.ajax({
      url: "/stratroom/taskCategory/" + taskId,
      type: "GET",
      contentType: "application/json",
      success: function (response) {
        console.log("Task Deleted successfully:", response);
        $("#taskId").val(response.id)
        $("#taskName-add").val(response.taskCategoryValue.category);
        $("#taskImpact-add").val(response.taskCategoryValue.impact);
        $("#taskPriority-add").val(response.taskCategoryValue.priority);
        $("#taskStatus-add").val(response.taskCategoryValue.status);
        $("#askStartDate-add").val(response.taskCategoryValue.startDate);
        $("#askDueDate-add").val(response.taskCategoryValue.endDate);
        $("#taskProgress-add").val(response.taskCategoryValue.progress);
        typeValue = "parent"
      },
      error: function (error) {
        console.error("Error saving task:", error);
        alert("Failed to delete.");
      },
    });
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

})



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

})




const page_task_en = {
    "Task Management": "Task Management",
    "My Tasks": "My Tasks",
    "Task ID": "Task ID",
    "Task Name": "Task Name",
    "Impact": "Impact",
    "Owner": "Owner",
    "Dependency": "Dependency",
    "Priority": "Priority",
    "Status": "Status",
    "Start Date": "Start Date",
    "Due Date": "Due Date",
    "Duration": "Duration",
    "% Complete": "% Complete",
    "Attachments": "Attachments",
    "Actions": "Actions",
    "Save": "Save",
    "Filter": "Filter",
    "Export": "Export",
    "Edit": "Edit",
    "Delete": "Delete",
    "Category": "Category",
    "Start/Due Date": "Start/Due Date",
    "Progress (%)": "Progress (%)",
    "Open": "Open",
    "In Progress": "In Progress",
    "Completed": "Completed",
    "Pending": "Pending",
    "Cancel": "Cancel",
    "Created By": "Created By",
    "Created Date": "Created Date",
    "Modified By": "Modified By",
    "Modified Date": "Modified Date",
    "Task Description": "Task Description",
}

const page_task_am = {
  "Task Management": "የተግባር አስተዳደር",
  "My Tasks": "የእኔ ተግባሮች",
  "Task ID": "የተግባር መለያ",
  "Task Name": "የተግባር ስም",
  "Impact": "ተፅእኖ",
  "Owner": "ባለቤት",
  "Dependency": "ጥገኝነት",
  "Priority": "ቅድሚያ",
  "Status": "ሁኔታ",
  "Start Date": "የመጀመሪያ ቀን",
  "Due Date": "የመጨረሻ ቀን",
  "Duration": "ቆይታ",
  "% Complete": "በመቶ ተጠናቋል",
  "Attachments": "ተያያዥ ፋይሎች",
  "Actions": "እርምጃዎች",
  "Save": "አስቀምጥ",
  "Filter": "ማጣሪያ",
  "Export": "ላክ",
  "Edit": "አርትዕ",
  "Delete": "ሰርዝ",
  "Category": "ምድብ",
  "Start/Due Date": "መጀመሪያ/መጨረሻ ቀን",
  "Progress (%)": "እድገት (%)",
  "Open": "ክፈት",
  "In Progress": "በሂደት ላይ",
  "Completed": "ተጠናቋል",
  "Pending": "በመጠባበቅ ላይ",
  "Cancel": "ይቅር",
  "Created By": "የፈጠረው",
  "Created Date": "የተፈጠረበት ቀን",
  "Modified By": "የተሻሻለው በ",
  "Modified Date": "የተሻሻለበት ቀን",
  "Task Description": "የተግባር መግለጫ"
}


const page_task_ar = {
    "Task Management": "إدارة المهام",
    "My Tasks": "مهامي",
    "Task ID": "معرّف المهمة",
    "Task Name": "اسم المهمة",
    "Impact": "التأثير",
    "Owner": "المالك",
    "Dependency": "الاعتمادية",
    "Priority": "الأولوية",
    "Status": "الحالة",
    "Start Date": "تاريخ البدء",
    "Due Date": "تاريخ الاستحقاق",
    "Duration": "المدة",
    "% Complete": "٪ منجز",
    "Attachments": "المرفقات",
    "Actions": "الإجراءات",
    "Save": "حفظ",
    "Filter": "تصفية",
    "Export": "تصدير",
    "Edit": "تعديل",
    "Delete": "حذف",
    "Category": "الفئة",
    "Start/Due Date": "تاريخ البدء / الاستحقاق",
    "Progress (%)": "نسبة التقدم (%)",
    "Open": "مفتوح",
    "In Progress": "قيد التنفيذ",
    "Completed": "مكتمل",
    "Pending": "قيد الانتظار",
    "Cancel": "إلغاء",
    "Created By": "تم الإنشاء بواسطة",
    "Created Date": "تاريخ الإنشاء",
    "Modified By": "تم التعديل بواسطة",
    "Modified Date": "تاريخ التعديل",
    "Task Description": "وصف المهمة",
}


//Language Wrokflow 
function getNestedValue(obj, path) {
  return path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : null, obj);
}

// Load language for all elements with data-translate
function loadLanguage(lang) {
  let translation;

  if (lang == 'ar') {
    translation = page_task_ar;
  } else if(lang == 'am'){
    translation = page_task_am;
  }else {
    translation = page_task_en;
  }

  document.querySelectorAll('[data-translate]').forEach(el => {
    const path = el.getAttribute('data-translate');
    const value = getNestedValue(translation, path);
    if (value !== null) {
      el.textContent = value;
    }
  });

  console.log(lang, "language loaded");
}
