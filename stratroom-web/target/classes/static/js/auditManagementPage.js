var userId = "";
var userDeptId = "";
var employeeArray = [];
var actionsDataArray = [];
var recommendationDataArray = [];
var allListUsersData = [];
var auditManagementList = [];
var currentEmp		=	$("#userPrincipal").val().trim();
var findingsgGetDataArray = [];
var findingsIssuesDataArray = [];
var attachment	=	[];
var attachmentdeleteId ='';
const userIdData = $("#userPrincipal").val().trim();
console.log(userIdData, "GaneshuserIdoutside");


function getLoginUserData() {
  $.ajax({
            url: "/stratroom/userRole/" + userIdData,
            type: "get",
            contentType: "application/json",
            success: function (data) {
              const users = data;
              const username = users.name || "NN";
              const userEmail = users.emailAddress || "";

              $("#aw_updated_byName").val(username);
              console.log(username, "username");
              console.log(userEmail, "userEmail");
              },
            error: function (err) {
              console.error("Error fetching user data:", err);
            },
          });

};

getLoginUserData();
function getDepartmentListDate() {
  $.ajax({
    url: "/stratroom/allDepartmentList",
    async: false,
    success: function (departmentList) {
        console.log(departmentList, "departmentList")
      var select = document.getElementById("aw_dept");

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


    getDepartmentListDate();


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
      var select = document.getElementById("aw_updated_by_lead");
      var selectmulti = document.getElementById("aw_team_members");
      var findingOwner = document.getElementById("finding-owner");
      var issueWoner = document.getElementById("issue-owner");

      select.innerHTML = '<option value="" disabled selected>Select</option>';
      findingOwner.innerHTML = '<option value="" disabled selected>Select Owner</option>';
      issueWoner.innerHTML = '<option value="" disabled selected>Select Owner</option>';

      for (var i = 0; i < employeeList.length; i++) {
        var employee = employeeList[i];
        var option =
          '<option value="' + employee.id + '">' + employee.name + "</option>";
        select.innerHTML += option;
      }

      for (var i = 0; i < employeeList.length; i++) {
        var employee = employeeList[i];
        var option =
          '<option value="' + employee.id + '">' + employee.name + "</option>";
        selectmulti.innerHTML += option;
      }

      for (var i = 0; i < employeeList.length; i++) {
        var employee = employeeList[i];
        var option =
          '<option value="' + employee.name + '">' + employee.name + "</option>";
        findingOwner.innerHTML += option;
      }

      for (var i = 0; i < employeeList.length; i++) {
        var employee = employeeList[i];
        var option =
          '<option value="' + employee.name  + '">' + employee.name + "</option>";
        issueWoner.innerHTML += option;
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
  var title = $("#aw_title").val();
  var category = $("#aw_category").val();
  var auditPeriod = $("#aw_period").val();
  var dept = $("#aw_dept").val();
  var startEndDate = $("#am_audit_start_date").val();
  var auditor = $("#aw_auditor_type").val();
  var updatedBy = $("#aw_updated_by").val();
  var nextDate = $("#aw_next_review").val();
  var noOfFindings = $("#aw_findings").val();
  var noOfIssue = $("#aw_issues").val();
  var riskRating = $("input[name='status']:checked").val();
  var pagenumber = $("#pagenumber").val();

   var formattedEndDate = "";
        var formattedStartDate = "";

        var parts = startEndDate.split(" to ");
        if (parts.length == 2) {
          var startDateStr = parts[0];
          var endDateStr = parts[1];

          // Parse start date
          var startParts = startDateStr.split(" ");
          var startMonthName = startParts[0]; // "Sep"
          var startDay = startParts[1].replace(",", "").padStart(2, '0');
          var startYear = startParts[2]; // "2025"

          // Parse end date
          var endParts = endDateStr.split(" ");
          var endMonthName = endParts[0]; // "Sep"
          var endDay = endParts[1].replace(",", "").padStart(2, '0'); // "23"
          var endYear = endParts[2]; // "2025"

          // Map month names to numbers (2-digit)
          var monthMap = {
            "Jan": "01",
            "Feb": "02",
            "Mar": "03",
            "Apr": "04",
            "May": "05",
            "Jun": "06",
            "Jul": "07",
            "Aug": "08",
            "Sep": "09",
            "Oct": "10",
            "Nov": "11",
            "Dec": "12"
          };

          var startMonth = monthMap[startMonthName];
          var endMonth = monthMap[endMonthName];


        //   formattedStartDate = startMonth + "/" + startDay + "/" + startYear;
        //   formattedEndDate = endMonth + "/" + endDay + "/" + endYear;
     
         formattedStartDate = startYear + "-" + startMonth + "-" + startDay;
          formattedEndDate = endYear + "-" + endMonth + "-" + endDay;
     


          console.log("Start Date:", formattedStartDate);
          console.log("End Date:", formattedEndDate);
        }


       let notifications = [];

        $('.notification-checkbox').each(function () {

            if ($(this).is(':checked')) {

                notifications.push('on');

            } else {

                notifications.push('off');
            }

        });

        let notificationString = notifications.join(',');

        console.log(notificationString);

        const payload = {
          id: $("#aw_audit_id").val() || "",
          owner : $("#userPrincipal").val().trim(),
          pageId: pageNo || "",
          departmentId: dept,
          startDate: formattedStartDate,
          endDate : formattedEndDate,
          managementValue: {
            title: title,
            category: category,
            objectivePurpose : $("#aw_objective").val() || "",
            auditType: $("#aw_type").val() || "",
            regulatoryFramework : $("#aw_framework").val() || "",
            entity : $("#aw_entity").val() || "",
            updatedBy: $("#userPrincipal").val().trim(),
            startEndDate: startEndDate,
            auditPeriod : auditPeriod, 
            departmentId: dept,
            status: $("#aw_status").val(),
            rating: $("input[name='aw_risk']:checked").val() || "",
            materialImpactAreas : $("#aw_materiality").val() || "",
            inherentRiskScore : $("#aw_risk_score").val() || "",
            controleffectiveness : $("#aw_control_eff").val() || "",
            priority : $("#aw_priority").val() || "",
            reportDueDate : $("#aw_report_due").val() || "",
            scopeofAudit : $("#aw_scope").val() || "",
            auditCritiria : $("#aw_criteria").val() || "",
            auditCheckList : $("#aw_checklist").val() || "",
            internalNotes : $("#aw_notes").val() || "",
            notifications : notificationString,
            leadAuditor : $("#aw_updated_by_lead").val() || "",
            teamMembers :  $("#aw_team_members").val() || "", 
            auditor: auditor,
            auditee : $("#aw_auditee").val() || "",
            nextDate: nextDate,
            noOfFindings: noOfFindings,
            noOfIssue: noOfIssue,
            progress: $("#aw_progress").val() || "",
            recommendation: [],
            actions: [],
            attachment: [],
          },
        };

  console.log(payload, "payload");

  $.ajax({
    url: "/stratroom/auditManagement",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(payload),
    success: function (data, status) {
      $.notify("Saved successfully", {
        style: "success",
        className: "graynotify",
      });
      

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
    console.log(name, "name");
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


function escapeHtml(text) {
  var div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}


function fetchRiskPlanningList(employeeMap) {
  let urlparams = new URL(document.location).searchParams;
  let pageNo = urlparams.get("pageId");

  $.ajax({
    url: "/stratroom/auditManagementList?pageId=" + pageNo,
    type: "GET",
    success: function (projectPlanningList) {
      console.log(projectPlanningList, "projectPlanningList");
      auditManagementList = projectPlanningList;

      let html = "";

      projectPlanningList.forEach(function(item) {
        const mv = item.managementValue || {};

        // Dynamic values
        const title = mv.title || "N/A";
        const category = mv.category || "N/A";
        const auditId = "AUD-" + item.id.toString()
        const auditor = mv.auditor || "N/A";
        const dept = item.departmentName || "N/A";
        const auditPeriod = mv.auditPeriod || "N/A";
        const startEndDate = mv.startEndDate || "N/A";
        const status = mv.status || "N/A";
        const rating = mv.rating || "N/A";
        const aw_findings = mv.noOfFindings || "0";
        const issues = mv.noOfIssue || "0";
        const updatedBy = mv.createdByName || "User";
        const nextReview = mv.nextDate || "N/A";
        const progress = (mv.progress || "0").replace("%", "") + "%";

        let ownerId = mv.updatedBy || "";
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

        // Badge Color Logic
        const statusColorMap = {
          "planned": "label-bg-gray",
          "in_progress": "label-bg-blue",
          "under_review": "label-bg-yellow",
          "completed": "label-bg-green"
        };

        const ratingColorMap = {
          "Low": "status-bg-red",
          "Medium": "status-bg-yellow",
          "High": "status-bg-green"
        };


       const titleColorMap = {
        "Legal Compliance": "status-bg-blue",
        "Tax Compliance": "status-bg-green",
        "Corporate Governance": "status-bg-cyan",
        "Financial Reporting": "status-bg-red",
        "AML & ABAC": "status-bg-orange",
        "Data Privacy": "status-bg-purple",
        "ESG Compliance": "status-bg-teal",
        "HSE Compliance": "status-bg-yellow",
        "Labor Compliance": "status-bg-indigo",
        "Industry Regulations": "status-bg-brown"
      };


        const statusBadge = statusColorMap[status] || "label-bg-gray";
        const ratingBadge = ratingColorMap[rating] || "status-bg-gray";

        const titleBadge = titleColorMap[category] || "status-bg-gray";

        console.log(ratingBadge,statusBadge, titleBadge, "ratingBagdge")
       

        html += '<div class="card meeting-card">';
        html += '  <div class="card-header flex-wrap flex-sm-nowrap">';
        html += '    <div class="c-header-left">';
        html += '      <span class="meeting-label badge '+ titleBadge +' auditCategory">' + category + '</span>';
        html += '    </div>';
        html += '    <div class="meeting-action">';
        html += '      <ul class="list-unstyled action-list mb-0">';
        html += '        <li>';
        html += '          <a href="#aw_findings-issues-modal" data-bs-toggle="modal" data-bs-target="#recommendation" style="cursor:pointer;" onclick="handlerecommendationevent(' + item.id + ', \'recommendation\')">';
        html += '            <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Findings/ Issues">';
        html += '              <i data-lucide="notebook-pen" style="width:14px;height:14px;"></i>';
        html += '            </span>';
        html += '          </a>';
        html += '        </li>';

        html += '        <li>';
        html += '          <a href="#action-modal" data-bs-toggle="modal" style="cursor:pointer;" data-bs-target="#action" onclick="handleactionevent(' + item.id + ', \'action\')">';
        html += '            <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Action">';
        html += '              <i data-lucide="settings" style="width:14px;height:14px;"></i>';
        html += '            </span>';
        html += '          </a>';
        html += '        </li>';

        html += '        <li>';
        html += '          <a data-target="#uploaded_files" data-toggle="modal" style="cursor:pointer;" onclick="handleUploadShow(' + item.id + ')">';
        html += '            <span class="icon" data-toggle="tooltip" data-placement="bottom" data-title="Attachment">';
        html += '              <i data-lucide="paperclip" style="width:14px;height:14px;"></i>';
        html += '            </span>';
        html += '          </a>';
        html += '        </li>';

        html += '        <li class="dropdown">';
        html += '          <a class="btn btn-link p-0" type="button" data-bs-toggle="dropdown" style="cursor:pointer;">';
        html += '            <span class="icon">';
        html += '              <i data-lucide="ellipsis-vertical" style="width:14px;height:14px;"></i>';
        html += '            </span>';
        html += '          </a>';

        html += '          <ul class="dropdown-menu dropdown-menu-end border-0 shadow">';
        html += '            <li><a class="dropdown-item editRisk" href="#audit-add-modal" data-bs-toggle="modal" data-risk-id="' + item.id + '">Edit</a></li>';
        html += '            <li><a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal" data-project-id="' + item.id +'">Delete</a></li>';
        html += '          </ul>';
        html += '        </li>';
        html += '      </ul>';
        html += '    </div>';
        html += '  </div>';

        html += '  <div class="card-body meeting-details d-flex flex-column">';

        html += '    <div class="d-flex justify-content-between">';
        html += '      <div class="form-group">';
        html += '        <label class="form-label">Title</label>';
        html += '        <p class="form-control-plaintext line-clamp-2">' + title + '</p>';
        html += '      </div>';
        html += '      <div class="form-group text-end">';
        html += '        <label class="form-label">Audit ID</label>';
        html += '        <p class="form-control-plaintext">' + auditId + '</p>';
        html += '      </div>';
        html += '    </div>';

        html += '    <div class="d-flex justify-content-between">';
        html += '      <div class="form-group">';
        html += '        <label class="form-label">Auditor(s)</label>';
        html += '        <p class="form-control-plaintext">' + auditor + '</p>';
        html += '      </div>';
        html += '      <div class="form-group text-end">';
        html += '        <label class="form-label">Department</label>';
        html += '        <p class="form-control-plaintext">' + dept + '</p>';
        html += '      </div>';
        html += '    </div>';

        html += '    <div class="d-flex justify-content-between">';
        html += '      <div class="form-group">';
        html += '        <label class="form-label">Audit Period</label>';
        html += '        <p class="form-control-plaintext">' + auditPeriod + '</p>';
        html += '      </div>';
        html += '      <div class="form-group text-end">';
        html += '        <label class="form-label">Audit Start/End Date</label>';
        html += '        <p class="form-control-plaintext">' + startEndDate + '</p>';
        html += '      </div>';
        html += '    </div>';

        html += '    <div class="d-flex justify-content-between">';
        html += '      <div class="form-group">';
        html += '        <label class="form-label">Status</label>';
        html += '        <span class="badge ' + statusBadge + ' rounded-pill text-capitalize">' + status.replace("_", " ") + '</span>';
        html += '      </div>';
        html += '      <div class="form-group text-end">';
        html += '        <label class="form-label">Risk Rating</label>';
        html += '        <span class="badge ' + ratingBadge + ' rounded-pill text-capitalize">' + rating + '</span>';
        html += '      </div>';
        html += '    </div>';

        html += '    <div class="d-flex justify-content-between">';
        html += '      <div class="form-group">';
        html += '        <label class="form-label"># of Findings</label>';
        html += '        <div class="form-control-plaintext d-flex align-items-center">' + aw_findings + '  <button type="button" data-bs-toggle="modal" onclick="viewFindingsDetails(' + item.id + ')" class="btn btn-link p-0 ms-1 text-primary" title="View Findings" style="line-height:1;"><i data-lucide="eye" style="width: 14px; height: 14px;"></i></button></div>';
        html += '      </div>';
        html += '      <div class="form-group text-end">';
        html += '        <label class="form-label"># of Issues</label>';
        html += '        <div class="form-control-plaintext d-flex align-items-center">' + issues + ' <button type="button" data-bs-toggle="modal" onclick="viewIssuesDetails(' + item.id + ')" class="btn btn-link p-0 ms-1 text-primary" title="View Issues" style="line-height:1;"><i data-lucide="eye" style="width: 14px; height: 14px;"></i></button></div>';
        html += '      </div>';
        html += '    </div>';

        html += '    <div class="d-flex justify-content-between">';
        html += '      <div class="form-group">';
        html += '        <label class="form-label">Updated By</label>' + sponsorHtml;
        html += '      </div>';
        html += '      <div class="form-group text-end">';
        html += '        <label class="form-label">Next Review Date</label>';
        html += '        <p class="form-control-plaintext">' + nextReview + '</p>';
        html += '      </div>';
        html += '    </div>';

        html += '   <div class="mt-2">';
        html += '   <div class="d-flex justify-content-between mb-1">';
        html += '   <span style="font-size: 13px; color: var(--bs-secondary-color);">Progress</span>';
        html += '   <span style="font-size: 13px; color: var(--bs-secondary-color);" contenteditable="true" class="">' + progress + '</span>'
        html += '   </div>';
        html += '   <div class="progress" style="height: 6px;">';
        html += '   <div class="progress-bar status-bg-red" role="progressbar" style="width: ' + progress + '"></div>';
        html += '   </div>';
        html += '   </div>';

        html += '  </div>';
        html += '</div>';
      });

      $(".meetingList").html(html);
      lucide.createIcons(); // for icons
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
  $(".headerText").text("Edit Audit");
  $(".buttonText").text("Update");

  $.ajax({
    url: "/stratroom/auditManagement/" + projectId,
    type: "GET",
    contentType: "application/json",
    success: function (data, status) {
      console.log(data, "getdata");

      // // Ensure select options exist before setting value
      setSelectValue("#aw_updated_by", data.managementValue.updatedBy);

      setSelectValue(
        "#aw_dept",
        data.managementValue.departmentId,
        "Dept " + data.managementValue.departmentId
      );

      // // Simple inputs
      $("#aw_audit_id").val(data.id);
      $("#aw_title").val(data.managementValue.title);
      $("#aw_category").val(data.managementValue.category).trigger("change");
      // $("#department").val(data.managementValue.departmentId);
      $("#aw_period").val(data.managementValue.auditPeriod).trigger("change");
      // $("input[name='status'][value='" + data.managementValue.priority + "']").prop('checked', true);
      $("#am_audit_start_date").val(data.managementValue.startEndDate);

      $("#aw_auditor_type").val(data.managementValue.auditor).trigger("change");

      $("#aw_next_review").val(data.managementValue.nextDate);
      $("#aw_findings").val(data.managementValue.noOfFindings);
      $("#aw_issues").val(data.managementValue.noOfIssue);
     
      $("#aw_status").val(data.managementValue.status).trigger("change");
      // $(
      //   "input[name='aw_risk'][value='" + data.managementValue.rating + "']"
      // ).prop("checked", true);

      let rating = data.managementValue.rating;
      console.log(rating, "rating");


     const selectedRisk =
        document.querySelector("input[name='aw_risk'][value='" + rating + "']");

      if (selectedRisk) {

        selectedRisk.checked = true;

        document
          .querySelectorAll("#awRiskGroup .audit-check-chip")
          .forEach(el => el.classList.remove("selected"));

        selectedRisk
          .closest(".audit-check-chip")
          .classList.add("selected");
      }

      $("#aw_objective").val(data.managementValue.objectivePurpose);
      $("#aw_framework").val(data.managementValue.regulatoryFramework);
      $("#aw_entity").val(data.managementValue.entity);
      $("#aw_materiality").val(data.managementValue.materialImpactAreas).trigger("change");
      $("#aw_risk_score").val(data.managementValue.inherentRiskScore);
      $("#aw_control_eff").val(data.managementValue.controleffectiveness).trigger("change");
      $("#aw_priority").val(data.managementValue.priority).trigger("change");
      $("#aw_report_due").val(data.managementValue.reportDueDate);
      $("#aw_updated_by_lead").val(data.managementValue.leadAuditor).trigger("change");
      $("#aw_team_members").val(data.managementValue.teamMembers).trigger("change");
      $("#aw_auditee").val(data.managementValue.auditee).trigger("change");
      $("#aw_scope").val(data.managementValue.scopeofAudit);
      $("#aw_criteria").val(data.managementValue.auditCritiria);
      $("#aw_checklist").val(data.managementValue.auditCheckList);
      $("#aw_notes").val(data.managementValue.internalNotes);

      let notifications = data.managementValue.notifications || "";


      console.log(notifications, "notifications");

      const notificationValues = notifications.split(",");

      const notificationCheckboxes = document.querySelectorAll(".notification-checkbox");

      notificationCheckboxes.forEach((checkbox, index) => {

          checkbox.checked = false;

          checkbox.closest(".audit-check-chip")
              .classList.remove("selected");

          if (notificationValues[index] == "on") {

              checkbox.checked = true;

              checkbox.closest(".audit-check-chip")
                  .classList.add("selected");
          }
      });

      $("#aw_type").val(data.managementValue.auditType).trigger("change");

      $("#aw_progress").val(data.managementValue.progress);




    },
  });
});

// Delete Project Planning
$(document).on("click", '.dropdown-item[href="#delete-modal"]', function () {
  var projectId = $(this).data("project-id");
  console.log(projectId, "projectId");

  $.ajax({
    url: "/stratroom/auditManagement/" + projectId,
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
  console.log(id, type, action, "handlerecommendationevent");
  $("#tableBody").empty();
  $("#recommendationtype").val("create");
  $("#recommendationcount").val(0);
  $('[data-toggle="tooltip"]').tooltip("hide");
  $('[rel="tooltip"]').tooltip("hide");
  $.ajax({
    url: "/stratroom/auditManagement/" + id,
    success: function (data) {
      findingsgGetDataArray = data
      console.log(data, "data");

      $("#linked_audit_name").val(data.managementValue.title);
      $("#linked_audit_name_issue").val(data.managementValue.title);

      //Previous Design Code 
      // Ensure select options exist before setting value
      // // Ensure select options exist before setting value
    setSelectValue("#aw_updated_by", data.managementValue.updatedBy);

      setSelectValue(
        "#aw_dept",
        data.managementValue.departmentId,
        "Dept " + data.managementValue.departmentId
      );

      // // Simple inputs
      $("#aw_audit_id").val(data.id);
      $("#aw_title").val(data.managementValue.title);
      $("#aw_category").val(data.managementValue.category).trigger("change");
      // $("#department").val(data.managementValue.departmentId);
      $("#aw_period").val(data.managementValue.auditPeriod).trigger("change");
      // $("input[name='status'][value='" + data.managementValue.priority + "']").prop('checked', true);
      $("#am_audit_start_date").val(data.managementValue.startEndDate);

      $("#aw_auditor_type").val(data.managementValue.auditor).trigger("change");

      $("#aw_next_review").val(data.managementValue.nextDate);
      $("#aw_findings").val(data.managementValue.noOfFindings);
      $("#aw_issues").val(data.managementValue.noOfIssue);
     
      $("#aw_status").val(data.managementValue.status).trigger("change");
      $(
        "input[name='status'][value='" + data.managementValue.rating + "']"
      ).prop("checked", true);

      actionsDataArray = data.managementValue.actions || [];
      findingsIssuesDataArray = data.managementValue.findingsIssuesData || [];

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
  // rowHtml += '  <td class="align-middle">';
  // rowHtml += '    <div class="d-flex align-items-start justify-content-center">';
  // rowHtml += '      <ul class="list-unstyled d-inline-flex align-items-center avatar-group mb-0 responsible-cell">';

  // // If multipleOwners has IDs, show images
  // if (multipleOwners) {
  //   var ownerIds = multipleOwners.split(",");
  //   ownerIds.forEach(function(id) {
       
  //       var imgSrc = getUserImageById(id); 
  //       var userName = getUserNameById(id); 
  //       rowHtml += '<li class="avatar avatar-xs pull-up">';
  //       rowHtml += '<img src="' + imgSrc + '" alt="' + userName + '" title="' + userName + '" class="rounded-circle" />';
  //       rowHtml += '</li>';
  //   });
  // }

  // // Always keep the + badge
  // rowHtml += '        <li class="avatar avatar-xs pull-up" data-bs-target="#addpeople" data-bs-toggle="modal" onclick="recommendationaddpeople(' + rowIndex + ')">';
  // rowHtml += '          <span class="avatar-initial rounded-circle" title="Add Responsible">+</span>';
  // rowHtml += '        </li>';

  // rowHtml += '      </ul>';
  // rowHtml += '    </div>';
  // rowHtml += '  </td>';
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

  var recommendations = planList.managementValue.recommendation || [];
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
  var title = $("#aw_title").val();
  var category = $("#aw_category").val();
  var auditPeriod = $("#aw_period").val();
  var dept = $("#aw_dept").val();
  var startEndDate = $("#am_audit_start_date").val();
  var auditor = $("#aw_auditor_type").val();
  var updatedBy = $("#aw_updated_by").val();
  var nextDate = $("#aw_next_review").val();
  var noOfFindings = $("#aw_findings").val();
  var noOfIssue = $("#aw_issues").val();
  var riskRating = $("input[name='status']:checked").val();
  var pagenumber = $("#pagenumber").val();
  
  
   var formattedEndDate = "";
        var formattedStartDate = "";

        var parts = startEndDate.split(" to ");
        if (parts.length == 2) {
          var startDateStr = parts[0];
          var endDateStr = parts[1];

          // Parse start date
          var startParts = startDateStr.split(" ");
          var startMonthName = startParts[0]; // "Sep"
          var startDay = startParts[1].replace(",", "").padStart(2, '0');
          var startYear = startParts[2]; // "2025"

          // Parse end date
          var endParts = endDateStr.split(" ");
          var endMonthName = endParts[0]; // "Sep"
          var endDay = endParts[1].replace(",", "").padStart(2, '0'); // "23"
          var endYear = endParts[2]; // "2025"

          // Map month names to numbers (2-digit)
          var monthMap = {
            "Jan": "01",
            "Feb": "02",
            "Mar": "03",
            "Apr": "04",
            "May": "05",
            "Jun": "06",
            "Jul": "07",
            "Aug": "08",
            "Sep": "09",
            "Oct": "10",
            "Nov": "11",
            "Dec": "12"
          };

          var startMonth = monthMap[startMonthName];
          var endMonth = monthMap[endMonthName];


        //   formattedStartDate = startMonth + "/" + startDay + "/" + startYear;
        //   formattedEndDate = endMonth + "/" + endDay + "/" + endYear;
     
         formattedStartDate = startYear + "-" + startMonth + "-" + startDay;
          formattedEndDate = endYear + "-" + endMonth + "-" + endDay;
     


          console.log("Start Date:", formattedStartDate);
          console.log("End Date:", formattedEndDate);
        }


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
  //   aw_updated_by: projectOwner,
  //   pageId: pageNo || "",
  //   departmentId: projectDept,
  //   managementValue: {
  //     projectName: projectName,
  //     projectDescription: projectDesc,
  //     projectTeam: projectTeam,
  //     multipleOwners: multipleOwnerData,
  //     projectOwner: projectOwner,
  //     fromdate: formattedStartDate,
  //     enddate: formattedEndDate,
  //     departmentId: projectDept,
  //     category: $("#categoryValue").val() || "",
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
    id: $("#aw_audit_id").val() || "",
    owner: updatedBy,
    pageId: pageNo || "",
    departmentId: dept,
    startDate: formattedStartDate,
    endDate : formattedEndDate,
    managementValue: {
      title: title,
      category: category,
      updatedBy: updatedBy,
      startEndDate: startEndDate,
      auditPeriod : auditPeriod, 
      departmentId: dept,
      status: $("#aw_status").val(),
      rating: $("input[name='status']:checked").val() || "",
      auditor: auditor,
      nextDate: nextDate,
      noOfFindings: noOfFindings,
      noOfIssue: noOfIssue,
      recommendation: recommendationList,   
      actions: actionsDataArray || [],
      attachment: [],
    },
  };

  console.log(payload, "payload");

  $.ajax({
    url: "/stratroom/auditManagement",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(payload),
    success: function (data, status) {
      $.notify("Project Planning saved successfully", { style: 'success', className: 'graynotify' });
      $("#aw_title").val('');
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
            setSelectValue("#Project_owner", data.managementValue.projectOwner, data.managementValue.ownerName);
            setSelectValue("#Project_team", data.managementValue.projectTeam, "Team " + data.managementValue.projectTeam);
            setSelectValue("#Project_Department", data.managementValue.departmentId, "Dept " + data.managementValue.departmentId);

            // Simple inputs
            $("#aw_title").val(data.managementValue.projectName);
            $("#Project_description").val(data.managementValue.projectDescription);
            $("#budget").val(data.managementValue.budget);
            $("#status").val(data.managementValue.status).trigger('change');
            $("input[name='status'][value='" + data.managementValue.priority + "']").prop('checked', true);
            $("#Project_start_end_date").val(data.managementValue.projectStartEndDate);

            $("#Project_Id").val(data.id);
            

            actionsDataArray = data.managementValue.actions || [];
            recommendationDataArray = data.managementValue.recommendation || [];
            findingsIssuesDataArray = data.managementValue.findingsIssuesData || [];



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
          url: "/stratroom/auditManagement/" + id,
          success: function (data) {

           setSelectValue("#aw_updated_by", data.managementValue.updatedBy);

      setSelectValue(
        "#aw_dept",
        data.managementValue.departmentId,
        "Dept " + data.managementValue.departmentId
      );

      // // Simple inputs
      $("#aw_audit_id").val(data.id);
      $("#aw_title").val(data.managementValue.title);
      $("#aw_category").val(data.managementValue.category).trigger("change");
      // $("#department").val(data.managementValue.departmentId);
      $("#aw_period").val(data.managementValue.auditPeriod).trigger("change");
      // $("input[name='status'][value='" + data.managementValue.priority + "']").prop('checked', true);
      $("#am_audit_start_date").val(data.managementValue.startEndDate);

      $("#aw_auditor_type").val(data.managementValue.auditor).trigger("change");

      $("#aw_next_review").val(data.managementValue.nextDate);
      $("#aw_findings").val(data.managementValue.noOfFindings);
      $("#aw_issues").val(data.managementValue.noOfIssue);
     
      $("#aw_status").val(data.managementValue.status).trigger("change");
      $(
        "input[name='status'][value='" + data.managementValue.rating + "']"
      ).prop("checked", true);

            recommendationDataArray = data.managementValue.recommendation || [];
            findingsIssuesDataArray = data.managementValue.findingsIssuesData || [];
           
            actionPopSuccessCallback(data, id, type);
          },
          error: readErrorMsg,
        });
      }


function actionPopSuccessCallback(planList, typerequest) {
  console.log(planList, "planList");
  $("#actionBodyData").empty();

  var actions = planList.managementValue.actions || [];

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
  console.log(multipleOwners, byDate, status, "multipleOwners");
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

  // // By Date (prefilled if value exists)
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
  var title = $("#aw_title").val();
  var category = $("#aw_category").val();
  var auditPeriod = $("#aw_period").val();
  var dept = $("#aw_dept").val();
  var startEndDate = $("#am_audit_start_date").val();
  var auditor = $("#aw_auditor_type").val();
  var updatedBy = $("#aw_updated_by").val();
  var nextDate = $("#aw_next_review").val();
  var noOfFindings = $("#aw_findings").val();
  var noOfIssue = $("#aw_issues").val();
  var riskRating = $("input[name='status']:checked").val();
  var pagenumber = $("#pagenumber").val();


  var formattedEndDate = "";
        var formattedStartDate = "";

        var parts = startEndDate.split(" to ");
        if (parts.length == 2) {
          var startDateStr = parts[0];
          var endDateStr = parts[1];

          // Parse start date
          var startParts = startDateStr.split(" ");
          var startMonthName = startParts[0]; // "Sep"
          var startDay = startParts[1].replace(",", "").padStart(2, '0');
          var startYear = startParts[2]; // "2025"

          // Parse end date
          var endParts = endDateStr.split(" ");
          var endMonthName = endParts[0]; // "Sep"
          var endDay = endParts[1].replace(",", "").padStart(2, '0'); // "23"
          var endYear = endParts[2]; // "2025"

          // Map month names to numbers (2-digit)
          var monthMap = {
            "Jan": "01",
            "Feb": "02",
            "Mar": "03",
            "Apr": "04",
            "May": "05",
            "Jun": "06",
            "Jul": "07",
            "Aug": "08",
            "Sep": "09",
            "Oct": "10",
            "Nov": "11",
            "Dec": "12"
          };

          var startMonth = monthMap[startMonthName];
          var endMonth = monthMap[endMonthName];


        //   formattedStartDate = startMonth + "/" + startDay + "/" + startYear;
        //   formattedEndDate = endMonth + "/" + endDay + "/" + endYear;
     
         formattedStartDate = startYear + "-" + startMonth + "-" + startDay;
          formattedEndDate = endYear + "-" + endMonth + "-" + endDay;
     


          console.log("Start Date:", formattedStartDate);
          console.log("End Date:", formattedEndDate);
        }


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
    id: $("#aw_audit_id").val() || "",
    aw_updated_by: updatedBy,
    pageId: pageNo || "",
    departmentId: dept,
    startDate: formattedStartDate,
    endDate : formattedEndDate,
    managementValue: {
      title: title,
      category: category,
      updatedBy: updatedBy,
      startEndDate: startEndDate,
      auditPeriod : auditPeriod, 
      departmentId: dept,
      status: $("#aw_status").val(),
      rating: $("input[name='status']:checked").val() || "",
      auditor: auditor,
      nextDate: nextDate,
      noOfFindings: noOfFindings,
      noOfIssue: noOfIssue,
      recommendation: recommendationDataArray || [],   
      actions: actionList || [],
      attachment: [],
      findingsIssuesData: findingsIssuesDataArray || []
    },
  };



  console.log(payload, "ActionSavepayload");

  $.ajax({
    url: "/stratroom/auditManagement",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(payload),
    success: function (data, status) {
      $.notify("Project Planning saved successfully", { style: 'success', className: 'graynotify' });
      $("#aw_title").val('');
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


$(document).on("click", "[data-bs-target='#audit-add-modal']", function () {
    resetAuditModal();
});


function resetAuditModal() {
    // Title
    $("#aw_title").val("");

    // Audit ID
    $("#aw_audit_id").val("");

    // Audit Category
    $("#aw_category").val("");

    // Audit Period
    $("#aw_period").val("");

    // Department
    $("#aw_dept").val("");

    // Auditor(s)
    $("#aw_auditor_type").val("");

    // Updated By (Owner)
    $("#aw_updated_by").val("");

    // Start/End Date
    $("#am_audit_start_date").val("");

    // Next Review Date
    $("#aw_next_review").val("");

    // Status dropdown
    $("#aw_status").val("");

    // Findings and Issues
    $("#aw_findings").val("");
    $("#aw_issues").val("");

    // Risk Rating (radio buttons)
    $("input[name='status']").prop("checked", false);

    // Reset selected classes etc. if using a custom plugin
    $(".modal-custom-select").trigger("change");

    // Reset header title and button text (if needed)
    $(".headerText").text("Create Audit");
    $(".buttonText").text("Save");
}

//files


 

getRiskPageList();
getEmployeeListDate();
// getDepartmentListDate();
moduleAccessUserListData();





//Progress Bar editable
  document.addEventListener('DOMContentLoaded', function () {
      document.querySelectorAll('.progress-editable').forEach(function (el) {
        // Update on input
        el.addEventListener('input', function () {
          let val = this.innerText.replace('%', '').trim();
          let num = parseInt(val);
          if (!isNaN(num)) {
            let updated = false;
            if (num < 0) { num = 0; updated = true; }
            if (num > 100) { num = 100; updated = true; }
            
            if (updated) {
              this.innerText = num + '%';
              let range = document.createRange();
              let sel = window.getSelection();
              range.selectNodeContents(this);
              range.collapse(false);
              sel.removeAllRanges();
              sel.addRange(range);
            }
            
            let progressBar = this.closest('.mt-2').querySelector('.progress-bar');
            if (progressBar) {
              progressBar.style.width = num + '%';
            }
          }
        });

        // Format on blur
        el.addEventListener('blur', function () {
          let val = this.innerText.replace('%', '').trim();
          let num = parseInt(val);
          if (isNaN(num)) num = 0;
          if (num < 0) num = 0;
          if (num > 100) num = 100;
          this.innerText = num + '%';
          let progressBar = this.closest('.mt-2').querySelector('.progress-bar');
          if (progressBar) {
            progressBar.style.width = num + '%';
          }
        });

        // Prevent enter key from creating new lines
        el.addEventListener('keydown', function (e) {
          if (e.key == 'Enter') {
            e.preventDefault();
            this.blur();
          }
        });
      });
    });


    /* ─── Audit Wizard — Multi-step Logic ─── */
    (function () {
      let awCurrentStep = 1;
      const AW_TOTAL = 5;
      const awInitializedPanels = new Set();

      // Chip toggle
      document.addEventListener('click', function (e) {
        const chip = e.target.closest('.audit-check-chip');
        if (!chip) return;
        const inp = chip.querySelector('input');
        if (!inp) return;
        if (inp.type == 'radio') {
          const parentGroup = chip.closest('.audit-check-group');
          if (parentGroup) {
            parentGroup.querySelectorAll('.audit-check-chip').forEach(c => c.classList.remove('selected'));
          }
          inp.checked = true;
          chip.classList.add('selected');
        } else {
          // checkbox — toggle happens naturally, sync class
          setTimeout(() => chip.classList.toggle('selected', inp.checked), 0);
        }
      });

      // Initialize Select2 for visible selects in the active panel
      function initAWSelect2(panelNum) {
        if (awInitializedPanels.has(panelNum)) return;
        const panel = document.querySelector('.audit-step-panel[data-panel="' + panelNum + '"]');
        if (!panel) return;
        $(panel).find('.modal-custom-select').each(function () {
          if ($(this).data('select2')) return; // already initialized
          $(this).select2({
            width: '100%',
            dropdownParent: $(this).closest('.modal')
          });
        });
        awInitializedPanels.add(panelNum);
      }

      function renderAWStep() {
        document.querySelectorAll('.audit-step-panel').forEach(p => {
          p.classList.toggle('active', +p.dataset.panel == awCurrentStep);
        });
        document.querySelectorAll('#auditStepper .audit-step').forEach(s => {
          const n = +s.dataset.step;
          s.classList.toggle('active', n == awCurrentStep);
          s.classList.toggle('done', n < awCurrentStep);
          s.querySelector('.audit-step-circle').innerHTML =
            n < awCurrentStep ? '<i class="fas fa-check"></i>' : n;
        });
        document.getElementById('awPrevBtn').style.display = awCurrentStep > 1 ? '' : 'none';
        document.getElementById('awNextBtn').style.display = awCurrentStep < AW_TOTAL ? '' : 'none';
        document.getElementById('awSaveBtn').style.display = awCurrentStep == AW_TOTAL ? '' : 'none';
        if (awCurrentStep == AW_TOTAL) fillAWReview();
        // Init Select2 after panel is visible
        setTimeout(function () { initAWSelect2(awCurrentStep); }, 0);
      }

      window.auditWizardStep = function (dir) {
        const next = awCurrentStep + dir;
        if (next < 1 || next > AW_TOTAL) return;
        awCurrentStep = next;
        renderAWStep();
      };

      window.auditWizardSave = function () {
        if (!document.getElementById('awConfirmCheck').checked) {
          alert('Please confirm the details before saving.');
          return;
        }
        alert('Audit saved successfully! (demo)');
        const modal = bootstrap.Modal.getInstance(document.getElementById('audit-add-modal'));
        if (modal) modal.hide();
      };

      function fillAWReview() {
        const fields = [
          ['Audit ID', gv('aw_audit_id')],
          ['Title', gv('aw_title')],
          ['Category', gv('aw_category')],
          ['Type', gv('aw_type')],
          ['Department', gv('aw_dept')],
          ['Period', gv('aw_period')],
          ['Start Date', gv('aw_start_date')],
          ['End Date', gv('aw_end_date')],
          ['Lead Auditor', gv('aw_updated_by')],
          ['Auditor Type', gv('aw_auditor_type')],
          ['Status', gv('aw_status')],
          ['Risk Rating', (document.querySelector('input[name=aw_risk]:checked') || {}).value || '—'],
          ['Framework', gv('aw_framework') || 'None'],
        ];
        document.getElementById('awReviewSummary').innerHTML = fields.map(([l, v]) =>
          `<div class="col-md-6 col-lg-4"><div class="review-item"><div class="review-label">${l}</div><div class="review-value">${v || '—'}</div></div></div>`
        ).join('');
      }

      function gv(id) {
        const el = document.getElementById(id);
        if (!el) return '';
        // For Select2, read the selected option text if no value
        if ($(el).data('select2')) {
          return $(el).find(':selected').text() || '';
        }
        return el.value;
      }

      // Reset to step 1 when modal opens & init Select2 for step 1
      const auditModal = document.getElementById('audit-add-modal');
      if (auditModal) {
        auditModal.addEventListener('shown.bs.modal', function () {
          awCurrentStep = 1;
          awInitializedPanels.clear();
          renderAWStep();
        });
      }
    })();


    // Add and remove aw_findings and issues 
        document.addEventListener('DOMContentLoaded', function () {
      const container = document.getElementById('findingsContainer');
      const addBtn = document.getElementById('btnAddFinding');
      if (!container || !addBtn) return;

      // Keep only one finding block as template if you want, but user currently has 3.
      // Let's implement add/remove functionality.

      function updateFindingNumbers() {
        const blocks = container.querySelectorAll('.finding-block');
        blocks.forEach((block, index) => {
          const title = block.querySelector('h6.text-primary');
          if (title) {
            title.textContent = 'Finding #' + (index + 1);
          }
        });

        // Disable remove if only one left
        const removeBtns = container.querySelectorAll('.btn-remove-finding');
        removeBtns.forEach(btn => {
          if (blocks.length == 1) {
            btn.style.display = 'none';
          } else {
            btn.style.display = 'block';
          }
        });
      }

      // Add finding
      addBtn.addEventListener('click', function () {
        const blocks = container.querySelectorAll('.finding-block');
        if (blocks.length == 0) return;

        const template = blocks[0].cloneNode(true);

        // Clean up Select2 artifacts from the cloned node
        template.querySelectorAll('.select2-container').forEach(el => el.remove());
        template.querySelectorAll('select').forEach(el => {
          el.classList.remove('select2-hidden-accessible');
          el.removeAttribute('data-select2-id');
          el.removeAttribute('tabindex');
          el.removeAttribute('aria-hidden');
          el.querySelectorAll('option').forEach(opt => opt.removeAttribute('data-select2-id'));
          el.selectedIndex = 0;
        });

        // Reset inputs
        template.querySelectorAll('input, textarea').forEach(el => el.value = '');

        container.appendChild(template);
        updateFindingNumbers();

        // Re-initialize lucide icons if the library is loaded
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
          lucide.createIcons();
        }

        // Re-initialize select2 for new block
        if (typeof jQuery !== 'undefined') {
          jQuery(template).find('.modal-custom-select').select2({
            width: "100%",
            dropdownParent: jQuery(template).closest('.modal')
          });

          // Flatpickr reinit
          jQuery(template).find('.date-picker').each(function () {
            if (this._flatpickr) this._flatpickr.destroy();
            flatpickr(this, {
              dateFormat: "M j, Y",
              allowInput: true
            });
          });
        }
      });

      // Remove finding using event delegation
      container.addEventListener('click', function (e) {
        const removeBtn = e.target.closest('.btn-remove-finding');
        if (!removeBtn) return;

        const blocks = container.querySelectorAll('.finding-block');
        if (blocks.length > 1) {
          removeBtn.closest('.finding-block').remove();
          updateFindingNumbers();
        }
      });

      // Initialize state
      updateFindingNumbers();

      // --- Issue Logic ---
      const issueContainer = document.getElementById('issuesContainer');
      const addIssueBtn = document.getElementById('btnAddIssue');
      if (issueContainer && addIssueBtn) {

        function updateIssueNumbers() {
          const blocks = issueContainer.querySelectorAll('.issue-block');
          blocks.forEach((block, index) => {
            const title = block.querySelector('h6.text-primary');
            if (title) {
              title.textContent = 'Issue #' + (index + 1);
            }
          });

          const removeBtns = issueContainer.querySelectorAll('.btn-remove-issue');
          removeBtns.forEach(btn => {
            if (blocks.length == 1) {
              btn.style.display = 'none';
            } else {
              btn.style.display = 'flex';
            }
          });
        }

        addIssueBtn.addEventListener('click', function () {
          const blocks = issueContainer.querySelectorAll('.issue-block');
          if (blocks.length == 0) return;

          const template = blocks[0].cloneNode(true);

          template.querySelectorAll('.select2-container').forEach(el => el.remove());
          template.querySelectorAll('select').forEach(el => {
            el.classList.remove('select2-hidden-accessible');
            el.removeAttribute('data-select2-id');
            el.removeAttribute('tabindex');
            el.removeAttribute('aria-hidden');
            el.querySelectorAll('option').forEach(opt => opt.removeAttribute('data-select2-id'));
            el.selectedIndex = 0;
          });

          template.querySelectorAll('input, textarea').forEach(el => el.value = '');

          issueContainer.appendChild(template);
          updateIssueNumbers();

          if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
          }

          if (typeof jQuery !== 'undefined') {
            jQuery(template).find('.modal-custom-select').select2({
              width: "100%",
              dropdownParent: jQuery(template).closest('.modal')
            });

            jQuery(template).find('.date-picker').each(function () {
              if (this._flatpickr) this._flatpickr.destroy();
              flatpickr(this, {
                dateFormat: "M j, Y",
                allowInput: true
              });
            });
          }
        });

        issueContainer.addEventListener('click', function (e) {
          const removeBtn = e.target.closest('.btn-remove-issue');
          if (!removeBtn) return;

          const blocks = issueContainer.querySelectorAll('.issue-block');
          if (blocks.length > 1) {
            removeBtn.closest('.issue-block').remove();
            updateIssueNumbers();
          }
        });

        updateIssueNumbers();
      }

    });


    // function saveFindingsIssuesData() {

    // const findingsType = $("#findings_type").val();

    // const issuesType = $("#issues_type").val();


    // let findingsArray = [];

    // $("#findingsContainer .finding-block").each(function () {

    //     let findingObj = {

    //         findingsType: findingsType,

    //         title: $(this).find(".finding-title").val(),

    //         description: $(this).find(".finding-description").val(),

    //         severity: $(this).find(".finding-severity").val(),

    //         rootCauseCategory: $(this).find(".root-cause-category").val(),

    //         rootCauseDetail: $(this).find(".root-cause-detail").val(),

    //         owner: $(this).find(".finding-owner").val(),

    //         targetDate: $(this).find(".finding-target-date").val(),

    //         status: $(this).find(".finding-status").val(),

    //         recommendation: $(this).find(".finding-recommendation").val(),

    //         managementResponse: $(this).find(".finding-management-response").val()

    //     };

    //     findingsArray.push(findingObj);

    // });


    // let issuesArray = [];

    // $("#issuesContainer .issue-block").each(function () {

    //     let issueObj = {

    //         issuesType: issuesType,

    //         title: $(this).find(".issue-title").val(),

    //         description: $(this).find(".issue-description").val(),

    //         severity: $(this).find(".issue-severity").val(),

    //         rootCauseCategory: $(this).find(".issue-root-cause").val(),

    //         rootCauseDetail: $(this).find(".issue-root-cause-detail").val(),

    //         owner: $(this).find(".issue-owner").val(),

    //         targetDate: $(this).find(".issue-target-date").val(),

    //         status: $(this).find(".issue-status").val(),

    //         recommendation: $(this).find(".issue-recommendation").val(),

    //         managementResponse: $(this).find(".issue-management-response").val()

    //     };

    //     issuesArray.push(issueObj);

    // });


    // console.log(findingsArray, "findingsArray");

    // console.log(issuesArray, "issuesArray");


    // const existingFindings =
    //     findingsgGetDataArray?.managementValue?.findingsIssuesData?.findings || [];

    // const existingIssues =
    //     findingsgGetDataArray?.managementValue?.findingsIssuesData?.issues || [];


    // const findingsIssuesData = {

    //     findingsType: findingsType,

    //     issuesType: issuesType,

    //     findings: [
    //         ...existingFindings,
    //         ...findingsArray
    //     ],

    //     issues: [
    //         ...existingIssues,
    //         ...issuesArray
    //     ]

    // };


    // console.log(
    //     findingsIssuesData,
    //     findingsgGetDataArray,
    //     "findingsIssuesData"
    // );


    // findingsgGetDataArray.managementValue.findingsIssuesData =
    //     findingsIssuesData;


    // console.log(
    //     findingsgGetDataArray,
    //     "findingsgGetDataArray"
    // );


    // $.ajax({
    //     url: "/stratroom/auditManagement",
    //     type: "POST",
    //     contentType: "application/json",
    //     data: JSON.stringify(findingsgGetDataArray),
    //     success: function (data, status) {

    //         window.location.reload();

    //     },
    //     error: function (xhr, status, error) {

    //         $.notify(
    //             "Error saving Project Planning",
    //             {
    //                 style: "success",
    //                 className: "graynotify"
    //             }
    //         );

    //     }
    // });

    // };


    // function saveFindingsIssuesData(){
    //   let findingsArray = [];

    //   $("#findingsContainer .finding-block").each(function () {

    //       let findingObj = {

    //           title: $(this).find(".finding-title").val(),

    //           description: $(this).find(".finding-description").val(),

    //           severity: $(this).find(".finding-severity").val(),

    //           rootCauseCategory: $(this).find(".root-cause-category").val(),

    //           rootCauseDetail: $(this).find(".root-cause-detail").val(),

    //           owner: $(this).find(".finding-owner").val(),

    //           targetDate: $(this).find(".finding-target-date").val(),

    //           status: $(this).find(".finding-status").val(),

    //           recommendation: $(this).find(".finding-recommendation").val(),

    //           managementResponse: $(this).find(".finding-management-response").val()

    //       };

    //       findingsArray.push(findingObj);

    //   });


    //   let issuesArray = [];
    //   $("#issuesContainer .issue-block").each(function () {

    //       let issueObj = {

    //           title: $(this).find(".issue-title").val(),

    //           description: $(this).find(".issue-description").val(),

    //           severity: $(this).find(".issue-severity").val(),

    //           rootCauseCategory: $(this).find(".issue-root-cause").val(),

    //           rootCauseDetail: $(this).find(".issue-root-cause-detail").val(),

    //           owner: $(this).find(".issue-owner").val(),

    //           targetDate: $(this).find(".issue-target-date").val(),

    //           status: $(this).find(".issue-status").val(),

    //           recommendation: $(this).find(".issue-recommendation").val(),

    //           managementResponse: $(this).find(".issue-management-response").val()

    //       };

    //       issuesArray.push(issueObj);

    //   });

    //   console.log(findingsArray, "findingsArray");
    //   console.log(issuesArray, "issuesArray");

    //   const findingsIssuesData = {
    //       findingsType : $("#findings_type").val(),
    //       issuesType : $("#issues_type").val(),
    //       findings: findingsArray,
    //       issues: issuesArray,

    //   }

    //   console.log(findingsIssuesData,findingsgGetDataArray,  "findingsIssuesData");

    //   findingsgGetDataArray.managementValue.findingsIssuesData = findingsIssuesData;

    //   console.log(findingsgGetDataArray, "findingsgGetDataArray");




    //   // $.ajax({
    //   //   url: "/stratroom/auditManagement",
    //   //   type: "POST",
    //   //   contentType: "application/json",
    //   //   data: JSON.stringify(findingsgGetDataArray),
    //   //   success: function (data, status) {
    //   //     // $.notify("Project Planning saved successfully", { style: 'success', className: 'graynotify' });
    //   //     // $("#aw_title").val('');
    //   //     // $("#Project_Description").val('');
    //   //     // $("#Project_Department").val('');
    //   //     // $("#Project_owner").val('');
    //   //     // $("#Project_team").val('');
    //   //     // $("#Project_start_date").val('');
    //   //     // $("#Project_end_date").val('');

    //   //     window.location.reload();
    //   //   },
    //   //   error: function (xhr, status, error) {
    //   //     $.notify("Error saving Project Planning", { style: 'success', className: 'graynotify' });
    //   //   }
    //   // });
    // };


    function saveFindingsIssuesData() {

    const findingsType = $("#findings_type").val();
    const issuesType = $("#issues_type").val();

    let findingsArray = [];

    $("#findingsContainer .finding-block").each(function () {

        let title = $(this).find(".finding-title").val()?.trim();

        // Only push when both findingsType and title exist
        if (findingsType && title) {

            let findingObj = {

                findingsType: findingsType,

                title: title,

                description: $(this).find(".finding-description").val(),

                severity: $(this).find(".finding-severity").val(),

                rootCauseCategory: $(this).find(".root-cause-category").val(),

                rootCauseDetail: $(this).find(".root-cause-detail").val(),

                owner: $(this).find(".finding-owner").val(),

                targetDate: $(this).find(".finding-target-date").val(),

                status: $(this).find(".finding-status").val(),

                recommendation: $(this).find(".finding-recommendation").val(),

                managementResponse: $(this).find(".finding-management-response").val()

            };

            findingsArray.push(findingObj);
        }

    });


    let issuesArray = [];

    $("#issuesContainer .issue-block").each(function () {

        let title = $(this).find(".issue-title").val()?.trim();

        // Only push when both issuesType and title exist
        if (issuesType && title) {

            let issueObj = {

                issuesType: issuesType,

                title: title,

                description: $(this).find(".issue-description").val(),

                severity: $(this).find(".issue-severity").val(),

                rootCauseCategory: $(this).find(".issue-root-cause").val(),

                rootCauseDetail: $(this).find(".issue-root-cause-detail").val(),

                owner: $(this).find(".issue-owner").val(),

                targetDate: $(this).find(".issue-target-date").val(),

                status: $(this).find(".issue-status").val(),

                recommendation: $(this).find(".issue-recommendation").val(),

                managementResponse: $(this).find(".issue-management-response").val()

            };

            issuesArray.push(issueObj);
        }

    });


    console.log(findingsArray, "findingsArray");
    console.log(issuesArray, "issuesArray");


    const existingFindings =
        findingsgGetDataArray?.managementValue?.findingsIssuesData?.findings || [];

    const existingIssues =
        findingsgGetDataArray?.managementValue?.findingsIssuesData?.issues || [];


    const findingsIssuesData = {

        findingsType: findingsType,

        issuesType: issuesType,

        findings: findingsArray.length > 0
            ? [...existingFindings, ...findingsArray]
            : [],

        issues: issuesArray.length > 0
            ? [...existingIssues, ...issuesArray]
            : []

    };


    console.log(
        findingsIssuesData,
        findingsgGetDataArray,
        "findingsIssuesData"
    );


    findingsgGetDataArray.managementValue.findingsIssuesData =
        findingsIssuesData;


    console.log(
        findingsgGetDataArray,
        "findingsgGetDataArray"
    );


    $.ajax({
        url: "/stratroom/auditManagement",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(findingsgGetDataArray),

        success: function (data, status) {

            window.location.reload();

        },

        error: function (xhr, status, error) {

            $.notify(
                "Error saving Project Planning",
                {
                    style: "success",
                    className: "graynotify"
                }
            );

        }
    });

};
    function viewFindingsDetails(id) {
      console.log(id, "finding id");

      const findData = auditManagementList.find(item => item.id == id);

      console.log(findData, "findData");

      const findings =
        findData?.managementValue?.findingsIssuesData?.findings || [];

      let rows = "";

      findings.forEach((item, index) => {

        rows += '<tr>';

        rows += '<td>' + (index + 1) + '</td>';

        rows += '<td>' +
          (findData.managementValue.title || "-") +
          '</td>';

        rows += '<td>' +
          (findData.managementValue.findingsIssuesData.findingsType || "-") +
          '</td>';

        rows += '<td>' + (item.title || "-") + '</td>';

        rows += '<td>' + (item.description || "-") + '</td>';

        rows += '<td>' +
          '<span class="badge bg-danger">' +
          (item.severity || "-") +
          '</span>' +
          '</td>';

        rows += '<td>' +
          (item.rootCauseCategory || "-") +
          '</td>';

        rows += '<td>' +
          (item.rootCauseDetail || "-") +
          '</td>';

        rows += '<td>' +
          (item.owner || "-") +
          '</td>';

        rows += '<td>' +
          (item.targetDate || "-") +
          '</td>';

        rows += '<td>' +
          (item.status || "-") +
          '</td>';

        rows += '<td>' +
          (item.recommendation || "-") +
          '</td>';

        rows += '<td>' +
          (item.managementResponse || "-") +
          '</td>';

        rows += '</tr>';
      });

      if (findings.length === 0) {

        rows += '<tr>';

        rows +=
          '<td colspan="13" class="text-center">' +
          'No Findings Available' +
          '</td>';

        rows += '</tr>';
      }

      document.getElementById("findings-details-tbody").innerHTML = rows;

      const findingsModal = new bootstrap.Modal(
        document.getElementById("findings-details-modal")
      );

      findingsModal.show();
    }

  function viewIssuesDetails(id) {

  console.log(id, "issue id");

  const issueData = auditManagementList.find(item => item.id == id);

  console.log(issueData, "issueData");

  const issues =
    issueData?.managementValue?.findingsIssuesData?.issues || [];

  let rows = "";

  issues.forEach((item, index) => {

    rows += '<tr>';

    rows += '<td>' + (index + 1) + '</td>';

    rows += '<td>' +
      (issueData.managementValue.title || "-") +
      '</td>';

    rows += '<td>' +
      (issueData.managementValue.findingsIssuesData.issuesType || "-") +
      '</td>';

    rows += '<td>' +
      (item.title || "-") +
      '</td>';

    rows += '<td>' +
      (item.description || "-") +
      '</td>';

    rows += '<td>' +
      '<span class="badge bg-warning">' +
      (item.severity || "-") +
      '</span>' +
      '</td>';

    rows += '<td>' +
      (item.rootCauseCategory || "-") +
      '</td>';

    rows += '<td>' +
      (item.rootCauseDetail || "-") +
      '</td>';

    rows += '<td>' +
      (item.owner || "-") +
      '</td>';

    rows += '<td>' +
      (item.targetDate || "-") +
      '</td>';

    rows += '<td>' +
      (item.status || "-") +
      '</td>';

    rows += '<td>' +
      (item.recommendation || "-") +
      '</td>';

    rows += '<td>' +
      (item.managementResponse || "-") +
      '</td>';

    rows += '</tr>';

  });

  if (issues.length === 0) {

    rows += '<tr>';

    rows +=
      '<td colspan="13" class="text-center">' +
      'No Issues Available' +
      '</td>';

    rows += '</tr>';
  }

  document.getElementById("issues-details-tbody").innerHTML = rows;

  const issuesModal = new bootstrap.Modal(
    document.getElementById('issues-details-modal')
  );

  issuesModal.show();
}


//File Attchments



// Pdf generation 
let data = []; // Global variable to store the loaded data

// Function to load JSON data and generate PDF
function loadDataAndGeneratePDF() {
  data = auditManagementList; 
  generatePDF();  
  
}

function fmtDateTime(dStr) {
    if (!dStr) return '-';
    const d = new Date(dStr);
    if (isNaN(d.getTime())) return dStr;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = String(d.getDate()).padStart(2, '0');
    let hrs = d.getHours();
    const ampm = hrs >= 12 ? 'PM' : 'AM';
    hrs = hrs % 12 || 12;
    const mins = String(d.getMinutes()).padStart(2, '0');
    return `${months[d.getMonth()]} ${day} ${d.getFullYear()} ${hrs}:${mins} ${ampm}`;
}

function fmtDate(dStr) {
    if (!dStr) return '-';
    const d = new Date(dStr);
    if (isNaN(d.getTime())) return dStr;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = String(d.getDate()).padStart(2, '0');
    return `${months[d.getMonth()]} ${day} ${d.getFullYear()}`;
}

function getBase64Image(url) {
    return new Promise((resolve) => {
        let img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function () {
            let canvas = document.createElement("canvas");
            canvas.width = this.width;
            canvas.height = this.height;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(this, 0, 0);
            resolve(canvas.toDataURL("image/png"));
        };
        img.onerror = function () {
            resolve(null);
        }
        img.src = url;
    });
}

// ==========================================
// CONFIGURATION
// ==========================================

let LOGO_URL = document.getElementById("appLogo")?.src || "/stratroom/images/logo.png";
let COVER_URL = "/stratroom/images/initiative-bg.jpg";
// let ICONS_PATH = "assets/images/icons/";

const riskImageUrls = {
    green: "/stratroom/images/buzzer-green-i.svg",
    yellow: "/stratroom/images/buzzer-yellow-i.svg",
    red: "/stratroom/images/buzzer-red-i.svg",
};
const flagImageUrls = {
    green: "/stratroom/images/flag-green-i.svg",
    yellow: "/stratroom/images/flag-yellow-i.svg",
    red: "/stratroom/images/flag-red-i.svg"
};
const trendImageUrls = {
    up: "/stratroom/images/up-i.png",
    down: "/stratroom/images/down-i.png"
};

const riskImages = {};
const flagImages = {};
const trendImages = {};

async function preloadImages() {
    await Promise.all(
        Object.entries(riskImageUrls).map(async ([key, url]) => {
            riskImages[key] = await getBase64Image(url);
        })
    );
    await Promise.all(
        Object.entries(flagImageUrls).map(async ([key, url]) => {
            flagImages[key] = await getBase64Image(url);
        })
    );
    await Promise.all(
        Object.entries(trendImageUrls).map(async ([key, url]) => {
            trendImages[key] = await getBase64Image(url);
        })
    );
}

const { jsPDF } = window.jspdf;

async function generatePDF() {

    await preloadImages();

    let pdf = new jsPDF();

    let pageWidth = pdf.internal.pageSize.width;
    let pageHeight = pdf.internal.pageSize.height;

    var submissionDate = new Date().toLocaleDateString();

    const logoUrl = LOGO_URL;
    const coverImage = COVER_URL;

    const marginLeft = 10;
    const marginRight = pageWidth - marginLeft;

    const BRAND_COLOR = [120, 45, 90];

  function addCoverPage(section) {
        const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
        const textStartY = imgY + 5;
        let cfh = 20;
        let cfhs = 10;
        let bgColor = BRAND_COLOR;
        let periodText =  `Period: $("#datePeriod").val()` ? `Period: ${$("#datePeriod").val()}` : "";
        let titleText = section?.pageTitle ? section.pageTitle : "AUDIT MANAGEMENT";
        pdf.addImage(coverImage, 'JPEG', 0, 0, pageWidth, pageHeight);
        

       

        pdf.addImage(logoUrl, "PNG", marginRight - imgWidth, imgY, imgWidth, imgHeight, { align: "right" });

        pdf.setTextColor(171, 80, 103);
        pdf.setFontSize(32);
        pdf.setFont("helvetica", "bold");

        pdf.text(titleText.toUpperCase(), pageWidth / 2, 57, { align: "center" });
        pdf.text("Report".toUpperCase(), pageWidth / 2, 70, { align: "center" });

        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text(periodText, pageWidth / 2, 85, { align: "center" });

        pdf.setFillColor(...bgColor);
        pdf.rect(0, pageHeight - cfhs, pageWidth, cfhs, 'F');
        // Draw angled shape
        pdf.setFillColor(...bgColor);
        pdf.lines([[pageWidth / 2, 0], [20, cfh], [-90, 0]], -20, pageHeight - cfh, [1, 1], 'F');

        const shapeWidth = 20;
        const shapeHeight = pageHeight / 2;

        pdf.setFillColor(...bgColor);
        pdf.lines(
            [
                [15, 0],
                [0, pageHeight / 3],
                [-15, 15],
                [0, - (pageHeight / 2 - 15)]
            ],
            0,
            0,
            [1, 1],
            'F'
        );

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.text(`Generated Date:  ${submissionDate} `, 10, pageHeight - 12);
       
       
        pdf.text(periodText, 10, pageHeight - 6);

        pdf.addPage();
    };

function header(section) {
        let name = data[0]?.managementValue?.createdByName ? data[0]?.managementValue?.createdByName : "";
        let period = $("#datePeriod").val() ? `${$("#datePeriod").val()}` : "";

        const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
        const textStartY = imgY + 5;
        let title = section?.title ? `Audit: ${section.id}` : "Audit Details";
        // let name = reportData?.userName ? `${reportData.userName}` : "";
        // let period = reportData?.period ? `${reportData.period}` : "";

        pdf.addImage(logoUrl, "PNG", imgX, imgY, imgWidth, imgHeight);
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(13);
        pdf.setFont("helvetica", "bold");
        pdf.text(title, marginRight, textStartY - 3, { align: "right" });
        pdf.setTextColor(0, 0, 0);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.text(`Generated Date: ${submissionDate}`, marginRight, textStartY + 1, { align: "right" });
        if (name) pdf.text(`Name: ${name}`, marginRight, textStartY + 6, { align: "right" });
        if (period) pdf.text(`Period: ${period}`, marginRight, textStartY + 10, { align: "right" });
        pdf.line(10, imgHeight + 12, pageWidth - 10, imgHeight + 12);
        return imgHeight + 20;
    }

    function footer(pageNumber, totalPages) {

        pdf.setFillColor(...BRAND_COLOR);

        pdf.rect(
            0,
            pageHeight - 10,
            pageWidth,
            10,
            'F'
        );

        pdf.setTextColor(255, 255, 255);

        pdf.setFontSize(10);

        pdf.setFont("helvetica", "bold");

        pdf.text(
            "Audit Management Report",
            10,
            pageHeight - 4
        );

        pdf.text(
            `Page ${pageNumber} of ${totalPages}`,
            marginRight,
            pageHeight - 4,
            { align: "right" }
        );
    }

    // ==========================================
    // API DATA
    // ==========================================

    let auditsList = Array.isArray(auditManagementList)
        ? auditManagementList
        : [];

    // ==========================================
    // COVER PAGE
    // ==========================================

    addCoverPage();

    let reportStartPage =
        pdf.internal.getNumberOfPages() + 1;

    // ==========================================
    // KPI PAGE
    // ==========================================

    header("Audit Summary Dashboard");

    let totalAudits = auditsList.length;

    let inProgress = auditsList.filter(
        i => i?.managementValue?.status == 'In Progress'
    ).length;

    let closed = auditsList.filter(
        i => i?.managementValue?.status == 'Completed'
    ).length;

    let onHold = auditsList.filter(
        i => i?.managementValue?.status == 'Under Review'
    ).length;

    let kpiData = [
        {
            label: "TOTAL AUDITS",
            value: totalAudits,
            sub: "all registered audits",
            valColor: [0, 0, 0]
        },
        {
            label: "IN PROGRESS",
            value: inProgress,
            sub: "currently active",
            valColor: [41, 128, 185]
        },
        {
            label: "PLANNED",
            value: closed,
            sub: "completed audits",
            valColor: [39, 174, 96]
        },
        {
            label: "UNDER REVIEW",
            value: onHold,
            sub: "temporarily paused",
            valColor: [231, 76, 60]
        }
    ];

    let cardW = 80;
    let cardH = 30;
    let gap = 5;

    let startX =
        (pageWidth - ((cardW * 2) + gap)) / 2;

    let startY = 90;

    pdf.setFontSize(16);

    pdf.setFont("helvetica", "bold");

    pdf.setTextColor(...BRAND_COLOR);

    pdf.text(
        "AUDIT SYSTEM SUMMARY",
        pageWidth / 2,
        70,
        { align: "center" }
    );

    for (let k = 0; k < 4; k++) {

        let row = Math.floor(k / 2);

        let col = k % 2;

        let x = startX + col * (cardW + gap);

        let y = startY + row * (cardH + gap);

        pdf.setDrawColor(220, 220, 220);

        pdf.setFillColor(255, 255, 255);

        pdf.roundedRect(
            x,
            y,
            cardW,
            cardH,
            3,
            3,
            'FD'
        );

        pdf.setTextColor(100, 100, 100);

        pdf.setFontSize(9);

        pdf.setFont("helvetica", "bold");

        pdf.text(
            kpiData[k].label,
            x + 5,
            y + 8
        );

        pdf.setTextColor(...kpiData[k].valColor);

        pdf.setFontSize(18);

        pdf.text(
            kpiData[k].value.toString(),
            x + 5,
            y + 18
        );

        pdf.setTextColor(150, 150, 150);

        pdf.setFontSize(8);

        pdf.text(
            kpiData[k].sub,
            x + 5,
            y + 25
        );
    }

    // ==========================================
    // AUDITS LOOP
    // ==========================================

    for (let i = 0; i < auditsList.length; i++) {

        let auditItem = auditsList[i];

        let mv = auditItem.managementValue || {};

        pdf.addPage();

        let currentY = header(
            `Audit: AUD-${auditItem.id}`
        );

        // ==========================================
        // HEADER CARD
        // ==========================================

       let boxY = currentY;
let boxHeight = 28;

let catColor = BRAND_COLOR;

pdf.setFillColor(...catColor);

pdf.roundedRect(
    10,
    boxY,
    pageWidth - 20,
    boxHeight,
    3,
    3,
    'F'
);

// ==========================================
// CATEGORY
// ==========================================

pdf.setTextColor(255, 255, 255);

pdf.setFontSize(9);

pdf.setFont("helvetica", "normal");

let catLabel =
    mv.category
        ? mv.category.toUpperCase()
        : "UNKNOWN";

pdf.text(
    `AUD-${auditItem.id} - ${catLabel}`,
    15,
    boxY + 7
);

// ==========================================
// RISK BADGE
// ==========================================

let riskText = mv.rating || "Medium";

let riskBg = [254, 243, 199];
let riskCol = [120, 53, 15];

if (riskText === 'High') {

    riskBg = [254, 226, 226];
    riskCol = [192, 57, 43];

}
else if (riskText === 'Low') {

    riskBg = [220, 252, 231];
    riskCol = [30, 110, 54];
}

pdf.setFillColor(...riskBg);

let badgeW = 20;
let badgeH = 7;

let badgeX = pageWidth - 15 - badgeW;
let badgeY = boxY + 4;

pdf.roundedRect(
    badgeX,
    badgeY,
    badgeW,
    badgeH,
    3.5,
    3.5,
    'F'
);

pdf.setTextColor(...riskCol);

pdf.setFontSize(7.5);

pdf.setFont("helvetica", "bold");

pdf.text(
    `${riskText} Risk`,
    badgeX + badgeW / 2,
    badgeY + 4.5,
    { align: 'center' }
);

// ==========================================
// TITLE
// ==========================================

pdf.setTextColor(255, 255, 255);

pdf.setFontSize(12);

pdf.setFont("helvetica", "bold");

let titleLines = pdf.splitTextToSize(
    mv.title || "No Title",
    pageWidth - 30
);

pdf.text(
    titleLines,
    15,
    boxY + 14
);

// ==========================================
// STATUS BADGE
// ==========================================

let sBadgeW = 32;
let sBadgeH = 6;
let sBadgeY = boxY + 19;

pdf.setFillColor(255, 255, 255);

pdf.roundedRect(
    15,
    sBadgeY,
    sBadgeW,
    sBadgeH,
    3,
    3,
    'F'
);

pdf.setTextColor(...catColor);

pdf.setFontSize(8);

pdf.setFont("helvetica", "bold");

pdf.text(
    mv.status || "Planned",
    15 + sBadgeW / 2,
    sBadgeY + 4.1,
    { align: 'center' }
);

// ==========================================
// PERIOD & PROGRESS
// ==========================================

pdf.setTextColor(230, 230, 230);

pdf.setFont("helvetica", "normal");

pdf.setFontSize(8);

pdf.text(
    `Audit Period: ${mv.auditPeriod || '-'}  |  Completion: ${mv.progress || '0'}%`,
    15 + sBadgeW + 5,
    sBadgeY + 4.1
);

// ==========================================
// FINAL Y
// ==========================================

currentY = boxY + boxHeight + 12;

        // ==========================================
        // SUMMARY TABLE
        // ==========================================

        pdf.setTextColor(...BRAND_COLOR);

        pdf.setFontSize(11);

        pdf.text(
            "Audit Summary Details",
            10,
            currentY
        );

        currentY += 5;

        const summaryBody = [

            ["Description", mv.objectivePurpose || '-'],

            ["Auditors", mv.auditor || '-'],

            ["Department / BU", mv.departmentId || '-'],

            ["Audit Period", mv.auditPeriod || '-'],

            ["Start Date", fmtDate(auditItem.startDate)],

            ["End Date", fmtDate(auditItem.endDate)],

            ["Next Review Date", fmtDate(mv.nextDate)],

            ["Current Status", mv.status || '-'],

            ["Risk Rating", mv.rating || '-'],

            ["Progress", mv.progress || '0%'],

            ["Scope of Audit", mv.scopeofAudit || '-'],

            ["Criteria / Standards", mv.auditCritiria || '-'],

            ["Updated By",  mv.createdByName || '-']
        ];

        pdf.autoTable({
            startY: currentY,
            body: summaryBody,
            theme: 'grid',
            styles: {
                fontSize: 8,
                cellPadding: 3
            },
            columnStyles: {
                0: {
                    fillColor: [245, 245, 245],
                    fontStyle: 'bold',
                    cellWidth: 50
                }
            }
        });

        currentY = pdf.lastAutoTable.finalY + 10;

        // ==========================================
        // FINDINGS
        // ==========================================

        let findings =
            mv?.findingsIssuesData?.findings || [];

        if (findings.length > 0) {

            pdf.setFontSize(11);

            pdf.setFont("helvetica", "bold");

            pdf.setTextColor(...BRAND_COLOR);

            pdf.text(
                "Audit Findings",
                10,
                currentY
            );

            currentY += 5;

            for (let fIdx = 0; fIdx < findings.length; fIdx++) {

                let f = findings[fIdx];

                const findingBody = [

                    ["Finding ID", `F-${fIdx + 1}`],

                    ["Type", mv?.findingsIssuesData?.findingsType || '-'],

                    ["Severity", f.severity || '-'],

                    ["Title", f.title || '-'],

                    ["Description", f.description || '-'],

                    ["Root Cause", f.rootCauseCategory || '-'],

                    ["Root Cause Detail", f.rootCauseDetail || '-'],

                    ["Owner", f.owner || '-'],

                    ["Target Date", fmtDate(f.targetDate)],

                    ["Status", f.status || '-'],

                    ["Recommendation", f.recommendation || '-'],

                    ["Management Response", f.managementResponse || '-']
                ];

                pdf.autoTable({
                    startY: currentY,
                    body: findingBody,
                    theme: 'grid',
                    styles: {
                        fontSize: 8,
                        cellPadding: 3
                    },
                    columnStyles: {
                        0: {
                            fillColor: [245, 245, 245],
                            fontStyle: 'bold',
                            cellWidth: 50
                        }
                    }
                });

                currentY =
                    pdf.lastAutoTable.finalY + 8;
            }
        }

        // ==========================================
        // ISSUES
        // ==========================================

        let issues =
            mv?.findingsIssuesData?.issues || [];

        if (issues.length > 0) {

            pdf.setFontSize(11);

            pdf.setFont("helvetica", "bold");

            pdf.setTextColor(...BRAND_COLOR);

            pdf.text(
                "Linked Issues",
                10,
                currentY
            );

            currentY += 5;

            for (let issIdx = 0; issIdx < issues.length; issIdx++) {

                let iss = issues[issIdx];

                const issueBody = [

                    ["Issue ID", `ISS-${issIdx + 1}`],

                    ["Type", iss.issuesType || mv?.findingsIssuesData?.issuesType || '-'],

                    ["Title", iss.title || '-'],

                    ["Description", iss.description || '-'],

                    ["Cause / Root Cause", `${iss.rootCauseCategory || '-'} / ${iss.rootCauseDetail || '-'}`],

                    ["Severity", iss.severity || '-'],

                    ["Status", iss.status || '-'],

                    ["Owner", iss.owner || '-'],

                    ["Due Date", fmtDate(iss.targetDate)],

                    ["Recommendation", iss.recommendation || '-'],

                    ["Response", iss.managementResponse || '-']
                ];

                pdf.autoTable({
                    startY: currentY,
                    body: issueBody,
                    theme: 'grid',
                    styles: {
                        fontSize: 8,
                        cellPadding: 3
                    },
                    columnStyles: {
                        0: {
                            fillColor: [245, 245, 245],
                            fontStyle: 'bold',
                            cellWidth: 50
                        }
                    }
                });

                currentY =
                    pdf.lastAutoTable.finalY + 8;
            }
        }


        // ==========================================
        // ACTIONS
        // ==========================================

        let actions = mv?.actions || [];

        if (actions.length > 0) {

            // Page break if needed
            if (currentY > pageHeight - 60) {

                pdf.addPage();

                currentY = header(
                    `Audit: AUD-${auditItem.id}`
                );
            }

            pdf.setFontSize(11);

            pdf.setFont("helvetica", "bold");

            pdf.setTextColor(...BRAND_COLOR);

            pdf.text(
                "Actions / Tasks",
                10,
                currentY
            );

            currentY += 5;

            let actionRows = actions.map((a, idx, index) => [

                index + 1,

                a.name || '-',

                mv.createdByName || '-'

            ]);

            pdf.autoTable({

                startY: currentY,

                head: [[
                    "Sn No",
                    "Action / Task Item",
                    "Owner"
                ]],

                body: actionRows,

                theme: 'grid',

                styles: {
                    fontSize: 8,
                    cellPadding: 3,
                    lineWidth: 0.2
                },

                headStyles: {
                    fillColor: BRAND_COLOR,
                    textColor: [255, 255, 255],
                    fontStyle: 'bold'
                },

                columnStyles: {

                    0: {
                        cellWidth: 35
                    },

                    1: {
                        cellWidth: 90
                    },

                    2: {
                        cellWidth: 'auto'
                    }
                },

                margin: {
                    left: 10,
                    right: 10
                }
            });

            currentY = pdf.lastAutoTable.finalY + 10;
        }

        // ==========================================
// COMMENTS
// ==========================================

let commentText = mv.internalNotes || "";

if (commentText.trim() !== "") {

    // Page break if needed
    if (currentY > pageHeight - 40) {

        pdf.addPage();

        currentY = header(
            `Audit: AUD-${auditItem.id}`
        );
    }

    pdf.setFontSize(11);

    pdf.setFont("helvetica", "bold");

    pdf.setTextColor(...BRAND_COLOR);

    pdf.text(
        "Comments History",
        10,
        currentY
    );

    currentY += 4;

    let commentRows = [[

        `${mv.createdByName || "User"}\n(${fmtDateTime(auditItem.createdTime) || ""})`,

        commentText

    ]];

    pdf.autoTable({

        startY: currentY,

        head: [[
            "User / Time",
            "Comment"
        ]],

        body: commentRows,

        theme: 'grid',

        styles: {
            fontSize: 8,
            cellPadding: 3,
            lineHeight: 1.3
        },

        headStyles: {
            fillColor: BRAND_COLOR,
            textColor: [255, 255, 255]
        },

        columnStyles: {

            0: {
                cellWidth: 50
            },

            1: {
                cellWidth: 'auto'
            }
        },

        margin: {
            left: 10,
            right: 10,
            bottom: 20
        }
    });

    currentY = pdf.lastAutoTable.finalY + 12;
}



    }

    

    // ==========================================
    // FOOTERS
    // ==========================================

    const totalPages =
        pdf.internal.getNumberOfPages();

    let reportPageCount =
        totalPages - (reportStartPage - 1);

    for (
        let i = reportStartPage;
        i <= totalPages;
        i++
    ) {

        pdf.setPage(i);

        footer(
            i - (reportStartPage - 1),
            reportPageCount
        );
    }

    // ==========================================
    // SAVE PDF
    // ==========================================

    pdf.save("audit_management_report.pdf");
}



//File Upload 

var swotGlobalid	=	"";
var readerValue = '';

$("#attachementuploadfile").on("change", function () {
    readFile(this);
});

function readFile(input) {		
  console.log(input.files, "inputData");
	if (input.files && input.files[0]) {		
		file = input.files[0];			
		var reader = new FileReader();
		   reader.readAsDataURL(file);
		   reader.onload = function () {		 
            console.log(reader.result, "reader result");       
		        readerValue = reader.result;
		 }  
	}
}

function handleUploadShow(id){
	console.log(id, "handleUploadShow called");
	swotGlobalid	=	id;
	
	$("#fileuploadtype").val('create');
	$('[data-toggle="tooltip"]').tooltip("hide");
	$('[rel="tooltip"]').tooltip("hide");
	attachmentdeleteId = id;
	$.ajax({
		url : "/stratroom/auditAttachList/" + id,
		async:false,
		method:'GET',
		success : function(data,status){
			//swotupdateDescription	=	data;			
			//attachment = data.meetingManagementValue.attachment;
			uploadShow(data)
		},
		error:readErrorMsg
	});
}

function bytesToSize(bytes) {
	   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	   if (bytes == 0) return '0 Byte';
	   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};


function checkmodalisclosedornot(){
	
	if($('#recommendation').is(':visible')	==	true){
		$(document.body).addClass('modal-open');				
	}
	if($('#addpeople').is(':visible')	==	false){
		$(document.body).addClass('modal-open');				
	}
	
	if($('#uploaded_files').is(':visible')	==	true){
		$(document.body).addClass('modal-open');				
	}
	
	if($('#file_upload_popup').is(':visible')	==	false){
		$(document.body).addClass('modal-open');				
	}
	
	setTimeout(function(){  $(document.body).addClass('modal-open');
	}, 1000);
	
};


function auditrailpage(data,type){
	$.ajax({
		url:"/stratroom/auditTrail",
		type:"post",
		async:false,
		contentType:"application/JSON",
		data:JSON.stringify(data),
		success:function(res){
			
		},error:function(){
			if(type	==	"recommendation"){
				$("#recommendation").modal("toggle");
				$(".recommendationclose").click();
			}else if(type	==	"action"){
				$("#action").modal("toggle");
				$(".actionclose").click();
			}else if(type== "file"){
				$('#attachementuploadfile').val('');	
            	$("#closeUpload").click();
			}else if(type== "file1"){
				$('#attachementuploadfile1').val('');	
            	$("#closeUpload").click();
            	$('#file_upload_popup1').modal('hide');
			}else{
				checkmodalisclosedornot();
            	$("#deleteAttachmentModal").modal("hide");
			}
		}
	});
}


$("#attachementupload").click(function(){	
 
	if(!$("#attachementuploadfile").val()){
		$.notify("Error:Kindly upload a file", {
							  style: 'error',
							  className: 'graynotify'
							});
		return false;
	}
	
	var file		=	$('#attachementuploadfile')[0].files[0];
	
	var fileName = file.name;
	const words = fileName.split('.');
  
  console.log(file, fileName, words, "wordddddd")
  

	   
	   var objvalue = {
				"name":words[0],
				"type":words[words.length - 1],
				"size":bytesToSize(file.size),
				"file":readerValue,
				"active":0,
				"auditManagementId":swotGlobalid
	   }
	   
	  console.log(objvalue, "objvalue");
	$.ajax({
        url: "/stratroom/auditAttach/",
        async:false,
		method:'PUT',
        contentType: "application/json",
        data: JSON.stringify(objvalue),
        success: function (result, status) {
        	$.ajax({
        		url : "/stratroom/auditAttachList/" + swotGlobalid,
        		async:false,
        		method:'GET',
        		success : function(datafile,status){
        		var systemip = 	localStorage.getItem('systemip');
    				var action 	= 	"Audit Attachment Uploaded";
    				var navigateempId = $("#userPrincipalnavigate").val();
				    var data	=	{"createdBy":currentEmp,"userId":navigateempId,"typeId":swotGlobalid,"action":action,"systemIp":systemip};
    				auditrailpage(data,'file');
        			$('#attachementuploadfile').val('');	
                	$("#closeUpload").click();
                	checkmodalisclosedornot();
                	uploadShow(datafile);
        		}
        	});   
        },
		error:readErrorMsg
    });
		
});	


function uploadShow(result) {
    const savedLanguage = localStorage.getItem("selectedLang") || "en";
    var siNoHeader = "Sr. No.";
    var fileNameHeader = "File Name";
    var uploadedOnHeader = "Uploaded On";
    var sizeHeader = "Size";
    var typeHeader = "Type";
    var actionsHeader = "Actions";
if (savedLanguage == "en") {
    siNoHeader = "Sr. No.";
    fileNameHeader = "File Name";
    uploadedOnHeader = "Uploaded On";
    sizeHeader = "Size";
    typeHeader = "Type";
    actionsHeader = "Actions";

} else if (savedLanguage == "am") {
    siNoHeader = "ተ.ቁ.";
    fileNameHeader = "የፋይል ስም";
    uploadedOnHeader = "የተጫነበት ቀን";
    sizeHeader = "የፋይል መጠን";
    typeHeader = "የፋይል አይነት";
    actionsHeader = "እርምጃዎች";

} else {
    siNoHeader = "الرقم التسلسلي";
    fileNameHeader = "اسم الملف";
    uploadedOnHeader = "تم الرفع في";
    sizeHeader = "الحجم";
    typeHeader = "النوع";
    actionsHeader = "الإجراءات";
}

    console.log(result, "uploadShow called");
    $("#listfileuploadTableData").empty();
    
    if (!result || result.length === 0) {
        $("#listfileuploadTableData").html('<div class="text-center p-3">No attachments found</div>');
        return;
    }

    var uploadShowData = "";
    var i = 0;
    
    $.each(result, function (index, List) {
        i++;
        var uploadedOn = dateFormatedtohumanread(List.createdTime);
        var fileUrl = List.file || "#"; // Handle empty file URLs
        
        uploadShowData += "<tr>" +
            "<td class='text-center align-middle'>" + i + "</td>" +
            "<td class='text-center align-middle'>" +
            "<a href='" + fileUrl + "' target='_blank' download='" + List.name + "." + List.type + "'>" + 
            (List.name || "Unnamed File") + 
            "</a></td>" +
            "<td class='text-center align-middle'>" + (uploadedOn || "N/A") + "</td>" +
            "<td class='text-center align-middle'>" + (List.size || "N/A") + "</td>" +
            "<td class='text-center align-middle'>" + (List.type || "N/A") + "</td>" +
            "<td class='text-center align-middle'>" +
            "<div class='table-actions justify-content-center'>";

        
            uploadShowData +=
                '<a href="#" class="btn btn-sm btn-icon" data-toggle="modal" data-target="#deleteAttachmentModal" onclick="deleteAttachment(' + List.meetingManagementId + ',' + List.id + ')">' +
                '<img src="/stratroom/images/delete-i.svg" width="12" height="12" />' +
                '</a>';
        

        uploadShowData += "</div>" +
            "</td>" +
            "</tr>";
    });

    // Using string concatenation instead of template literals
    var table = '<div class="table-responsive">' +
        '<table class="table table-sm table-bordered align-center" id="fileuploadTable" style="margin-bottom: 0px !important;">' +
        '<thead>' +
        '<tr>' +
        '<th class="text-center">'+siNoHeader+'</th>' +
        '<th class="text-center">'+fileNameHeader+'</th>' +
        '<th class="text-center">'+uploadedOnHeader+'</th>' +
        '<th class="text-center">'+sizeHeader+'</th>' +
        '<th class="text-center">'+typeHeader+'</th>' +
        '<th class="text-center">'+actionsHeader+'</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        uploadShowData +
        '</tbody>' +
        '</table>' +
        '</div>';

    $("#listfileuploadTableData").html(table);
    
    // Initialize tooltips
    $('[rel="tooltip"]').tooltip();
    
    // Initialize paging if the plugin exists
    if ($.fn.paging) {
        $("#fileuploadTable").paging({ limit: 5 });
    }
}
