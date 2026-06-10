
var business_impact = "";
var recommandation_text = "";
var radioValue = "";
var swottype = "";
var currentEmp		=	$("#userPrincipal").val();
var topparentswotDetails	=	{};
var reporteelist = [];
var kpiList	=	[];
var swotupdateDescription	=	[];
var pageNo =  $('#pagenumber').val();
var deptlist	=	{};
var pestelmodPermission	=	[];
var createpermission	=	false;
var editpermission		=	false;
var deletepermission	=	false;
var viewpermission		=	false;
var meetingsloadcontent	=	false;

var reccreatepermission	=	false;
var receditpermission	=	false;
var recdeletepermission	=	false;
var recviewpermission	=	false;
var recloadcontent	=	false;

var actioncreatepermission	=	false;
var actioneditpermission	=	false;
var actiondeletepermission	=	false;
var actionviewpermission	=	false;
var actionloadcontent	=	false;

var attcreatepermission	=	false;
var atteditpermission	=	false;
var attdeletepermission	=	false;
var attviewpermission	=	false;
var attloadcontent	=	false;


var swotGlobalid	=	"";

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

function getpestelpermission(){
	$.ajax({
		type : "GET",
		url : "/stratroom/user/modulePermissions?moduleName=PESTEL",
		async:false,
		success : function(data) {
			if(data.PESTEL !=	undefined && !jQuery.isEmptyObject(data.PESTEL)){
				pestelmodPermission	=	data.PESTEL.PESTEL;
				//rec
				if(data.PESTEL.Recommendations.privilegeCreate !=	undefined && data.PESTEL.Recommendations.privilegeCreate == "TRUE"){	
					reccreatepermission	=	true;
				}
				if(data.PESTEL.Recommendations.privilegeUpdate !=	undefined && data.PESTEL.Recommendations.privilegeUpdate == "TRUE"){
					receditpermission	=	true;
				}
				if(data.PESTEL.Recommendations.privilegeDelete !=	undefined && data.PESTEL.Recommendations.privilegeDelete == "TRUE"){
					recdeletepermission	=	true;
				}
				if(data.PESTEL.Recommendations.privilegeView !=	undefined && data.PESTEL.Recommendations.privilegeView == "TRUE"){
					recviewpermission	=	true;
				}
				//action
				if(data.PESTEL.Actions.privilegeCreate !=	undefined && data.PESTEL.Actions.privilegeCreate == "TRUE"){	
					actioncreatepermission	=	true;
				}
				if(data.PESTEL.Actions.privilegeUpdate !=	undefined && data.PESTEL.Actions.privilegeUpdate == "TRUE"){
					actioneditpermission	=	true;
				}
				if(data.PESTEL.Actions.privilegeDelete !=	undefined && data.PESTEL.Actions.privilegeDelete == "TRUE"){
					actiondeletepermission	=	true;
				}
				if(data.PESTEL.Actions.privilegeView !=	undefined && data.PESTEL.Actions.privilegeView == "TRUE"){
					actionviewpermission	=	true;
				}
				//Attachments
				if(data.PESTEL.Attachments.privilegeCreate !=	undefined && data.PESTEL.Attachments.privilegeCreate == "TRUE"){	
					attcreatepermission	=	true;
				}
				if(data.PESTEL.Attachments.privilegeUpdate !=	undefined && data.PESTEL.Attachments.privilegeUpdate == "TRUE"){
					atteditpermission	=	true;
				}
				if(data.PESTEL.Attachments.privilegeDelete !=	undefined && data.PESTEL.Attachments.privilegeDelete == "TRUE"){
					attdeletepermission	=	true;
				}
				if(data.PESTEL.Attachments.privilegeView !=	undefined && data.PESTEL.Attachments.privilegeView == "TRUE"){
					attviewpermission	=	true;
				}
			}
		}
	});
}

$(function () {
	getpestelpermission();
	getpageName();
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
    $('input[name="date"]').daterangepicker(
        {
            singleDatePicker: true,
            showDropdowns: true,
            minYear: 1901,
            maxYear: parseInt(moment().format("YYYY"), 10),
        },
        function (start, end, label) {
            var years = moment().diff(start, "years");
            alert("You are " + years + " years old!");
        }
    );

    $("#objective_owner").formSelect();
    $("select.select_all")
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
	
	swottype	=	localStorage.getItem("pestelcall_list");
	if(swottype	==	"" || swottype	==	undefined){
		swottype = "POLITICAL";	
	}		
	if(swottype	==	"POLITICAL"){
		$("#political_list").addClass("activeswotwrap");	
	}else if(swottype	==	"ECONOMICAL"){
		$("#economical_list").addClass("activeswotwrap");	
	}else if(swottype	==	"SOCIAL"){
		$("#social_list").addClass("activeswotwrap");	
	}else if(swottype	==	"TECHNOLOGICAL"){
		$("#technological_list").addClass("activeswotwrap");	
	}else if(swottype	==	"ENVIRONMENTAL"){
		$("#environmental_list").addClass("activeswotwrap");	
	}else if(swottype	==	"LEGAL"){
		$("#legal_list").addClass("activeswotwrap");	
	}
	
	$.each(reporteelist,function(ownkey,empvalue){
		if(empvalue.id	==	currentEmp){
			topparentswotDetails	=	{"id":empvalue.id,"name":empvalue.name,"image":empvalue.image,"dept":empvalue.dept};
		}
	});
	if(pestelmodPermission.privilegeCreate !=	undefined && pestelmodPermission.privilegeCreate == "TRUE"){	
		createpermission	=	true;
	}
	
	if(pestelmodPermission.privilegeUpdate !=	undefined && pestelmodPermission.privilegeUpdate == "TRUE"){
		editpermission	=	true;
	}
	
	if(pestelmodPermission.privilegeDelete !=	undefined && pestelmodPermission.privilegeDelete == "TRUE"){
		deletepermission	=	true;
	}
	
	if(pestelmodPermission.privilegeView !=	undefined && pestelmodPermission.privilegeView == "TRUE"){
		viewpermission	=	true;
	}
	
	if(enableaccesscontrolMenu	==	true){
//		createpermission	=	true;
		//editpermission		=	true;
		//deletepermission	=	true;
		//viewpermission		=	true;
	}
	
	if(createpermission == true || editpermission == true || deletepermission == true || viewpermission == true){
		meetingsloadcontent	=	true;
	}
	
	if(reccreatepermission == true || receditpermission == true || recdeletepermission == true || recviewpermission == true){
		recloadcontent	=	true;
	}
	
	if(attcreatepermission == true || atteditpermission == true || attdeletepermission == true || attviewpermission == true){
		attloadcontent	=	true;
	}
	
	if(actioncreatepermission == true || actioneditpermission == true || actiondeletepermission == true || actionviewpermission == true){
		actionloadcontent	=	true;
	}
	
	if(reccreatepermission == false){
		$(".addmeetingoption").remove();
		$(".closemeetingoption").show();
	}else{
		$(".closemeetingoption").hide();
	}
	
	if(!actioncreatepermission){
		$(".addactmeetingoption").remove();
		$(".closeactmeetingoption").show();
	}else{
		$(".closeactmeetingoption").hide();
	}
	
	if(!attcreatepermission){
		$(".addfilemeetingoption").remove();
	}
	if(meetingsloadcontent){
		getPestelList(swottype);
	}else{
		$(".sidebarcontent,.container-fluid,.page-header").show();
	}
	getreportee();

});

function getpageName() {	
	$.ajax({
		url : "/stratroom/pages/" + pageNo,
		async:false,
		success : function(data) {
			$(".page-title").html(data.pageName);
			if($("#userPrincipal").val()	!= $("#userPrincipalnavigate").val()){
				$("."+data.id).addClass("homepageHighlight");
				
			}
			if($(".superusertopmenu").hasClass(data.id)){
				$(".subusermenuname").text(data.pageName);
			}
		}
	}); 
}

function getNewOwners(oldowners,newowners) {	
	var oldown =oldowners?.split(',');
	var newown = newowners?.split(',');
       var str2=[];
	for(var i=0;i<newown.length;i++){
        if(oldown.indexOf(newown[i]) == -1){
				str2+=newown[i]+',';
       };
    }
	var newowner =[];
    newowner=str2.slice(0, -1);
	return newowner;
}

function subinitiativePorfileContent(usersimg,resultId){
	var subinitiativeUser	=	"";
	var returnresult	=	[];
	var functionParams	=	resultId+','+'"edit"';
	var functionName	=	"";
	var modalPopupName	=	"";
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
	
	var htmlcontent	=	'<input type="hidden" value="'+userseslectedData.join(',')+'" id="activities_selected_user_'+resultId+'">';
	returnresult['userownerlist_data']	=	htmlcontent;
	functionName	=	"handleMultioownersuserevent";
	
	if(usersimg !=	undefined && usersimg.length 	!=	0){
		var badgeincrement	=	false;		
		$.each(usersimg,function(index,users){
			var username	=	hasWhiteSpaceName(users.name);
			if(username == "" ||	username == " "){
				username	=	"User";
			}
			
			var userProfileConcate = ((users.image ==	undefined || users.image == "")?'data-name="'+username+'" class="rounded-circle swotuserimage" ':' class="rounded-circle" src="'+users.image+'"');		
			subinitiativeUser 	+=	'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
			if(usersimg.length >= 3 && index >= 2 && index <= 2){
				subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
				subinitiativeUser 	+=	'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
				badgeincrement	=	true;
				return false;
			}
		});
		if(badgeincrement	==	false){
			subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+</span></li>';
		}
	}else{
		var users 	=	topparentswotDetails;
		var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
		var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle swotuserimage' ":" class='rounded-circle' src='"+users.image+"'");
		subinitiativeUser 	=	'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
		subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+</span></li>';
	}
	returnresult['userownerlist']	=	subinitiativeUser;
	return returnresult;
}

function recommendationPorfileContent(usersimg,resultId){
	var returnresult	=	[];
	var functionParams	=	resultId;
	var functionName	=	"";
	var modalPopupName	=	'data-toggle="modal" data-target="#addpeople"';
	var profileBadgeIncrement 	=	"";	
	var htmlcontent	=	'<input type="hidden" class="rec_multiownerid" id="rec_multiownerid_'+resultId+'" value="'+usersimg+'">';
	var multiowners	=	usersimg.split(",");
	
	returnresult['userownerlist_data']	=	htmlcontent;
	
	functionName	=	"recommendationaddpeople";
	
	if(jQuery.isEmptyObject(reporteelist)){
		$.ajax({
			url: "/stratroom/user/moduleAccessUserList?moduleName=PESTEL",
			success : function(data, status) {
				var subinitiativeUser	=	"";
				if(multiowners.length !=	data.length){
					var profileBadgeIncrement 	=	(multiowners.length >= 3?parseInt(multiowners.length)-parseInt(2):"");
					var badgeinc	=	false;
					var subinitiativeUser	=	"";
					$.each(data,function(key,users){
							$.each(multiowners,function(index,selectedvalue){
								if(selectedvalue ==	users.id){
									var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
									var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle rec_res_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
									
									if(index <= 2){
										subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
									}
									 
									if(multiowners.length >= 3 && index >= 2 && index <= 2){
										badgeinc	=	true;
										subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
										subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
										return false;
									}
								}
							});
					});
					if(badgeinc	==	false){
						subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
					}
					returnresult['userownerlist']	=	subinitiativeUser;
				}else{
					var profileBadgeIncrement 	=	(data.length >= 3?parseInt(data.length)-parseInt(2):0);
					var badgeinc	=	false;
					var subinitiativeUser	=	"";
					$.each(data,function(index,users){
						var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
						var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle rec_res_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
						if(index <= 2){
							subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
						}
						
						if(multiowners.length >= 3 && index >= 2 && index <= 2){
							badgeinc	=	true;
							subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
							subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
							return false;
						}
						
					});
					
					if(badgeinc	==	false){
						subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
					}
					returnresult['userownerlist']	=	subinitiativeUser;
				}
			}
		});
	}else{
		if(multiowners.length !=	reporteelist.length){
			var profileBadgeIncrement 	=	(multiowners.length >= 3?parseInt(multiowners.length)-parseInt(2):"");
			var badgeinc	=	false;
			var subinitiativeUser	=	"";
			$.each(reporteelist,function(key,users){
					$.each(multiowners,function(index,selectedvalue){
						if(selectedvalue ==	users.id){
							var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
							var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle rec_res_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
							
							if(index <= 2){
								subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
							}
							 
							if(multiowners.length >= 3 && index >= 2 && index <= 2){
								badgeinc	=	true;
								subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
								subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
								return false;
							}
						}
					});
			});
			if(badgeinc	==	false){
				subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
			}
			returnresult['userownerlist']	=	subinitiativeUser;
		}else{
			var profileBadgeIncrement 	=	(reporteelist.length >= 3?parseInt(reporteelist.length)-parseInt(2):0);
			var badgeinc	=	false;
			var subinitiativeUser	=	"";
			$.each(reporteelist,function(index,users){
				var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
				var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle rec_res_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
				if(index <= 2){
					subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
				}
				
				if(multiowners.length >= 3 && index >= 2 && index <= 2){
					badgeinc	=	true;
					subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
					subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
					return false;
				}
				
			});
			
			if(badgeinc	==	false){
				subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
			}
			returnresult['userownerlist']	=	subinitiativeUser;
		}
	}
	return returnresult;
}

function actionsPorfileContent(usersimg,resultId){
	
	var returnresult	=	[];
	var functionParams	=	resultId;
	var functionName	=	"actionsaddpeople";
	var modalPopupName	=	'data-toggle="modal" data-target="#addpeopleactions"';
	var profileBadgeIncrement 	=	"";	
	var htmlcontent	=	'<input type="hidden" class="action_multiownerid" id="action_multiownerid_'+resultId+'" value="'+usersimg+'">';
	var multiowners	=	usersimg.split(",");
	returnresult['userownerlist_data']	=	htmlcontent;
	
	if(jQuery.isEmptyObject(reporteelist)){	
		$.ajax({
			url: "/stratroom/user/moduleAccessUserList?moduleName=PESTEL",
			success : function(data, status) {
				var subinitiativeUser	=	"";
				if(multiowners.length !=	data.length){
					var profileBadgeIncrement 	=	(multiowners.length >= 3?parseInt(multiowners.length)-parseInt(2):"");
					var badgeinc	=	false;
					var subinitiativeUser	=	"";
					$.each(data,function(key,users){
							$.each(multiowners,function(index,selectedvalue){
								if(selectedvalue ==	users.id){
									var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
									var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
									
									if(index <= 2){
										subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
									}
									 
									if(multiowners.length >= 3 && index >= 2 && index <= 2){
										badgeinc	=	true;
										subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
										subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
										return false;
									}
								}
							});
					});
					if(badgeinc	==	false){
						subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
					}
					returnresult['userownerlist']	=	subinitiativeUser;
				}else{
					var profileBadgeIncrement 	=	(data.length >= 3?parseInt(data.length)-parseInt(2):0);
					var badgeinc	=	false;
					var subinitiativeUser	=	"";
					$.each(data,function(index,users){
						var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
						var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
						if(index <= 2){
							subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
						}
						
						if(multiowners.length >= 3 && index >= 2 && index <= 2){
							badgeinc	=	true;
							subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
							subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
							return false;
						}
						
					});
					
					if(badgeinc	==	false){
						subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
					}
					returnresult['userownerlist']	=	subinitiativeUser;
				}
			}
		});
	}else{
		if(multiowners.length !=	reporteelist.length){
			var profileBadgeIncrement 	=	(multiowners.length >= 3?parseInt(multiowners.length)-parseInt(2):"");
			var badgeinc	=	false;
			var subinitiativeUser	=	"";
			$.each(reporteelist,function(key,users){
					$.each(multiowners,function(index,selectedvalue){
						if(selectedvalue ==	users.id){
							var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
							var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
							
							if(index <= 2){
								subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
							}
							 
							if(multiowners.length >= 3 && index >= 2 && index <= 2){
								badgeinc	=	true;
								subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
								subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
								return false;
							}
						}
					});
			});
			if(badgeinc	==	false){
				subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
			}
			returnresult['userownerlist']	=	subinitiativeUser;
		}else{
			var profileBadgeIncrement 	=	(reporteelist.length >= 3?parseInt(reporteelist.length)-parseInt(2):0);
			var badgeinc	=	false;
			var subinitiativeUser	=	"";
			$.each(reporteelist,function(index,users){
				var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
				var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
				if(index <= 2){
					subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
				}
				
				if(multiowners.length >= 3 && index >= 2 && index <= 2){
					badgeinc	=	true;
					subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
					subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
					return false;
				}
				
			});
			
			if(badgeinc	==	false){
				subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
			}
			returnresult['userownerlist']	=	subinitiativeUser;
		}
	}
	return returnresult;
}


function getPestelList(swottype) {
	
	
	var objData = {
        flagType: swottype
    }
    
	var pagenourl	=	"";
	if(pageNo	!=	undefined && pageNo	!=	""){
		pagenourl	=	"pageId="+pageNo;
	}
	var navigateempId = $("#userPrincipalnavigate").val();
	var employeeId="";
	if(navigateempId!=null || navigateempId!=""){
		employeeId=navigateempId;
	}
	else{
		employeeId=currentEmp;
	}
	

    $.ajax({
        url: "/stratroom/retrievePestelAnalysisList/"+employeeId+"?"+ pagenourl,
        type: "GET",
		data: objData,
        contentType: "application/json",
        success: function (response, status) {
			pestelListShow(response,swottype);
        },
        error:function(err){
        	$(".sidebarcontent,.container-fluid,.page-header").show();
        }
    });
}



function pestelListShow(swotList,typerequest) {
    var listData = "";
    var flag_ta = "";
    var swot_text = "";
    var swot_type = "";
    var swot_impact = "";
    var swot_inputform = "";
    var swot_multipleowners = "";
    var swot_attachment = "";
    var ownerlistData = [];
	var functionParams	=	"";
	var colorwrap		=	"politicalwrap";
	var swottexttype	=	"P";
	if(typerequest	==	"POLITICAL"){
		functionParams	=	'""'+','+'"POLITICAL"'+','+'"add"';
	}else if(typerequest	==	"ECONOMICAL"){
		functionParams	=	'""'+','+'"ECONOMICAL"'+','+'"add"';
		swottexttype	=	"E";
		colorwrap		=	"economicalwrap";
	}else if(typerequest	==	"SOCIAL"){
		functionParams	=	'""'+','+'"SOCIAL"'+','+'"add"';
		swottexttype	=	"S";
		colorwrap		=	"socialwrap";
	}else if(typerequest	==	"TECHNOLOGICAL"){
		functionParams	=	'""'+','+'"TECHNOLOGICAL"'+','+'"add"';
		swottexttype	=	"T";
		colorwrap		=	"technologicalwrap";
	}else if(typerequest	==	"ENVIRONMENTAL"){
		functionParams	=	'""'+','+'"ENVIRONMENTAL"'+','+'"add"';
		swottexttype	=	"E";
		colorwrap		=	"environmentalwrap";
	}else if(typerequest	==	"LEGAL"){
		functionParams	=	'""'+','+'"LEGAL"'+','+'"add"';
		swottexttype	=	"L";
		colorwrap		=	"legalwrap";
	}
	
	var bodyRows 	= 	'<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><div class="card cardBox"><div class="row"><div class="col-12" data-toggle="modal" data-target="#strength_desc_add_popup"  onclick=handleswotevent('+functionParams+'); style="text-align: center;color: #c3c3c3;padding: 86px 0;cursor: pointer;"><span><i style="font-size: 24px; padding-bottom: 8px;" class="fas fa-plus"></i></span><h5>Add New</h5></div></div></div></div>';
	
	if(swotList.length	!=	0){
		if(createpermission	==	false){
			bodyRows	=	"";
		}
		if(meetingsloadcontent	==	false){
			return false;
		}
	    $.each(swotList, function (i, List) {
	        var swotchildtemplate 	= 	$('#swotchild-template').html();
			var status_flag_text 	= 	List.pestelAnalysisValue.status_flag
			var flagcolor			=	"#20eaab";
	        if (status_flag_text	==	"success") {
	            flagcolor			=	"#20eaab";
	        }else if (status_flag_text	==	"warning") {
	            flagcolor			=	"#fffb10";
	        }else if (status_flag_text	==	"danger") {
	            flagcolor			=	"#ea2020";
	        } else {
	            flagcolor			=	"#20eaab";
	        }
	
	        swot_text 	= 	List.pestelAnalysisValue.name ? List.pestelAnalysisValue.name : "";
			var swot_full_text 	= 	swot_text;
			/*if(typeof(swot_full_text)	==	"string" && swot_full_text.length >= 60){
				swot_text	=	swot_text.substring(0,65)+'...';	
			}*/
	        swot_type 	= 	List.pestelAnalysisValue.type ? List.pestelAnalysisValue.type : "";
	        impactname 	= 	(List.pestelAnalysisValue.impact !=	undefined?List.pestelAnalysisValue.impact:"");
			if(List.pestelAnalysisValue.impact_name !=	undefined){
				impactname	=	List.pestelAnalysisValue.impact_name;
			}
			
			var impact_full_text 	= 	impactname;
			/*if(typeof(impact_full_text)	==	"string" && impact_full_text.length >= 35){
				impactname	=	impactname.substring(0,35)+'...';	
			}*/
			
	        swot_multipleowners = 	(List.pestelAnalysisValue.multipleOwners !=	undefined?List.pestelAnalysisValue.multipleOwners:"");
	        swot_attachment = 	(List.pestelAnalysisValue.attachmentUrl !=	undefined?List.pestelAnalysisValue.attachmentUrl:"");
			
			$.each(reporteelist,function(ownkey,empvalue){
				if(empvalue.id	==	List.createdBy){
					topparentswotDetails	=	{"id":empvalue.id,"name":empvalue.name,"image":empvalue.image,"dept":empvalue.dept};
				}
			});
			
			var resultPorfileContent	=	subinitiativePorfileContent(List.multipleOwerlist,List.id);
			var datestring 				= 	List.pestelAnalysisValue.nextduedate;
			var subdaterangeformatted	=	"";
			if(List.pestelAnalysisValue.nextduedate !=	undefined){
				subdaterangeformatted	=	dateFormatedtohumanread(datestring);	
			}
			
			var enableeditBtn	=	"";
			var enableOwnerBtn	=	"";
			var enableRecommendation	=	"";
			var enableAction	=	"";
			var enableFileupload	=	"";
			
			if(editpermission	==	true){
	        	enableeditBtn	=	`<i class="fas fa-pen" rel="tooltip" data-placement="bottom" title="Edit" data-toggle="modal" data-target="#strength_desc_add_popup" onclick="handleswotevent(`+List.id+`,'`+typerequest+`','edit')"></i>`;
	        }
	        
	        if(editpermission	==	true || createpermission	==	true || deletepermission	==	true || meetingsloadcontent	==	true){
	        	enableOwnerBtn	=	`data-toggle="modal" data-target=".swot_add_multiuser_popup" id="initiativeactivitieUser_`+List.id+`" style="cursor: pointer;"`;
	        }
			
	        if(recloadcontent){
	        	enableRecommendation	=	`data-toggle="modal" data-target="#recommendation" onclick="handlerecommendationevent(`+List.id+`,'`+typerequest+`','recommendation')"`;
			}
			if(actionloadcontent){
				enableAction	=	`data-toggle="modal" data-target="#action" onclick="handleactionevent(`+List.id+`,'`+typerequest+`','recommendation')"`;
			}
			if(attloadcontent){
				enableFileupload	=	`data-toggle="modal" data-target="#uploaded_files"`;
			}
	        
			var enabledeleteBtn	=	"";
	        if(deletepermission	==	true){
	        	enabledeleteBtn	=	`<i class="fas fa-trash" rel="tooltip" data-placement="bottom" title="Delete" onclick="handleswotevent(`+List.id+`,'`+typerequest+`','delete')"></i>`;
	        }
	
			var subInitdetail = Mustache.render(swotchildtemplate,
							{
								id:List.id,
								name : swot_text,
								fullname:swot_full_text,
								impactfullname:impact_full_text,
								type : swot_type,
								colorwrap:colorwrap,
								swottexttype:swottexttype,
								typerequest:typerequest,
								flagcolor:flagcolor,
								impactname:impactname,
								departmentname:(List.department !=	undefined?List.department:""),
								dateRange : subdaterangeformatted,
								swot_attachment:swot_attachment,
								subinitiativeUser:resultPorfileContent['userownerlist'],
								subinitiativeUserSlecteditem:resultPorfileContent['userownerlist_data'],
								enableeditBtn:enableeditBtn,
								enabledeleteBtn:enabledeleteBtn,
								enableOwnerBtn:enableOwnerBtn,
								enableRecommendation:enableRecommendation,
								enableAction:enableAction,
								enableFileupload:enableFileupload
							});
			
			bodyRows = bodyRows + subInitdetail;
		});

		var swoteParenttemplate = 	$('#swot-strength-template-parent').html();
		var htmlValue 			= 	Mustache.render(swoteParenttemplate, {
			bodyRows : bodyRows
		});
	}else{
		if(createpermission	==	false){
			bodyRows	=	"";
		}
		var swoteParenttemplate = 	$('#swot-strength-template-parent').html();
		var htmlValue 			= 	Mustache.render(swoteParenttemplate, {
			bodyRows : bodyRows
		});
	}

	$("#strength_section").html(htmlValue);
	$('.swotuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
	$('[data-toggle="tooltip"]').tooltip();
	$('[rel="tooltip"]').tooltip();
	$(".sidebarcontent,.container-fluid,.page-header").show();
}



$(document).on("click", ".savebt", function () {
    savePestel(this);
});


$(document).on("click", ".savebt1", function () {
    updatePestel(this);
});



function savePestel(vthis) {
    var swotObj = getPestelObj(vthis);
    var methodType = 'post';
    $.ajax({
        url: "/stratroom/pestelAnalysis",
        type: methodType,
        contentType: "application/json",
        data: JSON.stringify(swotObj),
        success: function (data, status) {
            $(vthis).parents("tr").find("td:first-child input").prop("id", data.id || "")
            location.reload(true);
        }
    });
}

function updatePestel(vthis) {
    var swotObj = getPestelObj(vthis);
    var methodType = 'put';
    $.ajax({
        url: "/stratroom/pestelAnalysis",
        type: methodType,
        contentType: "application/json",
        data: JSON.stringify(swotObj),
        success: function (data, status) {
            $(vthis).parents("tr").find("td:first-child input").prop("id", data.id || "")
            location.reload(true);
        }
    });
}


function getPestelObj(vthis) {

    var pestelObj = ""
    var p = ""
    var factors = ""
    var status_flag = ""
    var nextdue = ""
    var attachmenturl = ""
    var multipleOwners = ""
    var inputbusinesssValue = []
    var inputrecommantionValue = []
    var finalInputbusinesssValue = ""
    var finalinputrecommantionValue = ""  
    var p = $(vthis).parents(".pestelrowdatalist")
    var id = p.find("td:first-child input").attr("id")
    factors = p.find("#factors option:selected").val()

    var businessImpact = ""
    var businessText = p.find("#viewimpact").attr("impactvalue")
    if (businessText) {
        businessImpact = p.find("#addbusinessimpact").attr("business_impact")
        if (businessText.includes("|")) {
            if (businessImpact) {
                inputbusinesssValue = businessText.split("|")
                inputbusinesssValue = [...inputbusinesssValue, business_impact];
                finalInputbusinesssValue = inputbusinesssValue.join("|");
            } else {
                finalInputbusinesssValue = businessText
            }
        } else {
            if (businessImpact) {
                var str = businessText.concat("|", businessImpact);
                inputbusinesssValue = str.split("|")
                finalInputbusinesssValue = inputbusinesssValue.join("|");
            } else {
                finalInputbusinesssValue = businessText
            }
        }
    } else {
        var textvalue = p.find("#addbusinessimpact").attr("business_impact")
        if (textvalue) {
            finalInputbusinesssValue = textvalue
        } else {
            finalInputbusinesssValue = ""
        }
    }

    if (radioValue) {
        status_flag = radioValue
    } else {
        status_flag = p.find("#statusFlag").attr("flagValue")
    }

    var recommandation = ""
    var recommandationText = p.find("#viewrecommend").attr("recommendValue")
    if (recommandationText) {
        recommandation = p.find("#addrecommend").attr("recommandation_text")
        if (recommandationText.includes("|")) {
            if (recommandation) {
                inputrecommantionValue = recommandationText.split("|")
                inputrecommantionValue = [...inputrecommantionValue, recommandation];
                finalinputrecommantionValue = inputrecommantionValue.join("|");
            } else {
                finalinputrecommantionValue = recommandationText
            }
        } else {
            if (recommandation) {
                var str = recommandationText.concat("|", recommandation);
                inputrecommantionValue = str.split("|")
                finalinputrecommantionValue = inputrecommantionValue.join("|");
            } else {
                finalinputrecommantionValue = recommandationText
            }
        }
    } else {
        var textvalue = p.find("#addrecommend").attr("recommandation_text")
        if (textvalue) {
            finalinputrecommantionValue = textvalue
        } else {
            finalinputrecommantionValue = ""
        }
    }


    var peopleList = p.find("#mutipleOwners").attr("value")

    if (peopleList) {
        var peopleList1 = p.find("#mutipleOwners").attr("peopleList")
        if (peopleList1) {
            multipleOwners = peopleList1
        } else {
            multipleOwners = peopleList
        }
    } else {
        peopleList = p.find("#mutipleOwners").attr("peopleList")
        if (peopleList) {
            multipleOwners = peopleList
        } else {
            multipleOwners = ""
        }
    }

    if (id) {
        nextdue = p.find(".datepicker2").val()
    } else {
        nextdue = p.find("#datepicker_pop").val()
    }

    attachmenturl = p.find(".file-input1").attr("attach")
    if (attachmenturl) {
        attachmenturl = p.find(".file-input1").attr("atturl")
        if (attachmenturl) {
            console.log("find attach url");
        } else {
            attachmenturl = p.find(".file-input1").attr("attach")
        }
    } else {
        attachmenturl = p.find(".file-input1").attr("atturl")
        if (attachmenturl) {
            console.log("find attach url");
        } else {
            attachmenturl = ""
        }
    }

    factors.trim()
    if (id) {
        pestelObj = {
            "id": id,         
            "active": 0,
            "pestelAnalysisValue": {
                "factors": factors ? factors : "",
                "businessImpact": finalInputbusinesssValue ? finalInputbusinesssValue : "",
                "status_flag": status_flag ? status_flag : "",
                "recommandation": finalinputrecommantionValue ? finalinputrecommantionValue : "",
                "multipleOwners": multipleOwners ? multipleOwners : "",
                "nextdue": nextdue ? nextdue : "",
                "attachmentUrl": attachmenturl ? attachmenturl : ""
            }
        }
    } else {
        pestelObj = {
            "active": 0,           
            "pestelAnalysisValue": {
                "factors": factors ? factors : "",
                "businessImpact": finalInputbusinesssValue ? finalInputbusinesssValue : "",
                "status_flag": status_flag ? status_flag : "",
                "recommandation": finalinputrecommantionValue ? finalinputrecommantionValue : "",
                "multipleOwners": multipleOwners ? multipleOwners : "",
                "nextdue": nextdue ? nextdue : "",
                "attachmentUrl": attachmenturl ? attachmenturl : ""
            }
        }
    }

    return pestelObj;
}




function deleteRow(tableID) {
    try {
        var table = document.getElementById(tableID);
        var rowCount = table.rows.length;

        for (var i = 0; i < rowCount; i++) {
            var row = table.rows[i];
            var chkbox = row.cells[0].childNodes[0];
            if (null != chkbox && true == chkbox.checked) {

                var pestelid = chkbox.id;
                if (pestelid != null || !pestelid == undefined) {
                    console.log(pestelid)
                    var methodType = 'delete';
                    $.ajax({
                        url: "/stratroom/pestelAnalysis/" + pestelid,
                        type: methodType,
                        contentType: "application/json",
                        success: function (data, status) {

                        }
                    });
                }

                table.deleteRow(i);
                rowCount--;
                i--;
            }
        }
    } catch (e) {
        alert(e);
    }
}

function addRow(tableID) {

    var table = document.getElementById(tableID);

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    row.className = "pestelrowdatalist"
    row.set

    var cell1 = row.insertCell(0);
    var element1 = document.createElement("input");
    element1.type = "checkbox";
    element1.name = "chkbox[]";
    cell1.appendChild(element1);

    var cell2 = row.insertCell(1);
    cell2.innerHTML = `<select
                        name="factors"
                        id="factors"
                        class="meetinp"
                        onchange="this.className=this.options[this.selectedIndex].className"
                      >
                        <option value="null">Choose Factor</option>
                        <option
                          class="POLITICAL"
                          style="color: #5E653B;"
                          value="POLITICAL"
                          >POLITICAL</option
                        >
                        <option
                          class="ECONOMICAL"
                          style="color: #812820;"
                          value="ECONOMICAL"
                          >ECONOMICAL
                        </option>
                        <option
                          class="SOCIAL"
                          style="color: #83B0B5;"
                          value="SOCIAL"
                          >SOCIAL</option
                        >
                        <option
                          class="TECHNOLOGICAL"
                          style="color: #E6B02A;"
                          value="TECHNOLOGICAL"
                          >TECHNOLOGICAL
                        </option>
                        <option
                          class="ENVIRONMENTAL"
                          style="color: #D24E39;"
                          value="ENVIRONMENTAL"
                          >ENVIRONMENTAL
                        </option>
                        <option
                          class="LEGAL"
                          style="color: #356160;"
                          value="LEGAL"
                          >LEGAL</option
                        >
                      </select>`;

    var cell3 = row.insertCell(2);
    cell3.innerHTML =
        '<a href="#" data-toggle="modal" data-target="#pol_impact" class="rounded-circle rc-tgrn" > <i class="far fa-eye"></i></a> <a href="#" data-toggle="modal" data-target="#impact" class="rounded-circle rc-tgrn" id="addbusinessimpact"><i class="fa fa-plus" aria-hidden="true"></i></a>';

    var cell4 = row.insertCell(3);
    cell4.innerHTML =
        '<a href="#" data-toggle="modal" data-target="#flag"> <img src="images/flag-green.png" alt="status" width="23px" height="23px"> </a>';

    var cell5 = row.insertCell(4);
    cell5.innerHTML =
        ' <a href="#" data-toggle="modal" data-target="#view_recommend" class="rounded-circle rc-tgrn" > <i class="far fa-eye"></i></a> <a href="#" data-toggle="modal" data-target="#recommend" class="rounded-circle rc-tgrn" id="addrecommend"><i class="fa fa-plus" aria-hidden="true"></i></a>';

    var cell6 = row.insertCell(5);
    cell6.innerHTML =
        '<div class="d-flex flex-column"><ul class="list-unstyled order-list d-flex"><li class="avatar avatar-sm"><img class="rounded-circle sub_init_img" src="../../assets/images/user/user9.jpg" alt="user" width="50"></li> <li class="avatar avatar-sm"><img class="rounded-circle sub_init_img" src="../../assets/images/user/user9.jpg" alt="user" width="50"></li><li class="avatar avatar-sm"><span _ngcontent-hhc-c5="" class="badge">+3</span></li><div class="image-upload"><label for="file-input"><li _ngcontent-hhc-c5="" class="avatar avatar-sm"><a href="#" class="favgs" data-toggle="modal" data-target="#addpeople"> <span _ngcontent-hhc-c5="" class="badge" id="mutipleOwners">+<span id="count"> </span></span></a></li></label></div> </ul> </div>';

    var cell7 = row.insertCell(6);
    cell7.innerHTML =
        '<div role="wrapper" class="gj-timepicker gj-timepicker-md"><input class="form-control gj-textbox-md datepicker_here" data-language="en" id="datepicker_pop"/><i class="gj-icon" role="right-icon">event</i></div>';
    $("#datepicker_pop").datepicker();

    var cell8 = row.insertCell(7);
    cell8.innerHTML =
        '<a href="#" data-toggle="modal" data-target="#view_recommend" class="rounded-circle rc-tgrn">' +
        '<i class="far fa-eye"></i>' +
        '</a>' +
        '<label for="file-input1" class="forfileinput1"><span class="favgs"><i class="fa fa-paperclip fa-lg" style="font-size:20px" aria-hidden="true"></i></span></label> <input class="file-input1" style="display:none" type="file"/>';

    var cell9 = row.insertCell(8);
    cell9.innerHTML =
        '<a href="#"> <button class="fa fa-save savebt" ></button></a>';
}



var people_selectedList = ""
function recommendationaddpeople(id){
	$("#responsibleid").val(id);
	var id	=	$("#rec_multiownerid_"+id).val();
	if(id	==	""){
		id	=	currentEmp;
	}
	id		=	id.split(",");
	getreporteeeList(id,".listusers");
	$('.swotrecmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
	$('#addpeople .sub-ini-box').slimscroll({
		height: '450px',
		size: '3px',
		color: '#9c9c9c'
	});
}

function actionsaddpeople(id){
	$("#actionsresponsibleid").val(id);
	var id	=	$("#action_multiownerid_"+id).val();
	if(id	==	""){
		id	=	currentEmp;
	}
	id		=	id.split(",");
	getreporteeeListAction(id,".actionslistusers");
	$('.swotrecmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
	$('#addpeopleactions .sub-ini-box').slimscroll({
		height: '450px',
		size: '3px',
		color: '#9c9c9c'
	});
}

$(document).on('show.bs.modal', '.modal', function (event) {
    var zIndex = 1040 + (10 * $('.modal:visible').length);
    $(this).css('z-index', zIndex);
    setTimeout(function() {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
});

$("#peopleSave").click(function () {
	var multiowners	= 	$("input[name='swot_rec_owner[]']:checked").map(function(){
    	return this.value;
	}).get();
	
	var res_peopleid	=	$("#responsibleid").val();
	if(multiowners.length	==	0){
		$("#rec_multiownerid_"+res_peopleid).val(currentEmp);
	}else{
		$("#rec_multiownerid_"+res_peopleid).val(multiowners.join(','));
	}
    $("#addpeople").modal("hide")
	checkmodalisclosedornot();
})

$("#actionspeopleSave").click(function () {
    var multiowners	= 	$(".actionslistusers input[name='swot_rec_owner[]']:checked").map(function(){
    	return this.value;
	}).get();

	var res_peopleid	=	$("#actionsresponsibleid").val();
	if(multiowners.length	==	0){
		$("#action_multiownerid_"+res_peopleid).val(currentEmp);
	}else{
		$("#action_multiownerid_"+res_peopleid).val(multiowners.join(','));
	}
    $("#addpeopleactions").modal("hide")
	checkmodalisclosedornot();
})


var multipleOwnerslist = []

function getswotDetails(id) {
    var methodType = 'get';
    $.ajax({
        url: "/stratroom/pestelAnalysis/" + id,
        contentType: "application/json",
        success: function (data, status) {
            multipleOwnerslist = data.pestelAnalysisValue.multipleOwners
            getreporteeeList(multipleOwnerslist.split(","),".listusers");
        }
    });
}

function getreportee() {
	
	if (jQuery.isEmptyObject(reporteelist)) {
		$.ajax({
			url: "/stratroom/user/moduleAccessUserList?moduleName=PESTEL",
			async:false,
			success : function(employeeList) {
				reporteelist = employeeList;
			}
		});
	} 
}

function getreporteeeListAction(id,listtype) {
    $(listtype).empty();
    var methodType = 'get';
    var listusers = "";
    $.ajax({
        url: "/stratroom/user/moduleAccessUserList?moduleName=PESTEL",
        contentType: "application/json",
        success: function (data, status) {
            $.each(data, function (i, List) {
                var status = ""
                var image = "";
                if (!List.image == undefined || !List.image == "" || !List.image == undefined) {
                    image = List.image;
                }
                if (id) {
                    $.each(id, function (i, item) {
                        if (List.id == item) {
                            status = "checked"
                        }
                    });
                    if(data.length	==	0){
						$(".showalluseractions").css('display','none');
					}
					
					if(data.length	==	id.length){
						$("#allusersactions").prop("checked","checked");
					}else{
						$("#allusersactions").prop("checked",false);
					}
                    var sts = ""
                    if (status == "checked") {
                        sts = "checked"
                    } else {
                        sts = "unchecked"
                    }
                    listusers = '<tr>'
                        + '<td><input type="checkbox" name="chk" id="' + List.id + '" ' + sts + '/></td>'
                        + '<td><span >' + List.name + '</span></td>'
                        + '<td><span ><img src="' + image + '" /></span></td>'
                        + '</tr>';
					var username 	=	((List.name ==	undefined || List.name == "")?"User":List.name);
					var userProfileConcate 	= 	((image ==	undefined || image == "")?"data-name='"+username+"' class='rounded-circle swotrecmultiuserimage' ":" class='rounded-circle' src='"+image+"'");
					var subinitiativeUser 	=	'<div class="d-flex flex-row employe_content_border sub_initiative_details"><div class="d-flex flex-column flex-fill profile_content"><div class="d-flex flex-row"><div class="form-check"><label class="form-check-label"><input id="" class="form-check-input" name="swot_action_owner[]" '+sts+' type="checkbox" value="'+List.id+'"><span class="form-check-sign"> <span class="check"></span></span></label></div><div class="d-flex flex-column init_flex_profile" style="margin-top: 3%;text-align: center;"><h5>'+username+'</h5></div><div class="img_details" style="width: 20%;"><img alt="'+username+'" '+userProfileConcate+'></div></div></div></div>';
                    $(listtype).append(subinitiativeUser);
                    $('.swotrecmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
                } else {
                    listusers = '<tr>'
                        + '<td><input type="checkbox" name="chk" id="' + List.id + '"/></td>'
                        + '<td><span >' + List.name + '</span></td>'
                        + '<td><span ><img src="' + image + '" /></span></td>'
                        + '</tr>';
					var username 	=	((List.name ==	undefined || List.name == "")?"User":List.name);
					var userProfileConcate 	= 	((image ==	undefined || image == "")?"data-name='"+username+"' class='rounded-circle swotrecmultiuserimage' ":" class='rounded-circle' src='"+image+"'");
					var subinitiativeUser 	=	'<div class="d-flex flex-row employe_content_border sub_initiative_details"><div class="d-flex flex-column flex-fill profile_content"><div class="d-flex flex-row"><div class="form-check"><label class="form-check-label"><input id="" class="form-check-input" name="swot_action_owner[]" '+sts+' type="checkbox" value="'+List.id+'"><span class="form-check-sign"> <span class="check"></span></span></label></div><div class="d-flex flex-column init_flex_profile" style="margin-top: 3%;text-align: center;"><h5>'+username+'</h5></div><div class="img_details" style="width: 20%;"><img alt="'+username+'" '+userProfileConcate+'></div></div></div></div>';
                    $(listtype).append(subinitiativeUser);
                    $('.swotrecmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
                    //$(listtype).append(listusers);
                }

            });
        }
    });
}

function getreporteeeList(id,listtype) {
    $(listtype).empty();
    var methodType = 'get';
    var listusers = "";
    $.ajax({
        url: "/stratroom/user/moduleAccessUserList?moduleName=PESTEL",
        contentType: "application/json",
        success: function (data, status) {
            $.each(data, function (i, List) {
                var status = ""
                var image = ""
                if (!List.image == undefined || !List.image == "" || !List.image == undefined) {
                    image = List.image;
                }
                if (id) {
                    $.each(id, function (i, item) {
                        if (List.id == item) {
                            status = "checked"
                        }
                    });
                    
                    if(data.length	==	0){
						$(".showallusericon").css('display','none');
					}
					
					if(data.length	==	id.length){
						$("#allusersaccess").prop("checked","checked");
					}else{
						$("#allusersaccess").prop("checked",false);
					}
					
                    var sts = ""
                    if (status == "checked") {
                        sts = "checked"
                    } else {
                        sts = "unchecked"
                    }
                    listusers = '<tr>'
                        + '<td><input type="checkbox" name="chk" id="' + List.id + '" ' + sts + '/></td>'
                        + '<td><span >' + List.name + '</span></td>'
                        + '<td><span ><img src="' + image + '" /></span></td>'
                        + '</tr>';
					var username 	=	((List.name ==	undefined || List.name == "")?"User":List.name);
					var userProfileConcate 	= 	((image ==	undefined || image == "")?"data-name='"+username+"' class='rounded-circle swotrecmultiuserimage' ":" class='rounded-circle' src='"+image+"'");
					var subinitiativeUser 	=	'<div class="d-flex flex-row employe_content_border sub_initiative_details"><div class="d-flex flex-column flex-fill profile_content"><div class="d-flex flex-row"><div class="form-check"><label class="form-check-label"><input id="" class="form-check-input" name="swot_rec_owner[]" '+sts+' type="checkbox" value="'+List.id+'"><span class="form-check-sign"> <span class="check"></span></span></label></div><div class="d-flex flex-column init_flex_profile" style="margin-top: 3%;text-align: center;"><h5>'+username+'</h5></div><div class="img_details" style="width: 20%;"><img alt="'+username+'" '+userProfileConcate+'></div></div></div></div>';
                    $(listtype).append(subinitiativeUser);
                    $('.swotrecmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
                } else {
                    listusers = '<tr>'
                        + '<td><input type="checkbox" name="chk" id="' + List.id + '"/></td>'
                        + '<td><span >' + List.name + '</span></td>'
                        + '<td><span ><img src="' + image + '" /></span></td>'
                        + '</tr>';
					var username 	=	((List.name ==	undefined || List.name == "")?"User":List.name);
					var userProfileConcate 	= 	((image ==	undefined || image == "")?"data-name='"+username+"' class='rounded-circle swotrecmultiuserimage' ":" class='rounded-circle' src='"+image+"'");
					var subinitiativeUser 	=	'<div class="d-flex flex-row employe_content_border sub_initiative_details"><div class="d-flex flex-column flex-fill profile_content"><div class="d-flex flex-row"><div class="form-check"><label class="form-check-label"><input id="" class="form-check-input" name="swot_rec_owner[]" '+sts+' type="checkbox" value="'+List.id+'"><span class="form-check-sign"> <span class="check"></span></span></label></div><div class="d-flex flex-column init_flex_profile" style="margin-top: 3%;text-align: center;"><h5>'+username+'</h5></div><div class="img_details" style="width: 20%;"><img alt="'+username+'" '+userProfileConcate+'></div></div></div></div>';
                    $(listtype).append(subinitiativeUser);
                    $('.swotrecmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
                    //$(listtype).append(listusers);
                }

            });
        }
    });
}

function checkmodalisclosedornot(){
	
	if($('#recommendation').is(':visible')	==	true){
		$(document.body).addClass('modal-open');				
	}
	if($('#addpeople').is(':visible')	==	false){
		$(document.body).addClass('modal-open');				
	}
	
	if($('#uploaded_files').is(':visible')	==	true){
		$(document.body).addClass('modal-open');				
	}
	
	if($('#file_upload_popup').is(':visible')	==	false){
		$(document.body).addClass('modal-open');				
	}
	
	setTimeout(function(){  $(document.body).addClass('modal-open');
	}, 1000);
	
}
					
$("#closePopupId,#actionsclosePopupId").click(function(){
	checkmodalisclosedornot();
});

function notes(tableID) {
        var table = document.getElementById(tableID);
 		var users 	=	topparentswotDetails;
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
		rowCount	=	parseInt(parseInt(rowCount)-parseInt(1));
        var cell1 = row.insertCell(0);
        cell1.innerHTML ='<textarea class="form-control recommendation" cols="5" name="recommendation[]" rows="5" > </textarea>';

		var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
		var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle rec_res_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
		var subinitiativeUser 	=	'<li class="avatar avatar-sm" data-toggle="modal" data-target="#addpeople" onclick="recommendationaddpeople('+rowCount+')"><img '+userProfileConcate+' alt="'+username+'"></li>';

        var cell2 = row.insertCell(1);
        cell2.innerHTML =
          '<input type="hidden" class="rec_multiownerid" id="rec_multiownerid_'+rowCount+'" name="multiowners[]" value="'+users.id+'"><div class="d-flex flex-column"><ul class="list-unstyled order-list d-flex" id="recommendationMultiowner_'+rowCount+'">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-sm" > <a href="#" class="favgs" data-toggle="modal" data-target="#addpeople" > <span _ngcontent-hhc-c5="" onclick="recommendationaddpeople('+rowCount+')" class="badge recommendationmultiowner" >+<span id="count"> </span></span ></a> </li></ul> </div>';
        var cell3 = row.insertCell(2);
		if(deletepermission	==	true){
			cell3.innerHTML =	'<i class="fas fa-trash remove-notes" data-toggle="tooltip" data-placement="bottom" title="Delete" style="cursor: pointer;"></i>';
			$(row).addClass("notes_clone");
		}
        
		$('.rec_res_multiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
		$("#recommendationbody ul li.avatar").css("cursor","pointer");
		$('[data-toggle="tooltip"]').tooltip();
		if($('#recommendation').is(':visible')){
			$("#recommendationtype").val('create')
		}
		if($('#action').is(':visible')){
			$("#actiontype").val('create')
		}
      }

      function notes_del(tableID) {
        try {
          var table = document.getElementById(tableID);
          var rowCount = table.rows.length;

          for (var i = 0; i < rowCount; i++) {
            var row = table.rows[i];
            var chkbox = row.cells[0].childNodes[0];
            if (null != chkbox && true == chkbox.checked) {
              table.deleteRow(i);
              rowCount--;
              i--;
            }
          }
        } catch (e) {
          alert(e);
        }
      }

function recommendationsubmit(){
		var recommendation	=	[];
		var idindex	=	0;
		var reclastlength =$("#recommendationcount").val();
		var recnewlength =$('.recommendation').length;
		var diff ="";
		var check="";
		if(recnewlength>reclastlength){
		 diff=recnewlength-reclastlength;
		 check=recnewlength-diff;
		}
		$('.recommendation').each(function(val,index){
			var name		=	$(this).val();
			var multiowner	=	$(this).closest("td").next("td").find('.rec_multiownerid').val();
			var ownersname = 	localStorage.getItem('ownersname_'+idindex);
			var oldowners = 	localStorage.getItem('recommendowners_'+idindex);
			var newowners;
			if((check != "" && idindex>=check) || reclastlength==0 || oldowners == null || name != ownersname){
				newowners= multiowner;
			}
			else{
				newowners = getNewOwners(oldowners,multiowner);
			}
			recommendation.push({"id":idindex,"name":name,"multipleOwners":multiowner,"newMultipleOwners":newowners});
			idindex++;
		});
		var swotObj 	= 	swotupdateDescription;
		swotObj['recommendationmethod']	=	true;
		if(swotObj.pestelAnalysisValue.recommendation !=	undefined){
			swotObj.pestelAnalysisValue.recommendation	=	recommendation;
		}else{
			swotObj.pestelAnalysisValue.recommendation	=	recommendation;
		}
			swotupdateDescription.pestelAnalysisValue.newMultipleOwners = "";
		for(var i=0;i<swotObj.pestelAnalysisValue.actions.length;i++){
			swotupdateDescription.pestelAnalysisValue.actions[i].newMultipleOwners = "";
		}
	    $.ajax({
	        url: "/stratroom/pestelAnalysis",
	        type: "put",
	        contentType: "application/json",
	        data: JSON.stringify(swotObj),
	        success: function (data, status) {
				$.notify("Success: Updated Successfully", {
							  style: 'success',
							  className: 'graynotify'
							});
				var systemip = 	localStorage.getItem('systemip');
				var type	=	$("#recommendationtype").val();
				var count	=	$("#recommendationcount").val();
				if(count < $('.recommendation').length){
					type	=	"create";
				}else if(count > $('.recommendation').length){
					type	=	"delete";
				}else if(count == $('.recommendation').length){
					type	=	"update";
				}
				if($("#recommendationtype").val() ==	"create"){
					type	=	"create";
				}
				var action 	= 	"";
				if(type	==	"create"){
					action	=	capitialize() +" Recommendation Created";
				}else if(type	==	"update"){
					action	=	capitialize() +" Recommendation Modified";
				}else if(type	==	"delete"){
					action	=	capitialize() +" Recommendation Deleted";
				}
				var navigateempId = $("#userPrincipalnavigate").val();
				var data	=	{"createdBy":currentEmp,"userId":navigateempId,"typeId":swotObj.id,"action":action,"systemIp":systemip};
				auditrailpage(data,'recommendation');
				$("#recommendation").modal("toggle");
				$(".recommendationclose").click();
	        },
			error: readErrorMsg
	    });
}

function auditrailpage(data,type){
	$.ajax({
		url:"/stratroom/auditTrail",
		type:"post",
		async:false,
		contentType:"application/JSON",
		data:JSON.stringify(data),
		success:function(res){
			
		},error:function(){
			if(type	==	"recommendation"){
				$("#recommendation").modal("toggle");
				$(".recommendationclose").click();
			}else if(type	==	"action"){
				$("#action").modal("toggle");
				$(".actionclose").click();
			}else if(type== "file"){
				$('#attachementuploadfile').val('');	
            	$("#closeUpload").click();
			}else if(type== "file1"){
				$('#attachementuploadfile1').val('');	
            	$("#closeUpload").click();
            	$('#file_upload_popup1').modal('hide');
			}else{
				checkmodalisclosedornot();
            	$("#deleteAttachmentModal").modal("hide");
			}
		}
	});
}

function actionssubmit(){
		var recommendation	=	[];
		var idindex	=	0;
		var actlastlength =$("#actioncount").val();
		var actnewlength =$('.pestelactions').length;
		var diff ="";
		var check="";
		if(actnewlength>actlastlength){
		 diff=actnewlength-actlastlength;
		 check=actnewlength-diff;
		}
		$('.pestelactions').each(function(val,index){
			var name		=	$(this).val();
			var multiowner	=	$(this).closest("tr").find('.action_multiownerid').val();
			var bydate		=	$(this).closest("tr").find('.bydate').val();
			var status		=	$(this).closest("tr").find('.actionstatuscheck').is(":checked");
			var ownersname = 	localStorage.getItem('ownername_'+idindex);
			var oldowners = 	localStorage.getItem('actionowners_'+idindex);
			var newowners;
			if((check != "" && idindex>=check) || actlastlength==0 || oldowners == null || name != ownersname){
				newowners= multiowner;
			}
			else{
				newowners = getNewOwners(oldowners,multiowner);
			}
			recommendation.push({"id":idindex,"name":name,"multipleOwners":multiowner,"newMultipleOwners":newowners,"bydate":bydate,"status":status});
			idindex++;
		});
		var swotObj 	= 	swotupdateDescription;
		swotObj['recommendationmethod']	=	true;
		if(swotObj.pestelAnalysisValue.actions !=	undefined){
			swotObj.pestelAnalysisValue.actions	=	recommendation;
		}else{
			swotObj.pestelAnalysisValue.actions	=	recommendation;
		}
		for(var i=0;i<swotObj.pestelAnalysisValue.recommendation.length;i++){
			swotupdateDescription.pestelAnalysisValue.recommendation[i].newMultipleOwners = "";
			}
			swotupdateDescription.pestelAnalysisValue.newMultipleOwners = "";
	    $.ajax({
	        url: "/stratroom/pestelAnalysis",
	        type: "put",
	        contentType: "application/json",
	        data: JSON.stringify(swotObj),
	        success: function (data, status) {
				$.notify("Success: Updated Successfully", {
							  style: 'success',
							  className: 'graynotify'
							});
				var systemip = 	localStorage.getItem('systemip');
				var type	=	$("#actiontype").val();
				var count	=	$("#actioncount").val();
				if(count < $('.pestelactions').length){
					type	=	"create";
				}else if(count > $('.pestelactions').length){
					type	=	"delete";
				}else if(count == $('.pestelactions').length){
					type	=	"update";
				}
				if($("#actiontype").val() ==	"create"){
					type	=	"create";
				}
				var action 	= 	"";
				if(type	==	"create"){
					action	=	capitialize() +" Action Created";
				}else if(type	==	"update"){
					action	=	capitialize() +" Action Modified";
				}else if(type	==	"delete"){
					action	=	capitialize() +" Action Deleted";
				}
				var navigateempId = $("#userPrincipalnavigate").val();
				var data	=	{"createdBy":currentEmp,"userId":navigateempId,"typeId":swotObj.id,"action":action,"systemIp":systemip};
				auditrailpage(data,'action');
				$("#action").modal("toggle");
				$(".actionclose").click();
	        },
			error: readErrorMsg
	    });
}

function auditrailpage(data,type){
	$.ajax({
		url:"/stratroom/auditTrail",
		type:"post",
		async:false,
		contentType:"application/JSON",
		data:JSON.stringify(data),
		success:function(res){
			
		},error:function(){
			if(type	==	"recommendation"){
				$("#recommendation").modal("toggle");
				$(".recommendationclose").click();
			}else if(type	==	"action"){
				$("#action").modal("toggle");
				$(".actionclose").click();
			}
		}
	});
}

function action(tableID) {
        var table = document.getElementById(tableID);

        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);

        var cell1 = row.insertCell(0);
        var factor = rowCount;
		rowCount	=	parseInt(parseInt(rowCount)-parseInt(1));
		var users		=	topparentswotDetails;;
		var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
		var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
		var subinitiativeUser 	=	'<li class="avatar avatar-sm" data-toggle="modal" data-target="#addpeopleactions" onclick="actionsaddpeople('+rowCount+')"><img '+userProfileConcate+' alt="'+username+'"></li>';
		
        cell1.innerHTML =
          '<textarea class="form-control pestelactions" name="pestelactions[]" cols="5" rows="5" > </textarea>';

        var cell2 = row.insertCell(1);
        cell2.innerHTML =
          '<div class="form-group col-md-12" style="padding-right:1px;padding-left:1px;"><i class="far fa-calendar input-calender-icon1" style="right:-8%;"></i><input type="text" class="modal-custom-input date_pickers bydate" autocomplete="off" style="height: 34px !important;" data-language="en" name="bydate[]" id="bydate" style="width: 88% !important; height: 36px !important;" /></div>';

        var cell3 = row.insertCell(2);
        cell3.innerHTML =
          '<input type="hidden" class="action_multiownerid" id="action_multiownerid_'+rowCount+'" name="multiowners[]" value="'+users.id+'"><div class="d-flex flex-column"> <ul class="list-unstyled order-list d-flex" id="actionsMultiowner_'+rowCount+'"> '+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-sm"> <a href="#" class="favgs" data-toggle="modal" data-target="#addpeopleactions" > <span _ngcontent-hhc-c5="" onclick="actionsaddpeople('+rowCount+')" class="badge" >+</span > </a> </li></ul> </div>';

        var cell4 = row.insertCell(3);
        cell4.innerHTML = '<input type="checkbox" class="actionstatuscheck" >';
		$('.date_pickers').datepicker({
			language : 'en',
			autoClose : true,
			position : "bottom left",
			todayButton : true,
			onSelect : function(fd) {
				// $('.datepickers-container').hide();
			}
		});
		var cell5 = row.insertCell(4);
		if(deletepermission	==	true){
			cell5.innerHTML =	'<i class="fas fa-trash remove-action" data-toggle="tooltip" data-placement="bottom" title="Delete" style="cursor: pointer;"></i>';
			$(row).addClass("actions_clone");
		}
		$('.actions_multiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
		$("#actionbody ul li.avatar").css("cursor","pointer");
		$('[data-toggle="tooltip"]').tooltip();
      }

      function action_del(tableID) {
        try {
          var table = document.getElementById(tableID);
          var rowCount = table.rows.length;

          for (var i = 0; i < rowCount; i++) {
            var row = table.rows[i];
            var chkbox = row.cells[0].childNodes[0];
            if (null != chkbox && true == chkbox.checked) {
              table.deleteRow(i);
              rowCount--;
              i--;
            }
          }
        } catch (e) {
          alert(e);
        }
      }

$(document).ready(function () {
	$("#political_list").click(function () {
    	$("#strength_section").show();
		localStorage.setItem("pestelcall_list", "POLITICAL");
		$(".sub_initiative_sidebar_details").removeClass("activeswotwrap");
		$(this).addClass("activeswotwrap");
		$('#strength_section').empty();
    	getPestelList("POLITICAL");
    });

    $("#economical_list").click(function () {
    	$("#strength_section").show();
		localStorage.setItem("pestelcall_list", "ECONOMICAL");
		$(".sub_initiative_sidebar_details").removeClass("activeswotwrap");
		$(this).addClass("activeswotwrap");
		$('#strength_section').empty();
    	getPestelList("ECONOMICAL");
    });

    $("#social_list").click(function () {
    	$("#strength_section").show();
		localStorage.setItem("pestelcall_list", "SOCIAL");
		$(".sub_initiative_sidebar_details").removeClass("activeswotwrap");
		$(this).addClass("activeswotwrap");
		$('#strength_section').empty();
    	getPestelList("SOCIAL");
   	});

    $("#technological_list").click(function () {
    	$("#strength_section").show();
		localStorage.setItem("pestelcall_list", "TECHNOLOGICAL");
		$(".sub_initiative_sidebar_details").removeClass("activeswotwrap");
		$(this).addClass("activeswotwrap");
		$('#strength_section').empty();
    	getPestelList("TECHNOLOGICAL");
    });

	$("#environmental_list").click(function () {
    	$("#strength_section").show();
		localStorage.setItem("pestelcall_list", "ENVIRONMENTAL");
		$(".sub_initiative_sidebar_details").removeClass("activeswotwrap");
		$(this).addClass("activeswotwrap");
		$('#strength_section').empty();
    	getPestelList("ENVIRONMENTAL");
    });

	$("#legal_list").click(function () {
    	$("#strength_section").show();
		localStorage.setItem("pestelcall_list", "LEGAL");
		$(".sub_initiative_sidebar_details").removeClass("activeswotwrap");
		$(this).addClass("activeswotwrap");
		$('#strength_section').empty();
    	getPestelList("LEGAL");
    });
});


$(document).on("click", ".forfileinput1", function () {
    $(this).next().click()
})

function saveSwot() {
	var action	=	$("#swot_strength_Form input[name='action']").val();
	var flagtype=	$("#swot_strength_Form input[name='flagtype']").val();
    var swotObj = getSwotObj(flagtype,action);
	
    var methodType = 'post';
	var id	=	$("#swot_strength_Form input[name='id']").val();
	if(action	==	"edit"){
		swotObj.id 			= 	(id !=	""?id:"");
		methodType = 'put';	
	}
	
	if($("#activities_selected_user_"+id).val()){
		swotObj.pestelAnalysisValue.multipleOwners		= 	$("#activities_selected_user_"+id).val();
	}else{
		swotObj.pestelAnalysisValue.multipleOwners		= 	currentEmp;
	}

    $.ajax({
        url: "/stratroom/pestelAnalysis",
        type: methodType,
        contentType: "application/json",
        data: JSON.stringify(swotObj),
        success: function (data, status) {
            location.reload(true);
        },
		error:readErrorMsg
    });
}

function getdeptlist() {	
	if (jQuery.isEmptyObject(deptlist)) {
		$.ajax({
			url : "/stratroom/allDepartmentList",
			async:false,
			success : function(employeeList) {
				deptlist 	=	employeeList;
				/*$.each(deptlist, function(index, kpiObj) {
					addOptionDept(".departmentlist", kpiObj.name, kpiObj.id)
				});*/
			}
		});
	}
}

function populateKPIList(elementId,ownerid) {
	var numberOfOptions = $(elementId + ' > option').length;

	if(ownerid !=	""){
		$.ajax({
			url : "/stratroom/kpiListByDeptId/"+ownerid,
			async:false,
			success : function(kpiListValue) {
				kpiList = kpiListValue;
				$.each(kpiList, function(index, kpiObj) {
					addOption(elementId, kpiObj.kpiName, kpiObj.id)
				});
			}
		});
	}
}

function addOption(id, text, value) {
	$(id).append(`<option value="${value}">${text}</option>`);
}

function formvalidationerrorreset(){
	$('*[id*=-error]').each(function() {
	    $(this).remove();
	});
	$(".input-calender-icon").css("bottom","30%");
}

/*$('.chosen-select').chosen({}).change( function(obj, result) {
	$(".chosen-container-single").find('label.error').remove();
	if(result.selected	==	"" || result.selected	==	undefined){
		$('*[id=strength_impact-error]').each(function() {
		    $(this).remove();
		});
	}else{
		$(".chosen-container-single").find('label.error').remove();
	}
});*/

$('#swot_strength_Form #department_swot').change(function(){
	$('#strength_impact').find('option').remove().end();
	$('#swot_strength_Form #strength_impact').append(`<option value="">Choose impact</option>`);
	populateKPIList('#swot_strength_Form #strength_impact',$(this).val());
});

function handleswotevent(id,type, action) {
		
	if(type	==	"POLITICAL"){
		$("#swotheader_title").text("Political Description");
		$("#swotlabeltitle").text("Political");	
	} else if (type == "ECONOMICAL") {
        $("#swotheader_title").text("Economical Description");
		$("#swotlabeltitle").text("Economical");
    } else if (type == "SOCIAL") {
        $("#swotheader_title").text("Social Description");
		$("#swotlabeltitle").text("Social");
    } else if (type == "TECHNOLOGICAL") {
		$("#swotheader_title").text("Technological Description");
		$("#swotlabeltitle").text("Technological");
	} else if (type == "ENVIRONMENTAL") {
		$("#swotheader_title").text("Environmental Description");
		$("#swotlabeltitle").text("Environmental");
	} else if (type == "LEGAL") {
		$("#swotheader_title").text("Legal Description");
		$("#swotlabeltitle").text("Legal");
	}
	
	$("#swot_strength_Form").css('display', 'none');
	$("#swot_strength_Form").trigger('reset');
	$("#swot_strength_Form input[name='action']").val(action);
	$("#swot_strength_Form input[name='flagtype']").val(type);
	
	$('#strength_impact').find('option').remove().end();
	$('#swot_strength_Form #strength_impact').append(`<option value="">Choose impact</option>`);
	//populateKPIList('#swot_strength_Form #strength_impact',"");
	$('#swot_strength_Form #department_swot').empty();
	$('#swot_strength_Form #department_swot').append("<option value=''>Choose Department</option>");
	if(!jQuery.isEmptyObject(deptlist)) {
		$.each(deptlist,function(index,deptindex){
			addOption("#swot_strength_Form #department_swot", deptindex.name, deptindex.id)
		});
	}else{
		getdeptlist('#swot_strength_Form #department_swot',"");
		$.each(deptlist,function(index,deptindex){
			addOption("#swot_strength_Form #department_swot", deptindex.name, deptindex.id)
		});
	}
	/*$('.chosen-select').chosen({}).change( function(obj, result) {
		$(".chosen-container-single").find('label.error').remove();
		if(result.selected	==	"" || result.selected	==	undefined){
			$('*[id=strength_impact-error]').each(function() {
			    $(this).remove();
			});
			$(".chosen-container-single").append('<label id="strength_impact-error" class="error" for="strength_impact">This field is required.</label>');
		}else{
			$(".chosen-container-single").find('label.error').remove();
		}
	});
	
	$(".chosen-container-single").css("width","100%");*/
	if (action == 'add') {
		if(createpermission	==	false){	
			return false;
		}
		$("#swot_id_wrapper").css('display', 'none'); // Hide the ID input
		// when adding
		$("#swot_strength_Form").css('display', 'block');
		//$("#swot_strength_Form #strength_impact").trigger("chosen:updated");
		formvalidationerrorreset();
	}else if (action == 'delete') {
		if(deletepermission	==	false){
			return false;
		}
		$("#deleterecordid").val(id);
		$("#deleterecordtype").val(type);
		$('#deleteModalswot').modal('toggle');
		
		$(window).on("resize", function(){
		    $(".modal:visible").each(alignModal);
		}); 
		$(".modal").on("shown.bs.modal", alignModal);
		  
	} else { // view and edit
		$("#swot_strength_Form").css('display', 'block');
		formvalidationerrorreset();
		$("#swot_id_wrapper").css('display', 'block'); // Hide the ID input
		$('#swot_strength_Form #swot_id').prop("disabled", true);
		$("#swot_strength_Form #swot_id").val(id);
		if (action == 'edit') {
			if(editpermission	==	false){
				return false;
			}
			$("#swot_strength_Form input[name='id']").val(id);
		}
		if (action == 'view') {
			$('#swot_strength_Form input[type="text"]').prop("disabled", true);
			$('#swot_strength_Form input[type="checkbox"]').prop("disabled", true);
			$('#swot_strength_Form select').prop("disabled", true);
			$('#swot_strength_Form button[value="Save"]').css('display', 'none');
		}

		$.ajax({
			url : "/stratroom/pestelAnalysis/" + id,
			success : swotPopSuccessCallback,
			error:readErrorMsg
		});
	}
}

function handlerecommendationevent(id,type, action) {
	if((reccreatepermission	==	false || receditpermission	==	false) && recloadcontent	==	false){
		return false;
	}
	$("#recommendationtype").val('create');
	$("#recommendationcount").val(0);
	$('[data-toggle="tooltip"]').tooltip("hide");
	$('[rel="tooltip"]').tooltip("hide");
	getreportee();
	$.ajax({
		url : "/stratroom/pestelAnalysis/" + id,
		async:false,
		success : function(data){
			swotupdateDescription	=	data;
            swotupdateDescription.pestelAnalysisValue.newMultipleOwners = "";
			for(var i=0;i<swotupdateDescription.pestelAnalysisValue.actions.length;i++){
				swotupdateDescription.pestelAnalysisValue.actions[i].newMultipleOwners = "";
			}
			var num=swotupdateDescription.pestelAnalysisValue.recommendation.length;
			for(var i=0;i<num;i++){
			localStorage.setItem('ownersname_'+i,swotupdateDescription.pestelAnalysisValue.recommendation[i].name);
			localStorage.setItem('recommendowners_'+i,swotupdateDescription.pestelAnalysisValue.recommendation[i].multipleOwners);
			}
			recommendationPopSuccessCallback(data,id,type);	
		},
		error:readErrorMsg
	});
}

function handleactionevent(id,type, action) {
	if((actioncreatepermission	==	false || actioneditpermission	==	false) && actionloadcontent	==	false){
		return false;
	}
	$("#actiontype").val('create');
	$("#actioncount").val(0);
	$('[data-toggle="tooltip"]').tooltip("hide");
	$('[rel="tooltip"]').tooltip("hide");
	getreportee();
	$.ajax({
		url : "/stratroom/pestelAnalysis/" + id,
		async:false,
		success : function(data){
			swotupdateDescription	=	data;
			swotupdateDescription.pestelAnalysisValue.newMultipleOwners = "";
			for(var i=0;i<swotupdateDescription.pestelAnalysisValue.recommendation.length;i++){
				swotupdateDescription.pestelAnalysisValue.recommendation[i].newMultipleOwners = "";
			}
			var num=swotupdateDescription.pestelAnalysisValue.actions.length;
			for(var i=0;i<num;i++){
			localStorage.setItem('ownername_'+i,swotupdateDescription.pestelAnalysisValue.actions[i].name);
			localStorage.setItem('actionowners_'+i,swotupdateDescription.pestelAnalysisValue.actions[i].multipleOwners);
			}
			actionsPopSuccessCallback(data,id,type);	
		},
		error:readErrorMsg
	});
}

function recommendationPopSuccessCallback(swotList,typerequest) {
	var tablebody	=	"";
	$("#recommendationbody").empty();
	if(swotList.pestelAnalysisValue.recommendation !=	undefined && swotList.pestelAnalysisValue.recommendation !=	""){
		if(swotList.pestelAnalysisValue.recommendation.length	!=	0){
			$("#recommendationtype").val('update');
			$("#recommendationcount").val(swotList.pestelAnalysisValue.recommendation.length);
		    $.each(swotList.pestelAnalysisValue.recommendation, function (i, List) {
				var name = 	(List.name !=	undefined?List.name:"");
				var multiowner 	= 	((List.multipleOwners !=	undefined && List.multipleOwners !=	'')?List.multipleOwners:currentEmp);
				var users		=	topparentswotDetails;
		        var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
				var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle rec_res_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
				var subinitiativeUser 	=	'<li class="avatar avatar-sm"><img '+userProfileConcate+' alt="'+username+'"></li>';				
				
				var resultPorfileContent	=	recommendationPorfileContent(multiowner,List.id);
				var userselecteditems	=	resultPorfileContent['userownerlist_data'];
				var subinitiativeUser	=	(resultPorfileContent['userownerlist'] !=	undefined?resultPorfileContent['userownerlist']:"");
				//<input type="hidden" class="rec_multiownerid" id="rec_multiownerid_'+List.id+'" name="multiowners[]" value="'+multiowner+'">
				var removebtnEnable	=	'';
				var removeclass	=	'';
				if(recdeletepermission	==	true && i !=	0){
					removeclass	=	' class="notes_clone"';
					removebtnEnable	=	`<i class="fas fa-trash remove-notes" data-toggle="tooltip" data-placement="bottom" title="Delete" style="cursor: pointer;"></i>`;
				}
	            
				tablebody	+=	'<tr '+removeclass+'><td><textarea class="form-control recommendation" rows="5" name="recommendation[]">'+name+'</textarea></td><td><div class="d-flex flex-column">'+userselecteditems+'<ul class="list-unstyled order-list d-flex" id="recommendationMultiowner_'+List.id+'">'+subinitiativeUser+'</ul></div></td><td>'+removebtnEnable+'</td></tr>';
			});
		}else{
			var users		=	topparentswotDetails;
			var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
			var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle rec_res_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
			var subinitiativeUser 	=	'<li class="avatar avatar-sm"><img '+userProfileConcate+' alt="'+username+'"></li>';
			if((receditpermission	==	false || reccreatepermission	==	false) || recviewpermission	==	true || recloadcontent	==	true){			
				tablebody	=	'<tr><td><textarea class="form-control recommendation" rows="5" name="recommendation[]"> </textarea></td><td><div class="d-flex flex-column"><input type="hidden" class="rec_multiownerid" id="rec_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="recommendationMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-sm"><a href="#" onclick="return false;" class="favgs"><span _ngcontent-hhc-c5="" class="badge recommendationmultiowner">+</span></a></li></ul></div></td><td></td></tr>';		
			}
			if(receditpermission	==	true || reccreatepermission	==	true){
				tablebody	=	'<tr><td><textarea class="form-control recommendation" rows="5" name="recommendation[]"> </textarea></td><td><div class="d-flex flex-column"><input type="hidden" class="rec_multiownerid" id="rec_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="recommendationMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-sm"><a href="#" class="favgs" data-toggle="modal" data-target="#addpeople"><span _ngcontent-hhc-c5="" onclick="recommendationaddpeople(0)" class="badge recommendationmultiowner">+</span></a></li></ul></div></td><td></td></tr>';		
			}
			$("#recommendationtype").val('create');
		}
	}else{		
		var users		=	topparentswotDetails;
		var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
		var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle rec_res_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
		var subinitiativeUser 	=	'';
		if((receditpermission	==	false || reccreatepermission	==	false) || recviewpermission	==	true || recloadcontent	==	true){			
			subinitiativeUser 	=	'<li class="avatar avatar-sm"><img '+userProfileConcate+' alt="'+username+'"></li>';
			tablebody	=	'<tr><td><textarea class="form-control recommendation" rows="5" name="recommendation[]"> </textarea></td><td><div class="d-flex flex-column"><input type="hidden" class="rec_multiownerid" id="rec_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="recommendationMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-sm"><a href="#" onclick="return false;" class="favgs"><span _ngcontent-hhc-c5="" class="badge recommendationmultiowner">+</span></a></li></ul></div></td><td></td></tr>';		
		}
		if(receditpermission	==	true || reccreatepermission	==	true){
			subinitiativeUser 	=	'<li class="avatar avatar-sm" data-toggle="modal" data-target="#addpeople" onclick="recommendationaddpeople(0)"><img '+userProfileConcate+' alt="'+username+'"></li>';
			tablebody	=	'<tr><td><textarea class="form-control recommendation" rows="5" name="recommendation[]"> </textarea></td><td><div class="d-flex flex-column"><input type="hidden" class="rec_multiownerid" id="rec_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="recommendationMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-sm"><a href="#" class="favgs" data-toggle="modal" data-target="#addpeople"><span _ngcontent-hhc-c5="" onclick="recommendationaddpeople(0)" class="badge recommendationmultiowner">+</span></a></li></ul></div></td><td></td></tr>';		
		}
		$("#recommendationtype").val('create');
	}
	$("#recommendationbody").html(tablebody);
	$('[data-toggle="tooltip"]').tooltip();
	$("#recommendationbody ul li.avatar").css("cursor","pointer");	
	$('.rec_res_multiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
	if((receditpermission	==	false && reccreatepermission	==	false) && (recviewpermission == true || recdeletepermission == true)){
		$('#recommendationbody input[type="text"]').prop("disabled", true);
		$('#recommendationbody textarea').prop("disabled", true);
		$('#recommendationbody input[type="checkbox"]').prop("disabled", true);
		$('#recommendationbody select').prop("disabled", true);
		$(".actionsbtn").hide();
	}
}

function actionsPopSuccessCallback(swotList,typerequest) {
	var tablebody	=	"";
	$("#actionbody").empty();
	if(swotList.pestelAnalysisValue.actions !=	undefined && swotList.pestelAnalysisValue.actions !=	''){
		if(swotList.pestelAnalysisValue.actions.length	!=	0){
			$("#actiontype").val('update');
			$("#actioncount").val(swotList.pestelAnalysisValue.actions.length);
		    $.each(swotList.pestelAnalysisValue.actions, function (i, List) {
				var name = 	(List.name !=	undefined?List.name:"");
				var multiowner 	= 	((List.multipleOwners !=	undefined && List.multipleOwners !=	'')?List.multipleOwners:currentEmp);
				var checkstatus	=	(List.status	==	true?"checked":"");
				var bydate		=	(List.bydate !=	undefined?List.bydate:"");
				var users		=	topparentswotDetails;
		        /*var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
				var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle rec_res_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
				var subinitiativeUser 	=	'<li class="avatar avatar-sm"><img '+userProfileConcate+' alt="'+username+'"></li>';*/
				var removebtnEnable	=	'';
				var removeclass	=	'';
				if(actiondeletepermission	==	true && i !=	0){
					removeclass	=	' class="actions_clone"';
					removebtnEnable	=	`<i class="fas fa-trash remove-action" data-toggle="tooltip" data-placement="bottom" title="Delete" style="cursor: pointer;"></i>`;
				}
				var resultPorfileContent	=	actionsPorfileContent(multiowner,List.id);
				var userselecteditems	=	resultPorfileContent['userownerlist_data'];
				var subinitiativeUser	=	(resultPorfileContent['userownerlist'] !=	undefined?resultPorfileContent['userownerlist']:"");
				tablebody	+=	'<tr'+removeclass+'><td><textarea class="form-control pestelactions" rows="5" name="pestelactions[]">'+name+'</textarea></td><td><div class="row"><div class="form-group col-md-12"><i class="far fa-calendar input-calender-icon"></i><input type="text" class="modal-custom-input date_pickers_single bydate" style="height: 34px !important;" data-language="en" name="bydate[]" value="'+bydate+'" id="bydate" autocomplete="off"/></div></div></td><td><div class="d-flex flex-column">'+userselecteditems+'<ul class="list-unstyled order-list d-flex" id="actionsMultiowner_'+List.id+'">'+subinitiativeUser+'</ul></div></td><td><input type="checkbox" class="actionstatuscheck" '+checkstatus+'/></td><td>'+removebtnEnable+'</td></tr>';
			});
		}else{
			var users		=	topparentswotDetails;
			var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
			var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
			var subinitiativeUser 	=	'<li class="avatar avatar-sm"><img '+userProfileConcate+' alt="'+username+'"></li>';
			if((actioneditpermission	==	false || actioncreatepermission	==	false) || actionviewpermission	==	true || actionloadcontent	==	true){					
				tablebody	=	'<tr><td><textarea class="form-control pestelactions" rows="5" name="pestelactions[]"> </textarea></td><td><div class="row"><div class="form-group col-md-12"><i class="far fa-calendar input-calender-icon"></i><input type="text" class="modal-custom-input date_pickers_single bydate" style="height: 34px !important;" data-language="en" autocomplete="off"/></div></div></td><td><div class="d-flex flex-column"><input type="hidden" class="action_multiownerid" id="action_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="actionsMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-sm"><a href="#" onclick="return false;" class="favgs"><span _ngcontent-hhc-c5="" class="badge">+</span></a></li></ul></div></td><td><input type="checkbox" class="actionstatuscheck" /></td><td></td></tr>';
			}
			if(actioneditpermission	==	true || actioncreatepermission	==	true){
				tablebody	=	'<tr><td><textarea class="form-control pestelactions" rows="5" name="pestelactions[]"> </textarea></td><td><div class="row"><div class="form-group col-md-12"><i class="far fa-calendar input-calender-icon"></i><input type="text" class="modal-custom-input date_pickers_single bydate" style="height: 34px !important;" data-language="en" autocomplete="off"/></div></div></td><td><div class="d-flex flex-column"><input type="hidden" class="action_multiownerid" id="action_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="actionsMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-sm"><a href="#" class="favgs" data-toggle="modal" data-target="#addpeopleactions"><span _ngcontent-hhc-c5=""onclick="actionsaddpeople(0)" class="badge">+</span></a></li></ul></div></td><td><input type="checkbox" class="actionstatuscheck" /></td><td></td></tr>';		
			}
			$("#actiontype").val('create');
		}
	}else{		
		var users		=	topparentswotDetails;
		var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
		var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
		var subinitiativeUser 	=	'';
		if((actioneditpermission	==	false || actioncreatepermission	==	false) || actionviewpermission	==	true || actionloadcontent	==	true){
			subinitiativeUser 	=	'<li class="avatar avatar-sm"><img '+userProfileConcate+' alt="'+username+'"></li>';					
			tablebody	=	'<tr><td><textarea class="form-control pestelactions" rows="5" name="pestelactions[]"> </textarea></td><td><div class="row"><div class="form-group col-md-12"><i class="far fa-calendar input-calender-icon"></i><input type="text" class="modal-custom-input date_pickers_single bydate" style="height: 34px !important;" data-language="en" autocomplete="off"/></div></div></td><td><div class="d-flex flex-column"><input type="hidden" class="action_multiownerid" id="action_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="actionsMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-sm"><a href="#" onclick="return false;" class="favgs"><span _ngcontent-hhc-c5="" class="badge">+</span></a></li></ul></div></td><td><input type="checkbox" class="actionstatuscheck" /></td><td></td></tr>';
		}
		if(actioneditpermission	==	true || actioncreatepermission	==	true){
			subinitiativeUser 	=	'<li class="avatar avatar-sm" data-toggle="modal" data-target="#addpeopleactions" onclick="actionsaddpeople(0)"><img '+userProfileConcate+' alt="'+username+'"></li>';
			tablebody	=	'<tr><td><textarea class="form-control pestelactions" rows="5" name="pestelactions[]"> </textarea></td><td><div class="row"><div class="form-group col-md-12"><i class="far fa-calendar input-calender-icon"></i><input type="text" class="modal-custom-input date_pickers_single bydate" style="height: 34px !important;" data-language="en" autocomplete="off"/></div></div></td><td><div class="d-flex flex-column"><input type="hidden" class="action_multiownerid" id="action_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="actionsMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-sm"><a href="#" class="favgs" data-toggle="modal" data-target="#addpeopleactions"><span _ngcontent-hhc-c5=""onclick="actionsaddpeople(0)" class="badge">+</span></a></li></ul></div></td><td><input type="checkbox" class="actionstatuscheck" /></td><td></td></tr>';		
		}
		$("#actiontype").val('create');
	}
	$("#actionbody").html(tablebody);
	$('[data-toggle="tooltip"]').tooltip();
	$("#actionbody ul li.avatar").css("cursor","pointer");
	$('.date_pickers_single').datepicker({
			language : 'en',
			autoClose : true,
			position : "bottom left",
			//todayButton : true,
			onSelect : function(fd) {
				// $('.datepickers-container').hide();
			}
		});
	$('.actions_multiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
	if((actioneditpermission	==	false && actioncreatepermission	==	false) && (actionviewpermission == true || actiondeletepermission == true)){
		$('#actionbody input[type="text"]').prop("disabled", true);
		$('#actionbody textarea').prop("disabled", true);
		$('#actionbody input[type="checkbox"]').prop("disabled", true);
		$('#actionbody select').prop("disabled", true);
		$(".actionsbtn").hide();
	}
}

function handleswoteventdelete(){
	var id				=	$("#deleterecordid").val();
	var typeofdeleteurl	=	$("#deleterecordtype").val();
	if(id	==	"" || typeofdeleteurl	==	""){
		return false;
	}
	var url	=	"/stratroom/pestelAnalysis/" + id;
	
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

function swotPopSuccessCallback(data) {
	
	swotupdateDescription	=	data;
	$('#swot_id').val(data.id);
	/*if(data.kpiId	==	undefined || data.kpiId	==	""){
		$('#Kpi_show_id').val(data.kpiValue.kpiId)
	}else{
		$('#Kpi_show_id').val(data.kpiId)
	}*/
	$("#strength").val(data.pestelAnalysisValue.name);
	$("#strength_type").val(data.pestelAnalysisValue.type);
	$("#strength_next_due_date").val(data.pestelAnalysisValue.nextduedate);
	$('#strength_impact').find('option').remove().end();
	$('#swot_strength_Form #strength_impact').append(`<option value="">Choose impact</option>`);
	populateKPIList('#swot_strength_Form #strength_impact',(data.deptId !=	undefined?data.deptId:''));
	$("#strength_impact").val(data.pestelAnalysisValue.impact);
	
	var flag	=	(data.pestelAnalysisValue.status_flag !=	undefined?data.pestelAnalysisValue.status_flag:"");
	if(flag 	==	"success"){
		$("#defaultChecked1").prop('checked', true);
	}else if(flag 	==	"warning"){
		$("#defaultChecked2").prop('checked', true);
	}else if(flag 	==	"danger"){
		$("#defaultChecked3").prop('checked', true);
	}
	$("#department_swot").val((data.deptId !=	undefined?data.deptId:''));
	$('#strength_impact,#department_swot').select2({
		selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
		dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
	});
}

function getSwotObj(flagType,action) {
	var name	=	$("#strength").val();
	var type	=	$("#strength_type").val();
	var nextduedate		=	$("#strength_next_due_date").val();
	var impact	=	$("#strength_impact").val();
	var flag_value	=	$("input[name='strengthstatus']:checked").val();
	 var pageNumber =  $('#pagenumber').val();
	 var newOwner ="";
	var swotObj 	= 	{
            "active": 0,
            "flagType": flagType,
            "pageId": pageNumber,
            "department": ($("#department_swot option:selected").text() !=	"Choose Department"?$("#department_swot option:selected").text():''),
            "deptId": $("#department_swot").val(),
            "pestelAnalysisValue": {
                "name": ((name != undefined && name !=	"") ? name : ""),
                "impact": ((impact != undefined && impact !=	"") ? impact : ""),
                "type": ((type != undefined && type !=	"") ? type : ""),
                "status_flag": ((flag_value != undefined && flag_value !=	"") ? flag_value : ""),
				"nextduedate":nextduedate,
				"newMultipleOwners":newOwner,
                "attachmentUrl": "",
				"recommendation": [],
				"actions": [],
				"attachment": [],
            }
        };

var existdatadonotupdate 	=	["name","impact","type","description","status_flag","nextduedate"];
	if(action == "edit" && (swotupdateDescription !== undefined || swotupdateDescription != "")){
		$.each(swotupdateDescription.pestelAnalysisValue,function(index,value){
			if($.inArray(index,existdatadonotupdate) == -1){
				swotObj["pestelAnalysisValue"][index]	=	value;
			}
		});
	}
	
return  swotObj;   
    /*var swotObj = ""
    var p = ""
    var name = ""
    var type = ""
    var impact = ""
    var attachmenturl = ""
    var multipleOwners = ""
    var inputformValue = []
    var finalinputformValue = ""
    var flag_value = ""

    if (flagType == "Strenghts") {
        p = $(vthis).parents(".strengthdata_List")
    } else if (flagType == "Weaknesses") {
        p = $(vthis).parents(".weaknessdata_List")
    } else if (flagType == "Oppurtunities") {
        p = $(vthis).parents(".oppurtunitiesdata_List")
    } else if (flagType == "Threats") {
        p = $(vthis).parents(".threatsdata_List")
    }
    

    var id = p.find("td:first-child input").attr("id")


    attachmenturl = p.find(".file-input1").attr("atturl")
    if (attachmenturl) {
        console.log("find attach url");
    } else {
        attachmenturl = ""
    }


    var peopleList = p.find("#mutipleOwners").attr("value")

    if (peopleList) {
        console.log(" peopleList : " + peopleList);
        var peopleList1 = p.find("#mutipleOwners").attr("peopleList")
        if (peopleList1) {
            multipleOwners = peopleList1
        } else {
            multipleOwners = peopleList
        }
    } else {
        peopleList = p.find("#mutipleOwners").attr("peopleList")
        if (peopleList) {
            multipleOwners = peopleList
        } else {
            multipleOwners = ""
        }
    }

    name = p.find("#name_text").val()
    type = p.find("#statusType option:selected").text();
    impact = p.find("#impact_text").val()

    var input_text = p.find("#addinput").attr("input_text")
    var inputText = p.find("#viewinput").attr("inputValue")
    if (inputText) {
        if (inputText.includes("|")) {
            if (input_text) {
                inputformValue = inputText.split("|")
                inputformValue = [...inputformValue, input_text];
                finalinputformValue = inputformValue.join("|");
            } else {
                finalinputformValue = inputText;
            }
        } else {
            if (input_text) {
                var str = inputText.concat("|", input_text);
                inputformValue = str.split("|")
                finalinputformValue = inputformValue.join("|");
            } else {
                finalinputformValue = inputText
            }
        }
    } else {
        var textvalue = input_text;
        if (textvalue) {
            finalinputformValue = textvalue
        } else {
            finalinputformValue = ""
        }
    }

    if (radioValue) {
        flag_value = radioValue
    } else {
        flag_value = p.find("#statusFlag").attr("flagValue")
    }



    if (id != null || !id === "" || id != undefined) {
        swotObj = {
            "id": id,
            "active": 0,
            "flagType": flagType,
            "swotAnalysisValue": {
                "name": name ? name : "",
                "impact": impact ? impact : "",
                "type": type ? type : "",
                "status_flag": flag_value ? flag_value : "",
                "inputformValue": finalinputformValue ? finalinputformValue : "",
                "multipleOwners": multipleOwners ? multipleOwners : "",
                "attachmentUrl": attachmenturl ? attachmenturl : ""
            }
        }
    } else {
        swotObj = {

            "active": 0,
            "flagType": flagType,
            "swotAnalysisValue": {
                "name": name ? name : "",
                "impact": impact ? impact : "",
                "type": type ? type : "",
                "status_flag": flag_value ? flag_value : "",
                "inputformValue": finalinputformValue ? finalinputformValue : "",
                "multipleOwners": multipleOwners ? multipleOwners : "",
                "attachmentUrl": attachmenturl ? attachmenturl : ""
            }
        }
    }
    return swotObj;
    console.log(swotObj)*/
}

$(document).on("change", ".file-input1", function () {
    var file 	= 	$(this)[0].files[0]
	var id		=	$(this).attr("data-id");
    var fd 		= 	new FormData();
    var thiss 	= 	$(this)
    fd.append('file', file);
    $("#SendingAttachment").modal("show")
    $.ajax({
        url: '/stratroom/updatePestelAttachment',
        type: 'POST',
        processData: false,
        contentType: false,
        data: fd,
        success: function (data, status, jqxhr) {
			//$("#SendingAttachment").modal("hide")
			swotajaxautoupdatefileattachement(id,data.attachmentUrl);
        },
        error: function (jqxhr, status, msg) {
            $("#SendingAttachment").modal("hide")
			$.notify("Error: Attachement Failed Size is exceeds", {
							  style: 'error',
							  className: 'graynotify'
							});
        }
    }).always(function () {
        $("#SendingAttachment").modal("hide")
    });
})

$(document).on("click",".openattachement",function(){
	var link	=	$(this).attr("data-awslink");
	$("#ViewAttachment").modal("show");
	if(link	!=	""){
		$("#awsviewlink").attr("href",link).attr("target","_black").text(link);
	}else{
		$("#awsviewlink").attr("href","#").attr("target","").text("No Link Available");
	}	
});

function swotajaxautoupdatefileattachement(id,attachementurl){

	$.ajax({
		url : "/stratroom/pestelAnalysis/" + id,
		success: function (data, status, jqxhr) {
				var swotObj 	= 	data;
				if(swotObj.pestelAnalysisValue.attachmentUrl !=	undefined){
					swotObj.pestelAnalysisValue.attachmentUrl	=	attachementurl;
				}else{
					swotObj.pestelAnalysisValue.attachmentUrl	=	attachementurl;
				}
				$("#viewfilelink_"+id).attr("data-awslink",attachementurl);
			    $.ajax({
			        url: "/stratroom/pestelAnalysis",
			        type: "put",
			        contentType: "application/json",
			        data: JSON.stringify(swotObj),
			        success: function (data, status) {
						$("#SendingAttachment").modal("hide");
						$.notify("Success: Attachement Success", {
							  style: 'success',
							  className: 'graynotify'
							});
			        },
					error: function (jqxhr, status, msg) {
			            $("#SendingAttachment").modal("hide");
						$.notify("Error: Attachement Failed", {
							  style: 'error',
							  className: 'graynotify'
							});
			        }
			    });
        },
		error:function(){
			$("#SendingAttachment").modal("hide");
			$.notify("Error: Attachement Failed", {
							  style: 'error',
							  className: 'graynotify'
							});
		}
	});
}


var addbusinessimpact = ""
$(document).on("click", "#addbusinessimpact", function () {
    addbusinessimpact = $(this)
})

$(document).on("click", "#businessimpact_sbt", function () {
    business_impact = "";
    business_impact = $("#impact_form_text").val()
    $(addbusinessimpact).attr("business_impact", business_impact.trim())
    $("#impact").modal("hide")
})


var addrecommend = ""
$(document).on("click", "#addrecommend", function () {
    addrecommend = $(this)
})

$(document).on("click", "#recommand_sbt", function () {
    recommandation_text = "";
    recommandation_text = $("#recommand_form_text").val()
    $(addrecommend).attr("recommandation_text", recommandation_text.trim())
    $("#recommend").modal("hide")
})



$(document).on("click", "#viewimpact", function () {
    var p = $(this).parents(".pestelrowdatalist")
    var id = p.find("td:first-child input").attr("id")
    getPestelImpactDetails(id);
});

function getPestelImpactDetails(id) {
    var methodType = 'get';
    $.ajax({
        url: "/stratroom/pestelAnalysis/" + id,
        contentType: "application/json",
        success: function (data, status) {
            var checktext = data.pestelAnalysisValue.businessImpact
            if (checktext != "") {
                showImpactDetails(data.pestelAnalysisValue.businessImpact)
            }
        }
    });
}


function showImpactDetails(impactformValue) {
    var impactformtext = impactformValue.split("|");
    $("#impactList").empty();
    var impactFormlist = "";
    $.each(impactformtext, function (i, text) {
        text.trim()
        if (text && text != null) {
            impactFormlist =
                '<li> <i class="fa fa-dot-circle-o" aria-hidden="true"></i>' + text + '</li>';
            $("#impactList").append(impactFormlist);
        } else {
            console.log("## text empty ##" + text);
        }
    });
}

$(document).on("click", ".addflagb", function () {
    var vthis = $(this)
    radioValue = $("input[name='statusflag']:checked").val();
    $("#flag").modal("hide")
});

$(document).on("click", "#viewrecommend", function () {
    var p = $(this).parents(".pestelrowdatalist")
    var id = p.find("td:first-child input").attr("id")
    getPestelRecommandDetails(id);
});

function getPestelRecommandDetails(id) {
    var methodType = 'get';
    $.ajax({
        url: "/stratroom/pestelAnalysis/" + id,
        contentType: "application/json",
        success: function (data, status) {
            var checktext = data.pestelAnalysisValue.recommandation
            if (checktext != "") {
                showRecommendDetails(data.pestelAnalysisValue.recommandation)
            }
        }
    });
}


function showRecommendDetails(impactformValue) {
    var recommendformtext = impactformValue.split("|");
    $("#recommandList").empty();
    var recommendFormlist = "";
    $.each(recommendformtext, function (i, text) {
        text.trim()
        if (text && text != null) {
            recommendFormlist =
                '<li> <i class="fa fa-dot-circle-o" aria-hidden="true"></i>' + text + '</li>';
            $("#recommandList").append(recommendFormlist);
        } else {
            console.log("## text empty ##" + text);
        }
    });
}


$(document).on("click", "statusFlag", function () {
    var vthis = $(this)
    var p = $(this).parents(".pestelrowdatalist")
    var flagValue = p.find("#statusFlag").attr("flagValue")
    var flag_green = ""
    var flag_orange = ""
    var flag_red = ""
    if (flagValue === "flag-green") {
        flag_green = "checked";
    } else if (flagValue === "flag-orange") {
        flag_orange = "checked";
    } else if (flagValue === "flag-red") {
        flag_red = "checked";
    } else {
        flag_green = "checked";
    }


    var modal_pop = '<div class="col-md - 4 custom - control custom - radio">' +
        '<input type = "radio" class="custom-control-input" id = "defaultChecked1" name = "statusflag" value = "flag-green" ' + flag_green + '/>' +
        '<label class="custom-control-label" for="defaultChecked1"><img src="images/flag-green.png" alt="status" width="23px" height="23px" /></label>' +
        '</div >' +
        '<div class="col-md-4 custom-control custom-radio">' +
        '<input type="radio" class="custom-control-input" id="defaultChecked2" name="statusflag"   value="flag-orange" ' + flag_orange + '/>' +
        '<label class="custom-control-label" for="defaultChecked2"><img src="images/flag-orange.png"  alt="status" width="23px" height="23px" /></label>' +
        ' </div>' +
        '<div class="col-md-4 custom-control custom-radio">' +
        ' <input type="radio" class="custom-control-input" id="defaultChecked3" name="statusflag" value="flag-red" ' + flag_red + '/>' +
        '<label class="custom-control-label" for="defaultChecked3"><img src="images/flag-red.png" alt="status" width="23px" height="23px" /></label>' +
        '</div>';
    $(".row").append(modal_pop);
});

function initiativeBar() {
	var $body = $('body');
	if (localStorage.getItem("sidebar_subsidemenu") !=	"" & localStorage.getItem("sidebar_subsidemenu") !=	null & localStorage.getItem("sidebar_subsidemenu") ==	"closed") {
		$body.addClass('ini-show');
	    $body.removeClass('ini-hide');
	    $('.collapse_arrow_left').css('display', 'block');
	    $('.collapse_arrow_right').css('display', 'none');
	}
	
	if (localStorage.getItem("sidebar_subsidemenu") !=	"" & localStorage.getItem("sidebar_subsidemenu") !=	null & localStorage.getItem("sidebar_subsidemenu") ==	"opened") {
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
	
		//swot and pestel edit delete icon
	if ($(".swoteditdeleteicons").length && (!$body.hasClass('ini-hide') && !$body.hasClass('ini-show')) && $body.hasClass('submenu-closed') && !$body.hasClass('side-closed')) {
		$('.swoteditdeleteicons').css('padding-left', '0px');
    }else if ($(".swoteditdeleteicons").length && $body.hasClass('ini-show') && (!$body.hasClass('submenu-closed') && !$body.hasClass('side-closed'))) {
		$('.swoteditdeleteicons').css('padding-left', '0px');
    }else if ($(".swoteditdeleteicons").length && (!$body.hasClass('ini-hide') && !$body.hasClass('ini-show') && !$body.hasClass('submenu-closed') && !$body.hasClass('side-closed'))) {
		$('.swoteditdeleteicons').css('padding-left', '0px');
    }else if ($(".swoteditdeleteicons").length && $body.hasClass('ini-hide') && $body.hasClass('submenu-closed') && !$body.hasClass('side-closed')) {
		if($(".swoteditdeleteicons").css('padding-left') == "0px"){
			$('.swoteditdeleteicons').css('padding-left', '15px');	
		}else{
			$('.swoteditdeleteicons').css('padding-left', '0px');
		}
    }else if ($(".swoteditdeleteicons").length && $body.hasClass('ini-show') && $body.hasClass('side-closed-hover')) {
		if($(".swoteditdeleteicons").css('padding-left') == "0px"){
			$('.swoteditdeleteicons').css('padding-left', '15px');	
		}else{
			$('.swoteditdeleteicons').css('padding-left', '0px');
		}
    }else if ($(".swoteditdeleteicons").length && $body.hasClass('ini-show') && $body.hasClass('submenu-closed') && !$body.hasClass('side-closed')) {
		$('.swoteditdeleteicons').css('padding-left', '0px');	
    }else if ($(".swoteditdeleteicons").length && $body.hasClass('side-closed') && $body.hasClass('ini-show') && $body.hasClass('submenu-closed')) {
		$('.swoteditdeleteicons').css('padding-left', '15px');
    }else if ($(".swoteditdeleteicons").length && $body.hasClass('side-closed') && $body.hasClass('submenu-closed') && !$body.hasClass('ini-hide')) {
		$('.swoteditdeleteicons').css('padding-left', '15px');
    }else if ($(".swoteditdeleteicons").length && $body.hasClass('side-closed') && $body.hasClass('side-closed-hover')) {
		$('.swoteditdeleteicons').css('padding-left', '0px');
    }else if ($(".swoteditdeleteicons").length && $body.hasClass('ini-hide') && $body.hasClass('side-closed') && $body.hasClass('side-closed-hover')) {
		if($(".swoteditdeleteicons").css('padding-left') == "0px"){
			$('.swoteditdeleteicons').css('padding-left', '15px');	
		}else{
			$('.swoteditdeleteicons').css('padding-left', '0px');
		}
    }else if ($(".swoteditdeleteicons").length && $body.hasClass('ini-hide') && $body.hasClass('side-closed') && $body.hasClass('submenu-closed')) {
		if($(".swoteditdeleteicons").css('padding-left') == "15px" || $(".swoteditdeleteicons").css('padding-left') == "0px"){
			$('.swoteditdeleteicons').css('padding-left', '25px');	
		}else{
			$('.swoteditdeleteicons').css('padding-left', '25px');
		}
    }
};

$(".content, .navbar").mouseenter(function() {
	var $body = $('body');
	$body.removeClass('side-closed-hover');
	$body.addClass('submenu-closed');
	initiativeBar();
});

$(".sidebar").mouseenter(function() {
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
		"display" : "none"
	});
	initiativeBar();
} else {
	$(".sidebar-user-panel").css({
		"display" : "block"
	});
	initiativeBar();
}

$('#sub-ini-box_view').slimscroll({
					height : '450px',
					size : '3px',
					color : '#9c9c9c'
				});

function handleMultioownersuserevent(id,action) {
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}
	var imageElement 	=	"initiativeactivitieUser"+id;
	$("#swotajaxid").val(id);
	var data 	=	{};
	if (action == 'edit') {
		$("#activities-ini-box_view_users").html('');
		$("#activities-ini-box_view_users").html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
		$("#activities_current_id").attr("data-activities_sub_current_id",id);
		
		$.ajax({
			url: "/stratroom/user/moduleAccessUserList?moduleName=PESTEL",
			async:false,
			success : function(result,status){
				var subinitiativeUser 	=	"";
				var ischecked 	=	"";
				var selectedItem 	=	[];
				
				if($("#activities_selected_user_"+id).length){
					selectedItem	=	$("#activities_selected_user_"+id).val().split(',');
				}	
				
				var datas 	=	[];
				$.each(result, function(index, users) {
					datas.push(users.id);
				});
				
				if(result.length	==	0){
					$(".showactivitiesusers").css('display','none');
				}
				
				if(result.length	==	selectedItem.length){
					$("#allusersactivities").prop("checked","checked");
				}else{
					$("#allusersactivities").prop("checked",false);
				}
				
				$.each(result, function(index, users) {
					var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
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
				$("#activities-ini-box_view_users").html('');
				$("#activities-ini-box_view_users").html(subinitiativeUser);
				$('.swotmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
			}
		});
		
		
		$.ajax({
			url : "/stratroom/pestelAnalysis/" + id,
			async:false,
			success : function(result,status){
				swotupdateDescription	=	result;
				localStorage.setItem('existingowners',swotupdateDescription.pestelAnalysisValue.multipleOwners);
			},
			error:readErrorMsg
		});
		
	}
}	

$(document).on("click","input[name='activities_owner[]']",function(){
		var id				=	$("#swotajaxid").val();
		if(swotupdateDescription == undefined || swotupdateDescription == "" || swotupdateDescription.id == ""){
			return false;
		}
		var swotObj			=	swotupdateDescription;
		var multiowners	= 	$("input[name='activities_owner[]']:checked").map(function(){
        	return this.value;
    	}).get();
		
		if(multiowners.length	==	0){
			swotObj.pestelAnalysisValue.multipleOwners	=	currentEmp;	
		}else{
			swotObj.pestelAnalysisValue.multipleOwners	=	multiowners.join(',');
		}
		swotupdateDescription			=	swotObj;
		
});

$(document).on("click",".getselectedActivitiesUsers",function(){
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}
	$("#searchactivities").val('');
    $("#activities_search2").show();
    $("#activities_search_section2").hide();
	var id = $("#activities_current_id").attr("data-activities_sub_current_id");
	if((id ==	undefined || id ==	"" || id ==	" ")){
		return false;
	}
	var imageElement 	=	"initiativeactivitieUser_"+id;
	
	var userseslectedData 	=	[];
	var selectedSubinitiativeOwner = $(".swot_add_multiuser_popup input[name='activities_owner[]']:checked").each(function(index){
		userseslectedData.push(parseInt($(this).val()));
	});

	var functionParams	=	id+','+'"edit"';
	var functionName	=	"handleMultioownersuserevent";
	var modalPopupName	=	".swot_add_multiuser_popup";
	$("#activities_selected_user_"+id).val(userseslectedData.join(','));
	var swotObj			=	swotupdateDescription;
	var oldowners = 	localStorage.getItem('existingowners');
		var newowner=swotObj.pestelAnalysisValue.multipleOwners;
		var newowners;
		newowners = getNewOwners(oldowners,newowner);
		swotObj.pestelAnalysisValue.newMultipleOwners = newowners;
		for(var i=0;i<swotObj.pestelAnalysisValue.recommendation.length;i++){
			swotupdateDescription.pestelAnalysisValue.recommendation[i].newMultipleOwners = "";
			}
		for(var i=0;i<swotObj.pestelAnalysisValue.actions.length;i++){
			swotupdateDescription.pestelAnalysisValue.actions[i].newMultipleOwners = "";
		}
	var methodType 		= 	'put';
		
		$.ajax({
			url : "/stratroom/pestelAnalysis/",
			type : methodType,
			contentType : "application/json",
			data : JSON.stringify(swotObj),
			success : function(data, status) {
				//$.notify("Updated Successfully");
			},
			error:function(msg,status){
			if(!jQuery.isEmptyObject(msg.responseText)){
				$.each(JSON.parse(msg.responseText),function(key,value){
					if(key 	==	"exception"){
						$.notify("Error:"+value,{
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
		}
	});
	if(!jQuery.isEmptyObject(userseslectedData)){
		$.ajax({
			url: "/stratroom/user/moduleAccessUserList?moduleName=PESTEL",
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
										subinitiativeUser 	+=	'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
										return false;
									}
								}
							});
					});
					if(badgeinc	==	false){
						subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
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
							subinitiativeUser 	+=	'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
							return false;
						}
						
					});
					
					if(badgeinc	==	false){
						subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
					}
				}
					
				$("#"+imageElement).html('');
				$("#"+imageElement).html(subinitiativeUser);
				$('.swotmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
			}
		});
	}else{
		var users 	=	topparentswotDetails;
		$("#activities_selected_user_"+id).val(users.id);
		userseslectedData.push(users.id);
		var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
		var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle swotmultiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
		subinitiativeUser 	=	'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
		subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+</span></li>';
		$("#"+imageElement).html('');
		$("#"+imageElement).html(subinitiativeUser);
		$('.swotmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
	}
});

$(document).on("click","input[name='swot_action_owner[]']",function(){
	if(createpermission == false && editpermission == false){
		return false
	}
});

$(document).on("click","input[name='swot_rec_owner[]']",function(){
	
	if(createpermission == false && editpermission == false){
		return false
	}
	
	if($('#addpeopleactions').is(':visible')	==	true){
		var res_peopleid	=	$("#actionsresponsibleid").val();
		var multiowners	= 	$(".actionslistusers input[name='swot_action_owner[]']:checked").map(function(){
	    	return this.value;
		}).get();
	
		if(multiowners.length	==	0){
			$("#action_multiownerid_"+res_peopleid).val(currentEmp);
		}else{
			$("#action_multiownerid_"+res_peopleid).val(multiowners.join(','));
		}				
	}
	if($('#addpeople').is(':visible')	==	true){
		
		var multiowners	= 	$("input[name='swot_rec_owner[]']:checked").map(function(){
	    	return this.value;
		}).get();
	
		var res_peopleid	=	$("#responsibleid").val();
		if(multiowners.length	==	0){
			$("#rec_multiownerid_"+res_peopleid).val(currentEmp);
		}else{
			$("#rec_multiownerid_"+res_peopleid).val(multiowners.join(','));
		}					
	}
	
});

$(document).on("click",".peopleselectedUsers",function(){
	if(createpermission == false && editpermission == false){
		return false
	}
	$("#searchrecommendation").val('');
    $("#search2").show();
    $("#search_section2").hide();
	var id = $("#responsibleid").val();
	if((id ==	undefined || id ==	"" || id ==	" ")){
		return false;
	}
	
	var multiowners	= 	$("input[name='swot_rec_owner[]']:checked").map(function(){
    	return this.value;
	}).get();
	
	if(multiowners.length	==	0){
		$("#rec_multiownerid_"+id).val(currentEmp);
	}else{
		$("#rec_multiownerid_"+id).val(multiowners.join(','));
	}
	
	var modalPopupName	=	'data-toggle="modal" data-target="#addpeople"';
	var imageElement 	=	"recommendationMultiowner_"+id;
	var functionParams	=	id;
	var functionName	=	"recommendationaddpeople";
	
	if(!jQuery.isEmptyObject(multiowners)){
		$.ajax({
			url: "/stratroom/user/moduleAccessUserList?moduleName=PESTEL",
			success : function(data, status) {
				var subinitiativeUser	=	"";
				if(multiowners.length !=	data.length){
					var profileBadgeIncrement 	=	(multiowners.length >= 3?parseInt(multiowners.length)-parseInt(2):"");
					var badgeinc	=	false;
					$.each(data,function(key,users){
							$.each(multiowners,function(index,selectedvalue){
								if(selectedvalue ==	users.id){
									var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
									var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle rec_res_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
									
									if(index <= 2){
										subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
									}
									 
									if(multiowners.length >= 3 && index >= 2 && index <= 2){
										badgeinc	=	true;
										subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
										subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
										return false;
									}
								}
							});
					});
					if(badgeinc	==	false){
						subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
					}
				}else{
					var profileBadgeIncrement 	=	(data.length >= 3?parseInt(data.length)-parseInt(2):0);
					var badgeinc	=	false;
					$.each(data,function(index,users){
						var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
						var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle rec_res_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
						if(index <= 2){
							subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
						}
						
						if(multiowners.length >= 3 && index >= 2 && index <= 2){
							badgeinc	=	true;
							subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
							subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
							return false;
						}
						
					});
					
					if(badgeinc	==	false){
						subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
					}
				}
					
				$("#"+imageElement).html('');
				$("#"+imageElement).html(subinitiativeUser);
				$("#"+imageElement+" li").css("cursor","pointer");
				$('.rec_res_multiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
			}
		});
	}else{
		var users 	=	topparentswotDetails;
		$("#rec_multiownerid_"+id).val(users.id);
		var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
		var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle rec_res_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
		subinitiativeUser 	=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
		subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+</span></li>';
		$("#"+imageElement).html('');
		$("#"+imageElement).html(subinitiativeUser);
		$("#"+imageElement+" li").css("cursor","pointer");
		$('.rec_res_multiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
	}
	
});

$(document).on("click",".actionpeopleselectedUsers",function(){
	
	if(createpermission == false && editpermission == false){
		return false
	}
	$("#searchactions").val('');
    $("#actions_search2").show();
    $("#actions_search_section2").hide();
	var id = $("#actionsresponsibleid").val();
	if((id ==	undefined || id ==	"" || id ==	" ")){
		return false;
	}
	
	var multiowners	= 	$("input[name='swot_action_owner[]']:checked").map(function(){
    	return this.value;
	}).get();
	
	if(multiowners.length	==	0){
		$("#action_multiownerid_"+id).val(currentEmp);
	}else{
		$("#action_multiownerid_"+id).val(multiowners.join(','));
	}
	
	var imageElement 	=	"actionsMultiowner_"+id;
	var functionParams	=	id;
	var functionName	=	"actionsaddpeople";
	var modalPopupName	=	'data-toggle="modal" data-target="#addpeopleactions"';
	if(!jQuery.isEmptyObject(multiowners)){
		$.ajax({
			url: "/stratroom/user/moduleAccessUserList?moduleName=PESTEL",
			success : function(data, status) {
				var subinitiativeUser	=	"";
				if(multiowners.length !=	data.length){
					var profileBadgeIncrement 	=	(multiowners.length >= 3?parseInt(multiowners.length)-parseInt(2):"");
					var badgeinc	=	false;
					$.each(data,function(key,users){
							$.each(multiowners,function(index,selectedvalue){
								if(selectedvalue ==	users.id){
									var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
									var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
									
									if(index <= 2){
										subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
									}
									 
									if(multiowners.length >= 3 && index >= 2 && index <= 2){
										badgeinc	=	true;
										subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
										subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
										return false;
									}
								}
							});
					});
					if(badgeinc	==	false){
						subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
					}
				}else{
					var profileBadgeIncrement 	=	(data.length >= 3?parseInt(data.length)-parseInt(2):0);
					var badgeinc	=	false;
					$.each(data,function(index,users){
						var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
						var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
						if(index <= 2){
							subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
						}
						
						if(multiowners.length >= 3 && index >= 2 && index <= 2){
							badgeinc	=	true;
							subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
							subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
							return false;
						}
						
					});
					
					if(badgeinc	==	false){
						subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
					}
				}
					
				$("#"+imageElement).html('');
				$("#"+imageElement).html(subinitiativeUser);
				$("#"+imageElement+" li").css("cursor","pointer");
				$('.actions_multiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
			}
		});
	}else{
		var users 	=	topparentswotDetails;
		$("#action_multiownerid_"+id).val(users.id);
		var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
		var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
		subinitiativeUser 	=	'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
		subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+</span></li>';
		$("#"+imageElement).html('');
		$("#"+imageElement).html(subinitiativeUser);
		$("#"+imageElement+" li").css("cursor","pointer");
		$('.actions_multiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
	}
	
});

$(".submitevent").click(function(){
	
	if($("#strength_next_due_date").val() ==	""){ 
		$(".input-calender-icon").css("bottom","45%");
	}else{
		$(".input-calender-icon").css("bottom","45%");
	}
	/*var impactbusi	=	$("#strength_impact").val();
	$(".chosen-container-single").find('label.error').remove();
	if(impactbusi	==	"" || impactbusi	==	undefined){
		$(".chosen-container-single").append('<label id="strength_type-error" class="error" for="strength_type">This field is required.</label>');
		return false;
	}else{
		$(".chosen-container-single").find('label.error').remove();
	}*/
});


$(".modal-custom-input").change(function () {
	readFile(this);
});

var readerValue = '';
function readFile(input) {		
	if (input.files && input.files[0]) {		
		file = input.files[0];			
		var reader = new FileReader();
		   reader.readAsDataURL(file);
		   reader.onload = function () {		        
		        readerValue = reader.result;
		 }  
	}
}

var attachment	=	[];
var attachmentdeleteId ='';
$(".addfilemeetingoption").click(function(){
	$("#fileuploadtype").val('create');
});
function handleUploadShow(id){
	swotGlobalid	=	id;
	if((attcreatepermission	==	false || atteditpermission	==	false || attdeletepermission	==	false) && attloadcontent	==	false){
		return false;
	}
	$('[data-toggle="tooltip"]').tooltip("hide");
	$('[rel="tooltip"]').tooltip("hide");
	attachmentdeleteId = id;
	$.ajax({
		 url: "/stratroom/pestelAttachList/" + id,
		async:false,
		method:'GET',
		success : function(data,status){
			//swotupdateDescription	=	data;		
			//uploadShow(data.pestelAnalysisValue.attachment)
			uploadShow(data)
		},
		error:readErrorMsg
	});
}

function uploadShow(result){		 
	$('#listfileuploadTable').empty();			
	var uploadShowData = "";
	var i ;					
	 $.each(result, function (i, List){	 
		 i++;
	 	var uploadedOn = dateFormatedtohumanread(List.createdTime);	
		 uploadShowData +='<tr>'+
			'<td id ='+List.id+'>'+i+'</td>'+
			'<td name ='+List.name+'><a href="'+List.file+'" target="_blank" download="'+List.name+'.'+List.type+'">'+List.name+'</a></td>'+
			'<td id ='+List.id+'>'+uploadedOn+'</td>'+
			'<td id ='+List.id+'>'+List.size+'</td>'+
			'<td type ='+List.type+'>'+List.type+'</td><td>';
			if(atteditpermission	==	true){
				uploadShowData	+=	'<i class="fas fa-pen" rel="tooltip" data-placement="bottom" title="Edit" data-toggle="modal" data-target="#file_upload_popup1" style="cursor: pointer" onclick="updateAttachment('+attachmentdeleteId+','+List.id+')"></i> ';	
			}
			if(attdeletepermission	==	true){
				uploadShowData	+=	'<i class="fas fa-trash" rel="tooltip" data-placement="bottom" title="Delete"  data-toggle="modal" data-target="#deleteAttachmentModal" style="margin-left: 16px; cursor: pointer;" onclick="deleteAttachment('+attachmentdeleteId+','+List.id+')"></i>';
			}
			if(atteditpermission == false && attdeletepermission	==	false){
				uploadShowData	+=	'--';			
			}
			
			uploadShowData	+='</td></tr>';
		 
		 //$('.uploadattachmentSuccess').append(uploadShowData);
	 });	 	 	
	var table	=	`<table class="table" id="fileuploadTable"
										style="margin-bottom: 0px !important;">
										<thead>
											<tr>
												<th>Sr. No.</th>
												<th>File Name</th>
												<th>Uploaded On</th>
												<th>Size</th>
												<th>Type</th>
												<th>Actions</th>
											</tr>
										</thead><tbody>`+uploadShowData+`
										</tbody>
									</table>`;
	 $("#listfileuploadTable").append(table);
	 $('[rel="tooltip"]').tooltip();
	 $("#fileuploadTable").paging({ limit: 5 }); 
}




$("#file_upload_popup").click(function(){	
	$.ajax({
		url : "/stratroom/pestelAnalysis/" + attachmentdeleteId,
		async:false,
		method:'GET',
		success : function(data,status){
			swotupdateDescription	=	data;
			console.log(data);		
			attachment = data.pestelAnalysisValue.attachment;		
		},
		error:readErrorMsg
	});
});

var finalatt=[];

$("#attachementupload").click(function(){	
	if(!$("#attachementuploadfile").val()){
		$.notify("Error:Kindly upload a file", {
							  style: 'error',
							  className: 'graynotify'
							});
		return false;
	}
	
	var file		=	$('#attachementuploadfile')[0].files[0];
	
	if(file	==	undefined){
		return false;
	}
	var fileName = file.name;
	const words = fileName.split('.');				   
	   var idindex	=	1;	 
	   if(attachment != undefined){
		  if(attachment.length > 0){		    
			   var array = attachment[attachment.length-1];
			   idindex = array.id;
			   idindex++;
		   }else {
			   idindex++;
		   }	
	   }
	
	   var objvalue = {
				"name":words[0],
				"type":words[words.length - 1],
				"size":bytesToSize(file.size),
				"file":readerValue,
				"active":0,
				"pestelAnalysisId":swotGlobalid
		}
	   
	/*if(attachment != undefined){		
		if(attachment.length > 0){
			attachment.push(objvalue);
		}else{		
			 attachment.push(objvalue);
		}
	}else{		
		finalatt.push(objvalue);
	}
	
	var swotObj			=	swotupdateDescription;
	if(swotObj.pestelAnalysisValue.attachment !=	undefined){
		swotObj.pestelAnalysisValue.attachment	=	attachment;
	}else{
		swotObj.pestelAnalysisValue.attachment	=	finalatt;
	}*/
	
	$.ajax({
        url: "/stratroom/pestelAttach",
        method: 'post',
        contentType: "application/json",
        async:false,
        data: JSON.stringify(objvalue),
        success: function (data, status) {
        	$.ajax({
        		url : "/stratroom/pestelAttachList/" + swotGlobalid,
        		async:false,
        		method:'GET',
        		success : function(datafile,status){
        			var systemip = 	localStorage.getItem('systemip');
    				var action 	= 	capitialize() +" Attachment Uploaded";
    				var navigateempId = $("#userPrincipalnavigate").val();
				    var data	=	{"createdBy":currentEmp,"userId":navigateempId,"typeId":swotGlobalid,"action":action,"systemIp":systemip};
    				auditrailpage(data,'file');
        			$('#attachementuploadfile').val('');	
                	$("#closeUpload").click();
                	checkmodalisclosedornot();
                	uploadShow(datafile);
        		}
        	});  
        },
		error:readErrorMsg
    });
		
});	

/*function checkmodalisclosedornot(){
	
	if($('#uploaded_files').is(':visible')	==	true){
		$(document.body).addClass('modal-open');				
	}
	$(".modal-backdrop").each(function(){
		var checkzindex	=	$(this).css('z-index');
		if($(this).hasClass("show")){
			if(checkzindex	>= 1040){
				$(this).css("z-index","1039");		
			}
		}
	});
	
	if($('#file_upload_popup').is(':visible')	==	false){
		$(document.body).addClass('modal-open');				
	}
	
	setTimeout(function(){  $(document.body).addClass('modal-open');
	}, 1000);
	
}*/

function bytesToSize(bytes) {
	   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	   if (bytes == 0) return '0 Byte';
	   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}



var del_attachment = [];
var attachmentObjId ='';
var value ="";
function deleteAttachment(id, objId){	
	value = $(this)	
	attachmentdeleteId = id;
	attachmentObjId = objId;
	$(window).on("resize", function(){
	    $(".modal:visible").each(alignModal);
	}); 
	$(".modal").on("shown.bs.modal", alignModal);
	/*$.ajax({
		url : "/stratroom/pestelAnalysis/" + id,
		async:false,
		method:'GET',
		success : function(data,status){
			swotupdateDescription	=	data;			
			del_attachment = data.pestelAnalysisValue.attachment;			
		},
		error:readErrorMsg
	});*/
}


function deleteuploadAttachment(){	
	/*var location_size = '';
	
	var deletobj ='';
	 $.each(del_attachment, function (i, List){	 
		 if(List.id == attachmentObjId){
			 deletobj = List;
			 location_size = i;			 
		 }
	 });
		 
	del_attachment.splice(location_size,1);
	 	 
	var swotObj			=	swotupdateDescription;
	if(swotObj.pestelAnalysisValue.attachment !=	undefined){
		swotObj.pestelAnalysisValue.attachment	=	del_attachment;
	}else{
		swotObj.pestelAnalysisValue.attachment	=	del_attachment;
	}*/
	if(attachmentObjId	==	""){
		return false;
	}
	$.ajax({
        url: "/stratroom/pestelAttach/"+attachmentObjId,
        method: 'DELETE',
        async:false,
        contentType: "application/json",
        success: function (data, status) {	 
        	$.ajax({
        		url : "/stratroom/pestelAttachList/" + swotGlobalid,
        		async:false,
        		method:'GET',
        		success : function(datafile,status){
        			var systemip = 	localStorage.getItem('systemip');
        			var action 	= 	capitialize() +" Attachment Deleted";
    				var navigateempId = $("#userPrincipalnavigate").val();
				    var data	=	{"createdBy":currentEmp,"userId":navigateempId,"typeId":swotGlobalid,"action":action,"systemIp":systemip};
    				auditrailpage(data,'delete');
                	checkmodalisclosedornot();
                	$("#deleteAttachmentModal").modal("hide");
        			uploadShow(datafile);
        		}
        	});
        },
		error:readErrorMsg
    });
}

function capitialize(){
	var str = 	localStorage.getItem('pestelcall_list');
	str	=	(str == null || str == ""?"Political":str).toLowerCase();
	return str.charAt(0).toUpperCase()+str.slice(1);
}
var update_attachment = [];
var updateattachementId ='';
var updateattachementObjId ='';
function updateAttachment(id, objId){	
	value = $(this)	
	updateattachementId = id;
	updateattachementObjId = objId;
	$.ajax({
		url : "/stratroom/pestelAttach/" + objId,
		async:false,
		method:'GET',
		success : function(data,status){
			//swotupdateDescription	=	data;			
			//update_attachment = data.pestelAnalysisValue.attachment;			
		},
		error:readErrorMsg
	});
}

$("#attachementupload1").click(function(){	
	
	if(!$("#attachementuploadfile1").val()){		
		$.notify("Error:Kindly upload a file", {
							  style: 'error',
							  className: 'graynotify'
							});
		return false;
	}
	
	var file		=	$('#attachementuploadfile1')[0].files[0];
	
	if(file	==	undefined){
		return false;
	}
	
	var fileName 	= 	file.name;
	const words 	= 	fileName.split('.');
			 
	
	/*	   for (var i in update_attachment) {
		     if (update_attachment[i].id == updateattachementObjId) {
		    	 update_attachment[i].name = words[0];
		    	 update_attachment[i].type = words[words.length - 1];
		    	 update_attachment[i].uploadedOn = new Date();
		    	 update_attachment[i].size = bytesToSize(file.size);
		    	 update_attachment[i].file_value = readerValue;
		        break; 
		     }
		   }
		   
	var swotObj			=	swotupdateDescription;
	if(swotObj.pestelAnalysisValue.attachment !=	undefined){
		swotObj.pestelAnalysisValue.attachment	=	update_attachment;
	} else {
		swotObj.pestelAnalysisValue.attachment	=	update_attachment;
	}*/
	
	
	var objvalue = {
			"id":updateattachementObjId,
			"name":words[0],
			"type":words[words.length - 1],
			"size":bytesToSize(file.size),
			"file":readerValue,
			"active":0,
			"pestelAnalysisId":swotGlobalid
	}
	
	$.ajax({
        url: "/stratroom/pestelAttach",
        method: 'PUT',
        async:false,
        contentType: "application/json",
        data: JSON.stringify(objvalue),
        success: function (data, status) {
        	$.ajax({
        		url : "/stratroom/pestelAttachList/" + swotGlobalid,
        		async:false,
        		method:'GET',
        		success : function(datafile,status){
        			var systemip = 	localStorage.getItem('systemip');
    				var action 	= 	capitialize() +" Attachment Modified";
    				var navigateempId = $("#userPrincipalnavigate").val();
				    var data	=	{"createdBy":currentEmp,"userId":navigateempId,"typeId":swotGlobalid,"action":action,"systemIp":systemip};
    				auditrailpage(data,'file1');
        			$('#attachementuploadfile1').val('');	
                	$("#closeUpload").click();      	
                	checkmodalisclosedornot();
                	uploadShow(datafile);   
                	$('#file_upload_popup1').modal('hide');
        		}
        	});	
        },
		error:readErrorMsg
    });
		
});	


$('.collapse_arrow_left').on('click', function() {
    $(this).css('display', 'none');
    $('.collapse_arrow_right').css('display', 'block');
    var $body = $('body');
    $body.addClass('ini-hide');
    $body.removeClass('ini-show');
    localStorage.setItem("sidebar_subsidemenu", "opened");
    initiativeBar();
});

$('.collapse_arrow_right').on('click', function() {
    $(this).css('display', 'none');
    $('.collapse_arrow_left').css('display', 'block');
    var $body = $('body');
    $body.addClass('ini-show');
    $body.removeClass('ini-hide');
    localStorage.setItem("sidebar_subsidemenu", "closed");
    initiativeBar();
});

$("#recommendationbody").on("click", ".remove-notes", function (e) {
	$('[data-toggle="tooltip"]').tooltip("hide");
	$('[rel="tooltip"]').tooltip("hide");
	$(this).parents(".notes_clone").remove();
});

$("#actionbody").on("click", ".remove-action", function (e) {
	$('[data-toggle="tooltip"]').tooltip("hide");
	$('[rel="tooltip"]').tooltip("hide");
	$(this).parents(".actions_clone").remove();
});

$(document).on("click","#allusersaccess",function(){
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}
	var propcheck	=	$(this).is(":checked");
	if(propcheck	==	true){
		$(".listusers input[name='swot_rec_owner[]']").each(function(index,value){
			$(this).prop("checked","checked");
		});
	}
	if(propcheck	==	false){
		$(".listusers input[name='swot_rec_owner[]']").each(function(index,value){
			$(this).prop("checked",false);
		});
	}
});

$("#search2").click(function () {
    $("#search_section2").show();
    $("#search2").hide();
});

$("#close_search2").click(function () {
	$("#searchrecommendation").val('');
	var value = $("#searchrecommendation").val().toLowerCase();
	$(".listusers .employe_content_border h5").filter(function(e) {
		var FindElement	=	$(this).closest("div.employe_content_border");
		//var FindElement	=	$(this).closest("div.employe_content_border").find(".profile_content");
		if($(this).text().toLowerCase().indexOf(value) > -1){
			$(FindElement).attr("style","display:block !important");
		}else{
			$(FindElement).attr("style","display:none !important");
		}
    });
    $("#search2").show();
    $("#search_section2").hide();
});

$("#searchrecommendation").on("keyup", function() {
	var value = $(this).val().toLowerCase();
	$(".listusers .employe_content_border h5").filter(function(e) {
		var FindElement	=	$(this).closest("div.employe_content_border");
		//var FindElement	=	$(this).closest("div.employe_content_border").find(".profile_content");
		if($(this).text().toLowerCase().indexOf(value) > -1){
			$(FindElement).attr("style","display:block !important");
		}else{
			$(FindElement).attr("style","display:none !important");
		}
    });
});

$(document).on("click","#allusersactions",function(){
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}
	var propcheck	=	$(this).is(":checked");
	if(propcheck	==	true){
		$(".actionslistusers input[name='swot_action_owner[]']").each(function(index,value){
			$(this).prop("checked","checked");
		});
	}
	if(propcheck	==	false){
		$(".actionslistusers input[name='swot_action_owner[]']").each(function(index,value){
			$(this).prop("checked",false);
		});
	}
});

$("#actions_search2").click(function () {
    $("#actions_search_section2").show();
    $("#actions_search2").hide();
});

$("#action_close_search2").click(function () {
	$("#searchactions").val('');
	var value = $("#searchactions").val().toLowerCase();
	$(".actionslistusers .employe_content_border h5").filter(function(e) {
		var FindElement	=	$(this).closest("div.employe_content_border");
		//var FindElement	=	$(this).closest("div.employe_content_border").find(".profile_content");
		if($(this).text().toLowerCase().indexOf(value) > -1){
			$(FindElement).attr("style","display:block !important");
		}else{
			$(FindElement).attr("style","display:none !important");
		}
    });
    $("#actions_search2").show();
    $("#actions_search_section2").hide();
});

$("#searchactions").on("keyup", function() {
	var value = $(this).val().toLowerCase();
	$(".actionslistusers .employe_content_border h5").filter(function(e) {
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
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}
	var propcheck	=	$(this).is(":checked");
	if(propcheck	==	true){
		$("#activities-ini-box_view_users input[name='activities_owner[]']").each(function(index,value){
			$(this).prop("checked","checked");
		});
	}
	if(propcheck	==	false){
		$("#activities-ini-box_view_users input[name='activities_owner[]']").each(function(index,value){
			$(this).prop("checked",false);
		});
	}
	
		var id				=	$("#swotajaxid").val();
		if(swotupdateDescription == undefined || swotupdateDescription == "" || swotupdateDescription.id == ""){
			return false;
		}
		var swotObj			=	swotupdateDescription;
		var multiowners	= 	$("input[name='activities_owner[]']:checked").map(function(){
	    	return this.value;
		}).get();
		
		if(multiowners.length	==	0){
			swotObj.pestelAnalysisValue.multipleOwners	=	currentEmp;	
		}else{
			swotObj.pestelAnalysisValue.multipleOwners	=	multiowners.join(',');
		}
	
		var methodType 		= 	'put';
		
		$.ajax({
			url : "/stratroom/pestelAnalysis/",
			type : methodType,
			contentType : "application/json",
			data : JSON.stringify(swotObj),
			success : function(data, status) {
				//$.notify("Updated Successfully");
			},
			error:function(msg,status){
			if(!jQuery.isEmptyObject(msg.responseText)){
				$.each(JSON.parse(msg.responseText),function(key,value){
					if(key 	==	"exception"){
						$.notify("Error:"+value,{
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
	$("#activities-ini-box_view_users .employe_content_border h5").filter(function(e) {
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
	$("#activities-ini-box_view_users .employe_content_border h5").filter(function(e) {
		var FindElement	=	$(this).closest("div.employe_content_border");
		//var FindElement	=	$(this).closest("div.employe_content_border").find(".profile_content");
		if($(this).text().toLowerCase().indexOf(value) > -1){
			$(FindElement).attr("style","display:block !important");
		}else{
			$(FindElement).attr("style","display:none !important");
		}
    });
});