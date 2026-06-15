var swottype = "";
var radioValue = "";
var currentEmp = $("#userPrincipal").val().trim();
var topparentswotDetails = {};
var reporteelist = [];
var checkedEmployeeIds = [];
 var employeeListData = [];
var kpiList = [];
var swotupdateDescription = [];
var pageNo = $("#pagenumber").val();
var swotmodPermission = [];
var createpermission = false;
var editpermission = false;
var deletepermission = false;
var viewpermission = false;
var meetingsloadcontent = false;
var deptlist = {};
var reccreatepermission = false;
var receditpermission = false;
var recdeletepermission = false;
var recviewpermission = false;
var recloadcontent = false;

var actioncreatepermission = false;
var actioneditpermission = false;
var actiondeletepermission = false;
var actionviewpermission = false;
var actionloadcontent = false;

var attcreatepermission = false;
var atteditpermission = false;
var attdeletepermission = false;
var attviewpermission = false;
var attloadcontent = false;

var swotGlobalid = "";

if (
  $("#userrolename").val() == "Super User" ||
  $("#userrolename").val() == "Admin"
) {
  if ($("#userPrincipal").val() != $("#userPrincipalnavigate").val()) {
    //$(".subusermenuname").text('Risk Management');
    if ($(".topmenubreadcrumb").length) {
      $(".topmenubreadcrumb").show();
    }
    if ($(".sidebarNavigate").length) {
      $(".sidebarNavigate").show();
    }
  }
}

function getswotpermission() {
  $.ajax({
    type: "GET",
    url: "/stratroom/user/modulePermissions?moduleName=SWOT",
    async: false,
    success: function (data) {
      if (data.SWOT != undefined && !jQuery.isEmptyObject(data.SWOT)) {
        swotmodPermission = data.SWOT.SWOT;
        //rec
        if (
          data.SWOT.Recommendations.privilegeCreate != undefined &&
          data.SWOT.Recommendations.privilegeCreate == "TRUE"
        ) {
          reccreatepermission = true;
        }
        if (
          data.SWOT.Recommendations.privilegeUpdate != undefined &&
          data.SWOT.Recommendations.privilegeUpdate == "TRUE"
        ) {
          receditpermission = true;
        }
        if (
          data.SWOT.Recommendations.privilegeDelete != undefined &&
          data.SWOT.Recommendations.privilegeDelete == "TRUE"
        ) {
          recdeletepermission = true;
        }
        if (
          data.SWOT.Recommendations.privilegeView != undefined &&
          data.SWOT.Recommendations.privilegeView == "TRUE"
        ) {
          recviewpermission = true;
        }
        //action
        if (
          data.SWOT.Actions.privilegeCreate != undefined &&
          data.SWOT.Actions.privilegeCreate == "TRUE"
        ) {
          actioncreatepermission = true;
        }
        if (
          data.SWOT.Actions.privilegeUpdate != undefined &&
          data.SWOT.Actions.privilegeUpdate == "TRUE"
        ) {
          actioneditpermission = true;
        }
        if (
          data.SWOT.Actions.privilegeDelete != undefined &&
          data.SWOT.Actions.privilegeDelete == "TRUE"
        ) {
          actiondeletepermission = true;
        }
        if (
          data.SWOT.Actions.privilegeView != undefined &&
          data.SWOT.Actions.privilegeView == "TRUE"
        ) {
          actionviewpermission = true;
        }

        //Attachments
        if (
          data.SWOT.Attachments.privilegeCreate != undefined &&
          data.SWOT.Attachments.privilegeCreate == "TRUE"
        ) {
          attcreatepermission = true;
        }
        if (
          data.SWOT.Attachments.privilegeUpdate != undefined &&
          data.SWOT.Attachments.privilegeUpdate == "TRUE"
        ) {
          atteditpermission = true;
        }
        if (
          data.SWOT.Attachments.privilegeDelete != undefined &&
          data.SWOT.Attachments.privilegeDelete == "TRUE"
        ) {
          attdeletepermission = true;
        }
        if (
          data.SWOT.Attachments.privilegeView != undefined &&
          data.SWOT.Attachments.privilegeView == "TRUE"
        ) {
          attviewpermission = true;
        }
      }
    },
  });
}

$(function () {
  getpageName();
  getdeptlist();
  getswotpermission();
  $.notify.addStyle("success", {
    html: "<div><i class='fa fa-check-circle fa-lg' aria-hidden='true'></i>&nbsp; <span data-notify-text/></div>",
    classes: {
      base: {
        "white-space": "nowrap",
        "background-color": "grey",
        padding: "10px",
        "text-align": "center",
        "border-radius": "4px",
        color: "white",
      },
      graynotify: {
        color: "white",
        "background-color": "grey",
      },
    },
  });

  $.notify.addStyle("error", {
    html: "<div><i class='fa fa-times-circle' aria-hidden='true'></i>&nbsp; <span data-notify-text/></div>",
    classes: {
      base: {
        "white-space": "nowrap",
        "background-color": "grey",
        padding: "10px",
        "text-align": "center",
        "border-radius": "4px",
        color: "white",
      },
      graynotify: {
        color: "white",
        "background-color": "grey",
      },
    },
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

  $("#my_id").change(function (e) {
    var files = $(this)[0].files;
    var fileName = files.length;
    alert('The file "' + fileName + '" has been selected.');
  });

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

  $('input[type="checkbox"]').click(function () {
    if ($(this).is(":checked")) {
      console.log("Checkbox is checked.");
    } else if ($(this).is(":not(:checked)")) {
      console.log("Checkbox is unchecked.");
    }
  });

  swottype = localStorage.getItem("swotcall_list");
  // if (swottype == "" || swottype == undefined) {
  //   swottype = "Strengths";
  // }
  if (swottype == "Strengths") {
    $("#strength_list").addClass("activeswotwrap");
  } else if (swottype == "Weaknesses") {
    $("#weaknesses_list").addClass("activeswotwrap");
  } else if (swottype == "Oppurtunities") {
    $("#oppurtunities_list").addClass("activeswotwrap");
  } else if (swottype == "Threats") {
    $("#threats_list").addClass("activeswotwrap");
  }

  $.each(reporteelist, function (ownkey, empvalue) {
    if (empvalue.id == currentEmp) {
      topparentswotDetails = {
        id: empvalue.id,
        name: empvalue.name,
        image: empvalue.image,
        dept: empvalue.dept,
      };
    }
  });

  if (
    swotmodPermission.privilegeCreate != undefined &&
    swotmodPermission.privilegeCreate == "TRUE"
  ) {
    createpermission = true;
  }

  if (
    swotmodPermission.privilegeUpdate != undefined &&
    swotmodPermission.privilegeUpdate == "TRUE"
  ) {
    editpermission = true;
  }

  if (
    swotmodPermission.privilegeDelete != undefined &&
    swotmodPermission.privilegeDelete == "TRUE"
  ) {
    deletepermission = true;
  }

  if (
    swotmodPermission.privilegeView != undefined &&
    swotmodPermission.privilegeView == "TRUE"
  ) {
    viewpermission = true;
  }

  if (enableaccesscontrolMenu == true) {
    //createpermission	=	true;
    //editpermission		=	true;
    //deletepermission	=	true;
    //viewpermission		=	true;
  }

  if (
    createpermission == true ||
    editpermission == true ||
    deletepermission == true ||
    viewpermission == true
  ) {
    meetingsloadcontent = true;
  }

  if (
    reccreatepermission == true ||
    receditpermission == true ||
    recdeletepermission == true ||
    recviewpermission == true
  ) {
    recloadcontent = true;
  }

  if (
    attcreatepermission == true ||
    atteditpermission == true ||
    attdeletepermission == true ||
    attviewpermission == true
  ) {
    attloadcontent = true;
  }

  if (
    actioncreatepermission == true ||
    actioneditpermission == true ||
    actiondeletepermission == true ||
    actionviewpermission == true
  ) {
    actionloadcontent = true;
  }

  if (reccreatepermission == false) {
    $(".addmeetingoption").remove();
    $(".closemeetingoption").show();
  } else {
    $(".closemeetingoption").hide();
  }

  if (!actioncreatepermission) {
    $(".addactmeetingoption").remove();
    $(".closeactmeetingoption").show();
  } else {
    $(".closeactmeetingoption").hide();
  }

  if (!attcreatepermission) {
    $(".addfilemeetingoption").remove();
  }
  if (meetingsloadcontent) {
    getSwotList(swottype);
  } else {
    $(".sidebarcontent,.container-fluid,.page-header").show();
  }

  getreportee();
});

function getpageName() {
  $.ajax({
    url: "/stratroom/pages/" + pageNo,
    async: false,
    success: function (data) {
      $(".page-title").html(data.pageName);
      if ($("#userPrincipal").val() != $("#userPrincipalnavigate").val()) {
        $("." + data.id).addClass("homepageHighlight");
      }
      if ($(".superusertopmenu").hasClass(data.id)) {
        $(".subusermenuname").text(data.pageName);
      }
    },
  });
}

function getNewOwners(oldowners, newowners) {
  var oldown = oldowners?.split(",");
  var newown = newowners?.split(",");
  var str2 = [];
  for (var i = 0; i < newown.length; i++) {
    if (oldown.indexOf(newown[i]) == -1) {
      str2 += newown[i] + ",";
    }
  }
  var newowner = [];
  newowner = str2.slice(0, -1);
  return newowner;
}
function getreportee() {
  if (jQuery.isEmptyObject(reporteelist)) {
    $.ajax({
      url: "/stratroom/user/moduleAccessUserList?moduleName=SWOT",
      async: false,
      success: function (employeeList) {
        reporteelist = employeeList;
      },
    });
  }
}

function checkmodalisclosedornot() {
  if ($("#recommendation").is(":visible") == true) {
    $(document.body).addClass("modal-open");
  }
  if ($("#addpeople").is(":visible") == false) {
    $(document.body).addClass("modal-open");
  }

  if ($("#uploaded_files").is(":visible") == true) {
    $(document.body).addClass("modal-open");
  }

  if ($("#file_upload_popup").is(":visible") == false) {
    $(document.body).addClass("modal-open");
  }

  setTimeout(function () {
    $(document.body).addClass("modal-open");
  }, 1000);
}

$("#closePopupId,#actionsclosePopupId").click(function () {
  checkmodalisclosedornot();
});

var people_selectedList = "";

function recommendationaddpeople(id) {
  console.log(id, "idddd");
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

$(document).on("show.bs.modal", ".modal", function (event) {
  var zIndex = 1040 + 10 * $(".modal:visible").length;
  $(this).css("z-index", zIndex);
  setTimeout(function () {
    $(".modal-backdrop")
      .not(".modal-stack")
      .css("z-index", zIndex - 1)
      .addClass("modal-stack");
  }, 0);
});

$("#peopleSave").click(function () {
  var multiowners = $("input[name='swot_rec_owner[]']:checked")
    .map(function () {
      return this.value;
    })
    .get();

  var res_peopleid = $("#responsibleid").val();
  if (multiowners.length == 0) {
    $("#rec_multiownerid_" + res_peopleid).val(currentEmp);
  } else {
    $("#rec_multiownerid_" + res_peopleid).val(multiowners.join(","));
  }
  $("#addpeople").modal("hide");
  checkmodalisclosedornot();
});

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
			url: "/stratroom/user/moduleAccessUserList?moduleName=SWOT",
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


// function recommendationPorfileContent(usersimg, resultId) {
//   var returnresult = [];
//   var functionParams = resultId;
//   var functionName = "";
//   var modalPopupName = 'data-toggle="modal" data-target="#addpeople"';
//   var profileBadgeIncrement = "";
//   var htmlcontent =
//     '<input type="hidden" class="rec_multiownerid" id="rec_multiownerid_' +
//     resultId +
//     '" value="' +
//     usersimg +
//     '">';
//   var multiowners = usersimg.split(",");

//   returnresult["userownerlist_data"] = htmlcontent;

//   functionName = "recommendationaddpeople";

//   if (jQuery.isEmptyObject(reporteelist)) {
//     $.ajax({
//       url: "/stratroom/user/moduleAccessUserList?moduleName=SWOT",
//       success: function (data, status) {
//         var subinitiativeUser = "";
//         if (multiowners.length != data.length) {
//           var profileBadgeIncrement =
//             multiowners.length >= 3
//               ? parseInt(multiowners.length) - parseInt(2)
//               : "";
//           var badgeinc = false;
//           var subinitiativeUser = "";
//           $.each(data, function (key, users) {
//             $.each(multiowners, function (index, selectedvalue) {
//               if (selectedvalue == users.id) {
//                 var username =
//                   users.name == undefined || users.name == ""
//                     ? "User"
//                     : users.name;
//                 var userProfileConcate =
//                   users.image == undefined || users.image == ""
//                     ? "data-name='" +
//                       username +
//                       "' class='rounded-circle rec_res_multiuserimage' "
//                     : "src='" + users.image + "' class='rounded-circle' ";

//                 if (index <= 2) {
//                   subinitiativeUser +=
//                     '<li class="avatar avatar-xs pull-up" ' +
//                     modalPopupName +
//                     " onclick=" +
//                     functionName +
//                     "(" +
//                     functionParams +
//                     ') data-selecteduser="' +
//                     users.id +
//                     '"><img ' +
//                     userProfileConcate +
//                     ' alt="' +
//                     username +
//                     '" width="50"></li>';
//                 }

//                 if (multiowners.length >= 3 && index >= 2 && index <= 2) {
//                   badgeinc = true;
//                   subinitiativeUser = subinitiativeUser.replace(
//                     '<li class="avatar avatar-xs pull-up" ' +
//                       modalPopupName +
//                       " onclick=" +
//                       functionName +
//                       "(" +
//                       functionParams +
//                       ') data-selecteduser="' +
//                       users.id +
//                       '"><img ' +
//                       userProfileConcate +
//                       ' alt="' +
//                       username +
//                       '" width="50"></li>',
//                     ""
//                   );
//                   subinitiativeUser +=
//                     '<li class="avatar avatar-xs pull-up" ' +
//                     modalPopupName +
//                     " onclick=" +
//                     functionName +
//                     "(" +
//                     functionParams +
//                     ') data-selecteduser="' +
//                     users.id +
//                     '"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
//                     profileBadgeIncrement +
//                     "</span></li>";
//                   return false;
//                 }
//               }
//             });
//           });
//           if (badgeinc == false) {
//             subinitiativeUser =
//               subinitiativeUser +
//               '<li class="avatar avatar-xs pull-up" ' +
//               modalPopupName +
//               " onclick=" +
//               functionName +
//               "(" +
//               functionParams +
//               ')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
//               profileBadgeIncrement +
//               "</span></li>";
//           }
//           returnresult["userownerlist"] = subinitiativeUser;
//         } else {
//           var profileBadgeIncrement =
//             data.length >= 3 ? parseInt(data.length) - parseInt(2) : 0;
//           var badgeinc = false;
//           var subinitiativeUser = "";
//           $.each(data, function (index, users) {
//             var username =
//               users.name == undefined || users.name == "" ? "User" : users.name;
//             var userProfileConcate =
//               users.image == undefined || users.image == ""
//                 ? "data-name='" +
//                   username +
//                   "' class='rounded-circle rec_res_multiuserimage' "
//                 : "src='" + users.image + "' class='rounded-circle' ";
//             if (index <= 2) {
//               subinitiativeUser +=
//                 '<li class="avatar avatar-xs pull-up" ' +
//                 modalPopupName +
//                 " onclick=" +
//                 functionName +
//                 "(" +
//                 functionParams +
//                 ') data-selecteduser="' +
//                 users.id +
//                 '"><img ' +
//                 userProfileConcate +
//                 ' alt="' +
//                 username +
//                 '" width="50"></li>';
//             }

//             if (multiowners.length >= 3 && index >= 2 && index <= 2) {
//               badgeinc = true;
//               subinitiativeUser = subinitiativeUser.replace(
//                 '<li class="avatar avatar-xs pull-up" ' +
//                   modalPopupName +
//                   " onclick=" +
//                   functionName +
//                   "(" +
//                   functionParams +
//                   ') data-selecteduser="' +
//                   users.id +
//                   '"><img ' +
//                   userProfileConcate +
//                   ' alt="' +
//                   username +
//                   '" width="50"></li>',
//                 ""
//               );
//               subinitiativeUser +=
//                 '<li class="avatar avatar-xs pull-up" ' +
//                 modalPopupName +
//                 " onclick=" +
//                 functionName +
//                 "(" +
//                 functionParams +
//                 ') data-selecteduser="' +
//                 users.id +
//                 '"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
//                 profileBadgeIncrement +
//                 "</span></li>";
//               return false;
//             }
//           });

//           if (badgeinc == false) {
//             subinitiativeUser =
//               subinitiativeUser +
//               '<li class="avatar avatar-xs pull-up" ' +
//               modalPopupName +
//               " onclick=" +
//               functionName +
//               "(" +
//               functionParams +
//               ')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
//               profileBadgeIncrement +
//               "</span></li>";
//           }
//           returnresult["userownerlist"] = subinitiativeUser;
//         }
//       },
//     });
//   } else {
//     if (multiowners.length != reporteelist.length) {
//       var profileBadgeIncrement =
//         multiowners.length >= 3
//           ? parseInt(multiowners.length) - parseInt(2)
//           : "";
//       var badgeinc = false;
//       var subinitiativeUser = "";
//       $.each(reporteelist, function (key, users) {
//         $.each(multiowners, function (index, selectedvalue) {
//           if (selectedvalue == users.id) {
//             var username =
//               users.name == undefined || users.name == "" ? "User" : users.name;
//             var userProfileConcate =
//               users.image == undefined || users.image == ""
//                 ? "data-name='" +
//                   username +
//                   "' class='rounded-circle rec_res_multiuserimage' "
//                 : "src='" + users.image + "' class='rounded-circle' ";

//             if (index <= 2) {
//               subinitiativeUser +=
//                 '<li class="avatar avatar-xs pull-up" ' +
//                 modalPopupName +
//                 " onclick=" +
//                 functionName +
//                 "(" +
//                 functionParams +
//                 ') data-selecteduser="' +
//                 users.id +
//                 '"><img ' +
//                 userProfileConcate +
//                 ' alt="' +
//                 username +
//                 '" width="50"></li>';
//             }

//             if (multiowners.length >= 3 && index >= 2 && index <= 2) {
//               badgeinc = true;
//               subinitiativeUser = subinitiativeUser.replace(
//                 '<li class="avatar avatar-xs pull-up" ' +
//                   modalPopupName +
//                   " onclick=" +
//                   functionName +
//                   "(" +
//                   functionParams +
//                   ') data-selecteduser="' +
//                   users.id +
//                   '"><img ' +
//                   userProfileConcate +
//                   ' alt="' +
//                   username +
//                   '" width="50"></li>',
//                 ""
//               );
//               subinitiativeUser +=
//                 '<li class="avatar avatar-xs pull-up" ' +
//                 modalPopupName +
//                 " onclick=" +
//                 functionName +
//                 "(" +
//                 functionParams +
//                 ') data-selecteduser="' +
//                 users.id +
//                 '"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
//                 profileBadgeIncrement +
//                 "</span></li>";
//               return false;
//             }
//           }
//         });
//       });
//       if (badgeinc == false) {
//         subinitiativeUser =
//           subinitiativeUser +
//           '<li class="avatar avatar-xs pull-up" ' +
//           modalPopupName +
//           " onclick=" +
//           functionName +
//           "(" +
//           functionParams +
//           ')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
//           profileBadgeIncrement +
//           "</span></li>";
//       }
//       returnresult["userownerlist"] = subinitiativeUser;
//     } else {
//       var profileBadgeIncrement =
//         reporteelist.length >= 3
//           ? parseInt(reporteelist.length) - parseInt(2)
//           : 0;
//       var badgeinc = false;
//       var subinitiativeUser = "";
//       $.each(reporteelist, function (index, users) {
//         var username =
//           users.name == undefined || users.name == "" ? "User" : users.name;
//         var userProfileConcate =
//           users.image == undefined || users.image == ""
//             ? "data-name='" +
//               username +
//               "' class='rounded-circle rec_res_multiuserimage' "
//             : "src='" + users.image + "' class='rounded-circle' ";
//         if (index <= 2) {
//           subinitiativeUser +=
//             '<li class="avatar avatar-xs pull-up" ' +
//             modalPopupName +
//             " onclick=" +
//             functionName +
//             "(" +
//             functionParams +
//             ') data-selecteduser="' +
//             users.id +
//             '"><img ' +
//             userProfileConcate +
//             ' alt="' +
//             username +
//             '" width="50"></li>';
//         }

//         if (multiowners.length >= 3 && index >= 2 && index <= 2) {
//           badgeinc = true;
//           subinitiativeUser = subinitiativeUser.replace(
//             '<li class="avatar avatar-xs pull-up" ' +
//               modalPopupName +
//               " onclick=" +
//               functionName +
//               "(" +
//               functionParams +
//               ') data-selecteduser="' +
//               users.id +
//               '"><img ' +
//               userProfileConcate +
//               ' alt="' +
//               username +
//               '" width="50"></li>',
//             ""
//           );
//           subinitiativeUser +=
//             '<li class="avatar avatar-xs pull-up" ' +
//             modalPopupName +
//             " onclick=" +
//             functionName +
//             "(" +
//             functionParams +
//             ') data-selecteduser="' +
//             users.id +
//             '"><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
//             profileBadgeIncrement +
//             "</span></li>";
//           return false;
//         }
//       });

//       if (badgeinc == false) {
//         subinitiativeUser =
//           subinitiativeUser +
//           '<li class="avatar avatar-xs pull-up" ' +
//           modalPopupName +
//           " onclick=" +
//           functionName +
//           "(" +
//           functionParams +
//           ')><span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+' +
//           profileBadgeIncrement +
//           "</span></li>";
//       }
//       returnresult["userownerlist"] = subinitiativeUser;
//     }
//   }
//   return returnresult;
// }

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
      url: "/stratroom/user/moduleAccessUserList?moduleName=SWOT",
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

function strengthListShow(swotList, typerequest) {
  console.log(swotList, typerequest, "swotList");


  var Strengths = "STRENGTHS";
  var Weaknesses = "WEAKNESSES";
  var Oppurtunities = "OPPURTUNITIES";
  var Threats = "THREATS";
  var BusinessImpact = "BUSINESS IMPACT";
  var Department = "Department";
  var NextDue = "Next Due";
  var Responsible = "Responsible";
  var SWOT = "SWOT";

  const storedLanguage = localStorage.getItem("selectedLang") || "en";

  if(storedLanguage == "en") {
    Strengths = "STRENGTHS";
    Weaknesses = "WEAKNESSES";
    Oppurtunities = "OPPURTUNITIES";
    Threats = "THREATS";
    BusinessImpact = "Business Impact";
    Department = "Department";
    NextDue = "Next Due";
    Responsible = "Responsible";
    SWOT = "SWOT";
  }else if(storedLanguage == "am"){ 
     Strengths = "ኃይሎች";
    Weaknesses = "ድክመቶች";
    Oppurtunities = "እድሎች";
    Threats = "አደጋዎች";
    BusinessImpact = "የንግድ ተፅዕኖ";
    Department = "ዳርቻ / ክፍል";
    NextDue = "ቀጣይ ጊዜ";
    Responsible = "የተጠየቀ";
    SWOT = "SWOT ትንተና";
  }else {
    Strengths = "نِقَاط القُوَّة";
    Weaknesses = "نِقَاط الضَّعْف";
    Oppurtunities = "الفرص";
    Threats = "المخاطر";
    BusinessImpact = "تأثير الأعمال";
    Department = "القسم";
    NextDue = "الموعد النهائي التالي";
    Responsible = "المسؤول";
    SWOT = "تحليل SWOT";
  }

  // Base HTML structure for SWOT analysis
  const baseHTML = `
    <div class="container-lg py-2">
      <div id="contentload">
        <div class="card custom-card" id="card-swot">
          <div class="card-header">
            <div class="c-header-left">
              <h5 class="card-title me-auto">
                <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">`+SWOT+`</strong>
              </h5>
            </div>
          </div>
          <div class="card-body">
            <ul class="nested-area swot-nested-main" id="strategy-swot">
              <!-- Strengths Section -->
              <li class="nested-item non-draggable bg-swot-1" data-id="swot-child-1">
                <div class="caret" data-toggle-id="swot-child-1" data-swot-type="Strengths"></div>
                <div class="card analysis-box parent">
                  <div class="analysis-section" id="SA-SWOT-01">
                    <div class="analysis-content">
                      <div class="icon text-white" style="width: 28px">
                       <!-- <i class="fa fa-trophy" style="font-size: 18px;"></i> --!>
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="dumbbell" style="width: 24px; height: 24px;" class="lucide lucide-dumbbell"><path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"></path><path d="m2.5 21.5 1.4-1.4"></path><path d="m20.1 3.9 1.4-1.4"></path><path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"></path><path d="m9.6 14.4 4.8-4.8"></path></svg>
                      </div>
                      <div class="content" id="strength_list">
                        <h5 class="card-title mt-1 text-white">
                          <strong>`+Strengths+`</strong>
                        </h5>
                      </div>
                    </div>
                    <div class="analysis-action">
                      <ul class="list-unstyled action-list">
                        <li>
                       <a href="#strength_desc_add_popup" data-bs-toggle="modal" 
                          onclick="handleswotevent('', 'Strength', 'add');">
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
              
              <!-- Weaknesses Section -->
              <li class="nested-item non-draggable bg-swot-2" data-id="swot-child-2">
                <div class="caret" data-toggle-id="swot-child-2" data-swot-type="Weaknesses"></div>
                <div class="card analysis-box parent">
                  <div class="analysis-section" id="SA-SWOT-02">
                    <div class="analysis-content">
                      <div class="icon text-white" style="width: 28px">
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="alert-triangle" style="width: 24px; height: 24px;" class="lucide lucide-alert-triangle"><path d="M10.29 3.86L1.82 16.14a2 2 0 0 0 1.71 3.11h16.98a2 2 0 0 0 1.71-3.11L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                      </div>
                      <div class="content" id="weaknesses_list">
                        <h5 class="card-title mt-1 text-white">
                          <strong>`+Weaknesses+`</strong>
                        </h5>
                      </div>
                    </div>
                    <div class="analysis-action">
                      <ul class="list-unstyled action-list">
                        <li>
                          <a href="#strength_desc_add_popup" data-bs-toggle="modal" onclick="handleswotevent('', 'Weaknesses', 'add');">
                            <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add Objective">
                              <i class="fa fa-plus title_edit_icon"  ></i>
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <ul class="nested nested-area"></ul>
              </li>
              
              <!-- Oppurtunities Section -->
              <li class="nested-item non-draggable bg-swot-3" data-id="swot-child-3">
                <div class="caret" data-toggle-id="swot-child-3" data-swot-type="Oppurtunities"></div>
                <div class="card analysis-box parent">
                  <div class="analysis-section" id="SA-SWOT-03">
                    <div class="analysis-content">
                      <div class="icon text-white" style="width: 28px">
                       <!-- <i class="fa fa-lightbulb-o"" style="font-size: 18px;"></i> --!>
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="lightbulb" style="width: 24px; height: 24px;" class="lucide lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>
                      </div>
                      <div class="content" id="oppurtunities_list">
                        <h5 class="card-title mt-1 text-white">
                          <strong>`+Oppurtunities+`</strong>
                        </h5>
                      </div>
                    </div>
                    <div class="analysis-action">
                      <ul class="list-unstyled action-list">
                        <li>
                          <a href="#strength_desc_add_popup" data-bs-toggle="modal" onclick="handleswotevent('', 'Oppurtunities', 'add');">
                            <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add Objective">
                              <i class="fa fa-plus title_edit_icon" ></i>
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <ul class="nested nested-area"></ul>
              </li>
              
              <!-- Threats Section -->
              <li class="nested-item non-draggable bg-swot-4" data-id="swot-child-4">
                <div class="caret" data-toggle-id="swot-child-4" data-swot-type="Threats"></div>
                <div class="card analysis-box parent">
                  <div class="analysis-section" id="SA-SWOT-04">
                    <div class="analysis-content">
                      <div class="icon text-white" style="width: 28px">
                       <!-- <i class="fa fa-exclamation-circle" style="font-size: 18px;"></i> --!>
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="bomb" style="width: 24px; height: 24px;" class="lucide lucide-bomb"><circle cx="11" cy="13" r="9"></circle><path d="M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.4 0l1.6 1.6a2.4 2.4 0 0 1 0 3.4l-1.95 1.95"></path><path d="m22 2-1.5 1.5"></path></svg>
                      </div>
                      <div class="content" id="threats_list">
                        <h5 class="card-title mt-1 text-white">
                          <strong>`+Threats+`</strong>
                        </h5>
                      </div>
                    </div>
                    <div class="analysis-action">
                      <ul class="list-unstyled action-list">
                        <li>
                          <a href="#strength_desc_add_popup" data-bs-toggle="modal" onclick="handleswotevent('', 'Threats', 'add');">
                            <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add Objective">
                              <i class="fa fa-plus title_edit_icon" ></i>
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
  $(".swotuserimage").initial({
    charCount: 2,
    height: 30,
    width: 30,
    fontSize: 18,
  });
  $('[data-toggle="tooltip"]').tooltip();
  $('[rel="tooltip"]').tooltip();
  $(".sidebarcontent,.container-fluid,.page-header").show();

  // If we have data to show immediately (from initial load)
  if (swotList && swotList.length > 0) {
    populateSwotSection(typerequest, swotList);
  }

  // Caret click handler - loads content when expanding
// $(document).on('click', '.caret', function(e) {
//     e.preventDefault();
//     e.stopPropagation();
    
//     const $caret = $(this);
//     const toggleId = $caret.data('toggle-id');
//     const $nestedItem = $caret.closest('.nested-item');
//     const $nestedArea = $nestedItem.find('.nested-area');
    
//     console.log($caret, toggleId, "caret click");
    
//     // Toggle visual state
//     $caret.toggleClass('caret-down');
//     $nestedArea.toggleClass('active');
    
//     // Determine SWOT type
//     let formattedType;
//     switch(toggleId) {
//         case "swot-child-1":
//             formattedType = "Strengths";
//             break;
//         case "swot-child-2":
//             formattedType = "Weaknesses";
//             break;
//         case "swot-child-3":
//             formattedType = "Oppurtunities"; 
//             break;
//         case "swot-child-4":
//             formattedType = "Threats";
//             break;
//         default:
//             formattedType = "Strengths";
//     }
    
//     console.log(formattedType, toggleId, "swotTypeout");
    
//     // Only load content if expanding and not already loaded
//     if ($nestedArea.hasClass('active')) {
//         loadSwotContent(formattedType, $nestedItem);
//     }
// });




  // Click handler for the main SWOT items (not the caret)
  $(document).on('click', '[id$="_list"]', function(e) {
    // Ignore if clicking on the caret
    if ($(e.target).hasClass('caret') || $(e.target).closest('.caret').length) {
      return;
    }

    const swotType = $(this).attr('id').replace('_list', '');
    
    const formattedType = formatSwotType(swotType);

    console.log(swotType, formattedType, "swotType");
    
    if (!$(this).hasClass('activeswotwrap')) {
      loadSwotContent(formattedType, $(this).closest('.nested-item'));
    }
  });

  // Format SWOT type correctly
  function formatSwotType(type) {
    const mappings = {
      'strength': 'Strengths',
      'weaknesses': 'Weaknesses',
      'oppurtunities': 'Oppurtunities',
      'threats': 'Threats'
    };
    return mappings[type.toLowerCase()] || type;
  }



  // Populate a SWOT section with data
  function populateSwotSection(typerequest, swotList) {
    let colorwrap = "";
    let swottexttype = "";
    
    // Determine styling based on SWOT type
    if (typerequest == "Strengths") {
      colorwrap = "strengthwrap";
      swottexttype = "S";
    } else if (typerequest == "Weaknesses") {
      colorwrap = "weaknesswrap";
      swottexttype = "W";
    } else if (typerequest == "Oppurtunities") {
      colorwrap = "opportunitieswrap";
      swottexttype = "O";
    } else if (typerequest == "Threats") {
      colorwrap = "threatswrap";
      swottexttype = "T";
    }
    
    // Create the items for this SWOT section
    let itemsHTML = "";
     
    // Add each SWOT item
    $.each(swotList, function(i, List) {
      // Determine status flag color
      let flagcolor = "#20eaab";
      const status_flag_text = List.swotAnalysisValue.status_flag;
      if (status_flag_text == "warning") {
        flagcolor = "#fffb10";
      } else if (status_flag_text == "danger") {
        flagcolor = "#ea2020";
      }
      
      // Get basic item data
      const swot_text = List.swotAnalysisValue.name || "";
      const swot_type = List.swotAnalysisValue.type || "";
      let impactname = List.swotAnalysisValue.impact || "";
      
      if (impactname !== "" && List.swotAnalysisValue.impact_name !== undefined) {
        impactname = List.swotAnalysisValue.impact_name;
      }
      
      // Format date
      let subdaterangeformatted = "";
      if (List.swotAnalysisValue.nextduedate !== undefined) {
        subdaterangeformatted = dateFormatedtohumanread(List.swotAnalysisValue.nextduedate);
      }
      
      // Get owner data
      // let topparentswotDetails = {};
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
      
      const resultPorfileContent = subinitiativePorfileContent(List.multipleOwerlist, List.id);
      
      // Determine which action buttons to show based on permissions
      let enableeditBtn = "";
      let enableOwnerBtn = "";
      let enableRecommendation = "";
      let enableAction = "";
      let enableFileupload = "";
      let enabledeleteBtn = "";
      
      if (editpermission == true) {
        enableeditBtn = `<i class="fas fa-pen" data-bs-toggle="modal"  rel="tooltip" data-placement="bottom" title="Edit" data-target="#strength_desc_add_popup" onclick="handleswotevent(${List.id},'${typerequest}','edit')"></i>`;
      }
      
      if (editpermission == true || createpermission == true || deletepermission == true || meetingsloadcontent == true) {
        enableOwnerBtn = `data-toggle="modal" data-target="#swot_add_multiuser_popup" id="initiativeactivitieUser_${List.id}" style="cursor: pointer;"`;
      }
      
      if (recloadcontent) {
        enableRecommendation = `data-bs-toggle="modal" data-bs-target="#recommendation" onclick="handlerecommendationevent(${List.id},'${typerequest}','recommendation')"`;
      }
      
      if (actionloadcontent) {
        enableAction = `data-toggle="modal" data-target="#action" onclick="handleactionevent(${List.id},'${typerequest}','recommendation')"`;
      }
      
      if (attloadcontent) {
        enableFileupload = `data-toggle="modal" data-target="#uploaded_files"`;
      }
      
      if (deletepermission == true) {
        enabledeleteBtn = `<i class="fas fa-trash" rel="tooltip" data-placement="bottom" title="Delete" onclick="handleswotevent(${List.id},'${typerequest}','delete')"></i>`;
      }
      
      console.log(resultPorfileContent, resultPorfileContent['userownerlist_data'], resultPorfileContent['userownerlist'], "result")
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
                    <p class="analysis-label"><strong>${swot_text}</strong></p>
                    <div class="analysis-action p-0">
                      <ul class="list-unstyled action-list">
                        <li>
                          <a href="#notes-modal" data-bs-toggle="modal" ${enableRecommendation} >
                            <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Notes">
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
                  <label class="form-label">`+BusinessImpact
+`</label>
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
                  <ul class="list-unstyled d-flex align-items-center avatar-group mb-0"  data-toggle="modal" data-target="#swot_add_multiuser_popup" id="initiativeactivitieUser_${List.id}" style="cursor: pointer;">
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
    if (typerequest == "Strengths") {
      $nestedArea = $("#strategy-swot > li:nth-child(1) > .nested");
    } else if (typerequest == "Weaknesses") {
      $nestedArea = $("#strategy-swot > li:nth-child(2) > .nested");
    } else if (typerequest == "Oppurtunities") {
      $nestedArea = $("#strategy-swot > li:nth-child(3) > .nested");
    } else if (typerequest == "Threats") {
      $nestedArea = $("#strategy-swot > li:nth-child(4) > .nested");
    }
    
    // Populate the nested area
    if ($nestedArea.length) {
      $nestedArea.html(itemsHTML);
      
      // Mark as loaded
      $nestedArea.parent().data('loaded', true).data('loadedType', typerequest);
      
      // If this is the active section, expand it
      if (localStorage.getItem("swotcall_list") == typerequest) {
        $nestedArea.addClass('active');
        $nestedArea.siblings('.caret').addClass('caret-down');
      }
    }
  }
}

// Modified getSwotList function to work with the new design
// Enhanced getSwotList function
function getSwotList(swottype) {
  const storedLanguage = localStorage.getItem("selectedLang") || "en";
  console.log(storedLanguage, "lang lang");
  loadLanguage(storedLanguage);
  console.log(swottype, "swottype");
    const objData = {
        flagType: swottype
    };
    
    const pagenourl = pageNo ? "pageId=" + pageNo : "";
    const navigateempId = $("#userPrincipalnavigate").val();
    const employeeId = navigateempId || currentEmp;
    if(swottype == "closecaret"){
         const data = []
         strengthListShow(data, swottype);
    }else{
      $.ajax({
          url: "/stratroom/retrieveSwotAnalysisList/" + employeeId + "?" + pagenourl,
          type: "GET",
          data: objData,
          contentType: "application/json",
          success: function(response, status) {
            console.log(response, "responseData");
            if(response?.length > 0){
              strengthListShow(response, swottype);
              
              // After loading, ensure the correct section is expanded
              const $nestedItem = $('[data-id="swot-child-' + 
                  (swottype === "Strengths" ? 1 : 
                  swottype === "Weaknesses" ? 2 : 
                  swottype === "Oppurtunities" ? 3 : 4) + '"]');
              
              $nestedItem.find('.nested-area').addClass('active');
              $nestedItem.find('.caret').addClass('caret-down');
              }else {
                const data = []
                strengthListShow(data, swottype);
              }
          },
          error: function(err) {
              $(".sidebarcontent,.container-fluid,.page-header").show();
              console.error("Error loading SWOT list:", err);
          }
      });
    }
   
}





/*
 * function weaknessesListShow(swotList) { var listData = ""; var flag_ta = "";
 * var swot_text = ""; var swot_type = ""; var swot_impact = ""; var
 * swot_inputform = ""; var swot_multipleowners = ""; var swot_attachment = "";
 * var ownerlistData = []; $.each(swotList, function (i, List) { var
 * status_flag_text = List.swotAnalysisValue.status_flag if (status_flag_text) {
 * flag_ta = status_flag_text } else { flag_ta = "flag-green" }
 *
 * swot_text = List.swotAnalysisValue.name ? List.swotAnalysisValue.name : ""
 * swot_type = List.swotAnalysisValue.type ? List.swotAnalysisValue.type : ""
 * swot_impact = List.swotAnalysisValue.impact ? List.swotAnalysisValue.impact : ""
 * swot_inputform = List.swotAnalysisValue.inputformValue ?
 * List.swotAnalysisValue.inputformValue : "" swot_multipleowners =
 * List.swotAnalysisValue.multipleOwners ? List.swotAnalysisValue.multipleOwners : ""
 * swot_attachment = List.swotAnalysisValue.attachmentUrl ?
 * List.swotAnalysisValue.attachmentUrl : "" ownerlistData =
 * List.multipleOwerlist var size = "" if (ownerlistData) { size =
 * ownerlistData.length } else { size = "" } var img = "" $.each(ownerlistData,
 * function (i, owner) { if(owner.image != null){ img = '<li class="avatar avatar-xs pull-up"><img
 * class="rounded-circle sub_init_img" src="' + owner.image + '" alt="user"
 * width="50" /></li>'; } });
 *
 *
 * listData = '<tr class="weaknessdata_List">' + '<td> <input type="checkbox"
 * name="chk" id = "' + List.id + '"/> </td>' + '<td> <textarea
 * class="form-control" name="name_text" id="name_text" cols="20" rows="3">' +
 * swot_text + '</textarea></td>' + '<td> <select class="form-control"
 * id="statusType" name="statusType" style=""> <option value="' + swot_type +
 * '"> ' + swot_type + ' </option></select></td>' + '<td><textarea
 * class="form-control" name="impact_text" id="impact_text" cols="20" rows="3">' +
 * swot_impact + '</textarea> </td>' + '<td><a href="#" data-toggle="modal"
 * data-target="#flag" id="statusFlag" flagValue="' + flag_ta + '"><img
 * src="images/' + flag_ta + '.png" alt="status" width="23px" height="23px"/>
 * </a></td>' + '<td>' + '<a href="#" data-toggle="modal"
 * data-target="#view_input" class="rc-tgrn" id="viewinput" inputValue="' +
 * swot_inputform + '"> <i class="far fa-eye"></i> </a>' + '<a href="#"
 * data-toggle="modal" data-target="#input" class="rc-tgrn" id="addinput"> <i
 * class="fa fa-plus" aria-hidden="true"></i> </a>' + '</td>' + '<td>' + '<div
 * class="d-flex flex-column">' + '<ul class="list-unstyled order-list d-flex">' +
 * img + '<li class="avatar avatar-xs pull-up">' + '<span _ngcontent-hhc-c5=""
 * class="avatar-initial rounded-circle">+' + size + '</span>' + '</li>' + '<div
 * class="image-upload">' + '<label for="file-input">' + '<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up">' + '<a
 * href="#" class="favgs" data-toggle="modal" data-target="#addpeople">' + '<span
 * _ngcontent-hhc-c5="" class="avatar-initial rounded-circle" id="mutipleOwners" value="' +
 * swot_multipleowners + '">+<span id="count"> </span></span>' + '</a>' + '</li>' + '</label>' + '</div>' + '</ul>' + '</div>' + '</td>' + '<td class="p-2">' + '<a
 * href="' + swot_attachment + '" target="_blank" class="rounded-circle
 * rc-tgrn">' + '<i class="far fa-eye"></i>' + '</a>' + '<label
 * for="file-input1" class="forfileinput1">' + '<img
 * src="images/attachment.jpg" alt="attachment" width="35px" height="35px"/>' + '</label>' + '<input
 * class="file-input1" style="display: none;" type="file" atturl = "' +
 * swot_attachment + '"/>' + '</td>' + '<td>' + '<a href="#" > <i class="fa
 * fa-save savebt1" name="' + List.flagType + '"> </i></a>' + '</td>' + '</tr>';
 * $("#weekness_list").append(listData); }); }
 *
 *
 *
 *
 *
 *
 * function oppurtunitiesListShow(swotList) { var listData = ""; var flag_ta =
 * ""; var swot_text = ""; var swot_type = ""; var swot_impact = ""; var
 * swot_inputform = ""; var swot_multipleowners = ""; var swot_attachment = "";
 * var ownerlistData = []; $.each(swotList, function (i, List) { var
 * status_flag_text = List.swotAnalysisValue.status_flag if (status_flag_text) {
 * flag_ta = status_flag_text } else { flag_ta = "flag-green" }
 *
 * swot_text = List.swotAnalysisValue.name ? List.swotAnalysisValue.name : ""
 * swot_type = List.swotAnalysisValue.type ? List.swotAnalysisValue.type : ""
 * swot_impact = List.swotAnalysisValue.impact ? List.swotAnalysisValue.impact : ""
 * swot_inputform = List.swotAnalysisValue.inputformValue ?
 * List.swotAnalysisValue.inputformValue : "" swot_multipleowners =
 * List.swotAnalysisValue.multipleOwners ? List.swotAnalysisValue.multipleOwners : ""
 * swot_attachment = List.swotAnalysisValue.attachmentUrl ?
 * List.swotAnalysisValue.attachmentUrl : "" ownerlistData =
 * List.multipleOwerlist var size = "" if (ownerlistData) { size =
 * ownerlistData.length } else { size = "" } var img = "" $.each(ownerlistData,
 * function (i, owner) { if(owner.image != null){ img = '<li class="avatar avatar-xs pull-up"><img
 * class="rounded-circle sub_init_img" src="' + owner.image + '" alt="user"
 * width="50" /></li>'; } });
 *
 * listData = '<tr class="oppurtunitiesdata_List">' + '<td> <input
 * type="checkbox" name="chk" id = "' + List.id + '"/> </td>' + '<td>
 * <textarea class="form-control" name="name_text" id="name_text" cols="20"
 * rows="3">' + swot_text + '</textarea></td>' + '<td> <select
 * class="form-control" id="statusType" name="statusType" style=""> <option
 * value="' + swot_type + '"> ' + swot_type + ' </option></select></td>' + '<td><textarea
 * class="form-control" name="impact_text" id="impact_text" cols="20" rows="3">' +
 * swot_impact + '</textarea> </td>' + '<td><a href="#" data-toggle="modal"
 * data-target="#flag" id="statusFlag" flagValue="' + flag_ta + '"><img
 * src="images/' + flag_ta + '.png" alt="status" width="23px" height="23px"/>
 * </a></td>' + '<td>' + '<a href="#" data-toggle="modal"
 * data-target="#view_input" class="rc-tgrn" id="viewinput" inputValue="' +
 * swot_inputform + '"> <i class="far fa-eye"></i> </a>' + '<a href="#"
 * data-toggle="modal" data-target="#input" class="rc-tgrn" id="addinput"> <i
 * class="fa fa-plus" aria-hidden="true"></i> </a>' + '</td>' + '<td>' + '<div
 * class="d-flex flex-column">' + '<ul class="list-unstyled order-list d-flex">' +
 * img + '<li class="avatar avatar-xs pull-up">' + '<span _ngcontent-hhc-c5=""
 * class="avatar-initial rounded-circle">+' + size + '</span>' + '</li>' + '<div
 * class="image-upload">' + '<label for="file-input">' + '<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up">' + '<a
 * href="#" class="favgs" data-toggle="modal" data-target="#addpeople">' + '<span
 * _ngcontent-hhc-c5="" class="avatar-initial rounded-circle" id="mutipleOwners" value="' +
 * swot_multipleowners + '">+<span id="count"> </span></span>' + '</a>' + '</li>' + '</label>' + '</div>' + '</ul>' + '</div>' + '</td>' + '<td class="p-2">' + '<a
 * href="' + swot_attachment + '" target="_blank" class="rounded-circle
 * rc-tgrn">' + '<i class="far fa-eye"></i>' + '</a>' + '<label
 * for="file-input1" class="forfileinput1">' + '<img
 * src="images/attachment.jpg" alt="attachment" width="35px" height="35px"/>' + '</label>' + '<input
 * class="file-input1" style="display: none;" type="file" atturl = "' +
 * swot_attachment + '"/>' + '</td>' + '<td>' + '<a href="#" > <i class="fa
 * fa-save savebt1" name="' + List.flagType + '"> </i></a>' + '</td>' + '</tr>';
 * $("#oppurtunitie_list").append(listData); }); }
 *
 *
 *
 *
 * function threatsListShow(swotList) { var listData = ""; var flag_ta = ""; var
 * swot_text = ""; var swot_type = ""; var swot_impact = ""; var swot_inputform =
 * ""; var swot_multipleowners = ""; var swot_attachment = ""; var ownerlistData =
 * []; $.each(swotList, function (i, List) { var status_flag_text =
 * List.swotAnalysisValue.status_flag if (status_flag_text) { flag_ta =
 * status_flag_text } else { flag_ta = "flag-green" }
 *
 * swot_text = List.swotAnalysisValue.name ? List.swotAnalysisValue.name : ""
 * swot_type = List.swotAnalysisValue.type ? List.swotAnalysisValue.type : ""
 * swot_impact = List.swotAnalysisValue.impact ? List.swotAnalysisValue.impact : ""
 * swot_inputform = List.swotAnalysisValue.inputformValue ?
 * List.swotAnalysisValue.inputformValue : "" swot_multipleowners =
 * List.swotAnalysisValue.multipleOwners ? List.swotAnalysisValue.multipleOwners : ""
 * swot_attachment = List.swotAnalysisValue.attachmentUrl ?
 * List.swotAnalysisValue.attachmentUrl : "" ownerlistData =
 * List.multipleOwerlist var size = "" var img = "" if (ownerlistData) { size =
 * ownerlistData.length } else { size = "" } var img = "" $.each(ownerlistData,
 * function (i, owner) { if(owner.image != null){ img = '<li class="avatar avatar-xs pull-up"><img
 * class="rounded-circle sub_init_img" src="' + owner.image + '" alt="user"
 * width="50" /></li>'; } });
 *
 * listData = '<tr class="threatsdata_List">' + '<td> <input type="checkbox"
 * name="chk" id = "' + List.id + '"/> </td>' + '<td> <textarea
 * class="form-control" name="name_text" id="name_text" cols="20" rows="3">' +
 * swot_text + '</textarea></td>' + '<td> <select class="form-control"
 * id="statusType" name="statusType" style=""> <option value="' + swot_type +
 * '"> ' + swot_type + ' </option></select></td>' + '<td><textarea
 * class="form-control" name="impact_text" id="impact_text" cols="20" rows="3">' +
 * swot_impact + '</textarea> </td>' + '<td><a href="#" data-toggle="modal"
 * data-target="#flag" id="statusFlag" flagValue="' + flag_ta + '"><img
 * src="images/' + flag_ta + '.png" alt="status" width="23px" height="23px"/>
 * </a></td>' + '<td>' + '<a href="#" data-toggle="modal"
 * data-target="#view_input" class="rc-tgrn" id="viewinput" inputValue="' +
 * swot_inputform + '"> <i class="far fa-eye"></i> </a>' + '<a href="#"
 * data-toggle="modal" data-target="#input" class="rc-tgrn" id="addinput"> <i
 * class="fa fa-plus" aria-hidden="true"></i> </a>' + '</td>' + '<td>' + '<div
 * class="d-flex flex-column">' + '<ul class="list-unstyled order-list d-flex">' +
 * img + '<li class="avatar avatar-xs pull-up">' + '<span _ngcontent-hhc-c5=""
 * class="avatar-initial rounded-circle">+' + size + '</span>' + '</li>' + '<div
 * class="image-upload">' + '<label for="file-input">' + '<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up">' + '<a
 * href="#" class="favgs" data-toggle="modal" data-target="#addpeople">' + '<span
 * _ngcontent-hhc-c5="" class="avatar-initial rounded-circle" id="mutipleOwners" value="' +
 * swot_multipleowners + '">+<span id="count"> </span></span>' + '</a>' + '</li>' + '</label>' + '</div>' + '</ul>' + '</div>' + '</td>' + '<td class="p-2">' + '<a
 * href="' + swot_attachment + '" target="_blank" class="rounded-circle
 * rc-tgrn">' + '<i class="far fa-eye"></i>' + '</a>' + '<label
 * for="file-input1" class="forfileinput1">' + '<img
 * src="images/attachment.jpg" alt="attachment" width="35px" height="35px"/>' + '</label>' + '<input
 * class="file-input1" style="display: none;" type="file" atturl = "' +
 * swot_attachment + '"/>' + '</td>' + '<td>' + '<a href="#" > <i class="fa
 * fa-save savebt1" name="' + List.flagType + '"> </i></a>' + '</td>' + '</tr>';
 * $("#threat_list").append(listData); }); }
 */

$(document).on("click", ".savebt", function () {
  var flagtype = $(this).attr("name");
  console.log("flagtype  : " + flagtype);
  saveSwot(this, flagtype);
});

$(document).on("click", ".savebt1", function () {
  var flagtype = $(this).attr("name");
  console.log("flagtype  : " + flagtype);
  updateSwot(this, flagtype);
});

function saveSwot() {
  var action = $("#swot_strength_Form input[name='action']").val();
  var flagtypeValue = $("#swot_strength_Form input[name='flagtype']").val();
   var flagtype;
  if (flagtypeValue == "Strength") {
    flagtype = "Strengths";
  }else if (flagtypeValue == "Weakness") {
    flagtype = "Weaknesses";
  }else if (flagtypeValue == "Oppurtunity") {
    flagtype = "Oppurtunities";
  }else if (flagtypeValue == "Threat") {
    flagtype = "Threats";
  }else{
    flagtype = flagtypeValue; 
  }
 
  var swotObj = getSwotObj(flagtype, action);

  var methodType = "post";
  var id = $("#swot_strength_Form input[name='id']").val();
  if (action == "edit") {
    swotObj.id = id != "" ? id : "";
    methodType = "put";
  }

  if ($("#activities_selected_user_" + id).val()) {
    swotObj.swotAnalysisValue.multipleOwners = $(
      "#activities_selected_user_" + id
    ).val();
  } else {
    swotObj.swotAnalysisValue.multipleOwners = currentEmp;
  }

  console.log(swotObj,flagtypeValue,  "swotObj");

  $.ajax({
    url: "/stratroom/swotAnalysis",
    type: methodType,
    contentType: "application/json",
    data: JSON.stringify(swotObj),
    success: function (data, status) {
      location.reload(true);
    },
    error: readErrorMsg,
  });
}

function updateSwot(vthis, flagtype) {
  var swotObj = getSwotObj(vthis, flagtype);
  console.log(swotObj, "updateSwotUp");
  var methodType = "put";

  $.ajax({
    url: "/stratroom/swotAnalysis",
    type: methodType,
    contentType: "application/json",
    data: JSON.stringify(swotObj),
    success: function (data, status) {
      console.log(data);
      $(vthis)
        .parents("tr")
        .find("td:first-child input")
        .prop("id", data.id || "");
    },
  });
}

function getdeptlist() {
  if (jQuery.isEmptyObject(deptlist)) {
    $.ajax({
      url: "/stratroom/allDepartmentList",
      async: false,
      success: function (employeeList) {
        deptlist = employeeList;
        /*$.each(deptlist, function(index, kpiObj) {
					addOptionDept(".departmentlist", kpiObj.name, kpiObj.id)
				});*/
      },
    });
  }
}

function populateKPIList(elementId, ownerid) {
  var numberOfOptions = $(elementId + " > option").length;
  if (ownerid != "") {
    $.ajax({
      url: "/stratroom/kpiListByDeptId/" + ownerid,
      async: false,
      success: function (kpiListValue) {
        kpiList = kpiListValue;
        $.each(kpiList, function (index, kpiObj) {
          addOption(elementId, kpiObj.kpiName, kpiObj.id);
        });
      },
    });
  }
}

function addOption(id, text, value) {
  $(id).append(`<option value="${value}">${text}</option>`);
}

function formvalidationerrorreset() {
  $("*[id*=-error]").each(function () {
    $(this).remove();
  });
  $(".input-calender-icon").css("bottom", "30%");
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

$("#swot_strength_Form #department_swot").change(function () {
  $("#strength_impact").find("option").remove().end();
  $("#swot_strength_Form #strength_impact").append(
    `<option value="">Choose impact</option>`
  );
  populateKPIList("#swot_strength_Form #strength_impact", $(this).val());
});

function handleswotevent(id, type, action) {
  const storedLanguage = localStorage.getItem("selectedLang") || "en";
  console.log(id, type, action, "swot");
if (type == "Strengths") {
  if (storedLanguage == "en") {
    $("#swotheader_title").text("Strength Description");
    $("#swotlabeltitle").text("Strength");
  } else if (storedLanguage == "am") {
    $("#swotheader_title").text("የኃይል መግለጫ");
    $("#swotlabeltitle").text("ኃይል");
  } else {
    $("#swotheader_title").text("وصف نقاط القوة");
    $("#swotlabeltitle").text("نقاط القوة");
  }

} else if (type == "Weaknesses") {
  if (storedLanguage == "en") {
    $("#swotheader_title").text("Weaknesses Description");
    $("#swotlabeltitle").text("Weaknesses");
  } else if (storedLanguage == "am") {
    $("#swotheader_title").text("የድክመት መግለጫ");
    $("#swotlabeltitle").text("ድክመት");
  } else {
    $("#swotheader_title").text("وصف نقاط الضعف");
    $("#swotlabeltitle").text("نقاط الضعف");
  }

} else if (type == "Oppurtunities") {
  if (storedLanguage == "en") {
    $("#swotheader_title").text("Opportunities Description");
    $("#swotlabeltitle").text("Opportunities");
  } else if (storedLanguage == "am") {
    $("#swotheader_title").text("የእድል መግለጫ");
    $("#swotlabeltitle").text("እድል");
  } else {
    $("#swotheader_title").text("وصف الفرص");
    $("#swotlabeltitle").text("الفرص");
  }

} else if (type == "Threats") {
  if (storedLanguage == "en") {
    $("#swotheader_title").text("Threats Description");
    $("#swotlabeltitle").text("Threats");
  } else if (storedLanguage == "am") {
    $("#swotheader_title").text("የአደጋ መግለጫ");
    $("#swotlabeltitle").text("አደጋ");
  } else {
    $("#swotheader_title").text("وصف التهديدات");
    $("#swotlabeltitle").text("التهديدات");
  }
}


  $("#swot_strength_Form").css("display", "none");
  $("#swot_strength_Form").trigger("reset");
  $("#swot_strength_Form input[name='action']").val(action);
  $("#swot_strength_Form input[name='flagtype']").val(type);

  $("#strength_impact").find("option").remove().end();
  $("#swot_strength_Form #strength_impact").append(
    `<option value="">Choose impact</option>`
  );
  //populateKPIList('#swot_strength_Form #strength_impact',"");
  $("#swot_strength_Form #department_swot").empty();
  $("#swot_strength_Form #department_swot").append(
    "<option value=''>Choose Department</option>"
  );
  if (!jQuery.isEmptyObject(deptlist)) {
    $.each(deptlist, function (index, deptindex) {
      addOption(
        "#swot_strength_Form #department_swot",
        deptindex.name,
        deptindex.id
      );
    });
  } else {
    getdeptlist("#swot_strength_Form #department_swot", "");
    $.each(deptlist, function (index, deptindex) {
      addOption(
        "#swot_strength_Form #department_swot",
        deptindex.name,
        deptindex.id
      );
    });
  }

  /*	$('.chosen-select').chosen({}).change( function(obj, result) {
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
  if (action == "add") {
    if (createpermission == false) {
      return false;
    }
    $("#swot_id_wrapper").css("display", "none"); // Hide the ID input
    // when adding
    $("#swot_strength_Form").css("display", "block");
    //$("#strength_impact").trigger("chosen:updated");
    formvalidationerrorreset();
  } else if (action == "delete") {
    if (deletepermission == false) {
      return false;
    }
    $("#deleterecordid").val(id);
    $("#deleterecordtype").val(type);
    $("#deleteModalswot").modal("toggle");

    $(window).on("resize", function () {
      $(".modal:visible").each(alignModal);
    });
    $(".modal").on("shown.bs.modal", alignModal);
  } else {
    // view and edit
    $("#swot_strength_Form").css("display", "block");
    formvalidationerrorreset();
    $("#swot_id_wrapper").css("display", "block"); // Hide the ID input
    $("#swot_strength_Form #swot_id").prop("disabled", true);
    $("#swot_strength_Form #swot_id").val(id);
    if (action == "edit") {
      $("#swot_strength_Form input[name='id']").val(id);
    }
    if (action == "view") {
      if (viewpermission == false) {
        return false;
      }
      $('#swot_strength_Form input[type="text"]').prop("disabled", true);
      $('#swot_strength_Form input[type="checkbox"]').prop("disabled", true);
      $("#swot_strength_Form select").prop("disabled", true);
      $('#swot_strength_Form button[value="Save"]').css("display", "none");
    }

    if (action == "edit") {
      if (editpermission == false) {
        return false;
      }
    }

    $.ajax({
      url: "/stratroom/swotAnalysis/" + id,
      success: swotPopSuccessCallback,
      error: readErrorMsg,
    });
  }
}

function handlerecommendationevent(id, type, action) {
  if (
    (reccreatepermission == false || receditpermission == false) &&
    recloadcontent == false
  ) {
    return false;
  }
  $("#recommendationtype").val("create");
  $("#recommendationcount").val(0);
  $('[data-toggle="tooltip"]').tooltip("hide");
  $('[rel="tooltip"]').tooltip("hide");
  getreportee();
  $.ajax({
    url: "/stratroom/swotAnalysis/" + id,
    success: function (data) {
      swotupdateDescription = data;
      swotupdateDescription.swotAnalysisValue.newMultipleOwners = "";
      for (
        var i = 0;
        i < swotupdateDescription.swotAnalysisValue.actions.length;
        i++
      ) {
        swotupdateDescription.swotAnalysisValue.actions[i].newMultipleOwners =
          "";
      }
      var num = swotupdateDescription.swotAnalysisValue.recommendation.length;
      for (var i = 0; i < num; i++) {
        localStorage.setItem(
          "ownername_" + i,
          swotupdateDescription.swotAnalysisValue.recommendation[i].name
        );
        localStorage.setItem(
          "recommendowners_" + i,
          swotupdateDescription.swotAnalysisValue.recommendation[i]
            .multipleOwners
        );
      }
      recommendationPopSuccessCallback(data, id, type);
    },
    error: readErrorMsg,
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
		url : "/stratroom/swotAnalysis/" + id,
		success : function(data){
      console.log(data, "dataaaa");
			swotupdateDescription	=	data;
			swotupdateDescription.swotAnalysisValue.newMultipleOwners = "";
			for(var i=0;i<swotupdateDescription.swotAnalysisValue.recommendation.length;i++){
				swotupdateDescription.swotAnalysisValue.recommendation[i].newMultipleOwners = "";
			}
			var num=swotupdateDescription.swotAnalysisValue.actions.length;
			for(var i=0;i<num;i++){
			localStorage.setItem('ownersname_'+i,swotupdateDescription.swotAnalysisValue.actions[i].name);
			localStorage.setItem('actionowners_'+i,swotupdateDescription.swotAnalysisValue.actions[i].multipleOwners);
			}
			actionsPopSuccessCallback(data,id,type);	
		},
		error:readErrorMsg
	});
}

function populateActionData(data) {
  const actionBody = document.getElementById('actionBodyData');
  actionBody.innerHTML = '';

 
  const actions = data.swotAnalysisValue.actions || [];
  const showEmptyRow = actions.length == 0;


  if (showEmptyRow) {
    addEmptyActionRow(actionBody, true);
    return;
  }


  actions.forEach(function(action, index) {
    const isLastRow = index == actions.length - 1;
    const row = document.createElement('tr');
    const formattedDate = action.bydate ? formatDateForInput(action.bydate) : '';
    
    var rowHTML = '';
    rowHTML += '<td>';
    rowHTML += '  <div class="form-group">';
    rowHTML += '    <textarea class="form-control" placeholder="Notes" rows="3">' + (action.name || '') + '</textarea>';
    rowHTML += '  </div>';
    rowHTML += '</td>';
    // rowHTML += '<td>';
    // rowHTML += '  <div class="form-group">';
    // rowHTML += '    <input type="date" class="form-control" value="' + formattedDate + '" placeholder="">';
    // rowHTML += '  </div>';
    // rowHTML += '</td>';
    // rowHTML += '<td class="align-middle">';
    // rowHTML += '  <div class="d-flex align-items-start justify-content-center">';
    // rowHTML += '    <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">';
    // rowHTML += generateOwnerAvatars(action.multipleOwners, data.multipleOwerlist);
    // rowHTML += '    </ul>';
    // rowHTML += '  </div>';
    // rowHTML += '</td>';
    // rowHTML += '<td class="text-center">';
    // rowHTML += '  <select id="action-status-' + index + '" name="action-status" class="form-select select-dropdown-action" data-placeholder="Select Status">';
    // rowHTML += '    <option value="" ' + (!action.status ? 'selected' : '') + ' disabled>Select Status</option>';
    // rowHTML += '    <option value="pending" ' + (!action.status ? 'selected' : '') + '>Pending</option>';
    // rowHTML += '    <option value="completed" ' + (action.status ? 'selected' : '') + '>Completed</option>';
    // rowHTML += '  </select>';
    // rowHTML += '</td>';
    rowHTML += '<td class="text-end align-middle">';
    rowHTML += '  <div class="table-actions justify-content-center">';
    
    // Show add button only for last row
    if (isLastRow) {
      rowHTML += '    <a class="btn btn-sm btn-icon add-action-row">';
      rowHTML += '      <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" >';
      rowHTML += '        <i class="fa fa-plus title_edit_icon"  ></i>';
      rowHTML += '      </span>';
      rowHTML += '    </a>';
    }
    
    // Show delete button if we have more than one row or it's not an empty row
    if (actions.length > 1 || action.name || action.bydate || action.multipleOwners) {
      rowHTML += '    <a href="#" class="btn btn-sm btn-icon delete-action-row">';
      rowHTML += '      <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" >';
      rowHTML += '        <img src="/stratroom/images/delete-i.svg" width="12" height="12" />';
      rowHTML += '      </span>';
      rowHTML += '    </a>';
    }
    
    rowHTML += '  </div>';
    rowHTML += '</td>';
    
    row.innerHTML = rowHTML;
    actionBody.appendChild(row);
  });

  // Add click handler for add buttons
  actionBody.querySelectorAll('.add-action-row').forEach(function(btn) {
    btn.addEventListener('click', function() {
      addEmptyActionRow(actionBody, false);
    });
  });

  // Add click handler for delete buttons
  actionBody.querySelectorAll('.delete-action-row').forEach(function(btn) {
    btn.addEventListener('click', function() {
      this.closest('tr').remove();
      // If we deleted the last row, make sure the new last row has add button
      updateAddButtons(actionBody);
    });
  });
}

// Helper function to add an empty row
function addEmptyActionRow(actionBody, isInitialEmpty) {
  const row = document.createElement('tr');
  const rowCount = actionBody.querySelectorAll('tr').length;
  
  var rowHTML = '';
  rowHTML += '<td>';
  rowHTML += '  <div class="form-group">';
  rowHTML += '    <textarea class="form-control" placeholder="Notes" rows="3"></textarea>';
  rowHTML += '  </div>';
  rowHTML += '</td>';
  rowHTML += '<td>';
  rowHTML += '  <div class="form-group">';
  rowHTML += '    <input type="date" class="form-control" placeholder="">';
  rowHTML += '  </div>';
  rowHTML += '</td>';
  rowHTML += '<td class="align-middle">';
  rowHTML += '  <div class="d-flex align-items-start justify-content-center">';
  rowHTML += '    <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">';
  rowHTML += '    </ul>';
  rowHTML += '  </div>';
  rowHTML += '</td>';
  rowHTML += '<td class="text-center">';
  rowHTML += '  <select class="form-select select-dropdown-action" data-placeholder="Select Status">';
  rowHTML += '    <option value="" selected disabled>Select Status</option>';
  rowHTML += '    <option value="pending">Pending</option>';
  rowHTML += '    <option value="completed">Completed</option>';
  rowHTML += '  </select>';
  rowHTML += '</td>';
  rowHTML += '<td class="text-end align-middle">';
  rowHTML += '  <div class="table-actions justify-content-center">';
  
  // Always show add button for new empty rows
  rowHTML += '    <a class="btn btn-sm btn-icon add-action-row">';
  rowHTML += '      <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" >';
  rowHTML += '        <i class="fas fa-plus title_edit_icon"></i>';
  rowHTML += '      </span>';
  rowHTML += '    </a>';
  
  // Show delete button if not initial empty row or if there are other rows
  if (!isInitialEmpty || rowCount > 0) {
    rowHTML += '    <a href="#" class="btn btn-sm btn-icon delete-action-row">';
    rowHTML += '      <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" >';
    rowHTML += '        <img src="/stratroom/images/delete-i.svg" width="12" height="12" />';
    rowHTML += '      </span>';
    rowHTML += '    </a>';
  }
  
  rowHTML += '  </div>';
  rowHTML += '</td>';
  
  row.innerHTML = rowHTML;
  actionBody.appendChild(row);
  
  // Set up event listeners for the new row
  row.querySelector('.add-action-row').addEventListener('click', function() {
    addEmptyActionRow(actionBody, false);
  });
  
  if (row.querySelector('.delete-action-row')) {
    row.querySelector('.delete-action-row').addEventListener('click', function() {
      this.closest('tr').remove();
      updateAddButtons(actionBody);
    });
  }
}

// Helper function to ensure only the last row has add button
function updateAddButtons(actionBody) {
  const rows = actionBody.querySelectorAll('tr');
  
  // Remove all add buttons first
  actionBody.querySelectorAll('.add-action-row').forEach(function(btn) {
    btn.closest('a').remove();
  });
  
  // Add add button to last row if it doesn't have one
  if (rows.length > 0) {
    const lastRow = rows[rows.length - 1];
    const actionsDiv = lastRow.querySelector('.table-actions');
    
    if (!lastRow.querySelector('.add-action-row')) {
      var addBtnHTML = '';
      addBtnHTML += '<a class="btn btn-sm btn-icon add-action-row">';
      addBtnHTML += '  <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" >';
      addBtnHTML += '    <i class="fas fa-plus title_edit_icon"></i>';
      addBtnHTML += '  </span>';
      addBtnHTML += '</a>';
      
      actionsDiv.insertAdjacentHTML('afterbegin', addBtnHTML);
      
      lastRow.querySelector('.add-action-row').addEventListener('click', function() {
        addEmptyActionRow(actionBody, false);
      });
    }
  }
}

function formatDateForInput(dateString) {
  if (!dateString) return '';
  var parts = dateString.split('/');
  if (parts.length == 3) {
    return parts[2] + '-' + parts[0].padStart(2, '0') + '-' + parts[1].padStart(2, '0');
  }
  return '';
}


function generateOwnerAvatars(ownerIds, ownerList) {
  if (!ownerIds) return '';
  
  var ids = ownerIds.split(',');
  var html = '';
  

  var owners = ownerList.filter(function(owner) { 
    return ids.includes(owner.id.toString()); 
  });
  
  
  owners.slice(0, 2).forEach(function(owner) {
    html += '<li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip" data-bs-placement="top" title="' + owner.name + '">';
    html += '  <img src="assets/images/user/user9.jpg" class="rounded-circle" alt="' + owner.name + '" width="24" height="24">';
    html += '</li>';
  });
  
  
  if (owners.length > 2) {
    html += '<li class="avatar avatar-xs pull-up" href="#attendess-list" data-toggle="modal" data-target="#attendess-list">';
    html += '  <span class="avatar-initial rounded-circle" data-toggle="tooltip" data-placement="top" title="' + (owners.length - 2) + ' more">+' + (owners.length - 2) + '</span>';
    html += '</li>';
  }
  
  return html;
}


// function recommendationPopSuccessCallback(swotList, typerequest) {
//   console.log(swotList, "swotList");
//   var tablebody = "";


//   // $("#recommendationbody").empty();
//   // if (
//   //   swotList.swotAnalysisValue.recommendation != undefined &&
//   //   swotList.swotAnalysisValue.recommendation != ""
//   // ) {
//   //   if (swotList.swotAnalysisValue.recommendation.length != 0) {
//   //     $("#recommendationtype").val("update");
//   //     $("#recommendationcount").val(
//   //       swotList.swotAnalysisValue.recommendation.length
//   //     );
//   //     $.each(swotList.swotAnalysisValue.recommendation, function (i, List) {
//   //       var name = List.name != undefined ? List.name : "";
//   //       var multiowner =
//   //         List.multipleOwners != undefined && List.multipleOwners != ""
//   //           ? List.multipleOwners
//   //           : currentEmp;
//   //       var users = topparentswotDetails;
//   //       var username =
//   //         users.name == undefined || users.name == "" ? "User" : users.name;
//   //       var userProfileConcate =
//   //         users.image == undefined || users.image == ""
//   //           ? "data-name='" +
//   //             username +
//   //             "' class='rounded-circle rec_res_multiuserimage' "
//   //           : "src='" + users.image + "' class='rounded-circle'";
//   //       var subinitiativeUser =
//   //         '<li class="avatar avatar-xs pull-up"><img ' +
//   //         userProfileConcate +
//   //         ' alt="' +
//   //         username +
//   //         '"></li>';

//   //       var resultPorfileContent = recommendationPorfileContent(
//   //         multiowner,
//   //         List.id
//   //       );
//   //       var userselecteditems = resultPorfileContent["userownerlist_data"];
//   //       var subinitiativeUser =
//   //         resultPorfileContent["userownerlist"] != undefined
//   //           ? resultPorfileContent["userownerlist"]
//   //           : "";
//   //       // <input type="hidden" class="rec_multiownerid"
//   //       // id="rec_multiownerid_'+List.id+'" name="multiowners[]"
//   //       // value="'+multiowner+'">
//   //       var removebtnEnable = "";
//   //       var removeclass = "";
//   //       if (recdeletepermission == true && i != 0) {
//   //         removeclass = ' class="notes_clone"';
//   //         removebtnEnable = `<i class="fas fa-trash remove-notes" data-toggle="tooltip" data-placement="bottom" title="Delete" style="cursor: pointer;"></i>`;
//   //       }
//   //       tablebody +=
//   //         "<tr" +
//   //         removeclass +
//   //         '><td><textarea class="form-control recommendation" rows="5" name="recommendation[]">' +
//   //         name +
//   //         '</textarea></td><td><div class="d-flex flex-column">' +
//   //         userselecteditems +
//   //         '<ul class="list-unstyled order-list d-flex" id="recommendationMultiowner_' +
//   //         List.id +
//   //         '">' +
//   //         subinitiativeUser +
//   //         "</ul></div></td><td>" +
//   //         removebtnEnable +
//   //         "</td></tr>";
//   //     });
//   //   } else {
//   //     var users = topparentswotDetails;
//   //     var username =
//   //       users.name == undefined || users.name == "" ? "User" : users.name;
//   //     var userProfileConcate =
//   //       users.image == undefined || users.image == ""
//   //         ? "data-name='" +
//   //           username +
//   //           "' class='rounded-circle rec_res_multiuserimage' "
//   //         : "src='" + users.image + "' class='rounded-circle'";
//   //     var subinitiativeUser =
//   //       '<li class="avatar avatar-xs pull-up"><img ' +
//   //       userProfileConcate +
//   //       ' alt="' +
//   //       username +
//   //       '"></li>';
//   //     if (
//   //       receditpermission == false ||
//   //       reccreatepermission == false ||
//   //       recviewpermission == true ||
//   //       recloadcontent == true
//   //     ) {
//   //       tablebody =
//   //         '<tr><td><textarea class="form-control recommendation" rows="5" name="recommendation[]"> </textarea></td><td><div class="d-flex flex-column"><input type="hidden" class="rec_multiownerid" id="rec_multiownerid_0" name="multiowners[]" value="' +
//   //         users.id +
//   //         '"><ul class="list-unstyled order-list d-flex" id="recommendationMultiowner_0">' +
//   //         subinitiativeUser +
//   //         '<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" onclick="return false;" class="favgs"><span _ngcontent-hhc-c5="" class="badge recommendationmultiowner">+</span></a></li></ul></div></td><td></td></tr>';
//   //     }
//   //     if (receditpermission == true || reccreatepermission == true) {
//   //       tablebody =
//   //         '<tr><td><textarea class="form-control recommendation" rows="5" name="recommendation[]"> </textarea></td><td><div class="d-flex flex-column"><input type="hidden" class="rec_multiownerid" id="rec_multiownerid_0" name="multiowners[]" value="' +
//   //         users.id +
//   //         '"><ul class="list-unstyled order-list d-flex" id="recommendationMultiowner_0">' +
//   //         subinitiativeUser +
//   //         '<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" class="favgs" data-toggle="modal" data-target="#addpeople"><span _ngcontent-hhc-c5="" onclick="recommendationaddpeople(0)" class="badge recommendationmultiowner">+</span></a></li></ul></div></td><td></td></tr>';
//   //     }
//   //     $("#recommendationtype").val("create");
//   //   }
//   // } else {
//   //   var users = topparentswotDetails;
//   //   var username =
//   //     users.name == undefined || users.name == "" ? "User" : users.name;
//   //   var userProfileConcate =
//   //     users.image == undefined || users.image == ""
//   //       ? "data-name='" +
//   //         username +
//   //         "' class='rounded-circle rec_res_multiuserimage' "
//   //       : "src='" + users.image + "' class='rounded-circle'";
//   //   var subinitiativeUser = "";
//   //   if (
//   //     receditpermission == false ||
//   //     reccreatepermission == false ||
//   //     recviewpermission == true ||
//   //     recloadcontent == true
//   //   ) {
//   //     subinitiativeUser =
//   //       '<li class="avatar avatar-xs pull-up"><img ' +
//   //       userProfileConcate +
//   //       ' alt="' +
//   //       username +
//   //       '"></li>';
//   //     tablebody =
//   //       '<tr><td><textarea class="form-control recommendation" rows="5" name="recommendation[]"> </textarea></td><td><div class="d-flex flex-column"><input type="hidden" class="rec_multiownerid" id="rec_multiownerid_0" name="multiowners[]" value="' +
//   //       users.id +
//   //       '"><ul class="list-unstyled order-list d-flex" id="recommendationMultiowner_0">' +
//   //       subinitiativeUser +
//   //       '<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" onclick="return false;" class="favgs"><span _ngcontent-hhc-c5="" class="badge recommendationmultiowner">+</span></a></li></ul></div></td><td></td></tr>';
//   //   }
//   //   if (receditpermission == true || reccreatepermission == true) {
//   //     subinitiativeUser =
//   //       '<li class="avatar avatar-xs pull-up" data-toggle="modal" data-target="#addpeople" onclick="recommendationaddpeople(0)"><img ' +
//   //       userProfileConcate +
//   //       ' alt="' +
//   //       username +
//   //       '"></li>';
//   //     tablebody =
//   //       '<tr><td><textarea class="form-control recommendation" rows="5" name="recommendation[]"> </textarea></td><td><div class="d-flex flex-column"><input type="hidden" class="rec_multiownerid" id="rec_multiownerid_0" name="multiowners[]" value="' +
//   //       users.id +
//   //       '"><ul class="list-unstyled order-list d-flex" id="recommendationMultiowner_0">' +
//   //       subinitiativeUser +
//   //       '<li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" class="favgs" data-toggle="modal" data-target="#addpeople"><span _ngcontent-hhc-c5="" onclick="recommendationaddpeople(0)" class="badge recommendationmultiowner">+</span></a></li></ul></div></td><td></td></tr>';
//   //   }
//   //   $("#recommendationtype").val("create");
//   // }
//   // $("#recommendationbody").html(tablebody);
//   // $("#recommendationbody ul li.avatar").css("cursor", "pointer");
//   // $(".rec_res_multiuserimage").initial({
//   //   charCount: 2,
//   //   height: 30,
//   //   width: 30,
//   //   fontSize: 18,
//   // });
//   // if (
//   //   receditpermission == false &&
//   //   reccreatepermission == false &&
//   //   (recviewpermission == true || recdeletepermission == true)
//   // ) {
//   //   $('#recommendationbody input[type="text"]').prop("disabled", true);
//   //   $("#recommendationbody textarea").prop("disabled", true);
//   //   $('#recommendationbody input[type="checkbox"]').prop("disabled", true);
//   //   $("#recommendationbody select").prop("disabled", true);
//   //   $(".actionsbtn").hide();
//   // }
//   // $('[data-toggle="tooltip"]').tooltip();
// }

 function generateAvatar(employee) {
    console.log(employee, "employee");
    if (!employee) return '';
    
    var employeeName = employee.name || 'User';
    var initials = employeeName.trim().substring(0, 2).toUpperCase();
    
    if (employee.image) {
        return '<li class="avatar avatar-xs pull-up" ' +
               'data-bs-toggle="tooltip" data-bs-placement="top" ' +
               'title="' + employeeName + '">' +
               '<img src="' + employee.image + '" ' +
               'class="rounded-circle" alt="' + employeeName + '" ' +
               'width="24" height="24">' +
               '</li>';
    } else {
        return '<li class="avatar avatar-xs pull-up rec_res_multiuserimage" ' +
               'data-name="' + employeeName + '" ' +
               'data-bs-toggle="tooltip" data-bs-placement="top" ' +
               'title="' + employeeName + '">' +
               '<img src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' width=\'24\' height=\'24\'%3E%3Crect width=\'24\' height=\'24\' fill=\'%23e9ecef\' rx=\'12\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' fill=\'%23495057\' font-family=\'Arial, sans-serif\' font-size=\'10\' font-weight=\'bold\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3E' + 
               encodeURIComponent(initials) + 
               '%3C/text%3E%3C/svg%3E" ' +
               'class="rounded-circle" alt="' + employeeName + '" ' +
               'width="24" height="24">' +
               '</li>';
    }
}


function recommendationPopSuccessCallback(swotList,typerequest) {
	console.log(swotList, "swotList");
	var tablebody	=	"";
	$("#tableBody").empty();
	if(swotList.swotAnalysisValue.recommendation !=	undefined && swotList.swotAnalysisValue.recommendation !=	""){
		if(swotList.swotAnalysisValue.recommendation.length	!=	0){
			$("#recommendationtype").val('update');
			$("#recommendationcount").val(swotList.swotAnalysisValue.recommendation.length);
		    $.each(swotList.swotAnalysisValue.recommendation, function (i, List) {
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
					removebtnEnable	=	`<i class="fas fa-trash remove-notes" data-toggle="tooltip" data-placement="bottom" title="Delete" style="cursor: pointer;" onclick="deleteRowData(this)"></i>`;
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

function addEmptyRecommendationRow(tablebody, currentEmployeeData) {
  console.log(tablebody, currentEmployeeData, "currentEmployeeData")
  var rowHTML = '<tr class="notes_clone">';
  rowHTML += '<td>';
  rowHTML += '  <div class="form-group">';
  rowHTML += '    <textarea class="form-control recommendation" placeholder="Notes" rows="3" name="recommendation[]"></textarea>';
  rowHTML += '  </div>';
  rowHTML += '</td>';
   rowHTML += '<td class="align-middle recommendation">';
    rowHTML += '  <div class="d-flex align-items-start justify-content-center">';
    rowHTML += '    <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">';
    
    // Show current employee avatar
    if (currentEmployeeData) {
      rowHTML += generateAvatar(currentEmployeeData);
    }
    
    // Add + button if permissions allow
    if (receditpermission == true || reccreatepermission == true) {
      rowHTML += '      <li class="avatar avatar-xs pull-up add-users-btn"  data-toggle="modal" data-target="#attendess-list" data-empId="' + (currentEmployeeData.id || '') + '">';
      rowHTML += '        <span class="avatar-initial rounded-circle" data-toggle="tooltip" data-placement="top" title="Add people">+</span>';
      rowHTML += '      </li>';
    }
    
    rowHTML += '    </ul>';
    rowHTML += '  </div>';
    rowHTML += '</td>';
  rowHTML += '<td class="text-end align-middle">';
  rowHTML += '  <div class="table-actions justify-content-center">';
  rowHTML += '    <a href="#" class="btn btn-sm btn-icon delete-recommendation-row">';
  rowHTML += '      <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" >';
  rowHTML += '        <img src="/stratroom/images/delete-i.svg" width="12" height="12" />';
  rowHTML += '      </span>';
  rowHTML += '    </a>';
  rowHTML += '  </div>';
  rowHTML += '</td>';
  rowHTML += '</tr>';
  
  // Insert the row
  tablebody.insertAdjacentHTML('beforeend', rowHTML);
  
  // Initialize tooltips
  var tooltipTriggerList = [].slice.call(tablebody.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });
  
  // Add delete row functionality
  var newRow = tablebody.lastElementChild;
  var deleteBtn = newRow.querySelector('.delete-recommendation-row');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', function(e) {
      e.preventDefault();
      this.closest('tr').remove();
    });
  }
}


function updateRecommendationAddButtons(tablebody, currentEmployeeData) {
  var rows = tablebody.querySelectorAll('tr');
  
  // Remove all add buttons first
  tablebody.querySelectorAll('.add-recommendation-row').forEach(function(btn) {
    btn.closest('a').remove();
  });
  
  // Add add button to last row if permissions allow
  if (rows.length > 0 && (receditpermission == true || reccreatepermission == true)) {
    var lastRow = rows[rows.length - 1];
    var actionsDiv = lastRow.querySelector('.table-actions');
    
    var addBtnHTML = '<a class="btn btn-sm btn-icon add-recommendation-row">';
    addBtnHTML += '  <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" >';
    addBtnHTML += '    <i class="fas fa-plus title_edit_icon"></i>';
    addBtnHTML += '  </span>';
    addBtnHTML += '</a>';
    
    actionsDiv.insertAdjacentHTML('afterbegin', addBtnHTML);
    
    lastRow.querySelector('.add-recommendation-row').addEventListener('click', function() {
      addEmptyRecommendationRow(tablebody, currentEmployeeData);
    });
    
   
    $('[data-bs-toggle="tooltip"]').tooltip();
  }
}




// Helper function to generate owner avatars (same as before)
function generateOwnerAvatars(ownerIds, ownerList) {
  if (!ownerIds || ownerIds == 'undefined') return '';
  
  var ids = ownerIds.split(',');
  var html = '';
  var validOwners = ownerList.filter(function(owner) { 
    return owner && owner.id && ids.includes(owner.id.toString()); 
  });
  
  // Generate avatars for known owners (first 2)
  validOwners.slice(0, 2).forEach(function(owner) {
    html += '<li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip" data-bs-placement="top" title="' + owner.name + '">';
    html += '  <img src="assets/images/user/user9.jpg" class="rounded-circle" alt="' + owner.name + '" width="24" height="24">';
    html += '</li>';
  });
  
  // Add "+X more" if there are more than 2 owners
  if (validOwners.length > 2) {
    html += '<li class="avatar avatar-xs pull-up"  data-bs-toggle="modal" data-bs-target="#attendess-list">';
    html += '  <span class="avatar-initial rounded-circle" data-bs-toggle="tooltip" data-bs-placement="top" title="' + (validOwners.length - 2) + ' more">+' + (validOwners.length - 2) + '</span>';
    html += '</li>';
  }
  
  return html;
}

 function actionsPopSuccessCallback(swotList,typerequest) {
  console.log(swotList, "swotListData");
    var tablebody = "";
    $("#actionBodyData").empty();
    if(swotList.swotAnalysisValue.actions != undefined && swotList.swotAnalysisValue.actions != ''){
        if(swotList.swotAnalysisValue.actions.length != 0){
            $("#actiontype").val('update');
            $("#actioncount").val(swotList.swotAnalysisValue.actions.length);
            $.each(swotList.swotAnalysisValue.actions, function (i, List) {
                var name = (List.name != undefined?List.name:"");
                var multiowner = ((List.multipleOwners != undefined && List.multipleOwners != '')?List.multipleOwners:currentEmp);
                var checkstatus = (List.status == true?"checked":"");
                var dropdown = '<select id="action-status-01" name="action-status" class="form-select select-dropdown-action actionstatuscheck" placeholder="Select Status">' +
                   '<option value="" selected>Select Status</option>' +
                   '<option value="pending" ' + (List.status == false ? "selected" : "") + '>Pending</option>' +
                   '<option value="completed" ' + (List.status == true ? "selected" : "") + '>Completed</option>' +
                   '</select>';
                var bydate = (List.bydate != undefined?List.bydate:"");
                var todate  = (List.todate != undefined?List.todate:"");
                var taskId  = (List.taskId != undefined?List.taskId:"") || null;
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
                // if(i == swotList.swotAnalysisValue.actions.length - 1) {
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
                actionIcons += `<i class="fas fa-trash remove-action" data-toggle="tooltip" data-placement="bottom" title="Delete" style="cursor: pointer;"></i>`;
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

                // tablebody += '<td class="align-middle text-center">';
                // tablebody += '<div class="form-group mb-0">';
                // tablebody += '<textarea class="form-control pestelactions" placeholder="Enter recommendation" rows="3" name="pestelactions[]" style="resize: vertical; min-height: 80px;"></textarea>';
                // tablebody += '</div>';
                // tablebody += '</td>';

                // tablebody += '<td class="align-middle text-center">';
                // tablebody += '<div class="form-group mb-0">';
                // tablebody += '<input type="date" class="form-control bydate" data-language="en" name="bydate[]" autocomplete="off" />';
                // tablebody += '</div>';
                // tablebody += '</td>';

                // tablebody += '<td class="align-middle text-center">';
                // tablebody += '<div class="form-group mb-0">';
                // tablebody += '<input type="date" class="form-control todate" data-language="en" name="todate[]" autocomplete="off" />';
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

            tablebody += '<td class="align-middle text-center" style="display:none;">';
            tablebody += '<textarea class="form-control pestelactions" placeholder="Enter recommendation taskId" rows="3" name="taskId" style="resize: vertical; min-height: 80px;"></textarea>';
            tablebody += '</td>';

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

// // === Responsible (Multi-owner + Add Button) ===
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

// // === Status (Dropdown) ===
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

function handleswoteventdelete() {
  var id = $("#deleterecordid").val();
  var typeofdeleteurl = $("#deleterecordtype").val();
  if (id == "" || typeofdeleteurl == "") {
    return false;
  }
  var url = "/stratroom/swotAnalysis/" + id;

  $.ajax({
    url: url,
    type: "delete",
    contentType: "application/json",
    success: function (data, status) {
      location.reload(true);
    },
    error: readErrorMsg,
  });
}

function swotPopSuccessCallback(data) {
  swotupdateDescription = data;

  $("#swot_id").val(data.id);
  /*
   * if(data.kpiId == undefined || data.kpiId == ""){
   * $('#Kpi_show_id').val(data.kpiValue.kpiId) }else{
   * $('#Kpi_show_id').val(data.kpiId) }
   */
  $("#strength").val(data.swotAnalysisValue.name);
  $("#strength_type").val(data.swotAnalysisValue.type);
  $("#strength_next_due_date").val(data.swotAnalysisValue.nextduedate);
  $("#strength_impact").find("option").remove().end();
  $("#swot_strength_Form #strength_impact").append(
    `<option value="">Choose impact</option>`
  );
  populateKPIList(
    "#swot_strength_Form #strength_impact",
    data.deptId != undefined ? data.deptId : ""
  );
  $("#strength_impact").val(data.swotAnalysisValue.impact);
  var flag =
    data.swotAnalysisValue.status_flag != undefined
      ? data.swotAnalysisValue.status_flag
      : "";
  if (flag == "success") {
    $("#defaultChecked1").prop("checked", true);
  } else if (flag == "warning") {
    $("#defaultChecked2").prop("checked", true);
  } else if (flag == "danger") {
    $("#defaultChecked3").prop("checked", true);
  }
  $("#department_swot").val(data.deptId != undefined ? data.deptId : "");
  $("#strength_impact,#department_swot").select2({
    selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
    dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown"),
  });
}

function getSwotObj(flagType, action) {
  var name = $("#strength").val();
  var type = $("#strength_type").val();
  var nextduedate = $("#strength_next_due_date").val();
  var impact = $("#strength_impact").val();
  var flag_value = $("input[name='strengthstatus']:checked").val();
  var pageNumber = $("#pagenumber").val();
  var newowners = "";
  var swotObj = {
    active: 0,
    pageId: pageNumber,
    flagType: flagType,
    department:
      $("#department_swot option:selected").text() != "Choose Department"
        ? $("#department_swot option:selected").text()
        : "",
    deptId: $("#department_swot").val(),
    swotAnalysisValue: {
      name: name != undefined && name != "" ? name : "",
      impact: impact != undefined && impact != "" ? impact : "",
      type: type != undefined && type != "" ? type : "",
      status_flag:
        flag_value != undefined && flag_value != "" ? flag_value : "",
      nextduedate: nextduedate,
      newMultipleOwners: newowners,
      attachmentUrl: "",
      recommendation: [],
      actions: [],
      attachment: [],
    },
  };

  var existdatadonotupdate = [
    "name",
    "impact",
    "type",
    "description",
    "status_flag",
    "nextduedate",
  ];
  if (
    action == "edit" &&
    (swotupdateDescription !== undefined || swotupdateDescription != "")
  ) {
    $.each(swotupdateDescription.swotAnalysisValue, function (index, value) {
      if ($.inArray(index, existdatadonotupdate) == -1) {
        swotObj["swotAnalysisValue"][index] = value;
      }
    });
  }

  return swotObj;
  
}

// Strength
function addRow(tableID) {
  var table = document.getElementById(tableID);

  var rowCount = table.rows.length;
  var row = table.insertRow(rowCount);
  row.className = "strengthdata_List";
  row.set;

  var cell1 = row.insertCell(0);
  var element1 = document.createElement("input");
  element1.type = "checkbox";
  element1.name = "chkbox[]";
  cell1.appendChild(element1);

  var cell2 = row.insertCell(1);
  var factor = rowCount;
  cell2.innerHTML =
    '<textarea class="form-control" name="name_text" id="name_text" cols="20" rows="3"placeholder="Strenths"></textarea>';

  var cell3 = row.insertCell(2);
  cell3.innerHTML =
    '<select class="form-control" id="statusType" name="statusType" ><option value="">External</option><option value=""> Internal</option></select>';

  var cell4 = row.insertCell(3);
  cell4.innerHTML =
    '<textarea class="form-control" name="impact_text" id="impact_text" cols="20" rows="3"placeholder="Strenths_Impact"></textarea>';

  var cell5 = row.insertCell(4);
  cell5.innerHTML =
    '<td><a href="#" data-toggle="modal" data-target="#flag"> <img src="images/flag-green.png" alt="status" width="23px" height="23px"> </a> </td>';

  var cell6 = row.insertCell(5);
  cell6.innerHTML = `<a href="#" data-toggle="modal" data-target="#view_input" class="rc-tgrn"><i class="far fa-eye"></i> </a><a href="#" data-toggle="modal" data-target="#input" class="rc-tgrn" id="addinput"><i class="fa fa-plus" aria-hidden=true></i></a>`;

  var cell6 = row.insertCell(6);
  cell6.innerHTML = `<div class="d-flex flex-column">
                                                            <ul class="list-unstyled order-list d-flex">
                                                                <li class="avatar avatar-xs pull-up">
                                                                    <img class="rounded-circle sub_init_img" src="../../assets/images/user/user9.jpg" alt="user" width="50">
                                                                </li>
                                                                <li class="avatar avatar-xs pull-up">
                                                                    <img class="rounded-circle sub_init_img" src="../../assets/images/user/user8.jpg" alt="user" width="50">
                                                                </li>

                                                                <li class="avatar avatar-xs pull-up">
                                                                    <span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+3</span>
                                                                </li>
                                                                <div class="image-upload">
                                                                    <label for="file-input">
                                        <li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" class="favgs" data-toggle="modal" data-target="#addpeople"> <span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle" id="mutipleOwners">+<span id="count"> </span></span></a></li>
                                        </label>

                                                                </div>
                                                            </ul>
                                                            
                                                        </div>`;

  var cell7 = row.insertCell(7);
  cell7.innerHTML =
    '<a href="#" data-toggle="modal" data-target="#view_recommend" class="rounded-circle rc-tgrn">' +
    '<i class="far fa-eye"></i>' +
    "</a>" +
    '<label for="file-input1" class="forfileinput1"><img src="images/attachment.jpg" alt="attachment" width="35px" height="35px"></label> <input class="file-input1" style="display:none" type="file"/>';

  var cell8 = row.insertCell(8);
  cell8.innerHTML =
    // '<a href=""> <i class="fa fa-save savebt" name="Strenghts"
    // aria-hidden="true"></i></a>';
    '<a href="#" > <i  class="fa fa-save savebt "  name="Strengths" > </i></a>';
}

function deleteRow(tableID) {
  var flagType = swottype;
  if (flagType == "Strengths") {
    list = "strength_list";
  } else if (flagType == "Weaknesses") {
    list = "weekness_list";
  } else if (flagType == "Oppurtunities") {
    list = "oppurtunitie_list";
  } else if (flagType == "Threats") {
    list = "threat_list";
  }

  try {
    $("#" + list)
      .find("tr")
      .each(function (d, i) {
        var selt = $(i).find("td:first-child input");
        if ($(selt).prop("checked") == true) {
          var id = $(selt).prop("id");
          console.log("####### delete data ######");
          $.ajax({
            url: "/stratroom/swotAnalysis/" + id,
            type: "DELETE",
            contentType: "application/json",
            success: function (data, status) {
              location.reload(true);
            },
          });
        }
      });
  } catch (e) {
    alert(e);
  }
}

// second table
function addRow2(tableID) {
  var table = document.getElementById(tableID);

  var rowCount = table.rows.length;
  var row = table.insertRow(rowCount);
  row.className = "weaknessdata_List";
  row.set;

  var cell1 = row.insertCell(0);
  var element1 = document.createElement("input");
  element1.type = "checkbox";
  element1.name = "chkbox[]";
  cell1.appendChild(element1);

  var cell2 = row.insertCell(1);
  var factor = rowCount;
  cell2.innerHTML =
    '<textarea class="form-control" name="name_text" id="name_text" cols="20" rows="3"placeholder="Weaknesses"></textarea>';

  var cell3 = row.insertCell(2);
  cell3.innerHTML =
    '<select class="form-control" id="statusType" name="statusType" ><option value="">External</option><option value=""> Internal</option></select>';

  var cell4 = row.insertCell(3);
  cell4.innerHTML =
    '<textarea class="form-control" name="" id="" cols="20" rows="3"placeholder="Weaknesses"></textarea>';

  var cell5 = row.insertCell(4);
  cell5.innerHTML =
    '<td><a href="#" data-toggle="modal" data-target="#flag"> <img src="images/flag-green.png" alt="status" width="23px" height="23px"> </a> </td>';

  var cell6 = row.insertCell(5);
  cell6.innerHTML = `<a href="#" data-toggle="modal" data-target="#view_input" class="rc-tgrn"><i class="far fa-eye"></i> </a><a href="#" data-toggle="modal" data-target="#input" class="rc-tgrn" id="addinput"><i class="fa fa-plus" aria-hidden=true></i></a>`;

  var cell6 = row.insertCell(6);
  cell6.innerHTML = `<div class="d-flex flex-column">
                                                            <ul class="list-unstyled order-list d-flex">
                                                                <li class="avatar avatar-xs pull-up">
                                                                    <img class="rounded-circle sub_init_img" src="../../assets/images/user/user9.jpg" alt="user" width="50">
                                                                </li>
                                                                <li class="avatar avatar-xs pull-up">
                                                                    <img class="rounded-circle sub_init_img" src="../../assets/images/user/user8.jpg" alt="user" width="50">
                                                                </li>

                                                                <li class="avatar avatar-xs pull-up">
                                                                    <span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+3</span>
                                                                </li>
                                                                <div class="image-upload">
                                                                    <label for="file-input">
                                        <li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" class="favgs" data-toggle="modal" data-target="#addpeople"> <span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle" id="mutipleOwners">+<span id="count"> </span></span></a></li>
                                        </label>

                                                                </div>
                                                            </ul>
                                                            
                                                        </div>`;

  var cell7 = row.insertCell(7);
  cell7.innerHTML =
    '<a href="#" data-toggle="modal" data-target="#view_recommend" class="rounded-circle rc-tgrn">' +
    '<i class="far fa-eye"></i>' +
    "</a>" +
    '<label for="file-input1" class="forfileinput1"><img src="images/attachment.jpg" alt="attachment" width="35px" height="35px"></label> <input class="file-input1" style="display:none" type="file"/>';

  var cell8 = row.insertCell(8);
  cell8.innerHTML =
    '<a href="#" > <i  class="fa fa-save savebt"  name="Weaknesses" > </i></a>';
}

// third table
function addRow3(tableID) {
  var table = document.getElementById(tableID);

  var rowCount = table.rows.length;
  var row = table.insertRow(rowCount);
  row.className = "oppurtunitiesdata_List";
  row.set;

  var cell1 = row.insertCell(0);
  var element1 = document.createElement("input");
  element1.type = "checkbox";
  element1.name = "chkbox[]";
  cell1.appendChild(element1);

  var cell2 = row.insertCell(1);
  var factor = rowCount;
  cell2.innerHTML =
    '<textarea class="form-control" name="name_text" id="name_text" cols="20" rows="3"placeholder="Oppurtunities"></textarea>';

  var cell3 = row.insertCell(2);
  cell3.innerHTML =
    '<select class="form-control" id="statusType" name="statusType" ><option value="">External</option><option value=""> Internal</option></select>';

  var cell4 = row.insertCell(3);
  cell4.innerHTML =
    '<textarea class="form-control" name="impact_text" id="impact_text" cols="20" rows="3"placeholder="Oppurtunities"></textarea>';

  var cell5 = row.insertCell(4);
  cell5.innerHTML =
    '<td><a href="#" data-toggle="modal" data-target="#flag"> <img src="images/flag-green.png" alt="status" width="23px" height="23px"> </a> </td>';

  var cell6 = row.insertCell(5);
  cell6.innerHTML = `<a href="#" data-toggle="modal" data-target="#view_input" class="rc-tgrn"><i class="far fa-eye"></i> </a><a href="#" data-toggle="modal" data-target="#input" class="rc-tgrn" id="addinput"><i class="fa fa-plus" aria-hidden=true></i></a>`;
  // cell5.innerHTML = "";

  var cell6 = row.insertCell(6);
  cell6.innerHTML = `<div class="d-flex flex-column">
                                                            <ul class="list-unstyled order-list d-flex">
                                                                <li class="avatar avatar-xs pull-up">
                                                                    <img class="rounded-circle sub_init_img" src="../../assets/images/user/user9.jpg" alt="user" width="50">
                                                                </li>
                                                                <li class="avatar avatar-xs pull-up">
                                                                    <img class="rounded-circle sub_init_img" src="../../assets/images/user/user8.jpg" alt="user" width="50">
                                                                </li>

                                                                <li class="avatar avatar-xs pull-up">
                                                                    <span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+3</span>
                                                                </li>
                                                                <div class="image-upload">
                                                                    <label for="file-input">
                                        <li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" class="favgs" data-toggle="modal" data-target="#addpeople"> <span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle" id="mutipleOwners">+<span id="count"> </span></span></a></li>
                                        </label>

                                                                </div>
                                                            </ul>
                                                            
                                                        </div>`;

  var cell7 = row.insertCell(7);
  cell7.innerHTML =
    '<a href="#" data-toggle="modal" data-target="#view_recommend" class="rounded-circle rc-tgrn">' +
    '<i class="far fa-eye"></i>' +
    "</a>" +
    '<label for="file-input1" class="forfileinput1"><img src="images/attachment.jpg" alt="attachment" width="35px" height="35px"></label> <input class="file-input1" style="display:none" type="file"/>';

  var cell8 = row.insertCell(8);
  cell8.innerHTML =
    '<a href="#" > <i  class="fa fa-save savebt listContainer"  name="Oppurtunities" > </i></a>';
}

// forth table
function addRow4(tableID) {
  var table = document.getElementById(tableID);

  var rowCount = table.rows.length;
  var row = table.insertRow(rowCount);
  row.className = "threatsdata_List";
  row.set;

  var cell1 = row.insertCell(0);
  var element1 = document.createElement("input");
  element1.type = "checkbox";
  element1.name = "chkbox[]";
  cell1.appendChild(element1);

  var cell2 = row.insertCell(1);
  var factor = rowCount;
  cell2.innerHTML =
    '<textarea class="form-control" name="name_text" id="name_text" cols="20" rows="3"placeholder="Threats"></textarea>';

  var cell3 = row.insertCell(2);
  cell3.innerHTML =
    '<select class="form-control" id="statusType" name="statusType" ><option value="">External</option><option value=""> Internal</option></select>';

  var cell4 = row.insertCell(3);
  cell4.innerHTML =
    '<textarea class="form-control" name="" id="" cols="20" rows="3"placeholder="Threats"></textarea>';

  var cell5 = row.insertCell(4);
  cell5.innerHTML =
    '<td><a href="#" data-toggle="modal" data-target="#flag"> <img src="images/flag-green.png" alt="status" width="23px" height="23px"> </a> </td>';

  var cell6 = row.insertCell(5);
  cell6.innerHTML = `<a href="#" data-toggle="modal" data-target="#view_input" class="rc-tgrn"><i class="far fa-eye"></i> </a><a href="#" data-toggle="modal" data-target="#input" class="rc-tgrn" id="addinput"><i class="fa fa-plus" aria-hidden=true></i></a>`;

  var cell6 = row.insertCell(6);
  cell6.innerHTML = `<div class="d-flex flex-column">
                                                            <ul class="list-unstyled order-list d-flex">
                                                                <li class="avatar avatar-xs pull-up">
                                                                    <img class="rounded-circle sub_init_img" src="../../assets/images/user/user9.jpg" alt="user" width="50">
                                                                </li>
                                                                <li class="avatar avatar-xs pull-up">
                                                                    <img class="rounded-circle sub_init_img" src="../../assets/images/user/user8.jpg" alt="user" width="50">
                                                                </li>

                                                                <li class="avatar avatar-xs pull-up">
                                                                    <span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle">+3</span>
                                                                </li>
                                                                <div class="image-upload">
                                                                    <label for="file-input">
                                        <li _ngcontent-hhc-c5="" class="avatar avatar-xs pull-up"><a href="#" class="favgs" data-toggle="modal" data-target="#addpeople"> <span _ngcontent-hhc-c5="" class="avatar-initial rounded-circle" id="mutipleOwners">+<span id="count"> </span></span></a></li>
                                        </label>

                                                                </div>
                                                            </ul>
                                                            
                                                        </div>`;

  var cell7 = row.insertCell(7);
  cell7.innerHTML =
    '<a href="#" data-toggle="modal" data-target="#view_recommend" class="rounded-circle rc-tgrn">' +
    '<i class="far fa-eye"></i>' +
    "</a> >" +
    '<label for="file-input1" class="forfileinput1"><img src="images/attachment.jpg" alt="attachment" width="35px" height="35px"></label> <input class="file-input1" style="display:none" type="file"/>';

  var cell8 = row.insertCell(8);
  cell8.innerHTML =
    '<a href="#" > <i  class="fa fa-save savebt"  name="Threats" > </i></a>';
}

var selectedList = "";

/*
 * $(document).on("click", ".badge", function () { selectedList = $(this) var
 * flagType = swottype if (flagType == "Strenghts") { p =
 * $(this).parents(".strengthdata_List") } else if (flagType == "Weaknesses") {
 * p = $(this).parents(".weaknessdata_List") } else if (flagType ==
 * "Oppurtunities") { p = $(this).parents(".oppurtunitiesdata_List") } else if
 * (flagType == "Threats") { p = $(this).parents(".threatsdata_List") } var id =
 * p.find("td:first-child input").attr("id") if (id) { getswotDetails(id); }
 * else { getreporteeeList(id,".listusers") }
 *
 * });
 */

function getreporteeeListAction(id, listtype) {
  console.log(id, listtype, "idandlistType");
  $(listtype).empty();

  $.ajax({
    url: "/stratroom/user/moduleAccessUserList?moduleName=SWOT",
    contentType: "application/json",
    success: function (data, status) {
      var allChecked = true;

      $.each(data, function (i, List) {
        var userId = List.id;
        var userName = List.name || "User";
        var userImage = List.image;
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

        // Generate checkbox ID safely
        var checkboxId = "attendee_" + userId;

        // Build image or fallback
        var imageHtml = "";
        if (userImage) {
          imageHtml = '<img src="' + userImage + '" alt="' + userName + '" width="18" height="18">';
        } else {
          // Fallback: Use initials (will be styled by .initial())
          imageHtml = '<span class="avatar-initial rounded-circle swotrecmultiuserimage" data-name="' + userName + '"></span>';
        }

        // Build the new-design list item
        var attendeeItem = '';
        attendeeItem += '<div class="list-group-item attendee">';
        attendeeItem += '  <div class="form-check cusom-check form-check-reverse">';
        attendeeItem += '    <input class="form-check-input" type="checkbox" name="swot_action_owner[]" value="' + userId + '" id="' + checkboxId + '" ' + isChecked + '>';
        attendeeItem += '    <label class="form-check-label" for="' + checkboxId + '">';
        attendeeItem += '      <span class="image">' + imageHtml + '</span>';
        attendeeItem += '      <span class="name">' + userName + '</span>';
        attendeeItem += '    </label>';
        attendeeItem += '  </div>';
        attendeeItem += '</div>';

        // Append to target container
        $(listtype).append(attendeeItem);
      });

      // Handle "Select All" checkbox
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

      // Apply initials plugin to fallback avatars
      $(".swotrecmultiuserimage").initial({
        charCount: 2,
        height: 30,
        width: 30,
        fontSize: 18
      });
    },
    error: function () {
      console.error("Failed to load user list.");
    }
  });
}

function getreporteeeList(id, listtype) {
  $(listtype).empty();
  var methodType = "get";
  var listusers = "";

  $.ajax({
    url: "/stratroom/user/moduleAccessUserList?moduleName=SWOT",
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

var multipleOwnerslist = [];

function getswotDetails(id) {
  var methodType = "get";
  $.ajax({
    url: "/stratroom/swotAnalysis/" + id,
    contentType: "application/json",
    type: methodType,
    success: function (data, status) {
      multipleOwnerslist = data.swotAnalysisValue.multipleOwners;
      getreporteeeList(multipleOwnerslist.split(","));
    },
  });
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


//deleteRow Function 
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
  console.log("function Clicked");
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
		});
		var swotObj 	= 	swotupdateDescription;
		swotObj['recommendationmethod']	=	true;
		if(swotObj.swotAnalysisValue.recommendation !=	undefined){
			swotObj.swotAnalysisValue.recommendation	=	recommendation;
		}else{
			swotObj.swotAnalysisValue.recommendation	=	recommendation;
		}
		swotupdateDescription.swotAnalysisValue.newMultipleOwners = "";
		for(var i=0;i<swotObj.swotAnalysisValue.actions.length;i++){
			swotupdateDescription.swotAnalysisValue.actions[i].newMultipleOwners = "";
		}

    console.log(swotObj, "swotObj");
	    $.ajax({
	        url: "/stratroom/swotAnalysis",
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
				swot_type=localStorage.getItem("swotcall_list");
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

        // window.location.reload();
	        },
			error: readErrorMsg
	    });
}
function auditrailpage(data, type) {
  $.ajax({
    url: "/stratroom/auditTrail",
    type: "post",
    async: false,
    contentType: "application/JSON",
    data: JSON.stringify(data),
    success: function (res) {},
    error: function () {
      if (type == "recommendation") {
        $("#recommendation").modal("toggle");
        $(".recommendationclose").click();
      } else if (type == "action") {
        $("#action").modal("toggle");
        $(".actionclose").click();
      } else if (type == "file") {
        $("#attachementuploadfile").val("");
        $("#closeUpload").click();
      } else if (type == "file1") {
        $("#attachementuploadfile1").val("");
        $("#closeUpload").click();
        $("#file_upload_popup1").modal("hide");
      } else {
        checkmodalisclosedornot();
        $("#deleteAttachmentModal").modal("hide");
      }
    },
  });
}

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

    console.log(bydate, todate,taskId,  "ByDatetodate")
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
      todate: todate,
      status: status,
      taskId: taskId ? taskId : null, 
    });
    idindex++;
  });
  var swotObj = swotupdateDescription;
  console.log(swotupdateDescription, "GGGGG");
  swotObj["recommendationmethod"] = true;
  if (swotObj.swotAnalysisValue.actions != undefined) {
    swotObj.swotAnalysisValue.actions = recommendation;
  } else {
    swotObj.swotAnalysisValue.actions = recommendation;
  }
  for (var i = 0; i < swotObj.swotAnalysisValue.recommendation.length; i++) {
    swotupdateDescription.swotAnalysisValue.recommendation[
      i
    ].newMultipleOwners = "";
  }
  swotupdateDescription.swotAnalysisValue.newMultipleOwners = "";

  console.log(swotObj, "swotObject");

  const actionsWithoutTaskId = swotObj.swotAnalysisValue.actions.filter(action =>
      !action.taskId
  );


  console.log(actionsWithoutTaskId, "actionsWithTaskId");

  if(actionsWithoutTaskId?.length > 0){

  var startDate = ""
  var endDate = ""

  function convertDateFormat(dateStr) {
    if (!dateStr) return "";
    return dateStr.replace(/\//g, "-");
}

 startDate = convertDateFormat(actionsWithoutTaskId[0]?.bydate);
 endDate   = convertDateFormat(actionsWithoutTaskId[0]?.todate);



  const taskPayload = {
      id:   "",
      owner: $("#userPrincipal").val().trim(),
      createdBy: $("#userPrincipal").val().trim(),
      deptId: "",
      taskCategoryValue: {
        category: actionsWithoutTaskId[0]?.name,
        priority: "",
        status: actionsWithoutTaskId[0]?.status == false ? "Pending" : "Completed",
        startDate: startDate,
        endDate: endDate,
        progress: 0,
      },
  }

  console.log(taskPayload, "taskPayload");



  //  $.ajax({
  //     url: "/stratroom/taskCategory",
  //     method: "POST",
  //     contentType: "application/json",
  //     data: JSON.stringify(taskPayload),
  //     success: function (response) {
  //       console.log("✅ Task saved successfully:", response);
  //       $("#task-add-modal").modal("hide");
  //       // location.reload();
  //     },
  //     error: function (error) {
  //       console.error("❌ Error saving task:", error);
  //       alert("Failed to save task. Please try again.");
  //     },
  //   });

}




  $.ajax({
    url: "/stratroom/swotAnalysis",
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
      swot_type = localStorage.getItem("swotcall_list");
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
  // var cell2 = row.insertCell(1);
  // cell2.className = 'align-middle text-center';
  // cell2.innerHTML =
  //   '<div class="d-flex justify-content-center">' +
  //   '<input type="text" class="modal-custom-input date_pickers_single bydate form-control" style="height: 34px; max-width: 180px;" data-language="en" name="bydate[]" value="" autocomplete="off" />' +
  //   '</div>';

  //    var cell2 = row.insertCell(2);
  // cell2.className = 'align-middle text-center';
  // cell2.innerHTML =
  //   '<div class="d-flex justify-content-center">' +
  //   '<input type="text" class="modal-custom-input date_pickers_single todate form-control" style="height: 34px; max-width: 180px;" data-language="en" name="todate[]" value="" autocomplete="off" />' +
  //   '</div>';

  // // === CELL 3: Responsible (Owner + User List + Add Button) ===
  // var cell3 = row.insertCell(3);
  // cell3.className = 'align-middle text-center';
  // cell3.innerHTML =
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

  // // === CELL 4: Status (Dropdown) ===
  // var cell4 = row.insertCell(4);
  // cell4.className = 'align-middle text-center';
  // cell4.innerHTML =
  //   '<div class="d-flex justify-content-center">' +
  //   dropdown +
  //   '</div>';

  // === CELL 5: Actions (Delete Icon) ===
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

$(document).on("change", ".file-input1", function () {
  var file = $(this)[0].files[0];
  var id = $(this).attr("data-id");
  var fd = new FormData();
  var thiss = $(this);
  fd.append("file", file);
  $("#SendingAttachment").modal("show");
  $.ajax({
    url: "/stratroom/updateSwotAttachment",
    type: "POST",
    processData: false,
    contentType: false,
    data: fd,
    success: function (data, status, jqxhr) {
      // $(thiss).prop("attUrl", data.attachmentUrl)
      // $(thiss).attr("attUrl", data.attachmentUrl)
      swotajaxautoupdatefileattachement(id, data.attachmentUrl);
    },
    error: function (jqxhr, status, msg) {
      $("#SendingAttachment").modal("hide");
      $.notify("Error: Attachement Failed Size is exceeds", {
        style: "error",
        className: "graynotify",
      });
    },
  }).always(function () {
    $("#SendingAttachment").modal("hide");
  });
});

$(document).on("click", ".openattachement", function () {
  var link = $(this).attr("data-awslink");
  $("#ViewAttachment").modal("show");
  if (link != "") {
    $("#awsviewlink").attr("href", link).attr("target", "_black").text(link);
  } else {
    $("#awsviewlink")
      .attr("href", "#")
      .attr("target", "")
      .text("No Link Available");
  }
});

function swotajaxautoupdatefileattachement(id, attachementurl) {
  $.ajax({
    url: "/stratroom/swotAnalysis/" + id,
    success: function (data, status, jqxhr) {
      var swotObj = data;
      if (swotObj.swotAnalysisValue.attachmentUrl != undefined) {
        swotObj.swotAnalysisValue.attachmentUrl = attachementurl;
      } else {
        swotObj.swotAnalysisValue.attachmentUrl = attachementurl;
      }
      $("#viewfilelink_" + id).attr("data-awslink", attachementurl);
      $.ajax({
        url: "/stratroom/swotAnalysis",
        type: "put",
        contentType: "application/json",
        data: JSON.stringify(swotObj),
        success: function (data, status) {
          $("#SendingAttachment").modal("hide");
          $.notify("Success: Attachement Success", {
            style: "success",
            className: "graynotify",
          });
        },
        error: function (jqxhr, status, msg) {
          $("#SendingAttachment").modal("hide");
          $.notify("Error: Attachement Failed", {
            style: "error",
            className: "graynotify",
          });
        },
      });
    },
    error: function () {
      $("#SendingAttachment").modal("hide");
      $.notify("Error: Attachement Failed", {
        style: "error",
        className: "graynotify",
      });
    },
  });
}

var add_input = "";
$(document).on("click", "#addinput", function () {
  add_input = $(this);
});

$(document).on("click", "#inputform_sbt", function () {
  var input_text = "";
  input_text = $("#input_form_text").val();
  $(add_input).attr("input_text", input_text.trim());
  $("#input").modal("hide");
});

$(document).on("click", "#viewinput", function () {
  $("#input_list_data").empty();
  var flagType = swottype;
  if (flagType == "Strengths") {
    p = $(this).parents(".strengthdata_List");
  } else if (flagType == "Weaknesses") {
    p = $(this).parents(".weaknessdata_List");
  } else if (flagType == "Oppurtunities") {
    p = $(this).parents(".oppurtunitiesdata_List");
  } else if (flagType == "Threats") {
    p = $(this).parents(".threatsdata_List");
  }
  var id = p.find("td:first-child input").attr("id");
  getswotinputFormDetails(id);
});

function getswotinputFormDetails(id) {
  var methodType = "get";
  $.ajax({
    url: "/stratroom/swotAnalysis/" + id,
    contentType: "application/json",
    success: function (data, status) {
      var checktext = data.swotAnalysisValue.inputformValue;
      if (checktext != "") {
        showInputDetails(data.swotAnalysisValue.inputformValue);
      }
    },
  });
}

function showInputDetails(inputformValue) {
  var formtext = inputformValue.split("|");
  $("#input_list_data").empty();
  var formlist = "";
  $.each(formtext, function (i, text) {
    text.trim();
    if (text && text != null) {
      formlist =
        '<li> <i class="fa fa-dot-circle-o" aria-hidden="true"></i>' +
        text +
        "</li>";
      $("#input_list_data").append(formlist);
    } else {
      console.log("## text empty ##" + text);
    }
  });
}

$(document).on("click", ".addflagb", function () {
  radioValue = $("input[name='statusflag']:checked").val();
  $("#flag").modal("hide");
});

function initiativeBar() {
  var $body = $("body");
  if (
    (localStorage.getItem("sidebar_subsidemenu") != "") &
    (localStorage.getItem("sidebar_subsidemenu") != null) &
    (localStorage.getItem("sidebar_subsidemenu") == "closed")
  ) {
    $body.addClass("ini-show");
    $body.removeClass("ini-hide");
    $(".collapse_arrow_left").css("display", "block");
    $(".collapse_arrow_right").css("display", "none");
  }

  if (
    (localStorage.getItem("sidebar_subsidemenu") != "") &
    (localStorage.getItem("sidebar_subsidemenu") != null) &
    (localStorage.getItem("sidebar_subsidemenu") == "opened")
  ) {
    $body.addClass("ini-hide");
    $body.removeClass("ini-show");
    $(".collapse_arrow_left").css("display", "none");
    $(".collapse_arrow_right").css("display", "block");
  }
  if (
    !$body.hasClass("submenu-closed") &&
    !$body.hasClass("side-closed") &&
    !$body.hasClass("ini-hide") &&
    !$body.hasClass("ini-show")
  ) {
    $("#initiative_sidebar").css("left", "230px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "485px");
  } else if (
    $body.hasClass("submenu-closed") &&
    !$body.hasClass("side-closed") &&
    !$body.hasClass("side-closed-hover") &&
    !$body.hasClass("ini-hide") &&
    !$body.hasClass("ini-show")
  ) {
    $("#initiative_sidebar").css("left", "230px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "484px");
  } else if (
    $body.hasClass("side-closed-hover") &&
    !$body.hasClass("side-closed") &&
    !$body.hasClass("submenu-closed") &&
    !$body.hasClass("ini-hide") &&
    !$body.hasClass("ini-show")
  ) {
    $("#initiative_sidebar").css("left", "260px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "484px");
  } else if (
    $body.hasClass("submenu-closed") &&
    $body.hasClass("side-closed") &&
    !$body.hasClass("side-closed-hover") &&
    !$body.hasClass("ini-hide") &&
    !$body.hasClass("ini-show")
  ) {
    $("#initiative_sidebar").css("left", "59px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "313px");
  } else if (
    $body.hasClass("side-closed") &&
    $body.hasClass("side-closed-hover") &&
    !$body.hasClass("submenu-closed") &&
    !$body.hasClass("ini-hide") &&
    !$body.hasClass("ini-show")
  ) {
    $("#initiative_sidebar").css("left", "260px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "514px"); // end default
  } else if (
    $body.hasClass("submenu-closed") &&
    $body.hasClass("ini-hide") &&
    !$body.hasClass("side-closed")
  ) {
    $("#initiative_sidebar").css("left", "-10px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "244px");
  } else if (
    $body.hasClass("submenu-closed") &&
    $body.hasClass("side-closed") &&
    $body.hasClass("ini-hide")
  ) {
    $("#initiative_sidebar").css("left", "-260px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "75px");
  } else if (
    $body.hasClass("ini-hide") &&
    !$body.hasClass("side-closed") &&
    !$body.hasClass("submenu-closed") &&
    !$body.hasClass("side-closed-hover")
  ) {
    $("#initiative_sidebar").css("left", "-10px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "244px");
  } else if (
    $body.hasClass("ini-hide") &&
    $body.hasClass("side-closed-hover") &&
    !$body.hasClass("submenu-closed") &&
    $body.hasClass("side-closed")
  ) {
    $("#initiative_sidebar").css("left", "-260px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "275px"); // end hide
  } else if (
    $body.hasClass("submenu-closed") &&
    $body.hasClass("ini-show") &&
    !$body.hasClass("side-closed")
  ) {
    $("#initiative_sidebar").css("left", "230px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "485px");
  } else if (
    $body.hasClass("submenu-closed") &&
    $body.hasClass("side-closed") &&
    $body.hasClass("ini-show")
  ) {
    $("#initiative_sidebar").css("left", "60px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "314px");
  } else if (
    $body.hasClass("ini-show") &&
    !$body.hasClass("side-closed") &&
    !$body.hasClass("submenu-closed") &&
    !$body.hasClass("side-closed-hover")
  ) {
    $("#initiative_sidebar").css("left", "230px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "485px");
  } else if (
    $body.hasClass("ini-show") &&
    $body.hasClass("side-closed-hover") &&
    !$body.hasClass("submenu-closed") &&
    $body.hasClass("side-closed")
  ) {
    $("#initiative_sidebar").css("left", "260px");
    $("#section").css("margin-top", "34px");
    $("#section").css("margin-right", "15px");
    $("#section").css("margin-bottom", "0");
    $("#section").css("margin-left", "514px");
  }

  // swot and pestel edit delete icon
  if (
    $(".swoteditdeleteicons").length &&
    !$body.hasClass("ini-hide") &&
    !$body.hasClass("ini-show") &&
    $body.hasClass("submenu-closed") &&
    !$body.hasClass("side-closed")
  ) {
    $(".swoteditdeleteicons").css("padding-left", "0px");
  } else if (
    $(".swoteditdeleteicons").length &&
    $body.hasClass("ini-show") &&
    !$body.hasClass("submenu-closed") &&
    !$body.hasClass("side-closed")
  ) {
    $(".swoteditdeleteicons").css("padding-left", "0px");
  } else if (
    $(".swoteditdeleteicons").length &&
    !$body.hasClass("ini-hide") &&
    !$body.hasClass("ini-show") &&
    !$body.hasClass("submenu-closed") &&
    !$body.hasClass("side-closed")
  ) {
    $(".swoteditdeleteicons").css("padding-left", "0px");
  } else if (
    $(".swoteditdeleteicons").length &&
    $body.hasClass("ini-hide") &&
    $body.hasClass("submenu-closed") &&
    !$body.hasClass("side-closed")
  ) {
    if ($(".swoteditdeleteicons").css("padding-left") == "0px") {
      $(".swoteditdeleteicons").css("padding-left", "15px");
    } else {
      $(".swoteditdeleteicons").css("padding-left", "0px");
    }
  } else if (
    $(".swoteditdeleteicons").length &&
    $body.hasClass("ini-show") &&
    $body.hasClass("side-closed-hover")
  ) {
    if ($(".swoteditdeleteicons").css("padding-left") == "0px") {
      $(".swoteditdeleteicons").css("padding-left", "15px");
    } else {
      $(".swoteditdeleteicons").css("padding-left", "0px");
    }
  } else if (
    $(".swoteditdeleteicons").length &&
    $body.hasClass("ini-show") &&
    $body.hasClass("submenu-closed") &&
    !$body.hasClass("side-closed")
  ) {
    $(".swoteditdeleteicons").css("padding-left", "0px");
  } else if (
    $(".swoteditdeleteicons").length &&
    $body.hasClass("side-closed") &&
    $body.hasClass("ini-show") &&
    $body.hasClass("submenu-closed")
  ) {
    $(".swoteditdeleteicons").css("padding-left", "15px");
  } else if (
    $(".swoteditdeleteicons").length &&
    $body.hasClass("side-closed") &&
    $body.hasClass("submenu-closed") &&
    !$body.hasClass("ini-hide")
  ) {
    $(".swoteditdeleteicons").css("padding-left", "15px");
  } else if (
    $(".swoteditdeleteicons").length &&
    $body.hasClass("side-closed") &&
    $body.hasClass("side-closed-hover")
  ) {
    $(".swoteditdeleteicons").css("padding-left", "0px");
  } else if (
    $(".swoteditdeleteicons").length &&
    $body.hasClass("ini-hide") &&
    $body.hasClass("side-closed") &&
    $body.hasClass("side-closed-hover")
  ) {
    if ($(".swoteditdeleteicons").css("padding-left") == "0px") {
      $(".swoteditdeleteicons").css("padding-left", "15px");
    } else {
      $(".swoteditdeleteicons").css("padding-left", "0px");
    }
  } else if (
    $(".swoteditdeleteicons").length &&
    $body.hasClass("ini-hide") &&
    $body.hasClass("side-closed") &&
    $body.hasClass("submenu-closed")
  ) {
    if (
      $(".swoteditdeleteicons").css("padding-left") == "15px" ||
      $(".swoteditdeleteicons").css("padding-left") == "0px"
    ) {
      $(".swoteditdeleteicons").css("padding-left", "25px");
    } else {
      $(".swoteditdeleteicons").css("padding-left", "25px");
    }
  }
}

$(".content, .navbar").mouseenter(function () {
  var $body = $("body");
  $body.removeClass("side-closed-hover");
  $body.addClass("submenu-closed");
  initiativeBar();
});

$(".sidebar").mouseenter(function () {
  var $body = $("body");
  $body.addClass("side-closed-hover");
  $body.removeClass("submenu-closed");
  initiativeBar();
});
if (localStorage.getItem("sidebar_option")) {
  jQuery("body").addClass(localStorage.getItem("sidebar_option"));
}
if ($("body").hasClass("side-closed")) {
  $(".sidebar-user-panel").css({
    display: "none",
  });
  initiativeBar();
} else {
  $(".sidebar-user-panel").css({
    display: "block",
  });

  initiativeBar();
}

$("#sub-ini-box_view").slimscroll({
  height: "450px",
  size: "3px",
  color: "#9c9c9c",
});

// function handleMultioownersuserevent(id, action) {
//   console.log(id, action, "id actiondata");
//   if (editpermission == false && createpermission == false) {
//     return false;
//   }
//   var imageElement = "initiativeactivitieUser" + id;
//   $("#swotajaxid").val(id);
//   var data = {};
//   if (action == "edit") {
//     $("#activities-ini-box_view_users").html("");
//     $("#activities-ini-box_view_users").html(
//       '<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>'
//     );
//     $("#activities_current_id").attr("data-activities_sub_current_id", id);

//     $.ajax({
//       url: "/stratroom/user/moduleAccessUserList?moduleName=SWOT",
//       async: false,
//       success: function (result, status) {
//         var subinitiativeUser = "";
//         var ischecked = "";
//         var selectedItem = [];

//         if ($("#activities_selected_user_" + id).length) {
//           selectedItem = $("#activities_selected_user_" + id)
//             .val()
//             .split(",");
//         }

//         var datas = [];
//         $.each(result, function (index, users) {
//           datas.push(users.id);
//         });

//         if (result.length == 0) {
//           $(".showactivitiesusers").css("display", "none");
//         }

//         if (result.length == selectedItem.length) {
//           $("#allusersactivities").prop("checked", "checked");
//         } else {
//           $("#allusersactivities").prop("checked", false);
//         }

//         $.each(result, function (index, users) {
//           var username =
//             users.name == undefined || users.name == "" ? "User" : users.name;
//           var userProfileConcate =
//             users.image == undefined || users.image == ""
//               ? "data-name='" +
//                 username +
//                 "' class='rounded-circle swotmultiuserimage' "
//               : " class='rounded-circle' src='" + users.image + "'";
//           $.each(selectedItem, function (key, value) {
//             if (value == users.id) {
//               ischecked = "checked";
//               return false;
//             } else {
//               ischecked = "";
//             }
//           });
//           subinitiativeUser +=
//             '<div class="d-flex flex-row employe_content_border sub_initiative_details"><div class="d-flex flex-column flex-fill profile_content"><div class="d-flex flex-row"><div class="form-check"><label class="form-check-label"><input id="" class="form-check-input" name="activities_owner[]" ' +
//             ischecked +
//             ' type="checkbox" value="' +
//             users.id +
//             '"><span class="form-check-sign"> <span class="check"></span></span></label></div><div class="d-flex flex-column init_flex_profile" style="margin-top: 3%;text-align: center;"><h5>' +
//             users.name +
//             '</h5></div><div class="img_details" style="width: 20%;"><img alt="' +
//             username +
//             '" ' +
//             userProfileConcate +
//             "></div></div></div></div>";
//         });
//         $("#activities-ini-box_view_users").html("");
//         $("#activities-ini-box_view_users").html(subinitiativeUser);
//         $(".swotmultiuserimage").initial({
//           charCount: 2,
//           height: 30,
//           width: 30,
//           fontSize: 18,
//         });
//       },
//     });

//     $.ajax({
//       url: "/stratroom/swotAnalysis/" + id,
//       async: false,
//       success: function (result, status) {
//         swotupdateDescription = result;
//         localStorage.setItem(
//           "existingowners",
//           swotupdateDescription.swotAnalysisValue.multipleOwners
//         );
//       },
//       error: readErrorMsg,
//     });
//   }
// }


function handleMultioownersuserevent(id, action) {
    console.log(id, action, "id, action");

	var getData = []

	      $.ajax({
            url: "/stratroom/swotAnalysis/" + id,
            async: false,
            success: function(result, status) {
                swotupdateDescription = result;
				getData = result.multipleOwerlist;
				console.log(result, "swotupdateDescription");
                localStorage.setItem('existingowners', swotupdateDescription.swotAnalysisValue.multipleOwners);
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
            url: "/stratroom/user/moduleAccessUserList?moduleName=SWOT",
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


$(document).on("click", "input[name='activities_owner[]']", function () {
  var id = $("#swotajaxid").val();
  if (
    swotupdateDescription == undefined ||
    swotupdateDescription == "" ||
    swotupdateDescription.id == ""
  ) {
    return false;
  }
  var swotObj = swotupdateDescription;
  var multiowners = $("input[name='activities_owner[]']:checked")
    .map(function () {
      return this.value;
    })
    .get();
  if (multiowners.length == 0) {
    swotObj.swotAnalysisValue.multipleOwners = currentEmp;
  } else {
    swotObj.swotAnalysisValue.multipleOwners = multiowners.join(",");
  }
  swotupdateDescription = swotObj;
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
  var newowner = swotObj.swotAnalysisValue.multipleOwners;
  var newowners;
  newowners = getNewOwners(oldowners, newowner);
  swotObj.swotAnalysisValue.newMultipleOwners = newowners;
  for (var i = 0; i < swotObj.swotAnalysisValue.recommendation.length; i++) {
    swotupdateDescription.swotAnalysisValue.recommendation[
      i
    ].newMultipleOwners = "";
  }
  for (var i = 0; i < swotObj.swotAnalysisValue.actions.length; i++) {
    swotupdateDescription.swotAnalysisValue.actions[i].newMultipleOwners = "";
  }
  var methodType = "put";

  console.log(swotObj, "swotObj");

  const multipleOwnersStr = swotObj.swotAnalysisValue.multipleOwners;
  const uniqueOwners = [...new Set(multipleOwnersStr.split(',').map(id => id.trim()))].filter(id => id && id !== 'undefined');
  const cleanedMultipleOwners = uniqueOwners.join(',');

swotObj.swotAnalysisValue.multipleOwners = cleanedMultipleOwners;

console.log(swotObj, "swotObj after removing duplicates");
  $.ajax({
    url: "/stratroom/swotAnalysis/",
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
      url: "/stratroom/user/moduleAccessUserList?moduleName=SWOT",
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

$(document).on("click", "input[name='swot_action_owner[]']", function () {
  if (createpermission == false && editpermission == false) {
    return false;
  }
});

$(document).on("click", "input[name='swot_rec_owner[]']", function () {
  if (createpermission == false && editpermission == false) {
    return false;
  }

  if ($("#addpeopleactions").is(":visible") == true) {
    var res_peopleid = $("#actionsresponsibleid").val();
    var multiowners = $(
      ".actionslistusers input[name='swot_action_owner[]']:checked"
    )
      .map(function () {
        return this.value;
      })
      .get();
    if (multiowners.length == 0) {
      $("#action_multiownerid_" + res_peopleid).val(currentEmp);
    } else {
      $("#action_multiownerid_" + res_peopleid).val(multiowners.join(","));
    }
  }
  if ($("#addpeople").is(":visible") == true) {
    var multiowners = $("input[name='swot_rec_owner[]']:checked")
      .map(function () {
        return this.value;
      })
      .get();

    var res_peopleid = $("#responsibleid").val();
    if (multiowners.length == 0) {
      $("#rec_multiownerid_" + res_peopleid).val(currentEmp);
    } else {
      $("#rec_multiownerid_" + res_peopleid).val(multiowners.join(","));
    }
  }
});

$(document).on("click", ".peopleselectedUsers", function () {
  console.log("function people clicked")
  if (createpermission == false && editpermission == false) {
    return false;
  }
  $("#searchrecommendation").val("");
  $("#search2").show();
  $("#search_section2").hide();
  var id = $("#responsibleid").val();
  console.log(id, "idddd")
  if (id == undefined || id == "" || id == " ") {
    return false;
  }

  console.log("moveddd");

  var multiowners = $("input[name='swot_rec_owner[]']:checked")
    .map(function () {
      return this.value;
    })
    .get();

  if (multiowners.length == 0) {
    $("#rec_multiownerid_" + id).val(currentEmp);
  } else {
    $("#rec_multiownerid_" + id).val(multiowners.join(","));
  }

  var modalPopupName = 'data-toggle="modal" data-target="#addpeople"';
  var imageElement = "recommendationMultiowner_" + id;
  var functionParams = id;
  var functionName = "recommendationaddpeople";

  if (!jQuery.isEmptyObject(multiowners)) {
    $.ajax({
      url: "/stratroom/user/moduleAccessUserList?moduleName=SWOT",
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
                      "' class='rounded-circle rec_res_multiuserimage' "
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
                  "' class='rounded-circle rec_res_multiuserimage' "
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
        $(".rec_res_multiuserimage").initial({
          charCount: 2,
          height: 30,
          width: 30,
          fontSize: 18,
        });
      },
    });
  } else {
    var users = topparentswotDetails;
    $("#rec_multiownerid_" + id).val(users.id);
    var username =
      users.name == undefined || users.name == "" ? "User" : users.name;
    var userProfileConcate =
      users.image == undefined || users.image == ""
        ? "data-name='" +
          username +
          "' class='rounded-circle rec_res_multiuserimage' "
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
    $(".rec_res_multiuserimage").initial({
      charCount: 2,
      height: 30,
      width: 30,
      fontSize: 18,
    });
  }
});

$(document).on("click", ".actionpeopleselectedUsers", function () {
  console.log("function clicked");
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

  console.log(id, "moved");

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
      url: "/stratroom/user/moduleAccessUserList?moduleName=SWOT",
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

$(".submitevent").click(function () {
  if ($("#strength_next_due_date").val() == "") {
    $(".input-calender-icon").css("bottom", "45%");
  } else {
    $(".input-calender-icon").css("bottom", "45%");
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
var readerValue = "";
function readFile(input) {
  if (input.files && input.files[0]) {
    file = input.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      readerValue = reader.result;
    };
  }
}

var attachment = [];
var attachmentdeleteId = "";
$(".addfilemeetingoption").click(function () {
  $("#fileuploadtype").val("create");
});
function handleUploadShow(id) {
  swotGlobalid = id;
  if (
    (createpermission == false ||
      editpermission == false ||
      deletepermission == false) &&
    meetingsloadcontent == false
  ) {
    return false;
  }
  $("#fileuploadtype").val("create");
  $('[data-toggle="tooltip"]').tooltip("hide");
  $('[rel="tooltip"]').tooltip("hide");
  attachmentdeleteId = id;
  $.ajax({
    url: "/stratroom/swotAttachList/" + id,
    async: false,
    method: "GET",
    success: function (data, status) {
      //swotupdateDescription	=	data;
      //attachment = data.swotAnalysisValue.attachment;
      uploadShow(data);
    },
    error: readErrorMsg,
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

$("#file_upload_popup").click(function () {
  $.ajax({
    url: "/stratroom/swotAnalysis/" + attachmentdeleteId,
    async: false,
    method: "GET",
    success: function (data, status) {
      swotupdateDescription = data;
      console.log(data);
      attachment = data.swotAnalysisValue.attachment;
    },
    error: readErrorMsg,
  });
});

var finalatt = [];

$("#attachementupload").click(function () {
  if (!$("#attachementuploadfile").val()) {
    $.notify("Error:Kindly upload a file", {
      style: "error",
      className: "graynotify",
    });
    return false;
  }

  var file = $("#attachementuploadfile")[0].files[0];

  if (file == undefined) {
    return false;
  }

  var fileName = file.name;
  const words = fileName.split(".");

  var idindex = 1;
  if (attachment != undefined) {
    if (attachment.length > 0) {
      var array = attachment[attachment.length - 1];
      idindex = array.id;
      idindex++;
    } else {
      idindex++;
    }
  }

  var objvalue = {
    name: words[0],
    type: words[words.length - 1],
    size: bytesToSize(file.size),
    file: readerValue,
    active: 0,
    swotAnalysisId: swotGlobalid,
  };

  /*if(attachment != undefined) {		
		if(attachment.length > 0){
			attachment.push(objvalue);
		} else {		
			 attachment.push(objvalue);
		}
	}else{		
		finalatt.push(objvalue);
	}	
	var swotObj			=	swotupdateDescription.id;
	if(swotObj.swotAnalysisValue.attachment !=	undefined){
		swotObj.swotAnalysisValue.attachment	=	attachment;
	} else {
		swotObj.swotAnalysisValue.attachment	=	finalatt;
	}*/

  $.ajax({
    url: "/stratroom/swotAttach",
    method: "post",
    async: false,
    contentType: "application/json",
    data: JSON.stringify(objvalue),
    success: function (data, status) {
      $.ajax({
        url: "/stratroom/swotAttachList/" + swotGlobalid,
        async: false,
        method: "GET",
        success: function (datafile, status) {
          var systemip = localStorage.getItem("systemip");
          swot_type = localStorage.getItem("swotcall_list");
          swot_type =
            swot_type == null || swot_type == "" ? "Strengths" : swot_type;
          var type = $("#fileuploadtype").val();
          var action = swot_type + " Attachment Uploaded";
          var navigateempId = $("#userPrincipalnavigate").val();
          var data = {
            createdBy: currentEmp,
            userId: navigateempId,
            typeId: swotGlobalid,
            action: action,
            systemIp: systemip,
          };
          auditrailpage(data, "file");
          $("#attachementuploadfile").val("");
          $("#closeUpload").click();
          checkmodalisclosedornot();
          uploadShow(datafile);
        },
      });
    },
    error: readErrorMsg,
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
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}

var del_attachment = [];
var attachmentObjId = "";
var value = "";
function deleteAttachment(id, objId) {
  value = $(this);
  attachmentdeleteId = id;
  attachmentObjId = objId;
  $(window).on("resize", function () {
    $(".modal:visible").each(alignModal);
  });
  $(".modal").on("shown.bs.modal", alignModal);
  /*$.ajax({
		url : "/stratroom/swotAnalysis/" + id,
		async:false,
		method:'GET',
		success : function(data,status){
			swotupdateDescription	=	data;			
			del_attachment = data.swotAnalysisValue.attachment;			
		},
		error:readErrorMsg
	});*/
}

function deleteuploadAttachment() {
  if (attachmentObjId == "") {
    return false;
  }

  $.ajax({
    url: "/stratroom/swotAttach/" + attachmentObjId,
    type: "DELETE",
    contentType: "application/json",
    success: function (data, status) {
      // Hide the modal immediately after successful DELETE
      $("#deleteAttachmentModal").modal("hide");

      $.ajax({
        url: "/stratroom/swotAttachList/" + swotGlobalid,
        async: false,
        method: "GET",
        success: function (datafile, status) {
          var systemip = localStorage.getItem("systemip");
          swot_type = localStorage.getItem("swotcall_list");
          swot_type = swot_type == null || swot_type == "" ? "Strengths" : swot_type;
          var action = swot_type + " Attachment Deleted";
          var navigateempId = $("#userPrincipalnavigate").val();
          var data = {
            createdBy: currentEmp,
            userId: navigateempId,
            typeId: swotGlobalid,
            action: action,
            systemIp: systemip,
          };
          auditrailpage(data, "delete");
          checkmodalisclosedornot();
          uploadShow(datafile);
        },
      });
    },
    error: readErrorMsg,
  });
}


var update_attachment = [];
var updateattachementId = "";
var updateattachementObjId = "";
function updateAttachment(id, objId) {
  value = $(this);
  updateattachementId = id;
  updateattachementObjId = objId;
  $.ajax({
    url: "/stratroom/swotAttach/" + objId,
    async: false,
    method: "GET",
    success: function (data, status) {
      //update_attachment = data.swotAnalysisValue.attachment;
    },
    error: readErrorMsg,
  });
}

$("#attachementupload1").click(function () {
  if (!$("#attachementuploadfile1").val()) {
    $.notify("Error:Kindly upload a file", {
      style: "error",
      className: "graynotify",
    });
    return false;
  }

  var file = $("#attachementuploadfile1")[0].files[0];

  if (file == undefined) {
    return false;
  }

  var fileName = file.name;
  const words = fileName.split(".");

  var objvalue = {
    id: updateattachementObjId,
    name: words[0],
    type: words[words.length - 1],
    size: bytesToSize(file.size),
    file: readerValue,
    active: 0,
    swotAnalysisId: swotGlobalid,
  };
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
	if(swotObj.swotAnalysisValue.attachment !=	undefined){
		swotObj.swotAnalysisValue.attachment	=	update_attachment;
	} else {
		swotObj.swotAnalysisValue.attachment	=	update_attachment;
	}*/

  $.ajax({
    url: "/stratroom/swotAttach",
    method: "PUT",
    async: false,
    contentType: "application/json",
    data: JSON.stringify(objvalue),
    success: function (data, status) {
      $.ajax({
        url: "/stratroom/swotAttachList/" + swotGlobalid,
        async: false,
        method: "GET",
        success: function (datafile, status) {
          swot_type = localStorage.getItem("swotcall_list");
          swot_type =
            swot_type == null || swot_type == "" ? "Strengths" : swot_type;
          var action = swot_type + " Attachment Modified";
          var systemip = localStorage.getItem("systemip");
          var navigateempId = $("#userPrincipalnavigate").val();
          var data = {
            createdBy: currentEmp,
            userId: navigateempId,
            typeId: swotGlobalid,
            action: action,
            systemIp: systemip,
          };
          auditrailpage(data, "file1");

          $("#attachementuploadfile1").val("");
          $("#closeUpload").click();
          checkmodalisclosedornot();
          uploadShow(datafile);
          $("#file_upload_popup1").modal("hide");
        },
      });
    },
    error: readErrorMsg,
  });
});

$(".collapse_arrow_left").on("click", function () {
  $(this).css("display", "none");
  $(".collapse_arrow_right").css("display", "block");
  var $body = $("body");
  $body.addClass("ini-hide");
  $body.removeClass("ini-show");
  localStorage.setItem("sidebar_subsidemenu", "opened");
  initiativeBar();
});

$(".collapse_arrow_right").on("click", function () {
  $(this).css("display", "none");
  $(".collapse_arrow_left").css("display", "block");
  var $body = $("body");
  $body.addClass("ini-show");
  $body.removeClass("ini-hide");
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

$(document).on("click", "#allusersaccess", function () {
  if (editpermission == false && createpermission == false) {
    return false;
  }
  var propcheck = $(this).is(":checked");
  if (propcheck == true) {
    $(".listusers input[name='swot_rec_owner[]']").each(function (
      index,
      value
    ) {
      $(this).prop("checked", "checked");
    });
  }
  if (propcheck == false) {
    $(".listusers input[name='swot_rec_owner[]']").each(function (
      index,
      value
    ) {
      $(this).prop("checked", false);
    });
  }
});

$("#search2").click(function () {
  $("#search_section2").show();
  $("#search2").hide();
});

$("#close_search2").click(function () {
  $("#searchrecommendation").val("");
  var value = $("#searchrecommendation").val().toLowerCase();
  $(".listusers .employe_content_border h5").filter(function (e) {
    var FindElement = $(this).closest("div.employe_content_border");
    //var FindElement	=	$(this).closest("div.employe_content_border").find(".profile_content");
    if ($(this).text().toLowerCase().indexOf(value) > -1) {
      $(FindElement).attr("style", "display:block !important");
    } else {
      $(FindElement).attr("style", "display:none !important");
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

$(document).on("click", "#allusersactions", function () {
  if (editpermission == false && createpermission == false) {
    return false;
  }
  var propcheck = $(this).is(":checked");
  if (propcheck == true) {
    $(".actionslistusers input[name='swot_action_owner[]']").each(function (
      index,
      value
    ) {
      $(this).prop("checked", "checked");
    });
  }
  if (propcheck == false) {
    $(".actionslistusers input[name='swot_action_owner[]']").each(function (
      index,
      value
    ) {
      $(this).prop("checked", false);
    });
  }
});

$("#actions_search2").click(function () {
  $("#actions_search_section2").show();
  $("#actions_search2").hide();
});

$("#action_close_search2").click(function () {
  $("#searchactions").val("");
  var value = $("#searchactions").val().toLowerCase();
  $(".actionslistusers .employe_content_border h5").filter(function (e) {
    var FindElement = $(this).closest("div.employe_content_border");
    //var FindElement	=	$(this).closest("div.employe_content_border").find(".profile_content");
    if ($(this).text().toLowerCase().indexOf(value) > -1) {
      $(FindElement).attr("style", "display:block !important");
    } else {
      $(FindElement).attr("style", "display:none !important");
    }
  });
  $("#actions_search2").show();
  $("#actions_search_section2").hide();
});

$("#searchactions").on("keyup", function () {
  var value = $(this).val().toLowerCase();
  $(".actionslistusers .employe_content_border h5").filter(function (e) {
    var FindElement = $(this).closest("div.employe_content_border");
    //var FindElement	=	$(this).closest("div.employe_content_border").find(".profile_content");
    if ($(this).text().toLowerCase().indexOf(value) > -1) {
      $(FindElement).attr("style", "display:block !important");
    } else {
      $(FindElement).attr("style", "display:none !important");
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
        url: "/stratroom/swotAnalysis/",
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


// $(document).on("click", "#allusersactivities", function () {
//   if (editpermission == false && createpermission == false) {
//     return false;
//   }
//   var propcheck = $(this).is(":checked");
//   if (propcheck == true) {
//     $("#activities-ini-box_view_users input[name='activities_owner[]']").each(
//       function (index, value) {
//         $(this).prop("checked", "checked");
//       }
//     );
//   }
//   if (propcheck == false) {
//     $("#activities-ini-box_view_users input[name='activities_owner[]']").each(
//       function (index, value) {
//         $(this).prop("checked", false);
//       }
//     );
//   }

//   var id = $("#swotajaxid").val();
//   if (
//     swotupdateDescription == undefined ||
//     swotupdateDescription == "" ||
//     swotupdateDescription.id == ""
//   ) {
//     return false;
//   }
//   var swotObj = swotupdateDescription;
//   var multiowners = $("input[name='activities_owner[]']:checked")
//     .map(function () {
//       return this.value;
//     })
//     .get();

//   if (multiowners.length == 0) {
//     swotObj.swotAnalysisValue.multipleOwners = currentEmp;
//   } else {
//     swotObj.swotAnalysisValue.multipleOwners = multiowners.join(",");
//   }

//   var methodType = "put";

//   $.ajax({
//     url: "/stratroom/swotAnalysis/",
//     type: methodType,
//     contentType: "application/json",
//     data: JSON.stringify(swotObj),
//     success: function (data, status) {
//       // $.notify("Updated Successfully");
//     },
//     error: function (msg, status) {
//       if (!jQuery.isEmptyObject(msg.responseText)) {
//         $.each(JSON.parse(msg.responseText), function (key, value) {
//           if (key == "exception") {
//             $.notify("Error:" + value, {
//               style: "error",
//               className: "graynotify",
//             });
//           }
//           if (key == "error") {
//             $.notify("Error:" + value, {
//               style: "error",
//               className: "graynotify",
//             });
//           }
//         });
//       }
//     },
//   });
// });

$("#activities_search2").click(function () {
  $("#activities_search_section2").show();
  $("#activities_search2").hide();
});

$("#activities_close_search2").click(function () {
  $("#searchactivities").val("");
  $("#activities_search2").show();
  $("#activities_search_section2").hide();
  var value = $("#searchactivities").val().toLowerCase();
  $("#activities-ini-box_view_users .employe_content_border h5").filter(
    function (e) {
      var FindElement = $(this).closest("div.employe_content_border");
      //var FindElement	=	$(this).closest("div.employe_content_border").find(".profile_content");
      if ($(this).text().toLowerCase().indexOf(value) > -1) {
        $(FindElement).attr("style", "display:block !important");
      } else {
        $(FindElement).attr("style", "display:none !important");
      }
    }
  );
  $("#activities_search2").show();
  $("#activities_search_section2").hide();
});

$("#searchactivities").on("keyup", function () {
  var value = $(this).val().toLowerCase();
  $("#activities-ini-box_view_users .employe_content_border h5").filter(
    function (e) {
      var FindElement = $(this).closest("div.employe_content_border");
      //var FindElement	=	$(this).closest("div.employe_content_border").find(".profile_content");
      if ($(this).text().toLowerCase().indexOf(value) > -1) {
        $(FindElement).attr("style", "display:block !important");
      } else {
        $(FindElement).attr("style", "display:none !important");
      }
    }
  );
});



var currentRowIndex = null;

document.addEventListener('click', function(e) {
  const addBtn = e.target.closest('.add-users-btn');
  console.log(addBtn, "addBtn");
  if (addBtn) {
    currentRowIndex = addBtn.dataset.rowIndex;
    console.log(currentRowIndex, "currentRowIndex");
  }
});

function updateCheckedEmployees() {
  checkedEmployeeIds = [];
  const checkboxes = document.querySelectorAll('#attendess-list input[name="attendees"]:checked');
  
  for (let i = 0; i < checkboxes.length; i++) {
    const id = checkboxes[i].id.replace('attendee_', '');
    checkedEmployeeIds.push(id);
  }
  
  console.log('Checked Employees:', checkedEmployeeIds);
  
  if (currentRowIndex !== null) {
    addUsersToRow(checkedEmployeeIds, currentRowIndex);
  }

  $('#attendess-list').modal('hide');
}

function addUsersToRow(employeeIds, rowIndex) {
  const rows = document.querySelectorAll('#recommendationbody tr');
  const row = rows[rowIndex];
  const container = row.querySelector('.avatar-group');
  console.log(employeeIds, rowIndex, "employyeIds and rowIndex");
  console.log(employeeIds, rowIndex, "employyeIds and rowIndex");
  container.innerHTML = '';
  
  if (currentEmployeeData) {
    container.insertAdjacentHTML('beforeend', generateAvatar(currentEmployeeData));
  }
  
  const otherEmployeeIds = employeeIds.filter(function(id) { return id !== (currentEmployeeData && currentEmployeeData.id); });

  const maxVisible = 2;
  const visibleEmployees = otherEmployeeIds.slice(0, maxVisible);
  const hiddenCount = Math.max(0, otherEmployeeIds.length - maxVisible);
  
  visibleEmployees.forEach(function(employeeId) {
    const employee = employeeListData.find(function(e) { return e.id == employeeId; });
    if (employee) {
      container.insertAdjacentHTML('beforeend', generateAvatar(employee));
    }
  });
  
  if (hiddenCount > 0) {
    container.insertAdjacentHTML('beforeend',
      '<li class="avatar avatar-xs pull-up" data-bs-toggle="tooltip" ' +
      'data-bs-placement="top" title="' + 
      otherEmployeeIds.slice(maxVisible).map(function(id) {
        const emp = employeeListData.find(function(e) { return e.id == id; });
        return (emp && emp.name) || id;
      }).join(', ') + '">' +
      '<span class="avatar-initial rounded-circle bg-secondary">+' + hiddenCount + '</span>' +
      '</li>');
  }
  
  if (receditpermission == true || reccreatepermission == true) {
    container.insertAdjacentHTML('beforeend', 
      '<li class="avatar avatar-xs pull-up add-users-btn" ' +
      'data-bs-toggle="modal" data-bs-target="#attendess-list" ' +
      'data-row-index="' + rowIndex + '">' +
      '  <span class="avatar-initial rounded-circle" ' +
      '  data-bs-toggle="tooltip" data-bs-placement="top" ' +
      '  title="Add people">+</span>' +
      '</li>');
  }
  
  row.querySelector('.align-middle.recommendation').dataset.employeeIds = employeeIds.join(',');
  
  const tooltipTriggerList = [].slice.call(container.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.forEach(function(tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });
}


checkedEmployeeIds.push(currentEmp.toString());


document.getElementById('attendess-list').addEventListener('show.bs.modal', function() {
  updateCheckedEmployees();
});


document.querySelector('#attendess-list .add-attendees').addEventListener('change', function(e) {
  if (e.target.name == 'attendees') {
    updateCheckedEmployees();
    
  
    var allCheckbox = document.getElementById('allusers');
    if (allCheckbox) {
      var totalCheckboxes = document.querySelectorAll('#attendess-list input[name="attendees"]').length;
      var checkedCount = document.querySelectorAll('#attendess-list input[name="attendees"]:checked').length;
      allCheckbox.checked = (checkedCount == totalCheckboxes);
      allCheckbox.indeterminate = checkedCount > 0 && checkedCount < totalCheckboxes;
    }
  }
});


document.getElementById('allusers')?.addEventListener('change', function() {
  var checkboxes = document.querySelectorAll('#attendess-list input[name="attendees"]');
  var currentEmpCheckbox = document.querySelector('#attendee_' + currentEmp);
  console.log(checkboxes, "checkboxes");
  for (var i = 0; i < checkboxes.length; i++) {
   
    if (this.checked || checkboxes[i] == currentEmpCheckbox) {
      checkboxes[i].checked = true;
    } else {
      checkboxes[i].checked = false;
    }
  }
  
  updateCheckedEmployees();
});




// document.getElementById('allusers')?.addEventListener('change', function() {
//   var checkboxes = document.querySelectorAll('#attendess-list input[name="attendees"]');
 
//   console.log(checkboxes, "checkboxes");
//   for (var i = 0; i < checkboxes.length; i++) {
    
//     if (checkboxes[i].id == 'attendee_' + currentEmp) {
//       checkboxes[i].checked = true;
//       checkboxes[i].disabled = true;
//     } else {
//       checkboxes[i].checked = this.checked;
//     }
//   }
// });


// var attendeeModal = document.getElementById('attendess-list');
// if (attendeeModal) {
//   attendeeModal.addEventListener('show.bs.modal', function() {
  
//     var currentEmployeeCheckbox = document.getElementById('attendee_' + currentEmp);
    
//     if (currentEmployeeCheckbox) {
//       currentEmployeeCheckbox.checked = true;
//       currentEmployeeCheckbox.disabled = true; 
//     }
    
  
//     var allUsersCheckbox = document.getElementById('allusers');
//     if (allUsersCheckbox) {
//       var otherCheckboxes = document.querySelectorAll('#attendess-list input[name="attendees"]:not(#attendee_' + currentEmp + ')');
//       var allOthersChecked = Array.from(otherCheckboxes).every(cb => cb.checked);
//       allUsersCheckbox.checked = allOthersChecked;
//     }
//   });
// }


// document.getElementById('button-addon2')?.addEventListener('click', function() {
//   var searchTerm = document.querySelector('#attendess-list .form-control').value.toLowerCase();
//   var attendees = document.querySelectorAll('#attendess-list .attendee');
  
//   attendees.forEach(function(attendee) {
//     var name = attendee.querySelector('.name').textContent.toLowerCase();
//     if (name.includes(searchTerm)) {
//       attendee.style.display = '';
//     } else {
//       attendee.style.display = 'none';
//     }
//   });
// });

  // Load SWOT content
function loadSwotContent(swotType, $element) {
    console.log(swotType, "loadSwotContent");
    
    // Update UI state
    $("#strength_section").show();
    $(".sub_initiative_sidebar_details").removeClass("activeswotwrap");
    $element.addClass("activeswotwrap");
    localStorage.setItem("swotcall_list", swotType);
    console.log($element.data('loadedType'), swotType, "typedata");
    // Only load if not already loaded or if type changed
    if (!$element.data('loaded') || $element.data('loadedType') !== swotType) {
        getSwotList(swotType);
        $element.data('loaded', true).data('loadedType', swotType);
    }else {
      getSwotList("closecaret", "swotType");
    }
}

$(document).on('click', '.caret', function(e) {
    console.log("function clicked")
    e.preventDefault();
    e.stopPropagation();
    
    const $caret = $(this);
    const toggleId = $caret.data('toggle-id');
    const $nestedArea = $caret.closest('.nested-item').find('.nested-area');
    
    console.log($caret, toggleId, "caret click");
    
    
    $caret.toggleClass('caret-down');
    
    $nestedArea.toggleClass('active');
    
    
    console.log('$nestedArea has active class:', $nestedArea.hasClass('active'));
    if ($nestedArea.hasClass('active')) {
        
        var formattedType;
        if (toggleId == "swot-child-1") {
            formattedType = "Strengths";
        } else if (toggleId == "swot-child-2") {
            formattedType = "Weaknesses";
        } else if (toggleId == "swot-child-3") {
            formattedType = "Oppurtunities"; 
        } else {
            formattedType = "Threats";
        }
        
        console.log(formattedType, toggleId, "swotTypeout");
        loadSwotContent(formattedType, $caret.closest('.nested-item'));
    }
});



function deleteRowData(rowElement) {
  var row = rowElement.closest('tr');



  $(row).find('.date_pickers_single').datepicker('destroy');


  $(row).find('[data-toggle="tooltip"]').tooltip('dispose');


  row.remove();

  
}

const page_swotanalysis_en = {
  "title": "SWOT Analysis",
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

const page_swotanalysis_am = {
  "title": "የSWOT ትንተና",
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


const page_swotanalysis_ar = {
  "title": "تحليل سوات",
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
    translation = page_swotanalysis_ar;
  } else if (lang == 'am') {
    translation = page_swotanalysis_am;
  }else {
    translation = page_swotanalysis_en;
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



