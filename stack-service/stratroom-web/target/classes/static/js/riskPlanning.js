var userId = "";
var userDeptId = "";
var employeeArray = [];
var actionsDataArray = [];
var recommendationDataArray = [];
var allListUsersData = [];
var riskMatrix = {};
var riskScoresData = [];
console.log($("#userPrincipal").val(), "GaneshuserIdoutside");
function getDepartmentListDate() {
  $.ajax({
    url: "/stratroom/allDepartmentList",
    async: false,
    success: function (departmentList) {
      var select = document.getElementById("Risk_Department");

      select.innerHTML =
        '<option value="" disabled selected>Select Department</option>';

      for (var i = 0; i < departmentList.length; i++) {
        var department = departmentList[i];
        var option =
          '<option value="' +
          department.id +
          '">' +
          department.name +
          "</option>";
        select.innerHTML += option;
      }
    },
  });
}

function moduleAccessUserListData () {
   
      $.ajax({
        url: "/stratroom/user/moduleAccessUserList?moduleName=Meetings",
        contentType: "application/json",
        success: function (data) {
            console.log(data, "data");
            allListUsersData = data;
        },
        error: function () {
           allListUsersData = [];
        }
    });
}
function getEmployeeListDate() {
  let employeeMap = {};
  $.ajax({
    url: "/stratroom/organization/employeeList",
    async: false,
    success: function (employeeList) {
      console.log(employeeList, "employeeListDate");
      employeeArray = employeeList;
      if (Array.isArray(employeeList)) {
        employeeList.forEach((user) => {
          if (user.id) {
            employeeMap[user.id] = user;
          }
        });
      }

      fetchRiskPlanningList(employeeMap);
      var select = document.getElementById("Risk_owner");

      select.innerHTML = '<option value="" disabled selected>Select</option>';

      for (var i = 0; i < employeeList.length; i++) {
        var employee = employeeList[i];
        var option =
          '<option value="' + employee.id + '">' + employee.name + "</option>";
        select.innerHTML += option;
      }
    },
  });
}

function getRiskPageList() {
  userId = $("#userPrincipal").val();
  console.log(userId, "GaneshuserId");

  if (!userId) {
    console.error("User ID is empty — cannot load risk page list.");
    return;
  }

  $.ajax({
    url: "/stratroom/userRole/" + userId,
    type: "GET",
    success: function (data) {
      console.log(data, "dataaaaaaauser");

      if (!data.departmentList || data.departmentList.length == 0) {
        console.error("No departments found for this user.");
        return;
      }

      userDeptId = data.departmentList[0].id || "";

      if (!userDeptId) {
        console.error("User department ID is empty.");
        return;
      }

      $.ajax({
        url: "/stratroom/pageDeptList/" + userDeptId + "?pageType=risk",
        type: "GET",
        async: false,
        success: function (riskPageList) {
          console.log(riskPageList, "initiativeList");

          var select = document.getElementById("Project_Risk");
          if (!select) {
            console.error("Select element Risk not found.");
            return;
          }

          select.innerHTML =
            '<option value="" disabled selected>Select Risk</option>';

          riskPageList.forEach(function (item) {
            var option =
              '<option value="' + item.id + '">' + item.pageName + "</option>";
            select.innerHTML += option;
          });
        },
      });
    },
    error: function (xhr) {
      console.error("Error fetching userRole API:", xhr);
    },
  });
}

function handleRiskSave() {
  let urlparams = new URL(document.location).searchParams;
  let pageNo = urlparams.get("pageId");
  var riskName = $("#Risk_title").val();
  var category = $("#rf_category").val();
  var riskDesc = $("#Risk_description").val();
  var riskDept = $("#Risk_Department").val();
  var riskLikelihood = $("#Risk_Likelihood").val();
  var riskImpact = $("#Risk_Impact").val();
  var priority = $("input[name='priority']:checked").val();
  var mitigationStrategy = $("#Risk_Mitigation_Strategy").val();
  var contingencyPlan = $("#Risk_Contingency_Plan").val();
  var riskOwner = $("#Risk_owner").val();
  var riskDate = $("#Risk_DateIdentified").val();
  var selectedRiskValue = $("#Project_Risk").val();
  // var projectEndDate = $("#Project_end_date").val();
  var pagenumber = $("#pagenumber").val();

  var formatted = "";

  console.log(riskDate, "riskDatevalue");

  function convertToYMD(dateStr) {
    var parts = dateStr.split(" ");

    var monthName = parts[0];
    var day = parts[1].replace(",", "");
    var year = parts[2];

    var monthMap = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    var month = monthMap[monthName];

    return year + "-" + month + "-" + day.padStart(2, "0");
  }

  var formatted = convertToYMD(riskDate);

  console.log(formatted);

  const payload = {
    id: $("#Risk_show_id").val() || "",
    owner: riskOwner,
    pageId: pageNo || "",
    departmentId: riskDept,
    departmentId: riskDept,
    riskId: "",
    identifiedDate: formatted,
    riskPageId: parseFloat($("#Project_Risk").val()) || "",
    riskPlanningValue: {
      riskName: riskName,
      riskScore : $("#Risk_score").val() || "",
      riskDesc: riskDesc,
      riskOwner: riskOwner,
      riskPageId: parseFloat($("#Project_Risk").val()) || "",
      multipleOwners: riskOwner,
      //   projectOwner: projectOwner,

      riskDate: $("#Risk_DateIdentified").val() || "",
      departmentId: riskDept,
      initiativePageId: $("#Project_Risk").val(),
      category: $("#rf_category").val(),
      status: $("#riskStatus").val(),
      priority: $("input[name='status']:checked").val() || "",
      likelihood: riskLikelihood,
      impact: riskImpact,
      mitigationStrategy: mitigationStrategy,
      contingencyPlan: contingencyPlan,
      recommendation: [],
      actions: [],
      attachment: [],
    },
  };

  console.log(payload, category, "payload");

  $.ajax({
    url: "/stratroom/riskPlanning",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(payload),
    success: function (data, status) {
      $.notify("Risk Planning saved successfully", {
        style: "success",
        className: "graynotify",
      });
      // $("#Project_name").val("");
      // $("#Project_Description").val("");
      // $("#Project_Department").val("");
      // $("#Project_owner").val("");
      // $("#Project_team").val("");
      // $("#Project_start_date").val("");
      // $("#Project_end_date").val("");

      window.location.reload();
    },
    error: function (xhr, status, error) {
      $.notify("Error saving Project Planning", {
        style: "success",
        className: "graynotify",
      });
    },
  });
}

// Helper: Format date from "M/D/YYYY" to "MMM D, YYYY"
function formatDate(dateStr) {
  if (!dateStr) return "N/A";
  var parts = dateStr.split("/");
  var month = parts[0];
  var day = parts[1];
  var year = parts[2];
  var date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Helper: Escape HTML to prevent XSS
function escapeHtml(text) {
  var div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Helper: Capitalize first letter
function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Helper: Map category to color class
function getCategoryClass(category) {
  var map = {
    "Strategy & Leadership": "status-bg-blue",
    Operations: "status-bg-blue",
    Finance: "status-bg-yellow",
    "Information Technology (IT)": "status-bg-green",
    Marketing: "status-bg-pink",
    Sales: "status-bg-blue",
    Customer: "status-bg-blue",
    "Human Resources (HR)": "status-bg-blue",
    "Risk Management": "status-bg-blue",
    Compliance: "status-bg-blue",
    Legal: "status-bg-blue",
    "Procurement & Supply Chain": "status-bg-blue",
    "Product Development & Innovation": "status-bg-blue",
    "Sustainability & ESG": "status-bg-blue",
  };
  return map[category] || "status-bg-secondary";
}

function getUserImageById(userId) {
  console.log(userId, allListUsersData, "userId");
  var user = allListUsersData.find((u) => u.id == userId);
  console.log(user, "user");
  if (user && user.image) return user.image;
  if (user) return createSvgDataUrl(user.name);
}

function getUserNameById(userId) {
  var user = allListUsersData.find((u) => u.id == userId);
  return user ? user.name : "Unknown";
}

function getInitials(name) {
  var n = (name || "U").trim();
  if (n.indexOf(" ") !== -1) {
    var parts = n.split(" ");
    var initials = "";
    for (var i = 0; i < parts.length && i < 2; i++) {
      if (parts[i].charAt(0)) {
        initials += parts[i].charAt(0).toUpperCase();
      }
    }
    return initials.substring(0, 2);
  } else {
    return n.substring(0, 2).toUpperCase();
  }
}

function getColor(name) {
  var colors = [
    "rgb(236, 135, 191)", // pink
    "rgb(135, 166, 236)", // blue
    "rgb(135, 236, 213)", // green
    "rgb(236, 204, 135)", // yellow
    "rgb(236, 135, 135)", // red
    "rgb(166, 135, 236)", // purple
    "rgb(236, 135, 170)",
    "rgb(135, 236, 135)",
  ];
  var hash = 0;
  for (var i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  var index = Math.abs(hash) % colors.length;
  return colors[index];
}

function createSvgDataUrl(name) {
  var initials = getInitials(name);
  var bgColor = getColor(name);
  var width = 55;
  var height = 55;

  var svg =
    '<svg xmlns="http://www.w3.org/2000/svg" pointer-events="none" width="' +
    width +
    '" height="' +
    height +
    '" style="background-color:' +
    bgColor +
    ";width:" +
    width +
    "px;height:" +
    height +
    'px;border-radius:50%;">';
  svg +=
    '<text text-anchor="middle" y="50%" x="50%" dy="0.35em" pointer-events="auto" fill="#ffffff" font-family="HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif" style="font-weight:400;font-size:20px;">';
  svg += initials;
  svg += "</text></svg>";

  return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
}

function fetchRiskPlanningList(employeeMap) {
  let urlparams = new URL(document.location).searchParams;
  let pageNo = urlparams.get("pageId");

  $.ajax({
    url: "/stratroom/riskPlanningList?pageId=" + pageNo,
    type: "GET",
    success: function (projectPlanningList) {
      console.log(projectPlanningList, "projectPlanningList");
      var html = "";

      for (var i = 0; i < projectPlanningList.length; i++) {
        var item = projectPlanningList[i];
        var riskValue = item.riskPlanningValue;
        let ownerId = riskValue.riskOwner;
        let ownerUser = employeeMap[ownerId];
        let sponsorHtml = "";

        if (ownerUser) {
          let username = escapeHtml(ownerUser.name || "Unknown");
          let imgSrc = "";
          let dataNameAttr = "";

          if (ownerUser.image && ownerUser.image !== "") {
            imgSrc = ownerUser.image;
          } else {
            imgSrc = createSvgDataUrl(username);
            dataNameAttr = 'data-name="' + username + '" ';
          }

          sponsorHtml =
            '<li class="avatar avatar-xs pull-up" title="' +
            username +
            '">' +
            '<img class="rounded-circle swotuserimage" ' +
            dataNameAttr +
            'src="' +
            imgSrc +
            '" alt="' +
            username +
            '" width="24" height="24">' +
            "</li>";
        } else {
          sponsorHtml =
            '<li><span class="badge bg-secondary">Unknown</span></li>';
        }
        // Format Identified Date
        var identifiedDate = "Not set";
        if (item.identifiedDate) {
          var date = new Date(item.identifiedDate);
          identifiedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        } else if (riskValue.riskDate) {
          var date = new Date(riskValue.riskDate);
          identifiedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        }

        var priorityClass = "status-bg-red";
        if (riskValue.priority == "High") {
          priorityClass = "status-bg-orange";
        } else if (riskValue.priority == "Medium") {
          priorityClass = "status-bg-yellow";
        } else if (riskValue.priority == "Low") {
          priorityClass = "status-bg-green";
        }

        var statusText = riskValue.status;
        var statusClass = "label-bg-blue";

          if(riskValue.status == "identified"){
            statusClass = "label-bg-orange";
          }else if(riskValue.status == "in_progress"){
            statusClass = "label-bg-yellow";
          }else if(riskValue.status == "mitigated"){
            statusClass = "label-bg-blue";
          }else if(riskValue.status == "closed"){
            statusClass = "label-bg-green";
          }

        var categoryCalss = "status-bg-blue";

        if(riskValue.category == "Strategic Risk"){
          categoryCalss = "status-bg-blue";
        }else if(riskValue.category == "Operational Risk"){
          categoryCalss = "status-bg-orange"
        }else if(riskValue.category == "Financial Risk"){
          categoryCalss = "status-bg-orange"
        } else if(riskValue.category == "Compliance & Legal Risk"){
          categoryCalss = "status-bg-cyan"
        }else if(riskValue.category == "Human Capital Risk"){
          categoryCalss = "status-bg-blue";
        }else if(riskValue.category == "Environmental, Social & Governance (ESG) Risk"){
          categoryCalss = "status-bg-blue";
        }else if(riskValue.category == "Political Risk"){
          categoryCalss = "status-bg-blue";
        }else if(riskValue.category == "Technology Risk"){
          categoryCalss = "status-bg-green";
        }else {
          categoryCalss = "status-bg-blue";
        }

        // Risk impact class
        var impactClass = "label-bg-yellow";
        if (riskValue.impact == "Not_Signific") {
          impactClass = "label-bg-red";
        }else if (riskValue.impact ==  "Minor") {
          impactClass = "label-bg-yellow";
        }else if(riskValue.impact ==  "Negligible") {
          impactClass = "label-bg-orange";
        }else if(riskValue.impact ==  "Moderate") {
          impactClass = "label-bg-yellow";
        }else if(riskValue.impact ==  "Major") {
          impactClass = "label-bg-red";
        }

 var likelihoodClass = "";

if (riskValue.likelihood === "Almost_Never") {
    likelihoodClass = "label-bg-green";
} 
else if (riskValue.likelihood === "Happen_Very_Rarely") {
    likelihoodClass = "label-bg-light-yellow";
} 
else if (riskValue.likelihood === "Seldom") {
    likelihoodClass = "label-bg-yellow";
} 
else if (riskValue.likelihood === "Often") {
    likelihoodClass = "label-bg-orange";
} 
else if (riskValue.likelihood === "Very_Often") {
    likelihoodClass = "label-bg-red";
}


        var priorityText =
          riskValue.priority.charAt(0).toUpperCase() +
          riskValue.priority.slice(1);

        html +=
          '<div class="card meeting-card">' +
          '<div class="card-header flex-wrap flex-sm-nowrap">' +
          '<div class="c-header-left">' +
          '<span class="meeting-label badge ' + categoryCalss+ '  projectCategory">' +
          (riskValue.category || "N/A") +
          "</span>" +
          "</div>" +
          '<div class="meeting-action">' +
          '<ul class="list-unstyled action-list mb-0">' +
          "<li>" +
          '<a class="" href="#notes-modal"  data-bs-target="#recommendation" data-bs-toggle="modal" contenteditable="false" style="cursor: pointer;"  onclick="handlerecommendationevent(' +
          item.id +
          ",'recommendation')\" >" +
          '<span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Notes">' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="notebook-pen" style="width: 12px; height: 12px;" class="lucide lucide-notebook-pen"><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"></path><path d="M2 6h4"></path><path d="M2 10h4"></path><path d="M2 14h4"></path><path d="M2 18h4"></path><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"></path></svg>' +
          "</span>" +
          "</a>" +
          "</li>" +
          "<li>" +
          '<a href="#action-modal" data-bs-target="#action" data-bs-toggle="modal" contenteditable="false" style="cursor: pointer;" onclick="handleactionevent(' + item.id + ',\'action\')">' +
          '<span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Action">' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="settings" style="width: 12px; height: 12px;" class="lucide lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg>' +
          "</span>" +
          "</a>" +
          "</li>" +
          "<li>" +
          '<a href="#" data-bs-target="#uploaded_files" data-bs-toggle="modal" contenteditable="false" style="cursor: pointer;" onclick="handleAttchmentevent(' + item.initiativeId + ',\'action\')">' +
          '<span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Attachment">' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="paperclip" style="width: 12px; height: 12px;" class="lucide lucide-paperclip"><path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"></path></svg>' +
          "</span>" +
          "</a>" +
          "</li>" +
          '<li class="dropdown">' +
          '<a class="btn btn-link p-0 show" type="button" data-bs-toggle="dropdown" aria-expanded="true" contenteditable="false" style="cursor: pointer;">' +
          '<span class="icon">' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis-vertical" style="width: 12px; height: 12px;" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>' +
          "</span>" +
          "</a>" +
          '<ul class="dropdown-menu dropdown-menu-end border-0 shadow">' +
          "<li>" +
          '<a class="dropdown-item editRisk" href="#project-planning-add-modal" data-bs-toggle="modal" contenteditable="false" style="cursor: pointer;" data-risk-id="' +
          item.id +
          '">Edit</a>' +
          "</li>" +
          "<li>" +
          '<a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal" data-project-id="' +
          item.id +
          '" contenteditable="false" style="cursor: pointer;">Delete</a>' +
          "</li>" +
          "</ul>" +
          "</li>" +
          "</ul>" +
          "</div>" +
          "</div>" +
          '<div class="card-body meeting-details d-flex flex-column">' +
          '<div class="form-group">' +
          '<label class="form-label">Title</label>' +
          '<div class="d-flex justify-content-between gap-2">' +
          '<p class="form-control-plaintext line-clamp-2">' +
          (riskValue.riskName || "N/A") +
          "</p>" +
          "</div>" +
          "</div>" +
          '<div class="form-group">' +
          '<label class="form-label">Description</label>' +
          '<div class="d-flex justify-content-between gap-2">' +
          '<p class="form-control-plaintext line-clamp-2">' +
          (riskValue.riskDesc || "N/A") +
          "</p>" +
          "</div>" +
          "</div>" +
          '<div class="d-flex justify-content-between">' +
          '<div class="form-group">' +
          '<label class="form-label">Status</label>' +
          '<div class="d-flex flex-wrap gap-1">' +
          '<span class="badge ' +
          statusClass +
          ' rounded-pill">' +
          statusText +
          "</span>" +
          "</div>" +
          "</div>" +
          '<div class="form-group text-center">' +
          '<label class="form-label">Priority</label>' +
          '<div class="d-flex justify-content-end flex-wrap gap-1">' +
          '<span class="badge ' +
          priorityClass +
          ' rounded-pill">' +
          priorityText +
          "</span>" +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div class="d-flex justify-content-between">' +
          '<div class="form-group text-start">' +
          '<label class="form-label">Risk impact</label>' +
          '<div class="d-flex flex-wrap justify-content-center gap-1">' +
          '<span class="badge ' +
          impactClass +
          ' rounded-pill">' +
          (riskValue.impact || "Unknown") +
          "</span>" +
          "</div>" +
          "</div>" +
          '<div class="form-group text-center">' +
          '<label class="form-label">Risk Score</label>' + 
          '<div class="d-flex flex-wrap justify-content-center gap-1">' +
          '<span>' +
          (riskValue.riskScore || "N/A") +
          "</span>" +
          "</div>" +
          "</div>" +
          '<div class="form-group text-end">' +
          '<label class="form-label">Risk Likelihood</label>' +
          '<div class="d-flex flex-wrap justify-content-end gap-1">' +
          '<span class="badge ' +
          likelihoodClass +
          ' rounded-pill">' +
          (riskValue.likelihood || "Unknown") +
          "</span>" +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div class="d-flex justify-content-between">' +
          '<div class="form-group">' +
          '<label class="form-label">Date Identified</label>' +
          '<p class="form-control-plaintext">' +
          identifiedDate +
          "</p>" +
          "</div>" +
          '<div class="form-group text-end">' +
          sponsorHtml +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>";
      }

      $(".meetingList").html(html);
    },
    error: function (err) {
      console.error("Error fetching risk planning list:", err);
      $(".meetingList").html(
        '<p class="text-muted">Failed to load risk items.</p>'
      );
    },
  });
}

function setSelectValue(selector, value, text) {
  let $select = $(selector);
  if ($select.find("option[value='" + value + "']").length == 0) {
    $select.append(new Option(text, value, true, true));
  }
  $select.val(value).trigger("change");
}

//Edit Project Planning
$(document).on("click", ".editRisk", function () {
  resetAuditModal();
  var projectId = $(this).data("risk-id");
  console.log(projectId, "projectId");
  $(".headerText").text("Edit Risk Planning");
  $(".buttonText").text("Update");

  $.ajax({
    url: "/stratroom/riskPlanning/" + projectId,
    type: "GET",
    contentType: "application/json",
    success: function (data, status) {
      console.log(data, "getdata");

      // // Ensure select options exist before setting value
      setSelectValue("#Risk_owner", data.riskPlanningValue.riskOwner);

      setSelectValue(
        "#Risk_Department",
        data.riskPlanningValue.departmentId,
        "Dept " + data.riskPlanningValue.departmentId
      );

      // // Simple inputs
      $("#Risk_show_id").val(data.id);
      $("#Risk_score").val(data.riskPlanningValue.riskScore);
      $("#Risk_title").val(data.riskPlanningValue.riskName);
      $("#Risk_description").val(data.riskPlanningValue.riskDesc);
      // $("#Risk_Department").val(data.riskPlanningValue.departmentId);
      $("#Project_Risk").val(data.riskPlanningValue.riskPageId);
      // $("input[name='status'][value='" + data.riskPlanningValue.priority + "']").prop('checked', true);
      $("#rf_category").val(data.riskPlanningValue.category).trigger("change");

      $("#Risk_DateIdentified").val(data.riskPlanningValue.riskDate);

      $("#Risk_Likelihood").val(data.riskPlanningValue.likelihood).trigger("change");
      $("#Risk_Impact").val(data.riskPlanningValue.impact).trigger("change");
      $("#Risk_Likelihood").val(data.riskPlanningValue.likelihood).trigger("change");
      $("#Risk_Mitigation_Strategy").val(
        data.riskPlanningValue.mitigationStrategy
      );
      $("#Risk_Contingency_Plan").val(data.riskPlanningValue.contingencyPlan);
      $("#Risk_owner").val(data.riskPlanningValue.riskOwner);
      $("#riskStatus").val(data.riskPlanningValue.status).trigger("change");
      $(
        "input[name='status'][value='" + data.riskPlanningValue.priority + "']"
      ).prop("checked", true);
    },
  });
});

// Delete Project Planning
$(document).on("click", '.dropdown-item[href="#delete-modal"]', function () {
  var projectId = $(this).data("project-id");
  console.log(projectId, "projectId");

  $.ajax({
    url: "/stratroom/riskPlanning/" + projectId,
    type: "DELETE",
    contentType: "application/json",
    success: function (data, status) {
      location.reload(true);
    },
  });
});

// Delete Project Planning

//Recommendation
let recommendationRowCounter = 0;
function handlerecommendationevent(id, type, action) {
  $("#tableBody").empty();
  $("#recommendationtype").val("create");
  $("#recommendationcount").val(0);
  $('[data-toggle="tooltip"]').tooltip("hide");
  $('[rel="tooltip"]').tooltip("hide");
  $.ajax({
    url: "/stratroom/riskPlanning/" + id,
    success: function (data) {
      // Ensure select options exist before setting value
      // // Ensure select options exist before setting value
      setSelectValue("#Risk_owner", data.riskPlanningValue.riskOwner);

      setSelectValue(
        "#Risk_Department",
        data.riskPlanningValue.departmentId,
        "Dept " + data.riskPlanningValue.departmentId
      );

      // // Simple inputs
      $("#Risk_show_id").val(data.id);
      $("#Risk_title").val(data.riskPlanningValue.riskName);
      $("#Risk_description").val(data.riskPlanningValue.riskDesc);
      // $("#Risk_Department").val(data.riskPlanningValue.departmentId);
      $("#Project_Risk").val(data.riskPlanningValue.riskPageId);
      // $("input[name='status'][value='" + data.riskPlanningValue.priority + "']").prop('checked', true);
      $("#rf_category").val(data.riskPlanningValue.category).trigger("change");

      $("#Risk_DateIdentified").val(data.riskPlanningValue.riskDate);

      $("#Risk_Likelihood").val(data.riskPlanningValue.likelihood).trigger("change");
      $("#Risk_Impact").val(data.riskPlanningValue.impact).trigger("change");
      $("#Risk_Likelihood").val(data.riskPlanningValue.likelihood);
      $("#Risk_Mitigation_Strategy").val(
        data.riskPlanningValue.mitigationStrategy
      );
      $("#Risk_Contingency_Plan").val(data.riskPlanningValue.contingencyPlan);
      $("#Risk_owner").val(data.riskPlanningValue.riskOwner);
      $("#riskStatus").val(data.riskPlanningValue.status).trigger("change");
      $(
        "input[name='status'][value='" + data.riskPlanningValue.priority + "']"
      ).prop("checked", true);
      actionsDataArray = data.riskPlanningValue.actions || [];

      recommendationPopSuccessCallback(data, id, type);
    },
    error: readErrorMsg,
  });
}

function addRecommendationRow(withAddBtn, isEmptyRecommendation, noteText, multipleOwners) {
  console.log(multipleOwners, "multipleOwners");
  noteText = noteText || "";
  multipleOwners = multipleOwners || "";

  recommendationRowCounter++;
  const rowIndex = recommendationRowCounter;

  var rowHtml = '';
  rowHtml += '<tr data-row-index="' + rowIndex + '" data-owners="' + multipleOwners + '">';
  rowHtml += '  <td>';
  rowHtml += '    <div class="form-group">';
  rowHtml += '      <textarea class="form-control" placeholder="Notes" rows="3">' + escapeHtml(noteText) + '</textarea>';
  rowHtml += '    </div>';
  rowHtml += '  </td>';
  rowHtml += '  <td class="align-middle">';
  rowHtml += '    <div class="d-flex align-items-start justify-content-center">';
  rowHtml += '      <ul class="list-unstyled d-inline-flex align-items-center avatar-group mb-0 responsible-cell">';

  // If multipleOwners has IDs, show images
  if (multipleOwners) {
    var ownerIds = multipleOwners.split(",");
    ownerIds.forEach(function(id) {
       
        var imgSrc = getUserImageById(id); 
        var userName = getUserNameById(id); 
        rowHtml += '<li class="avatar avatar-xs pull-up">';
        rowHtml += '<img src="' + imgSrc + '" alt="' + userName + '" title="' + userName + '" class="rounded-circle" />';
        rowHtml += '</li>';
    });
  }

  // Always keep the + badge
  rowHtml += '        <li class="avatar avatar-xs pull-up" data-bs-target="#addpeople" data-bs-toggle="modal" onclick="recommendationaddpeople(' + rowIndex + ')">';
  rowHtml += '          <span class="avatar-initial rounded-circle" title="Add Responsible">+</span>';
  rowHtml += '        </li>';

  rowHtml += '      </ul>';
  rowHtml += '    </div>';
  rowHtml += '  </td>';
  rowHtml += '  <td class="text-end align-middle">';
  rowHtml += '    <div class="table-actions justify-content-center">';

  if (withAddBtn) {
    rowHtml += '      <a class="btn btn-sm btn-icon" onclick="addRecommendationRow(true, true); updateLastRow();">';
    rowHtml += '        <span class="icon" data-bs-toggle="tooltip" title="Add">';
    rowHtml += '          <i class="fas fa-plus title_edit_icon"></i>';
    rowHtml += '        </span>';
    rowHtml += '      </a>';
  }

  rowHtml += '      <a class="btn btn-sm btn-icon" onclick="deleteRecommendationRow(this); updateLastRow();">';
  rowHtml += '        <span class="icon" data-bs-toggle="tooltip" title="Delete">';
  rowHtml += '          <img src="/stratroom/images/delete-i.svg" width="12" height="12">';
  rowHtml += '        </span>';
  rowHtml += '      </a>';

  rowHtml += '    </div>';
  rowHtml += '  </td>';
  rowHtml += '</tr>';

  $("#tableBody").append(rowHtml);
}

function updateLastRow() {
      $("#tableBody tr").each(function (index, row) {
        var addBtn = $(row).find(".fa-plus").closest("a");
        if (index == $("#tableBody tr").length - 1) {
          if (addBtn.length == 0) {
            $(row).find(".table-actions").prepend(
              '<a class="btn btn-sm btn-icon" onclick="addRecommendationRow(true, true); updateLastRow();">' +
              '<span class="icon" data-bs-toggle="tooltip" title="Add">' +
              '<i class="fas fa-plus title_edit_icon"></i>' +
              '</span></a>'
            );
          }
        } else {
          addBtn.remove(); 
        }
      });
    }


function recommendationPopSuccessCallback(planList, typerequest) {
  console.log(planList, "planList");
  $("#tableBody").empty();

  var recommendations = planList.riskPlanningValue.recommendation || [];
  console.log(recommendations, "recommendationsData");
  if (recommendations.length > 0) {
    for (var i = 0; i < recommendations.length; i++) {
      var noteText = recommendations[i].name || "";
      var owners = recommendations[i].multipleOwners || "";
      owners = owners.toString();     
      console.log(owners, "owners");
      addRecommendationRow(true, false, noteText, owners);
    }
  } else {
    addRecommendationRow(true, true, "", "");
  }

  updateLastRow();
}



      //Recommendation Save
  function recommendationsubmit() {
  let urlparams = new URL(document.location).searchParams;
  let pageNo = urlparams.get("pageId");
  var riskName = $("#Risk_title").val();
  var category = $("#rf_category").val();
  var riskDesc = $("#Risk_description").val();
  var riskDept = $("#Risk_Department").val();
  var riskLikelihood = $("#Risk_Likelihood").val();
  var riskImpact = $("#Risk_Impact").val();
  var priority = $("input[name='priority']:checked").val();
  var mitigationStrategy = $("#Risk_Mitigation_Strategy").val();
  var contingencyPlan = $("#Risk_Contingency_Plan").val();
  var riskOwner = $("#Risk_owner").val();
  var riskDate = $("#Risk_DateIdentified").val();
  var selectedRiskValue = $("#Project_Risk").val();
  // var projectEndDate = $("#Project_end_date").val();
  var pagenumber = $("#pagenumber").val();

  var formatted = "";

  
  


let recommendationList = [];
$("#tableBody tr").each(function () {
    let note = $(this).find("textarea").val().trim();
    let owners = $(this).data("owners") || ""; 
    let rowIndex = $(this).attr("data-row-index"); 

    if (note !== "") {
      recommendationList.push({
        id: rowIndex || 0,          
        name: note,                 
        multipleOwners: owners     
      });
    }
});





  // const payload = {
  //   id: $("#Project_Id").val() || "",
  //   owner: projectOwner,
  //   pageId: pageNo || "",
  //   departmentId: projectDept,
  //   riskPlanningValue: {
  //     projectName: projectName,
  //     projectDescription: projectDesc,
  //     projectTeam: projectTeam,
  //     multipleOwners: multipleOwnerData,
  //     projectOwner: projectOwner,
  //     fromdate: formattedStartDate,
  //     enddate: formattedEndDate,
  //     departmentId: projectDept,
  //     category: $("#rf_categoryValue").val() || "",
  //     budget: $("#budget").val(),
  //     status: $("#status").val(),
  //     priority: $("input[name='status']:checked").val() || "",
  //     projectStartEndDate: $("#Project_start_end_date").val() || "",
  //     recommendation: recommendationList,   
  //     actions: actionsDataArray || [],
  //     attachment: [],
  //   }
  // };


  const payload = {
    id: $("#Risk_show_id").val() || "",
    owner: riskOwner,
    pageId: pageNo || "",
    departmentId: riskDept,
    departmentId: riskDept,
    riskId: "",
    identifiedDate: $("#Risk_DateIdentified").val() || "",
    riskPageId: parseFloat($("#Project_Risk").val()) || "",
    riskPlanningValue: {
      riskName: riskName,
      riskDesc: riskDesc,
      riskOwner: riskOwner,
      riskPageId: parseFloat($("#Project_Risk").val()) || "",
      multipleOwners: riskOwner,
      //   projectOwner: projectOwner,

      riskDate: $("#Risk_DateIdentified").val() || "",
      departmentId: riskDept,
      initiativePageId: $("#Project_Risk").val(),
      category: $("#rf_category").val(),
      status: $("#riskStatus").val(),
      priority: $("input[name='status']:checked").val() || "",
      likelihood: riskLikelihood,
      impact: riskImpact,
      mitigationStrategy: mitigationStrategy,
      contingencyPlan: contingencyPlan,
      recommendation: recommendationList,   
      actions: actionsDataArray || [],
      attachment: [],
    },
  };

  console.log(payload, "payload");

  $.ajax({
    url: "/stratroom/riskPlanning",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(payload),
    success: function (data, status) {
      $.notify("Project Planning saved successfully", { style: 'success', className: 'graynotify' });
      $("#Project_name").val('');
      $("#Project_Description").val('');
      $("#Project_Department").val('');
      $("#Project_owner").val('');
      $("#Project_team").val('');
      $("#Project_start_date").val('');
      $("#Project_end_date").val('');

      window.location.reload();
    },
    error: function (xhr, status, error) {
      $.notify("Error saving Project Planning", { style: 'success', className: 'graynotify' });
    }
  });
}


let currentRowIndex  = null;
function recommendationaddpeople(noteId) {
    var container = $(".listusers");
    container.empty(); 
    currentRowIndex  = noteId;


    // Get existing owners from the row
    let $row = $("#tableBody").find("tr[data-row-index='" + noteId + "']");
    let existingOwners = $row.data("owners") ? $row.data("owners").toString().split(",") : [];

    $.ajax({
        url: "/stratroom/user/moduleAccessUserList?moduleName=Meetings",
        contentType: "application/json",
        success: function (data) {
            console.log(data, "data");

            

            if (!data || data.length == 0) {
                container.append('<div class="text-muted">No users found.</div>');
                return;
            }

            for (var i = 0; i < data.length; i++) {
                var user = data[i];
                var userId = user.id;
                var username = user.name || "Unknown";
                
                let imgSrc = "";
                let dataNameAttr = "";

                if (user.image && user.image !== "") {
                  imgSrc = user.image;
                } else {
                  imgSrc = createSvgDataUrl(username);
                  dataNameAttr = 'data-name="' + username + '" ';
                }

                // 🔑 Pre-check if userId exists in existingOwners
                let checked = existingOwners.includes(userId.toString()) ? "checked" : "";

                var itemHtml = '';
                itemHtml += '<div class="list-group-item attendee">';
                itemHtml += '  <div class="form-check cusom-check form-check-reverse">';
                itemHtml += '    <input class="form-check-input" type="checkbox" name="attendees" id="attendees_' + userId + '" value="' + userId + '" ' + checked + '>';
                itemHtml += '    <label class="form-check-label" for="attendees_' + userId + '">';
                itemHtml += '      <span class="image">';
                itemHtml += '        <img src="' + imgSrc + '" alt="' + username + '" ' + dataNameAttr + ' width="18" height="18">';
                itemHtml += '      </span>';
                itemHtml += '      <span class="name">' + username + '</span>';
                itemHtml += '    </label>';
                itemHtml += '  </div>';
                itemHtml += '</div>';

                container.append(itemHtml);
            }
        },
        error: function () {
            $(".recResponsibleListUsers").html('<div class="text-danger">Failed to load users.</div>');
        }
    });
}


function teamAddPeople(id, users) {
    console.log(id,users,  "id");
    
        $.ajax({
          url: "/stratroom/projectPlanning/" + id,
          type: "GET",
          contentType: "application/json",
          success: function (data, status) {
            console.log(data, "getdata");

            // Ensure select options exist before setting value
            setSelectValue("#Project_owner", data.riskPlanningValue.projectOwner, data.riskPlanningValue.ownerName);
            setSelectValue("#Project_team", data.riskPlanningValue.projectTeam, "Team " + data.riskPlanningValue.projectTeam);
            setSelectValue("#Project_Department", data.riskPlanningValue.departmentId, "Dept " + data.riskPlanningValue.departmentId);

            // Simple inputs
            $("#Project_name").val(data.riskPlanningValue.projectName);
            $("#Project_description").val(data.riskPlanningValue.projectDescription);
            $("#budget").val(data.riskPlanningValue.budget);
            $("#status").val(data.riskPlanningValue.status).trigger('change');
            $("input[name='status'][value='" + data.riskPlanningValue.priority + "']").prop('checked', true);
            $("#Project_start_end_date").val(data.riskPlanningValue.projectStartEndDate);

            $("#Project_Id").val(data.id);
            $("#rf_categoryValue").val(data.riskPlanningValue.category).trigger('change');

            actionsDataArray = data.riskPlanningValue.actions || [];
            recommendationDataArray = data.riskPlanningValue.recommendation || [];



            var container = $(".teamlistusers");
    container.empty(); 

     let existingOwners = users ? users.toString().split(",") : [];
           if (!employeeArray || employeeArray.length == 0) {
                container.append('<div class="text-muted">No users found.</div>');
                return;
            }

            for (var i = 0; i < employeeArray.length; i++) {
                var user = employeeArray[i];
                var userId = user.id;
                var username = user.name || "Unknown";
                
                let imgSrc = "";
                let dataNameAttr = "";

                if (user.image && user.image !== "") {
                  imgSrc = user.image;
                } else {
                  imgSrc = createSvgDataUrl(username);
                  dataNameAttr = 'data-name="' + username + '" ';
                }

              
                let checked = existingOwners.includes(userId.toString()) ? "checked" : "";

                var itemHtml = '';
                itemHtml += '<div class="list-group-item attendee">';
                itemHtml += '  <div class="form-check cusom-check form-check-reverse">';
                itemHtml += '    <input class="form-check-input" type="checkbox" name="attendees" id="attendees_' + userId + '" value="' + userId + '" ' + checked + '>';
                itemHtml += '    <label class="form-check-label" for="attendees_' + userId + '">';
                itemHtml += '      <span class="image">';
                itemHtml += '        <img src="' + imgSrc + '" alt="' + username + '" ' + dataNameAttr + ' width="18" height="18">';
                itemHtml += '      </span>';
                itemHtml += '      <span class="name">' + username + '</span>';
                itemHtml += '    </label>';
                itemHtml += '  </div>';
                itemHtml += '</div>';

                container.append(itemHtml);
            }

          },
        });
}


$(document).on("click", ".peopleselectedUsers", function () {
    let selectedUsers = [];

    $(".listusers input[name='attendees']:checked").each(function () {
        const userId = $(this).val();
        const userName = $(this).closest(".attendee").find(".name").text();
        const userImg = $(this).closest(".attendee").find("img").attr("src");

        selectedUsers.push({ id: userId, name: userName, img: userImg });
    });

    if (!currentRowIndex) return;

    let $row = $("#tableBody").find("tr[data-row-index='" + currentRowIndex + "']");
    let $responsibleCell = $row.find(".responsible-cell");
    $responsibleCell.empty();

    // 🔑 Save owners in row’s data attribute for later submit
    let ids = selectedUsers.map(u => u.id).join(",");
    $row.data("owners", ids);  

    if (selectedUsers.length == 0) {
        $responsibleCell.append(
          '<li class="avatar avatar-xs pull-up" data-bs-target="#addpeople" data-bs-toggle="modal" onclick="recommendationaddpeople(' + currentRowIndex + ')">' +
          '<span class="avatar-initial rounded-circle" title="Add Responsible">+</span>' +
          '</li>'
        );
    } else {
        selectedUsers.forEach(user => {
            $responsibleCell.append(
              '<li class="avatar avatar-xs pull-up">' +
              ' <img src="' + user.img + '" alt="' + user.name + '" title="' + user.name + '" class="rounded-circle" />' +
              '</li>'
            );
        });

        $responsibleCell.append(
          '<li class="avatar avatar-xs pull-up" data-bs-target="#addpeople" data-bs-toggle="modal" onclick="recommendationaddpeople(' + currentRowIndex + ')">' +
          '<span class="avatar-initial rounded-circle" title="Add Responsible">+</span>' +
          '</li>'
        );
    }
});

// Recommendation
      function handleactionevent(id, type, action) {
         $("#actionBodyData").empty();
        $("#recommendationtype").val("create");
        $("#recommendationcount").val(0);
        $('[data-toggle="tooltip"]').tooltip("hide");
        $('[rel="tooltip"]').tooltip("hide");
        $.ajax({
          url: "/stratroom/riskPlanning/" + id,
          success: function (data) {

            setSelectValue("#Risk_owner", data.riskPlanningValue.riskOwner);

      setSelectValue(
        "#Risk_Department",
        data.riskPlanningValue.departmentId,
        "Dept " + data.riskPlanningValue.departmentId
      );

      // // Simple inputs
      $("#Risk_show_id").val(data.id);
      $("#Risk_title").val(data.riskPlanningValue.riskName);
      $("#Risk_description").val(data.riskPlanningValue.riskDesc);
      // $("#Risk_Department").val(data.riskPlanningValue.departmentId);
      $("#Project_Risk").val(data.riskPlanningValue.riskPageId);
      // $("input[name='status'][value='" + data.riskPlanningValue.priority + "']").prop('checked', true);
      $("#rf_category").val(data.riskPlanningValue.category).trigger("change");

      $("#Risk_DateIdentified").val(data.riskPlanningValue.riskDate);

      $("#Risk_Likelihood").val(data.riskPlanningValue.likelihood).trigger("change");
      $("#Risk_Impact").val(data.riskPlanningValue.impact).trigger("change");
      $("#Risk_Likelihood").val(data.riskPlanningValue.likelihood);
      $("#Risk_Mitigation_Strategy").val(
        data.riskPlanningValue.mitigationStrategy
      );
      $("#Risk_Contingency_Plan").val(data.riskPlanningValue.contingencyPlan);
      $("#Risk_owner").val(data.riskPlanningValue.riskOwner);
      $("#riskStatus").val(data.riskPlanningValue.status).trigger("change");
      $(
        "input[name='status'][value='" + data.riskPlanningValue.priority + "']"
      ).prop("checked", true);
            recommendationDataArray = data.riskPlanningValue.recommendation || [];
           
            actionPopSuccessCallback(data, id, type);
          },
          error: readErrorMsg,
        });
      }


function actionPopSuccessCallback(planList, typerequest) {
  console.log(planList, "planList");
  $("#actionBodyData").empty();

  var actions = planList.riskPlanningValue.actions || [];

if (actions.length > 0) {
    for (var i = 0; i < actions.length; i++) {
        var noteText = actions[i].name || "";
        var owners = actions[i].multipleOwners || ""; 
        var byDate = actions[i].byDate || "";
        var status = actions[i].status || "";
        var taskId = actions[i].taskId || "";
        console.log(owners, "owners");
        addActionRow(true, false, noteText, owners, byDate, status, taskId);
    }
} else {
    addActionRow(true, true, "", "");
}


  updateActionLastRow();
}

let actionRowCounter = 0;
function addActionRow(withAddBtn, isEmptyRecommendation, noteText, multipleOwners, byDate, status, taskId) {
  console.log(multipleOwners, byDate, status, taskId, "multipleOwners");
  noteText = noteText || "";
  multipleOwners = multipleOwners || "";
  byDate = byDate || "";
  status = status || "";
  taskId = taskId || "";

  actionRowCounter++;
  const rowIndex = actionRowCounter;

  var rowHtml = '';
  rowHtml += '<tr data-row-index="' + rowIndex + '" data-owners="' + multipleOwners + '" data-task-id="' + taskId + '">';
  
  // Notes
  rowHtml += '  <td>';
  rowHtml += '    <div class="form-group">';
  rowHtml += '      <textarea class="form-control" placeholder="Notes" rows="3">' + escapeHtml(noteText) + '</textarea>';
  rowHtml += '    </div>';
  rowHtml += '  </td>';

  // By Date (prefilled if value exists)
  // rowHtml += '  <td>';
  // rowHtml += '    <div class="form-group">';
  // rowHtml += '      <input type="date" class="form-control" value="' + byDate + '">';
  // rowHtml += '    </div>';
  // rowHtml += '  </td>';

  // // Responsible
  // rowHtml += '  <td class="align-middle">';
  // rowHtml += '    <div class="d-flex align-items-start justify-content-center">';
  // rowHtml += '      <ul class="list-unstyled d-inline-flex align-items-center avatar-group mb-0 responsible-cell">';

  // if (multipleOwners) {
  //   var ownerIds = String(multipleOwners).split(",");
  //   ownerIds.forEach(function (id) {
  //     var imgSrc = getUserImageById(id.trim());
  //     var userName = getUserNameById(id.trim());
  //     rowHtml += '<li class="avatar avatar-xs pull-up">';
  //     rowHtml += '<img src="' + imgSrc + '" alt="' + userName + '" title="' + userName + '" class="rounded-circle" />';
  //     rowHtml += '</li>';
  //   });
  // }

  // // Always keep the + badge
  // rowHtml += '        <li class="avatar avatar-xs pull-up" data-bs-target="#addpeopleactions" data-bs-toggle="modal" onclick="actionaddpeople(' + rowIndex + ')">';
  // rowHtml += '          <span class="avatar-initial rounded-circle" title="Add Responsible">+</span>';
  // rowHtml += '        </li>';

  // rowHtml += '      </ul>';
  // rowHtml += '    </div>';
  // rowHtml += '  </td>';

  // // Status (preselect if value exists)
  // rowHtml += '  <td class="text-center">';
  // rowHtml += '     <select name="action-status" class="form-select select-dropdown-action rowstatus" data-placeholder="Select Status">';
  // rowHtml += '      <option value="" ' + (status == "" ? "selected" : "") + ' disabled>Select Status</option>';
  // rowHtml += '      <option value="pending" ' + (status == "pending" ? "selected" : "") + '>Pending</option>';
  // rowHtml += '      <option value="completed" ' + (status == "completed" ? "selected" : "") + '>Completed</option>';
  // rowHtml += '    </select>';
  // rowHtml += '  </td>';

  // Action buttons
  rowHtml += '  <td class="text-end align-middle">';
  rowHtml += '    <div class="table-actions justify-content-center">';

  if (withAddBtn) {
    rowHtml += '      <a class="btn btn-sm btn-icon" onclick="addActionRow(true, true); updateActionLastRow();">';
    rowHtml += '        <span class="icon" data-bs-toggle="tooltip" title="Add">';
    rowHtml += '          <i class="fas fa-plus title_edit_icon"></i>';
    rowHtml += '        </span>';
    rowHtml += '      </a>';
  }

  rowHtml += '      <a class="btn btn-sm btn-icon" onclick="deleteActionRow(this); updateActionLastRow();">';
  rowHtml += '        <span class="icon" data-bs-toggle="tooltip" title="Delete">';
  rowHtml += '          <img src="/stratroom/images/delete-i.svg" width="12" height="12">';
  rowHtml += '        </span>';
  rowHtml += '      </a>';

  rowHtml += '    </div>';
  rowHtml += '  </td>';
  rowHtml += '</tr>';

  $("#actionBodyData").append(rowHtml);
}


    function updateActionLastRow() {
      $("#actionBodyData tr").each(function (index, row) {
        var addBtn = $(row).find(".fa-plus").closest("a");
        if (index == $("#actionBodyData tr").length - 1) {
          if (addBtn.length == 0) {
            // add + if missing
            $(row).find(".table-actions").prepend(
              '<a class="btn btn-sm btn-icon" onclick="addActionRow(true, true); updateActionLastRow();">' +
              '<span class="icon" data-bs-toggle="tooltip" title="Add">' +
              '<i class="fas fa-plus title_edit_icon"></i>' +
              '</span></a>'
            );
          }
        } else {
          addBtn.remove(); 
        }
      });
    }


function actionssubmit() {
  let urlparams = new URL(document.location).searchParams;
  let pageNo = urlparams.get("pageId");
  var riskName = $("#Risk_title").val();
  var category = $("#rf_category").val();
  var riskDesc = $("#Risk_description").val();
  var riskDept = $("#Risk_Department").val();
  var riskLikelihood = $("#Risk_Likelihood").val();
  var riskImpact = $("#Risk_Impact").val();
  var priority = $("input[name='priority']:checked").val();
  var mitigationStrategy = $("#Risk_Mitigation_Strategy").val();
  var contingencyPlan = $("#Risk_Contingency_Plan").val();
  var riskOwner = $("#Risk_owner").val();
  var riskDate = $("#Risk_DateIdentified").val();
  var selectedRiskValue = $("#Project_Risk").val();
  // var projectEndDate = $("#Project_end_date").val();
  var pagenumber = $("#pagenumber").val();



let recommendationList = [];
$("#tableBody tr").each(function () {
    let note = $(this).find("textarea").val().trim();
    let owners = $(this).data("owners") || ""; 
    let rowIndex = $(this).attr("data-row-index"); 

    if (note !== "") {
      recommendationList.push({
        id: rowIndex || 0,          
        name: note,                 
        multipleOwners: owners     
      });
    }
});


  let actionList = [];
  $("#actionBodyData tr").each(function () {
    let note = $(this).find("textarea").val().trim();
    let byDate = $(this).find("input[type='date']").val();
    let status = $(this).find(".rowstatus").val();
    let owners = $(this).data("owners") || ""; 
    let rowIndex = $(this).attr("data-row-index"); 
    let taskId = $(this).data("task-id") || "";

    if (note !== "" || byDate !== "" || status !== "" || owners !== "") {
      actionList.push({
        id: rowIndex || 0,
        name: note,
        byDate: byDate,
        multipleOwners: owners,
        status: status,
        taskId: taskId ? taskId : null
      });
    }
  });

    const payload = {
    id: $("#Risk_show_id").val() || "",
    owner: riskOwner,
    pageId: pageNo || "",
    departmentId: riskDept,
    departmentId: riskDept,
    riskId: "",
    identifiedDate: $("#Risk_DateIdentified").val() || "",
    riskPageId: parseFloat($("#Project_Risk").val()) || "",
    riskPlanningValue: {
      riskName: riskName,
      riskDesc: riskDesc,
      riskOwner: riskOwner,
      riskPageId: parseFloat($("#Project_Risk").val()) || "",
      multipleOwners: riskOwner,
      //   projectOwner: projectOwner,

      riskDate: $("#Risk_DateIdentified").val() || "",
      departmentId: riskDept,
      initiativePageId: $("#Project_Risk").val(),
      category: $("#rf_category").val(),
      status: $("#riskStatus").val(),
      priority: $("input[name='status']:checked").val() || "",
      likelihood: riskLikelihood,
      impact: riskImpact,
      mitigationStrategy: mitigationStrategy,
      contingencyPlan: contingencyPlan,
      recommendation: recommendationDataArray || [],   
      actions: actionList || [],
      attachment: [],
    },
  };


  console.log(payload, "ActionSavepayload");

  $.ajax({
    url: "/stratroom/riskPlanning",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(payload),
    success: function (data, status) {
      $.notify("Project Planning saved successfully", { style: 'success', className: 'graynotify' });
      $("#Project_name").val('');
      $("#Project_Description").val('');
      $("#Project_Department").val('');
      $("#Project_owner").val('');
      $("#Project_team").val('');
      $("#Project_start_date").val('');
      $("#Project_end_date").val('');

      window.location.reload();
    },
    error: function (xhr, status, error) {
      $.notify("Error saving Project Planning", { style: 'success', className: 'graynotify' });
    }
  });
}


$(document).on("click", ".actionpeopleselectedUsers", function () {
    let selectedUsers = [];

    $(".actionsListUsers input[name='attendees']:checked").each(function () {
        const userId = $(this).val();
        const userName = $(this).closest(".attendee").find(".name").text();
        const userImg = $(this).closest(".attendee").find("img").attr("src");

        selectedUsers.push({ id: userId, name: userName, img: userImg });
    });

    if (!currentActionRowIndex) return;

    let $row = $("#actionBodyData").find("tr[data-row-index='" + currentActionRowIndex + "']");
    let $responsibleCell = $row.find(".responsible-cell");
    $responsibleCell.empty();

    // 🔑 Save owners in row’s data attribute for later submit
    let ids = selectedUsers.map(u => u.id).join(",");
    $row.data("owners", ids);  

    if (selectedUsers.length == 0) {
        $responsibleCell.append(
          '<li class="avatar avatar-xs pull-up" data-bs-target="#addpeopleactions" data-bs-toggle="modal" onclick="actionaddpeople(' + currentActionRowIndex + ')">' +
          '<span class="avatar-initial rounded-circle" title="Add Responsible">+</span>' +
          '</li>'
        );
    } else {
        selectedUsers.forEach(user => {
            $responsibleCell.append(
              '<li class="avatar avatar-xs pull-up">' +
              ' <img src="' + user.img + '" alt="' + user.name + '" title="' + user.name + '" class="rounded-circle" />' +
              '</li>'
            );
        });

        $responsibleCell.append(
          '<li class="avatar avatar-xs pull-up" data-bs-target="#addpeopleactions" data-bs-toggle="modal" onclick="actionaddpeople(' + currentActionRowIndex + ')">' +
          '<span class="avatar-initial rounded-circle" title="Add Responsible">+</span>' +
          '</li>'
        );
    }
});

let currentActionRowIndex  = null;
function actionaddpeople(noteId) {
    var container = $(".actionsListUsers");
    container.empty(); 
    currentActionRowIndex  = noteId;
  

    // Get existing owners from the row
    let $row = $("#actionBodyData").find("tr[data-row-index='" + noteId + "']");
    let existingOwners = $row.data("owners") ? $row.data("owners").toString().split(",") : [];

    $.ajax({
        url: "/stratroom/user/moduleAccessUserList?moduleName=Meetings",
        contentType: "application/json",
        success: function (data) {
            console.log(data, "data");

            

            if (!data || data.length == 0) {
                container.append('<div class="text-muted">No users found.</div>');
                return;
            }

            for (var i = 0; i < data.length; i++) {
                var user = data[i];
                var userId = user.id;
                var username = user.name || "Unknown";
                
                let imgSrc = "";
                let dataNameAttr = "";

                if (user.image && user.image !== "") {
                  imgSrc = user.image;
                } else {
                  imgSrc = createSvgDataUrl(username);
                  dataNameAttr = 'data-name="' + username + '" ';
                }

                // 🔑 Pre-check if userId exists in existingOwners
                let checked = existingOwners.includes(userId.toString()) ? "checked" : "";

                var itemHtml = '';
                itemHtml += '<div class="list-group-item attendee">';
                itemHtml += '  <div class="form-check cusom-check form-check-reverse">';
                itemHtml += '    <input class="form-check-input" type="checkbox" name="attendees" id="attendees_' + userId + '" value="' + userId + '" ' + checked + '>';
                itemHtml += '    <label class="form-check-label" for="attendees_' + userId + '">';
                itemHtml += '      <span class="image">';
                itemHtml += '        <img src="' + imgSrc + '" alt="' + username + '" ' + dataNameAttr + ' width="18" height="18">';
                itemHtml += '      </span>';
                itemHtml += '      <span class="name">' + username + '</span>';
                itemHtml += '    </label>';
                itemHtml += '  </div>';
                itemHtml += '</div>';

                container.append(itemHtml);
            }
        },
        error: function () {
            $(".actionsListUsers").html('<div class="text-danger">Failed to load users.</div>');
        }
    });
}
//Action

// files
function handleAttchmentevent(id){
  initiativeId = id; 
  console.log(id, "itemId");

        	$.ajax({
        		url : "/stratroom/initiativeAttach/" + id,
        		async:false,
        		method:'GET',
        		success : function(datafile,status){
        			var systemip = 	localStorage.getItem('systemip');
    				var action 	= 	"Meeting Attachment Uploaded";
    				var navigateempId = $("#userPrincipalnavigate").val();
				    var data	=	{"createdBy":currentEmp,"userId":navigateempId,"typeId":swotGlobalid,"action":action,"systemIp":systemip};
    				auditrailpage(data,'file');
        			$('#attachementuploadfile').val('');	
                	$("#closeUpload").click();
                	checkmodalisclosedornot();
                	uploadShow(datafile);
        		}
        	});   
      

}



$(document).on("click", "[data-bs-target='#project-planning-add-modal']", function () {
    resetAuditModal();
});


function resetAuditModal() {
    // Title
    $("#Risk_title").val("");

    // Audit ID
    $("#Risk_description").val("");

    // Audit Category
    $("#Risk_Department").val("");

    // Audit Period
    $("#Project_Risk").val("");

    // Department
    $("#rf_category").val("");

    // Auditor(s)
    $("#Risk_DateIdentified").val("");

    // Updated By (Owner)
    $("#Risk_Likelihood").val("");

    // Start/End Date
    $("#Risk_Impact").val("");

    // Next Review Date
    $("#Risk_Mitigation_Strategy").val("");

    // Status dropdown
    $("#Risk_Contingency_Plan").val("");

    // Findings and Issues
    $("#Risk_owner").val("");
    $("#riskStatus").val("");

    // Risk Rating (radio buttons)
    $("input[name='status']").prop("checked", false);

    // Reset selected classes etc. if using a custom plugin
    $(".modal-custom-select").trigger("change");

  
}

//files


//Risk sore code 
function getriskcustomscore() {
	$.ajax({
		type: "GET",
		url: "/stratroom/riskcustomscore",
		async: false,
		success: function (data) {
			
      riskScoresData = data; 

    }
  });
}


   function updateRiskScore() {
     console.log(riskScoresData, "riskScoresData");    
    var likelihoodSelect = document.getElementById("Risk_Likelihood");
    var impactSelect = document.getElementById("Risk_Impact");
    var riskScoreInput = document.getElementById("Risk_score");

  

    var likelihoodText = likelihoodSelect.options[likelihoodSelect.selectedIndex]?.text;
    var impactText = impactSelect.options[impactSelect.selectedIndex]?.text;

    var likelihoodScore = "";
    var impactScore = "";

    riskScoresData.forEach(function (item) {
        if (item.description == likelihoodText) {
            likelihoodScore = item.score;
        }
        if (item.description == impactText) {
            impactScore = item.score;
        }
    });

    if (likelihoodScore && impactScore) {
         riskScoreInput.value = likelihoodScore + impactScore;
    } else {
        riskScoreInput.value = "";
    }
}



 
getriskcustomscore();
getRiskPageList();
getEmployeeListDate();
getDepartmentListDate();
moduleAccessUserListData();
