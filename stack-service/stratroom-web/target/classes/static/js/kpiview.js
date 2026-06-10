var kpichartDataList = [];
var kpichartcurrencytype 	= "";
var kpireporteelist = [];
var kpiupdateDescription	=	[];
var kpiinitiatiesDescription=	[];
var	kpiowner	=	{};
var defaultkpiCurrency	=	"";
var defaultkpiCurrencyValue	=	"";
var $chartElement	=	"#chartdiv_init";
var actualvstargetHeader 	=	"Data Table";
var kpichartHeader 	=	"Actual v/s Target";
var kpiinitiativeHeader 	=	"My Initiatives";
var kpiRiskHeader 	=	"Risks";
var reporttableHeader 	=	"Data Drill";
var kpicommentsHeader 	=	"Comments";
var kpiattachmentHeader 	=	"Files";
var kpiList = {};
var parentKpidetails 	= 	{"id":"","createdBy":"","createDateString":"","updatedDateString":"","kpiFormula":"","updatedBy":"","createdTime":"","kpiValue":"","owner":"","objectiveId":"","kpiId":""};
var kpilistdata 		=	{};
var kpi_measurement		=	"";
var currentEmp			=	$("#userPrincipal").val();
let urlparams 			= (new URL(document.location)).searchParams;
let currentPageId 		= 	urlparams.get("pageId");
let empkpiPageId 		= 	urlparams.get("empId");
let empscorecardId 		= 	urlparams.get("scoreCardId");
let empobjectiveId 		= 	urlparams.get("objectiveId");
let urlkpiId 			= 	urlparams.get("kpiId");
let flagType 		    = 	urlparams.get("flagtype");
var ischeckkpiurlornot	=	$("#ischeckkpiurlornot").val();
var kpicurrencyval 		= 	"$";
var kpimillions			=	false;
var kpipercentage		=	false;

var commentscreatepermission	=	false;
var commentseditpermission	=	false;
var commentsviewpermission	=	false;
var commentsdeletepermission	=	false;

var kpicreatepermission	=	false;
var kpieditpermission	=	false;
var kpideletepermission	=	false;
var kpiviewpermission	=	true;

var kpicontentload		=	false;
var kpipreference 		= 	[];
var kpiempPreference 	= 	{"preferences":{}};
var	controlpanelKpiSettings	=	{}; 

var datatableactual	=	false;
var datatabletarget	=	false;
var datatablegap	=	false;
var datatableytd	=	false;
var datatablecontribution	=	false;
var datatableannualtarget	=	false;
var drilltableactual	=	false;
var drilltabletarget	=	false;
var drilltablegap		=	false;
 
console.log(flagType,"flagType");
if($("#userrolename").val()	==	"Super User" || $("#userrolename").val()	==	"Admin"){
	if($("#userPrincipal").val()	!= $("#userPrincipalnavigate").val()){
		$(".subusermenuname").text('KPI View');
		if($(".topmenubreadcrumb").length){
			$(".topmenubreadcrumb").show();
		}
		if($(".sidebarNavigate").length){
			$(".sidebarNavigate").show();
		}
	}
}

function getscorecardpermission(){
	$.ajax({
		type : "GET",
		url : "/stratroom/user/modulePermissions?moduleName=Scorecard",
		async:false,
		success : function(data) {
			if(data.Scorecard !=	undefined && !jQuery.isEmptyObject(data.Scorecard)){
				//pespective
				if(data.Scorecard.Comments.privilegeCreate !=	undefined && data.Scorecard.Comments.privilegeCreate == "TRUE"){	
					commentscreatepermission	=	true;
				}
				if(data.Scorecard.Comments.privilegeUpdate !=	undefined && data.Scorecard.Comments.privilegeUpdate == "TRUE"){
					commentseditpermission	=	true;
				}
				if(data.Scorecard.Comments.privilegeView !=	undefined && data.Scorecard.Comments.privilegeView == "TRUE"){
					commentsviewpermission	=	true;
				}
				if(data.Scorecard.Comments.privilegeDelete !=	undefined && data.Scorecard.Comments.privilegeDelete == "TRUE"){
					commentsdeletepermission	=	true;
				}
				//kpi view
				$.each(data.Scorecard,function(forindex,fordata){
					if(forindex	==	"KPI View"){
						if(fordata.privilegeUpdate !=	undefined && fordata.privilegeUpdate == "TRUE"){
							kpieditpermission	=	true;
						}
						if(fordata.privilegeDelete !=	undefined && fordata.privilegeDelete == "TRUE"){
							kpideletepermission	=	true;
						}
					}
				});
			}
		}
	});
}

function addOption(id, text, value) {
	$(id).append(`<option value="${value}">${text}</option>`);
}

function kpigetreportee() {
	if (jQuery.isEmptyObject(kpireporteelist)) {
		$.ajax({
			url : "/stratroom/reporteeList",
			async:false,
			success : function(employeeList) {
				kpireporteelist = employeeList;
			}
		});
	} 
}

function kpipagepreference() {
	if (jQuery.isEmptyObject(kpipreference) && currentPageId !=	null) {
		$.ajax({
			url : "/stratroom/getPreferences?pageName=KPI&pageId="+currentPageId,
			async:false,
			success : function(employeeList) {
				kpipreference = employeeList;
			}
		});
	} 
}

function populateObjectives(id) {
	
	$(elementId).empty();
	$('#kpi_objectives_id').find('option').remove().end();
	$('#kpi_objectives_id').append(`<option value="">Select Objective</option>`);
	var elementId = "#kpi_objectives_id";
	localStorage.setItem('scoreCardId', id);
	if(id != undefined && id != ""){
		$.ajax({
			url : "/stratroom/objectivesList/"+id+"?loadFlag=false",
			async:false,
			success : function(objList) {
				var arrobj	=	[];
				$.each(objList, function(index, objective) {
					addOption(elementId, objective.objectivesValue.name, objective.id);
					arrobj.push(objective.id);
				});
				
				var objsame	=	false;

				if(empobjectiveId != null && empobjectiveId !== undefined)
				{
					localStorage.setItem("objId",empobjectiveId)
				}
				var checklocalstoragesameobj	=	(localStorage.getItem("objId") != undefined && localStorage.getItem("objId") != null?localStorage.getItem("objId"):'');
				$.each(arrobj, function(index, objective) {
					if(objective	==	checklocalstoragesameobj){
						objsame	=	true;
					}
				});
				
				if(objsame){
					$("#kpi_objectives_id").val(checklocalstoragesameobj);
				}else{
					$('#kpi_objectives_id option:eq(1)').prop('selected', true).trigger('change');
				}
			}
		});
	}
}

function populateScoreCard(id) {
	localStorage.setItem('scordCardPageId', id);
	if(id != undefined && id != ""){
		$(elementId).empty();
		$('#kpi_scorecard').find('option').remove().end();
		$('#kpi_scorecard').append(`<option value="">Select Perspective</option>`);
		var elementId = "#kpi_scorecard";
		$.ajax({
			url : "/stratroom/scoreCardList?loadFlag=false&pageId="+id,
			async:false,
			success : function(data) {
				if(data.cardDetailsDTO !=	undefined){
					$.each(data.cardDetailsDTO.scoreCardDTOS, function(index, scordCard1) {
						addOption(elementId, scordCard1.scoreCardValue.name, scordCard1.id)
					});
				}
				var checklocalstoragesamescore	=	(localStorage.getItem("scoreCardId") != undefined && localStorage.getItem("scoreCardId") != null?localStorage.getItem("scoreCardId"):'');
				if(checklocalstoragesamescore !=	""){
					$("#kpi_scorecard").val(checklocalstoragesamescore);
				}else{
					$('#kpi_scorecard option:eq(1)').prop('selected', true).trigger('change');
				}
			}
		});
	}
}

function handleKPICommentsSave(kpiId,action) {
		
		var commentsObj = {
			"commentsParendId":0,
			"kpiId" : kpiId,
			"fromPage": flagType,
			"type":flagType,
			"commentsValue" : {
				"desc" : $("#kpi_comments_Form input[name='kpiComments']").val(),
			}
		}
		var methodType = 'post';
		if (action == 'add') {
		
			if($("#kpi_comments_Form input[name='kpiComments']").val()	==	"" || $("#kpi_comments_Form input[name='kpiComments']").val()	==	"'"){
				$.notify("Error: Enter some comments", {
								  style: 'error',
								  className: 'graynotify'
								});
				return false;
			}

		} else if (action == 'edit') {
			if($("#kpi_Comments").val()	==	"" || $("#kpi_Comments").val()	==	"'"){
				$.notify("Error: Enter some comments", {
								  style: 'error',
								  className: 'graynotify'
								});
				return false;
			}
			commentsObj["id"]		=	$("#kpi_comments_id").val();
			commentsObj["kpiId"]	=	$("#kpi_comments_kpiid").val();
			commentsObj["commentsValue"]["desc"]	=	$("#kpi_Comments").val();
			methodType = 'put';
		}
		
		$.ajax({
			url : "/stratroom/comments/",
			type : methodType,
			contentType : "application/json",
			data : JSON.stringify(commentsObj),
			success : function(data, status) {
				//$("#kpi_comments_Form").css('display', 'none');
				localStorage.setItem('reload', 1);

				location.reload(true);

				console.log("New comments was created..");
			}
		});
}
$(document).on("click", ".kpiCommentReply", function () {
    var kpicommentId = $(this).data("id");  // Get the comment ID from data-id

	$("#kpiCommentsBlock").toggle();
	$("#kpiCommentsReplyBLock").toggle();

    // Set the data-id of the reply input to the comment ID
    $("#kpiCommentsReply").attr("data-id", kpicommentId);
});

function handleKPICommentsReplySave(kpicommentId,action) {

	console.log("qwerty");
	var desc = $("#kpi_comments_Form input[name='kpiCommentsReply']").val();
    if (desc.trim() === "") {
        $.notify("Error: Enter some comments", {
            style: 'error',
            className: 'graynotify'
        });
        return false;
    }
	var replyId = $("#kpiCommentsReply").data("id");
console.log(replyId,"replyId")
	var commentsObj = {
		"commentsParendId":replyId,
		"kpiId" : kpicommentId,
		"fromPage": flagType,
		"type":flagType,
		"commentsValue" : {
			"desc" : desc
		}
	}
	var methodType = 'post';
	
	
	$.ajax({
		url : "/stratroom/comments/",
		type : methodType,
		contentType : "application/json",
		data : JSON.stringify(commentsObj),
		success : function(data, status) {
			localStorage.setItem('reload', 1);

			location.reload(true);

			console.log("New comments was created..");
		}
	});
}
function handleKPICommentsReplyUpate(event) {

	event.preventDefault();


	var commentsObj = {
		"id":$("#kpi_commentsreply_id").val(),
		"kpiId" : $("#kpi_commentsreply_kpiid").val(),
		"fromPage": flagType,
		"type":flagType,
		"commentsValue" : {
			"desc" : $("#kpi_CommentsReply").val()
		}
	}
	var methodType = 'put';
	
	
	$.ajax({
		url : "/stratroom/comments/",
		type : methodType,
		contentType : "application/json",
		data : JSON.stringify(commentsObj),
		success : function(data, status) {
			localStorage.setItem('reload', 1);

			location.reload(true);

			console.log("New comments was created..");
		}
	});
}
function handleKPICommentsUpdatePopup(kpiId,id,desc){
	$("#kpi_commentsreply_id").val(id);
	$("#kpi_commentsreply_kpiid").val(kpiId);
	$("#kpi_CommentsReply").val(desc);
	$("#kpi_CommentsReply_desc").val(desc);
}
function handleKPICommentsPopup(kpiId,id,desc){
	$("#kpi_comments_id").val(id);
	$("#kpi_comments_kpiid").val(kpiId);
	$("#kpi_Comments").val(desc);
}

function deleteKPIComments(commentId) {
	$("#deletekpirecordid").val(commentId);
	$("#deletekpirecordtype").val("comments");
	$('#deleteModalKpi').modal('toggle');
	
	$(window).on("resize", function(){
	    $(".modal:visible").each(alignModal);
	}); 
	$(".modal").on("shown.bs.modal", alignModal);
}

function deleteInitiatives(InitiatieId) {
	$("#deletekpirecordid").val(InitiatieId);
	$("#deletekpirecordtype").val("initiative");
	$('#deleteModalKpi').modal('toggle');
	
	
	$(window).on("resize", function(){
	    $(".modal:visible").each(alignModal);
	}); 
	$(".modal").on("shown.bs.modal", alignModal);
}

function handlekpieventdelete(){
	
	var id				=	$("#deletekpirecordid").val();
	var typeofdeleteurl	=	$("#deletekpirecordtype").val();
	if(id	==	"" || typeofdeleteurl	==	""){
		return false;
	}
	var url				=	"";
	var flag = false;
	if(typeofdeleteurl	==	"initiative"){
		url	=	"/stratroom/initiatives/" + id;
	}else if(typeofdeleteurl	==	"comments"){
		url	=	"/stratroom/comments/kpi/" + id;
		flag = true;
	}
	
	$.ajax({
		url : url,
		type : "delete",
		contentType : "application/json",
		success : function(data, status) {
			location.reload(true);
		},
		error:readErrorMsg
	});
}



function populateKpi(id) {
	localStorage.setItem('objId', id);
	
	if(id != undefined && id != ""){
		var datePeriod = $('#datePeriod').val();
		$.ajax({
			async:false,
			url : "/stratroom/v2/kpiList/" + id+"?datePeriod="+datePeriod+"&flagtype=kpi",
			success : kpiSuccessCallback,
			error:function(msg,status){

				
				}
		});
	}
}

function kpiSuccessCallback(data) {
	console.log(data,"dataaa");
	var kpiTemplate = $('#kpiViewTemplate').html();
	var subkpiTemplate = $('#subkpiViewTemplate').html();
	$('#initiate_sidebar').empty();
	$('#subinitiate_sidebar').empty();
	$('#kpiInitTemplate').empty();
	var template = Handlebars.compile(kpiTemplate);
	var subtemplate = Handlebars.compile(subkpiTemplate);
	kpilistdata 	=	data;
		
	var checklocalstoragesamekpi	=	(localStorage.getItem("kpiId") != undefined && localStorage.getItem("kpiId") != null?localStorage.getItem("kpiId"):'');
	
	$.each(data, function(index, kpi) {
		
		var kpistatusLight	=	"";
		var findprogressvalue = (kpi.kpiValue.statusLight !=	undefined && kpi.kpiValue.statusLight !=	""?kpi.kpiValue.statusLight:" ");
		if(findprogressvalue.search('green') != -1){
			kpistatusLight = "initiative_side_border_green"; 
		}else if(findprogressvalue.search('yellow') != -1){
			kpistatusLight = "initiative_side_border_yellow";  
		}else if(findprogressvalue.search('red') != -1){
			kpistatusLight = "initiative_side_border_orange"; 
		}else{
			kpistatusLight = "initiative_side_border_nestedblack";
		}
		
		/*var readTargetAmount=	intergerHumanFormat(kpi.kpiValue.target);*/
		var readTargetAmount=	(kpi.kpiValue.target !=	undefined?kpi.kpiValue.target:"");
		var targetnumber 	=	(kpi.kpiValue.targetCurrency == undefined || kpi.kpiValue.targetCurrency == ""?defaultkpiCurrency+readTargetAmount:kpi.kpiValue.targetCurrency+readTargetAmount);
		//var readActualAmount=	intergerHumanFormat(kpi.kpiValue.actual);
		var readActualAmount=	(kpi.kpiValue.actual !=	undefined?kpi.kpiValue.actual:"");
		var actualnumber 	=	(kpi.kpiValue.actualCurrency == undefined || kpi.kpiValue.actualCurrency == ""?defaultkpiCurrency+readActualAmount:kpi.kpiValue.actualCurrency+readActualAmount);
		var actualkpivalue	=	(kpi.kpiValue.actual == "" || kpi.kpiValue.actual == undefined ?defaultkpiCurrencyValue+actualnumber:actualnumber);
		var actualcheckispositiveornot	=	checkPositiveorNegative(actualkpivalue);
		var targetkpivalue	=	(kpi.kpiValue.target == "" || kpi.kpiValue.target == undefined?defaultkpiCurrencyValue+targetnumber:targetnumber)
		var targetcheckispositiveornot	=	checkPositiveorNegative(targetkpivalue);
		targetkpivalue		=	(targetkpivalue	==	"null"?"":targetkpivalue);	
		var finalHtml = {
				id : kpi.id,
				name : kpi.kpiValue.name,
				kpistatusLight:kpistatusLight,
				period : kpi.kpiValue.kpi_measurement,
				actual : actualkpivalue,
				actualpositive:(actualcheckispositiveornot ==	1?"negativeHighlight":""),
				targetpositive:(targetcheckispositiveornot ==	1?"negativeHighlight":""),
				target : targetkpivalue
			};
				
		$('#initiate_sidebar').append(template(finalHtml));
		if(localStorage.getItem("kpiIdloaded") ==	'' || localStorage.getItem("kpiIdloaded") ==	null){
			if(checklocalstoragesamekpi	==	kpi.id){
				populateKpiDetails(kpi.id);
				localStorage.setItem("kpiIdloaded",'loaded');
			}else if(index == 0 && (urlkpiId ==	"" || urlkpiId	==	null)){
				populateKpiDetails(kpi.id);
				localStorage.setItem("kpiIdloaded",'loaded');
			}else if(index == 0 && (checklocalstoragesamekpi	==	"" || checklocalstoragesamekpi ==	null)){
				populateKpiDetails(kpi.id);
				localStorage.setItem("kpiIdloaded",'loaded');
			}else{
				localStorage.setItem("kpiIdloaded",'loaded');
				populateKpiDetails(kpi.id);
			}
		} 
		$.each(kpi.subKpiList, function(index, subKpi) {
		
			var kpistatusLight	=	"";
			var findprogressvalue = (subKpi.subKpiValue.statusLight !=	undefined && subKpi.subKpiValue.statusLight !=	""?subKpi.subKpiValue.statusLight:" ");
			if(findprogressvalue.search('green') != -1){
				kpistatusLight = "initiative_side_border_green"; 
			}else if(findprogressvalue.search('yellow') != -1){
				kpistatusLight = "initiative_side_border_yellow";  
			}else if(findprogressvalue.search('red') != -1){
				kpistatusLight = "initiative_side_border_orange"; 
			}else{
				kpistatusLight = "initiative_side_border_nestedblack";
			}
			
			/*var readTargetAmount=	intergerHumanFormat(subKpi.subKpiValue.target);*/
			var readTargetAmount=	(subKpi.subKpiValue.target !=	undefined?subKpi.subKpiValue.target:"");
			var targetnumber 	=	(subKpi.subKpiValue.targetCurrency == undefined || subKpi.subKpiValue.targetCurrency == ""?defaultkpiCurrency+readTargetAmount:subKpi.subKpiValue.targetCurrency+readTargetAmount);
			//var readActualAmount=	intergerHumanFormat(subKpi.subKpiValue.actual);
			var readActualAmount=	(subKpi.subKpiValue.actual !=	undefined?subKpi.subKpiValue.actual:"");
			var actualnumber 	=	(subKpi.subKpiValue.actualCurrency == undefined || subKpi.subKpiValue.actualCurrency == ""?defaultkpiCurrency+readActualAmount:subKpi.subKpiValue.actualCurrency+readActualAmount);
			var actualkpivalue	=	(subKpi.subKpiValue.actual == "" || subKpi.subKpiValue.actual == undefined ?defaultkpiCurrencyValue+actualnumber:actualnumber);
			var actualcheckispositiveornot	=	checkPositiveorNegative(actualkpivalue);
			var targetkpivalue	=	(subKpi.subKpiValue.target == "" || subKpi.subKpiValue.target == undefined?defaultkpiCurrencyValue+targetnumber:targetnumber)
			var targetcheckispositiveornot	=	checkPositiveorNegative(targetkpivalue);
			targetkpivalue		=	(targetkpivalue	==	"null"?"":targetkpivalue);	
			var finalHtml = {
					subKpiid : subKpi.id,
					subKpiname : subKpi.subKpiValue.subMeasureName,
					subKpikpistatusLight:kpistatusLight,
					subKpiperiod : subKpi.subKpiValue.kpi_measurement,
					subKpiactual : actualkpivalue,
					subKpiactualpositive:(actualcheckispositiveornot ==	1?"negativeHighlight":""),
					subKpitargetpositive:(targetcheckispositiveornot ==	1?"negativeHighlight":""),
					subKpitarget : targetkpivalue
				};
					
			$('#subinitiate_sidebar').append(subtemplate(finalHtml));
			if(localStorage.getItem("kpiIdloaded") ==	'' || localStorage.getItem("kpiIdloaded") ==	null){
				if(checklocalstoragesamekpi	==	subKpi.id){
					populateKpiDetails(subKpi.id);
					localStorage.setItem("kpiIdloaded",'loaded');
				}else if(index == 0 && (urlkpiId ==	"" || urlkpiId	==	null)){
					populateKpiDetails(subKpi.id);
					localStorage.setItem("kpiIdloaded",'loaded');
				}else if(index == 0 && (checklocalstoragesamekpi	==	"" || checklocalstoragesamekpi ==	null)){
					populateKpiDetails(subKpi.id);
					localStorage.setItem("kpiIdloaded",'loaded');
				}else{
					localStorage.setItem("kpiIdloaded",'loaded');
					populateKpiDetails(subKpi.id);
				}
			} 
		});
	});
	
	$('#initiate_sidebar').slimscroll({
		height : '250px',
		size : '3px',
		color : '#9c9c9c'
	});
	$('#subinitiate_sidebar').slimscroll({
		height : '250px',
		size : '3px',
		color : '#9c9c9c'
	});

}
function generateUniqueFileReference() {
    var timestamp = new Date().getTime();
    var random = Math.random().toString(36).substring(2, 15);
    return timestamp + '_' + random;
}
function kpiattachment() {
	var fileName = document.getElementById('fileName').value;
	var fileInput = document.getElementById('fileInput');
	var file = fileInput.files[0]; // get the selected file
	var uniqueFileReference = generateUniqueFileReference();
  
	if (!file) {
	  alert("Please select a file first.");
	  return;
	}
  
	var formData = new FormData();
	formData.append("file", file);
	formData.append("uniqueFileReference", uniqueFileReference);
	formData.append("kpiId", kpiId); // Ensure kpiId is defined in your scope
	formData.append("name", fileName);
  
	$.ajax({
	  url: "/stratroom/kpiAttach",
	  type: "POST",
	  data: formData,
	  processData: false, // Prevent jQuery from processing the data
	  contentType: false, // Prevent jQuery from setting the content type
	  success: function (data, status) {
		console.log(data, "attach data");
	  },
	  error: readErrorMsg
	});
  }
  
function populateKpiDetails(id) {
	console.log(id,"idddddd")
	localStorage.setItem('kpiId', id);

	$(".kpi_initiative_sidebar_details").removeClass("kpiSidebarHighLight");
	$(".kpiliststatus_"+id).addClass("kpiSidebarHighLight");
	$.ajax({
		url : "/stratroom/kpi/" + id+"?statusLightFlag=true"+"&flagtype="+flagType,
		async:false,
		success : function(data, status) {
			console.log(data,"dataattattata");
			console.log(flagType,"flagtype");
			var kpiData = flagType === "kpi" ? data.kpiValue : data.subKpiValue;

			var kpiDetailsTemplate 	= 	$('#kpiDetailsViewTemplate').html();
			$.each(kpireporteelist,function(ownkey,empvalue){
				if(empvalue.id	==	data.owner){
					kpiowner	=	{"id":empvalue.id,"name":empvalue.name,"image":empvalue.image, "dept":empvalue.dept};
					return false;
				}
			});
			console.log(kpiData,"kpidataaa")
			var getownershortName	=	hasWhiteSpaceName(kpiData.createdByName);
			getownershortName		=	(getownershortName ==	""?hasWhiteSpaceName(kpiData.updatedByName):getownershortName);
			var	dept	=	"";
			var landingimagecolor	=	"";
			var findprogressvalue 	= 	(kpiData.statusLight !=	undefined && kpiData.statusLight !=	""?kpiData.statusLight:" ");
			if(findprogressvalue.search('green') != -1){
				landingimagecolor 	= 	"greenbarimagecircle"; 
			}else if(findprogressvalue.search('yellow') != -1){
				landingimagecolor 	= 	"yellowbarimagecircle";  
			}else if(findprogressvalue.search('red') != -1){
				landingimagecolor 	= 	"orangebarimagecircle"; 
			}else{
				landingimagecolor 	= 	"defaultbarimagecircle";
			}
			
			var	Owner	=	"data-name='"+getownershortName+"' class='rounded-circle kpidescimgprofile "+landingimagecolor+"' ";
			
			if(kpiowner !=	undefined && kpiowner !=	'' && kpiowner.name !== undefined){
				var username 	=	((kpiowner.name ==	undefined || kpiowner.name == "")?"User":kpiowner.name);
				Owner = ((kpiowner.image ==	undefined || kpiowner.image == "")?"data-name='"+kpiowner.name+"' class='rounded-circle kpidescimgprofile "+landingimagecolor+"' ":"src='"+kpiowner.image+"' class='rounded-circle "+landingimagecolor+"' ");
				dept 	=	((kpiowner.dept ==	undefined || kpiowner.dept == "")?"":kpiowner.dept);
			}
			
			$('#kpiDetailsView').empty();
			var userDept = $("#userDept").val();
			actualvstargetHeader 	=	(kpiData.actualvstargetHeader == undefined || kpiData.actualvstargetHeader == ""?actualvstargetHeader:kpiData.actualvstargetHeader);
			kpichartHeader 			=	(kpiData.kpichartHeader == undefined || kpiData.kpichartHeader == ""?kpichartHeader:kpiData.kpichartHeader);
			kpiinitiativeHeader 	=	(kpiData.kpiinitiativeHeader == undefined || kpiData.kpiinitiativeHeader == ""?kpiinitiativeHeader:kpiData.kpiinitiativeHeader);
			kpiRiskHeader 	=	(kpiData.kpiRiskHeader == undefined || kpiData.kpiRiskHeader == ""?kpiRiskHeader:kpiData.kpiRiskHeader);
			reporttableHeader	 	=	(kpiData.reporttableHeader == undefined || kpiData.reporttableHeader == ""?reporttableHeader:kpiData.reporttableHeader);
			kpicommentsHeader 		=	(kpiData.kpicommentsHeader == undefined || kpiData.kpicommentsHeader == ""?kpicommentsHeader:kpiData.kpicommentsHeader);
			kpiattachmentHeader 	=	(kpiData.kpiattachmentHeader == undefined || kpiData.kpiattachmentHeader == ""?kpiattachmentHeader:kpiData.kpiattachmentHeader);
			
			var kpidesignlabel		=	"";
			var showhidevalue		=	"";
			var showlabelvalue		=	"";
			
			if(actualvstargetHeader !=	""){
				var subiniviewPreference	=	"true";
				showhidevalue		=	actualvstargetHeader.replaceallstring();
				showlabelvalue		=	actualvstargetHeader;
				if(kpipreference['preferences']	!=	null){
					subiniviewPreference	=	(kpipreference['preferences'][showhidevalue] !=	undefined?kpipreference['preferences'][showhidevalue]:"true");	
				}
				
				kpiempPreference["preferences"][showhidevalue]	=	subiniviewPreference;
				$("#kpiTargetActual").css("display",(subiniviewPreference == "true"?"block":"none"));
				subiniviewPreference	=	(subiniviewPreference	==	"true"?"checked":"");
				$("#kpiTargetActual").addClass(showhidevalue);
				kpidesignlabel		+=	'<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="'+showhidevalue+'" value="'+showhidevalue+'" class="form-check-input" '+subiniviewPreference+'/>'+showlabelvalue+'<span class="form-check-sign"><span class="check"></span></span></label></div></a></li>';
			}
			
			if(kpichartHeader !=	""){
				var subiniviewPreference	=	"true";
				showhidevalue		=	kpichartHeader.replaceallstring();
				showlabelvalue		=	kpichartHeader;
				if(kpipreference['preferences']	!=	null){
					subiniviewPreference	=	(kpipreference['preferences'][showhidevalue] !=	undefined?kpipreference['preferences'][showhidevalue]:"true");	
				}
				kpiempPreference["preferences"][showhidevalue]	=	subiniviewPreference;
				$("#kpiChart").css("display",(subiniviewPreference == "true"?"block":"none"));
				subiniviewPreference	=	(subiniviewPreference	==	"true"?"checked":"");
				$("#kpiChart").addClass(showhidevalue);
				kpidesignlabel		+=	'<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="'+showhidevalue+'" value="'+showhidevalue+'" class="form-check-input" '+subiniviewPreference+'/>'+showlabelvalue+'<span class="form-check-sign"><span class="check"></span></span></label></div></a></li>';
			}
			
			if(kpiinitiativeHeader !=	""){
				var subiniviewPreference	=	"true";
				showhidevalue		=	kpiinitiativeHeader.replaceallstring();
				showlabelvalue		=	kpiinitiativeHeader;
				if(kpipreference['preferences']	!=	null){
					subiniviewPreference	=	(kpipreference['preferences'][showhidevalue] !=	undefined?kpipreference['preferences'][showhidevalue]:"true");	
				}
				kpiempPreference["preferences"][showhidevalue]	=	subiniviewPreference;
				$("#headerInitiativeTemplate").css("display",(subiniviewPreference == "true"?"block":"none"));
				subiniviewPreference	=	(subiniviewPreference	==	"true"?"checked":"");
				$("#headerInitiativeTemplate").addClass(showhidevalue);
				kpidesignlabel		+=	'<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="'+showhidevalue+'" value="'+showhidevalue+'" class="form-check-input" '+subiniviewPreference+'/>'+showlabelvalue+'<span class="form-check-sign"><span class="check"></span></span></label></div></a></li>';
			}
			if(kpiRiskHeader !=	""){
				var subiniviewPreference	=	"true";
				showhidevalue		=	kpiRiskHeader.replaceallstring();
				showlabelvalue		=	kpiRiskHeader;
				if(kpipreference['preferences']	!=	null){
					subiniviewPreference	=	(kpipreference['preferences'][showhidevalue] !=	undefined?kpipreference['preferences'][showhidevalue]:"true");	
				}
				kpiempPreference["preferences"][showhidevalue]	=	subiniviewPreference;
				$("#headerRiskTemplate").css("display",(subiniviewPreference == "true"?"block":"none"));
				subiniviewPreference	=	(subiniviewPreference	==	"true"?"checked":"");
				$("#headerRiskTemplate").addClass(showhidevalue);
				kpidesignlabel		+=	'<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="'+showhidevalue+'" value="'+showhidevalue+'" class="form-check-input" '+subiniviewPreference+'/>'+showlabelvalue+'<span class="form-check-sign"><span class="check"></span></span></label></div></a></li>';
			}
			if(reporttableHeader !=	""){
				var subiniviewPreference	=	"true";
				showhidevalue		=	reporttableHeader.replaceallstring();
				showlabelvalue		=	reporttableHeader;
				if(kpipreference['preferences']	!=	null){
					subiniviewPreference	=	(kpipreference['preferences'][showhidevalue] !=	undefined?kpipreference['preferences'][showhidevalue]:"true");	
				}
				kpiempPreference["preferences"][showhidevalue]	=	subiniviewPreference;
				$("#kpiReportTemplate").css("display",(subiniviewPreference == "true"?"block":"none"));
				subiniviewPreference	=	(subiniviewPreference	==	"true"?"checked":"");
				$("#kpiReportTemplate").addClass(showhidevalue);
				kpidesignlabel		+=	'<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="'+showhidevalue+'" value="'+showhidevalue+'" class="form-check-input" '+subiniviewPreference+'/>'+showlabelvalue+'<span class="form-check-sign"><span class="check"></span></span></label></div></a></li>';
			}
			
			if(kpicommentsHeader !=	""){
				var subiniviewPreference	=	"true";
				showhidevalue		=	kpicommentsHeader.replaceallstring();
				showlabelvalue		=	kpicommentsHeader;
				if(kpipreference['preferences']	!=	null){
					subiniviewPreference	=	(kpipreference['preferences'][showhidevalue] !=	undefined?kpipreference['preferences'][showhidevalue]:"true");	
				}
				kpiempPreference["preferences"][showhidevalue]	=	subiniviewPreference;
				$("#kpi_comments").css("display",(subiniviewPreference == "true"?"block":"none"));
				subiniviewPreference	=	(subiniviewPreference	==	"true"?"checked":"");
				$("#kpi_comments").addClass(showhidevalue);
				kpidesignlabel		+=	'<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="'+showhidevalue+'" value="'+showhidevalue+'" class="form-check-input" '+subiniviewPreference+'/>'+showlabelvalue+'<span class="form-check-sign"><span class="check"></span></span></label></div></a></li>';
			}
			if(kpiattachmentHeader !=	""){
				var subiniviewPreference	=	"true";
				showhidevalue		=	kpiattachmentHeader.replaceallstring();
				showlabelvalue		=	kpiattachmentHeader;
				if(kpipreference['preferences']	!=	null){
					subiniviewPreference	=	(kpipreference['preferences'][showhidevalue] !=	undefined?kpipreference['preferences'][showhidevalue]:"true");	
				}
				kpiempPreference["preferences"][showhidevalue]	=	subiniviewPreference;
				$("#headerAttachmentTemplate").css("display",(subiniviewPreference == "true"?"block":"none"));
				subiniviewPreference	=	(subiniviewPreference	==	"true"?"checked":"");
				$("#headerAttachmentTemplate").addClass(showhidevalue);
				kpidesignlabel		+=	'<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="'+showhidevalue+'" value="'+showhidevalue+'" class="form-check-input" '+subiniviewPreference+'/>'+showlabelvalue+'<span class="form-check-sign"><span class="check"></span></span></label></div></a></li>';
			}
			
			parentKpidetails.id 	=	data.id;
			parentKpidetails.owner 	=	data.owner;
			parentKpidetails.createDateString 	=	data.createDateString;
			parentKpidetails.updatedDateString 	=	data.updatedDateString;
			parentKpidetails.objectiveId 		=	data.objectiveId;
			parentKpidetails.createdBy 			=	data.createdBy;
			parentKpidetails.kpiValue			=	kpiData;
			parentKpidetails.kpiFormula			=	data.kpiFormula;
			parentKpidetails.updatedBy 			=	data.updatedBy;
			parentKpidetails.createdTime 		=	data.createdTime;
			parentKpidetails.kpiId 				=	data.kpiId;
			
			//var readTargetAmount=	intergerHumanFormat(kpiData.target);
			var readTargetAmount=	(kpiData.target !=	undefined?kpiData.target:"");
			var targetnumber 	=	(kpiData.targetCurrency == undefined || kpiData.targetCurrency == ""?defaultkpiCurrency+readTargetAmount:kpiData.targetCurrency+readTargetAmount);
			
			//var readActualAmount=	intergerHumanFormat(kpiData.actual);
			var readActualAmount=	(kpiData.actual !=	undefined?kpiData.actual:"");
			var actualnumber 	=	(kpiData.actualCurrency == undefined || kpiData.actualCurrency == ""?defaultkpiCurrency+readActualAmount:kpiData.actualCurrency+readActualAmount);
			
			//var readBudgetAmount=	intergerHumanFormat(kpiData.budget);
			var readBudgetAmount=	(kpiData.budget !=	undefined?kpiData.budget:"");
			var budgetnumber 	=	(kpiData.budgetCurrency == undefined || kpiData.budgetCurrency == ""?defaultkpiCurrency+readBudgetAmount:kpiData.budgetCurrency+readBudgetAmount);
			
			//var readForecastAmount=	intergerHumanFormat(kpiData.forecast);
			var readForecastAmount=	(kpiData.forecast !=	undefined?kpiData.forecast:"");
			var forecastnumber 	=	(kpiData.forecastCurrency == undefined || kpiData.forecastCurrency == ""?defaultkpiCurrency+readForecastAmount:kpiData.forecastCurrency+readForecastAmount);
			
			var displayKpiStatusField	=	"";
			if (kpiData.header1 || kpiData.header2 || kpiData.header3 || kpiData.header4) {
				displayKpiStatusField	=	"kpi_amount_details";
			}else{
				displayKpiStatusField	=	"remove_kpi_amount_details";
			}
			
;			var threshholdstatus 	=	"";
			var color1 	=	"red";
			var color2 	=	"yellow";
			var color3 	=	"green";
			var colorvalue1	=	"";
			var colorvalue2 =	"";
			var colorvalue3	=	"";

			if(controlpanelKpiSettings !=	"" && controlpanelKpiSettings !=	undefined && controlpanelKpiSettings.threshold1Color != undefined && controlpanelKpiSettings.threshold1Color != ""){
				color1	=	controlpanelKpiSettings.threshold1Color;
			}
			
			if(controlpanelKpiSettings !=	"" && controlpanelKpiSettings !=	undefined && controlpanelKpiSettings.threshold2Color != undefined && controlpanelKpiSettings.threshold2Color != ""){
				color2	=	controlpanelKpiSettings.threshold2Color;
			}
		
			if(controlpanelKpiSettings !=	"" && controlpanelKpiSettings !=	undefined && controlpanelKpiSettings.threshold3Color != undefined && controlpanelKpiSettings.threshold3Color != ""){
				color3	=	controlpanelKpiSettings.threshold3Color;
			}
			if(kpiData.optioncolor1 !=	"" && kpiData.optioncolor1 !=	undefined){
				colorvalue1 	= 	kpiData.optioncolor1;	
			}
			
			if(kpiData.optioncolor2 !=	"" && kpiData.optioncolor2 !=	undefined){
				colorvalue2 	= 	kpiData.optioncolor2;	
			}
			if(kpiData.optioncolor3 !=	"" && kpiData.optioncolor3 !=	undefined){
				colorvalue3 	= 	kpiData.optioncolor3;	
			}
			
			
			if(kpiData.kpiType 	==	"Lead"){
				threshholdstatus 	=	'<div><i class="fas fa-circle" style="color:'+color1+';font-size:10px !important"></i><= '+colorvalue1+'</div></div><div class="amount"><div><i class="fas fa-circle" style="color:'+color2+';font-size:10px !important"></i> >= '+colorvalue2+'</div></div><div class="amount"><div><i class="fas fa-circle" style="color:'+color3+';font-size:10px !important"></i> >='+colorvalue3+'</div></div>';	
			}else if(kpiData.kpiType 	==	"Lag"){
				threshholdstatus 	=	'<div><i class="fas fa-circle" style="color:'+color1+';font-size:10px !important"></i><= '+colorvalue1+'</div></div><div class="amount"><div><i class="fas fa-circle" style="color:'+color2+';font-size:10px !important"></i> <= '+colorvalue2+'</div></div><div class="amount"><div><i class="fas fa-circle" style="color:'+color3+';font-size:10px !important"></i> <='+colorvalue3+'</div></div>';				
			}else{
				threshholdstatus 	=	'<div><i class="fas fa-circle" style="color:'+color1+';font-size:10px !important"></i> <='+colorvalue1+'</div></div><div class="amount"><div><i class="fas fa-circle" style="color:'+color2+';font-size:10px !important"></i> >= '+colorvalue2+'</div></div><div class="amount"><div><i class="fas fa-circle" style="color:'+color3+';font-size:10px !important"></i> <='+colorvalue3+'</div></div>';
			}
			
			kpi_measurement	=	kpiData.kpi_measurement;
			var riskstauts	=	"";
			if(kpiData.riskStatusLight !=	"" && kpiData.riskStatusLight != undefined){
				riskstauts	=	'<div class="employee_details_content_info"><div class="employee_info" data-i18n="Risk">Risk</div><p><a href="/stratroom/risks?kpiId='+data.id+'&kpiRiskView=true"><i class="'+kpiData.riskStatusLight+'" style="font-size:10px !important"></i></a></p></div>';	
			}
			
			var actual	=	(kpiData.actual == "" || kpiData.actual == undefined?defaultkpiCurrencyValue:actualnumber);
			var actualfieldstauts	=	"";
			if(kpiData.header1 !=	"" && kpiData.header1 != undefined){
				actualfieldstauts	=	'<div class="kpi_amount_actual colfp"><div data-i18n="Actual">Actual</div><div class="kpi_amount_actual_value" style="color:#fff">'+actual+'</div></div>';
			}
			
			var target	=	(kpiData.target == "" || kpiData.target == undefined?defaultkpiCurrencyValue:targetnumber);
			var targetfieldstauts	=	"";
			if(kpiData.header2 !=	"" && kpiData.header2 != undefined){
				targetfieldstauts	=	'<div class="kpi_amount_target coltp"><div>Target</div><div class="kpi_amount_target_value">'+target+'</div></div>';	
			}
			
			var budget	=	(kpiData.budget == "" || kpiData.budget == undefined?defaultkpiCurrencyValue:budgetnumber);
			var budgetfieldstauts	=	"";
			if(kpiData.header3 !=	"" && kpiData.header3 != undefined){
				if(kpiData.header3 == "Target")
					{
					targetfieldstauts	=	'<div class="kpi_amount_target coltp"><div>Target</div><div class="kpi_amount_target_value">'+target+'</div></div>';	
					}
				else
					{
				budgetfieldstauts	=	'<div class="kpi_amount_budget colfp"><div>Budget</div><div class="kpi_amount_budget_value" style="color:#fff">'+budget+'</div></div>';
					}
			}
			
			var forecast	=	(kpiData.forecast == "" || kpiData.forecast == undefined?defaultkpiCurrencyValue:forecastnumber);
			var forecastfieldstauts	=	"";
			if(kpiData.header4 !=	"" && kpiData.header4 != undefined){
				forecastfieldstauts	=	'<div class="kpi_amount_forecast coltp"><div>Forecast</div><divs class="kpi_amount_forecast_value">'+forecast+'</div></div>';	
			}
			
			var kpiParentEditBtn	=	"";
			var kpiParentuploadBtn	=	"";
			var kpiParentviewBtn	=	"";
			
			if(kpieditpermission	==	true){
				kpiParentEditBtn	=	`<span data-bs-toggle="modal" data-bs-target=".kpi_description_popup" class="btn btn-sm btn-icon">
                      <i class="fas fa-pencil-alt title_edit_icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="Edit" onClick="handleKpidescriptionevent('`+data.kpiId+`',`+data.id+`, 'edit')"></i>
                    </span>`;
				kpiParentuploadBtn	=	` <span data-bs-toggle="modal" data-bs-target=".file_upload_popup" class="btn btn-sm btn-icon">
                      <i class="fas fa-paperclip title_edit_icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title="File Upload"></i>
                    </span>`;
				kpiParentviewBtn	=	`<div class="dropdown title_edit_icon">
  <span class="btn btn-sm btn-icon" id="popoverFilter" data-bs-toggle="dropdown" aria-expanded="false" title="View">
    <i class="fas fa-eye"></i>
  </span>
  <ul class="dropdown-menu dropdown-menu-end kpidropdown-hide multi-column" style="min-width: 200px; padding-top: 12px; padding-bottom: 4px;">
    <div class="row">
      <div class="col-sm-12">
        <ul class="multi-column-dropdown kpiview_multi-column-dropdown">`
          +kpidesignlabel+
        `</ul>
      </div>
    </div>
  </ul>
</div>
`;
			}
			
			var kpiParentDeleteBtn	=	"";
			if(kpideletepermission	==	true){
				kpiParentDeleteBtn	=	`<ul class="header-dropdown">
                                                <li class="dropdown title_edit_icon">
                                                    <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                                        <i class="material-icons" data-toggle="tooltip" data-placement="bottom" title="More">more_horiz</i>
                                                    </a>
                                                    <ul class="dropdown-menu kpideletedropdown pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
                                                                                                                <li>
                                                            <a href="#" onclick="return false;" class="delete-row">Delete</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>`;
				kpiParentDeleteBtn	=	"";
			}
		
			var detailTemplate = Handlebars.compile(kpiDetailsTemplate);	
			var kpiName = kpiData.name ? kpiData.name : kpiData.subMeasureName;	
				var detailHtml = {
					
						id : data.id,
						kpiId:data.kpiId,
						userDept:dept,
						Owner:Owner,
						kpidesignlabel:kpidesignlabel,
						name : kpiName,
						trend:(kpiData.trend != undefined?kpiData.trend:""),
						actual : actual,
						target : target,
						budget : budget,
						forecast : forecast,
						period : kpiData.kpi_measurement,
						statusLight :kpiData.status,
						riskStatusLight : riskstauts,
						threshholdstatus:threshholdstatus,
						displayKpiStatusField:displayKpiStatusField,
						actualfieldstauts:actualfieldstauts,
						targetfieldstauts:targetfieldstauts,
						budgetfieldstauts:budgetfieldstauts,
						forecastfieldstauts:forecastfieldstauts,
						kpiParentEditBtn:kpiParentEditBtn,
						kpiParentuploadBtn:kpiParentuploadBtn,
						kpiParentviewBtn:kpiParentviewBtn,
						kpiParentDeleteBtn:kpiParentDeleteBtn
					};
				
				$('#kpiDetailsView').append(detailTemplate(detailHtml));
				if(displayKpiStatusField	==	"remove_kpi_amount_details"){
					$(".remove_kpi_amount_details").css("display","none");
					//$(".remove_kpi_amount_details").find("[class*=kpi_amount_]>div>").removeClass();	
				}

				$('[data-toggle="tooltip"]').tooltip();
				$('[rel="tooltip"]').tooltip();
				
				$('.kpiview_multi-column-dropdown input[type="checkbox"]').click(function () {
			  		var inputValue = $(this).attr('value');
					var checkedProp 	= 	$(this).is(':checked');
					inputValue			=	inputValue.replaceallstring();
					kpiempPreference["pageName"]				=	"KPI";
					kpiempPreference["pageId"]					= 	currentPageId;
					kpiempPreference["preferences"][inputValue]	=	checkedProp;
					$.ajax({
						url : "/stratroom/employeePreference",
						type : "POST",
						contentType : "application/json",
						data : JSON.stringify(kpiempPreference),
						success : function(data, status) {
							
						},
						error:readErrorMsg
					});
			  		$("." + inputValue).toggle();
				});	
				$(".kpidropdown-hide").on("click", function (e) {
		        	e.stopPropagation();
		      	});
		},error: function (msg, status) {
			if (!jQuery.isEmptyObject(msg.responseText)) {
				if (msg.status == "404") {
					$("#headerInitiativeTemplate").hide();
					$("#headerRiskTemplate").hide();
					$("#kpi_comments").hide();
					$("#headerAttachmentTemplate").hide();
				}
			}
		}
		
		
	});
	
	if($(".kpidescimgprofile").attr('src') == "" || $(".kpidescimgprofile").attr('src') == undefined){ 
		$('.kpidescimgprofile').initial({
		 charCount : 2,
		 height : 30,
		 width : 30,
		 fontSize : 18
		});
	}

	$.ajax({
		url : "/stratroom/kpi/initiativesList/" + id,
		success : function(data, status) {
			kpiInitSuccessCallback(data,id);
		}
	});
	$.ajax({
		url : "/stratroom/kpi/riskList/"+id,
		success : function(data, status) {
			kpiRiskSuccessCallback(data,id);
		}
	});
	
	$.ajax({
		url : "/stratroom/commentList/kpi/" + id,
		success :function(data, status) {
			kpiCommentSuccessCallback(data,id);
		}
	});
	$.ajax({
		url: '/stratroom/kpiAttachmentList/'+id,
		success : function(data, status) {
			kpiAttachmentSuccessCallback(data,id);
		}
	});
	/*$.ajax({
		url : "/stratroom/updateKpiDetails/" + id
	});*/
	
	$.ajax({
		url : "/stratroom/kpiDetailList/" + id+"?period="+$("#datePeriod").val()+"&flagType="+flagType,
		contentType : "application/json",
		async:false,
		success : function(data, status) {
			kpiActualSuccessCallback(data,id);
		},
		error:function(msg,status){

			
		}
	});
		
	kpi_measurement	=	(kpi_measurement !=	undefined?kpi_measurement:"Monthly");
	var kpimeasurementtype	=	1;
	if(kpi_measurement	==	"Monthly"){
		kpimeasurementtype	=	1;	
	}else if(kpi_measurement	==	"Quarterly"){
		kpimeasurementtype	=	2;	
	}else if(kpi_measurement	==	"Half Yearly"){
		kpimeasurementtype	=	3;	
	}else if(kpi_measurement	==	"Annually"){
		kpimeasurementtype	=	4;	
	}
	
	$.ajax({
		url : "/stratroom/kpiDetailList/" + id+"?period="+$("#datePeriod").val()+"&tableFrequency="+kpi_measurement+"&groupBy=Dept"+"&tableType=dril"+"&flagType="+flagType,
		contentType : "application/json",
		async:false,
		success : function(data, status) {
			kpiReporttableSuccessCallback(data,id,kpimeasurementtype);
		},
		error:function(msg,status){

			
		}
	});

$(document).on('click', '.employeereportevent', function (e) {
    e.stopPropagation(); // Prevent multiple triggers

    const $row = $(this).closest("tr");
    const $icon = $(this).find(".toggle-icon");
    const id = $(this).attr("data-id");
    const empname = ($(this).attr("data-empname") || $(this).attr("data-empName") || "").replace(/&/g, '');
    const periodtype = $(this).attr("data-periodtype");

    if (!id || !periodtype) return;

    const uniqueKey = id + "-" + empname;

    // Prevent multiple rapid clicks during AJAX
    if ($icon.hasClass("loading")) return;
    $icon.addClass("loading");

    if ($icon.hasClass("fa-plus")) {
        // 🔹 EXPAND
        $icon.removeClass("fa-plus").addClass("fa-spinner fa-spin"); // show loading spinner

        let type = "Monthly";
        if (periodtype == 1) type = "Monthly";
        else if (periodtype == 2) type = "Quarterly";
        else if (periodtype == 3) type = "Half Yearly";
        else if (periodtype == 4) type = "Annually";

        $.ajax({
            url: `/stratroom/kpiDetailList/${id}?period=${$("#datePeriod").val()}&tableFrequency=${type}&groupBy=Dept&deptName=${empname}&tableType=dril&flagType=${flagType}`,
            contentType: "application/json",
            success: function (data) {
                // Remove existing child rows for this parent
                $(`tr.child-row[data-parent='${uniqueKey}']`).remove();

                let tempHtml = "";
                data.forEach(obj => {
                    Object.entries(obj).forEach(([subEmpName, empData]) => {
                        const hasChild = empData.childFlag === true;
                        const periods = Object.keys(empData).filter(k => k !== "childFlag");

                        tempHtml += `
                            <tr class='child-row' data-parent='${uniqueKey}' style='background-color:#fafafa; display:none;'>`;

                        if (hasChild) {
                            tempHtml += `
                                <td class="employeereportevent" 
                                    data-id="${id}" 
                                    data-empname="${subEmpName}" 
                                    data-periodtype="${periodtype}">
                                    <i class="fas fa-plus toggle-icon" style="cursor:pointer;"></i>
                                </td>`;
                        } else {
                            tempHtml += `<td></td>`;
                        }

                        tempHtml += `<td>${subEmpName.split('-')[0]}</td>`;

                        periods.forEach(period => {
                            const val = empData[period];
                            if (val && typeof val === "object") {
                                if (drilltableactual)
                                    tempHtml += `<td style='text-align:right;'>${val.currency ?? ""}${val.actual ?? ""}</td>`;
                                if (drilltabletarget)
                                    tempHtml += `<td style='text-align:right;'>${val.currency ?? ""}${val.target ?? ""}</td>`;
                                if (drilltablegap)
                                    tempHtml += `<td style='text-align:right;'>${val.currency ?? ""}${val.gap ?? ""}</td>`;
                                if (drilltablegap)
                                    tempHtml += `<td style='text-align:right;'>${val.currency ?? ""}${val.contribution ?? ""}</td>`;
                            }
                        });

                        tempHtml += `</tr>`;
                    });
                });

                // Insert rows and animate
                const $newRows = $(tempHtml);
                $row.after($newRows);
                $newRows.slideDown(250); // ✅ Smooth slide-down animation
            },
            error: function (msg) {
                console.error("Error loading drilldown data", msg);
                $icon.removeClass("fa-spinner fa-spin").addClass("fa-plus"); // revert on failure
            },
            complete: function () {
                // Restore minus icon once loaded
                $icon.removeClass("fa-spinner fa-spin loading").addClass("fa-minus");
            }
        });
    } else {
        // 🔹 COLLAPSE
        $icon.removeClass("fa-minus").addClass("fa-plus");
        const $childRows = $(`tr.child-row[data-parent='${uniqueKey}']`);
        $childRows.slideUp(250, function () {
            $(this).remove(); // remove after animation
        });
        $icon.removeClass("loading");
    }
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

function getName(empId){
	$.each(kpireporteelist,function(ownkey,empvalue){
		if(empvalue.id	==	empId){
			return empvalue.name;
		}else{
			return "";
		}
	});
}

function kpiActualSuccessCallback(data, kpiId){	
	var headerTemplate = $('#kpiActualTargetTemplate').html();
	$('#kpiTargetActual').empty();
	var bodyRows = '';
	var kpiActualTargetRowTemplate 	= 	$('#kpiActualTargetRowTemplate').html();
	var chartflagenable	=	false;
	kpichartDataList	=	[];
	//var actualvstargetRow	=	"";
	$.each(data,function(key,value){
		var kpiobj	=	{};
		var kpichartobj		=	{};
		$.each(value,function(index,objval){ 
			//trimvalueremovesoecialchars(objval.actual)
			chartflagenable	=	true;
						
			var actualchartnum		=	"";
			var targetchartnum		=	"";
			var gapchartnum			=	"";
			var contributionchartnum =	"";
			
		
			var numberchartActual	=	(objval.actual !=	undefined?objval.actual:"");
			var numberchartTarget	=	(objval.target !=	undefined?objval.target:"");
			var numberchartGap		=	(objval.gap !=	undefined?objval.gap:"");
			var numannualTarget		=	(objval.annualTarget !=	undefined?objval.annualTarget:"");
			var numberchartContribution		=	(objval.contribution !=	undefined?objval.contribution:"");
			var annualTargetcurrency=	(objval.annualCurrency !=	undefined?objval.annualCurrency:"");
			actualchartnum	=	numberchartActual;
			targetchartnum	=	numberchartTarget;
			gapchartnum	=	numberchartGap;
			contributionchartnum=numberchartContribution;
		
			var actualcheckispositiveornot	=	checkPositiveorNegative(actualchartnum);
			var targetcheckispositiveornot	=	checkPositiveorNegative(targetchartnum);
			var gapcheckispositiveornot		=	checkPositiveorNegative(gapchartnum);
			var atargetcheckispositiveornot		=	checkPositiveorNegative(objval.annualTarget);
			var ytdcheckispositiveornot		=	checkPositiveorNegative(objval.ytd);
			var contributioncheckispositiveornot		=	checkPositiveorNegative(contributionchartnum);
			
			if(numberchartActual.includes("M") || numannualTarget.includes("M") )
			{
				kpimillions = true;
			}
			else if (numberchartActual.includes("%") || numannualTarget.includes("%") )
			{
				kpipercentage = true;
			}
														
			if(objval.currency !=	undefined && objval.currency !=	""){
				kpicurrencyval= objval.currency;
			}
			actualcheckispositiveornot	=	(actualcheckispositiveornot	==	1?"negativeHighlight":"");
			targetcheckispositiveornot	=	(targetcheckispositiveornot	==	1?"negativeHighlight":"");
			gapcheckispositiveornot		=	(gapcheckispositiveornot	==	1?"negativeHighlight":"");
			ytdcheckispositiveornot		=	(ytdcheckispositiveornot	==	1?"negativeHighlight":"");
			atargetcheckispositiveornot	=	(atargetcheckispositiveornot	==	1?"negativeHighlight":"");
				contributioncheckispositiveornot	=	(contributioncheckispositiveornot	==	1?"negativeHighlight":"");
			var currency		=	objval.currency;
			var annualCurrency	=	(objval.annualCurrency !=	undefined?objval.annualCurrency:"");
			var annualTarget	=	(objval.annualTarget !=	undefined?objval.annualTarget:"");
			var datatablebodyrow	=	"";
			if(datatableactual	==	true){
				datatablebodyrow	+=	`<td style="font-family:'Poppins', sans-serif !important;text-align:center !important;" class="`+actualcheckispositiveornot+`">`+currency+actualchartnum+`</td>`;
			}
			if(datatabletarget	==	true){
				datatablebodyrow	+=	`<td  class="`+targetcheckispositiveornot+`">`+currency+targetchartnum+`</td>`;
			}
			if(datatableannualtarget	==	true){
				datatablebodyrow	+=	`<td  class="`+atargetcheckispositiveornot+`">`+annualCurrency+annualTarget+`</td>`;
			}
			if(datatablegap	==	true){
				datatablebodyrow	+=	`<td  class="`+gapcheckispositiveornot+`">`+currency+gapchartnum+`</td>`;
			}
			if(datatableytd	==	true){
				datatablebodyrow	+=	`<td  class="`+ytdcheckispositiveornot+`">`+currency+objval.ytd+`</td>`;
			}
			if(datatablecontribution	==	true){
				datatablebodyrow	+=	`<td style="font-family:'Poppins', sans-serif !important;" class="`+contributioncheckispositiveornot+`">`+currency+contributionchartnum+`</td>`;
			}

			kpiobj	=	{
				period : index,
				actual : actualchartnum,
				target : targetchartnum,
				gap : gapchartnum,
				contribution:contributionchartnum,
				ytd:objval.ytd,
				currency:objval.currency,
				annualTarget:objval.annualTarget,
				annualCurrency:objval.annualCurrency,
				actualcheckispositiveornot:actualcheckispositiveornot,
				targetcheckispositiveornot:targetcheckispositiveornot,
				gapcheckispositiveornot:gapcheckispositiveornot,
				contributioncheckispositiveornot:contributioncheckispositiveornot,
				ytdcheckispositiveornot:ytdcheckispositiveornot,
				atargetcheckispositiveornot:atargetcheckispositiveornot,
				datatablebodyrow:datatablebodyrow
			}
			
			/*actualvstargetRow	+=	`<tr>
				<td style="font-family:'Poppins', sans-serif !important;text-align:center !important;">`+index+`</td>
				<td style="font-family:'Poppins', sans-serif !important;text-align:center!important;" class="`+actualcheckispositiveornot+`">`+objval.currency+actualchartnum+`</td>
				<td  class="`+targetcheckispositiveornot+`">`+objval.currency+targetchartnum+`</td>
				<td  class="`+atargetcheckispositiveornot+`">`+annualTargetcurrency+numannualTarget+`</td>
				<td  class="`+gapcheckispositiveornot+`">`+objval.currency+gapchartnum+`</td>
				<td  class="`+ytdcheckispositiveornot+`">`+objval.currency+objval.ytd+`</td>
			</tr>`;*/
			
			/*if(numberchartActual['firstletter']	==	"-"){
				numberchartActual['number']	=	numberchartActual['firstletter']+numberchartActual['number'];
			}
			
			if(numberchartTarget['firstletter']	==	"-"){
				numberchartTarget['number']	=	numberchartTarget['firstletter']+numberchartTarget['number'];
			}
			
			if(numberchartGap['firstletter']	==	"-"){
				numberchartGap['number']	=	numberchartGap['firstletter']+numberchartGap['number'];
			}
		
			kpichartobj	=	{
					period : index,
					actual : (numberchartActual['number'] ==	0?1:numberchartActual['number']),
					target : (numberchartTarget['number'] ==	0?1:numberchartTarget['number']),
					gap : (numberchartGap['number'] ==	0?1:numberchartGap['number'])
				};*/
			
			kpichartobj	=	{
					period : index,
					actual : (actualchartnum),
					target : (targetchartnum),
					gap : (gapchartnum),
					contribution : (contributionchartnum)
				};	
			
			kpichartDataList.push(kpichartobj);
			bodyRows = bodyRows + Mustache.render(kpiActualTargetRowTemplate,kpiobj);
		});
	});
	
	if(chartflagenable	==	false){
		kpichartDataList	=	[];
	}
	
	var kpiParentOptions	=	"";
	if(kpideletepermission	==	false && kpiviewpermission	==	false){
		kpiParentOptions	=	"";
	}else{
		kpiParentOptions	=	`  <div class="card-actions">
                <div class="dropdown">

                  <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                  </button>

                  <ul class="dropdown-menu dropdown-menu-end border-0 shadow" x-placement="bottom-start">`;
	
		if(kpiviewpermission	==	true){
			kpiParentOptions	+=	` <li>
                      <a class="dropdown-item" href=".sub_initative_view_popup" data-bs-toggle="modal" onclick="kpiActualtargetviewdetails('`+kpiId+`','view')">View</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#"
                         onclick="kpiActualtargetviewdetails('`+kpiId+`','csvdownload');">Download CSV</a>
                    </li>
					`;
		}
		if(kpideletepermission	==	true){
			//kpiParentOptions	+=	`<li><a href="#" onclick="return false;" class="delete-row">Delete</a></li>`;
		}
		
		kpiParentOptions	+=	` </ul></div></div>`;
	}
		
	var kpitableInlineEditIcon	=	`<strong>`+actualvstargetHeader+`</strong>`;										
	if(kpieditpermission	==	true){
		kpitableInlineEditIcon	=	`<strong class="editableTxt2" contenteditable="true" onkeypress="return (this.innerText.length <= 25)" data-oldactualvstargetHeader="`+actualvstargetHeader+`" id="actualvstargetHeader" editable="true">`+actualvstargetHeader+`</strong>`;
	}
	
	var datatableheaderrow	=	"";
	if(datatableactual	==	true){
		datatableheaderrow	+=	`<th  data-i18n="Actual">Actual</th>`;
	}
	if(datatabletarget	==	true){
		datatableheaderrow	+=	`<th  data-i18n="Target">Target</th>`;
	}
	if(datatableannualtarget	==	true){
		datatableheaderrow	+=	`<th  data-i18n="Annual Target">Annual Target</th>`;
	}
	if(datatablegap	==	true){
		datatableheaderrow	+=	`<th  data-i18n='Gap'>Gap</th>`;
	}
	if(datatableytd	==	true){
		datatableheaderrow	+=	`<th  data-i18n="YTD">YTD</th>`;
	}
	if(datatablecontribution	==	true){
		datatableheaderrow	+=	`<th style="font-family:'Poppins', sans-serif !important;width:17%;">Contribution</th>`;
	}
	
	var headerDetails = Mustache.render(headerTemplate, {
		id : kpiId,
		actualvstargetHeader:actualvstargetHeader,
		kpitableInlineEditIcon:kpitableInlineEditIcon,
		kpiParentOptions:kpiParentOptions,
		datatableheaderrow:datatableheaderrow,
		bodyRows:bodyRows
	});
	
	
	
	$('#kpiTargetActual').html(headerDetails);
	//$("#actualtargetrow").empty();
	//$("#actualtargetrow").html(datatablebody);			
	$("#dataTable").paging({ limit: 7 });

	
	var kpiParentOptions	=	"";
	if(kpideletepermission	==	false && kpiviewpermission	==	false){
		kpiParentOptions	=	"";
	}else{
		kpiParentOptions	=	`<div class="dropdown">
        <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg" alt="Options" />
        </button>
        <ul class="dropdown-menu dropdown-menu-end shadow">`;
	
		if(kpiviewpermission	==	true){
			kpiParentOptions	+=	` <li>
            <a class="dropdown-item" href="kpi_chart_view_popup" data-bs-toggle="modal" onclick="kpichartviewdetails();">View</a>
          </li>`;
		}
		if(kpideletepermission	==	true){
			//kpiParentOptions	+=	`<li><a href="#" onclick="return false;">Delete</a></li>`;
		}
		
		kpiParentOptions	+=	` </ul></div>`;
	}
	
	var lastviewedchart	=	localStorage.getItem("kpichartviewdata");
	lastviewedchart		=	(lastviewedchart !=	null?lastviewedchart:3);
	var charticonchange	=	`<i class="fas fa-chart-line"></i>`;
	if(lastviewedchart	==	4){
		charticonchange	=	`<i class="fas fa-chart-area"></i>`;
	}else if(lastviewedchart	==	2){
		charticonchange	=	`<i class="fas fa-chart-bar"></i>`;
	}
		
	var kpichartInlineEditIcon	=	`<strong>`+kpichartHeader+`</strong>`;										
	if(kpieditpermission	==	true){
		kpichartInlineEditIcon	=	`<strong class="editableTxt2" contenteditable="true" onkeypress="return (this.innerText.length <= 25)" data-oldkpichartHeader="`+kpichartHeader+`" id="kpichartHeader" editable="true">`+kpichartHeader+`</strong></h5>`;
	}
	
	var chartTemplate = $('#kpiChartViewTemplate').html();
	var headerDetails = Mustache.render(chartTemplate, {
		id : kpiId,
		kpichartHeader:kpichartHeader,
		kpichartInlineEditIcon:kpichartInlineEditIcon,
		kpiParentOptions:kpiParentOptions,
		charticonchange:charticonchange
	});
	
	$('#kpiChart').html(headerDetails);
	
	drawChart("#chartdiv_init",lastviewedchart);
	$('.chartrisktemplatediv').slimscroll({
		height: '340px',
		size: '3px',
		color: '#9c9c9c'
	});
	
}


function kpiActualViewSuccessCallback(data, kpiId){	
	var bodyRows = '';
	var bodyheaderth	=	"";
	if(datatableactual	==	true){
		bodyheaderth	+=	`<th  data-i18n="Actual">Actual</th>`;
	}
	if(datatabletarget	==	true){
		bodyheaderth	+=	`<th  data-i18n="Target">Target</th>`;
	}
	if(datatableannualtarget	==	true){
		bodyheaderth	+=	`<th  data-i18n="Annual Target">Annual Target</th>`;
	}
	if(datatablegap	==	true){
		bodyheaderth	+=	`<th  data-i18n='Gap'>Gap</th>`;
	}
	if(datatableytd	==	true){
		bodyheaderth	+=	`<th  data-i18n="YTD">YTD</th>`;
	}
	if(datatablecontribution	==	true){
		bodyheaderth	+=	`<th style="font-family:'Poppins', sans-serif !important;width:17%;" >Contribution</th>`;
	}
	var body	=	`<table class="table dashboard-task-infos align-center dashboard-table" style="width:100%;overflow-x:scroll !important;" id="actualtargettableviewpaging">
					<thead style="background-color: rgb(135 58 112 / 40%); !important;">
						<tr>
							<th data-i18n="Period">Period</th>
							`+bodyheaderth+`
						</tr>
					</thead>
					<tbody>`;
	$("#actualviewheader").text($("#actualvstargetHeader").text());
	
	$.each(data,function(key,value){
		var kpiobj	=	{};
		var kpichartobj		=	{};
		$.each(value,function(index,objval){
			var actualchartnum		=	"";
			var targetchartnum		=	"";
			var gapchartnum			=	"";
			var contributionchartnum =	"";
	
			
			var numberchartActual	=	(objval.actual !=	undefined?objval.actual:"");
			var numberchartTarget	=	(objval.target !=	undefined?objval.target:"");
			var numberchartGap		=	(objval.gap !=	undefined?objval.gap:"");
			var numannualTarget		=	(objval.annualTarget !=	undefined?objval.annualTarget:"");
			var annualTargetcurrency=	(objval.annualCurrency !=	undefined?objval.annualCurrency:"");
			var numberchartContribution		=	(objval.contribution !=	undefined?objval.contribution:"");
			actualchartnum	=	numberchartActual;
			targetchartnum	=	numberchartTarget;
			gapchartnum	=	numberchartGap;
			contributionchartnum=numberchartContribution;
			var actualcheckispositiveornot	=	checkPositiveorNegative(actualchartnum);
			var targetcheckispositiveornot	=	checkPositiveorNegative(targetchartnum);
			var gapcheckispositiveornot		=	checkPositiveorNegative(gapchartnum);
			var atargetcheckispositiveornot		=	checkPositiveorNegative(numannualTarget);
			var ytdcheckispositiveornot		=	checkPositiveorNegative(objval.ytd);
			var contributioncheckispositiveornot		=	checkPositiveorNegative(contributionchartnum);
			
			actualcheckispositiveornot		=	(actualcheckispositiveornot	==	1?"negativeHighlight":"");
			targetcheckispositiveornot		=	(targetcheckispositiveornot	==	1?"negativeHighlight":"");
			gapcheckispositiveornot			=	(gapcheckispositiveornot	==	1?"negativeHighlight":"");
			ytdcheckispositiveornot			=	(ytdcheckispositiveornot	==	1?"negativeHighlight":"");
			atargetcheckispositiveornot		=	(atargetcheckispositiveornot	==	1?"negativeHighlight":"");
			contributioncheckispositiveornot	=	(contributioncheckispositiveornot	==	1?"negativeHighlight":"");
			var bodyrowtd	=	"";
			if(datatableactual	==	true){
				bodyrowtd	+=	`<td style="font-family:'Poppins', sans-serif !important;text-align:center!important;" class="`+actualcheckispositiveornot+`">`+objval.currency+actualchartnum+`</td>`;
			}
			if(datatabletarget	==	true){
				bodyrowtd	+=	`<td  class="`+targetcheckispositiveornot+`">`+objval.currency+targetchartnum+`</td>`;
			}
			if(datatableannualtarget	==	true){
				bodyrowtd	+=	`<td  class="`+atargetcheckispositiveornot+`">`+annualTargetcurrency+numannualTarget+`</td>`;
			}
			if(datatablegap	==	true){
				bodyrowtd	+=	`<td  class="`+gapcheckispositiveornot+`">`+objval.currency+gapchartnum+`</td>`;
			}
			if(datatableytd	==	true){
				bodyrowtd	+=	`<td  class="`+ytdcheckispositiveornot+`">`+objval.currency+objval.ytd+`</td>`;
			}
			if(datatablecontribution	==	true){
				bodyrowtd	+=	`<td style="font-family:'Poppins', sans-serif !important;" class="`+contributioncheckispositiveornot+`">`+objval.currency+contributionchartnum+`</td>`;
			}
			bodyRows	+=	`<tr>
				<td style="font-family:'Poppins', sans-serif !important;text-align:center !important;">`+index+`</td>
				`+bodyrowtd+`
			</tr>`;
			
		});
	});
	
	
	body	=	body+bodyRows+`</tbody></table>`;
	$('#actualtargetview').html(body);
	$("#actualtargettableviewpaging").paging({ limit: 7 });
}

function kpiActualDownloadSuccessCallback(data, kpiId){	
	var bodyRows = '';
	var bodyheaderth	=	"";
	if(datatableactual	==	true){
		bodyheaderth	+=	`<td  data-i18n="Actual">Actual</td>`;
	}
	if(datatabletarget	==	true){
		bodyheaderth	+=	`<td  data-i18n="Target">Target</td>`;
	}
	if(datatableannualtarget	==	true){
		bodyheaderth	+=	`<td >Annual Target</td>`;
	}
	if(datatablegap	==	true){
		bodyheaderth	+=	`<td  data-i18n='Gap'>Gap</td>`;
	}
	if(datatableytd	==	true){
		bodyheaderth	+=	`<td  data-i18n="YTD">YTD</td>`;
	}
	if(datatablecontribution	==	true){
		bodyheaderth	+=	`<td style="font-family:'Poppins', sans-serif !important;width:17%;" >Contribution</td>`;
	}
	var body	=	`
						<tr>
							<td data-i18n="Period">Period</td>
							`+bodyheaderth+`
						</tr>`;
	
	$.each(data,function(key,value){
		var kpiobj	=	{};
		var kpichartobj		=	{};
		$.each(value,function(index,objval){
			if(index !=	"" && index !=	undefined){
				var actualchartnum		=	"";
				var targetchartnum		=	"";
				var gapchartnum			=	"";
				var contributionchartnum =	"";
				
				var numberchartActual	=	(objval.actual !=	undefined?objval.actual:"");
				var numberchartTarget	=	(objval.target !=	undefined?objval.target:"");
				var numberchartGap		=	(objval.gap !=	undefined?objval.gap:"");
				var numberchartContribution		=	(objval.contribution !=	undefined?objval.contribution:"");
				var numannualTarget		=	(objval.annualTarget !=	undefined?objval.annualTarget:"");
				var annualTargetcurrency=	(objval.annualCurrency !=	undefined?objval.annualCurrency:"");
				actualchartnum	=	numberchartActual;
				targetchartnum	=	numberchartTarget;
				gapchartnum	=	numberchartGap;
				contributionchartnum=numberchartContribution;
				var actualcheckispositiveornot	=	checkPositiveorNegative(actualchartnum);
				var targetcheckispositiveornot	=	checkPositiveorNegative(targetchartnum);
				var gapcheckispositiveornot		=	checkPositiveorNegative(gapchartnum);
				var contributioncheckispositiveornot		=	checkPositiveorNegative(contributionchartnum);
				var atargetcheckispositiveornot		=	checkPositiveorNegative(numannualTarget);
				var ytdcheckispositiveornot		=	checkPositiveorNegative(objval.ytd);
				
				actualcheckispositiveornot		=	(actualcheckispositiveornot	==	1?"negativeHighlight":"");
				targetcheckispositiveornot		=	(targetcheckispositiveornot	==	1?"negativeHighlight":"");
				gapcheckispositiveornot			=	(gapcheckispositiveornot	==	1?"negativeHighlight":"");
				ytdcheckispositiveornot			=	(ytdcheckispositiveornot	==	1?"negativeHighlight":"");
				atargetcheckispositiveornot		=	(atargetcheckispositiveornot	==	1?"negativeHighlight":"");
				contributioncheckispositiveornot	=	(contributioncheckispositiveornot	==	1?"negativeHighlight":"");

				var bodyrowtd	=	"";
				if(datatableactual	==	true){
					bodyrowtd	+=	`<td style="font-family:'Poppins', sans-serif !important;text-align:center!important;" class="`+actualcheckispositiveornot+`">`+objval.currency+actualchartnum+`</td>`;
				}
				if(datatabletarget	==	true){
					bodyrowtd	+=	`<td  class="`+targetcheckispositiveornot+`">`+objval.currency+targetchartnum+`</td>`;
				}
				if(datatableannualtarget	==	true){
					bodyrowtd	+=	`<td  class="`+atargetcheckispositiveornot+`">`+annualTargetcurrency+numannualTarget+`</td>`;
				}
				if(datatablegap	==	true){
					bodyrowtd	+=	`<td  class="`+gapcheckispositiveornot+`">`+objval.currency+gapchartnum+`</td>`;
				}
				if(datatableytd	==	true){
					bodyrowtd	+=	`<td  class="`+ytdcheckispositiveornot+`">`+objval.currency+objval.ytd+`</td>`;
				}
				if(datatablecontribution	==	true){
					bodyrowtd	+=	`<td style="font-family:'Poppins', sans-serif !important;" class="`+contributioncheckispositiveornot+`">`+objval.currency+contributionchartnum+`</td>`;
				}
				bodyRows	+=	`<tr>
					<td style="font-family:'Poppins', sans-serif !important;text-align:center !important;">`+index+`</td>
					`+bodyrowtd+`
				</tr>`;
			}
			
		});
	});

	body	=	body+bodyRows;
	$("#reportTableViewCsv").html(body);
	var filename	=	$("#actualvstargetHeader").text()+".csv";
	DownloaddataTableToCSV($('#reportTableViewCsv'),filename);
}

function DownloaddataTableToCSV($table, filename) {
	
	var $rows = $table.find('tr:has(td)'),
	tmpColDelim = String.fromCharCode(11), // vertical tab character
	tmpRowDelim = String.fromCharCode(0), // null character
	colDelim = '","',
	rowDelim = '"\r\n"',
	csv = '"' + $rows.map(function(i, row) {
	var $row = $(row),
	  $cols = $row.find('td');

	return $cols.map(function(j, col) {
	  var $col = $(col),
		text = $col.text();

	  return text.replace(/"/g, '""'); // escape double quotes

	}).get().join(tmpColDelim);

}).get().join(tmpRowDelim)
.split(tmpRowDelim).join(rowDelim)
.split(tmpColDelim).join(colDelim) + '"';
	
    // Download link
    downloadLink = document.createElement("a");
    // File name
    downloadLink.download = filename;
    // We have to create a link to the file
    //downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.setAttribute("href", "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csv));
    // Make sure that the link is not displayed
    downloadLink.style.display = "none";
    // Add the link to your DOM
    document.body.appendChild(downloadLink);
    // Lanzamos
    downloadLink.click();
}

function kpiReporttableSuccessCallback(data, kpiId, periodtype) {
    var reportTemplate = $('#kpireportTabletemplate').html();
    var quaterheader = "";
    var quaterheaderbody = "";
    var finalRows = "";
    var colmspan = 0;

    // Determine colspan
    if (drilltableactual && drilltabletarget && drilltablegap) colmspan = 4; // +1 for contribution
    else if (drilltableactual && drilltabletarget) colmspan = 3;
    else if (drilltableactual) colmspan = 2;
    else if (drilltabletarget && drilltablegap) colmspan = 3;
    else if (drilltabletarget || drilltablegap) colmspan = 2;

    // ✅ Extract valid periods (ignore childFlag)
    let periods = [];
    data.forEach(obj => {
        Object.values(obj).forEach(emp => {
            Object.keys(emp).forEach(p => {
                if (p !== "childFlag" && !periods.includes(p)) {
                    periods.push(p);
                }
            });
        });
    });

    // Define header colors
    const colors = [
        "#b28cba", "#ef6695", "#bcb6dd", "#20bcb9", "#ed9869", "#ef654a",
        "#55ae88", "#df96a1", "#ffd14e", "#f58b57", "#dabc40", "#4fa9dc"
    ];

    // ✅ Build table header (ignore childFlag)
    quaterheader += `<tr>
        <th rowspan="2"><i class="fas fa-arrow-up"></i> <i class="fas fa-arrow-down"></i></th>
        <th rowspan="2">Name/Period</th>`;
    periods.forEach((p, i) => {
        quaterheader += `<th colspan="${colmspan}" style="text-align:center;background-color:${colors[i % colors.length]};color:#fff;">${p}</th>`;
    });
    quaterheader += `</tr><tr>`;
    periods.forEach((p, i) => {
        if (drilltableactual) quaterheader += `<th style="background-color:${colors[i % colors.length]};color:#fff;">Actual</th>`;
        if (drilltabletarget) quaterheader += `<th style="background-color:${colors[i % colors.length]};color:#fff;">Target</th>`;
        if (drilltablegap) {
            quaterheader += `<th style="background-color:${colors[i % colors.length]};color:#fff;">Gap</th>`;
            quaterheader += `<th style="background-color:${colors[i % colors.length]};color:#fff;">Contribution</th>`; // ✅ New column
        }
    });
    quaterheader += `</tr>`;

    // ✅ Build table body — show “+” icon ONLY if childFlag is true
    data.forEach(obj => {
        Object.entries(obj).forEach(([empName, empData]) => {
            const hasChild = empData.childFlag === true; // ✅ Check childFlag

            let row = `<tr class='kpi-row' data-parent='${kpiId}-${empName}'>`;

            // ✅ Only add + icon if childFlag is true
            if (hasChild) {
                row += `
                    <th class='employeereportevent' 
                        data-empName='${empName}' 
                        data-id='${kpiId}' 
                        data-periodtype='${periodtype}' 
                        style='color:blue;cursor:pointer;'>
                        <i class='fas fa-plus toggle-icon'></i>
                    </th>`;
            } else {
                row += `<th></th>`; // Empty cell for alignment
            }

            row += `<th>${empName.split('-')[0]}</th>`;

            // Add KPI values
            periods.forEach(p => {
                const val = empData[p] || {};
                if (drilltableactual) row += `<td style='text-align:right;'>${val.currency ?? ""}${val.actual ?? ""}</td>`;
                if (drilltabletarget) row += `<td style='text-align:right;'>${val.currency ?? ""}${val.target ?? ""}</td>`;
                if (drilltablegap) {
                    row += `<td style='text-align:right;'>${val.currency ?? ""}${val.gap ?? ""}</td>`;
                    row += `<td style='text-align:right;'>${val.currency ?? ""}${val.contribution ?? ""}</td>`; // ✅ New data column
                }
            });

            row += `</tr>`;
            finalRows += row;
        });
    });

    quaterheaderbody = finalRows;

    // ✅ Clear old table before rendering
    $('#kpiReportTemplate').empty();
	var kpiParentOptions	=	"";
	if(kpideletepermission	==	false && kpiviewpermission	==	false){
		kpiParentOptions	=	"";
	}else{
		kpiParentOptions	=	` <div class="card-actions">
                <div class="dropdown">
                  <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg" alt="Options">
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end">`;
	
		if(kpiviewpermission	==	true){
			kpiParentOptions	+=	`<li>
                      <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#bigTable"
                        onclick="reporttableview('${kpiId}','${periodtype}');"  data-i18n="View">View</a>
                    </li>
                    <li>
                      <a class="dropdown-item csvdownloadfile" href="#" data-bs-toggle="modal" data-bs-target="#"
                        onclick="reporttablecsvdownload('${kpiId}','${periodtype}');">Download CSV</a>
                    </li>`;
		}
		kpiParentOptions	+=	`</ul>
                </div>
              </div>`;
	}
		
    // ✅ Render with Mustache
    var rendered = Mustache.render(reportTemplate, {
        id: kpiId,
        quaterheader: quaterheader,
        quaterheaderbody: quaterheaderbody,
        kpitableInlineEditIcon: `<strong>${reporttableHeader}</strong>`,
        kpiParentOptions: kpiParentOptions
    });

    $('#kpiReportTemplate').html(rendered);
}







$("#categoryreporttype").change(function(){
	var value 	=	$(this).val();
	var id 		=	$(this).attr("data-kpiid");
	var element	=	$("#monthtable");	
	if(value !=	""){
		var periodtype 	=	1;
		if(value 	==	"Monthly"){
			periodtype 	=	1;
			element	=	$("#monthtable");
			$(".monthview").css("display","block");
			$(".annualview").css("display","none");
			$(".quaterview").css("display","none");
			$(".halfyearview").css("display","none");
		}else if(value 	==	"Quarterly"){
			periodtype 	=	2;
			element	=	$("#quatertable");
			$(".quaterview").css("display","block");
			$(".monthview").css("display","none");
			$(".annualview").css("display","none");
			$(".halfyearview").css("display","none");
		}else if(value 	==	"Half Yearly" || value == "HalfYearly"){
			periodtype 	=	3;
			$(".halfyearview").css("display","block");
			$(".monthview").css("display","none");
			$(".annualview").css("display","none");
			$(".quaterview").css("display","none");	
			element	=	$("#halfyeartable");
		}else if(value 	==	"Annually"){
			periodtype 	=	4;
			element	=	$("#annualtable");
			$(".annualview").css("display","block");
			$(".halfyearview").css("display","none");
			$(".monthview").css("display","none");
			$(".quaterview").css("display","none");
		}
		
		$(element).html('');
		$(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
		
		$.ajax({
			url : "/stratroom/kpiDetailList/" + id+"?period="+$("#datePeriod").val()+"&tableFrequency="+value+"&groupBy=Dept&tableType=dril"+"&flagType="+flagType,
			contentType : "application/json",
			success : function(data, status) {
				kpireportstableviewSuccessCallback(data,id,periodtype,value,'category');
			},
			error:function(msg,status){
				if(!jQuery.isEmptyObject(msg.responseText)){
				var errorparse	=	JSON.parse(msg.responseText);
					if(errorparse.status 	==	"404"){
						$(element).html('');
						$(element).html(errorparse.error);
					}else{
						$(element).html('');
						$(element).html(errorparse.error);
					}
				}
			}
		});	
	}
});

function reporttableview(id,periodtype){
	if(id 	!=	"" && periodtype 	!=	""){
		var type 	=	"Monthly";
		var element	=	$(".monthview #monthtable");
		if(periodtype 	==	1){
			type 	=	"Monthly";
			element	=	$(".monthview #monthtable");
			$(".monthview").css("display","block");
		}else if(periodtype 	==	2){
			type 	=	"Quarterly";
			element	=	$(".quaterview #quatertable");
			$(".quaterview").css("display","block");
		}else if(periodtype 	==	3){
			type 	=	"Half Yearly";
			$(".halfyearview").css("display","block");	
			element	=	$(".halfyearview #halfyeartable");
		}else if(periodtype 	==	4){
			type 	=	"Annually";
			element	=	$(".annualview #annualtable");
			$(".annualview").css("display","block");
		}
		
		$(element).html('');
		$(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
	
		$.ajax({
			url : "/stratroom/kpiDetailList/" + id+"?period="+$("#datePeriod").val()+"&tableFrequency="+type+"&groupBy=Dept"+"&tableType=dril"+"&flagType="+flagType,
			contentType : "application/json",
			success : function(data, status) {
				kpireportstableviewSuccessCallback(data,id,periodtype,kpi_measurement,'view');
			},
			error:function(msg,status){
				if(!jQuery.isEmptyObject(msg.responseText)){
				var errorparse	=	JSON.parse(msg.responseText);
					if(errorparse.status 	==	"404"){
						$(element).html('');
						$(element).html(errorparse.error);
					}else{
						$(element).html('');
						$(element).html(errorparse.error);
					}
				}
			}
		});
	}
}

function kpireportstableviewSuccessCallback(result,id,periodtype,setvalue,typeofview){
	$("#categoryreporttype").attr("data-kpiid",id);
	var sub_initiatiesrow	=	"";
	var subinitiativeProgressBar	=	"";
	var quaterheader 	=	"";
	var quaterheaderrow =	"";
	var quaterheaderbody=	"";
	var deptrowcount	=	1;
	typeofview	=	(typeofview	==	'category'?true:false);
	var disabledset 	=	"disabled"; 
	if(kpilistdata.length 	!=	0){
		var optionlist 	=	"";
		$.each(kpilistdata, function(index, reportee) {
			var optionsel 	=	"";
			if(id 	==	reportee.id){
				optionsel	=	"selected='selected'";
			}
			optionlist 	+=	"<option value='"+reportee.id+"' "+optionsel+" >"+reportee.kpiValue.name+"</option>";
		});
	}
	
	$("#categoryreporttype").html('');
	if(kpi_measurement	==	"Monthly"){
		$("#categoryreporttype").html('<option value="Monthly" data-i18n="Monthly">Monthly</option><option value="Quarterly">Quarterly</option><option value="Half Yearly">Half Yearly</option><option value="Annually" data-i18n="Annually">Annually</option>');
	}else if(kpi_measurement	==	"Quarterly"){
		$("#categoryreporttype").html('<option value="Quarterly" data-i18n="Quarterly">Quarterly</option><option value="Half Yearly">Half Yearly</option><option value="Annually">Annually</option>');	
	}else if(kpi_measurement	==	"Half Yearly"){
		$("#categoryreporttype").html('<option value="Half Yearly">Half Yearly</option><option value="Annually" data-i18n="Annually">Annually</option>');	
	}else if(kpi_measurement	==	"Annually"){
		$("#categoryreporttype").html('<option value="Monthly" data-i18n="Monthly">Monthly</option><option value="Quarterly" data-i18n="Quarterly">Quarterly</option><option value="Half Yearly">Half Yearly</option><option value="Annually" data-i18n="Annually">Annually</option>');	
	}
	
	$("#categoryreporttype").val(setvalue);
	
	var colmspan	=	"0";
	if(drilltableactual	==	true && drilltabletarget	==	true && drilltablegap	==	true){
		colmspan	=	"3";
	}else if(drilltableactual	==	true && drilltabletarget	==	true && drilltablegap	==	false){
		colmspan	=	"2";
	}else if(drilltableactual	==	true && drilltabletarget	==	false && drilltablegap	==	false){
		colmspan	=	"1";
	}else if(drilltableactual	==	false && drilltabletarget	==	true && drilltablegap	==	true){
		colmspan	=	"2";
	}else if(drilltableactual	==	false && drilltabletarget	==	false && drilltablegap	==	true){
		colmspan	=	"1";
	}else if(drilltableactual	==	false && drilltabletarget	==	true && drilltablegap	==	false){
		colmspan	=	"1";
	}
	
	console.log("Period Type ::: " + periodtype);
	if(periodtype 	==	1){
		$(".monthview").css("display","block");
		$(".quaterview").css("display","none");
		$(".halfyearview").css("display","none");
		$(".annualview").css("display","none");
		var finalactualrows	="";
		$.each(result,function(key,value){
			$.each(value,function(index,objval){
				var empName	=	index;
				quaterheaderrow = "";
				quaterheader = "";
				quaterheaderbody 	=	"<tr><th><i class=\""+objval.gapStatus+"\"></i></th><th class='employeereporttable' data-empName='"+empName+"' data-id="+id+" data-periodtype="+periodtype+" style='color:blue !important;cursor:pointer;'>"+empName.split('-')[0]+"</th>";
				if(objval !=	"" && objval !=	undefined){
					$.each(objval,function(periodindex,quarterobj){
						if(periodindex 	!=	"overallGap" && periodindex 	!=	"gapStatus"){
							quaterheader 	+=	'<th colspan="'+colmspan+'" style="font-weight: bold;text-align:center; color: #3A6596;">'+periodindex+'</th>';
							//var empName 	= 	(getName(periodindex) !=	undefined?getName(periodindex):"");
							
							var actualbody			=	(quarterobj.actual !=	undefined?quarterobj.actual:"");
							var targetbody			=	(quarterobj.target !=	undefined?quarterobj.target:"");
							var gapbody				=	(quarterobj.gap !=	undefined?quarterobj.gap:"");
							var currency			=	(quarterobj.currency !=	undefined?quarterobj.currency:"");
							
							var actualcolorhighlight	=	(checkPositiveorNegative(actualbody)	==	1?"negativeHighlight":"");
							var targetcolorhighlight	=	(checkPositiveorNegative(targetbody)	==	1?"negativeHighlight":"");
							var gapcolorhighlight		=	(checkPositiveorNegative(gapbody)	==	1?"negativeHighlight":"");
							if(targetbody !=	""){
								if(drilltableactual	==	true){
									quaterheaderrow 	+=	"<th style='font-weight: bold;text-align:center; color: #3A6596;' data-i18n='Actual'>Actual</th>";
									quaterheaderbody 	+=	"<td style='text-align:right;' class="+actualcolorhighlight+">"+currency+actualbody+"</td>";
								}
								if(drilltabletarget	==	true){
									quaterheaderrow 	+=	"<th style='font-weight: bold;text-align:center; color: #3A6596;' data-i18n='Target'>Target</th>";
									quaterheaderbody 	+=	"<td style='text-align:right;' class="+targetcolorhighlight+">"+currency+targetbody+"</td>";
								}
								if(drilltablegap	==	true){
									quaterheaderrow 	+=	"<th style='font-weight: bold;text-align:center; color: #3A6596;' data-i18n='Gap'>Gap</th>";
									quaterheaderbody 	+=	"<td style='text-align:right;' class="+gapcolorhighlight+">"+currency+gapbody+"</td>";
								}
								//quaterheaderrow 	+=	"<th style='font-weight: bold;text-align:center; color: #3A6596;'>Actual</th><th style='font-weight: bold;text-align:center; color: #3A6596;'>Target</th><th style='font-weight: bold;text-align:center; color: #3A6596;'>Gap</th>";
								//quaterheaderbody 	+=	"<td style='text-align:right;' class="+actualcolorhighlight+">"+currency+actualbody+"</td><td style='text-align:right;' class="+targetcolorhighlight+">"+currency+targetbody+"</td><td style='text-align:right;' class="+gapcolorhighlight+">"+currency+gapbody+"</td>";
							}				
						}
					});		
				}
				quaterheaderbody	=	quaterheaderbody+"</tr>";
				finalactualrows = finalactualrows+quaterheaderbody;
				deptrowcount++;
			});
		});
		var htmlcontent 	=	'<table class="table dashboard-task-infos dashboard-table" id="monthtable" style="margin-bottom: 0px !important;white-space: nowrap;"><thead><tr><th rowspan="2"><i class="fas fa-arrow-up"></i><i class="fas fa-arrow-down"></i></th><th rowspan="2">Name/Period</th>'+quaterheader+'</tr><tr>'+quaterheaderrow+'</tr></thead><tbody>'+finalactualrows+`</tbody></table>`;		
		$(".monthview").html(htmlcontent);
		var htmlcontent 	=	'<table class="table dashboard-task-infos align-center dashboard-table monthlyclassTable" id="table1" style="margin-bottom: 0px !important;white-space: nowrap;"><thead><tr><th rowspan="2"><i class="fas fa-arrow-up"></i><i class="fas fa-arrow-down"></i></th><th rowspan="2">Name/Period</th>'+quaterheader+'</tr>'+'<tr>'+quaterheaderrow+'</tr></thead><tbody>'+finalactualrows+`</tbody></table>`;
		$(".drilltableBody #monthtable").html('');
		$(".drilltableBody #monthtable").html(htmlcontent);
	} 
	else if(periodtype 	==	2){
		$(".monthview").css("display","none");
		$(".quaterview").css("display","block");
		$(".halfyearview").css("display","none");
		$(".annualview").css("display","none");
		var finalactualrows	="";
		$.each(result,function(key,value){
			$.each(value,function(index,objval){
				var empName	=	index;
				quaterheaderrow = "";
				quaterheader = "";
				quaterheaderbody 	=	"<tr><th><i class=\""+objval.gapStatus+"\"></i></th><th class='employeereporttable' data-empName='"+empName+"' data-id="+id+" data-periodtype="+periodtype+" style='color:blue !important;cursor:pointer;'>"+empName.split('-')[0]+"</th>";
				if(objval !=	"" && objval !=	undefined){
					$.each(objval,function(periodindex,quarterobj){
						if(periodindex 	!=	"overallGap" && periodindex 	!=	"gapStatus"){
							quaterheader 	+=	'<th colspan="'+colmspan+'" style="font-weight: bold; text-align:center;color: #3A6596;">'+periodindex+'</th>';
							var empName 	= 	(getName(periodindex) !=	undefined?getName(periodindex):"");
							
							var actualbody			=	(quarterobj.actual !=	undefined?quarterobj.actual:"");
							var targetbody			=	(quarterobj.target !=	undefined?quarterobj.target:"");
							var gapbody				=	(quarterobj.gap !=	undefined?quarterobj.gap:"");
							var currency			=	(quarterobj.currency !=	undefined?quarterobj.currency:"");
							
							var actualcolorhighlight	=	(checkPositiveorNegative(actualbody)	==	1?"negativeHighlight":"");
							var targetcolorhighlight	=	(checkPositiveorNegative(targetbody)	==	1?"negativeHighlight":"");
							var gapcolorhighlight		=	(checkPositiveorNegative(gapbody)	==	1?"negativeHighlight":"");
							
							if(targetbody !=	""){
								if(drilltableactual	==	true){
									quaterheaderrow 	+=	"<th style='font-weight: bold;text-align:center; color: #3A6596;' data-i18n='Actual'>Actual</th>";
									quaterheaderbody 	+=	"<td style='text-align:right;' class="+actualcolorhighlight+">"+currency+actualbody+"</td>";
								}
								if(drilltabletarget	==	true){
									quaterheaderrow 	+=	"<th style='font-weight: bold;text-align:center; color: #3A6596;' data-i18n='Target'>Target</th>";
									quaterheaderbody 	+=	"<td style='text-align:right;' class="+targetcolorhighlight+">"+currency+targetbody+"</td>";
								}
								if(drilltablegap	==	true){
									quaterheaderrow 	+=	"<th style='font-weight: bold;text-align:center; color: #3A6596;' data-i18n='Gap'>Gap</th>";
									quaterheaderbody 	+=	"<td style='text-align:right;' class="+gapcolorhighlight+">"+currency+gapbody+"</td>";
								}
							}
						}
					});	
				}
				quaterheaderbody	=	quaterheaderbody+"</tr>";
				finalactualrows = finalactualrows+quaterheaderbody;
				deptrowcount++;
			});
		});
		
		var htmlcontent 	=	'<table class="table dashboard-task-infos dashboard-table" id="quatertable" style="margin-bottom: 0px !important;white-space: nowrap;"><thead><tr><th rowspan="2"><i class="fas fa-arrow-up"></i><i class="fas fa-arrow-down"></i></th><th rowspan="2">Name/Period</th>'+quaterheader+'</tr>'+'<tr>'+quaterheaderrow+'</tr></thead><tbody>'+finalactualrows+`</tbody></table>`;
		$(".quaterview").html(htmlcontent);
		var htmlcontent 	=	'<table class="table dashboard-task-infos align-center dashboard-table QuarterYearTable" id="table1" style="margin-bottom: 0px !important;white-space: nowrap;"><thead><tr><th rowspan="2"><i class="fas fa-arrow-up"></i><i class="fas fa-arrow-down"></i></th><th rowspan="2">Name/Period</th>'+quaterheader+'</tr>'+'<tr>'+quaterheaderrow+'</tr></thead><tbody>'+finalactualrows+`</tbody></table>`;
		$(".drilltableBody #QuarterYear").html('');
		$(".drilltableBody #QuarterYear").html(htmlcontent);
	} else if(periodtype 	==	3){
		$(".monthview").css("display","none");
		$(".quaterview").css("display","none");
		$(".halfyearview").css("display","block");
		$(".annualview").css("display","none");
		var finalactualrows	="";
		$.each(result,function(key,value){
			$.each(value,function(index,objval){
				var empName	=	index;
				quaterheaderrow = "";
				quaterheader = "";
				quaterheaderbody 	=	"<tr><th><i class=\""+objval.gapStatus+"\"></i></th><th class='employeereporttable' data-empName='"+empName+"' data-id="+id+" data-periodtype="+periodtype+" style='color:blue !important;cursor:pointer;'>"+empName.split('-')[0]+"</th>";
				if(objval !=	"" && objval !=	undefined){
					$.each(objval,function(periodindex,quarterobj){
						if(periodindex 	!=	"overallGap" && periodindex 	!=	"gapStatus"){
							quaterheader 	+=	'<th colspan="'+colmspan+'" style="font-weight: bold;text-align:center; color: #3A6596;">'+periodindex+'</th>';
							var empName 	= 	(getName(periodindex) !=	undefined?getName(periodindex):"");
							
							var actualbody			=	(quarterobj.actual !=	undefined?quarterobj.actual:"");
							var targetbody			=	(quarterobj.target !=	undefined?quarterobj.target:"");
							var gapbody				=	(quarterobj.gap !=	undefined?quarterobj.gap:"");
							var currency			=	(quarterobj.currency !=	undefined?quarterobj.currency:"");
							
							var actualcolorhighlight	=	(checkPositiveorNegative(actualbody)	==	1?"negativeHighlight":"");
							var targetcolorhighlight	=	(checkPositiveorNegative(targetbody)	==	1?"negativeHighlight":"");
							var gapcolorhighlight		=	(checkPositiveorNegative(gapbody)	==	1?"negativeHighlight":"");
							if(targetbody !=	""){
								if(drilltableactual	==	true){
									quaterheaderrow 	+=	"<th style='font-weight: bold;text-align:center; color: #3A6596;' data-i18n='Actual'>Actual</th>";
									quaterheaderbody 	+=	"<td style='text-align:right;' class="+actualcolorhighlight+">"+currency+actualbody+"</td>";
								}
								if(drilltabletarget	==	true){
									quaterheaderrow 	+=	"<th style='font-weight: bold;text-align:center; color: #3A6596;' data-i18n='Target'>Target</th>";
									quaterheaderbody 	+=	"<td style='text-align:right;' class="+targetcolorhighlight+">"+currency+targetbody+"</td>";
								}
								if(drilltablegap	==	true){
									quaterheaderrow 	+=	"<th style='font-weight: bold;text-align:center; color: #3A6596;' data-i18n='Gap'>Gap</th>";
									quaterheaderbody 	+=	"<td style='text-align:right;' class="+gapcolorhighlight+">"+currency+gapbody+"</td>";
								}
							}				
						}
					});		
				}
				quaterheaderbody	=	quaterheaderbody+"</tr>";
				finalactualrows = finalactualrows+quaterheaderbody;
				deptrowcount++;
			});
		});		
		var htmlcontent 	=	'<table class="table dashboard-task-infos dashboard-table" id="halfyeartable" style="margin-bottom: 0px !important;white-space: nowrap;"><thead><tr><th rowspan="2"><i class="fas fa-arrow-up"></i><i class="fas fa-arrow-down"></i></th><th rowspan="2">Name/Period</th>'+quaterheader+'</tr><tr>'+quaterheaderrow+'</tr></thead><tbody>'+finalactualrows+`</tbody></table>`;		
		$(".halfyearview").html(htmlcontent);
		var htmlcontent 	=	'<table class="table dashboard-task-infos align-center dashboard-table HalfYearTable" id="table1" style="margin-bottom: 0px !important;white-space: nowrap;"><thead><tr><th rowspan="2"><i class="fas fa-arrow-up"></i><i class="fas fa-arrow-down"></i></th><th rowspan="2">Name/Period</th>'+quaterheader+'</tr>'+'<tr>'+quaterheaderrow+'</tr></thead><tbody>'+finalactualrows+`</tbody></table>`;
		
		$(".drilltableBody #HalfYear").html('');
		$(".drilltableBody #HalfYear").html(htmlcontent);		
	} else if(periodtype 	==	4){
		$(".monthview").css("display","none");
		$(".quaterview").css("display","none");
		$(".halfyearview").css("display","none");
		$(".annualview").css("display","block");
		var finalactualrows	="";
		$.each(result,function(key,value){
			$.each(value,function(index,objval){
				var empName	=	index;
				quaterheaderrow = "";
				quaterheader = "";
				quaterheaderbody 	=	"<tr><th><i class=\""+objval.gapStatus+"\"></i></th><th class='employeereporttable' data-empName='"+empName+"' data-id="+id+" data-periodtype="+periodtype+" style='color:blue !important;cursor:pointer;'>"+empName.split('-')[0]+"</th>";
				if(objval !=	"" && objval !=	undefined){
					$.each(objval,function(periodindex,quarterobj){
						if(periodindex 	!=	"overallGap" && periodindex 	!=	"gapStatus"){
							quaterheader 	+=	'<th colspan="'+colmspan+'" style="font-weight: bold; color: #3A6596;text-align:center;">'+periodindex+'</th>';
							var empName 	= 	(getName(periodindex) !=	undefined?getName(periodindex):"");
							
							var actualbody			=	(quarterobj.actual !=	undefined?quarterobj.actual:"");
							var targetbody			=	(quarterobj.target !=	undefined?quarterobj.target:"");
							var gapbody				=	(quarterobj.gap !=	undefined?quarterobj.gap:"");
							var currency			=	(quarterobj.currency !=	undefined?quarterobj.currency:"");
							
							var actualcolorhighlight	=	(checkPositiveorNegative(actualbody)	==	1?"negativeHighlight":"");
							var targetcolorhighlight	=	(checkPositiveorNegative(targetbody)	==	1?"negativeHighlight":"");
							var gapcolorhighlight		=	(checkPositiveorNegative(gapbody)	==	1?"negativeHighlight":"");
							if(targetbody !=	""){
								if(drilltableactual	==	true){
									quaterheaderrow 	+=	"<th style='font-weight: bold;text-align:center; color: #3A6596;' data-i18n='Actual'>Actual</th>";
									quaterheaderbody 	+=	"<td style='text-align:right;' class="+actualcolorhighlight+">"+currency+actualbody+"</td>";
								}
								if(drilltabletarget	==	true){
									quaterheaderrow 	+=	"<th style='font-weight: bold;text-align:center; color: #3A6596;' data-i18n='Target'>Target</th>";
									quaterheaderbody 	+=	"<td style='text-align:right;' class="+targetcolorhighlight+">"+currency+targetbody+"</td>";
								}
								if(drilltablegap	==	true){
									quaterheaderrow 	+=	"<th style='font-weight: bold;text-align:center; color: #3A6596;' data-i18n='Gap'>Gap</th>";
									quaterheaderbody 	+=	"<td style='text-align:right;' class="+gapcolorhighlight+">"+currency+gapbody+"</td>";
								}
							}				
						}
					});		
				}
				quaterheaderbody	=	quaterheaderbody+"</tr>";
				finalactualrows = finalactualrows+quaterheaderbody;
				deptrowcount++;
			});
		});		
		var htmlcontent 	=	'<table class="table dashboard-task-infos dashboard-table" id="annualtable" style="margin-bottom: 0px !important;white-space: nowrap;"><thead><tr><th rowspan="2"><i class="fas fa-arrow-up"></i><i class="fas fa-arrow-down"></i></th><th rowspan="2">Name/Period</th>'+quaterheader+'</tr><tr>'+quaterheaderrow+'</tr></thead><tbody>'+finalactualrows+`</tbody></table>`;		
		$(".annualview").html(htmlcontent);
		var htmlcontent 	=	'<table class="table dashboard-task-infos align-center dashboard-table AnnualTable" id="table1" style="margin-bottom: 0px !important;white-space: nowrap;"><thead><tr><th rowspan="2"><i class="fas fa-arrow-up"></i><i class="fas fa-arrow-down"></i></th><th rowspan="2">Name/Period</th>'+quaterheader+'</tr>'+'<tr>'+quaterheaderrow+'</tr></thead><tbody>'+finalactualrows+`</tbody></table>`;
		
		$(".drilltableBody #Annual").html('');
		$(".drilltableBody #Annual").html(htmlcontent);
	}
	if(deptrowcount > 6){
		if(periodtype	==	1){
			$("#monthtable").paging({ limit: 5})
			if(typeofview	==	true){
				$(".monthlyclassTable").paging({ limit: 5})
			}
		}else if(periodtype	==	2){
			$("#quatertable").paging({ limit: 5})
			if(typeofview	==	true){
				$(".QuarterYearTable").paging({ limit: 5})
			}
		}else if(periodtype	==	3){
			$("#halfyeartable").paging({ limit: 5})
			if(typeofview	==	true){
				$(".HalfYearTable").paging({ limit: 5})
			}
		}else if(periodtype	==	4){
			$("#annualtable").paging({ limit: 5})
			if(typeofview	==	true){
				$(".AnnualTable").paging({ limit: 5})
			}
		}
	}
}

function reporttablecsvdownload(id,periodtype){
	if(id 	!=	"" && periodtype !=	""){
		var type 	=	"Monthly";
		if(periodtype 	==	1){
			type 	=	"Monthly";
		}else if(periodtype 	==	2){
			type 	=	"Quarterly";
		}else if(periodtype 	==	3){
			type 	=	"Half Yearly";
		}else if(periodtype 	==	4){
			type 	=	"Annually";
		}
		$.ajax({
			url : "/stratroom/kpiDetailList/" + id+"?period="+$("#datePeriod").val()+"&tableFrequency="+type+"&groupBy=Dept"+"&flagType="+flagType,
			contentType : "application/json",
			success : function(data, status) {
				kpireportstabledownloadSuccessCallback(data,id,periodtype);
			},
			error:function(msg,status){
				if(!jQuery.isEmptyObject(msg.responseText)){
				var errorparse	=	JSON.parse(msg.responseText);
					if(errorparse.status 	==	"404"){
						$(element).html('');
						$(element).html(errorparse.error);
					}else{
						$(element).html('');
						$(element).html(errorparse.error);
					}
				}
			}
		});
	}
}

function kpireportstabledownloadSuccessCallback(result,id,periodtype){
	var sub_initiatiesrow	=	"";
	var subinitiativeProgressBar	=	"";
	var quaterheader 	=	"";
	var quaterheaderrow =	"";
	var quaterheaderbody=	"";
	var deptrowcount	=	1;
	
		var finalactualrows	="";
		$.each(result,function(key,value){
			$.each(value,function(index,objval){
				var empName	=	index;
				quaterheaderrow = "<th></th>";
				quaterheader = "";
				quaterheaderbody 	=	"<tr><th>"+empName+"</th>";
				if(objval !=	"" && objval !=	undefined){
					$.each(objval,function(periodindex,quarterobj){
						if(periodindex 	!=	"overallGap" && periodindex 	!=	"gapStatus"){
							
							if (drilltableactual == false && drilltabletarget == false && drilltablegap == false && drilltablecontribution == false) {
								quaterheader += '<th>' + periodindex + '</th>';
							} else if (drilltableactual == true && drilltabletarget == true && drilltablegap == true && drilltablecontribution == true) {
								quaterheader += '<th></th><th></th><th>' + periodindex + '</th><th></th>';
							} else if (drilltableactual == true && drilltabletarget == true && drilltablegap == true && drilltablecontribution == false) {
								quaterheader += '<th></th><th>' + periodindex + '</th><th></th>';
							} else if (drilltableactual == true && drilltabletarget == true && drilltablegap == false && drilltablecontribution == true) {
								quaterheader += '<th></th><th>' + periodindex + '</th><th></th>';
							} else if (drilltableactual == true && drilltabletarget == true && drilltablegap == false && drilltablecontribution == false) {
								quaterheader += '<th></th><th>' + periodindex + '</th>';
							} else if (drilltableactual == true && drilltabletarget == false && drilltablegap == true && drilltablecontribution == true) {
								quaterheader += '<th></th><th>' + periodindex + '</th>';
							} else if (drilltableactual == true && drilltabletarget == false && drilltablegap == true && drilltablecontribution == false) {
								quaterheader += '<th></th><th>' + periodindex + '</th>';
							} else if (drilltableactual == true && drilltabletarget == false && drilltablegap == false && drilltablecontribution == true) {
								quaterheader += '<th>' + periodindex + '</th><th></th>';
							} else if (drilltableactual == true && drilltabletarget == false && drilltablegap == false && drilltablecontribution == false) {
								quaterheader += '<th>' + periodindex + '</th>';
							} else if (drilltableactual == false && drilltabletarget == true && drilltablegap == true && drilltablecontribution == true) {
								quaterheader += '<th></th><th>' + periodindex + '</th>';
							} else if (drilltableactual == false && drilltabletarget == true && drilltablegap == true && drilltablecontribution == false) {
								quaterheader += '<th></th><th>' + periodindex + '</th>';
							} else if (drilltableactual == false && drilltabletarget == true && drilltablegap == false && drilltablecontribution == true) {
								quaterheader += '<th>' + periodindex + '</th><th></th>';
							} else if (drilltableactual == false && drilltabletarget == true && drilltablegap == false && drilltablecontribution == false) {
								quaterheader += '<th>' + periodindex + '</th>';
							} else if (drilltableactual == false && drilltabletarget == false && drilltablegap == true && drilltablecontribution == true) {
								quaterheader += '<th>' + periodindex + '</th><th></th>';
							} else if (drilltableactual == false && drilltabletarget == false && drilltablegap == true && drilltablecontribution == false) {
								quaterheader += '<th>' + periodindex + '</th>';
							} else if (drilltableactual == false && drilltabletarget == false && drilltablegap == false && drilltablecontribution == true) {
								quaterheader += '<th>' + periodindex + '</th>';
							}
							
							
							//quaterheader 	+=	'<th></th><th>'+periodindex+'</th><th></th>';
							
							var actualbody			=	(quarterobj.actual !=	undefined?quarterobj.actual:"");
							var targetbody			=	(quarterobj.target !=	undefined?quarterobj.target:"");
							var gapbody				=	(quarterobj.gap !=	undefined?quarterobj.gap:"");
							var contributionbody				=	(quarterobj.contribution !=	undefined?quarterobj.contribution:"");
							var currency			=	(quarterobj.currency !=	undefined?quarterobj.currency:"");
							
							
							var actualcolorhighlight	=	(checkPositiveorNegative(actualbody)	==	1?"negativeHighlight":"");
							var targetcolorhighlight	=	(checkPositiveorNegative(targetbody)	==	1?"negativeHighlight":"");
							var gapcolorhighlight		=	(checkPositiveorNegative(gapbody)	==	1?"negativeHighlight":"");
							var contributioncolorhighlight		=	(checkPositiveorNegative(contributionbody)	==	1?"negativeHighlight":"");

							if(targetbody !=	""){
								if(drilltableactual	==	true){
									quaterheaderrow 	+=	"<th data-i18n='Actual'>Actual</th>";
									quaterheaderbody 	+=	"<td style='text-align:right;' class="+actualcolorhighlight+">"+currency+actualbody+"</td>";
								}
								if(drilltabletarget	==	true){
									quaterheaderrow 	+=	"<th data-i18n='Target'>Target</th>";
									quaterheaderbody 	+=	"<td style='text-align:right;' class="+targetcolorhighlight+">"+currency+targetbody+"</td>";
								}
								if(drilltablegap	==	true){
									quaterheaderrow 	+=	"<th data-i18n='Gap'>Gap</th>";
									quaterheaderbody 	+=	"<td style='text-align:right;' class="+gapcolorhighlight+">"+currency+gapbody+"</td>";
								}
								if(drilltablecontribution	==	true){
									quaterheaderrow 	+=	"<th>Contribution</th>";
									quaterheaderbody 	+=	"<td style='text-align:right;' class="+contributioncolorhighlight+">"+currency+contributionbody+"</td>";
								}
								//quaterheaderrow 	+=	"<th>Actual</th><th data-i18n="Target">Target</th><th>Gap</th>";
								//quaterheaderbody 	+=	"<td style='text-align:right;' class="+actualcolorhighlight+">"+currency+actualbody+"</td><td style='text-align:right;' class="+targetcolorhighlight+">"+currency+targetbody+"</td><td style='text-align:right;' class="+gapcolorhighlight+">"+currency+gapbody+"</td>";
							}				
						}
					});		
				}
				quaterheaderbody	=	quaterheaderbody+"</tr>";
				finalactualrows = finalactualrows+quaterheaderbody;
				deptrowcount++;
			});
		});
		
		var htmlcontent 	=	'<tr><th  data-i18n="Name/Period">Name/Period</th>'+quaterheader+'</tr>'+'<tr>'+quaterheaderrow+'</tr>'+finalactualrows;
		$("#reportTableViewCsv").html(htmlcontent);
		var filename	=	reporttableHeader+".csv";
		var args = ['#reportTableViewCsv', filename];
		DownloadTableToCSV.apply($(".downloadcasfile"),args);
}

function DownloadTableToCSV($table, filename) {
	
	var csv = [];
	var rows = document.querySelectorAll($table+" tr");
	
    for (var i = 0; i < rows.length; i++) {
		var row = [], cols = rows[i].querySelectorAll("td, th");
		
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
		csv.push(row.join(","));		
	}
	var blob = new Blob([csv.join("\n")], {
      type: 'text/csv;charset=utf8;'
    });
    // Download link
    downloadLink = document.createElement("a");
    // File name
    downloadLink.download = filename;
    // We have to create a link to the file
    //downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.setAttribute("href", "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csv.join("\n")));
    // Make sure that the link is not displayed
    downloadLink.style.display = "none";
    // Add the link to your DOM
    document.body.appendChild(downloadLink);
    // Lanzamos
    downloadLink.click();
}

function trimvalueremovesoecialchars(stringvalue){
	if(typeof stringvalue	===	"number"){
		stringvalue	=	stringvalue.toString();
		stringvalue	=	stringvalue.trim();
		stringvalue = 	stringvalue.replace(/[%,$]/g, "");
		stringvalue	=	stringvalue.trim();
	}else{
		stringvalue	=	stringvalue.trim();
		stringvalue = 	stringvalue.replace(/[%,$]/g, "");
		stringvalue	=	stringvalue.trim();
	}
	return stringvalue;
}

function kpiInitSuccessCallback(data, kpiId){
	var initRows = '';
	$.each(data, function(index, kpi) {
		var initTemplate = $('#kpiInitiativeTemplate').html();
		var progressvalue = "0";
		if (kpi.initiativeValue.progressval != undefined) {
			progressvalue = kpi.initiativeValue.progressval
		}
		var subdaterangeformatted = ""
		var datestring = kpi.initiativeValue.daterange;
		if (datestring && datestring.includes("-")) {
			var dateval = datestring.split('-');
			var startdate = new Date(dateval[0]);
			var enddateformatted = new Date(dateval[1]);
			subdaterangeformatted	=	dateFormatedtohumanread(startdate)+'- '+dateFormatedtohumanread(enddateformatted);
		}
		if (datestring && datestring.includes(",")) {
			var dateval = datestring.split(',');
			var startdate = new Date(dateval[0]);
			var enddateformatted = new Date(dateval[1]);
			subdaterangeformatted	=	dateFormatedtohumanread(startdate)+'- '+dateFormatedtohumanread(enddateformatted);
		}
		
		var kpiinirowOptions	=	"";
		if(kpideletepermission	==	false && kpieditpermission	==	false){
			kpiinirowOptions	=	"";
		}else{
			kpiinirowOptions	=	`
                    <div class="dropdown">
                      <a href="#" class="btn btn-sm btn-outline-icon" role="button" id="dropdownMenu1"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <img width="14" height="14" src="/stratroom/images/menu-dot-vertical-i.svg">
                      </a>
                      <ul class="dropdown-menu dropdown-menu-end border-0 shadow" aria-labelledby="dropdownMenu1">
                       
                        
                     `;
		
			if(kpieditpermission	==	true){
				kpiinirowOptions	+=	` <li>
                          <a href=".kpi_initiaties_popup" class="dropdown-item" data-bs-toggle="modal" onClick="handleKpiinitiativeevent(`+kpi.impactId+`,`+kpi.id+`,'edit')">
                            Edit
                          </a>
                        </li>`;
			}
			
			if(kpideletepermission	==	true){
				kpiinirowOptions	+=	`<li>
                          <a href="#" class="dropdown-item delete-row" onclick="deleteInitiatives(`+kpi.id+`)" >Delete</a>
                        </li>`;
			}
			
			kpiinirowOptions	+=	` </ul></div>`;
		}
	
		var initDetails = Mustache.render(initTemplate, {
			id : kpi.id,
			inipageid : kpi.pageId,
			name : kpi.initiativeValue.name,
			impactId:kpi.impactId,
			description : capitalizeFLetter(kpi.initiativeValue.description),
			progress : progressvalue,
			daterange : subdaterangeformatted,
			statusLight : kpi.initiativeValue.statusLight,
			kpiinirowOptions:kpiinirowOptions
		});
		initRows = initRows+initDetails;
	});
	var initHeaderTemplate = $('#kpiHeaderViewTemplate').html();
	
	var kpiParentOptions	=	"";
	if(kpiviewpermission	==	false){
		kpiParentOptions	=	"";
	}else{
		kpiParentOptions	=	`<div class="card-actions">
                <div class="dropdown">
                  <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                    <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                    
                 `;
	
		if(kpiviewpermission	==	true){
			kpiParentOptions	+=	`<li>
                      <a class="dropdown-item" href=".kpi_initiaties_view_popup" data-bs-toggle="modal"
                       onclick="initiatiesviewdetails(`+kpiId+`)">View</a>
                    </li>`;
		}
		
		kpiParentOptions	+=	` </ul></div></div>`;
	}
		
	var kpitableInlineEditIcon	=	`<strong>`+kpiinitiativeHeader+`</strong>`;										
	if(kpieditpermission	==	true){
		kpitableInlineEditIcon	=	`<strong class="editableTxt2" contenteditable="true" onkeypress="return (this.innerText.length <= 25)" data-oldkpiinitiativeHeader="`+kpiinitiativeHeader+`" id="kpiinitiativeHeader" editable="true">`+kpiinitiativeHeader+`</strong>`;
	}
	
	var kpiAddIcon	=	"";										
	/*if(kpicreatepermission	==	true){
		kpiAddIcon	=	`<div class="create_initives add-sub-initiative"><span class="sub_initiative" data-toggle="modal" data-target=".kpi_initiaties_popup" onClick="handleKpiinitiativeevent(`+kpiId+`,'0', 'add')"><i class="fa fa-plus"></i> Add</span></div>`;
	}*/
	
	//$('#headerInitiativeTemplate').empty();
	var initHeaderDetails = Mustache.render(initHeaderTemplate, {
		id : kpiId,
		kpiinitiativeHeader:kpiinitiativeHeader,
		kpiAddIcon:kpiAddIcon,
		kpiParentOptions:kpiParentOptions,
		kpitableInlineEditIcon:kpitableInlineEditIcon,
		initRows:initRows
	});
	$('#headerInitiativeTemplate').html(initHeaderDetails);
	$('.activities-box').slimscroll({
		height : '340px',
		size : '3px',
		color : '#9c9c9c'
	});
}

function kpiRiskSuccessCallback(data, kpiId){
	console.log(data,"dataRisk")
	var initRows = '';
	$.each(data, function(index, kpi) {
		console.log(kpi,'kpiRisk');
		var riskTemplate = $('#kpiRiskTemplate').html();
		
		// var subdaterangeformatted = ""
		// var datestring = kpi.initiativeValue.daterange;
		// if (datestring && datestring.includes("-")) {
		// 	var dateval = datestring.split('-');
		// 	var startdate = new Date(dateval[0]);
		// 	var enddateformatted = new Date(dateval[1]);
		// 	subdaterangeformatted	=	dateFormatedtohumanread(startdate)+'- '+dateFormatedtohumanread(enddateformatted);
		// }
		// if (datestring && datestring.includes(",")) {
		// 	var dateval = datestring.split(',');
		// 	var startdate = new Date(dateval[0]);
		// 	var enddateformatted = new Date(dateval[1]);
		// 	subdaterangeformatted	=	dateFormatedtohumanread(startdate)+'- '+dateFormatedtohumanread(enddateformatted);
		// }
		
		var kpiriskrowOptions	=	"";
		if(kpideletepermission	==	false && kpieditpermission	==	false){
			kpiriskrowOptions	=	"";
		}else{
			kpiriskrowOptions	=	`<div class="list-actions">
                      <div class="dropdown">
                        <a href="#" class="btn btn-sm btn-outline-icon" role="button" id="dropdownMenu1"
                          data-bs-toggle="dropdown" aria-expanded="false">
                          <img width="14" height="14" src="/stratroom/images/menu-dot-vertical-i.svg">
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow"
                          aria-labelledby="dropdownMenu1">  
                        `;
		
			if(kpieditpermission	==	true){
				kpiriskrowOptions	+=	` <li>
                            <a href=".riskDetail_description_popup" class="dropdown-item" data-bs-toggle="modal" onClick="handleRiskDetailEvent(`+kpi.impactId+`,`+kpi.id+`,'edit')">
                              Edit
                            </a>
                          </li>`;
			}
			
			if(kpideletepermission	==	true){
				kpiriskrowOptions	+=	` <li>
                            <a href="#delete-modal" class="dropdown-item delete-row" data-bs-toggle="modal" onclick="deleteInitiatives(`+kpi.id+`)">
                              Delete
                            </a>
                          </li>`;
			}
			
			kpiriskrowOptions	+=	`</ul></div></div>`;
		}
	
		var riskDetails = Mustache.render(riskTemplate, {
			id : kpi.id,
			inipageid : kpi.pageId,
			name : kpi.riskValue.name,
			impactId:kpi.impactId,
			description : capitalizeFLetter(kpi.riskValue.riskStatus),
			dateRaised : kpi.riskValue.dateRaised,
			riskStatus : kpi.riskValue.riskStatus,
			kpiriskrowOptions:kpiriskrowOptions
		});
		initRows = initRows+riskDetails;
	});
	var riskHeaderTemplate = $('#kpiHeaderViewTemplate').html();
	
	var kpiParentOptions	=	"";
	if(kpiviewpermission	==	false){
		kpiParentOptions	=	"";
	}else{
		kpiParentOptions	=	` <div class="card-actions">
                <div class="dropdown">
                  <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                    <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                   
                 `;
	
		if(kpiviewpermission	==	true){
			kpiParentOptions	+=	` <li>
                      <a class="dropdown-item" href=".kpi_risk_view_popup" data-bs-toggle="modal"
                       onclick="risksviewdetails(`+kpiId+`)">View</a>
                    </li>`;
		}
		
		kpiParentOptions	+=	` </ul></div></div>`;
	}
		
	var kpitableInlineEditIcon	=	`<strong>`+kpiRiskHeader+`</strong>`;										
	if(kpieditpermission	==	true){
		kpitableInlineEditIcon	=	`<strong class="editableTxt2" contenteditable="true" onkeypress="return (this.innerText.length <= 25)" data-oldkpiRiskHeader="`+kpiRiskHeader+`" id="kpiRiskHeader" editable="true">`+kpiRiskHeader+`</strong>`;
	}
	
	var kpiAddIcon	=	"";										
	/*if(kpicreatepermission	==	true){
		kpiAddIcon	=	`<div class="create_initives add-sub-initiative"><span class="sub_initiative" data-toggle="modal" data-target=".kpi_initiaties_popup" onClick="handleKpiinitiativeevent(`+kpiId+`,'0', 'add')"><i class="fa fa-plus"></i> Add</span></div>`;
	}*/
	
	//$('#headerRiskTemplate').empty();
	var riskHeaderDetails = Mustache.render(riskHeaderTemplate, {
		id : kpiId,
		kpiRiskHeader:kpiRiskHeader,
		kpiAddIcon:kpiAddIcon,
		kpiParentOptions:kpiParentOptions,
		kpitableInlineEditIcon:kpitableInlineEditIcon,
		initRows:initRows
	});
	$('#headerRiskTemplate').html(riskHeaderDetails);
	$('.activities-box').slimscroll({
		height : '340px',
		size : '3px',
		color : '#9c9c9c'
	});
}
function kpiCommentSuccessCallback(data, kpiId) {
    if (!commentsviewpermission) {
        $("#kpi_comments").hide();
        return false;
    }
    var commentRows = '';
    $.each(data, function(index, comment) {
        var commentsRowTemplate = $('#kpiCommentsViewTemplate').html();
        var ReplycommentsRowTemplate = $('#kpiCommentsreplyViewTemplate').html();
        var timeformatted = new Date(comment.commentsValue.formattedDateTime)
        timeformatted = formatofAmPm(timeformatted);
        console.log(timeformatted)
        var kpicomentsowner = {};
        
        $.each(kpireporteelist, function(ownkey, empvalue) {
            if (empvalue.id == comment.createdBy) {
                kpicomentsowner = {"id": empvalue.id, "name": empvalue.name, "image": empvalue.image};
                return false;
            }
        });
            
        var name = (comment.commentsValue.createdByName == undefined || comment.commentsValue.createdByName == "" ? comment.commentsValue.updatedByName : comment.commentsValue.createdByName);
        var title = (comment.commentsValue.title != undefined && comment.commentsValue.title != "" ? comment.commentsValue.title : "");

        var getownershortName = hasWhiteSpaceName(name);
        var Owner = "data-name='" + getownershortName + "'";
        
        if (kpicomentsowner != undefined && kpicomentsowner != '' && kpicomentsowner.name !== undefined) {
            var username = ((kpicomentsowner.name == undefined || kpicomentsowner.name == "") ? "User" : kpicomentsowner.name);
            Owner = ((kpicomentsowner.image == undefined || kpicomentsowner.image == "") ? "data-name='" + kpicomentsowner.name + "'" : "src='" + kpicomentsowner.image + "'");
        }
        
        var commentsName = capitalizeFLetter(comment.commentsValue.desc);
        var commentsrowOptions = "";
        if (commentseditpermission == false && commentsdeletepermission == false) {
            commentsrowOptions = "";
        } else {
            commentsrowOptions = ` <div class="list-actions">
                      <!-- <p class="m-0 p-0"><strong>4</strong></p> -->
                      <div class="dropdown">
                        <a href="#" class="btn btn-sm btn-outline-icon" role="button" id="dropdownMenu1"
                          data-bs-toggle="dropdown" aria-expanded="false">
                          <img width="14" height="14" src="/stratroom/images/menu-dot-vertical-i.svg">
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow"
                          aria-labelledby="dropdownMenu1">`;
            
            if (commentseditpermission == true) {
                commentsrowOptions += `<li>
                                        <a href="#" data-toggle="modal" data-target=".kpi_comments_popup" onclick="handleKPICommentsPopup(${kpiId},${comment.id},'${commentsName}')">Edit</a>
                                    </li>`;
            }
            if (commentsdeletepermission == true) {
                commentsrowOptions += `<li>
                                            <a href="#" onclick="deleteKPIComments(${comment.id})">Delete</a>
                                        </li>`;
            }
            
            commentsrowOptions += `</ul></div></div>`;
        }
        
        var currentuserlike = (comment.likeEmpIds != undefined && comment.likeEmpIds != null ? comment.likeEmpIds : []);
        var likeText = "Like";
        var likeTextclass = "";    
        if (currentuserlike.length > 0 && $.inArray(Number(currentEmp), currentuserlike) !== -1) {
            likeText = "Unlike";
            likeTextclass = "green";
        }
        
        var commentDetails = Mustache.render(commentsRowTemplate, {
            id: comment.id,
            Owner: Owner,
            title: title,
            kpiId: kpiId,
            name: name,
            likeText: likeText,
            likeTextclass: likeTextclass,
            desc: commentsName,
            count: (comment.likeCount != undefined && comment.likeCount != null ? comment.likeCount : 0),
            createdTime: timeformatted,
            commentsrowOptions: commentsrowOptions
        });

        var replyDetails = "";
        if (comment.replyComments && comment.replyComments.length > 0) {
            $.each(comment.replyComments, function (replyIndex, reply) {
                console.log(reply, "reply");
                var replyTimeFormatted = formatofAmPm(new Date(reply.commentsValue.formattedDateTime));
                var replyName = reply.commentsValue.createdByName || reply.commentsValue.updatedByName;
                var replyShortName = replyName.slice(0, 2);
                var replyOwner = "data-name='" + replyShortName + "'";

                var replyCommentsName = capitalizeFLetter(reply.commentsValue.desc || "");

                var replyOptions = "";
                if (commentseditpermission == false && commentsdeletepermission == false) {
                    replyOptions = "";
                } else {
                    replyOptions = `<ul class="header-dropdown m-r--2 pt-2 d-flex">
                                    <li class="dropdown">
                                        <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
                                            <i class="material-icons">more_vert</i>
                                        </a>
                                        <ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">`;
                    
                    if (commentseditpermission == true) {
                        replyOptions += `<li>
                                            <a href="#" data-toggle="modal" data-target=".kpi_commentsreply_popup" 
                                               onclick="handleKPICommentsUpdatePopup(${kpiId}, ${reply.id}, '${replyCommentsName.replace(/'/g, "\\'")}')">Edit</a>
                                        </li>`;
                    }
                    
                    if (commentsdeletepermission == true) {
                        replyOptions += `<li>
                                            <a href="#" onclick="deleteKPIComments(${reply.id})">Delete</a>
                                        </li>`;
                    }
                    
                    replyOptions += `</ul></li></ul>`;
                }

                // Render reply using the template
                replyDetails += Mustache.render(ReplycommentsRowTemplate, {
                    id: reply.id,
                    Owner: replyOwner,
                    title: reply.commentsValue.title || "",
                    kpiId: kpiId,
                    name: replyName,
                    desc: replyCommentsName,
                    likeText: likeText,
                    count: reply.likeCount || 0,
                    createdTime: replyTimeFormatted,
                    commentsrowOptions: replyOptions
                });
            });
        }
        commentDetails += `<ul class="reply-comments">${replyDetails}</ul>`;
        commentRows += commentDetails;
    });
    
    var kpiParentOptions = "";
    if (commentsviewpermission == false) {
        kpiParentOptions = "";
    } else {
        kpiParentOptions = ` <div class="list-actions">
                    <div class="dropdown">
                      <a href="#" class="btn btn-sm btn-outline-icon" role="button" id="dropdownMenu1"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <img width="14" height="14" src="/stratroom/images/menu-dot-vertical-i.svg">
                      </a>
                      <ul class="dropdown-menu dropdown-menu-end border-0 shadow" aria-labelledby="dropdownMenu1">
                  `;
    
        if (commentsviewpermission == true) {
            kpiParentOptions += `                    <li>
                      <a href=".sub_comments_view_popup" class="dropdown-item" data-bs-toggle="modal"
                        onclick="kpicommentsviewdetails(${kpiId})">
                        View
                      </a>
                    </li>`;
        }
        
        kpiParentOptions += `</ul></div></div>`;
    }
        
    var kpitableInlineEditIcon = `<strong>${kpicommentsHeader}</strong>`;                                    
    if (commentseditpermission == true) {
        kpitableInlineEditIcon = `<strong class="editableTxt2" contenteditable="true" onkeypress="return (this.innerText.length <= 25)" data-oldkpicommentsHeader="${kpicommentsHeader}" id="kpicommentsHeader" editable="true">${kpicommentsHeader}</strong>`;
    }
    
    var commentsCreateIcon = ``;
    if (commentscreatepermission == true) {
        commentsCreateIcon = `<div class="card-footer comment_send">
 
                <div class="input-group">
                  <input id="comment-input" data-id="${kpiId} type="text" class="form-control comment-input" placeholder="Type a comment..."
                    aria-label="Write a comment..." aria-describedby="button-addon2">
                  <button class="btn label-bg-primary post-comment" type="button" onclick="handleKPICommentsSave(${kpiId},'add')"><i
                      class="fas fa-arrow-right"></i></button>
                </div>

              </div>`;
    }
    
    $("#kpi_comments").html(`
		   <div class="card custom-card table-card h-100">
      <div class="card-header">
              <div class="c-header-left">
                <h5 class="card-title">
                  ${kpitableInlineEditIcon}
                </h5>
				
              </div>
			 ${kpiParentOptions}
              
            </div>
       <div class="card-body overflow-auto comment-history comments-list" id="comment-conversation_1" style="height: 262px;">
                   ${commentRows}   
	    </div>
${commentsCreateIcon}
</div `);
}
function kpiAttachmentSuccessCallback(data, kpiId){
	var initRows = '';
	$.each(data, function(index, kpi) {
		var initTemplate = $('#kpiAttachmentemplate').html();
		
		// var subdaterangeformatted = ""
		// var datestring = kpi.initiativeValue.daterange;
		// if (datestring && datestring.includes("-")) {
		// 	var dateval = datestring.split('-');
		// 	var startdate = new Date(dateval[0]);
		// 	var enddateformatted = new Date(dateval[1]);
		// 	subdaterangeformatted	=	dateFormatedtohumanread(startdate)+'- '+dateFormatedtohumanread(enddateformatted);
		// }
		// if (datestring && datestring.includes(",")) {
		// 	var dateval = datestring.split(',');
		// 	var startdate = new Date(dateval[0]);
		// 	var enddateformatted = new Date(dateval[1]);
		// 	subdaterangeformatted	=	dateFormatedtohumanread(startdate)+'- '+dateFormatedtohumanread(enddateformatted);
		// }
		
		var kpiinirowOptions	=	"";
		if(kpideletepermission	==	false){
			kpiinirowOptions	=	"";
		}else{
			kpiinirowOptions	=	`   <div class="list-actions">
                      <!-- <p class="m-0 p-0"><strong>4</strong></p> -->
                      <div class="dropdown">
                        <a href="#" class="btn btn-sm btn-outline-icon" role="button" id="dropdownMenu1"
                          data-bs-toggle="dropdown" aria-expanded="false">
                          <img width="14" height="14" src="/stratroom/images/menu-dot-vertical-i.svg">
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow"
                          aria-labelledby="dropdownMenu1">
                         `;
		
			
			
			if(kpideletepermission	==	true){
				kpiinirowOptions	+=	` <li>
                            <a href="#delete-modal" class="dropdown-item delete-row" data-bs-toggle="modal" onclick="deleteInitiatives(`+kpi.id+`)">
                              Delete
                            </a>
                          </li>`;
			}
			
			kpiinirowOptions	+=	`</ul></div></div>`;
		}
	
		var initDetails = Mustache.render(initTemplate, {
			id : kpi.id,
			inipageid : kpi.pageId,
			name : kpi.name,
			description :kpi.file,
			kpiinirowOptions:kpiinirowOptions
		});
		initRows = initRows+initDetails;
	});
	var initHeaderTemplate = $('#kpiHeaderViewTemplate').html();
	
	var kpiParentOptions	=	"";
	if(kpiviewpermission	==	false){
		kpiParentOptions	=	"";
	}else{
		kpiParentOptions	=	` <div class="card-actions">
                <div class="dropdown">
                  <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                    <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;
	
		if(kpiviewpermission	==	true){
			kpiParentOptions	+=	`    <li>
                      <a class="dropdown-item" href=".kpi_initiaties_view_popup" data-bs-toggle="modal"
                       onclick="initiatiesviewdetails(`+kpiId+`)">View</a>
                    </li>`;
		}
		
		kpiParentOptions	+=	`</ul></div></div>`;
	}
		
	var kpitableInlineEditIcon	=	`<strong>`+kpiattachmentHeader+`</strong>`;										
	if(kpieditpermission	==	true){
		kpitableInlineEditIcon	=	`<strong class="editableTxt2" contenteditable="true" onkeypress="return (this.innerText.length <= 25)" data-oldkpiattachmentHeader="`+kpiattachmentHeader+`" id="kpiattachmentHeader" editable="true">`+kpiattachmentHeader+`</strong>`;
	}
	
	var kpiAddIcon	=	"";										
	/*if(kpicreatepermission	==	true){
		kpiAddIcon	=	`<div class="create_initives add-sub-initiative"><span class="sub_initiative" data-toggle="modal" data-target=".kpi_initiaties_popup" onClick="handleKpiinitiativeevent(`+kpiId+`,'0', 'add')"><i class="fa fa-plus"></i> Add</span></div>`;
	}*/
	
	//$('#headerAttachmentTemplate').empty();
	var initHeaderDetails = Mustache.render(initHeaderTemplate, {
		id : kpiId,
		kpiattachmentHeader:kpiattachmentHeader,
		kpiAddIcon:kpiAddIcon,
		kpiParentOptions:kpiParentOptions,
		kpitableInlineEditIcon:kpitableInlineEditIcon,
		initRows:initRows
	});
	$('#headerAttachmentTemplate').html(initHeaderDetails);
	$('.activities-box').slimscroll({
		height : '340px',
		size : '3px',
		color : '#9c9c9c'
	});
}
function kpicommentsviewdetails(id){
	var element	=	$("#kpicomments-row-box_view");
	$("#kpicommentsviewheader").text($("#kpicommentsHeader").text());
	$(element).html('');
	$(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
	$.ajax({
		url : "/stratroom/commentList/kpi/" + id,
		success : kpicommentsrecordsviewSuccessCallback,
		error:function(msg,status){
			if(!jQuery.isEmptyObject(msg.responseText)){
				var errorparse	=	JSON.parse(msg.responseText);
				if(errorparse.status 	==	"404"){
					$(element).html('');
					$(element).html(errorparse.error);
				}else{
					$(element).html('');
					$(element).html(errorparse.error);
				}
			}
		}
	});
}

function kpicommentsrecordsviewSuccessCallback(result){
	
	var sub_initiatiesrow	=	"";
	var subinitiativeProgressBar	=	"";
	$.each(result,function(index, comment) {
		var timeformatted = new Date(comment.commentsValue.formattedDateTime)
		timeformatted 	=	formatofAmPm(timeformatted);
		var kpicomentsowner	=	{};
		$.each(kpireporteelist,function(ownkey,empvalue){
			if(empvalue.id	==	comment.createdBy){
				kpicomentsowner	=	{"id":empvalue.id,"name":empvalue.name,"image":empvalue.image};
				return false;
			}
		});
		
		var name	=	(comment.commentsValue.createdByName == undefined || comment.commentsValue.createdByName == ""?comment.commentsValue.updatedByName:comment.commentsValue.createdByName);
		var title	=	(comment.commentsValue.title != undefined && comment.commentsValue.title != ""?comment.commentsValue.title:"");

		var getownershortName	=	hasWhiteSpaceName(name);
		var	Owner	=	"data-name='"+getownershortName+"'";
		
		if(kpicomentsowner !=	undefined && kpicomentsowner !=	'' && kpicomentsowner.name !== undefined){
			var username 	=	((kpicomentsowner.name ==	undefined || kpicomentsowner.name == "")?"User":kpicomentsowner.name);
			Owner = ((kpicomentsowner.image ==	undefined || kpicomentsowner.image == "")?"data-name='"+kpicomentsowner.name+"'":"src='"+kpicomentsowner.image+"'");
		}
		var currentuserlike 	=	(comment.likeEmpIds != undefined && comment.likeEmpIds != null?comment.likeEmpIds:[]);
		var likeText 	=	"Like";
		var likeTextclass 	=	"";	
		if(currentuserlike.length > 0 && $.inArray(Number(currentEmp),currentuserlike) !== -1){
			likeText 	=	"Unlike";
			likeTextclass 	=	"green";
		}
		var count 	=	(comment.likeCount != undefined && comment.likeCount != null?comment.likeCount:0);
		
		var desc=comment.commentsValue.desc;
		sub_initiatiesrow	+=	'<li><div class="d-flex flex-row"><div class="flex-column comment_image"><img '+Owner+' class="rounded-circle kpicommentsimgprofile" alt="User" width="40"></div><div class="flex-column comment_details"><ul><li><span class="message-data-name"><strong>'+name+', '+title+ ' </strong></span></li><li class="commentsdesc">'+desc+'</li><li><ul class="d-flex flex-row">'
		+'<li>Reply</li><li class="'+likeTextclass+'">'+likeText+'</li><li class="parentcounter"><span class="badge badge-dark counter">'+count+'</span></li>'
		+'<li>'+timeformatted+'</li></ul></li></ul></div></div></li>';
	});
	$("#kpicomments-row-box_view").html('');
	$("#kpicomments-row-box_view").html(sub_initiatiesrow);
	$(".kpicommentsimgprofile").each(function(){
		if($(this).attr('src') == "" || $(this).attr('src') == undefined){
			$('.kpicommentsimgprofile').initial({
				 charCount : 2,
				 height : 30,
				 width : 30,
				 fontSize : 18
				});
		} 
	});
	$('#common-comment-conversation_employee').slimscroll({
        height: '340px',
        size: '3px',
        color: '#9c9c9c'
    });
}

function initiatiesviewdetails(id){
	var element 	=	$("#kpi_initiaties_viewrow");
	$("#myinitiativeviewheader").text($("#kpiinitiativeHeader").text());
	$(element).html('');
	$(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
	$.ajax({
		url : "/stratroom/kpi/initiativesList/"+id,
		success : initiatiesrecordsviewSuccessCallback,
		error:function(msg,status){
			if(!jQuery.isEmptyObject(msg.responseText)){
				var errorparse	=	JSON.parse(msg.responseText);
				if(errorparse.status 	==	"404"){
					$(element).html('');
					$(element).html(errorparse.error);
				}else{
					$(element).html('');
					$(element).html(errorparse.error);
				}
			}
		}
	});
}


function initiatiesrecordsviewSuccessCallback(result){
	
	var sub_initiatiesrow	=	"";
	$.each(result, function(index, kpi) {
	var progressvalue = "0";
	if (kpi.initiativeValue.progressval != undefined) {
		progressvalue = kpi.initiativeValue.progressval;
	}
	var subdaterangeformatted = "";
	var datestring = kpi.initiativeValue.daterange;
	if (datestring && datestring.includes(",")) {
		var dateval = datestring.split(',');
		var startdate = new Date(dateval[0]);
		var enddateformatted = new Date(dateval[1]);
		subdaterangeformatted = dateFormatedtohumanread(startdate) + ' - ' + dateFormatedtohumanread(enddateformatted);
	}
	var description = kpi.initiativeValue.description;
	var progress = progressvalue;

	sub_initiatiesrow +=
		'<div class="list-group-item">' +
			'<div class="bar-chart">' +
				'<p class="title m-0 p-0"><strong>' + description + '</strong></p>' +
				'<div class="progress-wrap yellow">' +
					'<div class="progress flex-grow-1">' +
						'<div class="progress-bar bg-warning progress-bar-striped rounded-pill" role="progressbar" ' +
						'style="width: ' + progress + '%;" aria-valuenow="' + progress + '" aria-valuemin="0" aria-valuemax="100"></div>' +
					'</div>' +
					'<span class="badge">' + progress + '%</span>' +
				'</div>' +
				'<div class="text-muted"><strong>' + subdaterangeformatted + '</strong></div>' +
			'</div>' +
		'</div>';
});

	$("#kpi_initiaties_viewrow").html('');
	$("#kpi_initiaties_viewrow").html(sub_initiatiesrow);
}

function risksviewdetails(id){
	var element 	=	$("#kpi_risk_viewrow");
	$("#myinitiativeviewheader").text($("#kpiRiskHeader").text());
	$(element).html('');
	$(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
	$.ajax({
		url : "/stratroom/kpi/riskList/"+id,
		success : riskrecordsviewSuccessCallback,
		error:function(msg,status){
			if(!jQuery.isEmptyObject(msg.responseText)){
				var errorparse	=	JSON.parse(msg.responseText);
				if(errorparse.status 	==	"404"){
					$(element).html('');
					$(element).html(errorparse.error);
				}else{
					$(element).html('');
					$(element).html(errorparse.error);
				}
			}
		}
	});
}
function riskrecordsviewSuccessCallback(result) {
    var sub_initiatiesrow = "";
    
    $.each(result, function(index, kpi) {
        var name = kpi.riskValue.name;
        var statusLight = kpi.riskValue.riskStatus;
        var dateRaised = kpi.riskValue.dateRaised;
        
        // Format date if needed
        if (dateRaised && dateRaised !== "No date") {
            try {
                dateRaised = dateFormatedtohumanread(new Date(dateRaised));
            } catch (e) {
                console.log("Date formatting error", e);
            }
        }
        
        // Determine status color based on statusLight
        var statusClass = "bg-secondary"; // default
        if (statusLight.toLowerCase().includes("high")) statusClass = "bg-danger";
        else if (statusLight.toLowerCase().includes("medium")) statusClass = "bg-warning";
        else if (statusLight.toLowerCase().includes("low")) statusClass = "bg-success";
        
        sub_initiatiesrow += `
            <div class="list-group-item risk-item">
                <div class="d-flex align-items-start">
                    
                    <div class="flex-grow-1 ms-3">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h6 class="mb-0 risk-title">${name}</h6>
                            <span class="badge rounded-pill ${statusClass}">${statusLight}</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">Raised: ${dateRaised}</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    $("#kpi_risk_viewrow").html(sub_initiatiesrow || '<div class="text-center py-4">No risks found</div>');
}

function handleKpidescriptionevent(kpiID,id, action) {
	$("#kpiForm").css('display', 'none');
	$("#kpiForm").trigger('reset');
	populateOwnerDropdownKpi('.kpi_description_popup #kpi_owner');
	$("#kpiForm input[name='action']").val(action);

	if (action == 'add') {
		$("#createdBy").html("");
		$("#createdByDate").html("");
		$("#updatedBy").html("");
		$("#updatedByDate").html("");
		$("#Initiative_id_wrapper").css('display', 'none'); // Hide the ID input
		// when adding
		$("#kpiForm").css('display', 'block');
	} else { // view and edit
		$("#kpi_id_wrapper").css('display', 'block');
		$('.kpi_description_popup #Kpi_show_id')
				.prop("disabled", true);
		if (action == 'edit') {
			resetKpiDescriptionpopModal();
		}
		if (action == 'view') {
			$('#kpiForm input[type="text"]').prop("disabled", true);
			$('#kpiForm input[type="checkbox"]').prop("disabled", true);
			$('#kpiForm select').prop("disabled", true);
			$('#kpiForm button[value="Save"]').css('display', 'none');
		}

		$.ajax({
			url : "/stratroom/kpi/" + id+"?statusLightFlag=true"+"&flagtype="+flagType,
			success : kpiPopSuccessCallback
		});
	}
}

function resetKpiDescriptionpopModal(){

	$("#statusLight").attr("class","");
	$("#threshold1").html('');
	$("#threshold2").html('');
	$("#threshold3").html('');
	$("#threshold4").html('');
	$("#threshold5").html('');

	$("#createdBy").html("");
	$("#updatedBy").html("");
	$("#createdByDate").html("");
	$("#updatedByDate").html("");
}

function kpiPopSuccessCallback(initiativedata) {
	kpiupdateDescription	=	initiativedata;
	$("#kpiForm").css('display', 'block');

	$('#kpi_id').val(initiativedata.id)
	if(initiativedata.kpiId	==	undefined || initiativedata.kpiId	==	""){
		$('#Kpi_show_id').val(initiativedata.kpiValue.kpiId)
	}else{
		$('#Kpi_show_id').val(initiativedata.kpiId)
	}
	
	$('#kpi_owner').val(initiativedata.owner)
	$('#kpi_name').val(initiativedata.kpiValue.name)
	$("#kpi_description")
			.val(initiativedata.kpiValue.description);
	$(".kpi_description_popup #kpi_status").val(initiativedata.kpiValue.status);
	$("#statusLight").addClass(initiativedata.kpiValue.statusLight);
	var threshold1	=	'<div><i class="red fas fa-circle" style="font-size:10px !important">  < ';
	if(initiativedata.kpiValue.threshold1 !=	undefined){
		threshold1	+=	initiativedata.kpiValue.threshold1;
	}
	threshold1	+=	'</i></div>';
	$("#threshold1").html(threshold1);
	
	var threshold2	=	'<div><i class="yellow fas fa-circle" style="font-size:10px !important"> > ';
	if(initiativedata.kpiValue.threshold2 !=	undefined){
		threshold2	+=	initiativedata.kpiValue.threshold2;
	}
	threshold2	+=	'</i></div>';
	$("#threshold2").html(threshold2);
	
	var threshold3	=	'<div><i class="green fas fa-circle" style="font-size:10px !important"> > ';
	if(initiativedata.kpiValue.threshold3 !=	undefined){
		threshold3	+=	initiativedata.kpiValue.threshold3;
	}
	threshold3	+=	'</i></div>';
	$("#threshold3").html(threshold3);
	$("#createdById").val(initiativedata.createdBy);
	$("#createdBy").html(initiativedata.kpiValue.createdByName);
	$("#updatedBy").html(initiativedata.kpiValue.updatedByName);
	$("#createdByDate").html(initiativedata.createDateString);
	$("#updatedByDate").html(initiativedata.updatedDateString);
	if (initiativedata.kpiValue.actual) {
		$("#actualId").prop('checked', true);
	}
	if (initiativedata.kpiValue.target) {
		$("#targetId").prop('checked', true);
	}
	if (initiativedata.kpiValue.budget) {
		$("#budgetID").prop('checked', true);
	}
	if (initiativedata.kpiValue.forecast) {
		$("#forcastId").prop('checked', true);
	}
}

function handleKpiDescriptionSave() {
	var action = $("#kpiForm input[name='action']").val();
	
	if (action == 'delete') {

	} else {
		var KpiObj = getKpiObj(action);
		var methodType = 'post';
		if (action == 'add') {

		} else if (action == 'edit') {

			if(kpiupdateDescription == undefined || kpiupdateDescription == ""){
				$.notify("Kpi Details not found",{
							  style: 'error',
							  className: 'graynotify'
							});
				return false;
			} 
			methodType = 'put';
		}
		var jsondata	=	encodeURIComponent(JSON.stringify(KpiObj));
		var dejsondata	=	decodeURIComponent(jsondata);
		
		//return false;
		$.ajax({
			url : "/stratroom/kpi/",
			type : methodType,
			contentType : "application/json",
			data : JSON.stringify(KpiObj),
			success : function(data, status) {
				location.reload(true);
				$("#kpiPopClose").click();
			},
			error:readErrorMsg
		});
	}
}

function getKpiObj(action) {
	var KpiObj	=	{"kpiValue":{}};
	KpiObj["owner"] = $("#kpi_owner").val();
	KpiObj["kpiValue"]["name"]	=	$("#kpi_name").val();
	KpiObj["kpiValue"]["description"]	=	$("#kpi_description").val();
	KpiObj["kpiValue"]["status"]	=	$("#kpi_status").val();
	
	if(action == "edit" && kpiupdateDescription !== undefined || kpiupdateDescription != ""){

		KpiObj["id"] = $("#kpi_id").val();
		KpiObj["objectiveId"]	=	kpiupdateDescription.objectiveId;
		$.each(kpiupdateDescription.kpiValue,function(index,value){
			if(index	!=	"name" && index	!=	"description" && index	!=	"status"){
				KpiObj["kpiValue"][index]	=	value;
			}
		});
		
		KpiObj["kpiFormula"]	=	kpiupdateDescription.kpiFormula;
	}
	
	return KpiObj;
}

function handleKpiinitiativeevent(kpiID,id, action) {
	$("#kpi_initative_Form").css('display', 'none');
	$("#kpi_initative_Form").trigger('reset');
	$("#kpi_initative_Form input[name='action']").val(action);
	$("#impact_kpi_id").val(kpiID);
	if (action == 'add') {
		$(".kpi_initiaties_popup #createdBy").html("");
		$(".kpi_initiaties_popup #createdByDate").html("");
		$(".kpi_initiaties_popup #updatedBy").html("");
		$(".kpi_initiaties_popup #updatedByDate").html("");
		$("#kpi_Initiative_id_wrapper").css('display', 'none'); // Hide the ID input
		// when adding
		$("#kpi_initative_Form").css('display', 'block');
	} else { // view and edit
		$("#kpi_Initiative_id_wrapper").css('display', 'block');
		$('.kpi_initiaties_popup #kpi_Initiative_id')
				.prop("disabled", true);
		if (action == 'edit') {
			
		}
		if (action == 'view') {
			$('#kpi_initative_Form input[type="text"]').prop("disabled", true);
			$('#kpi_initative_Form select').prop("disabled", true);
			$('#kpi_initative_Form button[value="Save"]').css('display', 'none');
		}

		$.ajax({
			url : "/stratroom/initiatives/" + id,
			success : kpiInitiatiesSuccessCallback
		});
	}
}

function handleKpiInitiativeSave() {
	var action = $("#kpi_initative_Form input[name='action']").val();
	if (action == 'delete') {

	} else {
		var InitiativeObj = getKpiInitiatiesObj(action);
		var methodType = 'post';
		if (action == 'add') {

		} else if (action == 'edit') {
			if(kpiinitiatiesDescription == undefined || kpiinitiatiesDescription == ""){
				$.notify("Kpi Initiaties not found",{
							  style: 'error',
							  className: 'graynotify'
							});
				return false;
			} 
			InitiativeObj.id = $("#kpiinitiativeID").val();
			methodType = 'put';
		}
		
		$.ajax({
			url : "/stratroom/initiatives/",
			type : methodType,
			contentType : "application/json",
			data : JSON.stringify(InitiativeObj),
			success : function(data, status) {
				location.reload(true);
				$("#kpiInitiatiesModal").click();
			},
			error:readErrorMsg
		});
	}
}

function getKpiInitiatiesObj(action) {
	var KpiObj	=	{"initiativeValue":{}};
	KpiObj["initiativeValue"]["name"]			=	$("#kpi_initative_desc").val();//$("#Initiative_name").val();
	KpiObj["initiativeValue"]["description"]	=	$("#kpi_initative_desc").val();
	KpiObj["initiativeValue"]["progressval"]	=	$("#kpi_initative_progress").val();
	KpiObj["initiativeValue"]["daterange"]		=	$("#kpi_initiaties_date").val();
	KpiObj["initiativeValue"]["attachment"]		=	$(".kpi_initiaties_popup #attachment").val();
	KpiObj["impactId"]	=	$("#impact_kpi_id").val();
	if(action	==	"add"){
		
		KpiObj["owner"] 	= (kpiowner !=	"" && kpiowner != undefined?kpiowner.id:"");
		KpiObj["initiativeValue"]["multipleowners"]	=	"";
		KpiObj["initiativeValue"]["Total"]			=	"";
		KpiObj["initiativeValue"]["TotCurr"]		=	"";
		KpiObj["initiativeValue"]["utilizedCurr"]	=	"$";
		KpiObj["initiativeValue"]["BalCurr"]		=	"$";
		KpiObj["initiativeValue"]["Balance"]		=	"";
		KpiObj["initiativeValue"]["Utilized"]		=	"";
		KpiObj["initiativeValue"]["actual"]			=	true;
		KpiObj["initiativeValue"]["target"]			=	true;
		KpiObj["initiativeValue"]["budget"]			=	true;
		KpiObj["initiativeValue"]["total"]			=	true;
		KpiObj["initiativeValue"]["balance"]		=	true;
		KpiObj["initiativeValue"]["utilized"]		=	true;
		KpiObj["initiativeValue"]["forecast"]		=	true;
	}
	if(action == "edit"){
		KpiObj["id"] = $("#kpiinitiativeID").val();
		KpiObj["owner"] 	= (kpiinitiatiesDescription.owner !=	"" && kpiinitiatiesDescription.owner != undefined?kpiinitiatiesDescription.owner:"");
		$.each(kpiinitiatiesDescription.initiativeValue,function(index,value){
			if(index	!=	"name" && index	!=	"description" && index	!=	"progressval" && index	!=	"daterange" && index != "attachment"){
				KpiObj["initiativeValue"][index]	=	value;
			}
		});
	}
	
	return KpiObj;
}

function kpiInitiatiesSuccessCallback(initiativedata) {
	kpiinitiatiesDescription	=	initiativedata; 
	$("#kpi_initative_Form").css('display', 'block');

	$('#kpiinitiativeID').val(initiativedata.id);
	if(initiativedata.initiativeId	==	undefined || initiativedata.initiativeId	==	""){
		$('#kpi_Initiative_id').val(initiativedata.id);
	}else{
		$('#kpi_Initiative_id').val(initiativedata.initiativeId);
	}
	$(".kpi_initiaties_popup #createdBy").html(initiativedata.initiativeValue.createdByName);
	$(".kpi_initiaties_popup #attachment").val(initiativedata.initiativeValue.attachment);
	
	$(".kpi_initiaties_popup #createdByDate").html(initiativedata.createDateString);
	$(".kpi_initiaties_popup #updatedBy").html(initiativedata.initiativeValue.updatedByName);
	$(".kpi_initiaties_popup #updatedByDate").html(initiativedata.updatedDateString);	
	$('#Initiative_name').val(initiativedata.initiativeValue.name);
	$('#kpi_initative_progress').val(initiativedata.initiativeValue.progressval);
	$('#kpi_initative_desc').val(initiativedata.initiativeValue.description);
	$("#kpi_initiaties_date").val(initiativedata.initiativeValue.daterange);
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
function handleRiskDetailEvent(kpiId,id, action) {
	console.log(kpiId,id, action,"kpiId,id, action")
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

function formvalidationerrorreset() {
	$('*[id*=-error]').each(function () {
		$(this).remove();
	});
	$(".input-calender-icon").css("bottom", "30%");
}
function populateKpiView(){
	var kpiId = $("#kpiId").val();
	if(empkpiPageId	!=	"" && empkpiPageId !=	undefined && empkpiPageId	!=	null){
		kpiId	=	empkpiPageId;
	}

	if(urlkpiId	!=	"" && urlkpiId !=	undefined && urlkpiId	!=	null){
		kpiId	=	urlkpiId;
	}
	console.log(kpiId)
	
	var checklocalstoragesamescorepageid	=	(localStorage.getItem("scordCardPageId") != undefined && localStorage.getItem("scordCardPageId") != null?localStorage.getItem("scordCardPageId"):'');
	var checklocalstoragesamescore	=	(localStorage.getItem("scoreCardId") != undefined && localStorage.getItem("scoreCardId") != null?localStorage.getItem("scoreCardId"):'');
	var checklocalstoragesameobj	=	(localStorage.getItem("objId") != undefined && localStorage.getItem("objId") != null?localStorage.getItem("objId"):'');	
	var checklocalstoragesamekpi	=	(localStorage.getItem("kpiId") != undefined && localStorage.getItem("kpiId") != null?localStorage.getItem("kpiId"):'');
	
	var samescorecardpageidflag	=	(checklocalstoragesamescorepageid	==	currentPageId?true:false);
	var samescorecardidflag		=	(checklocalstoragesamescore	==	empscorecardId?true:false);
	var sameobjectiveidflag		=	(checklocalstoragesameobj	==	empobjectiveId?true:false);
	var samekpiidflag			=	(checklocalstoragesamekpi	==	urlkpiId?true:false);
	
	if(ischeckkpiurlornot ==	"KPI"){
		kpigetreportee();
		kpipagepreference();
	}
	
	if(kpiId != undefined){
		var objId = "";
		var scoreCardId = "";
		var scordCardPageId = "";
		if(empscorecardId	!=	"" && empscorecardId !=	undefined && empscorecardId	!=	null){
			scordCardPageId	=	$("#kpi_scorecard_page").val();
			$("#kpi_scorecard_page").val(scordCardPageId);
			scoreCardId	=	$("#scoreCardId").val();
			populateObjectives(scoreCardId);
			objId = $("#objId").val()
		}else{
			$('#kpi_scorecard_page option:eq(1)').prop('selected', true).trigger('change');
			//$("#kpi_scorecard_page").prop("selectedIndex", 1).val();
			scordCardPageId	=	$("#kpi_scorecard_page").val();
			scoreCardId	=	$("#scoreCardId").val();
			objId = $("#objId").val()
		}
		scordCardPageId	=	$("#kpi_scorecard_page").val();
		populateScoreCard(scordCardPageId);
		
		
		if(currentPageId !=	'' && currentPageId !=	null && currentPageId !=	undefined){
			$("#kpi_scorecard_page").val(currentPageId);
			populateScoreCard(currentPageId);
			$("#kpi_scorecard").val(scoreCardId);
			populateObjectives(scoreCardId);	
		}
		if(scoreCardId	==	"" || scoreCardId	==	undefined || scoreCardId	==	null){
			scoreCardId	=	$("#kpi_scorecard").val();
		}
		if(objId	==	"" || objId	==	undefined || objId	==	null){
			objId	=	$("#kpi_objectives_id").val();
		}
		
		if(samescorecardpageidflag){
			$("#kpi_scorecard").val(checklocalstoragesamescore);
			populateObjectives(checklocalstoragesamescore);
		}else{
			$("#kpi_scorecard").val(scoreCardId);
			populateObjectives(scoreCardId);
		}
        scoreCardId=$("#kpi_scorecard").val();
			populateObjectives(scoreCardId);
		
		populateKpi(objId);
		var kpi_pagenumber	=	kpiId;
		if(samescorecardpageidflag && checklocalstoragesamekpi	!=	""){
			kpi_pagenumber	=	checklocalstoragesamekpi;
			populateKpiDetails(kpi_pagenumber);
		}else if(!samekpiidflag){
			kpi_pagenumber	=	kpiId;
			populateKpiDetails(kpi_pagenumber);
		}else{
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
	}
}

$(document).ready(function() {
	var useraccessid	=	localStorage.getItem('useraccessid')
	if(useraccessid != "" && useraccessid != null){
		$.ajaxSetup({
			beforeSend: function (xhr)
			{
			   xhr.setRequestHeader("useraccessid",useraccessid);        
			}
		});
	}
	getscorecardpermission();
	
	

	if(kpieditpermission == true || kpideletepermission == true || kpicreatepermission == true || kpiviewpermission == true){
		kpicontentload	=	true;
	}
	$('[data-toggle="tooltip"]').tooltip();
	getkpiSettings();
	
	if(controlpanelKpiSettings !=	"" && controlpanelKpiSettings !=	undefined && controlpanelKpiSettings.datatableactual != undefined && controlpanelKpiSettings.datatableactual == true){	
		datatableactual	=	true;
	}
	if(controlpanelKpiSettings !=	"" && controlpanelKpiSettings !=	undefined && controlpanelKpiSettings.datatabletarget != undefined && controlpanelKpiSettings.datatabletarget == true){	
		datatabletarget	=	true;
	}
	if(controlpanelKpiSettings !=	"" && controlpanelKpiSettings !=	undefined && controlpanelKpiSettings.datatablegap != undefined && controlpanelKpiSettings.datatablegap == true){	
		datatablegap	=	true;
	}
	if(controlpanelKpiSettings !=	"" && controlpanelKpiSettings !=	undefined && controlpanelKpiSettings.datatableytd != undefined && controlpanelKpiSettings.datatableytd == true){	
		datatableytd	=	true;
	}
	if(controlpanelKpiSettings !=	"" && controlpanelKpiSettings !=	undefined && controlpanelKpiSettings.datatablecontribution != undefined && controlpanelKpiSettings.datatablecontribution == true){	
		datatablecontribution	=	true;
	}
	if(controlpanelKpiSettings !=	"" && controlpanelKpiSettings !=	undefined && controlpanelKpiSettings.datatableannualtarget != undefined && controlpanelKpiSettings.datatableannualtarget == true){	
		datatableannualtarget	=	true;
	}
	if(controlpanelKpiSettings !=	"" && controlpanelKpiSettings !=	undefined && controlpanelKpiSettings.drilltableactual != undefined && controlpanelKpiSettings.drilltableactual == true){	
		drilltableactual	=	true;
	}
	if(controlpanelKpiSettings !=	"" && controlpanelKpiSettings !=	undefined && controlpanelKpiSettings.drilltabletarget != undefined && controlpanelKpiSettings.drilltabletarget == true){	
		drilltabletarget	=	true;
	}
	if(controlpanelKpiSettings !=	"" && controlpanelKpiSettings !=	undefined && controlpanelKpiSettings.drilltablegap != undefined && controlpanelKpiSettings.drilltablegap == true){	
		drilltablegap	=	true;
	}

	const reloadFlag = localStorage.getItem('reload');

    if (reloadFlag == null || reloadFlag == undefined || reloadFlag === 0 ) 
		{
			localStorage.removeItem('scordCardPageId');
			localStorage.removeItem('scoreCardId');
			localStorage.removeItem('objId');
			localStorage.removeItem('kpiId');
			localStorage.removeItem('reload');

		}
	populateKpiView();
});

function getkpiSettings(){
	$.ajax({
        url: "/stratroom/customPerformance/details",
        type: "GET",
        async:false,
        contentType: "application/json",
        success: function (response, status) {
    		controlpanelKpiSettings	=	response;	
		}
    });
}


function getHeight() {
    var innerHeight = $('#chartdiv_init').innerHeight();
    return innerHeight;
}

function getWidth() {
    var innerWidth = $('#chartdiv_init').innerWidth();
    return innerWidth;
}

function drawChart(chartElement,type) {
	
    var value 	= 	(type	==	"" || type== undefined?3:type);
    $(".highlightchart").each(function(){
    	$(this).removeClass('highlightchartactive');
    });
    localStorage.setItem("kpichartviewdata",value);
    if(value	==	3){
    	$("#linechrtactive").addClass("highlightchartactive");
    	$("#kpigettypeofchartview").html('');
    	$("#kpigettypeofchartview").html('<i class="fas fa-chart-line"></i>')
    }else if(value	==	2){
    	$("#columnchrtactive").addClass("highlightchartactive");
    	$("#kpigettypeofchartview").html('');
    	$("#kpigettypeofchartview").html('<i class="fas fa-chart-bar"></i>')
    }else if(value	==	4){
    	$("#areachrtactive").addClass("highlightchartactive");
    	$("#kpigettypeofchartview").html('');
    	$("#kpigettypeofchartview").html('<i class="fas fa-chart-area"></i>')
    }
    if(chartElement	!=	"#chart_modal"){
    	$(chartElement).empty();
    }
    
	//$("#chartdiv_expandinit").empty();
	if (value == '1') {
		$("#chartdiv_init").attr("data-id",value);
        drawnewBubble(chartElement);
    }else if (value == '2') {
		$("#chartdiv_init").attr("data-id",value);
        drawnewColumn(chartElement);
    }else if (value == '3') {
		$("#chartdiv_init").attr("data-id",value);
        drawnewLine(chartElement);
    }else if (value == '4') {
		$("#chartdiv_init").attr("data-id",value);
        drawnewArea(chartElement);
    }
   

}

function drawRisk() {
    var margin = {
            top: 40,
            right: 20,
            bottom: 30,
            left: 40
        },
        width = getWidth() - margin.left - margin.right,
        height = getHeight() - margin.top - margin.bottom;

    var now = new Date(),
        start = d3.time.year.floor(now),
        end = d3.time.year.ceil(now);
    var x = d3.time.scale()
        .range([0, width])
        .domain([start, end]);
    var y = d3.scale.linear()
        .range([height, 0])
        .domain([-90, 90]);
    var color = d3.scale.linear()
        .domain([90, 60, 30, 0])
        .range(['#D7191C', '#FDAE61', '#ABD9E9', '#2C7BB6']);
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');
    var svg = d3.select('#chartdiv_init').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    var data = [],
        latitudes = y.ticks(90),
        days = d3.range(0, 365, 2).map(function(i) {
            return d3.time.day.offset(start, i);
        });
    for (var i = 0, len = latitudes.length - 1; i < len; i++) {
        for (var j = 0, len2 = days.length - 1; j < len2; j++) {
            var day1 = days[j],
                day2 = days[j + 1],
                lat1 = latitudes[i],
                lat2 = latitudes[i + 1],
                day = new Date((day1.valueOf() + day2.valueOf()) / 2),
                lat = (lat1 + lat2) / 2;
            var solarNoon = SunCalc.getTimes(day, lat, 0).solarNoon;
            var altitude = SunCalc.getPosition(solarNoon, lat, 0).altitude * 180 / Math.PI;
            data.push({
                day1: day1,
                day2: day2,
                lat1: lat1,
                lat2: lat2,
                altitude: altitude
            });
        }
    }
    svg.selectAll('.cell')
        .data(data)
        .enter().append('rect')
        .attr('x', function(d) {
            return x(d.day1);
        })
        .attr('y', function(d) {
            return y(d.lat2);
        })
        .attr('width', function(d) {
            return x(d.day2) - x(d.day1);
        })
        .attr('height', function(d) {
            return y(d.lat1) - y(d.lat2);
        })
        .attr('fill', function(d) {
            return color(d.altitude);
        });
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
}

function drawPolar() {
    data = [{
        type: "scatterpolar",
        mode: "lines",
        r: [0, 1.5, 1.5, 0, 2.5, 2.5, 0],
        theta: [0, 10, 25, 0, 205, 215, 0],
        fill: "toself",
        fillcolor: '#709BFF',
        line: {
            color: 'black'
        }
    }, {
        type: "scatterpolar",
        mode: "lines",
        r: [0, 3.5, 3.5, 0],
        theta: [0, 55, 75, 0],
        fill: "toself",
        fillcolor: '#E4FF87',
        line: {
            color: 'black'
        }
    }, {
        type: "scatterpolar",
        mode: "lines",
        r: [0, 4.5, 4.5, 0, 4.5, 4.5, 0],
        theta: [0, 100, 120, 0, 305, 320, 0],
        fill: "toself",
        fillcolor: '#FFAA70',
        line: {
            color: 'black'
        }
    }, {
        type: "scatterpolar",
        mode: "lines",
        r: [0, 4, 4, 0],
        theta: [0, 165, 195, 0],
        fill: "toself",
        fillcolor: '#FFDF70',
        line: {
            color: 'black'
        }
    }, {
        type: "scatterpolar",
        mode: "lines",
        r: [0, 3, 3, 0],
        theta: [0, 262.5, 277.5, 0],
        fill: "toself",
        fillcolor: '#B6FFB4',
        line: {
            color: 'black'
        }
    }]

    layout = {
        polar: {
            radialaxis: {
                visible: true,
                range: [0, 5]
            }
        },
        showlegend: false
    }

    Plotly.newPlot('chartdiv_init', data, layout, {
        modeBarButtonsToRemove: ['sendDataToCloud', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'lasso2d', 'select2d'],
        displaylogo: false,
        showTips: true
    })
    $('.modebar-container').hide();
}
function convertonumber(value)
{
	value	=	(typeof value === "number"?convertInttoStringAndStringtoInt(value):value);
	return value.replace(/[^\d.-]/g, '');	
}

function drawnewBubble(chartElement) {
	
	var xaxis 	=	[];
	var yaxis 	=	[];
	var sizeshow 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	var chartdata	=	[];
	$.each(kpichartDataList,function(key,value){
		var numberformat 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);	
		if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (numberformat.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		var actualbody		=	convertonumber(value.actual);
		var targetbody		=	convertonumber(value.target);
		chartdata.push({"name":value.period,data:[{"x":value.period,"y":actualbody,"z":targetbody}]});
	});
	
	var layout = 	{
		series: chartdata,
		chart: {
            height: 323,
            type: "bubble",
          },
          dataLabels: {
            enabled: true,
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
          },
          fill: {
            opacity: 0.8,
          },
			xaxis:{
				tickAmount: 12,
				type: "category",
				title:{
						text:"Period",
						font: {
					        family: '"Poppins", sans-serif'
					    }
					}
				},
			yaxis:{
				max: 70,
				type: "category",
				title:{
					text:"Actual v/s Target",
					font: {
				        family: '"Poppins", sans-serif'
				      }
					}	
			}
		};
	
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 0;
	}

	
	if(chartElement 	==	"#chart_modal"){
		layout.autosize	=	false;
		layout.showlegend	=	false;
		layout.width	=	1200;
		layout.height	=	550;	
	}
	
	if(chartElement 	==	"#chartdiv_init"){
		//chartexpandcheck();
		var chart 	= 	new ApexCharts(document.querySelector(chartElement),layout).render();
		//layout.chart.width	=	350;
		//var chart 	= 	new ApexCharts(document.querySelector("#chartdiv_expandinit"),layout).render();
	}else{
		var chart 	= 	new ApexCharts(document.querySelector(chartElement),layout).render();	
	}
}

function drawnewColumn(chartElement) {
	
	var xaxis 	=	[];
	var yaxis 	=	[];
	var sizeshow 	=	[];
	var checkdecimalornot	=	false;
	var actualchartdata	=	[];
	var targetchartdata	=	[];
	var yaxislabel	=	[];
	var percentage		=	false;
	var millions = false;
	var currencyval = "$";
	var data	=	[];
	var tardata	=	[];
	
	$.each(kpichartDataList,function(key,value){
		var actualbody 	=	value.actual;
		var targetbody 	=	value.target;
		actualbody 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);
		targetbody 	=	(typeof value.target === "number"?convertInttoStringAndStringtoInt(value.target):value.target);
		
		actualbody		=	convertonumber(value.actual);
		targetbody		=	convertonumber(value.target);
		
		if(actualbody.indexOf("M")>=0 || targetbody.indexOf("M")>=0 )
		{
			millions = true;
			currencyval= actualbody.substring(0, 1);
		}
		else if (actualbody.indexOf("%")>=0 || targetbody.indexOf("%")>=0 )
		{
			percentage = true;
		}
		
		data.push(actualbody);
		tardata.push(targetbody);
		yaxislabel.push(value.period);
		
	});
	
	var chartdata	=	{};
	if(datatableactual	==	true && datatabletarget	==	true){
		chartdata	=	[{"name":"Actual",type:"column",data:data},{"name":"Target",type:"column",data:tardata}];
	}else if(datatableactual	==	true){
		chartdata	=	[{"name":"Actual",type:"column",data:data}];
	}else if(datatabletarget	==	true){
		chartdata	=	[{"name":"Target",type:"column",data:tardata}];
	}
	
	var yaxisdata = "Value"
	
	if(kpimillions)
	{
		yaxisdata = kpicurrencyval+" in Millions"
	}
	else if(kpipercentage)
	{
		yaxisdata = "Value in %"
	}
		
	var layout = 	{
		series:chartdata,
		chart: {
            height: 323,
            type: "line",
            toolbar: {
				export: {
					  	csv: {
							filename: 'Kpi Chart'
				  		}
					},
		  		},
          },
		 stroke: {
            width: [0, 4],
          },
          dataLabels: {
            enabled: false,
			enabledOnSeries: [1],
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
          }, 
		labels: yaxislabel,
			xaxis:{
				title:{
						text:"Period",
						offsetY: 5,
						font: {
					        family: '"Poppins", sans-serif'
					    }
					},		
				},
			yaxis:[{
				title:{
					text:yaxisdata,
					font: {
				        family: '"Poppins", sans-serif'
				      }
					}
				},
				{
              opposite: true,
			  //show:false
            }
			],
			tooltip: {
            fixed: {
              position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
              offsetY: 30,
              offsetX: 60,
            },
          }
		};
	
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 1;
	}
	
  	
	if(chartElement 	==	"#chart_modal"){
		layout.autosize	=	false;
		layout.showlegend	=	false;
		if(chartdata[0].data.length !=	undefined && chartdata[0].data.length <= 5 ){
			layout.width	=	600;
		}else if(chartdata[0].data.length !=	undefined && (chartdata[0].data.length >= 5 && chartdata[0].data.length <= 10) ){
			layout.width	=	850;
			$(".largeviewkpichart").css('max-width','80%');
		}else if(chartdata[0].data.length !=	undefined && chartdata[0].data.length >= 10 ){
			layout.width	=	1200;
			$(".largeviewkpichart").css('max-width','100%');
		}else{
			layout.width	=	600;
		}
		layout.height	=	550;
		//layout.plotOptions.bar.columnWidth	=	 '20%';
	}
	
	if(chartElement 	==	"#chartdiv_init"){
		//chartexpandcheck();
		var chart 	= 	new ApexCharts(document.querySelector(chartElement),layout).render();
		//layout.chart.width	=	350;
		//var chart 	= 	new ApexCharts(document.querySelector("#chartdiv_expandinit"),layout).render();
	}else{
		var chart 	= 	new ApexCharts(document.querySelector(chartElement),layout).render();	
	}
}

function drawnewLine(chartElement) {
	
	var xaxis 	=	[];
	var yaxis 	=	[];
	var sizeshow 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	var actualchartdata	=	[];
	var targetchartdata	=	[];
	var yaxislabel	=	[];
	var min =	0;
	var max	=	1;
	
	$.each(kpichartDataList,function(key,value){
		var actualbody 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);
		var targetbody 	=	(typeof value.target === "number"?convertInttoStringAndStringtoInt(value.target):value.target);	
		if (actualbody.indexOf("%") >= 0 && actualbody.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (actualbody.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (actualbody.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		actualbody		=	convertonumber(actualbody);
		targetbody		=	convertonumber(targetbody);
		
		if(actualbody	>	max){
			max	=	actualbody;
		}
		if(targetbody	>	max){
			max	=	targetbody;
		}
		if(min > actualbody){
			min	=	actualbody;
		}
		if(min > targetbody){
			min	=	targetbody;
		}
		yaxislabel.push(value.period);
		actualchartdata.push(actualbody);
		targetchartdata.push(targetbody);
	//	sizeshow.push(50);
	});
	
	var yaxisdata = "Value"
	
	if(kpimillions)
	{
		yaxisdata = kpicurrencyval+" in Millions"
	}
	else if(kpipercentage)
	{
		yaxisdata = "Value in %"
	}
	
	if(typeof min	===	"string"){
		min	=	parseInt(min);
	}
	if(typeof max	===	"string"){
		max	=	parseInt(max);
	}
	
	var chartseriesobj	=	{};
	if(datatableactual	==	true && datatabletarget	==	true){
		chartseriesobj	=	[{
            name: "Actual",
            data: actualchartdata,
          },
			{
            name: "Target",
            data: targetchartdata,
          }];
	}else if(datatableactual	==	true){
		chartseriesobj	=	[{
            name: "Actual",
            data: actualchartdata,
          }];
	}else if(datatabletarget	==	true){
		chartseriesobj	=	[
			{
            name: "Target",
            data: targetchartdata,
          }];
	}
	
	var layout = 	{
		series: chartseriesobj,
		chart: {
            height: 323,
            type: "line",
			dropShadow: {
              enabled: true,
              color: "#000",
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2,
            },
            toolbar: {
              show: true,
            },
          },
         dataLabels: {
            enabled: true,
          }, 
		 stroke: {
            curve: "smooth",
          },
          grid: {
            borderColor: "#e7e7e7",
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
		markers: {
            size: 1,
          },
		xaxis:{
			categories: yaxislabel,
			title:{
					text:"Period",
					font: {
				        family: '"Poppins", sans-serif'
				    },
				    align: "center",
				}	
			},
			yaxis:{
				title:{
					text:yaxisdata,
					font: {
				        family: '"Poppins", sans-serif'
				      }
					}
			},
			legend: {
            position: "bottom",
            horizontalAlign: "center",
          }
		};
	
	
	if(chartElement 	==	"#chart_modal"){
		layout.autosize	=	false;
		layout.showlegend	=	false;
		layout.width	=	1200;
		layout.height	=	550;	
	}
	
	if(chartElement 	==	"#chartdiv_init"){
		//chartexpandcheck();
		var chart 	= 	new ApexCharts(document.querySelector(chartElement),layout).render();
		//layout.chart.width	=	350;
		//var chart 	= 	new ApexCharts(document.querySelector("#chartdiv_expandinit"),layout).render();
	}else{
		var chart 	= 	new ApexCharts(document.querySelector(chartElement),layout).render();	
	}
}

function drawnewArea(chartElement) {
	
	var xaxis 	=	[];
	var yaxis 	=	[];
	var sizeshow 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	var actualchartdata	=	[];
	var targetchartdata	=	[];
	var yaxislabel	=	[];
	$.each(kpichartDataList,function(key,value){
		var actualbody 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);
		var targetbody 	=	(typeof value.target === "number"?convertInttoStringAndStringtoInt(value.target):value.target);	
		if (actualbody.indexOf("%") >= 0 && actualbody.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (actualbody.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (actualbody.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		actualbody		=	convertonumber(actualbody);
		targetbody		=	convertonumber(targetbody);
		yaxislabel.push(value.period);
		actualchartdata.push(actualbody);
		targetchartdata.push(targetbody);
	//	sizeshow.push(50);
	});
	
	var yaxisdata = "Value"
	
	if(kpimillions)
	{
		yaxisdata = kpicurrencyval+" in Millions"
	}
	else if(kpipercentage)
	{
		yaxisdata = "Value in %"
	}
	
	
	var chartseriesobj	=	{};
	if(datatableactual	==	true && datatabletarget	==	true){
		chartseriesobj	=	[{
            name: "Actual",
            data: actualchartdata,
          },{
            name: "Target",
            data: targetchartdata,
          }];
	}else if(datatableactual	==	true){
		chartseriesobj	=	[{
            name: "Actual",
            data: actualchartdata,
          }];
	}else if(datatabletarget	==	true){
		chartseriesobj	=	[{
            name: "Target",
            data: targetchartdata,
          }];
	}
	
	var layout = 	{
		series: chartseriesobj,
		chart: {
            height: 323,
            type: "area",
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 90, 100],
            },
          },
		legend: {
			show: true,
            position: "bottom",
            horizontalAlign: "center",
          },
		
			xaxis:{
				categories: yaxislabel,
				title:{
						text:"Period",
						font: {
					        family: '"Poppins", sans-serif'
					    }
					}
				},
			yaxis:{
				title:{
					text:yaxisdata,
					font: {
				        family: '"Poppins", sans-serif'
				      }
					}
			},
			labels:{
				align:'center',
			},	
		};
	
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 1;
	}
	
	if(checkdecimalornot	==	true && percentage	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
		
	}else if(percentage	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}else if(checkdecimalornot	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}
	
	if(chartElement 	==	"#chart_modal"){
		layout.autosize	=	false;
		layout.showlegend	=	false;
		layout.width	=	1200;
		layout.height	=	550;	
	}
	
	if(chartElement 	==	"#chartdiv_init"){
		//chartexpandcheck();
		var chart 	= 	new ApexCharts(document.querySelector(chartElement),layout).render();
		//layout.chart.width	=	350;
		//var chart 	= 	new ApexCharts(document.querySelector("#chartdiv_expandinit"),layout).render();
	}else{
		var chart 	= 	new ApexCharts(document.querySelector(chartElement),layout).render();	
	}
}

function drawBubble(chartElement) {
	
	var xaxis 	=	[];
	var yaxis 	=	[];
	var sizeshow 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	$.each(kpichartDataList,function(key,value){
		var numberformat 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);	
		if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (numberformat.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		xaxis.push(value.period);
		yaxis.push(value.actual);
		sizeshow.push(50);
	});
	
	var layout = 	{
    					title: 'Kpi Chart',
						xaxis:{
								title:{
										text:"Period",
										font: {
									        family: '"Poppins", sans-serif'
									    }
									}
							},
						yaxis:{
							tickformat:'',
							range:'',
							title:{
								text:"Actual",
								font: {
							        family: '"Poppins", sans-serif'
							      }
								}	
						}
					};
	
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 1;
	}

	if(checkdecimalornot	==	true && percentage	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
		
	}else if(percentage	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}else if(checkdecimalornot	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}

	var data = [
        {
            mode: "markers",
			x:xaxis,         
            y: yaxis,
			marker: {
    			size: sizeshow
  			}
        }
    ];
	
	if(chartElement 	==	"#chartdiv_init"){
		chartexpandcheck();
		chartElement	=	"chartdiv_init";
		layout.autosize	=	false;
		layout.width	=	268;
		layout.height	=	340;
		layout.showlegend	=	false;
	}else{
		chartElement	=	"chart_modal";
		layout.autosize	=	false;
		layout.showlegend	=	false;
		layout.width	=	1200;
		layout.height	=	550;	
	}

	Plotly.newPlot(chartElement, data, layout,{displayModeBar: false});
	if(chartElement 	==	"chartdiv_init"){
		layout.autosize	=	false;
		layout.showlegend	=	false;
		layout.width	=	335;
		layout.height	=	340;
		Plotly.newPlot("chartdiv_expandinit", data, layout,{displayModeBar: false});
	}
}

function drawBox(chartElement) {
    
   	var xaxis 	=	[];
	var yaxis 	=	[];
	var showtext 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	$.each(kpichartDataList,function(key,value){
		var numberformat 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);	
		if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (numberformat.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		xaxis.push(value.period);
		yaxis.push(value.actual);
		//showtext.push(value.target+' below the target');
	});
	
	var layout = 	{
    					title: 'Kpi Chart',
						xaxis:{
								type:'Period',
								title:{
										text:"Period",
										font: {
									        family: '"Poppins", sans-serif'
									    }
									}
							},
						yaxis:{
							tickformat:'',
							range:'',
							type:'linear',
							title:{
								text:"Actual",
								font: {
							        family: '"Poppins", sans-serif'
							      }
								}	
						}
					};
					
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 0;
	}

	if(checkdecimalornot	==	true && percentage	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
		
	}else if(percentage	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}else if(checkdecimalornot	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}

	var data = [
        {
            type: "box",
			boxpoints: 'all',         
            y: yaxis,
			jitter: "",
    		pointpos: ""
        }
    ];
	
	if(chartElement 	==	"#chartdiv_init"){
		chartexpandcheck();
		chartElement	=	"chartdiv_init";
		layout.autosize	=	false;
		layout.showlegend	=	true;
		layout.width	=	268;
		layout.height	=	340;
	}else{
		chartElement	=	"chart_modal";
		layout.autosize	=	false;
		layout.showlegend	=	true;
		layout.width	=	1200;
		layout.height	=	550;	
	}

	Plotly.newPlot(chartElement, data, layout,{displayModeBar: false});
	if(chartElement 	==	"chartdiv_init"){
		layout.autosize	=	false;
		layout.showlegend	=	true;
		layout.width	=	335;
		layout.height	=	340;
		Plotly.newPlot("chartdiv_expandinit", data, layout,{displayModeBar: false});
	}
}

function drawLine(chartElement) {
    // Set the dimensions of the canvas / graph
	var xaxis 	=	[];
	var yaxis 	=	[];
	var showtext 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	$.each(kpichartDataList,function(key,value){
		var numberformat 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);	
		if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (numberformat.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		xaxis.push(value.period);
		yaxis.push(value.actual);
		//showtext.push(value.target+' below the target');
	});
	
	var layout = 	{
    					title: 'Kpi Chart',
						xaxis:{
								title:{
										text:"Period",
										font: {
									        family: '"Poppins", sans-serif'
									    }
									}
							},
						yaxis:{
							tickformat:'',
							range:'',
							title:{
								text:"Actual",
								font: {
							        family: '"Poppins", sans-serif'
							      }
								}	
						}
					};
	
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 0;
	}

	if(checkdecimalornot	==	true && percentage	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
		
	}else if(percentage	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}else if(checkdecimalornot	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}

	var trace1 	= 	{
  				x: xaxis,
  				y: yaxis,
  				type: 'scatter',
  				text: showtext,
  				marker: {
    				color: 'rgb(142,124,195)'
  				}
			};

	var data = [trace1];
	
	if(chartElement 	==	"#chartdiv_init"){
		chartexpandcheck();
		chartElement	=	"chartdiv_init";
		layout.autosize	=	false;
		layout.width	=	268;
		layout.height	=	340;
	}else{
		chartElement	=	"chart_modal";
		layout.autosize	=	false;
		layout.width	=	1200;
		layout.height	=	550;	
	}

	Plotly.newPlot(chartElement, data, layout,{displayModeBar: false});
	if(chartElement 	==	"chartdiv_init"){
		layout.autosize	=	false;
		layout.width	=	335;
		layout.height	=	340;
		Plotly.newPlot("chartdiv_expandinit", data, layout,{displayModeBar: false});
	}
}

function drawSctter(chartElement) {
    // Set the dimensions of the canvas / graph
	var xaxis 	=	[];
	var yaxis 	=	[];
	var showtext 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	$.each(kpichartDataList,function(key,value){
		var numberformat 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);	
		if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (numberformat.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		xaxis.push(value.period);
		yaxis.push(value.actual);
		//showtext.push(value.target+' below the target');
	});
	
	var layout = 	{
    					title: 'Kpi Chart',
						xaxis:{
								title:{
										text:"Period",
										font: {
									        family: '"Poppins", sans-serif'
									    }
									}
							},
						yaxis:{
							tickformat:'',
							range:'',
							title:{
								text:"Actual",
								font: {
							        family: '"Poppins", sans-serif'
							      }
								}	
						}
					};

	
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 0;
	}

	if(checkdecimalornot	==	true && percentage	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
		
	}else if(percentage	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}else if(checkdecimalornot	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}

	var trace1 	= 	{
  				x: xaxis,
  				y: yaxis,
				mode: 'markers',
  				type: 'scatter',
  				text: showtext,
  				marker: {
    				color: 'rgb(142,124,195)'
  				}
			};

	var data = [trace1];
	
	if(chartElement 	==	"#chartdiv_init"){
		chartexpandcheck();
		chartElement	=	"chartdiv_init";
		layout.autosize	=	false;
		layout.width	=	268;
		layout.height	=	340;
	}else{
		chartElement	=	"chart_modal";
		layout.autosize	=	false;
		layout.width	=	1200;
		layout.height	=	550;	
	}

	Plotly.newPlot(chartElement, data, layout,{displayModeBar: false});
	if(chartElement 	==	"chartdiv_init"){
		layout.autosize	=	false;
		layout.width	=	335;
		layout.height	=	340;
		Plotly.newPlot("chartdiv_expandinit", data, layout,{displayModeBar: false});
	}
}

function drawRadar() {
    var margin = {
            top: 30,
            right: 20,
            bottom: 30,
            left: 30
        },
        width = getWidth() - margin.left - margin.right,
        height = getHeight() - margin.top - margin.bottom;

    var data = [
        [ //iPhone
            {
                axis: "Battery",
                value: 0.22
            }, {
                axis: "Brand",
                value: 0.28
            }, {
                axis: "Contract",
                value: 0.29
            }, {
                axis: "Quality",
                value: 0.17
            }, {
                axis: "Internet",
                value: 0.22
            }, {
                axis: "Screen",
                value: 0.02
            }, {
                axis: "Price",
                value: 0.21
            }, {
                axis: "Smartphone",
                value: 0.50
            }
        ],
        [ //Samsung
            {
                axis: "Battery",
                value: 0.27
            }, {
                axis: "Brand",
                value: 0.16
            }, {
                axis: "Contract",
                value: 0.35
            }, {
                axis: "Quality",
                value: 0.13
            }, {
                axis: "Internet",
                value: 0.20
            }, {
                axis: "Screen",
                value: 0.13
            }, {
                axis: "Device",
                value: 0.35
            }, {
                axis: "Smartphone",
                value: 0.38
            }
        ],
        [ //Nokia Smartphone
            {
                axis: "Battery",
                value: 0.26
            }, {
                axis: "Brand",
                value: 0.10
            }, {
                axis: "Contract",
                value: 0.30
            }, {
                axis: "Quality",
                value: 0.14
            }, {
                axis: "Internet",
                value: 0.22
            }, {
                axis: "Screen",
                value: 0.04
            }, {
                axis: "Price",
                value: 0.41
            }, {
                axis: "Smartphone",
                value: 0.30
            }
        ]
    ];
    var color = d3.scale.ordinal()
        .range(["#EDC951", "#CC333F", "#00A0B0"]);

    var radarChartOptions = {
        w: width,
        h: height,
        margin: margin,
        maxValue: 0.5,
        levels: 5,
        roundStrokes: true,
        color: color
    };
    //Call function to draw the Radar chart
    RadarChart.draw("#chartdiv_init", data, radarChartOptions);

}

function drawWaterfall(chartElement) {
	var xaxis 	=	[];
	var yaxis 	=	[];
	var showtext 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	$.each(kpichartDataList,function(key,value){
		var numberformat 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);	
		if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (numberformat.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		xaxis.push(value.period);
		yaxis.push(value.actual);
		//showtext.push(value.target+' below the target');
	});
	
	var layout = 	{
    					title: 'Kpi Chart',
						xaxis:{
								title:{
										text:"Period",
										font: {
									        family: '"Poppins", sans-serif'
									    }
									}
							},
						yaxis:{
							tickformat:'',
							range:'',
							type:'linear',
							title:{
								text:"Actual",
								font: {
							        family: '"Poppins", sans-serif'
							      }
								}	
						}
					};


	
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 0;
	}

	if(checkdecimalornot	==	true && percentage	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
		
	}else if(percentage	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}else if(checkdecimalornot	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}

	var data = [
        {
            name: "Actual",
            type: "waterfall",
            orientation: "v",
            measure: [],
            x:xaxis,
            textposition: "outside",
            text: [],         
            y: yaxis,
            connector: {
              line: {
                color: "rgb(63, 63, 63)"
              }
            },
        }
    ];
	
	if(chartElement 	==	"#chartdiv_init"){
		chartexpandcheck();
		chartElement	=	"chartdiv_init";
		layout.autosize	=	false;
		layout.showlegend	=	true;
		layout.width	=	268;
		layout.height	=	340;
	}else{
		chartElement	=	"chart_modal";
		layout.autosize	=	false;
		layout.showlegend	=	true;
		layout.width	=	1200;
		layout.height	=	550;	
	}

	Plotly.newPlot(chartElement, data, layout,{displayModeBar: false});
	if(chartElement 	==	"chartdiv_init"){
		layout.autosize	=	false;
		layout.showlegend	=	true;
		layout.width	=	335;
		layout.height	=	340;
		Plotly.newPlot("chartdiv_expandinit", data, layout,{displayModeBar: false});
	}
}

function drawBar(chartElement) {
    var xaxis 	=	[];
	var yaxis 	=	[];
	var showtext 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	$.each(kpichartDataList,function(key,value){
		var numberformat 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);	
		if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (numberformat.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		xaxis.push(value.period);
		yaxis.push(value.actual);
		//showtext.push(value.target+' below the target');
	});
	
	var layout = 	{
    					title: 'Kpi Chart',
						xaxis:{
								title:{
										text:"Period",
										font: {
									        family: '"Poppins", sans-serif'
									    }
									}
							},
						yaxis:{
							tickformat:'',
							range:'',
							title:{
								text:"Actual",
								font: {
							        family: '"Poppins", sans-serif'
							      }
								}	
						}
					};
	
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 0;
	}

	if(checkdecimalornot	==	true && percentage	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
		
	}else if(percentage	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}else if(checkdecimalornot	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}

	var trace1 	= 	{
  				x: xaxis,
  				y: yaxis,
  				type: 'bar',
  				text: showtext,
  				marker: {
    				color: 'rgb(142,124,195)'
  				}
			};

	var data = [trace1];
	
	if(chartElement 	==	"#chartdiv_init"){
		chartexpandcheck();
		chartElement	=	"chartdiv_init";
		layout.autosize	=	false;
		layout.width	=	268;
		layout.height	=	340;
	}else{
		chartElement	=	"chart_modal";
		layout.autosize	=	false;
		layout.width	=	1200;
		layout.height	=	550;	
	}

	Plotly.newPlot(chartElement, data, layout,{displayModeBar: false});
	if(chartElement 	==	"chartdiv_init"){
		layout.autosize	=	false;
		layout.width	=	335;
		layout.height	=	340;
		Plotly.newPlot("chartdiv_expandinit", data, layout,{displayModeBar: false});
	}
}

function drawStacked(chartElement) {
    var xaxis 	=	[];
	var yaxis 	=	[];
	var y1axis 	=	[];
	var showtext 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	$.each(kpichartDataList,function(key,value){
		var numberformat 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);
		var numberformat1 	=	(typeof value.target === "number"?convertInttoStringAndStringtoInt(value.target):value.target);	
		if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (numberformat.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		xaxis.push(value.period);
		yaxis.push(value.actual);
		y1axis.push(value.target);
		//showtext.push(value.target+' below the target');
	});
	
	var layout = 	{
    					title: 'Kpi Chart',
						xaxis:{
								title:{
										text:"Period",
										font: {
									        family: '"Poppins", sans-serif'
									    }
									}
							},
						yaxis:{
							tickformat:'',
							range:'',
							title:{
								text:"Actual",
								font: {
							        family: '"Poppins", sans-serif'
							      }
								}	
						}
					};
	
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 0;
	}

	if(checkdecimalornot	==	true && percentage	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
		
	}else if(percentage	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}else if(checkdecimalornot	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}

	var trace1 	= 	{
  				x: xaxis,
  				y: yaxis,
  				type: 'bar',
  				text: showtext,
				name:"Actual",
  				marker: {
    				color: '#1f77b4'
  				}
			};
	var trace2 	= 	{
  				x: xaxis,
  				y: y1axis,
  				type: 'bar',
  				text: showtext,
				name:"Target",
  				marker: {
    				color: '#ff7f0e'
  				}
			};

	var data = [trace1,trace2];
	
	if(chartElement 	==	"#chartdiv_init"){
		chartexpandcheck();
		chartElement	=	"chartdiv_init";
		layout.autosize	=	false;
		layout.width	=	268;
		layout.height	=	340;
	}else{
		chartElement	=	"chart_modal";
		layout.autosize	=	false;
		layout.width	=	1200;
		layout.height	=	550;	
	}

	Plotly.newPlot(chartElement, data, layout,{displayModeBar: false});
	if(chartElement 	==	"chartdiv_init"){
		layout.autosize	=	false;
		layout.width	=	335;
		layout.height	=	340;
		Plotly.newPlot("chartdiv_expandinit", data, layout,{displayModeBar: false});
	}
}

function drawMultipleYaxis(chartElement) {
    var xaxis 	=	[];
	var yaxis 	=	[];
	var y1axis 	=	[];
	var y2axis 	=	[];
	var showtext 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	$.each(kpichartDataList,function(key,value){
		var numberformat 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);	
		if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (numberformat.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		xaxis.push(value.period);
		yaxis.push(value.actual);
		y1axis.push(value.target);
		y2axis.push(value.gap);
		//showtext.push(value.target+' below the target');
	});
	
	var layout = 	{
    					title: 'Kpi Chart',
						xaxis:{
								title:{
										text:"Period",
										font: {
									        family: '"Poppins", sans-serif'
									    }
									}
							},
						yaxis:{
							tickformat:'',
							range:'',
							title:{
								text:"Actual",
								font: {
							        family: '"Poppins", sans-serifs'
							      }
								}	
						}
					};
	
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 0;
	}

	if(checkdecimalornot	==	true && percentage	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
		
	}else if(percentage	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}else if(checkdecimalornot	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}
	$(chartElement).empty();
	if(chartElement 	==	"#chartdiv_init"){
		chartElement	=	"chartdiv_init";
		layout.autosize	=	false;
		layout.width	=	268;
		layout.height	=	340;
	}else{
		chartElement	=	"chart_modal";
		layout.autosize	=	false;
		layout.width	=	1200;
		layout.height	=	550;	
	}

	var options = {
          series: [{
          name: 'Actual',
          type: 'column',
          data: yaxis
        }, {
          name: 'Target',
          type: 'column',
          data: y1axis
        }, {
          name: 'Gap',
          type: 'line',
          data: y2axis
        }],
          chart: {
          height: 325,
          type: 'line',
          stacked: false,
    		toolbar: {
      			show: false
    		}
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [1, 1, 4]
        },
        title: {
          text: '',
          align: 'left',
          offsetX: 110
        },
        xaxis: {
          categories: xaxis,
        },
        yaxis: [
          {
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#008FFB'
            },
            labels: {
              style: {
                colors: '#008FFB',
              }
            },
            title: {
              text: "Actual",
              style: {
                color: '#008FFB',
              }
            },
            tooltip: {
              enabled: true
            }
          },
          {
            seriesName: 'Income',
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#00E396'
            },
            labels: {
              style: {
                colors: '#00E396',
              }
            },
            title: {
              text: "Actual",
              style: {
                color: '#00E396',
              }
            },
          },
          {
            seriesName: 'Revenue',
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#FEB019'
            },
            labels: {
              style: {
                colors: '#FEB019',
              },
            },
            title: {
              text: "Actual",
              style: {
                color: '#FEB019',
              }
            }
          },
        ],
        tooltip: {
          fixed: {
            enabled: true,
            position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60
          },
        },
        legend: {
          horizontalAlign: 'left',
          offsetX: 40
        }
        };
		
        var chart = new ApexCharts(document.querySelector("#"+chartElement), options);
        chart.render();
		if(chartElement 	==	"chartdiv_init"){
			layout.autosize	=	false;
			layout.width	=	268;
			layout.height	=	340;
			var chart = new ApexCharts(document.querySelector("#chartdiv_expandinit"), options);
        	chart.render();
		}
}

function drawPie(chartElement) {
	
	var xaxis 	=	[];
	var yaxis 	=	[];
	var showtext 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	$.each(kpichartDataList,function(key,value){
		var numberformat 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);	
		if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (numberformat.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		xaxis.push(value.period);
		yaxis.push(value.actual);
		//showtext.push(value.target+' below the target');
	});
	
	var layout = 	{
    					title: 'Kpi Chart',
						yaxis:{
							tickformat:'',
							range:''	
						}
					};
	
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 0;
	}

	if(checkdecimalornot	==	true && percentage	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
		
	}else if(percentage	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}else if(checkdecimalornot	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}

	var data 	= 	[{
  				values: yaxis,
  				labels: xaxis,
  				type: 'pie',
			}];
	
	if(chartElement 	==	"#chartdiv_init"){
		chartexpandcheck();
		chartElement	=	"chartdiv_init";
		layout.autosize	=	false;
		layout.width	=	268;
		layout.height	=	340;
	}else{
		chartElement	=	"chart_modal";
		layout.autosize	=	false;
		layout.width	=	1200;
		layout.height	=	550;	
	}

	Plotly.newPlot(chartElement, data, layout,{displayModeBar: false});
	if(chartElement 	==	"chartdiv_init"){
		layout.autosize	=	false;
		layout.width	=	335;
		layout.height	=	340;
		Plotly.newPlot("chartdiv_expandinit", data, layout,{displayModeBar: false});
	}
}

function kpichartviewdetails(){
	$(".kpi_chart_view_popup .modal-title").text($("#kpichartHeader").text());
	var getcurrentchart	=	localStorage.getItem("kpichartviewdata");
	//$("#chart_modal").resize(function(e) {
        //drawChart("#chart_modal",$("#chartdiv_init").attr("data-id"));
        drawChart("#chart_modal",(getcurrentchart == null || getcurrentchart == ""?3:getcurrentchart));
    //});
	//$(".viewkpichartmodal").attr("id",'chart_modal'+$("#chartdiv_init").attr("data-id"));
	//drawChart('#chart_modal'+$("#chartdiv_init").attr("data-id"),$("#chartdiv_init").attr("data-id"));
}

function kpiActualtargetviewdetails(id,type){
	if(id	==	"" && type	==	""){
		return false;
	}
	$.ajax({
		url : "/stratroom/kpiDetailList/" + id+"?period="+$("#datePeriod").val()+"&flagType="+flagType,
		contentType : "application/json",
		success : function(data, status) {
			if(type	==	"view"){
				kpiActualViewSuccessCallback(data,id);
			}else if(type	==	"csvdownload"){
				kpiActualDownloadSuccessCallback(data,id);
			}
			
		},
		error:function(msg,status){

	
			}
	});
}

function chartmodalclose(){
	$('.kpi_chart_view_popup').modal('hide');
//	drawChart('view');
}

function drawStandard(chartElement) {
	var xaxis 	=	[];
	var yaxis 	=	[];
	var showtext 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	$.each(kpichartDataList,function(key,value){
		var numberformat 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);	
		if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (numberformat.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		xaxis.push(value.period);
		yaxis.push(value.actual);
		//showtext.push(value.target+' below the target');
	});
	
	var layout = 	{
    					title: 'Kpi Chart',
						xaxis:{
								title:{
										text:"Period",
										font: {
									        family: '"Poppins", sans-serif'
									    }
									}
							},
						yaxis:{
							tickformat:'',
							range:'',
							title:{
								text:"Actual",
								font: {
							        family: '"Poppins", sans-serif'
							      }
								}	
						}
					};
	
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 0;
	}

	if(checkdecimalornot	==	true && percentage	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
		
	}else if(percentage	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}else if(checkdecimalornot	==	true){
		var roundvalue 			=	Math.round(max);
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}

	var trace1 	= 	{
  				x: xaxis,
  				y: yaxis,
				color:"green",
  				type: (checkdecimalornot == true || percentage == true ?'scatter':'bar'),
  				text: showtext,
  				marker: {
    				color: 'rgb(142,124,195)'
  				}
			};

	var data = [trace1];
	
	if(chartElement 	==	"#chartdiv_init"){
		chartexpandcheck();
		chartElement	=	"chartdiv_init";
		layout.autosize	=	false;
		layout.width	=	268;
		layout.height	=	340;
	}else{
		chartElement	=	"chart_modal";
		layout.autosize	=	false;
		layout.width	=	1200;
		layout.height	=	550;	
	}

	Plotly.newPlot(chartElement, data, layout,{displayModeBar: false});
	if(chartElement 	==	"chartdiv_init"){
		layout.autosize	=	false;
		layout.width	=	335;
		layout.height	=	340;
		Plotly.newPlot("chartdiv_expandinit", data, layout,{displayModeBar: false});
	}
}

function chartexpandcheck(){
	if ($('body').hasClass('side-closed')) {
        $("#chartdiv_init").css({ "display": "none" });
		$("#chartdiv_expandinit").css({ "display": "block" });
    } else {
        $("#chartdiv_init").css({ "display": "block" });
    }
}


$(document).on('blur',".editableTxt2",function(){
	var elementId 		=	$(this).attr("id");
	var oldelementValue =	$(this).attr("data-old"+elementId);
	var elementValue 	=	$(this).text().trim();
	var elementObj 		=	{};
	var elementOldObj 	=	{};
	elementObj[elementId] =	elementValue;
	elementOldObj[elementId] 	=	oldelementValue;
	
	if(elementValue !=	oldelementValue){
		$(this).attr("data-old"+elementId,elementValue);
		$("#"+elementId).append('<span id="inlineloader"><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>');
		handleKpiInlineEditSave(elementObj,elementOldObj);
	}
});

function handleKpiInlineEditSave(elementObjectKeyValue,elementOldObj) {
	if(parentKpidetails == undefined || parentKpidetails == "" || parentKpidetails == " " || parentKpidetails.id == undefined || parentKpidetails.id == ""){
		return false;
	}
	
	$.each(elementObjectKeyValue,function(key,value){
		parentKpidetails["kpiValue"][key] 	=	value;
	});
	
	var methodType = 'put';	
	$.ajax({
		url : "/stratroom/kpi/",
		type : methodType,
		contentType : "application/json",
		data : JSON.stringify(parentKpidetails),
		success : function(data, status) {
			$("body span#inlineloader").remove();
			$.notify("Updated Successfully",{
							  style: 'success',
							  className: 'graynotify'
							});
			
		},
		error:function(msg,status){

			$.each(elementOldObj,function(key,value){
				$("#"+key).text(value);
			});
			
			if(!jQuery.isEmptyObject(msg.responseText)){
				$.each(JSON.parse(msg.responseText),function(key,value){
					if(key 	==	"exception"){
						$.notify("Error:"+value, {
							  style: 'error',
							  className: 'graynotify'
							});
					}
					if(key 	==	"error"){
						$.notify("Error:"+value, {
							  style: 'error',
							  className: 'graynotify'
							});
					}
				});
				
			}
			$("body span#inlineloader").remove();
		}
	});
}

function populateOwnerDropdownKpi(elementId) {
	var numberOfOptions = $(elementId + ' > option').length;

	if (jQuery.isEmptyObject(kpireporteelist)) {
		$.ajax({
			url : "/stratroom/reporteeList",
			async:false,
			success : function(employeeList) {
				kpireporteelist = employeeList;
				$.each(employeeList, function(index, reportee) {
					addOption(elementId, reportee.name, reportee.id)
				});
			}
		});
	} else if (numberOfOptions < 2) {
		$.each(kpireporteelist, function(index, reportee) {
			addOption(elementId, reportee.name, reportee.id)
		});
	}
	multipleoptionElementTriggerValuesKpi();
}

function multipleoptionElementTriggerValuesKpi(){
	$(".initatives_description_popup select").formSelect();
    $(".initatives_description_popup select.select_all")
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


$(document).on('keypress','#kpiComments',function(e) {
    var id	=	$(this).attr("data-id");
    if(id	==	""){
    	return false;
    }
    if(e.which == 13) {
        handleKPICommentsSave(id,'add');
        return false;
    }
});
// $(document).on('keypress','#kpiCommentsReply',function(e) {
//     var id	=	$(this).attr("data-id");
//     if(id	==	""){
//     	return false;
//     }
//     if(e.which == 13) {
//         handleKPICommentsReplySave(id,'add');
//         return false;
//     }
// });

$(document).on("click",".initiativenavigate",function(){
	var id 		=	$(this).attr("data-id");
	var initiativeid =	$(this).attr("data-initiativeid");
	var emppgno =	currentEmp;
	
	if(id	!=	"" && initiativeid !=	"" && emppgno != id){
		$.ajax({
			url:'emp/checkPageDetails?pageId='+id,
			type: "GET",
        	contentType: "application/json",
			success:function(data){
				if(data	==	true){
					localStorage.setItem("initiative_pagenumber", initiativeid);
					window.location 	=	"dashboard/"+currentEmp+"?pageId="+id;	
				}else{
					$.notify("You can n't navigate this page",{
							  style: 'error',
							  className: 'graynotify'
							});		
				}
			}
		});
	}
	
	if(id	!=	"" && emppgno == id){
		$.notify("You can n't navigate this page",{
							  style: 'error',
							  className: 'graynotify'
							});
	}
});

$(document).on("click",".countclick",function(){
	$(this).toggleClass("green");
	var id	=	$(this).attr("data-id");
	if(!id){
		return false;
	}
	var counter=	$(this).closest('li').next('li').find('span.counter').text();
	if($(this).text()	==	"Like"){
		$(this).text("Unlike");
	}else{
		$(this).text("Like");
	}
	var flaglike 	=	false;
	var likecount 	=	0;
	if($(this).hasClass("green")){
		flaglike	=	true;
		likecount 	=	parseInt(parseInt(counter)+1);
		$(this).closest('li').next('li').find('span.counter').text(parseInt(parseInt(counter)+1))
	}else{
		flaglike	=	false;
		likecount 	=	parseInt(parseInt(counter)-1);
		$(this).closest('li').next('li').find('span.counter').text(parseInt(parseInt(counter)-1))
	}
	
	if(likecount == -1){
		return false;
	}
	
	var data 	=	{
			id:id,
			likeCount:likecount,
			type:(flaglike?"like":"dislike"),
			fromPage:'kpi',
			empId:currentEmp
	}
	
	$.ajax({
		url:'/stratroom/commentLike',
		type:'put',
		data:JSON.stringify(data),
		async:false,
		contentType : "application/json",
		success:function(res){
			$.notify("Updated Successfully",{
			  style: 'success',
			  className: 'graynotify'
			});
		},error:readErrorMsg
	});
});

// ----------------------------------------------------------------------------

    var kpiAttachmentData = {
        "id": 12,
        "createdBy": 0,
        "updatedBy": 0,
        "kpiDataId": 2289,
        "name": "app",
        "size": "25017 bytes",
        "type": "docx",
        "file":  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "createdTime": null,
        "updatedTime": null,
        "kpiId": 19969
    };
    
    var kpiId = kpiAttachmentData.kpiId;
    console.log("Check here kpiId is shown",kpiId);

// ----------------------------------------------------------------------------

// popup modal
$(document).ready(function() {
    $('#moreOptionsBtn').click(function(e) {
        e.preventDefault();
        $('#optionsBtn').toggle();
    });

    $(document).click(function(e) {
        if (!$(e.target).closest('#moreOptionsBtn, #optionsBtn').length) {
            $('#optionsBtn').hide();
        }
    });

    $('#viewAttachment').click(function(e) {
        e.preventDefault();
        var mainTableContent = $('#attachmentTable').html();
        $('#popupattachmentTable').html(mainTableContent);
        $('#viewAttachmentsModal').modal('show');
    });

    // ajax
    $.ajax({
        url: '/stratroom/kpiAttachmentList/'+urlkpiId,
        type: "GET",
        success: function(response) {
            console.log("API Response Successfully Inserted", response);
            var tbody = $("#attachmentTable");
            tbody.empty();
            $.each(response, function(index, item) {
                var nameDisplay = item.name.split('.')[0];
                var fileExtension = item.name.split('.').pop().toLowerCase();
                var iconsDisplay = "";
                switch(fileExtension) {
                    case "jpeg":
                    case "jpg":
                    case "png":
                    case "gif":
                        iconsDisplay = "fas fa-file-image";
                        break;
                    case "pdf":
                        iconsDisplay = "fas fa-file-pdf";
                        break;
                    case "xls":
                    case "xlsx":
                        iconsDisplay = "fas fa-file-excel";
                        break;
                    case "doc":
                    case "docx":
                        iconsDisplay = "fas fa-file-word";
                        break;
                    case "html":
                    case "htm":
                        iconsDisplay = "fas fa-file-code";
                        break;
                    default:
                        iconsDisplay = "fas fa-file";
                }
                
                var row = "<tr>" +
                "<td style='text-align:center; font-size: 11px !important; border: 1px solid #ddd !important;background-color: #fff !important;'>" +
                    "<div style='display: flex; flex-direction: column; align-items: center;'>" +
                        "<i class='" + iconsDisplay + " download-icon' style='font-size: 35px; color: " + colorsDisplay(fileExtension) + ";cursor: pointer;' " +
                        "data-uniquekey='" + item.uniqueFileReference + "' " +
                        "data-filename='" + item.file + "' " +
                        "data-filetype='" + item.type + "'></i>" +
                        "<span style='font-size: 12px; margin-top: 5px;'>" + nameDisplay + "." + fileExtension + "</span>" +
                    "</div>" +
                "</td>" +
                "<td style='text-align:center; font-size: 11px !important; border: 1px solid #ddd !important; background-color: #fff !important;'>" + (item.size || 'N/A') + "</td>" +
                "<td style='text-align:center; font-size: 11px !important; border: 1px solid #ddd !important; background-color: #fff !important;'>" + item.file + "</td>" +
                "<td style='text-align:center; font-size: 11px !important; border: 1px solid #ddd !important; background-color: #fff !important;'>" + fileExtension + "</td>" +
            "</tr>";
            tbody.append(row);
        });

		$('.download-icon').click(function() {
            var uniqueKey = $(this).data('uniquekey');
            var fileName = $(this).data('filename');
            var fileType = $(this).data('filetype');
            downloadFile(uniqueKey, fileName, fileType);
        	});
        },
        error: function(error) {
            console.error("API Response Failed", error);
        }
    });
});


function downloadFile(uniqueKey, fileName, fileType) {
    var downloadUrl = '/stratroom/kpi/download?' +
        'uniqueKey=' + encodeURIComponent(uniqueKey) +
        '&fileName=' + encodeURIComponent(fileName) +
        '&fileType=' + encodeURIComponent(fileType);
    
    // Create a temporary anchor element to trigger the download
    var link = document.createElement('a');
    link.href = downloadUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
// color
function colorsDisplay(fileExtension) {
    switch(fileExtension) {
        case "jpeg":
        case "jpg":
        case "png":
        case "gif":
            return "green";
        case "pdf":
            return "red";
        case "xls":
        case "xlsx":
            return "green";
        case "doc":
        case "docx":
            return "blue";
        case "html":
        case "htm":
            return "orange";
        default:
            return "black";
    }
}

 $(document).ready(function () {
    function formatTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Post a new comment
    $(".post-comment").on("click", function () {
        let commentText = $(".comment-input").val().trim();
        if (commentText === "") return;

        let commentHTML = `
            <div class="comment">
                <div class="comment-content">
                  <div class="comment-card">
                    <img src="assets/images/user/usrbig6.jpg" class="user-img" width="28" height="28" alt="User">
                     <div class="comment-cr">
                       <div class="comment-highlight">                        
                           <div class="comment-head"><h6 class="user-name">karthik Ramani, CEO</h6> <span class="comment-time">${formatTime()}</span></div>
                          <div class="comment-text">${commentText}</div>
                        </div>
                        <div class="comment-actions">
                            <span class="like-btn">Like</span> ·
                            <span class="like-count">0</span> ·
                            <span class="reply-btn">Reply</span> · 
                            <span class="edit-btn">Edit</span> · 
                            <span class="delete-btn">Delete</span>
                        </div>
                      </div>
                    </div>
                    <div class="reply-section" style="display: none;">
                        <input type="text" class="form-control reply-input" placeholder="Write a reply...">
                        <button class="btn btn-sm label-bg-primary reply-post"><i class="fas fa-arrow-right"></i></button>
                    </div>
                </div>
                <div class="replies"></div> <!-- Replies will be nested here -->
            </div>
        `;

        $(".comments-list").prepend(commentHTML);
        $(".comment-input").val(""); // Clear input field
    });

    // Like button toggle
    // Like button toggle with count
    $(document).on("click", ".like-btn", function () {
        let likeCountElem = $(this).siblings(".like-count");
        let count = parseInt(likeCountElem.text());

        if ($(this).hasClass("liked")) {
            $(this).removeClass("liked").text("Like");
            likeCountElem.text(count - 1);
        } else {
            $(this).addClass("liked").text("Unlike");
            likeCountElem.text(count + 1);
        }
    });

    // Show reply input only for the clicked comment
    $(document).on("click", ".reply-btn", function () {
       // $(this).closest(".comment").find(".reply-section").toggle();
        $(this).closest(".comment, .reply").find(".reply-section").first().toggle();
    });

    // Post a reply with proper hierarchy
    $(document).on("click", ".reply-post", function () {
        let replyText = $(this).siblings(".reply-input").val().trim();
        if (replyText === "") return;

        let replyHTML = `
            <div class="reply">
                <div class="reply-content">
                <div class="reply-card"> 

                    <img src="assets/images/user/usrbig6.jpg" class="user-img" alt="User">
                      <div class="comment-cr">
                        <div class="comment-highlight">
                      <div class="comment-head"><h6 class="user-name">Saj Abraham</h6> <span class="comment-time">${formatTime()}</span></div>
                      <div class="comment-text">${replyText}</div>
                      </div>
                        <div class="comment-actions">
                            <span class="like-btn">Like</span> ·
                            <span class="like-count">0</span> ·
                            <span class="reply-btn">Reply</span> · 
                            <span class="edit-btn">Edit</span> ·
                            <span class="delete-btn">Delete</span>
                        </div>
                        </div>
                    </div>
                    <div class="reply-section" style="display: none;">
                        <input type="text" class="form-control reply-input" placeholder="Write a reply...">
                        <button class="btn btn-sm label-bg-primary reply-post"><i class="fas fa-arrow-right"></i></button>
                    </div>
                </div>
                <div class="replies"></div> <!-- Nested replies go here -->
            </div>
        `;

        // Append reply to the correct comment's replies container
        // $(this).closest(".comment").find(".replies").first().append(replyHTML);
        $(this).closest(".comment, .reply").find(".replies").first().append(replyHTML);
        $(this).siblings(".reply-input").val(""); // Clear input field
        $(this).parent().hide(); // Hide reply box after posting
    });

     // Edit comment or reply
     $(document).on("click", ".edit-btn", function () {
        let commentContent = $(this).closest(".comment-content, .reply-content");
        let commentTextElem = commentContent.find(".comment-text");
        let currentText = commentTextElem.text();

        // Replace text with input field
        // commentTextElem.replaceWith(`<input type="text" class="edit-input form-control" value="${currentText}">`);
        commentTextElem.replaceWith(`<textarea rows="3" class="edit-input form-control">${currentText}</textarea>`);
        $(this).text("Save").addClass("save-btn").removeClass("edit-btn");
    });
     // Save edited comment or reply
     $(document).on("click", ".save-btn", function () {
        let commentContent = $(this).closest(".comment-content, .reply-content");
        let editInput = commentContent.find(".edit-input");
        let updatedText = editInput.val().trim();

        if (updatedText === "") return;

        // Replace input field with updated text
        editInput.replaceWith(`<div class="comment-text">${updatedText}</div>`);
        $(this).text("Edit").addClass("edit-btn").removeClass("save-btn");
    });
// Delete comment or reply
$(document).on("click", ".delete-btn", function () {
        $(this).closest(".comment, .reply").remove();
    });

    $(document).on("keypress", ".comment-input", function (e) {
    if (e.which === 13 && !e.shiftKey) { // Enter key (without Shift)
        e.preventDefault(); // Prevents new line
        $(".post-comment").click(); // Trigger button click
    }
});

$(document).on("keypress", ".reply-input", function (e) {
    if (e.which === 13 && !e.shiftKey) {
        e.preventDefault();
        $(this).siblings(".reply-post").click(); // Trigger reply button
    }
});




  });


