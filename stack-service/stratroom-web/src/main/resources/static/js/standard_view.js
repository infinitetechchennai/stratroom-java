var scorecardFields = {}; 
var getScoreCardData = {}
var datePeriodData = $("#datePeriod").val();
var pdftitlecard = ""
var _scoreCard = {};
var scorecardJsonListData = [];
var scorecardJsonListResponseData = [];

var kpiDatagetDetails = {}
var empId =
  $("#userPrincipalnavigate").val() != null &&
  $("#userPrincipalnavigate").val() != ""
    ? $("#userPrincipalnavigate").val()
    : $("#userPrincipal").val();
var reporteelist = {};
var scorecardlist = {}; 
var nodelist = {};
var kpithreshold = "";
var color1 = "";
var color2 = "";
var color3 = "";
var color4 = "";
var color5 = "";
var scorepreference = [];
var scorecardmodPermission = [];

var scoreempPreference = { preferences: {} };
var nodeKeyMap = new Object();
var parentKpidetails = {
  id: "",
  createdBy: "",
  createDateString: "",
  updatedDateString: "",
  kpiFormula: "",
  updatedBy: "",
  createdTime: "",
  kpiValue: "",
  owner: "",
  objectiveId: "",
  kpiId: "",
};
var scorecreatepermission = false;
var scoreeditpermission = false;
var scoredeletepermission = false;
var scoreviewpermission = false;
var scorecardloadview = false;
var measureFieldenable = false;

var perspectivecreatepermission = false;
var perspectiveeditpermission = false;
var perspectiveviewpermission = false;

var objectivecreatepermission = false;
var objectiveeditpermission = false;
var objectiveviewpermission = false;
var objectivedeletepermission = false;

var kpicreatepermission = false;
var kpieditpermission = false;
var kpiviewpermission = false;
var kpideletepermission = false;

var subkpicreatepermission = false;

var KpiViewcreatepermission = false;
var KpiViewviewpermission = false;
var KpiVieweditpermission = false;
var KpiViewdeletepermission = false;

var formulacreatepermission = false;
var formulaviewpermission = false;

var statusHeader = "Status";

var checkemppagemode = $("#employeesupermode").length;

let scoreurlparams = new URL(document.location).searchParams;
let scoresuperpageNo = scoreurlparams.get("pageId");

console.log(empId, "empId");

if (
  checkemppagemode == 0 &&
  ($("#userrolename").val() == "Super User" ||
    $("#userrolename").val() == "Admin")
) {
  if ($("#userPrincipal").val() != $("#userPrincipalnavigate").val()) {
    //$(".subusermenuname").text('Scorecard');
    if ($(".topmenubreadcrumb").length) {
      $(".topmenubreadcrumb").show();
    }
    if ($(".sidebarNavigate").length) {
      $(".sidebarNavigate").show();
    }
  }
  getscorepagenameView();
}

function getscorepagenameView() {
  $.ajax({
    type: "GET",
    url: "/stratroom/pages/" + scoresuperpageNo,
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

function addOption(id, text, value) {
  $(id).append(`<option value="${value}">${text}</option>`);
}

function addList(id, text, value, highlight, type) {
  if (nodeKeyMap[value] == null) {
    nodeKeyMap[value] = text;
  }
  $(id).append(
    `<li class="list-group-item ` +
      highlight +
      `" onclick="updateFormula(${value},'',this,'` +
      type +
      `')">${text}</li>`
  );
}

function addToYTDList(id, text, value, highlight, type) {
  if (nodeKeyMap[value] == null) {
    nodeKeyMap[value] = text;
  }
  $(id).append(
    `<li class="list-group-item ` +
      highlight +
      `" onclick="updateYTDFormula(${value},'',this,'` +
      type +
      `')">${text}</li>`
  );
}

function updateYTDFormula(input, formuladesc, currentElement, typeofmeasure) {
  if (formuladesc != "" && formuladesc != null) {
    if ($(".ytdformuladynamicdesc").css("display") == "none") {
      $(".ytdformuladynamicdesc").show();
    }
    $(".formulacontentdesc").html(getformulaperformance(formuladesc));
    $(".formulaheaderdesc").html(input.toUpperCase());
  }
  var box = $("#customYtdformula");
  var mesaureName = nodeKeyMap[input];
  var formulaval = box.val();
  var checkdefaultvalue = false;

  if (mesaureName == undefined) {
    mesaureName = input;
  }
  mesaureName = mesaureName == undefined ? "" : mesaureName;
  if (typeofmeasure == "sub") {
    mesaureName = "(" + mesaureName + ")";
  }
  if (typeofmeasure == "init") {
    mesaureName = "(" + mesaureName + ")";
  }
  var finalval = formulaval + mesaureName;
  if ($(currentElement).hasClass("kpiformuladescHighlight")) {
    if (formulaval != "" && formulaval.lastIndexOf(mesaureName) != -1) {
      var splitmeasure = formulaval.lastIndexOf(mesaureName);
      var removestr = mesaureName.length;
      var remaingingstr = splitmeasure + removestr;
      $(currentElement).removeClass("kpiformuladescHighlight");
      box.val(
        formulaval.slice(0, splitmeasure) + formulaval.slice(remaingingstr)
      );
      document
        .getElementById("customYtdformula")
        .setSelectionRange(splitmeasure, splitmeasure);
    }
  } else {
    var curPos = document.getElementById("customYtdformula").selectionStart;
    var lastpos = parseInt(
      formulaval.slice(0, curPos).length + mesaureName.length
    );
    box.val(
      formulaval.slice(0, curPos) + mesaureName + formulaval.slice(curPos)
    );
    document
      .getElementById("customYtdformula")
      .setSelectionRange(lastpos, lastpos);
    $(currentElement).addClass("kpiformuladescHighlight");
  }
  // box.val(finalval);
}

function updateThresholdFormula(input) {
  var box = $("#thresholdformula");
  var formulaval = box.val();
  var finalval = formulaval + input;
  var curPos = document.getElementById("thresholdformula").selectionStart;
  var lastpos = parseInt(formulaval.slice(0, curPos).length + input.length);
  box.val(formulaval.slice(0, curPos) + input + formulaval.slice(curPos));
  document
    .getElementById("thresholdformula")
    .setSelectionRange(lastpos, lastpos);
  // box.val(finalval);
}

function updateFormula(input, formuladesc, currentElement, typeofmeasure) {
  console.log(
    input,
    formuladesc,
    currentElement,
    typeofmeasure,
    "input,formuladesc,currentElement,typeofmeasure"
  );
  var box = $("#formula");
  if (formuladesc != "" && formuladesc != null) {
    if ($(".targetformuladynamicdesc").css("display") == "none") {
      $(".targetformuladynamicdesc").show();
    }
    $(".formulacontentdesc").html(getformulabuilder(formuladesc));
    $(".formulaheaderdesc").html(input.toUpperCase());
  }
  var mesaureName = nodeKeyMap[input];
  var formulaval = box.val();
  var checkdefaultvalue = false;

  if (mesaureName == undefined) {
    mesaureName = input;
  }

  /*
   * if(typeof(formulaval) == "string" && (formulaval.endsWith("]") ==
   * true)){ formulaval = formulaval.replace("]",input)+"]"; }
   *
   * if(typeof(mesaureName) == "string" && mesaureName != undefined &&
   * mesaureName != "" && (mesaureName.endsWith("]") == false)){ var checkend =
   * mesaureName.endsWith("]"); if(checkend == false){ mesaureName =
   * mesaureName+"]"; } }
   */
  mesaureName = mesaureName == undefined ? "" : mesaureName;
  if (typeofmeasure == "sub") {
    mesaureName = mesaureName;
  }
  if (typeofmeasure == "init") {
    mesaureName = mesaureName;
  }
  var finalval = formulaval + mesaureName;
  /*
   * if(typeof(finalval) == "string" && finalval != undefined && finalval !=
   * ""){ var checkstart = finalval.startsWith("["); if(checkstart == false){
   * finalval = "["+finalval; } var checkend = finalval.endsWith("]");
   * if(checkend == false){ finalval = finalval+"]"; } }
   */

  if ($(currentElement).hasClass("kpiformuladescHighlight")) {
    if (formulaval != "" && formulaval.lastIndexOf(mesaureName) != -1) {
      var splitmeasure = formulaval.lastIndexOf(mesaureName);
      var removestr = mesaureName.length;
      var remaingingstr = splitmeasure + removestr;
      $(currentElement).removeClass("kpiformuladescHighlight");
      box.val(
        formulaval.slice(0, splitmeasure) + formulaval.slice(remaingingstr)
      );
      document
        .getElementById("formula")
        .setSelectionRange(splitmeasure, splitmeasure);
    }
  } else {
    var curPos = document.getElementById("formula").selectionStart;
    var lastpos = parseInt(
      formulaval.slice(0, curPos).length + mesaureName.length
    );
    box.val(
      formulaval.slice(0, curPos) + mesaureName + formulaval.slice(curPos)
    );
    document.getElementById("formula").setSelectionRange(lastpos, lastpos);
    $(currentElement).addClass("kpiformuladescHighlight");
  }
  // box.val(finalval);
  // $("#formula").append(val);
}

function updatePerformance(input, formuladesc, currentElement) {
  if (formuladesc != "" && formuladesc != null) {
    if ($(".kpiperformuladynamicdesc").css("display") == "none") {
      $(".kpiperformuladynamicdesc").show();
    }
    $(".formulacontentdesc").html(getformulaperformance(formuladesc));
    $(".formulaheaderdesc").html(input.toUpperCase());
  }
  var box = $("#performanceformula");
  var mesaureName = nodeKeyMap[input];
  var formulaval = box.val();
  var checkdefaultvalue = false;

  if (mesaureName == undefined) {
    mesaureName = input;
  }

  mesaureName = mesaureName == undefined ? "" : mesaureName;

  var finalval = formulaval + mesaureName;
  if ($(currentElement).hasClass("kpiformuladescHighlight")) {
    if (formulaval != "" && formulaval.lastIndexOf(mesaureName) != -1) {
      var splitmeasure = formulaval.lastIndexOf(mesaureName);
      var removestr = mesaureName.length;
      var remaingingstr = splitmeasure + removestr;
      $(currentElement).removeClass("kpiformuladescHighlight");
      box.val(
        formulaval.slice(0, splitmeasure) + formulaval.slice(remaingingstr)
      );
      document
        .getElementById("performanceformula")
        .setSelectionRange(splitmeasure, splitmeasure);
    }
  } else {
    var curPos = document.getElementById("performanceformula").selectionStart;
    var lastpos = parseInt(
      formulaval.slice(0, curPos).length + mesaureName.length
    );
    box.val(
      formulaval.slice(0, curPos) + mesaureName + formulaval.slice(curPos)
    );
    document
      .getElementById("performanceformula")
      .setSelectionRange(lastpos, lastpos);
    $(currentElement).addClass("kpiformuladescHighlight");
  }
  // box.val(finalval);
}

function updateCustomObjective(input, formuladesc, currentElement) {
  var box = $("#formulaCustomObjective");
  if (formuladesc != "" && formuladesc != null) {
    if ($(".objectiveformuladynamicdesc").css("display") == "none") {
      $(".objectiveformuladynamicdesc").show();
    }
    $(".formulacontentdesc").html(getformulaperformance(formuladesc));
    $(".formulaheaderdesc").html(input.toUpperCase());
  }
  var mesaureName = input;
  var formulaval = box.val();
  var checkdefaultvalue = false;
  var finalval = formulaval + mesaureName;
  if ($(currentElement).hasClass("kpiformuladescHighlight")) {
    if (formulaval != "" && formulaval.lastIndexOf(mesaureName) != -1) {
      var splitmeasure = formulaval.lastIndexOf(mesaureName);
      var removestr = mesaureName.length;
      var remaingingstr = splitmeasure + removestr;
      $(currentElement).removeClass("kpiformuladescHighlight");
      box.val(
        formulaval.slice(0, splitmeasure) + formulaval.slice(remaingingstr)
      );
      document
        .getElementById("formulaCustomObjective")
        .setSelectionRange(splitmeasure, splitmeasure);
    }
  } else {
    var curPos = document.getElementById(
      "formulaCustomObjective"
    ).selectionStart;
    var lastpos = parseInt(
      formulaval.slice(0, curPos).length + mesaureName.length
    );
    box.val(
      formulaval.slice(0, curPos) + mesaureName + formulaval.slice(curPos)
    );
    document
      .getElementById("formulaCustomObjective")
      .setSelectionRange(lastpos, lastpos);
    $(currentElement).addClass("kpiformuladescHighlight");
  }
  // box.val(finalval);
}

function updateCustomPerspective(input, formuladesc, currentElement) {
  var box = $("#formulaCustomPerspective");
  if (formuladesc != "" && formuladesc != null) {
    if ($(".perspectiveformuladynamicdesc").css("display") == "none") {
      $(".perspectiveformuladynamicdesc").show();
    }
    $(".formulacontentdesc").html(getformulaperformance(formuladesc));
    $(".formulaheaderdesc").html(input.toUpperCase());
  }
  var mesaureName = input;
  var formulaval = box.val();
  var checkdefaultvalue = false;
  var finalval = formulaval + mesaureName;
  if ($(currentElement).hasClass("kpiformuladescHighlight")) {
    if (formulaval != "" && formulaval.lastIndexOf(mesaureName) != -1) {
      var splitmeasure = formulaval.lastIndexOf(mesaureName);
      var removestr = mesaureName.length;
      var remaingingstr = splitmeasure + removestr;
      $(currentElement).removeClass("kpiformuladescHighlight");
      box.val(
        formulaval.slice(0, splitmeasure) + formulaval.slice(remaingingstr)
      );
      document
        .getElementById("formulaCustomPerspective")
        .setSelectionRange(splitmeasure, splitmeasure);
    }
  } else {
    var curPos = document.getElementById(
      "formulaCustomPerspective"
    ).selectionStart;
    var lastpos = parseInt(
      formulaval.slice(0, curPos).length + mesaureName.length
    );
    box.val(
      formulaval.slice(0, curPos) + mesaureName + formulaval.slice(curPos)
    );
    document
      .getElementById("formulaCustomPerspective")
      .setSelectionRange(lastpos, lastpos);
    $(currentElement).addClass("kpiformuladescHighlight");
  }
  // box.val(finalval);
}

function populateOwnerDropdownScorecard(elementId, formtypeElement) {
  var numberOfOptions = $(elementId + " > option").length;
  console.log("numberOfOptions", numberOfOptions);
  console.log(
    "jQuery.isEmptyObject(reporteelist)",
    jQuery.isEmptyObject(reporteelist)
  );
  $(elementId).empty();
  if (jQuery.isEmptyObject(reporteelist)) {
    $.ajax({
      url: "/stratroom/completereporteeList",
      success: function (employeeList) {
        reporteelist = employeeList;
        console.log("reporteelist", reporteelist);
        $.each(employeeList, function (index, reportee) {
          addOption(elementId, reportee.name, reportee.id);
        });
        multipleoptionElementTriggerValuesScorecard(formtypeElement);
      },
    });
  } else {
    $.each(reporteelist, function (index, reportee) {
      console.log("reportee", reportee);

      addOption(elementId, reportee.name, reportee.id);
    });
    multipleoptionElementTriggerValuesScorecard(formtypeElement);
  }

  // } else if (numberOfOptions < 2) {
  // 	$.each(reporteelist, function(index, reportee) {
  // 		console.log('reportee',reportee);

  // 		addOption(elementId, reportee.name, reportee.id)
  // 	});
  // 	multipleoptionElementTriggerValuesScorecard(formtypeElement);
  // }
  //else

  //multipleoptionElementTriggerValuesScorecard(formtypeElement);
}

function populateobjectiveOwnerDropdownScorecard(elementId, formtypeElement) {
  var numberOfOptions = $(elementId + " > option").length;

  if (jQuery.isEmptyObject(reporteelist)) {
    $.ajax({
      url: "/stratroom/completereporteeList",
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

  multipleoptionObjectiveElementTriggerValuesScorecard(formtypeElement);
}

function departmentlist(elementId, empId) {
  $(elementId).empty();
  var implementationtypemethod = false;
  if (
    controlpanelgeneralsiteSettings.implementation != null &&
    controlpanelgeneralsiteSettings.implementation != undefined &&
    controlpanelgeneralsiteSettings.implementationType != null &&
    controlpanelgeneralsiteSettings.implementationType != undefined
  ) {
    if (controlpanelgeneralsiteSettings.implementationType == "Department") {
      implementationtypemethod = true;
    }
  }
  var url = implementationtypemethod
    ? "/stratroom/ownerMappingDepartmentList?empId=" + empId
    : "/stratroom/allDepartmentList";
  $.ajax({
    url: url,
    async: false,
    success: function (data, status) {
      $.each(data, function (index, reportee) {
        addOption(elementId, reportee.name, reportee.id);
      });
    },
  });
}

function populatecustomReporteeOwnerDropdownScorecard(
  elementId,
  formtypeElement
) {
  var numberOfOptions = $(elementId + " > option").length;
  $(elementId).empty();
  if (jQuery.isEmptyObject(reporteelist)) {
    $.ajax({
      url: "/stratroom/completereporteeList",
      async: false,
      success: function (employeeList) {
        reporteelist = employeeList;
        $.each(employeeList, function (index, reportee) {
          if (empId != reportee.id) {
            addOption(elementId, reportee.name, reportee.id);
          }
        });
      },
    });
  } else if (numberOfOptions < 2) {
    $.each(reporteelist, function (index, reportee) {
      if (empId != reportee.id) {
        addOption(elementId, reportee.name, reportee.id);
      }
    });
  }

  // multipleoptionObjectiveElementTriggerValuesScorecard(formtypeElement);
}

function populatekpiOwnerDropdownScorecard(elementId, formtypeElement) {
  var numberOfOptions = $(elementId + " > option").length;
  //$("#kpi_owner").find("option").remove().end();
  if (jQuery.isEmptyObject(reporteelist)) {
    $.ajax({
      url: "/stratroom/completereporteeList",
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

  multipleoptionKpiElementTriggerValuesScorecard(formtypeElement);
}

function multipleoptionElementTriggerValuesScorecard(formtypeElement) {
  if (formtypeElement != undefined && formtypeElement != "") {
    $(formtypeElement + " select")
      .not(".form-control")
      .formSelect();
    $(formtypeElement + " select.select_all")
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
}

function multipleoptionObjectiveElementTriggerValuesScorecard(formtypeElement) {
  if (formtypeElement != undefined && formtypeElement != "") {
    $(formtypeElement + " select")
      .not(".form-control")
      .formSelect();
    $(formtypeElement + " select.select_all")
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
}

function multipleoptionKpiElementTriggerValuesScorecard(formtypeElement) {
  if (formtypeElement != undefined && formtypeElement != "") {
    $(formtypeElement + " select")
      .not(".form-control")
      .formSelect();
    $(formtypeElement + " select.select_all")
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
}

// function scordcardSuccessCallback(data) {

// 	console.log(data, "datadata");
// 	        score_value="";
// 			if(data.thresholdResult != "" || data.thresholdResult != null){
// 				score_value = data.thresholdResult;
// 			}
// 			else
// 			{
// 				score_value= "0.0";
// 			}
// 			$("#score").html(score_value);
// 	if (data.message != undefined && data.scoreCardName != undefined) {
// 		var scorecardhtmlcontent	=	data.scoreCardName+`<span class="scorecard_status scorecardname" style="background-color:#1aa243"></span>`;
// 		$(".pageTitleStatus").html(scorecardhtmlcontent);
// 		if($(".superusertopmenu").hasClass(scoresuperpageNo)){
// 			$(".subusermenuname").text(data.scoreCardName);
// 		}
// 	}

// 	if (!data.flag && data.message != undefined && data.message != "") {
// 		$(".container-fluid .tableview").attr("style","background-color: white;padding: 10px;margin-top: 10px;border-radius: 10px;").html("<center><h3>"+data.message+"</h3></center>")
// 	}
// 	scorecardlist = data.cardDetailsDTO;

// 	var perspectiveTemplate = $('#perspective-template').html();
// 	Mustache.parse(perspectiveTemplate);

// 	var perspectiveHeaderRowTemplate = $('#perspective-header-row-template')
// 			.html();
// 	Mustache.parse(perspectiveHeaderRowTemplate);

// 	var objectiveRowTemplate = $('#objective-row-template').html();
// 	Mustache.parse(objectiveRowTemplate); // optional, speeds up future uses

// 	var kpiRowTemplate = $('#kpi-row-template').html();
// 	Mustache.parse(kpiRowTemplate); // optional, speeds up future uses
// 	var subkpiRowTemplate = $('#subkpi-row-template').html();
// 	Mustache.parse(subkpiRowTemplate); // optional, speeds up future uses
// 	var designlabel	=	"";
// 	$("#viewiconTxt").empty();
// 	$('#scordcard-wrapper').empty();
// 	var nestedredcount=0;
// 	var nestedyellowcount=0;
// 	var nestedblackcount=0;
// 	var nestedgreencount=0;
// 	var scorecardname = 'ScoreCard';

// 	var scorecardactual	=	false;
// 	var scorecardtarget	=	false;
// 	var scorecardbudget	=	false;
// 	var scorecardforecast	=	false;
// 	var scorecardscore	=	false;
// 	var scorecardtrend	=	false;
// 	var scorecardrisk	=	false;
// 	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardactual !=	undefined && controlpanelScorecardSettings.scorecardactual == true){
// 		scorecardactual	=	true;
// 	}
// 	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardtarget !=	undefined && controlpanelScorecardSettings.scorecardtarget == true){
// 		scorecardtarget	=	true;
// 	}
// 	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardbudget !=	undefined && controlpanelScorecardSettings.scorecardbudget == true){
// 		scorecardbudget	=	true;
// 	}
// 	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardforecast !=	undefined && controlpanelScorecardSettings.scorecardforecast == true){
// 		scorecardforecast	=	true;
// 	}
// 	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardscore !=	undefined && controlpanelScorecardSettings.scorecardscore == true){
// 		scorecardscore	=	true;
// 	}
// 	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardtrend !=	undefined && controlpanelScorecardSettings.scorecardtrend == true){
// 		scorecardtrend	=	true;
// 	}
// 	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardrisk !=	undefined && controlpanelScorecardSettings.scorecardrisk == true){
// 		scorecardrisk	=	true;
// 	}

// 	if (data.cardDetailsDTO != undefined) {
// 		if (data.cardDetailsDTO.scorecardName != undefined && data.cardDetailsDTO.scorecardName != null) {
// 			scorecardname = data.cardDetailsDTO.scorecardName;

// 			$(".scorecardname").text(scorecardname);
// 			// $('#scorecardparent').html(scorecarddata);
// 			var upiconflag	=	false;
// 			if(jQuery.isEmptyObject(data.cardDetailsDTO.scoreCardDTOS)) {
// 				if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.customPerformance != undefined && controlpanelScorecardSettings.customPerformance == true){
// 					//var scorecardstatusiconElement	=	$(".scorecardname");
// 					var scorecardhtmlcontent	=	scorecardname+`<span class="scorecard_status scorecardname" style="background-color:#1aa243"></span>`;
// 					$(".pageTitleStatus").html(scorecardhtmlcontent);
// 					if($(".superusertopmenu").hasClass(scoresuperpageNo)){
// 						$(".subusermenuname").text(scorecardname);
// 					}
// 				}else{
// 					upiconflag	=	true;
// 				}
// 			}else{
// 				scorecardname	=	(data.cardDetailsDTO.scoreCardDTOS[0].scorecardName !=	undefined && data.cardDetailsDTO.scoreCardDTOS[0].scorecardName !=	null?data.cardDetailsDTO.scoreCardDTOS[0].scorecardName:scorecardname);
// 			}
// 		}
// 	}else{
// 		scorecardname	=	(data.scoreCardName !=	undefined && data.scoreCardName !=	null?data.scoreCardName:scorecardname);
// 	}

// 	if(upiconflag	==	true){
// 		var scorecardhtmlcontent	=	scorecardname+`<span id="scorecardstatusicon"></span>`;
// 		$(".pageTitleStatus").html(scorecardhtmlcontent);
// 		if($(".superusertopmenu").hasClass(scoresuperpageNo)){
// 			$(".subusermenuname").text(scorecardname);
// 		}
// 		var scorecardstatusiconElement	=	$("#scorecardstatusicon");
// 		scorecardstatusiconElement.addClass("fa fa-arrow-circle-up").css({"font-size":"20px","color":"#1aa243"});
// 	}

// 	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.statusrequired != undefined && controlpanelScorecardSettings.statusrequired == true){
// 		if((controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardstatus != undefined && controlpanelScorecardSettings.scorecardstatus == false) &&
// 				controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.performance != undefined && controlpanelScorecardSettings.performance == false){
// 			$(".scorecardname").css("background-color","unset");
// 			$("#scorecardstatusicon").removeClass("fa-arrow-circle-up");
// 		}
// 	}else{
// 		$(".scorecardname").css("background-color","unset");
// 		$("#scorecardstatusicon").removeClass("fa-arrow-circle-up");
// 	}

// 	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == true){
// 		if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardscoreper != undefined && controlpanelScorecardSettings.scorecardscoreper == false){
// 			$(".scorecardname").text("");
// 		}
// 	}else if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == false){
// 		$(".scorecardname").text("");
// 	}else{
// 		if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardscoreper != undefined && controlpanelScorecardSettings.scorecardscoreper == false){
// 			$(".scorecardname").text("");
// 		}
// 	}

// 	if(data.cardDetailsDTO !=	undefined){
// 		$.each(data.cardDetailsDTO.scoreCardDTOS, function(index, scorecard) {

// 			var actualdisplay	=	"";
// 			var targetdisplay	=	"";
// 			var trenddisplay	=	"";
// 			var riskdisplay		=	"";
// 			var scoredisplay	=	"";
// 			var statusDisplay	=	"";
// 			var currentheaderRow 	=	{};
// 			currentheaderRow.header1	=	scorecard.scoreCardValue.header1;
//             currentheaderRow.header2 	=	scorecard.scoreCardValue.header2;

// 			if(scorecardactual == true){
// 				actualdisplay	=	true;
// 				currentheaderRow.header3='<th data-i18n="Actual">Actual</th>';
// 			}

// 			if(scorecardtarget == true){
// 				targetdisplay	=	true;
// 				currentheaderRow.header4='<th data-i18n="Target">Target</th>';
// 			}

// 			if(scorecardtrend == true){
// 				trenddisplay	=	true;
// 				currentheaderRow.header5='<th data-i18n="Trend">Trend</th>';
// 			}

// 			if(scorecardrisk == true){
// 				riskdisplay	=	true;
// 				currentheaderRow.header6='<th data-i18n="Risk">Risk</th>';
// 			}

// 			if(scorecardscore == true){
// 				scoredisplay	=	true;
// 				currentheaderRow.header7='<th data-i18n="Index">Index</th>';
// 			}

// 			var headerRow = Mustache.render(perspectiveHeaderRowTemplate, currentheaderRow);

// 			var bodyRows = '';
// 			var subbodyRows='';

// 			if (scorecard.objectiveList && scorecard.objectiveList.length > 0) {
// 				$.each(scorecard.objectiveList, function(objIndex, objective) {
// 					// todo: Read objectives and pass it to Mustache

// 					// objective row permission
// 						var objectiveOptionsicon	=	"";
// 						if(kpicreatepermission	==	false && objectiveeditpermission	==	false && objectiveviewpermission	==	false && objectivedeletepermission	==	false){
// 							objectiveOptionsicon	=	"";
// 						}else{

// 							objectiveOptionsicon	=	`<div style="width: 109px !important;"></div><ul class="header-dropdown m-r--5">
// 			                <li class="dropdown">
// 			                    <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
// 			                        <i class="material-icons">more_vert</i>
// 			                    </a>
// 	                    		<ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(-104px, 24px, 0px);">
// 	                        	`;

// 							if(kpicreatepermission	==	true){
// 								objectiveOptionsicon	+=	`<li>
// 	                            <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="handleKpiEvent('0', 'add', `+objective.id+`)" data-i18n="Add">Add</a>
// 	                        </li>`;
// 							}

// 							if(objectiveeditpermission	==	true){
// 								objectiveOptionsicon	+=	`<li>
// 	                            <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="handleObjectiveEvent(`+objective.id+`, 'edit', `+scorecard.id+`)" data-i18n="Edit">Edit</a>
// 	                        </li>`;
// 							}

// 							if(objectiveviewpermission	==	true){
// 								objectiveOptionsicon	+=	`<li>
// 	                            <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="handleObjectiveEvent(`+objective.id+`, 'view', `+scorecard.id+`)" data-i18n="View">View</a>
// 	                        </li>`;
// 							}

// 							if(objectivedeletepermission	==	true){
// 								objectiveOptionsicon	+=	`<li>
// 	                            	<a href="#" onclick="handleObjectiveEvent(`+objective.id+`, 'delete', `+scorecard.id+`)" data-i18n="Delete">Delete</a>
// 	                        	</li>`;
// 							}

// 							objectiveOptionsicon	+=	`</ul></li></ul>`;
// 						}

// 						var objthresholdResult	=	"";
// 						if(objective.objectivesValue.thresholdResult !=	undefined && scoredisplay	==	true){
// 							objthresholdResult	=	objective.objectivesValue.thresholdResult;
// 						}

// 						var trendrisktd	=	"";

// 						if(trenddisplay == true && riskdisplay == true){
// 							trendrisktd	=	"<td></td><td></td>";
// 						}else if(trenddisplay == true && riskdisplay == false){
// 							trendrisktd	=	"<td></td>";
// 						}else if(trenddisplay == false && riskdisplay == true){
// 							trendrisktd	=	"<td></td>";
// 						}else if(trenddisplay == false && riskdisplay == false){
// 							trendrisktd	=	"";
// 						}

// 						var actualtargettd	=	"";

// 						if(actualdisplay == true && targetdisplay == true){
// 							actualtargettd	=	"<td></td><td></td>";
// 						}else if(actualdisplay == true && targetdisplay == false){
// 							actualtargettd	=	"<td></td>";
// 						}else if(actualdisplay == false && targetdisplay == true){
// 							actualtargettd	=	"<td></td>";
// 						}else if(actualdisplay == false && targetdisplay == false){
// 							actualtargettd	=	"";
// 						}

// 						if(typeof(objthresholdResult) == "string" && objthresholdResult !=	undefined && !objthresholdResult.includes('%') && objthresholdResult !=	"")
// 						{
// 							objthresholdResult = objthresholdResult + "%"
// 						}

// 						if(scoredisplay == true){
// 							objthresholdResult	=	"<td><strong>"+objthresholdResult+"</strong></td>";
// 						}
// 					var objstatusLight	=	"";
// 					if(objective.objectivesValue.statusLightFlag !=	undefined && objective.objectivesValue.statusLightFlag !=	""){
// 						objstatusLight	=	'<i class="'+objective.objectivesValue.statusLight+'" style="font-size:10px !important;color:'+objective.objectivesValue.statusLightFlag+' !important;"></i>';
// 					}else{
// 						objstatusLight	=	'<i class="'+objective.objectivesValue.statusLight+'" style="font-size:10px !important;"></i>';
// 					}

// 					if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.statusrequired != undefined && controlpanelScorecardSettings.statusrequired == true){
// 						if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.objectivestatus != undefined && controlpanelScorecardSettings.objectivestatus == false){
// 							objstatusLight	=	"";
// 						}
// 					}else if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.statusrequired != undefined && controlpanelScorecardSettings.statusrequired == false){
// 						objstatusLight	=	"";
// 					}else{
// 						if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.objectivestatus != undefined && controlpanelScorecardSettings.objectivestatus == false){
// 							objstatusLight	=	"";
// 						}
// 					}

// 					if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == true){
// 						if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.objectivescore != undefined && controlpanelScorecardSettings.objectivescore == false){
// 							objthresholdResult	=	"<td></td>";
// 						}
// 					}else if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == false){
// 						objthresholdResult	=	"<td></td>";
// 					}else{
// 						if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.objectivescore != undefined && controlpanelScorecardSettings.objectivescore == false){
// 							objthresholdResult	=	"<td></td>";
// 						}
// 					}

// 					var objectiveRow = Mustache.render(objectiveRowTemplate, {
// 						scoreCardId : scorecard.id,
// 						objectiveId : objective.id,
// 						objectiveDisplayId : objective.objectiveId,
// 						objectiveName : objective.objectivesValue.name,
// 						statusLight : objstatusLight,
// 						objthresholdResult:objthresholdResult,
// 						actualtargettd:actualtargettd,
// 						trendrisktd:trendrisktd,
// 						objectiveOptionsicon:objectiveOptionsicon
// 					});

// 					bodyRows = bodyRows + objectiveRow;

// 					if (objective.kpiList && objective.kpiList.length > 0) {
// 						$.each(objective.kpiList, function(kpiIndex, kpi) {
// 							// todo: Read objectives and pass it to Mustache

// 							var hasSubKpi = (kpi.subKpiList != undefined && kpi.subKpiList.length > 0);

// 							var kpiActual	=	(kpi.kpiValue.actual !=	undefined && kpi.kpiValue.actual !=	null?kpi.kpiValue.actual:"");
// 							var kpiTarget	=	(kpi.kpiValue.target !=	undefined && kpi.kpiValue.target !=	null?kpi.kpiValue.target:"");
// 							var pageno = $('#pagenumber').val();

// 							var targetcurrency	=	(kpi.kpiValue.targetCurrency != undefined && kpi.kpiValue.targetCurrency != ""?kpi.kpiValue.targetCurrency:"");
// 							var actutalcurrency	=	(kpi.kpiValue.actualCurrency != undefined && kpi.kpiValue.actualCurrency != ""?kpi.kpiValue.actualCurrency:"");
// 							targetcurrency	=	(targetcurrency ==""?targetcurrency:kpi.kpiValue.kpiCurrency != undefined && kpi.kpiValue.kpiCurrency != ""?kpi.kpiValue.kpiCurrency:"");
// 							actutalcurrency	=	(actutalcurrency ==""?actutalcurrency:kpi.kpiValue.kpiCurrency != undefined && kpi.kpiValue.kpiCurrency != ""?kpi.kpiValue.kpiCurrency:"");

// 							kpiActual		=	actutalcurrency+kpiActual // actutalcurrency+numberchartActual['firstletter']+intergerHumanFormat(numberchartActual['number'])+numberchartActual['lastletter'];

// 							if(kpi.kpiValue.dataType !=	undefined && kpi.kpiValue.dataType !=	null)
// 								{
// 									if(kpi.kpiValue.dataType == 'Percentage')
// 										{

// 											if(!kpiTarget.includes('%'))
// 												{
// 												kpiTarget = kpiTarget + "%"
// 												}

// 										}
// 								}
// 							kpiTarget		=	targetcurrency+kpiTarget

// 							// kpi row permission
// 							var kpiOptionsicon	=	"";
// 							if(subkpicreatepermission	==	false && kpieditpermission	==	false && kpiviewpermission	==	false && kpideletepermission	==	false){
// 								kpiOptionsicon	=	"";
// 							}else{

// 								kpiOptionsicon	=	`<ul class="header-dropdown" style="margin: 0px;">
// 									<li class="dropdown">
// 										<a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
// 											<i class="material-icons">more_vert</i>
// 										</a>
// 										<ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">`;

// 								 if(subkpicreatepermission	==	true){
// 									kpiOptionsicon	+=	`<li>
// 										<a href="#" data-toggle="modal" data-target=".subkpi_description_popup" class="kpidescription" onclick="handleSubKpiEvent(`+kpi.id+`, 'add', `+objective.id+`)" data-i18n="Add">Add</a>
// 									</li>`;
// 								}

// 								if(kpieditpermission	==	true){
// 									kpiOptionsicon	+=	`<li>
// 										<a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="handleKpiEvent(`+kpi.id+`, 'edit', `+objective.id+`)" data-i18n="Edit">Edit</a>
// 									</li>`;
// 								}

// 								if(kpiviewpermission	==	true){
// 									kpiOptionsicon	+=	`<li>
// 										<a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="handleKpiEvent(`+kpi.id+`, 'view', `+objective.id+`)" data-i18n="View">View</a>
// 									</li>`;
// 								}

// 								if(kpideletepermission	==	true){
// 									kpiOptionsicon	+=	`<li>
// 										<a href="#" onclick="handleKpiEvent(`+kpi.id+`, 'delete', `+objective.id+`)" data-i18n="Delete">Delete</a>
// 									</li>`;
// 								}

// 								kpiOptionsicon	+=	`</ul></li></ul>`;
// 							}

// 							var currentRow 	=	{};
// 							console.log(currentRow,"currentRow");
// 							currentRow.hasSubKpi = hasSubKpi;
// 							currentRow.objectiveId	=	objective.id;
// 							currentRow.kpiId		=	kpi.id;
// 							currentRow.scoreCardId  =  scorecard.id;
// 							currentRow.pageId       =  pageno;
// 							currentRow.kpiDisplayId	=	kpi.kpiId;
// 							currentRow.kpiName		=	kpi.kpiValue.name;
// 							currentRow.kpiMeasure	=	kpi.kpiValue.kpi_measurement;

// 							if (currentRow.kpiMeasure == "Monthly") {
// 								currentRow.kpiPeriod = "Monthly";
// 							} else if (currentRow.kpiMeasure == "Annually") {
// 								currentRow.kpiPeriod = "Annually";
// 							} else if (currentRow.kpiMeasure == "Half Yearly") {
// 								currentRow.kpiPeriod = "Half Yearly";
// 							}else if (currentRow.kpiMeasure == "Annually") {
// 								currentRow.kpiPeriod = "Annually";
// 							} else if (currentRow.kpiMeasure == "Quarterly") {
// 								currentRow.kpiPeriod = "Quarterly";
// 							} else {
// 								currentRow.kpiPeriod = "unknown";
// 							}

// 							let currentLanguage = localStorage.getItem("selectedLang") || "en";
// 							console.log(currentLanguage, currentRow.kpiMeasure, "currentLanguage");

// 							if(kpi.kpiValue.statusLightFlag !=	undefined && kpi.kpiValue.statusLightFlag !=	""){
// 								currentRow.statusLight	=	'<i class="'+kpi.kpiValue.statusLight+'" style="font-size:10px !important;color:'+kpi.kpiValue.statusLightFlag+' !important;"></i>';
// 							}else{
// 								currentRow.statusLight	=	'<i class="'+kpi.kpiValue.statusLight+'" style="font-size:10px !important;"></i>';
// 							}

// 							currentRow.kpiOptionsicon	=	kpiOptionsicon;

// 							var kpithresholdResult	=	"";
// 							if(kpi.kpiValue.thresholdResult !=	undefined){
// 								kpithresholdResult	=	kpi.kpiValue.thresholdResult;
// 							}
// 							if(actualdisplay	==	true){
// 								currentRow.kpiActual		=	'<th  style="white-space: nowrap;">'+kpiActual+'</th>';
// 							}
// 							if(targetdisplay	==	true){
// 								currentRow.kpiTarget		=	'<th  style="white-space: nowrap;">'+kpiTarget+'</th>';
// 							}
// 							if(scoredisplay	==	true){
// 								currentRow.kpithresholdResult	=	'<th  style="white-space: nowrap;">'+kpithresholdResult+'</th>';
// 							}
// 							if(trenddisplay	==	true){
// 								currentRow.trendValue	=	"<th><i class=\""+kpi.kpiValue.trend+"\"></i></th>";
// 							}
// 							if(riskdisplay	==	true){
// 								currentRow.riskStatusLight	=	'<th><a href="/stratroom/risks?kpiId='+kpi.id+'&kpiRiskView=true"><i class="'+kpi.kpiValue.riskStatusLight+'" style="font-size:10px !important"></i></a></th>';
// 							}

// 							if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.statusrequired != undefined && controlpanelScorecardSettings.statusrequired == true){
// 								if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.kpistatus != undefined && controlpanelScorecardSettings.kpistatus == false){
// 									currentRow.statusLight	=	"";
// 								}
// 							}else if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.statusrequired != undefined && controlpanelScorecardSettings.statusrequired == false){
// 								currentRow.statusLight	=	"";
// 							}else{
// 								if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.kpistatus != undefined && controlpanelScorecardSettings.kpistatus == false){
// 									currentRow.statusLight	=	"";
// 								}
// 							}
// 							if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == true){
// 								if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.kpiscore != undefined && controlpanelScorecardSettings.kpiscore == false){
// 									currentRow.kpithresholdResult	=	"<th></th>";
// 								}
// 							}else if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == false){
// 								currentRow.kpithresholdResult	=	"<th></th>";
// 							}else{
// 								if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.kpiscore != undefined && controlpanelScorecardSettings.kpiscore == false){
// 									if(scoredisplay	==	true){
// 										currentRow.kpithresholdResult	=	"<th></th>";
// 									}
// 								}
// 							}

// 							if(KpiViewviewpermission	==	true){
// 								var useraccessid	=	localStorage.getItem("useraccessid");

// 								//if(KpiViewcreatepermission	==	true && KpiViewviewpermission	==	true && KpiVieweditpermission == true && KpiViewdeletepermission	==	true){
// 								if(useraccessid)
// 								{
// 									currentRow.KpiViewLink	=	'class="kpiclearrecord" href="/stratroom/kpiView?kpiId='+kpi.id+'&scoreCardId='+scorecard.id+'&objectiveId='+objective.id+'&pageId='+pageno+'&empId='+useraccessid+'"';

// 								}else
// 								{
// 									flagType="kpi"
// 									currentRow.KpiViewLink	=	'class="kpiclearrecord" href="/stratroom/kpiView?kpiId='+kpi.id+'&flagtype='+flagType+'&scoreCardId='+scorecard.id+'&objectiveId='+objective.id+'&pageId='+pageno+'"';
// 								}
// 							}else{
// 								currentRow.KpiViewLink	=	'';
// 							}
// 							var kpiRow = Mustache.render(kpiRowTemplate, currentRow);
// 							bodyRows = bodyRows + kpiRow;

// 							if (kpi.subKpiList && kpi.subKpiList.length > 0) {
// 								$.each(kpi.subKpiList, function(kpiIndex, subKpi) {
// 									console.log(subKpi,"subKpi");
// 									// todo: Read objectives and pass it to Mustache

// 									// var hasSubKpi = (kpi.subKpiList != undefined && kpi.subKpiList.length > 0);

// 									var kpiActual	=	(subKpi.subKpiValue.actual !=	undefined && subKpi.subKpiValue.actual !=	null?subKpi.subKpiValue.actual:"");
// 									var kpiTarget	=	(subKpi.subKpiValue.target !=	undefined && subKpi.subKpiValue.target !=	null?subKpi.subKpiValue.target:"");
// 									var pageno = $('#pagenumber').val();

// 									var targetcurrency	=	(subKpi.subKpiValue.targetCurrency != undefined && subKpi.subKpiValue.targetCurrency != ""?subKpi.subKpiValue.targetCurrency:"");
// 									var actutalcurrency	=	(subKpi.subKpiValue.actualCurrency != undefined && subKpi.subKpiValue.actualCurrency != ""?subKpi.subKpiValue.actualCurrency:"");
// 									targetcurrency	=	(targetcurrency ==""?targetcurrency:subKpi.subKpiValue.kpiCurrency != undefined && subKpi.subKpiValue.kpiCurrency != ""?subKpi.subKpiValue.kpiCurrency:"");
// 									actutalcurrency	=	(actutalcurrency ==""?actutalcurrency:subKpi.subKpiValue.kpiCurrency != undefined && subKpi.subKpiValue.kpiCurrency != ""?subKpi.subKpiValue.kpiCurrency:"");

// 									kpiActual		=	actutalcurrency+kpiActual // actutalcurrency+numberchartActual['firstletter']+intergerHumanFormat(numberchartActual['number'])+numberchartActual['lastletter'];

// 									if(subKpi.subKpiValue.dataType !=	undefined && subKpi.subKpiValue.dataType !=	null)
// 										{
// 											if(subKpi.subKpiValue.dataType == 'Percentage')
// 												{

// 													if(!kpiTarget.includes('%'))
// 														{
// 														kpiTarget = kpiTarget + "%"
// 														}

// 												}
// 										}
// 									kpiTarget		=	targetcurrency+kpiTarget // targetcurrency+numberchartTarget['firstletter']+numberchartTarget['number']+numberchartTarget['lastletter'];

// 									// subKpi row permission
// 									var kpiOptionsicon	=	"";

// 									if( kpieditpermission	==	false && kpiviewpermission	==	false && kpideletepermission	==	false){
// 										kpiOptionsicon	=	"";
// 									}else{

// 										kpiOptionsicon	=	`<ul class="header-dropdown" style="margin: 0px;">
// 											<li class="dropdown">
// 												<a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
// 													<i class="material-icons">more_vert</i>
// 												</a>
// 												<ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">`;

// 										if(kpieditpermission	==	true){
// 											kpiOptionsicon	+=	`<li>
// 												<a href="#" data-toggle="modal" data-target=".updateSubkpi_description_popup" class="kpidescription" onclick="handleEditSubKpiEvent(`+subKpi.id+`, 'edit', `+objective.id+`,`+subKpi.kpiId+`)">Edit</a>
// 											</li>`;
// 										}

// 										if(kpiviewpermission	==	true){
// 											kpiOptionsicon	+=	`<li>
// 												<a href="#" data-toggle="modal" data-target=".updateSubkpi_description_popup" class="kpidescription" onclick="handleEditSubKpiEvent(`+subKpi.id+`, 'view', `+objective.id+`)">View</a>
// 											</li>`;
// 										}

// 										if(kpideletepermission	==	true){
// 											kpiOptionsicon	+=	`<li>
// 												<a href="#" onclick="handledeleteSubKpi(`+subKpi.id+`, 'delete')">Delete</a>
// 											</li>`;
// 										}

// 										kpiOptionsicon	+=	`</ul></li></ul>`;
// 									}

// 									var subCurrentRow = {};
// 									subCurrentRow.objectiveId = objective.id;
// 									subCurrentRow.kpiId = subKpi.kpiId;
// 									subCurrentRow.kpiDisplayId = subKpi.subKpiId;
// 									subCurrentRow.kpiName = subKpi.subKpiValue.subMeasureName;
// 									subCurrentRow.kpiMeasure = subKpi.subKpiValue.kpi_measurement;
// 									subCurrentRow.statusLight = subKpi.subKpiValue.statusLightFlag ? '<i class="'+subKpi.subKpiValue.statusLight+'" style="font-size:10px !important;color:'+subKpi.subKpiValue.statusLightFlag+' !important;"></i>' : '<i class="'+subKpi.subKpiValue.statusLight+'" style="font-size:10px !important;"></i>';
// 									subCurrentRow.kpiOptionsicon = kpiOptionsicon;

// 									if(subKpi.subKpiValue.statusLightFlag !=	undefined && subKpi.subKpiValue.statusLightFlag !=	""){
// 										subCurrentRow.statusLight	=	'<i class="'+subKpi.subKpiValue.statusLight+'" style="font-size:10px !important;color:'+subKpi.subKpiValue.statusLightFlag+' !important;"></i>';
// 									}else{
// 										subCurrentRow.statusLight	=	'<i class="'+subKpi.subKpiValue.statusLight+'" style="font-size:10px !important;"></i>';
// 									}

// 									subCurrentRow.kpiOptionsicon	=	kpiOptionsicon;

// 									var kpithresholdResult	=	"";
// 									if(subKpi.subKpiValue.thresholdResult !=	undefined){
// 										kpithresholdResult	=	subKpi.subKpiValue.thresholdResult;
// 									}
// 									if(actualdisplay	==	true){
// 										subCurrentRow.kpiActual		=	'<th  style="white-space: nowrap;">'+kpiActual+'</th>';
// 									}
// 									if(targetdisplay	==	true){
// 										subCurrentRow.kpiTarget		=	'<th  style="white-space: nowrap;">'+kpiTarget+'</th>';
// 									}
// 									if(scoredisplay	==	true){
// 										subCurrentRow.kpithresholdResult	=	'<th  style="white-space: nowrap;">'+kpithresholdResult+'</th>';
// 									}
// 									if(trenddisplay	==	true){
// 										subCurrentRow.trendValue	=	"<th><i class=\""+subKpi.subKpiValue.trend+"\"></i></th>";
// 									}
// 									if(riskdisplay	==	true){
// 										subCurrentRow.riskStatusLight	=	'<th><a href="/stratroom/risks?kpiId='+subKpi.id+'&kpiRiskView=true"><i class="'+subKpi.subKpiValue.riskStatusLight+'" style="font-size:10px !important"></i></a></th>';
// 									}

// 									if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.statusrequired != undefined && controlpanelScorecardSettings.statusrequired == true){
// 										if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.kpistatus != undefined && controlpanelScorecardSettings.kpistatus == false){
// 											subCurrentRow.statusLight	=	"";
// 										}
// 									}else if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.statusrequired != undefined && controlpanelScorecardSettings.statusrequired == false){
// 										subCurrentRow.statusLight	=	"";
// 									}else{
// 										if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.kpistatus != undefined && controlpanelScorecardSettings.kpistatus == false){
// 											subCurrentRow.statusLight	=	"";
// 										}
// 									}
// 									if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == true){
// 										if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.kpiscore != undefined && controlpanelScorecardSettings.kpiscore == false){
// 											subCurrentRow.kpithresholdResult	=	"<th></th>";
// 										}
// 									}else if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == false){
// 										subCurrentRow.kpithresholdResult	=	"<th></th>";
// 									}else{
// 										if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.kpiscore != undefined && controlpanelScorecardSettings.kpiscore == false){
// 											if(scoredisplay	==	true){
// 												subCurrentRow.kpithresholdResult	=	"<th></th>";
// 											}
// 										}
// 									}

// 									if(KpiViewviewpermission	==	true){
// 										var useraccessid	=	localStorage.getItem("useraccessid");

// 										//if(KpiViewcreatepermission	==	true && KpiViewviewpermission	==	true && KpiVieweditpermission == true && KpiViewdeletepermission	==	true){
// 										if(useraccessid)
// 										{
// 											subCurrentRow.KpiViewLink	=	'class="kpiclearrecord" href="/stratroom/kpiView?kpiId='+subKpi.id+'&scoreCardId='+scorecard.id+'&objectiveId='+objective.id+'&pageId='+pageno+'&empId='+useraccessid+'"';

// 										}else
// 										{
// 											var flagType="subKpi"
// 											subCurrentRow.KpiViewLink	=	'class="kpiclearrecord" href="/stratroom/kpiView?kpiId='+subKpi.id+'&flagtype='+flagType+'&scoreCardId='+scorecard.id+'&objectiveId='+objective.id+'&pageId='+pageno+'"';

// 										}
// 									}else{
// 										subCurrentRow.KpiViewLink	=	'';
// 									}
// 								   var subkpiRow = Mustache.render(subkpiRowTemplate, subCurrentRow);
// 								   bodyRows += subkpiRow;

// 								})
// 							}
// 						})
// 					}
// 				})
// 			}

// 			var scorecardStatuslight	=	"nestedWhite";
// 			var scorecardStatusvalueofweight	=	scorecard.scoreCardValue.thresholdResult;

// 				if(scorecard.scoreCardValue.statusLight !=	undefined && scorecard.scoreCardValue.statusLight !=	""){
// 					scorecardStatuslight 	=	scorecard.scoreCardValue.statusLight.toLowerCase();
// 					if(scorecardStatuslight 	==	"yellow"){
// 						scorecardStatuslight 	=	"nestedWhite";
// 						scorecardStatuslight 	=	"nestedYellow";
// 					}else if(scorecardStatuslight 	==	"green"){
// 						scorecardStatuslight 	=	"nestedGreen";
// 					}else if(scorecardStatuslight 	==	"red"){
// 						scorecardStatuslight 	=	"nestedRed";
// 					}else{
// 						scorecardStatuslight 	=	"nestedWhite";
// 					}
// 				}

// 				if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.statusrequired != undefined && controlpanelScorecardSettings.statusrequired == true){
// 					if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.perspectivestatus != undefined && controlpanelScorecardSettings.perspectivestatus == false){
// 						scorecardStatuslight	=	"";
// 					}
// 				}
// 			//}

// 			var overAllStatus 		= 	data.statusLight;
// 			var thresholdResult 	= 	"";
// 			if(data.thresholdResult !=	undefined){
// 				thresholdResult	=	data.thresholdResult;
// 			}
// 			var scorecardhtmlcontent	=	scorecardname;
// 			var scorecardstatusiconElement	=	$(".scorecardname");
// 			if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.customPerformance != undefined && controlpanelScorecardSettings.customPerformance == true){
// 				var scorecardstatusiconElement	=	$(".scorecardname");
// 				if(overAllStatus 	==	"RED"){
// 					scorecardhtmlcontent	=	scorecardname+`<span class="scorecard_status scorecardname" style="background-color:#e84343">`+thresholdResult+`</span>`;
// 				}else if(overAllStatus 	==	"YELLOW"){
// 					scorecardhtmlcontent	=	scorecardname+`<span class="scorecard_status scorecardname" style="background-color:#ffd500">`+thresholdResult+`</span>`;
// 				}else{
// 					scorecardhtmlcontent	=	scorecardname+`<span class="scorecard_status scorecardname" style="background-color:#1aa243">`+thresholdResult+`</span>`;
// 				}
// 				if($(".superusertopmenu").hasClass(scoresuperpageNo)){
// 					$(".subusermenuname").text(scorecardname);
// 				}
// 				$(".pageTitleStatus").html(scorecardhtmlcontent);
// 			}else{
// 				var scorecardstatusiconElement	=	$("#scorecardstatusicon");
// 				if(overAllStatus 	==	"RED"){
// 					scorecardhtmlcontent	=	scorecardname+`<span id="scorecardstatusicon" class="fa fa-arrow-circle-down" style="font-size:20px;color:#e84343"></span>`;
// 				}else if(overAllStatus 	==	"YELLOW"){
// 					scorecardhtmlcontent	=	scorecardname+`<span id="scorecardstatusicon" class="fa fa-arrow-circle-down" style="font-size:20px;color:#ffd500"></span>`;
// 				}else{
// 					scorecardhtmlcontent	=	scorecardname+`<span id="scorecardstatusicon" class="fa fa-arrow-circle-down" style="font-size:20px;color:#1aa243"></span>`;
// 				}
// 				if($(".superusertopmenu").hasClass(scoresuperpageNo)){
// 					$(".subusermenuname").text(scorecardname);
// 				}
// 				$(".pageTitleStatus").html(scorecardhtmlcontent);
// 			}

// 			var checkflagname	=	false;
// 			if(controlpanelScorecardSettings !=	undefined && (controlpanelScorecardSettings.customPerformance == undefined ||  controlpanelScorecardSettings.customPerformance == false)){
// 				if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.statusrequired != undefined && controlpanelScorecardSettings.statusrequired == true){
// 					checkflagname	=	true;
// 					if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardstatus != undefined && controlpanelScorecardSettings.scorecardstatus == false){
// 						$(".scorecardname").css("background-color","unset");
// 						$("#scorecardstatusicon").removeClass("fa-arrow-circle-down");
// 					}
// 				}else{
// 					if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardstatus != undefined && controlpanelScorecardSettings.scorecardstatus == false){
// 						$(".scorecardname").css("background-color","unset");
// 						$("#scorecardstatusicon").removeClass("fa-arrow-circle-down");
// 					}
// 				}
// 			}

// 			if((checkflagname == true && (controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardstatus != undefined && controlpanelScorecardSettings.scorecardstatus == false) || (controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.performance != undefined && controlpanelScorecardSettings.performance == false)) && (controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.customPerformance != undefined && controlpanelScorecardSettings.customPerformance == false)){
// 				$(".scorecardname").css("background-color","unset");
// 				$("#scorecardstatusicon").removeClass("fa-arrow-circle-down");
// 			}

// 			if(checkflagname == true &&  controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && (controlpanelScorecardSettings.scorecardstatus == undefined && controlpanelScorecardSettings.performance == undefined && controlpanelScorecardSettings.customPerformance == undefined)){
// 				$(".scorecardname").css("background-color","unset");
// 				$("#scorecardstatusicon").removeClass("fa-arrow-circle-down");
// 			}

// 			if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == true){
// 				if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardscoreper != undefined && controlpanelScorecardSettings.scorecardscoreper == false){
// 					$(".scorecardname").text("");
// 				}
// 			}else if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == false){
// 				$(".scorecardname").text("");
// 			}else{
// 				if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardscoreper != undefined && controlpanelScorecardSettings.scorecardscoreper == false){
// 					$(".scorecardname").text("");
// 				}
// 			}

// 			var showhidetitle	=	"";
// 			var showhidevalue	=	"";
// 			var showlabelvalue	=	"";
// 			var displayblock	=	"block";
// 			if(scorecard.scoreCardValue.name !=	"" && typeof scorecard.scoreCardValue.name	==	"string"){
// 				showhidetitle	=	scorecard.scoreCardValue.name.toLowerCase();
// 				showlabelvalue	=	capitalizeFLetter(scorecard.scoreCardValue.name);
// 				showhidevalue	=	scorecard.scoreCardValue.name.replaceallstring();
// 				if(scorepreference['preferences']	!=	null){
// 					var subiniviewPreference	=	(scorepreference['preferences'][showhidevalue] !=	undefined?scorepreference['preferences'][showhidevalue]:"true");
// 				}else{
// 					var subiniviewPreference	=	"true";
// 				}
// 				scoreempPreference["preferences"][showhidevalue]	=	subiniviewPreference;
// 				displayblock			=	(subiniviewPreference == "true"?"block":"none");
// 				subiniviewPreference	=	(subiniviewPreference	==	"true"?"checked":"");

// 			}

// 			designlabel		=	'<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="'+showhidetitle+'" value="'+showhidevalue+'" class="form-check-input" '+subiniviewPreference+'/>  '+showlabelvalue+'<span class="form-check-sign"><span class="check"></span></label></div></a></li>';

// 			// perspective row permission
// 			var perspectiveOptionsicon	=	"";
// 			if(objectivecreatepermission	==	false && perspectiveeditpermission	==	false && perspectiveviewpermission	==	false){
// 				perspectiveOptionsicon	=	"";
// 			}else{

// 				perspectiveOptionsicon	=	`            <ul class="header-dropdown m-r--5">
// 	                <li class="dropdown m-t--10">
// 	                    <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
// 	                        <i class="material-icons">more_vert</i>
// 	                    </a>
// 	                    <ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">`;

// 				if(objectivecreatepermission	==	true){
// 					perspectiveOptionsicon	+=	`<li>
// 	                <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="handleObjectiveEvent('0', 'add', `+scorecard.id+`)" data-i18n="Add">Add</a>
// 	            </li>`;
// 				}

// 				if(perspectiveeditpermission	==	true){
// 					perspectiveOptionsicon	+=	`<li><a href="#" data-toggle="modal" data-target=".perspectives_description_popup" class="perspectivedescription" onclick="handlePerspectiveEvent(`+scorecard.id+`, 'edit')" data-i18n="Edit">Edit</a></li>`;
// 				}

// 				if(perspectiveviewpermission	==	true){
// 					perspectiveOptionsicon	+=	`<li>
// 	                <a href="#" data-toggle="modal" data-target=".perspectives_description_popup" class="perspectivedescription" onclick="handlePerspectiveEvent(`+scorecard.id+`, 'view')" data-i18n="View">View</a>
// 	            </li>`;
// 				}

// 				perspectiveOptionsicon	+=	`</ul></li></ul>`;
// 			}

// 			if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == true){
// 				if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.perspectivescore != undefined && controlpanelScorecardSettings.perspectivescore == false){
// 					scorecardStatusvalueofweight	=	"";
// 				}
// 			}else if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == false){
// 				scorecardStatusvalueofweight	=	"";
// 			}else{
// 				if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.perspectivescore != undefined && controlpanelScorecardSettings.perspectivescore == false){
// 					scorecardStatusvalueofweight	=	"";
// 				}
// 			}

// 			var flagstatusscore	=	false;
// 			var scorestatusbgColor	=	"";
// 			if((scorecardStatuslight	==	"nestedWhite" || scorecardStatuslight	==	"nestedYellow" || scorecardStatuslight	==	"nestedGreen" || scorecardStatuslight	==	"nestedRed") && scorecard.scoreCardValue.statusLightFlag !=	undefined && scorecard.scoreCardValue.statusLightFlag !=	""){
// 				flagstatusscore	=	true;
// 				scorestatusbgColor	=	scorecard.scoreCardValue.statusLightFlag;
// 			}

// 			if(!flagstatusscore){
// 				if(scorecardStatusvalueofweight !=	undefined && (scorecardStatusvalueofweight ==	0 || scorecardStatusvalueofweight !=	"") && scorecardStatuslight	==	""){
// 					scorecardStatuslight	=	'class="header nestedEmpty"';
// 				}else
// 				{
// 					scorecardStatuslight 	=	'class="header '+scorecardStatuslight+'"';
// 				}
// 			}

// 			if(flagstatusscore){
// 				scorecardStatuslight 	=	'class="header" style="border-left: 52px solid '+scorestatusbgColor+';"';
// 			}

// 			if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && ((controlpanelScorecardSettings.performance == undefined && controlpanelScorecardSettings.customPerformance == undefined) || (controlpanelScorecardSettings.performance == false && controlpanelScorecardSettings.customPerformance == false))){
// 				scorecardStatuslight 	=	'class="header" style="border-left: 52px solid #dcdcdc"';
// 			}

// 			var finalHtml = Mustache.render(perspectiveTemplate, {
// 				title : scorecard.scoreCardValue.name,
// 				showhidetitle:showhidevalue,
// 				perspectiveOptionsicon:perspectiveOptionsicon,
// 				displayblock:displayblock,
// 				id : scorecard.id,
// 				scorecardStatuslight:scorecardStatuslight,
// 				scorecardStatusvalueofweight:scorecardStatusvalueofweight,
// 				Scrid : scorecard.id,
// 				defaultscr : scorecard.scoreCardValue.defaultscr,
// 				headerRow : headerRow,
// 				bodyRows : bodyRows
// 			});

// 			$("#viewiconTxt").append(designlabel);
// 			$('#scordcard-wrapper').append(finalHtml);
// 			let currentLanguage = localStorage.getItem("selectedLang") || "en";

// 			loadTranslations(currentLanguage); // Apply translations when DOM changes
// 		});
// 	}

// 	var pageId = $('#pagenumber').val();

// 	$('.standard_multi-column-dropdown input[type="checkbox"]').click(function () {
//   		var inputValue = $(this).attr('value');
// 		var checkedProp 	= 	$(this).is(':checked');
// 					inputValue			=	inputValue.replaceallstring();
// 					scoreempPreference["pageName"]					=	"SCORECARD";
// 					scoreempPreference["pageId"]					= 	pageId;
// 					scoreempPreference["preferences"][inputValue]	=	checkedProp;
// 					$.ajax({
// 						url : "/stratroom/employeePreference",
// 						type : "POST",
// 						contentType : "application/json",
// 						data : JSON.stringify(scoreempPreference),
// 						success : function(data, status) {

// 						},
// 						error:readErrorMsg
// 					});
//   		$("." + inputValue).toggle();
// 	});
// 	$(".standard_dropdown-hide").on("click", function (e) {
//     	e.stopPropagation();
//   	});

//    const htmlData= `
// 		<h1>Hiii</h1>
// 		<h2>Bye...</h2>
// 	`

// $('#tab-content').html(htmlData);
// }

function scordcardSuccessCallback(data) {
  console.log(controlpanelScorecardSettings, "controllPanelSettings");
  console.log(data, "scorecardData");
  // Create tabs navigation
  let tabsHtml = `<div class="dropdown dropdown-tab dropdown-tab-ellipsis" id="tab-navigationWrap">
        <button class="btn btn-primary dropdown-toggle d-lg-none" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">${data.cardDetailsDTO.scoreCardDTOS[0].perspectiveType}</button>
        <ul class="dropdown-menu nav nav-pills" id="tab-navigation" role="tablist" aria-orientation="horizontal">`;

  // Create tab content
  let tabContentHtml = "";

  data.cardDetailsDTO.scoreCardDTOS.forEach((perspective, index) => {
    const isActive = index == 0 ? "active" : "";
    const showActive = index == 0 ? "show active" : "";
    const perspectiveId = perspective.perspectiveType
      .replace(/\s+/g, "-")
      .toLowerCase();

    // Add tab navigation item
    tabsHtml += `<button class="nav-link ${isActive}" id="v-pills-${perspectiveId}-tab" data-bs-toggle="pill" data-bs-target="#v-pills-${perspectiveId}" type="button" role="tab" aria-controls="v-pills-${perspectiveId}" aria-selected="${
      index == 0 ? "true" : "false"
    }">
            <span class="nav-text" contenteditable="true" oninput="if (this.innerText.length > 36) this.innerText = this.innerText.substring(0, 36);"  >
                ${perspective.perspectiveType}
            </span>
        </button>`;

    // Create perspective table
    let tableHtml = `<div id="v-pills-${perspectiveId}" class="tab-pane fade ${showActive}" role="tabpanel" aria-labelledby="v-pills-${perspectiveId}-tab">
            <div class="card custom-card table-card">
                <div class="card-header">
                    <div class="c-header-left">
                        <span class="badge text-bg-success">${
                          perspective.scoreCardValue.thresholdResult || "0"
                        }%</span>
                        <h5 class="card-title me-auto">
                            <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">${
                              perspective.perspectiveType
                            }</strong>
                        </h5>
                    </div>
                    <div class="card-actions">
                        <div class="dropdown">
                            <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                <span class="icon">
                                    <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                                </span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                <li><a class="dropdown-item" href="#objective-add-modal" data-toggle="modal" onclick="return false;">Add</a></li>
                                <li><a class="dropdown-item" href="#objective-edit-modal" data-toggle="modal" onclick="return false;">Edit</a></li>
                                <li><a class="dropdown-item" href="#objective-view-modal" data-toggle="modal" onclick="return false;">View</a></li>
                                <li><a class="dropdown-item" href="#" onclick="return false;">Delete</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="dataTables_wrapper dt-bootstrap5 no-footer">
                        <div class="row dt-row">
                            <div class="col-sm-12">
                                <div class="dataTables_scroll"> 
                                    <div class="dataTables_scrollBody">
                                        <table class="table table-bordered w-100 dataTable no-footer" id="table-${perspectiveId}">
                                            <thead>
                                                <tr>
                                                    <th>Statusss</th>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Period</th>
                                                    <th>Score</th>
                                                    <th>Trend</th>
                                                    <th>Baseline</th>
                                                    <th>Actual</th>
                                                    <th>Target</th>
                                                    <th>Risk</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>`;

    // Add objectives and KPIs
    perspective.objectiveList.forEach((objective, objIndex) => {
      console.log(objective.objectivesValue.statusLight, "objective.objectivesValue.statusLight");
      // Objective row
      tableHtml += `<tr class="child-of-${perspectiveId} level-0 ${
        objIndex % 2 == 0 ? "odd" : "even"
      }" data-id="${perspectiveId}-child-${objIndex + 1}">
                <td width="30"><div class="d-flex justify-content-end gap-2"> <i class="${
                  objective.objectivesValue.statusLight
                }"></i></div></td>
                <td width="80">${objective.objectiveId}</td>
                <td><div style="min-width:260px">${
                  objective.objectivesName
                }</div></td>
                <td width="50" class="text-center">${
                  objective.objectivesValue.objective_start_end_date.split(
                    " - "
                  )[1] || ""
                }</td>
                <td width="50" class="text-center">${
                  objective.objectivesValue.weight || "0"
                }%</td>
                <td width="50" class="text-center"></td>
                <td width="50" class="text-center"></td>
                <td width="50" class="text-center"></td>
                <td width="50" class="text-center"></td>
                <td width="50" class="text-center"><i class="${
                  objective.objectivesValue.statusLight
                }"></i></td>
                <td width="70"><div class="table-actions justify-content-end">
                    <!--<a href="#kpi-story-card-modal" data-bs-toggle="modal" type="button" class="btn btn-sm btn-icon">
                        <span class="icon"><img src="/stratroom/images/link-i.svg" width="12" height="12"></span>
                    </a> --!>
                    <a href="#subkpi-view-modal" data-bs-toggle="modal" type="button" class="btn btn-sm btn-icon">
                        <span class="icon"><img src="/stratroom/images/info-i.svg" width="12" height="12"></span>
                    </a>
                   
                    <div class="dropdown">
                        <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                            <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                        </button>
                        <ul class="dropdown-menu border-0 shadow">
                            <li><a class="dropdown-item" href="#kpi-add-modal" data-toggle="modal" >Add</a></li>
                            <li><a class="dropdown-item" href="#kpi-edit-modal" data-toggle="modal" >Edit</a></li>
                            <li><a class="dropdown-item" href="#kpi-view-modal" data-toggle="modal" >View</a></li>
                            <li><a class="dropdown-item" href="#delete-modal" data-toggle="modal" >Delete</a></li>
                        </ul>
                    </div>
                </div></td>
            </tr>`;

      // KPIs for this objective
      objective.kpiList.forEach((kpi, kpiIndex) => {
        const hasSubKpis = kpi.subKpiList && kpi.subKpiList.length > 0;
        const toggleIcon = hasSubKpis
          ? '<i class="fas fa-plus toggle-icon" data-target="' +
            perspectiveId +
            "-child-" +
            (objIndex + 1) +
            "-child-" +
            (kpiIndex + 1) +
            '-child"></i>'
          : "";

        tableHtml += `<tr class="child-of-${perspectiveId}-child-${
          objIndex + 1
        } level-1 ${
          kpiIndex % 2 == 0 ? "odd" : "even"
        }" data-id="${perspectiveId}-child-${objIndex + 1}-child-${
          kpiIndex + 1
        }">
                    <td width="30"><div class="d-flex justify-content-end gap-2">${toggleIcon} <i class="${
          kpi.kpiValue.statusLight
        }"></i></div></td>
                    <td width="80">${kpi.kpiId}</td>
                    <td><div style="min-width:260px"><a class="text-decoration-none" href="kpi.html">${
                      kpi.kpiName
                    }</a></div></td>
                    <td width="50" class="text-center">${
                      kpi.kpiValue.kpi_measurement || ""
                    }</td>
                    <td width="50" class="text-center">${
                      kpi.kpiValue.thresholdResult || "0"
                    }%</td>
                    <td width="50" class="text-center"><i class="${
                      kpi.kpiValue.trend || "fas fa-arrow-up"
                    }"></i></td>
                    <td width="50" class="text-center"></td>
                    <td width="50" class="text-center">${
                      kpi.kpiValue.actual || ""
                    }</td>
                    <td width="50" class="text-center">${
                      kpi.kpiValue.target || ""
                    }</td>
                    <td width="50" class="text-center"><i class="${
                      kpi.kpiValue.statusLight
                    }"></i></td>
                    <td width="70"><div class="table-actions justify-content-end">`;

        // if (hasSubKpis) {
        //   tableHtml += `<a href="#kpi-story-card-modal" data-bs-toggle="modal" type="button" class="btn btn-sm btn-icon">
        //                     <span class="icon"><img src="/stratroom/images/link-i.svg" width="12" height="12"></span>
        //                 </a>`;
        // }

        tableHtml += `<a href="#subkpi-view-modal" data-bs-toggle="modal" type="button" class="btn btn-sm btn-icon">
                        <span class="icon"><img src="/stratroom/images/info-i.svg" width="12" height="12"></span>
                    </a>
                    <div class="dropdown">
                     <!-- <a href="#kpi-story-card-modal" data-bs-toggle="modal" type="button" class="btn btn-sm btn-icon">
                        <span class="icon"><img src="/stratroom/images/link-i.svg" width="12" height="12"></span>
                    </a> --!>
                    <a href="#subkpi-view-modal" data-bs-toggle="modal" type="button" class="btn btn-sm btn-icon">
                        <span class="icon"><img src="/stratroom/images/info-i.svg" width="12" height="12"></span>
                    </a>
                        <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                            <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                        </button>
                        <ul class="dropdown-menu border-0 shadow">
                            <li><a class="dropdown-item" href="#subkpi-add-modal" data-bs-toggle="modal" >Add</a></li>
                            <li><a class="dropdown-item" href="#subkpi-edit-modal" data-bs-toggle="modal" >Edit</a></li>
                            <li><a class="dropdown-item" href="#subkpi-view-modal" data-bs-toggle="modal" >View</a></li>
                            <li><a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal" >Delete</a></li>
                        </ul>
                    </div>
                </div></td>
            </tr>`;

        // Sub-KPIs if they exist
        if (hasSubKpis) {
          kpi.subKpiList.forEach((subKpi, subKpiIndex) => {
            tableHtml += `<tr class="child-of-${perspectiveId}-child-${
              objIndex + 1
            }-child-${kpiIndex + 1} level-2 ${
              subKpiIndex % 2 == 0 ? "odd" : "even"
            }" data-id="${perspectiveId}-child-${objIndex + 1}-child-${
              kpiIndex + 1
            }-child-${subKpiIndex + 1}" style="display: none;">
                            <td width="30"><div class="d-flex justify-content-end gap-2"> <i class="${
                              subKpi.subKpiValue.statusLight ||
                              "red fas fa-flag"
                            }"></i></div></td>
                            <td width="80">${subKpi.subKpiId}</td>
                            <td><div style="min-width:260px"><a class="text-decoration-none" href="kpi.html">${
                              subKpi.subKpiName
                            }</a></div></td>
                            <td width="50" class="text-center">${
                              subKpi.subKpiValue.kpi_measurement || ""
                            }</td>
                            <td width="50" class="text-center">${
                              subKpi.subKpiValue.weight || "0"
                            }%</td>
                            <td width="50" class="text-center"></td>
                            <td width="50" class="text-center"></td>
                            <td width="50" class="text-center">${
                              subKpi.subKpiValue.actual || ""
                            }</td>
                            <td width="50" class="text-center">${
                              subKpi.subKpiValue.target || ""
                            }</td>
                            <td width="50" class="text-center"><i class="${
                              subKpi.subKpiValue.statusLight ||
                              "red fas fa-flag"
                            }"></i></td>
                            <td width="70"><div class="table-actions justify-content-end">
                                <!-- <a href="#kpi-story-card-modal" data-bs-toggle="modal" type="button" class="btn btn-sm btn-icon">
                                    <span class="icon"><img src="/stratroom/images/link-i.svg" width="12" height="12"></span>
                                </a> --!>
                                <a href="#subsubkpi-view-modal" data-bs-toggle="modal" type="button" class="btn btn-sm btn-icon">
                                    <span class="icon"><img src="/stratroom/images/info-i.svg" width="12" height="12"></span>
                                </a>
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                                        <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                                    </button>
                                    <ul class="dropdown-menu border-0 shadow">
                                        <li><a class="dropdown-item" href="#subsubkpi-edit-modal" data-bs-toggle="modal">Edit</a></li>
                                        <li><a class="dropdown-item" href="#subsubkpi-view-modal" data-bs-toggle="modal">View</a></li>
                                        <li><a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal">Delete</a></li>
                                    </ul>
                                </div>
                            </div></td>
                        </tr>`;
          });
        }
      });
    });

    tableHtml += `</tbody></table></div></div></div></div></div></div></div></div>`;
    tabContentHtml += tableHtml;
  });

  tabsHtml += `</ul></div>`;

  // Combine all HTML
  const htmlData = `<div class="card custom-card-tab">
        <div class="card-header p-0">
            <div class="c-header-left">${tabsHtml}</div>
        </div>
        <div class="card-body tab-content" id="tab-content">${tabContentHtml}</div>
    </div>`;

  $("#tab-content").html(htmlData);

  // Add toggle functionality for sub-KPIs
  $(document).on("click", ".toggle-icon", function () {
    const target = $(this).data("target");
    const $targetRows = $(`[data-id^="${target}"]`);
    const isPlus = $(this).hasClass("fa-plus");

    $(this).toggleClass("fa-plus fa-minus");
    $targetRows.toggle();
  });

  console.log(data, "datadata");
}

// function scordcardSuccessCallbackk(data) {
//     console.log(data, "ACTUALFUNCTION");

//     // Set score value
//     let score_value =
//         data.thresholdResult != "" && data.thresholdResult != null
//             ? data.thresholdResult
//             : "0.0";
//     $("#score").html(score_value);

//     // Handle scorecard name display
//     if (data.message != undefined && data.scoreCardName != undefined) {
//         $(".card-title strong").text(data.scoreCardName);
//     }

//     if (!data.flag && data.message != undefined && data.message != "") {
//         $(".table-card").html(
//             "<div class='card-body'><center><h3>" +
//                 data.message +
//                 "</h3></center></div>"
//         );
//         return;
//     }

//     scorecardlist = data.cardDetailsDTO;

//     // Clear existing content
//     $("#scordcard-wrapper").empty();

//     // Initialize counters
//     var nestedredcount = 0;
//     var nestedyellowcount = 0;
//     var nestedblackcount = 0;
//     var nestedgreencount = 0;
//     var scorecardname = "ScoreCard";

//     // Initialize settings flags
//     var scorecardactual = false;
//     var scorecardtarget = false;
//     var scorecardbudget = false;
//     var scorecardforecast = false;
//     var scorecardscore = false;
//     var scorecardtrend = false;
//     var scorecardrisk = false;
//     var scorecardbaseline = false;

//     if (
//         controlpanelScorecardSettings != "" &&
//         controlpanelScorecardSettings != undefined
//     ) {
//         console.log(controlpanelScorecardSettings, "controlpanelScorecardSettings");
//         scorecardactual = controlpanelScorecardSettings.scorecardactual || false;
//         scorecardtarget = controlpanelScorecardSettings.scorecardtarget || false;
//         scorecardbudget = controlpanelScorecardSettings.scorecardbudget || false;
//         scorecardforecast = controlpanelScorecardSettings.scorecardforecast || false;
//         scorecardscore = controlpanelScorecardSettings.scorecardscore || false;
//         scorecardtrend = controlpanelScorecardSettings.scorecardtrend || false;
//         scorecardrisk = controlpanelScorecardSettings.scorecardrisk || false;
//         scorecardbaseline = controlpanelScorecardSettings.scorecardbaseline || false;
//     }

//     console.log(scorecardactual, scorecardtarget, scorecardbudget, "scorecard settings");

//     // Create tab container HTML
//     let tabHTML = "";
//     tabHTML += '<div class="nav nav-pills flex-row mb-3 border-bottom" id="v-pills-tab" role="tablist"></div>';
//     tabHTML += '<div class="tab-content" id="v-pills-tabContent" style="padding: 0rem 0.5rem 0.5rem 0.5rem;"></div>';
//     $("#scordcard-wrapper").html(tabHTML);

//     let $tabList = $("#v-pills-tab");
//     let $tabContent = $("#v-pills-tabContent");

//     // Determine scorecard name
//     if (
//         data.cardDetailsDTO != undefined &&
//         data.cardDetailsDTO.scorecardName != undefined &&
//         data.cardDetailsDTO.scorecardName != null
//     ) {
//         scorecardname = data.cardDetailsDTO.scorecardName;
//         $(".card-title strong").text(scorecardname);

//         var upiconflag = false;
//         if (jQuery.isEmptyObject(data.cardDetailsDTO.scoreCardDTOS)) {
//             if (
//                 controlpanelScorecardSettings != "" &&
//                 controlpanelScorecardSettings != undefined &&
//                 controlpanelScorecardSettings.customPerformance != undefined &&
//                 controlpanelScorecardSettings.customPerformance == true
//             ) {
//                 if ($(".superusertopmenu").hasClass(scoresuperpageNo)) {
//                     $(".subusermenuname").text(scorecardname);
//                 }
//             } else {
//                 upiconflag = true;
//             }
//         } else {
//             if (
//                 data.cardDetailsDTO.scoreCardDTOS.length > 0 &&
//                 data.cardDetailsDTO.scoreCardDTOS[0].scorecardName != undefined &&
//                 data.cardDetailsDTO.scoreCardDTOS[0].scorecardName != null
//             ) {
//                 scorecardname = data.cardDetailsDTO.scoreCardDTOS[0].scorecardName;
//             }
//         }
//     } else if (data.scoreCardName != undefined && data.scoreCardName != null) {
//         scorecardname = data.scoreCardName;
//     }

//     // Process each scorecard and create tabs
//     if (data.cardDetailsDTO != undefined && data.cardDetailsDTO.scoreCardDTOS) {
//         $.each(data.cardDetailsDTO.scoreCardDTOS, function (index, scorecard) {
//             // Create tab navigation item
//             let tablePrefix = scorecard.scoreCardValue.name
//                 .toLowerCase()
//                 .replace(/\s+/g, "-");
//             let tabId = "v-pills-" + tablePrefix;
//             let activeClass = index == 0 ? "active" : "";

//             $tabList.append(
//                 '<button class="nav-link ' + activeClass + ' border-end px-3 py-2" id="' + tabId + '-tab" data-bs-toggle="pill" ' +
//                 'href="#' + tabId + '" role="tab" aria-controls="' + tabId + '" ' +
//                 'aria-selected="' + (index == 0 ? "true" : "false") + '">' +
//                 '<span class="nav-text" contenteditable="true" ' +
//                 'oninput="if (this.innerText.length > 36) this.innerText = this.innerText.substring(0, 36);" style="font-weight: 500;">' +
//                 scorecard.scoreCardValue.name +
//                 '</span>' +
//                 '</button>'
//             );

//             // Create tab content
//             let tabPaneClass = 'tab-pane fade ' + (index == 0 ? 'show active' : '');
//             $tabContent.append(
//                 '<div class="' + tabPaneClass + '" id="' + tabId + '" role="tabpanel" aria-labelledby="' + tabId + '-tab"></div>'
//             );
//             let $currentTab = $("#" + tabId);

//             // Generate perspective options icon
//             var perspectiveOptionsicon = "";
//             if (
//                 !(
//                     objectivecreatepermission == false &&
//                     perspectiveeditpermission == false &&
//                     perspectiveviewpermission == false
//                 )
//             ) {
//                 perspectiveOptionsicon = '';
//                 perspectiveOptionsicon += '<div class="dropdown">';
//                 perspectiveOptionsicon += '<button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">';
//                 perspectiveOptionsicon += '<span class="icon"><img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg"></span>';
//                 perspectiveOptionsicon += '</button>';
//                 perspectiveOptionsicon += '<ul class="dropdown-menu dropdown-menu-end border-0 shadow" style="position: relative; overflow: auto; width: 100%;">';

//                 if (objectivecreatepermission == true) {
//                     perspectiveOptionsicon += '<li><a class="dropdown-item" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="handleObjectiveEvent(\'0\', \'add\', ' + scorecard.id + ')" data-i18n="Add">Add</a></li>';
//                 }
//                 if (perspectiveeditpermission == true) {
//                     perspectiveOptionsicon += '<li><a class="dropdown-item" data-toggle="modal" data-target=".perspectives_description_popup" class="perspectivedescription" onclick="handlePerspectiveEvent(' + scorecard.id + ', \'edit\')" data-i18n="Edit">Edit</a></li>';
//                 }
//                 if (perspectiveviewpermission == true) {
//                     perspectiveOptionsicon += '<li><a class="dropdown-item" data-toggle="modal" data-target=".perspectives_description_popup" class="perspectivedescription" onclick="handlePerspectiveEvent(' + scorecard.id + ', \'view\')" data-i18n="View">View</a></li>';
//                 }

//                 perspectiveOptionsicon += '</ul></div>';
//             }

//             // Determine scorecard status light
//             var scorecardStatuslight = "text-bg-secondary";
//             var scorecardStatusvalueofweight = scorecard.scoreCardValue.thresholdResult;

//             if (
//                 scorecard.scoreCardValue.statusLight != undefined &&
//                 scorecard.scoreCardValue.statusLight != ""
//             ) {
//                 var statusLightValue = scorecard.scoreCardValue.statusLight.toLowerCase().split(" ")[0];
//                 if (statusLightValue == "yellow") scorecardStatuslight = "text-bg-warning";
//                 else if (statusLightValue == "green") scorecardStatuslight = "text-bg-success";
//                 else if (statusLightValue == "red") scorecardStatuslight = "text-bg-danger";
//             }

//             // Build dynamic table header
//             let tableHeader = "<thead><tr>";

//             // Always visible columns
//             tableHeader += '<th class="sorting_disabled" style="width: 61.7344px;">Status</th>';
//             tableHeader += '<th class="sorting_disabled" style="width: 80.9688px;">ID</th>';
//             tableHeader += '<th class="sorting_disabled" style="width: 528.359px;">Name</th>';
//             tableHeader += '<th class="sorting_disabled text-center" style="width: 58.9062px;">Period</th>';

//             // Conditional columns
//             if (scorecardscore) {
//                 tableHeader += '<th class="sorting_disabled text-center" style="width: 53.6406px;">Score</th>';
//             }
//             if (scorecardtrend) {
//                 tableHeader += '<th class="sorting_disabled text-center" style="width: 55.6562px;">Trend</th>';
//             }
//             if (scorecardbaseline) {
//                 tableHeader += '<th class="sorting_disabled text-center" style="width: 72.4688px;">Baseline</th>';
//             }
//             if (scorecardactual) {
//                 tableHeader += '<th class="sorting_disabled text-center" style="width: 63.9688px;">Actual</th>';
//             }
//             if (scorecardtarget) {
//                 tableHeader += '<th class="sorting_disabled text-center" style="width: 61.9375px;">Target</th>';
//             }
//             if (scorecardrisk) {
//                 tableHeader += '<th class="sorting_disabled text-center" style="width: 50.6094px;">Risk</th>';
//             }

//             tableHeader += '<th class="sorting_disabled" style="width: 98.2656px;">Actions</th>';
//             tableHeader += "</tr></thead>";

//             // Build table body
//             let tableBody = "<tbody>";

//             if (scorecard.objectiveList && scorecard.objectiveList.length > 0) {
//                 $.each(scorecard.objectiveList, function (objIndex, objective) {
//                     // Objective options icon
//                     var objectiveOptionsicon = "";
//                     if (
//                         !(
//                             kpicreatepermission == false &&
//                             objectiveeditpermission == false &&
//                             objectiveviewpermission == false &&
//                             objectivedeletepermission == false
//                         )
//                     ) {
//                         objectiveOptionsicon = '<div class="table-actions justify-content-end">';
//                         objectiveOptionsicon += '<a href="#subkpi-view-modal" data-toggle="modal" data-target=".objective_description_popup" onclick="handleObjectiveEvent(' + objective.id + ', \'view\', ' + scorecard.id + ')" type="button" class="btn btn-sm btn-icon">';
//                         objectiveOptionsicon += '<span class="icon"><img src="/stratroom/images/info-i.svg" width="12" height="12"></span></a>';

//                         objectiveOptionsicon += '<div class="dropdown">';
//                         objectiveOptionsicon += '<button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">';
//                         objectiveOptionsicon += '<span class="icon"><img width="12" height="12" src="/stratroom/images/menu-dot-vertical-i.svg"></span></button>';
//                         objectiveOptionsicon += '<ul class="dropdown-menu dropdown-menu-end border-0 shadow" style="position: relative; overflow: auto; width: 100%;">';

//                         if (kpicreatepermission == true) {
//                             objectiveOptionsicon += '<li><a class="dropdown-item" data-toggle="modal" data-target=".kpi_description_popup" onclick="handleKpiEvent(\'0\', \'add\', ' + objective.id + ')">AddKPi</a></li>';
//                         }
//                         if (objectiveeditpermission == true) {
//                             objectiveOptionsicon += '<li><a class="dropdown-item" data-toggle="modal" data-target=".objective_description_popup" onclick="handleObjectiveEvent(' + objective.id + ', \'edit\', ' + scorecard.id + ')">Edit</a></li>';
//                         }
//                         if (objectiveviewpermission == true) {
//                             objectiveOptionsicon += '<li><a class="dropdown-item" data-toggle="modal" data-target=".objective_description_popup" onclick="handleObjectiveEvent(' + objective.id + ', \'view\', ' + scorecard.id + ')">View</a></li>';
//                         }
//                         if (objectivedeletepermission == true) {
//                             objectiveOptionsicon += '<li><a class="dropdown-item" href="#" onclick="handleObjectiveEvent(' + objective.id + ', \'delete\', ' + scorecard.id + ')">Delete</a></li>';
//                         }

//                         objectiveOptionsicon += '</ul></div></div>';
//                     }

//                     // Status Light for Objective
//                     var objstatusLight = '<img src="/stratroom/images/flag-default.svg" width="16" height="16">';
//                     if (objective.objectivesValue && objective.objectivesValue.statusLight) {
//                         var status = objective.objectivesValue.statusLight.split(" ")[0].toLowerCase();
//                         objstatusLight = '<img src="/stratroom/images/' + status + '.svg" width="16" height="16">';
//                     } else if (objective.objectivesValue && objective.objectivesValue.statusLightFlag) {
//                         var flag = objective.objectivesValue.statusLightFlag.toLowerCase();
//                         objstatusLight = '<img src="/stratroom/images/' + flag + '.svg" width="16" height="16">';
//                     }

//                     // Threshold Result
//                     var objthresholdResult = "";
//                     if (objective.objectivesValue.thresholdResult != undefined && scorecardscore) {
//                         objthresholdResult = objective.objectivesValue.thresholdResult;
//                     }

//                     // Build Objective Row
//                     let objRow = "<tr class=\"child-of-financial level-0 odd\">";
//                     objRow += "<td width=\"30\"><div class=\"d-flex justify-content-end gap-2\">" + objstatusLight + "</div></td>";
//                     objRow += "<td width=\"80\">" + (objective.objectiveId || "") + "</td>";
//                     objRow += "<td><div style=\"min-width:260px\">" + objective.objectivesValue.name + "</div></td>";
//                     objRow += "<td width=\"50\" class=\"text-center\"></td>";

//                     if (scorecardscore) objRow += "<td width=\"50\" class=\"text-center\">" + objthresholdResult + "</td>";
//                     if (scorecardtrend) objRow += "<td width=\"50\" class=\"text-center\"></td>";
//                     if (scorecardbaseline) objRow += "<td width=\"50\" class=\"text-center\"></td>";
//                     if (scorecardactual) objRow += "<td width=\"50\" class=\"text-center\"></td>";
//                     if (scorecardtarget) objRow += "<td width=\"50\" class=\"text-center\"></td>";
//                     if (scorecardrisk) objRow += "<td width=\"50\" class=\"text-center\"></td>";

//                     objRow += "<td width=\"90\">" + objectiveOptionsicon + "</td>";
//                     objRow += "</tr>";
//                     tableBody += objRow;

//                     // Process KPIs
//                     if (objective.kpiList && objective.kpiList.length > 0) {
//                         $.each(objective.kpiList, function (kpiIndex, kpi) {
//                             var hasSubKpi = kpi.subKpiList != undefined && kpi.subKpiList.length > 0;

//                             // KPI Data
//                             var kpiActual = (kpi.kpiValue.actual != undefined ? kpi.kpiValue.actual : "0");
//                             var kpiTarget = (kpi.kpiValue.target != undefined ? kpi.kpiValue.target : "");
//                             var pageno = $("#pagenumber").val();

//                             var targetcurrency = kpi.kpiValue.targetCurrency || "";
//                             var actutalcurrency = kpi.kpiValue.actualCurrency || "";
//                             targetcurrency = targetcurrency || (kpi.kpiValue.kpiCurrency || "");
//                             actutalcurrency = actutalcurrency || (kpi.kpiValue.kpiCurrency || "");

//                             kpiActual = actutalcurrency + kpiActual;
//                             if (kpi.kpiValue.dataType == "Percentage" && !kpiTarget.includes("%")) {
//                                 kpiTarget += "%";
//                             }
//                             kpiTarget = targetcurrency + kpiTarget;

//                             // KPI Options
//                             var kpiOptionsicon = "";
//                             if (
//                                 !(
//                                     subkpicreatepermission == false &&
//                                     kpieditpermission == false &&
//                                     kpiviewpermission == false &&
//                                     kpideletepermission == false
//                                 )
//                             ) {
//                                 kpiOptionsicon = '<div class="table-actions justify-content-end">';
//                                 kpiOptionsicon += '<a href="#kpi-story-card-modal" data-bs-toggle="modal" type="button" class="btn btn-sm btn-icon"><span class="icon"><img src="/stratroom/images/link-i.svg" width="12" height="12"></span></a>';
//                                 kpiOptionsicon += '<a href="#subkpi-view-modal" data-toggle="modal" onclick="handleKpiEvent(' + kpi.id + ', \'view\', ' + objective.id + ')" type="button" class="btn btn-sm btn-icon"><span class="icon"><img src="/stratroom/images/info-i.svg" width="12" height="12"></span></a>';
//                                 kpiOptionsicon += '<div class="dropdown"><button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"><span class="icon"><img width="12" height="12" src="/stratroom/images/menu-dot-vertical-i.svg"></span></button><ul class="dropdown-menu dropdown-menu-end border-0 shadow">';

//                                 if (subkpicreatepermission == true) {
//                                     kpiOptionsicon += '<li><a class="dropdown-item" href="#subkpi-add-modal" data-bs-toggle="modal" onclick="handleSubKpiEvent(' + kpi.id + ', \'add\', ' + objective.id + ')">Add</a></li>';
//                                 }
//                                 if (kpieditpermission == true) {
//                                     kpiOptionsicon += '<li><a class="dropdown-item" href="#kpi-edit-modal" data-bs-toggle="modal" onclick="handleKpiEvent(' + kpi.id + ', \'edit\', ' + objective.id + ')">Edit</a></li>';
//                                 }
//                                 if (kpiviewpermission == true) {
//                                     kpiOptionsicon += '<li><a class="dropdown-item" href="#kpi-view-modal" data-bs-toggle="modal" onclick="handleKpiEvent(' + kpi.id + ', \'view\', ' + objective.id + ')">View</a></li>';
//                                 }
//                                 if (kpideletepermission == true) {
//                                     kpiOptionsicon += '<li><a class="dropdown-item" href="#" onclick="handleKpiEvent(' + kpi.id + ', \'delete\', ' + objective.id + ')">Delete</a></li>';
//                                 }

//                                 kpiOptionsicon += '</ul></div></div>';
//                             }

//                             // KPI Status Light
//                             var kpiStatusLight = '<img src="/stratroom/images/flag-green-i.svg" width="16" height="16">';
//                             if (kpi.kpiValue.statusLight) {
//                                 var color = kpi.kpiValue.statusLight.split(" ")[0];
//                                 kpiStatusLight = '<img src="/stratroom/images/flag-' + color + '-i.svg" width="16" height="16">';
//                             }

//                             // Threshold, Trend, Risk
//                             var kpithresholdResult = kpi.kpiValue.thresholdResult || "";
//                             var trendValue = kpi.kpiValue.trend ? '<img src="/stratroom/images/' + kpi.kpiValue.trend.toLowerCase() + '.svg" width="12" height="12">' : "";
//                             var riskStatusLight = kpi.kpiValue.riskStatusLight
//                                 ? '<a href="/stratroom/risks?kpiId=' + kpi.id + '&kpiRiskView=true"><img src="/stratroom/images/' + kpi.kpiValue.riskStatusLight.toLowerCase() + '.svg" width="16" height="16"></a>'
//                                 : "";

//                             // Build KPI Row
//                             let kpiRow = "<tr class=\"level-1\">";
//                             let toggleIcon = hasSubKpi ? '<i class="fas fa-plus toggle-icon" data-target="kpi-' + kpi.id + '"></i>' : "";
//                             kpiRow += "<td width=\"30\"><div class=\"d-flex justify-content-end gap-2\">" + toggleIcon + " " + kpiStatusLight + "</div></td>";
//                             kpiRow += "<td width=\"80\">" + (kpi.kpiId || "") + "</td>";
//                             kpiRow += "<td><a class=\"kpiclearrecord\" href=\"/stratroom/kpiView?kpiId=" + kpi.id + "&flagtype=kpi&scoreCardId=" + scorecard.id + "&objectiveId=" + objective.id + "&pageId=" + pageno + "\"><div style=\"min-width:260px\">" + kpi.kpiValue.name + "</div></a></td>";
//                             kpiRow += "<td width=\"50\" class=\"text-center\">" + (kpi.kpiValue.kpi_measurement || "") + "</td>";

//                             if (scorecardscore) kpiRow += "<td width=\"50\" class=\"text-center\">" + kpithresholdResult + "</td>";
//                             if (scorecardtrend) kpiRow += "<td width=\"50\" class=\"text-center\">" + trendValue + "</td>";
//                             if (scorecardbaseline) kpiRow += "<td width=\"50\" class=\"text-center\"></td>";
//                             if (scorecardactual) kpiRow += "<td width=\"50\" class=\"text-center\">" + kpiActual + "</td>";
//                             if (scorecardtarget) kpiRow += "<td width=\"50\" class=\"text-center\">" + kpiTarget + "</td>";
//                             if (scorecardrisk) kpiRow += "<td width=\"50\" class=\"text-center\">" + riskStatusLight + "</td>";

//                             kpiRow += "<td width=\"70\">" + kpiOptionsicon + "</td>";
//                             kpiRow += "</tr>";
//                             tableBody += kpiRow;

//                             // Sub-KPIs
//                             if (kpi.subKpiList && kpi.subKpiList.length > 0) {
//                                 $.each(kpi.subKpiList, function (subKpiIndex, subKpi) {
//                                     var subKpiActual = subKpi.subKpiValue.actual || "";
//                                     var subKpiTarget = subKpi.subKpiValue.target || "";
//                                     var pageno = $("#pagenumber").val();

//                                     var targetcurrency = subKpi.subKpiValue.targetCurrency || "";
//                                     var actutalcurrency = subKpi.subKpiValue.actualCurrency || "";
//                                     targetcurrency = targetcurrency || (subKpi.subKpiValue.kpiCurrency || "");
//                                     actutalcurrency = actutalcurrency || (subKpi.subKpiValue.kpiCurrency || "");

//                                     subKpiActual = actutalcurrency + subKpiActual;
//                                     if (subKpi.subKpiValue.dataType == "Percentage" && !subKpiTarget.includes("%")) {
//                                         subKpiTarget += "%";
//                                     }
//                                     subKpiTarget = targetcurrency + subKpiTarget;

//                                     // Sub-KPI Options
//                                     var subKpiOptionsicon = "";
//                                     if (!(kpieditpermission == false && kpiviewpermission == false && kpideletepermission == false)) {
//                                         subKpiOptionsicon = '<div class="table-actions justify-content-end">';
//                                         subKpiOptionsicon += '<a href="#kpi-story-card-modal" data-bs-toggle="modal" type="button" class="btn btn-sm btn-icon"><span class="icon"><img src="/stratroom/images/link-i.svg" width="12" height="12"></span></a>';
//                                         subKpiOptionsicon += '<a href="#subkpi-view-modal" data-toggle="modal" data-target=".updateSubkpi_description_popup" onclick="handleEditSubKpiEvent(' + subKpi.id + ', \'view\', ' + objective.id + ')" type="button" class="btn btn-sm btn-icon"><span class="icon"><img src="/stratroom/images/info-i.svg" width="12" height="12"></span></a>';
//                                         subKpiOptionsicon += '<div class="dropdown"><button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"><span class="icon"><img width="12" height="12" src="/stratroom/images/menu-dot-vertical-i.svg"></span></button><ul class="dropdown-menu dropdown-menu-end border-0 shadow">';

//                                         if (kpieditpermission == true) {
//                                             subKpiOptionsicon += '<li><a class="dropdown-item" data-toggle="modal" data-target=".updateSubkpi_description_popup" onclick="handleEditSubKpiEvent(' + subKpi.id + ', \'edit\', ' + objective.id + ', ' + subKpi.kpiId + ')">Edit</a></li>';
//                                         }
//                                         if (kpiviewpermission == true) {
//                                             subKpiOptionsicon += '<li><a class="dropdown-item" data-toggle="modal" data-target=".updateSubkpi_description_popup" onclick="handleEditSubKpiEvent(' + subKpi.id + ', \'view\', ' + objective.id + ')">View</a></li>';
//                                         }
//                                         if (kpideletepermission == true) {
//                                             subKpiOptionsicon += '<li><a class="dropdown-item" href="#" onclick="handledeleteSubKpi(' + subKpi.id + ', \'delete\')">Delete</a></li>';
//                                         }

//                                         subKpiOptionsicon += '</ul></div></div>';
//                                     }

//                                     // Sub-KPI Status, Trend, Risk
//                                     var subKpithresholdResult = subKpi.subKpiValue.thresholdResult || "";
//                                     var subTrendValue = subKpi.subKpiValue.trend ? '<img src="/stratroom/images/menu-dot-vertical-i.svg" width="12" height="12">' : "";
//                                     var subRiskStatusLight = subKpi.subKpiValue.riskStatusLight
//                                         ? '<a href="/stratroom/risks?kpiId=' + subKpi.id + '&kpiRiskView=true"><img src="/stratroom/images/menu-dot-vertical-i.svg" width="16" height="16"></a>'
//                                         : "";

//                                     // Build Sub-KPI Row
//                                     let subKpiRow = "<tr class=\"level-2 kpi-" + kpi.id + "-child\" style=\"display:none;\">";
//                                     subKpiRow += "<td width=\"30\"><div class=\"d-flex justify-content-end gap-2\"><img src=\"https://stratroom.io/projects/mg-portal-html/assets/images/icons/flag-green-i.svg\" width=\"16\" height=\"16\"></div></td>";
//                                     subKpiRow += "<td width=\"80\">" + (subKpi.subKpiId || "") + "</td>";
//                                     subKpiRow += "<td><div style=\"min-width:260px\">" + subKpi.subKpiValue.subMeasureName + "</div></td>";
//                                     subKpiRow += "<td width=\"50\" class=\"text-center\">" + (subKpi.subKpiValue.kpi_measurement || "") + "</td>";

//                                     if (scorecardscore) subKpiRow += "<td width=\"50\" class=\"text-center\">" + subKpithresholdResult + "</td>";
//                                     if (scorecardtrend) subKpiRow += "<td width=\"50\" class=\"text-center\">" + subTrendValue + "</td>";
//                                     if (scorecardbaseline) subKpiRow += "<td width=\"50\" class=\"text-center\"></td>";
//                                     if (scorecardactual) subKpiRow += "<td width=\"50\" class=\"text-center\">" + subKpiActual + "</td>";
//                                     if (scorecardtarget) subKpiRow += "<td width=\"50\" class=\"text-center\">" + subKpiTarget + "</td>";
//                                     if (scorecardrisk) subKpiRow += "<td width=\"50\" class=\"text-center\">" + subRiskStatusLight + "</td>";

//                                     subKpiRow += "<td width=\"70\">" + subKpiOptionsicon + "</td>";
//                                     subKpiRow += "</tr>";
//                                     tableBody += subKpiRow;
//                                 });
//                             }
//                         });
//                     }
//                 });
//             }
//             tableBody += "</tbody>";

//             // Final HTML for tab
//             let finalHtml = "";
//             finalHtml += '<div class="card custom-card table-card">';
//             finalHtml += '<div class="card-header">';
//             finalHtml += '<div class="c-header-left">';
//             finalHtml += '<span class="badge ' + scorecardStatuslight + '">' + (scorecardStatusvalueofweight ? scorecardStatusvalueofweight : "0%") + '</span>';
//             finalHtml += '<h5 class="card-title me-auto"><strong>' + scorecard.scoreCardValue.name + '</strong></h5>';
//             finalHtml += '</div>';
//             finalHtml += '<div class="card-actions">' + perspectiveOptionsicon + '</div>';
//             finalHtml += '</div>';
//             finalHtml += '<div class="card-body">';
//             finalHtml += '<div id="table-financial_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer" style="margin-left: -10px;">';
//             finalHtml += '<div class="row"><div class="col-sm-12 col-md-6"></div><div class="col-sm-12 col-md-6"></div></div>';
//             finalHtml += '<div class="row dt-row"><div class="col-sm-12">';
//             finalHtml += '<div class="dataTables_scroll">';
//             finalHtml += '<div class="dataTables_scrollHead" style="overflow: hidden; position: relative; border: 0px; width: 100%;">';
//             finalHtml += '<div class="dataTables_scrollHeadInner" style="box-sizing: content-box; width: 100%; padding-left: 0.5rem;">';  
//             finalHtml += '<table class="table table-bordered w-100 dataTable no-footer" id="table-' + tablePrefix + '" style="margin-left: 0px; width: 100%;">';
//             finalHtml += tableHeader;
//             finalHtml += '</table>';
//             finalHtml += '</div>';
//             finalHtml += '</div>';
//             finalHtml += '<div class="dataTables_scrollBody" style="position: relative; width: 1190px;">';
//             finalHtml += '<table class="table table-bordered w-100 dataTable no-footer" id="table-' + tablePrefix + '" style="margin-left: 8px;">';
//             finalHtml += tableBody;
//             finalHtml += '</table>';
//             finalHtml += '</div>';
//             finalHtml += '</div></div></div></div></div></div>';

//             $currentTab.html(finalHtml);

//             // Initialize DataTable
//             setTimeout(() => {
//                 initializeDataTable('#table-' + tablePrefix);
//             }, 300);
//         });
//     }

//     // Show first tab
//     if ($tabList.find("button").length > 0) {
//         $tabList.find("button:first-child").tab("show");
//     }

//     // Toggle sub-KPIs
//     $(document).on("click", ".toggle-icon", function () {
//         let target = $(this).data("target");
//         let $childRows = $("." + target + "-child");

//         if ($(this).hasClass("fa-plus")) {
//             $(this).removeClass("fa-plus").addClass("fa-minus");
//             $childRows.show();
//         } else {
//             $(this).removeClass("fa-minus").addClass("fa-plus");
//             $childRows.hide();
//         }
//     });

//     // Preference handling
//     var pageId = $("#pagenumber").val();
//     $('.standard_multi-column-dropdown input[type="checkbox"]').click(function () {
//         var inputValue = $(this).attr("value");
//         var checkedProp = $(this).is(":checked");
//         inputValue = inputValue.replaceallstring();
//         scoreempPreference["pageName"] = "SCORECARD";
//         scoreempPreference["pageId"] = pageId;
//         scoreempPreference["preferences"][inputValue] = checkedProp;
//         $.ajax({
//             url: "/stratroom/employeePreference",
//             type: "POST",
//             contentType: "application/json",
//             data: JSON.stringify(scoreempPreference),
//             success: function (data, status) {},
//             error: readErrorMsg,
//         });
//         $("." + inputValue).toggle();
//     });

//     $(".standard_dropdown-hide").on("click", function (e) {
//         e.stopPropagation();
//     });
// }




function scordcardSuccessCallbackk(data) {

const dataaaa ={
    "flag": false,
    "statusLight": "RED",
    "scoreCardName": "2026-2027 Strategy",
    "cardDetailsDTO": {
        "id": 73,
        "active": 0,
        "owner": 2241,
        "scoreCardDetailsValue": {
            "createdByName": "Nizam Goolam",
            "scorecardFormula": "",
            "ownerName": "Nizam Goolam",
            "updatedByName": "Nizam Goolam",
            "description": "Corporate Scorecard",
            "scoreCardName": "2026-2027 Strategy",
            "scorecardFields": {
                "Actual": "true",
                "Target": "true",
                "Budget": "false",
                "Forecast": "false",
                "Baseline": "false",
                "Index": "false",
                "Trend": "true",
                "Risk": "false",
                "Decline": "false",
                "Type": "false"
            },
            "customReportees": "",
            "score_card_start_end_date": "04/01/2026 - 03/31/2027",
            "status": "Weighted"
        },
        "pageId": 3682,
        "createdBy": 2241,
        "updatedBy": 2241,
        "createdTime": "2026-03-12T10:50:06",
        "updatedTime": "2026-03-16T02:48:43",
        "scorecardName": "2026-2027 Strategy",
        "startDate": "2026-04-01T00:00:00.000+0000",
        "endDate": "2027-03-31T00:00:00.000+0000",
        "scoreCardDTOS": [
            {
                "id": 4565,
                "createdBy": 2241,
                "scorecardName": "2026-2027 Strategy",
                "perspectiveType": "Strategic Pillar 1",
                "perspectiveId": "SOU 1.1",
                "updatedBy": 2241,
                "createdTime": "2026-03-12T10:50:06",
                "updatedTime": "2026-03-13T13:44:41",
                "scoreCardValue": {
                    "header4": "Target",
                    "header3": "Actual",
                    "createdByName": "Nizam Goolam",
                    "scorecardFormula": "",
                    "header2": "Period",
                    "subweight": "",
                    "header1": "ID",
                    "updatedByName": "Nizam Goolam",
                    "description": "",
                    "weight": "0",
                    "header5": "Trend",
                    "thresholdFormula": "",
                    "perspective_start_end_date": "04/01/2026 - 03/31/2027",
                    "defaultscr": "",
                    "ownerName": "Nizam Goolam",
                    "modifyName": "Universal and Meaningful Connectivity",
                    "name": "Inclusive DIgital  Connectivity",
                    "modifyeType": "Universal and Meaningful Connectivity",
                    "perspectiveType": "Strategic Pillar 1",
                    "status": "Weighted",
                    "statusLight": "YELLOW",
                    "statusLightFlagvalue": "yellow fas fa-flag",
                    "statusLightFlag": "rgba(2, 125, 2, 1)"
                },
                "active": 0,
                "owner": 2241,
                "objectiveList": [
                    {
                        "id": 434,
                        "active": 0,
                        "objectivesValue": {
                            "thresholdFormula": "",
                            "createdByName": "Nizam Goolam",
                            "subweight": "",
                            "ownerName": "Nizam Goolam",
                            "updatedByName": "Nizam Goolam",
                            "name": "Advance Digital Inclusion Through Robust ICT Infrastructure, Affordability",
                            "objective_start_end_date": "04/01/2026 - 03/31/2027",
                            "objectiveId": "434",
                            "description": "",
                            "weight": "0",
                            "status": "Weighted",
                            "statusLight": "yellow fas fa-flag",
                            "statusLightFlag": "rgba(2, 125, 2, 1)"
                        },
                        "createdTime": "2026-03-12T10:50:06",
                        "updatedTime": "2026-03-16T02:37:03",
                        "owner": 2241,
                        "scoreCardId": 4565,
                        "createdBy": 2241,
                        "updatedBy": 2241,
                        "objectivesName": "Advance Digital Inclusion Through Robust ICT Infrastructure, Affordability",
                        "kpiList": [
                            {
                                "id": 2331,
                                "createdBy": 2241,
                                "kpiName": "Completion of the affordability report within the set timeline",
                                "kpiFormula": {
                                    "formula": "avg[Completion of the affordability report within the set timeline]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": [
                                        2241
                                    ],
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:06",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "40.83%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[Completion of the affordability report within the set timeline]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":[2241],\"period\":null,\"tableType\":null}",
                                    "name": "Completion of the affordability report within the set timeline",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "supportNeeded": "support",
                                    "remarks": "remark",
                                    "status": "Weighted",
                                    "statusLight": "yellow fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "trend": "fas fa-arrow-up",
                                    "actual": "35%",
                                    "gap": "-5.83%",
                                    "thresholdResult": "85.72",
                                    "statusLightFlag": "rgba(255, 193, 7, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 434,
                                "kpiId": "OP 6",
                                "includeReportee": false,
                                "customReportees": "",
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 1,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            }
                        ],
                        "objectiveId": "SOB 1.1.1",
                        "startDate": "2026-04-01T00:00:00.000+0000",
                        "endDate": "2027-03-31T00:00:00.000+0000"
                    }
                ],
                "pageId": 3682,
                "includeReportee": false,
                "customReportees": "",
                "startDate": "2026-04-01T00:00:00.000+0000",
                "endDate": "2027-03-31T00:00:00.000+0000",
                "scoreCardDetailsId": 73
            },
            {
                "id": 4566,
                "createdBy": 2241,
                "scorecardName": "2026-2027 Strategy",
                "perspectiveType": "Enabled Regulatory Environment",
                "perspectiveId": "SOU 2.1",
                "updatedBy": 2241,
                "createdTime": "2026-03-12T10:50:06",
                "updatedTime": "2026-03-12T10:50:08",
                "scoreCardValue": {
                    "header4": "Target",
                    "header3": "Actual",
                    "createdByName": "Nizam Goolam",
                    "header2": "Period",
                    "header1": "ID",
                    "updatedByName": "Nizam Goolam",
                    "weight": 0,
                    "header5": "Trend",
                    "perspective_start_end_date": "04/01/2026 - 03/31/2027",
                    "defaultscr": true,
                    "ownerName": "Nizam Goolam",
                    "name": "Enabled Regulatory Environment",
                    "perspectiveType": "Enabled Regulatory Environment",
                    "status": "Weighted",
                    "statusLight": "RED",
                    "statusLightFlagvalue": "red fas fa-flag",
                    "statusLightFlag": "rgba(255, 26, 9, 1)"
                },
                "active": 0,
                "owner": 2241,
                "objectiveList": [
                    {
                        "id": 435,
                        "active": 0,
                        "objectivesValue": {
                            "thresholdFormula": "",
                            "createdByName": "Nizam Goolam",
                            "subweight": "",
                            "ownerName": "Nizam Goolam",
                            "updatedByName": "Nizam Goolam",
                            "name": "Improve Regulatory Services (Delivering Effective & Responsive Service ",
                            "objective_start_end_date": "04/01/2026 - 03/31/2027",
                            "objectiveId": "435",
                            "description": "",
                            "weight": "0",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "statusLightFlag": "rgba(255, 26, 9, 1)"
                        },
                        "createdTime": "2026-03-12T10:50:06",
                        "updatedTime": "2026-03-16T02:37:48",
                        "owner": 2241,
                        "scoreCardId": 4566,
                        "createdBy": 2241,
                        "updatedBy": 2241,
                        "objectivesName": "Improve Regulatory Services (Delivering Effective & Responsive Service ",
                        "kpiList": [
                            {
                                "id": 2332,
                                "createdBy": 2241,
                                "kpiName": "Charter developed and approved within the set timeline",
                                "kpiFormula": {
                                    "formula": "avg[Charter developed and approved within the set timeline]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:06",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "33.33%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[Charter developed and approved within the set timeline]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "Charter developed and approved within the set timeline",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-33.33%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 435,
                                "kpiId": "OP 21",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2333,
                                "createdBy": 2241,
                                "kpiName": "% of internal and external stakeholders sensitized on Charter standards",
                                "kpiFormula": {
                                    "formula": "avg[% of internal and external stakeholders sensitized on Charter standards]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:06",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "0",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[% of internal and external stakeholders sensitized on Charter standards]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "% of internal and external stakeholders sensitized on Charter standards",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "0%",
                                    "thresholdResult": "0",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 435,
                                "kpiId": "OP 22",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2334,
                                "createdBy": 2241,
                                "kpiName": "% compliance with service charter standards",
                                "kpiFormula": {
                                    "formula": "avg[% compliance with service charter standards]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:06",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "66.67%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[% compliance with service charter standards]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "% compliance with service charter standards",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "green fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "trend": "fas fa-arrow-up",
                                    "actual": "60%",
                                    "gap": "-6.67%",
                                    "thresholdResult": "90.00",
                                    "statusLightFlag": "rgba(2, 125, 2, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 435,
                                "kpiId": "OP 23",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            }
                        ],
                        "objectiveId": "SOB 2.1.1",
                        "startDate": "2026-04-01T00:00:00.000+0000",
                        "endDate": "2027-03-31T00:00:00.000+0000"
                    },
                    {
                        "id": 436,
                        "active": 0,
                        "objectivesValue": {
                            "createdByName": "Nizam Goolam",
                            "ownerName": "Nizam Goolam",
                            "updatedByName": "Nizam Goolam",
                            "name": "Strengthen Stakeholder Engagement And Collaboration",
                            "objective_start_end_date": "04/01/2026 - 03/31/2027",
                            "weight": 0,
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "statusLightFlag": "rgba(255, 26, 9, 1)"
                        },
                        "createdTime": "2026-03-12T10:50:06",
                        "updatedTime": "2026-03-12T10:50:08",
                        "owner": 2241,
                        "scoreCardId": 4566,
                        "createdBy": 2241,
                        "updatedBy": 2241,
                        "objectivesName": "Strengthen Stakeholder Engagement And Collaboration",
                        "kpiList": [
                            {
                                "id": 2335,
                                "createdBy": 2241,
                                "kpiName": "Approved stakeholder engagement framework within the set timeframe",
                                "kpiFormula": {
                                    "formula": "avg[Approved stakeholder engagement framework within the set timeframe]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:06",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "33.33%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[Approved stakeholder engagement framework within the set timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "Approved stakeholder engagement framework within the set timeframe",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-33.33%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 436,
                                "kpiId": "OP 27",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2336,
                                "createdBy": 2241,
                                "kpiName": "# of MoUs or collaborations established",
                                "kpiFormula": {
                                    "formula": "sum[# of MoUs or collaborations established]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:07",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Number",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "101",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"sum[# of MoUs or collaborations established]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "# of MoUs or collaborations established",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0",
                                    "gap": "-101",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 436,
                                "kpiId": "OP 28",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2337,
                                "createdBy": 2241,
                                "kpiName": "Corporate communication and branding strategy approved within the set timeframe",
                                "kpiFormula": {
                                    "formula": "avg[Corporate communication and branding strategy approved within the set timeframe]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:07",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "33.33%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[Corporate communication and branding strategy approved within the set timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "Corporate communication and branding strategy approved within the set timeframe",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-33.33%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 436,
                                "kpiId": "OP 32",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2338,
                                "createdBy": 2241,
                                "kpiName": "% of annual communication and branding activities as per approved plan",
                                "kpiFormula": {
                                    "formula": "avg[% of annual communication and branding activities as per approved plan]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:07",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "30%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[% of annual communication and branding activities as per approved plan]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "% of annual communication and branding activities as per approved plan",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-30%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 436,
                                "kpiId": "OP 33",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2339,
                                "createdBy": 2241,
                                "kpiName": "Official brand guideline manual developed within the set timeframe",
                                "kpiFormula": {
                                    "formula": "avg[Official brand guideline manual developed within the set timeframe]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:07",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "33.33%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[Official brand guideline manual developed within the set timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "Official brand guideline manual developed within the set timeframe",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-33.33%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 436,
                                "kpiId": "OP 34",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2340,
                                "createdBy": 2241,
                                "kpiName": "Compliance to brand guidelines",
                                "kpiFormula": {
                                    "formula": "avg[Compliance to brand guidelines]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:07",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "66.67%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[Compliance to brand guidelines]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "Compliance to brand guidelines",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "trend": "fas fa-arrow-down",
                                    "actual": "10%",
                                    "gap": "-56.67%",
                                    "thresholdResult": "15.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 436,
                                "kpiId": "OP 35",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2341,
                                "createdBy": 2241,
                                "kpiName": "Website launched and operational within the set timeframe",
                                "kpiFormula": {
                                    "formula": "avg[Website launched and operational within the set timeframe]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:07",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "28.33%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[Website launched and operational within the set timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "Website launched and operational within the set timeframe",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-28.33%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 436,
                                "kpiId": "OP 36",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2342,
                                "createdBy": 2241,
                                "kpiName": "Growth in website traffic and engagement metrics_%",
                                "kpiFormula": {
                                    "formula": "avg[Growth in website traffic and engagement metrics_%]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:07",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "0",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[Growth in website traffic and engagement metrics_%]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "Growth in website traffic and engagement metrics_%",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "0%",
                                    "thresholdResult": "0",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 436,
                                "kpiId": "OP 37",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2343,
                                "createdBy": 2241,
                                "kpiName": "% increase in followers and engagement on social media platforms",
                                "kpiFormula": {
                                    "formula": "avg[% increase in followers and engagement on social media platforms]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:07",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "7.83%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[% increase in followers and engagement on social media platforms]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "% increase in followers and engagement on social media platforms",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-7.83%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 436,
                                "kpiId": "OP 38",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2344,
                                "createdBy": 2241,
                                "kpiName": "% Stakeholder satisfaction",
                                "kpiFormula": {
                                    "formula": "avg[% Stakeholder satisfaction]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:08",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "28.33%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[% Stakeholder satisfaction]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "% Stakeholder satisfaction",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-28.33%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 436,
                                "kpiId": "OP 41",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2345,
                                "createdBy": 2241,
                                "kpiName": "% of implemented recommendations from the survey results",
                                "kpiFormula": {
                                    "formula": "avg[% of implemented recommendations from the survey results]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:08",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "7.5%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[% of implemented recommendations from the survey results]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "% of implemented recommendations from the survey results",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-7.5%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 436,
                                "kpiId": "OP 42",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            }
                        ],
                        "objectiveId": "SOB 2.1.3",
                        "startDate": "2026-04-01T00:00:00.000+0000",
                        "endDate": "2027-03-31T00:00:00.000+0000"
                    }
                ],
                "pageId": 3682,
                "includeReportee": false,
                "startDate": "2026-04-01T00:00:00.000+0000",
                "endDate": "2027-03-31T00:00:00.000+0000",
                "scoreCardDetailsId": 73
            },
            {
                "id": 4567,
                "createdBy": 2241,
                "scorecardName": "2026-2027 Strategy",
                "perspectiveType": "Consumer Empowerment",
                "perspectiveId": "SOU 3.1",
                "updatedBy": 2241,
                "createdTime": "2026-03-12T10:50:08",
                "updatedTime": "2026-03-12T10:50:08",
                "scoreCardValue": {
                    "header4": "Target",
                    "header3": "Actual",
                    "createdByName": "Nizam Goolam",
                    "header2": "Period",
                    "header1": "ID",
                    "updatedByName": "Nizam Goolam",
                    "weight": 0,
                    "header5": "Trend",
                    "perspective_start_end_date": "04/01/2026 - 03/31/2027",
                    "defaultscr": true,
                    "ownerName": "Nizam Goolam",
                    "modifyName": "Consumer Protection",
                    "name": "Consumer Empowerment",
                    "modifyeType": "Consumer Protection",
                    "perspectiveType": "Consumer Empowerment",
                    "status": "Weighted",
                    "statusLight": "RED",
                    "statusLightFlagvalue": "red fas fa-flag",
                    "statusLightFlag": "rgba(255, 26, 9, 1)"
                },
                "active": 0,
                "owner": 2241,
                "objectiveList": [
                    {
                        "id": 437,
                        "active": 0,
                        "objectivesValue": {
                            "createdByName": "Nizam Goolam",
                            "ownerName": "Nizam Goolam",
                            "updatedByName": "Nizam Goolam",
                            "name": "Safeguard Consumer Rights",
                            "objective_start_end_date": "04/01/2026 - 03/31/2027",
                            "weight": 0,
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "statusLightFlag": "rgba(255, 26, 9, 1)"
                        },
                        "createdTime": "2026-03-12T10:50:08",
                        "updatedTime": "2026-03-12T10:50:08",
                        "owner": 2241,
                        "scoreCardId": 4567,
                        "createdBy": 2241,
                        "updatedBy": 2241,
                        "objectivesName": "Safeguard Consumer Rights",
                        "kpiList": [
                            {
                                "id": 2346,
                                "createdBy": 2241,
                                "kpiName": "Plan completed in the set timeframe",
                                "kpiFormula": {
                                    "formula": "avg[Plan completed in the set timeframe]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:08",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "33.33%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[Plan completed in the set timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "Plan completed in the set timeframe",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-33.33%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 437,
                                "kpiId": "OP 61",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2347,
                                "createdBy": 2241,
                                "kpiName": "Initiatives implemented",
                                "kpiFormula": {
                                    "formula": "avg[Initiatives implemented]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:08",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "21.67%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[Initiatives implemented]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "Initiatives implemented",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "green fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "trend": "fas fa-arrow-up",
                                    "actual": "20%",
                                    "gap": "-1.67%",
                                    "thresholdResult": "92.29",
                                    "statusLightFlag": "rgba(2, 125, 2, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 437,
                                "kpiId": "OP 62",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2348,
                                "createdBy": 2241,
                                "kpiName": "Consumer satisfaction report completed within the set timeframe",
                                "kpiFormula": {
                                    "formula": "avg[Consumer satisfaction report completed within the set timeframe]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:08",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "33.33%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[Consumer satisfaction report completed within the set timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "Consumer satisfaction report completed within the set timeframe",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-33.33%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 437,
                                "kpiId": "OP 63",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2349,
                                "createdBy": 2241,
                                "kpiName": "% consumer satisfaction",
                                "kpiFormula": {
                                    "formula": "avg[% consumer satisfaction]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:08",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "60%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[% consumer satisfaction]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "% consumer satisfaction",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-60%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 437,
                                "kpiId": "OP 64",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2350,
                                "createdBy": 2241,
                                "kpiName": "% of implemented recommendations from the survey results",
                                "kpiFormula": {
                                    "formula": "avg[% of implemented recommendations from the survey results]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:08",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "7.5%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[% of implemented recommendations from the survey results]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "% of implemented recommendations from the survey results",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-7.5%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 437,
                                "kpiId": "OP 65",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            }
                        ],
                        "objectiveId": "SOB 3.1.1",
                        "startDate": "2026-04-01T00:00:00.000+0000",
                        "endDate": "2027-03-31T00:00:00.000+0000"
                    }
                ],
                "pageId": 3682,
                "includeReportee": false,
                "startDate": "2026-04-01T00:00:00.000+0000",
                "endDate": "2027-03-31T00:00:00.000+0000",
                "scoreCardDetailsId": 73
            },
            {
                "id": 4568,
                "createdBy": 2241,
                "scorecardName": "2026-2027 Strategy",
                "perspectiveType": "Enhanced Institutional Performance",
                "perspectiveId": "SOU 4.1",
                "updatedBy": 2241,
                "createdTime": "2026-03-12T10:50:08",
                "updatedTime": "2026-03-12T10:50:11",
                "scoreCardValue": {
                    "header4": "Target",
                    "header3": "Actual",
                    "createdByName": "Nizam Goolam",
                    "header2": "Period",
                    "header1": "ID",
                    "updatedByName": "Nizam Goolam",
                    "weight": 0,
                    "header5": "Trend",
                    "perspective_start_end_date": "04/01/2026 - 03/31/2027",
                    "defaultscr": true,
                    "ownerName": "Nizam Goolam",
                    "modifyName": "Organizational Sustainability",
                    "name": "Enhanced Institutional Performance",
                    "modifyeType": "Organizational Sustainability",
                    "perspectiveType": "Enhanced Institutional Performance",
                    "status": "Weighted",
                    "statusLight": "RED",
                    "statusLightFlagvalue": "red fas fa-flag",
                    "statusLightFlag": "rgba(255, 26, 9, 1)"
                },
                "active": 0,
                "owner": 2241,
                "objectiveList": [
                    {
                        "id": 438,
                        "active": 0,
                        "objectivesValue": {
                            "createdByName": "Nizam Goolam",
                            "ownerName": "Nizam Goolam",
                            "updatedByName": "Nizam Goolam",
                            "name": "Accelerate Digital Transformation In The Authority",
                            "objective_start_end_date": "04/01/2026 - 03/31/2027",
                            "weight": 0,
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "statusLightFlag": "rgba(255, 26, 9, 1)"
                        },
                        "createdTime": "2026-03-12T10:50:08",
                        "updatedTime": "2026-03-12T10:50:10",
                        "owner": 2241,
                        "scoreCardId": 4568,
                        "createdBy": 2241,
                        "updatedBy": 2241,
                        "objectivesName": "Accelerate Digital Transformation In The Authority",
                        "kpiList": [
                            {
                                "id": 2351,
                                "createdBy": 2241,
                                "kpiName": "% of user satisfaction with automated systems",
                                "kpiFormula": {
                                    "formula": "avg[% of user satisfaction with automated systems]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:09",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "50%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[% of user satisfaction with automated systems]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "% of user satisfaction with automated systems",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-50%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 438,
                                "kpiId": "OP 75",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2352,
                                "createdBy": 2241,
                                "kpiName": "Data governance framework completed within the set timeframe",
                                "kpiFormula": {
                                    "formula": "sum[Data governance framework completed within the set timeframe]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:09",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Number",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "220",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"sum[Data governance framework completed within the set timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "Data governance framework completed within the set timeframe",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0",
                                    "gap": "-220",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 438,
                                "kpiId": "OP 82",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2359,
                                "createdBy": 2241,
                                "kpiName": "Capacity development program approved within the set timeframe",
                                "kpiFormula": {
                                    "formula": "avg[Capacity development program approved within the set timeframe]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:10",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "33.33%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[Capacity development program approved within the set timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "Capacity development program approved within the set timeframe",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-33.33%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 438,
                                "kpiId": "OP 97",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2360,
                                "createdBy": 2241,
                                "kpiName": "# of capacity development program implemented",
                                "kpiFormula": {
                                    "formula": "sum[# of capacity development program implemented]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:10",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Number",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "7",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"sum[# of capacity development program implemented]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "# of capacity development program implemented",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0",
                                    "gap": "-7",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 438,
                                "kpiId": "OP 98",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2361,
                                "createdBy": 2241,
                                "kpiName": "Structured recognition program within the set timeframe",
                                "kpiFormula": {
                                    "formula": "avg[Structured recognition program within the set timeframe]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:10",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "33.33%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[Structured recognition program within the set timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "Structured recognition program within the set timeframe",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-33.33%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 438,
                                "kpiId": "OP 99",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2362,
                                "createdBy": 2241,
                                "kpiName": "# of recognitions per year",
                                "kpiFormula": {
                                    "formula": "sum[# of recognitions per year]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:10",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Number",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "201",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"sum[# of recognitions per year]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "# of recognitions per year",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0",
                                    "gap": "-201",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 438,
                                "kpiId": "OP 100",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            }
                        ],
                        "objectiveId": "SOB 4.1.1",
                        "startDate": "2026-04-01T00:00:00.000+0000",
                        "endDate": "2027-03-31T00:00:00.000+0000"
                    },
                    {
                        "id": 439,
                        "active": 0,
                        "objectivesValue": {
                            "createdByName": "Nizam Goolam",
                            "ownerName": "Nizam Goolam",
                            "updatedByName": "Nizam Goolam",
                            "name": "Enhance Organizational Culture",
                            "objective_start_end_date": "04/01/2026 - 03/31/2027",
                            "weight": 0,
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "statusLightFlag": "rgba(255, 26, 9, 1)"
                        },
                        "createdTime": "2026-03-12T10:50:09",
                        "updatedTime": "2026-03-12T10:50:11",
                        "owner": 2241,
                        "scoreCardId": 4568,
                        "createdBy": 2241,
                        "updatedBy": 2241,
                        "objectivesName": "Enhance Organizational Culture",
                        "kpiList": [
                            {
                                "id": 2353,
                                "createdBy": 2241,
                                "kpiName": "Internal communication policy completed within the set time frame",
                                "kpiFormula": {
                                    "formula": "avg[Internal communication policy completed within the set time frame]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:09",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "33.33%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[Internal communication policy completed within the set time frame]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "Internal communication policy completed within the set time frame",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-33.33%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 439,
                                "kpiId": "OP 89",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2354,
                                "createdBy": 2241,
                                "kpiName": "% of staff aware of the Policy",
                                "kpiFormula": {
                                    "formula": "avg[% of staff aware of the Policy]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:09",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "0",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[% of staff aware of the Policy]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "% of staff aware of the Policy",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "0%",
                                    "thresholdResult": "0",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 439,
                                "kpiId": "OP 90",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2355,
                                "createdBy": 2241,
                                "kpiName": "Intranet satisfaction rating",
                                "kpiFormula": {
                                    "formula": "avg[Intranet satisfaction rating]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:09",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "20%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[Intranet satisfaction rating]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "Intranet satisfaction rating",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-20%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 439,
                                "kpiId": "OP 93",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2356,
                                "createdBy": 2241,
                                "kpiName": "Annual internal communication & events calendar completed within the set timeframe",
                                "kpiFormula": {
                                    "formula": "avg[Annual internal communication & events calendar completed within the set timeframe]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:09",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "0",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[Annual internal communication & events calendar completed within the set timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "Annual internal communication & events calendar completed within the set timeframe",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0",
                                    "gap": 0,
                                    "thresholdResult": "0",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 439,
                                "kpiId": "OP 94",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2357,
                                "createdBy": 2241,
                                "kpiName": "% of events delivered as planned",
                                "kpiFormula": {
                                    "formula": "avg[% of events delivered as planned]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:09",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "70%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[% of events delivered as planned]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "% of events delivered as planned",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-70%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 439,
                                "kpiId": "OP 95",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2358,
                                "createdBy": 2241,
                                "kpiName": "Employee satisfaction rating",
                                "kpiFormula": {
                                    "formula": "avg[Employee satisfaction rating]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:09",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "30%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[Employee satisfaction rating]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "Employee satisfaction rating",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-30%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 439,
                                "kpiId": "OP 96",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2363,
                                "createdBy": 2241,
                                "kpiName": "Internal climate survey report completed within the set timeframe",
                                "kpiFormula": {
                                    "formula": "avg[Internal climate survey report completed within the set timeframe]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:10",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "33.33%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[Internal climate survey report completed within the set timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "Internal climate survey report completed within the set timeframe",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-33.33%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 439,
                                "kpiId": "OP 101",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2364,
                                "createdBy": 2241,
                                "kpiName": "Internal Climate survey report",
                                "kpiFormula": {
                                    "formula": "avg[Internal Climate survey report]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:10",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "0",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[Internal Climate survey report]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "Internal Climate survey report",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "0%",
                                    "thresholdResult": "0",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 439,
                                "kpiId": "OP 102",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2365,
                                "createdBy": 2241,
                                "kpiName": "Net Promoter Score",
                                "kpiFormula": {
                                    "formula": "avg[Net Promoter Score]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:10",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "10.83%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[Net Promoter Score]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "Net Promoter Score",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-10.83%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 439,
                                "kpiId": "OP 103",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2366,
                                "createdBy": 2241,
                                "kpiName": "Internal climate score",
                                "kpiFormula": {
                                    "formula": "avg[Internal climate score]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:11",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "10.83%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[Internal climate score]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "Internal climate score",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-10.83%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 439,
                                "kpiId": "OP 104",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2367,
                                "createdBy": 2241,
                                "kpiName": "% of implemented recommendations from the survey results",
                                "kpiFormula": {
                                    "formula": "avg[% of implemented recommendations from the survey results]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:11",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "7.5%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[% of implemented recommendations from the survey results]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "% of implemented recommendations from the survey results",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-7.5%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 439,
                                "kpiId": "OP 105",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2368,
                                "createdBy": 2241,
                                "kpiName": "Approval of new PMS framework within the set time frame",
                                "kpiFormula": {
                                    "formula": "avg[Approval of new PMS framework within the set time frame]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:11",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "33.33%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[Approval of new PMS framework within the set time frame]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "Approval of new PMS framework within the set time frame",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-33.33%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 439,
                                "kpiId": "OP 106",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2369,
                                "createdBy": 2241,
                                "kpiName": "Framework finalized and implemented within the target date",
                                "kpiFormula": {
                                    "formula": "avg[Framework finalized and implemented within the target date]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:11",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "33.33%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[Framework finalized and implemented within the target date]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "Framework finalized and implemented within the target date",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-33.33%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 439,
                                "kpiId": "OP 107",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2370,
                                "createdBy": 2241,
                                "kpiName": "% implementation of the operational plans_OPs",
                                "kpiFormula": {
                                    "formula": "avg[% implementation of the operational plans_OPs]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:11",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "45%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[% implementation of the operational plans_OPs]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "% implementation of the operational plans_OPs",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-45%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 439,
                                "kpiId": "OP 108",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            },
                            {
                                "id": 2371,
                                "createdBy": 2241,
                                "kpiName": "% compliance rate",
                                "kpiFormula": {
                                    "formula": "avg[% compliance rate]",
                                    "fieldName": null,
                                    "type": null,
                                    "groupBy": null,
                                    "deptName": null,
                                    "deptId": null,
                                    "currency": null,
                                    "dataType": null,
                                    "empployeeIds": null,
                                    "period": null,
                                    "tableType": null
                                },
                                "updatedBy": 0,
                                "createdTime": "2026-03-12T10:50:11",
                                "kpiValue": {
                                    "createdByName": "Nizam Goolam",
                                    "option2color2colorvalue": "rgb(255, 193, 7)",
                                    "threshold": "option_2",
                                    "thresholdFormula": "(Actual/Target)*100",
                                    "contribution": 0,
                                    "ownerName": "Nizam Goolam",
                                    "option2color3colorvalue": "rgb(37, 125, 5)",
                                    "header4": "Forecast",
                                    "option2color1colorvalue": "rgb(244, 67, 54)",
                                    "option2color2": "90.0",
                                    "header3": "Target",
                                    "option2color3": "100.0",
                                    "header2": "Budget",
                                    "header1": "Actual",
                                    "customthresholdenable": true,
                                    "dataType": "Percentage",
                                    "option2color1": "60.0",
                                    "weight": 0,
                                    "target": "80%",
                                    "kpiRole": "Lead",
                                    "kpi_datasource": "Manual",
                                    "kpiFormula": "{\"formula\":\"avg[% compliance rate]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                                    "name": "% compliance rate",
                                    "kpi_measurement": "Quarterly",
                                    "kpi_start_end_date": "04/01/2026 - 03/31/2027",
                                    "status": "Weighted",
                                    "statusLight": "red fas fa-flag",
                                    "actualCurrency": "",
                                    "targetCurrency": "",
                                    "actual": "0%",
                                    "gap": "-80%",
                                    "thresholdResult": "0.00",
                                    "statusLightFlag": "rgba(255, 26, 9, 1)",
                                    "ytdvalue": "0"
                                },
                                "active": 0,
                                "owner": 2241,
                                "objectiveId": 439,
                                "kpiId": "OP 113",
                                "includeReportee": false,
                                "startDate": "2026-04-01T00:00:00.000+0000",
                                "endDate": "2027-03-31T00:00:00.000+0000",
                                "actType": 0,
                                "thresholdvalueupdate": false,
                                "subKpiList": []
                            }
                        ],
                        "objectiveId": "SOB 4.1.3",
                        "startDate": "2026-04-01T00:00:00.000+0000",
                        "endDate": "2027-03-31T00:00:00.000+0000"
                    }
                ],
                "pageId": 3682,
                "includeReportee": false,
                "startDate": "2026-04-01T00:00:00.000+0000",
                "endDate": "2027-03-31T00:00:00.000+0000",
                "scoreCardDetailsId": 73
            }
        ],
        "departmentId": 1049,
        "departmentName": "CEO OFFICE"
    }
}


// data.cardDetailsDTO.scoreCardDTOS.forEach(scorecard => {
//     scorecard.objectiveList.forEach(objective => {

//         objective.kpiList = objective.kpiList.filter(kpi => {
//             const target = kpi?.kpiValue?.target;

//             return target !== 0 &&
//                    target !== "0" &&
//                    target !== null &&
//                    target !== undefined &&
//                    target !== "" &&
//                    target !== "undefined";
//         });

//     });
// });

console.log(data, "redefinedData");

 getScoreCardData = data.cardDetailsDTO || {};


scorecardFields = data?.cardDetailsDTO?.scoreCardDetailsValue?.scorecardFields || {};

  scorecardJsonListResponseData = data;
    console.log(data, "ACTUALFUNCTION")

    $(".sorecardTitleHeader").text(data.scoreCardName);

    // Set score value
    let score_value = "0.0";
    score_value = data.thresholdResult != "" && data.thresholdResult != null ? data.thresholdResult : "0.0";
    $("#score").html(score_value);

    $(".scorecardValue").text(score_value + "%");

    // Handle scorecard name display
    if (data.message != undefined && data.scoreCardName != undefined) {
        $(".card-title strong").text(data.scoreCardName);
    }

    if (!data.flag && data.message != undefined && data.message != "") {
        $(".table-card").html(
            "<div class='card-body'><center><h3>" + data.message + "</h3></center></div>"
        );
        return;
    }

    scorecardlist = data.cardDetailsDTO;

    // Clear existing content
    $("#scordcard-wrapper").empty();

    // Initialize counters
    var nestedredcount = 0;
    var nestedyellowcount = 0;
    var nestedblackcount = 0;
    var nestedgreencount = 0;
    var scorecardname = "ScoreCard";

    // Initialize settings flags
    var scorecardactual = false;
    var scorecardtarget = false;
    var scorecardbudget = false;
    var scorecardforecast = false;
    var scorecarddecline = false;
    var scorecardscore = false;
    var typeValue = false;
    var scorecardtrend = false;
    var scorecardrisk = false;
    var scorecardbaseline = false;

    if (
        controlpanelScorecardSettings != "" &&
        controlpanelScorecardSettings != undefined
    ) {
        // scorecardactual = controlpanelScorecardSettings.scorecardactual || false;
        // scorecardtarget = controlpanelScorecardSettings.scorecardtarget || false;
        // scorecardbudget = controlpanelScorecardSettings.scorecardbudget || false;
        // scorecardforecast = controlpanelScorecardSettings.scorecardforecast || false;
        // scorecarddecline = controlpanelScorecardSettings.scorecarddecline || false;
        // scorecardscore = controlpanelScorecardSettings.scorecardscore || false;
        // scorecardtrend = controlpanelScorecardSettings.scorecardtrend || false;
        // scorecardrisk = controlpanelScorecardSettings.scorecardrisk || false;
        // scorecardbaseline = controlpanelScorecardSettings.scorecardbaseline || false;

        // scorecardactual = scorecardlist.scoreCardDetailsValue.scorecardFields.Actual ? scorecardlist.scoreCardDetailsValue.scorecardFields.Actual == "true"  ? true : false : false || false; 
        // scorecardtarget = scorecardlist.scoreCardDetailsValue.scorecardFields.Target ? scorecardlist.scoreCardDetailsValue.scorecardFields.Target == "true" ? true : false : false || false;
        // scorecardbudget = scorecardlist.scoreCardDetailsValue.scorecardFields.Budget ? scorecardlist.scoreCardDetailsValue.scorecardFields.Budget == "true" ? true : false : false || false;
        // scorecardforecast = scorecardlist.scoreCardDetailsValue.scorecardFields.Forecast ? scorecardlist.scoreCardDetailsValue.scorecardFields.Forecast == "true" ? true : false : false || false;
        // scorecarddecline = scorecardlist.scoreCardDetailsValue.scorecardFields.Decline ? scorecardlist.scoreCardDetailsValue.scorecardFields.Decline == "true" ? true : false : false || false;
        // scorecardscore = controlpanelScorecardSettings.scorecardscore || false;
        // scorecardtrend = scorecardlist.scoreCardDetailsValue.scorecardFields.Trend ? scorecardlist.scoreCardDetailsValue.scorecardFields.Trend == "true" ? true : false : false || false;
        // scorecardrisk = scorecardlist.scoreCardDetailsValue.scorecardFields.Risk ? scorecardlist.scoreCardDetailsValue.scorecardFields.Risk == "true" ? true : false : false || false;
        // scorecardbaseline = scorecardlist.scoreCardDetailsValue.scorecardFields.Baseline ? scorecardlist.scoreCardDetailsValue.scorecardFields.Baseline == "true" ? true : false: false || false;

        const fields = scorecardlist?.scoreCardDetailsValue?.scorecardFields ?? {};

        scorecardactual   = fields.Actual   == "true";
        scorecardtarget   = fields.Target   == "true";
        scorecardbudget   = fields.Budget   == "true";
        scorecardforecast = fields.Forecast == "true";
        scorecarddecline  = fields.Decline  == "true";
        scorecardtrend    = fields.Trend    == "true";
        scorecardrisk     = fields.Risk     == "true";
        scorecardbaseline = fields.Baseline == "true";
        typeValue   = fields.Type   == "true";

        scorecardscore = controlpanelScorecardSettings?.scorecardscore ?? false;

    }

    // Create tab container HTML
    let tabHTML = "";

tabHTML += `<div class="card-header p-0">
                <div class="c-header-left">
                <div class="dropdown dropdown-tab dropdown-tab-ellipsis"> 
                    <button class="btn btn-primary dropdown-toggle d-lg-none" type="button"
                            id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        Users
                    </button>
                    <ul class="dropdown-menu nav nav-pills" id="v-pills-tab" role="tablist">
                       
                    </ul>
                </div>    
                </div>
            </div>`;
tabHTML += `<div class="tab-content" id="v-pills-tabContent" style="padding: 0.5rem 0.5rem 0.5rem 0.5rem;">
               
            </div>`;
    $("#scordcard-wrapper").html(tabHTML);

    let $tabList = $("#v-pills-tab");
    let $tabContent = $("#v-pills-tabContent");

    // Determine scorecard name
    if (
        data.cardDetailsDTO != undefined &&
        data.cardDetailsDTO.scorecardName != undefined &&
        data.cardDetailsDTO.scorecardName != null
    ) {
        scorecardname = data.cardDetailsDTO.scorecardName;
        $(".card-title strong").text(scorecardname);
    } else if (data.scoreCardName != undefined && data.scoreCardName != null) {
        scorecardname = data.scoreCardName;
    }

    // Process each scorecard and create tabs
    if (data.cardDetailsDTO != undefined && data.cardDetailsDTO.scoreCardDTOS) {
        $.each(data.cardDetailsDTO.scoreCardDTOS, function (index, scorecard) {
            let scorcardIdValue = scorecard.id;
            let tablePrefix = scorecard.scoreCardValue.name.toLowerCase().replace(/\s+/g, "-");
            let tabId = "v-pills-" + tablePrefix;
            let activeClass = index == 0 ? "active" : "";

            // $tabList.append(
            //   '<button class="nav-link ' + activeClass + ' border-end px-3 py-2" id="' + tabId + '-tab" data-bs-toggle="pill" href="#' + tabId + '" role="tab" aria-controls="' + tabId + '" aria-selected="' + (index == 0 ? "true" : "false") + '">' +
            //   '<span class="nav-text" contenteditable="true" ' +
            //   'oninput="if (this.innerText.length > 36) this.innerText = this.innerText.substring(0, 36);" ' +
            //   'style="font-weight: 500;" ' +
            //   'onkeydown="if(event.key == \'Enter\'){ event.preventDefault(); handlePerspectiveNameChange(event,' + scorcardIdValue + '); this.blur(); }">' + 
            //   scorecard.scoreCardValue.name +
            //   '</span>' +
            //   '</button>'
            // );


$tabList.append(
  '<button class="nav-link ' + activeClass + ' border-end px-3 py-2" id="' + tabId + '-tab" data-bs-toggle="pill" href="#' + tabId + '" role="tab" aria-controls="' + tabId + '" aria-selected="' + (index == 0 ? "true" : "false") + '">' +
  '<span class="nav-text" contenteditable="true" ' +
  'style="font-weight: 500;" ' +
  'onclick="event.stopPropagation();"' +
  'onkeydown="if(event.key==\'Enter\'){ event.preventDefault(); handlePerspectiveNameChange(event,' + scorcardIdValue + '); this.blur(); }">' +
  (scorecard?.scoreCardValue?.modifyName ? scorecard?.scoreCardValue?.modifyName : scorecard.scoreCardValue.name) +
  '</span>' +
  '</button>'
);


            // $tabList.append(
            // '<button class="nav-link ' + activeClass + ' border-end px-3 py-2" ' +
            //     'id="' + tabId + '-tab" ' +
            //     'data-bs-toggle="modal" ' +        // open a modal
            //     'data-bs-target="#nameUpdatePopUp" ' + // target the modal ID
            //     'role="tab" ' +
            //     'aria-controls="' + tabId + '" ' +
            //     'aria-selected="' + (index == 0 ? "true" : "false") + '" ' +
            //     'onclick="handlePerspectiveNameChange(' + scorcardIdValue + ', \'' +
            //         scorecard.scoreCardValue.name.replace(/'/g, "\\'") + '\')">' +
            //     scorecard.scoreCardValue.name +
            // '</button>'
            // );

            $tabContent.append(
                '<div class="tab-pane fade ' + (index == 0 ? 'show active' : '') + '" id="' + tabId + '" role="tabpanel" aria-labelledby="' + tabId + '-tab"></div>'
            );
            let $currentTab = $("#" + tabId);

            // Perspective options icon
            var perspectiveOptionsicon = "";
            if (
                !(
                    objectivecreatepermission == false &&
                    perspectiveeditpermission == false &&
                    perspectiveviewpermission == false
                )
            ) {
                perspectiveOptionsicon = '<div class="dropdown">';
                perspectiveOptionsicon += '<button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">';
                perspectiveOptionsicon += '<span class="icon"><img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg"></span>';
                perspectiveOptionsicon += '</button>';
                perspectiveOptionsicon += '<ul class="dropdown-menu dropdown-menu-end border-0 shadow" style="position: relative; overflow: auto; width: 100%;">';

                if (objectivecreatepermission == true) {
                    perspectiveOptionsicon += '<li><a class="dropdown-item" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="handleObjectiveEvent(\'0\', \'add\', ' + scorecard.id + ')" data-i18n="Add" >'+addTextHeader+'</a></li>';
                }
                if (perspectiveeditpermission == true) {
                    perspectiveOptionsicon += '<li><a class="dropdown-item" data-toggle="modal" data-target=".perspectives_description_popup" class="perspectivedescription" onclick="handlePerspectiveEvent(' + scorecard.id + ', \'edit\')" data-i18n="Edit" >'+editTextHeade+'</a></li>';
                }
                if (perspectiveviewpermission == true) {
                    perspectiveOptionsicon += '<li><a class="dropdown-item" data-toggle="modal" data-target=".perspectives_description_popup" class="perspectivedescription" onclick="handlePerspectiveEvent(' + scorecard.id + ', \'view\')" data-i18n="View" >'+viewTextHeader+'</a></li>';
                }

                perspectiveOptionsicon += '</ul></div>';
            }

            // Scorecard status light
            var scorecardStatuslight = "text-bg-secondary";
            var scorecardStatusvalueofweight = scorecard.scoreCardValue.thresholdResult;

            if (
                scorecard.scoreCardValue.statusLight != undefined &&
                scorecard.scoreCardValue.statusLight != ""
            ) {
                var statusLightValue = scorecard.scoreCardValue.statusLight.toLowerCase().split(" ")[0];
                if (statusLightValue == "yellow") scorecardStatuslight = "text-bg-warning";
                else if (statusLightValue == "green") scorecardStatuslight = "text-bg-success";
                else if (statusLightValue == "red") scorecardStatuslight = "text-bg-danger";
            }

            // Build dynamic table header with proper width handling
            let tableHeader = "<thead><tr>";

            // Always visible columns
            tableHeader += '<th class="sorting_disabled statusHeader" style="width: 60px;" >'+statusHeader+'</th>';           // Status
            if (typeValue) {
               tableHeader += '<th class="sorting_disabled text-center scoreHeader" style="width: 60px;">Type</th>';
            }
            tableHeader += '<th class="sorting_disabled idHeader" style="width: 70px;" data-translate="page.scorecard.scorecardListItems.id">'+idHeader+'</th>';               // ID
            tableHeader += '<th class="sorting_disabled nameHeader" style="width: 260px;" data-translate="page.scorecard.scorecardListItems.name">'+nameHeader+'</th>';            // Name (set to 260px)
            tableHeader += '<th class="sorting_disabled text-center periodHeader" style="width: 80px;" data-translate="page.scorecard.scorecardListItems.period">'+periodHeader+'</th>'; // Period

            // Conditional columns
            if (scorecardscore) {
                tableHeader += '<th class="sorting_disabled text-center scoreHeader" style="width: 60px;" data-translate="page.scorecard.scorecardListItems.score">'+scoreHeader+'</th>';
            }
            if (scorecardtrend) {
                tableHeader += '<th class="sorting_disabled text-center trendHeader" style="width: 60px;" data-translate="page.scorecard.scorecardListItems.trend">'+trendHeader+'</th>';
            }
            if (scorecardbaseline) {
                tableHeader += '<th class="sorting_disabled text-center baselineHeader" style="width: 70px;" data-translate="page.scorecard.scorecardListItems.baseline">'+baselineHeader+'</th>';
            }
            if (scorecardactual) {
                tableHeader += '<th class="sorting_disabled text-center actualHeader" style="width: 90px;" data-translate="page.scorecard.scorecardListItems.actual">'+actualHeader+'</th>';
            }
            if (scorecardtarget) {
                tableHeader += '<th class="sorting_disabled text-center targetHeader" style="width: 90px;" data-translate="page.scorecard.scorecardListItems.target">'+targetHeader+'</th>';
            }
            if (scorecardbudget) {
                tableHeader += '<th class="sorting_disabled text-center budgetHeader" style="width: 90px;" data-translate="page.scorecard.scorecardListItems.budget">'+budgetHeader+'</th>';
            }
            if (scorecardforecast) {
                tableHeader += '<th class="sorting_disabled text-center forecastHeader" style="width:  90px;" data-translate="page.scorecard.scorecardListItems.forecast">'+forecastHeader+'</th>';
            }
            if (scorecarddecline) {
                tableHeader += '<th class="sorting_disabled text-center declineHeader" style="width: 90px;" data-translate="page.scorecard.scorecardListItems.decline">'+declineHeader+'</th>';
            }
            if (scorecardrisk) {
                tableHeader += '<th class="sorting_disabled text-center riskHeader" style="width: 60px;">'+riskHeader+'</th>';
            }

            tableHeader += '<th class="sorting_disabled actionHeader text-center" style="width: 90px;" >'+actionHeader+'</th>';
            tableHeader += "</tr></thead>";

            // Build table body
            let tableBody = "<tbody>";
            var objectiveActualTotal = 0;

            if (scorecard.objectiveList && scorecard.objectiveList.length > 0) {
                $.each(scorecard.objectiveList, function (objIndex, objective) {
                    console.log(objective, "objectiveData")
                    let total = 0; 
                  //objectiveActualTotal
                  if (objective.kpiList && objective.kpiList.length > 0) {

                      $.each(objective.kpiList, function (kpiIndex, kpi) {

                          // ---- ADD MAIN KPI ACTUAL ----
                          if (kpi.kpiValue && kpi.kpiValue.actual != null && kpi.kpiValue.actual !== "") {

                              let mainActual = cleanActualValue(kpi.kpiValue.actual);
                              total += mainActual;
                          }

                          // ---- ADD SUBKPI ACTUALS ----
                          if (kpi.subKpiList && kpi.subKpiList.length > 0) {
                              $.each(kpi.subKpiList, function (subIndex, sub) {

                                  if (sub.subKpiValue && sub.subKpiValue.actual != null && sub.subKpiValue.actual !== "") {

                                      let subActual = cleanActualValue(sub.subKpiValue.actual);
                                      total += subActual;
                                  }

                              });
                          }

                      });

                  }

                  objectiveActualTotal = total;

                  console.log(objectiveActualTotal, "ojjjjjjjjjjjjj");


                  function cleanActualValue(val) {

                      if (val == null || val == undefined || val == "") return 0;

                      // convert to string always
                      val = val.toString().trim();

                      // remove % sign
                      val = val.replace("%", "");

                      // remove commas 2,587.5 → 2587.5
                      val = val.replace(/,/g, "");

                      // convert to float
                      let num = parseFloat(val);

                      // if conversion fails → return 0
                      return isNaN(num) ? 0 : num;
                  }

                  //objectiveActualTotal
                  console.log(objective,objIndex,  "objective");
                    // Objective options icon
                    var objectiveOptionsicon = "";
                    if (
                        !(
                            kpicreatepermission == false &&
                            objectiveeditpermission == false &&
                            objectiveviewpermission == false &&
                            objectivedeletepermission == false
                        )
                    ) {
                        objectiveOptionsicon = '<div class="table-actions justify-content-end">';
                        objectiveOptionsicon += '<a href="#subkpi-view-modal" data-toggle="modal" data-target=".objective_description_popup" onclick="handleObjectiveEvent(' + objective.id + ', \'view\', ' + scorecard.id + ')" type="button" class="btn btn-sm btn-icon">';
                        objectiveOptionsicon += '<span class="icon"><img src="/stratroom/images/info-i.svg" width="12" height="12"></span></a>';

                        objectiveOptionsicon += '<div class="dropdown">';
                        objectiveOptionsicon += '<button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">';
                        objectiveOptionsicon += '<span class="icon"><img width="12" height="12" src="/stratroom/images/menu-dot-vertical-i.svg"></span></button>';
                        objectiveOptionsicon += '<ul class="dropdown-menu dropdown-menu-end border-0 shadow" style="position: relative; overflow: auto; width: 100%;">';

                        if (kpicreatepermission == true) {
                            objectiveOptionsicon += '<li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target=".kpi_description_popup" onclick="handleKpiEvent(\'0\', \'add\', ' + objective.id + ')" >'+addTextHeader+'</a></li>';
                        }
                        if (objectiveeditpermission == true) {
                            objectiveOptionsicon += '<li><a class="dropdown-item" data-toggle="modal" data-target=".objective_description_popup" onclick="handleObjectiveEvent(' + objective.id + ', \'edit\', ' + scorecard.id + ')" >'+editTextHeade+'</a></li>';
                        }
                        if (objectiveviewpermission == true) {
                            objectiveOptionsicon += '<li><a class="dropdown-item" data-toggle="modal" data-target=".objective_description_popup" onclick="handleObjectiveEvent(' + objective.id + ', \'view\', ' + scorecard.id + ')" >'+viewTextHeader+'</a></li>';
                        }
                        if (objectivedeletepermission == true) {
                            objectiveOptionsicon += '<li><a class="dropdown-item" href="#" onclick="handleObjectiveEvent(' + objective.id + ', \'delete\', ' + scorecard.id + ')" >'+deleteTextHeader+'</a></li>';
                        }

                        objectiveOptionsicon += '</ul></div></div>';
                    }

                    // Status Light for Objective
                    var objstatusLight = '<img src="/stratroom/images/flag-default.svg" width="16" height="16">';
                    if (objective.objectivesValue && objective.objectivesValue.statusLight) {
                      console.log(objective, "objectivelist");
                        var status = objective.objectivesValue.statusLight.split(" ")[0].toLowerCase();
                        console.log(status, "status");
                        var statusValue = "red"
                        if(status == "red" || status == "lightred"){
                          statusValue = "flag-red-i"
                        }else if(status == "green" || status == "lightgreen"){
                          statusValue = "flag-green-i"
                        }else if(status == "yellow" || status == "lightyellow"){
                          statusValue = "flag-yellow-i"
                        }
                       
                        objstatusLight = '<img src="/stratroom/images/' + statusValue + '.svg" width="16" height="16">';
                    }

                    // Threshold Result
                    var objthresholdResult = "";
                    if (objective.objectivesValue.thresholdResult != undefined && scorecardscore) {
                        objthresholdResult = objective.objectivesValue.thresholdResult;
                    }

                    // Build Objective Row
                    let objRow = "<tr class=\"child-of-financial level-0 odd\">";
                    objRow += "<td width=\"60\"><div class=\"d-flex justify-content-end gap-2\">" + objstatusLight + "</div></td>";
                    // if (scorecardscore) objRow += "<td width=\"60\" class=\"text-center\">" + objthresholdResult + "</td>";
                     if (typeValue) objRow += "<td width=\"60\"><div class=\"d-flex justify-content-end gap-2\">" + (objective.typeValue ? objective.typeValue : "") + "</div></td>";
                    objRow += "<td width=\"70\">" + (objective.objectiveId || "") + "</td>";
                    objRow += "<td width=\"260\" >" + objective.objectivesValue.name + "</td>";
                    objRow += "<td width=\"80\" class=\"text-center\"></td>";

                    if (scorecardscore) objRow += "<td width=\"60\" class=\"text-center\">" + objthresholdResult + "</td>";
                    if (scorecardtrend) objRow += "<td width=\"60\" class=\"text-center\"></td>";
                    if (scorecardbaseline) objRow += "<td width=\"70\" class=\"text-center\"></td>";
                    if (scorecardactual) objRow += "<td width=\"90\" class=\"text-center\"></td>";
                    if (scorecardtarget) objRow += "<td width=\"90\" class=\"text-center\"></td>";
                    if (scorecardbudget) objRow += "<td width=\"90\" class=\"text-center\"></td>";
                    if (scorecardforecast) objRow += "<td width=\"90\" class=\"text-center\"></td>";
                    if (scorecarddecline) objRow += "<td width=\"90\" class=\"text-center\"></td>";
                    if (scorecardrisk) objRow += "<td width=\"60\" class=\"text-center\"></td>";

                    objRow += "<td width=\"90\">" + objectiveOptionsicon + "</td>";
                    objRow += "</tr>";
                    tableBody += objRow;

                    // Process KPIs
                    if (objective.kpiList && objective.kpiList.length > 0) {
                        $.each(objective.kpiList, function (kpiIndex, kpi) {
                            var hasSubKpi = kpi.subKpiList != undefined && kpi.subKpiList.length > 0;

                            // KPI Data
                            var kpiActual = (kpi.kpiValue.actual != undefined ? kpi.kpiValue.actual : "0");
                            var kpiTarget = (kpi.kpiValue.target != undefined ? kpi.kpiValue.target : "");
                            var pageno = $("#pagenumber").val();

                            var targetcurrency = kpi.kpiValue.targetCurrency || "";
                            var actutalcurrency = kpi.kpiValue.actualCurrency || "";
                            targetcurrency = targetcurrency || (kpi.kpiValue.kpiCurrency || "");
                            actutalcurrency = actutalcurrency || (kpi.kpiValue.kpiCurrency || "");

                            kpiActual = actutalcurrency + kpiActual;
                            if (kpi.kpiValue.dataType == "Percentage" && !kpiTarget.includes("%")) {
                                kpiTarget += "%";
                            }
                            kpiTarget = targetcurrency + kpiTarget;

                            // KPI Options
                            var kpiOptionsicon = "";
                            if (
                                !(
                                    subkpicreatepermission == false &&
                                    kpieditpermission == false &&
                                    kpiviewpermission == false &&
                                    kpideletepermission == false
                                )
                            ) {
                                kpiOptionsicon = '<div class="table-actions justify-content-center">';
                                kpiOptionsicon += '<a  data-bs-toggle="modal" type="button" class="btn btn-sm btn-icon" onclick="loadDataAndGeneratePDFCard(' + kpi?.id + ', \'' + (kpi?.kpiValue?.name ?? '') + '\', \'' + (kpi?.kpiValue?.actual ?? '') + '\', \'' + (kpi?.kpiValue?.target ?? '') + '\', \'' + (kpi?.kpiValue?.kpi_measurement ?? '') + '\' , \'' + (objective?.objectivesName ?? '') + '\' , \'' + (scorecard.scoreCardValue.name ?? '') + '\', \'' + (kpi?.kpiValue?.trend ?? '' ) + '\' , \'' + (kpi?.kpiValue?.dataType ?? '') + '\' , \'' + (kpi?.kpiValue?.thresholdFormula ?? '') + '\' , \'' + (kpi?.kpiValue?.ownerName ?? '') + '\' , \'' + (kpi?.kpiValue?.weight ?? '') + '\' , \'' + (kpi?.kpiValue?.subweight ?? '') + '\' , \'' + (kpi?.kpiValue?.polarity ?? '') + '\',  \'' + (kpi?.kpiValue?.contribution ?? '') + '\')"><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="file-text" style="width: 16px; height: 16px;" class="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg></span></a>';
                                kpiOptionsicon += '<a href="#kpi-story-card-modal" data-bs-toggle="modal" type="button" class="btn btn-sm btn-icon" onclick="handleStoryCardEvent(' + kpi?.id + ', \'' + (kpi?.kpiValue?.name ?? '') + '\', \'' + (kpi?.kpiValue?.actual ?? '') + '\', \'' + (kpi?.kpiValue?.target ?? '') + '\', \'' + (kpi?.kpiValue?.kpi_measurement ?? '') + '\' , \'' + (objective?.objectivesName ?? '') + '\')"><span class="icon"><img src="/stratroom/images/link-i.svg" width="12" height="12"></span></a>';
                                kpiOptionsicon += '<a href="#subkpi-view-modal" data-toggle="modal" onclick="handleKpiEvent(' + kpi.id + ', \'view\', ' + objective.id + ')" type="button" class="btn btn-sm btn-icon"><span class="icon"><img src="/stratroom/images/info-i.svg" width="12" height="12"></span></a>';
                                kpiOptionsicon += '<div class="dropdown"><button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"><span class="icon"><img width="12" height="12" src="/stratroom/images/menu-dot-vertical-i.svg"></span></button><ul class="dropdown-menu dropdown-menu-end border-0 shadow">';

                                if (subkpicreatepermission == true) {
                                    kpiOptionsicon += '<li><a class="dropdown-item" href="#subkpi-add-modal" data-bs-toggle="modal" onclick="handleSubKpiEvent(' + kpi.id + ', \'add\', ' + objective.id + ')" >'+addTextHeader+'</a></li>';
                                }
                                if (kpieditpermission == true) {
                                    kpiOptionsicon += '<li><a class="dropdown-item" href="#kpi-edit-modal" data-bs-toggle="modal" onclick="handleKpiEvent(' + kpi.id + ', \'edit\', ' + objective.id + ')" >'+editTextHeade+'</a></li>';
                                }
                                if (kpiviewpermission == true) {
                                    kpiOptionsicon += '<li><a class="dropdown-item" href="#kpi-view-modal" data-bs-toggle="modal" onclick="handleKpiEvent(' + kpi.id + ', \'view\', ' + objective.id + ')" >'+viewTextHeader+'</a></li>';
                                }
                                if (kpideletepermission == true) {
                                    kpiOptionsicon += '<li><a class="dropdown-item" href="#" onclick="handleKpiEvent(' + kpi.id + ', \'delete\', ' + objective.id + ')" >'+deleteTextHeader+'</a></li>';
                                }

                                kpiOptionsicon += '</ul></div></div>';
                            }

                            // KPI Status Light
                            var kpiStatusLight = '<img src="/stratroom/images/flag-green-i.svg" width="16" height="16">';
                            if (kpi.kpiValue.statusLight) {
                                var kpistatusValue = "red"
                                var kpicolor = kpi.kpiValue.statusLight.split(" ")[0];
                                console.log(kpicolor, "kpicolor");
                                if(kpicolor == "lightred" || kpicolor=="red"){
                                  kpistatusValue = "flag-red-i"
                                }else if(kpicolor == "lightgreen" || kpicolor == "green"){
                                  kpistatusValue = "flag-green-i"
                                }else if(kpicolor == "lightyellow" || kpicolor == "yellow"){
                                   kpistatusValue = "flag-yellow-i"
                                }
                                kpiStatusLight = '<img src="/stratroom/images/' + kpistatusValue + '.svg" width="16" height="16">';
                            }

                            const trendImageUrls = {
                                  up: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/up-i.png",
                                  down: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/down-i.png",
                              };
                            // Threshold, Trend, Risk
                            var kpithresholdResult = kpi.kpiValue.thresholdResult || "";
                            // var trendValue = kpi.kpiValue.trend ? '<img src="/stratroom/images/' + kpi.kpiValue.trend.toLowerCase() + '.svg" width="12" height="12">' : "";
                            // normalize trend value
                            let trendDirection = "";
                            if (kpi.kpiValue.trend && kpi.kpiValue.trend.toLowerCase().includes("up")) {
                                trendDirection = "up";
                            } else if (kpi.kpiValue.trend && kpi.kpiValue.trend.toLowerCase().includes("down")) {
                                trendDirection = "down";
                            }

                            let trendValue = trendDirection 
                                ? `<img src="${trendImageUrls[trendDirection]}" width="24" height="24">`
                                : "";

                            console.log(trendValue, "trendValue");
                            var riskStatusLight = kpi.kpiValue.riskStatusLight
                                ? '<a href="/stratroom/risks?kpiId=' + kpi.id + '&kpiRiskView=true"><img src="/stratroom/images/' + kpi.kpiValue.riskStatusLight.toLowerCase() + '.svg" width="16" height="16"></a>'
                                : "";

                            // Build KPI Row
                            let kpiRow = "<tr class=\"level-1\">";
                            let toggleIcon = hasSubKpi ? '<i class="fas fa-plus toggle-icon" data-target="kpi-' + kpi.id + '"></i>' : "";
                            kpiRow += "<td width=\"60\"><div class=\"d-flex justify-content-end gap-2\">" + toggleIcon + " " + kpiStatusLight + "</div></td>";
                             if (typeValue) kpiRow += "<td width=\"70\">" + (kpi?.kpiValue?.kpiRole ? kpi?.kpiValue?.kpiRole : "") + "</td>";
                            kpiRow += "<td width=\"70\">" + (kpi.kpiId || "") + "</td>";
                            kpiRow += "<td width=\"260\" >" + "<a href=\"/stratroom/kpiView?kpiId=" + kpi.id +  "&flagtype=kpi&scoreCardId=" + scorecard.id + "&objectiveId=" + objective.id + "&pageId=" + pageno + "\">" + kpi.kpiValue.name + "</a>" + "</td>";
                            kpiRow += "<td width=\"80\" class=\"text-center\">" + (kpi.kpiValue.kpi_measurement || "") + "</td>";

                            if (scorecardscore) kpiRow += "<td width=\"60\" class=\"text-center\">" + kpithresholdResult + "</td>";
                            if (scorecardtrend) kpiRow += "<td width=\"60\" class=\"text-center\">" + trendValue + "</td>";
                            if (scorecardbaseline) kpiRow += "<td width=\"70\" class=\"text-center\"></td>";
                            if (scorecardactual) kpiRow += "<td width=\"90\" class=\"text-center\">" + kpiActual + "</td>";
                            if (scorecardtarget) kpiRow += "<td width=\"90\" class=\"text-center\">" + kpiTarget + "</td>";
                            if (scorecardbudget) kpiRow += "<td width=\"90\" class=\"text-center\"></td>";
                            if (scorecardforecast) kpiRow += "<td width=\"90\" class=\"text-center\"></td>";
                            if (scorecarddecline) kpiRow += "<td width=\"90\" class=\"text-center\"></td>";
                            if (scorecardrisk) kpiRow += "<td width=\"60\" class=\"text-center\">" + riskStatusLight + "</td>";

                            kpiRow += "<td width=\"90\">" + kpiOptionsicon + "</td>";
                            kpiRow += "</tr>";
                            tableBody += kpiRow;

                            // Sub-KPIs
                            if (kpi.subKpiList && kpi.subKpiList.length > 0) {
                                $.each(kpi.subKpiList, function (subKpiIndex, subKpi) {
                                    var subKpiActual = subKpi.subKpiValue.actual || "";
                                    var subKpiTarget = subKpi.subKpiValue.target || "";
                                    var pageno = $("#pagenumber").val();

                                    var targetcurrency = subKpi.subKpiValue.targetCurrency || "";
                                    var actutalcurrency = subKpi.subKpiValue.actualCurrency || "";
                                    targetcurrency = targetcurrency || (subKpi.subKpiValue.kpiCurrency || "");
                                    actutalcurrency = actutalcurrency || (subKpi.subKpiValue.kpiCurrency || "");

                                    subKpiActual = actutalcurrency + subKpiActual;
                                    if (subKpi.subKpiValue.dataType == "Percentage" && !subKpiTarget.includes("%")) {
                                        subKpiTarget += "%";
                                    }
                                    subKpiTarget = targetcurrency + subKpiTarget;

                                    // Sub-KPI Options
                                    var subKpiOptionsicon = "";
                                    if (!(kpieditpermission == false && kpiviewpermission == false && kpideletepermission == false)) {
                                        subKpiOptionsicon = '<div class="table-actions justify-content-end">';
                                        subKpiOptionsicon += '<a href="#kpi-story-card-modal" data-bs-toggle="modal" type="button" class="btn btn-sm btn-icon"><span class="icon"><img src="/stratroom/images/link-i.svg" width="12" height="12"></span></a>';
                                        subKpiOptionsicon += '<a href="#subkpi-view-modal" data-toggle="modal" data-target=".updateSubkpi_description_popup" onclick="handleEditSubKpiEvent(' + subKpi.id + ', \'view\', ' + objective.id + ')" type="button" class="btn btn-sm btn-icon"><span class="icon"><img src="/stratroom/images/info-i.svg" width="12" height="12"></span></a>';
                                        subKpiOptionsicon += '<div class="dropdown"><button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"><span class="icon"><img width="12" height="12" src="/stratroom/images/menu-dot-vertical-i.svg"></span></button><ul class="dropdown-menu dropdown-menu-end border-0 shadow">';

                                        if (kpieditpermission == true) {
                                            subKpiOptionsicon += '<li><a class="dropdown-item" data-toggle="modal" data-target=".updateSubkpi_description_popup" onclick="handleEditSubKpiEvent(' + subKpi.id + ', \'edit\', ' + objective.id + ', ' + subKpi.kpiId + ')">Edit</a></li>';
                                        }
                                        if (kpiviewpermission == true) {
                                            subKpiOptionsicon += '<li><a class="dropdown-item" data-toggle="modal" data-target=".updateSubkpi_description_popup" onclick="handleEditSubKpiEvent(' + subKpi.id + ', \'view\', ' + objective.id + ')">View</a></li>';
                                        }
                                        if (kpideletepermission == true) {
                                            subKpiOptionsicon += '<li><a class="dropdown-item" href="#" onclick="handledeleteSubKpi(' + subKpi.id + ', \'delete\')">Delete</a></li>';
                                        }

                                        subKpiOptionsicon += '</ul></div></div>';
                                    }

                                    // Sub-KPI Status, Trend, Risk
                                    var subkpiStatusLight = '<img src="/stratroom/images/flag-green-i.svg" width="16" height="16">';
                                        if (kpi.kpiValue.statusLight) {
                                // var kpicolor = kpi.kpiValue.statusLight.split(" ")[0];
                                var suKpiStatusValue = "red"
                                 var subkpicolor = subKpi.subKpiValue.statusLight.split(" ")[0];
                                console.log(subkpicolor, "subkpicolor");
                                if(subkpicolor == "lightred" || subkpicolor=="red"){
                                  suKpiStatusValue = "flag-red-i"
                                }else if(subkpicolor == "lightgreen" || subkpicolor == "green"){
                                  suKpiStatusValue = "flag-green-i"
                                }else if(subkpicolor == "lightyellow" || subkpicolor == "yellow"){
                                   suKpiStatusValue = "flag-yellow-i"
                                }
                                subkpiStatusLight = '<img src="/stratroom/images/' + suKpiStatusValue + '.svg" width="16" height="16">';
                            }
                                   
                                    
                                    var subKpithresholdResult = subKpi.subKpiValue.thresholdResult || "";
                                    var subTrendValue = subKpi.subKpiValue.trend ? '<img src="/stratroom/images/' + subKpi.subKpiValue.trend.toLowerCase() + '.svg" width="12" height="12">' : "";
                                    var subRiskStatusLight = subKpi.subKpiValue.riskStatusLight
                                        ? '<a href="/stratroom/risks?kpiId=' + subKpi.id + '&kpiRiskView=true"><img src="/stratroom/images/' + subKpi.subKpiValue.statusLight.toLowerCase() + '.svg" width="16" height="16"></a>'
                                        : "";

                                    // Build Sub-KPI Row
                                    let subKpiRow = "<tr class=\"level-2 kpi-" + kpi.id + "-child\" style=\"display:none;\">";
                                    subKpiRow += "<td width=\"60\"><div class=\"d-flex justify-content-end gap-2\">"+subkpiStatusLight+"</td>";
                                    if (typeValue) subKpiRow += "<td width=\"70\">" + (subKpi?.typeValue ? subKpi?.typeValue : "") + "</td>";
                                    subKpiRow += "<td width=\"70\">" + (subKpi.subKpiId || "") + "</td>";
                                    subKpiRow += "<td width=\"260\" >" + subKpi.subKpiValue.subMeasureName + "</td>";
                                    subKpiRow += "<td width=\"80\" class=\"text-center\">" + (subKpi.subKpiValue.kpi_measurement || "") + "</td>";

                                    if (scorecardscore) subKpiRow += "<td width=\"60\" class=\"text-center\">" + subKpithresholdResult + "</td>";
                                    if (scorecardtrend) subKpiRow += "<td width=\"60\" class=\"text-center\">" + subTrendValue + "</td>";
                                    if (scorecardbaseline) subKpiRow += "<td width=\"70\" class=\"text-center\"></td>";
                                    if (scorecardactual) subKpiRow += "<td width=\"90\" class=\"text-center\">" + subKpiActual + "</td>";
                                    if (scorecardtarget) subKpiRow += "<td width=\"90\" class=\"text-center\">" + subKpiTarget + "</td>";
                                    if (scorecardbudget) subKpiRow += "<td width=\"90\" class=\"text-center\"></td>";
                                    if (scorecardforecast) subKpiRow += "<td width=\"90\" class=\"text-center\"></td>";
                                    if (scorecarddecline) subKpiRow += "<td width=\"90\" class=\"text-center\"></td>";
                                    if (scorecardrisk) subKpiRow += "<td width=\"60\" class=\"text-center\">" + subRiskStatusLight + "</td>";

                                    subKpiRow += "<td width=\"90\">" + subKpiOptionsicon + "</td>";
                                    subKpiRow += "</tr>";
                                    tableBody += subKpiRow;
                                });
                            }
                        });
                    }
                });
            }
            tableBody += "</tbody>";

            // Final HTML for tab
            let finalHtml = "";
            finalHtml += '<div class="card custom-card table-card">';
            finalHtml += '<div class="card-header">';
            finalHtml += '<div class="c-header-left">';
            finalHtml += '<span class="badge ' + scorecardStatuslight + '">' + (scorecardStatusvalueofweight ? scorecardStatusvalueofweight : "0%") + '</span>';
            finalHtml += '<h5 class="card-title me-auto"><strong>' + scorecard.scoreCardValue.name + '</strong></h5>';
            finalHtml += '</div>';
            finalHtml += '<div class="card-actions">' + perspectiveOptionsicon + '</div>';
            finalHtml += '</div>';
            finalHtml += '<div class="card-body" style="overflow: auto;">';
            finalHtml += '<div id="table-financial_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer" style="margin-left: -10px;">';
            finalHtml += '<div class="row"><div class="col-sm-12 col-md-6"></div><div class="col-sm-12 col-md-6"></div></div>';
            finalHtml += '<div class="row dt-row"><div class="col-sm-12">';
            finalHtml += '<div class="dataTables_scroll" style="margin-right: 7px;">';
            finalHtml += '<div class="dataTables_scrollHead" >';
            finalHtml += '<div class="dataTables_scrollHeadInner" style="box-sizing: content-box; width: 100%; padding-left: 0.5rem;">';  
            finalHtml += '<table class="table table-bordered w-100 dataTable no-footer" id="table-' + tablePrefix + '" style="margin-left: 0px; width: 100%;">';
            finalHtml += tableHeader;
            finalHtml += '</table>';
            finalHtml += '</div>';
            finalHtml += '</div>';
            finalHtml += '<div class="dataTables_scrollBody" style="position: relative; width: 100%;">';
            finalHtml += '<table class="table table-bordered w-100 dataTable no-footer" id="table-' + tablePrefix + '" style="margin-left: 8px;">';
            finalHtml += tableBody;
            finalHtml += '</table>';
            finalHtml += '</div>';
            finalHtml += '</div></div></div></div></div></div>';

            $currentTab.html(finalHtml);

            // Initialize DataTable with fixed columns
            setTimeout(() => {
                initializeDataTable('#table-' + tablePrefix);
            }, 300);
        });
    }

    // Show first tab
    if ($tabList.find("button").length > 0) {
        $tabList.find("button:first-child").tab("show");
    }

    // Toggle sub-KPIs
    $(document).on("click", ".toggle-icon", function () {
        let target = $(this).data("target");
        let $childRows = $("." + target + "-child");

        if ($(this).hasClass("fa-plus")) {
            $(this).removeClass("fa-plus").addClass("fa-minus");
            $childRows.show();
        } else {
            $(this).removeClass("fa-minus").addClass("fa-plus");
            $childRows.hide();
        }
    });

    // Preference handling
    var pageId = $("#pagenumber").val();
    $('.standard_multi-column-dropdown input[type="checkbox"]').click(function () {
        var inputValue = $(this).attr("value");
        var checkedProp = $(this).is(":checked");
        inputValue = inputValue.replaceallstring();
        scoreempPreference["pageName"] = "SCORECARD";
        scoreempPreference["pageId"] = pageId;
        scoreempPreference["preferences"][inputValue] = checkedProp;
        $.ajax({
            url: "/stratroom/employeePreference",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(scoreempPreference),
            success: function (data, status) {},
            error: readErrorMsg,
        });
        $("." + inputValue).toggle();
    });

    $(".standard_dropdown-hide").on("click", function (e) {
        e.stopPropagation();
    });
}






var idHeader = "ID";
var nameHeader = "Name";
var periodHeader = "Period";
var scoreHeader = "Score";
var trendHeader = "Trend";
var baselineHeader = "Baseline"; 
var actualHeader = "Actual";
var targetHeader = "Target";
var budgetHeader = "Strech";
var forecastHeader = "Stable";
var declineHeader = "Shrink";
var riskHeader = "Risk";
var actionHeader = "Actions";
var addTextHeader = "Add";
var editTextHeade = "Edit";
var viewTextHeader = "View";
var deleteTextHeader = "Delete";
function fetchScordcardData() {
  
  var storedLanguage = localStorage.getItem("selectedLang") || "en";
if (storedLanguage == "en") {
  $(".statusHeader").text("Status");
  statusHeader = "Status";
  idHeader = "ID";
  nameHeader = "Name";
  periodHeader = "Period";
  scoreHeader = "Score";
  trendHeader = "Trend";
  baselineHeader = "Baseline";
  actualHeader = "Actual";
  targetHeader = "Target";
  riskHeader = "Risk";
  actionHeader = "Actions";
  addTextHeader = "Add";
  editTextHeade = "Edit";
  viewTextHeader = "View";
  deleteTextHeader = "Delete";
  budgetHeader = "Strech";
  forecastHeader = "Stable";
  declineHeader = "Shrink";

} else if (storedLanguage == "am") {
  $(".statusHeader").text("ሁኔታ");
  statusHeader = "ሁኔታ";
  idHeader = "መለያ";
  nameHeader = "ስም";
  periodHeader = "ጊዜ መወዳደሪያ";
  scoreHeader = "ነጥብ";
  trendHeader = "ዝንባሌ";
  baselineHeader = "መሠረት";
  actualHeader = "እውነተኛ ዋጋ";
  targetHeader = "ዓላማ";
  riskHeader = "አደጋ";
  actionHeader = "እርምጃዎች";
  addTextHeader = "ጨምር";
  editTextHeade = "አርትዕ";
  viewTextHeader = "እይታ";
  deleteTextHeader = "ሰርዝ";
  budgetHeader = "እድገት";
  forecastHeader = "ቀላል እይታ";
  declineHeader = "እድል መቀነስ";

} else {
  $(".statusHeader").text("الحالة");
  statusHeader = "الحالة";
  idHeader = "المعرف";
  nameHeader = "الاسم";
  periodHeader = "الفترة";
  scoreHeader = "النتيجة";
  trendHeader = "الاتجاه";
  baselineHeader = "الأساسي";
  actualHeader = "القيمة الفعلية";
  targetHeader = "الهدف";
  riskHeader = "المخاطر";
  actionHeader = "الإجراءات";
  addTextHeader = "إضافة";
  editTextHeade = "تعديل";
  viewTextHeader = "عرض";
  deleteTextHeader = "حذف";
  budgetHeader = "النمو";
  forecastHeader = "المحافظ";
  declineHeader = "انخفاض";
}

  console.log(storedLanguage, "storedLanguagestoredLanguage");
  loadLanguage(storedLanguage);
  var pageno = $("#pagenumber").val();
  var pageEmpId = $("#pageEmpId").val();
  if ($("#ischeckemployeeurlornot").val() == "EMPLOYEE") {
    pageno = $("#defaultpagenumber").val();
    pageEmpId = empId;

    var customscore = localStorage.getItem("custom_scorecardliId");
    if (customscore != "" && customscore != null && customscore != undefined) {
      $(".scorecard-dropdown li a").each(function (key, value) {
        var lastvalue = $(this).attr("data-value");
        if (lastvalue == customscore) {
          pageno = customscore;
          $(".scorecardnamecontent").css("display", "block");
          $(".scorecardnamevalue").text($(this).text());
          $(this).addClass("active");
        }
      });
    }
  }

  var datePeriod = $("#datePeriod").val();


  
  // function formatDatePeriod(input) {
  //     console.log(input, "input");
      
      
  //     const parts = input.split('-').map(part => part.trim());
  //     console.log(parts, "parts");
      
      
  //     const parseDate = (dateStr) => {
  //         const [monthStr, yearStr] = dateStr.split(',').map(s => s.trim());
  //         const month = new Date(`${monthStr} 1, ${yearStr}`).getMonth();
  //         const year = parseInt(yearStr, 10);
  //         return { month, year };
  //     };
      
    
  //     const start = parseDate(parts[0]);
  //     const startMonth = (start.month + 1).toString().padStart(2, '0');
  //     const startDay = '01';
  //     const startYear = start.year;
      
    
  //     const end = parseDate(parts[1]);
  //     const endMonth = (end.month + 1).toString().padStart(2, '0');
  //     const endDay = new Date(end.year, end.month + 1, 0).getDate();
  //     const endYear = end.year;

  //     console.log(startMonth, startDay, startYear, endMonth, endDay, endYear, "formattedDatePeriod");
      
  //     return `${startMonth}/${startDay}/${startYear} - ${endMonth}/${endDay}/${endYear}`;
  // }


  // const datePeriod = formatDatePeriod(formattedDatePeriod);

  // console.log(datePeriod,formattedDatePeriod,  "datePerioddatePeriod");
  var frequency = localStorage.getItem("customperiod");
  var pageUrl = "";
  if (pageno != undefined && frequency != null && frequency != "") {
    console.log("1278");
    console.log(pageno);
    pageUrl =
      "/stratroom/scoreCardList?pageId=" +
      pageno +
      "&empId=" +
      parseInt(pageEmpId) +
      "&datePeriod=" +
      datePeriod +
      "&frequency=" +
      frequency;
  } else if (pageno != undefined && (frequency == null || frequency == "")) {
    pageUrl =
      "/stratroom/scoreCardList?pageId=" +
      pageno +
      "&empId=" +
      parseInt(pageEmpId) +
      "&datePeriod=" +
      datePeriod;
  } else {
    pageUrl =
      "/stratroom/scoreCardList?pageId=" + pageno + "&datePeriod=" + datePeriod;
  }

  if (pageno != "") {
    $(".exceldownloadlink").attr(
      "href",
      "/stratroom/downloadScoreCard?pageId=" +
        pageno +
        "&empId=" +
        parseInt(pageEmpId) +
        "&datePeriod=" +
        datePeriod
    );
  } else {
    $(".exceldownloadlink").attr("href", "#");
    $(".exceldownloadlink").removeAttr("target");
  }

  $.ajax({
    url: pageUrl,
    async: false,
    success: scordcardSuccessCallbackk,
    error: function (response) {
      if (response.status == "404") {
        console.log("Error code: 404");
        var getscorecardpagename =
          localStorage.getItem("defaultscorecardpagename") != null &&
          localStorage.getItem("defaultscorecardpagename") != undefined
            ? localStorage.getItem("defaultscorecardpagename")
            : "Scorecard";
        var perspectiveObj = {
          scorecardName: getscorecardpagename,
          owner: empId,
          pageId: pageno,
          scoreCardDetailsValue: {
            scoreCardName: getscorecardpagename,
            score_card_start_end_date: $("#datePeriod").val(),
          },
        };
        console.log(pageno);
        var systemip = localStorage.getItem("systemip");
        var super_empid = $("#userPrincipal").val();
        var data = {
          createdBy: super_empid,
          userId: empId,
          action: "Standard BSC Accessed",
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
        $.ajax({
          url: "/stratroom/scorecardDetails",
          type: "post",
          contentType: "application/json",
          data: JSON.stringify(perspectiveObj),
          async: false,
          success: function (data, status) {
            if (
              data.cardDetailsDTO.id != undefined &&
              data.cardDetailsDTO.id != ""
            ) {
              console.log(pageno);
              var scorecardcreatedid = data.cardDetailsDTO.id;
              var scorecardobj = getScorecardTemplObj(
                "Financial",
                pageEmpId,
                scorecardcreatedid
              );
              createtemplatescorecard(scorecardobj);

              scorecardobj = getScorecardTemplObj(
                "Customer",
                pageEmpId,
                scorecardcreatedid
              );
              createtemplatescorecard(scorecardobj);

              scorecardobj = getScorecardTemplObj(
                "Internal Process",
                pageEmpId,
                scorecardcreatedid
              );
              createtemplatescorecard(scorecardobj);

              scorecardobj = getScorecardTemplObj(
                "Learning & Growth",
                pageEmpId,
                scorecardcreatedid
              );
              createtemplatescorecard(scorecardobj);

              location.reload(true);
            }
          },
        });
      } else {
        var msg = JSON.parse(response.responseText);
        // $.notify(msg.exception);
      }
    },
  });
}

function scoreCardSuccessCallback(data) {
  console.log(data, "scorecardData");
  if (data.message != undefined && data.scoreCardName != undefined) {
    var scorecardhtmlcontent =
      data.scoreCardName +
      `<span class="scorecard_status scorecardname" style="background-color:#1aa243"></span>`;
    $(".pageTitleStatus").html(scorecardhtmlcontent);
    if ($(".superusertopmenu").hasClass(scoresuperpageNo)) {
      $(".subusermenuname").text(data.scoreCardName);
    }
  }

  if (!data.flag && data.message != undefined && data.message != "") {
    $(".container-fluid .tableview")
      .attr(
        "style",
        "background-color: white;padding: 10px;margin-top: 10px;border-radius: 10px;"
      )
      .html("<center><h3>" + data.message + "</h3></center>");
  }
  scorecardlist = data.cardDetailsDTO;

  var perspectiveTemplate = $("#perspective-template").html();
  Mustache.parse(perspectiveTemplate);

  var perspectiveHeaderRowTemplate = $(
    "#perspective-header-row-template"
  ).html();
  Mustache.parse(perspectiveHeaderRowTemplate);

  var objectiveRowTemplate = $("#objective-row-template").html();
  Mustache.parse(objectiveRowTemplate);

  var kpiRowTemplate = $("#kpi-row-template").html();
  Mustache.parse(kpiRowTemplate);
  var subkpiRowTemplate = $("#subkpi-row-template").html();
  Mustache.parse(subkpiRowTemplate);
  var designlabel = "";
  $("#viewiconTxt").empty();
  $("#scordcard-wrapper").empty();
  var nestedredcount = 0;
  var nestedyellowcount = 0;
  var nestedblackcount = 0;
  var nestedgreencount = 0;
  var scorecardname = "ScoreCard";

  var scorecardactual = false;
  var scorecardtarget = false;
  var scorecardbudget = false;
  var scorecardforecast = false;
  var scorecardscore = false;
  var scorecardtrend = false;
  var scorecardrisk = false;
  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.scorecardactual != undefined &&
    controlpanelScorecardSettings.scorecardactual == true
  ) {
    scorecardactual = true;
  }
  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.scorecardtarget != undefined &&
    controlpanelScorecardSettings.scorecardtarget == true
  ) {
    scorecardtarget = true;
  }
  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.scorecardbudget != undefined &&
    controlpanelScorecardSettings.scorecardbudget == true
  ) {
    scorecardbudget = true;
  }
  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.scorecardforecast != undefined &&
    controlpanelScorecardSettings.scorecardforecast == true
  ) {
    scorecardforecast = true;
  }
  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.scorecarddecline != undefined &&
    controlpanelScorecardSettings.scorecarddecline == true
  ) {
    scorecarddecline = true;
  }
  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.scorecardscore != undefined &&
    controlpanelScorecardSettings.scorecardscore == true
  ) {
    scorecardscore = true;
  }
  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.scorecardtrend != undefined &&
    controlpanelScorecardSettings.scorecardtrend == true
  ) {
    scorecardtrend = true;
  }
  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.scorecardrisk != undefined &&
    controlpanelScorecardSettings.scorecardrisk == true
  ) {
    scorecardrisk = true;
  }

  if (data.cardDetailsDTO != undefined) {
    if (
      data.cardDetailsDTO.scorecardName != undefined &&
      data.cardDetailsDTO.scorecardName != null
    ) {
      scorecardname = data.cardDetailsDTO.scorecardName;
      score = "";
      if (data.thresholdResult != "" || data.thresholdResult != null) {
        score = data.thresholdResult;
      } else {
        score = "0.0";
      }
      $(".scorecardname").text(scorecardname);
      $("#score").html(score);

      var upiconflag = false;
      if (jQuery.isEmptyObject(data.cardDetailsDTO.scoreCardDTOS)) {
        if (
          controlpanelScorecardSettings != "" &&
          controlpanelScorecardSettings != undefined &&
          controlpanelScorecardSettings.customPerformance != undefined &&
          controlpanelScorecardSettings.customPerformance == true
        ) {
          var scorecardhtmlcontent =
            scorecardname +
            `<span class="scorecard_status scorecardname" style="background-color:#1aa243"></span>`;
          $(".pageTitleStatus").html(scorecardhtmlcontent);
          if ($(".superusertopmenu").hasClass(scoresuperpageNo)) {
            $(".subusermenuname").text(scorecardname);
          }
        } else {
          upiconflag = true;
        }
      } else {
        scorecardname =
          data.cardDetailsDTO.scoreCardDTOS[0].scorecardName != undefined &&
          data.cardDetailsDTO.scoreCardDTOS[0].scorecardName != null
            ? data.cardDetailsDTO.scoreCardDTOS[0].scorecardName
            : scorecardname;
      }
    }
  } else {
    scorecardname =
      data.scoreCardName != undefined && data.scoreCardName != null
        ? data.scoreCardName
        : scorecardname;
  }

  if (upiconflag == true) {
    var scorecardhtmlcontent =
      scorecardname + `<span id="scorecardstatusicon"></span>`;
    $(".pageTitleStatus").html(scorecardhtmlcontent);
    if ($(".superusertopmenu").hasClass(scoresuperpageNo)) {
      $(".subusermenuname").text(scorecardname);
    }
    var scorecardstatusiconElement = $("#scorecardstatusicon");
    scorecardstatusiconElement
      .addClass("fa fa-arrow-circle-up")
      .css({ "font-size": "20px", color: "#1aa243" });
  }

  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.statusrequired != undefined &&
    controlpanelScorecardSettings.statusrequired == true
  ) {
    if (
      controlpanelScorecardSettings != "" &&
      controlpanelScorecardSettings != undefined &&
      controlpanelScorecardSettings.scorecardstatus != undefined &&
      controlpanelScorecardSettings.scorecardstatus == false &&
      controlpanelScorecardSettings != "" &&
      controlpanelScorecardSettings != undefined &&
      controlpanelScorecardSettings.performance != undefined &&
      controlpanelScorecardSettings.performance == false
    ) {
      $(".scorecardname").css("background-color", "unset");
      $("#scorecardstatusicon").removeClass("fa-arrow-circle-up");
    }
  } else {
    $(".scorecardname").css("background-color", "unset");
    $("#scorecardstatusicon").removeClass("fa-arrow-circle-up");
  }

  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.scorerequired != undefined &&
    controlpanelScorecardSettings.scorerequired == true
  ) {
    if (
      controlpanelScorecardSettings != "" &&
      controlpanelScorecardSettings != undefined &&
      controlpanelScorecardSettings.scorecardscoreper != undefined &&
      controlpanelScorecardSettings.scorecardscoreper == false
    ) {
      $(".scorecardname").text("");
    }
  } else if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.scorerequired != undefined &&
    controlpanelScorecardSettings.scorerequired == false
  ) {
    $(".scorecardname").text("");
  } else {
    if (
      controlpanelScorecardSettings != "" &&
      controlpanelScorecardSettings != undefined &&
      controlpanelScorecardSettings.scorecardscoreper != undefined &&
      controlpanelScorecardSettings.scorecardscoreper == false
    ) {
      $(".scorecardname").text("");
    }
  }

  if (data.cardDetailsDTO != undefined) {
    $.each(data.cardDetailsDTO.scoreCardDTOS, function (index, scorecard) {
      var perioddisplay = "";
      var actualdisplay = "";
      var targetdisplay = "";
      var trenddisplay = "";
      var riskdisplay = "";
      var scoredisplay = "";
      var statusDisplay = "";
      var currentheaderRow = {};
      currentheaderRow.header1 = addDynamicDataI18n(
        scorecard.scoreCardValue.header1
      );
      currentheaderRow.header2 = addDynamicDataI18n(
        scorecard.scoreCardValue.header2
      );

      if (scorecardactual == true) {
        actualdisplay = true;
        currentheaderRow.header3 = "<th >Actual</th>";
      }

      if (scorecardtarget == true) {
        targetdisplay = true;
        currentheaderRow.header4 = '<th data-i18n="Target">Target</th>';
      }

      if (scorecardbaseline == true) {
        currentheaderRow.header8 = '<th data-i18n="Baseline">Baseline</th>';
      }
      if (scorecardbudget == true) {
        currentheaderRow.header9 = '<th data-i18n="Budget">Budget</th>';
      }
      if (scorecardforecast == true) {
        currentheaderRow.header10 = '<th data-i18n="Forecast">Forecast</th>';
      }
      if (scorecarddecline == true) {
        currentheaderRow.header11 = '<th data-i18n="Decline">Decline</th>';
      }

      if (scorecardtrend == true) {
        trenddisplay = true;
        currentheaderRow.header5 = '<th data-i18n="Trend">Trend</th>';
      }

      if (scorecardrisk == true) {
        riskdisplay = true;
        currentheaderRow.header6 = '<th data-i18n="Risk">Risk</th>';
      }

      if (scorecardscore == true) {
        scoredisplay = true;
        currentheaderRow.header7 = '<th data-i18n="Index">Index</th>';
      }

      var headerRow = Mustache.render(
        perspectiveHeaderRowTemplate,
        currentheaderRow
      );

      var bodyRows = "";
      var subbodyRows = "";

      if (scorecard.objectiveList && scorecard.objectiveList.length > 0) {
        $.each(scorecard.objectiveList, function (objIndex, objective) {
          var objectiveOptionsicon = "";
          if (
            kpicreatepermission == false &&
            objectiveeditpermission == false &&
            objectiveviewpermission == false &&
            objectivedeletepermission == false
          ) {
            objectiveOptionsicon = "";
          } else {
            objectiveOptionsicon = `<div style="width: 109px !important;"></div><ul class="header-dropdown m-r--5">
					<li class="dropdown">
						<a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
							<i class="material-icons">more_vert</i>
						</a>
						<ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(-104px, 24px, 0px);">
						`;

            if (kpicreatepermission == true) {
              objectiveOptionsicon +=
                `<li>
						<a href="#" data-bs-toggle="modal" data-bs-target=".kpi_description_popup" class="kpidescription" onclick="handleKpiEvent('0', 'add', ` +
                objective.id +
                `)" data-i18n="Add" >`+addTextHeader+`</a>
					</li>`;
            }

            if (objectiveeditpermission == true) {
              objectiveOptionsicon +=
                `<li>
						<a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="handleObjectiveEvent(` +
                objective.id +
                `, 'edit', ` +
                scorecard.id +
                `)" data-i18n="Edit"> `+editTextHeade+`</a>
					</li>`;
            }

            if (objectiveviewpermission == true) {
              objectiveOptionsicon +=
                `<li>
						<a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="handleObjectiveEvent(` +
                objective.id +
                `, 'view', ` +
                scorecard.id +
                `)" data-i18n="View">`+viewTextHeader+`</a>
					</li>`;
            }

            if (objectivedeletepermission == true) {
              objectiveOptionsicon +=
                `<li>
							<a href="#" onclick="handleObjectiveEvent(` +
                objective.id +
                `, 'delete', ` +
                scorecard.id +
                `)" data-i18n="Delete">`+deleteTextHeader+`</a>
						</li>`;
            }

            objectiveOptionsicon += `</ul></li></ul>`;
          }

          var objthresholdResult = "";
          if (
            objective.objectivesValue.thresholdResult != undefined &&
            scoredisplay == true
          ) {
            objthresholdResult = objective.objectivesValue.thresholdResult;
          }

          var trendrisktd = "";

          if (trenddisplay == true && riskdisplay == true) {
            trendrisktd = "<td></td><td></td>";
          } else if (trenddisplay == true && riskdisplay == false) {
            trendrisktd = "<td></td>";
          } else if (trenddisplay == false && riskdisplay == true) {
            trendrisktd = "<td></td>";
          } else if (trenddisplay == false && riskdisplay == false) {
            trendrisktd = "";
          }

          var actualtargettd = "";

          if (actualdisplay == true && targetdisplay == true) {
            actualtargettd = "<td></td><td></td>";
          } else if (actualdisplay == true && targetdisplay == false) {
            actualtargettd = "<td></td>";
          } else if (actualdisplay == false && targetdisplay == true) {
            actualtargettd = "<td></td>";
          } else if (actualdisplay == false && targetdisplay == false) {
            actualtargettd = "";
          }

          if (
            typeof objthresholdResult == "string" &&
            objthresholdResult != undefined &&
            !objthresholdResult.includes("%") &&
            objthresholdResult != ""
          ) {
            objthresholdResult = objthresholdResult + "%";
          }

          if (scoredisplay == true) {
            objthresholdResult =
              "<td><strong>" + objthresholdResult + "</strong></td>";
          }
          var objstatusLight = "";
          if (
            objective.objectivesValue.statusLightFlag != undefined &&
            objective.objectivesValue.statusLightFlag != ""
          ) {
            objstatusLight =
              '<i class="' +
              objective.objectivesValue.statusLight +
              '" style="font-size:10px !important;color:' +
              objective.objectivesValue.statusLightFlag +
              ' !important;"></i>';
          } else {
            objstatusLight =
              '<i class="' +
              objective.objectivesValue.statusLight +
              '" style="font-size:10px !important;"></i>';
          }

          if (
            controlpanelScorecardSettings != "" &&
            controlpanelScorecardSettings != undefined &&
            controlpanelScorecardSettings.statusrequired != undefined &&
            controlpanelScorecardSettings.statusrequired == true
          ) {
            if (
              controlpanelScorecardSettings != "" &&
              controlpanelScorecardSettings != undefined &&
              controlpanelScorecardSettings.objectivestatus != undefined &&
              controlpanelScorecardSettings.objectivestatus == false
            ) {
              objstatusLight = "";
            }
          } else if (
            controlpanelScorecardSettings != "" &&
            controlpanelScorecardSettings != undefined &&
            controlpanelScorecardSettings.statusrequired != undefined &&
            controlpanelScorecardSettings.statusrequired == false
          ) {
            objstatusLight = "";
          } else {
            if (
              controlpanelScorecardSettings != "" &&
              controlpanelScorecardSettings != undefined &&
              controlpanelScorecardSettings.objectivestatus != undefined &&
              controlpanelScorecardSettings.objectivestatus == false
            ) {
              objstatusLight = "";
            }
          }

          if (
            controlpanelScorecardSettings != "" &&
            controlpanelScorecardSettings != undefined &&
            controlpanelScorecardSettings.scorerequired != undefined &&
            controlpanelScorecardSettings.scorerequired == true
          ) {
            if (
              controlpanelScorecardSettings != "" &&
              controlpanelScorecardSettings != undefined &&
              controlpanelScorecardSettings.objectivescore != undefined &&
              controlpanelScorecardSettings.objectivescore == false
            ) {
              objthresholdResult = "<td></td>";
            }
          } else if (
            controlpanelScorecardSettings != "" &&
            controlpanelScorecardSettings != undefined &&
            controlpanelScorecardSettings.scorerequired != undefined &&
            controlpanelScorecardSettings.scorerequired == false
          ) {
            objthresholdResult = "<td></td>";
          } else {
            if (
              controlpanelScorecardSettings != "" &&
              controlpanelScorecardSettings != undefined &&
              controlpanelScorecardSettings.objectivescore != undefined &&
              controlpanelScorecardSettings.objectivescore == false
            ) {
              objthresholdResult = "<td></td>";
            }
          }

          var objectiveRow = Mustache.render(objectiveRowTemplate, {
            scoreCardId: scorecard.id,
            objectiveId: objective.id,
            objectiveDisplayId: objective.objectiveId,
            objectiveName: objective.objectivesValue.name,
            statusLight: objstatusLight,
            objthresholdResult: objthresholdResult,
            actualtargettd: actualtargettd,
            trendrisktd: trendrisktd,
            objectiveOptionsicon: objectiveOptionsicon,
          });

          bodyRows = bodyRows + objectiveRow;

          if (objective.kpiList && objective.kpiList.length > 0) {
            $.each(objective.kpiList, function (kpiIndex, kpi) {
              var hasSubKpi =
                kpi.subKpiList != undefined && kpi.subKpiList.length > 0;

              var kpiActual =
                kpi.kpiValue.actual != undefined && kpi.kpiValue.actual != null
                  ? kpi.kpiValue.actual
                  : "";
              var kpiTarget =
                kpi.kpiValue.target != undefined && kpi.kpiValue.target != null
                  ? kpi.kpiValue.target
                  : "";
              var pageno = $("#pagenumber").val();

              var targetcurrency =
                kpi.kpiValue.targetCurrency != undefined &&
                kpi.kpiValue.targetCurrency != ""
                  ? kpi.kpiValue.targetCurrency
                  : "";
              var actutalcurrency =
                kpi.kpiValue.actualCurrency != undefined &&
                kpi.kpiValue.actualCurrency != ""
                  ? kpi.kpiValue.actualCurrency
                  : "";
              targetcurrency =
                targetcurrency == ""
                  ? targetcurrency
                  : kpi.kpiValue.kpiCurrency != undefined &&
                    kpi.kpiValue.kpiCurrency != ""
                  ? kpi.kpiValue.kpiCurrency
                  : "";
              actutalcurrency =
                actutalcurrency == ""
                  ? actutalcurrency
                  : kpi.kpiValue.kpiCurrency != undefined &&
                    kpi.kpiValue.kpiCurrency != ""
                  ? kpi.kpiValue.kpiCurrency
                  : "";

              kpiActual = actutalcurrency + kpiActual; // actutalcurrency+numberchartActual['firstletter']+intergerHumanFormat(numberchartActual['number'])+numberchartActual['lastletter'];

              if (
                kpi.kpiValue.dataType != undefined &&
                kpi.kpiValue.dataType != null
              ) {
                if (kpi.kpiValue.dataType == "Percentage") {
                  if (!kpiTarget.includes("%")) {
                    kpiTarget = kpiTarget + "%";
                  }
                }
              }
              kpiTarget = targetcurrency + kpiTarget; // targetcurrency+numberchartTarget['firstletter']+numberchartTarget['number']+numberchartTarget['lastletter'];

              // kpi row permission
              var kpiOptionsicon = "";
              if (
                subkpicreatepermission == false &&
                kpieditpermission == false &&
                kpiviewpermission == false &&
                kpideletepermission == false
              ) {
                kpiOptionsicon = "";
              } else {
                kpiOptionsicon = `<ul class="header-dropdown" style="margin: 0px;">
							<li class="dropdown">
								<a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
									<i class="material-icons">more_vert</i>
								</a>
								<ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">`;

                if (subkpicreatepermission == true) {
                  kpiOptionsicon +=
                    `<li>
								<a href="#" data-toggle="modal" data-target=".subkpi_description_popup" class="kpidescription" onclick="handleSubKpiEvent(` +
                    kpi.id +
                    `, 'add', ` +
                    objective.id +
                    `)" data-i18n="Add">`+addTextHeader+`</a>
							</li>`;
                }

                if (kpieditpermission == true) {
                  kpiOptionsicon +=
                    `<li>
								<a href="#" data-bs-toggle="modal" data-bs-target=".kpi_description_popup" class="kpidescription" onclick="handleKpiEvent(` +
                    kpi.id +
                    `, 'edit', ` +
                    objective.id +
                    `)" data-i18n="Edit">`+editTextHeade+`</a>
							</li>`;
                }

                if (kpiviewpermission == true) {
                  kpiOptionsicon +=
                    `<li>
								<a href="#" data-bs-toggle="modal" data-bs-target=".kpi_description_popup" class="kpidescription" onclick="handleKpiEvent(` +
                    kpi.id +
                    `, 'view', ` +
                    objective.id +
                    `)" data-i18n="View">`+viewTextHeader+`</a>
							</li>`;
                }

                if (kpideletepermission == true) {
                  kpiOptionsicon +=
                    `<li>
								<a href="#" onclick="handleKpiEvent(` +
                    kpi.id +
                    `, 'delete', ` +
                    objective.id +
                    `)" data-i18n="Delete">`+deleteTextHeader+`</a>
							</li>`;
                }

                kpiOptionsicon += `</ul></li></ul>`;
              }

              var currentRow = {};
              console.log(currentRow, "currentRow");
              currentRow.hasSubKpi = hasSubKpi;
              currentRow.objectiveId = objective.id;
              currentRow.kpiId = kpi.id;
              currentRow.scoreCardId = scorecard.id;
              currentRow.pageId = pageno;
              currentRow.kpiDisplayId = kpi.kpiId;
              currentRow.kpiName = kpi.kpiValue.name;
              currentRow.kpiMeasure = kpi.kpiValue.kpi_measurement;

              if (
                kpi.kpiValue.statusLightFlag != undefined &&
                kpi.kpiValue.statusLightFlag != ""
              ) {
                currentRow.statusLight =
                  '<i class="' +
                  kpi.kpiValue.statusLight +
                  '" style="font-size:10px !important;color:' +
                  kpi.kpiValue.statusLightFlag +
                  ' !important;"></i>';
              } else {
                currentRow.statusLight =
                  '<i class="' +
                  kpi.kpiValue.statusLight +
                  '" style="font-size:10px !important;"></i>';
              }

              currentRow.kpiOptionsicon = kpiOptionsicon;

              var kpithresholdResult = "";
              if (kpi.kpiValue.thresholdResult != undefined) {
                kpithresholdResult = kpi.kpiValue.thresholdResult;
              }
              if (actualdisplay == true) {
                currentRow.kpiActual =
                  '<th  style="white-space: nowrap;">' + kpiActual + "</th>";
              }
              if (targetdisplay == true) {
                currentRow.kpiTarget =
                  '<th  style="white-space: nowrap;">' + kpiTarget + "</th>";
              }
              if (scoredisplay == true) {
                currentRow.kpithresholdResult =
                  '<th  style="white-space: nowrap;">' +
                  kpithresholdResult +
                  "</th>";
              }
              if (trenddisplay == true) {
                currentRow.trendValue =
                  '<th><i class="' + kpi.kpiValue.trend + '"></i></th>';
              }
              if (riskdisplay == true) {
                currentRow.riskStatusLight =
                  '<th><a href="/stratroom/risks?kpiId=' +
                  kpi.id +
                  '&kpiRiskView=true"><i class="' +
                  kpi.kpiValue.riskStatusLight +
                  '" style="font-size:10px !important"></i></a></th>';
              }

              if (
                controlpanelScorecardSettings != "" &&
                controlpanelScorecardSettings != undefined &&
                controlpanelScorecardSettings.statusrequired != undefined &&
                controlpanelScorecardSettings.statusrequired == true
              ) {
                if (
                  controlpanelScorecardSettings != "" &&
                  controlpanelScorecardSettings != undefined &&
                  controlpanelScorecardSettings.kpistatus != undefined &&
                  controlpanelScorecardSettings.kpistatus == false
                ) {
                  currentRow.statusLight = "";
                }
              } else if (
                controlpanelScorecardSettings != "" &&
                controlpanelScorecardSettings != undefined &&
                controlpanelScorecardSettings.statusrequired != undefined &&
                controlpanelScorecardSettings.statusrequired == false
              ) {
                currentRow.statusLight = "";
              } else {
                if (
                  controlpanelScorecardSettings != "" &&
                  controlpanelScorecardSettings != undefined &&
                  controlpanelScorecardSettings.kpistatus != undefined &&
                  controlpanelScorecardSettings.kpistatus == false
                ) {
                  currentRow.statusLight = "";
                }
              }
              if (
                controlpanelScorecardSettings != "" &&
                controlpanelScorecardSettings != undefined &&
                controlpanelScorecardSettings.scorerequired != undefined &&
                controlpanelScorecardSettings.scorerequired == true
              ) {
                if (
                  controlpanelScorecardSettings != "" &&
                  controlpanelScorecardSettings != undefined &&
                  controlpanelScorecardSettings.kpiscore != undefined &&
                  controlpanelScorecardSettings.kpiscore == false
                ) {
                  currentRow.kpithresholdResult = "<th></th>";
                }
              } else if (
                controlpanelScorecardSettings != "" &&
                controlpanelScorecardSettings != undefined &&
                controlpanelScorecardSettings.scorerequired != undefined &&
                controlpanelScorecardSettings.scorerequired == false
              ) {
                currentRow.kpithresholdResult = "<th></th>";
              } else {
                if (
                  controlpanelScorecardSettings != "" &&
                  controlpanelScorecardSettings != undefined &&
                  controlpanelScorecardSettings.kpiscore != undefined &&
                  controlpanelScorecardSettings.kpiscore == false
                ) {
                  if (scoredisplay == true) {
                    currentRow.kpithresholdResult = "<th></th>";
                  }
                }
              }

              if (KpiViewviewpermission == true) {
                var useraccessid = localStorage.getItem("useraccessid");

                //if(KpiViewcreatepermission	==	true && KpiViewviewpermission	==	true && KpiVieweditpermission == true && KpiViewdeletepermission	==	true){
                if (useraccessid) {
                  currentRow.KpiViewLink =
                    'class="kpiclearrecord" href="/stratroom/kpiView?kpiId=' +
                    kpi.id +
                    "&scoreCardId=" +
                    scorecard.id +
                    "&objectiveId=" +
                    objective.id +
                    "&pageId=" +
                    pageno +
                    "&empId=" +
                    parseInt(useraccessid) +
                    '"';
                } else {
                  flagType = "kpi";
                  currentRow.KpiViewLink =
                    'class="kpiclearrecord" href="/stratroom/kpiView?kpiId=' +
                    kpi.id +
                    "&flagtype=" +
                    flagType +
                    "&scoreCardId=" +
                    scorecard.id +
                    "&objectiveId=" +
                    objective.id +
                    "&pageId=" +
                    pageno +
                    '"';
                }
              } else {
                currentRow.KpiViewLink = "";
              }
              var kpiRow = Mustache.render(kpiRowTemplate, currentRow);
              bodyRows = bodyRows + kpiRow;

              if (kpi.subKpiList && kpi.subKpiList.length > 0) {
                $.each(kpi.subKpiList, function (kpiIndex, subKpi) {
                  console.log(subKpi, "subKpi");
                  // todo: Read objectives and pass it to Mustache
                  /*
                   * var readTargetAmount =
                   * intergerHumanFormat(kpi.subKpiValue.target); var
                   * kpiTarget = (kpi.subKpiValue.targetCurrency == undefined ||
                   * kpi.subKpiValue.targetCurrency ==
                   * ""?readTargetAmount:kpi.subKpiValue.targetCurrency+readTargetAmount);
                   *
                   * var readActualAmount =
                   * intergerHumanFormat(kpi.subKpiValue.actual);//kpi.subKpiValue.actual
                   * var kpiActual = (kpi.subKpiValue.actualCurrency ==
                   * undefined || kpi.subKpiValue.actualCurrency ==
                   * ""?readActualAmount:kpi.subKpiValue.actualCurrency+readActualAmount);
                   */
                  // var hasSubKpi = (kpi.subKpiList != undefined && kpi.subKpiList.length > 0);

                  var kpiActual =
                    subKpi.subKpiValue.actual != undefined &&
                    subKpi.subKpiValue.actual != null
                      ? subKpi.subKpiValue.actual
                      : "";
                  var kpiTarget =
                    subKpi.subKpiValue.target != undefined &&
                    subKpi.subKpiValue.target != null
                      ? subKpi.subKpiValue.target
                      : "";
                  var pageno = $("#pagenumber").val();

                  var targetcurrency =
                    subKpi.subKpiValue.targetCurrency != undefined &&
                    subKpi.subKpiValue.targetCurrency != ""
                      ? subKpi.subKpiValue.targetCurrency
                      : "";
                  var actutalcurrency =
                    subKpi.subKpiValue.actualCurrency != undefined &&
                    subKpi.subKpiValue.actualCurrency != ""
                      ? subKpi.subKpiValue.actualCurrency
                      : "";
                  targetcurrency =
                    targetcurrency == ""
                      ? targetcurrency
                      : subKpi.subKpiValue.kpiCurrency != undefined &&
                        subKpi.subKpiValue.kpiCurrency != ""
                      ? subKpi.subKpiValue.kpiCurrency
                      : "";
                  actutalcurrency =
                    actutalcurrency == ""
                      ? actutalcurrency
                      : subKpi.subKpiValue.kpiCurrency != undefined &&
                        subKpi.subKpiValue.kpiCurrency != ""
                      ? subKpi.subKpiValue.kpiCurrency
                      : "";

                  kpiActual = actutalcurrency + kpiActual; // actutalcurrency+numberchartActual['firstletter']+intergerHumanFormat(numberchartActual['number'])+numberchartActual['lastletter'];

                  if (
                    subKpi.subKpiValue.dataType != undefined &&
                    subKpi.subKpiValue.dataType != null
                  ) {
                    if (subKpi.subKpiValue.dataType == "Percentage") {
                      if (!kpiTarget.includes("%")) {
                        kpiTarget = kpiTarget + "%";
                      }
                    }
                  }
                  kpiTarget = targetcurrency + kpiTarget; // targetcurrency+numberchartTarget['firstletter']+numberchartTarget['number']+numberchartTarget['lastletter'];

                  // subKpi row permission
                  var kpiOptionsicon = "";

                  if (
                    kpieditpermission == false &&
                    kpiviewpermission == false &&
                    kpideletepermission == false
                  ) {
                    kpiOptionsicon = "";
                  } else {
                    kpiOptionsicon = `<ul class="header-dropdown" style="margin: 0px;">
									<li class="dropdown">
										<a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
											<i class="material-icons">more_vert</i>
										</a>
										<ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">`;

                    if (kpieditpermission == true) {
                      kpiOptionsicon +=
                        `<li>
                          <a href="#" data-toggle="modal" data-target=".updateSubkpi_description_popup" class="kpidescription" onclick="handleEditSubKpiEvent(` +
                              subKpi.id +
                              `, 'edit', ` +
                              objective.id +
                              `,` +
                              subKpi.kpiId +
                              `)">Edit</a>
                        </li>`;
                    }

                    if (kpiviewpermission == true) {
                      kpiOptionsicon +=
                        `<li>
										<a href="#" data-toggle="modal" data-target=".updateSubkpi_description_popup" class="kpidescription" onclick="handleEditSubKpiEvent(` +
                        subKpi.id +
                        `, 'view', ` +
                        objective.id +
                        `)">View</a>
									</li>`;
                    }

                    if (kpideletepermission == true) {
                      kpiOptionsicon +=
                        `<li>
										<a href="#" onclick="handledeleteSubKpi(` +
                        subKpi.id +
                        `, 'delete')">Delete</a>
									</li>`;
                    }

                    kpiOptionsicon += `</ul></li></ul>`;
                  }

                  var subCurrentRow = {};
                  subCurrentRow.objectiveId = objective.id;
                  subCurrentRow.kpiId = subKpi.kpiId;
                  subCurrentRow.kpiDisplayId = subKpi.subKpiId;
                  subCurrentRow.kpiName = subKpi.subKpiValue.subMeasureName;
                  subCurrentRow.kpiMeasure = subKpi.subKpiValue.kpi_measurement;
                  subCurrentRow.statusLight = subKpi.subKpiValue.statusLightFlag
                    ? '<i class="' +
                      subKpi.subKpiValue.statusLight +
                      '" style="font-size:10px !important;color:' +
                      subKpi.subKpiValue.statusLightFlag +
                      ' !important;"></i>'
                    : '<i class="' +
                      subKpi.subKpiValue.statusLight +
                      '" style="font-size:10px !important;"></i>';
                  subCurrentRow.kpiOptionsicon = kpiOptionsicon;

                  if (
                    subKpi.subKpiValue.statusLightFlag != undefined &&
                    subKpi.subKpiValue.statusLightFlag != ""
                  ) {
                    subCurrentRow.statusLight =
                      '<i class="' +
                      subKpi.subKpiValue.statusLight +
                      '" style="font-size:10px !important;color:' +
                      subKpi.subKpiValue.statusLightFlag +
                      ' !important;"></i>';
                  } else {
                    subCurrentRow.statusLight =
                      '<i class="' +
                      subKpi.subKpiValue.statusLight +
                      '" style="font-size:10px !important;"></i>';
                  }

                  subCurrentRow.kpiOptionsicon = kpiOptionsicon;

                  var kpithresholdResult = "";
                  if (subKpi.subKpiValue.thresholdResult != undefined) {
                    kpithresholdResult = subKpi.subKpiValue.thresholdResult;
                  }
                  if (actualdisplay == true) {
                    subCurrentRow.kpiActual =
                      '<th  style="white-space: nowrap;">' +
                      kpiActual +
                      "</th>";
                  }
                  if (targetdisplay == true) {
                    subCurrentRow.kpiTarget =
                      '<th  style="white-space: nowrap;">' +
                      kpiTarget +
                      "</th>";
                  }
                  if (scoredisplay == true) {
                    subCurrentRow.kpithresholdResult =
                      '<th  style="white-space: nowrap;">' +
                      kpithresholdResult +
                      "</th>";
                  }
                  if (trenddisplay == true) {
                    subCurrentRow.trendValue =
                      '<th><i class="' +
                      subKpi.subKpiValue.trend +
                      '"></i></th>';
                  }
                  if (riskdisplay == true) {
                    subCurrentRow.riskStatusLight =
                      '<th><a href="/stratroom/risks?kpiId=' +
                      subKpi.id +
                      '&kpiRiskView=true"><i class="' +
                      subKpi.subKpiValue.riskStatusLight +
                      '" style="font-size:10px !important"></i></a></th>';
                  }

                  if (
                    controlpanelScorecardSettings != "" &&
                    controlpanelScorecardSettings != undefined &&
                    controlpanelScorecardSettings.statusrequired != undefined &&
                    controlpanelScorecardSettings.statusrequired == true
                  ) {
                    if (
                      controlpanelScorecardSettings != "" &&
                      controlpanelScorecardSettings != undefined &&
                      controlpanelScorecardSettings.kpistatus != undefined &&
                      controlpanelScorecardSettings.kpistatus == false
                    ) {
                      subCurrentRow.statusLight = "";
                    }
                  } else if (
                    controlpanelScorecardSettings != "" &&
                    controlpanelScorecardSettings != undefined &&
                    controlpanelScorecardSettings.statusrequired != undefined &&
                    controlpanelScorecardSettings.statusrequired == false
                  ) {
                    subCurrentRow.statusLight = "";
                  } else {
                    if (
                      controlpanelScorecardSettings != "" &&
                      controlpanelScorecardSettings != undefined &&
                      controlpanelScorecardSettings.kpistatus != undefined &&
                      controlpanelScorecardSettings.kpistatus == false
                    ) {
                      subCurrentRow.statusLight = "";
                    }
                  }
                  if (
                    controlpanelScorecardSettings != "" &&
                    controlpanelScorecardSettings != undefined &&
                    controlpanelScorecardSettings.scorerequired != undefined &&
                    controlpanelScorecardSettings.scorerequired == true
                  ) {
                    if (
                      controlpanelScorecardSettings != "" &&
                      controlpanelScorecardSettings != undefined &&
                      controlpanelScorecardSettings.kpiscore != undefined &&
                      controlpanelScorecardSettings.kpiscore == false
                    ) {
                      subCurrentRow.kpithresholdResult = "<th></th>";
                    }
                  } else if (
                    controlpanelScorecardSettings != "" &&
                    controlpanelScorecardSettings != undefined &&
                    controlpanelScorecardSettings.scorerequired != undefined &&
                    controlpanelScorecardSettings.scorerequired == false
                  ) {
                    subCurrentRow.kpithresholdResult = "<th></th>";
                  } else {
                    if (
                      controlpanelScorecardSettings != "" &&
                      controlpanelScorecardSettings != undefined &&
                      controlpanelScorecardSettings.kpiscore != undefined &&
                      controlpanelScorecardSettings.kpiscore == false
                    ) {
                      if (scoredisplay == true) {
                        subCurrentRow.kpithresholdResult = "<th></th>";
                      }
                    }
                  }

                  if (KpiViewviewpermission == true) {
                    var useraccessid = localStorage.getItem("useraccessid");

                    //if(KpiViewcreatepermission	==	true && KpiViewviewpermission	==	true && KpiVieweditpermission == true && KpiViewdeletepermission	==	true){
                    if (useraccessid) {
                      subCurrentRow.KpiViewLink =
                        'class="kpiclearrecord" href="/stratroom/kpiView?kpiId=' +
                        subKpi.id +
                        "&scoreCardId=" +
                        scorecard.id +
                        "&objectiveId=" +
                        objective.id +
                        "&pageId=" +
                        pageno +
                        "&empId=" +
                        parseInt(useraccessid) +
                        '"';
                    } else {
                      var flagType = "subKpi";
                      subCurrentRow.KpiViewLink =
                        'class="kpiclearrecord" href="/stratroom/kpiView?kpiId=' +
                        subKpi.id +
                        "&flagtype=" +
                        flagType +
                        "&scoreCardId=" +
                        scorecard.id +
                        "&objectiveId=" +
                        objective.id +
                        "&pageId=" +
                        pageno +
                        '"';
                    }
                  } else {
                    subCurrentRow.KpiViewLink = "";
                  }
                  var subkpiRow = Mustache.render(
                    subkpiRowTemplate,
                    subCurrentRow
                  );
                  bodyRows += subkpiRow;
                });
              }
            });
          }
        });
      }

      var scorecardStatuslight = "nestedWhite";
      var scorecardStatusvalueofweight =
        scorecard.scoreCardValue.thresholdResult;

      /*if(scorecard.scoreCardValue.statusLightFlag !=	undefined && scorecard.scoreCardValue.statusLightFlag !=	""){
				scorecardStatuslight	=	'class="header" style="border-left: 52px solid '+scorecard.scoreCardValue.statusLightFlag+'"';
			}else{*/
      if (
        scorecard.scoreCardValue.statusLight != undefined &&
        scorecard.scoreCardValue.statusLight != ""
      ) {
        scorecardStatuslight =
          scorecard.scoreCardValue.statusLight.toLowerCase();
        if (scorecardStatuslight == "yellow") {
          scorecardStatuslight = "nestedWhite";
          scorecardStatuslight = "nestedYellow";
        } else if (scorecardStatuslight == "green") {
          scorecardStatuslight = "nestedGreen";
        } else if (scorecardStatuslight == "red") {
          scorecardStatuslight = "nestedRed";
        } else {
          scorecardStatuslight = "nestedWhite";
        }
      }

      if (
        controlpanelScorecardSettings != "" &&
        controlpanelScorecardSettings != undefined &&
        controlpanelScorecardSettings.statusrequired != undefined &&
        controlpanelScorecardSettings.statusrequired == true
      ) {
        if (
          controlpanelScorecardSettings != "" &&
          controlpanelScorecardSettings != undefined &&
          controlpanelScorecardSettings.perspectivestatus != undefined &&
          controlpanelScorecardSettings.perspectivestatus == false
        ) {
          scorecardStatuslight = "";
        }
      }
      //}

      /*if(scorecard.scoreCardValue.statusLight !=	undefined && scorecard.scoreCardValue.statusLight !=	""){
				scorecardStatusvalueofweight	=	scorecard.scoreCardValue.thresholdResult;
				scorecardStatuslight 	=	scorecard.scoreCardValue.statusLight.toLowerCase();
				if(scorecardStatuslight 	==	"yellow"){
					scorecardStatuslight 	=	"nestedWhite";
				}else if(scorecardStatuslight 	==	"green"){
					scorecardStatuslight 	=	"nestedWhite";
				}else if(scorecardStatuslight 	==	"red"){
					scorecardStatuslight 	=	"nestedRed";
				}else{
					scorecardStatuslight 	=	"nestedWhite";
				}
			}*/

      var overAllStatus = data.statusLight;
      var thresholdResult = "";
      if (data.thresholdResult != undefined) {
        thresholdResult = data.thresholdResult;
      }
      var scorecardhtmlcontent = scorecardname;
      var scorecardstatusiconElement = $(".scorecardname");
      if (
        controlpanelScorecardSettings != "" &&
        controlpanelScorecardSettings != undefined &&
        controlpanelScorecardSettings.customPerformance != undefined &&
        controlpanelScorecardSettings.customPerformance == true
      ) {
        var scorecardstatusiconElement = $(".scorecardname");
        if (overAllStatus == "RED") {
          scorecardhtmlcontent =
            scorecardname +
            `<span class="scorecard_status scorecardname" style="background-color:#e84343">` +
            thresholdResult +
            `</span>`;
        } else if (overAllStatus == "LIGHTRED") {
          scorecardhtmlcontent =
            scorecardname +
            `<span class="scorecard_status scorecardname" style="background-color:#FF4B3E">` +
            thresholdResult +
            `</span>`;
        } else if (overAllStatus == "YELLOW") {
          scorecardhtmlcontent =
            scorecardname +
            `<span class="scorecard_status scorecardname" style="background-color:#ffd500">` +
            thresholdResult +
            `</span>`;
        } else if (overAllStatus == "LIGHTGREEN") {
          scorecardhtmlcontent =
            scorecardname +
            `<span class="scorecard_status scorecardname" style="background-color:#5FCD5F">` +
            thresholdResult +
            `</span>`;
        } else {
          scorecardhtmlcontent =
            scorecardname +
            `<span class="scorecard_status scorecardname" style="background-color:#1aa243">` +
            thresholdResult +
            `</span>`;
        }
        if ($(".superusertopmenu").hasClass(scoresuperpageNo)) {
          $(".subusermenuname").text(scorecardname);
        }
        $(".pageTitleStatus").html(scorecardhtmlcontent);
      } else {
        var scorecardstatusiconElement = $("#scorecardstatusicon");
        if (overAllStatus == "RED") {
          scorecardhtmlcontent =
            scorecardname +
            `<span id="scorecardstatusicon" class="fa fa-arrow-circle-down" style="font-size:20px;color:#e84343"></span>`;
        } else if (overAllStatus == "LIGHTRED") {
          scorecardhtmlcontent =
            scorecardname +
            `<span id="scorecardstatusicon" class="fa fa-arrow-circle-down" style="font-size:20px;color:#FF4B3E"></span>`;
        } else if (overAllStatus == "YELLOW") {
          scorecardhtmlcontent =
            scorecardname +
            `<span id="scorecardstatusicon" class="fa fa-arrow-circle-down" style="font-size:20px;color:#ffd500"></span>`;
        } else if (overAllStatus == "LIGHTGREEN") {
          scorecardhtmlcontent =
            scorecardname +
            `<span id="scorecardstatusicon" class="fa fa-arrow-circle-down" style="font-size:20px;color:#5FCD5F"></span>`;
        } else {
          scorecardhtmlcontent =
            scorecardname +
            `<span id="scorecardstatusicon" class="fa fa-arrow-circle-down" style="font-size:20px;color:#1aa243"></span>`;
        }
        if ($(".superusertopmenu").hasClass(scoresuperpageNo)) {
          $(".subusermenuname").text(scorecardname);
        }
        $(".pageTitleStatus").html(scorecardhtmlcontent);
      }

      var checkflagname = false;
      if (
        controlpanelScorecardSettings != undefined &&
        (controlpanelScorecardSettings.customPerformance == undefined ||
          controlpanelScorecardSettings.customPerformance == false)
      ) {
        if (
          controlpanelScorecardSettings != "" &&
          controlpanelScorecardSettings != undefined &&
          controlpanelScorecardSettings.statusrequired != undefined &&
          controlpanelScorecardSettings.statusrequired == true
        ) {
          checkflagname = true;
          if (
            controlpanelScorecardSettings != "" &&
            controlpanelScorecardSettings != undefined &&
            controlpanelScorecardSettings.scorecardstatus != undefined &&
            controlpanelScorecardSettings.scorecardstatus == false
          ) {
            $(".scorecardname").css("background-color", "unset");
            $("#scorecardstatusicon").removeClass("fa-arrow-circle-down");
          }
        } else {
          if (
            controlpanelScorecardSettings != "" &&
            controlpanelScorecardSettings != undefined &&
            controlpanelScorecardSettings.scorecardstatus != undefined &&
            controlpanelScorecardSettings.scorecardstatus == false
          ) {
            $(".scorecardname").css("background-color", "unset");
            $("#scorecardstatusicon").removeClass("fa-arrow-circle-down");
          }
        }
      }

      if (
        ((checkflagname == true &&
          controlpanelScorecardSettings != "" &&
          controlpanelScorecardSettings != undefined &&
          controlpanelScorecardSettings.scorecardstatus != undefined &&
          controlpanelScorecardSettings.scorecardstatus == false) ||
          (controlpanelScorecardSettings != undefined &&
            controlpanelScorecardSettings.performance != undefined &&
            controlpanelScorecardSettings.performance == false)) &&
        controlpanelScorecardSettings != undefined &&
        controlpanelScorecardSettings.customPerformance != undefined &&
        controlpanelScorecardSettings.customPerformance == false
      ) {
        $(".scorecardname").css("background-color", "unset");
        $("#scorecardstatusicon").removeClass("fa-arrow-circle-down");
      }

      if (
        checkflagname == true &&
        controlpanelScorecardSettings != "" &&
        controlpanelScorecardSettings != undefined &&
        controlpanelScorecardSettings.scorecardstatus == undefined &&
        controlpanelScorecardSettings.performance == undefined &&
        controlpanelScorecardSettings.customPerformance == undefined
      ) {
        $(".scorecardname").css("background-color", "unset");
        $("#scorecardstatusicon").removeClass("fa-arrow-circle-down");
      }

      if (
        controlpanelScorecardSettings != "" &&
        controlpanelScorecardSettings != undefined &&
        controlpanelScorecardSettings.scorerequired != undefined &&
        controlpanelScorecardSettings.scorerequired == true
      ) {
        if (
          controlpanelScorecardSettings != "" &&
          controlpanelScorecardSettings != undefined &&
          controlpanelScorecardSettings.scorecardscoreper != undefined &&
          controlpanelScorecardSettings.scorecardscoreper == false
        ) {
          $(".scorecardname").text("");
        }
      } else if (
        controlpanelScorecardSettings != "" &&
        controlpanelScorecardSettings != undefined &&
        controlpanelScorecardSettings.scorerequired != undefined &&
        controlpanelScorecardSettings.scorerequired == false
      ) {
        $(".scorecardname").text("");
      } else {
        if (
          controlpanelScorecardSettings != "" &&
          controlpanelScorecardSettings != undefined &&
          controlpanelScorecardSettings.scorecardscoreper != undefined &&
          controlpanelScorecardSettings.scorecardscoreper == false
        ) {
          $(".scorecardname").text("");
        }
      }

      var showhidetitle = "";
      var showhidevalue = "";
      var showlabelvalue = "";
      var displayblock = "block";
      if (
        scorecard.scoreCardValue.name != "" &&
        typeof scorecard.scoreCardValue.name == "string"
      ) {
        showhidetitle = scorecard.scoreCardValue.name.toLowerCase();
        showlabelvalue = capitalizeFLetter(scorecard.scoreCardValue.name);
        showhidevalue = scorecard.scoreCardValue.name.replaceallstring();
        if (scorepreference["preferences"] != null) {
          var subiniviewPreference =
            scorepreference["preferences"][showhidevalue] != undefined
              ? scorepreference["preferences"][showhidevalue]
              : "true";
        } else {
          var subiniviewPreference = "true";
        }
        scoreempPreference["preferences"][showhidevalue] = subiniviewPreference;
        displayblock = subiniviewPreference == "true" ? "block" : "none";
        subiniviewPreference = subiniviewPreference == "true" ? "checked" : "";
      }

      designlabel =
        '<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="' +
        showhidetitle +
        '" value="' +
        showhidevalue +
        '" class="form-check-input" ' +
        subiniviewPreference +
        "/>  " +
        showlabelvalue +
        '<span class="form-check-sign"><span class="check"></span></label></div></a></li>';

      // perspective row permission
      var perspectiveOptionsicon = "";
      if (
        objectivecreatepermission == false &&
        perspectiveeditpermission == false &&
        perspectiveviewpermission == false
      ) {
        perspectiveOptionsicon = "";
      } else {
        perspectiveOptionsicon = `            <ul class="header-dropdown m-r--5">
	                <li class="dropdown m-t--10">
	                    <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
	                        <i class="material-icons">more_vert</i>
	                    </a>
	                    <ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">`;

        if (objectivecreatepermission == true) {
          perspectiveOptionsicon +=
            `<li>
	                <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="handleObjectiveEvent('0', 'add', ` +
            scorecard.id +
            `)" data-i18n="Add">Add</a>
	            </li>`;
        }

        if (perspectiveeditpermission == true) {
          perspectiveOptionsicon +=
            `<li><a href="#" data-toggle="modal" data-target=".perspectives_description_popup" class="perspectivedescription" onclick="handlePerspectiveEvent(` +
            scorecard.id +
            `, 'edit')" data-i18n="Edit">Edit</a></li>`;
        }

        if (perspectiveviewpermission == true) {
          perspectiveOptionsicon +=
            `<li>
	                <a href="#" data-toggle="modal" data-target=".perspectives_description_popup" class="perspectivedescription" onclick="handlePerspectiveEvent(` +
            scorecard.id +
            `, 'view')" data-i18n="View">View</a>
	            </li>`;
        }

        /*
         * if(scoredeletepermission == true &&
         * scorecard.scoreCardValue.defaultscr != true){
         * perspectiveOptionsicon += `<li> <a href="#"
         * onclick="handlePerspectiveEvent(`+scorecard.id+`,
         * 'delete')">Delete</a> </li>`; }
         */

        perspectiveOptionsicon += `</ul></li></ul>`;
      }

      if (
        controlpanelScorecardSettings != "" &&
        controlpanelScorecardSettings != undefined &&
        controlpanelScorecardSettings.scorerequired != undefined &&
        controlpanelScorecardSettings.scorerequired == true
      ) {
        if (
          controlpanelScorecardSettings != "" &&
          controlpanelScorecardSettings != undefined &&
          controlpanelScorecardSettings.perspectivescore != undefined &&
          controlpanelScorecardSettings.perspectivescore == false
        ) {
          scorecardStatusvalueofweight = "";
        }
      } else if (
        controlpanelScorecardSettings != "" &&
        controlpanelScorecardSettings != undefined &&
        controlpanelScorecardSettings.scorerequired != undefined &&
        controlpanelScorecardSettings.scorerequired == false
      ) {
        scorecardStatusvalueofweight = "";
      } else {
        if (
          controlpanelScorecardSettings != "" &&
          controlpanelScorecardSettings != undefined &&
          controlpanelScorecardSettings.perspectivescore != undefined &&
          controlpanelScorecardSettings.perspectivescore == false
        ) {
          scorecardStatusvalueofweight = "";
        }
      }

      var flagstatusscore = false;
      var scorestatusbgColor = "";
      if (
        (scorecardStatuslight == "nestedWhite" ||
          scorecardStatuslight == "nestedYellow" ||
          scorecardStatuslight == "nestedGreen" ||
          scorecardStatuslight == "nestedRed") &&
        scorecard.scoreCardValue.statusLightFlag != undefined &&
        scorecard.scoreCardValue.statusLightFlag != ""
      ) {
        flagstatusscore = true;
        scorestatusbgColor = scorecard.scoreCardValue.statusLightFlag;
      }

      if (!flagstatusscore) {
        if (
          scorecardStatusvalueofweight != undefined &&
          (scorecardStatusvalueofweight == 0 ||
            scorecardStatusvalueofweight != "") &&
          scorecardStatuslight == ""
        ) {
          scorecardStatuslight = 'class="header nestedEmpty"';
        } //if(scorecardStatuslight	==	"nestedWhite" || scorecardStatuslight	==	"nestedRed"){
        //scorecardStatuslight	=	'class="header '+scorecardStatuslight+'"';
        //}else
        else {
          scorecardStatuslight = 'class="header ' + scorecardStatuslight + '"';
        }
      }

      if (flagstatusscore) {
        scorecardStatuslight =
          'class="header" style="border-left: 52px solid ' +
          scorestatusbgColor +
          ';"';
      }

      if (
        controlpanelScorecardSettings != "" &&
        controlpanelScorecardSettings != undefined &&
        ((controlpanelScorecardSettings.performance == undefined &&
          controlpanelScorecardSettings.customPerformance == undefined) ||
          (controlpanelScorecardSettings.performance == false &&
            controlpanelScorecardSettings.customPerformance == false))
      ) {
        scorecardStatuslight =
          'class="header" style="border-left: 52px solid #dcdcdc"';
      }

      var finalHtml = Mustache.render(perspectiveTemplate, {
        title: scorecard.scoreCardValue.name,
        showhidetitle: showhidevalue,
        perspectiveOptionsicon: perspectiveOptionsicon,
        displayblock: displayblock,
        id: scorecard.id,
        scorecardStatuslight: scorecardStatuslight,
        scorecardStatusvalueofweight: scorecardStatusvalueofweight,
        Scrid: scorecard.id,
        defaultscr: scorecard.scoreCardValue.defaultscr,
        headerRow: headerRow,
        bodyRows: bodyRows,
      });

      $("#viewiconTxt").append(designlabel);
      $("#scordcard-wrapper").append(finalHtml);
    });
  }

  var pageId = $("#pagenumber").val();

  $('.standard_multi-column-dropdown input[type="checkbox"]').click(
    function () {
      var inputValue = $(this).attr("value");
      var checkedProp = $(this).is(":checked");
      inputValue = inputValue.replaceallstring();
      scoreempPreference["pageName"] = "SCORECARD";
      scoreempPreference["pageId"] = pageId;
      scoreempPreference["preferences"][inputValue] = checkedProp;
      $.ajax({
        url: "/stratroom/employeePreference",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(scoreempPreference),
        success: function (data, status) {},
        error: readErrorMsg,
      });
      $("." + inputValue).toggle();
    }
  );
  $(".standard_dropdown-hide").on("click", function (e) {
    e.stopPropagation();
  });
}

function fetchScoreCardData() {
  var pageno = $("#pagenumber").val();
  var pageEmpId = $("#pageEmpId").val();
  if ($("#ischeckemployeeurlornot").val() == "EMPLOYEE") {
    pageno = $("#defaultpagenumber").val();
    pageEmpId = empId;

    var customscore = localStorage.getItem("custom_scorecardliId");
    if (customscore != "" && customscore != null && customscore != undefined) {
      $(".scorecard-dropdown li a").each(function (key, value) {
        var lastvalue = $(this).attr("data-value");
        if (lastvalue == customscore) {
          pageno = customscore;
          $(".scorecardnamecontent").css("display", "block");
          $(".scorecardnamevalue").text($(this).text());
          $(this).addClass("active");
        }
      });
    }
  }

  var datePeriod = $("#datePeriod").val();
  var frequency = localStorage.getItem("customperiod");
  var pageUrl = "";
  if (pageno != undefined && frequency != null && frequency != "") {
    pageUrl =
      "/stratroom/scoreCardList?pageId=" +
      pageno +
      "&empId=" +
      parseInt(pageEmpId) +
      "&datePeriod=" +
      datePeriod +
      "&frequency=" +
      frequency;
  } else if (pageno != undefined && (frequency == null || frequency == "")) {
    pageUrl =
      "/stratroom/scoreCardList?pageId=" +
      pageno +
      "&empId=" +
      parseInt(pageEmpId) +
      "&datePeriod=" +
      datePeriod;
  } else {
    pageUrl =
      "/stratroom/scoreCardList?pageId=" + pageno + "&datePeriod=" + datePeriod;
  }

  if (pageno != "") {
    $(".exceldownloadlink").attr(
      "href",
      "/stratroom/downloadScoreCard?pageId=" +
        pageno +
        "&empId=" +
        parseInt(pageEmpId) +
        "&datePeriod=" +
        datePeriod
    );
  } else {
    $(".exceldownloadlink").attr("href", "#");
    $(".exceldownloadlink").removeAttr("target");
  }

  $.ajax({
    url: pageUrl,
    async: false,
    success: scoreCardSuccessCallback,
    error: function (response) {
      if (response.status == "404") {
        console.log("Error code: 404");
        var getscorecardpagename =
          localStorage.getItem("defaultscorecardpagename") != null &&
          localStorage.getItem("defaultscorecardpagename") != undefined
            ? localStorage.getItem("defaultscorecardpagename")
            : "Scorecard";
        var perspectiveObj = {
          scorecardName: getscorecardpagename,
          owner: empId,
          pageId: pageno,
          scoreCardDetailsValue: {
            scoreCardName: getscorecardpagename,
            score_card_start_end_date: $("#datePeriod").val(),
          },
        };
        console.log(pageno);
        var systemip = localStorage.getItem("systemip");
        var super_empid = $("#userPrincipal").val();
        var data = {
          createdBy: super_empid,
          userId: empId,
          action: "Standard BSC Accessed",
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
        $.ajax({
          url: "/stratroom/scorecardDetails",
          type: "post",
          contentType: "application/json",
          data: JSON.stringify(perspectiveObj),
          async: false,
          success: function (data, status) {
            if (
              data.cardDetailsDTO.id != undefined &&
              data.cardDetailsDTO.id != ""
            ) {
              console.log(pageno);
              var scorecardcreatedid = data.cardDetailsDTO.id;
              var scorecardobj = getScorecardTemplObj(
                "Financial",
                pageEmpId,
                scorecardcreatedid
              );
              createtemplatescorecard(scorecardobj);

              scorecardobj = getScorecardTemplObj(
                "Customer",
                pageEmpId,
                scorecardcreatedid
              );
              createtemplatescorecard(scorecardobj);

              scorecardobj = getScorecardTemplObj(
                "Internal Process",
                pageEmpId,
                scorecardcreatedid
              );
              createtemplatescorecard(scorecardobj);

              scorecardobj = getScorecardTemplObj(
                "Learning & Growth",
                pageEmpId,
                scorecardcreatedid
              );
              createtemplatescorecard(scorecardobj);

              location.reload(true);
            }
          },
        });
      } else {
        var msg = JSON.parse(response.responseText);
        // $.notify(msg.exception);
      }
    },
  });
}

function fetchKpiDetails(id, action) {
  $("#kpi_id").val(id);

  if (action == "view") {
    $('#kpiForm input[type="text"]').prop("disabled", true);
    $('#kpiForm input[type="checkbox"]').prop("disabled", true);
    $("#kpiForm select").prop("disabled", true);
    $("#scrActual").prop("readonly", true);
    $("#scrTarget").prop("readonly", true);
  }

  $.ajax({
    url: "/stratroom/kpi/" + id,
    success: kpiSuccessCallback,
  });
}

function sentenceCase(str) {
  return str
    .replace(/[a-z]/i, function (letter) {
      return letter.toUpperCase();
    })
    .trim();
}

function kpiSuccessCallback(kpiData) {
  console.log(kpiData, "kpiData");
  parentKpidetails.id = kpiData.id;
  parentKpidetails.owner = kpiData.owner;
  parentKpidetails.createDateString = kpiData.createDateString;
  parentKpidetails.updatedDateString = kpiData.updatedDateString;
  parentKpidetails.objectiveId = kpiData.objectiveId;
  parentKpidetails.createdBy = kpiData.createdBy;
  parentKpidetails.kpiValue = kpiData.kpiValue;
  parentKpidetails.kpiFormula = kpiData.kpiFormula;
  parentKpidetails.updatedBy = kpiData.updatedBy;
  parentKpidetails.createdTime = kpiData.createdTime;
  parentKpidetails.kpiId = kpiData.kpiId;

  $("#kpiForm").css("display", "block");
  var kpidisplayId =
    kpiData.kpiId != undefined && kpiData.kpiId != ""
      ? kpiData.kpiId
      : kpiData.id;
  var kpistatus =
    kpiData.kpiValue.status != undefined && kpiData.kpiValue.status != ""
      ? sentenceCase(kpiData.kpiValue.status)
      : "";
  var kpidatasource =
    kpiData.kpiValue.kpi_datasource != undefined &&
    kpiData.kpiValue.kpi_datasource != ""
      ? sentenceCase(kpiData.kpiValue.kpi_datasource)
      : "";
  var kpimeasurement =
    kpiData.kpiValue.kpi_measurement != undefined &&
    kpiData.kpiValue.kpi_measurement != ""
      ? sentenceCase(kpiData.kpiValue.kpi_measurement)
      : "";

  // var desc = (kpiData.kpiValue.description ==
  // "NA"?"":kpiData.kpiValue.description);

  // $("#kpi_owner").val(kpiData.owner).change();
  if (kpiData.owner == "") {
    $(".kpi_description_popup #kpi_owner").val(empId);
  } else {
    $(".kpi_description_popup #kpi_owner").val(kpiData.owner);
  }
  $("#kpi_id").val(kpiData.id);
  $("#kpi_display_id").val(kpidisplayId);
  $("#kpi_name").val(kpiData.kpiValue.name);
  $("#kpi_description").val(kpiData.kpiValue.description);
  if (
    kpiData.kpiFormula.formula != undefined &&
    kpiData.kpiFormula.formula != null
  ) {
    $(".kpi_formula").val(kpiData.kpiFormula.formula);
  } else {
    $(".kpi_formula").val(kpiData.kpiValue.ytdFormula);
  }
  $(".kpiYtdFormula").val(kpiData.kpiValue.ytdFormula);
  //$('#kpi_custom_threshold').val(kpiData.kpiValue.thresholdFormula);
  $("#kpiDataType").val(kpiData.kpiValue.dataType);
  if (kpiData.kpiValue.dataType == "Currency") {
    $(".kpiCurrencyfield").show();
  }
  $("#kpiCurrencyvalue").val(kpiData.kpiValue.kpiCurrency);
  if (kpiData.kpiValue.thresholdFormula != undefined) {
    $("#kpi_performance").val(kpiData.kpiValue.thresholdFormula);
  }

  /*
   * var getkpiformulaval = kpiData.kpiFormula.formula;
   * if(typeof(getkpiformulaval) == "string"){ var leftbracketList =
   * getkpiformulaval.split('[').filter(function(allItems,i,a){ return i ==
   * a.indexOf(allItems); }).join(''); getkpiformulaval = leftbracketList; var
   * rightbracketList =
   * getkpiformulaval.split(']').filter(function(allItems,i,a){ return i ==
   * a.indexOf(allItems); }).join(''); getkpiformulaval = rightbracketList;
   *
   * var checkstart = getkpiformulaval.startsWith("["); var checkend =
   * getkpiformulaval.endsWith("]"); if(checkstart == false){ getkpiformulaval =
   * "["+getkpiformulaval; } if(checkend == false){ getkpiformulaval =
   * getkpiformulaval+"]"; } }
   *
   * $(".kpi_formula").val((getkpiformulaval == "" || getkpiformulaval ==
   * undefined)?"[]":getkpiformulaval);
   */

  $("#kpi_type").val(kpiData.kpiValue.kpiType);
  $("#kpi_measurement").val(kpimeasurement);
  $("#kpi_start_end_date").datepicker({
    language: "en",
    range: true,
    autoClose: true,
    todayButton: false,
    position: "top left",
    onSelect: function (fd) {},
  });
  $("#kpi_start_end_date").val(kpiData.kpiValue.kpi_start_end_date);
  /*
   * if(kpiData.kpiValue.kpi_start_end_date != "" &&
   * kpiData.kpiValue.kpi_start_end_date != undefined &&
   * kpiData.kpiValue.kpi_start_end_date != null){ var daterange1 =
   * kpiData.kpiValue.kpi_start_end_date; var startdate = new Date(); var
   * enddate = new Date(); if (daterange1.includes("-")) { var dateval =
   * daterange1.split('-'); startdate = new Date(dateval[0]); enddate = new
   * Date(dateval[1]); }
   *
   * $("#kpi_start_end_date").datepicker({ language: 'en', minDate: startdate,
   * maxDate: enddate, range: true, autoClose: true, todayButton: false,
   * position: "top left", onSelect: function (fd) {
   *  } }); $("#kpi_start_end_date").val(kpiData.kpiValue.kpi_start_end_date);
   * }else{ var daterange2 = $('#datePeriod').val(); var startdate = new
   * Date(); var enddate = new Date(); if (daterange2.includes("-")) { var
   * dateval = daterange2.split('-'); startdate = new Date(dateval[0]);
   * enddate = new Date(dateval[1]); }
   *
   * $("#kpi_start_end_date").datepicker({ language: 'en', minDate: startdate,
   * maxDate: enddate, range: true, autoClose: true, todayButton: false,
   * position: "top left", onSelect: function (fd) {
   *  } }); $("#kpi_start_end_date").val($('#datePeriod').val()); }
   */

  $("#kpi_datasource").val(kpidatasource);
  $("#nodekey").val(kpiData.kpiValue.nodekey);
  if (kpiData.kpiValue.weight != "" && kpiData.kpiValue.weight != undefined) {
    $("#kpi_weight").val(kpiData.kpiValue.weight);
  } else {
    $("#kpi_weight").val(0);
  }
	if(kpiData.kpiValue.contribution	!=	"" && kpiData.kpiValue.contribution	!=	undefined){
		$('#kpi_contribution').val(kpiData.kpiValue.contribution);
	}else{
		$('#kpi_contribution').val(0);
	}
  $("#kpi_sub_weight").val(kpiData.kpiValue.subweight);
  $("#inputState").val(kpistatus);
  $("#kpiFieldName").val(kpiData.kpiFormula.fieldName);
  $("#performanceFieldName").val(kpiData.kpiFormula.performanceFieldName);
  $("#kpiCreatedById").val(kpiData.createdBy);
  var threshold = "Three_Status";
  console.log(controlpanelScorecardSettings);
  if (
    controlpanelScorecardSettings.threshold &&
    (controlpanelScorecardSettings.threshold == "option_3" ||
      controlpanelScorecardSettings.threshold == "three_status")
  ) {
    threshold = "Three_Status";
  }
  if (
    controlpanelScorecardSettings.threshold &&
    (controlpanelScorecardSettings.threshold == "option_5" ||
      controlpanelScorecardSettings.threshold == "five_status")
  ) {
    threshold = "Five_Status";
  }
  $("#kpi_threshold").val(threshold);
  if (
    controlpanelScorecardSettings.threshold &&
    (controlpanelScorecardSettings.threshold == "option_3" ||
      controlpanelScorecardSettings.threshold == "three_status")
  ) {
    $(".color_picks_1").css("display", "none");
    $(".color_picks_2").css("display", "none");
    $(".color_picks_5").css("display", "none");

    $(".color_picks_3").css("display", "block");
  } else if (
    controlpanelScorecardSettings.threshold &&
    (controlpanelScorecardSettings.threshold == "option_5" ||
      controlpanelScorecardSettings.threshold == "five_status")
  ) {
    $(".color_picks_1").css("display", "none");
    $(".color_picks_2").css("display", "none");

    $(".color_picks_3").css("display", "none");

    $(".color_picks_5").css("display", "block");

    var elements = $(".color_picks_5");
    elements.removeClass("col-md-3").addClass("col-md-1");
  } else {
    $(".color_picks_1").css("display", "none");
    $(".color_picks_2").css("display", "none");
    $(".color_picks_5").css("display", "none");

    $(".color_picks_3").css("display", "block");
  }

  $("#optioncolor1")
    .attr("data-oldvalue", kpiData.kpiValue.optioncolor1)
    .val(kpiData.kpiValue.optioncolor1);
  $("#optioncolor2")
    .attr("data-oldvalue", kpiData.kpiValue.optioncolor2)
    .val(kpiData.kpiValue.optioncolor2);
  $("#optioncolor3")
    .attr("data-oldvalue", kpiData.kpiValue.optioncolor3)
    .val(kpiData.kpiValue.optioncolor3);
  $("#optioncolor4")
    .attr("data-oldvalue", kpiData.kpiValue.optioncolor4)
    .val(kpiData.kpiValue.optioncolor4);
  $("#optioncolor5")
    .attr("data-oldvalue", kpiData.kpiValue.optioncolor5)
    .val(kpiData.kpiValue.optioncolor5);

  $("#optioncolor1")
    .next(".input-group-append")
    .children()
    .css("background", kpiData.kpiValue.optioncolor1colorvalue);
  $("#optioncolor2")
    .next(".input-group-append")
    .children()
    .css("background", kpiData.kpiValue.optioncolor2colorvalue);

  var firstcolor = "";
  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.threshold1Color != undefined &&
    controlpanelScorecardSettings.threshold1Color != ""
  ) {
    $("#optioncolor1")
      .next(".input-group-append")
      .children()
      .css("background", controlpanelScorecardSettings.threshold1Color);
    firstcolor = controlpanelScorecardSettings.threshold1Color;
  }
  /*if(kpiData.kpiValue.optioncolor1colorvalue !=	undefined && kpiData.kpiValue.optioncolor1colorvalue !=	""){
		$("#optioncolor1").next('.input-group-append').children().css('background',kpiData.kpiValue.optioncolor1colorvalue);
		firstcolor	=	kpiData.kpiValue.optioncolor1colorvalue;
	}else{
		if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.threshold1Color != undefined && controlpanelScorecardSettings.threshold1Color != ""){
			$("#optioncolor1").next('.input-group-append').children().css('background',controlpanelScorecardSettings.threshold1Color);
			firstcolor	=	controlpanelScorecardSettings.threshold1Color;
		}
	}*/

  //colorEditTrigger($(".pickr1")[0],firstcolor);

  // $("#optioncolor1").next('.input-group-append').children().toArray().forEach(function(item,index){test(firstcolor,
  // item,index)});

  var secondcolor = "";
  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.threshold2Color != undefined &&
    controlpanelScorecardSettings.threshold2Color != ""
  ) {
    $("#optioncolor2")
      .next(".input-group-append")
      .children()
      .css("background", controlpanelScorecardSettings.threshold2Color);
    secondcolor = controlpanelScorecardSettings.threshold2Color;
  }
  /*if(kpiData.kpiValue.optioncolor2colorvalue !=	undefined && kpiData.kpiValue.optioncolor2colorvalue !=	""){
		$("#optioncolor2").next('.input-group-append').children().css('background',kpiData.kpiValue.optioncolor2colorvalue);
		secondcolor	=	kpiData.kpiValue.optioncolor2colorvalue;
	}else{
		if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.threshold2Color != undefined && controlpanelScorecardSettings.threshold2Color != ""){
			$("#optioncolor2").next('.input-group-append').children().css('background',controlpanelScorecardSettings.threshold2Color);
			secondcolor	=	controlpanelScorecardSettings.threshold2Color;
		}
	}*/

  //colorEditTrigger($(".pickr1")[1],secondcolor);
  var thirdcolor = "";
  // $("#optioncolor2").next('.input-group-append').children().toArray().forEach(function(item,index){test(secondcolor,
  // item,index)});

  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.threshold3Color != undefined &&
    controlpanelScorecardSettings.threshold3Color != ""
  ) {
    $("#optioncolor3")
      .next(".input-group-append")
      .children()
      .css("background", controlpanelScorecardSettings.threshold3Color);
    thirdcolor = controlpanelScorecardSettings.threshold3Color;
  }

  //colorEditTrigger($(".pickr1")[1],secondcolor);
  var fourthcolor = "";
  // $("#optioncolor2").next('.input-group-append').children().toArray().forEach(function(item,index){test(secondcolor,
  // item,index)});

  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.threshold4Color != undefined &&
    controlpanelScorecardSettings.threshold4Color != ""
  ) {
    $("#optioncolor4")
      .next(".input-group-append")
      .children()
      .css("background", controlpanelScorecardSettings.threshold4Color);
    fourthcolor = controlpanelScorecardSettings.threshold4Color;
  }

  //colorEditTrigger($(".pickr1")[1],secondcolor);
  var fifthcolor = "";
  // $("#optioncolor2").next('.input-group-append').children().toArray().forEach(function(item,index){test(secondcolor,
  // item,index)});

  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.threshold5Color != undefined &&
    controlpanelScorecardSettings.threshold5Color != ""
  ) {
    $("#optioncolor5")
      .next(".input-group-append")
      .children()
      .css("background", controlpanelScorecardSettings.threshold5Color);
    fifthcolor = controlpanelScorecardSettings.threshold5Color;
  }

  if (
    kpiData.kpiValue.customthresholdenable != undefined &&
    kpiData.kpiValue.customthresholdenable == true
  ) {
    $("#chk_custom_threshold").prop("checked", true);
  }

  for (var i = 1; i <= 4; i++) {
    var header = kpiData.kpiValue["header" + i];
    $("#kpiForm input[value=" + header + "]").prop("checked", true);
  }

  /*
   * var readTargetAmount = intergerHumanFormat(kpiData.kpiValue.target); var
   * readTargetAmount = kpiData.kpiValue.target; var kpiTarget =
   * (kpiData.kpiValue.targetCurrency == undefined ||
   * kpiData.kpiValue.targetCurrency ==
   * ""?readTargetAmount:kpiData.kpiValue.targetCurrency+readTargetAmount);
   */

  var numberchartTarget = splitnumbercharacter(kpiData.kpiValue.target);
  var kpiTarget = "";
  if (typeof numberchartTarget["number"] == "number") {
    numberchartTarget["number"] = convertInttoStringAndStringtoInt(
      numberchartTarget["number"]
    );
  }
  var targetcurrency =
    kpiData.kpiValue.targetCurrency != undefined &&
    kpiData.kpiValue.targetCurrency != ""
      ? kpiData.kpiValue.targetCurrency
      : "";
  kpiTarget =
    targetcurrency +
    numberchartTarget["firstletter"] +
    formatNumber(numberchartTarget["number"]) +
    numberchartTarget["lastletter"];

  //$("#targetamount").val(kpiTarget);

  $("#kpiCreatedBy").html(kpiData.kpiValue.createdByName);
  $("#kpiUpdatedBy").html(kpiData.kpiValue.updatedByName);
  $("#kpiCreatedByDate").html(kpiData.createDateString);
  $("#kpiUpdatedByDate").html(kpiData.updatedDateString);

  /*
	if (kpiData.kpiFormula.period != null && kpiData.kpiFormula.period != ""
			&& kpiData.kpiFormula.period != "undefined") {
		$("#kpi_start_end_date").val(kpiData.kpiFormula.period)
	}
	*/
  if (kpiData.includeReportee != null && kpiData.includeReportee != undefined) {
    $("#includeReportees").val(kpiData.includeReportee);
  }
  if (kpiData.customReportees != null && kpiData.customReportees != undefined) {
    $("#customreportee").val(kpiData.customReportees);
  }

  $.ajax({
    url: "/stratroom/retrieveNodeKeyList",
    success: function (nodekeylist) {
      $.each(nodekeylist, function (index, nodekey) {
        if (measureFieldenable == false) {
          if (nodekey.measureType == 0) {
            addOption("#nodekey", nodekey.measureName, nodekey.nodeKey);
          }
        } else if (measureFieldenable == true) {
          addOption("#nodekey", nodekey.measureName, nodekey.nodeKey);
        }
      });
      if (kpiData.kpiFormula.elementName != "") {
        $("#nodekey").val(kpiData.kpiFormula.elementName);
      }
    },
  });
}

function colorcodevalue(colorvalue) {
  var color = "#000000";
  if (colorvalue != "" && colorvalue != undefined) {
    var colorstartposition = colorvalue.indexOf("rgb");
    var colorendposition = colorvalue.indexOf(")") + 1;
    if (colorstartposition != -1 && colorendposition != -1) {
      color = colorvalue.substr(colorstartposition, colorendposition);
    } else {
      color = colorvalue;
    }
  }
  return color;
}

function getKpiObj(action) {
  var arr = $.map(reporteelist, function (obj, i) {
    return obj.id;
  });

  var thresholdupdateflag = false;
  if (action == "edit") {
    var option1emlemt = $("#optioncolor1");
    var option2emlemt = $("#optioncolor2");
    var option3emlemt = $("#optioncolor3");
    var option4emlemt = $("#optioncolor4");
    var option5emlemt = $("#optioncolor5");

    if (
      $(option1emlemt).attr("data-oldvalue") != $(option1emlemt).val() ||
      $(option2emlemt).attr("data-oldvalue") != $(option2emlemt).val() ||
      $(option3emlemt).attr("data-oldvalue") != $(option3emlemt).val() ||
      $(option4emlemt).attr("data-oldvalue") != $(option4emlemt).val() ||
      $(option5emlemt).attr("data-oldvalue") != $(option5emlemt).val()
    ) {
      thresholdupdateflag = true;
    }
  }

  var kpiThresholdvalue = $("#kpi_threshold").val();
  var kpiObj = {
    owner: $("#kpi_owner").val(),
    objectiveId: $("#kpiForm input[name='objectiveId']").val(),
    createdBy: $("#kpiCreatedById").val(),
    kpiId: $("#kpi_display_id").val(),
    thresholdvalueupdate: thresholdupdateflag,
    kpiFormula: {
      formula: $(".kpi_formula").val(),
      //"empployeeIds" : arr,
      //	"period" : $("#datePeriod").val(),
      fieldName: $("#kpiFieldName").val(),
    },
    performanceFormula: {
      formula: $("#kpi_performance").val(),
      //		"empployeeIds" : arr,
      //		"period" : $("#datePeriod").val(),
      fieldName: $("#performanceFieldName").val(),
    },
    kpiValue: {
      kpiId: $("#kpi_id").val(),
      name: $("#kpi_name").val(),
      description: $("#kpi_description").val(),
      kpiType: $("#kpi_type").val(),
      kpi_measurement: $("#kpi_measurement").val(),
      kpi_datasource: $("#kpi_datasource").val(),
      kpi_start_end_date: $("#kpi_start_end_date").val(),
      contribution: $("#kpi_contribution").val(),
      weight: $("#kpi_weight").val(),
      subweight: $("#kpi_sub_weight").val(),
      target: "", //$("#targetamount").val(),
      thresholdFormula: $("#kpi_performance").val(),
      targetCurrency: "",
      status: $("#inputState").val(),
      dataType: $("#kpiDataType").val(),
      kpiCurrency: $("#kpiCurrencyvalue").val(),
      ytdFormula: $(".kpiYtdFormula").val(),
      threshold: kpiThresholdvalue,
      optioncolor1: $("#optioncolor1").val(),
      optioncolor2: $("#optioncolor2").val(),
      optioncolor3: $("#optioncolor3").val(),
      optioncolor4: $("#optioncolor4").val(),
      optioncolor5: $("#optioncolor5").val(),
      target: "0",
      // "target":$("#kpiTarget").val()
    },
  };
  // kpiObj.kpiValue['optioncolor1colorvalue'] =
  // colorcodevalue($("#optioncolor1").next('.input-group-append').children().css('background-color'));
  if (
    controlpanelScorecardSettings.threshold &&
    (controlpanelScorecardSettings.threshold == "option_3" ||
      controlpanelScorecardSettings.threshold == "three_status")
  ) {
    kpiObj.kpiValue["optioncolor1colorvalue"] = $("#optioncolor1")
      .next(".input-group-append")
      .children()
      .css("background-color");
    kpiObj.kpiValue["optioncolor2colorvalue"] = $("#optioncolor2")
      .next(".input-group-append")
      .children()
      .css("background-color");
    kpiObj.kpiValue["optioncolor3colorvalue"] = $("#optioncolor3")
      .next(".input-group-append")
      .children()
      .css("background-color");
  } else if (
    controlpanelScorecardSettings.threshold &&
    (controlpanelScorecardSettings.threshold == "option_5" ||
      controlpanelScorecardSettings.threshold == "five_status")
  ) {
    kpiObj.kpiValue["optioncolor1colorvalue"] = $("#optioncolor1")
      .next(".input-group-append")
      .children()
      .css("background-color");
    kpiObj.kpiValue["optioncolor2colorvalue"] = $("#optioncolor2")
      .next(".input-group-append")
      .children()
      .css("background-color");
    kpiObj.kpiValue["optioncolor3colorvalue"] = $("#optioncolor3")
      .next(".input-group-append")
      .children()
      .css("background-color");
    kpiObj.kpiValue["optioncolor4colorvalue"] = $("#optioncolor4")
      .next(".input-group-append")
      .children()
      .css("background-color");
    kpiObj.kpiValue["optioncolor5colorvalue"] = $("#optioncolor5")
      .next(".input-group-append")
      .children()
      .css("background-color");
  }

  /*$.each($("input[name='kpi_fields']:checked"), function(idx) {
		if($(this).val()	==	"Actual"){
			kpiObj.kpiValue['header1'] 	= 	$(this).val();
		}else if($(this).val()	==	"Target"){
			kpiObj.kpiValue['header2'] 	= 	$(this).val();
		}else if($(this).val()	==	"Budget"){
			kpiObj.kpiValue['header3'] 	= 	$(this).val();
		}else if($(this).val()	==	"Forecast"){
			kpiObj.kpiValue['header4'] 	= 	$(this).val();
		}
	})*/ kpiObj.kpiValue["customthresholdenable"] = false;

  if ($("#chk_custom_threshold").is(":checked") == true) {
    kpiObj.kpiValue["customthresholdenable"] = true;
  }

  var existdatadonotupdate = [
    "kpiId",
    "name",
    "description",
    "kpiType",
    "kpi_measurement",
    "kpi_datasource",
    "kpi_start_end_date",
    "weight",
    "subweight",
    "target",
    "thresholdFormula",
    "status",
    "dataType",
    "kpiCurrency",
    "ytdFormula",
    "contribution",
    "threshold",
    "optioncolor1",
    "optioncolor2",
    "optioncolor3",
    "optioncolor4",
    "optioncolor5",
    "header1",
    "header2",
    "header3",
    "header4",
    "customthresholdenable",
    "optioncolor1colorvalue",
    "optioncolor2colorvalue",
    "optioncolor1colorvalue",
    "optioncolor2colorvalue",
    "optioncolor3colorvalue",
    "optioncolor1colorvalue",
    "optioncolor2colorvalue",
    "optioncolor3colorvalue",
    "optioncolor4colorvalue",
    "optioncolor5colorvalue",
    "kpiFormula"
  ];
  if (
    action == "edit" &&
    (parentKpidetails !== undefined || parentKpidetails != "")
  ) {
    // KpiObj["id"] = $("#kpi_id").val();
    // KpiObj["objectiveId"] = parentKpidetails.objectiveId;
    $.each(parentKpidetails.kpiValue, function (index, value) {
      if ($.inArray(index, existdatadonotupdate) == -1) {
        kpiObj["kpiValue"][index] = value;
      }
    });

    // KpiObj["kpiFormula"] = parentKpidetails.kpiFormula;
  }
   console.log(kpiObj, "kpiOj")

  return kpiObj;


}

function handleKpiSave() {
  var action = $("#kpiForm input[name='action']").val();
  if (action == "delete") {
  } else {
    var kpiObj = getKpiObj(action);
    var methodType = "post";
    if (action == "add") {
      kpiObj.includeReportee = false;
      kpiObj.customReportees = $("#customreportee").val();
    } else if (action == "edit") {
      kpiObj.id = $("#kpi_id").val();
      kpiObj.includeReportee = $("#includeReportees").val();
      kpiObj.customReportees = $("#customreportee").val();

      methodType = "put";
    }

    var numberformatResult = specialcharsconvertToNumberFormat(
      kpiObj.kpiValue.target
    );
    kpiObj["kpiValue"]["target"] = numberformatResult["number"];
    kpiObj["kpiValue"]["targetCurrency"] = numberformatResult["currency"];

    if (kpiObj.kpiValue.actual != undefined && kpiObj.kpiValue.actual != "") {
      var numberformatResult = specialcharsconvertToNumberFormat(
        kpiObj.kpiValue.actual
      );
      kpiObj["kpiValue"]["actual"] = numberformatResult["number"];
      kpiObj["kpiValue"]["actualCurrency"] = numberformatResult["currency"];
    }

    if (kpiObj.kpiValue.gap != undefined && kpiObj.kpiValue.gap != "") {
      var numberformatResult = specialcharsconvertToNumberFormat(
        kpiObj.kpiValue.gap
      );
      kpiObj["kpiValue"]["gap"] = numberformatResult["number"];
      kpiObj["kpiValue"]["gapCurrency"] = numberformatResult["currency"];
    }

    console.log(kpiObj, "kpiObj");

    $.ajax({
      url: "/stratroom/kpi/",
      type: methodType,
      contentType: "application/json",
      data: JSON.stringify(kpiObj),
      success: function (data, status) {
        $("#closeKpimodal").click();
        location.reload(true);
        console.log("New KPI was created..");
      },
    });
  }
}
function getSubKpiObj(action) {
  var arr = $.map(reporteelist, function (obj, i) {
    return obj.id;
  });

  var thresholdupdateflag = false;
  if (action == "edit") {
    var option1emlemt = $("#optioncolor1");
    var option2emlemt = $("#optioncolor2");
    var option3emlemt = $("#optioncolor3");
    var option4emlemt = $("#optioncolor4");
    var option5emlemt = $("#optioncolor5");

    if (
      $(option1emlemt).attr("data-oldvalue") != $(option1emlemt).val() ||
      $(option2emlemt).attr("data-oldvalue") != $(option2emlemt).val() ||
      $(option3emlemt).attr("data-oldvalue") != $(option3emlemt).val() ||
      $(option4emlemt).attr("data-oldvalue") != $(option4emlemt).val() ||
      $(option5emlemt).attr("data-oldvalue") != $(option5emlemt).val()
    ) {
      thresholdupdateflag = true;
    }
  }

  var kpiThresholdvalue = $("#subkpi_threshold").val();
  var kpiObj = {
    owner: $("#subkpi_owner").val(),
    subKpiName: $("#subkpi_name").val(),
    kpiId: $("#subkpi_display_id").val(),
    objectiveId: $("#subkpiForm input[name='subobjectiveId']").val(),
    thresholdvalueupdate: thresholdupdateflag,
    kpiFormula: {
      formula: $(".kpi_formula").val(),
      //"empployeeIds" : arr,
      //	"period" : $("#datePeriod").val(),
      fieldName: $("#kpiFieldName").val(),
    },
    performanceFormula: {
      formula: $("#kpi_performance").val(),
      //		"empployeeIds" : arr,
      //		"period" : $("#datePeriod").val(),
      fieldName: $("#performanceFieldName").val(),
    },
    subKpiValue: {
      kpiId: $("#subkpi_display_id").val(),
      subMeasureName: $("#subkpi_name").val(),
      description: $("#subkpi_description").val(),
      kpiType: $("#subkpi_type").val(),
      kpi_measurement: $("#subkpi_measurement").val(),
      kpi_datasource: $("#subkpi_datasource").val(),
      kpi_start_end_date: $("#subkpi_start_end_date").val(),
      contribution: $("#subkpi_contribution").val(),
      weight: $("#subkpi_weight").val(),
      subweight: $("#subkpi_sub_weight").val(),
      thresholdFormula: $("#subkpi_performance").val(),
      targetCurrency: "",
      threshold: kpiThresholdvalue,
      status: $("#subkpiinputState").val(),
      dataType: $("#subkpiDataType").val(),
      kpiCurrency: $("#subkpiCurrencyvalue").val(),
      ytdFormula: $("#subkpiYtdFormula").val(),
      optioncolor1: $("#optioncolor1").val(),
      optioncolor2: $("#optioncolor2").val(),
      optioncolor3: $("#optioncolor3").val(),
      optioncolor4: $("#optioncolor4").val(),
      optioncolor5: $("#optioncolor5").val(),
      target: "0",
    },
  };
  // kpiObj.subKpiValue['optioncolor1colorvalue'] =
  // colorcodevalue($("#optioncolor1").next('.input-group-append').children().css('background-color'));
  if (
    controlpanelScorecardSettings.threshold &&
    (controlpanelScorecardSettings.threshold == "option_3" ||
      controlpanelScorecardSettings.threshold == "three_status")
  ) {
    kpiObj.subKpiValue["optioncolor1colorvalue"] = $("#optioncolor1")
      .next(".input-group-append")
      .children()
      .css("background-color");
    kpiObj.subKpiValue["optioncolor2colorvalue"] = $("#optioncolor2")
      .next(".input-group-append")
      .children()
      .css("background-color");
    kpiObj.subKpiValue["optioncolor3colorvalue"] = $("#optioncolor3")
      .next(".input-group-append")
      .children()
      .css("background-color");
  } else if (
    controlpanelScorecardSettings.threshold &&
    (controlpanelScorecardSettings.threshold == "option_5" ||
      controlpanelScorecardSettings.threshold == "five_status")
  ) {
    kpiObj.subKpiValue["optioncolor1colorvalue"] = $("#optioncolor1")
      .next(".input-group-append")
      .children()
      .css("background-color");
    kpiObj.subKpiValue["optioncolor2colorvalue"] = $("#optioncolor2")
      .next(".input-group-append")
      .children()
      .css("background-color");
    kpiObj.subKpiValue["optioncolor3colorvalue"] = $("#optioncolor3")
      .next(".input-group-append")
      .children()
      .css("background-color");
    kpiObj.subKpiValue["optioncolor4colorvalue"] = $("#optioncolor4")
      .next(".input-group-append")
      .children()
      .css("background-color");
    kpiObj.subKpiValue["optioncolor5colorvalue"] = $("#optioncolor5")
      .next(".input-group-append")
      .children()
      .css("background-color");
  }

  /*$.each($("input[name='kpi_fields']:checked"), function(idx) {
		if($(this).val()	==	"Actual"){
			kpiObj.subKpiValue['header1'] 	= 	$(this).val();
		}else if($(this).val()	==	"Target"){
			kpiObj.subKpiValue['header2'] 	= 	$(this).val();
		}else if($(this).val()	==	"Budget"){
			kpiObj.subKpiValue['header3'] 	= 	$(this).val();
		}else if($(this).val()	==	"Forecast"){
			kpiObj.subKpiValue['header4'] 	= 	$(this).val();
		}
	})*/ kpiObj.subKpiValue["customthresholdenable"] = false;

  if ($("#chk_custom_threshold").is(":checked") == true) {
    kpiObj.subKpiValue["customthresholdenable"] = true;
  }

  var existdatadonotupdate = [
    "kpiId",
    "name",
    "description",
    "kpiType",
    "kpi_measurement",
    "kpi_datasource",
    "kpi_start_end_date",
    "weight",
    "subweight",
    "target",
    "thresholdFormula",
    "status",
    "dataType",
    "kpiCurrency",
    "ytdFormula",
    "threshold",
    "optioncolor1",
    "optioncolor2",
    "optioncolor3",
    "optioncolor4",
    "optioncolor5",
    "header1",
    "header2",
    "header3",
    "header4",
    "customthresholdenable",
    "optioncolor1colorvalue",
    "optioncolor2colorvalue",
    "optioncolor1colorvalue",
    "optioncolor2colorvalue",
    "optioncolor3colorvalue",
    "optioncolor1colorvalue",
    "optioncolor2colorvalue",
    "optioncolor3colorvalue",
    "optioncolor4colorvalue",
    "optioncolor5colorvalue",
  ];
  if (
    action == "edit" &&
    (parentKpidetails !== undefined || parentKpidetails != "")
  ) {
    // KpiObj["id"] = $("#kpi_id").val();
    // KpiObj["objectiveId"] = parentKpidetails.objectiveId;
    $.each(parentKpidetails.subKpiValue, function (index, value) {
      if ($.inArray(index, existdatadonotupdate) == -1) {
        kpiObj["subKpiValue"][index] = value;
      }
    });

    // KpiObj["kpiFormula"] = parentKpidetails.kpiFormula;
  }

  return kpiObj;
}
populatekpiOwnerDropdownScorecard("#subkpi_owner");

function handleSubKpiSave(event) {
  event.preventDefault();

  var action = $("#kpiForm input[name='action']").val();

  var kpiObj = getSubKpiObj(action);
  console.log(kpiObj, "kpiObj");

  $.ajax({
    url: "/stratroom/subKpi",
    type: "post",
    contentType: "application/json",
    data: JSON.stringify(kpiObj),
    success: function (data, status) {
      $("#closeKpimodal").click();
      location.reload(true);
      console.log("New KPI was created..");
    },
  });
}

function handleFormulaValidate(component) {
  validateFormula("Validate", component);
}

function validateFormula(inputType, component) {
  console.log(inputType, component, "inputType,component");
  var formulaValue;
  if (component == "KPI") {
    formulaValue = $("#formula").val();
  } else if (component == "YTD") {
    formulaValue = $("#customYtdformula").val();
  } else if (component == "OBJECTIVE") {
    formulaValue = $("#formulaCustomObjective").val();
  } else if (component == "PERSPECTIVE") {
    formulaValue = $("#formulaCustomPerspective").val();
  } else if (component == "SCORECARDCONFIG") {
    formulaValue = $("#formulaScoreCardPerspective").val();
  } else if (component == "KPIPERFORMANCE") {
    formulaValue = $("#performanceformula").val();
  } else {
    formulaValue = $("#thresholdformula").val();
  }
  var formulaJson = {
    formula: formulaValue,
    type: component,
  };
  console.log(formulaValue, "forval");
  $.ajax({
    url: "/stratroom/validateFormula/",
    type: "post",
    contentType: "application/json",
    data: JSON.stringify(formulaJson),
    success: function (data, message) {
      console.log(data, "data");
      if (data != "valid") {
        if (component == "KPI") {
          $("#formula").val(formulaValue);
          console.log(formulaValue, "formula value");
          $("#formula").css("border", "2px solid red");
           $(".kpi_formula").val("");
           $("#closePopupId").click();
        } else if (component == "YTD") {
          $("#customYtdformula").val(formulaValue);
          $("#customYtdformula").css("border", "2px solid red");
        } else if (component == "OBJECTIVE") {
          $("#formulaCustomObjective").val(formulaValue);
          $("#formulaCustomObjective").css("border", "2px solid red");
        } else if (component == "PERSPECTIVE") {
          $("#formulaCustomPerspective").val(formulaValue);
          $("#formulaCustomPerspective").css("border", "2px solid red");
        } else if (component == "SCORECARDCONFIG") {
          $("#formulaScoreCardPerspective").val(formulaValue);
          $("#formulaScoreCardPerspective").css("border", "2px solid red");
        } else if (component == "KPIPERFORMANCE") {
          $("#performanceformula").val(formulaValue);
          $("#performanceformula").css("border", "2px solid red");
        } else {
          $("#thresholdformula").val(formulaValue);
          $("#thresholdformula").css("border", "2px solid red");
        }
        /*if (performanceformula != null || performanceformula != '') {
			         var str = performanceformula.toString();
			         if (str.indexOf('.', str.indexOf('.') + 1) != -1) {
			        	 console.log("ok");
			         }
			      }else {
					$("#thresholdformula").val(formulaValue);
					$("#thresholdformula").css("border","2px solid red");
				}*/
      } else {
        if (inputType == "Validate") {
          if (component == "KPI") {
            $("#formula").val(formulaValue);
            $("#formula").css("border", "2px solid green");
          } else if (component == "YTD") {
            $("#customYtdformula").val(formulaValue);
            $("#customYtdformula").css("border", "2px solid green");
          } else if (component == "OBJECTIVE") {
            $("#formulaCustomObjective").val(formulaValue);
            $("#formulaCustomObjective").css("border", "2px solid green");
          } else if (component == "PERSPECTIVE") {
            $("#formulaCustomPerspective").val(formulaValue);
            $("#formulaCustomPerspective").css("border", "2px solid green");
          } else if (component == "SCORECARDCONFIG") {
            $("#formulaScoreCardPerspective").val(formulaValue);
            $("#formulaScoreCardPerspective").css("border", "2px solid green");
          } else if (component == "KPIPERFORMANCE") {
            $("#performanceformula").val(formulaValue);
            $("#performanceformula").css("border", "2px solid green");
          } else {
            $("#thresholdformula").val(formulaValue);
            $("#thresholdformula").css("border", "2px solid green");
          }
        } else {
          if (component == "KPI") {
            $(".kpi_formula").val("");
            $(".kpi_formula").val(formulaValue);
            $("#kpiFieldName").val($("#fieldId").val());
            $("#closePopupId").click();
          } else if (component == "YTD") {
            $(".kpiYtdFormula").val("");
            $(".kpiYtdFormula").val(formulaValue);
            $("#ytdClosePopupId").click();
          } else if (component == "OBJECTIVE") {
            $("#custom_objective").val("");
            $("#custom_objective").val(formulaValue);
            $("#objectiveClosePopupId").click();
          } else if (component == "PERSPECTIVE") {
            $("#custom_perspective").val("");
            $("#custom_perspective").val(formulaValue);
            $("#perspectiveClosePopupId").click();
          } else if (component == "SCORECARDCONFIG") {
            $("#scorecard_formula").val("");
            $("#scorecard_formula").val(formulaValue);
            $("#scorecardClosePopupId").click();
          } else if (component == "KPIPERFORMANCE") {
            $("#kpi_performance").val("");
            $("#kpi_performance").val(formulaValue);
            $("#performanceFieldName").val($("#performancefieldId").val());
            $("#kpiperclosePopupId").click();
          } else {
            $("#kpi_performance").val("");
            $("#kpi_performance").val(formulaValue);
            $("#threClosePopupId").click();
          }
        }
      }
    },
  });
}

$(document).on("focusout", "#formula", function () {
  $(this).css("border", "1px solid black");
});

$(document).on("focusout", "#customYtdformula", function () {
  $(this).css("border", "1px solid black");
});

$(document).on("focusout", "#thresholdformula", function () {
  $(this).css("border", "1px solid black");
});

$(document).on("focusout", "#performanceformula", function () {
  $(this).css("border", "1px solid black");
});

function checkmodalisclosedornot() {
  if ($(".kpi_description_popup").is(":visible") == true) {
    $(document.body).addClass("modal-open");
  }
  if ($(".kpi_formula_popup").is(":visible") == false) {
    $(document.body).addClass("modal-open");
  }
  if ($(".kpi_custom_threshold_popup").is(":visible") == false) {
    $(document.body).addClass("modal-open");
  }
  if ($(".scorecard_custom_threshold_popup").is(":visible") == false) {
    $(document.body).addClass("modal-open");
  }
  if ($(".perspectives_description_popup").is(":visible") == false) {
    $(document.body).addClass("modal-open");
  }
  if ($(".objective_description_popup").is(":visible") == false) {
    $(document.body).addClass("modal-open");
  }
  if ($(".kpi_performanceformula_popup").is(":visible") == false) {
    $(document.body).addClass("modal-open");
  }
  if ($(".kpiYtdFormulaPoPUp").is(":visible") == false) {
    $(document.body).addClass("modal-open");
  }

  setTimeout(function () {
    $(document.body).addClass("modal-open");
  }, 1000);
}

$("#closePopupId,#kpiperclosePopupId").click(function () {
  checkmodalisclosedornot();
});

$(
  "#threClosePopupId,#ytdClosePopupId,#perspectiveClosePopupId,#objectiveClosePopupId,#scorecardClosePopupId"
).click(function () {
  checkmodalisclosedornot();
});
function handleFormulaAdd(component) {
  validateFormula("Add", component);
}

function handleFormulaEvent(component) {
  console.log(component, "component");
  if (component == "KPI") {
    // Clear existing values and initialize formula builder
    $("#fieldmeasurefilter,#fieldsubmeasurefilter,#fieldinitiativefilter").val("");
    $(".formulacontentdesc").html(getformulabuilder("if"));
    $(".formulaheaderdesc").html("if".toUpperCase());
    $("#measureNames,#kpisubmeasureNames,#kpiinitiativeNames").empty();
    $("#formula").css("border", "1px solid black");

    const getkpiformulaval = $(".kpi_formula").val();
    $(".custom-tab-kpiformula .btn-custom-secondary:eq(1)").hide();

    if (measureFieldenable) {
      $(".custom-tab-kpiformula .btn-custom-secondary:eq(1)").show();
    }

    // Set formula value
    $("#formula").val(getkpiformulaval);
    $.ajax({
      url: "/stratroom/retrieveNodeKeyList",
      success: function (nodekeylist) {
        $("#measureNames").empty();
        $("#kpisubmeasureNames").empty();
        $("#kpiinitiativeNames").empty();
        $.each(nodekeylist, function (index, nodekey) {
          let highlight = "";
          if (
            getkpiformulaval !== "" &&
            getkpiformulaval.search(nodekey.measureName) !== -1
          ) {
            highlight = "kpiformuladescHighlight";
          }

          if (nodekey.measureType == 0) {
            addList(
              "#measureNames",
              nodekey.measureName,
              nodekey.nodeKey,
              highlight,
              "main"
            );
          }

          if (measureFieldenable && nodekey.measureType == 1) {
            addList(
              "#kpisubmeasureNames",
              nodekey.measureName,
              nodekey.nodeKey,
              highlight,
              "sub"
            );
          }
        });
      },
    });

    var currentEmp = $("#userPrincipal").val();
    console.log(currentEmp, "currentEmp");
    // Fetch additional initiatives
    $.ajax({
      url: "/stratroom/initiativesListByEmpId/" + currentEmp,
      success: function (initiativeslist) {
        $.each(initiativeslist, function (index, initiatives) {
          var highlight = "";
          if (
            getkpiformulaval != "" &&
            getkpiformulaval.search(initiatives.initiativeValue.name) != -1
          ) {
            highlight = "kpiformuladescHighlight";
          }

          const initiativeName = initiatives.initiativeValue.name;
          addList(
            "#kpiinitiativeNames",
            initiativeName,
            initiatives.id,
            highlight,
            "init"
          );
        });
      },
    });
  } else if (component == "KPIPERFORMANCE") {
    // Initialize performance fields
    $("#Performancefieldmeasurefilter").val("");
    $(".formulacontentdesc").html(getformulaperformance("if"));
    $(".formulaheaderdesc").html("if".toUpperCase());
    $("#PerformancemeasureNames").empty();
    $("#performanceformula").css("border", "1px solid black");

    $("#performanceformula").off("keypress").on("keypress", function (evt) {
      const keycode = evt.charCode || evt.keyCode;
      if (keycode == 46) {
        return false;
      }
    });

    const getkpiformulaval = $("#subkpi_performance").val();
    $("#performanceformula").val(getkpiformulaval);

    const actualhighlight = getkpiformulaval.includes("Actual")
      ? "kpiformuladescHighlight"
      : "";
    const targethighlight = getkpiformulaval.includes("Target")
      ? "kpiformuladescHighlight"
      : "";
    const weighthighlight = getkpiformulaval.includes("Weight")
      ? "kpiformuladescHighlight"
      : "";
      const contributionhighlight = getkpiformulaval.includes('Contribution') ? "kpiformuladescHighlight" : "";

    $("#PerformancemeasureNames").append(`
      <li class="list-group-item ${actualhighlight}" onclick="updatePerformance('Actual','',this)">Actual</li>
      <li class="list-group-item ${targethighlight}" onclick="updatePerformance('Target','',this)">Target</li>
      <li class="list-group-item ${weighthighlight}" onclick="updatePerformance('Weight','',this)">Weight</li>
      <li class="list-group-item ${contributionhighlight}" onclick="updatePerformance('Contribution','',this)">Contribution</li>
    `);

    // Fix for the focus issue
  // $(".kpi_performanceformula_popup").off("shown.bs.modal").one("shown.bs.modal", function() {
      
  //   });
// $(".kpi_performanceformula_popup").on("show.bs.modal", function() {
//   // Disable enforceFocus for this modal
//   $(this).data('bs.modal')._enforceFocus = function() {};
// });

  // $(".kpi_performanceformula_popup").on("shown.bs.modal", function() {
  //   setTimeout(() => {
  //     $("#performanceformula").focus();
  //   }, 100);
  // });

  }

}

function handleCustomThresholdEvent(component) {
  if (component == "OBJECTIVE") {
    $("#objectivecustomfieldmeasurefilter").val("");
    $(".formulacontentdesc").html(getformulabuilder("if"));
    $(".formulaheaderdesc").html("if".toUpperCase());
    var formulaVal = $("#custom_objective").val();
    $("#formulaCustomObjective").css("border", "1px solid black");
    $("#formulaCustomObjective").val(formulaVal);
    $("#objectiveMeasureNames").empty();

    $.ajax({
      url:
        "/stratroom/measureNames/" +
        $("#objective_id").val() +
        "?component=OBJECTIVE",
      success: function (nodekeylist) {
        $.each(nodekeylist, function (index, nodekey) {
          var highlight = "";
          if (formulaVal != "" && formulaVal.search(index) != -1) {
            highlight = "kpiformuladescHighlight";
          }

          $("#objectiveMeasureNames").append(
            `<li class="list-group-item ` +
              highlight +
              `" data-value="${index}" onclick="updateCustomObjective('${index}','',this)">${nodekeylist[index]}</li>`
          );
        });
      },
    });
    $(".objective_custom_threshold_popup").on("shown.bs.modal", function () {
      $("#formulaCustomObjective").focus();
    });
  } else if (component == "PERSPECTIVE") {
    $("#perspectivefieldmeasurefilter").val("");
    $(".formulacontentdesc").html(getformulabuilder("if"));
    $(".formulaheaderdesc").html("if".toUpperCase());
    var formulaVal = $("#custom_perspective").val();
    $("#formulaCustomPerspective").css("border", "1px solid black");
    $("#formulaCustomPerspective").on("keypress", function (evt) {
      var keycode = evt.charCode || evt.keyCode;
      if (keycode == 46) {
        return false;
      }
    });
    $("#formulaCustomPerspective").val(formulaVal);
    $("#perspectiveMeasureNames").empty();

    $.ajax({
      url:
        "/stratroom/measureNames/" +
        $("#perspectiveId").val() +
        "?component=PERSPECTIVE",
      success: function (nodekeylist) {
        $.each(nodekeylist, function (index, nodekey) {
          var highlight = "";
          if (formulaVal != "" && formulaVal.search(index) != -1) {
            highlight = "kpiformuladescHighlight";
          }
          $("#perspectiveMeasureNames").append(
            `<li class="list-group-item ` +
              highlight +
              `" data-value="${index}" onclick="updateCustomPerspective('${index}','',this)">${nodekeylist[index]}</li>`
          );
        });
      },
    });
    $(".perspective_custom_threshold_popup").on("shown.bs.modal", function () {
      $("#formulaCustomPerspective").focus();
    });
  } else if (component == "SCORECARDCONFIG") {
    $("#scoreCardmeasurefilter").val("");
    $(".formulacontentdesc").html(getformulaperformance("if"));
    $(".formulaheaderdesc").html("if".toUpperCase());
    var formulaVal = $("#scorecard_formula").val();
    $("#formulaScoreCardPerspective").css("border", "1px solid black");
    $("#formulaScoreCardPerspective").val(formulaVal);
    $("#scorecardMeasureNames").empty();

    $.ajax({
      url:
        "/stratroom/measureNames/" +
        $("#pagenumber").val() +
        "?component=SCORECARDCONFIG",
      success: function (nodekeylist) {
        $.each(nodekeylist, function (index, nodekey) {
          var highlight = "";
          if (formulaVal != "" && formulaVal.search(nodekeylist[index]) != -1) {
            highlight = "kpiformuladescHighlight";
          }
          $("#scorecardMeasureNames").append(
            `<li class="list-group-item ` +
              highlight +
              `" onclick="updateScorecardPerspective('${index}','',this)">${nodekeylist[index]}</li>`
          );
        });
      },
    });

    $(".scorecard_custom_threshold_popup").on("shown.bs.modal", function () {
      $("#formulaScoreCardPerspective").focus();
    });
  } else {
    var getkpiformulaval = $("#kpi_performance").val();
    $("#thresholdformula").css("border", "1px solid black");
    $("#thresholdformula").val(getkpiformulaval);
    $(".kpi_custom_threshold_popup").on("shown.bs.modal", function () {
      $("#thresholdformula").focus();
    });
  }
}

function updateScorecardPerspective(input, formuladesc, currentElement) {
  if (formuladesc != "" && formuladesc != null) {
    if ($(".formuladynamicdesc").css("display") == "none") {
      $(".formuladynamicdesc").show();
    }
    $(".formulacontentdesc").html(getformulaperformance(formuladesc));
    $(".formulaheaderdesc").html(input.toUpperCase());
  }

  var box = $("#formulaScoreCardPerspective");
  var mesaureName = input;
  var formulaval = box.val();
  var checkdefaultvalue = false;
  var finalval = formulaval + mesaureName;
  if ($(currentElement).hasClass("kpiformuladescHighlight")) {
    if (formulaval != "" && formulaval.lastIndexOf(mesaureName) != -1) {
      var splitmeasure = formulaval.lastIndexOf(mesaureName);
      var removestr = mesaureName.length;
      var remaingingstr = splitmeasure + removestr;
      $(currentElement).removeClass("kpiformuladescHighlight");
      box.val(
        formulaval.slice(0, splitmeasure) + formulaval.slice(remaingingstr)
      );
      document
        .getElementById("formulaScoreCardPerspective")
        .setSelectionRange(splitmeasure, splitmeasure);
    }
  } else {
    var curPos = document.getElementById(
      "formulaScoreCardPerspective"
    ).selectionStart;
    var lastpos = parseInt(
      formulaval.slice(0, curPos).length + mesaureName.length
    );
    box.val(
      formulaval.slice(0, curPos) + mesaureName + formulaval.slice(curPos)
    );
    document
      .getElementById("formulaScoreCardPerspective")
      .setSelectionRange(lastpos, lastpos);
    $(currentElement).addClass("kpiformuladescHighlight");
  }
  // box.val(finalval);
}

function handleYTDFormulaEvent() {
  $("#ytdFieldmeasurefilter,#ytdFieldsubmeasurefilter").val("");
  $(".formulacontentdesc").html(getformulabuilder("if"));
  $(".formulaheaderdesc").html("if".toUpperCase());
  var getkpiformulaval = $(".kpiYtdFormula").val();
  $("#customYtdformula").val(getkpiformulaval);
  $("#customYtdformula").css("border", "1px solid black");
  $("#ytdMeasureNames,#ytdsubMeasureNames,#ytdinitiativeNames").empty();
  $(".custom-tab-ytdkpiformula .btn-custom-secondary:eq(1)").hide();
  if (measureFieldenable == true) {
    $(".custom-tab-ytdkpiformula .btn-custom-secondary:eq(1)").show();
  }

  $.ajax({
    url: "/stratroom/retrieveNodeKeyList",
    success: function (nodekeylist) {
      $.each(nodekeylist, function (index, nodekey) {
        var highlight = "";
        if (
          getkpiformulaval != "" &&
          getkpiformulaval.search(nodekey.measureName) != -1
        ) {
          highlight = "kpiformuladescHighlight";
        }
        if (nodekey.measureType == 0) {
          addToYTDList(
            "#ytdMeasureNames",
            nodekey.measureName,
            nodekey.nodeKey,
            highlight,
            "main"
          );
        }
        if (measureFieldenable == true && nodekey.measureType == 1) {
          addToYTDList(
            "#ytdsubMeasureNames",
            nodekey.measureName,
            nodekey.nodeKey,
            highlight,
            "sub"
          );
        }
      });
    },
  });
  var currentEmp = $("#userPrincipal").val();
  console.log(currentEmp, "currentEmp");
  // Fetch additional initiatives
  $.ajax({
    url: "/stratroom/initiativesListByEmpId/" + currentEmp,
    success: function (initiativeslist) {
      $.each(initiativeslist, function (index, initiatives) {
        var highlight = "";
        if (
          getkpiformulaval != "" &&
          getkpiformulaval.search(initiatives.initiativeValue.name) != -1
        ) {
          highlight = "kpiformuladescHighlight";
        }

        const initiativeName = initiatives.initiativeValue.name;
        addToYTDList(
          "#ytdinitiativeNames",
          initiativeName,
          initiatives.id,
          highlight,
          "init"
        );
      });
    },
  });

  $(".kpiYtdFormulaPoPUp").on("shown.bs.modal", function () {
    $("#customYtdformula").focus();
  });
}

function handleKpiEvent(id, action, objectiveId) {
  const selectedLang = localStorage.getItem("selectedLang") || "en";
  console.log(selectedLang, "selectedLang")
 if (action == "add") {
  if (selectedLang == "en") {
    $(".kpiHeader").text("Add KPI");
  } else if (selectedLang == "am") {
    $(".kpiHeader").text("አዲስ KPI ጨምር");
  } else {
    $(".kpiHeader").text("إضافة KPI"); 
  }

} else if (action == "edit") {
  if (selectedLang == "en") {
    $(".kpiHeader").text("Edit KPI");
  } else if (selectedLang == "am") {
    $(".kpiHeader").text("KPI አርትዕ");
  } else {
    $(".kpiHeader").text("تعديل KPI");
  }

} else if (action == "view") {
  if (selectedLang == "en") {
    $(".kpiHeader").text("View KPI");
  } else if (selectedLang == "am") {
    $(".kpiHeader").text("KPI እይታ");
  } else {
    $(".kpiHeader").text("KPI"); 
  }
}


  $("#kpiForm").css("display", "none");
  $("#kpiForm").trigger("reset");
  populatekpiOwnerDropdownScorecard(
    ".kpi_description_popup #kpi_owner",
    ".kpi_description_popup"
  );
  $("#kpiForm input[name='action']").val(action);
  $("#kpiForm input[name='objectiveId']").val(objectiveId);

  $(".kpiCurrencyfield").hide();
  $(".kpiactualdisplay").show();
  //$(".kpitargetdisplay").removeClass("col-md-12");
  //$(".kpitargetdisplay").addClass("col-md-4");
  $(".kpiytdElement").show();
  $(".kpikpitypedisplay").removeClass("col-md-6");
  $(".kpiCurrencyfield").removeClass("col-md-6");
  $(".kpikpitypedisplay").addClass("col-md-3");
  $(".kpiCurrencyfield").addClass("col-md-3");

  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.yearToDate != undefined &&
    controlpanelScorecardSettings.yearToDate != true
  ) {
    $(".kpiytdElement").hide();
  }

  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.customPerformance != undefined &&
    controlpanelScorecardSettings.customPerformance == true
  ) {
    if (
      controlpanelScorecardSettings != "" &&
      controlpanelScorecardSettings != undefined &&
      controlpanelScorecardSettings.customKPI != undefined &&
      controlpanelScorecardSettings.customKPI != true
    ) {
      $(".kpiperformanceElement").hide();
    }
  } else {
    $(".kpiperformanceElement").hide();
  }

  /*
   * var daterange2 = $('#datePeriod').val(); var startdate = new Date(); var
   * enddate = new Date(); if (daterange2.includes("-")) { var dateval =
   * daterange2.split('-'); startdate = new Date(dateval[0]); enddate = new
   * Date(dateval[1]); }
   */

  $("#kpi_start_end_date").datepicker({
    language: "en",
    // minDate: startdate,
    // maxDate: enddate,
    range: true,
    autoClose: true,
    todayButton: false,
    position: "top left",
    onSelect: function (fd) {},
  });

  if (action == "delete") {
    $("#deletescoreid").val(id);
    $("#deleterecordtype").val("scorecardkpi");
    $("#deleteModalscorecard").modal("toggle");
    $(window).on("resize", function () {
      $(".modal:visible").each(alignModal);
    });
    $(".modal").on("shown.bs.modal", alignModal);
  } else if (action == "add") {
    /*$("#optioncolor1").next('.input-group-append').children().addClass('pickr');
		$("#optioncolor1").next('.input-group-append').children().removeClass('pickr1');
		$("#optioncolor2").next('.input-group-append').children().addClass('pickr');
		$("#optioncolor2").next('.input-group-append').children().removeClass('pickr1');
		$("#optioncolor3").next('.input-group-append').children().addClass('pickr');
		$("#optioncolor3").next('.input-group-append').children().removeClass('pickr1');
		colorpanelTrigger();*/
    $(".kpiactualdisplay").hide();
    //$(".kpitargetdisplay").removeClass("col-md-4");
    //$(".kpitargetdisplay").addClass("col-md-12");
    $(".kpiytdElement").hide();
    $(".kpikpitypedisplay").removeClass("col-md-3");
    $(".kpiCurrencyfield").removeClass("col-md-3");
    $(".kpikpitypedisplay").addClass("col-md-6");
    $(".kpiCurrencyfield").addClass("col-md-6");

    $(".kpi_description_popup").modal("toggle");
    $("#kpiCreatedBy").html("");
    $("#kpiCreatedByDate").html("");
    $("#kpiUpdatedBy").html("");
    $("#kpiUpdatedByDate").html("");
    $("#kpi_owner").val("");
    //$("#kpi_id_wrapper").show(); // Hide the ID input
    // when adding
    $("#kpiForm *").prop("disabled", false);
    $("#kpiForm").css("display", "block");
    $.each($("[class*=color_picks_]"), function () {
      $(this).css("display", "none");
    });
    $(".color_picks_2").css("display", "block");

    if (
      controlpanelScorecardSettings != "" &&
      controlpanelScorecardSettings != undefined &&
      controlpanelScorecardSettings.performance != undefined &&
      controlpanelScorecardSettings.performance == true
    ) {
      if (
        controlpanelScorecardSettings.threshold1Color != undefined &&
        controlpanelScorecardSettings.threshold1Color != ""
      ) {
        $("#optioncolor1")
          .next(".input-group-append")
          .children()
          .css("background", controlpanelScorecardSettings.threshold1Color);
      }
      if (
        controlpanelScorecardSettings.threshold0_2Color != undefined &&
        controlpanelScorecardSettings.threshold0_2Color != ""
      ) {
        $("#optioncolor2")
          .next(".input-group-append")
          .children()
          .css("background", controlpanelScorecardSettings.threshold0_2Color);
      }
      if (
        controlpanelScorecardSettings.threshold0_3Color != undefined &&
        controlpanelScorecardSettings.threshold0_3Color != ""
      ) {
        $("#optioncolor3")
          .next(".input-group-append")
          .children()
          .css("background", controlpanelScorecardSettings.threshold0_3Color);
      }

      if (
        controlpanelScorecardSettings.threshold0_4Color != undefined &&
        controlpanelScorecardSettings.threshold0_4Color != ""
      ) {
        $("#optioncolor4")
          .next(".input-group-append")
          .children()
          .css("background", controlpanelScorecardSettings.threshold0_4Color);
      }

      if (
        controlpanelScorecardSettings.threshold0_5Color != undefined &&
        controlpanelScorecardSettings.threshold0_5Color != ""
      ) {
        $("#optioncolor5")
          .next(".input-group-append")
          .children()
          .css("background", controlpanelScorecardSettings.threshold0_5Color);
      }
    }

    if (
      controlpanelScorecardSettings != "" &&
      controlpanelScorecardSettings != undefined &&
      controlpanelScorecardSettings.customPerformance != undefined &&
      controlpanelScorecardSettings.customPerformance == true
    ) {
      if (
        controlpanelScorecardSettings.threshold1Color != undefined &&
        controlpanelScorecardSettings.threshold1Color != ""
      ) {
        $("#optioncolor1")
          .next(".input-group-append")
          .children()
          .css("background", controlpanelScorecardSettings.threshold1Color);
      }
      if (
        controlpanelScorecardSettings.threshold2Color != undefined &&
        controlpanelScorecardSettings.threshold2Color != ""
      ) {
        $("#optioncolor2")
          .next(".input-group-append")
          .children()
          .css("background", controlpanelScorecardSettings.threshold2Color);
      }
      if (
        controlpanelScorecardSettings.threshold3Color != undefined &&
        controlpanelScorecardSettings.threshold3Color != ""
      ) {
        $("#optioncolor3")
          .next(".input-group-append")
          .children()
          .css("background", controlpanelScorecardSettings.threshold3Color);
      }

      if (
        controlpanelScorecardSettings.threshold4Color != undefined &&
        controlpanelScorecardSettings.threshold4Color != ""
      ) {
        $("#optioncolor4")
          .next(".input-group-append")
          .children()
          .css("background", controlpanelScorecardSettings.threshold4Color);
      }
      if (
        controlpanelScorecardSettings.threshold5Color != undefined &&
        controlpanelScorecardSettings.threshold5Color != ""
      ) {
        $("#optioncolor5")
          .next(".input-group-append")
          .children()
          .css("background", controlpanelScorecardSettings.threshold5Color);
      }
    }

    $('#kpiForm button[value="Save"]').css("display", "inline-block");
    $(".kpi_description_popup #kpi_owner").val(empId);

    $.ajax({
      url: "/stratroom/retrieveNodeKeyList",
      success: function (nodekeylist) {
        $.each(nodekeylist, function (index, nodekey) {
          if (measureFieldenable == false) {
            if (nodekey.measureType == 0) {
              addOption("#nodekey", nodekey.measureName, nodekey.nodeKey);
            }
          } else if (measureFieldenable == true) {
            addOption("#nodekey", nodekey.measureName, nodekey.nodeKey);
          }
        });

        //$('#nodekey').val(kpiData.kpiFormula.elementName);
      },
    });
  } else {
    // view and edit
    $(".kpi_description_popup").modal("toggle");
    $("#kpi_id_wrapper").css("display", "block");
    $("#kpiForm *").prop("disabled", false);
    // $('#kpiForm button').css('display', 'block');
    $(".kpi_description_popup #kpi_display_id").prop("disabled", true);
    $('#kpiForm button[value="Save"]').css("display", "inline-block");
    if (action == "view") {
      $("#kpiForm *").prop("disabled", true);
      $("#kpiForm button").prop("disabled", false);
      $('#kpiForm button[value="Save"]').css("display", "none");
    }
    /*$("#optioncolor1").next('.input-group-append').children().removeClass('pickr');
		$("#optioncolor1").next('.input-group-append').children().addClass('pickr1');
		$("#optioncolor2").next('.input-group-append').children().removeClass('pickr');
		$("#optioncolor2").next('.input-group-append').children().addClass('pickr1');
		$("#optioncolor3").next('.input-group-append').children().removeClass('pickr');
		$("#optioncolor3").next('.input-group-append').children().addClass('pickr1');*/
    $.ajax({
      url: "/stratroom/kpi/" + id,
      success: kpiSuccessCallback,
    });
  }
}
function handleSubKpiEvent(id, action, objectiveId) {
  console.log(action, 'Action')
  if(action == "add"){
   $(".subKpiHeader").text("Add Sub KPI");
  }else if(action == "edit"){
   $(".subKpiHeader").text("Edit Sub KPI");
  }else if(action == "view"){
   $(".subKpiHeader").text("View Sub KPI");
  }
  console.log(id, "idd");
  $("#subkpiForm").css("display", "none");
  $("#subkpiForm").trigger("reset");
  populatekpiOwnerDropdownScorecard(
    ".subkpi_description_popup #subkpi_owner",
    ".subkpi_description_popup"
  );
  $("#subkpiForm input[name='action']").val(action);
  $("#subkpiForm input[name='subobjectiveId']").val(objectiveId);
  $("#subkpiForm input[name='subkpi_display_id']").val(id);
  $(".kpiCurrencyfield").hide();
  $(".kpiactualdisplay").show();
  //$(".kpitargetdisplay").removeClass("col-md-12");
  //$(".kpitargetdisplay").addClass("col-md-4");
  $(".kpiytdElement").show();
  $(".kpikpitypedisplay").removeClass("col-md-6");
  $(".kpiCurrencyfield").removeClass("col-md-6");
  $(".kpikpitypedisplay").addClass("col-md-3");
  $(".kpiCurrencyfield").addClass("col-md-3");

  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.yearToDate != undefined &&
    controlpanelScorecardSettings.yearToDate != true
  ) {
    $(".kpiytdElement").hide();
  }

  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.customPerformance != undefined &&
    controlpanelScorecardSettings.customPerformance == true
  ) {
    if (
      controlpanelScorecardSettings != "" &&
      controlpanelScorecardSettings != undefined &&
      controlpanelScorecardSettings.customKPI != undefined &&
      controlpanelScorecardSettings.customKPI != true
    ) {
      $(".kpiperformanceElement").hide();
    }
  } else {
    $(".kpiperformanceElement").hide();
  }

  /*
   * var daterange2 = $('#datePeriod').val(); var startdate = new Date(); var
   * enddate = new Date(); if (daterange2.includes("-")) { var dateval =
   * daterange2.split('-'); startdate = new Date(dateval[0]); enddate = new
   * Date(dateval[1]); }
   */

  $("#subkpi_start_end_date").datepicker({
    language: "en",
    // minDate: startdate,
    // maxDate: enddate,
    range: true,
    autoClose: true,
    todayButton: false,
    position: "top left",
    onSelect: function (fd) {},
  });

  if (action == "add") {
    /*$("#optioncolor1").next('.input-group-append').children().addClass('pickr');
		$("#optioncolor1").next('.input-group-append').children().removeClass('pickr1');
		$("#optioncolor2").next('.input-group-append').children().addClass('pickr');
		$("#optioncolor2").next('.input-group-append').children().removeClass('pickr1');
		$("#optioncolor3").next('.input-group-append').children().addClass('pickr');
		$("#optioncolor3").next('.input-group-append').children().removeClass('pickr1');
		colorpanelTrigger();*/
    $(".kpiactualdisplay").hide();
    //$(".kpitargetdisplay").removeClass("col-md-4");
    //$(".kpitargetdisplay").addClass("col-md-12");
    $(".kpiytdElement").hide();
    $(".kpikpitypedisplay").removeClass("col-md-3");
    $(".kpiCurrencyfield").removeClass("col-md-3");
    $(".kpikpitypedisplay").addClass("col-md-6");
    $(".kpiCurrencyfield").addClass("col-md-6");

    $(".subkpi_description_popup").modal("toggle");
    $("#kpiCreatedBy").html("");
    $("#kpiCreatedByDate").html("");
    $("#kpiUpdatedBy").html("");
    $("#kpiUpdatedByDate").html("");
    $("#subkpi_owner").val("");
    //$("#kpi_id_wrapper").show(); // Hide the ID input
    // when adding
    $("#subkpiForm *").prop("disabled", false);
    $("#subkpiForm").css("display", "block");
    $.each($("[class*=color_picks_]"), function () {
      $(this).css("display", "none");
    });
    $(".color_picks_2").css("display", "block");

    if (
      controlpanelScorecardSettings != "" &&
      controlpanelScorecardSettings != undefined &&
      controlpanelScorecardSettings.performance != undefined &&
      controlpanelScorecardSettings.performance == true
    ) {
      if (
        controlpanelScorecardSettings.threshold1Color != undefined &&
        controlpanelScorecardSettings.threshold1Color != ""
      ) {
        $("#optioncolor1")
          .next(".input-group-append")
          .children()
          .css("background", controlpanelScorecardSettings.threshold1Color);
      }
      if (
        controlpanelScorecardSettings.threshold0_2Color != undefined &&
        controlpanelScorecardSettings.threshold0_2Color != ""
      ) {
        $("#optioncolor2")
          .next(".input-group-append")
          .children()
          .css("background", controlpanelScorecardSettings.threshold0_2Color);
      }
      if (
        controlpanelScorecardSettings.threshold0_3Color != undefined &&
        controlpanelScorecardSettings.threshold0_3Color != ""
      ) {
        $("#optioncolor3")
          .next(".input-group-append")
          .children()
          .css("background", controlpanelScorecardSettings.threshold0_3Color);
      }

      if (
        controlpanelScorecardSettings.threshold0_4Color != undefined &&
        controlpanelScorecardSettings.threshold0_4Color != ""
      ) {
        $("#optioncolor4")
          .next(".input-group-append")
          .children()
          .css("background", controlpanelScorecardSettings.threshold0_4Color);
      }

      if (
        controlpanelScorecardSettings.threshold0_5Color != undefined &&
        controlpanelScorecardSettings.threshold0_5Color != ""
      ) {
        $("#optioncolor5")
          .next(".input-group-append")
          .children()
          .css("background", controlpanelScorecardSettings.threshold0_5Color);
      }
    }

    if (
      controlpanelScorecardSettings != "" &&
      controlpanelScorecardSettings != undefined &&
      controlpanelScorecardSettings.customPerformance != undefined &&
      controlpanelScorecardSettings.customPerformance == true
    ) {
      if (
        controlpanelScorecardSettings.threshold1Color != undefined &&
        controlpanelScorecardSettings.threshold1Color != ""
      ) {
        $("#optioncolor1")
          .next(".input-group-append")
          .children()
          .css("background", controlpanelScorecardSettings.threshold1Color);
      }
      if (
        controlpanelScorecardSettings.threshold2Color != undefined &&
        controlpanelScorecardSettings.threshold2Color != ""
      ) {
        $("#optioncolor2")
          .next(".input-group-append")
          .children()
          .css("background", controlpanelScorecardSettings.threshold2Color);
      }
      if (
        controlpanelScorecardSettings.threshold3Color != undefined &&
        controlpanelScorecardSettings.threshold3Color != ""
      ) {
        $("#optioncolor3")
          .next(".input-group-append")
          .children()
          .css("background", controlpanelScorecardSettings.threshold3Color);
      }

      if (
        controlpanelScorecardSettings.threshold4Color != undefined &&
        controlpanelScorecardSettings.threshold4Color != ""
      ) {
        $("#optioncolor4")
          .next(".input-group-append")
          .children()
          .css("background", controlpanelScorecardSettings.threshold4Color);
      }
      if (
        controlpanelScorecardSettings.threshold5Color != undefined &&
        controlpanelScorecardSettings.threshold5Color != ""
      ) {
        $("#optioncolor5")
          .next(".input-group-append")
          .children()
          .css("background", controlpanelScorecardSettings.threshold5Color);
      }
    }

    $('#subkpiForm button[value="Save"]').css("display", "inline-block");
    $(".subkpi_description_popup #subkpi_owner").val(empId);

    $.ajax({
      url: "/stratroom/retrieveNodeKeyList",
      success: function (nodekeylist) {
        $.each(nodekeylist, function (index, nodekey) {
          if (measureFieldenable == false) {
            if (nodekey.measureType == 0) {
              addOption("#nodekey", nodekey.measureName, nodekey.nodeKey);
            }
          } else if (measureFieldenable == true) {
            addOption("#nodekey", nodekey.measureName, nodekey.nodeKey);
          }
        });

        //$('#nodekey').val(kpiData.kpiFormula.elementName);
      },
    });
  } else {
    // view and edit
    $(".subkpi_description_popup").modal("toggle");
    $("#kpi_id_wrapper").css("display", "block");
    $("#kpisubkpiFormForm *").prop("disabled", false);
    // $('#subkpiForm button').css('display', 'block');
    $(".subkpi_description_popup #subkpi_display_id").prop("disabled", true);
    $('#subkpiForm button[value="Save"]').css("display", "inline-block");
    if (action == "view") {
      $("#subkpiForm *").prop("disabled", true);
      $("#subkpiForm button").prop("disabled", false);
      $('#subkpiForm button[value="Save"]').css("display", "none");
    }
    /*$("#optioncolor1").next('.input-group-append').children().removeClass('pickr');
		$("#optioncolor1").next('.input-group-append').children().addClass('pickr1');
		$("#optioncolor2").next('.input-group-append').children().removeClass('pickr');
		$("#optioncolor2").next('.input-group-append').children().addClass('pickr1');
		$("#optioncolor3").next('.input-group-append').children().removeClass('pickr');
		$("#optioncolor3").next('.input-group-append').children().addClass('pickr1');*/
    $.ajax({
      url: "/stratroom/kpi/" + id,
      success: kpiSuccessCallback,
    });
  }
}
function handleEditSubKpiEvent(id, action, objectiveId, kpiId, subKpiId) {

  console.log(action, "actionData");
 if (action == "add") {
  if (localStorage.getItem("selectedLang") == "en") {
    $(".subKpiHeaderText").text("Add Sub KPI");
  } else if (localStorage.getItem("selectedLang") == "am") {
    $(".subKpiHeaderText").text("ንዑስ KPI ጨምር");
  } else if (localStorage.getItem("selectedLang") == "ar") {
    $(".subKpiHeaderText").text("إضافة مؤشر فرعي (Sub KPI)");
  }

} else if (action == "edit") {
  if (localStorage.getItem("selectedLang") == "en") {
    $(".subKpiHeaderText").text("Edit Sub KPI");
  } else if (localStorage.getItem("selectedLang") == "am") {
    $(".subKpiHeaderText").text("ንዑስ KPI አርትዕ");
  } else if (localStorage.getItem("selectedLang") == "ar") {
    $(".subKpiHeaderText").text("تعديل مؤشر فرعي (Sub KPI)");
  }

} else if (action == "view") {
  if (localStorage.getItem("selectedLang") == "en") {
    $(".subKpiHeaderText").text("View Sub KPI");
  } else if (localStorage.getItem("selectedLang") == "am") {
    $(".subKpiHeaderText").text("ንዑስ KPI እይታ");
  } else if (localStorage.getItem("selectedLang") == "ar") {
    $(".subKpiHeaderText").text("عرض مؤشر فرعي (Sub KPI)");
  }
}


  console.log(kpiId, "kpiId");
  console.log(subKpiId, "subKpiId");
  // $("#editSubkpiForm").css('display', 'none');
  $("#editSubkpiForm").trigger("reset");
  populatekpiOwnerDropdownScorecard(
    ".updateSubkpi_description_popup #editsubkpi_owner",
    ".updateSubkpi_description_popup"
  );
  $("#editSubkpiForm input[name='action']").val(action);
  $("#editSubkpiForm input[name='editobjectiveId']").val(objectiveId);
  $("#editSubkpiForm input[name='editsubkpi_display_id']").val(id);
  $("#editSubkpiForm input[name='subKpi_display_id']").val(kpiId);
  // $("#editSubkpiForm input[name='subKpi_id']").val(subKpiId);
  $(".kpiCurrencyfield").hide();
  $(".kpiactualdisplay").show();
  //$(".kpitargetdisplay").removeClass("col-md-12");
  //$(".kpitargetdisplay").addClass("col-md-4");
  $(".kpiytdElement").show();
  $(".kpikpitypedisplay").removeClass("col-md-6");
  $(".kpiCurrencyfield").removeClass("col-md-6");
  $(".kpikpitypedisplay").addClass("col-md-3");
  $(".kpiCurrencyfield").addClass("col-md-3");

  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.yearToDate != undefined &&
    controlpanelScorecardSettings.yearToDate != true
  ) {
    $(".kpiytdElement").hide();
  }

  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.customPerformance != undefined &&
    controlpanelScorecardSettings.customPerformance == true
  ) {
    if (
      controlpanelScorecardSettings != "" &&
      controlpanelScorecardSettings != undefined &&
      controlpanelScorecardSettings.customKPI != undefined &&
      controlpanelScorecardSettings.customKPI != true
    ) {
      $(".kpiperformanceElement").hide();
    }
  } else {
    $(".kpiperformanceElement").hide();
  }

  /*
   * var daterange2 = $('#datePeriod').val(); var startdate = new Date(); var
   * enddate = new Date(); if (daterange2.includes("-")) { var dateval =
   * daterange2.split('-'); startdate = new Date(dateval[0]); enddate = new
   * Date(dateval[1]); }
   */

  $("#subkpi_start_end_date").datepicker({
    language: "en",
    // minDate: startdate,
    // maxDate: enddate,
    range: true,
    autoClose: true,
    todayButton: false,
    position: "top left",
    onSelect: function (fd) {},
  });

  $.ajax({
    url: "/stratroom/subKpi/" + id,
    method: "GET",
    success: function (data, status) {
      console.log(data, "edit data");
      $("#subKpi_id").val(data.subKpiId);
      $("#editsubkpi_name").val(data.subKpiValue.subMeasureName);
      $("#editsubkpi_type").val(data.subKpiValue.kpiType);
      $("#editsubkpi_description").val(data.subKpiValue.description);
      // $(".kpi_formula").val(  data.subKpiValue.description);
      if (
        data.kpiFormula.formula != undefined &&
        data.kpiFormula.formula != null
      ) {
        $(".kpi_formula").val(data.kpiFormula.formula);
      } else {
        $(".kpi_formula").val(data.subKpiValue.ytdFormula);
      }
      $(".kpiYtdFormula").val(data.subKpiValue.ytdFormula);
      $("#editsubkpi_measurement").val(data.subKpiValue.kpi_measurement);
      $("#editsubkpi_owner").val(data.subKpiValue.ownerName);
      $("#editsubkpi_datasource").val(data.subKpiValue.kpi_datasource);
      $("#editsubkpiDataType").val(data.subKpiValue.dataType);
      $("#editsubkpi_start_end_date").val(data.subKpiValue.kpi_start_end_date);
      $("#editsubkpi_weight").val(data.subKpiValue.weight);
      $("#editsubkpi_contribution").val(data.subKpiValue.contribution);   
      $("#editsubkpi_sub_weight").val(data.subKpiValue.subweight);
      $("#editsubkpiinputState").val(data.subKpiValue.status);
      // $(".editsdescription").val( data.subKpiValue.kpi_measurement);
    },
    error: readErrorMsg,
  });
}

function getEditSubKpiObj(action) {
  var arr = $.map(reporteelist, function (obj, i) {
    return obj.id;
  });

  var thresholdupdateflag = false;
  if (action == "edit") {
    var option1emlemt = $("#optioncolor1");
    var option2emlemt = $("#optioncolor2");
    var option3emlemt = $("#optioncolor3");
    var option4emlemt = $("#optioncolor4");
    var option5emlemt = $("#optioncolor5");

    if (
      $(option1emlemt).attr("data-oldvalue") != $(option1emlemt).val() ||
      $(option2emlemt).attr("data-oldvalue") != $(option2emlemt).val() ||
      $(option3emlemt).attr("data-oldvalue") != $(option3emlemt).val() ||
      $(option4emlemt).attr("data-oldvalue") != $(option4emlemt).val() ||
      $(option5emlemt).attr("data-oldvalue") != $(option5emlemt).val()
    ) {
      thresholdupdateflag = true;
    }
  }

  var kpiThresholdvalue = $("#editkpi_threshold").val();
  var kpiObj = {
    id: $("#editsubkpi_display_id").val(),
    owner: $("#editsubkpi_owner").val(),
    subKpiName: $("#editsubkpi_name").val(),
    kpiId: $("#subKpi_display_id").val(),
    subKpiId: $("#subKpi_id").val(),
    thresholdvalueupdate: thresholdupdateflag,
    kpiFormula: {
      formula: $(".kpi_formula").val(),
      //"empployeeIds" : arr,
      //	"period" : $("#datePeriod").val(),
      fieldName: $("#kpiFieldName").val(),
    },
    performanceFormula: {
      formula: $("#kpi_performance").val(),
      //		"empployeeIds" : arr,
      //		"period" : $("#datePeriod").val(),
      fieldName: $("#performanceFieldName").val(),
    },
    objectiveId: $("#editSubkpiForm input[name='editobjectiveId']").val(),
    subKpiValue: {
      kpiId: $("#subKpi_display_id").val(),
      subMeasureName: $("#editsubkpi_name").val(),
      description: $("#editsubkpi_description").val(),
      kpiType: $("#editsubkpi_type").val(),
      kpi_measurement: $("#editsubkpi_measurement").val(),
      kpi_datasource: $("#editsubkpi_datasource").val(),
      kpi_start_end_date: $("#editsubkpi_start_end_date").val(),
      weight: $("#editsubkpi_weight").val(),
      subweight: $("#editsubkpi_sub_weight").val(),
      thresholdFormula: $("#editsubkpi_performance").val(),
      targetCurrency: "",
      contribution : $("#editsubkpi_contribution").val(),
      threshold: kpiThresholdvalue,
      status: $("#editsubkpiinputState").val(),
      dataType: $("#editsubkpiDataType").val(),
      kpiCurrency: $("#editsubkpiCurrencyvalue").val(),
      ytdFormula: $("#subkpiYtdFormula").val(),
      optioncolor1: $("#optioncolor1").val(),
      optioncolor2: $("#optioncolor2").val(),
      optioncolor3: $("#optioncolor3").val(),
      optioncolor4: $("#optioncolor4").val(),
      optioncolor5: $("#optioncolor5").val(),
      target: "0",
    },
  };
  // kpiObj.kpiValue['optioncolor1colorvalue'] =
  // colorcodevalue($("#optioncolor1").next('.input-group-append').children().css('background-color'));
  // if(controlpanelScorecardSettings.threshold && (controlpanelScorecardSettings.threshold == "option_3" || controlpanelScorecardSettings.threshold == "three_status")){
  // 	kpiObj.kpiValue['optioncolor1colorvalue']	=	$("#optioncolor1").next('.input-group-append').children().css('background-color');
  // 	kpiObj.kpiValue['optioncolor2colorvalue']	=	$("#optioncolor2").next('.input-group-append').children().css('background-color');
  // 	kpiObj.kpiValue['optioncolor3colorvalue']	=	$("#optioncolor3").next('.input-group-append').children().css('background-color');
  // }	else if(controlpanelScorecardSettings.threshold && (controlpanelScorecardSettings.threshold == "option_5" || controlpanelScorecardSettings.threshold == "five_status")){
  // 	kpiObj.kpiValue['optioncolor1colorvalue']	=	$("#optioncolor1").next('.input-group-append').children().css('background-color');
  // 	kpiObj.kpiValue['optioncolor2colorvalue']	=	$("#optioncolor2").next('.input-group-append').children().css('background-color');
  // 	kpiObj.kpiValue['optioncolor3colorvalue']	=	$("#optioncolor3").next('.input-group-append').children().css('background-color');
  // 	kpiObj.kpiValue['optioncolor4colorvalue']	=	$("#optioncolor4").next('.input-group-append').children().css('background-color');
  // 	kpiObj.kpiValue['optioncolor5colorvalue']	=	$("#optioncolor5").next('.input-group-append').children().css('background-color');
  // }

  /*$.each($("input[name='kpi_fields']:checked"), function(idx) {
		if($(this).val()	==	"Actual"){
			kpiObj.kpiValue['header1'] 	= 	$(this).val();
		}else if($(this).val()	==	"Target"){
			kpiObj.kpiValue['header2'] 	= 	$(this).val();
		}else if($(this).val()	==	"Budget"){
			kpiObj.kpiValue['header3'] 	= 	$(this).val();
		}else if($(this).val()	==	"Forecast"){
			kpiObj.kpiValue['header4'] 	= 	$(this).val();
		}
	})*/ // kpiObj.kpiValue['customthresholdenable'] 	= 	false;

  // if($("#chk_custom_threshold").is(":checked") == true){
  // 	kpiObj.kpiValue['customthresholdenable'] 	= 	true;
  // }

  // var existdatadonotupdate 	=	["kpiId","name","description","kpiType","kpi_measurement","kpi_datasource","kpi_start_end_date","weight","subweight","target","thresholdFormula","status","dataType","kpiCurrency","ytdFormula","threshold","optioncolor1",
  // 	"optioncolor2","optioncolor3","optioncolor4","optioncolor5","header1","header2","header3","header4","customthresholdenable","optioncolor1colorvalue","optioncolor2colorvalue","optioncolor1colorvalue","optioncolor2colorvalue","optioncolor3colorvalue","optioncolor1colorvalue","optioncolor2colorvalue","optioncolor3colorvalue","optioncolor4colorvalue","optioncolor5colorvalue"];
  // if(action == "edit" && (parentKpidetails !== undefined || parentKpidetails != "")){
  // 	// KpiObj["id"] = $("#kpi_id").val();
  // 	// KpiObj["objectiveId"] = parentKpidetails.objectiveId;
  // 	$.each(parentKpidetails.kpiValue,function(index,value){
  // 		if($.inArray(index,existdatadonotupdate) == -1){
  // 			kpiObj["kpiValue"][index]	=	value;
  // 		}
  // 	});

  // 	// KpiObj["kpiFormula"] = parentKpidetails.kpiFormula;
  // }

  return kpiObj;
}
populatekpiOwnerDropdownScorecard("#subkpi_owner");

function handleUpdateSubKpiSave(event) {
  event.preventDefault();

  var action = $("#kpiForm input[name='action']").val();

  var kpiObj = getEditSubKpiObj(action);
  console.log(KpiObj, "kpiObj to save");

  $.ajax({
    url: "/stratroom/subKpi",
    type: "put",
    contentType: "application/json",
    data: JSON.stringify(kpiObj),
    success: function (data, status) {
      $("#closeKpimodal").click();
      location.reload(true);
      console.log("New KPI was created..");
    },
  });
}
function handledeleteSubKpi(kpiId) {
  $("#delete_subKpi").val(kpiId);
  console.log(kpiId, "handledeleteSubKpi");
  $("#delete_popup_subKpi").modal("toggle");
  $(window).on("resize", function () {
    $(".modal:visible").each(alignModal);
  });
  $(".modal").on("shown.bs.modal", alignModal);
}
function deleteSubKpi() {
  var kpiId = $("#delete_subKpi").val();

  console.log(kpiId, "kpiId to delete");
  $.ajax({
    url: "/stratroom/subKpi/" + kpiId,
    type: "DELETE",
    contentType: "application/json",
    success: function (data, status) {
      location.reload(true);
    },
    error: readErrorMsg,
  });
}

function handlescoreeventdelete() {
  var id = $("#deletescoreid").val();
  var type = $("#deleterecordtype").val();

  if (id == "" || type == "") {
    return false;
  }
  var requestmethod = "delete";
  var url = "";
  if (type == "scorecardkpi") {
    url = "/stratroom/kpi/" + id;
  } else if (type == "scorecardperspective") {
    url = "/stratroom/scorecard/" + id;
    requestmethod = "get";
  } else if (type == "scorecardobjective") {
    url = "/stratroom/objectives/" + id;
  }

  $.ajax({
    url: url,
    type: requestmethod,
    contentType: "application/json",
    success: function (data, status) {
      if (type == "scorecardperspective") {
        if (data.scoreCardValue != undefined) {
          $("#perspectiveForm input[name='defaultscr']").val(
            data.scoreCardValue.defaultscr
          );
          var defaultscr = $("#perspectiveForm input[name='defaultscr']").val();
          if (defaultscr == "true") {
            alert("Default ScoreCard Template cannot be deleted");
          } else {
            $("#perspectiveMeasureNames").empty();

            var methodType = "delete";

            $.ajax({
              url: "/stratroom/scorecard/" + id,
              type: methodType,
              contentType: "application/json",
              success: function (data, status) {
                location.reload(true);
                console.log("Scorecard was deleted");
              },
            });
          }
        }
      }
      location.reload(true);
    },
    error: readErrorMsg,
  });
}

function objectivesSuccessCallback(objectiveData) {
  $("#objectiveForm").css("display", "block");

  $("#objective_id").val(objectiveData.id);
  $("#objective_display_id").val(objectiveData.objectiveId);
  $("#objective_name").val(objectiveData.objectivesValue.name);
  $("#objective_description").val(objectiveData.objectivesValue.description);
  if (objectiveData.owner == "") {
    $("#objective_owner").val(empId);
  } else {
    $("#objective_owner").val(objectiveData.owner);
  }
  $("#objectiveweight").val(objectiveData.objectivesValue.weight);
  $("#objective_sub_weight").val(objectiveData.objectivesValue.subweight);
  $("#objective_start_end_date").val(
    objectiveData.objectivesValue.objective_start_end_date
  );
  $("#custom_objective").val(objectiveData.objectivesValue.thresholdFormula);
  $("#objective_status").val(objectiveData.objectivesValue.status);
  $("#objCreatedById").val(objectiveData.createdBy);
  $("#objCreatedBy").html(objectiveData.objectivesValue.createdByName);
  $("#objUpdatedBy").html(objectiveData.objectivesValue.updatedByName);
  $("#objCreatedByDate").html(objectiveData.createDateString);
  $("#objUpdatedByDate").html(objectiveData.updatedDateString);
}

function getObjectiveObj() {
  var objectiveObj = {
    owner: $("#objective_owner").val(),
    scoreCardId: $("#objectiveForm input[name='scoreCardId']").val(),
    createdBy: $("#objCreatedById").val(),
    objectiveId: $("#objective_display_id").val(),
    objectivesValue: {
      thresholdFormula: $("#custom_objective").val(),
      objectiveId: $("#objective_id").val(),
      name: $("#objective_name").val(),
      description: $("#objective_description").val(),
      weight: $("#objectiveweight").val(),
      status: $("#objective_status").val(),
      subweight: $("#objective_sub_weight").val(),
      objective_start_end_date: $("#objective_start_end_date").val(),
    },
  };
  return objectiveObj;
}

function handleObjectiveSave() {
  var action = $("#objectiveForm input[name='action']").val();
  if (action == "delete") {
  } else {
    var objectiveObj = getObjectiveObj();
    console.log(objectiveObj, "objectiveObj");
    var methodType = "post";
    if (action == "add") {
    } else if (action == "edit") {
      objectiveObj.id = $("#objective_id").val();
      methodType = "put";
    }

    $.ajax({
      url: "/stratroom/objectives/",
      type: methodType,
      contentType: "application/json",
      data: JSON.stringify(objectiveObj),
      success: function (data, status) {
        $("#objectiveForm").css("display", "none");
        location.reload(true);
        console.log("New objective was created..");
      },
    });
  }
}

function handleObjectiveEvent(id, action, scoreCardId) {
  console.log(id, action, scoreCardId, "iddatatata");
if (action == 'add') { 
  if (localStorage.getItem("selectedLang") == "en") {
    $(".objectiveHeader").text("Add Objective");
  } else if (localStorage.getItem("selectedLang") == "ar") {
    $(".objectiveHeader").text("ዓላማ ጨምር");
  } else {
    $(".objectiveHeader").text("إضافة هدف");
  }

} else if (action == 'view') {
  if (localStorage.getItem("selectedLang") == "en") {
    $(".objectiveHeader").text("View Objective Details");
  } else if (localStorage.getItem("selectedLang") == "ar") {
    $(".objectiveHeader").text("የዓላማ ዝርዝሮችን ይመልከቱ");
  } else {
    $(".objectiveHeader").text("عرض تفاصيل الهدف");
  }

  console.log("clicked");

} else if (action == "edit") {
  if (localStorage.getItem("selectedLang") == "en") {
    $(".objectiveHeader").text("Edit Objective");
  } else if (localStorage.getItem("selectedLang") == "ar") {
    $(".objectiveHeader").text("ዓላማ አርትዕ");
  } else {
    $(".objectiveHeader").text("تعديل الهدف");
  }
}

  $("#objectiveForm").css("display", "none");
  $("#objectiveForm").trigger("reset");
  populateobjectiveOwnerDropdownScorecard(
    ".objective_description_popup #objective_owner",
    ".objective_description_popup"
  );
  $("#objectiveForm input[name='action']").val(action);
  $("#objectiveForm input[name='scoreCardId']").val(scoreCardId);
  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.customPerformance != undefined &&
    controlpanelScorecardSettings.customPerformance == true
  ) {
    if (
      controlpanelScorecardSettings != "" &&
      controlpanelScorecardSettings != undefined &&
      controlpanelScorecardSettings.customObjective != undefined &&
      controlpanelScorecardSettings.customObjective != true
    ) {
      $(".objectiveperformanceElement").hide();
    }
  } else {
    $(".objectiveperformanceElement").hide();
  }
  var daterange2 = $("#datePeriod").val();
  var startdate = new Date();
  var enddate = new Date();
  if (daterange2.includes("-")) {
    var dateval = daterange2.split("-");
    startdate = new Date(dateval[0]);
    enddate = new Date(dateval[1]);
  }

  $("#objective_start_end_date").datepicker({
    language: "en",
    // minDate: startdate,
    // maxDate: enddate,
    range: true,
    autoClose: true,
    todayButton: false,
    position: "top left",
    onSelect: function (fd) {},
  });
  if (action == "delete") {
    $("#deletescoreid").val(id);
    $("#deleterecordtype").val("scorecardobjective");
    $("#deleteModalscorecard").modal("toggle");
    $(window).on("resize", function () {
      $(".modal:visible").each(alignModal);
    });
    $(".modal").on("shown.bs.modal", alignModal);
  } else if (action == "add") {
    $("#objCreatedBy").html("");
    $("#objCreatedByDate").html("");
    $("#objUpdatedBy").html("");
    $("#objUpdatedByDate").html("");
    $("#objective_owner").val("");
    formvalidationerrorreset();
    $(".objectivenamediv").removeClass("col-md-9");
    $(".objectivenamediv").addClass("col-md-12");

    $("#objective_id_wrapper").css("display", "none"); // Hide the ID input
    // when adding
    $("#objectiveForm *").prop("disabled", false);
    // $('#objectiveForm button').css('display', 'block');
    $("#objectiveForm").css("display", "block");
    $('#objectiveForm button[value="Save"]').css("display", "inline-block");
    $(".objective_description_popup #objective_owner").val(empId);
  } else {
    // view and edit
    formvalidationerrorreset();
    // $(".objectiveHeader").text("View Objective Details")
    $(".objectivenamediv").removeClass("col-md-12");
    $(".objectivenamediv").addClass("col-md-9");

    $("#objective_id_wrapper").css("display", "block");
    $("#objectiveForm *").prop("disabled", false);
    // $('#objectiveForm button').css('display', 'block');
    $(".objective_description_popup #objective_display_id").prop(
      "disabled",
      true
    );
    $('#objectiveForm button[value="Save"]').css("display", "inline-block");
    if (action == "view") {
      $("#objectiveForm *").prop("disabled", true);
      $("#objectiveForm button").prop("disabled", false);
      $('#objectiveForm button[value="Save"]').css("display", "none");
    }

    $.ajax({
      url: "/stratroom/objectives/" + id,
      success: objectivesSuccessCallback,
    });
  }
}

function perspectiveSuccessCallback(perspectiveData) {
  $("#perspectiveForm").css("display", "block");
  $("#perspectiveId").val(perspectiveData.id);
  $("#scoreCardDetailsId").val(perspectiveData.scoreCardDetailsId);
  $("#perspective_id").val(perspectiveData.perspectiveId);
  $("#perspective_name").val(perspectiveData.scoreCardValue.name);
  $("#perspective_description").val(perspectiveData.scoreCardValue.description);
  if (perspectiveData.owner == "") {
    $("#perspective_owner").val(empId);
  } else {
    $("#perspective_owner").val(perspectiveData.owner);
  }
  if (
    perspectiveData.scoreCardValue.scorecardFormula != "" &&
    perspectiveData.scoreCardValue.scorecardFormula != undefined
  ) {
    $("#perspectivescorecardFormula").val(
      perspectiveData.scoreCardValue.scorecardFormula
    );
  }
  if (
    perspectiveData.scoreCardValue.weight != "" &&
    perspectiveData.scoreCardValue.weight != undefined
  ) {
    $("#perspective_weight").val(perspectiveData.scoreCardValue.weight);
  } else {
    $("#perspective_weight").val(0);
  }

  $("#perspective_status").val(perspectiveData.scoreCardValue.status);
  $("#perspectivecustomreportee").val(perspectiveData.customReportees);
  $("#perspective_sub_weight").val(perspectiveData.scoreCardValue.subweight);
  $("#perspective_start_end_date").datepicker({
    language: "en",
    range: true,
    autoClose: true,
    todayButton: false,
    position: "top left",
    onSelect: function (fd) {},
  });
  $("#perspective_start_end_date").val(
    perspectiveData.scoreCardValue.perspective_start_end_date
  );

  /*
   * if(perspectiveData.scoreCardValue.perspective_start_end_date != "" &&
   * perspectiveData.scoreCardValue.perspective_start_end_date != undefined &&
   * perspectiveData.scoreCardValue.perspective_start_end_date != null){ var
   * daterange1 = perspectiveData.scoreCardValue.perspective_start_end_date;
   * var startdate = new Date(); var enddate = new Date(); if
   * (daterange1.includes("-")) { var dateval = daterange1.split('-');
   * startdate = new Date(dateval[0]); enddate = new Date(dateval[1]); }
   * $("#perspective_start_end_date").datepicker({ language: 'en', //minDate:
   * startdate, //maxDate: enddate, range: true, autoClose: true, todayButton:
   * false, position: "top left", onSelect: function (fd) {
   *  } });
   * $("#perspective_start_end_date").val(perspectiveData.scoreCardValue.perspective_start_end_date);
   * }else{ var daterange2 = $('#datePeriod').val(); var startdate = new
   * Date(); var enddate = new Date(); if (daterange2.includes("-")) { var
   * dateval = daterange2.split('-'); startdate = new Date(dateval[0]);
   * enddate = new Date(dateval[1]); }
   *
   * $("#perspective_start_end_date").datepicker({ language: 'en', //minDate:
   * startdate, //maxDate: enddate, range: true, autoClose: true, todayButton:
   * false, position: "top left", onSelect: function (fd) {
   *  } }); $("#perspective_start_end_date").val($('#datePeriod').val()); }
   */
  $("#custom_perspective").val(perspectiveData.scoreCardValue.thresholdFormula);
  $("#createdById").val(perspectiveData.createdBy);
  $("#createdBy").html(perspectiveData.scoreCardValue.createdByName);
  $("#updatedBy").html(perspectiveData.scoreCardValue.updatedByName);
  $("#createdByDate").html(perspectiveData.createDateString);
  $("#updatedByDate").html(perspectiveData.updatedDateString);
  if (
    perspectiveData.scoreCardValue.header3 != null &&
    perspectiveData.scoreCardValue.header3 != undefined
  ) {
    $("#perspectiveheader3").val(perspectiveData.scoreCardValue.header3);
  }
  if (
    perspectiveData.scoreCardValue.header4 != null &&
    perspectiveData.scoreCardValue.header4 != undefined
  ) {
    $("#perspectiveheader4").val(perspectiveData.scoreCardValue.header4);
  }
  if (
    perspectiveData.scoreCardValue.header5 != null &&
    perspectiveData.scoreCardValue.header5 != undefined
  ) {
    $("#perspectiveheader5").val(perspectiveData.scoreCardValue.header5);
  }
  if (
    perspectiveData.scoreCardValue.header6 != null &&
    perspectiveData.scoreCardValue.header6 != undefined
  ) {
    $("#perspectiveheader6").val(perspectiveData.scoreCardValue.header6);
  }
  if (
    perspectiveData.scoreCardValue.header7 != null &&
    perspectiveData.scoreCardValue.header7 != undefined
  ) {
    $("#perspectiveheader7").val(perspectiveData.scoreCardValue.header7);
  }
  /*
   * for (var i = 2; i <= 6; i++) { var header =
   * perspectiveData.scoreCardValue['header' + i]; $('#perspectiveForm
   * input[value=' + header + ']').prop('checked', true); }
   */
}

function getPerspectiveObj() {
  var perspectiveObj = {
    owner: $("#perspective_owner").val(),
    pageId: $("#pagenumber").val(),
    createdBy: $("#createdById").val(),
    scoreCardDetailsId: $("#scoreCardDetailsId").val(),
    scoreCardValue: {
      thresholdFormula: $("#custom_perspective").val(),
      scorecardFormula: $("#perspectivescorecardFormula").val(),
      name: $("#perspective_name").val(),
      description: $("#perspective_description").val(),
      status: $("#perspective_status").val(),
      weight: $("#perspective_weight").val(),
      subweight: $("#perspective_sub_weight").val(),
      perspective_start_end_date: $("#perspective_start_end_date").val(),
      defaultscr: $("#perspectiveForm input[name='defaultscr']").val(),
      header1: "ID",
      header2: "Period",
    },
  };

  if (
    $("#perspectiveheader3").val() != null &&
    $("#perspectiveheader3").val() != ""
  ) {
    perspectiveObj.scoreCardValue.header3 = $("#perspectiveheader3").val();
  }
  if (
    $("#perspectiveheader4").val() != null &&
    $("#perspectiveheader4").val() != ""
  ) {
    perspectiveObj.scoreCardValue.header4 = $("#perspectiveheader4").val();
  }
  if (
    $("#perspectiveheader5").val() != null &&
    $("#perspectiveheader5").val() != ""
  ) {
    perspectiveObj.scoreCardValue.header5 = $("#perspectiveheader5").val();
  }
  if (
    $("#perspectiveheader6").val() != null &&
    $("#perspectiveheader6").val() != ""
  ) {
    perspectiveObj.scoreCardValue.header6 = $("#perspectiveheader6").val();
  }
  if (
    $("#perspectiveheader7").val() != null &&
    $("#perspectiveheader7").val() != ""
  ) {
    perspectiveObj.scoreCardValue.header7 = $("#perspectiveheader7").val();
  }

  perspectiveObj["includeReportee"] = false;

  if ($("#chk_include_reportee").is(":checked") == true) {
    perspectiveObj["includeReportee"] = true;
  }

  /*
   * $.each($("input[name='scorecard_fields']:checked"), function(idx) { var
   * count = idx + 3; perspectiveObj.scoreCardValue['header' + count] =
   * $(this).val(); });
   */

  return perspectiveObj;
}

function getPerspectiveParentObj(scorecardName, scorecarddata) {
  console.log(scorecarddata, "scorecarddata");
  const scorecardFieldsPayload = getScorecardFieldsPayload();
;
  console.log(scorecardFieldsPayload ,  "scorecardFieldsPayload");
  /*
   * var perspectiveObj = { "id" : scorecarddata.id, "scorecardName" :
   * scorecardName, "owner" : scorecarddata.owner, "pageId" :
   * scorecarddata.pageId, "createdBy" : scorecarddata.createdBy,
   * "scoreCardValue" : { "name" : scorecarddata.scoreCardValue.name,
   * "defaultscr" : scorecarddata.scoreCardValue.defaultscr, "description" :
   * scorecarddata.scoreCardValue.description, "header1" : "ID", "header2" :
   * "Period" } }
   */

  var perspectiveObj = {
    pageId: $("#pagenumber").val(),
    createdBy: scorecarddata.createdBy,
    id: scorecarddata.id,
    scorecardName: $("#scorecardForm #scorecard_name").val(),
    owner: $("#scorecard_owner").val(),
    departmentId: $("#scorecarddept").val(),
    scoreCardDetailsValue: {
      scoreCardName: $("#scorecardForm #scorecard_name").val(),
      //"defaultscr" : scorecarddata.scoreCardDetailsValue.defaultscr,
      //"thresholdFormula" : scorecarddata.scoreCardDetailsValue.thresholdFormula,
      description: $("#scorecard_description").val(),
      scorecardFormula: $("#scorecard_formula").val(),
      score_card_start_end_date: $("#scorecardForm #date_range").val(),
      scorecardweight: $("#scorecard_weight").val(),
      //"weight" : scorecarddata.scoreCardDetailsValue.weight,
      //"subweight" : $("#scorecard_sub_weight").val(),
      status: $("#scorecard_status").val(),
      scorecardFields: scorecardFieldsPayload
    },
  };

  // perspectiveObj['includeReportee'] = false;
  perspectiveObj["scoreCardDetailsValue"]["customReportees"] = "";

  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.aggregation != undefined &&
    controlpanelScorecardSettings.aggregation == true
  ) {
    if (
      controlpanelScorecardSettings != "" &&
      controlpanelScorecardSettings != undefined &&
      controlpanelScorecardSettings.aggregationType != undefined &&
      controlpanelScorecardSettings.aggregationType == "Custom"
    ) {
      perspectiveObj["scoreCardDetailsValue"]["customReportees"] = $(
        "#scorecard_Custom_reportee"
      )
        .val()
        .join(",");
    }
  }

  /*
   * if($("#chk_include_reportee").is(":checked") == true){
   * perspectiveObj['includeReportee'] = true;
   * perspectiveObj['customReportees'] =
   * $("#scorecard_Custom_reportee").val().join(','); }
   */

  /*$.each($("input[name='scorecard_fields']:checked"),
					function(idx) {
						var count = idx + 3;
						perspectiveObj.scoreCardValue['header' + count] = $(
								this).val();
					});*/

  return perspectiveObj;
}

function getScorecardTemplObj(scorecardname, empId, scoreCardDetailsId) {
  var scorecardObj = {
    owner: empId,
    pageId: $("#pagenumber").val(),
    departmentId: "",
    scoreCardDetailsId: scoreCardDetailsId,
    scoreCardValue: {
      name: scorecardname,
      perspective_start_end_date: $("#datePeriod").val(),
      description: scorecardname,
      defaultscr: "true",
      header1: "ID",
      header2: "Period",
      header3: "Actual",
      header4: "Target",
      header5: "Trend",
    },
  };
  return scorecardObj;
}

function createtemplatescorecard(perspectiveObj) {
  $.ajax({
    url: "/stratroom/scorecard/",
    type: "post",
    contentType: "application/json",
    async: false,
    data: JSON.stringify(perspectiveObj),
    success: function (data, status) {
      console.log("New scorecard was created..");
    },
  });
}

function handlePerspectiveSave() {
  var action = $("#perspectiveForm input[name='action']").val();
  var defaultscr = $("#perspectiveForm input[name='defaultscr']").val();
  if (action == "delete") {
  } else {
    var perspectiveObj = getPerspectiveObj();
    var methodType = "post";
    if (action == "add") {
      perspectiveObj.customReportees = "";
    } else if (action == "edit") {
      perspectiveObj.perspectiveId = $("#perspective_id").val();
      perspectiveObj.id = $("#perspectiveId").val();
      perspectiveObj.customReportees = $("#perspectivecustomreportee").val();

      if (
        $("#scorecardweight").val() != null &&
        $("#scorecardweight").val() != ""
      ) {
        perspectiveObj.scoreCardValue.scorecardweight =
          $("#scorecardweight").val();
      }

      if (
        $("#perspectiveheader3").val() != null &&
        $("#perspectiveheader3").val() != ""
      ) {
        perspectiveObj.scoreCardValue.header3 = $("#perspectiveheader3").val();
      }
      if (
        $("#perspectiveheader4").val() != null &&
        $("#perspectiveheader4").val() != ""
      ) {
        perspectiveObj.scoreCardValue.header4 = $("#perspectiveheader4").val();
      }
      if (
        $("#perspectiveheader5").val() != null &&
        $("#perspectiveheader5").val() != ""
      ) {
        perspectiveObj.scoreCardValue.header5 = $("#perspectiveheader5").val();
      }
      if (
        $("#perspectiveheader6").val() != null &&
        $("#perspectiveheader6").val() != ""
      ) {
        perspectiveObj.scoreCardValue.header6 = $("#perspectiveheader6").val();
      }
      if (
        $("#perspectiveheader7").val() != null &&
        $("#perspectiveheader7").val() != ""
      ) {
        perspectiveObj.scoreCardValue.header7 = $("#perspectiveheader7").val();
      }
      methodType = "put";
    }

    $.ajax({
      url: "/stratroom/scorecard/",
      type: methodType,
      contentType: "application/json",
      data: JSON.stringify(perspectiveObj),
      success: function (data, status) {
        $("#perspectiveForm").css("display", "none");
        location.reload(true);
        console.log("New scorecard was created..");
      },
    });
  }
}

function handleScorecardSave() {

	var pageno = $('#pagenumber').val();
	var pageUrl = "";
	
	var frequency 	= 	localStorage.getItem("customperiod");
	if((empId != undefined && empId !=	"") && (frequency	!=	null && frequency	!=	"")){
		// pageUrl = "/stratroom/scoreCardList?pageId=" + pageno+"&empId="+empId+"&datePeriod="+$("#datePeriod").val()+"&frequency="+frequency;
		pageUrl = "/stratroom/scoreCardList?pageId=" + pageno+"&empId="+parseInt(empId)+"&datePeriod="+$("#datePeriod").val()+"&frequency="+frequency +"&language=en";	
	}else if((empId != undefined && empId !=	"") && (frequency	==	null || frequency	==	"")){
		// pageUrl = "/stratroom/scoreCardList?pageId=" + pageno+"&empId="+empId+"&datePeriod="+$("#datePeriod").val();
		pageUrl = "/stratroom/scoreCardList?pageId=" + pageno+"&empId="+parseInt(empId)+"&datePeriod="+$("#datePeriod").val() +"&language=en";	
	}else{
		// pageUrl = "/stratroom/scoreCardList?pageId=" + pageno+"&datePeriod="+$("#datePeriod").val();
		pageUrl = "/stratroom/scoreCardList?pageId=" + pageno+"&datePeriod="+$("#datePeriod").val() +"&language=en";
	}
	
	// $.ajax({
	// 	url : pageUrl,
	// 	success : function(data, status) {
			
					scorecardlist = getScoreCardData;
					var perspectiveobj = getPerspectiveParentObj($("#scorecard_name").val(), scorecardlist);
					methodType = 'put';
					
					$.ajax({
						url : "/stratroom/scorecardDetails",
						type : methodType,
						contentType : "application/json",
						data : JSON.stringify(perspectiveobj),
						success : function(data, status) {
							$("#scorecardForm").css('display', 'none');
							location.reload(true);
						}
					});
			
	// 	},
	// 	error:readErrorMsg
	// });
}

$("#scorecard_owner").change(function () {
  var emp = $(this).val();
  var deptempid = emp == "" && emp == undefined ? empId : emp;
  departmentlist(".scorecard_description_popup #scorecarddept", deptempid);
});

function prefillScorecardFields(scorecardFields) {
  console.log("Prefilling scorecard fields:", scorecardFields);

  $('input[name="scorecard_fields"]').each(function () {
    const fieldName = $(this).val(); 

    if (scorecardFields && scorecardFields[fieldName] == "true") {
      $(this).prop("checked", true);
    } else {
      $(this).prop("checked", false);
    }
  });
}


function handleScoreCardEvent() {


  
    console.log(scorecardlist.scoreCardDetailsValue.scorecardFields, "thissssssssss");
   

  console.log(scorecardlist, "scorecardlist in handleScoreCardEvent");
  $("#scorecardForm").trigger("reset");
  populateOwnerDropdownScorecard(
    ".scorecard_description_popup #scorecard_owner",
    ".scorecard_description_popup"
  );

    prefillScorecardFields(scorecardlist.scoreCardDetailsValue.scorecardFields);

  var implementationtypemethod = false;
  if (
    controlpanelgeneralsiteSettings.implementation != null &&
    controlpanelgeneralsiteSettings.implementation != undefined &&
    controlpanelgeneralsiteSettings.implementationType != null &&
    controlpanelgeneralsiteSettings.implementationType != undefined
  ) {
    if (controlpanelgeneralsiteSettings.implementationType == "Department") {
      implementationtypemethod = true;
    }
  }

  if (implementationtypemethod) {
    departmentWiseReportees();
  }

  if (!implementationtypemethod) {
    populatecustomReporteeOwnerDropdownScorecard(
      ".scorecard_description_popup #scorecard_Custom_reportee",
      ".scorecard_description_popup"
    );
  }

  $(".scorecard_description_popup #scorecard_id").prop("disabled", true);

  var deptempid =
    scorecardlist.owner == "" && scorecardlist.owner == undefined
      ? empId
      : scorecardlist.owner;
  departmentlist(".scorecard_description_popup #scorecarddept", deptempid);

  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.aggregation != undefined &&
    controlpanelScorecardSettings.aggregation == true
  ) {
    if (
      controlpanelScorecardSettings != "" &&
      controlpanelScorecardSettings != undefined &&
      controlpanelScorecardSettings.aggregationType != undefined &&
      controlpanelScorecardSettings.aggregationType != "Custom"
    ) {
      $(".customaggregationElement").remove();
    }
  } else {
    $(".customaggregationElement").remove();
  }

  $("#scorecard_id").val(scorecardlist.id);
  var scorecardElementname = "Scorecard";
  if (scorecardlist.scoreCardDetailsValue.scoreCardName != undefined) {
    scorecardElementname = scorecardlist.scoreCardDetailsValue.scoreCardName;
  }
  $("#scorecard_name").val(scorecardElementname);

  if (scorecardlist.scoreCardDetailsValue.description == undefined) {
    $("#scorecard_description").val("Scorecard");
  } else {
    $("#scorecard_description").val(
      scorecardlist.scoreCardDetailsValue.description
    );
  }
  if (scorecardlist.owner == "") {
    $("#scorecard_owner").val(empId);
  } else {
    $("#scorecard_owner").val(scorecardlist.owner);
  }

  if (
    scorecardlist.departmentId != "" &&
    scorecardlist.departmentId != undefined &&
    scorecardlist.departmentId != null
  ) {
    $("#scorecarddept").val(scorecardlist.departmentId);
  } else {
    $("#scorecarddept").val("");
  }

  $("#scorecarddept").select2({
    selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
    dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown"),
  });

  if (
    scorecardlist.scoreCardDetailsValue.status != "" &&
    scorecardlist.scoreCardDetailsValue.status != null &&
    scorecardlist.scoreCardDetailsValue.status != undefined
  ) {
    $("#scorecard_status").val(scorecardlist.scoreCardDetailsValue.status);
  } else {
    $("#scorecard_status").val("Weighted");
  }
  if (
    scorecardlist.scoreCardDetailsValue.weight != "" &&
    scorecardlist.scoreCardDetailsValue.weight != undefined
  ) {
    $("#scorecard_weight").val(scorecardlist.scoreCardDetailsValue.weight);
  } else {
    $("#scorecard_weight").val(0);
  }

  if (
    scorecardlist.scoreCardDetailsValue.scorecardFormula != "" &&
    scorecardlist.scoreCardDetailsValue.scorecardFormula != undefined
  ) {
    $("#scorecard_formula").val(
      scorecardlist.scoreCardDetailsValue.scorecardFormula
    );
  }

  //$("#scorecard_sub_weight").val(scorecard.cardDetailsDTO.scoreCardDetailsValue.scorecardsubweight);
  $("#date_range").datepicker({
    language: "en",
    // minDate: startdate,
    // maxDate: enddate,
    range: true,
    autoClose: true,
    todayButton: false,
    position: "top left",
    onSelect: function (fd) {},
  });
  $("#date_range").val(
    scorecardlist.scoreCardDetailsValue.score_card_start_end_date
  );

  /*
   * if(scorecard.scoreCardValue.perspective_start_end_date != "" &&
   * scorecard.scoreCardValue.perspective_start_end_date != undefined &&
   * scorecard.scoreCardValue.perspective_start_end_date != null){ var
   * daterange1 = scorecard.scoreCardValue.perspective_start_end_date;
   * var startdate = new Date(); var enddate = new Date(); if
   * (daterange1.includes("-")) { var dateval = daterange1.split('-');
   * startdate = new Date(dateval[0]); enddate = new Date(dateval[1]); }
   *
   * $("#date_range").datepicker({ language: 'en', //minDate:
   * startdate, //maxDate: enddate, range: true, autoClose: true,
   * todayButton: false, position: "top left", onSelect: function (fd) {
   *  } });
   * $("#date_range").val(scorecard.scoreCardValue.perspective_start_end_date);
   * }else{ var daterange2 = $('#datePeriod').val(); var startdate =
   * new Date(); var enddate = new Date(); if
   * (daterange2.includes("-")) { var dateval = daterange2.split('-');
   * startdate = new Date(dateval[0]); enddate = new Date(dateval[1]); }
   *
   * $("#date_range").datepicker({ language: 'en', //minDate:
   * startdate, //maxDate: enddate, range: true, autoClose: true,
   * todayButton: false, position: "top left", onSelect: function (fd) {
   *  } }); $("#date_range").val($('#datePeriod').val()); }
   */

  var createdTimeread =
    scorecardlist.createdTime != undefined ? scorecardlist.createdTime : "";
  if (createdTimeread) {
    createdTimeread = new Date(createdTimeread)
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");
  }

  var updatedTimeread =
    scorecardlist.updatedTime != undefined ? scorecardlist.updatedTime : "";
  if (updatedTimeread) {
    updatedTimeread = new Date(updatedTimeread)
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");
  }

  $("#createdById").val(scorecardlist.createdBy);
  $("#configcreatedBy").html(
    scorecardlist.scoreCardDetailsValue.createdByName != undefined
      ? scorecardlist.scoreCardDetailsValue.createdByName
      : ""
  );
  $("#configupdatedBy").html(
    scorecardlist.scoreCardDetailsValue.updatedByName != undefined
      ? scorecardlist.scoreCardDetailsValue.updatedByName
      : ""
  );
  $("#configcreatedByDate").html(createdTimeread);
  $("#configupdatedByDate").html(updatedTimeread);

  /*for (var i = 2; i <= 9; i++) {
					var header = scorecard.scoreCardValue['header' + i];
					$('#scorecardForm input[value=' + header + ']').prop('checked',
							true);
				}*/

  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.aggregation != undefined &&
    controlpanelScorecardSettings.aggregation == true
  ) {
    $("#scorecard_Custom_reportee").attr("readonly", false);
    $("#scorecard_Custom_reportee").removeAttr("disabled");
  }

  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    (controlpanelScorecardSettings.customPerformance == undefined ||
      controlpanelScorecardSettings.customPerformance == false)
  ) {
    $(".performancehidescorecard").hide();
  }

  /*
   * if(scorecard.includeReportee != undefined &&
   * scorecard.includeReportee == true){
   * $('#chk_include_reportee').prop('checked', true);
   * $('#ca_input').show(); }
   */

  var customReportees = [];
  if (scorecardlist.scoreCardDetailsValue.customReportees != undefined) {
    var cutreportees =
      scorecardlist.scoreCardDetailsValue.customReportees.split(",");
    $.each(cutreportees, function (index, module) {
      customReportees.push(module);
    });
    $("#scorecard_Custom_reportee").val(customReportees);
  }

  $(".perspective-multi-select").select2();
}

function departmentWiseReportees() {
  $("#scorecard_Custom_reportee").empty();
  $.ajax({
    type: "GET",
    url: "/stratroom/departmentReportees",
    async: false,
    success: function (data) {
      var customReportees = [];
      $.each(data, function (index, module) {
        addOption("#scorecard_Custom_reportee", module.name, module.id);
        customReportees.push(module.id);
      });
    },
  });
}

function handlePerspectiveEvent(id, action) {
  $("#perspectiveForm").css("display", "none");
  $("#perspectiveForm").trigger("reset");
  populateOwnerDropdownScorecard(
    ".perspectives_description_popup #perspective_owner",
    ".perspectives_description_popup"
  );
  $("#perspectiveForm input[name='action']").val(action);
  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.customPerformance != undefined &&
    controlpanelScorecardSettings.customPerformance == true
  ) {
    if (
      controlpanelScorecardSettings != "" &&
      controlpanelScorecardSettings != undefined &&
      controlpanelScorecardSettings.customPerspective != undefined &&
      controlpanelScorecardSettings.customPerspective != true
    ) {
      $(".perspectiveperformanceElement").hide();
    }
  } else {
    $(".perspectiveperformanceElement").hide();
  }

  if (action == "delete") {
    $("#deletescoreid").val(id);
    $("#deleterecordtype").val("scorecardperspective");

    $("#deleteModalscorecard").modal("toggle");
    $(window).on("resize", function () {
      $(".modal:visible").each(alignModal);
    });
    $(".modal").on("shown.bs.modal", alignModal);
  } else if (action == "add") {
    $("#createdBy").html("");
    $("#createdByDate").html("");
    $("#updatedBy").html("");
    $("#updatedByDate").html("");
    $("#perspective_owner").val();
    $("#perspective_id_wrapper").css("display", "none"); // Hide the ID
    $(".perspectives_description_popup").css("display", "block");
    // input when
    // adding new
    // perspective
    $(".perspectives_description_popup #perspectiveForm *").prop(
      "disabled",
      false
    );
    $("#perspectiveForm").css("display", "block");
    $(".perspectives_description_popup #perspective_owner").val(empId);
    var defaultscr = "false";
    $("#perspectiveForm input[name='defaultscr']").val(defaultscr);
  } else {
    // view and edit
    $("#perspective_id_wrapper").css("display", "block");
    $(".perspectives_description_popup").css("display", "block");
    $(".perspectives_description_popup #perspectiveForm *").prop(
      "disabled",
      false
    );
    $(".perspectives_description_popup #perspective_id").prop("disabled", true);

    if (action == "view") {
      $(".perspectives_description_popup #perspectiveForm *").prop(
        "disabled",
        true
      );
      $(".perspectives_description_popup #perspectiveForm button").prop(
        "disabled",
        false
      );
      $(
        '.perspectives_description_popup #perspectiveForm button[value="Save"]'
      ).css("display", "none");
    }

    $.ajax({
      url: "/stratroom/scorecard/" + id,
      success: perspectiveSuccessCallback,
    });
  }
}
var pageno = $("#pagenumber").val();
function scorecardpagepreference() {
  var checkpageno = $("#defaultpagenumber").val();
  if (checkpageno != undefined && checkpageno != "") {
    pageno = checkpageno;
  }

  if (
    $("#userrolename").val() == "Super User" ||
    $("#userrolename").val() == "Admin"
  ) {
    if ($("#userPrincipal").val() != $("#userPrincipalnavigate").val()) {
      if ($(".superusertopmenu").hasClass(pageno)) {
        $("." + pageno).addClass("homepageHighlight");
      }
    }
  }

  if (jQuery.isEmptyObject(scorepreference)) {
    $.ajax({
      url: "/stratroom/getPreferences?pageName=SCORECARD&pageId=" + pageno,
      async: false,
      success: function (employeeList) {
        scorepreference = employeeList;
      },
    });
  }
}

function getscorecardpermission() {
  $.ajax({
    type: "GET",
    url: "/stratroom/user/modulePermissions?moduleName=Scorecard",
    async: false,
    success: function (data) {
      if (
        data.Scorecard != undefined &&
        !jQuery.isEmptyObject(data.Scorecard)
      ) {
        scorecardmodPermission = data.Scorecard.Scorecard;
        //pespective
        if (
          data.Scorecard.Perspective.privilegeCreate != undefined &&
          data.Scorecard.Perspective.privilegeCreate == "TRUE"
        ) {
          perspectivecreatepermission = true;
        }
        if (
          data.Scorecard.Perspective.privilegeUpdate != undefined &&
          data.Scorecard.Perspective.privilegeUpdate == "TRUE"
        ) {
          perspectiveeditpermission = true;
        }
        if (
          data.Scorecard.Perspective.privilegeView != undefined &&
          data.Scorecard.Perspective.privilegeView == "TRUE"
        ) {
          perspectiveviewpermission = true;
        }
        //objective
        if (
          data.Scorecard.Objective.privilegeCreate != undefined &&
          data.Scorecard.Objective.privilegeCreate == "TRUE"
        ) {
          objectivecreatepermission = true;
        }
        if (
          data.Scorecard.Objective.privilegeUpdate != undefined &&
          data.Scorecard.Objective.privilegeUpdate == "TRUE"
        ) {
          objectiveeditpermission = true;
        }
        if (
          data.Scorecard.Objective.privilegeView != undefined &&
          data.Scorecard.Objective.privilegeView == "TRUE"
        ) {
          objectiveviewpermission = true;
        }
        if (
          data.Scorecard.Objective.privilegeDelete != undefined &&
          data.Scorecard.Objective.privilegeDelete == "TRUE"
        ) {
          objectivedeletepermission = true;
        }
        //kpi
        if (
          data.Scorecard.KPI.privilegeCreate != undefined &&
          data.Scorecard.KPI.privilegeCreate == "TRUE"
        ) {
          kpicreatepermission = true;
        }
        if (
          data.Scorecard.KPI.privilegeCreate != undefined &&
          data.Scorecard.KPI.privilegeCreate == "TRUE"
        ) {
          subkpicreatepermission = true;
        }
        if (
          data.Scorecard.KPI.privilegeUpdate != undefined &&
          data.Scorecard.KPI.privilegeUpdate == "TRUE"
        ) {
          kpieditpermission = true;
        }
        if (
          data.Scorecard.KPI.privilegeView != undefined &&
          data.Scorecard.KPI.privilegeView == "TRUE"
        ) {
          kpiviewpermission = true;
        }
        if (
          data.Scorecard.KPI.privilegeDelete != undefined &&
          data.Scorecard.KPI.privilegeDelete == "TRUE"
        ) {
          kpideletepermission = true;
        }
        //formula register
        $.each(data.Scorecard, function (forindex, fordata) {
          if (forindex == "Formula Register") {
            if (
              fordata.privilegeCreate != undefined &&
              fordata.privilegeCreate == "TRUE"
            ) {
              formulacreatepermission = true;
            }
            if (
              fordata.privilegeView != undefined &&
              fordata.privilegeView == "TRUE"
            ) {
              formulaviewpermission = true;
            }
          }
        });

        //kpi view
        $.each(data.Scorecard, function (forindex, fordata) {
          if (forindex == "KPI View") {
            if (
              fordata.privilegeCreate != undefined &&
              fordata.privilegeCreate == "TRUE"
            ) {
              KpiViewcreatepermission = true;
            }
            if (
              fordata.privilegeUpdate != undefined &&
              fordata.privilegeUpdate == "TRUE"
            ) {
              KpiVieweditpermission = true;
            }
            if (
              fordata.privilegeView != undefined &&
              fordata.privilegeView == "TRUE"
            ) {
              KpiViewviewpermission = true;
            }
            if (
              fordata.privilegeDelete != undefined &&
              fordata.privilegeDelete == "TRUE"
            ) {
              KpiViewdeletepermission = true;
            }
          }
        });
      }
    },
  });
}

$(document).ready(function () {
  getscorecardpermission();
  if (
    scorecardmodPermission.privilegeCreate != undefined &&
    scorecardmodPermission.privilegeCreate == "TRUE"
  ) {
    scorecreatepermission = true;
    $(".scorecardenableviewicon").css("display", "block");
  }

  if (
    scorecardmodPermission.privilegeUpdate != undefined &&
    scorecardmodPermission.privilegeUpdate == "TRUE"
  ) {
    scoreeditpermission = true;
    $(".scorecardenableviewicon").css("display", "block");
  }

  if (
    scorecardmodPermission.privilegeDelete != undefined &&
    scorecardmodPermission.privilegeDelete == "TRUE"
  ) {
    scoredeletepermission = true;
  }

  if (
    scorecardmodPermission.privilegeView != undefined &&
    scorecardmodPermission.privilegeView == "TRUE"
  ) {
    scoreviewpermission = true;
    $(".scorecardenableviewicon").css("display", "block");
  }

  if (enableaccesscontrolMenu == true) {
    //scoreeditpermission		=	true;
    //scoredeletepermission	=	true;
    //scorecreatepermission	=	true;
    //scoreviewpermission		=	true;
    //$(".scorecardenableviewicon").css("display","block");
  }

  if (scoreeditpermission == false) {
    $(".scorecardenableviewicon").css("display", "none");
  }

  if (
    scoreeditpermission == true ||
    scoredeletepermission == true ||
    scorecreatepermission == true ||
    scoreviewpermission == true
  ) {
    scorecardloadview = true;
  }
  if (
    scoreeditpermission == false &&
    scoredeletepermission == false &&
    scorecreatepermission == false &&
    scoreviewpermission == false
  ) {
    $(".scorecardexportlink").hide();
  }

  /*if(scoreeditpermission == true && scoredeletepermission == false && scorecreatepermission == false && scoreviewpermission == false){
		$(".scorecardimportviewicon").css("display","none");
	}
	
	if(scoreeditpermission == false && scoredeletepermission == false && scorecreatepermission == false && scoreviewpermission == true){
		$(".scorecardimportviewicon").css("display","none");
	}*/
  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.submeasurerequired != undefined &&
    controlpanelScorecardSettings.submeasurerequired == true
  ) {
    measureFieldenable = true;
  }
  if (scorecreatepermission == false) {
    $(".scorecardimportviewicon").css("display", "none");
    //$(".formularegisterimport").remove();
  }
  if (formulaviewpermission == false) {
    $(".formularegisterimport").remove();
  }

  var formulalinkEnable = false;
  if (enableaccesscontrolMenu == false) {
    if (
      LicenseDetailsdata["moduleList"] != undefined &&
      LicenseDetailsdata["moduleList"] != "" &&
      LicenseDetailsdata["moduleList"] != null
    ) {
      $.each(LicenseDetailsdata["moduleList"], function (index, reportee) {
        if (reportee.moduleName == "Strategy Formulation") {
          formulalinkEnable = true;
        }
      });
    }
  }

  /*if(strategyforlink ==	false){
		$(".formularegisterimport").remove();	
	}
	
	if(scorecreatepermission	!=	true){
		$(".formularegisterimport").remove();
	}*/

  var ischeckscurlornot = $("#ischeckscurlornot").val();
  var empId = $("#userPrincipal").val();
  if (ischeckscurlornot == "SCORECARD") {
    scorecardpagepreference();
  }
  if (scorecardloadview == true) {
    fetchScordcardData();
  }
  getreporteelist();

  $("#initiate_sidebar .profile_content").click(function (e) {
    var text = $(this).find("p").text();
  });

  $("#kpiDataType").on("change", function () {
    if ($(this).val() == "Currency") {
      $(".kpiCurrencyfield").show();
    } else {
      $(".kpiCurrencyfield").hide();
    }
  });

  $("#kpi_threshold").on("change", function () {
    kpithreshold = $(this).val();
    if ($(this).val() == "three_status") {
      $(".color_picks_1").css("display", "none");
      $(".color_picks_2").css("display", "none");
      $(".color_picks_5").css("display", "none");

      $(".color_picks_3").css("display", "block");
      $("#optioncolor1").val("");
      $("#optioncolor2").val("");
      $("#optioncolor3").val("");
      $("#optioncolor4").val("");
      $("#optioncolor5").val("");
    } else if ($(this).val() == "five_status") {
      $(".color_picks_1").css("display", "none");
      $(".color_picks_2").css("display", "none");
      $(".color_picks_3").css("display", "none");

      $(".color_picks_5").css("display", "block");

      var elements = $(".color_picks_5");
      elements.removeClass("col-md-4").addClass("col-md-2");

      $("#optioncolor1").val("");
      $("#optioncolor2").val("");
      $("#optioncolor3").val("");
      $("#optioncolor4").val("");
      $("#optioncolor5").val("");
    } else {
      $(".color_picks_1").css("display", "none");
      $(".color_picks_2").css("display", "none");
      $(".color_picks_3").css("display", "none");
    }
  });

  $("#editkpi_threshold").on("change", function () {
    kpithreshold = $(this).val();
    if ($(this).val() == "three_status") {
      $(".color_picks_1").css("display", "none");
      $(".color_picks_2").css("display", "none");
      $(".color_picks_5").css("display", "none");

      $(".color_picks_3").css("display", "block");
      $("#optioncolor1").val("");
      $("#optioncolor2").val("");
      $("#optioncolor3").val("");
      $("#optioncolor4").val("");
      $("#optioncolor5").val("");
    } else if ($(this).val() == "five_status") {
      $(".color_picks_1").css("display", "none");
      $(".color_picks_2").css("display", "none");
      $(".color_picks_3").css("display", "none");

      $(".color_picks_5").css("display", "block");

      var elements = $(".color_picks_5");
      elements.removeClass("col-md-4").addClass("col-md-2");

      $("#optioncolor1").val("");
      $("#optioncolor2").val("");
      $("#optioncolor3").val("");
      $("#optioncolor4").val("");
      $("#optioncolor5").val("");
    } else {
      $(".color_picks_1").css("display", "none");
      $(".color_picks_2").css("display", "none");
      $(".color_picks_3").css("display", "none");
    }
  });
  var defaultcolor = "";
  // $(document).on("click",".pickr",function(){
  // defaultcolor = $(this).css("background-color");
  // $(this).toArray().forEach(function(item,index){test(defaultcolor,
  // item,index)});
  // });

  /*if(scoreeditpermission ==	true || scorecreatepermission == true){
			colorpanelTrigger();
		}*/

  $('[data-toggle="tooltip"]').tooltip();
});

$("input[data-type='currency']").on({
  keyup: function () {
    formatCurrency($(this));
  },
  blur: function () {
    formatCurrency($(this), "blur");
  },
});

$("#targetamount").on({
  keyup: function () {
    formatCurrency($(this), "value");
  },
  keypress: function () {
    formatCurrency($(this), "value");
  },
  blur: function () {
    formatCurrency($(this), "value", "blur");
  },
});

function colorpanelTrigger() {
  var current_color1 = null;
  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.threshold1Color != undefined &&
    controlpanelScorecardSettings.threshold1Color != ""
  ) {
    current_color1 = controlpanelScorecardSettings.threshold1Color;
  }

  const pickr1 = new Pickr({
    el: $(".pickr")[0],
    useAsButton: true,
    theme: "classic",
    default: current_color1,
    defaultRepresentation: "HEX",
    comparison: false,
    swatches: [
      "rgba(244, 67, 54, 1)",
      "rgba(233, 30, 99, 0.95)",
      "rgba(156, 39, 176, 0.9)",
      "rgba(103, 58, 183, 0.85)",
      "rgba(63, 81, 181, 0.8)",
      "rgba(33, 150, 243, 0.75)",
      "rgba(3, 169, 244, 0.7)",
      "rgba(0, 188, 212, 0.7)",
      "rgba(0, 150, 136, 0.75)",
      "rgba(76, 175, 80, 0.8)",
      "rgba(139, 195, 74, 0.85)",
      "rgba(205, 220, 57, 0.9)",
      "rgba(255, 235, 59, 0.95)",
      "rgba(255, 193, 7, 1)",
      "rgba(238, 19, 3, 1)",
    ],

    components: {
      preview: true,
      opacity: true,
      hue: true,

      interaction: {
        hex: true,
        rgba: true,
        hsva: true,
        input: true,
        save: true,
      },
    },
  }).on("save", (color) => {
    $(".pickr")[0].style.background = color.toRGBA().toString(0);
    console.log("Fetching done1");
    pickr1.hide();
  });

  var current_color2 = null;
  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.threshold1Color != undefined &&
    controlpanelScorecardSettings.threshold2Color != ""
  ) {
    current_color2 = controlpanelScorecardSettings.threshold2Color;
  }

  const pickr2 = new Pickr({
    el: $(".pickr")[1],
    useAsButton: true,
    theme: "classic",
    default: current_color2,
    defaultRepresentation: "HEX",
    comparison: false,
    swatches: [
      "rgba(244, 67, 54, 1)",
      "rgba(233, 30, 99, 0.95)",
      "rgba(156, 39, 176, 0.9)",
      "rgba(103, 58, 183, 0.85)",
      "rgba(63, 81, 181, 0.8)",
      "rgba(33, 150, 243, 0.75)",
      "rgba(3, 169, 244, 0.7)",
      "rgba(0, 188, 212, 0.7)",
      "rgba(0, 150, 136, 0.75)",
      "rgba(76, 175, 80, 0.8)",
      "rgba(139, 195, 74, 0.85)",
      "rgba(205, 220, 57, 0.9)",
      "rgba(255, 235, 59, 0.95)",
      "rgba(255, 193, 7, 1)",
      "rgba(238, 19, 3, 1)",
    ],

    components: {
      preview: true,
      opacity: true,
      hue: true,

      interaction: {
        hex: true,
        rgba: true,
        hsva: true,
        input: true,
        save: true,
      },
    },
  }).on("save", (color) => {
    $(".pickr")[1].style.background = color.toRGBA().toString(0);
    console.log("Fetching done1");
    pickr2.hide();
  });

  var current_color3 = null;
  if (
    controlpanelScorecardSettings != "" &&
    controlpanelScorecardSettings != undefined &&
    controlpanelScorecardSettings.threshold1Color != undefined &&
    controlpanelScorecardSettings.threshold3Color != ""
  ) {
    current_color3 = controlpanelScorecardSettings.threshold3Color;
  }

  const pickr3 = new Pickr({
    el: $(".pickr")[2],
    useAsButton: true,
    theme: "classic",
    default: current_color3,
    defaultRepresentation: "HEX",
    comparison: false,
    swatches: [
      "rgba(244, 67, 54, 1)",
      "rgba(233, 30, 99, 0.95)",
      "rgba(156, 39, 176, 0.9)",
      "rgba(103, 58, 183, 0.85)",
      "rgba(63, 81, 181, 0.8)",
      "rgba(33, 150, 243, 0.75)",
      "rgba(3, 169, 244, 0.7)",
      "rgba(0, 188, 212, 0.7)",
      "rgba(0, 150, 136, 0.75)",
      "rgba(76, 175, 80, 0.8)",
      "rgba(139, 195, 74, 0.85)",
      "rgba(205, 220, 57, 0.9)",
      "rgba(255, 235, 59, 0.95)",
      "rgba(255, 193, 7, 1)",
      "rgba(238, 19, 3, 1)",
    ],

    components: {
      preview: true,
      opacity: true,
      hue: true,

      interaction: {
        hex: true,
        rgba: true,
        hsva: true,
        input: true,
        save: true,
      },
    },
  }).on("save", (color) => {
    $(".pickr")[2].style.background = color.toRGBA().toString(0);
    console.log("Fetching done1");
    pickr3.hide();
  });

  const pickr4 = new Pickr({
    el: $(".pickr")[3],
    useAsButton: true,
    theme: "classic",
    default: current_color4,
    defaultRepresentation: "HEX",
    comparison: false,
    swatches: [
      "rgba(244, 67, 54, 1)",
      "rgba(233, 30, 99, 0.95)",
      "rgba(156, 39, 176, 0.9)",
      "rgba(103, 58, 183, 0.85)",
      "rgba(63, 81, 181, 0.8)",
      "rgba(33, 150, 243, 0.75)",
      "rgba(3, 169, 244, 0.7)",
      "rgba(0, 188, 212, 0.7)",
      "rgba(0, 150, 136, 0.75)",
      "rgba(76, 175, 80, 0.8)",
      "rgba(139, 195, 74, 0.85)",
      "rgba(205, 220, 57, 0.9)",
      "rgba(255, 235, 59, 0.95)",
      "rgba(255, 193, 7, 1)",
      "rgba(238, 19, 3, 1)",
    ],

    components: {
      preview: true,
      opacity: true,
      hue: true,

      interaction: {
        hex: true,
        rgba: true,
        hsva: true,
        input: true,
        save: true,
      },
    },
  }).on("save", (color) => {
    $(".pickr")[3].style.background = color.toRGBA().toString(0);
    console.log("Fetching done1");
    pickr4.hide();
  });

  const pickr5 = new Pickr({
    el: $(".pickr")[4],
    useAsButton: true,
    theme: "classic",
    default: current_color5,
    defaultRepresentation: "HEX",
    comparison: false,
    swatches: [
      "rgba(244, 67, 54, 1)",
      "rgba(233, 30, 99, 0.95)",
      "rgba(156, 39, 176, 0.9)",
      "rgba(103, 58, 183, 0.85)",
      "rgba(63, 81, 181, 0.8)",
      "rgba(33, 150, 243, 0.75)",
      "rgba(3, 169, 244, 0.7)",
      "rgba(0, 188, 212, 0.7)",
      "rgba(0, 150, 136, 0.75)",
      "rgba(76, 175, 80, 0.8)",
      "rgba(139, 195, 74, 0.85)",
      "rgba(205, 220, 57, 0.9)",
      "rgba(255, 235, 59, 0.95)",
      "rgba(255, 193, 7, 1)",
      "rgba(238, 19, 3, 1)",
    ],

    components: {
      preview: true,
      opacity: true,
      hue: true,

      interaction: {
        hex: true,
        rgba: true,
        hsva: true,
        input: true,
        save: true,
      },
    },
  }).on("save", (color) => {
    $(".pickr")[4].style.background = color.toRGBA().toString(0);
    console.log("Fetching done1");
    pickr4.hide();
  });
}

/*
 * function test(color,inputElement,index){ const pickr = new Pickr({ el:
 * inputElement, useAsButton: true, theme: 'classic', default:color,
 * defaultRepresentation: 'HEX', swatches: [ 'rgba(244, 67, 54, 1)', 'rgba(233,
 * 30, 99, 0.95)', 'rgba(156, 39, 176, 0.9)', 'rgba(103, 58, 183, 0.85)',
 * 'rgba(63, 81, 181, 0.8)', 'rgba(33, 150, 243, 0.75)', 'rgba(3, 169, 244,
 * 0.7)', 'rgba(0, 188, 212, 0.7)', 'rgba(0, 150, 136, 0.75)', 'rgba(76, 175,
 * 80, 0.8)', 'rgba(139, 195, 74, 0.85)', 'rgba(205, 220, 57, 0.9)', 'rgba(255,
 * 235, 59, 0.95)', 'rgba(255, 193, 7, 1)' ],
 *
 * components: { preview: true, opacity: true, hue: true,
 *
 * interaction: { hex: true, rgba: true, hsva: true, input: true, save: true } }
 * }).on('save', color => { inputElement.style.background =
 * color.toRGBA().toString(0); console.log("Fetching done"); pickr.hide(); })
 *  }
 */

function fieldmeasurefilter(measureNameId, fieldNameId) {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById(fieldNameId);
  filter = input.value.toUpperCase();
  ul = document.getElementById(measureNameId);
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

$(".kpi_formula_popup #formula")
  .on("keypress", function (e) {
    var elemvalue = $(this).val();
    $(".kpi_formula_popup #measureNames li").each(function (i) {
      var value = $(this).text();
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) == -1) {
        $(this).removeClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) != -1) {
        $(this).addClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue == value) {
        $(this).addClass("kpiformuladescHighlight");
      }
    });

    $(".kpi_formula_popup #kpisubmeasureNames li").each(function (i) {
      var value = $(this).text();
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) == -1) {
        $(this).removeClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) != -1) {
        $(this).addClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue == value) {
        $(this).addClass("kpiformuladescHighlight");
      }
    });
    $(".kpi_formula_popup #kpiinitiativeNames li").each(function (i) {
      var value = $(this).text();
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) == -1) {
        $(this).removeClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) != -1) {
        $(this).addClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue == value) {
        $(this).addClass("kpiformuladescHighlight");
      }
    });
    if (elemvalue == "") {
      $(".kpi_formula_popup #measureNames li").removeClass(
        "kpiformuladescHighlight"
      );
      $(".kpi_formula_popup #kpisubmeasureNames li").removeClass(
        "kpiformuladescHighlight"
      );
      $(".kpi_formula_popup #kpiinitiativeNames li").removeClass(
        "kpiformuladescHighlight"
      );
    }
  })
  .on("keyup", function (e) {
    var elemvalue = $(this).val();
    $(".kpi_formula_popup #measureNames li").each(function (i) {
      var value = $(this).text();
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) == -1) {
        $(this).removeClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) != -1) {
        $(this).addClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue == value) {
        $(this).addClass("kpiformuladescHighlight");
      }
    });
    $(".kpi_formula_popup #kpisubmeasureNames li").each(function (i) {
      var value = $(this).text();
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) == -1) {
        $(this).removeClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) != -1) {
        $(this).addClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue == value) {
        $(this).addClass("kpiformuladescHighlight");
      }
    });
    $(".kpi_formula_popup #kpiinitiativeNames li").each(function (i) {
      var value = $(this).text();
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) == -1) {
        $(this).removeClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) != -1) {
        $(this).addClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue == value) {
        $(this).addClass("kpiformuladescHighlight");
      }
    });
    if (elemvalue == "") {
      $(".kpi_formula_popup #measureNames li").removeClass(
        "kpiformuladescHighlight"
      );
      $(".kpi_formula_popup #kpisubmeasureNames li").removeClass(
        "kpiformuladescHighlight"
      );
      $(".kpi_formula_popup #kpiinitiativeNames li").removeClass(
        "kpiformuladescHighlight"
      );
    }
  });

$(".kpiYtdFormulaPoPUp #customYtdformula")
  .on("keypress", function (e) {
    var elemvalue = $(this).val();
    $(".kpiYtdFormulaPoPUp #ytdMeasureNames li").each(function (i) {
      var value = $(this).text();
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) == -1) {
        $(this).removeClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) != -1) {
        $(this).addClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue == value) {
        $(this).addClass("kpiformuladescHighlight");
      }
    });
    $(".kpiYtdFormulaPoPUp #ytdsubMeasureNames li").each(function (i) {
      var value = $(this).text();
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) == -1) {
        $(this).removeClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) != -1) {
        $(this).addClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue == value) {
        $(this).addClass("kpiformuladescHighlight");
      }
    });
    $(".kpiYtdFormulaPoPUp #ytdinitiativeNames li").each(function (i) {
      var value = $(this).text();
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) == -1) {
        $(this).removeClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) != -1) {
        $(this).addClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue == value) {
        $(this).addClass("kpiformuladescHighlight");
      }
    });
    if (elemvalue == "") {
      $(".kpiYtdFormulaPoPUp #ytdMeasureNames li").removeClass(
        "kpiformuladescHighlight"
      );
      $(".kpiYtdFormulaPoPUp #ytdsubMeasureNames li").removeClass(
        "kpiformuladescHighlight"
      );
      $(".kpiYtdFormulaPoPUp #ytdinitiativeNames li").removeClass(
        "kpiformuladescHighlight"
      );
    }
  })
  .on("keyup", function (e) {
    var elemvalue = $(this).val();
    $(".kpiYtdFormulaPoPUp #ytdMeasureNames li").each(function (i) {
      var value = $(this).text();
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) == -1) {
        $(this).removeClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) != -1) {
        $(this).addClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue == value) {
        $(this).addClass("kpiformuladescHighlight");
      }
    });
    $(".kpiYtdFormulaPoPUp #ytdsubMeasureNames li").each(function (i) {
      var value = $(this).text();
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) == -1) {
        $(this).removeClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) != -1) {
        $(this).addClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue == value) {
        $(this).addClass("kpiformuladescHighlight");
      }
    });
    $(".kpiYtdFormulaPoPUp #ytdinitiativeNames li").each(function (i) {
      var value = $(this).text();
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) == -1) {
        $(this).removeClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) != -1) {
        $(this).addClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue == value) {
        $(this).addClass("kpiformuladescHighlight");
      }
    });
    if (elemvalue == "") {
      $(".kpiYtdFormulaPoPUp #ytdMeasureNames li").removeClass(
        "kpiformuladescHighlight"
      );
      $(".kpiYtdFormulaPoPUp #ytdsubMeasureNames li").removeClass(
        "kpiformuladescHighlight"
      );
      $(".kpiYtdFormulaPoPUp #ytdinitiativeNames li").removeClass(
        "kpiformuladescHighlight"
      );
    }
  });

$(".objective_custom_threshold_popup #formulaCustomObjective")
  .on("keypress", function (e) {
    var elemvalue = $(this).val();
    $(".objective_custom_threshold_popup #objectiveMeasureNames li").each(
      function (i) {
        var value = $(this).attr("data-value");
        if (value != "" && elemvalue != "" && elemvalue.indexOf(value) == -1) {
          $(this).removeClass("kpiformuladescHighlight");
        }
        if (value != "" && elemvalue != "" && elemvalue.indexOf(value) != -1) {
          $(this).addClass("kpiformuladescHighlight");
        }
        if (value != "" && elemvalue != "" && elemvalue == value) {
          $(this).addClass("kpiformuladescHighlight");
        }
      }
    );
    if (elemvalue == "") {
      $(
        ".objective_custom_threshold_popup #objectiveMeasureNames li"
      ).removeClass("kpiformuladescHighlight");
    }
  })
  .on("keyup", function (e) {
    var elemvalue = $(this).val();
    $(".objective_custom_threshold_popup #objectiveMeasureNames li").each(
      function (i) {
        var value = $(this).attr("data-value");
        if (value != "" && elemvalue != "" && elemvalue.indexOf(value) == -1) {
          $(this).removeClass("kpiformuladescHighlight");
        }
        if (value != "" && elemvalue != "" && elemvalue.indexOf(value) != -1) {
          $(this).addClass("kpiformuladescHighlight");
        }
        if (value != "" && elemvalue != "" && elemvalue == value) {
          $(this).addClass("kpiformuladescHighlight");
        }
      }
    );
    if (elemvalue == "") {
      $(
        ".objective_custom_threshold_popup #objectiveMeasureNames li"
      ).removeClass("kpiformuladescHighlight");
    }
  });

$(".perspective_custom_threshold_popup #formulaCustomPerspective")
  .on("keypress", function (e) {
    var elemvalue = $(this).val();
    $(".perspective_custom_threshold_popup #perspectiveMeasureNames li").each(
      function (i) {
        var value = $(this).attr("data-value");
        if (value != "" && elemvalue != "" && elemvalue.indexOf(value) == -1) {
          $(this).removeClass("kpiformuladescHighlight");
        }
        if (value != "" && elemvalue != "" && elemvalue.indexOf(value) != -1) {
          $(this).addClass("kpiformuladescHighlight");
        }
        if (value != "" && elemvalue != "" && elemvalue == value) {
          $(this).addClass("kpiformuladescHighlight");
        }
      }
    );
    if (elemvalue == "") {
      $(
        ".perspective_custom_threshold_popup #perspectiveMeasureNames li"
      ).removeClass("kpiformuladescHighlight");
    }
  })
  .on("keyup", function (e) {
    var elemvalue = $(this).val();
    $(".perspective_custom_threshold_popup #perspectiveMeasureNames li").each(
      function (i) {
        var value = $(this).attr("data-value");
        if (value != "" && elemvalue != "" && elemvalue.indexOf(value) == -1) {
          $(this).removeClass("kpiformuladescHighlight");
        }
        if (value != "" && elemvalue != "" && elemvalue.indexOf(value) != -1) {
          $(this).addClass("kpiformuladescHighlight");
        }
        if (value != "" && elemvalue != "" && elemvalue == value) {
          $(this).addClass("kpiformuladescHighlight");
        }
      }
    );
    if (elemvalue == "") {
      $(
        ".perspective_custom_threshold_popup #perspectiveMeasureNames li"
      ).removeClass("kpiformuladescHighlight");
    }
  });

$(".scorecard_custom_threshold_popup #formulaScoreCardPerspective")
  .on("keypress", function (e) {
    var elemvalue = $(this).val();
    $(".scorecard_custom_threshold_popup #scorecardMeasureNames li").each(
      function (i) {
        var value = $(this).text();
        if (value != "" && elemvalue != "" && elemvalue.indexOf(value) == -1) {
          $(this).removeClass("kpiformuladescHighlight");
        }
        if (value != "" && elemvalue != "" && elemvalue.indexOf(value) != -1) {
          $(this).addClass("kpiformuladescHighlight");
        }
        if (value != "" && elemvalue != "" && elemvalue == value) {
          $(this).addClass("kpiformuladescHighlight");
        }
      }
    );
    if (elemvalue == "") {
      $(
        ".scorecard_custom_threshold_popup #scorecardMeasureNames li"
      ).removeClass("kpiformuladescHighlight");
    }
  })
  .on("keyup", function (e) {
    var elemvalue = $(this).val();
    $(".scorecard_custom_threshold_popup #scorecardMeasureNames li").each(
      function (i) {
        var value = $(this).text();
        if (value != "" && elemvalue != "" && elemvalue.indexOf(value) == -1) {
          $(this).removeClass("kpiformuladescHighlight");
        }
        if (value != "" && elemvalue != "" && elemvalue.indexOf(value) != -1) {
          $(this).addClass("kpiformuladescHighlight");
        }
        if (value != "" && elemvalue != "" && elemvalue == value) {
          $(this).addClass("kpiformuladescHighlight");
        }
      }
    );
    if (elemvalue == "") {
      $(
        ".scorecard_custom_threshold_popup #scorecardMeasureNames li"
      ).removeClass("kpiformuladescHighlight");
    }
  });

$("#performanceformula")
  .on("keypress", function (e) {
    var elemvalue = $(this).val();
    $("#PerformancemeasureNames li").each(function (i) {
      var value = $(this).text();
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) == -1) {
        $(this).removeClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) != -1) {
        $(this).addClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue == value) {
        $(this).addClass("kpiformuladescHighlight");
      }
    });
    if (elemvalue == "") {
      $("#PerformancemeasureNames li").removeClass("kpiformuladescHighlight");
    }
  })
  .on("keyup", function (e) {
    var elemvalue = $(this).val();
    $("#PerformancemeasureNames li").each(function (i) {
      var value = $(this).text();
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) == -1) {
        $(this).removeClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue.indexOf(value) != -1) {
        $(this).addClass("kpiformuladescHighlight");
      }
      if (value != "" && elemvalue != "" && elemvalue == value) {
        $(this).addClass("kpiformuladescHighlight");
      }
    });
    if (elemvalue == "") {
      $("#PerformancemeasureNames li").removeClass("kpiformuladescHighlight");
    }
  });

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

$(document).on("click", "#next-btn-1", function () {
  $("#validateImportHide").empty();
  $("#file-upload").hide();
  $("#file-validate").show();
  $("#file-save").hide();
  $(".form-progressbar li:nth-child(2)").addClass("active");
  var formdata = new FormData();
  formdata.append("scoreCardData", file);
  $(".page-loader-wrapper").css("display", "block");
  if (file != "" && file != undefined) {
    $.ajax({
      url: "/stratroom/saveScoreCardDetails?type=validation",
      type: "POST",
      data: formdata,
      processData: false,
      contentType: false,
      success: function (data, status) {
        scorecardUploadNotFoundData(data, data.parsingError);
        $(".page-loader-wrapper").css("display", "none");
      },
      error: function (msg, status) {
        $(this).val("");
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
  } else {
    $("#fileerrorshow").append("Please select upload file");
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
  var file = $('input[name="img_logo"]')[0].files[0];
  formdata.append("scoreCardData", file);
  $(".page-loader-wrapper").css("display", "block");
  $.ajax({
    url: "/stratroom/saveScoreCardDetails?type=save",
    type: "POST",
    data: formdata,
    processData: false,
    contentType: false,
    success: function (data, status) {
      /* console.log(data); */
      $(".page-loader-wrapper").css("display", "none");
      scorecardUploadSuccess(data);
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
  $(".form-progressbar li:nth-child(2)").addClass("active");
  $("#file-upload").hide();
  $("#statisticmessage").html("");
  $(".error-div").hide();
  $("#file-validate").show();
  $("#file-save").hide();
  $(".form-progressbar li:nth-child(3)").removeClass("active");
  $(".form-progressbar li:nth-child(2)").addClass("active");
});

function scorecardUploadNotFoundData(data, result) {
  $(".uploadvalidationSuccess").empty();
  var scorecard_import_error;
  /*
   * $("#validateImportHide").empty(); var validateImport ='';
   */
  if (!jQuery.isEmptyObject(result)) {
    $(".error-div").show();
  }

  if (!jQuery.isEmptyObject(data) && data.result == "Not-Success") {
    $("#imagevalidate")
      .attr("src", "/startroom/images/Not-Verified.png")
      .attr("alt", "error");
    validateImport =
      '<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>' +
      '<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
  }
  if (
    !jQuery.isEmptyObject(data) &&
    (data.result == "success" || data.result == "Success")
  ) {
    $(".error-div").hide();
    $("#imagevalidate")
      .attr("src", "/startroom/images/Success.png")
      .attr("alt", "success");
    validateImport =
      '<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>' +
      '<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';
  }

  $.each(result, function (i, List) {
    scorecard_import_error =
      "<tr>" +
      '<td style="width: 150px; text-align: center;">' +
      List.Excel_SheetName +
      "</td>" +
      '<td style="width: 150px; text-align: center;">' +
      List.rowNo +
      "</td>" +
      '<td style="width: 150px; text-align: center;">' +
      List.cellName +
      "</td>" +
      '<td style="width: 150px; text-align: left;">' +
      List.error +
      "</td>" +
      "</tr>";
    $(".uploadvalidationSuccess").append(scorecard_import_error);
  });

  /*
   * if(result != undefined){
   * $("#imagevalidate").attr("src","../images/Not-Verified.png");
   * $(".error-div").show();
   *
   * validateImport ='<button type="button" class="btn-default1 btn"
   * id="prev-btn1" style="font-weight: 600;">Previous</button>'+ '<button
   * class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2"
   * style="font-weight: 600;" disabled>Next</button>'; }
   */

  if (jQuery.isEmptyObject(data)) {
    $(".error-div").hide();
    $("#imagevalidate")
      .attr("src", "/startroom/images/Not-Verified.png")
      .attr("alt", "error");

    validateImport =
      '<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>' +
      '<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
  }

  $("#validateImportHide").append(validateImport);
}

function scorecardUploadSuccess(data) {
  $(".uploadStatististics").empty();
  $(".error-div").show();
  $("#successimagevalidate")
    .attr("src", "/startroom/images/Success.png")
    .attr("alt", "success");
  // $("#statisticmessage").append('Import Successful');
  scorecardStatististics(
    "No of Records processed",
    data.no_of_process != undefined ? data.no_of_process : ""
  );
  scorecardStatististics(
    "No of Scorecards records",
    data.no_of_processed != undefined ? data.no_of_processed : ""
  );
  scorecardStatististics(
    "No of KPI created",
    data.no_of_created != undefined ? data.no_of_created : ""
  );
  scorecardStatististics(
    "No of KPI updated",
    data.no_of_updated != undefined ? data.no_of_updated : ""
  );
  scorecardStatististics(
    "No of KPI Failed",
    data.no_of_failed != undefined ? data.no_of_failed : ""
  );
}

function scorecardStatististics(staticsvalue, fnresult) {
  var scorecard_Statististics =
    "<tr>" +
    '<td style="width: 300px; text-align: left;">' +
    staticsvalue +
    "</td>" +
    '<td style="width: 300px; text-align: center;">' +
    fnresult +
    "</td>" +
    "</tr>";
  $(".uploadStatististics").append(scorecard_Statististics);
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

$(document).on("change", "#importscorescrd", function (e) {
  e.preventDefault();
  var formdata = new FormData();
  if ($(this).prop("files").length > 0) {
    file = $(this).prop("files")[0];
    formdata.append("scoreCardData", file);
  }
  $(".page-loader-wrapper").css("display", "block");
  $.ajax({
    url: "/stratroom/saveScoreCardDetails",
    type: "POST",
    data: formdata,
    processData: false,
    contentType: false,
    success: function (data, status) {
      console.log(data);
      $(this).val("");
      $(".upLoadScoreCardSuccessModal").modal("show");
      $("#scorecardSuccess").text(data.result);
      $(".page-loader-wrapper").css("display", "none");
      location.reload(true);
      // $.notify(data);
    },
    error: function (msg, status) {
      $(this).val("");
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

function formvalidationerrorreset() {
  $("*[id*=-error]").each(function () {
    $(this).remove();
  });
  $(".input-calender-icon").css("bottom", "30%");
}

function getreporteelist() {
  if (jQuery.isEmptyObject(reporteelist)) {
    $.ajax({
      url: "/stratroom/reporteeList",
      success: function (employeeList) {
        reporteelist = employeeList;
      },
    });
  }
}

function getformularegister() {
  $.ajax({
    url: "/stratroom/strategyFormulationList?status=Approved",
    success: function (data) {
      formulationSuccessCallback(data);
    },
  });
}

function formulationSuccessCallback(data) {
  var formuladata = "";
  $("#formulation_popup #initiate_sidebar").empty();
  $.each(data, function (index, initiative) {
    var topparentswotDetails = {};
    $.each(reporteelist, function (ownkey, empvalue) {
      if (empvalue.id == initiative.approvedBy) {
        topparentswotDetails = {
          id: empvalue.id,
          name: empvalue.name,
          image: empvalue.image,
          dept: empvalue.dept,
        };
      }
    });
    var id = initiative.id;
    var riskimage = topparentswotDetails.image;
    var dept =
      initiative.formulationDept != undefined ? initiative.formulationDept : "";
    var name =
      initiative.formulationName != undefined ? initiative.formulationName : "";
    var title =
      initiative.formulationName != undefined ? initiative.formulationName : "";
    var username = hasWhiteSpaceName(name);
    if (riskimage == "" || riskimage == " " || riskimage == undefined) {
      var Owner =
        "data-name='" + username + "' class='rounded-circle formulauser'";
    } else {
      var Owner = " class='rounded-circle' src='" + riskimage + "' ";
    }

    var applycreate = ``;
    if (formulacreatepermission) {
      applycreate = `onclick="applyformularegister(` + id + `)"`;
    }

    formuladata +=
      `<div class="d-flex flex-column sub_initiative_sidebar_details" ` +
      applycreate +
      `>
                    <div class="d-flex flex-row p-b-5">
                      <div class="flex-column profile_image">
                        <img ` +
      Owner +
      ` alt="User" width="25"/>
                      </div>
                      <div class="d-flex flex-column profile_content line-shortner">
                        <p>` +
      title +
      `</p>
                      </div>
                    </div>
                    <div class="d-flex flex-row justify-content-between m-t--10">
                      <div class="flex-column ini_side_depart_bar">
                        <div class="employee_info" data-i18n="Department">Department</div>
                        <p>` +
      dept +
      `</p>
                      </div>
                    </div>
                  </div>`;
  });
  $("#formulation_popup #initiate_sidebar").html(formuladata);
  $(".formulauser").initial({
    charCount: 2,
    height: 30,
    width: 30,
    fontSize: 18,
  });
}

function applyformularegister(id) {
  if (id == "") {
    return false;
  }
  $(".page-loader-wrapper").show();
  $.ajax({
    url: "/stratroom/formulation/applyFormulation?formulationId=" + id,
    success: function (data) {
      if (data.pageId != undefined && data.pageId != "") {
        window.location = $("#userPrincipal").val() + "?pageId=" + data.pageId;
      } else {
        $.notify("Success:Page is created", {
          style: "success",
          className: "graynotify",
        });
      }
    },
    error: function () {
      $.notify("Error:Page is not created successfully", {
        style: "error",
        className: "graynotify",
      });
      $(".page-loader-wrapper").hide();
    },
  });
}

$(document).on("click", ".kpiclearrecord", function () {
  localStorage.removeItem("kpiId");
  localStorage.removeItem("objId");
  localStorage.removeItem("scoreCardId");
  localStorage.removeItem("scordCardPageId");
});

// ///////////////////////////////////////

const scorecard = [
  {
    pageTitle: "Scorecard",
    overallScore: "100%",
    userName: "Sajin",
    period: "3/01/2025 - 3/22/2025",
    tab: [
      {
        title: "Financial",
        totalScore: "100%",
        tabledata: [
          {
            flag: [
              {
                status: "green",
              },
            ],
            id: "F1",
            url: "",
            name: "% Completion of scorecard",
            period: "",
            trend: [],
            score: "80%",
            baseline: "75%",
            actual: "",
            target: "",
            risk: [
              {
                status: "yellow",
              },
            ],
            actions: "",
            children: [
              {
                flag: [
                  {
                    status: "green",
                  },
                ],
                id: "F1.1",
                url: "kpi.html",
                name: "ROCE",
                period: "Month",
                trend: [
                  {
                    status: "down",
                  },
                ],
                score: "90%",
                baseline: "70%",
                actual: "12.9%",
                target: "13.4%",
                risk: [
                  {
                    status: "red",
                  },
                ],
                actions: "",
                children: [
                  {
                    flag: [
                      {
                        status: "green",
                      },
                    ],
                    id: "F1.1.1",
                    url: "kpi.html",
                    name: "ROCE",
                    period: "Month",
                    trend: [
                      {
                        status: "up",
                      },
                    ],
                    score: "90%",
                    baseline: "70%",
                    actual: "12.9%",
                    target: "13.4%",
                    risk: [
                      {
                        status: "green",
                      },
                    ],
                    actions: "",
                  },
                  {
                    flag: [
                      {
                        status: "green",
                      },
                    ],
                    id: "F1.1.2",
                    url: "",
                    name: "ROCE",
                    period: "Month",
                    trend: [
                      {
                        status: "up",
                      },
                    ],
                    score: "90%",
                    baseline: "70%",
                    actual: "12.9%",
                    target: "13.4%",
                    risk: [
                      {
                        status: "green",
                      },
                    ],
                    actions: "",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Customer",
        totalScore: "100%",
        tabledata: [
          {
            flag: [
              {
                status: "green",
              },
            ],
            id: "C1",
            url: "kpi.html",
            name: "% Completion of scorecard",
            period: "",
            trend: [],
            score: "80%",
            baseline: "75%",
            actual: "",
            target: "",
            risk: [
              {
                status: "red",
              },
            ],
            actions: "",
            children: [
              {
                flag: [
                  {
                    status: "green",
                  },
                ],
                id: "C1.1",
                url: "kpi.html",
                name: "Customer Satisfaction",
                period: "Month",
                trend: [
                  {
                    status: "up",
                  },
                ],
                score: "90%",
                baseline: "70%",
                actual: "85%",
                target: "90%",
                risk: [
                  {
                    status: "yellow",
                  },
                ],
                actions: "",
                children: [
                  {
                    flag: [
                      {
                        status: "green",
                      },
                    ],
                    id: "C1.1.1",
                    url: "kpi.html",
                    name: "Survey Response",
                    period: "Month",
                    trend: [
                      {
                        status: "down",
                      },
                    ],
                    score: "95%",
                    baseline: "80%",
                    actual: "88%",
                    target: "92%",
                    risk: [
                      {
                        status: "green",
                      },
                    ],
                    actions: "",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

$(document).ready(function () {
  let scorecardData = scorecard[0];
  renderTabs(scorecardData.tab);
  renderTabContent(scorecardData.tab);

  // $.ajax({
  //     url: "scorecard.json",
  //     method: "GET",
  //     dataType: "json",
  //     success: function (data) {
  //         let scorecard = data[0]; // Extract main scorecard object
  //         renderTabs(scorecard.tab);
  //         renderTabContent(scorecard.tab);
  //     },
  //     error: function (xhr, status, error) {
  //         console.error("Error loading data:", error);
  //     }
  // });

  const riskImageUrls = {
    green:
      "https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-green-i.svg",
    yellow:
      "https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-yellow-i.svg",
    red: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-red-i.svg",
  };
  const flagImageUrls = {
    green:
      "https://stratroom.io/projects/mg-portal-html/assets/images/icons/flag-green-i.svg",
    yellow:
      "https://stratroom.io/projects/mg-portal-html/assets/images/icons/flag-yellow-i.svg",
    red: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/flag-red-i.svg",
  };
  const trendImageUrls = {
    up: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/up-i.png",
    down: "https://stratroom.io/projects/mg-portal-html/assets/images/icons/down-i.png",
  };

  function renderTabs(tabs) {
      let tabNav = $("#tab-navigation");
      tabNav.empty();

      tabs.forEach((tab, index) => {
          let isActive = index == 0 ? "active" : "";
          let tablePrefix = tab.title.toLowerCase().replace(/\s+/g, "-");
          let tabId = `v-pills-${tablePrefix}`;
          tabNav.append(`<button class="nav-link ${isActive}" id="${tabId}-tab" data-bs-toggle="pill"
              data-bs-target="#${tabId}" type="button" role="tab" aria-controls="${tabId}"
              aria-selected="${index == 0 ? "true" : "false"}">
              <span class="nav-text" contenteditable="true"
                  onkeypress="return (this.innerText.length <= 36)">${tab.title}</span>
          </button>`);
      });
  }



  // Event listener to update dropdown button text
  $(document).on("click", "#tab-navigation .nav-link", function () {
    var selectedText = $(this).find(".nav-text").text().trim();
    $("#dropdownMenuButton").text(selectedText);
  });

  function renderTabContent(tabs) {
    console.log(tabs, "tabs");
    let tabContent = $("#tab-content");
    tabContent.empty();

    tabs.forEach((tab, index) => {
      console.log("tab", tab);
      let isActive = index == 0 ? "show active" : "";
      let tablePrefix = tab.title.toLowerCase().replace(/\s+/g, "-");
      // let tabId = `tab${tab.title}-${index}`;
      let tabId = `v-pills-${tablePrefix}`;

      tabContent.append(`<div id="${tabId}" class="tab-pane fade ${isActive}">
                  <div class="card custom-card table-card">
                    <div class="card-header">
                                <div class="c-header-left">
                                    <span class="badge text-bg-success">${
                                      tab.totalScore
                                    }</span>
                                    <h5 class="card-title me-auto">

                                        <strong editable="true" contenteditable="true"
                                            onkeypress="return (this.innerText.length <= 36)">${
                                              tab.title
                                            }</strong>
                                    </h5>

                                </div>
                                <div class="card-actions">
                                    <div class="dropdown">
                                        <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                            aria-expanded="true">
                                            <span class="icon">
                                                <img width="16" height="16"
                                                    src="/stratroom/images/menu-dot-vertical-i.svg">
                                            </span>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                                            <li>
                                                <a class="dropdown-item" href="#objective-add-modal"
                                                    data-bs-toggle="modal" onclick="return false;">Add</a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="#objective-edit-modal"
                                                    data-bs-toggle="modal" onclick="return false;">Edit</a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="#objective-view-modal"
                                                    data-bs-toggle="modal" onclick="return false;">View</a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                  <div class="card-body">
                <table class="table table-bordered w-100" id="table-${tablePrefix}">
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Period</th>
                            <th>Score</th>
                            <th>Trend</th>
                            <th>Baseline</th>
                            <th>Actual</th>
                            <th>Target</th>
                            <th>Risk</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>${renderTable(tab.tabledata, tablePrefix)}</tbody>
                </table>
                </div>
                </div>
            </div>`);
    });
    setTimeout(() => {
      tabs.forEach((tab) => {
        let tablePrefix = tab.title.toLowerCase().replace(/\s+/g, "-");
        initializeDataTable(`#table-${tablePrefix}`);
      });
    }, 300);
  }

  function initializeDataTable(selector) {
    setTimeout(() => {
      if ($.fn.DataTable && !$.fn.DataTable.isDataTable(selector)) {
        $(selector).DataTable({
          paging: false,
          searching: false,
          ordering: false,
          info: false,
          responsive: true,
          scrollX: true,
        });
      } else {
        // Recalculate DataTable when it becomes visible
        $(selector).DataTable().columns.adjust().draw();
      }
    }, 500);
  }
  $(document).on("shown.bs.tab", 'button[data-bs-toggle="pill"]', function (e) {
    let targetTableId = $(e.target).data("bs-target"); // Example: #v-pills-performance
    let tableSelector = `${targetTableId} table`; // Select the table inside the active tab

    if ($.fn.DataTable && !$.fn.DataTable.isDataTable(tableSelector)) {
      initializeDataTable(tableSelector);
    } else {
      $(tableSelector).DataTable().columns.adjust().draw();
    }
  });

  function renderTable(data, parentId = "", level = 0) {
    let html = "";
    data.forEach((item, index) => {
      let rowId = parentId ? `${parentId}-child-${index + 1}` : `row-${index}`;
      let toggleTarget = item.children ? `${rowId}-child` : "";

      // Show toggle icon only if item has children
      let toggleIcon =
        item.children && level > 0
          ? `<i class="fas fa-plus toggle-icon" data-target="${toggleTarget}"></i>`
          : "";

      // console.log(`Level ${level} → ${rowId}`);

      let actionsMenu = getActionsMenu(level);

      // **Apply class for parent-child hierarchy & hide deeper levels**
      let rowClass = parentId ? `child-of-${parentId}` : "";
      let rowStyle = level >= 2 ? `display: none;` : ""; // **Hide Level 2 & deeper rows initially**

      // **Background color based on hierarchy level**
      let bgClass =
        level == 0 ? "level-0" : level == 1 ? "level-1" : "level-2";

      // **Extract image paths from the JSON object**
      // let flagStatus = item.flag?.[0]?.status || "gray"; // Default to gray if missing
      // let riskStatus = item.risk?.[0]?.status || "gray";
      // let flagImg = `<img src="icons/${flagStatus}.png" width="16" height="16">`;
      // let riskImg = `<img src="icons/${riskStatus}.png" width="16" height="16">`;

      // Fetch flag, risk, and trend images based on status
      let flagStatus = item.flag?.[0]?.status || "red";
      let riskStatus = item.risk?.[0]?.status || "red";
      let trendStatus = item.trend?.[0]?.status || "";

      console.log("flagStatus", flagStatus, riskStatus, trendStatus);

      let flagImg = flagImageUrls[flagStatus]
        ? `<img src="${flagImageUrls[flagStatus]}" width="16" height="16">`
        : "";

      let riskImg = riskImageUrls[riskStatus]
        ? `<img src="${riskImageUrls[riskStatus]}" width="16" height="16">`
        : "";

      let trendImg = trendImageUrls[trendStatus]
        ? `<img src="${trendImageUrls[trendStatus]}" width="12" height="12">`
        : "";

      let nameLink =
        level == 0
          ? `${item.name}`
          : level == 1
          ? `<a class="text-decoration-none" href="${item.url}">${item.name}</a>`
          : `<a class="text-decoration-none" href="${item.url}">${item.name}</a>`;

      // **Trend Mapping (Up / Down)**
      // let trendStatus = item.trend?.[0]?.status || "";
      // let trendIcon = trendStatus
      //     ? `<i class="fas fa-arrow-${trendStatus == "up" ? "up" : "down"} text-${trendStatus}"></i>`
      //     : "";

      html += `<tr class="${rowClass} ${bgClass}" data-id="${rowId}" style="${rowStyle}">
                <td width="30"><div class="d-flex justify-content-end gap-2">${toggleIcon} ${flagImg}</div></td>
                <td width="80">${item.id}</td>
                <td><div style="min-width:260px">${nameLink}</div></td>
                <td width="50" class="text-center">${item.period}</td>
                <td width="50" class="text-center">${item.score}</td>
                <td width="50" class="text-center">${trendImg}</td>
                <td width="50" class="text-center">${item.baseline}</td>
                <td width="50" class="text-center">${item.actual}</td>
                <td width="50" class="text-center">${item.target}</td>
                <td width="50" class="text-center">${riskImg}</td>
                <td width="70">${actionsMenu}</td>
            </tr>`;

      if (item.children) {
        html += renderTable(item.children, rowId, level + 1);
      }
    });
    return html;
  }

  $(document).on("click", ".toggle-icon", function () {
    let target = $(this).data("target");
    $(`tr[data-id^="${target}"]`).toggle();
    $(this).toggleClass("fa-plus fa-minus");
  });

  function getActionsMenu(level) {
    if (level == 0) {
      return `<div class="table-actions justify-content-end">
                <a href="#kpi-view-modal" data-bs-toggle="modal" type="button"
                   class="btn btn-sm btn-icon">
                    <span class="icon"><img src="/stratroom/images/info-i.svg" width="12" height="12"></span>
                </a>
                <div class="dropdown">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                        <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                    </button>
                    <ul class="dropdown-menu border-0 shadow">
                        <li><a class="dropdown-item" href="#kpi-add-modal" data-bs-toggle="modal">Add</a></li>
                        <li><a class="dropdown-item" href="#kpi-edit-modal" data-bs-toggle="modal">Edit</a></li>
                        <li><a class="dropdown-item" href="#kpi-view-modal" data-bs-toggle="modal">View</a></li>
                        <li><a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal">Delete</a></li>
                    </ul>
                </div>
            </div>`;
    } else if (level == 1) {
      return `<div class="table-actions justify-content-end">
            <!-- <a href="#kpi-story-card-modal" data-bs-toggle="modal" type="button"
                   class="btn btn-sm btn-icon">
                    <span class="icon"><img src="/stratroom/images/link-i.svg" width="12" height="12"></span>
                </a> -->
                <a href="#subkpi-view-modal" data-bs-toggle="modal" type="button"
                   class="btn btn-sm btn-icon">
                    <span class="icon"><img src="/stratroom/images/info-i.svg" width="12" height="12"></span>
                </a>
                <div class="dropdown">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                        <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                    </button>
                    <ul class="dropdown-menu border-0 shadow">
                        <li><a class="dropdown-item" href="#subkpi-add-modal" data-bs-toggle="modal">Add</a></li>
                        <li><a class="dropdown-item" href="#subkpi-edit-modal" data-bs-toggle="modal">Edit</a></li>
                        <li><a class="dropdown-item" href="#subkpi-view-modal" data-bs-toggle="modal">View</a></li>
                        <li><a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal">Delete</a></li>
                    </ul>
                </div>
            </div>`;
    } else {
      return `<div class="table-actions justify-content-end">
           <!-- <a href="#kpi-story-card-modal" data-bs-toggle="modal" type="button"
                   class="btn btn-sm btn-icon">
                    <span class="icon"><img src="/stratroom/images/link-i.svg" width="12" height="12"></span>
                </a> -->
                <a href="#subsubkpi-view-modal" data-bs-toggle="modal" type="button"
                   class="btn btn-sm btn-icon">
                    <span class="icon"><img src="/stratroom/images/info-i.svg" width="12" height="12"></span>
                </a>
                <div class="dropdown">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                        <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                    </button>
                    <ul class="dropdown-menu border-0 shadow">
                        <li><a class="dropdown-item" href="#subsubkpi-edit-modal" data-bs-toggle="modal">Edit</a></li>
                        <li><a class="dropdown-item" href="#subsubkpi-view-modal" data-bs-toggle="modal">View</a></li>
                        <li><a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal">Delete</a></li>
                    </ul>
                </div>
            </div>`;
    }
  }
});


    $(document).on('click', '#v-pills-tab .nav-link', function () {
        var selectedText = $(this).find('.nav-text').text().trim();
        $('#dropdownMenuButton').text(selectedText);
    });

    var scoreCardNameValue = ''
    var scoreCardNameId = ''

    function handlePerspectiveNameChange(event, scorecardId) {
        var newName = event.target.innerText.trim();
        console.log("New Perspective Name:",newName,  scorecardId);
       
        scoreCardNameId = scorecardId

        $("#scorcardUpdateName").val(scoreCardNameValue)


      $.ajax({
        url: "/stratroom/changePerspectiveName?"+ "scorecardId=" + scorecardId + "&name=" + newName,
        method: "PUT",
        contentType: "application/json",
        success: function (response) {
            console.log("API Success:", response);
            $.notify("scorecard name updated successfully!", {
                style: 'success',
                className: 'graynotify'
            });
           
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        },
        error: function (xhr, status, error) {
            console.error("API Error:", error);
            $.notify("Failed to update : " + (xhr.responseJSON?.message || error), {
                style: 'error',
                className: 'graynotify'
            });
            $('#dragmap-modal').modal('hide');
            // window.location.reload();
        },
        
    });
    }

    // function updateScoreCarddName(){
    //     const updatedName = $("#scoreCardNameValue").val();
    //      $.ajax({
    //     url: "/stratroom/changePerspectiveName?"+ "scorecardId=" + scoreCardNameId + "&name=" + scoreCardNameValue,
    //     method: "PUT",
    //     contentType: "application/json",
    //     success: function (response) {
    //         console.log("API Success:", response);
    //         $.notify("scorecard name updated successfully!", {
    //             style: 'success',
    //             className: 'graynotify'
    //         });
           
    //         setTimeout(() => {
    //             window.location.reload();
    //         }, 1000);
    //     },
    //     error: function (xhr, status, error) {
    //         console.error("API Error:", error);
    //         $.notify("Failed to update : " + (xhr.responseJSON?.message || error), {
    //             style: 'error',
    //             className: 'graynotify'
    //         });
    //         $('#dragmap-modal').modal('hide');
    //         // window.location.reload();
    //     },
        
    // });
    // }




    
const page_scorecard_en = {

    "page": {
        "scorecard": {
            "title": "Scorecard",
            "addPerspective": "Add Perspective",
            "addObjective": "Add Objective",
            "addKPI": "Add KPI",
            "addSubKPI": "Add Sub Kpi",
            "editSubKPI": "Edit Sub Kpi Description",
            "viewSubKPI": "View Sub Kpi Description",
            "editPerspective": "Edit Perspective",
            "viewPerspective": "View Perspective",
            "editObjective": "Edit Objective Description",
            "viewObjective": "View Objective Description",
            "fileUpload": "File Upload",
            "settings": "Settings",
            "scorecardItems": {
                "save": "Save",
                "cancel": "Cancel",
                 "id": "ID",
                "name": "Name",
                "description": "Description",
                "owner": "Owner",
                "department": "Department",
                "startEndDate": "Start/End Date",
                "performance": "Performance",
                "calculator": "Calculator",
                "kpiCalculator": "KPI Calculator",
                "weight": "Weight (%)",
                "subWeight": "Sub Weight (%)",               
                "status": "Status",
                "kpiType": "KPI Type",
                "threshold": "Threshold",
                "contribution": "Contribution(%)",
                "polarity": "Polarity",
                "dataSource": "Data Source",
                "measurementFrequency": "Measurement Frequency"
            },
            "addPerspectiveStatusOptions": {
                    "choose": "Select Status",
                    "manual": "Manual",
                    "weighted": "Weighted"
                },
            "scorecardList": "Scorecard List",
            "scorecardListItems": {
                "status": "Status",
                "id": "ID",
                "name": "Name",
                "period": "Period",
                "score": "Score",
                "trend": "Trend",
                "baseline": "Baseline",
                "actual": "Actual",
                "target": "Target",
                "risk": "Risk",
                "actions": "Actions"
            },
            "kpiStoryCard": "KPI Story Card",
            "kpiStoryCardItems": {
                "kpiName": "KPI Name",
                "alignmentObjectives": "Alignment Objectives",
                "owner": "Owner",
                "targetAudience": "Target Audience",
                "currentActual": "Current Actual",
                "target": "Target",
                "measurementMethod": "Measurement Method",
                "strategicInitiatives": "Strategic Initiatives",
                "timelines": "Timelines",
                "reportingFrequency": "Reporting Frequency",
                "successCriteria": "Success Criteria",
                "risks": "Risks",
                "supportNeeded": "Support Needed",
                "remarks": "Remarks"

            },
            "audit": {
                "createdBy": "Created By",
                "createdOn": "Created On",
                "lastModifiedBy": "Last Modified By",
                "lastModifiedOn": "Last Modified On"
            }

        }
    }
}

const page_scorecard_am = {

  "page": {
    "scorecard": {
      "title": "የአፈፃፀም ካርድ",
      "addPerspective": "አዲስ እይታ ጨምር",
      "addObjective": "አዲስ ዓላማ ጨምር",
      "addKPI": "አዲስ KPI ጨምር",
      "addSubKPI": "ንዑስ KPI ጨምር",
      "editSubKPI": "የንዑስ KPI መግለጫን አርትዕ",
      "viewSubKPI": "የንዑስ KPI መግለጫን ተመልከት",
      "editPerspective": "እይታ አርትዕ",
      "viewPerspective": "እይታ ተመልከት",
      "editObjective": "የዓላማ መግለጫን አርትዕ",
      "viewObjective": "የዓላማ መግለጫን ተመልከት",
      "fileUpload": "ፋይል መጫኛ",
      "settings": "ቅንብሮች",

      "scorecardItems": {
        "save": "አስቀምጥ",
        "cancel": "ይቅር",
        "id": "መለያ",
        "name": "ስም",
        "description": "መግለጫ",
        "owner": "ባለቤት",
        "department": "ክፍል",
        "startEndDate": "መጀመሪያ/መጨረሻ ቀን",
        "performance": "አፈፃፀም",
        "calculator": "ካልኩሌተር",
        "kpiCalculator": "KPI ካልኩሌተር",
        "weight": "ክብደት (%)",
        "subWeight": "ንዑስ ክብደት (%)",
        "status": "ሁኔታ",
        "kpiType": "የKPI አይነት",
        "threshold": "መጠን",
        "contribution": "አስተዋፅዖ (%)",
        "polarity": "አቀማመጥ",
        "dataSource": "የመረጃ ምንጭ",
        "measurementFrequency": "የመለኪያ ድግግሞሽ"
      },

      "addPerspectiveStatusOptions": {
        "choose": "ሁኔታ ምረጥ",
        "manual": "በእጅ",
        "weighted": "ተመን የተሰጠ"
      },

      "scorecardList": "የአፈፃፀም ካርድ ዝርዝር",

      "scorecardListItems": {
        "status": "ሁኔታ",
        "id": "መለያ",
        "name": "ስም",
        "period": "ጊዜ መወዳደሪያ",
        "score": "ነጥብ",
        "trend": "ዝንባሌ",
        "baseline": "መሠረት",
        "actual": "እውነተኛ ዋጋ",
        "target": "ዓላማ",
        "risk": "አደጋ",
        "actions": "እርምጃዎች"
      },

      "kpiStoryCard": "የKPI ታሪክ ካርድ",

      "kpiStoryCardItems": {
        "kpiName": "የKPI ስም",
        "alignmentObjectives": "የተዛመዱ ዓላማዎች",
        "owner": "ባለቤት",
        "targetAudience": "የታሰበ ተመልካች ቡድን",
        "currentActual": "የአሁኑ እውነተኛ ዋጋ",
        "target": "ዓላማ",
        "measurementMethod": "የመለኪያ ዘዴ",
        "strategicInitiatives": "ስትራቴጂ ተነሳሽነቶች",
        "timelines": "የጊዜ መስመሮች",
        "reportingFrequency": "የሪፖርት ድግግሞሽ",
        "successCriteria": "የስኬት መደበኛዎች",
        "risks": "አደጋዎች",
        "supportNeeded": "የሚያስፈልገው ድጋፍ",
        "remarks": "አስተያየቶች"
      },

      "audit": {
        "createdBy": "የፈጠረው",
        "createdOn": "የተፈጠረበት ቀን",
        "lastModifiedBy": "የመጨረሻ ያሻሻለው",
        "lastModifiedOn": "የመጨረሻ የተሻሻለበት ቀን"
      }
    }
  }
}



const page_scorecard_ar = {
  "page": {
    "scorecard": {
      "title": "بطاقة الأداء",
      "addPerspective": "إضافة منظور",
      "addObjective": "إضافة هدف",
      "addKPI": "إضافة مؤشر قياس الأداء",
      "addSubKPI": "إضافة مؤشر فرعي",
      "editSubKPI": "تعديل وصف المؤشر الفرعي",
      "viewSubKPI": "عرض وصف المؤشر الفرعي",
      "editPerspective": "تعديل المنظور",
      "viewPerspective": "عرض المنظور",
      "editObjective": "تعديل وصف الهدف",
      "viewObjective": "عرض وصف الهدف",
      "fileUpload": "رفع ملف",
      "settings": "الإعدادات",
      "scorecardItems": {
        "save": "حفظ",
        "cancel": "إلغاء",
        "id": "المعرف",
        "name": "الاسم",
        "description": "الوصف",
        "owner": "المالك",
        "department": "القسم",
        "startEndDate": "تاريخ البدء/الانتهاء",
        "performance": "الأداء",
        "calculator": "الحاسبة",
        "kpiCalculator": "حاسبة مؤشر الأداء",
        "weight": "الوزن (%)",
        "subWeight": "الوزن الفرعي (%)",
        "status": "الحالة",
        "kpiType": "نوع KPI",
        "threshold": "الحد",
        "contribution": "المساهمة (%)",
        "polarity": "القطبية",
        "dataSource": "مصدر البيانات",
        "measurementFrequency": "تكرار القياس"
      },
      "addPerspectiveStatusOptions": {
        "choose": "اختر الحالة",
        "manual": "يدوي",
        "weighted": "مرجح"
      },
      "scorecardList": "قائمة بطاقة الأداء",
      "scorecardListItems": {
        "status": "الحالة",
        "id": "المعرف",
        "name": "الاسم",
        "period": "الفترة",
        "score": "النتيجة",
        "trend": "الاتجاه",
        "baseline": "الخط الأساسي",
        "actual": "القيمة الفعلية",
        "target": "الهدف",
        "risk": "المخاطر",
        "actions": "الإجراءات"
      },
      "kpiStoryCard": "بطاقة قصة مؤشر الأداء",
      "kpiStoryCardItems": {
        "kpiName": "اسم مؤشر الأداء",
        "alignmentObjectives": "أهداف التوافق",
        "owner": "المالك",
        "targetAudience": "الجمهور المستهدف",
        "currentActual": "القيمة الحالية",
        "target": "الهدف",
        "measurementMethod": "طريقة القياس",
        "strategicInitiatives": "المبادرات الاستراتيجية",
        "timelines": "الجداول الزمنية",
        "reportingFrequency": "تكرار التقارير",
        "successCriteria": "معايير النجاح",
        "risks": "المخاطر",
        "supportNeeded": "الدعم المطلوب",
        "remarks": "ملاحظات"
      },
      "audit": {
                "createdBy": "أنشئ بواسطة",
                "createdOn": "تاريخ الإنشاء",
                "lastModifiedBy": "آخر تعديل بواسطة",
                "lastModifiedOn": "تاريخ آخر تعديل"
            }
    }
  }
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : null, obj);
}

// Load language for all elements with data-translate
function loadLanguage(lang) {
  let translation;

  if (lang == 'ar') {
    translation = page_scorecard_ar;
  } else if(lang == "am"){
    translation = page_scorecard_am;
  }else {
    translation = page_scorecard_en;
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



// Pdf generation



 


// Function to load JSON scorecardJsonListData and generate PDF
function loadDataAndGeneratePDF() {
    // $.getJSON("scorecard.json", function(response) {
    //     console.log("Data Loaded Successfully", response);
    //     scorecardJsonListData = response; // Assign scorecardJsonListData
    //     console.log(scorecardJsonListData);
    //     generatePDF();   // Call function after loading scorecardJsonListData
    // }).fail(function(jqxhr, textStatus, error) {
    //     console.error("Error loading JSON: ", textStatus, error);
    //     alert("Failed to load scorecardJsonListData!");
    // });

    scorecardJsonListData = scorecardJsonListResponseData;
    console.log(scorecardJsonListData, "scorecardJsonListData");
    generatePDF();
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
        img.src = url;
    });
}



// Preload images (required for jsPDF addImage)
// async function preloadImages() {
//     const urls = [...Object.values(flagImageUrls), ...Object.values(trendImageUrls)];
//     const promises = urls.map(url =>
//         new Promise((resolve, reject) => {
//             const img = new Image();
//             img.crossOrigin = "anonymous";
//             img.onload = () => resolve({ url, img });
//             img.onerror = reject;
//             img.src = url;
//         })
//     );
//     const loaded = await Promise.all(promises);
//     window.preloadedImages = {};
//     loaded.forEach(({ url, img }) => {
//         const canvas = document.createElement("canvas");
//         canvas.width = img.width;
//         canvas.height = img.height;
//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(img, 0, 0);
//         window.preloadedImages[url] = canvas.toDataURL("image/png");
//     });
// }


async function preloadImages() {
  const urls = [
    ...Object.values(flagImageUrls),
    ...Object.values(trendImageUrls)
  ].filter(Boolean); // 🔥 remove undefined/null

  window.preloadedImages = {};

  const promises = urls.map(url =>
    new Promise(resolve => {
      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          window.preloadedImages[url] = canvas.toDataURL("image/png");
        } catch (e) {
          console.warn("Canvas blocked for:", url);
        }
        resolve(); // ✅ always resolve
      };

      img.onerror = () => {
        console.warn("Image failed to load:", url);
        resolve(); // ✅ DO NOT reject
      };

      img.src = url;
    })
  );

  await Promise.all(promises);
}



async function generatePDF() {
    await preloadImages();
    let pdf = new jsPDF();
    let pageWidth = pdf.internal.pageSize.width;
    let pageHeight = pdf.internal.pageSize.height;
    const submissionDate = new Date().toLocaleDateString();
    const logoUrl = document.getElementById("appLogo")?.src || "/stratroom/images/logo.png";
    const coverImage = "/stratroom/images/scorecard-bg.jpg";
    const marginLeft = 10;
    const marginRight = pageWidth - marginLeft;

    // Helper to sanitize filename
    function sanitizeFilename(str) {
        return str
            .replace(/[\/\\:*?"<>|]/g, '_') // Replace invalid filename chars
            .replace(/\s+/g, '_')           // Replace spaces with underscores
            .replace(/_{2,}/g, '_')         // Collapse multiple underscores
            .trim();
    }

    const cardDetails = scorecardJsonListData?.cardDetailsDTO;
    const titleText = cardDetails?.scoreCardDetailsValue?.scoreCardName || "Performance_Report";
    const sanitizedTitle = sanitizeFilename(titleText);
    const fileName = `${sanitizedTitle}.pdf`;

    // == Cover Page ==
    function addCoverPage(cardDetails) {
        
      function hexToRGB(hex) {
        hex = hex.replace("#", "");

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        return [r, g, b];
      }


    

        const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
        // const bgColor = [120, 45, 90];

        const hexColor = localStorage.getItem("stratroomPrimaryColor") || "#000000";
        const bgColor = hexToRGB(hexColor);
        const periodText = datePeriodData || "";
        const titleText = cardDetails?.scoreCardDetailsValue?.scoreCardName || "Performance Report";

        const [r, g, b] = hexToRGB(hexColor);

        pdf.addImage(coverImage, 'JPEG', 0, 0, pageWidth, pageHeight);
        pdf.addImage(logoUrl, "PNG", marginRight - imgWidth, imgY, imgWidth, imgHeight);

        // pdf.setTextColor(171, 80, 103);
        pdf.setTextColor(r, g, b);
        pdf.setFontSize(18);
        pdf.setFont("helvetica", "bold");
        pdf.text(titleText.toUpperCase(), pageWidth / 2, 57, { align: "center" });
        pdf.text("Report".toUpperCase(), pageWidth / 2, 70, { align: "center" });

        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text(periodText, pageWidth / 2, 85, { align: "center" });

        pdf.setFillColor(...bgColor);
        pdf.lines(
            [[15, 0], [0, pageHeight / 3], [-15, 15], [0, -(pageHeight / 3 - 15)]],
            0, 0, [1, 1], 'F'
        );

        pdf.setFillColor(...bgColor);
        pdf.rect(0, pageHeight - 10, pageWidth, 10, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.text(periodText, 10, pageHeight - 6);
    }

    // == Header ==
    function drawHeader(sectionData, startY = 10) {
        const imgX = 10, imgY = startY, imgWidth = 50, imgHeight = 10;
        const textStartY = imgY + 5;
        const name = sectionData?.scoreCardDetailsValue?.ownerName || "";
        const period = datePeriodData || "";

        pdf.addImage(logoUrl, "PNG", imgX, imgY, imgWidth, imgHeight);
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(13);
        pdf.setFont("helvetica", "bold");
        pdf.text("Performance Report", marginRight, textStartY - 3, { align: "right" });

        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        pdf.text(`Generated Date: ${submissionDate}`, marginRight, textStartY + 1, { align: "right" });
        pdf.text(`Name: ${name}`, marginRight, textStartY + 6, { align: "right" });
        pdf.text(`Period: ${period}`, marginRight, textStartY + 10, { align: "right" });

        const lineY = imgY + imgHeight + 7;
        pdf.line(10, lineY, pageWidth - 10, lineY);
        return lineY + 8;
    }

     function hexToRGB(hex) {
        hex = hex.replace("#", "");

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        return [r, g, b];
      }

    // == Footer ==
    function drawFooter(pageNumber, totalPages) {
        // const bgColor = [120, 45, 90];
        const hexColor = localStorage.getItem("stratroomPrimaryColor") || "#000000";
const bgColor = hexToRGB(hexColor);
        const footerY = pageHeight - 10;
        pdf.setFillColor(...bgColor);
        pdf.rect(0, footerY, pageWidth, 10, 'F');

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("Corporate Performance Report", 10, footerY + 6);
        pdf.setFontSize(10);
        pdf.text(`Page ${pageNumber} of ${totalPages}`, marginRight, footerY + 6, { align: "right" });
    }

    // == Start PDF Generation ==
    addCoverPage(cardDetails);

    const perspectives = cardDetails?.scoreCardDTOS || [];
    if (perspectives.length == 0) {
        pdf.save(fileName);
        return;
    }

    pdf.addPage();
    let currentPage = 2;
    let y = drawHeader(cardDetails);

    function getFlagColor(statusLight) {
        if (!statusLight) return "red";
        if (statusLight.includes("red")) return "red";
        if (statusLight.includes("yellow") || statusLight.includes("amber")) return "yellow";
        if (statusLight.includes("green")) return "green";
        return "red";
    }

    function getTrendDirection(trendValue) {
        if (!trendValue) return null;
        const low = trendValue.toLowerCase();
        if (low.includes("up")) return "up";
        if (low.includes("down")) return "down";
        return null;
    }

    perspectives.forEach((perspective) => {
        const perspectiveTitle = perspective.scoreCardValue?.name || perspective.perspectiveType || "Perspective";

        if (y + 25 > pageHeight - 40) {
            drawFooter(currentPage - 1, pdf.internal.getNumberOfPages() - 1);
            pdf.addPage();
            currentPage = pdf.internal.getNumberOfPages();
            y = drawHeader(cardDetails, 10);
        }

        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text(perspectiveTitle, 10, y);
        y += 12;

        const rows = [];
        const rowMetadata = [];

        (perspective.objectiveList || []).forEach(obj => {
            const objStatusLight = obj.objectivesValue?.statusLight || perspective.scoreCardValue?.statusLight || "red";
            const flagColor = getFlagColor(objStatusLight);

            rows.push(["", obj.objectiveId || "", obj.objectivesName || obj.objectivesValue?.name || "", "", "", "", "", "", ""]);
            rowMetadata.push({ flagColor, trendDir: null });

            (obj.kpiList || []).forEach(kpi => {
                const kpiStatusLight = kpi.kpiValue?.statusLight || objStatusLight;
                const kpiFlagColor = getFlagColor(kpiStatusLight);
                const kpiTrend = getTrendDirection(kpi.kpiValue?.trend);

                rows.push([
                    "",
                    kpi.kpiId || "",
                    kpi.kpiName || "",
                    kpi.kpiValue?.kpi_measurement || "",
                    kpi.kpiValue?.thresholdResult || "",
                    "",
                    kpi.kpiValue?.actual?.toString() || "",
                    kpi.kpiValue?.target?.toString() || "",
                    ""
                ]);
                rowMetadata.push({ flagColor: kpiFlagColor, trendDir: kpiTrend });

                (kpi.subKpiList || []).forEach(sub => {
                    rows.push([
                        "",
                        sub.subKpiId || "",
                        sub.subKpiName || "",
                        sub.subKpiValue?.kpi_measurement || "",
                        sub.subKpiValue?.thresholdResult || "",
                        "",
                        sub.subKpiValue?.actual?.toString() || "",
                        sub.subKpiValue?.target?.toString() || "",
                        ""
                    ]);
                    rowMetadata.push({ flagColor: kpiFlagColor, trendDir: kpiTrend });
                });
            });
        });

        if (rows.length == 0) return;
        function hexToRGB(hex) {
    hex = hex.replace("#", "");
    return [
        parseInt(hex.substring(0, 2), 16),
        parseInt(hex.substring(2, 4), 16),
        parseInt(hex.substring(4, 6), 16)
    ];
}

  const hexColor = localStorage.getItem("stratroomPrimaryColor") || "#934578";

        const headColor = hexToRGB(hexColor);

        const tableConfig = {
            startY: y,
            head: [["Flag", "ID", "Name", "Period", "Score", "Trend", "Actual", "Target", "Risk"]],
            body: rows,
            theme: 'grid',
            styles: {
                fontSize: 8,
                cellPadding: 2,
                lineColor: [201, 201, 201],
                overflow: 'linebreak',
                cellWidth: 'wrap'
            },
            columnStyles: {
                2: { cellWidth: 'auto', minCellHeight: 10 }
            },
            headStyles: {
                // fillColor: [147, 69, 120],
                 fillColor: headColor,
                textColor: [255, 255, 255],
                fontSize: 9
            },
            margin: { left: 10, right: 10 },
            didDrawCell: function (data) {
                if (data.section !== 'body') return;

                // const meta = rowMetadata[data.row.index];
                // const imgSize = 4;
                // const centerX = data.cell.x + data.cell.width / 2;
                // const centerY = data.cell.y + data.cell.height / 2;

                // if (data.column.index == 0 && meta.flagColor) {
                //     const url = flagImageUrls[meta.flagColor];
                //     const imgData = window.preloadedImages[url];
                //     if (imgData) {
                //         pdf.addImage(imgData, "PNG", centerX - imgSize / 2, centerY - imgSize / 2, imgSize, imgSize);
                //     }
                // }

                // if (data.column.index == 5 && meta.trendDir) {
                //     const url = trendImageUrls[meta.trendDir];
                //     const imgData = window.preloadedImages[url];
                //     if (imgData) {
                //         pdf.addImage(imgData, "PNG", centerX - imgSize / 2, centerY - imgSize / 2, imgSize, imgSize);
                //     }
                // }

                const meta = rowMetadata?.[data.row.index];
const imgSize = 4;
const centerX = data.cell.x + data.cell.width / 2;
const centerY = data.cell.y + data.cell.height / 2;

// 🟢 Column 0 → Flag icon
if (
  meta &&
  data.column.index == 0 &&
  meta.flagColor &&
  flagImageUrls[meta.flagColor]
) {
  const url = flagImageUrls[meta.flagColor];
  const imgData = window.preloadedImages?.[url];

  if (imgData) {
    pdf.addImage(
      imgData,
      "PNG",
      centerX - imgSize / 2,
      centerY - imgSize / 2,
      imgSize,
      imgSize
    );
  }
}

// 🟢 Column 5 → Trend icon
if (
  meta &&
  data.column.index == 5 &&
  meta.trendDir &&
  trendImageUrls[meta.trendDir]
) {
  const url = trendImageUrls[meta.trendDir];
  const imgData = window.preloadedImages?.[url];

  if (imgData) {
    pdf.addImage(
      imgData,
      "PNG",
      centerX - imgSize / 2,
      centerY - imgSize / 2,
      imgSize,
      imgSize
    );
  }
}

            }
        };

        pdf.autoTable(tableConfig);
        y = pdf.lastAutoTable.finalY + 10;
    });

    // Add footer to all content pages (starting from page 2)
    const totalPages = pdf.internal.getNumberOfPages() - 1;
    for (let i = 2; i <= pdf.internal.getNumberOfPages(); i++) {
        pdf.setPage(i);
        drawFooter(i - 1, totalPages);
    }

    // Save with dynamic name
    pdf.save(fileName);
}


//scorecard checked uncheck validations
function getScorecardFieldsPayload() {
  const payload = {};

  document.querySelectorAll('input[name="scorecard_fields"]').forEach(cb => {
    payload[cb.value] = cb.checked ? "true" : "false";
  });

  return payload;
}



function handleStoryCardEvent(kpiId, kpiName, actual, target, measurement, objectiveName) {
    console.log(kpiId, kpiName,  actual, target, measurement, objectiveName, "handleStoryCardEvent");
    $("#initiatives").empty();
    
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

    $("#ownerName").text(getScoreCardData?.scoreCardDetailsValue?.ownerName ? getScoreCardData?.scoreCardDetailsValue?.ownerName : "")
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

            $("#initiativeTimeline").text(data[0]?.initiativeValue?.daterange ? data[0]?.initiativeValue?.daterange : "N/A")
            // $("#initiatives").text(data[0]?.initiativeValue?.name ? data[0]?.initiativeValue?.name : "N/A")
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

            //  $("#riskData").text(data[0]?.riskValue?.name ? data[0]?.riskValue?.name : "N/A")
            // console.log(data, "ridkdata")
        },
        error: readErrorMsg,
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
                ? "data-name='" + username + "' class='rounded-circle swotmultiuserimage' style='margin-top: 20px;'"
                : "src='" + users.profileImage + "' class='rounded-circle'";
                

              var imgTag = "<img " + userProfileConcate + " />";

              const userImageContainer = $('.user-image');
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

// handlestorycardsave
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

var initiativeListData = []
var kpiDetailsData = []
var kpidataTable = []
var kpiObjectiveName = ""
var kpiScorecardName = ""
var kpiactualData = ""
var kpiTargetData = ""
var kpifrequencyData = ""
var trendValue = ""
var kpiTypeValue = ""
var kpiperformance = ""
var kpiNameValue = ""
var kpiOwnerName = ""
var kpiweight = ""
var kpisubweight = ""
var kpipolarity = ""
var kpiContribution = ""
var initiativeJsonListData = [];

function loadDataAndGeneratePDFCard(kpiId, kpiName, actual, target, measurement, objectiveName, scorecardName, trend, kpitype, performance, ownerNamre, weight, subweight, polarity, contribution) {
kpiDetailsData = [];
kpidataTable = [];
initiativeListData = [];

kpiContribution = contribution
kpiweight = weight
kpisubweight = subweight
kpipolarity = polarity
console.log(trend, kpitype, "selectedKpi");
    console.log(kpiId, kpiName,  actual, target, measurement, objectiveName, "handleStoryCardEvent");
    kpiScorecardName = scorecardName
    kpiNameValue = kpiName
    trendValue = trend
    kpiTypeValue = kpitype
    kpiObjectiveName = objectiveName
    kpiperformance = performance
    kpiactualData = actual
    kpiTargetData = target
    kpifrequencyData = measurement
    kpiOwnerName = ownerNamre

// generatePDFCard();   


    // Store AJAX calls
    var request1 = $.ajax({
        url: "/stratroom/kpi/" + kpiId,
        type: "GET",
        contentType: "application/json"
    });

    var request2 = $.ajax({
        url: "/stratroom/kpi/initiativesList/" + kpiId,
        type: "GET",
        contentType: "application/json"
    });

    var request3 = $.ajax({
        url: "/stratroom/kpiDetailList/" + kpiId + "?period=" + $("#datePeriod").val() + "&flagType=kpi",
        type: "GET",
        contentType: "application/json"
    });

    // Wait for all APIs to finish
    $.when(request1, request2, request3).done(function (res1, res2, res3) {

        // Extract actual data (because jQuery wraps response)
        kpiDetailsData = res1[0];
        initiativeListData = res2[0];
        kpidataTable = res3[0];

        console.log("All API Data Loaded");

        initiativeJsonListData = [];

        // ✅ NOW call function
        generatePDFCard();

    }).fail(function () {
        console.error("One of the API calls failed");
    });
    
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
let COVER_URL = "/stratroom/images/initiative-bg.jpg";

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


async function generatePDFCard() {

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
        const [r, g, b] = hexToRGB(hexColor);
        const imgY = 5
         const textStartY = imgY + 5;
        let periodText = section?.initiativeValue?.daterange || "N/A";
        let titleText = "KPI REPORT"
        let name = kpiDetailsData?.kpiValue?.name ? `${kpiDetailsData?.kpiValue?.name}` : "";
        let sbtitleText = kpiDetailsData?.kpiValue?.name ? `${kpiDetailsData?.kpiValue?.name}` : "";

        pdf.addImage(coverImage, 'JPEG', 0, 0, pageWidth, pageHeight);
        pdf.addImage(logoUrl, "PNG", marginRight - 50, 5, 50, 10);

        pdf.setTextColor(r, g, b);
        pdf.setFontSize(30);
        pdf.setFont("helvetica", "bold");
        pdf.text(titleText.toUpperCase(), pageWidth / 2, 60, { align: "center" });

        pdf.setFontSize(16);
        // pdf.text("REPORT", pageWidth / 2, 75, { align: "center" });
        let splitSubtitle = pdf.splitTextToSize(kpiNameValue.toUpperCase(), pageWidth - 40);
        pdf.text(splitSubtitle, pageWidth / 2, 70, { align: "center" });

        // Adjust top space for period text based on subtitle length
        let periodY = 70 + (splitSubtitle.length * 8) + 15;

        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        // pdf.text(periodText, pageWidth / 2, periodY, { align: "center" });

        pdf.text(`Period: ${datePeriodData}`, pageWidth / 2, 90, { align: "center" });
        // pdf.text(`Name: ${name}`, marginRight, textStartY + 6, { align: "right" });
         pdf.setFillColor(...bgColor);
            pdf.rect(0, pageHeight - cfhs, pageWidth, cfhs, 'F');
            // Draw angled shape
            pdf.setFillColor(...bgColor);
            pdf.lines([[pageWidth/2, 0],[20, cfh],  [-90, 0] ], -20, pageHeight - cfh, [1, 1], 'F');


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
        

        pdf.addPage();
    }

    function header(section) {
        console.log(section, "sectionData");
        const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
         const textStartY = imgY + 5;
         let title = (section?.pageTitle ? section.pageTitle + " Report" : "KPI Report");
         let name = section?.initiativeValue?.ownerName ? `${section?.initiativeValue?.ownerName}` : "";
         let period = section?.initiativeValue?.daterange ? `${section?.initiativeValue?.daterange}` : "";
          const hexColor = localStorage.getItem("stratroomPrimaryColor") || "#000000";
         
         const [r, g, b] = hexToRGB(hexColor);
       
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
        pdf.text(`Period: ${datePeriodData}`, marginRight, textStartY + 10, { align: "right" });           
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
    pdf.text("KPI REPORT", 10, pageHeight - 10);
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
       1. KPI CHAIN LINK DETAILS
    ------------------------------------------------------------*/

    const kpitrendValue = trendValue?.toLowerCase() || "";

    const kpitrendValueData =
      kpitrendValue.includes("up") ? "up" :
      kpitrendValue.includes("down") ? "down" :
      "N/A";


    let detailsBody = [
        ["Kpi Name", kpiNameValue ? kpiNameValue : ""],
        ["Aligned Perpective", kpiScorecardName || ""],
        ["Alignment of Ojective", kpiObjectiveName || ""],
        ["Owner", kpiOwnerName || ""],
        ["Current Actual", kpiactualData || ""],
        ["Target", kpiTargetData || ""],
        ["Trend", kpitrendValueData ? kpitrendValueData : ""],
        ["Reporting Frequency", kpifrequencyData || ""],
        ["Measurement Method", kpifrequencyData || ""],
        ["KPI Type", kpiTypeValue ? kpiTypeValue : ""],
        ["Polarity", kpipolarity ? kpipolarity : ""],
        ["Performance", kpiperformance ? kpiperformance : ""],
        ["Contribution", kpiContribution ? kpiContribution : ""],
        ["Weight %", kpiweight ? kpiweight : ""],
        ["Sub weight", kpisubweight ? kpisubweight : ""],
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
       2. Data Table
    ------------------------------------------------------------*/

const estimatedRowHeight = 10; // approx per row
const successRowsCount = 4; // number of rows
const estimatedTableHeight = successRowsCount * estimatedRowHeight + 20;

// Check space BEFORE rendering
if (currentY + estimatedTableHeight > pageHeight - 25) {
    pdf.addPage();
    currentY = header(initiative);
}

pdf.setFontSize(12);
pdf.setFont("helvetica", "bold");
pdf.text("Data Table", 10, currentY);
currentY += 6;

// Safe data access (FIXED)
let detailsBodyDataTable = [];

if (kpidataTable?.length > 0) {
    const dataObj = kpidataTable[0];

    Object.keys(dataObj).forEach(period => {
        const row = dataObj[period];

        detailsBodyDataTable.push([
            period,
            row?.actual || "",
            row?.target || "",
            row?.gap || "",
            row?.ytd || ""
        ]);
    });
}

pdf.autoTable({
    startY: currentY,
    head: [["Period", "Actual", "Target", "Gap", "YTD"]],
    body: detailsBodyDataTable,
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: {
        fillColor: headColor,
        textColor: 255,
        fontStyle: "bold"
    },
    columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 35 },
        2: { cellWidth: 35 },
        3: { cellWidth: 35 },
        4: { cellWidth: 40 }
    },
    margin: { left: 10, right: 10 },
    didDrawPage: function (data) {
        if (data.pageNumber > 1) {
            header(initiative);
        }
    }
});

// ✅ CRITICAL FIX
currentY = pdf.lastAutoTable.finalY + 10;



/* -----------------------------------------------------------
       2.Influencing Strategic Initiatives
   ------------------------------------------------------------*/

// Check space BEFORE rendering
  if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header("item"); }
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("Influencing Strategic Initiatives", 10, currentY);
        currentY += 5;

        let initiativeRows = [];
        let numInitiatives = 0;

        if (initiativeListData && Array.isArray(initiativeListData)) {
            numInitiatives = initiativeListData.length;
            initiativeListData.forEach((initiative, idx) => {
                let row = [];
                // Only first row spans down
                if (idx == 0) {
                    row.push({
                        content: "Strategic Initiatives",
                        rowSpan: numInitiatives + 1, // +1 for the header row equivalent
                        styles: { valign: 'middle', halign: 'center', fillColor: [147, 69, 120], textColor: [255, 255, 255], fontStyle: 'bold' }
                    });
                }
                row.push(initiative.initiativeValue.name || initiative.initiativeValue.description || initiative.initiativeValue.names || "");
                row.push(initiative.initiativeValue.progressval !== undefined ? String(initiative.initiativeValue.progressval) : "");
                initiativeRows.push(row);
            });
        }

        // We'll manually push a header row above our initiative rows if there are any
        let finalInitiativeBody = [];
        if (numInitiatives > 0) {
            finalInitiativeBody.push([
                {
                    content: "Strategic Initiatives",
                    rowSpan: numInitiatives + 1,
                    styles: { valign: 'middle', halign: 'center', fillColor: headColor, textColor: [255, 255, 255], fontStyle: 'bold' }
                },
                { content: "Initiatives name", styles: { fillColor: headColor, textColor: [255, 255, 255], fontStyle: 'bold' } },
                { content: "progress", styles: { halign: 'center', fillColor: headColor, textColor: [255, 255, 255], fontStyle: 'bold' } }
            ]);

            // Now append the actual data rows without the first column
            initiativeListData.forEach((initiative) => {
                finalInitiativeBody.push([
                    { content: initiative.initiativeValue.name || initiative.initiativeValue.description || initiative.initiativeValue.names || "", styles: { fillColor: [255, 255, 255], textColor: [51, 51, 51], fontStyle: 'normal' } },
                    { content: initiative.initiativeValue.progressval !== undefined ? String(initiative.initiativeValue.progressval) : "", styles: { halign: 'center', fillColor: [255, 255, 255], textColor: [51, 51, 51], fontStyle: 'normal' } }
                ]);
            });
        }

        pdf.autoTable({
            startY: currentY,
            head: [],
            body: finalInitiativeBody,
            theme: 'grid',
            styles: { fontSize: 9, cellPadding: 3, lineHeight: 1.8, overflow: 'linebreak', lineColor: [200, 200, 200] },
            columnStyles: {
                0: { cellWidth: 50 },
                1: { cellWidth: 'auto' },
                2: { cellWidth: 25 }
            },
            margin: { left: 10, right: 10, bottom: 25 }
        });

        currentY = pdf.lastAutoTable.finalY + 10;


      /// Success Story //


// Check space BEFORE rendering
if (currentY + estimatedTableHeight > pageHeight - 25) {
    pdf.addPage();
    currentY = header("initiative");
}

pdf.setFontSize(12);
pdf.setFont("helvetica", "bold");
pdf.text("Success Criteria", 10, currentY);
currentY += 6;

// Safe data access (FIXED)
let detailsBodySuccess = [
    ["Description", "N/A"],
    ["Risks", "N/A"],
    [
        "Support Needed",
        kpiDetailsData?.kpiValue?.supportNeeded || ""
    ],
    ["Remarks", kpiDetailsData?.kpiValue?.remarks || ""],
];

pdf.autoTable({
    startY: currentY,
    body: detailsBodySuccess,
    theme: "grid",
    styles: { fontSize: 10 },
    columnStyles: {
        0: { fontStyle: "bold", fillColor: headColor, textColor: 255, cellWidth: 60 },
        1: { cellWidth: pageWidth - 80 }
    },
    margin: { left: 10, right: 10 },

    didDrawPage: function (data) {
        if (data.pageNumber > 1) {
            header(initiative);
        }
    }
});

currentY = pdf.lastAutoTable.finalY + 10;

    
    /* -----------------------------------------------------------
       PAGE NUMBERS
    ------------------------------------------------------------*/

    const totalPages = pdf.internal.getNumberOfPages();
    const reportPageCount = totalPages - (reportStartPage - 1);

    for (let i = reportStartPage; i <= totalPages; i++) {
        pdf.setPage(i);
        footer(i - (reportStartPage - 1), reportPageCount);
    }

    pdf.save("KPI Report.pdf");
}
