
var business_impact = "";
var recommandation_text = "";
var radioValue = "";
var swottype = "";
var currentEmp		=	$("#userPrincipal").val();
var topparentswotDetails	=	{};
var reporteelist = [];
var moduleDataList = [];
var kpiList	=	[];
var swotupdateDescription	=	[];
var pageNo =  $('#pagenumber').val();
var auditmodPermission	=	[];
var createpermission	=	false;
var editpermission		=	false;
var deletepermission	=	false;
var viewpermission		=	false;
var reporteelist 		= 	{};
if($("#userrolename").val()	==	"Super User" || $("#userrolename").val()	==	"Admin"){
	if($("#userPrincipal").val()	!= $("#userPrincipalnavigate").val()){
		//$(".subusermenuname").text('Audit Trail');
		if($(".topmenubreadcrumb").length){
			$(".topmenubreadcrumb").show();
		}
		if($(".sidebarNavigate").length){
			$(".sidebarNavigate").show();
		}
	}
}
function getauditpermission(){
	$.ajax({
		type : "GET",
		url : "/stratroom/user/modulePermissions?moduleName=Audit Trail",
		async:false,
		success : function(data) {
			$.each(data,function(forindex,fordata){
				if(forindex	==	"Audit Trail"){
					if(fordata.Save.privilegeCreate !=	undefined && fordata.Save.privilegeCreate == "FALSE"){	
						$(".exportofaudit").remove()
					}
					if(fordata.Page !=	undefined){
						auditmodPermission	=	fordata.Page;	
					}
				}
			});
		}
	});
}

$(function () {		
	getauditpermission();
	if(auditmodPermission.privilegeCreate !=	undefined && auditmodPermission.privilegeCreate == "TRUE"){	
		createpermission	=	true;
	}
	
	if(auditmodPermission.privilegeUpdate !=	undefined && auditmodPermission.privilegeUpdate == "TRUE"){
		editpermission	=	true;
	}
	
	if(auditmodPermission.privilegeDelete !=	undefined && auditmodPermission.privilegeDelete == "TRUE"){
		deletepermission	=	true;
	}
	
	if(auditmodPermission.privilegeView !=	undefined && auditmodPermission.privilegeView == "TRUE"){
		viewpermission	=	true;
	}
	
	/*if(enableaccesscontrolMenu	==	true){
		createpermission	=	true;
		editpermission		=	true;
		deletepermission	=	true;
		viewpermission		=	true;
	}*/
	
	populateOwnerDropdownorg("#performed");
	actionDropdownorg("#action");
	$('#performed,#action').val('');
	$('#performed').select2({});
	$('#action').select2({});
	$('.date_pickers_single').datepicker({
		language : 'en',
		autoClose : true,
		minDate: 0,
		position : "bottom left",
		//todayButton : true,
		onSelect : function(fd) {
			// $('.datepickers-container').hide();
		}
	});
	
	if(!viewpermission){
		$(".card").remove();
		$(".filteraudit").remove();
	}
	$(".audittrailexport").attr("href","downloadAuditTrail?performedBy=&dateRange=&action=");
	
    if(viewpermission){
    	getAccesscontrolList();
    }
	//getmoduleList();
});

$(".resetvalue").click(function(){
	$(".audittraildate").val('');
	$('#performed,#action').val('');
	$('#performed').select2({});
	$('#action').select2({});
	$(".audittrailexport").attr("href","downloadAuditTrail?performedBy=&dateRange=&action=");
    getAccesscontrolList();
});

$(".org_struct_add_btn").click(function(){
	var url	=	"/stratroom/auditTrailList";
	var audittraildate	=	$(".audittraildate").val();
	var performed		=	$("#performed").val();
	var action			=	$("#action").val();
	var downloadurl	=	"/stratroom/downloadAuditTrail"
	if((audittraildate !=	"" && audittraildate	!=	undefined) && (performed !=	"" && performed	!=	undefined) && (action !=	"" && action	!=	undefined)){
		url	=	url+"?dateRange="+audittraildate+"&action="+action+"&performedBy="+performed;
		downloadurl	=	downloadurl+"?dateRange="+audittraildate+"&action="+action+"&performedBy="+performed;	
	}else if((audittraildate !=	"" && audittraildate	!=	undefined) && (performed !=	"" && performed	!=	undefined) && (action ==	null  || action ==	"" || action	==	undefined)){
		url	=	url+"?dateRange="+audittraildate+"&action=&performedBy="+performed;
		downloadurl	=	downloadurl+"?dateRange="+audittraildate+"&action=&performedBy="+performed;
	}else if((audittraildate !=	"" && audittraildate	!=	undefined) && (performed ==	"" || performed	==	undefined || performed	==	null) && (action !=	""  && action !=	undefined)){
		url	=	url+"?dateRange="+audittraildate+"&action="+action+"&performedBy=";
		downloadurl	=	downloadurl+"?dateRange="+audittraildate+"&action="+action+"&performedBy=";
	}else if((audittraildate ==	"" || audittraildate	==	undefined || audittraildate	==	null) && (performed !=	"" && performed	!=	undefined) && (action !=	""  && action !=	undefined)){
		url	=	url+"?dateRange=&action="+action+"&performedBy="+performed;
		downloadurl	=	downloadurl+"?dateRange=&action="+action+"&performedBy="+performed;
	}else if((audittraildate ==	"" || audittraildate	==	undefined || audittraildate	==	null) && (performed ==	"" || performed	==	undefined) && (action !=	""  && action !=	undefined)){
		url	=	url+"?dateRange=&action="+action+"&performedBy=";
		downloadurl	=	downloadurl+"?dateRange=&action="+action+"&performedBy=";
	}else if((audittraildate !=	"" && audittraildate	!=	undefined) && (performed ==	"" || performed	==	undefined) && (action ==	null  || action ==	"" || action	==	undefined)){
		url	=	url+"?dateRange="+audittraildate+"&action=&performedBy=";
		downloadurl	=	downloadurl+"?dateRange="+audittraildate+"&action=&performedBy=";
	}else if((audittraildate ==	"" || audittraildate	==	undefined) && (performed !=	"" && performed	!=	undefined) && (action ==	null  || action ==	"" || action	==	undefined)){
		url	=	url+"?dateRange=&action=&performedBy="+performed;
		downloadurl	=	downloadurl+"?dateRange=&action=&performedBy="+performed;
	}else{
		url	=	url+"?dateRange=&action=&performedBy=";
		downloadurl	=	downloadurl+"?dateRange=&action=&performedBy=";
	}
	
	$(".audittrailexport").attr("href",downloadurl);
	
	$.ajax({
		url:url,
		type:"GET",
		success:function(response){
			$("#exampleModal").modal('hide')
			AccesscontrolListShow(response);
		}
	});
});

function populateOwnerDropdownorg(elementId,formtypeElement) {
	const storedLanguage = localStorage.getItem('selectedLang') || 'en';

	// Load the language when populating the dropdown
	loadLanguage(storedLanguage);
	
	var numberOfOptions = $(elementId + ' > option').length;

	if (jQuery.isEmptyObject(reporteelist)) {
		$.ajax({
			url : "/stratroom/org/employeeList",
			async:false,
			success : function(employeeList) {
				reporteelist = employeeList;
				$.each(employeeList, function(index, reportee) {
					addOption(elementId, reportee.name, reportee.id)
				});
			}
		});
	} else if (numberOfOptions < 2) {
		$.each(reporteelist, function(index, reportee) {
			addOption(elementId, reportee.name, reportee.id)
		});
	}
}

function actionDropdownorg(elementId,formtypeElement) {
	var numberOfOptions = $(elementId + ' > option').length;

	$.ajax({
		url : "/stratroom/auditTrailActionList",
		async:false,
		success : function(employeeList) {
			$.each(employeeList, function(index, reportee) {
				if(reportee !=	null && reportee !=	undefined){
					addOption(elementId, reportee, reportee)
				}
			});
		}
	});
}

function getAccesscontrolList() {
	
    $.ajax({
        url: "/stratroom/auditTrailList",
        type: "GET",
        success: function (response, status) {
			AccesscontrolListShow(response);
        },
        error:readErrorMsg
    });
}



// function AccesscontrolListShow(data) {
//     $("#auditrailcontent").empty();
//     var bodyRows = "";
    
//     $.each(data, function (i, List) {
//         var moduleName = [];
//         var employeeobject = [];
//         var topparentswotDetails = {"id":"","name":"","image":"","dept":""};
        
//         $.each(reporteelist, function(ownkey, empvalue) {
//             if(empvalue.name == List.userName) {
//                 topparentswotDetails = {"id":empvalue.id,"name":empvalue.name,"image":empvalue.image,"dept":empvalue.dept};
//             }
//         });
        
//         var users = topparentswotDetails;
//         var username = ((List.userName == undefined || List.userName == "") ? "User" : List.userName);
//         var userProfileConcate = ((users.image == undefined || users.image == "" || users.image == null) ? 
//                                  "data-name='"+username+"' class='rounded-circle swotuserimage'" : 
//                                  "class='rounded-circle' src='"+users.image+"'");
        
//         var createdtime = List.createdTime;
//         if(createdtime != undefined && createdtime != "") {
//             if(createdtime.indexOf("Z") == -1) {
//                 createdtime = createdtime + "Z";
//             }
//             var date = dateFormatedtohumanread(createdtime);
//             var time = new Date(createdtime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
//             createdtime = date + ' ' + time;
//         }
        
//         var ip = (List.systemIp != null && List.systemIp != undefined ? List.systemIp : "");
//         var email = (List.emailAddress != null && List.emailAddress != undefined ? List.emailAddress : "");
//         var action = "";
        
//         if(List.action != "" && List.action != undefined) {
//             action = (List.action.toLowerCase().indexOf('deleted') == -1 ? 
//                      "<span class='badge text-bg-success'>" + List.action + "</span>" : 
//                      "<span class='badge text-bg-danger'>" + List.action + "</span>");
//         }
        
//         bodyRows += "<tr>" +
//             "<td class='text-start'>" +
//             "<div class='text-icon'>" +
//             "<div class='icon'>" +
//             "<img " + userProfileConcate + " alt='" + username + "' />" +
//             "</div>" +
//             "<div class='text' style='color : black;'>" + username + "</div>" +
//             "</div>" +
//             "</td>" +
//             "<td class='align-middle text-center'>" + action + "</td>" +
//             "<td class='text-center'>" + email + "</td>" +
//             "<td class='align-middle text-center'>" + createdtime + "</td>" +
//             "<td class='align-middle text-center'>" + ip + "</td>" +
//             "</tr>";
//     });
    
//     if(jQuery.isEmptyObject(data)) {
//         bodyRows = "<tr><td colspan='5'>No Records Found</td></tr>";
//     }
    
//     $("#auditrailcontent").html(bodyRows);
//     $('.swotuserimage').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
// }

var currentPage = 1;
var rowsPerPage = 6;
var auditData = [];

function AccesscontrolListShow(data) {

    auditData = data || [];
    currentPage = 1;

    renderAuditTable();
    renderPagination();
}

function renderAuditTable() {

    $("#auditrailcontent").empty();

    var bodyRows = "";

    var start = (currentPage - 1) * rowsPerPage;
    var end = start + rowsPerPage;

    var paginatedData = auditData.slice(start, end);

    $.each(paginatedData, function (i, List) {

        var topparentswotDetails = {
            "id": "",
            "name": "",
            "image": "",
            "dept": ""
        };

        $.each(reporteelist, function (ownkey, empvalue) {

            if (empvalue.name == List.userName) {

                topparentswotDetails = {
                    "id": empvalue.id,
                    "name": empvalue.name,
                    "image": empvalue.image,
                    "dept": empvalue.dept
                };
            }
        });

        var users = topparentswotDetails;

        var username = (
            (List.userName == undefined || List.userName == "")
                ? "User"
                : List.userName
        );

        var userProfileConcate = (
            (users.image == undefined || users.image == "" || users.image == null)
                ? "data-name='" + username + "' class='rounded-circle swotuserimage'"
                : "class='rounded-circle' src='" + users.image + "'"
        );

        var createdtime = List.createdTime;

        if (createdtime != undefined && createdtime != "") {

            if (createdtime.indexOf("Z") == -1) {
                createdtime = createdtime + "Z";
            }

            var date = dateFormatedtohumanread(createdtime);

            var time = new Date(createdtime).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });

            createdtime = date + ' ' + time;
        }

        var ip = (
            List.systemIp != null && List.systemIp != undefined
                ? List.systemIp
                : ""
        );

        var email = (
            List.emailAddress != null && List.emailAddress != undefined
                ? List.emailAddress
                : ""
        );

        var action = "";

        if (List.action != "" && List.action != undefined) {

            action = (
                List.action.toLowerCase().indexOf('deleted') == -1
                    ? "<span class='badge text-bg-success'>" + List.action + "</span>"
                    : "<span class='badge text-bg-danger'>" + List.action + "</span>"
            );
        }

        bodyRows +=
            "<tr>" +

            "<td class='text-start'>" +
            "<div class='text-icon'>" +

            "<div class='icon'>" +
            "<img " + userProfileConcate + " alt='" + username + "' />" +
            "</div>" +

            "<div class='text' style='color : black;'>" +
            username +
            "</div>" +

            "</div>" +
            "</td>" +

            "<td class='align-middle text-center'>" +
            action +
            "</td>" +

            "<td class='text-center'>" +
            email +
            "</td>" +

            "<td class='align-middle text-center'>" +
            createdtime +
            "</td>" +

            "<td class='align-middle text-center'>" +
            ip +
            "</td>" +

            "</tr>";
    });

    if (paginatedData.length == 0) {

        bodyRows =
            "<tr>" +
            "<td colspan='5' class='text-center'>No Records Found</td>" +
            "</tr>";
    }

    $("#auditrailcontent").html(bodyRows);

    $('.swotuserimage').initial({
        charCount: 2,
        height: 30,
        width: 30,
        fontSize: 18
    });
}

function renderPagination() {

    var totalPages = Math.ceil(auditData.length / rowsPerPage);

    var paginationHtml = "";

    // Previous Button
    paginationHtml +=
        '<li class="page-item ' + (currentPage == 1 ? 'disabled' : '') + '">' +
        '<a class="page-link" href="javascript:void(0)" onclick="changePage(' + (currentPage - 1) + ')">' +
        '<i class="fas fa-arrow-left"></i>' +
        '</a>' +
        '</li>';

    // Page Numbers
    for (var i = 1; i <= totalPages; i++) {

        paginationHtml +=
            '<li class="page-item ' + (currentPage == i ? 'active' : '') + '">' +
            '<a class="page-link" href="javascript:void(0)" onclick="changePage(' + i + ')">' +
            i +
            '</a>' +
            '</li>';
    }

    // Next Button
    paginationHtml +=
        '<li class="page-item ' + (currentPage == totalPages ? 'disabled' : '') + '">' +
        '<a class="page-link" href="javascript:void(0)" onclick="changePage(' + (currentPage + 1) + ')">' +
        '<i class="fas fa-arrow-right"></i>' +
        '</a>' +
        '</li>';

    $(".pagination").html(paginationHtml);
}

function changePage(page) {

    var totalPages = Math.ceil(auditData.length / rowsPerPage);

    if (page < 1 || page > totalPages) {
        return;
    }

    currentPage = page;

    renderAuditTable();
    renderPagination();
}
function populateModuleList(elementId) {
	var numberOfOptions = $(elementId + ' > option').length;
	if (jQuery.isEmptyObject(moduleDataList)) {
		$.ajax({
			url : "/stratroom/moduleList",
			async:false,
			success : function(kpiListValue) {
				moduleDataList 	= 	kpiListValue;
				$.each(kpiList, function(index, kpiObj) {
					addOption(elementId, kpiObj.moduleName, kpiObj.moduleId)
				});
			}
		});
	} else if (numberOfOptions < 2) {
		$.each(moduleDataList, function(index, reportee) {
			addOption(elementId, reportee.moduleName, reportee.moduleId)
		});
	}
}

function addOption(id, text, value) {
	$(id).append(`<option value="${value}">${text}</option>`);
}

$(document).on('keydown', function(event) {
    if (event.key == "Escape") {
    	$("#exampleModal").modal("hide");
    }
});


const page_augitTrail_ar = {
	"Title": "مسار التدقيق",
    "Export": "تصدير",
    "Filter": "تصفية",
    "Performed By": "تم التنفيذ بواسطة",
    "Action": "إجراء",
    "Additional Information": "معلومات إضافية",
    "Date/Time": "التاريخ/الوقت",
    "IP Address": "عنوان IP"
}

const page_augitTrail_en = {
	"Title": "Audit Trail",
	"Export": "Export",
	"Filter": "Filter",
	"Performed By": "Performed By",
	"Action": "Action",
	"Additional Information": "Additional Information",
	"Date/Time": "Date/Time",
	"IP Address": "IP Address"
}

const page_auditTrail_am = {
  "Title": "የኦዲት ትራክ",
  "Export": "አውጣ",
  "Filter": "ማጣሪያ",
  "Performed By": "ተፈጥሯል በ",
  "Action": "እርምጃ",
  "Additional Information": "ተጨማሪ መረጃ",
  "Date/Time": "ቀን/ሰዓት",
  "IP Address": "የIP አድራሻ"
};



// Helper to get nested property
function getNestedValue(obj, path) {
  return path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : null, obj);
}

// Load language for all elements with data-translate
function loadLanguage(lang) {
	console.log(lang, "nll")
  let translation;

  if (lang == 'ar') {
    translation = page_augitTrail_ar;
  } else if(lang == "am" ){ 
	translation = page_auditTrail_am;
  }else {
    translation = page_augitTrail_en;
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