var userId = $("#userPrincipal").val().trim();
var userDeptId = "";
var deptIdData = "";
var orgIdData = "";
var userinfodetails = {}
var riskPageData = [];
var getRiskData = {}
// var datePeriod = $("#datePeriod").val();
var frequency = localStorage.getItem("customperiod");

function getTrendIcon(flag) {
  if (!flag) return "";

  flag = flag.toLowerCase();

  if (flag.includes("fa-arrow-up") || flag.includes("success"))
    return "trending-up";
  if (flag.includes("fa-arrow-up") || flag.includes("warning"))
    return "trending-down";
  return "trending-down"; // red
}

function getvisionvalues() {
  //    const data = {
  //     "owner":1681,
  //     "deptId":524,
  //     "orgId":4,
  //     "missionvisionvalue":{
  //         "mission":"new value",
  //         "vision":"vivion valyrs",
  //         "Values":"value set"
  //     }
  // };

  $.ajax({
    url: "/stratroom/missionVisionValueList/" + userId,
    type: "GET",
    success: function (res) {
      data = res[0]?.missionvisionvalue ? res[0]?.missionvisionvalue : {} || {};
      $("#mission").val(data.mission);
      $("#vision").val(data.vision);
      $("#values").val(data.values);
      $("#missionVisionValueId").val(res[0]?.id ? res[0]?.id : "" || "");
    },
  });
}

getvisionvalues();

// function enableMissionVisionEdit() {
//   $("#mission, #vision, #values").prop("readonly", false);
// }


function setReadonlyBasedOnValue() {
    $("#mission, #vision, #values").each(function () {
        if ($(this).val().trim() !== "") {
            $(this).prop("readonly", true);
        } else {
            $(this).prop("readonly", false);
        }
    });
}

$('#aboutModal').on('shown.bs.modal', function () {
    setReadonlyBasedOnValue();
});

function enableMissionVisionEdit() {
    $("#mission, #vision, #values").prop("readonly", false);
}


function savemissionvisionvalue() {
  var mission = $("#mission").val();
  var vision = $("#vision").val();
  var values = $("#values").val();
  var payload = {
    id: $("#missionVisionValueId").val() || null,
    userId: userId,
    deptId: deptIdData,
    orgId: orgIdData,
    missionvisionvalue: {
      mission: mission,
      vision: vision,
      values: values,
    },
  };
  $.ajax({
    // url: "/stratroom/saveMissionVisionValue",
    url: "/stratroom/missionVisionValue",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(payload),
    success: function (data) {
      console.log(data, "savemissionvisionvalueData");
      window.location.reload();
    },
  });
}

function getProgressClass(status) {
  switch (status) {
    case "RED":
      return { wrap: "red", bar: "bg-danger" };
    case "GREEN":
      return { wrap: "green", bar: "bg-success" };
    default:
      return { wrap: "yellow", bar: "bg-warning" }; // ORANGE
  }
}

function trimName(name, max = 40) {
  if (!name) return "";
  return name.length > max ? name.substring(0, max) + "..." : name;
}

function getperformanceContractData() {
  $.ajax({
    url: "/stratroom/getPerformanceEntry/" + userId,
    type: "GET",
    success: function (data) {
      console.log(data, "datadata");

      if (Array.isArray(data) && data.length > 0) {
        const lastItem = data[data.length - 1];
        console.log("Last index data:", lastItem);
        consenualRatingValueText = "";
        if (lastItem.performanceValue.totalconsensualScoreRating == 1) {
          consenualRatingValueText = "Below Expectations";
        } else if (lastItem.performanceValue.totalconsensualScoreRating == 2) {
          consenualRatingValueText = "Meets Expectations";
        } else if (lastItem.performanceValue.totalconsensualScoreRating == 3) {
          consenualRatingValueText = "Exceeds Expectations";
        }

        $("#consensualRatingValueText").text(consenualRatingValueText);

        // Update Ratings
        $("#selfRating").text(lastItem.performanceValue.selfRatingTotal || "0");
        $("#managerRating").text(
          lastItem.performanceValue.managerRating || "0"
        );
        $("#consensualRating").text(
          lastItem.performanceValue.consensualRating || "0"
        );
        $("#consensualRatingValue").text(
          lastItem.performanceValue.totalconsensualScoreRating || "0"
        );
      } else {
        $("#selfRating").text("0");
        $("#managerRating").text("0");
        $("#consensualRating").text("0");
        $("#consensualRatingValue").text("0");
      }
    },
    error: function (xhr) {
      console.error("Error fetching userRole API:", xhr);
    },
  });
}

function getUserData() {
  $.ajax({
    url: "/stratroom/userRole/" + userId,
    type: "GET",
    success: function (data) {

      userinfodetails = data;


//Image setup

// ================= IMAGE SETUP =================
const users = data || {};
const username = users.name || "NN";
const userEmail = users.emailAddress || "";

$('.user-text h6').text(username);
$('.user-text small').text(userEmail);

let userProfileConcate = "";

if (!users.profileImage || users.profileImage === "") {
    // ❌ No image → initials
    userProfileConcate =
        "data-name='" + username + "' " +
        "class='rounded-circle swotmultiuserimage user-avatar'";
} else {
    let imgSrc = users.profileImage;

    // base64 safety
    if (
        !imgSrc.startsWith("data:image") &&
        !imgSrc.startsWith("http")
    ) {
        imgSrc = "data:image/png;base64," + imgSrc;
    }

    userProfileConcate =
        "src='" + imgSrc + "' " +
        "class='rounded-circle user-avatar'";
}

// image tag
const imgTag = `
    <div class="profile-wrapper">
        <img ${userProfileConcate} width="52" height="52" />
        <button class="btn btn-sm btn-primary rounded-circle profile-settings-btn"
            data-bs-toggle="offcanvas"
            data-bs-target="#themeOffcanvas">
            <i data-lucide="settings" style="width:12px;height:12px;"></i>
        </button>
    </div>
`;

const userImageContainer = $('.user-image');
userImageContainer.empty().append(imgTag);

// ================= INITIALS CONVERSION =================
$('.swotmultiuserimage').each(function () {
    const $img = $(this);
    const name = $img.data('name') || 'NN';

    const initials = name
        .trim()
        .slice(0, 2)
        .toUpperCase();

    const $div = $('<div></div>')
        .addClass('rounded-circle user-avatar initials-avatar')
        .text(initials);

    $img.replaceWith($div);
});
//Image Setup





// ===== SIDEBAR PROFILE IMAGE SETUP =====
$('.user-text h6').text(username);
$('.user-text small').text(userEmail);

let userProfileConcateside = "";

if (!users.profileImage || users.profileImage === "") {
    // ❌ No image → initials
    userProfileConcateside =
        "data-name='" + username + "' " +
        "class='rounded-circle swotmultiuserimage user-avatar'";
} else {
    let imgSrc = users.profileImage;

    // base64 safety
    if (
        !imgSrc.startsWith("data:image") &&
        !imgSrc.startsWith("http")
    ) {
        imgSrc = "data:image/png;base64," + imgSrc;
    }

    userProfileConcateside =
        "src='" + imgSrc + "' " +
        "class='rounded-circle user-avatar'";
}

// image tag
const imgTagside = `
    <div class="profile-wrapper">
        <img ${userProfileConcateside} width="52" height="52" />
        <input type="file" class="profileUploadImage d-none" accept="image/*">


              <label class="btn btn-sm btn-primary rounded-circle position-absolute"
       for=""
       onclick="$(this).siblings('.profileUploadImage').click()"
       style="bottom:-5px; right:-5px;">
    <i data-lucide="pencil" style="width:10px;height:10px;"></i>
</label>

    </div>
`;

const userImageContainerside = $('.user-imageside');
userImageContainerside.empty().append(imgTagside);


$('.swotmultiuserimage').each(function () {
    const $img = $(this);
    const name = $img.data('name') || 'NN';

    const initials = name
        .trim()
        .slice(0, 2)
        .toUpperCase();

    const $div = $('<div></div>')
        .addClass('rounded-circle user-avatar initials-avatar')
        .text(initials);

    $img.replaceWith($div);
});
// ===== SIDEBAR PROFILE IMAGE SETUP =====


//user change

$('.user-text h6').text(username);
$('.user-text small').text(userEmail);

let userProfileConcateprofile = "";

if (!users.profileImage || users.profileImage === "") {
    // ❌ No image → initials
    userProfileConcateprofile =
        "data-name='" + username + "' " +
        "class='rounded-circle swotmultiuserimage user-avatar'";
} else {
    let imgSrc = users.profileImage;

    // base64 safety
    if (
        !imgSrc.startsWith("data:image") &&
        !imgSrc.startsWith("http")
    ) {
        imgSrc = "data:image/png;base64," + imgSrc;
    }

    userProfileConcateprofile =
        "src='" + imgSrc + "' " +
        "class='rounded-circle user-avatar'";
}

// image tag
const imgTagprofile = `
    <div class="profile-wrapper">
        <img ${userProfileConcateprofile} width="52" height="52" />
    </div>
`;

const userImageContainerprofile = $('.user-imageprofile');
userImageContainerprofile.empty().append(imgTagprofile);


$('.swotmultiuserimage').each(function () {
    const $img = $(this);
    const name = $img.data('name') || 'NN';

    const initials = name
        .trim()
        .slice(0, 2)
        .toUpperCase();

    const $div = $('<div></div>')
        .addClass('rounded-circle user-avatar initials-avatar')
        .text(initials);

    $img.replaceWith($div);
});


//user change


console.log(data, "dataaaaaaauser");







//foruser
      console.log(data, "dataaaaaaauser");
      deptIdData = data.departmentList[0].id || "";
      orgIdData = data.orgId || "";
      $("#nameEmployee").text(data.name || "");
      $("#nameDepartment").text(data.departmentList[0].name || "");
      $("#phoneNumber").text(data.phoneNumber || "");
      $("#emailAddressData").text(data.emailAddress || "");
      $("#address").text(data.address || "");
      $("#designation").text(data.designation || "");
      $("#roleId").text(data?.graeId || "");
      $("#employeeNameData").text(data.name || "");
      $("#dateOfJion").text(data.dateOfJoin || "");
      $("#userId").text(data.userId || "");
      document.getElementById("departmentNameData").textContent =
        data.departmentList[0].name || "";
      

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
        url: "/stratroom/pageByPinnedList/?deptId=" + userDeptId,
        type: "GET",
        async: false,
        success: function (data) {
          console.log(data, "data");
          var meetingPageUrl = null;

          data.forEach((item) => {

            if (item.pageType == "Meetings") {
              const pageId = item.id;
              const createdBy = item.createdBy;

               $.ajax({ 
                // url: "/stratroom/meetingManagementList/" + pageId,
                 url: "/stratroom/meetingManagementList/"+createdBy+"?" + pageId+"&dateRange="+$('#datePeriod').val(),
                type: "GET",
                async: false,
                success: function (res) {
                  console.log(res, "responseData");
                  if (res && res.length > 0) { 
                    $("#totalMeetings").text(res.length || "0");
                  }else {
                    $("#totalMeetings").text("0");
                  }

                }
              });

              // Note: Ensure 'initiativeId' is defined. I assumed you meant pageId here based on your code.
              // If initiativeId is a global variable, switch 'pageId' back to 'initiativeId'.
              meetingPageUrl =
                "/stratroom/dashboard/" + createdBy + "?pageId=" + pageId;
            }

            const meetingBtn = document.getElementById("meeting-action-btn");

            if (meetingBtn) {
              // Optional: Only show the "hand" cursor if a valid URL exists
              if (meetingPageUrl) {
                meetingBtn.style.cursor = "pointer";
              } else {
                meetingBtn.style.cursor = "default";
                meetingBtn.style.opacity = "0.5"; // Optional: dim the icon if not clickable
              }

              // 4. Add the click event listener
              meetingBtn.addEventListener("click", function () {
                // 5. The Condition: Only navigate if the URL was found
                if (meetingPageUrl) {
                  window.location.href = meetingPageUrl;
                } else {
                  console.log("No meeting data found. Navigation disabled.");
                }
              });
            }

            if (item.pageType == "Task") {

               const pageId = item.id;
              const createdBy = item.createdBy;
              var taskPageUrl = null;

              // Note: Ensure 'initiativeId' is defined. I assumed you meant pageId here based on your code.
              // If initiativeId is a global variable, switch 'pageId' back to 'initiativeId'.
              taskPageUrl =
                "/stratroom/task?" +"pageId=" + pageId;
              var datePeriod = $("#datePeriod").val();

              const taskBtn = document.getElementById("task-action-btn");
              if (taskBtn) {

                if(taskPageUrl) {
                  taskBtn.style.cursor = "pointer";
                } else {
                  taskBtn.style.cursor = "default";
                  taskBtn.style.opacity = "0.5"; // Optional: dim the icon if not clickable
                }
                taskBtn.addEventListener("click", function () {
                  if (taskPageUrl) {
                    window.location.href = taskPageUrl;
                  } else {
                    console.log("No task data found. Navigation disabled.");
                  }
                });
              }

              const taskUrl =
                "/stratroom/retrieveTaskStatusCount/" + userId + "?dateRange=" + datePeriod;

                  $.ajax({
                    url: taskUrl,
                    type: "GET",
                    async: false,
                    success: function (res) { 
                      console.log(res, "response");
                      // $("#totalTaskNumber").text(res.totalTask || "0");
                      $("#totalCompleted").text("Completed:"+res.totalComplete || "Completed:0");
                      $("#totalProgress").text("InProgress:"+res.totalInProgress || "InProgress:0");
                    }
                  });
            }else {
              console.log("No Task pageType found.");
            }
            // --- STANDARD VIEW ---
            if (item.pageType == "Standard_View") {
              var pageno = $("#pagenumber").val();
              const pageId = item.id;
              const createdBy = item.createdBy;
             
              var datePeriod = $("#datePeriod").val();

              const pageUrl =
                "/stratroom/scoreCardList?pageId=" +
                pageId +
                "&empId=" +
                userId +
                "&datePeriod=" +
                datePeriod +
                "&frequency=" +
                frequency;

              $.ajax({
                url: pageUrl,
                type: "GET",
                async: false,
                success: function (res) {


                  res.cardDetailsDTO.scoreCardDTOS.forEach(scorecard => {
                    scorecard.objectiveList.forEach(objective => {

                        objective.kpiList = objective.kpiList.filter(kpi => {
                            const target = kpi?.kpiValue?.target;

                            return target !== 0 &&
                                  target !== "0" &&
                                  target !== null &&
                                  target !== undefined &&
                                  target !== "" &&
                                  target !== "undefined";
                        });

                    });
                });
                  const response = {
                    flag: false,
                    statusLight: "GREEN",
                    scoreCardName: "CITO-RI Linkages Scorecard",
                    cardDetailsDTO: {
                      id: 1820,
                      active: 0,
                      owner: 2250,
                      scoreCardDetailsValue: {
                        ownerName: "Molupe Molupe",
                        updatedByName: "Molupe Molupe",
                        description: "NA",
                        scoreCardName: "CITO-RI Linkages Scorecard",
                        score_card_start_end_date: "04/01/2025 - 03/31/2026",
                        status: "Weighted",
                      },
                      pageId: 3428,
                      createdBy: 2250,
                      updatedBy: 2250,
                      createdTime: "2025-10-31T07:18:53",
                      updatedTime: null,
                      scorecardName: "CITO-RI Linkages Scorecard",
                      startDate: "2025-04-01T00:00:00.000+0000",
                      endDate: "2026-03-31T00:00:00.000+0000",
                      scoreCardDTOS: [
                        {
                          id: 4262,
                          createdBy: 2250,
                          scorecardName: "CITO-RI Linkages Scorecard",
                          perspectiveType: "ROUTINE INITIATIVES",
                          perspectiveId: "RI1",
                          updatedBy: 2250,
                          createdTime: "2025-10-31T07:18:53",
                          updatedTime: "2025-11-03T07:09:39",
                          scoreCardValue: {
                            header4: "Target",
                            header3: "Actual",
                            createdByName: "Molupe Molupe",
                            header2: "Period",
                            header1: "ID",
                            updatedByName: "Molupe Molupe",
                            description: "NA",
                            weight: "0.0",
                            header5: "Trend",
                            perspective_start_end_date:
                              "04/01/2025 - 03/31/2026",
                            defaultscr: true,
                            ownerName: "Molupe Molupe",
                            name: "ROUTINE INITIATIVES",
                            perspectiveType: "ROUTINE INITIATIVES",
                            status: "Weighted",
                            statusLight: "GREEN",
                            statusLightFlagvalue: "green fas fa-flag",
                            statusLightFlag: "rgb(2, 125, 2)",
                          },
                          active: 0,
                          owner: 2250,
                          objectiveList: [
                            {
                              id: 10270,
                              active: 0,
                              objectivesValue: {
                                createdByName: "Molupe Molupe",
                                ownerName: "Molupe Molupe",
                                updatedByName: "Molupe Molupe",
                                name: "ENHANCE OPERATIONAL EFFICIENCY",
                                objective_start_end_date:
                                  "04/01/2025 - 03/31/2026",
                                description: "NA",
                                weight: "0",
                                status: "Weighted",
                                statusLight: "green fas fa-flag",
                                statusLightFlag: "rgb(2, 125, 2)",
                              },
                              createdTime: "2025-10-31T07:18:53",
                              updatedTime: "2025-11-03T07:09:36",
                              owner: 2250,
                              scoreCardId: 4262,
                              createdBy: 2250,
                              updatedBy: 2250,
                              objectivesName: "ENHANCE OPERATIONAL EFFICIENCY",
                              kpiList: [
                                {
                                  id: 33060,
                                  createdBy: 2250,
                                  kpiName:
                                    "Achieve 100% compliance with contract implementation timelines and regulatory requirements for all contracts within 30 days of signing",
                                  kpiFormula: {
                                    formula:
                                      "avg[Achieve 100% compliance with contract implementation timelines and regulatory requirements for all contracts within 30 days of signing]",
                                    fieldName: null,
                                    type: null,
                                    groupBy: null,
                                    deptName: null,
                                    deptId: null,
                                    currency: null,
                                    dataType: null,
                                    empployeeIds: null,
                                    period: null,
                                    tableType: null,
                                  },
                                  updatedBy: 2250,
                                  createdTime: "2025-10-31T07:18:53",
                                  updatedTime: "2025-11-03T07:09:34",
                                  kpiValue: {
                                    createdByName: "Molupe Molupe",
                                    option2color2colorvalue: "rgb(255, 193, 7)",
                                    kpiId: "33060",
                                    description: "NA",
                                    threshold: "option_2",
                                    thresholdFormula: "(Actual/Target)*100",
                                    contribution: 1,
                                    ownerName: "Molupe Molupe",
                                    optioncolor1colorvalue: "rgb(255, 26, 9)",
                                    optioncolor2: "",
                                    optioncolor3: "",
                                    option2color3colorvalue: "rgb(37, 125, 5)",
                                    optioncolor4: "",
                                    optioncolor5: "",
                                    optioncolor3colorvalue: "rgb(2, 125, 2)",
                                    optioncolor1: "",
                                    option2color1colorvalue: "rgb(244, 67, 54)",
                                    option2color2: "90.0",
                                    option2color3: "100.0",
                                    subweight: "",
                                    targetCurrency: "",
                                    kpiCurrency: "",
                                    customthresholdenable: true,
                                    dataType: "Percentage",
                                    option2color1: "60.0",
                                    updatedByName: "Molupe Molupe",
                                    weight: "0",
                                    target: "100%",
                                    kpi_datasource: "Manual",
                                    kpiType: "Lead",
                                    name: "Achieve 100% compliance with contract implementation timelines and regulatory requirements for all contracts within 30 days of signing",
                                    optioncolor2colorvalue: "rgb(255, 193, 7)",
                                    kpi_measurement: "Monthly",
                                    kpi_start_end_date:
                                      "04/01/2025 - 03/31/2026",
                                    ytdFormula: "",
                                    status: "Weighted",
                                    statusLight: "green fas fa-flag",
                                    actualCurrency: "",
                                    trend: "fas fa-arrow-up",
                                    actual: "100%",
                                    actualThreshold: "1.00",
                                    targetThreshold: "7.00",
                                    gap: "0%",
                                    thresholdResult: "100.00",
                                    statusLightFlag: "rgba(2, 125, 2, 1)",
                                    ytdvalue: "0",
                                  },
                                  active: 0,
                                  owner: 2250,
                                  objectiveId: 10270,
                                  kpiId: "MCITO 1.1.1",
                                  includeReportee: false,
                                  startDate: "2025-04-01T00:00:00.000+0000",
                                  endDate: "2026-03-31T00:00:00.000+0000",
                                  actType: 2,
                                  thresholdvalueupdate: false,
                                  subKpiList: [],
                                },
                                {
                                  id: 33061,
                                  createdBy: 2250,
                                  kpiName:
                                    "Maintain 99_95% uptime across critical network and system infrastructure_routers_switchesfirewalls_servers_and key applications_by proactively monitoring performance metrics and addressing alerts within established service level agreements_SLAs",
                                  kpiFormula: {
                                    formula:
                                      "avg[Maintain 99_95% uptime across critical network and system infrastructure_routers_switchesfirewalls_servers_and key applications_by proactively monitoring performance metrics and addressing alerts within established service level agreements_SLAs]",
                                    fieldName: null,
                                    type: null,
                                    groupBy: null,
                                    deptName: null,
                                    deptId: null,
                                    currency: null,
                                    dataType: null,
                                    empployeeIds: null,
                                    period: null,
                                    tableType: null,
                                  },
                                  updatedBy: 2250,
                                  createdTime: "2025-10-31T07:18:53",
                                  updatedTime: "2025-11-03T07:09:34",
                                  kpiValue: {
                                    createdByName: "Molupe Molupe",
                                    option2color2colorvalue: "rgb(255, 193, 7)",
                                    description: "NA",
                                    threshold: "option_2",
                                    thresholdFormula: "(Actual/Target)*100",
                                    contribution: 1,
                                    ownerName: "Molupe Molupe",
                                    option2color3colorvalue: "rgb(37, 125, 5)",
                                    option2color1colorvalue: "rgb(244, 67, 54)",
                                    option2color2: "90.0",
                                    option2color3: "100.0",
                                    kpiCurrency: "",
                                    customthresholdenable: true,
                                    dataType: "Percentage",
                                    option2color1: "60.0",
                                    updatedByName: "Molupe Molupe",
                                    weight: "0",
                                    target: "100%",
                                    kpi_datasource: "Manual",
                                    kpiType: "Lead",
                                    name: "Maintain 99_95% uptime across critical network and system infrastructure_routers_switchesfirewalls_servers_and key applications_by proactively monitoring performance metrics and addressing alerts within established service level agreements_SLAs",
                                    kpi_measurement: "Monthly",
                                    kpi_start_end_date:
                                      "04/01/2025 - 03/31/2026",
                                    status: "Weighted",
                                    statusLight: "green fas fa-flag",
                                    actualCurrency: "",
                                    targetCurrency: "",
                                    trend: "fas fa-arrow-up",
                                    actual: "100%",
                                    actualThreshold: "1.00",
                                    targetThreshold: "11.11",
                                    gap: "0%",
                                    thresholdResult: "100.00",
                                    statusLightFlag: "rgba(2, 125, 2, 1)",
                                    ytdvalue: "0",
                                  },
                                  active: 0,
                                  owner: 2250,
                                  objectiveId: 10270,
                                  kpiId: "MCITO 1.1.2",
                                  includeReportee: false,
                                  startDate: "2025-04-01T00:00:00.000+0000",
                                  endDate: "2026-03-31T00:00:00.000+0000",
                                  actType: 0,
                                  thresholdvalueupdate: false,
                                  subKpiList: [],
                                },
                                {
                                  id: 33062,
                                  createdBy: 2250,
                                  kpiName:
                                    "Ensure that 95% of ICT service requests are resolved within the agreed Service Level Agreement_SLA_timeframes by March 31_2025",
                                  kpiFormula: {
                                    formula:
                                      "avg[Ensure that 95% of ICT service requests are resolved within the agreed Service Level Agreement_SLA_timeframes by March 31_2025]",
                                    fieldName: null,
                                    type: null,
                                    groupBy: null,
                                    deptName: null,
                                    deptId: null,
                                    currency: null,
                                    dataType: null,
                                    empployeeIds: null,
                                    period: null,
                                    tableType: null,
                                  },
                                  updatedBy: 2250,
                                  createdTime: "2025-10-31T07:18:54",
                                  updatedTime: "2025-11-03T07:09:34",
                                  kpiValue: {
                                    createdByName: "Molupe Molupe",
                                    option2color2colorvalue: "rgb(255, 193, 7)",
                                    kpiId: "33062",
                                    description: "NA",
                                    threshold: "option_2",
                                    thresholdFormula: "(Actual/Target)*100",
                                    contribution: 10,
                                    ownerName: "Molupe Molupe",
                                    optioncolor1colorvalue: "rgb(255, 26, 9)",
                                    optioncolor2: "",
                                    optioncolor3: "",
                                    option2color3colorvalue: "rgb(37, 125, 5)",
                                    optioncolor4: "",
                                    optioncolor5: "",
                                    optioncolor3colorvalue: "rgb(2, 125, 2)",
                                    optioncolor1: "",
                                    option2color1colorvalue: "rgb(244, 67, 54)",
                                    option2color2: "90.0",
                                    option2color3: "100.0",
                                    subweight: "",
                                    targetCurrency: "",
                                    kpiCurrency: "",
                                    customthresholdenable: true,
                                    dataType: "Percentage",
                                    option2color1: "60.0",
                                    updatedByName: "Molupe Molupe",
                                    weight: "0",
                                    target: "95%",
                                    kpi_datasource: "Manual",
                                    kpiType: "Lead",
                                    name: "Ensure that 95% of ICT service requests are resolved within the agreed Service Level Agreement_SLA_timeframes by March 31_2025",
                                    optioncolor2colorvalue: "rgb(255, 193, 7)",
                                    kpi_measurement: "Monthly",
                                    kpi_start_end_date:
                                      "04/01/2025 - 03/31/2026",
                                    ytdFormula: "",
                                    status: "Weighted",
                                    statusLight: "green fas fa-flag",
                                    actualCurrency: "",
                                    trend: "fas fa-arrow-up",
                                    actual: "95%",
                                    actualThreshold: "9.50",
                                    targetThreshold: "19.00",
                                    gap: "0%",
                                    thresholdResult: "100.00",
                                    statusLightFlag: "rgba(2, 125, 2, 1)",
                                    ytdvalue: "0",
                                  },
                                  active: 0,
                                  owner: 2250,
                                  objectiveId: 10270,
                                  kpiId: "MCITO 1.1.3",
                                  includeReportee: false,
                                  startDate: "2025-04-01T00:00:00.000+0000",
                                  endDate: "2026-03-31T00:00:00.000+0000",
                                  actType: 1,
                                  thresholdvalueupdate: false,
                                  subKpiList: [],
                                },
                                {
                                  id: 33064,
                                  createdBy: 2250,
                                  kpiName:
                                    "Ensure that at least 95% of all requested changes are implemented effectively and in full adherence to established IT Policy",
                                  kpiFormula: {
                                    formula:
                                      "avg[Ensure that at least 95% of all requested changes are implemented effectively and in full adherence to established IT Policy]",
                                    fieldName: null,
                                    type: null,
                                    groupBy: null,
                                    deptName: null,
                                    deptId: null,
                                    currency: null,
                                    dataType: null,
                                    empployeeIds: null,
                                    period: null,
                                    tableType: null,
                                  },
                                  updatedBy: 2250,
                                  createdTime: "2025-10-31T07:18:54",
                                  updatedTime: "2025-11-03T07:09:35",
                                  kpiValue: {
                                    createdByName: "Molupe Molupe",
                                    option2color2colorvalue: "rgb(255, 193, 7)",
                                    description: "NA",
                                    threshold: "option_2",
                                    thresholdFormula: "(Actual/Target)*100",
                                    contribution: 1,
                                    ownerName: "Molupe Molupe",
                                    option2color3colorvalue: "rgb(37, 125, 5)",
                                    option2color1colorvalue: "rgb(244, 67, 54)",
                                    option2color2: "90.0",
                                    option2color3: "100.0",
                                    kpiCurrency: "",
                                    customthresholdenable: true,
                                    dataType: "Percentage",
                                    option2color1: "60.0",
                                    updatedByName: "Molupe Molupe",
                                    weight: "0",
                                    target: "95%",
                                    kpi_datasource: "Manual",
                                    kpiType: "Lead",
                                    name: "Ensure that at least 95% of all requested changes are implemented effectively and in full adherence to established IT Policy",
                                    kpi_measurement: "Monthly",
                                    kpi_start_end_date:
                                      "04/01/2025 - 03/31/2026",
                                    status: "Weighted",
                                    statusLight: "green fas fa-flag",
                                    actualCurrency: "",
                                    targetCurrency: "",
                                    trend: "fas fa-arrow-up",
                                    actual: "95%",
                                    actualThreshold: "0.95",
                                    targetThreshold: "10.56",
                                    gap: "0%",
                                    thresholdResult: "100.00",
                                    statusLightFlag: "rgba(2, 125, 2, 1)",
                                    ytdvalue: "0",
                                  },
                                  active: 0,
                                  owner: 2250,
                                  objectiveId: 10270,
                                  kpiId: "MCITO 1.1.4",
                                  includeReportee: false,
                                  startDate: "2025-04-01T00:00:00.000+0000",
                                  endDate: "2026-03-31T00:00:00.000+0000",
                                  actType: 0,
                                  thresholdvalueupdate: false,
                                  subKpiList: [],
                                },
                                {
                                  id: 33065,
                                  createdBy: 2250,
                                  kpiName:
                                    "Ensure 100% implementation of budgeted projects for the FY",
                                  kpiFormula: {
                                    formula:
                                      "avg[Ensure 100% implementation of budgeted projects for the FY]",
                                    fieldName: null,
                                    type: null,
                                    groupBy: null,
                                    deptName: null,
                                    deptId: null,
                                    currency: null,
                                    dataType: null,
                                    empployeeIds: null,
                                    period: null,
                                    tableType: null,
                                  },
                                  updatedBy: 2250,
                                  createdTime: "2025-10-31T07:18:54",
                                  updatedTime: "2025-11-03T07:09:35",
                                  kpiValue: {
                                    createdByName: "Molupe Molupe",
                                    option2color2colorvalue: "rgb(255, 193, 7)",
                                    description: "NA",
                                    threshold: "option_2",
                                    thresholdFormula: "(Actual/Target)*100",
                                    contribution: 1,
                                    ownerName: "Molupe Molupe",
                                    option2color3colorvalue: "rgb(37, 125, 5)",
                                    option2color1colorvalue: "rgb(244, 67, 54)",
                                    option2color2: "90.0",
                                    option2color3: "100.0",
                                    kpiCurrency: "",
                                    customthresholdenable: true,
                                    dataType: "Percentage",
                                    option2color1: "60.0",
                                    updatedByName: "Molupe Molupe",
                                    weight: "0",
                                    target: "95%",
                                    kpi_datasource: "Manual",
                                    kpiType: "Lead",
                                    name: "Ensure 100% implementation of budgeted projects for the FY",
                                    kpi_measurement: "Monthly",
                                    kpi_start_end_date:
                                      "04/01/2025 - 03/31/2026",
                                    status: "Weighted",
                                    statusLight: "green fas fa-flag",
                                    actualCurrency: "",
                                    targetCurrency: "",
                                    trend: "fas fa-arrow-up",
                                    actual: "95%",
                                    actualThreshold: "0.95",
                                    targetThreshold: "9.50",
                                    gap: "0%",
                                    thresholdResult: "100.00",
                                    statusLightFlag: "rgba(2, 125, 2, 1)",
                                    ytdvalue: "0",
                                  },
                                  active: 0,
                                  owner: 2250,
                                  objectiveId: 10270,
                                  kpiId: "MCITO 1.1.5",
                                  includeReportee: false,
                                  startDate: "2025-04-01T00:00:00.000+0000",
                                  endDate: "2026-03-31T00:00:00.000+0000",
                                  actType: 0,
                                  thresholdvalueupdate: false,
                                  subKpiList: [],
                                },
                                {
                                  id: 33066,
                                  createdBy: 2250,
                                  kpiName:
                                    "Ensure 100% compliance with Business Continuity Management_BCM_principles as outlined in the IT Policy by performing regular backups_successful restores_and scheduled testing of backups",
                                  kpiFormula: {
                                    formula:
                                      "avg[Ensure 100% compliance with Business Continuity Management_BCM_principles as outlined in the IT Policy by performing regular backups_successful restores_and scheduled testing of backups]",
                                    fieldName: null,
                                    type: null,
                                    groupBy: null,
                                    deptName: null,
                                    deptId: null,
                                    currency: null,
                                    dataType: null,
                                    empployeeIds: null,
                                    period: null,
                                    tableType: null,
                                  },
                                  updatedBy: 2250,
                                  createdTime: "2025-10-31T07:18:54",
                                  updatedTime: "2025-11-03T07:09:35",
                                  kpiValue: {
                                    createdByName: "Molupe Molupe",
                                    option2color2colorvalue: "rgb(255, 193, 7)",
                                    description: "NA",
                                    threshold: "option_2",
                                    thresholdFormula: "(Actual/Target)*100",
                                    contribution: 1,
                                    ownerName: "Molupe Molupe",
                                    option2color3colorvalue: "rgb(37, 125, 5)",
                                    option2color1colorvalue: "rgb(244, 67, 54)",
                                    option2color2: "90.0",
                                    option2color3: "100.0",
                                    kpiCurrency: "",
                                    customthresholdenable: true,
                                    dataType: "Percentage",
                                    option2color1: "60.0",
                                    updatedByName: "Molupe Molupe",
                                    weight: "0",
                                    target: "95%",
                                    kpi_datasource: "Manual",
                                    kpiType: "Lead",
                                    name: "Ensure 100% compliance with Business Continuity Management_BCM_principles as outlined in the IT Policy by performing regular backups_successful restores_and scheduled testing of backups",
                                    kpi_measurement: "Monthly",
                                    kpi_start_end_date:
                                      "04/01/2025 - 03/31/2026",
                                    status: "Weighted",
                                    statusLight: "green fas fa-flag",
                                    actualCurrency: "",
                                    targetCurrency: "",
                                    trend: "fas fa-arrow-up",
                                    actual: "95%",
                                    actualThreshold: "0.95",
                                    targetThreshold: "10.56",
                                    gap: "0%",
                                    thresholdResult: "100.00",
                                    statusLightFlag: "rgba(2, 125, 2, 1)",
                                    ytdvalue: "0",
                                  },
                                  active: 0,
                                  owner: 2250,
                                  objectiveId: 10270,
                                  kpiId: "MCITO 1.1.6",
                                  includeReportee: false,
                                  startDate: "2025-04-01T00:00:00.000+0000",
                                  endDate: "2026-03-31T00:00:00.000+0000",
                                  actType: 0,
                                  thresholdvalueupdate: false,
                                  subKpiList: [],
                                },
                                {
                                  id: 33067,
                                  createdBy: 2250,
                                  kpiName:
                                    "Ensure 100% compliance to vulnerability management procedures",
                                  kpiFormula: {
                                    formula:
                                      "avg[Ensure 100% compliance to vulnerability management procedures]",
                                    fieldName: null,
                                    type: null,
                                    groupBy: null,
                                    deptName: null,
                                    deptId: null,
                                    currency: null,
                                    dataType: null,
                                    empployeeIds: null,
                                    period: null,
                                    tableType: null,
                                  },
                                  updatedBy: 2250,
                                  createdTime: "2025-10-31T07:18:54",
                                  updatedTime: "2025-11-03T07:09:36",
                                  kpiValue: {
                                    createdByName: "Molupe Molupe",
                                    option2color2colorvalue: "rgb(255, 193, 7)",
                                    description: "NA",
                                    threshold: "option_2",
                                    thresholdFormula: "(Actual/Target)*100",
                                    contribution: 1,
                                    ownerName: "Molupe Molupe",
                                    option2color3colorvalue: "rgb(37, 125, 5)",
                                    option2color1colorvalue: "rgb(244, 67, 54)",
                                    option2color2: "90.0",
                                    option2color3: "100.0",
                                    kpiCurrency: "",
                                    customthresholdenable: true,
                                    dataType: "Percentage",
                                    option2color1: "60.0",
                                    updatedByName: "Molupe Molupe",
                                    weight: "0",
                                    target: "95%",
                                    kpi_datasource: "Manual",
                                    kpiType: "Lead",
                                    name: "Ensure 100% compliance to vulnerability management procedures",
                                    kpi_measurement: "Monthly",
                                    kpi_start_end_date:
                                      "04/01/2025 - 03/31/2026",
                                    status: "Weighted",
                                    statusLight: "green fas fa-flag",
                                    actualCurrency: "",
                                    targetCurrency: "",
                                    trend: "fas fa-arrow-up",
                                    actual: "95%",
                                    actualThreshold: "0.95",
                                    targetThreshold: "10.56",
                                    gap: "0%",
                                    thresholdResult: "100.00",
                                    statusLightFlag: "rgba(2, 125, 2, 1)",
                                    ytdvalue: "0",
                                  },
                                  active: 0,
                                  owner: 2250,
                                  objectiveId: 10270,
                                  kpiId: "MCITO 1.1.7",
                                  includeReportee: false,
                                  startDate: "2025-04-01T00:00:00.000+0000",
                                  endDate: "2026-03-31T00:00:00.000+0000",
                                  actType: 0,
                                  thresholdvalueupdate: false,
                                  subKpiList: [],
                                },
                              ],
                              objectiveId: "OO–1",
                              startDate: "2025-04-01T00:00:00.000+0000",
                              endDate: "2026-03-31T00:00:00.000+0000",
                            },
                            {
                              id: 10271,
                              active: 0,
                              objectivesValue: {
                                createdByName: "Molupe Molupe",
                                ownerName: "Molupe Molupe",
                                updatedByName: "Molupe Molupe",
                                name: "INCREASE ACCESS TO INFRASTRUCTURE AND SERVICES",
                                objective_start_end_date:
                                  "04/01/2025 - 03/31/2026",
                                description: "NA",
                                weight: "0",
                                status: "Weighted",
                                statusLight: "green fas fa-flag",
                                statusLightFlag: "rgb(2, 125, 2)",
                              },
                              createdTime: "2025-10-31T07:18:55",
                              updatedTime: "2025-11-03T07:09:36",
                              owner: 2250,
                              scoreCardId: 4262,
                              createdBy: 2250,
                              updatedBy: 2250,
                              objectivesName:
                                "INCREASE ACCESS TO INFRASTRUCTURE AND SERVICES",
                              kpiList: [
                                {
                                  id: 33068,
                                  createdBy: 2250,
                                  kpiName:
                                    "Ensure implementation of budgeted projects for the FY",
                                  kpiFormula: {
                                    formula:
                                      "avg[Ensure implementation of budgeted projects for the FY]",
                                    fieldName: null,
                                    type: null,
                                    groupBy: null,
                                    deptName: null,
                                    deptId: null,
                                    currency: null,
                                    dataType: null,
                                    empployeeIds: null,
                                    period: null,
                                    tableType: null,
                                  },
                                  updatedBy: 2250,
                                  createdTime: "2025-10-31T07:18:55",
                                  updatedTime: "2025-11-03T07:09:36",
                                  kpiValue: {
                                    createdByName: "Molupe Molupe",
                                    option2color2colorvalue: "rgb(255, 193, 7)",
                                    description: "NA",
                                    threshold: "option_2",
                                    thresholdFormula: "(Actual/Target)*100",
                                    contribution: 1,
                                    ownerName: "Molupe Molupe",
                                    option2color3colorvalue: "rgb(37, 125, 5)",
                                    option2color1colorvalue: "rgb(244, 67, 54)",
                                    option2color2: "90.0",
                                    option2color3: "100.0",
                                    kpiCurrency: "",
                                    customthresholdenable: true,
                                    dataType: "Percentage",
                                    option2color1: "60.0",
                                    updatedByName: "Molupe Molupe",
                                    weight: "0",
                                    target: "95%",
                                    kpi_datasource: "Manual",
                                    kpiType: "Lead",
                                    name: "Ensure implementation of budgeted projects for the FY",
                                    kpi_measurement: "Monthly",
                                    kpi_start_end_date:
                                      "04/01/2025 - 03/31/2026",
                                    status: "Weighted",
                                    statusLight: "green fas fa-flag",
                                    actualCurrency: "",
                                    targetCurrency: "",
                                    trend: "fas fa-arrow-up",
                                    actual: "95%",
                                    actualThreshold: "0.95",
                                    targetThreshold: "6.46",
                                    gap: "0%",
                                    thresholdResult: "100.00",
                                    statusLightFlag: "rgba(2, 125, 2, 1)",
                                    ytdvalue: "0",
                                  },
                                  active: 0,
                                  owner: 2250,
                                  objectiveId: 10271,
                                  kpiId: "MCITO 1.1.8",
                                  includeReportee: false,
                                  startDate: "2025-04-01T00:00:00.000+0000",
                                  endDate: "2026-03-31T00:00:00.000+0000",
                                  actType: 0,
                                  thresholdvalueupdate: false,
                                  subKpiList: [],
                                },
                              ],
                              objectiveId: "OO-2",
                              startDate: "2025-04-01T00:00:00.000+0000",
                              endDate: "2026-03-31T00:00:00.000+0000",
                            },
                            {
                              id: 10272,
                              active: 0,
                              objectivesValue: {
                                createdByName: "Molupe Molupe",
                                ownerName: "Molupe Molupe",
                                updatedByName: "Molupe Molupe",
                                name: "ENHANCE OPERATIONAL EFFICIENCY",
                                objective_start_end_date:
                                  "04/01/2025 - 03/31/2026",
                                description: "NA",
                                weight: "0",
                                status: "Weighted",
                                statusLight: "green fas fa-flag",
                                statusLightFlag: "rgb(2, 125, 2)",
                              },
                              createdTime: "2025-10-31T07:18:55",
                              updatedTime: "2025-11-03T07:09:38",
                              owner: 2250,
                              scoreCardId: 4262,
                              createdBy: 2250,
                              updatedBy: 2250,
                              objectivesName: "ENHANCE OPERATIONAL EFFICIENCY",
                              kpiList: [
                                {
                                  id: 33070,
                                  createdBy: 2250,
                                  kpiName:
                                    "By March 31_2026_achieve and maintain 100% compliance with all defined Quality of Service_QoS_parameters for all telecom operators_as measured by quarterly audits and performance reports",
                                  kpiFormula: {
                                    formula:
                                      "avg[By March 31_2026_achieve and maintain 100% compliance with all defined Quality of Service_QoS_parameters for all telecom operators_as measured by quarterly audits and performance reports]",
                                    fieldName: null,
                                    type: null,
                                    groupBy: null,
                                    deptName: null,
                                    deptId: null,
                                    currency: null,
                                    dataType: null,
                                    empployeeIds: null,
                                    period: null,
                                    tableType: null,
                                  },
                                  updatedBy: 2250,
                                  createdTime: "2025-10-31T07:18:55",
                                  updatedTime: "2025-11-03T07:09:36",
                                  kpiValue: {
                                    createdByName: "Molupe Molupe",
                                    option2color2colorvalue: "rgb(255, 193, 7)",
                                    description: "NA",
                                    threshold: "option_2",
                                    thresholdFormula: "(Actual/Target)*100",
                                    contribution: 5,
                                    ownerName: "Molupe Molupe",
                                    option2color3colorvalue: "rgb(37, 125, 5)",
                                    option2color1colorvalue: "rgb(244, 67, 54)",
                                    option2color2: "90.0",
                                    option2color3: "100.0",
                                    kpiCurrency: "",
                                    customthresholdenable: true,
                                    dataType: "Percentage",
                                    option2color1: "60.0",
                                    updatedByName: "Molupe Molupe",
                                    weight: "0",
                                    target: "95%",
                                    kpi_datasource: "Manual",
                                    kpiType: "Lead",
                                    name: "By March 31_2026_achieve and maintain 100% compliance with all defined Quality of Service_QoS_parameters for all telecom operators_as measured by quarterly audits and performance reports",
                                    kpi_measurement: "Monthly",
                                    kpi_start_end_date:
                                      "04/01/2025 - 03/31/2026",
                                    status: "Weighted",
                                    statusLight: "green fas fa-flag",
                                    actualCurrency: "",
                                    targetCurrency: "",
                                    trend: "fas fa-arrow-up",
                                    actual: "95%",
                                    actualThreshold: "4.75",
                                    targetThreshold: "19.00",
                                    gap: "0%",
                                    thresholdResult: "100.00",
                                    statusLightFlag: "rgba(2, 125, 2, 1)",
                                    ytdvalue: "0",
                                  },
                                  active: 0,
                                  owner: 2250,
                                  objectiveId: 10272,
                                  kpiId: "MCITO 1.1.9",
                                  includeReportee: false,
                                  startDate: "2025-04-01T00:00:00.000+0000",
                                  endDate: "2026-03-31T00:00:00.000+0000",
                                  actType: 0,
                                  thresholdvalueupdate: false,
                                  subKpiList: [],
                                },
                                {
                                  id: 33072,
                                  createdBy: 2250,
                                  kpiName:
                                    "Achieve 95% of staff completion for mandatory cybersecurity awareness training per quarter",
                                  kpiFormula: {
                                    formula:
                                      "avg[Achieve 95% of staff completion for mandatory cybersecurity awareness training per quarter]",
                                    fieldName: null,
                                    type: null,
                                    groupBy: null,
                                    deptName: null,
                                    deptId: null,
                                    currency: null,
                                    dataType: null,
                                    empployeeIds: null,
                                    period: null,
                                    tableType: null,
                                  },
                                  updatedBy: 2250,
                                  createdTime: "2025-10-31T07:18:55",
                                  updatedTime: "2025-11-03T07:09:36",
                                  kpiValue: {
                                    createdByName: "Molupe Molupe",
                                    option2color2colorvalue: "rgb(255, 193, 7)",
                                    description: "NA",
                                    threshold: "option_2",
                                    thresholdFormula: "(Actual/Target)*100",
                                    contribution: 5,
                                    ownerName: "Molupe Molupe",
                                    option2color3colorvalue: "rgb(37, 125, 5)",
                                    option2color1colorvalue: "rgb(244, 67, 54)",
                                    option2color2: "90.0",
                                    option2color3: "100.0",
                                    kpiCurrency: "",
                                    customthresholdenable: true,
                                    dataType: "Percentage",
                                    option2color1: "60.0",
                                    updatedByName: "Molupe Molupe",
                                    weight: "0",
                                    target: "95%",
                                    kpi_datasource: "Manual",
                                    kpiType: "Lead",
                                    name: "Achieve 95% of staff completion for mandatory cybersecurity awareness training per quarter",
                                    kpi_measurement: "Monthly",
                                    kpi_start_end_date:
                                      "04/01/2025 - 03/31/2026",
                                    status: "Weighted",
                                    statusLight: "green fas fa-flag",
                                    actualCurrency: "",
                                    targetCurrency: "",
                                    trend: "fas fa-arrow-up",
                                    actual: "95%",
                                    actualThreshold: "4.75",
                                    targetThreshold: "19.00",
                                    gap: "0%",
                                    thresholdResult: "100.00",
                                    statusLightFlag: "rgba(2, 125, 2, 1)",
                                    ytdvalue: "0",
                                  },
                                  active: 0,
                                  owner: 2250,
                                  objectiveId: 10272,
                                  kpiId: "MCITO 1.1.10",
                                  includeReportee: false,
                                  startDate: "2025-04-01T00:00:00.000+0000",
                                  endDate: "2026-03-31T00:00:00.000+0000",
                                  actType: 0,
                                  thresholdvalueupdate: false,
                                  subKpiList: [],
                                },
                                {
                                  id: 33073,
                                  createdBy: 2250,
                                  kpiName:
                                    "Achieve 100% of the target of producing 3 actionable Threat Intelligence Reports per quarter_each covering Greaterthenoreqult 3 emerging threats _attack patterns_ and threat actors relevant to the Communications Sector and LCA for stakeholders",
                                  kpiFormula: {
                                    formula:
                                      "avg[Achieve 100% of the target of producing 3 actionable Threat Intelligence Reports per quarter_each covering Greaterthenoreqult 3 emerging threats _attack patterns_ and threat actors relevant to the Communications Sector and LCA for stakeholders]",
                                    fieldName: null,
                                    type: null,
                                    groupBy: null,
                                    deptName: null,
                                    deptId: null,
                                    currency: null,
                                    dataType: null,
                                    empployeeIds: null,
                                    period: null,
                                    tableType: null,
                                  },
                                  updatedBy: 2250,
                                  createdTime: "2025-10-31T07:18:55",
                                  updatedTime: "2025-11-03T07:09:37",
                                  kpiValue: {
                                    createdByName: "Molupe Molupe",
                                    option2color2colorvalue: "rgb(255, 193, 7)",
                                    description: "NA",
                                    threshold: "option_2",
                                    thresholdFormula: "(Actual/Target)*100",
                                    contribution: 5,
                                    ownerName: "Molupe Molupe",
                                    option2color3colorvalue: "rgb(37, 125, 5)",
                                    option2color1colorvalue: "rgb(244, 67, 54)",
                                    option2color2: "90.0",
                                    option2color3: "100.0",
                                    kpiCurrency: "",
                                    customthresholdenable: true,
                                    dataType: "Percentage",
                                    option2color1: "60.0",
                                    updatedByName: "Molupe Molupe",
                                    weight: "0",
                                    target: "100%",
                                    kpi_datasource: "Manual",
                                    kpiType: "Lead",
                                    name: "Achieve 100% of the target of producing 3 actionable Threat Intelligence Reports per quarter_each covering Greaterthenoreqult 3 emerging threats _attack patterns_ and threat actors relevant to the Communications Sector and LCA for stakeholders",
                                    kpi_measurement: "Monthly",
                                    kpi_start_end_date:
                                      "04/01/2025 - 03/31/2026",
                                    status: "Weighted",
                                    statusLight: "green fas fa-flag",
                                    actualCurrency: "",
                                    targetCurrency: "",
                                    trend: "fas fa-arrow-up",
                                    actual: "100%",
                                    actualThreshold: "5.00",
                                    targetThreshold: "20.00",
                                    gap: "0%",
                                    thresholdResult: "100.00",
                                    statusLightFlag: "rgba(2, 125, 2, 1)",
                                    ytdvalue: "0",
                                  },
                                  active: 0,
                                  owner: 2250,
                                  objectiveId: 10272,
                                  kpiId: "MCITO 1.1.11",
                                  includeReportee: false,
                                  startDate: "2025-04-01T00:00:00.000+0000",
                                  endDate: "2026-03-31T00:00:00.000+0000",
                                  actType: 0,
                                  thresholdvalueupdate: false,
                                  subKpiList: [],
                                },
                                {
                                  id: 33074,
                                  createdBy: 2250,
                                  kpiName:
                                    "Achieve 100% compliance with the IRP and RFC2350 by resolving Greaterthenoreqult 90% of P1 incidents within 2 hrs and P2 within 4 hrs MTTR_ ensuring minimal business disruption",
                                  kpiFormula: {
                                    formula:
                                      "avg[Achieve 100% compliance with the IRP and RFC2350 by resolving Greaterthenoreqult 90% of P1 incidents within 2 hrs and P2 within 4 hrs MTTR_ ensuring minimal business disruption]",
                                    fieldName: null,
                                    type: null,
                                    groupBy: null,
                                    deptName: null,
                                    deptId: null,
                                    currency: null,
                                    dataType: null,
                                    empployeeIds: null,
                                    period: null,
                                    tableType: null,
                                  },
                                  updatedBy: 2250,
                                  createdTime: "2025-10-31T07:18:55",
                                  updatedTime: "2025-11-03T07:09:37",
                                  kpiValue: {
                                    createdByName: "Molupe Molupe",
                                    option2color2colorvalue: "rgb(255, 193, 7)",
                                    description: "NA",
                                    threshold: "option_2",
                                    thresholdFormula: "(Actual/Target)*100",
                                    contribution: 1,
                                    ownerName: "Molupe Molupe",
                                    option2color3colorvalue: "rgb(37, 125, 5)",
                                    option2color1colorvalue: "rgb(244, 67, 54)",
                                    option2color2: "90.0",
                                    option2color3: "100.0",
                                    kpiCurrency: "",
                                    customthresholdenable: true,
                                    dataType: "Percentage",
                                    option2color1: "60.0",
                                    updatedByName: "Molupe Molupe",
                                    weight: "0",
                                    target: "100%",
                                    kpi_datasource: "Manual",
                                    kpiType: "Lead",
                                    name: "Achieve 100% compliance with the IRP and RFC2350 by resolving Greaterthenoreqult 90% of P1 incidents within 2 hrs and P2 within 4 hrs MTTR_ ensuring minimal business disruption",
                                    kpi_measurement: "Monthly",
                                    kpi_start_end_date:
                                      "04/01/2025 - 03/31/2026",
                                    status: "Weighted",
                                    statusLight: "green fas fa-flag",
                                    actualCurrency: "",
                                    targetCurrency: "",
                                    trend: "fas fa-arrow-up",
                                    actual: "100%",
                                    actualThreshold: "1.00",
                                    targetThreshold: "14.17",
                                    gap: "0%",
                                    thresholdResult: "100.00",
                                    statusLightFlag: "rgba(2, 125, 2, 1)",
                                    ytdvalue: "0",
                                  },
                                  active: 0,
                                  owner: 2250,
                                  objectiveId: 10272,
                                  kpiId: "MCITO 1.1.12",
                                  includeReportee: false,
                                  startDate: "2025-04-01T00:00:00.000+0000",
                                  endDate: "2026-03-31T00:00:00.000+0000",
                                  actType: 0,
                                  thresholdvalueupdate: false,
                                  subKpiList: [],
                                },
                                {
                                  id: 33075,
                                  createdBy: 2250,
                                  kpiName:
                                    "Achieve a 95% weekly review completion rate for high severity SIEM alerts_ensuring all critical security events are investigated and categorized within 24 hours of generation to support timely incident response",
                                  kpiFormula: {
                                    formula:
                                      "avg[Achieve a 95% weekly review completion rate for high severity SIEM alerts_ensuring all critical security events are investigated and categorized within 24 hours of generation to support timely incident response]",
                                    fieldName: null,
                                    type: null,
                                    groupBy: null,
                                    deptName: null,
                                    deptId: null,
                                    currency: null,
                                    dataType: null,
                                    empployeeIds: null,
                                    period: null,
                                    tableType: null,
                                  },
                                  updatedBy: 2250,
                                  createdTime: "2025-10-31T07:18:56",
                                  updatedTime: "2025-11-03T07:09:37",
                                  kpiValue: {
                                    createdByName: "Molupe Molupe",
                                    option2color2colorvalue: "rgb(255, 193, 7)",
                                    description: "NA",
                                    threshold: "option_2",
                                    thresholdFormula: "(Actual/Target)*100",
                                    contribution: 1,
                                    ownerName: "Molupe Molupe",
                                    option2color3colorvalue: "rgb(37, 125, 5)",
                                    option2color1colorvalue: "rgb(244, 67, 54)",
                                    option2color2: "90.0",
                                    option2color3: "100.0",
                                    kpiCurrency: "",
                                    customthresholdenable: true,
                                    dataType: "Percentage",
                                    option2color1: "60.0",
                                    updatedByName: "Molupe Molupe",
                                    weight: "0",
                                    target: "95%",
                                    kpi_datasource: "Manual",
                                    kpiType: "Lead",
                                    name: "Achieve a 95% weekly review completion rate for high severity SIEM alerts_ensuring all critical security events are investigated and categorized within 24 hours of generation to support timely incident response",
                                    kpi_measurement: "Monthly",
                                    kpi_start_end_date:
                                      "04/01/2025 - 03/31/2026",
                                    status: "Weighted",
                                    statusLight: "green fas fa-flag",
                                    actualCurrency: "",
                                    targetCurrency: "",
                                    trend: "fas fa-arrow-up",
                                    actual: "95%",
                                    actualThreshold: "0.95",
                                    targetThreshold: "6.33",
                                    gap: "0%",
                                    thresholdResult: "100.00",
                                    statusLightFlag: "rgba(2, 125, 2, 1)",
                                    ytdvalue: "0",
                                  },
                                  active: 0,
                                  owner: 2250,
                                  objectiveId: 10272,
                                  kpiId: "MCITO 1.1.13",
                                  includeReportee: false,
                                  startDate: "2025-04-01T00:00:00.000+0000",
                                  endDate: "2026-03-31T00:00:00.000+0000",
                                  actType: 0,
                                  thresholdvalueupdate: false,
                                  subKpiList: [],
                                },
                                {
                                  id: 33076,
                                  createdBy: 2250,
                                  kpiName:
                                    "Achieve 100% support for LCA Public Affairs awareness campaigns by delivering requested cybersecurity_ EMF_and Child Online Safety content within timelines",
                                  kpiFormula: {
                                    formula:
                                      "avg[Achieve 100% support for LCA Public Affairs awareness campaigns by delivering requested cybersecurity_ EMF_and Child Online Safety content within timelines]",
                                    fieldName: null,
                                    type: null,
                                    groupBy: null,
                                    deptName: null,
                                    deptId: null,
                                    currency: null,
                                    dataType: null,
                                    empployeeIds: null,
                                    period: null,
                                    tableType: null,
                                  },
                                  updatedBy: 2250,
                                  createdTime: "2025-10-31T07:18:56",
                                  updatedTime: "2025-11-03T07:09:38",
                                  kpiValue: {
                                    createdByName: "Molupe Molupe",
                                    option2color2colorvalue: "rgb(255, 193, 7)",
                                    description: "NA",
                                    threshold: "option_2",
                                    thresholdFormula: "(Actual/Target)*100",
                                    contribution: 1,
                                    ownerName: "Molupe Molupe",
                                    option2color3colorvalue: "rgb(37, 125, 5)",
                                    option2color1colorvalue: "rgb(244, 67, 54)",
                                    option2color2: "90.0",
                                    option2color3: "100.0",
                                    kpiCurrency: "",
                                    customthresholdenable: true,
                                    dataType: "Percentage",
                                    option2color1: "60.0",
                                    updatedByName: "Molupe Molupe",
                                    weight: "0",
                                    target: "95%",
                                    kpi_datasource: "Manual",
                                    kpiType: "Lead",
                                    name: "Achieve 100% support for LCA Public Affairs awareness campaigns by delivering requested cybersecurity_ EMF_and Child Online Safety content within timelines",
                                    kpi_measurement: "Monthly",
                                    kpi_start_end_date:
                                      "04/01/2025 - 03/31/2026",
                                    status: "Weighted",
                                    statusLight: "green fas fa-flag",
                                    actualCurrency: "",
                                    targetCurrency: "",
                                    trend: "fas fa-arrow-up",
                                    actual: "95%",
                                    actualThreshold: "0.95",
                                    targetThreshold: "12.54",
                                    gap: "0%",
                                    thresholdResult: "100.00",
                                    statusLightFlag: "rgba(2, 125, 2, 1)",
                                    ytdvalue: "0",
                                  },
                                  active: 0,
                                  owner: 2250,
                                  objectiveId: 10272,
                                  kpiId: "MCITO 1.1.14",
                                  includeReportee: false,
                                  startDate: "2025-04-01T00:00:00.000+0000",
                                  endDate: "2026-03-31T00:00:00.000+0000",
                                  actType: 0,
                                  thresholdvalueupdate: false,
                                  subKpiList: [],
                                },
                                {
                                  id: 33077,
                                  createdBy: 2250,
                                  kpiName:
                                    "Ensure that 100% of broadcasting operators achieve compliance with all technical parameters by March_2026",
                                  kpiFormula: {
                                    formula:
                                      "avg[Ensure that 100% of broadcasting operators achieve compliance with all technical parameters by March_2026]",
                                    fieldName: null,
                                    type: null,
                                    groupBy: null,
                                    deptName: null,
                                    deptId: null,
                                    currency: null,
                                    dataType: null,
                                    empployeeIds: null,
                                    period: null,
                                    tableType: null,
                                  },
                                  updatedBy: 2250,
                                  createdTime: "2025-10-31T07:18:56",
                                  updatedTime: "2025-11-03T07:09:38",
                                  kpiValue: {
                                    createdByName: "Molupe Molupe",
                                    option2color2colorvalue: "rgb(255, 193, 7)",
                                    description: "NA",
                                    threshold: "option_2",
                                    thresholdFormula: "(Actual/Target)*100",
                                    contribution: 5,
                                    ownerName: "Molupe Molupe",
                                    option2color3colorvalue: "rgb(37, 125, 5)",
                                    option2color1colorvalue: "rgb(244, 67, 54)",
                                    option2color2: "90.0",
                                    option2color3: "100.0",
                                    kpiCurrency: "",
                                    customthresholdenable: true,
                                    dataType: "Percentage",
                                    option2color1: "60.0",
                                    updatedByName: "Molupe Molupe",
                                    weight: "0",
                                    target: "95%",
                                    kpi_datasource: "Manual",
                                    kpiType: "Lead",
                                    name: "Ensure that 100% of broadcasting operators achieve compliance with all technical parameters by March_2026",
                                    kpi_measurement: "Monthly",
                                    kpi_start_end_date:
                                      "04/01/2025 - 03/31/2026",
                                    status: "Weighted",
                                    statusLight: "green fas fa-flag",
                                    actualCurrency: "",
                                    targetCurrency: "",
                                    trend: "fas fa-arrow-up",
                                    actual: "95%",
                                    actualThreshold: "4.75",
                                    targetThreshold: "19.00",
                                    gap: "0%",
                                    thresholdResult: "100.00",
                                    statusLightFlag: "rgba(2, 125, 2, 1)",
                                    ytdvalue: "0",
                                  },
                                  active: 0,
                                  owner: 2250,
                                  objectiveId: 10272,
                                  kpiId: "MCITO 1.1.15",
                                  includeReportee: false,
                                  startDate: "2025-04-01T00:00:00.000+0000",
                                  endDate: "2026-03-31T00:00:00.000+0000",
                                  actType: 0,
                                  thresholdvalueupdate: false,
                                  subKpiList: [],
                                },
                                {
                                  id: 33079,
                                  createdBy: 2250,
                                  kpiName:
                                    "Achieve EMF measurement levels that are below the ICNIRP general public limit by March 2026",
                                  kpiFormula: {
                                    formula:
                                      "avg[Achieve EMF measurement levels that are below the ICNIRP general public limit by March 2026]",
                                    fieldName: null,
                                    type: null,
                                    groupBy: null,
                                    deptName: null,
                                    deptId: null,
                                    currency: null,
                                    dataType: null,
                                    empployeeIds: null,
                                    period: null,
                                    tableType: null,
                                  },
                                  updatedBy: 2250,
                                  createdTime: "2025-10-31T07:18:56",
                                  updatedTime: "2025-11-03T07:09:38",
                                  kpiValue: {
                                    createdByName: "Molupe Molupe",
                                    option2color2colorvalue: "rgb(255, 193, 7)",
                                    description: "NA",
                                    threshold: "option_2",
                                    thresholdFormula: "(Actual/Target)*100",
                                    contribution: 5,
                                    ownerName: "Molupe Molupe",
                                    option2color3colorvalue: "rgb(37, 125, 5)",
                                    option2color1colorvalue: "rgb(244, 67, 54)",
                                    option2color2: "90.0",
                                    option2color3: "100.0",
                                    kpiCurrency: "",
                                    customthresholdenable: true,
                                    dataType: "Percentage",
                                    option2color1: "60.0",
                                    updatedByName: "Molupe Molupe",
                                    weight: "0",
                                    target: "95%",
                                    kpi_datasource: "Manual",
                                    kpiType: "Lead",
                                    name: "Achieve EMF measurement levels that are below the ICNIRP general public limit by March 2026",
                                    kpi_measurement: "Monthly",
                                    kpi_start_end_date:
                                      "04/01/2025 - 03/31/2026",
                                    status: "Weighted",
                                    statusLight: "green fas fa-flag",
                                    actualCurrency: "",
                                    targetCurrency: "",
                                    trend: "fas fa-arrow-up",
                                    actual: "95%",
                                    actualThreshold: "4.75",
                                    targetThreshold: "19.00",
                                    gap: "0%",
                                    thresholdResult: "100.00",
                                    statusLightFlag: "rgba(2, 125, 2, 1)",
                                    ytdvalue: "0",
                                  },
                                  active: 0,
                                  owner: 2250,
                                  objectiveId: 10272,
                                  kpiId: "MCITO 1.1.16",
                                  includeReportee: false,
                                  startDate: "2025-04-01T00:00:00.000+0000",
                                  endDate: "2026-03-31T00:00:00.000+0000",
                                  actType: 0,
                                  thresholdvalueupdate: false,
                                  subKpiList: [],
                                },
                              ],
                              objectiveId: "OO–3",
                              startDate: "2025-04-01T00:00:00.000+0000",
                              endDate: "2026-03-31T00:00:00.000+0000",
                            },
                            {
                              id: 10273,
                              active: 0,
                              objectivesValue: {
                                createdByName: "Molupe Molupe",
                                ownerName: "Molupe Molupe",
                                updatedByName: "Molupe Molupe",
                                name: "ENSURE EFFICIENT AND EQUITABLE ALLOCATION OF FINITE RESOURCES",
                                objective_start_end_date:
                                  "04/01/2025 - 03/31/2026",
                                description: "NA",
                                weight: "0",
                                status: "Weighted",
                                statusLight: "green fas fa-flag",
                                statusLightFlag: "rgb(2, 125, 2)",
                              },
                              createdTime: "2025-10-31T07:18:57",
                              updatedTime: "2025-11-03T07:09:39",
                              owner: 2250,
                              scoreCardId: 4262,
                              createdBy: 2250,
                              updatedBy: 2250,
                              objectivesName:
                                "ENSURE EFFICIENT AND EQUITABLE ALLOCATION OF FINITE RESOURCES",
                              kpiList: [
                                {
                                  id: 33081,
                                  createdBy: 2250,
                                  kpiName:
                                    "Achieve 100% completion of updates to the Numbering Plan by March 31_2026",
                                  kpiFormula: {
                                    formula:
                                      "avg[Achieve 100% completion of updates to the Numbering Plan by March 31_2026]",
                                    fieldName: null,
                                    type: null,
                                    groupBy: null,
                                    deptName: null,
                                    deptId: null,
                                    currency: null,
                                    dataType: null,
                                    empployeeIds: null,
                                    period: null,
                                    tableType: null,
                                  },
                                  updatedBy: 2250,
                                  createdTime: "2025-10-31T07:18:57",
                                  updatedTime: "2025-11-03T07:09:38",
                                  kpiValue: {
                                    createdByName: "Molupe Molupe",
                                    option2color2colorvalue: "rgb(255, 193, 7)",
                                    description: "NA",
                                    threshold: "option_2",
                                    thresholdFormula: "(Actual/Target)*100",
                                    contribution: 5,
                                    ownerName: "Molupe Molupe",
                                    option2color3colorvalue: "rgb(37, 125, 5)",
                                    option2color1colorvalue: "rgb(244, 67, 54)",
                                    option2color2: "90.0",
                                    option2color3: "100.0",
                                    kpiCurrency: "",
                                    customthresholdenable: true,
                                    dataType: "Percentage",
                                    option2color1: "60.0",
                                    updatedByName: "Molupe Molupe",
                                    weight: "0",
                                    target: "95%",
                                    kpi_datasource: "Manual",
                                    kpiType: "Lead",
                                    name: "Achieve 100% completion of updates to the Numbering Plan by March 31_2026",
                                    kpi_measurement: "Monthly",
                                    kpi_start_end_date:
                                      "04/01/2025 - 03/31/2026",
                                    status: "Weighted",
                                    statusLight: "green fas fa-flag",
                                    actualCurrency: "",
                                    targetCurrency: "",
                                    trend: "fas fa-arrow-up",
                                    actual: "95%",
                                    actualThreshold: "4.75",
                                    targetThreshold: "19.00",
                                    gap: "0%",
                                    thresholdResult: "100.00",
                                    statusLightFlag: "rgba(2, 125, 2, 1)",
                                    ytdvalue: "0",
                                  },
                                  active: 0,
                                  owner: 2250,
                                  objectiveId: 10273,
                                  kpiId: "MCITO 1.1.17",
                                  includeReportee: false,
                                  startDate: "2025-04-01T00:00:00.000+0000",
                                  endDate: "2026-03-31T00:00:00.000+0000",
                                  actType: 0,
                                  thresholdvalueupdate: false,
                                  subKpiList: [],
                                },
                                {
                                  id: 33083,
                                  createdBy: 2250,
                                  kpiName:
                                    "Achieve 99% implementation of the Spectrum Monitoring Plan by March 2026",
                                  kpiFormula: {
                                    formula:
                                      "avg[Achieve 99% implementation of the Spectrum Monitoring Plan by March 2026]",
                                    fieldName: null,
                                    type: null,
                                    groupBy: null,
                                    deptName: null,
                                    deptId: null,
                                    currency: null,
                                    dataType: null,
                                    empployeeIds: null,
                                    period: null,
                                    tableType: null,
                                  },
                                  updatedBy: 2250,
                                  createdTime: "2025-10-31T07:18:57",
                                  updatedTime: "2025-11-03T07:09:39",
                                  kpiValue: {
                                    createdByName: "Molupe Molupe",
                                    option2color2colorvalue: "rgb(255, 193, 7)",
                                    description: "NA",
                                    threshold: "option_2",
                                    thresholdFormula: "(Actual/Target)*100",
                                    contribution: 5,
                                    ownerName: "Molupe Molupe",
                                    option2color3colorvalue: "rgb(37, 125, 5)",
                                    option2color1colorvalue: "rgb(244, 67, 54)",
                                    option2color2: "90.0",
                                    option2color3: "100.0",
                                    kpiCurrency: "",
                                    customthresholdenable: true,
                                    dataType: "Percentage",
                                    option2color1: "60.0",
                                    updatedByName: "Molupe Molupe",
                                    weight: "0",
                                    target: "95%",
                                    kpi_datasource: "Manual",
                                    kpiType: "Lead",
                                    name: "Achieve 99% implementation of the Spectrum Monitoring Plan by March 2026",
                                    kpi_measurement: "Monthly",
                                    kpi_start_end_date:
                                      "04/01/2025 - 03/31/2026",
                                    status: "Weighted",
                                    statusLight: "green fas fa-flag",
                                    actualCurrency: "",
                                    targetCurrency: "",
                                    trend: "fas fa-arrow-up",
                                    actual: "95%",
                                    actualThreshold: "4.75",
                                    targetThreshold: "19.00",
                                    gap: "0%",
                                    thresholdResult: "100.00",
                                    statusLightFlag: "rgba(2, 125, 2, 1)",
                                    ytdvalue: "0",
                                  },
                                  active: 0,
                                  owner: 2250,
                                  objectiveId: 10273,
                                  kpiId: "MCITO 1.1.18",
                                  includeReportee: false,
                                  startDate: "2025-04-01T00:00:00.000+0000",
                                  endDate: "2026-03-31T00:00:00.000+0000",
                                  actType: 0,
                                  thresholdvalueupdate: false,
                                  subKpiList: [],
                                },
                              ],
                              objectiveId: "OO-5",
                              startDate: "2025-04-01T00:00:00.000+0000",
                              endDate: "2026-03-31T00:00:00.000+0000",
                            },
                          ],
                          pageId: 3428,
                          includeReportee: false,
                          startDate: "2025-04-01T00:00:00.000+0000",
                          endDate: "2026-03-31T00:00:00.000+0000",
                          scoreCardDetailsId: 1820,
                        },
                      ],
                      departmentId: 1055,
                      departmentName:
                        "Chief Information and Technology Officer",
                    },
                  };
                  console.log("Standard View Response:", res);

                  let wrapper = $("#kpi-swiper-wrapper");
                  wrapper.empty(); // clear existing slides

                  // level 1 → scoreCardDTOS
                  res?.cardDetailsDTO?.scoreCardDTOS?.forEach((scoreCard) => {
                    const scorecardId = scoreCard.id;
                    // level 2 → objectiveList
                    scoreCard.objectiveList.forEach((obj) => {
                      const objectiveId = obj.id;

                      const objectiveName = obj?.objectivesName  ? obj?.objectivesName : ""; 
                      // level 3 → kpiList
                      obj.kpiList.forEach((kpi) => {
                        let kpiName = kpi.kpiName;
                        const kpiId = kpi.id;

                        const frequency = kpi?.kpiValue?.kpi_measurement ? kpi?.kpiValue?.kpi_measurement : "";


                        let actual = kpi.kpiValue.actual;
                        let target = kpi.kpiValue.target;
                        let status = kpi.kpiValue.statusLightFlag; // color (rgba)
                        let trendIcon = getTrendIcon(kpi.kpiValue.trend);
                        const createdByName = kpi?.kpiValue?.createdByName || ""

                        const actualTargetValue = (parseInt(actual)/parseInt(target))*100
                        var trendColor = "black";

                        if (actualTargetValue <= 60) {
                            trendColor = "red";
                        } 
                        else if (actualTargetValue >= 61 && actualTargetValue <= 90) {
                            trendColor = "#FFBF00";
                        } 
                        else if (actualTargetValue > 90 && actualTargetValue <= 100) {
                            trendColor = "green";
                        }

                        // const trendColor = kpi.kpiValue.trend ?  kpi.kpiValue.trend.includes(
                        //   "fa-arrow-up"
                        // )
                        //   ? "green"
                        //   : kpi.kpiValue.trend.includes("fa-arrow-down")
                        //   ? "red"
                        //   : "black" : "black";

                        // CARD TEMPLATE
                        let cardHtml = `
                        <div class="swiper-slide">
                            <div class="card text-start text-card text-card-main border">
                                <div class="card-header border-0 bg-transparent pb-0 px-2 gap-1 d-flex align-items-center justify-content-between">
                                    <a  data-bs-toggle="modal" class="icon link" onclick="openKpiPage(${createdBy}, ${pageId}, ${kpiId}, ${objectiveId}, ${scorecardId})">
                                                <i data-lucide="circle-gauge" style="width:16px;height:16px;"></i>
                                            </a>
                                   
                                </div>

                                <div class="card-body p-2">
                                    <h4 class="card-title mb-2">${kpiName}</h4>

                                    <div class="d-flex gap-2 align-items-center mt-auto mt-auto">
                                        
                                        <div class="d-flex gap-4 align-items-start">

  
    <div class="d-flex flex-column text-center">
        <div class="amount-trend" style="color: ${trendColor};">Actual</div>
        <div class="amount-trend" style="color: ${trendColor};">${actual}</div>
    </div>

    <div class="d-flex flex-column text-center">
        <div class="amount-trend">Target</div>
        <div class="amount-trend">${target}</div>
    </div>

</div>



                                        <div class="d-flex gap-1 ms-auto"onclick="handleStoryCardEvent(
  ${kpiId},
  '${kpiName}',
  '${actual}',
  '${target}',
  '${frequency}',
  '${objectiveName}',
  '${createdByName}'
)"
>
                                            <a href="#kpi-story-card-modal" data-bs-toggle="modal" class="icon link">
                                                <i data-lucide="link" style="width:16px;height:16px;"></i>
                                            </a>

                                            <span class="icon goal" style="color:${status}">
                                                <i data-lucide="${trendIcon}" style="width:16px;height:16px;"></i>
                                            </span>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    `;

                        wrapper.append(cardHtml);
                      });
                    });
                  });

                  // Re-render lucide icons
                  lucide.createIcons();
                },
                error: function (err) {
                  console.error("Standard View Error:", err);
                },
              });
            }

            // --- RISK PAGE ---
            if (item.pageType == "Risk") {
              var riskPageId = $("#pagenumber").val() + item.id;
              const pageId = item.id;
              const createdBy = item.createdBy;
              const datePeriod = $("#datePeriod").val();
              console.log("Risk page found:", riskPageId);

              const pageUrl =
                "/stratroom/riskList/ " +
                userId +
                "?pageId=" +
                pageId +
                "&datePeriod=" +
                datePeriod;

              $.ajax({
                url: pageUrl,
                type: "GET",
                async: false,
                success: function (res) {
                  riskPageData = res?.length > 0 ? res : [];
                  const response = [
                    {
                      id: 374,
                      riskUniqueId: "Risk/180",
                      riskValue: {
                        createdByName: "Mary",
                        riskImage: "",
                        ch_nextAssessment: "Nov 13, 2025",
                        ch_dateRaised: "Nov 13, 2025",
                        departmentId: "",
                        riskcategory: "Strategic Risk",
                        score: "B2",
                        riskotherscheck: true,
                        ownerName: "Mary",
                        dateCompleted: "",
                        riskothers: "sfv",
                        financialImpact: "",
                        riskkpicheck: true,
                        riskinformationasset: "IA",
                        department: "Chief Executive officer",
                        nextAssessment: "",
                        riskpos: "POS`",
                        businessimpact: "",
                        likeliHood: "",
                        riskisocheck: true,
                        ch_dateCompleted: "Nov 13, 2025",
                        impact: "",
                        dateString: "13 Nov 2025",
                        riskiso: "ISO",
                        relatedparties: "",
                        impactkpiId: "",
                        dateRaised: "",
                        name: "Risk Register",
                        riskposcheck: true,
                        riskStatus: "Low",
                        riskinformatiomassetcheck: true,
                        desc: "ds",
                      },
                      owner: 2138,
                      impactId: 0,
                      createdBy: 2138,
                      updatedBy: 2138,
                      createdTime: "2025-11-13T00:00:00",
                      updatedTime: "2025-12-05T00:00:00",
                      active: 0,
                      riskCauseAndConsequenceMap: {},
                      riskPlanMap: {},
                      riskMonitoringMap: {},
                      riskCommentsDTOMap: {},
                      pageId: 2796,
                      changeId: 0,
                      draft: "APPROVED",
                      parentchangeId: 0,
                      version: 1,
                    },
                    {
                      id: 376,
                      riskUniqueId: "R1",
                      riskValue: {
                        createdByName: "Mary",
                        riskImage: "",
                        ch_nextAssessment: "",
                        ch_dateRaised: "Nov 20, 2025",
                        departmentId: "",
                        score: "",
                        riskotherscheck: false,
                        ownerName: "Mary",
                        dateCompleted: "",
                        riskothers: "",
                        financialImpact: "",
                        riskkpicheck: false,
                        riskinformationasset: "",
                        nextAssessment: "",
                        department: "Chief Executive officer",
                        riskpos: "",
                        riskisocheck: false,
                        ch_dateCompleted: "",
                        impact: "",
                        businessImpact: "",
                        riskiso: "",
                        relatedparties: "",
                        impactkpiId: "",
                        dateRaised: "",
                        name: "Lower-than-expected or negative YoY revenue growth",
                        riskposcheck: false,
                        riskStatus: "",
                        riskinformatiomassetcheck: false,
                        desc: "",
                      },
                      owner: 2138,
                      impactId: 0,
                      createdBy: 2138,
                      updatedBy: 0,
                      createdTime: "2025-11-20T00:00:00",
                      active: 0,
                      riskCauseAndConsequenceMap: {},
                      riskPlanMap: {},
                      riskMonitoringMap: {},
                      riskCommentsDTOMap: {},
                      pageId: 2796,
                      departmentId: 1046,
                      changeId: 0,
                      draft: "APPROVED",
                      parentchangeId: 0,
                      version: 1,
                    },
                    {
                      id: 377,
                      riskUniqueId: "Rs1",
                      riskValue: {
                        createdByName: "Mary",
                        riskImage: "",
                        ch_nextAssessment: "",
                        ch_dateRaised: "Nov 20, 2025",
                        departmentId: "",
                        score: "B3",
                        riskotherscheck: false,
                        ownerName: "Mary",
                        dateCompleted: "",
                        riskothers: "",
                        financialImpact: "",
                        riskkpicheck: false,
                        riskinformationasset: "",
                        nextAssessment: "",
                        department: "Chief Executive officer",
                        riskpos: "",
                        riskisocheck: false,
                        ch_dateCompleted: "",
                        impact: "",
                        businessImpact: "",
                        riskiso: "",
                        relatedparties: "",
                        impactkpiId: "",
                        dateRaised: "",
                        name: "Data loss/Compromised data privacy",
                        riskposcheck: false,
                        riskStatus: "High",
                        riskinformatiomassetcheck: false,
                        desc: "",
                      },
                      owner: 2138,
                      impactId: 0,
                      createdBy: 2138,
                      updatedBy: 0,
                      createdTime: "2025-11-20T00:00:00",
                      active: 0,
                      riskCauseAndConsequenceMap: {},
                      riskPlanMap: {},
                      riskMonitoringMap: {},
                      riskCommentsDTOMap: {},
                      pageId: 2796,
                      departmentId: 1046,
                      changeId: 0,
                      draft: "APPROVED",
                      parentchangeId: 0,
                      version: 1,
                    },
                    {
                      id: 378,
                      riskUniqueId: "8R4",
                      riskValue: {
                        createdByName: "Mary",
                        riskImage: "",
                        ch_nextAssessment: "",
                        ch_dateRaised: "Nov 20, 2025",
                        departmentId: null,
                        score: "D2",
                        riskotherscheck: false,
                        ownerName: "Mary",
                        dateCompleted: "",
                        riskothers: "",
                        financialImpact: "",
                        riskkpicheck: false,
                        riskinformationasset: "",
                        nextAssessment: "",
                        department: "Chief Executive officer",
                        riskpos: "",
                        riskisocheck: false,
                        ch_dateCompleted: "",
                        impact: "",
                        businessImpact: "",
                        riskiso: "",
                        relatedparties: "",
                        impactkpiId: "",
                        dateRaised: "",
                        name: "Project implementation risks",
                        riskposcheck: false,
                        riskStatus: "Very High",
                        riskinformatiomassetcheck: false,
                        desc: "",
                      },
                      owner: 2138,
                      impactId: 0,
                      createdBy: 2138,
                      updatedBy: 0,
                      createdTime: "2025-11-20T00:00:00",
                      active: 0,
                      riskCauseAndConsequenceMap: {},
                      riskPlanMap: {},
                      riskMonitoringMap: {},
                      riskCommentsDTOMap: {},
                      pageId: 2796,
                      departmentId: 1046,
                      changeId: 0,
                      draft: "APPROVED",
                      parentchangeId: 0,
                      version: 1,
                    },
                    {
                      id: 379,
                      riskUniqueId: "R45",
                      riskValue: {
                        createdByName: "Mary",
                        riskImage: "",
                        ch_nextAssessment: "",
                        ch_dateRaised: "Nov 20, 2025",
                        departmentId: null,
                        score: "C3",
                        riskotherscheck: false,
                        ownerName: "Mary",
                        dateCompleted: "",
                        riskothers: "",
                        financialImpact: "",
                        riskkpicheck: false,
                        riskinformationasset: "",
                        nextAssessment: "",
                        department: "Chief Executive officer",
                        riskpos: "",
                        riskisocheck: false,
                        ch_dateCompleted: "",
                        impact: "",
                        businessImpact: "",
                        riskiso: "",
                        relatedparties: "",
                        impactkpiId: "",
                        dateRaised: "",
                        name: "ICT budget constraints",
                        riskposcheck: false,
                        riskStatus: "Very High",
                        riskinformatiomassetcheck: false,
                        desc: "",
                      },
                      owner: 2138,
                      impactId: 0,
                      createdBy: 2138,
                      updatedBy: 0,
                      createdTime: "2025-11-20T00:00:00",
                      active: 0,
                      riskCauseAndConsequenceMap: {},
                      riskPlanMap: {},
                      riskMonitoringMap: {},
                      riskCommentsDTOMap: {},
                      pageId: 2796,
                      departmentId: 1046,
                      changeId: 0,
                      draft: "APPROVED",
                      parentchangeId: 0,
                      version: 1,
                    },
                    {
                      id: 380,
                      riskUniqueId: "R45",
                      riskValue: {
                        createdByName: "Mary",
                        riskImage: "",
                        ch_nextAssessment: "",
                        ch_dateRaised: "Nov 20, 2025",
                        departmentId: "574",
                        score: "D4",
                        riskotherscheck: false,
                        ownerName: "Mary",
                        dateCompleted: "",
                        riskothers: "",
                        financialImpact: "",
                        riskkpicheck: false,
                        riskinformationasset: "",
                        nextAssessment: "",
                        department: "Chief Executive officer",
                        riskpos: "",
                        riskisocheck: false,
                        ch_dateCompleted: "",
                        impact: "",
                        businessImpact: "",
                        riskiso: "",
                        relatedparties: "",
                        impactkpiId: "",
                        dateRaised: "",
                        name: "Non compliance to legislation, copy right laws and vendor policies and procedures",
                        riskposcheck: false,
                        riskStatus: "Very High",
                        riskinformatiomassetcheck: false,
                        desc: "",
                      },
                      owner: 2138,
                      impactId: 0,
                      createdBy: 2138,
                      updatedBy: 0,
                      createdTime: "2025-11-20T00:00:00",
                      active: 0,
                      riskCauseAndConsequenceMap: {},
                      riskPlanMap: {},
                      riskMonitoringMap: {},
                      riskCommentsDTOMap: {},
                      pageId: 2796,
                      departmentId: 1046,
                      changeId: 0,
                      draft: "APPROVED",
                      parentchangeId: 0,
                      version: 1,
                    },
                  ];

                  console.log(response, "risk response");
                  console.log(res, "riskResponse");
                  const wrapper = document.getElementById("riskSwiperWrapper");
                  wrapper.innerHTML = ""; // Clear old slides

                  res.forEach((risk) => {
                    const riskId = risk.id;
                    const riskName = risk?.riskValue?.name || "Untitled Risk";
                    const impactDesc = risk?.riskValue?.impactDesc || "";
                    const riskStatus = risk?.riskValue?.riskStatus || "Unknown";

                    // **Extract Risk Category**
                    let category = risk?.riskValue?.riskcategory || "N/A";
                      let nextAssessment = risk?.riskValue?.nextAssessment || "N/A";

                    // **Badge Color Based on Category**
                    const badgeClass =
                      {
                        "Strategic Risk": "status-bg-green",
                        "Operational Risk": "status-bg-green",
                        "Technology Risk": "status-bg-yellow",
                        "Reputational Risk": "status-bg-yellow",
                        "Human Capital Risk": "status-bg-red",
                      }[category] || "status-bg-yellow";

                    // **Dot Color Based on Status**
                    const dotColor =
                      {
                        Low: "text-success",
                        "Very Low": "text-success",
                        Medium: "text-warning",
                        High: "text-danger",
                        Critical: "text-danger",
                      }[riskStatus] || "text-warning";

                    // -------------------------
                    // 👉 TEMPLATE LITERAL SLIDE
                    // -------------------------
                    const slideHTML = `
                <div class="swiper-slide">
                    <div class="card text-start text-card text-card-main border">

                        <div class="card-header border-0 bg-transparent pb-0 px-2 gap-1 d-flex align-items-center justify-content-between">
                    

                            <a  data-bs-toggle="modal" class="icon link" onclick="openInitiativePage(${createdBy}, ${pageId})">
                                <i data-lucide="triangle-alert" style="width:16px;height:16px;"></i>
                            </a>

                            <div class="d-flex gap-1 align-items-center ms-auto">
                                <span class="badge ${badgeClass} rounded-pill" style="--stratroom-bg-opacity:1; max-width: 160px;">
                                    ${category}
                                </span>

                               
                            </div>
                        </div>

                        <div class="card-body p-2">
                            <h4 class="card-title mb-2">${riskName}</h4>

                            <div class="d-flex gap-2 align-items-center mt-auto">
                                <div style="font-size: 10.5px;">Next Assesment: ${nextAssessment}</div>
                                <div class="d-flex gap-1 ms-auto">
                                    <a href="#risk-story-card-modal" data-bs-toggle="modal" class="icon link" onclick="handleRiskCardEvent(${riskId})">
                                        <i data-lucide="link" style="width: 16px; height: 16px;"></i>
                                    </a>

                                    <span class="icon goal ${dotColor}">
                                        <i data-lucide="circle-dot" style="width: 16px; height: 16px; stroke-width: 3;"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            `;

                    wrapper.insertAdjacentHTML("beforeend", slideHTML);
                  });

                  // Re-render all Lucide icons
                  lucide.createIcons();
                },
              });
            }

            // --- INITIATIVES & PROJECTS ---
            if (item.pageType == "Initiatives & Projects") {
              var initPageId = $("#pagenumber").val() + item.id;

              console.log("Initiatives Page found:", initPageId);

       

              var pageId = item.id;
             
              const createdBy = item.createdBy;
              console.log(item, pageId, createdBy, "pageandcreatedbyId");
              var datePeriod = $("#datePeriod").val();

              $.ajax({
                url:
                  "/stratroom/initiativesList?loadFlag=true&pageId=" +
                  pageId +
                  "&status=date",
                type: "GET",
                async: false,
                success: function (res) {

                     const totalTaskCount = res.reduce((sum, item) => {
                      return sum + (item.taskList?.length || 0);
                    }, 0);

                    $("#totalTaskNumber").text(totalTaskCount || "0");
                  const wrapper = $("#initiative-swiper-wrapper");
                  wrapper.empty();

                  res.forEach((item) => {
                    let val = item.initiativeValue;
                    let initiativeId = item.id;
                    console.log(val, "InitiativeValueData");

                     var duedate = "";
                    var actualdatestring = val.actualdaterange;
                    var datestring = val.daterange;
                    if (actualdatestring && actualdatestring.includes("-")) {
                      duedate = dateFormatedtohumanread(actualdatestring.split("-")[1]);
                    } else if (datestring && datestring.includes("-")) {
                      duedate = dateFormatedtohumanread(datestring.split("-")[1]);
                    }

                    console.log(duedate, "duedate");

                    let title = val.name;
                    let category = val.categoryType ? val.categoryType : "N/A";
                    let badgeText = val.categoryType || "N/A";
                    let ownerName = val.ownerName;
                    let kpiData = val?.kpi ? val?.kpi : []; 
                    let taskData = item?.taskList ? item?.taskList : []; 
                    let actualDateRage = val?.actualdaterange ? val?.actualdaterange : "";
                    let progress = parseFloat(val.progressval) || 0;
                    let description = val?.description ? val?.description : "";

                    // Get progress color classes
                    let statusClass = getProgressClass(val.statusIndicator);

                    let cardHtml = `
        <div class="swiper-slide">
            <div class="card text-start text-card text-card-main border" >

                <div class="card-header border-0 bg-transparent pb-0 px-2 
                    gap-1 d-flex align-items-center justify-content-between">
                    
                    <a  data-bs-toggle="modal" class="icon link" onclick="openInitiativePage(${createdBy}, ${pageId})">
                        <i data-lucide="lightbulb" style="width:16px;height:16px;"></i>
                    </a>

                    <div class="d-flex gap-1 align-items-center ms-auto">
                        <span class="badge status-bg-${statusClass.wrap} rounded-pill text-truncate"
                            style="--stratroom-bg-opacity:1; max-width:180px;">
                            ${badgeText}
                        </span>

                       
                    </div>
                </div>

                <div class="card-body p-2">
                    <h4 class="card-title mb-2">${title}</h4>

                    <div class="d-flex gap-2 align-items-center mt-auto">

                        <div class="d-flex flex-fill status">
                            <div class="progress-wrap ${statusClass.wrap}">
                                <div class="progress flex-grow-1">
                                    <div class="progress-bar ${statusClass.bar} progress-bar-striped rounded-pill"
                                        role="progressbar"
                                        style="width:${progress}%;"
                                        aria-valuenow="${progress}" 
                                        aria-valuemin="0"
                                        aria-valuemax="100">
                                    </div>
                                </div>
                                <span class="badge">${progress}%</span>
                            </div>
                        </div>

                        <a href="#initiative-story-card-modal" data-bs-toggle="modal" class="icon link" onclick='handleInitiativeCardEvent(
   ${initiativeId},
   ${JSON.stringify(kpiData)},
  "${category.replace(/"/g, '&quot;')}",
  "${ownerName.replace(/"/g, '&quot;')}",
  "${title.replace(/"/g, '&quot;')}",
  "${description.replace(/"/g, '&quot;')}",
  "${actualDateRage}",
  ${JSON.stringify(taskData)},
)'>
                            <i data-lucide="link" style="width:16px;height:16px;"></i>
                        </a>
                    </div>
                    <div class="d-flex gap-2 align-items-center mt-auto">
                                <div style="font-size: 10.5px;">Due Date: ${duedate}</div>
                                <div class="d-flex gap-1 ms-auto">
                                   

                                   
                                </div>
                            </div>
                </div>

            </div>
        </div>
    `;

                    wrapper.append(cardHtml);
                  });

                  // Init lucide icons
                  lucide.createIcons();
                },
                error: function (err) {
                  console.error("Standard View Error:", err);
                },
              });

              // If you need API call here, add code:
              /*
                $.ajax({
                    url: "/stratroom/projectList?pageId=" + initPageId,
                    type: "GET",
                    async: false,
                    success: function (res) {
                        console.log("Initiatives Response:", res);
                    }
                });
                */
            }
          });
        },

        error: function (err) {
          console.error("Main API Error:", err);
        },
      }); 
},
    error: function (xhr) {
      console.error("Error fetching userRole API:", xhr);
    },
  });
}

getUserData();
getperformanceContractData();

//Page Open Functions
function openInitiativePage(createdBy, initiativeId) {
  console.log(initiativeId, createdBy, "initiativeId");

  const pageUrl =
    "/stratroom/dashboard/" + createdBy + "?pageId=" + initiativeId;

  // Navigate to the page
  window.location.href = pageUrl;
}

function openKpiPage(createdBy, pageId, kpiId, objectiveId, scoreCardId) {
  console.log(kpiId, objectiveId, scoreCardId, "kpiId");
  const pageUrl =
    "/stratroom/kpiView/kpiId=" +
    kpiId +
    "&flagtype=kpi" +
    "&scoreCardId=" +
    scoreCardId +
    "&objectiveId=" +
    objectiveId +
    "&pageId=" +
    pageId;

  window.location.href = pageUrl;
}

const hero = document.getElementById("heroSection");

function setBgImage(url) {
  hero.style.backgroundImage = `url('${url}')`;
  localStorage.setItem("heroBgImage", url);

  // Highlight the active card
  document.querySelectorAll(".theme-option").forEach((card) => {
    const img = card.querySelector("img");
    if (img && img.getAttribute("src") === url) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });
}

function uploadCustomBg(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const imageUrl = e.target.result;
    hero.style.backgroundImage = `url('${imageUrl}')`;
    localStorage.setItem("heroBgImage", imageUrl);

    // Remove .active from all cards (custom upload)
    document.querySelectorAll(".theme-option").forEach((card) => {
      card.classList.remove("active");
    });
  };
  reader.readAsDataURL(file);
}

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("heroBgImage");
  if (saved) {
    hero.style.backgroundImage = `url('${saved}')`;

    // Highlight correct card if exists
    document.querySelectorAll(".theme-option").forEach((card) => {
      const img = card.querySelector("img");
      if (img && (img.src === saved || img.getAttribute("src") === saved)) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }
    });
  }
});








    

    function converttobase64(element, id, callback) {

    var file = element;
    if (!file) return;

    // ✅ Size validation (5 KB)
    if (file.size > 5 * 1024) {
        alert("Image must be 5KB or below");
        return;
    }

    // ✅ Type validation
    if (!file.type.startsWith("image/")) {
        alert("Invalid image file");
        return;
    }

    var img = new Image();
    var reader = new FileReader();

    reader.onload = function (e) {
        img.src = e.target.result;
    };

    img.onload = function () {

        // ✅ Dimension validation (30x30)
        if (img.width !== 30 || img.height !== 30) {
            alert("Image dimensions must be exactly 30 × 30 pixels");
            return;
        }

        // ✅ Preview image
        $("#upload_link_image_" + id).attr("src", img.src);

        // ✅ Send base64 to callback
        callback(img.src);
    };

    reader.readAsDataURL(file);
}

    function uploadimagedata(id, result) {


  

        var generalSettObj = {
            userId: userinfodetails.userId,
            deptId: userinfodetails.deptId,
            userRole: userinfodetails.userRole,
            designation: userinfodetails.designation,
            status: userinfodetails.status,
            phoneNumber: userinfodetails.phoneNumber,
            emailAddress: userinfodetails.emailAddress,
            location: userinfodetails.location,
            department: userinfodetails.department,
            name: userinfodetails.name,

            // ✅ Base64 image
            profileImage: result
        };

        console.log(generalSettObj, "generalSettObj");

        $.ajax({
            url: "/stratroom/userRole",
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(generalSettObj),
            success: function () {
                location.reload(true);
            },
            error: readErrorMsg
        });
    
}

$(document).on("change", ".profileUploadImage", function () {
    console.log("function clicked");

    const file = this.files[0];
    if (!file) return;

    converttobase64(file, "profile", function (base64Image) {
        uploadimagedata("profile", base64Image);
    });
});


var kpiDatagetDetails = {}

function handleStoryCardEvent(kpiId, kpiName, actual, target, measurement, objectiveName, createdByName) {
    console.log(kpiId, kpiName,  actual, target, measurement, objectiveName, "handleStoryCardEvent");

        $.ajax({
        url: "/stratroom/kpi/" + kpiId,
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            kpiDatagetDetails = data;
            $("#supportNeeded").val(data.kpiValue.supportNeeded ? data.kpiValue.supportNeeded : "");
            $("#remarks").val(data.kpiValue.remarks ? data.kpiValue.remarks : "");
            console.log(data, "getkpidata");
        }
    });

    $("#kpiName").text(kpiName ? kpiName : "");
    $("#objectiveName").text(objectiveName ? objectiveName : "");
    $("#actualValue").text(actual ? actual : "");
    $("#targetValue").text(target ? target : "");
    $("#reportFrequency").text(measurement ? measurement : ""); 

    $("#ownerName").text(createdByName ? createdByName : "")
    //initiatives
    //riskData


    $.ajax({
        url: "/stratroom/kpi/initiativesList/" + kpiId,
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            console.log(data, "initiativedata");

              const names = data
              ?.map(item => item?.initiativeValue?.name)
              .filter(Boolean)
              .join(", ");

            $("#initiatives").text(names || "N/A");

            // $("#initiatives").text(data[0]?.initiativeValue?.impactDesc ? data[0]?.initiativeValue?.impactDesc : "N/A")
        },
        error: readErrorMsg,
    });


    $.ajax({
        url: "/stratroom/kpi/riskList/" + kpiId,
        type: "GET",
        contentType: "application/json",
        success: function (data, status) {

            const names = data
              ?.map(item => item?.riskValue?.name)
              .filter(Boolean)
              .join(", ");

              $("#riskData").text(names || "N/A");
            //  $("#riskData").text(data[0]?.riskValue?.impactDesc ? data[0]?.riskValue?.impactDesc : "N/A")
            // console.log(data, "ridkdata")
        },
        error: readErrorMsg,
    });
}

var initiativeIdData = {}

function handleInitiativeCardEvent(initiativeId, kpiData, category, ownerName,title, description, actualDateRage, taskData) {
  console.log(initiativeId, kpiData,category, ownerName, title, description, actualDateRage, taskData, "handleInitiativeCardEvent");


  $.ajax({
    url: "/stratroom/initiatives/" + initiativeId,
    type: "GET",
    contentType: "application/json",
    success: function (data) {
      initiativeIdData = data;
      console.log(data, "initiativeData");
      $("#initiativesupportNeeded").val(data.initiativeValue.supportNeeded ? data.initiativeValue.supportNeeded : "N/A");
      $("#initiativeremarks").val(data.initiativeValue.remarks ? data.initiativeValue.remarks : "N/A");
      $("#whyItMatters").val(data.initiativeValue.whyItMatters ? data.initiativeValue.whyItMatters : "N/A");
    }
  });

  $("#initiativeNameValue").text(title ? title : "");
  $("#initiativeDescriptionValue").text(description ? description : "");
  $("#initiativeCategoryValue").text(category ? category : "");
  $("#initiativeOwnerValue").text(ownerName ? ownerName : "");
  $("#initiativeTimeLine").text(actualDateRage ? actualDateRage : "");

  // 🔥 KPI MAPPING
  const $container = $("#keyActionsContainer");
  $container.empty();

  if (Array.isArray(kpiData) && kpiData.length > 0) {
    kpiData.forEach(kpi => {
      const badge = `
        <span class="badge rounded-pill bg-dark me-1 mb-1">
          ${kpi.name || "N/A"}
        </span>
      `;
      $container.append(badge);
    });
  } else {
    $container.append(
      `<span class="text-muted">No KPIs Available</span>`
    );
  }


  const $taskContainer = $("#successMeasuresContainer");
  $taskContainer.empty();

  if (Array.isArray(taskData) && taskData.length > 0) {
    taskData.forEach(task => {
      const taskVal = task.taskValue || {};

      const desc = taskVal.desc || "Task";
      const status = taskVal.status || "N/A";

      // Optional: color by status
      let badgeClass = "bg-dark";
      if (status === "completed") badgeClass = "bg-success";
      else if (status === "in_progress") badgeClass = "bg-warning text-dark";
      else if (status.toLowerCase() === "pending") badgeClass = "bg-secondary";

      $taskContainer.append(`
        <span class="badge rounded-pill ${badgeClass}">
          ${desc}
        </span>
      `);
    });
  } else {
    $taskContainer.append(
      `<span class="text-muted">No Success Measures</span>`
    );
  }
}

function handleInitiativeStoryCardSave(){
  const payload = initiativeIdData;

  payload.initiativeValue.supportNeeded = $("#initiativesupportNeeded").val();
  payload.initiativeValue.remarks = $("#initiativeremarks").val();
  payload.initiativeValue.whyItMatters = $("#whyItMatters").val();
  console.log(payload, "initiativeStoryCardPayload");

  $.ajax({ 
    url: "/stratroom/initiatives/",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(payload),
    success: function (data) {
      window.location.reload();
    }
  });
}





function getUserProfileData() {

    var useraccessid = localStorage.getItem('rootuseraccessid');
    console.log(useraccessid, "useraccessid");

     $.ajax({
            url: "/stratroom/userRole/" + useraccessid,
            type: "get",
            contentType: "application/json",
            success: function (data) {
              const users = data;
              const username = users.name || "NN";
              const userEmail = users.emailAddress || "";


              $('.user-text h6').text(username);
              $('.user-text small').text(userEmail);

              var userProfileConcate = (users.profileImage == undefined || users.profileImage == "")
                ? "data-name='" + username + "' class='rounded-circle swotmultiuserimage'"
                : "src='" + users.profileImage + "' class='rounded-circle'";


              var imgTag = "<img " + userProfileConcate + " />";

              const userImageContainer = $('.user-imagestoryCard');
              userImageContainer.empty().append(imgTag);


              $('.swotmultiuserimage').each(function () {
                const $img = $(this);
                const name = $img.data('name') || 'NN';
                const initials = name
                  ? name
                    .trim()
                    .slice(0, 2)
                    .toUpperCase()
                  : "NN";

                console.log(initials, "initials");

                const $div = $('<div></div>')
                  .addClass($img.attr('class'))
                  .text(initials)


                $img.replaceWith($div);
              });
            },
            error: function (xhr, status, err) {
              console.error("Error:", err);
            }
          });
}


getUserProfileData();


function handleSaveStoryCard() {
    const supportNeeded = $("#supportNeeded").val();
    const remarks = $("#remarks").val();
    const payload = kpiDatagetDetails;

    payload.kpiValue.supportNeeded = supportNeeded;
    payload.kpiValue.remarks = remarks;

    console.log(payload, "storycardpayload");

    $.ajax({ 
        url: "/stratroom/kpi/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(payload),
        success: function (data) {
            window.location.reload();
        }
    });

}


function renderRiskImpact(apiData) {

  const impactContainer = $("#riskImpact");
  impactContainer.empty();

  const badgeColors = [
    "bg-danger",
    "bg-warning text-dark",
    "bg-primary",
    "bg-success",
    "bg-info text-dark"
  ];

  apiData.forEach((item, index) => {

    const colorClass = badgeColors[index % badgeColors.length];

    const badge = `
      <span class="badge rounded-pill ${colorClass}">
        ${item.name}
      </span>
    `;

    impactContainer.append(badge);
  });
}


function renderRiskPlanList(apiData) {

  const impactContainer = $("#riskPlanList");
  impactContainer.empty();

  const badgeColors = [
    "bg-danger",
    "bg-warning text-dark",
    "bg-primary",
    "bg-success",
    "bg-info text-dark"
  ];

  apiData.forEach((item, index) => {

    const colorClass = badgeColors[index % badgeColors.length];

    const badge = `
      <span class="badge rounded-pill ${colorClass}">
        ${item.riskPlanValue.name}
      </span>
    `;

    impactContainer.append(badge);
  });
}
//Risk StoryCard Event Handler
function handleRiskCardEvent(riskId) {
  console.log(riskId, "riskId");

  const findRiskData = riskPageData.find(risk => risk.id == riskId);
  console.log(findRiskData, "findRiskData");
  getRiskData = findRiskData ? findRiskData : {};

  $("#riskName").text(findRiskData?.riskValue?.name || "N/A");
  $("#riskDescription").text(findRiskData?.riskValue?.desc || "N/A");
  $("#riskCategory").text(findRiskData?.riskValue?.riskcategory || "N/A");
  $("#riskLikelihood").text(findRiskData?.riskValue?.likeliHood || "N/A");
  $("#riskOwnerName").text(findRiskData?.riskValue?.createdByName || "N/A");
  $("#riskStatus").text(findRiskData?.riskValue?.riskStatus || "N/A");
  $("#risksupportNeeded").val(findRiskData?.riskValue?.supportNeeded || "");
  $("#riskRemarks").val(findRiskData?.riskValue?.remarks || "");

   renderRiskImpact(findRiskData?.riskValue?.businessimpact || []);

   renderRiskPlanList(findRiskData?.riskPlanList || []);
} 


function riskStoryCardSave() {

  const payload = getRiskData;

  payload.riskValue.supportNeeded = $("#risksupportNeeded").val();
  payload.riskValue.remarks = $("#riskRemarks").val();

  console.log(payload, "riskStoryCardPayload");
  

  $.ajax({ 
    url: "/stratroom/risk/",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(payload),
    success: function (data) {
        window.location.reload();
    }
  });
};




// deptReporteeList
function getInitials(name) {
    if (!name) return "";

    const words = name.trim().split(" ");

    if (words.length === 1) {
        return words[0].substring(0, 2).toUpperCase(); // Ganesh → GA
    } else {
        return (words[0][0] + words[1][0]).toUpperCase(); // John Doe → JD
    }
}

function reporteeListChild() {
    $.ajax({
        url: "/stratroom/deptReporteeList",
        type: "GET",
        success: function (response) {
            console.log(response, "response");

            const maxVisible = 3; // how many avatars you want to show
            const container = $("#reporteeList");
            container.empty();

            response.forEach((user, index) => {
                if (index < maxVisible) {
                    const initials = getInitials(user.name);

                    container.append(`
                        <li class="avatar avatar-xs pull-up" title="${user.name}">
                            <span class="avatar-initial rounded-circle  d-flex align-items-center justify-content-center"
                                  style="width:24px;height:24px;font-size:10px; color: black">
                                ${initials}
                            </span>
                        </li>
                    `);
                }
            });

            // Remaining count
           const remaining = response.length - maxVisible;

if (remaining > 0) {

    // Get remaining users
    const remainingUsers = response.slice(maxVisible);

    // Create names string
    const namesList = remainingUsers.map(u => u.name).join(", ");

    container.append(`
        <li class="avatar avatar-xs pull-up">
            <span class="avatar-initial rounded-circle d-flex align-items-center justify-content-center"
                  style="width:24px;height:24px;font-size:10px; color:black;"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="${namesList}">
                +${remaining}
            </span>
        </li>
    `);
}
        }
    });
}

reporteeListChild();

// pages


  let selectedDeptId = "";
    let selectedPageType = "";

    $(document).ready(function () {
        loadDepartments();

        // Department Change Handler
        $(document).on("change", "#deptrepotees", function () {
            selectedDeptId = $(this).val();
            console.log("✓ Department Changed:", selectedDeptId);
            
            // Reset dependent fields
            selectedPageType = "";
            $("#pageType").val("");
            $("#pages").empty().append('<option value="">Choose Page</option>');
            
            checkAndLoadPages();
        });

        // Page Type Change Handler
        $(document).on("change", "#pageType", function () {
            selectedPageType = $(this).val();
            console.log("✓ PageType Changed:", selectedPageType);
            
            // Reset pages dropdown
            $("#pages").empty().append('<option value="">Choose Page</option>');
            checkAndLoadPages();
        });

        // Pages Selection -> Redirect Handler
        $(document).on("change", "#pages", function () {
            const pageId = $(this).val();
            const $selectedOption = $(this).find('option:selected');
            const createdBy = $selectedOption.data('createdby');

            if (pageId && createdBy) {
                const targetUrl = `/stratroom/dashboard/${createdBy}?pageId=${pageId}`;
                console.log("🔗 Navigating to:", targetUrl);
                window.location.href = targetUrl;
            }
        });
    });

    // Check if both filters are selected, then load pages
    function checkAndLoadPages() {
        console.log("=== checkAndLoadPages ===");
        console.log("DeptID:", selectedDeptId, "| PageType:", selectedPageType);
        
        const isDeptValid = selectedDeptId && selectedDeptId.trim() !== "";
        const isPageTypeValid = selectedPageType && selectedPageType.trim() !== "";
        
        if (isDeptValid && isPageTypeValid) {
            console.log("✓ Both valid! Calling loadPages...");
            loadPages(selectedDeptId, selectedPageType);
        } else {
            console.log("✗ Waiting for both selections.");
            $("#pages").empty().append('<option value="">Choose Page</option>');
        }
    }

    // Load pages from API and populate #pages dropdown
    function loadPages(deptId, pageType) {
        const $pagesDropdown = $("#pages");
        $pagesDropdown.empty().append('<option value="">Choose Pages</option>')

        const apiUrl = `/stratroom/pageListByDeptPageType/${deptId}?pageType=${pageType}`;
        console.log("🌐 API Request:", apiUrl);

        $.ajax({
            type: "GET",
            url: apiUrl,
            dataType: "json",
            success: function (data) {
                console.log("✅ API Success. Data:", data);
                // $pagesDropdown.prop('disabled', false);
                $pagesDropdown.empty().append('<option value="">Choose Page</option>');

                if (!data || data.length === 0) {
                    $pagesDropdown.append('<option value="" >No pages found</option>');
                    return;
                }

                $.each(data, function (index, item) {
                    if (item.id && item.pageName) {
                        const $option = $('<option>', {
                            value: item.id,
                            text: item.pageName,
                            'data-createdby': item.createdBy,  // Store createdBy for URL construction
                            'data-pagetype': item.pageType     // Optional: for future use
                        });
                        $pagesDropdown.append($option);
                    }
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("❌ AJAX Error:", textStatus, errorThrown);
                $pagesDropdown.prop('disabled', false);
                $pagesDropdown.empty().append('<option value="">Error loading pages</option>');
            }
        });
    }

    // Load departments from API and populate #deptrepotees dropdown
    function loadDepartments() {
        const $dropdown = $("#deptrepotees");
        $dropdown.empty().append('<option value="">Choose Department</option>').prop('disabled', true);

        $.ajax({
            type: "GET",
            url: "/stratroom/departmentReportees",
            dataType: "json",
            success: function (data) {
                $dropdown.prop('disabled', false);
                $dropdown.empty().append('<option value="">Choose department</option>');

                if (!data || data.length === 0) {
                    $dropdown.append('<option value="" disabled>No departments found</option>');
                    return;
                }

                $.each(data, function (index, dept) {
                    if (dept.id && dept.name) {
                        $dropdown.append($('<option>', {
                            value: dept.id,
                            text: dept.name
                        }));
                    }
                });
                console.log("🏢 Departments loaded:", data.length);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("❌ Failed to load departments:", textStatus);
                $dropdown.prop('disabled', false);
                $dropdown.empty().append('<option value="">Error loading departments</option>');
            }
        });
    }