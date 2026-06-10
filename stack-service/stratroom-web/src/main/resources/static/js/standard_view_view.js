var _scoreCard = {};
var empId 	= 	($("#userPrincipalnavigate").val() != null && $("#userPrincipalnavigate").val() != ''?$("#userPrincipalnavigate").val():$("#userPrincipal").val());
var reporteelist = {};
var scorecardlist = {};
var nodelist = {};
var kpithreshold="";
var color1="";
var color2="";
var color3="";
var color4="";
var color5="";
var scorepreference	=	[];

var scoreempPreference 	= 	{"preferences":{}};
var nodeKeyMap = new Object(); 
var parentKpidetails 	= 	{"id":"","createdBy":"","createDateString":"","updatedDateString":"","kpiFormula":"","updatedBy":"","createdTime":"","kpiValue":"","owner":"","objectiveId":"","kpiId":""};
var scorecreatepermission	=	false;
var scoreeditpermission		=	false;
var scoredeletepermission	=	false;
var scoreviewpermission		=	true;
var scorecardloadview		=	true;
var measureFieldenable		=	false;
var selectedDepartment = 0;
var selectedpage =0;

var perspectivecreatepermission	=	false;
var perspectiveeditpermission	=	false;
var perspectiveviewpermission	=	true;

var objectivecreatepermission	=	false;
var objectiveeditpermission	=	false;
var objectiveviewpermission	=	true;
var objectivedeletepermission	=	false;


var kpicreatepermission	=	false;
var	kpieditpermission	=	false;
var	kpiviewpermission	=	true;
var	kpideletepermission	=	false;


var	subkpicreatepermission	=	false;

var	KpiViewcreatepermission	=	false;
var	KpiViewviewpermission	=	true;
var	KpiVieweditpermission	=	false;
var	KpiViewdeletepermission	=	false;
	
var	formulacreatepermission	=	false;
var formulaviewpermission	=	true;

const departmentSelect = document.getElementById('department_select');
const pageSelect = document.getElementById('page_select');


var checkemppagemode	=	$("#employeesupermode").length;

let scoreurlparams = (new URL(document.location)).searchParams;
let scoresuperpageNo 		= 	scoreurlparams.get("pageId");

if(checkemppagemode == 0 && ($("#userrolename").val()	==	"Super User" || $("#userrolename").val()	==	"Admin")){
	if($("#userPrincipal").val()	!= $("#userPrincipalnavigate").val()){
		//$(".subusermenuname").text('Scorecard');
		if($(".topmenubreadcrumb").length){
			$(".topmenubreadcrumb").show();
		}
		if($(".sidebarNavigate").length){
			$(".sidebarNavigate").show();
		}
	}
	getscorepagenameView()
}

function getscorepagenameView(){
	$.ajax({
		type : "GET",
		url : "/stratroom/pages/"+scoresuperpageNo,
		async:false,
		success : function(data) {
			if($("#userPrincipal").val()	!= $("#userPrincipalnavigate").val()){
				$("."+data.id).addClass("homepageHighlight");
			}
			
			if($(".superusertopmenu").hasClass(data.id)){
				$(".subusermenuname").text(data.pageName);
			}
		}
	});
}

function addOption(id, text, value) {
	$(id).append(`<option value="${value}">${text}</option>`);
}

function addList(id, text, value,highlight,type) {
	if(nodeKeyMap[value] == null){
		nodeKeyMap[value] = text;	
	}
	$(id)
			.append(
					`<li class="list-group-item `+highlight+`" onclick="updateFormula(${value},'',this,'`+type+`')">${text}</li>`);
}

function addToYTDList(id, text, value,highlight,type) {
	if(nodeKeyMap[value] == null){
		nodeKeyMap[value] = text;	
	}
	$(id)
			.append(
					`<li class="list-group-item `+highlight+`" onclick="updateYTDFormula(${value},'',this,'`+type+`')">${text}</li>`);
}


function updateYTDFormula(input,formuladesc,currentElement,typeofmeasure) {
	if(formuladesc !=	"" && formuladesc !=	null){
		if($(".ytdformuladynamicdesc").css("display")	==	"none"){
			$(".ytdformuladynamicdesc").show();
		}
		$(".formulacontentdesc").html(getformulaperformance(formuladesc));
		$(".formulaheaderdesc").html(input.toUpperCase());
	}
	var box = $("#customYtdformula");
	var mesaureName = nodeKeyMap[input];
	var formulaval	=	box.val();
	var checkdefaultvalue	=	false;
	
	if(mesaureName	==	undefined){
		mesaureName = input;
	}
	mesaureName	=	(mesaureName	==	undefined?"":mesaureName);
	if(typeofmeasure	==	"sub"){
		mesaureName	=	'('+mesaureName+')';
	}
	var finalval	=	formulaval + mesaureName;
	if($(currentElement).hasClass("kpiformuladescHighlight")){
		if(formulaval !=	"" && formulaval.lastIndexOf(mesaureName) !=	-1){
			var splitmeasure	=	formulaval.lastIndexOf(mesaureName);
			var removestr		=	mesaureName.length;
			var remaingingstr	=	splitmeasure+removestr;
			$(currentElement).removeClass("kpiformuladescHighlight");
			box.val(formulaval.slice(0, splitmeasure)  + formulaval.slice(remaingingstr));
			document.getElementById("customYtdformula").setSelectionRange(splitmeasure,splitmeasure);
		}
	}else{
		var curPos 	= 	document.getElementById("customYtdformula").selectionStart;
		var lastpos	=	parseInt(formulaval.slice(0, curPos).length+mesaureName.length);
	    box.val(formulaval.slice(0, curPos) + mesaureName + formulaval.slice(curPos));
	    document.getElementById("customYtdformula").setSelectionRange(lastpos,lastpos);
	    $(currentElement).addClass("kpiformuladescHighlight");
	}
	// box.val(finalval);
}


function updateThresholdFormula(input) {
	var box = $("#thresholdformula");
	var formulaval	=	box.val();
	var finalval	=	formulaval + input;
	var curPos 	= 	document.getElementById("thresholdformula").selectionStart;
	var lastpos	=	parseInt(formulaval.slice(0, curPos).length+input.length);
    box.val(formulaval.slice(0, curPos) + input + formulaval.slice(curPos));
    document.getElementById("thresholdformula").setSelectionRange(lastpos,lastpos);
	// box.val(finalval);
}

function updateFormula(input,formuladesc,currentElement,typeofmeasure) {
	
	var box = $("#formula");
	if(formuladesc !=	"" && formuladesc !=	null){
		if($(".targetformuladynamicdesc").css("display")	==	"none"){
			$(".targetformuladynamicdesc").show();
		}
		$(".formulacontentdesc").html(getformulabuilder(formuladesc));
		$(".formulaheaderdesc").html(input.toUpperCase());
	}
	var mesaureName = nodeKeyMap[input];
	var formulaval	=	box.val();
	var checkdefaultvalue	=	false;
	
	if(mesaureName	==	undefined){
		mesaureName = 	input;
	}
	
	/*
	 * if(typeof(formulaval) === "string" && (formulaval.endsWith("]") ==
	 * true)){ formulaval = formulaval.replace("]",input)+"]"; }
	 * 
	 * if(typeof(mesaureName) == "string" && mesaureName != undefined &&
	 * mesaureName != "" && (mesaureName.endsWith("]") == false)){ var checkend =
	 * mesaureName.endsWith("]"); if(checkend == false){ mesaureName =
	 * mesaureName+"]"; } }
	 */
	mesaureName	=	(mesaureName	==	undefined?"":mesaureName);
	if(typeofmeasure	==	"sub"){
		mesaureName	=mesaureName;
	}
	var finalval	=	formulaval + mesaureName;
	/*
	 * if(typeof(finalval) === "string" && finalval != undefined && finalval !=
	 * ""){ var checkstart = finalval.startsWith("["); if(checkstart == false){
	 * finalval = "["+finalval; } var checkend = finalval.endsWith("]");
	 * if(checkend == false){ finalval = finalval+"]"; } }
	 */
	 
	if($(currentElement).hasClass("kpiformuladescHighlight")){
		if(formulaval !=	"" && formulaval.lastIndexOf(mesaureName) !=	-1){
			var splitmeasure	=	formulaval.lastIndexOf(mesaureName);
			var removestr		=	mesaureName.length;
			var remaingingstr	=	splitmeasure+removestr;
			$(currentElement).removeClass("kpiformuladescHighlight");
			box.val(formulaval.slice(0, splitmeasure)  + formulaval.slice(remaingingstr));
			document.getElementById("formula").setSelectionRange(splitmeasure,splitmeasure);
		}
	}else{
		var curPos 	= 	document.getElementById("formula").selectionStart;
		var lastpos	=	parseInt(formulaval.slice(0, curPos).length+mesaureName.length);
		box.val(formulaval.slice(0, curPos) + mesaureName + formulaval.slice(curPos));
		document.getElementById("formula").setSelectionRange(lastpos,lastpos);
		$(currentElement).addClass("kpiformuladescHighlight");
	} 
	// box.val(finalval);
	// $("#formula").append(val);
}

function updatePerformance(input,formuladesc,currentElement) {
	
	if(formuladesc !=	"" && formuladesc !=	null){
		if($(".kpiperformuladynamicdesc").css("display")	==	"none"){
			$(".kpiperformuladynamicdesc").show();
		}
		$(".formulacontentdesc").html(getformulaperformance(formuladesc));
		$(".formulaheaderdesc").html(input.toUpperCase());
	}
	var box = $("#performanceformula");
	var mesaureName = nodeKeyMap[input];
	var formulaval	=	box.val();
	var checkdefaultvalue	=	false;
	
	if(mesaureName	==	undefined){
		mesaureName = 	input;
	}
	
	mesaureName	=	(mesaureName	==	undefined?"":mesaureName);
	
	var finalval	=	formulaval + mesaureName;
	if($(currentElement).hasClass("kpiformuladescHighlight")){
		if(formulaval !=	"" && formulaval.lastIndexOf(mesaureName) !=	-1){
			var splitmeasure	=	formulaval.lastIndexOf(mesaureName);
			var removestr		=	mesaureName.length;
			var remaingingstr	=	splitmeasure+removestr;
			$(currentElement).removeClass("kpiformuladescHighlight");
			box.val(formulaval.slice(0, splitmeasure)  + formulaval.slice(remaingingstr));
			document.getElementById("performanceformula").setSelectionRange(splitmeasure,splitmeasure);
		}
	}
	else{
		var curPos 	= 	document.getElementById("performanceformula").selectionStart;
		var lastpos	=	parseInt(formulaval.slice(0, curPos).length+mesaureName.length);
		box.val(formulaval.slice(0, curPos) + mesaureName + formulaval.slice(curPos));
		document.getElementById("performanceformula").setSelectionRange(lastpos,lastpos);
		$(currentElement).addClass("kpiformuladescHighlight");
	}
	// box.val(finalval);
}

function updateCustomObjective(input,formuladesc,currentElement) {
	var box = $("#formulaCustomObjective");
	if(formuladesc !=	"" && formuladesc !=	null){
		if($(".objectiveformuladynamicdesc").css("display")	==	"none"){
			$(".objectiveformuladynamicdesc").show();
		}
		$(".formulacontentdesc").html(getformulaperformance(formuladesc));
		$(".formulaheaderdesc").html(input.toUpperCase());
	}
	var mesaureName = input;
	var formulaval	=	box.val();
	var checkdefaultvalue	=	false;
	var finalval	=	formulaval + mesaureName;
	if($(currentElement).hasClass("kpiformuladescHighlight")){
		if(formulaval !=	"" && formulaval.lastIndexOf(mesaureName) !=	-1){
			var splitmeasure	=	formulaval.lastIndexOf(mesaureName);
			var removestr		=	mesaureName.length;
			var remaingingstr	=	splitmeasure+removestr;
			$(currentElement).removeClass("kpiformuladescHighlight");
			box.val(formulaval.slice(0, splitmeasure)  + formulaval.slice(remaingingstr));
			document.getElementById("formulaCustomObjective").setSelectionRange(splitmeasure,splitmeasure);
		}
	}else{
		var curPos 	= 	document.getElementById("formulaCustomObjective").selectionStart;
		var lastpos	=	parseInt(formulaval.slice(0, curPos).length+mesaureName.length);
	    box.val(formulaval.slice(0, curPos) + mesaureName + formulaval.slice(curPos));
	    document.getElementById("formulaCustomObjective").setSelectionRange(lastpos,lastpos);
	    $(currentElement).addClass("kpiformuladescHighlight");
	}
	// box.val(finalval);
}

function updateCustomPerspective(input,formuladesc,currentElement) {
	var box = $("#formulaCustomPerspective");
	if(formuladesc !=	"" && formuladesc !=	null){
		if($(".perspectiveformuladynamicdesc").css("display")	==	"none"){
			$(".perspectiveformuladynamicdesc").show();
		}
		$(".formulacontentdesc").html(getformulaperformance(formuladesc));
		$(".formulaheaderdesc").html(input.toUpperCase());
	}
	var mesaureName = input;
	var formulaval	=	box.val();
	var checkdefaultvalue	=	false;
	var finalval	=	formulaval + mesaureName;
	if($(currentElement).hasClass("kpiformuladescHighlight")){
		if(formulaval !=	"" && formulaval.lastIndexOf(mesaureName) !=	-1){
			var splitmeasure	=	formulaval.lastIndexOf(mesaureName);
			var removestr		=	mesaureName.length;
			var remaingingstr	=	splitmeasure+removestr;
			$(currentElement).removeClass("kpiformuladescHighlight");
			box.val(formulaval.slice(0, splitmeasure)  + formulaval.slice(remaingingstr));
			document.getElementById("formulaCustomPerspective").setSelectionRange(splitmeasure,splitmeasure);
		}
	}else{
		var curPos 	= 	document.getElementById("formulaCustomPerspective").selectionStart;
		var lastpos	=	parseInt(formulaval.slice(0, curPos).length+mesaureName.length);
	    box.val(formulaval.slice(0, curPos) + mesaureName + formulaval.slice(curPos));
	    document.getElementById("formulaCustomPerspective").setSelectionRange(lastpos,lastpos);
	    $(currentElement).addClass("kpiformuladescHighlight");
	}
	// box.val(finalval);
}

function populateOwnerDropdownScorecard(elementId,formtypeElement) {
	var numberOfOptions = $(elementId + ' > option').length;
	console.log("numberOfOptions",numberOfOptions);
	console.log("jQuery.isEmptyObject(reporteelist)",jQuery.isEmptyObject(reporteelist));
	$(elementId).empty();
	if (jQuery.isEmptyObject(reporteelist)) {
		$.ajax({
			url : "/stratroom/completereporteeList",
			success : function(employeeList) {
				reporteelist = employeeList;
				console.log("reporteelist",reporteelist);
				$.each(employeeList, function(index, reportee) {
					addOption(elementId, reportee.name, reportee.id)
				});
				multipleoptionElementTriggerValuesScorecard(formtypeElement);
			}
		});
	}
	else
	{
		$.each(reporteelist, function(index, reportee) {
			console.log('reportee',reportee);
			
			addOption(elementId, reportee.name, reportee.id)
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

function populateobjectiveOwnerDropdownScorecard(elementId,formtypeElement) {
	var numberOfOptions = $(elementId + ' > option').length;

	if (jQuery.isEmptyObject(reporteelist)) {
		$.ajax({
			url : "/stratroom/completereporteeList",
			async:false,
			success : function(employeeList) {
				reporteelist = employeeList;
				$.each(employeeList, function(index, reportee) {
					addOption(elementId, reportee.name, reportee.id)
				});
			}
		});
	} else if (numberOfOptions < 2) {
		$.each(reporteelist, function(index, reportee) {
			addOption(elementId, reportee.name, reportee.id)
		});
	}
	
	multipleoptionObjectiveElementTriggerValuesScorecard(formtypeElement);
}

function departmentlist(elementId,empId){
	$(elementId).empty();	
	var implementationtypemethod	=	false;
	if((controlpanelgeneralsiteSettings.implementation !=	null && controlpanelgeneralsiteSettings.implementation !=	undefined) && (controlpanelgeneralsiteSettings.implementationType !=	null && controlpanelgeneralsiteSettings.implementationType !=	undefined)){
		if(controlpanelgeneralsiteSettings.implementationType	==	"Department"){
    		implementationtypemethod	=	true
    	}
	}
	var url	=	implementationtypemethod?"/stratroom/ownerMappingDepartmentList?empId="+empId:"/stratroom/allDepartmentList";
	$.ajax({
		url : url,
		async:false,
		success : function(data, status) {
			$.each(data, function (index, reportee) {
				addOption(elementId, reportee.name, reportee.id)
			});
		}
	});
}

function populatecustomReporteeOwnerDropdownScorecard(elementId,formtypeElement) {
	var numberOfOptions = $(elementId + ' > option').length;
	$(elementId).empty();
	if (jQuery.isEmptyObject(reporteelist)) {
		$.ajax({
			url : "/stratroom/completereporteeList",
			async:false,
			success : function(employeeList) {
				reporteelist = employeeList;
				$.each(employeeList, function(index, reportee) {
					if(empId	!=	reportee.id){
						addOption(elementId, reportee.name, reportee.id)
					}
				});
			}
		});
	} else if (numberOfOptions < 2) {
		$.each(reporteelist, function(index, reportee) {
			if(empId	!=	reportee.id){
				addOption(elementId, reportee.name, reportee.id)
			}
		});
	}
	
	// multipleoptionObjectiveElementTriggerValuesScorecard(formtypeElement);
}

function populatekpiOwnerDropdownScorecard(elementId,formtypeElement) {
	var numberOfOptions = $(elementId + ' > option').length;
	//$("#kpi_owner").find("option").remove().end();
	if (jQuery.isEmptyObject(reporteelist)) {
		$.ajax({
			url : "/stratroom/completereporteeList",
			async:false,
			success : function(employeeList) {
				reporteelist = employeeList;
				$.each(employeeList, function(index, reportee) {
					addOption(elementId, reportee.name, reportee.id)
				});
			}
		});
	} else if (numberOfOptions < 2) {
		$.each(reporteelist, function(index, reportee) {
			addOption(elementId, reportee.name, reportee.id)
		});
	}
	
	multipleoptionKpiElementTriggerValuesScorecard(formtypeElement);
}


function multipleoptionElementTriggerValuesScorecard(formtypeElement){
	if(formtypeElement !=	undefined && formtypeElement !=	''){
		$(formtypeElement+" select").not(".form-control").formSelect();
	    $(formtypeElement+" select.select_all")
	      .siblings("ul")
	      .prepend("<li id=sm_select_all><span>Select All</span></li>");
	    $("li#sm_select_all").on("click", function() {
	      var jq_elem = $(this),
	        jq_elem_span = jq_elem.find("span"),
	        select_all = jq_elem_span.text() == "Select All",
	        set_text = select_all ? "Select None" : "Select All";
	      jq_elem_span.text(set_text);
	      jq_elem
	        .siblings("li")
	        .filter(function() {
	          return (
	            $(this)
	              .find("input")
	              .prop("checked") != select_all
	          );
	        })
	        .click();
	    });
	}
}

function multipleoptionObjectiveElementTriggerValuesScorecard(formtypeElement){
	if(formtypeElement !=	undefined && formtypeElement !=	''){
		$(formtypeElement+" select").not(".form-control").formSelect();
	    $(formtypeElement+" select.select_all")
	      .siblings("ul")
	      .prepend("<li id=sm_select_all><span>Select All</span></li>");
	    $("li#sm_select_all").on("click", function() {
	      var jq_elem = $(this),
	        jq_elem_span = jq_elem.find("span"),
	        select_all = jq_elem_span.text() == "Select All",
	        set_text = select_all ? "Select None" : "Select All";
	      jq_elem_span.text(set_text);
	      jq_elem
	        .siblings("li")
	        .filter(function() {
	          return (
	            $(this)
	              .find("input")
	              .prop("checked") != select_all
	          );
	        })
	        .click();
	    });
	}
}

function multipleoptionKpiElementTriggerValuesScorecard(formtypeElement){
	if(formtypeElement !=	undefined && formtypeElement !=	''){
		$(formtypeElement+" select").not(".form-control").formSelect();
	    $(formtypeElement+" select.select_all")
	      .siblings("ul")
	      .prepend("<li id=sm_select_all><span>Select All</span></li>");
	    $("li#sm_select_all").on("click", function() {
	      var jq_elem = $(this),
	        jq_elem_span = jq_elem.find("span"),
	        select_all = jq_elem_span.text() == "Select All",
	        set_text = select_all ? "Select None" : "Select All";
	      jq_elem_span.text(set_text);
	      jq_elem
	        .siblings("li")
	        .filter(function() {
	          return (
	            $(this)
	              .find("input")
	              .prop("checked") != select_all
	          );
	        })
	        .click();
	    });
	}
}


function scordcardSuccessCallback(data) {
	        score_value="";
			if(data.thresholdResult != "" || data.thresholdResult != null){
				score_value = data.thresholdResult;
			}
			else
			{
				score_value= "0.0";
			}
			$("#score").html(score_value);
	if (data.message != undefined && data.scoreCardName != undefined) {
		var scorecardhtmlcontent	=	data.scoreCardName+`<span class="scorecard_status scorecardname" style="background-color:#1aa243"></span>`;
		$(".pageTitleStatus").html(scorecardhtmlcontent);
		if($(".superusertopmenu").hasClass(scoresuperpageNo)){
			$(".subusermenuname").text(data.scoreCardName);
		}
	}
	
	if (!data.flag && data.message != undefined && data.message != "") {
		$(".container-fluid .tableview").attr("style","background-color: white;padding: 10px;margin-top: 10px;border-radius: 10px;").html("<center><h3>"+data.message+"</h3></center>")
	}
	scorecardlist = data.cardDetailsDTO;
	
	// var scorecardTemplate = $('#scorecard-template').html();
	// Mustache.parse(scorecardTemplate); // optional, speeds up future uses
	var perspectiveTemplate = $('#perspective-template').html();
	Mustache.parse(perspectiveTemplate); // optional, speeds up future uses

	var perspectiveHeaderRowTemplate = $('#perspective-header-row-template')
			.html();
	Mustache.parse(perspectiveHeaderRowTemplate); // optional, speeds up
	// future uses
	
	var objectiveRowTemplate = $('#objective-row-template').html();
	Mustache.parse(objectiveRowTemplate); // optional, speeds up future uses

	var kpiRowTemplate = $('#kpi-row-template').html();
	Mustache.parse(kpiRowTemplate); // optional, speeds up future uses
	var designlabel	=	"";
	$("#viewiconTxt").empty();
	$('#scordcard-wrapper').empty();
	var nestedredcount=0;
	var nestedyellowcount=0;
	var nestedblackcount=0;
	var nestedgreencount=0;
	var scorecardname = 'ScoreCard';
	
	var scorecardactual	=	false;
	var scorecardtarget	=	false;
	var scorecardbudget	=	false;
	var scorecardforecast	=	false;
	var scorecardscore	=	false;
	var scorecardtrend	=	false;
	var scorecardrisk	=	false;
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardactual !=	undefined && controlpanelScorecardSettings.scorecardactual == true){
		scorecardactual	=	true;
	}
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardtarget !=	undefined && controlpanelScorecardSettings.scorecardtarget == true){
		scorecardtarget	=	true;
	}
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardbudget !=	undefined && controlpanelScorecardSettings.scorecardbudget == true){
		scorecardbudget	=	true;
	}
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardforecast !=	undefined && controlpanelScorecardSettings.scorecardforecast == true){
		scorecardforecast	=	true;
	}
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardscore !=	undefined && controlpanelScorecardSettings.scorecardscore == true){
		scorecardscore	=	true;
	}
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardtrend !=	undefined && controlpanelScorecardSettings.scorecardtrend == true){
		scorecardtrend	=	true;
	}
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardrisk !=	undefined && controlpanelScorecardSettings.scorecardrisk == true){
		scorecardrisk	=	true;
	}
		
	if (data.cardDetailsDTO != undefined) {
		if (data.cardDetailsDTO.scorecardName != undefined && data.cardDetailsDTO.scorecardName != null) {
			scorecardname = data.cardDetailsDTO.scorecardName;
			
			$(".scorecardname").text(scorecardname);
			// $('#scorecardparent').html(scorecarddata);
			var upiconflag	=	false;
			if(jQuery.isEmptyObject(data.cardDetailsDTO.scoreCardDTOS)) {
				if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.customPerformance != undefined && controlpanelScorecardSettings.customPerformance == true){
					//var scorecardstatusiconElement	=	$(".scorecardname");
					var scorecardhtmlcontent	=	scorecardname+`<span class="scorecard_status scorecardname" style="background-color:#1aa243"></span>`;
					$(".pageTitleStatus").html(scorecardhtmlcontent);
					if($(".superusertopmenu").hasClass(scoresuperpageNo)){
						$(".subusermenuname").text(scorecardname);
					}
				}else{	
					upiconflag	=	true;
				}
			}else{
				scorecardname	=	(data.cardDetailsDTO.scoreCardDTOS[0].scorecardName !=	undefined && data.cardDetailsDTO.scoreCardDTOS[0].scorecardName !=	null?data.cardDetailsDTO.scoreCardDTOS[0].scorecardName:scorecardname);
			}
		}
	}else{
		scorecardname	=	(data.scoreCardName !=	undefined && data.scoreCardName !=	null?data.scoreCardName:scorecardname);
	}
		// var scorecarddata = Mustache.render(scorecardTemplate, {
			// ScoreCardName : scorecardname
		// })
		
	if(upiconflag	==	true){
		var scorecardhtmlcontent	=	scorecardname+`<span id="scorecardstatusicon"></span>`;
		$(".pageTitleStatus").html(scorecardhtmlcontent);
		if($(".superusertopmenu").hasClass(scoresuperpageNo)){
			$(".subusermenuname").text(scorecardname);
		}
		var scorecardstatusiconElement	=	$("#scorecardstatusicon");
		scorecardstatusiconElement.addClass("fa fa-arrow-circle-up").css({"font-size":"20px","color":"#1aa243"});
	}
	
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.statusrequired != undefined && controlpanelScorecardSettings.statusrequired == true){
		if((controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardstatus != undefined && controlpanelScorecardSettings.scorecardstatus == false) && 
				controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.performance != undefined && controlpanelScorecardSettings.performance == false){
			$(".scorecardname").css("background-color","unset");
			$("#scorecardstatusicon").removeClass("fa-arrow-circle-up");
		}
	}else{
		$(".scorecardname").css("background-color","unset");
		$("#scorecardstatusicon").removeClass("fa-arrow-circle-up");
	}
	
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == true){
		if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardscoreper != undefined && controlpanelScorecardSettings.scorecardscoreper == false){
			$(".scorecardname").text("");
		}
	}else if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == false){
		$(".scorecardname").text("");
	}else{
		if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardscoreper != undefined && controlpanelScorecardSettings.scorecardscoreper == false){
			$(".scorecardname").text("");
		}
	}
	
	if(data.cardDetailsDTO !=	undefined){
		$.each(data.cardDetailsDTO.scoreCardDTOS, function(index, scorecard) {
	
			var actualdisplay	=	"";
			var targetdisplay	=	"";
			var trenddisplay	=	"";
			var riskdisplay		=	"";
			var scoredisplay	=	"";
			var statusDisplay	=	"";
			var currentheaderRow 	=	{};
			currentheaderRow.header1	=	scorecard.scoreCardValue.header1;
			currentheaderRow.header2 	=	scorecard.scoreCardValue.header2;
			
			if(scorecardactual == true){
				actualdisplay	=	true;
				currentheaderRow.header3='<th data-i18n="Actual">Actual</th>';
			}
			
			if(scorecardtarget == true){
				targetdisplay	=	true;
				currentheaderRow.header4='<th data-i18n="Target">Target</th>';
			}
			
			if(scorecardtrend == true){
				trenddisplay	=	true;
				currentheaderRow.header5='<th data-i18n="Trend">Trend</th>';
			}
			
			if(scorecardrisk == true){
				riskdisplay	=	true;
				currentheaderRow.header6='<th data-i18n="Risk">Risk</th>';
			}
			
			if(scorecardscore == true){
				scoredisplay	=	true;
				currentheaderRow.header7='<th data-i18n="Index">Index</th>';
			}
			

			
			// todo: Read headers from scorecard.scoreCardValue
			var headerRow = Mustache.render(perspectiveHeaderRowTemplate, currentheaderRow);
			// '<thead><tr><th></th><th>ID</th><th></th><th></th><th></th><th>Period</th><th>Actual</th><th data-i18n="Target">Target</th><th>Trend</th><th>Risk</th></tr></thead>'
			var bodyRows = '';
	
			if (scorecard.objectiveList && scorecard.objectiveList.length > 0) {
				$.each(scorecard.objectiveList, function(objIndex, objective) {
					// todo: Read objectives and pass it to Mustache
					
					// objective row permission
						var objectiveOptionsicon	=	"";						
						if(kpicreatepermission	==	false && objectiveeditpermission	==	false && objectiveviewpermission	==	false && objectivedeletepermission	==	false){
							objectiveOptionsicon	=	"";
						}else{
						
							objectiveOptionsicon	=	`<ul class="header-dropdown m-r--5">
			                <li class="dropdown">
			                    <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
			                        <i class="material-icons">more_vert</i>
			                    </a>
	                    		<ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(-104px, 24px, 0px);">
	                        	`;
							 
							if(kpicreatepermission	==	true){
								objectiveOptionsicon	+=	`<li>
	                            <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="handleKpiEvent('0', 'add', `+objective.id+`)">Add</a>
	                        </li>`;
							}
							
							if(objectiveeditpermission	==	true){
								objectiveOptionsicon	+=	`<li>
	                            <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="handleObjectiveEvent(`+objective.id+`, 'edit', `+scorecard.id+`)">Edit</a>
	                        </li>`;
							}
							
							if(objectiveviewpermission	==	true){
								objectiveOptionsicon	+=	`<li>
	                            <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="handleObjectiveEvent(`+objective.id+`, 'view', `+scorecard.id+`)">View</a>
	                        </li>`;
							}	
							
							 
							if(objectivedeletepermission	==	true){
								objectiveOptionsicon	+=	`<li>
	                            	<a href="#" onclick="handleObjectiveEvent(`+objective.id+`, 'delete', `+scorecard.id+`)">Delete</a>
	                        	</li>`;
							}
							
							objectiveOptionsicon	+=	`</ul></li></ul>`;
						}
						
						var objthresholdResult	=	"";	
						if(objective.objectivesValue.thresholdResult !=	undefined && scoredisplay	==	true){
							objthresholdResult	=	objective.objectivesValue.thresholdResult;
						}
						
						var trendrisktd	=	"";
						
						if(trenddisplay == true && riskdisplay == true){
							trendrisktd	=	"<td></td><td></td>";
						}else if(trenddisplay == true && riskdisplay == false){
							trendrisktd	=	"<td></td>";
						}else if(trenddisplay == false && riskdisplay == true){
							trendrisktd	=	"<td></td>";
						}else if(trenddisplay == false && riskdisplay == false){
							trendrisktd	=	"";
						}
						
						var actualtargettd	=	"";
						
						if(actualdisplay == true && targetdisplay == true){
							actualtargettd	=	"<td></td><td></td>";
						}else if(actualdisplay == true && targetdisplay == false){
							actualtargettd	=	"<td></td>";
						}else if(actualdisplay == false && targetdisplay == true){
							actualtargettd	=	"<td></td>";
						}else if(actualdisplay == false && targetdisplay == false){
							actualtargettd	=	"";
						}
						
						if(typeof(objthresholdResult) == "string" && objthresholdResult !=	undefined && !objthresholdResult.includes('%') && objthresholdResult !=	"")
						{
							objthresholdResult = objthresholdResult + "%"
						}
						
						if(scoredisplay == true){
							objthresholdResult	=	"<td><strong>"+objthresholdResult+"</strong></td>";
						}
					var objstatusLight	=	"";
					if(objective.objectivesValue.statusLightFlag !=	undefined && objective.objectivesValue.statusLightFlag !=	""){
						objstatusLight	=	'<i class="'+objective.objectivesValue.statusLight+'" style="font-size:10px !important;color:'+objective.objectivesValue.statusLightFlag+' !important;"></i>';
					}else{
						objstatusLight	=	'<i class="'+objective.objectivesValue.statusLight+'" style="font-size:10px !important;"></i>';
					}	
					
					if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.statusrequired != undefined && controlpanelScorecardSettings.statusrequired == true){
						if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.objectivestatus != undefined && controlpanelScorecardSettings.objectivestatus == false){
							objstatusLight	=	"";
						}
					}else if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.statusrequired != undefined && controlpanelScorecardSettings.statusrequired == false){
						objstatusLight	=	"";
					}else{
						if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.objectivestatus != undefined && controlpanelScorecardSettings.objectivestatus == false){
							objstatusLight	=	"";
						}
					}
					
					if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == true){
						if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.objectivescore != undefined && controlpanelScorecardSettings.objectivescore == false){
							objthresholdResult	=	"<td></td>";
						}
					}else if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == false){
						objthresholdResult	=	"<td></td>";
					}else{
						if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.objectivescore != undefined && controlpanelScorecardSettings.objectivescore == false){
							objthresholdResult	=	"<td></td>";
						}
					}
					
					var objectiveRow = Mustache.render(objectiveRowTemplate, {
						scoreCardId : scorecard.id,
						objectiveId : objective.id,
						objectiveDisplayId : objective.objectiveId,
						objectiveName : objective.objectivesValue.name,
						statusLight : objstatusLight,
						objthresholdResult:objthresholdResult,
						actualtargettd:actualtargettd,
						trendrisktd:trendrisktd,
						objectiveOptionsicon:objectiveOptionsicon
					});
					
					bodyRows = bodyRows + objectiveRow;
					
					
					if (objective.kpiList && objective.kpiList.length > 0) {
						$.each(objective.kpiList, function(kpiIndex, kpi) {
						
							var kpiActual	=	(kpi.kpiValue.actual !=	undefined && kpi.kpiValue.actual !=	null?kpi.kpiValue.actual:"");
							var kpiTarget	=	(kpi.kpiValue.target !=	undefined && kpi.kpiValue.target !=	null?kpi.kpiValue.target:"");
							var pageno = $('#pagenumber').val();
							
							
							var targetcurrency	=	(kpi.kpiValue.targetCurrency != undefined && kpi.kpiValue.targetCurrency != ""?kpi.kpiValue.targetCurrency:"");
							var actutalcurrency	=	(kpi.kpiValue.actualCurrency != undefined && kpi.kpiValue.actualCurrency != ""?kpi.kpiValue.actualCurrency:"");
							targetcurrency	=	(targetcurrency ==""?targetcurrency:kpi.kpiValue.kpiCurrency != undefined && kpi.kpiValue.kpiCurrency != ""?kpi.kpiValue.kpiCurrency:"");
							actutalcurrency	=	(actutalcurrency ==""?actutalcurrency:kpi.kpiValue.kpiCurrency != undefined && kpi.kpiValue.kpiCurrency != ""?kpi.kpiValue.kpiCurrency:"");
							
							kpiActual		=	actutalcurrency+kpiActual // actutalcurrency+numberchartActual['firstletter']+intergerHumanFormat(numberchartActual['number'])+numberchartActual['lastletter'];
							
							if(kpi.kpiValue.dataType !=	undefined && kpi.kpiValue.dataType !=	null)
								{
									if(kpi.kpiValue.dataType == 'Percentage')
										{
											
											if(!kpiTarget.includes('%'))
												{
												kpiTarget = kpiTarget + "%"
												}
											
										}
								}
							kpiTarget		=	targetcurrency+kpiTarget // targetcurrency+numberchartTarget['firstletter']+numberchartTarget['number']+numberchartTarget['lastletter'];
							
							
							// kpi row permission
							var kpiOptionsicon	=	"";						
							if(subkpicreatepermission	==	false && kpieditpermission	==	false && kpiviewpermission	==	false && kpideletepermission	==	false){
								kpiOptionsicon	=	"";
							}else{
							
								kpiOptionsicon	=	`<ul class="header-dropdown" style="margin: 0px;">
	                				<li class="dropdown">
	                    				<a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
	                        				<i class="material-icons">more_vert</i>
	                    				</a>
	                    				<ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">`;

								 if(subkpicreatepermission	==	true){
									kpiOptionsicon	+=	`<li>
			                            <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="handleKpiEvent(`+kpi.id+`, 'add', `+objective.id+`)">Add</a>
			                        </li>`;
								}
								if(kpieditpermission	==	true){
									kpiOptionsicon	+=	`<li>
			                            <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="handleKpiEvent(`+kpi.id+`, 'edit', `+objective.id+`)">Edit</a>
			                        </li>`;
								}
								
								if(kpiviewpermission	==	true){
									kpiOptionsicon	+=	`<li>
			                            <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="handleKpiEvent(`+kpi.id+`, 'view', `+objective.id+`)">View</a>
			                        </li>`;
								}	
								 
								if(kpideletepermission	==	true){
									kpiOptionsicon	+=	`<li>
			                            <a href="#" onclick="handleKpiEvent(`+kpi.id+`, 'delete', `+objective.id+`)">Delete</a>
			                        </li>`;
								}
								
								kpiOptionsicon	+=	`</ul></li></ul>`;
							}
							
							
							var currentRow 	=	{};
							currentRow.objectiveId	=	objective.id;
							currentRow.kpiId		=	kpi.id;
							currentRow.scoreCardId  =  scorecard.id;
							currentRow.pageId       =  pageno;
							currentRow.kpiDisplayId	=	kpi.kpiId;
							currentRow.kpiName		=	kpi.kpiValue.name;
							currentRow.kpiMeasure	=	kpi.kpiValue.kpi_measurement;
							if(kpi.kpiValue.statusLightFlag !=	undefined && kpi.kpiValue.statusLightFlag !=	""){
								currentRow.statusLight	=	'<i class="'+kpi.kpiValue.statusLight+'" style="font-size:10px !important;color:'+kpi.kpiValue.statusLightFlag+' !important;"></i>';
							}else{
								currentRow.statusLight	=	'<i class="'+kpi.kpiValue.statusLight+'" style="font-size:10px !important;"></i>';
							}
							
							currentRow.kpiOptionsicon	=	kpiOptionsicon;
							
							var kpithresholdResult	=	"";	
							if(kpi.kpiValue.thresholdResult !=	undefined){
								kpithresholdResult	=	kpi.kpiValue.thresholdResult;
							}
							
							if(actualdisplay	==	true){
								currentRow.kpiActual		=	'<th  style="white-space: nowrap;">'+kpiActual+'</th>';
							}
							if(targetdisplay	==	true){
								currentRow.kpiTarget		=	'<th  style="white-space: nowrap;">'+kpiTarget+'</th>';
							}
							if(scoredisplay	==	true){
								currentRow.kpithresholdResult	=	'<th  style="white-space: nowrap;">'+kpithresholdResult+'</th>';
							}
							if(trenddisplay	==	true){
								currentRow.trendValue	=	"<th><i class=\""+kpi.kpiValue.trend+"\"></i></th>";
							}
							if(riskdisplay	==	true){
								currentRow.riskStatusLight	=	'<th><a href="/stratroom/risks?kpiId='+kpi.id+'&kpiRiskView=true"><i class="'+kpi.kpiValue.riskStatusLight+'" style="font-size:10px !important"></i></a></th>';
							}
							
							if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.statusrequired != undefined && controlpanelScorecardSettings.statusrequired == true){
								if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.kpistatus != undefined && controlpanelScorecardSettings.kpistatus == false){
									currentRow.statusLight	=	"";
								}
							}else if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.statusrequired != undefined && controlpanelScorecardSettings.statusrequired == false){
								currentRow.statusLight	=	"";
							}else{
								if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.kpistatus != undefined && controlpanelScorecardSettings.kpistatus == false){
									currentRow.statusLight	=	"";
								}
							}
							
							if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == true){
								if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.kpiscore != undefined && controlpanelScorecardSettings.kpiscore == false){
									currentRow.kpithresholdResult	=	"<th></th>";
								}
							}else if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == false){
								currentRow.kpithresholdResult	=	"<th></th>";
							}else{
								if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.kpiscore != undefined && controlpanelScorecardSettings.kpiscore == false){
									if(scoredisplay	==	true){
										currentRow.kpithresholdResult	=	"<th></th>";
									}
								}
							}
							
							if(KpiViewviewpermission	==	true){
								var useraccessid	=	localStorage.getItem("useraccessid");


								//if(KpiViewcreatepermission	==	true && KpiViewviewpermission	==	true && KpiVieweditpermission == true && KpiViewdeletepermission	==	true){
								if(useraccessid)
								{
									currentRow.KpiViewLink	=	'class="kpiclearrecord" href="/stratroom/kpiView?kpiId='+kpi.id+'&scoreCardId='+scorecard.id+'&objectiveId='+objective.id+'&pageId='+pageno+'&empId='+useraccessid+'"';								

								}else
								{
									currentRow.KpiViewLink	=	'class="kpiclearrecord" href="/stratroom/kpiView?kpiId='+kpi.id+'&scoreCardId='+scorecard.id+'&objectiveId='+objective.id+'&pageId='+pageno+'"';								

								}
							}else{
								currentRow.KpiViewLink	=	'';
							}
							var kpiRow = Mustache.render(kpiRowTemplate, currentRow);
							bodyRows = bodyRows + kpiRow;
						})
					}
				})
			}
			
			var scorecardStatuslight	=	"nestedWhite";
			var scorecardStatusvalueofweight	=	scorecard.scoreCardValue.thresholdResult;
			
			/*if(scorecard.scoreCardValue.statusLightFlag !=	undefined && scorecard.scoreCardValue.statusLightFlag !=	""){
				scorecardStatuslight	=	'class="header" style="border-left: 52px solid '+scorecard.scoreCardValue.statusLightFlag+'"';
			}else{*/
				if(scorecard.scoreCardValue.statusLight !=	undefined && scorecard.scoreCardValue.statusLight !=	""){
					scorecardStatuslight 	=	scorecard.scoreCardValue.statusLight.toLowerCase();
					if(scorecardStatuslight 	==	"yellow"){
						scorecardStatuslight 	=	"nestedWhite";
						scorecardStatuslight 	=	"nestedYellow";
					}else if(scorecardStatuslight 	==	"green"){
						scorecardStatuslight 	=	"nestedGreen";
					}else if(scorecardStatuslight 	==	"red"){
						scorecardStatuslight 	=	"nestedRed";
					}else{
						scorecardStatuslight 	=	"nestedWhite";
					}
				}
				
				if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.statusrequired != undefined && controlpanelScorecardSettings.statusrequired == true){
					if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.perspectivestatus != undefined && controlpanelScorecardSettings.perspectivestatus == false){
						scorecardStatuslight	=	"";
					}
				}

			
			var overAllStatus 		= 	data.statusLight;
			var thresholdResult 	= 	"";
			if(data.thresholdResult !=	undefined){
				thresholdResult	=	data.thresholdResult;	
			}
			var scorecardhtmlcontent	=	scorecardname;
			var scorecardstatusiconElement	=	$(".scorecardname");
			if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.customPerformance != undefined && controlpanelScorecardSettings.customPerformance == true){
				var scorecardstatusiconElement	=	$(".scorecardname");
				if(overAllStatus 	==	"RED"){
					scorecardhtmlcontent	=	scorecardname+`<span class="scorecard_status scorecardname" style="background-color:#e84343">`+thresholdResult+`</span>`;
				}else if(overAllStatus 	==	"YELLOW"){
					scorecardhtmlcontent	=	scorecardname+`<span class="scorecard_status scorecardname" style="background-color:#ffd500">`+thresholdResult+`</span>`;
				}else{
					scorecardhtmlcontent	=	scorecardname+`<span class="scorecard_status scorecardname" style="background-color:#1aa243">`+thresholdResult+`</span>`;
				}
				if($(".superusertopmenu").hasClass(scoresuperpageNo)){
					$(".subusermenuname").text(scorecardname);
				}
				$(".pageTitleStatus").html(scorecardhtmlcontent);
			}else{
				var scorecardstatusiconElement	=	$("#scorecardstatusicon");
				if(overAllStatus 	==	"RED"){
					scorecardhtmlcontent	=	scorecardname+`<span id="scorecardstatusicon" class="fa fa-arrow-circle-down" style="font-size:20px;color:#e84343"></span>`;
				}else if(overAllStatus 	==	"YELLOW"){
					scorecardhtmlcontent	=	scorecardname+`<span id="scorecardstatusicon" class="fa fa-arrow-circle-down" style="font-size:20px;color:#ffd500"></span>`;
				}else{
					scorecardhtmlcontent	=	scorecardname+`<span id="scorecardstatusicon" class="fa fa-arrow-circle-down" style="font-size:20px;color:#1aa243"></span>`;
				}
				if($(".superusertopmenu").hasClass(scoresuperpageNo)){
					$(".subusermenuname").text(scorecardname);
				}
				$(".pageTitleStatus").html(scorecardhtmlcontent);
			}
			
			var checkflagname	=	false;
			if(controlpanelScorecardSettings !=	undefined && (controlpanelScorecardSettings.customPerformance == undefined ||  controlpanelScorecardSettings.customPerformance == false)){
				if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.statusrequired != undefined && controlpanelScorecardSettings.statusrequired == true){
					checkflagname	=	true;
					if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardstatus != undefined && controlpanelScorecardSettings.scorecardstatus == false){
						$(".scorecardname").css("background-color","unset");
						$("#scorecardstatusicon").removeClass("fa-arrow-circle-down");
					}
				}else{
					if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardstatus != undefined && controlpanelScorecardSettings.scorecardstatus == false){
						$(".scorecardname").css("background-color","unset");
						$("#scorecardstatusicon").removeClass("fa-arrow-circle-down");
					}
				}
			}	
		
			if((checkflagname == true && (controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardstatus != undefined && controlpanelScorecardSettings.scorecardstatus == false) || (controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.performance != undefined && controlpanelScorecardSettings.performance == false)) && (controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.customPerformance != undefined && controlpanelScorecardSettings.customPerformance == false)){
				$(".scorecardname").css("background-color","unset");
				$("#scorecardstatusicon").removeClass("fa-arrow-circle-down");
			}
			
			if(checkflagname == true &&  controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && (controlpanelScorecardSettings.scorecardstatus == undefined && controlpanelScorecardSettings.performance == undefined && controlpanelScorecardSettings.customPerformance == undefined)){
				$(".scorecardname").css("background-color","unset");
				$("#scorecardstatusicon").removeClass("fa-arrow-circle-down");
			}
			
			if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == true){
				if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardscoreper != undefined && controlpanelScorecardSettings.scorecardscoreper == false){
					$(".scorecardname").text("");
				}
			}else if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == false){
				$(".scorecardname").text("");
			}else{
				if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardscoreper != undefined && controlpanelScorecardSettings.scorecardscoreper == false){
					$(".scorecardname").text("");
				}
			}
			
			var showhidetitle	=	"";
			var showhidevalue	=	"";
			var showlabelvalue	=	"";
			var displayblock	=	"block";
			if(scorecard.scoreCardValue.name !=	"" && typeof scorecard.scoreCardValue.name	===	"string"){
				showhidetitle	=	scorecard.scoreCardValue.name.toLowerCase();
				showlabelvalue	=	capitalizeFLetter(scorecard.scoreCardValue.name);
				showhidevalue	=	scorecard.scoreCardValue.name.replaceallstring();
				if(scorepreference['preferences']	!=	null){
					var subiniviewPreference	=	(scorepreference['preferences'][showhidevalue] !=	undefined?scorepreference['preferences'][showhidevalue]:"true");	
				}else{
					var subiniviewPreference	=	"true";
				}
				scoreempPreference["preferences"][showhidevalue]	=	subiniviewPreference;
				displayblock			=	(subiniviewPreference == "true"?"block":"none");
				subiniviewPreference	=	(subiniviewPreference	==	"true"?"checked":"");
				
			}
			
			designlabel		=	'<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="'+showhidetitle+'" value="'+showhidevalue+'" class="form-check-input" '+subiniviewPreference+'/>  '+showlabelvalue+'<span class="form-check-sign"><span class="check"></span></label></div></a></li>';
			
			// perspective row permission
			var perspectiveOptionsicon	=	"";						
			if(objectivecreatepermission	==	false && perspectiveeditpermission	==	false && perspectiveviewpermission	==	false){
				perspectiveOptionsicon	=	"";
			}else{
			
				perspectiveOptionsicon	=	`            <ul class="header-dropdown m-r--5">
	                <li class="dropdown m-t--10">
	                    <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
	                        <i class="material-icons">more_vert</i>
	                    </a>
	                    <ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">`;
				 
				if(objectivecreatepermission	==	true){
					perspectiveOptionsicon	+=	`<li>
	                <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="handleObjectiveEvent('0', 'add', `+scorecard.id+`)">Add</a>
	            </li>`;
				}
				
				if(perspectiveeditpermission	==	true){
					perspectiveOptionsicon	+=	`<li><a href="#" data-toggle="modal" data-target=".perspectives_description_popup" class="perspectivedescription" onclick="handlePerspectiveEvent(`+scorecard.id+`, 'edit')">Edit</a></li>`;
				}
				
				if(perspectiveviewpermission	==	true){
					perspectiveOptionsicon	+=	`<li>
	                <a href="#" data-toggle="modal" data-target=".perspectives_description_popup" class="perspectivedescription" onclick="handlePerspectiveEvent(`+scorecard.id+`, 'view')">View</a>
	            </li>`;
				}
				
				/*
				 * if(scoredeletepermission == true &&
				 * scorecard.scoreCardValue.defaultscr != true){
				 * perspectiveOptionsicon += `<li> <a href="#"
				 * onclick="handlePerspectiveEvent(`+scorecard.id+`,
				 * 'delete')">Delete</a> </li>`; }
				 */
				
				perspectiveOptionsicon	+=	`</ul></li></ul>`;
			}
	
			if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == true){
				if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.perspectivescore != undefined && controlpanelScorecardSettings.perspectivescore == false){
					scorecardStatusvalueofweight	=	"";
				}
			}else if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == false){
				scorecardStatusvalueofweight	=	"";
			}else{
				if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.perspectivescore != undefined && controlpanelScorecardSettings.perspectivescore == false){
					scorecardStatusvalueofweight	=	"";
				}
			}

			var flagstatusscore	=	false;
			var scorestatusbgColor	=	"";
			if((scorecardStatuslight	==	"nestedWhite" || scorecardStatuslight	==	"nestedYellow" || scorecardStatuslight	==	"nestedGreen" || scorecardStatuslight	==	"nestedRed") && scorecard.scoreCardValue.statusLightFlag !=	undefined && scorecard.scoreCardValue.statusLightFlag !=	""){
				flagstatusscore	=	true;
				scorestatusbgColor	=	scorecard.scoreCardValue.statusLightFlag;
			}
			
			if(!flagstatusscore){
				if(scorecardStatusvalueofweight !=	undefined && (scorecardStatusvalueofweight ==	0 || scorecardStatusvalueofweight !=	"") && scorecardStatuslight	==	""){
					scorecardStatuslight	=	'class="header nestedEmpty"';
				}else //if(scorecardStatuslight	==	"nestedWhite" || scorecardStatuslight	==	"nestedRed"){
					//scorecardStatuslight	=	'class="header '+scorecardStatuslight+'"';
				//}else
				{
					scorecardStatuslight 	=	'class="header '+scorecardStatuslight+'"';
				}
			}
			
			if(flagstatusscore){
				scorecardStatuslight 	=	'class="header" style="border-left: 52px solid '+scorestatusbgColor+';"';
			}
			
			if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && ((controlpanelScorecardSettings.performance == undefined && controlpanelScorecardSettings.customPerformance == undefined) || (controlpanelScorecardSettings.performance == false && controlpanelScorecardSettings.customPerformance == false))){
				scorecardStatuslight 	=	'class="header" style="border-left: 52px solid #dcdcdc"';
			}
			
			var finalHtml = Mustache.render(perspectiveTemplate, {
				title : scorecard.scoreCardValue.name,
				showhidetitle:showhidevalue,
				perspectiveOptionsicon:perspectiveOptionsicon,
				displayblock:displayblock,
				id : scorecard.id,
				scorecardStatuslight:scorecardStatuslight,
				scorecardStatusvalueofweight:scorecardStatusvalueofweight,
				Scrid : scorecard.id,
				defaultscr : scorecard.scoreCardValue.defaultscr,
				headerRow : headerRow,
				bodyRows : bodyRows
			});
			
			$("#viewiconTxt").append(designlabel);
			$('#scordcard-wrapper').append(finalHtml);
			
		});
	}
	
	var pageId = $('#pagenumber').val();

	$('.standard_multi-column-dropdown input[type="checkbox"]').click(function () {
  		var inputValue = $(this).attr('value');
		var checkedProp 	= 	$(this).is(':checked');
					inputValue			=	inputValue.replaceallstring();
					scoreempPreference["pageName"]					=	"SCORECARD";
					scoreempPreference["pageId"]					= 	pageId;
					scoreempPreference["preferences"][inputValue]	=	checkedProp;
					$.ajax({
						url : "/stratroom/employeePreference",
						type : "POST",
						contentType : "application/json",
						data : JSON.stringify(scoreempPreference),
						success : function(data, status) {
							
						},
						error:readErrorMsg
					});
  		$("." + inputValue).toggle();
	});	
	$(".standard_dropdown-hide").on("click", function (e) {
    	e.stopPropagation();
  	});

}

function fetchScordcardData(selectedpage) {
	var pageno 	= 	selectedpage;
	var pageEmpId	=	selectedDepartment;

	
	var datePeriod 	= 	$('#datePeriod').val();
	var frequency 	= 	localStorage.getItem("customperiod");
	var pageUrl = "";
	if(pageno != undefined && (frequency	!=	null && frequency	!=	"")){
		console.log("1278");
		console.log(pageno);
		pageUrl = "/stratroom/scoreCardListDept?pageId=" + pageno+"&deptId="+selectedDepartment+"&datePeriod="+datePeriod+"&frequency="+frequency
	}
	
	if(pageno	!=	""){
		$(".exceldownloadlink").attr("href","/stratroom/downloadScoreCard?pageId="+pageno+"&empId="+pageEmpId+"&datePeriod="+datePeriod);
	}else{
		$(".exceldownloadlink").attr("href","#");
		$(".exceldownloadlink").removeAttr("target");
	}
	
	$.ajax({
		url : pageUrl,
		async:false,
		success : scordcardSuccessCallback,
		error : function(response) {	

		}
	});	
}

function scoreCardSuccessCallback(data) {
	if (data.message != undefined && data.scoreCardName != undefined) {
		var scorecardhtmlcontent	=	data.scoreCardName+`<span class="scorecard_status scorecardname" style="background-color:#1aa243"></span>`;
		$(".pageTitleStatus").html(scorecardhtmlcontent);
		if($(".superusertopmenu").hasClass(scoresuperpageNo)){
			$(".subusermenuname").text(data.scoreCardName);
		}
	}
	
	if (!data.flag && data.message != undefined && data.message != "") {
		$(".container-fluid .tableview").attr("style","background-color: white;padding: 10px;margin-top: 10px;border-radius: 10px;").html("<center><h3>"+data.message+"</h3></center>")
	}
	scorecardlist = data.cardDetailsDTO;
	
	// var scorecardTemplate = $('#scorecard-template').html();
	// Mustache.parse(scorecardTemplate); // optional, speeds up future uses
	var perspectiveTemplate = $('#perspective-template').html();
	Mustache.parse(perspectiveTemplate); // optional, speeds up future uses

	var perspectiveHeaderRowTemplate = $('#perspective-header-row-template')
			.html();
	Mustache.parse(perspectiveHeaderRowTemplate); // optional, speeds up
	// future uses
	
	var objectiveRowTemplate = $('#objective-row-template').html();
	Mustache.parse(objectiveRowTemplate); // optional, speeds up future uses

	var kpiRowTemplate = $('#kpi-row-template').html();
	Mustache.parse(kpiRowTemplate); // optional, speeds up future uses
	var designlabel	=	"";
	$("#viewiconTxt").empty();
	$('#scordcard-wrapper').empty();
	var nestedredcount=0;
	var nestedyellowcount=0;
	var nestedblackcount=0;
	var nestedgreencount=0;
	var scorecardname = 'ScoreCard';
	
	var scorecardactual	=	false;
	var scorecardtarget	=	false;
	var scorecardbudget	=	false;
	var scorecardforecast	=	false;
	var scorecardscore	=	false;
	var scorecardtrend	=	false;
	var scorecardrisk	=	false;
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardactual !=	undefined && controlpanelScorecardSettings.scorecardactual == true){
		scorecardactual	=	true;
	}
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardtarget !=	undefined && controlpanelScorecardSettings.scorecardtarget == true){
		scorecardtarget	=	true;
	}
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardbudget !=	undefined && controlpanelScorecardSettings.scorecardbudget == true){
		scorecardbudget	=	true;
	}
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardforecast !=	undefined && controlpanelScorecardSettings.scorecardforecast == true){
		scorecardforecast	=	true;
	}
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardscore !=	undefined && controlpanelScorecardSettings.scorecardscore == true){
		scorecardscore	=	true;
	}
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardtrend !=	undefined && controlpanelScorecardSettings.scorecardtrend == true){
		scorecardtrend	=	true;
	}
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardrisk !=	undefined && controlpanelScorecardSettings.scorecardrisk == true){
		scorecardrisk	=	true;
	}
		
	if (data.cardDetailsDTO != undefined) {
		if (data.cardDetailsDTO.scorecardName != undefined && data.cardDetailsDTO.scorecardName != null) {
			scorecardname = data.cardDetailsDTO.scorecardName;
			score="";
			if(data.thresholdResult != "" || data.thresholdResult != null){
			score = data.thresholdResult;
			}
			else
			{
             score= "0.0";
			}
			$(".scorecardname").text(scorecardname);
			$("#score").html(score);
			// $('#scorecardparent').html(scorecarddata);
			var upiconflag	=	false;
			if(jQuery.isEmptyObject(data.cardDetailsDTO.scoreCardDTOS)) {
				if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.customPerformance != undefined && controlpanelScorecardSettings.customPerformance == true){
					//var scorecardstatusiconElement	=	$(".scorecardname");
					var scorecardhtmlcontent	=	scorecardname+`<span class="scorecard_status scorecardname" style="background-color:#1aa243"></span>`;
					$(".pageTitleStatus").html(scorecardhtmlcontent);
					if($(".superusertopmenu").hasClass(scoresuperpageNo)){
						$(".subusermenuname").text(scorecardname);
					}
				}else{	
					upiconflag	=	true;
				}
			}else{
				scorecardname	=	(data.cardDetailsDTO.scoreCardDTOS[0].scorecardName !=	undefined && data.cardDetailsDTO.scoreCardDTOS[0].scorecardName !=	null?data.cardDetailsDTO.scoreCardDTOS[0].scorecardName:scorecardname);
			}
		}
	}else{
		scorecardname	=	(data.scoreCardName !=	undefined && data.scoreCardName !=	null?data.scoreCardName:scorecardname);
	}
		// var scorecarddata = Mustache.render(scorecardTemplate, {
			// ScoreCardName : scorecardname
		// })
		
	if(upiconflag	==	true){
		var scorecardhtmlcontent	=	scorecardname+`<span id="scorecardstatusicon"></span>`;
		$(".pageTitleStatus").html(scorecardhtmlcontent);
		if($(".superusertopmenu").hasClass(scoresuperpageNo)){
			$(".subusermenuname").text(scorecardname);
		}
		var scorecardstatusiconElement	=	$("#scorecardstatusicon");
		scorecardstatusiconElement.addClass("fa fa-arrow-circle-up").css({"font-size":"20px","color":"#1aa243"});
	}
	
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.statusrequired != undefined && controlpanelScorecardSettings.statusrequired == true){
		if((controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardstatus != undefined && controlpanelScorecardSettings.scorecardstatus == false) && 
				controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.performance != undefined && controlpanelScorecardSettings.performance == false){
			$(".scorecardname").css("background-color","unset");
			$("#scorecardstatusicon").removeClass("fa-arrow-circle-up");
		}
	}else{
		$(".scorecardname").css("background-color","unset");
		$("#scorecardstatusicon").removeClass("fa-arrow-circle-up");
	}
	
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == true){
		if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardscoreper != undefined && controlpanelScorecardSettings.scorecardscoreper == false){
			$(".scorecardname").text("");
		}
	}else if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == false){
		$(".scorecardname").text("");
	}else{
		if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardscoreper != undefined && controlpanelScorecardSettings.scorecardscoreper == false){
			$(".scorecardname").text("");
		}
	}
	
	if(data.cardDetailsDTO !=	undefined){
		$.each(data.cardDetailsDTO.scoreCardDTOS, function(index, scorecard) {
	
			var actualdisplay	=	"";
			var targetdisplay	=	"";
			var trenddisplay	=	"";
			var riskdisplay		=	"";
			var scoredisplay	=	"";
			var statusDisplay	=	"";
			var currentheaderRow 	=	{};
			currentheaderRow.header1	=	scorecard.scoreCardValue.header1;
			currentheaderRow.header2 	=	scorecard.scoreCardValue.header2;
			
			if(scorecardactual == true){
				actualdisplay	=	true;
				currentheaderRow.header3='<th data-i18n="Actual">Actual</th>';
			}
			
			if(scorecardtarget == true){
				targetdisplay	=	true;
				currentheaderRow.header4='<th data-i18n="Target">Target</th>';
			}
			
			if(scorecardtrend == true){
				trenddisplay	=	true;
				currentheaderRow.header5='<th data-i18n="Trend">Trend</th>';
			}
			
			if(scorecardrisk == true){
				riskdisplay	=	true;
				currentheaderRow.header6='<th data-i18n="Risk">Risk</th>';
			}
			
			if(scorecardscore == true){
				scoredisplay	=	true;
				currentheaderRow.header7='<th data-i18n="Index">Index</th>';
			}
			
			/*
			 * for (var i = 2; i <= 9; i++) { var header =
			 * scorecard.scoreCardValue['header' + i]; var valueCheck =
			 * $('input[value=' + header + ']').val();
			 * 
			 * if(valueCheck !=undefined && valueCheck =="Target"){ targetdisplay =
			 * true; currentheaderRow.header4=valueCheck; }
			 * 
			 *  // currentheaderRow.header5="Annual Target"; if(valueCheck
			 * !=undefined && valueCheck =="Trend"){ trenddisplay = true;
			 * currentheaderRow.header5='<th>'+valueCheck+'</th>'; }
			 * if(valueCheck !=undefined && valueCheck =="Risk"){ riskdisplay =
			 * true; currentheaderRow.header6='<th>'+valueCheck+'</th>'; }
			 * if(valueCheck !=undefined && valueCheck =="Score"){ scoredisplay =
			 * true; currentheaderRow.header7='<th>'+valueCheck+'</th>'; }
			 * if(valueCheck !=undefined && valueCheck =="Status"){ statusDisplay =
			 * true; } }
			 */
			
			// todo: Read headers from scorecard.scoreCardValue
			var headerRow = Mustache.render(perspectiveHeaderRowTemplate, currentheaderRow);
			// '<thead><tr><th></th><th>ID</th><th></th><th></th><th></th><th>Period</th><th>Actual</th><th data-i18n="Target">Target</th><th>Trend</th><th>Risk</th></tr></thead>'
			var bodyRows = '';
	
			if (scorecard.objectiveList && scorecard.objectiveList.length > 0) {
				$.each(scorecard.objectiveList, function(objIndex, objective) {
					// todo: Read objectives and pass it to Mustache
					
					// objective row permission
						var objectiveOptionsicon	=	"";						
						if(kpicreatepermission	==	false && objectiveeditpermission	==	false && objectiveviewpermission	==	false && objectivedeletepermission	==	false){
							objectiveOptionsicon	=	"";
						}else{
						
							objectiveOptionsicon	=	`<ul class="header-dropdown m-r--5">
			                <li class="dropdown">
			                    <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
			                        <i class="material-icons">more_vert</i>
			                    </a>
	                    		<ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(-104px, 24px, 0px);">
	                        	`;
							 
							if(kpicreatepermission	==	true){
								objectiveOptionsicon	+=	`<li>
	                            <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="handleKpiEvent('0', 'add', `+objective.id+`)">Add</a>
	                        </li>`;
							}
							
							if(objectiveeditpermission	==	true){
								objectiveOptionsicon	+=	`<li>
	                            <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="handleObjectiveEvent(`+objective.id+`, 'edit', `+scorecard.id+`)">Edit</a>
	                        </li>`;
							}
							
							if(objectiveviewpermission	==	true){
								objectiveOptionsicon	+=	`<li>
	                            <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="handleObjectiveEvent(`+objective.id+`, 'view', `+scorecard.id+`)">View</a>
	                        </li>`;
							}	
							
							 
							if(objectivedeletepermission	==	true){
								objectiveOptionsicon	+=	`<li>
	                            	<a href="#" onclick="handleObjectiveEvent(`+objective.id+`, 'delete', `+scorecard.id+`)">Delete</a>
	                        	</li>`;
							}
							
							objectiveOptionsicon	+=	`</ul></li></ul>`;
						}
						
						var objthresholdResult	=	"";	
						if(objective.objectivesValue.thresholdResult !=	undefined && scoredisplay	==	true){
							objthresholdResult	=	objective.objectivesValue.thresholdResult;
						}
						
						var trendrisktd	=	"";
						
						if(trenddisplay == true && riskdisplay == true){
							trendrisktd	=	"<td></td><td></td>";
						}else if(trenddisplay == true && riskdisplay == false){
							trendrisktd	=	"<td></td>";
						}else if(trenddisplay == false && riskdisplay == true){
							trendrisktd	=	"<td></td>";
						}else if(trenddisplay == false && riskdisplay == false){
							trendrisktd	=	"";
						}
						
						var actualtargettd	=	"";
						
						if(actualdisplay == true && targetdisplay == true){
							actualtargettd	=	"<td></td><td></td>";
						}else if(actualdisplay == true && targetdisplay == false){
							actualtargettd	=	"<td></td>";
						}else if(actualdisplay == false && targetdisplay == true){
							actualtargettd	=	"<td></td>";
						}else if(actualdisplay == false && targetdisplay == false){
							actualtargettd	=	"";
						}
						
						if(typeof(objthresholdResult) == "string" && objthresholdResult !=	undefined && !objthresholdResult.includes('%') && objthresholdResult !=	"")
						{
							objthresholdResult = objthresholdResult + "%"
						}
						
						if(scoredisplay == true){
							objthresholdResult	=	"<td><strong>"+objthresholdResult+"</strong></td>";
						}
					var objstatusLight	=	"";
					if(objective.objectivesValue.statusLightFlag !=	undefined && objective.objectivesValue.statusLightFlag !=	""){
						objstatusLight	=	'<i class="'+objective.objectivesValue.statusLight+'" style="font-size:10px !important;color:'+objective.objectivesValue.statusLightFlag+' !important;"></i>';
					}else{
						objstatusLight	=	'<i class="'+objective.objectivesValue.statusLight+'" style="font-size:10px !important;"></i>';
					}	
					
					if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.statusrequired != undefined && controlpanelScorecardSettings.statusrequired == true){
						if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.objectivestatus != undefined && controlpanelScorecardSettings.objectivestatus == false){
							objstatusLight	=	"";
						}
					}else if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.statusrequired != undefined && controlpanelScorecardSettings.statusrequired == false){
						objstatusLight	=	"";
					}else{
						if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.objectivestatus != undefined && controlpanelScorecardSettings.objectivestatus == false){
							objstatusLight	=	"";
						}
					}
					
					if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == true){
						if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.objectivescore != undefined && controlpanelScorecardSettings.objectivescore == false){
							objthresholdResult	=	"<td></td>";
						}
					}else if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == false){
						objthresholdResult	=	"<td></td>";
					}else{
						if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.objectivescore != undefined && controlpanelScorecardSettings.objectivescore == false){
							objthresholdResult	=	"<td></td>";
						}
					}
					
					var objectiveRow = Mustache.render(objectiveRowTemplate, {
						scoreCardId : scorecard.id,
						objectiveId : objective.id,
						objectiveDisplayId : objective.objectiveId,
						objectiveName : objective.objectivesValue.name,
						statusLight : objstatusLight,
						objthresholdResult:objthresholdResult,
						actualtargettd:actualtargettd,
						trendrisktd:trendrisktd,
						objectiveOptionsicon:objectiveOptionsicon
					});
					
					bodyRows = bodyRows + objectiveRow;
					
					
					if (objective.kpiList && objective.kpiList.length > 0) {
						$.each(objective.kpiList, function(kpiIndex, kpi) {
							// todo: Read objectives and pass it to Mustache
							/*
							 * var readTargetAmount =
							 * intergerHumanFormat(kpi.kpiValue.target); var
							 * kpiTarget = (kpi.kpiValue.targetCurrency == undefined ||
							 * kpi.kpiValue.targetCurrency ==
							 * ""?readTargetAmount:kpi.kpiValue.targetCurrency+readTargetAmount);
							 * 
							 * var readActualAmount =
							 * intergerHumanFormat(kpi.kpiValue.actual);//kpi.kpiValue.actual
							 * var kpiActual = (kpi.kpiValue.actualCurrency ==
							 * undefined || kpi.kpiValue.actualCurrency ==
							 * ""?readActualAmount:kpi.kpiValue.actualCurrency+readActualAmount);
							 */
							
							
							var kpiActual	=	(kpi.kpiValue.actual !=	undefined && kpi.kpiValue.actual !=	null?kpi.kpiValue.actual:"");
							var kpiTarget	=	(kpi.kpiValue.target !=	undefined && kpi.kpiValue.target !=	null?kpi.kpiValue.target:"");
							var pageno = $('#pagenumber').val();
							
							
							var targetcurrency	=	(kpi.kpiValue.targetCurrency != undefined && kpi.kpiValue.targetCurrency != ""?kpi.kpiValue.targetCurrency:"");
							var actutalcurrency	=	(kpi.kpiValue.actualCurrency != undefined && kpi.kpiValue.actualCurrency != ""?kpi.kpiValue.actualCurrency:"");
							targetcurrency	=	(targetcurrency ==""?targetcurrency:kpi.kpiValue.kpiCurrency != undefined && kpi.kpiValue.kpiCurrency != ""?kpi.kpiValue.kpiCurrency:"");
							actutalcurrency	=	(actutalcurrency ==""?actutalcurrency:kpi.kpiValue.kpiCurrency != undefined && kpi.kpiValue.kpiCurrency != ""?kpi.kpiValue.kpiCurrency:"");
							
							kpiActual		=	actutalcurrency+kpiActual // actutalcurrency+numberchartActual['firstletter']+intergerHumanFormat(numberchartActual['number'])+numberchartActual['lastletter'];
							
							if(kpi.kpiValue.dataType !=	undefined && kpi.kpiValue.dataType !=	null)
								{
									if(kpi.kpiValue.dataType == 'Percentage')
										{
											
											if(!kpiTarget.includes('%'))
												{
												kpiTarget = kpiTarget + "%"
												}
											
										}
								}
							kpiTarget		=	targetcurrency+kpiTarget // targetcurrency+numberchartTarget['firstletter']+numberchartTarget['number']+numberchartTarget['lastletter'];
							
							
							// kpi row permission
							var kpiOptionsicon	=	"";						
							if(subkpicreatepermission	==	false && kpieditpermission	==	false && kpiviewpermission	==	false && kpideletepermission	==	false){
								kpiOptionsicon	=	"";
							}else{
							
								kpiOptionsicon	=	`<ul class="header-dropdown" style="margin: 0px;">
	                				<li class="dropdown">
	                    				<a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
	                        				<i class="material-icons">more_vert</i>
	                    				</a>
	                    				<ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">`;

								if(subkpicreatepermission	==	true){
									kpiOptionsicon	+=	`<li>
			                            <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="handleKpiEvent(`+kpi.id+`, 'add', `+objective.id+`)">Add</a>
			                        </li>`;
								}
										
								if(kpieditpermission	==	true){
									kpiOptionsicon	+=	`<li>
			                            <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="handleKpiEvent(`+kpi.id+`, 'edit', `+objective.id+`)">Edit</a>
			                        </li>`;
								}
								
								if(kpiviewpermission	==	true){
									kpiOptionsicon	+=	`<li>
			                            <a href="#" data-toggle="modal" data-target=".kpi_description_popup" class="kpidescription" onclick="handleKpiEvent(`+kpi.id+`, 'view', `+objective.id+`)">View</a>
			                        </li>`;
								}	
								 
								if(kpideletepermission	==	true){
									kpiOptionsicon	+=	`<li>
			                            <a href="#" onclick="handleKpiEvent(`+kpi.id+`, 'delete', `+objective.id+`)">Delete</a>
			                        </li>`;
								}
								
								kpiOptionsicon	+=	`</ul></li></ul>`;
							}
							
							
							var currentRow 	=	{};
							currentRow.objectiveId	=	objective.id;
							currentRow.kpiId		=	kpi.id;
							currentRow.scoreCardId  =  scorecard.id;
							currentRow.pageId       =  pageno;
							currentRow.kpiDisplayId	=	kpi.kpiId;
							currentRow.kpiName		=	kpi.kpiValue.name;
							currentRow.kpiMeasure	=	kpi.kpiValue.kpi_measurement;
							if(kpi.kpiValue.statusLightFlag !=	undefined && kpi.kpiValue.statusLightFlag !=	""){
								currentRow.statusLight	=	'<i class="'+kpi.kpiValue.statusLight+'" style="font-size:10px !important;color:'+kpi.kpiValue.statusLightFlag+' !important;"></i>';
							}else{
								currentRow.statusLight	=	'<i class="'+kpi.kpiValue.statusLight+'" style="font-size:10px !important;"></i>';
							}
							
							currentRow.kpiOptionsicon	=	kpiOptionsicon;
							
							var kpithresholdResult	=	"";	
							if(kpi.kpiValue.thresholdResult !=	undefined){
								kpithresholdResult	=	kpi.kpiValue.thresholdResult;
							}
							
							if(actualdisplay	==	true){
								currentRow.kpiActual		=	'<th  style="white-space: nowrap;">'+kpiActual+'</th>';
							}
							if(targetdisplay	==	true){
								currentRow.kpiTarget		=	'<th  style="white-space: nowrap;">'+kpiTarget+'</th>';
							}
							if(scoredisplay	==	true){
								currentRow.kpithresholdResult	=	'<th  style="white-space: nowrap;">'+kpithresholdResult+'</th>';
							}
							if(trenddisplay	==	true){
								currentRow.trendValue	=	"<th><i class=\""+kpi.kpiValue.trend+"\"></i></th>";
							}
							if(riskdisplay	==	true){
								currentRow.riskStatusLight	=	'<th><a href="/stratroom/risks?kpiId='+kpi.id+'&kpiRiskView=true"><i class="'+kpi.kpiValue.riskStatusLight+'" style="font-size:10px !important"></i></a></th>';
							}
							
							if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.statusrequired != undefined && controlpanelScorecardSettings.statusrequired == true){
								if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.kpistatus != undefined && controlpanelScorecardSettings.kpistatus == false){
									currentRow.statusLight	=	"";
								}
							}else if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.statusrequired != undefined && controlpanelScorecardSettings.statusrequired == false){
								currentRow.statusLight	=	"";
							}else{
								if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.kpistatus != undefined && controlpanelScorecardSettings.kpistatus == false){
									currentRow.statusLight	=	"";
								}
							}
							
							if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == true){
								if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.kpiscore != undefined && controlpanelScorecardSettings.kpiscore == false){
									currentRow.kpithresholdResult	=	"<th></th>";
								}
							}else if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == false){
								currentRow.kpithresholdResult	=	"<th></th>";
							}else{
								if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.kpiscore != undefined && controlpanelScorecardSettings.kpiscore == false){
									if(scoredisplay	==	true){
										currentRow.kpithresholdResult	=	"<th></th>";
									}
								}
							}
							
							if(KpiViewviewpermission	==	true){
								//if(KpiViewcreatepermission	==	true && KpiViewviewpermission	==	true && KpiVieweditpermission == true && KpiViewdeletepermission	==	true){
								pageno	=	$('#defaultpagenumber').val();
								var useraccessid	=	localStorage.getItem("useraccessid");

								if(useraccessid) {
									currentRow.KpiViewLink	=	'class="kpiclearrecord" href="/stratroom/kpiView?kpiId='+kpi.id+'&scoreCardId='+scorecard.id+'&objectiveId='+objective.id+'&pageId='+pageno+'&empId='+useraccessid+'"';								

								}else
								{
									currentRow.KpiViewLink	=	'class="kpiclearrecord" href="/stratroom/kpiView?kpiId='+kpi.id+'&scoreCardId='+scorecard.id+'&objectiveId='+objective.id+'&pageId='+pageno+'"';								

								}
							}else{
								currentRow.KpiViewLink	=	'';
							}
							var kpiRow = Mustache.render(kpiRowTemplate, currentRow);
							bodyRows = bodyRows + kpiRow;
						})
					}
				})
			}
			
			var scorecardStatuslight	=	"nestedWhite";
			var scorecardStatusvalueofweight	=	scorecard.scoreCardValue.thresholdResult;
			
			/*if(scorecard.scoreCardValue.statusLightFlag !=	undefined && scorecard.scoreCardValue.statusLightFlag !=	""){
				scorecardStatuslight	=	'class="header" style="border-left: 52px solid '+scorecard.scoreCardValue.statusLightFlag+'"';
			}else{*/
				if(scorecard.scoreCardValue.statusLight !=	undefined && scorecard.scoreCardValue.statusLight !=	""){
					scorecardStatuslight 	=	scorecard.scoreCardValue.statusLight.toLowerCase();
					if(scorecardStatuslight 	==	"yellow"){
						scorecardStatuslight 	=	"nestedWhite";
						scorecardStatuslight 	=	"nestedYellow";
					}else if(scorecardStatuslight 	==	"green"){
						scorecardStatuslight 	=	"nestedGreen";
					}else if(scorecardStatuslight 	==	"red"){
						scorecardStatuslight 	=	"nestedRed";
					}else{
						scorecardStatuslight 	=	"nestedWhite";
					}
				}
				
				if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.statusrequired != undefined && controlpanelScorecardSettings.statusrequired == true){
					if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.perspectivestatus != undefined && controlpanelScorecardSettings.perspectivestatus == false){
						scorecardStatuslight	=	"";
					}
				}
			//}
			

			
			var overAllStatus 		= 	data.statusLight;
			var thresholdResult 	= 	"";
			if(data.thresholdResult !=	undefined){
				thresholdResult	=	data.thresholdResult;	
			}
			var scorecardhtmlcontent	=	scorecardname;
			var scorecardstatusiconElement	=	$(".scorecardname");
			if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.customPerformance != undefined && controlpanelScorecardSettings.customPerformance == true){
				var scorecardstatusiconElement	=	$(".scorecardname");
				if(overAllStatus 	==	"RED"){
					scorecardhtmlcontent	=	scorecardname+`<span class="scorecard_status scorecardname" style="background-color:#e84343">`+thresholdResult+`</span>`;
				}else if(overAllStatus 	==	"LIGHTRED"){
					scorecardhtmlcontent	=	scorecardname+`<span class="scorecard_status scorecardname" style="background-color:#FF4B3E">`+thresholdResult+`</span>`;
				}else if(overAllStatus 	==	"YELLOW"){
					scorecardhtmlcontent	=	scorecardname+`<span class="scorecard_status scorecardname" style="background-color:#ffd500">`+thresholdResult+`</span>`;
				}else if(overAllStatus 	==	"LIGHTGREEN"){
					scorecardhtmlcontent	=	scorecardname+`<span class="scorecard_status scorecardname" style="background-color:#5FCD5F">`+thresholdResult+`</span>`;
				}else{
					scorecardhtmlcontent	=	scorecardname+`<span class="scorecard_status scorecardname" style="background-color:#1aa243">`+thresholdResult+`</span>`;
				}
				if($(".superusertopmenu").hasClass(scoresuperpageNo)){
					$(".subusermenuname").text(scorecardname);
				}
				$(".pageTitleStatus").html(scorecardhtmlcontent);
			}else{
				var scorecardstatusiconElement	=	$("#scorecardstatusicon");
				if(overAllStatus 	==	"RED"){
					scorecardhtmlcontent	=	scorecardname+`<span id="scorecardstatusicon" class="fa fa-arrow-circle-down" style="font-size:20px;color:#e84343"></span>`;
				}else if(overAllStatus 	==	"LIGHTRED"){
					scorecardhtmlcontent	=	scorecardname+`<span id="scorecardstatusicon" class="fa fa-arrow-circle-down" style="font-size:20px;color:#FF4B3E"></span>`;
				}else if(overAllStatus 	==	"YELLOW"){
					scorecardhtmlcontent	=	scorecardname+`<span id="scorecardstatusicon" class="fa fa-arrow-circle-down" style="font-size:20px;color:#ffd500"></span>`;
				}else if(overAllStatus 	==	"LIGHTGREEN"){
					scorecardhtmlcontent	=	scorecardname+`<span id="scorecardstatusicon" class="fa fa-arrow-circle-down" style="font-size:20px;color:#5FCD5F"></span>`;
				}else{
					scorecardhtmlcontent	=	scorecardname+`<span id="scorecardstatusicon" class="fa fa-arrow-circle-down" style="font-size:20px;color:#1aa243"></span>`;
				}
				if($(".superusertopmenu").hasClass(scoresuperpageNo)){
					$(".subusermenuname").text(scorecardname);
				}
				$(".pageTitleStatus").html(scorecardhtmlcontent);
			}
			
			var checkflagname	=	false;
			if(controlpanelScorecardSettings !=	undefined && (controlpanelScorecardSettings.customPerformance == undefined ||  controlpanelScorecardSettings.customPerformance == false)){
				if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.statusrequired != undefined && controlpanelScorecardSettings.statusrequired == true){
					checkflagname	=	true;
					if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardstatus != undefined && controlpanelScorecardSettings.scorecardstatus == false){
						$(".scorecardname").css("background-color","unset");
						$("#scorecardstatusicon").removeClass("fa-arrow-circle-down");
					}
				}else{
					if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardstatus != undefined && controlpanelScorecardSettings.scorecardstatus == false){
						$(".scorecardname").css("background-color","unset");
						$("#scorecardstatusicon").removeClass("fa-arrow-circle-down");
					}
				}
			}	
		
			if((checkflagname == true && (controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardstatus != undefined && controlpanelScorecardSettings.scorecardstatus == false) || (controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.performance != undefined && controlpanelScorecardSettings.performance == false)) && (controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.customPerformance != undefined && controlpanelScorecardSettings.customPerformance == false)){
				$(".scorecardname").css("background-color","unset");
				$("#scorecardstatusicon").removeClass("fa-arrow-circle-down");
			}
			
			if(checkflagname == true &&  controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && (controlpanelScorecardSettings.scorecardstatus == undefined && controlpanelScorecardSettings.performance == undefined && controlpanelScorecardSettings.customPerformance == undefined)){
				$(".scorecardname").css("background-color","unset");
				$("#scorecardstatusicon").removeClass("fa-arrow-circle-down");
			}
			
			if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == true){
				if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardscoreper != undefined && controlpanelScorecardSettings.scorecardscoreper == false){
					$(".scorecardname").text("");
				}
			}else if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == false){
				$(".scorecardname").text("");
			}else{
				if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorecardscoreper != undefined && controlpanelScorecardSettings.scorecardscoreper == false){
					$(".scorecardname").text("");
				}
			}
			
			var showhidetitle	=	"";
			var showhidevalue	=	"";
			var showlabelvalue	=	"";
			var displayblock	=	"block";
			if(scorecard.scoreCardValue.name !=	"" && typeof scorecard.scoreCardValue.name	===	"string"){
				showhidetitle	=	scorecard.scoreCardValue.name.toLowerCase();
				showlabelvalue	=	capitalizeFLetter(scorecard.scoreCardValue.name);
				showhidevalue	=	scorecard.scoreCardValue.name.replaceallstring();
				if(scorepreference['preferences']	!=	null){
					var subiniviewPreference	=	(scorepreference['preferences'][showhidevalue] !=	undefined?scorepreference['preferences'][showhidevalue]:"true");	
				}else{
					var subiniviewPreference	=	"true";
				}
				scoreempPreference["preferences"][showhidevalue]	=	subiniviewPreference;
				displayblock			=	(subiniviewPreference == "true"?"block":"none");
				subiniviewPreference	=	(subiniviewPreference	==	"true"?"checked":"");
				
			}
			
			designlabel		=	'<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="'+showhidetitle+'" value="'+showhidevalue+'" class="form-check-input" '+subiniviewPreference+'/>  '+showlabelvalue+'<span class="form-check-sign"><span class="check"></span></label></div></a></li>';
			
			// perspective row permission
			var perspectiveOptionsicon	=	"";						
			if(objectivecreatepermission	==	false && perspectiveeditpermission	==	false && perspectiveviewpermission	==	false){
				perspectiveOptionsicon	=	"";
			}else{
			
				perspectiveOptionsicon	=	`            <ul class="header-dropdown m-r--5">
	                <li class="dropdown m-t--10">
	                    <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
	                        <i class="material-icons">more_vert</i>
	                    </a>
	                    <ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">`;
				 
				if(objectivecreatepermission	==	true){
					perspectiveOptionsicon	+=	`<li>
	                <a href="#" data-toggle="modal" data-target=".objective_description_popup" class="objectivedescription" onclick="handleObjectiveEvent('0', 'add', `+scorecard.id+`)">Add</a>
	            </li>`;
				}
				
				if(perspectiveeditpermission	==	true){
					perspectiveOptionsicon	+=	`<li><a href="#" data-toggle="modal" data-target=".perspectives_description_popup" class="perspectivedescription" onclick="handlePerspectiveEvent(`+scorecard.id+`, 'edit')">Edit</a></li>`;
				}
				
				if(perspectiveviewpermission	==	true){
					perspectiveOptionsicon	+=	`<li>
	                <a href="#" data-toggle="modal" data-target=".perspectives_description_popup" class="perspectivedescription" onclick="handlePerspectiveEvent(`+scorecard.id+`, 'view')">View</a>
	            </li>`;
				}
				
				/*
				 * if(scoredeletepermission == true &&
				 * scorecard.scoreCardValue.defaultscr != true){
				 * perspectiveOptionsicon += `<li> <a href="#"
				 * onclick="handlePerspectiveEvent(`+scorecard.id+`,
				 * 'delete')">Delete</a> </li>`; }
				 */
				
				perspectiveOptionsicon	+=	`</ul></li></ul>`;
			}
	
			if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == true){
				if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.perspectivescore != undefined && controlpanelScorecardSettings.perspectivescore == false){
					scorecardStatusvalueofweight	=	"";
				}
			}else if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.scorerequired != undefined && controlpanelScorecardSettings.scorerequired == false){
				scorecardStatusvalueofweight	=	"";
			}else{
				if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.perspectivescore != undefined && controlpanelScorecardSettings.perspectivescore == false){
					scorecardStatusvalueofweight	=	"";
				}
			}

			var flagstatusscore	=	false;
			var scorestatusbgColor	=	"";
			if((scorecardStatuslight	==	"nestedWhite" || scorecardStatuslight	==	"nestedYellow" || scorecardStatuslight	==	"nestedGreen" || scorecardStatuslight	==	"nestedRed") && scorecard.scoreCardValue.statusLightFlag !=	undefined && scorecard.scoreCardValue.statusLightFlag !=	""){
				flagstatusscore	=	true;
				scorestatusbgColor	=	scorecard.scoreCardValue.statusLightFlag;
			}
			
			if(!flagstatusscore){
				if(scorecardStatusvalueofweight !=	undefined && (scorecardStatusvalueofweight ==	0 || scorecardStatusvalueofweight !=	"") && scorecardStatuslight	==	""){
					scorecardStatuslight	=	'class="header nestedEmpty"';
				}else //if(scorecardStatuslight	==	"nestedWhite" || scorecardStatuslight	==	"nestedRed"){
					//scorecardStatuslight	=	'class="header '+scorecardStatuslight+'"';
				//}else
				{
					scorecardStatuslight 	=	'class="header '+scorecardStatuslight+'"';
				}
			}
			
			if(flagstatusscore){
				scorecardStatuslight 	=	'class="header" style="border-left: 52px solid '+scorestatusbgColor+';"';
			}
			
			if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && ((controlpanelScorecardSettings.performance == undefined && controlpanelScorecardSettings.customPerformance == undefined) || (controlpanelScorecardSettings.performance == false && controlpanelScorecardSettings.customPerformance == false))){
				scorecardStatuslight 	=	'class="header" style="border-left: 52px solid #dcdcdc"';
			}
			
			var finalHtml = Mustache.render(perspectiveTemplate, {
				title : scorecard.scoreCardValue.name,
				showhidetitle:showhidevalue,
				perspectiveOptionsicon:perspectiveOptionsicon,
				displayblock:displayblock,
				id : scorecard.id,
				scorecardStatuslight:scorecardStatuslight,
				scorecardStatusvalueofweight:scorecardStatusvalueofweight,
				Scrid : scorecard.id,
				defaultscr : scorecard.scoreCardValue.defaultscr,
				headerRow : headerRow,
				bodyRows : bodyRows
			});
			
			$("#viewiconTxt").append(designlabel);
			$('#scordcard-wrapper').append(finalHtml);
			
		});
	}
	
	var pageId = $('#pagenumber').val();

	$('.standard_multi-column-dropdown input[type="checkbox"]').click(function () {
  		var inputValue = $(this).attr('value');
		var checkedProp 	= 	$(this).is(':checked');
					inputValue			=	inputValue.replaceallstring();
					scoreempPreference["pageName"]					=	"SCORECARD";
					scoreempPreference["pageId"]					= 	pageId;
					scoreempPreference["preferences"][inputValue]	=	checkedProp;
					$.ajax({
						url : "/stratroom/employeePreference",
						type : "POST",
						contentType : "application/json",
						data : JSON.stringify(scoreempPreference),
						success : function(data, status) {
							
						},
						error:readErrorMsg
					});
  		$("." + inputValue).toggle();
	});	
	$(".standard_dropdown-hide").on("click", function (e) {
    	e.stopPropagation();
  	});

}

function fetchScoreCardData() {
	var pageno 	= 	$('#pagenumber').val();
	var pageEmpId	=	$('#pageEmpId').val();
	if($("#ischeckemployeeurlornot").val()	==	"EMPLOYEE"){
		pageno	=	$('#defaultpagenumber').val();
		pageEmpId = empId
		
		var customscore	=	localStorage.getItem("custom_scorecardliId");
		if(customscore	!=	""	&& customscore	!=	null	&& customscore !=	undefined){
			$(".scorecard-dropdown li a").each(function(key,value){
				var lastvalue	=	$(this).attr("data-value");
				if(lastvalue	==	customscore){
					pageno	=	customscore;
					$(".scorecardnamecontent").css("display","block");
					$(".scorecardnamevalue").text($(this).text());
					$(this).addClass("active");
				}
			});
		}
	}
	
	var datePeriod 	= 	$('#datePeriod').val();
	var frequency 	= 	localStorage.getItem("customperiod");
	var pageUrl = "";
	if(pageno != undefined && (frequency	!=	null && frequency	!=	"")){
		pageUrl = "/stratroom/scoreCardList?pageId=" + pageno+"&empId="+pageEmpId+"&datePeriod="+datePeriod+"&frequency="+frequency
	}else if(pageno != undefined && (frequency	==	null || frequency	==	"")){
		pageUrl = "/stratroom/scoreCardList?pageId=" + pageno+"&empId="+pageEmpId+"&datePeriod="+datePeriod
	}else{
		pageUrl = "/stratroom/scoreCardList?pageId=" + pageno+"&datePeriod="+datePeriod
	}
	
	if(pageno	!=	""){
		$(".exceldownloadlink").attr("href","/stratroom/downloadScoreCard?pageId="+pageno+"&empId="+pageEmpId+"&datePeriod="+datePeriod);
	}else{
		$(".exceldownloadlink").attr("href","#");
		$(".exceldownloadlink").removeAttr("target");
	}
	
	$.ajax({
		url : pageUrl,
		async:false,
		success : scoreCardSuccessCallback,
		error : function(response) {
			if (response.status == "404") {
				console.log("Error code: 404");
				var getscorecardpagename	=	(localStorage.getItem('defaultscorecardpagename') != null && localStorage.getItem('defaultscorecardpagename') !=	undefined?localStorage.getItem('defaultscorecardpagename'):"Scorecard");
				var perspectiveObj = {
						"scorecardName" : getscorecardpagename,
						"owner" : empId,
						"pageId" : pageno,
						"scoreCardDetailsValue" : {
							"scoreCardName" : getscorecardpagename,
							"score_card_start_end_date" : $("#datePeriod").val()
						}
					}
				console.log(pageno);
				var systemip = 	localStorage.getItem('systemip');
				var super_empid=$("#userPrincipal").val();
				var data	=	{"createdBy":super_empid,"userId":empId,"action":"Standard BSC Accessed","systemIp":systemip};
				$.ajax({
					url:"/stratroom/auditTrail",
					type:"post",
					async:false,
					contentType:"application/JSON",
					data:JSON.stringify(data),
					success:function(res){
						
					}
				});
				$.ajax({
					url : "/stratroom/scorecardDetails",
					type : "post",
					contentType : "application/json",
					data : JSON.stringify(perspectiveObj),
					async:false,
					success : function(data, status) {
						if(data.cardDetailsDTO.id !=	undefined && data.cardDetailsDTO.id !=	""){
							console.log(pageno);
							var scorecardcreatedid	=	data.cardDetailsDTO.id;	
							var scorecardobj = getScorecardTemplObj("Financial", pageEmpId,scorecardcreatedid);
							createtemplatescorecard(scorecardobj);
			
							scorecardobj = getScorecardTemplObj("Customer", pageEmpId,scorecardcreatedid);
							createtemplatescorecard(scorecardobj);
			
							scorecardobj = getScorecardTemplObj("Internal Process", pageEmpId,scorecardcreatedid);
							createtemplatescorecard(scorecardobj);
			
							scorecardobj = getScorecardTemplObj("Learning & Growth",pageEmpId,scorecardcreatedid);
							createtemplatescorecard(scorecardobj);
	
							location.reload(true);
						}
					}
				});
					


			}else{
				var msg = JSON.parse(response.responseText);
				// $.notify(msg.exception);
			}

		}
	});	
}


function fetchKpiDetails(id, action) {

	$('#kpi_id').val(id);

	if (action == 'view') {
		$('#kpiForm input[type="text"]').prop("disabled", true);
		$('#kpiForm input[type="checkbox"]').prop("disabled", true);
		$('#kpiForm select').prop("disabled", true);
		$('#scrActual').prop('readonly', true);
		$('#scrTarget').prop('readonly', true);
	}

	$.ajax({
		url : "/stratroom/kpi/" + id,
		success : kpiSuccessCallback
	});

}

function sentenceCase (str) {
    return str.replace(/[a-z]/i, function (letter) {

return letter.toUpperCase();

  }).trim();
}

function kpiSuccessCallback(kpiData) {
	parentKpidetails.id 	=	kpiData.id;
	parentKpidetails.owner 	=	kpiData.owner;
	parentKpidetails.createDateString 	=	kpiData.createDateString;
	parentKpidetails.updatedDateString 	=	kpiData.updatedDateString;
	parentKpidetails.objectiveId 		=	kpiData.objectiveId;
	parentKpidetails.createdBy 			=	kpiData.createdBy;
	parentKpidetails.kpiValue			=	kpiData.kpiValue;
	parentKpidetails.kpiFormula			=	kpiData.kpiFormula;
	parentKpidetails.updatedBy 			=	kpiData.updatedBy;
	parentKpidetails.createdTime 		=	kpiData.createdTime;
	parentKpidetails.kpiId 				=	kpiData.kpiId;
	
	$("#kpiForm").css('display', 'block');
	var kpidisplayId 	=	(kpiData.kpiId != undefined && kpiData.kpiId != ""?kpiData.kpiId:kpiData.id);
	var kpistatus = (kpiData.kpiValue.status != undefined && kpiData.kpiValue.status !=""?sentenceCase(kpiData.kpiValue.status):"");
	var kpidatasource = (kpiData.kpiValue.kpi_datasource != undefined && kpiData.kpiValue.kpi_datasource !=""?sentenceCase(kpiData.kpiValue.kpi_datasource):"");
	var kpimeasurement = (kpiData.kpiValue.kpi_measurement != undefined && kpiData.kpiValue.kpi_measurement !=""?sentenceCase(kpiData.kpiValue.kpi_measurement):"");

	// var desc = (kpiData.kpiValue.description ==
	// "NA"?"":kpiData.kpiValue.description);
	
	// $("#kpi_owner").val(kpiData.owner).change();
	if(kpiData.owner	==	""){
		$('.kpi_description_popup #kpi_owner').val(empId);
	}else{
		$('.kpi_description_popup #kpi_owner').val(kpiData.owner);
	}
	$('#kpi_id').val(kpiData.id);
	$('#kpi_display_id').val(kpidisplayId);
	$('#kpi_name').val(kpiData.kpiValue.name)
	$("#kpi_description").val(kpiData.kpiValue.description);
	if(kpiData.kpiFormula.formula != undefined && kpiData.kpiFormula.formula != null){
		$('.kpi_formula').val(kpiData.kpiFormula.formula);
	}else{
		$('.kpi_formula').val(kpiData.kpiValue.ytdFormula);
	}
	$('.kpiYtdFormula').val(kpiData.kpiValue.ytdFormula);
	//$('#kpi_custom_threshold').val(kpiData.kpiValue.thresholdFormula);
	$('#kpiDataType').val(kpiData.kpiValue.dataType);
	if(kpiData.kpiValue.dataType	==	"Currency"){
		$(".kpiCurrencyfield").show();
	}
	$('#kpiCurrencyvalue').val(kpiData.kpiValue.kpiCurrency);
	if(kpiData.kpiValue.thresholdFormula != undefined){
		$('#kpi_performance').val(kpiData.kpiValue.thresholdFormula);
	}
	
	
	
	$('#kpi_type').val(kpiData.kpiValue.kpiType);
	$('#kpi_measurement').val(kpimeasurement);
	$("#kpi_start_end_date").datepicker({
		language: 'en',
		range: true,
		autoClose: true,
		todayButton: false,
		position: "top left",
		onSelect: function (fd) {
			
		}
	});
	$('#kpi_start_end_date').val(kpiData.kpiValue.kpi_start_end_date);
	
	
	$('#kpi_datasource').val(kpidatasource);
	$('#nodekey').val(kpiData.kpiValue.nodekey);
	if(kpiData.kpiValue.weight	!=	"" && kpiData.kpiValue.weight	!=	undefined){
		$('#kpi_weight').val(kpiData.kpiValue.weight);
	}else{
		$('#kpi_weight').val(0);
	}
	
	$('#kpi_sub_weight').val(kpiData.kpiValue.subweight);
	$('#inputState').val(kpistatus);
	$("#kpiFieldName").val(kpiData.kpiFormula.fieldName);
	$("#performanceFieldName").val(kpiData.kpiFormula.performanceFieldName);
	$("#kpiCreatedById").val(kpiData.createdBy);
	var threshold = "Three_Status"
	console.log(controlpanelScorecardSettings)
	if(controlpanelScorecardSettings.threshold && (controlpanelScorecardSettings.threshold === "option_3" || controlpanelScorecardSettings.threshold === "three_status"))
	{
		 threshold = "Three_Status"
	}
	if(controlpanelScorecardSettings.threshold && (controlpanelScorecardSettings.threshold === "option_5" || controlpanelScorecardSettings.threshold === "five_status"))
	{
		threshold = "Five_Status"
	}
	$("#kpi_threshold").val(threshold);
	 if(controlpanelScorecardSettings.threshold && (controlpanelScorecardSettings.threshold === "option_3" || controlpanelScorecardSettings.threshold === "three_status")){
		$(".color_picks_1").css("display","none");
		$(".color_picks_2").css("display","none");
		$(".color_picks_5").css("display","none");

		$(".color_picks_3").css("display","block");

	}else if(controlpanelScorecardSettings.threshold && (controlpanelScorecardSettings.threshold === "option_5" || controlpanelScorecardSettings.threshold === "five_status")){
		$(".color_picks_1").css("display","none");
		$(".color_picks_2").css("display","none");

		$(".color_picks_3").css("display","none");

		$(".color_picks_5").css("display","block");

		var elements = $(".color_picks_5");
		elements.removeClass("col-md-3").addClass("col-md-1");


	}else{
		$(".color_picks_1").css("display","none");
		$(".color_picks_2").css("display","none");
		$(".color_picks_5").css("display","none");

		$(".color_picks_3").css("display","block");
	}
	
	$("#optioncolor1").attr('data-oldvalue',kpiData.kpiValue.optioncolor1).val(kpiData.kpiValue.optioncolor1);
	$("#optioncolor2").attr('data-oldvalue',kpiData.kpiValue.optioncolor2).val(kpiData.kpiValue.optioncolor2);
	$("#optioncolor3").attr('data-oldvalue',kpiData.kpiValue.optioncolor3).val(kpiData.kpiValue.optioncolor3);
	$("#optioncolor4").attr('data-oldvalue',kpiData.kpiValue.optioncolor4).val(kpiData.kpiValue.optioncolor4);
	$("#optioncolor5").attr('data-oldvalue',kpiData.kpiValue.optioncolor5).val(kpiData.kpiValue.optioncolor5);

	
	$("#optioncolor1").next('.input-group-append').children().css('background',kpiData.kpiValue.optioncolor1colorvalue);
	$("#optioncolor2").next('.input-group-append').children().css('background',kpiData.kpiValue.optioncolor2colorvalue);
	
	var firstcolor	=	"";
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.threshold1Color != undefined && controlpanelScorecardSettings.threshold1Color != ""){
		$("#optioncolor1").next('.input-group-append').children().css('background',controlpanelScorecardSettings.threshold1Color);
		firstcolor	=	controlpanelScorecardSettings.threshold1Color;
	}
	
	
	var secondcolor	=	"";
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.threshold2Color != undefined && controlpanelScorecardSettings.threshold2Color != ""){
		$("#optioncolor2").next('.input-group-append').children().css('background',controlpanelScorecardSettings.threshold2Color);
		secondcolor	=	controlpanelScorecardSettings.threshold2Color;
	}
	
	
	//colorEditTrigger($(".pickr1")[1],secondcolor);
	var thirdcolor	=	""
	// $("#optioncolor2").next('.input-group-append').children().toArray().forEach(function(item,index){test(secondcolor,
	// item,index)});
	
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.threshold3Color != undefined && controlpanelScorecardSettings.threshold3Color != ""){
		$("#optioncolor3").next('.input-group-append').children().css('background',controlpanelScorecardSettings.threshold3Color);
		thirdcolor	=	controlpanelScorecardSettings.threshold3Color;
	}


	//colorEditTrigger($(".pickr1")[1],secondcolor);
	var fourthcolor	=	""
	// $("#optioncolor2").next('.input-group-append').children().toArray().forEach(function(item,index){test(secondcolor,
	// item,index)});
	
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.threshold4Color != undefined && controlpanelScorecardSettings.threshold4Color != ""){
		$("#optioncolor4").next('.input-group-append').children().css('background',controlpanelScorecardSettings.threshold4Color);
		fourthcolor	=	controlpanelScorecardSettings.threshold4Color;
	}


	//colorEditTrigger($(".pickr1")[1],secondcolor);
	var fifthcolor	=	""
	// $("#optioncolor2").next('.input-group-append').children().toArray().forEach(function(item,index){test(secondcolor,
	// item,index)});
	
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.threshold5Color != undefined && controlpanelScorecardSettings.threshold5Color != ""){
		$("#optioncolor5").next('.input-group-append').children().css('background',controlpanelScorecardSettings.threshold5Color);
		fifthcolor	=	controlpanelScorecardSettings.threshold5Color;
	}
		
	
	
	if(kpiData.kpiValue.customthresholdenable != undefined && kpiData.kpiValue.customthresholdenable == true){
		$('#chk_custom_threshold').prop('checked', true);
	}
		
	for (var i = 1; i <= 4; i++) {
		var header = kpiData.kpiValue['header' + i];
		$('#kpiForm input[value=' + header + ']').prop('checked', true);
	}
	
	/*
	 * var readTargetAmount = intergerHumanFormat(kpiData.kpiValue.target); var
	 * readTargetAmount = kpiData.kpiValue.target; var kpiTarget =
	 * (kpiData.kpiValue.targetCurrency == undefined ||
	 * kpiData.kpiValue.targetCurrency ==
	 * ""?readTargetAmount:kpiData.kpiValue.targetCurrency+readTargetAmount);
	 */
	
	var numberchartTarget	=	splitnumbercharacter(kpiData.kpiValue.target);
	var kpiTarget	=	"";
	if(typeof(numberchartTarget['number'])	===	"number"){
		numberchartTarget['number']	=	convertInttoStringAndStringtoInt(numberchartTarget['number']);	
	}
	var targetcurrency	=	(kpiData.kpiValue.targetCurrency != undefined && kpiData.kpiValue.targetCurrency != ""?kpiData.kpiValue.targetCurrency:"");
	kpiTarget		=	targetcurrency+numberchartTarget['firstletter']+formatNumber(numberchartTarget['number'])+numberchartTarget['lastletter'];

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
	if(kpiData.includeReportee != null && kpiData.includeReportee != undefined){
	$("#includeReportees").val(kpiData.includeReportee);
	}
	if(kpiData.customReportees != null && kpiData.customReportees != undefined){
	$("#customreportee").val(kpiData.customReportees);
	}
	
		
	$.ajax({
		url : "/stratroom/retrieveNodeKeyList",
		success : function(nodekeylist) {
			$.each(nodekeylist, function(index, nodekey) {
				if(measureFieldenable	==	false){
					if(nodekey.measureType	==	0){
						addOption('#nodekey', nodekey.measureName, nodekey.nodeKey)
					}
				}else if(measureFieldenable	==	true){
					addOption('#nodekey', nodekey.measureName, nodekey.nodeKey)
				}
			});
			if(kpiData.kpiFormula.elementName !=	""){
				$('#nodekey').val(kpiData.kpiFormula.elementName);
			}
		}
	});
}

function colorcodevalue(colorvalue){
	var color	=	"#000000";
	if(colorvalue !=	"" && colorvalue !=	undefined){
        	var colorstartposition	=	colorvalue.indexOf("rgb");
        	var colorendposition	=	colorvalue.indexOf(")")+1;
        	if(colorstartposition !=	-1 && colorendposition !=	-1){
        		color	=	colorvalue.substr(colorstartposition,colorendposition);
        	}else{
        		color	=	colorvalue;
        	}
        }
	return color;
}

function getKpiObj(action){

	var arr = $.map(reporteelist, function(obj, i) {
		return obj.id;
	});
	
	var thresholdupdateflag	=	false;
	if(action == "edit"){
		var option1emlemt	=	$("#optioncolor1");
		var option2emlemt	=	$("#optioncolor2");
		var option3emlemt	= 	$("#optioncolor3");
		var option4emlemt	= 	$("#optioncolor4");
		var option5emlemt	= 	$("#optioncolor5");

		if($(option1emlemt).attr("data-oldvalue") !=	$(option1emlemt).val() || $(option2emlemt).attr("data-oldvalue") !=	$(option2emlemt).val() || $(option3emlemt).attr("data-oldvalue") !=	$(option3emlemt).val() || $(option4emlemt).attr("data-oldvalue") !=	$(option4emlemt).val() || $(option5emlemt).attr("data-oldvalue") !=	$(option5emlemt).val()){
			thresholdupdateflag	=	true;
		}
	}
	
	var kpiThresholdvalue 	=	$("#kpi_threshold").val();
	var kpiObj = {
		"owner" : $("#kpi_owner").val(),
		"objectiveId" : $("#kpiForm input[name='objectiveId']").val(),
		"createdBy" : $("#kpiCreatedById").val(),
		"kpiId" : $("#kpi_display_id").val(),
		"thresholdvalueupdate":thresholdupdateflag,
		"kpiFormula" : {
			"formula" : $(".kpi_formula").val(),
			//"empployeeIds" : arr,
		//	"period" : $("#datePeriod").val(),
			"fieldName" : $("#kpiFieldName").val(),
		},
		"performanceFormula" : {
			"formula" : $("#kpi_performance").val(),
	//		"empployeeIds" : arr,
	//		"period" : $("#datePeriod").val(),
			"fieldName" : $("#performanceFieldName").val(),
		},
		"kpiValue" : {
			"kpiId" : $("#kpi_id").val(),
			"name" : $("#kpi_name").val(),
			"description" : $("#kpi_description").val(),
			"kpiType" : $("#kpi_type").val(),
			"kpi_measurement" : $("#kpi_measurement").val(),
			"kpi_datasource" : $("#kpi_datasource").val(),
			"kpi_start_end_date" : $("#kpi_start_end_date").val(),
			"weight" : $("#kpi_weight").val(),
			"subweight" : $("#kpi_sub_weight").val(),
			"target" : "",//$("#targetamount").val(),
			"thresholdFormula": $("#kpi_performance").val(),
			"targetCurrency" : "",
			"status" : $("#inputState").val(),
			"dataType" : $("#kpiDataType").val(),
			"kpiCurrency" : $("#kpiCurrencyvalue").val(),
			"ytdFormula": $(".kpiYtdFormula").val(),
			"threshold":kpiThresholdvalue,
			"optioncolor1":$("#optioncolor1").val(),
			"optioncolor2":$("#optioncolor2").val(),
			"optioncolor3":$("#optioncolor3").val(),
			"optioncolor4":$("#optioncolor4").val(),
			"optioncolor5":$("#optioncolor5").val(),
			"target":"0"
			// "target":$("#kpiTarget").val()
		}
	}
	// kpiObj.kpiValue['optioncolor1colorvalue'] =
	// colorcodevalue($("#optioncolor1").next('.input-group-append').children().css('background-color'));
	if(controlpanelScorecardSettings.threshold && (controlpanelScorecardSettings.threshold === "option_3" || controlpanelScorecardSettings.threshold === "three_status")){
		kpiObj.kpiValue['optioncolor1colorvalue']	=	$("#optioncolor1").next('.input-group-append').children().css('background-color');
		kpiObj.kpiValue['optioncolor2colorvalue']	=	$("#optioncolor2").next('.input-group-append').children().css('background-color');
		kpiObj.kpiValue['optioncolor3colorvalue']	=	$("#optioncolor3").next('.input-group-append').children().css('background-color');
	}	else if(controlpanelScorecardSettings.threshold && (controlpanelScorecardSettings.threshold === "option_5" || controlpanelScorecardSettings.threshold === "five_status")){
		kpiObj.kpiValue['optioncolor1colorvalue']	=	$("#optioncolor1").next('.input-group-append').children().css('background-color');
		kpiObj.kpiValue['optioncolor2colorvalue']	=	$("#optioncolor2").next('.input-group-append').children().css('background-color');
		kpiObj.kpiValue['optioncolor3colorvalue']	=	$("#optioncolor3").next('.input-group-append').children().css('background-color');
		kpiObj.kpiValue['optioncolor4colorvalue']	=	$("#optioncolor4").next('.input-group-append').children().css('background-color');
		kpiObj.kpiValue['optioncolor5colorvalue']	=	$("#optioncolor5").next('.input-group-append').children().css('background-color');
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
	})*/;
	
	kpiObj.kpiValue['customthresholdenable'] 	= 	false;
	
	if($("#chk_custom_threshold").is(":checked") == true){
		kpiObj.kpiValue['customthresholdenable'] 	= 	true;
	}
	
	
	var existdatadonotupdate 	=	["kpiId","name","description","kpiType","kpi_measurement","kpi_datasource","kpi_start_end_date","weight","subweight","target","thresholdFormula","status","dataType","kpiCurrency","ytdFormula","threshold","optioncolor1",
		"optioncolor2","optioncolor3","optioncolor4","optioncolor5","header1","header2","header3","header4","customthresholdenable","optioncolor1colorvalue","optioncolor2colorvalue","optioncolor1colorvalue","optioncolor2colorvalue","optioncolor3colorvalue","optioncolor1colorvalue","optioncolor2colorvalue","optioncolor3colorvalue","optioncolor4colorvalue","optioncolor5colorvalue"];
	if(action == "edit" && (parentKpidetails !== undefined || parentKpidetails != "")){
		// KpiObj["id"] = $("#kpi_id").val();
		// KpiObj["objectiveId"] = parentKpidetails.objectiveId;
		$.each(parentKpidetails.kpiValue,function(index,value){
			if($.inArray(index,existdatadonotupdate) == -1){
				kpiObj["kpiValue"][index]	=	value;
			}
		});
		
		// KpiObj["kpiFormula"] = parentKpidetails.kpiFormula;
	}
	
	return kpiObj;
}

function handleKpiSave() {
	var action = $("#kpiForm input[name='action']").val();
	if (action == 'delete') {

	} else {
		var kpiObj = getKpiObj(action);
		var methodType = 'post';
		if (action == 'add') {
			kpiObj.includeReportee = false;
			kpiObj.customReportees = $("#customreportee").val();
			
		} else if (action == 'edit') {
			kpiObj.id = $("#kpi_id").val();
			kpiObj.includeReportee = $("#includeReportees").val();
			kpiObj.customReportees = $("#customreportee").val();
			
			methodType = 'put';
		}
		
		var numberformatResult	=	specialcharsconvertToNumberFormat(kpiObj.kpiValue.target);
		kpiObj["kpiValue"]["target"]	=	numberformatResult['number'];	
		kpiObj["kpiValue"]["targetCurrency"]	=	numberformatResult['currency'];
		
		if(kpiObj.kpiValue.actual !=	undefined && kpiObj.kpiValue.actual	!=	""){
			var numberformatResult	=	specialcharsconvertToNumberFormat(kpiObj.kpiValue.actual);
			kpiObj["kpiValue"]["actual"]	=	numberformatResult['number'];	
			kpiObj["kpiValue"]["actualCurrency"]	=	numberformatResult['currency'];
		}
		
		if(kpiObj.kpiValue.gap !=	undefined && kpiObj.kpiValue.gap	!=	""){
			var numberformatResult	=	specialcharsconvertToNumberFormat(kpiObj.kpiValue.gap);
			kpiObj["kpiValue"]["gap"]	=	numberformatResult['number'];	
			kpiObj["kpiValue"]["gapCurrency"]	=	numberformatResult['currency'];
		}
		
		$.ajax({
			url : "/stratroom/kpi/",
			type : methodType,
			contentType : "application/json",
			data : JSON.stringify(kpiObj),
			success : function(data, status) {
				$("#closeKpimodal").click();
				location.reload(true);
				console.log("New KPI was created..");
			}
		});
	}
}

function handleFormulaValidate(component) {
	validateFormula("Validate",component);
}

function validateFormula(inputType, component){
	var formulaValue;
	if(component == "KPI"){
		formulaValue = $("#formula").val();	
	}else if(component == "YTD"){
		formulaValue = $("#customYtdformula").val();
	}else if(component == "OBJECTIVE"){
		formulaValue = $("#formulaCustomObjective").val();
	}else if(component == "PERSPECTIVE"){
		formulaValue = $("#formulaCustomPerspective").val();
	}else if(component == "SCORECARDCONFIG"){
		formulaValue = $("#formulaScoreCardPerspective").val();
	}else if(component == "KPIPERFORMANCE"){
		formulaValue = $("#performanceformula").val();
	}else{
		formulaValue = $("#thresholdformula").val();	
	}
	var formulaJson = {
			"formula" : formulaValue,
			 "type":component
			
		}
	$.ajax({
		url : "/stratroom/validateFormula/",
		type : 'post',
		contentType : "application/json",
		data : JSON.stringify(formulaJson),
		success : function(data, message) {
			if(data != "valid"){
				if(component == "KPI"){
					$("#formula").val(formulaValue);
					$("#formula").css("border","2px solid red");
				}else if(component == "YTD"){
					$("#customYtdformula").val(formulaValue);
					$("#customYtdformula").css("border","2px solid red");
				}else if(component == "OBJECTIVE"){
					$("#formulaCustomObjective").val(formulaValue);
					$("#formulaCustomObjective").css("border","2px solid red");
				}else if(component == "PERSPECTIVE"){
					$("#formulaCustomPerspective").val(formulaValue);
					$("#formulaCustomPerspective").css("border","2px solid red");
				}else if(component == "SCORECARDCONFIG"){
					$("#formulaScoreCardPerspective").val(formulaValue);
					$("#formulaScoreCardPerspective").css("border","2px solid red");
				}else if(component == "KPIPERFORMANCE"){
					$("#performanceformula").val(formulaValue);
					$("#performanceformula").css("border","2px solid red");   
				}else {
					$("#thresholdformula").val(formulaValue);
					$("#thresholdformula").css("border","2px solid red");
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
				
			} else{
				if(inputType == "Validate"){
					if(component == "KPI"){
						$("#formula").val(formulaValue);
						$("#formula").css("border","2px solid green");
					}else if(component == "YTD"){
						$("#customYtdformula").val(formulaValue);
						$("#customYtdformula").css("border","2px solid green");
					}else if(component == "OBJECTIVE"){
						$("#formulaCustomObjective").val(formulaValue);
						$("#formulaCustomObjective").css("border","2px solid green");
					}else if(component == "PERSPECTIVE"){
						$("#formulaCustomPerspective").val(formulaValue);
						$("#formulaCustomPerspective").css("border","2px solid green");
					}else if(component == "SCORECARDCONFIG"){
						$("#formulaScoreCardPerspective").val(formulaValue);
						$("#formulaScoreCardPerspective").css("border","2px solid green");
					}else if(component == "KPIPERFORMANCE"){
						$("#performanceformula").val(formulaValue);
						$("#performanceformula").css("border","2px solid green");
						
					}else{
						$("#thresholdformula").val(formulaValue);
						$("#thresholdformula").css("border","2px solid green");
					}
				
				}else{
					if(component == "KPI"){
					$(".kpi_formula").val("");
					$(".kpi_formula").val(formulaValue);
					$("#kpiFieldName").val($("#fieldId").val());
					$("#closePopupId").click();
					}else if(component == "YTD"){
						$(".kpiYtdFormula").val("");
						$(".kpiYtdFormula").val(formulaValue);
						$("#ytdClosePopupId").click();
					}else if(component == "OBJECTIVE"){
						$("#custom_objective").val("");
						$("#custom_objective").val(formulaValue);
						$("#objectiveClosePopupId").click();
					}else if(component == "PERSPECTIVE"){
						$("#custom_perspective").val("");
						$("#custom_perspective").val(formulaValue);
						$("#perspectiveClosePopupId").click();
					}else if(component == "SCORECARDCONFIG"){
						$("#scorecard_formula").val("");
						$("#scorecard_formula").val(formulaValue);
						$("#scorecardClosePopupId").click();
					}else if(component == "KPIPERFORMANCE"){
						$("#kpi_performance").val("");
						$("#kpi_performance").val(formulaValue);
						$("#performanceFieldName").val($("#performancefieldId").val());
						$("#kpiperclosePopupId").click();
					}else{
						$("#kpi_performance").val("");
						$("#kpi_performance").val(formulaValue);
						$("#threClosePopupId").click();
					}
				}
			}
		}
	});
}

$(document).on("focusout","#formula",function(){
    $(this).css("border","1px solid black");
});

$(document).on("focusout","#customYtdformula",function(){
    $(this).css("border","1px solid black");
});

$(document).on("focusout","#thresholdformula",function(){
    $(this).css("border","1px solid black");
});

$(document).on("focusout","#performanceformula",function(){
    $(this).css("border","1px solid black");
});

function checkmodalisclosedornot(){
	
	if($('.kpi_description_popup').is(':visible')	==	true){
		$(document.body).addClass('modal-open');				
	}
	if($('.kpi_formula_popup').is(':visible')	==	false){
		$(document.body).addClass('modal-open');				
	}
	if($('.kpi_custom_threshold_popup').is(':visible')	==	false){
		$(document.body).addClass('modal-open');				
	}
	if($('.scorecard_custom_threshold_popup').is(':visible')	==	false){
		$(document.body).addClass('modal-open');				
	}
	if($('.perspectives_description_popup').is(':visible')	==	false){
		$(document.body).addClass('modal-open');				
	}
	if($('.objective_description_popup').is(':visible')	==	false){
		$(document.body).addClass('modal-open');				
	}
	if($('.kpi_performanceformula_popup').is(':visible')	==	false){
		$(document.body).addClass('modal-open');				
	}
	if($('.kpiYtdFormulaPoPUp').is(':visible')	==	false){
		$(document.body).addClass('modal-open');				
	}
	
	
	setTimeout(function(){  $(document.body).addClass('modal-open');
	}, 1000);
	
}
					
$("#closePopupId,#kpiperclosePopupId").click(function(){
	checkmodalisclosedornot();
});

$("#threClosePopupId,#ytdClosePopupId,#perspectiveClosePopupId,#objectiveClosePopupId,#scorecardClosePopupId").click(function(){
	checkmodalisclosedornot();
});

function handleFormulaAdd(component) {
	validateFormula("Add",component);
}

function handleFormulaEvent(component) {
	if(component	==	"KPI"){
		$("#fieldmeasurefilter,#fieldsubmeasurefilter,#fieldinitiativefilter").val('');
		$(".formulacontentdesc").html(getformulabuilder('if'));
		$(".formulaheaderdesc").html('if'.toUpperCase());
		$("#measureNames,#kpisubmeasureNames,#kpiinitiativeNames").empty();
		$("#formula").css("border","1px solid black");
		var getkpiformulaval	=	$(".kpi_formula").val();
		$(".custom-tab-kpiformula .btn-custom-secondary:eq(1)").hide()
		if(measureFieldenable	==	true){
			$(".custom-tab-kpiformula .btn-custom-secondary:eq(1)").show()
		}
	
		$("#formula").val(getkpiformulaval);
		$.ajax({
			url : "/stratroom/retrieveNodeKeyList",
			success : function(nodekeylist) {
				$.each(nodekeylist, function(index, nodekey) {
					console.log(nodekey,"node key...");
					console.log(measureFieldenable,"measureFieldenable")
					var highlight		=	"";	
  					if(getkpiformulaval !=	"" && getkpiformulaval.search(nodekey.measureName) !=	-1){
  						highlight	=	"kpiformuladescHighlight";
  					}
					
  					if(nodekey.measureType	==	0){
						addList('#measureNames', nodekey.measureName, nodekey.nodeKey,highlight,'main')
					}
  					if(measureFieldenable	==	true && nodekey.measureType	==	1){main
  						addList('#kpisubmeasureNames', nodekey.measureName, nodekey.nodeKey,highlight,'sub')
  					}
					if(nodekey.measureType	==	0){
						addList('#kpiinitiativeNames', nodekey.measureName, nodekey.nodeKey,highlight,'main')
					}
				});
			}
		});
			
		$('.kpi_formula_popup').on('shown.bs.modal', function () {
		    $('#formula').focus();
		});
	}else if(component	==	"KPIPERFORMANCE"){
		$("#Performancefieldmeasurefilter").val('');
		$(".formulacontentdesc").html(getformulaperformance('if'));
		$(".formulaheaderdesc").html('if'.toUpperCase());
		$("#PerformancemeasureNames").empty();
		$("#performanceformula").css("border","1px solid black");
		$("#performanceformula").on("keypress", function(evt) {
			  var keycode = evt.charCode || evt.keyCode;
			  if (keycode == 46) {
			    return false;
			  }	
		});
		var getkpiformulaval	=	$("#kpi_performance").val();
		$("#performanceformula").val(getkpiformulaval);
		var actualhighlight		=	"";	
		if(getkpiformulaval !=	"" && (getkpiformulaval.search('Actual') !=	-1 || getkpiformulaval.search('ACTUAL') !=	-1)){
			actualhighlight	=	"kpiformuladescHighlight";
		}
		var targethighlight		=	"";	
		if(getkpiformulaval !=	"" && (getkpiformulaval.search('Target') !=	-1 || getkpiformulaval.search('TARGET') !=	-1)){
			targethighlight	=	"kpiformuladescHighlight";
		}
		var weighthighlight		=	"";	
		if(getkpiformulaval !=	"" && (getkpiformulaval.search('Weight') !=	-1 || getkpiformulaval.search('WEIGHT') !=	-1)){
			weighthighlight	=	"kpiformuladescHighlight";
		}
		$("#PerformancemeasureNames").append(`<li class="list-group-item `+actualhighlight+`" onclick="updatePerformance('Actual','',this)">Actual</li>`);
		$("#PerformancemeasureNames").append(`<li class="list-group-item `+targethighlight+`" onclick="updatePerformance('Target','',this)">Target</li>`);
		$("#PerformancemeasureNames").append(`<li class="list-group-item `+weighthighlight+`" onclick="updatePerformance('Weight','',this)">Weight</li>`);
		$('.kpi_performanceformula_popup').on('shown.bs.modal', function () {
		    $('#performanceformula').focus();
		});
	}
}

function handleCustomThresholdEvent(component) {
	if(component == "OBJECTIVE"){
		$("#objectivecustomfieldmeasurefilter").val('');
		$(".formulacontentdesc").html(getformulabuilder('if'));
		$(".formulaheaderdesc").html('if'.toUpperCase());
		var formulaVal	=	$("#custom_objective").val();
		$("#formulaCustomObjective").css("border","1px solid black");
		$("#formulaCustomObjective").val(formulaVal);
		$("#objectiveMeasureNames").empty();
		
			$.ajax({
				url : "/stratroom/measureNames/"+$("#objective_id").val()+"?component=OBJECTIVE",
				success : function(nodekeylist) {
					$.each(nodekeylist, function(index, nodekey) {
            var highlight		=	"";	
            if(formulaVal !=	"" && formulaVal.search(index) !=	-1){
  						highlight	=	"kpiformuladescHighlight";
  					}
            		
						$("#objectiveMeasureNames")
					.append(
							`<li class="list-group-item `+highlight+`" data-value="${index}" onclick="updateCustomObjective('${index}','',this)">${nodekeylist[index]}</li>`);
					});
				}
			});
		$('.objective_custom_threshold_popup').on('shown.bs.modal', function () {
		    $('#formulaCustomObjective').focus();
		});
	}else if(component == "PERSPECTIVE"){
		$("#perspectivefieldmeasurefilter").val('');
		$(".formulacontentdesc").html(getformulabuilder('if'));
		$(".formulaheaderdesc").html('if'.toUpperCase());
		var formulaVal	=	$("#custom_perspective").val();
		$("#formulaCustomPerspective").css("border","1px solid black");
		$("#formulaCustomPerspective").on("keypress", function(evt) {
			  var keycode = evt.charCode || evt.keyCode;
			  if (keycode == 46) {
			    return false;
			  }	
		});
		$("#formulaCustomPerspective").val(formulaVal);
		$("#perspectiveMeasureNames").empty();
			
			$.ajax({
				url : "/stratroom/measureNames/"+$("#perspectiveId").val()+"?component=PERSPECTIVE",
				success : function(nodekeylist) {
					$.each(nodekeylist, function(index, nodekey) {
              					var highlight		=	"";	
					if(formulaVal !=	"" && formulaVal.search(index) !=	-1){
						highlight	=	"kpiformuladescHighlight";
					}
					$("#perspectiveMeasureNames")
					.append(
							`<li class="list-group-item `+highlight+`" data-value="${index}" onclick="updateCustomPerspective('${index}','',this)">${nodekeylist[index]}</li>`);
					});
				}
			});
		$('.perspective_custom_threshold_popup').on('shown.bs.modal', function () {
		    $('#formulaCustomPerspective').focus();
		});
	}else if(component == "SCORECARDCONFIG"){
		$("#scoreCardmeasurefilter").val('');
		$(".formulacontentdesc").html(getformulaperformance('if'));
		$(".formulaheaderdesc").html('if'.toUpperCase());
		var formulaVal	=	$("#scorecard_formula").val();
		$("#formulaScoreCardPerspective").css("border","1px solid black");
		$("#formulaScoreCardPerspective").val(formulaVal);
		$("#scorecardMeasureNames").empty();
		
			$.ajax({
				url : "/stratroom/measureNames/"+$("#pagenumber").val()+"?component=SCORECARDCONFIG",
				success : function(nodekeylist) {
					$.each(nodekeylist, function(index, nodekey) {
              var highlight		=	"";	
					if(formulaVal !=	"" && formulaVal.search(nodekeylist[index]) !=	-1){
						highlight	=	"kpiformuladescHighlight";
					}
					$("#scorecardMeasureNames")
					.append(
							`<li class="list-group-item `+highlight+`" onclick="updateScorecardPerspective('${index}','',this)">${nodekeylist[index]}</li>`);
					});
				}
			});
		
		$('.scorecard_custom_threshold_popup').on('shown.bs.modal', function () {
		    $('#formulaScoreCardPerspective').focus();
		});
	}else{
		var getkpiformulaval	=	$("#kpi_performance").val();
		$("#thresholdformula").css("border","1px solid black");
		$("#thresholdformula").val(getkpiformulaval);
		$('.kpi_custom_threshold_popup').on('shown.bs.modal', function () {
		    $('#thresholdformula').focus();
		});
		
	}
}

function updateScorecardPerspective(input,formuladesc,currentElement) {
	if(formuladesc !=	"" && formuladesc !=	null){
		if($(".formuladynamicdesc").css("display")	==	"none"){
			$(".formuladynamicdesc").show();
		}
		$(".formulacontentdesc").html(getformulaperformance(formuladesc));
		$(".formulaheaderdesc").html(input.toUpperCase());
	}
	
	var box = $("#formulaScoreCardPerspective");
	var mesaureName = input;
	var formulaval	=	box.val();
	var checkdefaultvalue	=	false;
	var finalval	=	formulaval + mesaureName;
	if($(currentElement).hasClass("kpiformuladescHighlight")){
		if(formulaval !=	"" && formulaval.lastIndexOf(mesaureName) !=	-1){
			var splitmeasure	=	formulaval.lastIndexOf(mesaureName);
			var removestr		=	mesaureName.length;
			var remaingingstr	=	splitmeasure+removestr;
			$(currentElement).removeClass("kpiformuladescHighlight");
			box.val(formulaval.slice(0, splitmeasure)  + formulaval.slice(remaingingstr));
			document.getElementById("formulaScoreCardPerspective").setSelectionRange(splitmeasure,splitmeasure);
		}
	}else{
		var curPos 	= 	document.getElementById("formulaScoreCardPerspective").selectionStart;
		var lastpos	=	parseInt(formulaval.slice(0, curPos).length+mesaureName.length);
	    box.val(formulaval.slice(0, curPos) + mesaureName + formulaval.slice(curPos));
	    document.getElementById("formulaScoreCardPerspective").setSelectionRange(lastpos,lastpos);
	    $(currentElement).addClass("kpiformuladescHighlight");
	}
	// box.val(finalval);
}

function handleYTDFormulaEvent() {
	$("#ytdFieldmeasurefilter,#ytdFieldsubmeasurefilter").val('');
	$(".formulacontentdesc").html(getformulabuilder('if'));
	$(".formulaheaderdesc").html('if'.toUpperCase());
	var getkpiformulaval	=	$(".kpiYtdFormula").val();
	$("#customYtdformula").val(getkpiformulaval);
	$("#customYtdformula").css("border","1px solid black");
	$("#ytdMeasureNames,#ytdsubMeasureNames").empty();
	$(".custom-tab-ytdkpiformula .btn-custom-secondary:eq(1)").hide();
	if(measureFieldenable	==	true){
		$(".custom-tab-ytdkpiformula .btn-custom-secondary:eq(1)").show();
	}
	
	$.ajax({
		url : "/stratroom/retrieveNodeKeyList",
		success : function(nodekeylist) {
			$.each(nodekeylist, function(index, nodekey) {
      			var highlight		=	"";	
				if(getkpiformulaval !=	"" && getkpiformulaval.search(nodekey.measureName) !=	-1){
					highlight	=	"kpiformuladescHighlight";
				}
				if(nodekey.measureType	==	0){
					addToYTDList('#ytdMeasureNames', nodekey.measureName, nodekey.nodeKey,highlight,'main')
				}
				if(measureFieldenable	==	true && nodekey.measureType	==	1){
					addToYTDList('#ytdsubMeasureNames', nodekey.measureName, nodekey.nodeKey,highlight,'sub')
				}
				
			});
		}
	});
	
	
	$('.kpiYtdFormulaPoPUp').on('shown.bs.modal', function () {
	    $('#customYtdformula').focus();
	});
}

function handleKpiEvent(id, action, objectiveId) {
	
	$("#kpiForm").css('display', 'none');
	$("#kpiForm").trigger('reset');
	populatekpiOwnerDropdownScorecard('.kpi_description_popup #kpi_owner','.kpi_description_popup');
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
	
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.yearToDate != undefined && controlpanelScorecardSettings.yearToDate != true){
		$(".kpiytdElement").hide();
	}
	
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.customPerformance != undefined && controlpanelScorecardSettings.customPerformance == true){
		if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.customKPI != undefined && controlpanelScorecardSettings.customKPI != true){
			$(".kpiperformanceElement").hide();
		}
	}else{
		$(".kpiperformanceElement").hide();
	}
	
	/*
	 * var daterange2 = $('#datePeriod').val(); var startdate = new Date(); var
	 * enddate = new Date(); if (daterange2.includes("-")) { var dateval =
	 * daterange2.split('-'); startdate = new Date(dateval[0]); enddate = new
	 * Date(dateval[1]); }
	 */
	
	$("#kpi_start_end_date").datepicker({
		language: 'en',
		// minDate: startdate,
		// maxDate: enddate,
		range: true,
		autoClose: true,
		todayButton: false,
		position: "top left",
		onSelect: function (fd) {
			
		}
	});
	
	if (action == 'delete') {
		$("#deletescoreid").val(id);
		$("#deleterecordtype").val("scorecardkpi");
		$('#deleteModalscorecard').modal('toggle');
		$(window).on("resize", function(){
		    $(".modal:visible").each(alignModal);
		}); 
		$(".modal").on("shown.bs.modal", alignModal);
	} else if (action == 'add') {
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
		
		$('.kpi_description_popup').modal('toggle');
		$("#kpiCreatedBy").html("");
		$("#kpiCreatedByDate").html("");
		$("#kpiUpdatedBy").html("");
		$("#kpiUpdatedByDate").html("");
		$("#kpi_owner").val("");
		//$("#kpi_id_wrapper").show(); // Hide the ID input
		// when adding
		$('#kpiForm *').prop("disabled", false);
		$("#kpiForm").css('display', 'block');
		$.each($("[class*=color_picks_]"),function(){
			$(this).css("display","none");
		});
		$('.color_picks_2').css("display","block");
		
		if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.performance !=	undefined && controlpanelScorecardSettings.performance ==	true){
			if(controlpanelScorecardSettings.threshold1Color != undefined && controlpanelScorecardSettings.threshold1Color != ""){
				$("#optioncolor1").next('.input-group-append').children().css('background',controlpanelScorecardSettings.threshold1Color);
			}
			if(controlpanelScorecardSettings.threshold0_2Color != undefined && controlpanelScorecardSettings.threshold0_2Color != ""){
				$("#optioncolor2").next('.input-group-append').children().css('background',controlpanelScorecardSettings.threshold0_2Color);
			}
			if(controlpanelScorecardSettings.threshold0_3Color != undefined && controlpanelScorecardSettings.threshold0_3Color != ""){
				$("#optioncolor3").next('.input-group-append').children().css('background',controlpanelScorecardSettings.threshold0_3Color);
			}
			
			if(controlpanelScorecardSettings.threshold0_4Color != undefined && controlpanelScorecardSettings.threshold0_4Color != ""){
				$("#optioncolor4").next('.input-group-append').children().css('background',controlpanelScorecardSettings.threshold0_4Color);
			}
			
			if(controlpanelScorecardSettings.threshold0_5Color != undefined && controlpanelScorecardSettings.threshold0_5Color != ""){
				$("#optioncolor5").next('.input-group-append').children().css('background',controlpanelScorecardSettings.threshold0_5Color);
			}
			
			
		}
		
		if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined &&  controlpanelScorecardSettings.customPerformance !=	undefined &&  controlpanelScorecardSettings.customPerformance == true){
			if(controlpanelScorecardSettings.threshold1Color != undefined && controlpanelScorecardSettings.threshold1Color != ""){
				$("#optioncolor1").next('.input-group-append').children().css('background',controlpanelScorecardSettings.threshold1Color);
			}
			if(controlpanelScorecardSettings.threshold2Color != undefined && controlpanelScorecardSettings.threshold2Color != ""){
				$("#optioncolor2").next('.input-group-append').children().css('background',controlpanelScorecardSettings.threshold2Color);
			}
			if(controlpanelScorecardSettings.threshold3Color != undefined && controlpanelScorecardSettings.threshold3Color != ""){
				$("#optioncolor3").next('.input-group-append').children().css('background',controlpanelScorecardSettings.threshold3Color);
			}

			if(controlpanelScorecardSettings.threshold4Color != undefined && controlpanelScorecardSettings.threshold4Color != ""){
				$("#optioncolor4").next('.input-group-append').children().css('background',controlpanelScorecardSettings.threshold4Color);
			}
			if(controlpanelScorecardSettings.threshold5Color != undefined && controlpanelScorecardSettings.threshold5Color != ""){
				$("#optioncolor5").next('.input-group-append').children().css('background',controlpanelScorecardSettings.threshold5Color);
			}
			
		
		}
		
		$('#kpiForm button[value="Save"]').css('display', 'inline-block');
		$('.kpi_description_popup #kpi_owner').val(empId);
		
		$.ajax({
			url : "/stratroom/retrieveNodeKeyList",
			success : function(nodekeylist) {
				$.each(nodekeylist, function(index, nodekey) {
					if(measureFieldenable	==	false){
						if(nodekey.measureType	==	0){
							addOption('#nodekey', nodekey.measureName, nodekey.nodeKey)
						}
					}else if(measureFieldenable	==	true){
						addOption('#nodekey', nodekey.measureName, nodekey.nodeKey)
					}
				});

				//$('#nodekey').val(kpiData.kpiFormula.elementName);
			}
		});
	} else { // view and edit
		$('.kpi_description_popup').modal('toggle');
		$("#kpi_id_wrapper").css('display', 'block');
		$('#kpiForm *').prop("disabled", false);
		// $('#kpiForm button').css('display', 'block');
		$('.kpi_description_popup #kpi_display_id').prop("disabled", true);
		$('#kpiForm button[value="Save"]').css('display', 'inline-block');
		if (action == 'view') {
			$('#kpiForm *').prop("disabled", true);
			$('#kpiForm button').prop("disabled", false);
			$('#kpiForm button[value="Save"]').css('display', 'none');
		}
		/*$("#optioncolor1").next('.input-group-append').children().removeClass('pickr');
		$("#optioncolor1").next('.input-group-append').children().addClass('pickr1');
		$("#optioncolor2").next('.input-group-append').children().removeClass('pickr');
		$("#optioncolor2").next('.input-group-append').children().addClass('pickr1');
		$("#optioncolor3").next('.input-group-append').children().removeClass('pickr');
		$("#optioncolor3").next('.input-group-append').children().addClass('pickr1');*/
		$.ajax({
			url : "/stratroom/kpi/" + id,
			success : kpiSuccessCallback
		});
	}
}

function handlescoreeventdelete(){

	var id	=	$("#deletescoreid").val();
	var type=	$("#deleterecordtype").val();
	
	if(id	==	"" || type	==	""){
		return false;
	}
	var requestmethod	=	"delete";
	var url	=	"";
	if(type	==	"scorecardkpi"){
		
		url	=	"/stratroom/kpi/" + id;
		
	}else if(type	==	"scorecardperspective"){
	
		url	=	"/stratroom/scorecard/" + id;
		requestmethod	=	"get";
	}else if(type	==	"scorecardobjective"){
		url	=	"/stratroom/objectives/" + id;
	}
	
	$.ajax({
		url : url,
		type : requestmethod,
		contentType : "application/json",
		success : function(data, status) {
			if(type	==	"scorecardperspective"){
				if(data.scoreCardValue !=	undefined){
					$("#perspectiveForm input[name='defaultscr']").val(data.scoreCardValue.defaultscr);
					var defaultscr = $("#perspectiveForm input[name='defaultscr']").val();
					if (defaultscr == "true") {
						alert("Default ScoreCard Template cannot be deleted");
						
					}
						else {
						$("#perspectiveMeasureNames").empty();
						
					
						
						var methodType = 'delete'
							
							
							
						$.ajax({
							url : "/stratroom/scorecard/" + id,
							type : methodType,
							contentType : "application/json",
							success : function(data, status) {
								location.reload(true);
								console.log("Scorecard was deleted");
							}
						});
					}
				
				}
			}
			location.reload(true);
		},
		error : readErrorMsg
	});
}

function objectivesSuccessCallback(objectiveData) {
	$("#objectiveForm").css('display', 'block');

	$("#objective_id").val(objectiveData.id);
	$("#objective_display_id").val(objectiveData.objectiveId);
	$("#objective_name").val(objectiveData.objectivesValue.name);
	$("#objective_description").val(objectiveData.objectivesValue.description);
	if(objectiveData.owner	==	""){
		$("#objective_owner").val(empId);
	}else{
		$("#objective_owner").val(objectiveData.owner);
	}
	$("#objectiveweight").val(objectiveData.objectivesValue.weight);
	$("#objective_sub_weight").val(objectiveData.objectivesValue.subweight);
	$("#objective_start_end_date").val(objectiveData.objectivesValue.objective_start_end_date);
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
		"owner" : $("#objective_owner").val(),
		"scoreCardId" : $("#objectiveForm input[name='scoreCardId']").val(),
		"createdBy" : $("#objCreatedById").val(),
		"objectiveId" : $("#objective_display_id").val(),
		"objectivesValue" : {
			"thresholdFormula" : $("#custom_objective").val(),
			"objectiveId" : $("#objective_id").val(),
			"name" : $("#objective_name").val(),
			"description" : $("#objective_description").val(),
			"weight" : $("#objectiveweight").val(),
			"status" : $("#objective_status").val(),
			"subweight":$("#objective_sub_weight").val(),
			"objective_start_end_date":$("#objective_start_end_date").val()
		}
	}
	return objectiveObj;
}

function handleObjectiveSave() {
	var action = $("#objectiveForm input[name='action']").val();
	if (action == 'delete') {

	} else {
		var objectiveObj = getObjectiveObj();
		var methodType = 'post';
		if (action == 'add') {

		} else if (action == 'edit') {
			objectiveObj.id = $("#objective_id").val();
			methodType = 'put';
		}
		
		$.ajax({
			url : "/stratroom/objectives/",
			type : methodType,
			contentType : "application/json",
			data : JSON.stringify(objectiveObj),
			success : function(data, status) {
				$("#objectiveForm").css('display', 'none');
				location.reload(true);
				console.log("New objective was created..");
			}
		});
	}
}

function handleObjectiveEvent(id, action, scoreCardId) {
	$("#objectiveForm").css('display', 'none');
	$("#objectiveForm").trigger("reset");
	populateobjectiveOwnerDropdownScorecard('.objective_description_popup #objective_owner','.objective_description_popup');
	$("#objectiveForm input[name='action']").val(action);
	$("#objectiveForm input[name='scoreCardId']").val(scoreCardId);
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.customPerformance != undefined && controlpanelScorecardSettings.customPerformance == true){
		if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.customObjective != undefined && controlpanelScorecardSettings.customObjective != true){	
			$(".objectiveperformanceElement").hide();		
		}
	}else{
		$(".objectiveperformanceElement").hide();
	}
	var daterange2	=	$('#datePeriod').val();
	var startdate = new Date();
	var enddate = new Date();
	if (daterange2.includes("-")) {
		var dateval = daterange2.split('-');
		startdate = new Date(dateval[0]);
		enddate = new Date(dateval[1]);
	}

	$("#objective_start_end_date").datepicker({
		language: 'en',
		// minDate: startdate,
		// maxDate: enddate,
		range: true,
		autoClose: true,
		todayButton: false,
		position: "top left",
		onSelect: function (fd) {
			
		}
	});
	if (action == 'delete') {
		$("#deletescoreid").val(id);
		$("#deleterecordtype").val("scorecardobjective");
		$('#deleteModalscorecard').modal('toggle');
		$(window).on("resize", function(){
		    $(".modal:visible").each(alignModal);
		}); 
		$(".modal").on("shown.bs.modal", alignModal);
	} else if (action == 'add') {
		$("#objCreatedBy").html("");
		$("#objCreatedByDate").html("");
		$("#objUpdatedBy").html("");
		$("#objUpdatedByDate").html("");
		$("#objective_owner").val('');
		formvalidationerrorreset();
		$(".objectivenamediv").removeClass("col-md-9");
		$(".objectivenamediv").addClass("col-md-12");
		
		$("#objective_id_wrapper").css('display', 'none'); // Hide the ID input
		// when adding
		$('#objectiveForm *').prop("disabled", false);
		// $('#objectiveForm button').css('display', 'block');
		$("#objectiveForm").css('display', 'block');
		$('#objectiveForm button[value="Save"]').css('display', 'inline-block');
		$(".objective_description_popup #objective_owner").val(empId);
	} else { // view and edit
		formvalidationerrorreset();
		$(".objectivenamediv").removeClass("col-md-12");
		$(".objectivenamediv").addClass("col-md-9");
		
		
		$("#objective_id_wrapper").css('display', 'block');
		$('#objectiveForm *').prop("disabled", false);
		// $('#objectiveForm button').css('display', 'block');
		$('.objective_description_popup #objective_display_id').prop(
				"disabled", true);
		$('#objectiveForm button[value="Save"]').css('display', 'inline-block');
		if (action == 'view') {
			$('#objectiveForm *').prop("disabled", true);
			$('#objectiveForm button').prop("disabled", false);
			$('#objectiveForm button[value="Save"]').css('display', 'none');
		}

		$.ajax({
			url : "/stratroom/objectives/" + id,
			success : objectivesSuccessCallback
		});
	}

}

function perspectiveSuccessCallback(perspectiveData) {
	$("#perspectiveForm").css('display', 'block');
	$("#perspectiveId").val(perspectiveData.id);
	$("#scoreCardDetailsId").val(perspectiveData.scoreCardDetailsId);
	$("#perspective_id").val(perspectiveData.perspectiveId);
	$("#perspective_name").val(perspectiveData.scoreCardValue.name);
	$("#perspective_description").val(
			perspectiveData.scoreCardValue.description);
	if(perspectiveData.owner	==	""){
		$("#perspective_owner").val(empId);
	}else{
		$("#perspective_owner").val(perspectiveData.owner);
	}
	if(perspectiveData.scoreCardValue.scorecardFormula != "" && perspectiveData.scoreCardValue.scorecardFormula != undefined)
	{
		$("#perspectivescorecardFormula").val(perspectiveData.scoreCardValue.scorecardFormula)
	}	
	if(perspectiveData.scoreCardValue.weight	!=	"" && perspectiveData.scoreCardValue.weight	!=	undefined){
		$('#perspective_weight').val(perspectiveData.scoreCardValue.weight);
	}else{
		$('#perspective_weight').val(0);
	}
	
	$("#perspective_status").val(perspectiveData.scoreCardValue.status);
	$("#perspectivecustomreportee").val(perspectiveData.customReportees);
	$("#perspective_sub_weight").val(perspectiveData.scoreCardValue.subweight);
	$("#perspective_start_end_date").datepicker({
		language: 'en',
		range: true,
		autoClose: true,
		todayButton: false,
		position: "top left",
		onSelect: function (fd) {
			
		}
	});
	$("#perspective_start_end_date").val(perspectiveData.scoreCardValue.perspective_start_end_date);
	
	
	$("#custom_perspective").val(perspectiveData.scoreCardValue.thresholdFormula);
	$("#createdById").val(perspectiveData.createdBy);
	$("#createdBy").html(perspectiveData.scoreCardValue.createdByName);
	$("#updatedBy").html(perspectiveData.scoreCardValue.updatedByName);
	$("#createdByDate").html(perspectiveData.createDateString);
	$("#updatedByDate").html(perspectiveData.updatedDateString);
	if(perspectiveData.scoreCardValue.header3 != null &&  perspectiveData.scoreCardValue.header3 != undefined)
		{
		$("#perspectiveheader3").val(perspectiveData.scoreCardValue.header3)
		}
	if(perspectiveData.scoreCardValue.header4 != null &&  perspectiveData.scoreCardValue.header4 != undefined)
	{
	$("#perspectiveheader4").val(perspectiveData.scoreCardValue.header4)
	}
	if(perspectiveData.scoreCardValue.header5 != null &&  perspectiveData.scoreCardValue.header5 != undefined)
	{
	$("#perspectiveheader5").val(perspectiveData.scoreCardValue.header5)
	}
	if(perspectiveData.scoreCardValue.header6 != null &&  perspectiveData.scoreCardValue.header6 != undefined)
	{
	$("#perspectiveheader6").val(perspectiveData.scoreCardValue.header6)
	}
	if(perspectiveData.scoreCardValue.header7 != null &&  perspectiveData.scoreCardValue.header7 != undefined)
	{
	$("#perspectiveheader7").val(perspectiveData.scoreCardValue.header7)
	}
	/*
	 * for (var i = 2; i <= 6; i++) { var header =
	 * perspectiveData.scoreCardValue['header' + i]; $('#perspectiveForm
	 * input[value=' + header + ']').prop('checked', true); }
	 */

}

function getPerspectiveObj() {
	var perspectiveObj = {
		"owner" : $("#perspective_owner").val(),
		"pageId" : $("#pagenumber").val(),
		"createdBy" : $("#createdById").val(),
		"scoreCardDetailsId": $("#scoreCardDetailsId").val(),
		"scoreCardValue" : {
			"thresholdFormula" : $("#custom_perspective").val(),
			"scorecardFormula" : $("#perspectivescorecardFormula").val(),
			"name" : $("#perspective_name").val(),
			"description" : $("#perspective_description").val(),
			"status":$("#perspective_status").val(),
			"weight":$("#perspective_weight").val(),
			"subweight":$("#perspective_sub_weight").val(),
			"perspective_start_end_date":$("#perspective_start_end_date").val(),
			"defaultscr" : $("#perspectiveForm input[name='defaultscr']").val(),
			"header1" : "ID",
			"header2" : "Period",
		}
	}
	
	if($("#perspectiveheader3").val() != null && $("#perspectiveheader3").val() !="" )
	{
	perspectiveObj.scoreCardValue.header3 = $("#perspectiveheader3").val();
	}
	if($("#perspectiveheader4").val() != null && $("#perspectiveheader4").val() != "")
	{
		perspectiveObj.scoreCardValue.header4 = $("#perspectiveheader4").val();
	}
	if($("#perspectiveheader5").val() != null  && $("#perspectiveheader5").val() != "")
	{
		perspectiveObj.scoreCardValue.header5 = $("#perspectiveheader5").val();
	}
	if($("#perspectiveheader6").val() != null  && $("#perspectiveheader6").val() != "")
	{
		perspectiveObj.scoreCardValue.header6 = $("#perspectiveheader6").val();
	}
	if($("#perspectiveheader7").val() != null  && $("#perspectiveheader7").val() != "")
	{
		perspectiveObj.scoreCardValue.header7 = $("#perspectiveheader7").val();
	}

	perspectiveObj['includeReportee'] 	= 	false;
	
	if($("#chk_include_reportee").is(":checked") == true){
		perspectiveObj['includeReportee'] 	= 	true;
	}
	
	/*
	 * $.each($("input[name='scorecard_fields']:checked"), function(idx) { var
	 * count = idx + 3; perspectiveObj.scoreCardValue['header' + count] =
	 * $(this).val(); });
	 */

	return perspectiveObj;
}

function getPerspectiveParentObj(scorecardName, scorecarddata ) {
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
				
					"pageId" : $("#pagenumber").val(),
					"createdBy" : scorecarddata.createdBy,
					"id" : scorecarddata.id,
					"scorecardName" : $("#scorecardForm #scorecard_name").val(),
					"owner" : $("#scorecard_owner").val(),
					"departmentId":$("#scorecarddept").val(),
					"scoreCardDetailsValue" : {
						"scoreCardName" : $("#scorecardForm #scorecard_name").val(),
						//"defaultscr" : scorecarddata.scoreCardDetailsValue.defaultscr,
						//"thresholdFormula" : scorecarddata.scoreCardDetailsValue.thresholdFormula,
						"description" : $("#scorecard_description").val(),
						"scorecardFormula" : $("#scorecard_formula").val(),
						"score_card_start_end_date" : $("#scorecardForm #date_range").val(),
						"scorecardweight" : $("#scorecard_weight").val(),
						//"weight" : scorecarddata.scoreCardDetailsValue.weight,
						//"subweight" : $("#scorecard_sub_weight").val(),
						"status" : $("#scorecard_status").val()
					
				}

			}

		// perspectiveObj['includeReportee'] = false;
		perspectiveObj['scoreCardDetailsValue']['customReportees'] 		= 	"";
		
		if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.aggregation != undefined && controlpanelScorecardSettings.aggregation == true){	
			if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.aggregationType != undefined && controlpanelScorecardSettings.aggregationType == "Custom"){
				perspectiveObj['scoreCardDetailsValue']['customReportees'] = $("#scorecard_Custom_reportee").val().join(',');
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

function getScorecardTemplObj(scorecardname, empId,scoreCardDetailsId) {
	var scorecardObj = {
		"owner" : empId,
		"pageId" : $("#pagenumber").val(),
		"departmentId":"",
		"scoreCardDetailsId":scoreCardDetailsId,
		"scoreCardValue" : {
			"name" : scorecardname,
			"perspective_start_end_date":$('#datePeriod').val(),
			"description" : scorecardname,
			"defaultscr" : "true",
			"header1" : "ID",
			"header2" : "Period",
			"header3" : "Actual",
			"header4" : "Target",
			"header5" : "Trend"
		}
	}
	return scorecardObj;
}

function createtemplatescorecard(perspectiveObj) {
	
	$.ajax({
		url : "/stratroom/scorecard/",
		type : "post",
		contentType : "application/json",
		async:false,
		data : JSON.stringify(perspectiveObj),
		success : function(data, status) {
			console.log("New scorecard was created..");
		}
	});
}

function handlePerspectiveSave() {
	var action = $("#perspectiveForm input[name='action']").val();
	var defaultscr = $("#perspectiveForm input[name='defaultscr']").val();
	if (action == 'delete') {

	} else {
		var perspectiveObj = getPerspectiveObj();
		var methodType = 'post';
		if (action == 'add') {
			perspectiveObj.customReportees = "";
		} else if (action == 'edit') {
			perspectiveObj.perspectiveId=$("#perspective_id").val();
			perspectiveObj.id = $("#perspectiveId").val();
			perspectiveObj.customReportees = $("#perspectivecustomreportee").val();
		
			
			if($("#scorecardweight").val() != null && $("#scorecardweight").val() !="" )
				{
				perspectiveObj.scoreCardValue.scorecardweight = $("#scorecardweight").val();
				}	
			
			if($("#perspectiveheader3").val() != null && $("#perspectiveheader3").val() !="" )
				{
				perspectiveObj.scoreCardValue.header3 = $("#perspectiveheader3").val();
				}
			if($("#perspectiveheader4").val() != null && $("#perspectiveheader4").val() != "")
			{
			perspectiveObj.scoreCardValue.header4 = $("#perspectiveheader4").val();
			}
			if($("#perspectiveheader5").val() != null  && $("#perspectiveheader5").val() != "")
			{
			perspectiveObj.scoreCardValue.header5 = $("#perspectiveheader5").val();
			}
			if($("#perspectiveheader6").val() != null  && $("#perspectiveheader6").val() != "")
			{
			perspectiveObj.scoreCardValue.header6 = $("#perspectiveheader6").val();
			}
			if($("#perspectiveheader7").val() != null  && $("#perspectiveheader7").val() != "")
			{
			perspectiveObj.scoreCardValue.header7 = $("#perspectiveheader7").val();
			}
			methodType = 'put';
		}

		$.ajax({
			url : "/stratroom/scorecard/",
			type : methodType,
			contentType : "application/json",
			data : JSON.stringify(perspectiveObj),
			success : function(data, status) {
				$("#perspectiveForm").css('display', 'none');
				location.reload(true);
				console.log("New scorecard was created..");
			}
		});
	}
}

function handleScorecardSave() {

	var pageno = $('#pagenumber').val();
	var pageUrl = "";
	
	var frequency 	= 	localStorage.getItem("customperiod");
	if((empId != undefined && empId !=	"") && (frequency	!=	null && frequency	!=	"")){
		pageUrl = "/stratroom/scoreCardList?pageId=" + pageno+"&empId="+empId+"&datePeriod="+$("#datePeriod").val()+"&frequency="+frequency;	
	}else if((empId != undefined && empId !=	"") && (frequency	==	null || frequency	==	"")){
		pageUrl = "/stratroom/scoreCardList?pageId=" + pageno+"&empId="+empId+"&datePeriod="+$("#datePeriod").val();	
	}else{
		pageUrl = "/stratroom/scoreCardList?pageId=" + pageno+"&datePeriod="+$("#datePeriod").val();
	}
	
	$.ajax({
		url : pageUrl,
		success : function(data, status) {
			
					scorecardlist = data.cardDetailsDTO;
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
			
		},
		error:readErrorMsg
	});
}

$("#scorecard_owner").change(function(){
	var emp	=	$(this).val();
	var deptempid	=	(emp	==	"" && emp	==	undefined?empId:emp);
	departmentlist('.scorecard_description_popup #scorecarddept',deptempid);
});

function handleScoreCardEvent() {
	console.log(scorecardlist);
	$("#scorecardForm").trigger("reset");
	populateOwnerDropdownScorecard('.scorecard_description_popup #scorecard_owner','.scorecard_description_popup');

	var implementationtypemethod	=	false;
	if((controlpanelgeneralsiteSettings.implementation !=	null && controlpanelgeneralsiteSettings.implementation !=	undefined) && (controlpanelgeneralsiteSettings.implementationType !=	null && controlpanelgeneralsiteSettings.implementationType !=	undefined)){
		if(controlpanelgeneralsiteSettings.implementationType	==	"Department"){
    		implementationtypemethod	=	true
    	}
	}
	
	if(implementationtypemethod){
		departmentWiseReportees();
	}
	
	if(!implementationtypemethod){
		populatecustomReporteeOwnerDropdownScorecard('.scorecard_description_popup #scorecard_Custom_reportee','.scorecard_description_popup');
	}
	
	$('.scorecard_description_popup #scorecard_id').prop("disabled", true);
	
	
	var deptempid	=	(scorecardlist.owner	==	"" && scorecardlist.owner	==	undefined?empId:scorecardlist.owner);
	departmentlist('.scorecard_description_popup #scorecarddept',deptempid);
	
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.aggregation != undefined && controlpanelScorecardSettings.aggregation == true){	
		if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.aggregationType != undefined && controlpanelScorecardSettings.aggregationType != "Custom"){
			$(".customaggregationElement").remove();
		}
	}else{
		$(".customaggregationElement").remove();
	}
	
				$("#scorecard_id").val(scorecardlist.id);
				var scorecardElementname	=	"Scorecard";
				if (scorecardlist.scoreCardDetailsValue.scoreCardName != undefined) {
					scorecardElementname	=	scorecardlist.scoreCardDetailsValue.scoreCardName;
				}
				$("#scorecard_name").val(scorecardElementname);
				
				if (scorecardlist.scoreCardDetailsValue.description == undefined) {
					$("#scorecard_description").val("Scorecard");
				} else {
					$("#scorecard_description").val(scorecardlist.scoreCardDetailsValue.description);
				}
				if(scorecardlist.owner	==	""){
					$("#scorecard_owner").val(empId);
				}else{
					$("#scorecard_owner").val(scorecardlist.owner);
				}
				
				if(scorecardlist.departmentId	!=	"" && scorecardlist.departmentId	!=	undefined && scorecardlist.departmentId	!=	null){
					$('#scorecarddept').val(scorecardlist.departmentId);
				}else{
					$('#scorecarddept').val("");
				}
				
				$('#scorecarddept').select2({
					  selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
					  dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
					});

					
				
				if(scorecardlist.scoreCardDetailsValue.status !=	"" && scorecardlist.scoreCardDetailsValue.status !=	null && scorecardlist.scoreCardDetailsValue.status !=	undefined){
					$("#scorecard_status").val(scorecardlist.scoreCardDetailsValue.status);
				}else{
					$("#scorecard_status").val('Weighted');
				}
				if(scorecardlist.scoreCardDetailsValue.weight	!=	"" && scorecardlist.scoreCardDetailsValue.weight	!=	undefined){
					$('#scorecard_weight').val(scorecardlist.scoreCardDetailsValue.weight);
				}else{
					$('#scorecard_weight').val(0);
				}
				
				if(scorecardlist.scoreCardDetailsValue.scorecardFormula	!=	"" && scorecardlist.scoreCardDetailsValue.scorecardFormula	!=	undefined){
					$('#scorecard_formula').val(scorecardlist.scoreCardDetailsValue.scorecardFormula);
				}
				
				//$("#scorecard_sub_weight").val(scorecard.cardDetailsDTO.scoreCardDetailsValue.scorecardsubweight);
				$("#date_range").datepicker({
					language: 'en',
					// minDate: startdate,
					// maxDate: enddate,
					range: true,
					autoClose: true,
					todayButton: false,
					position: "top left",
					onSelect: function (fd) {
						
					}
				});
				$("#date_range").val(scorecardlist.scoreCardDetailsValue.score_card_start_end_date);
				
				
				
				var createdTimeread	=	scorecardlist.createdTime !=	undefined?scorecardlist.createdTime:"";
				if(createdTimeread){
					createdTimeread = new Date(createdTimeread).toLocaleDateString('en-GB', {
						  day: 'numeric', month: 'short', year: 'numeric'
						}).replace(/ /g, '-');
				}
				
				var updatedTimeread	=	scorecardlist.updatedTime !=	undefined?scorecardlist.updatedTime:"";
				if(updatedTimeread){
					updatedTimeread = new Date(updatedTimeread).toLocaleDateString('en-GB', {
						  day: 'numeric', month: 'short', year: 'numeric'
						}).replace(/ /g, '-');
				}
				
				$("#createdById").val(scorecardlist.createdBy);
				$("#configcreatedBy").html((scorecardlist.scoreCardDetailsValue.createdByName !=	undefined?scorecardlist.scoreCardDetailsValue.createdByName:""));
				$("#configupdatedBy").html((scorecardlist.scoreCardDetailsValue.updatedByName !=	undefined?scorecardlist.scoreCardDetailsValue.updatedByName:""));
				$("#configcreatedByDate").html(createdTimeread);
				$("#configupdatedByDate").html(updatedTimeread);
				
				/*for (var i = 2; i <= 9; i++) {
					var header = scorecard.scoreCardValue['header' + i];
					$('#scorecardForm input[value=' + header + ']').prop('checked',
							true);
				}*/
				
				if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.aggregation != undefined && controlpanelScorecardSettings.aggregation == true){
					$("#scorecard_Custom_reportee").attr("readonly",false);
					$("#scorecard_Custom_reportee").removeAttr("disabled");
				}
				
				if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && (controlpanelScorecardSettings.customPerformance == undefined || controlpanelScorecardSettings.customPerformance == false)){
					$(".performancehidescorecard").hide();
				}
				
				/*
				 * if(scorecard.includeReportee != undefined &&
				 * scorecard.includeReportee == true){
				 * $('#chk_include_reportee').prop('checked', true);
				 * $('#ca_input').show(); }
				 */
				
				var customReportees	=	[];
				if(scorecardlist.scoreCardDetailsValue.customReportees != undefined){
					var cutreportees	=	scorecardlist.scoreCardDetailsValue.customReportees.split(',');
					$.each(cutreportees, function(index, module) {
						customReportees.push(module);
					});
					$("#scorecard_Custom_reportee").val(customReportees);
				}
				
				$(".perspective-multi-select").select2();
}

function departmentWiseReportees(){
	$("#scorecard_Custom_reportee").empty();
	$.ajax({
		type : "GET",
		url : "/stratroom/departmentReportees",
		async:false,
		success : function(data) {
			var customReportees	=	[];
			$.each(data, function(index, module) {
				addOption("#scorecard_Custom_reportee", module.name, module.id);
				customReportees.push(module.id);
			});
		}
	});
}

function handlePerspectiveEvent(id, action) {
	$("#perspectiveForm").css('display', 'none');
	$("#perspectiveForm").trigger("reset");
	populateOwnerDropdownScorecard('.perspectives_description_popup #perspective_owner','.perspectives_description_popup');
	$("#perspectiveForm input[name='action']").val(action);
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.customPerformance != undefined && controlpanelScorecardSettings.customPerformance == true){
		if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.customPerspective != undefined && controlpanelScorecardSettings.customPerspective != true){
			$(".perspectiveperformanceElement").hide();	
		}
	}else{
		$(".perspectiveperformanceElement").hide();
	}
	
	if (action == 'delete') {
		$("#deletescoreid").val(id);
		$("#deleterecordtype").val("scorecardperspective");
	
		$('#deleteModalscorecard').modal('toggle');
		$(window).on("resize", function(){
		    $(".modal:visible").each(alignModal);
		}); 
		$(".modal").on("shown.bs.modal", alignModal);
	} else if (action == 'add') {
		$("#createdBy").html("");
		$("#createdByDate").html("");
		$("#updatedBy").html("");
		$("#updatedByDate").html("");
		$("#perspective_owner").val();
		$("#perspective_id_wrapper").css('display', 'none'); // Hide the ID
		$('.perspectives_description_popup').css('display', 'block');
		// input when
		// adding new
		// perspective
		$('.perspectives_description_popup #perspectiveForm *').prop(
				"disabled", false);
		$("#perspectiveForm").css('display', 'block');
		$('.perspectives_description_popup #perspective_owner').val(empId);
		var defaultscr = "false";
		$("#perspectiveForm input[name='defaultscr']").val(defaultscr);
	} else { // view and edit
		$("#perspective_id_wrapper").css('display', 'block');
		$('.perspectives_description_popup').css('display', 'block');
		$('.perspectives_description_popup #perspectiveForm *').prop(
				"disabled", false);
		$('.perspectives_description_popup #perspective_id').prop("disabled",
				true);

		if (action == 'view') {
			$('.perspectives_description_popup #perspectiveForm *').prop(
					"disabled", true);
			$('.perspectives_description_popup #perspectiveForm button').prop(
					"disabled", false);
			$(
					'.perspectives_description_popup #perspectiveForm button[value="Save"]')
					.css('display', 'none');
		}

		$.ajax({
			url : "/stratroom/scorecard/" + id,
			success : perspectiveSuccessCallback
		});
	}

}
var pageno = $('#pagenumber').val();
function scorecardpagepreference() {
	var checkpageno		=	$('#defaultpagenumber').val();
	if(checkpageno	!=	undefined && checkpageno !=	""){
		pageno	=	checkpageno;
	}
	
	if($("#userrolename").val()	==	"Super User" || $("#userrolename").val()	==	"Admin"){
		if($("#userPrincipal").val()	!= $("#userPrincipalnavigate").val()){
			if($(".superusertopmenu").hasClass(pageno)){
				$("."+pageno).addClass("homepageHighlight");
			}
		}
	}
				
	
	if (jQuery.isEmptyObject(scorepreference)) {
		$.ajax({
			url : "/stratroom/getPreferences?pageName=SCORECARD&pageId="+pageno,
			async:false,
			success : function(employeeList) {
				scorepreference = employeeList;
			}
		});
	} 
}



function loadDepartments() {

	$.ajax({
		type : "GET",
		url : "/stratroom/allDepartmentList",
		async:false,
		success : function(data) {
			var customReportees	=	[];
			$.each(data, function(index, module) {
				const option = document.createElement('option');
				option.value = module.id;
				option.textContent = module.name;
				departmentSelect.appendChild(option);

			});
		}
	});
	
}

function loadPages(departmentId) {
	console.log("Pages loading :::: " + departmentId)

	for (let i = pageSelect.options.length - 1; i > 0; i--) {
        pageSelect.remove(i);
    }
	$.ajax({
		type : "GET",
		url : "/stratroom/pageDeptList/"+departmentId+"?pageType=scorecard",
		async:false,
		success : function(data) {
			var customReportees	=	[];
			$.each(data, function(index, module) {
				const option = document.createElement('option');
				option.value = module.id;
				option.textContent = module.pageName;
				pageSelect.appendChild(option);

			});
		}
	});
}

departmentSelect.addEventListener('change', function () {
	 selectedDepartment = this.value;
	if (selectedDepartment) {
		loadPages(selectedDepartment);
	} else {
		pageSelect.innerHTML = '<option value="">Select a Page</option>'; // Reset pages dropdown
	}
});

pageSelect.addEventListener('change', function () {
	 selectedpage = this.value;
	if (selectedpage) {
		fetchScordcardData(selectedpage);
	} 
});



$(document).ready(function() {
	loadDepartments();
		scoreviewpermission	=	true;
		$(".scorecardenableviewicon").css("display","block");
		scorecardloadview	=	true;

	
	
	
		$(".scorecardexportlink").hide();
	

	
	if(scorecreatepermission	==	false){
		$(".scorecardimportviewicon").css("display","none");
		//$(".formularegisterimport").remove();
	}
	if(formulaviewpermission	==	false){
		$(".formularegisterimport").remove();
	}
	
	var	formulalinkEnable	=	false; 
	if(enableaccesscontrolMenu	==	false){
		if(LicenseDetailsdata['moduleList'] !=	undefined && LicenseDetailsdata['moduleList'] !=	"" && LicenseDetailsdata['moduleList'] !=	null){
			$.each(LicenseDetailsdata['moduleList'], function(index, reportee) {
				if(reportee.moduleName	==	"Strategy Formulation"){
					formulalinkEnable	=	true;
				}
			});
	    }
	}    
	
	
	var ischeckscurlornot	=	$("#ischeckscurlornot").val();		
	var empId = $("#userPrincipal").val();
	

	//getreporteelist();
		
	$("#initiate_sidebar .profile_content").click(function(e) {
		var text = $(this).find('p').text();
	});


		$('#kpiDataType').on('change',function() {
			if($(this).val()	==	"Currency"){
				$(".kpiCurrencyfield").show();
			}else{
				$(".kpiCurrencyfield").hide();
			}
		});
		
	});
	
$("input[data-type='currency']").on({
    keyup: function() {
      formatCurrency($(this));
    },
    blur: function() { 
      formatCurrency($(this), "blur");
    }
});


$("#targetamount").on({
    keyup: function() {
    	formatCurrency($(this),"value");
    },keypress: function() {
    	formatCurrency($(this),"value");
    },
    blur: function() { 
    	formatCurrency($(this),"value", "blur");
    }
});


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


function fieldmeasurefilter(measureNameId,fieldNameId) {
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

$(".kpi_formula_popup #formula").on('keypress',function(e){
	var elemvalue	=	$(this).val();
	$(".kpi_formula_popup #measureNames li").each(function(i){
		var value	=	$(this).text();
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) ==	-1){
			$(this).removeClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) !=	-1){
			$(this).addClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue == value){
			$(this).addClass("kpiformuladescHighlight");
		}
	});
	
	$(".kpi_formula_popup #kpisubmeasureNames li").each(function(i){
		var value	=	$(this).text();
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) ==	-1){
			$(this).removeClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) !=	-1){
			$(this).addClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue == value){
			$(this).addClass("kpiformuladescHighlight");
		}
	});
	$(".kpi_formula_popup #kpiinitiativeNames li").each(function(i){
		var value	=	$(this).text();
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) ==	-1){
			$(this).removeClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) !=	-1){
			$(this).addClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue == value){
			$(this).addClass("kpiformuladescHighlight");
		}
	});
	if(elemvalue	==	""){
		$(".kpi_formula_popup #measureNames li").removeClass("kpiformuladescHighlight");
		$(".kpi_formula_popup #kpisubmeasureNames li").removeClass("kpiformuladescHighlight");
		$(".kpi_formula_popup #kpiinitiativeNames li").removeClass("kpiformuladescHighlight");
	}
	
}).on('keyup',function(e){
	var elemvalue	=	$(this).val();
	$(".kpi_formula_popup #measureNames li").each(function(i){
		var value	=	$(this).text();
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) ==	-1){
			$(this).removeClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) !=	-1){
			$(this).addClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue == value){
			$(this).addClass("kpiformuladescHighlight");
		}
	});
	$(".kpi_formula_popup #kpisubmeasureNames li").each(function(i){
		var value	=	$(this).text();
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) ==	-1){
			$(this).removeClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) !=	-1){
			$(this).addClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue == value){
			$(this).addClass("kpiformuladescHighlight");
		}
	});
	$(".kpi_formula_popup #kpiinitiativeNames li").each(function(i){
		var value	=	$(this).text();
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) ==	-1){
			$(this).removeClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) !=	-1){
			$(this).addClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue == value){
			$(this).addClass("kpiformuladescHighlight");
		}
	});
	if(elemvalue	==	""){
		$(".kpi_formula_popup #measureNames li").removeClass("kpiformuladescHighlight");
		$(".kpi_formula_popup #kpisubmeasureNames li").removeClass("kpiformuladescHighlight");
		$(".kpi_formula_popup #kpiinitiativeNames li").removeClass("kpiformuladescHighlight");
	}
});

$(".kpiYtdFormulaPoPUp #customYtdformula").on('keypress',function(e){
	var elemvalue	=	$(this).val();
	$(".kpiYtdFormulaPoPUp #ytdMeasureNames li").each(function(i){
		var value	=	$(this).text();
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) ==	-1){
			$(this).removeClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) !=	-1){
			$(this).addClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue == value){
			$(this).addClass("kpiformuladescHighlight");
		}
	});
	$(".kpiYtdFormulaPoPUp #ytdsubMeasureNames li").each(function(i){
		var value	=	$(this).text();
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) ==	-1){
			$(this).removeClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) !=	-1){
			$(this).addClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue == value){
			$(this).addClass("kpiformuladescHighlight");
		}
	});
	if(elemvalue	==	""){
		$(".kpiYtdFormulaPoPUp #ytdMeasureNames li").removeClass("kpiformuladescHighlight");
		$(".kpiYtdFormulaPoPUp #ytdsubMeasureNames li").removeClass("kpiformuladescHighlight");
	}
}).on('keyup',function(e){
	var elemvalue	=	$(this).val();
	$(".kpiYtdFormulaPoPUp #ytdMeasureNames li").each(function(i){
		var value	=	$(this).text();
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) ==	-1){
			$(this).removeClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) !=	-1){
			$(this).addClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue == value){
			$(this).addClass("kpiformuladescHighlight");
		}
	});
	$(".kpiYtdFormulaPoPUp #ytdsubMeasureNames li").each(function(i){
		var value	=	$(this).text();
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) ==	-1){
			$(this).removeClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) !=	-1){
			$(this).addClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue == value){
			$(this).addClass("kpiformuladescHighlight");
		}
	});
	if(elemvalue	==	""){
		$(".kpiYtdFormulaPoPUp #ytdMeasureNames li").removeClass("kpiformuladescHighlight");
		$(".kpiYtdFormulaPoPUp #ytdsubMeasureNames li").removeClass("kpiformuladescHighlight");
	}
});

$(".objective_custom_threshold_popup #formulaCustomObjective").on('keypress',function(e){
	var elemvalue	=	$(this).val();
	$(".objective_custom_threshold_popup #objectiveMeasureNames li").each(function(i){
		var value	=	$(this).attr("data-value");
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) ==	-1){
			$(this).removeClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) !=	-1){
			$(this).addClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue == value){
			$(this).addClass("kpiformuladescHighlight");
		}
	});
	if(elemvalue	==	""){
		$(".objective_custom_threshold_popup #objectiveMeasureNames li").removeClass("kpiformuladescHighlight");
	}
}).on('keyup',function(e){
	var elemvalue	=	$(this).val();
	$(".objective_custom_threshold_popup #objectiveMeasureNames li").each(function(i){
		var value	=	$(this).attr("data-value");
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) ==	-1){
			$(this).removeClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) !=	-1){
			$(this).addClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue == value){
			$(this).addClass("kpiformuladescHighlight");
		}
	});
	if(elemvalue	==	""){
		$(".objective_custom_threshold_popup #objectiveMeasureNames li").removeClass("kpiformuladescHighlight");
	}
});

$(".perspective_custom_threshold_popup #formulaCustomPerspective").on('keypress',function(e){
	var elemvalue	=	$(this).val();
	$(".perspective_custom_threshold_popup #perspectiveMeasureNames li").each(function(i){
		var value	=	$(this).attr('data-value');
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) ==	-1){
			$(this).removeClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) !=	-1){
			$(this).addClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue == value){
			$(this).addClass("kpiformuladescHighlight");
		}
	});
	if(elemvalue	==	""){
		$(".perspective_custom_threshold_popup #perspectiveMeasureNames li").removeClass("kpiformuladescHighlight");
	}
}).on('keyup',function(e){
	var elemvalue	=	$(this).val();
	$(".perspective_custom_threshold_popup #perspectiveMeasureNames li").each(function(i){
		var value	=	$(this).attr('data-value');
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) ==	-1){
			$(this).removeClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) !=	-1){
			$(this).addClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue == value){
			$(this).addClass("kpiformuladescHighlight");
		}
	});
	if(elemvalue	==	""){
		$(".perspective_custom_threshold_popup #perspectiveMeasureNames li").removeClass("kpiformuladescHighlight");
	}
});

$(".scorecard_custom_threshold_popup #formulaScoreCardPerspective").on('keypress',function(e){
	var elemvalue	=	$(this).val();
	$(".scorecard_custom_threshold_popup #scorecardMeasureNames li").each(function(i){
		var value	=	$(this).text();
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) ==	-1){
			$(this).removeClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) !=	-1){
			$(this).addClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue == value){
			$(this).addClass("kpiformuladescHighlight");
		}
	});
	if(elemvalue	==	""){
		$(".scorecard_custom_threshold_popup #scorecardMeasureNames li").removeClass("kpiformuladescHighlight");
	}
}).on('keyup',function(e){
	var elemvalue	=	$(this).val();
	$(".scorecard_custom_threshold_popup #scorecardMeasureNames li").each(function(i){
		var value	=	$(this).text();
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) ==	-1){
			$(this).removeClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) !=	-1){
			$(this).addClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue == value){
			$(this).addClass("kpiformuladescHighlight");
		}
	});
	if(elemvalue	==	""){
		$(".scorecard_custom_threshold_popup #scorecardMeasureNames li").removeClass("kpiformuladescHighlight");
	}
});

$("#performanceformula").on('keypress',function(e){
	var elemvalue	=	$(this).val();
	$("#PerformancemeasureNames li").each(function(i){
		var value	=	$(this).text();
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) ==	-1){
			$(this).removeClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) !=	-1){
			$(this).addClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue == value){
			$(this).addClass("kpiformuladescHighlight");
		}
	});
	if(elemvalue	==	""){
		$("#PerformancemeasureNames li").removeClass("kpiformuladescHighlight");
	}
}).on('keyup',function(e){
	var elemvalue	=	$(this).val();
	$("#PerformancemeasureNames li").each(function(i){
		var value	=	$(this).text();
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) ==	-1){
			$(this).removeClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) !=	-1){
			$(this).addClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue == value){
			$(this).addClass("kpiformuladescHighlight");
		}
	});
	if(elemvalue	==	""){
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
				"<span>" + input.files[0].name + "</span>" +
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

$(document).on('click', "#next-btn-1", function () {
	$("#validateImportHide").empty();
	$("#file-upload").hide();
	$("#file-validate").show();
	$("#file-save").hide();
	$(".form-progressbar li:nth-child(2)").addClass("active");
	var formdata = new FormData();
	formdata.append("scoreCardData", file);
	$(".page-loader-wrapper").css("display", "block");
	if(file !=	"" && file != undefined) {
		$.ajax({
			url: "/stratroom/saveScoreCardDetails?type=validation",
			type: "POST",
			data: formdata,
			processData: false,
			contentType: false,
			success: function (data, status) {
				scorecardUploadNotFoundData(data,data.parsingError)
				$(".page-loader-wrapper").css("display", "none");
			},error:function(msg,status){
				$(this).val('');
				$(".page-loader-wrapper").css("display","none");
				if(!jQuery.isEmptyObject(msg.responseText)){
					var errorparse	=	JSON.parse(msg.responseText);
					if(errorparse.status 	==	"404"){
						$.notify("Error:"+errorparse.exception, {
								  style: 'error',
								  className: 'graynotify'
								});
					}else{
						$.notify("Error:"+errorparse.exception, {
								  style: 'error',
								  className: 'graynotify'
								});
					}
				}
			},
		});
	} else {	
		
		$("#fileerrorshow").append('Please select upload file');
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


$(document).on('click', '#next-btn-2', function() {	
	$("#file-upload").hide();
	$("#file-validate").hide();
	$("#file-save").show();
	$(".form-progressbar li:nth-child(3)").addClass("active");
	var formdata = new FormData();
	var file	=	$('input[name="img_logo"]')[0].files[0];
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
			scorecardUploadSuccess(data)
		},
	});
});

$(document).on('click', '#prev-btn1', function() {	
	$(".uploadvalidationSuccess").empty();
	$("#validateImportHide").empty();	
	$("#file-upload").show();
	$("#file-validate").hide();
	$("#file-save").hide();
	$(".form-progressbar li:nth-child(2)").removeClass("active");
	$(".form-progressbar li:nth-child(1)").addClass("active");
});


$(document).on('click', '#prev-btn2', function() {	
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


function scorecardUploadNotFoundData(data,result) {
	$(".uploadvalidationSuccess").empty();	
	var scorecard_import_error;
	/*
	 * $("#validateImportHide").empty(); var validateImport ='';
	 */
	if(!jQuery.isEmptyObject(result)){
		$(".error-div").show();
	}
	
	if(!jQuery.isEmptyObject(data) && data.result	==	"Not-Success"){
		$("#imagevalidate").attr("src","../images/Not-Verified.png").attr("alt","error");
		validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
		'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
	}
	if(!jQuery.isEmptyObject(data) && (data.result	==	"success" || data.result	==	"Success")){
		$(".error-div").hide();
		$("#imagevalidate").attr("src","../images/Success.png").attr("alt","success");
		validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
		'<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';
	}
	
	$.each(result, function (i, List) {
		scorecard_import_error = '<tr>' +
			'<td style="width: 150px; text-align: center;">' + List.Excel_SheetName + '</td>' +
			'<td style="width: 150px; text-align: center;">' + List.rowNo + '</td>' +
			'<td style="width: 150px; text-align: center;">' + List.cellName + '</td>' +
			'<td style="width: 150px; text-align: left;">' + List.error + '</td>' +
			'</tr>';
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
		$("#imagevalidate").attr("src","../images/Not-Verified.png").attr("alt","error");
		
		validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
		'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
	}
	
	$("#validateImportHide").append(validateImport);
}


function scorecardUploadSuccess(data) {
	$(".uploadStatististics").empty();
	$(".error-div").show();
	$("#successimagevalidate").attr("src","../images/Success.png").attr("alt","success");
	// $("#statisticmessage").append('Import Successful');
	scorecardStatististics('No of Records processed',(data.no_of_process != undefined?data.no_of_process:""));
	scorecardStatististics('No of Scorecards records',(data.no_of_processed != undefined?data.no_of_processed:""));
	scorecardStatististics('No of KPI created',(data.no_of_created != undefined?data.no_of_created:""));
	scorecardStatististics('No of KPI updated',(data.no_of_updated != undefined?data.no_of_updated:""));
	scorecardStatististics('No of KPI Failed',(data.no_of_failed !=	undefined?data.no_of_failed:""));
	
}

function scorecardStatististics(staticsvalue,fnresult) {
	var scorecard_Statististics = '<tr>' +
	'<td style="width: 300px; text-align: left;">'+staticsvalue+'</td>' +
	'<td style="width: 300px; text-align: center;">' +fnresult+ '</td>' +	
	'</tr>';
	$(".uploadStatististics").append(scorecard_Statististics);
}


$(document).on('click', '#done-btn', function() {					
	location.reload(true);
});

$(document).on('click',".close",function () {
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

$(document).on("change","#importscorescrd",function(e){
	e.preventDefault();
	var formdata 			= 	new FormData();
    if($(this).prop('files').length > 0)
    {
        file =$(this).prop('files')[0];
        formdata.append("scoreCardData", file);
    }
    $(".page-loader-wrapper").css("display","block");
    $.ajax({
		url : "/stratroom/saveScoreCardDetails",
		type: "POST",
	    data: formdata,
	    processData: false,
	    contentType: false,
		success : function(data, status) {
			console.log(data);
			$(this).val('');
				$(".upLoadScoreCardSuccessModal").modal("show");
            			$("#scorecardSuccess").text(data.result);
			$(".page-loader-wrapper").css("display","none");
			// location.reload(true);
			// $.notify(data);
		},
		error:function(msg,status){
			$(this).val('');
			$(".page-loader-wrapper").css("display","none");
			if(!jQuery.isEmptyObject(msg.responseText)){
				var errorparse	=	JSON.parse(msg.responseText);
				if(errorparse.status 	==	"404"){
					$.notify("Error:"+errorparse.exception, {
							  style: 'error',
							  className: 'graynotify'
							});
				}else{
					$.notify("Error:"+errorparse.exception, {
							  style: 'error',
							  className: 'graynotify'
							});
				}
			}
		}
	});
    
});

function formvalidationerrorreset(){
	$('*[id*=-error]').each(function() {
	    $(this).remove();
	});
	$(".input-calender-icon").css("bottom","30%");
}

function getreporteelist() {
	
	if (jQuery.isEmptyObject(reporteelist)) {
		$.ajax({
			url : "/stratroom/reporteeList",
			success : function(employeeList) {
				reporteelist = employeeList;
			}
		});
	} 
}

function getformularegister(){
	$.ajax({
		url: "/stratroom/strategyFormulationList?status=Approved",
		success: function (data) {
			formulationSuccessCallback(data);
		}
	});
}

	function formulationSuccessCallback(data) {
		var formuladata	=	"";
		$("#formulation_popup #initiate_sidebar").empty();
		$.each(data, function (index, initiative) {
			var topparentswotDetails	=	{};
			$.each(reporteelist,function(ownkey,empvalue){
				if(empvalue.id	==	initiative.approvedBy){
					topparentswotDetails	=	{"id":empvalue.id,"name":empvalue.name,"image":empvalue.image,"dept":empvalue.dept};
				}
			});
			var id	=	initiative.id;				
			var riskimage	=	topparentswotDetails.image;
			var dept		=	(initiative.formulationDept !=	undefined?initiative.formulationDept:"");
			var name 		= 	(initiative.formulationName !=	undefined?initiative.formulationName:"");
			var title 		= 	(initiative.formulationName !=	undefined?initiative.formulationName:"");
			var username 	=	hasWhiteSpaceName(name);
			if(riskimage	==	"" || riskimage	==	" " || riskimage	==	undefined){
				var Owner 	= 	"data-name='" + username + "' class='rounded-circle formulauser'";	
			}else{
				var Owner 	= 	" class='rounded-circle' src='" + riskimage + "' ";
			}
			
			var applycreate	=	``;
			if(formulacreatepermission){
				applycreate	=	`onclick="applyformularegister(`+id+`)"`;
			}
			
			formuladata	+=	`<div class="d-flex flex-column sub_initiative_sidebar_details" `+applycreate+`>
                    <div class="d-flex flex-row p-b-5">
                      <div class="flex-column profile_image">
                        <img `+Owner+` alt="User" width="25"/>
                      </div>
                      <div class="d-flex flex-column profile_content line-shortner">
                        <p>`+title+`</p>
                      </div>
                    </div>
                    <div class="d-flex flex-row justify-content-between m-t--10">
                      <div class="flex-column ini_side_depart_bar">
                        <div class="employee_info" data-i18n="Department">Department</div>
                        <p>`+dept+`</p>
                      </div>
                    </div>
                  </div>`;
			
		});	
		$("#formulation_popup #initiate_sidebar").html(formuladata);
		$('.formulauser').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
	}
	
function applyformularegister(id){
	if(id	==	""){
		return false;
	}
	$(".page-loader-wrapper").show();
	$.ajax({
		url: "/stratroom/formulation/applyFormulation?formulationId="+id,
		success: function (data) {
			if(data.pageId !=	undefined && data.pageId !=	""){
				window.location 	= 	$("#userPrincipal").val() + "?pageId="+ data.pageId;
			}else{
				$.notify("Success:Page is created", {
							  style: 'success',
							  className: 'graynotify'
							});
			}
		},error:function(){
			$.notify("Error:Page is not created successfully", {
							  style: 'error',
							  className: 'graynotify'
							});
			$(".page-loader-wrapper").hide();		
		}
	});
}

$(document).on('click',".kpiclearrecord",function(){
	localStorage.removeItem('kpiId');
	localStorage.removeItem('objId');
	localStorage.removeItem('scoreCardId');
	localStorage.removeItem('scordCardPageId');
});