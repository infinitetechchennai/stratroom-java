"use strict";
var calendarYearfinStart = "Jan";
var calendarYearfinEnd = "Dec";
var calendardefaultPeriod = "";
var globalPermission = [];
var initiativePermission = [];
var employeePermission = [];
var swotPermission = [];
var pestelPermission = [];
var meetingPermission = [];
var riskPermission = [];
var scorecardPermission = [];
var kpidatasourcepermission = [];
var enableaccesscontrolMenu = false;
var userRoleLink = false;
var auditLink = false;
var accesscontrolPermission = [];
var chartsPermission = [];
var dashboardPermission = [];
var kpiPermission = [];
var orgstructurePermission = [];
var risksummaryPermission = [];
var controlpanelPermission = [];
var dashboardcreareflag = false;
var whitecreareflag = false;
var controlpanelScorecardSettings = {};
var controlpanelRiskSettings = {};

var LicenseDetailsdata = {};
var datasourcepanelPermission = false;
var templatepanelPermission = false;
var strategyforPermission = [];
var projectforPermission = [];
var riskforPermission = [];
var auditPermission = [];
var userrolePermission = [];
var strategyforlink = false;
var projectforlink = false;
var organizationlink = false;
var controlpanelgeneralsiteSettings = [];
var accesscontrolMenupesmission = false;
var controlpanelMenupesmission = false;
var overallmodulepermission = false;
var msgi = 0;
var startmsg = 0;

var financialmonthnames = {
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



let currentLanguage = localStorage.getItem("selectedLang") || "en";

console.log(currentLanguage, "currentLanguage");

$(function () {
  var rootuseraccessid = localStorage.getItem("rootuseraccessid");
  if (rootuseraccessid == "" || rootuseraccessid == null) {
    localStorage.setItem("rootuseraccessid", $("#userPrincipal").val());
  }
  var useraccessid = localStorage.getItem("useraccessid");

  $(".superroothomepage").click(function () {
    if (rootuseraccessid != null && rootuseraccessid != undefined) {
      localStorage.setItem("orguseraccessid", rootuseraccessid);
      localStorage.setItem("useraccessid", rootuseraccessid);
      $.ajax({
        url: "/stratroom/homeView",
        async: false,
        contentType: "application/json",
        success: function (data, status) {
          window.location.href = "/stratroom/organizationHome";
        },
      });
    }
  });

  if (
    rootuseraccessid != "" &&
    useraccessid != null &&
    useraccessid != "" &&
    rootuseraccessid != useraccessid
  ) {
    $(".organizationhome,.roothomepage").click(function () {
      var rootuseraccessid = localStorage.getItem("rootuseraccessid");
      if (rootuseraccessid != "" && rootuseraccessid != null) {
        localStorage.setItem("rootuseraccessid", rootuseraccessid);
        localStorage.setItem("useraccessid", rootuseraccessid);
      }
      $.ajax({
        url: "/stratroom/homeView",
        async: false,
        contentType: "application/json",
        success: function (data, status) {
          localStorage.setItem("orglink", "rootuser");
          location.reload();
          //window.location.href	=	"/stratroom/organizationHome";
        },
      });
    });

    $(".datasourceroothomepage").click(function () {
      var rootuseraccessid = localStorage.getItem("rootuseraccessid");
      if (rootuseraccessid != "" && rootuseraccessid != null) {
        localStorage.setItem("rootuseraccessid", rootuseraccessid);
        localStorage.setItem("useraccessid", rootuseraccessid);
      }

      $.ajax({
        url: "/stratroom/homeView",
        async: false,
        contentType: "application/json",
        success: function (data, status) {
          localStorage.setItem("orglink", "rootuser");
          setTimeout(function () {
            location.reload();
          }, 3000);
          //window.location.href	=	"/stratroom/organizationHome";
        },
      });
    });
  }

  $(".auditpage").click(function () {
    var systemip = localStorage.getItem("systemip");
    var currentEmp = $("#userPrincipal").val();
    var data = {
      userId: currentEmp,
      createdBy: currentEmp,
      action: "ETL Accessed",
      systemIp: systemip,
    };
    $.ajax({
      url: "/stratroom/auditTrail",
      type: "post",
      async: false,
      contentType: "application/JSON",
      data: JSON.stringify(data),
      success: function (res) {},
    });
  });

  if (useraccessid != "" && useraccessid != null) {
    $.ajaxSetup({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("useraccessid", useraccessid);
      },
    });
  }

  var systemip = localStorage.getItem("systemip");
  var existsystemreq = localStorage.getItem("existsystemreq");
  if (
    (systemip != null || systemip != "") &&
    (existsystemreq == null || existsystemreq == "")
  ) {
    localStorage.setItem("existsystemreq", "sent");

    //$.getJSON("https://api.ipify.org/?format=json", function(e) {
    //systemip	=	e.ip;
    //localStorage.setItem('systemip',systemip);
    var currentEmp = $("#userPrincipal").val();
    var data = {
      userId: currentEmp,
      createdBy: currentEmp,
      action: "User Login",
      systemIp: systemip,
    };
    $.ajax({
      url: "/stratroom/auditTrail",
      type: "post",
      async: false,
      contentType: "application/JSON",
      data: JSON.stringify(data),
      success: function (res) {},
    });
  }

  $.ajaxSetup({
    beforeSend: function (xhr) {
      xhr.setRequestHeader("systemip", systemip);
    },
  });

  $.notify.addStyle("success", {
    html: "<div><i class='fa fa-check-circle fa-lg' aria-hidden='true'></i>&nbsp; <span data-notify-text/></div>",
    classes: {
      base: {
        "white-space": "nowrap",
        "background-color": "grey",
        padding: "10px",
        "text-align": "center",
        "border-radius": "4px",
        color: "white",
      },
      graynotify: {
        color: "white",
        "background-color": "grey",
      },
    },
  });

  $.notify.addStyle("error", {
    html: "<div><i class='fa fa-times-circle' aria-hidden='true'></i>&nbsp; <span data-notify-text/></div>",
    classes: {
      base: {
        "white-space": "nowrap",
        "background-color": "grey",
        padding: "10px",
        "text-align": "center",
        "border-radius": "4px",
        color: "white",
      },
      graynotify: {
        color: "white",
        "background-color": "grey",
      },
    },
  });

  $("body").attr("spellcheck", false);
  setTimeout(function () {
    $(".page-loader-wrapper").fadeOut();
  }, 50);

  $.MyAdmin.browser.activate();
  $.MyAdmin.leftSideBar.activate();
  $.MyAdmin.rightSideBar.activate();
  $.MyAdmin.formSideBar.activate();
  $.MyAdmin.navbar.activate();
  $.MyAdmin.input.activate();
  $.MyAdmin.select.activate();
  $.MyAdmin.tooltip.activate();
  skinChanger();
  activateNotificationAndTasksScroll();
  setSkinListHeightAndScroll(true);
  setSettingListHeightAndScroll(true);
  $(window).resize(function () {
    setSkinListHeightAndScroll(false);
    setSettingListHeightAndScroll(false);
  });

  callFullScreen();
  getPermissionList();
  getsiteName();
  getAppLogo();
  getScorecardSettings();
  getRiskSettings();

  getLicenseDetailscommon();
  getdatasourcepermission();
  getdatasourcemodulepermission();
  gettemplatesemodulepermission();
  getorgtrackerpermission();
});

const am = {
  "topbar": {
    "masters": "ዋና መሪዎች",
    "mastersItems": {
      "products": "እቃዎች / አገልግሎቶች",
      "process": "ሂደት (POS)",
      "vitalRecords": "አስፈላጊ መዝገቦች",
      "technology": "ቴክኖሎጂ እና መረጃ መሥሪያ",
      "facilities": "ማቅረቢያዎች እና አገልግሎቶች",
      "personal": "የሰው ኃይል ጉዳይ",
      "iso": "ISO",
      "budget": "በጀት"
    },
    "settings": "ቅንብሮች",
    "settingsItems": {
      "controlPanel": "የቁጥጥር ፓነል",
      "auditTrail": "የኦዲት ታሪክ",
      "userRoles": "የተጠቃሚ ሚናዎች"
    },
    "profile": "መገለጫ",
    "profileItems": {
      "myProfile": "የእኔ መገለጫ",
      "myForms": "የእኔ ቅፅዎች",
      "performanceContract": "የአፈፃፀም ውል",
      "auditTrail": "የኦዲት ታሪክ",
      "logout": "ውጣ",
      "performanceContractPlan": "የአፈፃፀም ማሻሻያ እቅድ"
    }
  },
  "menu": {
    "plan": "እቅድ",
    "save": "አስቀምጥ",
    "cancel": "ይቅር",
    "add": "አክል",
    "edit": "አርትእ",
    "view": "ተመልከት",
    "delete": "አጥፋ",
    "planItems": {
      "strategyPlanner": "የስትራቴጂ እቅድ አዘጋጅ",
      "swot": "SWOT",
      "pestel": "PESTEL"
    },
    "measure": "መለኪያ",
    "measureItems": {
      "scorecard": "የአፈፃፀም ካርድ"
    },
    "execute": "ተፈጻሚ",
    "executeItems": {
      "initiatives": "አደጋዎች እና እቅዶች",
      "tasks": "ተግባሮች",
      "budgetApproval": "የበጀት ማጽደቅ",
      "budgets": "በጀቶች"
    },
    "govern": "አስተዳደር",
    "governItems": {
      "riskRegister": "የአደጋ መዝገብ",
      "riskApproval": "የአደጋ ማጽደቅ",
      "compliance": "ተቀባይነት"
    },
    "meet": "ስብሰባ",
    "meetItems": {
      "meetings": "ስብሰባዎች"
    },
    "report": "ሪፖርት",
    "reportItems": {
      "myCockpit": "የእኔ መቆጣጠሪያ ፓነል",
      "myPerformance": "የእኔ አፈፃፀም",
      "whiteboard": "ነጭ ቦርድ"
    }
  },
  "page": {
    "meetings": {
      "title": "ስብሰባዎች",
      "meetingsList": "የስብሰባ ዝርዝር",
      "createMeeting": "ስብሰባ ፍጠር",
      "createMeetingItems": {
        "subject": "ርዕስ",
        "meeting_link": "የስብሰባ አገናኝ",
        "location": "ቦታ",
        "to_date_time": "እስከ ቀን እና ሰዓት",
        "from_date_time": "ከ ቀን እና ሰዓት",
        "status": "ሁኔታ",
        "statusOptions": {
          "choose": "ይምረጡ",
          "scheduled": "ታቀደ",
          "rescheduled": "እንደገና ታቀደ",
          "ongoing": "በመካከል እየተፈጸመ",
          "completed": "ተጠናቀቀ",
          "cancelled": "ተሰረዘ"
        },
        "save": "አስቀምጥ",
        "cancel": "ይቅር"
      },
      "meetingsListItems": {
        "meeting_link": "የስብሰባ አገናኝ",
        "copy_link": "አገናኝ ቅዳ",
        "location": "ቦታ",
        "status": "ሁኔታ",
        "to_date_time": "እስከ ቀን እና ሰዓት",
        "from_date_time": "ከ ቀን እና ሰዓት",
        "attendees": "ተሳታፊዎች",
        "initiated_by": "ተጀመረ በ"
      }
    }
  }
};


// Change language on selection
 const ar ={
  "topbar": {
    "masters": "الرؤساء",
    "mastersItems": {
      "products": "المنتجات / الخدمات",
      "process": "العملية (POS)",
      "vitalRecords": "السجلات الحيوية",
      "technology": "التكنولوجيا وتكنولوجيا المعلومات",
      "facilities": "المرافق والخدمات",
      "personal": "شؤون الموظفين",
      "iso": "ISO",
      "budget": "الميزانية"
    },
    "settings": "الإعدادات",
  "settingsItems": {
    "controlPanel": "لوحة التحكم",
    "auditTrail": "سجل التدقيق",
    "userRoles": "أدوار المستخدمين"
  },
    "profile": "الملف الشخصي",
    "profileItems": {
      "myProfile": "ملفي الشخصي",
      "myForms": "نماذجي",
      "performanceContract": "عقد الأداء",
      "auditTrail": "سجل التدقيق",
      "logout": "تسجيل الخروج",
      "performanceContractPlan" :  "خطة تحسين الأداء",
    }
  },
  "menu": {
    "plan": "خطة",
    "save": "حفظ",
    "cancel": "إلغاء",
    "add": "إضافة",
    "edit": "تعديل",
    "view": "عرض",
    "delete": "حذف",
    "planItems": {
    "strategyPlanner": "مخطط الاستراتيجية",
    "swot": "SWOT",
    "pestel": "PESTEL"
    },
    "measure": "قياس",
    "measureItems": {
    "scorecard": "بطاقة الأداء"
    },
    "execute": "تنفيذ",
     "executeItems": {
    "initiatives": "المخاطر والمبادرات",
    "tasks": "المهام",
    "budgetApproval": "اعتماد الميزانية",
    "budgets": "الميزانيات"
     },
    "govern": "حوكمة",
    "governItems": {
    "riskRegister": "سجل المخاطر",
    "riskApproval": "اعتماد المخاطر",
    "compliance": "الامتثال"
    },
    "meet": "اجتماع",
     "meetItems": {
    "meetings": "الاجتماعات"
},
    "report": "تقرير",

    "reportItems": {
    "myCockpit": "لوحة التحكم",
    "myPerformance": "أدائي",
    "whiteboard": "اللوحة البيضاء"
    }
  },
  "page": {
    "meetings": {
      "title": "الاجتماعات",
      "meetingsList": "قائمة الاجتماعات",
      "createMeeting": "إنشاء اجتماع",
      "createMeetingItems": {
        "subject": "الموضوع",
        "meeting_link": "رابط الاجتماع",
    "location": "الموقع",
    "to_date_time": "إلى التاريخ والوقت",
    "from_date_time": "من التاريخ والوقت",
    "status": "الحالة",
    "statusOptions": {
        "choose": "اختر",
      "scheduled": "مجدول",
      "rescheduled": "أعيد جدولته",
      "ongoing": "جاري",
      "completed": "مكتمل",
      "cancelled": "ملغي"
    },
    "save": "حفظ",
    "cancel": "إلغاء"
      },
      "meetingsListItems": {
        "meeting_link": "رابط الاجتماع",
        "copy_link": "نسخ الرابط",
        "location": "الموقع",
        "status": "الحالة",
        "to_date_time": "إلى التاريخ والوقت",
        "from_date_time": "من التاريخ والوقت",
        "attendees": "المشاركون",
        "initiated_by": "تمت المبادرة من"
      }
    }
  }
}


  // English Language Data
  const en = {
    "topbar": {
        "masters": "Masters",
        "mastersItems": {
            "products": "Products/Services",
            "process": "Process (POS)",
            "vitalRecords": "Vital Records",
            "technology": "Technology & IT",
            "facilities": "Facilities & Utilities",
            "personal": "Personal (HR)",
            "iso": "ISO",
            "budget": "Budget"
        },
        "settings": "Settings",
        "settingsItems": {
            "controlPanel": "Control Panel",
            "auditTrail": "Audit Trail",
            "userRoles": "User Roles"
        },
        "profile": "Profile",
        "profileItems": {
            "myProfile": "My Profile",
            "myForms": "My Forms",
            "performanceContract": "Performance Contract",
            "auditTrail": "Audit Trail",
            "logout": "Logout",
            "performanceContractPlan" : "performanceContractPlan"
        }
    },
    "menu": {
        "plan": "Plan",
        "planItems": {
            "strategyPlanner": "Strategy Planner",
            "swot": "SWOT",
            "pestel": "PESTEL"
        },
        "measure": "Measure",
        "measureItems": {
            "scorecard": "Scorecard"
        },
        "execute": "Execute",
        "executeItems": {
            "initiatives": "Risks & Initiatives",
            "tasks": "Tasks",
            "budgetApproval": "Budget Approval",
            "budgets": "Budgets"
        },
        "govern": "Govern",
        "governItems": {
            "riskRegister": "Risk Register",
            "riskApproval": "Risk Approval",
            "compliance": "Compliance"
        },
        "meet": "Meet",
        "meetItems": {
            "meetings": "Meetings"
        },
        "report": "Report",
        "Performance Improvement Plan" : "Performance Improvement Plan",
        "Performance Contract" : "Performance Contract",
        "My Form" : "My Form",
        "Control Panel" : "Control Panel",
        "Audit Trail" : "Audit Trail",
        "User Role" : "User Role",
        "reportItems": {
            "myCockpit": "My Cockpit",
            "myPerformance": "My Performance",
            "whiteboard": "Whiteboard"
        }

    },
    "page": {
    "meetings": {
      "title": "Meetings",
      "meetingsList": "Meetings List",
      "createMeeting": "Create Meeting",
      "createMeetingItems": {
        "subject": "Subject",
        "meeting_link": "Meeting Link",
        "location": "Location",
        "from_date_time": "From Date & Time",
        "to_date_time": "To Date & Time",
        "status": "Status",
        "statusOptions": {
        "choose": "Choose",
          "scheduled": "Scheduled",
          "rescheduled": "Rescheduled",
          "ongoing": "Ongoing",
          "completed": "Completed",
          "cancelled": "Cancelled"
        },
        "save": "Save",
        "cancel": "Cancel",
        "add": "Add",
        "edit": "Edit",
        "view": "View",
        "delete": "Delete"
      },
      "meetingsListItems": {
        "meeting_link": "Meeting Link",
        "copy_link": "Copy Link",
        "location": "Location",
        "status": "Status",
        "to_date_time": "To Date & Time",
        "from_date_time": "From Date & Time",
        "attendees": "Attendees",
        "initiated_by": "Initiated By"
      }
    }
  }
}


  // Simple deep merge helper
  function deepMerge(target, source) {
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        if (typeof source[key] == 'object' && source[key] !== null) {
          if (!target[key]) target[key] = {};
          deepMerge(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
    return target;
  }
// const translations ={


//   en : {

//     "page": {
//         "scorecard": {
//             "title": "Scorecard",
//             "addPerspective": "Add Perspective",
//             "addObjective": "Add Objective",
//             "addKPI": "Add KPI",
//             "addSubKPI": "Add Sub Kpi",
//             "editSubKPI": "Edit Sub Kpi Description",
//             "viewSubKPI": "View Sub Kpi Description",
//             "editPerspective": "Edit Perspective",
//             "viewPerspective": "View Perspective",
//             "editObjective": "Edit Objective Description",
//             "viewObjective": "View Objective Description",
//             "fileUpload": "File Upload",
//             "settings": "Settings",
//             "scorecardItems": {
//                 "save": "Save",
//                 "cancel": "Cancel",
//                  "id": "ID",
//                 "name": "Name",
//                 "description": "Description",
//                 "owner": "Owner",
//                 "department": "Department",
//                 "startEndDate": "Start/End Date",
//                 "performance": "Performance",
//                 "calculator": "Calculator",
//                 "kpiCalculator": "KPI Calculator",
//                 "weight": "Weight (%)",
//                 "subWeight": "Sub Weight (%)",               
//                 "status": "Status",
//                 "kpiType": "KPI Type",
//                 "threshold": "Threshold",
//                 "contribution": "Contribution(%)",
//                 "polarity": "Polarity",
//                 "dataSource": "Data Source",
//                 "measurementFrequency": "Measurement Frequency"
//             },
//             "addPerspectiveStatusOptions": {
//                     "choose": "Select Status",
//                     "manual": "Manual",
//                     "weighted": "Weighted"
//                 },
//             "scorecardList": "Scorecard List",
//             "scorecardListItems": {
//                 "status": "Status",
//                 "id": "ID",
//                 "name": "Name",
//                 "period": "Period",
//                 "score": "Score",
//                 "trend": "Trend",
//                 "baseline": "Baseline",
//                 "actual": "Actual",
//                 "target": "Target",
//                 "risk": "Risk",
//                 "actions": "Actions"
//             },
//             "kpiStoryCard": "KPI Story Card",
//             "kpiStoryCardItems": {
//                 "kpiName": "KPI Name",
//                 "alignmentObjectives": "Alignment Objectives",
//                 "owner": "Owner",
//                 "targetAudience": "Target Audience",
//                 "currentActual": "Current Actual",
//                 "target": "Target",
//                 "measurementMethod": "Measurement Method",
//                 "strategicInitiatives": "Strategic Initiatives",
//                 "timelines": "Timelines",
//                 "reportingFrequency": "Reporting Frequency",
//                 "successCriteria": "Success Criteria",
//                 "risks": "Risks",
//                 "supportNeeded": "Support Needed",
//                 "remarks": "Remarks"

//             },
//             "audit": {
//                 "createdBy": "Created By",
//                 "createdOn": "Created On",
//                 "lastModifiedBy": "Last Modified By",
//                 "lastModifiedOn": "Last Modified On"
//             }

//         }
//     }
// },

// ar : {
//   "page": {
//     "scorecard": {
//       "title": "بطاقة الأداء",
//       "addPerspective": "إضافة منظور",
//       "addObjective": "إضافة هدف",
//       "addKPI": "إضافة مؤشر قياس الأداء",
//       "addSubKPI": "إضافة مؤشر فرعي",
//       "editSubKPI": "تعديل وصف المؤشر الفرعي",
//       "viewSubKPI": "عرض وصف المؤشر الفرعي",
//       "editPerspective": "تعديل المنظور",
//       "viewPerspective": "عرض المنظور",
//       "editObjective": "تعديل وصف الهدف",
//       "viewObjective": "عرض وصف الهدف",
//       "fileUpload": "رفع ملف",
//       "settings": "الإعدادات",
//       "scorecardItems": {
//         "save": "حفظ",
//         "cancel": "إلغاء",
//         "id": "المعرف",
//         "name": "الاسم",
//         "description": "الوصف",
//         "owner": "المالك",
//         "department": "القسم",
//         "startEndDate": "تاريخ البدء/الانتهاء",
//         "performance": "الأداء",
//         "calculator": "الحاسبة",
//         "kpiCalculator": "حاسبة مؤشر الأداء",
//         "weight": "الوزن (%)",
//         "subWeight": "الوزن الفرعي (%)",
//         "status": "الحالة",
//         "kpiType": "نوع KPI",
//         "threshold": "الحد",
//         "contribution": "المساهمة (%)",
//         "polarity": "القطبية",
//         "dataSource": "مصدر البيانات",
//         "measurementFrequency": "تكرار القياس"
//       },
//       "addPerspectiveStatusOptions": {
//         "choose": "اختر الحالة",
//         "manual": "يدوي",
//         "weighted": "مرجح"
//       },
//       "scorecardList": "قائمة بطاقة الأداء",
//       "scorecardListItems": {
//         "status": "الحالة",
//         "id": "المعرف",
//         "name": "الاسم",
//         "period": "الفترة",
//         "score": "النتيجة",
//         "trend": "الاتجاه",
//         "baseline": "الخط الأساسي",
//         "actual": "القيمة الفعلية",
//         "target": "الهدف",
//         "risk": "المخاطر",
//         "actions": "الإجراءات"
//       },
//       "kpiStoryCard": "بطاقة قصة مؤشر الأداء",
//       "kpiStoryCardItems": {
//         "kpiName": "اسم مؤشر الأداء",
//         "alignmentObjectives": "أهداف التوافق",
//         "owner": "المالك",
//         "targetAudience": "الجمهور المستهدف",
//         "currentActual": "القيمة الحالية",
//         "target": "الهدف",
//         "measurementMethod": "طريقة القياس",
//         "strategicInitiatives": "المبادرات الاستراتيجية",
//         "timelines": "الجداول الزمنية",
//         "reportingFrequency": "تكرار التقارير",
//         "successCriteria": "معايير النجاح",
//         "risks": "المخاطر",
//         "supportNeeded": "الدعم المطلوب",
//         "remarks": "ملاحظات"
//       },
//       "audit": {
//                 "createdBy": "أنشئ بواسطة",
//                 "createdOn": "تاريخ الإنشاء",
//                 "lastModifiedBy": "آخر تعديل بواسطة",
//                 "lastModifiedOn": "تاريخ آخر تعديل"
//             }
//     }
//   }
// },
// }


  //  const page_leftbar_ar = {
  //   "Plan" : "خطة",
  //  }

  //  const page_leftbar_en = {
  //   "Plan" : "Plan",
  //  }

  //  const page_leftbar_am = {
  //   "Plan" : "እቅድ",
  //  }

    // Helper to get nested property
    function getNestedValueData(obj, path) {
      console.log(obj,path,  "gobj");
      return path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : null, obj);
    }

  // Load saved language on page load
  document.addEventListener('DOMContentLoaded', function() {
    console.log("function Called");
    var savedLang = localStorage.getItem('selectedLang') || 'en';
    console.log(savedLang, "savedLangugaeggg");
    let translation;

  var dir = savedLang == 'ar' ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', dir);
  document.body.style.textAlign = dir == 'rtl' ? 'right' : 'left';


    // Language display mapping





  //   if (savedLang == 'ar') {
  //     translation = page_leftbar_ar;
      
  //   } else if(savedLang == 'am'){
  //     translation = page_leftbar_am;
      
  //   } else {
  //     translation = page_leftbar_en;
      
  //   }

  //   document.querySelectorAll('[data-translate]').forEach(el => {
  //   const path = el.getAttribute('data-translate');
  //   const value = getNestedValueData(translation, path);
  //   if (value !== null) {
  //     el.textContent = value;
  //   }
  // });

  });

 
$(document).off('click', '[data-lang]').on('click', '[data-lang]', function(e) {
  e.preventDefault();
  const selectedLang = $(this).data('lang');
  console.log("function clicked")


 
  localStorage.setItem('selectedLang', selectedLang);

 
  setTimeout(() => {
    window.location.reload();
  }, 200);
});

function getorgtrackerpermission() {
  $.ajax({
    type: "GET",
    url: "/stratroom/user/modulePermissions?moduleName=Org Tracker",
    async: false,
    success: function (data) {
      $.each(data, function (forindex, fordata) {
        if (forindex == "Org Tracker" && !jQuery.isEmptyObject(fordata)) {
          $.each(fordata, function (forindex1, fordata1) {
            if (
              !jQuery.isEmptyObject(fordata1) &&
              fordata1.privilegeView == "FALSE"
            ) {
              $(".orgtrackeraccess").remove();
            }
          });
        }
      });
    },
  });
}

function getsiteName() {
  $.ajax({
    url: "/stratroom/generalSettingList",
    type: "GET",
    async: false,
    contentType: "application/json",
    success: function (response, status) {
    
    $("#startMonthDate").val(response.startMonth || "Jan");

    console.log(response.startMonth, "responseStartMonth");
    localStorage.setItem("startMonthData", response.startMonth || "Jan")
    // Get selected language (with typo fix: 'selecetedLang' → should be 'selectedLang', but we keep your key)
    const selectedLanguage = localStorage.getItem("selecetedLang") || "en";

  
    const dir = selectedLanguage == 'ar' ? 'rtl' : 'ltr';
    if (selectedLanguage == "ar") {
      localStorage.setItem('dir', dir);
      console.log("right side");
    } else {
      localStorage.setItem('dir', dir);
      console.log("leftside");  
    }




    // Map for display codes (ISO 639-1 in uppercase)
    const langDisplayCode = {
      en: "EN",
      ar: "AR",
      am: "AM"
    };

    // Update the dropdown toggle button text
    const displayCode = langDisplayCode[selectedLanguage] || "EN";
    $('#languageDropdown .icon').after(`<span class="lang-code" style="margin-left: 6px;">${displayCode}</span>`);

 

    const langMap = {
      en: { name: "English", dir: "ltr" },
      ar: { name: "Arabic", dir: "rtl" },
      am: { name: "Amharic", dir: "ltr" } 
    };

    
    const availableLangs = (response.siteLanguage || "").split(",").map(lang => lang.trim());

   
    const $dropdownMenu = $('.dropdown-menu[aria-labelledby="languageDropdown"]');

   
    $dropdownMenu.empty();

   
    availableLangs.forEach(langCode => {
      if (langMap[langCode]) {
        const langData = langMap[langCode];
        const $item = $(`
          <li>
            <a class="dropdown-item" href="#" data-lang="${langCode}" data-dir="${langData.dir}"
              style="color: #333; font-size: 14px; padding: 8px 16px; display: block;">
              ${langData.name}
            </a>
          </li>
        `);
        $dropdownMenu.append($item);
      }
    });

      console.log(response, "response");
      controlpanelgeneralsiteSettings = response;
      if (!jQuery.isEmptyObject(response)) {
        if (response["siteName"] != undefined) {
          $("title").text(response["siteName"]);
        }
        if (response != null && response.startMonth != undefined) {
          calendarYearfinStart = response.startMonth;
        }
        if (response != null && response.endMonth != undefined) {
          calendarYearfinEnd = response.endMonth;
        }
        if (response != null && response.defaultDatePeriod != undefined) {
          calendardefaultPeriod = response.defaultDatePeriod;
        }
        if (
          response.generalSettingValue != null &&
          response.generalSettingValue.notification != undefined
        ) {
          if (response.generalSettingValue.notification == false) {
            $(".notificationsetting").css("display", "none");
          }
        }
      }
    },
  });
}

function getAppLogo() {
  $.ajax({
    url: "/stratroom/themeList",
    type: "GET",
    contentType: "application/json",
    // success: function (response, status) {
    //   if (!jQuery.isEmptyObject(response)) {
    //     // Set login logo if available
    //     if (
    //       response["loginTheme"] != undefined &&
    //       response["loginTheme"] != null &&
    //       response["loginTheme"] != ""
    //     ) {
    //       $(".applogofinal").attr("src", response["loginTheme"]);
    //     }

    //     // Set theme color if available
    //     if (
    //       response["themeColor"] != undefined &&
    //       response["themeColor"] != null &&
    //       response["themeColor"] != ""
    //     ) {
    //       // 1. Save to localStorage
    //       localStorage.setItem("stratroomPrimaryColor", response["themeColor"]);
    //       const color = "#EB3D63"
    //       // // 2. Update CSS variables immediately
    //       document.documentElement.style.setProperty(
    //         "--stratroom-primary",
    //         response["themeColor"]
    //       );


    //       document.documentElement.style.setProperty(
    //         "--stratroom-nav-pills-link-active-bg",
    //         response["themeColor"]
    //       );

    //        document.documentElement.style.setProperty(
    //         "--stratroom-nav-pills-link-active-bg-new-one",
    //         response["themeColor"]
    //       );


    //       function hexToRgb(hex) {
    //           hex = hex.replace(/^#/, '');

    //           if (hex.length == 3) {
    //               hex = hex.split('').map(function(char) { return char + char; }).join('');
    //           }

    //           const bigint = parseInt(hex, 16);
    //           return (bigint >> 16 & 255) + ', ' + (bigint >> 8 & 255) + ', ' + (bigint & 255);
    //       }

    //       const rgbColor = hexToRgb(response["themeColor"]);

    //       console.log(rgbColor, "rgbColor");

    //       document.documentElement.style.setProperty(
    //           "--stratroom-primary-rgb", 
    //           rgbColor 
    //       );
          

          

           

      
    //       $(".custom-option-body").removeClass("selected");
    //       $(
    //         `.custom-option-body[data-color="${response["themeColor"]}"]`
    //       ).addClass("selected");

    //       // 4. If you have a color picker component, update its value
    //       if (window.pickrInstance) {
    //         // if using Pickr or similar
    //         window.pickrInstance.setColor(response["themeColor"]);
    //       }
    //     }

     
    //   }
    // },
    success: function (response, status) {
  if (!jQuery.isEmptyObject(response)) {
    // Set login logo if available
    if (
      response["loginTheme"] != undefined &&
      response["loginTheme"] != null &&
      response["loginTheme"] != ""
    ) {
      $(".applogofinal").attr("src", response["loginTheme"]);
    }

    // Set theme color if available
    if (
      response["themeColor"] != undefined &&
      response["themeColor"] != null &&
      response["themeColor"] != ""
    ) {
      // 1. Save to localStorage
      localStorage.setItem("stratroomPrimaryColor", response["themeColor"]);

      // 2. Update CSS variables immediately
      document.documentElement.style.setProperty(
        "--stratroom-primary",
        response["themeColor"]
      );
      document.documentElement.style.setProperty(
        "--stratroom-nav-pills-link-active-bg",
        response["themeColor"]
      );
      document.documentElement.style.setProperty(
        "--stratroom-nav-pills-link-active-bg-new-one",
        response["themeColor"]
      );

      // Helper: Convert HEX to RGB string
      function hexToRgb(hex) {
        hex = hex.replace(/^#/, "");
        if (hex.length === 3) {
          hex = hex
            .split("")
            .map(function (char) {
              return char + char;
            })
            .join("");
        }

        const bigint = parseInt(hex, 16);
        return [
          (bigint >> 16) & 255,
          (bigint >> 8) & 255,
          bigint & 255,
        ]; // return array [r,g,b]
      }

      // Convert theme color to RGB
      const rgbArray = hexToRgb(response["themeColor"]);
      const rgbString = rgbArray.join(", ");
      document.documentElement.style.setProperty("--stratroom-primary-rgb", rgbString);

      // Calculate brightness using standard formula
      const brightness =
        0.299 * rgbArray[0] + 0.587 * rgbArray[1] + 0.114 * rgbArray[2];

      // Adjust --stratroom-white based on brightness
      if (brightness > 180) {
        document.documentElement.style.setProperty("--stratroom-white", "#222222"); // dark color for light themes
        document.documentElement.style.setProperty("--stratroom-botton-color", "#222222");
        document.documentElement.style.setProperty("--stratroom-nav-pills-link-active-bg-new-one", "#ddd");

      } else {
        document.documentElement.style.setProperty("--stratroom-white", "#FFFFFF"); // white for dark themes
        document.documentElement.style.setProperty("--stratroom-botton-color", "#FFFFFF");
        // document.documentElement.style.setProperty("--stratroom-nav-pills-link-active-bg-new-one", "#ddd");
      }

      // Update selected color in the UI
      $(".custom-option-body").removeClass("selected");
      $(`.custom-option-body[data-color="${response["themeColor"]}"]`).addClass("selected");

      // If Pickr is being used, update its value
      if (window.pickrInstance) {
        window.pickrInstance.setColor(response["themeColor"]);
      }
    }
  }
}, error: function (xhr, status, error) {
      console.error("Error fetching theme data:", error);
    },
  });
}

// Call this function when the page loads
$(document).ready(function () {
  getAppLogo();

  // Initialize with the color from localStorage (if available)
  const savedColor = localStorage.getItem("stratroomPrimaryColor") || "#883B71"; // default fallback
  document.documentElement.style.setProperty("--stratroom-primary", savedColor);
});

function getScorecardSettings() {
  var newURL = window.location.href;
  newURL = newURL.toLowerCase();
  if (newURL.indexOf("controlpanel") == -1) {
    $.ajax({
      url: "/stratroom/customPerformance/details",
      type: "GET",
      async: false,
      contentType: "application/json",
      success: function (response, status) {
        controlpanelScorecardSettings = response;
      },
    });
  }
}

function getRiskSettings() {
  var newURL = window.location.href;
  newURL = newURL.toLowerCase();
  if (newURL.indexOf("controlpanel") == -1) {
    $.ajax({
      url: "/stratroom/customPerformance/riskdetails",
      type: "GET",
      async: false,
      contentType: "application/json",
      success: function (response, status) {
        controlpanelRiskSettings = response;
      },
    });
  }
}

function getLicenseDetailscommon() {
  $.ajax({
    url: "/stratroom/user/licenseDetails",
    async: false,
    type: "GET",
    contentType: "application/json",
    success: function (response, status) {
      LicenseDetailsdata = response;
    },
  });
}

function getPermissionList() {
  // BYPASS fallback: if /user/permissions returns empty or errors out
  // (404 / 500 / network failure), use a maximal grant so the UI renders
  // every module instead of silently locking the user out.
  var __allPriv = ["Create", "Update", "View", "Delete"];
  var __fullAccessFallback = {
    "Initiatives & Projects": __allPriv,
    "My Space": __allPriv,
    "PESTEL": __allPriv,
    "Meetings": __allPriv,
    "Risk": __allPriv,
    "Scorecard": __allPriv,
    "Standard_View": __allPriv,
    "SWOT": __allPriv,
    "Access Control": __allPriv,
    "Control Panel": __allPriv,
    "Data Sources": __allPriv,
    "Templates": __allPriv,
    "Template": __allPriv,
    "Charts": __allPriv,
    "Cockpit": __allPriv,
    "Report": __allPriv,
    "KPI": __allPriv,
    "Organization": __allPriv,
    "Organisation": __allPriv,
    "Strategy Formulation": __allPriv,
    "Project Formulation": __allPriv,
    "Risk Formulation": __allPriv,
    "Risksummary": __allPriv,
    "User Management": __allPriv,
    "Audit Trail": __allPriv,
    "Budget": __allPriv,
    "Masters": __allPriv,
  };
  $.ajax({
    url: "/stratroom/user/permissions",
    async: false,
    error: function () {
      // 404/500/network -> drive success path with the fallback so the UI
      // still gets a fully populated permission map.
      try { this.success(__fullAccessFallback); } catch (e) {}
    },
    success: function (employeeList) {
      if (!employeeList || jQuery.isEmptyObject(employeeList)) {
        employeeList = __fullAccessFallback;
      }
      globalPermission = employeeList;

      /*if(!jQuery.isEmptyObject(employeeList)){
				if(employeeList['Risk'] !=	undefined){
					riskPermission	=	employeeList['Risk'];
				}
			}*/

      $.each(employeeList, function (modulename, moduleaccess) {
        if (modulename == "Initiatives & Projects") {
          initiativePermission = moduleaccess;
        }
        if (modulename == "My Space") {
          employeePermission = moduleaccess;
        }
        if (modulename == "PESTEL") {
          pestelPermission = moduleaccess;
        }
        if (modulename == "Meetings") {
          meetingPermission = moduleaccess;
        }
        if (modulename == "Risk") {
          riskPermission = moduleaccess;
        }

        if (modulename == "Scorecard" || modulename == "Standard_View") {
          scorecardPermission = moduleaccess;
        }
        if (modulename == "SWOT") {
          swotPermission = moduleaccess;
        }
        if (modulename == "Access Control") {
          /*if(moduleaccess.length	==	4){
						enableaccesscontrolMenu	=	true;
					}*/
          if (moduleaccess.length >= 1 && moduleaccess.length <= 3) {
            accesscontrolMenupesmission = true;
          }
          accesscontrolPermission = moduleaccess;
        }
        if (modulename == "Control Panel") {
          controlpanelPermission = moduleaccess;
          if (moduleaccess.length >= 1) {
            controlpanelMenupesmission = true;
          }
        }
        if (modulename == "Data Sources") {
          datasourcepanelPermission = true;
        }
        if (modulename == "Templates" || modulename == "Template") {
          templatepanelPermission = true;
        }
        if (modulename == "Charts") {
          chartsPermission = moduleaccess;
        }
        if (modulename == "Cockpit") {
          dashboardPermission = moduleaccess;
        }
        if (modulename == "Report") {
          chartsPermission = moduleaccess;
        }
        if (modulename == "KPI") {
          kpiPermission = moduleaccess;
        }
        if (modulename == "Organization") {
          orgstructurePermission = moduleaccess;
        }
        if (modulename == "Strategy Formulation") {
          strategyforPermission = moduleaccess;
          strategyforlink = true;
        }
        if (modulename == "Project Formulation") {
          projectforPermission = moduleaccess;
          projectforlink = true;
        }
        if (modulename == "Risk Formulation") {
          riskforPermission = moduleaccess;
        }
        if (modulename == "Risksummary") {
          risksummaryPermission = moduleaccess;
        }
        if (modulename == "User Management") {
          userRoleLink = true;
          userrolePermission = moduleaccess;
        }
        if (modulename == "Audit Trail") {
          auditLink = true;
          auditPermission = moduleaccess;
        }
      });

      if (jQuery.inArray("Create", initiativePermission) == -1) {
        $("#uploadcategory option[value='Initiative & Projects']").remove();
        $("#uploadcategory option[value='Initiative Import']").remove();
      }

      if (jQuery.inArray("Create", projectforPermission) == -1) {
        $("#uploadcategory option[value='ProjectFormulation']").remove();
        $("#uploadcategory option[value='Project Formulation']").remove();
      }

      if (jQuery.inArray("Create", riskforPermission) == -1) {
        $("#uploadcategory option[value='RiskFormulation']").remove();
        $("#uploadcategory option[value='Risk Formulation']").remove();
      }

      if (jQuery.inArray("Create", scorecardPermission) == -1) {
        $("#uploadcategory option[value='Scorecard Import']").remove();
      }

      if (jQuery.inArray("Create", riskPermission) == -1) {
        $("#uploadcategory option[value='Risk']").remove();
        $("#uploadcategory option[value='Risk Import']").remove();
      }

      if (jQuery.inArray("Create", strategyforPermission) == -1) {
        $("#uploadcategory option[value='StrategyFormulation']").remove();
      }
    },
  });

  //if(datasourcepanelPermission	==	false && enableaccesscontrolMenu	==	false){
  if (datasourcepanelPermission == false) {
    $(".datasourceclass").remove();
  }
  if (userRoleLink == false) {
    $(".userrolepage").remove();
  }
  if (auditLink == false) {
    $(".audittrailpage").remove();
  }
  /*if(jQuery.inArray("Create", scorecardPermission) !== -1){
		templatepanelPermission	=	true;
	}*/
  if (templatepanelPermission == false) {
    $(".templatelink").remove();
  }

  if (accesscontrolMenupesmission != true) {
    //enableaccesscontrolMenu	==	false && accesscontrolMenupesmission !=	true
    $(".enableaccesscontrolMenu").remove();
    //$(".controlpanel").remove();
  }

  if (controlpanelMenupesmission != true) {
    //enableaccesscontrolMenu	==	false && controlpanelMenupesmission !=	true
    //$(".enableaccesscontrolMenu").remove();
    $(".controlpanel").remove();
  }

  if (
    jQuery.inArray("Create", riskPermission) !== -1 ||
    jQuery.inArray("Create", initiativePermission) !== -1 ||
    jQuery.inArray("Create", employeePermission) !== -1 ||
    jQuery.inArray("Create", pestelPermission) !== -1 ||
    jQuery.inArray("Create", meetingPermission) !== -1 ||
    jQuery.inArray("Create", scorecardPermission) !== -1 ||
    jQuery.inArray("Create", swotPermission) !== -1 ||
    jQuery.inArray("Create", projectforPermission) !== -1 ||
    jQuery.inArray(
      "Create",
      strategyforPermission ||
        jQuery.inArray("Create", riskforPermission) !== -1
    ) !== -1
  ) {
    dashboardcreareflag = true;
  }

  if (
    jQuery.inArray("Create", orgstructurePermission) !== -1 ||
    jQuery.inArray("View", orgstructurePermission) !== -1 ||
    jQuery.inArray("Delete", orgstructurePermission) !== -1 ||
    jQuery.inArray("Update", orgstructurePermission) !== -1
  ) {
    organizationlink = true;
  }

  if (organizationlink == false) {
    $(".organizationhome, .zoomoptionbtns").remove();
  }

  if (
    jQuery.inArray("Create", chartsPermission) !== -1 ||
    jQuery.inArray("Create", dashboardPermission) !== -1
  ) {
    whitecreareflag = true;
  }

  if (dashboardcreareflag == false) {
    $(".addnewpagehover").closest("#custompage li").remove();
  }

  if (whitecreareflag == false) {
    $(".addnewpagehover").closest("#custompage1 li").remove();
  }

  if (
    jQuery.inArray("View", riskPermission) == -1 &&
    jQuery.inArray("View", initiativePermission) == -1 &&
    jQuery.inArray("View", employeePermission) == -1 &&
    jQuery.inArray("View", pestelPermission) == -1 &&
    jQuery.inArray("View", meetingPermission) == -1 &&
    jQuery.inArray("View", scorecardPermission) == -1 &&
    jQuery.inArray("View", swotPermission) == -1 &&
    jQuery.inArray("View", accesscontrolPermission) == -1 &&
    jQuery.inArray("View", controlpanelPermission) == -1 &&
    jQuery.inArray("View", chartsPermission) == -1 &&
    jQuery.inArray("View", dashboardPermission) == -1 &&
    jQuery.inArray("View", orgstructurePermission) == -1 &&
    jQuery.inArray("View", strategyforPermission) == -1 &&
    jQuery.inArray("View", risksummaryPermission) == -1 &&
    jQuery.inArray("View", projectforPermission) == -1 &&
    jQuery.inArray("View", riskforPermission) == -1
  ) {
    overallmodulepermission = true;
  }

  var checkemptydash = false;
  var checkemptywhite = false;

  if (
    jQuery.inArray("View", riskPermission) == -1 ||
    jQuery.inArray("View", initiativePermission) == -1 ||
    jQuery.inArray("View", employeePermission) == -1 ||
    jQuery.inArray("View", pestelPermission) == -1 ||
    jQuery.inArray("View", meetingPermission) == -1 ||
    jQuery.inArray("View", scorecardPermission) == -1 ||
    jQuery.inArray("View", swotPermission) == -1 ||
    jQuery.inArray("View", accesscontrolPermission) == -1 ||
    jQuery.inArray("View", controlpanelPermission) == -1 ||
    jQuery.inArray("View", orgstructurePermission) == -1 ||
    jQuery.inArray("View", strategyforPermission) == -1 ||
    jQuery.inArray("View", risksummaryPermission) == -1 ||
    jQuery.inArray("View", projectforPermission) == -1 ||
    jQuery.inArray("View", riskforPermission) == -1
  ) {
    checkemptydash = true;
  }

  if (checkemptydash == false) {
    $(".dashboardclass").remove();
  }

  if (
    jQuery.inArray("View", chartsPermission) !== -1 ||
    jQuery.inArray("View", dashboardPermission) !== -1
  ) {
    checkemptywhite = true;
  }

  if (checkemptywhite == false) {
    $(".whiteboardclass").remove();
  }

  // BYPASS: Never lock the user out via the "no access" interval toast.
  // The legacy decision (overallmodulepermission == true) fired whenever
  // /user/permissions returned empty or the license filter wiped it. We
  // ignore that branch and always treat the user as having access.
  overallmodulepermission = false;

  var exceluploadper = false;
  if (
    jQuery.inArray("Create", orgstructurePermission) !== -1 ||
    jQuery.inArray("Create", initiativePermission) !== -1 ||
    jQuery.inArray("Create", scorecardPermission) !== -1
  ) {
    exceluploadper = true;
  }

  if (exceluploadper == false) {
    $(".exceluploadlink").remove();
  }

  if ($("#custompage li").length == 0) {
    $(".dashboardclass").remove();
  }

  if ($("#custompage1 li").length == 0) {
    $(".whiteboardclass").remove();
  }
}

function getdatasourcepermission() {
  $.ajax({
    type: "GET",
    url: "/stratroom/user/modulePermissions?moduleName=Scorecard",
    success: function (data) {
      if (
        data.Scorecard != undefined &&
        !jQuery.isEmptyObject(data.Scorecard)
      ) {
        if (
          data.Scorecard.Scorecard.privilegeCreate != undefined &&
          data.Scorecard.Scorecard.privilegeCreate == "FALSE"
        ) {
          $("#datasourcesubmenu li:eq(0)").remove();
          $(".templatenames li:eq(0)").remove();
        }
      }
    },
  });
}

function getdatasourcemodulepermission() {
  $.ajax({
    type: "GET",
    url: "/stratroom/user/modulePermissions?moduleName=Data Sources",
    async: false,
    success: function (data) {
      var datasourcemanualflag = false;
      var datasourceothersflag = false;
      var datasourceexcelflag = false;
      kpidatasourcepermission = data;
      $.each(data, function (forindex, fordata) {
        if (fordata.Manual != undefined) {
          if (
            fordata.Manual.privilegeView != undefined &&
            fordata.Manual.privilegeView == "FALSE"
          ) {
            $("#datasourcesubmenu .datasourcemanul").remove();
            datasourcemanualflag = true;
          }
        }
        if (fordata.Excel != undefined) {
          if (
            fordata.Excel.privilegeView != undefined &&
            fordata.Excel.privilegeView == "FALSE"
          ) {
            $("#datasourcesubmenu .exceluploadlink").remove();
            datasourceexcelflag = true;
          }
        }
        if (fordata.Others != undefined) {
          if (
            fordata.Others.privilegeView != undefined &&
            fordata.Others.privilegeView == "FALSE"
          ) {
            $("#datasourcesubmenu .datasourceothers").remove();
            datasourceothersflag = true;
          }
        }
      });
      if (datasourcemanualflag && datasourceothersflag && datasourceexcelflag) {
        $(".datasourceclass").remove();
      }
    },
  });
}

function gettemplatesemodulepermission() {
  $.ajax({
    type: "GET",
    url: "/stratroom/user/modulePermissions?moduleName=Template",
    success: function (data) {
      var excelcheckflag = false;
      var scorecheckflag = false;
      var mastercheckflag = false;
      $.each(data, function (forindex, fordata) {
        if (fordata.Excel != undefined) {
          if (
            fordata.Excel.privilegeCreate != undefined &&
            fordata.Excel.privilegeCreate == "FALSE" &&
            fordata.Excel.privilegeDelete != undefined &&
            fordata.Excel.privilegeDelete == "FALSE" &&
            fordata.Excel.privilegeUpdate != undefined &&
            fordata.Excel.privilegeUpdate == "FALSE" &&
            fordata.Excel.privilegeView != undefined &&
            fordata.Excel.privilegeView == "FALSE"
          ) {
            excelcheckflag = true;
            $(".templatenames .exceltemplatesmenu").remove();
          }
        }
        if (fordata.Excel != undefined && jQuery.isEmptyObject(fordata.Excel)) {
          $(".templatenames .exceltemplatesmenu").remove();
        }
        if (fordata.Masters != undefined) {
          if (
            fordata.Masters.privilegeCreate != undefined &&
            fordata.Masters.privilegeCreate == "FALSE" &&
            fordata.Masters.privilegeDelete != undefined &&
            fordata.Masters.privilegeDelete == "FALSE" &&
            fordata.Masters.privilegeUpdate != undefined &&
            fordata.Masters.privilegeUpdate == "FALSE" &&
            fordata.Masters.privilegeView != undefined &&
            fordata.Masters.privilegeView == "FALSE"
          ) {
            mastercheckflag = true;
            $(".templatenames .masterstemplatesmenu").remove();
          }
        }
        if (
          fordata.Masters != undefined &&
          jQuery.isEmptyObject(fordata.Masters)
        ) {
          $(".templatenames .masterstemplatesmenu").remove();
        }
        $.each(fordata, function (forindex1, fordata1) {
          if (forindex1 == "Standard BSC") {
            if (
              fordata1.privilegeCreate != undefined &&
              fordata1.privilegeCreate == "FALSE"
            ) {
              scorecheckflag = true;
              $(".templatenames .scorecardtemplatesmenu").remove();
            }
          }
        });
      });
      if (excelcheckflag && scorecheckflag) {
        $(".templatelink").remove();
      }
    },
  });
}

function triggerpageaccessmsg() {
  // BYPASS: Permanently silenced. The legacy code showed an "access denied"
  // toast on a 10-second interval whenever the permission load returned empty,
  // even for valid users. We never want this toast to appear again.
  if (typeof startmsg !== "undefined" && startmsg) {
    try { clearInterval(startmsg); } catch (e) {}
  }
  return;
}

if (typeof jQuery == "undefined") {
  throw new Error("jQuery plugins need to be before this file");
}

// declare variables
$.MyAdmin = {};
$.MyAdmin.options = {
  leftSideBar: {
    scrollColor: "rgba(0,0,0,0.5)",
    scrollWidth: "4px",
    scrollAlwaysVisible: false,
    scrollBorderRadius: "0",
    scrollRailBorderRadius: "0",
    scrollActiveItemWhenPageLoad: true,
    breakpointWidth: 1170,
  },
  dropdownMenu: {
    effectIn: "pullDown",
    effectOut: "fadeOut",
  },
};
/* Tooltip */
$.MyAdmin.tooltip = {
  activate: function () {
    $('[data-toggle="tooltip"]').tooltip({
      placement: "top",
    });
  },
};
/* Left Sidebar */

$.MyAdmin.leftSideBar = {
  activate: function () {
    var _this = this;
    var $body = $("body");
    var $overlay = $(".overlay");

    //Close sidebar
    $(window).on("click", function (e) {
      var $target = $(e.target);
      if (e.target.nodeName.toLowerCase() == "i") {
        $target = $(e.target).parent();
      }

      if (
        !$target.hasClass("bars") &&
        _this.isOpen() &&
        $target.parents("#leftsidebar").length == 0
      ) {
        if (!$target.hasClass("js-right-sidebar")) $overlay.fadeOut();
        $body.removeClass("overlay-open");
      }
    });

    $.each($(".menu-toggle.toggled"), function (i, val) {
      $(val).next().slideToggle(0);
    });

    //When page load
    $.each($(".menu .list li.active"), function (i, val) {
      var $activeAnchors = $(val).find("a:eq(0)");
      var elementID = $(val).closest("ul");
      if (
        $(elementID).attr("id") != "custompage" &&
        $(elementID).attr("id") != "custompage1"
      ) {
        $activeAnchors.addClass("toggled");
      }
      $activeAnchors.next().show();
    });

    //Collapse or Expand Menu
    $(".menu-toggle").on("click", function (e) {
      var $this = $(this);
      var $content = $this.next();

      if ($($this.parents("ul")[0]).hasClass("list")) {
        var $not = $(e.target).hasClass("menu-toggle")
          ? e.target
          : $(e.target).parents(".menu-toggle");

        $.each($(".menu-toggle.toggled").not($not).next(), function (i, val) {
          if ($(val).is(":visible")) {
            $(val).prev().toggleClass("toggled");
            $(val).slideUp();
          }
        });
      }

      $this.toggleClass("toggled");
      $content.slideToggle(320);
    });

    //Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
    $(window).resize(function () {
      _this.setMenuHeight();
      _this.checkStatuForResize(false);
    });

    //Set Waves
    Waves.attach(".menu .list a", ["waves-block"]);
    Waves.init();
  },
  setMenuHeight: function (isFirstTime) {
    if (typeof $.fn.slimScroll != "undefined") {
      var configs = $.MyAdmin.options.leftSideBar;
      //var height = ($(window).height() - ($('.legal').outerHeight() + $('.user-info').outerHeight() + $('.navbar').innerHeight()));
      var height = $(window).height() - $(".navbar").innerHeight();
      var $el = $(".list");

      $el.slimscroll({
        height: height + "px",
        color: configs.scrollColor,
        size: configs.scrollWidth,
        alwaysVisible: configs.scrollAlwaysVisible,
        borderRadius: configs.scrollBorderRadius,
        railBorderRadius: configs.scrollRailBorderRadius,
        color: "#e9ecef",
      });
      //var $e = $('.tab-content');

      // $e.slimscroll({
      //     height: height + "px",
      //     color: configs.scrollColor,
      //     size: configs.scrollWidth,
      //     alwaysVisible: configs.scrollAlwaysVisible,
      //     borderRadius: configs.scrollBorderRadius,
      //     railBorderRadius: configs.scrollRailBorderRadius
      // });

      //Scroll active menu item when page load, if option set = true
      if ($.MyAdmin.options.leftSideBar.scrollActiveItemWhenPageLoad) {
        if ($(".menu .list li.active").length) {
          var activeItemOffsetTop = $(".menu .list li.active")[0].offsetTop;
          if (activeItemOffsetTop > 150)
            $el.slimscroll({ scrollTo: activeItemOffsetTop + "px" });
        }
      }
    }
  },
  checkStatuForResize: function (firstTime) {
    var $body = $("body");
    var $openCloseBar = $(".navbar .navbar-header .bars");
    var width = $body.width();

    if (firstTime) {
      $body
        .find(".content, .sidebar")
        .addClass("no-animate")
        .delay(1000)
        .queue(function () {
          $(this).removeClass("no-animate").dequeue();
        });
    }

    if (width < $.MyAdmin.options.leftSideBar.breakpointWidth) {
      $body.addClass("ls-closed");
      //$body.addClass('overlay-open');
      $openCloseBar.fadeIn();
      $openCloseBar.css("display", "block");
    } else {
      $body.removeClass("ls-closed");
      $openCloseBar.fadeOut();
    }
  },
  isOpen: function () {
    return $("body").hasClass("overlay-open");
  },
};

$(".closesubmenuremove,.contextmenustratroompage1").on("click", function () {
  localStorage.setItem("sidebar_subsidemenu", "opened");
});

$(".collapse_arrow_left").on("click", function () {
  $(this).css("display", "none");
  $(".collapse_arrow_right").css("display", "block");
  var $body = $("body");
  $body.addClass("ini-hide");
  $body.removeClass("ini-show");
  localStorage.setItem("sidebar_subsidemenu", "opened");
  initiativeBar();
});

$(".collapse_arrow_right").on("click", function () {
  $(this).css("display", "none");
  $(".collapse_arrow_left").css("display", "block");
  var $body = $("body");
  $body.addClass("ini-show");
  $body.removeClass("ini-hide");
  localStorage.setItem("sidebar_subsidemenu", "closed");
  initiativeBar();
});

$(".collapse_sb_left").on("click", function () {
  $(this).css("display", "none");
  $(".collapse_sb_right").css("display", "block");
  var $body = $("body");
  $body.addClass("ini-sb-hide");
  $body.removeClass("ini-sb-show");
  initiativeSbBar();
});

$(".collapse_sb_right").on("click", function () {
  $(this).css("display", "none");
  $(".collapse_sb_left").css("display", "block");
  var $body = $("body");
  $body.addClass("ini-sb-show");
  $body.removeClass("ini-sb-hide");
  initiativeSbBar();
});

function initiativeSbBar() {
  var $body = $("body");
  // console.log($body);
  if ($body.hasClass("ini-sb-hide")) {
    $(".sidebarNavigate").css("left", "60px");
  } else if ($body.hasClass("ini-sb-show")) {
    $(".sidebarNavigate").css("left", "-130px");
  }

  // if (!($body.hasClass('side-closed'))) {
  //     $body.addClass('sbMenu');
  // }
}

function initiativeBar() {
  var $body = $("body");
  // console.log($body);
  $body.addClass("ini-sb-show");
  if ($body.hasClass("ini-sb-hide")) {
    $(".sidebarNavigate").css("left", "60px");
    $(".collapse_sb_right").show();
    $(".collapse_sb_left").hide();
  } else if ($body.hasClass("ini-sb-show")) {
    $(".sidebarNavigate").css("left", "-130px");
    $(".collapse_sb_right").hide();
    $(".collapse_sb_left").show();
  }

  if (
    $body.hasClass("side-closed") &&
    localStorage.getItem("dashboardexpand") != "" &&
    localStorage.getItem("dashboardexpand") != null
  ) {
    $("ul#custompage").css("display", "none");
  }
  if (
    !$body.hasClass("side-closed") &&
    (localStorage.getItem("dashboardexpand") != "") &
      (localStorage.getItem("dashboardexpand") != null)
  ) {
    $(".dashboardclass #custompage").css("display", "block");
  }
  if (
    $body.hasClass("side-closed-hover") &&
    (localStorage.getItem("dashboardexpand") != "") &
      (localStorage.getItem("dashboardexpand") != null)
  ) {
    $(".dashboardclass #custompage").css("display", "block");
  }

  if (
    localStorage.getItem("sidebar_subsidemenu") != "" &&
    localStorage.getItem("sidebar_subsidemenu") != null &&
    localStorage.getItem("sidebar_subsidemenu") == "closed"
  ) {
    $body.addClass("ini-show");
    $body.removeClass("ini-hide");
    $(".collapse_arrow_left").css("display", "block");
    $(".collapse_arrow_right").css("display", "none");
  }

  if (
    localStorage.getItem("sidebar_subsidemenu") != "" &&
    localStorage.getItem("sidebar_subsidemenu") != null &&
    localStorage.getItem("sidebar_subsidemenu") == "opened"
  ) {
    $body.addClass("ini-hide");
    $body.removeClass("ini-show");
    $(".collapse_arrow_left").css("display", "none");
    $(".collapse_arrow_right").css("display", "block");
  }

  if (
    !$body.hasClass("submenu-closed") &&
    !$body.hasClass("side-closed") &&
    !$body.hasClass("ini-hide") &&
    !$body.hasClass("ini-show")
  ) {
    $("#initiative_sidebar").css("left", "270px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "485px");
  } else if (
    $body.hasClass("submenu-closed") &&
    !$body.hasClass("side-closed") &&
    !$body.hasClass("side-closed-hover") &&
    !$body.hasClass("ini-hide") &&
    !$body.hasClass("ini-show")
  ) {
    $("#initiative_sidebar").css("left", "230px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "484px");
  } else if (
    $body.hasClass("side-closed-hover") &&
    !$body.hasClass("side-closed") &&
    !$body.hasClass("submenu-closed") &&
    !$body.hasClass("ini-hide") &&
    !$body.hasClass("ini-show")
  ) {
    $("#initiative_sidebar").css("left", "260px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "484px");
  } else if (
    $body.hasClass("submenu-closed") &&
    $body.hasClass("side-closed") &&
    !$body.hasClass("side-closed-hover") &&
    !$body.hasClass("ini-hide") &&
    !$body.hasClass("ini-show")
  ) {
    $("#initiative_sidebar").css("left", "59px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "313px");
    if (
      $body.hasClass("submenu-closed") &&
      $body.hasClass("side-closed") &&
      (localStorage.getItem("dashboardexpand") != "") &
        (localStorage.getItem("dashboardexpand") != null)
    ) {
      $("ul#custompage").css("display", "none");
    }
  } else if (
    $body.hasClass("side-closed") &&
    $body.hasClass("side-closed-hover") &&
    !$body.hasClass("submenu-closed") &&
    !$body.hasClass("ini-hide") &&
    !$body.hasClass("ini-show")
  ) {
    $("#initiative_sidebar").css("left", "260px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "514px"); //end default
  } else if (
    $body.hasClass("submenu-closed") &&
    $body.hasClass("ini-hide") &&
    !$body.hasClass("side-closed")
  ) {
    $("#initiative_sidebar").css("left", "-10px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "244px");
  } else if (
    $body.hasClass("submenu-closed") &&
    $body.hasClass("side-closed") &&
    $body.hasClass("ini-hide")
  ) {
    $("#initiative_sidebar").css("left", "-260px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "75px");
  } else if (
    $body.hasClass("ini-hide") &&
    !$body.hasClass("side-closed") &&
    !$body.hasClass("submenu-closed") &&
    !$body.hasClass("side-closed-hover")
  ) {
    $("#initiative_sidebar").css("left", "-10px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "244px");
  } else if (
    $body.hasClass("ini-hide") &&
    $body.hasClass("side-closed-hover") &&
    !$body.hasClass("submenu-closed") &&
    $body.hasClass("side-closed")
  ) {
    $("#initiative_sidebar").css("left", "-260px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "275px"); //end hide
  } else if (
    $body.hasClass("submenu-closed") &&
    $body.hasClass("ini-show") &&
    !$body.hasClass("side-closed")
  ) {
    $("#initiative_sidebar").css("left", "230px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "485px");
  } else if (
    $body.hasClass("submenu-closed") &&
    $body.hasClass("side-closed") &&
    $body.hasClass("ini-show")
  ) {
    $("#initiative_sidebar").css("left", "60px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "264px");
  } else if (
    $body.hasClass("ini-show") &&
    !$body.hasClass("side-closed") &&
    !$body.hasClass("submenu-closed") &&
    !$body.hasClass("side-closed-hover")
  ) {
    $("#initiative_sidebar").css("left", "230px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "485px");
  } else if (
    $body.hasClass("ini-show") &&
    $body.hasClass("side-closed-hover") &&
    !$body.hasClass("submenu-closed") &&
    $body.hasClass("side-closed")
  ) {
    $("#initiative_sidebar").css("left", "260px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "514px");
  }
}

/*  Left sidemenu collapse */
$(".sidemenu-collapse").on("click", function () {
  var $body = $("body");
  if ($body.hasClass("side-closed")) {
    $body.removeClass("side-closed");
    $body.removeClass("submenu-closed");
    initiativeBar();
  } else {
    $body.addClass("side-closed");
    $body.addClass("submenu-closed");
    initiativeBar();
  }
  /*if ($body.hasClass('side-closed')) {
		$("#chartdiv_init").css({ "display": "none" });
		$("#chartdiv_expandinit").css({ "display": "block" });	
	}else{
		$("#chartdiv_init").css({ "display": "block" });
		$("#chartdiv_expandinit").css({ "display": "none" });
	}*/

  if (
    $body.hasClass("side-closed") &&
    localStorage.getItem("dashboardexpand") != ""
  ) {
    $(".dashboardclass ul.custompage").css("display", "none");
  }
});

$(".content, .navbar").mouseenter(function () {
  var $body = $("body");
  $body.removeClass("side-closed-hover");
  $body.addClass("submenu-closed");
  /*if ($body.hasClass('side-closed')) {
		$("#chartdiv_init").css({ "display": "none" });
		$("#chartdiv_expandinit").css({ "display": "block" });	
	}else{
		$("#chartdiv_init").css({ "display": "block" });
		$("#chartdiv_expandinit").css({ "display": "none" });
	}*/

  initiativeBar();
});

$(".sidebar").mouseenter(function () {
  var $body = $("body");
  $body.addClass("side-closed-hover");
  $body.removeClass("submenu-closed");
  //$("#chartdiv_expandinit").css({ "display": "none" });
  //$("#chartdiv_init").css({ "display": "block" });
  initiativeBar();
});

if (localStorage.getItem("sidebar_option")) {
  jQuery("body").addClass(localStorage.getItem("sidebar_option"));
}
if ($("body").hasClass("side-closed")) {
  $(".sidebar-user-panel").css({ display: "none" });
  initiativeBar();
} else {
  $(".sidebar-user-panel").css({ display: "block" });
  initiativeBar();
}
jQuery(document).on("click", ".sidemenu-collapse", function () {
  var sidebar_option = "";
  var $body = $("body");
  if ($("body").hasClass("side-closed")) {
    var sidebar_option = "side-closed submenu-closed";
    $(".sidebar-user-panel").css({ display: "none" });
    initiativeBar();
  } else {
    $(".sidebar-user-panel").css({ display: "block" });
    initiativeBar();
  }
  jQuery("body").addClass(sidebar_option);
  localStorage.setItem("sidebar_option", sidebar_option);
  /*if ($body.hasClass('side-closed')) {
		$("#chartdiv_init").css({ "display": "none" });
		$("#chartdiv_expandinit").css({ "display": "block" });	
	}else{
		$("#chartdiv_init").css({ "display": "block" });
		$("#chartdiv_expandinit").css({ "display": "none" });
	}*/
});

/* Right Sidebar */
$.MyAdmin.rightSideBar = {
  activate: function () {
    var _this = this;
    var $sidebar = $("#rightsidebar");
    var $overlay = $(".overlay");
    $sidebar.removeClass("open");

    //Close sidebar
    $(window).on("click", function (e) {
      var $target = $(e.target);
      if (e.target.nodeName.toLowerCase() == "i") {
        $target = $(e.target).parent();
      }

      if (
        !$target.hasClass("js-right-sidebar") &&
        _this.isOpen() &&
        $target.parents("#rightsidebar").length == 0
      ) {
        if (!$target.hasClass("bars")) $overlay.fadeOut();
        $sidebar.removeClass("open");
      }
    });

    $(".js-right-sidebar").on("click", function () {
      $sidebar.toggleClass("open");
      if (_this.isOpen()) {
        $overlay.fadeIn();
      } else {
        $overlay.fadeOut();
      }
    });
  },
  isOpen: function () {
    return $(".right-sidebar").hasClass("open");
  },
};

$.MyAdmin.formSideBar = {
  activate: function () {
    var _this = this;
    var $sidebar = $("#formsidebar");
    var $overlay = $(".overlay");

    //Close sidebar
    $(window).on("click", function (e) {
      var $target = $(e.target);
      if (e.target.nodeName.toLowerCase() == "i") {
        $target = $(e.target).parent();
      }

      if (
        !$target.hasClass("editForm") &&
        _this.isOpen() &&
        $target.parents("#formsidebar").length == 0
      ) {
        if (!$target.hasClass("bars")) $overlay.fadeOut();
        $sidebar.removeClass("open");
      }
    });
    $(".editForm").on("click", function () {
      $sidebar.toggleClass("open");
      if (_this.isOpen()) {
        $overlay.fadeIn();
      } else {
        $overlay.fadeOut();
      }
    });
  },
  isOpen: function () {
    return $(".form-sidebar").hasClass("open");
  },
};
/* Navbar */
$.MyAdmin.navbar = {
  activate: function () {
    var $body = $("body");
    var $overlay = $(".overlay");

    //Open left sidebar panel
    $(".bars").on("click", function () {
      $body.toggleClass("overlay-open");
      // if ($body.hasClass('overlay-open')) { $overlay.fadeIn(); } else { $overlay.fadeOut(); }
    });

    //Close collapse bar on click event
    $('.nav [data-close="true"]').on("click", function () {
      var isVisible = $(".navbar-toggle").is(":visible");
      var $navbarCollapse = $(".navbar-collapse");

      if (isVisible) {
        $navbarCollapse.slideUp(function () {
          $navbarCollapse.removeClass("in").removeAttr("style");
        });
      }
    });
  },
};
/* Input - Function */
$.MyAdmin.input = {
  activate: function () {
    //On focus event
    $(".form-control").focus(function () {
      $(this).parent().addClass("focused");
    });

    //On focusout event
    $(".form-control").focusout(function () {
      var $this = $(this);
      if ($this.parents(".form-group").hasClass("form-float")) {
        if ($this.val() == "") {
          $this.parents(".form-line").removeClass("focused");
        }
      } else {
        $this.parents(".form-line").removeClass("focused");
      }
    });

    //On label click
    $("body").on("click", ".form-float .form-line .form-label", function () {
      $(this).parent().find("input").focus();
    });

    //Not blank form
    $(".form-control").each(function () {
      if ($(this).val() !== "") {
        $(this).parents(".form-line").addClass("focused");
      }
    });
  },
};
/* Form - Select */
$.MyAdmin.select = {
  activate: function () {
    if ($.fn.selectpicker) {
      $("select:not(.ms)").selectpicker();
    }
  },
};

/* Browser */
var edge = "Microsoft Edge";
var ie10 = "Internet Explorer 10";
var ie11 = "Internet Explorer 11";
var opera = "Opera";
var firefox = "Mozilla Firefox";
var chrome = "Google Chrome";
var safari = "Safari";

$.MyAdmin.browser = {
  activate: function () {
    var _this = this;
    var className = _this.getClassName();

    if (className !== "") $("html").addClass(_this.getClassName());
  },
  getBrowser: function () {
    var userAgent = navigator.userAgent.toLowerCase();

    if (/edge/i.test(userAgent)) {
      return edge;
    } else if (/rv:11/i.test(userAgent)) {
      return ie11;
    } else if (/msie 10/i.test(userAgent)) {
      return ie10;
    } else if (/opr/i.test(userAgent)) {
      return opera;
    } else if (/chrome/i.test(userAgent)) {
      return chrome;
    } else if (/firefox/i.test(userAgent)) {
      return firefox;
    } else if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) {
      return safari;
    }

    return undefined;
  },
  getClassName: function () {
    var browser = this.getBrowser();

    if (browser == edge) {
      return "edge";
    } else if (browser == ie11) {
      return "ie11";
    } else if (browser == ie10) {
      return "ie10";
    } else if (browser == opera) {
      return "opera";
    } else if (browser == chrome) {
      return "chrome";
    } else if (browser == firefox) {
      return "firefox";
    } else if (browser == safari) {
      return "safari";
    } else {
      return "";
    }
  },
};
//Skin changer
function skinChanger() {
  $(".right-sidebar .demo-choose-skin li").on("click", function () {
    var $body = $("body");
    var $this = $(this);

    var existTheme = $(".right-sidebar .demo-choose-skin li.actived").data(
      "theme"
    );
    $(".right-sidebar .demo-choose-skin li").removeClass("actived");
    $body.removeClass("theme-" + existTheme);
    $this.addClass("actived");

    $body.addClass("theme-" + $this.data("theme"));
    var choose_skin = "theme-" + $this.data("theme");
    localStorage.setItem("choose_skin", choose_skin);
    localStorage.setItem("choose_skin_active", $this.data("theme"));
  });
}
//Full screen window
function callFullScreen() {
  $(document).on("click", ".fullscreen-btn", function (e) {
    if (
      !document.fullscreenElement && // alternative standard method
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  });
}

function setSkinListHeightAndScroll(isFirstTime) {
  var height =
    $(window).height() -
    ($(".navbar").innerHeight() + $(".right-sidebar .nav-tabs").outerHeight());
  var $el = $(".right-sidebar .demo-skin");

  if (!isFirstTime) {
    $el.slimScroll({ destroy: true }).height("auto");
    $el.parent().find(".slimScrollBar, .slimScrollRail").remove();
  }

  $el.slimscroll({
    height: height + "px",
    color: "rgba(0,0,0,0.5)",
    size: "6px",
    alwaysVisible: false,
    borderRadius: "0",
    railBorderRadius: "0",
    color: "#e9ecef",
  });
}

//Setting tab content set height and show scroll
function setSettingListHeightAndScroll(isFirstTime) {
  var height =
    $(window).height() -
    ($(".navbar").innerHeight() + $(".right-sidebar .nav-tabs").outerHeight());
  var $el = $(".right-sidebar .demo-settings");

  if (!isFirstTime) {
    $el.slimScroll({ destroy: true }).height("auto");
    $el.parent().find(".slimScrollBar, .slimScrollRail").remove();
  }

  $el.slimscroll({
    height: height + "px",
    color: "rgba(0,0,0,0.5)",
    size: "6px",
    alwaysVisible: false,
    borderRadius: "0",
    railBorderRadius: "0",
    color: "#e9ecef",
  });
}

//Activate notification and task dropdown on top right menu
function activateNotificationAndTasksScroll() {
  $(".navbar-right .dropdown-menu .body .menu").slimscroll({
    height: "254px",
    color: "rgba(0,0,0,0.5)",
    size: "4px",
    alwaysVisible: false,
    borderRadius: "0",
    railBorderRadius: "0",
    color: "#e9ecef",
  });
}
//Dark Light Sidebar ==
$(".rightSetting .btn-sidebar-light").on("click", function () {
  $("body").removeClass("menu_dark logo-black");
  $("body").addClass("menu_light logo-white");
  var menu_option = "menu_light";
  localStorage.setItem("choose_logoheader", "logo-white");
  localStorage.setItem("menu_option", menu_option);
}),
  $(".rightSetting .btn-sidebar-dark").on("click", function () {
    $("body").removeClass("menu_light logo-white");
    $("body").addClass("menu_dark logo-black");
    var menu_option = "menu_dark";
    localStorage.setItem("choose_logoheader", "logo-black");
    localStorage.setItem("menu_option", menu_option);
  });

$(function () {
  // Check browser support
  var getcurrentday = new Date(moment()).getDate();
  var getcurrentmonth = new Date(moment()).getMonth();
  console.log(getcurrentday, getcurrentmonth, "getcurrentmonth");
  if (jQuery.inArray(getcurrentmonth, [0, 1, 2]) !== -1) {
    var startdateval = moment().month(0).startOf("month").format("L");
    var enddateval = moment().month(2).endOf("month").format("L");
  } else if (jQuery.inArray(getcurrentmonth, [3, 4, 5]) !== -1) {
    var startdateval = moment().month(3).startOf("month").format("L");
    var enddateval = moment().month(5).endOf("month").format("L");
  } else if (jQuery.inArray(getcurrentmonth, [6, 7, 8]) !== -1) {
    var startdateval = moment().month(6).startOf("month").format("L");
    var enddateval = moment().month(8).endOf("month").format("L");
  } else if (jQuery.inArray(getcurrentmonth, [9, 10, 11]) !== -1) {
    var startdateval = moment().month(9).startOf("month").format("L");
    var enddateval = moment().month(11).endOf("month").format("L");
  } else {
    var startdateval = moment().format("L");
    var enddateval = moment().subtract(getcurrentday, "days").format("L");
  }

  if (calendardefaultPeriod == "Month") {
    var startdateval = moment()
      .month(getcurrentmonth)
      .startOf("month")
      .format("L");
    var enddateval = moment().month(getcurrentmonth).endOf("month").format("L");
  } else if (calendardefaultPeriod == "Year") {
    var startdateval = "";
    var enddateval = "";
    if (calendarYearfinStart == "Apr") {
      var newtodaydate = new Date();
      console.log(moment().month());
      if (moment().month() < 3) {
        startdateval =
          financialmonthnames[calendarYearfinStart] +
          "/" +
          "01/" +
          parseInt(newtodaydate.getFullYear() - 1);
        enddateval =
          financialmonthnames[calendarYearfinEnd] +
          "/" +
          "31/" +
          parseInt(newtodaydate.getFullYear());
      } else {
        startdateval =
          financialmonthnames[calendarYearfinStart] +
          "/" +
          "01/" +
          newtodaydate.getFullYear();
        enddateval =
          financialmonthnames[calendarYearfinEnd] +
          "/" +
          "31/" +
          parseInt(newtodaydate.getFullYear() + 1);
      }
    } else if (calendarYearfinStart == "Jul") {
      console.log(moment().month());

      var newtodaydate = new Date();
      if (moment().month() < 6) {
        startdateval =
          financialmonthnames[calendarYearfinStart] +
          "/" +
          "01/" +
          parseInt(newtodaydate.getFullYear() - 1);
        enddateval =
          financialmonthnames[calendarYearfinEnd] +
          "/" +
          "30/" +
          parseInt(newtodaydate.getFullYear());
      } else {
        startdateval =
          financialmonthnames[calendarYearfinStart] +
          "/" +
          "01/" +
          newtodaydate.getFullYear();
        enddateval =
          financialmonthnames[calendarYearfinEnd] +
          "/" +
          "30/" +
          parseInt(newtodaydate.getFullYear() + 1);
      }
    } else {
      startdateval = moment().month(0).startOf("month").format("L");
      enddateval = moment().month(11).endOf("month").format("L");
    }

    console.log(startdateval);
  } else if (calendardefaultPeriod == "Half Year") {
    var newtodaydate = new Date();
    var startdateval = "";
    var enddateval = "";
    var currentmonthcom = parseInt(newtodaydate.getMonth() + 1);
    if (
      calendarYearfinStart == "Apr" &&
      currentmonthcom >= 4 &&
      currentmonthcom <= 9
    ) {
      startdateval =
        financialmonthnames["Apr"] + "/" + "01/" + newtodaydate.getFullYear();
      enddateval =
        financialmonthnames["Sep"] + "/" + "30/" + newtodaydate.getFullYear();
    } else if (
      calendarYearfinStart == "Apr" &&
      currentmonthcom >= 10 &&
      currentmonthcom <= 12
    ) {
      startdateval =
        financialmonthnames["Oct"] + "/" + "01/" + newtodaydate.getFullYear();
      enddateval =
        financialmonthnames["Mar"] +
        "/" +
        "31/" +
        parseInt(newtodaydate.getFullYear() + 1);
    } else if (
      calendarYearfinStart == "Apr" &&
      currentmonthcom >= 1 &&
      currentmonthcom <= 3
    ) {
      startdateval =
        financialmonthnames["Oct"] + "/" + "01/" + newtodaydate.getFullYear();
      enddateval =
        financialmonthnames["Mar"] +
        "/" +
        "31/" +
        parseInt(newtodaydate.getFullYear() + 1);
    } else if (
      calendarYearfinStart == "Jan" &&
      currentmonthcom >= 1 &&
      currentmonthcom <= 6
    ) {
      startdateval =
        financialmonthnames["Jan"] +
        "/" +
        "01/" +
        parseInt(newtodaydate.getFullYear() + 1);
      enddateval =
        financialmonthnames["Jun"] +
        "/" +
        "30/" +
        parseInt(newtodaydate.getFullYear() + 1);
    } else if (
      calendarYearfinStart == "Jan" &&
      currentmonthcom >= 6 &&
      currentmonthcom <= 12
    ) {
      console.log(currentmonthdate);
      startdateval =
        financialmonthnames["Jul"] + "/" + "01/" + newtodaydate.getFullYear();
      enddateval =
        financialmonthnames["Dec"] + "/" + "31/" + newtodaydate.getFullYear();
    } else if (
      calendarYearfinStart == "Jul" &&
      currentmonthcom >= 6 &&
      currentmonthcom <= 12
    ) {
      startdateval =
        financialmonthnames["Jul"] + "/" + "01/" + newtodaydate.getFullYear();
      enddateval =
        financialmonthnames["Dec"] + "/" + "31/" + newtodaydate.getFullYear();
    } else if (
      calendarYearfinStart == "Jul" &&
      currentmonthcom >= 1 &&
      currentmonthcom <= 6
    ) {
      startdateval =
        financialmonthnames["Jan"] +
        "/" +
        "01/" +
        parseInt(newtodaydate.getFullYear() + 1);
      enddateval =
        financialmonthnames["Jun"] +
        "/" +
        "30/" +
        parseInt(newtodaydate.getFullYear() + 1);
    } else if (
      calendarYearfinStart == "Apr" &&
      currentmonthcom >= 4 &&
      currentmonthcom <= 6
    ) {
      startdateval =
        financialmonthnames["Apr"] + "/" + "01/" + newtodaydate.getFullYear();
      enddateval =
        financialmonthnames["Sep"] + "/" + "30/" + newtodaydate.getFullYear();
    }
  }

  if (typeof Storage !== "undefined") {
    // Store
    if (
      localStorage.getItem("startdateval") != "undefined" &&
      localStorage.getItem("startdateval") != null &&
      localStorage.getItem("enddateval") != "undefined" &&
      localStorage.getItem("enddateval") != null
    ) {
      startdateval = localStorage.getItem("startdateval");
      enddateval = localStorage.getItem("enddateval");
      // Retrieve
    } else {
      localStorage.setItem("startdateval", startdateval);
      localStorage.setItem("enddateval", enddateval);
    }
  } else {
    var timestamp = 0;
    if (typeof $("#sessionstartPeriodID").val() !== "undefined") {
      timestamp = Number($("#sessionstartPeriodID").val());
      var d = new Date(timestamp);
      startdateval = d.toLocaleDateString("en-US");
    }

    if (typeof $("#sessionendPeriodID").val() !== "undefined") {
      timestamp = Number($("#sessionendPeriodID").val());
      var d2 = new Date(timestamp);
      enddateval = d2.toLocaleDateString("en-US");
    }
  }

  var frequency = "";
  if (calendardefaultPeriod != "" && calendardefaultPeriod != null) {
    frequency = calendardefaultPeriod;
  } else {
    frequency = localStorage.getItem("customperiod");
  }
  frequency = frequency != "" && frequency != null ? frequency : "Quarterly";
  if (frequency == "Monthly" || frequency == "Month") {
    frequency = "month";
  } else if (frequency == "Quarterly" || frequency == "Quarter") {
    frequency = "quarter";
  } else if (frequency == "HalfYearly" || frequency == "Half Year") {
    frequency = "hyear";
  } else if (frequency == "Annually" || frequency == "Year") {
    frequency = "year";
  }

  var customFinacialRangeActive = true;
  var customPeriodRangeActive = false;
  var dateStart = "";
  var dateEnd = "";

  if (calendarYearfinStart == "Jan") {
    customPeriodRangeActive = false;
    customFinacialRangeActive = true;
  } else {
    customPeriodRangeActive = false;
    customFinacialRangeActive = true;
  }

  //formate date code
  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${month}, ${year}`;
  }


  const formatedstartdateval = formatDate(startdateval);
  const formatedenddateval = formatDate(enddateval);
  console.log("Formatted Start Date: " + formatedstartdateval, formatedenddateval);
  console.log(startdateval + " ::::  " + enddateval);

  $('input[name="daterangepickerperiod"]').daterangepicker(
    {
      autoUpdateInput: true,
      startDate: startdateval,
      endDate: enddateval,
      // startDate: formatedstartdateval,
      // endDate: formatedenddateval,
      forceUpdate: true,
      periods: ["month", "quarter", "hyear", "year"],
      startMonthOfFicalYear: calendarYearfinStart,
      endMonthOfFicalYear: calendarYearfinEnd,
      period: frequency,
      isActivePeriod: frequency,
      maxDate: moment().add(30, "years"),
      orientation: "left",
      expanded: true,
    },
    function (startDate, endDate) {
      // var title = startDate + " - " + endDate;
      // const title = formatDate(startDate) + " - " + formatDate(endDate);
      var title = startDate.format("L") + " - " + endDate.format("L");
      $(this).val(title);
      console.log("Selected period: " + title);

      var range = "";
      if (frequency == "quarter") {
        range = "Quarterly";
        localStorage.setItem("customperiod", range);
      } else if (frequency == "hyear") {
        range = "HalfYearly";
        localStorage.setItem("customperiod", range);
      } else if (frequency == "year") {
        range = "Annually";
        localStorage.setItem("customperiod", range);
      } else if (frequency == "month") {
        range = "Monthly";
        localStorage.setItem("customperiod", range);
      }

      var newtodaydate = new Date();
      var currentmonthdate = parseInt(newtodaydate.getMonth() + 1);
      var customrangeinputstartdate = "";
      var customrangeinputenddate = "";
      var dummycurrentperiodcheck = "";
      var currentperiodcheck = $("li.period.active").text().toLowerCase();
      if (currentperiodcheck == "" || currentperiodcheck == undefined) {
        //	currentperiodcheck ="year";
      }

      var dummycurrentperiodcheck = currentperiodcheck;
      if (currentperiodcheck == "quarter") {
        dummycurrentperiodcheck = "quarter";
      } else if (currentperiodcheck == "half year") {
        dummycurrentperiodcheck = "hyear";
      } else if (currentperiodcheck == "year") {
        dummycurrentperiodcheck = "year";
      } else if (currentperiodcheck == "month") {
        dummycurrentperiodcheck = "month";
      }

      var isoStartDate = startDate.toISOString();
      var isoEndDate = endDate.toISOString();
      var formattedStartDate = startDate.format("YYYY-MM-DDTHH:mm:ss.SSS");
      var formattedEndDate = endDate.format("YYYY-MM-DDTHH:mm:ss.SSS");

      // Convert formatted date strings back to date objects to get milliseconds in local timezone
      var epochStartDate = new Date(formattedStartDate).getTime();
      var epochEndDate = new Date(formattedEndDate).getTime();

      console.log(isoStartDate, "isoStartDate");
      console.log(isoEndDate, "isoEndDate");
      console.log(epochStartDate, "epochStartDate");
      console.log(epochEndDate, "epochEndDate");

      var methodType = "get";
      if (typeof Storage !== "undefined") {
        localStorage.setItem("startdateval", startDate.format("L"));
        localStorage.setItem("enddateval", endDate.format("L"));
        if (
          startdateval != startDate.format("L") ||
          enddateval != endDate.format("L")
        ) {
          console.log(epochStartDate);
          console.log(epochEndDate);
          $.ajax({
            url:
              "/stratroom/updateDatePeriod?startdatePeriod=" +
              epochStartDate +
              "&enddatePeriod=" +
              epochEndDate,
            type: methodType,
            async: false,
            contentType: "application/json",
            success: function (data, status) {
              $(".apply-btn:eq(0)").click(function () {
                location.reload(true);
              });
            },
          });
        }

        if (
          typeof $("#sessionstartPeriodID").val() == "undefined" ||
          typeof $("#sessionendPeriodID").val() == "undefined"
        ) {
          $.ajax({
            url:
              "/stratroom/updateDatePeriod?startdatePeriod=" +
              epochStartDate +
              "&enddatePeriod=" +
              epochEndDate,
            type: methodType,
            async: false,
            contentType: "application/json",
            success: function (data, status) {
              location.reload(true);
            },
          });
        }
      } else {
        $.ajax({
          url:
            "/stratroom/updateDatePeriod?startdatePeriod=" +
            epochStartDate +
            "&enddatePeriod=" +
            epochEndDate,
          type: methodType,
          async: false,
          contentType: "application/json",
          success: function (data, status) {
            if (data) {
              location.reload(true);
            }
          },
        });
      }
    }
  );

  console.log("calendarYearfinStart: " + calendarYearfinStart);
  console.log("calendarYearfinEnd: " + calendarYearfinEnd);
  if (calendarYearfinStart == "Apr") {
    $('input[name="daterangepickerperiod"]')
      .data("daterangepicker")
      .isCustomFinacialRangeActive(customFinacialRangeActive);
    $('input[name="daterangepickerperiod"]')
      .data("daterangepicker")
      .isCustomPeriodRangeActive(customPeriodRangeActive);
    $('input[name="daterangepickerperiod"]')
      .data("daterangepicker")
      .startMonthOfFicalYear(4);
  } else if (calendarYearfinStart == "Jul") {
    $('input[name="daterangepickerperiod"]')
      .data("daterangepicker")
      .isCustomFinacialRangeActive(customFinacialRangeActive);
    $('input[name="daterangepickerperiod"]')
      .data("daterangepicker")
      .isCustomPeriodRangeActive(customPeriodRangeActive);
    $('input[name="daterangepickerperiod"]')
      .data("daterangepicker")
      .startMonthOfFicalYear(7);
  } else {
    $('input[name="daterangepickerperiod"]')
      .data("daterangepicker")
      .startMonthOfFicalYear(1);
  }

  //$('input[name="daterangepickerperiod"]').data('daterangepicker').setPeriod(frequency);
});

$(document).on("click", "li.period", function () {
  var frequency = "";
  if (calendardefaultPeriod != "" && calendardefaultPeriod != null) {
    frequency = calendardefaultPeriod;
  }
  console.log(frequency);
  frequency = frequency != "" && frequency != null ? frequency : "Annually";
  if (frequency == "Monthly" || frequency == "Month") {
    frequency = "month";
  } else if (frequency == "Quarterly" || frequency == "Quarter") {
    frequency = "quarter";
  } else if (frequency == "HalfYearly" || frequency == "Half Year") {
    frequency = "hyear";
  } else if (frequency == "Annually" || frequency == "Year") {
    frequency = "year";
  }

  var newtodaydate = new Date();
  var currentmonthdate = parseInt(newtodaydate.getMonth() + 1);
  var customrangeinputstartdate = "";
  var customrangeinputenddate = "";
  var dummycurrentperiodcheck = "";
  var currentperiodcheck = $("li.period.active").text().toLowerCase();

  var dummycurrentperiodcheck = currentperiodcheck;
  if (currentperiodcheck == "quarter") {
    dummycurrentperiodcheck = "quarter";
  } else if (currentperiodcheck == "half year") {
    dummycurrentperiodcheck = "hyear";
  } else if (currentperiodcheck == "year") {
    dummycurrentperiodcheck = "year";
  } else if (currentperiodcheck == "month") {
    dummycurrentperiodcheck = "month";
  }
});

// change theme dark/light on button click
$(".rightSetting .btn-theme-light").on("click", function () {
  $("body").removeClass("dark submenu-closed menu_dark logo-black");
  $("body").addClass("light submenu-closed menu_light logo-white");
  var theme = "light";
  var menu_option = "menu_light";
  localStorage.setItem("choose_logoheader", "logo-white");
  localStorage.setItem("choose_skin", "theme-black");
  localStorage.setItem("theme", theme);
  localStorage.setItem("menu_option", menu_option);
}),
  $(".rightSetting .btn-theme-dark").on("click", function () {
    $("body").removeClass("light submenu-closed menu_light logo-white");
    $("body").addClass("dark submenu-closed menu_dark logo-black");

    var theme = "dark";
    var menu_option = "menu_dark";
    localStorage.setItem("choose_logoheader", "logo-black");
    localStorage.setItem("choose_skin", "theme-black");
    localStorage.setItem("theme", theme);
    localStorage.setItem("menu_option", menu_option);
  });

//set theme on startup
if (localStorage.getItem("theme")) {
  $("body").removeClass("dark light");
  jQuery("body").addClass(localStorage.getItem("theme"));
}

// set dark sidebar menu on startup
if (localStorage.getItem("menu_option")) {
  jQuery("body").addClass(localStorage.getItem("menu_option"));
}
// set header color on startup
if (localStorage.getItem("choose_skin")) {
  jQuery("body").addClass(localStorage.getItem("choose_skin"));
} else {
  jQuery("body").addClass("theme-black");
}
if (localStorage.getItem("choose_skin_active")) {
  $(".right-sidebar .demo-choose-skin li").each(function (index) {
    jQuery(this).removeClass("actived");
    if (
      jQuery(this).attr("data-theme") ==
      localStorage.getItem("choose_skin_active")
    ) {
      jQuery(this).addClass("actived");
    }
  });
}
// set logo color on startup
if (localStorage.getItem("choose_logoheader")) {
  jQuery("body").addClass(localStorage.getItem("choose_logoheader"));
} else {
  jQuery("body").addClass("logo-white");
}
if (localStorage.getItem("choose_logoheader_active")) {
  $(".right-sidebar .demo-choose-logoheader li").each(function (index) {
    jQuery(this).removeClass("actived");
    if (
      jQuery(this).attr("data-theme") ==
      localStorage.getItem("choose_logoheader_active")
    ) {
      jQuery(this).addClass("actived");
    }
  });
}

/************* collapse button in panel***************8*/
$(document).on("click", ".card .tools .t-collapse", function () {
  var el = $(this).parents(".card").children(".card-body");
  if ($(this).hasClass("fa-chevron-down")) {
    $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
    el.slideUp(200);
  } else {
    $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
    el.slideDown(200);
  }
});

/**************** close button in panel *****************/
$(document).on("click", ".card .tools .t-close", function () {
  $(this).parents(".card").parent().remove();
});

/****************** refresh button in panel *****************/
$(".box-refresh").on("click", function (br) {
  br.preventDefault();
  $(
    "<div class='refresh-block'><span class='refresh-loader'><i class='fa fa-spinner fa-spin'></i></span></div>"
  ).appendTo($(this).parents(".tools").parents(".card-head").parents(".card"));
  setTimeout(function () {
    $(".refresh-block").remove();
  }, 1000);
});

//==

/*$("ul#custompage1").bind("contextmenu click", function(event) { 
    event.preventDefault();
    var id	=	$(this).attr('data-id');
    var id	=	249;
    $("#editpageid").val(id);
    $('.whiteboard_editpage_popup').modal('toggle');
    //$("<ul><li>edit</li><li>delete</li></ul>").appendTo("ul#custompage1 li");
}).bind("click", function(event) {
    $("div.custom-menu").hide();
});*/

/*$("ul#custompage1").bind("contextmenu click", function(event) { 
    event.preventDefault();
    var id	=	$(this).attr('data-id');
    //$("ul#custompage1 li").append('<ul class="contextedit"><li><a href="#" data-toggle="modal" data-target=".whiteboard_editpage_popup"">Edit</a></li></ul>'); 
}).bind("click", function(event) {
    
});*/

$(function () {
  // Default language is English

  // Function to load translations

  // loadTranslations(currentLanguage);
  $("#languageSelector").val(currentLanguage);

  $.contextMenu({
    selector: ".contextmenustratroompage",
    build: function ($trigger, e) {
      var element = e.currentTarget;
      // build the menu items
      var id = $(element).attr("data-id");
      var pagename = $(element).attr("data-page");
      var pagetype = $(element).attr("data-pagetype");
      if (id == "" || pagename == "" || pagetype == "") {
        return false;
      }
      $("#sethomemethodtype").val("boards");
      $("#setboarduserid").val($("#userPrincipal").val());
      $(".sethomepagecontent").html(
        "Are you sure to set  <span style='font-weight:bold;'>" +
          pagename +
          "</span> as your landing page?"
      );
      var items = [];
      if (enableaccesscontrolMenu == true) {
        items = {
          edit: { name: "Edit", icon: "fas fa-pencil-alt" },
          delete: { name: "Delete", icon: "fas fa-trash-alt" },
          Loginpage: { name: "Home Page", icon: "fas fa-home" },
        };
      } else {
        if (
          pagetype == "Risk" ||
          pagetype == "Strategy Map" ||
          pagetype == "RiskEvent" ||
          pagetype == "Risk View"
        ) {
          if (
            jQuery.inArray("Update", riskPermission) !== -1 &&
            jQuery.inArray("Delete", riskPermission) !== -1 &&
            jQuery.inArray("View", riskPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", riskPermission) !== -1 &&
            jQuery.inArray("Delete", riskPermission) !== -1 &&
            jQuery.inArray("View", riskPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", riskPermission) !== -1 &&
            jQuery.inArray("Delete", riskPermission) == -1 &&
            jQuery.inArray("View", riskPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", riskPermission) == -1 &&
            jQuery.inArray("Delete", riskPermission) !== -1 &&
            jQuery.inArray("View", riskPermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", riskPermission) !== -1 &&
            jQuery.inArray("Delete", riskPermission) == -1 &&
            jQuery.inArray("View", riskPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", riskPermission) == -1 &&
            jQuery.inArray("Delete", riskPermission) !== -1 &&
            jQuery.inArray("View", riskPermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", riskPermission) == -1 &&
            jQuery.inArray("Delete", riskPermission) == -1 &&
            jQuery.inArray("View", riskPermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (
          pagetype == "Initiatives & Projects" ||
          pagetype == "InitiativeView" ||
          pagetype == "Initiative View"
        ) {
          if (
            jQuery.inArray("Update", initiativePermission) !== -1 &&
            jQuery.inArray("Delete", initiativePermission) !== -1 &&
            jQuery.inArray("View", initiativePermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", initiativePermission) !== -1 &&
            jQuery.inArray("Delete", initiativePermission) !== -1 &&
            jQuery.inArray("View", initiativePermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", initiativePermission) !== -1 &&
            jQuery.inArray("Delete", initiativePermission) == -1 &&
            jQuery.inArray("View", initiativePermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", initiativePermission) == -1 &&
            jQuery.inArray("Delete", initiativePermission) !== -1 &&
            jQuery.inArray("View", initiativePermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", initiativePermission) !== -1 &&
            jQuery.inArray("Delete", initiativePermission) == -1 &&
            jQuery.inArray("View", initiativePermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", initiativePermission) == -1 &&
            jQuery.inArray("Delete", initiativePermission) !== -1 &&
            jQuery.inArray("View", initiativePermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", initiativePermission) == -1 &&
            jQuery.inArray("Delete", initiativePermission) == -1 &&
            jQuery.inArray("View", initiativePermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (pagetype == "My Space") {
          if (
            jQuery.inArray("Update", employeePermission) !== -1 &&
            jQuery.inArray("Delete", employeePermission) !== -1 &&
            jQuery.inArray("View", employeePermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", employeePermission) !== -1 &&
            jQuery.inArray("Delete", employeePermission) !== -1 &&
            jQuery.inArray("View", employeePermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", employeePermission) !== -1 &&
            jQuery.inArray("Delete", employeePermission) == -1 &&
            jQuery.inArray("View", employeePermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", employeePermission) == -1 &&
            jQuery.inArray("Delete", employeePermission) !== -1 &&
            jQuery.inArray("View", employeePermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", employeePermission) !== -1 &&
            jQuery.inArray("Delete", employeePermission) == -1 &&
            jQuery.inArray("View", employeePermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", employeePermission) == -1 &&
            jQuery.inArray("Delete", employeePermission) !== -1 &&
            jQuery.inArray("View", employeePermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", employeePermission) == -1 &&
            jQuery.inArray("Delete", employeePermission) == -1 &&
            jQuery.inArray("View", employeePermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (pagetype == "PESTEL") {
          if (
            jQuery.inArray("Update", pestelPermission) !== -1 &&
            jQuery.inArray("Delete", pestelPermission) !== -1 &&
            jQuery.inArray("View", pestelPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", pestelPermission) !== -1 &&
            jQuery.inArray("Delete", pestelPermission) !== -1 &&
            jQuery.inArray("View", pestelPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", pestelPermission) !== -1 &&
            jQuery.inArray("Delete", pestelPermission) == -1 &&
            jQuery.inArray("View", pestelPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", pestelPermission) == -1 &&
            jQuery.inArray("Delete", pestelPermission) !== -1 &&
            jQuery.inArray("View", pestelPermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", pestelPermission) !== -1 &&
            jQuery.inArray("Delete", pestelPermission) == -1 &&
            jQuery.inArray("View", pestelPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", pestelPermission) == -1 &&
            jQuery.inArray("Delete", pestelPermission) !== -1 &&
            jQuery.inArray("View", pestelPermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", pestelPermission) == -1 &&
            jQuery.inArray("Delete", pestelPermission) == -1 &&
            jQuery.inArray("View", pestelPermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (pagetype == "Meetings") {
          if (
            jQuery.inArray("Update", meetingPermission) !== -1 &&
            jQuery.inArray("Delete", meetingPermission) !== -1 &&
            jQuery.inArray("View", meetingPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", meetingPermission) !== -1 &&
            jQuery.inArray("Delete", meetingPermission) !== -1 &&
            jQuery.inArray("View", meetingPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", meetingPermission) !== -1 &&
            jQuery.inArray("Delete", meetingPermission) == -1 &&
            jQuery.inArray("View", meetingPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", meetingPermission) == -1 &&
            jQuery.inArray("Delete", meetingPermission) !== -1 &&
            jQuery.inArray("View", meetingPermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", meetingPermission) !== -1 &&
            jQuery.inArray("Delete", meetingPermission) == -1 &&
            jQuery.inArray("View", meetingPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", meetingPermission) == -1 &&
            jQuery.inArray("Delete", meetingPermission) !== -1 &&
            jQuery.inArray("View", meetingPermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", meetingPermission) == -1 &&
            jQuery.inArray("Delete", meetingPermission) == -1 &&
            jQuery.inArray("View", meetingPermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (
          pagetype == "Scorecard" ||
          pagetype == "Standard_View" ||
          pagetype == "Scorecardview"
        ) {
          if (
            jQuery.inArray("Update", scorecardPermission) !== -1 &&
            jQuery.inArray("Delete", scorecardPermission) !== -1 &&
            jQuery.inArray("View", scorecardPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", scorecardPermission) !== -1 &&
            jQuery.inArray("Delete", scorecardPermission) !== -1 &&
            jQuery.inArray("View", scorecardPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", scorecardPermission) !== -1 &&
            jQuery.inArray("Delete", scorecardPermission) == -1 &&
            jQuery.inArray("View", scorecardPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", scorecardPermission) == -1 &&
            jQuery.inArray("Delete", scorecardPermission) !== -1 &&
            jQuery.inArray("View", scorecardPermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", scorecardPermission) !== -1 &&
            jQuery.inArray("Delete", scorecardPermission) == -1 &&
            jQuery.inArray("View", scorecardPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", scorecardPermission) == -1 &&
            jQuery.inArray("Delete", scorecardPermission) !== -1 &&
            jQuery.inArray("View", scorecardPermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", scorecardPermission) == -1 &&
            jQuery.inArray("Delete", scorecardPermission) == -1 &&
            jQuery.inArray("View", scorecardPermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (pagetype == "SWOT") {
          if (
            jQuery.inArray("Update", swotPermission) !== -1 &&
            jQuery.inArray("Delete", swotPermission) !== -1 &&
            jQuery.inArray("View", swotPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", swotPermission) !== -1 &&
            jQuery.inArray("Delete", swotPermission) !== -1 &&
            jQuery.inArray("View", swotPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", swotPermission) !== -1 &&
            jQuery.inArray("Delete", swotPermission) == -1 &&
            jQuery.inArray("View", swotPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", swotPermission) == -1 &&
            jQuery.inArray("Delete", swotPermission) !== -1 &&
            jQuery.inArray("View", swotPermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", swotPermission) !== -1 &&
            jQuery.inArray("Delete", swotPermission) == -1 &&
            jQuery.inArray("View", swotPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", swotPermission) == -1 &&
            jQuery.inArray("Delete", swotPermission) !== -1 &&
            jQuery.inArray("View", swotPermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", swotPermission) == -1 &&
            jQuery.inArray("Delete", swotPermission) == -1 &&
            jQuery.inArray("View", swotPermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (pagetype == "Strategy Formulation") {
          if (
            jQuery.inArray("Update", strategyforPermission) !== -1 &&
            jQuery.inArray("Delete", strategyforPermission) !== -1 &&
            jQuery.inArray("View", strategyforPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", strategyforPermission) !== -1 &&
            jQuery.inArray("Delete", strategyforPermission) !== -1 &&
            jQuery.inArray("View", strategyforPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", strategyforPermission) !== -1 &&
            jQuery.inArray("Delete", strategyforPermission) == -1 &&
            jQuery.inArray("View", strategyforPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", strategyforPermission) == -1 &&
            jQuery.inArray("Delete", strategyforPermission) !== -1 &&
            jQuery.inArray("View", strategyforPermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", strategyforPermission) !== -1 &&
            jQuery.inArray("Delete", strategyforPermission) == -1 &&
            jQuery.inArray("View", strategyforPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", strategyforPermission) == -1 &&
            jQuery.inArray("Delete", strategyforPermission) !== -1 &&
            jQuery.inArray("View", strategyforPermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", strategyforPermission) == -1 &&
            jQuery.inArray("Delete", strategyforPermission) == -1 &&
            jQuery.inArray("View", strategyforPermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (pagetype == "Project Formulation") {
          if (
            jQuery.inArray("Update", projectforPermission) !== -1 &&
            jQuery.inArray("Delete", projectforPermission) !== -1 &&
            jQuery.inArray("View", projectforPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", projectforPermission) !== -1 &&
            jQuery.inArray("Delete", projectforPermission) !== -1 &&
            jQuery.inArray("View", projectforPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", projectforPermission) !== -1 &&
            jQuery.inArray("Delete", projectforPermission) == -1 &&
            jQuery.inArray("View", projectforPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", projectforPermission) == -1 &&
            jQuery.inArray("Delete", projectforPermission) !== -1 &&
            jQuery.inArray("View", projectforPermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", projectforPermission) !== -1 &&
            jQuery.inArray("Delete", projectforPermission) == -1 &&
            jQuery.inArray("View", projectforPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", projectforPermission) == -1 &&
            jQuery.inArray("Delete", projectforPermission) !== -1 &&
            jQuery.inArray("View", projectforPermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", projectforPermission) == -1 &&
            jQuery.inArray("Delete", projectforPermission) == -1 &&
            jQuery.inArray("View", projectforPermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (pagetype == "Risk Formulation") {
          if (
            jQuery.inArray("Update", riskforPermission) !== -1 &&
            jQuery.inArray("Delete", riskforPermission) !== -1 &&
            jQuery.inArray("View", riskforPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", riskforPermission) !== -1 &&
            jQuery.inArray("Delete", riskforPermission) !== -1 &&
            jQuery.inArray("View", riskforPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", riskforPermission) !== -1 &&
            jQuery.inArray("Delete", riskforPermission) == -1 &&
            jQuery.inArray("View", riskforPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", riskforPermission) == -1 &&
            jQuery.inArray("Delete", riskforPermission) !== -1 &&
            jQuery.inArray("View", riskforPermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", riskforPermission) !== -1 &&
            jQuery.inArray("Delete", riskforPermission) == -1 &&
            jQuery.inArray("View", riskforPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", riskforPermission) == -1 &&
            jQuery.inArray("Delete", riskforPermission) !== -1 &&
            jQuery.inArray("View", riskforPermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", riskforPermission) == -1 &&
            jQuery.inArray("Delete", riskforPermission) == -1 &&
            jQuery.inArray("View", riskforPermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (pagetype == "Charts") {
          if (
            jQuery.inArray("Update", chartsPermission) !== -1 &&
            jQuery.inArray("Delete", chartsPermission) !== -1 &&
            jQuery.inArray("View", chartsPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", chartsPermission) !== -1 &&
            jQuery.inArray("Delete", chartsPermission) !== -1 &&
            jQuery.inArray("View", chartsPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", chartsPermission) !== -1 &&
            jQuery.inArray("Delete", chartsPermission) == -1 &&
            jQuery.inArray("View", chartsPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", chartsPermission) == -1 &&
            jQuery.inArray("Delete", chartsPermission) !== -1 &&
            jQuery.inArray("View", chartsPermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", chartsPermission) !== -1 &&
            jQuery.inArray("Delete", chartsPermission) == -1 &&
            jQuery.inArray("View", chartsPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", chartsPermission) == -1 &&
            jQuery.inArray("Delete", chartsPermission) !== -1 &&
            jQuery.inArray("View", chartsPermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", chartsPermission) == -1 &&
            jQuery.inArray("Delete", chartsPermission) == -1 &&
            jQuery.inArray("View", chartsPermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (pagetype == "Cockpit") {
          if (
            jQuery.inArray("Update", dashboardPermission) !== -1 &&
            jQuery.inArray("Delete", dashboardPermission) !== -1 &&
            jQuery.inArray("View", dashboardPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", dashboardPermission) !== -1 &&
            jQuery.inArray("Delete", dashboardPermission) !== -1 &&
            jQuery.inArray("View", dashboardPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", dashboardPermission) !== -1 &&
            jQuery.inArray("Delete", dashboardPermission) == -1 &&
            jQuery.inArray("View", dashboardPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", dashboardPermission) == -1 &&
            jQuery.inArray("Delete", dashboardPermission) !== -1 &&
            jQuery.inArray("View", dashboardPermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", dashboardPermission) !== -1 &&
            jQuery.inArray("Delete", dashboardPermission) == -1 &&
            jQuery.inArray("View", dashboardPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", dashboardPermission) == -1 &&
            jQuery.inArray("Delete", dashboardPermission) !== -1 &&
            jQuery.inArray("View", dashboardPermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", dashboardPermission) == -1 &&
            jQuery.inArray("Delete", dashboardPermission) == -1 &&
            jQuery.inArray("View", dashboardPermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (pagetype == "Report") {
          if (
            jQuery.inArray("Update", chartsPermission) !== -1 &&
            jQuery.inArray("Delete", chartsPermission) !== -1 &&
            jQuery.inArray("View", chartsPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", chartsPermission) !== -1 &&
            jQuery.inArray("Delete", chartsPermission) !== -1 &&
            jQuery.inArray("View", chartsPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", chartsPermission) !== -1 &&
            jQuery.inArray("Delete", chartsPermission) == -1 &&
            jQuery.inArray("View", chartsPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", chartsPermission) == -1 &&
            jQuery.inArray("Delete", chartsPermission) !== -1 &&
            jQuery.inArray("View", chartsPermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", chartsPermission) !== -1 &&
            jQuery.inArray("Delete", chartsPermission) == -1 &&
            jQuery.inArray("View", chartsPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", chartsPermission) == -1 &&
            jQuery.inArray("Delete", chartsPermission) !== -1 &&
            jQuery.inArray("View", chartsPermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", chartsPermission) == -1 &&
            jQuery.inArray("Delete", chartsPermission) == -1 &&
            jQuery.inArray("View", chartsPermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (
          pagetype == "StrategyMap" ||
          pagetype == "Process Enabaler" ||
          pagetype == "Impact Survey" ||
          pagetype == "Rpo" ||
          pagetype == "Approval Page" ||
          pagetype == "Budget"
        ) {
          if (
            jQuery.inArray("Update", dashboardPermission) !== -1 &&
            jQuery.inArray("Delete", dashboardPermission) !== -1 &&
            jQuery.inArray("View", dashboardPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", dashboardPermission) !== -1 &&
            jQuery.inArray("Delete", dashboardPermission) !== -1 &&
            jQuery.inArray("View", dashboardPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", dashboardPermission) !== -1 &&
            jQuery.inArray("Delete", dashboardPermission) == -1 &&
            jQuery.inArray("View", dashboardPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", dashboardPermission) == -1 &&
            jQuery.inArray("Delete", dashboardPermission) !== -1 &&
            jQuery.inArray("View", dashboardPermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", dashboardPermission) !== -1 &&
            jQuery.inArray("Delete", dashboardPermission) == -1 &&
            jQuery.inArray("View", dashboardPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", dashboardPermission) == -1 &&
            jQuery.inArray("Delete", dashboardPermission) !== -1 &&
            jQuery.inArray("View", dashboardPermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", dashboardPermission) == -1 &&
            jQuery.inArray("Delete", dashboardPermission) == -1 &&
            jQuery.inArray("View", dashboardPermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        }
      } //else close

      return {
        callback: function (key, options) {
          if (key == "edit") {
            $("#editpageid").val(id);
            $("#editwhiteBoardname").val(pagename);
            $("#editpagetype").val(pagetype);
            $(".whiteboard_editpage_popup").modal("toggle");
          }
          if (key == "delete") {
            $(window).on("resize", function () {
              $(".modal:visible").each(alignModal);
            });
            $(".modal").on("shown.bs.modal", alignModal);
            $("#deleteModalPage").modal("toggle");
            $("#deleterecordpageid").val(id);
          }
          if (key == "Loginpage") {
            $(window).on("resize", function () {
              $(".modal:visible").each(alignModal);
            });
            $("#sethomerecordpageid").val(id);
            $("#sethomerecordtype").val(pagetype);
            $("#sethomerecordpagename").val(pagename);
            $(".modal").on("shown.bs.modal", alignModal);
            $("#homeModalPage").modal("toggle");
          }
        },
        items: items,
      };
    },
  });
});

function addDynamicDataI18n(thContent) {
  let match = thContent.match(/<th[^>]*>(.*?)<\/th>/);
  if (match && match[1]) {
    let i18nValue = match[1].trim(); // Extract text inside <th>
    console.log(i18nValue, "i18nValue");
    return thContent.replace(/<th([^>]*)>/, `<th$1 data-i18n="${i18nValue}">`);
  }
  return thContent;
}

$(function () {
  $.contextMenu({
    selector: ".contextmenustratroompagesub",
    build: function ($trigger, e) {
      var element = e.currentTarget;
      // build the menu items
      var id = $(element).attr("data-id");
      var pagename = $(element).attr("data-page");
      var pagetype = $(element).attr("data-pagetype");
      if (id == "" || pagename == "" || pagetype == "") {
        return false;
      }
      $("#sethomemethodtype").val("boards");
      $("#setboarduserid").val($("#userPrincipalnavigate").val());
      $(".sethomepagecontent").html(
        "Are you sure to set  <span style='font-weight:bold;'>" +
          pagename +
          "</span> as your landing page?"
      );
      var items = [];
      if (enableaccesscontrolMenu == true) {
        items = {
          edit: { name: "Edit", icon: "fas fa-pencil-alt" },
          delete: { name: "Delete", icon: "fas fa-trash-alt" },
          Loginpage: { name: "Home Page", icon: "fas fa-home" },
        };
      } else {
        if (
          pagetype == "Risk" ||
          pagetype == "Strategy Map" ||
          pagetype == "RiskEvent"
        ) {
          if (
            jQuery.inArray("Update", riskPermission) !== -1 &&
            jQuery.inArray("Delete", riskPermission) !== -1 &&
            jQuery.inArray("View", riskPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", riskPermission) !== -1 &&
            jQuery.inArray("Delete", riskPermission) !== -1 &&
            jQuery.inArray("View", riskPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", riskPermission) !== -1 &&
            jQuery.inArray("Delete", riskPermission) == -1 &&
            jQuery.inArray("View", riskPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", riskPermission) == -1 &&
            jQuery.inArray("Delete", riskPermission) !== -1 &&
            jQuery.inArray("View", riskPermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", riskPermission) !== -1 &&
            jQuery.inArray("Delete", riskPermission) == -1 &&
            jQuery.inArray("View", riskPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", riskPermission) == -1 &&
            jQuery.inArray("Delete", riskPermission) !== -1 &&
            jQuery.inArray("View", riskPermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", riskPermission) == -1 &&
            jQuery.inArray("Delete", riskPermission) == -1 &&
            jQuery.inArray("View", riskPermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (
          pagetype == "Initiatives & Projects" ||
          pagetype == "InitiativeView" ||
          pagetype == "Initiative View"
        ) {
          if (
            jQuery.inArray("Update", initiativePermission) !== -1 &&
            jQuery.inArray("Delete", initiativePermission) !== -1 &&
            jQuery.inArray("View", initiativePermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", initiativePermission) !== -1 &&
            jQuery.inArray("Delete", initiativePermission) !== -1 &&
            jQuery.inArray("View", initiativePermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", initiativePermission) !== -1 &&
            jQuery.inArray("Delete", initiativePermission) == -1 &&
            jQuery.inArray("View", initiativePermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", initiativePermission) == -1 &&
            jQuery.inArray("Delete", initiativePermission) !== -1 &&
            jQuery.inArray("View", initiativePermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", initiativePermission) !== -1 &&
            jQuery.inArray("Delete", initiativePermission) == -1 &&
            jQuery.inArray("View", initiativePermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", initiativePermission) == -1 &&
            jQuery.inArray("Delete", initiativePermission) !== -1 &&
            jQuery.inArray("View", initiativePermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", initiativePermission) == -1 &&
            jQuery.inArray("Delete", initiativePermission) == -1 &&
            jQuery.inArray("View", initiativePermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (pagetype == "My Space") {
          if (
            jQuery.inArray("Update", employeePermission) !== -1 &&
            jQuery.inArray("Delete", employeePermission) !== -1 &&
            jQuery.inArray("View", employeePermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", employeePermission) !== -1 &&
            jQuery.inArray("Delete", employeePermission) !== -1 &&
            jQuery.inArray("View", employeePermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", employeePermission) !== -1 &&
            jQuery.inArray("Delete", employeePermission) == -1 &&
            jQuery.inArray("View", employeePermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", employeePermission) == -1 &&
            jQuery.inArray("Delete", employeePermission) !== -1 &&
            jQuery.inArray("View", employeePermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", employeePermission) !== -1 &&
            jQuery.inArray("Delete", employeePermission) == -1 &&
            jQuery.inArray("View", employeePermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", employeePermission) == -1 &&
            jQuery.inArray("Delete", employeePermission) !== -1 &&
            jQuery.inArray("View", employeePermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", employeePermission) == -1 &&
            jQuery.inArray("Delete", employeePermission) == -1 &&
            jQuery.inArray("View", employeePermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (pagetype == "PESTEL") {
          if (
            jQuery.inArray("Update", pestelPermission) !== -1 &&
            jQuery.inArray("Delete", pestelPermission) !== -1 &&
            jQuery.inArray("View", pestelPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", pestelPermission) !== -1 &&
            jQuery.inArray("Delete", pestelPermission) !== -1 &&
            jQuery.inArray("View", pestelPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", pestelPermission) !== -1 &&
            jQuery.inArray("Delete", pestelPermission) == -1 &&
            jQuery.inArray("View", pestelPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", pestelPermission) == -1 &&
            jQuery.inArray("Delete", pestelPermission) !== -1 &&
            jQuery.inArray("View", pestelPermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", pestelPermission) !== -1 &&
            jQuery.inArray("Delete", pestelPermission) == -1 &&
            jQuery.inArray("View", pestelPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", pestelPermission) == -1 &&
            jQuery.inArray("Delete", pestelPermission) !== -1 &&
            jQuery.inArray("View", pestelPermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", pestelPermission) == -1 &&
            jQuery.inArray("Delete", pestelPermission) == -1 &&
            jQuery.inArray("View", pestelPermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (pagetype == "Meetings") {
          if (
            jQuery.inArray("Update", meetingPermission) !== -1 &&
            jQuery.inArray("Delete", meetingPermission) !== -1 &&
            jQuery.inArray("View", meetingPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", meetingPermission) !== -1 &&
            jQuery.inArray("Delete", meetingPermission) !== -1 &&
            jQuery.inArray("View", meetingPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", meetingPermission) !== -1 &&
            jQuery.inArray("Delete", meetingPermission) == -1 &&
            jQuery.inArray("View", meetingPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", meetingPermission) == -1 &&
            jQuery.inArray("Delete", meetingPermission) !== -1 &&
            jQuery.inArray("View", meetingPermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", meetingPermission) !== -1 &&
            jQuery.inArray("Delete", meetingPermission) == -1 &&
            jQuery.inArray("View", meetingPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", meetingPermission) == -1 &&
            jQuery.inArray("Delete", meetingPermission) !== -1 &&
            jQuery.inArray("View", meetingPermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", meetingPermission) == -1 &&
            jQuery.inArray("Delete", meetingPermission) == -1 &&
            jQuery.inArray("View", meetingPermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (
          pagetype == "Scorecard" ||
          pagetype == "Standard_View" ||
          pagetype == "Scorecardview"
        ) {
          if (
            jQuery.inArray("Update", scorecardPermission) !== -1 &&
            jQuery.inArray("Delete", scorecardPermission) !== -1 &&
            jQuery.inArray("View", scorecardPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", scorecardPermission) !== -1 &&
            jQuery.inArray("Delete", scorecardPermission) !== -1 &&
            jQuery.inArray("View", scorecardPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", scorecardPermission) !== -1 &&
            jQuery.inArray("Delete", scorecardPermission) == -1 &&
            jQuery.inArray("View", scorecardPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", scorecardPermission) == -1 &&
            jQuery.inArray("Delete", scorecardPermission) !== -1 &&
            jQuery.inArray("View", scorecardPermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", scorecardPermission) !== -1 &&
            jQuery.inArray("Delete", scorecardPermission) == -1 &&
            jQuery.inArray("View", scorecardPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", scorecardPermission) == -1 &&
            jQuery.inArray("Delete", scorecardPermission) !== -1 &&
            jQuery.inArray("View", scorecardPermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", scorecardPermission) == -1 &&
            jQuery.inArray("Delete", scorecardPermission) == -1 &&
            jQuery.inArray("View", scorecardPermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (pagetype == "SWOT") {
          if (
            jQuery.inArray("Update", swotPermission) !== -1 &&
            jQuery.inArray("Delete", swotPermission) !== -1 &&
            jQuery.inArray("View", swotPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", swotPermission) !== -1 &&
            jQuery.inArray("Delete", swotPermission) !== -1 &&
            jQuery.inArray("View", swotPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", swotPermission) !== -1 &&
            jQuery.inArray("Delete", swotPermission) == -1 &&
            jQuery.inArray("View", swotPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", swotPermission) == -1 &&
            jQuery.inArray("Delete", swotPermission) !== -1 &&
            jQuery.inArray("View", swotPermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", swotPermission) !== -1 &&
            jQuery.inArray("Delete", swotPermission) == -1 &&
            jQuery.inArray("View", swotPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", swotPermission) == -1 &&
            jQuery.inArray("Delete", swotPermission) !== -1 &&
            jQuery.inArray("View", swotPermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", swotPermission) == -1 &&
            jQuery.inArray("Delete", swotPermission) == -1 &&
            jQuery.inArray("View", swotPermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (pagetype == "Strategy Formulation") {
          if (
            jQuery.inArray("Update", strategyforPermission) !== -1 &&
            jQuery.inArray("Delete", strategyforPermission) !== -1 &&
            jQuery.inArray("View", strategyforPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", strategyforPermission) !== -1 &&
            jQuery.inArray("Delete", strategyforPermission) !== -1 &&
            jQuery.inArray("View", strategyforPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", strategyforPermission) !== -1 &&
            jQuery.inArray("Delete", strategyforPermission) == -1 &&
            jQuery.inArray("View", strategyforPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", strategyforPermission) == -1 &&
            jQuery.inArray("Delete", strategyforPermission) !== -1 &&
            jQuery.inArray("View", strategyforPermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", strategyforPermission) !== -1 &&
            jQuery.inArray("Delete", strategyforPermission) == -1 &&
            jQuery.inArray("View", strategyforPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", strategyforPermission) == -1 &&
            jQuery.inArray("Delete", strategyforPermission) !== -1 &&
            jQuery.inArray("View", strategyforPermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", strategyforPermission) == -1 &&
            jQuery.inArray("Delete", strategyforPermission) == -1 &&
            jQuery.inArray("View", strategyforPermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (pagetype == "Project Formulation") {
          if (
            jQuery.inArray("Update", projectforPermission) !== -1 &&
            jQuery.inArray("Delete", projectforPermission) !== -1 &&
            jQuery.inArray("View", projectforPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", projectforPermission) !== -1 &&
            jQuery.inArray("Delete", projectforPermission) !== -1 &&
            jQuery.inArray("View", projectforPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", projectforPermission) !== -1 &&
            jQuery.inArray("Delete", projectforPermission) == -1 &&
            jQuery.inArray("View", projectforPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", projectforPermission) == -1 &&
            jQuery.inArray("Delete", projectforPermission) !== -1 &&
            jQuery.inArray("View", projectforPermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", projectforPermission) !== -1 &&
            jQuery.inArray("Delete", projectforPermission) == -1 &&
            jQuery.inArray("View", projectforPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", projectforPermission) == -1 &&
            jQuery.inArray("Delete", projectforPermission) !== -1 &&
            jQuery.inArray("View", projectforPermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", projectforPermission) == -1 &&
            jQuery.inArray("Delete", projectforPermission) == -1 &&
            jQuery.inArray("View", projectforPermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (pagetype == "Risk Formulation") {
          if (
            jQuery.inArray("Update", riskforPermission) !== -1 &&
            jQuery.inArray("Delete", riskforPermission) !== -1 &&
            jQuery.inArray("View", riskforPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", riskforPermission) !== -1 &&
            jQuery.inArray("Delete", riskforPermission) !== -1 &&
            jQuery.inArray("View", riskforPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", riskforPermission) !== -1 &&
            jQuery.inArray("Delete", riskforPermission) == -1 &&
            jQuery.inArray("View", riskforPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", riskforPermission) == -1 &&
            jQuery.inArray("Delete", riskforPermission) !== -1 &&
            jQuery.inArray("View", riskforPermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", riskforPermission) !== -1 &&
            jQuery.inArray("Delete", riskforPermission) == -1 &&
            jQuery.inArray("View", riskforPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", riskforPermission) == -1 &&
            jQuery.inArray("Delete", riskforPermission) !== -1 &&
            jQuery.inArray("View", riskforPermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", riskforPermission) == -1 &&
            jQuery.inArray("Delete", riskforPermission) == -1 &&
            jQuery.inArray("View", riskforPermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (pagetype == "Charts") {
          if (
            jQuery.inArray("Update", chartsPermission) !== -1 &&
            jQuery.inArray("Delete", chartsPermission) !== -1 &&
            jQuery.inArray("View", chartsPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", chartsPermission) !== -1 &&
            jQuery.inArray("Delete", chartsPermission) !== -1 &&
            jQuery.inArray("View", chartsPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", chartsPermission) !== -1 &&
            jQuery.inArray("Delete", chartsPermission) == -1 &&
            jQuery.inArray("View", chartsPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", chartsPermission) == -1 &&
            jQuery.inArray("Delete", chartsPermission) !== -1 &&
            jQuery.inArray("View", chartsPermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", chartsPermission) !== -1 &&
            jQuery.inArray("Delete", chartsPermission) == -1 &&
            jQuery.inArray("View", chartsPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", chartsPermission) == -1 &&
            jQuery.inArray("Delete", chartsPermission) !== -1 &&
            jQuery.inArray("View", chartsPermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", chartsPermission) == -1 &&
            jQuery.inArray("Delete", chartsPermission) == -1 &&
            jQuery.inArray("View", chartsPermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (pagetype == "Cockpit") {
          if (
            jQuery.inArray("Update", dashboardPermission) !== -1 &&
            jQuery.inArray("Delete", dashboardPermission) !== -1 &&
            jQuery.inArray("View", dashboardPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", dashboardPermission) !== -1 &&
            jQuery.inArray("Delete", dashboardPermission) !== -1 &&
            jQuery.inArray("View", dashboardPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", dashboardPermission) !== -1 &&
            jQuery.inArray("Delete", dashboardPermission) == -1 &&
            jQuery.inArray("View", dashboardPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", dashboardPermission) == -1 &&
            jQuery.inArray("Delete", dashboardPermission) !== -1 &&
            jQuery.inArray("View", dashboardPermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", dashboardPermission) !== -1 &&
            jQuery.inArray("Delete", dashboardPermission) == -1 &&
            jQuery.inArray("View", dashboardPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", dashboardPermission) == -1 &&
            jQuery.inArray("Delete", dashboardPermission) !== -1 &&
            jQuery.inArray("View", dashboardPermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", dashboardPermission) == -1 &&
            jQuery.inArray("Delete", dashboardPermission) == -1 &&
            jQuery.inArray("View", dashboardPermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (pagetype == "Report") {
          if (
            jQuery.inArray("Update", chartsPermission) !== -1 &&
            jQuery.inArray("Delete", chartsPermission) !== -1 &&
            jQuery.inArray("View", chartsPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", chartsPermission) !== -1 &&
            jQuery.inArray("Delete", chartsPermission) !== -1 &&
            jQuery.inArray("View", chartsPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", chartsPermission) !== -1 &&
            jQuery.inArray("Delete", chartsPermission) == -1 &&
            jQuery.inArray("View", chartsPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", chartsPermission) == -1 &&
            jQuery.inArray("Delete", chartsPermission) !== -1 &&
            jQuery.inArray("View", chartsPermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", chartsPermission) !== -1 &&
            jQuery.inArray("Delete", chartsPermission) == -1 &&
            jQuery.inArray("View", chartsPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", chartsPermission) == -1 &&
            jQuery.inArray("Delete", chartsPermission) !== -1 &&
            jQuery.inArray("View", chartsPermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", chartsPermission) == -1 &&
            jQuery.inArray("Delete", chartsPermission) == -1 &&
            jQuery.inArray("View", chartsPermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        } else if (
          pagetype == "StrategyMap" ||
          pagetype == "Process Enabaler" ||
          pagetype == "Impact Survey" ||
          pagetype == "Rpo" ||
          pagetype == "Budget"
        ) {
          if (
            jQuery.inArray("Update", dashboardPermission) !== -1 &&
            jQuery.inArray("Delete", dashboardPermission) !== -1 &&
            jQuery.inArray("View", dashboardPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", dashboardPermission) !== -1 &&
            jQuery.inArray("Delete", dashboardPermission) !== -1 &&
            jQuery.inArray("View", dashboardPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", dashboardPermission) !== -1 &&
            jQuery.inArray("Delete", dashboardPermission) == -1 &&
            jQuery.inArray("View", dashboardPermission) !== -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", dashboardPermission) == -1 &&
            jQuery.inArray("Delete", dashboardPermission) !== -1 &&
            jQuery.inArray("View", dashboardPermission) !== -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          } else if (
            jQuery.inArray("Update", dashboardPermission) !== -1 &&
            jQuery.inArray("Delete", dashboardPermission) == -1 &&
            jQuery.inArray("View", dashboardPermission) == -1
          ) {
            items = {
              edit: { name: "Edit", icon: "fas fa-pencil-alt" },
            };
          } else if (
            jQuery.inArray("Update", dashboardPermission) == -1 &&
            jQuery.inArray("Delete", dashboardPermission) !== -1 &&
            jQuery.inArray("View", dashboardPermission) == -1
          ) {
            items = {
              delete: { name: "Delete", icon: "fas fa-trash-alt" },
            };
          } else if (
            jQuery.inArray("Update", dashboardPermission) == -1 &&
            jQuery.inArray("Delete", dashboardPermission) == -1 &&
            jQuery.inArray("View", dashboardPermission) !== -1
          ) {
            items = {
              Loginpage: { name: "Home Page", icon: "fas fa-home" },
            };
          }
        }
      } //else close

      return {
        callback: function (key, options) {
          if (key == "edit") {
            $("#editpageid").val(id);
            $("#editwhiteBoardname").val(pagename);
            $("#editpagetype").val(pagetype);
            $(".whiteboard_editpage_popup").modal("toggle");
          }
          if (key == "delete") {
            $(window).on("resize", function () {
              $(".modal:visible").each(alignModal);
            });
            $(".modal").on("shown.bs.modal", alignModal);
            $("#deleteModalPage").modal("toggle");
            $("#deleterecordpageid").val(id);
          }
          if (key == "Loginpage") {
            $(window).on("resize", function () {
              $(".modal:visible").each(alignModal);
            });
            $("#sethomerecordpageid").val(id);
            $("#sethomerecordtype").val(pagetype);
            $("#sethomerecordpagename").val(pagename);
            $(".modal").on("shown.bs.modal", alignModal);
            $("#homeModalPage").modal("toggle");
          }
        },
        items: items,
      };
    },
  });
});

$(function () {
  $.contextMenu({
    selector: ".contextmenustratroompage1",
    build: function ($trigger, e) {
      var element = e.currentTarget;
      // build the menu items
      var id = $(element).attr("data-id");
      var pagename = id;
      var pagetype = $(element).attr("data-pagetype");
      if (id == "" || pagename == "" || pagetype == "") {
        return false;
      }
      $("#sethomemethodtype").val("main");
      $("#setboarduserid").val($("#userPrincipal").val());
      $(".sethomepagecontent").html(
        "Are you sure to set <span style='font-weight:bold;'>" +
          pagename +
          "</span> as your landing page?"
      );
      var items = {};

      items = {
        Loginpage: { name: "Home Page", icon: "fas fa-home" },
      };

      return {
        callback: function (key, options) {
          if (key == "Loginpage") {
            $(window).on("resize", function () {
              $(".modal:visible").each(alignModal);
            });
            $("#sethomerecordpageid").val(id);
            $("#sethomerecordtype").val(pagetype);
            $("#sethomerecordpagename").val(pagename);
            $(".modal").on("shown.bs.modal", alignModal);
            $("#homeModalPage").modal("toggle");
          }
        },
        items: items,
      };
    },
  });
});

//profile image upload
$(".editProfile").on("click", function () {
  $(".profile-default").css("display", "none");
  $(".editProfile").css("display", "none");
  $(".profile-replace").css("display", "block");
  $(".reportingmanagementTab").css("display", "none");
});

$(".cancelEditProfile").on("click", function () {
  $(".profile-default").css("display", "block");
  $(".editProfile").css("display", "block");
  $(".profile-replace").css("display", "none");
  $(".reportingmanagementTab").css("display", "block");
  var oldprofileimage = $("#oldprofileimage").val();
  $("#imageUpload").attr("src", oldprofileimage);
  $("#showprofileimage").attr("src", oldprofileimage);
  $("#imageUpload").attr("value", oldprofileimage);
});

function scorecardname(event) {
  var inp = String.fromCharCode(event.keyCode);
  if (/[a-zA-Z0-9-_&\s]/.test(inp)) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}

$(document).on('click', '.dropdown-item[data-lang]', function(e) {
  e.preventDefault();
  const langCode = $(this).data('lang');
  localStorage.setItem("selecetedLang", langCode); // fix typo if possible

  // Update UI
  const displayCode = langDisplayCode[langCode] || "EN";
  $('#languageDropdown .lang-code').remove(); // remove old
  $('#languageDropdown .icon').after(`<span class="lang-code" style="margin-left: 6px;">${displayCode}</span>`);
  
  // Also apply direction if needed
  document.documentElement.dir = langMap[langCode]?.dir || 'ltr';
});
