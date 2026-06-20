
var business_impact = "";
var recommandation_text = "";
var radioValue = "";
var swottype = "";
var currentEmp = $("#userPrincipal").val().trim();
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
	console.log(oldowners,newowners, "oldowners,newowners");
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

// function subinitiativePorfileContent(usersimg, resultId) {
//   console.log(usersimg, resultId, "imageIddata");
//   var subinitiativeUser = "";
//   var returnresult = [];
//   var functionParams = resultId + "," + '"edit"';
//   var functionName = "";
//   var modalPopupName = "";
//   var profileBadgeIncrement = "";
//   if (usersimg != undefined) {
//     profileBadgeIncrement =
//       usersimg.length >= 3 ? parseInt(usersimg.length) - parseInt(2) : "";
//   }

//   var userseslectedData = [];
//   $.each(usersimg, function (index, users) {
//     if (users.id != undefined && users.id != 0) {
//       userseslectedData.push(users.id);
//     }
//   });

//   if (userseslectedData.length == 0) {
//     var users = topparentswotDetails;
//     userseslectedData.push(users.id);
//   }

//   var htmlcontent =
//     '<input type="hidden" value="' +
//     userseslectedData.join(",") +
//     '" id="activities_selected_user_' +
//     resultId +
//     '">';
//   returnresult["userownerlist_data"] = htmlcontent;
//   functionName = "handleMultioownersuserevent";

//   if (usersimg != undefined && usersimg.length != 0) {
//     var badgeincrement = false;
//     $.each(usersimg, function (index, users) {
//       var username = hasWhiteSpaceName(users.name);
//       if (username == "" || username == " ") {
//         username = "User";
//       }

//       var userProfileConcate =
//         users.image == undefined || users.image == ""
//           ? 'data-name="' + username + '" class="rounded-circle swotuserimage" '
//           : ' class="rounded-circle" src="' + users.image + '"';
//       subinitiativeUser +=
//         '<li class="avatar avatar-xs pull-up" onclick=' +
//         functionName +
//         "(" +
//         functionParams +
//         ")><img " +
//         userProfileConcate +
//         ' alt="' +
//         username +
//         '" width="50"></li>';
//       if (usersimg.length >= 3 && index >= 2 && index <= 2) {
//         subinitiativeUser = subinitiativeUser.replace(
//           '<li class="avatar avatar-xs pull-up" onclick=' +
//             functionName +
//             "(" +
//             functionParams +
//             ")><img " +
//             userProfileConcate +
//             ' alt="' +
//             username +
//             '" width="50"></li>',
//           ""
//         );
//         subinitiativeUser +=
//           '<li class="avatar avatar-xs pull-up" onclick=' +
//           functionName +
//           "(" +
//           functionParams +
//           ')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
//           profileBadgeIncrement +
//           "</span></li>";
//         badgeincrement = true;
//         return false;
//       }
//     });
//     if (badgeincrement == false) {
//       subinitiativeUser =
//         subinitiativeUser +
//         '<li class="avatar avatar-xs pull-up" onclick=' +
//         functionName +
//         "(" +
//         functionParams +
//         ')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+</span></li>';
//     }
//   } else {
//     var users = topparentswotDetails;
//     var username =
//       users.name == undefined || users.name == "" ? "User" : users.name;
//     var userProfileConcate =
//       users.image == undefined || users.image == ""
//         ? "data-name='" + username + "' class='rounded-circle swotuserimage' "
//         : " class='rounded-circle' src='" + users.image + "'";
//     subinitiativeUser =
//       '<li class="avatar avatar-xs pull-up" onclick=' +
//       functionName +
//       "(" +
//       functionParams +
//       ")><img " +
//       userProfileConcate +
//       ' alt="' +
//       username +
//       '" width="50"></li>';
//     subinitiativeUser =
//       subinitiativeUser +
//       '<li class="avatar avatar-xs pull-up" onclick=' +
//       functionName +
//       "(" +
//       functionParams +
//       ')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+</span></li>';
//   }
//   returnresult["userownerlist"] = subinitiativeUser;
//   return returnresult;
// }

// function recommendationPorfileContent(usersimg,resultId){
// 	var returnresult	=	[];
// 	var functionParams	=	resultId;
// 	var functionName	=	"";
// 	var modalPopupName	=	'data-toggle="modal" data-target="#addpeople"';
// 	var profileBadgeIncrement 	=	"";	
// 	var htmlcontent	=	'<input type="hidden" class="rec_multiownerid" id="rec_multiownerid_'+resultId+'" value="'+usersimg+'">';
// 	var multiowners	=	usersimg.split(",");
	
// 	returnresult['userownerlist_data']	=	htmlcontent;
	
// 	functionName	=	"recommendationaddpeople";
	
// 	if(jQuery.isEmptyObject(reporteelist)){
// 		$.ajax({
// 			url: "/stratroom/user/moduleAccessUserList?moduleName=PESTEL",
// 			success : function(data, status) {
// 				var subinitiativeUser	=	"";
// 				if(multiowners.length !=	data.length){
// 					var profileBadgeIncrement 	=	(multiowners.length >= 3?parseInt(multiowners.length)-parseInt(2):"");
// 					var badgeinc	=	false;
// 					var subinitiativeUser	=	"";
// 					$.each(data,function(key,users){
// 							$.each(multiowners,function(index,selectedvalue){
// 								if(selectedvalue ==	users.id){
// 									var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
// 									var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle rec_res_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
									
// 									if(index <= 2){
// 										subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
// 									}
									 
// 									if(multiowners.length >= 3 && index >= 2 && index <= 2){
// 										badgeinc	=	true;
// 										subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
// 										subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 										return false;
// 									}
// 								}
// 							});
// 					});
// 					if(badgeinc	==	false){
// 						subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 					}
// 					returnresult['userownerlist']	=	subinitiativeUser;
// 				}else{
// 					var profileBadgeIncrement 	=	(data.length >= 3?parseInt(data.length)-parseInt(2):0);
// 					var badgeinc	=	false;
// 					var subinitiativeUser	=	"";
// 					$.each(data,function(index,users){
// 						var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
// 						var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle rec_res_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
// 						if(index <= 2){
// 							subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
// 						}
						
// 						if(multiowners.length >= 3 && index >= 2 && index <= 2){
// 							badgeinc	=	true;
// 							subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
// 							subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 							return false;
// 						}
						
// 					});
					
// 					if(badgeinc	==	false){
// 						subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 					}
// 					returnresult['userownerlist']	=	subinitiativeUser;
// 				}
// 			}
// 		});
// 	}else{
// 		if(multiowners.length !=	reporteelist.length){
// 			var profileBadgeIncrement 	=	(multiowners.length >= 3?parseInt(multiowners.length)-parseInt(2):"");
// 			var badgeinc	=	false;
// 			var subinitiativeUser	=	"";
// 			$.each(reporteelist,function(key,users){
// 					$.each(multiowners,function(index,selectedvalue){
// 						if(selectedvalue ==	users.id){
// 							var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
// 							var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle rec_res_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
							
// 							if(index <= 2){
// 								subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
// 							}
							 
// 							if(multiowners.length >= 3 && index >= 2 && index <= 2){
// 								badgeinc	=	true;
// 								subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
// 								subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 								return false;
// 							}
// 						}
// 					});
// 			});
// 			if(badgeinc	==	false){
// 				subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 			}
// 			returnresult['userownerlist']	=	subinitiativeUser;
// 		}else{
// 			var profileBadgeIncrement 	=	(reporteelist.length >= 3?parseInt(reporteelist.length)-parseInt(2):0);
// 			var badgeinc	=	false;
// 			var subinitiativeUser	=	"";
// 			$.each(reporteelist,function(index,users){
// 				var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
// 				var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle rec_res_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
// 				if(index <= 2){
// 					subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
// 				}
				
// 				if(multiowners.length >= 3 && index >= 2 && index <= 2){
// 					badgeinc	=	true;
// 					subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
// 					subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 					return false;
// 				}
				
// 			});
			
// 			if(badgeinc	==	false){
// 				subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 			}
// 			returnresult['userownerlist']	=	subinitiativeUser;
// 		}
// 	}
// 	return returnresult;
// }

// function actionsPorfileContent(usersimg,resultId){
	
// 	var returnresult	=	[];
// 	var functionParams	=	resultId;
// 	var functionName	=	"actionsaddpeople";
// 	var modalPopupName	=	'data-toggle="modal" data-target="#addpeopleactions"';
// 	var profileBadgeIncrement 	=	"";	
// 	var htmlcontent	=	'<input type="hidden" class="action_multiownerid" id="action_multiownerid_'+resultId+'" value="'+usersimg+'">';
// 	var multiowners	=	usersimg.split(",");
// 	returnresult['userownerlist_data']	=	htmlcontent;
	
// 	if(jQuery.isEmptyObject(reporteelist)){	
// 		$.ajax({
// 			url: "/stratroom/user/moduleAccessUserList?moduleName=PESTEL",
// 			success : function(data, status) {
// 				var subinitiativeUser	=	"";
// 				if(multiowners.length !=	data.length){
// 					var profileBadgeIncrement 	=	(multiowners.length >= 3?parseInt(multiowners.length)-parseInt(2):"");
// 					var badgeinc	=	false;
// 					var subinitiativeUser	=	"";
// 					$.each(data,function(key,users){
// 							$.each(multiowners,function(index,selectedvalue){
// 								if(selectedvalue ==	users.id){
// 									var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
// 									var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
									
// 									if(index <= 2){
// 										subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
// 									}
									 
// 									if(multiowners.length >= 3 && index >= 2 && index <= 2){
// 										badgeinc	=	true;
// 										subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
// 										subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 										return false;
// 									}
// 								}
// 							});
// 					});
// 					if(badgeinc	==	false){
// 						subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 					}
// 					returnresult['userownerlist']	=	subinitiativeUser;
// 				}else{
// 					var profileBadgeIncrement 	=	(data.length >= 3?parseInt(data.length)-parseInt(2):0);
// 					var badgeinc	=	false;
// 					var subinitiativeUser	=	"";
// 					$.each(data,function(index,users){
// 						var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
// 						var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
// 						if(index <= 2){
// 							subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
// 						}
						
// 						if(multiowners.length >= 3 && index >= 2 && index <= 2){
// 							badgeinc	=	true;
// 							subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
// 							subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 							return false;
// 						}
						
// 					});
					
// 					if(badgeinc	==	false){
// 						subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 					}
// 					returnresult['userownerlist']	=	subinitiativeUser;
// 				}
// 			}
// 		});
// 	}else{
// 		if(multiowners.length !=	reporteelist.length){
// 			var profileBadgeIncrement 	=	(multiowners.length >= 3?parseInt(multiowners.length)-parseInt(2):"");
// 			var badgeinc	=	false;
// 			var subinitiativeUser	=	"";
// 			$.each(reporteelist,function(key,users){
// 					$.each(multiowners,function(index,selectedvalue){
// 						if(selectedvalue ==	users.id){
// 							var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
// 							var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
							
// 							if(index <= 2){
// 								subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
// 							}
							 
// 							if(multiowners.length >= 3 && index >= 2 && index <= 2){
// 								badgeinc	=	true;
// 								subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
// 								subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 								return false;
// 							}
// 						}
// 					});
// 			});
// 			if(badgeinc	==	false){
// 				subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 			}
// 			returnresult['userownerlist']	=	subinitiativeUser;
// 		}else{
// 			var profileBadgeIncrement 	=	(reporteelist.length >= 3?parseInt(reporteelist.length)-parseInt(2):0);
// 			var badgeinc	=	false;
// 			var subinitiativeUser	=	"";
// 			$.each(reporteelist,function(index,users){
// 				var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
// 				var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
// 				if(index <= 2){
// 					subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
// 				}
				
// 				if(multiowners.length >= 3 && index >= 2 && index <= 2){
// 					badgeinc	=	true;
// 					subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
// 					subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 					return false;
// 				}
				
// 			});
			
// 			if(badgeinc	==	false){
// 				subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 			}
// 			returnresult['userownerlist']	=	subinitiativeUser;
// 		}
// 	}
// 	return returnresult;
// }


function subinitiativePorfileContent(usersimg, resultId) {
  console.log(usersimg, resultId, "imageIddata");

  var subinitiativeUser = "";
  var returnresult = {};
  var functionParams = resultId + "," + '"edit"';
  var functionName = "handleMultioownersuserevent";

  // Extract user IDs
  var userseslectedData = [];
  $.each(usersimg, function (index, users) {
    if (users.id != undefined && users.id != 0) {
      userseslectedData.push(users.id);
    }
  });

  // Fallback to parent
  if (userseslectedData.length == 0 && typeof topparentswotDetails != 'undefined') {
    userseslectedData.push(topparentswotDetails.id);
  }

  // Hidden input
  returnresult["userownerlist_data"] =
    '<input type="hidden" value="' +
    userseslectedData.join(",") +
    '" id="activities_selected_user_' +
    resultId +
    '">';

  // Helper: Generate initials
  function getInitials(name) {
    var n = (name || "U").trim();
    if (n.length == 0) return "U";
    if (n.indexOf(" ") != -1) {
      var parts = n.split(" ");
      var initials = "";
      for (var i = 0; i < 2 && i < parts.length; i++) {
        initials += parts[i][0];
      }
      return initials.toUpperCase().substring(0, 2);
    }
    return n.substring(0, 2).toUpperCase();
  }

  // Helper: Generate color from string (deterministic)
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
    return colors[Math.abs(hash) % colors.length];
  }

  // Helper: Create SVG Data URL
  function createSvgDataUrl(name) {
    var initials = getInitials(name);
    var bgColor = getColor(name);
    var width = 30;
    var height = 30;

    var svg = 
      '<svg xmlns="http://www.w3.org/2000/svg" pointer-events="none" width="' + width + '" height="' + height + '" style="background-color: ' + bgColor + '; width: ' + width + 'px; height: ' + height + 'px; border-radius: 0px;">' +
        '<text text-anchor="middle" y="50%" x="50%" dy="0.35em" pointer-events="auto" fill="#ffffff" font-family="HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande, sans-serif" style="font-weight: 400; font-size: 14px;">' +
          initials +
        '</text>' +
      '</svg>';

    return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
  }

  // Render users
  if (usersimg && usersimg.length > 0) {
    var badgeAdded = false;

    $.each(usersimg, function (index, user) {
      if (badgeAdded && index >= 2) return;

      var username = (user.name || "User").trim();
      if (!username || username == " ") username = "User";

      var imgSrc = "";
      var dataNameAttr = 'data-name="' + username + '" ';

      if (user.image) {
        imgSrc = user.image;
        dataNameAttr = ""; // No need for data-name if real image
      } else {
        imgSrc = createSvgDataUrl(username);
      }

      var imgTag = 
        '<img class="rounded-circle rec_res_multiuserimage" ' + 
        dataNameAttr + 
        'src="' + imgSrc + '" alt="' + username + '" width="50">';

      if (usersimg.length >= 3 && index >= 2) {
        var extraCount = usersimg.length - 2;
        var plusSvg = createSvgDataUrl("+" + extraCount);
        subinitiativeUser += 
          '<li class="avatar avatar-xs pull-up" onclick="handleMultioownersuserevent(' + resultId + ', &quot;edit&quot;)">' +
            '<img class="rounded-circle rec_res_multiuserimage" data-name="+'+ extraCount +'" src="' + plusSvg + '" alt="+" width="50">' +
          '</li>';
        badgeAdded = true;
        return false;
      }

      subinitiativeUser += 
        '<li class="avatar avatar-xs pull-up" onclick="handleMultioownersuserevent(' + resultId + ', &quot;edit&quot;)">' +
          imgTag +
        '</li>';
    });

    // Add "+" button if less than 3 users
    if (!badgeAdded && usersimg.length < 3) {
      var plusSvg = createSvgDataUrl("+");
      subinitiativeUser += 
        '<li class="avatar avatar-xs pull-up" onclick="handleMultioownersuserevent(' + resultId + ', &quot;edit&quot;)">' +
          '<img class="rounded-circle rec_res_multiuserimage" data-name="+" src="' + plusSvg + '" alt="+" width="50">' +
        '</li>';
    }
  } else {
   
    var user = topparentswotDetails || { name: "User", id: 0 };
    var username = (user.name || "User").trim();
    if (!username || username == " ") username = "User";

    var imgSrc = user.image ? user.image : createSvgDataUrl(username);
    var dataNameAttr = user.image ? "" : 'data-name="' + username + '"';

    var plusSvg = createSvgDataUrl("+");
    subinitiativeUser += 
      '<li class="avatar avatar-xs pull-up" onclick="handleMultioownersuserevent(' + resultId + ', &quot;edit&quot;)">' +
        '<img class="rounded-circle rec_res_multiuserimage" ' + dataNameAttr + ' src="' + imgSrc + '" alt="' + username + '" width="50">' +
      '</li>' +
      '<li class="avatar avatar-xs pull-up" onclick="handleMultioownersuserevent(' + resultId + ', &quot;edit&quot;)">' +
        '<img class="rounded-circle rec_res_multiuserimage" data-name="+" src="' + plusSvg + '" alt="+" width="50">' +
      '</li>';
  }

  returnresult["userownerlist"] = subinitiativeUser;
  return returnresult;
}

function recommendationPorfileContent(usersimg,resultId){
  console.log(usersimg, resultId, "userResultId");
	var returnresult	=	[];
	var functionParams	=	resultId;
	var functionName	=	"";
	var modalPopupName	=	'data-toggle="modal" data-target="#addpeople"';
	var profileBadgeIncrement 	=	"";	
	var htmlcontent	=	'<input type="hidden" class="rec_multiownerid" id="rec_multiownerid_'+resultId+'" value="'+usersimg+'">';
	var multiowners	=	usersimg.split(",");
	
	returnresult['userownerlist_data']	=	htmlcontent;
	
	functionName	=	"recommendationaddpeople";

  console.log(reporteelist, "reportList");
	
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
										subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeople" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
									}
									 
									if(multiowners.length >= 3 && index >= 2 && index <= 2){
										badgeinc	=	true;
										subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeople" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
										subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeople" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
										return false;
									}
								}
							});
					});
					if(badgeinc	==	false){
						subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeople" onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
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
							subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeople" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
						}
						
						if(multiowners.length >= 3 && index >= 2 && index <= 2){
							badgeinc	=	true;
							subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeople" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
							subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeople" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
							return false;
						}
						
					});
					
					if(badgeinc	==	false){
						subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeople" onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
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
								subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeople" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
							}
							 
							if(multiowners.length >= 3 && index >= 2 && index <= 2){
								badgeinc	=	true;
								subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeople" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
								subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeople" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
								return false;
							}
						}
					});
			});
			if(badgeinc	==	false){
				subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeople" onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
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
					subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeople" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
				}
				
				if(multiowners.length >= 3 && index >= 2 && index <= 2){
					badgeinc	=	true;
					subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeople" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
					subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeople" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
					return false;
				}
				
			});
			
			if(badgeinc	==	false){
				subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeople" onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
			}
			returnresult['userownerlist']	=	subinitiativeUser;
		}
	}
	return returnresult;
}

function actionsPorfileContent(usersimg, resultId) {
  var returnresult = [];
  var functionParams = resultId;
  var functionName = "actionsaddpeople";
  var modalPopupName = 'data-toggle="modal" data-target="#addpeopleactions"';
  var profileBadgeIncrement = "";
  var htmlcontent =
    '<input type="hidden" class="action_multiownerid" id="action_multiownerid_' +
    resultId +
    '" value="' +
    usersimg +
    '">';
  var multiowners = usersimg.split(",");
  returnresult["userownerlist_data"] = htmlcontent;

  if (jQuery.isEmptyObject(reporteelist)) {
    $.ajax({
      url: "/stratroom/user/moduleAccessUserList?moduleName=PESTEL",
      success: function (data, status) {
        var subinitiativeUser = "";
        if (multiowners.length != data.length) {
          var profileBadgeIncrement =
            multiowners.length >= 3
              ? parseInt(multiowners.length) - parseInt(2)
              : "";
          var badgeinc = false;
          var subinitiativeUser = "";
          $.each(data, function (key, users) {
            $.each(multiowners, function (index, selectedvalue) {
              if (selectedvalue == users.id) {
                var username =
                  users.name == undefined || users.name == ""
                    ? "User"
                    : users.name;
                var userProfileConcate =
                  users.image == undefined || users.image == ""
                    ? "data-name='" +
                      username +
                      "' class='rounded-circle actions_multiuserimage' "
                    : "src='" + users.image + "' class='rounded-circle' ";

                if (index <= 2) {
                  subinitiativeUser +=
                    '<li class="avatar avatar-xs pull-up" ' +
                    modalPopupName +
                    " onclick=" +
                    functionName +
                    "(" +
                    functionParams +
                    ') data-selecteduser="' +
                    users.id +
                    '"><img ' +
                    userProfileConcate +
                    ' alt="' +
                    username +
                    '" width="50"></li>';
                }

                if (multiowners.length >= 3 && index >= 2 && index <= 2) {
                  badgeinc = true;
                  subinitiativeUser = subinitiativeUser.replace(
                    '<li class="avatar avatar-xs pull-up" ' +
                      modalPopupName +
                      " onclick=" +
                      functionName +
                      "(" +
                      functionParams +
                      ') data-selecteduser="' +
                      users.id +
                      '"><img ' +
                      userProfileConcate +
                      ' alt="' +
                      username +
                      '" width="50"></li>',
                    ""
                  );
                  subinitiativeUser +=
                    '<li class="avatar avatar-xs pull-up" ' +
                    modalPopupName +
                    " onclick=" +
                    functionName +
                    "(" +
                    functionParams +
                    ') data-selecteduser="' +
                    users.id +
                    '"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
                    profileBadgeIncrement +
                    "</span></li>";
                  return false;
                }
              }
            });
          });
          if (badgeinc == false) {
            subinitiativeUser =
              subinitiativeUser +
              '<li class="avatar avatar-xs pull-up" ' +
              modalPopupName +
              " onclick=" +
              functionName +
              "(" +
              functionParams +
              ')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
              profileBadgeIncrement +
              "</span></li>";
          }
          returnresult["userownerlist"] = subinitiativeUser;
        } else {
          var profileBadgeIncrement =
            data.length >= 3 ? parseInt(data.length) - parseInt(2) : 0;
          var badgeinc = false;
          var subinitiativeUser = "";
          $.each(data, function (index, users) {
            var username =
              users.name == undefined || users.name == "" ? "User" : users.name;
            var userProfileConcate =
              users.image == undefined || users.image == ""
                ? "data-name='" +
                  username +
                  "' class='rounded-circle actions_multiuserimage' "
                : "src='" + users.image + "' class='rounded-circle' ";
            if (index <= 2) {
              subinitiativeUser +=
                '<li class="avatar avatar-xs pull-up" ' +
                modalPopupName +
                " onclick=" +
                functionName +
                "(" +
                functionParams +
                ') data-selecteduser="' +
                users.id +
                '"><img ' +
                userProfileConcate +
                ' alt="' +
                username +
                '" width="50"></li>';
            }

            if (multiowners.length >= 3 && index >= 2 && index <= 2) {
              badgeinc = true;
              subinitiativeUser = subinitiativeUser.replace(
                '<li class="avatar avatar-xs pull-up" ' +
                  modalPopupName +
                  " onclick=" +
                  functionName +
                  "(" +
                  functionParams +
                  ') data-selecteduser="' +
                  users.id +
                  '"><img ' +
                  userProfileConcate +
                  ' alt="' +
                  username +
                  '" width="50"></li>',
                ""
              );
              subinitiativeUser +=
                '<li class="avatar avatar-xs pull-up" ' +
                modalPopupName +
                " onclick=" +
                functionName +
                "(" +
                functionParams +
                ') data-selecteduser="' +
                users.id +
                '"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
                profileBadgeIncrement +
                "</span></li>";
              return false;
            }
          });

          if (badgeinc == false) {
            subinitiativeUser =
              subinitiativeUser +
              '<li class="avatar avatar-xs pull-up" ' +
              modalPopupName +
              " onclick=" +
              functionName +
              "(" +
              functionParams +
              ')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
              profileBadgeIncrement +
              "</span></li>";
          }
          returnresult["userownerlist"] = subinitiativeUser;
        }
      },
    });
  } else {
    if (multiowners.length != reporteelist.length) {
      var profileBadgeIncrement =
        multiowners.length >= 3
          ? parseInt(multiowners.length) - parseInt(2)
          : "";
      var badgeinc = false;
      var subinitiativeUser = "";
      $.each(reporteelist, function (key, users) {
        $.each(multiowners, function (index, selectedvalue) {
          if (selectedvalue == users.id) {
            var username =
              users.name == undefined || users.name == "" ? "User" : users.name;
            var userProfileConcate =
              users.image == undefined || users.image == ""
                ? "data-name='" +
                  username +
                  "' class='rounded-circle actions_multiuserimage' "
                : "src='" + users.image + "' class='rounded-circle' ";

            if (index <= 2) {
              subinitiativeUser +=
                '<li class="avatar avatar-xs pull-up" ' +
                modalPopupName +
                " onclick=" +
                functionName +
                "(" +
                functionParams +
                ') data-selecteduser="' +
                users.id +
                '"><img ' +
                userProfileConcate +
                ' alt="' +
                username +
                '" width="50"></li>';
            }

            if (multiowners.length >= 3 && index >= 2 && index <= 2) {
              badgeinc = true;
              subinitiativeUser = subinitiativeUser.replace(
                '<li class="avatar avatar-xs pull-up" ' +
                  modalPopupName +
                  " onclick=" +
                  functionName +
                  "(" +
                  functionParams +
                  ') data-selecteduser="' +
                  users.id +
                  '"><img ' +
                  userProfileConcate +
                  ' alt="' +
                  username +
                  '" width="50"></li>',
                ""
              );
              subinitiativeUser +=
                '<li class="avatar avatar-xs pull-up" ' +
                modalPopupName +
                " onclick=" +
                functionName +
                "(" +
                functionParams +
                ') data-selecteduser="' +
                users.id +
                '"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
                profileBadgeIncrement +
                "</span></li>";
              return false;
            }
          }
        });
      });
      if (badgeinc == false) {
        subinitiativeUser =
          subinitiativeUser +
          '<li class="avatar avatar-xs pull-up" ' +
          modalPopupName +
          " onclick=" +
          functionName +
          "(" +
          functionParams +
          ')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
          profileBadgeIncrement +
          "</span></li>";
      }
      returnresult["userownerlist"] = subinitiativeUser;
    } else {
      var profileBadgeIncrement =
        reporteelist.length >= 3
          ? parseInt(reporteelist.length) - parseInt(2)
          : 0;
      var badgeinc = false;
      var subinitiativeUser = "";
      $.each(reporteelist, function (index, users) {
        var username =
          users.name == undefined || users.name == "" ? "User" : users.name;
        var userProfileConcate =
          users.image == undefined || users.image == ""
            ? "data-name='" +
              username +
              "' class='rounded-circle actions_multiuserimage' "
            : "src='" + users.image + "' class='rounded-circle' ";
        if (index <= 2) {
          subinitiativeUser +=
            '<li class="avatar avatar-xs pull-up" ' +
            modalPopupName +
            " onclick=" +
            functionName +
            "(" +
            functionParams +
            ') data-selecteduser="' +
            users.id +
            '"><img ' +
            userProfileConcate +
            ' alt="' +
            username +
            '" width="50"></li>';
        }

        if (multiowners.length >= 3 && index >= 2 && index <= 2) {
          badgeinc = true;
          subinitiativeUser = subinitiativeUser.replace(
            '<li class="avatar avatar-xs pull-up" ' +
              modalPopupName +
              " onclick=" +
              functionName +
              "(" +
              functionParams +
              ') data-selecteduser="' +
              users.id +
              '"><img ' +
              userProfileConcate +
              ' alt="' +
              username +
              '" width="50"></li>',
            ""
          );
          subinitiativeUser +=
            '<li class="avatar avatar-xs pull-up" ' +
            modalPopupName +
            " onclick=" +
            functionName +
            "(" +
            functionParams +
            ') data-selecteduser="' +
            users.id +
            '"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
            profileBadgeIncrement +
            "</span></li>";
          return false;
        }
      });

      if (badgeinc == false) {
        subinitiativeUser =
          subinitiativeUser +
          '<li class="avatar avatar-xs pull-up" ' +
          modalPopupName +
          " onclick=" +
          functionName +
          "(" +
          functionParams +
          ')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
          profileBadgeIncrement +
          "</span></li>";
      }
      returnresult["userownerlist"] = subinitiativeUser;
    }
  }
  return returnresult;
}


function getPestelList(swottype) {
  console.log(swottype, "swotttttttttttt");
	const storedLanguage = localStorage.getItem("selectedLang") || "en";
	loadLanguage(storedLanguage);
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
      //   success: function (response, status) {
			// pestelListShow(response,swottype);
      //   },

       success: function(response, status) {
            console.log(response, "responseData");
            if(response?.length > 0){
              pestelListShow(response, swottype);
              
              // After loading, ensure the correct section is expanded
              const $nestedItem = $('[data-id="pestel-child-' + 
                  (swottype == "POLITICAL" ? 1 : 
                  swottype == "ECONOMICAL" ? 2 : 
                  swottype == "SOCIAL" ? 3 : 
                  swottype == "TECHNOLOGICAL" ? 4 : 
                  swottype == "ENVIRONMENTAL" ? 5 : 6) + '"]');
              
              $nestedItem.find('.nested-area').addClass('active');
              $nestedItem.find('.caret').addClass('caret-down');
              }else {
                const data = []
                pestelListShow(data, swottype);
              }
          },
        error:function(err){
        	$(".sidebarcontent,.container-fluid,.page-header").show();
        }
    });
}



function pestelListShow(pestelList, typerequest) {
  console.log(pestelList, typerequest, "pestelList");

  var Political = "POLITICAL";
  var Economical = "ECONOMICAL";
  var Social = "SOCIAL";
  var Technological = "TECHNOLOGICAL";
  var Environmental = "ENVIRONMENTAL"
  var Legal = "LEGAL"
  var Pestel = "PESTLE"
  var BusinessImpact = "Business Impact";
  var Department = "Department";
  var NextDue = "Next Due";
  var Responsible = "Responsible";
  var SWOT = "SWOT";

  const storedLanguage = localStorage.getItem("selectedLang") || "en";

if (storedLanguage == "en") {
    Political  = "POLITICAL";
    Economical = "ECONOMICAL";
    Social = "SOCIAL";
    Technological = "TECHNOLOGICAL";
    Environmental = "ENVIRONMENTAL";
    Legal = "LEGAL";
    Pestel = "PESTLE";
    BusinessImpact = "Business Impact";
    Department = "Department";
    NextDue = "Next Due";
    Responsible = "Responsible";
    SWOT = "SWOT";
} else if (storedLanguage == "am") {
    Political  = "ፖለቲካዊ";
    Economical = "ኢኮኖሚካል";
    Social = "ማህበራዊ";
    Technological = "ቴክኖሎጂያዊ";
    Environmental = "አካባቢ ተዛማጅ";
    Legal = "ሕጋዊ";
    Pestel = "PESTEL";
    BusinessImpact = "የንግድ ተፅዕኖ";
    Department = "ዳርቻ / ክፍል";
    NextDue = "ቀጣይ ጊዜ";
    Responsible = "የተጠየቀ";
    SWOT = "SWOT ትንተና";
} else {
    // Arabic
    Political  = "سياسي";
    Economical = "اقتصادي";
    Social = "اجتماعي";
    Technological = "تكنولوجي";
    Environmental = "بيئي";
    Legal = "قانوني";
    Pestel = "بيستيل";
    BusinessImpact = "تأثير الأعمال";
    Department = "القسم";
    NextDue = "الموعد النهائي التالي";
    Responsible = "المسؤول";
    SWOT = "تحليل SWOT";
}


  // Base HTML structure for PESTEL analysis
  const baseHTML = `
    <div class="container-lg py-2">
      <div id="contentload">
        <div class="card custom-card" id="card-pestel">
          <div class="card-header">
            <div class="c-header-left">
              <h5 class="card-title me-auto">
                <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">`+Pestel+`</strong>
              </h5>
            </div>
          </div>
          <div class="card-body">
            <ul class="nested-area pestel-nested-main" id="strategy-pestel">
              <!-- Political Section -->
           

              <li class="nested-item non-draggable bg-pestel-1" data-id="pestel-child-1">
                <div class="caret" data-toggle-id="pestel-child-1" data-swot-type="POLITICAL"></div>
                <div class="card analysis-box parent">
                  <div class="analysis-section" id="SA-SWOT-01">
                    <div class="analysis-content">
                      <div class="icon text-white" style="width: 28px; text-align:center;">
                        <!-- <i class="fa fa-university" style="font-size: 18px;"></i> --!>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="landmark" style="width: 24px; height: 24px;" class="lucide lucide-landmark"><path d="M10 18v-7"></path><path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z"></path><path d="M14 18v-7"></path><path d="M18 18v-7"></path><path d="M3 22h18"></path><path d="M6 18v-7"></path></svg>
                      </div>


                      <div class="content" id="political_list">
                        <h5 class="card-title mt-1 text-white">
                          <strong>`+Political+`</strong>
                        </h5>
                      </div>
                    </div>
                    <div class="analysis-action">
                      <ul class="list-unstyled action-list">
                        <li>
                       <a href="#strength_desc_add_popup" data-bs-toggle="modal" 
                          onclick="handleswotevent('', 'Political', 'add');">
                          <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add Objective">
                             <i class="fa fa-plus title_edit_icon"></i>
                          </span>
                        </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <ul class="nested nested-area"></ul>
              </li>

               <li class="nested-item non-draggable bg-pestel-2" data-id="pestel-child-2">
                <div class="caret" data-toggle-id="pestel-child-2" data-swot-type="ECONOMICAL"></div>
                <div class="card analysis-box parent">
                  <div class="analysis-section" id="SA-SWOT-01">
                    <div class="analysis-content">
                  
                       <div class="icon text-white" style="width: 28px; text-align:center;">
                       <!-- <i class="fa fa-line-chart" style="font-size: 18px;"></i> --!>
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="chart-line" style="width: 24px; height: 24px;" class="lucide lucide-chart-line"><path d="M3 3v16a2 2 0 0 0 2 2h16"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
                      </div>
                      <div class="content" id="economical_list">
                        <h5 class="card-title mt-1 text-white">
                          <strong>`+Economical+`</strong>
                        </h5>
                      </div>
                    </div>
                    <div class="analysis-action">
                      <ul class="list-unstyled action-list">
                        <li>
                       <a href="#strength_desc_add_popup" data-bs-toggle="modal" 
                          onclick="handleswotevent('', 'Economical', 'add');">
                          <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add Objective">
                           <i class="fa fa-plus"></i>
                          </span>
                        </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <ul class="nested nested-area"></ul>
              </li>


               <li class="nested-item non-draggable bg-pestel-3" data-id="pestel-child-3">
                <div class="caret" data-toggle-id="pestel-child-3" data-swot-type="SOCIAL"></div>
                <div class="card analysis-box parent">
                  <div class="analysis-section" id="SA-SWOT-01">
                    <div class="analysis-content">
                     
                       <div class="icon text-white" style="width: 28px; text-align:center;">
                        <!-- <i class="fa fa-users" style="font-size: 18px;"></i> --!>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="users" style="width: 24px; height: 24px;" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
                      </div>
                      <div class="content" id="social_list">
                        <h5 class="card-title mt-1 text-white">
                          <strong>`+Social+`</strong>
                        </h5>
                      </div>
                    </div>
                    <div class="analysis-action">
                      <ul class="list-unstyled action-list">
                        <li>
                       <a href="#strength_desc_add_popup" data-bs-toggle="modal" 
                          onclick="handleswotevent('', 'Social', 'add');">
                          <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add Objective">
                           <i class="fa fa-plus"></i>
                          </span>
                        </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <ul class="nested nested-area"></ul>
              </li>


              <li class="nested-item non-draggable bg-pestel-4" data-id="pestel-child-4">
                <div class="caret" data-toggle-id="pestel-child-4" data-swot-type="TECHNOLOGICAL"></div>
                <div class="card analysis-box parent">
                  <div class="analysis-section" id="SA-SWOT-01">
                    <div class="analysis-content">
               
                       <div class="icon text-white" style="width: 28px; text-align:center;">
                        <!-- <i class="fa fa-cogs" style="font-size: 18px;"></i> --!>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="cpu" style="width: 24px; height: 24px;" class="lucide lucide-cpu"><path d="M12 20v2"></path><path d="M12 2v2"></path><path d="M17 20v2"></path><path d="M17 2v2"></path><path d="M2 12h2"></path><path d="M2 17h2"></path><path d="M2 7h2"></path><path d="M20 12h2"></path><path d="M20 17h2"></path><path d="M20 7h2"></path><path d="M7 20v2"></path><path d="M7 2v2"></path><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="8" y="8" width="8" height="8" rx="1"></rect></svg>
                      </div>
                      <div class="content" id="technological_list">
                        <h5 class="card-title mt-1 text-white">
                          <strong>`+Technological+`</strong>
                        </h5>
                      </div>
                    </div>
                    <div class="analysis-action">
                      <ul class="list-unstyled action-list">
                        <li>
                       <a href="#strength_desc_add_popup" data-bs-toggle="modal" 
                          onclick="handleswotevent('', 'Technological', 'add');">
                          <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add Objective">
                           <i class="fa fa-plus"></i>
                          </span>
                        </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <ul class="nested nested-area"></ul>
              </li>

              <li class="nested-item non-draggable bg-pestel-5" data-id="pestel-child-5">
                <div class="caret" data-toggle-id="pestel-child-5" data-swot-type="ENVIRONMENTAL"></div>
                <div class="card analysis-box parent">
                  <div class="analysis-section" id="SA-SWOT-01">
                    <div class="analysis-content">
                   
                       <div class="icon text-white" style="width: 28px; text-align:center;">
                        <!-- <i class="fa fa-leaf" style="font-size: 18px;"></i> --!>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="leaf" style="width: 24px; height: 24px;" class="lucide lucide-leaf"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
                      </div>
                      <div class="content" id="environmental_list">
                        <h5 class="card-title mt-1 text-white">
                          <strong>`+Environmental+`</strong>
                        </h5>
                      </div>
                    </div>
                    <div class="analysis-action">
                      <ul class="list-unstyled action-list">
                        <li>
                       <a href="#strength_desc_add_popup" data-bs-toggle="modal" 
                          onclick="handleswotevent('', 'Environmental', 'add');">
                          <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add Objective">
                           <i class="fa fa-plus"></i>
                          </span>
                        </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <ul class="nested nested-area"></ul>
              </li>

              <li class="nested-item non-draggable bg-pestel-6" data-id="pestel-child-6">
                <div class="caret" data-toggle-id="pestel-child-6" data-swot-type="LEGAL"></div>
                <div class="card analysis-box parent">
                  <div class="analysis-section" id="SA-SWOT-01">
                    <div class="analysis-content">
                     
                       <div class="icon text-white" style="width: 28px; text-align:center;">
                        <!-- <i class="fa fa-balance-scale" style="font-size: 18px;"></i> --!>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="scale" style="width: 24px; height: 24px;" class="lucide lucide-scale"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="M7 21h10"></path><path d="M12 3v18"></path><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path></svg>
                      </div>
                      <div class="content" id="legal_list">
                        <h5 class="card-title mt-1 text-white">
                          <strong>`+Legal+`</strong>
                        </h5>
                      </div>
                    </div>
                    <div class="analysis-action">
                      <ul class="list-unstyled action-list">
                        <li>
                       <a href="#strength_desc_add_popup" data-bs-toggle="modal" 
                          onclick="handleswotevent('', 'Legal', 'add');">
                          <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add Objective">
                           <i class="fa fa-plus"></i>
                          </span>
                        </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <ul class="nested nested-area"></ul>
              </li>


            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  // Insert the base HTML structure
  $("#strength_section").html(baseHTML);

  // Initialize tooltips and avatars
  $(".pesteluserimage").initial({
    charCount: 2,
    height: 30,
    width: 30,
    fontSize: 18,
  });
  $('[data-toggle="tooltip"]').tooltip();
  $('[rel="tooltip"]').tooltip();
  $(".sidebarcontent,.container-fluid,.page-header").show();

  // If we have data to show immediately (from initial load)
  if (pestelList && pestelList.length > 0) {
    populatePestelSection(typerequest, pestelList);
  }

  // Caret click handler - loads content when expanding
//   $(document).on('click', '.caret', function(e) {
//     const toggleId = $(this).data('toggle-id');
//     const pestelType = $(this).data('pestel-type');
//     console.log(pestelType, toggleId, "pestelTypeout");
    
//     if (!$(this).hasClass('activepestelwrap')) {
//       loadPestelContent(pestelType, $(this).closest('.nested-item'));
//     }
//   });


//  $(document).on("click", ".caret", function () {
//         const rowId = $(this).data("toggle-id");
//         const $nestedList = $(`[data-id="${rowId}"]`).find(".nested").first();
//       console.log(rowId, $nestedList.length, );
//         if ($nestedList.length) {
//             $nestedList.toggleClass("active");
//             $(this).toggleClass("caret-down");
//         }
//     });


  // Format SWOT type correctly
  function formatSwotType(type) {
    const mappings = {
      'POLITICAL': 'POLITICAL',
      'ECONOMICAL': 'ECONOMICAL',
      'SOCIAL': 'SOCIAL',
      'TECHNOLOGICAL': 'TECHNOLOGICAL',
      'ENVIRONMENTAL': 'ENVIRONMENTAL',
      'LEGAL': 'LEGAL',
    };
    return mappings[type.toLowerCase()] || type;
  }


  // Click handler for the main PESTEL items (not the caret)
  // $(document).on('click', '[id$="_list"]', function(e) {
  //   // Ignore if clicking on the caret
  //   if ($(e.target).hasClass('caret') || $(e.target).closest('.caret').length) {
  //     return;
  //   }

  //   const pestelType = $(this).attr('id').replace('_list', '');
  //   const formattedType = pestelType.toUpperCase();
    
  //   if (!$(this).hasClass('activepestelwrap')) {
  //     loadPestelContent(formattedType, $(this).closest('.nested-item'));
  //   }
  // });

    $(document).on('click', '[id$="_list"]', function(e) {
    // Ignore if clicking on the caret
    if ($(e.target).hasClass('caret') || $(e.target).closest('.caret').length) {
      return;
    }

    const swotType = $(this).attr('id').replace('_list', '');
    
    const formattedType = formatSwotType(swotType);

    console.log(swotType, formattedType, "swotType");
    
    if (!$(this).hasClass('activeswotwrap')) {
      loadSloadPestelContentwotContent(formattedType, $(this).closest('.nested-item'));
    }
  });



  // Populate a PESTEL section with data
  function populatePestelSection(typerequest, pestelList) {
    console.log(typerequest, pestelList, "eeeeeeeee");
    let colorwrap = "";
    let pesteltexttype = "";
    
    // Determine styling based on PESTEL type
    if (typerequest == "POLITICAL") {
      colorwrap = "politicalwrap";
      pesteltexttype = "P";
    } else if (typerequest == "ECONOMICAL") {
      colorwrap = "economicalwrap";
      pesteltexttype = "E";
    } else if (typerequest == "SOCIAL") {
      colorwrap = "socialwrap";
      pesteltexttype = "S";
    } else if (typerequest == "TECHNOLOGICAL") {
      colorwrap = "technologicalwrap";
      pesteltexttype = "T";
    } else if (typerequest == "ENVIRONMENTAL") {
      colorwrap = "environmentalwrap";
      pesteltexttype = "E";
    } else if (typerequest == "LEGAL") {
      colorwrap = "legalwrap";
      pesteltexttype = "L";
    }
    
    // Create the items for this PESTEL section
    let itemsHTML = "";
     
    // Add each PESTEL item
    $.each(pestelList, function(i, List) {
      // Determine status flag color
      let flagcolor = "#20eaab";
      const status_flag_text = List.pestelAnalysisValue.status_flag;
      if (status_flag_text == "warning") {
        flagcolor = "#fffb10";
      } else if (status_flag_text == "danger") {
        flagcolor = "#ea2020";
      }
      
      // Get basic item data
      const pestel_text = List.pestelAnalysisValue.name || "";
      const pestel_type = List.pestelAnalysisValue.type || "";
      let impactname = List.pestelAnalysisValue.impact || "";
      
      if (impactname !== "" && List.pestelAnalysisValue.impact_name !== undefined) {
        impactname = List.pestelAnalysisValue.impact_name;
      }
      
      // Format date
      let subdaterangeformatted = "";
      if (List.pestelAnalysisValue.nextduedate !== undefined) {
        subdaterangeformatted = dateFormatedtohumanread(List.pestelAnalysisValue.nextduedate);
      }

      $.each(reporteelist, function(ownkey, empvalue) {
        if (empvalue.id == List.createdBy) {
          topparentswotDetails = {
            id: empvalue.id,
            name: empvalue.name,
            image: empvalue.image,
            dept: empvalue.dept
          };
        }
      });
      
      // Get owner data
      let topparentpestelDetails = {};
      $.each(reporteelist, function(ownkey, empvalue) {
        if (empvalue.id == List.createdBy) {
          topparentpestelDetails = {
            id: empvalue.id,
            name: empvalue.name,
            image: empvalue.image,
            dept: empvalue.dept
          };
        }
      });
      
      const resultPorfileContent = subinitiativePorfileContent(List.multipleOwerlist, List.id);
      
      // Determine which action buttons to show based on permissions
      let enableeditBtn = "";
      let enableOwnerBtn = "";
      let enableRecommendation = "";
      let enableAction = "";
      let enableFileupload = "";
      let enabledeleteBtn = "";
      
      if (editpermission == true) {
        enableeditBtn = `<i class="fas fa-pen" data-bs-toggle="modal" rel="tooltip" data-placement="bottom" title="Edit" data-target="#strength_desc_add_popup" onclick="handleswotevent(${List.id},'${typerequest}','edit')"></i>`;
      }
      
      if (editpermission == true || createpermission == true || deletepermission == true || meetingsloadcontent == true) {
        enableOwnerBtn = `data-toggle="modal" data-target=".swot_add_multiuser_popup" id="initiativeactivitieUser_${List.id}" style="cursor: pointer;"`;
      }
      
      if (recloadcontent) {
        enableRecommendation = `data-toggle="modal" data-target="#recommendation" onclick="handlerecommendationevent(${List.id},'${typerequest}','recommendation')"`;
      }
      
      if (actionloadcontent) {
        enableAction = `data-toggle="modal" data-target="#action" onclick="handleactionevent(${List.id},'${typerequest}','recommendation')"`;
      }
      
      if (attloadcontent) {
        enableFileupload = `data-toggle="modal" data-target="#uploaded_files"`;
      }
      
      if (deletepermission == true) {
        enabledeleteBtn = `<i class="fas fa-trash" rel="tooltip" data-placement="bottom"  onclick="handleswotevent(${List.id},'${typerequest}','delete')"></i>`;
      }
      
      // Create the item HTML
      itemsHTML += `
        <li class="nested-item non-draggable">
          <div class="card analysis-box parent">
            <div class="analysis-section flex-column">
              <div class="analysis-content border-bottom">
                <div class="icon">
                  <img src="${flagcolor == '#20eaab' ? 'https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-green-i.svg' : 
                       flagcolor == '#fffb10' ? 'https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-yellow-i.svg' : 
                       'https://stratroom.io/projects/mg-portal-html/assets/images/icons/buzzer-red-i.svg'}" 
                       width="16" height="16">
                </div>
                <div class="content">
                  <div class="analysis-head flex flex-wrap flex-sm-nowrap">
                    <p class="analysis-label"><strong>${pestel_text}</strong></p>
                    <div class="analysis-action p-0">
                      <ul class="list-unstyled action-list">
                        <li>
                          <a href="#notes-modal" data-toggle="modal" ${enableRecommendation}>
                            <span class="icon" data-toggle="tooltip" data-placement="bottom" title="Notes">
                              <!-- <i class="fa fa-sticky-note title_edit_icon" ></i> --!>
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="notebook-pen" style="width: 12px; height: 12px;" class="lucide lucide-notebook-pen"><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"></path><path d="M2 6h4"></path><path d="M2 10h4"></path><path d="M2 14h4"></path><path d="M2 18h4"></path><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"></path></svg>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="#action-modal" data-bs-toggle="modal" ${enableAction}>
                            <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Action">
                              <!-- <i class="fa fa-cog title_edit_icon"></i> -->
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="settings" style="width: 12px; height: 12px;" class="lucide lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="#attachment-modal" data-bs-toggle="modal" ${enableFileupload} onclick="handleUploadShow(${List.id})">
                            <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Attachment">
                              <!-- <i class="fa fa-paperclip title_edit_icon"></i> --!>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="paperclip" style="width: 12px; height: 12px;" class="lucide lucide-paperclip"><path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"></path></svg>

                            </span>
                          </a>
                        </li>
                        <li class="dropdown">
                          <a class="" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                            <span class="icon" title="Action">
                               <!-- <i class="fa fa-ellipsis-v"></i> --!>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis-vertical" style="width: 12px; height: 12px;" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                            </span>
                          </a>
                          <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                            <li>
                              <a class="dropdown-item" href="#strength_desc_add_popup" data-bs-toggle="modal" onclick="handleswotevent(${List.id},'${typerequest}','edit')">Edit</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#delete-modal" data-bs-toggle="modal" onclick="handleswotevent(${List.id},'${typerequest}','delete')">Delete</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="analysis-details">
                <div class="form-group">
                  <label class="form-label">`+Department+`</label>
                  <div class="d-flex flex-wrap gap-1">
                    <span class="badge label-bg-blue">${List.department || ""}</span>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">`+BusinessImpact+`</label>
                  <div class="d-flex flex-wrap gap-1">
                    <span class="badge label-bg-cyan">${impactname}</span>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">`+NextDue+`</label>
                  <p class="form-control-plaintext">${subdaterangeformatted}</p>
                </div>
                <div class="form-group">
                  <label class="form-label">`+Responsible+`</label>
                  <ul class="list-unstyled d-flex align-items-center avatar-group mb-0" data-toggle="modal" data-target=".swot_add_multiuser_popup" id="initiativeactivitieUser_${List.id}" style="cursor: pointer;">
                    ${resultPorfileContent['userownerlist']}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </li>
      `;
    });
    
    // Find the correct nested area to populate
    let $nestedArea;
    if (typerequest == "POLITICAL") {
      console.log("11111");
      $nestedArea = $("#strategy-pestel > li:nth-child(1) > .nested");
    } else if (typerequest == "ECONOMICAL") {
       console.log("22")
      $nestedArea = $("#strategy-pestel > li:nth-child(2) > .nested");
    } else if (typerequest == "SOCIAL") {
       console.log("33")
      $nestedArea = $("#strategy-pestel > li:nth-child(3) > .nested");
    } else if (typerequest == "TECHNOLOGICAL") {
       console.log("44")
      $nestedArea = $("#strategy-pestel > li:nth-child(4) > .nested");
    } else if (typerequest == "ENVIRONMENTAL") {
       console.log("55")
      $nestedArea = $("#strategy-pestel > li:nth-child(5) > .nested");
    } else if (typerequest == "LEGAL") {
       console.log("66")
      $nestedArea = $("#strategy-pestel > li:nth-child(6) > .nested");
    }
    
    // Populate the nested area
    if ($nestedArea.length) {
      console.log("function clicked");
      $nestedArea.html(itemsHTML);
      
      // Mark as loaded
      $nestedArea.parent().data('loaded', true).data('loadedType', typerequest);
      
      // If this is the active section, expand it
      if (localStorage.getItem("pestelcall_list") == typerequest) {
        $nestedArea.addClass('active');
        $nestedArea.siblings('.caret').addClass('caret-down');
      }
    }
  }
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
        '<div class="d-flex flex-column"><ul class="list-unstyled order-list d-flex"><li class="avatar avatar-xs pull-up"><img class="rounded-circle sub_init_img" src="../../assets/images/user/user9.jpg" alt="user" width="50"></li> <li class="avatar avatar-xs pull-up"><img class="rounded-circle sub_init_img" src="../../assets/images/user/user9.jpg" alt="user" width="50"></li><li class="avatar avatar-xs pull-up"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+3</span></li><div class="image-upload"><label for="file-input"><li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" class="favgs" data-toggle="modal" data-target="#addpeople"> <span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle" id="mutipleOwners">+<span id="count"> </span></span></a></li></label></div> </ul> </div>';

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
// function recommendationaddpeople(id){
// 	console.log(id, "idd");
// 	$("#responsibleid").val(id);
// 	var id	=	$("#rec_multiownerid_"+id).val();
// 	if(id	==	""){
// 		id	=	currentEmp;
// 	}
// 	// id		=	id.split(",");
// 	getreporteeeList(id,".listusers");
// 	$('.swotrecmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
// 	$('#addpeople .sub-ini-box').slimscroll({
// 		height: '450px',
// 		size: '3px',
// 		color: '#9c9c9c'
// 	});
// }


function recommendationaddpeople(id) {
  $("#responsibleid").val(id);
  var id = $("#rec_multiownerid_" + id).val();
  if (id == "") {
    id = currentEmp;
  }
  id = id.split(",");
  getreporteeeList(id, ".listusers");
  $(".swotrecmultiuserimage").initial({
    charCount: 2,
    height: 30,
    width: 30,
    fontSize: 18,
  });
  $("#addpeople .sub-ini-box").slimscroll({
    height: "450px",
    size: "3px",
    color: "#9c9c9c",
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

// $("#actionspeopleSave").click(function () {
//     var multiowners	= 	$(".actionslistusers input[name='swot_rec_owner[]']:checked").map(function(){
//     	return this.value;
// 	}).get();

// 	var res_peopleid	=	$("#actionsresponsibleid").val();
// 	if(multiowners.length	==	0){
// 		$("#action_multiownerid_"+res_peopleid).val(currentEmp);
// 	}else{
// 		$("#action_multiownerid_"+res_peopleid).val(multiowners.join(','));
// 	}
//     $("#addpeopleactions").modal("hide")
// 	checkmodalisclosedornot();
// })

$("#actionspeopleSave").click(function () {
  var multiowners = $(
    ".actionslistusers input[name='swot_rec_owner[]']:checked"
  )
    .map(function () {
      return this.value;
    })
    .get();

  var res_peopleid = $("#actionsresponsibleid").val();
  if (multiowners.length == 0) {
    $("#action_multiownerid_" + res_peopleid).val(currentEmp);
  } else {
    $("#action_multiownerid_" + res_peopleid).val(multiowners.join(","));
  }
  $("#addpeopleactions").modal("hide");
  checkmodalisclosedornot();
});


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
	console.log(id, listtype, "listtype");
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
					var subinitiativeUser 	=	'<div class="list-group-item attendee employe_content_border sub_initiative_details">' +
    '<div class="form-check cusom-check form-check-reverse profile_content">' +
        '<input class="form-check-input" type="checkbox" name="swot_action_owner[]" id="swot_action_owner_' + List.id + '" ' + sts + ' value="' + List.id + '">' +
        '<label class="form-check-label" for="swot_action_owner_' + List.id + '">' +
            '<span class="image">' +
                '<img alt="' + username + '" ' + userProfileConcate + ' width="18" height="18">' +
            '</span>' +
            '<span class="name">' + username + '</span>' +
        '</label>' +
    '</div>' +
'</div>'
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
					var subinitiativeUser 	=	'<div class="list-group-item attendee employe_content_border sub_initiative_details">' +
    '<div class="form-check cusom-check form-check-reverse profile_content">' +
        '<input class="form-check-input" type="checkbox" name="swot_action_owner[]" id="swot_action_owner_' + List.id + '" ' + sts + ' value="' + List.id + '">' +
        '<label class="form-check-label" for="swot_action_owner_' + List.id + '">' +
            '<span class="image">' +
                '<img ' + userProfileConcate + ' alt="' + username + '">' +
            '</span>' +
            '<span class="name">' + username + '</span>' +
        '</label>' +
    '</div>' +
'</div>'
                    $(listtype).append(subinitiativeUser);
                    $('.swotrecmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
                    //$(listtype).append(listusers);
                }

            });
        }
    });
}


function getreporteeeList(id, listtype) {
	console.log(id, listtype, "listtype");
  $(listtype).empty();
  var methodType = "get";
  var listusers = "";

  $.ajax({
    url: "/stratroom/user/moduleAccessUserList?moduleName=PESTEL",
    contentType: "application/json",
    success: function (data, status) {
      $.each(data, function (i, List) {
        var status = "";
        var image = "";
        if (
          !List.image == undefined ||
          !List.image == "" ||
          !List.image == undefined
        ) {
          image = List.image;
        }
        if (id) {
          $.each(id, function (i, item) {
            if (List.id == item) {
              status = "checked";
            }
          });
          if (data.length == 0) {
            $(".showallusericon").css("display", "none");
          }

          if (data.length == id.length) {
            $("#allusersaccess").prop("checked", "checked");
          } else {
            $("#allusersaccess").prop("checked", false);
          }
          var sts = "";
          if (status == "checked") {
            sts = "checked";
          } else {
            sts = "unchecked";
          }
          listusers =
            "<tr>" +
            '<td><input type="checkbox" name="chk" id="' +
            List.id +
            '" ' +
            sts +
            "/></td>" +
            "<td><span >" +
            List.name +
            "</span></td>" +
            '<td><span ><img src="' +
            image +
            '" /></span></td>' +
            "</tr>";
          var username =
            List.name == undefined || List.name == "" ? "User" : List.name;
          var userProfileConcate =
            image == undefined || image == ""
              ? "data-name='" +
                username +
                "' class='rounded-circle swotrecmultiuserimage' "
              : " class='rounded-circle' src='" + image + "'";
         var subinitiativeUser = 
    '<div class="list-group-item attendee">' +
        '<div class="form-check cusom-check form-check-reverse">' +
            '<input id="" class="form-check-input" name="swot_rec_owner[]" ' +
            sts +
            ' type="checkbox" value="' +
            List.id +
            '">' +
            '<label class="form-check-label" for="attendee_' + List.id + '">' +
                '<span class="image">' +
                    '<img ' + userProfileConcate + ' alt="' + username + '" width="18" height="18">' +
                '</span>' +
                '<span class="name">' + username + '</span>' +
            '</label>' +
        '</div>' +
    '</div>';
          $(listtype).append(subinitiativeUser);
          $(".swotrecmultiuserimage").initial({
            charCount: 2,
            height: 30,
            width: 30,
            fontSize: 18,
          });
        } else {
          listusers =
            "<tr>" +
            '<td><input type="checkbox" name="chk" id="' +
            List.id +
            '"/></td>' +
            "<td><span >" +
            List.name +
            "</span></td>" +
            '<td><span ><img src="' +
            image +
            '" /></span></td>' +
            "</tr>";
          var username =
            List.name == undefined || List.name == "" ? "User" : List.name;
          var userProfileConcate =
            image == undefined || image == ""
              ? "data-name='" +
                username +
                "' class='rounded-circle swotrecmultiuserimage' "
              : " class='rounded-circle' src='" + image + "'";
         var subinitiativeUser = 
    '<div class="list-group-item attendee">' +
        '<div class="form-check cusom-check form-check-reverse">' +
            '<input class="form-check-input" type="checkbox" name="swot_rec_owner[]" id="attendee_' + List.id + '" ' + sts + ' value="' + List.id + '">' +
            '<label class="form-check-label" for="attendee_' + List.id + '">' +
                '<span class="image">' +
                    '<img ' + userProfileConcate + ' alt="' + username + '" width="18" height="18">' +
                '</span>' +
                '<span class="name">' + username + '</span>' +
            '</label>' +
        '</div>' +
    '</div>';
          $(listtype).append(subinitiativeUser);
          $(".swotrecmultiuserimage").initial({
            charCount: 2,
            height: 30,
            width: 30,
            fontSize: 18,
          });
          // $(listtype).append(listusers);
        }
      });
    },
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

// function notes(tableID) {
//     console.log(tableID, "table");
//     var table = document.getElementById(tableID);
//     var users = topparentswotDetails;
//     var rowCount = table.rows.length;
//     var row = table.insertRow(rowCount);
//     rowCount = parseInt(parseInt(rowCount) - parseInt(1));
    
//     // Get user details
//     var username = ((users.name == undefined || users.name == "") ? "User" : users.name);
//     var userProfileConcate = ((users.image == undefined || users.image == "") ? 
//         "data-name='"+username+"' class='rounded-circle rec_res_multiuserimage'" : 
//         "src='"+users.image+"' class='rounded-circle'");
    
//     // Create the content for each cell
//     var cell1 = row.insertCell(0);
//     cell1.innerHTML = `
//         <div class="form-group">
//             <textarea class="form-control recommendation" placeholder="Notes" rows="3" name="recommendation[]"></textarea>
//         </div>`;
    
//     // Create user avatars list
//     var userAvatars = `
//         <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
//             <li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip" data-bs-placement="top" title="${username}">
//                 <img ${userProfileConcate} alt="${username}" width="24" height="24">
//             </li>`;
    
//     if(receditpermission == true || reccreatepermission == true) {
//         userAvatars += `
//             <li class="avatar avatar-xs pull-up" href="#attendess-list" data-bs-toggle="modal" onclick="recommendationaddpeople(${rowCount})">
//                 <span class="avatar-initial rounded-circle" data-bs-toggle="tooltip" data-bs-placement="top" >+</span>
//             </li>`;
//     } else {
//         userAvatars += `
//             <li class="avatar avatar-xs pull-up" onclick="return false;">
//                 <span class="avatar-initial rounded-circle">+</span>
//             </li>`;
//     }
    
//     userAvatars += `</ul>`;
    
//     var cell2 = row.insertCell(1);
//     cell2.className = "align-middle";
//     cell2.innerHTML = `
//         <input type="hidden" class="rec_multiownerid" id="rec_multiownerid_${rowCount}" name="multiowners[]" value="${users.id}">
//         <div class="d-flex align-items-start justify-content-center">
//             ${userAvatars}
//         </div>`;
    
//     var cell3 = row.insertCell(2);
//     cell3.className = "text-end align-middle";
    
//     var actionButtons = '';
//     if(deletepermission == true) {
//         actionButtons = `
//             <div class="table-actions justify-content-center">
//                 <a href="#" class="btn btn-sm btn-icon">
//                     <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" >
//                         <img src="assets/images/icons/delete-i.svg" width="12" height="12" />
//                     </span>
//                 </a>
//             </div>`;
//         $(row).addClass("notes_clone");
//     }
    
//     cell3.innerHTML = actionButtons;
    
//     // Initialize tooltips and user initials
//     $('.rec_res_multiuserimage').initial({ 
//         charCount: 2, 
//         height: 24, 
//         width: 24, 
//         fontSize: 12 
//     });
    
//     $('[data-bs-toggle="tooltip"]').tooltip();
    
//     // Set the form type
//     if($('#recommendation').is(':visible')) {
//         $("#recommendationtype").val('create');
//     }
//     if($('#action').is(':visible')) {
//         $("#actiontype").val('create');
//     }
// }

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

// function recommendationsubmit(){
// 		var recommendation	=	[];
// 		var idindex	=	0;
// 		var reclastlength =$("#recommendationcount").val();
// 		var recnewlength =$('.recommendation').length;
// 		var diff ="";
// 		var check="";
// 		if(recnewlength>reclastlength){
// 		 diff=recnewlength-reclastlength;
// 		 check=recnewlength-diff;
// 		}
// 		$('.recommendation').each(function(val,index){
// 			var name		=	$(this).val();
// 			var multiowner	=	$(this).closest("td").next("td").find('.rec_multiownerid').val();
// 			var ownersname = 	localStorage.getItem('ownersname_'+idindex);
// 			var oldowners = 	localStorage.getItem('recommendowners_'+idindex);
// 			var newowners;
// 			if((check != "" && idindex>=check) || reclastlength==0 || oldowners == null || name != ownersname){
// 				newowners= multiowner;
// 			}
// 			else{
// 				newowners = getNewOwners(oldowners,multiowner);
// 			}
// 			recommendation.push({"id":idindex,"name":name,"multipleOwners":multiowner,"newMultipleOwners":newowners});
// 			idindex++;
// 		});
// 		var swotObj 	= 	swotupdateDescription;
// 		swotObj['recommendationmethod']	=	true;
// 		if(swotObj.pestelAnalysisValue.recommendation !=	undefined){
// 			swotObj.pestelAnalysisValue.recommendation	=	recommendation;
// 		}else{
// 			swotObj.pestelAnalysisValue.recommendation	=	recommendation;
// 		}
// 			swotupdateDescription.pestelAnalysisValue.newMultipleOwners = "";
// 		for(var i=0;i<swotObj.pestelAnalysisValue.actions.length;i++){
// 			swotupdateDescription.pestelAnalysisValue.actions[i].newMultipleOwners = "";
// 		}
// 	    $.ajax({
// 	        url: "/stratroom/pestelAnalysis",
// 	        type: "put",
// 	        contentType: "application/json",
// 	        data: JSON.stringify(swotObj),
// 	        success: function (data, status) {
// 				$.notify("Success: Updated Successfully", {
// 							  style: 'success',
// 							  className: 'graynotify'
// 							});
// 				var systemip = 	localStorage.getItem('systemip');
// 				var type	=	$("#recommendationtype").val();
// 				var count	=	$("#recommendationcount").val();
// 				if(count < $('.recommendation').length){
// 					type	=	"create";
// 				}else if(count > $('.recommendation').length){
// 					type	=	"delete";
// 				}else if(count == $('.recommendation').length){
// 					type	=	"update";
// 				}
// 				if($("#recommendationtype").val() ==	"create"){
// 					type	=	"create";
// 				}
// 				var action 	= 	"";
// 				if(type	==	"create"){
// 					action	=	capitialize() +" Recommendation Created";
// 				}else if(type	==	"update"){
// 					action	=	capitialize() +" Recommendation Modified";
// 				}else if(type	==	"delete"){
// 					action	=	capitialize() +" Recommendation Deleted";
// 				}
// 				var navigateempId = $("#userPrincipalnavigate").val();
// 				var data	=	{"createdBy":currentEmp,"userId":navigateempId,"typeId":swotObj.id,"action":action,"systemIp":systemip};
// 				auditrailpage(data,'recommendation');
// 				$("#recommendation").modal("toggle");
// 				$(".recommendationclose").click();
// 	        },
// 			error: readErrorMsg
// 	    });
// }

// function recommendationsubmit(){
//   console.log("function Clicked");
// 		var recommendation	=	[];
// 		var idindex	=	0;
// 		var reclastlength =$("#recommendationcount").val();
// 		var recnewlength =$('.recommendation').length;
// 		var diff ="";
// 		var check="";
// 		if(recnewlength>reclastlength){
// 		 diff=recnewlength-reclastlength;
// 		 check=recnewlength-diff;
// 		}
// 		$('.recommendation').each(function(val,index){
// 			var name		=	$(this).val();
// 			var multiowner	=	$(this).closest("td").next("td").find('.rec_multiownerid').val();
// 			var ownersname = 	localStorage.getItem('ownername_'+idindex);
// 			var oldowners = 	localStorage.getItem('recommendowners_'+idindex);
// 			var newowners;
// 			if((check != "" && idindex>=check) || reclastlength==0 || oldowners == null || name != ownersname){
// 				newowners= multiowner;
// 			}
// 			else{
// 				newowners = getNewOwners(oldowners,multiowner);
// 			}
// 			recommendation.push({"id":idindex,"name":name,"multipleOwners":multiowner,"newMultipleOwners":newowners});
// 			idindex++;
// 		});
// 		var swotObj 	= 	swotupdateDescription;
// 		swotObj['recommendationmethod']	=	true;
// 		if(swotObj.pestelAnalysisValue.recommendation !=	undefined){
// 			swotObj.pestelAnalysisValue.recommendation	=	recommendation;
// 		}else{
// 			swotObj.pestelAnalysisValue.recommendation	=	recommendation;
// 		}
// 		swotupdateDescription.pestelAnalysisValue.newMultipleOwners = "";
// 		for(var i=0;i<swotObj.pestelAnalysisValue.actions.length;i++){
// 			swotupdateDescription.pestelAnalysisValue.actions[i].newMultipleOwners = "";
// 		}

//         console.log(swotObj, "swotObj");
// 	    $.ajax({
// 	        url: "/stratroom/pestelAnalysis",
// 	        type: "put",
// 	        contentType: "application/json",
// 	        data: JSON.stringify(swotObj),
// 	        success: function (data, status) {
// 				$.notify("Success: Updated Successfully", {
// 							  style: 'success',
// 							  className: 'graynotify'
// 							});
// 				var systemip = 	localStorage.getItem('systemip');
// 				var type	=	$("#recommendationtype").val();
// 				var count	=	$("#recommendationcount").val();
// 				if(count < $('.recommendation').length){
// 					type	=	"create";
// 				}else if(count > $('.recommendation').length){
// 					type	=	"delete";
// 				}else if(count == $('.recommendation').length){
// 					type	=	"update";
// 				}
// 				if($("#recommendationtype").val() ==	"create"){
// 					type	=	"create";
// 				}
// 				swot_type=localStorage.getItem("pestelcall_list");
// 				swot_type	=	(swot_type == null || swot_type == ""?"Strengths":swot_type)
// 				var action 	= 	"";
// 				if(type	==	"create"){
// 					action	=	swot_type +" Recommendation Created";
// 				}else if(type	==	"update"){
// 					action	=	swot_type +" Recommendation Modified";
// 				}else if(type	==	"delete"){
// 					action	=	swot_type +" Recommendation Deleted";
// 				}
// 				var navigateempId = $("#userPrincipalnavigate").val();
// 				var data	=	{"createdBy":currentEmp,"userId":navigateempId,"typeId":swotObj.id,"action":action,"systemIp":systemip};
// 				auditrailpage(data,'recommendation');
// 				$("#recommendation").modal("toggle");
// 				$(".recommendationclose").click();

//         window.location.reload();
// 	        },
// 			error: readErrorMsg
// 	    });
// }



function recommendationsubmit(){
  console.log("function Clicked");
		var recommendation	=	[];
		var idindex	=	0;
		var reclastlength =$("#recommendationcount").val();
		var recnewlength =$('.recommendation').length;
    console.log(recnewlength, reclastlength, "recnewlength");
		var diff ="";
		var check="";
		if(recnewlength>reclastlength){
		 diff=recnewlength-reclastlength;
		 check=recnewlength-diff;
		}
		$('.recommendation').each(function(val,index){
      console.log(val, index, "valindex");
			var name		=	$(this).val();
			var multiowner	=	$(this).closest("td").next("td").find('.rec_multiownerid').val();
			var ownersname = 	localStorage.getItem('ownername_'+idindex);
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

      console.log(recommendation, "recommendation");
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

         console.log(swotObj, "swotObj");
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
				swot_type=localStorage.getItem("pestelcall_list");
				swot_type	=	(swot_type == null || swot_type == ""?"Strengths":swot_type)
				var action 	= 	"";
				if(type	==	"create"){
					action	=	swot_type +" Recommendation Created";
				}else if(type	==	"update"){
					action	=	swot_type +" Recommendation Modified";
				}else if(type	==	"delete"){
					action	=	swot_type +" Recommendation Deleted";
				}
				var navigateempId = $("#userPrincipalnavigate").val();
				var data	=	{"createdBy":currentEmp,"userId":navigateempId,"typeId":swotObj.id,"action":action,"systemIp":systemip};
				auditrailpage(data,'recommendation');
				$("#recommendation").modal("toggle");
				$(".recommendationclose").click();

        window.location.reload();
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

// function actionssubmit(){
// 		var recommendation	=	[];
// 		var idindex	=	0;
// 		var actlastlength =$("#actioncount").val();
// 		var actnewlength =$('.pestelactions').length;
// 		var diff ="";
// 		var check="";
// 		if(actnewlength>actlastlength){
// 		 diff=actnewlength-actlastlength;
// 		 check=actnewlength-diff;
// 		}
// 		$('.pestelactions').each(function(val,index){
// 			var name		=	$(this).val();
// 			var multiowner	=	$(this).closest("tr").find('.action_multiownerid').val();
// 			var bydate		=	$(this).closest("tr").find('.bydate').val();
// 			// var status		=	$(this).closest("tr").find('.actionstatuscheck').is(":checked");
// 			var status = $(this).closest("tr").find('.select-dropdown-action').val();
// 			console.log(status, "status");
// 			var ownersname = 	localStorage.getItem('ownername_'+idindex);
// 			var oldowners = 	localStorage.getItem('actionowners_'+idindex);
// 			var newowners;
// 			if((check != "" && idindex>=check) || actlastlength==0 || oldowners == null || name != ownersname){
// 				newowners= multiowner;
// 			}
// 			else{
// 				newowners = getNewOwners(oldowners,multiowner);
// 			}
// 			recommendation.push({"id":idindex,"name":name,"multipleOwners":multiowner,"newMultipleOwners":newowners,"bydate":bydate,"status":status});
// 			idindex++;
// 		});
// 		var swotObj 	= 	swotupdateDescription;
// 		swotObj['recommendationmethod']	=	true;
// 		if(swotObj.pestelAnalysisValue.actions !=	undefined){
// 			swotObj.pestelAnalysisValue.actions	=	recommendation;
// 		}else{
// 			swotObj.pestelAnalysisValue.actions	=	recommendation;
// 		}
// 		for(var i=0;i<swotObj.pestelAnalysisValue.recommendation.length;i++){
// 			swotupdateDescription.pestelAnalysisValue.recommendation[i].newMultipleOwners = "";
// 			}
// 			swotupdateDescription.pestelAnalysisValue.newMultipleOwners = "";
// 	    $.ajax({
// 	        url: "/stratroom/pestelAnalysis",
// 	        type: "put",
// 	        contentType: "application/json",
// 	        data: JSON.stringify(swotObj),
// 	        success: function (data, status) {
// 				$.notify("Success: Updated Successfully", {
// 							  style: 'success',
// 							  className: 'graynotify'
// 							});
// 				var systemip = 	localStorage.getItem('systemip');
// 				var type	=	$("#actiontype").val();
// 				var count	=	$("#actioncount").val();
// 				if(count < $('.pestelactions').length){
// 					type	=	"create";
// 				}else if(count > $('.pestelactions').length){
// 					type	=	"delete";
// 				}else if(count == $('.pestelactions').length){
// 					type	=	"update";
// 				}
// 				if($("#actiontype").val() ==	"create"){
// 					type	=	"create";
// 				}
// 				var action 	= 	"";
// 				if(type	==	"create"){
// 					action	=	capitialize() +" Action Created";
// 				}else if(type	==	"update"){
// 					action	=	capitialize() +" Action Modified";
// 				}else if(type	==	"delete"){
// 					action	=	capitialize() +" Action Deleted";
// 				}
// 				var navigateempId = $("#userPrincipalnavigate").val();
// 				var data	=	{"createdBy":currentEmp,"userId":navigateempId,"typeId":swotObj.id,"action":action,"systemIp":systemip};
// 				auditrailpage(data,'action');
// 				$("#action").modal("toggle");
// 				$(".actionclose").click();
// 	        },
// 			error: readErrorMsg
// 	    });
// }


function actionssubmit() {
  var recommendation = [];
  var idindex = 0;
  var actlastlength = $("#actioncount").val();
  var actnewlength = $(".pestelactions").length;
  var diff = "";
  var check = "";
  if (actnewlength > actlastlength) {
    diff = actnewlength - actlastlength;
    check = actnewlength - diff;
  }
  $(".pestelactions").each(function (val, index) {
    var name = $(this).val();
    var multiowner = $(this).closest("tr").find(".action_multiownerid").val();
    var bydate = $(this).closest("tr").find(".bydate").val();
    var todate = $(this).closest("tr").find(".todate").val();
    var taskId = $(this).closest("tr").find(".taskId").val() || null;
    console.log(bydate, todate, "fromdatetodate");
    var status = $(this)
      .closest("tr")
      .find(".actionstatuscheck")
      .is(":checked");
    var ownersname = localStorage.getItem("ownersname_" + idindex);
    var oldowners = localStorage.getItem("actionowners_" + idindex);
    var newowners;
    if (
      (check != "" && idindex >= check) ||
      actlastlength == 0 ||
      oldowners == null ||
      name != ownersname
    ) {
      newowners = multiowner;
    } else {
      newowners = getNewOwners(oldowners, multiowner);
    }
    recommendation.push({
      id: idindex,
      name: name,
      multipleOwners: multiowner,
      newMultipleOwners: newowners,
      bydate: bydate,
      status: status,
      todate: todate,
      taskId: taskId ? taskId : null, 
    });
    idindex++;
  });
  var swotObj = swotupdateDescription;
  swotObj["recommendationmethod"] = true;
  if (swotObj.pestelAnalysisValue.actions != undefined) {
    swotObj.pestelAnalysisValue.actions = recommendation;
  } else {
    swotObj.pestelAnalysisValue.actions = recommendation;
  }
  for (var i = 0; i < swotObj.pestelAnalysisValue.recommendation.length; i++) {
    swotupdateDescription.pestelAnalysisValue.recommendation[
      i
    ].newMultipleOwners = "";
  }
  swotupdateDescription.pestelAnalysisValue.newMultipleOwners = "";
  console.log(swotObj, "swotObj");

  const actions = swotObj.pestelAnalysisValue.actions;
  const lastAction = swotObj.pestelAnalysisValue.actions.filter(action =>
      !action.taskId
  );

  console.log(lastAction, "Last Action Object");
   if(lastAction?.length > 0){

  var startDate = ""
  var endDate = ""

  function convertDateFormat(dateStr) {
    if (!dateStr) return "";
    return dateStr.replace(/\//g, "-");
  }

   startDate = convertDateFormat(lastAction?.bydate);
   endDate   = convertDateFormat(lastAction?.todate);



     const taskPayload = {
      id:   "",
      owner: $("#userPrincipal").val().trim(),
      createdBy: $("#userPrincipal").val().trim(),
      deptId: "",
      taskCategoryValue: {
        category: lastAction?.name,
        priority: "",
        status: lastAction?.status == false ? "Pending" : "Completed",
        startDate: startDate,
        endDate: endDate,
        progress: 0,
      },
  }

    //  $.ajax({
    //   url: "/stratroom/taskCategory",
    //   method: "POST",
    //   contentType: "application/json",
    //   data: JSON.stringify(taskPayload),
    //   success: function (response) {
    //     console.log("✅ Task saved successfully:", response);
    //     $("#task-add-modal").modal("hide");
    //     // location.reload();
    //   },
    //   error: function (error) {
    //     console.error("❌ Error saving task:", error);
    //     alert("Failed to save task. Please try again.");
    //   },
    // });
  }


  $.ajax({
    url: "/stratroom/pestelAnalysis",
    type: "put",
    contentType: "application/json",
    data: JSON.stringify(swotObj),
    success: function (data, status) {
      $.notify("Success: Updated Successfully", {
        style: "success",
        className: "graynotify",
      });
      var systemip = localStorage.getItem("systemip");
      var type = $("#actiontype").val();
      var count = $("#actioncount").val();
      if (count < $(".pestelactions").length) {
        type = "create";
      } else if (count > $(".pestelactions").length) {
        type = "delete";
      } else if (count == $(".pestelactions").length) {
        type = "update";
      }
      if ($("#actiontype").val() == "create") {
        type = "create";
      }
      swot_type = localStorage.getItem("pestelcall_list");
      swot_type =
        swot_type == null || swot_type == "" ? "Strengths" : swot_type;
      var action = "";
      if (type == "create") {
        action = swot_type + " Action Created";
      } else if (type == "update") {
        action = swot_type + " Action Modified";
      } else if (type == "delete") {
        action = swot_type + " Action Deleted";
      }
      var navigateempId = $("#userPrincipalnavigate").val();
      var data = {
        createdBy: currentEmp,
        userId: navigateempId,
        typeId: swotObj.id,
        action: action,
        systemIp: systemip,
      };
      auditrailpage(data, "action");
      $("#action").modal("toggle");
      $(".actionclose").click();

      window.location.reload();
    },
    error: readErrorMsg,
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

// function action(tableID) {
//     console.log("tableID", tableID);
//     var table = document.getElementById(tableID);
//     var rowCount = table.rows.length;
//     var row = table.insertRow(rowCount);

//     // Remove add icon from previous last row (if exists)
//     if(rowCount > 0) {
//         var prevLastRow = table.rows[rowCount-1];
//         var prevLastCell = prevLastRow.cells[4];
//         if(deletepermission == true) {
//             prevLastCell.innerHTML = '<i class="fas fa-trash remove-action" data-toggle="tooltip" data-placement="bottom"  style="cursor: pointer;"></i>';
//         } else {
//             prevLastCell.innerHTML = '';
//         }
//     }

//     var factor = rowCount;
//     rowCount = parseInt(parseInt(rowCount)-parseInt(1));
//     var users = topparentswotDetails;
//     var username = ((users.name == undefined || users.name == "")?"User":users.name);
//     var userProfileConcate = ((users.image == undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
//     var subinitiativeUser = '<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeopleactions" onclick="actionsaddpeople('+rowCount+')"><img '+userProfileConcate+' alt="'+username+'"></li>';
    
//     // Cell 1 - Textarea
//     var cell1 = row.insertCell(0);
//     cell1.innerHTML = '<textarea class="form-control pestelactions" name="pestelactions[]" cols="5" rows="3" placeholder="Notes"> </textarea>';

//     // Cell 2 - Date Picker
//     var cell2 = row.insertCell(1);
//     cell2.innerHTML = '<div class="form-group col-md-12" style="padding-right:1px;padding-left:1px;"><i class="far fa-calendar input-calender-icon1" style="right:-8%;"></i><input type="text" class="modal-custom-input date_pickers bydate" autocomplete="off" style="height: 34px !important;" data-language="en" name="bydate[]" id="bydate" style="width: 88% !important; height: 36px !important;" /></div>';

//     // Cell 3 - User info
//     var cell3 = row.insertCell(2);
//     cell3.innerHTML = '<input type="hidden" class="action_multiownerid" id="action_multiownerid_'+rowCount+'" name="multiowners[]" value="'+users.id+'"><div class="d-flex flex-column"> <ul class="list-unstyled order-list d-flex" id="actionsMultiowner_'+rowCount+'"> '+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"> <a href="#" class="favgs" data-toggle="modal" data-target="#addpeopleactions" > <span _ngcontent-hhc-c5="" onclick="actionsaddpeople('+rowCount+')" class="avatar-initial rounded-circle" >+</span > </a> </li></ul> </div>';

//     // Cell 4 - Status dropdown
//     var cell4 = row.insertCell(3);
//     cell4.innerHTML = '<select class="form-select select-dropdown-action">' +
//                       '<option value="">Select Status</option>' +
//                       '<option value="pending">Pending</option>' +
//                       '<option value="completed">Completed</option>' +
//                       '</select>';

//     // Initialize datepicker
//     $('.date_pickers').datepicker({
//         language: 'en',
//         autoClose: true,
//         position: "bottom left",
//         todayButton: true,
//         onSelect: function(fd) {
//             // $('.datepickers-container').hide();
//         }
//     });

//     // Cell 5 - Action buttons (add/delete)
//     var cell5 = row.insertCell(4);
//     if(deletepermission == true) {
//         // For the last row, show both add and delete icons
//         cell5.innerHTML = '<div class="float-right addactmeetingoption">' +
//                           '<button onclick="action(\'action_table\')" class="form-control rounded-circle" style="margin-top: -4px; border: none;">' +
//                           '<i class="fa fa-plus"></i>' +
//                           '</button>' +
//                           '</div>' +
//                           '<i class="fas fa-trash remove-action" data-toggle="tooltip" data-placement="bottom"  style="cursor: pointer;"></i>';
//     } else {
//         // Only show add button if no delete permission
//         cell5.innerHTML = '<div class="float-right addactmeetingoption">' +
//                           '<button onclick="action(\'action_table\')" class="form-control rounded-circle" style="margin-top: -4px; border: none;">' +
//                           '<i class="fa fa-plus"></i>' +
//                           '</button>' +
//                           '</div>';
//     }

//     // Add clone class for delete functionality
//     $(row).addClass("actions_clone");
    
//     // Initialize tooltips and avatar images
//     $('.actions_multiuserimage').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
//     $("#actionbody ul li.avatar").css("cursor","pointer");
//     $('[data-toggle="tooltip"]').tooltip();
// }

function action(tableID) {
  console.log(tableID, "function add click");

  var table = document.getElementById(tableID);
  var rowCount = table.rows.length;
  var row = table.insertRow(rowCount);

  // Decrement to get zero-based index for IDs/events
  var index = rowCount - 1;
  var users = topparentswotDetails;

  // Fallbacks for user data
  var username = users.name == undefined || users.name == "" ? "User" : users.name;
  var userProfileConcate =
    users.image == undefined || users.image == ""
      ? 'data-name="' + username + '" class="rounded-circle actions_multiuserimage"'
      : 'src="' + users.image + '" class="rounded-circle"';

  // Create user avatar item
  var subinitiativeUser =
    '<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeopleactions" onclick="actionsaddpeople(' + index + ')">' +
    '<img ' + userProfileConcate + ' alt="' + username + '">' +
    '</li>';

  // Dropdown for Status
  var dropdown =
    '<select name="action-status[]" class="form-select select-dropdown-action actionstatuscheck" data-index="' + index + '">' +
    '<option value="" selected>Select Status</option>' +
    '<option value="pending">Pending</option>' +
    '<option value="completed">Completed</option>' +
    '</select>';

    var removebtnEnable = '';
                var removeclass = '';
                if(actiondeletepermission == true){
                    removeclass = ' class="actions_clone"';
                    removebtnEnable = `<i class="fas fa-trash remove-action" data-toggle="tooltip" data-placement="bottom"  style="cursor: pointer;" onclick="deleteRowData(this)"></i>`;
                }

                 var actionIcons = removebtnEnable;

 actionIcons = `<div class="float-right addactmeetingoption">
                        <button onclick="action('action_table')" class="form-control rounded-circle" style="margin-top: -4px; border: none;">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>` + removebtnEnable;


  var cell1 = row.insertCell(0);
  cell1.className = 'align-middle text-center';
  cell1.innerHTML =
    '<div class="form-group mb-0">' +
    '<textarea class="form-control pestelactions" placeholder="Enter recommendation" rows="3" name="pestelactions[]" style="resize: vertical; min-height: 80px;"></textarea>' +
    '</div>';

  // == CELL 2: By Date (Date Picker) ==
  // var cell2 = row.insertCell(1);
  // cell2.className = 'align-middle text-center';
  // cell2.innerHTML =
  //   '<div class="d-flex justify-content-center">' +
  //   '<input type="text" class="modal-custom-input date_pickers_single bydate form-control" style="height: 34px; max-width: 180px;" data-language="en" name="bydate[]" value="" autocomplete="off" />' +
  //   '</div>';

  //   var cell3 = row.insertCell(2);
  // cell3.className = 'align-middle text-center';
  // cell3.innerHTML =
  //   '<div class="d-flex justify-content-center">' +
  //   '<input type="text" class="modal-custom-input date_pickers_single todate form-control" style="height: 34px; max-width: 180px;" data-language="en" name="todate[]" value="" autocomplete="off" />' +
  //   '</div>';

  // // == CELL 3: Responsible (Owner + User List + Add Button) ==
  // var cell4 = row.insertCell(3);
  // cell4.className = 'align-middle text-center';
  // cell4.innerHTML =
  //   '<div class="d-flex flex-column align-items-center">' +
  //   '<input type="hidden" class="action_multiownerid" id="action_multiownerid_' + index + '" name="multiowners[]" value="' + users.id + '">' +
  //   '<ul class="list-unstyled order-list d-flex flex-wrap justify-content-center" id="actionsMultiowner_' + index + '">' +
  //   subinitiativeUser +
  //   '<li class="avatar avatar-xs pull-up">' +
  //   '<a href="#" class="favgs" data-toggle="modal" data-target="#addpeopleactions">' +
  //   '<span onclick="actionsaddpeople(' + index + ')" class="avatar-initial rounded-circle">+</span>' +
  //   '</a>' +
  //   '</li>' +
  //   '</ul>' +
  //   '</div>';

  // // == CELL 4: Status (Dropdown) ==
  // var cell5 = row.insertCell(4);
  // cell5.className = 'align-middle text-center';
  // cell5.innerHTML =
  //   '<div class="d-flex justify-content-center">' +
  //   dropdown +
  //   '</div>';

  // == CELL 5: Actions (Delete Icon) ==
  var cell2 = row.insertCell(1);
  cell2.className = 'align-middle text-center';
  cell2.style.whiteSpace = 'nowrap';
  cell2.innerHTML = actionIcons;

  // == Attach Datepicker to the new date input ==
  $(row).find('.date_pickers_single').datepicker({
    language: 'en',
    minDate: new Date(),
    autoClose: true,
    position: 'bottom left',
    todayButton: true,
    onSelect: function (fd) {
      // Optional: handle selection
    }
  });

  // == Initialize avatar initials ==
  $(row).find('.actions_multiuserimage').initial({
    charCount: 2,
    height: 30,
    width: 30,
    fontSize: 18
  });

  // == Enable tooltips ==
  $(row).find('[data-toggle="tooltip"]').tooltip();

  // == Optional: Add class for cloned rows (if needed for styling/deletion) ==
  $(row).addClass("actions_clone");
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
  console.log(type, "typeeeee");
		 const storedLanguage = localStorage.getItem("selectedLang") ||"en";
if (type == "Political") {
    if (storedLanguage == "en") {
        $("#swotheader_title").text("Political Description");
        $("#swotlabeltitle").text("Political");
    } else if (storedLanguage == "am") {
        $("#swotheader_title").text("የፖለቲካ መግለጫ");
        $("#swotlabeltitle").text("ፖለቲካ");
    } else {
        $("#swotheader_title").text("وصف نقاط القوة");
        $("#swotlabeltitle").text("نقاط القوة");
    }

} else if (type == "Economical") {
    if (storedLanguage == "en") {
        $("#swotheader_title").text("Economical Description");
        $("#swotlabeltitle").text("Economical");
    } else if (storedLanguage == "am") {
        $("#swotheader_title").text("የኢኮኖሚካል መግለጫ");
        $("#swotlabeltitle").text("ኢኮኖሚካል");
    } else {
        $("#swotheader_title").text("وصف نقاط القوة");
        $("#swotlabeltitle").text("نقاط القوة");
    }

} else if (type == "Social") {
    if (storedLanguage == "en") {
        $("#swotheader_title").text("Social Description");
        $("#swotlabeltitle").text("Social");
    } else if (storedLanguage == "am") {
        $("#swotheader_title").text("የማህበራዊ መግለጫ");
        $("#swotlabeltitle").text("ማህበራዊ");
    } else {
        $("#swotheader_title").text("وصف نقاط القوة");
        $("#swotlabeltitle").text("نقاط القوة");
    }

} else if (type == "Technological") {
    if (storedLanguage == "en") {
        $("#swotheader_title").text("Technological Description");
        $("#swotlabeltitle").text("Technological");
    } else if (storedLanguage == "am") {
        $("#swotheader_title").text("የቴክኖሎጂያዊ መግለጫ");
        $("#swotlabeltitle").text("ቴክኖሎጂያዊ");
    } else {
        $("#swotheader_title").text("وصف نقاط القوة");
        $("#swotlabeltitle").text("نقاط القوة");
    }

} else if (type == "Environmental") {
    if (storedLanguage == "en") {
        $("#swotheader_title").text("Environmental Description");
        $("#swotlabeltitle").text("Environmental");
    } else if (storedLanguage == "am") {
        $("#swotheader_title").text("የአካባቢ ተዛማጅ መግለጫ");
        $("#swotlabeltitle").text("አካባቢ ተዛማጅ");
    } else {
        $("#swotheader_title").text("وصف نقاط القوة");
        $("#swotlabeltitle").text("نقاط القوة");
    }

} else if (type == "Legal") {
    if (storedLanguage == "en") {
        $("#swotheader_title").text("Legal Description");
        $("#swotlabeltitle").text("Legal");
    } else if (storedLanguage == "am") {
        $("#swotheader_title").text("የሕጋዊ መግለጫ");
        $("#swotlabeltitle").text("ሕጋዊ");
    } else {
        $("#swotheader_title").text("وصف نقاط القوة");
        $("#swotlabeltitle").text("نقاط القوة");
    }
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

// function recommendationPopSuccessCallback(swotList, typerequest) {
//     var tablebody = "";
//     $("#recommendationbody").empty();
    
//     if(swotList.pestelAnalysisValue.recommendation != undefined && swotList.pestelAnalysisValue.recommendation != "") {
//         if(swotList.pestelAnalysisValue.recommendation.length != 0) {
//             $("#recommendationtype").val('update');
//             $("#recommendationcount").val(swotList.pestelAnalysisValue.recommendation.length);
            
//             $.each(swotList.pestelAnalysisValue.recommendation, function (i, List) {
//                 var name = (List.name != undefined ? List.name : "");
//                 var multiowner = ((List.multipleOwners != undefined && List.multipleOwners != '') ? List.multipleOwners : currentEmp);
//                 var users = topparentswotDetails;
//                 var username = ((users.name == undefined || users.name == "") ? "User" : users.name);
//                 var userProfileConcate = ((users.image == undefined || users.image == "") ? 
//                     "data-name='"+username+"' class='rounded-circle rec_res_multiuserimage'" : 
//                     "src='"+users.image+"' class='rounded-circle'");
                
//                 var resultPorfileContent = recommendationPorfileContent(multiowner, List.id);
//                 var userselecteditems = resultPorfileContent['userownerlist_data'];
//                 var subinitiativeUser = (resultPorfileContent['userownerlist'] != undefined ? resultPorfileContent['userownerlist'] : "");
                
//                 var removebtnEnable = '';
//                 var addbtnEnable = '';
                
//                 // Only show delete button if user has permission and it's not the first row
//                 if(recdeletepermission == true && i != 0) {
//                     removebtnEnable = `
//                         <a href="#" class="btn btn-sm btn-icon" onclick="removeRow(this)">
//                             <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" >
//                                 <img src="assets/images/icons/delete-i.svg" width="12" height="12" />
//                             </span>
//                         </a>`;
//                 }
                
//                 // Only show add button on the last row if user has permission
//                 if(i == swotList.pestelAnalysisValue.recommendation.length - 1 && (receditpermission == true || reccreatepermission == true)) {
//                     addbtnEnable = `
//                         <a class="btn btn-sm btn-icon" onclick="notes('note_table')">
//                             <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" >
//                                 <i class="fas fa-plus title_edit_icon"></i>
//                             </span>
//                         </a>`;
//                 }
                
//                 // Build user avatars list
//                 var userAvatars = `<ul class="list-unstyled d-flex align-items-center avatar-group mb-0">`;
                
//                 // Add existing user avatars
//                 if(subinitiativeUser) {
//                     userAvatars += subinitiativeUser.replace(/avatar-sm/g, 'avatar avatar-xs pull-up');
//                 }
                
//                 // Add "+" button for adding more users only on the last row
//                 if(i == swotList.pestelAnalysisValue.recommendation.length - 1 && (receditpermission == true || reccreatepermission == true)) {
//                     userAvatars += `
//                         <li class="avatar avatar-xs pull-up"  data-target="#addpeople" data-toggle="modal" onclick="recommendationaddpeople(0)">
//                             <span class="avatar-initial rounded-circle" data-bs-toggle="tooltip" data-bs-placement="top" >+</span>
//                         </li>`;
//                 } else if(i !== swotList.pestelAnalysisValue.recommendation.length - 1) {
//                     userAvatars += `
//                         <li class="avatar avatar-xs pull-up" onclick="return false;">
//                             <span class="avatar-initial rounded-circle">+</span>
//                         </li>`;
//                 }
                
//                 userAvatars += `</ul>`;
                
//                 tablebody += `
//                     <tr>
//                         <td>
//                             <div class="form-group">
//                                 <textarea class="form-control recommendation" placeholder="Notes" rows="3" name="recommendation[]">${name}</textarea>
//                             </div>
//                         </td>
//                         <td class="align-middle">
//                             <div class="d-flex align-items-start justify-content-center">
//                                 ${userAvatars}
//                             </div>
//                         </td>
//                         <td class="text-end align-middle">
//                             <div class="table-actions justify-content-center">
//                                 ${addbtnEnable}
//                                 ${removebtnEnable}
//                             </div>
//                         </td>
//                     </tr>`;
//             });
//         } else {
//             // Empty state with one row
//             tablebody = createEmptyRow(0);
//             $("#recommendationtype").val('create');
//         }
//     } else {
//         // Default empty state
//         tablebody = createEmptyRow(0);
//         $("#recommendationtype").val('create');
//     }
    
//     $("#recommendationbody").html(tablebody);
//     $('[data-bs-toggle="tooltip"]').tooltip();
//     $('.rec_res_multiuserimage').initial({ charCount: 2, height: 24, width: 24, fontSize: 12 });
    
//     if((receditpermission == false && reccreatepermission == false) && (recviewpermission == true || recdeletepermission == true)) {
//         $('#recommendationbody input[type="text"]').prop("disabled", true);
//         $('#recommendationbody textarea').prop("disabled", true);
//         $('#recommendationbody input[type="checkbox"]').prop("disabled", true);
//         $('#recommendationbody select').prop("disabled", true);
//         $(".actionsbtn").hide();
//     }
// }

function recommendationPopSuccessCallback(swotList,typerequest) {
	console.log(swotList, "swotList");
	var tablebody	=	"";
	$("#tableBody").empty();
	if(swotList.pestelAnalysisValue.recommendation !=	undefined && swotList.pestelAnalysisValue.recommendation !=	""){
		if(swotList.pestelAnalysisValue.recommendation.length	!=	0){
			$("#recommendationtype").val('update');
			$("#recommendationcount").val(swotList.pestelAnalysisValue.recommendation.length);
		    $.each(swotList.pestelAnalysisValue.recommendation, function (i, List) {
				var name = 	(List.name !=	undefined?List.name:"");
				var multiowner 	= 	((List.multipleOwners !=	undefined && List.multipleOwners !=	'')?List.multipleOwners:currentEmp);
				var users		=	topparentswotDetails;
        console.log(users, "users");
		    var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
				var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle rec_res_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
				var subinitiativeUser 	=	'<li class="avatar avatar-xs pull-up"><img '+userProfileConcate+' alt="'+username+'"></li>';				
				
				var resultPorfileContent	=	recommendationPorfileContent(multiowner,List.id);
				var userselecteditems	=	resultPorfileContent['userownerlist_data'];
				var subinitiativeUser	=	(resultPorfileContent['userownerlist'] !=	undefined?resultPorfileContent['userownerlist']:"");
				
				var removebtnEnable	=	'';
				var removeclass	=	'';
				if(recdeletepermission	==	true ){
					removeclass	=	' class="notes_clone"';
					removebtnEnable	=	`<i class="fas fa-trash remove-notes" data-toggle="tooltip" data-placement="bottom"  style="cursor: pointer;" onclick="deleteRowData(this)"></i>`;
				}
			

			tablebody += '<tr' + removeclass + '>';
            tablebody += '    <td>';
            tablebody += '        <div class="form-group">';
            tablebody += '            <textarea class="form-control recommendation" placeholder="Notes" rows="3" name="recommendation[]">' + name + '</textarea>';
            tablebody += '        </div>';
            tablebody += '    </td>';
            tablebody += '    <td class="align-middle">';
            tablebody += '        <div class="d-flex align-items-start justify-content-center">';
            tablebody += '            <input type="hidden" class="rec_multiownerid" id="rec_multiownerid_' + List.id + '" name="multiowners[]" value="' + multiowner + '">';
            tablebody += '            <ul class="list-unstyled d-inline-flex align-items-center avatar-group mb-0" id="recommendationMultiowner_' + List.id + '">';
            tablebody +=                 subinitiativeUser;
            tablebody += '            </ul>';
            tablebody += '        </div>';
            tablebody += '    </td>';
            tablebody += '    <td class="text-end align-middle">';
            tablebody += '        <div class="table-actions justify-content-center">';
            
            if(receditpermission == true || reccreatepermission == true) {
                tablebody += '            <a class="btn btn-sm btn-icon" onclick="notes(\'note_table\')">';
                tablebody += '                <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" >';
                tablebody += '                    <i class="title_edit_icon" data-lucide="plus"></i>';
                tablebody += '                </span>';
                tablebody += '            </a>';
            }
            
            tablebody +=              removebtnEnable;
            tablebody += '        </div>';
            tablebody += '    </td>';
            tablebody += '</tr>';
			});
		}else{
			$("#recommendationtype").val('create');
			var users		=	topparentswotDetails;
			var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
			var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle rec_res_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
			var subinitiativeUser 	=	'<li class="avatar avatar-xs pull-up"><img '+userProfileConcate+' alt="'+username+'"></li>';
			if((receditpermission	==	false || reccreatepermission	==	false) || recviewpermission	==	true || recloadcontent	==	true){
				tablebody	=	'<tr><td><textarea class="form-control recommendation" rows="5" name="recommendation[]"> </textarea></td><td><div class="d-flex flex-column"><input type="hidden" class="rec_multiownerid" id="rec_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="recommendationMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" onclick="return false;" class="favgs"><span _ngcontent-hhc-c5="" class="badge recommendationmultiowner">+</span></a></li></ul></div></td><td></td></tr>';		
			}
			if(receditpermission	==	true || reccreatepermission	==	true){
				tablebody	=	'<tr><td><textarea class="form-control recommendation" rows="5" name="recommendation[]"> </textarea></td><td><div class="d-flex flex-column"><input type="hidden" class="rec_multiownerid" id="rec_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="recommendationMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" class="favgs" data-toggle="modal" data-target="#addpeople"><span _ngcontent-hhc-c5="" onclick="recommendationaddpeople(0)" class="badge recommendationmultiowner">+</span></a></li></ul></div></td><td></td></tr>';		
			}	
		}
	}else{		
		var users = topparentswotDetails;
    console.log(users, "users");
		var username = ((users.name == undefined || users.name == "") ? "User" : users.name);
		var userProfileConcate = ((users.image == undefined || users.image == "") ? 
    "data-name='" + username + "' class='rounded-circle rec_res_multiuserimage'" : 
    "src='" + users.image + "' class='rounded-circle'");
    
		var subinitiativeUser = '<li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip" data-bs-placement="top" title="' + username + '"><img ' + userProfileConcate + ' alt="' + username + '" width="24" height="24"></li>';

		

		if ((receditpermission == false || reccreatepermission == false) || recviewpermission == true || recloadcontent == true) {
			tablebody += '<tr>';
			tablebody += '    <td>';
			tablebody += '        <div class="form-group">';
			tablebody += '            <textarea class="form-control recommendation" placeholder="Notes" rows="3" name="recommendation[]"></textarea>';
			tablebody += '        </div>';
			tablebody += '    </td>';
			tablebody += '    <td class="align-middle">';
			tablebody += '        <div class="d-flex align-items-start justify-content-center">';
			tablebody += '            <input type="hidden" class="rec_multiownerid" id="rec_multiownerid_0" name="multiowners[]" value="' + users.id + '">';
			tablebody += '            <ul class="list-unstyled d-inline-flex align-items-center avatar-group mb-0" id="recommendationMultiowner_0">';
			tablebody +=                 subinitiativeUser;
			tablebody += '                <li class="avatar avatar-xs pull-up" href="#attendess-list" data-toggle="modal" data-target="#addpeople">';
			tablebody += '                    <span class="avatar-initial rounded-circle badge recommendationmultiowner" data-toggle="tooltip" data-placement="top" title="Add people" onclick="recommendationaddpeople(0)">+</span>';
			tablebody += '                </li>';
			tablebody += '            </ul>';
			tablebody += '        </div>';
			tablebody += '    </td>';
			tablebody += '    <td class="text-end align-middle">';
			tablebody += '        <div class="table-actions justify-content-center">';
		    tablebody += '            <a class="btn btn-sm btn-icon" onclick="notes(\'note_table\')" data-bs-toggle="tooltip" data-bs-placement="bottom" >';
			tablebody += '                <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom"  >';
			tablebody += '                    <i class="title_edit_icon" data-lucide="plus"></i>';
			tablebody += '                </span>';
			tablebody += '            </a>';
			tablebody += '        </div>';
			tablebody += '    </td>';
			tablebody += '</tr>';
		}

		
	}
	   console.log(tablebody, "tablebody");
	$("#tableBody").html(tablebody);
	$('[data-bs-toggle="tooltip"]').tooltip();
	$("#recommendationbody ul li.avatar").css("cursor", "pointer");
	$('.rec_res_multiuserimage').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });

if ((receditpermission == false && reccreatepermission == false) && (recviewpermission == true || recdeletepermission == true)) {
    $('#recommendationbody input[type="text"]').prop("disabled", true);
    $('#recommendationbody textarea').prop("disabled", true);
    $('#recommendationbody input[type="checkbox"]').prop("disabled", true);
    $('#recommendationbody select').prop("disabled", true);
    $(".actionsbtn").hide();
}

$(".recommendationevent").removeAttr("disabled");
}

function createEmptyRow(rowCount) {
    var users = topparentswotDetails;
    var username = ((users.name == undefined || users.name == "") ? "User" : users.name);
    var userProfileConcate = ((users.image == undefined || users.image == "") ? 
        "data-name='"+username+"' class='rounded-circle rec_res_multiuserimage'" : 
        "src='"+users.image+"' class='rounded-circle'");
    
    var userAvatars = `<ul class="list-unstyled d-flex align-items-center avatar-group mb-0">`;
    
    userAvatars += `
        <li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip" data-bs-placement="top" title="${username}">
            <img ${userProfileConcate} alt="${username}" width="24" height="24">
        </li>`;
    
    if((receditpermission == true || reccreatepermission == true)) {
        userAvatars += `
            <li class="avatar avatar-xs pull-up"  data-toggle="modal" data-target="#addpeople" onclick="recommendationaddpeople(0)">
                <span class="avatar-initial rounded-circle" data-bs-toggle="tooltip" data-bs-placement="top" >+</span>
            </li>`;
    } else {
        userAvatars += `
            <li class="avatar avatar-xs pull-up" onclick="return false;">
                <span class="avatar-initial rounded-circle">+</span>
            </li>`;
    }
    
    userAvatars += `</ul>`;
    
    var addButton = '';
    if((receditpermission == true || reccreatepermission == true)) {
        addButton = `
            <div class="table-actions justify-content-center">
                <a class="btn btn-sm btn-icon" onclick="notes('note_table')">
                    <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" >
                        <i class="title_edit_icon" data-lucide="plus"></i>
                    </span>
                </a>
            </div>`;
    }
    
    return `
        <tr>
            <td>
                <div class="form-group">
                    <textarea class="form-control recommendation" placeholder="Notes" rows="3" name="recommendation[]"></textarea>
                </div>
            </td>
            <td class="align-middle">
                <div class="d-flex align-items-start justify-content-center">
                    ${userAvatars}
                </div>
            </td>
            <td class="text-end align-middle">
                ${addButton}
            </td>
        </tr>`;
}

function notes(tableID) {
  console.log(tableID, "tableId");

  var table = document.getElementById(tableID);
  var users = topparentswotDetails;
  var rowCount = table.rows.length;

  console.log(users, "users");
  var row = table.insertRow(rowCount);

 
  var rowIndex = rowCount - 1;

  var cell1 = row.insertCell(0);
  cell1.innerHTML =
    '<div class="form-group mb-0">' +
    '  <textarea class="form-control recommendation" placeholder="Notes" rows="3" name="recommendation[]"></textarea>' +
    '</div>';


  var username = users.name == undefined || users.name == "" ? "User" : users.name;
  var userProfileConcate;
  if (users.image == undefined || users.image == "") {
    userProfileConcate = 'data-name="' + username + '" class="rounded-circle rec_res_multiuserimage"';
  } else {
    userProfileConcate = 'src="' + users.image + '" class="rounded-circle"';
  }

  var subinitiativeUser =
    '<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeople" onclick="recommendationaddpeople(' + rowIndex + ')">' +
    '  <img ' + userProfileConcate + ' alt="' + username + '">' +
    '</li>';

  
  var cell2 = row.insertCell(1);
  cell2.classList.add("align-middle");
  cell2.innerHTML =
    '<div class="d-flex align-items-start justify-content-center">' +
    '  <input type="hidden" class="rec_multiownerid" id="rec_multiownerid_' + rowIndex + '" name="multiowners[]" value="' + users.id + '">' +
    '  <ul class="list-unstyled d-inline-flex align-items-center avatar-group mb-0" id="recommendationMultiowner_' + rowIndex + '">' +
    '    ' + subinitiativeUser +
    '    <li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeople">' +
    '      <span class="avatar-initial rounded-circle badge recommendationmultiowner" ' +
    '            data-bs-toggle="tooltip" data-bs-placement="top" title="Add people" ' +
    '            onclick="recommendationaddpeople(' + rowIndex + ')">+</span>' +
    '    </li>' +
    '  </ul>' +
    '</div>';


  var cell3 = row.insertCell(2);
  cell3.classList.add("text-end", "align-middle");

  var deleteIcon = '';
  if (deletepermission == true) {
    deleteIcon = '<i class="fas fa-trash remove-notes" style="cursor: pointer;" data-bs-toggle="tooltip" data-bs-placement="bottom"  onclick="deleteRowData(this)"></i>';
  }

  cell3.innerHTML =
    '<div class="table-actions justify-content-center">' +
    '  <a class="btn btn-sm btn-icon" onclick="notes(\'note_table\')" data-bs-toggle="tooltip" data-bs-placement="bottom" >' +
    '    <span class="icon">' +
    '      <i class="title_edit_icon" data-lucide="plus"></i>' +
    '    </span>' +
    '  </a>' +
    '  ' + deleteIcon +
    '</div>';


  $(".rec_res_multiuserimage").initial({
    charCount: 2,
    height: 30,
    width: 30,
    fontSize: 18,
  });

  // Style avatar list cursor
  $("#recommendationbody ul li.avatar").css("cursor", "pointer");

  // Initialize Bootstrap 5 tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipEl) {
    return new bootstrap.Tooltip(tooltipEl);
  });

  // Set form type if sections are visible
  if ($("#recommendation").is(":visible")) {
    $("#recommendationtype").val("create");
  }
  if ($("#action").is(":visible")) {
    $("#actiontype").val("create");
  }

  // Add class for cloned rows if delete is allowed
  if (deletepermission == true) {
    $(row).addClass("notes_clone");
  }
}

function removeRow(button) {
    var row = $(button).closest('tr');
    row.remove();
    
    // After removing a row, we need to ensure the last row has the add button
    var table = document.getElementById('note_table');
    var rowCount = table.rows.length;
    
    if(rowCount > 0) {
        var lastRow = table.rows[rowCount - 1];
        var lastCell = lastRow.cells[2];
        
        // Only add the add button if user has permission
        if(receditpermission == true || reccreatepermission == true) {
            lastCell.innerHTML = `
                <div class="table-actions justify-content-center">
                    <a class="btn btn-sm btn-icon" onclick="notes('note_table')">
                        <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" >
                            <i class="title_edit_icon" data-lucide="plus"></i>
                        </span>
                    </a>
                </div>`;
        }
    }
}
// Helper function to get user by ID (you'll need to implement this based on your data structure)
function getUserById(userId) {
    // Implement this function to return user object based on ID
    // This is just a placeholder - adjust according to your data structure
    return {
        id: userId,
        name: "User Name", // Replace with actual name lookup
        image: "path/to/image.jpg" // Replace with actual image path lookup
    };
}

// Helper function to get user by ID (you'll need to implement this based on your data structure)
function getUserById(userId) {
    // Implement this function to return user object based on ID
    // This is just a placeholder - adjust according to your data structure
    return {
        id: userId,
        name: "User Name", // Replace with actual name lookup
        image: "path/to/image.jpg" // Replace with actual image path lookup
    };
}

function actionsPopSuccessCallback(swotList,typerequest) {
  console.log(swotList, "swotListData");
    var tablebody = "";
    $("#actionBodyData").empty();
    if(swotList.pestelAnalysisValue.actions != undefined && swotList.pestelAnalysisValue.actions != ''){
        if(swotList.pestelAnalysisValue.actions.length != 0){
            $("#actiontype").val('update');
            $("#actioncount").val(swotList.pestelAnalysisValue.actions.length);
            $.each(swotList.pestelAnalysisValue.actions, function (i, List) {
                var name = (List.name != undefined?List.name:"");
                var multiowner = ((List.multipleOwners != undefined && List.multipleOwners != '')?List.multipleOwners:currentEmp);
                var checkstatus = (List.status == true?"checked":"");
                var dropdown = '<select id="action-status-01" name="action-status" class="form-select select-dropdown-action actionstatuscheck" placeholder="Select Status">' +
                   '<option value="" selected>Select Status</option>' +
                   '<option value="pending" ' + (List.status == false ? "selected" : "") + '>Pending</option>' +
                   '<option value="completed" ' + (List.status == true ? "selected" : "") + '>Completed</option>' +
                   '</select>';
                var bydate = (List.bydate != undefined?List.bydate:"");
                var todate = (List.todate != undefined?List.todate:"");
                var taskId  = (List.taskId != undefined?List.taskId: null);
                var users = topparentswotDetails;
                var removebtnEnable = '';
                var removeclass = '';
                if(actiondeletepermission == true){
                    removeclass = ' class="actions_clone"';
                    removebtnEnable = `<i class="fas fa-trash remove-action" data-toggle="tooltip" data-placement="bottom"  style="cursor: pointer;" onclick="deleteRowData(this)"></i>`;
                }
                var resultPorfileContent = actionsPorfileContent(multiowner,List.id);
                var userselecteditems = resultPorfileContent['userownerlist_data'];
                var subinitiativeUser = (resultPorfileContent['userownerlist'] != undefined?resultPorfileContent['userownerlist']:"");
                
                // For all rows except last, show only delete icon
                var actionIcons = removebtnEnable;
                // For last row, show both add and delete icons
                // if(i == swotList.pestelAnalysisValue.actions.length - 1) {
                    actionIcons = `<div class="float-right addactmeetingoption">
                        <button onclick="action('action_table')" class="form-control rounded-circle" style="margin-top: -4px; border: none;">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>` + removebtnEnable;
                // }
                
                // tablebody += '<tr'+removeclass+'><td><textarea class="form-control pestelactions" placeholder="Notes" rows="3" name="pestelactions[]">'+name+'</textarea></td><td><div class="row"><div class="form-group col-md-12"><i class=""></i><input type="text" class="modal-custom-input date_pickers_single bydate" style="height: 34px !important;" data-language="en" name="bydate[]" value="'+bydate+'" id="bydate" autocomplete="off"/></div></div></td><td><div class="d-flex flex-column">'+userselecteditems+'<ul class="list-unstyled order-list d-flex" id="actionsMultiowner_'+List.id+'">'+subinitiativeUser+'</ul></div></td><td>' + dropdown + '</td><td>'+actionIcons+'</td></tr>';
                tablebody += '<tr' + removeclass + '>';

                tablebody += '<td class="align-middle text-center" style="display:none;">';
                tablebody += '<textarea class="form-control pestelactions taskId" placeholder="Enter recommendation" rows="3" name="taskId" style="resize: vertical; min-height: 80px;">';
                tablebody += taskId;
                tablebody += '</textarea>';
                tablebody += '</td>';

                tablebody += '<td class="align-middle text-center">';
                tablebody += '<textarea class="form-control pestelactions" placeholder="Enter recommendation" rows="3" name="pestelactions[]" style="resize: vertical; min-height: 80px;">';
                tablebody += name;
                tablebody += '</textarea>';
                tablebody += '</td>';


                // tablebody += '<td class="align-middle text-center">';
                // tablebody += '<div class="d-flex justify-content-center">';
                // tablebody += '<input type="text" class="modal-custom-input date_pickers_single bydate form-control" style="height: 34px; max-width: 180px;" data-language="en" name="bydate[]" value="' + bydate + '" autocomplete="off" />';
                // tablebody += '</div>';
                // tablebody += '</td>';

                // tablebody += '<td class="align-middle text-center">';
                // tablebody += '<div class="d-flex justify-content-center">';
                // tablebody += '<input type="text" class="modal-custom-input date_pickers_single todate form-control" style="height: 34px; max-width: 180px;" data-language="en" name="todate[]" value="' + todate + '" autocomplete="off" />';
                // tablebody += '</div>';
                // tablebody += '</td>';


                // tablebody += '<td class="align-middle text-center">';
                // tablebody += '<div class="d-flex flex-column align-items-center">';
                // tablebody += userselecteditems;
                // tablebody += '<ul class="list-unstyled order-list d-flex flex-wrap justify-content-center" id="actionsMultiowner_' + List.id + '">';
                // tablebody += subinitiativeUser;
                // tablebody += '</ul>';
                // tablebody += '</div>';
                // tablebody += '</td>';


                // tablebody += '<td class="align-middle text-center">';
                // tablebody += '<div class="d-flex justify-content-center">';
                // tablebody += dropdown;
                // tablebody += '</div>';
                // tablebody += '</td>';


                tablebody += '<td class="align-middle text-center" style="white-space: nowrap;">';
                tablebody += actionIcons;
                tablebody += '</td>';

                tablebody += '</tr>';
            });
        } else {
            // Handle empty array case
            var users = topparentswotDetails;
            var username = ((users.name == undefined || users.name == "")?"User":users.name);
            var userProfileConcate = ((users.image == undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
            var subinitiativeUser = '<li class="avatar avatar-xs pull-up"><img '+userProfileConcate+' alt="'+username+'"></li>';
            
            // Default status dropdown (no List object exists here)
            var dropdown = '<select id="action-status-01" name="action-status" class="form-select select-dropdown-action actionstatuscheck">' +
                        '<option value="" selected>Select Status</option>' +
                        '<option value="false">Pending</option>' +
                        '<option value="true">Completed</option>' +
                        '</select>';
                        
            var actionIcons = `<div class="float-right addactmeetingoption">
                        <button onclick="action('action_table')" class="form-control rounded-circle" style="margin-top: -4px; border: none;">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>`;
            if(actiondeletepermission == true) {
                actionIcons += `<i class="fas fa-trash remove-action" data-toggle="tooltip" data-placement="bottom"  style="cursor: pointer;"></i>`;
            }
            
            if((actioneditpermission == false || actioncreatepermission == false) || actionviewpermission == true || actionloadcontent == true){                    
                tablebody = '<tr><td><textarea class="form-control pestelactions" placeholder="Notes" rows="3" name="pestelactions[]"> </textarea></td><td><div class="row"><div class="form-group col-md-12"><i class=""></i><input type="text" class="modal-custom-input date_pickers_single bydate" style="height: 34px !important;" data-language="en" name="bydate[]" autocomplete="off"/></div></div></td><td><div class="d-flex flex-column"><input type="hidden" class="action_multiownerid" id="action_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="actionsMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" onclick="return false;" class="favgs"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+</span></a></li></ul></div></td><td>' + dropdown + '</td><td>'+actionIcons+'</td></tr>';
            }
            if(actioneditpermission == true || actioncreatepermission == true){
                // tablebody = '<tr><td><div class="form-group"><textarea class="form-control pestelactions" placeholder="Notes" rows="3" name="pestelactions[]"> </textarea></div></td><td><div class="form-group"><input type="date" class="form-control"  data-language="en" name="bydate[]" autocomplete="off"/></div></td><td><div class="d-flex flex-column"><input type="hidden" class="action_multiownerid" id="action_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="actionsMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" class="favgs" data-toggle="modal" data-target="#addpeopleactions"><span _ngcontent-hhc-c5=""onclick="actionsaddpeople(0)" class="avatar-initial rounded-circle">+</span></a></li></ul></div></td><td>' + dropdown + '</td><td>'+actionIcons+'</td></tr>';
                tablebody = '<tr>';

                tablebody += '<td class="align-middle text-center" style="display:none;">';
                tablebody += '<div class="form-group mb-0">';
                tablebody += '<textarea class="form-control pestelactions taskId" placeholder="Enter recommendation" rows="3" name="taskId" style="resize: vertical; min-height: 80px;"></textarea>';
                tablebody += '</div>';
                tablebody += '</td>';

                tablebody += '<td class="align-middle text-center">';
                tablebody += '<div class="form-group mb-0">';
                tablebody += '<textarea class="form-control pestelactions" placeholder="Enter recommendation" rows="3" name="pestelactions[]" style="resize: vertical; min-height: 80px;"></textarea>';
                tablebody += '</div>';
                tablebody += '</td>';

                // tablebody += '<td class="align-middle text-center">';
                // tablebody += '<div class="form-group mb-0">';
                // tablebody += '<input type="date" class="modal-custom-input date_pickers_single bydate form-control" data-language="en" name="bydate[]" autocomplete="off" />';
                // tablebody += '</div>';
                // tablebody += '</td>';

                // tablebody += '<td class="align-middle text-center">';
                // tablebody += '<div class="form-group mb-0">';
                // tablebody += '<input type="date" class="modal-custom-input date_pickers_single todate form-control" data-language="en" name="todate[]" autocomplete="off" />';
                // tablebody += '</div>';
                // tablebody += '</td>';


                // tablebody += '<td class="align-middle text-center">';
                // tablebody += '<div class="d-flex flex-column align-items-center">';

                // tablebody += '<input type="hidden" class="action_multiownerid" id="action_multiownerid_0" name="multiowners[]" value="' + users.id + '">';

                // tablebody += '<ul class="list-unstyled order-list d-flex flex-wrap justify-content-center" id="actionsMultiowner_0">';
                // tablebody += subinitiativeUser;

                // tablebody += '<li class="avatar avatar-xs pull-up">';
                // tablebody += '<a href="#" class="favgs" data-toggle="modal" data-target="#addpeopleactions">';
                // tablebody += '<span onclick="actionsaddpeople(0)" class="avatar-initial rounded-circle">+</span>';
                // tablebody += '</a>';
                // tablebody += '</li>';
                // tablebody += '</ul>';
                // tablebody += '</div>';
                // tablebody += '</td>';


                // tablebody += '<td class="align-middle text-center">';
                // tablebody += '<div class="d-flex justify-content-center">';
                // tablebody += dropdown;
                // tablebody += '</div>';
                // tablebody += '</td>';


                tablebody += '<td class="align-middle text-center" style="white-space: nowrap;">';
                tablebody += actionIcons;
                tablebody += '</td>';

                tablebody += '</tr>';        
            }
            $("#actiontype").val('create');
        }
    } else {        
        // Handle undefined actions case
        var users = topparentswotDetails;
        var username = ((users.name == undefined || users.name == "")?"User":users.name);
        var userProfileConcate = ((users.image == undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
        var subinitiativeUser = '';
        
        // Default status dropdown (no List object exists here)
        var dropdown = '<select id="action-status-01" name="action-status" class="form-select select-dropdown-action actionstatuscheck">' +
               '<option value="" selected>Select Status</option>' +
               '<option value="false">Pending</option>' +
               '<option value="true">Completed</option>' +
               '</select>';
               
        var actionIcons = `<div class="float-right addactmeetingoption">
                        <button onclick="action('action_table')" class="form-control rounded-circle" style="margin-top: -4px; border: none;">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>`;
        if(actiondeletepermission == true) {
            actionIcons += `<i class="fas fa-trash remove-action" data-toggle="tooltip" data-placement="bottom"  style="cursor: pointer;"></i>`;
        }
        
        if((actioneditpermission == false || actioncreatepermission == false) || actionviewpermission == true || actionloadcontent == true){
            subinitiativeUser = '<li class="avatar avatar-xs pull-up"><img '+userProfileConcate+' alt="'+username+'"></li>';                    
            tablebody = '<tr><td><textarea class="form-control pestelactions" placeholder="Notes" rows="3" name="pestelactions[]"> </textarea></td><td><div class="row"><div class="form-group col-md-12"><i class=""></i><input type="text" class="modal-custom-input date_pickers_single bydate" style="height: 34px !important;" data-language="en" name="bydate[]" autocomplete="off"/></div></div></td><td><div class="d-flex flex-column"><input type="hidden" class="action_multiownerid" id="action_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="actionsMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" onclick="return false;" class="favgs"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+</span></a></li></ul></div></td><td>' + dropdown + '</td><td>'+actionIcons+'</td></tr>';
        }
        if(actioneditpermission == true || actioncreatepermission == true){
            subinitiativeUser = '<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeopleactions" onclick="actionsaddpeople(0)"><img '+userProfileConcate+' alt="'+username+'"></li>';
            // tablebody = '<tr><td><textarea class="form-control pestelactions" placeholder="Notes" rows="3" name="pestelactions[]"> </textarea></td><td><div class="row"><div class="form-group col-md-12"><i class=""></i><input type="text" class="modal-custom-input date_pickers_single bydate" style="height: 34px !important;" data-language="en" name="bydate[]" autocomplete="off"/></div></div></td><td><div class="d-flex flex-column"><input type="hidden" class="action_multiownerid" id="action_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="actionsMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" class="favgs" data-toggle="modal" data-target="#addpeopleactions"><span _ngcontent-hhc-c5=""onclick="actionsaddpeople(0)" class="avatar-initial rounded-circle">+</span></a></li></ul></div></td><td>' + dropdown + '</td><td>'+actionIcons+'</td></tr>';
            
            tablebody = '<tr>';

             tablebody += '<td class="align-middle text-center" style="display:none;">';
             tablebody += '<div class="form-group mb-0">';
             tablebody += '<textarea class="form-control pestelactions taskId" placeholder="Enter recommendation" rows="3" name="taskId" style="resize: vertical; min-height: 80px;"></textarea>';
             tablebody += '</div>';
             tablebody += '</td>';

// // == Recommendation (Textarea) ==
// tablebody += '<td class="align-middle text-center">';
// tablebody += '<textarea class="form-control pestelactions" placeholder="Enter recommendation" rows="3" name="pestelactions[]" style="resize: vertical; min-height: 80px;"></textarea>';
// tablebody += '</td>';

// // == By Date (Date Picker) ==
// tablebody += '<td class="align-middle text-center">';
// tablebody += '<div class="d-flex justify-content-center">';
// tablebody += '<input type="text" class="modal-custom-input date_pickers_single bydate form-control" style="height: 34px; max-width: 180px;" data-language="en" name="bydate[]" autocomplete="off" />';
// tablebody += '</div>';
// tablebody += '</td>';

// tablebody += '<td class="align-middle text-center">';
// tablebody += '<div class="d-flex justify-content-center">';
// tablebody += '<input type="text" class="modal-custom-input date_pickers_single todate form-control" style="height: 34px; max-width: 180px;" data-language="en" name="todate[]" autocomplete="off" />';
// tablebody += '</div>';
// tablebody += '</td>';


// // == Responsible (Multi-owner + Add Button) ==
// tablebody += '<td class="align-middle text-center">';
// tablebody += '<div class="d-flex flex-column align-items-center">';
// tablebody += '<input type="hidden" class="action_multiownerid" id="action_multiownerid_0" name="multiowners[]" value="' + users.id + '" />';
// tablebody += '<ul class="list-unstyled order-list d-flex flex-wrap justify-content-center" id="actionsMultiowner_0">';
// tablebody += subinitiativeUser;
// tablebody += '<li class="avatar avatar-xs">';
// tablebody += '<a href="#" class="favgs" data-toggle="modal" data-target="#addpeopleactions" onclick="actionsaddpeople(0)">';
// tablebody += '<span class="avatar-initial rounded-circle text-black">+</span>';
// tablebody += '</a>';
// tablebody += '</li>';
// tablebody += '</ul>';
// tablebody += '</div>';
// tablebody += '</td>';

// // == Status (Dropdown) ==
// tablebody += '<td class="align-middle text-center">';
// tablebody += '<div class="d-flex justify-content-center">';
// tablebody += dropdown;
// tablebody += '</div>';
// tablebody += '</td>';

// == Actions (Icons) ==
tablebody += '<td class="align-middle text-center" style="white-space: nowrap;">';
tablebody += actionIcons;
tablebody += '</td>';

tablebody += '</tr>';
        }
        $("#actiontype").val('create');
    }
    $("#actionBodyData").html(tablebody);
    $('[data-toggle="tooltip"]').tooltip();
    $("#actionbody ul li.avatar").css("cursor","pointer");
    $('.date_pickers_single').datepicker({
            language : 'en',
            autoClose : true,
            position : "bottom left",
            onSelect : function(fd) {
                // $('.datepickers-container').hide();
            }
        });
    $('.actions_multiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
    if((actioneditpermission == false && actioncreatepermission == false) && (actionviewpermission == true || actiondeletepermission == true)){
        $('#actionbody input[type="text"]').prop("disabled", true);
        $('#actionbody textarea').prop("disabled", true);
        $('#actionbody input[type="checkbox"]').prop("disabled", true);
        $('#actionbody select').prop("disabled", true);
        $(".actionsbtn").hide();
    }
}


// function actionsPopSuccessCallback(swotList,typerequest) {
// 	var tablebody	=	"";
// 	$("#actionbody").empty();
// 	if(swotList.pestelAnalysisValue.actions !=	undefined && swotList.pestelAnalysisValue.actions !=	''){
// 		if(swotList.pestelAnalysisValue.actions.length	!=	0){
// 			$("#actiontype").val('update');
// 			$("#actioncount").val(swotList.pestelAnalysisValue.actions.length);
// 		    $.each(swotList.pestelAnalysisValue.actions, function (i, List) {
// 				var name = 	(List.name !=	undefined?List.name:"");
// 				var multiowner 	= 	((List.multipleOwners !=	undefined && List.multipleOwners !=	'')?List.multipleOwners:currentEmp);
// 				var checkstatus	=	(List.status	==	true?"checked":"");
// 				var dropdown = '<select id="action-status-01" name="action-status" class="form-select select-dropdown-action actionstatuscheck" placeholder="Select Status">' +
//                '<option value="" selected>Select Status</option>' +
//                '<option value="pending" ' + (List.status == false ? "selected" : "") + '>Pending</option>' +
//                '<option value="completed" ' + checkstatus + '>Completed</option>' +
//                '</select>';
// 				var bydate		=	(List.bydate !=	undefined?List.bydate:"");
// 				var users		=	topparentswotDetails;
// 		        /*var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
// 				var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle rec_res_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
// 				var subinitiativeUser 	=	'<li class="avatar avatar-xs pull-up"><img '+userProfileConcate+' alt="'+username+'"></li>';*/
// 				var removebtnEnable	=	'';
// 				var removeclass	=	'';
// 				if(actiondeletepermission	==	true){
// 					removeclass	=	' class="actions_clone"';
// 					removebtnEnable	=	`<i class="fas fa-trash remove-action" data-toggle="tooltip" data-placement="bottom"  style="cursor: pointer;"></i>`;
// 				}
// 				var resultPorfileContent	=	actionsPorfileContent(multiowner,List.id);
// 				var userselecteditems	=	resultPorfileContent['userownerlist_data'];
// 				var subinitiativeUser	=	(resultPorfileContent['userownerlist'] !=	undefined?resultPorfileContent['userownerlist']:"");
				
// 				// For all rows except last, show only delete icon
// 				var actionIcons = removebtnEnable;
// 				// For last row, show both add and delete icons
// 				if(i == swotList.pestelAnalysisValue.actions.length - 1) {
// 					actionIcons = `<div class="float-right addactmeetingoption">
// 						<button onclick="action('action_table')" class="form-control rounded-circle" style="margin-top: -4px; border: none;">
// 							<i class="fa fa-plus"></i>
// 						</button>
// 					</div>` + removebtnEnable;
// 				}
				
// 				tablebody	+=	'<tr'+removeclass+'><td><textarea class="form-control pestelactions" placeholder="Notes" rows="3" name="pestelactions[]">'+name+'</textarea></td><td><div class="row"><div class="form-group col-md-12"><i class=""></i><input type="text" class="modal-custom-input date_pickers_single bydate" style="height: 34px !important;" data-language="en" name="bydate[]" value="'+bydate+'" id="bydate" autocomplete="off"/></div></div></td><td><div class="d-flex flex-column">'+userselecteditems+'<ul class="list-unstyled order-list d-flex" id="actionsMultiowner_'+List.id+'">'+subinitiativeUser+'</ul></div></td><td>' + dropdown + '</td><td>'+actionIcons+'</td></tr>';
// 			});
// 		}else{
// 			var users		=	topparentswotDetails;
// 			var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
// 			var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
// 			var subinitiativeUser 	=	'<li class="avatar avatar-xs pull-up"><img '+userProfileConcate+' alt="'+username+'"></li>';
// 			var selectedCompleted = (List.status == true ? "selected" : "");
// 			var selectedPending = (List.status == false ? "selected" : "");

// 			var dropdown = '<select id="action-status-01" name="action-status" class="form-select select-dropdown-action actionstatuscheck" onchange="this.value=(this.value==\'completed\'?true:false)">' +
// 						'<option value="" ' + (List.status == undefined ? "selected" : "") + '>Select Status</option>' +
// 						'<option value="false" ' + selectedPending + '>Pending</option>' +
// 						'<option value="true" ' + selectedCompleted + '>Completed</option>' +
// 						'</select>';
// 			var actionIcons = `<div class="float-right addactmeetingoption">
// 						<button onclick="action('action_table')" class="form-control rounded-circle" style="margin-top: -4px; border: none;">
// 							<i class="fa fa-plus"></i>
// 						</button>
// 					</div>`;
// 			if(actiondeletepermission	==	true) {
// 				actionIcons += `<i class="fas fa-trash remove-action" data-toggle="tooltip" data-placement="bottom"  style="cursor: pointer;"></i>`;
// 			}
			
// 			if((actioneditpermission	==	false || actioncreatepermission	==	false) || actionviewpermission	==	true || actionloadcontent	==	true){					
// 				tablebody	=	'<tr><td><textarea class="form-control pestelactions" placeholder="Notes" rows="3" name="pestelactions[]"> </textarea></td><td><div class="row"><div class="form-group col-md-12"><i class="far fa-calendar input-calender-icon"></i><input type="text" class="modal-custom-input date_pickers_single bydate" style="height: 34px !important;" data-language="en" autocomplete="off"/></div></div></td><td><div class="d-flex flex-column"><input type="hidden" class="action_multiownerid" id="action_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="actionsMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" onclick="return false;" class="favgs"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+</span></a></li></ul></div></td><td>' + dropdown + '</td><td>'+actionIcons+'</td></tr>';
// 			}
// 			if(actioneditpermission	==	true || actioncreatepermission	==	true){
// 				tablebody	=	'<tr><td><textarea class="form-control pestelactions" placeholder="Notes" rows="3" name="pestelactions[]"> </textarea></td><td><div class="row"><div class="form-group col-md-12"><i class="far fa-calendar input-calender-icon"></i><input type="text" class="modal-custom-input date_pickers_single bydate" style="height: 34px !important;" data-language="en" autocomplete="off"/></div></div></td><td><div class="d-flex flex-column"><input type="hidden" class="action_multiownerid" id="action_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="actionsMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" class="favgs" data-toggle="modal" data-target="#addpeopleactions"><span _ngcontent-hhc-c5=""onclick="actionsaddpeople(0)" class="avatar-initial rounded-circle">+</span></a></li></ul></div></td><td>' + dropdown + '</td><td>'+actionIcons+'</td></tr>';		
// 			}
// 			$("#actiontype").val('create');
// 		}
// 	}else{		
// 		var users		=	topparentswotDetails;
// 		var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
// 		var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
// 		var subinitiativeUser 	=	'';
// 		var selectedCompleted = (List.status == true ? "selected" : "");
// 		var selectedPending = (List.status == false ? "selected" : "");

// 		var dropdown = '<select id="action-status-01" name="action-status" class="form-select select-dropdown-action actionstatuscheck" onchange="this.value=(this.value==\'completed\'?true:false)">' +
//                '<option value=""  ' + (List.status == undefined ? "selected" : "") + '>Select Status</option>' +
//                '<option value="false" ' + selectedPending + '>Pending</option>' +
//                '<option value="true" ' + selectedCompleted + '>Completed</option>' +
//                '</select>';
			   
// 		var actionIcons = `<div class="float-right addactmeetingoption">
// 						<button onclick="action('action_table')" class="form-control rounded-circle" style="margin-top: -4px; border: none;">
// 							<i class="fa fa-plus"></i>
// 						</button>
// 					</div>`;
// 		if(actiondeletepermission	==	true) {
// 			actionIcons += `<i class="fas fa-trash remove-action" data-toggle="tooltip" data-placement="bottom"  style="cursor: pointer;"></i>`;
// 		}
		
// 		if((actioneditpermission	==	false || actioncreatepermission	==	false) || actionviewpermission	==	true || actionloadcontent	==	true){
// 			subinitiativeUser 	=	'<li class="avatar avatar-xs pull-up"><img '+userProfileConcate+' alt="'+username+'"></li>';					
// 			tablebody	=	'<tr><td><textarea class="form-control pestelactions" placeholder="Notes" rows="3" name="pestelactions[]"> </textarea></td><td><div class="row"><div class="form-group col-md-12"><i class="far fa-calendar input-calender-icon"></i><input type="text" class="modal-custom-input date_pickers_single bydate" style="height: 34px !important;" data-language="en" autocomplete="off"/></div></div></td><td><div class="d-flex flex-column"><input type="hidden" class="action_multiownerid" id="action_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="actionsMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" onclick="return false;" class="favgs"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+</span></a></li></ul></div></td><td>' + dropdown + '</td><td>'+actionIcons+'</td></tr>';
// 		}
// 		if(actioneditpermission	==	true || actioncreatepermission	==	true){
// 			subinitiativeUser 	=	'<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeopleactions" onclick="actionsaddpeople(0)"><img '+userProfileConcate+' alt="'+username+'"></li>';
// 			tablebody	=	'<tr><td><textarea class="form-control pestelactions" placeholder="Notes" rows="3" name="pestelactions[]"> </textarea></td><td><div class="row"><div class="form-group col-md-12"><i class="far fa-calendar input-calender-icon"></i><input type="text" class="modal-custom-input date_pickers_single bydate" style="height: 34px !important;" data-language="en" autocomplete="off"/></div></div></td><td><div class="d-flex flex-column"><input type="hidden" class="action_multiownerid" id="action_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="actionsMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" class="favgs" data-toggle="modal" data-target="#addpeopleactions"><span _ngcontent-hhc-c5=""onclick="actionsaddpeople(0)" class="avatar-initial rounded-circle">+</span></a></li></ul></div></td><td>' + dropdown + '</td><td>'+actionIcons+'</td></tr>';		
// 		}
// 		$("#actiontype").val('create');
// 	}
// 	$("#actionbody").html(tablebody);
// 	$('[data-toggle="tooltip"]').tooltip();
// 	$("#actionbody ul li.avatar").css("cursor","pointer");
// 	$('.date_pickers_single').datepicker({
// 			language : 'en',
// 			autoClose : true,
// 			position : "bottom left",
// 			//todayButton : true,
// 			onSelect : function(fd) {
// 				// $('.datepickers-container').hide();
// 			}
// 		});
// 	$('.actions_multiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
// 	if((actioneditpermission	==	false && actioncreatepermission	==	false) && (actionviewpermission == true || actiondeletepermission == true)){
// 		$('#actionbody input[type="text"]').prop("disabled", true);
// 		$('#actionbody textarea').prop("disabled", true);
// 		$('#actionbody input[type="checkbox"]').prop("disabled", true);
// 		$('#actionbody select').prop("disabled", true);
// 		$(".actionsbtn").hide();
// 	}
// }

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



    if (id != null || !id == "" || id != undefined) {
        swotObj = {
            "id": id,
            "active": 0,
            "flagType": flagType,
            "pestelAnalysisValue": {
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
            "pestelAnalysisValue": {
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
    if (flagValue == "flag-green") {
        flag_green = "checked";
    } else if (flagValue == "flag-orange") {
        flag_orange = "checked";
    } else if (flagValue == "flag-red") {
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

function handleMultioownersuserevent(id, action) {
    console.log(id, action, "id, action");

	var getData = []

	      $.ajax({
            url: "/stratroom/pestelAnalysis/" + id,
            async: false,
            success: function(result, status) {
                swotupdateDescription = result;
				getData = result.multipleOwerlist;
				console.log(result, "swotupdateDescription");
                localStorage.setItem('existingowners', swotupdateDescription.pestelAnalysisValue.multipleOwners);
            },
            error: readErrorMsg
        });

    if(editpermission == false && createpermission == false){
        return false;
    }
    
    var imageElement = "initiativeactivitieUser"+id;
    $("#swotajaxid").val(id);
    var data = {};
    
    if (action == 'edit') {
        $("#activities-ini-box_view_users").html('');
        $("#activities-ini-box_view_users").html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
        $("#activities_current_id").attr("data-activities_sub_current_id",id);
        
        $.ajax({
            url: "/stratroom/user/moduleAccessUserList?moduleName=PESTEL",
            async: false,
            success: function(result, status) {
                var attendeesHtml = '';
                var ischecked = "";
                var selectedItem = [];


				$.each(getData,function(index,users){
					if(users.id != undefined && users.id != 0){
						selectedItem.push(users.id);
					}
				});
				
				if(selectedItem.length 	==	0){
					var users 	=	topparentswotDetails;
					selectedItem.push(users.id);
				}

				console.log(selectedItem, "selectedItem");
                var datas = [];
                $.each(result, function(index, users) {
                    datas.push(users.id);
                });
                
                if(result.length == 0) {
                    $(".showactivitiesusers").css('display','none');
                }
                
                if(result.length == selectedItem.length) {
                    $("#allusersactivities").prop("checked", true);
                } else {
                    $("#allusersactivities").prop("checked", false);
                }
                
                $.each(result, function(index, users) {
                    console.log(users, "users");
                    var username = ((users.name == undefined || users.name == "") ? "User" : users.name);
                    var userProfileConcate = ((users.image == undefined || users.image == "") ? "data-name='"+username+"' class='rounded-circle swotmultiuserimage'" : "class='rounded-circle' src='"+users.image+"'");
                    
                   
                    ischecked = "";
                    $.each(selectedItem, function(key, value) {
                        if(value == users.id) {
                            ischecked = "checked";
                            return false;
                        }
                    });

					console.log(selectedItem, "selectedItem");
                    
                    var userImage = (users.image && users.image != "") ? users.image : 'assets/images/icons/speaker.svg';
                    var userAlt = username;
                    
                  
                    attendeesHtml += '<div class="list-group-item attendee">';
                    attendeesHtml += '  <div class="form-check cusom-check form-check-reverse">';
                    attendeesHtml += '    <input class="form-check-input" type="checkbox" name="activities_owner[]" id="attendees' + users.id + '" ' + ischecked + ' value="' + users.id + '">';
                    attendeesHtml += '    <label class="form-check-label" for="attendees' + users.id + '">';
                    attendeesHtml += '      <span class="image">';
                    
                    if(users.image && users.image != "") {
                        attendeesHtml += '        <img src="' + users.image + '" alt="' + userAlt + '" width="18" height="18" class="rounded-circle">';
                    } else {
                        attendeesHtml += '        <img data-name="' + username + '" width="18" height="18" class="rounded-circle swotmultiuserimage">';
                    }
                    
                    attendeesHtml += '      </span>';
                    attendeesHtml += '      <span class="name">' + users.name + '</span>';
                    attendeesHtml += '    </label>';
                    attendeesHtml += '  </div>';
                    attendeesHtml += '</div>';
                });
                
               
                $(".add-attendees").html(attendeesHtml);
                $('.swotmultiuserimage').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
                
               
            }
        });
        
  
    }
}	
// function handleMultioownersuserevent(id,action) {
// 	if(editpermission	==	false && createpermission	==	false){
// 		return false;
// 	}
// 	var imageElement 	=	"initiativeactivitieUser"+id;
// 	$("#swotajaxid").val(id);
// 	var data 	=	{};
// 	if (action == 'edit') {
// 		$("#activities-ini-box_view_users").html('');
// 		$("#activities-ini-box_view_users").html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
// 		$("#activities_current_id").attr("data-activities_sub_current_id",id);
		
// 		$.ajax({
// 			url: "/stratroom/user/moduleAccessUserList?moduleName=PESTEL",
// 			async:false,
// 			success : function(result,status){
// 				var subinitiativeUser 	=	"";
// 				var ischecked 	=	"";
// 				var selectedItem 	=	[];
				
// 				if($("#activities_selected_user_"+id).length){
// 					selectedItem	=	$("#activities_selected_user_"+id).val().split(',');
// 				}	
				
// 				var datas 	=	[];
// 				$.each(result, function(index, users) {
// 					datas.push(users.id);
// 				});
				
// 				if(result.length	==	0){
// 					$(".showactivitiesusers").css('display','none');
// 				}
				
// 				if(result.length	==	selectedItem.length){
// 					$("#allusersactivities").prop("checked","checked");
// 				}else{
// 					$("#allusersactivities").prop("checked",false);
// 				}
				
// 				$.each(result, function(index, users) {
// 					var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
// 					var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle swotmultiuserimage' ":" class='rounded-circle' src='"+users.image+"'");
// 					$.each(selectedItem,function(key,value){
// 						if(value	==	users.id){
// 							ischecked 	=	"checked";
// 							return false;
// 						}else{
// 							ischecked 	=	"";
// 						}
// 					});
// 					subinitiativeUser 	+=	'<div class="d-flex flex-row employe_content_border sub_initiative_details"><div class="d-flex flex-column flex-fill profile_content"><div class="d-flex flex-row"><div class="form-check"><label class="form-check-label"><input id="" class="form-check-input" name="activities_owner[]" '+ischecked+' type="checkbox" value="'+users.id+'"><span class="form-check-sign"> <span class="check"></span></span></label></div><div class="d-flex flex-column init_flex_profile" style="margin-top: 3%;text-align: center;"><h5>'+users.name+'</h5></div><div class="img_details" style="width: 20%;"><img alt="'+username+'" '+userProfileConcate+'></div></div></div></div>';
// 				});
// 				$("#activities-ini-box_view_users").html('');
// 				$("#activities-ini-box_view_users").html(subinitiativeUser);
// 				$('.swotmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
// 			}
// 		});
		
		
// 		$.ajax({
// 			url : "/stratroom/pestelAnalysis/" + id,
// 			async:false,
// 			success : function(result,status){
// 				swotupdateDescription	=	result;
// 				localStorage.setItem('existingowners',swotupdateDescription.pestelAnalysisValue.multipleOwners);
// 			},
// 			error:readErrorMsg
// 		});
		
// 	}
// }	

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

$(document).on("click", ".getselectedActivitiesUsers", function () {
  console.log("this function is clicked");
  if (editpermission == false && createpermission == false) {
    return false;
  }
  $("#searchactivities").val("");
  $("#activities_search2").show();
  $("#activities_search_section2").hide();
  var id = $("#activities_current_id").attr("data-activities_sub_current_id");
  if (id == undefined || id == "" || id == " ") {
    return false;
  }
  var imageElement = "initiativeactivitieUser_" + id;

  var userseslectedData = [];
  var selectedSubinitiativeOwner = $(
    ".swot_add_multiuser_popup input[name='activities_owner[]']:checked"
  ).each(function (index) {
    userseslectedData.push(parseInt($(this).val()));
  });

  var functionParams = id + "," + '"edit"';
  var functionName = "handleMultioownersuserevent";
  var modalPopupName = ".swot_add_multiuser_popup";
  $("#activities_selected_user_" + id).val(userseslectedData.join(","));
  var swotObj = swotupdateDescription;
  var oldowners = localStorage.getItem("existingowners");
  var newowner = swotObj.pestelAnalysisValue.multipleOwners;
  var newowners;
  newowners = getNewOwners(oldowners, newowner);
  swotObj.pestelAnalysisValue.newMultipleOwners = newowners;
  for (var i = 0; i < swotObj.pestelAnalysisValue.recommendation.length; i++) {
    swotupdateDescription.pestelAnalysisValue.recommendation[
      i
    ].newMultipleOwners = "";
  }
  for (var i = 0; i < swotObj.pestelAnalysisValue.actions.length; i++) {
    swotupdateDescription.pestelAnalysisValue.actions[i].newMultipleOwners = "";
  }
  var methodType = "put";

  console.log(swotObj, "swotObj");

  const multipleOwnersStr = swotObj.pestelAnalysisValue.multipleOwners;
  const uniqueOwners = [...new Set(multipleOwnersStr.split(',').map(id => id.trim()))].filter(id => id && id !== 'undefined');
  const cleanedMultipleOwners = uniqueOwners.join(',');

swotObj.pestelAnalysisValue.multipleOwners = cleanedMultipleOwners;

console.log(swotObj, "swotObj after removing duplicates");
  $.ajax({
    url: "/stratroom/pestelAnalysis/",
    type: methodType,
    contentType: "application/json",
    data: JSON.stringify(swotObj),
    success: function (data, status) {
      window.location.reload();
      // $.notify("Updated Successfully");
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
  if (!jQuery.isEmptyObject(userseslectedData)) {
    $.ajax({
      url: "/stratroom/user/moduleAccessUserList?moduleName=PESTEL",
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
                var username =
                  users.name == undefined || users.name == ""
                    ? "User"
                    : users.name;
                var userProfileConcate =
                  users.image == undefined || users.image == ""
                    ? "data-name='" +
                      username +
                      "' class='rounded-circle swotmultiuserimage' "
                    : "src='" + users.image + "' class='rounded-circle' ";

                if (index <= 2) {
                  subinitiativeUser +=
                    '<li class="avatar avatar-xs pull-up" onclick=' +
                    functionName +
                    "(" +
                    functionParams +
                    ') data-selecteduser="' +
                    users.id +
                    '"><img ' +
                    userProfileConcate +
                    ' alt="' +
                    username +
                    '" width="50"></li>';
                }

                if (userseslectedData.length >= 3 && index >= 2 && index <= 2) {
                  badgeinc = true;
                  subinitiativeUser = subinitiativeUser.replace(
                    '<li class="avatar avatar-xs pull-up" onclick=' +
                      functionName +
                      "(" +
                      functionParams +
                      ') data-selecteduser="' +
                      users.id +
                      '"><img ' +
                      userProfileConcate +
                      ' alt="' +
                      username +
                      '" width="50"></li>',
                    ""
                  );
                  subinitiativeUser +=
                    '<li class="avatar avatar-xs pull-up" onclick=' +
                    functionName +
                    "(" +
                    functionParams +
                    ') data-selecteduser="' +
                    users.id +
                    '"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
                    profileBadgeIncrement +
                    "</span></li>";
                  return false;
                }
              }
            });
          });
          if (badgeinc == false) {
            subinitiativeUser =
              subinitiativeUser +
              '<li class="avatar avatar-xs pull-up" onclick=' +
              functionName +
              "(" +
              functionParams +
              ')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
              profileBadgeIncrement +
              "</span></li>";
          }
        }
        if (userseslectedData.length == data.length) {
          var profileBadgeIncrement =
            data.length >= 3 ? parseInt(data.length) - parseInt(2) : 0;
          var badgeinc = false;
          $.each(data, function (index, users) {
            var username =
              users.name == undefined || users.name == "" ? "User" : users.name;
            var userProfileConcate =
              users.image == undefined || users.image == ""
                ? "data-name='" +
                  username +
                  "' class='rounded-circle swotmultiuserimage' "
                : "src='" + users.image + "' class='rounded-circle' ";
            if (index <= 2) {
              subinitiativeUser +=
                '<li class="avatar avatar-xs pull-up" onclick=' +
                functionName +
                "(" +
                functionParams +
                ') data-selecteduser="' +
                users.id +
                '"><img ' +
                userProfileConcate +
                ' alt="' +
                username +
                '" width="50"></li>';
            }

            if (userseslectedData.length >= 3 && index >= 2 && index <= 2) {
              badgeinc = true;
              subinitiativeUser = subinitiativeUser.replace(
                '<li class="avatar avatar-xs pull-up" onclick=' +
                  functionName +
                  "(" +
                  functionParams +
                  ') data-selecteduser="' +
                  users.id +
                  '"><img ' +
                  userProfileConcate +
                  ' alt="' +
                  username +
                  '" width="50"></li>',
                ""
              );
              subinitiativeUser +=
                '<li class="avatar avatar-xs pull-up" onclick=' +
                functionName +
                "(" +
                functionParams +
                ') data-selecteduser="' +
                users.id +
                '"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
                profileBadgeIncrement +
                "</span></li>";
              return false;
            }
          });

          if (badgeinc == false) {
            subinitiativeUser =
              subinitiativeUser +
              '<li class="avatar avatar-xs pull-up" onclick=' +
              functionName +
              "(" +
              functionParams +
              ')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
              profileBadgeIncrement +
              "</span></li>";
          }
        }

        $("#" + imageElement).html("");
        $("#" + imageElement).html(subinitiativeUser);
        $(".swotmultiuserimage").initial({
          charCount: 2,
          height: 30,
          width: 30,
          fontSize: 18,
        });
      },
    });
  } else {
    var users = topparentswotDetails;
    $("#activities_selected_user_" + id).val(users.id);
    userseslectedData.push(users.id);
    var username =
      users.name == undefined || users.name == "" ? "User" : users.name;
    var userProfileConcate =
      users.image == undefined || users.image == ""
        ? "data-name='" +
          username +
          "' class='rounded-circle swotmultiuserimage' "
        : "src='" + users.image + "' class='rounded-circle'";
    subinitiativeUser =
      '<li class="avatar avatar-xs pull-up" onclick=' +
      functionName +
      "(" +
      functionParams +
      ")><img " +
      userProfileConcate +
      ' alt="' +
      username +
      '" width="50"></li>';
    subinitiativeUser =
      subinitiativeUser +
      '<li class="avatar avatar-xs pull-up" onclick=' +
      functionName +
      "(" +
      functionParams +
      ')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+</span></li>';
    $("#" + imageElement).html("");
    $("#" + imageElement).html(subinitiativeUser);
    $(".swotmultiuserimage").initial({
      charCount: 2,
      height: 30,
      width: 30,
      fontSize: 18,
    });
  }
});

// $(document).on("click",".getselectedActivitiesUsers",function(){
// 	if(editpermission	==	false && createpermission	==	false){
// 		return false;
// 	}
// 	$("#searchactivities").val('');
//     $("#activities_search2").show();
//     $("#activities_search_section2").hide();
// 	var id = $("#activities_current_id").attr("data-activities_sub_current_id");
// 	if((id ==	undefined || id ==	"" || id ==	" ")){
// 		return false;
// 	}
// 	var imageElement 	=	"initiativeactivitieUser_"+id;
	
// 	var userseslectedData 	=	[];
// 	var selectedSubinitiativeOwner = $(".swot_add_multiuser_popup input[name='activities_owner[]']:checked").each(function(index){
// 		userseslectedData.push(parseInt($(this).val()));
// 	});

// 	var functionParams	=	id+','+'"edit"';
// 	var functionName	=	"handleMultioownersuserevent";
// 	var modalPopupName	=	".swot_add_multiuser_popup";
// 	$("#activities_selected_user_"+id).val(userseslectedData.join(','));
// 	var swotObj			=	swotupdateDescription;
// 	var oldowners = 	localStorage.getItem('existingowners');
// 		var newowner=swotObj.pestelAnalysisValue.multipleOwners;
// 		var newowners;
// 		newowners = getNewOwners(oldowners,newowner);
// 		swotObj.pestelAnalysisValue.newMultipleOwners = newowners;
// 		for(var i=0;i<swotObj.pestelAnalysisValue.recommendation.length;i++){
// 			swotupdateDescription.pestelAnalysisValue.recommendation[i].newMultipleOwners = "";
// 			}
// 		for(var i=0;i<swotObj.pestelAnalysisValue.actions.length;i++){
// 			swotupdateDescription.pestelAnalysisValue.actions[i].newMultipleOwners = "";
// 		}
// 	var methodType 		= 	'put';
		
// 		$.ajax({
// 			url : "/stratroom/pestelAnalysis/",
// 			type : methodType,
// 			contentType : "application/json",
// 			data : JSON.stringify(swotObj),
// 			success : function(data, status) {
// 				//$.notify("Updated Successfully");
// 			},
// 			error:function(msg,status){
// 			if(!jQuery.isEmptyObject(msg.responseText)){
// 				$.each(JSON.parse(msg.responseText),function(key,value){
// 					if(key 	==	"exception"){
// 						$.notify("Error:"+value,{
// 							  style: 'error',
// 							  className: 'graynotify'
// 							});
// 					}
// 					if(key 	==	"error"){
// 						$.notify("Error:"+value, {
// 							  style: 'error',
// 							  className: 'graynotify'
// 							});
// 					}
// 				});
				
// 			}
// 		}
// 	});
// 	if(!jQuery.isEmptyObject(userseslectedData)){
// 		$.ajax({
// 			url: "/stratroom/user/moduleAccessUserList?moduleName=PESTEL",
// 			success : function(data, status) {
// 				var subinitiativeUser	=	"";
// 				if(userseslectedData.length !=	data.length){
// 					var profileBadgeIncrement 	=	(userseslectedData.length >= 3?parseInt(userseslectedData.length)-parseInt(2):"");
// 					var badgeinc	=	false;
// 					$.each(data,function(key,users){
// 							$.each(userseslectedData,function(index,selectedvalue){
// 								if(selectedvalue ==	users.id){
// 									var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
// 									var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle swotmultiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
									
// 									if(index <= 2){
// 										subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
// 									}
									 
// 									if(userseslectedData.length >= 3 && index >= 2 && index <= 2){
// 										badgeinc	=	true;
// 										subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-xs pull-up" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
// 										subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 										return false;
// 									}
// 								}
// 							});
// 					});
// 					if(badgeinc	==	false){
// 						subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-xs pull-up" onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 					}
// 				}
// 				if(userseslectedData.length ==	data.length){
// 					var profileBadgeIncrement 	=	(data.length >= 3?parseInt(data.length)-parseInt(2):0);
// 					var badgeinc	=	false;
// 					$.each(data,function(index,users){
// 						var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
// 						var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle swotmultiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
// 						if(index <= 2){
// 							subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
// 						}
						
// 						if(userseslectedData.length >= 3 && index >= 2 && index <= 2){
// 							badgeinc	=	true;
// 							subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-xs pull-up" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
// 							subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 							return false;
// 						}
						
// 					});
					
// 					if(badgeinc	==	false){
// 						subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-xs pull-up" onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 					}
// 				}
					
// 				$("#"+imageElement).html('');
// 				$("#"+imageElement).html(subinitiativeUser);
// 				$('.swotmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
// 			}
// 		});
// 	}else{
// 		var users 	=	topparentswotDetails;
// 		$("#activities_selected_user_"+id).val(users.id);
// 		userseslectedData.push(users.id);
// 		var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
// 		var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle swotmultiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
// 		subinitiativeUser 	=	'<li class="avatar avatar-xs pull-up" onclick='+functionName+'('+functionParams+')><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
// 		subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-xs pull-up" onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+</span></li>';
// 		$("#"+imageElement).html('');
// 		$("#"+imageElement).html(subinitiativeUser);
// 		$('.swotmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
// 	}
// });

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
										subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
									}
									 
									if(multiowners.length >= 3 && index >= 2 && index <= 2){
										badgeinc	=	true;
										subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
										subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
										return false;
									}
								}
							});
					});
					if(badgeinc	==	false){
						subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
					}
				}else{
					var profileBadgeIncrement 	=	(data.length >= 3?parseInt(data.length)-parseInt(2):0);
					var badgeinc	=	false;
					$.each(data,function(index,users){
						var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
						var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle rec_res_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
						if(index <= 2){
							subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
						}
						
						if(multiowners.length >= 3 && index >= 2 && index <= 2){
							badgeinc	=	true;
							subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
							subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
							return false;
						}
						
					});
					
					if(badgeinc	==	false){
						subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
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
		subinitiativeUser 	=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
		subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+</span></li>';
		$("#"+imageElement).html('');
		$("#"+imageElement).html(subinitiativeUser);
		$("#"+imageElement+" li").css("cursor","pointer");
		$('.rec_res_multiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
	}
	
});

// $(document).on("click",".actionpeopleselectedUsers",function(){
	
// 	if(createpermission == false && editpermission == false){
// 		return false
// 	}
// 	$("#searchactions").val('');
//     $("#actions_search2").show();
//     $("#actions_search_section2").hide();
// 	var id = $("#actionsresponsibleid").val();
// 	if((id ==	undefined || id ==	"" || id ==	" ")){
// 		return false;
// 	}
	
// 	var multiowners	= 	$("input[name='swot_action_owner[]']:checked").map(function(){
//     	return this.value;
// 	}).get();
	
// 	if(multiowners.length	==	0){
// 		$("#action_multiownerid_"+id).val(currentEmp);
// 	}else{
// 		$("#action_multiownerid_"+id).val(multiowners.join(','));
// 	}
	
// 	var imageElement 	=	"actionsMultiowner_"+id;
// 	var functionParams	=	id;
// 	var functionName	=	"actionsaddpeople";
// 	var modalPopupName	=	'data-toggle="modal" data-target="#addpeopleactions"';
// 	if(!jQuery.isEmptyObject(multiowners)){
// 		$.ajax({
// 			url: "/stratroom/user/moduleAccessUserList?moduleName=PESTEL",
// 			success : function(data, status) {
// 				var subinitiativeUser	=	"";
// 				if(multiowners.length !=	data.length){
// 					var profileBadgeIncrement 	=	(multiowners.length >= 3?parseInt(multiowners.length)-parseInt(2):"");
// 					var badgeinc	=	false;
// 					$.each(data,function(key,users){
// 							$.each(multiowners,function(index,selectedvalue){
// 								if(selectedvalue ==	users.id){
// 									var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
// 									var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
									
// 									if(index <= 2){
// 										subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
// 									}
									 
// 									if(multiowners.length >= 3 && index >= 2 && index <= 2){
// 										badgeinc	=	true;
// 										subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
// 										subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 										return false;
// 									}
// 								}
// 							});
// 					});
// 					if(badgeinc	==	false){
// 						subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 					}
// 				}else{
// 					var profileBadgeIncrement 	=	(data.length >= 3?parseInt(data.length)-parseInt(2):0);
// 					var badgeinc	=	false;
// 					$.each(data,function(index,users){
// 						var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
// 						var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
// 						if(index <= 2){
// 							subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
// 						}
						
// 						if(multiowners.length >= 3 && index >= 2 && index <= 2){
// 							badgeinc	=	true;
// 							subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
// 							subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 							return false;
// 						}
						
// 					});
					
// 					if(badgeinc	==	false){
// 						subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 					}
// 				}
					
// 				$("#"+imageElement).html('');
// 				$("#"+imageElement).html(subinitiativeUser);
// 				$("#"+imageElement+" li").css("cursor","pointer");
// 				$('.actions_multiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
// 			}
// 		});
// 	}else{
// 		var users 	=	topparentswotDetails;
// 		$("#action_multiownerid_"+id).val(users.id);
// 		var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
// 		var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
// 		subinitiativeUser 	=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
// 		subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+</span></li>';
// 		$("#"+imageElement).html('');
// 		$("#"+imageElement).html(subinitiativeUser);
// 		$("#"+imageElement+" li").css("cursor","pointer");
// 		$('.actions_multiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
// 	}
	
// });

$(document).on("click", ".actionpeopleselectedUsers", function () {
  console.log("function clicked")
  if (createpermission == false && editpermission == false) {
    return false;
  }
  $("#searchactions").val("");
  $("#actions_search2").show();
  $("#actions_search_section2").hide();
  var id = $("#actionsresponsibleid").val();
  if (id == undefined || id == "" || id == " ") {
    return false;
  }

  var multiowners = $("input[name='swot_action_owner[]']:checked")
    .map(function () {
      return this.value;
    })
    .get();

  if (multiowners.length == 0) {
    $("#action_multiownerid_" + id).val(currentEmp);
  } else {
    $("#action_multiownerid_" + id).val(multiowners.join(","));
  }

  var imageElement = "actionsMultiowner_" + id;
  var functionParams = id;
  var functionName = "actionsaddpeople";
  var modalPopupName = 'data-toggle="modal" data-target="#addpeopleactions"';
  if (!jQuery.isEmptyObject(multiowners)) {
    $.ajax({
      url: "/stratroom/user/moduleAccessUserList?moduleName=PESTEL",
      success: function (data, status) {
        var subinitiativeUser = "";
        if (multiowners.length != data.length) {
          var profileBadgeIncrement =
            multiowners.length >= 3
              ? parseInt(multiowners.length) - parseInt(2)
              : "";
          var badgeinc = false;
          $.each(data, function (key, users) {
            $.each(multiowners, function (index, selectedvalue) {
              if (selectedvalue == users.id) {
                var username =
                  users.name == undefined || users.name == ""
                    ? "User"
                    : users.name;
                var userProfileConcate =
                  users.image == undefined || users.image == ""
                    ? "data-name='" +
                      username +
                      "' class='rounded-circle actions_multiuserimage' "
                    : "src='" + users.image + "' class='rounded-circle' ";

                if (index <= 2) {
                  subinitiativeUser +=
                    '<li class="avatar avatar-xs pull-up" ' +
                    modalPopupName +
                    " onclick=" +
                    functionName +
                    "(" +
                    functionParams +
                    ') data-selecteduser="' +
                    users.id +
                    '"><img ' +
                    userProfileConcate +
                    ' alt="' +
                    username +
                    '" width="50"></li>';
                }

                if (multiowners.length >= 3 && index >= 2 && index <= 2) {
                  badgeinc = true;
                  subinitiativeUser = subinitiativeUser.replace(
                    '<li class="avatar avatar-xs pull-up" ' +
                      modalPopupName +
                      " onclick=" +
                      functionName +
                      "(" +
                      functionParams +
                      ') data-selecteduser="' +
                      users.id +
                      '"><img ' +
                      userProfileConcate +
                      ' alt="' +
                      username +
                      '" width="50"></li>',
                    ""
                  );
                  subinitiativeUser +=
                    '<li class="avatar avatar-xs pull-up" ' +
                    modalPopupName +
                    " onclick=" +
                    functionName +
                    "(" +
                    functionParams +
                    ') data-selecteduser="' +
                    users.id +
                    '"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
                    profileBadgeIncrement +
                    "</span></li>";
                  return false;
                }
              }
            });
          });
          if (badgeinc == false) {
            subinitiativeUser =
              subinitiativeUser +
              '<li class="avatar avatar-xs pull-up" ' +
              modalPopupName +
              " onclick=" +
              functionName +
              "(" +
              functionParams +
              ')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
              profileBadgeIncrement +
              "</span></li>";
          }
        } else {
          var profileBadgeIncrement =
            data.length >= 3 ? parseInt(data.length) - parseInt(2) : 0;
          var badgeinc = false;
          $.each(data, function (index, users) {
            var username =
              users.name == undefined || users.name == "" ? "User" : users.name;
            var userProfileConcate =
              users.image == undefined || users.image == ""
                ? "data-name='" +
                  username +
                  "' class='rounded-circle actions_multiuserimage' "
                : "src='" + users.image + "' class='rounded-circle' ";
            if (index <= 2) {
              subinitiativeUser +=
                '<li class="avatar avatar-xs pull-up" ' +
                modalPopupName +
                " onclick=" +
                functionName +
                "(" +
                functionParams +
                ') data-selecteduser="' +
                users.id +
                '"><img ' +
                userProfileConcate +
                ' alt="' +
                username +
                '" width="50"></li>';
            }

            if (multiowners.length >= 3 && index >= 2 && index <= 2) {
              badgeinc = true;
              subinitiativeUser = subinitiativeUser.replace(
                '<li class="avatar avatar-xs pull-up" ' +
                  modalPopupName +
                  " onclick=" +
                  functionName +
                  "(" +
                  functionParams +
                  ') data-selecteduser="' +
                  users.id +
                  '"><img ' +
                  userProfileConcate +
                  ' alt="' +
                  username +
                  '" width="50"></li>',
                ""
              );
              subinitiativeUser +=
                '<li class="avatar avatar-xs pull-up" ' +
                modalPopupName +
                " onclick=" +
                functionName +
                "(" +
                functionParams +
                ') data-selecteduser="' +
                users.id +
                '"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
                profileBadgeIncrement +
                "</span></li>";
              return false;
            }
          });

          if (badgeinc == false) {
            subinitiativeUser =
              subinitiativeUser +
              '<li class="avatar avatar-xs pull-up" ' +
              modalPopupName +
              " onclick=" +
              functionName +
              "(" +
              functionParams +
              ')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
              profileBadgeIncrement +
              "</span></li>";
          }
        }

        $("#" + imageElement).html("");
        $("#" + imageElement).html(subinitiativeUser);
        $("#" + imageElement + " li").css("cursor", "pointer");
        $(".actions_multiuserimage").initial({
          charCount: 2,
          height: 30,
          width: 30,
          fontSize: 18,
        });
      },
    });
  } else {
    var users = topparentswotDetails;
    $("#action_multiownerid_" + id).val(users.id);
    var username =
      users.name == undefined || users.name == "" ? "User" : users.name;
    var userProfileConcate =
      users.image == undefined || users.image == ""
        ? "data-name='" +
          username +
          "' class='rounded-circle actions_multiuserimage' "
        : "src='" + users.image + "' class='rounded-circle'";
    subinitiativeUser =
      '<li class="avatar avatar-xs pull-up" ' +
      modalPopupName +
      " onclick=" +
      functionName +
      "(" +
      functionParams +
      ")><img " +
      userProfileConcate +
      ' alt="' +
      username +
      '" width="50"></li>';
    subinitiativeUser =
      subinitiativeUser +
      '<li class="avatar avatar-xs pull-up" ' +
      modalPopupName +
      " onclick=" +
      functionName +
      "(" +
      functionParams +
      ')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+</span></li>';
    $("#" + imageElement).html("");
    $("#" + imageElement).html(subinitiativeUser);
    $("#" + imageElement + " li").css("cursor", "pointer");
    $(".actions_multiuserimage").initial({
      charCount: 2,
      height: 30,
      width: 30,
      fontSize: 18,
    });
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

function uploadShow(result) {
   const storedLanguage = localStorage.getItem("selectedLang") || "en";
  var SnNo = "Sr. No.";
  var FileName = "File Name";
  var UploadedOn = "Uploaded On";
  var Size = "Size";
  var Type = "Type";
  var Actions = "Actions";
 if (storedLanguage == "en") {
    SnNo = "Sr. No.";
    FileName = "File Name";
    UploadedOn = "Uploaded On";
    Size = "Size";
    Type = "Type";
    Actions = "Actions";
} else if (storedLanguage == "am") {
    SnNo = "ተ.ቁ";
    FileName = "የፋይል ስም";
    UploadedOn = "ተሰቀለበት ቀን";
    Size = "መጠን";
    Type = "አይነት";
    Actions = "እርምጃዎች";
} else {
    // Arabic
    SnNo = "المسلسل رقم";
    FileName = "اسم الملف";
    UploadedOn = "تم الرفع في";
    Size = "بحجم";
    Type = "نوع";
    Actions = "إجراءات";
}

  $("#listfileuploadTable").empty();
  var uploadShowData = "";
  var i;
  $.each(result, function (i, List) {
    i++;
    var uploadedOn = dateFormatedtohumanread(List.createdTime);
    uploadShowData +=
  "<tr>" +
  "<td class='text-center align-middle' id='" + List.id + "'>" + i + "</td>" +
  "<td class='text-center align-middle' name='" + List.name + "'><a href='" + List.file + "' target='_blank' download='" + List.name + "." + List.type + "'>" + List.name + "</a></td>" +
  "<td class='text-center align-middle' id='" + List.id + "'>" + uploadedOn + "</td>" +
  "<td class='text-center align-middle' id='" + List.id + "'>" + List.size + "</td>" +
  "<td class='text-center align-middle' type='" + List.type + "'>" + List.type + "</td>" +
  "<td class='text-center align-middle'>" +
    "<div class='table-actions justify-content-center'>";

if (attdeletepermission == true) {
  uploadShowData +=
    '<a href="#" class="btn btn-sm btn-icon" data-toggle="modal" data-target="#deleteAttachmentModal" onclick="deleteAttachment(' + attachmentdeleteId + "," + List.id + ')"    >' +
      '<img src="/stratroom/images/delete-i.svg" width="12" height="12" />' +
    '</a>';
}
else if (atteditpermission == false && attdeletepermission == false) {
  uploadShowData += "--";
}

uploadShowData +=
    "</div>" +
  "</td>" +
  "</tr>";
    // $('.uploadattachmentSuccess').append(uploadShowData);
  });
  var table =
    `<div class="table-responsive">
    <table class="table table-sm table-bordered align-center" id="fileuploadTable"
										style="margin-bottom: 0px !important;">
										<thead>
                                        <tr>
                                            <th class="text-center">`+SnNo+`</th>
                                            <th class="text-center">`+FileName+`</th>
                                            <th class="text-center">`+UploadedOn+`</th>
                                            <th class="text-center">`+Size+`</th>
                                            <th class="text-center">`+Type+`</th>
                                            <th class="text-center">`+Actions+`</th>
                                        </tr>
                                    </thead><tbody>` +
    uploadShowData +
    `
										</tbody>
									</table>
                  </div>`;
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

// $(document).on("click","#allusersactivities",function(){
// 	if(editpermission	==	false && createpermission	==	false){
// 		return false;
// 	}
// 	var propcheck	=	$(this).is(":checked");
// 	if(propcheck	==	true){
// 		$("#activities-ini-box_view_users input[name='activities_owner[]']").each(function(index,value){
// 			$(this).prop("checked","checked");
// 		});
// 	}
// 	if(propcheck	==	false){
// 		$("#activities-ini-box_view_users input[name='activities_owner[]']").each(function(index,value){
// 			$(this).prop("checked",false);
// 		});
// 	}
	
// 		var id				=	$("#swotajaxid").val();
// 		if(swotupdateDescription == undefined || swotupdateDescription == "" || swotupdateDescription.id == ""){
// 			return false;
// 		}
// 		var swotObj			=	swotupdateDescription;
// 		var multiowners	= 	$("input[name='activities_owner[]']:checked").map(function(){
// 	    	return this.value;
// 		}).get();
		
// 		if(multiowners.length	==	0){
// 			swotObj.pestelAnalysisValue.multipleOwners	=	currentEmp;	
// 		}else{
// 			swotObj.pestelAnalysisValue.multipleOwners	=	multiowners.join(',');
// 		}
	
// 		var methodType 		= 	'put';
		
// 		$.ajax({
// 			url : "/stratroom/pestelAnalysis/",
// 			type : methodType,
// 			contentType : "application/json",
// 			data : JSON.stringify(swotObj),
// 			success : function(data, status) {
// 				//$.notify("Updated Successfully");
// 			},
// 			error:function(msg,status){
// 			if(!jQuery.isEmptyObject(msg.responseText)){
// 				$.each(JSON.parse(msg.responseText),function(key,value){
// 					if(key 	==	"exception"){
// 						$.notify("Error:"+value,{
// 							  style: 'error',
// 							  className: 'graynotify'
// 							});
// 					}
// 					if(key 	==	"error"){
// 						$.notify("Error:"+value, {
// 							  style: 'error',
// 							  className: 'graynotify'
// 							});
// 					}
// 				});
				
// 			}
// 		}
// 	});
	
// });


$(document).on("click", "#allusersactivities", function() {
    console.log("allusersactivities clicked");
    
    if(editpermission == false && createpermission == false) {
        return false;
    }
    
    var propcheck = $(this).is(":checked");
    console.log("propcheck: " + propcheck);
    
    // Correct selector for checkboxes in new structure
    var checkboxes = $(".add-attendees input[type='checkbox'][name='activities_owner[]']");
    
    if(propcheck == true) {
        checkboxes.prop("checked", true);
    } else {
        checkboxes.prop("checked", false);
    }
    
    var id = $("#swotajaxid").val();
    if(swotupdateDescription == undefined || swotupdateDescription == "" || swotupdateDescription.id == "") {
        return false;
    }
    
    var swotObj = swotupdateDescription;
    
    
    var multiowners = $(".add-attendees input[type='checkbox'][name='activities_owner[]']:checked").map(function() {
        return this.value;
    }).get();
    
    if(multiowners.length == 0) {
        swotObj.pestelAnalysisValue.multipleOwners = currentEmp;    
    } else {
        swotObj.pestelAnalysisValue.multipleOwners = multiowners.join(',');
    }
    
    var methodType = 'put';
    
    $.ajax({
        url: "/stratroom/pestelAnalysis/",
        type: methodType,
        contentType: "application/json",
        data: JSON.stringify(swotObj),
        success: function(data, status) {
            window.location.reload();
        },
        error: function(msg, status) {
            if(!jQuery.isEmptyObject(msg.responseText)) {
                $.each(JSON.parse(msg.responseText), function(key, value) {
                    if(key == "exception" || key == "error") {
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


  // Load PESTEL content
  function loadPestelContent(pestelType, $element) {
    console.log(pestelType, $element, "Deeeeeee");
    // Update UI state
    $("#strength_section").show();
    $(".sub_initiative_sidebar_details").removeClass("activepestelwrap");
    $element.addClass("activepestelwrap");
    localStorage.setItem("pestelcall_list", pestelType);

    // Only clear and reload if content isn't already loaded
    if (!$element.data('loaded') || $element.data('loadedType') !== pestelType) {
      getPestelList(pestelType);
      $element.data('loaded', true).data('loadedType', pestelType);
    }else {
      getPestelList("closecaret", "pestelType");
    }
  }



$(document).on('click', '.caret', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const $caret = $(this);
    const toggleId = $caret.data('toggle-id');
    const pestelType = $caret.data('pestel-type');
    const $nestedItem = $caret.closest('.nested-item');
    const $nestedArea = $nestedItem.find('.nested-area');
    
    console.log(pestelType, toggleId, "pestelTypeout");
    
   
    $caret.toggleClass('caret-down');
    

    $nestedArea.toggleClass('active');
    
    // if ($nestedArea.hasClass('active') && !$caret.hasClass('activepestelwrap')) {
    //     $caret.addClass('activepestelwrap');
       
    // } else if (!$nestedArea.hasClass('active')) {
    //     $caret.removeClass('activepestelwrap');
    // }

     var formattedType;
        if (toggleId == "pestel-child-1") {
            formattedType = "POLITICAL";
        } else if (toggleId == "pestel-child-2") {
            formattedType = "ECONOMICAL";
        } else if (toggleId == "pestel-child-3") {
            formattedType = "SOCIAL"; 
        } else if(toggleId == "pestel-child-4"){
            formattedType = "TECHNOLOGICAL";
        }else if(toggleId == "pestel-child-5"){
            formattedType = "ENVIRONMENTAL";
        }else {
            formattedType = "LEGAL";
        }
        console.log(formattedType, "formattedType");
     loadPestelContent(formattedType, $nestedItem);
});


function deleteRowData(button) {
  console.log(button, "button");
  var row = button.closest('tr');
  var table = row.closest('table');
  var rowCount = table.rows.length;

 
  if (rowCount <= 1) {
    alert("You cannot delete the last note.");
    return;
  }

  row.remove();
}


const page_pestelanalysis_en = {
  "title": "PESTEL ANALYSIS",
  "ID": "ID",
  "type": "Type",
  "nextDue": "Next Due",
  "Department" : "Department",
  "BusinessImpact" : "Business Impact",
  "Status" : "Status",
  "Cancel": "Cancel",
  "Save": "Save",
  "Do you really want to delete" : "Do you really want to delete",
  "Delete" : "Delete",
  "Attachments": "Attachments",
  "Upload" : "Upload",
  "Action" : "Action",
  "Recommendation" : "Recommendation",
  "ByDate" : "By Date",
  "Responsible" : "Responsible"

}

const page_pestelanalysis_am = {
  "title": "የPESTEL ትንተና",
  "ID": "መለያ",
  "type": "አይነት",
  "nextDue": "ቀጣይ ጊዜ",
  "Department": "ዳርቻ / ክፍል",
  "BusinessImpact": "የንግድ ተፅዕኖ",
  "Status": "ሁኔታ",
  "Cancel": "ይቅር",
  "Save": "አስቀምጥ",
  "Do you really want to delete": "በእውነት መሰረዝ ትፈልጋለህ?",
  "Delete": "ሰርዝ",
  "Attachments": "አባሪ ፋይሎች",
  "Upload": "አስገባ",
  "Action": "እርምጃ",
  "Recommendation": "ምክር / ጥቆማ",
  "ByDate": "በቀን",
  "Responsible": "የተጠየቀ"
}


const page_pestelanalysis_ar = {
  "title": "تحليل بيستيل",
  "ID": "هوية شخصية",
  "type": "نوع",
  "nextDue": "المستحق التالي",
  "Department" : "قسم",
  "BusinessImpact" : "تأثير الأعمال",
  "Status" : "الحالة",
  "Cancel": "إلغاء",
  "Save": "حفظ",
  "Do you really want to delete" : "هل تريد حقًا الحذف",
  "Delete" : "حذف",
  "Attachments": "المرفقات",
  "Upload" : "رفع",
  "Action": "الإجراء",
  "Recommendation" : "توصية",
"ByDate": "حسب التاريخ",
"Responsible": "المسؤول"


}


//Language Wrokflow 
function getNestedValue(obj, path) {
  return path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : null, obj);
}

// Load language for all elements with data-translate
function loadLanguage(lang) {
  let translation;

  if (lang == 'ar') {
    translation = page_pestelanalysis_ar;
  } else if(lang == "am"){
    translation = page_pestelanalysis_am;
  }else {
    translation = page_pestelanalysis_en;
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