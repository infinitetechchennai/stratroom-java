
var pageId;
var table;
var deleteComplainId;
var topparentswotDetails = {};
var getcomplainceDetails = {};
var compliancefileData = {};
var complianceAreas = []
  var attachment = {
    kpiAttachment: []  
  };
var documentData = {}

let userMap = {}; // { 1814: {..}, 1218: {..} }

function generateInitialAvatar(
  name,
  size = 24,              // reduced image size
  bgColor = "#4F46E5",
  textColor = "#ffffff"
) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");

  // Background circle
  ctx.fillStyle = bgColor;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();

  // Get first TWO letters of FIRST name
  const firstName = name.trim().split(" ")[0];
  const initials = firstName.substring(0, 2).toUpperCase();

  // Text styling (auto scale with size)
  ctx.fillStyle = textColor;
  ctx.font = `bold ${Math.floor(size * 0.45)}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(initials, size / 2, size / 2 + 1);

  return canvas.toDataURL("image/png");
}




// Call once (on page load)
function loadUsers() {
  $.ajax({
      url: "/stratroom/user/moduleAccessUserList?moduleName=Meetings",
    method: "GET",
    success: function (users) {
      users.forEach(u => {
        userMap[u.id] = u;
      });
    }
  });
}

loadUsers();


const AVATAR_COLORS = [
  "#1abc9c", // teal
  "#3498db", // blue
  "#9b59b6", // purple
  "#e67e22", // orange
  "#e74c3c", // red
  "#16a085", // green
  "#2980b9", // dark blue
  "#8e44ad", // dark purple
  "#f39c12", // yellow
  "#2c3e50"  // navy
];


function getAvatarColor(key) {
  if (!key) return AVATAR_COLORS[0];

  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }

  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}



function getUserAvatarHTML(user, size = 24) {
  const username = user.name && user.name !== "" ? user.name : "User";
  const userKey = String(user.id || username);
  const bgColor = getAvatarColor(userKey);

  // IMAGE avatar
  if (user.image && user.image !== "") {
    return `
      <img src="${user.image.startsWith('assets') ? user.image : 'assets/images/user/' + user.image}"
           alt="${username}"
           width="${size}"
           height="${size}"
           class="rounded-circle">`;
  }

  // ✅ INITIALS: first 2 letters of FIRST name
  const firstName = username.trim().split(" ")[0]; // take first word
  const initials = firstName.substring(0, 2).toUpperCase();

  return `
    <span class="avatar-initial rounded-circle text-white"
          style="
            background:${bgColor};
            width:${size}px;
            height:${size}px;
            line-height:${size}px;
            font-size:${size / 2}px;
            display:inline-flex;
            align-items:center;
            justify-content:center;
          ">
      ${initials}
    </span>`;
}






function renderOwnerAvatars(users = [], showPlus = true, rowId) {
  const maxVisible = 2;
  const visibleUsers = users.slice(0, maxVisible);
  const remainingCount = users.length - maxVisible;

  const avatars = visibleUsers.map(u => `
    <li class="avatar avatar-xs pull-up" title="${u.name}">
      ${getUserAvatarHTML(u, 24)}
    </li>
  `).join("");

  const plusBadge = showPlus
    ? `
      <li class="avatar avatar-xs pull-up"
          data-bs-toggle="modal"
          data-bs-target="#attendess-list"
          onclick="openOwnerList('${users.map(u => u.id).join(",")}', '${rowId}')">
        <span class="avatar-initial rounded-circle bg-light text-dark">
          +${users.length > maxVisible ? remainingCount : ""}
        </span>
      </li>`
    : "";

  return `
    <ul class="list-unstyled d-flex align-items-center justify-content-center avatar-group mb-0">
      ${avatars}
      ${plusBadge}
    </ul>`;
}






// function renderOwnerAvatars(users = [], showPlus = true, rowId) {
//   console.log(rowId, "rowId");
//   const maxVisible = 2;
//   const visibleUsers = users.slice(0, maxVisible);
//   const remainingCount = users.length - maxVisible;

//   const avatars = visibleUsers.map(u => {
//     if (u.image) {
//       return `
//         <li class="avatar avatar-xs pull-up" title="${u.name}">
//           <img src="assets/images/user/${u.image}"
//                class="rounded-circle"
//                width="24" height="24"
//                alt="${u.name}">
//         </li>`;
//     }

//     // No image → initials
//     const initials = u.name
//       ? u.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
//       : "NA";

//     return `
//       <li class="avatar avatar-xs pull-up" title="${u.name}">
//         <span class="avatar-initial rounded-circle bg-secondary">
//           ${initials}
//         </span>
//       </li>`;
//   }).join("");

//   // PLUS BADGE – ALWAYS
//   const plusBadge = showPlus
//     ? `
//       <li class="avatar avatar-xs pull-up"
//           data-bs-toggle="modal"
//           data-bs-target="#attendess-list"
//           onclick="openOwnerList('${users.map(u => u.id).join(",")}', '${rowId}')"
//         <span class="avatar-initial rounded-circle bg-light text-dark">
//           +${users.length > maxVisible ? remainingCount : ""}
//         </span>
//       </li>`
//     : "";

//   return `
//     <ul class="list-unstyled d-flex align-items-center justify-content-center avatar-group mb-0">
//       ${avatars}
//       ${plusBadge}
//     </ul>`;
// }


// function openOwnerList(ownerIds) {
//   console.log("Open user list for:", ownerIds);
//   var getData = []

//    $.ajax({
//             url: "/stratroom/user/moduleAccessUserList?moduleName=SWOT",
//             async: false,
//             success: function(result, status) {
//                 var attendeesHtml = '';
//                 var ischecked = "";
//                 var selectedItem = [];


// 				$.each(getData,function(index,users){
// 					if(users.id != undefined && users.id != 0){
// 						selectedItem.push(users.id);
// 					}
// 				});
				
// 				if(selectedItem.length 	==	0){
// 					var users 	=	topparentswotDetails;
// 					selectedItem.push(users.id);
// 				}

// 				console.log(selectedItem, "selectedItem");
//                 var datas = [];
//                 $.each(result, function(index, users) {
//                     datas.push(users.id);
//                 });
                
//                 if(result.length == 0) {
//                     $(".showactivitiesusers").css('display','none');
//                 }
                
//                 if(result.length == selectedItem.length) {
//                     $("#allusersactivities").prop("checked", true);
//                 } else {
//                     $("#allusersactivities").prop("checked", false);
//                 }
                
//                 $.each(result, function(index, users) {
//                     console.log(users, "users");
//                     var username = ((users.name == undefined || users.name == "") ? "User" : users.name);
//                     var userProfileConcate = ((users.image == undefined || users.image == "") ? "data-name='"+username+"' class='rounded-circle swotmultiuserimage'" : "class='rounded-circle' src='"+users.image+"'");
                    
                   
//                     ischecked = "";
//                     $.each(selectedItem, function(key, value) {
//                         if(value == users.id) {
//                             ischecked = "checked";
//                             return false;
//                         }
//                     });

// 					console.log(selectedItem, "selectedItem");
                    
//                     var userImage = (users.image && users.image != "") ? users.image : 'assets/images/icons/speaker.svg';
//                     var userAlt = username;
                    
                  
//                     attendeesHtml += '<div class="list-group-item attendee">';
//                     attendeesHtml += '  <div class="form-check cusom-check form-check-reverse">';
//                     attendeesHtml += '    <input class="form-check-input" type="checkbox" name="activities_owner[]" id="attendees' + users.id + '" ' + ischecked + ' value="' + users.id + '">';
//                     attendeesHtml += '    <label class="form-check-label" for="attendees' + users.id + '">';
//                     attendeesHtml += '      <span class="image">';
                    
//                     if(users.image && users.image != "") {
//                         attendeesHtml += '        <img src="' + users.image + '" alt="' + userAlt + '" width="18" height="18" class="rounded-circle">';
//                     } else {
//                         attendeesHtml += '        <img data-name="' + username + '" width="18" height="18" class="rounded-circle swotmultiuserimage">';
//                     }
                    
//                     attendeesHtml += '      </span>';
//                     attendeesHtml += '      <span class="name">' + users.name + '</span>';
//                     attendeesHtml += '    </label>';
//                     attendeesHtml += '  </div>';
//                     attendeesHtml += '</div>';
//                 });
                
               
//                 $(".add-attendees").html(attendeesHtml);
//                 $('.swotmultiuserimage').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
                
               
//             }
//         });
// }


function openOwnerList(ownerIds, rowId) {
  console.log("Open user list for:",rowId, ownerIds);

  

   $.ajax({
    url: `/stratroom/compliance/${rowId}`,
    type: "GET",
    success: function (res) {
      getcomplainceDetails = res;
    }
  });

  // -----------------------------
  // 1. Convert ownerIds to array
  // -----------------------------
  let selectedItem = [];

  if (ownerIds && ownerIds !== "") {
    selectedItem = ownerIds
      .split(",")
      .map(id => id.trim())
      .filter(Boolean);
  }

  console.log("Pre-selected owner IDs:", selectedItem);

  // -----------------------------
  // 2. Load users from API
  // -----------------------------
  $.ajax({
    url: "/stratroom/user/moduleAccessUserList?moduleName=SWOT",
    type: "GET",
    async: false,
    success: function (result) {

      let attendeesHtml = "";

      if (!result || result.length === 0) {
        $(".showactivitiesusers").hide();
        $(".add-attendees").html("<div class='text-muted'>No users found</div>");
        return;
      }

      // -----------------------------
      // 3. Check ALL checkbox logic
      // -----------------------------
      if (selectedItem.length > 0 && result.length === selectedItem.length) {
        $("#allusersactivities").prop("checked", true);
      } else {
        $("#allusersactivities").prop("checked", false);
      }

      // -----------------------------
      // 4. Build user list
      // -----------------------------
      $.each(result, function (index, users) {

        const username = users.name && users.name !== "" ? users.name : "User";
        const userId = String(users.id);

        const isChecked = selectedItem.includes(userId) ? "checked" : "";

        attendeesHtml += `
          <div class="list-group-item attendee">
            <div class="form-check cusom-check form-check-reverse">
              <input class="form-check-input"
                     type="checkbox"
                     name="activities_owner[]"
                     id="attendees${userId}"
                     value="${userId}"
                     ${isChecked}>

              <label class="form-check-label" for="attendees${userId}">
                <span class="image">`;

        // -----------------------------
        // 5. Image OR Initials
        // -----------------------------
        if (users.image && users.image !== "") {
          attendeesHtml += `
            <img src="${users.image}"
                 alt="${username}"
                 width="18"
                 height="18"
                 class="rounded-circle">`;
        } else {
          attendeesHtml += `
            <img data-name="${username}"
                 width="18"
                 height="18"
                 class="rounded-circle swotmultiuserimage">`;
        }

        attendeesHtml += `
                </span>
                <span class="name">${username}</span>
              </label>
            </div>
          </div>`;
      });

      // -----------------------------
      // 6. Inject HTML & init initials
      // -----------------------------
      $(".add-attendees").html(attendeesHtml);

      $('.swotmultiuserimage').initial({
        charCount: 2,
        height: 30,
        width: 30,
        fontSize: 18
      });
    }
  });
};



$(document).on("click", ".usersClickAdd", function () {

  let selectedUserIds = [];

  $(".add-attendees input[name='activities_owner[]']:checked").each(function () {
    selectedUserIds.push($(this).val());
  });

  console.log("Selected User IDs:", selectedUserIds);

  const ownerIdsString = selectedUserIds.join(",");
  

  // 🚫 No users selected
  if (selectedUserIds.length == 0) {
    alert("Please select at least one user");
    return;
  }

  const payload = getcomplainceDetails || {};

  payload.complainValue.ownerName = ownerIdsString;

  payload.complainValue.ownerids = ownerIdsString;

  


  $.ajax({
    url: "/stratroom/compliance",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(payload),
    success: function(res) {
      window.location.reload();
    },
    error: function(err) {
    }
  });


  
});







$(document).ready(function () {
  const fullUrl = window.location.href;
  const params = new URLSearchParams(window.location.search);
  console.log(fullUrl, "fullUrl");
   pageId = params.get("pageId");
  const storedLanguage = localStorage.getItem("selectedLang") || "en";
  var titleHeader,
    complianceDescHeader,
    controlIdHeader,
    controlDescHeader,
    complianceAreaHeader,
    applicableRegHeader,
    riskLevelHeader,
    controlTypeHeader,
    implementationStatusHeader,
    lastAssessmentDateHeader,
    nextReviewDateHeader,
    statusHeader,
    auditRequiredHeader,
    lastAuditDateHeader,
    auditFindingsHeader,
    correctiveActionsHeader,
    actionDueDateHeader,
    evidenceFileRefHeader,
    notesHeader,
    cancelHeader,
    saveHeader,
    createdByHeader,
    modifiedByHeader,
    createdDateHeader,
    modifiedDateHeader,
    actionsHeader,
    responsibleHeader,
    ownerHeader,
    regulationStandardHeader;

  if (storedLanguage == "ar") {
    titleHeader = "إدارة الامتثال";
    complianceDescHeader = "وصف الامتثال";
    controlIdHeader = "معرف التحكم";
    controlDescHeader = "وصف التحكم";
    complianceAreaHeader = "مجال الامتثال";
    applicableRegHeader = "اللائحة السارية";
    riskLevelHeader = "مستوى المخاطر";
    controlTypeHeader = "نوع التحكم";
    implementationStatusHeader = "حالة التنفيذ";
    lastAssessmentDateHeader = "تاريخ التقييم الأخير";
    nextReviewDateHeader = "تاريخ المراجعة التالية";
    statusHeader = "الحالة";
    auditRequiredHeader = "التدقيق مطلوب";
    lastAuditDateHeader = "تاريخ آخر تدقيق";
    auditFindingsHeader = "نتائج التدقيق";
    correctiveActionsHeader = "الإجراءات التصحيحية";
    actionDueDateHeader = "تاريخ استحقاق الإجراء";
    evidenceFileRefHeader = "مرجع ملف الأدلة";
    notesHeader = "ملاحظات";
    cancelHeader = "إلغاء";
    saveHeader = "حفظ";
    createdByHeader = "تم الإنشاء بواسطة";
    modifiedByHeader = "تم التعديل بواسطة";
    createdDateHeader = "تاريخ الإنشاء";
    modifiedDateHeader = "تاريخ التعديل";
    actionsHeader = "الإجراءات";
    responsibleHeader = "المسؤول";
    ownerHeader = "المالك";
    regulationStandardHeader = "اللائحة / المعيار";
  } else {
    titleHeader = "Compliance Management";
    complianceDescHeader = "Compliance Description";
    controlIdHeader = "CONTROL ID";
    controlDescHeader = "Control Description";
    complianceAreaHeader = "Compliance Area";
    applicableRegHeader = "Applicable Regulation";
    riskLevelHeader = "Risk Level";
    controlTypeHeader = "Control Type";
    implementationStatusHeader = "Implementation Status";
    lastAssessmentDateHeader = "Last Assessment Date";
    nextReviewDateHeader = "Next Review Date";
    statusHeader = "Status";
    auditRequiredHeader = "Audit Required";
    lastAuditDateHeader = "Last Audit Date";
    auditFindingsHeader = "Audit Findings";
    correctiveActionsHeader = "Corrective Actions";
    actionDueDateHeader = "Action Due Date";
    evidenceFileRefHeader = "Evidence File Reference";
    notesHeader = "Notes";
    cancelHeader = "Cancel";
    saveHeader = "Save";
    createdByHeader = "Created By";
    modifiedByHeader = "Modified By";
    createdDateHeader = "Created Date";
    modifiedDateHeader = "Modified Date";
    actionsHeader = "Actions";
    responsibleHeader = "Responsible";
    ownerHeader = "Owner";
    regulationStandardHeader = "Regulation/Standard";
  }
 
  let collapsedGroups = {};
  const maxVisiblePerGroup = 5;

if (!$.fn.DataTable.isDataTable("#table-compliance")) {
  var datePeriod = $("#datePeriod").val();
  console.log(datePeriod, pageId, "datePeriodValue");

  table = $("#table-compliance").DataTable({
    paging: false,
    lengthChange: false,
    ordering: false,
    info: false,
    responsive: true,
    scrollX: true,
    scrollY: "400px",
    processing: true,
    deferRender: true,
    language: {
      paginate: {
        previous: "<i class='fas fa-arrow-left'></i>",
        next: "<i class='fas fa-arrow-right'></i>",
      },
    },

    ajax: {
      url: "/stratroom/retrieveComplinValue?pageId=" + pageId + "&dateRange=" + datePeriod,
      method: "GET",
      cache: true,
      // ✅ REMOVED success callback
     dataSrc: function (response) {
      var complianceAreas = response.map(function(item) {
          return item.name;
      });

       renderCompliancePopover(complianceAreas);

      
    console.log(complianceAreas, "complianceAreas");

  const transformedData = [];

  response.forEach((parentItem) => {
    const { id, name } = parentItem;

    if (!parentItem.complainsDetailsList || parentItem.complainsDetailsList.length === 0) {
      // Push a placeholder row for empty compliance areas
      transformedData.push({
        control_id: null,
        controllerDataId : "",
        name: name, // Ensure grouping works
        compliance_area: "—",
        risk_level: "—",
        status: "No Data",
        last_assessment_date: null,
        next_review_date: null,
        action_due_date: null,
        last_audit_date: null,
        control_description: "—",
        regulation: "—",
        owner: [],
        control_type: "—",
        implementation_status: "—",
        audit_required: "—",
        audit_findings: "—",
        corrective_actions: "—",
        responsible_person: [],
        evidence_file_reference: "—",
        notes: "—",
        complainAreaId: id,
        isPlaceholder: true, // Optional: for styling or logic
      });
    } else {
      // Normal rows
      parentItem.complainsDetailsList.forEach((complain) => {
        transformedData.push({
          complianceAttachment: complain?.complainceAttachment || null,
          control_id: complain.id || "N/A",
          controllerDataId : complain.complainValue.controlId || "N/A",
          name: parentItem.name,
          compianceName : complain.complainValue?.name || "",
          compliance_area: complain.complainValue?.complianceArea || "N/A",
          risk_level: complain.complainValue.riskLevel || complain.riskLevel ||"N/A",
          status: complain.complainValue.status || complain.status ||"N/A",
          last_assessment_date: complain.complainValue.lastAssessmentDate || complain.lastAssessmentDate ||  "N/A",
          next_review_date: complain.complainValue.nextReviewDate || complain.nextReviewDate || "N/A",
          action_due_date: complain.complainValue.actionDueDate || complain.actionDueDate || "N/A",
          last_audit_date: complain.complainValue.lastAuditDate || complain.lastAuditDate || "N/A",

          control_description: complain.complainValue?.desc || complain.complainValue?.controlDescription ||"N/A",
          regulation: complain.complainValue?.applicableRegulations || complain.complainValue?.regulationORStandar ||"N/A",
          owners: complain.complainValue?.ownerids || "N/A", 
          responsibleperson : complain.complainValue?.createdByName || "N/A",
          control_type: complain.complainValue?.controlType || complain.complainValue?.controlType || "N/A",
          implementation_status: complain.complainValue?.implementationStatus || "N/A",
          audit_required: complain.complainValue?.auditRequired ||  "N/A",
          audit_findings: complain.complainValue.auditFindings || "N/A",
          corrective_actions: complain.complainValue.correctiveActions || "N/A",
          // responsible_person: complain.complainValue?.createdByName || "N/A", // You may populate this if available
          evidence_file_reference: complain.complainValue?.evidenceFileReference || "N/A",
          notes: complain.complainValue?.notes || "N/A",
          complainAreaId: parentItem.id,
          isPlaceholder: false,
        });
      });
    }
  });

  console.log("Transformed Data:", transformedData);
  return transformedData;
}
    },

    columns: [
      {
        data: "controllerDataId",
        title: controlIdHeader,
        className: "editableControl_id",
        render: function (data) {
          return `<span class="badge label-bg-dark rounded-pill">${data || ""}</span>`;
        },
      },
      {
        data: "control_description",
        title: controlDescHeader,
        className: "editableControl_description text-start",
        render: function (data) {
          return `<div class="notswrap" style="min-width:250px">${data || "N/A"}</div>`;
        },
      },
      {
        data: "compliance_area",
        title: complianceAreaHeader,
        className: "text-center",
      },
      {
        data: "regulation",
        title: regulationStandardHeader,
        className: "editableRegulations text-center",
        render: function (data) {
          return getRegulationBadges(data);
        },
      },
      // {
      //   data: "owner",
      //   title: ownerHeader,
      //   orderable: false,
      //   render: function (data) {
      //     if (!Array.isArray(data) || data.length == 0) return "N/A";
      //     const maxVisible = 2;
      //     const visibleOwners = data.slice(0, maxVisible);
      //     const remainingCount = data.length - maxVisible;
      //     const avatars = visibleOwners
      //       .map(
      //         (o) => `
      //           <li class="avatar avatar-xs pull-up" title="${o.name}">
      //             <img src="assets/images/user/${o.image}" class="rounded-circle" width="24" height="24" alt="${o.name}">
      //           </li>`
      //       )
      //       .join("");
      //     const moreAvatar =
      //       remainingCount > 0
      //         ? `<li class="avatar avatar-xs pull-up" data-bs-toggle="modal" href="#attendess-list">
      //             <span class="avatar-initial rounded-circle" data-bs-toggle="tooltip" title="${remainingCount} more">+${remainingCount}</span>
      //           </li>`
      //         : "";
      //     return `<ul class="list-unstyled d-flex align-items-center justify-content-center avatar-group mb-0">${avatars}${moreAvatar}</ul>`;
      //   },
      // },

//     {
//   data: "owners", // "1814, 1218"
//   title: ownerHeader,
//   orderable: false,
//   render: function (data) {

//     // ALWAYS show + badge
//     const showPlus = true;

//     // If no owner data
//     if (!data) {
//       return renderOwnerAvatars([], showPlus);
//     }

//     // Convert "1814, 1218" → ["1814","1218"]
//     const ownerIds = data
//       .split(",")
//       .map(id => id.trim())
//       .filter(Boolean);

//     const owners = ownerIds
//       .map(id => userMap[id])
//       .filter(Boolean); // remove missing users

//     return renderOwnerAvatars(owners, showPlus);
//   }
// },

// {
//   data: "owners", // "1814, 1218"
//   title: ownerHeader,
//   orderable: false,
//   render: function (data, type, row, meta) {

//     const showPlus = true;

//     // ✅ ROW ID (preferred)
//     const rowId = row.id || row.control_id || meta.row;

//     // Convert owner string → array
//     const ownerIds = data
//       ? data.split(",").map(id => id.trim()).filter(Boolean)
//       : [];

//     // Map IDs → users
//     const owners = ownerIds
//       .map(id => userMap[id])
//       .filter(Boolean);

//     // ✅ PASS rowId ALSO
//     return renderOwnerAvatars(owners,showPlus, ownerIds, rowId, );
//   }
// },

{
  data: "owners", // "1814, 1218"
  title: ownerHeader,
  orderable: false,
  render: function (data, type, row, meta) {

    const showPlus = true;

    // 🔹 get row id (change key if needed)
    const rowId = row.id || row.control_id;

    // If no owner data
    if (!data) {
      return renderOwnerAvatars([], showPlus, rowId);
    }

    // Convert "1814, 1218" → ["1814","1218"]
    const ownerIds = data
      .split(",")
      .map(id => id.trim())
      .filter(Boolean);

    const owners = ownerIds
      .map(id => userMap[id])
      .filter(Boolean);

    return renderOwnerAvatars(owners, showPlus, rowId);
  }
},

      {
        data: "risk_level",
        title: riskLevelHeader,
        className: "editableRisk_level text-center",
        render: function (data) {
          return getRiskLevelBadge(data);
        },
      },
      {
        data: "control_type",
        title: controlTypeHeader,
        className: "editableControl_type text-center",
        defaultContent: "N/A",
        render: function (data) {
          return getControlTypeBadge(data);
        },
      },
      {
        data: "implementation_status",
        title: implementationStatusHeader,
        className: "editableImplementation_status text-center",
        defaultContent: "N/A",
        render: function (data) {
          return getImplementationStatusBadge(data);
        },
      },
      {
        data: "last_assessment_date",
        title: lastAssessmentDateHeader,
        className: "editableLast_assessment_date text-center",
        defaultContent: "N/A",
      },
      {
        data: "next_review_date",
        title: nextReviewDateHeader,
        className: "editableNext_review_date text-center",
        defaultContent: "N/A",
      },
      {
        data: "status",
        title: statusHeader,
        className: "editableStatus text-center",
        defaultContent: "N/A",
        render: function (data) {
          return getStatusBadge(data);
        },
        visible: true,
        searchable: true,
      },
      {
        data: "audit_required",
        title: auditRequiredHeader,
        className: "editableAudit_required text-center",
        defaultContent: "N/A",
        render: function (data) {
          return getAuditRequiredBadge(data);
        },
      },
      {
        data: "last_audit_date",
        title: lastAuditDateHeader,
        className: "editableLast_audit_date text-center",
        defaultContent: "N/A",
      },
      {
        data: "audit_findings",
        title: auditFindingsHeader,
        className: "editableAudit_findings editableAudit_findings",
        defaultContent: "N/A",
      },
      {
        data: "corrective_actions",
        title: correctiveActionsHeader,
        className: "editableCorrective_actions text-center",
        defaultContent: "N/A",
      },
      {
        data: "action_due_date",
        title: actionDueDateHeader,
        className: "editableAction_due_date text-center",
        defaultContent: "N/A",
      },
// {
//   data: "responsibleperson", // "1812"
//   title: responsibleHeader,
//   orderable: false,
//   render: function (data, type, row) {
//   }
// },

{
  data: "responsibleperson",
  title: responsibleHeader,
  orderable: false,
 render: function (data) {
  if (!data) return "";

  const avatar = generateInitialAvatar(data);

  return `
    <img src="${avatar}" 
         alt="${data}" 
         style="width:32px;height:32px;border-radius:50%;" />
  `;
}

},




      // {
      //   data: "complianceAttachment",
      //   title: evidenceFileRefHeader,
      //   defaultContent: "N/A",
      //   orderable: false,
      //   render: function (data) {
      //     if (!data) return "N/A";
      //     return `<a href="/path/to/files/${data}" download class="btn btn-sm btn-icon text-decoration-none" title="Download Evidence">
      //               <i class="fas fa-file-pdf text-danger"></i>
      //             </a>`;
      //   },
      // },
//      {
//   data: "complianceAttachment",
//   title: evidenceFileRefHeader,
//   orderable: false,
//   render: function (attachment) {
//     console.log(attachment, "attachment");

//     if (!attachment) return "N/A";

//     return ''
//       + '<button type="button" '
//       + 'class="btn btn-sm btn-icon text-decoration-none download-evidence" '
//       + 'data-file="' + encodeURIComponent(JSON.stringify(attachment)) + '" '
//       + 'title="Download Evidence">'
//       + '<i class="fas fa-file-pdf text-danger"></i>'
//       + '</button>';
//   }
// },    
{
    data: "complianceAttachment", // 1. Change this to look at the object we added above
    title: evidenceFileRefHeader, // Ensure this variable is defined in your scope
    defaultContent: "N/A",
    orderable: false,
    render: function (data, type, row) {
      console.log(data, "datafile");
        // Check if data exists and has the file content
        if (!data || !data.file) {
            return "N/A";
        }

        // 2. Create the Data URI
        // Format: data:[<mediatype>][;base64],<data>
        const mimeType = data.type || "application/pdf";
        const fileName = data.name || "download.pdf";
        const base64Data = data.file;

        // 3. Return the link with the 'download' attribute
        return `<a href="data:${mimeType};base64,${base64Data}" 
                   download="${fileName}" 
                   class="btn btn-sm btn-icon text-decoration-none" 
                   title="Download ${fileName}">
                   <i class="fas fa-file-pdf text-danger"></i>
                </a>`;
    },
},  {
        data: "notes",
        title: notesHeader,
        className: "editableNotes text-center",
        defaultContent: "N/A",
        render: function (data) {
          return `<div class="notswrap" style="min-width:250px">${data || "N/A"}</div>`;
        },
      },
      {
        data: null,
        title: actionsHeader,
        orderable: false,
        render: function () {
          return getActionsMenu();
        },
      },
    ],

    order: [[2, "asc"]], // 'name' column

   rowGroup: {
  dataSrc: "name",
  startRender: function (rows, group) {
    console.log(rows, group, "rowsgroup");
    const totalCount = rows.count();
    const shownCount = collapsedGroups[group] || 5;
    const remainingCount = totalCount - shownCount;
    const showMore = remainingCount > 0;

    // ✅ Get complainAreaId from the first row in this group
    const rowDataArray = rows.data().toArray(); // Array of row objects
    console.log(rowDataArray, "rowDataArray");
    const complainAreaId = rowDataArray.length > 0 ? rowDataArray[0].complainAreaId : null;

    console.log(complainAreaId, "complainAreaId");

    return $("<tr/>")
      .addClass("group-header")
      .attr("data-group", group)
      .append(`<td colspan="100%" class="bg-light text-dark">
        <div class="d-flex gap-3 justify-content-between align-items-center">
          <div class="d-flex gap-1">
            <span class="toggle-group"><span class="group-toggle-icon"><i class="fas fa-minus toggle-icon"></i></span></span>
            ${group ? `<strong class="fw-bold">${group}</strong>` : ``} 
            <span class="text-muted">(${totalCount} items)</span>
            ${showMore ? `<a href="#" class="load-more-link text-primary ms-3" data-group="${group}">+ ${remainingCount} more</a>` : ""}
          </div>
          <div class="table-actions justify-content-end">
            <button class="btn btn-sm btn-danger px-2" type="button" onclick="handleComplianceParentPopUp(${complainAreaId})" >
                       Delete
              <i class="fas fa-save"></i>
            </button>
            <a data-bs-toggle="modal" data-bs-target="#task-add-modal" class="btn btn-sm btn-outline-icon" 
              style="--stratroom-btn-color:var(--stratroom-primary);--stratroom-btn-border-color:rgba(var(--stratroom-primary-rgb),0.1);--stratroom-btn-hover-color:var(--stratroom-primary);--stratroom-btn-hover-bg:rgba(var(--stratroom-primary-rgb),0.1)"
              onclick="openAddComplianceModal('${group.replace(/'/g, "\\'")}', ${complainAreaId})">
              <span class="icon"><i class="fas fa-plus"></i></span>
            </a>               
          </div>
        </div>
      </td>`);
  },
},

    drawCallback: function () {
      const api = this.api();
      const groupRows = {};

      api.rows({ page: "all" }).every(function () {
        const rowData = this.data();
        const rowNode = this.node();
        const group = rowData.name;
        groupRows[group] = groupRows[group] || [];
        groupRows[group].push(rowNode);
      });

      Object.entries(groupRows).forEach(([group, rows]) => {
        const shownCount = collapsedGroups[group] || 5;
        rows.forEach((row, idx) => {
          if (idx < shownCount) {
            $(row).show();
          } else {
            $(row).hide().addClass(`extra-${group}`);
          }
        });
      });
    },
  });

  // == COLUMN TOGGLE (same as before) ==
  const theadCells = table.table().header().rows[0].cells;
  const excludedIndices = [1, 2, 3, 4, 5, 8, 9, 10, 12];

  let columnPopoverContent = `
    <div>
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h5 class="h6 mb-0">Filter Table Columns</h5>
        <button type="button" class="btn-close" aria-label="Close"></button>
      </div>
      <div class="d-flex justify-content-between mb-2">
        <button class="btn btn-sm btn-light select-all-cols">Select All</button>
        <button class="btn btn-sm btn-light deselect-all-cols">Deselect All</button>
      </div>
      <div class="d-flex flex-column gap-2 pageViewOption">
  `;

  for (let i = 1; i < theadCells.length - 1; i++) {
    if (excludedIndices.includes(i)) continue;
    const title = $(theadCells[i]).text().trim();
    const id = `ftablethead-column-${i.toString().padStart(4, "0")}`;
    columnPopoverContent += `
      <div class="form-check">
        <input class="form-check-input filter-table-th" id="${id}" type="checkbox" value="${title}" checked data-col="${i}">
        <label class="form-check-label" for="${id}">${title}</label>
      </div>
    `;
  }
  columnPopoverContent += `</div></div>`;

  const popoverTriggerTh = document.getElementById("popoverFiltertableHead");
  new bootstrap.Popover(popoverTriggerTh, {
    html: true,
    placement: "bottom",
    content: columnPopoverContent,
    sanitize: false,
    container: "body",
  });

  popoverTriggerTh.addEventListener("shown.bs.popover", () => {
    $(".filter-table-th").each(function () {
      const colIndex = $(this).data("col");
      $(this).prop("checked", table.column(colIndex).visible());
    });
  });

  $(document).on("change", ".filter-table-th", function () {
    const colIndex = $(this).data("col");
    const visible = $(this).is(":checked");
    table.column(colIndex).visible(visible);
    const state = JSON.parse(localStorage.getItem("tableColVisibility") || "{}");
    state[colIndex] = visible;
    localStorage.setItem("tableColVisibility", JSON.stringify(state));
  });

  const savedVisibility = JSON.parse(localStorage.getItem("tableColVisibility") || "{}");
  Object.entries(savedVisibility).forEach(([colIndex, isVisible]) => {
    table.column(Number(colIndex)).visible(isVisible);
  });

  $(document).on("click", ".select-all-cols", () => {
    $(".filter-table-th").prop("checked", true).trigger("change");
  });
  $(document).on("click", ".deselect-all-cols", () => {
    $(".filter-table-th").prop("checked", false).trigger("change");
  });

  // == STATUS FILTER ==
  const statusPopoverTrigger = document.getElementById("popoverFilterStatus");
  const statusPopoverContent = `
    <div>
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h5 class="h6 mb-0">Filter Status</h5>
        <button type="button" class="btn-close" aria-label="Close"></button>
      </div>
      <div class="d-flex justify-content-between mb-2">
        <button class="btn btn-sm btn-light select-all-status">Select All</button>
        <button class="btn btn-sm btn-light deselect-all-status">Deselect All</button>
      </div>
      <div class="d-flex flex-column gap-2 pageViewOption">   
        ${["Not Started", "Pending", "Ongoing", "Effective"]
          .map(
            (status) => `
              <div class="form-check">
                <input class="form-check-input filter-status" id="status-${status.replace(/\s/g, "")}" type="checkbox" value="${status}">
                <label class="form-check-label" for="status-${status.replace(/\s/g, "")}">${status}</label>
              </div>`
          )
          .join("")}
      </div>
    </div>
  `;

  new bootstrap.Popover(statusPopoverTrigger, {
    html: true,
    placement: "bottom",
    content: statusPopoverContent,
    sanitize: false,
    container: "body",
  });

  const statusColumnIndex = $("#table-compliance thead th").filter(".editableStatus").index();

  $(document).on("change", ".filter-status", function () {
    const terms = $(".filter-status:checked").map(function () {
      return `^${$(this).val()}$`;
    }).get();
    table.column(statusColumnIndex).search(terms.length ? terms.join("|") : "", true, false).draw();
  });

  $(document).on("click", ".select-all-status", () => {
    $(".filter-status").prop("checked", true).trigger("change");
  });
  $(document).on("click", ".deselect-all-status", () => {
    $(".filter-status").prop("checked", false).trigger("change");
  });

  // == COMPLIANCE AREA FILTER ==
  // const complianceAreas = ["ESG", "GDPR", "SOX", "COBIT", "CSCRF"];
  // const compliancePopoverContent = `
  //   <div>
  //     <div class="d-flex justify-content-between align-items-center mb-2">
  //       <h5 class="h6 mb-0"><i class="fas fa-shield-alt me-1 text-primary"></i> Filter Compliance Area</h5>
  //       <button type="button" class="btn-close" aria-label="Close"></button>
  //     </div>
  //     <div class="d-flex justify-content-between mb-2">
  //       <button class="btn btn-sm btn-light select-all-compliance">Select All</button>
  //       <button class="btn btn-sm btn-light deselect-all-compliance">Deselect All</button>
  //     </div>
  //     <div class="d-flex flex-column gap-2 pageViewOption">
  //       ${complianceAreas
  //         .map(
  //           (area) => `
  //             <div class="form-check">
  //               <input class="form-check-input filter-compliance" id="ca-${area.replace(/\s+/g, "")}" type="checkbox" value="${area}" checked>
  //               <label class="form-check-label" for="ca-${area.replace(/\s+/g, "")}">${area}</label>
  //             </div>
  //           `
  //         )
  //         .join("")}
  //     </div>
  //   </div>
  // `;

  // const compliancePopoverTrigger = document.getElementById("popoverFilterComplianceArea");
  // new bootstrap.Popover(compliancePopoverTrigger, {
  //   html: true,
  //   placement: "bottom",
  //   content: compliancePopoverContent,
  //   sanitize: false,
  //   container: "body",
  // });

  const compliancePopoverTrigger = document.getElementById("popoverFilterComplianceArea");
  const complianceColumnIndex = $("#table-compliance thead th").filter(".editableCompliance_area").index();

  // $(document).on("change", ".filter-compliance", function () {
  //   const terms = $(".filter-compliance:checked").map(function () {
  //     return `^${$(this).val()}$`;
  //   }).get();
  //   table.column(complianceColumnIndex).search(terms.length ? terms.join("|") : "", true, false).draw();
  // });

  // $(document).on("click", ".select-all-compliance", () => {
  //   $(".filter-compliance").prop("checked", true).trigger("change");
  // });
  // $(document).on("click", ".deselect-all-compliance", () => {
  //   $(".filter-compliance").prop("checked", false).trigger("change");
  // });

  // Close popovers
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-close")) {
      bootstrap.Popover.getInstance(popoverTriggerTh)?.hide();
      bootstrap.Popover.getInstance(statusPopoverTrigger)?.hide();
      bootstrap.Popover.getInstance(compliancePopoverTrigger)?.hide();
    }
  });
}

  // Regulation column only
  $(document).on("click", "td.editableRegulations", function () {
    const $cell = $(this);
    const table = $("#table-compliance").DataTable();

    // Prevent editing if a select is already present
    if ($cell.find("select").length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const colIndex = $cell.index();
    const currentText = $cell.text().trim();

    // IMPORTANT: Extract current values BEFORE emptying the cell
    const currentBadges = $cell
      .find(".badge")
      .map(function () {
        return $(this).text().trim();
      })
      .get();

    console.log("currentBadges", currentBadges);

    const allRegulations = [
      "GDPR",
      "CCPA",
      "HIPAA",
      "ISO 27701",
      "GRI 101",
      "GRI 102",
      "GRI 103",
    ];
    const $select = $(
      '<select class="editor-select2" style="width:100%;" multiple></select>'
    );

    // Append options
    allRegulations.forEach((option) => {
      $select.append(`<option value="${option}">${option}</option>`);
    });

    // Replace cell content with select
    $cell.empty().append($select);

    // Parse current value to array format
    let currentValues = [];
    if (currentBadges.length > 0) {
      // Use extracted badge values
      currentValues = currentBadges;
    } else if (Array.isArray(currentText)) {
      currentValues = currentText;
    } else if (
      typeof currentText == "string" &&
      currentText.trim() !== "" &&
      currentText !== "N/A"
    ) {
      // Try to match known regulations in the text
      currentValues = allRegulations.filter((reg) => currentText.includes(reg));

      // If no matches, fall back to comma splitting
      if (currentValues.length == 0) {
        currentValues = currentText
          .split(",")
          .map((v) => v.trim())
          .filter((v) => v !== "");
      }
    }

    console.log("currentValues", currentValues);

    // Initialize Select2
    $select
      .select2({
        placeholder: "Select Regulation(s)",
        tags: true,
        width: "resolve",
        closeOnSelect: false,
      })
      .val(currentValues)
      .trigger("change");

    // Open immediately
    $select.select2("open");

    // On close, update value
    $select.on("select2:close", function () {
      const newVal = $select.val();
      const cellIndex = table.cell($cell).index();

      const rowData = table.row(cellIndex.row).data();

      console.log("Full row data:", rowData);

      console.log("newVal", newVal);

      if (newVal && newVal.length > 0) {
        // Update DataTable cell value
        table.cell(cellIndex.row, cellIndex.column).data(newVal).draw(false);

        // Replace with badge HTML
        const badgeHTML = getRegulationBadges(newVal);
        $cell.html(badgeHTML);
        const payload = {
          id: rowData.complainAreaId || null,
          complainValue: {
            createdByName: $("#userPrincipal").val(),
            ownerName: $("#userPrincipal").val(),
            name: rowData.control_description || "",
            id: rowData.control_id || null,
          },
          owner: $("#userPrincipal").val(),
          createdBy: $("#userPrincipal").val(),
          riskLevel: rowData.risk_level || "",
          status: rowData.status || "",
          lastAssessmentDate: rowData.last_assessment_date || "",
          nextReviewDate: rowData.next_review_date || "",
          actionDueDate: rowData.action_due_date || "",
          lastAuditDate: rowData.last_audit_date ? rowData.last_audit_date : "",
          deptId: rowData.dept_id ? rowData.dept_id : null,
          complainAreaId: rowData.complainAreaId || null,
        };

        console.log("Payload for update:", payload);
      } else {
        table.cell(cellIndex.row, cellIndex.column).data(null).draw(false);
        $cell.html('<span class="text-muted">N/A</span>');
      }
    });
  });

  // Risk Level column only
  $(document).on("click", "td.editableRisk_level", function () {
    const $cell = $(this);
    const table = $("#table-compliance").DataTable();

    // Prevent editing if a select is already present
    if ($cell.find("select").length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const colIndex = $cell.index();
    const currentText = $cell.text().trim();
    const risk_levelOptions = ["Critical", "High", "Medium", "Low"];
    const $select = $(
      '<select class="editor-select2" style="width:100%;"></select>'
    );

    // Append options
    risk_levelOptions.forEach((option) => {
      $select.append(`<option value="${option}">${option}</option>`);
    });

    // Replace cell content with select
    $cell.empty().append($select);

    // Initialize Select2
    $select
      .select2({
        placeholder: "Select Risk Level",
        width: "resolve",
      })
      .val(currentText)
      .trigger("change");

    // Open immediately
    $select.select2("open");

    // On close, update value
    $select.on("select2:close", function () {
      const newVal = $select.val();
      const cellIndex = table.cell($cell).index();

      const rowData = table.row(cellIndex.row).data();

      console.log(newVal);

      if (newVal) {
        // Update DataTable cell value
        table.cell(cellIndex.row, cellIndex.column).data(newVal).draw(false);

        // Replace with badge HTML
        const badgeHTML = getRiskLevelBadge(newVal);
        $cell.html(badgeHTML);

        const payload = {
          id: rowData.complainAreaId || null,
          complainValue: {
            createdByName: $("#userPrincipal").val(),
            ownerName: $("#userPrincipal").val(),
            name: rowData.control_description || "",
            id: rowData.control_id || null,
          },
          owner: $("#userPrincipal").val(),
          createdBy: $("#userPrincipal").val(),
          riskLevel: rowData.risk_level || "",
          status: rowData.status || "",
          lastAssessmentDate: rowData.last_assessment_date || "",
          nextReviewDate: rowData.next_review_date || "",
          actionDueDate: rowData.action_due_date || "",
          lastAuditDate: rowData.last_audit_date ? rowData.last_audit_date : "",
          deptId: rowData.dept_id ? rowData.dept_id : null,
          complainAreaId: rowData.complainAreaId || null,
        };
      } else {
        $cell.text("N/A");
      }
    });
  });

  // Control Type column only
  $(document).on("click", "td.editableControl_type", function () {
    const $cell = $(this);
    const table = $("#table-compliance").DataTable();

    // Prevent editing if a select is already present
    if ($cell.find("select").length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const colIndex = $cell.index();
    const currentText = $cell.text().trim();

    const control_typeOptions = ["Preventive", "Detective", "Corrective"];
    const $select = $(
      '<select class="editor-select2" style="width:100%;"></select>'
    );

    // Append options
    control_typeOptions.forEach((option) => {
      $select.append(`<option value="${option}">${option}</option>`);
    });

    // Replace cell content with select
    $cell.empty().append($select);

    // Initialize Select2
    $select
      .select2({
        placeholder: "Select Control Type",
        width: "resolve",
      })
      .val(currentText)
      .trigger("change");

    // Open immediately
    $select.select2("open");

    // On close, update value
    $select.on("select2:close", function () {
      const newVal = $select.val();
      const cellIndex = table.cell($cell).index();

      console.log(newVal);

      const rowData = table.row(cellIndex.row).data();

      if (newVal) {
        // Update DataTable cell value
        table.cell(cellIndex.row, cellIndex.column).data(newVal).draw(false);

        // Replace with badge HTML
        const badgeHTML = getControlTypeBadge(newVal);
        $cell.html(badgeHTML);

        const payload = {
          id: rowData.complainAreaId || null,
          complainValue: {
            createdByName: $("#userPrincipal").val(),
            ownerName: $("#userPrincipal").val(),
            name: rowData.control_description || "",
            id: rowData.control_id || null,
          },
          owner: $("#userPrincipal").val(),
          createdBy: $("#userPrincipal").val(),
          riskLevel: rowData.risk_level || "",
          status: rowData.status || "",
          lastAssessmentDate: rowData.last_assessment_date || "",
          nextReviewDate: rowData.next_review_date || "",
          actionDueDate: rowData.action_due_date || "",
          lastAuditDate: rowData.last_audit_date ? rowData.last_audit_date : "",
          deptId: rowData.dept_id ? rowData.dept_id : null,
          complainAreaId: rowData.complainAreaId || null,
        };

        console.log("Payload for update:", payload);
      } else {
        $cell.text("N/A");
      }
    });
  });

  // Implementation Status column only
  $(document).on("click", "td.editableImplementation_status", function () {
    const $cell = $(this);
    const table = $("#table-compliance").DataTable();

    // Prevent editing if a select is already present
    if ($cell.find("select").length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const colIndex = $cell.index();
    const currentText = $cell.text().trim();

    const implement_statusOptions = [
      "Planned",
      "In Progress",
      "Implemented",
      "Not Applicable",
    ];
    const $select = $(
      '<select class="editor-select2" style="width:100%;"></select>'
    );

    // Append options
    implement_statusOptions.forEach((option) => {
      $select.append(`<option value="${option}">${option}</option>`);
    });

    // Replace cell content with select
    $cell.empty().append($select);

    // Initialize Select2
    $select
      .select2({
        placeholder: "Select Implementation Status",
        width: "resolve",
      })
      .val(currentText)
      .trigger("change");

    // Open immediately
    $select.select2("open");

    // On close, update value
    $select.on("select2:close", function () {
      const newVal = $select.val();
      const cellIndex = table.cell($cell).index();

      console.log(newVal);

      const rowData = table.row(cellIndex.row).data();

      if (newVal) {
        // Update DataTable cell value
        table.cell(cellIndex.row, cellIndex.column).data(newVal).draw(false);

        // Replace with badge HTML
        const badgeHTML = getImplementationStatusBadge(newVal);
        $cell.html(badgeHTML);

        const payload = {
          id: rowData.complainAreaId || null,
          complainValue: {
            createdByName: $("#userPrincipal").val(),
            ownerName: $("#userPrincipal").val(),
            name: rowData.control_description || "",
            id: rowData.control_id || null,
          },
          owner: $("#userPrincipal").val(),
          createdBy: $("#userPrincipal").val(),
          riskLevel: rowData.risk_level || "",
          status: rowData.status || "",
          lastAssessmentDate: rowData.last_assessment_date || "",
          nextReviewDate: rowData.next_review_date || "",
          actionDueDate: rowData.action_due_date || "",
          lastAuditDate: rowData.last_audit_date ? rowData.last_audit_date : "",
          deptId: rowData.dept_id ? rowData.dept_id : null,
          complainAreaId: rowData.complainAreaId || null,
        };

        console.log("Payload for update:", payload);
      } else {
        $cell.text("N/A");
      }
    });
  });

  // Date
  $(document).on(
    "click",
    "td.editableLast_assessment_date, td.editableNext_review_date, td.editableLast_audit_date, td.editableAction_due_date",
    function () {
      const $cell = $(this);
      const table = $("#table-compliance").DataTable();

      // Prevent editing if a select is already present
      if ($cell.find("select").length > 0) return;
      if ($cell.find("input, textarea").length > 0) return;

      const colIndex = $cell.index();
      const currentText = $cell.text().trim();

      const parsedDate = currentText ? parseCustomDate(currentText) : null;

      console.log(parsedDate);

      // Create readonly input (prevent manual typing)
      const $input = $(
        '<input type="text" readonly class="form-control form-control-sm" style="min-width:150px;" />'
      );
      $cell.empty().append($input);

      // Get cell index for updating DataTable
      const cellIndex = table.cell($cell).index();

      // Init flatpickr
      const flatpickrInstance = $input.flatpickr({
        dateFormat: "Y-m-d", // internal format
        defaultDate: parsedDate,
        allowInput: true,
        onClose: function (selectedDates, dateStr, instance) {
          const cellIndex = table.cell($cell).index();

          if (selectedDates.length) {
            const formatted = formatToCustomDate(selectedDates[0]); // Sep15, 2025
            $cell.text(formatted);

            // Update DataTable cell data
            table
              .cell(cellIndex.row, cellIndex.column)
              .data(formatted)
              .draw(false);

            // Get updated row data
            const updatedRowData = table.row(cellIndex.row).data();

            // Update specific field based on column class
            if ($cell.hasClass("editableLast_assessment_date")) {
              updatedRowData.last_assessment_date = formatted;
            } else if ($cell.hasClass("editableNext_review_date")) {
              updatedRowData.next_review_date = formatted;
            } else if ($cell.hasClass("editableLast_audit_date")) {
              updatedRowData.last_audit_date = formatted;
            } else if ($cell.hasClass("editableAction_due_date")) {
              updatedRowData.action_due_date = formatted;
            }

            // Call your handler function
            handleRowUpdate(updatedRowData);
          } else {
            // No selection, restore original
            $cell.text(currentText);
            // Restore original data in DataTable
            table
              .cell(cellIndex.row, cellIndex.column)
              .data(currentText || null)
              .draw(false);
          }
        },
        onChange: function (selectedDates, dateStr, instance) {
          // Optional: Handle date change if needed
          if (selectedDates.length) {
            console.log("Date changed to:", selectedDates[0]);
          }
        },
      });

      // Auto open calendar
      setTimeout(() => {
        $input.focus();
        flatpickrInstance.open();
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

  // Status column only
  $(document).on("click", "td.editableStatus", function () {
    const $cell = $(this);
    const table = $("#table-compliance").DataTable();

    // Prevent editing if a select is already present
    if ($cell.find("select").length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const colIndex = $cell.index();
    const currentText = $cell.text().trim();

    const statusOptions = ["Not Started", "Pending", "Ongoing", "Effective"];
    const $select = $(
      '<select class="editor-select2" style="width:100%;"></select>'
    );

    // Append options
    statusOptions.forEach((option) => {
      $select.append(`<option value="${option}">${option}</option>`);
    });

    // Replace cell content with select
    $cell.empty().append($select);

    // Initialize Select2
    $select
      .select2({
        placeholder: "Select Status",
        width: "resolve",
      })
      .val(currentText)
      .trigger("change");

    // Open immediately
    $select.select2("open");

    // On close, update value
    $select.on("select2:close", function () {
      const newVal = $select.val();
      const cellIndex = table.cell($cell).index();

      console.log(newVal);

      const rowData = table.row(cellIndex.row).data();

      if (newVal) {
        // Update DataTable cell value
        table.cell(cellIndex.row, cellIndex.column).data(newVal).draw(false);

        // Replace with badge HTML
        const badgeHTML = getStatusBadge(newVal);
        $cell.html(badgeHTML);

        const payload = {
          id: rowData.complainAreaId || null,
          complainValue: {
            createdByName: $("#userPrincipal").val(),
            ownerName: $("#userPrincipal").val(),
            name: rowData.control_description || "",
            id: rowData.control_id || null,
          },
          owner: $("#userPrincipal").val(),
          createdBy: $("#userPrincipal").val(),
          riskLevel: rowData.risk_level || "",
          status: rowData.status || "",
          lastAssessmentDate: rowData.last_assessment_date || "",
          nextReviewDate: rowData.next_review_date || "",
          actionDueDate: rowData.action_due_date || "",
          lastAuditDate: rowData.last_audit_date ? rowData.last_audit_date : "",
          deptId: rowData.dept_id ? rowData.dept_id : null,
          complainAreaId: rowData.complainAreaId || null,
        };

        console.log("Payload for update:", payload);
      } else {
        $cell.text("N/A");
      }
    });
  });

  // Audit Required column only
  $(document).on("click", "td.editableAudit_required", function () {
    const $cell = $(this);
    const table = $("#table-compliance").DataTable();

    // Prevent editing if a select is already present
    if ($cell.find("select").length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const colIndex = $cell.index();
    const currentText = $cell.text().trim();

    const audit_requiredOptions = ["Yes", "No", "Not Applicable"];
    const $select = $(
      '<select class="editor-select2" style="width:100%;"></select>'
    );

    // Append options
    audit_requiredOptions.forEach((option) => {
      $select.append(`<option value="${option}">${option}</option>`);
    });

    // Replace cell content with select
    $cell.empty().append($select);

    // Initialize Select2
    $select
      .select2({
        placeholder: "Select Status",
        width: "resolve",
      })
      .val(currentText)
      .trigger("change");

    // Open immediately
    $select.select2("open");

    // On close, update value
    $select.on("select2:close", function () {
      const newVal = $select.val();
      const cellIndex = table.cell($cell).index();

      console.log(newVal);

      const rowData = table.row(cellIndex.row).data();

      if (newVal) {
        // Update DataTable cell value
        table.cell(cellIndex.row, cellIndex.column).data(newVal).draw(false);

        // Replace with badge HTML
        const badgeHTML = getAuditRequiredBadge(newVal);
        $cell.html(badgeHTML);

        const payload = {
          id: rowData.complainAreaId || null,
          complainValue: {
            createdByName: $("#userPrincipal").val(),
            ownerName: $("#userPrincipal").val(),
            name: rowData.control_description || "",
            id: rowData.control_id || null,
          },
          owner: $("#userPrincipal").val(),
          createdBy: $("#userPrincipal").val(),
          riskLevel: rowData.risk_level || "",
          status: rowData.status || "",
          lastAssessmentDate: rowData.last_assessment_date || "",
          nextReviewDate: rowData.next_review_date || "",
          actionDueDate: rowData.action_due_date || "",
          lastAuditDate: rowData.last_audit_date ? rowData.last_audit_date : "",
          deptId: rowData.dept_id ? rowData.dept_id : null,
          complainAreaId: rowData.complainAreaId || null,
        };

        console.log("Payload for update:", payload);
      } else {
        $cell.text("N/A");
      }
    });
  });

  // Notes column only

  $(document).on(
    "click",
    "td.editableControl_description, td.editableNotes",
    function () {
      const $cell = $(this);
      const table = $("#table-compliance").DataTable();

      // Prevent editing if already editing
      if ($cell.find("textarea").length > 0) return;

      const currentText = $cell.text().trim();
      const editor = $(
        '<textarea class="form-control form-control-sm text-center" rows="2"></textarea>'
      );

      editor.val(currentText);
      $cell.empty().append(editor);
      editor.focus().select();

      editor.on("blur", function () {
        const newVal = editor.val().trim();
        const cellIndex = table.cell($cell).index();

        // Update the cell display
        $cell.html(
          `<div class="notswrap" style="min-width:250px">${
            newVal || "N/A"
          }</div>`
        );

        // Update DataTable cell data
        table
          .cell(cellIndex.row, cellIndex.column)
          .data(newVal || null)
          .draw(false);

        // Get the updated row data
        const updatedRowData = table.row(cellIndex.row).data();

        // Update the specific field based on column class
        if ($cell.hasClass("editableControl_description")) {
          updatedRowData.control_description = newVal || null;
        } else if ($cell.hasClass("editableNotes")) {
          updatedRowData.notes = newVal || null;
        }

        // Call your handler function with the full row data
        handleRowUpdate(updatedRowData);
      });

      // Also handle Enter key press (optional)
      editor.on("keydown", function (e) {
        if (e.key == "Enter" && !e.shiftKey) {
          e.preventDefault();
          $(this).blur();
        }
      });
    }
  );
  $(document).on(
    "click",
    "td.editableAudit_findings,td.editableCorrective_actions",
    function () {
      const $cell = $(this);
      const table = $("#table-compliance").DataTable();

      // Prevent editing if a select is already present
      if ($cell.find("select").length > 0) return;
      if ($cell.find("input, textarea").length > 0) return;

      const colIndex = $cell.index();
      const currentText = $cell.text().trim();
      const editor = $(
        '<input type="text" class="form-control form-control-sm text-center">'
      );
      editor.val(currentText);
      $cell.empty().append(editor);
      editor.focus().select();

      editor.on("blur", function () {
        const newVal = editor.val().trim();
        const cellIndex = table.cell($cell).index();

        // Update the cell display
        $cell.html(`${newVal || "N/A"}`);

        // Update DataTable cell data
        table
          .cell(cellIndex.row, cellIndex.column)
          .data(newVal || null)
          .draw(false);

        // Get the updated row data
        const updatedRowData = table.row(cellIndex.row).data();

        // Update specific field based on column class
        if ($cell.hasClass("editableAudit_findings")) {
          updatedRowData.audit_findings = newVal || null;
        } else if ($cell.hasClass("editableCorrective_actions")) {
          updatedRowData.corrective_actions = newVal || null;
        }

        // Call your handler function with the full row data
        handleRowUpdate(updatedRowData);
      });
    }
  );

  $(`#table-compliance`).on("click", ".toggle-group", function () {
    const groupName = $(this).closest("tr").data("group");
    collapsedGroups[groupName] = !collapsedGroups[groupName];

    const table = $(`#table-compliance`).DataTable();
    table.rows().every(function () {
      const rowData = this.data();
      const rowNode = this.node();
      if (rowData.name == groupName) {
        if (collapsedGroups[groupName]) {
          $(rowNode).hide();
        } else {
          $(rowNode).show();
        }
      }
    });

    // Update icon
    const $icon = $(this).find(".group-toggle-icon");
    $icon.html(
      collapsedGroups[groupName]
        ? '<i class="fas fa-plus toggle-icon"></i>'
        : '<i class="fas fa-minus toggle-icon"></i>'
    );
  });

  $(document).on("click", ".load-more-link", function (e) {
    e.preventDefault();
    const group = $(this).data("group");
    collapsedGroups[group] = (collapsedGroups[group] || 10) + 10;
    $("#table-compliance").DataTable().draw(false);
  });
});

function getRegulationBadges(regulations) {
  // Ensure regulations is an array
  if (!Array.isArray(regulations)) {
    // Handle different data types
    if (typeof regulations == "string") {
      regulations = regulations.split(",").map((r) => r.trim());
    } else if (regulations == null || regulations == "") {
      return '<span class="text-muted">N/A</span>';
    } else {
      regulations = [];
    }
  }

  // Filter out empty values
  regulations = regulations.filter((reg) => reg && reg.trim() !== "");

  if (regulations.length == 0) {
    return '<span class="text-muted">N/A</span>';
  }

  // Define color classes to cycle through for badges
  const colorClasses = ["label-bg-blue", "label-bg-orange"];

  // Generate badge HTML for each regulation
  const badgesHTML = regulations
    .map((regulation, index) => {
      const colorClass = colorClasses[index % colorClasses.length];
      return `<span class="badge ${colorClass} rounded-pill">${regulation}</span>`;
    })
    .join(" "); // Add space between badges

  // Wrap badges in flex container
  return `<div class="d-flex gap-1 flex-wrap">${badgesHTML}</div>`;
}

function renderRegulationBadges(data) {
  return getRegulationBadges(data);
}

// risk_levelOptions
function getRiskLevelBadge(level) {
  console.log(level , "level")
  const colorMap = {
    Critical : "label-bg-red",
    High: "label-bg-red",
    Medium: "label-bg-yellow",
    Low: "label-bg-green",
    high: "label-bg-red",
    medium: "label-bg-yellow",
    low: "label-bg-green",
  };
  const badgeClass = colorMap[level] || "label-bg-secondary";
  return `<span class="badge ${badgeClass} rounded-pill dropdown-toggle ms-auto">${
    level || "N/A"
  }</span>`;
}
// getControlTypeBadge
function getControlTypeBadge(control_type) {
  const control_typeMap = {
    preventive: "label-bg-red",
    detective: "label-bg-yellow",
    corrective: "label-bg-green",
    Preventive: "label-bg-red",
    Detective: "label-bg-yellow",
    Corrective: "label-bg-green",
  };
  const badgeControlTypeClass =
    control_typeMap[control_type] || "label-bg-gray";
  return `<span class="badge ${badgeControlTypeClass} rounded-pill dropdown-toggle ms-auto">${
    control_type || "N/A"
  }</span>`;
}
// getImplementationStatusBadger
function getImplementationStatusBadge(implement_status) {
  console.log("implemenStatus", implement_status)
  const implement_statusMap = {
    Implemented: "label-bg-red",
    "In Progress" :"label-bg-yellow",
    "Implemented" : "label-bg-green",
    "Planned" : "label-bg-orange",
    "Not Applicable": "label-bg-red",
    "Partially Implemented": "label-bg-green",
  };
  const badgeImplementStatusClass =
    implement_statusMap[implement_status] || "label-bg-gray";
  return `<span class="badge ${badgeImplementStatusClass} rounded-pill dropdown-toggle ms-auto">${
    implement_status || "N/A"
  }</span>`;
}

// getStatusBadge
function getStatusBadge(status) {
  const statusMap = {
    "Not Started": "status-bg-red",
    Pending: "status-bg-yellow",
    Ongoing: "status-bg-blue",
    Effective: "status-bg-green",
    complaint :  "status-bg-green",
    "non-compliant": "status-bg-red",
  };
  const badgeStatusClass = statusMap[status] || "label-bg-gray";
  return `<span class="badge ${badgeStatusClass} rounded-pill dropdown-toggle ms-auto">${
    status || "N/A"
  }</span>`;
}

// getAuditRequiredBadge
function getAuditRequiredBadge(audit_required) {
  const auditRequiredMap = {
    yes: "status-bg-green",
    Yes : "status-bg-green",
    no: "status-bg-red",
    No: "status-bg-red",
    "Not Applicable": "status-bg-yellow",
  };
  const badgeAuditRequiredClass =
    auditRequiredMap[audit_required] || "label-bg-gray";
  return `<span class="badge ${badgeAuditRequiredClass} rounded-pill dropdown-toggle ms-auto">${
    audit_required || "N/A"
  }</span>`;
}

// getActionsMenu
function getActionsMenu() {
  return `         
                <div class="table-actions justify-content-end">
                 <button class="btn btn-sm btn-primary px-2" type="button" onclick="handleComplianceRowUpdate(this)" >
                       Save
                    <i class="fas fa-save"></i>
                    </button>
                <div class="dropdown">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                        <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                    </button>
                    <ul class="dropdown-menu border-0 shadow">                      
                        <li>
                          <a class="dropdown-item edit-task"
                            href="#"
                            data-compliance-id=""
                            data-bs-target="#task-add-modal">
                            Edit
                          </a>
                        </li>

                        <li><a class="dropdown-item delete-task" href="#delete-modal" data-bs-toggle="modal">Delete</a></li>
                    </ul>
                </div>
            </div></div>`;
}

//Upadate Tabel data
function handleRowUpdate(rowData) {
  console.log("Row updated:", rowData);

  const payload = {
    id: rowData.complainAreaId || null,
    complainValue: {
      createdByName: $("#userPrincipal").val(),
      ownerName: $("#userPrincipal").val(),
      name: rowData.control_description || "",
      id: rowData.control_id || null,
    },
    owner: $("#userPrincipal").val(),
    createdBy: $("#userPrincipal").val(),
    riskLevel: rowData.risk_level || "",
    status: rowData.status || "",
    lastAssessmentDate: rowData.last_assessment_date || "",
    nextReviewDate: rowData.next_review_date || "",
    actionDueDate: rowData.action_due_date || "",
    lastAuditDate: rowData.last_audit_date ? rowData.last_audit_date : "",
    deptId: rowData.dept_id ? rowData.dept_id : null,
    complainAreaId: rowData.complainAreaId || null,
  };

  console.log(payload, "payload for update request");
}

const page_compliance_en = {
  title: "Compliance Management",
  "Compliance Description": "Compliance Description",
  "Control ID": "Control ID",
  "Control Description": "Control Description",
  "Compliance Area": "Compliance Area",
  "Applicable Regulation": "Applicable Regulation",
  "Risk Level": "Risk Level",
  "Control Type": "Control Type",
  "Implementation Status": "Implementation Status",
  "Last Assessment Date": "Last Assessment Date",
  "Next Review Date": "Next Review Date",
  Status: "Status",
  "Audit Required": "Audit Required",
  "Last Audit Date": "Last Audit Date",
  "Audit Findings": "Audit Findings",
  "Corrective Actions": "Corrective Actions",
  "Action Due Date": "Action Due Date",
  "Evidence File Reference": "Evidence File Reference",
  Notes: "Notes",
  Cancel: "Cancel",
  Save: "Save",
  "Created By": "Created By",
  "Modified By": "Modified By",
  "Created Date": "Created Date",
  "Modified Date": "Modified Date",
};

const page_compliance_ar = {
  title: "إدارة الامتثال",
  "Compliance Description": "وصف الامتثال",
  "Control ID": "معرف التحكم",
  "Control Description": "وصف التحكم",
  "Compliance Area": "مجال الامتثال",
  "Applicable Regulation": "اللائحة السارية",
  "Risk Level": "مستوى المخاطر",
  "Control Type": "نوع التحكم",
  "Implementation Status": "حالة التنفيذ",
  "Last Assessment Date": "تاريخ التقييم الأخير",
  "Next Review Date": "تاريخ المراجعة التالية",
  Status: "الحالة",
  "Audit Required": "التدقيق مطلوب",
  "Last Audit Date": "تاريخ آخر تدقيق",
  "Audit Findings": "نتائج التدقيق",
  "Corrective Actions": "الإجراءات التصحيحية",
  "Action Due Date": "تاريخ استحقاق الإجراء",
  "Evidence File Reference": "مرجع ملف الأدلة",
  Notes: "ملاحظات",
  Cancel: "إلغاء",
  Save: "حفظ",
  "Created By": "تم الإنشاء بواسطة",
  "Modified By": "تم التعديل بواسطة",
  "Created Date": "تاريخ الإنشاء",
  "Modified Date": "تاريخ التعديل",
};

//Language Wrokflow
function getNestedValue(obj, path) {
  return path
    .split(".")
    .reduce((o, key) => (o && o[key] !== undefined ? o[key] : null), obj);
}

function loadLanguage(lang) {
  let translation;

  if (lang == "ar") {
    translation = page_compliance_ar;
  } else {
    translation = page_compliance_en;
  }

  document.querySelectorAll("[data-translate]").forEach((el) => {
    const path = el.getAttribute("data-translate");
    const value = getNestedValue(translation, path);
    if (value !== null) {
      el.textContent = value;
    }
  });

  console.log(lang, "language loaded");
}





function openAddComplianceModal(groupName, id) {
  console.log(id, "groupId")
  $("#controlId").val(id || "");
}


function generateUniqueFileReference() {
        var timestamp = new Date().getTime();
        var random = Math.random().toString(36).substring(2, 15);
        return timestamp + '_' + random;
    }

   


function handleComplianceSave() {
  console.log("handleComplianceSave called");

  const val = (selector) => $(selector).val()?.trim() || "";

  
  const applicableRegulations = $("#applicableRegulation-add").val() || [];


  // const complainValue = {
  //   createdByName: val("#userPrincipal"),
  //   ownerName: val("#userPrincipal"),
  //   name: val("#complianceArea-add"), 
  //   complainAreaId: null, 
  //   controlDescription: val("#controlDescription-add"),
  //   regulationORStandar: applicableRegulations.join(", "), 
  //   controlType: val("#controlType-add"),
  //   implementationStatus: val("#implementationStatus-add"),
  //   auditRequired: val("#auditRequired-add"),
  //   notes: val("#notes-add"),
  //   controlId: val("#controlID-add") || "AUTO", 
  // };

  // // Main payload
  // const payload = {
  //   id: "", 
  //   complainValue: complainValue,
  //   owner: val("#userPrincipal"),
  //   createdBy: val("#userPrincipal"),
  //   updatedBy: null,
  //   riskLevel: val("#riskLevel-add"),
  //   status: val("#taskStatus-add") === "compliant" ? "Effective" : "NonComplain", // Map UI to backend enum
  //   lastAssessmentDate: val("#lastAssessmentDate-add") || null,
  //   nextReviewDate: val("#nextReviewDate-add") || null,
  //   actionDueDate: val("#actionDueDate-add") || null,
  //   lastAuditDate: val("#lastAuditDate-add") || null,
  //   deptId: $("#deptId").val() || "524",
  //   complainAreaId: "",   
  //   active: 1,
  // };
var uniqueFileReference = generateUniqueFileReference();
      

  const payload = {
    id: $("#complianceId").val() || null,
    complainAreaId : $("#controlId").val() || null,
    createdByName: val("#userPrincipal"),
    createdBy: val("#userPrincipal"),
    ownerName: val("#userPrincipal"),
    name: val("#controlDescription-add"),
    pageId : pageId || "",
    complainceAttachment : {
        "name": documentData.name ? documentData.name : compliancefileData?.name ? compliancefileData.name : "",
        "type": documentData.type ? documentData.type : compliancefileData?.type ? compliancefileData.type : "",
        "uploadedOn": new Date(),
        "size": documentData.size ? documentData.size : compliancefileData?.size ? compliancefileData.size : "",
        "file": documentData.file ? documentData.file : compliancefileData?.file ? compliancefileData.file : "",
        "complainDetalId" : $("#complianceId").val() || null,
        "id": compliancefileData?.id || null,
        "uniqueFileReference": uniqueFileReference || (compliancefileData?.uniqueFileReference ? compliancefileData.uniqueFileReference : ""),
    },
    complainValue: {
      pageId : pageId || "",
      desc: $("#controlDescription-add").val() || "",
      ownerName: val("#userPrincipal") || "N/A",
      ownerids : $("#userId").val() || "N/A", 
      responsible : val("#userPrincipal") || "N/A",
      name: $("#controller-name").val() || "",
      complainAreaId : $("#controlId").val() || null,
      complianceArea : val("#complianceArea-add"),
      applicableRegulations : $("#applicableRegulation-add").val() || "",
      riskLevel : val("#riskLevel-add"),
      controlType : val("#controlType-add"),
      implementationStatus : val("#implementationStatus-add"),
      lastAssessmentDate : val("#lastAssessmentDate-add") || null,
      nextReviewDate : val("#nextReviewDate-add") || null,
      status : val("#taskStatus-add") || "",
      auditRequired : val("#auditRequired-add"),
      lastAuditDate : val("#lastAuditDate-add") || null,
      auditFindings : val("#auditFindings-add"),
      correctiveActions : val("#correctiveActions-add"),
      actionDueDate : val("#actionDueDate-add") || null,
      evidenceFileReference : val("#evidenceFileReference-add"),
      notes : val("#notes-add"),
    }
  }

  console.log("Prepared payload for save:", payload);

  $.ajax({
    url: "/stratroom/compliance",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(payload),
    success: function(res) {
      window.location.reload();
    },
    error: function(err) {
    }
  });
}

function setValue(id, value) {
  if (value !== undefined && value !== null && value !== "") {
    $(id).val(value).trigger("change");
  } else {
    $(id).val("").trigger("change");
  }
}


$(document).on("click", ".edit-task", function (e) {
  e.preventDefault();

  // 🔹 Get the clicked row
  const tr = $(this).closest("tr");

  // 🔹 Get full row data from DataTable
  const rowData = table.row(tr).data();

  console.log("Row Data:", rowData);

  // 🔹 Extract id (change key if needed)
  const taskId = rowData?.control_id;

  if (!taskId) {
    alert("Task ID not found");
    return;
  }

  // 🔹 Call API
  $.ajax({
    url: `/stratroom/compliance/${taskId}`,
    type: "GET",
    success: function (res) {
      compliancefileData = res.complainceAttachment || {},
      console.log("API Response:", res);
       const v = res.complainValue || {};
      $("#complianceId").val(res.id || "");
      $("#controlId").val(res.complainAreaId);
      $("#controlDescription-add").val(v.desc || "");
      $("#auditFindings-add").val(v.auditFindings || "");
      $("#correctiveActions-add").val(v.correctiveActions || "");
      $("#notes-add").val(v.notes || "");
      $("#controlIdValue").val(v.controlId || "");
      $("#ownerids").val(v.ownerids || "");

  // 🔹 Select dropdowns
  setValue("#complianceArea-add", v.complianceArea);
  setValue("#riskLevel-add", v.riskLevel);
  setValue("#controlType-add", v.controlType);
  setValue("#implementationStatus-add", v.implementationStatus);
  setValue("#taskStatus-add", v.status);
  setValue("#auditRequired-add", v.auditRequired);

  // 🔹 Dates
  $("#lastAssessmentDate-add").val(v.lastAssessmentDate || "");
  $("#nextReviewDate-add").val(v.nextReviewDate || "");
  $("#lastAuditDate-add").val(v.lastAuditDate || "");
  $("#actionDueDate-add").val(v.actionDueDate || "");

  // 🔹 Applicable regulation (single value)
  if (v.applicableRegulations) {
    $("#applicableRegulation-add")
      .val([v.applicableRegulations])
      .trigger("change");
  }

  function formatDateDDMMYYYY(dateStr) {
  if (!dateStr) return "—";

  const datePart = dateStr.split("T")[0]; // "2025-07-22"
  const [yyyy, mm, dd] = datePart.split("-");

  return `${dd}-${mm}-${yyyy}`;
}


  // 🔹 Audit info (footer)
  $(".audit-box:eq(0) .text").text(v.createdByName || "—");
  $(".audit-box:eq(1) .text").text(res.updatedBy || "—");
  // $(".audit-box:eq(2) .text").text(res.createdTime || "—");
  // $(".audit-box:eq(3) .text").text(res.updatedTime || "—");

  $(".audit-box:eq(2) .text").text(
    formatDateDDMMYYYY(res.createdTime)
  );

  $(".audit-box:eq(3) .text").text(
    formatDateDDMMYYYY(res.updatedTime)
  );

      

      // 🔹 Show modal
      new bootstrap.Modal(
        document.getElementById("task-add-modal")
      ).show();
    },
    error: function () {
      alert("Failed to load task data");
    }
  });
});


$(document).on("click", ".delete-task", function (e) {
  e.preventDefault();

  const tr = $(this).closest("tr");

  const rowData = table.row(tr).data();

  console.log("Row Data:", rowData);

  const taskId = rowData?.control_id;
  deleteComplainId = taskId;

});

function handleComplianceDelete() {
  if (!deleteComplainId) {
    alert("No Compliance selected for deletion.");
    return;
  }
  $.ajax({
    url: `/stratroom/compliance/${deleteComplainId}`,
    type: "DELETE",
    success: function (res) {
      console.log("Delete Response:", res);
      window.location.reload();
    }
  });
}



//file upload:


// Global objects
var attachment = {
  kpiAttachment: []
};

var documentData = {};
window.documentsValue = null;

document.querySelectorAll('.file-input').forEach((inputEl) => {

  const uploadBox = inputEl.closest('.upload-box');

  // Generate unique reference
  function generateUniqueReference() {
    return Date.now() + '_' + Math.random().toString(36).substring(2, 10);
  }

  // Convert file to Base64
  function getFileContentAsBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const base64String = event.target.result.split(',')[1];
      callback(base64String);
    };
    reader.readAsDataURL(file);
  }

  // Update global document values
  function updateDocumentsValue() {
    if (attachment.kpiAttachment.length > 0) {
      const fileObj = attachment.kpiAttachment[0];

      getFileContentAsBase64(fileObj.file, function (base64Content) {

        window.documentsValue = {
          file: base64Content,
          name: fileObj.file.name,
          size: fileObj.file.size + ' bytes',
          type: fileObj.file.type,
          uniqueFileReference: fileObj.uniqueFileReference,
          uploadedOn: fileObj.uploadedOn
        };

        documentData = { ...window.documentsValue };
         inputEl.setAttribute("title", fileObj.file.name)

        console.log("documentsValue updated:", window.documentsValue);
      });

    } else {
      window.documentsValue = null;
      documentData = {};
      console.log("documentsValue cleared");
    }
  }

  // Handle file selection
  inputEl.addEventListener('change', () => {
    const files = Array.from(inputEl.files);

    // Keep only ONE file (change if multiple needed)
    attachment.kpiAttachment = [];

    files.forEach(file => {
      attachment.kpiAttachment.push({
        file: file,
        uploadedOn: new Date(),
        uniqueFileReference: generateUniqueReference()
      });
    });

    inputEl.value = ""; // reset input
    updateDocumentsValue();
  });

  if(uploadBox){
  // Drag over
  uploadBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadBox.classList.add('border-primary');
  });

  // Drag leave
  uploadBox.addEventListener('dragleave', () => {
    uploadBox.classList.remove('border-primary');
  });

  // Drop file
  uploadBox.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadBox.classList.remove('border-primary');

    const droppedFiles = Array.from(e.dataTransfer.files);

    // Keep only ONE file
    attachment.kpiAttachment = [];

    droppedFiles.forEach(file => {
      attachment.kpiAttachment.push({
        file: file,
        uploadedOn: new Date(),
        uniqueFileReference: generateUniqueReference()
      });
    });

    updateDocumentsValue();
  });

  }

});


  console.log(documentData,  "documentData");


  //filr download code 
  $(document).on("click", ".download-evidence", function () {
    console.log("attachment for download");
  

  
});


function downloadBase64File(base64Data, mimeType, fileName) {
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });

  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


//editable feilds
$(document).on("click", "td.editableControl_description, td.editableNotes", function() {
    const $cell = $(this);
    const table = $('#table-compliance').DataTable();

    // Prevent editing if a select is already present
    if ($cell.find('select').length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const colIndex = $cell.index();
    const currentText = $cell.text().trim();


  const editor = $('<textarea class="form-control form-control-sm text-center" rows="2"></textarea>');
  editor.val(currentText);
  $cell.empty().append(editor);
  editor.focus().select();
  editor.on("blur change", function () {
    const newVal = editor.val().trim();
    $cell.html(`<div class="notswrap" style="min-width:250px">${newVal}</div>`);
  });
});


$(document).on("click", "td.editableRegulations", function() {
    const $cell = $(this);
    const table = $('#table-compliance').DataTable();

    // Prevent editing if a select is already present
    if ($cell.find('select').length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const colIndex = $cell.index();
    const currentText = $cell.text().trim();
    
    // IMPORTANT: Extract current values BEFORE emptying the cell
    const currentBadges = $cell.find(".badge").map(function() {
        return $(this).text().trim();
    }).get();
    
    console.log("currentBadges", currentBadges);
    
    const allRegulations = ["GDPR", "CCPA", "HIPAA", "ISO 27701", "GRI 101", "GRI 102", "GRI 103"];
    const $select = $('<select class="editor-select2" style="width:100%;" multiple></select>');

    // Append options
    allRegulations.forEach(option => {
        $select.append(`<option value="${option}">${option}</option>`);
    });

    // Replace cell content with select
    $cell.empty().append($select);

    // Parse current value to array format
    let currentValues = [];
    if (currentBadges.length > 0) {
        // Use extracted badge values
        currentValues = currentBadges;
    } else if (Array.isArray(currentText)) {
        currentValues = currentText;
    } else if (typeof currentText === 'string' && currentText.trim() !== '' && currentText !== 'N/A') {
        // Try to match known regulations in the text
        currentValues = allRegulations.filter(reg => currentText.includes(reg));
        
        // If no matches, fall back to comma splitting
        if (currentValues.length === 0) {
            currentValues = currentText.split(',').map(v => v.trim()).filter(v => v !== '');
        }
    }
    
    console.log("currentValues", currentValues);

    // Initialize Select2
    $select.select2({
        placeholder: "Select Regulation(s)",
        tags: true,
        width: 'resolve',
        closeOnSelect: false
    }).val(currentValues).trigger('change');

    // Open immediately
    $select.select2("open");

    // On close, update value
    $select.on('select2:close', function () {
        const newVal = $select.val();
        const cellIndex = table.cell($cell).index();

        console.log("newVal", newVal);

        if (newVal && newVal.length > 0) {
            // Update DataTable cell value
            table.cell(cellIndex.row, cellIndex.column).data(newVal).draw(false);

            // Replace with badge HTML
            const badgeHTML = getRegulationBadges(newVal);
            $cell.html(badgeHTML);
        } else {
            table.cell(cellIndex.row, cellIndex.column).data(null).draw(false);
            $cell.html('<span class="text-muted">N/A</span>');
        }
    });
});



// Risk Level column only
$(document).on("click", "td.editableRisk_level", function() {
  const $cell = $(this);
    const table = $('#table-compliance').DataTable();

    // Prevent editing if a select is already present
    if ($cell.find('select').length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const colIndex = $cell.index();
    const currentText = $cell.text().trim();
    const risk_levelOptions = ["Critical", "High", "Medium", "Low"];
    const $select = $('<select class="editor-select2" style="width:100%;"></select>');

  // Append options
  risk_levelOptions.forEach(option => {
    $select.append(`<option value="${option}">${option}</option>`);
  });

  // Replace cell content with select
  $cell.empty().append($select);

  // Initialize Select2
  $select.select2({
    placeholder: "Select Risk Level",
    width: 'resolve',
  }).val(currentText).trigger('change');

  // Open immediately
  $select.select2("open");

  // On close, update value
  $select.on('select2:close', function () {
    const newVal = $select.val();
    const cellIndex = table.cell($cell).index();

    console.log(newVal)

    if (newVal) {
      // Update DataTable cell value
      table.cell(cellIndex.row, cellIndex.column).data(newVal).draw(false);

      // Replace with badge HTML
      const badgeHTML = getRiskLevelBadge(newVal);
      $cell.html(badgeHTML);
    } else {
      $cell.text("N/A");
    }
  });
});


// Control Type column only
$(document).on("click", "td.editableControl_type", function() {
    const $cell = $(this);
    const table = $('#table-compliance').DataTable();

    // Prevent editing if a select is already present
    if ($cell.find('select').length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const colIndex = $cell.index();
    const currentText = $cell.text().trim();

 const control_typeOptions = ["Preventive", "Detective", "Corrective"];
  const $select = $('<select class="editor-select2" style="width:100%;"></select>');

  // Append options
  control_typeOptions.forEach(option => {
    $select.append(`<option value="${option}">${option}</option>`);
  });

  // Replace cell content with select
  $cell.empty().append($select);

  // Initialize Select2
  $select.select2({
    placeholder: "Select Control Type",
    width: 'resolve',
  }).val(currentText).trigger('change');

  // Open immediately
  $select.select2("open");

  // On close, update value
  $select.on('select2:close', function () {
    const newVal = $select.val();
    const cellIndex = table.cell($cell).index();

    console.log(newVal)

    if (newVal) {
      // Update DataTable cell value
      table.cell(cellIndex.row, cellIndex.column).data(newVal).draw(false);

      // Replace with badge HTML
      const badgeHTML = getControlTypeBadge(newVal);
      $cell.html(badgeHTML);
    } else {
      $cell.text("N/A");
    }
  });
});


$(document).on("click", "td.editableImplementation_status", function() {
    const $cell = $(this);
    const table = $('#table-compliance').DataTable();

    // Prevent editing if a select is already present
    if ($cell.find('select').length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const colIndex = $cell.index();
    const currentText = $cell.text().trim();

 const implement_statusOptions = ["Planned", "In Progress", "Implemented"];
  const $select = $('<select class="editor-select2" style="width:100%;"></select>');

  // Append options
  implement_statusOptions.forEach(option => {
    $select.append(`<option value="${option}">${option}</option>`);
  });

  // Replace cell content with select
  $cell.empty().append($select);

  // Initialize Select2
  $select.select2({
    placeholder: "Select Implementation Status",
    width: 'resolve',
  }).val(currentText).trigger('change');

  // Open immediately
  $select.select2("open");

  // On close, update value
  $select.on('select2:close', function () {
    const newVal = $select.val();
    const cellIndex = table.cell($cell).index();

    console.log(newVal)

    if (newVal) {
      // Update DataTable cell value
      table.cell(cellIndex.row, cellIndex.column).data(newVal).draw(false);

      // Replace with badge HTML
      const badgeHTML = getImplementationStatusBadge(newVal);
      $cell.html(badgeHTML);
    } else {
      $cell.text("N/A");
    }
  });
});



// Date
$(document).on("click", "td.editableLast_assessment_date, td.editableNext_review_date, td.editableLast_audit_date, td.editableAction_due_date", function() {

   const $cell = $(this);
    const table = $('#table-compliance').DataTable();

    // Prevent editing if a select is already present
    if ($cell.find('select').length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const colIndex = $cell.index();
    const currentText = $cell.text().trim();

    const parsedDate = currentText ? parseCustomDate(currentText) : null;
 
    console.log(parsedDate)

    // Create readonly input (prevent manual typing)
    const $input = $('<input type="text" readonly class="form-control form-control-sm" style="min-width:150px;" />');
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
        }
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
        const monthIndex = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(mon);
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


});


// Status column only
$(document).on("click", "td.editableStatus", function() {
    const $cell = $(this);
    const table = $('#table-compliance').DataTable();

    // Prevent editing if a select is already present
    if ($cell.find('select').length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const colIndex = $cell.index();
    const currentText = $cell.text().trim();


 const statusOptions = ["Not Started", "Pending", "Ongoing","Effective"];
  const $select = $('<select class="editor-select2" style="width:100%;"></select>');

  // Append options
  statusOptions.forEach(option => {
    $select.append(`<option value="${option}">${option}</option>`);
  });

  // Replace cell content with select
  $cell.empty().append($select);

  // Initialize Select2
  $select.select2({
    placeholder: "Select Status",
    width: 'resolve',
  }).val(currentText).trigger('change');

  // Open immediately
  $select.select2("open");

  // On close, update value
  $select.on('select2:close', function () {
    const newVal = $select.val();
    const cellIndex = table.cell($cell).index();

    console.log(newVal)

    if (newVal) {
      // Update DataTable cell value
      table.cell(cellIndex.row, cellIndex.column).data(newVal).draw(false);

      // Replace with badge HTML
      const badgeHTML = getStatusBadge(newVal);
      $cell.html(badgeHTML);
    } else {
      $cell.text("N/A");
    }
  });
});



// Audit Required column only
$(document).on("click", "td.editableAudit_required", function() {
    const $cell = $(this);
    const table = $('#table-compliance').DataTable();

    // Prevent editing if a select is already present
    if ($cell.find('select').length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const colIndex = $cell.index();
    const currentText = $cell.text().trim();


 const audit_requiredOptions = ["Yes", "No"];
  const $select = $('<select class="editor-select2" style="width:100%;"></select>');

  // Append options
  audit_requiredOptions.forEach(option => {
    $select.append(`<option value="${option}">${option}</option>`);
  });

  // Replace cell content with select
  $cell.empty().append($select);

  // Initialize Select2
  $select.select2({
    placeholder: "Select Status",
    width: 'resolve',
  }).val(currentText).trigger('change');

  // Open immediately
  $select.select2("open");

  // On close, update value
  $select.on('select2:close', function () {
    const newVal = $select.val();
    const cellIndex = table.cell($cell).index();

    console.log(newVal)

    if (newVal) {
      // Update DataTable cell value
      table.cell(cellIndex.row, cellIndex.column).data(newVal).draw(false);

      // Replace with badge HTML
      const badgeHTML = getAuditRequiredBadge(newVal);
      $cell.html(badgeHTML);
    } else {
      $cell.text("N/A");
    }
  });
});


$(document).on("click", "td.editableAudit_findings,td.editableCorrective_actions", function() {
    const $cell = $(this);
    const table = $('#table-compliance').DataTable();

    // Prevent editing if a select is already present
    if ($cell.find('select').length > 0) return;
    if ($cell.find("input, textarea").length > 0) return;

    const colIndex = $cell.index();
    const currentText = $cell.text().trim();
  const editor = $('<input type="text" class="form-control form-control-sm text-center">');
  editor.val(currentText);
  $cell.empty().append(editor);
  editor.focus().select();
  editor.on("blur change", function () {
    const newVal = editor.val().trim();
    $cell.html(`${newVal}`);
  });
})


//handle compliance row update
// function handleComplianceRowUpdate(button) {

//   const $button = $(button);
//   console.log($button, "$button");
//   const $tr = $button.closest("tr");
//   console.log($tr, "$tr");
//   const tds = $tr.find("td");
//   console.log(tds, "tds Data");

//   // ✅ Get DataTable row data
//   const table = $("#table-compliance").DataTable();
//   const rowData = table.row($tr).data();

//   console.log("Row Data:", rowData);


//   const rowDataNewData = {
//   control_description: $(tds[1]).text().trim(),
//   compliance_area: $(tds[2]).text().trim(),
//   regulation: $(tds[3]).text().trim(),
//   risk_level: $(tds[5]).text().trim(),
//   control_type: $(tds[6]).text().trim(),
//   implementation_status: $(tds[7]).text().trim(),
//   last_assessment_date: $(tds[8]).text().trim(),
//   next_review_date: $(tds[9]).text().trim(),
//   status: $(tds[10]).text().trim(),
//   audit_required: $(tds[11]).text().trim(),
//   last_audit_date: $(tds[12]).text().trim(),
//   audit_findings: $(tds[13]).text().trim(),
//   corrective_actions: $(tds[14]).text().trim(),
//   action_due_date: $(tds[15]).text().trim(),
//   notes: $(tds[18]).text().trim(),
// };

// console.log(rowDataNewData, "rowNewData");

//   // ✅ Build payload using row data
//   const payload = {
//     id: rowData.control_id || "",
//     complainAreaId: rowData.complainAreaId || "",
//     createdByName: $("#userPrincipal").val().trim() || "",
//     createdBy: $("#userPrincipal").val().trim() || "",
//     ownerName: $("#userPrincipal").val().trim() || "",
//     name: rowData.control_description || "",
//     pageId: pageId || "",

//     complainceAttachment: {
//       id: rowData.complianceAttachment?.id || "",
//       name: rowData.complianceAttachment?.name || "",
//       type: rowData.complianceAttachment?.type || "",
//       size: rowData.complianceAttachment?.size || "",
//       file: rowData.complianceAttachment?.file || "",
//       complainDetalId: rowData.control_id || "",
//       uniqueFileReference: rowData.complianceAttachment?.uniqueFileReference || "",
//       uploadedOn: new Date()
//     },

//     complainValue: {
//       pageId: pageId || "",
//       desc: rowData.control_description || "",
//       ownerName: rowData.owners || "",
//       ownerids : rowData.owners || "",
//       responsible: rowData.responsibleperson || "",
//       name:  "",
//       complainAreaId: rowData.compliance_area || "",
//       complianceArea: rowData.compliance_area || "",
//       applicableRegulations: rowData.regulation || "",
//       riskLevel: rowData.risk_level || "",
//       controlType: rowData.control_type || "",
//       implementationStatus: rowData.implementation_status || "",
//       lastAssessmentDate: rowData.last_assessment_date || "",
//       nextReviewDate: rowData.next_review_date || "",
//       status: rowData.status || "",
//       auditRequired: rowData.audit_required || "",
//       lastAuditDate: rowData.last_audit_date || "",
//       auditFindings: rowData.audit_findings || "",
//       correctiveActions: rowData.corrective_actions || "",
//       actionDueDate: rowData.action_due_date || "",
//       evidenceFileReference: rowData.complianceAttachment?.uniqueFileReference || "",
//       notes: rowData.notes || "",
//       controlId : rowData.controllerDataId || "",
//     }
//   };

//   console.log("Update Payload:", payload);

//   //  $.ajax({
//   //   url: "/stratroom/compliance",
//   //   method: "POST",
//   //   contentType: "application/json", 
//   //   data: JSON.stringify(payload),
//   //   success: function(res) {
//   //     window.location.reload();
//   //   },
//   //   error: function(err) {
//   //   }
//   // });

  
// }


function handleComplianceRowUpdate(button) {

  const $button = $(button);
  const $tr = $button.closest("tr");

  const table = $("#table-compliance").DataTable();

  // ✅ Get latest row data from DataTable
  let rowData = table.row($tr).data();

  console.log("Original Row Data:", rowData);

  // ✅ SAFETY CHECK
  if (!rowData) {
    console.error("No row data found");
    return;
  }

  // ✅ Read latest values directly from table cells
  // because some edited values may not yet reflect properly in DataTable object

  const tds = $tr.find("td");

  // Column indexes based on your table structure
  rowData.controllerDataId = $(tds[0]).text().trim() || rowData.controllerDataId;
  rowData.control_description = $(tds[1]).text().trim() || rowData.control_description;
  rowData.compliance_area = $(tds[2]).text().trim() || rowData.compliance_area;
  rowData.regulation = $(tds[3]).text().trim() || rowData.regulation;
  rowData.risk_level = $(tds[5]).text().trim() || rowData.risk_level;
  rowData.control_type = $(tds[6]).text().trim() || rowData.control_type;
  rowData.implementation_status = $(tds[7]).text().trim() || rowData.implementation_status;
  rowData.last_assessment_date = $(tds[8]).text().trim() || rowData.last_assessment_date;
  rowData.next_review_date = $(tds[9]).text().trim() || rowData.next_review_date;
  rowData.status = $(tds[10]).text().trim() || rowData.status;
  rowData.audit_required = $(tds[11]).text().trim() || rowData.audit_required;
  rowData.last_audit_date = $(tds[12]).text().trim() || rowData.last_audit_date;
  rowData.audit_findings = $(tds[13]).text().trim() || rowData.audit_findings;
  rowData.corrective_actions = $(tds[14]).text().trim() || rowData.corrective_actions;
  rowData.action_due_date = $(tds[15]).text().trim() || rowData.action_due_date;
  rowData.notes = $(tds[18]).text().trim() || rowData.notes;

  // ✅ Update DataTable row with latest values
  table.row($tr).data(rowData).draw(false);

  console.log("Updated Row Data:", rowData);

  // ✅ Build payload
  const payload = {
    id: rowData.control_id || "",

    complainAreaId: rowData.complainAreaId || "",

    createdByName: $("#userPrincipal").val()?.trim() || "",

    createdBy: $("#userPrincipal").val()?.trim() || "",

    ownerName: $("#userPrincipal").val()?.trim() || "",

    name: rowData.control_description || "",

    pageId: pageId || "",

    complainceAttachment: {
      id: rowData.complianceAttachment?.id || "",

      name: rowData.complianceAttachment?.name || "",

      type: rowData.complianceAttachment?.type || "",

      size: rowData.complianceAttachment?.size || "",

      file: rowData.complianceAttachment?.file || "",

      complainDetalId: rowData.control_id || "",

      uniqueFileReference:
        rowData.complianceAttachment?.uniqueFileReference || "",

      uploadedOn: new Date(),
    },

    complainValue: {

      pageId: pageId || "",

      desc: rowData.control_description || "",

      ownerName: rowData.owners || "",

      ownerids: rowData.owners || "",

      responsible: rowData.responsibleperson || "",

      name: rowData.compianceName || "",

      complainAreaId: rowData.complainAreaId || "",

      complianceArea: rowData.compliance_area || "",

      applicableRegulations: rowData.regulation || "",

      riskLevel: rowData.risk_level || "",

      controlType: rowData.control_type || "",

      implementationStatus: rowData.implementation_status || "",

      lastAssessmentDate: rowData.last_assessment_date || "",

      nextReviewDate: rowData.next_review_date || "",

      status: rowData.status || "",

      auditRequired: rowData.audit_required || "",

      lastAuditDate: rowData.last_audit_date || "",

      auditFindings: rowData.audit_findings || "",

      correctiveActions: rowData.corrective_actions || "",

      actionDueDate: rowData.action_due_date || "",

      evidenceFileReference:
        rowData.complianceAttachment?.uniqueFileReference || "",

      notes: rowData.notes || "",

      controlId: rowData.controllerDataId || "",
    },
  };

  console.log("Final Update Payload:", payload);

  // ✅ API CALL
  
  $.ajax({
    url: "/stratroom/compliance",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(payload),

    success: function (res) {
      console.log("Update Success:", res);

      toastr.success("Compliance updated successfully");

      // optional
      window.location.reload();
    },

    error: function (err) {
      console.error("Update Failed:", err);

      toastr.error("Something went wrong");
    },
  });
  
}



function renderCompliancePopover(complianceAreas) {

  const compliancePopoverContent = `
    <div>
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h5 class="h6 mb-0">
          <i class="fas fa-shield-alt me-1 text-primary"></i> Filter Compliance Area
        </h5>
        <button type="button" class="btn-close" aria-label="Close"></button>
      </div>

      <div class="d-flex justify-content-between mb-2">
        <button class="btn btn-sm btn-light select-all-compliance">Select All</button>
        <button class="btn btn-sm btn-light deselect-all-compliance">Deselect All</button>
      </div>

      <div class="d-flex flex-column gap-2 pageViewOption">
        ${complianceAreas.map(area => `
          <div class="form-check">
            <input class="form-check-input filter-compliance"
              id="ca-${area.replace(/\s+/g,"")}"
              type="checkbox"
              value="${area}" checked>
            <label class="form-check-label"
              for="ca-${area.replace(/\s+/g,"")}">${area}</label>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  const compliancePopoverTrigger = document.getElementById("popoverFilterComplianceArea");

  new bootstrap.Popover(compliancePopoverTrigger, {
    html: true,
    placement: "bottom",
    content: compliancePopoverContent,
    sanitize: false,
    container: "body"
  });
}


$(document).on("change", ".filter-compliance", function () {

  var selectedAreas = [];

  $(".filter-compliance:checked").each(function () {
    selectedAreas.push($(this).val());
  });

  console.log(selectedAreas, "selectedAreas");

  filterComplianceTable(selectedAreas);

});


function filterComplianceTable(selectedAreas) {

  if (!table) return;

  table.rows().every(function () {

    var data = this.data();
    var rowArea = data.name; // group name

    if (selectedAreas.length === 0) {
      $(this.node()).hide();
      return;
    }

    if (selectedAreas.includes(rowArea)) {
      $(this.node()).show();
    } else {
      $(this.node()).hide();
    }

  });

}

$(document).on("click", ".select-all-compliance", function () {

  $(".filter-compliance").prop("checked", true);

  var allAreas = complianceAreas;

  filterComplianceTable(allAreas);

});

$(document).on("click", ".deselect-all-compliance", function () {

  $(".filter-compliance").prop("checked", false);

  filterComplianceTable([]);

});

var parentComplianceId = null;

function handleComplianceParentPopUp(id) {
  console.log(id, "iddddd");
  parentComplianceId = id;

  const modal = new bootstrap.Modal(document.getElementById('delete-parent-modal'));
  modal.show();
}


function handleComplianceParentDelete() {
  if (!parentComplianceId) {
    alert("No Compliance selected for deletion.");
    return;
  }
  $.ajax({
    url: `/stratroom/complainArea/${parentComplianceId}`,
    type: "DELETE",
    success: function (res) {
      console.log("Delete Response:", res);
      window.location.reload();
    }
  });
}












