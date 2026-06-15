var viewHeader = "View";
var deleteHeader = "Delete";
var editHeader = "Edit";
var addActivityHeder = "Add Activity";
var reporteelist = [];
var initiativepreference = [];
var lookup = {};
var initiativeJsonListData = [];
var initiativeJsonListDataDummy = []
var initiativeJsonListDataResponseData = [];
var kpiList = {};
var parentInitiativedetails = {
  id: "",
  owner: "",
  pageId: "",
  createdBy: "",
  initiativeValue: "",
};
var class1, fill, empty, color;
var defaultCurrency = "$";
var defaultCurrencyValue = "0";
var activitiesganttchart = [];
var currentEmp = $("#userPrincipal").val();
var initiativeempPreference = { preferences: {} };
var ischeckinitiativeurlornot = $("#ischeckinitiativeurlornot").val();
var parentinitiativeID = "";
var topparentinitiativeDetails = {};
var globaltotalcheck = "";
var globalutilizedcheck = "";
var globalbalancecheck = "";
var subInitiativechilds = {};
var activitieschilds = {};
var initiativemodPermission = [];
var initiativepageno = $("#pagenumber").val();
let iniurlparams = new URL(document.location).searchParams;
let pageNoini = iniurlparams.get("pageId");
let initiativeurlId = iniurlparams.get("initiativeId");
var initiativecreatepermission = false;
var initiativeeditpermission = false;
var initiativedeletepermission = false;
var initiativeviewpermission = false;
var initiativeloadcontent = false;

var activitiescreatepermission = false;
var activitieseditpermission = false;
var activitiesdeletepermission = false;
var activitiesviewpermission = false;
var activitiesloadcontent = false;

var taskscreatepermission = false;
var taskseditpermission = false;
var tasksdeletepermission = false;
var tasksviewpermission = false;
var tasksloadcontent = false;

var attachmentscreatepermission = false;
var attachmentseditpermission = false;
var attachmentsdeletepermission = false;
var attachmentsviewpermission = false;
var attachmentsloadcontent = false;

var subinicreatepermission = false;
var subinieditpermission = false;
var subinideletepermission = false;
var subiniviewpermission = false;
var subiniloadcontent = false;

var milestonecreatepermission = false;
var milestoneeditpermission = false;
var milestonedeletepermission = false;
var milestoneviewpermission = false;
var milestoneloadcontent = false;

var comcreatepermission = false;
var comeditpermission = false;
var comdeletepermission = false;
var comviewpermission = false;
var comloadcontent = false;
var datePeriod = $("#datePeriod").val();
console.log(datePeriod, "datePeriod");
var gantt = {};

$(".initiativeuserimage").initial({
  charCount: 2,
  height: 30,
  width: 30,
  fontSize: 18,
});

if (
  $("#userrolename").val() == "Super User" ||
  $("#userrolename").val() == "Admin"
) {
  if ($("#userPrincipal").val() != $("#userPrincipalnavigate").val()) {
    //$(".subusermenuname").text('Risk Management');
    if ($(".topmenubreadcrumb").length) {
      $(".topmenubreadcrumb").show();
    }
    if ($(".sidebarNavigate").length) {
      $(".sidebarNavigate").show();
    }
  }
}

function getpagenameView() {
  $.ajax({
    type: "GET",
    url: "/stratroom/pages/" + pageNoini,
    async: false,
    success: function (data) {
      if ($("#userPrincipal").val() != $("#userPrincipalnavigate").val()) {
        $("." + data.id).addClass("homepageHighlight");
      }
      if ($(".superusertopmenu").hasClass(data.id)) {
        $(".subusermenuname").text(data.pageName);
      }
    },
  });
}
var currentEmp = $("#userPrincipal").val();
console.log(currentEmp, "current emp");

function getScoreCardName(selectSelector) {
  var currentEmp = $("#userPrincipal").val();
  $.ajax({
    url:
      "/stratroom/scoreCardDetailListByEmpId/" +
      ($("#userPrincipal").val() || "").trim(),
    async: false,
    method: "GET",
    success: function (scorecardlist) {
      $(selectSelector).empty();
      $(selectSelector).append(
        '<option value="" disabled selected>Select a Scorecard</option>'
      );

      $.each(scorecardlist, function (index, score) {
        $(selectSelector).append(
          `<option value="${score.pageId}">${score.scorecardName}</option>`
        );
      });

      $(selectSelector).select2();

      $(selectSelector).on("change", function () {
        const selectedPageId = $(this).val();
        if (selectedPageId) {
          getPerspectiveName(
            ".initatives_description_popup #Perspective_select",
            selectedPageId
          );
        }
      });
    },
  });
}

function getPerspectiveName(selectSelector, pageId) {
  $.ajax({
    url: `/stratroom/scoreCardList?loadFlag=false&pageId=${pageId}`,
    async: false,
    method: "GET",
    success: function (response) {
      const perspectiveList = response.cardDetailsDTO.scoreCardDTOS;
      console.log(perspectiveList, "perspectiveList");
      $(selectSelector).empty();
      $(selectSelector).append(
        '<option value="" disabled selected>Select a Perspective</option>'
      );

      $.each(perspectiveList, function (index, perspective) {
        console.log(perspective, "perspective");
        $(selectSelector).append(
          `<option value="${perspective.id}" data-name="${perspective.scoreCardValue.name}">${perspective.scoreCardValue.name}</option>`
        );
      });

      $(selectSelector).select2();

      $(selectSelector).on("change", function () {
        const selectedPageId = $(this).val();
        if (selectedPageId) {
          getObjectiveName(
            ".initatives_description_popup #Objective_select",
            selectedPageId
          );
        }
      });
    },
  });
}
function getObjectiveName(selectSelector, pageId) {
  $.ajax({
    url: `/stratroom/objectivesList/${pageId}?loadFlag=false`,
    async: false,
    method: "GET",
    success: function (response) {
      $(selectSelector).empty();
      $(selectSelector).append(
        '<option value="" disabled selected>Select an Objective</option>'
      );

      if (Array.isArray(response) && response.length > 0) {
        $.each(response, function (index, objective) {
          console.log(objective, "objective");
          $(selectSelector).append(
            `<option value="${objective.id}" data-objective-id="${objective.objectiveId}">
                            ${objective.objectivesName}
                        </option>`
          );
        });
      }

      $(selectSelector).select2();
      $(selectSelector).on("change", function () {
        const selectedPageId = $(this).val();
        if (selectedPageId) {
          getKpiName(
            ".initatives_description_popup #kpi_select",
            selectedPageId
          );
        }
      });
    },
  });
}
function getKpiName(selectSelector, pageId) {
  $.ajax({
    url:
      "/stratroom/v2/kpiList/" +
      pageId +
      "?datePeriod=" +
      datePeriod +
      "&flagtype=kpi",
    async: false,
    method: "GET",
    success: function (response) {
      $(selectSelector).empty();

      if (Array.isArray(response) && response.length > 0) {
        $.each(response, function (index, kpi) {
          console.log(kpi, "kpi");
          $(selectSelector).append(
            `<option value="${kpi.id}"> ${kpi.kpiName}</option>`
          );
        });
      }

      $(selectSelector).select2();
    },
  });
}

function addOption(id, text, value) {
  $(id).append(`<option value="${value}">${text}</option>`);
}

function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;

  return true;
}

function blockSpecialChar(event) {
  if (event.keyCode == 36 || (event.keyCode >= 48 && event.keyCode <= 57)) {
    event.returnValue = true;
    return;
  }
  event.returnValue = false;
}

if (initiativepageno != "") {
  $(".exceldownloadlink").attr(
    "href",
    "/stratroom/downloadInitiativesDetails?loadFlag=true&pageId="+initiativepageno +"&status=date"
  );
} else {
  $(".exceldownloadlink").attr("href", "#");
  $(".exceldownloadlink").removeAttr("target");
}

function handleInlineEditSave(elementObjectKeyValue, elementOldObj) {
  var id = $("input[name='parentinitiativeId']").val();
  //var initiativeObjExist 	=	JSON.parse(localStorage.getItem('parent_initiative_details_'+id));
  if (
    parentInitiativedetails == undefined ||
    parentInitiativedetails == "" ||
    parentInitiativedetails == " " ||
    parentInitiativedetails.id == undefined ||
    parentInitiativedetails.id == ""
  ) {
    return false;
  }

  $.each(elementObjectKeyValue, function (key, value) {
    if (key == "Utillized") {
      parentInitiativedetails["initiativeValue"]["totalbalance"] =
        elementObjectKeyValue["totalbalance"];
      parentInitiativedetails["initiativeValue"]["totalutilized"] =
        elementObjectKeyValue["totalutilized"];
      parentInitiativedetails["initiativeValue"]["Balance"] =
        elementObjectKeyValue["Balance"];
      parentInitiativedetails["initiativeValue"]["Utilized"] =
        elementObjectKeyValue["Utillized"];
      //var splitcurrency 	=	elementObjectKeyValue["totalutilized"].match(/\d+/);
      parentInitiativedetails["initiativeValue"]["utilizedCurr"] =
        elementObjectKeyValue["utilizedCurr"];
      //parentInitiativedetails["initiativeValue"]["utilizedCurr"] 	=	elementObjectKeyValue["totalutilized"].substring(0,splitcurrency['index']);
      return false;
    } else if (key == "Total") {
      parentInitiativedetails["initiativeValue"]["totalbalance"] =
        elementObjectKeyValue["totalbalance"];
      parentInitiativedetails["initiativeValue"]["totalutilized"] =
        elementObjectKeyValue["totalutilized"];
      parentInitiativedetails["initiativeValue"]["Balance"] =
        elementObjectKeyValue["Balance"];
      parentInitiativedetails["initiativeValue"]["Utilized"] =
        elementObjectKeyValue["Utillized"];
      parentInitiativedetails["initiativeValue"]["utilizedCurr"] =
        elementObjectKeyValue["utilizedCurr"];
      parentInitiativedetails["initiativeValue"]["Total"] =
        elementObjectKeyValue["Total"];
      parentInitiativedetails["initiativeValue"]["TotCurr"] =
        elementObjectKeyValue["TotCurr"];
      return false;
    } else if (key == "targetValue") {
      parentInitiativedetails["initiativeValue"]["targetValue"] =
        elementObjectKeyValue["targetValue"];
      parentInitiativedetails["initiativeValue"]["targetValueCurr"] =
        elementObjectKeyValue["targetValueCurr"];
      return false;
    }

    parentInitiativedetails["initiativeValue"][key] = value;
  });

  parentInitiativedetails["initiativeValue"]["BalCurr"] = "$";

  var methodType = "put";
  $.ajax({
    url: "/stratroom/initiatives/",
    type: methodType,
    contentType: "application/json",
    data: JSON.stringify(parentInitiativedetails),
    success: function (data, status) {
      $("body span#inlineloader").remove();
      $.notify("Updated Successfully", {
        style: "success",
        className: "graynotify",
      });
      //localStorage.setItem('parent_initiative_details_'+id, JSON.stringify(initiativeObjExist));
    },
    error: function (msg, status) {
      $.each(elementOldObj, function (key, value) {
        if (key == "Utillized") {
          $("#Utillized").text(value);
          $("#Balance").text($("#Balance").attr("data-oldBalance"));
        } else {
          $("#" + key).text(value);
        }
      });
      if (!jQuery.isEmptyObject(msg.responseText)) {
        $.each(JSON.parse(msg.responseText), function (key, value) {
          if (key == "exception") {
            $.notify("Error:" + value, {
              style: "error",
              className: "graynotify",
            });
          }
          if (key == "error") {
            $.notify("Error:" + value, {
              style: "error",
              className: "graynotify",
            });
          }
        });
      }
      $("body span#inlineloader").remove();
    },
  });
}

/*$(document).on('keyup',".editableTxt",function(){
	var elementId 		=	$(this).attr("id");
	if(elementId 	==	"Utillized"){
	   formatCurrency($(this),"text");
	}
});*/

$(document).on("blur", ".editableTxt", function () {
  var elementId = $(this).attr("id");
  var oldelementValue = $(this).attr("data-old" + elementId);
  var elementValue = $(this).text().trim();
  var elementObj = {};
  var elementOldObj = {};
  if (elementId == "Utillized") {
    //formatCurrency($(this),"text", "blur");
    var numberformatResult = specialcharsconvertToNumberFormat($(this).text());
    var Utillized = numberformatResult["number"];
    var numberTotalResult = specialcharsconvertToNumberFormat(
      $("#Total").text()
    );
    var totalutilized = $(this).text().trim();
    //var TotalVal 	=	$("#TotalVal").text().match(/\d+/);
    var Balance = parseInt(numberTotalResult["number"]) - parseInt(Utillized);
    if (!isNaN(Balance)) {
      if (globalbalancecheck) {
        $("#Balance").text(
          numberTotalResult["currency"] + intergerHumanFormat(Balance)
        );
      }
      elementObj["Utillized"] = Utillized;
      elementObj["Balance"] = Balance;
      elementObj["totalbalance"] = $("#Balance").text();
      elementObj["totalutilized"] = totalutilized;
      elementObj["utilizedCurr"] = numberformatResult["currency"];
      elementOldObj[elementId] = oldelementValue;
    }
  } else if (elementId == "Total") {
    var numberformatResult = specialcharsconvertToNumberFormat($(this).text());
    var Total = numberformatResult["number"];
    var numberTotalResult = specialcharsconvertToNumberFormat(
      $("#Utillized").text()
    );
    var Utillized = $(this).text().trim();
    var Balance = parseInt(
      parseInt(Total) - parseInt(numberTotalResult["number"])
    );
    if (!isNaN(Balance)) {
      if (globalbalancecheck) {
        $("#Balance").text(
          numberTotalResult["currency"] + intergerHumanFormat(Balance)
        );
      }
      elementObj["Balance"] = Balance;
      elementObj["totalbalance"] = $("#Balance").text();
      elementObj["Total"] = Balance;
      elementObj["totalutilized"] = $("#Utillized").text();
      elementObj["utilizedCurr"] = numberTotalResult["currency"];
      elementObj["TotCurr"] = numberformatResult["currency"];
      elementOldObj[elementId] = oldelementValue;
    }
  } else if (elementId == "targetValue") {
    var numberformatResult = specialcharsconvertToNumberFormat($(this).text());
    elementObj["targetValue"] = numberformatResult["number"];
    elementObj["targetValueCurr"] = numberformatResult["currency"];
    elementOldObj[elementId] = oldelementValue;
  } else {
    elementObj[elementId] = elementValue;
    elementOldObj[elementId] = oldelementValue;
  }

  if (elementValue != oldelementValue) {
    $(this).attr("data-old" + elementId, elementValue);
    $("#" + elementId).append(
      '<span id="inlineloader"><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>'
    );
    handleInlineEditSave(elementObj, elementOldObj);
  }
});

$(document).on("blur", ".editableTxt1", function () {
  var elementId = $(this).attr("id");
  var oldelementValue = $(this).attr("data-old" + elementId);
  var elementValue = $(this).text().trim();
  var elementObj = {};
  var elementOldObj = {};
  elementObj[elementId] = elementValue;
  elementOldObj[elementId] = oldelementValue;

  if (elementValue != oldelementValue) {
    $(this).attr("data-old" + elementId, elementValue);
    $("#" + elementId).append(
      '<span id="inlineloader"><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>'
    );
    handleInlineEditSave(elementObj, elementOldObj);
  }
});

function getreportee() {
  if (jQuery.isEmptyObject(reporteelist)) {
    $.ajax({
      url: "/stratroom/reporteeList",
      async: false,
      success: function (employeeList) {
        reporteelist = employeeList;
      },
    });
  }
}

function getpagepreference() {
  if (jQuery.isEmptyObject(initiativepreference)) {
    $.ajax({
      url:
        "/stratroom/getPreferences?pageName=INITIATIVE&pageId=" +
        initiativepageno,
      async: false,
      success: function (employeeList) {
        initiativepreference = employeeList;
      },
    });
  }
}

function populateOwnerDropdownInitiative(elementId) {
  var numberOfOptions = $(elementId + " > option").length;

  if (jQuery.isEmptyObject(reporteelist)) {
    $.ajax({
      url: "/stratroom/reporteeList",
      async: false,
      success: function (employeeList) {
        reporteelist = employeeList;
        $.each(employeeList, function (index, reportee) {
          addOption(elementId, reportee.name, reportee.id);
        });
      },
    });
  } else if (numberOfOptions < 2) {
    $.each(reporteelist, function (index, reportee) {
      addOption(elementId, reportee.name, reportee.id);
    });
  }
  //multipleoptionElementTriggerValuesInitiative();
}

function populateOwnerDropdowndepartment(elementId) {
  var numberOfOptions = $(elementId + " > option").length;
  $.ajax({
    url: "/stratroom/allDepartmentList",
    async: false,
    success: function (data) {
      $.each(data, function (index, reportee) {
        addOption(elementId, reportee.name, reportee.id);
      });
    },
  });
}

function multipleoptionElementTriggerValuesInitiative() {
  $(".initatives_description_popup select").formSelect();
  $(".initatives_description_popup select.select_all")
    .siblings("ul")
    .prepend("<li id=sm_select_all><span>Select All</span></li>");
  $("li#sm_select_all").on("click", function () {
    var jq_elem = $(this),
      jq_elem_span = jq_elem.find("span"),
      select_all = jq_elem_span.text() == "Select All",
      set_text = select_all ? "Select None" : "Select All";
    jq_elem_span.text(set_text);
    jq_elem
      .siblings("li")
      .filter(function () {
        return $(this).find("input").prop("checked") != select_all;
      })
      .click();
  });
}

function reporteeList(_callback) {
  reporteelist.forEach(function (el, i, arr) {
    lookup[el.id + "image"] = el.image;
    lookup[el.id + "name"] = el.name;
    lookup[el.id + "dept"] = el.dept;
  });
  _callback();
}

// function initiativesSuccessCallback(data) {
//   console.log(data, "data");
//   reporteeList(function () {
//     var initiativetemplate = $("#initiative-template").html();
//     var userDept = $("#userDept").val();
//     // Mustache.parse(initiativetemplate); // optional, speeds up future uses
//     var initiative_load_id = "";
//     var template = Handlebars.compile(initiativetemplate);
//     setTimeout(function () {
//       $(".page-loader-wrapper").fadeOut();
//     }, 50);
//     $("#initiative_details").empty();

//     if (initiativeloadcontent == true) {
//       if (jQuery.isEmptyObject(data)) {
//         var riskhtml = `<div class="collapse_arrow_right" style="display: none;">
// 					<i class="arrow_collapse_size fas fa-caret-right"></i>
// 				</div>
// 				<div class="collapse_arrow_left">
// 					<i class="arrow_collapse_size fas fa-caret-left"></i>
// 				</div>`;
//         $("#initiative_details").append(riskhtml);
//         $(".collapse_arrow_left").css("display", "block");
//         $(".collapse_arrow_left").on("click", function () {
//           $(this).css("display", "none");
//           $(".collapse_arrow_right").css("display", "block");
//           var $body = $("body");
//           $body.addClass("ini-hide");
//           $body.removeClass("ini-show");
//           localStorage.setItem("sidebar_subsidemenu", "opened");
//           initiativeBar();
//         });

//         $(".collapse_arrow_right").on("click", function () {
//           $(this).css("display", "none");
//           $(".collapse_arrow_left").css("display", "block");
//           var $body = $("body");
//           $body.addClass("ini-show");
//           $body.removeClass("ini-hide");
//           localStorage.setItem("sidebar_subsidemenu", "closed");
//           initiativeBar();
//         });
//       }

//       $.each(data, function (index, initiative) {
//         // todo: Read headers from scorecard.scoreCardValue
//         var bodyRows = "";

//         if (index == 0) {
//           initiative_load_id = initiative.id;
//           parentinitiativeID = initiative.id;
//           var getinitiativePagenumber = localStorage.getItem(
//             "initiative_pagenumber"
//           );

//           if (
//             getinitiativePagenumber != undefined &&
//             getinitiativePagenumber != "" &&
//             getinitiativePagenumber != null
//           ) {
//             if (!initiative.id) {
//               initiative_load_id = getinitiativePagenumber;
//             }
//           }

//           if (initiativeurlId && initiativeurlId != null) {
//             initiative_load_id = initiativeurlId;
//           }

//           $.ajax({
//             url:
//               "/stratroom/initiatives/" + initiative_load_id + "?loadFlag=true",
//             success: function (data) {
//               initiativeddescSuccessCallback(data, initiative_load_id);
//             },
//           });
//         }

//         var duedate = "";

//         var datestring = initiative.initiativeValue.daterange;
//         var actualdatestring = initiative.initiativeValue.actualdaterange;

//         if (actualdatestring && actualdatestring.includes("-")) {
//           var dateval = actualdatestring.split("-");
//           duedate = dateval[1];
//           duedate = dateFormatedtohumanread(duedate);
//         } else if (datestring && datestring.includes("-")) {
//           var dateval = datestring.split("-");
//           duedate = dateval[1];
//           duedate = dateFormatedtohumanread(duedate);
//         }

//         var initiativeProgressBar = "";
//         var initiativeProgressSideBar = "";

//         var findprogressvalue =
//           initiative.initiativeValue.statusLight != undefined &&
//           initiative.initiativeValue.statusLight != ""
//             ? initiative.initiativeValue.statusLight
//             : "default_bar";
//         if (findprogressvalue.search("progress-bar-success") != -1) {
//           initiativeProgressBar = "green_bar";
//           initiativeProgressSideBar = "initiative_side_border_green";
//         } else if (findprogressvalue.search("yellow_bar") != -1) {
//           initiativeProgressBar = "yellow_bar";
//           initiativeProgressSideBar = "initiative_side_border_yellow";
//         } else if (findprogressvalue.search("orange_bar") != -1) {
//           initiativeProgressBar = "orange_bar";
//           initiativeProgressSideBar = "initiative_side_border_orange";
//         } else {
//           initiativeProgressBar = "default_bar";
//           initiativeProgressSideBar = "initiative_side_border_default";
//         }
//         var landingimagecolor = "";
//         var findprogressvalue =
//           initiative.initiativeValue.statusLight != undefined &&
//           initiative.initiativeValue.statusLight != ""
//             ? initiative.initiativeValue.statusLight
//             : "default_bar";
//         if (findprogressvalue.search("progress-bar-success") != -1) {
//           landingimagecolor = "greenbarimagecircle";
//         } else if (findprogressvalue.search("yellow_bar") != -1) {
//           landingimagecolor = "yellowbarimagecircle";
//         } else if (findprogressvalue.search("orange_bar") != -1) {
//           landingimagecolor = "orangebarimagecircle";
//         } else {
//           landingimagecolor = "defaultbarimagecircle";
//         }
//         var defaultreporteelist = {};
//         $.each(reporteelist, function (ownkey, empvalue) {
//           if (empvalue.id == initiative.owner) {
//             defaultreporteelist = {
//               id: empvalue.id,
//               name: empvalue.name,
//               image: empvalue.image,
//               dept: empvalue.dept,
//             };
//             topparentinitiativeDetails = {
//               id: empvalue.id,
//               name: empvalue.name,
//               image: empvalue.image,
//               dept: empvalue.dept,
//             };
//           }
//         });
//         var username = initiative.initiativeValue.ownerName;
// 		console.log(topparentinitiativeDetails, "topparentinitiativeDetails");

//         var dept =
//           lookup[initiative.owner + "dept"] == undefined ||
//           lookup[initiative.owner + "dept"] == ""
//             ? " "
//             : lookup[initiative.owner + "dept"];
//         var Owner =
//           topparentinitiativeDetails.image == undefined ||
//           topparentinitiativeDetails.image == ""
//             ? "data-name='" +
//               topparentinitiativeDetails.name +
//               "' class='rounded-circle userprofileimage " +
//               landingimagecolor +
//               "' "
//             : " class='rounded-circle " +
//               landingimagecolor +
//               "' src='" +
//               topparentinitiativeDetails.image +
//               "'";
//         var name = initiative.initiativeValue.name;
//         var full_name = name;
//         if (typeof full_name == "string" && full_name.length >= 50) {
//           name = name.substring(0, 50) + "...";
//         }
//         dept =
//           initiative.initiativeValue.dept != undefined &&
//           initiative.initiativeValue.dept != ""
//             ? initiative.initiativeValue.dept
//             : dept;
//         var finalHtml = {
//           intiative_content: name,
//           Owner: Owner,
// 		  userImageName : topparentinitiativeDetails.name,
//           fullname: full_name,
//           id: initiative.id,
//           department: dept,
//           userDept: dept,
//           dueDate: duedate,
//           statusLight: initiative.initiativeValue.statusLight,
//           impactDesc: initiative.initiativeValue.impactDesc,
//           progressval: initiative.initiativeValue.progressval,
//           initiativeProgressBar: initiativeProgressBar,
//           initiativeProgressSideBar: initiativeProgressSideBar,
//           initiativeSidebarHighLight:
//             initiative_load_id == initiative.id
//               ? "initiativeSidebarHighLight"
//               : "",
//           progress_val_per: initiative.initiativeValue.progressval + "%",
//         };
//         $("#initiate_sidebar").append(template(finalHtml));
//       });
//       let currentLanguage = localStorage.getItem("selectedLang") || "en";

//       loadTranslations(currentLanguage); // Apply translations when DOM changes
//       $(".sidebarimgprofile").initial({
//         charCount: 2,
//         height: 30,
//         width: 30,
//         fontSize: 18,
//       });
//     }
//   });
// }


function getBgColorFromClass(className) {
  var colorMap = {
    greenbarimagecircle: 'rgb(40, 167, 69)',
    yellowbarimagecircle: 'rgb(255, 193, 7)',
    orangebarimagecircle: 'rgb(253, 126, 20)',
    defaultbarimagecircle: 'rgb(108, 117, 125)'
  };
  return colorMap[className] || 'rgb(108, 117, 125)';
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
				"rgb(135, 236, 135)"
			];
			var hash = 0;
			for (var i = 0; i < name.length; i++) {
				hash = name.charCodeAt(i) + ((hash << 5) - hash);
			}
			var index = Math.abs(hash) % colors.length;
			return colors[index];
		}

function generateInitialsAvatarSvg(name) {
	var initials = getInitials(name);
			var bgColor = getColor(name);
			var width = 55;
			var height = 55;

			var svg = '<svg xmlns="http://www.w3.org/2000/svg" pointer-events="none" width="' + width + '" height="' + height + '" style="background-color:' + bgColor + ';width:' + width + 'px;height:' + height + 'px;border-radius:50%;">';
			svg += '<text text-anchor="middle" y="50%" x="50%" dy="0.35em" pointer-events="auto" fill="#ffffff" font-family="HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif" style="font-weight:400;font-size:20px;">';
			svg += initials;
			svg += '</text></svg>';

			return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}


function initiativesSuccessCallback(data) {
  // initiativeJsonListDataResponseData = data;
  console.log(data, "data");
  reporteeList(function () {
    var initiativetemplate = $("#initiative-template").html();
    var template = Handlebars.compile(initiativetemplate);

    setTimeout(function () {
      $(".page-loader-wrapper").fadeOut();
    }, 50);

    $("#initiative_details").empty();

    if (initiativeloadcontent == true) {
      if (jQuery.isEmptyObject(data)) {
        var riskhtml = `<div class="collapse_arrow_right" style="display: none;">
          <i class="arrow_collapse_size fas fa-caret-right"></i>
        </div>
        <div class="collapse_arrow_left">
          <i class="arrow_collapse_size fas fa-caret-left"></i>
        </div>`;
        $("#initiative_details").append(riskhtml);
        $(".collapse_arrow_left").css("display", "block");
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
      }

      $.each(data, function (index, initiative) {
        if (index == 0) {
          initiative_load_id = initiative.id;
          parentinitiativeID = initiative.id;
          var getinitiativePagenumber = localStorage.getItem("initiative_pagenumber");
          if (getinitiativePagenumber) {
            if (!initiative.id) initiative_load_id = getinitiativePagenumber;
          }
          if (initiativeurlId) initiative_load_id = initiativeurlId;
          $.ajax({
            url: "/stratroom/initiatives/" + initiative_load_id + "?loadFlag=true",
            success: function (data) {
              initiativeddescSuccessCallback(data, initiative_load_id);
            },
          });
        }

        // Due Date
        var duedate = "";
        var actualdatestring = initiative.initiativeValue.actualdaterange;
        var datestring = initiative.initiativeValue.daterange;
        if (actualdatestring && actualdatestring.includes("-")) {
          duedate = dateFormatedtohumanread(actualdatestring.split("-")[1]);
        } else if (datestring && datestring.includes("-")) {
          duedate = dateFormatedtohumanread(datestring.split("-")[1]);
        }

        // Progress & Color Logic
        var findprogressvalue = initiative.initiativeValue.statusLight || "default_bar";
        var initiativeProgressBar = "default_bar";
        var initiativeProgressSideBar = "initiative_side_border_default";
        var landingimagecolor = "defaultbarimagecircle";

        if (findprogressvalue.includes("progress-bar-success")) {
          initiativeProgressBar = "green_bar";
          initiativeProgressSideBar = "initiative_side_border_green";
          landingimagecolor = "greenbarimagecircle";
        } else if (findprogressvalue.includes("yellow_bar")) {
          initiativeProgressBar = "yellow_bar";
          initiativeProgressSideBar = "initiative_side_border_yellow";
          landingimagecolor = "yellowbarimagecircle";
        } else if (findprogressvalue.includes("orange_bar")) {
          initiativeProgressBar = "orange_bar";
          initiativeProgressSideBar = "initiative_side_border_orange";
          landingimagecolor = "orangebarimagecircle";
        }

        // Owner Info
        var defaultreporteelist = {};
        $.each(reporteelist, function (ownkey, empvalue) {
          if (empvalue.id == initiative.owner) {
            defaultreporteelist = {
              id: empvalue.id,
              name: empvalue.name,
              image: empvalue.image,
              dept: empvalue.dept,
            };
            topparentinitiativeDetails = {
              id: empvalue.id,
              name: empvalue.name,
              image: empvalue.image,
              dept: empvalue.dept,
            };
          }
        });

		 console.log(topparentinitiativeDetails, "topparentinitiativeDetails");

        var ownerName = topparentinitiativeDetails.name || "Unknown";
        var dept = initiative.initiativeValue.dept ||
                   lookup[initiative.owner + "dept"] ||
                   " ";

        // ✅ Generate initials (first two letters)
		 var username 	=	((ownerName ==	undefined || ownerName == "")?"User": ownerName);
        var initials = ownerName
          .split(' ')
          .map(part => part.charAt(0).toUpperCase())
          .join('') || "??";

        // Ensure 2 characters
        if (initials.length == 1) initials += initials;
        if (initials.length == 0) initials = "??";

        
        var hasImage = topparentinitiativeDetails.image && topparentinitiativeDetails.image.trim() !== "";
        var userImageHtml = "";

        if (hasImage) {
          userImageHtml = `<img src="${topparentinitiativeDetails.image}" class="rounded-circle ${landingimagecolor}" width="24" height="24" alt="${ownerName}">`;
        } else {
        //   const bgColor = getBgColorFromClass(landingimagecolor);
          const svgSrc = generateInitialsAvatarSvg(username);
          userImageHtml = `<img class="rounded-circle rec_res_multiuserimage" src="${svgSrc}" alt="${ownerName}" data-name="${ownerName}" width="24" height="24">`;
        }

        // Initiative Name Truncation
        var name = initiative.initiativeValue.name || "";
        var full_name = name;
        if (typeof full_name === "string" && full_name.length >= 50) {
          name = full_name.substring(0, 50) + "...";
        }

        // Final Template Data
        var finalHtml = {
          intiative_content: name,
          userImageHtml: userImageHtml,
          fullname: full_name,
          id: initiative.id,
          department: dept,
          userDept: dept,
          dueDate: duedate,
           categoryType: initiative.initiativeValue.categoryType,
          statusLight: initiative.initiativeValue.statusLight,
          impactDesc: initiative.initiativeValue.impactDesc,
          progressval: initiative.initiativeValue.progressval,
          initiativeProgressBar: initiativeProgressBar,
          initiativeProgressSideBar: initiativeProgressSideBar,
          initiativeSidebarHighLight: initiative_load_id == initiative.id ? "initiativeSidebarHighLight" : "",
          progress_val_per: (initiative.initiativeValue.progressval || 0) + "%",
        };

        $("#initiate_sidebar").append(template(finalHtml));
      });

    
      let currentLanguage = localStorage.getItem("selectedLang") || "en";
      loadTranslations(currentLanguage);

     
    }
  });
}
// function getKpiArray() {
//   return $("#kpi_select").select2("data").map(function (item) {
//     return {
//       id: item.id,
//       name: item.text
//     };
//   });
// }

function getKpiArray() {
  let data = $("#kpi_select").select2("data");

  if (!data || data.length === 0) {
    return []; // nothing selected
  }

  return data.map(function (item) {
    return {
      id: item.id,
      name: item.text
    };
  });
}

function getinitiativeObj(action) {
console.log(initiativepageno,"s")
  const selectedPerspectiveId = $("#Perspective_select").val();
  const selectedPerspectiveName =
    $("#Perspective_select option:selected").data("name");

  // KPI DATA
  var kpiArr = getKpiArray();        // [] or [{id,name}]
  var kpiIds = kpiArr.length ? kpiArr.map(k => k.id) : [];


  var initiativeObj = {
    owner: $("#Initiative_owner").val(),
    pageId: $("#pagenumber").val(),
    createdBy: $("#createdById").val(),
    scorecardDetailId: $("#Scorecard_select").val(),
    perspectiveId: selectedPerspectiveId,
    objectiveId: $("#Objective_select").val() || null,

    departmentId: $("#Initiative_Department").val(),
    initiativeId: $("#Initiative_show_id").val(),

    initiativeValue: {

      // KPI PAYLOAD
      impactId: kpiIds,
      kpi: kpiArr,

      perspectiveName: selectedPerspectiveName,
      name: $("#Initiative_name").val(),
      daterange: $("#Initiative_start_end_date").val(),
      actualdaterange: $("#Actual_start_end_date").val(),
      description: $("#Initiative_description").val(),
      dept: $("#Initiative_Department option:selected").text(),

      statusprimary: $("input[name='primary']:checked").val(),
      statusType: $("#statusType").val(),
      categoryType: $("#categoryType").val(),

      Total: $("#Initiative_total").val(),
      TotCurr: defaultCurrencyValue,

      utilizedCurr: defaultCurrency,
      BalCurr: defaultCurrency,

      Balance: $("#Initiative_Balance").val(),
      Utilized: $("#Initiative_Utilized").val(),

      progressval: $("#Initiative_progress").val(),

      actual: $("#actualId").prop("checked"),
      target: $("#targetId").prop("checked"),
      budget: $("#budgetID").prop("checked"),
      total: $("#Totalid").prop("checked"),
      balance: $("#Balanceid").prop("checked"),
      utilized: $("#Utilizedid").prop("checked"),
      forecast: $("#forcastId").prop("checked"),
      budgettotal: $("#totalbudId").prop("checked"),
      actualtotal: $("#totalactId").prop("checked")
    }
  };

  // ---------- EDIT MODE ----------
  if (action === "edit" && parentInitiativedetails) {

    var skipKeys = [
      "name",
      "daterange",
      "dept",
      "actualdaterange",
      "description",
      "statusprimary",
      "statusType",
      "categoryType",
      "progressval",
      "actual",
      "target",
      "budget",
      "total",
      "balance",
      "utilized",
      "forecast",
      "budgettotal",
      "actualtotal",

      // IMPORTANT: prevent old KPI overwrite
      "impactId",
      "kpi"
    ];

    $.each(parentInitiativedetails.initiativeValue, function (key, val) {

      if ($.inArray(key, skipKeys) === -1) {
        initiativeObj.initiativeValue[key] = val;
      }

    });

  }

  return initiativeObj;
}

$(document).on("click", ".radio", function () {
  var value = $(this).find("input:radio").val();
  if (value == "success") {
    $("#primary1").attr("checked", true);
    $("#primary2").removeAttr("checked");
    $("#primary3").removeAttr("checked");
  } else if (value == "warning") {
    $("#primary2").attr("checked", true);
    $("#primary1").removeAttr("checked");
    $("#primary3").removeAttr("checked");
  } else {
    $("#primary3").attr("checked", true);
    $("#primary1").removeAttr("checked");
    $("#primary2").removeAttr("checked");
  }
});

function getMileStonesObj() {
  var progressPageValue = $("#milestone_progress").val();
  var mileStoneProgressValue =
    progressPageValue != undefined && progressPageValue != ""
      ? progressPageValue
      : "0";
  var status = mileStoneProgressValue == 100 ? "Completed" : "Pending";
  var mileStoneObj = {
    createdBy: $("#mileCreatedById").val(),
    owner: ($("#userPrincipal").val() || "").trim(),
    mileStonesValue: {
      name: $("#milestone_name").val(),
      progress: $("#milestone_progress").val(),
      desc: $("#milestone_desc").val(),
      status: $("#statusTypeMilestone").val(),
      dateRange: $("#milestone_start_end").val(),
    },
  };
  return mileStoneObj;
}

function getActivitiesObj() {
  var selectedOption = $("#subInitative_desc option:selected");
  var subInitiativeId = selectedOption.val();
  var subInitiativeName = selectedOption.data("description");

  // Cache the owner value
  var owner = ($("#userPrincipal").val() || "").trim();
  
  // Get multipleowners and fallback to owner if empty
  // var multipleOwnersVal = $("#activity_multipleowners").val();
  // var effectiveMultipleOwners = (multipleOwnersVal && multipleOwnersVal.trim() !== "") 
  //   ? multipleOwnersVal 
  //   : owner;

  var mileStoneObj = {
    createdBy: owner,
    owner: owner,
    subInitiativeId: subInitiativeId,
    activitiesValue: {
      name: "",
      progress: $("#activities_progress").val(),
      subInitiativeName: subInitiativeName,
      multipleowners:$("#activity_multipleowners").val(),
      desc: $("#activities_desc").val(),
      status: $("#activities_status").val(),
      dateRange: $("#activities_start_end").val(),
      budget: $("#activities_budget").val(),
      actual: $("#activities_Actual").val(),
    },
  };
  return mileStoneObj;
}
function getTasksObj() {
  var progressPageValue = $("#tasks_progress").val();
  var tasksProgressValue =
    progressPageValue != undefined && progressPageValue != ""
      ? progressPageValue
      : "0";
  // var status = tasksProgressValue == 100 ? "Completed" : "Pending";
  var tasksObj = {
    createdBy: $("#tasksCreatedById").val(),
    owner: ($("#userPrincipal").val() || "").trim(),
    taskValue: {
      name: $("#tasks_name").val(),
      status: $("#tasks_status").val(),
      progress: $("#tasks_progress").val(),
      desc: $("#tasks_desc").val(),
      dateRange: $("#tasks_start_end").val(),
    },
  };
  return tasksObj;
} 

function getSubinitiativeObj() {
  var initiativeObj = {
    owner: ($("#userPrincipal").val() || "").trim(), //$("#Sub_Initiative_owner").val(),
    pageId: $("#pagenumber").val(),
    initiativeId: $("#initiativeID").val(),
    createdBy:
      $("#subCreatedById").val() != ""
        ? $("#subCreatedById").val()
        : ($("#userPrincipal").val() || "").trim(),
    subInitiativeValue: {
      name: $("#subinitiative_name").val(),
      dateRange: $("#sub_initative_start_end").val(),
      description: $("#subinitiative_desc").val(),
      //"attachment"  : $("#initiativeattachment").val(),
      progressval: $("#sub_initative_progress").val(),
      contribution: $("#sub_initative_contribution").val(),
      impremark: $("#sub_initative_impremark").val(),
      performance: $("#sub_initative_performance").val(),
       multipleowners  : $("#sub_initative_multipleowners").val(),
    },
  };
  return initiativeObj;
}


function handleInitiativeSave() {
  var action = $("#InitiativeForm input[name='action']").val();

  console.log(action, "action");
  if (action == "delete") {
  } else {
    var InitiativeObj = getinitiativeObj(action);
    var methodType = "post";
    if (action == "add") {
        methodType = "post";
    } else if (action == "edit") {
      InitiativeObj.id = $("#Initiative_id").val();
      methodType = "put";
    }

    console.log(methodType, "methodType");

    $.ajax({
      url: "/stratroom/initiatives/",
      type: methodType,
      contentType: "application/json",
      data: JSON.stringify(InitiativeObj),
      success: function (data, status) {
        location.reload(true);
        $("#iniClosePopup").click();
        console.log("New Initiative was created..");
      },
    });
  }
}

function handleMileStonesSave() {
  var action = $("#mileStonesForm input[name='action']").val();
  if (action == "delete") {
  } else {
    var startdate = new Date();
    var enddate = new Date();

    if (
      parentInitiativedetails.initiativeValue.actualdaterange != undefined &&
      parentInitiativedetails.initiativeValue.actualdaterange != ""
    ) {
      var daterange = parentInitiativedetails.initiativeValue.actualdaterange;
      if (daterange.includes("-")) {
        var dateval = daterange.split("-");
        startdate = new Date(dateval[0]);
        enddate = new Date(dateval[1]);
      }
    } else {
      var daterange = parentInitiativedetails.initiativeValue.daterange;
      if (daterange.includes("-")) {
        var dateval = daterange.split("-");
        startdate = new Date(dateval[0]);
        enddate = new Date(dateval[1]);
      }
    }
    var validatedate = $("#milestone_start_end").val();

    if (validatedate != undefined && validatedate != "") {
      if (
        new Date(validatedate) >= startdate &&
        new Date(validatedate) <= enddate
      ) {
      } else {
        $.notify(
          "Failed: Start and end date should be ",
          {
            style: "error",
            className: "graynotify",
          }
        );
        return false;
      }
    } else {
      $.notify("Failed: End Date is Mandatory for MileStone", {
        style: "error",
        className: "graynotify",
      });
      return false;
    }
    var mileStoneObj = getMileStonesObj();
    mileStoneObj.initiativeId = $(
      "#mileStonesForm input[name='initiativeID']"
    ).val();
    var methodType = "post";
    if (action == "add") {
    } else if (action == "edit") {
      mileStoneObj.id = $("#milestone_id").val();
      methodType = "put";
    }

    $.ajax({
      url: "/stratroom/milestones/",
      type: methodType,
      contentType: "application/json",
      data: JSON.stringify(mileStoneObj),
      success: function (data, status) {
        location.reload(true);
        $("#mileClosePopup").click();
      },
    });
  }
}

function handletasksSave() {
  var action = $("#tasksForm input[name='action']").val();

  if (action === "delete") {
    return;
  }

  /* ---------------- INITIATIVE DATE RANGE ---------------- */

  var initiativeStartDate = null;
  var initiativeEndDate = null;

  var initiativeValue = parentInitiativedetails.initiativeValue;
  var initiativeRange =
    initiativeValue.actualdaterange && initiativeValue.actualdaterange !== ""
      ? initiativeValue.actualdaterange
      : initiativeValue.daterange;

  if (initiativeRange && initiativeRange.includes("-")) {
    var initiativeDates = initiativeRange.split(" - ");
    initiativeStartDate = new Date(initiativeDates[0]);
    initiativeEndDate = new Date(initiativeDates[1]);
  }

  /* ---------------- TASK DATE RANGE ---------------- */

  var taskRange = $("#tasks_start_end").val();

  if (!taskRange || !taskRange.includes("-")) {
    $.notify("Failed: Start and End Date is Mandatory for Task", {
      style: "error",
      className: "graynotify",
    });
    return false;
  }

  var taskDates = taskRange.split(" - ");
  var taskStartDate = new Date(taskDates[0]);
  var taskEndDate = new Date(taskDates[1]);

  /* ---------------- DATE VALIDATIONS ---------------- */

  if (
    isNaN(taskStartDate.getTime()) ||
    isNaN(taskEndDate.getTime())
  ) {
    $.notify("Failed: Invalid Task Date Format", {
      style: "error",
      className: "graynotify",
    });
    return false;
  }

  if (taskStartDate > taskEndDate) {
    $.notify("Failed: Task Start Date cannot be after End Date", {
      style: "error",
      className: "graynotify",
    });
    return false;
  }

  if (
    taskStartDate < initiativeStartDate ||
    taskEndDate > initiativeEndDate
  ) {
    $.notify(
      "Failed: Task Start and End date should be within Initiative duration",
      {
        style: "error",
        className: "graynotify",
      }
    );
    return false;
  }

  /* ---------------- SAVE TASK ---------------- */

  var tasksObj = getTasksObj();
  tasksObj.initiativeId = $("#tasksForm input[name='initiativeID']").val();

  var methodType = "post";
  if (action === "edit") {
    tasksObj.id = $("#tasks_id").val();
    methodType = "put";
  }

  $.ajax({
    url: "/stratroom/initiativeTask",
    type: methodType,
    contentType: "application/json",
    data: JSON.stringify(tasksObj),
    success: function () {
      location.reload(true);
      $("#mileClosePopup").click();
    },
  });
}


function handleActivitiesSave() {
  var action = $("#activitiesForm input[name='action']").val();
  if (action == "delete") {
  } else {
    var startdate = "";
    var enddate = "";
    if (
      parentInitiativedetails.initiativeValue.actualdaterange != undefined &&
      parentInitiativedetails.initiativeValue.actualdaterange != ""
    ) {
      var daterange = parentInitiativedetails.initiativeValue.actualdaterange;
      if (daterange.includes("-")) {
        var dateval = daterange.split("-");
        startdate = new Date(dateval[0]);
        enddate = new Date(dateval[1]);
      }
    } else {
      var daterange = parentInitiativedetails.initiativeValue.daterange;
      if (daterange.includes("-")) {
        var dateval = daterange.split("-");
        startdate = new Date(dateval[0]);
        enddate = new Date(dateval[1]);
      }
    }
    var validatedate = "";
    if (
      parentInitiativedetails.initiativeValue.actualdaterange != undefined &&
      parentInitiativedetails.initiativeValue.actualdaterange != ""
    ) {
      validatedate = parentInitiativedetails.initiativeValue.actualdaterange;
    } else {
      validatedate = $("#activities_start_end").val();
    }
    $("#activitiesForm .activity_save_btn").attr("disabled", "disabled");

    if (validatedate != undefined && validatedate.includes("-")) {
      if (startdate != "" && enddate != "") {
        var dateval = validatedate.split("-");

        if (new Date(dateval[0]) == new Date(dateval[1])) {
          $.notify("Failed: Start and end date should not be same date", {
            style: "error",
            className: "graynotify",
          });
          $("#activitiesForm .activity_save_btn").removeAttr("disabled");
          return false;
        }

        if (
          new Date(dateval[0]) >= startdate &&
          new Date(dateval[0]) <= enddate
        ) {
        } else {
          $.notify(
            "Failed: Start and end date should be between this initiative",
            {
              style: "error",
              className: "graynotify",
            }
          );
          $("#activitiesForm .activity_save_btn").removeAttr("disabled");
          return false;
        }

        if (
          new Date(dateval[1]) >= startdate &&
          new Date(dateval[1]) <= enddate
        ) {
        } else {
          $.notify(
            "Failed: Start and end date should be between this initiative",
            {
              style: "error",
              className: "graynotify",
            }
          );
          $("#activitiesForm .activity_save_btn").removeAttr("disabled");
          return false;
        }
      }
    } else {
      $("#activitiesForm .activity_save_btn").removeAttr("disabled");
      $.notify("Failed: Invalid date format", {
        style: "error",
        className: "graynotify",
      });
      return false;
    }

    var activitiesObj = getActivitiesObj();
    var initiativeID = $("#activitiesForm input[name='initiativeID']").val();
    activitiesObj.initiativeId = initiativeID != "" ? initiativeID : 0;
    var methodType = "post";
    if (action == "add") {
    } else if (action == "edit") {
      activitiesObj.id = $("#activities_hidden_id").val();
      methodType = "put";
    }

  //  if ($("#activities_selected_user_" + activitiesObj.id).val()) {
	// 		activitiesObj.activitiesValue.multipleowners = $("#activities_selected_user_" + activitiesObj.id).val();
	// 	} else {
	// 		activitiesObj.activitiesValue.multipleowners = currentEmp;
	// 	}

    $.ajax({
      url: "/stratroom/activities/",
      type: methodType,
      contentType: "application/json",
      data: JSON.stringify(activitiesObj),
      success: function (data, status) {
        location.reload(true);
        $("#activClosePopup").click();
        console.log("New activities was created..");
      },
      error: function (msg, status) {
        $("#activitiesForm .activity_save_btn").removeAttr("disabled");
      },
    });
  }
}

function handleSubInitiativeSave() {
  var action = $("#sub_initative_Form input[name='action']").val();
  if (action == "delete") {
  } else {
    var startdate = "";
    var enddate = "";
    if (
      parentInitiativedetails.initiativeValue.actualdaterange != undefined &&
      parentInitiativedetails.initiativeValue.actualdaterange != ""
    ) {
      var daterange = parentInitiativedetails.initiativeValue.actualdaterange;
      if (daterange.includes("-")) {
        var dateval = daterange.split("-");
        startdate = new Date(dateval[0]);
        enddate = new Date(dateval[1]);
      }
    } else {
      var daterange = parentInitiativedetails.initiativeValue.daterange;
      if (daterange.includes("-")) {
        var dateval = daterange.split("-");
        startdate = new Date(dateval[0]);
        enddate = new Date(dateval[1]);
      }
    }
    var validatedate = "";
    if (
      parentInitiativedetails.initiativeValue.actualdaterange != undefined &&
      parentInitiativedetails.initiativeValue.actualdaterange != ""
    ) {
      validatedate = parentInitiativedetails.initiativeValue.actualdaterange;
    } else {
      validatedate = $("#sub_initative_start_end").val();
    }
    if (validatedate != undefined && validatedate.includes("-")) {
      if (startdate != "" && enddate != "") {
        var dateval = validatedate.split("-");
        if (new Date(dateval[0]) == new Date(dateval[1])) {
          $.notify("Failed: Start and end date should not be same date", {
            style: "error",
            className: "graynotify",
          });
          return false;
        }

        if (
          new Date(dateval[0]) >= startdate &&
          new Date(dateval[0]) <= enddate
        ) {
        } else {
          $.notify(
            "Failed: Start and end date should be between this initiative",
            {
              style: "error",
              className: "graynotify",
            }
          );
          return false;
        }

        if (
          new Date(dateval[1]) >= startdate &&
          new Date(dateval[1]) <= enddate
        ) {
        } else {
          $.notify(
            "Failed: Start and end date should be between this initiative",
            {
              style: "error",
              className: "graynotify",
            }
          );
          return false;
        }
      }
    } else {
      $.notify("Failed: Invalid date format", {
        style: "error",
        className: "graynotify",
      });
      return false;
    }

    var InitiativeObj = getSubinitiativeObj();
    var subinitiativeID = $(
      "#sub_initative_Form input[name='subinitiativeID']"
    ).val();
    subinitiativeID = subinitiativeID != "" ? subinitiativeID : 0;
    // if ($("#initiatities_selected_user_" + subinitiativeID).val()) {
    //   InitiativeObj.subInitiativeValue.multipleowners = $(
    //     "#initiatities_selected_user_" + subinitiativeID
    //   ).val();
    // } else {
    //   InitiativeObj.subInitiativeValue.multipleowners = (
    //     $("#userPrincipal").val() || ""
    //   ).trim();
    // }

    var methodType = "post";
    if (action == "add") {
    } else if (action == "edit") {
      InitiativeObj.id = $("#sub_Initiative_id").val();
      methodType = "put";
    }

    $.ajax({
      url: "/stratroom/subinitiatives/",
      type: methodType,
      contentType: "application/json",
      data: JSON.stringify(InitiativeObj),
      success: function (data, status) {
        $("#initiatities_selected_user_" + subinitiativeID).val("");
        $("#sub_initative_Form").css("display", "none");
        location.reload(true);
        $("#subIniClosePopup").click();
        console.log("New sub Initiative was created..");
      },
      error: function (msg, status) {
        if (!jQuery.isEmptyObject(msg.responseText)) {
          $.each(JSON.parse(msg.responseText), function (key, value) {
            if (key == "exception") {
              $.notify("Error:" + value, {
                style: "error",
                className: "graynotify",
              });
            }
            if (key == "error") {
              $.notify("Error:" + value, {
                style: "error",
                className: "graynotify",
              });
            }
          });
        }
      },
    });
  }
}





function subInitiativepopSuccessCallback(subinitiativedata) {
  $("#sub_initative_Form").css("display", "block");
  $("#initiativeID").val(subinitiativedata.initiativeId);
  $("#sub_Initiative_id").val(subinitiativedata.id);
  $("#Sub_Initiative_owner").val(subinitiativedata.owner);
  $("#subinitiative_name").val(subinitiativedata.subInitiativeValue.name);
  $("#subinitiative_desc").val(subinitiativedata.subInitiativeValue.description);
  //$("#initiativeattachment").val(subinitiativedata.subInitiativeValue.attachment);
  $("#sub_initative_progress").val(subinitiativedata.subInitiativeValue.progressval);
  $("#sub_initative_contribution").val(subinitiativedata.subInitiativeValue.contribution);
  $("#sub_initative_impremark").val(subinitiativedata.subInitiativeValue.impremark);
  $("#sub_initative_performance").val(subinitiativedata.subInitiativeValue.performance);
  $("#sub_initative_start_end").val(subinitiativedata.subInitiativeValue.dateRange);
    $("#sub_initative_multipleowners").val(subinitiativedata.subInitiativeValue.multipleowners);
  $("#subCreatedById").val(subinitiativedata.createdBy);
  $("#subCreatedBy").html(subinitiativedata.subInitiativeValue.createdByName);
  $("#subUpdatedBy").html(subinitiativedata.subInitiativeValue.updatedByName);
  $("#subCreatedByDate").html(subinitiativedata.createDateString);
  $("#subUpdatedByDate").html(subinitiativedata.updatedDateString);
  // $('.imgprofile').initial({
  // charCount : 2,
  // height : 30,
  // width : 30,
  // fontSize : 18
  // });
}

function tasksSuccessCallback(tasksData) {
  $("#tasksForm").css("display", "block");
  $("#initiativeID").val(tasksData.initiativeId);
  $("#tasks_id").val(tasksData.id);
  $("#tasks_desc").val(tasksData.taskValue.desc);
  $("#tasks_name").val(tasksData.taskValue.name);
  $("#tasks_status").val(tasksData.taskValue.status);
  $("#tasks_progress").val(tasksData.taskValue.progress);
  if (tasksData.taskValue.dateRange.indexOf("-") != -1) {
    var splitdatestring = tasksData.taskValue.dateRange.split("-");
    var datestring =
      splitdatestring[1] != undefined ? splitdatestring[1] : splitdatestring[0];
    $("#tasks_start_end").val(datestring);
  } else {
    $("#tasks_start_end").val(tasksData.taskValue.dateRange);
  }
  $("#tasksCreatedById").val(tasksData.createdBy);
  $("#tasksCreatedBy").html(tasksData.taskValue.createdByName);
  $("#tasksUpdatedBy").html(tasksData.taskValue.updatedByName);
  $("#tasksCreatedByDate").html(tasksData.createDateString);
  $("#tasksUpdatedByDate").html(tasksData.updatedDateString);
  /*$('.imgprofile').initial({
		charCount : 2,
		height : 30,
		width : 30,
		fontSize : 18
	});*/
}

function mileStonesSuccessCallback(mileStonesData) {
  $("#mileStonesForm").css("display", "block");
  $("#initiativeID").val(mileStonesData.initiativeId);
  $("#milestone_id").val(mileStonesData.id);
  $("#milestone_desc").val(mileStonesData.mileStonesValue.desc);
  $("#milestone_name").val(mileStonesData.mileStonesValue.name);
  $("#statusTypeMilestone").val(mileStonesData.mileStonesValue.status);
  $("#milestone_progress").val(mileStonesData.mileStonesValue.progress);
  if (mileStonesData.mileStonesValue.dateRange.indexOf("-") != -1) {
    var splitdatestring = mileStonesData.mileStonesValue.dateRange.split("-");
    var datestring =
      splitdatestring[1] != undefined ? splitdatestring[1] : splitdatestring[0];
    $("#milestone_start_end").val(datestring);
  } else {
    $("#milestone_start_end").val(mileStonesData.mileStonesValue.dateRange);
  }
  $("#mileCreatedById").val(mileStonesData.createdBy);
  $("#mileCreatedBy").html(mileStonesData.mileStonesValue.createdByName);
  $("#mileUpdatedBy").html(mileStonesData.mileStonesValue.updatedByName);
  $("#mileCreatedByDate").html(mileStonesData.createDateString);
  $("#mileUpdatedByDate").html(mileStonesData.updatedDateString);
  /*$('.imgprofile').initial({
		charCount : 2,
		height : 30,
		width : 30,
		fontSize : 18
	});*/
}

function activitiesSuccessCallback(activitiesData) {
  $("#activitiesForm").css("display", "block");
  $("#initiativeID").val(activitiesData.initiativeId);
  $("#activities_id").val(activitiesData.id);
  $("#activities_hidden_id").val(activitiesData.id);
  $("#subInitative_desc").val(activitiesData.subInitiativeId);
  $("#activities_desc").val(activitiesData.activitiesValue.desc);
  $("#activities_name").val(activitiesData.activitiesValue.name);
  $("#activities_status").val(activitiesData.activitiesValue.status);
  $("#activities_progress").val(activitiesData.activitiesValue.progress);
  $("#activities_budget").val(activitiesData.activitiesValue.budget);
   $("#activity_multipleowners").val(activitiesData.activitiesValue.multipleowners);
  $("#activities_Actual").val(activitiesData.activitiesValue.actual);
  $("#activities_start_end").val(activitiesData.activitiesValue.dateRange);
  $("#activCreatedById").val(activitiesData.createdBy);
  $("#activCreatedBy").html(activitiesData.activitiesValue.createdByName);
  $("#activUpdatedBy").html(activitiesData.activitiesValue.updatedByName);
  $("#activCreatedByDate").html(activitiesData.createDateString);
  $("#activUpdatedByDate").html(activitiesData.updatedDateString);
  /*
   * $('.imgprofile').initial({ charCount : 2, height : 30, width : 30,
   * fontSize : 18 });
   */
}

$(document).on("change", "#Initiative_owner", function () {
  $("#impact").find("option").remove().end();
  if ($(this).val() == "") {
    $("#impact").empty();
    return false;
  }
  // populateKPIList('.initatives_description_popup #impact', $(this).val());
  getScoreCardName(
    ".initatives_description_popup #Scorecard_select",
    $(this).val()
  );
});

function initiativepopSuccessCallback(initiativedata) {

  $("#InitiativeForm").css("display", "block");

  parentInitiativedetails.id = initiativedata.id;
  parentInitiativedetails.owner = initiativedata.owner;
  parentInitiativedetails.pageId = initiativedata.pageId;
  parentInitiativedetails.createdBy = initiativedata.createdBy;
  parentInitiativedetails.initiativeValue = initiativedata.initiativeValue;

  $("#Initiative_id").val(initiativedata.id);
  $("#Initiative_show_id").val(initiativedata.initiativeId);

  $("#Initiative_owner").val(
    initiativedata.owner || ($("#userPrincipal").val() || "").trim()
  );
  $("#Initiative_name").val(initiativedata.initiativeValue.name);
 if (initiativedata.departmentId != undefined) {
		$('#Initiative_Department').val(initiativedata.departmentId)
	} else {
		$('#Initiative_Department').val('');
	}
	//$("#Initiative_Department").select2({});		
	$('#Initiative_Department').select2({
		selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
		dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
	});
  $("#Initiative_description").val(initiativedata.initiativeValue.description);
 
  $("#Initiative_total").val(initiativedata.initiativeValue.Total);
  $("#Initiative_Utilized").val(initiativedata.initiativeValue.Utilized);
  $("#Initiative_Balance").val(initiativedata.initiativeValue.Balance);
  $("#Initiative_progress").val(initiativedata.initiativeValue.progressval);
  $("#TotCurr").val(initiativedata.initiativeValue.totalcurrency);
	$("#UtilCurr").val(initiativedata.initiativeValue.utilcurrency);
	$("#statusType").val(initiativedata.initiativeValue.statusType);
	$("#BalanceCurr").val(initiativedata.initiativeValue.balancecurrency);
	$("#Initiative_progress").val(initiativedata.initiativeValue.progressval);

  $("#Initiative_start_end_date").val(initiativedata.initiativeValue.daterange);
  $("#Actual_start_end_date").val(initiativedata.initiativeValue.actualdaterange);

  // ---------- SCORECARD ----------
  $("#Scorecard_select").empty();
  getScoreCardName("#Scorecard_select");
  $("#Scorecard_select")
    .val(initiativedata.scorecardDetailId)
    .trigger("change");

  // ---------- PERSPECTIVE ----------
  $("#Perspective_select").empty();
  getPerspectiveName("#Perspective_select", initiativedata.scorecardDetailId);
  $("#Perspective_select")
    .val(initiativedata.perspectiveId)
    .trigger("change");

  // ---------- OBJECTIVE ----------
  $("#Objective_select").empty();
  getObjectiveName("#Objective_select", initiativedata.perspectiveId);
  $("#Objective_select")
    .val(initiativedata.objectiveId)
    .trigger("change");


  // ======================================================
  // 🔥 KPI SELECT FIXED (READ FROM initiativeValue.kpi)
  // ======================================================

  $("#kpi_select").empty();

  getKpiName("#kpi_select", initiativedata.objectiveId);

  if (Array.isArray(initiativedata?.initiativeValue?.kpi)) {

    var kpiIds = [];

    initiativedata.initiativeValue.kpi.forEach(function (item) {

      var id = item.id;
      var name = item.name.trim();   // removes extra space

      // If option not exists → create it
      if ($("#kpi_select option[value='" + id + "']").length === 0) {
        var option = new Option(name, id, true, true);
        $("#kpi_select").append(option);
      }

      kpiIds.push(id);
    });

    $("#kpi_select").val(kpiIds).trigger("change");
  }

  // ---------- SELECT2 INIT ----------
  $(".initatives_description_popup select").select2();

  $("#createdBy").html(initiativedata.initiativeValue.createdByName);
  $("#updatedBy").html(initiativedata.initiativeValue.updatedByName);
  $("#createdByDate").html(initiativedata.createDateString);
  $("#updatedByDate").html(initiativedata.updatedDateString);
}



function formvalidationerrorreset() {
  $("*[id*=-error]").each(function () {
    $(this).remove();
  });
}

function handleinitiativeevent(id, action) {
  $("#InitiativeForm").css("display", "none");
  $("#InitiativeForm").trigger("reset");
  $(".initatives_description_popup #Initiative_owner")
    .find("option")
    .remove()
    .end();
  $(".initatives_description_popup #impact").find("option").remove().end();
  $(".initatives_description_popup #Initiative_owner").append(
    `<option value="">Select Owner</option>`
  );
  populateOwnerDropdownInitiative(
    ".initatives_description_popup #Initiative_owner"
  );
  populateOwnerDropdowndepartment(
    ".initatives_description_popup #Initiative_Department"
  );
  //$(".select-wrapper .dropdown-trigger").trigger("click");
  formvalidationerrorreset();
  $("#InitiativeForm input[name='action']").val(action);

  if (action == "delete") {
    if (initiativedeletepermission == false) {
      return false;
    }
    $("#deleterecordid").val(id);
    $("#deleterecordtype").val("initiative");
    $("#deleteModalinitiative").modal("toggle");
    $(window).on("resize", function () {
      $(".modal:visible").each(alignModal);
    });
    $(".modal").on("shown.bs.modal", alignModal);
  } else if (action == "add") {
    if (initiativecreatepermission == false) {
      return false;
    }
    $(".initatives_description_popup").modal("toggle");
    $("#createdBy").html("");
    $("#createdByDate").html("");
    $("#updatedBy").html("");
    $("#updatedByDate").html("");
    $("#Initiative_id_wrapper").css("display", "none"); // Hide the ID input
    // when adding
    $(".initatives_description_popup #impact").val("");
    $(".initatives_description_popup #Initiative_owner").val("");
    $("#InitiativeForm").css("display", "block");
    initiativeaddpopupresetform();
    // populateKPIList('.initatives_description_popup #impact', ($("#userPrincipal").val() || "").trim() );
    getScoreCardName(".initatives_description_popup #Scorecard_select");

    //$("#Initiative_Department").select2({});
    $("#Initiative_owner").val(($("#userPrincipal").val() || "").trim());
  } else {
    // view and edit
    $(".initatives_description_popup").modal("toggle");
    $("#Initiative_id_wrapper").css("display", "block");
    $(".initatives_description_popup #Initiative_show_id").prop(
      "disabled",
      true
    );

    if (action == "view") {
      if (initiativeviewpermission == false) {
        return false;
      }
      $('#InitiativeForm input[type="text"]').prop("disabled", true);
      $('#InitiativeForm input[type="checkbox"]').prop("disabled", true);
      $("#InitiativeForm select").prop("disabled", true);
      $('#InitiativeForm button[value="Save"]').css("display", "none");
    }
    if (action == "edit") {
      if (initiativeeditpermission == false) {
        return false;
      }
      $.ajax({
        url: "/stratroom/initiatives/" + id,
        success: initiativepopSuccessCallback,
      });
    }
  }
}

function initiativeaddpopupresetform() {
  var labelText =
    '<input id="Totalid" class="form-check-input" type="checkbox" value=""><div data-i18n="Total">Total</div>  <span class="form-check-sign"><span class="check"></span></span>';
  $("#totallabel").html(labelText);

  var labelText =
    '<input id="Utilizedid" class="form-check-input" type="checkbox" value=""><div data-i18n="Utillized">Utillized</div><span class="form-check-sign"><span class="check"></span></span>';
  $("#utilizedlabel").html(labelText);

  var labelText =
    '<input id="Balanceid" class="form-check-input" type="checkbox" value=""><div data-i18n="Balance">Balance</div><span class="form-check-sign"><span class="check"></span></span>';
  $("#balancelabel").html(labelText);

  var labelText =
    '<input id="actualId" class="form-check-input" type="checkbox" value="" data-i18n="Actual"><div data-i18n="Actual">Actual</div><span class="form-check-sign"><span class="check"></span></span>';
  $("#actuallabel").html(labelText);

  var labelText =
    '<input id="targetId" class="form-check-input" type="checkbox" value=""><div data-i18n="Target">Target</div><span class="form-check-sign"><span class="check"></span></span>';
  $("#targetlabel").html(labelText);

  var labelText =
    '<input id="budgetID" class="form-check-input" type="checkbox" value=""><div data-i18n="Budget">Budget</div><span class="form-check-sign"><span class="check"></span></span>';
  $("#budgetlabel").html(labelText);

  var labelText =
    '<input id="forcastId" class="form-check-input" type="checkbox" value="" data-i18n="Forecast"><div data-i18n="Forecast">Forecast</div><span class="form-check-sign"><span class="check"></span></span>';
  $("#forecastlabel").html(labelText);

  var labelText =
    '<input id="totalbudId" class="form-check-input" type="checkbox" value=""><div data-i18n="Total Budget">Total Budget</div><span class="form-check-sign"><span class="check"></span></span>';
  $("#totalbudgetlabel").html(labelText);

  var labelText =
    '<input id="totalactId" class="form-check-input" type="checkbox" value=""><div data-i18n="Total Actual">Total Actual</div><span class="form-check-sign"><span class="check"></span></span>';
  $("#totalactuallabel").html(labelText);
}

function handlesubinitiativeevent(id, subInitiativeId, action) {
  if(action == "edit"){
    $(".subInitiativeHeaderText").text("Edit Sub Initiative Description")
  }else {
    $(".subInitiativeHeaderText").text("Add Sub Initiative Description")
  }
  if (
    parentInitiativedetails.initiativeValue.actualdaterange != undefined &&
    parentInitiativedetails.initiativeValue.actualdaterange != ""
  ) {
    var daterange = parentInitiativedetails.initiativeValue.actualdaterange;
    var startdate = new Date();
    var enddate = new Date();
    if (daterange.includes("-")) {
      var dateval = daterange.split("-");
      startdate = new Date(dateval[0]);
      enddate = new Date(dateval[1]);
    }
  } else {
    var daterange = parentInitiativedetails.initiativeValue.daterange;
    var startdate = new Date();
    var enddate = new Date();
    if (daterange.includes("-")) {
      var dateval = daterange.split("-");
      startdate = new Date(dateval[0]);
      enddate = new Date(dateval[1]);
    }
  }

  $("#sub_initative_start_end").datepicker({
    language: "en",
    minDate: startdate,
    maxDate: enddate,
    range: true,
    autoClose: true,
    position: "top left",
    //todayButton: true,
    onSelect: function (fd) {
      // $('.datepickers-container').hide();
    },
  });

  $("#sub_initative_Form input[name='action']").val(action);
  if (action == "delete") {
    $("#deleterecordid").val(subInitiativeId);
    $("#deleterecordtype").val("sub_initiative");
    $("#deleteModalinitiative").modal("toggle");

    $(window).on("resize", function () {
      $(".modal:visible").each(alignModal);
    });
    $(".modal").on("shown.bs.modal", alignModal);
    return false;
  }

  $(".sub_initative_edit_popup").modal("toggle");
  $("#sub_initative_Form").css("display", "none");
  $("#sub_initative_Form").trigger("reset");
  populateOwnerDropdownInitiative(
    ".sub_initative_edit_popup #Sub_Initiative_owner"
  );
  $("#sub_initative_Form input[name='initiativeID']").val(id);
  if (subInitiativeId != undefined && subInitiativeId != "") {
    $("#sub_initative_Form input[name='subinitiativeID']").val(subInitiativeId);
  }

  if (action == "add") {
    $("#subCreatedBy").html("");
    $("#subCreatedByDate").html("");
    $("#subUpdatedBy").html("");
    $("#subUpdatedByDate").html("");
    $("#sub_Initiative_id_wrapper").css("display", "none"); // Hide the ID input
    // when adding
    $("#sub_initative_Form").css("display", "block");
  } else {
    // view and edit
    $("#sub_Initiative_id_wrapper").css("display", "block");
    $(".sub_initative_edit_popup #sub_Initiative_id").prop("disabled", true);

    if (action == "view") {
      $('#sub_initative_Form input[type="text"]').prop("disabled", true);
      $('#sub_initative_Form input[type="checkbox"]').prop("disabled", true);
      $("#sub_initative_Form select").prop("disabled", true);
      $('#sub_initative_Form button[value="Save"]').css("display", "none");
    }
    $.ajax({
      url: "/stratroom/subinitiatives/" + subInitiativeId,
      success: subInitiativepopSuccessCallback,
    });
  }
}

function handlesubinitiativeeventdelete() {
  var id = $("#deleterecordid").val();
  var typeofdeleteurl = $("#deleterecordtype").val();
  if (id == "" || typeofdeleteurl == "") {
    return false;
  }
  var url = "";
  var flag = false;
  if (typeofdeleteurl == "initiative") {
    url = "/stratroom/initiatives/" + id;
    flag = true;
  } else if (typeofdeleteurl == "sub_initiative") {
    url = "/stratroom/subinitiatives/" + id;
  } else if (typeofdeleteurl == "activities") {
    url = "/stratroom/activities/" + id;
  } else if (typeofdeleteurl == "milestones") {
    url = "/stratroom/milestones/" + id;
  } else if (typeofdeleteurl == "comments") {
    url = "/stratroom/comments/" + id;
  } else if (typeofdeleteurl == "tasks") {
    url = "/stratroom/initiativeTask/" + id;
  }else if (typeofdeleteurl == "attachments") {
    url = "/stratroom/initiativeAttach/" + id;
  }

  $.ajax({
    url: url,
    type: "delete",
    contentType: "application/json",
    success: function (data, status) {
      if (flag == true) {
        localStorage.setItem("initiative_pagenumber", "");
        location.reload(true);
      } else {
        location.reload(true);
      }
    },
    error: readErrorMsg,
  });
}


function handlesubinitiativeuserevent(id, initiativeID, action) {
    var imageElement = "subinitiativeUser_" + id;
    var data = {};
    
    if (action == "edit") {
        if (!subinieditpermission) {
            return false;
        }
        
        // Show loading spinner
        $("#sub-ini-box_view_users").html(
            '<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>'
        );
        $("#user_subview").removeClass();
        $("#user_subview").addClass("sub_initative_add_user_popup_class_" + id);
        $("#user_subview_current_id").attr("data-currentid", id);
        $("#user_subview_current_id").attr("data-inititativecurrentid", initiativeID);
        $("#subinitiativeuserajaxid").val(id);
        $("#subinitiativeparentajaxid").val(initiativeID);
        
        var orgId = localStorage.getItem("initiativeTypeOrg");
        var tag_url = (orgId != "3") ? "/stratroom/deptReporteeList" : "/stratroom/reporteeList";
        
        var previouslyAssignedEmpIds = [];
        
        // Fetch sub-initiative details to get previously assigned user
        $.ajax({
            url: "/stratroom/subinitiatives/" + id,
            async: false,
            success: function (result, status) {
                subInitiativechilds = result;
                
                var targetSubInitiative = null;
                
                // Handle array or single object response
                if (Array.isArray(result)) {
                    targetSubInitiative = result.find(function(item) {
                        return item.id == id || item.id.toString() === id.toString();
                    });
                } else if (result.id == id) {
                    targetSubInitiative = result;
                }
                
                // Extract employee IDs from subInitiativesMapDTOList
                if (targetSubInitiative && targetSubInitiative.subInitiativesMapDTOList && 
                    Array.isArray(targetSubInitiative.subInitiativesMapDTOList)) {
                    
                    targetSubInitiative.subInitiativesMapDTOList.forEach(function(mapItem) {
                        if (mapItem.empId) {
                            previouslyAssignedEmpIds.push(mapItem.empId);
                        }
                        else if (mapItem.employeeProfilePos && mapItem.employeeProfilePos.empId) {
                            previouslyAssignedEmpIds.push(mapItem.employeeProfilePos.empId);
                        }
                    });
                }
            },
            error: readErrorMsg
        });
        
        // Fetch user list and render RADIO BUTTONS
        $.ajax({
            url: tag_url,
            async: false,
            success: function (result, status) {
                var subinitiativeUser = "";
                
                $.each(result, function (index, users) {
                    var username = users.name == undefined || users.name == "" ? "User" : users.name;
                    
                    var userProfileConcate = users.image == undefined || users.image == ""
                        ? "data-name='" + username + "' class='rounded-circle subuserinitiativeimage' "
                        : " class='rounded-circle' src='" + users.image + "'";
                    
                    // Check if this user was previously assigned
                    var ischecked = "";
                    var userId = users.id.toString();
                    
                    var isFound = previouslyAssignedEmpIds.some(function(empId) {
                        return empId.toString() === userId;
                    });
                    
                    if (isFound) {
                        ischecked = "checked";
                    }
                    
                    // 🔥 CHANGED: type="radio" + name="sub_initiative_owner" (singular, no [])
                    subinitiativeUser +=
                        '<div class="list-group-item attendee">' +
                            '<div class="form-check cusom-check form-check-reverse">' +
                                '<input class="form-check-input single-select-radio" type="radio" name="sub_initiative_owner" ' + // 👈 Radio + singular name
                                        'id="attendees' + users.id + '" value="' + users.id + '" ' + ischecked + '>' +
                                '<label class="form-check-label" for="attendees' + users.id + '">' +
                                    '<span class="image">' +
                                        '<img ' + userProfileConcate + ' alt="' + users.name + '" width="18" height="18" >' +
                                    '</span>' +
                                    '<span class="name">' + users.name + '</span>' +
                                '</label>' +
                            '</div>' +
                        '</div>';
                });
                
                // Render the list
                $("#sub-ini-box_view_users").html(subinitiativeUser);
                
                // Initialize initials for avatars
                $(".subuserinitiativeimage").initial({
                    charCount: 2,
                    height: 30,
                    width: 30,
                    fontSize: 18,
                });
                
                // ✅ REMOVED: No manual uncheck logic needed - radio buttons handle single selection natively!
                // ✅ REMOVED: No change handler needed for enforcing single selection
                
            },
            error: function(xhr, status, error) {
                console.error("Error loading users:", error);
                $("#sub-ini-box_view_users").html("<p>Error loading users.</p>");
            }
        });
    }
}

$(document).on("click", ".getselectedSubUsers", function () {
    var id = $("#user_subview_current_id").attr("data-currentid");
    var InitiativeID = $("#user_subview_current_id").attr("data-inititativecurrentid");

    if ((id == undefined || id == "" || id == " ") && (InitiativeID == undefined || InitiativeID == "" || InitiativeID == " ")) {
        return false;
    }

    var imageElement = "subinitiativeUser_" + id;
    
    // 🔥 CHANGED: Radio button selector (name without []) + get single value
    var selectedOwner = $(".sub_initative_add_user_popup input[name='sub_initiative_owner']:checked");
    var userseslectedData = [];
    
    if (selectedOwner.length) {
        userseslectedData.push(parseInt(selectedOwner.val())); // 👈 Single value, no .map().get() needed
    }

    var functionParams = id + ',' + InitiativeID + ',' + '"edit"';
    
    // Save to hidden field
    $("#initiatities_selected_user_" + id).val(userseslectedData.join(','));

    var orgId = localStorage.getItem("initiativeTypeOrg");
    var tag_url = (orgId != '3') ? "/stratroom/deptReporteeList" : "/stratroom/reporteeList";

    if (userseslectedData.length > 0) {
        $.ajax({
            url: tag_url,
            async: true,
            success: function (allUsersData) {
                var subinitiativeUser = "";
                
                // Filter the full list to ONLY include selected users
                var selectedUsers = allUsersData.filter(function(user) {
                    return userseslectedData.includes(user.id);
                });

                // Render Logic (Simplified)
                var limit = 2; // Show max 2 avatars + badge
                var totalSelected = selectedUsers.length;
                var extraCount = totalSelected - limit;
                var badgeinc = false;

                $.each(selectedUsers, function (index, users) {
                    var usernam = (users.name == undefined || users.name == "") ? "User" : users.name;
                    var usernameShort = usernam.slice(0, 2);
                    var userProfileConcate = (users.image == undefined || users.image == "") 
                        ? "data-name='" + usernameShort + "' class='rounded-circle initiativeuserimage'" 
                        : "src='" + users.image + "' class='rounded-circle initiativeuserimage'";

                    // Logic: Show first 2 avatars. If more exist, show badge on the 3rd slot.
                    if (index < limit) {
                        // Render Avatar
                        subinitiativeUser += '<li class="avatar avatar-sm selecteduser" data-selecteduser="' + users.id + '">' +
                            '<a href="#" data-toggle="modal" data-target=".sub_initative_add_user_popup" onclick="handlesubinitiativeuserevent(' + functionParams + ')">' +
                            '<img class="rounded-circle sub_init_img initiativeuserimage" ' + userProfileConcate + ' alt="' + usernam + '" width="50">' +
                            '</a></li>';
                    } else if (index === limit) {
                        // Render Badge for remaining users
                        badgeinc = true;
                        subinitiativeUser += '<li class="avatar avatar-sm selecteduser">' +
                            '<a href="#" data-toggle="modal" data-target=".sub_initative_add_user_popup" onclick="handlesubinitiativeuserevent(' + functionParams + ')">' +
                            '<span class="badge">+' + extraCount + '</span></a></li>';
                        // Stop rendering further avatars
                        return false; 
                    }
                });

                $("#" + imageElement).html(subinitiativeUser);
                
                // Re-initialize initials plugin
                $('.initiativeuserimage').initial({ 
                    charCount: 2, 
                    height: 30, 
                    width: 30, 
                    fontSize: 18 
                });
                 location.reload();
            },
            error: function(err) {
                console.error("Failed to fetch users for avatar update", err);
            }
        });
    } else {
        // Handle case where no users are selected
        $("#" + imageElement).html(''); 
    }
    
    // Close the modal (Bootstrap 5)
    var modalEl = document.querySelector('.sub_initative_add_user_popup');
    if(modalEl) {
        var modalInstance = bootstrap.Modal.getInstance(modalEl);
        if(modalInstance) modalInstance.hide();
    }
});


$(document).on("change", ".single-select-radio", function () { // 👈 Changed from click to change
    var id = $("#subinitiativeuserajaxid").val();
    var subinitiativeID = $("#subinitiativeparentajaxid").val();
    var action = "edit";
    var InitiativeObj = { "id": "", "owner": "", "pageId": "", "initiativeId": "", "subInitiativeValue": "" };
    
    if (subInitiativechilds == undefined || subInitiativechilds == "" || subInitiativechilds.id == "") {
        return false;
    }

    subinitiativeID = (subinitiativeID != "" ? subinitiativeID : 0);
    InitiativeObj.owner = (subInitiativechilds.owner == "" || subInitiativechilds.owner == undefined ? currentEmp : subInitiativechilds.owner);
    InitiativeObj.pageId = (subInitiativechilds.pageId == "" || subInitiativechilds.pageId == undefined ? $('#pagenumber').val() : subInitiativechilds.pageId);
    InitiativeObj.initiativeId = subInitiativechilds.initiativeId;
    InitiativeObj.createdBy = subInitiativechilds.createdBy;
    InitiativeObj.subInitiativeValue = subInitiativechilds.subInitiativeValue;
    
    // 🔥 SIMPLIFIED: Radio buttons return single value directly
    var selectedOwner = $(".single-select-radio:checked").val(); // 👈 Single value, no array

    if (!selectedOwner) {
        InitiativeObj.subInitiativeValue.multipleowners = currentEmp;
    } else {
        InitiativeObj.subInitiativeValue.multipleowners = selectedOwner; // 👈 Direct assignment, no join() needed
    }

    var methodType = 'put';
    InitiativeObj.id = id;

    $.ajax({
        url: "/stratroom/subinitiatives/",
        type: methodType,
        async: false,
        contentType: "application/json",
        data: JSON.stringify(InitiativeObj),
        success: function (data, status) {
            // $.notify("Updated Successfully");
        },
        error: function (msg, status) {
            if (!jQuery.isEmptyObject(msg.responseText)) {
                $.each(JSON.parse(msg.responseText), function (key, value) {
                    if (key == "exception") {
                        $.notify("Error:" + value, {
                            style: 'error',
                            className: 'graynotify'
                        });
                    }
                    if (key == "error") {
                        $.notify("Error:" + value, {
                            style: 'error',
                            className: 'graynotify'
                        });
                    }
                });
            }
        }
    });
});

$(document).on("click", "#clear-subowner-selection", function() {
    // Uncheck all radios in the group
    $('.single-select-radio').prop('checked', false);
    
    // Optionally trigger update to set default owner
    InitiativeObj.subInitiativeValue.multipleowners = currentEmp;
    // ... make AJAX call if needed ...
    
    // Visual feedback
    $.notify("Selection cleared", { style: 'info' });
});
$(document).on("click", ".getselectedActivitiesUsers", function () {
  var id = $("#activities_current_id").attr("data-activities_sub_current_id");
  var InitiativeID = $("#activities_current_id").attr("data-activities_parent_id");
  
  if (
    (id == undefined || id == "" || id == " ") &&
    (InitiativeID == undefined || InitiativeID == "" || InitiativeID == " ")
  ) {
    return false;
  }
  
  var imageElement = "initiativeactivitieUser_" + id;
  var userseslectedData = [];
  
  // 🔥 CHANGED: Radio button selector (name without [])
  var selectedSubinitiativeOwner = $(
    ".activities_add_user_popup input[name='activities_owner']:checked"
  );
  
  // 🔥 CHANGED: Get single value instead of looping through array
  if (selectedSubinitiativeOwner.length) {
    userseslectedData.push(parseInt(selectedSubinitiativeOwner.val()));
  }

  var functionParams = id + "," + InitiativeID + "," + '"edit"';
  var functionName = "handleinitiativeActivitiesuserevent";
  var modalPopupName = ".activities_add_user_popup";
  
  $("#activities_selected_user_" + id).val(userseslectedData.join(","));
  
  var orgId = localStorage.getItem("initiativeTypeOrg");
  var tag_url = "";
  if (orgId != "3") {
    tag_url = "/stratroom/deptReporteeList";
  } else {
    tag_url = "/stratroom/reporteeList";
  }
  
  if (!jQuery.isEmptyObject(userseslectedData)) {
    $.ajax({
      url: tag_url,
      success: function (data, status) {
        var subinitiativeUser = "";
        
        if (userseslectedData.length != data.length) {
          var profileBadgeIncrement =
            userseslectedData.length >= 3
              ? parseInt(userseslectedData.length) - parseInt(2)
              : "";
          var badgeinc = false;
          
          $.each(data, function (key, users) {
            $.each(userseslectedData, function (index, selectedvalue) {
              if (selectedvalue == users.id) {
                var usernam =
                  users.name == undefined || users.name == ""
                    ? "User"
                    : users.name;

                var username = usernam.slice(0, 2);
                var userProfileConcate =
                  users.image == undefined || users.image == ""
                    ? "data-name='" +
                      username +
                      ' class="rounded-circle initiativeuserimage" '
                    : "src='" + users.image + "'";
                    
                if (index <= 2) {
                  subinitiativeUser +=
                    '<li class="avatar avatar-sm selecteduser" data-selecteduser="' +
                    users.id +
                    '"><a href="#" data-toggle="modal" data-target=".activities_add_user_popup" onclick=' +
                    functionName +
                    "(" +
                    functionParams +
                    ')><img class="rounded-circle sub_init_img initiativeuserimage" ' +
                    userProfileConcate +
                    ' alt="' +
                    username +
                    '" width="50"></a></li>';
                }
                
                if (userseslectedData.length == 1) {
                  subinitiativeUser +=
                    '<li class="avatar avatar-sm selecteduser" data-selecteduser="' +
                    users.id +
                    '"><a href="#" data-toggle="modal" data-target=".activities_add_user_popup" onclick=' +
                    functionName +
                    "(" +
                    functionParams +
                    ')><img class="rounded-circle sub_init_img initiativeuserimage" ' +
                    userProfileConcate +
                    ' alt="' +
                    username +
                    '" width="50"></a></li>';
                  return false;
                }

                if (userseslectedData.length == 2) {
                  subinitiativeUser +=
                    '<li class="avatar avatar-sm selecteduser" data-selecteduser="' +
                    users.id +
                    '"><a href="#" data-toggle="modal" data-target=".activities_add_user_popup" onclick=' +
                    functionName +
                    "(" +
                    functionParams +
                    ')><img class="rounded-circle sub_init_img initiativeuserimage" ' +
                    userProfileConcate +
                    ' alt="' +
                    username +
                    '" width="50"></a></li>';
                  return false;
                }
                
                if (userseslectedData.length >= 3 && index >= 2 && index <= 2) {
                  badgeinc = true;
                  subinitiativeUser = subinitiativeUser.replace(
                    '<li class="avatar avatar-sm selecteduser" data-selecteduser="' +
                      users.id +
                      '"><img class="rounded-circle sub_init_img initiativeuserimage" ' +
                      userProfileConcate +
                      ' alt="' +
                      username +
                      '" width="50"></li>',
                    ""
                  );
                  subinitiativeUser +=
                    '<li class="avatar avatar-sm selecteduser" data-selecteduser="' +
                    users.id +
                    '"><a href="#" data-toggle="modal" data-target=".activities_add_user_popup" onclick=' +
                    functionName +
                    "(" +
                    functionParams +
                    ')><img class="rounded-circle sub_init_img initiativeuserimage" ' +
                    userProfileConcate +
                    ' alt="' +
                    username +
                    '" width="50"></li>';
                  return false;
                }
              }
            });
          });
          
          if (badgeinc == true) {
            subinitiativeUser =
              subinitiativeUser +
              '<li class="avatar avatar-sm selecteduser"><a href="#" data-toggle="modal" data-target=".activities_add_user_popup" onclick=' +
              functionName +
              "(" +
              functionParams +
              ')><span _ngcontent-hhc-c5="" class="badge">+' +
              profileBadgeIncrement +
              "</span></a></li>";
          }
        }
        
        if (userseslectedData.length == data.length) {
          var profileBadgeIncrement =
            data.length >= 3 ? parseInt(data.length) - parseInt(2) : 0;
            
          $.each(data, function (index, users) {
            var username =
              users.name == undefined || users.name == "" ? "User" : users.name;
            var userProfileConcate =
              users.image == undefined || users.image == ""
                ? "data-name='" +
                  username +
                  ' class="rounded-circle initiativeuserimage" '
                : "src='" + users.image + "'";
                
            subinitiativeUser +=
              '<li class="avatar avatar-sm selecteduser" data-selecteduser="' +
              users.id +
              '"><img class="rounded-circle sub_init_img initiativeuserimage" ' +
              userProfileConcate +
              ' alt="' +
              username +
              '" width="50"></li>';
              
            if (userseslectedData.length >= 3 && index >= 2) {
              subinitiativeUser = subinitiativeUser.replace(
                '<li class="avatar avatar-sm selecteduser" data-selecteduser="' +
                  users.id +
                  '"><img class="rounded-circle sub_init_img initiativeuserimage" ' +
                  userProfileConcate +
                  ' alt="' +
                  username +
                  '" width="50"></li>',
                ""
              );
              subinitiativeUser +=
                '<li class="avatar avatar-sm selecteduser" data-selecteduser="' +
                users.id +
                '"><a href="#" data-toggle="modal" data-target="' +
                modalPopupName +
                '" onclick=' +
                functionName +
                "(" +
                functionParams +
                ')><span _ngcontent-hhc-c5="" class="badge">+' +
                profileBadgeIncrement +
                "</span></a></li>";
              return false;
            }
            
            if (userseslectedData.length == 1) {
              subinitiativeUser =
                '<li class="avatar avatar-sm selecteduser" data-selecteduser="' +
                users.id +
                '"><a href="#" data-toggle="modal" data-target="' +
                modalPopupName +
                '" onclick=' +
                functionName +
                "(" +
                functionParams +
                ')><img class="rounded-circle sub_init_img initiativeuserimage" ' +
                userProfileConcate +
                ' alt="' +
                username +
                '" width="50"></a></li>';
              return false;
            }

            if (userseslectedData.length == 2) {
              subinitiativeUser +=
                '<li class="avatar avatar-sm selecteduser" data-selecteduser="' +
                users.id +
                '"><a href="#" data-toggle="modal" data-target="' +
                modalPopupName +
                '" onclick=' +
                functionName +
                "(" +
                functionParams +
                ')><img class="rounded-circle sub_init_img initiativeuserimage" ' +
                userProfileConcate +
                ' alt="' +
                username +
                '" width="50"></a></li>';
              return false;
            }
          });
        }

        $("#" + imageElement).html("");
        $("#" + imageElement).html(subinitiativeUser);
        $(".initiativeuserimage").initial({
          charCount: 2,
          height: 30,
          width: 30,
          fontSize: 18,
        });
        location.reload();
      },
    });
  } else {
    var users = topparentinitiativeDetails;
    userseslectedData.push(users.id);
    $("#activities_selected_user_" + id).val(userseslectedData.join(","));
    
    var username =
      users.name == undefined || users.name == "" ? "User" : users.name;
    var userProfileConcate =
      users.image == undefined || users.image == ""
        ? "data-name='" +
          username +
          ' class="rounded-circle initiativeuserimage" '
        : "src='" + users.image + "'";
        
    subinitiativeUser =
      '<li class="avatar avatar-sm selecteduser"><a href="#" data-toggle="modal" data-target="' +
      modalPopupName +
      '" onclick=' +
      functionName +
      "(" +
      functionParams +
      ')><img class="rounded-circle sub_init_img initiativeuserimage" ' +
      userProfileConcate +
      ' alt="' +
      username +
      '" width="50"></a></li>';
      
    $("#" + imageElement).html("");
    $("#" + imageElement).html(subinitiativeUser);
    $(".initiativeuserimage").initial({
      charCount: 2,
      height: 30,
      width: 30,
      fontSize: 18,
    });
  }
});


function adddefaultparentElement(InitiativeID) {
  var ischecked = "checked";
  var users = topparentinitiativeDetails;
  
  $(".subuserinitiativeimage").initial({
    charCount: 2,
    height: 30,
    width: 30,
    fontSize: 18,
  });
  
  var username =
    users.name == undefined || users.name == "" ? "User" : users.name;
  var userProfileConcate =
    users.image == undefined || users.image == ""
      ? "data-name='" +
        username +
        ' class="rounded-circle subuserinitiativeimage" '
      : "src='" + users.image + "'";
      
  return (
    '<div class="d-flex flex-row employe_content_border sub_initiative_details"><div class="d-flex flex-column flex-fill profile_content"><div class="d-flex flex-row"><div class="form-check"><label class="form-check-label"><input id="" class="form-check-input" name="activities_owner" ' + // 👈 CHANGED: name without []
    ischecked +
    ' type="radio" value="' + // 👈 CHANGED: type="radio"
    users.id +
    '"><span class="form-check-sign"> <span class="check"></span></span></label></div><div class="d-flex flex-column init_flex_profile" style="margin-top: 3%;text-align: center;"><h5>' +
    users.title +
    '</h5></div><div class="img_details subuserinitiativeimage" style="width: 20%;"><img alt="' +
    username +
    '" ' +
    userProfileConcate +
    ' hill="" class="rounded-circle imgprofile"></div></div></div></div>'
  );
}

function handleinitiativeActivitiesuserevent(id, initiativeID, action) {
    var imageElement = "initiativeactivitieUser_" + id;
    var data = {};
    
    if (action == "edit") {
        if (!activitieseditpermission) {
            return false;
        }
        
        $("#activities-ini-box_view_users").html(
            '<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>'
        );
        $("#user_subview").removeClass();
        $("#user_subview").addClass("activities_add_user_popup_class_" + id);
        $("#activities_current_id").attr("data-activities_sub_current_id", id);
        $("#activities_current_id").attr("data-activities_parent_id", initiativeID);
        $("#activitiesuserajaxid").val(id);
        $("#activitiesparentajaxid").val(initiativeID);
        
        var orgId = localStorage.getItem("initiativeTypeOrg");
        var tag_url = (orgId != "3") ? "/stratroom/deptReporteeList" : "/stratroom/reporteeList";
        
        var previouslyAssignedEmpIds = [];
        
        // Fetch activity details to get previously assigned users
        $.ajax({
            url: "/stratroom/activities/" + id,
            async: false,
            success: function (result, status) {
                activitieschilds = result;
                
                if (result.activitiesMapDTOList && Array.isArray(result.activitiesMapDTOList)) {
                    result.activitiesMapDTOList.forEach(function(mapItem) {
                        if (mapItem.employeeProfilePos && mapItem.employeeProfilePos.empId) {
                            previouslyAssignedEmpIds.push(mapItem.employeeProfilePos.empId);
                        }
                    });
                }
                
                if (result.activitiesList && Array.isArray(result.activitiesList)) {
                    result.activitiesList.forEach(function(activity) {
                        if (activity.activitiesMapDTOList && Array.isArray(activity.activitiesMapDTOList)) {
                            activity.activitiesMapDTOList.forEach(function(mapItem) {
                                if (mapItem.employeeProfilePos && mapItem.employeeProfilePos.empId) {
                                    previouslyAssignedEmpIds.push(mapItem.employeeProfilePos.empId);
                                }
                            });
                        }
                    });
                }
                
                if (result.subInitiativesMapDTOList && Array.isArray(result.subInitiativesMapDTOList)) {
                    result.subInitiativesMapDTOList.forEach(function(mapItem) {
                        if (mapItem.empId) {
                            previouslyAssignedEmpIds.push(mapItem.empId);
                        }
                    });
                }
            },
            error: function(xhr, status, error) {
                console.error("Error fetching activity:", error);
            }
        });
        
        // Fetch user list and render radio buttons
        $.ajax({
            url: tag_url,
            async: false,
            success: function (result, status) {
                var subinitiativeUser = "";
                
                $.each(result, function (index, users) {
                    var username = users.name == undefined || users.name == "" ? "User" : users.name;
                    
                    var userProfileConcate = users.image == undefined || users.image == ""
                        ? "data-name='" + username + "' class='rounded-circle subuserinitiativeimage' "
                        : " class='rounded-circle' src='" + users.image + "'";
                    
                    // Check if user is in previously assigned list
                    var ischecked = "";
                    var userId = users.id.toString();
                    
                    var isFound = previouslyAssignedEmpIds.some(function(empId) {
                        return empId.toString() === userId;
                    });
                    
                    if (isFound) {
                        ischecked = "checked";
                    }
                    
                    // 🔥 CHANGED: type="radio" + name="activities_owner" (same name = single group)
                    subinitiativeUser +=
                        '<div class="list-group-item attendee">' +
                            '<div class="form-check cusom-check form-check-reverse">' +
                                '<input class="form-check-input asingle-select-radio" type="radio" name="activities_owner" ' + // 👈 Radio + singular name
                                        'id="attendses' + users.id + '" value="' + users.id + '" ' + ischecked + '>' +
                                '<label class="form-check-label" for="attendses' + users.id + '">' +
                                    '<span class="image">' +
                                        '<img ' + userProfileConcate + ' alt="' + users.name + '" width="18" height="18" >' +
                                    '</span>' +
                                    '<span class="name">' + users.name + '</span>' +
                                '</label>' +
                            '</div>' +
                        '</div>';
                });
                
                // Render the list
                $("#activities-ini-box_view_users").html(subinitiativeUser);
                
                // Initialize initials for avatars
                $(".subuserinitiativeimage").initial({
                    charCount: 2,
                    height: 30,
                    width: 30,
                    fontSize: 18,
                });
                
                // ✅ REMOVED: No manual uncheck logic needed - radio buttons handle this natively!
                // ✅ REMOVED: No change handler needed for single-selection enforcement
                
            },
            error: function(xhr, status, error) {
                console.error("Error fetching users:", error);
                $("#activities-ini-box_view_users").html("<p>Error loading users.</p>");
            }
        });
    }
}


$(document).on("change", ".asingle-select-radio", function () { // 👈 Changed from click to change
    var id = $("#activitiesuserajaxid").val();
    console.log(id, "id");
    var subInitiativeId = $("#activitiesparentajaxid").val();
    var action = "edit";
    var activitiesObj = { "id": "", "owner": "", "subInitiativeId": "", "initiativeId": "", "activitiesValue": "" };
    
    if (activitieschilds == undefined || activitieschilds == "" || activitieschilds.id == "") {
        return false;
    }

    subInitiativeId = (subInitiativeId != "" ? subInitiativeId : 0);
    activitiesObj.owner = (activitieschilds.owner == "" || activitieschilds.owner == undefined ? currentEmp : activitieschilds.owner);
    activitiesObj.initiativeId = activitieschilds.initiativeId;
    activitiesObj.subInitiativeId = activitieschilds.subInitiativeId;
    activitiesObj.createdBy = activitieschilds.createdBy;
    activitiesObj.activitiesValue = activitieschilds.activitiesValue;
    
    // 🔥 SIMPLIFIED: Radio buttons return single value directly
    var selectedOwner = $(".asingle-select-radio:checked").val();

    if (!selectedOwner) {
        activitiesObj.activitiesValue.multipleowners = currentEmp;
    } else {
        activitiesObj.activitiesValue.multipleowners = selectedOwner; // 👈 Single value, no join() needed
    }

    var methodType = 'put';
    activitiesObj.id = id;

    $.ajax({
        url: "/stratroom/activities/",
        type: methodType,
        async: false,
        contentType: "application/json",
        data: JSON.stringify(activitiesObj),
        success: function (data, status) {
            // $.notify("Updated Successfully");
        },
        error: function (msg, status) {
            if (!jQuery.isEmptyObject(msg.responseText)) {
                $.each(JSON.parse(msg.responseText), function (key, value) {
                    if (key == "exception") {
                        $.notify("Error:" + value, {
                            style: 'error',
                            className: 'graynotify'
                        });
                    }
                    if (key == "error") {
                        $.notify("Error:" + value, {
                            style: 'error',
                            className: 'graynotify'
                        });
                    }
                });
            }
        }
    });
});


$(document).on("click", "#clear-owner-selection", function() {
    $('.asingle-select-radio').prop('checked', false);
    // Optionally trigger the change handler to update backend
    $('.asingle-select-radio:checked').trigger('change');
});


function handleMileStonesEvent(id, mileStoneID, action) {
  var startdate = new Date();
  var enddate = new Date();
  if (
    parentInitiativedetails.initiativeValue.actualdaterange != undefined &&
    parentInitiativedetails.initiativeValue.actualdaterange != ""
  ) {
    var daterange = parentInitiativedetails.initiativeValue.actualdaterange;
    if (daterange.includes("-")) {
      var dateval = daterange.split("-");
      startdate = new Date(dateval[0]);
      enddate = new Date(dateval[1]);
    }
  } else {
    var daterange = parentInitiativedetails.initiativeValue.daterange;
    if (daterange.includes("-")) {
      var dateval = daterange.split("-");
      startdate = new Date(dateval[0]);
      enddate = new Date(dateval[1]);
    }
  }

  $("#milestone_start_end").datepicker({
    language: "en",
    minDate: startdate,
    maxDate: enddate,
    autoClose: true,
    position: "top left",
    todayButton: true,
    onSelect: function (fd) {
      // $('.datepickers-container').hide();
    },
  });

  $("#mileStonesForm input[name='initiativeID']").val(id);
  $("#mileStonesForm input[name='action']").val(action);
  if (action == "delete") {
    $("#deleterecordid").val(mileStoneID);
    $("#deleterecordtype").val("milestones");
    $("#deleteModalinitiative").modal("toggle");
    $(window).on("resize", function () {
      $(".modal:visible").each(alignModal);
    });
    $(".modal").on("shown.bs.modal", alignModal);
    return false;
  }
  $(".sub_milestone_popup").modal("toggle");
  $("#mileStonesForm").css("display", "none");
  $("#mileStonesForm").trigger("reset");
  if (action == "add") {
    $("#mileCreatedBy").html("");
    $("#mileCreatedByDate").html("");
    $("#mileUpdatedBy").html("");
    $("#mileUpdatedByDate").html("");
    $("#milstone_id_wrapper").css("display", "none");
    // when adding
    $("#mileStonesForm").css("display", "block");
  } else {
    // view and edit
    $("#milstone_id_wrapper").css("display", "block");
    $(".sub_milestone_popup #milestone_id").prop("disabled", true);
    if (action == "view") {
      $('#mileStonesForm input[type="text"]').prop("disabled", true);
      $('#mileStonesForm input[type="checkbox"]').prop("disabled", true);
      $("#mileStonesForm select").prop("disabled", true);
      $('#mileStonesForm button[value="Save"]').css("display", "none");
    }
    $.ajax({
      url: "/stratroom/milestones/" + mileStoneID,
      success: mileStonesSuccessCallback,
    });
  }
}
function handleattachmentsEvent(id, mileStoneID, action) {
  if (action == "delete") {
    $("#deleterecordid").val(mileStoneID);
    $("#deleterecordtype").val("attachments");
    $("#deleteModalinitiative").modal("toggle");
    $(window).on("resize", function () {
      $(".modal:visible").each(alignModal);
    });
    $(".modal").on("shown.bs.modal", alignModal);
    return false;
  }
}
function handleActivitiesEvent(id, activitiesId, action) {
  console.log(id, activitiesId,action,  "id, activitiesId");

  if(action == "edit"){
    $(".activityHeaderText").text("Edit Activities Description")
  }else {
    $(".activityHeaderText").text("Add Activities Description")
  }
  var startdate = new Date();
  var enddate = new Date();
  if (
    parentInitiativedetails.initiativeValue.actualdaterange != undefined &&
    parentInitiativedetails.initiativeValue.actualdaterange != ""
  ) {
    var daterange = parentInitiativedetails.initiativeValue.actualdaterange;
    if (daterange.includes("-")) {
      var dateval = daterange.split("-");
      startdate = new Date(dateval[0]);
      enddate = new Date(dateval[1]);
    }
  } else {
    var daterange = parentInitiativedetails.initiativeValue.daterange;
    if (daterange.includes("-")) {
      var dateval = daterange.split("-");
      startdate = new Date(dateval[0]);
      enddate = new Date(dateval[1]);
    }
  }

  $("#activities_start_end").datepicker({
    language: "en",
    minDate: startdate,
    maxDate: enddate,
    range: true,
    autoClose: true,
    position: "top left",
    todayButton: true,
    onSelect: function (fd) {
      // $('.datepickers-container').hide();
    },
  });

  $("#activitiesForm input[name='initiativeID']").val(id);
  getSubInitiativeName("#activitiesForm #subInitative_desc", id); // Pass `id`
  $("#activitiesForm input[name='action']").val(action);
  if (action == "delete") {
    $("#deleterecordid").val(activitiesId);
    $("#deleterecordtype").val("activities");
    $("#deleteModalinitiative").modal("toggle");
    $(window).on("resize", function () {
      $(".modal:visible").each(alignModal);
    });
    $(".modal").on("shown.bs.modal", alignModal);
    return false;
  }
  $(".sub_activities_popup").modal("toggle");
  $("#activitiesForm").css("display", "none");
  $("#activitiesForm").trigger("reset");

  if (action == "add") {
    $("#activCreatedBy").html("");
    $("#activCreatedByDate").html("");
    $("#activUpdatedBy").html("");
    $("#activUpdatedByDate").html("");
    $("#activities_id_wrapper").css("display", "none");
    // when adding
    $("#activitiesForm").css("display", "block");
  } else {
    // view and edit
    $("#activities_id_wrapper").css("display", "block");
    $(".sub_activities_popup #activities_id").prop("disabled", true);
    if (action == "view") {
      $('#activitiesForm input[type="text"]').prop("disabled", true);
      $('#activitiesForm input[type="checkbox"]').prop("disabled", true);
      $("#activitiesForm select").prop("disabled", true);
      $('#activitiesForm button[value="Save"]').css("display", "none");
    }
    $.ajax({
      url: "/stratroom/activities/" + activitiesId,
      success: activitiesSuccessCallback,
    });
  }
}

function handleTasksEvent(id, tasksID, action) {
  var startdate = new Date();
  var enddate = new Date();
  if (
    parentInitiativedetails.initiativeValue.actualdaterange != undefined &&
    parentInitiativedetails.initiativeValue.actualdaterange != ""
  ) {
    var daterange = parentInitiativedetails.initiativeValue.actualdaterange;
    if (daterange.includes("-")) {
      var dateval = daterange.split("-");
      startdate = new Date(dateval[0]);
      enddate = new Date(dateval[1]);
    }
  } else {
    var daterange = parentInitiativedetails.initiativeValue.daterange;
    if (daterange.includes("-")) {
      var dateval = daterange.split("-");
      startdate = new Date(dateval[0]);
      enddate = new Date(dateval[1]);
    }
  }

  $("#tasks_start_end").datepicker({
    language: "en",
    minDate: startdate,
    maxDate: enddate,
    autoClose: true,
    position: "top left",
    todayButton: true,
    onSelect: function (fd) {
      // $('.datepickers-container').hide();
    },
  });

  $("#tasksForm input[name='initiativeID']").val(id);
  $("#tasksForm input[name='action']").val(action);
  if (action == "delete") {
    $("#deleterecordid").val(tasksID);
    $("#deleterecordtype").val("tasks");
    $("#deleteModalinitiative").modal("toggle");
    $(window).on("resize", function () {
      $(".modal:visible").each(alignModal);
    });
    $(".modal").on("shown.bs.modal", alignModal);
    return false;
  }
  $(".sub_tasks_popup").modal("toggle");
  $("#tasksForm").css("display", "none");
  $("#tasksForm").trigger("reset");
  if (action == "add") {
    $("#tasksCreatedBy").html("");
    $("#tasksCreatedByDate").html("");
    $("#tasksUpdatedBy").html("");
    $("#tasksUpdatedByDate").html("");
    $("#tasks_id_wrapper").css("display", "none");
    // when adding
    $("#tasksForm").css("display", "block");
  } else {
    // view and edit
    $("#tasks_id_wrapper").css("display", "block");
    $(".sub_tasks_popup #tasks_id").prop("disabled", true);
    if (action == "view") {
      $('#tasksForm input[type="text"]').prop("disabled", true);
      $('#tasksForm input[type="checkbox"]').prop("disabled", true);
      $("#tasksForm select").prop("disabled", true);
      $('#tasksForm button[value="Save"]').css("display", "none");
    }
    $.ajax({
      url: "/stratroom/initiativeTask/" + tasksID,
      success: tasksSuccessCallback,
    });
  }
}

function handleSubActivitiesEvent(id, activitiesId, action) {
  console.log(id, activitiesId, "id, activitiesId");
  var startdate = new Date();
  var enddate = new Date();
  if (
    parentInitiativedetails.initiativeValue.actualdaterange != undefined &&
    parentInitiativedetails.initiativeValue.actualdaterange != ""
  ) {
    var daterange = parentInitiativedetails.initiativeValue.actualdaterange;
    if (daterange.includes("-")) {
      var dateval = daterange.split("-");
      startdate = new Date(dateval[0]);
      enddate = new Date(dateval[1]);
    }
  } else {
    var daterange = parentInitiativedetails.initiativeValue.daterange;
    if (daterange.includes("-")) {
      var dateval = daterange.split("-");
      startdate = new Date(dateval[0]);
      enddate = new Date(dateval[1]);
    }
  }

  $("#subactivities_start_end").datepicker({
    language: "en",
    minDate: startdate,
    maxDate: enddate,
    range: true,
    autoClose: true,
    position: "top left",
    todayButton: true,
    onSelect: function (fd) {
      // $('.datepickers-container').hide();
    },
  });

  $("#subActivitiesForm input[name='activitiesID']").val(activitiesId);
  $("#subActivitiesForm input[name='subinitiativeID']").val(id);
  $("#activCreatedBy").html("");
  $("#activCreatedByDate").html("");
  $("#activUpdatedBy").html("");
  $("#activUpdatedByDate").html("");
  $("#subactivities_id_wrapper").css("display", "none");
  // when adding
  $("#subActivitiesForm").css("display", "block");
}
function UpdateSubActivitiesEvent(id, activitiesId, action) {
  console.log(id, activitiesId, "id, activitiesId");
  var startdate = new Date();
  var enddate = new Date();
  if (
    parentInitiativedetails.initiativeValue.actualdaterange != undefined &&
    parentInitiativedetails.initiativeValue.actualdaterange != ""
  ) {
    var daterange = parentInitiativedetails.initiativeValue.actualdaterange;
    if (daterange.includes("-")) {
      var dateval = daterange.split("-");
      startdate = new Date(dateval[0]);
      enddate = new Date(dateval[1]);
    }
  } else {
    var daterange = parentInitiativedetails.initiativeValue.daterange;
    if (daterange.includes("-")) {
      var dateval = daterange.split("-");
      startdate = new Date(dateval[0]);
      enddate = new Date(dateval[1]);
    }
  }

  $("#editsubactivities_start_end").datepicker({
    language: "en",
    minDate: startdate,
    maxDate: enddate,
    range: true,
    autoClose: true,
    position: "top left",
    todayButton: true,
    onSelect: function (fd) {
      // $('.datepickers-container').hide();
    },
  });

  $("#editsubActivitiesForm input[name='editactivitiesID']").val(activitiesId);
  $("#editsubActivitiesForm input[name='editsubinitiativeID']").val(id);
  $("#activCreatedBy").html("");
  $("#activCreatedByDate").html("");
  $("#activUpdatedBy").html("");
  $("#activUpdatedByDate").html("");
  $("#subactivities_id_wrapper").css("display", "none");
  // when adding
  $("#subActivitiesForm").css("display", "block");

  $.ajax({
    url: "/stratroom/subactivities/" + activitiesId,
    method: "GET",
    success: function (activitiesData, status) {
      console.log(activitiesData, "activitiesData");
      $("#editsubinitiativeID").val(activitiesData.initiativeId);
      $("#editsubactivities_id").val(activitiesData.id);
      $("#editsubactivities_hidden_id").val(activitiesData.activitieId);
      $("#editsubactivities_desc").val(activitiesData.activitiesValue.desc);
      $("#editsubactivities_name").val(activitiesData.activitiesValue.name);
      $("#editsubactivities_status").val(activitiesData.activitiesValue.status);
      $("#editsubactivities_progress").val(
        activitiesData.activitiesValue.progress
      );
      $("#editsubactivities_start_end").val(
        activitiesData.activitiesValue.dateRange
      );
      $("#editsubactivities_budget").val(activitiesData.activitiesValue.budget);
      $("#editsubactivities_Actual").val(activitiesData.activitiesValue.actual);
      $("#editactivCreatedById").val(activitiesData.createdBy);
      $("#editactivCreatedBy").html(
        activitiesData.activitiesValue.createdByName
      );
      $("#editactivUpdatedBy").html(
        activitiesData.activitiesValue.updatedByName
      );
      $("#editactivCreatedByDate").html(activitiesData.createDateString);
      $("#editactivUpdatedByDate").html(activitiesData.updatedDateString);
    },
    error: readErrorMsg,
  });
}
function deleteSubActivitiesEvent(id, activitiesId, action) {
  console.log(id, activitiesId, "id, activitiesId");

  $("#subactivityID").val(activitiesId);
  $("#subactivity_delete_popup").modal("toggle");
  $(window).on("resize", function () {
    $(".modal:visible").each(alignModal);
  });
  $(".modal").on("shown.bs.modal", alignModal);
  return false;
}
function deleteSubActivities(event) {
  event.preventDefault();
  var deleteId = $("#subactivityID").val();
  console.log(deleteId, "deleteId");
  $.ajax({
    url: "/stratroom/subactivities/" + deleteId,
    type: "DELETE",
    contentType: "application/json",
    success: function (data, status) {
      location.reload(true);
    },
    error: readErrorMsg,
  });
}
function handleSubActivitiesSave(event) {
  event.preventDefault();
  var subActivitiesObj = {
    createdBy: ($("#userPrincipal").val() || "").trim(),
    owner: ($("#userPrincipal").val() || "").trim(),
    activitieId: $("#activitiesID").val(),
    activitiesValue: {
      name: "", //$("#activities_name").val()
      progress: $("#subactivities_progress").val(),
      desc: $("#subactivities_desc").val(),
      status: $("#subactivities_status").val(),
      dateRange: $("#subactivities_start_end").val(),
      budget: $("#subactivities_budget").val(),
      actual: $("#subactivities_Actual").val(),
    },
  };
  console.log(subActivitiesObj, "subActivitiesObj");
  $.ajax({
    url: "/stratroom/subactivities",
    type: "post",
    contentType: "application/json",
    data: JSON.stringify(subActivitiesObj),
    success: function (data, status) {
      location.reload(true);
    },
    error: readErrorMsg,
  });
}
function editSubActivitiesSave(event) {
  event.preventDefault();
  var editsubActivitiesObj = {
    createdBy: ($("#userPrincipal").val() || "").trim(),
    owner: ($("#userPrincipal").val() || "").trim(),
    id: $("#editsubactivities_id").val(),
    activitieId: $("#editsubactivities_hidden_id").val(),
    activitiesValue: {
      name: "", //$("#activities_name").val()
      progress: $("#editsubactivities_progress").val(),
      desc: $("#editsubactivities_desc").val(),
      status: $("#editsubactivities_status").val(),
      dateRange: $("#editsubactivities_start_end").val(),
      budget: $("#editsubactivities_budget").val(),
      actual: $("#editsubactivities_Actual").val(),
    },
  };
  console.log(editsubActivitiesObj, "editsubActivitiesObj");
  $.ajax({
    url: "/stratroom/subactivities",
    type: "put",
    contentType: "application/json",
    data: JSON.stringify(editsubActivitiesObj),
    success: function (data, status) {
      location.reload(true);
    },
    error: readErrorMsg,
  });
}
function handleCommentsSave(initiativeID, commentId, action) {
  if (action == "delete") {
    $("#deleterecordid").val(commentId);
    $("#deleterecordtype").val("comments");
    $("#deleteModalinitiative").modal("toggle");

    $(window).on("resize", function () {
      $(".modal:visible").each(alignModal);
    });
    $(".modal").on("shown.bs.modal", alignModal);
  } else {
    var commentsObj = {
      commentsParendId: 0,
      initiativeId: initiativeID,
      commentsValue: {
        desc: $("#comments_Form input[name='comments']").val(),
      },
    };
    var methodType = "post";
    if (action == "add") {
      if (
        $("#comments_Form input[name='comments']").val() == "" ||
        $("#comments_Form input[name='comments']").val() == "'"
      ) {
        $.notify("Error: Enter some comments", {
          style: "error",
          className: "graynotify",
        });
        return false;
      }
    } else if (action == "edit") {
      commentsObj["id"] = $("#initiaties_comments_id").val();
      commentsObj["initiativeId"] = $("#initiaties_comments_initiatieid").val();
      commentsObj["commentsValue"]["desc"] = $("#initiaties_Comments").val();
      methodType = "put";
    }

    $.ajax({
      url: "/stratroom/comments/",
      type: methodType,
      contentType: "application/json",
      data: JSON.stringify(commentsObj),
      success: function (data, status) {
        //$("#comments_Form").css('display', 'none');
        location.reload(true);
        console.log("New comments was created..");
      },
    });
  }
}
$(document).on("click", ".initiativecommentReply", function () {
  var initiativecommentId = $(this).data("id"); // Get the comment ID from data-id

  // Show the reply section
  $("#initiativeCommentsBlock").toggle();
  $("#initiativeCommentsReplyBLock").toggle();

  // Set the data-id of the reply input to the comment ID
  $("#commentsreply").attr("data-id", initiativecommentId);
});

function handleReplyCommentsSave(initiativecommentId, action) {
  var desc = $("#commentsreply").val();
  if (desc.trim() === "") {
    $.notify("Error: Enter some comments", {
      style: "error",
      className: "graynotify",
    });
    return false;
  }

  // Retrieve the initiativecommentId from the input field
  var replyId = $("#commentsreply").data("id");

  // Construct the object to be sent in the request
  var replyCommentsObj = {
    commentsParendId: replyId, // Use the reply ID here
    initiativeId: initiativecommentId,
    commentsValue: {
      desc: desc,
    },
  };

  // Make the AJAX request
  $.ajax({
    url: "/stratroom/comments/",
    type: "post",
    contentType: "application/json",
    data: JSON.stringify(replyCommentsObj),
    success: function (data, status) {
      localStorage.setItem("reload", "1");
      window.location.reload(true);
      console.log("New reply was created.");
    },
  });
}

function handleReplyCommentsUpdate(event) {
  event.preventDefault();

  var replyCommentsObj = {
    initiativeId: $("#initiaties_comments_initiatieid").val(),
    id: $("#initiaties_commentsreply_id").val(),
    commentsValue: {
      desc: $("#initiaties_Commentsreply").val(),
    },
  };

  // Determine the HTTP method type based on action
  var methodType = "put";

  // Make the AJAX request
  $.ajax({
    url: "/stratroom/comments/",
    type: methodType,
    contentType: "application/json",
    data: JSON.stringify(replyCommentsObj),
    success: function (data, status) {
      localStorage.setItem("reload", "1");
      window.location.reload(true);
      console.log("New comments were created.");
    },
  });
}
function initiativechartviewdetails(id) {
  var parentinitiativeId = $('input[name="parentinitiativeId"]').val();
  $("#chart_modal").html("");
  $("#chart_modal").html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
  $.ajax({
    url: "/stratroom/initiatives/" + parentinitiativeId + "?loadFlag=true",
    success: initiativedsubChartSuccessCallback,
  });
}

function dateformatyymmdd(newdate) {
  var dt = new Date(newdate);
  var mm = dt.getMonth() + 1;
  var dd = dt.getDate();
  var yyyy = dt.getFullYear();
  return yyyy + "-" + mm + "-" + dd;
}

function ganttstopEvent(e) {
  e.stopImmediatePropagation();
  e.preventDefault();
}

// ----------------- Label Formatters (new design) -----------------
function formatMonthLabels(chartElement) {
  const container = document.querySelector(chartElement);
  const lowerTexts = container.querySelectorAll(".lower-text");
  const monthYLabels = container.querySelectorAll(".upper-text");

  monthYLabels.forEach((label) => {
    const currentY = parseFloat(label.getAttribute("y") || "0");
    label.setAttribute("y", currentY - 18);
  });

  lowerTexts.forEach((label, index) => {
    const baseDate = new Date(gantt.gantt_start);
    const displayDate = new Date(
      baseDate.setMonth(baseDate.getMonth() + index)
    );

    const month = displayDate.toLocaleDateString("en-US", { month: "short" });
    const year = displayDate.getFullYear();

    const x = label.getAttribute("x");
    const y = parseFloat(label.getAttribute("y") || "0");
    label.setAttribute("y", y - 15);
    label.setAttribute("text-anchor", "middle");

    label.innerHTML = `${month}<tspan x="${x}" dy="1.2em" class="gantt-month-year">${year}</tspan>`;
  });
}

function formatDayLabels(chartElement) {
  const container = document.querySelector(chartElement);
  const dayLabels = container.querySelectorAll(".lower-text");
  const dayMLabels = container.querySelectorAll(".upper-text");

  const ganttStart = new Date(gantt.gantt_start);
  let lastMonth = -1;
  let upperLabelIndex = 0;

  dayLabels.forEach((label, index) => {
    const labelDate = new Date(ganttStart);
    labelDate.setDate(labelDate.getDate() + index);

    const weekday = labelDate.toLocaleDateString("en-US", { weekday: "short" });
    const dateNum = labelDate.getDate();
    const x = label.getAttribute("x");
    const y = parseFloat(label.getAttribute("y") || "0");

    label.setAttribute("y", y - 18);
    label.setAttribute("text-anchor", "middle");
    label.innerHTML = `${weekday}<tspan x="${x}" dy="1.5em" class="gantt-day-date">${dateNum}</tspan>`;

    const month = labelDate.getMonth();
    if (month !== lastMonth && upperLabelIndex < dayMLabels.length) {
      const upperLabel = dayMLabels[upperLabelIndex];
      const yUpper = parseFloat(upperLabel.getAttribute("y") || "0");
      upperLabel.setAttribute("y", yUpper - 18);
      upperLabel.textContent = labelDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });

      lastMonth = month;
      upperLabelIndex++;
    }
  });
}

function formatWeekLabels(chartElement) {
  const container = document.querySelector(chartElement);
  const weekLabels = container.querySelectorAll(".lower-text");
  const svg = container.querySelector("svg");

  const existingMonthLabels = container.querySelectorAll(".upper-text");
  existingMonthLabels.forEach((label) => label.remove());

  let lastMonth = "";
  const baseDate = new Date(gantt.gantt_start);

  weekLabels.forEach((label, index) => {
    const weekDate = new Date(gantt.gantt_start);
    weekDate.setDate(baseDate.getDate() + index * 7);

    const weekday = weekDate.toLocaleDateString("en-US", { weekday: "short" });
    const dayMonth = weekDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });

    const x = label.getAttribute("x");
    const y = parseFloat(label.getAttribute("y") || "0");
    label.setAttribute("y", y - 15);
    label.setAttribute("text-anchor", "middle");
    label.innerHTML = `
      ${weekday}
      <tspan x="${x}" dy="1.2em" class="gantt-week-date">${dayMonth}</tspan>
    `;

    const monthYear = `${weekDate.toLocaleDateString("en-US", {
      month: "long",
    })} ${weekDate.getFullYear()}`;
    if (monthYear !== lastMonth) {
      lastMonth = monthYear;
      const monthText = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      monthText.setAttribute("x", x);
      monthText.setAttribute("y", y - 40);
      monthText.setAttribute("text-anchor", "middle");
      monthText.setAttribute("class", "gantt-month-label");
      monthText.textContent = monthYear;
      svg.appendChild(monthText);
    }
  });
}

// ----------------- Enforce Min Bar Width (new design) -----------------
function enforceMinBarWidth(chartElement, minWidth = 100) {
  const container = document.querySelector(chartElement);
  if (!container) return;

  const bars = container.querySelectorAll(".bar-group");

  bars.forEach((group, index) => {
    const bar = group.querySelector("rect.bar");
    const progress = group.querySelector("rect.bar-progress");
    const label = group.querySelector("text.bar-label");

    if (!bar) return;

    const originalWidth = parseFloat(bar.getAttribute("width") || "0");
    if (originalWidth < minWidth) {
      bar.setAttribute("width", minWidth);

      if (progress) {
        const progressWidth = parseFloat(progress.getAttribute("width") || "0");
        const ratio = progressWidth / (originalWidth || 1);
        const progressValue = gantt.tasks[index]?.progress || 0;

        let minProgressWidth = 0;
        if (progressValue > 0 && progressValue <= 20) {
          minProgressWidth = 20;
        } else if (progressValue > 20) {
          minProgressWidth = ratio * minWidth;
        }

        progress.setAttribute(
          "width",
          Math.max(ratio * minWidth, minProgressWidth)
        );
      }

      const x = parseFloat(bar.getAttribute("x") || "0");
      if (label) {
        label.setAttribute("x", x + minWidth + 5);
      }
    }
  });
}
// Render template with Mustache
function renderInitiativeTemplate(initdetail) {
  const template = document.getElementById("chart-template").innerHTML;
  const rendered = Mustache.render(template, initdetail);
  document.getElementById("chartdiv_ini").innerHTML = rendered;

  // Call chart after template is inserted
  initiativegrattChart(
    initdetail,
    initdetail.result,
    initdetail.progress,
    "initiativeview",
    initdetail.activitiesChart
  );
}

// --- ADD THIS HELPER FUNCTION FIRST (outside initiativegrattChart) ---
function formatDayLabels(chartElement) {
  const container = document.querySelector(chartElement);
  if (!container) return;

  // Adjust selectors based on your Gantt's actual DOM structure
  // These are common in frappe-gantt or similar
  const upperHeader = container.querySelector('.upper-header');
  const lowerHeaderCells = container.querySelectorAll('.lower-header .header-cell');

  if (upperHeader) {
    // Hide month/year row in Day view for cleaner look
    upperHeader.style.display = 'none';
  }

  if (lowerHeaderCells.length > 0) {
    lowerHeaderCells.forEach(cell => {
      const text = cell.textContent.trim();
      if (!text) return;

      // Extract day number from formats like:
      // "Mon, Jan 1" → "1"
      // "Jan 1" → "1"
      // "1" → "1"
      let dayNumber = '';
      const match = text.match(/\b(\d{1,2})\b/); // Match standalone 1 or 2-digit number
      if (match) {
        dayNumber = match[1];
      } else {
        dayNumber = text; // fallback
      }
      cell.textContent = dayNumber;
    });
  }
}

// Optional: define stubs if not already defined (to prevent errors)
window.formatMonthLabels = window.formatMonthLabels || function() {};
window.formatWeekLabels = window.formatWeekLabels || function() {};
window.enforceMinBarWidth = window.enforceMinBarWidth || function() {};
window.ganttstopEvent = window.ganttstopEvent || function(e) { e.stopPropagation(); };

// --- MAIN FUNCTION ---
function initiativegrattChart(
  initdetail,
  result,
  progressvalue,
  initiativeviewtype,
  activitiesChart,
  viewMode = "Month"
) {

  console.log(result, "result")
  var chartdata = [];
  var initiativeganttchart = []; // For table
  var parentchartfromdate = "";
  var parentcharttodate = "";
  var chartElement = "";

  // ---------------- Build Chart Header + Options ----------------
  var chartHeader = initdetail.chartHeader;
  var subInitiativeOptions = "";
  if (!(initiativedeletepermission == false && initiativeviewpermission == false)) {
    subInitiativeOptions = `<div class="dropdown">
      <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis-vertical" style="width: 14px; height: 14px;" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
      </button>
      <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;
    if (initiativeviewpermission) {
      subInitiativeOptions += `<li>
        <a class="dropdown-item" href=".chart_view_popup" data-bs-toggle="modal" onclick="initiativechartviewdetails();">
          ${viewHeader}
        </a>
      </li>`;
    }
    subInitiativeOptions += `</ul></div>`;
  }

  var chartinlineEditIcon = `<strong id="chartHeader" data-oldchartHeader="${chartHeader}">${chartHeader}</strong>`;
  if (initiativeeditpermission) {
    chartinlineEditIcon = `<strong class="editableTxt1" onkeypress="return (this.innerText.length <= 25)"
      id="chartHeader" data-oldchartHeader="${chartHeader}" editable="true">${chartHeader}</strong>`;
  }

  // ---------------- Render Mustache Template ----------------
  var chartTemplate = document.getElementById("chart-template").innerHTML;
  var chartTemplateDetails = Mustache.render(chartTemplate, {
    chartHeader: chartHeader,
    subInitiativeOptions: subInitiativeOptions,
    chartinlineEditIcon: chartinlineEditIcon,
    id: initdetail.id,
  });

  if (initiativeviewtype === "initiativeview") {
    $("#chartdiv_ini").html(chartTemplateDetails);
    chartElement = "#chartdiv_" + initdetail.id;
  } else {
    $("#chart_modal").html(chartTemplateDetails);
    chartElement = "#chart_modal";
  }

  // ---------------- Parse Main Initiative Dates ----------------
  var startdate, enddateformatted;
  if (initdetail.intiativedaterange && initdetail.intiativedaterange.includes("-")) {
    var [startStr, endStr] = initdetail.intiativedaterange.split("-");
    startdate = new Date(startStr);
    enddateformatted = new Date(endStr);
    parentchartfromdate = dateformatyymmdd(startdate);
    parentcharttodate = dateformatyymmdd(enddateformatted);
  }

  let taskCounter = 0;

  // ---------------- Main Initiative ----------------
  const mainTaskId = "Task " + taskCounter++;
  chartdata.push({
    custom_class: "initiatives-gantt-color",
    name: initdetail.title,
    start: parentchartfromdate,
    end: parentcharttodate,
    progress: progressvalue,
    budget: initdetail.budgetValue || "",
    utillized: initdetail.totalutilized || "",
    balance: initdetail.totalbalance || "",
    id: mainTaskId,
    dependencies: "",
    diffdays: initdetail.diffdays,
  });

  initiativeganttchart.push({
    name: initdetail.title,
    start: dateFormatedtohumanread(startdate),
    end: dateFormatedtohumanread(enddateformatted),
    progress: progressvalue,
    budget: initdetail.budgetValue || "",
    utillized: initdetail.totalutilized || "",
    balance: initdetail.totalbalance || "",
    id: mainTaskId,
    owner: initdetail.Owner || "",
    multiple: [],
  });

  // ---------------- Sub Initiatives ----------------
  $.each(result.subInitiativeList, function (_, chartactivities) {
    const subId = "Task " + taskCounter++;
    var datestring = chartactivities.subInitiativeValue.dateRange;
    var chartprogress = chartactivities.subInitiativeValue.progressval || 0;
    var daysremaining = "0";
    var chartfromdate = "", charttodate = "";

    if (datestring && datestring.includes("-")) {
      var [s, e] = datestring.split("-");
      var subStart = new Date(s);
      var subEnd = new Date(e);
      chartfromdate = dateformatyymmdd(subStart);
      charttodate = dateformatyymmdd(subEnd);

      var days = (subEnd - new Date()) / (1000 * 60 * 60 * 24);
      if (days > 0) daysremaining = Math.round(days).toString();
    }

    var budgetValue = "", utilizedcurrency = "", balancecurrency = "";
    if (chartactivities.subInitiativeValue.budgetValue != null) {
      var res = specialcharsconvertToNumberFormat(chartactivities.subInitiativeValue.budgetValue);
      budgetValue = res.currency + intergerHumanFormat(res.number);
    }
    if (chartactivities.subInitiativeValue.Utillized != null) {
      var res = specialcharsconvertToNumberFormat(chartactivities.subInitiativeValue.Utillized);
      utilizedcurrency = chartactivities.subInitiativeValue.utilizedCurr + intergerHumanFormat(res.number);
    }
    if (chartactivities.subInitiativeValue.Balance != null) {
      var res = specialcharsconvertToNumberFormat(chartactivities.subInitiativeValue.Balance);
      balancecurrency = chartactivities.subInitiativeValue.BalCurr + intergerHumanFormat(res.number);
    }

    chartdata.push({
      custom_class: "subinitiatives-gantt-color",
      name: chartactivities.subInitiativeValue.description,
      start: chartfromdate,
      end: charttodate,
      progress: chartprogress,
      budget: budgetValue,
      utillized: utilizedcurrency,
      balance: balancecurrency,
      id: subId,
      dependencies: mainTaskId,
      diffdays: daysremaining + " days",
    });

    var Owner = chartactivities.subInitiativeValue.createdByName || chartactivities.subInitiativeValue.ownerName;
    if (lookup) {
      var name = lookup[chartactivities.createdBy + "name"] || Owner;
      var img = lookup[chartactivities.createdBy + "image"];
      Owner = img ? `src="${img}"` : `data-name="${name}"`;
    }

    initiativeganttchart.push({
      name: chartactivities.subInitiativeValue.description,
      start: dateFormatedtohumanread(new Date(datestring.split("-")[0])),
      end: dateFormatedtohumanread(new Date(datestring.split("-")[1])),
      progress: chartprogress,
      budget: budgetValue,
      utillized: utilizedcurrency,
      balance: balancecurrency,
      id: subId,
      owner: Owner,
      multiple: chartactivities.subInitiativesMapDTOList || [],
    });
  });

  // ---------------- Activities (initiative view only) ----------------
  if (initiativeviewtype === "initiativeview") {
    $.each(activitiesChart, function (_, act) {
      const activityId = "Task " + taskCounter++;
      var actStart = new Date(act.start);
      var actEnd = new Date(act.end);
      var actFrom = dateformatyymmdd(actStart);
      var actTo = dateformatyymmdd(actEnd);

      chartdata.push({
        custom_class: "activities-gantt-color",
        name: act.name,
        start: actFrom,
        end: actTo,
        progress: act.progress || 0,
        id: activityId,
        dependencies: mainTaskId,
      });

      initiativeganttchart.push({
        name: act.name,
        start: dateFormatedtohumanread(actStart),
        end: dateFormatedtohumanread(actEnd),
        progress: act.progress || 0,
        budget: "",
        utillized: "",
        balance: "",
        id: activityId,
        owner: "",
        multiple: [],
      });
    });
  }

  // ---------------- Milestones ----------------
  $.each(result.mileStonesList, function (_, chartactivities) {
    const milestoneId = "Task " + taskCounter++;
    var datestring = chartactivities.mileStonesValue.dateRange;
    var chartprogress = chartactivities.mileStonesValue.progress || 0;
    var charttodate = "";

    if (datestring && datestring.includes("-")) {
      var endDate = new Date(datestring.split("-")[1]);
      charttodate = dateformatyymmdd(endDate);
    } else {
      charttodate = dateformatyymmdd(new Date(datestring));
      var endDate = new Date(datestring);
    }

    var budgetValue = "", utilizedcurrency = "", balancecurrency = "";
    if (chartactivities.mileStonesValue.budgetValue != null) {
      var res = specialcharsconvertToNumberFormat(chartactivities.mileStonesValue.budgetValue);
      budgetValue = res.currency + intergerHumanFormat(res.number);
    }
    if (chartactivities.mileStonesValue.Utillized != null) {
      var res = specialcharsconvertToNumberFormat(chartactivities.mileStonesValue.Utillized);
      utilizedcurrency = chartactivities.mileStonesValue.utilizedCurr + intergerHumanFormat(res.number);
    }
    if (chartactivities.mileStonesValue.Balance != null) {
      var res = specialcharsconvertToNumberFormat(chartactivities.mileStonesValue.Balance);
      balancecurrency = chartactivities.mileStonesValue.BalCurr + intergerHumanFormat(res.number);
    }

    chartdata.push({
      custom_class: "subinitiatives-gantt-color",
      name: chartactivities.mileStonesValue.desc,
      start: charttodate,
      end: charttodate,
      progress: chartprogress,
      budget: budgetValue,
      utillized: utilizedcurrency,
      balance: balancecurrency,
      id: milestoneId,
      dependencies: mainTaskId,
      diffdays: "0 days",
    });

   var Owner = chartactivities.mileStonesValue.createdByName || chartactivities.mileStonesValue.ownerName || "";

if (lookup) {
  // Try to get the lookup name or fallback to Owner
  var name = lookup[chartactivities.createdBy + "name"] || chartactivities.mileStonesValue.ownerName || Owner;

  // Try to get the image from lookup
  var img = lookup[chartactivities.createdBy + "image"];

  // Use image if exists, else fallback to data-name
  Owner = img ? `src="${img}"` : `data-name="${name}"`;
} else {
  // If no lookup, use Owner directly
  Owner = `data-name="${Owner}"`;
}


    
    initiativeganttchart.push({
      name: chartactivities.mileStonesValue.desc,
      start: dateFormatedtohumanread(endDate),
      end: dateFormatedtohumanread(endDate),
      progress: chartprogress,
      budget: budgetValue,
      utillized: utilizedcurrency,
      balance: balancecurrency,
      id: milestoneId,
      owner: Owner,
      multiple: chartactivities.subInitiativesMapDTOList || [],
    });
  });

  // ---------------- Build Table HTML ----------------
  var chartrow = "";
  var parentID = 1;

  function formatOwnerImage(ownerVal, fallbackName = "") {
    console.log()
    let tag = '<img ';
    if (!ownerVal) {
      tag += `class="ganttimagecircle rounded-circle sub_init_img" data-name="${fallbackName}"`;
    } else if (typeof ownerVal === "string") {
      if (ownerVal.includes("src=")) {
        tag += ownerVal;
      } else {
        tag += `class="ganttimagecircle rounded-circle sub_init_img" ${ownerVal}`;
      }
    } else {
      tag += `class="ganttimagecircle rounded-circle sub_init_img" data-name="${fallbackName}"`;
    }
    return tag + ' width="24px" height="24px" style="border-radius: 50%;" alt="Owner"/>';
  }

  $.each(initiativeganttchart, function (_, item) {
    console.log(item, "itemData");
    let ownerTag = formatOwnerImage(item.owner, item.name);
    let childRows = "";

    if (item.multiple && item.multiple.length) {
      let childID = (parentID + 0.1).toFixed(1);
      $.each(item.multiple, function (_, child) {
        let fullName = (child.employeeProfilePos?.firstName || "") + (child.employeeProfilePos?.lastName || "");
        let title = child.employeeProfilePos?.title || item.name;
        let img = child.employeeProfilePos?.profileImage;
        let childImgTag = img
        
          ? `<img  class="rounded-circle sub_init_img" src="${img}" width="24px" height="24px" style="border-radius: 50%;" alt="${fullName}"/>`
          : `<img data-name="${fullName}" class="rounded-circle ganttuserimage" width="24px" height="24px" style="border-radius: 50%;" alt="${fullName}"/>`;

        childRows += `<tr data-tt-id="${childID}" data-tt-parent-id="${parentID}">
          <td>${title}</td>
          <td class="text-center text-nowrap">${item.start}</td>
          <td class="text-center text-nowrap">${item.end}</td>
          <td class="text-center">${childImgTag}</td>
        </tr>`;
        childID = (parseFloat(childID) + 0.1).toFixed(1);
      });
    }

    chartrow += `<tr data-tt-id="${parentID}">
      <td class="" style="text-align: left;">${item.name}</td>
      <td class="text-center text-nowrap">${item.start}</td>
      <td class="text-center text-nowrap">${item.end}</td>
      <td class="text-center text-nowrap">${ownerTag}</td>
    </tr>${childRows}`;
    parentID++;
  });

  var tableHtml = `
    <div class="table-responsive">
      <table id="example-basic" class="table table-bordered treetable w-100">
        
        <tbody>${chartrow}</tbody>
      </table>
    </div>`;

  if (initiativeviewtype === "initiativeview") {
    const chartContainer = $(chartElement).closest(".chart-container");
    if (chartContainer.length) {
      chartContainer.find(".gantt-table-placeholder").html(tableHtml);
    } else {
      console.warn("No .gantt-table-placeholder found for initiative view");
    }
  } else {
    $("#ganttchart_table").html(tableHtml);
  }

  // ---------------- Render Gantt ----------------
  const container = document.querySelector(chartElement);
  if (!container) {
    console.warn("⚠️ Gantt container not found:", chartElement);
    return;
  }
  container.innerHTML = "";

  gantt = new Gantt(chartElement, chartdata, {
    header_height: initiativeviewtype === "initiativeview" ? 70 : 50,
    column_width: initiativeviewtype === "initiativeview" ? 100 : 15,
    step: 24,
    view_modes: ["Quarter Day", "Half Day", "Day", "Week", "Month"],
    bar_height: initiativeviewtype === "initiativeview" ? 18 : 30,
    bar_corner_radius: 10,
    arrow_curve: 5,
    padding: 20,
    view_mode: viewMode,
    date_format: "MMM-DD",
    popup_trigger: "false",
    on_click: () => {},
    on_date_change: () => {},
    on_progress_change: () => {},
    // 🔥 CRITICAL FIX: use the ACTUAL new view mode passed as argument
    on_view_change: function(actualViewMode) {
      setTimeout(() => {
        enforceMinBarWidth(chartElement);
        container.querySelectorAll(".bar-group").forEach(bar =>
          bar.addEventListener("mousedown", ganttstopEvent, true)
        );
        container.querySelectorAll(".handle-group").forEach(h => h.remove());

        // Call correct formatter based on ACTUAL mode
        if (actualViewMode === "Month") {
          if (typeof formatMonthLabels === 'function') formatMonthLabels(chartElement);
        } else if (actualViewMode === "Day") {
          formatDayLabels(chartElement); // Now this will work!
        } else if (actualViewMode === "Week") {
          if (typeof formatWeekLabels === 'function') formatWeekLabels(chartElement);
        }
      }, 50); // 50ms gives more time for DOM to update
    },
  });

  // ---------------- Post-render Setup ----------------
  $("#example-basic").treetable({ expandable: true });

  // Safe event binding for view mode switcher
  $("#control-view").off("click", "button").on("click", "button", function (e) {
    var mode = $(this).data("value");
    if (gantt && typeof gantt.change_view_mode === "function") {
      gantt.change_view_mode(mode);
      $(this).parent().find("button").removeClass("active");
      $(this).addClass("active");
    }
  });

  // Initialize avatars
  $('.ganttimagecircle').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
 
}
function initiativedsubChartSuccessCallback(result) {
  var progressvalue = "0";
  if (result.initiativeValue.progressval != undefined) {
    progressvalue = result.initiativeValue.progressval;
  }
  var daysremaining = "0";
  var daterangeformatted = "";
  if (
    result.initiativeValue.daterange != undefined &&
    result.initiativeValue.daterange != ""
  ) {
    var datestring = result.initiativeValue.daterange;

    if (datestring.includes("-")) {
      var dateval = datestring.split("-");
      var endDate = Date.parse(dateval[1]);
      var today = new Date();
      const currDate = Date.parse(today);

      var Difference_In_Time = endDate - currDate;
      var days = Difference_In_Time / (1000 * 60 * 60 * 24);
      // expected output: 0

      if (days > 0) {
        daysremaining = Math.round(days).toString();
      }

      var startdate = new Date(dateval[0]);
      var enddateformatted = new Date(dateval[1]);
      /*
       * daterangeformatted = startdate.toLocaleDateString('en-GB', {
       * day : 'numeric', month : 'short', year : 'numeric' }) + " - " +
       * enddateformatted.toLocaleDateString('en-GB', { day :
       * 'numeric', month : 'short', year : 'numeric' });
       */
    }
  }
  var daterangeformatted =
    dateFormatedtohumanread(startdate) +
    "- " +
    dateFormatedtohumanread(enddateformatted);
  var owner = result.initiativeValue.createdByName;
  var initdetail = {
    id: result.id,
    title: result.initiativeValue.name,
    Owner: result.initiativeValue.createdByName,
    chartHeader:
      result.initiativeValue.chartHeader == undefined ||
      result.initiativeValue.chartHeader == ""
        ? "Chart"
        : result.initiativeValue.chartHeader,
    id: result.id,
    status: result.initiativeValue.status,
    progressval: progressvalue,
    progressvalpercent: progressvalue + "%",
    intiativedaterange: daterangeformatted,
    diffdays: daysremaining + " days",
  };

  initiativegrattChart(
    initdetail,
    result,
    progressvalue,
    "initiativechartviewstatus",
    activitiesganttchart
  );
}
function getSubInitiativeName(selector, id) {
  console.log(id, "id passed to getSubInitiativeName");

  // Clear existing options
  $(selector).empty();
  $(selector).append(`<option value="">Select Sub-Initiative</option>`); // Default placeholder

  $.ajax({
    url: "/stratroom/subInitiativesList/" + id,
    async: false,
    method: "GET",
    success: function (response) {
      $.each(response, function (index, score) {
        console.log(score, "score");
        $(selector).append(
          `<option value="${score.id}" data-description="${score.subInitiativeValue.description}">${score.subInitiativeValue.description}</option>`
        );
      });
    },
    error: function (error) {
      console.error("Error fetching sub-initiatives:", error);
    },
  });
}

function generateBudgetField(
  header,
  fieldName,
  editable,
  defaultValue,
  initiativeBudget,
  suffix
) {
  var value = defaultValue;

  if (initiativeBudget[fieldName] !== undefined) {
    var formattedResult = specialcharsconvertToNumberFormat(
      initiativeBudget[fieldName]
    );
    var humanReadableNumber = intergerHumanFormat(formattedResult["number"]);
    value = formattedResult["currency"] + humanReadableNumber + suffix;
  }

  var headerHtml =
    '<div id="' +
    fieldName +
    'Header" data-old' +
    fieldName +
    'Header="' +
    header +
    '" >' +
    header +
    "</div>";

  if (editable) {
    headerHtml =
      '<div class="editableTxt" id="' +
      fieldName +
      'Header" data-old' +
      fieldName +
      'Header="' +
      header +
      '" onkeypress="return (this.innerText.length <= 15)" editable="true">' +
      header +
      "</div>";
  }

  return ` <div class="">
	 <div class="amount" id="${fieldName}_wrapper">
                    <div class="number_font" id="${fieldName}Value">${value}</div>
                </div>
            </div>`;
}
function formatDateRange(dateString) {
  if (!dateString || !dateString.includes("-")) return "";
  const [start, end] = dateString
    .split("-")
    .map((part) => new Date(part.trim()));
  const options = { month: "short", day: "numeric", year: "numeric" };
  return `${start.toLocaleDateString(
    "en-US",
    options
  )} – ${end.toLocaleDateString("en-US", options)}`;
}

function initiativeddescSuccessCallback(result, initiative_load_id) {
  console.log(result, "res");
  initiativeJsonListDataResponseData = result;

  {
    var defaultreporteelist = {};
    $.each(reporteelist, function (ownkey, empvalue) {
      if (empvalue.id == result.owner) {
        defaultreporteelist = {
          id: empvalue.id,
          name: empvalue.name,
          image: empvalue.image,
          dept: empvalue.dept,
        };
        topparentinitiativeDetails = {
          id: empvalue.id,
          name: empvalue.name,
          image: empvalue.image,
          dept: empvalue.dept,
        };
        //localStorage.setItem('initiative_details_owner_'+result.id, JSON.stringify(defaultreporteelist));
      }
    });

    var initiativedettemplate = $("#initiativedetail-template").html();
    var template = Handlebars.compile(initiativedettemplate);
    var userDept = $("#userDept").val();
    // Mustache.parse(initiativedettemplate); // optional, speeds up future
    // uses

    // var nowDate = new Date(result.initiativeValue.startDate);

    // var enddate = new Date(result.initiativeValue.endDate);

    // var resultdate = ""
    // resultdate = nowDate.format("mmm d, yyyy") + " - " +
    // enddate.format("mmm d, yyyy");
    // $('.initiative_details .initiative_id_details #date').text(result);
    var progressvalue = "0";

    if (result.initiativeValue.progressval != undefined) {
      progressvalue = result.initiativeValue.progressval;
    }

    var initiativeStatus = "";
    var initiativeReaction = "";
    if (progressvalue == 100) {
      initiativeStatus = "Good";
      initiativeReaction =
        '<i class="fas fa-thumbs-up reaction_icon like"></i> <i class="fas fa-thumbs-down reaction_icon dislike"></i>';
    } else {
      initiativeStatus = "Bad";
      initiativeReaction =
        '<i class="fas fa-thumbs-down reaction_icon dislike" style="color:#ff9999"></i> <i class="fas fa-thumbs-up reaction_icon like" style="color:#e9ecef"></i>';
    }

    var daysremaining = "0";
    var daterangeformatted = "";
    var startDateFormatted = "";
    var endDateFormatted = "";

    var datestring = "";

    if (
      result.initiativeValue.actualdaterange != undefined &&
      result.initiativeValue.actualdaterange != ""
    ) {
      datestring = result.initiativeValue.actualdaterange;
    } else if (
      result.initiativeValue.daterange != undefined &&
      result.initiativeValue.daterange != ""
    ) {
      datestring = result.initiativeValue.daterange;
    }

    if (datestring && datestring.includes("-")) {
      var dateval = datestring.split("-");

      // Trim any accidental spaces
      var startRaw = dateval[0].trim();
      var endRaw = dateval[1].trim();

      // Parse and format both dates
      var startDateObj = new Date(startRaw);
      var endDateObj = new Date(endRaw);

      startDateFormatted = startDateObj.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      endDateFormatted = endDateObj.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      // Optional: combined formatted range (if you still need it)
      daterangeformatted = startDateFormatted + " - " + endDateFormatted;

      // Calculate days remaining
      var today = new Date();
      var Difference_In_Time = endDateObj.getTime() - today.getTime();
      var days = Difference_In_Time / (1000 * 60 * 60 * 24);

      if (days > 0) {
        daysremaining = Math.round(days).toString();
      } else {
        daysremaining = "0";
      }
    }

    console.log("Start Date:", startDateFormatted);
    console.log("End Date:", endDateFormatted);
    console.log("Days Remaining:", daysremaining);

    daysremaining =
      result.initiativeValue.daysRemaining != undefined &&
      result.initiativeValue.daysRemaining != ""
        ? result.initiativeValue.daysRemaining
        : daysremaining;
    var owner = result.initiativeValue.createdByName;
    var actualHeader = "";
    var targetHeader = "";
    var budgetHeader = "";
    var totalHeader = "";
    var utilizedHeader = "";
    var balanceHeader = "";
    var dataField = "";
    var forecastHeader = "";
    var totalActualHeader = "";
    var totalBudgetHeader = "";
    var totalassetbudgetHeader = "";
    var totalRealizationAssetHeader = "";
    var totalLiabilitiesBudgetHeader = "";
    var totalRealizationLiabilitiesHeader = "";
    var totalBudgetHeader = "";
    var totalRealizationBudgetHeader = "";
    var totalAssetBudgetRealization_percentHeader = "";
    var totalLiabilitiesRealization_percentHeader = "";
    var totalBudgetRealization_percentHeader = "";
    var totalcurrency = "";
    var subinitiativeHeader = "Sub Initiatives";
    var chartHeader = "Chart";
    var activitiesHeader = "Activities";
    var attachmentHeader = "Attachments";
    var tasksHeader = "Tasks";
    var commentsHeader = "Comments";
    var miletoneHeader = "Milestones";

    const storedLanguage = localStorage.getItem("selectedLang") || "en";

    if (storedLanguage == "ar") {
      chartHeader = "مخطط";
      subinitiativeHeader = "المبادرات الفرعية";
      miletoneHeader = "المعالم";
      commentsHeader = "التعليقات";
      tasksHeader = "المهام";
      attachmentHeader = "المرفقات";
      viewHeader = "عرض";
      deleteHeader = "حذف";
      editHeader = "تعديل";
      addActivityHeder = "إضافة نشاط";
    } else if (storedLanguage == "am") {
      chartHeader = "ሰንጠረዥ";
      subinitiativeHeader = "ንዑስ ተነሳሽነቶች";
      miletoneHeader = "ዋና ደረጃዎች";
      commentsHeader = "አስተያየቶች";
      tasksHeader = "ተግባሮች";
      attachmentHeader = "የተያያዙ ፋይሎች";
      viewHeader = "እይ";
      deleteHeader = "ሰርዝ";
      editHeader = "አርትዕ";
      addActivityHeder = "እንቅስቃሴ አክል";
    } else {
      chartHeader = "Chart";
      subinitiativeHeader = "Sub Initiatives";
      miletoneHeader = "Milestones";
      commentsHeader = "Comments";
      tasksHeader = "Tasks";
      attachmentHeader = "Attachments";
      viewHeader = "View";
      deleteHeader = "Delete";
      editHeader = "Edit";
      addActivityHeder = "Add Activity";
    }

    var kpidesignlabel = "";
    var showhidevalue = "";
    var showlabelvalue = "";
    var addclassshowhidevalue = "";
    if (
      result.initiativeValue.subinitiativeHeader != undefined &&
      result.initiativeValue.subinitiativeHeader != ""
    ) {
      subinitiativeHeader = result.initiativeValue.subinitiativeHeader;
    }

    showhidevalue = subinitiativeHeader.replaceallstring();
    showlabelvalue = subinitiativeHeader;
    addclassshowhidevalue = "sub_initiativesicon";
    if (initiativepreference["preferences"] != null) {
      var subiniviewPreference =
        initiativepreference["preferences"][addclassshowhidevalue] != undefined
          ? initiativepreference["preferences"][addclassshowhidevalue]
          : "true";
    } else {
      var subiniviewPreference = "true";
    }

    initiativeempPreference["preferences"][addclassshowhidevalue] =
      subiniviewPreference;
    $("#subinitiative_initial_template").css(
      "display",
      subiniviewPreference == "true" ? "block" : "none"
    );
    $("#subinitiative_initial_template").addClass(addclassshowhidevalue);
    subiniviewPreference = subiniviewPreference == "true" ? "checked" : "";
    kpidesignlabel +=
      '<li><a href="#"><div class="form-check"><label class="form-check-label"><input id="subinitiativeHeaderlabel" type="checkbox" name="' +
      showhidevalue +
      '" value="' +
      addclassshowhidevalue +
      '" class="form-check-input" ' +
      subiniviewPreference +
      "/>" +
      showlabelvalue +
      '<span class="form-check-sign"><span class="check"></span></label></div></a></li>';

    if (
      result.initiativeValue.chartHeader != undefined &&
      result.initiativeValue.chartHeader != ""
    ) {
      chartHeader = result.initiativeValue.chartHeader;
    }

    showhidevalue = chartHeader.replaceallstring();
    showlabelvalue = chartHeader;
    addclassshowhidevalue = "chart_initiativeicon";
    if (initiativepreference["preferences"] != null) {
      var subiniviewPreference =
        initiativepreference["preferences"][addclassshowhidevalue] != undefined
          ? initiativepreference["preferences"][addclassshowhidevalue]
          : "true";
    } else {
      var subiniviewPreference = "true";
    }

    initiativeempPreference["preferences"][addclassshowhidevalue] =
      subiniviewPreference;
    $("#chartdiv_ini").css(
      "display",
      subiniviewPreference == "true" ? "block" : "none"
    );
    subiniviewPreference = subiniviewPreference == "true" ? "checked" : "";
    $("#chartdiv_ini").addClass(addclassshowhidevalue);
    kpidesignlabel +=
      '<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="' +
      showhidevalue +
      '" value="' +
      addclassshowhidevalue +
      '" class="form-check-input" ' +
      subiniviewPreference +
      "/>" +
      showlabelvalue +
      '<span class="form-check-sign"><span class="check"></span></label></div></a></li>';

    if (
      result.initiativeValue.tasksHeader != undefined &&
      result.initiativeValue.tasksHeader != ""
    ) {
      tasksHeader = result.initiativeValue.tasksHeader;
    }

    showhidevalue = tasksHeader.replaceallstring();
    showlabelvalue = tasksHeader;
    addclassshowhidevalue = "activities_initiativeicon";
    if (initiativepreference["preferences"] != null) {
      var subiniviewPreference =
        initiativepreference["preferences"][addclassshowhidevalue] != undefined
          ? initiativepreference["preferences"][addclassshowhidevalue]
          : "true";
    } else {
      var subiniviewPreference = "true";
    }

    initiativeempPreference["preferences"][addclassshowhidevalue] =
      subiniviewPreference;
    $("#chartdiv_ini").css(
      "display",
      subiniviewPreference == "true" ? "block" : "none"
    );
    subiniviewPreference = subiniviewPreference == "true" ? "checked" : "";
    $("#chartdiv_ini").addClass(addclassshowhidevalue);
    kpidesignlabel +=
      '<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="' +
      showhidevalue +
      '" value="' +
      addclassshowhidevalue +
      '" class="form-check-input" ' +
      subiniviewPreference +
      "/>" +
      showlabelvalue +
      '<span class="form-check-sign"><span class="check"></span></label></div></a></li>';

    if (
      result.initiativeValue.attachmentHeader != undefined &&
      result.initiativeValue.attachmentHeader != ""
    ) {
      attachmentHeader = result.initiativeValue.attachmentHeader;
    }

    showhidevalue = attachmentHeader.replaceallstring();
    showlabelvalue = attachmentHeader;
    addclassshowhidevalue = "activities_initiativeicon";
    if (initiativepreference["preferences"] != null) {
      var subiniviewPreference =
        initiativepreference["preferences"][addclassshowhidevalue] != undefined
          ? initiativepreference["preferences"][addclassshowhidevalue]
          : "true";
    } else {
      var subiniviewPreference = "true";
    }

    initiativeempPreference["preferences"][addclassshowhidevalue] =
      subiniviewPreference;
    $("#tasks").css(
      "display",
      subiniviewPreference == "true" ? "block" : "none"
    );
    subiniviewPreference = subiniviewPreference == "true" ? "checked" : "";
    $("#tasks").addClass(addclassshowhidevalue);
    kpidesignlabel +=
      '<li><a href="#"><div class="form-check"><label class="form-check-label"><label class=""><input type="checkbox" name="' +
      showhidevalue +
      '" value="' +
      addclassshowhidevalue +
      '" class="form-check-input" ' +
      subiniviewPreference +
      "/>" +
      showlabelvalue +
      '<span class="form-check-sign"><span class="check"></span></label></div></a></li>';

    if (
      result.initiativeValue.miletoneHeader != undefined &&
      result.initiativeValue.miletoneHeader != ""
    ) {
      miletoneHeader = result.initiativeValue.miletoneHeader;
    }

    showhidevalue = miletoneHeader.replaceallstring();
    showlabelvalue = miletoneHeader;
    addclassshowhidevalue = "milestone_initiativeicon";
    if (initiativepreference["preferences"] != null) {
      var subiniviewPreference =
        initiativepreference["preferences"][addclassshowhidevalue] != undefined
          ? initiativepreference["preferences"][addclassshowhidevalue]
          : "true";
    } else {
      var subiniviewPreference = "true";
    }

    initiativeempPreference["preferences"][addclassshowhidevalue] =
      subiniviewPreference;
    $("#milestones").css(
      "display",
      subiniviewPreference == "true" ? "block" : "none"
    );
    subiniviewPreference = subiniviewPreference == "true" ? "checked" : "";
    $("#milestones").addClass(addclassshowhidevalue);
    kpidesignlabel +=
      '<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="' +
      showhidevalue +
      '" value="' +
      addclassshowhidevalue +
      '" class="form-check-input" ' +
      subiniviewPreference +
      "/>" +
      showlabelvalue +
      '<span class="form-check-sign"><span class="check"></span></label></div></a></li>';

    if (
      result.initiativeValue.commentsHeader != undefined &&
      result.initiativeValue.commentsHeader != ""
    ) {
      commentsHeader = result.initiativeValue.commentsHeader;
    }

    showhidevalue = commentsHeader.replaceallstring();
    showlabelvalue = commentsHeader;
    addclassshowhidevalue = "comments_initiativeicon";
    if (initiativepreference["preferences"] != null) {
      var subiniviewPreference =
        initiativepreference["preferences"][addclassshowhidevalue] != undefined
          ? initiativepreference["preferences"][addclassshowhidevalue]
          : "true";
    } else {
      var subiniviewPreference = "true";
    }

    initiativeempPreference["preferences"][addclassshowhidevalue] =
      subiniviewPreference;
    $("#comments").css(
      "display",
      subiniviewPreference == "true" ? "block" : "none"
    );
    subiniviewPreference = subiniviewPreference == "true" ? "checked" : "";
    $("#comments").addClass(addclassshowhidevalue);
    kpidesignlabel +=
      '<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="' +
      showhidevalue +
      '" value="' +
      addclassshowhidevalue +
      '" class="form-check-input" ' +
      subiniviewPreference +
      "/>" +
      showlabelvalue +
      '<span class="form-check-sign"><span class="check"></span></label></div></a></li>';

    globaltotalcheck = result.initiativeValue.total;
    globalutilizedcheck = result.initiativeValue.utilized;
    globalbalancecheck = result.initiativeValue.balance;

    if (result.initiativeValue.total) {
      totalHeader = "Total";
      if (result.initiativeValue.totalHeader != undefined) {
        totalHeader = result.initiativeValue.totalHeader;
      }

      var returnresult = specialcharsconvertToNumberFormat(
        result.initiativeValue.Total
      );
      var readTotalAmount = intergerHumanFormat(returnresult["number"]);
      if (
        result.initiativeValue.Total != undefined &&
        result.initiativeValue.TotCurr != undefined
      ) {
        totalcurrency = result.initiativeValue.TotCurr + readTotalAmount;
      } else if (result.initiativeValue.Total != undefined) {
        totalcurrency = "$" + readTotalAmount;
      } else {
        totalcurrency = defaultCurrencyValue;
      }
    }

    if (result.initiativeValue.utilized) {
      utilizedHeader = "Utilized";
      if (result.initiativeValue.utilizedHeader != undefined) {
        utilizedHeader = result.initiativeValue.utilizedHeader;
      }

      var utilizedcurrency = "";
      var returnresult = specialcharsconvertToNumberFormat(
        result.initiativeValue.Utilized
      );
      var readUtillizedAmount = intergerHumanFormat(returnresult["number"]);
      if (
        result.initiativeValue.utilizedCurr != undefined &&
        result.initiativeValue.Utilized != undefined
      ) {
        utilizedcurrency =
          result.initiativeValue.utilizedCurr + readUtillizedAmount;
      } else if (result.initiativeValue.Utilized != undefined) {
        utilizedcurrency = "$" + readUtillizedAmount;
      } else {
        utilizedcurrency = defaultCurrencyValue;
      }
    }

    if (result.initiativeValue.balance) {
      balanceHeader = "Balance";
      if (result.initiativeValue.balanceHeader != undefined) {
        balanceHeader = result.initiativeValue.balanceHeader;
      }

      var balancecurrency = "";
      var returnresult = specialcharsconvertToNumberFormat(
        result.initiativeValue.Balance
      );
      var readBalanceAmount = intergerHumanFormat(returnresult["number"]);
      if (
        result.initiativeValue.BalCurr != undefined &&
        result.initiativeValue.Balance != undefined
      ) {
        balancecurrency = result.initiativeValue.BalCurr + readBalanceAmount;
      } else if (result.initiativeValue.Balance != undefined) {
        balancecurrency = "$" + readBalanceAmount;
      } else {
        balancecurrency = defaultCurrencyValue;
      }
    }

    var balanceval = 0;
    var totalvalue = 0;
    var utilizedvalue = 0;
    if (
      result.initiativeValue.total != undefined &&
      result.initiativeValue.utilized != undefined
    ) {
      if (result.initiativeValue.Total != undefined) {
        if (isNaN(result.initiativeValue.Total)) {
          totalvalue = result.initiativeValue.Total.replace(",", "");
        } else {
          totalvalue = result.initiativeValue.Total;
        }
      }
      if (result.initiativeValue.Utilized != undefined) {
        if (isNaN(result.initiativeValue.Utilized)) {
          utilizedvalue = result.initiativeValue.Utilized.replace(",", "");
        } else {
          utilizedvalue = result.initiativeValue.Utilized;
        }
      }
      balanceval = parseInt(totalvalue) - parseInt(utilizedvalue);
    } else if (result.initiativeValue.total != undefined) {
      balanceval = specialcharsconvertToNumberFormat(
        result.initiativeValue.Total
      );

      balanceHeader = "Balance";
      if (result.initiativeValue.balanceHeader != undefined) {
        balanceHeader = result.initiativeValue.balanceHeader;
      }

      var balancecurrency = "";
      var readBalanceAmount = intergerHumanFormat(balanceval);
      if (balanceval != 0 && result.initiativeValue.BalCurr != undefined) {
        balancecurrency = result.initiativeValue.BalCurr + readBalanceAmount;
      } else if (balanceval != 0) {
        balancecurrency = "$" + readBalanceAmount;
      } else {
        balancecurrency = defaultCurrencyValue;
      }
    }

    var displayStatusField = "";
    if (
      result.initiativeValue.utilized ||
      result.initiativeValue.total ||
      result.initiativeValue.balance
    ) {
      displayStatusField = "ini_thrid_row_amount coltp";
    } else {
      displayStatusField = "removeamountdatafield";
    }

    var displayDataField = "";
    if (
      result.initiativeValue.actual ||
      result.initiativeValue.target ||
      result.initiativeValue.budget ||
      result.initiativeValue.forecast ||
      result.initiativeValue.budgettotal ||
      result.initiativeValue.actualtotal
    ) {
      displayDataField = "ini_thrid_row_datafiled colfp";
    } else {
      displayDataField = "removedisplaydatafield";
    }

    var totalfieldstauts = "";
    if (
      result.initiativeValue.total != "" &&
      result.initiativeValue.total != undefined
    ) {
      if (initiativeeditpermission == true) {
        totalfieldstauts =
          '<div class="first_amount"><div class="amount"><div class="editableTxt number_font" data-oldTotal="' +
          totalcurrency +
          '" id="Total" onkeypress="blockSpecialChar(event);return (this.innerText.length <= 10);" editable="true">' +
          totalcurrency +
          '</div><div class="editableTxt" data-oldtotalHeader="' +
          totalHeader +
          '" id="totalHeader" onkeypress="return (this.innerText.length <= 15)" editable="true">' +
          totalHeader +
          "</div></div></div>";
      } else {
        totalfieldstauts =
          '<div class="first_amount"><div class="amount"><div data-oldTotal="' +
          totalcurrency +
          '" id="Total">' +
          totalcurrency +
          '</div><div data-oldtotalHeader="' +
          totalHeader +
          '" id="totalHeader">' +
          totalHeader +
          "</div></div></div>";
      }
    }

    var utiliziedfieldstauts = "";
    if (
      result.initiativeValue.utilized != "" &&
      result.initiativeValue.utilized != undefined
    ) {
      if (initiativeeditpermission == true) {
        utiliziedfieldstauts =
          '<div class=""><div class="amount"><div class="editableTxt number_font" data-oldUtillized="' +
          utilizedcurrency +
          '" id="Utillized" onkeypress="blockSpecialChar(event);return (this.innerText.length <= 10);" editable="true">' +
          utilizedcurrency +
          '</div><div class="editableTxt" data-oldutilizedHeader="' +
          utilizedHeader +
          '" id="utilizedHeader" onkeypress="return (this.innerText.length <= 15)" editable="true">' +
          utilizedHeader +
          "</div></div></div>";
      } else {
        utiliziedfieldstauts =
          '<div class=""><div class="amount"><div data-oldUtillized="' +
          utilizedcurrency +
          '" id="Utillized">' +
          utilizedcurrency +
          '</div><div data-oldutilizedHeader="' +
          utilizedHeader +
          '" id="utilizedHeader">' +
          utilizedHeader +
          "</div></div></div>";
      }
    }

    var balancefieldstauts = "";
    if (
      result.initiativeValue.balance != "" &&
      result.initiativeValue.balance != undefined
    ) {
      if (initiativeeditpermission == true) {
        balancefieldstauts =
          '<div class=""><div class="amount"><div class="number_font" data-oldBalance="' +
          balancecurrency +
          '" id="Balance">' +
          balancecurrency +
          '</div><div class="editableTxt" data-oldbalanceHeader="' +
          balanceHeader +
          '" id="balanceHeader" onkeypress="return (this.innerText.length <= 15)" editable="true">' +
          balanceHeader +
          "</div></div></div>";
      } else {
        balancefieldstauts =
          '<div class=""><div class="amount"><div class="number_font" data-oldBalance="' +
          balancecurrency +
          '" id="Balance">' +
          balancecurrency +
          '</div><div data-oldbalanceHeader="' +
          balanceHeader +
          '" id="balanceHeader">' +
          balanceHeader +
          "</div></div></div>";
      }
    }

    var actualValue = defaultCurrencyValue;
    var actualheaderUpdate = "";
    var actualfielddatafield = "";

    if (
      result.initiativeValue.actual != "" &&
      result.initiativeValue.actual != undefined
    ) {
      actualHeader = "Actual";
      if (result.initiativeValue.actualHeader != undefined) {
        actualHeader = result.initiativeValue.actualHeader;
      }
      if (initiativeeditpermission == true) {
        actualheaderUpdate =
          '<div class="editableTxt" data-oldactualHeader="' +
          actualHeader +
          '" id="actualHeader" onkeypress="return (this.innerText.length <= 15)" editable="true">' +
          actualHeader +
          "</div>";
      } else {
        actualheaderUpdate =
          '<div data-oldactualHeader="' +
          actualHeader +
          '" id="actualHeader">' +
          actualHeader +
          "</div>";
      }

      dataField = "Data Field";
      if (result.initiativeValue.actualValue != undefined) {
        var returnresult = specialcharsconvertToNumberFormat(
          result.initiativeValue.actualValue
        );
        var readActualAmount = intergerHumanFormat(returnresult["number"]);
        actualValue = readActualAmount;
      }
      actualfielddatafield =
        `<div class="">
                <div class="amount" id="actual_wrapper">
                    <div class="number_font" id="actualValue">` +
        actualValue +
        `%</div>
                     ` +
        actualheaderUpdate +
        `
        		</div>
			</div>`;
    }
    var targetfielddatafield = "";
    var targetValue = defaultCurrencyValue;
    var targetheaderUpdate = "";
    var targetValueUpdate = "";
    if (result.initiativeValue.target) {
      targetHeader = "Target";
      if (result.initiativeValue.targetHeader != undefined) {
        targetHeader = result.initiativeValue.targetHeader;
      }

      if (initiativeeditpermission == true) {
        targetheaderUpdate =
          '<div class="editableTxt" data-oldtargetHeader="' +
          targetHeader +
          '" id="targetHeader" onkeypress="return (this.innerText.length <= 15)" editable="true">' +
          targetHeader +
          "</div>";
        targetValueUpdate =
          '<div class="editableTxt number_font" data-oldtargetValue="' +
          targetValue +
          '" id="targetValue" onkeypress="return (this.innerText.length <= 10)" editable="true" id="targetValue">' +
          targetValue +
          "</div>";
      } else {
        targetheaderUpdate =
          '<div data-oldtargetHeader="' +
          targetHeader +
          '" id="targetHeader">' +
          targetHeader +
          "</div>";
        targetValueUpdate =
          '<div data-oldtargetValue="' +
          targetValue +
          '" id="targetValue" id="targetValue">' +
          targetValue +
          "</div>";
      }

      dataField = "Data Field";
      if (result.initiativeValue.targetValue != undefined) {
        var returnresult = specialcharsconvertToNumberFormat(
          result.initiativeValue.targetValue
        );
        var readActualAmount = intergerHumanFormat(returnresult["number"]);
        targetValue = readActualAmount;
      }

      targetfielddatafield =
        `<div class="">
                <div class="amount" id="target_wrapper">
                    <div class="number_font" id="targetValue">` +
        targetValue +
        `%</div>
                     ` +
        targetheaderUpdate +
        `
        		</div>
			</div>`;
    }

    var budgetValue = defaultCurrencyValue;
    var budgetheaderUpdate = "";
    var budgetfielddatafield = "";
    if (result.initiativeValue.budget) {
      budgetHeader = "Budget";
      if (result.initiativeValue.budgetHeader != undefined) {
        budgetHeader = result.initiativeValue.budgetHeader;
      }
      if (initiativeeditpermission == true) {
        budgetheaderUpdate =
          '<div class="editableTxt" id="budgetHeader" data-oldbudgetHeader="' +
          budgetHeader +
          '" onkeypress="return (this.innerText.length <= 15)" editable="true">' +
          budgetHeader +
          "</div>";
      } else {
        budgetheaderUpdate =
          '<div id="budgetHeader" data-oldbudgetHeader="' +
          budgetHeader +
          '">' +
          budgetHeader +
          "</div>";
      }
      dataField = "Data Field";
      if (result.initiativeValue.budgetValue != undefined) {
        var returnresult = specialcharsconvertToNumberFormat(
          result.initiativeValue.budgetValue
        );
        var readBudgetAmount = intergerHumanFormat(returnresult["number"]);
        budgetValue = returnresult["currency"] + readBudgetAmount;
      }
      budgetfielddatafield =
        `<div class="">
                                    <div class="amount" id="budget_wrapper">
                                        <div class="number_font" id="budgetValue">` +
        budgetValue +
        `</div>
                                        ` +
        budgetheaderUpdate +
        `
                                    </div>
                                </div>`;
    }

    var forecastheaderUpdate = "";
    var forecastValue = defaultCurrencyValue;
    var forecastfielddatafield = "";
    if (result.initiativeValue.forecast) {
      forecastHeader = "ForeCast";
      if (result.initiativeValue.forecastHeader != undefined) {
        forecastHeader = result.initiativeValue.forecastHeader;
      }
      if (initiativeeditpermission == true) {
        forecastheaderUpdate =
          '<div class="editableTxt" id="forecastHeader" data-oldforecastHeader="' +
          forecastHeader +
          '" onkeypress="return (this.innerText.length <= 15)" editable="true">' +
          forecastHeader +
          "</div>";
      } else {
        forecastheaderUpdate =
          '<div id="forecastHeader" data-oldforecastHeader="' +
          forecastHeader +
          '" >' +
          forecastHeader +
          "</div>";
      }
      dataField = "Data Field";
      if (result.initiativeValue.forecastValue != undefined) {
        var returnresult = specialcharsconvertToNumberFormat(
          result.initiativeValue.forecastValue
        );
        var readForecastAmount = intergerHumanFormat(returnresult["number"]);
        forecastValue = returnresult["currency"] + readForecastAmount;
      }
      forecastfielddatafield =
        `<div class="">
                                    <div class="amount" id="forcast_wrapper">
                                        <div class="number_font" id="forecastValue">` +
        forecastValue +
        `</div>
                                        ` +
        forecastheaderUpdate +
        `
                  				</div></div>`;
    }
    var totalBudgetHeaderUpdate = "";
    var totalBudgetValue = defaultCurrencyValue;
    var totalBudgetfielddatafield = "";

    if (result.initiativeValue.budgettotal) {
      var totalBudgetHeader = "Total Budget";
      if (result.initiativeValue.totalBudgetHeader != undefined) {
        totalBudgetHeader = result.initiativeValue.totalBudgetHeader;
      }

      if (initiativeeditpermission == true) {
        totalBudgetHeaderUpdate =
          '<div class="editableTxt" id="totalBudgetHeader" data-oldtotalBudgetHeader="' +
          totalBudgetHeader +
          '" onkeypress="return (this.innerText.length <= 15)" editable="true">' +
          totalBudgetHeader +
          "</div>";
      } else {
        totalBudgetHeaderUpdate =
          '<div id="totalBudgetHeader" data-oldtotalBudgetHeader="' +
          totalBudgetHeader +
          '">' +
          totalBudgetHeader +
          "</div>";
      }

      if (result.initiativeValue.totalBudget != undefined) {
        var returnTotalBudget = specialcharsconvertToNumberFormat(
          result.initiativeValue.totalBudget
        );
        var readTotalBudgetAmount = intergerHumanFormat(
          returnTotalBudget["number"]
        );
        totalBudgetValue =
          returnTotalBudget["currency"] + readTotalBudgetAmount;
      }

      totalBudgetfielddatafield =
        `<div class="">
                                    <div class="amount" id="totalBudget_wrapper">
                                        <div class="number_font" id="totalBudgetValue">` +
        totalBudgetValue +
        `</div>
                                        ` +
        totalBudgetHeaderUpdate +
        `
                                    </div>
                                 </div>`;
    }

    var totalActualHeaderUpdate = "";
    var totalActualValue = defaultCurrencyValue;
    var totalActualfielddatafield = "";

    if (result.initiativeValue.actualtotal) {
      var totalActualHeader = "Total Actual";
      if (result.initiativeValue.totalActualHeader != undefined) {
        totalActualHeader = result.initiativeValue.totalActualHeader;
      }
      if (initiativeeditpermission == true) {
        totalActualHeaderUpdate =
          '<div class="editableTxt" id="totalActualHeader" data-oldtotalActualHeader="' +
          totalActualHeader +
          '" onkeypress="return (this.innerText.length <= 15)" editable="true">' +
          totalActualHeader +
          "</div>";
      } else {
        totalActualHeaderUpdate =
          '<div id="totalActualHeader" data-oldtotalActualHeader="' +
          totalActualHeader +
          '">' +
          totalActualHeader +
          "</div>";
      }
      if (result.initiativeValue.totalActual != undefined) {
        var returnTotalActual = specialcharsconvertToNumberFormat(
          result.initiativeValue.totalActual
        );
        var readTotalActualAmount = intergerHumanFormat(
          returnTotalActual["number"]
        );
        totalActualValue =
          returnTotalActual["currency"] + readTotalActualAmount;
      }

      totalActualfielddatafield =
        `<div class="">
											<div class="amount" id="totalActual_wrapper">
												<div class="number_font" id="totalActualValue">` +
        totalActualValue +
        `</div>
												` +
        totalActualHeaderUpdate +
        `
											</div>
										 </div>`;
    }

    var scoreCardDetailDesc = "";
    if (result.initiativeValue.scoreCardDetailDesc != undefined) {
      scoreCardDetailDesc = result.initiativeValue.scoreCardDetailDesc;
    }

    var perspectiveName = "";
    if (result.initiativeValue.perspectiveName != undefined) {
      perspectiveName = result.initiativeValue.perspectiveName;
    }

    var objectiveDesc = "";
    if (result.initiativeValue.objectiveDesc != undefined) {
      objectiveDesc = result.initiativeValue.objectiveDesc;
    }
var impactDesc = [];

if (
  Array.isArray(result?.initiativeValue?.kpi) &&
  result.initiativeValue.kpi.length > 0
) {
  impactDesc = result.initiativeValue.kpi.map(function (kpi) {
    return kpi.name.trim();
  });
}


    var totalassetbudgetheaderUpdate = "";
    var totalassetbudgetValue = defaultCurrencyValue;
    var totalassetbudgetdatafield = "";
    totalassetbudgetHeader = "Total Asset Budget";
    if (result.initiativeValue.totalassetbudgetHeader != undefined) {
      totalassetbudgetHeader = result.initiativeValue.totalassetbudgetHeader;
    }
    if (initiativeeditpermission == true) {
      totalassetbudgetheaderUpdate =
        '<div class="editableTxt" id="totalassetbudgetHeader" data-oldtotalassetbudgetHeader="' +
        totalassetbudgetHeader +
        '" onkeypress="return (this.innerText.length <= 15)" editable="true">' +
        totalassetbudgetHeader +
        "</div>";
    } else {
      totalassetbudgetheaderUpdate =
        '<div id="totalassetbudgetHeader" data-oldtotalassetbudgetHeader="' +
        totalassetbudgetHeader +
        '" >' +
        totalassetbudgetHeader +
        "</div>";
    }
    dataField = "Data Field";
    if (
      result.initiativeBudget != undefined &&
      result.initiativeBudget.totalAssetBudget != undefined
    ) {
      var returnresult = specialcharsconvertToNumberFormat(
        result.initiativeBudget.totalAssetBudget
      );
      var readtotalAssetBudgetAmount = intergerHumanFormat(
        returnresult["number"]
      );
      totalassetbudgetValue =
        returnresult["currency"] + readtotalAssetBudgetAmount;
    }
    totalassetbudgetdatafield =
      `<div class="amount" id="totalassetbudget_wrapper">
                                        <div class="number_font" id="totalassetbudgetValue">` +
      totalassetbudgetValue +
      `</div></div>`;

    console.log(totalassetbudgetdatafield);

    var defaultinitbudget = {
      totalRealizationAsset: "0",
      totalLiabilitiesBudget: "0",
      totalRealizationLiabilities: "0",
      totalBudget: "0",
      totalRealizationBudget: "0",
      totalAssetBudgetRealization_percent: "0",
      totalLiabilitiesRealization_percent: "0",
      totalBudgetRealization_percent: "0",
    };

    var totalRealizationAssetValue = defaultCurrencyValue;
    totalRealizationAssetHeader = "Total Asset Realization";
    var totalRealizationAssetdatafield = "";
    if (
      result.initiativeBudget != undefined &&
      result.initiativeBudget.totalRealizationAsset != undefined
    ) {
      totalRealizationAssetdatafield = generateBudgetField(
        totalRealizationAssetHeader,
        "totalRealizationAsset",
        initiativeeditpermission,
        totalRealizationAssetValue,
        result.initiativeBudget,
        ""
      );
    } else {
      totalRealizationAssetdatafield = generateBudgetField(
        totalRealizationAssetHeader,
        "totalRealizationAsset",
        initiativeeditpermission,
        totalRealizationAssetValue,
        defaultinitbudget,
        ""
      );
    }
    totalLiabilitiesBudgetHeader = "Total Liabilities Budget";
    var totalLiabilitiesBudgetdatafield = "";
    if (
      result.initiativeBudget != undefined &&
      result.initiativeBudget.totalRealizationAsset != undefined
    ) {
      totalLiabilitiesBudgetdatafield = generateBudgetField(
        totalLiabilitiesBudgetHeader,
        "totalLiabilitiesBudget",
        initiativeeditpermission,
        totalRealizationAssetValue,
        result.initiativeBudget,
        ""
      );
    } else {
      totalLiabilitiesBudgetdatafield = generateBudgetField(
        totalLiabilitiesBudgetHeader,
        "totalLiabilitiesBudget",
        initiativeeditpermission,
        totalRealizationAssetValue,
        defaultinitbudget,
        ""
      );
    }

    totalRealizationLiabilitiesHeader = "Total Liabilities Realization";
    var totalRealizationLiabilitiesdatafield = "";
    if (
      result.initiativeBudget != undefined &&
      result.initiativeBudget.totalRealizationLiabilities != undefined
    ) {
      totalRealizationLiabilitiesdatafield = generateBudgetField(
        totalRealizationLiabilitiesHeader,
        "totalRealizationLiabilities",
        initiativeeditpermission,
        totalRealizationAssetValue,
        result.initiativeBudget,
        ""
      );
    } else {
      totalRealizationLiabilitiesdatafield = generateBudgetField(
        totalRealizationLiabilitiesHeader,
        "totalRealizationLiabilities",
        initiativeeditpermission,
        totalRealizationAssetValue,
        defaultinitbudget,
        ""
      );
    }

    totalBudgetHeader = "Total Budget";
    var totalBudgetdatafield = "";
    if (
      result.initiativeBudget != undefined &&
      result.initiativeBudget.totalBudget != undefined
    ) {
      totalBudgetdatafield = generateBudgetField(
        totalBudgetHeader,
        "totalBudget",
        initiativeeditpermission,
        totalRealizationAssetValue,
        result.initiativeBudget,
        ""
      );
    } else {
      totalBudgetdatafield = generateBudgetField(
        totalBudgetHeader,
        "totalBudget",
        initiativeeditpermission,
        totalRealizationAssetValue,
        defaultinitbudget,
        ""
      );
    }
    totalRealizationBudgetHeader = "Total Budget Realization";
    var totalRealizationBudgetdatafield = "";
    if (
      result.initiativeBudget != undefined &&
      result.initiativeBudget.totalRealizationBudget != undefined
    ) {
      totalRealizationBudgetdatafield = generateBudgetField(
        totalRealizationBudgetHeader,
        "totalRealizationBudget",
        initiativeeditpermission,
        totalRealizationAssetValue,
        result.initiativeBudget,
        ""
      );
    } else {
      totalRealizationBudgetdatafield = generateBudgetField(
        totalRealizationBudgetHeader,
        "totalRealizationBudget",
        initiativeeditpermission,
        totalRealizationAssetValue,
        defaultinitbudget,
        ""
      );
    }
    var totalassetbudgetheaderUpdate = "";
    totalAssetBudgetRealization_percentHeader = "Total Asset Realization %";
    var totalAssetBudgetRealization_percentdatafield = "";
    if (
      result.initiativeBudget != undefined &&
      result.initiativeBudget.totalAssetBudgetRealization_percent != undefined
    ) {
      totalAssetBudgetRealization_percentdatafield = generateBudgetField(
        totalAssetBudgetRealization_percentHeader,
        "totalAssetBudgetRealization_percent",
        initiativeeditpermission,
        totalRealizationAssetValue,
        result.initiativeBudget,
        " %"
      );
    } else {
      totalAssetBudgetRealization_percentdatafield = generateBudgetField(
        totalAssetBudgetRealization_percentHeader,
        "totalAssetBudgetRealization_percent",
        initiativeeditpermission,
        totalRealizationAssetValue,
        defaultinitbudget,
        " %"
      );
    }

    totalLiabilitiesRealization_percentHeader =
      "Total Liabilities Realization %";
    var totalLiabilitiesRealization_percentdatafield = "";
    if (
      result.initiativeBudget != undefined &&
      result.initiativeBudget.totalLiabilitiesRealization_percent != undefined
    ) {
      totalLiabilitiesRealization_percentdatafield = generateBudgetField(
        totalLiabilitiesRealization_percentHeader,
        "totalLiabilitiesRealization_percent",
        initiativeeditpermission,
        totalRealizationAssetValue,
        result.initiativeBudget,
        " %"
      );
    } else {
      totalLiabilitiesRealization_percentdatafield = generateBudgetField(
        totalLiabilitiesRealization_percentHeader,
        "totalLiabilitiesRealization_percent",
        initiativeeditpermission,
        totalRealizationAssetValue,
        defaultinitbudget,
        " %"
      );
    }
    totalBudgetRealization_percentHeader = "Total Budget Realization %";
    var totalBudgetRealization_percentdatafield = "";
    if (
      result.initiativeBudget != undefined &&
      result.initiativeBudget.totalBudgetRealization_percent != undefined
    ) {
      totalBudgetRealization_percentdatafield = generateBudgetField(
        totalBudgetRealization_percentHeader,
        "totalBudgetRealization_percent",
        initiativeeditpermission,
        totalRealizationAssetValue,
        result.initiativeBudget,
        " %"
      );
    } else {
      totalBudgetRealization_percentdatafield = generateBudgetField(
        totalBudgetRealization_percentHeader,
        "totalBudgetRealization_percent",
        initiativeeditpermission,
        totalRealizationAssetValue,
        defaultinitbudget,
        " %"
      );
    }

    console.log(totalBudgetRealization_percentdatafield);
    var landingimagecolor = "";
    var findprogressvalue =
      result.initiativeValue.statusLight != undefined &&
      result.initiativeValue.statusLight != ""
        ? result.initiativeValue.statusLight
        : "default_bar";
    if (findprogressvalue.search("progress-bar-success") != -1) {
      landingimagecolor = "greenbarimagecircle";
    } else if (findprogressvalue.search("yellow_bar") != -1) {
      landingimagecolor = "yellowbarimagecircle";
    } else if (findprogressvalue.search("orange_bar") != -1) {
      landingimagecolor = "orangebarimagecircle";
    } else {
      landingimagecolor = "defaultbarimagecircle";
    }
    console.log;
    var getownershortName = hasWhiteSpaceName(result.initiativeValue.ownerName);
    var username =
      defaultreporteelist.name == undefined || defaultreporteelist.name == ""
        ? "User"
        : defaultreporteelist.name;
    var Owner =
      topparentinitiativeDetails.image == undefined || topparentinitiativeDetails.image == ""
        ? "data-name='" +
          topparentinitiativeDetails.name +
          "' class='rounded-circle userprofileimage " +
          landingimagecolor +
          "' "
        : " class='rounded-circle " +
          landingimagecolor +
          "' src='" +
          topparentinitiativeDetails.name +
          "'";
    var dept =
      defaultreporteelist.dept == undefined || defaultreporteelist.dept == ""
        ? "NA"
        : defaultreporteelist.dept;

    var initiativeParentEditBtn = "";
    var initiativeParentuploadBtn = "";
    var initiativeParentviewBtn = "";

    if (initiativeeditpermission == true) {
      initiativeParentEditBtn =
       `<span data-bs-toggle="modal" 
        data-bs-target=".initatives_description_popup"
        class="btn btn-sm btn-icon"
        onclick="handleinitiativeevent(${result.id}, 'edit')">

    <svg xmlns="http://www.w3.org/2000/svg"
         width="14"
         height="14"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         stroke-width="2"
         stroke-linecap="round"
         stroke-linejoin="round"
         class="lucide lucide-pencil title_edit_icon"
         data-bs-toggle="tooltip"
         data-bs-placement="bottom"
         title="Edit">
        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
        <path d="m15 5 4 4"></path>
    </svg>

</span>`

      initiativeParentuploadBtn = `<span data-bs-toggle="modal" data-bs-target=".file_upload_popup" class="btn btn-sm btn-icon">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="paperclip" style="width: 14px; height: 14px;" class="lucide lucide-paperclip"><path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"></path></svg>
                  </span>`;
   initiativeParentviewBtn =
`
<div class="dropdown">
    <span class="btn btn-sm btn-icon"
          data-bs-toggle="dropdown"
          aria-expanded="false" >
        <svg xmlns="http://www.w3.org/2000/svg"
             width="14"
             height="14"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round"
             class="lucide lucide-eye">
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
            <circle cx="12" cy="12" r="3"></circle>
        </svg>
    </span>

    <ul class="dropdown-menu initiativedropdown-hide">
        ${kpidesignlabel}
    </ul>
</div>

<div class="dropdown">
  <a href="#" onclick="loadDataAndGeneratePDF()" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Generate Report" class="btn btn-sm btn-icon">
    <span class="btn btn-sm btn-icon"
          data-bs-toggle="dropdown"
          aria-expanded="false">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="file-text" style="width: 16px; height: 16px;" class="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
    </span>
  </a>
</div>
`;

    }

    var initiativeParentDeleteBtn = "";
    if (initiativedeletepermission == true) {
      initiativeParentDeleteBtn =
        ` <div class="dropdown">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis-vertical" style="width: 14px; height: 14px;" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                      <li>
                        <a class="dropdown-item" href="#">Download</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#" onclick="handleinitiativeevent(` +
        result.id +
        `, 'delete')">` +
        deleteHeader +
        `</a>
                      </li>
                    </ul>
                  </div>
                </div>`;
    }
    dept =
      result.initiativeValue.dept != undefined &&
      result.initiativeValue.dept != ""
        ? result.initiativeValue.dept
        : dept;
    var initdetail = {
      title: result.initiativeValue.name,
      Owner: Owner, // getownershortName
      chartHeader: chartHeader,
      id: result.id,
      status: result.initiativeValue.status,
      initiativeId:
        result.initiativeId == undefined || result.initiativeId == ""
          ? result.id
          : result.initiativeId,
      progressval: progressvalue,
      progressvalpercent: progressvalue + "%",
      totalval: totalcurrency,
      totalbalance: balancecurrency,
      impactDesc: impactDesc,
      scoreCardDetailDesc: result.initiativeValue.scoreCardDetailDesc,
      perspectiveName: result.initiativeValue.perspectiveName,
      objectiveDesc: result.initiativeValue.objectiveDesc,
      totalutilized: utilizedcurrency,
      intiativedaterange: daterangeformatted,
      endDateFormatted: endDateFormatted,
      startDateFormatted: startDateFormatted,
      diffdays: daysremaining + " days",
      actualValue: actualValue,
      initiativeStatus: initiativeStatus,
      initiativeReaction: initiativeReaction,
      targetValue: targetValue,
      budgetValue: budgetValue,
      forecastValue: forecastValue,
      userDept: dept,
      actualHeader: actualHeader,
      targetHeader: targetHeader,
      totalActualValue: result.initiativeValue.totalActual,
      totalBudgetValue: result.initiativeValue.totalBudget,
      budgetHeader: budgetHeader,
      totalassetbudgetHeader: result.initiativeValue.totalassetbudgetHeader,
      totalRealizationAssetHeader: totalRealizationAssetHeader,
      totalLiabilitiesBudgetHeader: totalLiabilitiesBudgetHeader,
      totalRealizationLiabilitiesHeader: totalRealizationLiabilitiesHeader,
      totalBudgetHeader: totalBudgetHeader,
      totalRealizationBudgetHeader: totalRealizationBudgetHeader,
      totalAssetBudgetRealization_percentHeader:
        totalAssetBudgetRealization_percentHeader,
      totalLiabilitiesRealization_percentHeader:
        totalLiabilitiesRealization_percentHeader,
      totalBudgetRealization_percentHeader:
        totalBudgetRealization_percentHeader,
      statusLight: result.initiativeValue.statusLight,
      forecastHeader: forecastHeader,
      totalBudgetHeader: totalBudgetHeader,
      totalActualHeader: totalActualHeader,
      totalHeader: totalHeader,
      balanceHeader: balanceHeader,
      utilizedHeader: utilizedHeader,
      dataField: dataField,
      kpidesignlabel: kpidesignlabel,
      displayStatusField: displayStatusField,
      displayDataField: displayDataField,
      totalfieldstauts: totalfieldstauts,
      utiliziedfieldstauts: utiliziedfieldstauts,
      balancefieldstauts: balancefieldstauts,
      actualheaderUpdate: actualheaderUpdate,
      targetheaderUpdate: targetheaderUpdate,
      targetValueUpdate: targetValueUpdate,
      budgetheaderUpdate: budgetheaderUpdate,
      forecastheaderUpdate: forecastheaderUpdate,
      initiativeParentEditBtn: initiativeParentEditBtn,
      initiativeParentuploadBtn: initiativeParentuploadBtn,
      initiativeParentviewBtn: initiativeParentviewBtn,
      initiativeParentDeleteBtn: initiativeParentDeleteBtn,
      actualfielddatafield: actualfielddatafield,
      targetfielddatafield: targetfielddatafield,
      budgetfielddatafield: budgetfielddatafield,
      forecastfielddatafield: forecastfielddatafield,
      totalBudgetfielddatafield: totalBudgetfielddatafield,
      totalActualfielddatafield: totalActualfielddatafield,
      totalassetbudgetdatafield: totalassetbudgetdatafield,
      totalRealizationAssetdatafield: totalRealizationAssetdatafield,
      totalRealizationLiabilitiesdatafield:
        totalRealizationLiabilitiesdatafield,
      totalBudgetdatafield: totalBudgetdatafield,
      totalRealizationBudgetdatafield: totalRealizationBudgetdatafield,
      totalAssetBudgetRealization_percentdatafield:
        totalAssetBudgetRealization_percentdatafield,
      totalLiabilitiesRealization_percentdatafield:
        totalLiabilitiesRealization_percentdatafield,
      totalLiabilitiesBudgetdatafield: totalLiabilitiesBudgetdatafield,
      totalBudgetRealization_percentdatafield:
        totalBudgetRealization_percentdatafield,
    };

    parentInitiativedetails.id = initdetail.id;
    parentInitiativedetails.owner = result.owner;
    parentInitiativedetails.pageId = result.pageId;
    parentInitiativedetails.createdBy = result.createdBy;
    parentInitiativedetails.impactId = result.impactId;
    parentInitiativedetails.initiativeValue = result.initiativeValue;
    parentInitiativedetails.initiativeId = result.initiativeId;
    //		localStorage.setItem('parent_initiative_details_'+initdetail.id, JSON.stringify(parentinitdetail));
    $("#initiative_details").html(template(initdetail));
    $(".removeamountdatafield").removeClass("first_amount");
    $(".removeamountdatafield>div>.amount").removeClass("amount");
    $(".removedisplaydatafield").removeClass("first_amount");
    $(".removedisplaydatafield>div>.amount").removeClass("amount");
    $('[rel="tooltip"]').tooltip();
    $('[data-toggle="tooltip"]').tooltip();
    $('.initiative_multi-column-dropdown input[type="checkbox"]').click(
      function () {
        var inputValue = $(this).attr("value");
        var checkedProp = $(this).is(":checked");
        inputValue = inputValue.replaceallstring();
        initiativeempPreference["pageName"] = "INITIATIVE";
        initiativeempPreference["pageId"] = initiativepageno;
        initiativeempPreference["preferences"][inputValue] = checkedProp;
        $.ajax({
          url: "/stratroom/employeePreference",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(initiativeempPreference),
          success: function (data, status) {},
          error: readErrorMsg,
        });
        $("." + inputValue).toggle();
      }
    );
    $(".initiativedropdown-hide").on("click", function (e) {
      e.stopPropagation();
    });

    $(".userprofileimage").initial({
      charCount: 2,
      height: 30,
      width: 30,
      fontSize: 18,
    });

    var bodyRows = "";
    var commentRows = "";
    var tasksRows = "";
    var attachmentsRows = "";
    var subActivityRows = "";
    var mileStoneRows = "";

    var subinitiativeProgressBar = "";
    // --- Render Sub-Initiatives ---

    $.each(result.subInitiativeList, function (i, subInitiative) {
      // 1. Extract sub-initiative data
      const subInitData = subInitiative.subInitiativeValue;
      const subInitId = subInitiative.id;
      const initiativeId = result.id;

      // 2. Format progress (ensure it's a number)
      const subInitProgress = subInitData.progressval || 0;

      // 3. Derive sub-initiative date range from first activity (if any)
      let subInitDateRange = "";
      if (
        subInitiative.activitiesList &&
        subInitiative.activitiesList.length > 0
      ) {
        const dates = subInitiative.activitiesList
          .map((act) => act.activitiesValue.dateRange)
          .filter(Boolean);
        if (dates.length) {
          subInitDateRange = formatDateRange(dates[0]);
        }
      }

      // 4. User avatars for sub-initiative
      const userContent = subinitiativePorfileContent(
        subInitiative.subInitiativesMapDTOList,
        subInitId,
        initiativeId,
        "subinitiatives"
      );

      // 5. Sub-initiative options dropdown
      let subInitOptions = "";
      if (subinieditpermission || subinideletepermission) {
        subInitOptions = `
      <div class="dropdown">
        <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis-vertical" style="width: 14px; height: 14px;" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
        </button>
        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;
        if (subinieditpermission) {
          subInitOptions +=
            `
        <li><a class="dropdown-item" href=".sub_activities_popup" data-bs-toggle="modal" 
               onclick="handleActivitiesEvent(${initiativeId}, '', 'add')">` +
            addActivityHeder +
            `</a></li>
        <li><a class="dropdown-item" href=".sub_initative_edit_popup" data-bs-toggle="modal" 
               onclick="handlesubinitiativeevent(${initiativeId}, ${subInitId}, 'edit')">` +
            editHeader +
            `</a></li>`;
        }
        if (subinideletepermission) {
          subInitOptions +=
            `<li><a class="dropdown-item delete-row" 
                         onclick="handlesubinitiativeevent(${initiativeId}, ${subInitId}, 'delete')">` +
            deleteHeader +
            `</a></li>`;
        }
        subInitOptions += `</ul></div>`;
      }

      // 6. Render ACTIVITIES (Level 2) and their SUB-ACTIVITIES (Level 3)
      let activitiesHtml = "";
      if (
        subInitiative.activitiesList &&
        subInitiative.activitiesList.length > 0
      ) {
        $.each(subInitiative.activitiesList, function (j, activity) {
          const actData = activity.activitiesValue;
          const actProgress = parseInt(actData.progress) || 0;
          const actDateRange = formatDateRange(actData.dateRange);
          const actUserContent = subinitiativePorfileContent(
            activity.activitiesMapDTOList,
            activity.id,
            initiativeId,
            "activities"
          );

          // === Render SUB-ACTIVITIES ===
          let subActivitiesHtml = "";
          if (activity.subActivityList && activity.subActivityList.length > 0) {
            $.each(activity.subActivityList, function (k, subAct) {
              const subActData = subAct.activitiesValue;
              const subActProgress = parseInt(subActData.progress) || 0;

              // Handle comma-separated dateRange: "10/20/2025,10/22/2025" → "10/20/2025 - 10/22/2025"
              let rawDate = subActData.dateRange || "";
              let normalizedDate = rawDate.includes(",")
                ? rawDate.replace(",", " - ")
                : rawDate;
              const subActDateRange = formatDateRange(normalizedDate);

              // Sub-activity options
              let subActOptions = "";
              if (activitieseditpermission || activitiesdeletepermission) {
                subActOptions = `
              <div class="dropdown">
                <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis-vertical" style="width: 14px; height: 14px;" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                </button>
                <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;
                if (activitieseditpermission) {
                  subActOptions +=
                    `
                <li><a class="dropdown-item" href=".update_subActivities_popup" data-bs-toggle="modal"
                       onclick="UpdateSubActivitiesEvent(${initiativeId}, ${subAct.id}, 'edit')">` +
                    editHeader +
                    `</a></li>`;
                }
                if (activitiesdeletepermission) {
                  subActOptions +=
                    `
                <li><a class="dropdown-item delete-row"
                       onclick="deleteSubActivitiesEvent(${initiativeId}, ${subAct.id}, 'delete')">` +
                    deleteHeader +
                    `</a></li>`;
                }
                subActOptions += `</ul></div>`;
              }

              // Render sub-activity using template
              subActivitiesHtml += Mustache.render(
                $("#sub-activity-template").html(),
                {
                  id: subAct.id,
                  title: subActData.desc || "Untitled Sub-Activity",
                  progress: subActProgress,
                  dateRange: subActDateRange,
                  subActivityUser: "", // Extend if you add owner mapping later
                  subActivityOptions: subActOptions,
                }
              );
            });
          }

          // === Activity Options ===
          let actOptions = "";
          if (activitieseditpermission || activitiesdeletepermission) {
            actOptions = `
          <div class="dropdown">
            <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis-vertical" style="width: 14px; height: 14px;" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
            </button>
            <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;
            if (activitieseditpermission) {
              actOptions +=
                `
            <li><a class="dropdown-item" href=".add_subActivities_popup" data-bs-toggle="modal"
                   onclick="handleSubActivitiesEvent(${result.id}, ${activity.id}, 'add')">Add Sub-Activity</a></li>
            <li><a class="dropdown-item" href=".sub_activities_popup" data-bs-toggle="modal"
                   onclick="handleActivitiesEvent(${initiativeId}, ${activity.id}, 'edit')">` +
                editHeader +
                `</a></li>`;
            }
            if (activitiesdeletepermission) {
              actOptions +=
                `<li><a class="dropdown-item delete-row"
                         onclick="handleActivitiesEvent(${initiativeId}, ${activity.id}, 'delete')">` +
                deleteHeader +
                `</a></li>`;
            }
            actOptions += `</ul></div>`;
          }
          $(".chart-pie").each(function (index) {
            const $chart = $(this);
            const rawPercent = $chart.data("percent");

            // Null or invalid check
            if (rawPercent === undefined || isNaN(rawPercent)) return;

            const percent = parseInt(rawPercent, 10);

            // Clamp percent between 0 and 100
            const validPercent = Math.max(0, Math.min(100, percent));

            // Determine color
            let color = "#1aa243"; // green
            if (validPercent < 75 && validPercent >= 40) {
              color = "orange";
            } else if (validPercent < 40) {
              color = "red";
            }

            // Render sparkline
            $chart.sparkline([validPercent, 100 - validPercent], {
              type: "pie",
              height: "24px",
              borderWidth: 1,
              borderColor: "#ddd",
              sliceColors: [color, "#ffffff"],
            });

            // Update percentage text (if exists)
            $chart.siblings(".pie-progress").text(validPercent + "%");
          });

          // Render activity
          // Render activity WITH sub-activities embedded in its collapsible body
          activitiesHtml += Mustache.render($("#activity-template").html(), {
            id: activity.id,
            title: actData.desc || "Untitled Activity",
            progress: actProgress,
            dateRange: actDateRange,
            activitieUser: actUserContent.userownerlist || "",
            activtiesOptions: actOptions,
            subActivitiesHtml: subActivitiesHtml, // ✅ Pass into template
          });
        });
      }

      // 7. Render SUB-INITIATIVE (Level 1)
      const subInitHtml = Mustache.render($("#subinitiative-template").html(), {
        id: subInitId,
        title: subInitData.description || "Untitled Sub-Initiative",
        progress: subInitProgress,
        dateRange: subInitDateRange,
        subinitiativeUser: userContent.userownerlist || "",
        subInitiativeOptions: subInitOptions,
        activitiesHtml: activitiesHtml,
      });

      // 8. Append to final output
      bodyRows += subInitHtml;
    });

    // Optional: Use parent template if needed (e.g., for full initiative wrapper)
    // var subInitiativeParenttemplate = $('#subinitiatives-template-parent').html();
    var subInitiativeParenttemplate = $(
      "#subinitiatives-template-parent"
    ).html();

    var subInitiativeCreateIcon = "";
    if (initiativecreatepermission == true) {
      subInitiativeCreateIcon =
        `<button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target=".sub_initative_edit_popup" onclick="handlesubinitiativeevent(` +
        result.id +
        `,'', 'add')">
                  <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="plus" style="width: 14px; height: 14px;" class="lucide lucide-plus"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                  </span>
                </button>`;
    }

    var subInitiativeInlineEditIcon =
      `<strong data-oldsubinitiativeHeader="` +
      subinitiativeHeader +
      `" id="subinitiativeHeader">` +
      subinitiativeHeader +
      `</strong>`;
    if (subinieditpermission == true) {
      subInitiativeInlineEditIcon =
        `<strong class="editableTxt1"
										onkeypress="return (this.innerText.length <= 25)"
										editable="true" data-oldsubinitiativeHeader="` +
        subinitiativeHeader +
        `" id="subinitiativeHeader">` +
        subinitiativeHeader +
        `</strong>`;
    }

    var subInitiativeParentOptions = "";
    if (subiniviewpermission == false) {
      subInitiativeParentOptions = "";
    } else {
      subInitiativeParentOptions = `  <div class="dropdown">
                  <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis-vertical" style="width: 14px; height: 14px;" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                   
                  `;

      if (subiniviewpermission == true) {
        subInitiativeParentOptions +=
          ` <li>
                      <a class="dropdown-item" href=".sub_initative_view_popup" data-bs-toggle="modal" onclick="subinitiatiesviewdetails(` +
          result.id +
          `,'initiative');">` +
          viewHeader +
          `</a>
                    </li>
					 <li>
                      <a class="dropdown-item" href="#" onclick="return false;">` +
          deleteHeader +
          `</a>
                    </li>`;
      }

      subInitiativeParentOptions += `</ul></div>`;
    }

    var htmlValue = Mustache.render(subInitiativeParenttemplate, {
      initiativeId: result.id,
      subinitiativeHeader: subinitiativeHeader,
      bodyRows: bodyRows,
      subInitiativeParentOptions: subInitiativeParentOptions,
      subInitiativeCreateIcon: subInitiativeCreateIcon,
      subInitiativeInlineEditIcon: subInitiativeInlineEditIcon,
    });
    if (subiniloadcontent) {
      $("#subinitiative_initial_template").html(htmlValue);
    }

    $(".progress-bar").each(function () {
      var $bar = $(this);
      var percent = parseFloat($bar.attr("aria-valuenow")) || 0;

      // Remove existing status classes
      $bar.removeClass("status-bg-green status-bg-yellow status-bg-red");

      // Apply class based on percent
      if (percent < 40) {
        $bar.addClass("status-bg-red");
      } else if (percent < 75) {
        $bar.addClass("status-bg-yellow");
      } else {
        $bar.addClass("status-bg-green");
      }
    });

    $(".chart-pie").each(function (index) {
      const $chart = $(this);
      const rawPercent = $chart.data("percent");

      // Null or invalid check
      if (rawPercent === undefined || isNaN(rawPercent)) return;

      const percent = parseInt(rawPercent, 10);

      // Clamp percent between 0 and 100
      const validPercent = Math.max(0, Math.min(100, percent));

      // Determine color
      let color = "#1aa243"; // green
      if (validPercent < 75 && validPercent >= 40) {
        color = "orange";
      } else if (validPercent < 40) {
        color = "red";
      }

      // Render sparkline
      $chart.sparkline([validPercent, 100 - validPercent], {
        type: "pie",
        height: "24px",
        borderWidth: 1,
        borderColor: "#ddd",
        sliceColors: [color, "#ffffff"],
      });

      // Update percentage text (if exists)
      $chart.siblings(".pie-progress").text(validPercent + "%");
    });
    function getBarColor(percent) {
      if (percent < 40) return "#dc3545"; // red
      if (percent < 75) return "#ffc107"; // yellow
      return "#28a745"; // green
    }

    document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll(".pie-prog").forEach((el) => {
        const percent = parseInt(el.getAttribute("data-percent"), 10);
        if (isNaN(percent)) return;

        el.style.borderTopColor = getBarColor(percent);

        const rotation = (percent / 100) * 360;
        el.style.transform = `rotate(${rotation - 90}deg)`;
      });
    });
    $.each(result.commentsList, function (index, comments) {
      var commentsRowTemplate = $("#comments-row-template").html();
      var commentsReplyRowTemplate = $("#commentsReply-row-template").html();
      var timeformatted = formatofAmPm(
        new Date(comments.commentsValue.formattedDateTime)
      );

      // Determine createdBy or updatedBy information
      var name =
        comments.commentsValue.createdByName ||
        comments.commentsValue.updatedByName;
      var commentsuser = comments.createdBy || comments.updatedBy;

      var title = comments.commentsValue.title || "";

      var getownershortName = name.slice(0, 2);
      var Owner = "data-name='" + getownershortName + "'";

      if (lookup != undefined && lookup != "") {
        var username = lookup[commentsuser + "name"] || "User";
        Owner = lookup[commentsuser + "image"]
          ? "class='rounded-circle' src='" +
            lookup[commentsuser + "image"] +
            "'"
          : "data-name='" +
            getownershortName +
            "' class='rounded-circle commentsuserimage'";
      }

      var commentsName = capitalizeFLetter(comments.commentsValue.desc || "");

      // Replace your existing commentsrowOptions block with:
var commentsrowOptions = "";
if (comeditpermission || comdeletepermission) {
    commentsrowOptions = generateInitiativeCommentOptions(
        comments, 
        comeditpermission, 
        comdeletepermission
    );
}

      var currentuserlike = comments.likeEmpIds || [];
      var likeText = currentuserlike.includes(
        Number(($("#userPrincipal").val() || "").trim())
      )
        ? "Unlike"
        : "Like";
      var likeTextclass = likeText === "Unlike" ? "green" : "";
      let commentsReplyCreateIcon =
        ` <input type="text"  data-id="` +
        result.id +
        `" name="commentsreply" id="commentsreply" class="form-control reply-input" placeholder="Write a reply..." autocomplete="off">
          <button class="btn btn-sm btn-primary reply-post" onclick="handleReplyCommentsSave(` +
        result.id +
        `,'add')">
            <i class="fas fa-arrow-right"></i>
          </button>`;

          // When preparing data for Mustache:
var rawDesc = comments.commentsValue.desc || "";
var escapedDesc = escapeHtml(rawDesc)
    .replace(/`/g, '\\`')      // Escape backticks for template literal
    .replace(/\$/g, '\\$')     // Escape $ for template literal
    .replace(/"/g, '&quot;')   // Escape quotes for HTML attribute
    .replace(/'/g, '&#039;');  // Escape single quotes

      // Render main comment
     var commentDetails = Mustache.render(commentsRowTemplate, {
    id: comments.id,
    initiativeId: result.id,
       commentsName: capitalizeFLetter(rawDesc),  // Display version
    escapedDesc: escapedDesc,   // ← Add this
    title: title,
    createdByName: name,
    Owner: Owner,
    likeText: likeText,
    likeTextclass: likeTextclass,
    count: comments.likeCount || 0,
    createdTime: timeformatted,
    commentsReplyCreateIcon: commentsReplyCreateIcon,
    commentsrowOptions: commentsrowOptions,
});

      var replyDetails = "";
      // Process replies
      if (comments.replyComments && comments.replyComments.length > 0) {
        $.each(comments.replyComments, function (replyIndex, reply) {
          console.log(reply, "reply");
          var replyTimeFormatted = formatofAmPm(
            new Date(reply.commentsValue.formattedDateTime)
          );
          var replyName =
            reply.commentsValue.createdByName ||
            reply.commentsValue.updatedByName;
          var replyShortName = replyName.slice(0, 2);
          var replyOwner = "data-name='" + replyShortName + "'";

          if (lookup != undefined && lookup != "") {
            replyOwner = lookup[reply.createdBy + "image"]
              ? "class='rounded-circle' src='" +
                lookup[reply.createdBy + "image"] +
                "'"
              : "data-name='" +
                replyShortName +
                "' class='rounded-circle commentsuserimage'";
          }

          var replyCommentsName = capitalizeFLetter(
            reply.commentsValue.desc || ""
          );

          // Generate options for reply
          var replyOptions = "";
          if (comeditpermission || comdeletepermission) {
            replyOptions = `<ul class="header-dropdown m-r--2 pt-2 d-flex">
											<li class="dropdown">
												<a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
													<i class="material-icons">more_vert</i>
												</a>
												<ul class="dropdown-menu editoptionparentdropdown-menu pull-right">
													${
                            comeditpermission
                              ? `<li><a href="#" data-toggle="modal" data-target=".kpi_commentsreply_popup" onclick="handleCommentsReplyPopup(${reply.initiativeId}, ${reply.id}, '${replyCommentsName}')">` +
                                editHeader +
                                `</a></li>`
                              : ""
                          }
													${
                            comdeletepermission
                              ? `<li><a href="#" onclick="handleCommentsSave(${result.id}, ${reply.id}, 'delete')">` +
                                deleteHeader +
                                `</a></li>`
                              : ""
                          }
												</ul>
											</li>
										</ul>`;
          }
          let commentsReplyCreateIcon =
            ` <input type="text"  data-id="` +
            result.id +
            `" name="commentsreply" id="commentsreply" class="form-control reply-input" placeholder="Write a reply..." autocomplete="off">
          <button class="btn btn-sm btn-primary reply-post" onclick="handleReplyCommentsSave(` +
            result.id +
            `,'add')">
            <i class="fas fa-arrow-right"></i>
          </button>`;
          // Render reply using the template
          replyDetails += Mustache.render(commentsReplyRowTemplate, {
            id: reply.id,
            initiativeId: reply.initiativeId,
            commentsName: replyCommentsName,
            title: reply.commentsValue.title || "",
            createdByName: replyName,
            Owner: replyOwner,
            likeText: "Like",
            likeTextclass: "",
            count: reply.likeCount || 0,
            createdTime: replyTimeFormatted,
            commentsReplyCreateIcon: commentsReplyCreateIcon,
            commentsrowOptions: replyOptions, // Attach options here
          });
        });
      }

      // Append replies to the main comment
      commentDetails += `<ul class="reply-comments">${replyDetails}</ul>`;
      commentRows += commentDetails;
    });

    var commentsinlineEditIcon = `<strong>` + commentsHeader + `</strong>`;
    if (comeditpermission == true) {
      commentsinlineEditIcon =
        `<strong class="editableTxt1"
				onkeypress="return (this.innerText.length <= 25)" data-oldcommentsHeader="` +
        commentsHeader +
        `" id="commentsHeader" editable="true">` +
        commentsHeader +
        `</strong>`;
    }

    var commentsCreateIcon = ``;
    if (comcreatepermission == true) {
      commentsCreateIcon =
        `<div class="comment_send">
	<form id="comments_Form">
	  <div id="initiativeCommentsBlock">
		<div class="form-group d-flex flex-row align-items-center">
			<div class="form-line">
				<input type="text" data-id="` +
        result.id +
        `" name="comments" id="comments" class="form-control"
					placeholder="Type a comment..." autocomplete="off"/>
			</div>
			<div class="send_btn" style="cursor:pointer;" onclick="handleCommentsSave(` +
        result.id +
        `,'add')">
				<i class="fas fa-arrow-right"></i>
			</div>
		</div>
		</div>
		`;
    }

    var commentsInitiativeOptions = "";
    if (comviewpermission == false) {
      commentsInitiativeOptions = "";
    } else {
      commentsInitiativeOptions = ` <div class="dropdown">
                  <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis-vertical" style="width: 14px; height: 14px;" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end">
                   
                  `;

      if (comviewpermission == true) {
        commentsInitiativeOptions +=
          ` <li>
                      <a href=".sub_comments_view_popup" class="dropdown-item" data-bs-toggle="modal"
                        onclick="commentsviewdetails(` +
          result.id +
          `)">
                        View
                      </a>
                    </li>`;
      }

      commentsInitiativeOptions += `</ul></div>`;
    }

    var commentsTemplate = $("#comments-template").html();
    var commentDetails = Mustache.render(commentsTemplate, {
      initiativeId: result.id,
      commentsHeader: commentsHeader,
      commentRows: commentRows,
      commentsCreateIcon: commentsCreateIcon,
      commentsinlineEditIcon: commentsinlineEditIcon,
      commentsInitiativeOptions: commentsInitiativeOptions,
    });
    if (comloadcontent) {
      $("#comments").html(commentDetails);
    }
    $(".commentsuserimage").initial({
      charCount: 2,
      height: 30,
      width: 30,
      fontSize: 18,
    });

    function getStatusClass(status) {
      if (!status) return "";
      switch (status.trim().toLowerCase()) {
        case "not started":
          return "status-bg-gray";
        case "in progress":
          return "status-bg-blue";
        case "completed":
          return "status-bg-green";
        case "delayed":
          return "status-bg-red";
        case "pending":
          return "status-bg-orange";
        case "on hold":
          return "status-bg-yellow";
        default:
          return "status-bg-gray";
      }
    }

    var chartcontent = [];
    var taskProgressBar = "";

    $.each(result.taskList, function (index, tasks) {
      console.log(tasks, "act");
      var taskRowTemplate = $("#tasks-row-template").html();
      var actdaterangeformatted = "";
      var startgantdate = "";
      var endgantdate = "";
      var startdate = "";
      var enddateformatted = "";
      var datestring = tasks.taskValue.dateRange;

      // Format date range
      if (datestring && datestring.includes("-")) {
        var dateval = datestring.split("-");
        startdate = dateval[0];
        enddateformatted = dateval[1];
        startgantdate = dateFormatedtohumanread(new Date(dateval[0]));
        endgantdate = dateFormatedtohumanread(new Date(dateval[1]));
        actdaterangeformatted =
          dateFormatedtohumanread(startdate) +
          " - " +
          dateFormatedtohumanread(enddateformatted);
      }

      var taskProgressval =
        tasks.taskValue.progress != undefined && tasks.taskValue.progress != ""
          ? tasks.taskValue.progress
          : "yellow_bar";
      var findprogressvalue =
        tasks.taskValue.statusLight != undefined &&
        tasks.taskValue.statusLight != ""
          ? tasks.taskValue.statusLight
          : "yellow_bar";
      var taskstatus =
        tasks.taskValue.status != undefined && tasks.taskValue.status != "";

      // Determine progress bar color
      if (findprogressvalue.search("bar_height") != -1) {
        taskProgressBar = "green_bar";
      } else if (findprogressvalue.search("yellow_bar") != -1) {
        taskProgressBar = "yellow_bar";
      } else if (findprogressvalue.search("orange_bar") != -1) {
        taskProgressBar = "orange_bar";
      }

      var chartvalue = parseInt(100) - parseInt(tasks.taskValue.progress);
      var chartbalance = tasks.taskValue.progress;
      if (chartvalue == 0) {
        chartbalance = 100;
      }

      var chartprocesstempname = "chart_orange" + index + " chart-pie" + index;
      chartcontent.push({
        index: index,
        chartbalance: chartbalance,
        chartvalue: chartvalue,
      });

      // Dropdown options
      var tasksOptions = "";
      if (taskseditpermission == false && tasksdeletepermission == false) {
        tasksOptions = "";
      } else {
        tasksOptions = `
      <div class="dropdown">
        <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis-vertical" style="width: 14px; height: 14px;" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
        </button>
        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;

        if (taskseditpermission == true) {
          tasksOptions +=
            `<li><a class="dropdown-item" href=".sub_tasks_popup" data-bs-toggle="modal" onclick="handleTasksEvent(${result.id}, ${tasks.id}, 'edit')">` +
            editHeader +
            `</a></li>`;
        }

        if (tasksdeletepermission == true) {
          tasksOptions +=
            `<li><a class="dropdown-item delete-row" onclick="handleTasksEvent(${result.id}, ${tasks.id}, 'delete')">` +
            deleteHeader +
            `</a></li>`;
        }

        tasksOptions += `</ul></div>`;
      }

      // ✅ Compute class before rendering
      var statusClass = getStatusClass(tasks.taskValue.status);

      // Render template
      var taskDetails = Mustache.render(taskRowTemplate, {
        id: tasks.id,
        Owner: tasks.createdByName,
        initiativeId: result.id,
        startenddate: actdaterangeformatted,
        tasksProgressBar: taskProgressBar,
        tasksProgressval: taskProgressval,
        tasksName: tasks.taskValue.desc,
        status: tasks.taskValue.status,
        statusClass: statusClass, // ✅ Add class here
        chartprocesstempname: chartprocesstempname,
        tasksProgress: tasks.taskValue.progress + "%",
        taskProgress: tasks.taskValue.progress,
        tasksOptions: tasksOptions,
      });

      tasksRows = tasksRows + taskDetails;
    });

    // Prepare header and buttons
    var tasksinlineEditIcon = `<strong>${tasksHeader}</strong>`;
    if (taskseditpermission == true) {
      tasksinlineEditIcon = `<strong class="editableTxt1"
    onkeypress="return (this.innerText.length <= 25)" id="tasksHeader"
    data-oldtasksHeader="${tasksHeader}" editable="true">${tasksHeader}</strong>`;
    }

    var tasksCreateIcon = "";
    if (taskscreatepermission == true) {
      tasksCreateIcon = `
    <button class="btn btn-sm btn-icon" data-bs-toggle="modal"
      data-bs-target=".sub_tasks_popup"
      onclick="handleTasksEvent(${result.id}, '', 'add')">
      <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="plus" style="width: 14px; height: 14px;" class="lucide lucide-plus"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
      </span>
    </button>`;
    }

    var tasksOptions = "";
    if (tasksviewpermission == false) {
      tasksOptions = "";
    } else {
      tasksOptions = `
    <div class="dropdown">
      <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis-vertical" style="width: 14px; height: 14px;" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
      </button>
      <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;

      if (tasksviewpermission == true) {
        tasksOptions +=
          `<li><a class="dropdown-item" href=".task_view_popup" data-bs-toggle="modal" onclick="tasksviewdetails(${result.id},'initiative');">` +
          viewHeader +
          `</a></li>`;
      }

      if (initiativedeletepermission == true) {
        tasksOptions +=
          `<li><a class="dropdown-item" href="#" onclick="return false;">` +
          deleteHeader +
          `</a></li>`;
      }

      tasksOptions += `</ul></div>`;
    }

    // Render final task block
    var tasksTemplate = $("#tasks-template").html();
    var tasksDetails = Mustache.render(tasksTemplate, {
      initiativeId: result.id,
      tasksHeader: tasksHeader,
      tasksRows: tasksRows,
      tasksCreateIcon: tasksCreateIcon,
      tasksinlineEditIcon: tasksinlineEditIcon,
      tasksOptions: tasksOptions,
    });

    // Append to DOM
    if (tasksloadcontent) {
      $("#tasks").html(tasksDetails);
    }

    $(".progress-bar").each(function () {
      var $bar = $(this);
      var percent = parseFloat($bar.attr("aria-valuenow")) || 0;

      // Remove existing status classes
      $bar.removeClass("status-bg-green status-bg-yellow status-bg-red");

      // Apply class based on percent
      if (percent < 40) {
        $bar.addClass("status-bg-red");
      } else if (percent < 75) {
        $bar.addClass("status-bg-yellow");
      } else {
        $bar.addClass("status-bg-green");
      }
    });

    var tasksinlineEditIcon = `<strong>` + tasksHeader + `</strong>`;
    if (taskseditpermission == true) {
      tasksinlineEditIcon =
        `<strong class="editableTxt1"
				onkeypress="return (this.innerText.length <= 25)" id="tasksHeader" data-oldtasksHeader="` +
        tasksHeader +
        `" editable="true">` +
        tasksHeader +
        `</strong>`;
    }

    var tasksCreateIcon = "";
    if (taskscreatepermission == true) {
      tasksCreateIcon =
        ` <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target=".sub_tasks_popup" onclick="handleTasksEvent(` +
        result.id +
        `,'', 'add')">
                  <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="plus" style="width: 14px; height: 14px;" class="lucide lucide-plus"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                  </span>
                </button>`;
    }

    var tasksOptions = "";
    if (tasksviewpermission == false) {
      tasksOptions = "";
    } else {
      tasksOptions = `<div class="dropdown">
                  <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis-vertical" style="width: 14px; height: 14px;" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;

      if (tasksviewpermission == true) {
        tasksOptions +=
          ` <li>
                      <a class="dropdown-item" href=".task_view_popup" data-bs-toggle="modal" onclick="tasksviewdetails(` +
          result.id +
          `,'initiative');">` +
          viewHeader +
          `</a>
                    </li>`;
      }

      if (initiativedeletepermission == true) {
        tasksOptions +=
          `<li>
                      <a class="dropdown-item" href="#" onclick="return false;">` +
          deleteHeader +
          `</a>
                    </li>`;
      }

      tasksOptions += `</ul></div>`;
    }

    var tasksTemplate = $("#tasks-template").html();
    var tasksDetails = Mustache.render(tasksTemplate, {
      initiativeId: result.id,
      tasksHeader: tasksHeader,
      tasksRows: tasksRows,
      tasksCreateIcon: tasksCreateIcon,
      tasksinlineEditIcon: tasksinlineEditIcon,
      tasksOptions: tasksOptions,
    });
    if (tasksloadcontent) {
      $("#tasks").html(tasksDetails);
    }

    $(".initiativeuserimage").initial({
      charCount: 2,
      height: 30,
      width: 30,
      fontSize: 18,
    });

    initiativegrattChart(
      initdetail,
      result,
      progressvalue,
      "initiativeview",
      activitiesganttchart
    );

    var milestoneProgressBar = "";
    $.each(result.mileStonesList, function (index, milestones) {
      var mileStoneRowTemplate = $("#milestones-row-template").html();
      var mileStondaterangeformatted = "";
      var datestring = milestones.mileStonesValue.dateRange;

      if (milestones.mileStonesValue.dateRange.indexOf("-") != -1) {
        var splitdatestring = milestones.mileStonesValue.dateRange.split("-");
        datestring =
          splitdatestring[1] != undefined
            ? splitdatestring[1]
            : splitdatestring[0];
      }

      var enddateformatted = new Date(datestring);
      var milstoneProgressval =
        milestones.mileStonesValue.progress != undefined &&
        milestones.mileStonesValue.progress != ""
          ? milestones.mileStonesValue.progress
          : "yellow_bar";

      var findprogressvalue =
        milestones.mileStonesValue.statusLight != undefined &&
        milestones.mileStonesValue.statusLight != ""
          ? milestones.mileStonesValue.statusLight
          : "yellow_bar";

      var milestoneProgressBar = "yellow_bar";
      if (findprogressvalue.search("bar_height") != -1) {
        milestoneProgressBar = "green_bar";
      } else if (findprogressvalue.search("yellow_bar") != -1) {
        milestoneProgressBar = "yellow_bar";
      } else if (findprogressvalue.search("orange_bar") != -1) {
        milestoneProgressBar = "orange_bar";
      }

      var milestonerowOptions = "";
      if (
        milestoneeditpermission == false &&
        milestonedeletepermission == false
      ) {
        milestonerowOptions = "";
      } else {
        milestonerowOptions = ` 
      <div class="dropdown">
        <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis-vertical" style="width: 14px; height: 14px;" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
        </button>
        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;

        if (milestoneeditpermission == true) {
          milestonerowOptions +=
            ` 
        <li>
          <a class="dropdown-item" href=".sub_milestone_popup" data-bs-toggle="modal" onclick="handleMileStonesEvent(${result.id}, ${milestones.id}, 'edit')">` +
            editHeader +
            `</a>
        </li>`;
        }

        if (milestonedeletepermission == true) {
          milestonerowOptions +=
            ` 
        <li>
          <a class="dropdown-item" onclick="handleMileStonesEvent(${result.id}, ${milestones.id}, 'delete')">` +
            deleteHeader +
            `</a>
        </li>`;
        }

        milestonerowOptions += `</ul></div>`;
      }

      mileStondaterangeformatted = dateFormatedtohumanread(enddateformatted);

      var statusClass = getStatusClass(milestones.mileStonesValue.status);

      var mileStoneDetails = Mustache.render(mileStoneRowTemplate, {
        id: milestones.id,
        initiativeId: result.id,
        desc: capitalizeFLetter(milestones.mileStonesValue.desc),
        milestoneProgressBar: milestoneProgressBar,
        milstoneProgressval: milstoneProgressval,
        statusLight: milestones.mileStonesValue.statusLight,
        mileStoneProgress: milestones.mileStonesValue.progress + "%",
        mileProgress: milestones.mileStonesValue.progress,
        date: mileStondaterangeformatted,
        status: milestones.mileStonesValue.status,
        statusClass: statusClass,
        milestonerowOptions: milestonerowOptions,
      });

      mileStoneRows = mileStoneRows + mileStoneDetails;
    });
    var milestoneinlineEditIcon = `<strong>` + miletoneHeader + `</strong>`;
    if (milestoneeditpermission == true) {
      milestoneinlineEditIcon =
        `<strong class="editableTxt1"
				onkeypress="return (this.innerText.length <= 25)" id="miletoneHeader" data-oldmiletoneHeader="` +
        miletoneHeader +
        `" editable="true">` +
        miletoneHeader +
        `</strong>`;
    }

    var milestoneCreateIcon = ``;
    if (milestonecreatepermission == true) {
      milestoneCreateIcon =
        ` <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target=".sub_milestone_popup" onclick="handleMileStonesEvent(` +
        result.id +
        `,'', 'add')">
                  <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="plus" style="width: 14px; height: 14px;" class="lucide lucide-plus"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                  </span>
                </button>`;
    }

    var mileInitiativeOptions = "";
    if (milestoneviewpermission == false) {
      mileInitiativeOptions = "";
    } else {
      mileInitiativeOptions = `    <div class="dropdown">
                  <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis-vertical" style="width: 14px; height: 14px;" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;

      if (milestoneviewpermission == true) {
        mileInitiativeOptions +=
          ` <li>
                      <a class="dropdown-item" href=".sub_milestone_view_popup" data-bs-toggle="modal" onclick="milstoneviewdetails(` +
          result.id +
          `)">` +
          viewHeader +
          `</a>
                    </li>`;
      }

      if (initiativedeletepermission == true) {
        mileInitiativeOptions +=
          ` <li>
                      <a class="dropdown-item" href="#" onclick="return false;">` +
          deleteHeader +
          `</a>
                    </li>`;
      }

      mileInitiativeOptions += `</ul></div>`;
    }

    var mileStoneTemplate = $("#milestones-template").html();
    var mileStoneDetail = Mustache.render(mileStoneTemplate, {
      initiativeId: result.id,
      miletoneHeader: miletoneHeader,
      mileStoneRows: mileStoneRows,
      milestoneCreateIcon: milestoneCreateIcon,
      milestoneinlineEditIcon: milestoneinlineEditIcon,
      mileInitiativeOptions: mileInitiativeOptions,
    });
    if (milestoneloadcontent) {
      $("#milestones").html(mileStoneDetail);
    }

    $(".progress-bar").each(function () {
      var $bar = $(this);
      var percent = parseFloat($bar.attr("aria-valuenow")) || 0;

      // Remove existing status classes
      $bar.removeClass("status-bg-green status-bg-yellow status-bg-red");

      // Apply class based on percent
      if (percent < 40) {
        $bar.addClass("status-bg-red");
      } else if (percent < 75) {
        $bar.addClass("status-bg-yellow");
      } else {
        $bar.addClass("status-bg-green");
      }
    });
    $.each(result.attachmentList, function (index, attachments) {
      console.log(attachments, "act");
      var attachmentsTemplate = $("#attachments-row-template").html();
      // var actdaterangeformatted = ""
      // var startgantdate = "";
      // var endgantdate = "";
      // var startdate = "";
      // var enddateformatted = "";
      // var datestring = tasks.taskValue.dateRange
      // if (datestring && datestring.includes("-")) {
      // 	var dateval = datestring.split('-');
      // 	var startdate = dateval[0];
      // 	var enddateformatted = dateval[1];
      // 	startgantdate = dateFormatedtohumanread(new Date(dateval[0]));
      // 	endgantdate = dateFormatedtohumanread(new Date(dateval[1]));
      // 	actdaterangeformatted = dateFormatedtohumanread(startdate) + '- ' + dateFormatedtohumanread(enddateformatted);
      // }

      // var chartvalue = parseInt(100) - parseInt(tasks.taskValue.progress);
      // var chartbalance = tasks.taskValue.progress;
      // if (chartvalue == 0) {
      // 	chartbalance = 100;
      // }

      // var chartprocesstempname = "chart_orange" + index + " chart-pie" + index;
      // chartcontent.push({ "index": index, "chartbalance": chartbalance, "chartvalue": chartvalue });
var Download ="Download";
      var attachmentsOptions = "";
      if (
        attachmentseditpermission == false &&
        attachmentsdeletepermission == false
      ) {
        attachmentsOptions = "";
      } else {
        attachmentsOptions = ` <div class="dropdown">
                      <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown"
                        aria-expanded="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis-vertical" style="width: 14px; height: 14px;" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                      </button>
                      <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;

        // if (attachmentseditpermission == true) {
        // 	attachmentsOptions += `<li>
        //           <a class="dropdown-item" href=".sub_attachments_popup" data-bs-toggle="modal" onclick="handleattachmentsEvent(`+ result.id + `,` + attachments.id + `, 'edit')">`+editHeader+`</a>
        //         </li>`;
        // }
        console.log(attachments,"attachmentsss")
    if (attachmentsdeletepermission == true) {
  attachmentsOptions +=
    `<li><a class="dropdown-item download-link" 
            data-unique-key="${attachments.uniqueFileReference}" 
            data-file-name="${encodeURIComponent(attachments.fileName)}" 
        data-file-type="${attachments.type}" style="cursor: pointer">Download</a></li>` +
    `<li><a class="dropdown-item" onclick="handleattachmentsEvent(${result.id}, ${attachments.id}, 'delete')" style="cursor: pointer">` +
    deleteHeader +
    `</a></li>`;
}

        attachmentsOptions += `</ul></div>`;
      }

      // var resultPorfileContent = subinitiativePorfileContent(attachments.activitiesMapDTOList, attachments.id, result.id, 'attachments');
      var attachmentsDetails = Mustache.render(attachmentsTemplate, {
        id: attachments.id,
        Owner: attachments.createdByName,
        initiativeId: result.id,
        attachmentsName: attachments.name,
        fileName: attachments.fileName,
        attachmentsOptions: attachmentsOptions,
      });
      console.log("demo");
      attachmentsRows = attachmentsRows + attachmentsDetails;
    });

    var attachmentsinlineEditIcon = `<strong>` + attachmentHeader + `</strong>`;
    if (attachmentseditpermission == true) {
      attachmentsinlineEditIcon =
        `<strong class="editableTxt1"
				onkeypress="return (this.innerText.length <= 25)" data-oldattachmentHeader="` +
        attachmentHeader +
        `" editable="true">` +
        attachmentHeader +
        `</strong>`;
    }

    var attachmentsCreateIcon = "";
    if (attachmentscreatepermission == true) {
      attachmentsCreateIcon = `<button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target=".file_upload_popup">
                  <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="plus" style="width: 14px; height: 14px;" class="lucide lucide-plus"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                  </span>
                </button>`;
    }

    var attachmentsOptions = "";
    if (attachmentsviewpermission == false) {
      attachmentsOptions = "";
    } else {
      attachmentsOptions = ` <div class="dropdown">
                  <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis-vertical" style="width: 14px; height: 14px;" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;

      if (attachmentsviewpermission == true) {
        attachmentsOptions +=
          ` <li>
                      <a class="dropdown-item" href=".attachment_view_popup" data-bs-toggle="modal"
                         onclick="attachmentviewdetails(` +
          result.id +
          `,'initiative');">` +
          viewHeader +
          `</a>
                    </li>`;
      }

      if (initiativedeletepermission == true) {
        attachmentsOptions +=
          `<li><a class="dropdown-item" href="#" onclick="return false;">` +
          deleteHeader +
          `</a>
                    </li>`;
      }

      attachmentsOptions += `</ul></div>`;
    }

    var attachmentsTemplate = $("#attachments-template").html();
    var attachmentsDetails = Mustache.render(attachmentsTemplate, {
      initiativeId: result.id,
      attachmentHeader: attachmentHeader,
      attachmentsRows: attachmentsRows,
      attachmentsCreateIcon: attachmentsCreateIcon,
      attachmentsinlineEditIcon: attachmentsinlineEditIcon,
      attachmentsOptions: attachmentsOptions,
    });
    if (attachmentsloadcontent) {
      $("#attachments").html(attachmentsDetails);
    }

    $(".initiativeuserimage").initial({
      charCount: 2,
      height: 30,
      width: 30,
      fontSize: 18,
    });
    jQueryEditable($(".editableTxt"));
    jQueryEditable($(".editableTxt1"));

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

    $(".date_pickers").datepicker({
      language: "en",
      minDate: new Date(),
      range: true,
      autoClose: true,
      position: "top left",
      todayButton: true,
      onSelect: function (fd) {
        // $('.datepickers-container').hide();
      },
    });

    $("#chat_user").slimscroll({
      height: "590px",
      size: "3px",
      color: "#9c9c9c",
    });

    $(".chart_yellow.chart-pie").sparkline([50, 50], {
      type: "pie",
      height: "30px",
      sliceColors: ["#ffd500", "#ffffff"],
    });

    $(".chart_green.chart-pie").sparkline([85, 15], {
      type: "pie",
      height: "30px",
      sliceColors: ["#1aa243", "#ffffff"],
    });

    $.each(chartcontent, function (index1, value1) {
      if (value1.chartbalance == 100) {
        $(".chart_orange" + index1 + ".chart-pie" + index1).sparkline(
          [value1.chartbalance, value1.chartvalue],
          {
            type: "pie",
            height: "30px",
            sliceColors: ["#1aa243", "#ffffff"],
          }
        );
      } else {
        $(".chart_orange" + index1 + ".chart-pie" + index1).sparkline(
          [value1.chartbalance, value1.chartvalue],
          {
            type: "pie",
            height: "30px",
            sliceColors: ["#ffd500", "#ffffff"],
          }
        );
      }
    });

    $(
      "#sub-ini-box_view, #activities-box_view, #milestone_view, #plan_box_views, #activities-box_risk_view, #monitoring-box_risk_view, #my_initative_view, #goals_box_view, #my_kpi_view"
    ).slimscroll({
      height: "450px",
      size: "3px",
      color: "#9c9c9c",
    });

    $("#comment-conversation_employee").slimscroll({
      height: "340px",
      size: "3px",
      color: "#9c9c9c",
    });

    if (initiativecreatepermission == false) {
      $("#comment-conversation").slimscroll({
        height: "324px",
        size: "3px",
        color: "#9c9c9c",
      });
    }
    if (initiativecreatepermission == true) {
      $("#comment-conversation").slimscroll({
        height: "282px",
        size: "3px",
        color: "#9c9c9c",
      });
    }

    $(".milestones-box, .sub-ini-box, .activities-box").slimscroll({
      height: "340px",
      size: "3px",
      color: "#9c9c9c",
    });

    $("[class^=chart_orange]")
      .children(":first-child")
      .css("border", "1px solid #c7c7c7")
      .css("border-radius", "50%");
  }

  $(".imgprofile")
    .filter(function () {
      return $(this).attr("src") == undefined || "";
    })
    .initial({
      charCount: 2,
      height: 30,
      width: 30,
      fontSize: 18,
    });
  let currentLanguage = localStorage.getItem("selectedLang") || "en";

  loadTranslations(currentLanguage); // Apply translations when DOM changes
}
document.addEventListener('click', function(e) {
  const downloadLink = e.target.closest('.download-link');
  
  if (downloadLink) {
    e.preventDefault();
    
    const uniqueKey = downloadLink.dataset.uniqueKey;
    const fileName = downloadLink.dataset.fileName;
    const fileType = downloadLink.dataset.fileType;
    
    handleattachmentsDownload(uniqueKey, fileName, fileType);
  }
});

function handleattachmentsDownload(uniqueKey, fileName, fileType) {
  var downloadUrl = '/stratroom/initiative/download?' +
      'uniqueKey=' + encodeURIComponent(uniqueKey) +
      '&fileName=' + encodeURIComponent(fileName) +
      '&fileType=' + encodeURIComponent(fileType);
  
  // ✅ Open in new tab
  window.open(downloadUrl, '_blank');
}
function renderPieCharts() {
  $(".chart-pie").each(function () {
    const $chart = $(this);
    const percent = Math.max(
      0,
      Math.min(100, parseInt($chart.data("percent")) || 0)
    );

    let color = "#28a745";
    if (percent < 75 && percent >= 40) color = "#ffc107";
    else if (percent < 40) color = "#dc3545";

    $chart.sparkline([percent, 100 - percent], {
      type: "pie",
      height: "30px",
      width: "30px",
      sliceColors: [color, "#e9ecef"],
    });
    $chart.find(".pie-percent").text(percent + "%");
  });
}

function subinitiativePorfileContent(usersimg, resultId, InitiativeID, type) {
  var subinitiativeUser = "";
  var returnresult = [];
  var functionParams = resultId + "," + InitiativeID + "," + '"edit"';
  var functionName = "";
  var modalPopupName = "";
  var profileBadgeIncrement =
    usersimg.length >= 3 ? parseInt(usersimg.length) - parseInt(2) : 0;
  var userseslectedData = [];
  $.each(usersimg, function (index, users) {
    if (
      users.employeeProfilePos.empId != undefined &&
      users.employeeProfilePos.empId != 0
    ) {
      userseslectedData.push(users.employeeProfilePos.empId);
    }
  });

  if (userseslectedData.length == 0) {
    var users = topparentinitiativeDetails;
    userseslectedData.push(users.id);
  }

  if (type == "activities") {
    var htmlcontent =
      '<input type="hidden" value="' +
      userseslectedData.join(",") +
      '" id="activities_selected_user_' +
      resultId +
      '">';
    returnresult["userownerlist_data"] = htmlcontent;
    functionName = "handleinitiativeActivitiesuserevent";
    modalPopupName = ".activities_add_user_popup";
  } else {
    var htmlcontent =
      '<input type="hidden" value="' +
      userseslectedData.join(",") +
      '" id="initiatities_selected_user_' +
      resultId +
      '">';
    returnresult["userownerlist_data"] = htmlcontent;
    functionName = "handlesubinitiativeuserevent";
    modalPopupName = ".sub_initative_add_user_popup";
    // localStorage.setItem('sub_initiative_owneruser_'+resultId,
    // JSON.stringify(userseslectedData));
  }

  if (usersimg.length != 0) {
    $.each(usersimg, function (index, users) {
      var username = users.employeeProfilePos.firstName.slice(0, 2);
      if (username == "" || username == " ") {
        username = "User";
      }

      var userProfileConcate =
        users.employeeProfilePos.profileImage == undefined ||
        users.employeeProfilePos.profileImage == ""
          ? 'data-name="' +
            username +
            ' class="rounded-circle initiativeuserimage" '
          : ' class="rounded-circle" src="' +
            users.employeeProfilePos.profileImage +
            '"';
      if (usersimg.length == 1) {
        subinitiativeUser +=
          '<li class="avatar avatar-sm selecteduser" style="height:24px;"><a href="#" data-toggle="modal" data-target="' +
          modalPopupName +
          '" style="margin-top:-2px;" onclick=' +
          functionName +
          "(" +
          functionParams +
          ')><img class="rounded-circle sub_init_img initiativeuserimage" ' +
          userProfileConcate +
          ' alt="' +
          username +
          '" width="50"></a></li>';
        return false;
      }
      subinitiativeUser +=
        '<li class="avatar avatar-sm selecteduser"><img class="rounded-circle sub_init_img initiativeuserimage" ' +
        userProfileConcate +
        ' alt="' +
        username +
        '" width="50"></li>';
      if (usersimg.length == 2 && index > 0) {
        subinitiativeUser = subinitiativeUser.replace(
          '<li class="avatar avatar-sm selecteduser"><img class="rounded-circle sub_init_img initiativeuserimage" ' +
            userProfileConcate +
            ' alt="' +
            username +
            '" width="50"></li>',
          ""
        );
        subinitiativeUser +=
          '<li class="avatar avatar-sm selecteduser"><a href="#" data-toggle="modal" data-target="' +
          modalPopupName +
          '" onclick=' +
          functionName +
          "(" +
          functionParams +
          ')><img class="rounded-circle sub_init_img initiativeuserimage" ' +
          userProfileConcate +
          ' alt="' +
          username +
          '" width="50"></a></li>';
        return false;
      }
      if (usersimg.length >= 3 && index >= 2) {
        subinitiativeUser = subinitiativeUser.replace(
          '<li class="avatar avatar-sm selecteduser"><img class="rounded-circle sub_init_img initiativeuserimage" ' +
            userProfileConcate +
            ' alt="' +
            username +
            '" width="50"></li>',
          ""
        );
        subinitiativeUser +=
          '<li class="avatar avatar-sm selecteduser"><a href="#" data-toggle="modal" data-target="' +
          modalPopupName +
          '" onclick=' +
          functionName +
          "(" +
          functionParams +
          ')><span _ngcontent-hhc-c5="" class="badge">+' +
          profileBadgeIncrement +
          "</span></a></li>";
        return false;
      }
    });
  } else {
    var users = topparentinitiativeDetails;
    var username =
      users.name == undefined || users.name == "" ? "User" : users.name;
    var userProfileConcate =
      users.image == undefined || users.image == ""
        ? "data-name='" +
          username +
          "' class='rounded-circle initiativeuserimage' "
        : " class='rounded-circle' src='" + users.image + "'";
    subinitiativeUser =
      '<li class="avatar avatar-sm selecteduser"><a href="#" data-toggle="modal" data-target="' +
      modalPopupName +
      '" onclick=' +
      functionName +
      "(" +
      functionParams +
      ')><img class="rounded-circle sub_init_img initiativeuserimage" ' +
      userProfileConcate +
      ' alt="' +
      username +
      '" width="50"></a></li>';
  }
  returnresult["userownerlist"] = subinitiativeUser;
  return returnresult;
}

function fetchinitiatives() {
  var pageno = $("#pagenumber").val();
  const storedLanguage = localStorage.getItem("selectedLang") || "en";
  loadLanguage(storedLanguage);

  if (pageno != undefined) {
    $.ajax({
      url:"/stratroom/initiativesList?loadFlag=true&pageId="+pageno +"&status=date",
      async: false,
      success: initiativesSuccessCallback,
      //error:readErrorMsg
    });
  }
}

function initiativedetail(id) {
  activitiesganttchart = [];
  localStorage.setItem("initiative_pagenumber", id);
  $(".sub_initiative_sidebar_details").removeClass(
    "initiativeSidebarHighLight"
  );
  $(".sidebareventId" + id).addClass("initiativeSidebarHighLight");

  $.ajax({
    url: "/stratroom/initiatives/" + id + "?loadFlag=true",
    success: function (data) {
      initiativeddescSuccessCallback(data, id);
    },
  });
}

function subinitiatiesviewdetails(id, type) {
  $("#inisubinitviewheader").text($("#subinitiativeHeader").text());
  $(".sub_initative_view_popup").modal("toggle");
  $("#subinitiaties-row-box_view").html("");
  $("#subinitiaties-row-box_view").html(
    '<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>'
  );
  var url = "";
  if (type == "employee") {
    url = "/stratroom/activities/initiativeDetailsList";
  } else {
    url = "/stratroom/initiatives/" + id + "?loadFlag=true";
  }
  $.ajax({
    url: url,
    success: function (result) {
      subinitiatiesrecordsviewSuccessCallback(result, type);
    },
    error: function (msg, status) {
      if (!jQuery.isEmptyObject(msg.responseText)) {
        var errorparse = JSON.parse(msg.responseText);
        if (errorparse.status == "404") {
          $(element).html("");
          $(element).html(errorparse.error);
        } else {
          $(element).html("");
          $(element).html(errorparse.error);
        }
      }
    },
  });
}

function subinitiatiesrecordsviewSuccessCallback(result, type) {
  var defaultreporteelist = {};
  $.each(reporteelist, function (ownkey, empvalue) {
    if (empvalue.id == result.owner) {
      defaultreporteelist = {
        id: empvalue.id,
        name: empvalue.name,
        image: empvalue.image,
      };
      return false;
    }
  });

  var accordionItems = "";
  var currentresult =
    type == "employee" ? result.subInitiativeList : result.subInitiativeList;

  $.each(currentresult, function (index, subinitiatives) {
    var subIniProgressvalue =
      subinitiatives.subInitiativeValue.progressval || "0";
    var subdaterangeformatted = "";
    var datestring = subinitiatives.subInitiativeValue.dateRange;

    if (datestring && datestring.includes("-")) {
      var dateval = datestring.split("-");
      var startdate = new Date(dateval[0]);
      var enddateformatted = new Date(dateval[1]);
      subdaterangeformatted =
        dateFormatedtohumanread(startdate) +
        " - " +
        dateFormatedtohumanread(enddateformatted);
    }

    var resultPorfileContent = subinitiatiesPorfileFormation(
      subinitiatives.subInitiativesMapDTOList,
      defaultreporteelist,
      "subinitiativesview"
    );
    var findprogressvalue =
      subinitiatives.subInitiativeValue.statusLight || "yellow_bar";

    // Determine status class based on progress
    var statusClass = "bg-warning"; // default
    if (findprogressvalue.includes("bar_height")) {
      statusClass = "bg-success";
    } else if (findprogressvalue.includes("orange_bar")) {
      statusClass = "bg-danger";
    }

    var title = subinitiatives.subInitiativeValue.description || "";

    // Build accordion item
    accordionItems += `
            <div class="accordion-item">
                <div class="accordion-header bg-primary" style="--stratroom-bg-opacity:0.04">
                    <div class="d-flex justify-content-between p-2 gap-1">
                        <button class="btn p-0 btn-title justify-content-start" data-bs-toggle="collapse"
                            data-bs-target="#subinitiative-collapse-${index}" aria-expanded="false"
                            aria-controls="subinitiative-collapse-${index}">
                            <div class="row row-cols-1 g-2">
                                <span class="col mb-0">${title}</span>
                            </div>
                        </button>
                        <div class="list-actions">
                            <div class="d-flex align-items-start">
                                <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
                                    ${resultPorfileContent}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="p-2 d-flex flex-column gap-1 w-100">
                        <div class="progress-wrap ${statusClass.replace(
                          "bg-",
                          ""
                        )}">
                            <div class="progress flex-grow-1" style="--stratroom-bg-opacity:1">
                                <div class="progress-bar progress-bar-striped rounded-pill ${statusClass}" 
                                    role="progressbar"
                                    style="width: ${subIniProgressvalue}%" 
                                    data-percent="${subIniProgressvalue}"
                                    aria-valuenow="${subIniProgressvalue}" 
                                    aria-valuemin="0" 
                                    aria-valuemax="100">
                                </div>
                            </div>
                            <span class="badge">${subIniProgressvalue}%</span>
                        </div>
                        <div class="text-muted">${subdaterangeformatted}</div>
                    </div>
                </div>
                
            </div>
        `;
  });

  $("#subinitiaties-row-box_view").html(`
        <div id="accordionSubInitiative" class="accordion accordion-flush-initiative accordion-custom accordion-collopse-content">
            ${accordionItems}
        </div>
    `);

  // Initialize any plugins if needed
  $(".initiativeviewuserimage").initial({
    charCount: 2,
    height: 30,
    width: 30,
    fontSize: 18,
  });

  // Initialize tooltips for avatars
  $('[data-bs-toggle="tooltip"]').tooltip();
}

function subinitiatiesPorfileFormation(usersimg, defaultreporteelist, type) {
  var subinitiativeUser = "";
  var profileBadgeIncrement =
    usersimg.length >= 3 ? parseInt(usersimg.length) - parseInt(2) : 0;
  if (usersimg.length != 0) {
    var badgeinc = false;
    $.each(usersimg, function (index, users) {
      var username = users.employeeProfilePos.firstName.slice(0, 2);

      if (username == "" || username == " ") {
        username = "User";
      }
      var userProfileConcate =
        users.employeeProfilePos.profileImage == undefined ||
        users.employeeProfilePos.profileImage == ""
          ? 'data-name="' +
            username +
            ' class="rounded-circle initiativeviewuserimage" '
          : ' class="rounded-circle" src="' +
            users.employeeProfilePos.profileImage +
            '"';

      if (usersimg.length != 1 || usersimg.length != 2) {
        subinitiativeUser +=
          '<li class="avatar avatar-sm selecteduser"><img class="rounded-circle initiativeviewuserimage"' +
          userProfileConcate +
          ' alt="' +
          username +
          '" width="50"></li>';
      }
      if (usersimg.length == 1) {
        subinitiativeUser =
          '<li class="avatar avatar-sm selecteduser"><img class="rounded-circle initiativeviewuserimage"' +
          userProfileConcate +
          ' alt="' +
          username +
          '" width="50"></li>';
        return false;
      }

      if (usersimg.length == 2) {
        subinitiativeUser +=
          '<li class="avatar avatar-sm selecteduser"><img class="rounded-circle initiativeviewuserimage"' +
          userProfileConcate +
          ' alt="' +
          username +
          '" width="50"></li>';
        return false;
      }
      if (usersimg.length >= 3 && index >= 2 && index <= 2) {
        badgeinc = true;
        subinitiativeUser = subinitiativeUser.replace(
          '<li class="avatar avatar-sm selecteduser"><img class="rounded-circle initiativeviewuserimage"' +
            userProfileConcate +
            ' alt="' +
            username +
            '" width="50"></li>',
          ""
        );
        return false;
      }
    });
    if (badgeinc == true) {
      if (type == "ganttchartview" || type == "subinitiativesview") {
        subinitiativeUser =
          subinitiativeUser +
          '<li class="avatar avatar-sm selecteduser"><a href="#"><span _ngcontent-hhc-c5="" class="badge" style="height:28px;line-height:28px;width:28px;">+' +
          profileBadgeIncrement +
          "</span></a></li>";
      } else {
        subinitiativeUser =
          subinitiativeUser +
          '<li class="avatar avatar-sm selecteduser"><a href="#"><span _ngcontent-hhc-c5="" class="badge">+' +
          profileBadgeIncrement +
          "</span></a></li>";
      }
    }
  } else {
    var users = topparentinitiativeDetails;
    var username =
      users.name == undefined || users.name == "" ? "User" : users.name;
    var userProfileConcate =
      users.image == undefined || users.image == ""
        ? "data-name='" +
          username +
          "' class='rounded-circle initiativeviewuserimage' "
        : " class='rounded-circle' src='" + users.image + "'";
    subinitiativeUser =
      '<li class="avatar avatar-sm selecteduser"><a href="#"><img class="rounded-circle initiativeviewuserimage"' +
      userProfileConcate +
      ' alt="' +
      username +
      '" width="50"></a></li>';
  }
  $(".initiativeviewuserimage").initial({
    charCount: 2,
    height: 30,
    width: 30,
    fontSize: 18,
  });
  return subinitiativeUser;
}

function milstoneviewdetails(id) {
  var element = $("#milestone_view");
  $("#viewmilestoneheader").text($("#miletoneHeader").text());
  $(element).html("");
  $(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
  $.ajax({
    url: "/stratroom/initiatives/" + id + "?loadFlag=true",
    success: milestonesrecordsviewSuccessCallback,
    error: function (msg, status) {
      if (!jQuery.isEmptyObject(msg.responseText)) {
        var errorparse = JSON.parse(msg.responseText);
        if (errorparse.status == "404") {
          $(element).html("");
          $(element).html(errorparse.error);
        } else {
          $(element).html("");
          $(element).html(errorparse.error);
        }
      }
    },
  });
}

function milestonesrecordsviewSuccessCallback(result) {
  var sub_initiatiesrow = "";
  var subinitiativeProgressBar = "";

  $.each(result.mileStonesList, function (index, milestones) {
    var mileStondaterangeformatted = "";
    var datestring = milestones.mileStonesValue.dateRange;
    if (milestones.mileStonesValue.dateRange.indexOf("-") != -1) {
      var splitdatestring = milestones.mileStonesValue.dateRange.split("-");
      datestring =
        splitdatestring[1] != undefined
          ? splitdatestring[1]
          : splitdatestring[0];
    }

    var enddateformatted = new Date(datestring);
    var milstoneProgressval =
      milestones.mileStonesValue.progress != undefined &&
      milestones.mileStonesValue.progress != ""
        ? milestones.mileStonesValue.progress
        : 0;

    var findprogressvalue =
      milestones.mileStonesValue.statusLight != undefined &&
      milestones.mileStonesValue.statusLight != ""
        ? milestones.mileStonesValue.statusLight
        : "yellow_bar";

    if (findprogressvalue.search("bar_height") != -1) {
      milestoneProgressBar = "green_bar";
    } else if (findprogressvalue.search("yellow_bar") != -1) {
      milestoneProgressBar = "yellow_bar";
    } else if (findprogressvalue.search("orange_bar") != -1) {
      milestoneProgressBar = "orange_bar";
    }

    var desc = milestones.mileStonesValue.desc;
    var status = milestones.mileStonesValue.status;
    var humanreaddate = dateFormatedtohumanread(enddateformatted);
    var statusLight = milestones.mileStonesValue.statusLight;

    sub_initiatiesrow += `  <div class="list-group-item">
                <div class="bar-chart">
                  <div class="d-flex gap-2 align-items-start">
                    <h4 class="title m-0">${desc}</h4>
                  </div>

                  <div class="progress-wrap">
                    <div class="progress flex-grow-1">
                      <div class="progress-bar bg-danger progress-bar-striped rounded-pill" role="progressbar"
                       style="width: ${milstoneProgressval}%;" 
                   aria-valuenow="${milstoneProgressval}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <span class="badge">${milstoneProgressval}%</span>
                  </div>
                  <span class="text-muted">${humanreaddate}</span>
                </div>
              
                
              </div>
     `;
  });

  // Render HTML
  $("#milestone_view").html(sub_initiatiesrow);

  // ✅ Apply progress bar color logic
  $(".progress-bar").each(function () {
    var $bar = $(this);
    var percent = parseFloat($bar.attr("aria-valuenow")) || 0;

    // Remove existing status classes
    $bar.removeClass("status-bg-green status-bg-yellow status-bg-red");

    // Apply class based on percent
    if (percent < 40) {
      $bar.addClass("status-bg-red");
    } else if (percent < 75) {
      $bar.addClass("status-bg-yellow");
    } else {
      $bar.addClass("status-bg-green");
    }
  });
}
function attachmentviewdetails(id) {
  var element = $("#attachment_view");
  $("#viewmilestoneheader").text($("#miletoneHeader").text());
  $(element).html("");
  $(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
  $.ajax({
    url: "/stratroom/initiatives/" + id + "?loadFlag=true",
    success: attachrecordsviewSuccessCallback,
    error: function (msg, status) {
      if (!jQuery.isEmptyObject(msg.responseText)) {
        var errorparse = JSON.parse(msg.responseText);
        if (errorparse.status == "404") {
          $(element).html("");
          $(element).html(errorparse.error);
        } else {
          $(element).html("");
          $(element).html(errorparse.error);
        }
      }
    },
  });
}

function attachrecordsviewSuccessCallback(result) {
  var sub_initiatiesrow = "";
  var subinitiativeProgressBar = "";

  $.each(result.attachmentList, function (index, attachment) {
    var mileStondaterangeformatted = "";
    var datestring = attachment.createdTime;
    // if (attachment.createdTime.indexOf('-') != -1) {
    //   var splitdatestring = attachment.dateRange.split('-');
    //   datestring = (splitdatestring[1] != undefined ? splitdatestring[1] : splitdatestring[0]);
    // }

    // var enddateformatted = new Date(datestring);

    var desc = attachment.name;
    // var humanreaddate = dateFormatedtohumanread(enddateformatted);

    sub_initiatiesrow += `<div class="list-group-item">
                <div class="bar-chart">
                  <div class="d-flex gap-2"><h4 class="title mb-0">${desc}</h4></div>
                  
                  <div class="numbers">
                    <div class="text-muted left"></div>
                    <div class="text-muted right"></div>
                  </div>
                </div>
                
              </div>
      `;
  });

  // Render HTML
  $("#attachment_view").html(sub_initiatiesrow);
}

function commentsviewdetails(id) {
  var element = $("#comments-row-box_view");
  $("#initviewcommentsheader").text($("#commentsHeader").text());
  $(element).html("");
  $(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
  $.ajax({
    url: "/stratroom/initiatives/" + id + "?loadFlag=true",
    success: commentsrecordsviewSuccessCallback,
    error: function (msg, status) {
      if (!jQuery.isEmptyObject(msg.responseText)) {
        var errorparse = JSON.parse(msg.responseText);
        if (errorparse.status == "404") {
          $(element).html("");
          $(element).html(errorparse.error);
        } else {
          $(element).html("");
          $(element).html(errorparse.error);
        }
      }
    },
  });
}

function commentsrecordsviewSuccessCallback(result) {
  var sub_initiatiesrow = "";
  var subinitiativeProgressBar = "";
  $.each(result.commentsList, function (index, comment) {
    var timeformatted = new Date(comment.commentsValue.formattedDateTime);
    timeformatted = formatofAmPm(timeformatted);
    /*if(timeformatted.toString().indexOf("Z") == -1){
			timeformatted	=	timeformatted+"Z";
		}
		//createdtime		=	new Date(createdtime).toISOString();
		var date=	dateFormatedtohumanread(timeformatted);
		var time=	new Date(timeformatted).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
		timeformatted = date +' '+time;*/
    var kpicomentsowner = {};
    $.each(reporteelist, function (ownkey, empvalue) {
      if (empvalue.id == comment.createdBy) {
        kpicomentsowner = {
          id: empvalue.id,
          name: empvalue.name,
          image: empvalue.image,
        };
        return false;
      }
    });

    var name =
      comment.commentsValue.createdByName == undefined ||
      comment.commentsValue.createdByName == ""
        ? comment.commentsValue.updatedByName
        : comment.commentsValue.createdByName;
    var title =
      comment.commentsValue.title != undefined &&
      comment.commentsValue.title != ""
        ? comment.commentsValue.title
        : "";
    var getownershortName = (name = usernam.slice(0, 2));
    var Owner = "data-name='" + getownershortName + "'";

    if (
      kpicomentsowner != undefined &&
      kpicomentsowner != "" &&
      kpicomentsowner.name !== undefined
    ) {
      var username =
        kpicomentsowner.name == undefined || kpicomentsowner.name == ""
          ? "User"
          : kpicomentsowner.name;
      Owner =
        kpicomentsowner.image == undefined || kpicomentsowner.image == ""
          ? "data-name='" +
            kpicomentsowner.name +
            "' class='rounded-circle commentsviewuserimage' "
          : " class='rounded-circle' src='" + kpicomentsowner.image + "'";
    }

    var currentuserlike =
      comment.likeEmpIds != undefined && comment.likeEmpIds != null
        ? comment.likeEmpIds
        : [];
    var likeText = "Like";
    var likeTextclass = "";
    if (
      currentuserlike.length > 0 &&
      $.inArray(
        Number(($("#userPrincipal").val() || "").trim()),
        currentuserlike
      ) !== -1
    ) {
      likeText = "Unlike";
      likeTextclass = "green";
    }
    var count =
      comment.likeCount != undefined && comment.likeCount != null
        ? comment.likeCount
        : 0;

    var desc = comment.commentsValue.desc;
    sub_initiatiesrow += `
  <li class="sender">
    <div class="user">
      <img src="${Owner}" class="rounded-circle kpicommentsimgprofile" alt="User" width="40">
    </div>
    <div class="comments">
      <div class="title">
        <p class="m-0 name">${name}</p>
        <p class="m-0 date">${timeformatted}</p>
      </div>
      <div class="comment">
        <p class="m-0">${desc}</p>
      </div>
      <ul class="d-flex flex-row gap-2 mt-1 list-unstyled">
        <li>Reply</li>
        <li class="${likeTextclass}">${likeText}</li>
        <li class="parentcounter">
          <span class="badge badge-dark counter">${count}</span>
        </li>
      </ul>
    </div>
  </li>`;
  });
  $("#comments-row-box_view").html("");
  $("#comments-row-box_view").html(sub_initiatiesrow);
  $("#common-comment-conversation_employee").slimscroll({
    height: "340px",
    size: "3px",
    color: "#9c9c9c",
  });
  $(".commentsviewuserimage").initial({
    charCount: 2,
    height: 30,
    width: 30,
    fontSize: 18,
  });
}

function activitiesviewdetails(id, type) {
  var element = $("#activities-box_view");
  $(".sub_activitie_view_popup").modal("toggle");
  $("#initactivitiesviewheader").text($("#activitiesHeader").text());
  var url = "";
  if (type == "employee") {
    url = "/stratroom/activities/initiativeDetailsList";
  } else {
    url = "/stratroom/initiatives/" + id + "?loadFlag=true";
  }

  $(element).html("");
  $(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
  $.ajax({
    url: url,
    success: function (result) {
      activitiesrecordsviewSuccessCallback(result, type);
    },
    error: function (msg, status) {
      if (!jQuery.isEmptyObject(msg.responseText)) {
        var errorparse = JSON.parse(msg.responseText);
        if (errorparse.status == "404") {
          $(element).html("");
          $(element).html(errorparse.error);
        } else {
          $(element).html("");
          $(element).html(errorparse.error);
        }
      }
    },
  });
}

function activitiesrecordsviewSuccessCallback(result, type) {
  var defaultreporteelist = {};
  $.each(reporteelist, function (ownkey, empvalue) {
    if (empvalue.id == result.owner) {
      defaultreporteelist = {
        id: empvalue.id,
        name: empvalue.name,
        image: empvalue.image,
      };
      return false;
    }
  });

  var sub_initiatiesrow = "";
  var chartviewcontent = [];
  var currentresult = "";

  if (type == "employee") {
    currentresult = result.activitiesList;
  } else {
    currentresult = result.activitiesList;
  }

  $.each(currentresult, function (index, activities) {
    var actdaterangeformatted = "";
    var datestring = activities.activitiesValue.dateRange;
    if (datestring && datestring.includes("-")) {
      var dateval = datestring.split("-");
      var startdate = new Date(dateval[0]);
      var enddateformatted = new Date(dateval[1]);
      actdaterangeformatted =
        dateFormatedtohumanread(startdate) +
        "- " +
        dateFormatedtohumanread(enddateformatted);
    }

    var chartvalue =
      parseInt(100) - parseInt(activities.activitiesValue.progress);
    var chartbalance = activities.activitiesValue.progress;
    if (chartvalue == 0) {
      chartbalance = 100;
    }

    var chartprocesstempname = "chart_orange" + index + " chart-pie" + index;
    chartviewcontent.push({
      index: index,
      chartbalance: chartbalance,
      chartvalue: chartvalue,
    });
    var activityName =
      activities.activitiesValue.desc != undefined
        ? activities.activitiesValue.desc
        : "";
    var activityProgress =
      activities.activitiesValue.progress == undefined ||
      activities.activitiesValue.progress == ""
        ? "0%"
        : activities.activitiesValue.progress + "%";
    var resultPorfileContent = subinitiatiesPorfileFormation(
      activities.activitiesMapDTOList,
      defaultreporteelist,
      "subinitiativesview"
    );
    sub_initiatiesrow +=
      '<div class="d-flex flex-row employe_content_border sub_initiative_details"><div class="d-flex flex-column flex-fill profile_content"><div class="d-flex flex-row"><div class="d-flex flex-column init_flex_profile"><p>' +
      activityName +
      '</p></div><div class="d-flex flex-column"><ul class="list-unstyled order-list d-flex">' +
      resultPorfileContent +
      '</ul></div></div><div class="d-flex flex-row"><div class="d-flex flex-column flex-fill"><div class="d-flex flex-row"><div class="icon"><div id="one" class="' +
      chartprocesstempname +
      '"></div></div><div class="pie-progress">' +
      activityProgress +
      '</div></div></div><div class="d-flex flex-column"><div><strong>' +
      actdaterangeformatted +
      '</strong></div></div></div></div><div class="flex-column"></div></div>';
  });
  $("#activities-box_view").html("");
  $("#activities-box_view").html(sub_initiatiesrow);

  $(".initiativeviewuserimage").initial({
    charCount: 2,
    height: 30,
    width: 30,
    fontSize: 18,
  });

  $.each(chartviewcontent, function (index1, value1) {
    if (value1.chartbalance == 100) {
      $(".chart_orange" + index1 + ".chart-pie" + index1).sparkline(
        [value1.chartbalance, value1.chartvalue],
        {
          type: "pie",
          height: "30px",
          sliceColors: ["#1aa243", "#ffffff"],
        }
      );
    } else {
      $(".chart_orange" + index1 + ".chart-pie" + index1).sparkline(
        [value1.chartbalance, value1.chartvalue],
        {
          type: "pie",
          height: "30px",
          sliceColors: ["#ffd500", "#ffffff"],
        }
      );
    }
  });

  $("[class^=chart_orange]")
    .children(":first-child")
    .css("border", "1px solid #c7c7c7")
    .css("border-radius", "50%");
}
function tasksviewdetails(id, type) {
  var element = $("#task_view");
  $(".task_view_popup").modal("toggle");
  $("#initactivitiesviewheader").text($("#tasksHeader").text());
  var url = "";
  if (type == "employee") {
    url = "/stratroom/activities/initiativeDetailsList";
  } else {
    url = "/stratroom/initiatives/" + id + "?loadFlag=true";
  }

  $(element).html("");
  $(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
  $.ajax({
    url: url,
    success: function (result) {
      tasksrecordsviewSuccessCallback(result, type);
    },
    error: function (msg, status) {
      if (!jQuery.isEmptyObject(msg.responseText)) {
        var errorparse = JSON.parse(msg.responseText);
        if (errorparse.status == "404") {
          $(element).html("");
          $(element).html(errorparse.error);
        } else {
          $(element).html("");
          $(element).html(errorparse.error);
        }
      }
    },
  });
}

function tasksrecordsviewSuccessCallback(result, type) {
  var defaultreporteelist = {};
  $.each(reporteelist, function (ownkey, empvalue) {
    if (empvalue.id == result.owner) {
      defaultreporteelist = {
        id: empvalue.id,
        name: empvalue.name,
        image: empvalue.image,
      };
      return false;
    }
  });

  var sub_initiatiesrow = "";
  var chartviewcontent = [];
  var currentresult = "";

  currentresult = result.taskList;

  $.each(currentresult, function (index, tasks) {
    var actdaterangeformatted = "";
    var datestring = tasks.taskValue.dateRange;
    if (datestring && datestring.includes("-")) {
      var dateval = datestring.split("-");
      var startdate = new Date(dateval[0]);
      var enddateformatted = new Date(dateval[1]);
      actdaterangeformatted =
        dateFormatedtohumanread(startdate) +
        "- " +
        dateFormatedtohumanread(enddateformatted);
    }

    var chartvalue = parseInt(100) - parseInt(tasks.taskValue.progress);
    var chartbalance = tasks.taskValue.progress;
    if (chartvalue == 0) {
      chartbalance = 100;
    }

    var chartprocesstempname = "chart_orange" + index + " chart-pie" + index;
    chartviewcontent.push({
      index: index,
      chartbalance: chartbalance,
      chartvalue: chartvalue,
    });

    var activityName = tasks.taskValue.desc || "";
    var activityProgress = tasks.taskValue.progress || 0;

    sub_initiatiesrow += `
      <div class="list-group-item employe_content_border sub_initiative_details">
        <div class="bar-chart">
          <div class="d-flex gap-2 align-items-start">
            <h4 class="title m-0">${activityName}</h4>
          </div>

          <div class="progress-wrap">
            <div class="progress flex-grow-1">
              <div class="progress-bar progress-bar-striped rounded-pill" 
                   role="progressbar" 
                   style="width: ${activityProgress}%;" 
                   aria-valuenow="${activityProgress}" 
                   aria-valuemin="0" 
                   aria-valuemax="100">
              </div>
            </div>
            <span class="badge">${activityProgress}%</span>
          </div>

          <span class="text-muted">${actdaterangeformatted}</span>
          <ul class="list-unstyled order-list d-flex mt-2"></ul>
        </div>
      </div>`;
  });

  $("#task_view").html(sub_initiatiesrow);

  // ✅ Progress bar colors applied after DOM insertion
  $(".progress-bar").each(function () {
    var $bar = $(this);
    var percent = parseFloat($bar.attr("aria-valuenow")) || 0;

    $bar.removeClass("status-bg-green status-bg-yellow status-bg-red");

    if (percent < 40) {
      $bar.addClass("status-bg-red");
    } else if (percent < 75) {
      $bar.addClass("status-bg-yellow");
    } else {
      $bar.addClass("status-bg-green");
    }
  });
}

function handleCommentsPopup(kpiId, id, desc) {
  $("#initiaties_commentsreply_id").val(id);
  $("#initiaties_comments_initiatieid").val(kpiId);
  $("#initiaties_Comments").val(desc);
}

function handleCommentsReplyPopup(kpiId, id, desc) {
  $("#initiaties_commentsreply_id").val(id);
  $("#initiaties_commentsreply_initiatieid").val(kpiId);
  $("#initiaties_Commentsreply").val(desc);
  $("#initiaties_Commentsreplydesc").val(desc);
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
        '`': '&#96;'
    };
    return String(text || "").replace(/[&<>"'`]/g, m => map[m]);
}

function generateInitiativeCommentOptions(comment, comeditpermission, comdeletepermission) {
    let options = '';
    
    if (comeditpermission) {
        // Use data attributes + class selector instead of inline onclick
      options += `
    <span class="edit-btn" 
          onclick="toggleInitiativeEdit('${comment.id}', '${comment.initiativeId}')">
      Edit
    </span>`;
    }
    if (comeditpermission && comdeletepermission) {
        options += ' · ';
    }
    if (comdeletepermission) {
        options += `
            <span class="delete-btn" 
                  data-id="${comment.id}" 
                  onclick="handleCommentsSave(${comment.initiativeId}, ${comment.id}, 'delete')">
              Delete
            </span>`;
    }
    return options;
}

$(document).ready(function() {
    // Delegate click event for edit buttons (works for dynamically loaded content)
    $(document).on('click', '.comment-edit-trigger', function() {
        const commentId = $(this).data('comment-id');
        const initiativeId = $(this).data('initiative-id');
        toggleInitiativeEdit(commentId, initiativeId);
    });
});

function toggleInitiativeEdit(commentId, initiativeId) {
    const commentTextEl = $(`#comment-text-${commentId}`);
    const editBtn = $(`.comment-edit-trigger[data-comment-id="${commentId}"]`);
    
    if (!commentTextEl.length || !editBtn.length) {
        console.error("Elements not found for comment ID:", commentId);
        return;
    }
    
    const isEditing = editBtn.text().trim() === "Save";
    
    if (!isEditing) {
        // ➤ ENTER EDIT MODE
        const originalDesc = commentTextEl.data('original-desc') || commentTextEl.text().trim();
        commentTextEl.data('backup', originalDesc); // Store backup for revert
        
        // Replace text with textarea
        commentTextEl.html(`
            <textarea class="form-control edit-comment-area" 
                      id="edit-area-${commentId}" 
                      style="min-height:50px; resize:vertical; font-size: inherit; padding: 5px; width: 100%;">${escapeHtml(originalDesc)}</textarea>
        `);
        
        // Change button text
        editBtn.text("Save").addClass("saving-mode");
        
        // Focus textarea
        setTimeout(() => {
            const textarea = $(`#edit-area-${commentId}`);
            textarea.focus();
            // Select all text for easy replacement
            const node = textarea.get(0);
            if (node) {
                node.setSelectionRange(0, node.value.length);
            }
        }, 100);
        
        // Handle Escape key to cancel
        $(`#edit-area-${commentId}`).one('keydown', function(e) {
            if (e.key === 'Escape') {
                e.preventDefault();
                toggleInitiativeEdit(commentId, initiativeId); // Revert
            }
        });
        
        // Handle blur to auto-save (optional)
        // $(`#edit-area-${commentId}`).one('blur', function() {
        //     saveInitiativeComment(commentId, initiativeId);
        // });
        
    } else {
        // ➤ SAVE CHANGES
        saveInitiativeComment(commentId, initiativeId, editBtn, commentTextEl);
    }
}

function saveInitiativeComment(commentId, initiativeId, editBtn, commentTextEl) {
    const newDesc = $(`#edit-area-${commentId}`).val().trim();
    
    if (!newDesc || newDesc === "'") {
        $.notify("Error: Comment cannot be empty", { 
            style: 'error', 
            className: 'graynotify' 
        });
        $(`#edit-area-${commentId}`).focus();
        return;
    }
    
    // Optimistic UI update (optional)
    const originalContent = commentTextEl.data('backup');
    
    const commentsObj = {
        "id": commentId,
        "initiativeId": initiativeId,
        "commentsValue": { "desc": newDesc }
    };
    
    $.ajax({
        url: "/stratroom/comments/",
        type: 'PUT',
        contentType: "application/json",
        data: JSON.stringify(commentsObj),
        success: function(data) {
            // Update UI with escaped new content
            commentTextEl.html(escapeHtml(newDesc));
            commentTextEl.data('original-desc', newDesc);
            editBtn.text("Edit").removeClass("saving-mode");
            $.notify("Comment updated successfully", { style: 'success' });
        },
        error: function(xhr) {
            console.error("Save error:", xhr);
            // Revert UI on error
            commentTextEl.html(escapeHtml(originalContent));
            editBtn.text("Edit").removeClass("saving-mode");
            $.notify("Failed to update comment. Please try again.", { style: 'error' });
        }
    });
}

function initiativeBar() {
  var $body = $("body");
  if (
    (localStorage.getItem("sidebar_subsidemenu") != "") &
    (localStorage.getItem("sidebar_subsidemenu") != null) &
    (localStorage.getItem("sidebar_subsidemenu") == "closed")
  ) {
    $body.addClass("ini-show");
    $body.removeClass("ini-hide");
    $(".collapse_arrow_left").css("display", "block");
    $(".collapse_arrow_right").css("display", "none");
  }

  if (
    (localStorage.getItem("sidebar_subsidemenu") != "") &
    (localStorage.getItem("sidebar_subsidemenu") != null) &
    (localStorage.getItem("sidebar_subsidemenu") == "opened")
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
    $("#initiative_sidebar").css("left", "230px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "75px");
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
    $("#section").css("margin-left", "75px");
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
    $("#section").css("margin-left", "75px");
  } else if (
    $body.hasClass("submenu-closed") &&
    $body.hasClass("side-closed") &&
    !$body.hasClass("side-closed-hover") &&
    !$body.hasClass("ini-hide") &&
    !$body.hasClass("ini-show")
  ) {
    $("#initiative_sidebar").css("left", "0px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "75px");
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
    $("#section").css("margin-left", "75px"); // end default
  } else if (
    $body.hasClass("submenu-closed") &&
    $body.hasClass("ini-hide") &&
    !$body.hasClass("side-closed")
  ) {
    $("#initiative_sidebar").css("left", "-10px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "75px");
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
    $("#section").css("margin-left", "75px");
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
    $("#section").css("margin-left", "75px"); // end hide
  } else if (
    $body.hasClass("submenu-closed") &&
    $body.hasClass("ini-show") &&
    !$body.hasClass("side-closed")
  ) {
    $("#initiative_sidebar").css("left", "230px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "75px");
  } else if (
    $body.hasClass("submenu-closed") &&
    $body.hasClass("side-closed") &&
    $body.hasClass("ini-show")
  ) {
    $("#initiative_sidebar").css("left", "0px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "75px");
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
    $("#section").css("margin-left", "75px");
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
    $("#section").css("margin-left", "75px");
  }
}

$(".content, .navbar").mouseenter(function () {
  var $body = $("body");
  $body.removeClass("side-closed-hover");
  $body.addClass("submenu-closed");
  initiativeBar();
});

$(".sidebar").mouseenter(function () {
  var $body = $("body");
  $body.addClass("side-closed-hover");
  $body.removeClass("submenu-closed");
  initiativeBar();
});

if (localStorage.getItem("sidebar_option")) {
  jQuery("body").addClass(localStorage.getItem("sidebar_option"));
}
if ($("body").hasClass("side-closed")) {
  $(".sidebar-user-panel").css({
    display: "none",
  });
  initiativeBar();
} else {
  $(".sidebar-user-panel").css({
    display: "block",
  });
  initiativeBar();
}

function initCardChart() {
  // Chart Pie
  $(".chart_yellow.chart-pie").sparkline([50, 50], {
    type: "pie",
    height: "30px",
    sliceColors: ["#ffd500", "#ffffff"],
  });

  $(".chart_green.chart-pie").sparkline([85, 15], {
    type: "pie",
    height: "30px",
    sliceColors: ["#1aa243", "#ffffff"],
  });

  $(".chart_orange.chart-pie").sparkline([25, 75], {
    type: "pie",
    height: "30px",
    sliceColors: ["#e84343", "#ffffff"],
  });
}

function getinitiativepermission() {
  $.ajax({
    type: "GET",
    url:
      "/stratroom/user/modulePermissions?moduleName=" +
      encodeURIComponent("Initiatives & Projects"),
    async: false,
    success: function (data) {
      $.each(data, function (forindex, fordata) {
        $.each(fordata, function (forindex1, fordata1) {
          if (forindex1 == "Initiatives") {
            initiativemodPermission = fordata1;
          }
          if (forindex1 == "Activities") {
            if (
              fordata1.privilegeCreate != undefined &&
              fordata1.privilegeCreate == "TRUE"
            ) {
              activitiescreatepermission = true;
            }
            if (
              fordata1.privilegeUpdate != undefined &&
              fordata1.privilegeUpdate == "TRUE"
            ) {
              activitieseditpermission = true;
            }
            if (
              fordata1.privilegeDelete != undefined &&
              fordata1.privilegeDelete == "TRUE"
            ) {
              activitiesdeletepermission = true;
            }
            if (
              fordata1.privilegeView != undefined &&
              fordata1.privilegeView == "TRUE"
            ) {
              activitiesviewpermission = true;
            }
          }
          if (forindex1 == "Sub Initiatives") {
            if (
              fordata1.privilegeCreate != undefined &&
              fordata1.privilegeCreate == "TRUE"
            ) {
              subinicreatepermission = true;
            }
            if (
              fordata1.privilegeUpdate != undefined &&
              fordata1.privilegeUpdate == "TRUE"
            ) {
              subinieditpermission = true;
            }
            if (
              fordata1.privilegeDelete != undefined &&
              fordata1.privilegeDelete == "TRUE"
            ) {
              subinideletepermission = true;
            }
            if (
              fordata1.privilegeView != undefined &&
              fordata1.privilegeView == "TRUE"
            ) {
              subiniviewpermission = true;
            }
          }
          if (forindex1 == "Tasks") {
            if (
              fordata1.privilegeCreate != undefined &&
              fordata1.privilegeCreate == "TRUE"
            ) {
              taskscreatepermission = true;
            }
            if (
              fordata1.privilegeUpdate != undefined &&
              fordata1.privilegeUpdate == "TRUE"
            ) {
              taskseditpermission = true;
            }
            if (
              fordata1.privilegeDelete != undefined &&
              fordata1.privilegeDelete == "TRUE"
            ) {
              tasksdeletepermission = true;
            }
            if (
              fordata1.privilegeView != undefined &&
              fordata1.privilegeView == "TRUE"
            ) {
              tasksviewpermission = true;
            }
          }
          if (forindex1 == "Attachments") {
            if (
              fordata1.privilegeCreate != undefined &&
              fordata1.privilegeCreate == "TRUE"
            ) {
              attachmentscreatepermission = true;
            }
            if (
              fordata1.privilegeUpdate != undefined &&
              fordata1.privilegeUpdate == "TRUE"
            ) {
              attachmentseditpermission = true;
            }
            if (
              fordata1.privilegeDelete != undefined &&
              fordata1.privilegeDelete == "TRUE"
            ) {
              attachmentsdeletepermission = true;
            }
            if (
              fordata1.privilegeView != undefined &&
              fordata1.privilegeView == "TRUE"
            ) {
              attachmentsviewpermission = true;
            }
          }
          if (forindex1 == "Milestones") {
            if (
              fordata1.privilegeCreate != undefined &&
              fordata1.privilegeCreate == "TRUE"
            ) {
              milestonecreatepermission = true;
            }
            if (
              fordata1.privilegeUpdate != undefined &&
              fordata1.privilegeUpdate == "TRUE"
            ) {
              milestoneeditpermission = true;
            }
            if (
              fordata1.privilegeDelete != undefined &&
              fordata1.privilegeDelete == "TRUE"
            ) {
              milestonedeletepermission = true;
            }
            if (
              fordata1.privilegeView != undefined &&
              fordata1.privilegeView == "TRUE"
            ) {
              milestoneviewpermission = true;
            }
          }
          if (forindex1 == "Comments") {
            if (
              fordata1.privilegeCreate != undefined &&
              fordata1.privilegeCreate == "TRUE"
            ) {
              comcreatepermission = true;
            }
            if (
              fordata1.privilegeUpdate != undefined &&
              fordata1.privilegeUpdate == "TRUE"
            ) {
              comeditpermission = true;
            }
            if (
              fordata1.privilegeDelete != undefined &&
              fordata1.privilegeDelete == "TRUE"
            ) {
              comdeletepermission = true;
            }
            if (
              fordata1.privilegeView != undefined &&
              fordata1.privilegeView == "TRUE"
            ) {
              comviewpermission = true;
            }
          }
        });
      });
    },
  });
}

$(document).ready(function () {
  getpagenameView();
  getinitiativepermission();
  $(".date_pickers").datepicker({
    language: "en",
    minDate: new Date(),
    range: true,
    autoClose: true,
    position: "top left",
    todayButton: true,
    onSelect: function (fd) {
      // $('.datepickers-container').hide();
    },
  });

  if (
    initiativemodPermission.privilegeCreate != undefined &&
    initiativemodPermission.privilegeCreate == "TRUE"
  ) {
    initiativecreatepermission = true;
  }

  if (
    initiativemodPermission.privilegeUpdate != undefined &&
    initiativemodPermission.privilegeUpdate == "TRUE"
  ) {
    initiativeeditpermission = true;
  }

  if (
    initiativemodPermission.privilegeDelete != undefined &&
    initiativemodPermission.privilegeDelete == "TRUE"
  ) {
    initiativedeletepermission = true;
  }

  if (
    initiativemodPermission.privilegeView != undefined &&
    initiativemodPermission.privilegeView == "TRUE"
  ) {
    initiativeviewpermission = true;
  }

  if (initiativecreatepermission == false && enableaccesscontrolMenu == false) {
    $(".initiativeCreateIcon").remove();
  }

  if (enableaccesscontrolMenu == true) {
    initiativecreatepermission = true;
    initiativeeditpermission = true;
    initiativedeletepermission = true;
    initiativeviewpermission = true;
  }

  if (
    initiativecreatepermission == true ||
    initiativeeditpermission == true ||
    initiativedeletepermission == true ||
    initiativeviewpermission == true
  ) {
    initiativeloadcontent = true;
  }

  if (
    subinieditpermission == true ||
    subinideletepermission == true ||
    subiniviewpermission == true
  ) {
    subiniloadcontent = true;
  }

  if (
    milestoneeditpermission == true ||
    milestonedeletepermission == true ||
    milestoneviewpermission == true
  ) {
    milestoneloadcontent = true;
  }
  if (
    comeditpermission == true ||
    comdeletepermission == true ||
    comviewpermission == true
  ) {
    comloadcontent = true;
  }
  if (
    activitieseditpermission == true ||
    activitiesdeletepermission == true ||
    activitiesviewpermission == true
  ) {
    activitiesloadcontent = true;
  }
  if (
    taskseditpermission == true ||
    tasksdeletepermission == true ||
    tasksviewpermission == true
  ) {
    tasksloadcontent = true;
  }
  if (
    attachmentseditpermission == true ||
    attachmentsdeletepermission == true ||
    attachmentsviewpermission == true
  ) {
    attachmentsloadcontent = true;
  }
  if (ischeckinitiativeurlornot == "INITIATIVE") {
    getreportee();
    getpagepreference();
    fetchinitiatives();
  }
  $('[data-toggle="tooltip"]').tooltip();
});

function menuToggle() {
  var t = document.getElementById("TreeTable");
  var g = document.getElementById("FrappeGantt");

  if (!t.hidden) {
    t.hidden = true;
    g.setAttribute("class", "col-md-12");
  } else {
    t.hidden = false;
    g.setAttribute("class", "col-md-8");
  }
}

var file;

function readFile(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    file = input.files[0];
    reader.onload = function () {
      var htmlPreview =
        '<div class="box-body-border">' +
        '<img width="20" src="../images/file-icon.png"/>' +
        "<span>" +
        input.files[0].name +
        "</span>" +
        "<span><i class='fa fa-times remove-preview'></i></span>" +
        "</div>";
      var wrapperZone = $(input).parent();
      var previewZone = $(input).parent().parent().find(".preview-zone");
      var boxZone = $(input)
        .parent()
        .parent()
        .find(".preview-zone")
        .find(".box")
        .find(".box-body");
      wrapperZone.removeClass("dragover");
      previewZone.removeClass("hidden");
      boxZone.empty();
      boxZone.append(htmlPreview);
      removeFile();
    };
    reader.readAsDataURL(input.files[0]);
  }
  $(".form-progressbar li:nth-child(1)").addClass("active");
}

function reset(e) {
  e.wrap("<form>").closest("form").get(0).reset();
  e.unwrap();
}

$(".dropzone").change(function () {
  readFile(this);
});

$(".dropzone-wrapper").on("dragover", function (e) {
  e.preventDefault();
  e.stopPropagation();
  $(this).addClass("dragover");
});

$(".dropzone-wrapper").on("dragleave", function (e) {
  e.preventDefault();
  e.stopPropagation();
  $(this).removeClass("dragover");
});

function removeFile() {
  $(".remove-preview").on("click", function () {
    var boxZone = $(this).parents(".preview-zone").find(".box-body");
    var previewZone = $(this).parents(".preview-zone");
    var dropzone = $(this).parents(".form-group").find(".dropzone");
    boxZone.empty();
    console.log("done");
    previewZone.addClass("hidden");
    reset(dropzone);
  });
}

$("#next-btn-1").click(function () {
  $("#validateImportHide").empty();
  $("#file-upload").hide();
  $("#file-validate").show();
  $("#file-save").hide();
  $(".form-progressbar li:nth-child(2)").addClass("active");
  var formdata = new FormData();
  formdata.append("initiativeData", file);
  $(".page-loader-wrapper").css("display", "block");
  if (file) {
    $.ajax({
      url: "/stratroom/importBulkInitiativesDetails?type=validation",
      type: "POST",
      data: formdata,
      processData: false,
      contentType: false,
      success: function (data, status) {
        initiativeUploadNotFoundData(data, data.parsingError);
        $(".page-loader-wrapper").css("display", "none");
      },
    });
  } else {
    $("#fileerrorshow").html("Please select upload file");
    $("#fileerrorshow").show();
    $(".page-loader-wrapper").css("display", "none");
    $("#file-upload").show();
    $("#file-validate").hide();
    $("#file-validate1").hide();
    $("#file-save").hide();
    $(".form-progressbar li:nth-child(1)").removeClass("active");
    $(".form-progressbar li:nth-child(2)").removeClass("active");
  }
});

$(document).on("click", "#next-btn-2", function () {
  $("#file-upload").hide();
  $("#file-validate").hide();
  $("#file-save").show();
  $(".form-progressbar li:nth-child(3)").addClass("active");
  var formdata = new FormData();
  formdata.append("initiativeData", file);
  $(".page-loader-wrapper").css("display", "block");
  $.ajax({
    url: "/stratroom/importBulkInitiativesDetails?type=save",
    type: "POST",
    data: formdata,
    processData: false,
    contentType: false,
    success: function (data, status) {
      $(".page-loader-wrapper").css("display", "none");
      initiativeUploadSuccess(data);
    },
  });
});

$(document).on("click", "#prev-btn1", function () {
  $(".uploadvalidationSuccess").empty();
  $("#validateImportHide").empty();
  $("#file-upload").show();
  $("#file-validate").hide();
  $("#file-save").hide();
  $(".form-progressbar li:nth-child(2)").removeClass("active");
  $(".form-progressbar li:nth-child(1)").addClass("active");
});

$(document).on("click", "#prev-btn2", function () {
  $(".uploadStatististics").empty();
  $("#statisticmessage").html("");
  $(".error-div").hide();
  $("#file-upload").hide();
  $("#file-validate").show();
  $("#file-save").hide();
  $(".form-progressbar li:nth-child(3)").removeClass("active");
  $(".form-progressbar li:nth-child(2)").addClass("active");
});

function initiativeUploadNotFoundData(data, result) {
  $(".uploadvalidationSuccess").empty();
  var initiative_import_error;

  if (!jQuery.isEmptyObject(data) && data.result == "Not-Success") {
    $("#imagevalidate").attr("src", "../images/Not-Verified.png");
    var validateImport =
      '<button type="button" class="btn btn-label-secondary btn-default1" id="prev-btn1" style="font-weight: 600;">Previous</button>' +
      '<button class="btn btn-primary initative_save_btn" id="next-btn-2" style="font-weight: 600;float: right;" disabled>Next</button>';
  }
  if (
    !jQuery.isEmptyObject(data) &&
    (data.result == "success" || data.result == "Success")
  ) {
    $(".error-div").hide();
    $("#imagevalidate").attr("src", "../images/Success.png");
    var validateImport =
      '<button type="button" class="btn btn-label-secondary btn-default1" id="prev-btn1" style="font-weight: 600;">Previous</button>' +
      '<button class="btn btn-primary initative_save_btn" id="next-btn-2" style="font-weight: 600;float: right;">Next</button>';
  }

  $.each(result, function (i, List) {
    initiative_import_error =
      "<tr>" +
      '<td style="width: 150px; text-align: center;">' +
      List.Excel_SheetName +
      "</td>" +
      '<td style="width: 150px; text-align: center; ">' +
      List.rowNo +
      "</td>" +
      '<td style="width: 150px; text-align: center;">' +
      List.highLightcellName +
      "</td>" +
      '<td style="width: 250px; text-align: center;">' +
      List.error +
      "</td>" +
      "</tr>";
    $(".uploadvalidationSuccess").append(initiative_import_error);
  });

  /*if(result != undefined){					
		$("#imagevalidate").attr("src","../images/Not-Verified.png");
		$(".error-div").show();
		var validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
			'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';		
	}*/

  if (jQuery.isEmptyObject(data)) {
    $(".error-div").hide();
    $("#imagevalidate").attr("src", "../images/Not-Verified.png");

    var validateImport =
      '<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>' +
      '<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
  }
  $("#validateImportHide").append(validateImport);
}

function initiativeUploadSuccess(data) {
  $(".uploadStatististics").empty();
  $(".error-div").show();
  $("#imagevalidate").attr("src", "../images/Success.png");
  //$("#statisticmessage").append('Import Successful');
  initiativeStatististics("No of Initiative Processed", data.no_of_processed);
  initiativeStatististics("No of Initiative created", data.no_of_created);
  initiativeStatististics("No of Initiative updated", data.no_of_updated);
  initiativeStatististics("No of Failed", data.no_of_failed);
}

function initiativeStatististics(staticsvalue, fnresult) {
  var initiative_Statististics =
    "<tr>" +
    '<td style="width: 300px; text-align: left;">' +
    staticsvalue +
    "</td>" +
    '<td style="width: 300px; text-align: center;">' +
    fnresult +
    "</td>" +
    "</tr>";
  $(".uploadStatististics").append(initiative_Statististics);
}

$(document).on("click", "#done-btn", function () {
  location.reload(true);
});

$(document).on("click", ".close", function () {
  $(".box-body").empty();
  $("#fileerrorshow").html("");
  $("#statisticmessage").html("");
  $("#file-upload").show();
  $("#file-validate").hide();
  $("#file-save").hide();
  $(".form-progressbar li:nth-child(1)").removeClass("active");
  $(".form-progressbar li:nth-child(2)").removeClass("active");
  $(".form-progressbar li:nth-child(3)").removeClass("active");
});

$(document).on("change", "#importinitiative", function (e) {
  e.preventDefault();
  var formdata = new FormData();
  if ($(this).prop("files").length > 0) {
    file = $(this).prop("files")[0];
    formdata.append("initiativeData", file);
  }
  $(".page-loader-wrapper").css("display", "block");
  $.ajax({
    url: "/stratroom/importBulkInitiativesDetails",
    type: "POST",
    data: formdata,
    processData: false,
    contentType: false,
    success: function (data, status) {
      $(".upLoadSuccessModal").modal("show");
      $("#getCode").text(data.result);
      initiativeUploadNotFoundData(data, data.parsingError);
      $(".fileuploadclose").trigger("click");
      $(".page-loader-wrapper").css("display", "none");
    },
    error: function (msg, status) {
      $(".fileuploadclose").trigger("click");
      $(".page-loader-wrapper").css("display", "none");
      if (!jQuery.isEmptyObject(msg.responseText)) {
        var errorparse = JSON.parse(msg.responseText);
        if (errorparse.status == "404") {
          $.notify("Error:" + errorparse.exception, {
            style: "error",
            className: "graynotify",
          });
        } else {
          $.notify("Error:" + errorparse.exception, {
            style: "error",
            className: "graynotify",
          });
        }
      }
    },
  });
});

$(document).on("keypress", "#comments", function (e) {
  var id = $(this).attr("data-id");
  if (id == "") {
    return false;
  }
  if (e.which == 13) {
    handleCommentsSave(id, "", "add");
    return false;
  }
});
// $(document).on('keypress', '#commentsreply', function (e) {
// 	var id = $(this).attr("data-id");
// 	if (id == "") {
// 		return false;
// 	}
// 	if (e.which == 13) {
// 		handleReplyCommentsSave(id, '', 'add');
// 		return false;
// 	}
// });
$("#statusType").change(function () {
  if ($(this).val() == "manual") {
    $(".manualstatus").show();
  } else {
    $(".manualstatus").hide();
  }
});

$(document).on("click", ".countinitiativeclick", function () {
  $(this).toggleClass("green");
  var id = $(this).attr("data-id");
  if (!id) {
    return false;
  }
  var counter = $(this).closest("li").next("li").find("span.counter").text();
  if ($(this).text() == "Like") {
    $(this).text("Unlike");
  } else {
    $(this).text("Like");
  }
  var flaglike = false;
  var likecount = 0;
  if ($(this).hasClass("green")) {
    flaglike = true;
    likecount = parseInt(parseInt(counter) + 1);
    $(this)
      .closest("li")
      .next("li")
      .find("span.counter")
      .text(parseInt(parseInt(counter) + 1));
  } else {
    flaglike = false;
    likecount = parseInt(parseInt(counter) - 1);
    $(this)
      .closest("li")
      .next("li")
      .find("span.counter")
      .text(parseInt(parseInt(counter) - 1));
  }
  if (likecount == -1) {
    return false;
  }
  var data = {
    id: id,
    likeCount: likecount,
    type: flaglike ? "like" : "dislike",
    fromPage: "initiative",
    empId: ($("#userPrincipal").val() || "").trim(),
  };

  $.ajax({
    url: "/stratroom/commentLike",
    type: "put",
    data: JSON.stringify(data),
    async: false,
    contentType: "application/json",
    success: function (res) {
      $.notify("Updated Successfully", {
        style: "success",
        className: "graynotify",
      });
    },
    error: readErrorMsg,
  });
});

const initiativeCategories = [
  "Strategy & Leadership",
  "Operations",
  "Finance",
  "Sales",
  "Marketing",
  "Customer",
  "Human Resources (HR)",
  "Information Technology (IT)",
  "Risk Management",
  "Compliance",
  "Legal",
  "Procurement & Supply Chain",
  "Product Development & Innovation",
  "Sustainability & ESG",
];

const initiativeCategoryPopoverTrigger = document.getElementById(
  "popoverFilterInitiativesCategory"
);

let initiativeCategoryPopover;

const createRiskCategoryContent = () => {
  const content = document.createElement("div");
  content.innerHTML = `
      <div>
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h5 class="h6 mb-0">
           <i class="fas fa-filter me-1 text-primary"></i> Filter Initiatives Category
          </h5>
          <button type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <button class="btn btn-sm btn-light select-all-risk">Select All</button>
          <button class="btn btn-sm btn-light deselect-all-risk">Deselect All</button>
        </div>
        <div class="d-flex flex-column gap-2 pageViewOption" style="max-height: 300px; overflow-y: auto;">
          ${initiativeCategories
            .map(
              (category) => `
            <div class="form-check">
              <input class="form-check-input filter-risk" id="rc-${category.replace(
                /\s+/g,
                ""
              )}" type="checkbox" value="${category}" checked>
              <label class="form-check-label" for="rc-${category.replace(
                /\s+/g,
                ""
              )}">${category}</label>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  return content;
};

initiativeCategoryPopover = new bootstrap.Popover(
  initiativeCategoryPopoverTrigger,
  {
    html: true,
    placement: "bottom",
    content: createRiskCategoryContent,
    sanitize: false,
    container: "body",
    trigger: "manual",
  }
);

// Open popover on button click
initiativeCategoryPopoverTrigger.addEventListener("click", () => {
  initiativeCategoryPopover.toggle();
});

function filterKpiCardsByInitiative() {
  const checked = Array.from(
    document.querySelectorAll(".filter-risk:checked")
  ).map((cb) => cb.value);
  const allChecked = checked.length === initiativeCategories.length;
  const cards = document.querySelectorAll(".card.card-widget");

  cards.forEach((card) => {
    const riskText = card.querySelector(".riCategory")?.textContent.trim();
    card.style.display = allChecked || checked.includes(riskText) ? "" : "none";
  });
}
// Bind events

// filterKpiCardsByInitiative();
// Delegate interactions
document.addEventListener("click", function (e) {
  if (e.target.closest(".btn-close")) {
    initiativeCategoryPopover.hide();
  }
  document.querySelectorAll(".filter-risk").forEach((cb) => {
    cb.addEventListener("change", filterKpiCardsByInitiative);
  });
  if (e.target.classList.contains("select-all-risk")) {
    document
      .querySelectorAll(".filter-risk")
      .forEach((cb) => (cb.checked = true));
    filterKpiCardsByInitiative();
  }
  if (e.target.classList.contains("deselect-all-risk")) {
    document
      .querySelectorAll(".filter-risk")
      .forEach((cb) => (cb.checked = false));
    filterKpiCardsByInitiative();
  }
});

const page_initiative_en = {
  "Initiative Description": "Initiative Description",
  "Filter Initiatives Category": "Filter Initiatives Category",
  "Initiatives & Projects": "Initiatives & Projects",
  Status: "Status",
  Cancel: "Cancel",
  Save: "Save",
  "Sub Initiative": "Sub Initiative",
  Activity: "Activity",
  "Sub Activity": "Sub Activity",

  KPI: "KPI",
  Delete: "Delete",
  Audit: "Audit",
  "Created By": "Created By",
  "Created Date": "Created Date",
  "Modified By": "Modified By",
  "Modified Date": "Modified Date",

  Balance: "Balance",
  Utilized: "Utilized",
  Total: "Total",
  Amount: "Amount",

  "Data Fields": "Data Fields",
  Actual: "Actual",
  Target: "Target",
  Budget: "Budget",
  Forecast: "Forecast",

  ID: "ID",
  Name: "Name",
  Description: "Description",
  Owner: "Owner",
  Department: "Department",
  Category: "Category",
  Scorecard: "Scorecard",
  Perspective: "Perspective",
  Objective: "Objective",
  "Planned Start Date/End Date": "Planned Start Date/End Date",
  "Actual Start Date/End Date": "Actual Start Date/End Date",
  "Progress (%)": "Progress (%)",
  "Manual Status": "Manual Status",

  "Add Sub Initiative Description": "Add Sub Initiative Description",
  "Contribution (%)": "Contribution (%)",
  "Start / End Date": "Start / End Date",
  "Implementation Remarks": "Implementation Remarks",
  "Performance Analysis Observations / Recommendation":
    "Performance Analysis Observations / Recommendation",
  "View Sub Initatives": "View Sub Initatives",
  "Add Activities Description": "Add Activities Description",
  Budget: "Budget",
  "View Gantt Chart": "View Gantt Chart",
  "Task Description": "Task Description",
  "Milestone Description": "Milestone Description",

  Attachments: "Attachments",
  Validation: "Validation",
  Import: "Import",
  "Upload File": "Upload File",
  "Choose a file or Drag Here": "Choose a file or Drag Here",
  Next: "Next",
  "View Comments": "View Comments",
};

const page_initiative_am = {
  "Initiative Description": "የተነሳሽነት መግለጫ",
  "Filter Initiatives Category": "የተነሳሽነት ምድቦችን ይጣሩ",
  "Initiatives & Projects": "ተነሳሽነቶች እና ፕሮጀክቶች",
  Status: "ሁኔታ",
  Cancel: "ተወው",
  Save: "አስቀምጥ",
  "Sub Initiative": "ንዑስ ተነሳሽነት",
  Activity: "እንቅስቃሴ",
  "Sub Activity": "ንዑስ እንቅስቃሴ",
  KPI: "KPI",
  Delete: "ሰርዝ",
  Audit: "ኦዲት",
  "Created By": "የፈጠረው",
  "Created Date": "የተፈጠረበት ቀን",
  "Modified By": "የተሻሻለው በ",
  "Modified Date": "የተሻሻለበት ቀን",
  Balance: "ቀሪ ገንዘብ",
  Utilized: "የተጠቀሰ",
  Total: "አጠቃላይ",
  Amount: "መጠን",
  "Data Fields": "የመረጃ መስኮች",
  Actual: "እውነተኛ",
  Target: "ዓላማ",
  Budget: "በጀት",
  Forecast: "ቅድመ እይታ",
  ID: "መለያ",
  Name: "ስም",
  Description: "መግለጫ",
  Owner: "ባለቤት",
  Department: "ክፍል",
  Category: "ምድብ",
  Scorecard: "የአፈፃፀም ካርድ",
  Perspective: "እይታ",
  Objective: "ዓላማ",
  "Planned Start Date/End Date": "የታቀደ መጀመሪያ/መጨረሻ ቀን",
  "Actual Start Date/End Date": "የእውነተኛ መጀመሪያ/መጨረሻ ቀን",
  "Progress (%)": "እድገት (%)",
  "Manual Status": "የመንቀሳቀስ ሁኔታ",
  "Add Sub Initiative Description": "የንዑስ ተነሳሽነት መግለጫ አክል",
  "Contribution (%)": "አትላላት (%)",
  "Start / End Date": "መጀመሪያ / መጨረሻ ቀን",
  "Implementation Remarks": "የእንደሰራው ማስታወሻ",
  "Performance Analysis Observations / Recommendation": "የአፈፃፀም ትንተና / ምክር",
  "View Sub Initatives": "ንዑስ ተነሳሽነቶችን እይ",
  "Add Activities Description": "የእንቅስቃሴ መግለጫ አክል",
  "View Gantt Chart": "የጋንት ሰንጠረዥ እይ",
  "Task Description": "የተግባር መግለጫ",
  "Milestone Description": "የዋና እስከ ደረጃ መግለጫ",
  Attachments: "የተያያዙ ፋይሎች",
  Validation: "ማረጋገጫ",
  Import: "ማስገባት",
  "Upload File": "ፋይል መጫኛ",
  "Choose a file or Drag Here": "ፋይል ይምረጡ ወይም ወደ ዚህ ዘዴ ያስገቡ",
  Next: "ቀጣይ",
  "View Comments": "አስተያየቶችን እይ",
};

const page_initiative_ar = {
  "Initiative Description": "وصف المبادرة",
  "Filter Initiatives Category": "تصفية فئة المبادرات",
  "Initiatives & Projects": "المبادرات والمشروعات",
  Status: "الحالة",
  Cancel: "إلغاء",
  Save: "حفظ",
  "Sub Initiative": "المبادرة الفرعية",
  Activity: "النشاط",
  "Sub Activity": "النشاط الفرعي",

  KPI: "رشؤم  ءادﻷا يسيﺋرلا",
  Delete: "فذح",
  Audit: "قيقدت",
  "Created By": "ئشنأ ةطساوب",
  "Created Date": "خيرات ءاشنﻹا",
  "Modified By": " لدُﻋ ةطساوب",
  "Modified Date": "خيرات ليدعتلا",

  Balance: "الرصيد",
  Utilized: "المستخدم",
  Total: "الإجمالي",
  Amount: "المبلغ",

  "Data Fields": "حقول البيانات",
  Actual: "القيمة الفعلية",
  Target: "الهدف",
  Budget: "الميزانية",
  Forecast: "التنبؤ",

  ID: "المعرف",
  Name: "الاسم",
  Description: "الوصف",
  Owner: "المالك",
  Department: "القسم",
  Category: "الفئة",
  Scorecard: "بطاقة الأداء",
  Perspective: "وجهة النظر",
  Objective: "الهدف",
  "Planned Start Date/End Date": "تاريخ البدء / تاريخ الانتهاء المخطط",
  "Actual Start Date/End Date": "تاريخ البدء / تاريخ الانتهاء الفعلي",
  "Progress (%)": "التقدم (%)",
  "Manual Status": "الحالة اليدوية",

  "Add Sub Initiative Description": "إضافة وصف المبادرة الفرعية",
  "Contribution (%)": "المساهمة (%)",
  "Start / End Date": "تاريخ البدء / تاريخ الانتهاء",
  "Implementation Remarks": "ملاحظات التنفيذ",
  "Performance Analysis Observations / Recommendation":
    "ملاحظات / توصيات تحليل الأداء",
  "View Sub Initiatives": "عرض المبادرات الفرعية",
  "Add Activities Description": "إضافة وصف الأنشطة",
  Budget: "الميزانية",
  "View Gantt Chart": "عرض مخطط جانت",
  "Task Description": "وصف المهمة",
  "Milestone Description": "وصف المعلم",

  Attachments: "تاقﻓرملا",
  Import: "داريتسا",
  "Upload File": " عﻓر  فلملا",
  "Choose a file or Drag Here": "رتخا اًفلم وأ بحسا انه",
  Next: "يلاتلا",
  Upload: " ليمحت",
  "View Comments": "عرض التعليقات",
};

//Language Wrokflow
function getNestedValue(obj, path) {
  return path
    .split(".")
    .reduce((o, key) => (o && o[key] !== undefined ? o[key] : null), obj);
}

// Load language for all elements with data-translate
function loadLanguage(lang) {
  let translation;

  if (lang == "ar") {
    translation = page_initiative_ar;
  } else if (lang == "am") {
    translation = page_initiative_am;
  } else {
    translation = page_initiative_en;
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

function loadTranslations(lang) {}





// Function to load JSON initiativeJsonListData and generate PDF
function loadDataAndGeneratePDF() {
   
        initiativeJsonListDataDummy = {
    "id": 54,
    "initiativeValue": {
        "daysRemaining": 364,
        "createdByName": "Nizam Goolam",
        "impactDesc": "NA",
        "blank": false,
        "statusType": "weighted",
        "totalBudget": 0,
        "statusIndicator": "RED",
        "impactId": [
            "2333",
            "2334",
            "2446"
        ],
        "actualdaterange": "",
        "description": "NA",
        "BalCurr": "$",
        "perspectiveName": "Enabled Regulatory Environment",
        "total": false,
        "balance": false,
        "ownerName": "Nizam Goolam",
        "statusLight": "progress-bar width-per-15 rounded-pill bar_height orange_bar",
        "Utilized": "44",
        "targetValue": 99.73,
        "utilized": false,
        "budget": false,
        "objectiveDesc": "Improve Regulatory Services (Delivering Effective & Responsive Service ",
        "actual": false,
        "daterange": "04/01/2026 - 03/31/2027",
        "kpi": [
            {
                "id": "2333",
                "name": " % of internal and external stakeholders sensitized on Charter standards"
            },
            {
                "id": "2334",
                "name": " % compliance with service charter standards"
            },
            {
                "id": "2446",
                "name": "Charter developed and approved within the set timeline"
            }
        ],
        "progressval": "30",
        "updatedByName": "Nizam Goolam",
        "actualValue": "30",
        "dateString": "01 Apr 2026 - 31 Mar 2027",
        "forecast": false,
        "dept": "CEO OFFICE",
        "target": false,
        "categoryType": "Strategy & Leadership",
        "totalActual": 0,
        "TotCurr": "0",
        "Total": "44",
        "name": "Enhance client services",
        "utilizedCurr": "$"
    },
    "subInitiativeList": [
        {
            "id": 80,
            "active": 0,
            "subInitiativeValue": {
                "createdByName": null,
                "multipleowners": "2241",
                "contribution": "48",
                "performance": "",
                "ownerName": "Nizam Goolam",
                "dateRange": "04/01/2026 - 03/31/2027",
                "progressval": "63",
                "updatedByName": "Nizam Goolam",
                "name": "",
                "description": "Develop a comprehensive Client Service Charter outlining service standards and turnaround times",
                "impremark": "",
                "targetValue": 99.73,
                "statusLight": "progress-bar-success width-per-100 rounded-pill bar_height",
                "statusIndicator": "GREEN"
            },
            "createdTime": "2026-03-13T10:53:15",
            "updatedTime": "2026-03-16T06:37:45",
            "owner": 2241,
            "initiativeId": 54,
            "createdBy": 3706,
            "updatedBy": 2241,
            "activitiesList": [
                {
                    "id": 179,
                    "active": 0,
                    "activitiesValue": {
                        "actual": "",
                        "createdByName": "Nizam Goolam",
                        "subInitiativeName": "Develop a comprehensive Client Service Charter outlining service standards and turnaround times",
                        "multipleowners": "2241",
                        "ownerName": "Nizam Goolam",
                        "dateRange": "04/01/2026 - 06/31/2026",
                        "progressval": "0",
                        "updatedByName": "Nizam Goolam",
                        "name": "",
                        "progress": "80",
                        "desc": "Define objectives, scope and principles of client service charter",
                        "budget": ""
                    },
                    "createdTime": "2026-03-13T10:53:15",
                    "updatedTime": "2026-03-16T14:06:35",
                    "owner": 2241,
                    "initiativeId": 54,
                    "createdBy": 3706,
                    "updatedBy": 2241,
                    "subInitiativeId": "80",
                    "activitiesMapDTOList": [
                        {
                            "id": 5824,
                            "activitiesId": 179,
                            "active": 0,
                            "empId": 0,
                            "employeeProfilePos": {
                                "empId": 2241,
                                "orgId": {
                                    "id": 4,
                                    "name": "LCA",
                                    "status": "Active"
                                },
                                "firstName": "Nizam Goolam",
                                "lastName": null,
                                "userRole": 0,
                                "profileImage": "",
                                "parentEmpId": 0,
                                "department": "CEO OFFICE",
                                "title": null,
                                "location": "",
                                "emailAddress": "ngoolam@lca.org.ls",
                                "createdDate": null
                            }
                        }
                    ],
                    "subActivityList": []
                },
                {
                    "id": 180,
                    "active": 0,
                    "activitiesValue": {
                        "actual": "",
                        "createdByName": "Nizam Goolam",
                        "subInitiativeName": "Develop a comprehensive Client Service Charter outlining service standards and turnaround times",
                        "multipleowners": "2241",
                        "ownerName": "Nizam Goolam",
                        "dateRange": "04/01/2026 - 06/31/2026",
                        "progressval": "0",
                        "updatedByName": "Nizam Goolam",
                        "name": "",
                        "progress": "70",
                        "desc": "Review existing service delivery practices and internal procedures",
                        "budget": ""
                    },
                    "createdTime": "2026-03-13T10:53:15",
                    "updatedTime": "2026-03-16T06:39:55",
                    "owner": 2241,
                    "initiativeId": 54,
                    "createdBy": 3706,
                    "updatedBy": 2241,
                    "subInitiativeId": "80",
                    "activitiesMapDTOList": [
                        {
                            "id": 5821,
                            "activitiesId": 180,
                            "active": 0,
                            "empId": 0,
                            "employeeProfilePos": {
                                "empId": 2241,
                                "orgId": {
                                    "id": 4,
                                    "name": "LCA",
                                    "status": "Active"
                                },
                                "firstName": "Nizam Goolam",
                                "lastName": null,
                                "userRole": 0,
                                "profileImage": "",
                                "parentEmpId": 0,
                                "department": "CEO OFFICE",
                                "title": null,
                                "location": "",
                                "emailAddress": "ngoolam@lca.org.ls",
                                "createdDate": null
                            }
                        }
                    ],
                    "subActivityList": []
                },
                {
                    "id": 181,
                    "active": 0,
                    "activitiesValue": {
                        "actual": "",
                        "createdByName": "Nizam Goolam",
                        "subInitiativeName": "Develop a comprehensive Client Service Charter outlining service standards and turnaround times",
                        "multipleowners": "2241",
                        "ownerName": "Nizam Goolam",
                        "dateRange": "04/01/2026 - 06/31/2026",
                        "progressval": "0",
                        "updatedByName": "Nizam Goolam",
                        "name": "",
                        "progress": "40",
                        "desc": "Identify services to be covered by the charter",
                        "budget": ""
                    },
                    "createdTime": "2026-03-13T10:53:16",
                    "updatedTime": "2026-03-16T06:40:28",
                    "owner": 2241,
                    "initiativeId": 54,
                    "createdBy": 3706,
                    "updatedBy": 2241,
                    "subInitiativeId": "80",
                    "activitiesMapDTOList": [
                        {
                            "id": 5822,
                            "activitiesId": 181,
                            "active": 0,
                            "empId": 0,
                            "employeeProfilePos": {
                                "empId": 2241,
                                "orgId": {
                                    "id": 4,
                                    "name": "LCA",
                                    "status": "Active"
                                },
                                "firstName": "Nizam Goolam",
                                "lastName": null,
                                "userRole": 0,
                                "profileImage": "",
                                "parentEmpId": 0,
                                "department": "CEO OFFICE",
                                "title": null,
                                "location": "",
                                "emailAddress": "ngoolam@lca.org.ls",
                                "createdDate": null
                            }
                        }
                    ],
                    "subActivityList": []
                },
                {
                    "id": 183,
                    "active": 0,
                    "activitiesValue": {
                        "createdByName": null,
                        "multipleowners": "2241",
                        "ownerName": "Nizam Goolam",
                        "dateRange": "07/01/2026 - 09/31/2026",
                        "progressval": "0",
                        "name": "Conduct baseline assessment of current services standards and turnaround times from all  the devotions",
                        "desc": "Conduct baseline assessment of current services standards and turnaround times from all  the devotions"
                    },
                    "createdTime": "2026-03-13T10:53:16",
                    "owner": 2241,
                    "initiativeId": 0,
                    "createdBy": 3706,
                    "updatedBy": 0,
                    "subInitiativeId": "80",
                    "activitiesMapDTOList": [
                        {
                            "id": 5407,
                            "activitiesId": 183,
                            "active": 0,
                            "empId": 0,
                            "employeeProfilePos": {
                                "empId": 2241,
                                "orgId": {
                                    "id": 4,
                                    "name": "LCA",
                                    "status": "Active"
                                },
                                "firstName": "Nizam Goolam",
                                "lastName": null,
                                "userRole": 0,
                                "profileImage": "",
                                "parentEmpId": 0,
                                "department": "CEO OFFICE",
                                "title": null,
                                "location": "",
                                "emailAddress": "ngoolam@lca.org.ls",
                                "createdDate": null
                            }
                        }
                    ],
                    "subActivityList": []
                },
                {
                    "id": 184,
                    "active": 0,
                    "activitiesValue": {
                        "createdByName": null,
                        "multipleowners": "2241",
                        "ownerName": "Nizam Goolam",
                        "dateRange": "07/01/2026 - 09/31/2026",
                        "progressval": "0",
                        "name": "Develop a client service charter framework",
                        "desc": "Develop a client service charter framework"
                    },
                    "createdTime": "2026-03-13T10:53:16",
                    "owner": 2241,
                    "initiativeId": 0,
                    "createdBy": 3706,
                    "updatedBy": 0,
                    "subInitiativeId": "80",
                    "activitiesMapDTOList": [
                        {
                            "id": 5408,
                            "activitiesId": 184,
                            "active": 0,
                            "empId": 0,
                            "employeeProfilePos": {
                                "empId": 2241,
                                "orgId": {
                                    "id": 4,
                                    "name": "LCA",
                                    "status": "Active"
                                },
                                "firstName": "Nizam Goolam",
                                "lastName": null,
                                "userRole": 0,
                                "profileImage": "",
                                "parentEmpId": 0,
                                "department": "CEO OFFICE",
                                "title": null,
                                "location": "",
                                "emailAddress": "ngoolam@lca.org.ls",
                                "createdDate": null
                            }
                        }
                    ],
                    "subActivityList": []
                },
                {
                    "id": 185,
                    "active": 0,
                    "activitiesValue": {
                        "createdByName": null,
                        "multipleowners": "2241",
                        "ownerName": "Nizam Goolam",
                        "dateRange": "07/01/2026 - 09/31/2026",
                        "progressval": "0",
                        "name": "Define draft service categories and performance commitments",
                        "desc": "Define draft service categories and performance commitments"
                    },
                    "createdTime": "2026-03-13T10:53:16",
                    "owner": 2241,
                    "initiativeId": 0,
                    "createdBy": 3706,
                    "updatedBy": 0,
                    "subInitiativeId": "80",
                    "activitiesMapDTOList": [
                        {
                            "id": 5409,
                            "activitiesId": 185,
                            "active": 0,
                            "empId": 0,
                            "employeeProfilePos": {
                                "empId": 2241,
                                "orgId": {
                                    "id": 4,
                                    "name": "LCA",
                                    "status": "Active"
                                },
                                "firstName": "Nizam Goolam",
                                "lastName": null,
                                "userRole": 0,
                                "profileImage": "",
                                "parentEmpId": 0,
                                "department": "CEO OFFICE",
                                "title": null,
                                "location": "",
                                "emailAddress": "ngoolam@lca.org.ls",
                                "createdDate": null
                            }
                        }
                    ],
                    "subActivityList": []
                },
                {
                    "id": 186,
                    "active": 0,
                    "activitiesValue": {
                        "createdByName": null,
                        "multipleowners": "2241",
                        "ownerName": "Nizam Goolam",
                        "dateRange": "10/01/2026 - 12/31/2026",
                        "progressval": "0",
                        "name": "Prepare detailed client service charter document",
                        "desc": "Prepare detailed client service charter document"
                    },
                    "createdTime": "2026-03-13T10:53:17",
                    "owner": 2241,
                    "initiativeId": 0,
                    "createdBy": 3706,
                    "updatedBy": 0,
                    "subInitiativeId": "80",
                    "activitiesMapDTOList": [
                        {
                            "id": 5410,
                            "activitiesId": 186,
                            "active": 0,
                            "empId": 0,
                            "employeeProfilePos": {
                                "empId": 2241,
                                "orgId": {
                                    "id": 4,
                                    "name": "LCA",
                                    "status": "Active"
                                },
                                "firstName": "Nizam Goolam",
                                "lastName": null,
                                "userRole": 0,
                                "profileImage": "",
                                "parentEmpId": 0,
                                "department": "CEO OFFICE",
                                "title": null,
                                "location": "",
                                "emailAddress": "ngoolam@lca.org.ls",
                                "createdDate": null
                            }
                        }
                    ],
                    "subActivityList": []
                }
            ],
            "subInitiativesMapDTOList": [
                {
                    "id": 5995,
                    "subInitiativeId": 80,
                    "active": 0,
                    "empId": 2241,
                    "employeeProfilePos": {
                        "empId": 2241,
                        "orgId": {
                            "id": 4,
                            "name": "LCA",
                            "status": "Active"
                        },
                        "firstName": "Nizam Goolam",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "",
                        "parentEmpId": 0,
                        "department": "CEO OFFICE",
                        "title": null,
                        "location": "",
                        "emailAddress": "ngoolam@lca.org.ls",
                        "createdDate": null
                    }
                }
            ]
        }
    ],
    "activitiesList": [
        {
            "id": 179,
            "active": 0,
            "activitiesValue": {
                "actual": "",
                "createdByName": "Nizam Goolam",
                "subInitiativeName": "Develop a comprehensive Client Service Charter outlining service standards and turnaround times",
                "multipleowners": "2241",
                "ownerName": "Nizam Goolam",
                "dateRange": "04/01/2026 - 06/31/2026",
                "progressval": "0",
                "updatedByName": "Nizam Goolam",
                "name": "",
                "progress": "80",
                "desc": "Define objectives, scope and principles of client service charter",
                "budget": ""
            },
            "createdTime": "2026-03-13T10:53:15",
            "updatedTime": "2026-03-16T14:06:35",
            "owner": 2241,
            "initiativeId": 54,
            "createdBy": 3706,
            "updatedBy": 2241,
            "subInitiativeId": "80",
            "activitiesMapDTOList": [
                {
                    "id": 5824,
                    "activitiesId": 179,
                    "active": 0,
                    "empId": 0,
                    "employeeProfilePos": {
                        "empId": 2241,
                        "orgId": {
                            "id": 4,
                            "name": "LCA",
                            "status": "Active"
                        },
                        "firstName": "Nizam Goolam",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "",
                        "parentEmpId": 0,
                        "department": "CEO OFFICE",
                        "title": null,
                        "location": "",
                        "emailAddress": "ngoolam@lca.org.ls",
                        "createdDate": null
                    }
                }
            ],
            "subActivityList": []
        },
        {
            "id": 180,
            "active": 0,
            "activitiesValue": {
                "actual": "",
                "createdByName": "Nizam Goolam",
                "subInitiativeName": "Develop a comprehensive Client Service Charter outlining service standards and turnaround times",
                "multipleowners": "2241",
                "ownerName": "Nizam Goolam",
                "dateRange": "04/01/2026 - 06/31/2026",
                "progressval": "0",
                "updatedByName": "Nizam Goolam",
                "name": "",
                "progress": "70",
                "desc": "Review existing service delivery practices and internal procedures",
                "budget": ""
            },
            "createdTime": "2026-03-13T10:53:15",
            "updatedTime": "2026-03-16T06:39:55",
            "owner": 2241,
            "initiativeId": 54,
            "createdBy": 3706,
            "updatedBy": 2241,
            "subInitiativeId": "80",
            "activitiesMapDTOList": [
                {
                    "id": 5821,
                    "activitiesId": 180,
                    "active": 0,
                    "empId": 0,
                    "employeeProfilePos": {
                        "empId": 2241,
                        "orgId": {
                            "id": 4,
                            "name": "LCA",
                            "status": "Active"
                        },
                        "firstName": "Nizam Goolam",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "",
                        "parentEmpId": 0,
                        "department": "CEO OFFICE",
                        "title": null,
                        "location": "",
                        "emailAddress": "ngoolam@lca.org.ls",
                        "createdDate": null
                    }
                }
            ],
            "subActivityList": []
        },
        {
            "id": 181,
            "active": 0,
            "activitiesValue": {
                "actual": "",
                "createdByName": "Nizam Goolam",
                "subInitiativeName": "Develop a comprehensive Client Service Charter outlining service standards and turnaround times",
                "multipleowners": "2241",
                "ownerName": "Nizam Goolam",
                "dateRange": "04/01/2026 - 06/31/2026",
                "progressval": "0",
                "updatedByName": "Nizam Goolam",
                "name": "",
                "progress": "40",
                "desc": "Identify services to be covered by the charter",
                "budget": ""
            },
            "createdTime": "2026-03-13T10:53:16",
            "updatedTime": "2026-03-16T06:40:28",
            "owner": 2241,
            "initiativeId": 54,
            "createdBy": 3706,
            "updatedBy": 2241,
            "subInitiativeId": "80",
            "activitiesMapDTOList": [
                {
                    "id": 5822,
                    "activitiesId": 181,
                    "active": 0,
                    "empId": 0,
                    "employeeProfilePos": {
                        "empId": 2241,
                        "orgId": {
                            "id": 4,
                            "name": "LCA",
                            "status": "Active"
                        },
                        "firstName": "Nizam Goolam",
                        "lastName": null,
                        "userRole": 0,
                        "profileImage": "",
                        "parentEmpId": 0,
                        "department": "CEO OFFICE",
                        "title": null,
                        "location": "",
                        "emailAddress": "ngoolam@lca.org.ls",
                        "createdDate": null
                    }
                }
            ],
            "subActivityList": []
        }
    ],
    "commentsList": [],
    "mileStonesList": [
        {
            "id": 259,
            "active": 0,
            "mileStonesValue": {
                "createdByName": null,
                "ownerName": "Nizam Goolam",
                "dateRange": "04/01/2026 - 06/31/2026",
                "progressval": "0",
                "name": "Approved scoping report",
                "progress": 0,
                "desc": "Approved scoping report",
                "status": "Pending",
                "statusLight": "progress-bar progress-bar-success width-per-85 rounded-pill bar_height",
                "statusIndicator": "GREEN"
            },
            "createdTime": "2026-03-13T10:53:17",
            "owner": 2241,
            "initiativeId": 54,
            "createdBy": 3706,
            "updatedBy": 0
        },
        {
            "id": 260,
            "active": 0,
            "mileStonesValue": {
                "createdByName": null,
                "ownerName": "Nizam Goolam",
                "dateRange": "04/01/2026 - 06/31/2026",
                "progressval": "0",
                "name": "Workplan",
                "progress": 0,
                "desc": "Workplan",
                "status": "Pending",
                "statusLight": "progress-bar progress-bar-success width-per-85 rounded-pill bar_height",
                "statusIndicator": "GREEN"
            },
            "createdTime": "2026-03-13T10:53:17",
            "owner": 2241,
            "initiativeId": 54,
            "createdBy": 3706,
            "updatedBy": 0
        },
        {
            "id": 261,
            "active": 0,
            "mileStonesValue": {
                "createdByName": null,
                "ownerName": "Nizam Goolam",
                "dateRange": "07/01/2026 - 09/31/2026",
                "progressval": "0",
                "name": "Consolidated baseline report",
                "progress": 0,
                "desc": "Consolidated baseline report",
                "status": "Pending",
                "statusLight": "progress-bar progress-bar-success width-per-85 rounded-pill bar_height",
                "statusIndicator": "GREEN"
            },
            "createdTime": "2026-03-13T10:53:17",
            "owner": 2241,
            "initiativeId": 54,
            "createdBy": 3706,
            "updatedBy": 0
        },
        {
            "id": 262,
            "active": 0,
            "mileStonesValue": {
                "createdByName": null,
                "ownerName": "Nizam Goolam",
                "dateRange": "07/01/2026 - 09/31/2026",
                "progressval": "0",
                "name": "Validated proposed service standard metrics",
                "progress": 0,
                "desc": "Validated proposed service standard metrics",
                "status": "Pending",
                "statusLight": "progress-bar progress-bar-success width-per-85 rounded-pill bar_height",
                "statusIndicator": "GREEN"
            },
            "createdTime": "2026-03-13T10:53:17",
            "owner": 2241,
            "initiativeId": 54,
            "createdBy": 3706,
            "updatedBy": 0
        },
        {
            "id": 263,
            "active": 0,
            "mileStonesValue": {
                "createdByName": null,
                "ownerName": "Nizam Goolam",
                "dateRange": "10/01/2026 - 12/31/2026",
                "progressval": "0",
                "name": "Approved client charter document",
                "progress": 0,
                "desc": "Approved client charter document",
                "status": "Pending",
                "statusLight": "progress-bar progress-bar-success width-per-85 rounded-pill bar_height",
                "statusIndicator": "GREEN"
            },
            "createdTime": "2026-03-13T10:53:18",
            "owner": 2241,
            "initiativeId": 54,
            "createdBy": 3706,
            "updatedBy": 0
        }
    ],
    "attachmentList": [],
    "taskList": [],
    "pageId": 3706,
    "perspectiveId": 4566,
    "scorecardDetailId": 3682,
    "objectiveId": 435,
    "createDateString": "13-Mar-2026",
    "updatedDateString": "16-Mar-2026",
    "createdTime": "2026-03-13T10:53:15",
    "updatedTime": "2026-03-16T11:55:58",
    "active": 0,
    "owner": 2241,
    "createdBy": 3706,
    "updatedBy": 2241,
    "initiativeId": "CA 2.1.1.2",
    "departmentId": 1049
}

//initiativeJsonListDataResponseData

initiativeJsonListData =  initiativeJsonListDataResponseData; 
        console.log(initiativeJsonListData, "initiativeJsonListData");
        generatePDF();   // Call function after loading initiativeJsonListData
    
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
        img.onerror = function() {
            resolve(null);
        }
        img.src = url;
    });
}

const BASE_URL = "http://127.0.0.1:5500/mg-portal-new/"; 

let LOGO_URL = document.getElementById("appLogo")?.src || "/stratroom/images/logo.png"; // Relative path is safer provided base href is set or we are cautious
let COVER_URL = "/stratroom/images/scorecard-bg.jpg";

function getFullUrl(path) {
   
   return window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/') + path;
}

const riskImageUrls = {
    green: "/stratroom/images/buzzer-green-i.svg",
    yellow: "/stratroom/images/buzzer-yellow-i.svg",
    red: "/stratroom/images/buzzer-red-i.svg"
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


  function hexToRGB(hex) {
        hex = hex.replace("#", "");

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        return [r, g, b];
      }


async function generatePDF() {

    await preloadImages();

    const { jsPDF } = window.jspdf;
    let pdf = new jsPDF();
    let pageWidth = pdf.internal.pageSize.width;
    let pageHeight = pdf.internal.pageSize.height;
    const submissionDate = new Date().toLocaleDateString();
    const logoUrl = LOGO_URL;
    const coverImage = COVER_URL;
    const marginLeft = 10;
    const marginRight = pageWidth - marginLeft;

    let initiative = initiativeJsonListData; // API response object

    /* -----------------------------------------------------------
       COVER PAGE
    ------------------------------------------------------------*/

    function addCoverPage(section) {

     

        let cfh = 20;
        let cfhs = 10;
        const hexColor = localStorage.getItem("stratroomPrimaryColor") || "#000000";
        const bgColor = hexToRGB(hexColor);
        let periodText = section?.initiativeValue?.daterange || "N/A";
        let titleText = "Strategic Initiative Report"
        const [r, g, b] = hexToRGB(hexColor);
        pdf.addImage(coverImage, 'JPEG', 0, 0, pageWidth, pageHeight);
        pdf.addImage(logoUrl, "PNG", marginRight - 50, 5, 50, 10);

        pdf.setTextColor(r, g, b);
        pdf.setFontSize(30);
        pdf.setFont("helvetica", "bold");
        pdf.text(titleText.toUpperCase(), pageWidth / 2, 60, { align: "center" });

        pdf.setFontSize(16);
        // pdf.text("REPORT", pageWidth / 2, 75, { align: "center" });

        pdf.setTextColor(r, g, b);
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text(`Period: ${periodText}`, pageWidth / 2, 90, { align: "center" });

         pdf.setFillColor(...bgColor);
            pdf.rect(0, pageHeight - cfhs, pageWidth, cfhs, 'F');
            // Draw angled shape
            pdf.setFillColor(...bgColor);
            pdf.lines([[pageWidth/2, 0],[20, cfh],  [-90, 0] ], -20, pageHeight - cfh, [1, 1], 'F');


              const shapeWidth = 20;
    const shapeHeight = pageHeight / 2; // 50% of the page height

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
            pdf.text(`Period: ${periodText}`, 10, pageHeight - 6);

        pdf.addPage();
    }

    function header(section) {
        console.log(section, "sectionData");
        const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
         const textStartY = imgY + 5;
         let title = (section?.pageTitle ? section.pageTitle + " Report" : "Strategic Initiative Report");
         let name = section?.initiativeValue?.ownerName ? `${section?.initiativeValue?.ownerName}` : "";
         let period = section?.initiativeValue?.daterange ? `${section?.initiativeValue?.daterange}` : "";
         
       
        pdf.addImage(logoUrl, "PNG", imgX, imgY, imgWidth, imgHeight);
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(13);
        pdf.setFont("helvetica", "bold");
        pdf.text(title, marginRight, textStartY - 3, { align: "right" });
        pdf.setTextColor(0, 0, 0);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.text(`Generated Date: ${submissionDate}`, marginRight, textStartY + 1, { align: "right" });
        pdf.text(`Name: ${name}`, marginRight, textStartY + 6, { align: "right" });
        pdf.text(`Period: ${period}`, marginRight, textStartY + 10, { align: "right" });           
        pdf.line(10, imgHeight + 12, pageWidth - 10, imgHeight + 12);
        return imgHeight + 20;
    }

      function footer(pageNumber, totalPages) {
        let footerHeight = 20;
        let footerHeightsm = 10;
        const hexColor = localStorage.getItem("stratroomPrimaryColor") || "#000000";
        const bgColor = hexToRGB(hexColor);

    
    pdf.setFillColor(...bgColor);
    pdf.rect(0, pageHeight - footerHeightsm, pageWidth, footerHeightsm, 'F');

    // Draw angled shape
    pdf.setFillColor(...bgColor);
    pdf.lines([
    [pageWidth/2, 0],   // Move right (top horizontal line)
    [20, footerHeight],  // Diagonal slant
    [-90, 0]   // Move left to close the shape
    ], -20, pageHeight - footerHeight, [1, 1], 'F');

    // White Text Styling
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");

    // Footer Title
    pdf.text("Strategic Initiative Report", 10, pageHeight - 10);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    // Page Number
    pdf.text(`Page ${pageNumber} of ${totalPages}`, marginRight, pageHeight - 4,{ align: "right" });
    }

    /* -----------------------------------------------------------
       START PDF
    ------------------------------------------------------------*/

    addCoverPage(initiative);
    let reportStartPage = pdf.internal.getNumberOfPages();

    let currentY = header(initiative);

    /* -----------------------------------------------------------
       1. INITIATIVE DETAILS
    ------------------------------------------------------------*/

    let detailsBody = [
        ["Strategic Initiative Name", initiative?.initiativeValue?.name || ""],
        ["ID", initiative?.id || ""],
        ["Department", initiative?.activitiesList[0]?.activitiesMapDTOList[0]?.employeeProfilePos?.department ? initiative?.activitiesList[0]?.activitiesMapDTOList[0]?.employeeProfilePos?.department : ""],
        ["Progress", initiative?.initiativeValue?.progressval + "%" || ""],
        ["Start Date - End Date", initiative?.initiativeValue?.daterange || ""],
        ["Perspective", initiative?.initiativeValue?.perspectiveName || ""],
        ["Objective", initiative?.initiativeValue?.objectiveDesc || ""],
        ["Impact KPIs",  initiative?.initiativeValue?.kpi?.map(kpi => kpi.name).join(", ") || ""]
    ];

    const hexColor = localStorage.getItem("stratroomPrimaryColor") || "#934578";
     const headColor = hexToRGB(hexColor);
    pdf.autoTable({
        startY: currentY,
        body: detailsBody,
        theme: "grid",
        styles: { fontSize: 10 },
        columnStyles: {
            0: { fontStyle: "bold", fillColor: headColor, textColor: 255, cellWidth: 60 },
            1: { cellWidth: pageWidth - 80 }
        },
        margin: { left: 10, right: 10 }
    });

    currentY = pdf.lastAutoTable.finalY + 10;

    /* -----------------------------------------------------------
       2. SUB INITIATIVES & ACTIVITIES
    ------------------------------------------------------------*/

    if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(initiative); }

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("SUB INITIATIVES & ACTIVITIES", 10, currentY);
    currentY += 6;

   let subInitRows = [];

if (initiative.subInitiativeList?.length > 0) {

    initiative.subInitiativeList.forEach(sub => {

        let subTitle = sub.subInitiativeValue?.name || 
                       sub.subInitiativeValue?.description || "";
        let subProgress = sub.subInitiativeValue?.progressval || "";
        let subDate = sub.subInitiativeValue?.dateRange || "";

        // ✅ Row 1 → Sub Initiative only
        subInitRows.push([
            subTitle,
            "",
            "",
            subDate,
            subProgress + "%"
        ]);

        if (!sub.activitiesList?.length) return;

        sub.activitiesList.forEach(act => {

            let actTitle = act.activitiesValue?.desc || "";
            let actDate = act.activitiesValue?.dateRange || "";
            let actProgress = act.activitiesValue?.progress || "";

            // ✅ Row 2 → Activity only (under Sub Initiative)
            subInitRows.push([
                "",
                actTitle,
                "",
                actDate,
                actProgress + "%"
            ]);

            if (!act.subActivityList?.length) return;

            act.subActivityList.forEach(subAct => {

                let subActTitle = subAct.activitiesValue?.desc || "";
                let subActDate = subAct.activitiesValue?.dateRange || "";
                let subActProgress = subAct.activitiesValue?.progress || "";

                // ✅ Row 3 → Sub Activity only (under Activity)
                subInitRows.push([
                    "",
                    "",
                    subActTitle,
                    subActDate,
                    subActProgress + "%"
                ]);

            });

        });

    });
}

   pdf.autoTable({
    startY: currentY,
    head: [["Sub Initiative", "Activity", "Sub Activity", "Start-End Date", "Progress"]],
    body: subInitRows,
    theme: "grid",
    styles: { 
        fontSize: 9,
        overflow: 'linebreak',
        cellPadding: 2
    },
    headStyles: { 
        fillColor: headColor, 
        textColor: 255 
    },
    columnStyles: {
        0: { cellWidth: 42 },
        1: { cellWidth: 42 },
        2: { cellWidth: 42 },
        3: { cellWidth: 42 },
        4: { cellWidth: 25 }
    },

    margin: { 
        top: 35,
        bottom: 25, 
        left: 10,
        right: 10
    },

    didDrawPage: function (data) {
        // Add header on new pages created by table
        if (data.pageNumber > 1) {
            header(initiative);
        }
    }
});

    currentY = pdf.lastAutoTable.finalY + 10;

   /* -----------------------------------------------------------
   3. CHARTS SUMMARY TABLE
------------------------------------------------------------*/

if (currentY > pageHeight - 40) { 
    pdf.addPage(); 
    currentY = header(initiative); 
}

pdf.setFontSize(12);
pdf.setFont("helvetica", "bold");
pdf.text("CHARTS", 10, currentY);
currentY += 6;

let chartRows = [];

/* 1️⃣ Initiative Row */
chartRows.push([
    initiative?.initiativeValue?.name || "",
    initiative?.initiativeValue?.daterange || ""
]);

/* 2️⃣ Sub Initiatives Rows */
if (initiative.subInitiativeList?.length > 0) {
    initiative.subInitiativeList.forEach(sub => {
        chartRows.push([
            sub.subInitiativeValue?.description ? sub.subInitiativeValue?.description : sub.subInitiativeValue?.name || "",
            sub.subInitiativeValue?.dateRange || ""
        ]);
    });
}

/* 3️⃣ Milestones Rows */
if (initiative.mileStonesList?.length > 0) {
    initiative.mileStonesList.forEach(m => {
        chartRows.push([
            m.mileStonesValue?.desc || "",
            m.mileStonesValue?.dateRange || ""
        ]);
    });
}

pdf.autoTable({
    startY: currentY,
    head: [["Title", "Date Range"]],
    body: chartRows,
    theme: "grid",
    // styles: { fontSize: 10},
    // headStyles: { fillColor: headColor, textColor: 255 },
    // columnStyles: {
    //     0: { cellWidth: 'auto' },
    //     1: { cellWidth: 45 }
    // },
    // margin: { left: 10, right: 10 }

    styles: { 
        fontSize: 9,
        overflow: 'linebreak',
        cellPadding: 2
    },
    headStyles: { 
        fillColor: headColor, 
        textColor: 255 
    },
    columnStyles: {
        0: { cellWidth: 151 },
        1: { cellWidth: 42 },
       
    },

    margin: { 
        top: 35,
        bottom: 25, 
        left: 10,
        right: 10
    },

    didDrawPage: function (data) {
        // Add header on new pages created by table
        if (data.pageNumber > 1) {
            header(initiative);
        }
    }
});

currentY = pdf.lastAutoTable.finalY + 10;

    

    /* -----------------------------------------------------------
       4. TASKS
    ------------------------------------------------------------*/

    if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(initiative); }

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("TASKS", 10, currentY);
    currentY += 6;

    let taskRows = initiative.taskList?.map(t => [
        t.taskValue?.desc || "",
        t.taskValue?.progress + "%" || "",
        t.taskValue?.dateRange || "",
        t.taskValue?.status || ""
    ]) || [];

    pdf.autoTable({
        startY: currentY,
        head: [["Task", "Progress", "Date Range", "Status"]],
        body: taskRows,
        theme: "grid",
        // styles: { fontSize: 10 },
        // headStyles: { fillColor: headColor, textColor: 255 }
        styles: { 
        fontSize: 9,
        overflow: 'linebreak',
        cellPadding: 2
    },
    headStyles: { 
        fillColor: headColor, 
        textColor: 255 
    },
    columnStyles: {
      0: { cellWidth: 52 },
        1: { cellWidth: 52 },
        2: { cellWidth: 47 },
        3: { cellWidth: 42 },
   
    },

    margin: { 
        top: 35,
        bottom: 25, 
        left: 10,
        right: 10
    },

    didDrawPage: function (data) {
        // Add header on new pages created by table
        if (data.pageNumber > 1) {
            header(initiative);
        }
    }
    });

    currentY = pdf.lastAutoTable.finalY + 10;

    /* -----------------------------------------------------------
       4. MILESTONES
    ------------------------------------------------------------*/

    if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(initiative); }

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("MILESTONES", 10, currentY);
    currentY += 6;

    let mileRows = initiative.mileStonesList?.map(m => [
        m.mileStonesValue?.desc || "",
        m.mileStonesValue?.progress + "%" || "",
        m.mileStonesValue?.dateRange || "",
        m.mileStonesValue?.status || ""
    ]) || [];

    pdf.autoTable({
        startY: currentY,
        head: [["Milestone", "Progress", "Date", "Status"]],
        body: mileRows,
        theme: "grid",
        styles: { 
        fontSize: 9,
        overflow: 'linebreak',
        cellPadding: 2
    },
    headStyles: { 
        fillColor: headColor, 
        textColor: 255 
    },
    columnStyles: {
      0: { cellWidth: 52 },
        1: { cellWidth: 52 },
        2: { cellWidth: 47 },
        3: { cellWidth: 42 },
   
    },

    margin: { 
        top: 35,
        bottom: 25, 
        left: 10,
        right: 10
    },

    didDrawPage: function (data) {
        // Add header on new pages created by table
        if (data.pageNumber > 1) {
            header(initiative);
        }
    }
    });

    currentY = pdf.lastAutoTable.finalY + 10;

    /* -----------------------------------------------------------
       5. COMMENTS
    ------------------------------------------------------------*/

    if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(initiative); }

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("COMMENTS", 10, currentY);
    currentY += 6;

    let commentRows = initiative.commentsList?.map(c => [
        `${c.commentsValue?.createdByName || "User"} 
${c.commentsValue?.formattedTime || ""}
${c.commentsValue?.desc || ""}`
    ]) || [];

    pdf.autoTable({
        startY: currentY,
        head: [["Comment"]],
        body: commentRows,
        theme: "grid",
        styles: { 
        fontSize: 9,
        overflow: 'linebreak',
        cellPadding: 2
    },
    headStyles: { 
        fillColor: headColor, 
        textColor: 255 
    },
    columnStyles: {
      0: { cellWidth: 193 },   
    },

    margin: { 
        top: 35,
        bottom: 25, 
        left: 10,
        right: 10
    },

    didDrawPage: function (data) {
        // Add header on new pages created by table
        if (data.pageNumber > 1) {
            header(initiative);
        }
    }
    });

    /* -----------------------------------------------------------
       PAGE NUMBERS
    ------------------------------------------------------------*/

    const totalPages = pdf.internal.getNumberOfPages();
    const reportPageCount = totalPages - (reportStartPage - 1);

    for (let i = reportStartPage; i <= totalPages; i++) {
        pdf.setPage(i);
        footer(i - (reportStartPage - 1), reportPageCount);
    }

    pdf.save("Strategic Initiative Report.pdf");
}

