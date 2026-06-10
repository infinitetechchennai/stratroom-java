var currentEmp = "";
var navigateEmp = $("#userPrincipalnavigate").val();
if (navigateEmp != "" || navigateEmp != null) {
	currentEmp = navigateEmp;
}
else {
	currentEmp =$("#userPrincipal").val();
}
console.log(currentEmp,"dsf")
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
var allDepartments = [];
const { jsPDF } = window.jspdf;

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

var attachmentcreatepermission = false;
var attachmenteditpermission = false;
var attachmentdeletepermission = false;
var attachmentviewpermission = false;
// var attachmentcontentload = false;

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

var checkemppagemode = $("#employeesupermode").length;

if (checkemppagemode == 0 && ($("#userrolename").val() == "Super User" || $("#userrolename").val() == "Admin")) {
	if ($("#userPrincipal").val() != $("#userPrincipalnavigate").val()) {
		// $(".subusermenuname").text('Risk Management');
		if ($(".topmenubreadcrumb").length) {
			$(".topmenubreadcrumb").show();
		}
		if ($(".sidebarNavigate").length) {
			$(".sidebarNavigate").show();
		}
	}
}

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

function getpagenameView() {
	$.ajax({
		type: "GET",
		url: "/stratroom/pages/" + pageNo,
		async: false,
		success: function (data) {
			if ($("#userPrincipal").val() != $("#userPrincipalnavigate").val()) {
				$("." + data.id).addClass("homepageHighlight");
			}

			if ($(".superusertopmenu").hasClass(data.id)) {
				$(".subusermenuname").text(data.pageName);
			}
		}
	});
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
			const riskLevels = ['Very Low', 'Low', 'Tolerable', 'High', 'Very High','Extreme','Medium'];

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
	const storedLanguage = localStorage.getItem("selectedLang") || "en"
	loadLanguage(storedLanguage);

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


function loadAllDepartments() {
    if (allDepartments.length === 0) {
        $.ajax({
            url: "/stratroom/allDepartmentList",
            type: "GET",
            async: false,
            success: function(data) {
                allDepartments = data;
            }
        });
    }
}

function getriskpermission() {
	$.ajax({
		type: "GET",
		url: "/stratroom/user/modulePermissions?moduleName=Risk",
		async: false,
		success: function (data) {
			if (data.Risk != undefined && !jQuery.isEmptyObject(data.Risk)) {
				riskmodPermission = data.Risk.Risk;
				// cause
				if (data.Risk.Cause.privilegeCreate != undefined && data.Risk.Cause.privilegeCreate == "TRUE") {
					causecreatepermission = true;
				}
				if (data.Risk.Cause.privilegeUpdate != undefined && data.Risk.Cause.privilegeUpdate == "TRUE") {
					causeeditpermission = true;
				}
				if (data.Risk.Cause.privilegeDelete != undefined && data.Risk.Cause.privilegeDelete == "TRUE") {
					causedeletepermission = true;
				}
				if (data.Risk.Cause.privilegeView != undefined && data.Risk.Cause.privilegeView == "TRUE") {
					causeviewpermission = true;
				}
				// con
				if (data.Risk.Consequence.privilegeCreate != undefined && data.Risk.Consequence.privilegeCreate == "TRUE") {
					concreatepermission = true;
				}
				if (data.Risk.Consequence.privilegeUpdate != undefined && data.Risk.Consequence.privilegeUpdate == "TRUE") {
					coneditpermission = true;
				}
				if (data.Risk.Consequence.privilegeDelete != undefined && data.Risk.Consequence.privilegeDelete == "TRUE") {
					condeletepermission = true;
				}
				if (data.Risk.Consequence.privilegeView != undefined && data.Risk.Consequence.privilegeView == "TRUE") {
					conviewpermission = true;
				}
				// comments
				if (data.Risk.Comments.privilegeCreate != undefined && data.Risk.Comments.privilegeCreate == "TRUE") {
					comcreatepermission = true;
				}
				if (data.Risk.Comments.privilegeUpdate != undefined && data.Risk.Comments.privilegeUpdate == "TRUE") {
					comeditpermission = true;
				}
				if (data.Risk.Comments.privilegeDelete != undefined && data.Risk.Comments.privilegeDelete == "TRUE") {
					comdeletepermission = true;
				}
				if (data.Risk.Comments.privilegeView != undefined && data.Risk.Comments.privilegeView == "TRUE") {
					comviewpermission = true;
				}
				// Attachments
				// if (data.Risk.Attachments.privilegeCreate != undefined && data.Risk.Attachments.privilegeCreate == "TRUE") {
				// 	attachmentcreatepermission = true;
				// }
				// if (data.Risk.Attachments.privilegeUpdate != undefined && data.Risk.Attachments.privilegeUpdate == "TRUE") {
				// 	attachmenteditpermission = true;
				// }
				// if (data.Risk.Attachments.privilegeDelete != undefined && data.Risk.Attachments.privilegeDelete == "TRUE") {
				// 	attachmentdeletepermission = true;
				// }
				// if (data.Risk.Attachments.privilegeView != undefined && data.Risk.Attachments.privilegeView == "TRUE") {
				// 	attachmentviewpermission = true;
				// }
				// plan
				if (data.Risk.Plan.privilegeCreate != undefined && data.Risk.Plan.privilegeCreate == "TRUE") {
					plancreatepermission = true;
				}
				if (data.Risk.Plan.privilegeUpdate != undefined && data.Risk.Plan.privilegeUpdate == "TRUE") {
					planeditpermission = true;
				}
				if (data.Risk.Plan.privilegeDelete != undefined && data.Risk.Plan.privilegeDelete == "TRUE") {
					plandeletepermission = true;
				}
				if (data.Risk.Plan.privilegeView != undefined && data.Risk.Plan.privilegeView == "TRUE") {
					planviewpermission = true;
				}
				// action
				if (data.Risk.Action.privilegeCreate != undefined && data.Risk.Action.privilegeCreate == "TRUE") {
					actioncreatepermission = true;
				}
				if (data.Risk.Action.privilegeUpdate != undefined && data.Risk.Action.privilegeUpdate == "TRUE") {
					actioneditpermission = true;
				}
				if (data.Risk.Action.privilegeDelete != undefined && data.Risk.Action.privilegeDelete == "TRUE") {
					actiondeletepermission = true;
				}
				if (data.Risk.Action.privilegeView != undefined && data.Risk.Action.privilegeView == "TRUE") {
					actionviewpermission = true;
				}
			}
		}
	});
}

$(document).ready(function () {
	getpagenameView();
	getriskpermission();
	getriskoptions();
	getriskcustomscore();
    loadAllDepartments(); // Load all departments when the page loads

	$(document).on('click', '#tableTabID3', function () {
		// Toggle the display of the chart and table

		$('#charttableheat').toggleClass('d-none');
		$('#cardtableheat').toggleClass('d-none');

	});


	$('#relatedparties_select').select2({
		placeholder: 'Choose Related Parties',
		allowClear: true
	})
	$('#riskposval').select2({
		placeholder: 'Choose Pos',
		allowClear: true
	})
	$('#monitoring_person').select2({
		placeholder: 'Choose Person Incharge',
		allowClear: true
	})

$('#businessimpact').select2({
		placeholder: 'Choose KPI',
		allowClear: true
	})

	$.notify.addStyle('success', {
		html: "<div><i class='fa fa-check-circle fa-lg' aria-hidden='true'></i>&nbsp; <span data-notify-text/></div>",
		classes: {
			base: {
				"white-space": "nowrap",
				"background-color": "grey",
				"padding": "10px",
				"text-align": "center",
				"border-radius": "4px",
				"color": "white"
			},
			graynotify: {
				"color": "white",
				"background-color": "grey"
			}
		}
	});

	$.notify.addStyle('error', {
		html: "<div><i class='fa fa-times-circle' aria-hidden='true'></i>&nbsp; <span data-notify-text/></div>",
		classes: {
			base: {
				"white-space": "nowrap",
				"background-color": "grey",
				"padding": "10px",
				"text-align": "center",
				"border-radius": "4px",
				"color": "white"
			},
			graynotify: {
				"color": "white",
				"background-color": "grey"
			}
		}
	});
	if (pageNo != "") {
		$(".exceldownloadlink").attr("href", "/stratroom/downloadRiskDetails/" + currentEmp + "?pageId=" + pageNo + "&dateRange=" + $('#datePeriod').val());
	} else {
		$(".exceldownloadlink").attr("href", "#");
		$(".exceldownloadlink").removeAttr("target");
	}

	if (riskmodPermission.privilegeCreate != undefined && riskmodPermission.privilegeCreate == "TRUE") {
		riskcreatepermission = true;
	}

	if (riskmodPermission.privilegeUpdate != undefined && riskmodPermission.privilegeUpdate == "TRUE") {
		riskeditpermission = true;
	}

	if (riskmodPermission.privilegeDelete != undefined && riskmodPermission.privilegeDelete == "TRUE") {
		riskdeletepermission = true;
	}

	if (riskmodPermission.privilegeView != undefined && riskmodPermission.privilegeView == "TRUE") {
		riskviewpermission = true;
	}

	if (riskcreatepermission == false && enableaccesscontrolMenu == false) {
		$(".riskcommentssend").remove();
	}

	if (enableaccesscontrolMenu == true) {
		// riskcreatepermission = true;
		// riskeditpermission = true;
		// riskdeletepermission = true;
		// riskviewpermission = true;
	}

	if (riskcreatepermission == true || riskeditpermission == true || riskdeletepermission == true || riskviewpermission == true) {
		riskcontentload = true;
	}


	if (riskcreatepermission == false) {
		$(".riskcreateicon").remove();
		$(".initiativeCreateIcon").remove();
	}

	if (concreatepermission == true || coneditpermission == true || condeletepermission == true || conviewpermission == true) {
		concontentload = true;
	}

	if (causecreatepermission == true || causeeditpermission == true || causedeletepermission == true || causeviewpermission == true) {
		causecontentload = true;
	}

	if (comcreatepermission == true || comeditpermission == true || comdeletepermission == true || comviewpermission == true) {
		comcontentload = true;
	}

	if (plancreatepermission == true || planeditpermission == true || plandeletepermission == true || planviewpermission == true) {
		plancontentload = true;
	}
	// if (attachmentcreatepermission == true || attachmenteditpermission == true || attachmentdeletepermission == true || attachmentviewpermission == true) {
	// 	attachmentcontentload = true;
	// }

	if (plancontentload == false) {
		$("#risktreatmentbody").remove();
		$("#riskreviewmonitoringbody").remove();
		$("#riskreducingimpactbody").remove();
	    $("#riskattachmentbody").remove();
	}

	if (causecontentload == false && concontentload == false) {
		$(".causenconsequence").remove();
	}

	if (comcontentload == false) {
		$("#riskcomments").remove();
	}

	if (riskcontentload == false) {
		$(".initiative_sidebar").remove();
		$(".filtericon").remove();
		$("#section").remove();
		if ($(".riskcallload").length) {
			$(".riskcallload").remove();
		}
	}

console.log("url date period  :: " + urldateperiod)
console.log("risk unique id ::: "+ urlriskid)

	var url = "riskList/" + currentEmp;
	if (pageNo != "" && pageNo != undefined && pageNo != 0 && urldateperiod != "" && urldateperiod != undefined && urldateperiod != null) {
		url = "riskList/" + currentEmp + "?pageId=" + pageNo + "&dateRange=" + urldateperiod;
		$.ajax({
			url: url,
			async: false,
			success: riskSuccessCallback,
		});
	}else if(pageNo != "" && pageNo != undefined && pageNo != 0 )
		{
			url = "riskList/" + currentEmp + "?pageId=" + pageNo + "&dateRange=" +$('#datePeriod').val().toString();

			$.ajax({
				url: url,
				async: false,
				success: riskSuccessCallback,
			});
		}
	

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

function populateRiskDetails(id, type) {
	console.log(id)
	console.log(type)
	localStorage.setItem("risk_pagenumber", id);
	selectedriskid = id;
	$(".risk_sub_initiative_sidebar_details").removeClass("riskSidebarHighLight");
	$(".sidebarriskid_" + id).addClass("riskSidebarHighLight");

	$.ajax({
		url: "/stratroom/risk/" + id + "?loadFlag=true&riskType=" + type,
		success: function (data) {
			$('#risk_top_details').empty();
			$('#causeconsequencebody').empty();
			$('#riskreducingimpactbody').empty();
			$('#riskreviewmonitoringbody').empty();
			$('#riskattachmentbody').empty();
			$('#riskcomments').empty();
			riskdescSuccessCallback(data, id);
		}
	});
}

function sendApproval() {

	var id = $("#causeChangeIddraft").val();
	var requestData = {
		status: "IN PROGRESS"
	 };

   $.ajax({
		url: "/stratroom/api/workflowevents/"+id+"/action",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(requestData),
		success: function (response) {
		 location.reload(true);
	   }
   });
}

function handleRiskCommentsSave(riskId, action) {

	var desc = $("#risk_comments_Form input[name='riskComments']").val();
	if (desc == "" || desc == " " || desc == 0) {
		$.notify("Error: Enter some comments", {
			style: 'error',
			className: 'graynotify'
		});
		return false;
	}
	var commentsObj = {
		"commentsParendId":"0",
		"riskId": riskId,
		"riskCommentsValue": {
			"desc": $("#risk_comments_Form input[name='riskComments']").val(),
		}
	}
	var methodType = 'post';
	if (action == 'add') {

	} else if (action == 'edit') {
		methodType = 'put';
	}

	$.ajax({
		url: "/stratroom/riskComments/",
		type: methodType,
		contentType: "application/json",
		data: JSON.stringify(commentsObj),
		success: function (data, status) {
			$("#risk_comments_Form").css('display', 'none');
			localStorage.setItem("reload", "1");

			window.location.reload(true);
			console.log("New comments was created..");
		}
	});
}


function handleRiskReplyCommentsSave(riskId, action) {
	
	var commentId = $("#commentId").text();
	console.log(commentId, "comment id");

	var desc = $("#riskCommentsReply").val();
	if (desc == "" || desc == " " || desc == 0) {
		$.notify("Error: Enter some comments", {
			style: 'error',
			className: 'graynotify'
		});
		return false;
	}

	// Construct the object to be sent in the request
	var replyCommentsObj = {
		"commentsParendId":commentId,
		"riskId": riskId,
		"riskCommentsValue": {
			"desc": desc,
		}
	};

	// Determine the HTTP method type based on action
	var methodType = 'post';
	

	// Make the AJAX request
	$.ajax({
		url: "/stratroom/riskComments/",
		type: methodType,
		contentType: "application/json",
		data: JSON.stringify(replyCommentsObj),
		success: function (data, status) {
			// Hide the form and reload the page upon success
			$("#risk_comments_Form").css('display', 'none');
			localStorage.setItem("reload", "1");
			window.location.reload(true);
			console.log("New comments were created.");
		}
	});
}
function updateRiskReplyComment() {
	
	var commentId = $("#risk_commentsreply_riskid").val();
	var commentreplyId = $("#risk_commentsreply_id").val();
	console.log(commentId, "comment id");

	
	var desc = $("#risk_Commentsreply").val();
	if (desc == "" || desc == " " || desc == 0) {
		$.notify("Error: Enter some comments", {
			style: 'error',
			className: 'graynotify'
		});
		return false;
	}
	
	// Construct the object to be sent in the request
	var replyCommentsObj = {
		"commentsParendId":commentId,
		"id":commentreplyId,
		"riskCommentsValue": {
			"desc": desc,
		}
	};
	$.ajax({
		url: "/stratroom/riskComments/",
		type: "put",
		contentType: "application/json",
		data: JSON.stringify(replyCommentsObj),
		success: function (data, status) {
			
			localStorage.setItem("reload", "1");
			window.location.reload(true);
			console.log("New comments were created.");
		}
	});
}
function deleteReplyRisk(commentreplyId) {
	var commentrplyId = $("#commentreplyId").text();
	console.log(commentrplyId,"commentrplyIdcommentrplyId")
	
	$.ajax({
		url: "/stratroom/riskComments/"+commentrplyId,
        type: "DELETE",
        contentType: "application/json",
        success: function (data, status) {
          
            location.reload(true);
        },
        error: readErrorMsg
    });
}
function handleRiskActivitiesEvent(finalId,riskplanid,type,action) {

console.log(finalId,type,action,"final,type,action");
	$("#riskActionmonitoringForm").css('display', 'none');
	$("#riskActionmonitoringForm").trigger("reset");
	$('#risk_action_desc_popup').modal('toggle');
	$("#riskActionmonitoringForm input[name='riskaction_id']").val(finalId);
	$("#riskActionmonitoringForm input[name='id']").val(finalId);
	 $("#riskActionmonitoringForm input[name='riskPlanId']").val(riskplanid);
	 $("#riskPlanId").val(riskplanid);
	$("#riskActionmonitoringForm input[name='action']").val(action);
	$("#riskActionPlanId").val(action);
	if (action == 'delete') {
		var methodType = 'delete'
		$.ajax({
			url: "/stratroom/riskActivities/" + finalId,
			type: methodType,
			contentType: "application/json",
			success: function (data, status) {
				localStorage.setItem("reload", "1");

				window.location.reload(true);
			}
		});

	} else if (action == 'add') {
		$("#riskActionCreatedBy").html("");
		$("#riskActionCreatedByDate").html("");
		$("#riskActionUpdatedBy").html("");
		$("#riskActionUpdatedByDate").html("");
		$("#riskaction_id_wrapper").css('display', 'none');
		// when adding
		$("#riskActionmonitoringForm").css('display', 'block');
		formvalidationerrorreset();
	} else { // view and edit
		$("#riskaction_id").val(finalId);

		$("#riskaction_id_wrapper").css('display', 'block');
		$('#risk_action_desc_popup #riskaction_id').prop("disabled", true);
		formvalidationerrorreset();
		if (action == 'view') {
			$('#riskActionmonitoringForm input[type="text"]').prop("disabled", true);
			$('#riskActionmonitoringForm input[type="checkbox"]').prop("disabled",
				true);
			$('#riskActionmonitoringForm select').prop("disabled", true);
			$('#riskActionmonitoringForm button[value="Save"]')
				.css('display', 'none');
		}
		$.ajax({
			url: "/stratroom/riskActivities/"+finalId+"?riskType="+type,
			success: riskActivitiesSuccessCallback
		});
	}
}

function riskActivitiesSuccessCallback(activitiesData) {
	$("#riskActionmonitoringForm").css('display', 'block');
	$('#riskaction_id').val(activitiesData.id);
	$('#activitiesriskId').val(activitiesData.riskId);
	$('#activitieschangeid').val(activitiesData.changeId);
	$('#possibility-name').val(activitiesData.riskActivitiesValue.name);
	$('#riskPlanId').val(activitiesData.riskPlanId);
	$("#possibility-category-select").val(activitiesData.riskActivitiesValue.category);
	$("#possibility-controltypes-select").val(activitiesData.riskActivitiesValue.controltype);
	$("#possibility-controleffectiveness-select").val(activitiesData.riskActivitiesValue.controleffectiveness);
	$("#possibility-likelihood-select").val(activitiesData.riskActivitiesValue.likelihood);
	$("#possibility-impact-select").val(activitiesData.riskActivitiesValue.impact);
	$("#possibility-score").val(activitiesData.riskActivitiesValue.score);
	$("#possibility-resolve-by").val(activitiesData.riskActivitiesValue.resolveby);
	$("#possibility-status-select").val(activitiesData.riskActivitiesValue.status);
	$("#possibility-progress").val(activitiesData.riskActivitiesValue.progress);

	$("#riskActionCreatedBy").html(activitiesData.riskActivitiesValue.ownerName);
	$("#riskActionUpdatedBy").html(activitiesData.riskActivitiesValue.updatedByName);
	$("#riskActionCreatedByDate").html(activitiesData.createDateString);
	$("#riskActionUpdatedByDate").html(activitiesData.updatedDateString);
}

function getRiskActivitiesObj() {
	var mileStoneObj = {
		"createdBy":($("#userPrincipal").val() || "").trim(), 
		"owner":($("#userPrincipal").val() || "").trim(), 
		"active": 0,
		"riskId":$("#activitiesriskId").val(),
		"parentchangeId":$("#activitieschangeid").val(),
		"changeId":$("#activitieschangeiddraft").val(),
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
	if (action == 'delete') {

	} else {
		var activitiesObj = getRiskActivitiesObj();
		activitiesObj.riskPlanId = $("#riskPlanId").val();
		var methodType = 'post';
		if (action == 'edit') {
			activitiesObj.id = $("#riskaction_id").val();
			methodType = 'put';
		}

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
}

function deleteRiskComments(commentId) {
	$("#deleterecordid").val(commentId);
	$("#deleterecordtype").val("riskComments");
	$('#deleteModalrisk').modal('toggle');
	$(window).on("resize", function () {
		$(".modal:visible").each(alignModal);
	});
	$(".modal").on("shown.bs.modal", alignModal);

	/*
	 * var methodType = 'delete' $.ajax({ url : "/stratroom/riskComments/" +
	 * commentId, type : methodType, contentType : "application/json", success :
	 * function(data, status) { location.reload(true); console.log("comments was
	 * deleted"); } });
	 */

}
function deleteRiskReplyComments(commentreplyId) {
	
	$("#delete_reply_risk").val(commentreplyId);
	console.log(commentreplyId,"commentreplyId")
	$('#delete_popup_reply').modal('toggle');
	$(window).on("resize", function () {
		$(".modal:visible").each(alignModal);
	});
	$(".modal").on("shown.bs.modal", alignModal);

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
	} else if (typeofdeleteurl == "attachment") {
		url = "/stratroom/riskAttach/" + id;
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



function handleRiskPlanEvent(finalId,riskId, type ,action) {
    console.log(finalId, type, action,riskId,"finalId, type, action"); // Debugging the received parameters

    $("#riskPlanForm").css('display', 'none');
    $("#riskPlanForm").trigger("reset");
    $('#plan_desc_add_popup').modal('toggle');
    // $("#riskPlanForm input[name='riskId']").val(riskId);
    $("#riskPlanForm input[name='action']").val(action);

    if (action == 'delete') {
        $.ajax({
            url: "/stratroom/riskPlan/" + finalId,
            type: 'delete',
            contentType: "application/json",
            success: function (data, status) {
                console.log("Risk plan was deleted");
                localStorage.setItem("reload", "1");
                window.location.reload(true);
            }
        });
    } else if (action == 'add') {
        $("#riskPlanCreatedBy").html("");
        $("#riskPlanCreatedByDate").html("");
        $("#riskPlanUpdatedBy").html("");
        $("#riskPlanUpdatedByDate").html("");
        $("#riskplan_id_wrapper").css('display', 'none');
        $("#riskPlanForm").css('display', 'block');
        formvalidationerrorreset();
        $('#riskPlanForm #plancause-select').find('option').remove().end();
        $('#riskPlanForm #plancause-select').append(`<option value="" data-i18n="Choose">Choose</option>`);
        populateCauseList('#riskPlanForm #plancause-select', riskId);
    } else { // view and edit
        $("#riskplan_id_wrapper").css('display', 'block');
        formvalidationerrorreset();
        $('#plan_desc_add_popup #riskplan_id').prop("disabled", true);
        $('#riskPlanForm #plancause-select').find('option').remove().end();
        $('#riskPlanForm #plancause-select').append(`<option value="" data-i18n="Choose">Choose</option>`);
        populateCauseList('#riskPlanForm #plancause-select', riskId);

        if (action == 'view') {
            $('#riskPlanForm input[type="text"]').prop("disabled", true);
            $('#riskPlanForm input[type="checkbox"]').prop("disabled", true);
            $('#riskPlanForm select').prop("disabled", true);
            $('#riskPlanForm button[value="Save"]').css('display', 'none');
        }

        $.ajax({
            url: `/stratroom/riskPlan/${finalId}?riskType=${type}`,
            success: riskPlanSuccessCallback
        });
    }
}





function handleRiskTreatmentEvent(finalId, type,action) {

    $("#riskTreatmentForm").css('display', 'none');
    $("#riskTreatmentForm").trigger("reset");
    $('#risk_treatment_add_popup').modal('toggle');
    $("#riskTreatmentForm input[name='riskId']").val();
    $("#risktreatmentaction").val(action);

    if (action == 'delete') {
        var methodType = 'delete';
        $.ajax({
            url: "/stratroom/riskPlan/" + finalId,
            type: methodType,
            contentType: "application/json",
            success: function (data, status) {
                console.log("riskplan was deleted");
                localStorage.setItem("reload", "1");
                window.location.reload(true);
            }
        });

    } else if (action == 'add') {
        $("#riskTreatmentCreatedBy").html("");
        $("#riskTreatmentCreatedByDate").html("");
        $("#riskTreatmentUpdatedBy").html("");
        $("#riskTreatmentUpdatedByDate").html("");
        $("#risktreatment_id_wrapper").css('display', 'none');
        // when adding
        $("#riskTreatmentForm").css('display', 'block');
        formvalidationerrorreset();
    } else if (action === 'view' || action === 'edit') {
        $("#risktreatment_id_wrapper").css('display', 'block');
        formvalidationerrorreset();
        $('#risktreatment_id').prop("disabled", true);

        if (action === 'view') {
            $('#riskTreatmentForm input[type="text"]').prop("disabled", true);
            $('#riskTreatmentForm input[type="checkbox"]').prop("disabled", true);
            $('#riskTreatmentForm select').prop("disabled", true);
            $('#riskTreatmentForm button[value="Save"]').css('display', 'none');
        }

        // API call for 'view' or 'edit' actions
        $.ajax({
            url: "/stratroom/riskPlan/" + finalId + "?riskType=" + type,
            success: riskTreatmentSuccessCallback
        });
    }
}


function riskTreatmentSuccessCallback(detailObj) {
	$("#riskTreatmentForm").css('display', 'block');
	$('#riskTreatmentriskId').val(detailObj.riskId);
	$('#risktreatment_id').val(detailObj.id);
	$('#treatment-action').val(detailObj.riskPlanValue.action);
	$('#riskTreatmentChangeId').val(detailObj.changeId);
	$('#treatment-impact').val(detailObj.riskPlanValue.reducingimpact);
	$('#treatment-possibility').val(detailObj.riskPlanValue.reducingpossibility);
	$('#treatment-kpi_start_end_date').val(detailObj.riskPlanValue.timetarget);
	$('#treatment-progress').val(detailObj.riskPlanValue.progress);

	// $("#riskPlanCreatedById").val(detailObj.createdBy);
	$("#riskTreatmentCreatedBy").html(detailObj.riskPlanValue.ownerName);
	$("#riskTreatmentUpdatedBy").html(detailObj.riskPlanValue.updatedByName);
	$("#riskTreatmentCreatedByDate").html(detailObj.createDateString);
	$("#riskTreatmentUpdatedByDate").html(detailObj.updatedDateString);
}


function riskPlanSuccessCallback(detailObj) {
	$("#riskPlanForm").css('display', 'block');
	$('#planriskId').val(detailObj.riskId);
	$('#riskplan_id').val(detailObj.id);	
	$('#planchangeId').val(detailObj.changeId );
	$('#plantype-select').val(detailObj.riskPlanValue.type);
	$('#plancause-select').val(detailObj.riskPlanValue.cause);
	$('#riskplan_name').val(detailObj.riskPlanValue.name);
	$("#planresolveby").val(detailObj.riskPlanValue.resolveDate);
	$("#plan-controltypes-select").val(detailObj.riskPlanValue.controlTypes)
	$("#plan-controleffectiveness-select").val(detailObj.riskPlanValue.controleffectiveness)
	$("#plan-category-select").val(detailObj.riskPlanValue.category)
	$("#plan-likelihood-select").val(detailObj.riskPlanValue.likelihood)
	$("#plan-impact-select").val(detailObj.riskPlanValue.impact)
	$("#plan-score").val(detailObj.riskPlanValue.planscore)
	$("#plan-progress-name").val(detailObj.riskPlanValue.progress)
	$("#plan-action-select").val(detailObj.riskPlanValue.action)

	$("#riskPlanCreatedById").val(detailObj.createdBy);
	$("#riskPlanCreatedBy").html(detailObj.riskPlanValue.ownerName);
	$("#riskPlanUpdatedBy").html(detailObj.riskPlanValue.updatedByName);
	$("#riskPlanCreatedByDate").html(detailObj.createDateString);
	$("#riskPlanUpdatedByDate").html(detailObj.updatedDateString);
}

function getRiskPlanObj(typeFlag) {
	var riskplanpro = $("#riskplan_progress").val();
	var mileStoneObj = {
		"changeId":$("#planchangeId").val(),
		"parentchangeId":$("#planchangeIddraft").val(),
		"createdBy": $("#riskPlanCreatedById").val(),
		"riskId": $("#planriskId").val(),
		"owner":($("#userPrincipal").val() || "").trim(), 
		"typeFlag": typeFlag,
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
		"parentchangeId":$("#riskTreatmentChangeIddraft").val(),
		"createdBy": $("#riskTreatmentCreatedById").val(),
		"changeId":$("#riskTreatmentChangeId").val(),
		"riskId":$("#riskTreatmentriskId").val(),
		"owner":($("#userPrincipal").val() || "").trim(), 
		"typeFlag": typeFlag,
		"riskPlanValue": {
			"action": $("#treatment-action").val(),
			"reducingimpact": $("#treatment-impact").val(),
			"reducingpossibility": $("#treatment-possibility").val(),
			"timetarget": $('#treatment-kpi_start_end_date').val(),
			"progress": $('#treatment-progress').val()
		}
	}
	return mileStoneObj;
}



function handleRiskPlanSave(type) {

	var action = $("#riskplanaction").val();
	var actiontreatment = $("#risktreatmentaction").val();

	if (action == 'delete' || actiontreatment == 'delete') {

	} else {
		var serviceObj = getRiskPlanObj(type);

		if (actiontreatment && actiontreatment !== "") {
			action = actiontreatment
		}
		if (type === "RiskTreatment") {
			serviceObj = getRiskTreatmentObj(type);
		}
		serviceObj.riskId = $("#riskPlanForm input[name='riskId']").val();
		if (serviceObj.typeFlag == "RiskMonitoring") {
			serviceObj["riskPlanValue"]["status"] = "Open";
		}
		console.log(serviceObj);

		var methodType = 'post';
		if (action == 'edit') {
			if (type === "RiskTreatment") {
				serviceObj.id = $("#risktreatment_id").val();
				methodType = 'put';

			} else {
				serviceObj.id = $("#riskplan_id").val();
				methodType = 'put';

			}

		}

		if ($("#plans_selected_user_" + serviceObj.id).val()) {
			serviceObj.multipleOwners = $(
				"#plans_selected_user_" + serviceObj.id).val();
		} else {
			serviceObj.multipleOwners = ($("#userPrincipal").val() || "").trim();
		}

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


function handleReviewMonitoringEvent(finalId,type,action) {

console.log(finalId,type,action,"finalId,type,action")
	$('#risk_monitoring_popup').modal('toggle');

	$("#riskMonitorForm").trigger("reset");
	// $("#riskMonitor_riskid").val(riskId);
	$("#riskMonitorForm input[name='action']").val(action);
	$("#monitoring-action").val(action)
	$("#monitoring_name").val(monitoringname);
	console.log(action)
	// console.log(id)
	if (action == 'delete') {
		$("#riskMonitor_riskid").val(finalId);

		var methodType = 'delete'
		$.ajax({
			url: "/stratroom/riskMonitoring/" + finalId,
			type: methodType,
			contentType: "application/json",
			success: function (data, status) {
				localStorage.setItem("reload", "1");

				window.location.reload(true);
			}
		});

	} else if (action == 'add') {
		$("#riskMonitorCreatedBy").html("");
		$("#riskMonitorCreatedByDate").html("");
		$("#riskMonitorUpdatedBy").html("");
		$("#riskMonitorUpdatedByDate").html("");
		$("#riskMonitor_id_wrapper").css('display', 'none');

		// when adding
		$("#riskMonitorForm").css('display', 'block');
	} else { // view and edit
		$("#riskMonitor_riskid").val(finalId);

		$(".risk_monitoring_popup").css('display', 'block');

		$('.risk_monitoring_popup #riskMonitor_riskid').prop("disabled", true);
		if (action == 'view') {
			$('#riskMonitorForm input[type="text"]').prop("disabled",
				true);
			$('#riskMonitorForm input[type="checkbox"]').prop(
				"disabled", true);
			$('#riskMonitorForm select').prop("disabled", true);
			$('#riskMonitorForm button[value="Save"]').css('display',
				'none');
		}
		$.ajax({
			url: "/stratroom/riskMonitoring/"+finalId+"?riskType="+type,
			success: riskMonitorSuccessCallback
		});
	}
}

function riskMonitorSuccessCallback(detailObj) {
	console.log(detailObj,"detailObj")
	riskmonitoringupdateDescription = detailObj;
	$("#riskMonitorForm").css('display', 'block');
	$('#monitoringriskId').val(detailObj.riskId);
	$('#riskMonitor_riskid').val(detailObj.id);
	$('#riskaction_id').val(detailObj.id);
	$('#riskMonitorChangeId').val(detailObj.changeId);
	$('#monitoring_plan').val(detailObj.riskMonitoringValue.mitigation);
	$('#monitoring_notes').val(detailObj.riskMonitoringValue.notes);
	$('#monitoring_completion').val(detailObj.riskMonitoringValue.targettime);
	$('#monitoring_changes-target_time').val(detailObj.riskMonitoringValue.changestime);
	$('#monitoring_progress').val(detailObj.riskMonitoringValue.progress);
	$('#monitoring_status').val(detailObj.riskMonitoringValue.status);
	$('#monitoring_person').val(detailObj.riskMonitoringValue.person);


	$("#riskMonitorCreatedBy").html(detailObj.riskMonitoringValue.ownerName);
	$("#riskMonitorUpdatedBy").html(detailObj.riskMonitoringValue.updatedByName);
	$("#riskMonitorCreatedByDate").html(detailObj.createDateString);
	$("#riskMonitorUpdatedByDate").html(detailObj.updatedDateString);
}

function getRiskMonitorObj() {
	var mileStoneObj = {
		"createdBy":($("#userPrincipal").val() || "").trim(), 
		"owner":($("#userPrincipal").val() || "").trim(), 
		"riskId": $("#monitoringriskId").val(),
		"parentchangeId":$("#riskMonitorChangeIddraft").val(),
		"changeId":$("#riskMonitorChangeId").val(),
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

	if (action == 'delete') {

	} else {
		var serviceObj = getRiskMonitorObj();
		console.log(serviceObj,"risk monitoring")
		serviceObj.riskId = $("#monitoringriskId")
			.val();
		var methodType = 'post';
		if (action == 'edit') {
			console.log($("#riskMonitor_riskid").val())
			serviceObj.id = $("#riskMonitor_riskid").val();
			methodType = 'put';
		}
		if ($("#monitoring_selected_user_" + serviceObj.id).val()) {
			serviceObj.multipleOwners = $(
				"#monitoring_selected_user_" + serviceObj.id).val();
		} else {
			serviceObj.multipleOwners = ($("#userPrincipal").val() || "").trim();
		}


		serviceObj.riskPlanValue.mitigation = $("#monitoring_plan").val();
		serviceObj.riskPlanValue.notes = $("#monitoring_notes").val();
		serviceObj.riskPlanValue.targettime = $("#monitoring_completion").val();
		serviceObj.riskPlanValue.changestime = $("#monitoring_changes-target_time").val();
		serviceObj.riskPlanValue.progress = $("#monitoring_progress").val();
		serviceObj.riskPlanValue.status = $("#monitoring_status").val();
		serviceObj.riskPlanValue.person = $("#monitoring_person").val();

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
}

// Risk Detail Changes
function riskDetailPopSuccessCallback(riskDetailData) {

    $("#riskDetailForm").css('display', 'block');

    // ---------- BASIC DETAILS ----------
    $('#riskDetail_id').val(riskDetailData.id);
    $('#riskUniqueId').val(riskDetailData.riskUniqueId || "");

    $('#riskDetail_name').val(riskDetailData.riskValue.name);
    $('#calculate_status').val(riskDetailData.riskValue.riskStatus);
    $('#calculate_score').val(riskDetailData.riskValue.score);
    $("#riskDetail_dateRaised").val(riskDetailData.createdTime);

    // ---------- RISK CATEGORY ----------
    $('#riskcategory-select')
        .val(riskDetailData.riskValue.riskcategory)
        .trigger("change");

    // ---------- 🔥 BUSINESS IMPACT (FIXED) ----------
    if (Array.isArray(riskDetailData.riskValue.businessimpact)) {

        var businessImpactIds = [];

        riskDetailData.riskValue.businessimpact.forEach(function (item) {

            // ensure option exists in select
            if ($("#businessimpact option[value='" + item.id + "']").length === 0) {
                var option = new Option(item.name, item.id, true, true);
                $("#businessimpact").append(option);
            }

            businessImpactIds.push(item.id);
        });

        $("#businessimpact")
            .val(businessImpactIds)
            .trigger("change"); // ✅ Select2 refresh
    }

    // ---------- DEPARTMENT ----------
    $("#Initiative_Department")
        .val(riskDetailData.riskValue.departmentId)
        .trigger("change");

    $("#department").val(riskDetailData.riskValue.departmentId);

    // ---------- RELATED PARTIES ----------
    if (riskDetailData.riskValue.relatedparties) {

        var partiesArray = riskDetailData.riskValue.relatedparties.split(',');
        var selectedIds = [];

        partiesArray.forEach(function (partyName) {
            var department = allDepartments.find(dept =>
                dept.name.trim().toLowerCase() === partyName.trim().toLowerCase()
            );
            if (department) {
                selectedIds.push(department.id);
            }
        });

        $("#relatedparties_select")
            .val(selectedIds)
            .trigger("change");
    }

    // ---------- RISK POS ----------
    if (Array.isArray(riskDetailData.riskValue.riskpos)) {
        $("#riskposval")
            .val(riskDetailData.riskValue.riskpos)
            .trigger("change");
    }

    // ---------- IMPACT ----------
    $("#impact-select")
        .val(riskDetailData.riskValue.impact)
        .trigger("change");

    $("#impact-select").val(riskDetailData.riskValue.impact);

    // ---------- OTHER FIELDS ----------
    $("#financialimpact").val(riskDetailData.riskValue.financialImpact);
    $("#Likelihood-select")
        .val(riskDetailData.riskValue.likeliHood)
        .trigger("change");

    $("#riskDetail_description").val(riskDetailData.riskValue.desc);
    $("#raise_date").val(riskDetailData.riskValue.dateRaised);
    $("#riskDetail_complete_date").val(riskDetailData.riskValue.dateCompleted);
    $("#riskDetail_next_date").val(riskDetailData.riskValue.nextAssessment);
    $("#riskDetail_areaImpact").val(riskDetailData.riskValue.areaImpact);

    // ---------- CHECKBOXES ----------
    $("#riskkpicheck").prop('checked', riskDetailData.riskValue.riskkpicheck);
    $("#riskposcheck").prop('checked', riskDetailData.riskValue.riskposcheck);
    $("#riskisocheck").prop('checked', riskDetailData.riskValue.riskisocheck);
    $("#riskinformatiomassetcheck").prop('checked', riskDetailData.riskValue.riskinformatiomassetcheck);
    $("#riskotherscheck").prop('checked', riskDetailData.riskValue.riskotherscheck);

    // ---------- TEXT VALUES ----------
    $("#riskposval").val(riskDetailData.riskValue.riskpos);
    $("#riskisoval").val(riskDetailData.riskValue.riskiso);
    $("#riskinformationassetval").val(riskDetailData.riskValue.riskinformationasset);
    $("#riskothersval").val(riskDetailData.riskValue.riskothers);

    // ---------- AUDIT INFO ----------
    $("#riskDetailCreatedById").val(riskDetailData.createdBy);
    $("#riskDetailCreatedBy").html(riskDetailData.riskValue.createdByName);
    $("#riskDetailUpdatedBy").html(riskDetailData.riskValue.updatedByName);
    $("#riskDetailCreatedByDate").html(riskDetailData.createDateString);
    $("#riskDetailUpdatedByDate").html(riskDetailData.updatedDateString);

    console.log("✅ Risk details populated successfully");
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
	loadAllDepartments(); // Ensure departments are loaded

	console.log(elementId)
			$.each(allDepartments, function (index, reportee) {
				$(elementId).append($('<option>', {
                    value: reportee.id,
                    text: reportee.name,
                    'data-name': reportee.name
              
				}));		
			
			});
			$(elementId).trigger("chosen:updated");

		
	
}
function populatePosval(selectSelector) {
    var $select = $(selectSelector);

    // clear existing options (important for edit popup)
    $select.empty();

    $.ajax({
        url: "/stratroom/retrieveMasterTypes?type=Process",
        async: false,
        success: function (data) {
            $.each(data, function (index, reportee) {
                let processName = reportee?.data?.processName;

                if (processName) {
                    $select.append(
                        `<option value="${processName}">${processName}</option>`
                    );
                }
            });

            // refresh select2 if already initialized
            if ($select.hasClass("select2-hidden-accessible")) {
                $select.trigger("change.select2");
            }
        }
    });
}




function handleRiskDetailEvent(id, action,type) {
	$("#riskDetailForm").css('display', 'none');
	$("#riskDetailForm").trigger('reset');
	$("#riskDetailaction").val(action);
	$('.riskDetail_description_popup').modal('toggle');
	// populateKPIList('.riskDetail_description_popup #riskDetail_areaImpact');
	$('#strength_impact').find('option').remove().end();
	// $('#Initiative_Department').find('option').remove().end();
	$('.riskDetail_description_popup #Initiative_Department').append(
		`<option value="" data-i18n="Choose">Choose</option>`);
	$('#monitoring_person').find('option').remove().end();
	$('#relatedparties_select').find('option').remove().end();

	$('.riskDetail_description_popup #businessimpact').append(
		`<option value="" data-i18n="Choose">Choose</option>`);
	populateKPIList('.riskDetail_description_popup #businessimpact');
	populateOwnerDropdowndepartment('.riskDetail_description_popup #Initiative_Department');

	populateOwnerDropdowndepartment('.riskDetail_description_popup #relatedparties_select');
	populatePosval('.riskDetail_description_popup #riskposval');

	$('.chosen-select')
		.chosen({})
		.change(
			function (obj, result) {
				$(".chosen-container-single").find('label.error')
					.remove();
			});
	$(".chosen-container-single").css("width", "100%");

	// $('#raise_date').datepicker({
	// 	language: 'en',
	// 	autoClose: true,
	// 	position: "top left",
	// 	todayButton: true,
	// 	onSelect: function (fd) {
	// 		var startdate = new Date(fd);
	// 		startdate = startdate.setDate(startdate.getDate() + 1);
	// 		startdate = new Date(startdate);
	// 		$('#riskDetail_complete_date').datepicker({
	// 			language: 'en',
	// 			minDate: startdate,
	// 			autoClose: true,
	// 			position: "top left",
	// 			todayButton: true,
	// 			onSelect: function (fd) {
	// 				var nextdate = new Date(fd);
	// 				nextdate = nextdate.setDate(nextdate.getDate() + 1);
	// 				nextdate = new Date(nextdate);
	// 				$('#riskDetail_next_date').datepicker({
	// 					language: 'en',
	// 					minDate: nextdate,
	// 					autoClose: true,
	// 					position: "top left",
	// 					todayButton: true,
	// 					onSelect: function (fd) {
	// 						// $('.datepickers-container').hide();
	// 					}
	// 				});
	// 			}
	// 		});
	// 	}
	// });

	if (action == 'add') {
		$("#createdBy").html("");
		$("#createdByDate").html("");
		$("#updatedBy").html("");
		$("#updatedByDate").html("");
		$("#riskDetail_id_wrapper").css('display', 'none'); // Hide the ID input
		// when adding
		$("#riskDetailForm").css('display', 'block');
		$(".riskDetail_description_popup #businessimpact").trigger(
			"chosen:updated");
		$(".riskDetail_description_popup #Initiative_Department").trigger(
			"chosen:updated");
		$("#monitoring_person").trigger(
			"chosen:updated");
		$('.riskDetail_description_popup #riskUniqueId')
			.prop("disabled", false);

		formvalidationerrorreset();

	} else { // view and edit
		//	$("#riskDetail_id_wrapper").css('display', 'block');
		$('.riskDetail_description_popup #riskDetail_id')
			.prop("disabled", true);
		$('.riskDetail_description_popup #riskUniqueId')
			.prop("disabled", true);
		formvalidationerrorreset();
		if (action == 'view') {
			$('#riskDetailForm input[type="text"]').prop("disabled", true);
			$('#riskDetailForm input[type="checkbox"]').prop("disabled", true);
			$('#riskDetailForm select').prop("disabled", true);
			$('#riskDetailForm button[value="Save"]').css('display', 'none');
		}

		$.ajax({
			url: "/stratroom/risk/" + id+"?riskType=" + type,
			success: riskDetailPopSuccessCallback
		});
	}
}



function handleRiskDetailSave() {
	var action = $("#riskDetailaction").val();
	if (action == 'delete') {

	} else {
		var riskDetail = getRiskDetailObj(action);
		var methodType = 'post';
		if (action == 'add') {
		} else if (action == 'edit') {
			riskDetail.id = $("#riskDetail_id").val();
			riskDetail.riskUniqueId = $("#riskUniqueId").val();
			methodType = 'put';
		}

		console.log($("#Initiative_Department").val())

		console.log(action)
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
}

function risksidebarappend(data) {

	var image = $("#profileImage").attr("src");
	var username = (data.riskValue.createdByName != undefined ? data.riskValue.createdByName.slice(0, 2)
		: "risk");
	var name = (data.riskValue.name != undefined ? data.riskValue.name : "");
	var datecompleted = (data.riskValue.ch_dateCompleted != undefined ? data.riskValue.ch_dateCompleted
		: "");
	var startdate = new Date(datecompleted);
	var riskimpact = (data.riskValue.impact != undefined ? data.riskValue.impact
		: "");
	var riskstatus = (data.riskValue.likeliHood != undefined ? data.riskValue.likeliHood
		: "");
	var businessImpact = (data.riskValue.businessImpact != undefined ? data.riskValue.businessImpact
		: "");

	var id = data.id;
	var initiativeProgressBar = "initiative_side_border_default";
	if (riskimpact == 'Insignificant' && riskstatus == 'Rare') {
		initiativeProgressBar = "initiative_side_border_verygood";
	} else if (riskimpact == 'Minor' && riskstatus == 'Rare') {
		initiativeProgressBar = "initiative_side_border_verygood";
	} else if (riskimpact == 'Moderate' && riskstatus == 'Rare') {
		initiativeProgressBar = "initiative_side_border_good";
	} else if (riskimpact == 'Major' && riskstatus == 'Rare') {
		initiativeProgressBar = "initiative_side_border_good";
	} else if (riskimpact == 'Catastrophic' && riskstatus == 'Rare') {
		initiativeProgressBar = "initiative_side_border_medium";
	} else if (riskimpact == 'Insignificant' && riskstatus == 'Unlikely') {
		initiativeProgressBar = "initiative_side_border_verygood";
	} else if (riskimpact == 'Minor' && riskstatus == 'Unlikely') {
		initiativeProgressBar = "initiative_side_border_good";
	} else if (riskimpact == 'Moderate' && riskstatus == 'Unlikely') {
		initiativeProgressBar = "initiative_side_border_good";
	} else if (riskimpact == 'Major' && riskstatus == 'Unlikely') {
		initiativeProgressBar = "initiative_side_border_medium";
	} else if (riskimpact == 'Catastrophic' && riskstatus == 'Unlikely') {
		initiativeProgressBar = "initiative_side_border_bad";
	} else if (riskimpact == 'Insignificant' && riskstatus == 'Possible') {
		initiativeProgressBar = "initiative_side_border_bad";
	} else if (riskimpact == 'Minor' && riskstatus == 'Possible') {
		initiativeProgressBar = "initiative_side_border_medium";
	} else if (riskimpact == 'Moderate' && riskstatus == 'Possible') {
		initiativeProgressBar = "initiative_side_border_medium";
	} else if (riskimpact == 'Major' && riskstatus == 'Possible') {
		initiativeProgressBar = "initiative_side_border_bad";
	} else if (riskimpact == 'Catastrophic' && riskstatus == 'Possible') {
		initiativeProgressBar = "initiative_side_border_critical";
	} else if (riskimpact == 'Insignificant' && riskstatus == 'Likely') {
		initiativeProgressBar = "initiative_side_border_medium";
	} else if (riskimpact == 'Minor' && riskstatus == 'Likely') {
		initiativeProgressBar = "initiative_side_border_medium";
	} else if (riskimpact == 'Moderate' && riskstatus == 'Likely') {
		initiativeProgressBar = "initiative_side_border_bad";
	} else if (riskimpact == 'Major' && riskstatus == 'Likely') {
		initiativeProgressBar = "initiative_side_border_critical";
	} else if (riskimpact == 'Catastrophic' && riskstatus == 'Likely') {
		initiativeProgressBar = "initiative_side_border_critical";
	} else if (riskimpact == 'Insignificant' && riskstatus == 'Almost Certain') {
		initiativeProgressBar = "initiative_side_border_medium";
	} else if (riskimpact == 'Minor' && riskstatus == 'Almost Certain') {
		initiativeProgressBar = "initiative_side_border_bad";
	} else if (riskimpact == 'Moderate' && riskstatus == 'Almost Certain') {
		initiativeProgressBar = "initiative_side_border_bad";
	} else if (riskimpact == 'Major' && riskstatus == 'Almost Certain') {
		initiativeProgressBar = "initiative_side_border_critical";
	} else if (riskimpact == 'Catastrophic' && riskstatus == 'Almost Certain') {
		initiativeProgressBar = "initiative_side_border_critical";
	}

	var imagedata = "";
	if (image != "") {
		imagedata = '<img src="' + image + '" class="rounded-circle" alt="'
			+ username + '" width="25" />';
	} else {
		imagedata = '<img data-name="' + username
			+ '" class="rounded-circle riskuser" alt="' + username
			+ '" width="25" />';
	}
	var risksidebarElement = '<div class="d-flex flex-column sub_initiative_sidebar_details '
		+ initiativeProgressBar
		+ ' sidebarriskid_'
		+ id
		+ ' " onclick="populateRiskDetails('
		+ businessImpact
		+ ','
		+ id
		+ ')"><div class="d-flex flex-row p-b-5"><div class="flex-column profile_image">'
		+ imagedata
		+ '</div><div class="d-flex flex-column profile_content" style="width : 75%;min-height:55px;max-height:55px;"><p><pre>'
		+ name
		+ '</pre></p></div></div><div class="d-flex flex-row justify-content-between m-t--10"><div class="flex-column ini_side_depart_bar"><div class="employee_info">Risk Rating</div><p class="riskscorevalue"></p></div><div class="d-flex flex-column ini_side_due"><p>'
		+ datecompleted + '</p></div></div></div>';


		

	$("#risk_sidebar").append(risksidebarElement);
	$.notify("Risk created successfully", {
		style: 'success',
		className: 'graynotify'
	});
	$('.riskDetail_description_popup').modal('toggle');
}

function getRiskDetailObj(action) {

    function getBusinessImpactArray() {
        return $('#businessimpact').select2('data').map(function (item) {
            return {
                id: item.id,
                name: item.text
            };
        });
    }

    var DataObj = {
        riskValue: {}
    };

    // ---------- COMMON DATA ----------
    var relatedPartiesArr = $('#relatedparties_select').select2('data').map(function (item) {
        return item.text;
    });
    var relatedPartiesComma = relatedPartiesArr.join(',');

    var businessImpactArr = getBusinessImpactArray();
    var businessImpactIds = businessImpactArr.map(x => x.id);

    // ---------- EDIT ----------
    if (action === "edit") {

        DataObj.id = $('#riskDetail_id').val();
        DataObj.riskUniqueId = $('#riskUniqueId').val();
        DataObj.departmentId = $("#Initiative_Department").val();
        DataObj.owner = ($("#userPrincipal").val() || "").trim();

        DataObj.riskValue = {
            name: $("#riskDetail_name").val(),
            desc: $("#riskDetail_description").val(),
            relatedparties: relatedPartiesComma,
            riskcategory: $("#riskcategory-select").val(),
            impact: $("#impact-select").val(),
            departmentId: $("#Initiative_Department").val(),
            department: $("#department").val(),
            riskStatus: $("#calculate_status").val(),
            score: $("#calculate_score").val(),
            dateRaised: $("#raise_date").val(),
            dateCompleted: $("#riskDetail_complete_date").val(),
            nextAssessment: $("#riskDetail_next_date").val(),

            // 🔥 FIXED PART
            businessimpact: businessImpactArr,
            impactkpiId: businessImpactIds,

            financialImpact: $("#financialimpact").val(),
            likeliHood: $("#Likelihood-select").val(),
			impactselect:$("#impact-select").val(),

            riskkpicheck: $("#riskkpicheck").prop('checked'),
            riskposcheck: $("#riskposcheck").prop('checked'),
            riskisocheck: $("#riskisocheck").prop('checked'),

            riskpos: $("#riskposval").val(),
            riskiso: $("#riskisoval").val(),
            riskothers: $("#riskothersval").val(),

            riskinformationasset: $("#riskinformationassetval").val(),
            riskinformatiomassetcheck: $("#riskinformatiomassetcheck").prop('checked'),
            riskotherscheck: $("#riskotherscheck").prop('checked')
        };

        // Preserve old values not edited
        $.each(riskupdateDescription, function (key, val) {
            if (key !== "riskValue") {
                DataObj[key] = val;
            }
        });

        $.each(riskupdateDescription.riskValue, function (key, val) {
            if (!(key in DataObj.riskValue)) {
                DataObj.riskValue[key] = val;
            }
        });

    }
    // ---------- CREATE ----------
    else {

        var riskPosArr = $('#riskposval').select2('data').map(function (item) {
            return item.text;
        }).join(',');

        DataObj = {
            createdBy: $("#riskDetailCreatedById").val(),
            riskUniqueId: $("#riskUniqueId").val(),
            departmentId: $("#Initiative_Department").val(),
            owner: ($("#userPrincipal").val() || "").trim(),

            riskValue: {
                name: $("#riskDetail_name").val(),
                desc: $("#riskDetail_description").val(),
                score: $("#calculate_score").val(),
                relatedparties: relatedPartiesComma,
                riskcategory: $("#riskcategory-select").val(),
                impact: $("#impact-select").val(),
                departmentId: $("#Initiative_Department").val(),

                // 🔥 FIXED PART
                businessimpact: businessImpactArr,
                impactkpiId: businessImpactIds,

                financialImpact: $("#financialimpact").val(),
                impactselect: $("#impact-select").val(),
				likeliHood: $("#Likelihood-select").val(),
                dateRaised: $("#raise_date").val(),
                dateCompleted: $("#riskDetail_complete_date").val(),
                nextAssessment: $("#riskDetail_next_date").val(),
                riskStatus: $("#calculate_status").val(),

                riskkpicheck: $("#riskkpicheck").prop('checked'),
                riskposcheck: $("#riskposcheck").prop('checked'),
                riskisocheck: $("#riskisocheck").prop('checked'),

                riskpos: riskPosArr,
                riskiso: $("#riskisoval").val(),
                riskothers: $("#riskothersval").val(),

                riskinformationasset: $("#riskinformationassetval").val(),
                riskinformatiomassetcheck: $("#riskinformatiomassetcheck").prop('checked'),
                riskotherscheck: $("#riskotherscheck").prop('checked')
            }
        };
    }

    // Safety sync
    DataObj.departmentId = $("#Initiative_Department").val();
    if (DataObj.riskValue) {
        DataObj.riskValue.departmentId = $("#Initiative_Department").val();
    }

    console.log("FINAL PAYLOAD 👉", DataObj);
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

$("#Initiative_Department").on("change", function () {
    // Rebuild or update DataObj when the value changes
   console.log($(this).val());
   console.log($("#Initiative_Department").val())
});
function handleRiskCauseEvent(finalId, riskId, changeId, type, action, parentchangeId) {
	console.log(finalId,"id")
    $("#riskCauseForm").css('display', 'none');
    $("#riskCauseForm").trigger('reset');
    $('.cause_conq_popup').modal('toggle');
    $("#riskCauseForm input[name='action']").val(action);
    $("#riskCauseForm input[name='riskId']").val(riskId);
    $("#riskCauseForm input[name='causeChangeIddraft']").val(parentchangeId);
    $("#riskCauseForm input[name='changeId']").val(changeId);

    if (action == 'add') {
        $("#riskCauseCreatedBy").html("");
        $("#riskCauseCreatedByDate").html("");
        $("#riskCauseUpdatedBy").html("");
        $("#riskCauseUpdatedByDate").html("");
        $("#riskCauseId_wrapper").css('display', 'none'); // Hide the ID input
        $("#riskCauseForm").css('display', 'block');
        $("#riskCauseForm #riskCauseDesc").val('');
    } else { // view and edit
        $("#riskCauseId_wrapper").css('display', 'block');
        $('.cause_conq_popup #riskCauseId').prop("disabled", true);

        if (action == 'view') {
            $('#riskCauseForm input[type="text"]').prop("disabled", true);
            $('#riskCauseForm input[type="checkbox"]').prop("disabled", true);
            $('#riskCauseForm select').prop("disabled", true);
            $('#riskCauseForm button[value="Save"]').css('display', 'none');
        }

        // Pass the `type` in the AJAX request
        $.ajax({
            url: "/stratroom/riskCause/"+finalId+"?riskType="+type,
            success: riskCausePopSuccessCallback
        });
    }
}


function handleRiskCauseSave() {
	var action = $("#causeaction").val();
	if (action == 'delete') {

	} else {
		var riskDetail = getRiskCauseObj();
		riskDetail.riskId = $("#riskCauseForm input[name='riskId']").val();
		var methodType = 'post';
		if (action == 'add') {
		}else if (action == 'edit') {
			riskDetail.id = $("#riskCauseId").val();
			methodType = 'put';
		}
		console.log(riskDetail,"riskDetail data");
		$.ajax({
			url: "/stratroom/riskCause/",
			type: methodType,
			contentType: "application/json",
			data: JSON.stringify(riskDetail),
			success: function (data, status) {
				console.log(riskDetail,"riskDetail");
				localStorage.setItem("reload", "1");

				location.reload(true);
				$("#riskCauseClosePopup").click();
				console.log("New risk was created..");
			}
		});
	}
}

function getRiskCauseObj() {
	var riskDetail = {
		"riskId":$("#riskCauseForm input[name='riskId']").val(),
		"parentchangeId":$("#causeChangeIddraft").val(),
		"createdBy": $("#causeCreatedById").val(),
		"changeId":$("#causeChangeIddraft").val(),
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

function riskCausePopSuccessCallback(riskDetailData) {
	console.log(riskDetailData,"riskDetailData cause")
	$("#riskCauseForm").css('display', 'block');
	$('#riskCauseId').val(riskDetailData.id)
	$("#causeriskId").val(riskDetailData.riskId);
	$("#causeChangeId").val(riskDetailData.changeId);
	$("#causeCreatedById").val(riskDetailData.createdBy);
	$("#riskCauseDesc").val(riskDetailData.causeAndConsequenceValue.description);
	$("#riskCauseName").val(riskDetailData.causeAndConsequenceValue.name);
	$("#cause-rating-select").val(riskDetailData.causeAndConsequenceValue.riskRating);
	$("#cause_riskcategory_select").val(riskDetailData.causeAndConsequenceValue.riskcategory);
	$("#cause-possible-select").val(riskDetailData.causeAndConsequenceValue.possible);
	$("#cause-likelihood-select").val(riskDetailData.causeAndConsequenceValue.likelihood);
	$("#cause-impact-select").val(riskDetailData.causeAndConsequenceValue.impact);
	$("#cause-score").val(riskDetailData.causeAndConsequenceValue.score);


	$("#riskCauseCreatedBy").html(
		riskDetailData.causeAndConsequenceValue.createdByName);
	$("#riskCauseUpdatedBy").html(
		riskDetailData.causeAndConsequenceValue.updatedByName);
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
function deleteAttachments(id) {
	$("#deleterecordid").val(id);
	$("#deleterecordtype").val("RiskAttachments");
	$('#deleteModalrisk').modal('toggle');
	$(window).on("resize", function () {
		$(".modal:visible").each(alignModal);
	});
	$(".modal").on("shown.bs.modal", alignModal);
}
function handleRiskConqEvent(finalId, causeId, type,action) {
	$("#riskConqForm").css('display', 'none');
	$('.sub_cause_conq_popup').modal('toggle');
	$("#riskConqForm").trigger('reset');
	$("#conqaction").val(action);
	$("#riskConqForm input[name='causeId']").val(causeId);
	$("#riskConqForm input[name='conqChangeId']").val(finalId);
	if (action == 'add') {
		$("#riskConqCreatedBy").html("");
		$("#riskConqCreatedByDate").html("");
		$("#riskConqUpdatedBy").html("");
		$("#riskConqUpdatedByDate").html("");
		$("#riskConqId_wrapper").css('display', 'none'); // Hide the ID input
		// when adding
		$("#riskConqForm").css('display', 'block');
	} else { // view and edit
		$("#riskConqId_wrapper").css('display', 'block');
		$('.sub_cause_conq_popup #riskConqId').prop("disabled", true);

		if (action == 'view') {
			$('#riskConqForm input[type="text"]').prop("disabled", true);
			$('#riskConqForm input[type="checkbox"]').prop("disabled", true);
			$('#riskConqForm select').prop("disabled", true);
			$('#riskConqForm button[value="Save"]').css('display', 'none');
		}

		$.ajax({
			url: "/stratroom/riskConsequence/"+finalId+"?riskType="+type,
			success: riskConqPopSuccessCallback
		});
	}
}

function handleRiskConqSave() {
	var action = $("#riskConqForm input[name='action']").val();
	if (action == 'delete') {

	} else {
		var riskDetail = getRiskConqObj();
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
		"changeId":$("#conqChangeIddraft").val(),
		"causeConqId":$("#conqChangeId").val(),
		"parentchangeId":$("#conqChangeIddraft").val(),
		"riskId":$("#conqriskId").val(),
		"createdBy": $("#conqCreatedById").val(),
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

function riskConqPopSuccessCallback(riskDetailData) {
	console.log(riskDetailData,"riskDetailData conq");
	$("#riskConqForm").css('display', 'block');
	$('#riskConqId').val(riskDetailData.id)
	$('#conqriskId').val(riskDetailData.riskId)
	$("#causeId").val(riskDetailData.causeConqId);
	$("#conqCreatedById").val(riskDetailData.createdBy);
	$("#riskConqDesc").val(riskDetailData.consequenceValue.description);
	$("#riskConqName").val(riskDetailData.consequenceValue.name);

	$("#conq-rating-select").val(riskDetailData.consequenceValue.riskRating);
	$("#conq-impactcategory-select").val(riskDetailData.consequenceValue.impactcategory);
	$("#conq-possible-select").val(riskDetailData.consequenceValue.possible);
	$("#conq-likelihood-select").val(riskDetailData.consequenceValue.likelihood);
	$("#conq-impact-select").val(riskDetailData.consequenceValue.impact);
	$("#conq-score").val(riskDetailData.consequenceValue.score);

	$("#riskConqCreatedBy").html(riskDetailData.consequenceValue.createdByName);
	$("#riskConqUpdatedBy").html(riskDetailData.consequenceValue.updatedByName);
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
				swotObj.multipleOwners = ($("#userPrincipal").val() || "").trim();
				$(
					"#monitoring_selected_user_"
					+ riskmonitoringupdateDescription.id)
					.val(($("#userPrincipal").val() || "").trim());
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
			swotObj.multipleOwners = ($("#userPrincipal").val() || "").trim();
			$("#plans_selected_user_" + riskplanupdateDescription.id).val(
				($("#userPrincipal").val() || "").trim());
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
    var riskcollapse = 1; // counter for unique IDs

    sub_initiatiesrow += '<div class="accordion" id="accordionCauseandConsequenceView">';
function getRiskClass(rating) {
    if (!rating) return "";
    switch (rating.trim().toLowerCase()) {
            case "very low":
            return "status-bg-sky-blue";
        case "tolerable":
            return "status-bg-cyan";
        case "low":
            return "status-bg-lime-green";
        case "extreme":
            return "status-bg-maroon";
		case "medium":
            return "status-bg-yellow";
		case "high":
            return "status-bg-orange";
		case "very high":
            return "status-bg-red";
        default:
            return "";
    }
}
    $.each(result, function (index, item) {
        var collapseId = `causeandConsequenceView-collapse-${riskcollapse}`;
        var headingId = `flush-causeandConsequence-heading-${riskcollapse}`;

        sub_initiatiesrow += `
        <div class="accordion-item">
            <div class="accordion-header bg-primary" style="--stratroom-bg-opacity:0.04" id="${headingId}">
                <div class="d-flex justify-content-between p-2 gap-1">
                    <button class="btn p-0 btn-title justify-content-start" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#${collapseId}" 
                        aria-expanded="false" 
                        aria-controls="${collapseId}">
                        <div class="row row-cols-1 g-2">
                            <span class="col mb-0">${item.causeAndConsequenceValue.name}</span>
                        </div>
                    </button>
                    <div class="list-actions">
                        <div class="d-flex align-items-start">
                            <span class="badge ${getRiskClass(item.causeAndConsequenceValue.riskRating)} rounded-pill ms-auto" style="--stratroom-bg-opacity:1">
                                ${displayOptionText("rating", item.causeAndConsequenceValue.riskRating)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div id="${collapseId}" class="accordion-collapse collapse show" 
                aria-labelledby="${headingId}" 
                data-bs-parent="#accordionCauseandConsequenceView">
                <div class="accordion-body gap-0 p-0">
        `;

        if (conviewpermission) {
            $.each(item.consequenceList, function (index, item1) {
                sub_initiatiesrow += `
                    <div class="list-group-item border-bottom">
                        <div class="d-flex justify-content-between p-2 gap-1">
                            <div class="btn-title justify-content-start">
                                <div class="row row-cols-1 g-2">
                                    <span class="col mb-0">${item1.consequenceValue.name}</span>
                                </div>
                            </div>
                            <div class="list-actions">
                                <div class="d-flex align-items-start">
                                    <span class="badge ${getRiskClass(item1.consequenceValue.riskRating)} rounded-pill ms-auto">
                                        ${displayOptionText("category", item1.consequenceValue.riskRating)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        sub_initiatiesrow += `
                </div> <!-- accordion-body -->
            </div> <!-- collapse -->
        </div> <!-- accordion-item -->
        `;

        riskcollapse++;
    });

    sub_initiatiesrow += '</div>';

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


function planrecordsviewSuccessCallback(result) {
    var sub_initiatiesrow = '';
    var riskcollapse = 10; // Starting unique ID seed for collapse targets
	var chartcontent01 = [];
	var chartcontent02 = [];
    sub_initiatiesrow += '<div class="accordion" id="accordionPlanView">';

    $.each(result, function (index, item) {
        var collapseId = `plan-collapse-${riskcollapse}`;
        
        // Build avatar list
        var resultPorfileContent = '';
        if (item.riskOwnersList && item.riskOwnersList.length > 0) {
            $.each(item.riskOwnersList, function (idx, owner) {
                resultPorfileContent += `
                    <li class="avatar avatar-xs pull-up">
                        <img src="${owner.avatarUrl || 'default-avatar.png'}" alt="${owner.name}" class="rounded-circle">
                    </li>
                `;
            });
        }

        // Accordion Header
        sub_initiatiesrow += `
        <div class="accordion-item">
          <div class="accordion-header bg-primary" style="--stratroom-bg-opacity:0.02">
            <div class="d-flex justify-content-between p-2 gap-1">
              <button class="btn p-0 btn-title justify-content-start" data-bs-toggle="collapse" 
                      data-bs-target="#${collapseId}" aria-expanded="false" 
                      aria-controls="${collapseId}">
                <div class="row row-cols-1 g-2">
                  <p class="col mb-0">${item.riskPlanValue.name}</p>
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
            <div class="p-2 d-flex flex-row gap-1 w-100">
              <div class="d-flex flex-column flex-fill">
                <div class="d-flex flex-row align-items-center gap-2">
                  <div class="view_paln_chart_green_${item.id} view_plan_chart_pie_${item.id}"></div>
                  <span class="pie-progress">${item.riskPlanValue.progress}</span>
                </div>
              </div>
              <div class="d-flex flex-column justify-content-center text-center flex-fill">
                <span class="text-muted">${item.riskPlanValue.action}</span>
              </div>
              <div class="d-flex flex-column justify-content-end text-end flex-fill">
                <span class="text-muted">${item.riskPlanValue.resolveDate}</span>
              </div>
            </div>
          </div>

          <div id="${collapseId}" class="accordion-collapse collapse show" 
               data-bs-parent="#accordionPlanView">
            <div class="accordion-body p-0">
        `;

        // Sub-items (Activities)
        if (item.riskActivitiesDTOList && item.riskActivitiesDTOList.length > 0) {
            $.each(item.riskActivitiesDTOList, function (index1, item1) {
                sub_initiatiesrow += `
                <div class="list-group-item border-bottom">
                  <div class="d-flex justify-content-between p-2 gap-1">
                    <div class="btn-title justify-content-start">
                      <div class="row row-cols-1 g-2">
                        <p class="col mb-0">${item1.riskActivitiesValue.name}</p>
                      </div>
                    </div>
                    <div class="list-actions">
                      <div class="d-flex align-items-start">
                        <span class="badge status-bg-${item1.riskActivitiesValue.status.toLowerCase()} rounded-pill ms-auto" style="--stratroom-bg-opacity:1">
                          ${item1.riskActivitiesValue.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="p-2 d-flex flex-row gap-1 w-100">
                    <div class="d-flex flex-column flex-fill">
                      <div class="d-flex flex-row align-items-center gap-2">
                        <div class="view_activity_chart_green_${item1.id} view_activity_chart_pie_${item1.id}"></div>
                        <span class="pie-progress">${item1.riskActivitiesValue.progress}</span>
                      </div>
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <span class="text-muted">${item1.riskActivitiesValue.resoleveby}</span>
                    </div>
                  </div>
                </div>
                `;
            });
        }

        sub_initiatiesrow += `
            </div>
          </div>
        </div>
        `;

        riskcollapse++;
    });

    sub_initiatiesrow += '</div>';

    // Render to page
    $("#plan-row-box_view").html(sub_initiatiesrow);

    	$('.plan_view_immage').initial({
		charCount: 2,
		height: 30,
		width: 30,
		fontSize: 18
	});
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
	// Ensure usersimg is defined and is an array
	if (!Array.isArray(usersimg)) {
	  console.error("Invalid input: usersimg is not an array", usersimg);
	  usersimg = [];
	}
  
	var subinitiativeUser = "";
	var profileBadgeIncrement = (usersimg.length >= 3 ? usersimg.length - 2 : 0);
	var functionParams = resultId + ',' + '"edit"';
	var functionName = "";
	var modalPopupName = "";
  
	if (type === "riskplan") {
	  functionName = "handleplanuserevent";
	  modalPopupName = ".riskplan_add_user_popup";
	} else if (type === "riskreview") {
	  functionName = "handlemonitoringuserevent";
	  modalPopupName = ".monitoring_add_user_popup";
	} else if (type === "risktreatment") {
	  functionName = "handletreatmentuserevent";
	  modalPopupName = ".risk_treatment_add_popup";
	}
  
	if (usersimg.length !== 0) {
	  $.each(usersimg, function (index, users) {
		var username = users.name || "User";
		var userProfileConcate =
		  users.image
			? ` class="rounded-circle sub_init_img" src="${users.image}"`
			: ` class="rounded-circle sub_init_img planuser" data-name="${username}"`;
  
		if (usersimg.length === 1) {
		  subinitiativeUser += `<li class="avatar avatar-sm selecteduser">
			<img data-toggle="modal" data-target="${modalPopupName}" onclick=${functionName}(${functionParams}) ${userProfileConcate} alt="${username}" width="50">
		  </li>`;
		  return false;
		}
  
		subinitiativeUser += `<li class="avatar avatar-sm selecteduser">
		  <img ${userProfileConcate} alt="${username}" width="50">
		</li>`;
  
		if (usersimg.length === 2 && index > 0) {
		  subinitiativeUser = subinitiativeUser.replace(
			`<li class="avatar avatar-sm selecteduser"><img ${userProfileConcate} alt="${username}" width="50"></li>`,
			""
		  );
		  subinitiativeUser += `<li class="avatar avatar-sm selecteduser">
			<img data-toggle="modal" data-target="${modalPopupName}" onclick=${functionName}(${functionParams}) ${userProfileConcate} alt="${username}" width="50">
		  </li>`;
		  return false;
		}
  
		if (usersimg.length >= 3 && index >= 2) {
		  subinitiativeUser = subinitiativeUser.replace(
			`<li class="avatar avatar-sm selecteduser"><img ${userProfileConcate} alt="${username}" width="50"></li>`,
			""
		  );
		  subinitiativeUser += `<li class="avatar avatar-sm selecteduser">
			<span data-toggle="modal" data-target="${modalPopupName}" onclick=${functionName}(${functionParams}) class="badge">+${profileBadgeIncrement}</span>
		  </li>`;
		  return false;
		}
	  });
	} else {
	  var users = defaultreporteelist || {};
	  var username = users.name || "User";
	  var userProfileConcate =
		users.image
		  ? ` class="rounded-circle sub_init_img" src="${users.image}"`
		  : ` class="rounded-circle sub_init_img planuser" data-name="${username}"`;
  
	  subinitiativeUser = `<li class="avatar avatar-sm selecteduser">
		<img data-toggle="modal" data-target="${modalPopupName}" onclick=${functionName}(${functionParams}) ${userProfileConcate} alt="${username}" width="50">
	  </li>`;
	}
  
	return subinitiativeUser;
  }
  
// function treatmentviewdetails(id) {
// 	var element = $("#treatment_view");
// 	$("#viewtreatmentheader").text($("#treatmentheader").text());
// 	$('.treatment_view_popup').modal('toggle');
// 	$(element).html('');
// 	$(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
// 	$.ajax({
// 		url: "/stratroom/riskMonitoringList/" + id,
// 		success: monitoringrecordsviewSuccessCallback,
// 		error: function (msg, status) {
// 			if (!jQuery.isEmptyObject(msg.responseText)) {
// 				var errorparse = JSON.parse(msg.responseText);
// 				if (errorparse.status == "404") {
// 					$(element).html('');
// 					$(element).html(errorparse.error);
// 				} else {
// 					$(element).html('');
// 					$(element).html(errorparse.error);
// 				}
// 			}
// 		}
// 	});
// }

// monitoring view
// monitoring view
function monitoringviewdetails(id) {
	var element = $("#milestone_view");
	$("#viewmilestoneheader").text($("#monitoringHeader").text());
	$('.monitoring_view_popup').modal('toggle');
	$(element).html('');
	$(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
	$.ajax({
		url: "/stratroom/riskMonitoringList/" + id,
		success: monitoringrecordsviewSuccessCallback,
		error: function (msg, status) {
			console.log(msg,"review mon")
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
function monitoringrecordsviewSuccessCallback(result) {
	var defaultreporteelist = {
		"id": riskupdateDescription.createdBy,
		"name": riskupdateDescription.riskValue.createdByName,
		"image": riskupdateDescription.riskValue.riskImage
	};
	var sub_initiatiesrow = "";
	var subinitiativeProgressBar = "";
	var sub_initiatiesrow = '<div class="panel-group risk-panel-group" id="risk_accordion_10" role="tablist" aria-multiselectable="true">';
	var riskcollapse = 10;
	var chartcontent21 = [];
	var chartcontent22 = [];
	$
		.each(
			result,
			function (index, item) {
				var chartvalue = parseInt(100)
					- parseInt(item.riskMonitoringValue.progress);
				var chartbalance = item.riskMonitoringValue.progress;

				if (chartvalue == 0) {
					chartbalance = 100;
				}
				var status = (item.riskMonitoringValue.status != undefined ? item.riskMonitoringValue.status
					: "Open");
				var resultPorfileContent = subinitiatiesPorfileFormationrisk(
					item.ownerList, defaultreporteelist,
					'subinitiatives');
				// Inside your $.each(result, function(index, item) { ... })
sub_initiatiesrow += `
<div class="list-group list-group-custom">
  <div class="list-group-item flex-column p-0">
    <div class="d-flex justify-content-between p-2 gap-1">
      <div class="btn-title text-start justify-content-start" data-bs-toggle="collapse" data-bs-target="#risk_collapse_${riskcollapse}" aria-expanded="false">
        <div class="row row-cols-1 g-2">
          <p class="col mb-0">
            ${item.riskMonitoringValue.mitigation}
          </p>
        </div>
      </div>
      <div class="list-actions">
        <div class="d-flex align-items-start">
          <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
            ${resultPorfileContent}
          </ul>
        </div>
      </div>
    </div>
    <div class="p-2 d-flex flex-row gap-1 w-100">
      <div class="d-flex flex-column flex-fill">
        <div class="d-flex flex-row align-items-center gap-2">
          <div class="view_paln_chart_green_${item.id} view_plan_chart_pie_${item.id}"></div>
          <span class="pie-progress">${item.riskMonitoringValue.progress}</span>
        </div>
      </div>
      <div class="d-flex flex-column justify-content-center text-center flex-fill">
        <span class="text-muted">${status}</span>
      </div>
      <div class="d-flex flex-column justify-content-end text-end flex-fill">
        <span class="text-muted">${item.riskMonitoringValue.changestime}</span>
      </div>
    </div>
  </div>
</div>
`;

				chartcontent21.push({
					"index": item.id,
					"chartbalance": chartbalance,
					"chartvalue": chartvalue
				});
				$
					.each(
						item.riskReviewList,
						function (index, item1) {

							var activitychartvalue = 100 - parseInt(item1.riskMonitoringValue.progress);
				var activitychartbalance = item1.riskMonitoringValue.progress;
	
				if (activitychartvalue == 0) {
					activitychartbalance = 100;
				}
	
				chartcontent22.push({ "index": item1.id, "chartbalance": activitychartbalance, "chartvalue": activitychartvalue });
							var status = (item1.riskActivitiesValue.status != undefined ? item1.riskActivitiesValue.status
								: "");
							sub_initiatiesrow += '<div id="risk_collapseOne_'
								+ riskcollapse
								+ '" class="panel-collapse in collapse show" role="tabpanel" aria-labelledby="risk_headingOne_10" style="">';
							sub_initiatiesrow += `'<div class="d-flex flex-row employe_content_border sub_initiative_details" style="margin: 11px 4px;padding: 5px;"><div class="d-flex flex-column flex-fill profile_content"><div class="d-flex flex-row"><div class="d-flex flex-column init_flex_profile"><p style="width:85%;"><pre style="white-space: pre-wrap;font-family:'Poppins',sans-serif;">'`
								+ item1.riskActivitiesValue.name
								+ '</pre></p></div><div class="d-flex flex-column"><div><strong>'
								+ status
								+ '</strong></div></div></div><div class="d-flex flex-row"><div class="d-flex flex-column flex-fill"></div><div class="d-flex flex-column"><div>'
								+ item1.riskActivitiesValue.resoleveby
								+ '</div></div></div></div></div></div>';
						});
				sub_initiatiesrow += '</div>';
				riskcollapse++;
			});
	sub_initiatiesrow += '</div>';
	$("#milestone_view").html('');
	$("#milestone_view").html(sub_initiatiesrow);
	$('.plan_view_immage').initial({
		charCount: 2,
		height: 30,
		width: 30,
		fontSize: 18
	});
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
}
function attachmentviewdetails(id) {
	var element = $("#attachment_view");
	$("#viewattachmetheader").text($("#attachmentHeader").text());
	$('.attachment_view_popup').modal('toggle');
	$(element).html('');
	$(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
	$.ajax({
		url: "/stratroom/riskAttach/" + id,
		success: attachmentrecordsviewSuccessCallback,
		error: function (msg, status) {
			console.log(msg,"review mon")
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
function attachmentrecordsviewSuccessCallback(result) {
	
	var sub_initiatiesrow = "";
	var subinitiativeProgressBar = "";
	var sub_initiatiesrow = '<div class="panel-group risk-panel-group" id="risk_accordion_10" role="tablist" aria-multiselectable="true">';
	var riskcollapse = 10;
	var chartcontent21 = [];
	var chartcontent22 = [];
	$
		.each(
			result,
			function (index, item) {
				sub_initiatiesrow += '<div class="panel risk-panel panel-col_border"><div class="panel-heading risk-panel-heading" role="tab" id="risk_headingOne_10"><div class="panel-title_risk">';
				sub_initiatiesrow += '<div class="d-flex flex-row employe_content_border sub_initiative_details" style="margin-bottom: 0px; width: 100%;"><div class="d-flex flex-column flex-fill profile_content" style="width:100%;"><div class="d-flex flex-row"><a role="button" data-toggle="collapse" data-parent="#risk_accordion_10" href="#risk_collapseOne_'
					+ riskcollapse
					+ `'" aria-expanded="false" aria-controls="risk_collapseOne_10" class="collapsed" style="padding: 0px 0px !important;"><div class="d-flex flex-column init_flex_profile" style="color: #1e252d;"><p style="width:95%;"><pre style="white-space: pre-wrap;font-family:'Poppins',sans-serif;" >'`
					+ item.riskMonitoringValue.mitigation
					+ '</pre></p></div></a>';
				sub_initiatiesrow += '</div></div></div></div>';
				
				sub_initiatiesrow += '</div>';
				riskcollapse++;
			});
	sub_initiatiesrow += '</div>';
	$("#milestone_view").html('');
	$("#milestone_view").html(sub_initiatiesrow);
	$('.plan_view_immage').initial({
		charCount: 2,
		height: 30,
		width: 30,
		fontSize: 18
	});
}

function commentsviewdetails(id) {
	var element = $("#comments-row-box_view");
	$('.comments_view_popup').modal('toggle');
	$("#commentsviewheader").text($("#commentheader").text());
	$(element).html('');
	$(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
	$.ajax({
		url: "/stratroom/riskCommentsList/" + id,
		success: commentsrecordsviewSuccessCallback,
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

function commentsrecordsviewSuccessCallback(result) {

	var sub_initiatiesrow = "";
	var subinitiativeProgressBar = "";
	$
		.each(
			result,
			function (index, comment) {
console.log(comment,"comment");
				var timeformatted = new Date(comment.riskCommentsValue.formattedDateTime)
				//  timeformatted = formatofAmPm(timeformatted);
				/*	 
					var timeformatted =  new Date(comment.riskCommentsValue.formattedDateTime);
					if(timeformatted.toString().indexOf("Z") == -1){
						timeformatted	=	timeformatted+"Z";
					}
					//createdtime		=	new Date(createdtime).toISOString();
					var date=	dateFormatedtohumanread(timeformatted);
					var time=	new Date(timeformatted).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
					timeformatted = date +' '+time;
					*/
				var kpicomentsowner = {};
				/*
				 * $.each(reporteelist, function(ownkey, empvalue) { if
				 * (empvalue.id == comment.createdBy) { kpicomentsowner = {
				 * "id" : empvalue.id, "name" : empvalue.name, "image" :
				 * empvalue.image }; return false; } });
				 */

				var name = (comment.riskCommentsValue.createdByName == undefined
					|| comment.riskCommentsValue.createdByName == "" ? comment.riskCommentsValue.updatedByName
					: comment.riskCommentsValue.createdByName);
				var title = (comment.riskCommentsValue.title != undefined
					&& comment.riskCommentsValue.title != "" ? comment.riskCommentsValue.title
					: "");
				var getownershortName = name.slice(0, 2);
				var Owner = "data-name='" + getownershortName
					+ "' class='rounded-circle commentsviewimage'";

				if (comment.riskCommentsValue.commentsImage != undefined
					&& comment.riskCommentsValue.commentsImage != '') {

					var username = ((kpicomentsowner.name == undefined || kpicomentsowner.name == "") ? "User"
						: kpicomentsowner.name);
					Owner = ((comment.riskCommentsValue.commentsImage == undefined || comment.riskCommentsValue.commentsImage == "") ? "data-name='"
						+ kpicomentsowner.name
						+ "' class='rounded-circle commentsviewimage'"
						: " class='rounded-circle' src='"
						+ comment.riskCommentsValue.commentsImage + "'");
				}

				var currentuserlike = (comment.likeEmpIds != undefined && comment.likeEmpIds != null ? comment.likeEmpIds : []);
				var likeText = "Like";
				var likeTextclass = "";
				if (currentuserlike.length > 0 && $.inArray(Number(($("#userPrincipal").val() || "").trim()), currentuserlike) !== -1) {
					likeText = "Unlike";
					likeTextclass = "green";
				}
				var reply=comment.replyList;
				console.log(reply,"replyy")
			
				var count = (comment.likeCount != undefined && comment.likeCount != null ? comment.likeCount : 0);
				var desc = comment.riskCommentsValue.desc;

				sub_initiatiesrow += '<li><div class="d-flex flex-row"><div class="flex-column comment_image"><img '
					+ Owner
					+ ' alt="User" width="40"></div><div class="flex-column comment_details"><ul><li><span class="message-data-name"><strong>'
					+ name
					+ ', ' + title + ' </strong></span></li><li class="commentsdesc">'
					+ desc
					+ '</li><li class="replycommentsdesc">'
					+ desc
					+ '</li><li><ul class="d-flex flex-row"><li>Reply</li><li class="' + likeTextclass + '">' + likeText + '</li><li class="parentcounter"><span class="badge badge-dark counter">' + count + '</span></li><li>'
					+ timeformatted
					+ '</li></ul></li></ul></div></div></li>'
					'<li><div class="d-flex flex-row"><div class="flex-column comment_image"><img '
					+ Owner
					+ ' alt="User" width="40"></div><div class="flex-column comment_details"><ul><li><span class="message-data-name"><strong>'
					+ name
					+ ', ' + title + ' </strong></span></li><li class="replycommentsdesc">'
					+ desc
					+ '</li><li><ul class="d-flex flex-row"><li>Reply</li><li class="' + likeTextclass + '">' + likeText + '</li><li class="parentcounter"><span class="badge badge-dark counter">' + count + '</span></li><li>'
					+ timeformatted
					+ '</li></ul></li></ul></div></div></li>';
				
			});
	$("#comments-row-box_view").html('');
	$("#comments-row-box_view").html(sub_initiatiesrow);
	$('.commentsviewimage').initial({
		charCount: 2,
		height: 30,
		width: 30,
		fontSize: 18
	});
}

$(document).on("click", ".commentReply", function () {
	$("#riskCommentsBlock").toggle();
	$("#riskCommentsReplyBLock").toggle();
	
});


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
function riskSuccessCallback(data) {

console.log(data,"risk sidebar");
	var initiativetemplate = $('#risk-template').html();
	var draftinitiativetemplate = $('#subrisk-template').html();
	// Mustache.parse(initiativetemplate); // optional, speeds up future uses
	var initiative_load_id = "";
	var template = Handlebars.compile(initiativetemplate);
	var drafttemplate = Handlebars.compile(draftinitiativetemplate);
	if (riskcontentload == true) {

	


		$.each(data, function (index, initiative) {

			console.log(initiative,"initiative");

			var bodyRows = '';
			if (index == 0) {
				riskupdateDescription = initiative;
				initiative_load_id = initiative.id;
				parentriskID = initiative.id;
				var getinitiativePagenumber = localStorage.getItem("risk_pagenumber");
				var reload = localStorage.getItem("reload")
				if (getinitiativePagenumber != undefined && getinitiativePagenumber != '' && getinitiativePagenumber != null) {
					
					if(reload == "1")
					{
						initiative_load_id = getinitiativePagenumber;
					}

				}
				if(urlriskid != null && urlriskid != undefined && urlriskid != "")
					{
						initiative_load_id = urlriskid
					}

				localStorage.setItem("reload", "0");
				localStorage.removeItem("riskcountdate")
				localStorage.removeItem("riskcountId")


				$.ajax({ 
					url: "/stratroom/risk/" + initiative_load_id + "?loadFlag=true&riskType=draft",
					success: function (data) {
						$('#risk_top_details').empty();
						$('#causeconsequencebody').empty();
						$('#riskreducingimpactbody').empty();
						$('#riskreviewmonitoringbody').empty();
						$('#riskattachmentbody').empty();
						$('#riskcomments').empty();
						
						console.log(data, "risk full data");
						localStorage.setItem("risk_pagenumber", initiative_load_id);
						console.log(data.riskValue.changeId); 
						if (data && data.riskValue && data.riskValue.changeId) {
							$('#causechangeriskId').val(data.riskValue.changeId);
						}
						console.log($('#causechangeriskId')); 
						riskdescSuccessCallback(data, initiative_load_id);
					},
					error: function (xhr, status, error) {
						console.error("Error fetching risk data:", error);
					}
				});
				
			}


			var duedate = initiative.riskValue.dateCompleted;

			var initiativeProgressBar = "";
			var findprogressvalue = (initiative.riskValue.likeliHood != undefined && initiative.riskValue.likeliHood != "" ? initiative.riskValue.likeliHood : "");

			if (initiative.riskValue.impact == 'Insignificant' && initiative.riskValue.likeliHood == 'Rare') {
				initiativeProgressBar = "initiative_side_border_verygood";
			} else if (initiative.riskValue.impact == 'Minor' && initiative.riskValue.likeliHood == 'Rare') {
				initiativeProgressBar = "initiative_side_border_verygood";
			} else if (initiative.riskValue.impact == 'Moderate' && initiative.riskValue.likeliHood == 'Rare') {
				initiativeProgressBar = "initiative_side_border_good";
			} else if (initiative.riskValue.impact == 'Major' && initiative.riskValue.likeliHood == 'Rare') {
				initiativeProgressBar = "initiative_side_border_good";
			} else if (initiative.riskValue.impact == 'Catastrophic' && initiative.riskValue.likeliHood == 'Rare') {
				initiativeProgressBar = "initiative_side_border_medium";
			} else if (initiative.riskValue.impact == 'Insignificant' && initiative.riskValue.likeliHood == 'Unlikely') {
				initiativeProgressBar = "initiative_side_border_verygood";
			} else if (initiative.riskValue.impact == 'Minor' && initiative.riskValue.likeliHood == 'Unlikely') {
				initiativeProgressBar = "initiative_side_border_good";
			} else if (initiative.riskValue.impact == 'Moderate' && initiative.riskValue.likeliHood == 'Unlikely') {
				initiativeProgressBar = "initiative_side_border_good";
			} else if (initiative.riskValue.impact == 'Major' && initiative.riskValue.likeliHood == 'Unlikely') {
				initiativeProgressBar = "initiative_side_border_medium";
			} else if (initiative.riskValue.impact == 'Catastrophic' && initiative.riskValue.likeliHood == 'Unlikely') {
				initiativeProgressBar = "initiative_side_border_bad";
			} else if (initiative.riskValue.impact == 'Insignificant' && initiative.riskValue.likeliHood == 'Possible') {
				initiativeProgressBar = "initiative_side_border_bad";
			} else if (initiative.riskValue.impact == 'Minor' && initiative.riskValue.likeliHood == 'Possible') {
				initiativeProgressBar = "initiative_side_border_medium";
			} else if (initiative.riskValue.impact == 'Moderate' && initiative.riskValue.likeliHood == 'Possible') {
				initiativeProgressBar = "initiative_side_border_medium";
			} else if (initiative.riskValue.impact == 'Major' && initiative.riskValue.likeliHood == 'Possible') {
				initiativeProgressBar = "initiative_side_border_bad";
			} else if (initiative.riskValue.impact == 'Catastrophic' && initiative.riskValue.likeliHood == 'Possible') {
				initiativeProgressBar = "initiative_side_border_critical";
			} else if (initiative.riskValue.impact == 'Insignificant' && initiative.riskValue.likeliHood == 'Likely') {
				initiativeProgressBar = "initiative_side_border_medium";
			} else if (initiative.riskValue.impact == 'Minor' && initiative.riskValue.likeliHood == 'Likely') {
				initiativeProgressBar = "initiative_side_border_medium";
			} else if (initiative.riskValue.impact == 'Moderate' && initiative.riskValue.likeliHood == 'Likely') {
				initiativeProgressBar = "initiative_side_border_bad";
			} else if (initiative.riskValue.impact == 'Major' && initiative.riskValue.likeliHood == 'Likely') {
				initiativeProgressBar = "initiative_side_border_critical";
			} else if (initiative.riskValue.impact == 'Catastrophic' && initiative.riskValue.likeliHood == 'Likely') {
				initiativeProgressBar = "initiative_side_border_critical";
			} else if (initiative.riskValue.impact == 'Insignificant' && initiative.riskValue.likeliHood == 'Almost Certain') {
				initiativeProgressBar = "initiative_side_border_medium";
			} else if (initiative.riskValue.impact == 'Minor' && initiative.riskValue.likeliHood == 'Almost Certain') {
				initiativeProgressBar = "initiative_side_border_bad";
			} else if (initiative.riskValue.impact == 'Moderate' && initiative.riskValue.likeliHood == 'Almost Certain') {
				initiativeProgressBar = "initiative_side_border_bad";
			} else if (initiative.riskValue.impact == 'Major' && initiative.riskValue.likeliHood == 'Almost Certain') {
				initiativeProgressBar = "initiative_side_border_critical";
			} else if (initiative.riskValue.impact == 'Catastrophic' && initiative.riskValue.likeliHood == 'Almost Certain') {
				initiativeProgressBar = "initiative_side_border_critical";
			}

			/*
			 * if(findprogressvalue == 'Rare') { initiativeProgressBar =
			 * "initiative_side_border_green"; } else if (findprogressvalue ==
			 * 'Unlikely') { initiativeProgressBar =
			 * "initiative_side_border_yellow"; } else if (findprogressvalue ==
			 * 'Possible' || findprogressvalue == 'Likely' || findprogressvalue ==
			 * 'Almost Certain') { initiativeProgressBar =
			 * "initiative_side_border_orange"; }else{ initiativeProgressBar =
			 * "initiative_side_border_default"; }
			 */

			var riskimage = initiative.riskValue.riskImage;
			var username = initiative.riskValue.createdByName.slice(0, 2);
			if (riskimage == "" || riskimage == " " || riskimage == null || riskimage == undefined) {
				var Owner = "data-name='" + username + "' class='rounded-circle riskuser'";
			} else {
				var Owner = " class='rounded-circle' src='" + riskimage + "' ";
			}

			var name = initiative.riskValue.name;
			var full_name = name;
			if (typeof (full_name) == "string" && full_name.length >= 50) {
				name = name.substring(0, 50) + '...';
			}

			if (initiative.draft === "Draft") {
				var draftfinalHtml = {
					intiative_content: name,
					Owner: Owner,
					id: initiative.id,
					impactId: initiative.impactId,
					dueDate: duedate,
					riskStatus: initiative.riskValue.riskStatus,
					riskCategory: initiative.riskValue.riskcategory,
					initiativeProgressBar: initiativeProgressBar,
					initiativeSidebarHighLight: (initiative_load_id == initiative.id ? "riskSidebarHighLight" : "")
				};
				$('#draftrisk_sidebar').append(drafttemplate(draftfinalHtml));
			} else {
				var finalHtml = {
					intiative_content: name,
					Owner: Owner,
					id: initiative.id,
					impactId: initiative.impactId,
					dueDate: duedate,
					riskStatus: initiative.riskValue.riskStatus,
					riskCategory: initiative.riskValue.riskcategory,
					initiativeProgressBar: initiativeProgressBar,
					initiativeSidebarHighLight: (initiative_load_id == initiative.id ? "riskSidebarHighLight" : "")
				};
				$('#risk_sidebar').append(template(finalHtml));
			}
		});

		$('.riskuser').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
	}
}

$(document).ready(function() {
  // When Draft tab is clicked
  $('#RiskListDraft-tab').click(function() {
    $('#RiskListDraft-tab-pane').addClass('show active');
    $('#RiskListApproved-tab-pane').removeClass('show active');
    $('#draftrisk_sidebar').show();
    $('#risk_sidebar').hide();
  });

  // When Approved tab is clicked
  $('#RiskListApproved-tab').click(function() {
    $('#RiskListApproved-tab-pane').addClass('show active');
    $('#RiskListDraft-tab-pane').removeClass('show active');
    $('#risk_sidebar').show();
    $('#draftrisk_sidebar').hide();
  });

  // Initialize with Draft tab active
  $('#draftrisk_sidebar').show();
  $('#risk_sidebar').hide();
});

function generateCommentOptions(comment, riskeditpermission, riskdeletepermission) {
    let options = '';
    const commentDesc = comment.riskCommentsValue.desc || "";
    const escapedDesc = escapeHtml(commentDesc);
    
    if (riskeditpermission) {
        options += `
            <span class="edit-btn" 
                  id="edit-btn-${comment.id}"
                  data-id="${comment.id}" 
                  data-riskid="${comment.riskId}"
                  data-desc="${escapedDesc}"
                  onclick="toggleEdit('${comment.id}', '${comment.riskId}', \`${escapedDesc}\`)">
              Edit
            </span>`;
    }
    if (riskeditpermission && riskdeletepermission) {
        options += ' · ';
    }
    if (riskdeletepermission) {
        options += `
            <span class="delete-btn" data-id="${comment.id}" onclick="deleteRiskComments(${comment.id})">
              Delete
            </span>`;
    }
    return options;
}

function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;', '`': '&#96;' };
    return String(text || "").replace(/[&<>"'`]/g, m => map[m]);
}

function toggleEdit(id, riskId, originalDesc) {
    const btn = $(`#edit-btn-${id}`);
    const commentTextEl = $(`#comment-text-${id}`);
    const isEditing = btn.text().trim() === "Save";
    
    if (!isEditing) {
        // ➤ ENTER EDIT MODE
        const currentText = commentTextEl.text().trim();
        commentTextEl.data('original', currentText); // store for potential revert
        
        // Replace text with textarea
        commentTextEl.html(`
            <textarea class="form-control edit-comment-area" 
                      id="edit-area-${id}" 
                      style="min-height:60px; resize:vertical;">${currentText}</textarea>
        `);
        
        // Change button to Save
        btn.text("Save").addClass("saving-mode");
        
        // Focus textarea
        setTimeout(() => $(`#edit-area-${id}`).focus().select(), 100);
        
    } else {
        // ➤ SAVE CHANGES
        const newDesc = $(`#edit-area-${id}`).val().trim();
        
        if (!newDesc) {
            $.notify("Error: Comment cannot be empty", { style: 'error', className: 'graynotify' });
            return;
        }
        
        // AJAX Save
        saveCommentAjax(id, riskId, newDesc, function(success) {
            if (success) {
                // Update UI with new content
                commentTextEl.html(escapeHtml(newDesc));
                commentTextEl.data('original', newDesc);
                btn.text("Edit").removeClass("saving-mode");
                $.notify("Comment updated", { style: 'success' });
            } else {
                // Revert on error
                commentTextEl.html(escapeHtml(commentTextEl.data('original')));
                btn.text("Edit").removeClass("saving-mode");
                $.notify("Save failed. Try again.", { style: 'error' });
            }
        });
    }
}
function saveCommentAjax(id, riskId, desc, callback) {
    const commentsObj = {
        "riskId": riskId,
        "id": id,
        "riskCommentsValue": { "desc": desc }
    };
    
    $.ajax({
        url: "/stratroom/riskComments/",
        type: 'PUT',
        contentType: "application/json",
        data: JSON.stringify(commentsObj),
        success: function(data) {
            callback(true);
        },
        error: function(xhr) {
            console.error("Save error:", xhr);
            callback(false);
        }
    });
}


let riskPdfData = [];

function riskdescSuccessCallback(result, initiative_load_id) {

	console.log(result,"result");
	var initiativedettemplate = $('#riskdetail-template').html();

	var template = Handlebars.compile(initiativedettemplate);

 riskPdfData = [mapRiskData(result)];
	detailrisk = result;

	$("#causeChangeIddraft").val(result.changeId);
	$("#activitieschangeiddraft").val(result.changeId);
	$("#riskPlanchangeiddraft").val(result.changeId);
	$("#planchangeIddraft").val(result.changeId);
	$("#riskMonitorChangeIddraft").val(result.changeId);
	$("#riskTreatmentChangeIddraft").val(result.changeId);
	$("#conqChangeIddraft").val(result.changeId);
	$("#apichangeIddraft").val(result.changeId);

	$("#selectcauseId").val(result.id);
	$("#activitiesriskId").val(result.id);
	$("#riskPlanriskId").val(result.id);
	$("#planriskId").val(result.id);
	$("#monitoringriskId").val(result.id);
	$("#riskTreatmentriskId").val(result.id);
	$("#conqriskId").val(result.id);
	$("#apichangeIddraft").val(result.id);
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
	const typeout ='draft';

	var editicon = "";
	if (riskeditpermission == true) {
		editicon = `<span data-bs-toggle="modal"
                    class="btn btn-sm btn-icon"
                    onclick="handleRiskDetailEvent(${id}, 'edit', '${typeout}')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="pencil" style="width: 14px; height: 14px;" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg></span>`;

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
    "name": "attachment",
    value: "Attachments"
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
    viewiconpreference = `
    <div class="dropdown title_edit_icon">
        <span class="btn btn-sm btn-icon" data-bs-toggle="dropdown" aria-expanded="false" title="View">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="eye" style="width: 14px; height: 14px;" class="lucide lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </span>

        <ul class="dropdown-menu dropdown-menu-end kpidropdown-hide multi-column" 
            style="min-width: 200px; padding-top: 12px; padding-bottom: 4px;">

            <div class="row">
                <div class="col-sm-12">
                    <ul class="multi-column-dropdown "  id="riskiconview">
                        ${riskdesignlabel}
                    </ul>
                </div>
            </div>

        </ul>
    </div>
    `;
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

// Add this event handler to make checkboxes work
$(document).off('change', '.form-check-input').on('change', '.form-check-input', function() {
    var checkboxName = $(this).attr('name');
    var isChecked = $(this).is(':checked');
    
    // Update the preference object
    riskempPreference["preferences"][checkboxName] = isChecked;
    
    // Show/hide the corresponding section
    if (isChecked) {
        $("." + checkboxName).show();
    } else {
        $("." + checkboxName).hide();
    }
    
    // Optional: Save preferences to server
    // saveRiskPreferences(riskempPreference);
});

	var deletetopicon = "";
	if (riskdeletepermission == true) {
		deletetopicon = ` <li>
                                <a class="dropdown-item" href="#" onclick="deleteRiskDetail({{ogId}})">Delete</a>
                              </li>
							  <ul class="header-dropdown">
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
var ogId =  result.id;
	var idval = result.id;
	var version = result.version;
	if (result.riskUniqueId && result.riskUniqueId != "") {
		idval = result.riskUniqueId;
	}

	var inherentscore = controlpanelRiskSettings.inherentscorecause ? (result.inherentRiskCauseScore ? result.inherentRiskCauseScore : "") : result.inherentRiskConsequenceScore ? result.inherentRiskConsequenceScore : "";

	var residualscore = controlpanelRiskSettings.residualscoreimpact ? (result.residualRiskImpactScore ? result.residualRiskImpactScore : "") : result.residualRiskPossibiltyScore ? result.residualRiskPossibiltyScore : "";
var impactDesc = [];

if (
  Array.isArray(result?.riskValue?.businessimpact) &&
  result.riskValue.businessimpact.length > 0
) {
  impactDesc = result.riskValue.businessimpact.map(function (item) {
    return item.name.trim();
  });
}


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
  ogId:ogId,
  version: version,
  landingimagecolor: initiativeProgressBar,
		editicon: editicon,
		viewiconpreference: viewiconpreference,
		deletetopicon: deletetopicon,
		status: result.riskValue.status,

  dept: result.riskValue.department,
  riskcategory: result.riskValue.riskcategory,
  relatedparties: result.riskValue.relatedparties,
  impact: result.riskValue.impact,
  score: result.riskValue.score,
  likeliHood: result.riskValue.likeliHood,
  riskStatus: result.riskValue.riskStatus,

  // 🔥 HERE IS THE FIX
  impactDesc: impactDesc,

  financialImpact: result.riskValue.financialImpact,
  ch_dateRaised: result.riskValue.dateRaised,
  ch_nextAssessment: result.riskValue.nextAssessment,
  ch_dateCompleted: result.riskValue.dateCompleted,

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
	riskChart(result, 'riskload');
	// cause and consequence list
	const storedLanguage = localStorage.getItem("selectedLang") || "en"
	var causeconsequenceHeader = "Cause and Consequence";
	var viewHeader = "View"
	var deleteHeader = "Delete"

	if (storedLanguage == "ar") {
		causeconsequenceHeader = "السبب والنتيجة";
		viewHeader = "عرض";
		deleteHeader = "حذف";
	} else if (storedLanguage == "am") {
		causeconsequenceHeader = "መንስኤ እና ውጤት";
		viewHeader = "እይታ";
		deleteHeader = "ሰርዝ";
	} else {
		causeconsequenceHeader = "Cause and Consequence";
		viewHeader = "View";
		deleteHeader = "Delete";
	}


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
		const finalId = result.id === 0 ? result.changeId : result.id;
		const changeId = result.changeId !== 0 ? result.changeId : 0;
		const type ='draft';
		createcauseIcon = `<button type="button" class="btn btn-sm btn-icon create_initives add-sub-initiative" data-bs-toggle="modal" data-bs-target=".cause_conq_popup">
                            <span class="sub_initiative" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add" onclick="handleRiskCauseEvent(0,'${finalId}',${changeId},'${type}','add',${result.changeId})">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="plus" style="width: 14px; height: 14px;" class="lucide lucide-plus"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                            </span>
                          </button>`;
	}

	var causepermissionOptions = "";
	if (causeviewpermission == false || conviewpermission == false) {
		causepermissionOptions = "";
	} else {
		causepermissionOptions = ` <div class="dropdown">
                            <button class="btn btn-sm btn-icon" style="width:24px;" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="more-vertical" style="width: 14px; height: 14px;" class="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                            
                          `;

		if (causeviewpermission == true || conviewpermission == true) {
			causepermissionOptions += ` <li>
                                <a class="dropdown-item" href="#" data-bs-toggle="modal" data-toggle="modal" data-target=".cause_conq_view_popup" " onclick="causeconqviewdetails(`+ id + `)">`+viewHeader+`</a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal">`+deleteHeader+`</a>
                              </li>`;
		}

		causepermissionOptions += `  </ul>
                          </div>`;
	}

	var sub_initiatiesrow = '<div class="accordion" id="accordionCauseandConsequence">';
var riskcollapse = 1;

$.each(result.riskCauseAndConsequenceList, function (index, item) {
  var collapseId = "causeandConsequence-collapse-" + riskcollapse;
  var riskcolor = ""; // set this based on your logic
function getRiskClass(rating) {
    if (!rating) return "";
    switch (rating.trim().toLowerCase()) {
        case "very low":
            return "status-bg-sky-blue";
        case "tolerable":
            return "status-bg-cyan";
        case "low":
            return "status-bg-lime-green";
        case "extreme":
            return "status-bg-maroon";
		case "medium":
            return "status-bg-yellow";
		case "high":
            return "status-bg-orange";
		case "very high":
            return "status-bg-red";
        default:
            return "";
    }
}

  sub_initiatiesrow += `
    <div class="accordion-item">
      <div class="accordion-header bg-primary" style="--stratroom-bg-opacity:0.04">
        <div class="d-flex justify-content-between p-2 gap-1">
          <button class="btn p-0 btn-title justify-content-start" data-bs-toggle="collapse"
            data-bs-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}">
            <div class="row row-cols-1 g-2">
              <span class="col mb-0">${item.causeAndConsequenceValue.name}</span>
            </div>
          </button>
          <div class="list-actions">
            <div class="d-flex align-items-start">
              <span class="badge ${getRiskClass(item.causeAndConsequenceValue.riskRating)} rounded-pill ms-auto" style="--stratroom-bg-opacity:1">
              ${displayOptionText("rating", item.causeAndConsequenceValue.riskRating)}
            </span>
            </div>
            <div class="dropdown">
              <button class="btn btn-sm btn-outline-icon"  type="button" data-bs-toggle="dropdown">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="more-vertical" style="width: 14px; height: 14px;" class="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
              </button>
              <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;


  if (concreatepermission) {
	const finalId = item.id === 0 ? item.changeId : item.id;
					const type = 'draft';
					// $("#conqChangeId").val(finalId);
					$("#conqCauseId").val(finalId);
    sub_initiatiesrow += `<li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target=".sub_cause_conq_popup" onclick="handleRiskConqEvent(${finalId}, '0', '${type}', 'add')">Add</a></li>`;
  }
  if (causeeditpermission) {
	const finalId = item.id === 0 ? item.changeId : item.id;
					const changeId = item.changeId!== 0 ? item.changeId : 0;
					const type = 'draft';
    sub_initiatiesrow += `<li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target=".cause_conq_popup" onclick="handleRiskCauseEvent(${finalId}, ${result.id}, ${changeId}, '${type}', 'edit', ${result.changeId})">Edit</a></li>`;
  }
  if (causedeletepermission) {
    sub_initiatiesrow += `<li><a class="dropdown-item" href="#" onclick="deleteRiskCause(${item.id})">Delete</a></li>`;
  }

  sub_initiatiesrow += `
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div id="${collapseId}" class="accordion-collapse collapse show" data-bs-parent="#accordionCauseandConsequence">
        <div class="accordion-body gap-0 p-0">`;

  // Sub Consequences
  if (concontentload && item.consequenceList && item.consequenceList.length > 0) {
    $.each(item.consequenceList, function (i, item1) {
      const conqFinalId = item1.id === 0 ? item1.changeId : item1.id;
      sub_initiatiesrow += `
          <div class="list-group-item border-bottom">
            <div class="d-flex justify-content-between p-2 gap-1">
              <div class="btn-title justify-content-start">
                <div class="row row-cols-1 g-2">
                  <span class="col mb-0">${item1.consequenceValue.name}</span>
                </div>
              </div>
              <div class="list-actions">
                <div class="d-flex align-items-start">
                  <span class="badge ${getRiskClass(item1.consequenceValue.riskRating)} rounded-pill ms-auto">
                                        ${displayOptionText("category", item1.consequenceValue.riskRating)}
                                    </span>
                </div>
                <div class="dropdown">
                  <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="more-vertical" style="width: 14px; height: 14px;" class="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;

      if (coneditpermission) {
        sub_initiatiesrow += `<li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target=".sub_cause_conq_popup" onclick="handleRiskConqEvent(${conqFinalId}, ${item1.causeConqId}, '${type}', 'edit')">Edit</a></li>`;
      }
      if (condeletepermission) {
        sub_initiatiesrow += `<li><a class="dropdown-item" href="#" onclick="deleteRiskConsequence(${item1.id})">Delete</a></li>`;
      }

      sub_initiatiesrow += `
                  </ul>
                </div>
              </div>
            </div>
          </div>`;
    });
  }

  sub_initiatiesrow += `
        </div>
      </div>
    </div>`;

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
	if (storedLanguage == "ar") {
		riskplanHeader = "الضوابط";
	} else if (storedLanguage == "am") {
		riskplanHeader = "መቆጣጠሪያዎች";
	} else {
		riskplanHeader = "Controls";
	}


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
		const finalId = result.id === 0 ? result.changeId : result.id;
		const type = 'draft';
		const riskId=$("#selectcauseId").val();
		createriskIcon = `<button type="button" class="btn btn-sm btn-icon create_initives add-sub-initiative" data-bs-toggle="modal" data-bs-target=".plan_desc_add_popup">
                            <span class="sub_initiative" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add" onclick="handleRiskPlanEvent(${finalId},${riskId},${type},'add')">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="plus" style="width: 14px; height: 14px;" class="lucide lucide-plus"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                            </span>
                          </button>`;
	}

	var risktreatmentpermissionOptions = "";
	if (planviewpermission == false) {
		risktreatmentpermissionOptions = "";
	} else {
		risktreatmentpermissionOptions = ` <div class="dropdown">
                            <button class="btn btn-sm btn-icon" style="width:24px;" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="more-vertical" style="width: 14px; height: 14px;" class="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;

		if (planviewpermission == true) {
			risktreatmentpermissionOptions += `<li>
                                <a class="dropdown-item" href="#" data-bs-toggle="modal" data-toggle="modal" data-target=".sub_initative_view_popup" " id="risk_treat" onclick="planviewdetails(`+ id + `)">`+viewHeader+`</a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal">`+deleteHeader+`</a>
                              </li>`;
		}
		

		risktreatmentpermissionOptions += `</ul></div>`;
	}

	var defaultreporteelist = {
		"id": riskupdateDescription.createdBy,
		"name": riskupdateDescription.riskValue.createdByName,
		"image": riskupdateDescription.riskValue.riskImage
	};

	var subinitiativeProgressBar = "";
	var sub_initiatiesrow = '<div id="accordionReducingImpactPossibility" class="accordion accordion-flush-initiative accordion-custom accordion-collopse-content">';
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
		var owenrsvalue = item.riskPlanValue.multipleOwners ? item.riskPlanValue.multipleOwners : ($("#userPrincipal").val() || "").trim();
	
		var risktreatmentpermissionOptions = "";
		if (actioncreatepermission || planeditpermission || plandeletepermission) {
			risktreatmentpermissionOptions = `<div class="dropdown">
                            <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="more-vertical" style="width: 14px; height: 14px;" class="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                            `;
	
			if (actioncreatepermission) {
				const finalId = item.id === 0 ? item.changeId : item.id;
		const type ='draft';
				risktreatmentpermissionOptions += `<li>
                                          <a class="dropdown-item" href=".activity_desc_add_popup" data-bs-toggle="modal" onclick="handleRiskActivitiesEvent('0','${finalId}','${type}', 'add')">Add</a>
                                        </li>`;
			}
			if (planeditpermission) {
				const finalId = item.id === 0 ? item.changeId : item.id;
				const type = 'draft';
				$("#activitieschangeid").val(finalId);
				const riskId=$("#selectcauseId").val();
				risktreatmentpermissionOptions += `<li>
                                          <a class="dropdown-item" href=".plan_desc_add_popup" data-bs-toggle="modal"  onclick="handleRiskPlanEvent(${finalId},${riskId}, '${type}','edit')">Edit</a>
                                        </li>`;

			}
			if (plandeletepermission) {
				risktreatmentpermissionOptions += ` <li><a class="dropdown-item" onclick="deleteRiskPlan(${item.id})">Delete</a></li>`;
			}
	
			risktreatmentpermissionOptions += `</ul></div>`;
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
		
		sub_initiatiesrow += `<div class="accordion-item">
  <div class="accordion-header bg-primary" style="--stratroom-bg-opacity:0.02">
    <div class="d-flex justify-content-between p-2 gap-1">
      <div class="btn p-0 btn-title justify-content-start" data-bs-toggle="collapse" data-bs-target="#risk_collapse_${riskcollapse}"
        aria-expanded="false" aria-controls="risk_collapse_${riskcollapse}">
        <div class="row row-cols-1 g-2">
          <p class="col mb-0">${item.riskPlanValue.name}</p>
        </div>
      </div>

      <div class="list-actions">
        <div class="d-flex align-items-start">
          <ul class="list-unstyled d-flex align-items-center avatar-group mb-0" id="riskplans_user_${item.id}">
            ${resultPorfileContent}
          </ul>
        </div>

        ${risktreatmentpermissionOptions}
      </div>
    </div>

    <div class="p-2 d-flex flex-row gap-1 w-100">
      <div class="d-flex flex-column flex-fill">
        <div class="d-flex flex-row align-items-center gap-2">
          <div class="chart-pie view_plan_chart_pie_${item.id}" data-percent="${item.riskPlanValue.progress}"></div>
          <span class="pie-progress">${item.riskPlanValue.progress}%</span>
        </div>
      </div>
      <div class="d-flex flex-column justify-content-center text-center flex-fill">
        <span class="text-muted">${item.riskPlanValue.action}</span>
      </div>
      <div class="d-flex flex-column justify-content-end text-end flex-fill">
        <span class="text-muted">${resolveDate}</span>
      </div>
    </div>
  </div>

  <div id="risk_collapse_${riskcollapse}" class="accordion-collapse collapse" aria-labelledby="risk_heading_${riskcollapse}">`;

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
        subrisktreatmentpermissionOptions = `
        <div class="dropdown">
          <button class="btn btn-sm btn-outline-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="more-vertical" style="width: 14px; height: 14px;" class="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          </button>
          <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;
  
        if (actioneditpermission) {
          const finalId = item1.id === 0 ? item1.changeId : item1.id;
          const type ='draft';
          subrisktreatmentpermissionOptions += `
            <li><a class="dropdown-item" href="#" data-toggle="modal" data-target=".activity_desc_add_popup" onclick="handleRiskActivitiesEvent('${finalId}',${item.id},'${type}','edit')">Edit</a></li>`;
        }
        if (actiondeletepermission) {
          subrisktreatmentpermissionOptions += `
            <li><a class="dropdown-item" onclick="deleteRiskActivities(${item1.id})">Delete</a></li>`;
        }
  
        subrisktreatmentpermissionOptions += `</ul></div>`;
      }
  
      var reducingpossibilitydescription = "";
      if (controlpanelRiskSettings['reducingpossibility-select'] === "controltypes" && item.riskPlanValue && item.riskPlanValue.controlTypes) {
        reducingpossibilitydescription = displayOptionText("controltypes", item.riskPlanValue.controlTypes);
      } else if (controlpanelRiskSettings['reducingpossibility-select'] === "controleffectiveness" && item.riskPlanValue && item.riskPlanValue.controleffectiveness) {
        reducingpossibilitydescription = displayOptionText("controleffectiveness", item.riskPlanValue.controleffectiveness);
      }
  
      var resoleveby = item1.riskActivitiesValue.resoleveby ? dateFormatedtohumanread(item1.riskActivitiesValue.resoleveby) : "";
      var statusBadge = item1.riskActivitiesValue.status === "Completed" ? 
        "status-bg-green" : "status-bg-red";
      
      sub_initiatiesrow += `
      <div class="list-group-item border-bottom">
        <div class="d-flex justify-content-between p-2 gap-1">
          <div class="btn-title justify-content-start">
            <div class="row row-cols-1 g-2">
              <p class="col mb-0">${item1.riskActivitiesValue.name}</p>
            </div>
          </div>

          <div class="list-actions">
            <div class="d-flex align-items-start">
              <span class="badge ${statusBadge} rounded-pill ms-auto" style="--stratroom-bg-opacity:1">
                ${item1.riskActivitiesValue.status}
              </span>
            </div>
            ${subrisktreatmentpermissionOptions}
          </div>
        </div>

        <div class="p-2 d-flex flex-row gap-1 w-100">
          <div class="d-flex flex-column flex-fill">
            <div class="d-flex flex-row align-items-center gap-2">
              <div class="chart-pie view_activity_chart_pie_${item1.id}" data-percent="${item1.riskActivitiesValue.progress}"></div>
              <span class="pie-progress">${item1.riskActivitiesValue.progress}%</span>
            </div>
          </div>
          <div class="d-flex flex-column justify-content-center text-center flex-fill">
            <span class="text-muted">${reducingpossibilitydescription}</span>
          </div>
          <div class="d-flex flex-column justify-content-end text-end flex-fill">
            <span class="text-muted">${resoleveby}</span>
          </div>
        </div>
      </div>`;
    });
  }

  sub_initiatiesrow += `</div></div>`;
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
	if (storedLanguage == "ar") {
		risktreatmentvalueHeader = "معالجة المخاطر";
	} else if (storedLanguage == "am") {
		risktreatmentvalueHeader = "የአደጋ መከላከያ";
	} else {
		risktreatmentvalueHeader = "Risk Treatment";
	}
	if (result.riskValue.treatmentheader != undefined && result.riskValue.treatmentheader != '') {
		risktreatmentvalueHeader = result.riskValue.treatmentheader;
	}

	var risktreatmentvalinlineEditIcon = `<strong>` + risktreatmentvalueHeader + `</strong>`;
	if (planeditpermission == true) {
		risktreatmentvalinlineEditIcon = `<strong class="editableTxt1"
			onkeypress="return (this.innerText.length <= 25)" data-oldtreatmentheader="${risktreatmentvalueHeader}" id="treatmentheader" editable="true" contenteditable="true">` + risktreatmentvalueHeader + `</strong>`;
	}

	var risktreatmentRows = sub_initiatiesrow;
	var finalId = result.id === 0 ? result.changeId : result.id;
		var type = 'draft';
	var createriskIcon = "";
	if (plancreatepermission == true) {
	createriskIcon = `<button type="button" class="btn btn-sm btn-icon create_initives add-sub-initiative" data-bs-toggle="modal" data-bs-target=".risk_treatment_add_popup">
                            <span class="sub_initiative" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add" onclick="handleRiskTreatmentEvent('${finalId}','${type}','add'))">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="plus" style="width: 14px; height: 14px;" class="lucide lucide-plus"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                            </span>
                          </button>`;
	}


	var risktreatmentpermissionOptions = "";
	if (planviewpermission == false) {
		risktreatmentpermissionOptions = "";
	} else {
		risktreatmentpermissionOptions = `<div class="dropdown">
                            <button class="btn btn-sm btn-icon" style="width:24px;" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="more-vertical" style="width: 14px; height: 14px;" class="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                            
                          `;

		if (planviewpermission == true) {
			risktreatmentpermissionOptions += ` <li>
                                <a class="dropdown-item" href="#" data-bs-toggle="modal" data-toggle="modal" data-target=".treatment_view_popup" " onclick="treatmentviewdetails(`+ id + `)">`+viewHeader+`</a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal">`+deleteHeader+`</a>
                              </li>`;
		}

		risktreatmentpermissionOptions += `</ul></div>`;
	}

	var defaultreporteelist = {
		"id": riskupdateDescription.createdBy,
		"name": riskupdateDescription.riskValue.createdByName,
		"image": riskupdateDescription.riskValue.riskImage
	};

	var sub_initiatiesrow = '<div class="panel-group risk-panel-group" id="risk_accordion_11" role="tablist" aria-multiselectable="true">';
	var subinitiativeProgressBar = "";
	var riskcollapse = 1;
	var chartcontent13 = [];
	var chartcontent12 = [];
$.each(result.riskTreatmentList, function (index, item) {
    var chartvalue = parseInt(100) - parseInt(item.riskPlanValue.progress);
    var chartbalance = item.riskPlanValue.progress;

    if (chartvalue == 0) {
        chartbalance = 100;
    }

    var resultPorfileContent = riskPorfileFormationrisk(
        item.ownerList, defaultreporteelist, 'risktreatment', item.id
    );

    var owenrsvalue = (item.riskPlanValue.multipleOwners && item.riskPlanValue.multipleOwners !== "")
        ? item.riskPlanValue.multipleOwners
        : ($("#userPrincipal").val() || "").trim();

    var risktreatmentpermissionOptions = "";
    if (planeditpermission || plandeletepermission) {
        const finalId = item.id === 0 ? item.changeId : item.id;
        const type = 'draft';

        risktreatmentpermissionOptions = `<div class="dropdown">
            <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="more-vertical" style="width: 14px; height: 14px;" class="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
            </button>
            <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;

        if (planeditpermission) {
            risktreatmentpermissionOptions += `
                <li>
                    <a class="dropdown-item" href=".risk_treatment_add_popup" data-bs-toggle="modal" 
                       onclick="handleRiskTreatmentEvent(${finalId}, '${type}', 'edit')">Edit</a>
                </li>`;
        }
        if (plandeletepermission) {
            risktreatmentpermissionOptions += `
                <li><a class="dropdown-item" href="#" onclick="deleteRiskMonitoring(${item.id})">Delete</a></li>`;
        }

        risktreatmentpermissionOptions += `</ul></div>`;
    }

    var resolveDate = item.riskPlanValue.resolveDate 
        ? dateFormatedtohumanread(item.riskPlanValue.resolveDate) 
        : "";
    var status = item.riskPlanValue.action || "";
    var impact = item.riskPlanValue.reducingimpact || "";
    var possibility = item.riskPlanValue.reducingpossibility || "";

    // Helper function to generate a single treatment item row
    function generateTreatmentRow(id, chartbalance, status, timetarget, impact, possibility) {
        return `
            <div class="list-group-item flex-column p-0">
                <div class="d-flex justify-content-between p-2 gap-1">
                    <div class="btn-title text-start justify-content-start" data-bs-toggle="collapse">
                        <div class="row row-cols-1 g-2">
                            <p class="col mb-0">
                                <strong>Reducing Impact:</strong> ${impact}
                            </p>
                            <p class="col mb-0">
                                <strong>Reducing Possibility:</strong> ${possibility}
                            </p>
                        </div>
                    </div>
                    <div class="list-actions">
                        <div class="d-flex align-items-start">
                            <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
                                ${resultPorfileContent}
                            </ul>
                        </div>
                        ${risktreatmentpermissionOptions}
                    </div>
                </div>
                <div class="p-2 d-flex flex-row gap-1 w-100">
                    <div class="d-flex flex-column flex-fill align-items-center">
                        <div class="d-flex flex-row align-items-center gap-2">
                            <div class="chart-pie view_paln_chart_green_${id} view_plan_chart_pie_${id}" data-percent="${chartbalance}"></div>
                            <span class="pie-progress">${chartbalance}%</span>
                        </div>
                    </div>
                    <div class="d-flex flex-column justify-content-center text-center flex-fill">
                        <span class="text-muted">${status}</span>
                    </div>
                    <div class="d-flex flex-column justify-content-end text-end flex-fill">
                        <span class="text-muted">${timetarget}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Add main risk treatment item
    sub_initiatiesrow += generateTreatmentRow(
        item.id, chartbalance, status, item.riskPlanValue.timetarget || "", impact, possibility
    );

    chartcontent13.push({
        "index": item.id,
        "chartbalance": chartbalance,
        "chartvalue": chartvalue
    });

    // Add nested review items (if any)
    $.each(item.riskReviewList, function (index, item1) {
        var activitychartvalue = 100 - parseInt(item1.riskPlanValue.progress || 0);
        var activitychartbalance = item1.riskPlanValue.progress || 0;

        if (activitychartvalue == 0) {
            activitychartbalance = 100;
        }

        chartcontent12.push({
            "index": item1.id,
            "chartbalance": activitychartbalance,
            "chartvalue": activitychartvalue
        });

        // Note: Using same impact/possibility from parent item (as in original)
        // If item1 has its own, replace with item1.riskPlanValue.reducingimpact, etc.
        sub_initiatiesrow += generateTreatmentRow(
            item1.id,
            activitychartbalance,
            item1.riskPlanValue.action || "",
            item1.riskPlanValue.timetarget || "",
            impact,      // or item1.riskPlanValue.reducingimpact if exists
            possibility  // or item1.riskPlanValue.reducingpossibility if exists
        );
    });

    riskcollapse++;
});

// Clear and render
$("#treatment_view").html(sub_initiatiesrow);

// Prepare Mustache template data
var createriskIcon = `<button type="button" class="btn btn-sm btn-icon create_initives add-sub-initiative" 
    data-bs-toggle="modal" data-bs-target=".risk_treatment_add_popup">
    <span class="sub_initiative" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Add"
        onclick="handleRiskTreatmentEvent(0, 'draft', 'add')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="plus" style="width: 14px; height: 14px;" class="lucide lucide-plus"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
    </span>
</button>`;

var causeTemplate = $('#risk-treatment-template').html();
var causeDetails = Mustache.render(causeTemplate, {
    id: id,
    createriskIcon: createriskIcon,
    risktreatmentRows: sub_initiatiesrow,
    risktreatmentinlineEditIcon: risktreatmentvalinlineEditIcon,
    risktreatmentpermissionOptions: risktreatmentpermissionOptions // may be empty if no perms
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
	if (storedLanguage == "ar") {
		riskreviewHeader = "المراجعة والمتابعة";
	} else if (storedLanguage == "am") {
		riskreviewHeader = "ግምገማ እና ክትትል";
	} else {
		riskreviewHeader = "Review & Monitoring";
	}


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
		riskreviewpermissionOptions =` <div class="dropdown">
                            <button class="btn btn-sm btn-icon" style="width:24px;" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="more-vertical" style="width: 14px; height: 14px;" class="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;

		if (planviewpermission == true) {
			riskreviewpermissionOptions += `<li>
                                <a class="dropdown-item" href="#" data-bs-toggle="modal" data-toggle="modal" data-target=".monitoring_view_popup" "  onclick="monitoringviewdetails(`+ id + `)">`+viewHeader+`</a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal">`+deleteHeader+`</a>
                              </li>`;
		}

		riskreviewpermissionOptions += `</ul></div>`;
	}

	var defaultreporteelist = {
		"id": riskupdateDescription.createdBy,
		"name": riskupdateDescription.riskValue.createdByName,
		"image": riskupdateDescription.riskValue.riskImage
	};

	var sub_initiatiesrow = '<div class="panel-group risk-panel-group" id="risk_accordion_10" role="tablist" aria-multiselectable="true">';
	var subinitiativeProgressBar = "";
	var riskcollapse = 1;
	var chartcontent21 = [];
	var chartcontent22 = [];
$.each(result.riskMonitoringList, function (index, item) {
    var progress = parseInt(item.riskMonitoringValue?.progress || 0);
    var chartbalance = progress;
    var chartvalue = 100 - progress;
    if (chartvalue === 0) chartbalance = 100;

    var resultPorfileContent = riskPorfileFormationrisk(
        item.ownerList, defaultreporteelist, 'riskreview', item.id
    );

    var owenrsvalue = (item.riskMonitoringValue?.multipleOwners || "").trim() ||
                      ($("#userPrincipal").val() || "").trim();

    var risktreatmentpermissionOptions = "";
    let finalIdForEdit = null;
    let typeForEdit = 'draft';

    if (planeditpermission || plandeletepermission) {
        finalIdForEdit = (item.id === 0 ? item.changeId : item.id);
        risktreatmentpermissionOptions = `<div class="dropdown">
            <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="more-vertical" style="width: 14px; height: 14px;" class="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
            </button>
            <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;

        if (planeditpermission) {
            risktreatmentpermissionOptions += `
                <li>
                    <a class="dropdown-item" href=".risk_monitoring_popup" data-bs-toggle="modal"
                       onclick="handleReviewMonitoringEvent(${finalIdForEdit}, '${typeForEdit}', 'edit')">Edit</a>
                </li>`;
        }
        if (plandeletepermission) {
            risktreatmentpermissionOptions += `
                <li><a class="dropdown-item" href="#" onclick="deleteRiskMonitoring(${item.id})">Delete</a></li>`;
        }
        risktreatmentpermissionOptions += `</ul></div>`;
    }

    var status = item.riskMonitoringValue?.status || "Open";
    var changestime = item.riskMonitoringValue?.changestime || "";

    // Main monitoring item
    sub_initiatiesrow += `
        <div class="list-group-item flex-column p-0">
            <div class="d-flex justify-content-between p-2 gap-1">
                <div class="btn-title text-start justify-content-start" data-bs-toggle="collapse">
                    <div class="row row-cols-1 g-2">
                        <p class="col mb-0">${item.riskMonitoringValue?.mitigation || ''}</p>
                    </div>
                </div>
                <div class="list-actions d-flex align-items-start">
                    <ul class="list-unstyled d-flex align-items-center avatar-group mb-0" id="riskmonitor_user_${item.id}">
                        ${resultPorfileContent}
                    </ul>
                    ${risktreatmentpermissionOptions}
                </div>
            </div>
            <div class="p-2 d-flex flex-row gap-1 w-100">
                <div class="d-flex flex-column flex-fill">
                    <div class="d-flex flex-row align-items-center gap-2">
                        <div class="chart-pie view_paln_chart_green_${item.id} view_plan_chart_pie_${item.id}" data-percent="${chartbalance}"></div>
                        <span class="pie-progress">${progress}%</span>
                    </div>
                </div>
                <div class="d-flex flex-column justify-content-center text-center flex-fill">
                    <span class="text-muted">${status}</span>
                </div>
                <div class="d-flex flex-column justify-content-end text-end flex-fill">
                    <span class="text-muted">${changestime}</span>
                </div>
            </div>
        </div>`;

    chartcontent21.push({
        "index": item.id,
        "chartbalance": chartbalance,
        "chartvalue": chartvalue
    });

    // Nested riskReviewList items
    $.each(item.riskReviewList || [], function (index, item1) {
        let activityProgress = parseInt(item1.riskMonitoringValue?.progress || 0);
        let activitychartbalance = activityProgress;
        let activitychartvalue = 100 - activityProgress;
        if (activitychartvalue === 0) activitychartbalance = 100;

        chartcontent22.push({
            "index": item1.id,
            "chartbalance": activitychartbalance,
            "chartvalue": activitychartvalue
        });

        let resolveBy = "";
        if (item1.riskMonitoringValue?.changestime) {
            resolveBy = dateFormatedtohumanread(item1.riskMonitoringValue.changestime);
        }

        // Generate nested review item (simplified structure)
        sub_initiatiesrow += `
            <div id="risk_treatment_${riskcollapse}" class="panel-collapse collapse show" role="tabpanel">
                <div class="d-flex flex-row employe_content_border sub_initiative_details" style="margin:11px 4px; padding:5px; width:97%;">
                    <div class="d-flex flex-column flex-fill profile_content" style="width:100%;">
                        <div class="d-flex flex-row">
                            <div class="d-flex flex-column init_flex_profile">
                                <p style="width:85%;">
                                    <pre style="white-space:pre-wrap; font-family:'Poppins',sans-serif;">${
                                        item.riskMonitoringValue?.mitigation || ''
                                    }</pre>
                                </p>
                            </div>
                            <div class="d-flex flex-row">
                                <div class="d-flex flex-column flex-fill">
                                    <div class="d-flex flex-row">
                                        <div class="icon">
                                            <div id="two" class="view_activity_chart_green_${item1.id} view_activity_chart_pie_${item1.id}" data-percent="${activitychartbalance}"></div>
                                        </div>
                                        <div class="pie-progress">${activitychartbalance}%</div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex flex-row">
                                <div class="d-flex flex-column flex-fill"></div>
                                <div class="d-flex flex-column">
                                    <div>${resolveBy}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    });

    riskcollapse++;
});

// --- Rendering ---
$("#monitoring_view").html(sub_initiatiesrow); // or whatever your target is

// Safe "Add" button: don't use finalId/type if not in item context
var createriskIcon = `
    <button type="button" class="btn btn-sm btn-icon create_initives add-sub-initiative" 
            data-bs-toggle="modal" data-bs-target=".risk_monitoring_popup">
        <span class="sub_initiative" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Add"
              onclick="handleReviewMonitoringEvent(0, 'draft', 'add')">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="plus" style="width: 14px; height: 14px;" class="lucide lucide-plus"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
        </span>
    </button>`;

var causeTemplate = $('#risk-review-template').html();
var causeDetails = Mustache.render(causeTemplate, {
    id: id,
    createriskIcon: createriskIcon,
    risktreatmentRows: sub_initiatiesrow,
    riskreviewinlineEditIcon: riskreviewinlineEditIcon,
    riskreviewpermissionOptions: riskreviewpermissionOptions // make sure this is defined elsewhere
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
// risk Attachment list
	var riskattachmentHeader = "Attachments";
	if (storedLanguage == "ar") {
		riskattachmentHeader = "المرفقات";
	} else if (storedLanguage == "am") {
		riskattachmentHeader = "አባሪ ፋይሎች";
	} else {
		riskattachmentHeader = "Attachments";
	}

	if (result.riskValue.monitoringheader != undefined && result.riskValue.monitoringheader != '') {
		riskattachmentHeader = result.riskValue.monitoringheader;
	}

	var riskattachmentinlineEditIcon = `<strong>` + riskattachmentHeader + `</strong>`;
	if (attachmenteditpermission == true) {
		riskattachmentinlineEditIcon = `<strong class="editableTxt1"
			onkeypress="return (this.innerText.length <= 25)" data-oldmonitoringheader="`+ riskattachmentHeader + `" id="monitoringheader" editable="true" contenteditable="true">` + riskattachmentHeader + `</strong>`;
	}





	var risktreatmentpermissionOptions = "";
	if (planviewpermission == false) {
		risktreatmentpermissionOptions = "";
	} else {
		risktreatmentpermissionOptions = `<div class="dropdown">
                            <button class="btn btn-sm btn-icon" style="width:24px;" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="more-vertical" style="width: 14px; height: 14px;" class="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;

		if (planviewpermission == true) {
			risktreatmentpermissionOptions += `<li>
                                <a class="dropdown-item" href="#" data-bs-toggle="modal" data-toggle="modal" data-target=".attachment_view_popup" " id="risk_treat" onclick="attachmentviewdetails(`+ id + `)">View</a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal">Delete</a>
                              </li> `;
		}

		risktreatmentpermissionOptions += `</ul></div>`;
	}

	var defaultreporteelist = {
		"id": riskupdateDescription.createdBy,
		"name": riskupdateDescription.riskValue.createdByName,
		"image": riskupdateDescription.riskValue.riskImage
	};

	var sub_initiatiesrow = '<div class="list-group initiatives-bar">';
	var subinitiativeProgressBar = "";
	var riskcollapse = 1;
	$.each(result.riskAttachmentList, function (index, item) {
		
		// var resultPorfileContent = riskPorfileFormationrisk(
		// 	item.ownerList, defaultreporteelist,
		// 	'riskreview', item.id);
		// var owenrsvalue = (item.riskMonitoringValue.multipleOwners != undefined && item.riskMonitoringValue.multipleOwners != "" ? item.riskMonitoringValue.multipleOwners : currentEmp);

		var risktreatmentpermissionOptions = "";
		if (planeditpermission == false && plandeletepermission == false) {
		} else {
			risktreatmentpermissionOptions = `<div class="dropdown">
                            <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="more-vertical" style="width: 14px; height: 14px;" class="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;

			if (planeditpermission == true) {
				const finalId = item.id === 0 ? item.changeId : item.id;
					const type ='draft' ;
				risktreatmentpermissionOptions += `<li><a href="#" data-toggle="modal"
																data-target=".file_upload_popupattachment"Edit</a>
															</li>`;
			}
			if (plandeletepermission == true) {
				risktreatmentpermissionOptions += `<li><a onclick="deleteAttachments(` + item.id + `)">Delete</a></li>`;
			}

			risktreatmentpermissionOptions += `</ul></li></ul></div>`;
		}
		// var resolveDate = item.riskMonitoringValue.resolveDate ? dateFormatedtohumanread(item.riskMonitoringValue.resolveDate) : "";
		// var status = (item.riskMonitoringValue.status != undefined ? item.riskMonitoringValue.status : "Open");
	
		sub_initiatiesrow +=`
  <div class="list-group-item">
    <div class="bar-chart">
      <div class="d-flex gap-2">
        <h4 class="title mb-0">${item.name}</h4>
      </div>
      <div class="numbers">
        <div class="text-muted left">${item.fileName}</div>
        <div class="text-muted right">${item.createdDate || ''}</div>
      </div>
    </div>
    <div class="list-actions">
     ${risktreatmentpermissionOptions}
    </div>
    <input type="hidden" id="monitoring_selected_user_${item.id}" value="">

  </div>
`;
		riskcollapse++;
	});

	var riskattachmentRows = sub_initiatiesrow;
	if (plancreatepermission == true) {
	var createriskIcon = "";
	createriskIcon = `<button type="button" class="btn btn-sm btn-icon create_initives add-sub-initiative" data-bs-toggle="modal" data-bs-target=".file_upload_popupattachment">
                            <span class="sub_initiative" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add" >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="plus" style="width: 14px; height: 14px;" class="lucide lucide-plus"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                            </span>
                          </button>`;
	}
	var attachmentTemplate = $('#risk-attachment-template').html();
	var attachmentDetails = Mustache.render(attachmentTemplate, {
		id: id,
		createriskIcon: createriskIcon,
		riskattachmentRows: riskattachmentRows,
		riskattachmentinlineEditIcon: riskattachmentinlineEditIcon,
		risktreatmentpermissionOptions: risktreatmentpermissionOptions
	});
	$('#riskattachmentbody').html(attachmentDetails);

	$('.risktreatmentlist,.riskattachmentlist').slimscroll({
		height: "340px",
		size: '3px',
		color: '#9c9c9c'
	});

	// comments
	$('#riskcomments').empty();

    let commentRows = "";

    if (comcontentload) {
        $.each(result.riskCommentsList, function (index, comment) {
            // Render the main comment
            let commentsRowTemplate = $('#risk-comments-row-template').html();
            let timeformatted = comment.riskCommentsValue.formattedDateTime;
            let name = comment.riskCommentsValue.createdByName || comment.riskCommentsValue.updatedByName || "Unknown";
            let username = name.slice(0, 2);
            let riskimage = comment.riskCommentsValue.commentsImage;

            // Determine image or initials
            let Owner = riskimage
                ? `class="rounded-circle" src="${riskimage}"`
                : `data-name="${username}" class="rounded-circle commentsuser"`;

            let title = comment.riskCommentsValue.title || "";
            let commentsName = capitalizeFLetter(comment.riskCommentsValue.desc || "");

            // Determine options for comment
            let commentsrowOptions = generateCommentOptions(comment, riskeditpermission, riskdeletepermission);

            // Render replies
            let replies = [];
            if (comment.replyComments && comment.replyComments.length > 0) {
                $.each(comment.replyComments, function (replyIndex, reply) {
                    replies.push({
                        commentsParendIdreply: reply.commentsParendId,
                        replyId: reply.id,
                        replyCommentsName: reply.riskCommentsValue.desc || "",
                        replyCreated: reply.riskCommentsValue.createdByName || "",
                        replyTime: reply.riskCommentsValue.createdTime || "",
                        replyTitle: reply.riskCommentsValue.title || "",
                    });
                });
            }

            // Like handling
            let currentuserlike = comment.likeEmpIds || [];
            let likeText = currentuserlike.includes(Number(($("#userPrincipal").val() || "").trim())) ? "Unlike" : "Like";
            let likeTextclass = likeText === "Unlike" ? "green" : "";
let commentsReplyCreateIcon =` <input type="text" data-id="`+ id + `" name="riskCommentsReply" id="riskCommentsReply" class="form-control reply-input" placeholder="Write a reply..." autocomplete="off">
          <button class="btn btn-sm btn-primary reply-post"  onclick="handleRiskReplyCommentsSave(${id},'add')">
            <i class="fas fa-arrow-right"></i>
          </button>`;
            // Render the main comment with Mustache
            let commentDetails = Mustache.render(
  commentsRowTemplate,
  {
    id: comment.id,
    initiativeId: result.id,
    title: title,
    commentsName: commentsName,
    replies: replies,   // already prepared above
    createdByName: name,
    Owner: Owner,
    likeText: likeText,
    likeTextclass: likeTextclass,
    count: comment.likeCount || 0,
    createdTime: timeformatted,
    commentsrowOptions: commentsrowOptions,
    commentsReplyCreateIcon: commentsReplyCreateIcon,
  },
  {
    "risk-reply-template": $("#risk-reply-template").html() // partial
  }
);


            commentRows += commentDetails;
        });
    }

    // Handle comments header
	var commentsHeader = "Comments";
	if (storedLanguage == "ar") {
		commentsHeader = "التعليقات";
	} else if (storedLanguage == "am") {
		commentsHeader = "አስተያየቶች";
	} else {
		commentsHeader = "Comments";
	}

    let commentsinlineEditIcon = comeditpermission
        ? ` <strong class="editableTxt1" onkeypress="return (this.innerText.length <= 25)" data-oldcommentheader="${commentsHeader}" id="commentheader" editable="true" contenteditable="true">${commentsHeader}</strong>`
        : `<strong>${commentsHeader}</strong>`;

    // Handle comment creation input
    let commentsCreateIcon = comcreatepermission && comcontentload
        ? `<div class="comment_send riskcommentssend">
            <form id="risk_comments_Form">
                <div id="riskCommentsBlock">
                    <div class="form-group d-flex flex-row align-items-center">
                        <div class="form-line">
                            <input type="text" data-id="${result.id}" name="riskComments" id="riskComments" class="form-control" placeholder="Type a comment..." autocomplete="off"/>	
                        </div>
                        <div class="send_btn" style="cursor:pointer;" onclick="handleRiskCommentsSave(${result.id},'add')">
                            <i class="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </form>
        </div>`
        : "";

    // Compile the full template
    let commentsTemplate = $('#risk-comments-template').html();
    let compiledComments = Mustache.render(commentsTemplate, {
        initiativeId: result.id,
        commentsHeader: commentsHeader,
        commentRows: commentRows,
        commentsCreateIcon: commentsCreateIcon,
        commentsinlineEditIcon: commentsinlineEditIcon,
    });

    // Inject the compiled template into the DOM
    $('#riskcomments').html(compiledComments);

    // Initialize user initials for images
    $('.commentsuser').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });


	if (comcreatepermission == false) {
		$('#riskcomment-conversationrisk').slimscroll({
			height: "324px",
			size: '3px',
			color: '#9c9c9c'
		});

	}

	if (comcreatepermission == true) {
		$('#riskcomment-conversationrisk').slimscroll({
			height: "282px",
			size: '3px',
			color: '#9c9c9c'
		});
	}

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

	$('.collapse_arrow_left').on('click', function () {
		$(this).css('display', 'none');
		$('.collapse_arrow_right').css('display', 'block');
		var $body = $('body');
		$body.addClass('ini-hide');
		$body.removeClass('ini-show');
		localStorage.setItem("sidebar_subsidemenu", "opened");
		initiativeBar();
	});

	$('.collapse_arrow_right').on('click', function () {
		$(this).css('display', 'none');
		$('.collapse_arrow_left').css('display', 'block');
		var $body = $('body');
		$body.addClass('ini-show');
		$body.removeClass('ini-hide');
		localStorage.setItem("sidebar_subsidemenu", "closed");
		initiativeBar();
	});

getVersion();
}

function getVersion() {
    var versionId = $("#veriosnId").text();
    
	$.ajax({
        url: "/stratroom/riskhistorylist?riskId=" + versionId + "&version=",
        type: "GET",
        contentType: "application/json",
        success: function (response) {
            console.log(response, "version response");

			var $dropdown = $("#versionDropdown");
            $dropdown.empty(); // Clear existing options
            $dropdown.append(`<option value="">Select Version</option>`); // Default option

            // Append versions dynamically
            response.forEach(function(item) {
                $dropdown.append(`<option value="${item.version}">Version ${item.version}</option>`);
            });
        }
    });
}

function getRiskVersion() {
    var versionId = $("#veriosnId").text();
    var selectedVersion = $("#versionDropdown").val();

    if (!selectedVersion) return; 

    $.ajax({
        url: "/stratroom/riskhistorylist?riskId=" + versionId + "&version=" + selectedVersion,
        type: "GET",
        contentType: "application/json",
        success: function (response) {
			if (Array.isArray(response) && response.length > 0) {
				// Send only the first object instead of the whole array
				riskdescSuccessCallback(response[0], selectedVersion);
			} else {
				console.warn("Response is empty or not an array");
			}
        }
    });
}


function initiativeBar() {
	var $body = $('body');
	if (localStorage.getItem("sidebar_subsidemenu") != "" & localStorage.getItem("sidebar_subsidemenu") != null & localStorage.getItem("sidebar_subsidemenu") == "closed") {
		$body.addClass('ini-show');
		$body.removeClass('ini-hide');
		$('.collapse_arrow_left').css('display', 'block');
		$('.collapse_arrow_right').css('display', 'none');
	}

	if (localStorage.getItem("sidebar_subsidemenu") != "" & localStorage.getItem("sidebar_subsidemenu") != null & localStorage.getItem("sidebar_subsidemenu") == "opened") {
		$body.addClass('ini-hide');
		$body.removeClass('ini-show');
		$('.collapse_arrow_left').css('display', 'none');
		$('.collapse_arrow_right').css('display', 'block');
	}
	if (!($body.hasClass('submenu-closed')) && !($body.hasClass('side-closed'))
		&& !($body.hasClass('ini-hide')) && !($body.hasClass('ini-show'))) {
		$('#initiative_sidebar').css('left', '230px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '75px');
	} else if (($body.hasClass('submenu-closed'))
		&& !($body.hasClass('side-closed'))
		&& !($body.hasClass('side-closed-hover'))
		&& !($body.hasClass('ini-hide')) && !($body.hasClass('ini-show'))) {
		$('#initiative_sidebar').css('left', '230px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '75px');
	} else if (($body.hasClass('side-closed-hover'))
		&& !($body.hasClass('side-closed'))
		&& !($body.hasClass('submenu-closed'))
		&& !($body.hasClass('ini-hide')) && !($body.hasClass('ini-show'))) {
		$('#initiative_sidebar').css('left', '260px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '75px');
	} else if (($body.hasClass('submenu-closed'))
		&& ($body.hasClass('side-closed'))
		&& !($body.hasClass('side-closed-hover'))
		&& !($body.hasClass('ini-hide')) && !($body.hasClass('ini-show'))) {
		$('#initiative_sidebar').css('left', '0px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '75px');
	} else if (($body.hasClass('side-closed'))
		&& ($body.hasClass('side-closed-hover'))
		&& !($body.hasClass('submenu-closed'))
		&& !($body.hasClass('ini-hide')) && !($body.hasClass('ini-show'))) {
		$('#initiative_sidebar').css('left', '260px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '75px'); // end default
	} else if (($body.hasClass('submenu-closed'))
		&& ($body.hasClass('ini-hide')) && !($body.hasClass('side-closed'))) {
		$('#initiative_sidebar').css('left', '-10px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '75px');
	} else if (($body.hasClass('submenu-closed'))
		&& ($body.hasClass('side-closed')) && ($body.hasClass('ini-hide'))) {
		$('#initiative_sidebar').css('left', '-260px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '75px');
	} else if (($body.hasClass('ini-hide')) && !($body.hasClass('side-closed'))
		&& !($body.hasClass('submenu-closed'))
		&& !($body.hasClass('side-closed-hover'))) {
		$('#initiative_sidebar').css('left', '-10px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '75px');
	} else if (($body.hasClass('ini-hide'))
		&& ($body.hasClass('side-closed-hover'))
		&& !($body.hasClass('submenu-closed'))
		&& ($body.hasClass('side-closed'))) {
		$('#initiative_sidebar').css('left', '-260px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '75px'); // end hide
	} else if (($body.hasClass('submenu-closed'))
		&& ($body.hasClass('ini-show')) && !($body.hasClass('side-closed'))) {
		$('#initiative_sidebar').css('left', '230px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '75px');
	} else if (($body.hasClass('submenu-closed'))
		&& ($body.hasClass('side-closed')) && ($body.hasClass('ini-show'))) {
		$('#initiative_sidebar').css('left', '0px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '75px');
	} else if (($body.hasClass('ini-show')) && !($body.hasClass('side-closed'))
		&& !($body.hasClass('submenu-closed'))
		&& !($body.hasClass('side-closed-hover'))) {
		$('#initiative_sidebar').css('left', '230px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '75px');
	} else if (($body.hasClass('ini-show'))
		&& ($body.hasClass('side-closed-hover'))
		&& !($body.hasClass('submenu-closed'))
		&& ($body.hasClass('side-closed'))) {
		$('#initiative_sidebar').css('left', '260px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '75px');
	}

};



$(".content, .navbar").mouseenter(function () {
	var $body = $('body');
	$body.removeClass('side-closed-hover');
	$body.addClass('submenu-closed');
	initiativeBar();
});

$(".sidebar").mouseenter(function () {
	var $body = $('body');
	$body.addClass('side-closed-hover');
	$body.removeClass('submenu-closed');
	initiativeBar();
});

if (localStorage.getItem("sidebar_option")) {
	jQuery("body").addClass(localStorage.getItem("sidebar_option"));
}
if ($('body').hasClass('side-closed')) {
	$(".sidebar-user-panel").css({
		"display": "none"
	});
	initiativeBar();
} else {
	$(".sidebar-user-panel").css({
		"display": "block"
	});
	initiativeBar();
}

function riskChart(result, type) {
    var chartElement = "";
    if (type == "riskload") {
        var chartTemplate = $('#risk-chart-template').html();
        var chartHeader = "Heat Map";
        if (result.riskValue.chartheader != undefined && result.riskValue.chartheader != '') {
            chartHeader = result.riskValue.chartheader;
        }

        var subInitiativeOptions = "";
        if (riskdeletepermission == false && riskviewpermission == false) {
            subInitiativeOptions = "";
        } else {
            subInitiativeOptions = `<div class="card-actions">
                <div class="heatToggleCheck">
                    <label class="btn btn-sm btn-icon" for="">
                        <i class="fas fa-chart-line" id="tableTabID3"></i>
                    </label>
                </div>
                <div class="dropdown">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="more-vertical" style="width: 14px; height: 14px;" class="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;

            if (riskviewpermission == true) {
                subInitiativeOptions += `<li>
                    <a class="dropdown-item" href=".chart_view_popup" data-bs-toggle="modal" onclick="riskchartviewdetails();">View</a>
                </li>
                <li>
                    <a class="dropdown-item" href="#" onclick="return false;">Delete</a>
                </li>`;
            }

            subInitiativeOptions += `</ul></div>`;
        }

        var chartinlineEditIcon = `<strong id="chartheader" data-oldchartheader="` + chartHeader + `">` + chartHeader + `</strong>`;
        if (riskeditpermission == true) {
            chartinlineEditIcon = `<strong class="editableTxt1"
                onkeypress="return (this.innerText.length <= 25)" id="chartheader" 
                data-oldchartheader="` + chartHeader + `" contenteditable="true">` + chartHeader + `</strong>`;
        }

        var chartTemplateDetails = Mustache.render(chartTemplate, {
            chartHeader: chartHeader,
            subInitiativeOptions: subInitiativeOptions,
            chartinlineEditIcon: chartinlineEditIcon
        });

        $("#chartdiv_risk").html(chartTemplateDetails);
        chartElement = "chartdiv";
    } else {
        $("#chart_modal").html('');
        chartElement = "chart_modal";
    }

    riskchartDataList = {
        id: result.id,
        name: (result.riskValue.name != undefined ? result.riskValue.name : ""),
        score: (result.riskValue.score != undefined ? result.riskValue.score : ""),
        impact: (result.riskValue.impact != undefined ? result.riskValue.impact : ""),
        likeliHood: (result.riskValue.likeliHood != undefined ? result.riskValue.likeliHood : "")
    };

    drawriskChart(chartElement, type);
    heatmaptablerisk();
		$('.charttemplatediv').slimscroll({
		height: '340px',
		size: '3px',
		color: '#9c9c9c'
	});


    $(document).off('change', '#heatmapselection').on('change', '#heatmapselection', function () {
        drawriskChart("chartdiv", type);
        heatmaptablerisk();
    });
}

function heatmaptablerisk() {
	var selectedType = $("#heatmapselection").val();

	var tableBody = $('#cardtableheat .table tbody');
	tableBody.empty(); // Clear existing rows

	if (selectedType === "inherent") {
		$('#impact-header').text('Impact Name'); // Set text for Inherent Heat Map

		// Assuming `detailrisk.riskCauseAndConsequenceList` is your data source
		if (controlpanelRiskSettings.inherentscorecause) {
			$.each(detailrisk.riskCauseAndConsequenceList, function (index, item) {
				// Add a new row to the table for each item
				if (item.causeAndConsequenceValue.score) {
					var row = $('<tr>')
						.append($('<td>').text(item.causeAndConsequenceValue.name))
						.append($('<td>').text(displayOptionText("riskcategory", item.causeAndConsequenceValue.riskcategory)))
						.append($('<td>').text("Cause"))
						.append($('<td>').text(item.causeAndConsequenceValue.impact))
						.append($('<td>').text(item.causeAndConsequenceValue.likelihood))
						.append($('<td>').text(item.causeAndConsequenceValue.score));
					tableBody.append(row);
				}

			});
		} else {
			$.each(detailrisk.riskCauseAndConsequenceList, function (index, item) {
				// Add a new row to the table for each item
				$.each(item.consequenceList, function (index2, itemconq) {

					if (itemconq.consequenceValue.score) {
						var row = $('<tr>')
							.append($('<td>').text(itemconq.consequenceValue.name))
							.append($('<td>').text(displayOptionText("category", itemconq.consequenceValue.impactcategory)))
							.append($('<td>').text("Consequence"))
							.append($('<td>').text(itemconq.consequenceValue.impact))
							.append($('<td>').text(itemconq.consequenceValue.likelihood))
							.append($('<td>').text(itemconq.consequenceValue.score));
						tableBody.append(row);
					}
				});


			});
		}

	} else {
		$('#impact-header').text('Control Name'); // Set text for Residual Heat Map

		if (controlpanelRiskSettings.residualscoreimpact) {

			$.each(detailrisk.riskPlanList, function (index, item) {
				console.log(item)
				// Add a new row to the table for each item
				if (item.riskPlanValue.planscore) {
					var row = $('<tr>')
						.append($('<td>').text(item.riskPlanValue.name))
						.append($('<td>').text(displayOptionText("category", item.riskPlanValue.category)))
						.append($('<td>').text("Reducing Impact"))
						.append($('<td>').text(item.riskPlanValue.impact))
						.append($('<td>').text(item.riskPlanValue.likelihood))
						.append($('<td>').text(item.riskPlanValue.planscore));
					tableBody.append(row);
				}

			});
		} else {
			$.each(detailrisk.riskPlanList, function (index, item) {
				console.log(item)
				// Add a new row to the table for each item
				$.each(item.riskActivitiesDTOList, function (index2, itemconq) {
					console.log(itemconq)
					if (itemconq.riskActivitiesValue.score) {
						var row = $('<tr>')
							.append($('<td>').text(itemconq.riskActivitiesValue.name))
							.append($('<td>').text(displayOptionText("category", itemconq.riskActivitiesValue.category)))
							.append($('<td>').text("Reducing Possibility"))
							.append($('<td>').text(itemconq.riskActivitiesValue.impact))
							.append($('<td>').text(itemconq.riskActivitiesValue.likelihood))
							.append($('<td>').text(itemconq.riskActivitiesValue.score));
						tableBody.append(row);
					}
				});


			});
		}

	}

}


function drawriskChart(chartElement, type) {
    // Dispose of existing charts (except the main one if needed)
    if (am4core.registry.baseSprites.length > 0) {
        am4core.registry.baseSprites.forEach(sprite => {
            if (sprite instanceof am4charts.XYChart && sprite.htmlContainer && sprite.htmlContainer.id !== chartElement) {
                sprite.dispose();
            }
        });
    }

    $("#" + chartElement).empty();

    var colors = {
        "critical": "#ca0101",
        "bad": "#FF6E00",
        "medium": "#FFFF00",
        "good": "#5dbe24",
        "verygood": "#0b7d03"
    };

    am4core.useTheme(am4themes_animated);
    var chart = am4core.create(chartElement, am4charts.XYChart);
    chart.maskBullets = false;

    var xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    var yAxis = chart.yAxes.push(new am4charts.CategoryAxis());

    xAxis.dataFields.category = "y";
    yAxis.dataFields.category = "x";
    xAxis.renderer.grid.template.disabled = true;
    xAxis.renderer.minGridDistance = 30;
    yAxis.renderer.grid.template.disabled = true;
    yAxis.renderer.inversed = false;
    yAxis.renderer.minGridDistance = 30;

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "y";
    series.dataFields.categoryY = "x";
    series.dataFields.value = "value";
    series.sequencedInterpolation = true;
    series.defaultState.transitionDuration = 0;

    var column = series.columns.template;
    column.strokeWidth = 2;
    column.strokeOpacity = 1;
    column.stroke = am4core.color("#000000");
    column.tooltipText = "{status}";
    column.width = am4core.percent(100);
    column.height = am4core.percent(100);
    column.column.cornerRadius(6, 6, 6, 6);
    column.propertyFields.fill = "color";

    var bullet2 = series.bullets.push(new am4charts.LabelBullet());
    bullet2.label.text = "{id}";
    bullet2.label.fill = am4core.color("#000");
    bullet2.zIndex = 1;
    bullet2.fontSize = 11;
    bullet2.interactionsEnabled = false;

    // Base heatmap grid with id initialized
   chart.data = [{
	  "y": "Insignificant",
	  "x": "Rare",
	  "color": colors.verygood,
	  "likelihood": 6,
	  "impact": 1,
	  "status": "A1",
	  "value": 1,
	  "name":"A1"
	}, {
	  "y": "Minor",
	  "x": "Rare",
	  "likelihood": 6,
	  "impact": 2,
	  "color": colors.verygood,
	  "status": "A2",
	  "value": 2
	}, {
	  "y": "Moderate",
	  "x": "Rare",
	  "likelihood": 6,
	  "impact": 3,
	  "color": colors.verygood,
	  "status": "A3",
	  "value": 3,
	}, {
	  "y": "Major",
	  "x": "Rare",
	  "likelihood": 6,
	  "impact": 4,
	  "color": colors.bad,
	  "status": "A4",
	  "value": 4
	}, {
	  "y": "Catastrophic",
	  "x": "Rare",
	  "likelihood": 6,
	  "impact": 5,
	  "color": colors.critical,
	  "status": "A5",
	  "value": 5
	},{
	  "y": "Insignificant",
	  "x": "Unlikely",
	  "likelihood": 7,
	  "impact": 1,
	  "color": colors.verygood,
	  "status": "B1",
	  "value": 2
	}, {
	  "y": "Minor",
	  "x": "Unlikely",
	  "likelihood": 7,
	  "impact": 2,
	  "color": colors.verygood,
	  "status": "B2",
	  "value": 4
	}, {
	  "y": "Moderate",
	  "x": "Unlikely",
	  "likelihood": 7,
	  "impact": 3,
	  "color": colors.medium,
	  "status": "B3",
	  "value": 6
	}, {
	  "y": "Major",
	  "x": "Unlikely",
	  "likelihood": 7,
	  "impact": 4,
	  "color": colors.bad,
	  "status": "B4",
	  "value": 8
	}, {
	  "y": "Catastrophic",
	  "x": "Unlikely",
	  "likelihood": 7,
	  "impact": 5,
	  "color": colors.critical,
	  "status": "B5",
	  "value": 10
	}, {
	  "y": "Insignificant",
	  "x": "Possible",
	  "likelihood": 8,
	  "impact": 1,
	  "color": colors.medium,
	  "status": "C1",
	  "value": 3
	}, {
	  "y": "Minor",
	  "x": "Possible",
	  "likelihood": 8,
	  "impact": 2,
	  "color": colors.medium,
	  "status": "C2",
	  "value": 6
	}, {
	  "y": "Moderate",
	  "x": "Possible",
	  "likelihood": 8,
	  "impact": 3,
	  "color": colors.bad,
	  "status": "C3",
	  "value": 9
	}, {
	  "y": "Major",
	  "x": "Possible",
	  "likelihood": 8,
	  "impact": 4,
	  "color": colors.bad,
	  "status": "C4",
	  "value": 12
	}, {
	  "y": "Catastrophic",
	  "x": "Possible",
	  "likelihood": 8,
	  "impact": 5,
	  "color": colors.critical,
	  "status": "C5",
	  "value": 15
	}, {
	  "y": "Insignificant",
	  "x": "Likely",
	  "likelihood": 9,
	  "impact": 1,
	  "color": colors.bad,
	  "status": "D1",
	  "value": 4
	}, {
	  "y": "Minor",
	  "x": "Likely",
	  "likelihood": 9,
	  "impact": 2,
	  "color": colors.bad,
	  "status": "D2",
	  "value": 8
	}, {
	  "y": "Moderate",
	  "x": "Likely",
	  "likelihood": 9,
	  "impact": 3,
	  "color": colors.bad,
	  "status": "D3",
	  "value": 12
	}, {
	  "y": "Major",
	  "x": "Likely",
	  "likelihood": 9,
	  "impact": 4,
	  "color": colors.critical,
	  "status": "D4",
	  "value": 16
	}, {
	  "y": "Catastrophic",
	  "x": "Likely",
	  "likelihood": 9,
	  "impact": 5,
	  "color": colors.critical,
	  "status": "D5",
	  "value": 20
	}, {
	  "y": "Insignificant",
	  "x": "Almost Certain",
	  "likelihood": 10,
	  "impact": 1,
	  "color": colors.bad,
	  "status": "E1",
	  "value": 5
	}, {
	  "y": "Minor",
	  "x": "Almost Certain",
	  "likelihood": 10,
	  "impact": 2,
	  "color": colors.critical,
	  "status": "E2",
	  "value": 10
	}, {
	  "y": "Moderate",
	  "x": "Almost Certain",
	  "likelihood": 10,
	  "impact": 3,
	  "color": colors.critical,
	  "status": "E3",
	  "value": 15
	}, {
	  "y": "Major",
	  "x": "Almost Certain",
	  "likelihood": 10,
	  "impact": 4,
	  "color": colors.critical,
	  "status": "E4",
	  "value": 20
	}, {
	  "y": "Catastrophic",
	  "x": "Almost Certain",
	  "likelihood": 10,
	  "impact": 5,
	  "color": colors.critical,
	  "status": "E5",
	  "value": 25
	}];

    // Clear all IDs first
    chart.data.forEach(item => item.id = "");

    // Update IDs based on selection
    var selection = $("#heatmapselection").val() || "inherent";

    if (selection === "inherent") {
        if (controlpanelRiskSettings.inherentscorecause) {
            if (Array.isArray(detailrisk.riskCauseAndConsequenceList)) {
                $.each(detailrisk.riskCauseAndConsequenceList, function (index, item) {
                    if (item.causeAndConsequenceValue && item.causeAndConsequenceValue.likelihood && item.causeAndConsequenceValue.impact) {
                        var likelihood = getPriorityFromlikelihood(item.causeAndConsequenceValue.likelihood);
                        var impact = getPriorityFromlimpactscore(item.causeAndConsequenceValue.impact);
                        chart.data.forEach(cell => {
                            if (cell.impact == impact && cell.likelihood == likelihood) {
                                cell.id = (cell.id ? cell.id + ", " : "") + item.causeAndConsequenceValue.score;
                            }
                        });
                    }
                });
            }
        } else {
            if (Array.isArray(detailrisk.riskCauseAndConsequenceList)) {
                $.each(detailrisk.riskCauseAndConsequenceList, function (index, item) {
                    if (item.consequenceList && Array.isArray(item.consequenceList)) {
                        $.each(item.consequenceList, function (i2, conq) {
                            if (conq.consequenceValue && conq.consequenceValue.likelihood && conq.consequenceValue.impact) {
                                var likelihood = getPriorityFromlikelihood(conq.consequenceValue.likelihood);
                                var impact = getPriorityFromlimpactscore(conq.consequenceValue.impact);
                                chart.data.forEach(cell => {
                                    if (cell.impact == impact && cell.likelihood == likelihood) {
                                        cell.id = (cell.id ? cell.id + ", " : "") + conq.consequenceValue.score;
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    } else {
        if (controlpanelRiskSettings.residualscoreimpact) {
            if (Array.isArray(detailrisk.riskPlanList)) {
                $.each(detailrisk.riskPlanList, function (index, item) {
                    if (item.riskPlanValue && item.riskPlanValue.likelihood && item.riskPlanValue.impact) {
                        var likelihood = getPriorityFromlikelihood(item.riskPlanValue.likelihood);
                        var impact = getPriorityFromlimpactscore(item.riskPlanValue.impact);
                        chart.data.forEach(cell => {
                            if (cell.impact == impact && cell.likelihood == likelihood) {
                                cell.id = (cell.id ? cell.id + ", " : "") + item.riskPlanValue.planscore;
                            }
                        });
                    }
                });
            }
        } else {
            if (Array.isArray(detailrisk.riskPlanList)) {
                $.each(detailrisk.riskPlanList, function (index, item) {
                    if (item.riskActivitiesDTOList && Array.isArray(item.riskActivitiesDTOList)) {
                        $.each(item.riskActivitiesDTOList, function (i2, act) {
                            if (act.riskActivitiesValue && act.riskActivitiesValue.likelihood && act.riskActivitiesValue.impact) {
                                var likelihood = getPriorityFromlikelihood(act.riskActivitiesValue.likelihood);
                                var impact = getPriorityFromlimpactscore(act.riskActivitiesValue.impact);
                                chart.data.forEach(cell => {
                                    if (cell.impact == impact && cell.likelihood == likelihood) {
                                        cell.id = (cell.id ? cell.id + ", " : "") + act.riskActivitiesValue.score;
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    }

    chart.invalidateData(); // ← ESSENTIAL: refresh chart with new IDs

    // Hide AmCharts branding tooltip
    $("title:contains('Chart created')").parent().hide();
}

  

function generateData(count, yrange) {
	var i = 0;
	var series = [];
	while (i < count) {
		var x = "W" + (i + 1).toString();
		var y =
			Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

		series.push({
			x: x,
			y: y
		});
		i++;
	}
	return series;
}

function riskchartviewdetails() {
	drawriskChart("chart_modal", "viewriskchart");
}

$(document).on('keypress', '#riskComments', function (e) {
	var id = $(this).attr("data-id");
	if (id == "") {
		return false;
	}
	if (e.which == 13) {
		handleRiskCommentsSave(id, 'add');
		return false;
	}
});
$(document).on('keypress', '#riskCommentsReply', function (e) {
	var id = $(this).attr("data-id");
	if (id == "") {
		return false;
	}
	if (e.which == 13) {
		handleRiskReplyCommentsSave(id, 'add');
		return false;
	}
});
function handleEditRiskCommentsPopUp(id, riskId, commentdesc) {
	$("#risk_comments_id").val(id);
	$("#risk_comments_riskid").val(riskId);
	$("#risk_Comments").val(commentdesc);

}
function handleEditRiskReplyCommentsPopUp(cmdDesc,cmdId,cId) {
	$("#risk_commentsreply_id").val(cId);
	$("#risk_commentsreply_riskid").val(cmdId);
	$("#risk_Commentsreply").val(cmdDesc);
}

function updateRiskComment() {

	var desc = $("#risk_Comments").val();
	if (desc == "" || desc == " " || desc == 0) {
		$.notify("Error: Enter some comments", {
			style: 'error',
			className: 'graynotify'
		});
		return false;
	}
	var commentsObj = {
		"riskId": $("#risk_comments_riskid").val(),
		"id": $("#risk_comments_id").val(),
		"riskCommentsValue": {
			"desc": desc,
		}
	}
	methodType = 'put';
	$.ajax({
		url: "/stratroom/riskComments/",
		type: methodType,
		contentType: "application/json",
		data: JSON.stringify(commentsObj),
		success: function (data, status) {
			$("#risk_comments_Form").css('display', 'none');
			localStorage.setItem("reload", "1");

			window.location.reload(true);
			console.log("New comments was created..");
		}
	});

}


$(document).on("click", ".riskcountclick", function () {
    var $btn = $(this); // Cache the button element
    
    $btn.toggleClass("green");
    
    var id = $btn.attr("data-id");
    if (!id) {
        return false;
    }

    // --- FIX STARTS HERE ---
    // Traverse up to the container holding both the button and the counter
    // Based on template: .riskcountclick is in .comment-actions, 
    // .counter is in .parentcounter. Both are in .comment-cr.
    
    var $container = $btn.closest('.comment-cr'); 
    var $counterSpan = $container.find('span.counter');
    
    // Get current text, default to 0 if empty/invalid
    var currentCountText = $counterSpan.text().trim();
    var counter = parseInt(currentCountText) || 0;
    // --- FIX ENDS HERE ---

    if ($btn.text() == "Like") {
        $btn.text("Unlike");
    } else {
        $btn.text("Like");
    }

    var flaglike = false;
    var likecount = 0;

    if ($btn.hasClass("green")) {
        flaglike = true;
        likecount = counter + 1;
        $counterSpan.text(likecount); // Update UI immediately
    } else {
        flaglike = false;
        likecount = counter - 1;
        
        // Optional: Prevent negative likes if desired
        if (likecount < 0) {
            likecount = 0; 
        }
        $counterSpan.text(likecount); // Update UI immediately
    }

    // Check if likecount is valid before sending
    if (likecount < 0) {
        return false;
    }

    var data = {
        id: id,
        likeCount: likecount,
        type: (flaglike ? "like" : "dislike"),
        empId: ($("#userPrincipal").val() || "").trim()
    };

    $.ajax({
        url: '/stratroom/riskCommentLike',
        type: 'put',
        data: JSON.stringify(data),
        async: false, // Note: async:false is deprecated and bad for UX, consider removing it
        contentType: "application/json",
        success: function (res) {
            $.notify("Updated Successfully", {
                style: 'success',
                className: 'graynotify'
            });
        }, 
        error: readErrorMsg
    });
});
$(document).on("click", ".riskcountreplyclick", function () {
    var $btn = $(this);
    
    // Toggle visual state
    $btn.toggleClass("green");
    
    var id = $btn.attr("data-id");
    if (!id) {
        return false;
    }

    // --- FIX STARTS HERE ---
    // 1. Find the common parent container '.comment-cr'
    var $container = $btn.closest('.comment-cr');
    
    // 2. Find the specific counter span within that container
    // Note: In your reply template, the class is 'like-count', not 'counter'
    var $counterSpan = $container.find('span.like-count');
    
    // 3. Get current value safely
    var currentText = $counterSpan.text().trim();
    var counter = parseInt(currentText) || 0; 
    // --- FIX ENDS HERE ---

    // Toggle Text
    if ($btn.text().trim() == "Like") {
        $btn.text("Unlike");
    } else {
        $btn.text("Like");
    }

    var flaglike = false;
    var likecount = 0;

    if ($btn.hasClass("green")) {
        flaglike = true;
        likecount = counter + 1;
    } else {
        flaglike = false;
        likecount = counter - 1;
        
        // Prevent negative counts
        if (likecount < 0) {
            likecount = 0;
        }
    }

    // Update the UI immediately
    $counterSpan.text(likecount);

    if (likecount < 0) {
        return false;
    }

    var data = {
        id: id,
        likeCount: likecount,
        type: (flaglike ? "like" : "dislike"),
        empId: ($("#userPrincipal").val() || "").trim()
    };

    $.ajax({
        url: '/stratroom/riskCommentLike',
        type: 'put',
        data: JSON.stringify(data),
        async: false, // Consider removing async:false for better performance
        contentType: "application/json",
        success: function (res) {
            $.notify("Updated Successfully", {
                style: 'success',
                className: 'graynotify'
            });
        },
        error: readErrorMsg
    });
});

var file;

function readFile(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		file = input.files[0];
		reader.onload = function () {
			var htmlPreview =
				'<div class="box-body-border">' +
				'<img width="20" src="../stratroom/images/file-icon.png"/>' +
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

$("#next-btn-1").click(function () {
	$("#validateImportHide").empty();
	$("#file-upload").hide();
	$("#file-validate").show();
	$("#file-save").hide();
	$(".form-progressbar li:nth-child(2)").addClass("active");
	var formdata = new FormData();
	formdata.append("riskData", file);
	$(".page-loader-wrapper").css("display", "block");
	if (file) {
		$.ajax({
			url: "/stratroom/saveBulkRiskDetails?type=validation",
			type: "POST",
			data: formdata,
			processData: false,
			contentType: false,
			success: function (data, status) {
				console.log(data);
				riskUploadNotFoundData(data, data.parsingError)
				$(".page-loader-wrapper").css("display", "none");
			},
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
	formdata.append("riskData", file);
	$(".page-loader-wrapper").css("display", "block");
	$.ajax({
		url: "/stratroom/saveBulkRiskDetails?type=save",
		type: "POST",
		data: formdata,
		processData: false,
		contentType: false,
		success: function (data, status) {
			$(".page-loader-wrapper").css("display", "none");
			riskUploadSuccess(data);
		},
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
		$("#imagevalidate").attr("src", "images/Success.png");
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
	riskStatististics('No of Risk created', (data.no_of_created != undefined ? data.no_of_created : ""));
	riskStatististics('No of Risk updated', (data.no_of_updated != undefined ? data.no_of_updated : ""));
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
	localStorage.setItem("reload", "1");

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


$(document).on("change", "#importinitiative", function (e) {
	e.preventDefault();
	var formdata = new FormData();
	if ($(this).prop('files').length > 0) {
		file = $(this).prop('files')[0];
		formdata.append("riskData", file);
	}
	$(".page-loader-wrapper").css("display", "block");
	$.ajax({
		url: "/stratroom/saveBulkRiskDetails",
		type: "POST",
		data: formdata,
		processData: false,
		contentType: false,
		success: function (data, status) {
			$(".upLoadSuccessModal").modal("show");
			$("#getCode").text(data.result);
			initiativeUploadNotFoundData(data.parsingError)
			$(".fileuploadclose").trigger('click');
			$(".page-loader-wrapper").css("display", "none");
		},
		error: function (msg, status) {
			$(".fileuploadclose").trigger('click');
			$(".page-loader-wrapper").css("display", "none");
			if (!jQuery.isEmptyObject(msg.responseText)) {
				var errorparse = JSON.parse(msg.responseText);
				if (errorparse.status == "404") {
					$.notify("Error:" + errorparse.exception, {
						style: 'error',
						className: 'graynotify'
					});
				} else {
					$.notify("Error:" + errorparse.exception, {
						style: 'error',
						className: 'graynotify'
					});
				}
			}
		}
	});

});

   $(document).ready(function() {
        function toggleElements() {
            $('.pageViewOption input[type="checkbox"]').each(function() {
                $("." + $(this).val()).toggle($(this).is(':checked'));
                console.log($("." + $(this).val()).toggle($(this).is(':checked')))
            });
        }

        toggleElements(); // Initialize on page load
        $(document).on('click', '.pageViewOption input[type="checkbox"]', toggleElements); // Handle clicks
    });

 


const riskCategories = [
  "Strategic Risk", "Operational Risk", "Financial Risk", "Compliance & Legal Risk",
  "Technology Risk", "Reputational Risk", "Human Capital Risk", "Environmental, Social & Governance (ESG) Risk",
  "Political Risk", "Regulatory Risk", "Market Risk", "Cybersecurity Risk", "Supply Chain Risk",
  "Project & Program Risk", "Third-Party/Vendor Risk", "Innovation & R&D Risk",
  "Health & Safety Risk", "Business Continuity & Resilience Risk", "Ethical/Conduct Risk", "Investment Risk"
];

const riskCategoryPopoverTrigger = document.getElementById('popoverFilterRiskCategory');
let riskCategoryPopover;

const createRiskCategoryContent = () => {
  const content = document.createElement('div');
  content.innerHTML = `
    <div>
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h5 class="h6 mb-0">
         <i class="fas fa-filter me-1 text-primary"></i> Filter Risk Category
        </h5>
        <button type="button" class="btn-close" aria-label="Close"></button>
      </div>
      <div class="d-flex justify-content-between mb-2">
        <button class="btn btn-sm btn-light select-all-risk">Select All</button>
        <button class="btn btn-sm btn-light deselect-all-risk">Deselect All</button>
      </div>
      <div class="d-flex flex-column gap-2 pageViewOption" style="max-height: 300px; overflow-y: auto;">
        ${riskCategories.map(category => `
          <div class="form-check">
            <input class="form-check-input filter-risk" id="rc-${category.replace(/\s+/g, '')}" type="checkbox" value="${category}" checked>
            <label class="form-check-label" for="rc-${category.replace(/\s+/g, '')}">${category}</label>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  return content;
};

// Initialize popover
if (riskCategoryPopoverTrigger) {
  riskCategoryPopover = new bootstrap.Popover(riskCategoryPopoverTrigger, {
    html: true,
    placement: 'bottom',
    content: createRiskCategoryContent,
    sanitize: false,
    container: 'body',
    trigger: 'manual'
  });

  // Open popover on button click
  riskCategoryPopoverTrigger.addEventListener('click', () => {
    riskCategoryPopover.toggle();
  });
}

function filterKpiCardsByRisk() {
  const checked = Array.from(document.querySelectorAll('.filter-risk:checked')).map(cb => cb.value);
  const allChecked = checked.length === riskCategories.length;
  const cards = document.querySelectorAll('.card.card-widget');

  cards.forEach(card => {
    const riskText = card.querySelector('.riCategory')?.textContent.trim();
    card.style.display = (allChecked || checked.includes(riskText)) ? '' : 'none';
  });
}

// Event delegation for dynamic elements
document.addEventListener('click', function(e) {
  if (e.target.closest('.btn-close')) {
    riskCategoryPopover?.hide();
  }
  if (e.target.classList.contains('select-all-risk')) {
    document.querySelectorAll('.filter-risk').forEach(cb => cb.checked = true);
    filterKpiCardsByRisk();
  }
  if (e.target.classList.contains('deselect-all-risk')) {
    document.querySelectorAll('.filter-risk').forEach(cb => cb.checked = false);
    filterKpiCardsByRisk();
  }
});

// Attach change event listeners to checkboxes
document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('change', function(e) {
    if (e.target.classList.contains('filter-risk')) {
      filterKpiCardsByRisk();
    }
  });
}); 

 $(document).ready(function() {
        function toggleElements() {
            $('.pageViewOption input[type="checkbox"]').each(function() {
                $("." + $(this).val()).toggle($(this).is(':checked'));
                console.log($("." + $(this).val()).toggle($(this).is(':checked')))
            });
        }

        toggleElements(); // Initialize on page load
        $(document).on('click', '.pageViewOption input[type="checkbox"]', toggleElements); // Handle clicks
    });




const risk_page_ar =  { 
  "Risk Description": "وصف المخاطر",
  "Impact Category": "فئة التأثير",
  "Risk Cause Category": "فئة سبب المخاطر",
  "Risk Register": "لجس  رطاخملا", 
  "Draft": "ةدوسم", 
  "Approved": "دمتعم", 
  "Filter Risk Category": "ةيفصت  ةﺋﻓ  رطاخملا", 
  "Add Risk Description": "ةﻓاضإ  فصو رطاخملا", 
  "File Upload": "ليمحت فلملا", 
  "Department": "مسقلا", 
  "Related Parties": "فارطﻷا تاذ ةلصلا", 
  "Risk Category": "ةﺋﻓ رطاخملا", 
  "Inherent Risk Score": " ةجرد  رطاخملا ةيرهوجلا", 
  "Residual Risk Score": "ةجرد  رطاخملا ةيقبتملا", 
  "Version": "رادصﻹا", 
  "Risk Level": " ىوتسم رطاخملا", 
  "Risk Code": "زمر  رطاخملا", 
  "Date Raised": "خيرات ءاشنﻹا", 
  "Business Impact (KPI)": "رثﻷا ﻰلﻋ لامﻋﻷا (رشؤم  ءادﻷا)", 
  "Financial Impact": " رثﻷا يلاملا", 
  "Next Assessment": "مييقتلا يلاتلا", 
  "Date Completed": "خيرات لامتكﻻا", 
  "POS": "ةطقن عيبلا", 
  "ISO": "وزيﻷا", 
  "Information Asset": " لصﻷا يتامولعملا", 
  "Others": "ىرخأ", 
  "Select Version": "رايتخا رادصﻹا", 
  "Edit": "ليدعت", 
  "View": " ضرﻋ", 
  "Cause and Consequence": "ببسلا ةجيتنلاو", 
  "Cause Description": "فصو ببسلا", 
  "Name": " مسﻻا", 
  "Rating": "مييقتلا", 
  "Possible Event": " ثدحلا لمتحملا", 
  "Likelihood": "ةيلامتحﻻا", 
  "Impact": "ريثأتلا", 
  "Risk Score": "ةجرد رطاخملا", 
  "Description": "فصولا", 
  "Cancel": " ءاغلإ", 
  "Save": "ظفح", 
  "Very High": "عفترم  اًدج", 
  "Very Low": "ضفخنم اًدج", 
  "Extreme Risk": "رطاخم  ىوصق", 
  "High Risk": " رطاخم ةيلاﻋ", 
  "Medium Risk": "رطاخم ةطسوتم", 
  "Low": " ضفخنم", 
  "Likely": "حجرم", 
  "Unlikely": "ريغ حجرم", 
  "Possible": " لمتحم", 
  "Almost Certain": "هبش دكؤم", 
  "Major": " يسيﺋر", 
  "Minor": " يوناث", 
  "Mderate": " طسوتم", 
  "Catastrophic": "يثراك", 
  "Tools": "تاودﻷا", 
  "Procedure": " تاءارجﻹا", 
  "External": " يجراخ", 
  "Inherent Heat Map": " ةطيرخ ةرارحلا  ةيرهوجلا", 
  "Residual Heat Map": "ةطيرخ  ةرارحلا ة يقبتملا",
  "Controls": "طباوضلا", 
  "Risk Treatment": "ةجلاعم رطاخملا", 
  "Review & Monitoring": "ةعجارملا  ةعباتملاو", 
  "Attachments": "تاقﻓرملا", 
  "Comments": "تاقيلعتلا", 
  "Impact Name": "مسا ريثأتلا", 
  "Risk Impact Category": "ةﺋﻓ ريثأت رطاخملا", 
  "Type": "عونلا", 
  "Impact Value": " ةميق ريثأتلا", 
  "Likelihood Value": " ةميق ةيلامتحﻻا", 
  "ID": "فرعملا", 
  "Plan Type": "عون  ةطخلا", 
  "Control Effectiveness": "ةيلاعﻓ  طباوضلا", 
  "Progress %": "ةبسن  مدقتلا", 
  "Action": "ءارجﻹا", 
  "Reduce": "ليلقت", 
  "Share": "ةكراشم", 
  "Transfer": " لقن", 
  "Mitigate": "فيفخت", 
  "Audit": "قيقدت", 
  "Created By": "ئشنأ ةطساوب", 
  "Created Date": "خيرات ءاشنﻹا", 
  "Modified By": " لدُﻋ ةطساوب", 
  "Modified Date": "خيرات ليدعتلا", 
  "Casue": " ببسلا", 
  "View Risk Treatment": "ضرﻋ  ةجلاعم رطاخملا", 
  "Reducing Impact": "ليلقت ريثأتلا", 
  "Reducing the Possibility": "ليلقت ةيلامتحﻻا", 
  "Completion Time Target": "ةدملا  ةﻓدهتسملا زاجنﻺل", 
  "View Controls": " ضرﻋ  طباوضلا", 
  "Resolve By": "لح  ةطساوب", 
  "Control Types": " عاونأ  طباوضلا", 
  "View Attachments": "ضرﻋ  تاقﻓرملا", 
  "Mitigation Plan": "ةطخ فيفختلا", 
  "Notes": "تاظحﻼم", 
  "Target Completion Time": " ةدملا ةﻓدهتسملا  زاجنﻺل", 
  "Changes in the Target Completion Time": "تارييغتلا يﻓ  ةدملا ةﻓدهتسملا  زاجنﻺل", 
  "Status": "ةلاحلا", 
  "Person in Charge": "صخشلا لوؤسملا", 
  "Add Consequence Description": " ةﻓاضإ  فصو  ةجيتنلا", 
  "View Comments": "ضرﻋ تاقيلعتلا", 
  "Delete": "فذح", 
  "Select All": " ديدحت  لكلا", 
  "Deselect All": "ءاغلإ ديدحت لكلا", 
  "Strategic Risk": " رطاخملا ةيجيتارتسﻹا", 
  "Operational Risk": "رطاخم  ليغشتلا", 
  "Financial Risk": " رطاخملا ةيلاملا", 
  "Compliance & Legal Risk": " رطاخم لاثتمﻻا ةينوناقلاو", 
  "Technology Risk": "رطاخم ايجولونكتلا", 
  "Reputational Risk": "رطاخم  ةعمسلا", 
  "Human Capital Risk": " رطاخم سأر لاملا يرشبلا", 
  "ESG Risk": " رطاخم ةﺋيبلا عمتجملاو  ةمكوحلاو", 
  "Political Risk": " رطاخملا ةيسايسلا", 
  "Regulatory Risk": "رطاخملا  ةيميظنتلا", 
  "Market Risk": "رطاخم  قوسلا", 
  "Cybersecurity Risk": " رطاخم نمﻷا يناربيسلا", 
  "Supply Chain Risk": " رطاخم  ةلسلس ديروتلا",
  "Project & Program Risk": " رطاخم عيراشملا جماربلاو", 
  "Third-Party/Vendor Risk": " رطاخم فارطﻷا  ةثلاثلا / نيدروملا", 
  "Innovation and R&D Risk": " رطاخم راكتبﻻا  ثحبلاو ريوطتلاو", 
  "Health & Safety Risk": "رطاخم ةحصلا  ةمﻼسلاو", 
  "Business Continuity & Resilience Risk": " رطاخم ةيرارمتسا  لامﻋﻷا ةنورملاو", 
  "Ethical/Conduct Risk": "رطاخم كولسلا تايقﻼخﻷاو", 
  "Investment Risk": "رطاخم رامثتسﻻا", 
  "Upload": " ليمحت", 
  "Validation": "ققحتلا", 
  "Import": "داريتسا", 
  "Upload File": " عﻓر  فلملا", 
  "Choose a file or Drag Here": "رتخا اًفلم وأ بحسا انه", 
  "Next": "يلاتلا", 
  "Context": " قايسلا", 
  "KPI": "رشؤم  ءادﻷا يسيﺋرلا" 
};

const risk_page_en = { 
  "Risk Description" : "Risk Description",
  "Impact Category": "Impact Category",
  "Risk Cause Category": "Risk Cause Category",
  "Risk Register": "Risk Register", 
  "Draft": "Draft", 
  "Approved": "Approved", 
  "Filter Risk Category": "Filter Risk Category", 
  "Add Risk Description": "Add Risk Description", 
  "File Upload": "File Upload", 
  "Department": "Department", 
  "Related Parties": "Related Parties", 
  "Risk Category": "Risk Category", 
  "Inherent Risk Score": "Inherent Risk Score", 
  "Residual Risk Score": "Residual Risk Score", 
  "Version": "Version", 
  "Risk Level": "Risk Level", 
  "Risk Code": "Risk Code", 
  "Date Raised": "Date Raised", 
  "Business Impact (KPI)": "Business Impact (KPI)", 
  "Financial Impact": "Financial Impact", 
  "Next Assessment": "Next Assessment", 
  "Date Completed": "Date Completed", 
  "POS": "POS", 
  "ISO": "ISO", 
  "Information Asset": "Information Asset", 
  "Others": "Others", 
  "Select Version": "Select Version", 
  "Edit": "Edit", 
  "View": "View", 
  "Cause and Consequence": "Cause and Consequence", 
  "Cause Description": "Cause Description", 
  "Name": "Name", 
  "Rating": "Rating", 
  "Possible Event": "Possible Event", 
  "Likelihood": "Likelihood", 
  "Impact": "Impact", 
  "Risk Score": "Risk Score", 
  "Description": "Description", 
  "Cancel": "Cancel", 
  "Save": "Save", 
  "Very High": "Very High", 
  "Very Low": "Very Low", 
  "Extreme Risk": "Extreme Risk", 
  "High Risk": "High Risk", 
  "Medium Risk": "Medium Risk", 
  "Low": "Low", 
  "Likely": "Likely", 
  "Unlikely": "Unlikely", 
  "Possible": "Possible", 
  "Almost Certain": "Almost Certain", 
  "Major": "Major", 
  "Minor": "Minor", 
  "Mderate": "Mderate", 
  "Catastrophic": "Catastrophic", 
  "Tools": "Tools", 
  "Procedure": "Procedure", 
  "External": "External", 
  "Inherent Heat Map": "Inherent Heat Map", 
  "Residual Heat Map": "Residual Heat Map",
  "Controls": "Controls", 
  "Risk Treatment": "Risk Treatment", 
  "Review & Monitoring": "Review & Monitoring", 
  "Attachments": "Attachments", 
  "Comments": "Comments", 
  "Impact Name": "Impact Name", 
  "Risk Impact Category": "Risk Impact Category", 
  "Type": "Type", 
  "Impact Value": "Impact Value", 
  "Likelihood Value": "Likelihood Value", 
  "ID": "ID", 
  "Plan Type": "Plan Type", 
  "Control Effectiveness": "Control Effectiveness", 
  "Progress %": "Progress %", 
  "Action": "Action", 
  "Reduce": "Reduce", 
  "Share": "Share", 
  "Transfer": "Transfer", 
  "Mitigate": "Mitigate", 
  "Audit": "Audit", 
  "Created By": "Created By", 
  "Created Date": "Created Date", 
  "Modified By": "Modified By", 
  "Modified Date": "Modified Date", 
  "Casue": "Casue", 
  "View Risk Treatment": "View Risk Treatment", 
  "Reducing Impact": "Reducing Impact", 
  "Reducing the Possibility": "Reducing the Possibility", 
  "Completion Time Target": "Completion Time Target", 
  "View Controls": "View Controls", 
  "Resolve By": "Resolve By", 
  "Control Types": "Control Types", 
  "View Attachments": "View Attachments", 
  "Mitigation Plan": "Mitigation Plan", 
  "Notes": "Notes", 
  "Target Completion Time": "Target Completion Time", 
  "Changes in the Target Completion Time": "Changes in the Target Completion Time", 
  "Status": "Status", 
  "Person in Charge": "Person in Charge", 
  "Add Consequence Description": "Add Consequence Description", 
  "View Comments": "View Comments", 
  "Delete": "Delete", 
  "Select All": "Select All", 
  "Deselect All": "Deselect All", 
  "Strategic Risk": "Strategic Risk", 
  "Operational Risk": "Operational Risk", 
  "Financial Risk": "Financial Risk", 
  "Compliance & Legal Risk": "Compliance & Legal Risk", 
  "Technology Risk": "Technology Risk", 
  "Reputational Risk": "Reputational Risk", 
  "Human Capital Risk": "Human Capital Risk", 
  "ESG Risk": "ESG Risk", 
  "Political Risk": "Political Risk", 
  "Regulatory Risk": "Regulatory Risk", 
  "Market Risk": "Market Risk", 
  "Cybersecurity Risk": "Cybersecurity Risk", 
  "Supply Chain Risk": "Supply Chain Risk",
  "Project & Program Risk": "Project & Program Risk", 
  "Third-Party/Vendor Risk": "Third-Party/Vendor Risk", 
  "Innovation and R&D Risk": "Innovation and R&D Risk", 
  "Health & Safety Risk": "Health & Safety Risk", 
  "Business Continuity & Resilience Risk": "Business Continuity & Resilience Risk", 
  "Ethical/Conduct Risk": "Ethical/Conduct Risk", 
  "Investment Risk": "Investment Risk", 
  "Upload": "Upload", 
  "Validation": "Validation", 
  "Import": "Import", 
  "Upload File": "Upload File", 
  "Choose a file or Drag Here": "Choose a file or Drag Here", 
  "Next": "Next", 
  "Context": "Context", 
  "KPI": "KPI" 
};

const risk_page_am = { 
  "Risk Description": "የአደጋ መግለጫ",
  "Impact Category": "የተፅእኖ ምድብ",
  "Risk Cause Category": "የአደጋ ምክንያት ምድብ",
  "Risk Register": "የአደጋ መዝገብ", 
  "Draft": "ረቂቅ", 
  "Approved": "ተፈቅዷል", 
  "Filter Risk Category": "የአደጋ ምድብ አጣራ", 
  "Add Risk Description": "የአደጋ መግለጫ አክል", 
  "File Upload": "ፋይል አስገባ", 
  "Department": "ዲፓርትመንት", 
  "Related Parties": "ተዛማጅ ወገኖች", 
  "Risk Category": "የአደጋ ምድብ", 
  "Inherent Risk Score": "የተዋረደ የአደጋ ነጥብ", 
  "Residual Risk Score": "የቀሪ የአደጋ ነጥብ", 
  "Version": "ስሪት", 
  "Risk Level": "የአደጋ ደረጃ", 
  "Risk Code": "የአደጋ ኮድ", 
  "Date Raised": "ቀን ከተነሳ", 
  "Business Impact (KPI)": "የንግድ ተፅእኖ (KPI)", 
  "Financial Impact": "የገንዘብ ተፅእኖ", 
  "Next Assessment": "ቀጣይ ግምገማ", 
  "Date Completed": "ቀን ተጠናቋል", 
  "POS": "POS", 
  "ISO": "ISO", 
  "Information Asset": "የመረጃ ንብረት", 
  "Others": "ሌሎች", 
  "Select Version": "ስሪት ይምረጡ", 
  "Edit": "አስተካክል", 
  "View": "ይመልከቱ", 
  "Cause and Consequence": "ምክንያት እና ውጤት", 
  "Cause Description": "የምክንያት መግለጫ", 
  "Name": "ስም", 
  "Rating": "ደረጃ", 
  "Possible Event": "የሚቻለ ክስተት", 
  "Likelihood": "እድል", 
  "Impact": "ተፅእኖ", 
  "Risk Score": "የአደጋ ነጥብ", 
  "Description": "መግለጫ", 
  "Cancel": "ይቅር", 
  "Save": "አስቀምጥ", 
  "Very High": "በጣም ከፍተኛ", 
  "Very Low": "በጣም ዝቅተኛ", 
  "Extreme Risk": "እጅግ ከፍተኛ አደጋ", 
  "High Risk": "ከፍተኛ አደጋ", 
  "Medium Risk": "መካከለኛ አደጋ", 
  "Low": "ዝቅተኛ", 
  "Likely": "ይቻላል", 
  "Unlikely": "አይቻልም", 
  "Possible": "ይቻላል", 
  "Almost Certain": "በጣም የሚታወክ", 
  "Major": "ታላቅ", 
  "Minor": "ትንሽ", 
  "Mderate": "መካከለኛ", 
  "Catastrophic": "አስፈሪ", 
  "Tools": "መሳሪያዎች", 
  "Procedure": "ሂደት", 
  "External": "ውጫዊ", 
  "Inherent Heat Map": "የተዋረደ የአደጋ ካርታ", 
  "Residual Heat Map": "የቀሪ የአደጋ ካርታ", 
  "Controls": "ቁጥጥር", 
  "Risk Treatment": "የአደጋ እንክብካቤ", 
  "Review & Monitoring": "እይታ እና ክትትል", 
  "Attachments": "አባሪዎች", 
  "Comments": "አስተያየቶች", 
  "Impact Name": "የተፅእኖ ስም", 
  "Risk Impact Category": "የአደጋ ተፅእኖ ምድብ", 
  "Type": "አይነት", 
  "Impact Value": "የተፅእኖ ዋጋ", 
  "Likelihood Value": "የእድል ዋጋ", 
  "ID": "መለያ", 
  "Plan Type": "የእቅድ አይነት", 
  "Control Effectiveness": "የቁጥጥር ውጤታማነት", 
  "Progress %": "እድገት %", 
  "Action": "ተግባር", 
  "Reduce": "ቀንስ", 
  "Share": "አጋራ", 
  "Transfer": "አስተላልፍ", 
  "Mitigate": "ቀንስ", 
  "Audit": "ኦዲት", 
  "Created By": "የተፈጠረ በ", 
  "Created Date": "ቀን ተፈጥሯል", 
  "Modified By": "የተሻሻለ በ", 
  "Modified Date": "የተሻሻለ ቀን", 
  "Casue": "ምክንያት", 
  "View Risk Treatment": "የአደጋ እንክብካቤ ይመልከቱ", 
  "Reducing Impact": "ተፅእኖን መቀነስ", 
  "Reducing the Possibility": "እድልን መቀነስ", 
  "Completion Time Target": "የመጨረሻ ጊዜ ኢላማ", 
  "View Controls": "ቁጥጥር ይመልከቱ", 
  "Resolve By": "መፍትሄ በ", 
  "Control Types": "የቁጥጥር አይነቶች", 
  "View Attachments": "አባሪዎችን ይመልከቱ", 
  "Mitigation Plan": "የመቀነሻ እቅድ", 
  "Notes": "ማስታወሻዎች", 
  "Target Completion Time": "የመጨረሻ ጊዜ ኢላማ", 
  "Changes in the Target Completion Time": "በመጨረሻ ጊዜ ኢላማ ላይ ለውጦች", 
  "Status": "ሁኔታ", 
  "Person in Charge": "ተጠያቂ ሰው", 
  "Add Consequence Description": "የውጤት መግለጫ አክል", 
  "View Comments": "አስተያየቶችን ይመልከቱ", 
  "Delete": "ሰርዝ", 
  "Select All": "ሁሉንም ምረጥ", 
  "Deselect All": "ሁሉንም አይምረጡ", 
  "Strategic Risk": "የዘዴ አደጋ", 
  "Operational Risk": "የአስፈፃሚ አደጋ", 
  "Financial Risk": "የገንዘብ አደጋ", 
  "Compliance & Legal Risk": "የሕግ እና መስፈርት አደጋ", 
  "Technology Risk": "የቴክኖሎጂ አደጋ", 
  "Reputational Risk": "የተዋዋይ አደጋ", 
  "Human Capital Risk": "የሰው ኃብት አደጋ", 
  "ESG Risk": "ESG አደጋ", 
  "Political Risk": "የፖለቲካ አደጋ", 
  "Regulatory Risk": "የአዋጅ አደጋ", 
  "Market Risk": "የገበያ አደጋ", 
  "Cybersecurity Risk": "የሳይበር ደህንነት አደጋ", 
  "Supply Chain Risk": "የአቅርቦት ሰንሰለት አደጋ",
  "Project & Program Risk": "የፕሮጀክት እና ፕሮግራም አደጋ", 
  "Third-Party/Vendor Risk": "የሶስተኛ ወገን/አቅራቢ አደጋ", 
  "Innovation and R&D Risk": "የአዲስነት እና ምርምር አደጋ", 
  "Health & Safety Risk": "የጤና እና ደህንነት አደጋ", 
  "Business Continuity & Resilience Risk": "የንግድ ቀጥታነት እና ጽናት አደጋ", 
  "Ethical/Conduct Risk": "የሥነ-ምግባር አደጋ", 
  "Investment Risk": "የትራፊክ አደጋ", 
  "Upload": "አስገባ", 
  "Validation": "ማረጋገጫ", 
  "Import": "አስመጣ", 
  "Upload File": "ፋይል አስገባ", 
  "Choose a file or Drag Here": "ፋይል ይምረጡ ወይም ይጎትቱ እዚህ", 
  "Next": "ቀጣይ", 
  "Context": "አውድ", 
  "KPI": "KPI"
};


function getNestedValue(obj, path) {
  return path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : null, obj);
}

// Load language for all elements with data-translate
function loadLanguage(lang) {
  let translation;

  if (lang == 'ar') {
    translation = risk_page_ar;
  } else if(lang == "am") {
	translation = risk_page_am;
  }else {
    translation = risk_page_en;
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


/* ================================
   RISK DATA MAPPING FUNCTION
================================ */
function mapRiskData(data) {
    let riskValue = data.riskValue || {};
    return {
        pageTitle: data.pageName,
        userName: riskValue.ownerName,
        period: "",
        title: riskValue.name,
        department: riskValue.department,
        relatedParties: riskValue.relatedparties,
        riskCategory: riskValue.riskcategory,
        inherentRiskScore: data.inherentRiskCauseScore,
        residualRiskScore: data.residualRiskImpactScore,
        riskLevel: riskValue.riskStatus,
        riskCode: data.riskUniqueId,
        version: data.version,
        dateRaised: riskValue.dateRaised,
        nextAssessment: riskValue.nextAssessment,
        dateCompleted: riskValue.dateCompleted,
        businessImpactKPI: riskValue.businessimpact ,
        financialImpact: riskValue.financialImpact,
        pos: riskValue.riskpos ,
        iso: riskValue.riskiso,
        informationAsset: riskValue.riskinformationasset,
        others: riskValue.riskothers,

        // ✅ FIXED: Include ALL consequences even with empty scores
        causesAndConsequences: (data.riskCauseAndConsequenceList || []).map(c => ({
            title: c.causeAndConsequenceValue?.name || "",
            badge: c.causeAndConsequenceValue?.score || "",
            consequences: (c.consequenceList || []).map(con => ({
                title: con.consequenceValue?.name || "",
                badge: con.consequenceValue?.score || ""  // ✅ Keep empty scores
            }))
        })),

        controls: (data.riskPlanList || []).map(plan => ({
            title: plan.riskPlanValue?.name || "",
            strategy: plan.riskPlanValue?.action || "",
            progress: plan.riskPlanValue?.progress || 0,
            date: plan.riskPlanValue?.resolveDate || "",
            items: (plan.riskActivitiesDTOList || []).map(act => ({
                title: act.riskActivitiesValue?.name || "",
                status: act.riskActivitiesValue?.status || "",
                progress: act.riskActivitiesValue?.progress || 0
            }))
        })),

        riskTreatments: (data.riskTreatmentList || []).map(t => ({
            reducingImpact: t.riskPlanValue?.reducingimpact || "",
            reducingPossibility: t.riskPlanValue?.reducingpossibility || "",
            strategy: t.riskPlanValue?.action || "",
            progress: t.riskPlanValue?.progress || 0,
            date: t.riskPlanValue?.timetarget || ""
        })),

        reviewMonitoring: (data.riskMonitoringList || []).map(m => ({
            title: m.riskMonitoringValue?.mitigation || "",
            status: m.riskMonitoringValue?.status || "",
            progress: m.riskMonitoringValue?.progress || 0,
            date: m.riskMonitoringValue?.targettime || ""
        })),

         inherentHeatMap: (data.riskCauseAndConsequenceList || [])
            .flatMap(c => (c.consequenceList || []).map(con => ({
                impactName: con.consequenceValue?.name,
                category: con.consequenceValue?.impactcategory,
                type: "Consequence",
                impactValue: con.consequenceValue?.impact,
                likelihoodValue: con.consequenceValue?.likelihood,
                riskScore: con.consequenceValue?.score
            })))
            .filter(item => item.riskScore && item.riskScore.trim() !== ""),

        residualHeatMap: (data.riskPlanList || [])
            .map(plan => ({
                controlName: plan.riskPlanValue?.name,
                category: plan.riskPlanValue?.category,
                type: "Reducing Impact",
                impactValue: plan.riskPlanValue?.impact,
                likelihoodValue: plan.riskPlanValue?.likelihood,
                riskScore: plan.riskPlanValue?.planscore
            }))
            .filter(item => item.riskScore && item.riskScore.trim() !== ""),
			
        // ✅ FIXED: Map comments WITH replies properly
        comments: (data.riskCommentsList || []).map(c => ({
            id: c.id,
            text: c.riskCommentsValue?.desc || "",
            time: c.riskCommentsValue?.formattedTime || "",
            formattedDateTime: c.riskCommentsValue?.formattedDateTime || "",
            user: { name: c.riskCommentsValue?.createdByName || "" },
            image: c.riskCommentsValue?.commentsImage || null,
            // ✅ Map nested replyComments from API
            replies: (c.replyComments || []).map(reply => ({
                id: reply.id,
                text: reply.riskCommentsValue?.desc || "",
                time: reply.riskCommentsValue?.formattedTime || "",
                formattedDateTime: reply.riskCommentsValue?.formattedDateTime || "",
                user: { name: reply.riskCommentsValue?.createdByName || "" },
                image: reply.riskCommentsValue?.commentsImage || null
            }))
        }))
    };
}

/* ================================
   PDF GENERATOR - INITIATIVE THEME
================================ */

function hexToRGB(hex) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return [r, g, b];
}

async function generateRiskPDF() {
    const { jsPDF } = window.jspdf;
    let pdf = new jsPDF();
    let pageWidth = pdf.internal.pageSize.width;
    let pageHeight = pdf.internal.pageSize.height;
    const submissionDate = new Date().toLocaleDateString();
    const logoUrl = document.getElementById("appLogo")?.src || "/stratroom/images/logo.png";
    const coverImage = "/stratroom/images/initiative-bg.jpg";
    const marginLeft = 10;
    const marginRight = pageWidth - marginLeft;

    /* -----------------------------------------------------------
       COVER PAGE - INITIATIVE STYLE
    ------------------------------------------------------------*/
    function addCoverPage(section) {
        const cfh = 20;
        const cfhs = 10;
        const hexColor = localStorage.getItem("stratroomPrimaryColor") || "#934578";
        const bgColor = hexToRGB(hexColor);
        const periodText =  $('#datePeriod').val() || "N/A";
        const titleText = section?.pageTitle ? section.pageTitle + " Report" : "Risk Register Report";



        pdf.addImage(coverImage, 'JPEG', 0, 0, pageWidth, pageHeight);
        pdf.addImage(logoUrl, "PNG", marginRight - 50, 5, 50, 10);

        pdf.setTextColor(hexColor);
        pdf.setFontSize(30);
        pdf.setFont("helvetica", "bold");
        pdf.text(titleText.toUpperCase(), pageWidth / 2, 60, { align: "center" });

        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text(`Period: ${periodText}`, pageWidth / 2, 90, { align: "center" });

        // Footer shape on cover
        pdf.setFillColor(...bgColor);
        pdf.rect(0, pageHeight - cfhs, pageWidth, cfhs, 'F');
        pdf.setFillColor(...bgColor);
        pdf.lines([[pageWidth/2, 0],[20, cfh], [-90, 0]], -20, pageHeight - cfh, [1, 1], 'F');

        const shapeWidth = 20;
        pdf.setFillColor(...bgColor);
        pdf.lines([[15, 0],[0, pageHeight / 3],[-15, 15],[0, -(pageHeight / 2 - 15)]], 0, 0, [1, 1], 'F');

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.text(`Generated Date: ${submissionDate}`, 10, pageHeight - 12);
        pdf.text(`Period: ${periodText}`, 10, pageHeight - 6);

        pdf.addPage();
    }

    /* -----------------------------------------------------------
       HEADER - INITIATIVE STYLE
    ------------------------------------------------------------*/
    function header(section) {
        const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
        const textStartY = imgY + 5;
        const title = section?.pageTitle ? section.pageTitle + " Report" : "Risk Register Report";
        const name = section?.userName || "";
        const period = section?.period || "";

        pdf.addImage(logoUrl, "PNG", imgX, imgY, imgWidth, imgHeight);
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(13);
        pdf.setFont("helvetica", "bold");
        pdf.text(title, marginRight, textStartY - 3, { align: "right" });

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.text(`Generated Date: ${submissionDate}`, marginRight, textStartY + 1, { align: "right" });
        pdf.text(`Name: ${name}`, marginRight, textStartY + 6, { align: "right" });
        pdf.text(`Period: ${period}`, marginRight, textStartY + 10, { align: "right" });

        pdf.line(10, imgHeight + 12, pageWidth - 10, imgHeight + 12);
        return imgHeight + 20;
    }

    /* -----------------------------------------------------------
       FOOTER - INITIATIVE STYLE
    ------------------------------------------------------------*/
    function footer(pageNumber, totalPages) {
        const footerHeight = 20;
        const footerHeightsm = 10;
        const hexColor = localStorage.getItem("stratroomPrimaryColor") || "#934578";
        const bgColor = hexToRGB(hexColor);

        pdf.setFillColor(...bgColor);
        pdf.rect(0, pageHeight - footerHeightsm, pageWidth, footerHeightsm, 'F');
        pdf.setFillColor(...bgColor);
        pdf.lines([[pageWidth/2, 0],[20, footerHeight],[-90, 0]], -20, pageHeight - footerHeight, [1, 1], 'F');

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("Risk Register Report", 10, pageHeight - 10);

        pdf.setFontSize(10);
        pdf.text(`Page ${pageNumber} of ${totalPages}`, marginRight, pageHeight - 4, { align: "right" });
    }

    /* -----------------------------------------------------------
       START PDF
    ------------------------------------------------------------*/
    if (riskPdfData.length > 0) {
        addCoverPage(riskPdfData[0]);
    }
    let reportStartPage = pdf.internal.getNumberOfPages();

    for (let i = 0; i < riskPdfData.length; i++) {
        let risk = riskPdfData[i];
        let currentY = header(risk);

        const hexColor = localStorage.getItem("stratroomPrimaryColor") || "#934578";
        const headColor = hexToRGB(hexColor);

        /* ================================
           RISK DETAILS
        ================================= */
        let detailsBody = [
            ["Risk Title", risk.title || ""],
            ["Department", risk.department || ""],
            ["Related Parties", risk.relatedParties || ""],
            ["Risk Category", risk.riskCategory || ""],
            ["Inherent Risk Score", risk.inherentRiskScore || ""],
            ["Residual Risk Score", risk.residualRiskScore || ""],
            ["Risk Level", risk.riskLevel || ""],
            ["Risk Code", risk.riskCode || ""],
            ["Version", risk.version || ""],
            ["Date Raised", risk.dateRaised || ""],
            ["Next Assessment", risk.nextAssessment || ""],
            ["Date Completed", risk.dateCompleted || ""],
            ["Business Impact KPI", (risk.businessImpactKPI || []).join(", ")],
            ["Financial Impact", (risk.financialImpact || []).join(", ")],
            ["POS", risk.pos || ""],
            ["ISO", risk.iso || ""],
            ["Information Asset", (risk.informationAsset || []).join(", ")],
            ["Others", risk.others || ""]
        ];

        pdf.autoTable({
            startY: currentY,
            body: detailsBody,
            theme: 'grid',
            styles: { fontSize: 9, overflow: 'linebreak', cellPadding: 2 },
            headStyles: { fillColor: headColor, textColor: 255 },
            columnStyles: {
                0: { fontStyle: 'bold', fillColor: headColor, textColor: 255, cellWidth: 60 },
                1: { cellWidth: pageWidth - 80 }
            },
            margin: { left: 10, right: 10 },
            didDrawPage: function(data) {
                if (data.pageNumber > 1) header(risk);
            }
        });
        currentY = pdf.lastAutoTable.finalY + 10;

        /* ================================
           CAUSES & CONSEQUENCES (GROUPED) - ✅ FIXED
        ================================= */
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(risk); }
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("CAUSES & CONSEQUENCES", 10, currentY);
        currentY += 6;

        let causeRows = [];
        risk.causesAndConsequences.forEach(c => {
            let consequences = c.consequences || [];
            
            if (consequences.length === 0) {
                causeRows.push([c.title || "", c.badge || "", "", ""]);
                return;
            }
            
            consequences.forEach((con, index) => {
                if (index === 0) {
                    causeRows.push([
                        c.title || "", 
                        c.badge || "", 
                        con.title || "", 
                        con.badge || ""
                    ]);
                } else {
                    causeRows.push([
                        "", "", 
                        con.title || "", 
                        con.badge || ""
                    ]);
                }
            });
        });

        pdf.autoTable({
            startY: currentY,
            head: [["Cause", "Severity", "Consequence", "Severity"]],
            body: causeRows,
            theme: 'grid',
            styles: { fontSize: 9, overflow: 'linebreak', cellPadding: 2 },
            headStyles: { fillColor: headColor, textColor: 255 },
            columnStyles: { 0: { cellWidth: 'auto' } },
            margin: { left: 10, right: 10 },
            didDrawPage: function(data) {
                if (data.pageNumber > 1) header(risk);
            }
        });
        currentY = pdf.lastAutoTable.finalY + 10;

        /* ================================
           CONTROLS (GROUPED)
        ================================= */
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(risk); }
        pdf.setFontSize(12);
        pdf.text("CONTROLS", 10, currentY);
        currentY += 6;

        let controlRows = [];
        risk.controls.forEach(c => {
            let validItems = c.items || [];
            if (validItems.length === 0) {
                controlRows.push([c.title || "", c.strategy || "", (c.progress || 0) + "%", c.date || "", "", "", ""]);
                return;
            }
            validItems.forEach((item, index) => {
                if (index === 0) {
                    controlRows.push([
                        c.title || "", 
                        c.strategy || "", 
                        (c.progress || 0) + "%", 
                        c.date || "", 
                        item.title || "", 
                        item.status || "", 
                        (item.progress || 0) + "%"
                    ]);
                } else {
                    controlRows.push([
                        "", "", "", "", 
                        item.title || "", 
                        item.status || "", 
                        (item.progress || 0) + "%"
                    ]);
                }
            });
        });

        pdf.autoTable({
            startY: currentY,
            head: [["Control", "Strategy", "Progress", "Date", "Sub Control", "Status", "Progress"]],
            body: controlRows,
            theme: 'grid',
            styles: { fontSize: 9, overflow: 'linebreak', cellPadding: 2 },
            headStyles: { fillColor: headColor, textColor: 255 },
            columnStyles: { 0: { cellWidth: 'auto' } },
            margin: { left: 10, right: 10 },
            didDrawPage: function(data) {
                if (data.pageNumber > 1) header(risk);
            }
        });
        currentY = pdf.lastAutoTable.finalY + 10;

        /* ================================
           RISK TREATMENTS
        ================================= */
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(risk); }
        pdf.setFontSize(12);
        pdf.text("RISK TREATMENTS", 10, currentY);
        currentY += 6;

        let treatmentRows = risk.riskTreatments.map(t => [
            t.reducingImpact || "", 
            t.reducingPossibility || "", 
            t.strategy || "", 
            (t.progress || 0) + "%", 
            t.date || ""
        ]);

        pdf.autoTable({
            startY: currentY,
            head: [["Reducing Impact", "Reducing Possibility", "Strategy", "Progress", "Date"]],
            body: treatmentRows,
            theme: 'grid',
            styles: { fontSize: 9, overflow: 'linebreak', cellPadding: 2 },
            headStyles: { fillColor: headColor, textColor: 255 },
            columnStyles: { 0: { cellWidth: 'auto' } },
            margin: { left: 10, right: 10 },
            didDrawPage: function(data) {
                if (data.pageNumber > 1) header(risk);
            }
        });
        currentY = pdf.lastAutoTable.finalY + 10;

        /* ================================
           RISK MONITORING
        ================================= */
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(risk); }
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("RISK MONITORING", 10, currentY);
        currentY += 6;

        let monitoringRows = [];
        if (risk.reviewMonitoring && risk.reviewMonitoring.length > 0) {
            risk.reviewMonitoring.forEach(m => {
                monitoringRows.push([
                    m.title || "-", 
                    m.status || "-", 
                    (m.progress || 0) + "%", 
                    m.date || "-"
                ]);
            });
            pdf.autoTable({
                startY: currentY,
                head: [["Mitigation Action", "Status", "Progress", "Target Date"]],
                body: monitoringRows,
                theme: 'grid',
                styles: { fontSize: 9, overflow: 'linebreak', cellPadding: 2 },
                headStyles: { fillColor: headColor, textColor: 255 },
                columnStyles: { 0: { cellWidth: 'auto' } },
                margin: { left: 10, right: 10 },
                didDrawPage: function(data) {
                    if (data.pageNumber > 1) header(risk);
                }
            });
            currentY = pdf.lastAutoTable.finalY + 10;
        } else {
            pdf.setFontSize(8);
            pdf.setFont("helvetica", "normal");
            pdf.text("No monitoring records available.", 10, currentY);
            currentY += 10;
        }

        /* ================================
           INHERENT HEAT MAP
        ================================= */
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(risk); }
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("INHERENT HEAT MAP", 10, currentY);
        currentY += 6;

        if (risk.inherentHeatMap && risk.inherentHeatMap.length > 0) {
            let inherentRows = risk.inherentHeatMap.map(row => [
                row.impactName || "-", row.category || "-", row.type || "-",
                row.impactValue || "-", row.likelihoodValue || "-", row.riskScore || "-"
            ]);
            pdf.autoTable({
                startY: currentY,
                head: [["Impact Name", "Risk Impact Category", "Type", "Impact Value", "Likelihood Value", "Risk Score"]],
                body: inherentRows,
                theme: 'grid',
                styles: { fontSize: 9, overflow: 'linebreak', cellPadding: 2 },
                headStyles: { fillColor: headColor, textColor: 255 },
                columnStyles: { 0: { cellWidth: 'auto' } },
                margin: { left: 10, right: 10 },
                didDrawPage: function(data) {
                    if (data.pageNumber > 1) header(risk);
                }
            });
            currentY = pdf.lastAutoTable.finalY + 10;
        }

        /* ================================
           RESIDUAL HEAT MAP - ✅ FIXED
        ================================= */
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(risk); }
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("RESIDUAL HEAT MAP", 10, currentY);
        currentY += 6;

        if (risk.residualHeatMap && risk.residualHeatMap.length > 0) {
            let residualRows = risk.residualHeatMap.map(row => [
                row.controlName || "-", 
                row.category || "-", 
                row.type || "-",
                row.impactValue ?? "-", 
                row.likelihoodValue ?? "-", 
                row.riskScore ?? "-"
            ]);
            pdf.autoTable({
                startY: currentY,
                head: [["Control Name", "Risk Impact Category", "Type", "Impact Value", "Likelihood Value", "Risk Score"]],
                body: residualRows,
                theme: 'grid',
                styles: { fontSize: 9, overflow: 'linebreak', cellPadding: 2 },
                headStyles: { fillColor: headColor, textColor: 255 },
                columnStyles: { 0: { cellWidth: 'auto' } },
                margin: { left: 10, right: 10 },
                didDrawPage: function(data) {
                    if (data.pageNumber > 1) header(risk);
                }
            });
            currentY = pdf.lastAutoTable.finalY + 10;
        } else {
            pdf.setFontSize(8);
            pdf.setFont("helvetica", "normal");
            pdf.text("No residual heat map data available.", 10, currentY);
            currentY += 10;
        }

        /* ================================
           COMMENTS WITH REPLIES - ✅ TWO COLUMN LAYOUT
        ================================= */
        if (currentY > pageHeight - 40) { pdf.addPage(); currentY = header(risk); }
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("COMMENTS", 10, currentY);
        currentY += 6;

        let commentRows = [];

        risk.comments.forEach(c => {
            // Format comment text with user, time, and message
            const commentText = `${c.text || ""}`;
            
            // If no replies, show empty reply cell
            if (!c.replies || c.replies.length === 0) {
                commentRows.push([commentText, ""]);
            } else {
                // First reply: show on same row as comment
                const firstReply = c.replies[0];
                const replyText = `${firstReply.text || ""}`;
                commentRows.push([commentText, replyText]);
                
                // Additional replies: blank comment cell + reply cell (for alignment)
                for (let i = 1; i < c.replies.length; i++) {
                    const extraReply = c.replies[i];
                    const extraReplyText = `${extraReply.user?.name || "Anonymous"} (${extraReply.time || ""})\n${extraReply.text || ""}`;
                    commentRows.push(["", extraReplyText]);
                }
            }
        });

        pdf.autoTable({
            startY: currentY,
            head: [["Comment", "Reply"]],  // ✅ Two columns: Comment | Reply
            body: commentRows,
            theme: 'grid',
            styles: { 
                fontSize: 9, 
                overflow: 'linebreak', 
                cellPadding: 3,
                rowPageBreak: 'avoid',
                lineColor: [200, 200, 200],
                lineWidth: 0.1
            },
            headStyles: { 
                fillColor: headColor, 
                textColor: 255,
                fontStyle: 'bold',
                halign: 'center'
            },
            columnStyles: { 
                0: { 
                    cellWidth: '47%', 
                    fontStyle: 'normal',
                    valign: 'top'
                },   // Comment column
                1: { 
                    cellWidth: '47%', 
                    fontStyle: 'italic',
                    valign: 'top',
                    fillColor: [250, 250, 250]  // Light gray background for replies
                }    // Reply column
            },
            margin: { left: 10, right: 10 },
            didDrawPage: function(data) {
                if (data.pageNumber > 1) header(risk);
            },
            // Optional: Add visual indicator for reply cells with content
            didParseCell: function(data) {
                if (data.section === 'body' && data.column.index === 1 && data.cell.raw) {
                    data.cell.styles.fontStyle = 'italic';
                }
            }
        });
        currentY = pdf.lastAutoTable.finalY + 10;

        if (i < riskPdfData.length - 1) {
            pdf.addPage();
        }
    }

    /* -----------------------------------------------------------
       PAGE NUMBERS
    ------------------------------------------------------------*/
    const totalPages = pdf.internal.getNumberOfPages();
    const reportPageCount = totalPages - (reportStartPage - 1);
    for (let i = reportStartPage; i <= totalPages; i++) {
        pdf.setPage(i);
        footer(i - (reportStartPage - 1), reportPageCount);
    }

    pdf.save("Risk_Register_Report.pdf");
}

function togglePopup(id) {
    var popup = document.getElementById(id);
    if (popup.style.display === "none") {
        popup.style.display = "block";
    } else {
        popup.style.display = "none";
    }
}