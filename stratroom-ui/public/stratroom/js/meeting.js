
var business_impact = "";
var recommandation_text = "";
var radioValue = "";
var swottype = "";
var currentEmp		=	$("#userPrincipal").val().trim();
var topparentswotDetails	=	{};
var reporteelist = [];
var kpiList	=	[];
var swotupdateDescription	=	[];
var pageNo =  $('#pagenumber').val();
var meetingmodPermission=	[];
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

function getmeetingpermission(){
	$.ajax({
		type : "GET",
		url : "/stratroom/user/modulePermissions?moduleName=Meetings",
		async:false,
		success : function(data) {
			if(data.Meetings !=	undefined && !jQuery.isEmptyObject(data.Meetings)){
				meetingmodPermission	=	data.Meetings.Meeting;
				//rec
				if(data.Meetings.Recommendations.privilegeCreate !=	undefined && data.Meetings.Recommendations.privilegeCreate == "TRUE"){	
					reccreatepermission	=	true;
				}
				if(data.Meetings.Recommendations.privilegeUpdate !=	undefined && data.Meetings.Recommendations.privilegeUpdate == "TRUE"){
					receditpermission	=	true;
				}
				if(data.Meetings.Recommendations.privilegeDelete !=	undefined && data.Meetings.Recommendations.privilegeDelete == "TRUE"){
					recdeletepermission	=	true;
				}
				if(data.Meetings.Recommendations.privilegeView !=	undefined && data.Meetings.Recommendations.privilegeView == "TRUE"){
					recviewpermission	=	true;
				}
				//action
				if(data.Meetings.Actions.privilegeCreate !=	undefined && data.Meetings.Actions.privilegeCreate == "TRUE"){	
					actioncreatepermission	=	true;
				}
				if(data.Meetings.Actions.privilegeUpdate !=	undefined && data.Meetings.Actions.privilegeUpdate == "TRUE"){
					actioneditpermission	=	true;
				}
				if(data.Meetings.Actions.privilegeDelete !=	undefined && data.Meetings.Actions.privilegeDelete == "TRUE"){
					actiondeletepermission	=	true;
				}
				if(data.Meetings.Actions.privilegeView !=	undefined && data.Meetings.Actions.privilegeView == "TRUE"){
					actionviewpermission	=	true;
				}
				
				//Attachments
				if(data.Meetings.Attachments.privilegeCreate !=	undefined && data.Meetings.Attachments.privilegeCreate == "TRUE"){	
					attcreatepermission	=	true;
				}
				if(data.Meetings.Attachments.privilegeUpdate !=	undefined && data.Meetings.Attachments.privilegeUpdate == "TRUE"){
					atteditpermission	=	true;
				}
				if(data.Meetings.Attachments.privilegeDelete !=	undefined && data.Meetings.Attachments.privilegeDelete == "TRUE"){
					attdeletepermission	=	true;
				}
				if(data.Meetings.Attachments.privilegeView !=	undefined && data.Meetings.Attachments.privilegeView == "TRUE"){
					attviewpermission	=	true;
				}
			}
		}
	});
}

$(function () {
	getmeetingpermission();
	getpageName();	
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
	
	$.each(reporteelist,function(ownkey,empvalue){
		if(empvalue.id	==	currentEmp){
			topparentswotDetails	=	{"id":empvalue.id,"name":empvalue.name,"image":empvalue.image,"dept":empvalue.dept};
		}
	});
	if(meetingmodPermission.privilegeCreate !=	undefined && meetingmodPermission.privilegeCreate == "TRUE"){	
		createpermission	=	true;
	}
	
	if(meetingmodPermission.privilegeUpdate !=	undefined && meetingmodPermission.privilegeUpdate == "TRUE"){
		editpermission	=	true;
	}
	
	if(meetingmodPermission.privilegeDelete !=	undefined && meetingmodPermission.privilegeDelete == "TRUE"){
		deletepermission	=	true;
	}
	
	if(meetingmodPermission.privilegeView !=	undefined && meetingmodPermission.privilegeView == "TRUE"){
		viewpermission	=	true;
	}
	if(enableaccesscontrolMenu	==	true){
		//createpermission	=	true;
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
	
    getPestelList();
	getreportee();
	$('[data-toggle="tooltip"]').tooltip();
});

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

// function subinitiativePorfileContent(usersimg,resultId){
// 	console.log(usersimg, resultId, "subinitiativePorfileContent");
// 	var subinitiativeUser	=	"";
// 	var returnresult	=	[];
// 	var functionParams	=	resultId+','+'"edit"';
// 	var functionName	=	"";
// 	var modalPopupName	=	"";
// 	var profileBadgeIncrement 	=	"";
// 	if(usersimg !=	undefined){
// 		profileBadgeIncrement	=	(usersimg.length >= 3?parseInt(usersimg.length)-parseInt(2):"");	
// 	}
	
// 	var userseslectedData 	=	[];
// 	$.each(usersimg,function(index,users){
// 		if(users.id != undefined && users.id != 0){
// 			userseslectedData.push(users.id);
// 		}
// 	});
	
// 	if(userseslectedData.length 	==	0){
// 		var users 	=	topparentswotDetails;
// 		userseslectedData.push(users.id);
// 	}

// 	console.log(userseslectedData, "userseslectedData");
	
// 	var htmlcontent	=	'<input type="hidden" value="'+userseslectedData.join(',')+'" id="activities_selected_user_'+resultId+'">';

// 	console.log("#activities_selected_user_"+resultId, "activities_selected_user_"+resultId);
// 	returnresult['userownerlist_data']	=	htmlcontent;
// 	functionName	=	"handleMultioownersuserevent";

// 	console.log(htmlcontent, functionName, "functionName");
	
// 	if(usersimg !=	undefined && usersimg.length 	!=	0){
// 		var badgeincrement	=	false;		
// 		$.each(usersimg,function(index,users){
// 			var username	=	hasWhiteSpaceName(users.name);
// 			if(username == "" ||	username == " "){
// 				username	=	"User";
// 			}
			
// 			var userProfileConcate = ((users.image ==	undefined || users.image == "")?'data-name="'+username+'" class="rounded-circle swotuserimage" ':' class="rounded-circle" src="'+users.image+'"');		
// 			subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" onclick='+functionName+'('+functionParams+')><img class="rounded-circle swotuserimage" '+userProfileConcate+' alt="'+username+'" width="50"></li>';
// 			if(usersimg.length >= 3 && index >= 2 && index <= 2){
// 				subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-xs pull-up" onclick='+functionName+'('+functionParams+')><img class="rounded-circle swotuserimage" '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
// 				subinitiativeUser 	+=	'<li class="avatar avatar-xs pull-up" onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
// 				badgeincrement	=	true;
// 				return false;
// 			}
// 		});
// 		if(badgeincrement	==	false){
// 			subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-xs pull-up" onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+</span></li>';
// 		}
// 	}else{
// 		var users 	=	topparentswotDetails;
// 		var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
// 		var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle swotuserimage' ":" class='rounded-circle' src='"+users.image+"'");
// 		subinitiativeUser 	=	'<li class="avatar avatar-xs pull-up" onclick='+functionName+'('+functionParams+')><img class="rounded-circle swotuserimage" '+userProfileConcate+' alt="'+username+'" width="50"></li>';
// 		subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-xs pull-up" onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+</span></li>';
// 	}
// 	returnresult['userownerlist']	=	subinitiativeUser;
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

      if (user?.image) {
        imgSrc = user?.image;
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
			url: "/stratroom/user/moduleAccessUserList?moduleName=Meetings",
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
					returnresult['userownerlist']	=	subinitiativeUser;
				}else{
					var profileBadgeIncrement 	=	(data.length >= 3?parseInt(data.length)-parseInt(2):0);
					var badgeinc	=	false;
					var subinitiativeUser	=	"";
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
			returnresult['userownerlist']	=	subinitiativeUser;
		}else{
			var profileBadgeIncrement 	=	(reporteelist.length >= 3?parseInt(reporteelist.length)-parseInt(2):0);
			var badgeinc	=	false;
			var subinitiativeUser	=	"";
			$.each(reporteelist,function(index,users){
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
			url: "/stratroom/user/moduleAccessUserList?moduleName=Meetings",
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
					returnresult['userownerlist']	=	subinitiativeUser;
				}else{
					var profileBadgeIncrement 	=	(data.length >= 3?parseInt(data.length)-parseInt(2):0);
					var badgeinc	=	false;
					var subinitiativeUser	=	"";
					$.each(data,function(index,users){
						var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
						var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
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
			returnresult['userownerlist']	=	subinitiativeUser;
		}else{
			var profileBadgeIncrement 	=	(reporteelist.length >= 3?parseInt(reporteelist.length)-parseInt(2):0);
			var badgeinc	=	false;
			var subinitiativeUser	=	"";
			$.each(reporteelist,function(index,users){
				var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
				var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
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
			returnresult['userownerlist']	=	subinitiativeUser;
		}
	}
	return returnresult;
}

function getPestelList() {
    const storedLanguage = localStorage.getItem('selectedLang') || 'en';
	loadLanguage(storedLanguage);
	var pagenourl	=	"";
	var navigateempId = $("#userPrincipalnavigate").val();
	if(pageNo	!=	undefined && pageNo	!=	""){
		pagenourl	=	"pageId="+pageNo;
	}
	
	var employeeId="";
	if(navigateempId!=null || navigateempId!=""){
		employeeId=navigateempId;
	}
	else{
		employeeId=currentEmp;
	}
	
    $.ajax({
        url: "/stratroom/meetingManagementList/"+employeeId+"?" + pagenourl+"&dateRange="+$('#datePeriod').val(),
        type: "GET",
        contentType: "application/json",
        success: function (response, status) {
			pestelListShow(response);
        },
        error:readErrorMsg
    });
}



function pestelListShow(meetingsData) {
    console.log(meetingsData, "meetingsData");
    var meetingLinkHeader = "Meeting Link";
    var copyLinkHeader = "Copy Link";
    var locationHeader = "Location";
    var statusHeader = "Status";
    var toDateTimeHeader = "To Date & Time";
    var fromDateTimeHeader = "From Date & Time";
    var atendeesHeader = "Attendees";
    var initiatedByHeader = "Initiated By";
    var editHeader = "Edit";
    var deleteHeader = "Delete";
    
    const storedLanguage = localStorage.getItem('selectedLang') || 'en';

    if (storedLanguage == "en") {
        meetingLinkHeader = "Meeting Link";
        copyLinkHeader = "Copy Link";
        locationHeader = "Location";
        statusHeader = "Status";
        toDateTimeHeader = "To Date & Time";
        fromDateTimeHeader = "From Date & Time";
        atendeesHeader = "Attendees";
        initiatedByHeader = "Initiated By";
        editHeader = "Edit";
        deleteHeader = "Delete";

    } else if (storedLanguage == "am") {
        meetingLinkHeader = "የስብሰባ አገናኝ";
        copyLinkHeader = "አገናኝ ቅዳ";
        locationHeader = "ቦታ";
        statusHeader = "ሁኔታ";
        toDateTimeHeader = "እስከ ቀን እና ሰዓት";
        fromDateTimeHeader = "ከ ቀን እና ሰዓት";
        atendeesHeader = "ተሳታፊዎች";
        initiatedByHeader = "የጀመረው";
        editHeader = "አርትዕ";
        deleteHeader = "ሰርዝ";

    } else {
        meetingLinkHeader = "رابط الاجتماع";
        copyLinkHeader = "نسخ الرابط";
        locationHeader = "الموقع";
        statusHeader = "الحالة";
        toDateTimeHeader = "إلى التاريخ والوقت";
        fromDateTimeHeader = "من التاريخ والوقت";
        atendeesHeader = "الحضور";
        initiatedByHeader = "بدأ بواسطة";
        editHeader = "تعديل";
        deleteHeader = "حذف";
    }

    
    
    var meetingListContainer = document.querySelector('.meetingList');
    
  
    meetingListContainer.innerHTML = '';
    

    meetingsData.forEach(function(meeting) {
       
		$.each(reporteelist,function(ownkey,empvalue){
				if(empvalue.id	==	meeting.createdBy){
					topparentswotDetails	=	{"id":empvalue.id,"name":empvalue.name,"image":empvalue.image,"dept":empvalue.dept};
				}
	    });


		var users		=	topparentswotDetails;
		var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
		var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle swotuserimage' ":" class='rounded-circle' src='"+users.image+"'");

		function getInitials(name) {
			var n = (name || "U").trim();
			if (n.indexOf(" ") !== -1) {
				var parts = n.split(" ");
				var initials = "";
				for (var i = 0; i < parts.length && i < 2; i++) {
				if (parts[i].charAt(0)) {
					initials += parts[i].charAt(0).toUpperCase();
				}
				}
				return initials.substring(0, 2);
			} else {
				return n.substring(0, 2).toUpperCase();
			}
		}

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
			var index = Math.abs(hash) % colors.length;
			return colors[index];
		}
		function createSvgDataUrl(name) {
			var initials = getInitials(name);
			var bgColor = getColor(name);
			var width = 55;
			var height = 55;

			var svg = '<svg xmlns="http://www.w3.org/2000/svg" pointer-events="none" width="' + width + '" height="' + height + '" style="background-color:' + bgColor + ';width:' + width + 'px;height:' + height + 'px;border-radius:50%;">';
			svg += '<text text-anchor="middle" y="50%" x="50%" dy="0.35em" pointer-events="auto" fill="#ffffff" font-family="HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif" style="font-weight:400;font-size:20px;">';
			svg += initials;
			svg += '</text></svg>';

			return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
		}

		var imgSrc;
		var dataNameAttr = 'data-name="' + username + '" ';

		if (users?.image && users?.image !== "") {
			imgSrc = users?.image;
			dataNameAttr = ""; 
			} else {
			imgSrc = createSvgDataUrl(username);
			dataNameAttr = 'data-name="' + username + '" '; 
		}
		// var initiatedby =	'<li class="avatar avatar-xs pull-up"><img class="rounded-circle swotuserimage" '+userProfileConcate+' alt="'+username+'" width="55"></li>';
        var initiatedby = '<li class="avatar avatar-xs pull-up">' +
		'<img class="rounded-circle swotuserimage" ' +
		dataNameAttr +
		'src="' + imgSrc + '" ' +
		'alt="' + username + '" width="55">' +
		'</li>';
		var initiatedByHtml =
		'<div class="form-group">' +
			'<label class="form-label">'+initiatedByHeader+'</label>' +
			'<ul class="list-unstyled d-inline-flex align-items-center avatar-group mb-0">' +
			initiatedby +
			'</ul>' +
		'</div>';
		var resultPorfileContent	=	subinitiativePorfileContent(meeting.multipleOwerlist, meeting.id);

		var enableOwnerBtn	=	"";

		if(editpermission	==	true || createpermission	==	true || deletepermission	==	true || meetingsloadcontent	==	true){
	        	enableOwnerBtn	=	`data-toggle="modal" data-target=".swot_add_multiuser_popup" id="initiativeactivitieUser_`+meeting.id+`" style="cursor: pointer;"`;	
	    }

		console.log(users, initiatedby, "initiatedby");
		
        var statusClass, statusLabelClass;
        switch(meeting.meetingManagementValue.status) {
            case 'Scheduled':
                statusClass = 'status-bg-blue';
                statusLabelClass = 'label-bg-blue';
                break;
            case 'Rescheduled':
                statusClass = 'status-bg-orange';
                statusLabelClass = 'label-bg-orange';
                break;
            case 'Ongoing':
                statusClass = 'status-bg-green';
                statusLabelClass = 'label-bg-green';
                break;
            case 'Completed':
                statusClass = 'status-bg-gray';
                statusLabelClass = 'label-bg-gray';
                break;
            case 'Cancelled':
                statusClass = 'status-bg-red';
                statusLabelClass = 'label-bg-red';
                break;
            default:
                statusClass = 'status-bg-blue';
                statusLabelClass = 'label-bg-blue';
        }
        
        // Format date and time
        var fromDate = new Date(meeting.meetingManagementValue.fromdate);
        var toDate = new Date(meeting.meetingManagementValue.enddate);
        
        var formattedFromDate = fromDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        }) + ' ' + (meeting.meetingManagementValue.fromtime || '12:00:00 AM');
        
        var formattedToDate = toDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        }) + ' ' + (meeting.meetingManagementValue.endtime || '12:00:00 AM');
        
        
        var attendeesHTML = '';
        meeting.multipleOwerlist.forEach(function(owner, index) {
            if (index < 2) { 
                attendeesHTML += 
                    '<li class="avatar avatar-xs pull-up" title="' + owner.name + '">' +
                        '<img src="/stratroom/images/user/usrbig6.jpg" class="rounded-circle" width="24" height="24">' +
                    '</li>';
            }
        });
        
       
        if (meeting.multipleOwerlist.length > 2) {
            var moreCount = meeting.multipleOwerlist.length - 2;
            attendeesHTML += 
                '<li class="avatar avatar-xs pull-up" href="#attendess-list" data-bs-toggle="modal">' +
                    '<span class="avatar-initial rounded-circle" data-bs-toggle="tooltip" data-bs-placement="top"' +
                    'data-bs-original-title="' + moreCount + ' more">+' + moreCount + '</span>' +
                '</li>';
        }
        
       
        var meetingCardHTML = 
            '<div class="card meeting-card">' +
                '<div class="card-header flex-wrap flex-sm-nowrap">' +
                    '<div class="c-header-left">' +
                        '<span style="font-size: 12px" class="meeting-label badge ' + statusClass + '">' + meeting.meetingManagementValue.name + '</span>' +
                    '</div>' +
                    '<div class="meeting-action">' +
                        '<ul class="list-unstyled action-list mb-0">' +
                            '<li>' +
                                '<a href="#notes-modal" data-toggle="modal" data-target="#recommendation" contenteditable="false" style="cursor: pointer;" onclick="handlerecommendationevent(' + meeting.id + ',\'recommendation\')">' +
                                    '<span class="icon" data-toggle="tooltip" data-placement="bottom" data-title="Notes">' +
                                        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="notebook-pen" style="width: 12px; height: 12px;" class="lucide lucide-notebook-pen"><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"></path><path d="M2 6h4"></path><path d="M2 10h4"></path><path d="M2 14h4"></path><path d="M2 18h4"></path><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"></path></svg>' +
                                    '</span>' +
                                '</a>' +
                            '</li>' +
                            '<li>' +
                                '<a href="#" data-toggle="modal" contenteditable="false" style="cursor: pointer;" data-target="#action" onclick="handleactionevent(' + meeting.id + ',\'recommendation\')">' +
                                    '<span class="icon" data-toggle="tooltip" data-placement="bottom" data-title="Action">' +
                                        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="settings" style="width: 12px; height: 12px;" class="lucide lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg>' +
                                    '</span>' +
                                '</a>' +
                            '</li>' +
                            '<li>' +
                                '<a href="#" data-toggle="modal" contenteditable="false" style="cursor: pointer;" data-target="#uploaded_files" onclick="handleUploadShow(' + meeting.id +')">' +
                                    '<span class="icon" data-toggle="tooltip" data-placement="bottom" data-title="Attchment">' +
                                        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="paperclip" style="width: 12px; height: 12px;" class="lucide lucide-paperclip"><path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"></path></svg>' +
                                    '</span>' +
                                '</a>' +
                            '</li>' +
                            '<li class="dropdown">' +
                                '<a class="" type="button" data-bs-toggle="dropdown" aria-expanded="true"' +
                                    'contenteditable="false" style="cursor: pointer;">' +
                                    '<span class="icon">' +
                                        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="ellipsis-vertical" style="width: 12px; height: 12px;" class="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>' +
                                    '</span>' +
                                '</a>' +
                                '<ul class="dropdown-menu dropdown-menu-end border-0 shadow">' +
                                    '<li>' +
                                        '<a class="dropdown-item" href="javascript:void(0)" data-bs-target="#create_meeting" data-bs-toggle="modal" onclick="handleswotevent(' + meeting.id + ',\'edit\')" style="cursor: pointer;" >'+editHeader+'</a>' +
                                    '</li>' +
                                    '<li>' +
                                        '<a class="dropdown-item" href="javascript:void(0)" onclick="handleswotevent(' + meeting.id + ',\'delete\')" style="cursor: pointer;">'+deleteHeader+'</a>' +
                                    '</li>' +
                                '</ul>' +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
                '<div class="card-body meeting-details d-flex flex-column">' +
                    '<div class="form-group">' +
                        '<label class="form-label" data-translate="page.meetings.createMeetingItems.meeting_link">'+meetingLinkHeader+'</label>' +
                       '<div class="d-flex justify-content-between gap-2">' +
							'<p class="form-control-plaintext text-truncate">' +
								meeting.meetingManagementValue.meetLink +
							'</p>' +
							'<button ' +
								'class="btn btn-sm btn-label-secondary rounded-pill text-nowrap" ' +
                                'data-translate="page.meetings.meetingsListItems.copy_link" ' +
								'onclick="copyToClipboard(\'' + meeting.meetingManagementValue.meetLink + '\')">' +
								'<i class="fas fa-link"></i> '+copyLinkHeader+'' +
							'</button>' +
						'</div>' +
                    '</div>' +
                    '<div class="d-flex justify-content-between">' +
                        '<div class="form-group">' +
                            '<label class="form-label" data-translate="page.meetings.meetingsListItems.status">'+statusHeader+'</label>' +
                            '<div class="d-flex flex-wrap gap-1">' +
                                '<span class="badge ' + statusLabelClass + ' rounded-pill">' + meeting.meetingManagementValue.status + '</span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="form-group text-end">' +
                            '<label class="form-label" data-translate="page.meetings.meetingsListItems.location">'+locationHeader+'</label>' +
                            '<p class="form-control-plaintext">' + (meeting.meetingManagementValue.location || 'N/A') + '</p>' +
                        '</div>' +
                    '</div>' +
                    '<div class="d-flex justify-content-between">' +
                        '<div class="form-group">' +
                            '<label class="form-label" data-translate="page.meetings.createMeetingItems.from_date_time">'+fromDateTimeHeader+'</label>' +
                            '<p class="form-control-plaintext">' + (meeting.meetingManagementValue.fromtime || "") + '</p>' +
                        '</div>' +
                        '<div class="form-group text-end">' +
                            '<label class="form-label" data-translate="page.meetings.createMeetingItems.to_date_time">'+toDateTimeHeader+'</label>' +
                            '<p class="form-control-plaintext">' + (meeting.meetingManagementValue.endtime || "") + '</p>' +
                        '</div>' +
                    '</div>' +
                    '<div class="d-flex justify-content-between">' +
                        initiatedByHtml +
                        '<div class="form-group text-end">' +
                            '<label class="form-label">'+atendeesHeader+'</label>' +
							'<ul class="list-unstyled d-inline-flex align-items-center avatar-group mb-0" ' + enableOwnerBtn + '>' +
								resultPorfileContent['userownerlist'] +
							'</ul>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
        
        // Append the meeting card to the container
        meetingListContainer.insertAdjacentHTML('beforeend', meetingCardHTML);
    });
    
    // Initialize tooltips (if using Bootstrap)
    if (typeof bootstrap !== 'undefined') {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
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
function recommendationaddpeople(id){
	console.log(id, "recommendationaddpeople");
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

// function actionsaddpeople(id){
// 	$("#actionsresponsibleid").val(id);
// 	var id	=	$("#action_multiownerid_"+id).val();
// 	if(id	==	""){
// 		id	=	currentEmp;
// 	}
// 	id		=	id.split(",");
// 	getreporteeeListAction(id,".actionslistusers");
// 	$('.swotrecmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
// 	$('#addpeopleactions .sub-ini-box').slimscroll({
// 		height: '450px',
// 		size: '3px',
// 		color: '#9c9c9c'
// 	});
// }


function actionsaddpeople(id) {
  $("#actionsresponsibleid").val(id);
  var id = $("#action_multiownerid_" + id).val();
  if (id == "") {
    id = currentEmp;
  }
  id = id.split(",");
  getreporteeeListAction(id, ".actionslistusers");
  $(".swotrecmultiuserimage").initial({
    charCount: 2,
    height: 30,
    width: 30,
    fontSize: 18,
  });
  $("#addpeopleactions .sub-ini-box").slimscroll({
    height: "450px",
    size: "3px",
    color: "#9c9c9c",
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
        url: "/stratroom/meetingManagement/" + id,
        contentType: "application/json",
        success: function (data, status) {
            multipleOwnerslist = data.meetingManagementValue.multipleOwners
            getreporteeeList(multipleOwnerslist.split(","),".listusers");
        }
    });
}

function getreportee() {
	
	if (jQuery.isEmptyObject(reporteelist)) {
		$.ajax({
			url: "/stratroom/user/moduleAccessUserList?moduleName=Meetings",
			async:false,
			success : function(employeeList) {
				reporteelist = employeeList;
				notreporteelist	=	employeeList;
			}
		});
	} 
}

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

// function getreporteeeListAction(id,listtype) {
// 	console.log(id, listtype, "getreporteeeListAction");
//     $(listtype).empty();
//     var methodType = 'get';
//     var listusers = "";

//     $.ajax({
//         url: "/stratroom/user/moduleAccessUserList?moduleName=Meetings",
//         contentType: "application/json",
//         success: function (data, status) {
//             $.each(data, function (i, List) {
//                 var status = ""
//                 	var image = "";	
//                 if (!List.image == undefined || !List.image == "" || !List.image == undefined) {
//                     image = List.image;
//                 }
//                 if (id) {
//                     $.each(id, function (i, item) {
//                         if (List.id == item) {
//                             status = "checked"
//                         }
//                     });
//                     if(data.length	==	0){
// 						$(".showalluseractions").css('display','none');
// 					}
					
// 					if(data.length	==	id.length){
// 						$("#allusersactions").prop("checked","checked");
// 					}else{
// 						$("#allusersactions").prop("checked",false);
// 					}
//                     var sts = ""
//                     if (status == "checked") {
//                         sts = "checked"
//                     } else {
//                         sts = "unchecked"
//                     }
//                     listusers = '<tr>'
//                         + '<td><input type="checkbox" name="chk" id="' + List.id + '" ' + sts + '/></td>'
//                         + '<td><span >' + List.name + '</span></td>'
//                         + '<td><span ><img src="' + image + '" /></span></td>'
//                         + '</tr>';
// 					var username 	=	((List.name ==	undefined || List.name == "")?"User":List.name);
// 					var userProfileConcate 	= 	((image ==	undefined || image == "")?"data-name='"+username+"' class='rounded-circle swotrecmultiuserimage' ":" class='rounded-circle' src='"+image+"'");
// 					var subinitiativeUser 	=	'<div class="d-flex flex-row employe_content_border sub_initiative_details"><div class="d-flex flex-column flex-fill profile_content"><div class="d-flex flex-row"><div class="form-check"><label class="form-check-label"><input id="" class="form-check-input" name="swot_action_owner[]" '+sts+' type="checkbox" value="'+List.id+'"><span class="form-check-sign"> <span class="check"></span></span></label></div><div class="d-flex flex-column init_flex_profile" style="margin-top: 3%;text-align: center;"><h5>'+username+'</h5></div><div class="img_details" style="width: 20%;"><img alt="'+username+'" '+userProfileConcate+'></div></div></div></div>';
//                     $(listtype).append(subinitiativeUser);
//                     $('.swotrecmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
//                 } else {
//                     listusers = '<tr>'
//                         + '<td><input type="checkbox" name="chk" id="' + List.id + '"/></td>'
//                         + '<td><span >' + List.name + '</span></td>'
//                         + '<td><span ><img src="' + image + '" /></span></td>'
//                         + '</tr>';
// 					var username 	=	((List.name ==	undefined || List.name == "")?"User":List.name);
// 					var userProfileConcate 	= 	((image ==	undefined || image == "")?"data-name='"+username+"' class='rounded-circle swotrecmultiuserimage' ":" class='rounded-circle' src='"+image+"'");
// 					var subinitiativeUser 	=	'<div class="d-flex flex-row employe_content_border sub_initiative_details"><div class="d-flex flex-column flex-fill profile_content"><div class="d-flex flex-row"><div class="form-check"><label class="form-check-label"><input id="" class="form-check-input" name="swot_action_owner[]" '+sts+' type="checkbox" value="'+List.id+'"><span class="form-check-sign"> <span class="check"></span></span></label></div><div class="d-flex flex-column init_flex_profile" style="margin-top: 3%;text-align: center;"><h5>'+username+'</h5></div><div class="img_details" style="width: 20%;"><img alt="'+username+'" '+userProfileConcate+'></div></div></div></div>';
//                     $(listtype).append(subinitiativeUser);
//                     $('.swotrecmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
//                     //$(listtype).append(listusers);
//                 }

//             });
//         }
//     });
// }


// function getreporteeeListAction(id, listtype) {
//   console.log(id, listtype, "idandlistType");
//   $(listtype).empty();

//   $.ajax({
//     url: "/stratroom/user/moduleAccessUserList?moduleName=Meetings",
//     contentType: "application/json",
//     success: function (data, status) {
//       var allChecked = true;

//       $.each(data, function (i, List) {
//         var userId = List.id;
//         var userName = List.name || "User";
//         var userImage = List.image;
//         var isChecked = "";

        
//         if (id && Array.isArray(id)) {
//           if (id.includes(userId)) {
//             isChecked = "checked";
//           } else {
//             allChecked = false;
//           }
//         } else {
//           allChecked = false;
//         }

//         // Generate checkbox ID safely
//         var checkboxId = "attendee_" + userId;

//         // Build image or fallback
//         var imageHtml = "";
//         if (userImage) {
//           imageHtml = '<img src="' + userImage + '" alt="' + userName + '" width="18" height="18">';
//         } else {
//           // Fallback: Use initials (will be styled by .initial())
//           imageHtml = '<span class="avatar-initial rounded-circle swotrecmultiuserimage" data-name="' + userName + '"></span>';
//         }

//         // Build the new-design list item
//         var attendeeItem = '';
//         attendeeItem += '<div class="list-group-item attendee">';
//         attendeeItem += '  <div class="form-check cusom-check form-check-reverse">';
//         attendeeItem += '    <input class="form-check-input" type="checkbox" name="swot_action_owner[]" value="' + userId + '" id="' + checkboxId + '" ' + isChecked + '>';
//         attendeeItem += '    <label class="form-check-label" for="' + checkboxId + '">';
//         attendeeItem += '      <span class="image">' + imageHtml + '</span>';
//         attendeeItem += '      <span class="name">' + userName + '</span>';
//         attendeeItem += '    </label>';
//         attendeeItem += '  </div>';
//         attendeeItem += '</div>';

//         // Append to target container
//         $(listtype).append(attendeeItem);
//       });

//       // Handle "Select All" checkbox
//       if (data.length === 0) {
//         $(".showalluseractions").css("display", "none");
//       } else {
//         $(".showalluseractions").css("display", "block");
//         if (allChecked && data.length > 0) {
//           $("#allusersactions").prop("checked", true);
//         } else {
//           $("#allusersactions").prop("checked", false);
//         }
//       }

//       // Apply initials plugin to fallback avatars
//       $(".swotrecmultiuserimage").initial({
//         charCount: 2,
//         height: 30,
//         width: 30,
//         fontSize: 18
//       });
//     },
//     error: function () {
//       console.error("Failed to load user list.");
//     }
//   });
// }

function getreporteeeListAction(id, listtype) {
  console.log(id, listtype, "idandlistType");
  $(listtype).empty();

  $.ajax({
    url: "/stratroom/user/moduleAccessUserList?moduleName=Meetings",
    contentType: "application/json",
    success: function (data, status) {
      var allChecked = true;
      $(listtype).empty();

      $.each(data, function (i, List) {
        var userId = List.id;
        var userName = (List.name && List.name.trim() !== "") ? List.name : "User";
        var userImage = List.image || "";
        var isChecked = "";

        if (id && Array.isArray(id)) {
          if (id.includes(userId)) {
            isChecked = "checked";
          } else {
            allChecked = false;
          }
        } else {
          allChecked = false;
        }

        var checkboxId = "attendee_" + userId;

        // ✅ Generate initials + random background if no image
        var initials = userName.substring(0, 2).toUpperCase();
        var bgColor = getRandomColor();

        var imageHtml = "";
        if (userImage && userImage != "") {
          imageHtml = `<img src="${userImage}" alt="${userName}" width="18" height="18" class="rounded-circle">`;
        } else {
          var svgImage = generateInitialSVG(initials, bgColor);
          imageHtml = `<img data-name="${userName}" alt="${userName}" width="18" height="18" class="rounded-circle" src="${svgImage}">`;
        }

        // ✅ Build attendee item (new modal layout)
        var attendeeItem = `
          <div class="list-group-item attendee">
            <div class="form-check cusom-check form-check-reverse">
              <input class="form-check-input" type="checkbox" name="swot_action_owner[]" value="${userId}" id="${checkboxId}" ${isChecked}>
              <label class="form-check-label" for="${checkboxId}">
                <span class="image">${imageHtml}</span>
                <span class="name">${userName}</span>
              </label>
            </div>
          </div>
        `;

        $(listtype).append(attendeeItem);
      });

      // ✅ Handle "Select All" checkbox visibility
      if (data.length === 0) {
        $(".showalluseractions").css("display", "none");
      } else {
        $(".showalluseractions").css("display", "block");
        if (allChecked && data.length > 0) {
          $("#allusersactions").prop("checked", true);
        } else {
          $("#allusersactions").prop("checked", false);
        }
      }
    },
    error: function () {
      console.error("Failed to load user list.");
    }
  });
}

// ✅ Random pastel colors for SVG avatars
function getRandomColor() {
  const colors = [
    "#E57373", "#64B5F6", "#81C784", "#FFD54F",
    "#BA68C8", "#4DB6AC", "#F06292", "#9575CD",
    "#4FC3F7", "#AED581", "#FF8A65", "#7986CB"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// ✅ Generate SVG avatar with initials
function generateInitialSVG(initials, bgColor) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" style="background-color:${bgColor};border-radius:50%;">
      <text x="50%" y="55%" font-size="12" fill="#ffffff" text-anchor="middle" font-family="Arial" dy=".3em">${initials}</text>
    </svg>`;
  return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
}

// function getreporteeeList(id,listtype) {
// 	console.log(id, listtype, "getreporteeeList");
//     $(listtype).empty();
//     var methodType = 'get';
//     var listusers = "";
    
//     $.ajax({
//         url: "/stratroom/user/moduleAccessUserList?moduleName=Meetings",
//         contentType: "application/json",
//         success: function (data, status) {
//             $.each(data, function (i, List) {
//                 console.log(List, "ListData");
//                 var status = ""
//                 var image = "";	
//                 if (!List.image == undefined || !List.image == "" || !List.image == undefined) {
//                     image = List.image;
//                 }
//                 if (id) {
//                     $.each(id, function (i, item) {
//                         if (List.id == item) {
//                             status = "checked"
//                         }
//                     });
//                     if(data.length	==	0){
// 						$(".showallusericon").css('display','none');
// 					}
					
// 					if(data.length	==	id.length){
// 						$("#allusersaccess").prop("checked","checked");
// 					}else{
// 						$("#allusersaccess").prop("checked",false);
// 					}
//                     var sts = ""
//                     if (status == "checked") {
//                         sts = "checked"
//                     } else {
//                         sts = "unchecked"
//                     }
//                     listusers = '<tr>'
//                         + '<td><input type="checkbox" name="chk" id="' + List.id + '" ' + sts + '/></td>'
//                         + '<td><span >' + List.name + '</span></td>'
//                         + '<td><span ><img src="' + image + '" /></span></td>'
//                         + '</tr>';
					
// 					var userProfileConcate 	= 	((image ==	undefined || image == "")?"data-name='"+username+"' class='rounded-circle swotrecmultiuserimage' ":" class='rounded-circle' src='"+image+"'");
// 					// var subinitiativeUser 	=	'<div class="d-flex flex-row employe_content_border sub_initiative_details"><div class="d-flex flex-column flex-fill profile_content"><div class="d-flex flex-row"><div class="form-check"><label class="form-check-label"><input id="" class="form-check-input" name="swot_rec_owner[]" '+sts+' type="checkbox" value="'+List.id+'"><span class="form-check-sign"> <span class="check"></span></span></label></div><div class="d-flex flex-column init_flex_profile" style="margin-top: 3%;text-align: center;"><h5>'+username+'</h5></div><div class="img_details" style="width: 20%;"><img alt="'+username+'" '+userProfileConcate+'></div></div></div></div>';
// 					var subinitiativeUser = '';
					

// 					var listusername = ((List.name == undefined || List.name == "") ? "User" : List.name);

// 					subinitiativeUser += '<div class="list-group-item attendee">';
// 					subinitiativeUser += '  <div class="form-check cusom-check form-check-reverse">';
// 					subinitiativeUser += '    <input class="form-check-input" type="checkbox" name="attendees" id="attendees' + List.id + '" ' + sts + ' value="' + List.id + '">';
// 					subinitiativeUser += '    <label class="form-check-label" for="attendees' + List.id + '">';
// 					subinitiativeUser += '      <span class="image">';
//                     if(List.image && List.image != "") {
//                         subinitiativeUser += '        <img src="' + List.image + '" alt="' + userAlt + '" width="18" height="18" class="rounded-circle">';
//                     } else {
//                         subinitiativeUser += '        <img data-name="' + listusername + '" width="18" height="18" class="rounded-circle swotmultiuserimage">';
//                     }
// 					subinitiativeUser += '      </span>';
// 					subinitiativeUser += '      <span class="name">' + listusername + '</span>';
// 					subinitiativeUser += '    </label>';
// 					subinitiativeUser += '  </div>';
// 					subinitiativeUser += '</div>';

//                     // Append to container
//                     document.querySelector('.add-attendeesnotes').innerHTML += subinitiativeUser;
//                     // $(listtype).append(subinitiativeUser);
//                     $('.swotrecmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
//                 } else {
//                     listusers = '<tr>'
//                         + '<td><input type="checkbox" name="chk" id="' + List.id + '"/></td>'
//                         + '<td><span >' + List.name + '</span></td>'
//                         + '<td><span ><img src="' + image + '" /></span></td>'
//                         + '</tr>';
// 					var username 	=	((List.name ==	undefined || List.name == "")?"User":List.name);
// 					var userProfileConcate 	= 	((image ==	undefined || image == "")?"data-name='"+username+"' class='rounded-circle swotrecmultiuserimage' ":" class='rounded-circle' src='"+image+"'");
// 					var subinitiativeUser 	=	'<div class="d-flex flex-row employe_content_border sub_initiative_details"><div class="d-flex flex-column flex-fill profile_content"><div class="d-flex flex-row"><div class="form-check"><label class="form-check-label"><input id="" class="form-check-input" name="swot_rec_owner[]" '+sts+' type="checkbox" value="'+List.id+'"><span class="form-check-sign"> <span class="check"></span></span></label></div><div class="d-flex flex-column init_flex_profile" style="margin-top: 3%;text-align: center;"><h5>'+username+'</h5></div><div class="img_details" style="width: 20%;"><img alt="'+username+'" '+userProfileConcate+'></div></div></div></div>';
//                     $(listtype).append(subinitiativeUser);
//                     $('.swotrecmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
//                 }

//             });
//         }
//     });
// }



function getreporteeeList(id, listtype) {
    console.log(id, listtype, "getreporteeeList");
    $(listtype).empty();

    $.ajax({
        url: "/stratroom/user/moduleAccessUserList?moduleName=Meetings",
        contentType: "application/json",
        success: function (data, status) {
            $(".add-attendeesnotes").empty();

            $.each(data, function (i, List) {
                console.log(List, "ListData");
                var status = "";
                var image = List.image || "";
                var listusername = (List.name && List.name.trim() !== "") ? List.name : "User";

                // ✅ Check if user ID is already selected
                if (id) {
                    $.each(id, function (i, item) {
                        if (List.id == item) {
                            status = "checked";
                        }
                    });

                    if (data.length == 0) {
                        $(".showallusericon").css('display', 'none');
                    }

                    if (data.length == id.length) {
                        $("#allusersaccess").prop("checked", "checked");
                    } else {
                        $("#allusersaccess").prop("checked", false);
                    }
                }

                // ✅ Determine checkbox state
                var sts = (status == "checked") ? "checked" : "";

                // ✅ Generate initials and random color if no image
                var initials = listusername.substring(0, 2).toUpperCase();
                var bgColor = getRandomColor();

                var imgHtml = "";
                if (image && image != "") {
                    imgHtml = `<img src="${image}" alt="${listusername}" width="18" height="18" class="rounded-circle">`;
                } else {
                    // Create initials-based SVG image
                    var svgImage = generateInitialSVG(initials, bgColor);
                    imgHtml = `<img data-name="${listusername}" alt="${listusername}" width="18" height="18" class="rounded-circle" src="${svgImage}">`;
                }

                // ✅ Build attendee element
                var subinitiativeUser = `
                    <div class="list-group-item attendee">
                        <div class="form-check cusom-check form-check-reverse">
                            <input class="form-check-input" type="checkbox" name="attendees" id="attendees${List.id}" ${sts} value="${List.id}">
                            <label class="form-check-label" for="attendees${List.id}">
                                <span class="image">${imgHtml}</span>
                                <span class="name">${listusername}</span>
                            </label>
                        </div>
                    </div>
                `;

                document.querySelector('.add-attendeesnotes').innerHTML += subinitiativeUser;
            });
        }
    });
}

// ✅ Helper function: Generate random pastel color
function getRandomColor() {
    const colors = [
        "#E57373", "#64B5F6", "#81C784", "#FFD54F",
        "#BA68C8", "#4DB6AC", "#F06292", "#9575CD",
        "#4FC3F7", "#AED581", "#FF8A65", "#7986CB"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ✅ Helper function: Create base64 SVG avatar with initials
function generateInitialSVG(initials, bgColor) {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" style="background-color:${bgColor};border-radius:50%;">
            <text x="50%" y="55%" font-size="12" fill="#ffffff" text-anchor="middle" font-family="Arial" dy=".3em">${initials}</text>
        </svg>`;
    return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
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
//     console.log(tableID, "notes");
//     var table = document.getElementById(tableID);
//     var users = topparentswotDetails;
//     var rowCount = table.rows.length;
//     var row = table.insertRow(rowCount);
//     rowCount = parseInt(rowCount) - 1;
    
//     var username = ((users.name == undefined || users.name == "") ? "User" : users.name);
//     var userProfileConcate = ((users.image == undefined || users.image == "") ? 
//         "data-name='" + username + "' class='rounded-circle rec_res_multiuserimage'" : 
//         "src='" + users.image + "' class='rounded-circle'");
    
//     var subinitiativeUser = '<li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip" data-bs-placement="top" title="' + username + '"><img ' + userProfileConcate + ' alt="' + username + '" width="24" height="24"></li>';

   
//     var cell1 = row.insertCell(0);
//     var cell2 = row.insertCell(1);
//     var cell3 = row.insertCell(2);

    
//     cell1.innerHTML = '<div class="form-group">' +
//         '<textarea class="form-control recommendation" placeholder="Notes" rows="3" name="recommendation[]"></textarea>' +
//         '</div>';

    
//     cell2.innerHTML = '<div class="d-flex align-items-start justify-content-center">' +
//         '<input type="hidden" class="rec_multiownerid" id="rec_multiownerid_' + rowCount + '" name="multiowners[]" value="' + users.id + '">' +
//         '<ul class="list-unstyled d-inline-flex align-items-center avatar-group mb-0" id="recommendationMultiowner_' + rowCount + '">' +
//         subinitiativeUser +
//         '<li class="avatar avatar-xs pull-up" href="#attendess-list" data-bs-toggle="modal" data-bs-target="#addpeople">' +
//         '<span class="avatar-initial rounded-circle" data-bs-toggle="tooltip" data-bs-placement="top" title="Add people" onclick="recommendationaddpeople(' + rowCount + ')">+</span>' +
//         '</li>' +
//         '</ul>' +
//         '</div>';

//     if(deletepermission == true) {
//         cell3.innerHTML = '<div class="table-actions justify-content-center">' +
//             '<a class="btn btn-sm btn-icon remove-notes" style="cursor: pointer;">' +
//             '<span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Delete">' +
//             '<img src="/stratroom/images/delete-i.svg" width="12" height="12" />' +
//             '</span>' +
//             '</a>' +
//             '</div>';
//         $(row).addClass("notes_clone");
//     } else {
//         cell3.innerHTML = '<div class="table-actions justify-content-center"></div>';
//     }

   
//     $(cell1).addClass('align-middle');
//     $(cell2).addClass('align-middle');
//     $(cell3).addClass('text-end align-middle');

//     if($('#recommendation').is(':visible')) {
//         $("#recommendationtype").val('create');
//     }
//     if($('#action').is(':visible')) {
//         $("#actiontype").val('create');
//     }

   
//     $('.rec_res_multiuserimage').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
//     $('[data-bs-toggle="tooltip"]').tooltip();
    
    
//     $(row).find('.remove-notes').click(function() {
//         $(row).remove();
//     });
// }


function notes(tableID) {
  console.log(tableID, "tableId");

  var table = document.getElementById(tableID);
  var users = topparentswotDetails;
  var rowCount = table.rows.length;

  console.log(rowCount, "rowCount");
  console.log(users, "users");
  var row = table.insertRow(rowCount);

 
  var rowIndex = rowCount - 1;

  console.log(rowIndex, row, table, "rowIndex");

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
    deleteIcon = '<i class="fas fa-trash remove-notes" style="cursor: pointer;" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" onclick="deleteRowData(this)"></i>';
  }

  cell3.innerHTML =
    '<div class="table-actions justify-content-center">' +
    '  <a class="btn btn-sm btn-icon" onclick="notes(\'note_table\')" data-bs-toggle="tooltip" data-bs-placement="bottom" >' +
    '    <span class="icon">' +
    '      <i class="fas fa-plus title_edit_icon"></i>' +
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
		if(swotObj.meetingManagementValue.recommendation !=	undefined){
			swotObj.meetingManagementValue.recommendation	=	recommendation;
		}else{
			swotObj.meetingManagementValue.recommendation	=	recommendation;
		}
		swotupdateDescription.meetingManagementValue.newMultipleOwners = "";
		for(var i=0;i<swotObj.meetingManagementValue.actions.length;i++){
			swotupdateDescription.meetingManagementValue.actions[i].newMultipleOwners = "";
		}
	    $.ajax({
	        url: "/stratroom/meetingManagement",
	        type: "put",
	        contentType: "application/json",
	        data: JSON.stringify(swotObj),
	        success: function (data, status) {
	        	getNotification();
	        	localStorage.setItem("meetingclosed","");
	        	var meetingreadornot	=	localStorage.getItem("meetingclosed");
	        	if(meetingreadornot !=	"" && meetingreadornot ==	"closed"){
	        		
	        	}else{
	        		setTimeout(callnotificationinterval,10000);
	        	}
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
					action	=	"Meeting Recommendation Created";
				}else if(type	==	"update"){
					action	=	"Meeting Recommendation Modified";
				}else if(type	==	"delete"){
					action	=	"Meeting Recommendation Deleted";
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

function actionssubmit(){
		var recommendation	=	[];
		var idindex	=	0;
		var actlastlength =$("#actioncount").val();
		var actnewlength =$('.pestelactions').length;
		var diff ="";
		var check="";
		console.log(actnewlength);
		console.log(actlastlength);
		if(actnewlength>actlastlength){
		 diff=actnewlength-actlastlength;
		 check=actnewlength-diff;
		}
		$('.pestelactions').each(function(val,index){
			var name		=	$(this).val();
			var multiowner	=	$(this).closest("tr").find('.action_multiownerid').val();
			var bydate		=	$(this).closest("tr").find('.bydate').val();
            var taskId		=	$(this).closest("tr").find('.taskId').val();
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
			recommendation.push({"id":idindex,"name":name,"multipleOwners":multiowner,"newMultipleOwners":newowners,"bydate":bydate,"status":status, "taskId":taskId ? taskId : null});
			idindex++;
		});
		var swotObj 	= 	swotupdateDescription;
		swotObj['recommendationmethod']	=	true;
		if(swotObj.meetingManagementValue.actions !=	undefined){
			swotObj.meetingManagementValue.actions	=	recommendation;
		}else{
			swotObj.meetingManagementValue.actions	=	recommendation;
		}
		for(var i=0;i<swotObj.meetingManagementValue.recommendation.length;i++){
			swotupdateDescription.meetingManagementValue.recommendation[i].newMultipleOwners = "";
			}
			swotupdateDescription.meetingManagementValue.newMultipleOwners = "";

            console.log(swotObj, "swotObject");
	    $.ajax({
	        url: "/stratroom/meetingManagement",
	        type: "put",
	        contentType: "application/json",
	        data: JSON.stringify(swotObj),
	        success: function (data, status) {
	        	localStorage.setItem("meetingclosed","");
	        	getNotification();
	        	var meetingreadornot	=	localStorage.getItem("meetingclosed");
	        	if(meetingreadornot !=	"" && meetingreadornot ==	"closed"){
	        		
	        	}else{
	        		setTimeout(callnotificationinterval,10000);
	        	}
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
				
				var action 	= 	"";
				if(type	==	"create"){
					action	=	"Meeting Action Created";
				}else if(type	==	"update"){
					action	=	"Meeting Action Modified";
				}else if(type	==	"delete"){
					action	=	"Meeting Action Deleted";
				}
				var navigateempId = $("#userPrincipalnavigate").val();
				var data	=	{"createdBy":currentEmp,"userId":navigateempId,"typeId":swotObj.id,"action":action,"systemIp":systemip};
				auditrailpage(data,'action');
				$("#action").modal("toggle");
				$(".actionsclose").click();

                 window.location.reload();
	        },
			error: readErrorMsg
	    });
}

// function action(tableID) {
//         var table = document.getElementById(tableID);

//         var rowCount = table.rows.length;
//         var row = table.insertRow(rowCount);

//         var cell1 = row.insertCell(0);
//         var factor = rowCount;
// 		rowCount	=	parseInt(parseInt(rowCount)-parseInt(1));
// 		var users		=	topparentswotDetails;;
// 		var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
// 		var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
// 		var subinitiativeUser 	=	'<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeopleactions" onclick="actionsaddpeople('+rowCount+')"><img '+userProfileConcate+' alt="'+username+'"></li>';
		
//         cell1.innerHTML =
//           '<textarea class="form-control pestelactions" name="pestelactions[]" cols="5" rows="5" > </textarea>';

//         var cell2 = row.insertCell(1);
//         cell2.innerHTML =
//           '<div class="form-group col-md-12" style="padding-right:1px;padding-left:1px;"><i class="far fa-calendar input-calender-icon1" style="right:-8%;"></i><input type="text" class="modal-custom-input date_pickers bydate" autocomplete="off" style="height: 34px !important;" data-language="en" name="bydate[]" id="bydate" style="width: 88% !important; height: 36px !important;" /></div>';

//         var cell3 = row.insertCell(2);
//         cell3.innerHTML =
//           '<input type="hidden" class="action_multiownerid" id="action_multiownerid_'+rowCount+'" name="multiowners[]" value="'+users.id+'"><div class="d-flex flex-column"> <ul class="list-unstyled order-list d-flex" id="actionsMultiowner_'+rowCount+'"> '+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"> <a href="#" class="favgs" data-toggle="modal" data-target="#addpeopleactions" > <span _ngcontent-hhc-c5="" onclick="actionsaddpeople('+rowCount+')" class="avatar-initial rounded-circle" >+</span > </a> </li></ul> </div>';

//         var cell4 = row.insertCell(3);
//         cell4.innerHTML = '<input type="checkbox" class="actionstatuscheck" >';
//         $('.date_pickers').datepicker({
// 			language : 'en',
// 			autoClose : true,
// 			position : "bottom left",
// 			todayButton : true,
// 			onSelect : function(fd) {
// 				// $('.datepickers-container').hide();
// 			}
// 		});
//         var cell5 = row.insertCell(4);
// 		if(deletepermission	==	true){
// 			cell5.innerHTML =	'<i class="fas fa-trash remove-action" data-toggle="tooltip" data-placement="bottom" title="Delete" style="cursor: pointer;"></i>';
// 			$(row).addClass("actions_clone");
// 		}
// 		$('.actions_multiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
// 		$("#actionbody ul li.avatar").css("cursor","pointer");
// 		$('[data-toggle="tooltip"]').tooltip();
//       }


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
                    removebtnEnable = `<i class="fas fa-trash remove-action" data-toggle="tooltip" data-placement="bottom" title="Delete" style="cursor: pointer;" onclick="deleteRowData(this)"></i>`;
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

  // === CELL 2: By Date (Date Picker) ===
//   var cell2 = row.insertCell(1);
//   cell2.className = 'align-middle text-center';
//   cell2.innerHTML =
//     '<div class="d-flex justify-content-center">' +
//     '<input type="text" class="modal-custom-input date_pickers_single bydate form-control" style="height: 34px; max-width: 180px;" data-language="en" name="bydate[]" value="" autocomplete="off" />' +
//     '</div>';

  // === CELL 3: Responsible (Owner + User List + Add Button) ===
//   var cell3 = row.insertCell(2);
//   cell3.className = 'align-middle text-center';
//   cell3.innerHTML =
//     '<div class="d-flex flex-column align-items-center">' +
//     '<input type="hidden" class="action_multiownerid" id="action_multiownerid_' + index + '" name="multiowners[]" value="' + users.id + '">' +
//     '<ul class="list-unstyled order-list d-flex flex-wrap justify-content-center" id="actionsMultiowner_' + index + '">' +
//     subinitiativeUser +
//     '<li class="avatar avatar-xs pull-up">' +
//     '<a href="#" class="favgs" data-toggle="modal" data-target="#addpeopleactions">' +
//     '<span onclick="actionsaddpeople(' + index + ')" class="avatar-initial rounded-circle">+</span>' +
//     '</a>' +
//     '</li>' +
//     '</ul>' +
//     '</div>';

//   // === CELL 4: Status (Dropdown) ===
//   var cell4 = row.insertCell(3);
//   cell4.className = 'align-middle text-center';
//   cell4.innerHTML =
//     '<div class="d-flex justify-content-center">' +
//     dropdown +
//     '</div>';

//   // === CELL 5: Actions (Delete Icon) ===
  var cell2 = row.insertCell(1);
  cell2.className = 'align-middle text-center';
  cell2.style.whiteSpace = 'nowrap';
  cell2.innerHTML = actionIcons;

  // === Attach Datepicker to the new date input ===
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

  // === Initialize avatar initials ===
  $(row).find('.actions_multiuserimage').initial({
    charCount: 2,
    height: 30,
    width: 30,
    fontSize: 18
  });

  // === Enable tooltips ===
  $(row).find('[data-toggle="tooltip"]').tooltip();

  // === Optional: Add class for cloned rows (if needed for styling/deletion) ===
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

function saveSwot() {
	var action	=	$("#meeting_Form input[name='action']").val();
    var swotObj = getSwotObj(action);
	
    var methodType = 'post';
	var id	=	$("#meeting_Form input[name='id']").val();
	if(action	==	"edit"){
		swotObj.id 			= 	(id !=	""?id:"");
		methodType = 'put';	
	}
	
	if($("#activities_selected_user_"+id).val()){
		swotObj.meetingManagementValue.multipleOwners		= 	$("#activities_selected_user_"+id).val();
	}else{
		swotObj.meetingManagementValue.multipleOwners		= 	currentEmp;
	}

	console.log(swotObj, "swotObj");
	
    $.ajax({
        url: "/stratroom/meetingManagement",
        type: methodType,
        contentType: "application/json",
        data: JSON.stringify(swotObj),
        success: function (data, status) {
        	localStorage.setItem("meetingclosed","");
            location.reload(true);
        },
		error:readErrorMsg
    });
}

function populateKPIList(elementId,ownerid) {
	var numberOfOptions = $(elementId + ' > option').length;

	if (jQuery.isEmptyObject(kpiList)) {
		$.ajax({
			url : "/stratroom/kpiList/"+currentEmp,
			async:false,
			success : function(kpiListValue) {
				kpiList = kpiListValue.kpidtoList;
				$.each(kpiList, function(index, kpiObj) {
					addOption(elementId, kpiObj.kpiValue.name, kpiObj.id)
				});
			}
		});
	} else if (numberOfOptions < 2) {
		$.each(kpiList, function(index, reportee) {
			addOption(elementId, reportee.kpiValue.name, reportee.id)
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
	$(".input-calender-icon-from").css("bottom","30%");
	$(".input-calender-icon-to").css("bottom","30%");
}

function handleswotevent(id,action) {
	console.log(id, action, "idaction");
	$("#meeting_Form").css('display', 'none');
	$("#meeting_Form").trigger('reset');
	$("#meeting_Form input[name='action']").val(action);
	if (action == 'add') {
		console.log("function called")
		if(createpermission	==	false){
			return false;
		}
		$("#swot_id_wrapper").css('display', 'none'); // Hide the ID input
		// when adding
		$(".meetingtitle").html("Create Meeting");
		$("#meeting_Form").css('display', 'block');
		formvalidationerrorreset();
	}else if (action == 'delete') {
		if(deletepermission	==	false){
			return false;
		}
		$("#deleterecordid").val(id);
		$('#deleteModalswot').modal('toggle');
		
		$(window).on("resize", function(){
		    $(".modal:visible").each(alignModal);
		}); 
		$(".modal").on("shown.bs.modal", alignModal);
	} else { // view and edit
		$(".meetingtitle").html("Edit Meeting");
		$("#meeting_Form").css('display', 'block');
		formvalidationerrorreset();
		$("#swot_id_wrapper").css('display', 'block'); // Hide the ID input
		$('#meeting_Form #swot_id').prop("disabled", true);
		$("#meeting_Form #swot_id").val(id);
		if (action == 'edit') {
			if(editpermission	==	false){
				return false;
			}
			$("#meeting_Form input[name='id']").val(id);
		}
		if (action == 'view') {
			$(".meetingtitle").html("View Meeting");
			$('#meeting_Form input[type="text"]').prop("disabled", true);
			$('#meeting_Form input[type="checkbox"]').prop("disabled", true);
			$('#meeting_Form select').prop("disabled", true);
			$('#meeting_Form button[value="Save"]').css('display', 'none');
		}

		$.ajax({
			url : "/stratroom/meetingManagement/" + id,
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
		url : "/stratroom/meetingManagement/" + id,
		async:false,
		success : function(data){
			swotupdateDescription	=	data;
			swotupdateDescription.meetingManagementValue.newMultipleOwners = "";
			for(var i=0;i<swotupdateDescription.meetingManagementValue.actions.length;i++){
				swotupdateDescription.meetingManagementValue.actions[i].newMultipleOwners = "";
			}
			var num=swotupdateDescription.meetingManagementValue.recommendation.length;
			for(var i=0;i<num;i++){
			localStorage.setItem('ownersname_'+i,swotupdateDescription.meetingManagementValue.recommendation[i].name);
			localStorage.setItem('recommendowners_'+i,swotupdateDescription.meetingManagementValue.recommendation[i].multipleOwners);
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
		url : "/stratroom/meetingManagement/" + id,
		async:false,
		success : function(data){
			swotupdateDescription	=	data;
			swotupdateDescription.meetingManagementValue.newMultipleOwners = "";
			for(var i=0;i<swotupdateDescription.meetingManagementValue.recommendation.length;i++){
				swotupdateDescription.meetingManagementValue.recommendation[i].newMultipleOwners = "";
			}
			var num=swotupdateDescription.meetingManagementValue.actions.length;
			for(var i=0;i<num;i++){
			localStorage.setItem('ownername_'+i,swotupdateDescription.meetingManagementValue.actions[i].name);
			localStorage.setItem('actionowners_'+i,swotupdateDescription.meetingManagementValue.actions[i].multipleOwners);
			}
			actionsPopSuccessCallback(data,id,type);	
		},
		error:readErrorMsg
	});
}

function recommendationPopSuccessCallback(swotList,typerequest) {
	console.log(swotList, "swotList");
	var tablebody	=	"";
	$("#tableBody").empty();
	if(swotList.meetingManagementValue.recommendation !=	undefined && swotList.meetingManagementValue.recommendation !=	""){
		if(swotList.meetingManagementValue.recommendation.length	!=	0){
			$("#recommendationtype").val('update');
			$("#recommendationcount").val(swotList.meetingManagementValue.recommendation.length);
		    $.each(swotList.meetingManagementValue.recommendation, function (i, List) {
				var name = 	(List.name !=	undefined?List.name:"");
				var multiowner 	= 	((List.multipleOwners !=	undefined && List.multipleOwners !=	'')?List.multipleOwners:currentEmp);
				var users		=	topparentswotDetails;
		        var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
				var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle rec_res_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
				var subinitiativeUser 	=	'<li class="avatar avatar-xs pull-up"><img '+userProfileConcate+' alt="'+username+'"></li>';				
				
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
				// tablebody	+=	'<tr'+removeclass+'><td><textarea class="form-control recommendation" rows="5" name="recommendation[]">'+name+'</textarea></td><td><div class="d-flex flex-column">'+userselecteditems+'<ul class="list-unstyled order-list d-flex" id="recommendationMultiowner_'+List.id+'">'+subinitiativeUser+'</ul></div></td><td>'+removebtnEnable+'</td></tr>';

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
                tablebody += '                    <i class="fas fa-plus title_edit_icon"></i>';
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
			tablebody += '                    <i class="fas fa-plus title_edit_icon"></i>';
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



// function actionsPopSuccessCallback(swotList,typerequest) {
// 	var tablebody	=	"";
// 	$("#actionbody").empty();
// 	if(swotList.meetingManagementValue.actions !=	undefined && swotList.meetingManagementValue.actions !=	''){
// 		if(swotList.meetingManagementValue.actions.length	!=	0){
// 			$("#actiontype").val('update');
// 			$("#actioncount").val(swotList.meetingManagementValue.actions.length);
// 		    $.each(swotList.meetingManagementValue.actions, function (i, List) {
// 				var name = 	(List.name !=	undefined?List.name:"");
// 				var multiowner 	= 	((List.multipleOwners !=	undefined && List.multipleOwners !=	'')?List.multipleOwners:currentEmp);
// 				var checkstatus	=	(List.status	==	true?"checked":"");
// 				var bydate		=	(List.bydate !=	undefined?List.bydate:"");
// 				var users		=	topparentswotDetails;
// 		        /*var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
// 				var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle rec_res_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
// 				var subinitiativeUser 	=	'<li class="avatar avatar-xs pull-up"><img '+userProfileConcate+' alt="'+username+'"></li>';*/
// 				var resultPorfileContent	=	actionsPorfileContent(multiowner,List.id);
// 				var userselecteditems	=	resultPorfileContent['userownerlist_data'];
// 				var subinitiativeUser	=	(resultPorfileContent['userownerlist'] !=	undefined?resultPorfileContent['userownerlist']:"");
// 				var removebtnEnable	=	'';
// 				var removeclass	=	'';
// 				if(actiondeletepermission	==	true && i !=	0){
// 					removeclass	=	' class="actions_clone"';
// 					removebtnEnable	=	`<i class="fas fa-trash remove-action" data-toggle="tooltip" data-placement="bottom" title="Delete" style="cursor: pointer;"></i>`;
// 				}
// 				tablebody	+=	'<tr'+removeclass+'><td><textarea class="form-control pestelactions" rows="5" name="pestelactions[]">'+name+'</textarea></td><td><div class="row"><div class="form-group col-md-12"><i class="far fa-calendar input-calender-icon1"></i><input type="text" class="modal-custom-input date_pickers_single bydate" style="height: 34px !important;" data-language="en" name="bydate[]" value="'+bydate+'" id="bydate" autocomplete="off"/></div></div></td><td><div class="d-flex flex-column">'+userselecteditems+'<ul class="list-unstyled order-list d-flex" id="actionsMultiowner_'+List.id+'">'+subinitiativeUser+'</ul></div></td><td><input type="checkbox" class="actionstatuscheck" '+checkstatus+'/></td><td>'+removebtnEnable+'</td></tr>';
// 			});
// 		}else{
// 			var users		=	topparentswotDetails;
// 			var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
// 			var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
// 			var subinitiativeUser 	=	'<li class="avatar avatar-xs pull-up"><img '+userProfileConcate+' alt="'+username+'"></li>';
	
// 			if((actioneditpermission	==	false || actioncreatepermission	==	false) || actionviewpermission	==	true || actionloadcontent	==	true){
// 				tablebody	=	'<tr><td><textarea class="form-control pestelactions" rows="5" name="pestelactions[]"> </textarea></td><td><div class="row"><div class="form-group col-md-12"><i class="far fa-calendar input-calender-icon1"></i><input type="text" class="modal-custom-input date_pickers_single bydate" style="height: 34px !important;" data-language="en" name="bydate[]" id="bydate" autocomplete="off"/></div></div></td><td><div class="d-flex flex-column"><input type="hidden" class="action_multiownerid" id="action_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="actionsMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" onclick="return false;" class="favgs"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+</span></a></li></ul></div></td><td><input type="checkbox" class="actionstatuscheck" /></td><td></td></tr>';		
// 			}
// 			if(actioneditpermission	==	true || actioncreatepermission	==	true){
// 				tablebody	=	'<tr><td><textarea class="form-control pestelactions" rows="5" name="pestelactions[]"> </textarea></td><td><div class="row"><div class="form-group col-md-12"><i class="far fa-calendar input-calender-icon1"></i><input type="text" class="modal-custom-input date_pickers_single bydate" style="height: 34px !important;" data-language="en" name="bydate[]" id="bydate" autocomplete="off"/></div></div></td><td><div class="d-flex flex-column"><input type="hidden" class="action_multiownerid" id="action_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="actionsMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" class="favgs" data-toggle="modal" data-target="#addpeopleactions"><span _ngcontent-hhc-c5=""onclick="actionsaddpeople(0)" class="avatar-initial rounded-circle">+</span></a></li></ul></div></td><td><input type="checkbox" class="actionstatuscheck" /></td><td></td></tr>';		
// 			}
// 			$("#actiontype").val('create');
// 		}
// 	}else{		
// 		var users		=	topparentswotDetails;
// 		var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
// 		var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
// 		var subinitiativeUser 	=	'';
// 		if((actioneditpermission	==	false || actioncreatepermission	==	false) || actionviewpermission	==	true || actionloadcontent	==	true){
// 			subinitiativeUser 	=	'<li class="avatar avatar-xs pull-up"><img '+userProfileConcate+' alt="'+username+'"></li>';
// 			tablebody	=	'<tr><td><textarea class="form-control pestelactions" rows="5" name="pestelactions[]"> </textarea></td><td><div class="row"><div class="form-group col-md-12"><i class="far fa-calendar input-calender-icon1"></i><input type="text" class="modal-custom-input date_pickers_single bydate" style="height: 34px !important;" data-language="en" name="bydate[]" id="bydate" autocomplete="off"/></div></div></td><td><div class="d-flex flex-column"><input type="hidden" class="action_multiownerid" id="action_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="actionsMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" onclick="return false;" class="favgs"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+</span></a></li></ul></div></td><td><input type="checkbox" class="actionstatuscheck" /></td><td></td></tr>';		
// 		}
// 		if(actioneditpermission	==	true || actioncreatepermission	==	true){
// 			subinitiativeUser 	=	'<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeopleactions" onclick="actionsaddpeople(0)"><img '+userProfileConcate+' alt="'+username+'"></li>';
// 			tablebody	=	'<tr><td><textarea class="form-control pestelactions" rows="5" name="pestelactions[]"> </textarea></td><td><div class="row"><div class="form-group col-md-12"><i class="far fa-calendar input-calender-icon1"></i><input type="text" class="modal-custom-input date_pickers_single bydate" style="height: 34px !important;" data-language="en" name="bydate[]" id="bydate" autocomplete="off"/></div></div></td><td><div class="d-flex flex-column"><input type="hidden" class="action_multiownerid" id="action_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="actionsMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" class="favgs" data-toggle="modal" data-target="#addpeopleactions"><span _ngcontent-hhc-c5=""onclick="actionsaddpeople(0)" class="avatar-initial rounded-circle">+</span></a></li></ul></div></td><td><input type="checkbox" class="actionstatuscheck" /></td><td></td></tr>';		
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
// 	$(".actionaddevent").removeAttr("disabled");
// }



function actionsPopSuccessCallback(swotList,typerequest) {
  console.log(swotList, "swotListData");
    var tablebody = "";
    $("#actionBodyData").empty();
    if(swotList.meetingManagementValue.actions != undefined && swotList.meetingManagementValue.actions != ''){
        if(swotList.meetingManagementValue.actions.length != 0){
            $("#actiontype").val('update');
            $("#actioncount").val(swotList.meetingManagementValue.actions.length);
            $.each(swotList.meetingManagementValue.actions, function (i, List) {
                var name = (List.name != undefined?List.name:"");
                var taskId = (List.taskId != undefined?List.taskId: null);
                var multiowner = ((List.multipleOwners != undefined && List.multipleOwners != '')?List.multipleOwners:currentEmp);
                var checkstatus = (List.status == true?"checked":"");
                var dropdown = '<select id="action-status-01" name="action-status" class="form-select select-dropdown-action actionstatuscheck" placeholder="Select Status">' +
                   '<option value="" selected>Select Status</option>' +
                   '<option value="pending" ' + (List.status == false ? "selected" : "") + '>Pending</option>' +
                   '<option value="completed" ' + (List.status == true ? "selected" : "") + '>Completed</option>' +
                   '</select>';
                var bydate = (List.bydate != undefined?List.bydate:"");
                var users = topparentswotDetails;
                var removebtnEnable = '';
                var removeclass = '';
                if(actiondeletepermission == true){
                    removeclass = ' class="actions_clone"';
                    removebtnEnable = `<i class="fas fa-trash remove-action" data-toggle="tooltip" data-placement="bottom" title="Delete" style="cursor: pointer;" onclick="deleteRowData(this)"></i>`;
                }
                var resultPorfileContent = actionsPorfileContent(multiowner,List.id);
                var userselecteditems = resultPorfileContent['userownerlist_data'];
                var subinitiativeUser = (resultPorfileContent['userownerlist'] != undefined?resultPorfileContent['userownerlist']:"");
                
                // For all rows except last, show only delete icon
                var actionIcons = removebtnEnable;
                // For last row, show both add and delete icons
                if(i == swotList.meetingManagementValue.actions.length - 1) {
                    actionIcons = `<div class="float-right addactmeetingoption">
                        <button onclick="action('action_table')" class="form-control rounded-circle" style="margin-top: -4px; border: none;">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>` + removebtnEnable;
                }
                
                // tablebody += '<tr'+removeclass+'><td><textarea class="form-control pestelactions" placeholder="Notes" rows="3" name="pestelactions[]">'+name+'</textarea></td><td><div class="row"><div class="form-group col-md-12"><i class=""></i><input type="text" class="modal-custom-input date_pickers_single bydate" style="height: 34px !important;" data-language="en" name="bydate[]" value="'+bydate+'" id="bydate" autocomplete="off"/></div></div></td><td><div class="d-flex flex-column">'+userselecteditems+'<ul class="list-unstyled order-list d-flex" id="actionsMultiowner_'+List.id+'">'+subinitiativeUser+'</ul></div></td><td>' + dropdown + '</td><td>'+actionIcons+'</td></tr>';
                tablebody += '<tr' + removeclass + '>';
                tablebody += '<td class="align-middle text-center" hidden>';
                tablebody += '<div class="d-flex justify-content-center">';
                tablebody += '<input type="text" class="modal-custom-input form-control taskId" style="height: 34px; max-width: 180px;" data-language="en" name="taskId" value="' + taskId + '" autocomplete="off" />';
                tablebody += '</div>';
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
                actionIcons += `<i class="fas fa-trash remove-action" data-toggle="tooltip" data-placement="bottom" title="Delete" style="cursor: pointer;"></i>`;
            }
            
            if((actioneditpermission == false || actioncreatepermission == false) || actionviewpermission == true || actionloadcontent == true){                    
                tablebody = '<tr><td><textarea class="form-control pestelactions" placeholder="Notes" rows="3" name="pestelactions[]"> </textarea></td><td><div class="row"><div class="form-group col-md-12"><i class=""></i><input type="text" class="modal-custom-input date_pickers_single bydate" style="height: 34px !important;" data-language="en" name="bydate[]" autocomplete="off"/></div></div></td><td><div class="d-flex flex-column"><input type="hidden" class="action_multiownerid" id="action_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="actionsMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" onclick="return false;" class="favgs"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+</span></a></li></ul></div></td><td>' + dropdown + '</td><td>'+actionIcons+'</td></tr>';
            }
            if(actioneditpermission == true || actioncreatepermission == true){
                // tablebody = '<tr><td><div class="form-group"><textarea class="form-control pestelactions" placeholder="Notes" rows="3" name="pestelactions[]"> </textarea></div></td><td><div class="form-group"><input type="date" class="form-control"  data-language="en" name="bydate[]" autocomplete="off"/></div></td><td><div class="d-flex flex-column"><input type="hidden" class="action_multiownerid" id="action_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="actionsMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" class="favgs" data-toggle="modal" data-target="#addpeopleactions"><span _ngcontent-hhc-c5=""onclick="actionsaddpeople(0)" class="avatar-initial rounded-circle">+</span></a></li></ul></div></td><td>' + dropdown + '</td><td>'+actionIcons+'</td></tr>';
                tablebody = '<tr>';
                tablebody += '<td class="align-middle text-center">';
                tablebody += '<div class="form-group mb-0">';
                tablebody += '<textarea class="form-control pestelactions" placeholder="Enter recommendation" rows="3" name="pestelactions[]" style="resize: vertical; min-height: 80px;"></textarea>';
                tablebody += '</div>';
                tablebody += '</td>';

                // tablebody += '<td class="align-middle text-center">';
                // tablebody += '<div class="form-group mb-0">';
                // tablebody += '<input type="date" class="form-control" data-language="en" name="bydate[]" autocomplete="off" />';
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
            actionIcons += `<i class="fas fa-trash remove-action" data-toggle="tooltip" data-placement="bottom" title="Delete" style="cursor: pointer;"></i>`;
        }
        
        if((actioneditpermission == false || actioncreatepermission == false) || actionviewpermission == true || actionloadcontent == true){
            subinitiativeUser = '<li class="avatar avatar-xs pull-up"><img '+userProfileConcate+' alt="'+username+'"></li>';                    
            tablebody = '<tr><td><textarea class="form-control pestelactions" placeholder="Notes" rows="3" name="pestelactions[]"> </textarea></td><td><div class="row"><div class="form-group col-md-12"><i class=""></i><input type="text" class="modal-custom-input date_pickers_single bydate" style="height: 34px !important;" data-language="en" name="bydate[]" autocomplete="off"/></div></div></td><td><div class="d-flex flex-column"><input type="hidden" class="action_multiownerid" id="action_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="actionsMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" onclick="return false;" class="favgs"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+</span></a></li></ul></div></td><td>' + dropdown + '</td><td>'+actionIcons+'</td></tr>';
        }
        if(actioneditpermission == true || actioncreatepermission == true){
            subinitiativeUser = '<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeopleactions" onclick="actionsaddpeople(0)"><img '+userProfileConcate+' alt="'+username+'"></li>';
            // tablebody = '<tr><td><textarea class="form-control pestelactions" placeholder="Notes" rows="3" name="pestelactions[]"> </textarea></td><td><div class="row"><div class="form-group col-md-12"><i class=""></i><input type="text" class="modal-custom-input date_pickers_single bydate" style="height: 34px !important;" data-language="en" name="bydate[]" autocomplete="off"/></div></div></td><td><div class="d-flex flex-column"><input type="hidden" class="action_multiownerid" id="action_multiownerid_0" name="multiowners[]" value="'+users.id+'"><ul class="list-unstyled order-list d-flex" id="actionsMultiowner_0">'+subinitiativeUser+'<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" class="favgs" data-toggle="modal" data-target="#addpeopleactions"><span _ngcontent-hhc-c5=""onclick="actionsaddpeople(0)" class="avatar-initial rounded-circle">+</span></a></li></ul></div></td><td>' + dropdown + '</td><td>'+actionIcons+'</td></tr>';
            
            tablebody = '<tr>';

// === Recommendation (Textarea) ===
tablebody += '<td class="align-middle text-center">';
tablebody += '<textarea class="form-control pestelactions" placeholder="Enter recommendation" rows="3" name="pestelactions[]" style="resize: vertical; min-height: 80px;"></textarea>';
tablebody += '</td>';

// === By Date (Date Picker) ===
// tablebody += '<td class="align-middle text-center">';
// tablebody += '<div class="d-flex justify-content-center">';
// tablebody += '<input type="text" class="modal-custom-input date_pickers_single bydate form-control" style="height: 34px; max-width: 180px;" data-language="en" name="bydate[]" autocomplete="off" />';
// tablebody += '</div>';
// tablebody += '</td>';

// === Responsible (Multi-owner + Add Button) ===
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

// === Status (Dropdown) ===
// tablebody += '<td class="align-middle text-center">';
// tablebody += '<div class="d-flex justify-content-center">';
// tablebody += dropdown;
// tablebody += '</div>';
// tablebody += '</td>';

// === Actions (Icons) ===
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

function handleswoteventdelete(){
	var id				=	$("#deleterecordid").val();
	if(id	==	""){
		return false;
	}
	var url	=	"/stratroom/meetingManagement/" + id;
	
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
	$("#meetingname").val(data.meetingManagementValue.name);
	$("#status").val(data.meetingManagementValue.status);
	//$("#meetingdate").val(data.meetingManagementValue.meetingdate);
	$("#starttime").val(data.meetingManagementValue.fromtime);
	$("#endtime").val(data.meetingManagementValue.endtime);
	$("#meetinglocation").val(data.meetingManagementValue.location);
	$("#meetLink").val(data.meetingManagementValue.meetLink);
}

function getSwotObj(action) {
	var name		=	$("#meetingname").val();
	var meetingstatus	=	$("#status").val();
	var meetLink = $("#meetLink").val();
	var starttime	=	$("#starttime").val();
	var endtime		=	$("#endtime").val();
	//var meetingdate	=	$("#meetingdate").val();
	var location	=	$("#meetinglocation").val();
	var pageNumber =  $('#pagenumber').val();
	var fromdate	=	(starttime !=	"" && starttime !=	undefined?new Date(starttime):new Date());
	var enddate		=	(endtime !=	"" && endtime !=	undefined?new Date(endtime):new Date());
	var newOwner ="";
	fromdate	=	parseInt(parseInt(fromdate.getMonth())+1)+"/"+fromdate.getDate()+"/"+fromdate.getFullYear();
	enddate		=	parseInt(parseInt(enddate.getMonth())+1)+"/"+enddate.getDate()+"/"+enddate.getFullYear();
	
	var swotObj 	= 	{
			"pageId": pageNumber,
            "active": 0,
            "meetingManagementValue": {
                "name": ((name != undefined && name !=	"") ? name : ""),
                "status": ((meetingstatus != undefined && meetingstatus !=	"") ? meetingstatus : ""),
                //"meetingdate": ((meetingdate != undefined && meetingdate !=	"") ? meetingdate : ""),
				"fromtime": ((starttime != undefined && starttime !=	"") ? starttime : ""),
                "endtime": ((endtime != undefined && endtime !=	"") ? endtime : ""),
                "fromdate": fromdate,
                "enddate": enddate,
				"location":location,
				"newMultipleOwners" :newOwner,
				"zoneId":(Intl.DateTimeFormat().resolvedOptions().timeZone !=	undefined?Intl.DateTimeFormat().resolvedOptions().timeZone:"Asia/Calcutta"),
				"zoneFromIso":new Date(starttime).toISOString(),
				"zoneToIso":new Date(endtime).toISOString(),
				"meetLink": meetLink, 
                "attachmentUrl": "",
				"recommendation": [],
				"actions": [],
				"attachment": [],
            }
        };
	
	var existdatadonotupdate 	=	["name","fromtime","endtime","fromdate","enddate","location","status","zoneId","zoneFromIso","zoneToIso"];//meetingdate
	if(action == "edit" && (swotupdateDescription !== undefined || swotupdateDescription != "")){
		$.each(swotupdateDescription.meetingManagementValue,function(index,value){
			if($.inArray(index,existdatadonotupdate) == -1){
				swotObj["meetingManagementValue"][index]	=	value;
			}
		});
	}
	
	return  swotObj;   
}

$(document).on("change", ".file-input1", function () {
    var file 	= 	$(this)[0].files[0]
	var id		=	$(this).attr("data-id");
    var fd 		= 	new FormData();
    var thiss 	= 	$(this)
    fd.append('file', file);
    $("#SendingAttachment").modal("show")
    $.ajax({
        url: '/stratroom/updateAttachment',
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
		url : "/stratroom/meetingManagement/" + id,
		success: function (data, status, jqxhr) {
				var swotObj 	= 	data;
				if(swotObj.meetingManagementValue.attachmentUrl !=	undefined){
					swotObj.meetingManagementValue.attachmentUrl	=	attachementurl;
				}else{
					swotObj.meetingManagementValue.attachmentUrl	=	attachementurl;
				}
				$("#viewfilelink_"+id).attr("data-awslink",attachementurl);
			    $.ajax({
			        url: "/stratroom/meetingManagement",
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
        url: "/stratroom/meetingManagement/" + id,
        contentType: "application/json",
        success: function (data, status) {
            var checktext = data.meetingManagementValue.businessImpact
            if (checktext != "") {
                showImpactDetails(data.meetingManagementValue.businessImpact)
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
        url: "/stratroom/meetingManagement/" + id,
        contentType: "application/json",
        success: function (data, status) {
            var checktext = data.meetingManagementValue.recommandation
            if (checktext != "") {
                showRecommendDetails(data.meetingManagementValue.recommandation)
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

$('#sub-ini-box_view').slimscroll({
					height : '450px',
					size : '3px',
					color : '#9c9c9c'
				});

function handleMultioownersuserevent(id, action) {
    console.log(id, action, "id, action");

	var getData = []

	      $.ajax({
            url: "/stratroom/meetingManagement/" + id,
            async: false,
            success: function(result, status) {
                swotupdateDescription = result;
				getData = result.multipleOwerlist;
				console.log(result, "swotupdateDescription");
                localStorage.setItem('existingowners', swotupdateDescription.meetingManagementValue.multipleOwners);
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
            url: "/stratroom/user/moduleAccessUserList?moduleName=Meetings",
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
                
                // if($("#activities_selected_user_"+id).length) {
                //     selectedItem = $("#activities_selected_user_"+id).val().split(',');
                // };
				

				
				
                
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
			swotObj.meetingManagementValue.multipleOwners	=	currentEmp;	
		}else{
			swotObj.meetingManagementValue.multipleOwners	=	multiowners.join(',');
		}
		
		
});

$(document).on("click", ".getselectedActivitiesUsers", function() {
    if(editpermission == false && createpermission == false) {
        return false;
    }
    
    // Reset search UI
    $("#searchactivities").val('');
    $("#activities_search2").show();
    $("#activities_search_section2").hide();
    
    var id = $("#activities_current_id").attr("data-activities_sub_current_id");
    if((id == undefined || id == "" || id == " ")) {
        return false;
    }
    
    var imageElement = "initiativeactivitieUser_"+id;
    var userseslectedData = [];
    
    // Updated selector for new structure
    var selectedSubinitiativeOwner = $(".add-attendees input[name='activities_owner[]']:checked").each(function(index) {
        userseslectedData.push(parseInt($(this).val()));
    });

    var functionParams = id+',"edit"';
    var functionName = "handleMultioownersuserevent";
    var modalPopupName = ".swot_add_multiuser_popup";
    
    // Store selected users
    $("#activities_selected_user_"+id).val(userseslectedData.join(','));
    
    var swotObj = swotupdateDescription;
    var oldowners = localStorage.getItem('existingowners');
    var newowner = swotObj.meetingManagementValue.multipleOwners;
    var newowners = getNewOwners(oldowners, newowner);
    
    swotObj.meetingManagementValue.newMultipleOwners = newowners;
    
    // Clear new owners from recommendations and actions
    for(var i=0; i<swotObj.meetingManagementValue.recommendation.length; i++) {
        swotupdateDescription.meetingManagementValue.recommendation[i].newMultipleOwners = "";
    }
    for(var i=0; i<swotObj.meetingManagementValue.actions.length; i++) {
        swotupdateDescription.meetingManagementValue.actions[i].newMultipleOwners = "";
    }
    
    var methodType = 'put';
    localStorage.setItem("meetingclosed", "");

    if (swotObj.meetingManagementValue.multipleOwners) {
        const uniqueOwners = [...new Set(swotObj.meetingManagementValue.multipleOwners.split(","))];
        swotObj.meetingManagementValue.multipleOwners = uniqueOwners.join(",");
    }

console.log(swotObj.meetingManagementValue.multipleOwners); 
    
    console.log(swotObj, "swotObj");
    // AJAX call to update meeting management
    $.ajax({
        url: "/stratroom/meetingManagement/",
        type: methodType,
        contentType: "application/json",
        data: JSON.stringify(swotObj),
        success: function(data, status) {
            window.location.reload(true);
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
    
    localStorage.setItem("meetingclosed", "");
    var meetingreadornot = localStorage.getItem("meetingclosed");
    getNotification();
    
    if(meetingreadornot != "" && meetingreadornot == "closed") {
        // Handle closed meeting case
    } else {
        setTimeout(callnotificationinterval, 10000);
    }
    
    if(!jQuery.isEmptyObject(userseslectedData)) {
        $.ajax({
            url: "/stratroom/user/moduleAccessUserList?moduleName=Meetings",
            success: function(data, status) {
                var subinitiativeUser = "";
                
                if(userseslectedData.length != data.length) {
                    var profileBadgeIncrement = (userseslectedData.length >= 3 ? parseInt(userseslectedData.length)-parseInt(2) : "");
                    var badgeinc = false;
                    
                    $.each(data, function(key, users) {
                        $.each(userseslectedData, function(index, selectedvalue) {
                            if(selectedvalue == users.id) {
                                var username = ((users.name == undefined || users.name == "") ? "User" : users.name);
                                var userProfileConcate = ((users.image == undefined || users.image == "") ? 
                                    "data-name='"+username+"' class='rounded-circle swotmultiuserimage'" : 
                                    "src='"+users.image+"' class='rounded-circle'");
                                
                                if(index <= 2) {
                                    subinitiativeUser += '<li class="avatar avatar-sm" onclick="'+functionName+'('+functionParams+')" data-selecteduser="'+users.id+'">' +
                                        '<img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
                                }
                                
                                if(userseslectedData.length >= 3 && index >= 2 && index <= 2) {
                                    badgeinc = true;
                                    subinitiativeUser = subinitiativeUser.replace(
                                        '<li class="avatar avatar-sm" onclick="'+functionName+'('+functionParams+')" data-selecteduser="'+users.id+'">' +
                                        '<img '+userProfileConcate+' alt="'+username+'" width="50"></li>', '');
                                    subinitiativeUser += '<li class="avatar avatar-sm" onclick="'+functionName+'('+functionParams+')" data-selecteduser="'+users.id+'">' +
                                        '<span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
                                    return false;
                                }
                            }
                        });
                    });
                    
                    if(badgeinc == false) {
                        subinitiativeUser += '<li class="avatar avatar-sm" onclick="'+functionName+'('+functionParams+')">' +
                            '<span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
                    }
                }
                
                if(userseslectedData.length == data.length) {
                    var profileBadgeIncrement = (data.length >= 3 ? parseInt(data.length)-parseInt(2) : 0);
                    var badgeinc = false;
                    
                    $.each(data, function(index, users) {
                        var username = ((users.name == undefined || users.name == "") ? "User" : users.name);
                        var userProfileConcate = ((users.image == undefined || users.image == "") ? 
                            "data-name='"+username+"' class='rounded-circle swotmultiuserimage'" : 
                            "src='"+users.image+"' class='rounded-circle'");
                        
                        if(index <= 2) {
                            subinitiativeUser += '<li class="avatar avatar-sm" onclick="'+functionName+'('+functionParams+')" data-selecteduser="'+users.id+'">' +
                                '<img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
                        }
                        
                        if(userseslectedData.length >= 3 && index >= 2 && index <= 2) {
                            badgeinc = true;
                            subinitiativeUser = subinitiativeUser.replace(
                                '<li class="avatar avatar-sm" onclick="'+functionName+'('+functionParams+')" data-selecteduser="'+users.id+'">' +
                                '<img '+userProfileConcate+' alt="'+username+'" width="50"></li>', '');
                            subinitiativeUser += '<li class="avatar avatar-sm" onclick="'+functionName+'('+functionParams+')" data-selecteduser="'+users.id+'">' +
                                '<span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
                            return false;
                        }
                    });
                    
                    if(badgeinc == false) {
                        subinitiativeUser += '<li class="avatar avatar-sm" onclick="'+functionName+'('+functionParams+')">' +
                            '<span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
                    }
                }
                
                $("#"+imageElement).html(subinitiativeUser);
                $('.swotmultiuserimage').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
            }
        });
    } else {
        var users = topparentswotDetails;
        $("#activities_selected_user_"+id).val(users.id);
        userseslectedData.push(users.id);
        
        var username = ((users.name == undefined || users.name == "") ? "User" : users.name);
        var userProfileConcate = ((users.image == undefined || users.image == "") ? 
            "data-name='"+username+"' class='rounded-circle swotmultiuserimage'" : 
            "src='"+users.image+"' class='rounded-circle'");
        
        var subinitiativeUser = '<li class="avatar avatar-sm" onclick="'+functionName+'('+functionParams+')">' +
            '<img '+userProfileConcate+' alt="'+username+'" width="50"></li>' +
            '<li class="avatar avatar-sm" onclick="'+functionName+'('+functionParams+')">' +
            '<span _ngcontent-hhc-c5="" class="badge">+</span></li>';
        
        $("#"+imageElement).html(subinitiativeUser);
        $('.swotmultiuserimage').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
    }
});

var i	=	0;
var autorefresh = 0;
var notreporteelist	=	{};
getreportee();
function callnotificationinterval() {
		$.ajax({
			url : "/stratroom/notificationList?meetingIntervalCheck=true",
			type : "get",
			contentType : "application/json",
			success : function(data, status) {
				var notificationData = "";
	        	var ownerName = hasWhiteSpaceName($("input[name='firstnametop']").val());
	        	if(data.length > 0 && !jQuery.isEmptyObject(reporteelist)){
	        		$.each(data, function (i, List){
			    		$.each(notreporteelist,function(key,users){
			    			if(List.owner ==	users.id){
								var userProfileConcate = (users.image !=	undefined && users.image !=	""?'class="rounded-circle" src="'+users.image+'"':' data-name="'+ownerName+'" class="rounded-circle notifyprofileplanuser" ');
								/*var dateformat		=	new Date(List.notificationValue.formattedDate);
								var dateformatted	=	dateFormatedtohumanread(dateformat);
								var timeformatted 	= 	timeFormatedtohumanreadwithampmspace(dateformat);
								dateformat	=	dateformatted+' '+timeformatted;*/
								
								var dateformat	=	new Date();
								var notificationcreatedTime	=	List.notificationValue.dateTime;	
								if(notificationcreatedTime	!=	"" && notificationcreatedTime	!= undefined){
									if(notificationcreatedTime.indexOf("Z") == -1){
										notificationcreatedTime	=	notificationcreatedTime+"Z";
									}
									
									dateformat			=	new Date(notificationcreatedTime).toISOString();
									var localtimenoti	=	new Date(dateformat).toLocaleString();
									var dateformatted	=	dateFormatedtohumanread(localtimenoti);
									var timeformatted 	= 	timeFormatedtohumanreadwithampmspace(localtimenoti);
									dateformat	=	dateformatted+' '+timeformatted;
								}
								
								var cusr	=	"";
								//check if meeting is assigned
								if(List.meetingTime	!=	"" && List.meetingTime	!= undefined){
									var meetingtimezone	=	List.meetingTime;
									if(meetingtimezone.indexOf("Z") == -1){
										meetingtimezone	=	List.meetingTime+"Z";
									}
									
									var isotime		=	new Date(meetingtimezone).toISOString();
									var localtime	=	new Date(isotime).toLocaleString();
									var message	=	List.notificationValue.message;
									var messageposition	=	(message !=	"" && message	!=	undefined ?message.indexOf('on'):"");
									if(messageposition !=	-1){
										message	=	message.substr(0,messageposition+2);
										message	=	message+' '+localtime;
									}
									notificationData += '<li '+cusr+'><img '+userProfileConcate+' alt="" />'+
					    			'<h6>'+message+'</h6><br>'+
					    			'<p>'+dateformat+'</p></li>';
								}
			    			}
			    		});
	        		});
	        		
			    	$(".presentnotificationalert").modal("show");
			    	$(".presentmeetingnotifics").html('');
			    	$(".presentmeetingnotifics").html(notificationData);
			    	$('#notific_sub-ini-box_view').slimscroll({
							height : '420px',
							size : '3px',
							color : '#9c9c9c'
					});
			    	$('.notifyprofileplanuser').initial({
						charCount : 2,
						height : 30,
						width : 30,
						fontSize : 18
					});
			    	 
	        	}
			}
		});
	};


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

$(document).on("click", ".peopleselectedUsers", function() {
    console.log("peopleselectedUsers clicked");
    if(createpermission == false && editpermission == false) {
        return false;
    }
    
    // Reset search UI
    $("#searchrecommendation").val('');
    $("#search2").show();
    $("#search_section2").hide();
    
    var id = $("#responsibleid").val();
    if((id == undefined || id == "" || id == " ")) {
        return false;
    }
    
    // Updated selector for new structure
    var multiowners = $(".add-attendeesnotes input[name='attendees']:checked").map(function() {
        return this.value;
    }).get();
    
    // Store selected owners
    if(multiowners.length == 0) {
        $("#rec_multiownerid_"+id).val(currentEmp);
    } else {
        $("#rec_multiownerid_"+id).val(multiowners.join(','));
    }
    
    var imageElement = "recommendationMultiowner_"+id;
    var functionParams = id;
    var functionName = "recommendationaddpeople";
    
    if(!jQuery.isEmptyObject(multiowners)) {
        $.ajax({
            url: "/stratroom/user/moduleAccessUserList?moduleName=Meetings",
            success: function(data, status) {
                var subinitiativeUser = "";
                var avatarGroup = '<ul class="list-unstyled d-inline-flex align-items-center avatar-group mb-0">';
                
                if(multiowners.length != data.length) {
                    var profileBadgeIncrement = (multiowners.length >= 3 ? parseInt(multiowners.length)-parseInt(2) : "");
                    var badgeinc = false;
                    
                    $.each(data, function(key, users) {
                        $.each(multiowners, function(index, selectedvalue) {
                            if(selectedvalue == users.id) {
                                var username = ((users.name == undefined || users.name == "") ? "User" : users.name);
                                var userProfileConcate = ((users.image == undefined || users.image == "") ? 
                                    "data-name='"+username+"' class='rounded-circle rec_res_multiuserimage'" : 
                                    "src='"+users.image+"' class='rounded-circle'");
                                
                                if(index <= 2) {
                                    avatarGroup += '<li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip" data-bs-placement="top" title="'+username+'" onclick="'+functionName+'('+functionParams+')">' +
                                        '<img '+userProfileConcate+' alt="'+username+'" width="24" height="24"></li>';
                                }
                                
                                if(multiowners.length >= 3 && index >= 2 && index <= 2) {
                                    badgeinc = true;
                                    avatarGroup += '<li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip" data-bs-placement="top" title="'+profileBadgeIncrement+' more" onclick="'+functionName+'('+functionParams+')">' +
                                        '<span class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
                                    return false;
                                }
                            }
                        });
                    });
                    
                    if(badgeinc == false && multiowners.length > 3) {
                        avatarGroup += '<li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip" data-bs-placement="top" title="Add people" onclick="'+functionName+'('+functionParams+')">' +
                            '<span class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
                    }
                } else {
                    var profileBadgeIncrement = (data.length >= 3 ? parseInt(data.length)-parseInt(2) : 0);
                    var badgeinc = false;
                    
                    $.each(data, function(index, users) {
                        var username = ((users.name == undefined || users.name == "") ? "User" : users.name);
                        var userProfileConcate = ((users.image == undefined || users.image == "") ? 
                            "data-name='"+username+"' class='rounded-circle rec_res_multiuserimage'" : 
                            "src='"+users.image+"' class='rounded-circle'");
                        
                        if(index <= 2) {
                            avatarGroup += '<li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip" data-bs-placement="top" title="'+username+'" onclick="'+functionName+'('+functionParams+')">' +
                                '<img '+userProfileConcate+' alt="'+username+'" width="24" height="24"></li>';
                        }
                        
                        if(multiowners.length >= 3 && index >= 2 && index <= 2) {
                            badgeinc = true;
                            avatarGroup += '<li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip" data-bs-placement="top" title="'+profileBadgeIncrement+' more" onclick="'+functionName+'('+functionParams+')">' +
                                '<span class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
                            return false;
                        }
                    });
                    
                    if(badgeinc == false && data.length > 3) {
                        avatarGroup += '<li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip" data-bs-placement="top" title="Add people" onclick="'+functionName+'('+functionParams+')">' +
                            '<span class="avatar-initial rounded-circle">+'+profileBadgeIncrement+'</span></li>';
                    }
                }
                
                avatarGroup += '</ul>';
                $("#"+imageElement).html(avatarGroup);
                $("#"+imageElement+" li").css("cursor", "pointer");
                $('.rec_res_multiuserimage').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
            }
        });
    } else {
        var users = topparentswotDetails;
        $("#rec_multiownerid_"+id).val(users.id);
        var username = ((users.name == undefined || users.name == "") ? "User" : users.name);
        var userProfileConcate = ((users.image == undefined || users.image == "") ? 
            "data-name='"+username+"' class='rounded-circle rec_res_multiuserimage'" : 
            "src='"+users.image+"' class='rounded-circle'");
        
        var avatarGroup = '<ul class="list-unstyled d-inline-flex align-items-center avatar-group mb-0">' +
            '<li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip" data-bs-placement="top" title="'+username+'" onclick="'+functionName+'('+functionParams+')">' +
            '<img '+userProfileConcate+' alt="'+username+'" width="24" height="24"></li>' +
            '<li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip" data-bs-placement="top" title="Add people" onclick="'+functionName+'('+functionParams+')">' +
            '<span class="avatar-initial rounded-circle">+</span></li>' +
            '</ul>';
        
        $("#"+imageElement).html(avatarGroup);
        $("#"+imageElement+" li").css("cursor", "pointer");
        $('.rec_res_multiuserimage').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
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
			url: "/stratroom/user/moduleAccessUserList?moduleName=Meetings",
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
						var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
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
				$('.actions_multiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
			}
		});
	}else{
		var users 	=	topparentswotDetails;
		$("#action_multiownerid_"+id).val(users.id);
		var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
		var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle actions_multiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
		subinitiativeUser 	=	'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
		subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-xs pull-up" '+modalPopupName+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+</span></li>';
		$("#"+imageElement).html('');
		$("#"+imageElement).html(subinitiativeUser);
		$("#"+imageElement+" li").css("cursor","pointer");
		$('.actions_multiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
	}
	
});


$(".submitevent").click(function(){
	if($("#starttime").val() ==	""){ 
		$(".input-calender-icon-from").css("bottom","50%");
	}else{
		$(".input-calender-icon-from").css("bottom","50%");
	}
	
	if($("#endtime").val() ==	""){ 
		$(".input-calender-icon-to").css("bottom","50%");
	}else{
		$(".input-calender-icon-to").css("bottom","50%");
	}
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
	console.log(id, "handleUploadShow called");
	swotGlobalid	=	id;
	if((attcreatepermission	==	false || atteditpermission	==	false || attdeletepermission	==	false) && attloadcontent	==	false){
		return false;
	}
	$("#fileuploadtype").val('create');
	$('[data-toggle="tooltip"]').tooltip("hide");
	$('[rel="tooltip"]').tooltip("hide");
	attachmentdeleteId = id;
	$.ajax({
		url : "/stratroom/meetingAttachList/" + id,
		async:false,
		method:'GET',
		success : function(data,status){
			//swotupdateDescription	=	data;			
			//attachment = data.meetingManagementValue.attachment;
			uploadShow(data)
		},
		error:readErrorMsg
	});
}

function uploadShow(result) {
    const savedLanguage = localStorage.getItem("selectedLang") || "en";
    var siNoHeader = "Sr. No.";
    var fileNameHeader = "File Name";
    var uploadedOnHeader = "Uploaded On";
    var sizeHeader = "Size";
    var typeHeader = "Type";
    var actionsHeader = "Actions";
if (savedLanguage == "en") {
    siNoHeader = "Sr. No.";
    fileNameHeader = "File Name";
    uploadedOnHeader = "Uploaded On";
    sizeHeader = "Size";
    typeHeader = "Type";
    actionsHeader = "Actions";

} else if (savedLanguage == "am") {
    siNoHeader = "ተ.ቁ.";
    fileNameHeader = "የፋይል ስም";
    uploadedOnHeader = "የተጫነበት ቀን";
    sizeHeader = "የፋይል መጠን";
    typeHeader = "የፋይል አይነት";
    actionsHeader = "እርምጃዎች";

} else {
    siNoHeader = "الرقم التسلسلي";
    fileNameHeader = "اسم الملف";
    uploadedOnHeader = "تم الرفع في";
    sizeHeader = "الحجم";
    typeHeader = "النوع";
    actionsHeader = "الإجراءات";
}

    console.log(result, "uploadShow called");
    $("#listfileuploadTableData").empty();
    
    if (!result || result.length === 0) {
        $("#listfileuploadTableData").html('<div class="text-center p-3">No attachments found</div>');
        return;
    }

    var uploadShowData = "";
    var i = 0;
    
    $.each(result, function (index, List) {
        i++;
        var uploadedOn = dateFormatedtohumanread(List.createdTime);
        var fileUrl = List.file || "#"; // Handle empty file URLs
        
        uploadShowData += "<tr>" +
            "<td class='text-center align-middle'>" + i + "</td>" +
            "<td class='text-center align-middle'>" +
            "<a href='" + fileUrl + "' target='_blank' download='" + List.name + "." + List.type + "'>" + 
            (List.name || "Unnamed File") + 
            "</a></td>" +
            "<td class='text-center align-middle'>" + (uploadedOn || "N/A") + "</td>" +
            "<td class='text-center align-middle'>" + (List.size || "N/A") + "</td>" +
            "<td class='text-center align-middle'>" + (List.type || "N/A") + "</td>" +
            "<td class='text-center align-middle'>" +
            "<div class='table-actions justify-content-center'>";

        if (attdeletepermission == true) {
            uploadShowData +=
                '<a href="#" class="btn btn-sm btn-icon" data-toggle="modal" data-target="#deleteAttachmentModal" onclick="deleteAttachment(' + List.meetingManagementId + ',' + List.id + ')">' +
                '<img src="/stratroom/images/delete-i.svg" width="12" height="12" />' +
                '</a>';
        } else if (atteditpermission == false && attdeletepermission == false) {
            uploadShowData += "--";
        }

        uploadShowData += "</div>" +
            "</td>" +
            "</tr>";
    });

    // Using string concatenation instead of template literals
    var table = '<div class="table-responsive">' +
        '<table class="table table-sm table-bordered align-center" id="fileuploadTable" style="margin-bottom: 0px !important;">' +
        '<thead>' +
        '<tr>' +
        '<th class="text-center">'+siNoHeader+'</th>' +
        '<th class="text-center">'+fileNameHeader+'</th>' +
        '<th class="text-center">'+uploadedOnHeader+'</th>' +
        '<th class="text-center">'+sizeHeader+'</th>' +
        '<th class="text-center">'+typeHeader+'</th>' +
        '<th class="text-center">'+actionsHeader+'</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        uploadShowData +
        '</tbody>' +
        '</table>' +
        '</div>';

    $("#listfileuploadTableData").html(table);
    
    // Initialize tooltips
    $('[rel="tooltip"]').tooltip();
    
    // Initialize paging if the plugin exists
    if ($.fn.paging) {
        $("#fileuploadTable").paging({ limit: 5 });
    }
}



$("#file_upload_popup").click(function(){	
	$.ajax({
		url : "/stratroom/meetingManagement/" + attachmentdeleteId,
		async:false,
		method:'GET',
		success : function(data,status){
			swotupdateDescription	=	data			
			attachment = data.meetingManagementValue.attachment;		
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
				"meetingManagementId":swotGlobalid
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
	if(swotObj.meetingManagementValue.attachment !=	undefined){
		swotObj.meetingManagementValue.attachment	=	attachment;
	}else{
		swotObj.meetingManagementValue.attachment	=	finalatt;
	}*/
	
	$.ajax({
        url: "/stratroom/meetingAttach/",
        async:false,
		method:'PUT',
        contentType: "application/json",
        data: JSON.stringify(objvalue),
        success: function (result, status) {
        	$.ajax({
        		url : "/stratroom/meetingAttachList/" + swotGlobalid,
        		async:false,
        		method:'GET',
        		success : function(datafile,status){
        			var systemip = 	localStorage.getItem('systemip');
    				var action 	= 	"Meeting Attachment Uploaded";
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
		url : "/stratroom/meetingManagement/" + id,		
		method:'GET',		
        async:false,
		success : function(data,status){			
			swotupdateDescription	=	data;			
			del_attachment = data.meetingManagementValue.attachment;			
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
	if(swotObj.meetingManagementValue.attachment !=	undefined){
		swotObj.meetingManagementValue.attachment	=	del_attachment;
	}else{
		swotObj.meetingManagementValue.attachment	=	del_attachment;
	}*/
	if(attachmentObjId	==	""){
		return false;
	}
	$.ajax({
        url: "/stratroom/meetingAttach/"+attachmentObjId,
        method: 'DELETE',
        async:false,
        contentType: "application/json",
        success: function (data, status) {
        	$.ajax({
        		url : "/stratroom/meetingAttachList/" + swotGlobalid,
        		async:false,
        		method:'GET',
        		success : function(datafile,status){
        			var systemip = 	localStorage.getItem('systemip');
        			var action 	= 	"Meeting Attachment Deleted";
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

function uploadShow1(){		
	$.ajax({
		url : "/stratroom/meetingManagement/" + attachmentdeleteId,		
		method:'GET',
		 async:false,
		success : function(data,status){				
			uploadShow(data.meetingManagementValue.attachment);
		},
		error:readErrorMsg
	});	
			 
}


var update_attachment = [];
var updateattachementId ='';
var updateattachementObjId ='';
function updateAttachment(id, objId){	
	value = $(this)	
	updateattachementId = id;
	updateattachementObjId = objId;
	/*$.ajax({
		url : "/stratroom/meetingManagement/" + id,
		async:false,
		method:'GET',
		success : function(data,status){
			//swotupdateDescription	=	data;			
			//update_attachment = data.meetingManagementValue.attachment;			
		},
		error:readErrorMsg
	});*/
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
		/*   for (var i in update_attachment) {
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
	if(swotObj.meetingManagementValue.attachment !=	undefined){
		swotObj.meetingManagementValue.attachment	=	update_attachment;
	} else {
		swotObj.meetingManagementValue.attachment	=	update_attachment;
	}*/
	
	var objvalue = {
			"id":updateattachementObjId,
			"name":words[0],
			"type":words[words.length - 1],
			"size":bytesToSize(file.size),
			"file":readerValue,
			"active":0,
			"meetingManagementId":swotGlobalid
	}
	
	$.ajax({
        url: "/stratroom/meetingAttach",
        method: 'PUT',
        async:false,
        contentType: "application/json",
        data: JSON.stringify(objvalue),
        success: function (data, status) {
        	$.ajax({
        		url : "/stratroom/meetingAttachList/" + swotGlobalid,
        		async:false,
        		method:'GET',
        		success : function(datafile,status){
        			var systemip = 	localStorage.getItem('systemip');
    				var action 	= 	"Meeting Attachment Modified";
    				var navigateempId = $("#userPrincipalnavigate").val();
				    var data	=	{"createdBy":currentEmp,"userId":navigateempId,"typeId":swotGlobalid,"action":action,"systemIp":systemip};
    				auditrailpage(data,'file');
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

$(document).on("click", "#allusersaccess", function() {
    if(editpermission == false && createpermission == false) {
        return false;
    }
    
    var propcheck = $(this).is(":checked");
    
   
    var checkboxes = $(".add-attendeesnotes input[type='checkbox'][name='attendees']");
    
    if(propcheck == true) {
        checkboxes.prop("checked", true);
    } else {
        checkboxes.prop("checked", false);
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

$("#searchrecommendation").on("keyup", function () {
  var value = $(this).val().toLowerCase();
  $(".listusers .employe_content_border h5").filter(function (e) {
    var FindElement = $(this).closest("div.employe_content_border");
    //var FindElement	=	$(this).closest("div.employe_content_border").find(".profile_content");
    if ($(this).text().toLowerCase().indexOf(value) > -1) {
      $(FindElement).attr("style", "display:block !important");
    } else {
      $(FindElement).attr("style", "display:none !important");
    }
  });
});
// $("#searchrecommendation").on("keyup", function() {
// 	var value = $(this).val().toLowerCase();
// 	$(".listusers .employe_content_border h5").filter(function(e) {
// 		var FindElement	=	$(this).closest("div.employe_content_border");
// 		//var FindElement	=	$(this).closest("div.employe_content_border").find(".profile_content");
// 		if($(this).text().toLowerCase().indexOf(value) > -1){
// 			$(FindElement).attr("style","display:block !important");
// 		}else{
// 			$(FindElement).attr("style","display:none !important");
// 		}
//     });
// });

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
        swotObj.meetingManagementValue.multipleOwners = currentEmp;    
    } else {
        swotObj.meetingManagementValue.multipleOwners = multiowners.join(',');
    }
    
    var methodType = 'put';
    
    $.ajax({
        url: "/stratroom/meetingManagement/",
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



function copyToClipboard(linkText) {
    navigator.clipboard.writeText(linkText).then(
        function () {
            // Success: Change button text to "Copied!"
            alert("Link copied to clipboard!");
        },
        function (err) {
            console.error("Could not copy text: ", err);
            alert("Failed to copy. Please try again.");
        }
    );
}



function deleteRowData(rowElement) {
  var row = rowElement.closest('tr');



  $(row).find('.date_pickers_single').datepicker('destroy');


  $(row).find('[data-toggle="tooltip"]').tooltip('dispose');


  row.remove();

  
}



// Language workflow
const page_meetings_en = {

    "page": {
        "meetings": {
            "title": "Meetings",
            "createMeeting": "Create Meeting",
            "save": "Save",
            "cancel": "Cancel",
            "createMeetingItems": {
                "subject": "Subject",
                "meeting_link": "Meeting Link",
                "location": "Location",
                "from_date_time": "From Date & Time",
                "to_date_time": "To Date & Time",
                "status": "Status",
                "statusOptions": {
                    "choose": "Choose",
                    "scheduled": "Scheduled",
                    "rescheduled": "Rescheduled",
                    "ongoing": "Ongoing",
                    "completed": "Completed",
                    "cancelled": "Cancelled"
                },
                "save": "Save",
                "cancel": "Cancel"
            },
            "meetingsList": "Meetings List",
            "meetingsListItems": {
                "meeting_link": "Meeting Link",
                "copy_link": "Copy Link",
                "location": "Location",
                "status": "Status",
                "to_date_time": "To Date & Time",
                "from_date_time": "From Date & Time",
                "attendees": "Attendees",
                "initiated_by": "Initiated By"
            },
            "meetingsListAction": {

                "attachments": "Attachments",
                "attachmentsItems": {
                    "upload": "Upload",
                    "choose_file": "Choose File",
                    "no_file_chosen": "No file chosen",
                    "upload_button": "Upload",
                    "upload_info": "Supported file type (jpeg,pdf,pptx,xlsx,docx)",
                    "sr_no": "Sr. No.",
                    "file_name": "File Name",
                    "uploaded_on": "Uploaded On",
                    "size": "File Size",
                    "type": "File Type",
                    "actions": "File Actions"

                },
                "action": "Action",
                "actionItems": {
                    "recommendation": "Recommendation",
                    "responsible": "Responsible",
                    "byDate": "By Date",
                    "status": "Status",
                    "statusItems": {
                        "choose": "Select Status",
                        "pending": "Pending",
                        "completed": "Completed"
                    },
                    "actions": "Actions"
                },
                "notes": "Notes",
                "notesItems": {
                    "recommendation": "Recommendation",
                    "responsible": "Responsible",
                    "actions": "Actions"

                }

            }

        }
    }
}


const page_meetings_am = {
  "page": {
    "meetings": {
      "title": "የስብሰባዎች",
      "createMeeting": "ስብሰባ መፍጠር",
      "save": "አስቀምጥ",
      "cancel": "ተወው",
      "createMeetingItems": {
        "subject": "ርዕስ",
        "meeting_link": "የስብሰባ አገናኝ",
        "location": "ቦታ",
        "from_date_time": "ከ ቀን እና ሰዓት",
        "to_date_time": "እስከ ቀን እና ሰዓት",
        "status": "ሁኔታ",
        "statusOptions": {
          "choose": "ይምረጡ",
          "scheduled": "ታቅዷል",
          "rescheduled": "እንደገና ታቅዷል",
          "ongoing": "በሂደት ላይ",
          "completed": "ተጠናቋል",
          "cancelled": "ተሰርዟል"
        },
        "save": "አስቀምጥ",
        "cancel": "ተወው"
      },
      "meetingsList": "የስብሰባዎች ዝርዝር",
      "meetingsListItems": {
        "meeting_link": "የስብሰባ አገናኝ",
        "copy_link": "አገናኝ ቅዳ",
        "location": "ቦታ",
        "status": "ሁኔታ",
        "to_date_time": "እስከ ቀን እና ሰዓት",
        "from_date_time": "ከ ቀን እና ሰዓት",
        "attendees": "ተሳታፊዎች",
        "initiated_by": "የጀመረው"
      },
      "meetingsListAction": {
        "attachments": "የተያያዙ ፋይሎች",
        "attachmentsItems": {
          "upload": "መጫን",
          "choose_file": "ፋይል ይምረጡ",
          "no_file_chosen": "ምንም ፋይል አልተመረጠም",
          "upload_button": "መጫን",
          "upload_info": "የሚደገፉ የፋይል አይነቶች (jpeg,pdf,pptx,xlsx,docx)",
          "sr_no": "ተ.ቁ.",
          "file_name": "የፋይል ስም",
          "uploaded_on": "የተጫነበት ቀን",
          "size": "የፋይል መጠን",
          "type": "የፋይል አይነት",
          "actions": "የፋይል እርምጃዎች"
        },
        "action": "እርምጃ",
        "actionItems": {
          "recommendation": "ምክር",
          "responsible": "ተጠያቂ",
          "byDate": "በቀን",
          "status": "ሁኔታ",
          "statusItems": {
            "choose": "ሁኔታ ይምረጡ",
            "pending": "በመጠባበቅ ላይ",
            "completed": "ተጠናቋል"
          },
          "actions": "እርምጃዎች"
        },
        "notes": "ማስታወሻዎች",
        "notesItems": {
          "recommendation": "ምክር",
          "responsible": "ተጠያቂ",
          "actions": "እርምጃዎች"
        }
      }
    }
  }
};




const page_meetings_ar = {

  "page": {
    "meetings": {
      "title": "الاجتماعات",
      "meetingsList": "قائمة الاجتماعات",
			"save": "حفظ",
            "cancel": "إلغاء",
      "createMeetingItems": {
        "subject": "الموضوع",
        "meeting_link": "رابط الاجتماع",
    "location": "الموقع",
    "to_date_time": "إلى التاريخ والوقت",
    "from_date_time": "من التاريخ والوقت",
    "status": "الحالة",
    "statusOptions": {
      "choose": "اختر",
      "scheduled": "مجدول",
      "rescheduled": "أعيد جدولته",
      "ongoing": "جاري",
      "completed": "مكتمل",
      "cancelled": "ملغي"
    },
    "save": "حفظ",
    "cancel": "إلغاء"
      },
       "createMeeting": "إنشاء اجتماع",
      "meetingsListItems": {
        "meeting_link": "رابط الاجتماع",
        "copy_link": "نسخ الرابط",
        "location": "الموقع",
        "status": "الحالة",
        "to_date_time": "إلى التاريخ والوقت",
        "from_date_time": "من التاريخ والوقت",
        "attendees": "المشاركون",
        "initiated_by": "تمت المبادرة من"
      },
      "meetingsListAction": {
            "attachments": "المرفقات",
            "attachmentsItems": {
              "upload": "رفع",
              "choose_file": "اختر ملف",
              "no_file_chosen": "لم يتم اختيار ملف",
              "upload_button": "رفع",
              "upload_info": "نوع الملف المدعوم (jpeg,pdf,pptx,xlsx,docx)",
              "sr_no": "الرقم التسلسلي",
              "file_name": "اسم الملف",
              "uploaded_on": "تاريخ الرفع",
              "size": "حجم الملف",
              "type": "نوع الملف",
              "actions": "إجراءات الملف"
            },
            "action": "الإجراء",
            "actionItems": {
              "recommendation": "التوصية",
              "responsible": "المسؤول",
               "byDate": "بحسب التاريخ",
              "status": "الحالة",
              "statusItems": {
                "choose": "اختر الحالة",
                "pending": "قيد الانتظار",
                "completed": "مكتمل"
              },
              "actions": "الإجراءات"
            },
            "notes": "ملاحظات",
            "notesItems": {
            "recommendation": "التوصية",
            "responsible": "المسؤول",
            "actions": "الإجراءات"
            }

            }
    }
  }
}



// Helper to get nested property
function getNestedValue(obj, path) {
  return path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : null, obj);
}

// Load language for all elements with data-translate
function loadLanguage(lang) {
  let translation;

  if (lang === 'ar') {
    translation = page_meetings_ar;
  } else if(lang == "am"){ 
    translation = page_meetings_am;
  }else {
    translation = page_meetings_en;
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