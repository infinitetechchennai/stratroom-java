
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
var createpermission	=	false;
var editpermission		=	false;
var deletepermission	=	false;
var viewpermission		=	false;

$(function () {		
	
	if(jQuery.inArray("Create", accesscontrolPermission) !== -1){
		createpermission	=	true;
	}
	
	if(jQuery.inArray("Update", accesscontrolPermission) !== -1){
		editpermission	=	true;
	}
	
	if(jQuery.inArray("Delete", accesscontrolPermission) !== -1){
		deletepermission	=	true;
	}
	
	if(jQuery.inArray("View", accesscontrolPermission) !== -1){
		viewpermission	=	true;
	}
	
	if(createpermission	==	false){
		$(".creategroupicon").css("display","none");
	}
	
	if(enableaccesscontrolMenu	==	true){
		createpermission	=	true;
		editpermission		=	true;
		deletepermission	=	true;
		viewpermission		=	true;
		$(".creategroupicon").css("display","block");
	}
	
    getAccesscontrolList();
	getreportee();
	getmoduleList();
});

function subinitiativePorfileContent(usersimg,resultId){
	
	var subinitiativeUser	=	"";
	var returnresult	=	[];
	var functionParams	=	resultId+','+'"edit"';
	var functionName	=	"";
	var modalPopupName	=	"";
	
	var enableOwnerBtn	=	"";
    if(editpermission	==	true){
    	enableOwnerBtn	=	`data-toggle="modal" data-target=".swot_add_multiuser_popup" style="cursor: pointer;"`;
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
			subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+enableOwnerBtn+' onclick='+functionName+'('+functionParams+')><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
			//if(usersimg.length >= 3 && index >= 2 && index <= 2){
			//	subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><img class="rounded-circle" '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
				//subinitiativeUser 	+=	'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+</span></li>';
				
			//}
		});
		//if(badgeincrement	==	false){
			subinitiativeUser 	=	subinitiativeUser+'<div class="image-upload" style="display: unset;"><label for="file-input"><li class="avatar avatar-sm" '+enableOwnerBtn+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+</span></li></label></div>';
		//}
	}else{
		var users 	=	topparentswotDetails;
		var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
		var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle swotuserimage' ":" class='rounded-circle' src='"+users.image+"'");
		subinitiativeUser 	=	'<li class="avatar avatar-sm" '+enableOwnerBtn+' onclick='+functionName+'('+functionParams+')><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
		subinitiativeUser 	=	subinitiativeUser+'<div class="image-upload" style="display: unset;"><label for="file-input"><li class="avatar avatar-sm" '+enableOwnerBtn+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+</span></li></label></div>';
	}
	returnresult['userownerlist']	=	subinitiativeUser;
	return returnresult;
}


function getAccesscontrolList() {
	var pagenourl	=	"";
	if(pageNo	!=	undefined && pageNo	!=	""){
		pagenourl	=	"?pageId="+pageNo;
	}
	
    $.ajax({
        url: "/stratroom/roleList"+ pagenourl,
        type: "GET",
        contentType: "application/json",
        success: function (response, status) {
			AccesscontrolListShow(response);
        },
        error:readErrorMsg
    });
}



function AccesscontrolListShow(data) {
    
    var meeting_attachment 	= "";
	var functionParams	=	'""'+','+'"add"';
	var	bodyRows	=	"";
    $.each(data, function (i, List) {
        var accesschildtemplate 	= 	$('#accesschild-template').html();
        var rolename 				= 	(List.roleName !=	undefined?List.roleName:"");
		var moduleList		=	(List.moduleList !=	undefined && List.moduleList !=	null?List.moduleList:[]);
		var moduleName		=	[];
		if(moduleList){
			$.each(moduleList,function(ownkey,empvalue){
				moduleName.push(empvalue.moduleName);
			});
		}
		
		var moduleListname	=	moduleName.join(', ');
		var createaccess	=	"fas fa-ban";
		var editaccess		=	"fas fa-ban";
		var viewaccess		=	"fas fa-ban";
		var deleteaccess	=	"fas fa-ban";
		
		if(List.privilegeList	!=	undefined && List.privilegeList.length >= 1){
			if(List.privilegeList[0] !=	undefined && List.privilegeList[0].privilegeId	==	1 && List.privilegeList[0].enabled	==	true){
				createaccess	=	"far fa-check-circle";
			}
			if(List.privilegeList[1] !=	undefined && List.privilegeList[1].privilegeId	==	2 && List.privilegeList[1].enabled	==	true){
				editaccess	=	"far fa-check-circle";
			}
			if(List.privilegeList[2] !=	undefined && List.privilegeList[2].privilegeId	==	3 && List.privilegeList[2].enabled	==	true){
				viewaccess	=	"far fa-check-circle";
			}
			if(List.privilegeList[3] !=	undefined && List.privilegeList[3].privilegeId	==	4 && List.privilegeList[3].enabled	==	true){
				deleteaccess	=	"far fa-check-circle";
			}
		}	
		
		$.each(reporteelist,function(ownkey,empvalue){
			if(empvalue.id	==	List.createdBy){
				topparentswotDetails	=	{"id":empvalue.id,"name":empvalue.name,"image":empvalue.image,"dept":empvalue.dept};
			}
		});
		
		var users		=	topparentswotDetails;
		var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
		var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle swotuserimage' ":" class='rounded-circle' src='"+users.image+"'");
		var initiatedby =	'<li class="avatar avatar-sm"><img class="rounded-circle" '+userProfileConcate+' alt="'+username+'" width="55"></li>';
	
		var resultPorfileContent	=	subinitiativePorfileContent(List.employeeList,List.roleId);
		
		var enableeditBtn	=	"";
        if(editpermission	==	true){
        	enableeditBtn	=	`<a href="#" data-toggle="modal" data-target="#add_group">
              	<i class="far fa-edit" onclick="handleaccesscontrolevent(`+List.roleId+`,'edit')"></i>
            </a>`;
        }
        
        var enabledeleteBtn	=	"";
        if(deletepermission	==	true){
        	enabledeleteBtn	=	`<i style="margin-left: 8px;cursor:pointer;" class="far fa-trash-alt" onclick="handleaccesscontrolevent(`+List.roleId+`,'delete')"></i>`;
        }
        var enableOwnerBtn	=	"";
        if(editpermission	==	true){
        	enableOwnerBtn	=	`data-toggle="modal" data-target=".swot_add_multiuser_popup" id="initiativeactivitieUser_`+List.roleId+`" style="cursor: pointer;"`;
        }
        if(deletepermission	==	false && editpermission ==	false){
        	enabledeleteBtn	=	"--";
        }    
		var subInitdetail = Mustache.render(accesschildtemplate,
						{
							id:List.roleId,
							name : rolename,
							moduleListname:moduleListname,
							deleteaccess:deleteaccess,
							createaccess:createaccess,
							editaccess:editaccess,
							viewaccess:viewaccess,
							enableOwnerBtn:enableOwnerBtn,
							enableeditBtn:enableeditBtn,
							enabledeleteBtn:enabledeleteBtn,
							subinitiativeUser:resultPorfileContent['userownerlist'],
							subinitiativeUserSlecteditem:resultPorfileContent['userownerlist_data']
						});
		
		bodyRows = bodyRows + subInitdetail;
	});

	var accesscontrolParenttemplate = 	$('#accesscontrol-template-parent').html();
	var htmlValue 			= 	Mustache.render(accesscontrolParenttemplate, {
		bodyRows : bodyRows
	});
	
	$("#accesscontrol_section").html(htmlValue);
	$('.swotuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
}

$(document).on('show.bs.modal', '.modal', function (event) {
    var zIndex = 1040 + (10 * $('.modal:visible').length);
    $(this).css('z-index', zIndex);
    setTimeout(function() {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
});

function getreportee() {
	
	if (jQuery.isEmptyObject(reporteelist)) {
		$.ajax({
			url : "/stratroom/organization/employeeList",
			async:false,
			success : function(employeeList) {
				reporteelist = employeeList;
			}
		});
	} 
}

function getmoduleList() {
	
	if (jQuery.isEmptyObject(moduleDataList)) {
		$.ajax({
			url : "/stratroom/moduleList",
			async:false,
			success : function(employeeList) {
				moduleDataList = employeeList;
			}
		});
	} 
}


function getreporteeeList(id,listtype) {
    $(listtype).empty();
    var methodType = 'get';
    var listusers = "";
    var image = "";

    var listusers = "";

    $.ajax({
        url: "/stratroom/organization/employeeList",
        contentType: "application/json",
        success: function (data, status) {
            $.each(data, function (i, List) {
                var status = ""
                if (!List.image == undefined || !List.image == "" || !List.image == undefined) {
                    image = List.image;
                }
                if (id) {
                    $.each(id, function (i, item) {
                        if (List.id == item) {
                            status = "checked"
                        }
                    });
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
                    //$(listtype).append(listusers);
                }

            });
        }
    });
}

function saveAccess() {
	var action	=	$("#access_control_Form input[name='action']").val();
    var swotObj = 	getSwotObj(action);
	
    var methodType = 'post';
	var id	=	$("#access_control_Form input[name='id']").val();
	if(action	==	"edit"){
		swotObj.roleId 		= 	(id !=	""?id:"");	
	}
	
	if(swotObj.employeeList ==	undefined){
		swotObj.employeeList	=	[];
	}
	
    $.ajax({
        url: "/stratroom/roleDetails",
        type: methodType,
        contentType: "application/json",
        data: JSON.stringify(swotObj),
        success: function (data, status) {
            location.reload(true);
        },
		error:readErrorMsg
    });
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

function formvalidationerrorreset(){
	$('*[id*=-error]').each(function() {
	    $(this).remove();
	});
	$(".input-calender-icon-from").css("bottom","30%");
	$(".input-calender-icon-to").css("bottom","30%");
}

function handleaccesscontrolevent(id,action) {
	
	$("#access_control_Form").css('display', 'none');
	$("#access_control_Form").trigger('reset');
	$("#access_control_Form input[name='action']").val(action);
	
	if (action == 'add') {
		if(createpermission	==	false){
			return false;
		}
		$("#accessHeaderName").html("Add New Group");
		$("#access_control_Form").css('display', 'block');
		formvalidationerrorreset();
		populateModuleList('#add_group #modules');
		$(".module-multi-select").select2();
		$(".module-multi-select").val('');
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
		$("#accessHeaderName").html("Edit Group");
		$("#access_control_Form").css('display', 'block');
		formvalidationerrorreset();
		$("#access_control_Form #id").val(id);
		if (action == 'edit') {
			if(editpermission	==	false){
				return false;
			}
			$("#access_control_Form input[name='id']").val(id);
		}
		if (action == 'view') {
		
			if(viewpermission	==	false){
				return false;
			}
			$("#accessHeaderName").html("View Group");
			$('#access_control_Form input[type="text"]').prop("disabled", true);
			$('#access_control_Form input[type="checkbox"]').prop("disabled", true);
			$('#access_control_Form select').prop("disabled", true);
			$('#access_control_Form button[value="Save"]').css('display', 'none');
		}

		$.ajax({
			url : "/stratroom/roleDetails/" + id,
			success : accessPopSuccessCallback,
			error:readErrorMsg
		});
	}
}

function handleswoteventdelete(){
	var id				=	$("#deleterecordid").val();
	if(id	==	""){
		return false;
	}
	var url	=	"/stratroom/removeRoleDetails/" + id;
	
	$.ajax({
		url : url,
		type : "get",
		contentType : "application/json",
		success : function(data, status) {
			location.reload(true);
		},
		error:readErrorMsg
	});
}

function accessPopSuccessCallback(data) {
	
	swotupdateDescription	=	data;
	$("#groupname").val(data.roleName)
	$('#access_control_Form #id').val(data.id);
	populateModuleList('#add_group #modules');
	
	var moduleIds	=	[];
	if(data.moduleList	!=	null){
		$.each(data.moduleList, function(index, module) {
			if(module.moduleId !=	"" && module.moduleId !=	undefined){
				moduleIds.push(module.moduleId);
			}
		});
		
		$("#modules").val(moduleIds);
	}
	$(".module-multi-select").select2();
	
	if(data.privilegeList	!=	undefined && data.privilegeList.length >= 1){
		if(data.privilegeList[0] !=	undefined && data.privilegeList[0].privilegeId	==	1 && data.privilegeList[0].enabled	==	true){
			$('#createaccess').prop('checked',true);
		}
		if(data.privilegeList[1] !=	undefined && data.privilegeList[1].privilegeId	==	2 && data.privilegeList[1].enabled	==	true){
			$('#editaccess').prop('checked',true);
		}
		if(data.privilegeList[2] !=	undefined && data.privilegeList[2].privilegeId	==	3 && data.privilegeList[2].enabled	==	true){
			$('#viewaccess').prop('checked',true);
		}
		if(data.privilegeList[3] !=	undefined && data.privilegeList[3].privilegeId	==	4 && data.privilegeList[3].enabled	==	true){
			$('#deleteaccess').prop('checked',true);
		}
	}
}

function getSwotObj(action) {
	var name		=	$("#groupname").val();
	var modules		=	$("#modules").val();
	
	var moduleSelected	=	[];
	if(modules.length >= 1){
		$.each(modules,function(mkey,val){
			$.each(moduleDataList,function(key,moduleval){
				if(val	==	moduleval.moduleId){
					var modulename	=	moduleval.moduleName;
					var moduleId	=	moduleval.moduleId;
					if(modulename !=	"" && moduleId !=	"" && modulename !=	undefined && moduleId !=	undefined){		
						moduleSelected.push({"moduleId":moduleId,"moduleName":modulename});
					}
				}
			});
		});	
	}
	
	var privilegeList	=	[];
	var createbtn	=	false;
	if($("#createaccess").is(":checked") == true){
		createbtn	=	true;
		privilegeList.push({"privilegeId":1,"privilegeName":"Create"});
	}
	if($("#editaccess").is(":checked") == true){
		createbtn	=	true;
		privilegeList.push({"privilegeId":2,"privilegeName":"Update"});
	}
	if($("#deleteaccess").is(":checked") == true){
		createbtn	=	true;
		privilegeList.push({"privilegeId":4,"privilegeName":"Delete"});
	}
	
	if(createbtn == true){
		privilegeList.push({"privilegeId":3,"privilegeName":"View"});
	}
	
	if($("#viewaccess").is(":checked") == true && createbtn == false){
		privilegeList.push({"privilegeId":3,"privilegeName":"View"});
	}
	
	var swotObj 	= 	{
			"roleName": name,
            "moduleList": moduleSelected,
		    "privilegeList": privilegeList,
        };
	
	var existdatadonotupdate 	=	["roleName","moduleList","privilegeList"];
	if(action == "edit" && (swotupdateDescription !== undefined || swotupdateDescription != "")){
		$.each(swotupdateDescription,function(index,value){
			if($.inArray(index,existdatadonotupdate) == -1){
				swotObj[index]	=	value;
			}
		});
	}
	
	return  swotObj;   
}


$('#sub-ini-box_view').slimscroll({
					height : '450px',
					size : '3px',
					color : '#9c9c9c'
				});

function handleMultioownersuserevent(id,action) {
	if(editpermission	==	false){
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
			url : "/stratroom/organization/employeeList",
			async:false,
			success : function(result,status){
				var subinitiativeUser 	=	"";
				var ischecked 	=	"";
				var selectedItem 	=	[];
				
				if($("#activities_selected_user_"+id).length){
					selectedItem	=	$("#activities_selected_user_"+id).val().split(',');
				}
				if(result.length	==	0){
					$(".showallusericon").css('display','none');
				}
				
				if(result.length	==	selectedItem.length){
					$("#allusersaccess").prop("checked","checked");
				}else{
					$("#allusersaccess").prop("checked",false);
				}	
				
				var datas 	=	[];
				$.each(result, function(index, users) {
					datas.push(users.id);
				});
				
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
			url : "/stratroom/roleDetails/" + id,
			async:false,
			success : function(result,status){
				swotupdateDescription	=	result;
			},
			error:readErrorMsg
		});
		
	}
}


$(document).on("click","#allusersaccess",function(){
		
		var propcheck	=	$(this).is(":checked");
		var multiowners	=	[];
		if(propcheck	==	true){
			$("input[name='activities_owner[]']").each(function(index,value){
				multiowners.push($(this).val());
				$(this).prop("checked","checked");
			});
		}
		if(propcheck	==	false){
			$("input[name='activities_owner[]']").each(function(index,value){
				$(this).prop("checked",false);
			});
			multiowners	=	[];
			multiowners.push(currentEmp);
		}
		
		var id				=	$("#swotajaxid").val();
		
		if(swotupdateDescription == undefined || swotupdateDescription == "" || swotupdateDescription.id == ""){
			return false;
		}
		var swotObj			=	{"roleId":id,"employeeIDs":[]};
		swotObj.employeeIDs	=	multiowners;
		var methodType 		= 	'post';
		
		$.ajax({
			url : "/stratroom/user/assignRole",
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
		}
	});
	
});	

$(document).on("click","input[name='activities_owner[]']",function(){
		var id				=	$("#swotajaxid").val();
		if(swotupdateDescription == undefined || swotupdateDescription == "" || swotupdateDescription.id == ""){
			return false;
		}
		var swotObj			=	{"roleId":id,"employeeIDs":[]};
		var multiowners	= 	$("input[name='activities_owner[]']:checked").map(function(){
        	return this.value;
    	}).get();
		
		if(multiowners.length	==	0){
			swotObj.employeeIDs	=	[currentEmp];	
		}else{
			swotObj.employeeIDs	=	multiowners;
		}
		
		var methodType 		= 	'post';
		
		$.ajax({
			url : "/stratroom/user/assignRole",
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
		}
	});
});

$(document).on("click",".getselectedActivitiesUsers",function(){
	
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
	
	var enableOwnerBtn	=	"";
    if(editpermission	==	true){
    	enableOwnerBtn	=	`data-toggle="modal" data-target=".swot_add_multiuser_popup" style="cursor: pointer;"`;
    }
	
	if(!jQuery.isEmptyObject(userseslectedData)){
		$.ajax({
			url : "/stratroom/organization/employeeList",
			success : function(data, status) {
				var subinitiativeUser	=	"";
				
				//var profileBadgeIncrement 	=	(userseslectedData.length >= 3?parseInt(userseslectedData.length)-parseInt(2):"");
				//var badgeinc	=	false;
				$.each(data,function(key,users){
						$.each(userseslectedData,function(index,selectedvalue){
							if(selectedvalue ==	users.id){
								var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
								var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle swotmultiuserimage' ":"src='"+users.image+"' class='rounded-circle' ");
								subinitiativeUser 	+=	'<li class="avatar avatar-sm" '+enableOwnerBtn+' onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
								/*if(index <= 2){
									subinitiativeUser 	+=	'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
								}*/
								 
								/*if(userseslectedData.length >= 3 && index >= 2 && index <= 2){
									badgeinc	=	true;
									subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
									subinitiativeUser 	+=	'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+') data-selecteduser="'+users.id+'"><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
									return false;
								}*/
							}
						});
				});
				/*if(badgeinc	==	false){
					subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" '+enableOwnerBtn+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+</span></li>';
				}*/
				
				subinitiativeUser 	=	subinitiativeUser+'<div class="image-upload" style="display: unset;"><label for="file-input"><li class="avatar avatar-sm" '+enableOwnerBtn+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+</span></li></label></div>';
				/*if(userseslectedData.length ==	data.length){
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
				}*/
					
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
		subinitiativeUser 	=	'<li class="avatar avatar-sm" '+enableOwnerBtn+' onclick='+functionName+'('+functionParams+')><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
		subinitiativeUser 	=	subinitiativeUser+'<div class="image-upload" style="display: unset;"><label for="file-input"><li class="avatar avatar-sm" '+enableOwnerBtn+' onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+</span></li></label></div>';
		$("#"+imageElement).html('');
		$("#"+imageElement).html(subinitiativeUser);
		$('.swotmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
	}
});



function checkmodalisclosedornot(){
	
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
	
}

$("#editaccess,#deleteaccess,#createaccess").click(function(){
	var checkprop	=	$(this).is(":checked");
	if(checkprop	==	true){
		$("#viewaccess").prop("checked",true);
	}
});