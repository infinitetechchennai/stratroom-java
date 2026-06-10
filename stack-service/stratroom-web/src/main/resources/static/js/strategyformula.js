var currentEmp		=	$("#userPrincipal").val();
var nodeKeyMap = new Object();
var formulationupdateDescription	=	[];
var formulationstrageylist	=	[];
var perspectiveupdateDescription	=	[];
var objectiveupdateDescription		=	[];
var kpiupdateDescription	=	[];
var customsettingsresponse	=	{};	
var createpermission	=	false;
var editpermission		=	false;
var deletepermission	=	false;
var viewpermission		=	false;

var perspectiveeditpermission	=	false;
var perspectiveviewpermission	=	false;

var objectivecreatepermission	=	false;
var	objectiveeditpermission	=	false;
var	objectiveviewpermission	=	false;
var	objectivedeletepermission	=	false;

var kpicreatepermission	=	false;
var	kpieditpermission	=	false;
var	kpiviewpermission	=	false;
var	kpideletepermission	=	false;

var reporteelist = [];
var completereporteeList	=	[];
var topparentswotDetails	=	{};
var deptlist	=	{};
let urlparams = (new URL(document.location)).searchParams;
let pageNo 		= 	urlparams.get("pageId");
var strategyformodPermission	=	[];

if($("#userrolename").val()	==	"Super User" || $("#userrolename").val()	==	"Admin"){
	if($("#userPrincipal").val()	!= $("#userPrincipalnavigate").val()){
		//$(".subusermenuname").text('Risk Management');
		if($(".topmenubreadcrumb").length){
			$(".topmenubreadcrumb").show();
		}
		if($(".sidebarNavigate").length){
			$(".sidebarNavigate").show();
		}
	}
}

function getpageName() {	
	$.ajax({
		url : "/stratroom/pages/" + pageNo,
		async:false,
		success : function(data) {
			if($("#userPrincipal").val()	!= $("#userPrincipalnavigate").val()){
				$("."+data.id).addClass("homepageHighlight");
				
			}
			if($(".superusertopmenu").hasClass(data.id)){
				$(".subusermenuname").text(data.pageName);
			}
			$(".page-title").html(data.pageName);
		}
	}); 
}

function getstrategypermission(){
	$.ajax({
		type : "GET",
		url : "/stratroom/user/modulePermissions?moduleName=Strategy Formulation",
		async:false,
		success : function(data) {
			$.each(data,function(forindex,fordata){
				if(forindex	==	"Strategy Formulation"){
					strategyformodPermission	=	fordata.Formulation;
					
					if(fordata.Perspective.privilegeUpdate !=	undefined && fordata.Perspective.privilegeUpdate == "TRUE"){
						perspectiveeditpermission	=	true;
					}
					if(fordata.Perspective.privilegeView !=	undefined && fordata.Perspective.privilegeView == "TRUE"){
						perspectiveviewpermission	=	true;
					}
					//objective
					if(fordata.Objective.privilegeCreate !=	undefined && fordata.Objective.privilegeCreate == "TRUE"){	
						objectivecreatepermission	=	true;
					}
					if(fordata.Objective.privilegeUpdate !=	undefined && fordata.Objective.privilegeUpdate == "TRUE"){
						objectiveeditpermission	=	true;
					}
					if(fordata.Objective.privilegeView !=	undefined && fordata.Objective.privilegeView == "TRUE"){
						objectiveviewpermission	=	true;
					}
					if(fordata.Objective.privilegeDelete !=	undefined && fordata.Objective.privilegeDelete == "TRUE"){
						objectivedeletepermission	=	true;
					}					
					//kpi
					if(fordata.KPI.privilegeCreate !=	undefined && fordata.KPI.privilegeCreate == "TRUE"){	
						kpicreatepermission	=	true;
					}
					if(fordata.KPI.privilegeUpdate !=	undefined && fordata.KPI.privilegeUpdate == "TRUE"){
						kpieditpermission	=	true;
					}
					if(fordata.KPI.privilegeView !=	undefined && fordata.KPI.privilegeView == "TRUE"){
						kpiviewpermission	=	true;
					}
					if(fordata.KPI.privilegeDelete !=	undefined && fordata.KPI.privilegeDelete == "TRUE"){
						kpideletepermission	=	true;
					}
				}
			});
		}
	});
}

$(function () {
	getpageName();
	getstrategypermission();
	getreportee();
	getdeptlist();
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
	
	if(strategyformodPermission.privilegeCreate !=	undefined && strategyformodPermission.privilegeCreate == "TRUE"){	
		createpermission	=	true;
	}
	
	if(strategyformodPermission.privilegeUpdate !=	undefined && strategyformodPermission.privilegeUpdate == "TRUE"){
		editpermission	=	true;
	}
	
	if(strategyformodPermission.privilegeDelete !=	undefined && strategyformodPermission.privilegeDelete == "TRUE"){
		deletepermission	=	true;
	}
	
	if(strategyformodPermission.privilegeView !=	undefined && strategyformodPermission.privilegeView == "TRUE"){
		viewpermission	=	true;
	}
	
	if(editpermission == false){
		$("#edit_strategy").hide();
    }
	if(objectiveeditpermission){
  	  $("#edit_objective").show();
	}
	if(kpieditpermission){
		  $("#edit_kpi").show();
	}
	if(enableaccesscontrolMenu	==	true){
		//createpermission	=	true;
		//editpermission		=	true;
		//deletepermission	=	true;
		//viewpermission		=	true;
	}
	
	
	if(createpermission	==	false){
		$(".addformulation").remove();
	}
	if(deletepermission	==	false){
		$(".deleteformulation").remove();
	}
	
	if(objectivecreatepermission	==	false){
		$(".addobjectiveBtn").remove();
	}
	if(objectivedeletepermission	==	false){
		$(".deleteobjectiveBtn").remove();
	}
	
	if(kpicreatepermission	==	false){
		$(".kpiaddBtn").remove();
	}
	if(kpideletepermission	==	false){
		$(".deletekpiBtn").remove();
	}
	
	if(perspectiveeditpermission){
  	  $("#edit_perspective").show();
	}
	
	if(viewpermission	==	false){
		$("#initiate_sidebar").remove();
		$(".obj-kpi").remove();
	}
	
	var	pageUrl = "/stratroom/strategyFormulationList";;
	if(pageNo != undefined){
		pageUrl = "/stratroom/strategyFormulationList?pageId=" + pageNo;
	}
	$.ajax({
		url : pageUrl,
		async: false,
		success : formulationSuccessCallback,
	});
	
	$('[data-toggle="tooltip"]').tooltip();

});

function getreportee() {
	
	if (jQuery.isEmptyObject(reporteelist)) {
		$.ajax({
			url : "/stratroom/user/moduleAccessUserList?moduleName=Strategy Formulation",
			async:false,
			success : function(employeeList) {
				reporteelist = employeeList;
				completereporteeList	=	employeeList;	
			}
		});
	} 
}

function getdeptlist() {	
	if (jQuery.isEmptyObject(deptlist)) {
		$.ajax({
			url : "/stratroom/allDepartmentList",
			async:false,
			success : function(employeeList) {
				deptlist 	=	employeeList;
			}
		});
	}
}

function resetStorage(){
	localStorage.setItem("scorecard_pagenumber","");
	localStorage.setItem("objective_pagenumber","");
	localStorage.setItem("kpilist_pagenumber","");
}

function formulationSuccessCallback(data) {
	console.log(data, "sidebardata");
	
	formulationstrageylist	=	data;	
	var initiativetemplate = $('#formulation-template').html();
	var initiative_load_id = "";
	var template = Handlebars.compile(initiativetemplate);
		
	if(viewpermission	==	true){
		var checkloadedIsavailableornot	=	false;
		var getinitiativePagenumber = localStorage.getItem("formulation_pagenumber");
		if (getinitiativePagenumber != undefined && getinitiativePagenumber != '' && getinitiativePagenumber != null) {
			initiative_load_id = getinitiativePagenumber;
		}
		if(data.some(person => person.id == initiative_load_id)){
			checkloadedIsavailableornot	=	true;
		}else{
			resetStorage();
		}
		
		$.each(data, function (index, initiative) {
			
			var bodyRows = '';
			if (index == 0) {
				initiative_load_id 	= 	(checkloadedIsavailableornot	==	true?initiative_load_id:initiative.id);
				localStorage.setItem("formulation_pagenumber", initiative_load_id);
				parentriskID = initiative.id;	
				$.ajax({
					url: "/stratroom/strategyFormulation/" + initiative_load_id,
					async:false,
					success: function (data) {
						formulationupdateDescription	=	data;
						formulationdescSuccessCallback(data, initiative_load_id);
					}
				});
			}
	
			
			var duedate 	= 	initiative.approvedDate;
	
			var initiativeProgressBar = "";
			
			$.each(reporteelist,function(ownkey,empvalue){
				if(empvalue.id	==	initiative.createdBy){
					topparentswotDetails	=	{"id":empvalue.id,"name":empvalue.name,"image":empvalue.image,"dept":empvalue.dept};
				}
			});
			var riskimage	=	topparentswotDetails.image;
			var formulationDept	=	(initiative.formulationDept !=	undefined?initiative.formulationDept:"");
			var username 	=	hasWhiteSpaceName(topparentswotDetails.name);
			username		=	(username	==	"" || username == undefined?"us":username);
			if(riskimage	==	"" || riskimage	==	" " || riskimage	==	undefined){
				var Owner 	= 	"data-name='" + username + "' class='rounded-circle riskuser'";	
			}else{
				var Owner 	= 	" class='rounded-circle' src='" + riskimage + "' ";
			}
			
			var name 		= 	initiative.formulationName;
			var full_name 	= 	name;
			if (typeof (full_name) == "string" && full_name.length >= 50) {
				name = name.substring(0, 50) + '...';
			}
			
			var dept_name 	= 	"";
			
			if(deptlist !=	"" && formulationDept !=	""){
				var formulationDept	=	formulationDept.split(',');
				$.each(formulationDept, function(index1, module1) {
					$.each(deptlist,function(index,deptindex){
						if(deptindex.id	==	module1){
							dept_name	+=	deptindex.name+',';
							return false;
						}
					});
				});
			}

			if(formulationDept!= "" && formulationDept.lastIndexOf(',')){
				formulationDept = dept_name.substring(0, (dept_name.length-1));
			}
			
			if (typeof (dept_name) == "string" && dept_name.length >= 50) {
				formulationDept = dept_name.substring(0, 50) + '...';
			}
			
			var finalHtml = {
				intiative_content: name,
				Owner: Owner,
				id: initiative.id,
				formulationDept:formulationDept,
				dueDate: duedate,
				initiativeSidebarHighLight: (initiative_load_id == initiative.id ? "formulaSidebarHighLight" : "")
			};
			
			$('#initiate_sidebar').append(template(finalHtml));
		});
		$('.riskuser').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
	}
}

function subinitiatiesPorfileFormation(usersimg, defaultreporteelist, type) {
	
	var dataname	=	(type	==	"strageyformulation"?"approvedimage":"initiativeviewuserimage");
	var subinitiativeUser = "";
	var profileBadgeIncrement = (usersimg !=	undefined && usersimg !=	"" && usersimg.length >= 3 ? parseInt(usersimg.length) - parseInt(2) : 0);
	if (usersimg != undefined && usersimg != "" && usersimg.length != 0) {
		$.each(usersimg, function (index, users) {
			var username = users.name;//hasWhiteSpaceName(users.name, users.name);
			if (username == "" || username == " ") {
				username = "User";
			}
			console.log("Type :: " + type + " :: usersimg :: "   +username)

			var userProfileConcate = ((users.image == undefined || users.image == "") ? "data-name='" + username + "' class='rounded-circle "+dataname+" '" : " class='rounded-circle' src='" + users.image + "'");
			if (usersimg.length == 1) {
				subinitiativeUser += '<li class="avatar avatar-sm selecteduser"><img ' + userProfileConcate + ' alt="' + username + '" width="50"></li>';
				return false;
			}
			subinitiativeUser += '<li class="avatar avatar-sm selecteduser"><img ' + userProfileConcate + ' alt="' + username + '" width="50"></li>';
			if (usersimg.length == 2 && index > 0) {
				subinitiativeUser = subinitiativeUser.replace('<li class="avatar avatar-sm selecteduser"><img ' + userProfileConcate + ' alt="' + username + '" width="50"></li>', '');
				subinitiativeUser += '<li class="avatar avatar-sm selecteduser"><img ' + userProfileConcate + ' alt="' + username + '" width="50"></li>';
				return false;
			}
			if (usersimg.length >= 3 && index >= 2) {
				subinitiativeUser = subinitiativeUser.replace('<li class="avatar avatar-sm selecteduser"><img ' + userProfileConcate + ' alt="' + username + '" width="50"></li>', '');
				subinitiativeUser += '<li class="avatar avatar-sm selecteduser"><span _ngcontent-hhc-c5="" class="badge squareimageset" style="height:30px;line-height:30px;width:30px;">+' + profileBadgeIncrement + '</span></li>';
				return false;
			}
		});
	} else {
		var users = topparentswotDetails;
		var username = ((users.name == undefined || users.name == "") ? $("#firstName").val() : users.name);
		var userProfileConcate = ((users.image == undefined || users.image == "") ? "data-name='" + username + "' class='rounded-circle "+dataname+" '" : " class='rounded-circle' src='" + users.image + "'");
		subinitiativeUser = '<li class="avatar avatar-sm selecteduser"><img ' + userProfileConcate + ' alt="' + username + '" width="50"></li>';
	}

	console.log(subinitiativeUser)
	return subinitiativeUser;
}


function formulationdescSuccessCallback(result, initiative_load_id){
	var initiativedettemplate 	= 	$('#formulationdetail-template').html();
	var template 				= 	Handlebars.compile(initiativedettemplate);
	var Owner			=	{};
	var subOwner		=	{};
	var approvedDate	=	result.approvedDate;
	if(approvedDate !=	undefined && approvedDate !=	""){
		approvedDate	=	dateFormatedtohumanread(approvedDate);	
	}
	$(".approveiconreset").show();
	$("#search2").css("margin-right","-12px");
	$("#search_section2").css("margin-right","-5px");
	$("#search_section2 .searchiconobj").css("margin-left","1px");
	$("#close_search2").css("margin-right","-23px");
	$("#search3").css("margin-right","-12px");
	$(".searchiconkpi").css("margin-left","-3px");
	$("#close_search3").css("margin-right","-20px");
	$("#search_section3").css("margin-left","-53px");
	$("#search_section3").css("margin-right","0px");
	if(formulationupdateDescription !=	"" && formulationupdateDescription.status	==	"Approved"){
		$(".approveiconreset").hide();
		$("#search2").css("margin-right","12px");
		$("#search_section2").css("margin-right","12px");
		$(".searchiconobj").css("margin-left","-17px");
		$("#close_search2").css("margin-right","0px");
		$("#search3").css("margin-right","12px");
		$("#search_section3").css("margin-right","12px");
		$(".searchiconkpi").css("margin-left","-17px");
		$("#close_search3").css("margin-right","0px");
	}
	
	var startDate	=	result.startDate;
	if(startDate !=	undefined && startDate !=	""){
		startDate	=	dateFormatedtohumanread(startDate);	
	}
	
	var endDate		=	result.endDate;
	if(endDate !=	undefined && endDate !=	""){
		endDate	=	dateFormatedtohumanread(endDate);	
	}
	
	var resultPorfileContent = subinitiatiesPorfileFormation(result.employeeList, topparentswotDetails, 'strageyformulation');
	
	var approvedBy	=	(result.approvedBy ==	undefined || result.approvedBy== ""?currentEmp:result.approvedBy);
	var approveduser	=	{};
	$.each(reporteelist,function(ownkey,empvalue){
		if(empvalue.id	==	approvedBy){
			approveduser	=	{"id":empvalue.id,"name":empvalue.name,"image":empvalue.image,"dept":empvalue.dept};
		}
	});
	
	var users 	=	approveduser;
	var username 	=	((users.name ==	undefined || users.name == "")?$("#firstName").val():users.name);
	var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle approvedimage' ":" class='rounded-circle' src='"+users.image+"'");
	var approvedUserlogo 	=	'<li class="avatar avatar-sm"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
	var deleteicon	=	"";
	if(deletepermission	==	true){
		deleteicon	=	`<span class="pull-right"><i class="fas fa-trash border-box" data-toggle="tooltip"
                      data-placement="bottom"
                      title="Delete Formulation" onclick="openStrategyAdd(`+result.id+`,'delete')" style="padding: 5px"></i></span>`;	
	}
	
	var	formulationDept	=	result.formulationDept; 
	var dept_name 	= 	"";
	if(deptlist !=	"" && formulationDept !=	""){
		var formulationDept	=	formulationDept.split(',');
		$.each(formulationDept, function(index1, module1) {
			$.each(deptlist,function(index,deptindex){
				if(deptindex.id	==	module1){
					dept_name	+=	deptindex.name+',';
					return false;
				}
			});
		});
	}

	if(formulationDept!= "" && formulationDept.lastIndexOf(',')){
		formulationDept = dept_name.substring(0, (dept_name.length-1));
	}
	
	if (typeof (dept_name) == "string" && dept_name.length >= 20) {
		formulationDept = dept_name.substring(0, 20) + '...';
	}
	
	
	var initdetail = 	{
			title: result.formulationName,
			Owner: Owner,
			subOwner: subOwner,
			id: result.id,
			planType:result.planType,
			dept:formulationDept,
			startDate:startDate,
			endDate:endDate,
			approvedDate: approvedDate,
			resultPorfileContent:resultPorfileContent,
			approvedUserlogo:approvedUserlogo,
			deleteicon:deleteicon
		};

		$('.strategy-formula').html(template(initdetail));
		$('.approvedimage').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
		$('[data-toggle="tooltip"]').tooltip();
		//perspective
		perspectiveTemplateload(result)
		//objective
       	objectiveTemplateload(result);
       	//kpi
       	kpiTemplateload(result);
	}

	function perspectiveTemplateload(result){
		var bodyRows =	"";
		var scorecardpageid	=	"";	
		var checkscorecardIsavailableornot	=	false;
		var getinitiativePagenumber = 	localStorage.getItem("scorecard_pagenumber");
		if (getinitiativePagenumber != undefined && getinitiativePagenumber != '' && getinitiativePagenumber != null) {
			scorecardpageid = getinitiativePagenumber;
		}
		if(result.scoreCardList.some(person => person.id == scorecardpageid)){
			checkscorecardIsavailableornot	=	true;
		}else{
			localStorage.setItem("objective_pagenumber","");
			localStorage.setItem("kpilist_pagenumber","");
		}
		
		$.each(result.scoreCardList, function (i, List) {
			var initiative_load_id		=	List.id;
			var highlight	=	"";
			var perspectivechecked	=	"";
			if(checkscorecardIsavailableornot	==	true){
				highlight	=	(List.id	==	scorecardpageid?"scorecardHighLight":"");
				perspectivechecked	=	(List.id	==	scorecardpageid?"checked":"");
			}else{
				highlight	=	(i	==	0?"scorecardHighLight":"");
				if(i	==	0){
					perspectivechecked	=	"checked";
					localStorage.setItem("scorecard_pagenumber",List.id);
				}
			}
			
	   		var swotchildtemplate 	= 	$('#perspectivechild-template').html();
			var subInitdetail = Mustache.render(swotchildtemplate,
				{
					id:List.id,
					parentid:result.id,
					highlight:highlight,
					perspectivechecked:perspectivechecked,
					name : List.scoreCardValue.name
				});
			
			bodyRows = bodyRows + subInitdetail;
	 	});
	 	
	 	var swoteParenttemplate = 	$('#perspective-template-parent').html();
		var htmlValue 			= 	Mustache.render(swoteParenttemplate, {
			bodyRows : bodyRows
		});
		if(perspectiveviewpermission){
			$("#persp-colored-div").html(htmlValue);
		}
	}
	
	function objectiveTemplateload(result){
		$("#object-colored-div").empty();
		var bodyRows =	"";
		var getinitiativePagenumber = 	localStorage.getItem("scorecard_pagenumber");
		
		$.each(result.scoreCardList,function(scorecardindex,scorecarddata){			
			if(getinitiativePagenumber	!=	undefined && getinitiativePagenumber !=	"" && scorecarddata.id	==	getinitiativePagenumber){	
				
				var objectivepageid	=	"";	
				var checkobjectiveIsavailableornot	=	false;
				var getobjectivePagenumber = 	localStorage.getItem("objective_pagenumber");
				if (getobjectivePagenumber != undefined && getobjectivePagenumber != '' && getobjectivePagenumber != null) {
					objectivepageid = getobjectivePagenumber;
				}
				
				if(scorecarddata.objectiveList.some(person => person.id == objectivepageid)){
					checkobjectiveIsavailableornot	=	true;
				}else{
					localStorage.setItem("kpilist_pagenumber","");
				}	
		
				$.each(scorecarddata.objectiveList, function (i, List) {
					
					var highlight	=	"";
					var objectivechecked	=	"";
					if(checkobjectiveIsavailableornot	==	true){
						highlight	=	(List.id	==	objectivepageid?"scorecardHighLight":"");
						objectivechecked	=	(List.id	==	objectivepageid?"checked":"");
					}else{
						highlight	=	(i	==	0?"scorecardHighLight":"");
						if(i	==	0){
							objectivechecked	=	"checked";
							localStorage.setItem("objective_pagenumber",List.id);
						}
					}
					
			   		var swotchildtemplate 	= 	$('#objective-template').html();
					var subInitdetail = Mustache.render(swotchildtemplate,
						{
							id:List.id,
							parentid:result.id,
							name : List.objectivesValue.name,
							highlight:highlight,
							objectivechecked:objectivechecked
						});
					
					bodyRows = bodyRows + subInitdetail;
			 	});
			 }	
	 	});
	 	
	 	var swoteParenttemplate = 	$('#objective-template-parent').html();
		var htmlValue 			= 	Mustache.render(swoteParenttemplate, {
			bodyRows : bodyRows
		});
		if(objectiveviewpermission){
			$("#object-colored-div").html(htmlValue);
		}
	}
	
	function kpiTemplateload(result){
		var bodyRows =	"";			
		var scorecardPagenumber = 	localStorage.getItem("scorecard_pagenumber");
		var objectivePagenumber = 	localStorage.getItem("objective_pagenumber");
		objectivePagenumber	=	(objectivePagenumber !=	undefined && objectivePagenumber !=	""?objectivePagenumber:0);
		$.each(result.scoreCardList,function(scorecardindex,scorecarddata){
			if(scorecardPagenumber	!=	undefined && scorecardPagenumber !=	"" && scorecarddata.id	==	scorecardPagenumber){		
				$.each(scorecarddata.objectiveList, function (i, List) {
					if(objectivePagenumber	!=	undefined && objectivePagenumber !=	"" && List.id	==	objectivePagenumber){
						
						var kpipageid	=	"";	
						var checkkpiIsavailableornot	=	false;
						var getkpiPagenumber = 	localStorage.getItem("kpilist_pagenumber");
						if (getkpiPagenumber != undefined && getkpiPagenumber != '' && getkpiPagenumber != null) {
							kpipageid = getkpiPagenumber;
						}
						
						if(List.kpiList.some(person => person.id == kpipageid)){
							checkkpiIsavailableornot	=	true;
						}
						
						$.each(List.kpiList, function (kpi, kpiList) {
				   			
				   			$.each(reporteelist,function(ownkey,empvalue){
								if(empvalue.id	==	kpiList.owner){
									topparentswotDetails	=	{"id":empvalue.id,"name":empvalue.name,"image":empvalue.image,"dept":empvalue.dept};
								}
							});
							var image	=	topparentswotDetails.image;
							var username 	=	hasWhiteSpaceName(topparentswotDetails.name);
							image		=	(image	==	"" || image	==	undefined?"":image);
							username	=	(username	==	""?"us":username);
							if(image	==	"" || image	==	" "){
								var Owner 	= 	"data-name='" + username + "' class='rounded-circle kpiuser'";	
							}else{
								var Owner 	= 	" class='rounded-circle' src='" + image + "' ";
							}
							
							var highlight	=	"";
							var kpichecked	=	"";
							if(checkkpiIsavailableornot	==	true){
								highlight	=	(kpiList.id	==	kpipageid?"scorecardHighLight":"");
								kpichecked	=	(kpiList.id	==	kpipageid?"checked":"");
							}else{
								highlight	=	(kpi	==	0?"scorecardHighLight":"");
								if(kpi	==	0){
									kpichecked	=	"checked";	
									localStorage.setItem("kpilist_pagenumber",kpiList.id);
								}
							}
							
				   			var swotchildtemplate 	= 	$('#kpi-template').html();
							var subInitdetail = Mustache.render(swotchildtemplate,
								{
									id:kpiList.id,
									parentid:result.id,
									name : kpiList.kpiValue.name,
									kpi_measurement:kpiList.kpiValue.kpi_measurement,
									target:kpiList.kpiValue.target,
									highlight:highlight,
									kpichecked:kpichecked,
									Owner:Owner
								});
								bodyRows = bodyRows + subInitdetail;
						});
					}	
				 });
			}	 	
	 	});
	 	
	 	var swoteParenttemplate = 	$('#kpi-template-parent').html();
		var htmlValue 			= 	Mustache.render(swoteParenttemplate, {
			bodyRows : bodyRows
		});
		
		if(kpiviewpermission){
			$("#kpi-colored-div").html(htmlValue);
			$('.kpiuser').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
		}
	}

$(document).keyup(function (e) {
        if (e.key === "Escape") {
          $(".sidebar-strategy").hide();
          if(perspectiveeditpermission){
        	  $("#edit_perspective").show();
    	  }
          
          $("#save_perspective").hide();
          //$("#strategy_add").hide();
          $(".persp_name").prop("disabled", true);
          $(".persp_date").prop("disabled", true);
          $(".persp_weight").prop("disabled", true);
          $(".persp_subweight").prop("disabled", true);
          $(".persp_status").prop("disabled", true);
          if(objectiveeditpermission){
        	  $("#edit_objective").show();
    	  }
          
          $("#save_objective").hide();
          $(".obj_name").prop("disabled", true);
          $(".obj_date").prop("disabled", true);
          $(".obj_imp").prop("disabled", true);
          $(".obj_imp").prop("disabled", true);
          $(".obj_weight").prop("disabled", true);
          $(".obj_subweight").prop("disabled", true);
          $(".obj_status").prop("disabled", true);
          if(kpieditpermission){
    		  $("#edit_kpi").show();
    	  }
          $("#save_kpi").hide();
          $(".kpi_name").prop("disabled", true);
          $(".kpi_polarity").prop("disabled", true);
          $(".kpi_mf").prop("disabled", true);
          $(".kpi_data").prop("disabled", true);
          $(".kpi_type").prop("disabled", true);
          $(".kpi_currency").prop("disabled", true);
          $(".kpi_threshold").prop("disabled", true);
          $(".kpi_actual").prop("disabled", true);
          $(".kpi_target").prop("disabled", true);
          $(".kpi_ytd").prop("disabled", true);
          $(".kpi_date").prop("disabled", true);
          $(".kpi_weight").prop("disabled", true);
          $(".kpi_subweight").prop("disabled", true);
          $(".kpi_status").prop("disabled", true);
        }
      });

function addOption(id, text, value) {
	$(id).append(`<option value="${value}">${text}</option>`);
}


$(document).on('show.bs.modal', '.modal', function (event) {
    var zIndex = 1040 + (10 * $('.modal:visible').length);
    $(this).css('z-index', zIndex);
    setTimeout(function() {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
});

 
  function openPerspective() {
        $(".sidebar-strategy").hide();
        $("#perspective_view").show();
      }

      function closePerspective() {
        $("#perspective_add").hide();
        if(perspectiveeditpermission){
      	  $("#edit_perspective").show();
  	  }
        $(".perspectivesave").hide();
        $(".persp_name").prop("disabled", true);
        $(".persp_date").prop("disabled", true);
        $(".persp_weight").prop("disabled", true);
        $(".persp_subweight").prop("disabled", true);
        $(".persp_status").prop("disabled", true);
      }

      function openObjective() {
        $(".sidebar-strategy").hide();
        $("#objective_view").show();
      }

      function closeObjective() {
        $("#objective_add").hide();
        if(objectiveeditpermission){
      	  $("#edit_objective").show();
  	  }
        $(".objectivesave").hide();
      }

      function openKPI() {
        $(".sidebar-strategy").hide();
        $("#kpi_view").show();
      }

      function closeKPI() {
        $("#kpi_view").hide();

        if(kpieditpermission){
  		  $("#edit_kpi").show();
  	  }
        $("#save_kpi").hide();
        $(".kpi_name").prop("disabled", true);
        $(".kpi_polarity").prop("disabled", true);
        $(".kpi_mf").prop("disabled", true);
        $(".kpi_data").prop("disabled", true);
        $(".kpi_type").prop("disabled", true);
        $(".kpi_currency").prop("disabled", true);
        $(".kpi_threshold").prop("disabled", true);
        $(".kpi_actual").prop("disabled", true);
        $(".kpi_target").prop("disabled", true);
        $(".kpi_ytd").prop("disabled", true);
        $(".kpi_date").prop("disabled", true);
        $(".kpi_weight").prop("disabled", true);
        $(".kpi_subweight").prop("disabled", true);
        $(".kpi_status").prop("disabled", true);
      }
		
		function populateImportList(elementId,removeId) {
			$(elementId).empty();
			$(elementId).append('<option value="" data-i18n="Choose">Choose</option>');
			var numberOfOptions = $(elementId + ' > option').length;
			if (jQuery.isEmptyObject(formulationstrageylist)) {
				$.ajax({
					url : "/stratroom/strategyFormulationList",
					async:false,
					success : function(kpiListValue) {
						formulationstrageylist 	= 	kpiListValue;
						$.each(formulationstrageylist, function(index, kpiObj) {
							if(removeId	!=	kpiObj.id){
								addOption(elementId, kpiObj.formulationName, kpiObj.id)
							}
						});
					}
				});
			} else if (numberOfOptions < 2) {
				$.each(formulationstrageylist, function(index, kpiObj) {
					if(removeId	!=	kpiObj.id){
						addOption(elementId, kpiObj.formulationName, kpiObj.id)
					}
				});
			}
		}
		
		function formvalidationerrorreset(){
			$('*[id*=-error]').each(function() {
			    $(this).remove();
			});
		}

      	function openStrategyAdd(id,action) {
      		formvalidationerrorreset();
	    	$(".sidebar-strategy").hide();
	    	$("#searchactivities").val('');
			$("#stragey_formulation_Form").trigger('reset');
			$("#stragey_formulation_Form input[name='action']").val(action);
			$("#stragey_formulation_Form #formulationteamid").val('');
			$("#stragey_formulation_Form #approvedbyemployee").val(currentEmp);
			$("#pespectivesearch").val('');
			$("#objectivesearch").val('');
			$("#kpisearch").val('');
			$("#search1").show();
	        $("#search_section1").hide();
			$("#search2").show();
	        $("#search_section2").hide();
	        $("#search3").show();
	        $("#search_section3").hide();
			$.each(reporteelist,function(ownkey,empvalue){
				if(empvalue.id	==	currentEmp){
					topparentswotDetails	=	{"id":empvalue.id,"name":empvalue.name,"image":empvalue.image,"dept":empvalue.dept};
				}
			});
			
			populateImportList('#importFormulation',id);
			
	        if (action == 'add') {
				// when adding
				$('#stragey_formulation_Form textarea').removeAttr("disabled");
				$('#stragey_formulation_Form input[type="text"]').removeAttr("disabled");
				$('#stragey_formulation_Form input[type="checkbox"]').removeAttr("disabled");
				$('#stragey_formulation_Form select').removeAttr("disabled");
				$("#strategy_add").show();
				$("#formulationsave").show();
				$("#approve_str,#reset_str").hide();
				$(".formulationheader").html('Add Formulation Details <span class="pull-right" onclick="closeStrategyAdd()" style="font-size: 15px; cursor: pointer"><i class="fas fa-times border-box"></i></span>');
				populateDeptList('#formulationDept');
				$("#formulationDept").select2();
				$("#formulationDept").val('');
				$(".approvedbyemployee").hide();
				var resultPorfileContent	=	subinitiativePorfileContent([],0,'new');
				$("#formulationteamid").val(resultPorfileContent['userownerlist_data']);
				$("#formulationTeam").html(resultPorfileContent['userownerlist']);
				$('.swotuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
			}else if (action == 'delete') {
			
				$("#deletescoreid").val(id);
				$("#deleterecordtype").val("formularregister");
				$('#deleteModalscorecard').modal('toggle');
				$(window).on("resize", function(){
				    $(".modal:visible").each(alignModal);
				}); 
				$(".modal").on("shown.bs.modal", alignModal);
				
			} else { // view and edit
				$("#strategy_add").show();
				$("#approve_str").css("display","block");
				$("#formulationsave,#reset_str").hide();
				$(".approvedbyemployee").show();
				$('#stragey_formulation_Form textarea').attr("disabled",true);
				$('#stragey_formulation_Form input[type="text"]').attr("disabled",true);
				$('#stragey_formulation_Form input[type="checkbox"]').attr("disabled",true);
				$('#stragey_formulation_Form select').attr("disabled",true);
				
				$(".formulationheader").html('Strategy Formulation Details <span class="pull-right" onclick="closeStrategyAdd()" style="font-size: 15px; cursor: pointer"><i class="fas fa-times border-box"></i></span>');
				if (action == 'edit') {
					$("#approve_str").hide();
					if(editpermission	==	true){
						$(".formulationheader").html('Strategy Formulation Details <span class="pull-right" onclick="closeStrategyAdd()" style="font-size: 15px; cursor: pointer"><i class="fas fa-times border-box"></i></span><span class="pull-right" id="edit_strategy" style="margin-right: 12px" ><i class="fas fa-pencil-alt border-box"></i></span>');
						$("#approve_str").show();
					}
					$("#stragey_formulation_Form input[name='id']").val(id);
					localStorage.setItem("formulation_pagenumber", id);
					$(".sub_initiative_sidebar_details").removeClass("formulaSidebarHighLight");
					$(".sidebarriskid_" + id).addClass("formulaSidebarHighLight");
					
					$.ajax({
						url: "/stratroom/strategyFormulation/" + id,
						async:false,
						success: function (data) {
							localStorage.setItem("scorecard_pagenumber","");
	            			localStorage.setItem("objective_pagenumber","");
							formulationupdateDescription	=	data;
							formulationEditSuccessCallback(data, id);
							formulationdescSuccessCallback(data, id);
						},error:function(){
							$(".strategy-formula").html('');
							$("#persp-colored-div").html('');
							$("#object-colored-div").html('');
							$("#kpi-colored-div").html('');
						}
					});
				}
			}
		
      }
	
	function formulationEditSuccessCallback(data,id){
		$("#stragey_formulation_Form input[name='id']").val(id);
		$("#formulationName").val(data.formulationName);
		$("#planType").val(data.planType);
		$("#importFormulation").val(data.importFormulation);
		if(data.startDate !=	"" && data.endDate !=	""){
			var startDate	=	data.startDate+' - '+data.endDate;
			$("#startDate").val(startDate);	
		}
		
		if(data.status	==	"Approved"){
			$(".formulationheader").html('Strategy Formulation Details <span class="pull-right" onclick="closeStrategyAdd()" style="font-size: 15px; cursor: pointer"><i class="fas fa-times border-box"></i></span>');
			$("#formulationsave,#approve_str,#reset_str").hide();
			if(editpermission	==	true){
				$("#reset_str").show();
			}
			$('#stragey_formulation_Form input[type="text"]').prop("disabled", true);
			$('#stragey_formulation_Form input[type="checkbox"]').prop("disabled", true);
			$('#stragey_formulation_Form select').prop("disabled", true);		
		}
		 
		if(data.approvedBy	==	0 || data.approvedBy	==	""){
			$("#stragey_formulation_Form #approvedbyemployee").val(currentEmp);	
		}else{
			$("#stragey_formulation_Form #approvedbyemployee").val(data.approvedBy);
		}
		var resultPorfileContent	=	subinitiativePorfileContent(data.employeeList,id,'edit','formulation');
		$("#formulationteamid").val(resultPorfileContent['userownerlist_data']);
		$("#formulationTeam").html(resultPorfileContent['userownerlist']);
		
		var resultPorfileContent	=	subinitiativePorfileContent([],id,'new','approvedby');
		$("#approvedbyemployee").val(resultPorfileContent['userownerlist_data']);
		$("#approvedemp").html(resultPorfileContent['userownerlist']);
		
		if($(".formulationheader #edit_strategy").is(":visible")	==	true){
			$("#formulationTeam li").removeAttr("data-toggle","modal");
			$("#approvedemp li").removeAttr("data-toggle","modal");
			$("#approvedemp li span").removeAttr("data-toggle","modal");
			$("#formulationTeam li span").removeAttr("data-toggle","modal");
		}
		
		if(data.status	==	"Approved"){
			$("#formulationTeam li").removeAttr("data-toggle","modal");
			$("#approvedemp li").removeAttr("data-toggle","modal");
			$("#approvedemp li span").removeAttr("data-toggle","modal");
			$("#formulationTeam li span").removeAttr("data-toggle","modal");		
		}
		
		populateDeptList('#formulationDept');
		
		var deptIds	=	[];
		if(data.formulationDept	!=	null && data.formulationDept	!=	undefined){
			var formulationDept	=	data.formulationDept.split(',');
			if(deptlist !=	"" && formulationDept !=	""){
				$.each(formulationDept, function(index1, module1) {
					$.each(deptlist,function(index,deptindex){
						if(deptindex.id	==	module1){
							deptIds.push(deptindex.id);
							return false;
						}
					});
				});
			}
			
			$("#formulationDept").val(deptIds);
		}
		$("#formulationDept").select2();
		$("#approvedDate").val(data.approvedDate);
		$('.swotuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
		$('#sub-ini-box_view')
		.slimscroll({
			height: '350px',
			size: '3px',
			color: '#9c9c9c'
		});
	}
	
	function handleMultioownersuserevent(id,action,method) {
		$("#searchactivities").val('');
		$("#activities_search2").show();
	    $("#activities_search_section2").hide();
		if(editpermission	==	false){
			return false;
		}
		if($(".formulationheader #edit_strategy").is(":visible")	==	true){
			return false;
		}
		var data 	=	{};
		if (action == 'edit') {
			$("#sub-ini-box_view_users").html('');
			$("#sub-ini-box_view_users").html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
			$(".getselectedActivitiesUsers").attr("data-formulationid",id);
			
			$.ajax({
				url : "/stratroom/user/moduleAccessUserList?moduleName=Strategy Formulation",
				async:false,
				success : function(result,status){
					var subinitiativeUser 	=	"";
					var ischecked 	=	"";
					var selectedItem 	=	[];
					if(method	==	"approved"){
						selectedItem	=	$("#approvedbyemployee").val().split(',');
						$(".getselectedActivitiesUsers").addClass("approvedemplist");
						$(".allusersdisable").hide();
					}else{	
						if($("#formulationteamid").length){
							selectedItem	=	$("#formulationteamid").val().split(',');
							$(".allusersdisable").show();
						}	
					}
					
					if(result.length	==	0){
	  					$(".showactivitiesusers").css('display','none');
	  				}
					
					if(result.length	==	selectedItem.length){
	  					$("#allusersactivities").prop("checked","checked");
	  				}else{
	  					$("#allusersactivities").prop("checked",false);
	  				}
					
					var datas 	=	[];
					$.each(result, function(index, users) {
						datas.push(users.id);
					});
					$.each(result, function(index, users) {
						var username 	=	((users.name ==	undefined || users.name == "")?$("#firstName").val():users.name);
						var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle swotmultiuserimage' ":" class='rounded-circle' src='"+users.image+"'");
						$.each(selectedItem,function(key,value){
							if(value	==	users.id){
								ischecked 	=	"checked";
								return false;
							}else{
								ischecked 	=	"";
							}
						});
						subinitiativeUser 	+=	'<div class="d-flex flex-row employe_content_border sub_initiative_details"><div class="d-flex flex-column flex-fill profile_content"><div class="d-flex flex-row"><div class="form-check"><label class="form-check-label"><input id="" class="form-check-input" name="activities_owner[]" '+ischecked+' type="checkbox" value="'+users.id+'"><span class="form-check-sign"> <span class="check"></span></span></label></div><div class="d-flex flex-column init_flex_profile" style="margin-top: 3%;text-align: center;"><h5>'+users.name+'</h5></div><div class="img_details" style="width: 20%;"><img alt="'+username+'" '+userProfileConcate+'></div></div></div></div>';
					});
					$("#sub-ini-box_view_users").html('');
					$("#sub-ini-box_view_users").html(subinitiativeUser);
					$('.swotmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
				}
			});
		}
		$('#sub-ini-box_view')
		.slimscroll({
			height: '350px',
			size: '3px',
			color: '#9c9c9c'
		});
	}
		
     function getformulationObj(action) {
		var formulationName	=	$("#formulationName").val();
		var formulationDept	=	$("#formulationDept").val().join(',');
		var planType	=	$("#planType").val();
		var startDate	=	"";
		var endDate		=	"";
		var daterange	=	$("#startDate").val();
		if(daterange.includes("-")){
			var dateval = 	daterange.split('-');
			startDate	=	$.trim(dateval[0]);
			endDate		=	$.trim(dateval[1]);	
		}
		
		var approvedDate	=	$("#approvedDate").val();
		var importFormulation	=	$("#importFormulation").val();
		var formulationTeam	=	$("#formulationteamid").val();
		var approvedBy	=	currentEmp;
		var approvedDone	=	"Pending";
		if($("#approve_str").is(":visible")){
			approvedDone	=	"Approved";
		}
		if($("#reset_str").is(":visible")){
			approvedDone	=	"Pending";
		}
		
		formulationTeam	=	(formulationTeam ==	"" || formulationTeam	==	undefined?currentEmp:formulationTeam);
		
		if(action	==	"add"){
			var swotObj 	= 	{
					"pageId":pageNo,
					"formulationName": formulationName,
		            "formulationDept": formulationDept,
				    "startDate": startDate,
				    "endDate": endDate,
				    "planType": planType,
				    "formulationTeam": formulationTeam,
				    "importFormulationId":importFormulation,
				    "importFormulation":importFormulation,
				    "approvedDate":approvedDate,
				    "approvedBy":approvedBy,
				    "status": approvedDone
		        };
		        return  swotObj;
		}else{
			formulationupdateDescription["formulationName"]	=	formulationName;
			formulationupdateDescription["formulationDept"]	=	formulationDept;
			formulationupdateDescription["startDate"]	=	startDate;
			formulationupdateDescription["endDate"]		=	endDate;
			formulationupdateDescription["planType"]	=	planType;
			formulationupdateDescription["importFormulation"]	=	importFormulation;
			formulationupdateDescription["importFormulationId"]	=	importFormulation;
			formulationupdateDescription["formulationTeam"]	=	formulationTeam;
			formulationupdateDescription["approvedDate"]	=	approvedDate;
			formulationupdateDescription["approvedBy"]	=	$("#approvedbyemployee").val();
			formulationupdateDescription["status"]	=	approvedDone;
			return  formulationupdateDescription;
		}   
	}
     

	$.validator.addMethod('startDatePattern', function (value) { 
		return /. - ./.test(value); 
	}, 'Please enter a valid start and end Date.');


    $( "#stragey_formulation_Form" ).validate({
    	  rules: {
    	    formulationName:{
    	    	required: true
    	    },startDate:{
    	    	required: true , startDatePattern: "Required Date"
    	    },planType:{
    	    	required: true
    	    }
    	  },
    	   messages: {
              required: "Name is required"
          },
          submitHandler: function(form) {
          	handleformulationSave();
          }
    	});

		
            		
		function handleformulationSave(){
			var action	=	$("#stragey_formulation_Form input[name='action']").val();
		    var swotObj = 	getformulationObj(action);
		    var methodType = 'post';
			var id	=	$("#stragey_formulation_Form input[name='id']").val();
			if(action	==	"edit"){
				swotObj.id 		= 	(id !=	""?id:"");	
			}
			
		    $.ajax({
		        url: "/stratroom/strategyFormulation",
		        type: methodType,
		        contentType: "application/json",
		        data: JSON.stringify(swotObj),
		        success: function (data, status) {
		        	if(data.id !=	undefined && data.id	!=	""){
		        		localStorage.setItem("formulation_pagenumber",data.id);
		        	}
		            location.reload(true);
		        },
				error:readErrorMsg
		    });
		}
		
		function subinitiativePorfileContent(usersimg,resultId,method,type){
			var subinitiativeUser	=	"";
			var returnresult	=	[];
			var functionParams	=	resultId+','+'"edit"';
			if(type == "approvedby"){
				functionParams	=	resultId+','+'"edit"'+','+'"approved"';
			}
			var functionName	=	"";
			functionName	=	"handleMultioownersuserevent";
			var modalPopupName	=	'data-toggle="modal" data-target="#user_edit_popup"';
			var profileBadgeIncrement 	=	"";
			if(usersimg !=	undefined){
				profileBadgeIncrement	=	(usersimg.length >= 3?parseInt(usersimg.length)-parseInt(2):"");	
			}
			
			var userseslectedData 	=	[];
			$.each(usersimg,function(index,users){
				if(users.id != undefined && users.id != 0){
					userseslectedData.push(users.id);
				}
			});
			
			if(userseslectedData.length 	==	0){
				var users 	=	topparentswotDetails;
				userseslectedData.push(users.id);
			}
			if(type == "approvedby"){
				userseslectedData	=	[];
				userseslectedData.push($("#stragey_formulation_Form #approvedbyemployee").val());
				var approveduser	=	{};
				$.each(reporteelist,function(ownkey,empvalue){
					if(empvalue.id	==	$("#stragey_formulation_Form #approvedbyemployee").val()){
						approveduser	=	{"id":empvalue.id,"name":empvalue.name,"image":empvalue.image,"dept":empvalue.dept};
					}
				});
				returnresult['userownerlist_data']	=	userseslectedData.join(',');
				
				var users 	=	approveduser;
				var username 	=	((users.name ==	undefined || users.name == "")?$("#firstName").val():users.name);
				var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle swotuserimage' ":" class='rounded-circle' src='"+users.image+"'");
				subinitiativeUser 	=	'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
				subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" '+modalPopupName+' class="badge">+</span></li>';
				returnresult['userownerlist']	=	subinitiativeUser;
				return returnresult;
			}	
			
			if(method	==	"new" || type=="formulation" || type == "approvedby"){
				returnresult['userownerlist_data']	=	userseslectedData.join(',');
				
			}else{
				var htmlcontent	=	'<input type="hidden" value="'+userseslectedData.join(',')+'" id="activities_selected_user_'+resultId+'">';
				returnresult['userownerlist_data']	=	htmlcontent;
			}
			
			
			
			if(usersimg !=	undefined && usersimg.length 	!=	0){
				var badgeincrement	=	false;		
				$.each(usersimg,function(index,users){
					var username	=	hasWhiteSpaceName(users.name);
					if(username == "" ||	username == " "){
						username	=	$("#firstName").val();
					}
					
					var userProfileConcate = ((users.image ==	undefined || users.image == "")?'data-name="'+username+'" class="rounded-circle swotuserimage" ':' class="rounded-circle" src="'+users.image+'"');		
					subinitiativeUser 	+=	'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
					if(usersimg.length >= 3 && index >= 2 && index <= 2){
						subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
						subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge" '+modalPopupName+'>+'+profileBadgeIncrement+'</span></li>';
						badgeincrement	=	true;
						return false;
					}
				});
				if(badgeincrement	==	false){
					subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" '+modalPopupName+' class="badge">+</span></li>';
				}
			}else{
				var users 	=	topparentswotDetails;
				var username 	=	((users.name ==	undefined || users.name == "")?$("#firstName").val():users.name);
				var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle swotuserimage' ":" class='rounded-circle' src='"+users.image+"'");
				subinitiativeUser 	=	'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
				subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" '+modalPopupName+' class="badge">+</span></li>';
			}
			returnresult['userownerlist']	=	subinitiativeUser;
			return returnresult;
		}
		
		$(document).on("click","input[name='activities_owner[]']",function(){
			if($("#user_edit_popup .approvedemplist").length){
				$("#user_edit_popup input[name='activities_owner[]']:checked").each(function(index){
					$(this).prop('checked',false);
				});
	            $(this).prop('checked',true);
			}
		});
		
		$(document).on("click",".getselectedActivitiesUsers",function(){
			$("#searchactivities").val('');
		    $("#activities_search2").show();
		    $("#activities_search_section2").hide();
			var id = $(this).attr("data-formulationid");
			if((id ==	undefined || id ==	"" || id ==	" ")){
				return false;
			}
			var imageElement 	=	"formulationTeam";
			
			var userseslectedData 	=	[];
			var selectedSubinitiativeOwner = $("#user_edit_popup input[name='activities_owner[]']:checked").each(function(index){
				userseslectedData.push(parseInt($(this).val()));
			});
		
			var functionParams	=	id+','+'"edit"';
			if($(this).hasClass("approvedemplist")	==	true){
				imageElement	=	"approvedemp";
				functionParams	=	id+','+'"edit"'+','+'"approved"';
			}
			var functionName	=	"handleMultioownersuserevent";
			var modalPopupName	=	'data-toggle="modal" data-target="#user_edit_popup"';
			if($(this).hasClass("approvedemplist")	==	true){
				$("#approvedbyemployee").val(userseslectedData.join(','));
			}else{
				$("#formulationteamid").val(userseslectedData.join(','));
			}
			
			if(!jQuery.isEmptyObject(userseslectedData)){
				$.ajax({
					url : "/stratroom/user/moduleAccessUserList?moduleName=Strategy Formulation",
					success : function(data, status) {
						var subinitiativeUser	=	"";
						if(userseslectedData.length !=	data.length){
							var profileBadgeIncrement 	=	(userseslectedData.length >= 3?parseInt(userseslectedData.length)-parseInt(2):"");
							var badgeinc	=	false;
							$.each(data,function(key,users){
									$.each(userseslectedData,function(index,selectedvalue){
										if(selectedvalue ==	users.id){
											var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
											var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle swotmultiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
											
											if(index <= 2){
												subinitiativeUser 	+=	'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
											}
											 
											if(userseslectedData.length >= 3 && index >= 2 && index <= 2){
												badgeinc	=	true;
												subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
												subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" '+modalPopupName+' class="badge">+'+profileBadgeIncrement+'</span></li>';
												return false;
											}
										}
									});
							});
							if(badgeinc	==	false){
								subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" '+modalPopupName+' class="badge">+'+profileBadgeIncrement+'</span></li>';
							}
						}
						if(userseslectedData.length ==	data.length){
							var profileBadgeIncrement 	=	(data.length >= 3?parseInt(data.length)-parseInt(2):0);
							var badgeinc	=	false;
							$.each(data,function(index,users){
								var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
								var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle swotmultiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
								if(index <= 2){
									subinitiativeUser 	+=	'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
								}
								
								if(userseslectedData.length >= 3 && index >= 2 && index <= 2){
									badgeinc	=	true;
									subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
									subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" '+modalPopupName+' class="badge">+'+profileBadgeIncrement+'</span></li>';
									return false;
								}
								
							});
							
							if(badgeinc	==	false){
								subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" '+modalPopupName+' class="badge">+'+profileBadgeIncrement+'</span></li>';
							}
						}
							
						$("#"+imageElement).html('');
						$("#"+imageElement).html(subinitiativeUser);
						$('.swotmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
					}
				});
			}else{
				var users 	=	topparentswotDetails;
				$("#formulationteamid").val(users.id);
				userseslectedData.push(users.id);
				var username 	=	((users.name ==	undefined || users.name == "")?$("#firstName").val():users.name);
				var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle swotmultiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
				subinitiativeUser 	=	'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
				subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" '+modalPopupName+' class="badge">+</span></li>';
				$("#"+imageElement).html('');
				$("#"+imageElement).html(subinitiativeUser);
				$('.swotmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
			}
			if($(this).hasClass("approvedemplist")	==	true){
				$(this).removeClass("approvedemplist");
			}
		});
		
								
      	function closeStrategyAdd(id,action) {
      		$("#strategy_add").hide();
      		$("#searchactivities").val('');
      	}

     	function openPerspectiveAdd(id,action) {
	        $("#perspective_form").trigger('reset');
			$("#perspective_form input[name='action']").val(action);
			$(".sidebar-strategy").hide();
	        $("#perspective_add").show();
			populateobjectiveOwnerDropdownScorecard('#perspective_owner','');

			if ((formulationupdateDescription.startDate != undefined && formulationupdateDescription.startDate != '') && (formulationupdateDescription.endDate != undefined && formulationupdateDescription.endDate != '')) {
				var startdate = new Date(formulationupdateDescription.startDate);
				var enddate = new Date(formulationupdateDescription.endDate);
				$("#perspective_start_end_date").datepicker({
					language: 'en',
					minDate: startdate,
					maxDate: enddate,
					range: true,
					autoClose: true,
					position: "bottom left",
					onSelect: function (fd) {
					}
				});
			}
			
			
	        if (action == 'add') {
				// when adding
				$(".sidebar-strategy").hide();
	        	$("#perspective_add").show();
	        	$(".perspectivesave").show();
				$(".perspectiveheader").html('Add Perspective <span class="pull-right" onclick="closePerspectiveAdd()" style="font-size: 15px; cursor: pointer"><i class="fas fa-times border-box"></i></span>');
				$("#perspective_start_end_date").val(formulationupdateDescription.startDate+' - '+formulationupdateDescription.endDate);
			}else if (action == 'delete') {
				$("#deleterecordid").val(id);
				$('#deleteModaldashboard').modal('toggle');
				
				$(window).on("resize", function(){
				    $(".modal:visible").each(alignModal);
				}); 
				$(".modal").on("shown.bs.modal", alignModal);
				
			} else { // view and edit
				$(".perspectivesave").hide();
				$("#perspective_add").show();
				
				if(editpermission	==	false){
					$(".perspectiveheader").html('Perspective Details <span class="pull-right" onclick="closePerspective()" style="font-size: 15px; cursor: pointer"><i class="fas fa-times border-box"></i></span>');
				}
				if(editpermission	==	true){	
					$(".perspectiveheader").html('Perspective Details <span class="pull-right" onclick="closePerspective()" style="font-size: 15px; cursor: pointer"><i class="fas fa-times border-box"></i></span><span class="pull-right" id="edit_perspective" style="margin-right: 12px" ><i class="fas fa-pencil-alt border-box"></i></span>');
				}
				$('#perspective_form input[type="text"]').attr("disabled",true);
				$('#perspective_form textarea').attr("disabled",true);
				$('#perspective_form select').attr("disabled",true);
				if (action == 'edit') {
					$("#perspective_form input[name='id']").val(id);
					$.ajax({
						url: "/stratroom/scorecard/strategyFormulation/" + id,
						async:false,
						success: function (data) {
							perspectiveupdateDescription	=	data;
							$('.perspectiveitem').removeClass("scorecardHighLight");
							localStorage.setItem("scorecard_pagenumber",id);
							localStorage.setItem("objective_pagenumber","");
							
							if($('.perspectivelist').length > 1){
					            $('.perspectivelist').prop('checked',false);
					            $("#perspectivelistid_"+id).prop('checked',true);
					        }
							
							objectiveTemplateload(formulationupdateDescription);
       						kpiTemplateload(formulationupdateDescription);
       						$('#scorecardhight_'+id).addClass("scorecardHighLight");
							perspectiveEditSuccessCallback(data, id);
						}
					});
				}
			}
      }
      
      function perspectiveEditSuccessCallback(data,id){
		$("#perspective_form input[name='id']").val(id);
		$("#perspective_form input[name='action']").val('edit');
		$("#perspective_name").val(data.scoreCardValue.name);
		if(data.owner	==	""){
			$("#perspective_owner").val(currentEmp);
		}else{
			$("#perspective_owner").val(data.owner);
		}
		$('#perspective_owner').select2({
			selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
			dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
		});
		if(data.scoreCardValue.weight	!=	"" && data.scoreCardValue.weight	!=	undefined){
			$('#perspective_weight').val(data.scoreCardValue.weight);
		}else{
			$('#perspective_weight').val(0);
		}
		
		if(formulationupdateDescription !=	"" && formulationupdateDescription.status	==	"Approved"){
			$(".perspectiveheader").html('Perspective Details <span class="pull-right" onclick="closePerspective()" style="font-size: 15px; cursor: pointer"><i class="fas fa-times border-box"></i></span>');		
		}
		
		$("#perspective_status").val(data.scoreCardValue.status);
		$("#perspective_sub_weight").val(data.scoreCardValue.subweight);
		if(data.scoreCardValue.perspective_start_end_date !=	"" && data.scoreCardValue.perspective_start_end_date !=	undefined){
			$("#perspective_start_end_date").val(data.scoreCardValue.perspective_start_end_date);
		}else{
			$("#perspective_start_end_date").val(formulationupdateDescription.startDate+' - '+formulationupdateDescription.endDate);
		}
	}

	function getperspectiveObj(action) {
		perspectiveupdateDescription["scoreCardValue"]["name"]	=	$("#perspective_name").val();
		perspectiveupdateDescription["owner"]			=	$("#perspective_owner").val();
		perspectiveupdateDescription["scoreCardValue"]["status"]	=	$("#perspective_status").val();
		perspectiveupdateDescription["scoreCardValue"]["weight"]	=	$("#perspective_weight").val();
		perspectiveupdateDescription["scoreCardValue"]["subweight"]	=	$("#perspective_sub_weight").val();
		perspectiveupdateDescription["scoreCardValue"]["perspective_start_end_date"]	=	$("#perspective_start_end_date").val();
		return  perspectiveupdateDescription;
	}
     
    $( "#perspective_form" ).validate({
    	  rules: {
    	    name:{
    	    	required: true
    	    },
    	    perspective_start_end_date:{
    	    	required: true
    	    },
    	    perspective_weight: {
		      digits: true,
		      min: 0,
		      max: 100
		    },perspective_sub_weight: {
		      digits: true,
		      min: 0,
		      max: 100
		    }
    	  },
    	   messages: {
              required: "Name is required"
          },
          submitHandler: function(form) {
          	handlePerspectiveSave();
          }
    	});
            		
		function handlePerspectiveSave(){
			var action	=	$("#perspective_form input[name='action']").val();
		    var swotObj = 	getperspectiveObj(action);
		    var methodType = 'post';
			var id	=	$("#perspective_form input[name='id']").val();
			if(action	==	"edit"){
				swotObj.id 		= 	(id !=	""?id:"");	
			}
			
			var startdate	=	"";
			var enddate		=	"";
			if ((formulationupdateDescription.startDate != undefined && formulationupdateDescription.startDate != '') && (formulationupdateDescription.endDate != undefined && formulationupdateDescription.endDate != '')) {
				startdate 	= 	new Date(formulationupdateDescription.startDate);
				enddate 	= 	new Date(formulationupdateDescription.endDate);
			}
			
			var validatedate = $("#perspective_start_end_date").val();
			if (validatedate != undefined && validatedate.includes("-")) {
				if (startdate != "" && enddate != "") {
					var dateval = validatedate.split('-');
					if (new Date(dateval[0]) >= startdate && new Date(dateval[0]) <= enddate) {
					} else {
						$.notify('Failed: Start and end date should be between this formulation',{
								  style: 'error',
								  className: 'graynotify'
								});
						return false;
					}
					
					if (new Date(dateval[1]) >= startdate && new Date(dateval[1]) <= enddate) {
					} else {
						$.notify('Failed: Start and end date should be between this formulation',{
								  style: 'error',
								  className: 'graynotify'
								});
						return false;
					}
				}
			} else {
				$.notify('Failed: Invalidate date format',{
								  style: 'error',
								  className: 'graynotify'
								});
				return false;
			}
		
		    $.ajax({
		        url: "/stratroom/scorecard/strategyFormulation",
		        type: methodType,
		        contentType: "application/json",
		        data: JSON.stringify(swotObj),
		        success: function (data, status) {
		            location.reload(true);
		        },
				error:readErrorMsg
		    });
		}
		
      function closePerspectiveAdd() {
        $("#perspective_add").hide();
      }
		
		$(document).on("change",".perspectivelist",function() {
	       	var value	=	$(this).val();
	       	if($('.perspectivelist').length > 1){
	            $('.perspectivelist').prop('checked',false);
	            $('.perspectiveitem').removeClass("scorecardHighLight");
	            $(this).prop('checked',true);
	            localStorage.setItem("scorecard_pagenumber",value);
	            localStorage.setItem("objective_pagenumber","");
	            objectiveTemplateload(formulationupdateDescription);
       			kpiTemplateload(formulationupdateDescription);
       			$('#scorecardhight_'+value).addClass("scorecardHighLight");
	        }
	    });
	    
	    $(document).on("change",".objectivelist",function() {
	       	if($('.objectivelist').length > 1){
	            $('.objectivelist').prop('checked',false);
	            $('.objectiveitem').removeClass("scorecardHighLight");
	            var value	=	$(this).val();
	            $('#objectivehigh_'+value).addClass("scorecardHighLight");
	            $(this).prop('checked',true);
	            localStorage.setItem("objective_pagenumber",value);
       			kpiTemplateload(formulationupdateDescription);
	        }
	    });
	    
	    $(document).on("change",".kpilistdata",function() {
	       	if($('.kpilistdata').length > 1){
	            $('.kpilistdata').prop('checked',false);
	            $(this).prop('checked',true);
	            $('.kpiitem').removeClass("scorecardHighLight");
	            var value	=	$(this).val();
	            $('#kpihigh_'+value).addClass("scorecardHighLight");
	        }
	    });
    	
    	function openKPIdelete(){
    		if(formulationupdateDescription !=	"" && formulationupdateDescription.status	==	"Approved"){
        		$("#objective_add").hide();
        		$.notify("Error: This is approved formulation so you will not able to add", {
							  style: 'error',
							  className: 'graynotify'
							});
				return false;
        	}
    		if($("#kpi-colored-div .row").length == 0){
				$.notify("Error: Kindly select any kpi", {
							  style: 'error',
							  className: 'graynotify'
							});
				return false;			
			}
			var id		=	"";
			$(".kpilistdata").each(function(){
				if($(this).is(":checked")){
					id	=	$(this).val();
				}
			});
			
			if(id == "" || id	==	undefined){
				$.notify("Error: Kindly select any kpi", {
							  style: 'error',
							  className: 'graynotify'
							});
				return false;			
			}
			$("#deletescoreid").val(id);
			$("#deleterecordtype").val("kpi");
			$('#deleteModalscorecard').modal('toggle');
			$(window).on("resize", function(){
			    $(".modal:visible").each(alignModal);
			}); 
			$(".modal").on("shown.bs.modal", alignModal);
		}
    	
    	function openObjectivedelete(){
    		if(formulationupdateDescription !=	"" && formulationupdateDescription.status	==	"Approved"){
        		$.notify("Error: This is approved formulation so you will not able to add", {
							  style: 'error',
							  className: 'graynotify'
							});
				return false;
        	}
	        	
    		if($("#object-colored-div .row").length == 0){
				$.notify("Error: Kindly select any kpi", {
							  style: 'error',
							  className: 'graynotify'
							});
				return false;			
			}
			var id		=	"";
			$(".objectivelist").each(function(){
				if($(this).is(":checked")){
					id	=	$(this).val();
				}
			});
			
			if(id == "" || id	==	undefined){
				$.notify("Error: Kindly select any objective", {
							  style: 'error',
							  className: 'graynotify'
							});
				return false;			
			}
			$("#deletescoreid").val(id);
			$("#deleterecordtype").val("scorecardobjective");
			$('#deleteModalscorecard').modal('toggle');
			$(window).on("resize", function(){
			    $(".modal:visible").each(alignModal);
			}); 
			$(".modal").on("shown.bs.modal", alignModal);
		}	
    
		function openObjectiveAdd(id,action) {
			console.log(id, action, "idaction");
			formvalidationerrorreset();
        	$(".sidebar-strategy").hide();
        	$("#objective_add").show();
        	$("#objective_Form").trigger('reset');
			$("#objective_Form input[name='action']").val(action);
			populateobjectiveOwnerDropdownScorecard('#objective_owner','');
			
			if ((formulationupdateDescription.startDate != undefined && formulationupdateDescription.startDate != '') && (formulationupdateDescription.endDate != undefined && formulationupdateDescription.endDate != '')) {
				var startdate = new Date(formulationupdateDescription.startDate);
				var enddate = new Date(formulationupdateDescription.endDate);
				$("#objective_start_end_date").datepicker({
					language: 'en',
					minDate: startdate,
					maxDate: enddate,
					range: true,
					autoClose: true,
					position: "bottom left",
					onSelect: function (fd) {
					}
				});
			}
			
	        if (action == 'add') {
	        	if(formulationupdateDescription !=	"" && formulationupdateDescription.status	==	"Approved"){
	        		$("#objective_add").hide();
	        		$.notify("Error: This is approved formulation so you will not able to add", {
								  style: 'error',
								  className: 'graynotify'
								});
					return false;
	        	}
	        	
	        	if($("#persp-colored-div .row").length == 0){
	        		$("#objective_add").hide();
					$.notify("Error: Kindly select any perspective", {
								  style: 'error',
								  className: 'graynotify'
								});
					return false;			
				}
				var scorecardid		=	"";
				$(".perspectivelist").each(function(){
					if($(this).is(":checked")){
						scorecardid	=	$(this).val();
					}else{
						var getinitiativePagenumber = 	localStorage.getItem("scorecard_pagenumber");
						if (getinitiativePagenumber != undefined && getinitiativePagenumber != '' && getinitiativePagenumber != null) {
							scorecardid = getinitiativePagenumber;
						}	
					}
				});
				
				if(scorecardid == "" || scorecardid	==	undefined){
					$("#objective_add").hide();
					$.notify("Error: Kindly select any perspective", {
								  style: 'error',
								  className: 'graynotify'
								});
					return false;			
				}
				// when adding
				$("#objective_Form input[name='scorecardid']").val(scorecardid);
				$(".objectiveheader").html('Add Objective <span class="pull-right" onclick="closeObjectiveAdd()" style="font-size: 15px; cursor: pointer"><i class="fas fa-times border-box"></i></span>');
				var resultPorfileContent	=	subinitiativePorfileContent([],0,'new');
				$("#formulationteamid").val(resultPorfileContent['userownerlist_data']);
				$("#formulationTeam").html(resultPorfileContent['userownerlist']);
				$("#objective_owner").val(currentEmp);
				$('#objective_owner').select2({
					selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
					dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
				});
				$("#objective_start_end_date").val(formulationupdateDescription.startDate+' - '+formulationupdateDescription.endDate);
				$(".objectivesave").show();
				$('#objective_Form textarea').removeAttr("disabled");
				$('#objective_Form input[type="text"]').removeAttr("disabled");
				$('#objective_Form input[type="checkbox"]').removeAttr("disabled");
				$('#objective_Form select').removeAttr("disabled");
			}else if (action == 'delete') {
				$("#deleterecordid").val(id);
				$('#deleteModaldashboard').modal('toggle');
				
				$(window).on("resize", function(){
				    $(".modal:visible").each(alignModal);
				}); 
				$(".modal").on("shown.bs.modal", alignModal);
				
			} else { // view and edit
				$(".objectivesave").hide();
				if(editpermission	==	true){
					$(".objectiveheader").html('Objective Details <span class="pull-right" onclick="closeObjective()" style="font-size: 15px; cursor: pointer"><i class="fas fa-times border-box"></i></span><span class="pull-right" id="edit_objective" style="margin-right: 12px" ><i class="fas fa-pencil-alt border-box"></i></span>');
				}
				if(editpermission	==	false){
					$(".objectiveheader").html('Objective Details <span class="pull-right" onclick="closeObjective()" style="font-size: 15px; cursor: pointer"><i class="fas fa-times border-box"></i></span>');
				}
				$('#objective_Form input[type="text"]').attr("disabled",true);
				$('#objective_Form textarea').attr("disabled",true);
				$('#objective_Form input[type="checkbox"]').attr("disabled",true);
				$('#objective_Form select').attr("disabled",true);
				if (action == 'edit') {
					$("#objective_Form input[name='id']").val(id);
					$.ajax({
						url: "/stratroom/objectives/strategyFormulation/" + id,
						async:false,
						success: function (data) {
							objectiveupdateDescription	=	data;
							$('.objectiveitem').removeClass("scorecardHighLight");
				            $('#objectivehigh_'+id).addClass("scorecardHighLight");
				            if($('.objectivelist').length > 1){
					            $('.objectivelist').prop('checked',false);
					            $("#objectivelistid_"+id).prop('checked',true);
					        }
				            localStorage.setItem("objective_pagenumber",id);
			       			kpiTemplateload(formulationupdateDescription);
							objectiveEditSuccessCallback(data, id);
						}
					});
				}
			}
      	}
		
		function objectiveEditSuccessCallback(data,id){
			if(formulationupdateDescription !=	"" && formulationupdateDescription.status	==	"Approved"){
				$(".objectiveheader").html('Objective Details <span class="pull-right" onclick="closeObjective()" style="font-size: 15px; cursor: pointer"><i class="fas fa-times border-box"></i></span>');		
			}
			$("#objective_Form input[name='id']").val(id);
			$("#objective_Form input[name='scorecardid']").val(data.scoreCardId);
			$("#objective_name").val(data.objectivesValue.name);
			if(data.objectivesValue.objective_start_end_date !=	"" && data.objectivesValue.objective_start_end_date !=	undefined){
				$("#objective_start_end_date").val(data.objectivesValue.objective_start_end_date);
			}else{
				$("#objective_start_end_date").val(formulationupdateDescription.startDate+' - '+formulationupdateDescription.endDate);
			}
			$("#objective_owner").val(data.owner);
			$('#objective_owner').select2({
				selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
				dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
			});
			
			if(data.objectivesValue.weight	!=	"" && data.objectivesValue.weight	!=	undefined){
				$('#objectiveweight').val(data.objectivesValue.weight);
			}else{
				$('#objectiveweight').val(0);
			}
			$("#objective_sub_weight").val(data.objectivesValue.subweight);
			$("#objective_status").val(data.objectivesValue.status);
		}
		
		function populateDeptList(elementId) {
			$(elementId).empty();
			var numberOfOptions = $(elementId + ' > option').length;
			if (jQuery.isEmptyObject(deptlist)) {
				$.ajax({
					url : "/stratroom/allDepartmentList",
					async:false,
					success : function(kpiListValue) {
						deptlist 	= 	kpiListValue;
						$.each(deptlist, function(index, kpiObj) {
							addOption(elementId, kpiObj.name, kpiObj.id)
						});
					}
				});
			} else if (numberOfOptions < 2) {
				$.each(deptlist, function(index, reportee) {
					addOption(elementId, reportee.name, reportee.id)
				});
			}
		}
		
		function populateobjectiveOwnerDropdownScorecard(elementId,formtypeElement) {
			var numberOfOptions = $(elementId + ' > option').length;
			$(elementId).empty();
			$(elementId).append('<option value="" data-i18n="Choose">Choose</option>');
			$.ajax({
				//url : "/stratroom/completereporteeList",
				url : "/stratroom/user/moduleAccessUserList?moduleName=Strategy Formulation",
				async:false,
				success : function(employeeList) {
					completereporteeList = employeeList;
					$.each(employeeList, function(index, reportee) {
						addOption(elementId, reportee.name, reportee.id)
					});
				}
			});
		}

		function getobjectiveObj(action) {
			if(action	==	"add"){
				var objectiveObj = {
					"owner" : $("#objective_owner").val(),
					"scoreCardId" : $("#scorecardid").val(),
					"createdBy" : currentEmp,
					"objectivesValue" : {
						"thresholdFormula" : "",
						"name" : $("#objective_name").val(),
						"description" : "",
						"weight" : $("#objectiveweight").val(),
						"status" : $("#objective_status").val(),
						"subweight":$("#objective_sub_weight").val(),
						"objective_start_end_date":$("#objective_start_end_date").val()
					}
				}
				return  objectiveObj;
			}else{
				objectiveupdateDescription["objectivesValue"]["name"]	=	$("#objective_name").val();
				objectiveupdateDescription["owner"]	=	$("#objective_owner").val();
				objectiveupdateDescription["objectivesName"]	=	$("#objective_name").val();
				objectiveupdateDescription["objectivesValue"]["status"]	=	$("#objective_status").val();
				objectiveupdateDescription["objectivesValue"]["weight"]	=	$("#objectiveweight").val();
				objectiveupdateDescription["objectivesValue"]["subweight"]	=	$("#objective_sub_weight").val();
				objectiveupdateDescription["objectivesValue"]["objective_start_end_date"]	=	$("#objective_start_end_date").val();
				return  objectiveupdateDescription;	
				/*var existdatadonotupdate 	=	["name","status","weight","subweight","objective_start_end_date"];
				if(action == "edit" && (objectiveupdateDescription !== undefined || objectiveupdateDescription != "")){
					$.each(objectiveupdateDescription.objectivesValue,function(index,value){
						if($.inArray(index,existdatadonotupdate) == -1){
							objectiveObj["objectivesValue"][index]	=	value;
						}
					});
				}
				return  objectiveObj;*/
			}   
		}
     
    $( "#objective_Form" ).validate({
    	  rules: {
    	    name:{
    	    	required: true
    	    },
    	    objectiveStartDate:{
    	    	required: true
    	    },objectiveweight: {
		      digits: true,
		      min: 0,
		      max: 100
		    },objective_sub_weight: {
		      digits: true,
		      min: 0,
		      max: 100
		    }
    	  },
    	   messages: {
              required: "Name is required"
          },
          submitHandler: function(form) {
          	handleObjectiveSave();
          }
    	});
            		
		function handleObjectiveSave(){
			var action	=	$("#objective_Form input[name='action']").val();
		    var swotObj = 	getobjectiveObj(action);
		    var methodType = 'post';
			var id	=	$("#objective_Form input[name='id']").val();
			if(action	==	"edit"){
				swotObj.id 		= 	(id !=	""?id:"");	
			}
			
			var startdate	=	"";
			var enddate		=	"";
			if ((formulationupdateDescription.startDate != undefined && formulationupdateDescription.startDate != '') && (formulationupdateDescription.endDate != undefined && formulationupdateDescription.endDate != '')) {
				startdate 	= 	new Date(formulationupdateDescription.startDate);
				enddate 	= 	new Date(formulationupdateDescription.endDate);
			}
			
			var validatedate = $("#objective_start_end_date").val();
			if (validatedate != undefined && validatedate.includes("-")) {
				if (startdate != "" && enddate != "") {
					var dateval = validatedate.split('-');
					if (new Date(dateval[0]) >= startdate && new Date(dateval[0]) <= enddate) {
					} else {
						$.notify('Failed: Start and end date should be between this formulation',{
								  style: 'error',
								  className: 'graynotify'
								});
						return false;
					}
					
					if (new Date(dateval[1]) >= startdate && new Date(dateval[1]) <= enddate) {
					} else {
						$.notify('Failed: Start and end date should be between this formulation',{
								  style: 'error',
								  className: 'graynotify'
								});
						return false;
					}
				}
			} else {
				$.notify('Failed: Invalidate date format',{
								  style: 'error',
								  className: 'graynotify'
								});
				return false;
			}
			
		    $.ajax({
		        url: "/stratroom/objectives/strategyFormulation",
		        type: methodType,
		        contentType: "application/json",
		        data: JSON.stringify(swotObj),
		        success: function (data, status) {
		        	if(data.id !=	undefined &&	data.id !=	""){
		        		localStorage.setItem("objective_pagenumber",data.id);
		        	}
		            location.reload(true);
		        },
				error:readErrorMsg
		    });
		}
		
      function closeObjectiveAdd() {
        $("#objective_add").hide();
      }
		
		$( "#kpi_Form" ).validate({
    	  rules: {
    	    kpi_name:{
    	    	required: true
    	    },kpi_measurement:{
    	    	required: true
    	    },targetamount:{
    	    	required: true
    	    }
    	    ,kpi_start_end_date:{
    	    	required: true
    	    },kpi_status:{
    	    	required: true
    	    },
    	    kpi_weight: {
		      digits: true,
		      min: 0,
		      max: 100
		    },kpi_sub_weight: {
		      digits: true,
		      min: 0,
		      max: 100
		    }
    	  },
    	   messages: {
              required: "Name is required"
          },
          submitHandler: function(form) {
          	handleKpiSave();
          }
    	});
		
		function getKpiObj(action){

			var arr = $.map(reporteelist, function(obj, i) {
				return obj.id;
			});
			
			var kpiThresholdvalue 	=	$("#kpi_threshold").val();
			if(action	==	"add"){
				var kpiObj = {
					"owner" : $("#kpi_owner").val(),
					"objectiveId" : $("#kpi_Form input[name='objectiveid']").val(),
					"createdBy" : currentEmp,
					"kpiFormula" : {
						"formula" : $("#kpi_formula").val(),
						"empployeeIds" : arr,
						"period" : $("#datePeriod").val(),
						"fieldName" : $("#kpiFieldName").val(),
					},
					"kpiValue" : {
						"kpiId" : "",
						"name" : $("#kpi_name").val(),
						"description" : "",
						"kpiType" : $("#kpi_type").val(),
						"kpi_measurement" : $("#kpi_measurement").val(),
						"kpi_datasource" : $("#kpi_datasource").val(),
						"kpi_start_end_date" : $("#kpi_start_end_date").val(),
						"weight" : $("#kpi_weight").val(),
						"subweight" : $("#kpi_sub_weight").val(),
						"actual" : $("#kpi_formula").val(),
						"target" : $("#targetamount").val(),
						"targetCurrency" : "",
						"status" : $("#kpi_status").val(),
						"dataType" : $("#kpiDataType").val(),
						"kpiCurrency" : $("#kpiCurrencyvalue").val(),
						"threshold":kpiThresholdvalue
					}
				}
				return kpiObj;
			}else{
				kpiupdateDescription["owner"]		=	$("#kpi_owner").val();
				if(kpiupdateDescription["kpiFormula"] !=	undefined){
					kpiupdateDescription["kpiFormula"]["formula"]	=	$("#kpi_formula").val();
					kpiupdateDescription["kpiFormula"]["empployeeIds"]	=	arr;
					kpiupdateDescription["kpiFormula"]["period"]	=	$("#datePeriod").val();
					kpiupdateDescription["kpiFormula"]["fieldName"]	=	$("#kpiFieldName").val();
				}
				kpiupdateDescription["kpiName"]		=	$("#kpi_name").val();
				kpiupdateDescription["kpiValue"]["name"]	=	$("#kpi_name").val();
				kpiupdateDescription["kpiValue"]["kpiType"]	=	$("#kpi_type").val();
				kpiupdateDescription["kpiValue"]["kpi_measurement"]	=	$("#kpi_measurement").val();
				kpiupdateDescription["kpiValue"]["kpi_datasource"]	=	$("#kpi_datasource").val();
				kpiupdateDescription["kpiValue"]["weight"]	=	$("#kpi_weight").val();
				kpiupdateDescription["kpiValue"]["kpi_start_end_date"]	=	$("#kpi_start_end_date").val();
				kpiupdateDescription["kpiValue"]["subweight"]	=	$("#kpi_sub_weight").val();
				kpiupdateDescription["kpiValue"]["actual"]	=	$("#kpi_formula").val();
				kpiupdateDescription["kpiValue"]["target"]	=	$("#targetamount").val();
				kpiupdateDescription["kpiValue"]["status"]	=	$("#kpi_status").val();
				kpiupdateDescription["kpiValue"]["dataType"]	=	$("#kpiDataType").val();
				kpiupdateDescription["kpiValue"]["kpiCurrency"]	=	$("#kpiCurrencyvalue").val();
				kpiupdateDescription["kpiValue"]["threshold"]	=	kpiThresholdvalue;
				return kpiupdateDescription;
			}
		}
		            		
		function handleKpiSave(){
			var action	=	$("#kpi_Form input[name='action']").val();
		    var swotObj = 	getKpiObj(action);
		    var methodType = 'post';
			var id	=	$("#kpi_Form input[name='id']").val();
			if(action	==	"edit"){
				swotObj.id 		= 	(id !=	""?id:"");	
			}
			
			var startdate	=	"";
			var enddate		=	"";
			if ((formulationupdateDescription.startDate != undefined && formulationupdateDescription.startDate != '') && (formulationupdateDescription.endDate != undefined && formulationupdateDescription.endDate != '')) {
				startdate 	= 	new Date(formulationupdateDescription.startDate);
				enddate 	= 	new Date(formulationupdateDescription.endDate);
			}
			
			var validatedate = $("#kpi_start_end_date").val();
			if (validatedate != undefined && validatedate.includes("-")) {
				if (startdate != "" && enddate != "") {
					var dateval = validatedate.split('-');
					if (new Date(dateval[0]) >= startdate && new Date(dateval[0]) <= enddate) {
					} else {
						$.notify('Failed: Start and end date should be between this formulation',{
								  style: 'error',
								  className: 'graynotify'
								});
						return false;
					}
					
					if (new Date(dateval[1]) >= startdate && new Date(dateval[1]) <= enddate) {
					} else {
						$.notify('Failed: Start and end date should be between this formulation',{
								  style: 'error',
								  className: 'graynotify'
								});
						return false;
					}
				}
			} else {
				$.notify('Failed: Invalidate date format',{
								  style: 'error',
								  className: 'graynotify'
								});
				return false;
			}
			
		    $.ajax({
		        url: "/stratroom/kpi/strategyFormulation",
		        type: methodType,
		        contentType: "application/json",
		        data: JSON.stringify(swotObj),
		        success: function (data, status) {
		        	if(data.id !=	undefined &&	data.id !=	""){
		        		localStorage.setItem("kpilist_pagenumber",data.id);
		        	}
		            location.reload(true);
		        },
				error:readErrorMsg
		    });
		}

   		function openKPIAdd(id,action) {
   			formvalidationerrorreset();
        	$(".sidebar-strategy").hide();
    		$("#kpi_add").show();
        	$("#kpi_Form").trigger('reset');
			$("#kpi_Form input[name='action']").val(action);
			populateobjectiveOwnerDropdownScorecard('#kpi_owner','');
			
			if ((formulationupdateDescription.startDate != undefined && formulationupdateDescription.startDate != '') && (formulationupdateDescription.endDate != undefined && formulationupdateDescription.endDate != '')) {
				var startdate = new Date(formulationupdateDescription.startDate);
				var enddate = new Date(formulationupdateDescription.endDate);
		
				$("#kpi_start_end_date").datepicker({
					language: 'en',
					minDate: startdate,
					maxDate: enddate,
					range: true,
					autoClose: true,
					position: "top left",
					onSelect: function (fd) {
					}
				});
			}
			
	        if (action == 'add') {
	        	if(formulationupdateDescription !=	"" && formulationupdateDescription.status	==	"Approved"){
	        		$("#kpi_add").hide();
	        		$.notify("Error: This is approved formulation so you will not able to add", {
								  style: 'error',
								  className: 'graynotify'
								});
					return false;
	        	}
	        	
	        	if($("#object-colored-div .row").length == 0){
	        		$("#kpi_add").hide();
					$.notify("Error: Kindly select any objective", {
								  style: 'error',
								  className: 'graynotify'
								});
					return false;			
				}
				var scorecardid		=	"";
				$(".perspectivelist").each(function(){
					if($(this).is(":checked")){
						scorecardid	=	$(this).val();
					}else{
						var getinitiativePagenumber = 	localStorage.getItem("scorecard_pagenumber");
						if (getinitiativePagenumber != undefined && getinitiativePagenumber != '' && getinitiativePagenumber != null) {
							scorecardid = getinitiativePagenumber;
						}
					}
				});
			
				if(scorecardid == "" || scorecardid	==	undefined){
					$("#kpi_add").hide();
					$.notify("Error: Kindly select any perspective", {
								  style: 'error',
								  className: 'graynotify'
								});
					return false;			
				}
				
				var objectiveid		=	"";
				$(".objectivelist").each(function(){
					if($(this).is(":checked")){
						objectiveid	=	$(this).val();
					}else{
						var getinitiativePagenumber = 	localStorage.getItem("objective_pagenumber");
						if (getinitiativePagenumber != undefined && getinitiativePagenumber != '' && getinitiativePagenumber != null) {
							objectiveid = getinitiativePagenumber;
						}
					}
				});
				
				if(objectiveid == "" || objectiveid	==	undefined){
					$("#kpi_add").hide();
					$.notify("Error: Kindly select any perspective", {
								  style: 'error',
								  className: 'graynotify'
								});
					return false;			
				}
				
				// when adding
				$("#kpi_Form input[name='scorecardid']").val(scorecardid);
				$("#kpi_Form input[name='objectiveid']").val(objectiveid);
				$(".kpiheader").html('Add KPI <span class="pull-right" onclick="closeKPIAdd()" style="font-size: 15px; cursor: pointer"><i class="fas fa-times border-box"></i></span>');
				$("#kpi_owner").val(currentEmp);
				$('#kpi_owner').select2({
					selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
					dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
				});
				$("#kpi_start_end_date").val(formulationupdateDescription.startDate+' - '+formulationupdateDescription.endDate);
				$(".kpisavebtn").show();
				$('#kpi_Form textarea').removeAttr("disabled");
				$('#kpi_Form input[type="text"]').removeAttr("disabled");
				$('#kpi_Form input[type="checkbox"]').removeAttr("disabled");
				$('#kpi_Form select').removeAttr("disabled");
			}else if (action == 'delete') {
				$("#deleterecordid").val(id);
				$('#deleteModaldashboard').modal('toggle');
				
				$(window).on("resize", function(){
				    $(".modal:visible").each(alignModal);
				}); 
				$(".modal").on("shown.bs.modal", alignModal);
				
			} else { // view and edit
				$(".kpisavebtn").hide();
				if(editpermission	==	true){
					$(".kpiheader").html('KPI Details <span class="pull-right" onclick="closeKPIAdd()" style="font-size: 15px; cursor: pointer"><i class="fas fa-times border-box"></i></span><span class="pull-right" id="edit_kpi" style="margin-right: 12px" ><i class="fas fa-pencil-alt border-box"></i></span>');
				}
				if(editpermission	==	false){
					$(".kpiheader").html('KPI Details <span class="pull-right" onclick="closeKPIAdd()" style="font-size: 15px; cursor: pointer"><i class="fas fa-times border-box"></i></span>');
				}
				
				$('#kpi_Form input[type="text"]').attr("disabled",true);
				$('#kpi_Form textarea').attr("disabled",true);
				$('#kpi_Form input[type="checkbox"]').attr("disabled",true);
				$('#kpi_Form select').attr("disabled",true);
				if (action == 'edit') {
					$("#kpi_Form input[name='id']").val(id);
					$.ajax({
						url: "/stratroom/kpi/strategyFormulation/" + id,
						success: function (data) {
							kpiupdateDescription	=	data;
							$('.kpiitem').removeClass("scorecardHighLight");
				            $('#kpihigh_'+id).addClass("scorecardHighLight");
				            if($('.kpilistdata').length > 1){
					            $('.kpilistdata').prop('checked',false);
					            $("#kpilistdataid_"+id).prop('checked',true);
					        }
					        localStorage.setItem("kpilist_pagenumber",id);
							kpiSuccessCallback(data, id);
						}
					});
				}
			} 
		}
	
	function sentenceCase (str) {
	    return str.replace(/[a-z]/i, function (letter) {
			return letter.toUpperCase();
	  	}).trim();
	}

	function kpiSuccessCallback(kpiData) {
		$("#kpi_Form input[name='id']").val(kpiData.id);
		var kpistatus = (kpiData.kpiValue.status != undefined && kpiData.kpiValue.status !=""?sentenceCase(kpiData.kpiValue.status):"");
		var kpidatasource = (kpiData.kpiValue.kpi_datasource != undefined && kpiData.kpiValue.kpi_datasource !=""?sentenceCase(kpiData.kpiValue.kpi_datasource):"");
		var kpimeasurement = (kpiData.kpiValue.kpi_measurement != undefined && kpiData.kpiValue.kpi_measurement !=""?sentenceCase(kpiData.kpiValue.kpi_measurement):"");
		if(formulationupdateDescription !=	"" && formulationupdateDescription.status	==	"Approved"){
			$(".kpiheader").html('KPI Details <span class="pull-right" onclick="closeKPIAdd()" style="font-size: 15px; cursor: pointer"><i class="fas fa-times border-box"></i></span>');
		}
		if(kpiData.owner	==	""){
			$('#kpi_owner').val(currentEmp);
		}else{
			$('#kpi_owner').val(kpiData.owner);
		}
		$('#kpi_owner').select2({
			selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
			dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
		});
		$('#kpi_name').val(kpiData.kpiValue.name)
		if(kpiData["kpiFormula"] !=	undefined){
			$('#formula_actual').val(kpiData.kpiFormula.formula);
			$("#kpiFieldName").val(kpiData.kpiFormula.fieldName);
			$("#kpi_start_end_date").val(kpiData.kpiFormula.period)
		}
		$('#kpi_formula').val(kpiData.kpiValue.actual);
		$('#kpiDataType').val(kpiData.kpiValue.dataType);
		if(kpiData.kpiValue.dataType	==	"Currency"){
			$("#currency_input").show();
		}
		$('#kpiCurrencyvalue').val(kpiData.kpiValue.kpiCurrency);
		$('#kpi_type').val(kpiData.kpiValue.kpiType);
		$('#kpi_measurement').val(kpimeasurement);
		if(kpiData.kpiValue.kpi_start_end_date !=	"" && kpiData.kpiValue.kpi_start_end_date !=	undefined){
			$('#kpi_start_end_date').val(kpiData.kpiValue.kpi_start_end_date);
		}else{
			$("#kpi_start_end_date").val(formulationupdateDescription.startDate+' - '+formulationupdateDescription.endDate);
		}
		$('#kpi_datasource').val(kpidatasource);
		if(kpiData.kpiValue.weight	!=	"" && kpiData.kpiValue.weight	!=	undefined){
			$('#kpi_weight').val(kpiData.kpiValue.weight);
		}else{
			$('#kpi_weight').val(0);
		}
		
		$('#kpi_sub_weight').val(kpiData.kpiValue.subweight);
		$('#kpi_status').val(kpistatus);
		$("#kpi_threshold").val(kpiData.kpiValue.threshold);
		
		
		var numberchartTarget	=	splitnumbercharacter(kpiData.kpiValue.target);
		
		var kpiTarget	=	"";
		if(typeof(numberchartTarget['number'])	===	"number"){
			numberchartTarget['number']	=	convertInttoStringAndStringtoInt(numberchartTarget['number']);	
		}
		var targetcurrency	=	(kpiData.kpiValue.targetCurrency != undefined && kpiData.kpiValue.targetCurrency != ""?kpiData.kpiValue.targetCurrency:"");
		kpiTarget		=	targetcurrency+numberchartTarget['firstletter']+formatNumber(numberchartTarget['number'])+numberchartTarget['lastletter'];
	
		$("#targetamount").val(kpiTarget);
	}
	
      function closeKPIAdd() {
        $("#kpi_add").hide();
      }

      function openStrategy() {
        $(".sidebar-strategy").hide();
        $("#strategy_edit").show();
      }

      function closeStrategy() {
        $("#strategy_edit").hide();
      }

      $(document).on("click","#edit_strategy",function () {
        if(editpermission == false){
        	return false;
        }
    	$("#edit_strategy").hide();
        $("#formulationsave").show();
        $('#stragey_formulation_Form textarea').removeAttr("disabled");
        $("#formulationTeam li").attr("data-toggle","modal");
		$("#approvedemp li").attr("data-toggle","modal");
		$("#approvedemp li span").attr("data-toggle","modal");
		$("#formulationTeam li span").attr("data-toggle","modal");
        if($("#approvedDate").val() ==	""){
        	$('#stragey_formulation_Form input[type="text"]').removeAttr("disabled");
        }else{
        	$('#stragey_formulation_Form input[type="text"]').not("#approvedDate").removeAttr("disabled");
        }
		$('#stragey_formulation_Form select').removeAttr("disabled");
		$("#approve_str,#reset_str").hide();
      });

      /*$("#approve_str").click(function () {
        $("#approve_str").hide();
        $("#reset_str").show();
      });*/

      /*$("#reset_str").click(function () {
        $("#reset_str").hide();
        $("#approve_str").show();
      });*/

      $(document).on("click","#edit_perspective",function () {
    	  if(perspectiveeditpermission == false){
    		  return false;
    	  }
    	  $(this).hide();
        
        $(".perspectivesave").show();
        $('#perspective_form textarea').removeAttr("disabled");
    	$('#perspective_form input[type="text"]').removeAttr("disabled");
		$('#perspective_form input[type="checkbox"]').removeAttr("disabled");
		$('#perspective_form select').removeAttr("disabled");
      });

      	$(document).on("click","#edit_objective",function () {
        	if(objectiveeditpermission ==	false){
        		return false
        	}
      		$(this).hide();
        	$('#objective_Form textarea').removeAttr("disabled");
        	$('#objective_Form input[type="text"]').removeAttr("disabled");
			$('#objective_Form input[type="checkbox"]').removeAttr("disabled");
			$('#objective_Form select').removeAttr("disabled");
        	$(".objectivesave").show();
      	});

      $("#save_objective").click(function () {
    	  if(objectiveeditpermission){
        	  $("#edit_objective").show();
    	  }
        $("#save_objective").hide();
        $(".obj_name").prop("disabled", true);
        $(".obj_date").prop("disabled", true);
        $(".obj_imp").prop("disabled", true);
        $(".obj_weight").prop("disabled", true);
        $(".obj_subweight").prop("disabled", true);
        $(".obj_status").prop("disabled", true);
      });

      $(document).on("click","#edit_kpi",function () {
    	  if(kpieditpermission	==	false){
    		  return false;
    	  }
    	  $(this).hide();
        $(".kpisavebtn").show();
        $('#kpi_Form textarea').removeAttr("disabled");
    	$('#kpi_Form input[type="text"]').removeAttr("disabled");
		$('#kpi_Form input[type="checkbox"]').removeAttr("disabled");
		$('#kpi_Form select').removeAttr("disabled");
      });

      $("#save_kpi").click(function () {
    	  if(kpieditpermission){
    		  $("#edit_kpi").show();
    	  }
        
        $("#save_kpi").hide();
        $(".kpi_name").prop("disabled", true);
        $(".kpi_polarity").prop("disabled", true);
        $(".kpi_mf").prop("disabled", true);
        $(".kpi_data").prop("disabled", true);
        $(".kpi_type").prop("disabled", true);
        $(".kpi_currency").prop("disabled", true);
        $(".kpi_threshold").prop("disabled", true);
        $(".kpi_actual").prop("disabled", true);
        $(".kpi_target").prop("disabled", true);
        $(".kpi_ytd").prop("disabled", true);
        $(".kpi_date").prop("disabled", true);
        $(".kpi_weight").prop("disabled", true);
        $(".kpi_subweight").prop("disabled", true);
        $(".kpi_status").prop("disabled", true);
      });

      $("#search1").click(function () {
        $("#search_section1").show();
        $("#search1").hide();
      });

      $("#close_search1").click(function () {
    	  $("#pespectivesearch").val('');
    	  var value = $("#pespectivesearch").val().toLowerCase();
    		$("#persp-colored-div .line-shortner span").filter(function(e) {
    			var FindElement	=	$(this).closest("div.col").find(".perspectiveitem").attr("id");
    			if($(this).text().toLowerCase().indexOf(value) > -1){
    				var ele = $("#"+FindElement).closest("div.row").find(".pt-3");
    				$(ele).closest("div.row").show()
    			}else{
    				var ele = $("#"+FindElement).closest("div.row").find(".pt-3");
    				$(ele).closest("div.row").hide()
    			}
  	    });  
        $("#search1").show();
        $("#search_section1").hide();
      });

      $("#search2").click(function () {
        $("#search_section2").show();
        $("#search2").hide();
      });

      $("#close_search2").click(function () {
    	  $("#objectivesearch").val('');
    	  var value = $("#objectivesearch").val().toLowerCase();
    		$("#object-colored-div .line-shortner span").filter(function(e) {
    			var FindElement	=	$(this).closest("div.col").find(".objectiveitem").attr("id");
    			if($(this).text().toLowerCase().indexOf(value) > -1){
    				var ele = $("#"+FindElement).closest("div.row").find(".pt-3");
    				$(ele).closest("div.row").show()
    			}else{
    				var ele = $("#"+FindElement).closest("div.row").find(".pt-3");
    				$(ele).closest("div.row").hide()
    			}
  	    });
        $("#search2").show();
        $("#search_section2").hide();
      });

      $("#search3").click(function () {
        $("#search_section3").show();
        $("#search3").hide();
      });

      $("#close_search3").click(function () {
    	  $("#kpisearch").val('')
    	  var value = $("#kpisearch").val().toLowerCase();
    		$("#kpi-colored-div .line-shortner span").filter(function(e) {
    			var FindElement	=	$(this).closest("div.col").find(".kpiitem").attr("id");
    			if($(this).text().toLowerCase().indexOf(value) > -1){
    				var ele = $("#"+FindElement).closest("div.row").find(".pt-3");
    				$(ele).closest("div.row").show()
    			}else{
    				var ele = $("#"+FindElement).closest("div.row").find(".pt-3");
    				$(ele).closest("div.row").hide()
    			}
  	    });
        $("#search3").show();
        $("#search_section3").hide();
      });
/*
      $(".daterangepicker-field").daterangepicker({
        forceUpdate: true,
        callback: function (startDate, endDate, period) {
          var title = startDate.format("L") + " – " + endDate.format("L");
          $(this).val(title);
        },
      });
*/
      $("#custom-tab").on("click", "button", function (e) {
        var CustomTabValue = this.dataset.value;
        if (CustomTabValue) {
          $(".customTabContent")
            .not("." + CustomTabValue)
            .hide();
          $("." + CustomTabValue).show();
        } else {
          $(".customTabContent").hide();
        }
        $(this).parent().find("button").removeClass("active");
        $(this).addClass("active");
        $(".active").attr("contenteditable", "true");
      });

      $("#timepicker_pop").timepicker();

      $(document).ready(function () {
        $("#kpiDataType").change(function () {
          var value = $("#kpiDataType").val();
          if (value == "Currency") {
            $("#currency_input").show();
          } else {
            $("#currency_input").hide();
          }
        });
      });


      $(document).ready(function () {
        $(".multi-select").select2();
        $(".multi-select-2").select2();
      });
      
      function collapseRight() {
	$(this).css('display', 'none');
	$('.collapse_arrow_right').css('display', 'block');
	var $body = $('body');
	$body.addClass('ini-hide');
	$body.removeClass('ini-show');
	initiativeBar();
}

function collapseLeft() {
	$(this).css('display', 'none');
	$('.collapse_arrow_left').css('display', 'block');
	var $body = $('body');
	$body.addClass('ini-show');
	$body.removeClass('ini-hide');
	initiativeBar();
}

function initiativeBar() {
	var $body = $('body');
	if (!($body.hasClass('submenu-closed')) && !($body.hasClass('side-closed'))
		&& !($body.hasClass('ini-hide')) && !($body.hasClass('ini-show'))) {
		$('#initiative_sidebar').css('left', '230px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '485px');
	} else if (($body.hasClass('submenu-closed'))
		&& !($body.hasClass('side-closed'))
		&& !($body.hasClass('side-closed-hover'))
		&& !($body.hasClass('ini-hide')) && !($body.hasClass('ini-show'))) {
		$('#initiative_sidebar').css('left', '230px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '484px');
	} else if (($body.hasClass('side-closed-hover'))
		&& !($body.hasClass('side-closed'))
		&& !($body.hasClass('submenu-closed'))
		&& !($body.hasClass('ini-hide')) && !($body.hasClass('ini-show'))) {
		$('#initiative_sidebar').css('left', '260px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '484px');
	} else if (($body.hasClass('submenu-closed'))
		&& ($body.hasClass('side-closed'))
		&& !($body.hasClass('side-closed-hover'))
		&& !($body.hasClass('ini-hide')) && !($body.hasClass('ini-show'))) {
		$('#initiative_sidebar').css('left', '59px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '313px');
	} else if (($body.hasClass('side-closed'))
		&& ($body.hasClass('side-closed-hover'))
		&& !($body.hasClass('submenu-closed'))
		&& !($body.hasClass('ini-hide')) && !($body.hasClass('ini-show'))) {
		$('#initiative_sidebar').css('left', '260px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '514px'); // end default
	} else if (($body.hasClass('submenu-closed'))
		&& ($body.hasClass('ini-hide')) && !($body.hasClass('side-closed'))) {
		$('#initiative_sidebar').css('left', '-10px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '244px');
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
		$('#section').css('margin-left', '244px');
	} else if (($body.hasClass('ini-hide'))
		&& ($body.hasClass('side-closed-hover'))
		&& !($body.hasClass('submenu-closed'))
		&& ($body.hasClass('side-closed'))) {
		$('#initiative_sidebar').css('left', '-260px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '275px'); // end hide
	} else if (($body.hasClass('submenu-closed'))
		&& ($body.hasClass('ini-show')) && !($body.hasClass('side-closed'))) {
		$('#initiative_sidebar').css('left', '230px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '485px');
	} else if (($body.hasClass('submenu-closed'))
		&& ($body.hasClass('side-closed')) && ($body.hasClass('ini-show'))) {
		$('#initiative_sidebar').css('left', '60px');
		$('#section').css('margin-top', '34px');
		$('#section').css('margin-right', '15px');
		$('#section').css('margin-bottom', '0');
		$('#section').css('margin-left', '314px');
	} else if (($body.hasClass('ini-show')) && !($body.hasClass('side-closed'))
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

$(document).on("focusout","#formula",function(){
    $(this).css("border","1px solid black");
});

function checkmodalisclosedornot(){
	
	if($('#kpi_add').is(':visible')	==	true){
		$(document.body).addClass('modal-open');				
	}
	if($('.kpi_formula_popup').is(':visible')	==	false){
		$(document.body).addClass('modal-open');				
	}
	setTimeout(function(){  $(document.body).addClass('modal-open');
	}, 1000);
}

$("#closePopupId").click(function(){
	checkmodalisclosedornot();
});

function handleFormulaAdd(component) {
	validateFormula("Add",component);
}

function handleFormulaEvent(component) {
	$("#measureNames").empty();
	//$(".formuladynamicdesc").hide();
	$(".formulacontentdesc").html(getformulabuilder('if'));
	$(".formulaheaderdesc").html('if'.toUpperCase());
	$("#formula_actual").css("border","1px solid black");
	var getkpiformulaval	=	$("#kpi_formula").val();
	$("#formula").val(getkpiformulaval);
	$.ajax({
		url : "/stratroom/retrieveNodeKeyList",
		success : function(nodekeylist) {
			$.each(nodekeylist, function(index, nodekey) {
				addList('#measureNames', nodekey.measureName, nodekey.nodeKey)
			});
		}
	});
	$('.kpi_formula_popup').on('shown.bs.modal', function () {
	    $('#formula_actual').focus();
	});
}

function addList(id, text, value) {
	if(nodeKeyMap[value] == null){
		nodeKeyMap[value] = text;	
	}
	$(id).append(`<li class="list-group-item" onclick="updateFormula(${value})">${text}</li>`);
}

function updateFormula(input,formuladesc) {
	if(formuladesc !=	"" && formuladesc !=	null){
		if($(".formuladynamicdesc").css("display")	==	"none"){
			$(".formuladynamicdesc").show();
		}
		$(".formulacontentdesc").html(getformulabuilder(formuladesc));
		$(".formulaheaderdesc").html(input.toUpperCase());
	}
	var box = $(".kpi_formula_popup #formula_actual");
	var mesaureName = nodeKeyMap[input];
	var formulaval	=	box.val();
	var checkdefaultvalue	=	false;
	
	if(mesaureName	==	undefined){
		mesaureName = 	input;
	}
	mesaureName	=	(mesaureName	==	undefined?"":mesaureName);
	
	var finalval	=	formulaval + mesaureName;
	box.val(finalval);
}

function handleFormulaValidate(component) {
	validateFormula("Validate",component);
}

function validateFormula(inputType, component){
	var formulaValue;
	formulaValue = $("#formula_actual").val();
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
					$("#formula_actual").val(formulaValue);
					$("#formula_actual").css("border","2px solid red");
				}
				return false;
			}else{
				if(inputType == "Validate"){
					if(component == "KPI"){
						$("#formula_actual").val(formulaValue);
						$("#formula_actual").css("border","2px solid green");
					}
				}else{
					if(component == "KPI"){
					$("#kpi_formula").val("");
					$("#kpi_formula").val(formulaValue);
					$("#kpiFieldName").val($("#fieldId").val());
					$("#closePopupId").click();
					}
				}
			}
		}
	});
}

function handlescoreeventdelete(){
	
	var id	=	$("#deletescoreid").val();
	var type=	$("#deleterecordtype").val();
	if(id	==	"" || type	==	""){
		return false;
	}
	var requestmethod	=	"delete";
	var url	=	"";
	if(type	==	"kpi"){
		url	=	"/stratroom/kpi/strategyFormulation/" + id;
	}else if(type	==	"scorecardperspective"){
		url	=	"/stratroom/scorecard/" + id;
		requestmethod	=	"get";
	}else if(type	==	"scorecardobjective"){
		url	=	"/stratroom/objectives/strategyFormulation/" + id;
	}else if(type	==	"formularregister"){
		url	=	"/stratroom/strategyFormulation/" + id;
	}
	
	$.ajax({
		url : url,
		type : requestmethod,
		contentType : "application/json",
		success : function(data, status) {
			if(type	==	"formularregister"){
				localStorage.setItem("formulation_pagenumber","");
			}
			if(type	==	"scorecardperspective"){
				if(data.scoreCardValue !=	undefined){
					$("#perspectiveForm input[name='defaultscr']").val(data.scoreCardValue.defaultscr);
					var defaultscr = $("#perspectiveForm input[name='defaultscr']").val();
					if (defaultscr == "true") {
						alert("Default ScoreCard Template cannot be deleted");
					} else {
						var methodType = 'delete'
						$.ajax({
							url : "/stratroom/scorecard/" + id,
							type : methodType,
							contentType : "application/json",
							success : function(data, status) {
								location.reload(true);
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

$("#pespectivesearch").on("keyup", function() {
	    var value = $(this).val().toLowerCase();
  		$("#persp-colored-div .line-shortner span").filter(function(e) {
  			var FindElement	=	$(this).closest("div.col").find(".perspectiveitem").attr("id");
  			if($(this).text().toLowerCase().indexOf(value) > -1){
  				var ele = $("#"+FindElement).closest("div.row").find(".pt-3");
  				$(ele).closest("div.row").show()
  			}else{
  				var ele = $("#"+FindElement).closest("div.row").find(".pt-3");
  				$(ele).closest("div.row").hide()
  			}
	    });
  });
  
  $("#objectivesearch").on("keyup", function() {
	    var value = $(this).val().toLowerCase();
  		$("#object-colored-div .line-shortner span").filter(function(e) {
  			var FindElement	=	$(this).closest("div.col").find(".objectiveitem").attr("id");
  			if($(this).text().toLowerCase().indexOf(value) > -1){
  				var ele = $("#"+FindElement).closest("div.row").find(".pt-3");
  				$(ele).closest("div.row").show()
  			}else{
  				var ele = $("#"+FindElement).closest("div.row").find(".pt-3");
  				$(ele).closest("div.row").hide()
  			}
	    });
  });
  
  $("#kpisearch").on("keyup", function() {
	    var value = $(this).val().toLowerCase();
  		$("#kpi-colored-div .line-shortner span").filter(function(e) {
  			var FindElement	=	$(this).closest("div.col").find(".kpiitem").attr("id");
  			if($(this).text().toLowerCase().indexOf(value) > -1){
  				var ele = $("#"+FindElement).closest("div.row").find(".pt-3");
  				$(ele).closest("div.row").show()
  			}else{
  				var ele = $("#"+FindElement).closest("div.row").find(".pt-3");
  				$(ele).closest("div.row").hide()
  			}
	    });
  });
  
  $("#activities_search2").click(function () {
	    $("#activities_search_section2").show();
	    $("#activities_search2").hide();
	});

	$("#activities_close_search2").click(function () {
		$("#searchactivities").val('');
	    $("#activities_search2").show();
	    $("#activities_search_section2").hide();
	    var value = $("#searchactivities").val().toLowerCase();
		$("#sub-ini-box_view_users .employe_content_border h5").filter(function(e) {
			var FindElement	=	$(this).closest("div.employe_content_border");
			//var FindElement	=	$(this).closest("div.employe_content_border").find(".profile_content");
			if($(this).text().toLowerCase().indexOf(value) > -1){
				$(FindElement).attr("style","display:block !important");
			}else{
				$(FindElement).attr("style","display:none !important");
			}
	    });
		$("#activities_search2").show();
	    $("#activities_search_section2").hide();
	});

	$("#searchactivities").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("#sub-ini-box_view_users .employe_content_border h5").filter(function(e) {
			var FindElement	=	$(this).closest("div.employe_content_border");
			//var FindElement	=	$(this).closest("div.employe_content_border").find(".profile_content");
			if($(this).text().toLowerCase().indexOf(value) > -1){
				$(FindElement).attr("style","display:block !important");
			}else{
				$(FindElement).attr("style","display:none !important");
			}
	    });
	});

	
$(document).on("click","#allusersactivities",function(){
  		
  		var propcheck	=	$(this).is(":checked");
  		if(propcheck	==	true){
  			$("#sub-ini-box_view_users input[name='activities_owner[]']").each(function(index,value){
  				$(this).prop("checked","checked");
  			});
  		}
  		if(propcheck	==	false){
  			$("#sub-ini-box_view_users input[name='activities_owner[]']").each(function(index,value){
  				$(this).prop("checked",false);
  			});
  		}
});	
