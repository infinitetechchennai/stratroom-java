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
var riskviewpermission = true;
var riskcontentload = false;

var causecreatepermission = false;
var causeeditpermission = false;
var causedeletepermission = false;
var causeviewpermission = true;
var causecontentload = false;

var concreatepermission = false;
var coneditpermission = false;
var condeletepermission = false;
var conviewpermission = true;
var concontentload = false;

var comcreatepermission = false;
var comeditpermission = false;
var comdeletepermission = false;
var comviewpermission = true;
var comcontentload = false;
let riskMatrix = {};

var plancreatepermission = false;
var planeditpermission = false;
var plandeletepermission = false;
var planviewpermission = true;
var plancontentload = false;

var actioncreatepermission = false;
var actioneditpermission = false;
var actiondeletepermission = false;
var actionviewpermission = true;
var actioncontentload = false;
var monitoringname = "";

const departmentSelect = document.getElementById('department_select');
const pageSelect = document.getElementById('page_select');


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
		url : "/stratroom/pageDeptList/"+departmentId+"?pageType=risk",
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



function getpagenameView(pageNo) {
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

function getriskpermission() {
	$.ajax({
		type: "GET",
		url: "/stratroom/user/modulePermissions?moduleName=Risk",
		async: false,
		success: function (data) {
			if (data.Risk != undefined && !jQuery.isEmptyObject(data.Risk)) {
				riskmodPermission = data.Risk.Risk;
				// cause
				
				if (data.Risk.Cause.privilegeView != undefined && data.Risk.Cause.privilegeView == "TRUE") {
					causeviewpermission = true;
				}
				// con
				
				if (data.Risk.Consequence.privilegeView != undefined && data.Risk.Consequence.privilegeView == "TRUE") {
					conviewpermission = true;
				}
			
				if (data.Risk.Comments.privilegeView != undefined && data.Risk.Comments.privilegeView == "TRUE") {
					comviewpermission = true;
				}
				// plan
				
				if (data.Risk.Plan.privilegeView != undefined && data.Risk.Plan.privilegeView == "TRUE") {
					planviewpermission = true;
				}
				// action
				
				if (data.Risk.Action.privilegeView != undefined && data.Risk.Action.privilegeView == "TRUE") {
					actionviewpermission = true;
				}
			}
		}
	});
}

$(document).ready(function () {
	
	loadDepartments();

});

function fetchRisk(pagenumber)
{
	pageNo=pagenumber;
	console.log("PAge Numbers ::: " + pageNo);
	getpagenameView(pagenumber);
	getriskpermission();
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
		riskcreatepermission = false;
	}

	if (riskmodPermission.privilegeUpdate != undefined && riskmodPermission.privilegeUpdate == "TRUE") {
		riskeditpermission = false;
	}

	if (riskmodPermission.privilegeDelete != undefined && riskmodPermission.privilegeDelete == "TRUE") {
		riskdeletepermission = false;
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

	if (plancontentload == false) {
		$("#risktreatmentbody").remove();
		$("#riskreviewmonitoringbody").remove();
		$("#riskreducingimpactbody").remove();

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

	var url = "riskListView";
	if (pageNo != "" && pageNo != undefined && pageNo != 0 && urldateperiod != "" && urldateperiod != undefined && urldateperiod != null) {
		url = "riskListView?pageId=" + pageNo + "&dateRange=" + urldateperiod;
		$.ajax({
			url: url,
			async: false,
			success: riskSuccessCallback,
		});
	}else if(pageNo != "" && pageNo != undefined && pageNo != 0 )
		{
			url = "riskListView?pageId=" + pageNo + "&dateRange=" +$('#datePeriod').val().toString();

			$.ajax({
				url: url,
				async: false,
				success: riskSuccessCallback,
			});
		}
	
}



pageSelect.addEventListener('change', function () {
	selectedpage = this.value;
   if (selectedpage) {
		fetchRisk(selectedpage);
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

	var desc = $("#risk_comments_Form input[name='riskCommentsReply']").val();
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
function handleRiskActivitiesEvent(finalId,type,action) {

	$("#riskActionmonitoringForm").css('display', 'none');
	$("#riskActionmonitoringForm").trigger("reset");
	$('#risk_action_desc_popup').modal('toggle');
	$("#riskActionmonitoringForm input[name='riskaction_id']").val(finalId);
	$("#riskActionmonitoringForm input[name='id']").val(finalId);
	// $("#riskActionmonitoringForm input[name='riskPlanId']").val(riskplanid);
	// $("#riskPlanId").val(riskplanid);
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
			url: "/stratroom/riskActivities/"+finalId+"riskType="+type,
			success: riskActivitiesSuccessCallback
		});
	}
}

function riskActivitiesSuccessCallback(activitiesData) {
	$("#riskActionmonitoringForm").css('display', 'block');
	$('#riskaction_id').val(activitiesData.id);
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
		"createdBy": currentEmp,
		"owner": currentEmp,
		"active": 0,
		"parentchangeId":$("#activitieschangeid").val(),
		// "changeId":$("#activitieschangeid").val(),
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



function handleRiskPlanEvent(finalId, type, riskId, action) {
    console.log({ finalId, type, riskId, action }); // Debugging the received parameters

    $("#riskPlanForm").css('display', 'none');
    $("#riskPlanForm").trigger("reset");
    $('#plan_desc_add_popup').modal('toggle');
    $("#riskPlanForm input[name='riskId']").val(riskId);
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





function handleRiskTreatmentEvent(finalId, type,action,riskId) {

    $("#riskTreatmentForm").css('display', 'none');
    $("#riskTreatmentForm").trigger("reset");
    $('#risk_treatment_add_popup').modal('toggle');
    $("#riskTreatmentForm input[name='riskId']").val(riskId);
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
	$('#riskId').val(detailObj.riskId);
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
	$('#riskId').val(detailObj.riskId);
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
		"owner": currentEmp,
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
		"owner": currentEmp,
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
			serviceObj.multipleOwners = currentEmp;
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

function handleReviewMonitoringEvent(finalId,type,action, riskId) {


	$('#risk_monitoring_popup').modal('toggle');

	$("#riskMonitorForm").trigger("reset");
	$("#riskMonitor_riskid").val(riskId);
	$("#riskMonitorForm input[name='action']").val(action);
	$("#monitoring-action").val(action)
	$("#monitoring_name").val(monitoringname);
	console.log(action)
	// console.log(id)
	if (action == 'delete') {
		$("#riskMonitor_riskid").val(id);

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
	riskmonitoringupdateDescription = detailObj;
	$("#riskMonitorForm").css('display', 'block');
	$('#riskId').val(detailObj.riskId);
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
		"createdBy": currentEmp,
		"owner": currentEmp,
		"riskId": $("#riskId").val(),
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
			serviceObj.multipleOwners = currentEmp;
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
	$('#riskDetail_id').val(riskDetailData.id);
	if (riskDetailData.riskUniqueId) {
		$('#riskUniqueId').val(riskDetailData.riskUniqueId);

	} else {
		$('#riskUniqueId').val("");
	}

	var startdate = new Date(riskDetailData.riskValue.dateRaised);

	// $('#risk_owner').val(riskDetailData.owner);
	$('#riskDetail_name').val(riskDetailData.riskValue.name);
	$('#riskcategory-select').val(riskDetailData.riskValue.riskcategory).trigger("chosen:updated");
	$('#calculate_status').val(riskDetailData.riskValue.riskStatus);
	$('#calculate_score').val(riskDetailData.riskValue.score);
	$("#riskDetail_dateRaised").val(riskDetailData.createdTime);
	$("#businessimpact").val(riskDetailData.impactId).trigger("chosen:updated");
	$("#Initiative_Department").val(riskDetailData.riskValue.departmentId).trigger("chosen:updated");
	if (riskDetailData.riskValue.relatedparties) {
		var partiesArray = riskDetailData.riskValue.relatedparties.split(',');
		$("#relatedparties_select").val(partiesArray).trigger('change');

	}

	$("#impact-select").val(riskDetailData.riskValue.impact).trigger("chosen:updated");


	$("#financialimpact").val(riskDetailData.riskValue.financialImpact);
	$("#Likelihood-select").val(riskDetailData.riskValue.likeliHood).trigger("chosen:updated");
	$("#riskDetail_description").val(riskDetailData.riskValue.desc);
	$("#raise_date").val(riskDetailData.riskValue.dateRaised);
	$("#department").val(riskDetailData.riskValue.departmentId);
	$("#riskDetail_complete_date").val(riskDetailData.riskValue.dateCompleted);
	$("#riskDetail_next_date").val(riskDetailData.riskValue.nextAssessment);
	$("#riskDetail_areaImpact").val(riskDetailData.riskValue.areaImpact);
	$("#riskkpicheck").prop('checked', riskDetailData.riskValue.riskkpicheck);

	$("#riskposcheck").prop('checked', riskDetailData.riskValue.riskposcheck);

	$("#riskisocheck").prop('checked', riskDetailData.riskValue.riskisocheck);
	$("#riskinformatiomassetcheck").prop('checked', riskDetailData.riskValue.riskinformatiomassetcheck);
	$("#riskotherscheck").prop('checked', riskDetailData.riskValue.riskotherscheck);

	$("#riskposval").val(riskDetailData.riskValue.riskpos);
	$("#riskisoval").val(riskDetailData.riskValue.riskiso);
	$("#riskinformationassetval").val(riskDetailData.riskValue.riskinformationasset);
	$("#riskothersval").val(riskDetailData.riskValue.riskothers);


	// $("#riskdetail_status").val(riskDetailData.riskValue.status);
	$("#impact").val(
		riskDetailData.riskValue.impact);
	$("#riskDetailCreatedById").val(riskDetailData.createdBy);
	$("#riskDetailCreatedBy").html(riskDetailData.riskValue.createdByName);
	$("#riskDetailUpdatedBy").html(riskDetailData.riskValue.updatedByName);
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
	var numberOfOptions = $(elementId + ' > option').length;
	$.ajax({
		url: "/stratroom/allDepartmentList",
		async: false,
		success: function (data) {
			$.each(data, function (index, reportee) {
				addOption(elementId, reportee.name, reportee.id)
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



function handleRiskDetailEvent(id, action) {
	$("#riskDetailForm").css('display', 'none');
	$("#riskDetailForm").trigger('reset');
	$("#riskDetailaction").val(action);
	$('.riskDetail_description_popup').modal('toggle');
	// populateKPIList('.riskDetail_description_popup #riskDetail_areaImpact');
	$('#strength_impact').find('option').remove().end();
	// $('#Initiative_Department').find('option').remove().end();
	$('.riskDetail_description_popup #Initiative_Department').append(
		`<option value="">Choose</option>`);
	$('#monitoring_person').find('option').remove().end();
	$('#relatedparties_select').find('option').remove().end();

	$('.riskDetail_description_popup #businessimpact').append(
		`<option value="" data-i18n="Choose">Choose</option>`);
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
			url: "/stratroom/risk/" + id,
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
	var DataObj = {
		"riskValue": {}
	};
	console.log($('#riskUniqueId').val())
	console.log(action)
	if (action == "edit") {
		var selectedOptions = $('#relatedparties_select').select2('data').map(function(option) {
			return option.text;
		});
		console.log(selectedOptions)
		var commaSeparated = selectedOptions.join(','); // Join the array into a comma-separated string
		DataObj["id"] = $('#riskDetail_id').val();

		DataObj["riskUniqueId"] = $('#riskUniqueId').val();
		DataObj["impactId"] = $("#businessimpact").val();
		DataObj["departmentId"] = $("#Initiative_Department").val();
		DataObj["riskValue"]["relatedparties"] = commaSeparated;

		DataObj["riskValue"]["name"] = $("#riskDetail_name").val();
		DataObj["riskValue"]["desc"] = $("#riskDetail_description").val();
		DataObj["riskValue"]["riskcategory"] = $("#riskcategory-select").val();
		DataObj["riskValue"]["impact"] = $("#impact-select").val();
		DataObj["riskValue"]["departmentId"] = $("#Initiative_Department").val();

		// DataObj["riskValue"]["areaImpact"] =
		// $("#riskDetail_areaImpact").val();
		DataObj["riskValue"]["department"] = $("#department").val();

		DataObj["riskValue"]["riskStatus"] = $("#calculate_status").val();
		DataObj["riskValue"]["score"] = $("#calculate_score").val();
		DataObj["riskValue"]["dateRaised"] = $("#raise_date").val();
		DataObj["riskValue"]["dateCompleted"] = $("#riskDetail_complete_date")
			.val();
		DataObj["riskValue"]["nextAssessment"] = $("#riskDetail_next_date")
			.val();

		DataObj["riskValue"]["businessimpact"] = $("#businessimpact").val();
		DataObj["riskValue"]["financialImpact"] = $("#financialimpact").val();
		DataObj["riskValue"]["likeliHood"] = $("#Likelihood-select").val();
		DataObj["riskValue"]["riskkpicheck"] = $("#riskkpicheck").prop('checked');
		DataObj["riskValue"]["riskposcheck"] = $("#riskposcheck").prop('checked');
		DataObj["riskValue"]["riskisocheck"] = $("#riskisocheck").prop('checked');

		DataObj["riskValue"]["riskpos"] = $("#riskposval").val()
		DataObj["riskValue"]["riskiso"] = $("#riskisoval").val();
		DataObj["riskValue"]["riskothers"] = $("#riskothersval").val()

		console.log($("#riskinformationassetval").val())
		DataObj["riskValue"]["riskinformationasset"] = $("#riskinformationassetval").val();

		DataObj["riskValue"]["riskinformatiomassetcheck"] = $("#riskinformatiomassetcheck").prop('checked');
		DataObj["riskValue"]["riskotherscheck"] = $("#riskotherscheck").prop('checked');


		DataObj["owner"] = currentEmp;

		$.each(riskupdateDescription,
			function (index, value) {
				if (index != "impactId" && index != "owner"
					&& index != "riskValue") {
					DataObj[index] = value;
				}
			});

		$.each(riskupdateDescription.riskValue, function (riskindex, value) {
			if (riskindex != "name" && riskindex != "desc"
				&& riskindex != "riskcategory" && riskindex != "likeliHood"
				&& riskindex != "score" && riskindex != "riskStatus"
				&& riskindex != "impact" && riskindex != "dateRaised"
				&& riskindex != "departmentId"
				&& riskindex != "dateCompleted"
				&& riskindex != "nextAssessment"
				&& riskindex != "businessImpact"
				&& riskindex != "riskinformationasset"
				&& riskindex != "riskinformatiomassetcheck"
				&& riskindex != "riskotherscheck"
				&& riskindex != "riskkpicheck"
				&& riskindex != "riskposcheck"
				&& riskindex != "riskisocheck"
				&& riskindex != "riskisocheck"
				&& riskindex != "relatedparties"
				&& riskindex != "riskpos"
				&& riskindex != "riskiso"
				&& riskindex != "riskothers"
				&& riskindex != "financialImpact") {
				DataObj["riskValue"][riskindex] = value;
			}
		});

	} else {
		var selectedOptions = $('#relatedparties_select').select2('data').map(function(option) {
			return option.text;
		});
		
		var commaSeparated = selectedOptions.join(','); // Join the array into a comma-separated string

		var DataObj = {
			"createdBy": $("#riskDetailCreatedById").val(),
			"riskUniqueId": $("#riskUniqueId").val(),
			"impactId": $("#businessimpact").val(),
			"departmentId": $("#Initiative_Department").val(),
			"owner": currentEmp,
			"riskValue": {
				"name": $("#riskDetail_name").val(),
				"score": $("#calculate_score").val(),
				"relatedparties": commaSeparated,
				"riskcategory": $("#riskcategory-select").val(),
				"financialImpact": $("#financialimpact").val(),
				"likeliHood": $("#Likelihood-select").val(),
				"impact": $("#impact").val(),
				"departmentId":$("#Initiative_Department option:selected").text(),
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
function handleRiskCauseEvent(finalId, riskId, type, action) {
	console.log(finalId,"id")
    $("#riskCauseForm").css('display', 'none');
    $("#riskCauseForm").trigger('reset');
    $('.cause_conq_popup').modal('toggle');
    $("#riskCauseForm input[name='action']").val(action);
    $("#riskCauseForm input[name='riskId']").val(riskId);

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
		// riskDetail.riskId = $("#riskCauseForm input[name='riskId']").val();
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
		"parentchangeId":$("#causeChangeIddraft").val(),
		"createdBy": $("#causeCreatedById").val(),
		"changeId":$("#causeChangeId").val(),
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
	$("#riskId").val(riskDetailData.riskId);
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
function deleteRiskMonitoring(finalId) {
	$("#deleterecordid").val(id);
	$("#deleterecordtype").val("RiskMonitoring");
	$('#deleteModalrisk').modal('toggle');
	$(window).on("resize", function () {
		$(".modal:visible").each(alignModal);
	});
	$(".modal").on("shown.bs.modal", alignModal);
}

function handleRiskConqEvent(finalId, conqId, action,type) {
	$("#riskConqForm").css('display', 'none');
	$('.sub_cause_conq_popup').modal('toggle');
	$("#riskConqForm").trigger('reset');
	$("#conqaction").val(action);
	$("#riskConqForm input[name='causeId']").val(conqId);

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
		// "changeId":$("#conqChangeId").val(),
		"parentchangeId":$("#conqChangeId").val(),
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


function planrecordsviewSuccessCallback(result) {
	var defaultreporteelist = {
		"id": riskupdateDescription.createdBy,
		"name": riskupdateDescription.riskValue.createdByName,
		"image": riskupdateDescription.riskValue.riskImage
	};


	var sub_initiatiesrow = "";
	var subinitiativeProgressBar = "";

	var sub_initiatiesrow = '<div class="panel-group risk-panel-group" id="risk_accordion_10" role="tablist" aria-multiselectable="true">';
	var riskcollapse = 10;
	var chartcontent01 = [];
	var chartcontent02 = [];
	$
		.each(
			result,
			function (index, item) {

				var chartvalue = parseInt(100)
					- parseInt(item.riskPlanValue.progress);
				var chartbalance = item.riskPlanValue.progress;

				if (chartvalue == 0) {
					chartbalance = 100;
				}

				var resultPorfileContent = subinitiatiesPorfileFormationrisk(
					item.ownerList, defaultreporteelist,
					'subinitiatives');
				sub_initiatiesrow += '<div class="panel risk-panel panel-col_border"><div class="panel-heading risk-panel-heading" role="tab" id="risk_headingOne_10"><div class="panel-title_risk">';
				sub_initiatiesrow += '<div class="d-flex flex-row employe_content_border sub_initiative_details" style="margin-bottom: 0px; width: 100%;"><div class="d-flex flex-column flex-fill profile_content" style="width:100%;"><div class="d-flex flex-row"><a role="button" data-toggle="collapse" data-parent="#risk_accordion_10" href="#risk_collapseOne_'
					+ riskcollapse
					+ `'" aria-expanded="false" aria-controls="risk_collapseOne_10" class="collapsed" style="padding: 0px 0px !important;"><div class="d-flex flex-column init_flex_profile" style="color: #1e252d;"margin-left: 10px><pre style="white-space: pre-wrap;font-family:'Poppins',sans-serif;">'`
					+ item.riskPlanValue.name
					+ '</pre></div></a><div class="d-flex flex-column"><ul class="list-unstyled order-list d-flex">'
					+ resultPorfileContent
					+ '</ul></div></div><div class="d-flex flex-row"><div class="d-flex flex-column flex-fill"><div class="d-flex flex-row"><div class="icon"><div id="two" class="view_paln_chart_green_'
					+ item.id
					+ ' view_plan_chart_pie_'
					+ item.id
					+ '"></div></div><div class="pie-progress" style="color: #1e252d;">'
					+ item.riskPlanValue.progress
					+ '</div></div></div><div class="d-flex flex-column flex-fill"><div><strong style="color: #1e252d;">'
					+ item.riskPlanValue.action
					+ '</strong></div></div><div class="d-flex flex-column"><div><strong style="color: #1e252d;">'
					+ item.riskPlanValue.resolveDate
					+ '</strong></div></div></div>';
				sub_initiatiesrow += '</div></div></div></div>';
				chartcontent01.push({
					"index": item.id,
					"chartbalance": chartbalance,
					"chartvalue": chartvalue
				});

				
					$
						.each(
							item.riskActivitiesDTOList,
							function (index, item1) {

								var activitychartvalue = parseInt(100)
									- parseInt(item1.riskActivitiesValue.progress);
								var activitychartbalance = item1.riskActivitiesValue.progress;

								if (activitychartvalue == 0) {
									activitychartbalance = 100;
								}
								chartcontent02
									.push({
										"index": item1.id,
										"chartbalance": activitychartbalance,
										"chartvalue": activitychartvalue
									});
								sub_initiatiesrow += '<div id="risk_collapseOne_'
									+ riskcollapse
									+ '" class="panel-collapse in collapse show" role="tabpanel" aria-labelledby="risk_headingOne_10" style="">';
								sub_initiatiesrow += `'<div class="d-flex flex-row employe_content_border sub_initiative_details" style="margin: 11px 4px;"><div class="d-flex flex-column flex-fill profile_content"><div class="d-flex flex-row"><div class="d-flex flex-column init_flex_profile"><p style="width:85%;"><pre style="white-space: pre-wrap;font-family:'Poppins',sans-serif;">'`
									+ item1.riskActivitiesValue.name
									+ '</pre></p></div><div class="d-flex flex-column"><div><strong>'
									+ item1.riskActivitiesValue.status
									+ '</strong></div></div></div><div class="d-flex flex-row"><div class="d-flex flex-column flex-fill"><div class="d-flex flex-row"><div class="icon"><div id="two" class="view_activity_chart_green_'
									+ item1.id
									+ ' view_activity_chart_pie_'
									+ item1.id
									+ '"></div></div><div class="pie-progress">'
									+ item1.riskActivitiesValue.progress
									+ '</div></div></div><div class="d-flex flex-column"><div>'
									+ item1.riskActivitiesValue.resoleveby
									+ '</div></div></div></div></div></div>';
							});
				
				sub_initiatiesrow += '</div>';
				riskcollapse++;
			});
	sub_initiatiesrow += '</div>';
	$("#subinitiaties-row-box_view").html('');
	$("#subinitiaties-row-box_view").html(sub_initiatiesrow);
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
				sub_initiatiesrow += '<div class="panel risk-panel panel-col_border"><div class="panel-heading risk-panel-heading" role="tab" id="risk_headingOne_10"><div class="panel-title_risk">';
				sub_initiatiesrow += '<div class="d-flex flex-row employe_content_border sub_initiative_details" style="margin-bottom: 0px; width: 100%;"><div class="d-flex flex-column flex-fill profile_content" style="width:100%;"><div class="d-flex flex-row"><a role="button" data-toggle="collapse" data-parent="#risk_accordion_10" href="#risk_collapseOne_'
					+ riskcollapse
					+ `'" aria-expanded="false" aria-controls="risk_collapseOne_10" class="collapsed" style="padding: 0px 0px !important;"><div class="d-flex flex-column init_flex_profile" style="color: #1e252d;"><p style="width:95%;"><pre style="white-space: pre-wrap;font-family:'Poppins',sans-serif;" >'`
					+ item.riskMonitoringValue.mitigation
					+ '</pre></p></div></a><div class="d-flex flex-column"><ul class="list-unstyled order-list d-flex">'
					+ resultPorfileContent
					+ '</ul></div></div><div class="d-flex flex-row"><div class="d-flex flex-column flex-fill"><div class="d-flex flex-row"><div class="icon"><div id="two" class="view_paln_chart_green_'
					+ item.id
					+ ' view_plan_chart_pie_'
					+ item.id
					+ '"></div></div><div class="pie-progress" style="color: #1e252d;">'
					+ item.riskMonitoringValue.progress
					+ '</div></div></div><div class="d-flex flex-row" style="color: #1e252d;"><div class="d-flex flex-column flex-fill"><div><strong style="margin-right: 100px;">'
					+ status
					+ '</strong></div></div><div class="d-flex flex-column"><div><strong>'
					+ item.riskMonitoringValue.changestime
					+ '</strong></div></div></div>';
				sub_initiatiesrow += '</div></div></div></div>';
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
				if (currentuserlike.length > 0 && $.inArray(Number(currentEmp), currentuserlike) !== -1) {
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

		$('#risk_sidebar').empty();
		if (jQuery.isEmptyObject(data)) {
			var riskhtml = `<div class="collapse_arrow_right" style="display: none;">
				<i class="arrow_collapse_size fas fa-caret-right"></i>
			</div>
			<div class="collapse_arrow_left">
				<i class="arrow_collapse_size fas fa-caret-left"></i>
			</div>`;
			$('#risk_top_details').append(riskhtml);
			$('.collapse_arrow_left').css('display', 'block');
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

		}



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
					url: "/stratroom/risk/" + initiative_load_id + "?loadFlag=true&riskType=" + (initiative.draft === "Draft" ? "draft" : "risk"),
					success: function (data) {
						$('#risk_top_details').empty();
						$('#causeconsequencebody').empty();
						$('#riskreducingimpactbody').empty();
						$('#riskreviewmonitoringbody').empty();
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


			var duedate = initiative.riskValue.ch_dateCompleted;

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
					id: initiative.changeId,
					impactId: initiative.impactId,
					dueDate: duedate,
					riskStatus: initiative.riskValue.riskStatus,
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
					initiativeProgressBar: initiativeProgressBar,
					initiativeSidebarHighLight: (initiative_load_id == initiative.id ? "riskSidebarHighLight" : "")
				};
				$('#risk_sidebar').append(template(finalHtml));
			}
		});

		$('.riskuser').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
	}
}

function riskdescSuccessCallback(result, initiative_load_id) {

	console.log(result,"result");
	var initiativedettemplate = $('#riskdetail-template').html();
	var template = Handlebars.compile(initiativedettemplate);
	var commentsHeader = "Comments";

	detailrisk = result;

	$("#causeChangeIddraft").val(result.changeId);
	$("#activitieschangeiddraft").val(result.changeId);
	$("#riskPlanchangeiddraft").val(result.changeId);
	$("#planchangeIddraft").val(result.changeId);
	$("#riskMonitorChangeIddraft").val(result.changeId);
	$("#riskTreatmentChangeIddraft").val(result.changeId);
	$("#conqChangeIddraft").val(result.changeId);
	$("#apichangeIddraft").val(result.changeId);
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
		dept: result.riskValue.department,
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
	riskChart(result, 'riskload');
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
		const finalId = result.id === 0 ? result.changeId : result.id;
		const type = result.id === 0 ? 'draft' : 'risk';
		createcauseIcon = `<div class="create_initives add-sub-initiative">
									<span class="sub_initiative" data-toggle="modal"
										data-target=".cause_conq_popup"
										onclick="handleRiskCauseEvent(0,'${finalId}','${type}','add')"><i
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
					const finalId = item.id === 0 ? item.changeId : item.id;
					const type = item.id === 0 ? 'draft' : 'risk';
					$("#conqChangeId").val(finalId);
					subcausepermissionOptions += `<li><a href="#" data-toggle="modal"
																				data-target=".sub_cause_conq_popup"
																				onclick="handleRiskConqEvent(${finalId},${type},'add')">Add</a>
																			</li>`;
				}
				if (causeeditpermission == true) {
					const finalId = item.id === 0 ? item.changeId : item.id;
					const type = item.id === 0 ? 'draft' : 'risk';
					subcausepermissionOptions += `<li><a href="#" data-toggle="modal"
														 data-target=".cause_conq_popup"
														 onclick="handleRiskCauseEvent(${finalId}, ${finalId}, '${type}', 'edit')">Edit</a>
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
								const finalId = item1.id === 0 ? item1.changeId : item1.id;
								const type = item1.id === 0 ? 'draft' : 'risk';
								
								subconqcausepermissionOptions += `<li><a href="#" data-toggle="modal"
																					data-target=".sub_cause_conq_popup"
																					onclick="handleRiskConqEvent(`+ finalId+ `,`+ type+ `,` + item1.causeConqId + `,'edit')">Edit</a>
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
		const finalId = result.id === 0 ? result.changeId : result.id;
		const type = result.id === 0 ? 'draft' : 'risk';
		createriskIcon = `<div class="create_initives add-sub-initiative">
									<span class="sub_initiative" data-toggle="modal"
										data-target=".plan_desc_add_popup" onclick="handleRiskPlanEvent(${finalId},${type},'add')"><i
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

	var defaultreporteelist = {
		"id": riskupdateDescription.createdBy,
		"name": riskupdateDescription.riskValue.createdByName,
		"image": riskupdateDescription.riskValue.riskImage
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
				const finalId = item.id === 0 ? item.changeId : item.id;
		        const type = item.id === 0 ? 'draft' : 'risk';
				$("#activitieschangeid").val(finalId);
				risktreatmentpermissionOptions += `<li><a href="#" data-toggle="modal" data-target=".activity_desc_add_popup" onclick="handleRiskActivitiesEvent('${finalId}','${type}', 'add')">Add</a></li>`;
			}
			if (planeditpermission) {
				const finalId = item.id === 0 ? item.changeId : item.id;
				const type = item.id === 0 ? 'draft' : 'risk';
				risktreatmentpermissionOptions += `<li><a href="#" data-toggle="modal" 
                                         data-target=".plan_desc_add_popup" 
                                         onclick="handleRiskPlanEvent(${finalId}, '${type}', ${finalId}, 'edit')">Edit</a></li>`;

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
	var finalId = result.id === 0 ? result.changeId : result.id;
		var type = result.id === 0 ? 'draft' : 'risk';
	var createriskIcon = "";
	if (plancreatepermission == true) {
	createriskIcon = `<div class="create_initives add-sub-initiative">
	<span class="sub_initiative" data-toggle="modal"
		data-target=".risk_treatment_add_popup" onclick="handleRiskTreatmentEvent('${finalId}','${type}','add'))">
		<i class="fa fa-plus"></i>Add</span>
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
		"name": riskupdateDescription.riskValue.createdByName,
		"image": riskupdateDescription.riskValue.riskImage
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
				const finalId = item.id === 0 ? item.changeId : item.id;
					const type = item.id === 0 ? 'draft' : 'risk';
				risktreatmentpermissionOptions += `<li><a href="#" data-toggle="modal"
																data-target=".risk_treatment_add_popup"
																onclick="handleRiskTreatmentEvent(${finalId}, '${type}', ${finalId}, 'edit')">Edit</a>
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
		data-target=".risk_treatment_add_popup" onclick="handleRiskTreatmentEvent('${finalId}','${type}', 'add')"><i class="fa fa-plus"></i>Add</span>
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
		"name": riskupdateDescription.riskValue.createdByName,
		"image": riskupdateDescription.riskValue.riskImage
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
				const finalId = item.id === 0 ? item.changeId : item.id;
					const type = item.id === 0 ? 'draft' : 'risk';
				risktreatmentpermissionOptions += `<li><a href="#" data-toggle="modal"
																data-target=".risk_monitoring_popup"
																onclick="handleReviewMonitoringEvent(${finalId}, '${type}', ${finalId}, 'edit')">Edit</a>
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
                            data-target=".risk_monitoring_popup" onclick="handleReviewMonitoringEvent('${finalId}','${type}', 'add')">
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
	var commentRows = "";
	if (comcontentload) {
		$.each(result.riskCommentsList, function (index, comments) {
			var commentsRowTemplate = $('#risk-comments-row-template').html();
			var timeformatted = new Date(comments.riskCommentsValue.formattedDateTime);
		
			// Formatting time
			timeformatted = formatofAmPm(timeformatted);
		
			// Handling user names
			if (comments.riskCommentsValue.createdByName == undefined || comments.riskCommentsValue.createdByName == "") {
				var commentsuser = comments.updatedBy;
				var name = comments.riskCommentsValue.updatedByName;
			} else {
				var name = comments.riskCommentsValue.createdByName;
				var commentsuser = comments.createdBy;
			}
		
			var username = name.slice(0, 2);
			var riskimage = comments.riskCommentsValue.commentsImage;
		
			// Handling image and username
			if (riskimage == "" || riskimage == " " || riskimage == null || riskimage == undefined) {
				var Owner = 'data-name="' + username + '" class="rounded-circle commentsuser" ';
			} else {
				var Owner = ' class="rounded-circle" src="' + riskimage + '"';
			}
		
			var title = (comments.riskCommentsValue.title != undefined && comments.riskCommentsValue.title != "" ? comments.riskCommentsValue.title : "")
			var commentsName = capitalizeFLetter(comments.riskCommentsValue.desc);
			
			// Initialize the replies array
			var replies = []; 
		
			// Accumulating replies
			if (comments.replyComments && comments.replyComments.length > 0) {
				$.each(comments.replyComments, function (index, replyItem) {
					var replyId = replyItem.id;
					var reply = replyItem.riskCommentsValue;
					var commentsParendId = replyItem.commentsParendId;
		
					replies.push({
						commentsParendIdreply:commentsParendId,
						replyId: replyId,  // Add the replyId to the replies array
						replyCommentsName: reply.desc || '',
						replyCreated: reply.createdByName || '',
						replyTime: reply.formattedTime || '',
						replyTitle: reply.title || ''
					});
				});
			}
		
			console.log(replies, "replies");
		
			// If no permissions to edit or delete, clear options
			if (riskdeletepermission == false && riskeditpermission == false) {
				commentsrowOptions = "";
				commentsrowReplyOptions = "";
		
			} else {
				// Comment options
				commentsrowOptions = `<ul class="header-dropdown m-r--2 pt-2 d-flex">
								<li class="dropdown">
									<a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
										<i class="material-icons">more_vert</i>
									</a>
									<ul class="dropdown-menu editoptionparentdropdown-menu pull-right">`;
		
				if (riskeditpermission == true) {
					commentdesc = comments.riskCommentsValue.desc;
					commentsrowOptions += `<li>
											<a href="#" data-toggle="modal" data-target=".risk_comments_update_popup" 
											onclick="handleEditRiskCommentsPopUp(${comments.id}, ${comments.riskId}, '${commentdesc}')">Edit</a>
										</li>`;
				}
		
				if (riskdeletepermission == true) {
					commentsrowOptions += `<li><a href="#" onclick="deleteRiskComments(${comments.id})">Delete</a></li>`;
				}
		
				commentsrowOptions += `</ul></li></ul>`;
		
				// Reply options
				commentsrowReplyOptions = `<ul class="header-dropdown m-r--2 pt-2 d-flex">
						<li class="dropdown">
							<a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
								<i class="material-icons">more_vert</i>
							</a>
							<ul class="dropdown-menu editoptionparentdropdown-menu pull-right">`;
		
							comments.replyComments.forEach(function (commentreplydesc) {
								console.log(commentreplydesc, "commentreplydes");
								var cId = commentreplydesc.id;
								var cmdId = commentreplydesc.commentsParendId;
								var cmdDesc = commentreplydesc.riskCommentsValue?.desc || '';
							
								commentsrowReplyOptions += '<li>';
							
								// Check for edit permission and add Edit option
								if (riskeditpermission == true) {
									commentsrowReplyOptions += `
										<a href="#" data-toggle="modal" data-target=".risk_commentsreply_update_popup" 
										onclick="handleEditRiskReplyCommentsPopUp('${cmdDesc.replace(/'/g, "\\'")}', ${cmdId}, ${cId})">Edit</a>`;
								}
							
								// Check for delete permission and add Delete option
								if (riskdeletepermission == true) {
									commentsrowReplyOptions += `
										<a href="#" onclick="deleteRiskReplyComments(${cId})">Delete</a>`;
								}
							
								commentsrowReplyOptions += '</li>';
							});
							
							
		
				commentsrowReplyOptions += `</ul></li></ul>`;
			}
		
			// Handle likes
			var currentuserlike = (comments.likeEmpIds != undefined && comments.likeEmpIds != null ? comments.likeEmpIds : []);
			var likeText = "Like";
			var likeTextclass = "";
			if (currentuserlike.length > 0 && $.inArray(Number(currentEmp), currentuserlike) !== -1) {
				likeText = "Unlike";
				likeTextclass = "green";
			}
		
			// Render the comment details using Mustache
			var commentDetails = Mustache.render(commentsRowTemplate, {
				id: comments.id,
				initiativeId: result.id,
				title: title,
				commentsName: commentsName,
				replies: replies,  // Pass the array of replies to the template
				createdByName: name,
				Owner: Owner,
				likeText: likeText,
				likeTextclass: likeTextclass,
				count: (comments.likeCount != undefined && comments.likeCount != null ? comments.likeCount : 0),
				createdTime: timeformatted,
				commentsrowOptions: commentsrowOptions,
				commentsrowReplyOptions: commentsrowReplyOptions
			});
			
			commentRows = commentRows + commentDetails;
		});
		
	}

	if (result.riskValue.commentheader != undefined && result.riskValue.commentheader != '') {
		commentsHeader = result.riskValue.commentheader;
	}

	var commentsinlineEditIcon = `<strong>` + commentsHeader + `</strong>`;
	if (comeditpermission == true) {
		commentsinlineEditIcon = `<strong class="editableTxt1"
				onkeypress="return (this.innerText.length <= 25)" data-oldcommentheader="`+ commentsHeader + `" id="commentheader" editable="true" contenteditable="true">` + commentsHeader + `</strong>`;
	}

	var commentsCreateIcon = ``;
	if (comcreatepermission == true && comcontentload == true) {
		commentsCreateIcon = `<div class="comment_send riskcommentssend">
	<form id="risk_comments_Form">
	<div id="riskCommentsBlock">
		<div class="form-group d-flex flex-row align-items-center" >
			<div class="form-line">
				<input type="text" data-id="`+ id + `" name="riskComments" id="riskComments" class="form-control "
					placeholder="Type a comment..." autocomplete="off"/>	
			</div>
			<div class="send_btn" style="cursor:pointer;" onclick="handleRiskCommentsSave(${id},'add')">
				<i class="fas fa-arrow-right"></i>
			</div>
		</div>
	</div>
	<div style="display: none !important;" id="riskCommentsReplyBLock">
		<div class="form-group d-flex flex-row align-items-center" >
			<div class="form-line" >
				<input type="text" data-id="`+ id + `" name="riskCommentsReply" id="riskCommentsReply" class="form-control "
					placeholder="Type a reply..." autocomplete="off"  />
			</div>
			<div class="send_btn" style="cursor:pointer;" onclick="handleRiskReplyCommentsSave(${id},'add')">
				<i class="fas fa-arrow-right"></i>
			</div>		
		</div>
	</div>
	</form>
	</div>`;
	}


	var commentsInitiativeOptions = "";
	if (comviewpermission == false) {
		commentsInitiativeOptions = "";
	} else {
		commentsInitiativeOptions = `<ul class="header-dropdown m-r--2 d-flex">
                                        		<li class="dropdown m-t--10">
                                            		<a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                		<i class="material-icons">more_vert</i>
                                            		</a>
                                            		<ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">`;

		if (comviewpermission == true) {
			commentsInitiativeOptions += `<li>
                                                    	<a href="#" data-toggle="modal" data-target=".comments_view_popup" onclick="commentsviewdetails(`+ id + `)">View</a>
                                                		</li>`;
		}

		commentsInitiativeOptions += `</ul></li></ul>`;
	}

	var commentsTemplate = $('#risk-comments-template').html();
	var commentDetails = Mustache.render(commentsTemplate, {
		initiativeId: result.id,
		commentsHeader: commentsHeader,
		commentRows: commentRows,
		commentsCreateIcon: commentsCreateIcon,
		commentsinlineEditIcon: commentsinlineEditIcon,
		commentsInitiativeOptions: commentsInitiativeOptions
	});
	$('#riskcomments').html(commentDetails);
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
}


function initiativeBar() {
	var $body = $('body');
	if (localStorage.getItem("sidebar_subsidemenu") != "" & localStorage.getItem("sidebar_subsidemenu") != null & localStorage.getItem("sidebar_subsidemenu") == "closed") {
		$body.addClass('ini-show');
		$body.removeClass('ini-hide');
		$('.collapse_arrow_left').css('display', 'block');
		$('.collapse_arrow_right').css('display', 'none');
	}
	if (!($body.hasClass('submenu-closed'))
		&& !($body.hasClass('side-closed'))
		&& !($body.hasClass('ini-hide'))
		&& !($body.hasClass('ini-show'))) {
		$('#initiative_sidebar').css('left', '230px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '485px');
	} else if (($body.hasClass('submenu-closed'))
		&& !($body.hasClass('side-closed'))
		&& !($body.hasClass('side-closed-hover'))
		&& !($body.hasClass('ini-hide'))
		&& !($body.hasClass('ini-show'))) {
		$('#initiative_sidebar').css('left', '230px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '484px');
	} else if (($body.hasClass('side-closed-hover'))
		&& !($body.hasClass('side-closed'))
		&& !($body.hasClass('submenu-closed'))
		&& !($body.hasClass('ini-hide'))
		&& !($body.hasClass('ini-show'))) {
		$('#initiative_sidebar').css('left', '260px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '484px');
	} else if (($body.hasClass('submenu-closed'))
		&& ($body.hasClass('side-closed'))
		&& !($body.hasClass('side-closed-hover'))
		&& !($body.hasClass('ini-hide'))
		&& !($body.hasClass('ini-show'))) {
		$('#initiative_sidebar').css('left', '59px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '313px');
	} else if (($body.hasClass('side-closed'))
		&& ($body.hasClass('side-closed-hover'))
		&& !($body.hasClass('submenu-closed'))
		&& !($body.hasClass('ini-hide'))
		&& !($body.hasClass('ini-show'))) {
		$('#initiative_sidebar').css('left', '260px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '514px'); // end
		// default
	} else if (($body.hasClass('submenu-closed'))
		&& ($body.hasClass('ini-hide'))
		&& !($body.hasClass('side-closed'))) {
		$('#initiative_sidebar').css('left', '-10px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '244px');
	} else if (($body.hasClass('submenu-closed'))
		&& ($body.hasClass('side-closed'))
		&& ($body.hasClass('ini-hide'))) {
		$('#initiative_sidebar').css('left', '-260px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '75px');
	} else if (($body.hasClass('ini-hide'))
		&& !($body.hasClass('side-closed'))
		&& !($body.hasClass('submenu-closed'))
		&& !($body.hasClass('side-closed-hover'))) {
		$('#initiative_sidebar').css('left', '-10px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '244px');
	} else if (($body.hasClass('ini-hide'))
		&& ($body.hasClass('side-closed-hover'))
		&& !($body.hasClass('submenu-closed'))
		&& ($body.hasClass('side-closed'))) {
		$('#initiative_sidebar').css('left', '-260px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '275px'); // end
		// hide
	} else if (($body.hasClass('submenu-closed'))
		&& ($body.hasClass('ini-show'))
		&& !($body.hasClass('side-closed'))) {
		$('#initiative_sidebar').css('left', '230px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '485px');
	} else if (($body.hasClass('submenu-closed'))
		&& ($body.hasClass('side-closed'))
		&& ($body.hasClass('ini-show'))) {
		$('#initiative_sidebar').css('left', '60px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '314px');
	} else if (($body.hasClass('ini-show'))
		&& !($body.hasClass('side-closed'))
		&& !($body.hasClass('submenu-closed'))
		&& !($body.hasClass('side-closed-hover'))) {
		$('#initiative_sidebar').css('left', '230px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '485px');
	} else if (($body.hasClass('ini-show'))
		&& ($body.hasClass('side-closed-hover'))
		&& !($body.hasClass('submenu-closed'))
		&& ($body.hasClass('side-closed'))) {
		$('#initiative_sidebar').css('left', '260px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '514px');
	}

}

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
	jQuery("body").addClass(
		localStorage.getItem("sidebar_option"));
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
	// chart
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
			subInitiativeOptions = `<ul class="header-dropdown m-r--2">
			<i class="fa fa-chart-line " id="tableTabID3"></i>
			<li class="dropdown m-t--10"><a href="#" onclick="return false;"
				class="dropdown-toggle" data-toggle="dropdown" role="button"
				aria-haspopup="true" aria-expanded="true"> <i
					class="material-icons">more_vert</i>
			</a>
				<ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start"
								style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">`;

			if (riskviewpermission == true) {
				subInitiativeOptions += `<li><a href="#" data-toggle="modal" data-target=".chart_view_popup" onclick="riskchartviewdetails();">View</a></li>`;
			}

			/*
			 * if(riskdeletepermission == true){ subInitiativeOptions += `<li><a
			 * href="#" onclick="return false;">Delete</a></li>`; }
			 */

			subInitiativeOptions += `</ul></li></ul>`;
		}

		var chartinlineEditIcon = `<strong id="chartheader" data-oldchartheader="` + chartHeader + `">` + chartHeader + `</strong>`;
		if (riskeditpermission == true) {
			chartinlineEditIcon = `<strong class="editableTxt1"
				onkeypress="return (this.innerText.length <= 25)" id="chartheader" data-oldchartheader="`+ chartHeader + `" editable="true" contenteditable="true">` + chartHeader + `</strong>`;
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



	$(document).on('change', '#heatmapselection', function () {


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
	// Dispose of existing charts to avoid conflicts
	if (am4core.registry.baseSprites.length > 0) {
	  am4core.registry.baseSprites.forEach(sprite => {
		if (sprite instanceof am4charts.XYChart && sprite.htmlContainer.id !== 'chartdiv') {
			sprite.dispose();
		}
	  });
	}
  
	// Clear the chart container
	$(chartElement).empty();
  
	// Define colors
	var colors = {
	  "critical": "#ca0101",
	  "bad": "#FF6E00",
	  "medium": "#FFFF00",
	  "good": "#5dbe24",
	  "verygood": "#0b7d03"
	};
  
	// Initialize the chart
	am4core.useTheme(am4themes_animated);
	var chart = am4core.create(chartElement, am4charts.XYChart);
	chart.maskBullets = false;
  
	// Configure the axes
	var xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	var yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
  
	xAxis.dataFields.category = "y";
	yAxis.dataFields.category = "x";
  
	xAxis.renderer.grid.template.disabled = true;
	xAxis.renderer.minGridDistance = 30;
  
	yAxis.renderer.grid.template.disabled = true;
	yAxis.renderer.inversed = false;
	yAxis.renderer.minGridDistance = 30;
  
	// Configure the series
	var series = chart.series.push(new am4charts.ColumnSeries());
	series.dataFields.categoryX = "y";
	series.dataFields.categoryY = "x";
	series.dataFields.value = "value";
	series.sequencedInterpolation = true;
	series.defaultState.transitionDuration = 0;
  
	// Configure column appearance
	var column = series.columns.template;
	column.strokeWidth = 2;
	column.strokeOpacity = 1;
	column.stroke = am4core.color("#000000");
	column.tooltipText = "{status}";
	column.width = am4core.percent(100);
	column.height = am4core.percent(100);
	column.column.cornerRadius(6, 6, 6, 6);
	column.propertyFields.fill = "color";
  
	// Configure bullet appearance
	var bullet2 = series.bullets.push(new am4charts.LabelBullet());
	bullet2.label.text = "{id}";
	bullet2.label.fill = am4core.color("#000");
	bullet2.zIndex = 1;
	bullet2.fontSize = 11;
	bullet2.interactionsEnabled = false;
  
	// Prepare the chart data
	chart.data = [{
	  "y": "Tidak Signifikan",
	  "x": "Hampir Tidak \nPernah Terjadi",
	  "color": colors.verygood,
	  "likelihood": 6,
	  "impact": 1,
	  "status": "A1",
	  "value": 1,
	  "name":"A1"
	}, {
	  "y": "Ringan",
	  "x": "Hampir Tidak \nPernah Terjadi",
	  "likelihood": 6,
	  "impact": 2,
	  "color": colors.verygood,
	  "status": "A2",
	  "value": 2
	}, {
	  "y": "Moderat",
	  "x": "Hampir Tidak \nPernah Terjadi",
	  "likelihood": 6,
	  "impact": 3,
	  "color": colors.verygood,
	  "status": "A3",
	  "value": 3,
	}, {
	  "y": "Berat",
	  "x": "Hampir Tidak \nPernah Terjadi",
	  "likelihood": 6,
	  "impact": 4,
	  "color": colors.bad,
	  "status": "A4",
	  "value": 4
	}, {
	  "y": "Fatal",
	  "x": "Hampir Tidak \nPernah Terjadi",
	  "likelihood": 6,
	  "impact": 5,
	  "color": colors.critical,
	  "status": "A5",
	  "value": 5
	},
  
	{
	  "y": "Tidak Signifikan",
	  "x": "Sangat Jarang",
	  "likelihood": 7,
	  "impact": 1,
	  "color": colors.verygood,
	  "status": "B1",
	  "value": 2
	}, {
	  "y": "Ringan",
	  "x": "Sangat Jarang",
	  "likelihood": 7,
	  "impact": 2,
	  "color": colors.verygood,
	  "status": "B2",
	  "value": 4
	}, {
	  "y": "Moderat",
	  "x": "Sangat Jarang",
	  "likelihood": 7,
	  "impact": 3,
	  "color": colors.medium,
	  "status": "B3",
	  "value": 6
	}, {
	  "y": "Berat",
	  "x": "Sangat Jarang",
	  "likelihood": 7,
	  "impact": 4,
	  "color": colors.bad,
	  "status": "B4",
	  "value": 8
	}, {
	  "y": "Fatal",
	  "x": "Sangat Jarang",
	  "likelihood": 7,
	  "impact": 5,
	  "color": colors.critical,
	  "status": "B5",
	  "value": 10
	}, {
	  "y": "Tidak Signifikan",
	  "x": "Jarang",
	  "likelihood": 8,
	  "impact": 1,
	  "color": colors.medium,
	  "status": "C1",
	  "value": 3
	}, {
	  "y": "Ringan",
	  "x": "Jarang",
	  "likelihood": 8,
	  "impact": 2,
	  "color": colors.medium,
	  "status": "C2",
	  "value": 6
	}, {
	  "y": "Moderat",
	  "x": "Jarang",
	  "likelihood": 8,
	  "impact": 3,
	  "color": colors.bad,
	  "status": "C3",
	  "value": 9
	}, {
	  "y": "Berat",
	  "x": "Jarang",
	  "likelihood": 8,
	  "impact": 4,
	  "color": colors.bad,
	  "status": "C4",
	  "value": 12
	}, {
	  "y": "Fatal",
	  "x": "Jarang",
	  "likelihood": 8,
	  "impact": 5,
	  "color": colors.critical,
	  "status": "C5",
	  "value": 15
	}, {
	  "y": "Tidak Signifikan",
	  "x": "Sering",
	  "likelihood": 9,
	  "impact": 1,
	  "color": colors.bad,
	  "status": "D1",
	  "value": 4
	}, {
	  "y": "Ringan",
	  "x": "Sering",
	  "likelihood": 9,
	  "impact": 2,
	  "color": colors.bad,
	  "status": "D2",
	  "value": 8
	}, {
	  "y": "Moderat",
	  "x": "Sering",
	  "likelihood": 9,
	  "impact": 3,
	  "color": colors.bad,
	  "status": "D3",
	  "value": 12
	}, {
	  "y": "Berat",
	  "x": "Sering",
	  "likelihood": 9,
	  "impact": 4,
	  "color": colors.critical,
	  "status": "D4",
	  "value": 16
	}, {
	  "y": "Fatal",
	  "x": "Sering",
	  "likelihood": 9,
	  "impact": 5,
	  "color": colors.critical,
	  "status": "D5",
	  "value": 20
	}, {
	  "y": "Tidak Signifikan",
	  "x": "Sangat Sering",
	  "likelihood": 10,
	  "impact": 1,
	  "color": colors.bad,
	  "status": "E1",
	  "value": 5
	}, {
	  "y": "Ringan",
	  "x": "Sangat Sering",
	  "likelihood": 10,
	  "impact": 2,
	  "color": colors.critical,
	  "status": "E2",
	  "value": 10
	}, {
	  "y": "Moderat",
	  "x": "Sangat Sering",
	  "likelihood": 10,
	  "impact": 3,
	  "color": colors.critical,
	  "status": "E3",
	  "value": 15
	}, {
	  "y": "Berat",
	  "x": "Sangat Sering",
	  "likelihood": 10,
	  "impact": 4,
	  "color": colors.critical,
	  "status": "E4",
	  "value": 20
	}, {
	  "y": "Fatal",
	  "x": "Sangat Sering",
	  "likelihood": 10,
	  "impact": 5,
	  "color": colors.critical,
	  "status": "E5",
	  "value": 25
	}
	];
  
	// Update chart data based on selection
	if ($("#heatmapselection").val() === "inherent") {
	  if (controlpanelRiskSettings.inherentscorecause) {
		$.each(detailrisk.riskCauseAndConsequenceList, function (index, item) {
		  if (item.causeAndConsequenceValue.likelihood && item.causeAndConsequenceValue.impact) {
			var likelihood = getPriorityFromlikelihood(item.causeAndConsequenceValue.likelihood);
			var impact = getPriorityFromlimpactscore(item.causeAndConsequenceValue.impact);
			chart.data.forEach((element, index) => {
			  if (element["impact"] == impact && element["likelihood"] == likelihood) {
				element["id"] = item.causeAndConsequenceValue.score;
			  }
			});
		  }
		});
	  } else {
		$.each(detailrisk.riskCauseAndConsequenceList, function (index, item) {
		  $.each(item.consequenceList, function (index2, itemconq) {
			if (itemconq.consequenceValue.likelihood && itemconq.consequenceValue.impact) {
			  var likelihood = getPriorityFromlikelihood(itemconq.consequenceValue.likelihood);
			  var impact = getPriorityFromlimpactscore(itemconq.consequenceValue.impact);
			  chart.data.forEach((element, index) => {
				if (element["impact"] == impact && element["likelihood"] == likelihood) {
				  element["id"] = itemconq.consequenceValue.score;
				}
			  });
			}
		  });
		});
	  }
	} else {
	  console.log("Residual selection");
  
	  if (controlpanelRiskSettings.residualscoreimpact) {
		$.each(detailrisk.riskPlanList, function (index, item) {
		  if (item.riskPlanValue.likelihood && item.riskPlanValue.impact) {
			var likelihood = getPriorityFromlikelihood(item.riskPlanValue.likelihood);
			var impact = getPriorityFromlimpactscore(item.riskPlanValue.impact);
			chart.data.forEach((element, index) => {
			  if (element["impact"] == impact && element["likelihood"] == likelihood) {
				element["id"] = item.riskPlanValue.planscore;
			  }
			});
		  }
		});
	  } else {
		$.each(detailrisk.riskPlanList, function (index, item) {
		  $.each(item.riskActivitiesDTOList, function (index2, itemconq) {
			if (itemconq.riskActivitiesValue.likelihood && itemconq.riskActivitiesValue.impact) {
			  var likelihood = getPriorityFromlikelihood(itemconq.riskActivitiesValue.likelihood);
			  var impact = getPriorityFromlimpactscore(itemconq.riskActivitiesValue.impact);
			  chart.data.forEach((element, index) => {
				if (element["impact"] == impact && element["likelihood"] == likelihood) {
				  element["id"] = itemconq.riskActivitiesValue.score;
				}
			  });
			}
		  });
		});
	  }
	}
  
	// Remove the "Chart created" tooltip
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
	$(this).toggleClass("green");
	var id = $(this).attr("data-id");
	if (!id) {
		return false;
	}
	var counter = $(this).closest('li').next('li').find('span.counter').text();
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
		$(this).closest('li').next('li').find('span.counter').text(parseInt(parseInt(counter) + 1))
	} else {
		flaglike = false;
		likecount = parseInt(parseInt(counter) - 1);
		$(this).closest('li').next('li').find('span.counter').text(parseInt(parseInt(counter) - 1))
	}
	if (likecount == -1) {
		return false;
	}
	var data = {
		id: id,
		likeCount: likecount,
		type: (flaglike ? "like" : "dislike"),
		empId: currentEmp
	}

	$.ajax({
		url: '/stratroom/riskCommentLike',
		type: 'put',
		data: JSON.stringify(data),
		async: false,
		contentType: "application/json",
		success: function (res) {
			$.notify("Updated Successfully", {
				style: 'success',
				className: 'graynotify'
			});
		}, error: readErrorMsg
	});
});
$(document).on("click", ".riskcountreplyclick", function () {
	$(this).toggleClass("green");
	var id = $(this).attr("data-id");
	if (!id) {
		return false;
	}
	var counter = $(this).closest('li').next('li').find('span.counter').text();
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
		$(this).closest('li').next('li').find('span.counter').text(parseInt(parseInt(counter) + 1))
	} else {
		flaglike = false;
		likecount = parseInt(parseInt(counter) - 1);
		$(this).closest('li').next('li').find('span.counter').text(parseInt(parseInt(counter) - 1))
	}
	if (likecount == -1) {
		return false;
	}
	var data = {
		id: id,
		likeCount: likecount,
		type: (flaglike ? "like" : "dislike"),
		empId: currentEmp
	}

	$.ajax({
		url: '/stratroom/riskCommentLike',
		type: 'put',
		data: JSON.stringify(data),
		async: false,
		contentType: "application/json",
		success: function (res) {
			$.notify("Updated Successfully", {
				style: 'success',
				className: 'graynotify'
			});
		}, error: readErrorMsg
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