
var currentEmp		=	$("#userPrincipal").val();
var moduleDataList = [];
var kpiList	=	[];
var pageNo =  $('#pagenumber').val();
var createpermission	=	false;
var editpermission		=	false;
var deletepermission	=	false;
var viewpermission		=	false;

var rolecreatepermission	=	false;
var roleeditpermission		=	false;
var roledeletepermission	=	false;
var roleviewpermission		=	false;

var reporteelist 		= 	{};
var rolelist 			= 	{};
var userinfodetails		=	{};
var empreporteelist		=	{};
var defaultroles		=	{};
var defaultcustomroles	=	{};
var defaultcustomroles1	=	{};
var usermodPermission	=	[];

if($("#userrolename").val()	==	"Super User" || $("#userrolename").val()	==	"Admin"){
	if($("#userPrincipal").val()	!= $("#userPrincipalnavigate").val()){
		//$(".subusermenuname").text('User & Role Management');
		if($(".topmenubreadcrumb").length){
			$(".topmenubreadcrumb").show();
		}
		if($(".sidebarNavigate").length){
			$(".sidebarNavigate").show();
		}
	}
}

$("#custom-tab").on("click", "button", function (e) {
    var CustomTabValue = this.dataset.value;
    localStorage.setItem("roletab",CustomTabValue);
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
  });
	

function getuserpermission(){
	$.ajax({
		type : "GET",
		url : "/stratroom/user/modulePermissions?moduleName=User Management",
		async:false,
		success : function(data) {
			$.each(data,function(forindex,fordata){
				if(forindex	==	"User Management"){
					
					if(fordata.Role.privilegeCreate !=	undefined && fordata.Role.privilegeCreate == "FALSE"){	
						$(".rolecreategroupicon").remove();
					}
					/*if(fordata.Role.privilegeUpdate !=	undefined && fordata.Role.privilegeUpdate == "FALSE"){	
						$(".content1:eq(0) input[type='checkbox']").attr("disabled","disabled");
						$(".content1:eq(1) input[type='checkbox']").attr("disabled","disabled");
					}*/
					if(fordata.Role.privilegeCreate !=	undefined && fordata.Role.privilegeCreate == "TRUE"){	
						rolecreatepermission	=	true;
					}
					if(fordata.Role.privilegeUpdate !=	undefined && fordata.Role.privilegeUpdate == "TRUE"){	
						roleeditpermission	=	true;
					}
					if(fordata.Role.privilegeDelete !=	undefined && fordata.Role.privilegeDelete == "TRUE"){	
						roledeletepermission	=	true;
					}
					if(fordata.Role.privilegeView !=	undefined && fordata.Role.privilegeView == "FALSE"){
						$(".Role").remove()
						$(".btn-custom-secondary[data-value='Role']").hide()
						$(".btn-custom-secondary[data-value='User']").css({'border-top-right-radius': '20px','border-bottom-right-radius': '20px'});
					}
					if(fordata.Role.privilegeView !=	undefined && fordata.Role.privilegeView == "TRUE"){
						roleviewpermission	=	true;
					}
					if(fordata.User !=	undefined){
						usermodPermission	=	fordata.User;	
					}
				}
			});
		}
	});
}

$(function () {		
	getuserpermission();
    var roletabtype	=	localStorage.getItem("roletab");
	
	if(roletabtype	!=	"" || roletabtype	!=	undefined || roletabtype	!=	null){
		if(roletabtype	==	"User"){
			$(".Role").hide();	
			$(".btn[data-value='Role']").removeClass('active')
			$(".User").show();	
			$(".btn[data-value='User']").addClass('active')
		}
		if(roletabtype	==	"Role"){
			$(".Role").show();	
			$(".btn[data-value='Role']").addClass('active')
			$(".User").hide();	
			$(".btn[data-value='User']").removeClass('active')
		}
	}
	if(roletabtype	==	null){
		$(".User").show();	
		$(".btn[data-value='User']").addClass('active')
	}
	
	if(usermodPermission.privilegeCreate !=	undefined && usermodPermission.privilegeCreate == "TRUE"){	
		createpermission	=	true;
	}
	
	if(usermodPermission.privilegeUpdate !=	undefined && usermodPermission.privilegeUpdate == "TRUE"){
		editpermission	=	true;
	}
	
	if(usermodPermission.privilegeDelete !=	undefined && usermodPermission.privilegeDelete == "TRUE"){
		deletepermission	=	true;
	}
	
	if(usermodPermission.privilegeView !=	undefined && usermodPermission.privilegeView == "TRUE"){
		viewpermission	=	true;
	}
	
	/*if(enableaccesscontrolMenu	==	true){
		createpermission	=	true;
		editpermission		=	true;
		deletepermission	=	true;
		viewpermission		=	true;
	}*/
	
	if(!createpermission){
		$(".creategroupicon").remove();
	}
	
	if(viewpermission == false && roleviewpermission == false){
		$(".container-fluid").hide();
	}
	
	if(roleviewpermission == false){
		$(".floating-export").hide();
	}
	
	$(".userdownloadlink").attr("href","/stratroom/downloadUserRole");
	
	if(roleviewpermission == true && viewpermission == false){
		$(".btn-custom-secondary[data-value='User']").remove()
		$(".User").remove()
		$(".btn-custom-secondary[data-value='Role']").css({'border-top-left-radius': '20px','border-bottom-left-radius': '20px'});
	}
	
	$('#filterdepartment').select2({});
	$('#filterrolelist').select2({});
	$(".filterdepartment").datepicker({
		language: 'en',
		autoClose: true,
		todayButton: true,
		onSelect: function (fd) {

		}
	});
	
	if(viewpermission){
	    getAccesscontrolList();
	}
	if(roleviewpermission){
		getdefaultroleList();
		getcustomroleList();
	}
});

function departmentlist(elementId,formtypeElement) {
	var numberOfOptions = $(elementId + ' > option').length;

	if (jQuery.isEmptyObject(reporteelist)) {
		$.ajax({
			url : "/stratroom/allDepartmentList",
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

function populateOwnerDropdownorg(elementId,formtypeElement) {
	var numberOfOptions = $(elementId + ' > option').length;

	if (jQuery.isEmptyObject(empreporteelist)) {
		$.ajax({
			url : "/stratroom/org/employeeList",
			async:false,
			success : function(employeeList) {
				empreporteelist = employeeList;
				$.each(employeeList, function(index, reportee) {
					addOption(elementId, reportee.name, reportee.id)
				});
			}
		});
	} else if (numberOfOptions < 2) {
		$.each(empreporteelist, function(index, reportee) {
			addOption(elementId, reportee.name, reportee.id)
		});
	}
}

function populatedefaultRoleDropdownorg(elementId,formtypeElement) {
	var numberOfOptions = $(elementId + ' > option').length;

	if (jQuery.isEmptyObject(defaultroles)) {
		$.ajax({
			url : "/stratroom/rolesList",//url : "/stratroom/defaultRoles",
			async:false,
			success : function(employeeList) {
				defaultroles = employeeList.defaultRoles;
				$.each(employeeList.defaultRoles, function(index, reportee) {
					if(reportee.role_name !=	undefined && reportee.role_name !=	""){
						addOption(elementId, reportee.role_name, reportee.role_id,reportee.role_id)
					}
					if(reportee.short_name !=	undefined && reportee.short_name !=	""){
						addOption(elementId, reportee.short_name, reportee.role_id,reportee.role_id)
					}
				});
			}
		});
	} else if (numberOfOptions < 2) {
		$.each(defaultroles, function(index, reportee) {
			if(reportee.role_name !=	undefined && reportee.role_name !=	""){
				addOption(elementId, reportee.role_name, reportee.role_id,reportee.role_id)
			}
			if(reportee.short_name !=	undefined && reportee.short_name !=	""){
				addOption(elementId, reportee.short_name, reportee.role_id,reportee.role_id)
			}
		});
	}
}

function populatedefaultcustomRoleDropdownorg(elementId,formtypeElement) {
	var numberOfOptions = $(elementId + ' > option').length;

	if (jQuery.isEmptyObject(defaultcustomroles)) {
		$.ajax({
			url : "/stratroom/defaultRoles",
			async:false,
			success : function(employeeList) {
				defaultcustomroles = employeeList.defaultRoles;
				$.each(employeeList.defaultRoles, function(index, reportee) {
					addOption(elementId, reportee.role_name, reportee.role_name)
				});
			}
		});
	} else if (numberOfOptions < 2) {
		$.each(defaultcustomroles, function(index, reportee) {
			addOption(elementId, reportee.role_name, reportee.role_name)
		});
	}
}


function getAccesscontrolList() {
	const storedLanguage = localStorage.getItem('selectedLang') || 'en';
	loadLanguage(storedLanguage);
    $.ajax({
        url: "/stratroom/userList",
        type: "GET",
        success: function (response, status) {
        	UserRoleListShow(response,'normal');
        },
        error:readErrorMsg
    });
}

function getdefaultroleList() {
    $.ajax({
        url: "/stratroom/roleList/"+currentEmp+"?type=DEFAULT",
        type: "GET",
        success: function (response, status) {
        	defaultRoleListShow(response);
        },
        error:readErrorMsg
    });
}

function getcustomroleList() {
    $.ajax({
        url: "/stratroom/roleList/"+currentEmp+"?type=CUSTOM",
        type: "GET",
        success: function (response, status) {
        	customRoleListShow(response);
        },
        error:readErrorMsg
    });
}



function displayModuleNames(moduleNames) {
	const storedLanguage = localStorage.getItem('selectedLang') || 'en';
	var addHeader = "Add";
	var editHeader = "Edit";
	var deleteHeader = "Delete";
	var viewHeader = "View";
	var actionsHeader = "Actions";
	if(storedLanguage == 'ar'){
		addHeader = "إضافة";
		editHeader = "تعديل";
		deleteHeader = "حذف";
		viewHeader = "عرض";
		actionsHeader = "إجراءات";
	}else if(storedLanguage == 'am'){
		addHeader = "ጨምር";
		editHeader = "አርትዕ";
		deleteHeader = "ሰርዝ";
		viewHeader = "እይ";
		actionsHeader = "እርምጃዎች";
	}else{
		addHeader = "Add";
		editHeader = "Edit";
		deleteHeader = "Delete";
		viewHeader = "View";
		actionsHeader = "Actions";
	}
    console.log(moduleNames, "moduleNames");
    var contentHtml = '';

    $.each(moduleNames, function (i, module) {
        var moduleHtml = '<div class="tab-pane fade show active" id="superAdmin-tab-pane" role="tabpanel"' +
                         'aria-labelledby="superAdmin-tab" tabindex="0">' +
                         '<div class="accordion accordion-flush accordionPermission" id="accordionPermission">' +
                         '<div class="accordion-item">' +
                         '<h2 class="accordion-header" id="permission-' + module.roleId + '-' + i + '">' +
                         '<button class="accordion-button" type="button" data-bs-toggle="collapse"' +
                         'data-bs-target="#permission-collapses-' + module.roleId + '-' + i + '" aria-expanded="true"' +
                         'aria-controls="permission-collapses-' + module.roleId + '-' + i + '">' +
                         '<span class="icon">' +
                         '<img src="images/user-role-i.svg" alt="User Role" width="18" height="18">' +
                         '</span>' +
                         '<span class="icon-text">' + module.moduleName + '</span>' +
                         '</button>' +
                         '</h2>' +
                         '<div id="permission-collapses-' + module.roleId + '-' + i + '" class="accordion-collapse collapse show"' +
                         'aria-labelledby="permission-' + module.roleId + '-' + i + '">' +
                         '<div class="accordion-body">' +
                         '<div class="table-responsive">' +
                         '<table class="table border mb-0" id="organisationTable">' +
                         '<thead>' +
                         '<tr>' +
                         '<th style="width: 50%;">'+actionsHeader+'</th>' +
                         '<th class="text-center">'+viewHeader+'</th>' +
                         '<th class="text-center">'+addHeader+'</th>' +
                         '<th class="text-center">'+editHeader+'</th>' +
                         '<th class="text-center">'+deleteHeader+'</th>' +
                         '</tr>' +
                         '</thead>' +
                         '<tbody>';

        $.each(module.tagNameList, function (j, tag) {
            moduleHtml += '<tr>' +
                          '<td>' +
                          '<div class="form-check">' +
                          '<input class="form-check-input" type="checkbox" value="" id="chekOrganisation">' +
                          '<label class="form-check-label" for="chekOrganisation">' +
                          tag.tagName +
                          '</label>' +
                          '</div>' +
                          '</td>' +
                          '<td class="text-center">' +
                          '<input class="form-check-input viewTextbox" type="checkbox" data-modulename="' + module.moduleName + '" data-roleid="' + module.roleId + '" data-tagname="' + tag.tagName + '" data-boxname="view" value=""' +
                          (tag.privileges && tag.privileges.privilegeView === "TRUE" ? ' checked' : '') + ' aria-label="...">' +
                          '</td>' +
                          '<td class="text-center">' +
                          '<input class="form-check-input" type="checkbox" data-modulename="' + module.moduleName + '" data-roleid="' + module.roleId + '" data-tagname="' + tag.tagName + '" data-boxname="add" value=""' +
                          (tag.privileges && tag.privileges.privilegeCreate === "TRUE" ? ' checked' : '') + ' aria-label="...">' +
                          '</td>' +
                          '<td class="text-center">' +
                          '<input class="form-check-input" type="checkbox" data-modulename="' + module.moduleName + '" data-roleid="' + module.roleId + '" data-tagname="' + tag.tagName + '" data-boxname="edit" value=""' +
                          (tag.privileges && tag.privileges.privilegeUpdate === "TRUE" ? ' checked' : '') + ' aria-label="...">' +
                          '</td>' +
                          '<td class="text-center">' +
                          '<input class="form-check-input" type="checkbox" data-modulename="' + module.moduleName + '" data-roleid="' + module.roleId + '" data-tagname="' + tag.tagName + '" data-boxname="delete" value=""' +
                          (tag.privileges && tag.privileges.privilegeDelete === "TRUE" ? ' checked' : '') + ' aria-label="...">' +
                          '</td>' +
                          '</tr>';
        });

        moduleHtml += '</tbody>' +
                      '</table>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '</div>';

        contentHtml += moduleHtml;
    });

    $(".permission-content.tab-content").html(contentHtml);

    // Attach event listeners to checkboxes
    $(".permission-content.tab-content").on("change", "input[type='checkbox']", function () {
        handleCheckboxClick(this);
    });

    // Toggle aria-expanded attribute on accordion header click
    $(".permission-content.tab-content").on("click", ".accordion-header", function () {
        var button = $(this).find(".accordion-button");
        var isExpanded = button.attr("aria-expanded") === "true";
        button.attr("aria-expanded", !isExpanded);
    });
}

function handleCheckboxClick(checkbox) {
    var $checkbox = $(checkbox);
    var modulename = $checkbox.attr("data-modulename");
    var roleid = $checkbox.attr("data-roleid");
    var tagname = $checkbox.attr("data-tagname");
    var boxname = $checkbox.attr("data-boxname");
    var propchecked = $checkbox.prop("checked");

    if (!modulename || !roleid || !tagname || !boxname) {
        return false;
    }

    var privillagename = "";
    if (boxname === "add") {
        privillagename = "Create";
    } else if (boxname === "edit") {
        privillagename = "Update";
    } else if (boxname === "view") {
        privillagename = "View";
    } else if (boxname === "delete") {
        privillagename = "Delete";
    }

    var method = propchecked ? "put" : "delete";
    var url = "/stratroom/" + (propchecked ? "updatePermissions" : "deletePermissions") + "/" + roleid +
              "?moduleName=" + encodeURIComponent(modulename) + "&tagName=" + tagname + "&privilegeName=" + privillagename;

    $.ajax({
        url: url,
        type: method,
        async: false,
        success: function (data, status) {
            console.log("API call successful:", data);
            $.notify("Success: Updated Successfully", { style: 'success', className: 'graynotify' });
        },
        error: function (xhr, status, error) {
            console.error("API call failed:", error);
            $.notify("Error: Failed to update", { style: 'error', className: 'graynotify' });
        }
    });
}

function defaultRoleListShow(data) {


	$(".content1:eq(0)").empty();
	var	bodyRows	=	"";
	var custom		=	0;
	var defaultinc	=	0;
	var	chartsOptions	=	"";	


	$.each(data, function (i, List) {
		// Append the role to the Default Roles section (before the divider)
		$(".permission-tab-menu .defaultRolesHeader").each(function () {
		  if ($(this).text().trim().startsWith("Default Roles (")) {
			// Add the 'active' class to the first role only
			var roleClass = (i === 0) ? 'nav-item active' : 'nav-item';
			$(this).closest("ul").find(".dropdown-divider").before(
			  '<li class="' + roleClass + '" role="presentation" data-modules=\'' + JSON.stringify(List.modulePrivilegeList) + '\'>' + List.roleName + '</li>'
			);
		  }
		});
	  });

	  // Update the count of Default Roles based on data length
	  $(".permission-tab-menu .defaultRolesHeader").each(function () {
		if ($(this).text().trim().startsWith("Default Roles (")) {
		  var roleCount = data?.length || 0;
		  $(this).text("Default Roles (" + roleCount + ")");
		}
	  });


	  $(".permission-tab-menu .nav-item").on("click", function () {
		// Remove 'active' class from all roles
		$(".permission-tab-menu .nav-item").removeClass("active");
		// Add 'active' class to the clicked role
		$(this).addClass("active");

		// Get the moduleNames of the active role
		var moduleNames = JSON.parse($(this).attr("data-modules"));
		console.log(moduleNames, "moduleNames");
		displayModuleNames(moduleNames);
	  });

	  // Display moduleNames for the first role initially
	  var firstRoleModules = JSON.parse($(".permission-tab-menu .nav-item.active").attr("data-modules"));
	  displayModuleNames(firstRoleModules);

    $(".content1:eq(0) .selectAll").click(function() {
    	
    	$(this).closest('.panel').find(".allchecked").not(':disabled').prop("checked",$(this).prop("checked"));
    	var modulename	=	$(this).attr("data-modulename");
    	var roleid		=	$(this).attr("data-roleid");
    	var propchecked	=	$(this).prop("checked");
    	if(propchecked){
    		method	=	"put";
    		url	=	"/stratroom/updatePermissions/"+roleid+"?moduleName="+encodeURIComponent(modulename)+"&tagName=all";
    	}else{
    		method	=	"delete";
    		url	=	"/stratroom/deletePermissions/"+roleid+"?moduleName="+encodeURIComponent(modulename)+"&tagName=all";
    	}
    	
    	$.ajax({
    		url : url,
    		type : method,
    		async:false,
    		success : function(data, status) {
    			$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' });
    			//location.reload(true);
    		},
    		error:readErrorMsg
    	});
    });
    
    $(".content1:eq(0) .allchecked").click(function() {
    	var flagall	=	true;
    	var checkviewbox	=	[];
    	$.each($(this).closest('.panel').find(".allchecked").not(':disabled'),function(){
    		var allprop	=	$(this).prop("checked");
    		if(allprop	==	false){
    			flagall	=	false;
    		}
    		if(allprop){
    			if($(this).attr("data-boxname") == "delete" || $(this).attr("data-boxname") == "edit" || $(this).attr("data-boxname") == "add"){
    				checkviewbox.push($(this).attr("data-tagname"));
    			}
    		}
    	});
    	if(flagall	==	false){
			$(this).closest('.panel').find(".selectAll").prop("checked","");
		}else{
			$(this).closest('.panel').find(".selectAll").prop("checked","checked");
		}
    	
    	var modulename	=	$(this).attr("data-modulename");
    	var roleid		=	$(this).attr("data-roleid");
    	var tagname		=	$(this).attr("data-tagname");
    	var boxname		=	$(this).attr("data-boxname");
    	var propchecked	=	$(this).prop("checked");
    	var	privillagename	=	"";
    	if(boxname	==	"" || tagname	==	"" || modulename	==	"" || roleid	==	""){
    		return false;
    	}
    	
    	if(boxname	==	"add"){
    		privillagename	=	"Create";
    	}else if(boxname	==	"edit"){
    		privillagename	=	"Update";
    	}else if(boxname	==	"view"){
    		privillagename	=	"View";
    	}else if(boxname	==	"delete"){
    		privillagename	=	"Delete";
    	}
    	
    	var counts = {};
    	checkviewbox.forEach((x) => {
    	  counts[x] = (counts[x] || 0) + 1;
    	});
    	
    	if(counts[tagname] != undefined && counts[tagname]	>=1){
    		$(this).closest('.panel').find(".viewTextbox[data-tagname='"+tagname+"']").prop("checked","checked");
    	}
    	
    	var commoncheck	=	[];
    	if(propchecked && boxname	==	"view" && modulename	==	"Scorecard"){
    		$.each($(this).closest('.panel').find(".viewTextbox").not(':disabled'),function(){
        		var checkmodulename	=	$(this).attr("data-tagname");
        		if(checkmodulename != "Formula Register"){
        			if(checkmodulename	!=	"Scorecard" && $(this).prop("checked") == false){
        				commoncheck.push(checkmodulename);
        			}
        			$(this).prop("checked","checked");
        		}
        	});
    	}
    	
    	/*if(checkviewbox.length	==	3){
    		$(this).closest('.panel').find(".viewTextbox").prop("checked","checked");
    	}*/
    	
    	
    	if(propchecked){
    		method	=	"put";
    		url	=	"/stratroom/updatePermissions/"+roleid+"?moduleName="+encodeURIComponent(modulename)+"&tagName="+tagname+"&privilegeName="+privillagename;
    	}else{
    		method	=	"delete";
    		url	=	"/stratroom/deletePermissions/"+roleid+"?moduleName="+encodeURIComponent(modulename)+"&tagName="+tagname+"&privilegeName="+privillagename;
    	}
    	
    	$.ajax({
    		url : url,
    		type : method,
    		async:false,
    		success : function(data, status) {
    			if(counts[tagname] != undefined && counts[tagname]	>=	1){
    		    	method	=	"put";
    		    	url	=	"/stratroom/updatePermissions/"+roleid+"?moduleName="+encodeURIComponent(modulename)+"&tagName="+tagname+"&privilegeName=View";
    	    		$.ajax({
    	        		url : url,
    	        		type : method,
    	        		async:false,
    	        		success : function(data, status) {
    	        			//$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' });
    	        		},
    	        		error:readErrorMsg
    	        	});
    	    	}
    			
    			if(commoncheck){
    				$.each(commoncheck,function(keys,itemval){
    					var curl	=	"/stratroom/updatePermissions/"+roleid+"?moduleName="+encodeURIComponent(modulename)+"&tagName="+itemval+"&privilegeName=View";
        	    		$.ajax({
        	        		url : curl,
        	        		type : "put",
        	        		async:false,
        	        		success : function(data, status) {
//        	        			$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' });
        	        		}
        	        	});
    				});
    			}
    			$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' });
    		},
    		error:readErrorMsg
    	});
    });
}

function customRoleListShow(data) {
	$(".content1:eq(1)").empty();
	var	bodyRows	=	"";
	var defaultinc	=	0;
	var	chartsOptions	=	"";
	var currentrolename	=	$("#superuserrolename").val();


	$.each(data, function (i, List) {
		// Append the role to the Custom Roles section (after the header)
		$(".permission-tab-menu .custumRoles").each(function () {
		  if ($(this).text().trim().startsWith("Custom Roles (")) {
			$(this).closest("li").after(
			  '<li class="nav-item" role="presentation" data-modules=\'' + JSON.stringify(List.modulePrivilegeList) + '\'>' + List.roleName + '</li>'
			);
		  }
		});
	  });

	  // Update the count of Custom Roles
	  $(".permission-tab-menu .custumRoles").each(function () {
		if ($(this).text().trim().startsWith("Custom Roles (")) {
		  const roleCount = data?.length || 0;
		  $(this).text("Custom Roles (" + roleCount + ")");
		}
	  });

	  $(".permission-tab-menu .nav-item").on("click", function () {
		// Remove 'active' class from all roles
		$(".permission-tab-menu .nav-item").removeClass("active");
		// Add 'active' class to the clicked role
		$(this).addClass("active");

		// Get the moduleNames of the active role
		var firstRoleModules = JSON.parse($(".permission-tab-menu .nav-item.active").attr("data-modules"));
		displayModuleNames(firstRoleModules);
	  });

    $(".content1:eq(1)").html(bodyRows);
    $("#customrolecount").text('('+defaultinc+' Roles)');
    
    $.each($(".content1:eq(1) .panel"),function(){
    	var flagall	=	true;
    	var checkviewbox	=	[];
    	$.each($(this).closest('.panel').find(".allchecked").not(':disabled'),function(){
    		var allprop	=	$(this).prop("checked");
    		if(allprop	==	false){
    			flagall	=	false;
    		}
    		if(allprop){
    			if($(this).attr("data-boxname") == "delete" || $(this).attr("data-boxname") == "edit" || $(this).attr("data-boxname") == "add"){
    				checkviewbox.push(true);
    			}
    		}
    	});
    	if(flagall	==	false){
			$(this).closest('.panel').find(".selectAll").prop("checked","");
		}else{
			$(this).closest('.panel').find(".selectAll").prop("checked","checked");
		}
    	if($(this).closest('.panel').find(".allchecked").length	==	0){
    		$(this).closest('.panel').find(".selectAll").prop("checked","");
    	}
    	/*if(checkviewbox.length	==	3){
        	$(this).closest('.panel').find(".viewTextbox").prop("checked","checked");
    	}*/
    	
	});
    
    var acc = document.getElementsByClassName("accordion2");
    var i;
    
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.parentElement.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      });
    }
    
    var acc = document.getElementsByClassName("accordion3");
    var i;
    
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
	    if(panel){    
        	if (panel.style.display === "block") {
	          panel.style.display = "none";
	        } else {
	          panel.style.display = "block";
	        }
	    }
      });
    }    
    
    $(".content1:eq(1) .selectAll").click(function() { 
    	$(this).closest('.panel').find(".allchecked").not(':disabled').prop("checked",$(this).prop("checked"));
    	var modulename	=	$(this).attr("data-modulename");
    	var roleid		=	$(this).attr("data-roleid");
    	var propchecked	=	$(this).prop("checked");
    	if(propchecked){
    		method	=	"put";
    		url	=	"/stratroom/updatePermissions/"+roleid+"?moduleName="+encodeURIComponent(modulename)+"&tagName=all";
    	}else{
    		method	=	"delete";
    		url	=	"/stratroom/deletePermissions/"+roleid+"?moduleName="+encodeURIComponent(modulename)+"&tagName=all";
    	}
    	$.ajax({
    		url : url,
    		type : method,
    		async:false,
    		success : function(data, status) {
    			$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' });
    			//location.reload(true);
    		},
    		error:readErrorMsg
    	});
    });
    
    $(".content1:eq(1) .allchecked").click(function() { 
    	var flagall	=	true;
    	var checkviewbox	=	[];
    	$.each($(this).closest('.panel').find(".allchecked").not(':disabled'),function(){
    		var allprop	=	$(this).prop("checked");
    		if(allprop	==	false){
    			flagall	=	false;
    		}
    		if(allprop){
    	    	if($(this).attr("data-boxname") == "delete" || $(this).attr("data-boxname") == "edit" || $(this).attr("data-boxname") == "add"){
    	    		checkviewbox.push($(this).attr("data-tagname"));
    			}
        	}
    	});
    	
    	
    	if(flagall	==	false){
			$(this).closest('.panel').find(".selectAll").prop("checked","");
		}else{
			$(this).closest('.panel').find(".selectAll").prop("checked","checked");
		}
    	
    	
    	var modulename	=	$(this).attr("data-modulename");
    	var roleid		=	$(this).attr("data-roleid");
    	var tagname		=	$(this).attr("data-tagname");
    	var boxname		=	$(this).attr("data-boxname");
    	var propchecked	=	$(this).prop("checked");
    	
    	var	privillagename	=	"";
    	if(boxname	==	"" || tagname	==	"" || modulename	==	"" || roleid	==	""){
    		return false;
    	}
    	
    	if(boxname	==	"add"){
    		privillagename	=	"Create";
    	}else if(boxname	==	"edit"){
    		privillagename	=	"Update";
    	}else if(boxname	==	"view"){
    		privillagename	=	"View";
    	}else if(boxname	==	"delete"){
    		privillagename	=	"Delete";
    	}
    	
    	if(propchecked){
    		method	=	"put";
    		url	=	"/stratroom/updatePermissions/"+roleid+"?moduleName="+encodeURIComponent(modulename)+"&tagName="+tagname+"&privilegeName="+privillagename;
    	}else{
    		method	=	"delete";
    		url	=	"/stratroom/deletePermissions/"+roleid+"?moduleName="+encodeURIComponent(modulename)+"&tagName="+tagname+"&privilegeName="+privillagename;
    	}
    	
    	var commoncheck	=	[];
    	if(propchecked && boxname	==	"view" && modulename	==	"Scorecard"){
    		$.each($(this).closest('.panel').find(".viewTextbox").not(':disabled'),function(){
        		var checkmodulename	=	$(this).attr("data-tagname");
        		if(checkmodulename != "Formula Register"){
        			if(checkmodulename	!=	"Scorecard" && $(this).prop("checked") == false){
        				commoncheck.push(checkmodulename);
        			}
        			$(this).prop("checked","checked");
        		}
        	});
    	}
    	
    	var counts = {};
    	checkviewbox.forEach((x) => {
    	  counts[x] = (counts[x] || 0) + 1;
    	});
    	
    	if(counts[tagname] != undefined && counts[tagname]	>=	1){
    		$(this).closest('.panel').find(".viewTextbox[data-tagname='"+tagname+"']").prop("checked","checked");
    	}
    	
    	$.ajax({
    		url : url,
    		type : method,
    		async:false,
    		success : function(data, status) {
    			$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' });
    			if(counts[tagname] != undefined && counts[tagname]	>=	1){
    		    	method	=	"put";
    		    	url	=	"/stratroom/updatePermissions/"+roleid+"?moduleName="+encodeURIComponent(modulename)+"&tagName="+tagname+"&privilegeName=View";
    	    		$.ajax({
    	        		url : url,
    	        		type : method,
    	        		async:false,
    	        		success : function(data, status) {
    	        			//$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' });
    	        		},
    	        		error:readErrorMsg
    	        	});
    	    	}
    			
    			if(commoncheck){
    				$.each(commoncheck,function(keys,itemval){
    					var curl	=	"/stratroom/updatePermissions/"+roleid+"?moduleName="+encodeURIComponent(modulename)+"&tagName="+itemval+"&privilegeName=View";
        	    		$.ajax({
        	        		url : curl,
        	        		type : "put",
        	        		async:false,
        	        		success : function(data, status) {
//        	        			$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' });
        	        		}
        	        	});
    				});
    			}
    			
    		},
    		error:readErrorMsg
    	});
    });
}

function formvalidationerrorreset(){
	$('*[id*=-error]').each(function() {
	    $(this).remove();
	});
}

function handleeventdelete(){
	var id				=	$("#deleterecordid").val();

	console.log(id, "idData");
	if(id	==	""){
		return false;
	}
	var url		=	"";
	var method	=	"";
	var type	=	$("#deleterecordtype").val();
	var flagcheck	=	false;
	if(type	==	"userdelete"){
		method	=	"delete";
		url	=	"/stratroom/userRole/" + id;
		flagcheck	=	true;
	}else{
		method	=	"get";
		url	=	"/stratroom/removeRole/" + id;
	}
	
	$.ajax({
		url : url,
		type : method,
		contentType : "application/json",
		success : function(data, status) {
			if(flagcheck){
				$(".divheaduser_"+id).closest('.divbox').remove();
				$("#deleterecordid").val('');
				$("#deleterecordtype").val('');
				$('#deleteModaldashboard').modal('toggle');
			}else{
				location.reload(true);
			}
			$.notify("Success:Deleted Successfully", { style: 'success', className: 'graynotify' });
			location.reload(true);
		},
		error:readErrorMsg
	});
}

function handleFilterevent(){
	//$(".filterdepartment,.filterrolelist").val('');
	departmentlist(".filterdepartment");
	$(".filterdepartment").select2({});
	$(".filterrolelist").select2({});
}

function handleRoleevent(id, action) {
	$("#nameerrorshow1").hide();
	$("#nameerrorshow1").text("");
	$("#employeedepterrorshow1").hide();
	$("#rolename").attr("readonly",false);
	$("#userroleadd").css('display', 'none');
	$("#userroleadd").trigger('reset');
	$("#userupdateroleid").val('');
	$("#userroleadd input[name='roleaddaction']").val(action);
	$("#userroleemailval-error").hide();
	formvalidationerrorreset();
	if (action == 'add') {
		// when adding
		$("#userroleadd").css('display', 'block');
		populateOwnerDropdownorg("#roleusetmapping");
		$("#roleusetmapping").select2({});
//		populatedefaultcustomRoleDropdownorg("#rolename");
	//	$("#rolename").select2({});
	}else if (action == 'delete') {
		if(deletepermission	==	false){
			return false;
		}
		$("#deleterecordid").val(id);
		$("#deleterecordtype").val('roledelete');
		$('#deleteModaldashboard').modal('toggle');
		
		$(window).on("resize", function(){
		    $(".modal:visible").each(alignModal);
		}); 
		$(".modal").on("shown.bs.modal", alignModal);
		
	} else { // view and edit
		$("#userroleadd").css('display', 'block');
		formvalidationerrorreset();
		if (action == 'edit') {
			populateOwnerDropdownorg("#roleusetmapping");
			//populatedefaultcustomRoleDropdownorg("#rolename");
			$("#userroleadd input[name='userupdateroleid']").val(id);
			$.ajax({
				url : "/stratroom/role/" + id,
				success : function(data){
					rolePopSuccessCallback(data);
				},
				error:readErrorMsg
			});
		}		
	}
}

function handledefaultRoleevent(id, action) {
	
	$("#userdefaultroleadd").trigger('reset');
	$("#userupdatedeafultroleid").val(id);
	formvalidationerrorreset();
	$("#userdefaultroleadd").css('display', 'block');
		
	populateOwnerDropdownorg("#defaultroleusetmapping");
	//populatedefaultcustomRoleDropdownorg("#rolename");
	$("#userupdatedeafultroleid input[name='userupdatedeafultroleid']").val(id);
	$.ajax({
		url : "/stratroom/role/" + id,
		success : function(data){
			defaultrolePopSuccessCallback(data);
		},
		error:readErrorMsg
	});
}

function defaultrolePopSuccessCallback(List) {
	
    $("#defaultroleusetmapping").val(List.employeeIDs);
	$("#defaultroleusetmapping").select2({});
}

function rolePopSuccessCallback(List) {
	var roleType 	=	((List.roleType !=	undefined && List.roleType != "" && List.roleType != null)?List.roleType:"");
	if(roleType	==	"Custom"){
		roleType	=	"";
	}
	
	var name 	=	((List.roleName !=	undefined && List.roleName != "" && List.roleName != null)?List.roleName:"");
    $("#roleshortname").val(roleType);
    $("#rolename").val(name).attr("readonly",true);
    //$("#rolename").select2({tags: true});
    $("#roleusetmapping").val(List.employeeIDs);
	$("#roleusetmapping").select2({});
}

function populatecustomRoleDropdownorg(elementId,formtypeElement) {
	$.ajax({
		url : "/stratroom/roleList"+currentEmp+"?type=CUSTOM",
		async:false,
		success : function(employeeList) {
			$.each(employeeList, function(index, reportee) {
				addOption(elementId, reportee.roleName, reportee.roleName,reportee.roleId)
			});
		}
	});
}


function handleUserRoleevent(id, action) {

	console.log(id,action,  "idValue")
	$("#userroleFormadd").css('display', 'none');
	$("#userroleFormadd").trigger('reset');
	$("#userroleid").val('');
	$("#userroleFormadd input[name='action']").val(action);
	$("#userroleemailval-error").hide();
	formvalidationerrorreset();
	if (action == 'add') {
		// when adding
		$("#userroleFormadd").css('display', 'block');
		departmentlist("#userroledepartment");
		$("#userroledepartment").select2({});
		$("#userrolerole").empty();
		populatedefaultRoleDropdownorg("#userrolerole");
		//populatecustomRoleDropdownorg("#userrolerole");
		$("#userrolerole").select2({});
	}else if (action == 'delete') {
		if(deletepermission	==	false){
			return false;
		}
		$("#deleterecordid").val(id);
		$("#deleterecordtype").val('userdelete');
		$('#deleteModaldashboard').modal('toggle');
		
		$(window).on("resize", function(){
		    $(".modal:visible").each(alignModal);
		}); 
		$(".modal").on("shown.bs.modal", alignModal);
		
	} else { // view and edit
		$("#userroleFormadd").css('display', 'block');
		formvalidationerrorreset();
		if (action == 'edit') {
			$("#userrolerole").empty();
			populatedefaultRoleDropdownorg("#userrolerole");
			//populatecustomRoleDropdownorg("#userrolerole");
			departmentlist("#userroledepartment");
			$("#userroleFormadd input[name='userroleid']").val(id);
			$.ajax({
				url : "/stratroom/userRole/" + id,
				success : function(data){
					userRolePopSuccessCallback(data);
				},
				error:readErrorMsg
			});
		}		
	}
}

function userRolePopSuccessCallback(List) {
	console.log(List, "ListData");
	// updateUserTypes();

	const userTypeOptions = {
    internal: [
      { value: "employees", text: "Employees" }
    ],
    external: [
      { value: "vendor", text: "Vendor" },
      { value: "independent_director", text: "Independent Director" },
      { value: "non_executive_director", text: "Non Executive Director" },
      { value: "external_auditor", text: "External Auditor" }
    ]
  };

    function updateUserTypes() {
    const category = $("#userrolecategory").val();
    const $type = $("#userroleType");

    $type.empty();

    $.each(userTypeOptions[category], function (_, item) {
      $type.append(
        $("<option></option>").val(item.value).text(item.text)
      );
    });
  }






	var roleId 	=	((List.roleId !=	undefined && List.roleId != "" && List.roleId != null)?List.roleId:"");
	var emailAddress 	=	((List.emailAddress !=	undefined && List.emailAddress != "" && List.emailAddress != null)?List.emailAddress:"");
	var designation 	=	((List.designation !=	undefined && List.designation != "" && List.designation != null)?List.designation:"");
	var name 	=	((List.name !=	undefined && List.name != "" && List.name != null)?List.name:"");
	var phoneNumber =	((List.phoneNumber !=	undefined && List.phoneNumber != "" && List.phoneNumber != null)?List.phoneNumber:"");
	var location 	=	((List.location !=	undefined && List.location != "" && List.location != null)?List.location:"");
	var status 	=	((List.status !=	undefined && List.status != "" && List.status != null)?List.status:"");
	var statusValue 	=	((List.status !=	undefined && List.status != "" && List.status != null)?List.status:"");
	var image 	=	((List.profileImage !=	undefined && List.profileImage != "" && List.profileImage != null)?List.profileImage:"");
	$("#userprofileimage").val(image);
	$("#userrolerole").val(roleId);
	$("#userrolerole").select2({});
    $("#userroledesignation").val(designation);
    $("#userrolestatus").val(status);
    $("#userrolephone").val(phoneNumber);
    $("#userroleemail").val(emailAddress);
    $("#userrolelocation").val(location);
	$("#userUniqId").val(List.userUniqId);
	$("#userrolecategory").val(List.userCategory);
	updateUserTypes();

	$("#userroleType").val(List.userType);

    var department	=	[];
    if(List.departmentList !=	undefined && List.departmentList !=	null){
		department	=	List.departmentList.map(function (i) {return i.id;});	
	}
    $("#userroledepartment").val(department);
    $("#userrolename1").val(name);
	$("#userroledepartment").select2({});
}

function UserRoleListShow(data, filtertype) {
	const storedLanguage = localStorage.getItem('selectedLang') || 'en';
	var nameHeader	=	'Name';
	var roleHeader	=	'Role';
	var deptHeader	=	'Department';
	var statusHeader	=	'Status';
	var actionsHeader	=	'Actions';

	if(storedLanguage == 'ar') {
		nameHeader	=	'الاسم';
		roleHeader	=	'الدور';
		deptHeader	=	'القسم';
		statusHeader	=	'الحالة';
		actionsHeader	=	'الإجراءات';
	}else if(storedLanguage == 'am'){
			nameHeader = "ስም";
			roleHeader = "ሚና";
			deptHeader = "ዳርቻ / ክፍል";
			statusHeader = "ሁኔታ";
			actionsHeader = "እርምጃዎች";
	}else {
		nameHeader	=	'Name';
		roleHeader	=	'Role';
		deptHeader	=	'Department';
		statusHeader	=	'Status';
		actionsHeader	=	'Actions';
	}
    console.log("Data received:", data);
    console.log("Filter type:", filtertype);

    $(".userrolecontent").empty();
    var bodyRows = "";

    if (jQuery.isEmptyObject(data)) {
        console.log("Data is empty");
        $(".userrolecontent").append(`<div class="col-lg-12 xs-12 sm-12 md-12">
            <div class="card">
                <div class="card-body">
                    <p><center>No Data Found</center></p>
                </div>
            </div>
        </div>`);
        return;
    }

    // Add table headers only once
    var tableHeader = `
        <table id="userTable" class="table border w-100">
            <thead>
                <tr>
                    <th >`+nameHeader+`</th>
                    <th>`+roleHeader+`</th>
                    <th>`+deptHeader+`</th>
					<th>User Category</th>
					<th>User Type</th>
                    <th>`+statusHeader+`</th>
                    <th class="text-end">`+actionsHeader+`</th>
                </tr>
            </thead>
            <tbody>
    `;

    $(".userrolecontent").append(tableHeader);

    $.each(data, function (i, List) {
        console.log("Processing user:", List);

        var moduleName = [];
        var id = List.userId;
        var department = [];
        if (List.departmentList != undefined && List.departmentList != null) {
            department = List.departmentList.map(function (i) { return i.name; });
        }
        department = department.join(',');

        var emailAddress = ((List.emailAddress != undefined && List.emailAddress != "" && List.emailAddress != null) ? List.emailAddress : "");
        var designation = ((List.status != undefined && List.status != "" && List.status != null) ? List.status : "");
        var name = ((List.name != undefined && List.name != "" && List.name != null) ? List.name : "");
		var userCategory = ((List.userCategory != undefined && List.userCategory != "" && List.userCategory != null) ? List.userCategory : "");
		var userType = ((List.userType != undefined && List.userType != "" && List.userType != null) ? List.userType : "");
        var image = "";

        if (List.profileImage != undefined && List.profileImage != "" && List.profileImage != null) {
            image = ((List.profileImage != undefined && List.profileImage != null && List.profileImage != "") ? List.profileImage : "");
            image = ((image == "" || image == null) ? "data-name='" + name + "' class='rounded-circle pointer swotuserimage'" : " class='rounded-circle pointer' src='" + image + "'");
        } else {
            image = "data-name='" + name + "' class='rounded-circle pointer swotuserimage'";
        }

        var userRole = ((List.userRole != undefined && List.userRole != "" && List.userRole != null) ? List.userRole : "");
        var options = "";

        if (deletepermission == false && editpermission == false) {
            options = "";
        } else {
            options = `<ul class="header-dropdown" style="margin-bottom: 0px">
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true"
                    style="color: #1e252d !important">
                        <i class="fas fa-ellipsis-v"></i>
                  </a>
                  <ul class="dropdown-menu pull-right" id="project-options" x-placement="bottom-start" 
                    style="position: absolute;will-change: transform;top: 0px;left: 0px;transform: translate3d(0px, 24px, 0px);">`;

            if (editpermission == true) {
                options += `<li class="pointer">
                          <a data-toggle="modal" data-target="#add_user" style="font-weight: normal !important;"  
                          onclick="handleUserRoleevent('` + id + `','edit')">Edit
                          </a>
                        </li>`;
            }

            if (deletepermission == true) {
                options += `<li class="pointer">
                          <a onclick="handleUserRoleevent('` + id + `','delete')" style="font-weight: normal !important;">Delete
                          </a></li>`;
            }

            options += `</ul></li></ul>`;
        }

        if (List.userAccess == 0) {
            options = "";
        }

        var status = (List.status != undefined && List.status != "" && List.status != null ? List.status : "");
        var statusflag = (List.status != undefined && List.status != "" && List.status != null ? List.status : "");
        status = (status == "Active" ? "divfont rolesearch" : "divfontinactive rolesearch");

        bodyRows = `
            <tr class="divhead divheaduser_`+id+`">
                <td style="vertical-align: middle;">
                    <div class="user-card">
                        <div class="user-image  ` + (designation == "Active" ? "user-active" : "user-inactive") + `">
                            <img width="60" height="60px" data-id="` + id + `" id="upload_link_image_` + id + `" ` + image + ` alt="` + name + `"/>
                        </div>
                        <div class="user-text d-flex flex-column">
                            <h6 class="text-heading text-truncate">`+ name + `</h6>
                            <small>` + emailAddress + `</small>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="role-list">
                        <span class="badge label-bg-red rounded-pill">` + userRole + `</span>
                    </div>
                </td>
                <td><span class="badge label-bg-dark">` + department + `</span></td>
				<td>` + userCategory + `</td>
				<td>` + userType + `</td>
                <td>
                    <div class="badge rounded-pill text-bg-` + (designation == "Active" ? "success" : "danger") + `">`+ designation + `</div>
                </td>
                <td>
                    <div class="table-actions justify-content-end">
                        ${editpermission ? `
                        <div class="btn btn-sm btn-outline-icon" href="#edit-user" data-toggle="modal" data-target="#add_user" onclick="handleUserRoleevent('` + id + `','edit')">
                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Edit" style="background-color: white;">
                                <img src="images/edit-i.svg" width="12" height="12" />
                            </span>
                        </div>` : ''}
                        ${viewpermission ? `
                        <div class="btn btn-sm btn-outline-icon" href="#view-user" data-bs-toggle="modal"  onclick="handleUserRoleevent('` + id + `','view')" style="background-color: white;">
                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="View">
                                <img src="images/view-i.svg" width="12" height="12" />
                            </span>
                        </div>` : ''}
                        ${deletepermission ? `
                        <div class="btn btn-sm btn-outline-icon" href="#delete-modal" data-bs-toggle="modal"  onclick="handleUserRoleevent('` + id + `','delete')">
                            <span class="icon" data-bs-toggle="tooltip" data-bs-title="Delete" style="background-color: white;">
                                <img src="images/delete-i.svg" width="12" height="12" />
                            </span>
                        </div>` : ''}
                    </div>
                </td>
            </tr>
        `;

        if (statusflag == "Active" && filtertype == "normal") {
            $(".userrolecontent tbody").append(bodyRows);
        } else if (filtertype == "filter") {
            $(".userrolecontent tbody").append(bodyRows);
        }
    });

    // Close the table
    $(".userrolecontent").append(`</tbody></table>`);

    $('.swotuserimage').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
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

function addOption(id, text, value,dataattr) {
	$(id).append(`<option data-roleid="${dataattr}" value="${value}">${text}</option>`);
}

$("#userroleFormadd").validate({
	rules : {
		userroleemail:{required:true,
			email:true},
		userrolename1:"required",
		//userroledepartment:"required",
		userrolerole:"required",
		userrolestatus:"required"
	},errorPlacement: function(error, element) {
		if((element.hasClass('select2') && element.next('.select2-container').length) || (element.hasClass('selectroleuser') && element.next('.select2-container').length)) {
	        error.insertAfter(element.next('.select2-container'));
	    }else{
	    	error.insertAfter(element);
	    }
	},
	messages : {
	},

	submitHandler : function(form) {
		saveUserRoleSettings();
	}
});


$("#userroleadd").validate({
	rules : {
		rolename:"required"
	},
	messages : {
	},
	submitHandler : function(form) {
		saveRoleSettings();
	}
});

function saveRoleSettings() {
	
	var id	=	$("#userupdateroleid").val();
	var action	=	"add";
	var methodType	=	"POST";
	if (id != undefined && id != "") {
		action 		= 	"edit";
		methodType	=	"PUT";
	}
	
	var genObj 	= 	roleSettingsObj(id,action);
	if (id != undefined && id != "") {
		genObj.roleId	=	id;
	}
	

	
	var rolename	=	$("#rolename").val();
	var flagcase	=	false;
	
	if($("#rolename").attr("readonly")	==	undefined){
		$(".accordion1").each(function(value){
			if($(this).text().toLowerCase() == rolename.toLowerCase()){
				$("#employeedepterrorshow1").show();
				$("#employeedepterrorshow1").text("This role is already exist");
				flagcase	=	true;
				return false;
			}
		});
		$(".accordion2").each(function(value){
			if($(this).text().toLowerCase() == rolename.toLowerCase()){
				$("#employeedepterrorshow1").show();
				$("#employeedepterrorshow1").text("This role is already exist");
				flagcase	=	true;
				return false;
			}
		});
	}
	
	if(flagcase){
		return false;
	}
	
	
	$.ajax({
		url : "/stratroom/role",
		type : methodType,
		contentType : "application/json",
		data : JSON.stringify(genObj),
		success : function(data, status) {
			location.reload(true);
		},error:function(msg,status){
			if(!jQuery.isEmptyObject(msg.responseText)){
				$.each(JSON.parse(msg.responseText),function(key,value){
					if(key 	==	"exception"){
						$("#nameerrorshow1").show();
						$("#nameerrorshow1").text(value);
					}
				});
				
			}
		}
	});
}

function roleSettingsObj(id,action) {
	
	var generalSettObj 	= 	{
            "roleName": $("#rolename").val(),
            "employeeIDs": $("#roleusetmapping").val(),
            "type":1,
            "customRoleName": "",
            "roleType": ($("#roleshortname").val() !=	"" && $("#roleshortname").val() !=	null && $("#roleshortname").val() !=	undefined?$("#roleshortname").val():"Custom")
        };
	return generalSettObj;
}


$("#userdefaultroleadd").validate({
	submitHandler : function(form) {
		savedeafultRoleSettings();
	}
});

function defaultroleSettingsObj(id,action) {
	
	var generalSettObj 	= 	{
            "employeeIDs": $("#defaultroleusetmapping").val()
        };
	return generalSettObj;
}

function savedeafultRoleSettings() {
	
	var id	=	$("#userupdatedeafultroleid").val();
	var action	=	"edit";
	var methodType	=	"POST";
	
	var genObj 	= 	defaultroleSettingsObj(id,action);
	if (id != undefined && id != "") {
		genObj.roleId	=	id;
	}
	
	$.ajax({
		url : "/stratroom/user/assignRole",
		type : methodType,
		contentType : "application/json",
		data : JSON.stringify(genObj),
		success : function(data, status) {
			location.reload(true);
		},error:readErrorMsg
	});
}

$("#phoneNumber").on({
    keyup: function() {
    	formatCurrency($(this),"value");
    },keypress: function() {
    	formatCurrency($(this),"value");
    },
    blur: function() { 
    	formatCurrency($(this),"value", "blur");
    }
});

function UserRoleSettingsObj(id,action) {
	
	var generalSettObj 	= 	{
			"deptIds":$("#userroledepartment").val().join(','),
            "userRole": $("#userrolerole option:selected").text(),
            "roleId":$("#userrolerole").val(),
            "designation": $("#userroledesignation").val(),
            "status": $("#userrolestatus").val(),
            "phoneNumber": $("#userrolephone").val(),
            "emailAddress": $("#userroleemail").val(),
            "location": $("#userrolelocation").val(),
            //"department": $("#userroledepartment option:selected").map(function () {return $(this).text();}).get().join(','),
            "name": $("#userrolename1").val(),
			"userCategory" : $("#userrolecategory").val(),
			"userType" : $("#userroleType").val(),
			"userUniqId" : $("#userUniqId").val()
        };

		console.log(generalSettObj, "generalSettObj");

	/*var existdatadonotupdate 	=	["role","designation","status","phoneNumber","emailAddress","location","department","name"];
	if(action == "edit" && (controlupdateDescription !== undefined || controlupdateDescription != "")){
		$.each(controlupdateDescription,function(index,value){
			if($.inArray(index,existdatadonotupdate) == -1){
				generalSettObj[index]	=	value;
			}
		});
	}*/
	return generalSettObj;

	
}

function saveUserRoleSettings() {
	console.log(action, "actionData");
	var id	=	$("#userroleid").val();
	var action	=	"add";
	var methodType	=	"POST";
	if (id != undefined && id != "") {
		action 		= 	"edit";
		methodType	=	"PUT";
	}
	
	var genObj 	= 	UserRoleSettingsObj(id,action);
	console.log(genObj, "genObj");
	if (id != undefined && id != "") {
		genObj.userId	=	id;
		genObj.profileImage	=	$("#userprofileimage").val();
	}
	
	$.ajax({
		url : "/stratroom/userRole",
		type : methodType,
		contentType : "application/json",
		data : JSON.stringify(genObj),
		success : function(data, status) {
			location.reload(true);
		},
		error:function(msg,status){
			if(msg.status	==	400){
				if(!jQuery.isEmptyObject(msg.responseText)){
					$.each(JSON.parse(msg.responseText),function(key,value){
						if(key 	==	"exception"){
							$("#userroleemail").after('<span id="userroleemailval-error" class="error" for="userroleemailval" style="color:red;">'+value+'</span>');
						}
					});
				}
			}
		}
	});
}

var _URL1 = window.URL || window.webkitURL;
$(document).on('click','.edit1,.usericon',function(){
	var id	=	$(this).attr("data-id");
	$("#upload_file_"+id).trigger('click');
	var flag	=	false;
	$.ajax({
		url : "/stratroom/userRole/" + id,
		async:false,
		success : function(data){
			userinfodetails	=	data;
			flag	=	true;
		}
	});
	if(flag){
		$("#upload_file_"+id).unbind().change(function () {
			if ($(this).prop('files').length > 0 && !jQuery.isEmptyObject(userinfodetails)) {
				file = $(this).prop('files')[0];
				var flagimage	=	false;
				var sizeflagimage	=	false;
				if (file) {
			    	if(this.files[0].size > 500000){
			    		$.notify("User image should be within 5kb", {
			        		style: 'error',
			        		className: 'graynotify'
			        	});
			    		sizeflagimage	=	false;
			    		return false;
			    	}else{
			    		sizeflagimage	=	true;
			    	}
			    	
			        img = new Image();
			        img.onload = function() {
			        	if(this.width <= 30 && this.height <= 30){
			        		flagimage	=	true;
			        		if(sizeflagimage){
								converttobase64(file,id,function(result){
									uploadimagedata(id,result);
								});
							}
			        	}else{
			        		flagimage	=	false;
			        		$.notify("User image dimension upto 30x30", {
				        		style: 'error',
				        		className: 'graynotify'
				        	});
			        	}
			        };
			        img.onerror = function() {
			        	$.notify("User image is invalid kindly retry", {
			        		style: 'error',
			        		className: 'graynotify'
			        	});
			        };
			        img.src = _URL1.createObjectURL(file);
			    }
			}
		});
	}
});

function resetloginvalue(msg){
	//$("#login_logo").val('');
	//$("#login_logo").attr('src','');
	$.notify(msg, {
		style: 'error',
		className: 'graynotify'
	});
}

function converttobase64(element,id, callback) {
	  var result = "";
	  var file = element;
	  
	  if (typeof(file) == 'undefined') return;
	
	  var reader = new FileReader();
	
	  reader.onloadend = function() {
		  $("#upload_link_image_"+id).attr("src",reader.result);
		  result = reader.result;
		  callback(result);
	  }
	
	  reader.readAsDataURL(file);
}

function uploadimagedata(id,result){
	
	if(!jQuery.isEmptyObject(userinfodetails)) {
		var generalSettObj 	= 	{
	    		"userId":userinfodetails.userId,
				"deptId":userinfodetails.deptId,
	            "userRole": userinfodetails.userRole,
	            "designation": userinfodetails.designation,
	            "status": userinfodetails.status,
	            "phoneNumber": userinfodetails.phoneNumber,
	            "emailAddress": userinfodetails.emailAddress,
	            "location": userinfodetails.location,
	            "department": userinfodetails.department,
	            "name": userinfodetails.name,
	            "profileImage":result,
				"userCategory" : $("#userrolecategory").val(),
				"userType" : $("#userroleType").val(),
				"userUniqId" : $("#userUniqId").val(),
	        };

		$.ajax({
			url : "/stratroom/userRole",
			type : "PUT",
			contentType : "application/json",
			data : JSON.stringify(generalSettObj),
			success : function(data, status) {
				location.reload(true);
			},error:readErrorMsg
		});
	}
}

$(document).on('keydown', function(event) {
    if (event.key == "Escape") {
    	if($("#filter").is(":visible")){
    		$("#filter").modal("hide");
    		getAccesscontrolList();
    	}
    }
});

$(".closefilter").click(function(){
	if($("#myInput").val()){
		if(viewpermission){
			getAccesscontrolList();
		}
	}
	$(".userdownloadlink").attr("href","/stratroom/downloadUserRole");
	$("#myInput").val('');
});

$(".applyfilter").click(function(){
	
	var url	=	"/stratroom/findByUser";
	var filterdepartment	=	$(".filterdepartment").val();
	var filterrolelist		=	$(".filterrolelist").val();
	var action			=	$("#filterstatus").val();
	if((filterdepartment !=	"" && filterdepartment	!=	undefined) && (filterrolelist !=	"" && filterrolelist	!=	undefined) && (action !=	"" && action	!=	undefined)){
		url	=	url+"?deptId="+filterdepartment+"&status="+action+"&role="+filterrolelist;	
	}else if((filterdepartment !=	"" && filterdepartment	!=	undefined) && (filterrolelist !=	"" && filterrolelist	!=	undefined) && (action ==	null  || action ==	"" || action	==	undefined)){
		url	=	url+"?deptId="+filterdepartment+"&status=&role="+filterrolelist;
	}else if((filterdepartment !=	"" && filterdepartment	!=	undefined) && (filterrolelist ==	"" || filterrolelist	==	undefined || filterrolelist	==	null) && (action !=	""  && action !=	undefined)){
		url	=	url+"?deptId="+filterdepartment+"&status="+action+"&role=";
	}else if((filterdepartment ==	"" || filterdepartment	==	undefined || filterdepartment	==	null) && (filterrolelist !=	"" && filterrolelist	!=	undefined) && (action !=	""  && action !=	undefined)){
		url	=	url+"?deptId=&status="+action+"&role="+filterrolelist;
	}else if((filterdepartment ==	"" || filterdepartment	==	undefined || filterdepartment	==	null) && (filterrolelist ==	"" || filterrolelist	==	undefined) && (action !=	""  && action !=	undefined)){
		url	=	url+"?deptId=&status="+action+"&role=";
	}else if((filterdepartment !=	"" && filterdepartment	!=	undefined) && (filterrolelist ==	"" || filterrolelist	==	undefined) && (action ==	null  || action ==	"" || action	==	undefined)){
		url	=	url+"?deptId="+filterdepartment+"&action=&role=";
	}else if((filterdepartment ==	"" || filterdepartment	==	undefined) && (filterrolelist !=	"" && filterrolelist	!=	undefined) && (action ==	null  || action ==	"" || action	==	undefined)){
		url	=	url+"?deptId=&status=&filterrolelistBy="+filterrolelist;
	}else{
		url	=	url+"?deptId=&status=&role=";
	}
	
	$.ajax({
		url:url,
		type:"GET",
		success:function(response){
			$("#filter").modal('hide')
			UserRoleListShow(response,'filter');
		}
	});
});

var userimportfile;

function readFile(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		file = input.files[0];
		console.log(file, "fileData");
		reader.onload = function () {
			var htmlPreview =
				'<div class="box-body-border">' +
				'<img width="20" src="images/file-icon.png"/>' +
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
	$("#fileerrorshow").html("");
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

$(document).on("change", "#importfile", function (e) {
	e.preventDefault();
	$("#uploaderror").css("display", "none");
	var formdata = new FormData();
	var element = $("#importfile");
	var url	=	"/stratroom/createBulkUser";
	if (element.prop('files').length > 0) {
		userimportfile = element.prop('files')[0];
		formdata.append("userdata", userimportfile);
	}
	
	if (element.prop('files').length == 0) {
		$("#uploaderror").css("display", "block");
		return false;
	}
	$(".page-loader-wrapper").css("display", "block");
	$.ajax({
		url: url,
		type: "POST",
		data: formdata,
		processData: false,
		contentType: false,
		success: function (data, status) {
			$(".fileuploadclose").trigger('click');
			$(".page-loader-wrapper").css("display", "none");
			/*setTimeout(function () {
				location.reload(true);
			}, 3000);*/

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
					$.notify("Error:" + errorparse.exception,{
					  style: 'error',
					  className: 'graynotify'
					});
				}
			}
		}
	});

});



$(document).on('click', '#next-btn-1', function() {
	console.log("function clicked");
	$("#fileerrorshow").html("");
	$(".uploadvalidationSuccess").empty();		 
	var Url ='createBulkUser?type=validation';
	$("#file-upload").hide();
	$("#lineS").hide();
	$("#lineD").hide();
	$("#file-upload").hide();				
	$("#file-validate").hide();
	$("#file-save").hide();
	$(".form-progressbar li:nth-child(2)").addClass("active");
	var formdata = new FormData();
	var	userupfile	=	$("#importfile").val();
	$(".page-loader-wrapper").css("display", "block");
	formdata.append("userdata", userimportfile);
	
	if(userimportfile){								
		$.ajax({
			url: Url,
			type: "POST",
			data: formdata,
			processData: false,
			contentType: false,
			success: function (data, status) {			
				UserUploadNotFoundData(data,data.parsingError);
				$(".page-loader-wrapper").css("display", "none");		
			},error:function(msg,status){
				$(this).val('');
				$(".page-loader-wrapper").css("display","none");
				if(!jQuery.isEmptyObject(msg.responseText)){
					var errorparse	=	JSON.parse(msg.responseText);
					if(errorparse.status 	==	"404"){
						$.notify("Error:"+errorparse.exception, {
								  style: 'error',
								  className: 'graynotify'
								});
					}else{
						$.notify("Error:"+errorparse.exception, {
								  style: 'error',
								  className: 'graynotify'
								});
					}
				}
			},
		});
			
	
	} else {
			$("#fileerrorshow").append('Please select upload file');
			$("#fileerrorshow").show();
			$(".page-loader-wrapper").css("display", "none");
			$("#file-upload").show();		
			$("#file-validate").hide();
			$("#file-validate1").hide();
			$("#file-save").hide();
			$(".form-progressbar li:nth-child(1)").removeClass("active");
			$(".form-progressbar li:nth-child(2)").removeClass("active");
			$("#lineS").show();
			$("#lineD").show();
	}
	
});




$(document).on('click', '#next-btn-2', function() {	
	$(".uploadStatististics").empty();
	$("#file-upload").hide();		
	$("#file-validate").hide();
	$("#file-next-btn").hide();
	$("#file-validate1").hide();
	$("#file-save").hide();
	$(".form-progressbar li:nth-child(3)").addClass("active");
	var formdata = new FormData();
	var	userupfile	=	$("#importfile").val();
	$(".page-loader-wrapper").css("display", "block");
	formdata.append("userdata", userimportfile);
	var url = "/stratroom/createBulkUser?type=save";
	$.ajax({
		url:url ,
		type: "POST",
		data: formdata,
		processData: false,
		contentType: false,
		success: function (data, status) {
			$(".page-loader-wrapper").css("display", "none");
			UploadSuccess(data);
		}
	});
});


$(document).on('click', '#prev-btn1', function() {					
	$("#file-upload").show();				
	$("#file-validate").hide();
	$("#file-save").hide();
	$(".form-progressbar li:nth-child(2)").removeClass("active");
	$("#lineS").show();
	$("#lineD").show();
});

$("#prev-btnone").click(function () {
console.log("Prev button clicked");
$("#file-upload").removeAttr("style");
  $("#file-upload").show();
  $("#file-next-btn").hide();
  $("#file-validate").hide();
  $("#file-save").hide();
  $(".form-progressbar li:nth-child(1)").removeClass("active");
});

$("#prev-btnerror").click(function () {
console.log("Prev button clicked");
$("#file-upload").removeAttr("style");
  $("#file-upload").show();
  $("#file-next-btn").hide();
  $("#file-validate").hide();
  $("#file-save").hide();
  $(".form-progressbar li:nth-child(1)").removeClass("active");
});


$(document).on('click', '#prev-btn2', function() {		
	$(".uploadStatististics").empty();
	$("#statisticmessage").html("");
	$("#file-upload").show();	
	$("#file-next-btn").hide();			
	$("#file-validate").hide();
	$("#file-save").hide();
	$(".error-div").hide();
	$("#imagevalidate1").attr("src","images/Success.png");	
	$("#file-save").hide();
	$(".form-progressbar li:nth-child(3)").removeClass("active");
});


function UserUploadNotFoundData(data,result) {
	console.log(data, result, "dataResult");


	var orgstructure_import_error;
	var validateImport;
	$("#validateImportHide").empty();
	$.each(result, function (i, List) {
		orgstructure_import_error = '<tr>' +
			'<td style="width: 200px; text-align: center;">' + List.rowNo + '</td>' +
			'<td style="width: 300px; text-align: center;">' + (List.columnName !=	undefined?List.columnName:"") + '</td>' +
			'<td style="width: 300px; text-align: center;">' + List.error + '</td>' +
			'</tr>';
		$(".uploadvalidationSuccess").append(orgstructure_import_error);
	});
	if(data.result	==	"Not-Success"){
		$("#file-validate").show();
        $("#file-save").hide();


		 const errorRows = result && result.length > 0 
                ? result.map(error => 
                    `<tr>
                        <td style="width: 150px">${error.rowNo}</td>
                        <td>${error.error}</td>
                    </tr>`
                  ).join('')
                : `<tr><td colspan="2">No specific errors reported</td></tr>`;

        $(".error-table tbody").html(errorRows);
        // $("#next-btn-2").prop("disabled", true);
	}
	if(data.result	==	"success" || data.result	==	"Success"){
		 console.log(data, "data result success");
            $("#file-next-btn").show();  
            $("#file-save").hide();        
            $("#file-validate").hide();
            $("#file-upload").hide();
			// $("#next-btn-2").show();
	}
	if (jQuery.isEmptyObject(data)) {
		$(".error-div").hide();
		$("#imagevalidate1").attr("src","images/Not-Verified.png");
		
		validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
		'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
	}
	$("#validateImportHide").append(validateImport);
	$("#file-upload").hide();				
}

// function UploadSuccess(data) {
// 	$(".error-div").show();
// 	$("#imagevalidate").attr("src","images/Success.png");
// 	if(data.no_of_processed != undefined){
// 		uploadSuccessStatistics('No_of_Processed',data.no_of_processed);
// 	}else{
// 		uploadSuccessStatistics('No_of_Processed',0);
// 	}
// 	if(data.no_of_processed != undefined){
// 		uploadSuccessStatistics('No_of_Failed',data.no_of_failed);
// 	}else{
// 		uploadSuccessStatistics('No_of_Failed',0);	
// 	}			
// }


function UploadSuccess(data) {
    $("#file-validate").hide();
    $("#file-next-btn").hide();
    console.log(data, "data");
    if (!jQuery.isEmptyObject(data)) {
        if (data.result == "Not-Success") {
           
            $("#file-validate").show();
            $("#file-save").hide();

            $("#file-validate .img-center img").attr("src", "/stratroom/images/not-verified.png");

            const errorRows = result && result.length > 0 
                ? result.map(error => 
                    `<tr>
                        <td style="width: 150px">${error.rowNo}</td>
                        <td>${error.error}</td>
                    </tr>`
                  ).join('')
                : `<tr><td colspan="2">No specific errors reported</td></tr>`;

            $(".error-table tbody").html(errorRows);
            // $("#next-btn-2").prop("disabled", true);

        } else if (data.result.toLowerCase() == "success") {
          console.log(data, "data result success");
          
            $("#file-next-btn").hide();  
            $("#file-save").show();        
            $("#file-validate").hide();
            $("#file-upload").hide();
            $("#file-save .img-center img").attr("src", "/stratroom/images/success.png");   
        }
    } else {
      
        $("#file-validate").show();
        $("#file-save").hide();
        $("#file-validate .img-center img").attr("src", "/stratroom/images/not-verified.png");
        $(".error-table tbody").html(`<tr><td colspan="2">No validation data received</td></tr>`);
        // $("#next-btn-2").prop("disabled", true);
    }
}

function uploadSuccessStatistics(staticsvalue,fnresult) {
	var upload_Statistics = '<tr>' +
	'<td style="width: 300px; text-align: left;">'+staticsvalue+'</td>' +
	'<td style="width: 300px; text-align: center;">' +fnresult+ '</td>' +	
	'</tr>';
	$(".uploadStatististics").append(upload_Statistics);
}


$(document).on('click', '#done-btn', function() {					
	location.reload(true);
});

$(document).on('click',".close",function () {
	$(".box-body").empty();
	$("#fileerrorshow").html("");
	$("#statisticmessage").html("");
	$("#categoryerrorshow").html("");
	$("#file-upload").show();			
	$("#file-validate").hide();
	$("#file-validate1").hide();
	$("#file-save").hide();
	$("#lineS").show();
	$("#lineD").show();
	$(".form-progressbar li:nth-child(1)").removeClass("active");
	$(".form-progressbar li:nth-child(2)").removeClass("active");
	$(".form-progressbar li:nth-child(3)").removeClass("active");
});
$('.modal-dialog').draggable({
    handle: ".modal-header"
});

$('#userroleemail').on('keypress', function(e) {
    if (e.which == 32){
        return false;
    }
});

$("#userrolephone").on({
    keyup: function() {
    	formatCurrency($(this),"value");
    },keypress: function() {
    	formatCurrency($(this),"value");
    },
    blur: function() { 
    	formatCurrency($(this),"value", "blur");
    }
});

$('#myInput').on('keyup', function(e) {
	
	// Search text
	   var text = $(this).val().toLowerCase();
	   // Hide all content class element
	   $('.divbox').hide(); 
	   $('.divbox .emailsearch,.divbox .departmentsearch,.divbox .rolesearch').each(function(){
		   if($(this).text().toLowerCase().indexOf(""+text+"") != -1 ){
			   $(this).closest('.divbox').show();
		   }
	   });
	   $(".userdownloadlink").attr("href","/stratroom/downloadUserRole?name="+$(this).val());
});


//Language changes wrokflow

const page_userrole_ar = {
    "user_management": {
		"Do you really want to delete?": "هل تريد حقًا الحذف؟",
		"Add User": "إضافة مستخدم",
		"permission": "إذن",
		"title": "المستخدمون والأذونات",
        "User": "مستخدم",
        "Add": "إضافة",
        "Email": "البريد الإلكتروني",
        "Name": "الاسم",
        "Department": "القسم",
        "Designation": "المسمى الوظيفي",
        "Role": "الدور",
        "Location": "الموقع",
        "Phone no": "رقم الهاتف",
        "Status": "الحالة",
        "Active": "نشط",
        "In active": "غير نشط",
        "Cancel": "إلغاء",
        "Import": "استيراد",
        "Export": "تصدير",
        "Filter": "تصفية",
        "Customer Role Name": "اسم دور العميل",
        "Role Type": "نوع الدور",
        "Admin": "مسؤول",
        "Owner": "المالك",
        "Save": "حفظ",
        "Default Customer Roles": "الأدوار الافتراضية للعملاء",
        "Super User": "مستخدم متميز",
        "Edit": "تعديل",
        "Custom Role": "دور مخصص",
        "Custom Role Name": "اسم الدور المخصص"
    }
}

const page_userrole_en = {
    "user_management": {
	
		"Delete": "Delete",
		"Do you really want to delete?": "Do you really want to delete?",
		"Add User": "Add User",
		"permission": "Permission",
		"title": "Users & Permissions",
        "User": "User",
        "Add": "Add",
        "Email": "Email",
        "Name": "Name",
        "Department": "Department",
        "Designation": "Designation",
        "Role": "Role",
        "Location": "Location",
        "Phone no": "Phone no",
        "Status": "Status",
        "Active": "Active",
        "In active": "In active",
        "Cancel": "Cancel",
        "Import": "Import",
        "Export": "Export",
        "Filter": "Filter",
        "Customer Role Name": "Customer Role Name",
        "Role Type": "Role Type",
        "Admin": "Admin",
        "Owner": "Owner",
        "Save": "Save",
        "Default Customer Roles": "Default Customer Roles",
        "Super User": "Super User",
        "Edit": "Edit",
        "Custom Role": "Custom Role",
        "Custom Role Name": "Custom Role Name"
    }
}

const page_userrole_am = {
    "user_management": {
        "Delete": "ሰርዝ",
        "Do you really want to delete?": "በእውነት መሰረዝ ትፈልጋለህ?",
        "Add User": "ተጠቃሚ ጨምር",
        "permission": "ፍቃድ",
        "title": "ተጠቃሚዎች እና ፍቃዶች",
        "User": "ተጠቃሚ",
        "Add": "ጨምር",
        "Email": "ኢሜይል",
        "Name": "ስም",
        "Department": "ዳርቻ / ክፍል",
        "Designation": "የስራ መደብ",
        "Role": "ሚና",
        "Location": "አካባቢ",
        "Phone no": "ስልክ ቁጥር",
        "Status": "ሁኔታ",
        "Active": "ንቁ",
        "In active": "ያልተነቃ",
        "Cancel": "ይቅር",
        "Import": "አስመጣ",
        "Export": "አውጣ",
        "Filter": "ማጣሪያ",
        "Customer Role Name": "የደንበኛ ሚና ስም",
        "Role Type": "የሚና አይነት",
        "Admin": "አስተዳዳሪ",
        "Owner": "ባለቤት",
        "Save": "አስቀምጥ",
        "Default Customer Roles": "የነባር የደንበኛ ሚናዎች",
        "Super User": "ከፍተኛ ተጠቃሚ",
        "Edit": "አርትዕ",
        "Custom Role": "ብጁ ሚና",
        "Custom Role Name": "የብጁ ሚና ስም"
    }
}


function getNestedValue(obj, path) {
  return path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : null, obj);
}

// Load language for all elements with data-translate
function loadLanguage(lang) {
	console.log(lang, "selected language");
  let translation;

  if (lang == 'ar') {
    translation = page_userrole_ar;
  } else if(lang == "am") { 
	translation = page_userrole_am;
  }else {
    translation = page_userrole_en;
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


$(document).ready(function () {
  const userTypeOptions = {
    internal: [
      { value: "employees", text: "Employees" }
    ],
    external: [
      { value: "vendor", text: "Vendor" },
      { value: "independent_director", text: "Independent Director" },
      { value: "non_executive_director", text: "Non Executive Director" },
      { value: "external_auditor", text: "External Auditor" }
    ]
  };

  function updateUserTypes() {
    const category = $("#userrolecategory").val();
    const $type = $("#userroleType");

    $type.empty();

    $.each(userTypeOptions[category], function (_, item) {
      $type.append(
        $("<option></option>").val(item.value).text(item.text)
      );
    });
  }

  updateUserTypes();
  $("#userrolecategory").on("change", updateUserTypes);
});
