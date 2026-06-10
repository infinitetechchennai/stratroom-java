var currentEmp = "";
var navigateEmp = $("#userPrincipalnavigate").val();
if (navigateEmp != "" || navigateEmp != null) {
	currentEmp = navigateEmp;
}
else {
	currentEmp = $("#userPrincipal").val();
}
console.log(currentEmp,)
var riskupdateDescription = [];
var kpiList = {};
var causeList = {};
var reporteelist = [];
var riskpreference = [];
var riskchartDataList = [];
var risksettings = {};
var customscore = [];
var riskoptions = [];
var optionTexts = {}; // Object to hold the structured mappings
var selectedriskid="";


var likelihoodmap = new Map();
var impactmap = new Map();

var detailrisk = {}

var riskempPreference = {
	"preferences": {}
};
var parentriskID = "";
var riskplanupdateDescription = [];
var riskmonitoringupdateDescription = [];

var riskmodPermission = [];

var riskcreatepermission = false;
var riskeditpermission = false;
var riskdeletepermission = false;
var riskviewpermission = false;
var riskcontentload = false;

var causecreatepermission = false;
var causeeditpermission = false;
var causedeletepermission = false;
var causeviewpermission = false;
var causecontentload = false;

var concreatepermission = false;
var coneditpermission = false;
var condeletepermission = false;
var conviewpermission = false;
var concontentload = false;

var comcreatepermission = false;
var comeditpermission = false;
var comdeletepermission = false;
var comviewpermission = false;
var comcontentload = false;
let riskMatrix = {};

var plancreatepermission = false;
var planeditpermission = false;
var plandeletepermission = false;
var planviewpermission = false;
var plancontentload = false;

var actioncreatepermission = false;
var actioneditpermission = false;
var actiondeletepermission = false;
var actionviewpermission = false;
var actioncontentload = false;
var monitoringname = "";

let urlparams = (new URL(document.location)).searchParams;
let currentriskId = urlparams.get("riskId");
let currentkpiId = urlparams.get("kpiId");
let urlriskid = localStorage.getItem("riskcountId");
let urldateperiod = localStorage.getItem("riskcountdate");

let pageNo = urlparams.get("pageId");
var datePeriod = $('#datePeriod').val().toString();
var commentdesc = "";


function displayOptionText(type, value) {
	console.log(type + " ::: " + value)
	if (optionTexts[type] != null) {
		var text = optionTexts[type][value] || value; // Retrieve the display text using the value
		console.log("Display text for value", value, "is", text);
		// Here you can update the DOM or perform other actions with the retrieved text
		return text;
	} else {
		return value;
	}
}

function getriskoptions() {
	$.ajax({
		type: "GET",
		url: "/stratroom/riskoptionlist",
		async: false,
		success: function (data) {
			riskoptions = data;
			$('#cause-rating-select').find('option').not(':first').remove();
			$('#conq-rating-select').find('option').not(':first').remove();

			$('#cause_riskcategory_select').find('option').not(':first').remove();
			$('#cause-possible-select').find('option').not(':first').remove();
			$('#conq-possible-select').find('option').not(':first').remove();

			$('#riskcategory-select').find('option').not(':first').remove();
			$('#conq-impactcategory-select').find('option').not(':first').remove();


			$('#possibility-category-select').find('option').not(':first').remove();

			$('#plan-category-select').find('option').not(':first').remove();

			$('#plan-controltypes-select').find('option').not(':first').remove();
			$('#plan-controleffectiveness-select').find('option').not(':first').remove();
			$('#plan-action-select').find('option').not(':first').remove();
			$('#treatment-action-select').find('option').not(':first').remove();


			// Iterate through the riskoptions and add them to the select element
			$.each(riskoptions, function (index, riskoption) {

				if (!optionTexts[riskoption.type]) {
					optionTexts[riskoption.type] = {}; // Create a sub-object for the type if it doesn't exist
				}
				// Append option to the relevant select element (not shown) and store the text
				optionTexts[riskoption.type][riskoption.value] = riskoption.option;


				if (riskoption.type === "rating") {
					$('#cause-rating-select').append($('<option>', {
						value: riskoption.value,
						text: riskoption.option
					}));

					$('#conq-rating-select').append($('<option>', {
						value: riskoption.value,
						text: riskoption.option
					}));
				}
				if (riskoption.type === "action") {
					$('#plan-action-select').append($('<option>', {
						value: riskoption.value,
						text: riskoption.option
					}));

					$('#treatment-action').append($('<option>', {
						value: riskoption.value,
						text: riskoption.option
					}));



				}

				if (riskoption.type === "riskcategory") {

					$('#cause_riskcategory_select').append($('<option>', {
						value: riskoption.value,
						text: riskoption.option
					}));
				}

				if (riskoption.type === "possible") {
					$('#cause-possible-select').append($('<option>', {
						value: riskoption.value,
						text: riskoption.option
					}));
					$('#conq-possible-select').append($('<option>', {
						value: riskoption.value,
						text: riskoption.option
					}));
				}

				if (riskoption.type === "category") {

					$('#riskcategory-select').append($('<option>', {
						value: riskoption.value,
						text: riskoption.option
					}));
					$('#conq-impactcategory-select').append($('<option>', {
						value: riskoption.value,
						text: riskoption.option
					}));
					$('#plan-category-select').append($('<option>', {
						value: riskoption.value,
						text: riskoption.option
					}));

					$('#possibility-category-select').append($('<option>', {
						value: riskoption.value,
						text: riskoption.option
					}));




				}

				if (riskoption.type === "controltypes") {

					$('#plan-controltypes-select').append($('<option>', {
						value: riskoption.value,
						text: riskoption.option
					}));
				}


				if (riskoption.type === "controleffectiveness") {

					$('#plan-controleffectiveness-select').append($('<option>', {
						value: riskoption.value,
						text: riskoption.option
					}));
				}


			});
			console.log(optionTexts);
		}
	});
}


function getriskcustomscore() {
	$.ajax({
		type: "GET",
		url: "/stratroom/riskcustomscore",
		async: false,
		success: function (data) {
			customscore = data;

			$('#plan-likelihood-select').find('option').not(':first').remove();
			$('#plan-impact-select').find('option').not(':first').remove();
			$('#cause-likelihood-select').find('option').not(':first').remove();
			$('#cause-impact-select').find('option').not(':first').remove();
			$('#conq-impact-select').find('option').not(':first').remove();

			$('#conq-likelihood-select').find('option').not(':first').remove();

			$('#Likelihood-select').find('option').not(':first').remove();
			$('#impact-select').find('option').not(':first').remove();

			$('#possibility-likelihood-select').find('option').not(':first').remove();
			$('#possibility-impact-select').find('option').not(':first').remove();


			$.each(customscore, function (index, custom) {


				if (custom.priority > 5) {
					likelihoodmap.set(custom.score, custom.priority);
					$('#cause-likelihood-select').append($('<option>', {
						value: custom.score,
						text: custom.description
					}));
					$('#plan-likelihood-select').append($('<option>', {
						value: custom.score,
						text: custom.description
					}));
					$('#conq-likelihood-select').append($('<option>', {
						value: custom.score,
						text: custom.description
					}));
					$('#possibility-likelihood-select').append($('<option>', {
						value: custom.score,
						text: custom.description
					}));
					$('#Likelihood-select').append($('<option>', {
						value: custom.score,
						text: custom.description
					}));
				} else {
					impactmap.set(custom.score, custom.priority);
					$('#impact-select').append($('<option>', {
						value: custom.score,
						text: custom.description
					}));
					$('#plan-impact-select').append($('<option>', {
						value: custom.score,
						text: custom.description
					}));
					$('#cause-impact-select').append($('<option>', {
						value: custom.score,
						text: custom.description
					}));
					$('#conq-impact-select').append($('<option>', {
						value: custom.score,
						text: custom.description
					}));
					$('#possibility-impact-select').append($('<option>', {
						value: custom.score,
						text: custom.description
					}));
				}

			})


			const impacts = customscore.filter(item => item.priority <= 5).map(item => item.score);
			const likelihoods = customscore.filter(item => item.priority >= 6).map(item => item.score);

			// Define the risk level mapping (you can adjust this logic based on your risk assessment criteria)
			const riskLevels = ['Very Low', 'Low', 'Tolerable', 'High', 'Very High'];

			// Construct the risk matrix
			impacts.forEach((impact, i) => {
				riskMatrix[impact] = {};
				likelihoods.forEach((likelihood, j) => {
					// Example mapping logic (you can adjust this based on your actual risk assessment criteria)
					let riskIndex = Math.min(i + j, riskLevels.length - 1);
					riskMatrix[impact][likelihood] = riskLevels[riskIndex];
				});
			});
		}
	});
}



function getPriorityFromlikelihood(score) {
	return likelihoodmap.get(score);
}
function getPriorityFromlimpactscore(score) {
	return impactmap.get(score);
}
function riskpagepreference() {
	if (jQuery.isEmptyObject(riskpreference)) {
		$.ajax({
			url: "/stratroom/getPreferences?pageName=RISK&pageId=" + pageNo,
			async: false,
			success: function (employeeList) {
				riskpreference = employeeList;
			}
		});
	}
}

$(document).ready(function () {
	getriskoptions();
	getriskcustomscore();

	$(document).on('click', '#tableTabID3', function () {
		// Toggle the display of the chart and table

		$('#charttableheat').toggleClass('d-none');
		$('#cardtableheat').toggleClass('d-none');

	});


	$('#relatedparties_select').select2({
		placeholder: 'Choose Related Parties',
		allowClear: true
	})

});

$(document).on('blur', ".editableTxt1", function () {
	var elementId = $(this).attr("id");
	var oldelementValue = $(this).attr("data-old" + elementId);
	var elementValue = $(this).text().trim();
	var elementObj = {};
	var elementOldObj = {};
	elementObj[elementId] = elementValue;
	elementOldObj[elementId] = oldelementValue;

	if (elementValue != oldelementValue) {
		$(this).attr("data-old" + elementId, elementValue);
		$("#" + elementId)
			.append(
				'<span id="inlineloader"><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>');
		handleInlineEditSave(elementObj, elementOldObj,
			riskupdateDescription);
	}
});

function handleInlineEditSave(elementObjectKeyValue, elementOldObj, item) {
	if (item == undefined || item == "" || item == " " || item.id == undefined
		|| item.id == "") {
		$.notify("data is invalid", {
			style: 'error',
			className: 'graynotify'
		});
		return false;
	}

	var riskupdateDescription = getRiskObj('edit');
	$.each(elementObjectKeyValue, function (key, value) {
		riskupdateDescription["riskValue"][key] = value;
	});

	var methodType = 'put';
	$.ajax({
		url: "/stratroom/risk/",
		type: methodType,
		contentType: "application/json",
		data: JSON.stringify(riskupdateDescription),
		success: function (data, status) {
			$("body span#inlineloader").remove();
			$.each(elementObjectKeyValue, function (key, value) {
				$("#" + key).text(value);
				if (key == "commentheader") {
					$("#" + key).attr("data-oldcommentheader", value);
				}
				if (key == "causeheader") {
					$("#" + key).attr("data-oldcauseheader", value);
				} if (key == "planheader") {
					$("#" + key).attr("data-oldplanheader", value);
				}  if (key == "treatmentheader") {
					$("#" + key).attr(" data-oldtreatmentheader", value);
				}if (key == "monitoringheader") {
					$("#" + key).attr("data-oldmonitoringheader", value);
				} if (key == "chartheader") {
					$("#" + key).attr("data-oldchartheader", value);
				}
			});

			$.notify("Updated Successfully", {
				style: 'success',
				className: 'graynotify'
			});
		},
		error: function (msg, status) {

			$.each(elementOldObj, function (key, value) {
				$("#" + key).text(value);
			});
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
				$("body span#inlineloader").remove();
			}
			$("body span#inlineloader").remove();
		}
	});
}

function populateRiskDetails(data) {

	localStorage.setItem("risk_pagenumber", data.pageId);
	selectedriskid=data.id;

	
			$('#risk_top_details').empty();
			$('#causeconsequencebody').empty();
			$('#riskreducingimpactbody').empty();
			$('#riskreviewmonitoringbody').empty();
			$('#riskcomments').empty();
			riskdescSuccessCallback(data, data.id);
		

}


function handleRiskActivitiesEvent(data, changeId) {

	$("#riskActionmonitoringForm").css('display', 'none');
	$("#riskActionmonitoringForm").trigger("reset");
	$('#risk_action_desc_popup').modal('toggle');
	$("#riskActionmonitoringForm input[name='riskaction_id']").val(data.id);
	$("#riskActionmonitoringForm input[name='id']").val(data.id);
	$("#riskActionmonitoringForm input[name='riskPlanId']").val(data.riskPlanId.id);
	$("#activitieschangeid").val(changeId);
	$("#riskPlanId").val(data.riskPlanId.id);
	pageNo=data.pageId;

		$("#riskaction_id_wrapper").css('display', 'block');
		$('#risk_action_desc_popup #riskaction_id').prop("disabled", true);
		formvalidationerrorreset();
		riskActivitiesSuccessCallback(data, changeId)
	
}

function riskActivitiesSuccessCallback(activitiesData, changeId) {
	$("#riskActionmonitoringForm").css('display', 'block');
	$('#riskaction_id').val(activitiesData.id);
	$("#activitieschangeid").val(changeId);

	var activitiesValue = JSON.parse(activitiesData.riskActivitiesValue);
	$('#possibility-name').val(activitiesValue.name);
	$('#riskPlanId').val(activitiesData.riskPlanId.id);
	$("#possibility-category-select").val(activitiesValue.category);
	$("#possibility-controltypes-select").val(activitiesValue.controltype);
	$("#possibility-controleffectiveness-select").val(activitiesValue.controleffectiveness);
	$("#possibility-likelihood-select").val(activitiesValue.likelihood);
	$("#possibility-impact-select").val(activitiesValue.impact);
	$("#possibility-score").val(activitiesValue.score);
	$("#possibility-resolve-by").val(activitiesValue.resolveby);
	$("#possibility-status-select").val(activitiesValue.status);
	$("#possibility-progress").val(activitiesValue.progress);

	$("#riskActionCreatedBy").html(activitiesValue.ownerName);
	$("#riskActionUpdatedBy").html(activitiesValue.updatedByName);
	$("#riskActionCreatedByDate").html(activitiesData.createDateString);
	$("#riskActionUpdatedByDate").html(activitiesData.updatedDateString);
}

function getRiskActivitiesObj() {
	var mileStoneObj = {
		"createdBy": currentEmp,
		"changeId": $("#activitieschangeid").val(),
		"owner": currentEmp,
		"active": 0,
		"riskActivitiesValue": {
			"name": $("#possibility-name").val(),
			"progress": $("#possibility-progress").val(),
			"resoleveby": $("#possibility-resolve-by").val(),
			"status": $("#possibility-status-select").val(),
			"riskPlanId": $("#riskPlanId").val(),
			"category": $("#possibility-category-select").val(),
			"controltype": $("#possibility-controltypes-select").val(),
			"controleffectiveness": $("#possibility-controleffectiveness-select").val(),
			"likelihood": $("#possibility-likelihood-select").val(),
			"impact": $("#possibility-impact-select").val(),
			"score": $("#possibility-score").val(),
			"resolveby": $("#possibility-resolve-by").val()


		}
	}
	return mileStoneObj;
}

function handleRiskActivitiesSave() {
	var action = $("#riskActionPlanId").val();
	
		var activitiesObj = getRiskActivitiesObj();
		activitiesObj.riskPlanId = $("#riskPlanId").val();
		var methodType = 'post';
		if ($("#riskaction_id").val() !== '') {
			activitiesObj.id = $("#riskaction_id").val();
			methodType = 'put';
		}

		activitiesObj.pageId=pageNo;

		$.ajax({
			url: "/stratroom/riskActivities/",
			type: methodType,
			contentType: "application/json",
			data: JSON.stringify(activitiesObj),
			success: function (data, status) {
				localStorage.setItem("reload", "1");

				location.reload(true);
			}
		});
	
}

function deleteRiskActivities(activitiesId) {
	$("#deleterecordid").val(activitiesId);
	$("#deleterecordtype").val("riskActivities");
	$('#deleteModalrisk').modal('toggle');
	$(window).on("resize", function () {
		$(".modal:visible").each(alignModal);
	});
	$(".modal").on("shown.bs.modal", alignModal);
	/*
	 * var methodType = 'delete' $.ajax({ url : "/stratroom/riskActivities/" +
	 * activitiesId, type : methodType, contentType : "application/json",
	 * success : function(data, status) { location.reload(true);
	 * console.log("activities was deleted"); } });
	 */

}

// RiskPlan Changes

function deleteRiskPlan(planId) {
	$("#deleterecordid").val(planId);
	$("#deleterecordtype").val("plan");
	$('#deleteModalrisk').modal('toggle');
	$(window).on("resize", function () {
		$(".modal:visible").each(alignModal);
	});
	$(".modal").on("shown.bs.modal", alignModal);
	/*
	 * var methodType = 'delete' $.ajax({ url : "/stratroom/riskPlan/" + planId,
	 * type : methodType, contentType : "application/json", success :
	 * function(data, status) { location.reload(true); console.log("activities
	 * was deleted"); } });
	 */
}

function handleriskeventdelete() {

	var id = $("#deleterecordid").val();
	var typeofdeleteurl = $("#deleterecordtype").val();
	if (id == "" || typeofdeleteurl == "") {
		return false;
	}
	var url = "";
	var flag = false;
	if (typeofdeleteurl == "plan") {
		url = "/stratroom/riskPlan/" + id;
	} else if (typeofdeleteurl == "risk") {
		url = "/stratroom/risk/" + id;
		flag = true;
	} else if (typeofdeleteurl == "monitoring") {
		url = "/stratroom/riskMonitoring/" + id;
	} else if (typeofdeleteurl == "cause") {
		url = "/stratroom/riskCause/" + id;
	} else if (typeofdeleteurl == "riskConsequence") {
		url = "/stratroom/riskConsequence/" + id;
	} else if (typeofdeleteurl == "riskComments") {
		url = "/stratroom/riskComments/" + id;
	} else if (typeofdeleteurl == "riskActivities") {
		url = "/stratroom/riskActivities/" + id;
	} else if (typeofdeleteurl == "RiskMonitoring") {
		url = "/stratroom/riskMonitoring/" + id;
	}

	$.ajax({
		url: url,
		type: "delete",
		contentType: "application/json",
		success: function (data, status) {
			if (flag == true) {
				localStorage.setItem("risk_pagenumber", "");
			}

			location.reload(true);
		},
		error: readErrorMsg
	});
}



function handleRiskPlanEvent(data, changeId) {
	$("#riskPlanForm").css('display', 'none');
	$("#riskPlanForm").trigger("reset");
	$('#plan_desc_add_popup').modal('toggle');
	$("#riskPlanForm input[name='riskId']").val(data.riskId.id);
	pageNo=data.pageId;
	
		$("#riskplan_id_wrapper").css('display', 'block');
		formvalidationerrorreset();
		$('#plan_desc_add_popup #riskplan_id').prop("disabled", true);
		$('#riskPlanForm #plancause-select').find('option').remove().end();
		$('#riskPlanForm #plancause-select')
			.append(`<option value="">Choose</option>`);
		populateCauseList('#riskPlanForm #plancause-select', data.riskId.id);
			
		 riskPlanSuccessCallback(data, changeId)
		
}





function handleRiskTreatmentEvent(data, changeId) {
	$("#riskTreatmentForm").css('display', 'none');
	$("#riskTreatmentForm").trigger("reset");
	$('#risk_treatment_add_popup').modal('toggle');
	$('#riskTreatmentChangeId').val(changeId);
	$("#riskTreatmentForm input[name='riskId']").val(data.riskId.id);
	pageNo=data.pageId;

		$("#risktreatment_id_wrapper").css('display', 'block');
		formvalidationerrorreset();
		$('#risktreatment_id').prop("disabled", true);
		
	riskTreatmentSuccessCallback(data, changeId)
		
}

function riskTreatmentSuccessCallback(detailObj,changeId) {
	$("#riskTreatmentForm").css('display', 'block');
	$('#riskTreatmentChangeId').val(changeId);

	$('#riskId').val(detailObj.riskId.id);
	$('#risktreatment_id').val(detailObj.id);
	var riskplanvalue = JSON.parse(detailObj.riskPlanValue);
	$('#treatment-action').val(riskplanvalue.action);

	$('#treatment-impact').val(riskplanvalue.reducingimpact);
	$('#treatment-possibility').val(riskplanvalue.reducingpossibility);
	$('#treatment-kpi_start_end_date').val(riskplanvalue.timetarget);
	$('#treatment-progress').val(riskplanvalue.progress);

	// $("#riskPlanCreatedById").val(detailObj.createdBy);
	$("#riskTreatmentCreatedBy").html(riskplanvalue.ownerName);
	$("#riskTreatmentUpdatedBy").html(riskplanvalue.updatedByName);
	$("#riskTreatmentCreatedByDate").html(detailObj.createDateString);
	$("#riskTreatmentUpdatedByDate").html(detailObj.updatedDateString);
}


function riskPlanSuccessCallback(detailObj, changeId) {

	$("#planchangeId").val(changeId)
	$("#riskPlanForm").css('display', 'block');
	$('#riskId').val(detailObj.riskId.id);
	$('#riskplan_id').val(detailObj.id);
	var riskplanvalue = JSON.parse(detailObj.riskPlanValue)
	$('#plantype-select').val(riskplanvalue.type);
	$('#plancause-select').val(riskplanvalue.cause);
	$('#riskplan_name').val(riskplanvalue.name);
	$("#planresolveby").val(riskplanvalue.resolveDate);
	$("#plan-controltypes-select").val(riskplanvalue.controlTypes)
	$("#plan-controleffectiveness-select").val(riskplanvalue.controleffectiveness)
	$("#plan-category-select").val(riskplanvalue.category)
	$("#plan-likelihood-select").val(riskplanvalue.likelihood)
	$("#plan-impact-select").val(riskplanvalue.impact)
	$("#plan-score").val(riskplanvalue.planscore)
	$("#plan-progress-name").val(riskplanvalue.progress)
	$("#plan-action-select").val(riskplanvalue.action)

	$("#riskPlanCreatedById").val(detailObj.createdBy);
	$("#riskPlanCreatedBy").html(riskplanvalue.ownerName);
	$("#riskPlanUpdatedBy").html(riskplanvalue.updatedByName);
	$("#riskPlanCreatedByDate").html(detailObj.createDateString);
	$("#riskPlanUpdatedByDate").html(detailObj.updatedDateString);
}

function getRiskPlanObj(typeFlag) {
	var riskplanpro = $("#riskplan_progress").val();
	var changeId = 	$("#planchangeId").val()
	var mileStoneObj = {
		"createdBy": $("#riskPlanCreatedById").val(),
		"owner": currentEmp,
		"typeFlag": typeFlag,
		"changeId":changeId,
		"riskPlanValue": {
			"action": $("#plan-action-select").val(),
			"name": $("#riskplan_name").val(),
			"progressval": $("#riskplan_progress").val(),
			"resolveDate": $("#planresolveby").val(),
			"cause": $("#riskcause").val(),
			"riskId": $('#riskId').val(),
			"type": $('#plantype-select').val(),
			"cause": $('#plancause-select').val(),
			"controlTypes": $("#plan-controltypes-select").val(),
			"controleffectiveness": $("#plan-controleffectiveness-select").val(),
			"category": $("#plan-category-select").val(),
			"likelihood": $("#plan-likelihood-select").val(),
			"impact": $("#plan-impact-select").val(),
			"planscore": $("#plan-score").val(),
			"progress": $("#plan-progress-name").val()
		}
	}
	return mileStoneObj;
}

function getRiskTreatmentObj(typeFlag) {
	var mileStoneObj = {
		"createdBy": $("#riskTreatmentCreatedById").val(),
		"owner": currentEmp,
		"typeFlag": typeFlag,
		"riskId": $("#riskId").val(),
		"riskPlanValue": {
			"action": $("#treatment-action").val(),
			"reducingimpact": $("#treatment-impact").val(),
			"reducingpossibility": $("#treatment-possibility").val(),
			"timetarget": $('#treatment-kpi_start_end_date').val(),
			"progress": $('#treatment-progress').val()
		}
	}
	console.log(mileStoneObj);
	return mileStoneObj;
}



function handleRiskPlanSave(type) {

	var actiontreatment = $("#risktreatmentaction").val();

		var serviceObj = getRiskPlanObj(type);

		
		if (type === "RiskTreatment") {
			serviceObj = getRiskTreatmentObj(type);
		}
		serviceObj.riskId = $('#riskId').val();
		if (serviceObj.typeFlag == "RiskMonitoring") {
			serviceObj["riskPlanValue"]["status"] = "Open";
		}
		console.log(serviceObj);

		var methodType = 'post';
			if (type === "RiskTreatment") {
				if($("#risktreatment_id").val() != "" && $("#risktreatment_id").val() !== undefined && $("#risktreatment_id").val() !== 0)
				{
					serviceObj.id = $("#risktreatment_id").val();
					methodType = 'put';
				}

			} else {
				if($("#riskplan_id").val() != "" && $("#riskplan_id").val() !== undefined)
				{
					serviceObj.id = $("#riskplan_id").val();
					methodType = 'put';
					}

			}

		

		if ($("#plans_selected_user_" + serviceObj.id).val()) {
			serviceObj.multipleOwners = $(
				"#plans_selected_user_" + serviceObj.id).val();
		} else {
			serviceObj.multipleOwners = currentEmp;
		}

		serviceObj.pageId=pageNo;

		$.ajax({
			url: "/stratroom/riskPlan/",
			type: methodType,
			contentType: "application/json",
			data: JSON.stringify(serviceObj),
			success: function (data, status) {
				localStorage.setItem("reload", "1");

				location.reload(true);
				$("#riskPlanClosePopup").click();
				console.log("New activities was created..");
			}
		});
}


// RiskMonitoring Changes
function deleteRiskMonitor(id) {
	$("#deleterecordid").val(id);
	$("#deleterecordtype").val("monitoring");
	$('#deleteModalrisk').modal('toggle');
	$(window).on("resize", function () {
		$(".modal:visible").each(alignModal);
	});
	$(".modal").on("shown.bs.modal", alignModal);

	/*
	 * var methodType = 'delete' $.ajax({ url : "/stratroom/riskMonitoring/" +
	 * id, type : methodType, contentType : "application/json", success :
	 * function(data, status) { location.reload(true); console.log("activities
	 * was deleted"); } });
	 */

}

function handleReviewMonitoringEvent(data, changeId) {

	console.log("Review Monitoring")

	$('.risk_monitoring_popup').modal('toggle');
	$('#riskMonitorChangeId').val(changeId)
	$("#riskMonitorForm").trigger("reset");
	$("#monitoringriskId").val(data.riskId.id);

	pageNo=data.pageId;


		$('.risk_monitoring_popup #riskMonitor_riskid').prop("disabled", true);
		
			riskMonitorSuccessCallback(data,changeId)

	
}

function riskMonitorSuccessCallback(detailObj,changeId) {
	riskmonitoringupdateDescription = detailObj;
	$('#riskMonitorChangeId').val(changeId)

	$('#monitoringriskId').val(detailObj.riskId.id);
	$('#riskMonitor_riskid').val(detailObj.id);
	$('#riskaction_id').val(detailObj.id);
	var monitoringValue = JSON.parse(detailObj.riskPlanValue);
	$('#monitoring_plan').val(monitoringValue.mitigation);
	$('#monitoring_notes').val(monitoringValue.notes);
	$('#monitoring_completion').val(monitoringValue.targettime);
	$('#monitoring_changes-target_time').val(monitoringValue.changestime);
	$('#monitoring_progress').val(monitoringValue.progress);
	$('#monitoring_status').val(monitoringValue.status);
	$('#monitoring_person').val(monitoringValue.person);


	$("#riskMonitorCreatedBy").html(monitoringValue.ownerName);
	$("#riskMonitorUpdatedBy").html(monitoringValue.updatedByName);
	$("#riskMonitorCreatedByDate").html(detailObj.createDateString);
	$("#riskMonitorUpdatedByDate").html(detailObj.updatedDateString);
}

function getRiskMonitorObj() {
	var mileStoneObj = {
		"createdBy": currentEmp,
		"changeId":$('#riskMonitorChangeId').val(),
		"owner": currentEmp,
		"riskId": $("#monitoringriskId").val(),
		"active": 0,
		"typeFlag": "RiskMonitoring",
		"riskPlanValue": {
			"mitigation": $("#monitoring_plan").val(),
			"notes": $("#monitoring_notes").val(),
			"targettime": $("#monitoring_completion").val(),
			"changestime": $("#monitoring_changes-target_time").val(),
			"progress": $("#monitoring_progress").val(),
			"status": $("#monitoring_status").val(),
			"person": $("#monitoring_person").val()
		}
	}
	console.log(mileStoneObj)

	mileStoneObj['multipleOwners'] = riskmonitoringupdateDescription.multipleOwners;
	$.each(riskmonitoringupdateDescription.riskMonitoringValue, function (
		riskindex, value) {
		if (riskindex != "name" && riskindex != "status"
			&& riskindex != "resolveDate") {
			mileStoneObj["riskPlanValue"][riskindex] = value;
		}
	});

	return mileStoneObj;
}

function handleRiskMonitorSave() {
	var action = $("#monitoring-action").val();

	
		var serviceObj = getRiskMonitorObj();
		console.log(serviceObj,"risk monitoring")
		serviceObj.riskId = $("#monitoringriskId")
			.val();
		var methodType = 'post';
			if($("#riskMonitor_riskid").val() !=="" && $("#riskMonitor_riskid").val() !== 0)
			{
				serviceObj.id = $("#riskMonitor_riskid").val();
				methodType = 'put';
			}

		
		if ($("#monitoring_selected_user_" + serviceObj.id).val()) {
			serviceObj.multipleOwners = $(
				"#monitoring_selected_user_" + serviceObj.id).val();
		} else {
			serviceObj.multipleOwners = currentEmp;
		}


		serviceObj.riskPlanValue.mitigation = $("#monitoring_plan").val();
		serviceObj.riskPlanValue.notes = $("#monitoring_notes").val();
		serviceObj.riskPlanValue.targettime = $("#monitoring_completion").val();
		serviceObj.riskPlanValue.changestime = $("#monitoring_changes-target_time").val();
		serviceObj.riskPlanValue.progress = $("#monitoring_progress").val();
		serviceObj.riskPlanValue.status = $("#monitoring_status").val();
		serviceObj.riskPlanValue.person = $("#monitoring_person").val();
		serviceObj.pageId=pageNo;
		$.ajax({
			url: "/stratroom/riskPlan/",
			type: methodType,
			contentType: "application/json",
			data: JSON.stringify(serviceObj),
			success: function (data, status) {
				localStorage.setItem("reload", "1");

				location.reload(true);
			}
		});
}

// Risk Detail Changes
function riskDetailPopSuccessCallback(riskDetailData, changeId) {
	console.log(changeId)

	$('#riskDetail_id').val(riskDetailData.id);
	$('#riskDetailChangeId').val(changeId)
	if (riskDetailData.riskUniqueId) {
		$('#riskUniqueId').val(riskDetailData.riskUniqueId);

	} else {
		$('#riskUniqueId').val("");
	}

	var riskValue = JSON.parse(riskDetailData.riskValue);

	var startdate = new Date(riskValue.dateRaised);

	// $('#risk_owner').val(riskDetailData.owner);
	$('#riskDetail_name').val(riskValue.name);
	$('#riskcategory-select').val(riskValue.riskcategory).trigger("chosen:updated");
	$('#calculate_status').val(riskValue.riskStatus);
	$('#calculate_score').val(riskValue.score);
	$("#riskDetail_dateRaised").val(riskDetailData.createdTime);
	$("#businessimpact").val(riskDetailData.impactId).trigger("chosen:updated");
	$("#Initiative_Department").val(riskValue.departmentId).trigger("chosen:updated");
	if (riskValue.relatedparties) {
		var partiesArray = riskValue.relatedparties.split(',');
		$("#relatedparties_select").val(partiesArray).trigger('change');

	}

	$("#impact-select").val(riskValue.impact).trigger("chosen:updated");


	$("#financialimpact").val(riskValue.financialImpact);
	$("#Likelihood-select").val(riskValue.likeliHood).trigger("chosen:updated");
	$("#riskDetail_description").val(riskValue.desc);
	$("#raise_date").val(riskValue.dateRaised);
	$("#department").val(riskValue.departmentId);
	$("#riskDetail_complete_date").val(riskValue.dateCompleted);
	$("#riskDetail_next_date").val(riskValue.nextAssessment);
	$("#riskDetail_areaImpact").val(riskValue.areaImpact);
	$("#riskkpicheck").prop('checked', riskValue.riskkpicheck);

	$("#riskposcheck").prop('checked', riskValue.riskposcheck);

	$("#riskisocheck").prop('checked', riskValue.riskisocheck);
	$("#riskinformatiomassetcheck").prop('checked', riskValue.riskinformatiomassetcheck);
	$("#riskotherscheck").prop('checked', riskValue.riskotherscheck);

	$("#riskposval").val(riskValue.riskpos);
	$("#riskisoval").val(riskValue.riskiso);
	$("#riskinformationassetval").val(riskValue.riskinformationasset);
	$("#riskothersval").val(riskValue.riskothers);


	// $("#riskdetail_status").val(riskDetailData.riskValue.status);
	$("#impact").val(
		riskValue.impact);
	$("#riskDetailCreatedById").val(riskDetailData.createdBy);
	$("#riskDetailCreatedBy").html(riskValue.createdByName);
	$("#riskDetailUpdatedBy").html(riskValue.updatedByName);
	$("#riskDetailCreatedByDate").html(riskDetailData.createDateString);
	$("#riskDetailUpdatedByDate").html(riskDetailData.updatedDateString);
	/*
	 * $('.imgprofile').initial({ charCount : 2, height : 30, width : 30,
	 * fontSize : 16 });
	 */
}

function deleteRiskDetail(id) {
	$("#deleterecordid").val(id);
	$("#deleterecordtype").val("risk");
	$('#deleteModalrisk').modal('toggle');
	$(window).on("resize", function () {
		$(".modal:visible").each(alignModal);
	});
	$(".modal").on("shown.bs.modal", alignModal);

}


function populateOwnerDropdowndepartment(elementId) {
	console.log(elementId)
	// var numberOfOptions = $(elementId + ' > option').length;
	$.ajax({
		url: "/stratroom/allDepartmentList",
		async: false,
		success: function (data) {
			$.each(data, function (index, reportee) {
				addOption(elementId, reportee.name, reportee.name)
			});
		}
	});
	
}
// function populateOwnerDropdowndepartment(elementId) {
//     console.log(elementId);
//     var numberOfOptions = $(elementId + ' > option').length;
//     $.ajax({
//         url: "/stratroom/allDepartmentList",
//         async: false,
//         success: function (data) {
//             $.each(data, function (index, reportee) {
//                 addOption(elementId, reportee.name, reportee.name);
//                 // Set the value of the input field with the reportee.id
//                 $('#initiative_dept').val(reportee.id);
				
//             });
			
//         }
//     });
// }



function handleRiskDetailEvent(riskdata, changeId) {
	console.log("getting invoked now")
	console.log(changeId)
	$("#riskDetailForm").trigger('reset');
	$("#riskDetailChangeId").val(changeId)
	$('#riskDetail_description_popup').modal('show');
	// populateKPIList('.riskDetail_description_popup #riskDetail_areaImpact');
	$('#strength_impact').find('option').remove().end();
	// $('#Initiative_Department').find('option').remove().end();
	$('.riskDetail_description_popup #Initiative_Department').append(
		`<option value="">Choose</option>`);
	$('#monitoring_person').find('option').remove().end();
	$('#relatedparties_select').find('option').remove().end();

	$('.riskDetail_description_popup #businessimpact').append(
		`<option value="">Choose</option>`);
	populateKPIList('.riskDetail_description_popup #businessimpact');
	populateOwnerDropdowndepartment('.riskDetail_description_popup #Initiative_Department');

	populateOwnerDropdowndepartment('.riskDetail_description_popup #relatedparties_select');

	$('.chosen-select')
		.chosen({})
		.change(
			function (obj, result) {
				$(".chosen-container-single").find('label.error')
					.remove();
			});
	$(".chosen-container-single").css("width", "100%");

	$('#raise_date').datepicker({
		language: 'en',
		autoClose: true,
		position: "top left",
		todayButton: true,
		onSelect: function (fd) {
			var startdate = new Date(fd);
			startdate = startdate.setDate(startdate.getDate() + 1);
			startdate = new Date(startdate);
			$('#riskDetail_complete_date').datepicker({
				language: 'en',
				minDate: startdate,
				autoClose: true,
				position: "top left",
				todayButton: true,
				onSelect: function (fd) {
					var nextdate = new Date(fd);
					nextdate = nextdate.setDate(nextdate.getDate() + 1);
					nextdate = new Date(nextdate);
					$('#riskDetail_next_date').datepicker({
						language: 'en',
						minDate: nextdate,
						autoClose: true,
						position: "top left",
						todayButton: true,
						onSelect: function (fd) {
							// $('.datepickers-container').hide();
						}
					});
				}
			});
		}
	});

		$('.riskDetail_description_popup #riskDetail_id')
			.prop("disabled", true);
		$('.riskDetail_description_popup #riskUniqueId')
			.prop("disabled", true);
		formvalidationerrorreset();
		pageNo=riskdata.pageId.id;
		riskDetailPopSuccessCallback(riskdata, changeId)
	}


function handleRiskDetailSave() {
	var action = $("#riskDetailaction").val();
	var id = $('#riskDetail_id').val();
	var riskDetailChangeId = $('#riskDetailChangeId').val();

		var riskDetail = getRiskDetailObj();
		var methodType = 'post';
		 if (id !== '' && id !== undefined && id !== '0') {
			riskDetail.id = $("#riskDetail_id").val();
			riskDetail.riskUniqueId = $("#riskUniqueId").val();
			methodType = 'put';
		}

		if(riskDetailChangeId !== '' && riskDetailChangeId !== undefined  && riskDetailChangeId !== '0' )
		{
			riskDetail.changeId = riskDetailChangeId
		}
		console.log(riskDetail)
		riskDetail.pageId = (pageNo != "" && pageNo != null ? pageNo : "");

		$.ajax({
			url: "/stratroom/risk/",
			type: methodType,
			contentType: "application/json",
			data: JSON.stringify(riskDetail),
			success: function (data, status) {
				if (action != "add") {
					localStorage.setItem("reload", "1");

					location.reload(true);

				} else if (action == "add" && data.flag != undefined
					&& data.flag == true
					&& data.riskDTO != undefined) {
						localStorage.setItem("reload", "1");

					// risksidebarappend(data.riskDTO);
					location.reload(true);
				}else{
					location.reload(true);

				}
				// $("#riskDetailClosePopup").click();
				// console.log("New risk was created..");
			}
		});
	
}


function getRiskDetailObj() {
	var DataObj = {
		"riskValue": {}
	};
	console.log($('#riskUniqueId').val())
	
		var selectedOptions = $('#relatedparties_select').val(); // This will be an array of selected values
		var commaSeparated = selectedOptions.join(','); // Join the array into a comma-separated string

		var DataObj = {
			"createdBy": $("#riskDetailCreatedById").val(),
			"riskUniqueId": $("#riskUniqueId").val(),
			"impactId": $("#businessimpact").val(),
			// "departmentId": $("#Initiative_Department").val(),
			"owner": currentEmp,
			"riskValue": {
				"name": $("#riskDetail_name").val(),
				"score": $("#calculate_score").val(),
				"relatedparties": commaSeparated,
				"riskcategory": $("#riskcategory-select").val(),
				"financialImpact": $("#financialimpact").val(),
				"likeliHood": $("#Likelihood-select").val(),
				"impact": $("#impact").val(),
				"departmentId": $("#Initiative_Department").val(),
				"riskcategory": $("#riskcategory").val(),
				"likeliHood": $("#Likelihood").val(),
				"dateRaised": $("#raise_date").val(),
				"businessImpact": $("#businessimpact").val(),
				"financialImpact": $("#financialimpact").val(),
				"desc": $("#riskDetail_description").val(),
				"dateCompleted": $("#riskDetail_complete_date").val(),
				"nextAssessment": $("#riskDetail_next_date").val(),
				// "areaImpact" : $("#riskDetail_areaImpact").val(),
				"riskStatus": $("#calculate_status").val(),
				"riskkpicheck": $("#riskkpicheck").prop('checked'),
				"riskposcheck": $("#riskposcheck").prop('checked'),
				"riskisocheck": $("#riskisocheck").prop('checked'),
				"riskpos": $("#riskposval").val(),
				"riskiso": $("#riskisoval").val(),
				"riskothers": $("#riskothersval").val(),
				"riskinformationasset": $("#riskinformationassetval").val(),
				"riskinformatiomassetcheck": $("#riskinformatiomassetcheck").prop('checked'),
				"riskotherscheck": $("#riskotherscheck").prop('checked')
			}
		}
	

	return DataObj;
}







function updateRiskStatus() {
	var impact = $("#impact-select").val(); // Assuming this returns a string '1' through '5'
	var likelihood = $("#Likelihood-select").val(); // Assuming this returns a string 'A' through 'E'

	if (riskMatrix[impact] && riskMatrix[impact][likelihood]) {
		var status = riskMatrix[impact][likelihood];
		$("#calculate_status").val(status);
		$("#calculate_score").val(likelihood + impact);

	} else {
		$("#calculate_score").val("")
		console.error('Invalid impact or likelihood value:', impact, likelihood);
		// Handle the error (e.g., set a default status or show an error message)
	}
}
function updateRiskStatuscause() {
	var impact = $("#cause-impact-select").val(); // Assuming this returns a string '1' through '5'
	var likelihood = $("#cause-likelihood-select").val(); // Assuming this returns a string 'A' through 'E'

	if (riskMatrix[impact] && riskMatrix[impact][likelihood]) {
		$("#cause-score").val(likelihood + impact);

	} else {
		$("#cause-score").val("")
		console.error('Invalid impact or likelihood value:', impact, likelihood);
		// Handle the error (e.g., set a default status or show an error message)
	}
}


function updateRiskStatuspossibility() {
	var impact = $("#possibility-impact-select").val(); // Assuming this returns a string '1' through '5'
	var likelihood = $("#possibility-likelihood-select").val(); // Assuming this returns a string 'A' through 'E'

	if (riskMatrix[impact] && riskMatrix[impact][likelihood]) {
		$("#possibility-score").val(likelihood + impact);

	} else {
		$("#possibility-score").val("")
		console.error('Invalid impact or likelihood value:', impact, likelihood);
		// Handle the error (e.g., set a default status or show an error message)
	}
}

function updateRiskStatusplan() {
	var impact = $("#plan-impact-select").val(); // Assuming this returns a string '1' through '5'
	var likelihood = $("#plan-likelihood-select").val(); // Assuming this returns a string 'A' through 'E'

	if (riskMatrix[impact] && riskMatrix[impact][likelihood]) {
		$("#plan-score").val(likelihood + impact);

	} else {
		$("#plan-score").val("")
		console.error('Invalid impact or likelihood value:', impact, likelihood);
		// Handle the error (e.g., set a default status or show an error message)
	}
}

function updateRiskStatusconv() {
	var impact = $("#conq-impact-select").val(); // Assuming this returns a string '1' through '5'
	var likelihood = $("#conq-likelihood-select").val(); // Assuming this returns a string 'A' through 'E'

	if (riskMatrix[impact] && riskMatrix[impact][likelihood]) {
		$("#conq-score").val(likelihood + impact);

	} else {
		$("#conq-score").val("")
		console.error('Invalid impact or likelihood value:', impact, likelihood);
		// Handle the error (e.g., set a default status or show an error message)
	}
}

$(document).on("change", "#cause-likelihood-select, #cause-impact-select", updateRiskStatuscause);

$(document).on("change", "#conq-likelihood-select, #conq-impact-select", updateRiskStatusconv);

$(document).on("change", "#plan-likelihood-select, #plan-impact-select", updateRiskStatusplan);

$(document).on("change", "#possibility-likelihood-select, #possibility-impact-select", updateRiskStatuspossibility);

$(document).on("change", "#Likelihood-select, #impact-select", updateRiskStatus);


function deleteRiskCause(id) {
	$("#deleterecordid").val(id);
	$("#deleterecordtype").val("cause");
	$('#deleteModalrisk').modal('toggle');
	$(window).on("resize", function () {
		$(".modal:visible").each(alignModal);
	});
	$(".modal").on("shown.bs.modal", alignModal);
	/*
	 * var methodType = 'delete' $.ajax({ url : "/stratroom/riskCause/" + id,
	 * type : methodType, contentType : "application/json", success :
	 * function(data, status) { location.reload(true); console.log("risk detail
	 * was deleted"); } });
	 */
}
function handleRiskCauseEvent(data, changeId) {
	console.log("cause");
	$("#riskCauseForm").trigger('reset');
	$('.cause_conq_popup').modal('toggle');
	$("#riskCauseForm input[name='riskId']").val(data.riskId.id);
	$("#causeChangeId").val(changeId)

	pageNo=data.pageId;
		$("#riskCauseId_wrapper").css('display', 'block');
		$('.cause_conq_popup #riskCauseId').prop("disabled", true);

		riskCausePopSuccessCallback(data,changeId)
		console.log(data,"data");
	
}

function handleRiskCauseSave() {
		console.log("come in ")
		var riskDetail = getRiskCauseObj();	
		console.log(riskDetail)
		riskDetail.riskId = $("#riskCauseForm input[name='riskId']").val();
		var methodType = 'post';
		 if ($("#riskCauseId").val() !== '') {
			riskDetail.id = $("#riskCauseId").val();
			methodType = 'put';
		}
		$.ajax({
			url: "/stratroom/riskCause/",
			type: methodType,
			contentType: "application/json",
			data: JSON.stringify(riskDetail),
			success: function (data, status) {
				localStorage.setItem("reload", "1");

				location.reload(true);
				$("#riskCauseClosePopup").click();
				console.log("New risk was created..");
			}
		});
	
}

function getRiskCauseObj() {
	var riskDetail = {
		"createdBy": $("#causeCreatedById").val(),
		"changeId" : $("#causeChangeId").val(),
		"causeAndConsequenceValue": {
			"name": $("#riskCauseName").val(),
			"riskRating": $("#cause-rating-select").val(),
			"riskcategory": $("#cause_riskcategory_select").val(),
			"possible": $("#cause-possible-select").val(),
			"likelihood": $("#cause-likelihood-select").val(),
			"impact": $("#cause-impact-select").val(),
			"score": $("#cause-score").val(),
			"description": $("#riskCauseDesc").val()
		}
	}
	return riskDetail;
}

function riskCausePopSuccessCallback(riskDetailData,changeId) {
	console.log(riskDetailData,"riskDetailData");
	$("#riskCauseForm").css('display', 'block');
	$("#causeChangeId").val(changeId)
	$('#riskCauseId').val(riskDetailData.id)
	$("#riskId").val(riskDetailData.riskId);
	$("#causeCreatedById").val(riskDetailData.createdBy);
	var causevalue = JSON.parse(riskDetailData.causeAndConsequenceValue);
	$("#riskCauseDesc").val(causevalue.description);
	$("#riskCauseName").val(causevalue.name);
	$("#cause-rating-select").val(causevalue.riskRating);
	$("#cause_riskcategory_select").val(causevalue.riskcategory);
	$("#cause-possible-select").val(causevalue.possible);
	$("#cause-likelihood-select").val(causevalue.likelihood);
	$("#cause-impact-select").val(causevalue.impact);
	$("#cause-score").val(causevalue.score);


	$("#riskCauseCreatedBy").html(
		causevalue.createdByName);
	$("#riskCauseUpdatedBy").html(
		causevalue.updatedByName);
	$("#riskCauseCreatedByDate").html(riskDetailData.createDateString);
	$("#riskCauseUpdatedByDate").html(riskDetailData.updatedDateString);
}

function deleteRiskConsequence(id) {
	$("#deleterecordid").val(id);
	$("#deleterecordtype").val("riskConsequence");
	$('#deleteModalrisk').modal('toggle');
	$(window).on("resize", function () {
		$(".modal:visible").each(alignModal);
	});
	$(".modal").on("shown.bs.modal", alignModal);
	/*
	 * var methodType = 'delete' $.ajax({ url : "/stratroom/riskConsequence/" +
	 * id, type : methodType, contentType : "application/json", success :
	 * function(data, status) { location.reload(true); console.log("risk detail
	 * was deleted"); } });
	 */
}
function deleteRiskMonitoring(id) {
	$("#deleterecordid").val(id);
	$("#deleterecordtype").val("RiskMonitoring");
	$('#deleteModalrisk').modal('toggle');
	$(window).on("resize", function () {
		$(".modal:visible").each(alignModal);
	});
	$(".modal").on("shown.bs.modal", alignModal);
}

function handleRiskConqEvent(data,changeId) {
	$('.sub_cause_conq_popup').modal('toggle');
	$("#riskConqForm").trigger('reset');
	$("#riskConqForm input[name='causeId']").val(data.causeConqId);
	$("#conqChangeId").val(changeId);

	pageNo=data.pageId;
		$("#riskConqId_wrapper").css('display', 'block');
		$('.sub_cause_conq_popup #riskConqId').prop("disabled", true);

		
		 riskConqPopSuccessCallback(data, changeId)
		
}

function handleRiskConqSave() {
	var action = $("#riskConqForm input[name='action']").val();
	if (action == 'delete') {

	} else {
		var riskDetail = getRiskConqObj();
		riskDetail.causeConqId = $("#riskConqForm input[name='causeId']").val();
		var methodType = 'post';
		if (action == 'add') {
		} else if (action == 'edit') {
			riskDetail.id = $("#riskConqId").val();
			methodType = 'put';
		}
		$.ajax({
			url: "/stratroom/riskConsequence/",
			type: methodType,
			contentType: "application/json",
			data: JSON.stringify(riskDetail),
			success: function (data, status) {
				localStorage.setItem("reload", "1");

				location.reload(true);
				$("#riskConqClosePopup").click();
				console.log("New risk was created..");
			}
		});
	}
}

function getRiskConqObj() {
	var riskDetail = {
		"createdBy": $("#conqCreatedById").val(),
		"changeId" : $("#conqChangeId").val(),
		"consequenceValue": {
			"name": $("#riskConqName").val(),
			"description": $("#riskConqDesc").val(),
			"riskRating": $("#conq-rating-select").val(),
			"impactcategory": $("#conq-impactcategory-select").val(),
			"possible": $("#conq-possible-select").val(),
			"likelihood": $("#conq-likelihood-select").val(),
			"impact": $("#conq-impact-select").val(),
			"score": $("#conq-score").val()
		}
	}
	return riskDetail;
}

function riskConqPopSuccessCallback(riskDetailData,changeId) {
	$("#riskConqForm").css('display', 'block');
	$('#riskConqId').val(riskDetailData.id)
	$("#conqChangeId").val(changeId)
	$("#causeId").val(riskDetailData.causeConqId);
	$("#conqCreatedById").val(riskDetailData.createdBy);
	var consequencevalue = JSON.parse(riskDetailData.consequenceValue);
	$("#riskConqDesc").val(consequencevalue.description);
	$("#riskConqName").val(consequencevalue.name);

	$("#conq-rating-select").val(consequencevalue.riskRating);
	$("#conq-impactcategory-select").val(consequencevalue.impactcategory);
	$("#conq-possible-select").val(consequencevalue.possible);
	$("#conq-likelihood-select").val(consequencevalue.likelihood);
	$("#conq-impact-select").val(consequencevalue.impact);
	$("#conq-score").val(consequencevalue.score);

	$("#riskConqCreatedBy").html(consequencevalue.createdByName);
	$("#riskConqUpdatedBy").html(consequencevalue.updatedByName);
	$("#riskConqCreatedByDate").html(riskDetailData.createDateString);
	$("#riskConqUpdatedByDate").html(riskDetailData.updatedDateString);
}

$(document).on("click", ".clickable-text", function () {
	var impact = $(this).html();
	var score1 = $(this).parent().find(".score1").html();
	var score2 = $(this).parent().find(".score2").html();
	var text2 = $(this).parent().find(".text2").html();
	var score = score1 * score2;
	$(".risk-score").text(score);
	$(".impact-text").text(impact);
	$(".like-text").text(text2);
	$("#risklikelhood").text(text2);

	if (riskupdateDescription == undefined || riskupdateDescription == "") {
		$.notify("Risk Details not found", {
			style: 'error',
			className: 'graynotify'
		});
		return false;
	}

	impact = $.trim(impact);
	text2 = $.trim(text2);
	$("#riskstatus").text(text2);
	var riskDetail = getRiskObj('edit');
	riskDetail['riskValue']['score'] = score;
	riskDetail['riskValue']['impact'] = impact;
	riskDetail['riskValue']['likeliHood'] = text2;
	riskDetail['riskValue']['riskStatus'] = text2;
	riskDetail['pageId'] = (pageNo != "" && pageNo != null ? pageNo : "");

	var bordercolor = "";
	var imagecolor = "";
	if (score == 1) {
		bordercolor = "initiative_side_border_green";
		imagecolor = "greenbarimagecircle";
	} else if (score == 4) {
		bordercolor = "initiative_side_border_yellow";
		imagecolor = "yellowbarimagecircle";
	} else if (score >= 5 && score <= 10) {
		bordercolor = "initiative_side_border_orange";
		imagecolor = "orangebarimagecircle";
	} else if (score >= 16) {
		bordercolor = "initiative_side_border_orange";
		imagecolor = "orangebarimagecircle";
	}

	var elementclass = ".sidebarriskid_" + riskDetail.id;
	if ($(elementclass).hasClass('initiative_side_border_green')) {
		$(elementclass).removeClass('initiative_side_border_green');
	} else if ($(elementclass).hasClass('initiative_side_border_orange')) {
		$(elementclass).removeClass('initiative_side_border_orange');
	} else if ($(elementclass).hasClass('initiative_side_border_yellow')) {
		$(elementclass).removeClass('initiative_side_border_yellow');
	} else if ($(elementclass).hasClass('initiative_side_border_default')) {
		$(elementclass).removeClass('initiative_side_border_default');
	}
	// $(elementclass + " .riskscorevalue").html(text2);

	var elementclassid = "#riskimagestatuscircle";
	if ($(elementclassid).hasClass('greenbarimagecircle')) {
		$(elementclassid).removeClass('greenbarimagecircle');
	} else if ($(elementclassid).hasClass('yellowbarimagecircle')) {
		$(elementclassid).removeClass('yellowbarimagecircle');
	} else if ($(elementclassid).hasClass('defaultbarimagecircle')) {
		$(elementclassid).removeClass('defaultbarimagecircle');
	} else if ($(elementclassid).hasClass('orangebarimagecircle')) {
		$(elementclassid).removeClass('orangebarimagecircle');
	}
	$(elementclassid).addClass(imagecolor);

	$(".sidebarriskid_" + riskDetail.id).addClass(bordercolor);
	$.ajax({
		url: "/stratroom/risk/",
		type: 'put',
		contentType: "application/json",
		data: JSON.stringify(riskDetail),
		success: function (data, status) {
			$.notify("Updated Successfully", {
				style: 'success',
				className: 'graynotify'
			});
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

function getRiskObj(action) {
	var DataObj = {
		"riskValue": {}
	};
	DataObj['id'] = riskupdateDescription.id;
	$.each(riskupdateDescription, function (index, value) {
		if (index != "id") {
			if (value.riskValue) {
				DataObj["riskValue"] = value;
			} else {
				DataObj[index] = value;
			}
		}
	});

	return DataObj;
}

function populateKPIList(elementId) {
	var numberOfOptions = $(elementId + ' > option').length;

	if (jQuery.isEmptyObject(kpiList)) {
		$.ajax({
			url: "/stratroom/kpiList",
			async: false,
			success: function (kpiListValue) {
				kpiList = kpiListValue;
				$.each(kpiList, function (index, kpiObj) {
					addOption(elementId, kpiObj.kpiValue.name, kpiObj.id)
				});
			}
		});
	} else if (numberOfOptions < 2) {
		$.each(kpiList, function (index, kpiObj) {
			addOption(elementId, kpiObj.kpiValue.name, kpiObj.id)
		});
	}
	// multipleoptionElementTriggerValues();
}

function multipleoptionElementTriggerValues() {
	$(".riskDetail_description_popup select").formSelect();
	$(".riskDetail_description_popup select.select_all").siblings("ul")
		.prepend("<li id=sm_select_all><span>Select All</span></li>");
	$("li#sm_select_all")
		.on(
			"click",
			function () {
				var jq_elem = $(this), jq_elem_span = jq_elem
					.find("span"), select_all = jq_elem_span.text() == "Select All", set_text = select_all ? "Select None"
						: "Select All";
				jq_elem_span.text(set_text);
				jq_elem.siblings("li").filter(
					function () {
						return ($(this).find("input").prop(
							"checked") != select_all);
					}).click();
			});
}

function populateOwnerDropdown(elementId) {
	var numberOfOptions = $(elementId + ' > option').length;

	if (jQuery.isEmptyObject(reporteelist)) {
		$.ajax({
			url: "/stratroom/reporteeList",
			async: false,
			success: function (employeeList) {
				reporteelist = employeeList;
				$.each(employeeList, function (index, reportee) {
					addOption(elementId, reportee.name, reportee.id)
				});
			}
		});
	} else if (numberOfOptions < 2) {
		$.each(reporteelist, function (index, reportee) {
			addOption(elementId, reportee.name, reportee.id)
		});
	}
	// multipleoptionElementTriggerValues();
}

function addOption(id, text, value) {
	$(id).append(`<option value="${value}">${text}</option>`);
}

function populateCauseList(elementId, ownerid) {

	var numberOfOptions = $(elementId + ' > option').length;

	$(elementId).find('option').not(':first').remove();

	$.ajax({
		url: "/stratroom/riskCauseNameList/" + ownerid,
		async: false,
		success: function (kpiListValue) {
			causeList = kpiListValue;
			$.each(causeList, function (index, kpiObj) {
				addOption(elementId, kpiObj.name, kpiObj.id)
			});
		}
	});

}

function handleplanuserevent(PlanID, action) {
	var id = PlanID;
	var parentid = currentriskId;

	var data = {};
	if (action == 'edit') {
		$("#plan-ini-box_view_users").html('');
		$("#plan-ini-box_view_users").html(
			'<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
		$("#user_subview").removeClass();
		$("#plans_current_id").attr("data-plans_sub_current_id", parentid);
		$("#plans_current_id").attr("data-plans_parent_id", PlanID);

		$.ajax({
			url: "/stratroom/riskPlan/" + PlanID,
			async: false,
			success: function (result, status) {
				riskplanupdateDescription = result;
			},
			error: readErrorMsg
		});
		var implementationtypemethod = false;
		if ((controlpanelgeneralsiteSettings.implementation != null && controlpanelgeneralsiteSettings.implementation != undefined) && (controlpanelgeneralsiteSettings.implementationType != null && controlpanelgeneralsiteSettings.implementationType != undefined)) {
			if (controlpanelgeneralsiteSettings.implementationType == "Department") {
				implementationtypemethod = true
			}
		}
		if (implementationtypemethod) {
			tag_url = "/stratroom/deptReporteeList";
		}
		else {
			tag_url = "/stratroom/reporteeList";
		}
		$.ajax({
			url: tag_url,
			success: function (result, status) {
				var subinitiativeUser = "";
				var ischecked = "";
				var selectedItem = [];

				if ($("#plans_selected_user_" + id).length) {
					if ($("#plans_selected_user_" + id).val().indexOf(
						',') == true
						|| $("#plans_selected_user_" + id).val() != "") {
						selectedItem = $("#plans_selected_user_" + id)
							.val().split(',');
					}
				}

				$
					.each(
						result,
						function (index, users) {
							var username = ((users.name == undefined || users.name == "") ? "User"
								: users.name);
							var userProfileConcate = ((users.image == undefined || users.image == "") ? "data-name='"
								+ username
								+ "' class='rounded-circle plansuserimage'"
								: " class='rounded-circle' src='"
								+ users.image + "'");
							$.each(selectedItem, function (key,
								value) {
								if (value == users.id) {
									ischecked = "checked";
									return false;
								} else {
									ischecked = "";
								}
							});
							subinitiativeUser += '<div class="d-flex flex-row employe_content_border sub_initiative_details"><div class="d-flex flex-column flex-fill profile_content"><div class="d-flex flex-row"><div class="form-check"><label class="form-check-label"><input id="" class="form-check-input" name="sub_initiative_owner[]" '
								+ ischecked
								+ ' type="checkbox" value="'
								+ users.id
								+ '"><span class="form-check-sign"> <span class="check"></span></span></label></div><div class="d-flex flex-column init_flex_profile" style="margin-top: 3%;text-align: center;"><h5>'
								+ users.name
								+ '</h5></div><div class="img_details" style="width: 20%;"><img alt="'
								+ username
								+ '" '
								+ userProfileConcate
								+ ' ></div></div></div></div>';
						});
				$("#plan-ini-box_view_users").html('');
				$("#plan-ini-box_view_users").html(subinitiativeUser);
				$('.plansuserimage').initial({
					charCount: 2,
					height: 30,
					width: 30,
					fontSize: 18
				});
			}
		});
	}

}

function handlemonitoringuserevent(PlanID, action) {
	var id = PlanID;
	var parentid = currentriskId;

	var data = {};
	if (action == 'edit') {
		$("#monitoring-ini-box_view_users").html('');
		$("#monitoring-ini-box_view_users").html(
			'<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
		$("#user_subview").removeClass();
		$("#monitoring_current_id").attr("data-monitoring_sub_current_id",
			parentid);
		$("#monitoring_current_id").attr("data-monitoring_parent_id", PlanID);

		$.ajax({
			url: "/stratroom/riskMonitoring/" + PlanID,
			async: false,
			success: function (result, status) {
				riskmonitoringupdateDescription = result;
			},
			error: readErrorMsg
		});
		var implementationtypemethod = false;
		if ((controlpanelgeneralsiteSettings.implementation != null && controlpanelgeneralsiteSettings.implementation != undefined) && (controlpanelgeneralsiteSettings.implementationType != null && controlpanelgeneralsiteSettings.implementationType != undefined)) {
			if (controlpanelgeneralsiteSettings.implementationType == "Department") {
				implementationtypemethod = true
			}
		}
		if (implementationtypemethod) {
			tag_url = "/stratroom/deptReporteeList";
		}
		else {
			tag_url = "/stratroom/reporteeList";
		}
		$.ajax({
			url: tag_url,
			success: function (result, status) {
				var subinitiativeUser = "";
				var ischecked = "";
				var selectedItem = [];

				if ($("#monitoring_selected_user_" + id).length) {
					if ($("#monitoring_selected_user_" + id).val()
						.indexOf(',') == true
						|| $("#monitoring_selected_user_" + id)
							.val() != "") {
						selectedItem = $(
							"#monitoring_selected_user_" + id)
							.val().split(',');
					}
				}

				$
					.each(
						result,
						function (index, users) {
							var username = ((users.name == undefined || users.name == "") ? "User"
								: users.name);
							var userProfileConcate = ((users.image == undefined || users.image == "") ? "data-name='"
								+ username
								+ "' class='rounded-circle monitoringuserimage'"
								: " class='rounded-circle' src='"
								+ users.image + "'");
							$.each(selectedItem, function (key,
								value) {
								if (value == users.id) {
									ischecked = "checked";
									return false;
								} else {
									ischecked = "";
								}
							});
							subinitiativeUser += '<div class="d-flex flex-row employe_content_border sub_initiative_details"><div class="d-flex flex-column flex-fill profile_content"><div class="d-flex flex-row"><div class="form-check"><label class="form-check-label"><input id="" class="form-check-input" name="monitoring_owner[]" '
								+ ischecked
								+ ' type="checkbox" value="'
								+ users.id
								+ '"><span class="form-check-sign"> <span class="check"></span></span></label></div><div class="d-flex flex-column init_flex_profile" style="margin-top: 3%;text-align: center;"><h5>'
								+ users.name
								+ '</h5></div><div class="img_details" style="width: 20%;"><img alt="'
								+ username
								+ '" '
								+ userProfileConcate
								+ ' ></div></div></div></div>';
						});
				$("#monitoring-ini-box_view_users").html('');
				$("#monitoring-ini-box_view_users").html(
					subinitiativeUser);
				$('.monitoringuserimage').initial({
					charCount: 2,
					height: 30,
					width: 30,
					fontSize: 18
				});
			}
		});
	}
}

$(document)
	.on(
		"click",
		"input[name='monitoring_owner[]']",
		function () {

			if (riskmonitoringupdateDescription == undefined
				|| riskmonitoringupdateDescription == ""
				|| riskmonitoringupdateDescription.id == "") {
				return false;
			}

			var swotObj = {
				"riskPlanValue": {},
				"typeFlag": "",
				"multipleOwners": ""
			};
			swotObj['riskPlanValue'] = riskmonitoringupdateDescription.riskMonitoringValue;

			$.each(riskmonitoringupdateDescription, function (riskindex,
				value) {
				if (riskindex != "riskMonitoringValue") {
					swotObj[riskindex] = value;
				}
			});

			var multiowners = $(
				"input[name='monitoring_owner[]']:checked").map(
					function () {
						return this.value;
					}).get();

			swotObj.typeFlag = "RiskMonitoring";
			if (multiowners.length == 0) {
				swotObj.multipleOwners = currentEmp;
				$(
					"#monitoring_selected_user_"
					+ riskmonitoringupdateDescription.id)
					.val(currentEmp);
			} else {
				swotObj.multipleOwners = multiowners.join(',');
				$(
					"#monitoring_selected_user_"
					+ riskmonitoringupdateDescription.id)
					.val(multiowners.join(','));
			}

			var methodType = 'put';

			$.ajax({
				url: "/stratroom/riskPlan/",
				type: methodType,
				contentType: "application/json",
				data: JSON.stringify(swotObj),
				success: function (data, status) {
					// $.notify("Updated Successfully");
				},
				error: function (msg, status) {
					if (!jQuery.isEmptyObject(msg.responseText)) {
						$.each(JSON.parse(msg.responseText), function (
							key, value) {
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

$(document).on(
	"click",
	"input[name='sub_initiative_owner[]']",
	function () {

		if (riskplanupdateDescription == undefined
			|| riskplanupdateDescription == ""
			|| riskplanupdateDescription.id == "") {
			return false;
		}
		var swotObj = riskplanupdateDescription;
		var multiowners = $("input[name='sub_initiative_owner[]']:checked")
			.map(function () {
				return this.value;
			}).get();

		if (multiowners.length == 0) {
			swotObj.multipleOwners = currentEmp;
			$("#plans_selected_user_" + riskplanupdateDescription.id).val(
				currentEmp);
		} else {
			swotObj.multipleOwners = multiowners.join(',');
			$("#plans_selected_user_" + riskplanupdateDescription.id).val(
				multiowners.join(','));
		}

		var methodType = 'put';

		$.ajax({
			url: "/stratroom/riskPlan/",
			type: methodType,
			contentType: "application/json",
			data: JSON.stringify(swotObj),
			success: function (data, status) {
				// $.notify("Updated Successfully");
			},
			error: function (msg, status) {
				if (!jQuery.isEmptyObject(msg.responseText)) {
					$.each(JSON.parse(msg.responseText), function (key,
						value) {
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

$(document)
	.on(
		"click",
		".getselectedplanUsers",
		function () {

			var id = $("#plans_current_id").attr(
				"data-plans_sub_current_id");
			var InitiativeID = $("#plans_current_id").attr(
				"data-plans_parent_id");
			if ((id == undefined || id == "" || id == " ")
				&& (InitiativeID == undefined || InitiativeID == "" || InitiativeID == " ")) {
				return false;
			}

			var imageElement = "riskplans_user_" + InitiativeID;
			var userseslectedData = [];
			var selectedSubinitiativeOwner = $(
				".riskplan_add_user_popup input[name='sub_initiative_owner[]']:checked")
				.each(
					function (index) {
						userseslectedData.push(parseInt($(this)
							.val()));
					});

			var functionParams = InitiativeID + ',' + '"edit"';
			var functionName = "handleplanuserevent";
			var modalPopupName = ".riskplan_add_user_popup";
			$("#plans_selected_user_" + InitiativeID).val(
				userseslectedData.join(','));
			var implementationtypemethod = false;
			if ((controlpanelgeneralsiteSettings.implementation != null && controlpanelgeneralsiteSettings.implementation != undefined) && (controlpanelgeneralsiteSettings.implementationType != null && controlpanelgeneralsiteSettings.implementationType != undefined)) {
				if (controlpanelgeneralsiteSettings.implementationType == "Department") {
					implementationtypemethod = true
				}
			}
			if (implementationtypemethod) {
				tag_url = "/stratroom/deptReporteeList";
			}
			else {
				tag_url = "/stratroom/reporteeList";
			}
			if (!jQuery.isEmptyObject(userseslectedData)) {
				$.ajax({
					url: tag_url,
					success: function (data, status) {
						var subinitiativeUser = "";
						var subinitiativeUser1 = "";
						if (userseslectedData.length != data.length) {
							var profileBadgeIncrement = (userseslectedData.length >= 3 ? parseInt(userseslectedData.length)
								- parseInt(2)
								: 0);
							$
								.each(
									data,
									function (key, users) {
										$
											.each(
												userseslectedData,
												function (
													index,
													selectedvalue) {

													if (selectedvalue == users.id) {
														var username = ((users.name == undefined || users.name == "") ? "User"
															: users.name);
														// var
														// userProfileConcate
														// =
														// ((users.image
														// ==
														// undefined
														// ||
														// users.image
														// ==
														// "")?"data-name='"+username+"'":"src='"+users.image+"'");
														var userProfileConcate = ((users.image == undefined || users.image == "") ? "data-name='"
															+ username
															+ "' class='rounded-circle sub_init_img plansselecteduserimage'"
															: " class='rounded-circle sub_init_img' src='"
															+ users.image
															+ "'");
														subinitiativeUser1 += '<li class="avatar avatar-sm selecteduser" data-selecteduser="'
															+ users.id
															+ '"><img '
															+ userProfileConcate
															+ ' alt="'
															+ username
															+ '" width="50"></li>';

														if (userseslectedData.length >= 3
															&& index >= 2) {
															subinitiativeUser1 = subinitiativeUser1
																.replace(
																	'<li class="avatar avatar-sm selecteduser" data-selecteduser="'
																	+ users.id
																	+ '"><img '
																	+ userProfileConcate
																	+ ' alt="'
																	+ username
																	+ '" width="50"></li>',
																	'');
															subinitiativeUser = subinitiativeUser1
																+ '<li class="avatar avatar-sm selecteduser" data-selecteduser="'
																+ users.id
																+ '"><span _ngcontent-hhc-c5="" class="badge" data-toggle="modal" data-target="'
																+ modalPopupName
																+ '" onclick='
																+ functionName
																+ '('
																+ functionParams
																+ ')>+'
																+ profileBadgeIncrement
																+ '</span></li>';
															return false;
														}

														if (userseslectedData.length == 1) {
															subinitiativeUser = '<li class="avatar avatar-sm selecteduser" data-selecteduser="'
																+ users.id
																+ '"><img data-toggle="modal" data-target="'
																+ modalPopupName
																+ '" onclick='
																+ functionName
																+ '('
																+ functionParams
																+ ') '
																+ userProfileConcate
																+ ' alt="'
																+ username
																+ '" width="50"></li>';
															return false;
														}

														if (userseslectedData.length == 2
															&& index >= 1) {
															subinitiativeUser1 = subinitiativeUser1
																.replace(
																	'<li class="avatar avatar-sm selecteduser" data-selecteduser="'
																	+ users.id
																	+ '"><img '
																	+ userProfileConcate
																	+ ' alt="'
																	+ username
																	+ '" width="50"></li>',
																	'');
															subinitiativeUser += subinitiativeUser1
																+ '<li class="avatar avatar-sm selecteduser" data-selecteduser="'
																+ users.id
																+ '"><img data-toggle="modal" data-target="'
																+ modalPopupName
																+ '" onclick='
																+ functionName
																+ '('
																+ functionParams
																+ ') '
																+ userProfileConcate
																+ ' alt="'
																+ username
																+ '" width="50"></li>';
															return false;
														}
													}
												});
									});
						}
						if (userseslectedData.length == data.length) {
							var profileBadgeIncrement = (data.length >= 3 ? parseInt(data.length)
								- parseInt(2)
								: 0);
							$
								.each(
									data,
									function (index,
										users) {
										var username = ((users.name == undefined || users.name == "") ? "User"
											: users.name);
										// var
										// userProfileConcate
										// =
										// ((users.image
										// == undefined
										// ||
										// users.image
										// ==
										// "")?"data-name='"+username+"'":"src='"+users.image+"'");
										var userProfileConcate = ((users.image == undefined || users.image == "") ? "data-name='"
											+ username
											+ "' class='rounded-circle sub_init_img plansselecteduserimage'"
											: " class='rounded-circle sub_init_img' src='"
											+ users.image
											+ "'");
										subinitiativeUser += '<li class="avatar avatar-sm selecteduser" data-selecteduser="'
											+ users.id
											+ '"><img '
											+ userProfileConcate
											+ ' alt="'
											+ username
											+ '" width="50"></li>';
										if (userseslectedData.length >= 3
											&& index >= 2) {
											subinitiativeUser = subinitiativeUser
												.replace(
													'<li class="avatar avatar-sm selecteduser" data-selecteduser="'
													+ users.id
													+ '"><img '
													+ userProfileConcate
													+ ' alt="'
													+ username
													+ '" width="50"></li>',
													'');
											subinitiativeUser += '<li class="avatar avatar-sm selecteduser" data-selecteduser="'
												+ users.id
												+ '"><span _ngcontent-hhc-c5="" class="badge" data-toggle="modal" data-target="'
												+ modalPopupName
												+ '" onclick='
												+ functionName
												+ '('
												+ functionParams
												+ ')>+'
												+ profileBadgeIncrement
												+ '</span></li>';
											return false;
										}
										if (userseslectedData.length == 1) {
											subinitiativeUser = '<li class="avatar avatar-sm selecteduser" data-selecteduser="'
												+ users.id
												+ '"><img data-toggle="modal" data-target="'
												+ modalPopupName
												+ '" onclick='
												+ functionName
												+ '('
												+ functionParams
												+ ') '
												+ userProfileConcate
												+ ' alt="'
												+ username
												+ '" width="50"></li>';
											return false;
										}

										if (userseslectedData.length == 2) {
											subinitiativeUser += '<li class="avatar avatar-sm selecteduser" data-selecteduser="'
												+ users.id
												+ '"><img data-toggle="modal" data-target="'
												+ modalPopupName
												+ '" onclick='
												+ functionName
												+ '('
												+ functionParams
												+ ') '
												+ userProfileConcate
												+ ' alt="'
												+ username
												+ '" width="50"></li>';
											return false;
										}
									});
						}

						$("#" + imageElement).html('');
						$("#" + imageElement).html(
							subinitiativeUser);
						$('.plansselecteduserimage').initial({
							charCount: 2,
							height: 30,
							width: 30,
							fontSize: 18
						});
					}
				});
			} else {
				var users = riskupdateDescription;
				userseslectedData.push(users.owner);
				$("#plans_selected_user_" + InitiativeID).val(
					userseslectedData.join(','));
				var username = ((users.riskValue.ownerName == undefined || users.riskValue.ownerName == "") ? "User"
					: users.riskValue.ownerName);
				var userProfileConcate = ((users.riskValue.riskImage == undefined || users.riskValue.riskImage == "") ? "data-name='"
					+ username
					+ "' class='rounded-circle sub_init_img plansselecteduserimage'"
					: " class='rounded-circle sub_init_img' src='"
					+ users.riskValue.riskImage + "'");
				subinitiativeUser = '<li class="avatar avatar-sm selecteduser"><img data-toggle="modal" data-target="'
					+ modalPopupName
					+ '" onclick='
					+ functionName
					+ '('
					+ functionParams
					+ ') '
					+ userProfileConcate
					+ ' alt="'
					+ username
					+ '" width="50"></li>';
				$("#" + imageElement).html('');
				$("#" + imageElement).html(subinitiativeUser);
				$('.plansselecteduserimage').initial({
					charCount: 2,
					height: 30,
					width: 30,
					fontSize: 18
				});
			}
		});

$(document)
	.on(
		"click",
		".getselectedmonitoringUsers",
		function () {

			var id = $("#monitoring_current_id").attr(
				"data-monitoring_sub_current_id");
			var InitiativeID = $("#monitoring_current_id").attr(
				"data-monitoring_parent_id");
			if ((id == undefined || id == "" || id == " ")
				&& (InitiativeID == undefined || InitiativeID == "" || InitiativeID == " ")) {
				return false;
			}

			var imageElement = "riskmonitor_user_" + InitiativeID;
			var userseslectedData = [];
			var selectedSubinitiativeOwner = $(
				".monitoring_add_user_popup input[name='monitoring_owner[]']:checked")
				.each(
					function (index) {
						userseslectedData.push(parseInt($(this)
							.val()));
					});

			var functionParams = InitiativeID + ',' + '"edit"';
			var functionName = "handlemonitoringuserevent";
			var modalPopupName = ".monitoring_add_user_popup";
			$("#monitoring_current_id" + InitiativeID).val(
				userseslectedData.join(','));
			var implementationtypemethod = false;
			if ((controlpanelgeneralsiteSettings.implementation != null && controlpanelgeneralsiteSettings.implementation != undefined) && (controlpanelgeneralsiteSettings.implementationType != null && controlpanelgeneralsiteSettings.implementationType != undefined)) {
				if (controlpanelgeneralsiteSettings.implementationType == "Department") {
					implementationtypemethod = true
				}
			}
			if (implementationtypemethod) {
				tag_url = "/stratroom/deptReporteeList";
			}
			else {
				tag_url = "/stratroom/reporteeList";
			}
			if (!jQuery.isEmptyObject(userseslectedData)) {
				$
					.ajax({
						url: tag_url,
						success: function (data, status) {
							var subinitiativeUser = "";
							var subinitiativeUser1 = "";
							if (userseslectedData.length != data.length) {
								var profileBadgeIncrement = (userseslectedData.length >= 3 ? parseInt(userseslectedData.length)
									- parseInt(2)
									: 0);
								$
									.each(
										data,
										function (key, users) {
											$
												.each(
													userseslectedData,
													function (
														index,
														selectedvalue) {

														if (selectedvalue == users.id) {
															var username = ((users.name == undefined || users.name == "") ? "User"
																: users.name);
															// var
															// userProfileConcate
															// =
															// ((users.image
															// ==
															// undefined
															// ||
															// users.image
															// ==
															// "")?"data-name='"+username+"'":"src='"+users.image+"'");
															var userProfileConcate = ((users.image == undefined || users.image == "") ? "data-name='"
																+ username
																+ "' class='rounded-circle sub_init_img monitoringselecteduserimage'"
																: " class='rounded-circle sub_init_img' src='"
																+ users.image
																+ "'");
															subinitiativeUser1 += '<li class="avatar avatar-sm selecteduser" data-selecteduser="'
																+ users.id
																+ '"><img '
																+ userProfileConcate
																+ ' alt="'
																+ username
																+ '" width="50"></li>';

															if (userseslectedData.length >= 3
																&& index >= 2) {
																subinitiativeUser1 = subinitiativeUser1
																	.replace(
																		'<li class="avatar avatar-sm selecteduser" data-selecteduser="'
																		+ users.id
																		+ '"><img '
																		+ userProfileConcate
																		+ ' alt="'
																		+ username
																		+ '" width="50"></li>',
																		'');
																subinitiativeUser = subinitiativeUser1
																	+ '<li class="avatar avatar-sm selecteduser" data-selecteduser="'
																	+ users.id
																	+ '"><span data-toggle="modal" data-target="'
																	+ modalPopupName
																	+ '" onclick='
																	+ functionName
																	+ '('
																	+ functionParams
																	+ ') _ngcontent-hhc-c5="" class="badge">+'
																	+ profileBadgeIncrement
																	+ '</span></li>';
																return false;
															}

															if (userseslectedData.length == 1) {
																subinitiativeUser = '<li class="avatar avatar-sm selecteduser" data-selecteduser="'
																	+ users.id
																	+ '"><img data-toggle="modal" data-target="'
																	+ modalPopupName
																	+ '" onclick='
																	+ functionName
																	+ '('
																	+ functionParams
																	+ ') '
																	+ userProfileConcate
																	+ ' alt="'
																	+ username
																	+ '" width="50"></li>';
																return false;
															}

															if (userseslectedData.length == 2
																&& index >= 1) {
																subinitiativeUser1 = subinitiativeUser1
																	.replace(
																		'<li class="avatar avatar-sm selecteduser" data-selecteduser="'
																		+ users.id
																		+ '"><img '
																		+ userProfileConcate
																		+ ' alt="'
																		+ username
																		+ '" width="50"></li>',
																		'');
																subinitiativeUser += subinitiativeUser1
																	+ '<li class="avatar avatar-sm selecteduser" data-selecteduser="'
																	+ users.id
																	+ '"><img data-toggle="modal" data-target="'
																	+ modalPopupName
																	+ '" onclick='
																	+ functionName
																	+ '('
																	+ functionParams
																	+ ') '
																	+ userProfileConcate
																	+ ' alt="'
																	+ username
																	+ '" width="50"></li>';
																return false;
															}
														}
													});
										});
							}
							if (userseslectedData.length == data.length) {
								var profileBadgeIncrement = (data.length >= 3 ? parseInt(data.length)
									- parseInt(2)
									: 0);
								$
									.each(
										data,
										function (index,
											users) {
											var username = ((users.name == undefined || users.name == "") ? "User"
												: users.name);
											// var
											// userProfileConcate
											// =
											// ((users.image
											// == undefined
											// ||
											// users.image
											// ==
											// "")?"data-name='"+username+"'":"src='"+users.image+"'");
											var userProfileConcate = ((users.image == undefined || users.image == "") ? "data-name='"
												+ username
												+ "' class='rounded-circle sub_init_img monitoringselecteduserimage'"
												: " class='rounded-circle sub_init_img' src='"
												+ users.image
												+ "'");
											subinitiativeUser += '<li class="avatar avatar-sm selecteduser" data-selecteduser="'
												+ users.id
												+ '"><img '
												+ userProfileConcate
												+ ' alt="'
												+ username
												+ '" width="50"></li>';
											if (userseslectedData.length >= 3
												&& index >= 2) {
												subinitiativeUser = subinitiativeUser
													.replace(
														'<li class="avatar avatar-sm selecteduser" data-selecteduser="'
														+ users.id
														+ '"><img '
														+ userProfileConcate
														+ ' alt="'
														+ username
														+ '" width="50"></li>',
														'');
												subinitiativeUser += '<li class="avatar avatar-sm selecteduser" data-selecteduser="'
													+ users.id
													+ '"><span data-toggle="modal" data-target="'
													+ modalPopupName
													+ '" onclick='
													+ functionName
													+ '('
													+ functionParams
													+ ') _ngcontent-hhc-c5="" class="badge">+'
													+ profileBadgeIncrement
													+ '</span></li>';
												return false;
											}
											if (userseslectedData.length == 1) {
												subinitiativeUser = '<li class="avatar avatar-sm selecteduser" data-selecteduser="'
													+ users.id
													+ '"><img data-toggle="modal" data-target="'
													+ modalPopupName
													+ '" onclick='
													+ functionName
													+ '('
													+ functionParams
													+ ') '
													+ userProfileConcate
													+ ' alt="'
													+ username
													+ '" width="50"></li>';
												return false;
											}

											if (userseslectedData.length == 2) {
												subinitiativeUser += '<li class="avatar avatar-sm selecteduser" data-selecteduser="'
													+ users.id
													+ '"><img data-toggle="modal" data-target="'
													+ modalPopupName
													+ '" onclick='
													+ functionName
													+ '('
													+ functionParams
													+ ') '
													+ userProfileConcate
													+ ' alt="'
													+ username
													+ '" width="50"></li>';
												return false;
											}
										});
							}

							$("#" + imageElement).html('');
							$("#" + imageElement).html(
								subinitiativeUser);
							$('.monitoringselecteduserimage')
								.initial({
									charCount: 2,
									height: 30,
									width: 30,
									fontSize: 18
								});
						}
					});
			} else {
				var users = riskupdateDescription;
				userseslectedData.push(users.owner);
				$("#plans_selected_user_" + InitiativeID).val(
					userseslectedData.join(','));
				var username = ((users.riskValue.ownerName == undefined || users.riskValue.ownerName == "") ? "User"
					: users.riskValue.ownerName);
				var userProfileConcate = ((users.riskValue.riskImage == undefined || users.riskValue.riskImage == "") ? "data-name='"
					+ username
					+ "' class='rounded-circle sub_init_img monitoringselecteduserimage'"
					: " class='rounded-circle sub_init_img' src='"
					+ users.riskValue.riskImage + "'");
				subinitiativeUser = '<li class="avatar avatar-sm selecteduser"><img data-toggle="modal" data-target="'
					+ modalPopupName
					+ '" onclick='
					+ functionName
					+ '('
					+ functionParams
					+ ') '
					+ userProfileConcate
					+ ' alt="'
					+ username
					+ '" width="50"></li>';
				$("#" + imageElement).html('');
				$("#" + imageElement).html(subinitiativeUser);
				$('.monitoringselecteduserimage').initial({
					charCount: 2,
					height: 30,
					width: 30,
					fontSize: 18
				});
			}
		});

function handleactivitiesuserevent(PlanID, action) {
	var id = PlanID;
	var parentid = currentriskId;

	var data = {};
	if (action == 'edit') {
		$("#activities-ini-box_view_users").html('');
		$("#activities-ini-box_view_users").html(
			'<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
		$("#activity_current_id")
			.attr("data-activity_sub_current_id", parentid);
		$("#activity_current_id").attr("data-activity_parent_id", PlanID);
		var implementationtypemethod = false;
		if ((controlpanelgeneralsiteSettings.implementation != null && controlpanelgeneralsiteSettings.implementation != undefined) && (controlpanelgeneralsiteSettings.implementationType != null && controlpanelgeneralsiteSettings.implementationType != undefined)) {
			if (controlpanelgeneralsiteSettings.implementationType == "Department") {
				implementationtypemethod = true
			}
		}
		if (implementationtypemethod) {
			tag_url = "/stratroom/deptReporteeList";
		}
		else {
			tag_url = "/stratroom/reporteeList";
		}
		$.ajax({
			url: tag_url,
			success: function (result, status) {
				var subinitiativeUser = "";
				var ischecked = "";
				var selectedItem = [];

				if ($("#activities_selected_user_" + id).length) {
					if ($("#activities_selected_user_" + id).val()
						.indexOf(',') == true
						|| $("#activities_selected_user_" + id)
							.val() != "") {
						selectedItem = $(
							"#activities_selected_user_" + id)
							.val().split(',');
					}
				}

				$
					.each(
						result,
						function (index, users) {
							var username = ((users.name == undefined || users.name == "") ? "User"
								: users.name);
							var userProfileConcate = ((users.image == undefined || users.image == "") ? "data-name='"
								+ username
								+ "' class='rounded-circle activityuserimage'"
								: " class='rounded-circle' src='"
								+ users.image + "'");
							$.each(selectedItem, function (key,
								value) {
								if (value == users.id) {
									ischecked = "checked";
									return false;
								} else {
									ischecked = "";
								}
							});
							subinitiativeUser += '<div class="d-flex flex-row employe_content_border sub_initiative_details"><div class="d-flex flex-column flex-fill profile_content"><div class="d-flex flex-row"><div class="form-check"><label class="form-check-label"><input id="" class="form-check-input" name="sub_initiative_owner[]" '
								+ ischecked
								+ ' type="checkbox" value="'
								+ users.id
								+ '"><span class="form-check-sign"> <span class="check"></span></span></label></div><div class="d-flex flex-column init_flex_profile" style="margin-top: 3%;text-align: center;"><h5>'
								+ users.name
								+ '</h5></div><div class="img_details" style="width: 20%;"><img alt="'
								+ username
								+ '" '
								+ userProfileConcate
								+ ' ></div></div></div></div>';
						});
				$("#activities-ini-box_view_users").html('');
				$("#activities-ini-box_view_users").html(
					subinitiativeUser);
				$('.activityuserimage').initial({
					charCount: 2,
					height: 30,
					width: 30,
					fontSize: 18
				});
			}
		});
	}

}

$(document)
	.on(
		"click",
		".getselectedActivitiesUsers",
		function () {

			var id = $("#activity_current_id").attr(
				"data-activity_sub_current_id");
			var InitiativeID = $("#activity_current_id").attr(
				"data-activity_parent_id");
			if ((id == undefined || id == "" || id == " ")
				&& (InitiativeID == undefined || InitiativeID == "" || InitiativeID == " ")) {
				return false;
			}

			var imageElement = "riskactivities_user_" + InitiativeID;
			var userseslectedData = [];
			var selectedSubinitiativeOwner = $(
				".riskactivities_add_user_popup input[name='sub_initiative_owner[]']:checked")
				.each(
					function (index) {
						userseslectedData.push(parseInt($(this)
							.val()));
					});

			var functionParams = InitiativeID + ',' + '"edit"';
			var functionName = "handleactivitiesuserevent";
			var modalPopupName = ".riskactivities_add_user_popup";
			$("#activities_selected_user_" + InitiativeID).val(
				userseslectedData.join(','));
			var implementationtypemethod = false;
			if ((controlpanelgeneralsiteSettings.implementation != null && controlpanelgeneralsiteSettings.implementation != undefined) && (controlpanelgeneralsiteSettings.implementationType != null && controlpanelgeneralsiteSettings.implementationType != undefined)) {
				if (controlpanelgeneralsiteSettings.implementationType == "Department") {
					implementationtypemethod = true
				}
			}
			if (implementationtypemethod) {
				tag_url = "/stratroom/deptReporteeList";
			}
			else {
				tag_url = "/stratroom/reporteeList";
			}
			if (!jQuery.isEmptyObject(userseslectedData)) {
				$
					.ajax({
						url: tag_url,
						success: function (data, status) {
							var subinitiativeUser = "";
							var subinitiativeUser1 = "";
							if (userseslectedData.length != data.length) {
								var profileBadgeIncrement = (userseslectedData.length >= 3 ? parseInt(userseslectedData.length)
									- parseInt(2)
									: 0);
								$
									.each(
										data,
										function (key, users) {
											$
												.each(
													userseslectedData,
													function (
														index,
														selectedvalue) {

														if (selectedvalue == users.id) {
															var username = ((users.name == undefined || users.name == "") ? "User"
																: users.name);
															// var
															// userProfileConcate
															// =
															// ((users.image
															// ==
															// undefined
															// ||
															// users.image
															// ==
															// "")?"data-name='"+username+"'":"src='"+users.image+"'");
															var userProfileConcate = ((users.image == undefined || users.image == "") ? "data-name='"
																+ username
																+ "' class='rounded-circle activityselecteduserimage'"
																: " class='rounded-circle' src='"
																+ users.image
																+ "'");
															subinitiativeUser1 += '<li class="avatar avatar-sm selecteduser" data-selecteduser="'
																+ users.id
																+ '"><img '
																+ userProfileConcate
																+ ' alt="'
																+ username
																+ '" width="50"></li>';

															if (userseslectedData.length >= 3
																&& index >= 2) {
																subinitiativeUser1 = subinitiativeUser1
																	.replace(
																		'<li class="avatar avatar-sm selecteduser" data-selecteduser="'
																		+ users.id
																		+ '"><img '
																		+ userProfileConcate
																		+ ' alt="'
																		+ username
																		+ '" width="50"></li>',
																		'');
																subinitiativeUser = subinitiativeUser1
																	+ '<li class="avatar avatar-sm selecteduser" data-selecteduser="'
																	+ users.id
																	+ '"><a href="#" data-toggle="modal" data-target="'
																	+ modalPopupName
																	+ '" onclick='
																	+ functionName
																	+ '('
																	+ functionParams
																	+ ')><span _ngcontent-hhc-c5="" class="badge">+'
																	+ profileBadgeIncrement
																	+ '</span></a></li>';
																return false;
															}

															if (userseslectedData.length == 1) {
																subinitiativeUser = '<li class="avatar avatar-sm selecteduser" data-selecteduser="'
																	+ users.id
																	+ '"><a href="#" data-toggle="modal" data-target="'
																	+ modalPopupName
																	+ '" onclick='
																	+ functionName
																	+ '('
																	+ functionParams
																	+ ')><img '
																	+ userProfileConcate
																	+ ' alt="'
																	+ username
																	+ '" width="50"></a></li>';
																return false;
															}

															if (userseslectedData.length == 2
																&& index >= 1) {
																subinitiativeUser1 = subinitiativeUser1
																	.replace(
																		'<li class="avatar avatar-sm selecteduser" data-selecteduser="'
																		+ users.id
																		+ '"><img '
																		+ userProfileConcate
																		+ ' alt="'
																		+ username
																		+ '" width="50"></li>',
																		'');
																subinitiativeUser += subinitiativeUser1
																	+ '<li class="avatar avatar-sm selecteduser" data-selecteduser="'
																	+ users.id
																	+ '"><a href="#" data-toggle="modal" data-target="'
																	+ modalPopupName
																	+ '" onclick='
																	+ functionName
																	+ '('
																	+ functionParams
																	+ ')><img '
																	+ userProfileConcate
																	+ ' alt="'
																	+ username
																	+ '" width="50"></a></li>';
																return false;
															}
														}
													});
										});
							}
							if (userseslectedData.length == data.length) {
								var profileBadgeIncrement = (data.length >= 3 ? parseInt(data.length)
									- parseInt(2)
									: 0);
								$
									.each(
										data,
										function (index,
											users) {
											var username = ((users.name == undefined || users.name == "") ? "User"
												: users.name);
											// var
											// userProfileConcate
											// =
											// ((users.image
											// == undefined
											// ||
											// users.image
											// ==
											// "")?"data-name='"+username+"'":"src='"+users.image+"'");
											var userProfileConcate = ((users.image == undefined || users.image == "") ? "data-name='"
												+ username
												+ "' class='rounded-circle activityselecteduserimage'"
												: " class='rounded-circle' src='"
												+ users.image
												+ "'");
											subinitiativeUser += '<li class="avatar avatar-sm selecteduser" data-selecteduser="'
												+ users.id
												+ '"><img '
												+ userProfileConcate
												+ ' alt="'
												+ username
												+ '" width="50"></li>';
											if (userseslectedData.length >= 3
												&& index >= 2) {
												subinitiativeUser = subinitiativeUser
													.replace(
														'<li class="avatar avatar-sm selecteduser" data-selecteduser="'
														+ users.id
														+ '"><img '
														+ userProfileConcate
														+ ' alt="'
														+ username
														+ '" width="50"></li>',
														'');
												subinitiativeUser += '<li class="avatar avatar-sm selecteduser" data-selecteduser="'
													+ users.id
													+ '"><a href="#" data-toggle="modal" data-target="'
													+ modalPopupName
													+ '" onclick='
													+ functionName
													+ '('
													+ functionParams
													+ ')><span _ngcontent-hhc-c5="" class="badge">+'
													+ profileBadgeIncrement
													+ '</span></a></li>';
												return false;
											}
											if (userseslectedData.length == 1) {
												subinitiativeUser = '<li class="avatar avatar-sm selecteduser" data-selecteduser="'
													+ users.id
													+ '"><a href="#" data-toggle="modal" data-target="'
													+ modalPopupName
													+ '" onclick='
													+ functionName
													+ '('
													+ functionParams
													+ ')><img '
													+ userProfileConcate
													+ ' alt="'
													+ username
													+ '" width="50"></a></li>';
												return false;
											}

											if (userseslectedData.length == 2) {
												subinitiativeUser += '<li class="avatar avatar-sm selecteduser" data-selecteduser="'
													+ users.id
													+ '"><a href="#" data-toggle="modal" data-target="'
													+ modalPopupName
													+ '" onclick='
													+ functionName
													+ '('
													+ functionParams
													+ ')><img '
													+ userProfileConcate
													+ ' alt="'
													+ username
													+ '" width="50"></a></li>';
												return false;
											}
										});
							}

							$("#" + imageElement).html('');
							$("#" + imageElement).html(
								subinitiativeUser);
							$('.activityselecteduserimage')
								.initial({
									charCount: 2,
									height: 30,
									width: 30,
									fontSize: 18
								});
						}
					});
			} else {
				var users = riskupdateDescription;
				userseslectedData.push(users.owner);
				$("#activities_selected_user_" + InitiativeID).val(
					userseslectedData.join(','));
				var username = ((users.riskValue.ownerName == undefined || users.riskValue.ownerName == "") ? "User"
					: users.riskValue.ownerName);
				var userProfileConcate = ((users.riskValue.riskImage == undefined || users.riskValue.riskImage == "") ? "data-name='"
					+ username
					+ "' class='rounded-circle activityselecteduserimage'"
					: " class='rounded-circle' src='"
					+ users.riskValue.riskImage + "'");
				subinitiativeUser = '<li class="avatar avatar-sm selecteduser"><a href="#" data-toggle="modal" data-target="'
					+ modalPopupName
					+ '" onclick='
					+ functionName
					+ '('
					+ functionParams
					+ ')><img '
					+ userProfileConcate
					+ ' alt="'
					+ username
					+ '" width="50"></a></li>';
				$("#" + imageElement).html('');
				$("#" + imageElement).html(subinitiativeUser);
				$('.activityselecteduserimage').initial({
					charCount: 2,
					height: 30,
					width: 30,
					fontSize: 18
				});
			}
		});

// causeconq view
function causeconqviewdetails(id) {
	var element = $("#cause-row-box_view");
	$("#causeviewheader").text($("#causeheader").text());
	$(element).html('');
	$(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
	$('.cause_conq_view_popup').modal('toggle');
	$.ajax({
		url: "/stratroom/riskCauseList/" + id,
		success: causeconqrecordsviewSuccessCallback,
		error: function (msg, status) {
			if (!jQuery.isEmptyObject(msg.responseText)) {
				var errorparse = JSON.parse(msg.responseText);
				if (errorparse.status == "404") {
					$(element).html('');
					$(element).html(errorparse.error);
				} else {
					$(element).html('');
					$(element).html(errorparse.error);
				}
			}
		}
	});
}

function causeconqrecordsviewSuccessCallback(result) {

	var sub_initiatiesrow = "";
	var subinitiativeProgressBar = "";


	var sub_initiatiesrow = '<div class="panel-group risk-panel-group" id="risk_accordion_10" role="tablist" aria-multiselectable="true">';
	var riskcollapse = 10;
	$
		.each(
			result,
			function (index, item) {
				var riskcolor = "";// risk_yellow_color


				sub_initiatiesrow += '<div class="panel risk-panel panel-col_border"><div class="panel-heading risk-panel-heading" role="tab" id="risk_headingOne_10"><div class="panel-title_risk"><a role="button" data-toggle="collapse" data-parent="#risk_accordion_10" href="#risk_collapseOne_'
					+ riskcollapse
					+ '" aria-expanded="false" aria-controls="risk_collapseOne_10" class="collapsed">';
				sub_initiatiesrow += `'<div class="conq_title_name"><pre style="white-space: pre-wrap;font-family:'Poppins',sans-serif;">'`
					+ item.causeAndConsequenceValue.name
					+ '</pre></div><div class="flex-column"><div class="risk_badge '
					+ riskcolor + '">'
					+ displayOptionText("rating", item.causeAndConsequenceValue.riskRating)
					+ '</div>';

				sub_initiatiesrow += '</div></div></a></div></div>';
				if (conviewpermission) {
					$.each(
						item.consequenceList,
						function (index, item1) {
							var riskcolor = "";

							sub_initiatiesrow += '<div id="risk_collapseOne_'
								+ riskcollapse
								+ '" class="panel-collapse in collapse show" role="tabpanel" aria-labelledby="risk_headingOne_10" style="">';
							sub_initiatiesrow += `'<div class="badge_risk_title" style="padding:10px 5px;"><pre style="white-space: pre-wrap;font-size: 12px;font-family:'Poppins',sans-serif;"><div class="conq_sub_title_name">'`
								+ item1.consequenceValue.name
								+ '</div></pre><div class="risk_badge '
								+ riskcolor
								+ '">'
								+ displayOptionText("rating", item1.consequenceValue.riskRating)
								+ '</div></div></div>';
						});
				}
				sub_initiatiesrow += '</div>';
				riskcollapse++;
			});
	sub_initiatiesrow += '</div>';

	$("#cause-row-box_view").html('');
	$("#cause-row-box_view").html(sub_initiatiesrow);
}

// plan view
function planviewdetails(id) {
	
	$('.sub_initative_view_popup').modal('toggle');
	$("#inisubinitviewheader").text($("#planheader").text());
	$("#subinitiaties-row-box_view").html('');
	$("#subinitiaties-row-box_view").html(
		'<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');

	$.ajax({
		url: "/stratroom/riskPlanList/" + id,
		success: planrecordsviewSuccessCallback
	});
}



function subinitiatiesPorfileFormationrisk(usersimg, defaultreporteelist, type) {
	var subinitiativeUser = "";
	var profileBadgeIncrement = (usersimg.length >= 3 ? parseInt(usersimg.length)
		- parseInt(2)
		: 0);

	if (usersimg.length != 0) {

		$
			.each(
				usersimg,
				function (index, users) {
					var username = users.name;
					var userProfileConcate = ((users.image == undefined || users.image == "") ? ' class="rounded-circle sub_init_img plan_view_immage" data-name="'
						+ username
						: ' class="rounded-circle sub_init_img" src="'
						+ users.image + '"');
					if (usersimg.length == 1) {
						subinitiativeUser += '<li class="avatar avatar-sm selecteduser"><img '
							+ userProfileConcate
							+ ' alt="'
							+ username + '" width="50"></li>';
						return false;
					}
					subinitiativeUser += '<li class="avatar avatar-sm selecteduser"><img '
						+ userProfileConcate
						+ ' alt="'
						+ username
						+ '" width="50"></li>';
					if (usersimg.length == 2 && index > 0) {
						subinitiativeUser = subinitiativeUser.replace(
							'<li class="avatar avatar-sm selecteduser"><img '
							+ userProfileConcate + ' alt="'
							+ username
							+ '" width="50"></li>', '');
						subinitiativeUser += '<li class="avatar avatar-sm selecteduser"><img '
							+ userProfileConcate
							+ ' alt="'
							+ username + '" width="50"></li>';
						return false;
					}
					if (usersimg.length >= 3 && index >= 2) {
						subinitiativeUser = subinitiativeUser.replace(
							'<li class="avatar avatar-sm selecteduser"><img '
							+ userProfileConcate + ' alt="'
							+ username
							+ '" width="50"></li>', '');
						subinitiativeUser += '<li class="avatar avatar-sm selecteduser"><span _ngcontent-hhc-c5="" class="badge">+'
							+ profileBadgeIncrement
							+ '</span></li>';
						return false;
					}
				});
	} else {
		var users = defaultreporteelist;
		var username = ((users.name == undefined || users.name == "") ? "User"
			: users.name);
		var userProfileConcate = ((users.image == undefined || users.image == "") ? ' class="rounded-circle sub_init_img plan_view_immage" data-name="'
			+ username
			: ' class="rounded-circle sub_init_img" src="' + users.image + '"');
		subinitiativeUser = '<li class="avatar avatar-sm selecteduser"><img '
			+ userProfileConcate
			+ ' alt="'
			+ username
			+ '" width="50"></li>';
	}

	return subinitiativeUser;
}

function riskPorfileFormationrisk(usersimg, defaultreporteelist, type, resultId) {

	var subinitiativeUser = "";
	var profileBadgeIncrement = (usersimg.length >= 3 ? parseInt(usersimg.length)
		- parseInt(2)
		: 0);
	var functionParams = resultId + ',' + '"edit"';
	var functionName = "";
	var modalPopupName = "";

	if (type == "riskplan") {
		functionName = "handleplanuserevent";
		modalPopupName = ".riskplan_add_user_popup";
	} else if (type == "riskreview") {
		functionName = "handlemonitoringuserevent";
		modalPopupName = ".monitoring_add_user_popup";
	} else if (type == "risktreatment") {
		functionName = "handletreatmentuserevent";
		modalPopupName = ".risk_treatment_add_popup";
	}

	if (usersimg.length != 0) {

		$.each(usersimg, function (index, users) {
			var username = users.name;
			var userProfileConcate = ((users.image == undefined || users.image == "") ? ' class="rounded-circle sub_init_img planuser" data-name="'
				+ username + '" '
				: ' class="rounded-circle sub_init_img" src="'
				+ users.image + '"');
			if (usersimg.length == 1) {
				subinitiativeUser += '<li class="avatar avatar-sm selecteduser"><img data-toggle="modal" data-target="' + modalPopupName + '" onclick=' + functionName + '(' + functionParams + ') '
					+ userProfileConcate
					+ ' alt="'
					+ username + '" width="50"></li>';
				return false;
			}
			subinitiativeUser += '<li class="avatar avatar-sm selecteduser"><img '
				+ userProfileConcate
				+ ' alt="'
				+ username
				+ '" width="50"></li>';
			if (usersimg.length == 2 && index > 0) {
				subinitiativeUser = subinitiativeUser.replace(
					'<li class="avatar avatar-sm selecteduser"><img '
					+ userProfileConcate + ' alt="'
					+ username
					+ '" width="50"></li>', '');
				subinitiativeUser += '<li class="avatar avatar-sm selecteduser"><img data-toggle="modal" data-target="' + modalPopupName + '" onclick=' + functionName + '(' + functionParams + ') '
					+ userProfileConcate
					+ ' alt="'
					+ username + '" width="50"></li>';
				return false;
			}
			if (usersimg.length >= 3 && index >= 2) {
				subinitiativeUser = subinitiativeUser.replace(
					'<li class="avatar avatar-sm selecteduser"><img '
					+ userProfileConcate + ' alt="'
					+ username
					+ '" width="50"></li>', '');
				subinitiativeUser += '<li class="avatar avatar-sm selecteduser"><span _ngcontent-hhc-c5="" data-toggle="modal" data-target="' + modalPopupName + '" onclick=' + functionName + '(' + functionParams + ') class="badge">+'
					+ profileBadgeIncrement
					+ '</span></li>';
				return false;
			}
		});
	} else {
		var users = defaultreporteelist;
		var username = ((users.name == undefined || users.name == "") ? "User"
			: users.name);
		var userProfileConcate = ((users.image == undefined || users.image == "") ? ' class="rounded-circle sub_init_img planuser" data-name="'
			+ username + '" '
			: ' class="rounded-circle sub_init_img" src="' + users.image + '"');
		subinitiativeUser = '<li class="avatar avatar-sm selecteduser"><img data-toggle="modal" data-target="' + modalPopupName + '" onclick=' + functionName + '(' + functionParams + ') '
			+ userProfileConcate
			+ ' alt="'
			+ username
			+ '" width="50"></li>';
	}

	return subinitiativeUser;
}

$(document).on("click", "#submitplanevent", function () {
	if ($("#resolve_date").val() == "") {
		$(".input-calender-icon").css("bottom", "45%");
	} else {
		$(".input-calender-icon").css("bottom", "45%");
	}
});

function formvalidationerrorreset() {
	$('*[id*=-error]').each(function () {
		$(this).remove();
	});
	$(".input-calender-icon").css("bottom", "30%");
}

$(document)
	.on(
		"click",
		".submitevent",
		function () {
			if ($("#raise_date").val() == "") {
				$(".input-calender-icon").css("bottom", "45%");
			} else {
				$(".input-calender-icon").css("bottom", "45%");
			}
			if ($("#riskDetail_complete_date").val() == "") {
				$(".input-calender-icon").css("bottom", "45%");
			} else {
				$(".input-calender-icon").css("bottom", "45%");
			}
			if ($("#riskDetail_next_date").val() == "") {
				$(".input-calender-icon").css("bottom", "45%");
			} else {
				$(".input-calender-icon").css("bottom", "45%");
			}
			$(".chosen-container-single").find('label.error').remove();

		});

$(document).on("click", ".activitysubmit", function () {
	if ($("#activitiesresolved").val() == "") {
		$(".input-calender-icon").css("bottom", "45%");
	} else {
		$(".input-calender-icon").css("bottom", "45%");
	}
});

$(document).on("click", ".actionsubmit", function () {
	if ($("#action_date").val() == "") {
		$(".input-calender-icon").css("bottom", "45%");
	} else {
		$(".input-calender-icon").css("bottom", "45%");
	}
});

function riskSuccessCallback(riskDetailData,riskchangeId) {

console.log(riskDetailData,"riskdetails");
console.log(riskchangeId,"riskchangeId ");
	// var initiativetemplate = $('#risk-template').html();

	// // Mustache.parse(initiativetemplate); // optional, speeds up future uses
	// var initiative_load_id = "";
	// var template = Handlebars.compile(initiativetemplate);
	// if (riskcontentload == true) {

	// 	if (jQuery.isEmptyObject(data)) {
	// 		var riskhtml = `<div class="collapse_arrow_right" style="display: none;">
	// 			<i class="arrow_collapse_size fas fa-caret-right"></i>
	// 		</div>
	// 		<div class="collapse_arrow_left">
	// 			<i class="arrow_collapse_size fas fa-caret-left"></i>
	// 		</div>`;
	// 		$('#risk_top_details').append(riskhtml);
	// 		$('.collapse_arrow_left').css('display', 'block');
	// 		$('.collapse_arrow_left').on('click', function () {
	// 			$(this).css('display', 'none');
	// 			$('.collapse_arrow_right').css('display', 'block');
	// 			var $body = $('body');
	// 			$body.addClass('ini-hide');
	// 			$body.removeClass('ini-show');
	// 			localStorage.setItem("sidebar_subsidemenu", "opened");
	// 			initiativeBar();
	// 		});

	// 		$('.collapse_arrow_right').on('click', function () {
	// 			$(this).css('display', 'none');
	// 			$('.collapse_arrow_left').css('display', 'block');
	// 			var $body = $('body');
	// 			$body.addClass('ini-show');
	// 			$body.removeClass('ini-hide');
	// 			localStorage.setItem("sidebar_subsidemenu", "closed");
	// 			initiativeBar();
	// 		});

	// 	}



		$.each(riskDetailData, function (index, initiative) {

			var bodyRows = '';
			if (index == 0) {
				
				$.ajax({
					url: "/stratroom/risk/" + riskchangeId
						+ "?loadFlag=true",
					success: function (data) {
						$('#risk_top_details').empty();
						$('#causeconsequencebody').empty();
						$('#riskreducingimpactbody').empty();
						$('#riskreviewmonitoringbody').empty();
						$('#riskcomments').empty();
						localStorage.setItem("risk_pagenumber", riskchangeId);
						riskdescSuccessCallback(data, riskchangeId);
					}
				});
			}

		});

	}

function riskdescSuccessCallback(result, initiative_load_id) {

	var initiativedettemplate = $('#riskdetail-template').html();
	var template = Handlebars.compile(initiativedettemplate);
	var commentsHeader = "Comments";

	detailrisk = result;

	/*
	 * var landingimagecolor = "defaultbarimagecircle"; var findprogressvalue =
	 * (result.riskValue.likeliHood != undefined && result.riskValue.likeliHood != "" ?
	 * result.riskValue.likeliHood : ""); if(findprogressvalue == 'Rare') {
	 * landingimagecolor = "greenbarimagecircle"; } else if (findprogressvalue ==
	 * 'Unlikely') { landingimagecolor = "yellowbarimagecircle"; } else if
	 * (findprogressvalue == 'Possible' || findprogressvalue == 'Likely' ||
	 * findprogressvalue == 'Almost Certain') { landingimagecolor =
	 * "orangebarimagecircle"; }
	 */

	var riskimpact = ((result.riskValue != undefined && result.riskValue.impact != undefined) ? result.riskValue.impact
		: "");
	var riskstatus = ((result.riskValue != undefined && result.riskValue.likeliHood != undefined) ? result.riskValue.likeliHood
		: "");

	var initiativeProgressBar = "defaultbarimagecircle";
	if (riskimpact == 'Insignificant' && riskstatus == 'Rare') {
		initiativeProgressBar = "barimageverygood";
	} else if (riskimpact == 'Minor' && riskstatus == 'Rare') {
		initiativeProgressBar = "barimageverygood";
	} else if (riskimpact == 'Moderate' && riskstatus == 'Rare') {
		initiativeProgressBar = "barimagegood";
	} else if (riskimpact == 'Major' && riskstatus == 'Rare') {
		initiativeProgressBar = "barimagegood";
	} else if (riskimpact == 'Catastrophic' && riskstatus == 'Rare') {
		initiativeProgressBar = "barimagemedium";
	} else if (riskimpact == 'Insignificant' && riskstatus == 'Unlikely') {
		initiativeProgressBar = "barimageverygood";
	} else if (riskimpact == 'Minor' && riskstatus == 'Unlikely') {
		initiativeProgressBar = "barimagegood";
	} else if (riskimpact == 'Moderate' && riskstatus == 'Unlikely') {
		initiativeProgressBar = "barimagegood";
	} else if (riskimpact == 'Major' && riskstatus == 'Unlikely') {
		initiativeProgressBar = "barimagemedium";
	} else if (riskimpact == 'Catastrophic' && riskstatus == 'Unlikely') {
		initiativeProgressBar = "barimagebad";
	} else if (riskimpact == 'Insignificant' && riskstatus == 'Possible') {
		initiativeProgressBar = "barimagebad";
	} else if (riskimpact == 'Minor' && riskstatus == 'Possible') {
		initiativeProgressBar = "barimagemedium";
	} else if (riskimpact == 'Moderate' && riskstatus == 'Possible') {
		initiativeProgressBar = "barimagemedium";
	} else if (riskimpact == 'Major' && riskstatus == 'Possible') {
		initiativeProgressBar = "barimagebad";
	} else if (riskimpact == 'Catastrophic' && riskstatus == 'Possible') {
		initiativeProgressBar = "barimagecritical";
	} else if (riskimpact == 'Insignificant' && riskstatus == 'Likely') {
		initiativeProgressBar = "barimagemedium";
	} else if (riskimpact == 'Minor' && riskstatus == 'Likely') {
		initiativeProgressBar = "barimagemedium";
	} else if (riskimpact == 'Moderate' && riskstatus == 'Likely') {
		initiativeProgressBar = "barimagebad";
	} else if (riskimpact == 'Major' && riskstatus == 'Likely') {
		initiativeProgressBar = "barimagecritical";
	} else if (riskimpact == 'Catastrophic' && riskstatus == 'Likely') {
		initiativeProgressBar = "barimagecritical";
	} else if (riskimpact == 'Insignificant' && riskstatus == 'Almost Certain') {
		initiativeProgressBar = "barimagemedium";
	} else if (riskimpact == 'Minor' && riskstatus == 'Almost Certain') {
		initiativeProgressBar = "barimagebad";
	} else if (riskimpact == 'Moderate' && riskstatus == 'Almost Certain') {
		initiativeProgressBar = "barimagebad";
	} else if (riskimpact == 'Major' && riskstatus == 'Almost Certain') {
		initiativeProgressBar = "barimagecritical";
	} else if (riskimpact == 'Catastrophic' && riskstatus == 'Almost Certain') {
		initiativeProgressBar = "barimagecritical";
	}

	var riskimage = result.riskValue.riskImage;
	var username = result.riskValue.createdByName.slice(0, 2);

	if (riskimage == "" || riskimage == " " || riskimage == null || riskimage == undefined) {
		var Owner = 'data-name="' + username + '" class="rounded-circle riskuser ' + initiativeProgressBar + '" ';
		var subOwner = "data-name='" + username + "' class='rounded-circle riskuser'";
	} else {
		var Owner = ' class="rounded-circle ' + initiativeProgressBar + '" src="' + riskimage + ' "';
		var subOwner = " class='rounded-circle' src='" + riskimage + "' ";
	}

	var id = result.id;
	var editicon = "";
	if (riskeditpermission == true) {
		editicon = `<i class="fas fa-pencil-alt title_edit_icon"
										data-toggle="modal" rel="tooltip" data-placement="bottom" title="Edit"
										data-target=".riskDetail_description_popup"
										onclick="handleRiskDetailEvent(`+ id + `,'edit')"></i>
						<i class="fas fa-paperclip title_edit_icon"
										data-toggle="modal" data-target=".file_upload_popup" rel="tooltip" data-placement="bottom" title="File Upload"></i>`;
	}

	var ischeckriskurlornot = $("#ischeckriskurlornot").val();
	if (ischeckriskurlornot == "RISK") {
		riskpagepreference();
	}

	var riskdesignlabel = "";
	var riskiconnames = [{
		"name": "causenconsequence",
		value: "Cause And Consequence"
	}, {
		"name": "chart",
		value: "Heat Map"
	}, {
		"name": "treatment",
		value: "Risk Treatment"
	}, {
		"name": "monitoring",
		value: "Review &amp; Monitoring"
	}, {
		"name": "reducingimpact",
		value: "Controls"
	}, {
		"name": "comments",
		value: "Comments"
	}];

	if (riskpreference['preferences'] != null) {
		riskdesignlabel = "";
		$.each(riskiconnames, function (key, val) {
			if (riskpreference['preferences'][val.name] != undefined
				&& riskpreference['preferences'][val.name] != "") {
				riskempPreference["preferences"][val.name] = riskpreference['preferences'][val.name];
				var checkriskistrueornot = (riskpreference['preferences'][val.name] == "true" ? "true"
					: riskpreference['preferences'][val.name]);
				var subiniviewPreference = (checkriskistrueornot == "true" ? "checked"
					: "");
				if (checkriskistrueornot == "false") {
					$("." + val.name).css(
						"display",
						"none");
				}
				riskdesignlabel += '<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" class="form-check-input" name="'
					+ val.name
					+ '" value="'
					+ val.name
					+ '" '
					+ subiniviewPreference
					+ '/>'
					+ val.value
					+ '<span class="form-check-sign"><span class="check"></span></label></div></a></li>';
			} else {
				riskempPreference["preferences"][val.name] = true;
				riskdesignlabel += '<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" class="form-check-input" name="'
					+ val.name
					+ '" value="'
					+ val.name
					+ '" checked/>'
					+ val.value
					+ '<span class="form-check-sign"><span class="check"></span></label></div></a></li>';
			}
		});

	} else {
		$.each(riskiconnames, function (key, val) {
			riskempPreference["preferences"][val.name] = true;
			riskdesignlabel += '<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" class="form-check-input" name="'
				+ val.name
				+ '" value="'
				+ val.name
				+ '" checked/>'
				+ val.value
				+ '<span class="form-check-sign"><span class="check"></span></label></div></a></li>';
		});
	}

	var viewiconpreference = "";
	if (riskeditpermission == true) {
		viewiconpreference = `<ul class="header-dropdown">
				<li class="dropdown title_edit_icon"><i
					class="far fa-eye" class="dropdown-toggle" rel="tooltip" data-placement="bottom" title="View"
					data-toggle="dropdown" style="padding: 6px;"></i>
					<ul
						class="dropdown-menu riskdropdown-hide multi-column pull-right"
						x-placement="bottom-start"
						style="
                            position: absolute;
                            will-change: transform;
                            top: 0px;
                            left: 0px;
                            width: 230px;
                            padding-top: 12px;
                            padding-bottom: 4px;
                            transform: translate3d(0px, 24px, 0px);">
						<div class="row">
							<div class="col-sm-12">
								<ul class="multi-column-dropdown risk-multi-column-dropdown" id="riskiconview">
									`+ riskdesignlabel + `
								</ul>
							</div>
						</div>
					</ul>
				</li>
			</ul>`;
	}

	var deletetopicon = "";
	if (riskdeletepermission == true) {
		deletetopicon = `<ul class="header-dropdown">
										<li class="dropdown title_edit_icon"><a href="#"
											class="dropdown-toggle" data-toggle="dropdown"
											role="button" aria-haspopup="true" aria-expanded="true">
												<i class="material-icons" data-toggle="tooltip" data-placement="bottom" title="More">more_horiz</i>
										</a>
											<ul class="dropdown-menu riskdeletedropdown-hide pull-right"
												x-placement="bottom-start"
												style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
	                                                
												
												<li><a
													onclick="deleteRiskDetail(`+ id + `)">Delete</a>
												</li>
											</ul>
										</li>
									</ul>`;

	}

	populateCauseList('#riskPlanForm #plancause-select', result.id);
	populateOwnerDropdowndepartment('#monitoring_person');

	$("#riskPlanForm #riskId").val(result.id);

	$("#monitoring_name").val(result.riskUniqueId)
	if (result.riskUniqueId) {
		monitoringname = result.riskUniqueId
	} else {
		monitoringname = result.id
	}
	$("#monitoringriskId").val(result.id)



	$("#monitoring_person").val(Owner).trigger("chosen:updated");

	var idval = result.id;
	if (result.riskUniqueId && result.riskUniqueId != "") {
		idval = result.riskUniqueId;
	}

	var inherentscore = controlpanelRiskSettings.inherentscorecause ? (result.inherentRiskCauseScore ? result.inherentRiskCauseScore : "") : result.inherentRiskConsequenceScore ? result.inherentRiskConsequenceScore : "";

	var residualscore = controlpanelRiskSettings.residualscoreimpact ? (result.residualRiskImpactScore ? result.residualRiskImpactScore : "") : result.residualRiskPossibiltyScore ? result.residualRiskPossibiltyScore : "";


	var initdetail = {
		risksetting: {
			relatedParties: controlpanelRiskSettings.riskrelatedparties,
			inherentriskscore: controlpanelRiskSettings.riskinherentscore,
			residualriskscore: controlpanelRiskSettings.riskresidualscore,
			riskiso: controlpanelRiskSettings.riskiso,
			riskothers: controlpanelRiskSettings.riskothers,
			riskpos: controlpanelRiskSettings.riskpos,
			riskpersonincharge: controlpanelRiskSettings.riskpersonincharge,
			riskinformationasset: controlpanelRiskSettings.riskinformationasset
		},
		title: result.riskValue.name,
		inherentscore: inherentscore,
		residualscore: residualscore,

		Owner: Owner,
		subOwner: subOwner,
		id: idval,
		landingimagecolor: initiativeProgressBar,
		editicon: editicon,
		viewiconpreference: viewiconpreference,
		deletetopicon: deletetopicon,
		status: result.riskValue.status,
		dept: result.riskValue.departmentId,
		riskcategory: result.riskValue.riskcategory,
		relatedparties: result.riskValue.relatedparties,
		impact: result.riskValue.impact,
		score: result.riskValue.score,
		likeliHood: result.riskValue.likeliHood,
		riskStatus: result.riskValue.riskStatus,
		ch_dateRaised: result.riskValue.ch_dateRaised,
		impactDesc: result.riskValue.impactDesc,
		financialImpact: result.riskValue.financialImpact,
		ch_nextAssessment: result.riskValue.ch_nextAssessment,
		ch_dateCompleted: result.riskValue.ch_dateCompleted,
		riskposval: result.riskValue.riskpos,
		riskisoval: result.riskValue.riskiso,
		riskinformationassetval: result.riskValue.riskinformationasset,
		riskothersval: result.riskValue.riskothers
	};

	$('#risk_top_details').html(template(initdetail));
	$('.riskuser').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
	$('[data-toggle="tooltip"]').tooltip();
	$('[rel="tooltip"]').tooltip();
	// chart
	// cause and consequence list
	var causeconsequenceHeader = "Cause and Consequence";
	if (result.riskValue.causeheader != undefined && result.riskValue.causeheader != '') {
		causeconsequenceHeader = result.riskValue.causeheader;
	}

	var causeconsequenceinlineEditIcon = `<strong>` + causeconsequenceHeader + `</strong>`;
	if (causeeditpermission == true) {
		causeconsequenceinlineEditIcon = `<strong class="editableTxt1"
			onkeypress="return (this.innerText.length <= 25)" data-oldcauseheader="`+ causeconsequenceHeader + `" id="causeheader" editable="true" contenteditable="true">` + causeconsequenceHeader + `</strong>`;
	}

	var createcauseIcon = "";
	if (causecreatepermission == true) {
		createcauseIcon = `<div class="create_initives add-sub-initiative">
									<span class="sub_initiative" data-toggle="modal"
										data-target=".cause_conq_popup"
										onclick="handleRiskCauseEvent(0,${id},'add')"><i
										class="fa fa-plus"></i>Add</span>
								</div>`;
	}

	var causepermissionOptions = "";
	if (causeviewpermission == false || conviewpermission == false) {
		causepermissionOptions = "";
	} else {
		causepermissionOptions = `<ul class="header-dropdown m-r--2 d-flex" >
                                    		<li class="dropdown m-t--10">
                                        		<a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                            		<i class="material-icons">more_vert</i>
                                        		</a>
                                        		<ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">`;

		if (causeviewpermission == true || conviewpermission == true) {
			causepermissionOptions += `<li>
                                                	<a href="#" data-toggle="modal" data-target=".cause_conq_view_popup" " onclick="causeconqviewdetails(`+ id + `)">View</a>
                                            		</li>`;
		}

		causepermissionOptions += `</ul></li></ul>`;
	}

	var sub_initiatiesrow = '<div class="panel-group risk-panel-group" id="risk_accordion_1" role="tablist" aria-multiselectable="true" >';
	var riskcollapse = 1;
	$.each(result.riskCauseAndConsequenceList,
		function (index, item) {
			var riskcolor = "";
			sub_initiatiesrow += '<div class="panel risk-panel panel-col_border" ><div class="panel-heading risk-panel-heading" role="tab" id="risk_headingOne_1"><div class="panel-title_risk" ><a role="button" data-toggle="collapse" data-parent="#risk_accordion_1" href="#risk_collapseOne_'
				+ riskcollapse
				+ '" aria-expanded="false" aria-controls="risk_collapseOne_1" class="collapsed">';
			sub_initiatiesrow +=`'<div class="conq_title_name"><pre style="white-space: pre-wrap;font-family:'Poppins',sans-serif;">'`
				+ item.causeAndConsequenceValue.name
				+ '</pre></div><div class="d-flex flex-row"><div class="flex-column"><div class="risk_badge '
				+ riskcolor + '">'

			if (controlpanelRiskSettings["cause-select"] && controlpanelRiskSettings["cause-select"] === "riskcategory") {
				sub_initiatiesrow += displayOptionText("riskcategory", item.causeAndConsequenceValue.riskcategory)
					+ '</div>';
			} else {
				sub_initiatiesrow += displayOptionText("rating", item.causeAndConsequenceValue.riskRating)
					+ '</div>';
			}


			sub_initiatiesrow += '</div></div>';

			var subcausepermissionOptions = "";
			if (concreatepermission == false && causeeditpermission == false && causedeletepermission == false) {
			} else {
				subcausepermissionOptions = `<div class="flex-column"><ul class="header-dropdown m-r--2 pt-3 d-flex">
					                                    		<li class="dropdown">
					                                        		<a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
					                                            		<i class="material-icons" >more_vert</i>
					                                        		</a>
					                                        		<ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">`;

				if (concreatepermission == true) {
					subcausepermissionOptions += `<li><a href="#" data-toggle="modal"
																				data-target=".sub_cause_conq_popup"
																				onclick="handleRiskConqEvent(0,${item.id},'add')">Add</a>
																			</li>`;
				}
				if (causeeditpermission == true) {
					subcausepermissionOptions += `<li><a href="#" data-toggle="modal"
																				data-target=".cause_conq_popup"
																				onclick="handleRiskCauseEvent(${item.id},${id},'edit')">Edit</a>
																			</li>`;
				}
				if (causedeletepermission == true) {
					subcausepermissionOptions += `<li><a onclick="deleteRiskCause(${item.id})">Delete</a></li>`;
				}

				subcausepermissionOptions += `</ul></li></ul></div>`;
			}

			sub_initiatiesrow += subcausepermissionOptions + '</a></div></div>';
			if (concontentload) {
				$.each(item.consequenceList,
					function (index, item1) {
						var riskcolor = "";
						sub_initiatiesrow += '<div id="risk_collapseOne_'
							+ riskcollapse
							+ '" class="panel-collapse in collapse show" role="tabpanel" aria-labelledby="risk_headingOne_1" style="">';
						sub_initiatiesrow += `'<div class="badge_risk_title"><div class="conq_sub_title_name"><pre style="white-space: pre-wrap;font-family:'Poppins',sans-serif;">'`
							+ item1.consequenceValue.name
							+ '</pre></div><div class="risk_badge '
							+ riskcolor
							+ '">'

						if (controlpanelRiskSettings["consequence-select"] && controlpanelRiskSettings["consequence-select"] === "category") {
							sub_initiatiesrow += displayOptionText("category", item1.consequenceValue.impactcategory)
								+ '</div>';
						} else {
							sub_initiatiesrow += displayOptionText("category", item1.consequenceValue.riskRating)
								+ '</div>';
						}


						var subconqcausepermissionOptions = "";
						if (coneditpermission == false && condeletepermission == false) {
						} else {
							subconqcausepermissionOptions = `<div class="flex-column"><ul class="header-dropdown m-r--2 pt-3 d-flex">
										                                    		<li class="dropdown">
										                                        		<a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
										                                            		<i class="material-icons" style="margin-top: -360px;">more_vert</i>
										                                        		</a>
										                                        		<ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">`;

							if (coneditpermission == true) {
								subconqcausepermissionOptions += `<li><a href="#" data-toggle="modal"
																					data-target=".sub_cause_conq_popup"
																					onclick="handleRiskConqEvent(`+ item1.id + `,` + item1.causeConqId + `,'edit')">Edit</a>
																				</li>`;
							}
							if (condeletepermission == true) {
								subconqcausepermissionOptions += `<li><a onclick="deleteRiskConsequence(` + item1.id + `)">Delete</a></li>`;
							}

							subconqcausepermissionOptions += `</ul></li></ul></div>`;
						}
						sub_initiatiesrow += subconqcausepermissionOptions + '</div></div>';
					});
			}

			sub_initiatiesrow += '</div>';
			riskcollapse++;
		});
	sub_initiatiesrow += '</div>';

	var causeRows = sub_initiatiesrow;
	var causeTemplate = $('#cause-consequence-template').html();
	var causeDetails = Mustache.render(causeTemplate, {
		id: id,
		createcauseIcon: createcauseIcon,
		causeRows: causeRows,
		causeconsequenceinlineEditIcon: causeconsequenceinlineEditIcon,
		causepermissionOptions: causepermissionOptions
	});

	if (causecontentload) {
		$('#causeconsequencebody').html(causeDetails);
	}

	$('.causeandconsequencelist').slimscroll({
		height: "340px",
		size: '3px',
		color: '#9c9c9c'
	});



	// risk treatment list
	var riskplanHeader = "Controls";
	if (result.riskValue.planheader != undefined && result.riskValue.planheader != '') {
		riskplanHeader = result.riskValue.planheader;
	}

	var riskplaninlineEditIcon = `<strong>` + riskplanHeader + `</strong>`;
	if (planeditpermission == true) {
		riskplaninlineEditIcon = `<strong class="editableTxt1"
			onkeypress="return (this.innerText.length <= 25)" data-oldplanheader="`+ riskplanHeader + `" id="planheader" editable="true" contenteditable="true">` + riskplanHeader + `</strong>`;
	}

	var createriskIcon = "";
	if (plancreatepermission == true) {
		createriskIcon = `<div class="create_initives add-sub-initiative">
									<span class="sub_initiative" data-toggle="modal"
										data-target=".plan_desc_add_popup" onclick="handleRiskPlanEvent('',${result.id},'add')"><i
										class="fa fa-plus"></i>Add</span>
								</div>`;
	}

	var risktreatmentpermissionOptions = "";
	if (planviewpermission == false) {
		risktreatmentpermissionOptions = "";
	} else {
		risktreatmentpermissionOptions = `<ul class="header-dropdown m-r--2 d-flex">
                                    		<li class="dropdown m-t--10">
                                        		<a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                            		<i class="material-icons">more_vert</i>
                                        		</a>
                                        		<ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" 
												style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">`;

		if (planviewpermission == true) {
			risktreatmentpermissionOptions += `<li>
                                                	<a href="#" data-toggle="modal"  data-target=".sub_initative_view_popup" id="risk_treat" onclick="planviewdetails(`+ id + `)">View</a>
                                            		</li>`;
		}
		

		risktreatmentpermissionOptions += `</ul></li></ul>`;
	}

	console.log(riskupdateDescription)
	var defaultreporteelist = {
		"id": riskupdateDescription.createdBy,
		"name": riskupdateDescription.riskValue? riskupdateDescription.riskValue.createdByName : "",
		"image": riskupdateDescription.riskValue? riskupdateDescription.riskValue.riskimage : ""
	};

	var subinitiativeProgressBar = "";
	var sub_initiatiesrow = '<div class="panel-group risk-panel-group" id="risk_accordion_10" role="tablist" aria-multiselectable="true">';
	var riskcollapse = 1;
	var chartcontent01 = [];
	var chartcontent02 = [];
	$.each(result.riskPlanList, function (index, item) {
		var chartvalue = 100 - parseInt(item.riskPlanValue.progress);
		var chartbalance = item.riskPlanValue.progress;
	
		if (chartvalue == 0) {
			chartbalance = 100;
		}
	
		var resultPorfileContent = riskPorfileFormationrisk(item.ownerList, defaultreporteelist, 'riskplan', item.id);
		var owenrsvalue = item.riskPlanValue.multipleOwners ? item.riskPlanValue.multipleOwners : currentEmp;
	
		var risktreatmentpermissionOptions = "";
		if (actioncreatepermission || planeditpermission || plandeletepermission) {
			risktreatmentpermissionOptions = `<div class="flex-column"><ul class="header-dropdown m-r--2 pt-3 d-flex" style="margin-right: -12px; margin-top: -6px;">
				<li class="dropdown">
					<a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
						<i class="material-icons">more_vert</i>
					</a>
					<ul class="dropdown-menu editoptionparentdropdown-menu pull-right">`;
	
			if (actioncreatepermission) {
				risktreatmentpermissionOptions += `<li><a href="#" data-toggle="modal" data-target=".activity_desc_add_popup" onclick="handleRiskActivitiesEvent(${item.id}, '', 'add')">Add</a></li>`;
			}
			if (planeditpermission) {
				risktreatmentpermissionOptions += `<li><a href="#" data-toggle="modal" data-target=".plan_desc_add_popup" onclick="handleRiskPlanEvent(${item.id}, ${id}, 'edit')">Edit</a></li>`;
			}
			if (plandeletepermission) {
				risktreatmentpermissionOptions += `<li><a onclick="deleteRiskPlan(${item.id})">Delete</a></li>`;
			}
	
			risktreatmentpermissionOptions += `</ul></li></ul></div>`;
		}
	
		var resolveDate = item.riskPlanValue.resolveDate ? dateFormatedtohumanread(item.riskPlanValue.resolveDate) : "";
		var reducingdescription = "";
		if (controlpanelRiskSettings['reducingimpact-select'] === "controltypes" && item.riskPlanValue && item.riskPlanValue.controlTypes) {
			reducingdescription = displayOptionText("controltypes", item.riskPlanValue.controlTypes);
		} else if (controlpanelRiskSettings['reducingimpact-select'] === "controleffectiveness" && item.riskPlanValue && item.riskPlanValue.controleffectiveness) {
			reducingdescription = displayOptionText("controleffectiveness", item.riskPlanValue.controleffectiveness);
		} else if (controlpanelRiskSettings['reducingimpact-select'] === "category" && item.riskPlanValue && item.riskPlanValue.category) {
			reducingdescription = displayOptionText("category", item.riskPlanValue.category);
		}
		sub_initiatiesrow += '<div class="panel risk-panel panel-col_border"><div class="panel-heading risk-panel-heading" role="tab" id="risk_headingOne_10"><div class="panel-title_risk">';
		sub_initiatiesrow += '<div class="d-flex flex-row employe_content_border sub_initiative_details" style="margin-bottom: 0px; width: 100%;"><div class="d-flex flex-column flex-fill profile_content" style="width:100%;"><div class="d-flex flex-row"><a role="button" data-toggle="collapse" data-parent="#risk_accordion_10" href="#risktreat_collapseOne_'
			+ riskcollapse
			+ `'" aria-expanded="false" aria-controls="risk_collapseOne_10" class="collapsed" style="padding: 0px 0px !important;width:20px"><div class="d-flex flex-column init_flex_profile" style="color: #1e252d;"><pre style="white-space: pre-wrap;font-family:'Poppins',sans-serif;"><p>'`
			+ item.riskPlanValue.name
			+ '</p></pre></div></a><div class="d-flex flex-column">'
			+ '<input type="hidden" id="plans_selected_user_' + item.id + '" value="' + owenrsvalue + '"><ul class="list-unstyled order-list d-flex" id="riskplans_user_' + item.id + '">'
			+ resultPorfileContent
			+ '</ul></div>' + risktreatmentpermissionOptions + '</div><div class="d-flex flex-row"><div class="d-flex flex-column flex-fill"><div class="d-flex flex-row"><div class="icon"><div id="two" class="view_paln_chart_green_'
			+ item.id
			+ ' view_plan_chart_pie_'
			+ item.id
			+ '"></div></div><div class="pie-progress" style="color: #1e252d;">'
			+ item.riskPlanValue.progress
			+ '</div></div></div><div class="d-flex flex-column flex-fill"><div><strong style="color: #1e252d;">'
			+ item.riskPlanValue.action
			+ '</strong></div></div><div class="d-flex flex-column"><div><strong style="color: #1e252d;">'
			+ resolveDate
			+ '</strong></div></div></div>';
		sub_initiatiesrow += '</div></div></div></div>';
		chartcontent01.push({
			"index": item.id,
			"chartbalance": chartbalance,
			"chartvalue": chartvalue
		});

		if (actionviewpermission) {
			$.each(item.riskActivitiesDTOList, function (index, item1) {
				var activitychartvalue = 100 - parseInt(item1.riskActivitiesValue.progress);
				var activitychartbalance = item1.riskActivitiesValue.progress;
	
				if (activitychartvalue == 0) {
					activitychartbalance = 100;
				}
	
				chartcontent02.push({ "index": item1.id, "chartbalance": activitychartbalance, "chartvalue": activitychartvalue });
	
				var subrisktreatmentpermissionOptions = "";
				if (actioneditpermission || actiondeletepermission) {
					subrisktreatmentpermissionOptions = `<div class="flex-column" style="margin-right: -10px;"><ul class="header-dropdown m-r--2 pt-3 d-flex">
						<li class="dropdown">
							<a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
								<i class="material-icons">more_vert</i>
							</a>
							<ul class="dropdown-menu editoptionparentdropdown-menu pull-right">`;
	
					if (actioneditpermission) {
						subrisktreatmentpermissionOptions += `<li><a href="#" data-toggle="modal" data-target=".activity_desc_add_popup" onclick="handleRiskActivitiesEvent(${item.id}, ${item1.id}, 'edit')">Edit</a></li>`;
					}
					if (actiondeletepermission) {
						subrisktreatmentpermissionOptions += `<li><a onclick="deleteRiskActivities(${item1.id})">Delete</a></li>`;
					}
	
					subrisktreatmentpermissionOptions += `</ul></li></ul></div>`;
				}
	
				var reducingpossibilitydescription = "";
				if (controlpanelRiskSettings['reducingpossibility-select'] === "controltypes" && item.riskPlanValue && item.riskPlanValue.controlTypes) {
					reducingpossibilitydescription = displayOptionText("controltypes", item.riskPlanValue.controlTypes);
				} else if (controlpanelRiskSettings['reducingpossibility-select'] === "controleffectiveness" && item.riskPlanValue && item.riskPlanValue.controleffectiveness) {
					reducingpossibilitydescription = displayOptionText("controleffectiveness", item.riskPlanValue.controleffectiveness);
				}
	
				var resoleveby = item1.riskActivitiesValue.resoleveby ? dateFormatedtohumanread(item1.riskActivitiesValue.resoleveby) : "";
				sub_initiatiesrow += `<div id="risktreat_collapseOne_${riskcollapse}" class="panel-collapse in collapse show" role="tabpanel" aria-labelledby="risk_headingOne_${riskcollapse}" style="">
					<div class="d-flex flex-row employe_content_border sub_initiative_details" style="margin: 11px 4px;">
						<div class="d-flex flex-column flex-fill profile_content">
							<div class="d-flex flex-row">
								<div class="d-flex flex-column init_flex_profile">
									<p style="width:85%;"><pre style="white-space: pre-wrap;font-family:'Poppins',sans-serif;">${item1.riskActivitiesValue.name}</pre></p>
								</div>
								<div class="d-flex flex-column">
									<div><strong>${item1.riskActivitiesValue.status}</strong></div>
								</div>
								${subrisktreatmentpermissionOptions}
							</div>
							<div class="d-flex flex-row">
								<div class="d-flex flex-column flex-fill">
									<div class="d-flex flex-row">
										<div class="icon">
											<div id="two" class="view_activity_chart_green_${item1.id} view_activity_chart_pie_${item1.id}"></div>
										</div>
										<div class="pie-progress">${item1.riskActivitiesValue.progress}</div>
									</div>
								</div>
								<div class="d-flex flex-column flex-fill">
									<div><strong style="color: #1e252d;">${reducingpossibilitydescription}</strong></div>
								</div>
								<div class="d-flex flex-column">
									<div>${resoleveby}</div>
								</div>
							</div>
						</div>
					</div>
				</div>`;
			});
		}
	
		riskcollapse++;
	});
	
	sub_initiatiesrow += '</div>';

	var risktreatmentRows = sub_initiatiesrow;
	var causeTemplate = $('#risk-reducingimpact-template').html();
	var causeDetails = Mustache.render(causeTemplate, {
		id: id,
		createriskIcon: createriskIcon,
		risktreatmentRows: risktreatmentRows,
		risktreatmentinlineEditIcon: riskplaninlineEditIcon,
		risktreatmentpermissionOptions: risktreatmentpermissionOptions
		// risktreatmentpermissionOptions:risktreatmentpermissionOptions
	});
	$('#riskreducingimpactbody').html(causeDetails);





	//Next Starts Reducing Possibility 

	$.each(chartcontent01, function (index1, value1) {
		if (value1.chartbalance == 100) {
			$(
				".view_paln_chart_green_" + value1.index
				+ ",.view_plan_chart_pie_" + value1.index)
				.sparkline([value1.chartbalance, value1.chartvalue], {
					type: 'pie',
					height: '30px',
					sliceColors: ["#1aa243", "#ffffff"]
				});
		} else {
			$(
				".view_paln_chart_green_" + value1.index
				+ ",.view_plan_chart_pie_" + value1.index)
				.sparkline([value1.chartbalance, value1.chartvalue], {
					type: 'pie',
					height: '30px',
					sliceColors: ["#ffd500", "#ffffff"]
				});
		}
	});
	$.each(chartcontent02, function (index1, value1) {
		if (value1.chartbalance == 100) {
			$(
				".view_activity_chart_green_" + value1.index
				+ ",.view_activity_chart_pie_" + value1.index)
				.sparkline([value1.chartbalance, value1.chartvalue], {
					type: 'pie',
					height: '30px',
					sliceColors: ["#1aa243", "#ffffff"]
				});
		} else {
			$(
				".view_activity_chart_green_" + value1.index
				+ ",.view_activity_chart_pie_" + value1.index)
				.sparkline([value1.chartbalance, value1.chartvalue], {
					type: 'pie',
					height: '30px',
					sliceColors: ["#ffd500", "#ffffff"]
				});
		}
	});

	$('[class^=view_paln_chart_green_]').children(':first-child').css('border',
		'1px solid #c7c7c7').css('border-radius', '50%');
	$('[class^=view_activity_chart_green_]').children(':first-child').css(
		'border', '1px solid #c7c7c7').css('border-radius', '50%');




	// risk review list
	var risktreatmentvalueHeader = "Risk Treatment";
	if (result.riskValue.treatmentheader != undefined && result.riskValue.treatmentheader != '') {
		risktreatmentvalueHeader = result.riskValue.treatmentheader;
	}

	var risktreatmentvalinlineEditIcon = `<strong>` + risktreatmentvalueHeader + `</strong>`;
	if (planeditpermission == true) {
		risktreatmentvalinlineEditIcon = `<strong class="editableTxt1"
			onkeypress="return (this.innerText.length <= 25)" data-oldtreatmentheader="${risktreatmentvalueHeader}" id="treatmentheader" editable="true" contenteditable="true">` + risktreatmentvalueHeader + `</strong>`;
	}

	var risktreatmentRows = sub_initiatiesrow;
	var createriskIcon = "";
	createriskIcon = `<div class="create_initives add-sub-initiative">
	<span class="sub_initiative" data-toggle="modal"
		data-target=".risk_treatment_add_popup" onclick="handleRiskTreatmentEvent('', ${id}, 'add')">
		<i class="fa fa-plus"></i>Add</span>
  </div>`;



	var risktreatmentpermissionOptions = "";
	if (planviewpermission == false) {
		risktreatmentpermissionOptions = "";
	} else {
		risktreatmentpermissionOptions = `<ul class="header-dropdown m-r--2 d-flex">
		<li class="dropdown m-t--10">
			<a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
				<i class="material-icons">more_vert</i>
			</a>
			<ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">`;

		if (planviewpermission == true) {
			risktreatmentpermissionOptions += `<li>
                                                	<a href="#" data-toggle="modal" data-target=".treatment_view_popup"  onclick="treatmentviewdetails(`+ id + `)">View</a>
                                            		</li>`;
		}

		risktreatmentpermissionOptions += `</ul></li></ul>`;
	}

	var defaultreporteelist = {
		"id": riskupdateDescription.createdBy,
		"name": riskupdateDescription.riskValue? riskupdateDescription.riskValue.createdByName : "",
		"image": riskupdateDescription.riskValue? riskupdateDescription.riskValue.riskimage : ""
	};

	var sub_initiatiesrow = '<div class="panel-group risk-panel-group" id="risk_accordion_11" role="tablist" aria-multiselectable="true">';
	var subinitiativeProgressBar = "";
	var riskcollapse = 1;
	var chartcontent13 = [];
	var chartcontent12 = [];
	$.each(result.riskTreatmentList, function (index, item) {
		var chartvalue = parseInt(100)
					- parseInt(item.riskPlanValue.progress);
				var chartbalance = item.riskPlanValue.progress;

				if (chartvalue == 0) {
					chartbalance = 100;
				}

		var resultPorfileContent = riskPorfileFormationrisk(
			item.ownerList, defaultreporteelist,
			'risktreatment', item.id);
		var owenrsvalue = (item.riskPlanValue.multipleOwners != undefined && item.riskPlanValue.multipleOwners != "" ? item.riskPlanValue.multipleOwners : currentEmp);

		var risktreatmentpermissionOptions = "";
		if (planeditpermission == false && plandeletepermission == false) {
		} else {
			risktreatmentpermissionOptions = `<div class="flex-column"><ul class="header-dropdown m-r--2 pt-3 d-flex" style="margin-right: -12px; margin-top: -6px;">
	                                    		<li class="dropdown">
	                                        		<a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
	                                            		<i class="material-icons">more_vert</i>
	                                        		</a>
	                                        		<ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">`;

			if (planeditpermission == true) {
				risktreatmentpermissionOptions += `<li><a href="#" data-toggle="modal"
																data-target=".risk_treatment_add_popup"
																onclick="handleRiskTreatmentEvent(${item.id},${id},'edit')">Edit</a>
															</li>`;
			}
			if (plandeletepermission == true) {
				risktreatmentpermissionOptions += `<li><a onclick="deleteRiskMonitoring(` + item.id + `)">Delete</a></li>`;
			}

			risktreatmentpermissionOptions += `</ul></li></ul></div>`;
		}
		var resolveDate = item.riskPlanValue.resolveDate ? dateFormatedtohumanread(item.riskPlanValue.resolveDate) : "";
		var status = (item.riskPlanValue.action != undefined ? item.riskPlanValue.action : "");

		var impact = (item.riskPlanValue.reducingimpact && item.riskPlanValue.reducingimpact !== "") ? item.riskPlanValue.reducingimpact : "";

		var possibility = (item.riskPlanValue.reducingpossibility && item.riskPlanValue.reducingpossibility != "") ? item.riskPlanValue.reducingpossibility : ""
		sub_initiatiesrow += '<div class="panel risk-panel panel-col_border"><div class="panel-heading risk-panel-heading" role="tab" id="risk_headingOne_10"><div class="panel-title_risk">';
		sub_initiatiesrow += '<div class="d-flex flex-row employe_content_border sub_initiative_details" style="margin-bottom: 0px; padding: 5px;width:100%;"><div class="d-flex flex-column flex-fill profile_content" style="width:100%;"><div class="d-flex flex-row"><a role="button" data-toggle="collapse" data-parent="#risk_accordion_10" href="#risk_treatment_'
			+ riskcollapse
			+ `'" aria-expanded="false" aria-controls="risk_collapseOne_10" class="collapsed" style="padding: 0px 0px !important;"><div class="d-flex flex-column init_flex_profile" style="color: #1e252d;"><p style="width:95%;"><strong>Reducing Impact:</strong> <pre style="white-space: pre-wrap;font-family:'Poppins',sans-serif;"><p>'`
			+ impact
			+ `'</p></pre></p></div><div class="d-flex flex-column init_flex_profile" style="color: #1e252d;"><p style="width:95%;"><strong>Reducing Possibility:</strong> <pre style="white-space: pre-wrap;font-family:'Poppins',sans-serif;"><p>'`
			+ possibility
			+ '</p></pre></p></div></a><div class="d-flex flex-column">'
			+ '<input type="hidden" id="treatment_selected_user_' + item.id + '" value="' + owenrsvalue + '"><ul class="list-unstyled order-list d-flex" id="riskmonitor_user_' + item.id + '">'
			+ resultPorfileContent
			+ '</ul></div>'+ risktreatmentpermissionOptions + '</div><div class="d-flex flex-row"><div class="d-flex flex-column flex-fill"><div class="d-flex flex-row"><div class="icon"><div id="two" class="view_paln_chart_green_'
			+ item.id
			+ ' view_plan_chart_pie_'
			+ item.id
			+ '"></div></div><div class="pie-progress" style="color: #1e252d;">'
			+ item.riskPlanValue.progress
			+ '</div></div></div><div class="d-flex flex-row" ><div class="d-flex flex-column flex-fill"><div><strong style="color: #1e252d;margin-left: -100px;">'
			+ status
			+ '</strong></div></div><div class="d-flex flex-column"><div><strong style="color: #1e252d;">'
			+ item.riskPlanValue.timetarget
			+ '</strong></div></div></div>';
		sub_initiatiesrow += '</div></div></div></div>';
		chartcontent13.push({
			"index": item.id,
			"chartbalance": chartbalance,
			"chartvalue": chartvalue
		});

		$.each(item.riskReviewList,
			function (index, item1) {
				var activitychartvalue = 100 - parseInt(item1.riskPlanValue.progress);
				var activitychartbalance = item1.riskPlanValue.progress;
	
				if (activitychartvalue == 0) {
					activitychartbalance = 100;
				}
	
				chartcontent12.push({ "index": item1.id, "chartbalance": activitychartbalance, "chartvalue": activitychartvalue });
				var resoleveby = dateFormatedtohumanread(item1.riskPlanValue.timetarget);
				sub_initiatiesrow += '<div id="risk_treatment_'
					+ riskcollapse
					+ '" class="panel-collapse in collapse show" role="tabpanel" aria-labelledby="risk_headingOne_10" style="">';
				sub_initiatiesrow += `'<div class="d-flex flex-row employe_content_border sub_initiative_details" style="margin: 11px 4px; padding: 5px;width:97%;"><div class="d-flex flex-column flex-fill profile_content" style="width:100%;"><div class="d-flex flex-row"><div class="d-flex flex-column init_flex_profile"><p style="width:85%;"><pre style="white-space: pre-wrap;font-family:'Poppins',sans-serif;">'`
					+ item1.riskPlanValue.reducingimpact
					+ '</pre></p></div><div class="d-flex flex-row"><div class="d-flex flex-column flex-fill"><div class="d-flex flex-row"><div class="icon"><div id="two" class="view_activity_chart_green_'
					+ item1.id
					+ ' view_activity_chart_pie_'
					+ item1.id
					+ '"></div></div><div class="pie-progress">'
					+ item1.riskPlanValue.progress
					+ '</div></div></div></div><div class="d-flex flex-row"><div class="d-flex flex-column flex-fill"></div><div class="d-flex flex-column"><div>'
					+ resoleveby
					+ '</div></div></div></div></div></div>'
			});

		sub_initiatiesrow += '</div>';
		
		riskcollapse++;
	});
	sub_initiatiesrow += '</div>';

	$("#treatment_view").html('');
	$("#treatment_view").html(sub_initiatiesrow);

	var risktreatmentRows = sub_initiatiesrow;
	var createriskIcon = "";
	createriskIcon = `<div class="create_initives add-sub-initiative">
	<span class="sub_initiative" data-toggle="modal"
		data-target=".risk_treatment_add_popup" onclick="handleRiskTreatmentEvent('', ${id}, 'add')">
		<i class="fa fa-plus"></i>Add</span>
  </div>`;

	var causeTemplate = $('#risk-treatment-template').html();
	var causeDetails = Mustache.render(causeTemplate, {
		id: id,
		createriskIcon: createriskIcon,
		risktreatmentRows: risktreatmentRows,
		risktreatmentinlineEditIcon: risktreatmentvalinlineEditIcon,
		risktreatmentpermissionOptions: risktreatmentpermissionOptions
	});
	$('#risktreatmentbody').html(causeDetails);


	$.each(chartcontent13, function (index1, value1) {
		if (value1.chartbalance == 100) {
			$(
				".view_paln_chart_green_" + value1.index
				+ ",.view_plan_chart_pie_" + value1.index)
				.sparkline([value1.chartbalance, value1.chartvalue], {
					type: 'pie',
					height: '30px',
					sliceColors: ["#1aa243", "#ffffff"]
				});
		} else {
			$(
				".view_paln_chart_green_" + value1.index
				+ ",.view_plan_chart_pie_" + value1.index)
				.sparkline([value1.chartbalance, value1.chartvalue], {
					type: 'pie',
					height: '30px',
					sliceColors: ["#ffd500", "#ffffff"]
				});
		}
	});
	$.each(chartcontent12, function (index1, value1) {
		if (value1.chartbalance == 100) {
			$(
				".view_activity_chart_green_" + value1.index
				+ ",.view_activity_chart_pie_" + value1.index)
				.sparkline([value1.chartbalance, value1.chartvalue], {
					type: 'pie',
					height: '30px',
					sliceColors: ["#1aa243", "#ffffff"]
				});
		} else {
			$(
				".view_activity_chart_green_" + value1.index
				+ ",.view_activity_chart_pie_" + value1.index)
				.sparkline([value1.chartbalance, value1.chartvalue], {
					type: 'pie',
					height: '30px',
					sliceColors: ["#ffd500", "#ffffff"]
				});
		}
	});

	$('[class^=view_paln_chart_green_]').children(':first-child').css('border',
		'1px solid #c7c7c7').css('border-radius', '50%');
	$('[class^=view_activity_chart_green_]').children(':first-child').css(
		'border', '1px solid #c7c7c7').css('border-radius', '50%');



	// risk review list
	var riskreviewHeader = "Review & Monitoring";
	if (result.riskValue.monitoringheader != undefined && result.riskValue.monitoringheader != '') {
		riskreviewHeader = result.riskValue.monitoringheader;
	}

	var riskreviewinlineEditIcon = `<strong>` + riskreviewHeader + `</strong>`;
	if (planeditpermission == true) {
		riskreviewinlineEditIcon = `<strong class="editableTxt1"
			onkeypress="return (this.innerText.length <= 25)" data-oldmonitoringheader="`+ riskreviewHeader + `" id="monitoringheader" editable="true" contenteditable="true">` + riskreviewHeader + `</strong>`;
	}





	var riskreviewpermissionOptions = "";
	if (planviewpermission == false) {
		riskreviewpermissionOptions = "";
	} else {
		riskreviewpermissionOptions = `<ul class="header-dropdown m-r--2 d-flex">
                                    		<li class="dropdown m-t--10">
                                        		<a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                            		<i class="material-icons">more_vert</i>
                                        		</a>
                                        		<ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">`;

		if (planviewpermission == true) {
			riskreviewpermissionOptions += `<li>
                                                	<a href="#" data-toggle="modal" data-target=".monitoring_view_popup" onclick="monitoringviewdetails(`+ id + `)">View</a>
                                            		</li>`;
		}

		riskreviewpermissionOptions += `</ul></li></ul>`;
	}

	var defaultreporteelist = {
		"id": riskupdateDescription.createdBy,
		"name": riskupdateDescription.riskValue? riskupdateDescription.riskValue.createdByName : "",
		"image": riskupdateDescription.riskValue? riskupdateDescription.riskValue.riskimage : ""
	};

	var sub_initiatiesrow = '<div class="panel-group risk-panel-group" id="risk_accordion_10" role="tablist" aria-multiselectable="true">';
	var subinitiativeProgressBar = "";
	var riskcollapse = 1;
	var chartcontent21 = [];
	var chartcontent22 = [];
	$.each(result.riskMonitoringList, function (index, item) {
		var chartvalue = parseInt(100)
					- parseInt(item.riskMonitoringValue.progress);
				var chartbalance = item.riskMonitoringValue.progress;

				if (chartvalue == 0) {
					chartbalance = 100;
				}


		var resultPorfileContent = riskPorfileFormationrisk(
			item.ownerList, defaultreporteelist,
			'riskreview', item.id);
		var owenrsvalue = (item.riskMonitoringValue.multipleOwners != undefined && item.riskMonitoringValue.multipleOwners != "" ? item.riskMonitoringValue.multipleOwners : currentEmp);

		var risktreatmentpermissionOptions = "";
		if (planeditpermission == false && plandeletepermission == false) {
		} else {
			risktreatmentpermissionOptions = `<div class="flex-column"><ul class="header-dropdown m-r--2 pt-3 d-flex" style="margin-right: -12px; margin-top: -6px;">
	                                    		<li class="dropdown">
	                                        		<a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
	                                            		<i class="material-icons">more_vert</i>
	                                        		</a>
	                                        		<ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">`;

			if (planeditpermission == true) {
				risktreatmentpermissionOptions += `<li><a href="#" data-toggle="modal"
																data-target=".risk_monitoring_popup"
																onclick="handleReviewMonitoringEvent(${item.id},${id},'edit')">Edit</a>
															</li>`;
			}
			if (plandeletepermission == true) {
				risktreatmentpermissionOptions += `<li><a onclick="deleteRiskMonitoring(` + item.id + `)">Delete</a></li>`;
			}

			risktreatmentpermissionOptions += `</ul></li></ul></div>`;
		}
		var resolveDate = item.riskMonitoringValue.resolveDate ? dateFormatedtohumanread(item.riskMonitoringValue.resolveDate) : "";
		var status = (item.riskMonitoringValue.status != undefined ? item.riskMonitoringValue.status : "Open");
		sub_initiatiesrow += '<div class="panel risk-panel panel-col_border"><div class="panel-heading risk-panel-heading" role="tab" id="risk_headingOne_10"><div class="panel-title_risk">';
		sub_initiatiesrow += '<div class="d-flex flex-row employe_content_border sub_initiative_details" style="margin-bottom: 0px; padding: 5px;width:100%;"><div class="d-flex flex-column flex-fill profile_content" style="width:100%;"><div class="d-flex flex-row"><a role="button" data-toggle="collapse" data-parent="#risk_accordion_10" href="#risk_monitoring_'
			+ riskcollapse
			+ `'" aria-expanded="false" aria-controls="risk_collapseOne_10" class="collapsed" style="padding: 0px 0px !important;"><div class="d-flex flex-column init_flex_profile" style="color: #1e252d;"><p style="width:95%;"><pre style="white-space: pre-wrap;font-family:'Poppins',sans-serif;">'`
			+ item.riskMonitoringValue.mitigation
			+ '</pre></p></div></a><div class="d-flex flex-column">'
			+ '<input type="hidden" id="monitoring_selected_user_' + item.id + '" value="' + owenrsvalue + '"><ul class="list-unstyled order-list d-flex" id="riskmonitor_user_' + item.id + '">'
			+ resultPorfileContent
			+ '</ul></div>' + risktreatmentpermissionOptions + '</div><div class="d-flex flex-row"><div class="d-flex flex-column flex-fill"><div class="d-flex flex-row"><div class="icon"><div id="two" class="view_paln_chart_green_'
			+ item.id
			+ ' view_plan_chart_pie_'
			+ item.id
			+ '"></div></div><div class="pie-progress" style="color: #1e252d;">'
			+ item.riskMonitoringValue.progress
			+ '</div></div></div><div class="d-flex flex-row" ><div class="d-flex flex-column flex-fill"><div><strong style="color: #1e252d;margin-left: -100px;">'
			+ status
			+ '</strong></div></div><div class="d-flex flex-column"><div><strong style="color: #1e252d;">'
			+ item.riskMonitoringValue.changestime
			+ '</strong></div></div></div>';
		sub_initiatiesrow += '</div></div></div></div>';
		chartcontent21.push({
			"index": item.id,
			"chartbalance": chartbalance,
			"chartvalue": chartvalue
		});
		$.each(item.riskReviewList,
			function (index, item1) {
				var activitychartvalue = 100;
				var activitychartbalance = 0;

				if(item1.riskMonitoringValue && item1.riskMonitoringValue.progess)
					{
						 activitychartvalue = 100 - parseInt(item1.riskMonitoringValue.progress);
						 activitychartbalance = item1.riskMonitoringValue.progress;
		
					}
	
				if (activitychartvalue == 0) {
					activitychartbalance = 100;
				}
	
				chartcontent22.push({ "index": item1.id, "chartbalance": activitychartbalance, "chartvalue": activitychartvalue });
				
				var resoleveby ="";

				if(item1.riskPlanValue && item1.riskPlanValue.timetarget)
					{
						var resoleveby = dateFormatedtohumanread(item1.riskPlanValue.timetarget);

					}
				sub_initiatiesrow += '<div id="risk_treatment_'
					+ riskcollapse
					+ '" class="panel-collapse in collapse show" role="tabpanel" aria-labelledby="risk_headingOne_10" style="">';
				sub_initiatiesrow += `'<div class="d-flex flex-row employe_content_border sub_initiative_details" style="margin: 11px 4px; padding: 5px;width:97%;"><div class="d-flex flex-column flex-fill profile_content" style="width:100%;"><div class="d-flex flex-row"><div class="d-flex flex-column init_flex_profile"><p style="width:85%;"><pre style="white-space: pre-wrap;font-family:'Poppins',sans-serif;">'`
					+ item.riskMonitoringValue.mitigation
					+ '</pre></p></div><div class="d-flex flex-row"><div class="d-flex flex-column flex-fill"><div class="d-flex flex-row"><div class="icon"><div id="two" class="view_activity_chart_green_'
					+ item1.id
					+ ' view_activity_chart_pie_'
					+ item1.id
					+ '"></div></div><div class="pie-progress">'
					+ activitychartbalance
					+ '</div></div></div></div><div class="d-flex flex-row"><div class="d-flex flex-column flex-fill"></div><div class="d-flex flex-column"><div>'
					+ resoleveby
					+ '</div></div></div></div></div></div>'
			});
		sub_initiatiesrow += '</div>';
		riskcollapse++;
	});
	sub_initiatiesrow += '</div>';

	var risktreatmentRows = sub_initiatiesrow;
	var createriskIcon = "";
	createriskIcon = `<div class="create_initives add-sub-initiative">
                        <span class="sub_initiative" data-toggle="modal"
                            data-target=".risk_monitoring_popup" onclick="handleReviewMonitoringEvent('', ${id}, 'add')">
                            <i class="fa fa-plus"></i>Add</span>
                      </div>`;

	var causeTemplate = $('#risk-review-template').html();
	var causeDetails = Mustache.render(causeTemplate, {
		id: id,
		createriskIcon: createriskIcon,
		risktreatmentRows: risktreatmentRows,
		riskreviewinlineEditIcon: riskreviewinlineEditIcon,
		riskreviewpermissionOptions: riskreviewpermissionOptions
	});
	$('#riskreviewmonitoringbody').html(causeDetails);

	$.each(chartcontent21, function (index1, value1) {
		if (value1.chartbalance == 100) {
			$(
				".view_paln_chart_green_" + value1.index
				+ ",.view_plan_chart_pie_" + value1.index)
				.sparkline([value1.chartbalance, value1.chartvalue], {
					type: 'pie',
					height: '30px',
					sliceColors: ["#1aa243", "#ffffff"]
				});
		} else {
			$(
				".view_paln_chart_green_" + value1.index
				+ ",.view_plan_chart_pie_" + value1.index)
				.sparkline([value1.chartbalance, value1.chartvalue], {
					type: 'pie',
					height: '30px',
					sliceColors: ["#ffd500", "#ffffff"]
				});
		}
	});
	$.each(chartcontent22, function (index1, value1) {
		if (value1.chartbalance == 100) {
			$(
				".view_activity_chart_green_" + value1.index
				+ ",.view_activity_chart_pie_" + value1.index)
				.sparkline([value1.chartbalance, value1.chartvalue], {
					type: 'pie',
					height: '30px',
					sliceColors: ["#1aa243", "#ffffff"]
				});
		} else {
			$(
				".view_activity_chart_green_" + value1.index
				+ ",.view_activity_chart_pie_" + value1.index)
				.sparkline([value1.chartbalance, value1.chartvalue], {
					type: 'pie',
					height: '30px',
					sliceColors: ["#ffd500", "#ffffff"]
				});
		}
	});

	$('[class^=view_paln_chart_green_]').children(':first-child').css('border',
		'1px solid #c7c7c7').css('border-radius', '50%');
	$('[class^=view_activity_chart_green_]').children(':first-child').css(
		'border', '1px solid #c7c7c7').css('border-radius', '50%');





	$('.risktreatmentlist,.riskreviewlist').slimscroll({
		height: "340px",
		size: '3px',
		color: '#9c9c9c'
	});

	$('.planuser,.monitoringuser').initial({
		charCount: 2,
		height: 30,
		width: 30,
		fontSize: 18
	});
	// comments
	
	$('.popovertest').popoverButton({
		target: '#risk_score'
	});

	$('.risk-multi-column-dropdown input[type="checkbox"]').click(function (e) {
		var inputValue = $(this).attr("value");
		var checkedProp = $(this).is(':checked');
		inputValue = inputValue.replaceallstring();
		riskempPreference["pageName"] = "RISK";
		riskempPreference["pageId"] = pageNo;
		riskempPreference["preferences"][inputValue] = checkedProp;
		$.ajax({
			url: "/stratroom/employeePreference",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(riskempPreference),
			success: function (data, status) {

			},
			// error: readErrorMsg
		});
		$("." + inputValue).toggle();
	});


	$(".riskdropdown-hide").on("click", function (e) {
		e.stopPropagation();
	});

}



function handleRiskEvent(data, changeId) {
	console.log(data,"data....")
	
	$("#riskeventform").css('display', 'none');
	$("#riskeventform").trigger("reset");
	$('.scorecard_description_popup').modal('toggle');
	$('#riskEventChangeId').val(changeId);
	$("#riskeventform input[name='riskEventId']").val(data.id);
	console.log("Page No :::    "+pageNo)
	pageNo=data.pageId;

		// $("#risktreatment_id_wrapper").css('display', 'block');
		formvalidationerrorreset();
		$('#eventid').prop("disabled", true);
		
		riskEventSuccessCallback(data, changeId)
		
}

function riskEventSuccessCallback(detailObj, changeId) {
    console.log(detailObj, "detailobj...");
    console.log(changeId, "changeid");

    $("#riskeventform").css('display', 'block');
    $('#riskEventChangeId').val(changeId);
    $('#riskcode').val(detailObj.riskCode);
	  $('#createdByName').val(detailObj.createdBy);
	$('#riskEventTime').val(detailObj.createdAt);
    $('#department-2').val(detailObj.eventType);
    $('#incident').val(detailObj.incident);
    $('#incidentdate').val(detailObj.incidentDate);
    $('#eventid').val(detailObj.id);
	$('#eventPageid').val(detailObj.pageId);
    $('#correctiveaction').val(detailObj.correctiveAction);
    $('#mitigation').val(detailObj.riskMitigation);
    $('#eventStatus').val(detailObj.eventStatus);

    // ✅ use directly since it’s already an array
    var incidentImpactData = detailObj.incidentImpactData || [];  

    var incidentImpactContainer = $('#incident-and-impact-container');
    incidentImpactContainer.empty();

    if (Array.isArray(incidentImpactData) && incidentImpactData.length > 0) {
        incidentImpactData.forEach(function (item) {
            addIncidentImpactRow(item); 
        });
    } else {
        addIncidentImpactRow(); 
    }

    // ✅ Fix reporter parsing
    if (detailObj.reporter != null) {
        const reporterData = JSON.parse(detailObj.reporter); 
        let selectedValues = [];

        if (Array.isArray(reporterData)) {
            selectedValues = reporterData.map(dept => dept.reporter);
        } else {
            selectedValues = [reporterData.reporter];
        }

        $('#department_select').val(selectedValues).trigger('change');
    }

    $('#riskeventform').data('is-new', false);
}


function addIncidentImpactRow(item) {
    var row = $('<div>').addClass('incident-and-impact-row d-flex align-items-center mb-3').append(
        $('<div>').addClass('form-group col-md-2').append(
            $('<label>').text('Category'),
            $('<select>').addClass('form-control category-select').append('<option value="">Select</option>')
        ),
        $('<div>').addClass('form-group col-md-4').append(
            $('<label>').text('Description'),
            $('<input style="border: 1px solid #dddddd; height:30px">')
                .addClass('form-control category-description')
                .val(item ? item.categoryDescription : '')
        ),
        $('<div>').addClass('form-group col-md-2').append(
            $('<label>').text('Impact Category'),
            $('<select>').addClass('form-control impact-category-select').append('<option value="">Select</option>')
        ),
        $('<div>').addClass('form-group col-md-4').append(
            $('<label>').text('Impact Description'),
            $('<input style="border: 1px solid #dddddd;height:30px">')
                .addClass('form-control impact-description')
                .val(item ? item.impactDescription : '')
        ),
        $('<div>').addClass('form-group col-md-2').append(
            $('<label>').text('Impact'),
            $('<select>').addClass('form-control impact-select').append(`
                <option value="">Choose</option>
                <option value="Tidak Signifikan">Tidak Signifikan</option>
                <option value="Ringan">Ringan</option>
                <option value="Moderat">Moderat</option>
                <option value="Berat">Berat</option>
                <option value="Fatal">Fatal</option>
            `)
        ),
        $('<div style="margin-right: 20px;">').addClass('form-group').append(
            $('<button>').attr('type', 'button').addClass('btn btn-link add-more-incident-impact').text('+')
        ),
        $('<div>').addClass('form-group').append(
            $('<button>').attr('type', 'button').addClass('btn btn-link remove_btn').text('-')
        )
    );

    // Populate dropdowns
    populateDropdown(row.find('.category-select'), riskOptions.categoryOptions);
    populateDropdown(row.find('.impact-category-select'), riskOptions.impactOptions);

    if (item) {
        row.find('.category-select').val(item.category);
        row.find('.impact-category-select').val(item.impactCategory);
        row.find('.impact-select').val(item.actionSelect);
    }

    $('#incident-and-impact-container').append(row);
}


function resetRiskEventForm() {
	$('#riskeventform').trigger("reset");
	$('#riskeventform').data('is-new', true);
	// $('#riskcode').val('');
	$('#department-2').val('');
	$('#riskcode').val(null).trigger('change');
			$('#incident').val(null).trigger('change');
	// $('#incident').val('');
	$('#incidentdate').val('');
	$('#pageId').val('');
	$('#eventid').val('');
	$('#correctiveaction').val('');
	$('#mitigation').val('');
	$('#eventStatus').val('');
	// $('#department_select').val('');
	$('#department_select').val(null).trigger('change');
	$('#createdBy').text('');
	$('#modifiedBy').text('');
	$('#createdDate').text('');
	$('#modifiedDate').text('');

	var incidentImpactContainer = $('#incident-and-impact-container');
	incidentImpactContainer.empty();
	addIncidentImpactRow();
}

// Add more incident and impact rows
$(document).on('click', '.add-more-incident-impact', function () {
	addIncidentImpactRow();
});
$(document).on('click', '.remove_btn', function () {
	$(this).closest('.incident-and-impact-row').remove();
});

// Load risk events and risk options
loadRiskEvents();
loadRiskOptions();
populateventOwnerDropdowndepartment();
populateRiskCode();
populateProductCode();
populateSubProcessCode();
populateProcessCode();
populateTechnologyCode();
populateInputVitalCode();
populateInternalCode();
populateExternalCode();
populateOutputCode();
populateStrategiesCode();
populateRpoBackupTimeCode();
populateRpoDatabaseCode();
populateRpoMediaCode();
populateRpoProcessCode();
populateRpoRetensionCode();
populateRpoVitalCode();
populateRpobackupMethodCode();
populateImpactDatabaseCode();




// Fetch and populate risk events
function loadRiskEvents() {
	$.ajax({
		url: '/stratroom/riskeventlist?pageId=' + $('#pagenumber').val(),
		type: 'GET',
		success: function (data) {
			$('.riskeventtablebody').empty();

			var riskEvents = {};
			data.forEach(function (item) {
				if (!riskEvents[item.riskCode]) {
					riskEvents[item.riskCode] = [];
				}
				riskEvents[item.riskCode].push(item);
			});

			$.each(riskEvents, function (riskCode, events) {
				var rowspan = 0;


				events.forEach(function (event) {
					// Calculate rowspan based on impact data length
					var impactData = event.incidentImpactData || [{}];
					var rowspan = impactData.length;
					var inventors = inventor(event.reporter);

					console.log(inventors, "asdfgh")

					// Create the main row for the event
					var mainRow = $('<tr>').append(
						$('<td>').text(event.incidentDate).attr('rowspan', rowspan),
						$('<td class="statusCell">').text(event.riskCode).attr('rowspan', rowspan),
						$('<td>').text(event.incident).attr('rowspan', rowspan),
						$('<td>').text(event.eventType).attr('rowspan', rowspan),
						$('<td class="statusCell">').text(impactData[0].category || ''),
						$('<td>').text(impactData[0].categoryDescription || ''),
						$('<td class="statusCell">').text(impactData[0].impactCategory || ''),
						$('<td>').text(impactData[0].impactDescription || ''),
						$('<td>').text(impactData[0].actionSelect || ''),
						$('<td>').text(event.correctiveAction).attr('rowspan', rowspan),
						$('<td>').text(event.riskMitigation).attr('rowspan', rowspan),
						$('<td class="statusCell">').text(event.eventStatus).attr('rowspan', rowspan),
						$('<td>').html(inventors).attr('rowspan', rowspan),
						$('<td>').attr('rowspan', rowspan).append(
							$('<i style="margin-right: 13px;">').addClass('fas fa-pen').click(function () { editRiskEvent(event.id); }),
							$(`<i data-toggle="modal"
	data-target="#delete_popup" data-id=`+event.id+`>`).addClass('fas fa-trash')
						)
					);

					// Append the main row to the table body
					$('.riskeventtablebody').append(mainRow);

					// Append additional rows for remaining impact data if any
					for (var i = 1; i < impactData.length; i++) {
						var impactRow = $('<tr>').append(
							$('<td>').text(impactData[i].category || ''),
							$('<td>').text(impactData[i].categoryDescription || ''),
							$('<td>').text(impactData[i].impactCategory || ''),
							$('<td>').text(impactData[i].impactDescription || ''),
							$('<td>').text(impactData[i].actionSelect || '')
						);

						// Append the impact row to the table body
						$('.riskeventtablebody').append(impactRow);
					}
				});

			});
		},
		error: function (error) {
			console.log('Error fetching risk events:', error);
		}
	});
}

// Load risk options for dropdowns
function loadRiskOptions() {
	$.ajax({
		url: '/stratroom/riskoptionlist',
		type: 'GET',
		success: function (data) {
			riskOptions = {
				categoryOptions: data.filter(option => option.type === 'riskcategory'),
				impactOptions: data.filter(option => option.type === 'category'),
				actionOptions: data.filter(option => option.type === 'action')
			};

			populateDropdown($('.category-select'), riskOptions.categoryOptions);
			

			populateDropdown($('.impact-category-select'), riskOptions.impactOptions);
			//   populateDropdown($('.action-select'), riskOptions.actionOptions);
		},
		error: function (error) {
			console.log('Error fetching risk options:', error);
		}
	});
}

function populateDropdown(dropdown, options) {
	dropdown.empty().append('<option value=" " selected="selected">Select</option>');
	options.forEach(function (option) {
		dropdown.append($('<option>', {
			value: option.value,
			text: option.option
		}));
	});
}

// Populate owner dropdown
function populateventOwnerDropdowndepartment() {
	$.ajax({
		url: "/stratroom/allDepartmentList",
		async: false,
		success: function (data) {
			var departmentDropdown = $('#department_select');
			departmentDropdown.empty().append();
			data.forEach(function (dept) {
				departmentDropdown.append($('<option>', {
					value: dept.id,
					text: dept.name
				}));
			});
		}
	});
}
function inventor(reporterData) {
	console.log(reporterData, "inventor");
	let reporterNames = [];

	try {
		const reporters = JSON.parse(reporterData);
		if (Array.isArray(reporters)) {
			reporters.forEach(reporter => {
				reporterNames.push(reporter.name);
			});
		} else {
			reporterNames.push(reporters.name);
		}
	} catch (e) {
		console.log('Error parsing reporter data:', e);
	}

	return reporterNames.join(', ');
}


function handleriskeventsave(event) {
	event.preventDefault(); // Prevent default form submit

	var incidentImpactArray = [];
	$('#incident-and-impact-container .incident-and-impact-row').each(function () {
		var categorySelect = $(this).find('.category-select').val();
		var categoryDescription = $(this).find('.category-description').val();
		var impactCategorySelect = $(this).find('.impact-category-select').val();
		var impactDescription = $(this).find('.impact-description').val();
		var actionSelect = $(this).find('.impact-select').val();

		if (categorySelect !== 'Select' || categoryDescription || impactCategorySelect !== 'Select' || impactDescription || actionSelect !== 'Select') {
			incidentImpactArray.push({
				category: categorySelect,
				categoryDescription: categoryDescription,
				impactCategory: impactCategorySelect,
				impactDescription: impactDescription,
				actionSelect: actionSelect
			});
		}
	});

	const selectedValues = $('#department_select').val();

	const selectedDepartments = selectedValues.map(value => {
		const option = $('#department_select option[value="' + value + '"]').text();
		return { reporter: value, name: option };
	});


	var eventData = {
		receivedType: "Approval",
		id:$('#eventid').val(),
		changeId:$('#riskEventChangeId').val(),
		riskCode: $('#riskcode').val(),
		eventType: $('#department-2').val(),
		incident: $('#incident').val(),
		incidentDate: $('#incidentdate').val(),
		incidentImpactData: incidentImpactArray,
		correctiveAction: $('#correctiveaction').val(),
		riskMitigation: $('#mitigation').val(),
		eventStatus: $('#eventStatus').val(),
		reporter: JSON.stringify(selectedDepartments),
		pageId: $('#eventPageid').val(),
		createdBy:$('#createdByName').val(),
		createdAt:$('#riskEventTime').val()
	};

	// var methodType = $('#riskeventform').data('is-new') ? 'POST' : 'PUT';
	// if (methodType === 'PUT') {
	// 	eventData.id = $('#eventid').val(); // Ensure the ID is included
	// }
	var apiUrl = '/stratroom/riskevent';

	// AJAX call to save risk event
	$.ajax({
		url: apiUrl,
		type: 'PUT',
		contentType: "application/json",
		data: JSON.stringify(eventData),
		success: function (response) {
			console.log('Success:', response);
			$('.scorecard_description_popup').modal('hide');
			// alert('Risk event saved successfully.');
			location.reload(true);
			loadRiskEvents();
			resetRiskEventForm(); // Reset the form

		},
		error: function (xhr, status, error) {
			console.log('Error:', error);
			alert('Failed to save the risk event.');
		}
	});
};

$('.scorecard_description_popup').on('hidden.bs.modal', function() {
resetRiskEventForm();
});

$(document).ready(function() {
$('#delete_popup').on('show.bs.modal', function (event) {
var button = $(event.relatedTarget); // Button that triggered the modal
var id = button.data('id'); // Extract info from data-* attributes

// Store the ID in the modal's confirm button
$('#confirmDelete').data('id', id);
$("#id").val(id);
});

$('#confirmDelete').click(function() {
var id = $(this).data('id'); // Retrieve the ID from the confirm button

// Perform the delete operation
deleteRiskEvent(id);
});
});

function deleteRiskEvent(id) {
$.ajax({
url: "/stratroom/riskevent?eventId=" + id,
type: 'DELETE',
success: function(data) {
location.reload(true);
},

});
}




// Format date function
function formatDate(dateString) {
	var date = new Date(dateString);
	var day = ('0' + date.getDate()).slice(-2);
	var month = ('0' + (date.getMonth() + 1)).slice(-2);
	var year = date.getFullYear();
	return year + '-' + month + '-' + day;
}

// Read file for upload
var file;
function readFile(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		file = input.files[0];
		reader.onload = function () {
			var htmlPreview = '<div class="box-body-border">' +
				'<img width="20" src="../stratroom/images/file-icon.png"/>' +
				"<span>" + input.files[0].name + "</span>" +
				"<span><i class='fa fa-times remove-preview'></i></span>" +
				"</div>";
			var wrapperZone = $(input).parent();
			var previewZone = $(input).parent().parent().find(".preview-zone");
			var boxZone = $(input).parent().parent().find(".preview-zone").find(".box").find(".box-body");
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
	formdata.append("riskevent", file);
	formdata.append("pageId", $('#pagenumber').val());

	$(".page-loader-wrapper").css("display", "block");
	if (file) {
		$.ajax({
			url: "/stratroom/saveRiskEvent?type=validation",
			type: "POST",
			data: formdata,
			processData: false,
			contentType: false,
			success: function (data, status) {
				console.log(data);
				riskUploadNotFoundData(data, data.parsingError);
				$(".page-loader-wrapper").css("display", "none");
			}
		});
	} else {
		$("#fileerrorshow").html('Please select upload file');
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

$(document).on('click', '#next-btn-2', function () {
	$("#file-upload").hide();
	$("#file-validate").hide();
	$("#file-save").show();
	$(".form-progressbar li:nth-child(3)").addClass("active");
	var formdata = new FormData();
	formdata.append("riskevent", file);
	formdata.append("pageId", $('#pagenumber').val());
	$(".page-loader-wrapper").css("display", "block");
	$.ajax({
		url: "/stratroom/saveRiskEvent?type=save",
		type: "POST",
		data: formdata,
		processData: false,
		contentType: false,
		success: function (data, status) {
			$(".page-loader-wrapper").css("display", "none");
			riskUploadSuccess(data);
		}
	});
});

$(document).on('click', '#prev-btn1', function () {
	$(".uploadvalidationSuccess").empty();
	$("#validateImportHide").empty();
	$("#file-upload").show();
	$("#file-validate").hide();
	$("#file-save").hide();
	$(".form-progressbar li:nth-child(2)").removeClass("active");
	$(".form-progressbar li:nth-child(1)").addClass("active");
});

$(document).on('click', '#prev-btn2', function () {
	$(".uploadStatististics").empty();
	$("#statisticmessage").html("");
	$(".error-div").hide();
	$("#file-upload").hide();
	$("#file-validate").show();
	$("#file-save").hide();
	$(".form-progressbar li:nth-child(3)").removeClass("active");
	$(".form-progressbar li:nth-child(2)").addClass("active");
});

function riskUploadNotFoundData(data, result) {
	$(".uploadvalidationSuccess").empty();
	var initiative_import_error;
	if (!jQuery.isEmptyObject(data) && data.result == "Not-Success") {
		$("#imagevalidate").attr("src", "images/Not-Verified.png");
		var validateImport = '<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>' +
			'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
	}
	if (!jQuery.isEmptyObject(data) && (data.result == "success" || data.result == "Success")) {
		$(".error-div").hide();
		$("#imagevalidate").attr("src", 'images/Success.png');


		var validateImport = '<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>' +
			'<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';
	}

	$.each(result, function (i, List) {
		initiative_import_error = '<tr>' +
			'<td style="width: 150px; text-align: center;">' + List.Excel_SheetName + '</td>' +
			'<td style="width: 150px; text-align: center; ">' + List.rowNo + '</td>' +
			'<td style="width: 150px; text-align: center;">' + List.highLightcellName + '</td>' +
			'<td style="width: 250px; text-align: center;">' + List.error + '</td>' +
			'</tr>';
		$(".uploadvalidationSuccess").append(initiative_import_error);
	});

	if (jQuery.isEmptyObject(data)) {
		$(".error-div").hide();
		$("#imagevalidate").attr("src", "images/Not-Verified.png");
		var validateImport = '<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>' +
			'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
	}
	$("#validateImportHide").append(validateImport);
}

function riskUploadSuccess(data) {
	$(".uploadStatististics").empty();
	$(".error-div").show();
	$("#imagevalidate").attr("src", "images/Success.png");
	console.log(data);
	riskStatististics('No of Risk Processed', (data.no_of_processed != undefined ? data.no_of_processed : ""));
	riskStatististics('No of Failed', (data.no_of_failed != undefined ? data.no_of_failed : ""));
}

function riskStatististics(staticsvalue, fnresult) {
	var risk_Statististics = '<tr>' +
		'<td style="width: 300px; text-align: left;">' + staticsvalue + '</td>' +
		'<td style="width: 300px; text-align: center;">' + fnresult + '</td>' +
		'</tr>';
	$(".uploadStatististics").append(risk_Statististics);
}

$(document).on('click', '#done-btn', function () {
	location.reload(true);
});

$(document).on('click', ".close", function () {
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

$(document).ready(function () {

$(".int-status-multi-select").select2();

});


function populateRiskCode() {
	$.ajax({
		url: "/stratroom/riskListByEmpId",
		async: false,
		success: function (data) {
			var riskCodeDropdown = $('#riskcode');
			riskCodeDropdown.empty().append();
			$('#riskcode').append('<option value="select">Select</option>');
			data.forEach(function (code) {
				if (code.riskUniqueId && code.riskUniqueId.trim() !== "") { 
				riskCodeDropdown.append($('<option>', {
					value: code.riskUniqueId,
					text: code.riskUniqueId
				}));
			}
			});
		}
	});
}


document.getElementsByClassName('selectField').addEventListener('change', function() {
var statusCell = document.getElementsByClassName('statusCell');
var selectedValue = this.value;

if (selectedValue === 'Select') {
	statusCell.innerHTML = '';
} else {
	statusCell.innerHTML = selectedValue;
}
});
 
//pos

function handlePosEvent(data, changeId) {
	console.log(data,"data....")
	console.log(changeId,"changeid..")
	$("#approvalobjectiveposForm").css('display', 'none');
	$("#approvalobjectiveposForm").trigger("reset");
	$('.pos_description_popup').modal('toggle');
	$('#posChangeId').val(changeId);
	$("#approvalobjectiveposForm input[name='posid']").val(data.id);

		$("#approvalobjectiveposForm").css('display', 'block');
		// pageNo=data.pageId.id;
		
		posSuccessCallback(data, changeId)
		
}

function posSuccessCallback(detailObj, changeId) {
    console.log(changeId, "changeid");

    $("#posChangeId").val(changeId);
    $("#pcreateId").val(detailObj.createBy);
    $("#pupdateid").val(detailObj.id);
    $("#pdateCreated").val(detailObj.createTime);
    $("#ppageID").val(detailObj.pageId);

    // Fix: Safely handle both JSON string and object
    var posValue = typeof detailObj.posValue === "string"
        ? JSON.parse(detailObj.posValue || "{}")
        : (detailObj.posValue || {});
    console.log(posValue, "posValue..");

    // Function to set multiple values for tag input or select2
    function setSelect2Values(selector, valueStr) {
        var values = [];

        if (Array.isArray(valueStr)) {
            // If API sends an array
            values = valueStr;
        } else if (typeof valueStr === "string") {
            // If API sends comma-separated string
            values = valueStr ? valueStr.split(',') : [];
        }

        $(selector).val(null).trigger('change'); // Clear previous values
        $(selector).select2({
            tags: true,
            data: values
        }).val(values).trigger('change'); // Set new values
    }

    // Set single value fields (non-multiple select fields)
    $(".approvalproductService").val(posValue.productService || '');
    $(".approvalclassificationService").val(posValue.classification || '');
    $(".approvaltimestartselect").val(posValue.workingTimeStart || '');
    $(".approvaltimeendselect").val(posValue.workingTimeEnd || '');
    $(".approvalamountService").val(posValue.amountService || '');
    $(".approvalfrequencyService").val(posValue.frequency || '');
    $(".approvalfinalMaoService").val(posValue.finalMao || '');
    $(".approvalrtoService").val(posValue.rto || '');

    // Set multiple value fields (using tag input or select2)
    setSelect2Values(".posapprovalprocessService", posValue.process);
    setSelect2Values(".approvalsubprocessService", posValue.subProcess);
    setSelect2Values(".approvaltechnologyService", posValue.technology);
    setSelect2Values(".approvalinputsService", posValue.inputs);
    setSelect2Values(".approvaloutputService", posValue.output);
    setSelect2Values(".approvalpeopleInternalService", posValue.peopleInternal);
    setSelect2Values(".approvalpeopleExternalService", posValue.peopleExternal);
    setSelect2Values(".approvalstrategiesService", posValue.businessStrategies);
}



populateProductCode();

function populateProductCode() {
    var riskCodeDropdown = $('#approvalsaveproductService');
    riskCodeDropdown.empty().append('<option value="select">Select</option>');

    // Fetch Product Data
    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=Product",
        async: false,
        success: function (productData) {
            appendOptionsToDropdown(productData, riskCodeDropdown);
        }
    });

    // Fetch Service Data
    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=Service",
        async: false,
        success: function (serviceData) {
            appendOptionsToDropdown(serviceData, riskCodeDropdown);
        }
    });
}

// Helper function to append options to the dropdown
function appendOptionsToDropdown(data, dropdown) {
    data.forEach(function (item) {
        if (item.data.productName && item.data.productName.trim() !== "") {
            dropdown.append($('<option>', {
                value: item.data.productName,
                text: item.data.productName
            }));
        } else if (item.data.serviceName && item.data.serviceName.trim() !== "") {
            dropdown.append($('<option>', {
                value: item.data.serviceName,
                text: item.data.serviceName
            }));
        }
    });
}

function populateProcessCode() {

	$.ajax({
		url: "/stratroom/retrieveMasterTypes?type=Process",
		async: false,
		success: function (data) {
			var riskCodeDropdown = $('#approvalsaveprocessService');
			riskCodeDropdown.empty().append();
			$('#approvalsaveprocessService').append('<option value="select">Select</option>');
			data.forEach(function (code) {
				if (code.data.processName && code.data.processName.trim() !== "") { 
				riskCodeDropdown.append($('<option>', {
					value: code.data.processName,
					text: code.data.processName
				}));
			}
			});
		}
	});
}
function populateSubProcessCode() {

	$.ajax({
		url: "/stratroom/retrieveMasterTypes?type=SubProcess",
		async: false,
		success: function (data) {
			var riskCodeDropdown = $('#approvalsavesubprocessService');
			riskCodeDropdown.empty().append();
			$('#approvalsavesubprocessService').append('<option value="select">Select</option>');
			data.forEach(function (code) {
				if (code.data.subProcessName && code.data.subProcessName.trim() !== "") { 
				riskCodeDropdown.append($('<option>', {
					value: code.data.subProcessName,
					text: code.data.subProcessName
				}));
			}
			});
		}
	});
}


function populateTechnologyCode(){

	$.ajax({
		url: "/stratroom/retrieveMasterTypes?type=technology",
		async: false,
		success: function (data) {
			var riskCodeDropdown = $('#approvalsavetechnologyService');
			riskCodeDropdown.empty().append();
			$('#approvalsavetechnologyService').append('<option value="select">Select</option>');
			data.forEach(function (code) {
				if (code.data.itName && code.data.itName.trim() !== "") { 
				riskCodeDropdown.append($('<option>', {
					value: code.data.itName,
					text: code.data.itName
				}));
			}
			});
		}
	});
}
function populateInputVitalCode(){

	$.ajax({
		url: "/stratroom/retrieveMasterTypes?type=Vital",
		async: false,
		success: function (data) {
			var riskCodeDropdown = $('#approvalsaveinputsService');
			riskCodeDropdown.empty().append();
			$('#approvalsaveinputsService').append('<option value="select">Select</option>');
			data.forEach(function (code) {
				if (code.data.inputProcess && code.data.inputProcess !== "") { 
				riskCodeDropdown.append($('<option>', {
					value: code.data.inputProcess,
					text: code.data.inputProcess
				}));
			}
			});
		}
	});
}
function populateInternalCode(){

	$.ajax({
		url: "/stratroom/allDepartmentList",
		async: false,
		success: function (data) {
			var riskCodeDropdown = $('#approvalsavepeopleInternalService');
			riskCodeDropdown.empty().append();
			$('#approvalsavepeopleInternalService').append('<option value="select">Select</option>');
			data.forEach(function (code) {
				if (code.name && code.name.trim() !== "") { 
				riskCodeDropdown.append($('<option>', {
					value: code.name,
					text: code.name
				}));
			}
			});
		}
	});
}
function populateExternalCode(){

	$.ajax({
		url: "/stratroom/retrieveMasterTypes?type=Personal",
		async: false,
		success: function (data) {
			var riskCodeDropdown = $('#approvalsavepeopleExternalService');
			riskCodeDropdown.empty().append();
			$('#approvalsavepeopleExternalService').append('<option value="select">Select</option>');
			data.forEach(function (code) {
				if (code.data.externalEntity && code.data.externalEntity !== "") { 
				riskCodeDropdown.append($('<option>', {
					value: code.data.externalEntity,
					text: code.data.externalEntity
				}));
			}
			});
		}
	});
}
function populateOutputCode(){

	$.ajax({
		url: "/stratroom/retrieveMasterTypes?type=Vital",
		async: false,
		success: function (data) {
			var riskCodeDropdown = $('#approvalsaveoutputsService');
			riskCodeDropdown.empty().append();
			$('#approvalsaveoutputsService').append('<option value="select">Select</option>');
			data.forEach(function (code) {
				if (code.data.outputProcess && code.data.outputProcess !== "") { 
				riskCodeDropdown.append($('<option>', {
					value: code.data.outputProcess,
					text: code.data.outputProcess
				}));
			}
			});
		}
	});
}

function populateStrategiesCode(){

	$.ajax({
		url: "/stratroom/retrieveMasterTypes?type=Process",
		async: false,
		success: function (data) {
			var riskCodeDropdown = $('#approvalsavestrategiesService');
			riskCodeDropdown.empty().append();
			$('#approvalsavestrategiesService').append('<option value="select">Select</option>');
			data.forEach(function (code) {
				if (code.data.strategies && code.data.strategies.trim() !== "") { 
				riskCodeDropdown.append($('<option>', {
					value: code.data.strategies,
					text: code.data.strategies
				}));
			}
			});
		}
	});
}
function savePOS() {
	var productsave = $(".approvalproductService").val();
	var processsave = $("#approvalsaveprocessService").val().join(',');
	var subProcessSave = $("#approvalsavesubprocessService").val().join(',');
	var classificationsave = $(".approvalclassificationService").val();
	var Timestartsave = $(".approvaltimestartselect").val();
	var Timeendsave = $(".approvaltimeendselect").val();
	var amountServicesave = $(".approvalamountService").val();
	var frequencysave = $(".approvalfrequencyService").val();
	var technologysave = $("#approvalsavetechnologyService").val().join(',');
	var inputssave = $("#approvalsaveinputsService").val().join(',');
	var outputsave = $("#approvalsaveoutputsService").val().join(',');
	var peopleInternalsave = $(".approvalpeopleInternalService").val().join(',');
	var peopleExternalsave = $(".approvalpeopleExternalService").val().join(',');
	var finalMaosave = $(".approvalfinalMaoService").val();
	var rtosave = $(".approvalrtoService").val();
	var strategiessave = $("#approvalsavestrategiesService").val().join(',');
	var pagenumber = $("#ppageID").val();
	var changeId = $("#posChangeId").val();
	var id = $("#pupdateid").val();
	var generateId= $("#pcreateId").val();
	var generateTime=$("#pdateCreated").val();
	var POSData =   {
		"createBy":generateId,
	    "createTime":generateTime,
		"id": id,
		"pageId":pagenumber,
		"changeId":changeId,
		"receivedType": "Approval",
		"posValue":
	 {
		"productService":productsave,
		"process":processsave,
		"subProcess": subProcessSave,
		"classification":classificationsave,
		"workingTimeStart": Timestartsave,
		"workingTimeEnd": Timeendsave,
		"amountService": amountServicesave,
		"frequency":frequencysave,
		"technology": technologysave,
		"inputs":inputssave,
		"output":outputsave,
		"peopleInternal":peopleInternalsave,
		"peopleExternal":peopleExternalsave,
		"finalMao":finalMaosave,
		"rto":rtosave,
		"businessStrategies":strategiessave,
	}
		}
	console.log(POSData);
	
	$.ajax({
			 url: "/stratroom/updatePos",
        type: "PUT",
			contentType: "application/json",
			data: JSON.stringify(POSData),
			success: function (data, status) {
				$.notify("Success: Successfully Saved", {
					style: 'success',
					className: 'graynotify'
				});  
				location.reload(true);
			},
			error: readErrorMsg
		});
	}

//rpo

function handleRpoEvent(data, changeId) {
	console.log(data,"data....")
	console.log(changeId,"changeid..")
	$("#approvalrpoobjectiveForm").css('display', 'none');
	$("#approvalrpoobjectiveForm").trigger("reset");
	$('.rpo_description_popup').modal('toggle');
	$('#rpoChangeid').val(changeId);
	$("#approvalrpoobjectiveForm input[name='rpoid']").val(data.id);
	// pageNo=data.pageId.id;

		$("#approvalrpoobjectiveForm").css('display', 'block');
		
		rpoSuccessCallback(data, changeId)
		
}

function rpoSuccessCallback(detailObj, changeId) {
    console.log(changeId, "changeid");
    console.log(detailObj, "detailObj..");

    $("#rpoChangeid").val(changeId);
    $("#createId").val(detailObj.createBy);
    $("#updateid").val(detailObj.id);
    $("#dateCreated").val(detailObj.createTime);
    $("#pageID").val(detailObj.pageId);

    // Fix: Safely handle both JSON string and object
    var rpovalues = typeof detailObj.rpoValues === "string"
        ? JSON.parse(detailObj.rpoValues || "{}")
        : (detailObj.rpoValues || {});
    console.log(rpovalues, "rpovalues..");

    // Function to set multiple values for tag input or select2
    function setSelect2Values(selector, valueStr) {
        var values = [];

        if (Array.isArray(valueStr)) {
            // If API sends an array
            values = valueStr;
        } else if (typeof valueStr === "string") {
            // If API sends comma-separated string
            values = valueStr ? valueStr.split('|') : [];
        }

        $(selector).val(null).trigger('change'); // Clear previous values
        $(selector).select2({
            tags: true,
            data: values
        }).val(values).trigger('change'); // Set new values
    }

    // Set multiple values for each input field
    setSelect2Values(".approvalprocessService", rpovalues.process);
    setSelect2Values(".approvalvitalService", rpovalues.vital);
    setSelect2Values(".approvalmediaService", rpovalues.media);
    setSelect2Values(".approvalbackupService", rpovalues.backupMethode);
    setSelect2Values(".approvalbackuptimeService", rpovalues.backupTime);
    setSelect2Values(".approvalretentionService", rpovalues.retention);
    setSelect2Values(".approvalrecoveryService", rpovalues.dataBaseRecoveryStratagy);
}



function populateRpoProcessCode(){

	$.ajax({
		url: "/stratroom/retrieveMasterTypes?type=Process",
		async: false,
		success: function (data) {
			var riskCodeDropdown = $('#approvalsaverpoprocessService');
			riskCodeDropdown.empty().append();
			$('#approvalsaverpoprocessService').append('<option value="select">Select</option>');
			data.forEach(function (code) {
				if (code.data.processName && code.data.processName.trim() !== "") { 
				riskCodeDropdown.append($('<option>', {
					value: code.data.processName,
					text: code.data.processName
				}));
			}
			});
		}
	});
}
function populateRpoVitalCode(){

	$.ajax({
		url: "/stratroom/retrieveMasterTypes?type=Vital",
		async: false,
		success: function (data) {
			var riskCodeDropdown = $('#approvalsavevitalService');
			riskCodeDropdown.empty().append();
			$('#approvalsavevitalService').append('<option value="select">Select</option>');
			data.forEach(function (code) {
				if (code.data.vitalName && code.data.vitalName.trim() !== "") { 
				riskCodeDropdown.append($('<option>', {
					value: code.data.vitalName,
					text: code.data.vitalName
				}));
			}
			});
		}
	});
}
function populateRpoMediaCode(){

	$.ajax({
		url: "/stratroom/retrieveMasterTypes?type=technology",
		async: false,
		success: function (data) {
			var riskCodeDropdown = $('#approvalsavemediaService');
			riskCodeDropdown.empty().append();
			$('#approvalsavemediaService').append('<option value="select">Select</option>');
			data.forEach(function (code) {
				if (code.data.itName && code.data.itName.trim() !== "") { 
				riskCodeDropdown.append($('<option>', {
					value: code.data.itName,
					text: code.data.itName
				}));
			}
			});
		}
	});
}
function populateRpobackupMethodCode(){

	$.ajax({
		url: "/stratroom/retrieveMasterTypes?type=technology",
		async: false,
		success: function (data) {
			var riskCodeDropdown = $('#approvalsavebackupService');
			riskCodeDropdown.empty().append();
			$('#approvalsavebackupService').append('<option value="select">Select</option>');
			data.forEach(function (code) {
				if (code.data.backupMethod && code.data.backupMethod.trim() !== "") { 
				riskCodeDropdown.append($('<option>', {
					value: code.data.backupMethod,
					text: code.data.backupMethod
				}));
			}
			});
		}
	});
}
function populateRpoBackupTimeCode(){

	$.ajax({
		url: "/stratroom/retrieveMasterTypes?type=technology",
		async: false,
		success: function (data) {
			var riskCodeDropdown = $('#approvalsavebackuptimeService');
			riskCodeDropdown.empty().append();
			$('#approvalsavebackuptimeService').append('<option value="select">Select</option>');
			data.forEach(function (code) {
				if (code.data.backupTime && code.data.backupTime.trim() !== "") { 
				riskCodeDropdown.append($('<option>', {
					value: code.data.backupTime,
					text: code.data.backupTime
				}));
			}
			});
		}
	});
}
function populateRpoRetensionCode(){

	$.ajax({
		url: "/stratroom/retrieveMasterTypes?type=technology",
		async: false,
		success: function (data) {
			var riskCodeDropdown = $('#approvalsaveretentionService');
			riskCodeDropdown.empty().append();
			$('#approvalsaveretentionService').append('<option value="select">Select</option>');
			data.forEach(function (code) {
				if (code.data.retention && code.data.retention.trim() !== "") { 
				riskCodeDropdown.append($('<option>', {
					value: code.data.retention,
					text: code.data.retention
				}));
			}
			});
		}
	});
}
function populateRpoDatabaseCode(){

	$.ajax({
		url: "/stratroom/retrieveMasterTypes?type=technology",
		async: false,
		success: function (data) {
			var riskCodeDropdown = $('#approvalsaverecoveryService');
			riskCodeDropdown.empty().append();
			$('#approvalsaverecoveryService').append('<option value="select">Select</option>');
			data.forEach(function (code) {
				if (code.data.databaseRecoveryStrategy && code.data.databaseRecoveryStrategy.trim() !== "") { 
				riskCodeDropdown.append($('<option>', {
					value: code.data.databaseRecoveryStrategy,
					text: code.data.databaseRecoveryStrategy
				}));
			}
			});
		}
	});
}

function saveRPOpage() {
    // Safely get the values and check if they exist before calling join
    var processsave = ($("#approvalsaverpoprocessService").val() || []).join('|');
    var vitalsave = ($("#approvalsavevitalService").val() || []).join('|');
    var mediasave = ($("#approvalsavemediaService").val() || []).join('|');
    var backupsave = ($("#approvalsavebackupService").val() || []).join('|');
    var backuptimesave = ($("#approvalsavebackuptimeService").val() || []).join('|');
    var retentionsave = ($("#approvalsaveretentionService").val() || []).join('|');
    var recoverysave = ($("#approvalsaverecoveryService").val() || []).join('|');
    var pagenumber = $("#pageID").val();
    var changeId = $("#rpoChangeid").val();
	var id = $("#updateid").val();
	var generateId= $("#createId").val();
	var generateDate= $("#dateCreated").val();
    var RPOServiceData = {
		"createBy":generateId,
		"createTime":generateDate,
		"id": id,
		"pageId":pagenumber,
        "changeId": changeId,
		"receivedType": "Approval",
        "rpoValues": {
            "process": processsave,
            "vital": vitalsave,
            "media": mediasave,
            "backupMethode": backupsave,
            "backupTime": backuptimesave,
            "retention": retentionsave,
            "dataBaseRecoveryStratagy": recoverysave
        }
    };
    
    console.log(RPOServiceData);

    $.ajax({
        url: "/stratroom/updateRpo/",
        type: "Put",
        contentType: "application/json",
        data: JSON.stringify(RPOServiceData),
        success: function (data, status) {
            $.notify("Success: RPO Page Data Successfully Submitted", {
                style: 'success',
                className: 'graynotify'
            });                              
            location.reload(true);
        },
        error: function (xhr, status, error) {
            console.error("Error: " + xhr.responseText);
        }
    });
}
