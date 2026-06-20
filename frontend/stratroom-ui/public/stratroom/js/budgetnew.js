// Api integration
var deptlist = [];
var employeeList = [];
var glData = [];
var projectList = [];
var subinitiativeList = [];
var activityListDataList = [];
var subActivityListDataList = [];

async function apiCalls() {
  const owner = $("#userPrincipal").val().trim();
  $.ajax({
    // url: "/stratroom/initiativesList?loadFlag=true&pageId=1917&status=date",
    url: "/stratroom/initiativesListByEmpId/" + owner,
    async: false,
    success: function (data) {
      projectList = data;
      console.log("projectList:", projectList);
    },
  });
  //Deprtment api
  $.ajax({
    url: "/stratroom/allDepartmentList",
    async: false,
    success: function (data) {
      deptlist = data;
      console.log("Department List:", deptlist);
    },
  });

  // Fetch employee list once (adjust this part based on your actual employee data fetching method)
  $.ajax({
    url: "/stratroom/organization/employeeList",
    async: false,
    success: function (data) {
      employeeList = data;
      console.log("Employee list:", employeeList);
    },
  });

  //Masters Butable api
  $.ajax({
    url: "/stratroom/retrieveMasterTypes?type=BUDGET",
    async: false,
    success: function (data) {
      glData = data;
      console.log("glData:", glData);
    },
  });

  //project&initiative data api
}

function getInitiativeListByEmployee(){
  const owner = $("#userPrincipal").val().trim();
  $.ajax({
    // url: "/stratroom/initiativesList?loadFlag=true&pageId=1917&status=date",
    url: "/stratroom/initiativesListByEmpId/" + owner,
    async: false,
    success: function (data) {
      projectList = data;
      console.log("projectList:", projectList);
    },
  });
}

function getAllDeptist() {
   $.ajax({
    url: "/stratroom/allDepartmentList",
    async: false,
    success: function (data) {
      deptlist = data;
      console.log("Department List:", deptlist);
    },
  });

}

function getEmployeeList(){
    $.ajax({
    url: "/stratroom/organization/employeeList",
    async: false,
    success: function (data) {
      employeeList = data;
      console.log("Employee list:", employeeList);
    },
  });
}
function getGlAccountData() {
   $.ajax({
    url: "/stratroom/retrieveMasterTypes?type=BUDGET",
    async: false,
    success: function (data) {
      glData = data;
      console.log("glData:", glData);
    },
  });
}

apiCalls();

//Fetch budget data from the server
function fetchBudgetListData() {
  var pagenumber = $("#pagenumber").val();
  var approvedStatus = $("#approvedDraft").val();

  $.ajax({
    url: "/stratroom/budgetsList/" + pagenumber + "?status=" + approvedStatus,
    type: "GET",
    contentType: "application/json",
    success: function (responseData) {
    
      console.log("Received Data:", responseData);

      if (Array.isArray(responseData) && responseData.length > 0) {
        $("#changeId").val(responseData[responseData.length - 1].changeId);
      }

      // Destroy existing DataTable if it exists
      if ($.fn.DataTable.isDataTable("#budgetTable")) {
        $("#budgetTable").DataTable().destroy();
      }

      // Initialize the DataTable with new data
      initializeDataTable(responseData);
    },
    error: function (xhr, status, error) {
      console.error("Error fetching budget data:", error);
    },
  });
}

// function initializeDataTable(budgetListJson) {
//   console.log("Initializing DataTable with budgetListJson:", budgetListJson);
//  console.log("Total items in budgetListJson:", budgetListJson.length);


//  const withBudgetValues = budgetListJson.filter(item => item?.budgetValues);
// const withoutBudgetValues = budgetListJson.filter(item => !item?.budgetValues);

// console.log("✅ Rows with budgetValues:", withBudgetValues.length);   // probably ~26
// console.log("❌ Rows WITHOUT budgetValues:", withoutBudgetValues.length); // probably ~218

//   // Destroy existing table if present
//   if ($.fn.DataTable.isDataTable("#budgetTable")) {
//     $("#budgetTable").DataTable().clear().destroy();
//     $("#budgetTable tbody").empty();
//   }


//   // Initialize dropdown options
//   let versionOptions = new Set();
//   let outcomeOptions = new Set();
//   let objectiveOptions = new Set();
//   let subInitiativeDropDownoptions = [];
//   let uniqueActivity = [];
//   let uniqueSubActivity = [];
//   let glAccountOptions = [];
//   let projectInitiativeOptions = [];
//   let departmentOptions = [];
//   let employeeOptions = [];

//   budgetListJson.forEach((item) => {
//     if (!item.budgetValues) return;

//     const bv = item.budgetValues;

//     // Version
//     if (bv.version) versionOptions.add(bv.version);
//     // Outcome
//     if (bv.outcome) outcomeOptions.add(bv.outcome);
//     // Objective
//     if (bv.objective) objectiveOptions.add(bv.objective);
//     // Sub Initiative
//     if (bv.subInDes && !subInitiativeDropDownoptions.includes(bv.subInDes)) {
//       subInitiativeDropDownoptions.push(bv.subInDes);
//     }
//     // Activity
//     if (bv.activityDesc && !uniqueActivity.includes(bv.activityDesc)) {
//       uniqueActivity.push(bv.activityDesc);
//     }
//     // Sub Activity
//     if (bv.subActivityDes && !uniqueSubActivity.includes(bv.subActivityDes)) {
//       uniqueSubActivity.push(bv.subActivityDes);
//     }

//     // GL Account
//     const glAccountId = bv.glAccount;
//     if (glAccountId) {
//       const gl = glData.find(val => String(val.id) == String(glAccountId));
//       if (gl?.data?.glAccount) {
//         glAccountOptions.push({ id: glAccountId, label: gl.data.glAccount });
//       }
//     }

//     // Project/Initiative
//     const projId = item.initiativeId;
//     if (projId) {
//       const proj = projectList.find(p => String(p.id) == String(projId));
//       if (proj?.initiativeValue?.name) {
//         projectInitiativeOptions.push({ id: projId, label: proj.initiativeValue.name });
//       }
//     }

//     // Department
//     const deptId = bv.division;
//     if (deptId) {
//       const dept = deptlist.find(d => String(d.id) == String(deptId));
//       if (dept?.name) {
//         departmentOptions.push({ id: deptId, label: dept.name });
//       }
//     }

//     // Employee
//     const empId = bv.person;
//     if (empId) {
//       const emp = employeeList.find(e => String(e.id) == String(empId));
//       if (emp?.name) {
//         employeeOptions.push({ id: empId, label: emp.name });
//       }
//     }
//   });

//   const versionDropDownOptions = Array.from(versionOptions);
//   const outcomeDropDownOptions = Array.from(outcomeOptions);
//   const objectiveDropDownOptions = Array.from(objectiveOptions);

//   // Deduplicate options
//   const uniqueGlAccounts = [...new Map(glAccountOptions.map(i => [i.label, i])).values()];
//   const uniqueProjects = [...new Map(projectInitiativeOptions.map(i => [i.label, i])).values()];
//   const uniqueDepts = [...new Map(departmentOptions.map(i => [i.label, i])).values()];
//   const uniqueEmps = [...new Map(employeeOptions.map(i => [i.label, i])).values()];

//   // Helper to safely resolve labels
//   const getGlAccountLabel = (id) => {
//     const gl = glData.find(g => String(g.id) == String(id));
//     return gl?.data?.glAccount || String(id || '');
//   };
//   const getDeptLabel = (id) => {
//     const d = deptlist.find(d => String(d.id) == String(id));
//     return d?.name || String(id || '');
//   };
//   const getEmpLabel = (id) => {
//     const e = employeeList.find(e => String(e.id) == String(id));
//     return e?.name || String(id || '');
//   };

//   // Initialize DataTable
//   table = $("#budgetTable").DataTable({
//     // paging: true,
//     pageLength: 20,
//     lengthChange: false,
//     ordering: false,
//     info: false,
//     responsive: true,
//     scrollX: true,
//     scrollY: "400px",
//     processing: true,
//     deferRender: true,
//     data: budgetListJson,
//     columns: [
//       // S.No
//       { data: null, render: (data, type, row, meta) => meta.row + 1 },

//       // Year
//       {
//         data: null,
//         defaultContent: "N/A",
//         render: function (data, type, row, meta) {
//           const display = row.budgetValues?.year || "N/A";
//           if (type == "display") {
//             return `<span class="badge label-bg-dark rounded-pill" 
//               style="width:100%; display:inline-block; text-align:center;"
//               data-search="${display}">
//               ${display}
//             </span>`;
//           }
//           return display;
//         }
//       },

//       // Month
//       {
//         data: null,
//         defaultContent: "N/A",
//         render: function (data, type, row, meta) {
//           const display = row.budgetValues?.month || "N/A";
//           if (type == "display") {
//             return `<span class="badge label-bg-dark rounded-pill" 
//               style="width:100%; display:inline-block; text-align:center;"
//               data-search="${display}">
//               ${display}
//             </span>`;
//           }
//           return display;
//         }
//       },

//       // Version
//       {
//         data: null,
//         defaultContent: "N/A",
//        render: (data, type, row) => 
//     `<span class="tdSelect justify-content-center">${row.budgetValues?.version || ''}</span>`
//       },

//       // GL Account (ID → Label)
//       {
//         data: null,
//         defaultContent: "N/A",
//         render: function (data, type, row, meta) {
//            const glId = row.budgetValues?.glAccount;
//            const display = glId ? getGlAccountLabel(glId) : "N/A";
//           if (type == "display") {
//             return `<span class="badge label-bg-dark rounded-pill" 
//               style="width:100%; display:inline-block; text-align:center;"
//               data-search="${display}">
//               ${display}
//             </span>`;
//           }
//           return display;
//         }
//       },

//       // GL Name
//       {
//         data: null,
//         defaultContent: "N/A",
//         render: (data, type, row) => 
//               `<span class="badge label-bg-red rounded-pill">${row.budgetValues?.glname || ''}</span>`
//       },

//       // Budget Type
//       {
//         data: null,
//         defaultContent: "N/A",
//         render: (data, type, row) => 
//             `<span class="badge label-bg-red rounded-pill">${row.budgetValues?.budgetType || ''}</span>`
//       },

//       // Initiative Description
//       {
//         data: null,
//         defaultContent: "N/A",
//         render: function (data, type, row, meta) {
//          const display = row.budgetValues?.initiativeDesc || "N/A";
//           if (type == "display") {
//             return `<span class="badge label-bg-dark rounded-pill" 
//               style="width:100%; display:inline-block; text-align:center;"
//               data-search="${display}">
//               ${display}
//             </span>`;
//           }
//           return display;
//         }
//       },

//       // Outcome
//       {
//         data: null,
//         defaultContent: "N/A",
//         render: (data, type, row) => 
//             `<span class="tdSelect justify-content-center">${row.budgetValues?.outcome || ''}</span>`
//       },

//       // Objective
//       {
//         data: null,
//         defaultContent: "N/A",
//         render: (data, type, row) => 
//            `<span class="tdSelect justify-content-center">${row.budgetValues?.objective || ''}</span>`
//       },

//       // Sub Initiative (Editable dropdown)
//       {
//         data: null,
//         defaultContent: "N/A",
//         render: function (data, type, row, meta) {
//            const currentValue = row.budgetValues?.subInDes || "";
//     const initiativeId = row.initiativeId || "";
//           if (type == "display") {
//             return `<select class="subinitiative-select form-select form-select-sm border-0 bg-transparent p-0 m-0" 
//                    style="width:100%"
//                    onclick="fetchSubInitiatives(this, '${initiativeId}', ${meta.row}, ${meta.col})"
//                    onchange="handleChange(this, ${meta.row}, ${meta.col})"
//                    data-search="${currentValue}"
//                    data-row-index="${meta.row}">
//               <option value="">Select</option>
//               ${currentValue ? `<option value="${currentValue}" selected>${currentValue}</option>` : ""}
//             </select>`;
//           }
//           return currentValue;
//         }
//       },

//       // Activity (Editable dropdown)
//       {
//         data: null,
//         defaultContent: "N/A",
//         render: function (data, type, row, meta) {
//           const currentValue = row.budgetValues?.activityDesc ? row.budgetValues.activityDesc.toString().trim() : "";
//     const subInitiativeId = row.initiativeId || "";
//           if (type == "display") {
//             return `<select class="activity-select form-select form-select-sm border-0 bg-transparent p-0 m-0" 
//                    style="width:100%"
//                    onclick="fetchActivities(this, '${subInitiativeId}', ${meta.row}, ${meta.col})"
//                    onchange="handleChange(this, ${meta.row}, ${meta.col})"
//                    data-search="${currentValue}"
//                    data-row-index="${meta.row}">
//               <option value=""></option>
//               ${currentValue ? `<option value="${currentValue}" selected>${currentValue}</option>` : ""}
//             </select>`;
//           }
//           return currentValue;
//         }
//       },

//       // Sub Activity (Dropdown from unique list)
//       {
//         data: null,
//         defaultContent: "N/A",
//         render: function (data, type, row, meta) {
//            const currentValue = row.budgetValues?.subActivityDes ? String(row.budgetValues.subActivityDes).trim() : "";
//     const activityId = row.activityId || "";
//           if (type == "display") {
//             return `<select class="subactivity-select form-select form-select-sm border-0 bg-transparent p-0 m-0" 
//                    style="width:100%"
//                    onclick="fetchsubActivities(this, '${activityId}', ${meta.row}, ${meta.col})"
//                    onchange="handleChange(this, ${meta.row}, ${meta.col})"
//                    data-search="${currentValue}">
//               <option value=""></option>
//                ${currentValue ? `<option value="${currentValue}" selected>${currentValue}</option>` : ""}
//             </select>`;
//           }
//           return currentValue;
//         }
//       },

//       // Currency
//       {
//         data: null,
//         defaultContent: "N/A",
//         render: (data, type, row) => 
//     `<span class="badge label-bg-pink rounded-pill">${row.budgetValues?.currency || ''}</span>`
//       },

//       // No of Days (Editable)
//       {
//         data: null,
//         defaultContent: "N/A",
//         render: function (data, type, row, meta) {
//           return `<input type="number" 
//             class="noofDays-input form-control form-control-sm border-0 label-bg-cyan rounded-pill text-center" 
//             style="width:100%; background-color: #0dcaf0; color: white;"
//             value="${row.budgetValues?.noofDays || ''}" 
//             onfocus="this.style.backgroundColor='white';this.style.color='black'" 
//             onblur="handleChange(this, ${meta.row}, ${meta.col}, 'noofDays')" />`;
//         }
//       },

//       // Unit Amount (Editable)
//       {
//         data: null,
//         defaultContent: "N/A",
//         render: function (data, type, row, meta) {
//           return `<input type="number" 
//             class="unitamount-input form-control form-control-sm border-0 label-bg-cyan rounded-pill text-center" 
//             style="width:100%; background-color: #0dcaf0; color: white;"
//             value="${row.budgetValues?.unitamount || ''}" 
//             onfocus="this.style.backgroundColor='white';this.style.color='black'" 
//             onblur="handleChange(this, ${meta.row}, ${meta.col}, 'unitamount')" />`;
//         }
//       },

//       // Amount (Editable)
//       {
//         data: null,
//         defaultContent: "N/A",
//         render: function (data, type, row, meta) {
//           return `<input type="number" 
//             class="amount-input form-control form-control-sm border-0 label-bg-cyan rounded-pill text-center" 
//             style="width:100%; background-color: #0dcaf0; color: white;"
//             value="${row.budgetValues?.amount || ''}" 
//             onfocus="this.style.backgroundColor='white';this.style.color='black'" 
//             onblur="handleChange(this, ${meta.row}, ${meta.col}, 'amount')" />`;
//         }
//       },

//       // Division (Department - ID → Label)
//       {
//         data: null,
//         defaultContent: "N/A",
//         render: function (data, type, row, meta) {
//           const deptId = row.budgetValues?.division;
//           const display = deptId ? getDeptLabel(deptId) : "N/A";     
//           if (type == "display") {
//             return `<span class="badge label-bg-dark rounded-pill" 
//               style="width:100%; display:inline-block; text-align:center;"
//               data-search="${display}">
//               ${display}
//             </span>`;
//           }
//           return display;
//         }
//       },

//       // Person (Employee - ID → Label)
//       {
//         data: null,
//         defaultContent: "N/A",
//         render: function (data, type, row, meta) {
//            const empId = row.budgetValues?.person;
//            const display = empId ? getEmpLabel(empId) : "N/A";
//           if (type == "display") {
//             return `<span class="badge label-bg-pink rounded-pill" 
//               style="width:100%; display:inline-block; text-align:center;"
//               data-search="${display}">
//               ${display}
//             </span>`;
//           }
//           return display;
//         }
//       },

//       // Notes
//       {
//         data: null,
//         defaultContent: "N/A",
//         render: function (data, type, row, meta) {
//            const display = row.budgetValues?.notes || '';
//           if (type == "display") {
//             return `<span class="tdSelect justify-content-center" style="max-width: 200px; display: inline-block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${display}</span>`;
//           }
//           return display;
//         }
//       },

//       // Actions
//       {
//         data: null,
//         render: function (data, type, row, meta) {
//           return `<div class="table-actions justify-content-end">
//             <button class="btn btn-sm btn-outline-icon delete-btn" 
//                     data-id="${row.id || ""}" 
//                     onclick="handleDelete(${row.id || "null"}, ${meta.row})">
//               <span class="icon" data-bs-toggle="tooltip" data-bs-title="Delete">
//                 <img src="/stratroom/images/delete-i.svg" width="12" height="12">
//               </span>
//             </button>
//           </div>`;
//         }
//       }
//     ],
//     initComplete: function () {
//       this.api().columns().every(function () {
//         var column = this;
//         var idx = column.index();

//         // Skip S.No (0) and Actions (last)
//         if (idx == 0 || idx == 20) return;

//         var title = $(column.header()).text().trim() || "Column " + idx;
//         var select = $(`<select class="select2" style="width: min(200px,100%);"></select>`)
//           .appendTo($(column.header()).empty())
//           .on("change", function () {
//             var val = $(this).val();
//             var searchVal = Array.isArray(val)
//               ? val.map(v => "^" + $.fn.dataTable.util.escapeRegex(v) + "$").join("|")
//               : val;
//             column.search(searchVal || "", true, false).draw();
//           });

//         // Special filters
//         if (idx == 1) {
//           for (let y = 2020; y <= 2030; y++) select.append(`<option value="${y}">${y}</option>`);
//         } else if (idx == 2) {
//           ["January","February","March","April","May","June","July","August","September","October","November","December"]
//             .forEach(m => select.append(`<option value="${m}">${m}</option>`));
//         } else if (idx == 4) {
//           const seen = new Set();
//           glData.forEach(g => {
//             const acc = g.data?.glAccount;
//             if (acc && !seen.has(acc)) {
//               seen.add(acc);
//               select.append(`<option value="${acc}">${acc}</option>`);
//             }
//           });
//         } else if (idx == 17) {
//           deptlist.forEach(d => select.append(`<option value="${d.name}">${d.name}</option>`));
//         } else if (idx == 18) {
//           employeeList.forEach(e => select.append(`<option value="${e.name || 'N/A'}">${e.name || 'N/A'}</option>`));
//         } else {
//           column.data().unique().sort().each(function (d) {
//             if (d && d !== "N/A") {
//               select.append(`<option value="${d}">${d}</option>`);
//             }
//           });
//         }

//         select.select2({
//           multiple: true,
//           closeOnSelect: false,
//           placeholder: "Select " + title,
//           allowClear: true,
//           tags: true,
//           selectionCssClass: "form-select form-select-sm rounded-pill custom-multiple p-0 pe-3 px-1 bg-transparent text-dark",
//           dropdownCssClass: "select2-multiple-dropdown"
//         }).val(null).trigger("change");
//       });
//     },
//     drawCallback: function () {
//       $(".dataTables_filter").addClass("d-none");
//     }
//   });
// }


function initializeDataTable(budgetListJson) {
  console.log("Initializing DataTable with budgetListJson:", budgetListJson);
  console.log("Total items in budgetListJson:", budgetListJson.length);

  const withBudgetValues = budgetListJson.filter(item => item?.budgetValues);
  const withoutBudgetValues = budgetListJson.filter(item => !item?.budgetValues);

  console.log("✅ Rows with budgetValues:", withBudgetValues.length);
  console.log("❌ Rows WITHOUT budgetValues:", withoutBudgetValues.length);

  // Destroy existing table if present
  if ($.fn.DataTable.isDataTable("#budgetTable")) {
    $("#budgetTable").DataTable().clear().destroy();
    $("#budgetTable tbody").empty();
  }

  // --- Helper Lookup Functions (used in render & filtering) ---
  const getGlAccountLabel = (id) => {
    const gl = glData.find(g => String(g.id) == String(id));
    return gl?.data?.glAccount || String(id || 'N/A');
  };
  const getDeptLabel = (id) => {
    const d = deptlist.find(d => String(d.id) == String(id));
    return d?.name || String(id || 'N/A');
  };
  const getEmpLabel = (id) => {
    const e = employeeList.find(e => String(e.id) == String(id));
    return e?.name || String(id || 'N/A');
  };

  // --- Column Definitions with proper filtering support ---
  const columns = [
    // S.No
    { 
      data: null,
      orderable: false,
      render: (data, type, row, meta) => meta.row + 1 
    },

    // Year
    {
      data: null,
      render: (data, type, row) => {
        const val = row.budgetValues?.year || 'N/A';
        if (type == 'display') {
          return `<span class="badge label-bg-dark rounded-pill" style="width:100%; display:inline-block; text-align:center;">${val}</span>`;
        }
        return val; // for filtering & sorting
      }
    },

    // Month
    {
      data: null,
      render: (data, type, row) => {
        const val = row.budgetValues?.month || 'N/A';
        if (type == 'display') {
          return `<span class="badge label-bg-dark rounded-pill" style="width:100%; display:inline-block; text-align:center;">${val}</span>`;
        }
        return val;
      }
    },

    // Version
    {
      data: null,
      render: (data, type, row) => {
        const val = row.budgetValues?.version || 'N/A';
        if (type == 'display') {
          return `<span class="tdSelect justify-content-center">${val}</span>`;
        }
        return val;
      }
    },

    // GL Account (ID → Label)
    {
      data: null,
      render: (data, type, row) => {
        const val = getGlAccountLabel(row.budgetValues?.glAccount);
        if (type == 'display') {
          return `<span class="badge label-bg-dark rounded-pill" style="width:100%; display:inline-block; text-align:center;">${val}</span>`;
        }
        return val;
      }
    },

    // GL Name
    {
      data: null,
      render: (data, type, row) => {
        const val = row.budgetValues?.glname || 'N/A';
        if (type == 'display') {
          return `<span class="badge label-bg-red rounded-pill">${val}</span>`;
        }
        return val;
      }
    },

    // Budget Type
    {
      data: null,
      render: (data, type, row) => {
        const val = row.budgetValues?.budgetType || 'N/A';
        if (type == 'display') {
          return `<span class="badge label-bg-red rounded-pill">${val}</span>`;
        }
        return val;
      }
    },

    // Initiative Description
    {
      data: null,
      render: (data, type, row) => {
        const val = row.budgetValues?.initiativeDesc || 'N/A';
        if (type == 'display') {
          return `<span class="badge label-bg-dark rounded-pill" style="width:100%; display:inline-block; text-align:center;">${val}</span>`;
        }
        return val;
      }
    },

    // Outcome
    {
      data: null,
      render: (data, type, row) => {
        const val = row.budgetValues?.outcome || 'N/A';
        if (type == 'display') {
          return `<span class="tdSelect justify-content-center">${val}</span>`;
        }
        return val;
      }
    },

    // Objective
    {
      data: null,
      render: (data, type, row) => {
        const val = row.budgetValues?.objective || 'N/A';
        if (type == 'display') {
          return `<span class="tdSelect justify-content-center">${val}</span>`;
        }
        return val;
      }
    },

    // Sub Initiative (Editable dropdown)
    {
      data: null,
      render: (data, type, row, meta) => {
        const val = row.budgetValues?.subInDes || '';
        if (type == 'display') {
          const initiativeId = row.initiativeId || '';
          return `<select class="subinitiative-select form-select form-select-sm border-0 bg-transparent p-0 m-0" 
                   style="width:100%"
                   onclick="fetchSubInitiatives(this, '${initiativeId}', ${meta.row}, ${meta.col})"
                   onchange="handleChange(this, ${meta.row}, ${meta.col})"
                   data-search="${val}"
                   data-row-index="${meta.row}">
              <option value="">Select</option>
              ${val ? `<option value="${val}" selected>${val}</option>` : ""}
            </select>`;
        }
        return val;
      }
    },

    // Activity
    {
      data: null,
      render: (data, type, row, meta) => {
        const val = row.budgetValues?.activityDesc?.toString().trim() || '';
        if (type == 'display') {
          const subInitiativeId = row.initiativeId || '';
          return `<select class="activity-select form-select form-select-sm border-0 bg-transparent p-0 m-0" 
                   style="width:100%"
                   onclick="fetchActivities(this, '${subInitiativeId}', ${meta.row}, ${meta.col})"
                   onchange="handleChange(this, ${meta.row}, ${meta.col})"
                   data-search="${val}"
                   data-row-index="${meta.row}">
              <option value=""></option>
              ${val ? `<option value="${val}" selected>${val}</option>` : ""}
            </select>`;
        }
        return val;
      }
    },

    // Sub Activity
    {
      data: null,
      render: (data, type, row, meta) => {
        const val = row.budgetValues?.subActivityDes?.toString().trim() || '';
        if (type == 'display') {
          const activityId = row.activityId || '';
          return `<select class="subactivity-select form-select form-select-sm border-0 bg-transparent p-0 m-0" 
                   style="width:100%"
                   onclick="fetchsubActivities(this, '${activityId}', ${meta.row}, ${meta.col})"
                   onchange="handleChange(this, ${meta.row}, ${meta.col})"
                   data-search="${val}">
              <option value=""></option>
              ${val ? `<option value="${val}" selected>${val}</option>` : ""}
            </select>`;
        }
        return val;
      }
    },

    // Currency
    {
      data: null,
      render: (data, type, row) => {
        const val = row.budgetValues?.currency || 'N/A';
        if (type == 'display') {
          return `<span class="badge label-bg-pink rounded-pill">${val}</span>`;
        }
        return val;
      }
    },

    // No of Days
    {
      data: null,
      render: (data, type, row, meta) => {
        const val = row.budgetValues?.noofDays || '';
        if (type == 'display') {
          return `<input type="number" 
            class="noofDays-input form-control form-control-sm border-0 label-bg-cyan rounded-pill text-center" 
            style="width:100%; background-color: #0dcaf0; color: white;"
            value="${val}" 
            onfocus="this.style.backgroundColor='white';this.style.color='black'" 
            onblur="handleChange(this, ${meta.row}, ${meta.col}, 'noofDays')" />`;
        }
        return val;
      }
    },

    // Unit Amount
    {
      data: null,
      render: (data, type, row, meta) => {
        const val = row.budgetValues?.unitamount || '';
        if (type == 'display') {
          return `<input type="number" 
            class="unitamount-input form-control form-control-sm border-0 label-bg-cyan rounded-pill text-center" 
            style="width:100%; background-color: #0dcaf0; color: white;"
            value="${val}" 
            onfocus="this.style.backgroundColor='white';this.style.color='black'" 
            onblur="handleChange(this, ${meta.row}, ${meta.col}, 'unitamount')" />`;
        }
        return val;
      }
    },

    // Amount
    {
      data: null,
      render: (data, type, row, meta) => {
        const val = row.budgetValues?.amount || '';
        if (type == 'display') {
          return `<input type="number" 
            class="amount-input form-control form-control-sm border-0 label-bg-cyan rounded-pill text-center" 
            style="width:100%; background-color: #0dcaf0; color: white;"
            value="${val}" 
            onfocus="this.style.backgroundColor='white';this.style.color='black'" 
            onblur="handleChange(this, ${meta.row}, ${meta.col}, 'amount')"  readonly/>`;
        }
        return val;
      }
    },

    // Division (Department)
    {
      data: null,
      render: (data, type, row) => {
        const val = getDeptLabel(row.budgetValues?.division);
        if (type == 'display') {
          return `<span class="badge label-bg-dark rounded-pill" style="width:100%; display:inline-block; text-align:center;">${val}</span>`;
        }
        return val;
      }
    },

    // Person (Employee)
    {
      data: null,
      render: (data, type, row) => {
        const val = getEmpLabel(row.budgetValues?.person);
        if (type == 'display') {
          return `<span class="badge label-bg-pink rounded-pill" style="width:100%; display:inline-block; text-align:center;">${val}</span>`;
        }
        return val;
      }
    },

    // Notes
    {
      data: null,
      render: (data, type, row) => {
        const val = row.budgetValues?.notes || '';
        if (type == 'display') {
          return `<span class="tdSelect justify-content-center" style="max-width: 200px; display: inline-block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${val}</span>`;
        }
        return val;
      }
    },

    // Actions
    {
      data: null,
      orderable: false,
      render: (data, type, row, meta) => {
        return `<div class="table-actions justify-content-end">
          <button class="btn btn-sm btn-outline-icon delete-btn" 
                  data-id="${row.id || ""}" 
                  onclick="handleDelete(${row.id || "null"}, ${meta.row})">
            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Delete">
              <img src="/stratroom/images/delete-i.svg" width="12" height="12">
            </span>
          </button>
        </div>`;
      }
    }
  ];

  // Initialize DataTable
  table = $("#budgetTable").DataTable({
    pageLength: 20,
    lengthChange: false,
    ordering: false,
    info: false,
    responsive: true,
    scrollX: true,
    scrollY: "400px",
    processing: true,
    deferRender: true,
    data: budgetListJson,
    columns: columns,
    initComplete: function () {
      const api = this.api();
      api.columns().every(function (idx) {
        // Skip S.No (0) and Actions (last column)
        if (idx == 0 || idx == api.columns().count() - 1) return;

        const column = this;
        const headerText = $(column.header()).text().trim() || "Filter";

        // Build select dropdown
        const select = $(`<select class="select2" style="width: min(200px,100%);"></select>`)
          .appendTo($(column.header()).empty())
          .on('change', function () {
            const val = $(this).val();
            const searchVal = Array.isArray(val)
              ? val.map(v => "^" + $.fn.dataTable.util.escapeRegex(v) + "$").join("|")
              : val;
            column.search(searchVal || "", true, false).draw();
          });

        // Get unique filter values (from rendered 'filter' data)
        const uniqueValues = [];
        const seen = new Set();

        api.column(idx).data().each(function (rowData) {
          // Use the render function to get filter value
          const filterVal = columns[idx].render
            ? columns[idx].render(rowData, 'filter', rowData)
            : rowData;

          if (filterVal && filterVal !== 'N/A' && !seen.has(filterVal)) {
            seen.add(filterVal);
            uniqueValues.push(filterVal);
          }
        });

        // Special predefined filters
        if (idx == 1) { // Year
          for (let y = 2020; y <= 2030; y++) {
            select.append(`<option value="${y}">${y}</option>`);
          }
        } else if (idx == 2) { // Month
          ["January","February","March","April","May","June","July","August","September","October","November","December"]
            .forEach(m => select.append(`<option value="${m}">${m}</option>`));
        } else if (idx == 17) { // Department
          deptlist.forEach(d => {
            if (d.name) select.append(`<option value="${d.name}">${d.name}</option>`);
          });
        } else if (idx == 18) { // Employee
          employeeList.forEach(e => {
            if (e.name) select.append(`<option value="${e.name}">${e.name}</option>`);
          });
        } else {
          // General case: use unique rendered filter values
          uniqueValues.sort().forEach(val => {
            select.append(`<option value="${val}">${val}</option>`);
          });
        }

        // Initialize Select2
        select.select2({
          multiple: true,
          closeOnSelect: false,
          placeholder: "Select " + headerText,
          allowClear: true,
          tags: true,
          selectionCssClass: "form-select form-select-sm rounded-pill custom-multiple p-0 pe-3 px-1 bg-transparent text-dark",
          dropdownCssClass: "select2-multiple-dropdown"
        }).val(null).trigger("change");
      });
    },
    drawCallback: function () {
      $(".dataTables_filter").addClass("d-none");
    }
  });
}

function handleDelete(id, rowIndex) {
  console.log("Deleting ID:", id, "Row index:", rowIndex);

  if (!confirm("Are you sure you want to delete this item?")) {
    return;
  }

  $.ajax({
    url: "/stratroom/budgets/" + id,
    type: "DELETE",
    contentType: "application/json",
    success: function (data, status) {
      // Remove row from DataTable
      const table = $("#budgetTable").DataTable();
      table.row(rowIndex).remove().draw();

      $.notify("Success: Deleted Successfully", {
        style: "success",
        className: "graynotify",
      });
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
      alert("Failed to delete. Please try again.");
    },
  });
}




const popoverTrigger = document.getElementById('popoverFilterStatus');


const popover = new bootstrap.Popover(popoverTrigger, {
  html: true,
  placement: 'bottom',
  content: `
    <div>
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h5 class="h6 mb-0">Filter Status</h5>
        <button type="button" class="btn-close" aria-label="Close"></button>
      </div>
      <div class="d-flex flex-column gap-2 pageViewOption">   
        <div class="form-check">
          <input class="form-check-input filter-status" id="status-approved" type="checkbox" value="Approved">
          <label class="form-check-label" for="status-approved">Approved</label>
        </div>
        <div class="form-check">
          <input class="form-check-input filter-status" id="status-draft" type="checkbox" value="Draft">
          <label class="form-check-label" for="status-draft">Draft</label>
        </div>
      </div>
    </div>
  `,
  sanitize: false
});


$(document).on('shown.bs.popover', function () {
  const currentValue = $('#approvedDraft').val(); 
  
  $('#status-approved').prop('checked', false);
  $('#status-draft').prop('checked', false);

  if (currentValue == 'APPROVED') {
    $('#status-approved').prop('checked', true);
  } else if (currentValue == 'DRAFT') {
    $('#status-draft').prop('checked', true);
  }
});


$(document).on('change', '.filter-status', function () {
  const $approvedCheckbox = $('#status-approved');
  const $draftCheckbox = $('#status-draft');
  const $approvedDraftField = $('#approvedDraft');

  if ($(this).is('#status-draft') && $(this).is(':checked')) {
    $approvedCheckbox.prop('checked', false);
    $approvedDraftField.val('DRAFT'); 
  }

  else if ($(this).is('#status-approved') && $(this).is(':checked')) {
    $draftCheckbox.prop('checked', false);
    $approvedDraftField.val('APPROVED'); 
  }
  
  else if (!$approvedCheckbox.is(':checked') && !$draftCheckbox.is(':checked')) {
    $approvedCheckbox.prop('checked', true);
    $approvedDraftField.val('APPROVED');
  }

 
  if ($.fn.DataTable.isDataTable("#budgetTable")) {
    $("#budgetTable").DataTable().destroy();
  }
  $("#budgetTable tbody").empty();
  fetchBudgetListData(); 
});


$(function () {

  $('#approvedDraft').val('APPROVED'); 

  $('#status-approved').prop('checked', true);
  $('#status-draft').prop('checked', false);
});

fetchBudgetListData();
getGlAccountData();
getEmployeeList();
getInitiativeListByEmployee();
getAllDeptist();
//Add Row function
$("#addRowButton").click(function () {
  var savePayload = {
    pageId: $("#pagenumber").val(),
    createBy: "",
    id: "",
    updateBy: "",
    owner: "",
    deptId: "",
    budgetValues: {
      year: "",
      month: "",
      version: "",
      glAccount: "",
      glName: "",
      currency: "",
      noofDays: "",
      unitamount: "",
      amount: "",
      outcome: "",
      objective: "",
      projectinitiative: "",
      subInitiative: "",
      activity: "",
      subActivity: "",
      division: "",
      person: "",
      notes: "",
    },
  };

  $.ajax({
    url: "/stratroom/budgets",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(savePayload),
    success: function (data, status) {
      $("#budgetTable").empty();
      location.reload();
    },
  });
});


function handleOnChange(element, rowIndex, columnIndex) {
  console.log(element, rowIndex, columnIndex, "On Change Called");
  const rowData = table.row(rowIndex).data();

  console.log(rowData, "rowwwwwwwwwww");
}

//Update function
function handleChange(element, rowIndex, columnIndex) {
  console.log(columnIndex,element,  "Column Index");
  const selectedValue = element.value;
  console.log(selectedValue, "selectedValue");
  //Gl Account and GL Name handling
  if (columnIndex == 4) {
    const selectedOption = $(element).find("option:selected");
    console.log(selectedOption, "selOPtion");
    const glAccount = selectedOption.val();
    const glAccountDesc = selectedOption.data("glaccount");
    const glName = selectedOption.data("glname");
    const budgetType = selectedOption.data("budgettype");
    console.log("Selected GL Account:", glAccount, glAccountDesc, glName);
  } else if (columnIndex == 7) {
    const selectedOption = $(element).find("option:selected");
    console.log(selectedOption, "selectedOptionData");
    var initiativeId = selectedOption.val();
    var objectiveDesc = selectedOption.data("objective");
    var perspectiveName = selectedOption.data("outcome");
    var initiativeName = selectedOption.data("name");
    console.log(
      "Selected Initiative:",
      initiativeId,
      objectiveDesc,
      perspectiveName,
      initiativeName
    );
  } else if (columnIndex == 10) {
    const selectedOption = element.options[element.selectedIndex];
    var subInitiativeDes = selectedOption.text;
    var subInitiativeId = selectedValue;
    console.log("Selected Sub-Initiative:", subInitiativeDes, subInitiativeId);
  } else if (columnIndex == 11) {
    const selectedOption = element.options[element.selectedIndex];
    var activityDes = selectedOption.text;
    var activityId = selectedValue;
    console.log("Selected Activity:", activityDes, activityId);
  } else if(columnIndex == 12){
    const selectedOption = element.options[element.selectedIndex];
    var subactivityDes = selectedOption.text;
    var subactivityId = selectedValue;
  }
  const table = $("#budgetTable").DataTable();

  const rowData = table.row(rowIndex).data();

  console.log(
    "Row data before update:",
    rowIndex,
    columnIndex,
    selectedValue,
    rowData
  );
  var updatePayload = {
    pageId: $("#pagenumber").val(),
    createBy: "",
    id: rowData.id,
    changeId: rowData.changeId,
    updateBy: $("#userPrincipal").val().trim(),
    owner: $("#userPrincipal").val().trim(),
    deptId: columnIndex == 17 ? selectedValue : rowData.budgetValues.division,
    initiativeId:
      columnIndex == 7
        ? initiativeId
          ? initiativeId
          : rowData.initiativeId
        : rowData.initiativeId,
    subInitiativeId:
      columnIndex == 10 ? subInitiativeId : rowData.subInitiativeId,
    // subInitiativeDesc: subInitiativeDes,
    activityId: columnIndex == 11 ? activityId : rowData.activityId,
    // activityDesc: activityDes,
    // subActivityId: rowData.subActivityId ? rowData.subActivityId : "",
    subActivityId : columnIndex == 12 ? subactivityId : rowData.subActivityId,
    // subInitiativeDesc: subinitiative,
    budgetValues: {
      year: columnIndex == 1 ? selectedValue : rowData.budgetValues.year,
      month: columnIndex == 2 ? selectedValue : rowData.budgetValues.month,
      version: columnIndex == 3 ? selectedValue : rowData.budgetValues.version,

      glaccountdesc:
        columnIndex == 4
          ? $(element).find("option:selected").data("glaccount")
          : rowData.budgetValues.glaccountdesc,

      glAccount:
        columnIndex == 4 ? selectedValue : rowData.budgetValues.glAccount,

      glname:
        columnIndex == 4
          ? $(element).find("option:selected").data("glname")
          : rowData.budgetValues.glname,

      budgetType: rowData.budgetValues.budgetType
        ? rowData.budgetValues.budgetType
        : "",

      projectinitiative:
        columnIndex == 7
          ? initiativeName
            ? initiativeName
            : ""
          : rowData.budgetValues.projectinitiative,

      outcome:
        columnIndex == 7
          ? perspectiveName
            ? perspectiveName
            : ""
          : rowData.budgetValues.outcome,

      objective:
        columnIndex == 7
          ? objectiveDesc
            ? objectiveDesc
            : ""
          : rowData.budgetValues.objective,

      subinitiative:
        columnIndex == 10 ? subInitiativeId : rowData.subInitiativeId,
      subInitiativeDesc:
        columnIndex == 10
          ? subInitiativeDes
          : rowData.budgetValues.subInitiativeDesc,
      subInDes:
        columnIndex == 10 ? subInitiativeDes : rowData.budgetValues.subInDes,
      activity: columnIndex == 11 ? activityId : rowData.activityId,
      activityDesc:
        columnIndex == 11 ? activityDes : rowData.budgetValues.activityDesc,
      // subActivity: rowData.subActivityId ? rowData.subActivityId : "",
      // subActivityDes: rowData.budgetValues.subActivityDes
      //   ? rowData.budgetValues.subActivityDes
      //   : "",
      subActivity :  columnIndex == 12 ? subactivityId : rowData.subactivityId,
      subActivityDes : columnIndex == 12 ? subactivityDes : rowData.budgetValues.subActivityDes,
      currency:
        columnIndex == 13 ? selectedValue : rowData.budgetValues.currency,
      noofDays:
        columnIndex == 14 ? selectedValue : rowData.budgetValues.noofDays,
      unitamount:
        columnIndex == 15 ? selectedValue : rowData.budgetValues.unitamount,
      // amount: columnIndex == 16 ? selectedValue : rowData.budgetValues.amount,
      amount: columnIndex == 14 ? parseFloat(selectedValue || 0) * parseFloat(rowData.budgetValues.unitamount || 0) :  columnIndex == 15 ? parseFloat(selectedValue || 0) * parseFloat(rowData.budgetValues.noofDays || 0) : 0, 
      divisionDesc:
        columnIndex == 17
          ? $(element).find("option:selected").text()
          : rowData.budgetValues.divisionDesc,
      division:
        columnIndex == 17 ? selectedValue : rowData.budgetValues.division,

      personDesc:
        columnIndex == 18
          ? $(element).find("option:selected").data("name")
          : rowData.budgetValues.personDesc,
      person: columnIndex == 18 ? selectedValue : rowData.budgetValues.person,
      notes: columnIndex == 19 ? selectedValue : rowData.budgetValues.notes,
    },
  };

  console.log(updatePayload, "updatePayload");

  $.ajax({
    url: "/stratroom/budgets",
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(updatePayload),
    success: function (data, status) {
      if ($.fn.DataTable.isDataTable("#budgetTable")) {
        $("#budgetTable").DataTable().destroy();
      }
      // Clear the table body
      $("#budgetTable tbody").empty();
      fetchBudgetListData();
    },
  });
}

// Dummy data fallback
const subInitiativesDummyData = [
  {
    id: 77,
    subInitiativeValue: {
      name: "Product Demo & Evaluation",
      description: "Product Demo & Evaluation",
    },
  },
  {
    id: 78,
    subInitiativeValue: {
      name: "Technical Evaluation",
      description: "Technical Evaluation",
    },
  },
  {
    id: 79,
    subInitiativeValue: {
      name: "Commercial Evaluation",
      description: "Commercial Evaluation",
    },
  },
  {
    id: 80,
    subInitiativeValue: {
      name: "Budget Approval by board",
      description: "Budget Approval by board",
    },
  },
  {
    id: 81,
    subInitiativeValue: {
      name: "Approval from Architecture Team",
      description: "Approval from Architecture Team",
    },
  },
];

function fetchSubInitiatives(selectElement, initiativeId, rowIndex, colIndex) {
  // Only fetch if the dropdown is empty (except for the current value)
  if (
    selectElement.options.length > (selectElement.dataset.currentValue ? 2 : 1)
  ) {
    return; // Options already loaded
  }

  if (!initiativeId) {
    console.warn("No initiativeId selected");
    return;
  }

  // Show loading state
  const currentValue = selectElement.dataset.currentValue;
  selectElement.innerHTML = `
    <option value="">Select</option>
    ${
      currentValue
        ? `<option value="${currentValue}" selected>${currentValue}</option>`
        : ""
    }
    <option value="" disabled>Loading...</option>
  `;

  // Fetch sub-initiatives
  $.ajax({
    url: "/stratroom/subInitiativesList/" + initiativeId,
    type: "GET",
    success: function (response) {
      populateSubInitiativeDropdown(selectElement, response, currentValue);
    },
    error: function (xhr, status, error) {
      console.error("API failed, using dummy data:", error);
      populateSubInitiativeDropdown(
        selectElement,
        subInitiativesDummyData,
        currentValue
      );
    },
  });
}

function populateSubInitiativeDropdown(selectElement, data, currentValue) {
  // Clear existing options except the current value
  selectElement.innerHTML = `
    <option value="">Select</option>
    ${
      currentValue
        ? `<option value="${currentValue}" selected>${currentValue}</option>`
        : ""
    }
  `;

  // Add new options from data
  data.forEach((opt) => {
    const option = document.createElement("option");
    option.value = opt.id;
    option.textContent = opt.subInitiativeValue?.name || opt.subInitiativeValue?.description;
    option.setAttribute(
      "data-description",
      opt.subInitiativeValue?.description || ""
    );
    selectElement.appendChild(option);
  });

  // If no options were added (empty response)
  if (selectElement.options.length <= (currentValue ? 2 : 1)) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No options available";
    option.disabled = true;
    selectElement.appendChild(option);
  }
}

function fetchSubInitiatives(selectElement, initiativeId, rowIndex, colIndex) {
  // Only fetch if the dropdown is empty (except for the current value)
  if (
    selectElement.options.length > (selectElement.dataset.currentValue ? 2 : 1)
  ) {
    return; // Options already loaded
  }

  if (!initiativeId) {
    console.warn("No initiativeId selected");
    return;
  }

  // Show loading state
  const currentValue = selectElement.dataset.currentValue;
  selectElement.innerHTML = `
    <option value="">Select</option>
    ${
      currentValue
        ? `<option value="${currentValue}" selected>${currentValue}</option>`
        : ""
    }
    <option value="" disabled>Loading...</option>
  `;

  // Fetch sub-initiatives
  $.ajax({
    url: "/stratroom/subInitiativesList/" + initiativeId,
    type: "GET",
    success: function (response) {
      populateSubInitiativeDropdown(selectElement, response, currentValue);
    },
    error: function (xhr, status, error) {
      console.error("API failed, using dummy data:", error);
      populateSubInitiativeDropdown(
        selectElement,
        subInitiativesDummyData,
        currentValue
      );
    },
  });
}

function populateSubInitiativeDropdown(selectElement, data, currentValue) {
  // Clear existing options except the current value
  selectElement.innerHTML = `
    <option value="">Select</option>
    ${
      currentValue
        ? `<option value="${currentValue}" selected>${currentValue}</option>`
        : ""
    }
  `;

  // Add new options from data
  data.forEach((opt) => {
    const option = document.createElement("option");
    option.value = opt.id;
    option.textContent = opt.subInitiativeValue?.name || opt.subInitiativeValue?.description;
    option.setAttribute(
      "data-description",
      opt.subInitiativeValue?.description || ""
    );
    selectElement.appendChild(option);
  });

  // If no options were added (empty response)
  if (selectElement.options.length <= (currentValue ? 2 : 1)) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No options available";
    option.disabled = true;
    selectElement.appendChild(option);
  }
}

//Activity api call
// Dummy data fallback for activities
const activitiesDummyData = [
  { id: 1, name: "Market Research" },
  { id: 2, name: "Product Development" },
  { id: 3, name: "Testing" },
  { id: 4, name: "Marketing Campaign" },
  { id: 5, name: "Sales Training" },
];


function fetchsubActivities(selectElement, activityId, rowIndex, colIndex) {
  console.log(selectElement, activityId, rowIndex, colIndex, "Ganeshhh");
  if (
    selectElement.options.length > (selectElement.dataset.currentValue ? 2 : 1)
  ) {
    return; // Options already loaded
  }

  if (!activityId) {
    console.warn("No Activity selected");
    return;
  }

  // Show loading state
  const currentValue = selectElement.dataset.currentValue;
  selectElement.innerHTML = `
    <option value="">Select</option>
    ${
      currentValue
        ? `<option value="${currentValue}" selected>${currentValue}</option>`
        : ""
    }
    <option value="" disabled>Loading...</option>
  `;

  // Fetch activities
  $.ajax({
    url: "/stratroom/subActivitieslist/" + activityId,
    type: "GET",
    success: function (response) {
      console.log(response, "response");
      populateSubActivityDropdown(selectElement, response, currentValue);
    },
    error: function (xhr, status, error) {
      console.error("API failed, using dummy data:", error);
      populateSubActivityDropdown(
        selectElement,
        activitiesDummyData,
        currentValue
      );
    },
  });
}

function fetchActivities(selectElement, subInitiativeId, rowIndex, colIndex) {
  // Only fetch if the dropdown is empty (except for the current value)
  if (
    selectElement.options.length > (selectElement.dataset.currentValue ? 2 : 1)
  ) {
    return; // Options already loaded
  }

  if (!subInitiativeId) {
    console.warn("No subInitiativeId selected");
    return;
  }

  // Show loading state
  const currentValue = selectElement.dataset.currentValue;
  selectElement.innerHTML = `
    <option value="">Select</option>
    ${
      currentValue
        ? `<option value="${currentValue}" selected>${currentValue}</option>`
        : ""
    }
    <option value="" disabled>Loading...</option>
  `;

  // Fetch activities
  $.ajax({
    url: "/stratroom/activitieslist/" + subInitiativeId,
    type: "GET",
    success: function (response) {
      populateActivityDropdown(selectElement, response, currentValue);
    },
    error: function (xhr, status, error) {
      console.error("API failed, using dummy data:", error);
      populateActivityDropdown(
        selectElement,
        activitiesDummyData,
        currentValue
      );
    },
  });
}

function populateActivityDropdown(selectElement, data, currentValue) {
  console.log(data, "data"); // Check the exact structure in console

  // Clear existing options except the current value
  selectElement.innerHTML = `
    <option value="">Select</option>
    ${
      currentValue
        ? `<option value="${currentValue}" selected>${currentValue}</option>`
        : ""
    }
  `;

  // Add new options from data
  data.forEach((activity) => {
    const option = document.createElement("option");
    option.value = activity.id;
    // Use activitiesValue.desc if available, otherwise fallback to activitiesValue.name or empty string
    option.textContent =
      activity.activitiesValue?.desc ||
      activity.activitiesValue?.name ||
      "Unnamed Activity";
    selectElement.appendChild(option);
  });

  // If no options were added (empty response)
  if (selectElement.options.length <= (currentValue ? 2 : 1)) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No activities available";
    option.disabled = true;
    selectElement.appendChild(option);
  }
}


function populateSubActivityDropdown(selectElement, data, currentValue) {
  console.log(data, "data"); // Check the exact structure in console

  // Clear existing options except the current value
  selectElement.innerHTML = `
    <option value="">Select</option>
    ${
      currentValue
        ? `<option value="${currentValue}" selected>${currentValue}</option>`
        : ""
    }
  `;

  // Add new options from data
  data.forEach((activity) => {
    const option = document.createElement("option");
    option.value = activity.id;
    // Use activitiesValue.desc if available, otherwise fallback to activitiesValue.name or empty string
    option.textContent =
      activity.activitiesValue?.desc ||
      activity.activitiesValue?.name ||
      "Unnamed Activity";
    selectElement.appendChild(option);
  });

  // If no options were added (empty response)
  if (selectElement.options.length <= (currentValue ? 2 : 1)) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No activities available";
    option.disabled = true;
    selectElement.appendChild(option);
  }
}


 $('#budgetTable').on('draw.dt', function () {
  $('#budgetTable tbody tr').each(function () {
    $(this).find('td').each(function (colIndex) {
      // Apply editable and text-center to all
      $(this).addClass('editable text-center');

      // Only apply text-nowrap if not column 19
      if (colIndex !== 19) {
        $(this).addClass('text-nowrap');
      } else {
        $(this).removeClass('text-nowrap'); // remove in case previously added
      }
    });
  });
});

  var yearDropDownOptions = [];
  var monthDropDownOptions = [];
  var versionDropDownOptions = [];
  var glAccountDropDownOptions = [];
  var glnameDropDownOptions = [];
  var budgetTypeDropDownOptions = [];
  var initiativeDescDropDownOptions = [];
  var outcomeDropDownOptions = [];
  var objectiveDropDownOptions = [];
  var subInitiativeDescDropDownOptions = [];
  var activityDescDropDownOptions = [];
  var subActivityDesDropDownOptions = [];
  var currencyDropDownOptions = [];
  var numberofQuantityDropDownOptions = [];
  var unitAmountDropDownOptions = [];
  var totalBudgetDropDownOptions = [];
  var divisionDropDownOptions = [];
  var ownerNameDropDownOptions = [];
  var notesDropDownOptions = [];
  var statusDropDownOptions = [];


  for (let year = 2020; year <= 2030; year++) {
  yearDropDownOptions.push({ id: year, text: year });
}

  const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const currency = [
  'LSL',
  'USD',
  'INR'
]
months.forEach(month => {
  monthDropDownOptions.push({ id: month, text: month });
});

currency.forEach(month => {
  currencyDropDownOptions.push({ id: month, text: month });
});

glData.forEach(val => {
  glAccountDropDownOptions.push({ id: val.id, text: val.data.glAccount, glname:val.data.glName,  budgettype:val.data.budgetType});
});

projectList.forEach(val => {
  initiativeDescDropDownOptions.push({ id: val.id, text: val.initiativeValue.name, objective:val.initiativeValue.objectiveDesc,  outcome:val.initiativeValue.perspectiveName});
});

deptlist.forEach(val => {
  divisionDropDownOptions.push({ id: val.id, text: val.name});
});

employeeList.forEach(val => {
  ownerNameDropDownOptions.push({ id: val.id, text: val.name});
});

$('#budgetTable tbody').on('click', 'td.editable', function () {
  console.log("function called");
  var $cell = $(this);
  var table = $('#budgetTable').DataTable();
  var rowIdx = $(this).closest('tr').index(); 
  var colIdx = $cell.index();

  const excludedIndexes = [3, 8, 9, 14, 15, 16, 19];


  if (colIdx >= 1 && colIdx <= 19 && !excludedIndexes.includes(colIdx)) {
    if ($cell.find('select').length == 0) {
      var currentText = $cell.text().trim();
      var select = $('<select class="editor-select2" style="width:100%;"></select>');

      // Get options list based on column
      var optionsList = (
        colIdx == 1) ? yearDropDownOptions :
        (colIdx == 2) ? monthDropDownOptions :
        (colIdx == 4) ? glAccountDropDownOptions :
        (colIdx == 7) ? initiativeDescDropDownOptions :
        (colIdx == 10) ? subInitiativeDescDropDownOptions :
        (colIdx == 11) ? activityDescDropDownOptions :
        (colIdx == 12) ? subActivityDesDropDownOptions :
        (colIdx == 13) ? currencyDropDownOptions :
        (colIdx == 17) ? divisionDropDownOptions :
        (colIdx == 18) ? ownerNameDropDownOptions : [];

      // Build options with proper data attributes
      optionsList.forEach(function (opt) {
        var $option = $('<option></option>')
          .val(opt.id)
          .text(opt.text);

        if (colIdx == 4) {
          $option.data('glname', opt.glname).data('budgettype', opt.budgettype);
        } else if (colIdx == 7) {
          $option.data('objective', opt.objective).data('outcome', opt.outcome);
        }

        select.append($option);
      });

      $cell.empty().append(select);

      // == Map text to id for pre-selection ==
      let selectedId = '';
      if (currentText !== 'N/A') {
        const matchedOption = optionsList.find(opt => opt.text == currentText);
        if (matchedOption) {
          selectedId = matchedOption.id;
        }
      }

      // Initialize Select2
      select.select2({
        placeholder: (colIdx == 1) ? "Select Year" :
                    (colIdx == 2) ? "Select Month" : "Select...",
        allowClear: true,
        tags: true,
        width: '100%'
      }).val(selectedId).trigger('change'); // Set by ID, not text

      select.select2("open");

      // On change: store ID in data
      select.on('change', function () {
        var selectedValue = $(this).val(); // This is the ID (correct)

        var rowData = table.row($(this).closest('tr')).data();
        if (colIdx == 1) {
          rowData.budgetValues.year = selectedValue;
        } else if (colIdx == 2) {
          rowData.budgetValues.month = selectedValue;
        } else if (colIdx == 4) {
          rowData.budgetValues.glAccount = selectedValue;
          // Optionally set related fields from data
          const selectedOpt = $(this).find('option:selected');
          rowData.budgetValues.glName = selectedOpt.data('glname') || '';
          rowData.budgetValues.budgetType = selectedOpt.data('budgettype') || '';
        } else if (colIdx == 7) {
          rowData.budgetValues.initiativeDesc = selectedValue;
          const selectedOpt = $(this).find('option:selected');
          rowData.budgetValues.objective = selectedOpt.data('objective') || '';
          rowData.budgetValues.outcome = selectedOpt.data('outcome') || '';
        }
        // Add more as needed...

        handleChange(this, rowIdx, colIdx);
      });

      // On close: display TEXT, not ID
      select.on('select2:close', function () {
        var $thisSelect = $(this);
        var selectedText = $thisSelect.find('option:selected').text() || 'N/A';

        // Fallback to 'N/A' if no selection
        if (!selectedText || selectedText == '') {
          selectedText = 'N/A';
        }

        // Define badge class per column
        let badgeClass = "tdSelect dropdown-toggle";
        if (colIdx == 1) badgeClass = "badge label-bg-dark rounded-pill dropdown-toggle";         // Year
        else if (colIdx == 2) badgeClass = "badge label-bg-dark rounded-pill dropdown-toggle";   // Month
        else if (colIdx == 6) badgeClass = "badge label-bg-red rounded-pill dropdown-toggle";     // Budget Type
        else if (colIdx == 13) badgeClass = "badge label-bg-pink rounded-pill dropdown-toggle";  // Currency
        else if (colIdx == 14) badgeClass = "badge label-bg-blue rounded-pill dropdown-toggle";   // Qty
        else if (colIdx == 15) badgeClass = "badge label-bg-yellow rounded-pill dropdown-toggle"; // Unit Amount
        else if (colIdx == 16) badgeClass = "badge label-bg-cyan rounded-pill dropdown-toggle";   // Total Budget
        else if (colIdx == 18) badgeClass = "badge label-bg-pink rounded-pill dropdown-toggle";   // Owner

        $cell.html(`<span class="${badgeClass}">${selectedText}</span>`);
        table.columns.adjust().draw(false);
      });
    }
  }

  // Handle input/textarea editable fields (unchanged except minor cleanup)
  if ($cell.find('input, textarea').length == 0) {
    var colIndex = $cell.index();

    if ([3, 14, 15, 16, 19].includes(colIndex)) {
      const currentText = $cell.text().trim();

      if ($cell.find("input, textarea").length) return;

      let editor;
      if (colIndex == 19) {
        editor = $('<textarea class="form-control form-control-sm text-center" rows="2"></textarea>');
      } else {
        editor = $('<input type="text" class="form-control form-control-sm text-center">');
      }

      editor.val(currentText);
      $cell.empty().append(editor);
      editor.focus().select();

      editor.on("blur change", function (e) {
        const newVal = editor.val().trim() || 'N/A';

        let displayHtml;
        if ([14, 15, 16].includes(colIndex)) {
          const badgeClass = 'label-bg-cyan'; // Customize per column if needed
          displayHtml = `<span class="badge ${badgeClass} rounded-pill justify-content-center">${newVal}</span>`;
        } else if (colIndex == 19) {
          displayHtml = `<span class="tdSelect justify-content-center" style="max-width: 200px; display: inline-block;">${newVal}</span>`;
        } else {
          displayHtml = newVal;
        }

        $cell.html(displayHtml);
        handleChange(this, rowIdx, colIndex);
      });
    }
  }
});





const page_budget_en = {
  "title": "BUDGETS",
  "Draft" : "Draft",
  "Status" : "Status",
  "Cancel": "Cancel",
  "Save": "Save",
  "Year" : "Year",
  "Month" : "Month",
  "Version" : "Version",
  "GL Account" : "GL Account",
  "GL Name" : "GL Name",
  "Budget Type" : "Budget Type",
  "Project / Initiative" : "Project / Initiative",
  "Outcome" : "Outcome",
  "Objective" : "Objective",
  "Sub Initiative" : "Sub Initiative",
  "Activity" : "Activity",
  "Sub Activity" : "Sub Activity",
  "Currency" : "Currency",
  "No of Days/Qty" : "No of Days/Qty",
  "Unit Amount" : "Unit Amount",
  "Total Budget" : "Total Budget",
  "Department" : "Department",
  "Employee" : "Employee",
  "Notes" : "Notes",
  "SI.No" : "SI.No",
  "Action" : "Action",
}

// const page_budget_ar = {
//   "title": "الميزانيات",
//   "Draft": "مسودة",
//   "Status": "الحالة",
//   "Cancel": "إلغاء",
//   "Save": "حفظ",
//   "Year": "السنة",
//   "Month": "الشهر",
//   "Version": "الإصدار",
//   "GL Account": "حساب دفتر الأستاذ العام",
//   "GL Name": "اسم دفتر الأستاذ العام",
//   "Budget Type": "نوع الميزانية",
//   "Project / Initiative": "المشروع / المبادرة",
//   "Outcome": "النتيجة",
//   "Objective": "الهدف",
//   "Sub Initiative": "المبادرة الفرعية",
//   "Activity": "النشاط",
//   "Sub Activity": "النشاط الفرعي",
//   "Currency": "العملة",
//   "No of Days/Qty": "عدد الأيام / الكمية",
//   "Unit Amount": "قيمة الوحدة",
//   "Total Budget": "إجمالي الميزانية",
//   "Department": "القسم",
//   "Employee": "الموظف",
//   "Notes": "ملاحظات",
//   "SI.No": "تسلسل",
//   "Action": "إجراء"
// };



// //Language Wrokflow 
// function getNestedValue(obj, path) {
//   return path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : null, obj);
// }

// // Load language for all elements with data-translate
// function loadLanguage(lang) {
//   let translation;

//   if (lang == 'ar') {
//     translation = page_budget_ar;
//   } else {
//     translation = page_budget_en;
//   }

//   document.querySelectorAll('[data-translate]').forEach(el => {
//     const path = el.getAttribute('data-translate');
//     const value = getNestedValue(translation, path);
//     if (value !== null) {
//       el.textContent = value;
//     }
//   });

//   console.log(lang, "language loaded");
// }


//Budget VIew


function getDepartment() {
  $.ajax({
    type: "GET",
    url: "/stratroom/departmentReportees",
    async: false,
    success: function (data) {
      $("#department_selectdw").find("option:not(:first)").remove();

      $.each(data, function (index, item) {
        var option =
          '<option value="' + item.id + '">' + item.name + "</option>";
        $("#department_selectdw").append(option);
      });
    },
  });
}

getDepartment();

// ====== Department Change Event ======
$("#department_selectdw").on("change", function () {
  var departmentId = $(this).val();

  // Clear page dropdown except first option
  $("#page_selectdw").find("option:not(:first)").remove();

  if (departmentId == "") return;

  // Call Page API
  $.ajax({
    type: "GET",
    url: "/stratroom/pageDeptList/" + departmentId + "?pageType=budget",
    success: function (data) {
      $.each(data, function (index, item) {
        var option =
          '<option value="' + item.id + '">' + item.pageName + "</option>";
        $("#page_selectdw").append(option);
      });
    },
  });
});

$("#page_selectdw").on("change", function () {
  var pageId = $(this).val();

  if (pageId === "") return;

  var url = "/stratroom/budgetsList/" + pageId + "?status=APPROVED";

  $.ajax({
    type: "GET",
    url: url,
    success: function (data) {
      console.log(data, "budgetsListData");

       if ($.fn.DataTable.isDataTable("#budgetTable")) {
        $("#budgetTableView").DataTable().destroy();

        initializeDataViewTable(data);
      }
    },
    error: function (xhr, status, error) {
      console.error("Error fetching budget data:", error);
    },
  });
});


function initializeDataViewTable(budgetListJson) {
  console.log("Initializing DataTable with budgetListJson:", budgetListJson);
  console.log("Total items in budgetListJson:", budgetListJson.length);

  const withBudgetValues = budgetListJson.filter(item => item?.budgetValues);
  const withoutBudgetValues = budgetListJson.filter(item => !item?.budgetValues);

 

  // Destroy existing table if present
  if ($.fn.DataTable.isDataTable("#budgetTableView")) {
    $("#budgetTableView").DataTable().clear().destroy();
    $("#budgetTableView tbody").empty();
  }

  // --- Helper Lookup Functions (used in render & filtering) ---
  const getGlAccountLabel = (id) => {
    const gl = glData.find(g => String(g.id) == String(id));
    return gl?.data?.glAccount || String(id || 'N/A');
  };
  const getDeptLabel = (id) => {
    const d = deptlist.find(d => String(d.id) == String(id));
    return d?.name || String(id || 'N/A');
  };
  const getEmpLabel = (id) => {
    const e = employeeList.find(e => String(e.id) == String(id));
    return e?.name || String(id || 'N/A');
  };

  // --- Column Definitions with proper filtering support ---
  const columns = [
    // S.No
    { 
      data: null,
      orderable: false,
      render: (data, type, row, meta) => meta.row + 1 
    },

    // Year
    {
      data: null,
      render: (data, type, row) => {
        const val = row.budgetValues?.year || 'N/A';
        if (type == 'display') {
          return `<span class="badge label-bg-dark rounded-pill" style="width:100%; display:inline-block; text-align:center;">${val}</span>`;
        }
        return val; // for filtering & sorting
      }
    },

    // Month
    {
      data: null,
      render: (data, type, row) => {
        const val = row.budgetValues?.month || 'N/A';
        if (type == 'display') {
          return `<span class="badge label-bg-dark rounded-pill" style="width:100%; display:inline-block; text-align:center;">${val}</span>`;
        }
        return val;
      }
    },

    // Version
    {
      data: null,
      render: (data, type, row) => {
        const val = row.budgetValues?.version || 'N/A';
        if (type == 'display') {
          return `<span class="tdSelect justify-content-center">${val}</span>`;
        }
        return val;
      }
    },

    // GL Account (ID → Label)
    {
      data: null,
      render: (data, type, row) => {
        const val = getGlAccountLabel(row.budgetValues?.glAccount);
        if (type == 'display') {
          return `<span class="badge label-bg-dark rounded-pill" style="width:100%; display:inline-block; text-align:center;">${val}</span>`;
        }
        return val;
      }
    },

    // GL Name
    {
      data: null,
      render: (data, type, row) => {
        const val = row.budgetValues?.glname || 'N/A';
        if (type == 'display') {
          return `<span class="badge label-bg-red rounded-pill">${val}</span>`;
        }
        return val;
      }
    },

    // Budget Type
    {
      data: null,
      render: (data, type, row) => {
        const val = row.budgetValues?.budgetType || 'N/A';
        if (type == 'display') {
          return `<span class="badge label-bg-red rounded-pill">${val}</span>`;
        }
        return val;
      }
    },

    // Initiative Description
    {
      data: null,
      render: (data, type, row) => {
        const val = row.budgetValues?.initiativeDesc || 'N/A';
        if (type == 'display') {
          return `<span class="badge label-bg-dark rounded-pill" style="width:100%; display:inline-block; text-align:center;">${val}</span>`;
        }
        return val;
      }
    },

    // Outcome
    {
      data: null,
      render: (data, type, row) => {
        const val = row.budgetValues?.outcome || 'N/A';
        if (type == 'display') {
          return `<span class="tdSelect justify-content-center">${val}</span>`;
        }
        return val;
      }
    },

    // Objective
    {
      data: null,
      render: (data, type, row) => {
        const val = row.budgetValues?.objective || 'N/A';
        if (type == 'display') {
          return `<span class="tdSelect justify-content-center">${val}</span>`;
        }
        return val;
      }
    },

    // Sub Initiative (Editable dropdown)
    {
      data: null,
      render: (data, type, row, meta) => {
        const val = row.budgetValues?.subInDes || '';
        if (type == 'display') {
          const initiativeId = row.initiativeId || '';
          return `<select class="subinitiative-select form-select form-select-sm border-0 bg-transparent p-0 m-0" 
                   style="width:100%"
                   onclick="fetchSubInitiatives(this, '${initiativeId}', ${meta.row}, ${meta.col})"
                   onchange="handleChange(this, ${meta.row}, ${meta.col})"
                   data-search="${val}"
                   data-row-index="${meta.row}">
              <option value="">Select</option>
              ${val ? `<option value="${val}" selected>${val}</option>` : ""}
            </select>`;
        }
        return val;
      }
    },

    // Activity
    {
      data: null,
      render: (data, type, row, meta) => {
        const val = row.budgetValues?.activityDesc?.toString().trim() || '';
        if (type == 'display') {
          const subInitiativeId = row.initiativeId || '';
          return `<select class="activity-select form-select form-select-sm border-0 bg-transparent p-0 m-0" 
                   style="width:100%"
                   onclick="fetchActivities(this, '${subInitiativeId}', ${meta.row}, ${meta.col})"
                   onchange="handleChange(this, ${meta.row}, ${meta.col})"
                   data-search="${val}"
                   data-row-index="${meta.row}">
              <option value=""></option>
              ${val ? `<option value="${val}" selected>${val}</option>` : ""}
            </select>`;
        }
        return val;
      }
    },

    // Sub Activity
    {
      data: null,
      render: (data, type, row, meta) => {
        const val = row.budgetValues?.subActivityDes?.toString().trim() || '';
        if (type == 'display') {
          const activityId = row.activityId || '';
          return `<select class="subactivity-select form-select form-select-sm border-0 bg-transparent p-0 m-0" 
                   style="width:100%"
                   onclick="fetchsubActivities(this, '${activityId}', ${meta.row}, ${meta.col})"
                   onchange="handleChange(this, ${meta.row}, ${meta.col})"
                   data-search="${val}">
              <option value=""></option>
              ${val ? `<option value="${val}" selected>${val}</option>` : ""}
            </select>`;
        }
        return val;
      }
    },

    // Currency
    {
      data: null,
      render: (data, type, row) => {
        const val = row.budgetValues?.currency || 'N/A';
        if (type == 'display') {
          return `<span class="badge label-bg-pink rounded-pill">${val}</span>`;
        }
        return val;
      }
    },

    // No of Days
    {
      data: null,
      render: (data, type, row, meta) => {
        const val = row.budgetValues?.noofDays || '';
        if (type == 'display') {
          return `<input type="number" 
            class="noofDays-input form-control form-control-sm border-0 label-bg-cyan rounded-pill text-center" 
            style="width:100%; background-color: #0dcaf0; color: white;"
            value="${val}" 
            onfocus="this.style.backgroundColor='white';this.style.color='black'" 
            onblur="handleChange(this, ${meta.row}, ${meta.col}, 'noofDays')" />`;
        }
        return val;
      }
    },

    // Unit Amount
    {
      data: null,
      render: (data, type, row, meta) => {
        const val = row.budgetValues?.unitamount || '';
        if (type == 'display') {
          return `<input type="number" 
            class="unitamount-input form-control form-control-sm border-0 label-bg-cyan rounded-pill text-center" 
            style="width:100%; background-color: #0dcaf0; color: white;"
            value="${val}" 
            onfocus="this.style.backgroundColor='white';this.style.color='black'" 
            onblur="handleChange(this, ${meta.row}, ${meta.col}, 'unitamount')" />`;
        }
        return val;
      }
    },

    // Amount
    {
      data: null,
      render: (data, type, row, meta) => {
        const val = row.budgetValues?.amount || '';
        if (type == 'display') {
          return `<input type="number" 
            class="amount-input form-control form-control-sm border-0 label-bg-cyan rounded-pill text-center" 
            style="width:100%; background-color: #0dcaf0; color: white;"
            value="${val}" 
            onfocus="this.style.backgroundColor='white';this.style.color='black'" 
            onblur="handleChange(this, ${meta.row}, ${meta.col}, 'amount')"  readonly/>`;
        }
        return val;
      }
    },

    // Division (Department)
    {
      data: null,
      render: (data, type, row) => {
        const val = getDeptLabel(row.budgetValues?.division);
        if (type == 'display') {
          return `<span class="badge label-bg-dark rounded-pill" style="width:100%; display:inline-block; text-align:center;">${val}</span>`;
        }
        return val;
      }
    },

    // Person (Employee)
    {
      data: null,
      render: (data, type, row) => {
        const val = getEmpLabel(row.budgetValues?.person);
        if (type == 'display') {
          return `<span class="badge label-bg-pink rounded-pill" style="width:100%; display:inline-block; text-align:center;">${val}</span>`;
        }
        return val;
      }
    },

    // Notes
    {
      data: null,
      render: (data, type, row) => {
        const val = row.budgetValues?.notes || '';
        if (type == 'display') {
          return `<span class="tdSelect justify-content-center" style="max-width: 200px; display: inline-block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${val}</span>`;
        }
        return val;
      }
    },

  ];

  // Initialize DataTable
  table = $("#budgetTableView").DataTable({
    pageLength: 20,
    lengthChange: false,
    ordering: false,
    info: false,
    responsive: true,
    scrollX: true,
    scrollY: "400px",
    processing: true,
    deferRender: true,
    data: budgetListJson,
    columns: columns,
    initComplete: function () {
      const api = this.api();
      api.columns().every(function (idx) {
        
        if (idx == 0 || idx == api.columns().count() - 1) return;

        const column = this;
        const headerText = $(column.header()).text().trim() || "Filter";

        // Build select dropdown
        const select = $(`<select class="select2" style="width: min(200px,100%);"></select>`)
          .appendTo($(column.header()).empty())
          .on('change', function () {
            const val = $(this).val();
            const searchVal = Array.isArray(val)
              ? val.map(v => "^" + $.fn.dataTable.util.escapeRegex(v) + "$").join("|")
              : val;
            column.search(searchVal || "", true, false).draw();
          });

        // Get unique filter values (from rendered 'filter' data)
        const uniqueValues = [];
        const seen = new Set();

        api.column(idx).data().each(function (rowData) {
          // Use the render function to get filter value
          const filterVal = columns[idx].render
            ? columns[idx].render(rowData, 'filter', rowData)
            : rowData;

          if (filterVal && filterVal !== 'N/A' && !seen.has(filterVal)) {
            seen.add(filterVal);
            uniqueValues.push(filterVal);
          }
        });

        // Special predefined filters
        if (idx == 1) { // Year
          for (let y = 2020; y <= 2030; y++) {
            select.append(`<option value="${y}">${y}</option>`);
          }
        } else if (idx == 2) { // Month
          ["January","February","March","April","May","June","July","August","September","October","November","December"]
            .forEach(m => select.append(`<option value="${m}">${m}</option>`));
        } else if (idx == 17) { // Department
          deptlist.forEach(d => {
            if (d.name) select.append(`<option value="${d.name}">${d.name}</option>`);
          });
        } else if (idx == 18) { // Employee
          employeeList.forEach(e => {
            if (e.name) select.append(`<option value="${e.name}">${e.name}</option>`);
          });
        } else {
          // General case: use unique rendered filter values
          uniqueValues.sort().forEach(val => {
            select.append(`<option value="${val}">${val}</option>`);
          });
        }

        // Initialize Select2
        select.select2({
          multiple: true,
          closeOnSelect: false,
          placeholder: "Select " + headerText,
          allowClear: true,
          tags: true,
          selectionCssClass: "form-select form-select-sm rounded-pill custom-multiple p-0 pe-3 px-1 bg-transparent text-dark",
          dropdownCssClass: "select2-multiple-dropdown"
        }).val(null).trigger("change");
      });
    },
    drawCallback: function () {
      $(".dataTables_filter").addClass("d-none");
    }
  });
}


