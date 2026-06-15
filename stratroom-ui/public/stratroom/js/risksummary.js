var currentEmp		=	$("#userPrincipal").val();
var kpiList = {};
var reporteelist = [];
var riskpreference 		= 	[];
var riskempPreference 	= 	{"preferences":{}};
var defaultreporteelist	=	{};
var empriskmodPermission	=	[];
var risksumcreatepermission =	false;
var risksumeditpermission	=	false;
var risksumdeletepermission =	false;
var risksumviewpermission	=	false;
var risksumchartDataList	=	[];

var empcomcreatepermission=	false;
var empcomeditpermission	=	false;
var empcomdeletepermission=	false;
var empcomviewpermission	=	false;
var empcomcontentload	=	false;

function getreportee() {
	
	if (jQuery.isEmptyObject(reporteelist)) {
		$.ajax({
			url : "/stratroom/reporteeList",
			async:false,
			success : function(employeeList) {
				reporteelist = employeeList;
			}
		});
	} 
}

function getempriskpermission(){
	$.ajax({
		type : "GET",
		url : "/stratroom/user/modulePermissions?moduleName=Risk",
		async:false,
		success : function(data) {
			if(data.Risk !=	undefined && !jQuery.isEmptyObject(data.Risk)){
				empriskmodPermission	=	data.Risk.Risk;
				//comments
				if(data.Risk.Comments.privilegeCreate !=	undefined && data.Risk.Comments.privilegeCreate == "TRUE"){	
					empcomcreatepermission	=	true;
				}
				if(data.Risk.Comments.privilegeUpdate !=	undefined && data.Risk.Comments.privilegeUpdate == "TRUE"){
					empcomeditpermission	=	true;
				}
				if(data.Risk.Comments.privilegeDelete !=	undefined && data.Risk.Comments.privilegeDelete == "TRUE"){
					empcomdeletepermission	=	true;
				}
				if(data.Risk.Comments.privilegeView !=	undefined && data.Risk.Comments.privilegeView == "TRUE"){
					empcomviewpermission	=	true;
				}
			}
		}
	});
}

function riskpagepreference() {
	if (jQuery.isEmptyObject(riskpreference)) {
		$.ajax({
			url : "/stratroom/getPreferences?pageName=RISK",
			async:false,
			success : function(employeeList) {
				riskpreference = employeeList;
			}
		});
	} 
}

$(document).on('blur',".editableTxt1",function(){
	var elementId 		=	$(this).attr("id");
	var oldelementValue =	$(this).attr("data-old"+elementId);
	var elementValue 	=	$(this).text().trim();
	var elementObj 		=	{};
	var elementOldObj 	=	{};
	elementObj[elementId] 		=	elementValue;
	elementOldObj[elementId] 	=	oldelementValue;
	
	if(elementValue !=	oldelementValue){
		$(this).attr("data-old"+elementId,elementValue);
		$("#"+elementId).append('<span id="inlineloader"><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>');
		handleInlineEditSave(elementObj,elementOldObj,riskupdateDescription);
	}
});

function handleInlineEditSave(elementObjectKeyValue,elementOldObj,item) {
	if(item == undefined || item == "" || item == " " || item.id == undefined || item.id == ""){
		$.notify("data is invalid",{
							  style: 'error',
							  className: 'graynotify'
							});
		return false;
	}
	
	var riskupdateDescription	=	getRiskObj('edit');
	$.each(elementObjectKeyValue,function(key,value){
		riskupdateDescription["riskValue"][key] 	=	value;
	});
	
	var methodType = 'put';	
	$.ajax({
		url : "/stratroom/risk/",
		type : methodType,
		contentType : "application/json",
		data : JSON.stringify(riskupdateDescription),
		success : function(data, status) {
			$("body span#inlineloader").remove();
			$.each(elementOldObj,function(key,value){
				$("#"+key).text(value);
			});
			
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

function handleRiskSummaryCommentsSave(action) {
	var commentsObj = {
		"owner" : currentEmp,
		"fromPage":"employee",
		"active" : 0,
		"riskCommentsValue" : {
			"desc" : $("#risksum_comments_Form #comments").val(),
		}
	}
	if(action	==	"add"){
		commentsObj.riskCommentsValue.desc	=	$("#risksumarycommentval").val();
		if(commentsObj.riskCommentsValue.desc	==	"" || commentsObj.riskCommentsValue.desc	==	"0"){
			return false;
		}
	}
	
	var methodType = 'post';
	if(action	==	"edit"){
		commentsObj.id	=	$("#risksum_comments_id").val();
		methodType = 'put';
	}
	
	$.ajax({
		url : "/stratroom/riskComments/",
		type : methodType,
		contentType : "application/json",
		data : JSON.stringify(commentsObj),
		success : function(data, status) {
			window.location.reload(true);
		}
	});
}

function deleteRisksummary(commentId) {
	$("#deleterecordid").val(commentId);
	$('#deleteModalrisksummary').modal('toggle');
	$(window).on("resize", function(){
	    $(".modal:visible").each(alignModal);
	}); 
	$(".modal").on("shown.bs.modal", alignModal);
}

function handleriskeventdelete(){
	
	var id				=	$("#deleterecordid").val();
	if(id	==	""){
		return false;
	}
	var url	=	"/stratroom/riskComments/" + id;
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

$(document).ready(function () {
	getempriskpermission();
	if(empriskmodPermission.privilegeCreate !=	undefined && empriskmodPermission.privilegeCreate == "TRUE"){	
		risksumcreatepermission	=	true;
	}
	
	if(empriskmodPermission.privilegeUpdate !=	undefined && empriskmodPermission.privilegeUpdate == "TRUE"){
		risksumeditpermission	=	true;
	}
	
	if(empriskmodPermission.privilegeDelete !=	undefined && empriskmodPermission.privilegeDelete == "TRUE"){
		risksumdeletepermission	=	true;
	}
	
	if(empriskmodPermission.privilegeView !=	undefined && empriskmodPermission.privilegeView == "TRUE"){
		risksumviewpermission	=	true;
	}
	
	if(!empcomcreatepermission){
		$(".risksumcomment_send").remove();
	}
	
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
	
	if(enableaccesscontrolMenu	==	true){
		risksumcreatepermission	=	true;
		risksumeditpermission		=	true;
		risksumdeletepermission	=	true;
		risksumviewpermission		=	true;
	}
	
	if(risksumviewpermission	==	false){
		$(".viewrisksummarycomments").remove();
		return false;
	}
	getreportee();
	risksummaryviewdetails("tablerow");
	risksummarycomments();
	
    /*$('.multi-column-dropdown input[type="checkbox"]').click(function () {
    var inputValue = $(this).attr("value");
	var checkedProp 	= 	$(this).is(':checked');
	inputValue			=	inputValue.replaceallstring();
	riskempPreference["pageName"]					=	"RISK";
	riskempPreference["preferences"][inputValue]	=	checkedProp;
	$.ajax({
		url : "/stratroom/employeePreference",
		type : "POST",
		contentType : "application/json",
		data : JSON.stringify(riskempPreference),
		success : function(data, status) {
			
		},
		error:readErrorMsg
	});
    $("." + inputValue).toggle();
    });*/
});

$(".dropdown-menu").on("click", function (e) {
    e.stopPropagation();
});

function risksummarycommentsviewdetails(){
	var element	=	$("#view_summarycomment-conversation");
	$("#risksum_comments_view_popup").modal('toggle');
	$(element).html('');
	$(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
	$.ajax({
		url : "/stratroom/retrieveRiskCommentsList/",
		success : summarycommentsrecordsviewSuccessCallback,
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

function summarycommentsrecordsviewSuccessCallback(result){
    console.log(result, "result");
	var sub_initiatiesrow	=	"";
	var subinitiativeProgressBar	=	"";
	$.each(result,function(index, comment) {
		if(comment.fromPage != undefined && comment.fromPage != null && comment.fromPage == "employee"){
		var timeformatted 	=	(comment.riskCommentsValue.formattedTime != undefined?comment.riskCommentsValue.formattedTime:"");
		//var timeformatted	=	new Date(comment.createdTime);
		timeformatted 	=	formatofAmPm(new Date(timeformatted));
		var kpicomentsowner	=	{};
		$.each(reporteelist,function(ownkey,empvalue){
			if(empvalue.id	==	comment.createdBy){
				kpicomentsowner	=	{"id":empvalue.id,"name":empvalue.name,"image":empvalue.image};
				return false;
			}
		});
			
		var name	=	(comment.riskCommentsValue.createdByName == undefined || comment.riskCommentsValue.createdByName == ""?comment.riskCommentsValue.updatedByName:comment.riskCommentsValue.createdByName);
		var title	=	(comment.riskCommentsValue.title != undefined && comment.riskCommentsValue.title != ""?comment.riskCommentsValue.title:"");

		var getownershortName	=	hasWhiteSpaceName(name);	
		var	Owner	=	"data-name='"+getownershortName+"' class='rounded-circle summarycommentsviewimage'";
		
		if(kpicomentsowner !=	undefined && kpicomentsowner !=	'' && kpicomentsowner.name !== undefined){
			var username 	=	((kpicomentsowner.name ==	undefined || kpicomentsowner.name == "")?"User":kpicomentsowner.name);
			Owner = ((kpicomentsowner.image ==	undefined || kpicomentsowner.image == "")?"data-name='"+kpicomentsowner.name+"' class='rounded-circle summarycommentsviewimage'":" class='rounded-circle' src='"+kpicomentsowner.image+"'");
		}
		
		var currentuserlike 	=	(comment.likeEmpIds != undefined && comment.likeEmpIds != null?comment.likeEmpIds:[]);
		var likeText 	=	"Like";
		var likeTextclass 	=	"";	
		if(currentuserlike.length > 0 && $.inArray(Number(currentEmp),currentuserlike) !== -1){
			likeText 	=	"Unlike";
			likeTextclass 	=	"green";
		}
		var count 	=	(comment.likeCount != undefined && comment.likeCount != null?comment.likeCount:0);
		
		var desc=comment.riskCommentsValue.desc;
		sub_initiatiesrow	+=	'<li><div class="d-flex flex-row"><div class="flex-column comment_image"><img '+Owner+' alt="User" width="40"></div><div class="flex-column comment_details"><ul><li><span class="message-data-name"><strong>'+name+', '+title+' </strong></span></li><li class="commentsdesc">'+desc+'</li><li><ul class="d-flex flex-row">'
		+'<li>Reply</li><li class="'+likeTextclass+'">'+likeText+'</li><li class="parentcounter"><span class="badge badge-dark counter">'+count+'</span></li>'
		+'<li>'+timeformatted+'</li></ul></li></ul></div></div></li>';
		}
	});
	
	$("#view_summarycomment-conversation").html('');
	$("#view_summarycomment-conversation").html(sub_initiatiesrow);
	$('.summarycommentsviewimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
	$('#risksum-comment-conversation_employee').slimscroll({
        height: '340px',
        size: '3px',
        color: '#9c9c9c'
    });
}

function commentsrecordsviewSuccessCallback(result){
	
	var sub_initiatiesrow	=	"";
	var subinitiativeProgressBar	=	"";
	$.each(result,function(index, comment) {
		/*var timeformatted = new Date(comment.createdTime)
		timeformatted 	=	formatofAmPm(timeformatted);*/
		var timeformatted 	=	comment.riskCommentsValue.formattedDateTime;
		var kpicomentsowner	=	{};
		$.each(reporteelist,function(ownkey,empvalue){
			if(empvalue.id	==	comment.createdBy){
				kpicomentsowner	=	{"id":empvalue.id,"name":empvalue.name,"image":empvalue.image};
				return false;
			}
		});
				
		var name	=	(comment.riskCommentsValue.createdByName == undefined || comment.riskCommentsValue.createdByName == ""?comment.riskCommentsValue.updatedByName:comment.riskCommentsValue.createdByName);
		var title	=	(comment.riskCommentsValue.title != undefined && comment.riskCommentsValue.title != ""?comment.riskCommentsValue.title:"");

		var	Owner	=	"data-name='"+getownershortName+"' class='rounded-circle commentsviewimage'";
		
		if(kpicomentsowner !=	undefined && kpicomentsowner !=	'' && kpicomentsowner.name !== undefined){
			var username 	=	((kpicomentsowner.name ==	undefined || kpicomentsowner.name == "")?"User":kpicomentsowner.name);
			Owner = ((kpicomentsowner.image ==	undefined || kpicomentsowner.image == "")?"data-name='"+kpicomentsowner.name+"' class='rounded-circle commentsviewimage'":" class='rounded-circle' src='"+kpicomentsowner.image+"'");
		}
		var desc=comment.riskCommentsValue.desc;
		sub_initiatiesrow	+=	'<li><div class="d-flex flex-row"><div class="flex-column comment_image"><img '+Owner+' alt="User" width="40"></div><div class="flex-column comment_details"><ul><li><span class="message-data-name"><strong>'+name+', '+title+' </strong></span></li><li class="commentsdesc">'+desc+'</li><li><ul class="d-flex flex-row"><li>'+timeformatted+'</li></ul></li></ul></div></div></li>';
	});
	$("#comments-row-box_view").html('');
	$("#comments-row-box_view").html(sub_initiatiesrow);
	$('.commentsviewimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
}

function risksummaryviewdetails(type){
	var element	=	$("#summarytable1");
	$(element).html('');
	$(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
	$.ajax({
		url : "/stratroom/riskTableList/",
		success : function(data){
			summaryTablerecordsviewSuccessCallback(data,type);	
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

function summaryTablerecordsviewSuccessCallback(result, type) {
  var tableBody = '';
  
  $.each(result, function (i, List) {
    // Determine flag color and badge colors based on likelihood and impact
    var flagcolor = "green";
    var likelihoodColor = "green";
    var impactColor = "green";
    
    if(List.likeliHood == "Unlikely") {
      flagcolor = "yellow";
      likelihoodColor = "yellow";
    } else if(List.likeliHood == "Possible" || List.likeliHood == "Likely" || List.likeliHood == "Almost Certain") {
      flagcolor = "red";
      likelihoodColor = "red";
    }
    
    // Determine impact color (you may want to customize this logic)
    if(List.impact == "High" || List.impact == "Extreme") {
      impactColor = "red";
    } else if(List.impact == "Moderate") {
      impactColor = "yellow";
    }
    
    // Prepare data for Mustache template
    var riskData = {
      flagcolor: flagcolor,
      id: List.id,
      name: List.name,
      score: List.score,
      likeliHood: List.likeliHood,
      impact: List.impact,
      dateRaised: List.dateRaised,
      nextAssessment: List.nextAssessment,
      riskcategory: List.riskcategory,
      status: List.status,
      likelihoodColor: likelihoodColor,
      impactColor: impactColor
    };
    
    // Render the template
    var template = $('#summary-template').html();
    tableBody += Mustache.render(template, riskData);
    
    // Push to chart data if needed
    var risksumobj = {
      name: List.name, 
      id: List.id,
      desc: List.name,
      impact: List.impact, 
      likeliHood: List.likeliHood
    };
    risksumchartDataList.push(risksumobj);
  });
  
  // Insert the rendered HTML into the table
  $('#riskTableBody').html(tableBody);
  
  // Initialize any additional functionality
  if(risksumviewpermission) {
    if(type == "viewsummarytable") {
      $(".viewsummarytable1").html(tableBody);
    } else {
      $(".summarytable1").html(tableBody);	
    }
    drawrisksumChart("chartdiv_risksum",'risksumload');
  }
  
  // Initialize slimscroll if needed
  $('.chartrisktemplatediv').slimscroll({
    height: '340px',
    size: '3px',
    color: '#9c9c9c'
  });
  
  // Add click handlers for navigation
  $('.risknavigate').on('click', function() {
    var riskId = $(this).data('id');
    // Handle risk navigation here
  });
}

function viewsummaryviewdetails(){
	var element	=	$("#viewsummarytable1");
	$('.Risktableview').modal('toggle');
	$(element).html('');
	$(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
	$.ajax({
		url : "/stratroom/riskTableList/",
		success : function(data){
			viewsummaryTablerecordsviewSuccessCallback(data);	
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

function formvalidationerrorreset(){
	$('*[id*=-error]').each(function() {
	    $(this).remove();
	});
}

function handlesummaryCommentsPopup(id,action){
	formvalidationerrorreset();
	$("#activCreatedBy").html('');
	$("#activUpdatedBy").html('');
	$("#activCreatedByDate").html('');
	$("#activUpdatedByDate").html('');
	$("#risksum_comments_Form input[name='action']").val(action);
	$.ajax({
		url : "/stratroom/riskComments/"+id,
		async:false,
		success : function(data){
			$("#comments").val(data.riskCommentsValue.desc);
			$("#risksum_comments_id").val(data.id);
			$("#activCreatedBy").html(data.riskCommentsValue.createdByName);
			$("#activUpdatedBy").html(data.riskCommentsValue.updatedByName);
			$("#activCreatedByDate").html(data.createDateString);
			$("#activUpdatedByDate").html(data.updatedDateString);
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

function viewsummaryTablerecordsviewSuccessCallback(result){
	$(".viewsummarytable1").html('');
//	var bodyRows	=	'<thead><tr><th style="width:10px;">Status</th><th style="width:30px;">ID</th><th style="width:50px;">Name</th><th style="width:15px;">Category</th><th style="width:15px;">Impact</th><th style="width:15px;">Likelihood</th><th style="width:15px;">Score</th><th style="width:15px;">Raised on</th><th style="width:15px;">Next Assessment</th></tr></thead>';
	var bodyRows	=	'<thead><tr><th style="width:1%;">Status</th><th style="width:10%;">ID</th><th style="width:35%;">Name</th><th style="width:15%;" data-i18n="Category">Category</th><th style="width:10%;" data-i18n="Impact">Impact</th><th style="width:10%;">Likelihood</th><th style="width:5%;" data-i18n="Score">Score</th><th style="width:10%;">Raised on</th><th style="width:10%;">Next Assessment</th></tr></thead>';
	var row			=	"";
	$.each(result, function (i, List) {
		var flagcolor	=	"risk_green_color";
		if(List.likeliHood	==	"Rare"){
			flagcolor	=	"risk_green_color";
		}else if(List.likeliHood	==	"Unlikely"){
			flagcolor	=	"risk_yellow_color";
		}else if(List.likeliHood	==	"Possible" || List.likeliHood	==	"Likely" || List.likeliHood	==	"Almost Certain"){
			flagcolor	=	"risk_red_color";
		}
		row		+=	'<tr><td style="line-height:normal !important;white-space:unset !important;"><i class="fas fa-flag '+flagcolor+'"></i></td><td style="line-height:normal !important;white-space:unset !important;">'+List.id+'</td><td style="line-height:normal !important;white-space:unset !important;"><a href="#" style="font-weight: 600;color: #333 !important;">'+List.name+'</a></td><td style="line-height:normal !important;white-space:unset !important;">'+List.riskcategory+'</td><td class="'+flagcolor+'" style="line-height:normal !important;white-space:unset !important;">'+List.impact+'</td><td class="'+flagcolor+'" style="line-height:normal !important;white-space:unset !important;">'+List.likeliHood+'</td><td style="line-height:normal !important;white-space:unset !important;">'+List.score+'</td><td>'+List.dateRaised+'</td><td style="line-height:normal !important;white-space:unset !important;">'+List.nextAssessment+'</td></tr>';
	});
	
	$(".viewsummarytable1").html(bodyRows+row);	
}

function risksummarycomments(){
	var element	=	$("#comments-row-box_view");
	$("#commentsviewheader").text($("#commentheader").text());
	$(element).html('');
	$(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
	$.ajax({
		url : "/stratroom/retrieveRiskCommentsList/",
		async:false,
		success : commentsrecordsviewSuccessCallback,
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

function commentsrecordsviewSuccessCallback(result){
	
	var commentsHeader	=	"Comments";
	var commentRows		=	"";
	$.each(result, function(index, comments) {
		if(comments.fromPage != undefined && comments.fromPage != null && comments.fromPage == "employee"){
		var commentsRowTemplate = $('#comments-row-template').html();
		var timeformatted = new Date(comments.createdTime);
		if(comments.riskCommentsValue.formattedDateTime != undefined && comments.riskCommentsValue.formattedDateTime != "")
			{
				timeformatted = new Date(comments.riskCommentsValue.formattedDateTime);
			}
		
		if(comments.riskCommentsValue.createdByName == undefined || comments.riskCommentsValue.createdByName == ""){
			var commentsuser	=	comments.updatedBy;
			var name			=	comments.riskCommentsValue.updatedByName;
		}else{
			var name			=	comments.riskCommentsValue.createdByName;
			var commentsuser	=	comments.createdBy;
		}
		
		var title	=	(comments.riskCommentsValue.title != undefined && comments.riskCommentsValue.title != ""?comments.riskCommentsValue.title:"");
		var getownershortName	=	hasWhiteSpaceName(name);
		var	Owner	=	"class='rounded-circle commentsuserimage' data-name='"+getownershortName+"'";
		var defaultreporteelist	=	{};
		$.each(reporteelist,function(ownkey,empvalue){
			if(empvalue.id	==	comments.createdBy){
				defaultreporteelist	=	{"id":empvalue.id,"name":empvalue.name,"image":empvalue.image,"dept":empvalue.dept};
			}
		});
		
		if(defaultreporteelist != undefined && defaultreporteelist !=	''){
			var username 	=	((defaultreporteelist.name ==	undefined || defaultreporteelist.name == "")?"User":defaultreporteelist.name);
			Owner = ((defaultreporteelist.image ==undefined || defaultreporteelist.image == "")?"data-name='"+getownershortName+"' class='rounded-circle commentsuserimage' ":" class='rounded-circle' src='"+defaultreporteelist.image+"'");
		}
		
		var risksumOptions	=	"";
		
		if(empcomeditpermission	==	false && empcomdeletepermission	==	false){
		risksumOptions	=	""
		}else{
			risksumOptions	=	`<ul class="header-dropdown m-r--2 pt-2 d-flex">
							<li class="dropdown"><a href="#" onclick="return false;"
								class="dropdown-toggle" data-toggle="dropdown" role="button"
								aria-haspopup="true" aria-expanded="true"> <i
									class="material-icons">more_vert</i>
							</a>
								<ul class="dropdown-menu editoptionparentdropdown-menu pull-right" x-placement="bottom-start"
									style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">`;
			if(empcomeditpermission	==	true){
				risksumOptions	+=	`<li>
                                    	<a href="#" data-toggle="modal" data-target="#comment_edit_popup" onclick="handlesummaryCommentsPopup(`+comments.id+`,'edit')">Edit</a>
                                    </li>`;
			}
			if(empcomdeletepermission	==	true){
				risksumOptions	+=	`<li><a onclick="deleteRisksummary(`+comments.id+`)">Delete</a></li>`;
			}						
			
			risksumOptions	+=	`</ul>
	                            </li>
	                       	</ul>`;
		}
		
		var currentuserlike 	=	(comments.likeEmpIds != undefined && comments.likeEmpIds != null?comments.likeEmpIds:[]);
		var likeText 	=	"Like";
		var likeTextclass 	=	"";	
		if(currentuserlike.length > 0 && $.inArray(Number(currentEmp),currentuserlike) !== -1){
			likeText 	=	"Unlike";
			likeTextclass 	=	"green";
		}
		
		timeformatted 	=	formatofAmPm(timeformatted);
		var commentDetails = Mustache.render(commentsRowTemplate, {
			id : comments.id,
			commentsName : capitalizeFLetter(comments.riskCommentsValue.desc),
			title:title,
			createdByName : name,
			Owner : Owner,
			likeText:likeText,
			likeTextclass:likeTextclass,
			count : (comments.likeCount != undefined && comments.likeCount != null?comments.likeCount:0),
			createdTime : timeformatted,
			risksumOptions:risksumOptions
		});
		commentRows = commentRows + commentDetails;
		}
		
	});

	var commentsTemplate = $('#summarycomment-template-parent').html();
	var commentDetails = Mustache.render(commentsTemplate, {
		commentRows : commentRows
	});
	
	if(empcomviewpermission){
		$('.summarycomment-conversation_1').html(commentDetails);
	}
	$('.commentsuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
		
		if(empcomcreatepermission	==	false){
			$('#comment-conversation').slimscroll({
				height: "324px",
				size: '3px',
				color: '#9c9c9c'
			});
		}
		if(empcomcreatepermission	==	true){
			$('#comment-conversation').slimscroll({
				height: "282px",
				size: '3px',
				color: '#9c9c9c'
			});
		}
}

$(document).on("click",".summarytable1 td.risknavigate",function(){
	var id =	$(this).attr("data-id");
	if(id	!=	""){
		localStorage.setItem("risk_pagenumber", id);
		window.location 	=	"risks";
	}
});

function drawrisksumChart(chartElement,type) {	
    $(chartElement).empty();
    
	am4core.useTheme(am4themes_animated);
	var chart = am4core.create(chartElement, am4charts.XYChart);

	chart.maskBullets = false;

	var xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	var yAxis = chart.yAxes.push(new am4charts.CategoryAxis());

	xAxis.dataFields.category = "x";
	yAxis.dataFields.category = "y";

	xAxis.renderer.grid.template.disabled = true;
	xAxis.renderer.minGridDistance = 30;

	yAxis.renderer.grid.template.disabled = true;
	yAxis.renderer.inversed = false;
	yAxis.renderer.minGridDistance = 30;

	var series = chart.series.push(new am4charts.ColumnSeries());
	series.dataFields.categoryX = "x";
	series.dataFields.categoryY = "y";
	series.dataFields.value = "value";
	series.sequencedInterpolation = true;
	series.defaultState.transitionDuration = 0;

	// Set up column appearance
	var column = series.columns.template;
	column.strokeWidth = 2;
	column.strokeOpacity = 1;
	column.stroke = am4core.color("#ffffff");
	column.tooltipText = "{status}: {value.workingValue.formatNumber('#.')}";
	column.width = am4core.percent(100);
	column.height = am4core.percent(100);
	column.column.cornerRadius(6, 6, 6, 6);
	column.propertyFields.fill = "color";

	// Set up bullet appearance


	var bullet2 = series.bullets.push(new am4charts.LabelBullet());
	bullet2.label.text = "{id}";
	bullet2.label.fill = am4core.color("#fff");
	bullet2.zIndex = 1;
	bullet2.fontSize = 11;
	bullet2.interactionsEnabled = false;

	// define colors
	var colors = {
	    "critical": "#ca0101",
	    "bad": "#e17a2d",
	    "medium": "#e1d92d",
	    "good": "#5dbe24",
	    "verygood": "#0b7d03"
	};

	chart.data = [{
	    "y": "Insignificant",
	    "x": "Rare",
	    "color": colors.verygood,
	    "status": "Very Low",
	    "value": 1
	}, {
	    "y": "Minor",
	    "x": "Rare",
	    "color": colors.verygood,
	    "status": "Very Low",
	    "value": 2
	}, {
	    "y": "Moderate",
	    "x": "Rare",
	    "color": colors.good,
	    "status": "Low",
	    "value": 3
	}, {
	    "y": "Major",
	    "x": "Rare",
	    "color": colors.good,
	    "status": "Low",
	    "value": 4
	}, {
	    "y": "Catastrophic",
	    "x": "Rare",
	    "color": colors.medium,
	    "status": "Tolerable",
	    "value": 5
	},

	{
	    "y": "Insignificant",
	    "x": "Unlikely",
	    "color": colors.verygood,
	    "status": "Very Low",
	    "value": 2
	}, {
	    "y": "Minor",
	    "x": "Unlikely",
	    "color": colors.good,
	    "status": "Low",
	    "value": 4
	}, {
	    "y": "Moderate",
	    "x": "Unlikely",
	    "color": colors.good,
	    "status": "Low",
	    "value": 6
	}, {
	    "y": "Major",
	    "x": "Unlikely",
	    "color": colors.medium,
	    "status": "Tolerable",
	    "value": 8
	}, {
	    "y": "Catastrophic",
	    "x": "Unlikely",
	    "color": colors.bad,
	    "status": "High",
	    "value": 10
	},{
	    "y": "Insignificant",
	    "x": "Possible",
	    "color": colors.good,
	    "status": "Low",
	    "value": 3
	}, {
	    "y": "Minor",
	    "x": "Possible",
	    "color": colors.medium,
	    "status": "Tolerable",
	    "value": 6
	}, {
	    "y": "Moderate",
	    "x": "Possible",
	    "color": colors.medium,
	    "status": "Tolerable",
	    "value": 9
	}, {
	    "y": "Major",
	    "x": "Possible",
	    "color": colors.bad,
	    "status": "High",
	    "value": 12
	}, {
	    "y": "Catastrophic",
	    "x": "Possible",
	    "color": colors.critical,
	    "status": "Very High",
	    "value": 15
	},{
	    "y": "Insignificant",
	    "x": "Likely",
	    "color": colors.medium,
	    "status": "Tolerable",
	    "value": 4
	}, {
	    "y": "Minor",
	    "x": "Likely",
	    "color": colors.medium,
	    "status": "Tolerable",
	    "value": 8
	}, {
	    "y": "Moderate",
	    "x": "Likely",
	    "color": colors.bad,
	    "status": "High",
	    "value": 12
	}, {
	    "y": "Major",
	    "x": "Likely",
	    "color": colors.critical,
	    "status": "Very High",
	    "value": 16
	}, {
	    "y": "Catastrophic",
	    "x": "Likely",
	    "color": colors.critical,
	    "status": "Very High",
	    "value": 20
	},{
	    "y": "Insignificant",
	    "x": "Almost Certain",
	    "color": colors.medium,
	    "status": "Tolerable",
	    "value": 5
	}, {
	    "y": "Minor",
	    "x": "Almost Certain",
	    "color": colors.bad,
	    "status": "High",
	    "value": 10
	}, {
	    "y": "Moderate",
	    "x": "Almost Certain",
	    "color": colors.bad,
	    "status": "High",
	    "value": 15
	}, {
	    "y": "Major",
	    "x": "Almost Certain",
	    "color": colors.critical,
	    "status": "Very High",
	    "value": 20
	}, {
	    "y": "Catastrophic",
	    "x": "Almost Certain",
	    "color": colors.critical,
	    "status": "Very High",
	    "value": 25
	}
	];
	
	chart.data.forEach((element,index) => {
		risksumchartDataList.forEach((data,index) => {
			if(element["y"] == data.impact && element["x"] == data.likeliHood)
			{
				if("id" in element)
					{
					element["id"] = element["id"] + ", " + data.id 
					}
				else
					{
					element["id"] = data.id
					}
				 
			}
		})

	});
	
	$("title:contains('Chart created')").parent().hide()
}

function risksumchartviewdetails(){
  	drawrisksumChart("risksumchart_modal","viewriskchart");
  	$('.risk_chart_view_popup').modal('toggle');
}

function generateData1(count,name, yrange) {
    var i = 0;
    var series = [];
    var data	=	["Insignificant","Minor","Moderate","Major","Catastrophic"];
    while (i < count) {
      var x = data[i].toString();
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


$(document).on("click",".risksumcountclick",function(){
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
			empId:currentEmp
	}
	
	$.ajax({
		url:'/stratroom/riskCommentLike',
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