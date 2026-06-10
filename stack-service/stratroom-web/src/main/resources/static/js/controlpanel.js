var currentEmp		=	$("#userPrincipal").val();
var siteLanguageData = localStorage.getItem("selectedLang") || "en";
var controlupdateDescription	=	[];
var securitycontrolupdateDescription	=	[];
var themecontrolupdateDescription	=	[];
var commoncontrolupdateDescription	=	[];
var customsettingupdateDescription	=	{"generalSettingValue":{"customObjective":false,
		"aggregationType":"", "yearToDate": false,"threshold1Color":"","threshold2Color":"","threshold3Color":"", "threshold4Color": "","threshold5Color": "","customPerspective": false,
		"aggregation": false, "threshold": "","performance": false,"customPerformance": false,"derivation": "","threshold1": "","customKPI": false,"threshold2": "","threshold3": "",
		"datatableactual":false,"datatabletarget":false,"datatablegap":false,"datatableytd":false,"datatableannualtarget":false,"threshold4": "","threshold5": "",
		"drilltableactual":false,"drilltabletarget":false,"drilltablegap":false,"scorecardactual":false,"scorecardtarget":false,
		"scorecardbudget":false,"scorecardforecast":false,"scorecardscore":false,"scorecardtrend":false,"scorecardrisk":false,"submeasurerequired":false,"statusrequired":true,"scorerequired":true,
		"kpistatus":true,"objectivestatus":true,"perspectivestatus":true,"perspectivestatus":true,
		"kpiscore":true,"objectivescore":true,"perspectivescore":true,"perspectivescore":true,"scorecardscoreper":true}};

var risksettingupdateDescription={
	"risksetting":{
		"cousecategory": false,
		"controlbtn": true,
		"riskresidual": false,
		"riskresidualscore": false,
		"cause_input": true,
		"ImpactDescription": false,
		"riskderivations": false,
		"riskinherentscore": true,
		"riskiso": true,
		"riskpersonincharge": false,
		"riskcategory": true,
		"riskrelatedparties": true,
		"Consequence_input": false,
		"effectivenessbtn": true,
		"possibleeve": true,
		"riskothers": false,
		"actionbtn": false,
		"couserating": true,
		"riskcustomscore": true,
		"riskinformationasset": true,
		"riskpos": false,
		"possibilitydescription": true,
		"cause-select":"",
		"category-select":"",
		"consequence-select":"",
		"possible-select" :"",
		"reducingimpact-select":"",
		"rating-select":"",
		"reducingpossibility-select":"",
		"riskcategory-select":"",
		"controltypes-select":"",
		"controleffectiveness-select":"",
		"action-select":"",
		"inherentriskscore-select":"",
		"residualriskscore-select":"",
		"residualscorepossibility":false,
		"residualscoreimpact":false,
		"inherentscorecause":false,
		"inherentscoreconv":false
	}
}

var customsettingsresponse	=	{};		
var pageNo =  $('#pagenumber').val();
var createpermission	=	false;
var editpermission		=	false;
var deletepermission	=	false;
var viewpermission		=	false;
var controlloadcontent	=	false;
var themecolor			=	"#3a6596";
var currencylist 		= 	{};
var restorePathList 	= 	{};

var generalview			=	false;
var generaledit			=	false;

var notificationview	=	false;
var notificationedit	=	false;

var licenseview			=	false;
var deviceview			=	false;
var schedulerview		=	false;
var themeview			=	false;
var themeedit			=	false;

var securityview		=	false;
var securityedit		=	false;

var backupview			=	false;
var backupedit			=	false;

var scorecardview		=	false;
var scorecardedit		=	false;


var riskview			=	false;
var riskcardedit		=	false;
var financialmonthnames	=	{'Jan':'01','Feb':'02','Mar':'03','Apr':'04','May':'05',
	'Jun':'06','Jul':'07','Aug':'08','Sep':'09','Oct':'10','Nov':'11','Dec':'12'};
	
if($("#userrolename").val()	==	"Super User" || $("#userrolename").val()	==	"Admin"){
	if($("#userPrincipal").val()	!= $("#userPrincipalnavigate").val()){
		//$(".subusermenuname").text('Control Panel');
		if($(".topmenubreadcrumb").length){
			$(".topmenubreadcrumb").show();
		}
		if($(".sidebarNavigate").length){
			$(".sidebarNavigate").show();
		}
	}
}

$(function () {
	console.log("function Clicked");
	getuserpermission();
	
	for(var i=1;i<=31;i++){
		$(".openform,.closeform").append('<option>'+i+'</option>')
	}
	
	if(jQuery.inArray("Create", controlpanelPermission) !== -1){
		createpermission	=	true;
	}
	
	if(jQuery.inArray("Update", controlpanelPermission) !== -1){
		editpermission	=	true;
	}
	
	if(jQuery.inArray("Delete", controlpanelPermission) !== -1){
		deletepermission	=	true;
	}
	
	if(jQuery.inArray("View", controlpanelPermission) !== -1){
		viewpermission	=	true;
	}
	
	if(createpermission	==	false){
		// $(".creategroupicon").css("display","none");
	}
	
	if(enableaccesscontrolMenu	==	true){
		createpermission	=	true;
		editpermission		=	true;
		deletepermission	=	true;
		viewpermission		=	true;
		// $(".creategroupicon").css("display","block");
	}
	
	if(createpermission == true || editpermission == true || deletepermission == true || viewpermission == true){
		controlloadcontent	=	true;
	}
	
	if(controlloadcontent	==	false){
		$(".panel-tab-menu,.panel-tab").remove();
		return false;
	}
	
	/*if(editpermission	==	false && createpermission	==	false){
	 	$("#generalsettingForm :input").prop("disabled", true);
		$(".initative_save_btn").not(".opennextbtn").attr("disabled",true);
		$("#login_logo,#backupduration,#restore_logo,#browse_logo").attr("disabled",true);
		$("#application_logo").attr("disabled",true);
		$(".notificationonoff,.devicechange").attr("disabled",true);
		$("button[type='submit']").hide();
		$(".initative_save_btn,#cancel_btn1").not('.opennextbtn').hide();
		$(".panel-tab :input").not(".opennextbtn").prop("disabled", true);
		$("input[name='browse_logo']").prop("disabled", true);
	}*/
	
	var controlpaneltype	=	localStorage.getItem("controlpaneltype");
	if(controlpaneltype	==	null	|| 	controlpaneltype	==	""){
		localStorage.setItem("controlpaneltype","general");
		controlpaneltype	=	"general";
	}
	
	$("."+controlpaneltype+"control").addClass("active");
	$("#"+controlpaneltype+"control").addClass("active");
    getControlPanelList(controlpaneltype);
    
});

function getuserpermission(){
	const storedLanguage = localStorage.getItem("selectedLang") || "en";
	loadLanguage(storedLanguage);
	$.ajax({
		type : "GET",
		url : "/stratroom/user/modulePermissions?moduleName=Control Panel",
		async:false,
		success : function(data) {
			$.each(data,function(forindex,fordata){
				if(forindex	==	"Control Panel"){
					
					if(fordata.General.privilegeView !=	undefined && fordata.General.privilegeView == "TRUE"){
						generalview	=	true;
					}
					if(fordata.General.privilegeUpdate !=	undefined && fordata.General.privilegeUpdate == "TRUE"){
						generaledit	=	true;
					}
					if(fordata.Notifications.privilegeView !=	undefined && fordata.Notifications.privilegeView == "TRUE"){
						notificationview	=	true;
					}
					if(fordata.Notifications.privilegeUpdate !=	undefined && fordata.Notifications.privilegeUpdate == "TRUE"){
						notificationedit	=	true;
					}
					if(fordata.Licence.privilegeView !=	undefined && fordata.Licence.privilegeView == "TRUE"){
						licenseview	=	true;
					}
					if(fordata.Device.privilegeView !=	undefined && fordata.Device.privilegeView == "TRUE"){
						deviceview	=	true;
					}
					if(fordata.Scheduler.privilegeView !=	undefined && fordata.Scheduler.privilegeView == "TRUE"){
						schedulerview	=	true;
					}
					if(fordata.Theme.privilegeView !=	undefined && fordata.Theme.privilegeView == "TRUE"){
						themeview	=	true;
					}
					if(fordata.Theme.privilegeUpdate !=	undefined && fordata.Theme.privilegeUpdate == "TRUE"){
						themeedit	=	true;
					}
					
					if(fordata.Scorecard.privilegeView !=	undefined && fordata.Scorecard.privilegeView == "TRUE"){
						scorecardview	=	true;
					}
					if(fordata.Risk.privilegeView !=	undefined && fordata.Risk.privilegeView == "TRUE"){
						riskview	=	true;
					}

					if(fordata.Scorecard.privilegeUpdate !=	undefined && fordata.Scorecard.privilegeUpdate == "TRUE"){
						scorecardedit	=	true;
					}

					if(fordata.Risk.privilegeUpdate !=	undefined && fordata.Risk.privilegeUpdate == "TRUE"){
						riskcardedit	=	true;
					}
					if(fordata.Security.privilegeView !=	undefined && fordata.Security.privilegeView == "TRUE"){
						securityview	=	true;
					}
					if(fordata.Security.privilegeUpdate !=	undefined && fordata.Security.privilegeUpdate == "TRUE"){
						securityedit	=	true;
					}
					$.each(fordata,function(forindex1,fordata1){
						if(forindex1	==	"Backup & Restore"){
							if(fordata1.privilegeView !=	undefined && fordata1.privilegeView == "TRUE"){
								backupview	=	true;
							}
							if(fordata1.privilegeUpdate !=	undefined && fordata1.privilegeUpdate == "TRUE"){
								backupedit	=	true;
							}
						}
					});	
					
					/*if(fordata.Role.privilegeCreate !=	undefined && fordata.Role.privilegeCreate == "TRUE"){	
						rolecreatepermission	=	true;
					}
					if(fordata.Role.privilegeUpdate !=	undefined && fordata.Role.privilegeUpdate == "TRUE"){	
						roleeditpermission	=	true;
					}
					if(fordata.Role.privilegeDelete !=	undefined && fordata.Role.privilegeDelete == "TRUE"){	
						roledeletepermission	=	true;
					}*/
				}
			});
		}
	});
}

function showrestroePath() {
	$.ajax({
		type: "GET",
		url:"/stratroom/restorePath",
		async:false,		
		success: function (data) {
		$.each(data,function(i,value){               
			var div_data="<option value="+value+">"+value+"</option>";
		 	$(div_data).appendTo('#restorePath'); 
		});  
		}
	});
}

function populateRestorePath(elementId) {
	var numberOfOptions = $(elementId + ' > option').length;

	if (jQuery.isEmptyObject(restorePathList)) {
		$.ajax({
			url : "/stratroom/restorePath",
			async:false,
			success : function(pathlist) {
				$.each(pathlist, function(index, restorePath) {
					addOption(elementId, restorePath, restorePath)
				});
			}
		});
	} else if (numberOfOptions < 2) {
		$.each(restorePathList, function(index, restorePath) {
			addOption(elementId, restorePath, restorePath)
		});
	}
}

function controlPanelEvent(controlpaneltype) {
	localStorage.setItem("controlpaneltype",controlpaneltype);
	getControlPanelList(controlpaneltype);
}

function populateCurrencyList(elementId) {
	var numberOfOptions = $(elementId + ' > option').length;

	if (jQuery.isEmptyObject(currencylist)) {
		$.ajax({
			url : "/stratroom/currencyList",
			async:false,
			success : function(employeeList) {
				reporteelist = employeeList;
				$.each(employeeList, function(index, reportee) {
					addOption(elementId, reportee.currencyName, reportee.currencySymbol)
				});
			}
		});
	} else if (numberOfOptions < 2) {
		$.each(currencylist, function(index, reportee) {
			addOption(elementId, reportee.currencyName, reportee.currencySymbol)
		});
	}
}

function addOption(id, text, value,type) {
	if(type	==	"dept"){
		$(id).append(`<option data-deptid="${value}" value="${value}">${text}</option>`);
	}else{
		$(id).append(`<option value="${value}">${text}</option>`);
	}
	
}

function departmentlist(elementId){
	$(elementId).empty();	
	$.ajax({
		url : "/stratroom/allDepartmentList",
		async:false,
		success : function(data, status) {
			$.each(data, function (index, reportee) {
				addOption(elementId, reportee.name, reportee.id,'dept')
			});
		}
	});
}

function getControlPanelList(controlpaneltype) {
	
	var pagenourl	=	"";
	if(controlpaneltype	==	undefined && controlpaneltype	==	""){
		return false;
	}
	
	if(controlpaneltype	==	"general"){
		pagenourl	=	"/stratroom/generalSettingList";
		// $("#settingcurrency").empty();
		// $("#settingcurrency").append('<option selected value="">Select
		// currency</option>');
		populateCurrencyList('#generalsettingForm #settingcurrency');
		//departmentlist('#generalsettingForm #dept');		
	}else if(controlpaneltype	==	"theme"){
		pagenourl	=	"/stratroom/themeList";	
	}else if(controlpaneltype	==	"license"){
		pagenourl	=	"/stratroom/user/licenseDetails";	
	}else if(controlpaneltype	==	"security"){
		pagenourl	=	"/stratroom/controlPanelSecurityList";	
	}else if(controlpaneltype	==	"notification"){
		pagenourl	=	"/stratroom/generalSettingList";	
	}else if(controlpaneltype	==	"scheduler"){
		pagenourl	=	"/stratroom/generalSettingList";	
	}else if(controlpaneltype	==	"device"){
		pagenourl	=	"/stratroom/user/licenseDetails";	
	}else if(controlpaneltype	==	"backup"){
		pagenourl	=	"/stratroom/generalSettingList";	
	}else if(controlpaneltype	==	"scorecardsettings"){
		pagenourl	=	"/stratroom/customPerformance/details";	
	}else if(controlpaneltype	==	"risksettings"){
		pagenourl	=	"/stratroom/customPerformance/riskdetails";	
	}
	if(pagenourl	==	""){
		return false;
	}
	
	
    $.ajax({
        url: pagenourl,
        type: "GET",
        contentType: "application/json",
        success: function (response, status) {
        	if(controlpaneltype	==	"general"){
				console.log(response, "response");
        		controlupdateDescription	=	response;
				GeneralcontrolListShow(response);
				
				$('#dept').select2({
				    tags: true,
				    tokenSeparators: [","],
				    createTag: function (tag) {
				        return {
				            id: tag.term,
				            text: tag.term,
				            isNew : true
				        };
				    }
				}).on("select2:select", function(e) {
				    if(e.params.data.isNew){
				        $(this).find('[value="'+e.params.data.id+'"]').replaceWith('<option data-deptid="" selected value="'+e.params.data.id+'">'+e.params.data.text+'</option>');
				        var text	=	e.params.data.text.trim();
				        if(text !=	""){
					        $.ajax({
					    		type: "POST",
					    		url:"/stratroom/departmentDetails",
					    		async:false,
					    		contentType : "application/json",
								data : JSON.stringify({"name":text,"status":"Active"}),
					    		success: function (data) {
					    			if(data.departmentList !=	undefined && !jQuery.isEmptyObject(data.departmentList)){
					    				var newdept	=	data.departmentList;	
					    				for(i = 0;i<=newdept.length;i++){
					    					var namecheck	=	newdept[i];	
					    					if(namecheck.name	==	text){
					    						$("#dept option:selected").val(namecheck.id);
					    						$("#dept option:selected").attr("data-deptid",namecheck.id);
					    						break;
					    					}
					    				}
					    			}
					    			//$("#dept").trigger("change");
					    		}
					    	});
				        }
				    }
				});
				
			}else if(controlpaneltype	==	"theme"){
				ThemecontrolListShow(response);
			}else if(controlpaneltype	==	"license"){
				LicensecontrolListShow(response);
			}else if(controlpaneltype	==	"security"){
				securitycontrolupdateDescription	=	response;	
				SecuritycontrolListShow(response);
			}else if(controlpaneltype	==	"notification"){
				commoncontrolupdateDescription	=	response;
				NotificationcontrolListShow(response);
			}else if(controlpaneltype	==	"scheduler"){
				commoncontrolupdateDescription	=	response;	
				SchedulercontrolListShow(response);
			}else if(controlpaneltype	==	"device"){
				commoncontrolupdateDescription	=	response;	
				DevicecontrolListShow(response);
			}else if(controlpaneltype	==	"backup"){			
				commoncontrolupdateDescription	=	response;	
				BackupcontrolListShow(response);
				$('#restorePath').empty();
				if(response.generalSettingValue.restoreStatus != undefined && response.generalSettingValue.restoreStatus == true){
					populateRestorePath('#restorePath');
				}						
			}else if(controlpaneltype	==	"scorecardsettings"){
				ScorecardListShow(response);
			}else if(controlpaneltype	==	"risksettings"){
				risklistshow(response);
			}
			
        },
        error:function(){
 
		if(editpermission ==	true || createpermission == true){
			const pickr1 = new Pickr({
		        el: $("#scorecardsettingscontrol .cus_perfor_sow .optioncolor1")[0],
		        useAsButton: true,
		        theme: 'classic',
				default: "rgb(255 0 0)",
		        defaultRepresentation: 'HEX',
		        comparison: false,
		        swatches: [
		            'rgba(244, 67, 54, 1)',
		            'rgba(233, 30, 99, 0.95)',
		            'rgba(156, 39, 176, 0.9)',
		            'rgba(103, 58, 183, 0.85)',
		            'rgba(63, 81, 181, 0.8)',
		            'rgba(33, 150, 243, 0.75)',
		            'rgba(3, 169, 244, 0.7)',
		            'rgba(0, 188, 212, 0.7)',
		            'rgba(0, 150, 136, 0.75)',
		            'rgba(76, 175, 80, 0.8)',
		            'rgba(139, 195, 74, 0.85)',
		            'rgba(205, 220, 57, 0.9)',
		            'rgba(255, 235, 59, 0.95)',
		            'rgba(255, 193, 7, 1)'
		        ],

		        components: {
		            preview: true,
		            opacity: true,
		            hue: true,

		            interaction: {
		                hex: true,
		                rgba: true,
		                hsva: true,
		                input: true,
		                save: true
		            }
		        }
		    }).on('save', color => {
		    	$("#scorecardsettingscontrol .cus_perfor_sow .optioncolor1")[0].style.background = color.toRGBA().toString(0);
		        pickr1.hide();
			 	var value 		= 	color.toRGBA().toString(0);
		 		flag		=	"threshold1Color";
		 		flagvalid	=	true;
		 		
		 		var action = "edit"; 
			 	var methodType = "POST"; 
			 	var notifiObj = {'generalSettingValue':{}};
			 	if(customsettingsresponse != ""){
		 			notifiObj['generalSettingValue']	=  	customsettingsresponse; 
					notifiObj['generalSettingValue']["threshold1Color"] =  value;
			 	}else{
			 		notifiObj	=  	customsettingupdateDescription;
					notifiObj['generalSettingValue']["threshold1Color"] =  value;
			 	}
			 	 
			 	$.ajax({ 
			 		url : "/stratroom/customPerformance", 
			 		type : methodType, 
			 		contentType:"application/json", 
			 		data: JSON.stringify(notifiObj), 
			 		success : function(data,status){ 
			 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
			 	},
			 	error:function(){ 
			 		$.notify("Failed: Updated Failed", { 
			 		style: 'error',className: 'graynotify' }); 
			 		} 
			 	});
			 	
		    })
		    
		    const pickr2 = new Pickr({
		        el: $("#scorecardsettingscontrol .cus_perfor_sow .optioncolor2")[0],
		        useAsButton: true,
		        theme: 'classic',
				default: "rgb(255 255 0)",
		        defaultRepresentation: 'HEX',
		        comparison: false,
		        swatches: [
		            'rgba(244, 67, 54, 1)',
		            'rgba(233, 30, 99, 0.95)',
		            'rgba(156, 39, 176, 0.9)',
		            'rgba(103, 58, 183, 0.85)',
		            'rgba(63, 81, 181, 0.8)',
		            'rgba(33, 150, 243, 0.75)',
		            'rgba(3, 169, 244, 0.7)',
		            'rgba(0, 188, 212, 0.7)',
		            'rgba(0, 150, 136, 0.75)',
		            'rgba(76, 175, 80, 0.8)',
		            'rgba(139, 195, 74, 0.85)',
		            'rgba(205, 220, 57, 0.9)',
		            'rgba(255, 235, 59, 0.95)',
		            'rgba(255, 193, 7, 1)'
		        ],

		        components: {
		            preview: true,
		            opacity: true,
		            hue: true,

		            interaction: {
		                hex: true,
		                rgba: true,
		                hsva: true,
		                input: true,
		                save: true
		            }
		        }
		    }).on('save', color => {
		    	$("#scorecardsettingscontrol .cus_perfor_sow .optioncolor2")[0].style.background = color.toRGBA().toString(0);
				console.log("Fetching done1");
		        pickr2.hide();
			 	var value 		= 	color.toRGBA().toString(0);
		 		flag		=	"threshold2Color";
		 		flagvalid	=	true;
		 		
		 		var action = "edit"; 
			 	var methodType = "POST"; 
			 	var notifiObj = {'generalSettingValue':{}};
			 	if(customsettingsresponse != ""){
		 			notifiObj['generalSettingValue']	=  	customsettingsresponse; 
					notifiObj['generalSettingValue']["threshold2Color"] =  value;
			 	}else{
			 		notifiObj	=  	customsettingupdateDescription;
					notifiObj['generalSettingValue']["threshold2Color"] =  value;
			 	}
			 	 
			 	$.ajax({ 
			 		url : "/stratroom/customPerformance", 
			 		type : methodType, 
			 		contentType:"application/json", 
			 		data: JSON.stringify(notifiObj), 
			 		success : function(data,status){ 
			 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
			 	},
			 	error:function(){ 
			 		$.notify("Failed: Updated Failed", { 
			 		style: 'error',className: 'graynotify' }); 
			 		} 
			 	});
			 	
		    })
		    
		    const pickr3 = new Pickr({
		        el: $("#scorecardsettingscontrol .cus_perfor_sow .optioncolor3")[0],
		        useAsButton: true,
		        theme: 'classic',
				default: "rgb(0 128 0)",
		        defaultRepresentation: 'HEX',
		        comparison: false,
		        swatches: [
		            'rgba(244, 67, 54, 1)',
		            'rgba(233, 30, 99, 0.95)',
		            'rgba(156, 39, 176, 0.9)',
		            'rgba(103, 58, 183, 0.85)',
		            'rgba(63, 81, 181, 0.8)',
		            'rgba(33, 150, 243, 0.75)',
		            'rgba(3, 169, 244, 0.7)',
		            'rgba(0, 188, 212, 0.7)',
		            'rgba(0, 150, 136, 0.75)',
		            'rgba(76, 175, 80, 0.8)',
		            'rgba(139, 195, 74, 0.85)',
		            'rgba(205, 220, 57, 0.9)',
		            'rgba(255, 235, 59, 0.95)',
		            'rgba(255, 193, 7, 1)'
		        ],

		        components: {
		            preview: true,
		            opacity: true,
		            hue: true,

		            interaction: {
		                hex: true,
		                rgba: true,
		                hsva: true,
		                input: true,
		                save: true
		            }
		        }
		    }).on('save', color => {
		    	$("#scorecardsettingscontrol .cus_perfor_sow .optioncolor3")[0].style.background = color.toRGBA().toString(0);
				console.log("Fetching done1");
		        pickr3.hide();
			 	var value 		= 	color.toRGBA().toString(0);
		 		flag		=	"threshold3Color";
		 		flagvalid	=	true;
		 		
		 		var action = "edit"; 
			 	var methodType = "POST"; 
			 	var notifiObj = {'generalSettingValue':{}};
			 	if(customsettingsresponse != ""){
		 			notifiObj['generalSettingValue']	=  	customsettingsresponse; 
					notifiObj['generalSettingValue']["threshold3Color"] =  value;
			 	}else{
			 		notifiObj	=  	customsettingupdateDescription;
					notifiObj['generalSettingValue']["threshold3Color"] =  value;
			 	}
			 	 
			 	$.ajax({ 
			 		url : "/stratroom/customPerformance", 
			 		type : methodType, 
			 		contentType:"application/json", 
			 		data: JSON.stringify(notifiObj), 
			 		success : function(data,status){ 
			 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
			 	},
			 	error:function(){ 
			 		$.notify("Failed: Updated Failed", { 
			 		style: 'error',className: 'graynotify' }); 
			 		} 
			 	});
			 	
		    })
			
		const pickr4 = new Pickr({
        el: $("#scorecardsettingscontrol .cus_perfor_sow .optioncolor4")[0],
        useAsButton: true,
        theme: 'classic',
		default: "rgb(255 0 0)",
        defaultRepresentation: 'HEX',
        comparison: false,
        swatches: [
            'rgba(244, 67, 54, 1)',
            'rgba(233, 30, 99, 0.95)',
            'rgba(156, 39, 176, 0.9)',
            'rgba(103, 58, 183, 0.85)',
            'rgba(63, 81, 181, 0.8)',
            'rgba(33, 150, 243, 0.75)',
            'rgba(3, 169, 244, 0.7)',
            'rgba(0, 188, 212, 0.7)',
            'rgba(0, 150, 136, 0.75)',
            'rgba(76, 175, 80, 0.8)',
            'rgba(139, 195, 74, 0.85)',
            'rgba(205, 220, 57, 0.9)',
            'rgba(255, 235, 59, 0.95)',
            'rgba(255, 193, 7, 1)'
        ],

        components: {
            preview: true,
            opacity: true,
            hue: true,

            interaction: {
                hex: true,
                rgba: true,
                hsva: true,
                input: true,
                save: true
            }
        }
    }).on('save', color => {
    	$("#scorecardsettingscontrol .cus_perfor_sow .optioncolor4")[0].style.background = color.toRGBA().toString(0);
		console.log("Fetching done1");
		pickr4.hide();
	 	var value 		= 	color.toRGBA().toString(0);
 		flag		=	"threshold4Color";
 		flagvalid	=	true;
 		
 		var action = "edit"; 
	 	var methodType = "POST"; 
	 	var notifiObj = {'generalSettingValue':{}};
	 	if(customsettingsresponse != ""){
 			notifiObj['generalSettingValue']	=  	customsettingsresponse; 
			notifiObj['generalSettingValue']["threshold4Color"] =  value;
	 	}else{
	 		notifiObj	=  	customsettingupdateDescription;
			notifiObj['generalSettingValue']["threshold4Color"] =  value;
	 	}
	 	 
	 	$.ajax({ 
	 		url : "/stratroom/customPerformance", 
	 		type : methodType, 
	 		contentType:"application/json", 
	 		data: JSON.stringify(notifiObj), 
	 		success : function(data,status){ 
	 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
	 	},
	 	error:function(){ 
	 		$.notify("Failed: Updated Failed", { 
	 		style: 'error',className: 'graynotify' }); 
	 		} 
	 	});
	 	
    })
    
    const pickr5 = new Pickr({
        el: $("#scorecardsettingscontrol .cus_perfor_sow .optioncolor5")[0],
        useAsButton: true,
        theme: 'classic',
		default: "rgb(255 255 0)",
        defaultRepresentation: 'HEX',
        comparison: false,
        swatches: [
            'rgba(244, 67, 54, 1)',
            'rgba(233, 30, 99, 0.95)',
            'rgba(156, 39, 176, 0.9)',
            'rgba(103, 58, 183, 0.85)',
            'rgba(63, 81, 181, 0.8)',
            'rgba(33, 150, 243, 0.75)',
            'rgba(3, 169, 244, 0.7)',
            'rgba(0, 188, 212, 0.7)',
            'rgba(0, 150, 136, 0.75)',
            'rgba(76, 175, 80, 0.8)',
            'rgba(139, 195, 74, 0.85)',
            'rgba(205, 220, 57, 0.9)',
            'rgba(255, 235, 59, 0.95)',
            'rgba(255, 193, 7, 1)'
        ],

        components: {
            preview: true,
            opacity: true,
            hue: true,

            interaction: {
                hex: true,
                rgba: true,
                hsva: true,
                input: true,
                save: true
            }
        }
    }).on('save', color => {
    	$("#scorecardsettingscontrol .cus_perfor_sow .optioncolor5")[0].style.background = color.toRGBA().toString(0);
		console.log("Fetching done1");
        pickr5.hide();
	 	var value 		= 	color.toRGBA().toString(0);
 		flag		=	"threshold5Color";
 		flagvalid	=	true;
 		
 		var action = "edit"; 
	 	var methodType = "POST"; 
	 	var notifiObj = {'generalSettingValue':{}};
	 	if(customsettingsresponse != ""){
 			notifiObj['generalSettingValue']	=  	customsettingsresponse; 
			notifiObj['generalSettingValue']["threshold5Color"] =  value;
	 	}else{
	 		notifiObj	=  	customsettingupdateDescription;
			notifiObj['generalSettingValue']["threshold5Color"] =  value;
	 	}
	 	 
	 	$.ajax({ 
	 		url : "/stratroom/customPerformance", 
	 		type : methodType, 
	 		contentType:"application/json", 
	 		data: JSON.stringify(notifiObj), 
	 		success : function(data,status){ 
	 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
	 	},
	 	error:function(){ 
	 		$.notify("Failed: Updated Failed", { 
	 		style: 'error',className: 'graynotify' }); 
	 		} 
	 	});
	 	
    })
    
		   
		}
        }
    });
    
    
}

$("#generalsettingForm").validate({
	
	rules : {
		sitename:"required",
		sitelanguage:"required",
		//dept:"required",
		implementationtype:"required",
		adminemailId:"required",
		settingcurrency:"required",
		currencyview:"required",
		defaultperiod:"required",
		implementation:"required",
		//calenderyear:"required",
		financialstart:"required",
		financialend:"required",
		timeZone:"required"
	},
	messages : {
		sitename : "Sitename is required",
		sitelanguage : "Site Language is required",
		adminemailId : "Email id is required",
		//dept : "Dept is required",
		implementationtype:"Implementation type is required",
		settingcurrency:"Select currency",
		currencyview:"Currency View is required",
		defaultperiod:"Default period is required",
		implementation:"Implementation is required",
		calenderyear:"Select calender",
		timeZone:"Select timeZone"
	},
	errorPlacement : function(error, element) {
		error.insertAfter(element);
	},

	submitHandler : function(form) {
		console.log(form, "form");
		saveGeneralSettings();
	}

	

});


function GeneralcontrolListShow(data) {
var siteLanguage = data.siteLanguage || "en";

var selectedLanguages = siteLanguage.split(',').map(lang => lang.trim()); 

	$('.lang-checkbox').prop('checked', false);

	
	selectedLanguages.forEach(function(lang) {
		$('.lang-checkbox[value="' + lang + '"]').prop('checked', true);
	});
	console.log(data, "dataaaa");
	if(!generalview){
		$(".generalcontrol").remove();
		$("#generalcontrol").remove();
		return false;
	}
	
	/*if(!generaledit){
		$("#generalsettingForm :input").prop("disabled", true);
		$("button[type='submit']").hide();
	}*/
	console.log(controlupdateDescription, "controlupdateDescription");
    if(!jQuery.isEmptyObject(controlupdateDescription)){
    	var sitename	=	(controlupdateDescription.siteName !=	undefined?controlupdateDescription.siteName:"StratRoom");
		var siteLanguage	=	localStorage.getItem("selectedLang") || "en";
		var currencyType	=	(controlupdateDescription.currencyType !=	undefined?controlupdateDescription.currencyType:"");
		var timeZone	=	(controlupdateDescription.timeZone !=	undefined?controlupdateDescription.timeZone:"");
		var calendarYear	=	(controlupdateDescription.calendarYear !=	undefined?controlupdateDescription.calendarYear:$(".top_datepicker").val());
		var defaultDatePeriod	=	(controlupdateDescription.defaultDatePeriod !=	undefined?controlupdateDescription.defaultDatePeriod:"");
		var implementation	=	(controlupdateDescription.implementation !=	undefined?controlupdateDescription.implementation:"");
		var currencyView	=	(controlupdateDescription.currencyView !=	undefined?controlupdateDescription.currencyView:"");
		var department		=	(controlupdateDescription.departmentId !=	undefined?controlupdateDescription.departmentId:"");
		var implementationType		=	(controlupdateDescription.implementationType !=	undefined?controlupdateDescription.implementationType:"");
		var financialstart		=	(controlupdateDescription.startMonth !=	undefined?controlupdateDescription.startMonth:"");
		var financialend		=	(controlupdateDescription.endMonth !=	undefined?controlupdateDescription.endMonth:"");
		$("#financialstart").val(financialstart).trigger("change");
    	$("#financialend").val(financialend).trigger("change");
		$("#generalid").val(controlupdateDescription.orgId);
    	$("#defaultperiod").val(defaultDatePeriod).trigger("change");
    	$("#implementation").val(implementation).trigger("change");
    	if(implementationType){
    		$("#implementationtype").attr("disabled",true);
    		$("#implementationtype").val(implementationType).trigger("change");
    	}else{
    		$("#implementationtype").val(implementationType);
    	}
    	$("#currencyview").val(currencyView).trigger("change");
    	$("#dept").val(department);
		console.log(sitename, "siteName");
    	$("#sitename").val(sitename);
    	if(currencyType	!=	""){
			console.log(currencyType, "currencyType");
    		$("#settingcurrency").val(currencyType).trigger("change");
    	}else{
    		$("#settingcurrency").val("");
    	}
    	
    	$("#timeZone").val(timeZone).trigger("change");
    	$("#sitelanguage").val(siteLanguage);
    	$("#calenderyear").val(calendarYear);
    	
    
    } 
    
    if($("#implementation").val()	==	"BSC"){
		$(".implementation-option").show();
	}else{
		$(".implementation-option").hide();
	}
}

function colorEditTrigger(Element,colorValue){
	const pickr4 = new Pickr({
        el: Element,
        useAsButton: true,
        theme: 'classic',
		default: colorValue,
        defaultRepresentation: 'HEX',
        comparison: false,
        swatches: [
            'rgba(244, 67, 54, 1)',
            'rgba(233, 30, 99, 0.95)',
            'rgba(156, 39, 176, 0.9)',
            'rgba(103, 58, 183, 0.85)',
            'rgba(63, 81, 181, 0.8)',
            'rgba(33, 150, 243, 0.75)',
            'rgba(3, 169, 244, 0.7)',
            'rgba(0, 188, 212, 0.7)',
            'rgba(0, 150, 136, 0.75)',
            'rgba(76, 175, 80, 0.8)',
            'rgba(139, 195, 74, 0.85)',
            'rgba(205, 220, 57, 0.9)',
            'rgba(255, 235, 59, 0.95)',
            'rgba(255, 193, 7, 1)'
        ],

        components: {
            preview: true,
            opacity: true,
            hue: true,

            interaction: {
                hex: true,
                rgba: true,
                hsva: true,
                input: true,
                save: true
            }
        }
    }).on('save', color => {
    	Element.style.background = color.toRGBA().toString(0);
		console.log("Fetching done1");
        pickr4.hide();
    })
}


function ThemecontrolListShow(data) {
	
	if(!themeview){
		$(".themecontrol").remove();
		$("#themecontrol").remove();
		return false;
	}
	
	/*
	if(!themeedit){
		$("#login_logo").attr("disabled","disabled");
		$("#application_logo").attr("disabled","disabled");
		$(".themesavesettings").attr("disabled","disabled");
	}*/
	
	var firstcolor	=	null;
    if(!jQuery.isEmptyObject(data)){
		themecontrolupdateDescription	=	data;
		$("#themeid").val(themecontrolupdateDescription.orgId);
		$(".input-group-append").find('span.pickr').css('background',(themecontrolupdateDescription.themeColor !=	null?themecontrolupdateDescription.themeColor:themecolor));
		firstcolor=themecolor	=	(themecontrolupdateDescription.themeColor !=	null?themecontrolupdateDescription.themeColor:themecolor);
		if(themecontrolupdateDescription.loginTheme !=	null && themecontrolupdateDescription.loginTheme !=	""){
			$(".applogofinal").attr("src",themecontrolupdateDescription.loginTheme);
		}
    }
	
    //if(themeedit ==	true){
    	$("#themecontrol .input-group-append").children().addClass("pickr");
    	$("#themecontrol .input-group-append").children().removeClass("pickrtheme");
    	colorEditTrigger($("#themecontrol .pickr")[0],firstcolor);
    //}			
}

// function LicensecontrolListShow(data){
// 	if(!licenseview){
// 		$(".licensecontrol").remove();
// 		$("#licensecontrol").remove();
// 		return false;
// 	}
	
// 	if(!jQuery.isEmptyObject(data)){
//     	if(data['totalAllowedUsers'] !=	undefined && data['totalAllowedUsers'] !=	"" && data['totalAllowedUsers'] !=	null){
//     		var users	=	data['totalAllowedUsers']+" users";
//     		$("#licensevalidusers").val(users);
//     	}
//     	if(data['expiryDate'] !=	undefined && data['expiryDate'] !=	"" && data['expiryDate'] !=	null){
//     		var users	=	data['expiryDate'];
//     		$("#licensevaliddate").val(users);
//     	}
//     	var licensemodulelist	=	"";
//     	if(data['moduleList'] !=	undefined && data['moduleList'] !=	"" && data['moduleList'] !=	null){
//     		var moduleList	=	data['moduleList'];
//     		const moduleListduplicate 	= 	new Set();
//     		const filteredArr	= 	moduleList.filter(el => {
//     			const duplicate = 	moduleListduplicate.has(el.moduleName);
//     		  	moduleListduplicate.add(el.moduleName);
//     		  	return !duplicate;
//     		});
    		
//     		$.each(filteredArr, function(index, reportee) {
//     			var checkedornot	=	(reportee.enabled	==	true?"checked":"");
// 							licensemodulelist	+=	`<div class="col-12 col-md-6">
//     <div class="form-check form-switch mb-3 license-switch" style="display: flex; align-items: center;">
//         <label class="control-switch mb-0" style="position: relative; display: inline-block; width: 40px; height: 20px;">
//             <!-- Checkbox Input (Hidden) -->
//             <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" `+checkedornot+` disabled 
//                 style="opacity: 0; width: 100%; height: 100%; position: absolute; cursor: pointer; z-index: 3;" />
            
//             <!-- Switch Track -->
//             <span class="control-slider round" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; 
//                 background-color: #ccc; transition: 0.4s; border-radius: 20px; border: 1px solid grey; display: flex; 
//                 align-items: center; padding: 2px;">
                
//                 <!-- Toggle Knob (with Border) -->
//                 <span style="height: 16px; width: 16px; background-color: white; transition: 0.4s; border-radius: 50%; 
//                     border: 1px solid grey; box-shadow: 0 0 2px rgba(0,0,0,0.2); 
//                     transform: translateX(` + (checkedornot == 'checked' ? '20px' : '0') + `);"></span>
//             </span>
//         </label>
        
//         <!-- Label -->
//         <label class="form-check-label" for="flexSwitchCheckDefault" 
//             style="margin-left: 10px; font-size: 14px; color: #444444;">`+reportee.moduleName+`</label>
//     </div>
// </div>





// 			  `;
// 			});
// 			$("#modulelistdata").html(licensemodulelist);
// 			let currentLanguage = localStorage.getItem("selectedLang") || "en";

// 			loadTranslations(currentLanguage); // Apply translations when DOM changes

//     	}	
    	
//     }
// }

// function colorpanelTrigger(current_color1,current_color2,current_color3,current_color4,current_color5){
// 	const pickr1 = new Pickr({
//         el: $("#scorecardsettingscontrol .cus_perfor_sow .optioncolor1")[0],
//         useAsButton: true,
//         theme: 'classic',
// 		default: current_color1,
//         defaultRepresentation: 'HEX',
//         comparison: false,
//         swatches: [
//             'rgba(244, 67, 54, 1)',
//             'rgba(233, 30, 99, 0.95)',
//             'rgba(156, 39, 176, 0.9)',
//             'rgba(103, 58, 183, 0.85)',
//             'rgba(63, 81, 181, 0.8)',
//             'rgba(33, 150, 243, 0.75)',
//             'rgba(3, 169, 244, 0.7)',
//             'rgba(0, 188, 212, 0.7)',
//             'rgba(0, 150, 136, 0.75)',
//             'rgba(76, 175, 80, 0.8)',
//             'rgba(139, 195, 74, 0.85)',
//             'rgba(205, 220, 57, 0.9)',
//             'rgba(255, 235, 59, 0.95)',
//             'rgba(255, 193, 7, 1)'
//         ],

//         components: {
//             preview: true,
//             opacity: true,
//             hue: true,

//             interaction: {
//                 hex: true,
//                 rgba: true,
//                 hsva: true,
//                 input: true,
//                 save: true
//             }
//         }
//     }).on('save', color => {
//     	$("#scorecardsettingscontrol  .cus_perfor_sow .optioncolor1")[0].style.background = color.toRGBA().toString(0);
// 		console.log("Fetching done1");
//         pickr1.hide();
// 	 	var value 		= 	color.toRGBA().toString(0);
//  		flag		=	"threshold1Color";
//  		flagvalid	=	true;
 		
//  		var action = "edit"; 
// 	 	var methodType = "POST"; 
// 	 	var notifiObj = {'generalSettingValue':{}};
// 	 	if(customsettingsresponse != ""){
//  			notifiObj['generalSettingValue']	=  	customsettingsresponse; 
// 			notifiObj['generalSettingValue']["threshold1Color"] =  value;
// 	 	}else{
// 	 		notifiObj	=  	customsettingupdateDescription;
// 			notifiObj['generalSettingValue']["threshold1Color"] =  value;
// 	 	}
	 	 
// 	 	$.ajax({ 
// 	 		url : "/stratroom/customPerformance", 
// 	 		type : methodType, 
// 	 		contentType:"application/json", 
// 	 		data: JSON.stringify(notifiObj), 
// 	 		success : function(data,status){ 
// 	 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
// 	 	},
// 	 	error:function(){ 
// 	 		$.notify("Failed: Updated Failed", { 
// 	 		style: 'error',className: 'graynotify' }); 
// 	 		} 
// 	 	});
	 	
//     })
    
//     const pickr2 = new Pickr({
//         el: $("#scorecardsettingscontrol .cus_perfor_sow .optioncolor2")[0],
//         useAsButton: true,
//         theme: 'classic',
// 		default: current_color2,
//         defaultRepresentation: 'HEX',
//         comparison: false,
//         swatches: [
//             'rgba(244, 67, 54, 1)',
//             'rgba(233, 30, 99, 0.95)',
//             'rgba(156, 39, 176, 0.9)',
//             'rgba(103, 58, 183, 0.85)',
//             'rgba(63, 81, 181, 0.8)',
//             'rgba(33, 150, 243, 0.75)',
//             'rgba(3, 169, 244, 0.7)',
//             'rgba(0, 188, 212, 0.7)',
//             'rgba(0, 150, 136, 0.75)',
//             'rgba(76, 175, 80, 0.8)',
//             'rgba(139, 195, 74, 0.85)',
//             'rgba(205, 220, 57, 0.9)',
//             'rgba(255, 235, 59, 0.95)',
//             'rgba(255, 193, 7, 1)'
//         ],

//         components: {
//             preview: true,
//             opacity: true,
//             hue: true,

//             interaction: {
//                 hex: true,
//                 rgba: true,
//                 hsva: true,
//                 input: true,
//                 save: true
//             }
//         }
//     }).on('save', color => {
//     	$("#scorecardsettingscontrol .cus_perfor_sow .optioncolor2")[0].style.background = color.toRGBA().toString(0);
// 		console.log("Fetching done2");
//         pickr2.hide();
// 	 	var value 		= 	color.toRGBA().toString(0);
//  		flag		=	"threshold2Color";
//  		flagvalid	=	true;
 		
//  		var action = "edit"; 
// 	 	var methodType = "POST"; 
// 	 	var notifiObj = {'generalSettingValue':{}};
// 	 	if(customsettingsresponse != ""){
//  			notifiObj['generalSettingValue']	=  	customsettingsresponse; 
// 			notifiObj['generalSettingValue']["threshold2Color"] =  value;
// 	 	}else{
// 	 		notifiObj	=  	customsettingupdateDescription;
// 			notifiObj['generalSettingValue']["threshold2Color"] =  value;
// 	 	}
	 	 
// 	 	$.ajax({ 
// 	 		url : "/stratroom/customPerformance", 
// 	 		type : methodType, 
// 	 		contentType:"application/json", 
// 	 		data: JSON.stringify(notifiObj), 
// 	 		success : function(data,status){ 
// 	 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
// 	 	},
// 	 	error:function(){ 
// 	 		$.notify("Failed: Updated Failed", { 
// 	 		style: 'error',className: 'graynotify' }); 
// 	 		} 
// 	 	});
	 	
//     })
    
//     const pickr3 = new Pickr({
//         el: $("#scorecardsettingscontrol .cus_perfor_sow .optioncolor3")[0],
//         useAsButton: true,
//         theme: 'classic',
// 		default: current_color3,
//         defaultRepresentation: 'HEX',
//         comparison: false,
//         swatches: [
//             'rgba(244, 67, 54, 1)',
//             'rgba(233, 30, 99, 0.95)',
//             'rgba(156, 39, 176, 0.9)',
//             'rgba(103, 58, 183, 0.85)',
//             'rgba(63, 81, 181, 0.8)',
//             'rgba(33, 150, 243, 0.75)',
//             'rgba(3, 169, 244, 0.7)',
//             'rgba(0, 188, 212, 0.7)',
//             'rgba(0, 150, 136, 0.75)',
//             'rgba(76, 175, 80, 0.8)',
//             'rgba(139, 195, 74, 0.85)',
//             'rgba(205, 220, 57, 0.9)',
//             'rgba(255, 235, 59, 0.95)',
//             'rgba(255, 193, 7, 1)'
//         ],

//         components: {
//             preview: true,
//             opacity: true,
//             hue: true,

//             interaction: {
//                 hex: true,
//                 rgba: true,
//                 hsva: true,
//                 input: true,
//                 save: true
//             }
//         }
//     }).on('save', color => {
//     	$("#scorecardsettingscontrol .cus_perfor_sow .optioncolor3")[0].style.background = color.toRGBA().toString(0);
// 		console.log("Fetching done3");
//         pickr3.hide();
// 	 	var value 		= 	color.toRGBA().toString(0);
//  		flag		=	"threshold3Color";
//  		flagvalid	=	true;
 		
//  		var action = "edit"; 
// 	 	var methodType = "POST"; 
// 	 	var notifiObj = {'generalSettingValue':{}};
// 	 	if(customsettingsresponse != ""){
//  			notifiObj['generalSettingValue']	=  	customsettingsresponse; 
// 			notifiObj['generalSettingValue']["threshold3Color"] =  value;
// 	 	}else{
// 	 		notifiObj	=  	customsettingupdateDescription;
// 			notifiObj['generalSettingValue']["threshold3Color"] =  value;
// 	 	}
	 	 
// 	 	$.ajax({ 
// 	 		url : "/stratroom/customPerformance", 
// 	 		type : methodType, 
// 	 		contentType:"application/json", 
// 	 		data: JSON.stringify(notifiObj), 
// 	 		success : function(data,status){ 
// 	 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
// 	 	},
// 	 	error:function(){ 
// 	 		$.notify("Failed: Updated Failed", { 
// 	 		style: 'error',className: 'graynotify' }); 
// 	 		} 
// 	 	});
	 	
//     })



// 	const pickr4 = new Pickr({
//         el: $("#scorecardsettingscontrol .cus_perfor_sow .optioncolor4")[0],
//         useAsButton: true,
//         theme: 'classic',
// 		default: current_color4,
//         defaultRepresentation: 'HEX',
//         comparison: false,
//         swatches: [
//             'rgba(244, 67, 54, 1)',
//             'rgba(233, 30, 99, 0.95)',
//             'rgba(156, 39, 176, 0.9)',
//             'rgba(103, 58, 183, 0.85)',
//             'rgba(63, 81, 181, 0.8)',
//             'rgba(33, 150, 243, 0.75)',
//             'rgba(3, 169, 244, 0.7)',
//             'rgba(0, 188, 212, 0.7)',
//             'rgba(0, 150, 136, 0.75)',
//             'rgba(76, 175, 80, 0.8)',
//             'rgba(139, 195, 74, 0.85)',
//             'rgba(205, 220, 57, 0.9)',
//             'rgba(255, 235, 59, 0.95)',
//             'rgba(255, 193, 7, 1)'
//         ],

//         components: {
//             preview: true,
//             opacity: true,
//             hue: true,

//             interaction: {
//                 hex: true,
//                 rgba: true,
//                 hsva: true,
//                 input: true,
//                 save: true
//             }
//         }
//     }).on('save', color => {
//     	$("#scorecardsettingscontrol .cus_perfor_sow .optioncolor4")[0].style.background = color.toRGBA().toString(0);
// 		console.log("Fetching done4");
//         pickr4.hide();
// 	 	var value 		= 	color.toRGBA().toString(0);
//  		flag		=	"threshold4Color";
//  		flagvalid	=	true;
 		
//  		var action = "edit"; 
// 	 	var methodType = "POST"; 
// 	 	var notifiObj = {'generalSettingValue':{}};
// 	 	if(customsettingsresponse != ""){
//  			notifiObj['generalSettingValue']	=  	customsettingsresponse; 
// 			notifiObj['generalSettingValue']["threshold4Color"] =  value;
// 	 	}else{
// 	 		notifiObj	=  	customsettingupdateDescription;
// 			notifiObj['generalSettingValue']["threshold4Color"] =  value;
// 	 	}
	 	 
// 	 	$.ajax({ 
// 	 		url : "/stratroom/customPerformance", 
// 	 		type : methodType, 
// 	 		contentType:"application/json", 
// 	 		data: JSON.stringify(notifiObj), 
// 	 		success : function(data,status){ 
// 	 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
// 	 	},
// 	 	error:function(){ 
// 	 		$.notify("Failed: Updated Failed", { 
// 	 		style: 'error',className: 'graynotify' }); 
// 	 		} 
// 	 	});
	 	
//     })



// 	const pickr5 = new Pickr({
//         el: $("#scorecardsettingscontrol .cus_perfor_sow .optioncolor5")[0],
//         useAsButton: true,
//         theme: 'classic',
// 		default: current_color5,
//         defaultRepresentation: 'HEX',
//         comparison: false,
//         swatches: [
//             'rgba(244, 67, 54, 1)',
//             'rgba(233, 30, 99, 0.95)',
//             'rgba(156, 39, 176, 0.9)',
//             'rgba(103, 58, 183, 0.85)',
//             'rgba(63, 81, 181, 0.8)',
//             'rgba(33, 150, 243, 0.75)',
//             'rgba(3, 169, 244, 0.7)',
//             'rgba(0, 188, 212, 0.7)',
//             'rgba(0, 150, 136, 0.75)',
//             'rgba(76, 175, 80, 0.8)',
//             'rgba(139, 195, 74, 0.85)',
//             'rgba(205, 220, 57, 0.9)',
//             'rgba(255, 235, 59, 0.95)',
//             'rgba(255, 193, 7, 1)'
//         ],

//         components: {
//             preview: true,
//             opacity: true,
//             hue: true,

//             interaction: {
//                 hex: true,
//                 rgba: true,
//                 hsva: true,
//                 input: true,
//                 save: true
//             }
//         }
//     }).on('save', color => {
//     	$("#scorecardsettingscontrol .cus_perfor_sow .optioncolor5")[0].style.background = color.toRGBA().toString(0);
// 		console.log("Fetching done 5");
//         pickr5.hide();
// 	 	var value 		= 	color.toRGBA().toString(0);
//  		flag		=	"threshold5Color";
//  		flagvalid	=	true;
 		
//  		var action = "edit"; 
// 	 	var methodType = "POST"; 
// 	 	var notifiObj = {'generalSettingValue':{}};
// 	 	if(customsettingsresponse != ""){
//  			notifiObj['generalSettingValue']	=  	customsettingsresponse; 
// 			notifiObj['generalSettingValue']["threshold5Color"] =  value;
// 	 	}else{
// 	 		notifiObj	=  	customsettingupdateDescription;
// 			notifiObj['generalSettingValue']["threshold5Color"] =  value;
// 	 	}
	 	 
// 	 	$.ajax({ 
// 	 		url : "/stratroom/customPerformance", 
// 	 		type : methodType, 
// 	 		contentType:"application/json", 
// 	 		data: JSON.stringify(notifiObj), 
// 	 		success : function(data,status){ 
// 	 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
// 	 	},
// 	 	error:function(){ 
// 	 		$.notify("Failed: Updated Failed", { 
// 	 		style: 'error',className: 'graynotify' }); 
// 	 		} 
// 	 	});
	 	
//     })
// }


function LicensecontrolListShow(data) {
    if (!licenseview) {
        $(".licensecontrol").remove();
        $("#licensecontrol").remove();
        return false;
    }

    if (!$.isEmptyObject(data)) {
        if (data['totalAllowedUsers'] !== undefined && data['totalAllowedUsers'] !== "" && data['totalAllowedUsers'] !== null) {
            var users = data['totalAllowedUsers'] + " users";
            $("#licensevalidusers").val(users);
        }
        if (data['expiryDate'] !== undefined && data['expiryDate'] !== "" && data['expiryDate'] !== null) {
            var users = data['expiryDate'];
            $("#licensevaliddate").val(users);
        }

        var licensemodulelist = "";

        if (data['moduleList'] !== undefined && data['moduleList'] !== "" && data['moduleList'] !== null) {
            var moduleList = data['moduleList'];

            // Remove duplicates by moduleName
            const moduleListduplicate = new Set();
            const filteredArr = moduleList.filter(el => {
                const duplicate = moduleListduplicate.has(el.moduleName);
                moduleListduplicate.add(el.moduleName);
                return !duplicate;
            });

            // Map to new design
            $.each(filteredArr, function (index, reportee) {
                // Generate a clean, safe ID from moduleName (e.g., "Scorecard" → "msScorecard")
                var cleanModuleName = reportee.moduleName.replace(/\s+/g, ''); // Remove spaces
                var moduleId = "ms" + cleanModuleName.charAt(0).toUpperCase() + cleanModuleName.slice(1);

                // Checked if enabled
                var checked = reportee.enabled == true ? "checked" : "";

               licensemodulelist += `
    <div class="col-12 col-md-6">
        <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="${moduleId}" ${checked} disabled>
            <label class="form-check-label" for="${moduleId}">${reportee.moduleName}</label>
        </div>
    </div>
`;
            });

            $("#modulelistdata").html(licensemodulelist);

            let currentLanguage = localStorage.getItem("selectedLang") || "en";
            loadTranslations(currentLanguage); // Apply translations when DOM changes
        }
    }
}

function colorpanelTrigger(){

}

// function performancecolorpanelTrigger(current_color1,current_color2,current_color3,current_color4,current_color5){
	
// 	const pickr1 = new Pickr({
//         el: $("#scorecardsettingscontrol .perfor_sow .optioncolor1")[0],
//         useAsButton: true,
//         theme: 'classic',
// 		default: current_color1,
//         defaultRepresentation: 'HEX',
//         comparison: false,
//         swatches: [
//             'rgba(244, 67, 54, 1)',
//             'rgba(233, 30, 99, 0.95)',
//             'rgba(156, 39, 176, 0.9)',
//             'rgba(103, 58, 183, 0.85)',
//             'rgba(63, 81, 181, 0.8)',
//             'rgba(33, 150, 243, 0.75)',
//             'rgba(3, 169, 244, 0.7)',
//             'rgba(0, 188, 212, 0.7)',
//             'rgba(0, 150, 136, 0.75)',
//             'rgba(76, 175, 80, 0.8)',
//             'rgba(139, 195, 74, 0.85)',
//             'rgba(205, 220, 57, 0.9)',
//             'rgba(255, 235, 59, 0.95)',
//             'rgba(255, 193, 7, 1)'
//         ],

//         components: {
//             preview: true,
//             opacity: true,
//             hue: true,

//             interaction: {
//                 hex: true,
//                 rgba: true,
//                 hsva: true,
//                 input: true,
//                 save: true
//             }
//         }
//     }).on('save', color => {
//     	$("#scorecardsettingscontrol .perfor_sow .optioncolor1")[0].style.background = color.toRGBA().toString(0);
// 		console.log("Fetching done1");
//         pickr1.hide();
// 	 	var value 		= 	color.toRGBA().toString(0);
//  		flag		=	"threshold1Color";
//  		flagvalid	=	true;
 		
//  		var action = "edit"; 
// 	 	var methodType = "POST"; 
// 	 	var notifiObj = {'generalSettingValue':{}};
// 	 	if(customsettingsresponse != ""){
//  			notifiObj['generalSettingValue']	=  	customsettingsresponse; 
// 			notifiObj['generalSettingValue']["threshold1Color"] =  value;
// 	 	}else{
// 	 		notifiObj	=  	customsettingupdateDescription;
// 			notifiObj['generalSettingValue']["threshold1Color"] =  value;
// 	 	}
	 	 
// 	 	$.ajax({ 
// 	 		url : "/stratroom/customPerformance", 
// 	 		type : methodType, 
// 	 		contentType:"application/json", 
// 	 		data: JSON.stringify(notifiObj), 
// 	 		success : function(data,status){ 
// 	 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
// 	 	},
// 	 	error:function(){ 
// 	 		$.notify("Failed: Updated Failed", { 
// 	 		style: 'error',className: 'graynotify' }); 
// 	 		} 
// 	 	});
	 	
//     })
    
//     const pickr2 = new Pickr({
//         el: $("#scorecardsettingscontrol .perfor_sow .optioncolor2")[0],
//         useAsButton: true,
//         theme: 'classic',
// 		default: current_color2,
//         defaultRepresentation: 'HEX',
//         comparison: false,
//         swatches: [
//             'rgba(244, 67, 54, 1)',
//             'rgba(233, 30, 99, 0.95)',
//             'rgba(156, 39, 176, 0.9)',
//             'rgba(103, 58, 183, 0.85)',
//             'rgba(63, 81, 181, 0.8)',
//             'rgba(33, 150, 243, 0.75)',
//             'rgba(3, 169, 244, 0.7)',
//             'rgba(0, 188, 212, 0.7)',
//             'rgba(0, 150, 136, 0.75)',
//             'rgba(76, 175, 80, 0.8)',
//             'rgba(139, 195, 74, 0.85)',
//             'rgba(205, 220, 57, 0.9)',
//             'rgba(255, 235, 59, 0.95)',
//             'rgba(255, 193, 7, 1)'
//         ],

//         components: {
//             preview: true,
//             opacity: true,
//             hue: true,

//             interaction: {
//                 hex: true,
//                 rgba: true,
//                 hsva: true,
//                 input: true,
//                 save: true
//             }
//         }
//     }).on('save', color => {
//     	$("#scorecardsettingscontrol .perfor_sow .optioncolor2")[0].style.background = color.toRGBA().toString(0);
// 		console.log("Fetching done1");
//         pickr2.hide();
// 	 	var value 		= 	color.toRGBA().toString(0);
//  		flag		=	"threshold2Color";
//  		flagvalid	=	true;
 		
//  		var action = "edit"; 
// 	 	var methodType = "POST"; 
// 	 	var notifiObj = {'generalSettingValue':{}};
// 	 	if(customsettingsresponse != ""){
//  			notifiObj['generalSettingValue']	=  	customsettingsresponse; 
// 			notifiObj['generalSettingValue']["threshold2Color"] =  value;
// 	 	}else{
// 	 		notifiObj	=  	customsettingupdateDescription;
// 			notifiObj['generalSettingValue']["threshold2Color"] =  value;
// 	 	}
	 	 
// 	 	$.ajax({ 
// 	 		url : "/stratroom/customPerformance", 
// 	 		type : methodType, 
// 	 		contentType:"application/json", 
// 	 		data: JSON.stringify(notifiObj), 
// 	 		success : function(data,status){ 
// 	 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
// 	 	},
// 	 	error:function(){ 
// 	 		$.notify("Failed: Updated Failed", { 
// 	 		style: 'error',className: 'graynotify' }); 
// 	 		} 
// 	 	});
	 	
//     })
    
//     const pickr3 = new Pickr({
//         el: $("#scorecardsettingscontrol .perfor_sow .optioncolor3")[0],
//         useAsButton: true,
//         theme: 'classic',
// 		default: current_color3,
//         defaultRepresentation: 'HEX',
//         comparison: false,
//         swatches: [
//             'rgba(244, 67, 54, 1)',
//             'rgba(233, 30, 99, 0.95)',
//             'rgba(156, 39, 176, 0.9)',
//             'rgba(103, 58, 183, 0.85)',
//             'rgba(63, 81, 181, 0.8)',
//             'rgba(33, 150, 243, 0.75)',
//             'rgba(3, 169, 244, 0.7)',
//             'rgba(0, 188, 212, 0.7)',
//             'rgba(0, 150, 136, 0.75)',
//             'rgba(76, 175, 80, 0.8)',
//             'rgba(139, 195, 74, 0.85)',
//             'rgba(205, 220, 57, 0.9)',
//             'rgba(255, 235, 59, 0.95)',
//             'rgba(255, 193, 7, 1)'
//         ],

//         components: {
//             preview: true,
//             opacity: true,
//             hue: true,

//             interaction: {
//                 hex: true,
//                 rgba: true,
//                 hsva: true,
//                 input: true,
//                 save: true
//             }
//         }
//     }).on('save', color => {
//     	$("#scorecardsettingscontrol .perfor_sow .optioncolor3")[0].style.background = color.toRGBA().toString(0);
// 		console.log("Fetching done1");
//         pickr3.hide();
// 	 	var value 		= 	color.toRGBA().toString(0);
//  		flag		=	"threshold3Color";
//  		flagvalid	=	true;
 		
//  		var action = "edit"; 
// 	 	var methodType = "POST"; 
// 	 	var notifiObj = {'generalSettingValue':{}};
// 	 	if(customsettingsresponse != ""){
//  			notifiObj['generalSettingValue']	=  	customsettingsresponse; 
// 			notifiObj['generalSettingValue']["threshold3Color"] =  value;
// 	 	}else{
// 	 		notifiObj	=  	customsettingupdateDescription;
// 			notifiObj['generalSettingValue']["threshold3Color"] =  value;
// 	 	}
	 	 
// 	 	$.ajax({ 
// 	 		url : "/stratroom/customPerformance", 
// 	 		type : methodType, 
// 	 		contentType:"application/json", 
// 	 		data: JSON.stringify(notifiObj), 
// 	 		success : function(data,status){ 
// 	 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
// 	 	},
// 	 	error:function(){ 
// 	 		$.notify("Failed: Updated Failed", { 
// 	 		style: 'error',className: 'graynotify' }); 
// 	 		} 
// 	 	});
	 	
//     })



// 	const pickr4 = new Pickr({
//         el: $("#scorecardsettingscontrol .perfor_sow .optioncolor4")[0],
//         useAsButton: true,
//         theme: 'classic',
// 		default: current_color4,
//         defaultRepresentation: 'HEX',
//         comparison: false,
//         swatches: [
//             'rgba(244, 67, 54, 1)',
//             'rgba(233, 30, 99, 0.95)',
//             'rgba(156, 39, 176, 0.9)',
//             'rgba(103, 58, 183, 0.85)',
//             'rgba(63, 81, 181, 0.8)',
//             'rgba(33, 150, 243, 0.75)',
//             'rgba(3, 169, 244, 0.7)',
//             'rgba(0, 188, 212, 0.7)',
//             'rgba(0, 150, 136, 0.75)',
//             'rgba(76, 175, 80, 0.8)',
//             'rgba(139, 195, 74, 0.85)',
//             'rgba(205, 220, 57, 0.9)',
//             'rgba(255, 235, 59, 0.95)',
//             'rgba(255, 193, 7, 1)'
//         ],

//         components: {
//             preview: true,
//             opacity: true,
//             hue: true,

//             interaction: {
//                 hex: true,
//                 rgba: true,
//                 hsva: true,
//                 input: true,
//                 save: true
//             }
//         }
//     }).on('save', color => {
//     	$("#scorecardsettingscontrol .perfor_sow .optioncolor4")[0].style.background = color.toRGBA().toString(0);
// 		console.log("Fetching done1");
//         pickr4.hide();
// 	 	var value 		= 	color.toRGBA().toString(0);
//  		flag		=	"threshold4Color";
//  		flagvalid	=	true;
 		
//  		var action = "edit"; 
// 	 	var methodType = "POST"; 
// 	 	var notifiObj = {'generalSettingValue':{}};
// 	 	if(customsettingsresponse != ""){
//  			notifiObj['generalSettingValue']	=  	customsettingsresponse; 
// 			notifiObj['generalSettingValue']["threshold4Color"] =  value;
// 	 	}else{
// 	 		notifiObj	=  	customsettingupdateDescription;
// 			notifiObj['generalSettingValue']["threshold4Color"] =  value;
// 	 	}
	 	 
// 	 	$.ajax({ 
// 	 		url : "/stratroom/customPerformance", 
// 	 		type : methodType, 
// 	 		contentType:"application/json", 
// 	 		data: JSON.stringify(notifiObj), 
// 	 		success : function(data,status){ 
// 	 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
// 	 	},
// 	 	error:function(){ 
// 	 		$.notify("Failed: Updated Failed", { 
// 	 		style: 'error',className: 'graynotify' }); 
// 	 		} 
// 	 	});
	 	
//     })


// 	const pickr5 = new Pickr({
//         el: $("#scorecardsettingscontrol .perfor_sow .optioncolor5")[0],
//         useAsButton: true,
//         theme: 'classic',
// 		default: current_color5,
//         defaultRepresentation: 'HEX',
//         comparison: false,
//         swatches: [
//             'rgba(244, 67, 54, 1)',
//             'rgba(233, 30, 99, 0.95)',
//             'rgba(156, 39, 176, 0.9)',
//             'rgba(103, 58, 183, 0.85)',
//             'rgba(63, 81, 181, 0.8)',
//             'rgba(33, 150, 243, 0.75)',
//             'rgba(3, 169, 244, 0.7)',
//             'rgba(0, 188, 212, 0.7)',
//             'rgba(0, 150, 136, 0.75)',
//             'rgba(76, 175, 80, 0.8)',
//             'rgba(139, 195, 74, 0.85)',
//             'rgba(205, 220, 57, 0.9)',
//             'rgba(255, 235, 59, 0.95)',
//             'rgba(255, 193, 7, 1)'
//         ],

//         components: {
//             preview: true,
//             opacity: true,
//             hue: true,

//             interaction: {
//                 hex: true,
//                 rgba: true,
//                 hsva: true,
//                 input: true,
//                 save: true
//             }
//         }
//     }).on('save', color => {
//     	$("#scorecardsettingscontrol .perfor_sow .optioncolor5")[0].style.background = color.toRGBA().toString(0);
// 		console.log("Fetching done1");
//         pickr5.hide();
// 	 	var value 		= 	color.toRGBA().toString(0);
//  		flag		=	"threshold5Color";
//  		flagvalid	=	true;
 		
//  		var action = "edit"; 
// 	 	var methodType = "POST"; 
// 	 	var notifiObj = {'generalSettingValue':{}};
// 	 	if(customsettingsresponse != ""){
//  			notifiObj['generalSettingValue']	=  	customsettingsresponse; 
// 			notifiObj['generalSettingValue']["threshold5Color"] =  value;
// 	 	}else{
// 	 		notifiObj	=  	customsettingupdateDescription;
// 			notifiObj['generalSettingValue']["threshold5Color"] =  value;
// 	 	}
	 	 
// 	 	$.ajax({ 
// 	 		url : "/stratroom/customPerformance", 
// 	 		type : methodType, 
// 	 		contentType:"application/json", 
// 	 		data: JSON.stringify(notifiObj), 
// 	 		success : function(data,status){ 
// 	 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
// 	 	},
// 	 	error:function(){ 
// 	 		$.notify("Failed: Updated Failed", { 
// 	 		style: 'error',className: 'graynotify' }); 
// 	 		} 
// 	 	});
	 	
//     })

// }

function performancecolorpanelTrigger() {

}


function SecuritycontrolListShow(data){
	if(!securityview){
		$(".securitycontrol").remove();
		$("#securitycontrol").remove();
		return false;
	}
	
	/*if(!securityedit){
		$(".panel-tab :input").not(".opennextbtn").prop("disabled", true);
		$("input[type='radio']").prop('disabled',true)
		$(".initative_save_btn").not(".opennextbtn").attr("disabled",true);
	}*/
	
	if(!jQuery.isEmptyObject(securitycontrolupdateDescription)){
    	var type		=	(securitycontrolupdateDescription.securityType !=	undefined?securitycontrolupdateDescription.securityType:"");
		var name		=	(securitycontrolupdateDescription.name !=	undefined?securitycontrolupdateDescription.name:"");
		var config		=	(securitycontrolupdateDescription.config !=	undefined?securitycontrolupdateDescription.config:"");
		
    	$("#securityid").val(securitycontrolupdateDescription.orgId);
    	if(type	==	"SAML"){
    		$(".securitytype2").prop("checked","checked");
    		$("#samlname").val(name);
    		if(config	==	"URL" || config	==	"URL"){
    			$("#URL").show();
    			$("#MSettings").hide();
    			var metadataUrl		=	(securitycontrolupdateDescription.metadataUrl !=	undefined?securitycontrolupdateDescription.metadataUrl:"");
    			var samlserviceUrl	=	(securitycontrolupdateDescription.samlserviceUrl !=	undefined?securitycontrolupdateDescription.samlserviceUrl:"");
    			var samlentityID	=	(securitycontrolupdateDescription.samlentityID !=	undefined?securitycontrolupdateDescription.samlentityID:"");
    			var certificateFingerPrintAlgoritham	=	(securitycontrolupdateDescription.certificateFingerPrintAlgoritham !=	undefined?securitycontrolupdateDescription.certificateFingerPrintAlgoritham:"");
				$("#metadataurl").val(metadataUrl);
				$("#samlservice").val(samlserviceUrl);
				$("#samlentityID").val(samlentityID);
				$("#certificatefingerprintalg").val(certificateFingerPrintAlgoritham);    					
    		}else if(config	==	"MSettings"){
    			$("#URL").hide();
    			$("#MSettings").show();
    			var samlConsumerUrl	=	(securitycontrolupdateDescription.samlConsumerUrl !=	undefined?securitycontrolupdateDescription.samlConsumerUrl:"");
    			var samlserviceUrl	=	(securitycontrolupdateDescription.samlserviceUrl !=	undefined?securitycontrolupdateDescription.samlserviceUrl:"");
    			var samlentityID	=	(securitycontrolupdateDescription.samlentityID !=	undefined?securitycontrolupdateDescription.samlentityID:"");
    			var certificateFingerPrintAlgoritham	=	(securitycontrolupdateDescription.certificateFingerPrintAlgoritham !=	undefined?securitycontrolupdateDescription.certificateFingerPrintAlgoritham:"");
    			var singlesignOn	=	(securitycontrolupdateDescription.singlesignOn !=	undefined?securitycontrolupdateDescription.singlesignOn:"");
    			var certificateFingerPrint	=	(securitycontrolupdateDescription.certificateFingerPrint !=	undefined?securitycontrolupdateDescription.certificateFingerPrint:"");
    			
				$("#samlconsumer").val(samlConsumerUrl);
				$("#manualsamlservice").val(samlserviceUrl);
				$("#manualsamlentity").val(samlentityID);
				$("#manualsinglesignon").val(singlesignOn);
				$("#certificatefingerprint").val(certificateFingerPrint);
				$("#manualcertificatefingerprintalg").val(certificateFingerPrintAlgoritham);
    		}
    	}else if(type	==	"OC"){
    		$(".securitytype3").prop("checked","checked");
    		var applicationName	=	(securitycontrolupdateDescription.applicationName !=	undefined?securitycontrolupdateDescription.applicationName:"");
			var clientName	=	(securitycontrolupdateDescription.clientName !=	undefined?securitycontrolupdateDescription.clientName:"");
			var redirectUrl	=	(securitycontrolupdateDescription.redirectUrl !=	undefined?securitycontrolupdateDescription.redirectUrl:"");
			var description	=	(securitycontrolupdateDescription.description !=	undefined?securitycontrolupdateDescription.description:"");
			var accessTokenExpiry	=	(securitycontrolupdateDescription.accessTokenExpiry !=	undefined?securitycontrolupdateDescription.accessTokenExpiry:"");
			var jwtTokenExpiry	=	(securitycontrolupdateDescription.jwtTokenExpiry !=	undefined?securitycontrolupdateDescription.jwtTokenExpiry:"");
			var refreshTokenExpiry	=	(securitycontrolupdateDescription.refreshTokenExpiry !=	undefined?securitycontrolupdateDescription.refreshTokenExpiry:"");
			
			$("#applicationname").val(applicationName);
			$("#clientname").val(clientName);
			$("#redirecturl").val(redirectUrl);
			$("#description").val(description);
			$("#accesstokenexpiry").val(accessTokenExpiry);
			$("#jwttokenexpiry").val(jwtTokenExpiry);
			$("#refreshtokenexpiry").val(refreshTokenExpiry);
    	}
    }
}

function NotificationcontrolListShow(data){
	
	if(!notificationview){
		$(".notificationcontrol").remove();
		$(".notificationsetting").css("display","none");
		$("#notificationcontrol").remove();
	}
	
	//if(!notificationedit){
		//$(".notificationonoff").attr("disabled","disabled");
	//}
	
	if(!jQuery.isEmptyObject(data)){
    	if(data.generalSettingValue !=	null && data.generalSettingValue !=	undefined){
    		var notificationcontrolupdateDescription	=	data.generalSettingValue;
    		$("#notificationid").val(data.orgId);
    		if(notificationcontrolupdateDescription.notification	==	true){
	    		$(".notificationonoff").prop("checked","checked");
	    	}
	    	if(notificationcontrolupdateDescription.notification	==	false){
	    		$(".notificationsetting").css("display","none");
	    	}
    	}
    }else{
    	$(".notificationsetting").css("display","none");
    }
}

function DevicecontrolListShow(data){
	if(!deviceview){
		$(".devicecontrol").remove();
		$("#devicecontrol").remove();
		return false;
	}
	
	if(!jQuery.isEmptyObject(data)){
		if(data['deviceList'] !=	undefined && data['deviceList'] !=	"" && data['deviceList'] !=	null){
    		var device	=	data['deviceList'];
    		if(jQuery.inArray("Web", device) !== -1){
    			$("#webappdevice").prop("checked","checked");
    		}
    		if(jQuery.inArray("Mobile", device) !== -1){
    			$("#mobileappdevice").prop("checked","checked");
    		}
    	}
    }
}

function SchedulercontrolListShow(data){
	if(!schedulerview){
		$(".schedulercontrol").remove();
		$("#schedulercontrol").remove();
		return false;
	}
	
	if(!jQuery.isEmptyObject(data)){
    	if(data.generalSettingValue !=	null && data.generalSettingValue !=	undefined){
    		var notificationcontrolupdateDescription	=	data.generalSettingValue;
    		$("#schedulerid").val(data.orgId);
    		if(notificationcontrolupdateDescription.schedulertype !=	undefined){
    			$("#schedulertype").val(notificationcontrolupdateDescription.schedulertype);
    		}
    	}
    }
}

function BackupcontrolListShow(data){
	
	if(!backupview){
		$(".backupcontrol").remove();
		$("#backupcontrol").remove();
		return false;
	}
	/*if(!backupedit){
		$(".backupevent").prop("disabled", true);
		$("#backupcontrol :input").prop("disabled", true);
	}*/
	if(!jQuery.isEmptyObject(data)){
    	if(data.generalSettingValue !=	null && data.generalSettingValue !=	undefined){
    		var notificationcontrolupdateDescription	=	data.generalSettingValue;
    		$("#restoreid").val(data.orgId);
    		if(notificationcontrolupdateDescription.backupduration !=	undefined){
    			$("#backupduration").val(notificationcontrolupdateDescription.backupduration);
    		}
    		if(notificationcontrolupdateDescription.restorePath !=	undefined){
    			$(".restorepathlocation").text(notificationcontrolupdateDescription.restorePath);
    		}
    		if(notificationcontrolupdateDescription.backupPath !=	undefined){
    			$("input[name='browse_logo']").val(notificationcontrolupdateDescription.backupPath);
    		}
    		if(notificationcontrolupdateDescription.restoreStatus != undefined && notificationcontrolupdateDescription.restoreStatus == true){
    			$("#restorePath").prop("disabled", false);
    			$("#restorebutton").show();
    		}else {
    			$("#restorePath").prop("disabled", true);
    			$("#restorebutton").hide();
    		}
    		
    	}
    }
}

function scorestatuscheck(type,flag){
	if(type	==	"status"){
		$("#kpistatus").prop("checked","checked");
		$("#objectivestatus").prop("checked","checked");
		$("#perspectivestatus").prop("checked","checked");
		$("#scorecardstatus").prop("checked","checked");
	}else if(type == "score"){
		$("#kpiscore").prop("checked","checked");
		$("#objectivescore").prop("checked","checked");
		$("#perspectivescore").prop("checked","checked");
		$("#scorecardscore").prop("checked","checked");
	}
}

function ScorecardListShow(data) {
	console.log(data, "datascorecard");
	if(!scorecardview){
		$(".scorecardsettingscontrol").remove();
		$("#scorecardsettingscontrol").remove();
		return false;
	}
	/*if(!scorecardedit){
		$("#scorecardsettingscontrol :input").prop("disabled", true);
		$("#scorecardsettingscontrol input[type='radio']").prop('disabled',true)
	}*/
    if(!jQuery.isEmptyObject(data) && data != "" && data != null){
		console.log("stepone");
		customsettingsresponse	=	data;
		if(data.yearToDate !=	undefined && data.yearToDate == true){
			$("#yearToDate").prop("checked",true);
		}
		if(data.aggregation !=	undefined && data.aggregation == true){
			console.log("sggregatoin function");
			$("#aggregation").prop("checked",true);
			$("#agg_type").show();
			if(data.aggregationType !=	undefined){
				$("#ag-type").val(data.aggregationType);
			}
		}
		
		if(data.submeasurerequired !=	undefined && data.submeasurerequired == true){
			$("#submeasurerequired").prop("checked",true);
		}
		
		if(data.openformon !=	undefined && data.openformon != ""){
			$("#openformon").val(data.openformon);
		}
		
		if(data.closeformon !=	undefined && data.closeformon != ""){
			$("#closeformon").val(data.closeformon);
		}
		
		if(data.statusrequired ==	undefined){
			$("#custom_status").prop("checked",true);
			$("#cust_status").show();
			
			if(data.kpistatus	!=	undefined && data.kpistatus	==	true){
				$("#kpistatus").prop("checked","checked");
			}
			
			if(data.kpistatus	==	undefined){
				$("#kpistatus").prop("checked","checked");
			}
			
			if(data.perspectivestatus	!=	undefined && data.perspectivestatus	==	true){
				$("#perspectivestatus").prop("checked","checked");
			}
			
			if(data.perspectivestatus	==	undefined){
				$("#perspectivestatus").prop("checked","checked");
			}
			
			if(data.objectivestatus	!=	undefined && data.objectivestatus	==	true){
				$("#objectivestatus").prop("checked","checked");
			}
			if(data.objectivestatus	==	undefined){
				$("#objectivestatus").prop("checked","checked");
			}
			if(data.scorecardstatus	!=	undefined && data.scorecardstatus	==	true){
				$("#scorecardstatus").prop("checked","checked");
			}
			if(data.scorecardstatus	==	undefined){
				$("#scorecardstatus").prop("checked","checked");
			}
		}else if(data.statusrequired ==	false){
			$("#custom_status").prop("checked",false);
			
			if(data.kpistatus	!=	undefined && data.kpistatus	==	true){
				$("#kpistatus").prop("checked","checked");
			}
			
			if(data.kpistatus	==	undefined){
				$("#kpistatus").prop("checked","checked");
			}
			
			if(data.perspectivestatus	!=	undefined && data.perspectivestatus	==	true){
				$("#perspectivestatus").prop("checked","checked");
			}
			
			if(data.perspectivestatus	==	undefined){
				$("#perspectivestatus").prop("checked","checked");
			}
			
			if(data.objectivestatus	!=	undefined && data.objectivestatus	==	true){
				$("#objectivestatus").prop("checked","checked");
			}
			if(data.objectivestatus	==	undefined){
				$("#objectivestatus").prop("checked","checked");
			}
			if(data.scorecardstatus	!=	undefined && data.scorecardstatus	==	true){
				$("#scorecardstatus").prop("checked","checked");
			}
			if(data.scorecardstatus	==	undefined){
				$("#scorecardstatus").prop("checked","checked");
			}
		}else if(data.statusrequired !=	undefined && data.statusrequired == true){
			$("#custom_status").prop("checked",true);
			$("#cust_status").show();
			
			if(data.kpistatus	!=	undefined && data.kpistatus	==	true){
				$("#kpistatus").prop("checked","checked");
			}
			
			if(data.kpistatus	==	undefined){
				$("#kpistatus").prop("checked","checked");
			}
			
			if(data.perspectivestatus	!=	undefined && data.perspectivestatus	==	true){
				$("#perspectivestatus").prop("checked","checked");
			}
			
			if(data.perspectivestatus	==	undefined){
				$("#perspectivestatus").prop("checked","checked");
			}
			
			if(data.objectivestatus	!=	undefined && data.objectivestatus	==	true){
				$("#objectivestatus").prop("checked","checked");
			}
			if(data.objectivestatus	==	undefined){
				$("#objectivestatus").prop("checked","checked");
			}
			if(data.scorecardstatus	!=	undefined && data.scorecardstatus	==	true){
				$("#scorecardstatus").prop("checked","checked");
			}
			if(data.scorecardstatus	==	undefined){
				$("#scorecardstatus").prop("checked","checked");
			}
		}
		
		if(data.scorerequired ==	undefined){
			$("#custom_score").prop("checked",true);
			$("#cust_score").show();
			
			if(data.kpiscore	!=	undefined && data.kpiscore	==	true){
				$("#kpiscore").prop("checked","checked");
			}
			if(data.kpiscore	==	undefined){
				$("#kpiscore").prop("checked","checked");
			}
			if(data.perspectivescore	!=	undefined && data.perspectivescore	==	true){
				$("#perspectivescore").prop("checked","checked");
			}
			if(data.perspectivescore	==	undefined){
				$("#perspectivescore").prop("checked","checked");
			}
			if(data.objectivescore	!=	undefined && data.objectivescore	==	true){
				$("#objectivescore").prop("checked","checked");
			}
			if(data.objectivescore	==	undefined){
				$("#objectivescore").prop("checked","checked");
			}
			if(data.scorecardscoreper	!=	undefined && data.scorecardscoreper	==	true){
				$("#scorecardscoreper").prop("checked","checked");
			}
			
			if(data.scorecardscoreper	==	undefined){
				$("#scorecardscoreper").prop("checked","checked");
			}
			
		}else if(data.scorerequired ==	false){
			$("#custom_score").prop("checked",false);
			
			if(data.kpiscore	!=	undefined && data.kpiscore	==	true){
				$("#kpiscore").prop("checked","checked");
			}
			if(data.kpiscore	==	undefined){
				$("#kpiscore").prop("checked","checked");
			}
			if(data.perspectivescore	!=	undefined && data.perspectivescore	==	true){
				$("#perspectivescore").prop("checked","checked");
			}
			if(data.perspectivescore	==	undefined){
				$("#perspectivescore").prop("checked","checked");
			}
			if(data.objectivescore	!=	undefined && data.objectivescore	==	true){
				$("#objectivescore").prop("checked","checked");
			}
			if(data.objectivescore	==	undefined){
				$("#objectivescore").prop("checked","checked");
			}
			if(data.scorecardscoreper	!=	undefined && data.scorecardscoreper	==	true){
				$("#scorecardscoreper").prop("checked","checked");
			}
			
			if(data.scorecardscoreper	==	undefined){
				$("#scorecardscoreper").prop("checked","checked");
			}
			
		}else if(data.scorerequired !=	undefined && data.scorerequired == true){
			if(data.kpiscore	!=	undefined && data.kpiscore	==	true){
				$("#kpiscore").prop("checked","checked");
			}
			if(data.kpiscore	==	undefined){
				$("#kpiscore").prop("checked","checked");
			}
			if(data.perspectivescore	!=	undefined && data.perspectivescore	==	true){
				$("#perspectivescore").prop("checked","checked");
			}
			if(data.perspectivescore	==	undefined){
				$("#perspectivescore").prop("checked","checked");
			}
			if(data.objectivescore	!=	undefined && data.objectivescore	==	true){
				$("#objectivescore").prop("checked","checked");
			}
			if(data.objectivescore	==	undefined){
				$("#objectivescore").prop("checked","checked");
			}
			if(data.scorecardscoreper	!=	undefined && data.scorecardscoreper	==	true){
				$("#scorecardscoreper").prop("checked","checked");
			}
			
			if(data.scorecardscoreper	==	undefined){
				$("#scorecardscoreper").prop("checked","checked");
			}
			
			$("#custom_score").prop("checked",true);
			$("#cust_score").show();
		}
		
		if(data.customPerformance !=	undefined && data.customPerformance == true){
			$(".cus_perfor_sow").show();
			$(".perfor_sow").hide();
		}
		
		if(data.performance !=	undefined && data.performance == true){
			$(".cus_perfor_sow").hide();
			$(".perfor_sow").show();
		}
		
		if((data.performance !=	undefined && data.performance == false) && (data.customPerformance !=	undefined && data.customPerformance == false)){
			$(".cus_perfor_sow").show();
			$(".perfor_sow").show();
		}
		
		if(data.customPerformance !=	undefined && data.customPerformance == true){
			$("#custom_performance").prop("checked",true);
			$("#custom_threshold").show();
    		$("#custom_performances").show();
    		$(".color_picks_three").css("display","block");
    		if(data.threshold !=	undefined){
				$("#kpi_threshold").val(data.threshold);
				if(data.threshold	==	"three_status"){
					$(".color_picks_one").css("display","none");
					$(".color_picks_two").css("display","none");

					$(".color_picks_five").css("display","none");

					$(".color_picks_three").css("display","block");

					var elements = $(".color_picks_three");
					elements.removeClass("col-md-2").addClass("col-md-4");

				
					var colorValue1	=	null;
					var colorValue2	=	null;
					var colorValue3	=	null;
					var colorValue4	=	null;
					var colorValue5	=	null;
					if(data.threshold1Color !=	undefined){
						$(".cus_perfor_sow .input-group-append").find('span.optioncolor1').css('background',data.threshold1Color);
						colorValue1	=	data.threshold1Color;
					}else{
						$(".cus_perfor_sow .input-group-append").find('span.optioncolor1').css('background',"rgb(255 0 0)");
						colorValue1	=	"rgb(255 0 0)";
					}
					if(data.threshold2Color !=	undefined){
						$(".cus_perfor_sow .input-group-append").find('span.optioncolor2').css('background',data.threshold2Color);
						colorValue2	=	data.threshold2Color;
					}else{
						$(".cus_perfor_sow .input-group-append").find('span.optioncolor2').css('background',"rgb(255 255 0)");
						colorValue2	=	"rgb(255 255 0)";
					}
					if(data.threshold3Color !=	undefined){
						colorValue3	=	data.threshold3Color;
						$(".cus_perfor_sow .input-group-append").find('span.optioncolor3').css('background',data.threshold3Color);
					}else{
						$(".cus_perfor_sow .input-group-append").find('span.optioncolor3').css('background',"rgb(0 128 0)");
						colorValue3	=	"rgb(0 128 0)";
					}

					
					
					//if(scorecardedit ==	true || scorecardedit == true){
						colorpanelTrigger(colorValue1,colorValue2,colorValue3,colorValue4,colorValue5);
					//}
				}else if(data.threshold	==	"five_status"){
					$(".color_picks_one").css("display","none");
					$(".color_picks_two").css("display","none");
					$(".color_picks_three").css("display","none");

					$(".color_picks_five").css("display","block");

					var elements = $(".color_picks_five");
					elements.removeClass("col-md-4").addClass("col-md-2");

					var colorValue1	=	null;
					var colorValue2	=	null;
					var colorValue3	=	null;
					var colorValue4	=	null;
					var colorValue5	=	null;

					if(data.threshold1Color !=	undefined){
						$(".cus_perfor_sow .input-group-append").find('span.optioncolor1').css('background',data.threshold1Color);
						colorValue1	=	data.threshold1Color;
					}else{
						$(".cus_perfor_sow .input-group-append").find('span.optioncolor1').css('background',"rgb(255 0 0)");
						colorValue1	=	"rgb(255 0 0)";
					}
					if(data.threshold2Color !=	undefined){
						$(".cus_perfor_sow .input-group-append").find('span.optioncolor2').css('background',data.threshold2Color);
						colorValue2	=	data.threshold2Color;
					}else{
						$(".cus_perfor_sow .input-group-append").find('span.optioncolor2').css('background',"rgb(255, 75, 62)");
						colorValue2	=	"rgb(255, 75, 62)";
					}
					if(data.threshold3Color !=	undefined){
						colorValue3	=	data.threshold3Color;
						$(".cus_perfor_sow .input-group-append").find('span.optioncolor3').css('background',data.threshold3Color);
					}else{
						$(".cus_perfor_sow .input-group-append").find('span.optioncolor3').css('background',"rgb(0 128 0)");
						colorValue3	=	"rgb(255, 193, 7)";
					}

					if(data.threshold4Color !=	undefined){
						colorValue4	=	data.threshold4Color;
						$(".cus_perfor_sow .input-group-append").find('span.optioncolor4').css('background',data.threshold4Color);
					}else{
						$(".cus_perfor_sow .input-group-append").find('span.optioncolor4').css('background',"rgb(95, 205, 95)");
						colorValue4	=	"rgb(95, 205, 95)";
					}

					if(data.threshold5Color !=	undefined){
						colorValue5	=	data.threshold5Color;
						$(".cus_perfor_sow .input-group-append").find('span.optioncolor5').css('background',data.threshold5Color);
					}else{
						$(".cus_perfor_sow .input-group-append").find('span.optioncolor5').css('background',"rgb(2, 125, 2)");
						colorValue5	=	"rgb(2, 125, 2)";
					}
					
					//if(scorecardedit ==	true || scorecardedit == true){
						colorpanelTrigger(colorValue1,colorValue2,colorValue3,colorValue4,colorValue5);
					//}
				}
			}else{
				var colorValue1	=	null;
				var colorValue2	=	null;
				var colorValue3	=	null;
				var colorValue4	=	null;
				var colorValue5 =	null;

				if(data.threshold1Color !=	undefined){
					$(".cus_perfor_sow .input-group-append").find('span.optioncolor1').css('background',data.threshold1Color);
					colorValue1	=	data.threshold1Color;
				}else{
					$(".cus_perfor_sow .input-group-append").find('span.optioncolor1').css('background',"rgb(255 0 0)");
					colorValue1	=	"rgb(255 0 0)";
				}
				if(data.threshold2Color !=	undefined){
					$(".cus_perfor_sow .input-group-append").find('span.optioncolor2').css('background',data.threshold2Color);
					colorValue2	=	data.threshold2Color;
				}else{
					$(".cus_perfor_sow .input-group-append").find('span.optioncolor2').css('background',"rgb(255 255 0)");
					colorValue2	=	"rgb(255 255 0)";
				}
				if(data.threshold3Color !=	undefined){
					colorValue3	=	data.threshold3Color;
					$(".cus_perfor_sow .input-group-append").find('span.optioncolor3').css('background',data.threshold3Color);
				}else{
					$(".cus_perfor_sow .input-group-append").find('span.optioncolor3').css('background',"rgb(0 128 0)");
					colorValue3	=	"rgb(0 128 0)";
				}
				
				//if(scorecardedit ==	true || scorecardedit == true){
					colorpanelTrigger(colorValue1,colorValue2,colorValue3, colorValue4, colorValue5);
				//}
			}
		}
		
		if(data.performance !=	undefined && data.performance == true){
			$("#performance").prop("checked",true);
			$("#performances").show();
			$("#threshold").show();
    		$(".color_picks_03").css("display","block");
    		if(data.threshold !=	undefined){
				$("#kpi_threshold1").val(data.threshold);
				
				 if(data.threshold	==	"three_status"){
					$(".color_picks_01").css("display","none");
					$(".color_picks_02").css("display","none");
					$(".color_picks_05").css("display","none");

					$(".color_picks_03").css("display","block");
					var elements = $(".color_picks_03");
					elements.removeClass("col-md-2").addClass("col-md-4");

					if(data.threshold1Color !=	undefined){
						$(".perfor_sow  .input-group-append").find('span.optioncolor1').css('background',data.threshold1Color);
						var colorValue1	=	data.threshold1Color;
					}else{
						$(".perfor_sow  .input-group-append").find('span.optioncolor1').css('background',"red");
						var colorValue1	=	"rgb(255 0 0)";
					}
					if(data.threshold2Color !=	undefined){
						$(".perfor_sow  .input-group-append").find('span.optioncolor2').css('background',data.threshold2Color);
						var colorValue2	=	data.threshold2Color;
					}else{
						$(".perfor_sow  .input-group-append").find('span.optioncolor2').css('background',"yellow");
						var colorValue2	=	"rgb(0 128 0)";
					}
					if(data.threshold3Color !=	undefined){
						$(".perfor_sow  .input-group-append").find('span.optioncolor3').css('background',data.threshold3Color);
						var colorValue3	=	data.threshold3Color;
					}else{
						$(".perfor_sow  .input-group-append").find('span.optioncolor3').css('background',"green");
						var colorValue3	=	"rgb(255 255 0)";
					}
					//if(scorecardedit ==	true || scorecardedit == true){
						performancecolorpanelTrigger(colorValue1,colorValue2,colorValue3, colorValue4, colorValue5);
					//}
				}else if(data.threshold	==	"five_status"){
					$(".color_picks_01").css("display","none");
					$(".color_picks_02").css("display","none");
					$(".color_picks_03").css("display","none");
					$(".color_picks_05").css("display","block");

					var elements = $(".color_picks_05");
					elements.removeClass("col-md-4").addClass("col-md-2");


					if(data.threshold1Color !=	undefined){
						$(".perfor_sow  .input-group-append").find('span.optioncolor1').css('background',data.threshold1Color);
						var colorValue1	=	data.threshold1Color;
					}else{
						$(".perfor_sow  .input-group-append").find('span.optioncolor1').css('background',"red");
						var colorValue1	=	"rgba(255, 0, 0, 1)";
					}

					if(data.threshold2Color !=	undefined){
						$(".perfor_sow  .input-group-append").find('span.optioncolor2').css('background',data.threshold2Color);
						var colorValue2	=	data.threshold2Color;
					}else{
						$(".perfor_sow  .input-group-append").find('span.optioncolor2').css('background',"#FF4B3E");
						var colorValue2	=	"rgba(255, 75, 62, 1)";

					}

					if(data.threshold3Color !=	undefined){
						$(".perfor_sow  .input-group-append").find('span.optioncolor3').css('background',data.threshold3Color);
						var colorValue3	=	data.threshold3Color;
					}else{
						$(".perfor_sow  .input-group-append").find('span.optioncolor3').css('background',"yellow");
						var colorValue3	=	"rgba(255, 193, 7, 1)";
					}
					if(data.threshold4Color !=	undefined){
						$(".perfor_sow  .input-group-append").find('span.optioncolor4').css('background',data.threshold4Color);
					var	colorValue4	=	data.threshold4Color;
					}else{
						$(".perfor_sow  .input-group-append").find('span.optioncolor4').css('background',"#5FCD5F");
					var	colorValue4	=	"rgb(95, 205, 95)";
					}

					if(data.threshold5Color !=	undefined){
						$(".perfor_sow  .input-group-append").find('span.optioncolor5').css('background',data.threshold5Color);
					var	colorValue5	=	data.threshold5Color;
					}else{
						$(".perfor_sow  .input-group-append").find('span.optioncolor5').css('background',"green");
					var	colorValue5	=	"rgba(2, 125, 2, 1)";
					}
					//if(scorecardedit ==	true || scorecardedit == true){
						// performancecolorpanelTrigger(colorValue1,colorValue2,colorValue3,colorValue4,colorValue5);
					//}
				}
			}else{
				var colorValue1	=	null;
				var colorValue2	=	null;
				var colorValue3	=	null;
				var colorValue4	=	null;
				var colorValue5	=	null;

				
				if(data.threshold1Color !=	undefined){
					$(".perfor_sow  .input-group-append").find('span.optioncolor1').css('background',data.threshold1Color);
					colorValue1	=	data.threshold1Color;
				}else{
					$(".perfor_sow  .input-group-append").find('span.optioncolor1').css('background',"rgb(255 0 0)");
					colorValue1	=	"rgb(255 0 0)";
				}
				if(data.threshold2Color !=	undefined){
					$(".perfor_sow  .input-group-append").find('span.optioncolor2').css('background',data.threshold2Color);
					colorValue2	=	data.threshold2Color;
				}else{
					$(".perfor_sow  .input-group-append").find('span.optioncolor2').css('background',"rgb(255 255 0)");
					colorValue2	=	"rgb(255 255 0)";
				}
				if(data.threshold3Color !=	undefined){
					colorValue3	=	data.threshold3Color;
					$(".perfor_sow  .input-group-append").find('span.optioncolor3').css('background',data.threshold3Color);
				}else{
					$(".perfor_sow  .input-group-append").find('span.optioncolor3').css('background',"rgb(0 128 0)");
					colorValue3	=	"rgb(0 128 0)";
				}
				
				//if(scorecardedit ==	true || scorecardedit == true){
					performancecolorpanelTrigger(colorValue1,colorValue2,colorValue3,colorValue4,colorValue5);
				//}
			}
		}
		

		if(data.threshold1 !=	undefined){
			$(".perfor_sow  #optioncolor1").val(data.threshold1);
			$(".cus_perfor_sow  #optioncolor1").val(data.threshold1);

		}
		if(data.threshold2 !=	undefined){
			$(".perfor_sow  #optioncolor2").val(data.threshold2);
			$(".cus_perfor_sow  #optioncolor2").val(data.threshold2);

		}
		if(data.threshold3 !=	undefined){
			$(".perfor_sow  #optioncolor3").val(data.threshold3);
			$(".cus_perfor_sow  #optioncolor3").val(data.threshold3);

		}
		if(data.threshold4 !=	undefined){
			$(".perfor_sow  #optioncolor4").val(data.threshold4);
			$(".cus_perfor_sow  #optioncolor4").val(data.threshold4);

		}

		if(data.threshold5 !=	undefined){
			$(".perfor_sow  #optioncolor5").val(data.threshold5);
			$(".cus_perfor_sow  #optioncolor5").val(data.threshold5);

		}
		
	
		/*
		if(data.performance ==	undefined || data.performance == false){
			var colorValue1	=	null;
			var colorValue2	=	null;
			var colorValue3	=	null;
			var colorValue4	=	null;
			var colorValue5	=	null;

			$(".input-group-append").find('span.optioncolor1').css('background',"rgb(255 0 0)");
			colorValue1	=	"rgb(255 0 0)";
			$(".input-group-append").find('span.optioncolor2').css('background',"rgb(255 255 0)");
			colorValue2	=	"rgb(255 255 0)";
			$(".input-group-append").find('span.optioncolor3').css('background',"rgb(0 128 0)");
			colorValue3	=	"rgb(0 128 0)";	
			//if(scorecardedit ==	true || scorecardedit == true){
				performancecolorpanelTrigger(colorValue1,colorValue2,colorValue3);
			//}
		}
		*/
		if(data.customKPI !=	undefined && data.customKPI == true){
			$("#customKPI").prop("checked",true);
		}
		if(data.customObjective !=	undefined && data.customObjective == true){
			$("#customObjective").prop("checked",true);
		}
		if(data.customPerspective !=	undefined && data.customPerspective == true){
			$("#customPerspective").prop("checked",true);
			$("#persp_derivation").show();
			if(data.derivation !=	undefined){
				$("#derivation").val(data.derivation);
			}
		}
		if(data.datatableactual !=	undefined && data.datatableactual == true){
			$("#datatableactual").prop("checked",true);
		}
		if(data.datatabletarget !=	undefined && data.datatabletarget == true){
			$("#datatabletarget").prop("checked",true);
		}
		if(data.datatablegap !=	undefined && data.datatablegap == true){
			$("#datatablegap").prop("checked",true);
		}

		if(data.datatablebaseline !=	undefined && data.datatablebaseline == true){
			$("#datatablebaseline").prop("checked",true);
		}
		if(data.datatableytd !=	undefined && data.datatableytd == true){
			$("#datatableytd").prop("checked",true);
		}
		if(data.datatableannualtarget !=	undefined && data.datatableannualtarget == true){
			$("#datatableannualtarget").prop("checked",true);
		}
		if(data.drilltableactual !=	undefined && data.drilltableactual == true){
			$("#drilltableactual").prop("checked",true);
		}
		if(data.drilltabletarget !=	undefined && data.drilltabletarget == true){
			$("#drilltabletarget").prop("checked",true);
		}
		if(data.drilltablebaseline !=	undefined && data.drilltablebaseline == true){
			$("#drilltablebaseline").prop("checked",true);
		}
		if(data.drilltablegap !=	undefined && data.drilltablegap == true){
			$("#drilltablegap").prop("checked",true);
		}

		console.log("stepTwo");
		console.log(data.scorecardactual, "actualValue");
		if(data.scorecardactual !=	undefined && data.scorecardactual == true){
			$("#scorecardactual").prop("checked",true);
			console.log("ffffuffu");
		}

		if(data.scorecardbaseline !=	undefined && data.scorecardbaseline == true){
			$("#scorecardbaseline").prop("checked",true);
			console.log("ffffuffu");
		}

		if(data.scorecarddecline !=	undefined && data.scorecarddecline == true){
			$("#scorecarddecline").prop("checked",true);
			console.log("ffffuffu");
		}

		if(data.scorecardtarget !=	undefined && data.scorecardtarget == true){
			$("#scorecardtarget").prop("checked",true);
		}
		if(data.scorecardbudget !=	undefined && data.scorecardbudget == true){
			$("#scorecardbudget").prop("checked",true);
		}
		if(data.scorecardforecast !=	undefined && data.scorecardforecast == true){
			$("#scorecardforecast").prop("checked",true);
		}
		if(data.scorecardscore !=	undefined && data.scorecardscore == true){
			$("#scorecardscore").prop("checked",true);
		}
		if(data.scorecardtrend !=	undefined && data.scorecardtrend == true){
			$("#scorecardtrend").prop("checked",true);
		}
		if(data.scorecardrisk !=	undefined && data.scorecardrisk == true){
			$("#scorecardrisk").prop("checked",true);
		}
    }
   
	
				
}


function populateDataScore(data) {
	$('.firstsectionscore').empty();
    $('.secondsectionscore').empty();

	data.forEach(function(item) {
		var htmlContent = `
			<div class="col-lg-8">
				<strong class="editableTxt1 description" contenteditable="true" data-priority="${item.priority}" data-original="${item.description}">
					${item.description}
				</strong>
			</div>
			<div class="col-lg-4">
				<strong class="editableTxt1 ml-4 align-items-end score" contenteditable="true" data-priority="${item.priority}" data-original="${item.score}">
					${item.score}
				</strong>
			</div>`;
		// Append to the appropriate column based on some condition, for example, priority
		if (item.priority <= 5) {
			$('.firstsectionscore').append(htmlContent);
		} else {
			$('.secondsectionscore').append(htmlContent);
		}
	});
}


function risklistshow(data) {

	if(!riskview){
		$(".risksettingscontrol").remove();
		$("#risksettingscontrol").remove();
		return false;
	}

	$.ajax({
			type : "GET",
			url : "/stratroom/riskoptionlist",
			async:false,
			success : function(data) {
				$(".modal-custom-select").each(function() {
					// Remove all options except the first one if it's 'Choose' or similar
					$(this).find('option').not(':first').remove();
		
					// Optionally, if you want to remove all including the first
					// $(this).empty();
				});
		
				$.each(data,function(forindex,item){
					var targetSelect = $("#" + item.type+"-select");  // Example, maps to #cause, #category, etc.
					if (targetSelect.length) {
						// Add the option to the select
						targetSelect.append(new Option(item.option, item.value));
					}
					
				})

				$("#category-select").append(new Option("Add", "addOption", false, false)).addClass("btn btn-primary");
				$("#possible-select").append(new Option("Add", "addOption", false, false)).addClass("btn btn-primary");
				$("#rating-select").append(new Option("Add", "addOption", false, false)).addClass("btn btn-primary");
				$("#riskcategory-select").append(new Option("Add", "addOption", false, false)).addClass("btn btn-primary");
				$("#controltypes-select").append(new Option("Add", "addOption", false, false)).addClass("btn btn-primary");
				$("#controleffectiveness-select").append(new Option("Add", "addOption", false, false)).addClass("btn btn-primary");
				$("#action-select").append(new Option("Add", "addOption", false, false)).addClass("btn btn-primary");
				$("#residualriskscore-select").append(new Option("Add", "addOption", false, false)).addClass("btn btn-primary");
				$("#inherentriskscore-select").append(new Option("Add", "addOption", false, false)).addClass("btn btn-primary");

			}
		});

		$.ajax({
			type : "GET",
			url : "/stratroom/riskcustomscore",
			async:false,
			success : function(data) {
					populateDataScore(data);
			}
		});
	/*if(!scorecardedit){
		$("#scorecardsettingscontrol :input").prop("disabled", true);
		$("#scorecardsettingscontrol input[type='radio']").prop('disabled',true)
	}*/
    if(!jQuery.isEmptyObject(data) && data != "" && data != null){
		customsettingsresponse	=	data;
		if(data.riskinherentscore !=	undefined && data.riskinherentscore == true){
			$("#riskinherentscore").prop("checked",true);
		}
		if(data.riskresidualscore !=	undefined && data.riskresidualscore == true){
			$("#riskresidualscore").prop("checked",true);
		
		}
		
		if(data.riskrelatedparties !=	undefined && data.riskrelatedparties == true){
			$("#riskrelatedparties").prop("checked",true);
		}
		
		if(data.riskpos !=	undefined && data.riskpos != ""){
			$("#riskpos").prop("checked",true);
		}
		
		if(data.riskiso !=	undefined && data.riskiso != ""){
			$("#riskiso").prop("checked",true);
		}

		if(data.riskinformationasset !=	undefined && data.riskinformationasset != ""){
			$("#riskinformationasset").prop("checked",true);
		}

		if(data.riskpersonincharge !=	undefined && data.riskpersonincharge != ""){
			$("#riskpersonincharge").prop("checked",true);
		}
		

		


		if(data.cause_input !=	undefined && data.cause_input == true){
			$("#cause-input").prop("checked",true);
			$("#cause-input-1").show();
		}
		
		if(data.cousecategory !=	undefined && data.cousecategory != ""){
			$("#cousecategory").prop("checked",true);
			$("#cousecategory-1").show();

			
		}
		
		if(data.Consequence_input !=	undefined && data.Consequence_input != ""){
			$("#Consequence-input").prop("checked",true);
			$("#Consequence-input-1").show();

		}

		if(data.possibleeve !=	undefined && data.possibleeve != ""){
			$("#possibleeve").prop("checked",true);
			$("#possibleeve-1").show();

		}

		if(data.ImpactDescription !=	undefined && data.ImpactDescription != ""){
			$("#ImpactDescription").prop("checked",true);
			$("#ImpactDescription-1").show();

		}
		

		if(data.couserating !=	undefined && data.couserating != ""){
			$("#couserating").prop("checked",true);
			$("#couserating-1").show();

		}

		if(data.possibilitydescription !=	undefined && data.possibilitydescription != ""){
			$("#possibilitydescription").prop("checked",true);
			$("#possibilitydescription-1").show();

		}


		if(data.riskcategory !=	undefined && data.riskcategory != ""){
			$("#riskcategory").prop("checked",true);
			$("#riskcategory-1").show();

		}

		if(data.controlbtn !=	undefined && data.controlbtn != ""){
			$("#controlbtn").prop("checked",true);
			$("#controlbtn-1").show();

		}


		if(data.effectivenessbtn !=	undefined && data.effectivenessbtn != ""){
			$("#effectivenessbtn").prop("checked",true);
			$("#effectivenessbtn-1").show();

		}

		if(data.actionbtn !=	undefined && data.actionbtn != ""){
			$("#actionbtn").prop("checked",true);
			$("#actionbtn-1").show();

		}


		if(data.riskcustomscore !=	undefined && data.riskcustomscore != ""){
			$("#riskcustomscore").prop("checked",true);
			$("#riskcustomscore-1").show();

		}

		if(data.riskderivations !=	undefined && data.riskderivations != ""){
			$("#riskderivations").prop("checked",true);
			$("#riskderivations-1").show();

		}

		if(data.riskresidual !=	undefined && data.riskresidual != ""){
			$("#riskresidual").prop("checked",true);
			$("#riskresidual-1").show();

		}
		
		
    }
   
	
				
}

function resetloginvalue(msg){
	$("#login_logo").val('');
	$("#login_logo").attr('src','');
	$(".preview-zone:eq(0)").find('.box-body').empty();
	logoreaderValue	=	"";
	$.notify(msg, {
		style: 'error',
		className: 'graynotify'
	});
}

function resetlogovalue(msg){
	$("#application_logo").val('');
	$("#application_logo").attr('src','');
	$(".preview-zone:eq(1)").find('.box-body').empty();
	logoreaderValue	=	"";
	$.notify(msg, {
		style: 'error',
		className: 'graynotify'
	});
}

var _URL = window.URL || window.webkitURL;

$("#login_logo").change(function(e) {
	console.log(this, "onchange image");
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}
	var file, img;
    if ((file = this.files[0])) {
    	if(this.files[0].size <= 300000){
    		logoreadFile(this);
    	}else{
    		resetloginvalue("Login theme should be within 300kb");
    		return false;
    	}
    	
        img = new Image();
        img.onload = function() {
        	if(this.width <= 1310 && this.height <= 1100){
        	}else{
        		resetloginvalue("Login theme dimension upto 1310x1100");
        	}
        };
        img.onerror = function() {
        	resetloginvalue("Login theme is invalid kindly retry");
        };
        img.src = _URL.createObjectURL(file);
    }
});

var _URL1 = window.URL || window.webkitURL;

$("#application_logo").change(function () {
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}
	var file1, img1;
    if ((file1 = this.files[0])) {
		if(this.files[0].size <= 700000){
			appreadFile(this);
		}else{
			resetlogovalue("Logo theme should be within 700kb");
    		return false;
		}
		
		img1 = new Image();
        img1.onload = function() {
        	if(this.width <= 8050 && this.height <= 3350){
        	}else{
        		resetlogovalue("Logo theme dimension upto 8050x3350");
        	}
        };
        img1.onerror = function() {
        	resetlogovalue("Logo theme is invalid kindly retry");
        };
        img1.src = _URL1.createObjectURL(file1);
    }	
});


var logoreaderValue = '';
var appreaderValue = '';
var imgwidth = 0;
var loginImageValeue = ''

// Function to handle logo upload
function logoreadFile(input) {
	console.log(input, "login image");
    if (input.files && input.files[0]) {		
        file = input.files[0];
        var objectUrl = URL.createObjectURL(file);
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            logoreaderValue = reader.result;
			loginImageValeue = reader.result;
			console.log(reader.result, logoreaderValue,loginImageValeue, "imageresult");
            // Update the preview image
            $(input).closest('.form-group').find('.user-image img').attr('src', reader.result);
        }  
    }
}

// Function to handle app/banner upload
function appreadFile(input) {	
	console.log(input, "login logo")	
    if (input.files && input.files[0]) {		
        file = input.files[0];			
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {		        
            appreaderValue = reader.result;
			console.log(reader.result, "logoresult");
            // Update the preview image
            $(input).closest('.form-group').find('.user-image img').attr('src', reader.result);
        }  
    }
}

// Initialize color picker and event handlers
// $(document).ready(function() {
//     // Set up file input change handlers
//     $('.logo-card input[type="file"]').change(function() {
//         logoreadFile(this);
//     });
    
//     $('.banner-card input[type="file"]').change(function() {
//         appreadFile(this);
//     });
    
//     // Set up color selection
//     $('.template-customizer-colors-options .custom-option-body').click(function() {
//         // Remove selected class from all options
//         $('.template-customizer-colors-options .custom-option-body').removeClass('selected');
//         // Add selected class to clicked option
//         $(this).addClass('selected');
//     });
    
//     // Initialize custom color picker
//     const pickr = Pickr.create({
//         el: '#customColorPicker',
//         theme: 'classic',
//         default: $('#themecontrol .input-group-append').children().css('background-color') || '#7367f0',
//         swatches: [
//             '#883B71',
//             '#7367f0',
//             '#0D9394',
//             '#FFAB1D',
//             '#EB3D63',
//             '#2092EC'
//         ],
//         components: {
//             preview: true,
//             opacity: true,
//             hue: true,
//             interaction: {
//                 hex: true,
//                 rgba: true,
//                 hsva: true,
//                 input: true,
//                 save: true
//             }
//         }
//     });
    
//     pickr.on('save', (color, instance) => {
//         const selectedColor = color.toHEXA().toString();
//         // Update the selected color
//         $('.template-customizer-colors-options .custom-option-body').removeClass('selected');
//     });
// });

$(".themesavesettings").click(function(){
	console.log($("#customColorPicker").val(), "colorvalue");
	console.log("function clicked");
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}

	var selectedColor = localStorage.getItem('stratroomPrimaryColor') || 'rgb(115, 103, 240)';
	var selectedTheme = localStorage.getItem('theme') || 'light';


	// if(window.pickrInstance && window.pickrInstance.getColor()) {
    //     selectedColor = window.pickrInstance.getColor().toHEXA().toString();
	// 	console.log("selectedColor", selectedColor);
    // } 
    // // Otherwise get the selected color from the predefined options
    // else {
    //     selectedColor = $('.template-customizer-colors-options .custom-option-body.selected').data('color');
	// 	console.log("selectedColor", selectedColor);
    // }
    
	$(".brandingcolor").next('.input-group-append').children().css('background');
	var id	=	$("#themeid").val();
	var action	=	"add";
	var methodType	=	"POST";
	if (id != undefined && id != "") {
		action 		= 	"edit";
		methodType	=	"PUT";
	}
	
	console.log(logoreaderValue,loginImageValeue,  "logoreaderValue");
	var themeObj	=	{"loginLogo":logoreaderValue,"loginTheme":appreaderValue,"themeColor":selectedColor, "themeName": selectedTheme};
	// var themeObj = new FormData();
	if ($("#login_logo").prop('files').length > 0) {
		
		console.log(logoreaderValue, loginImageValeue, "GSSS");
		themeObj.loginLogo	=	logoreaderValue;
	}else{
		console.log("this one is applied");
		themeObj.loginLogo	=	themecontrolupdateDescription.loginLogo;
	}
	
	if ($("#application_logo").prop('files').length > 0) {
		// var file = $("#application_logo").prop('files')[0];
		// themeObj.append("loginTheme", file);
		console.log(appreaderValue, "Ganesh")
		themeObj.loginTheme	=	appreaderValue;
	}else{
		themeObj.loginTheme	=	themecontrolupdateDescription.loginTheme;
	}
	
	if (id != undefined && id != "") {
		themeObj.orgId	=	id;
	}
	
	$(".page-loader-wrapper").css("display","block");
	$.ajax({
		url : "/stratroom/theme",
		type : methodType,
		contentType: "application/json",
        data: JSON.stringify(themeObj),
		success : function(data, status) {
			location.reload(true);
			$(".page-loader-wrapper").css("display","none");
			$("#themecontrol .input-group-append").children().removeClass("pickr");
	    	$("#themecontrol .input-group-append").children().addClass("pickrtheme");
			colorEditTrigger($("#themecontrol .pickrtheme")[0],$("#themecontrol .input-group-append").children().css('background-color'));
			if(data.controlPanelThemeDTO.orgId !=	undefined){
				$("#themeid").val(data.controlPanelThemeDTO.orgId)
				$(".menulistaccess").find("li.active").css("border-left","4px solid "+data.controlPanelThemeDTO.themeColor);
				if(data.controlPanelThemeDTO.loginTheme !=	null && data.controlPanelThemeDTO.loginTheme !=	undefined && data.controlPanelThemeDTO.loginTheme  !=	""){
					$(".applogofinal").attr("src",data.controlPanelThemeDTO.loginTheme);
				}
			}
			$.notify("Success: Updated Successfully", {
							  style: 'success',
							  className: 'graynotify'
							});
							
		},
		error:function(){
			$(".page-loader-wrapper").css("display","none");
			$.notify("Failed: Updated Failed", {
							  style: 'error',
							  className: 'graynotify'
							});
		}
	});
	
});



$(".notificationonoff").click(function(){
	if(commoncontrolupdateDescription.length	==	0){
		$.notify("Failed: Please update general setting then try again", {
							  style: 'error',
							  className: 'graynotify'
							});
		return false;
	}
	var notificationprop	=	$(this).is(":checked");
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}
	
	var id	=	$("#notificationid").val();
	var action	=	"add";
	var methodType	=	"POST";
	if (id != undefined && id != "") {
		action 		= 	"edit";
		methodType	=	"PUT";
	}
	
	if(action == "edit" && (commoncontrolupdateDescription !== undefined && commoncontrolupdateDescription != "")){
		var	notifiObj	=	{};
		$.each(commoncontrolupdateDescription,function(index,value){
			notifiObj[index]	=	value;
			if(index	==	'generalSettingValue'){
				if(value	!=	null){
					$.each(commoncontrolupdateDescription.generalSettingValue,function(general,objval){
						// if(general == 'notification'){
							// notifiObj['generalSettingValue']['notification']
							// = notificationprop;
						// }else{
							notifiObj['generalSettingValue'][general]	=	objval;
						// }
					});
				}		
			}		
		});
		notifiObj['generalSettingValue']['notification']	=	notificationprop;
	}else{
		var	notifiObj	=	commoncontrolupdateDescription;
		notifiObj['generalSettingValue']	=	{'notification':notificationprop};
	}
	
	if (id != undefined && id != "") {
		notifiObj.orgId	=	id;
	}
	
	$.ajax({
		url : "/stratroom/generalSetting",
		type : methodType,
		contentType: "application/json",
        data: JSON.stringify(notifiObj),
		success : function(data, status) {
			if(data.controlPanelGeneralDTO.orgId !=	undefined){
				$("#notificationid").val(data.controlPanelGeneralDTO.orgId)
				if(notificationprop	==	true){
					$(".notificationsetting").css("display","block");
				}else{
					$(".notificationsetting").css("display","none");
				}
			}
			$.notify("Success: Updated Successfully", {
							  style: 'success',
							  className: 'graynotify'
							});
		},
		error:function(){
			$.notify("Failed: Updated Failed", {
							  style: 'error',
							  className: 'graynotify'
							});
		}
	});
});

$(".schedulerevent").click(function(){
	if(commoncontrolupdateDescription.length	==	0){
		$.notify("Failed: Please update general setting then try again", {
							  style: 'error',
							  className: 'graynotify'
							});
		return false;
	}
	var schedulertype	=	$("#schedulertype").val();
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}
	
	var id	=	$("#schedulerid").val();
	var action	=	"add";
	var methodType	=	"POST";
	if (id != undefined && id != "") {
		action 		= 	"edit";
		methodType	=	"PUT";
	}
	
	if(action == "edit" && (commoncontrolupdateDescription !== undefined && commoncontrolupdateDescription != "")){
		var	notifiObj	=	{};
		$.each(commoncontrolupdateDescription,function(index,value){
			notifiObj[index]	=	value;
			if(index	==	'generalSettingValue'){
				if(value	!=	null){
					$.each(commoncontrolupdateDescription.generalSettingValue,function(general,objval){
						notifiObj['generalSettingValue'][general]	=	objval;		
					});
				}		
			}		
		});
		notifiObj['generalSettingValue']['schedulertype']	=	schedulertype;
	}else{
		var	notifiObj	=	commoncontrolupdateDescription;
		notifiObj['generalSettingValue']	=	{'schedulertype':schedulertype};
	}
	
	if (id != undefined && id != "") {
		notifiObj.orgId	=	id;
	}
	
	$.ajax({
		url : "/stratroom/generalSetting",
		type : methodType,
		contentType: "application/json",
        data: JSON.stringify(notifiObj),
		success : function(data, status) {
			if(data.controlPanelGeneralDTO.orgId !=	undefined){
				$("#schedulerid").val(data.controlPanelGeneralDTO.orgId)
			}
			$.notify("Success: Updated Successfully", {
							  style: 'success',
							  className: 'graynotify'
							});
		},
		error:function(){
			$.notify("Failed: Updated Failed", {
							  style: 'error',
							  className: 'graynotify'
							});
		}
	});
});



$(".backupevent").click(function(){
	if(commoncontrolupdateDescription.length	==	0){
		$.notify("Failed: Please update general setting then try again", {
							  style: 'error',
							  className: 'graynotify'
							});
		return false;
	}
	/*
	 * if(commoncontrolupdateDescription.length != 0){
	 * if(commoncontrolupdateDescription.generalSettingValue != undefined &&
	 * commoncontrolupdateDescription.generalSettingValue.schedulertype ==
	 * undefined){ $.notify("Failed: Please update scheduler setting then try
	 * again", "success"); return false; } }
	 */
	
	var backupduration	=	$("#backupduration").val();
	var browselocation	=	$("input[name='browse_logo']").val();
	
	if(browselocation	==	"" || browselocation	==	" " || browselocation	==	"0"){
		$.notify("Failed: please give back path then try again", {
							  style: 'error',
							  className: 'graynotify'
							});
		return false;
	}
	
	/*
	 * if(browselocation.indexOf('.sql') == "-1" && (browselocation.indexOf('/') ==
	 * "-1" || browselocation.indexOf('\\') == "-1")){ $.notify("Failed: please
	 * mention sql path and provide valid path then try again", "error"); return
	 * false; }
	 */
	
	if(browselocation.indexOf('.') && browselocation.indexOf('\\')){
		browselocation	=	browselocation.replace("\\/g","/");
	}
	
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}
	
	var id	=	$("#restoreid").val();
	var action	=	"add";
	var methodType	=	"POST";
	if (id != undefined && id != "") {
		action 		= 	"edit";
		methodType	=	"PUT";
	}
	
	if(action == "edit" && (commoncontrolupdateDescription !== undefined && commoncontrolupdateDescription != "")){
		var	notifiObj	=	{};
		$.each(commoncontrolupdateDescription,function(index,value){
			notifiObj[index]	=	value;
			if(index	==	'generalSettingValue'){
				if(value	!=	null){
					$.each(commoncontrolupdateDescription.generalSettingValue,function(general,objval){
						notifiObj['generalSettingValue'][general]	=	objval;		
					});
				}		
			}		
		});
		notifiObj['generalSettingValue']['backupduration']	=	backupduration;
		notifiObj['generalSettingValue']['path']	=	browselocation;
	}else{
		var	notifiObj	=	commoncontrolupdateDescription;
		notifiObj['generalSettingValue']	=	{'backupduration':backupduration,'path':browselocation};
	}
	
	if (id != undefined && id != "") {
		notifiObj.orgId	=	id;
	}
	
	$.ajax({
		url : "/stratroom/generalSetting",
		type : methodType,
		contentType: "application/json",
        data: JSON.stringify(notifiObj),
		success : function(data, status) {			
			if(data.message != null && data.message != undefined && data.message =="can't create file path"){			
				$('#createPathFailed').modal('toggle');
			}else{
				if(data.controlPanelGeneralDTO.orgId !=	undefined){
					$("#restoreid").val(data.controlPanelGeneralDTO.orgId)
				}
				$.notify("Success: Updated Successfully", {
							  style: 'success',
							  className: 'graynotify'
							});
			}	
		},
		error:function(){
			$.notify("Failed: Updated Failed", {
							  style: 'error',
							  className: 'graynotify'
							});
		}
	});
});

$(".restoreevent").click(function(){
	
	var restorepath	=	$("#restorePath").val();
	if(commoncontrolupdateDescription.length	==	0){
		$.notify("Failed: Please update general setting then try again", {
							  style: 'error',
							  className: 'graynotify'
							});
		return false;
	}
	if(commoncontrolupdateDescription.length	!=	0){
		if(commoncontrolupdateDescription.generalSettingValue	!=	undefined && commoncontrolupdateDescription.generalSettingValue.schedulertype ==	undefined){
			$.notify("Failed: Please update scheduler setting then try again", {
							  style: 'error',
							  className: 'graynotify'
							});
			return false;		
		}
		if(commoncontrolupdateDescription.generalSettingValue	!=	undefined && commoncontrolupdateDescription.generalSettingValue.restorePath ==	undefined){
			$.notify("Failed: Restore path is required", {
							  style: 'error',
							  className: 'graynotify'
							});
			return false;		
		}
	}
	if(restorepath	==	""){
		$.notify("Failed: Restore path is required", {
							  style: 'error',
							  className: 'graynotify'
							});
		return false;
	}
	
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}
	
	
	/*
	 * var id = $("#restoreid").val(); var action = "add"; var methodType =
	 * "POST"; if (id != undefined && id != "") { action = "edit"; methodType =
	 * "POST"; } var notifiObj = {}; notifiObj['path'] = browselocation;
	 * 
	 * if (id != undefined && id != "") { notifiObj.orgId = id; }
	 */
	
	$.ajax({
		url : "/stratroom/scriptrestore?path="+restorepath,
		type : "GET",
		contentType: "application/json",
		success : function(data, status) {
			if(data.controlPanelGeneralDTO.orgId !=	undefined){
				$("#restoreid").val(data.controlPanelGeneralDTO.orgId)
			}
			$.notify("Success: Updated Successfully", {
							  style: 'success',
							  className: 'graynotify'
							});
		},
		error:function(){
			$.notify("Failed: Updated Failed", {
							  style: 'error',
							  className: 'graynotify'
							});
		}
	});
});


$(document).on('show.bs.modal', '.modal', function (event) {
    var zIndex = 1040 + (10 * $('.modal:visible').length);
    $(this).css('z-index', zIndex);
    setTimeout(function() {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
});


function formvalidationerrorreset(){
	$('*[id*=-error]').each(function() {
	    $(this).remove();
	});
	$(".input-calender-icon-from").css("bottom","30%");
	$(".input-calender-icon-to").css("bottom","30%");
}

function saveGeneralSettings() {
	console.log(siteLanguageData, "sitelanguageData");
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}
	var id	=	$("#generalid").val();
	var action	=	"add";
	var methodType	=	"POST";
	if (id != undefined && id != "") {
		action 		= 	"edit";
		methodType	=	"PUT";
	}
	
	var financialstart	=	$("#financialstart").val();
	var financialend	=	$("#financialend").val();
	
	if(financialstart !=	"Jan" && financialstart !=	"Apr" && financialstart !=	"Jul"){
		//if(financialstart !=	"Jan" && financialstart !=	"Apr"){
		$.notify("Error: Financial Year should be Jan-Dec or Apr-Mar", {
			  style: 'error',
			  className: 'graynotify'
		});
		return false;
	}
	if(financialend !=	"Dec" && financialend !=	"Mar" && financialend !=	"Jun"){
	//if(financialend !=	"Dec" && financialend !=	"Mar"){
		$.notify("Error: Financial Year should be Jan-Dec or Apr-Mar", {
			  style: 'error',
			  className: 'graynotify'
		});
		return false;
	}
	
	if(financialstart ==	"Jan" && financialend !=	"Dec"){
		$.notify("Error: Financial Year should be Jan-Dec or Apr-Mar", {
			  style: 'error',
			  className: 'graynotify'
		});
		return false;
	}else if(financialstart ==	"Apr" && financialend !=	"Mar"){
		$.notify("Error: Financial Year should be Jan-Dec or Apr-Mar", {
			  style: 'error',
			  className: 'graynotify'
		});
		return false;
	}
	else if(financialstart ==	"Jul" && financialend !=	"Jun"){
		$.notify("Error: Financial Year should be Jan-Dec or Apr-Mar or Jul-Jun", {
			  style: 'error',
			  className: 'graynotify'
		});
		return false;
	}
	
	var customFinacialRangeActive	=	false;
	var customPeriodRangeActive	=	false;
	
	if(financialstart	==	"Jan"){
		customPeriodRangeActive	=	true;
		customFinacialRangeActive	=	false;	
	}else{
		customPeriodRangeActive	=	false;
		customFinacialRangeActive	=	true;
	}
	if(financialstart	==	"Jul"){
		financialstart	=	7;
	}else if(financialstart	==	"Apr"){
		financialstart	=	4;
	}else if(financialstart	==	"Jan"){
		financialstart	=	1;
	}
	
	
	var genObj 	= 	getGeneralSettingsObjData(id,action);
	console.log(genObj, "ganesh");
	if (id != undefined && id != "") {
		genObj.orgId	=	id;
		if(genObj.startMonth == "Apr"){
		var startDate	=	moment().month(3).startOf('month').format('L');
		var endDate 		= 	(moment().month(2).endOf('month').add(1, 'year')).format('L');
					genObj.calendarYear =startDate+' - '+ endDate;
		}
		else if(genObj.startMonth == "Jul"){
			var startDate	=	moment().month(6).startOf('month').format('L');
		var endDate 		= (moment().month(5).endOf('month').add(1, 'year')).format('L');
					genObj.calendarYear =startDate+' - '+ endDate;
		}
		else{
			var startDate	=	moment().month(0).startOf('month').format('L');
		var endDate 		= 	moment().month(11).endOf('month').format('L');
					genObj.calendarYear =startDate+' - '+ endDate;
		}
		}
	
	
	var frequency	=	$("#defaultperiod").val();
	frequency	=	(frequency !=	"" && frequency !=	null?frequency:"Quarter");
	var rangeset	=	"";
	if(frequency	==	"Month"){
		frequency	=	"month";
		rangeset	=	"Monthly";
	}else if(frequency	==	"Quarter"){
		frequency	=	"quarter";
		rangeset	=	"Quarterly";
    }else if(frequency	==	"Half Year"){
		frequency	=	"hyear";
		rangeset	=	"HalfYearly";
	}else if(frequency	==	"Year"){
		frequency	=	"year";
		rangeset	=	"Annually";
	}
	//var calendaryearcheck	=	$(".calender-year").val();
	/*$.ajax({
		url : "/stratroom/validate/calendarYear?period=" + calendaryearcheck,
		success : function(data,status){
			if(data	==	false){
				$.notify("Failed: Calendar year minimum should be one year", {
				  style: 'error',
				  className: 'graynotify'
				});
				return false;
			}else{*/
				$.ajax({
				url : "/stratroom/generalSetting",
				type : methodType,
				contentType : "application/json",
				data : JSON.stringify(genObj),
				success : function(data, status) {
					localStorage.setItem("customperiod",  rangeset);
					/*$('input[name="daterangepickerperiod"]').data('daterangepicker').isCustomFinacialRangeActive(customFinacialRangeActive);
					$('input[name="daterangepickerperiod"]').data('daterangepicker').isCustomPeriodRangeActive(customPeriodRangeActive);
					$('input[name="daterangepickerperiod"]').data('daterangepicker').startMonthOfFicalYear(financialstart);
					$('input[name="daterangepickerperiod"]').data('daterangepicker').setPeriod(frequency);
					$('input[name="daterangepickerperiod"]').trigger('update');*/
					$("#implementationtype").attr("disabled",true);
					if(data.controlPanelGeneralDTO.orgId !=	undefined){
						$("#generalid").val(data.controlPanelGeneralDTO.orgId)
						$("title").text(data.controlPanelGeneralDTO.siteName)
					}
					$.notify("Success: Updated Successfully", {
					  style: 'success',
					  className: 'graynotify'
					});
					var newtodaydate	=	new Date();
					var currentmonthdate=	parseInt(newtodaydate.getMonth()+1);
					if(frequency	==	"quarter"){
						if(financialstart	==	1){
							if(currentmonthdate >= 1 && currentmonthdate <= 3){
								var startdateval	=	moment().month(0).startOf('month').format('L');
								var enddateval 		= 	moment().month(2).endOf('month').format('L');
							}else if(currentmonthdate >= 7 && currentmonthdate <= 9){
								var startdateval	=	moment().month(6).startOf('month').format('L');
								var enddateval 		= 	moment().month(8).endOf('month').format('L');
							}else if(currentmonthdate >= 10 && currentmonthdate <= 12){
								var startdateval	=	moment().month(9).startOf('month').format('L');
								var enddateval 		= 	moment().month(11).endOf('month').format('L');
							}else if(currentmonthdate >= 4 && currentmonthdate <= 6){
								var startdateval	=	moment().month(3).startOf('month').format('L');
								var enddateval 		= 	moment().month(5).endOf('month').format('L');
							}
						}else if(financialstart	==	4){
							if(currentmonthdate >= 1 && currentmonthdate <= 3){
								var startdateval=	(moment().month(0).startOf('month')).format('L');
								var enddateval	=	(moment().month(2).endOf('month')).format('L');
							}else if(currentmonthdate >= 7 && currentmonthdate <= 9){
								var startdateval=	moment().month(6).startOf('month').format('L');
								var enddateval	=	moment().month(8).endOf('month').format('L');
							}else if(currentmonthdate >= 10 && currentmonthdate <= 12){
								var startdateval=	moment().month(9).startOf('month').format('L');
								var enddateval	=	moment().month(11).endOf('month').format('L');
							}else if(currentmonthdate >= 4 && currentmonthdate <= 6){
								var startdateval=	moment().month(3).startOf('month').format('L');
								var enddateval	=	moment().month(5).endOf('month').format('L');
							}
						}
						else if(financialstart	==	7){
							if(currentmonthdate >= 1 && currentmonthdate <= 3){
								var startdateval=	(moment().month(3).startOf('month').subtract(1, 'year')).format('L');
								var enddateval	=	(moment().month(5).endOf('month').subtract(1, 'year')).format('L');
							}else if(currentmonthdate >= 7 && currentmonthdate <= 9){
								var startdateval=	moment().month(6).startOf('month').format('L');
								var enddateval	=	moment().month(8).endOf('month').format('L');
							}else if(currentmonthdate >= 10 && currentmonthdate <= 12){
								var startdateval=	moment().month(9).startOf('month').format('L');
								var enddateval	=	moment().month(11).endOf('month').format('L');
							}else if(currentmonthdate >= 4 && currentmonthdate <= 6){
								var startdateval=	moment().month(3).startOf('month').format('L');
								var enddateval	=	moment().month(5).endOf('month').format('L');
							}
						}
						localStorage.setItem("startdateval", startdateval);
						localStorage.setItem("enddateval", enddateval);
					}else if (frequency == "year"){
						if(financialstart	==	"4"){
							if(currentmonthdate >= 1 && currentmonthdate <= 3){
								var startdateval=	(moment().month(3).startOf('month').subtract(1, 'year')).format('L');
								var enddateval	=	(moment().month(2).endOf('month')).format('L');
							}else
							{
								var startdateval=	moment().month(3).startOf('month').format('L');
								var enddateval	=	(moment().month(2).endOf('month').add(1, 'year')).format('L');	
							}
							localStorage.setItem("startdateval", startdateval);
							localStorage.setItem("enddateval", enddateval);
						}else if(financialstart	==	"7"){
							if(currentmonthdate >= 1 && currentmonthdate <= 6){
								var startdateval=	(moment().month(6).startOf('month').subtract(1, 'year')).format('L');
								var enddateval	=	(moment().month(5).endOf('month')).format('L');
							}else
							{
								var startdateval=	moment().month(6).startOf('month').format('L');
								var enddateval	=	(moment().month(5).endOf('month').add(1, 'year')).format('L');	
							}
							localStorage.setItem("startdateval", startdateval);
							localStorage.setItem("enddateval", enddateval);
						}else{
							var startdateval	=	moment().month(0).startOf('month').format('L');
							var enddateval 		= 	moment().month(11).endOf('month').format('L');
							localStorage.setItem("startdateval", startdateval);
							localStorage.setItem("enddateval", enddateval);
						}
					}else if (frequency == "hyear"){
						if(financialstart	==	4 && currentmonthdate >= 4 && currentmonthdate <= 9){
							var startdateval	=	moment().month(3).startOf('month').format('L');
							var enddateval 		= 	moment().month(8).endOf('month').format('L');
						}else if(calendarYearfinStart	==	"Apr" && currentmonthdate >= 10 && currentmonthdate <= 12){
							var startdateval	=	moment().month(9).startOf('month').format('L');
							var enddateval 		= 	(moment().month(2).endOf('month').add(1, 'year')).format('L');
						}else if(calendarYearfinStart	==	"Apr" && currentmonthdate >= 1 && currentmonthdate <= 3){
							var startdateval	=	(moment().month(9).startOf('month').subtract(1, 'year')).format('L');
							var enddateval 		= 	(moment().month(2).endOf('month')).format('L');
						}else if(financialstart	==	7 && currentmonthdate >= 7 && currentmonthdate <= 12){
							var startdateval	=	moment().month(6).startOf('month').format('L');
							var enddateval 		= 	moment().month(11).endOf('month').format('L');
						}else if(calendarYearfinStart	==	"Jul" && currentmonthdate >= 1 && currentmonthdate <= 6){
							var startdateval	=	(moment().month(0).startOf('month').subtract(1, 'year')).format('L');
							var enddateval 		= 	moment().month(5).endOf('month').format('L');
						}else if(calendarYearfinStart	==	"Jan" && (currentmonthdate >= 1 && currentmonthdate <= 6)){
							var startdateval	=	moment().month(0).startOf('month').format('L');
							var enddateval 		= 	moment().month(5).endOf('month').format('L');
						}else if(calendarYearfinStart	==	"Jan" && (currentmonthdate >= 6 && currentmonthdate <= 12)){
							var startdateval	=	moment().month(6).startOf('month').format('L');
							var enddateval 		= 	moment().month(11).endOf('month').format('L');
						}
						localStorage.setItem("startdateval", startdateval);
						localStorage.setItem("enddateval", enddateval);
					}else if (frequency == "month"){
						currentmonthdate 	=	parseInt(currentmonthdate-1);
						var startdateval	=	moment().month(currentmonthdate).startOf('month').format('L');
						var enddateval 		= 	moment().month(currentmonthdate).endOf('month').format('L');
						localStorage.setItem("startdateval", startdateval);
						localStorage.setItem("enddateval", enddateval);
					}
					
					location.reload(true);
				}
			});
			
			/*}
		},
		error:readErrorMsg
	});*/
				
	/*
	 * var calendaryearcheck = $(".calender-year").val(); if(calendaryearcheck != "" &&
	 * calendaryearcheck != null && calendaryearcheck.indexOf("-")>=0){ var
	 * dateval = calendaryearcheck.split('-'); var startdate = new
	 * Date(dateval[1]); var enddate = new Date(dateval[0]); var
	 * Difference_In_Time = startdate.getTime() - enddate.getTime(); var
	 * Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
	 * if(Difference_In_Days <= 365){ $.notify("Failed: Calendar year minimum
	 * should be one year", "error"); return false; } }else{ $.notify("Failed:
	 * Invalid calendar year date", "error"); return false; }
	 */
	
	

}

function getGeneralSettingsObj(id,action) {
	
	var langValue	=	localStorage.getItem("selectedLang") || "en";
	console.log(langValue, "langValue");
	var generalSettObj 	= 	{
            "siteName": $("#sitename").val(),
            "siteLanguage": localStorage.getItem("selectedLang") || "en",
            "adminEmailId": $("#siteadminemailId").val(),
            "currencyType": $("#settingcurrency").val(),
            "currencyView": $("#currencyview").val(),
            "defaultDatePeriod": $("#defaultperiod").val(),
            "implementation": $("#implementation").val(),
            "implementationType": $("#implementationtype").val(),
            "calendarYear": $("#calenderyear").val(),
            "startMonth": $("#financialstart").val(),
            "endMonth": $("#financialend").val(),
            "timeZone": $("#timeZone").val(),
            //"departmentId":$("#dept option:selected").attr("data-deptid"),
            //"department":$("#dept option:selected").text(),
            "generalSettingValue":{}
        };
		console.log(controlupdateDescription);

		console.log(generalSettObj, "generalSettObj");

	var existdatadonotupdate 	=	["siteName","currencyType","implementationType","implementation","startMonth","endMonth","defaultDatePeriod","currencyView","timeZone","departmentId","department"];
	if(action == "edit" && (controlupdateDescription !== undefined || controlupdateDescription != "")){
		$.each(controlupdateDescription,function(index,value){
			if($.inArray(index,existdatadonotupdate) == -1){
				generalSettObj[index]	=	value;
				console.log(value);
				console.log($("#calenderyear").val());
			}
		});
	}
	return generalSettObj;
}

function getGeneralSettingsObjData(id,action) {

	var langValue	=	localStorage.getItem("lang") || "en";
	var siteLanguageData = langValue 
	console.log(langValue, "langValue");
	// const parsedLangs = JSON.parse(langValue);
	// siteLanguageData = parsedLangs.join(", ");
	// console.log(parsedLangs,siteLanguageData,  "parsedLangs");


	console.log(siteLanguageData, "siteLanguageeee");
	var payloadObj 	= 	{
            "siteName": $("#sitename").val(),
            "siteLanguage": siteLanguageData,
			"adminEmailId": $("#siteadminemailId").val(),
            "currencyType": $("#settingcurrency").val(),
            "currencyView": $("#currencyview").val(),
            "defaultDatePeriod": $("#defaultperiod").val(),
            "implementation": $("#implementation").val(),
            "implementationType": $("#implementationtype").val(),
            "calendarYear": $("#calenderyear").val(),
            "startMonth": $("#financialstart").val(),
            "endMonth": $("#financialend").val(),
            "timeZone": $("#timeZone").val(),
            //"departmentId":$("#dept option:selected").attr("data-deptid"),
            //"department":$("#dept option:selected").text(),
            "generalSettingValue":{}
        };

		var existdatadonotupdate 	=	["siteName","currencyType","implementationType","implementation","startMonth","endMonth","defaultDatePeriod","currencyView","timeZone","departmentId","department"];
		if(action == "edit" && (controlupdateDescription !== undefined || controlupdateDescription != "")){
			$.each(controlupdateDescription,function(index,value){
				if($.inArray(index,existdatadonotupdate) == -1){
					console.log(index, value, "indexValue");
					payloadObj[index]	=	value;
					payloadObj["siteLanguage"] = siteLanguageData;
					console.log(value);
					console.log($("#calenderyear").val());
				}
			});
		}
	
		
		console.log(payloadObj, "payloadObj");

	return payloadObj;
}



function saveSecurity(id,typeofmethod, operation) {
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}
	var id	=	$("#securityid").val();
	var action	=	"add";
	var methodType	=	"POST";
	if (id != undefined && id != "") {
		action 		= 	"edit";
		methodType	=	"PUT";
	}
	
	var SecurityObj 	= 	getSecurityObj(id,typeofmethod,action);
	if (id != undefined && id != "") {
		SecurityObj.orgId	=	id;
	}
	
	$.ajax({
		url : "/stratroom/controlPanelSecurity",
		type : methodType,
		contentType : "application/json",
		data : JSON.stringify(SecurityObj),
		success : function(data, status) {
			if(data.controlPanelSecurityDTO.orgId !=	undefined){
				$("#securityid").val(data.controlPanelSecurityDTO.orgId)
			}
			$.notify("Success: Updated Successfully", {
							  style: 'success',
							  className: 'graynotify'
							});
		}
	});

}

function getSecurityObj(id,type,action) {
	if(type	==	"opendocument"){
	   	var getSecurityObj 	= 	{
	        "securityType": $("[name='SOMethod']:checked").val(),
	        "applicationName": $("#applicationname").val(),
	        "clientName": $("#clientname").val(),
	        "redirectUrl": $("#redirecturl").val(),
	        "description": $("#description").val(),
	        "accessTokenExpiry":$("#accesstokenexpiry").val(),
	        "jwtTokenExpiry":$("#jwttokenexpiry").val(),
	        "refreshTokenExpiry": $("#refreshtokenexpiry").val()
	    };
	
		var existdatadonotupdate 	=	["applicationName","clientName","securityType","redirectUrl","description","accessTokenExpiry","jwtTokenExpiry","refreshTokenExpiry"];
		if(action == "edit" && (securitycontrolupdateDescription !== undefined || securitycontrolupdateDescription != "")){
			$.each(securitycontrolupdateDescription,function(index,value){
				if($.inArray(index,existdatadonotupdate) == -1){
					getSecurityObj[index]	=	value;
				}
			});
		}
	}else{
		var Config	=	$("[name='Config']:checked").val();
		if(Config	==	"URL" || Config	==	"File"){
			var getSecurityObj 	= 	{
		        "securityType": $("[name='SOMethod']:checked").val(),
		        "name": $("#samlname").val(),
		        "config": $("[name='Config']:checked").val(),
		        "metadataUrl": $("#metadataurl").val(),
		        "samlserviceUrl": $("#samlservice").val(),
		        "samlentityID": $("#samlentity").val(),
		        "certificateFingerPrintAlgoritham":$("#certificatefingerprintalg").val()
		    };
		    
		    var existdatadonotupdate 	=	["name","config","securityType","metadataUrl","samlserviceUrl","samlentityID","certificateFingerPrintAlgoritham"];
			if(action == "edit" && (securitycontrolupdateDescription !== undefined || securitycontrolupdateDescription != "")){
				$.each(securitycontrolupdateDescription,function(index,value){
					if($.inArray(index,existdatadonotupdate) == -1){
						getSecurityObj[index]	=	value;
					}
				});
			}
		}else if(Config	==	"MSettings"){
			var getSecurityObj 	= 	{
		        "securityType": $("[name='SOMethod']:checked").val(),
		        "name": $("#samlname").val(),
		        "config": $("[name='Config']:checked").val(),
		        "singlesignOn": $("#manualsinglesignon").val(),
		        "certificateFingerPrint":$("#certificatefingerprint").val(),
		        "samlConsumerUrl": $("#samlconsumer").val(),
		        "samlserviceUrl": $("#manualsamlservice").val(),
		        "samlentityID": $("#manualsamlentity").val(),
		        "certificateFingerPrintAlgoritham":$("#manualcertificatefingerprintalg").val()
		    };
		    
		    var existdatadonotupdate 	=	["name","config","securityType","singlesignOn","samlserviceUrl","samlentityID","certificateFingerPrintAlgoritham","certificateFingerPrint","samlConsumerUrl"];
			if(action == "edit" && (securitycontrolupdateDescription !== undefined || securitycontrolupdateDescription != "")){
				$.each(securitycontrolupdateDescription,function(index,value){
					if($.inArray(index,existdatadonotupdate) == -1){
						getSecurityObj[index]	=	value;
					}
				});
			}
		}	
	}
	
    return getSecurityObj;
}


$(".customperformancechange").click(function(){
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}
 	var getcorrId 	= 	$(this).attr("id");
 	var yearToDate	=	"";
 	var aggregation	=	"";
 	var customper	=	"";
 	var customkpi	=	"";
 	var customobj	=	"";
 	var customper	=	"";
 	var customscore	=	"";
 	var per	=	"";
 	var customstatus	=	"";
 	var flag		=	"";
 	var submeasurerequired	=	"";
 	
 	if(getcorrId == "yearToDate"){
 		yearToDate 	= 	$(this).prop("checked"); 
 		flag		=	"yearToDate";
 	}
 	if(getcorrId == "aggregation"){
 		aggregation 	= 	$(this).prop("checked"); 
 		flag		=	"aggregation";
 		if(customsettingsresponse != ""){
			if(customsettingsresponse.aggregationType !=	"" && customsettingsresponse.aggregationType !=	undefined){
				$("#ag-type").val(customsettingsresponse.aggregationType);
			}
	 	}
 	}
 	if(getcorrId == "custom_performance"){
 		customper 	= 	$(this).prop("checked"); 
 		flag		=	"customPerformance";
 	}
 	if(getcorrId == "customKPI"){
 		customkpi 	= 	$(this).prop("checked"); 
 		flag		=	"customKPI";
 	}
 	if(getcorrId == "customObjective"){
 		customobj 	= 	$(this).prop("checked"); 
 		flag		=	"customObjective";
 	}
 	if(getcorrId == "customPerspective"){
 		customper 	= 	$(this).prop("checked"); 
 		flag		=	"customPerspective";
 	}
 	if(getcorrId == "performance"){
 		per 	= 	$(this).prop("checked"); 
 		flag		=	"performance";
 	}
 	
 	if(per	==	true){	
 		if($("#kpi_threshold-01").val()	==	"three_status"){
 			$(".color_picks_03").show();
 			
 			if(customsettingsresponse.threshold1 != undefined){
 				$(".cus_perfor_sow #optioncolor1").val(customsettingsresponse.threshold1);
 			}
 			if(customsettingsresponse.threshold2 != undefined){
 				$(".cus_perfor_sow #optioncolor2").val(customsettingsresponse.threshold2);
 			}
 			if(customsettingsresponse.threshold3 != undefined){
 				$(".cus_perfor_sow #optioncolor3").val(customsettingsresponse.threshold3);
 			}
 		//	if(customsettingsresponse.threshold1Color !=	undefined){
 		//		$(".cus_perfor_sow .input-group-append").find('span.optioncolor1').css('background',customsettingsresponse.threshold1Color);
 	//		}else{
 				$(".cus_perfor_sow .input-group-append").find('span.optioncolor1').css('background',"red");
 	//b		}
 		//	if(customsettingsresponse.threshold2Color !=	undefined){
 		//		$(".cus_perfor_sow .input-group-append").find('span.optioncolor2').css('background',customsettingsresponse.threshold2Color);
 		//	}else{
 				$(".cus_perfor_sow .input-group-append").find('span.optioncolor2').css('background',"yellow");
 		//	}
 		//	if(customsettingsresponse.threshold3Color !=	undefined){
 		//		$(".cus_perfor_sow .input-group-append").find('span.optioncolor3').css('background',customsettingsresponse.threshold3Color);
 		//	}else{
 				$(".cus_perfor_sow .input-group-append").find('span.optioncolor3').css('background',"green");
 		//	}
 			
 		}else if($("#kpi_threshold-01").val()	==	"five_status"){


			$(".color_picks_05").show();
 			
 			if(customsettingsresponse.threshold1 != undefined){
 				$(".cus_perfor_sow #optioncolor1").val(customsettingsresponse.threshold1);
 			}
 			if(customsettingsresponse.threshold2 != undefined){
 				$(".cus_perfor_sow #optioncolor2").val(customsettingsresponse.threshold2);
 			}
 			if(customsettingsresponse.threshold3 != undefined){
 				$(".cus_perfor_sow #optioncolor3").val(customsettingsresponse.threshold3);
 			}
			 if(customsettingsresponse.threshold4 != undefined){
				$(".cus_perfor_sow #optioncolor4").val(customsettingsresponse.threshold3);
			}
			if(customsettingsresponse.threshold5 != undefined){
				$(".cus_perfor_sow #optioncolor5").val(customsettingsresponse.threshold5);
			}
 		//	if(customsettingsresponse.threshold1Color !=	undefined){
 		//		$(".cus_perfor_sow .input-group-append").find('span.optioncolor1').css('background',customsettingsresponse.threshold1Color);
 		//	}else{
 				$(".cus_perfor_sow .input-group-append").find('span.optioncolor1').css('background',"red");
 		//	}
 		//	if(customsettingsresponse.threshold2Color !=	undefined){
 		//		$(".cus_perfor_sow .input-group-append").find('span.optioncolor2').css('background',customsettingsresponse.threshold2Color);
 		//	}else{
 				$(".cus_perfor_sow .input-group-append").find('span.optioncolor2').css('background',"#FF4B3E");
 		//	}
 		//	if(customsettingsresponse.threshold3Color !=	undefined){
 		//		$(".cus_perfor_sow .input-group-append").find('span.optioncolor3').css('background',customsettingsresponse.threshold3Color);
 		//	}else{
 				$(".cus_perfor_sow .input-group-append").find('span.optioncolor3').css('background',"yellow");
 		//	}
		//	 if(customsettingsresponse.threshold4Color !=	undefined){
		//		$(".cus_perfor_sow .input-group-append").find('span.optioncolor4').css('background',customsettingsresponse.threshold3Color);
		//	}else{
				$(".input-group-append").find('span.optioncolor4').css('background',"#5FCD5F");
		//	}
		//	if(customsettingsresponse.threshold5Color !=	undefined){
			//	$(".cus_perfor_sow .input-group-append").find('span.optioncolor5').css('background',customsettingsresponse.threshold3Color);
			//}else{
				$(".cus_perfor_sow .input-group-append").find('span.optioncolor5').css('background',"green");
		//	}
		}

		
		if(customsettingsresponse.threshold1 !=	undefined){
			$(".cus_perfor_sow #optioncolor1").val(customsettingsresponse.threshold1);
		}
		if(customsettingsresponse.threshold2 !=	undefined){
			$(".cus_perfor_sow #optioncolor2").val(customsettingsresponse.threshold2);
		}
		if(customsettingsresponse.threshold3 !=	undefined){
			$(".cus_perfor_sow #optioncolor3").val(customsettingsresponse.threshold3);
		}
		if(customsettingsresponse.threshold4 !=	undefined){
			$(".cus_perfor_sow #optioncolor4").val(customsettingsresponse.threshold4);
		}
		if(customsettingsresponse.threshold5 !=	undefined){
			$(".cus_perfor_sow #optioncolor5").val(customsettingsresponse.threshold5);
		}
 	}
 	
 	
 	if(customper	==	true){	
 		if($("#kpi_threshold").val()	==	"three_status"){
 			$(".color_picks_three").show();
 			
 			if(customsettingsresponse.threshold1 != undefined){
 				$(".cus_perfor_sow #optioncolor1").val(customsettingsresponse.threshold1);
 			}
 			if(customsettingsresponse.threshold2 != undefined){
 				$(".cus_perfor_sow #optioncolor2").val(customsettingsresponse.threshold2);
 			}
 			if(customsettingsresponse.threshold3 != undefined){
 				$(".cus_perfor_sow #optioncolor3").val(customsettingsresponse.threshold3);
 			}
 		//	if(customsettingsresponse.threshold1Color !=	undefined){
 		//		$(".cus_perfor_sow .input-group-append").find('span.optioncolor1').css('background',customsettingsresponse.threshold1Color);
 		//	}else{
 				$(".cus_perfor_sow .input-group-append").find('span.optioncolor1').css('background',"red");
 		//	}
 		//	if(customsettingsresponse.threshold2Color !=	undefined){
 		//		$(".cus_perfor_sow .input-group-append").find('span.optioncolor2').css('background',customsettingsresponse.threshold2Color);
 		//	}else{
 				$(".cus_perfor_sow .input-group-append").find('span.optioncolor2').css('background',"yellow");
 		//	}
 		//	if(customsettingsresponse.threshold3Color !=	undefined){
 		//		$(".cus_perfor_sow .input-group-append").find('span.optioncolor3').css('background',customsettingsresponse.threshold3Color);
 		//	}else{
 				$(".cus_perfor_sow .input-group-append").find('span.optioncolor3').css('background',"green");
 		//	}
 			
 		}else if($("#kpi_threshold").val()	==	"five_status"){
			$(".color_picks_five").show();
			
			if(customsettingsresponse.threshold1 != undefined){
				$(".cus_perfor_sow #optioncolor1").val(customsettingsresponse.threshold1);
			}
			if(customsettingsresponse.threshold2 != undefined){
				$(".cus_perfor_sow #optioncolor2").val(customsettingsresponse.threshold2);
			}
			if(customsettingsresponse.threshold3 != undefined){
				$(".cus_perfor_sow #optioncolor3").val(customsettingsresponse.threshold3);
			}
			if(customsettingsresponse.threshold4 != undefined){
				$(".cus_perfor_sow #optioncolor4").val(customsettingsresponse.threshold4);
			}
			if(customsettingsresponse.threshold5 != undefined){
				$(".cus_perfor_sow #optioncolor5").val(customsettingsresponse.threshold5);
			}
		//	if(customsettingsresponse.threshold1Color !=	undefined){
		//		$(".cus_perfor_sow .input-group-append").find('span.optioncolor1').css('background',customsettingsresponse.threshold1Color);
		//	}else{
				$(".cus_perfor_sow .input-group-append").find('span.optioncolor1').css('background',"red");
		//	}
		//	if(customsettingsresponse.threshold2Color !=	undefined){
		//		$(".cus_perfor_sow .input-group-append").find('span.optioncolor2').css('background',customsettingsresponse.threshold2Color);
		//	}else{
				$(".cus_perfor_sow .input-group-append").find('span.optioncolor2').css('background',"#FF4B3E");
		//	}
		//	if(customsettingsresponse.threshold3Color !=	undefined){
		//		$(".cus_perfor_sow .input-group-append").find('span.optioncolor3').css('background',customsettingsresponse.threshold3Color);
		//	}else{
				$(".cus_perfor_sow .input-group-append").find('span.optioncolor3').css('background',"yellow");
		//	}

		//	if(customsettingsresponse.threshold4Color !=	undefined){
		//		$(".cus_perfor_sow .input-group-append").find('span.optioncolor4').css('background',customsettingsresponse.threshold4Color);
		//	}else{
				$(".cus_perfor_sow .input-group-append").find('span.optioncolor4').css('background',"#5fcd5f");
		//	}

		//	if(customsettingsresponse.threshold5Color !=	undefined){
		//		$(".cus_perfor_sow .input-group-append").find('span.optioncolor5').css('background',customsettingsresponse.threshold5Color);
		//	}else{
				$(".cus_perfor_sow .input-group-append").find('span.optioncolor5').css('background',"green");
		//	}
			

			if(customsettingsresponse.threshold1 !=	undefined){
				$(".cus_perfor_sow #optioncolor1").val(customsettingsresponse.threshold1);
			}
			if(customsettingsresponse.threshold2 !=	undefined){
				$(".cus_perfor_sow #optioncolor2").val(customsettingsresponse.threshold2);
			}
			if(customsettingsresponse.threshold3 !=	undefined){
				$(".cus_perfor_sow #optioncolor3").val(customsettingsresponse.threshold3);
			}
			if(customsettingsresponse.threshold4 !=	undefined){
				$(".cus_perfor_sow #optioncolor4").val(customsettingsresponse.threshold4);
			}
			if(customsettingsresponse.threshold5 !=	undefined){
				$(".cus_perfor_sow #optioncolor5").val(customsettingsresponse.threshold5);
			}
		}
 	}
 	
 	if(getcorrId == "submeasurerequired"){
 		submeasurerequired 	= 	$(this).prop("checked");
 		flag		=	"submeasurerequired";
 	}
 	
 	if(getcorrId == "custom_status"){
 		customstatus= 	$(this).prop("checked");
 		if (customstatus	==	true) {
            $("#cust_status").show();   
        }else {
            $("#cust_status").hide();
        }
 		flag		=	"statusrequired";
 	}
 	
 	if(getcorrId == "custom_score"){
 		customscore= 	$(this).prop("checked");
 		if (customscore	==	true) {
            $("#cust_score").show();   
        }else {
            $("#cust_score").hide();
        }
 		flag		=	"scorerequired";
 	}
 	
 	var action = "edit"; 
 	var methodType = "POST"; 
 	var notifiObj = {'generalSettingValue':{}};
 	if(customsettingsresponse != ""){
 		notifiObj['generalSettingValue']	=  	customsettingsresponse;
	 	$.each(customsettingupdateDescription.generalSettingValue,function(index,value){
 				
 			//$.each(customsettingsresponse,function(general,objval){
 				//notifiObj['generalSettingValue'][general] =  objval;
 				if(flag == "yearToDate"){ 
 					notifiObj['generalSettingValue']["yearToDate"] =  yearToDate;
 				}
 				if(flag == "aggregation"){ 
 					notifiObj['generalSettingValue']["aggregation"] =  aggregation; 
 				}
 				if(flag == "customPerformance"){ 
 					notifiObj['generalSettingValue']["customPerformance"] =  customper; 
 				}
 				if(flag == "performance"){ 
 					notifiObj['generalSettingValue']["performance"] =  per; 
 				}
 				if(flag == "customKPI"){ 
 					notifiObj['generalSettingValue']["customKPI"] =  customkpi; 
 				}
 				if(flag == "customObjective"){ 
 					notifiObj['generalSettingValue']["customObjective"] =  customobj; 
 				}
 				if(flag == "customPerspective"){ 
 					notifiObj['generalSettingValue']["customPerspective"] =  customper; 
 				}
 				if(flag == "submeasurerequired"){ 
 					notifiObj['generalSettingValue']["submeasurerequired"] =  submeasurerequired; 
 				}
 				if(flag == "statusrequired"){ 
 					notifiObj['generalSettingValue']["statusrequired"] =  customstatus; 
 				}
 				if(flag == "scorerequired"){ 
 					notifiObj['generalSettingValue']["scorerequired"] =  customscore; 
 				}
 				
	 		//});
	 	}); 
 	}else{
 		$.each(customsettingupdateDescription.generalSettingValue,function(general,objval){
			//notifiObj['generalSettingValue'][general] =  objval;
			if(flag == "yearToDate"){ 
				notifiObj['generalSettingValue']["yearToDate"] =  yearToDate; 
			}
			if(flag == "aggregation"){ 
				notifiObj['generalSettingValue']["aggregation"] =  aggregation; 
			}
			if(flag == "customPerformance"){ 
				notifiObj['generalSettingValue']["customPerformance"] =  customper; 
			}
			if(flag == "customKPI"){ 
				notifiObj['generalSettingValue']["customKPI"] =  customkpi; 
			}
			if(flag == "customObjective"){ 
				notifiObj['generalSettingValue']["customObjective"] =  customobj; 
			}
			if(flag == "customPerspective"){ 
				notifiObj['generalSettingValue']["customPerspective"] =  customper; 
			}
			if(flag == "submeasurerequired"){ 
				notifiObj['generalSettingValue']["submeasurerequired"] =  submeasurerequired; 
			}
			if(flag == "statusrequired"){ 
				notifiObj['generalSettingValue']["statusrequired"] =  customstatus; 
			}
			if(flag == "performance"){ 
					notifiObj['generalSettingValue']["performance"] =  per; 
				}
			if(flag == "scorerequired"){ 
				notifiObj['generalSettingValue']["scorerequired"] =  customscore; 
			}
			
	 	});
 	}
 	
 	if(flag=="yearToDate"){ 
		notifiObj['generalSettingValue']["audittrailtype"] =  "yearToDate"; 
	}
 	else if(flag=="customPerformance"){
 		notifiObj['generalSettingValue']["audittrailtype"] =  "customPerformance"; 
 	}
 	else if(flag=="aggregation"){
 		notifiObj['generalSettingValue']["audittrailtype"] =  "Aggregation"; 
 	}
 	else if(flag=="performance"){
 		notifiObj['generalSettingValue']["audittrailtype"] =  "Performance"; 
 	}
 	 
 	$.ajax({ 
 		url : "/stratroom/customPerformance", 
 		type : methodType, 
 		contentType:"application/json", 
 		data: JSON.stringify(notifiObj), 
 		success : function(data,status){ 
 		//if(data.controlPanelGeneralDTO.orgId != undefined){
 			//$("#deviceid").val(data.controlPanelGeneralDTO.orgId) 
 		//}
 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
 	},
 	error:function(){ 
 		$.notify("Failed: Updated Failed", { 
 		style: 'error',className: 'graynotify' }); 
 		} 
 	});
  
 });

$(".statusperformance").click(function(){
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}
 	var getcorrId 	= 	$(this).attr("id");
 	var kpistatus	=	"";
 	var objectivestatus		=	"";
 	var perspectivestatus	=	"";
 	var scorecardstatus		=	"";
 	var flag				=	"";
 	if(getcorrId == "kpistatus"){
 		kpistatus 	= 	$(this).prop("checked"); 
 		flag		=	"kpistatus";
 	}
 	
 	if(getcorrId == "objectivestatus"){
 		objectivestatus	= 	$(this).prop("checked"); 
 		flag		=	"objectivestatus";
 	}
 	if(getcorrId == "perspectivestatus"){
 		perspectivestatus 	= 	$(this).prop("checked"); 
 		flag		=	"perspectivestatus";
 	}
 	if(getcorrId == "scorecardstatus"){
 		scorecardstatus 	= 	$(this).prop("checked"); 
 		flag		=	"scorecardstatus";
 	}
 	
 	var action = "edit"; 
 	var methodType = "POST"; 
 	var notifiObj = {'generalSettingValue':{}};
 	
 	if(customsettingsresponse != ""){
 				notifiObj['generalSettingValue']	=  	customsettingsresponse;
	 	$.each(customsettingupdateDescription.generalSettingValue,function(index,value){
 				
 			//$.each(customsettingsresponse,function(general,objval){
 				//notifiObj['generalSettingValue'][general] =  objval;
 				if(flag == "kpistatus"){ 
 					notifiObj['generalSettingValue']["kpistatus"] =  kpistatus;
 				}
 				if(flag == "objectivestatus"){ 
 					notifiObj['generalSettingValue']["objectivestatus"] =  objectivestatus; 
 				}
 				if(flag == "perspectivestatus"){ 
 					notifiObj['generalSettingValue']["perspectivestatus"] =  perspectivestatus; 
 				}
 				if(flag == "scorecardstatus"){ 
 					notifiObj['generalSettingValue']["scorecardstatus"] =  scorecardstatus; 
 				}
	 		//});
	 	}); 
 	}else{
 		$.each(customsettingupdateDescription.generalSettingValue,function(general,objval){
			//notifiObj['generalSettingValue'][general] =  objval;
 			if(flag == "kpistatus"){ 
					notifiObj['generalSettingValue']["kpistatus"] =  kpistatus;
				}
				if(flag == "objectivestatus"){ 
					notifiObj['generalSettingValue']["objectivestatus"] =  objectivestatus; 
				}
				if(flag == "perspectivestatus"){ 
					notifiObj['generalSettingValue']["perspectivestatus"] =  perspectivestatus; 
				}
				if(flag == "scorecardstatus"){ 
					notifiObj['generalSettingValue']["scorecardstatus"] =  scorecardstatus; 
				}
	 	});
 	}
 	 
 	$.ajax({ 
 		url : "/stratroom/customPerformance", 
 		type : methodType, 
 		contentType:"application/json", 
 		data: JSON.stringify(notifiObj), 
 		success : function(data,status){ 
 		//if(data.controlPanelGeneralDTO.orgId != undefined){
 			//$("#deviceid").val(data.controlPanelGeneralDTO.orgId) 
 		//}
 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
 	},
 	error:function(){ 
 		$.notify("Failed: Updated Failed", { 
 		style: 'error',className: 'graynotify' }); 
 		} 
 	});
  
 });

$(".kpidataformchange").change(function(){
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}
 	var getcorrId 	= 	$(this).attr("id");
 	var openformon		=	"";
 	var closeformon	=	"";
 	var flag				=	"";
 	if(getcorrId == "openformon"){
 		openformon 	= 	$(this).val();
 		flag		=	"openformon";
 	}
 	if(getcorrId == "closeformon"){
 		closeformon 	= 	$(this).val();
 		flag		=	"closeformon";
 	}
 	
 	var action = "edit"; 
 	var methodType = "POST"; 
 	var notifiObj = {'generalSettingValue':{}};
 	
 	if(customsettingsresponse != ""){
 				notifiObj['generalSettingValue']	=  	customsettingsresponse;
	 	$.each(customsettingupdateDescription.generalSettingValue,function(index,value){
 				
 			//$.each(customsettingsresponse,function(general,objval){
 				//notifiObj['generalSettingValue'][general] =  objval;
	 		if(flag == "openformon"){ 
					notifiObj['generalSettingValue']["openformon"] =  openformon; 
				}
				if(flag == "closeformon"){ 
					notifiObj['generalSettingValue']["closeformon"] =  closeformon; 
				}
	 		//});
	 	}); 
 	}else{
 		$.each(customsettingupdateDescription.generalSettingValue,function(general,objval){
			//notifiObj['generalSettingValue'][general] =  objval;
 			if(flag == "openformon"){ 
				notifiObj['generalSettingValue']["openformon"] =  openformon; 
			}
			if(flag == "closeformon"){ 
				notifiObj['generalSettingValue']["closeformon"] =  closeformon; 
			}
	 	});
 	}
 	if(flag == "openformon" || flag == "closeformon"){ 
 		notifiObj['generalSettingValue']["audittrailtype"] =  "KPI Schedule Form"; 
 	}
 	 
 	$.ajax({ 
 		url : "/stratroom/customPerformance", 
 		type : methodType, 
 		contentType:"application/json", 
 		data: JSON.stringify(notifiObj), 
 		success : function(data,status){ 
 		//if(data.controlPanelGeneralDTO.orgId != undefined){
 			//$("#deviceid").val(data.controlPanelGeneralDTO.orgId) 
 		//}
 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
 	},
 	error:function(){ 
 		$.notify("Failed: Updated Failed", { 
 		style: 'error',className: 'graynotify' }); 
 		} 
 	});
  
 });

$(".scoreperformance").click(function(){
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}
 	var getcorrId 	= 	$(this).attr("id");
 	var kpiscore	=	"";
 	var objectivescore		=	"";
 	var perspectivescore	=	"";
 	var scorecardscoreper	=	"";
 	var flag				=	"";
 	if(getcorrId == "kpiscore"){
 		kpiscore 	= 	$(this).prop("checked"); 
 		flag		=	"kpiscore";
 	}
 	
 	if(getcorrId == "objectivescore"){
 		objectivescore	= 	$(this).prop("checked"); 
 		flag		=	"objectivescore";
 	}
 	if(getcorrId == "perspectivescore"){
 		perspectivescore 	= 	$(this).prop("checked"); 
 		flag		=	"perspectivescore";
 	}
 	if(getcorrId == "scorecardscoreper"){
 		scorecardscoreper 	= 	$(this).prop("checked"); 
 		flag		=	"scorecardscoreper";
 	}
 	
 	var action = "edit"; 
 	var methodType = "POST"; 
 	var notifiObj = {'generalSettingValue':{}};
 	
 	if(customsettingsresponse != ""){
 				notifiObj['generalSettingValue']	=  	customsettingsresponse;
	 	$.each(customsettingupdateDescription.generalSettingValue,function(index,value){
 				
 			//$.each(customsettingsresponse,function(general,objval){
 				//notifiObj['generalSettingValue'][general] =  objval;
 				if(flag == "kpiscore"){ 
 					notifiObj['generalSettingValue']["kpiscore"] =  kpiscore;
 				}
 				if(flag == "objectivescore"){ 
 					notifiObj['generalSettingValue']["objectivescore"] =  objectivescore; 
 				}
 				if(flag == "perspectivescore"){ 
 					notifiObj['generalSettingValue']["perspectivescore"] =  perspectivescore; 
 				}
 				if(flag == "scorecardscoreper"){ 
 					notifiObj['generalSettingValue']["scorecardscoreper"] =  scorecardscoreper; 
 				}
	 		//});
	 	}); 
 	}else{
 		$.each(customsettingupdateDescription.generalSettingValue,function(general,objval){
			//notifiObj['generalSettingValue'][general] =  objval;
 			if(flag == "kpiscore"){ 
				notifiObj['generalSettingValue']["kpiscore"] =  kpiscore;
			}
			if(flag == "objectivescore"){ 
				notifiObj['generalSettingValue']["objectivescore"] =  objectivescore; 
			}
			if(flag == "perspectivescore"){ 
				notifiObj['generalSettingValue']["perspectivescore"] =  perspectivescore; 
			}
			if(flag == "scorecardscoreper"){ 
				notifiObj['generalSettingValue']["scorecardscoreper"] =  scorecardscoreper; 
			}
	 	});
 	}
 	 
 	$.ajax({ 
 		url : "/stratroom/customPerformance", 
 		type : methodType, 
 		contentType:"application/json", 
 		data: JSON.stringify(notifiObj), 
 		success : function(data,status){ 
 		//if(data.controlPanelGeneralDTO.orgId != undefined){
 			//$("#deviceid").val(data.controlPanelGeneralDTO.orgId) 
 		//}
 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
 	},
 	error:function(){ 
 		$.notify("Failed: Updated Failed", { 
 		style: 'error',className: 'graynotify' }); 
 		} 
 	});
  
 });
 

$("#custom_performance").change(function () {
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}
  if (this.checked) {
    $("#custom_threshold").show();
    $("#custom_performances").show();
    $(".perfor_sow").hide();
  } else {
    $("#custom_threshold").hide();
    $("#custom_performances").hide();
    $(".perfor_sow").show();
  }
});

$("#performance").change(function () {
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}
  if (this.checked) {
	  $("#threshold").show();
      $("#performances").show();
      $(".cus_perfor_sow").hide();
      $(".color_picks_03").css("display","block");
  } else {
	  $("#threshold").hide();
      $("#performances").hide();
      $(".cus_perfor_sow").show();
  }
});

$("#customPerspective").change(function () {
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}
  if (this.checked) {
    $("#persp_derivation").show();
  } else {
    $("#persp_derivation").hide();
  }
});

$("#aggregation").change(function () {
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}
  if (this.checked) {
    $("#agg_type").show();
  } else {
    $("#agg_type").hide();
  }
});

$("#kpi_threshold").change(function(){
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}
	var value	=	$(this).val();
	var notifiObj = {'generalSettingValue':{}};
	if(customsettingsresponse != ""){
		notifiObj['generalSettingValue']	=  	customsettingsresponse;
		 notifiObj['generalSettingValue']["threshold"] =  value;
 	}else{
 		$.each(customsettingupdateDescription.generalSettingValue,function(general,objval){
			if(general	==	"aggregationType"){ 
				notifiObj['generalSettingValue']["threshold"] =  value;
			}
	 	});
 	}
	if(value	==	""){
		$(".color_picks_one").css("display","none");
		$(".color_picks_two").css("display","none");
		$(".color_picks_three").css("display","none");
		$(".color_picks_five").css("display","none");

	}
	if(value	==	"option_1"){
		$(".color_picks_one").css("display","block");
		$(".color_picks_two").css("display","none");
		$(".color_picks_three").css("display","none");
		if(customsettingsresponse != ""){
			/*if(customsettingsresponse.threshold11 != undefined){
				$("#optioncolor1").val(customsettingsresponse.threshold11);
			}
			if(customsettingsresponse.threshold1Color1 !=	undefined){
				$(".input-group-append").find('span.optioncolor1').css('background',customsettingsresponse.threshold1Color1);
			}*/
			if(customsettingsresponse.threshold1 != undefined){
				$("#optioncolor1").val(customsettingsresponse.threshold1);
			}
			if(customsettingsresponse.threshold1Color !=	undefined){
				$(".input-group-append").find('span.optioncolor1').css('background',customsettingsresponse.threshold1Color);
			}
	 	}
	}else if(value	==	"option_2"){
		$(".color_picks_one").css("display","none");
		$(".color_picks_three").css("display","none");
		$(".color_picks_five").css("display","none");


		$(".color_picks_two").css("display","block");

		/*if(customsettingsresponse.threshold21 != undefined){
			$("#optioncolor1").val(customsettingsresponse.threshold21);
		}
		if(customsettingsresponse.threshold22 != undefined){
			$("#optioncolor2").val(customsettingsresponse.threshold22);
		}
		if(customsettingsresponse.threshold2Color1 !=	undefined){
			$(".input-group-append").find('span.optioncolor1').css('background',customsettingsresponse.threshold2Color1);
		}
		if(customsettingsresponse.threshold2Color2 !=	undefined){
			$(".input-group-append").find('span.optioncolor2').css('background',customsettingsresponse.threshold2Color2);
		}*/
		
		if(customsettingsresponse.threshold1 != undefined){
			$("#optioncolor1").val(customsettingsresponse.threshold1);
		}
		if(customsettingsresponse.threshold2 != undefined){
			$("#optioncolor2").val(customsettingsresponse.threshold2);
		}
		if(customsettingsresponse.threshold1Color !=	undefined){
			$(".input-group-append").find('span.optioncolor1').css('background',customsettingsresponse.threshold1Color);
		}
		if(customsettingsresponse.threshold2Color !=	undefined){
			$(".input-group-append").find('span.optioncolor2').css('background',customsettingsresponse.threshold2Color);
		}
	}else if(value	==	"three_status"){
		$(".color_picks_one").css("display","none");
		$(".color_picks_two").css("display","none");
		$(".color_picks_five").css("display","none");

		$(".color_picks_three").css("display","block");

		var elements = $(".color_picks_three");
		elements.removeClass("col-md-2").addClass("col-md-4");
	
		if(customsettingsresponse.threshold1 != undefined){
			$("#optioncolor1").val(customsettingsresponse.threshold1);
		}
		if(customsettingsresponse.threshold2 != undefined){
			$("#optioncolor2").val(customsettingsresponse.threshold2);
		}
		if(customsettingsresponse.threshold3 != undefined){
			$("#optioncolor3").val(customsettingsresponse.threshold3);
		}
		//	if(customsettingsresponse.threshold1Color !=	undefined){
	//		$(".input-group-append").find('span.optioncolor1').css('background',customsettingsresponse.threshold1Color);
	//	}else{
		$(".input-group-append").find('span.optioncolor1').css('background',"red");
		notifiObj['generalSettingValue']["threshold1Color"] = "rgba(255, 26, 9, 1)";
//	}
//	if(customsettingsresponse.threshold2Color !=	undefined){
//		$(".input-group-append").find('span.optioncolor2').css('background',customsettingsresponse.threshold2Color);
//	}else{
		$(".input-group-append").find('span.optioncolor2').css('background',"yellow");
		notifiObj['generalSettingValue']["threshold2Color"] = "rgba(255, 193, 7, 1)";

//	}
//	if(customsettingsresponse.threshold3Color !=	undefined){
//		$(".input-group-append").find('span.optioncolor3').css('background',customsettingsresponse.threshold3Color);
//	}else{
		$(".input-group-append").find('span.optioncolor3').css('background',"green");
		notifiObj['generalSettingValue']["threshold3Color"] = "rgba(2, 125, 2, 1)";

	}else if(value	==	"five_status"){
		$(".color_picks_one").css("display","none");
		$(".color_picks_two").css("display","none");
		$(".color_picks_three").css("display","none");
	
		$(".color_picks_five").css("display","block");
		var elements = $(".color_picks_five");
		elements.removeClass("col-md-4").addClass("col-md-2");
		

		if(customsettingsresponse.threshold1 != undefined){
			$("#optioncolor1").val(customsettingsresponse.threshold1);
		}
		if(customsettingsresponse.threshold2 != undefined){
			$("#optioncolor2").val(customsettingsresponse.threshold2);
		}
		if(customsettingsresponse.threshold3 != undefined){
			$("#optioncolor3").val(customsettingsresponse.threshold3);
		}
		if(customsettingsresponse.threshold4 != undefined){
			$("#optioncolor4").val(customsettingsresponse.threshold4);
		}
		if(customsettingsresponse.threshold5 != undefined){
			$("#optioncolor5").val(customsettingsresponse.threshold5);
		}
		//	if(customsettingsresponse.threshold1Color !=	undefined){
	//		$(".input-group-append").find('span.optioncolor1').css('background',customsettingsresponse.threshold1Color);
	//	}else{
			$(".input-group-append").find('span.optioncolor1').css('background',"red");
			notifiObj['generalSettingValue']["threshold1Color"] = "rgba(255, 0, 0, 1)";
			
	//	}
	//	if(customsettingsresponse.threshold2Color !=	undefined){
	//		$(".input-group-append").find('span.optioncolor2').css('background',customsettingsresponse.threshold2Color);
	//	}else{
			$(".input-group-append").find('span.optioncolor2').css('background',"#FF4B3E");
			notifiObj['generalSettingValue']["threshold2Color"] = "rgb(255, 75, 62)";

	//	}
	//	if(customsettingsresponse.threshold3Color !=	undefined){
	//		$(".input-group-append").find('span.optioncolor3').css('background',customsettingsresponse.threshold3Color);
	//	}else{
			$(".input-group-append").find('span.optioncolor3').css('background',"yellow");
			notifiObj['generalSettingValue']["threshold3Color"] = "rgba(255, 193, 7, 1)";

	//	}
	//	if(customsettingsresponse.threshold4Color !=	undefined){
	//		$(".input-group-append").find('span.optioncolor4').css('background',customsettingsresponse.threshold4Color);
	//	}else{
			$(".input-group-append").find('span.optioncolor4').css('background',"#5FCD5F");
			notifiObj['generalSettingValue']["threshold4Color"] = "rgb(95, 205, 95)";

	//	}
	//	if(customsettingsresponse.threshold5Color !=	undefined){
	//		$(".input-group-append").find('span.optioncolor5').css('background',customsettingsresponse.threshold5Color);
	//	}else{
			$(".input-group-append").find('span.optioncolor5').css('background',"green");
			notifiObj['generalSettingValue']["threshold5Color"] = "rgb(2, 125, 2)";

	//	}
	}
	var action = "edit"; 
 	var methodType = "POST"; 
 	
 	 
 	$.ajax({ 
 		url : "/stratroom/customPerformance", 
 		type : methodType, 
 		contentType:"application/json", 
 		data: JSON.stringify(notifiObj), 
 		success : function(data,status){
 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
 	},
 	error:function(){ 
 		$.notify("Failed: Updated Failed", { 
 		style: 'error',className: 'graynotify' }); 
 		} 
 	});
});

$("#kpi_threshold1").change(function(){
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}
	var value	=	$(this).val();

	var notifiObj = {'generalSettingValue':{}};
 	if(customsettingsresponse != ""){
		notifiObj['generalSettingValue']	=  	customsettingsresponse;
		notifiObj['generalSettingValue']["threshold"] =  value;
 	}
	if(value	==	""){
		$(".color_picks_01").css("display","none");
		$(".color_picks_02").css("display","none");
		$(".color_picks_03").css("display","none");
		$(".color_picks_05").css("display","none");

	}
	else if(value	==	"three_status"){
		$(".color_picks_01").css("display","none");
		$(".color_picks_02").css("display","none");
		$(".color_picks_05").css("display","none");

		$(".color_picks_03").css("display","block");

		var elements = $(".color_picks_03");
		elements.removeClass("col-md-2").addClass("col-md-4");

		if(customsettingsresponse.threshold1 != undefined){
			$(".perfor_sow #optioncolor1").val(customsettingsresponse.threshold1);
		}
		if(customsettingsresponse.threshold2 != undefined){
			$(".perfor_sow #optioncolor2").val(customsettingsresponse.threshold2);
		}
		if(customsettingsresponse.threshold3 != undefined){
			$(".perfor_sow #optioncolor3").val(customsettingsresponse.threshold3);
		}

	//	if(customsettingsresponse.threshold1Color !=	undefined){
	//		$(".input-group-append").find('span.optioncolor1').css('background',customsettingsresponse.threshold1Color);
	//	}else{
			$(".perfor_sow .input-group-append").find('span.optioncolor1').css('background',"red");
			notifiObj['generalSettingValue']["threshold1Color"] = "rgba(255, 26, 9, 1)";
	//	}
	//	if(customsettingsresponse.threshold2Color !=	undefined){
	//		$(".input-group-append").find('span.optioncolor2').css('background',customsettingsresponse.threshold2Color);
	//	}else{
			$(".perfor_sow .input-group-append").find('span.optioncolor2').css('background',"yellow");
			notifiObj['generalSettingValue']["threshold2Color"] = "rgba(255, 193, 7, 1)";

	//	}
	//	if(customsettingsresponse.threshold3Color !=	undefined){
	//		$(".input-group-append").find('span.optioncolor3').css('background',customsettingsresponse.threshold3Color);
	//	}else{
			$(".perfor_sow .input-group-append").find('span.optioncolor3').css('background',"green");
			notifiObj['generalSettingValue']["threshold3Color"] = "rgba(2, 125, 2, 1)";

	//	}
	}else if(value	==	"five_status"){
		$(".color_picks_01").css("display","none");
		$(".color_picks_02").css("display","none");
		$(".color_picks_03").css("display","none");

		$(".color_picks_05").css("display","block");

		var elements = $(".color_picks_05");
		elements.removeClass("col-md-4").addClass("col-md-2");

		if(customsettingsresponse.threshold1 != undefined){
			$(".perfor_sow #optioncolor1").val(customsettingsresponse.threshold1);
		}
		if(customsettingsresponse.threshold2 != undefined){
			$(".perfor_sow #optioncolor2").val(customsettingsresponse.threshold2);
		}
		if(customsettingsresponse.threshold3 != undefined){
			$(".perfor_sow #optioncolor3").val(customsettingsresponse.threshold3);
		}
		if(customsettingsresponse.threshold4 != undefined){
			$(".perfor_sow #optioncolor4").val(customsettingsresponse.threshold4);
		}
		if(customsettingsresponse.threshold5 != undefined){
			$(".perfor_sow #optioncolor5").val(customsettingsresponse.threshold5);
		}
	//	if(customsettingsresponse.threshold1Color !=	undefined){
	//		$(".input-group-append").find('span.optioncolor1').css('background',customsettingsresponse.threshold1Color);
	//	}else{
			$(".perfor_sow .input-group-append").find('span.optioncolor1').css('background',"red");
			notifiObj['generalSettingValue']["threshold1Color"] = "rgba(255, 0, 0, 1)";
			
	//	}
	//	if(customsettingsresponse.threshold2Color !=	undefined){
	//		$(".input-group-append").find('span.optioncolor2').css('background',customsettingsresponse.threshold2Color);
	//	}else{
			$(".perfor_sow .input-group-append").find('span.optioncolor2').css('background',"#FF4B3E");
			notifiObj['generalSettingValue']["threshold2Color"] = "rgb(255, 75, 62)";

	//	}
	//	if(customsettingsresponse.threshold3Color !=	undefined){
	//		$(".input-group-append").find('span.optioncolor3').css('background',customsettingsresponse.threshold3Color);
	//	}else{
			$(".perfor_sow .input-group-append").find('span.optioncolor3').css('background',"yellow");
			notifiObj['generalSettingValue']["threshold3Color"] = "rgba(255, 193, 7, 1)";

	//	}
	//	if(customsettingsresponse.threshold4Color !=	undefined){
	//		$(".input-group-append").find('span.optioncolor4').css('background',customsettingsresponse.threshold4Color);
	//	}else{
			$(".perfor_sow .input-group-append").find('span.optioncolor4').css('background',"#5FCD5F");
			notifiObj['generalSettingValue']["threshold4Color"] = "rgb(95, 205, 95)";

	//	}
	//	if(customsettingsresponse.threshold5Color !=	undefined){
	//		$(".input-group-append").find('span.optioncolor5').css('background',customsettingsresponse.threshold5Color);
	//	}else{
			$(".perfor_sow .input-group-append").find('span.optioncolor5').css('background',"green");
			notifiObj['generalSettingValue']["threshold5Color"] = "rgba(2, 125, 2, 1)";

	//	}
	}
	var action = "edit"; 
 	var methodType = "POST"; 
 	
 	 
 	$.ajax({ 
 		url : "/stratroom/customPerformance", 
 		type : methodType, 
 		contentType:"application/json", 
 		data: JSON.stringify(notifiObj), 
 		success : function(data,status){
 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
 	},
 	error:function(){ 
 		$.notify("Failed: Updated Failed", { 
 		style: 'error',className: 'graynotify' }); 
 		} 
 	});
});

$("#ag-type").change(function(){
	if(editpermission	==	false && createpermission	==	false){
		return false;
	}
	var val 	= 	$(this).val();
 	var action = "edit"; 
 	var methodType = "POST"; 
 	var notifiObj = {'generalSettingValue':{}};
 	if(customsettingsresponse != ""){
		notifiObj['generalSettingValue']	=  	customsettingsresponse;
 		notifiObj['generalSettingValue']["aggregationType"] =  val; 
 	}else{
 		$.each(customsettingupdateDescription.generalSettingValue,function(general,objval){
			if(general	==	"aggregationType"){ 
				notifiObj['generalSettingValue']["aggregationType"] =  val;
			}
	 	});
 	}
 	 
 	$.ajax({ 
 		url : "/stratroom/customPerformance", 
 		type : methodType, 
 		contentType:"application/json", 
 		data: JSON.stringify(notifiObj), 
 		success : function(data,status){
 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
 	},
 	error:function(){ 
 		$.notify("Failed: Updated Failed", { 
 		style: 'error',className: 'graynotify' }); 
 		} 
 	});
 });	
 
 $("#derivation").change(function(){
	 if(editpermission	==	false && createpermission	==	false){
			return false;
		}
	var val 	= 	$(this).val();
 	var action = "edit"; 
 	var methodType = "POST"; 
 	var notifiObj = {'generalSettingValue':{}};
 	if(customsettingsresponse != ""){
		notifiObj['generalSettingValue']	=  	customsettingsresponse;
 		notifiObj['generalSettingValue']["derivation"] =  val; 
 	}else{
 		$.each(customsettingupdateDescription.generalSettingValue,function(general,objval){
			if(general	==	"derivation"){ 
				notifiObj['generalSettingValue']["derivation"] =  val;
			}
	 	});
 	}
 	 
 	$.ajax({ 
 		url : "/stratroom/customPerformance", 
 		type : methodType, 
 		contentType:"application/json", 
 		data: JSON.stringify(notifiObj), 
 		success : function(data,status){
 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
 	},
 	error:function(){ 
 		$.notify("Failed: Updated Failed", { 
 		style: 'error',className: 'graynotify' }); 
 		} 
 	});
 });	 
 
 $(".colorvalueedit").blur(function(){
	 if(editpermission	==	false && createpermission	==	false){
			return false;
		}
 	var getcorrId 	= 	$(this).attr("id");
 	var value 		= 	$(this).val();
 	var flag		=	"";
 	if(getcorrId == "optioncolor1"){ 
 		flag		=	"threshold1";
 	}
 	if(getcorrId == "optioncolor2"){ 
 		flag		=	"threshold2";
 	}
 	if(getcorrId == "optioncolor3"){ 
 		flag		=	"threshold3";
 	}
 	if(getcorrId == "optioncolor4"){ 
 		flag		=	"threshold4";
 	}
 	if(getcorrId == "optioncolor5"){ 
 		flag		=	"threshold5";
 	}
 	if(getcorrId == "optioncolor1"){ 
 		flag		=	"threshold1";
 	}
 	
 	if(getcorrId == "optioncolor2"){ 
 		flag		=	"threshold2";
 	}
 	
 	if(getcorrId == "optioncolor3"){ 
 		flag		=	"threshold3";
 	}
	 if(getcorrId == "optioncolor4"){ 
		flag		=	"threshold4";
	}
	if(getcorrId == "optioncolor5"){ 
		flag		=	"threshold5";
	}
 	
 	var action = "edit"; 
 	var methodType = "POST"; 
 	var notifiObj = {'generalSettingValue':{}};
 	if(customsettingsresponse != ""){
 			notifiObj['generalSettingValue']	=  	customsettingsresponse;
			if(flag == "threshold1"){
				notifiObj['generalSettingValue']["threshold1"] =  value;
			}
			if(flag == "threshold2"){ 
				notifiObj['generalSettingValue']["threshold2"] =  value; 
			}
			if(flag == "threshold3"){ 
				notifiObj['generalSettingValue']["threshold3"] =  value; 
			}
			if(flag == "threshold4"){ 
				notifiObj['generalSettingValue']["threshold4"] =  value; 
			}
			if(flag == "threshold5"){ 
				notifiObj['generalSettingValue']["threshold5"] =  value; 
			}
			
			
 	}else{
 			notifiObj	=  	customsettingupdateDescription;
			if(flag == "threshold1"){
				notifiObj['generalSettingValue']["threshold1"] =  value;
			}
			if(flag == "threshold2"){ 
				notifiObj['generalSettingValue']["threshold2"] =  value; 
			}
			if(flag == "threshold3"){ 
				notifiObj['generalSettingValue']["threshold3"] =  value; 
			}
			if(flag == "threshold4"){ 
				notifiObj['generalSettingValue']["threshold4"] =  value; 
			}
			if(flag == "threshold5"){ 
				notifiObj['generalSettingValue']["threshold5"] =  value; 
			}
			
 	}
 	 
 	$.ajax({ 
 		url : "/stratroom/customPerformance", 
 		type : methodType, 
 		contentType:"application/json", 
 		data: JSON.stringify(notifiObj), 
 		success : function(data,status){ 
 		//if(data.controlPanelGeneralDTO.orgId != undefined){
 			//$("#deviceid").val(data.controlPanelGeneralDTO.orgId) 
 		//}
 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
 	},
 	error:function(){ 
 		$.notify("Failed: Updated Failed", { 
 		style: 'error',className: 'graynotify' }); 
 		} 
 	});
 });
 
 $(".kpiviewsettingchange").click(function(){
	 if(editpermission	==	false && createpermission	==	false){
		return false;
	}
	 	var getcorrId 	= 	$(this).attr("id");
	 	var datatableactual	=	"";
	 	var datatabletarget	=	"";
	 	var datatablegap	=	"";
	 	var datatableytd	=	"";
		var datatablebaseline	=	"";
	 	var datatableannualtarget	=	"";
	 	var drilltableactual	=	"";
	 	var drilltabletarget	=	"";
	 	var drilltablegap	=	"";
		var drilltablebaseline	=	"";
	 	var flag		=	"";
	 	if(getcorrId == "datatableactual"){
	 		datatableactual 	= 	$(this).prop("checked"); 
	 		flag		=	"datatableactual";
	 	}
	 	if(getcorrId == "datatabletarget"){
	 		datatabletarget 	= 	$(this).prop("checked"); 
	 		flag			=	"datatabletarget";
	 	}

		if(getcorrId == "datatablebaseline"){
	 		datatablebaseline 	= 	$(this).prop("checked"); 
	 		flag			=	"datatablebaseline";
	 	}
	 	if(getcorrId == "datatablegap"){
	 		datatablegap 	= 	$(this).prop("checked"); 
	 		flag			=	"datatablegap";
	 	}
	 	if(getcorrId == "datatableytd"){
	 		datatableytd 	= 	$(this).prop("checked"); 
	 		flag			=	"datatableytd";
	 	}
	 	if(getcorrId == "datatableannualtarget"){
	 		datatableannualtarget 	= 	$(this).prop("checked"); 
	 		flag		=	"datatableannualtarget";
	 	}
	 	if(getcorrId == "drilltableactual"){
	 		drilltableactual 	= 	$(this).prop("checked"); 
	 		flag		=	"drilltableactual";
	 	}

		if(getcorrId == "drilltablebaseline"){
	 		drilltablebaseline 	= 	$(this).prop("checked"); 
	 		flag		=	"drilltablebaseline";
	 	}
	 	if(getcorrId == "drilltabletarget"){
	 		drilltabletarget 	= 	$(this).prop("checked"); 
	 		flag		=	"drilltabletarget";
	 	}
	 	if(getcorrId == "drilltablegap"){
	 		drilltablegap 	= 	$(this).prop("checked"); 
	 		flag		=	"drilltablegap";
	 	}
	 
	 	var action = "edit"; 
	 	var methodType = "POST"; 
	 	var notifiObj = {'generalSettingValue':{}};
	 	if(customsettingsresponse != ""){
	 				notifiObj['generalSettingValue']	=  	customsettingsresponse;
		 	$.each(customsettingupdateDescription.generalSettingValue,function(index,value){
	 				
	 			//$.each(customsettingsresponse,function(general,objval){
	 				//notifiObj['generalSettingValue'][general] =  objval;
	 				if(flag == "datatableactual"){ 
	 					notifiObj['generalSettingValue']["datatableactual"] =  datatableactual;
	 				}
	 				if(flag == "datatabletarget"){ 
	 					notifiObj['generalSettingValue']["datatabletarget"] =  datatabletarget; 
	 				}

					if(flag == "datatablebaseline"){ 
	 					notifiObj['generalSettingValue']["datatablebaseline"] =  datatablebaseline; 
	 				}
	 				if(flag == "datatablegap"){ 
	 					notifiObj['generalSettingValue']["datatablegap"] =  datatablegap; 
	 				}
	 				if(flag == "datatableytd"){ 
	 					notifiObj['generalSettingValue']["datatableytd"] =  datatableytd; 
	 				}
	 				if(flag == "datatableannualtarget"){ 
	 					notifiObj['generalSettingValue']["datatableannualtarget"] =  datatableannualtarget; 
	 				}
	 				if(flag == "drilltableactual"){ 
	 					notifiObj['generalSettingValue']["drilltableactual"] =  drilltableactual; 
	 				}

					if(flag == "drilltablebaseline"){ 
	 					notifiObj['generalSettingValue']["drilltablebaseline"] =  drilltablebaseline; 
	 				}
	 				if(flag == "drilltabletarget"){ 
	 					notifiObj['generalSettingValue']["drilltabletarget"] =  drilltabletarget; 
	 				}
	 				if(flag == "drilltablegap"){ 
	 					notifiObj['generalSettingValue']["drilltablegap"] =  drilltablegap; 
	 				}
		 		//});
		 	}); 
	 	}else{
	 		$.each(customsettingupdateDescription.generalSettingValue,function(general,objval){
				//notifiObj['generalSettingValue'][general] =  objval;
	 			if(flag == "datatableactual"){ 
 					notifiObj['generalSettingValue']["datatableactual"] =  datatableactual;
 				}
 				if(flag == "datatabletarget"){ 
 					notifiObj['generalSettingValue']["datatabletarget"] =  datatabletarget; 
 				}

				if(flag == "datatablebaseline"){ 
 					notifiObj['generalSettingValue']["datatablebaseline"] =  datatablebaseline; 
 				}
 				if(flag == "datatablegap"){ 
 					notifiObj['generalSettingValue']["datatablegap"] =  datatablegap; 
 				}
 				if(flag == "datatableytd"){ 
 					notifiObj['generalSettingValue']["datatableytd"] =  datatableytd; 
 				}
 				if(flag == "datatableannualtarget"){ 
 					notifiObj['generalSettingValue']["datatableannualtarget"] =  datatableannualtarget; 
 				}
 				if(flag == "drilltableactual"){ 
 					notifiObj['generalSettingValue']["drilltableactual"] =  drilltableactual; 
 				}

				if(flag == "drilltablebaseline"){ 
 					notifiObj['generalSettingValue']["drilltablebaseline"] =  drilltablebaseline; 
 				}
 				if(flag == "drilltabletarget"){ 
 					notifiObj['generalSettingValue']["drilltabletarget"] =  drilltabletarget; 
 				}
 				if(flag == "drilltablegap"){ 
 					notifiObj['generalSettingValue']["drilltablegap"] =  drilltablegap; 
 				}
		 	});
	 	}
	 	if(flag=="drilltableactual" || flag=="drilltabletarget" || flag=="drilltablegap" || flag=="drilltablebaseline"){ 
			notifiObj['generalSettingValue']["audittrailtype"] =  "KPI Data Drill Down Fields Modified"; 
		}

		
	 	else{
	 		notifiObj['generalSettingValue']["audittrailtype"] =  "KPI Data Table Fields Modified"; 
	 	}
	 	
	 	$.ajax({ 
	 		url : "/stratroom/customPerformance", 
	 		type : methodType, 
	 		contentType:"application/json", 
	 		data: JSON.stringify(notifiObj), 
	 		success : function(data,status){ 
	 		//if(data.controlPanelGeneralDTO.orgId != undefined){
	 			//$("#deviceid").val(data.controlPanelGeneralDTO.orgId) 
	 		//}
	 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
	 	},
	 	error:function(){ 
	 		$.notify("Failed: Updated Failed", { 
	 		style: 'error',className: 'graynotify' }); 
	 		} 
	 	});
	  
	 });
 
 $(".scorecardviewsettingchange").click(function(){
	console.log("function CLicked");
	 if(editpermission	==	false && createpermission	==	false){
		return false;
	}
	 	var getcorrId 	= 	$(this).attr("id");
	 	var scorecardactual	=	"";
	 	var scorecardtarget	=	"";
	 	var scorecardbudget	=	"";
	 	var scorecardforecast	=	"";
		var scorecardbaseline	=	"";
		var scorecarddecline	=	"";
	 	var scorecardscore	=	"";
	 	var scorecardtrend	=	"";
	 	var scorecardrisk	=	"";
	 	var flag		=	"";
	 	if(getcorrId == "scorecardactual"){
	 		scorecardactual 	= 	$(this).prop("checked"); 
	 		flag		=	"scorecardactual";
	 	}
	 	if(getcorrId == "scorecardtarget"){
	 		scorecardtarget 	= 	$(this).prop("checked"); 
	 		flag			=	"scorecardtarget";
	 	}
	 	if(getcorrId == "scorecardbudget"){
	 		scorecardbudget 	= 	$(this).prop("checked"); 
	 		flag			=	"scorecardbudget";
	 	}
	 	if(getcorrId == "scorecardforecast"){
	 		scorecardforecast 	= 	$(this).prop("checked"); 
	 		flag			=	"scorecardforecast";
	 	}
	 	if(getcorrId == "scorecardscore"){
	 		scorecardscore 	= 	$(this).prop("checked"); 
	 		flag		=	"scorecardscore";
	 	}
	 	if(getcorrId == "scorecardtrend"){
	 		scorecardtrend 	= 	$(this).prop("checked"); 
	 		flag		=	"scorecardtrend";
	 	}
	 	if(getcorrId == "scorecardrisk"){
	 		scorecardrisk 	= 	$(this).prop("checked"); 
	 		flag		=	"scorecardrisk";
	 	}

		if(getcorrId == "scorecardbaseline"){
	 		scorecardbaseline 	= 	$(this).prop("checked"); 
	 		flag		=	"scorecardbaseline";
	 	}

		if(getcorrId == "scorecarddecline"){
	 		scorecarddecline 	= 	$(this).prop("checked"); 
	 		flag		=	"scorecarddecline";
	 	}
	 
	 	var action = "edit"; 
	 	var methodType = "POST"; 
	 	var notifiObj = {'generalSettingValue':{}};
		console.log(customsettingsresponse, "customsettingsresponse");
	 	if(customsettingsresponse != ""){
			console.log("function First")
	 				notifiObj['generalSettingValue']	=  	customsettingsresponse;
		 	$.each(customsettingupdateDescription.generalSettingValue,function(index,value){
	 				if(flag == "scorecardactual"){ 
	 					notifiObj['generalSettingValue']["scorecardactual"] =  scorecardactual;
	 				}
	 				if(flag == "scorecardtarget"){ 
	 					notifiObj['generalSettingValue']["scorecardtarget"] =  scorecardtarget; 
	 				}
	 				if(flag == "scorecardbudget"){ 
	 					notifiObj['generalSettingValue']["scorecardbudget"] =  scorecardbudget; 
	 				}
	 				if(flag == "scorecardforecast"){ 
	 					notifiObj['generalSettingValue']["scorecardforecast"] =  scorecardforecast; 
	 				}
	 				if(flag == "scorecardscore"){ 
	 					notifiObj['generalSettingValue']["scorecardscore"] =  scorecardscore; 
	 				}
	 				if(flag == "scorecardtrend"){ 
	 					notifiObj['generalSettingValue']["scorecardtrend"] =  scorecardtrend; 
	 				}
	 				if(flag == "scorecardrisk"){ 
	 					notifiObj['generalSettingValue']["scorecardrisk"] =  scorecardrisk; 
	 				}
					if(flag == "scorecardbaseline"){ 
	 					notifiObj['generalSettingValue']["scorecardbaseline"] =  scorecardbaseline; 
	 				}
					if(flag == "scorecarddecline"){ 
	 					notifiObj['generalSettingValue']["scorecarddecline"] =  scorecarddecline; 
	 				}
		 	}); 
	 	}else{
			console.log(customsettingupdateDescription, "second First")
	 		$.each(customsettingupdateDescription.generalSettingValue,function(general,objval){
	 			if(flag == "scorecardactual"){ 
 					notifiObj['generalSettingValue']["scorecardactual"] =  scorecardactual;
 				}
 				if(flag == "scorecardtarget"){ 
 					notifiObj['generalSettingValue']["scorecardtarget"] =  scorecardtarget; 
 				}
 				if(flag == "scorecardbudget"){ 
 					notifiObj['generalSettingValue']["scorecardbudget"] =  scorecardbudget; 
 				}
 				if(flag == "scorecardforecast"){ 
 					notifiObj['generalSettingValue']["scorecardforecast"] =  scorecardforecast; 
 				}
 				if(flag == "scorecardscore"){ 
 					notifiObj['generalSettingValue']["scorecardscore"] =  scorecardscore; 
 				}
 				if(flag == "scorecardtrend"){ 
 					notifiObj['generalSettingValue']["scorecardtrend"] =  scorecardtrend; 
 				}
 				if(flag == "scorecardrisk"){ 
 					notifiObj['generalSettingValue']["scorecardrisk"] =  scorecardrisk; 
 				}

				if(flag == "scorecardbaseline"){ 
 					notifiObj['generalSettingValue']["scorecardbaseline"] =  scorecardbaseline; 
 				}

				if(flag == "scorecarddecline"){ 
 					notifiObj['generalSettingValue']["scorecarddecline"] =  scorecarddecline; 
 				}
		 	});
	 	}
	 	if(flag){ 
			notifiObj['generalSettingValue']["audittrailtype"] =  "Scorecard Field Modified"; 
		}
	 	
	 	$.ajax({ 
	 		url : "/stratroom/customPerformance", 
	 		type : methodType, 
	 		contentType:"application/json", 
	 		data: JSON.stringify(notifiObj), 
	 		success : function(data,status){
	 		$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
	 	},
	 	error:function(){ 
	 		$.notify("Failed: Updated Failed", { 
	 		style: 'error',className: 'graynotify' }); 
	 		} 
	 	});
	  
	 });

	 $(".modal-custom-select").change(function() {

		var selectId = $(this).attr("id"); // For example, 'cause-select'
        var selectedValue = $(this).val();

		var selectedtype = selectId.replace("-select","")
	

		if (selectedValue == 'addOption') {
            var newValue = prompt("Please enter the new value:");
			if (newValue) { // Check if the user entered something
				var newText = prompt("Please enter the new Text:");
                $(this).append(new Option(newText, newValue));
				var data = {
					"value" : newValue,
					"option" : newText,
					"type" : selectedtype
				}
				$.ajax({
                    url: '/stratroom/riskoptions', // Your API endpoint to save the new option
                    type: 'POST',
					contentType: 'application/json', // Set the content type to application/json
					data: JSON.stringify(data), // Convert your data object to a JSON string
					success: function(response) {
                        console.log('New option added and saved:', response);
                    },
                    error: function(error) {
                        console.error('Error saving the new option:', error);
                    }
                });

			}
		}else
		{

			var methodType = "POST"; 

			var residualscoreimpact = false;
			var residualscorepossibility=false;
	
			var notifiObj = {'risksetting':{}};
			if(customsettingsresponse != ""){
						notifiObj['risksetting']	=  	customsettingsresponse;
			}
			if(selectId == "residualriskscore-select")
			{

				if(selectedValue	==	"reducingimpact"){
					residualscoreimpact=true;
				}else{
					residualscorepossibility=true;
				}
		
		
				notifiObj['risksetting']["residualscoreimpact"] =  residualscoreimpact; 
				notifiObj['risksetting']["residualscorepossibility"] =  residualscorepossibility; 
		
				
			}else if(selectId == "inherentriskscore-select")
			{

				var inherentscorecause =false;
				var inherentscoreconq=false;
	
					if(selectedValue	==	"cause"){
						inherentscorecause=true;
					}else{
						inherentscoreconq=true;
					}


				var notifiObj = {'risksetting':{}};
				notifiObj['risksetting']["inherentscorecause"] =  inherentscorecause; 
				notifiObj['risksetting']["inherentscoreconq"] =  inherentscoreconq; 

				
			
			}

		
			notifiObj['risksetting'][selectId] = selectedValue;
			


			if(selectId){ 
				notifiObj['risksetting']["audittrailtype"] =  "Risk Field Modified"; 
			}

			methodType = "POST";
			 
			 $.ajax({ 
				 url : "/stratroom/customPerformance/risk", 
				 type : methodType, 
				 contentType:"application/json", 
				 data: JSON.stringify(notifiObj), 
				 success : function(data,status){
				 $.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
			 },
			 error:function(){ 
				 $.notify("Failed: Updated Failed", { 
				 style: 'error',className: 'graynotify' }); 
				 } 
			 });
		}

	

	 });

	 

	 $(".riskviewsettingchange").click(function(){
			if(editpermission	==	false && createpermission	==	false)
			{
		  	 	return false;
	  		}
			var getcorrId 	= 	$(this).attr("id");
			var riskinherentscore	=	"";
			var riskresidualscore	=	"";
			var riskrelatedparties	=	"";
			var riskpos	=	"";
			var riskiso	=	"";
			var riskinformationasset	=	"";
			var riskpersonincharge	=	"";
			var riskothers	=	"";
			var cause_input="";
	   		var cousecategory="";
			var Consequence_input="";
			var possibleeve="";
			var ImpactDescription="";
			var couserating="";
			var possibilitydescription="";
			var riskcategory="";
			var controlbtn="";
			var effectivenessbtn="";
			var actionbtn="";
			var riskcustomscore="";
			var riskderivations="";
			var riskresidual="";


			var flag		=	"";
			if(getcorrId == "riskinherentscore"){
				riskinherentscore 	= 	$(this).prop("checked"); 
				flag		=	"riskinherentscore";
			}
			if(getcorrId == "riskresidualscore"){
				riskresidualscore 	= 	$(this).prop("checked"); 
				flag			=	"riskresidualscore";
			}
			if(getcorrId == "riskrelatedparties"){
				riskrelatedparties 	= 	$(this).prop("checked"); 
				flag			=	"riskrelatedparties";
			}
			if(getcorrId == "riskpos"){
				riskpos 	= 	$(this).prop("checked"); 
				flag			=	"riskpos";
			}
			if(getcorrId == "riskiso"){
				riskiso 	= 	$(this).prop("checked"); 
				flag		=	"riskiso";
			}
			if(getcorrId == "riskinformationasset"){
				riskinformationasset 	= 	$(this).prop("checked"); 
				flag		=	"riskinformationasset";
			}
			if(getcorrId == "riskpersonincharge"){
				riskpersonincharge 	= 	$(this).prop("checked"); 
				flag		=	"riskpersonincharge";
			}

			if(getcorrId == "riskothers"){
				riskothers 	= 	$(this).prop("checked"); 
				flag		=	"riskothers";
			}
			if(getcorrId == "cause-input"){
				cause_input 	= 	$(this).prop("checked"); 
				flag			=	"cause-input";
			}
			if(getcorrId == "cousecategory"){
				cousecategory 	= 	$(this).prop("checked"); 
				flag			=	"cousecategory";
			}
			if(getcorrId == "Consequence-input"){
				Consequence_input 	= 	$(this).prop("checked"); 
				flag			=	"Consequence-input";
			}
			if(getcorrId == "possibleeve"){
				possibleeve 	= 	$(this).prop("checked"); 
				flag		=	"possibleeve";
			}
			if(getcorrId == "ImpactDescription"){
				ImpactDescription 	= 	$(this).prop("checked"); 
				flag		=	"ImpactDescription";
			}
			if(getcorrId == "couserating"){
				couserating 	= 	$(this).prop("checked"); 
				flag		=	"couserating";
			}

			if(getcorrId == "possibilitydescription"){
				possibilitydescription 	= 	$(this).prop("checked"); 
				flag			=	"possibilitydescription";
			}
			if(getcorrId == "riskcategory"){
				riskcategory 	= 	$(this).prop("checked"); 
				flag			=	"riskcategory";
			}
			if(getcorrId == "controlbtn"){
				controlbtn 	= 	$(this).prop("checked"); 
				flag		=	"controlbtn";
			}
			if(getcorrId == "effectivenessbtn"){
				effectivenessbtn 	= 	$(this).prop("checked"); 
				flag		=	"effectivenessbtn";
			}
			if(getcorrId == "actionbtn"){
				actionbtn 	= 	$(this).prop("checked"); 
				flag		=	"actionbtn";
			}

			if(getcorrId == "riskcustomscore"){
				riskcustomscore 	= 	$(this).prop("checked"); 
				flag		=	"riskcustomscore";
			}
			if(getcorrId == "riskderivations"){
				riskderivations 	= 	$(this).prop("checked"); 
				flag		=	"riskderivations";
			}
			if(getcorrId == "riskresidual"){
				riskresidual 	= 	$(this).prop("checked"); 
				flag		=	"riskresidual";
			}
		
			var action = "edit"; 
			var methodType = "POST"; 
			var notifiObj = {'risksetting':{}};
			if(customsettingsresponse != ""){
						notifiObj['risksetting']	=  	customsettingsresponse;
						if(flag == "riskinherentscore"){ 
							notifiObj['risksetting']["riskinherentscore"] =  riskinherentscore;
						}
						if(flag == "riskresidualscore"){ 
							notifiObj['risksetting']["riskresidualscore"] =  riskresidualscore; 
						}
						if(flag == "riskrelatedparties"){ 
							notifiObj['risksetting']["riskrelatedparties"] =  riskrelatedparties; 
						}
						if(flag == "riskiso"){ 
							notifiObj['risksetting']["riskiso"] =  riskiso; 
						}
						if(flag == "riskpos"){ 
							notifiObj['risksetting']["riskpos"] =  riskpos; 
						}
						if(flag == "riskinformationasset"){ 
							notifiObj['risksetting']["riskinformationasset"] =  riskinformationasset; 
						}
						if(flag == "riskpersonincharge"){ 
							notifiObj['risksetting']["riskpersonincharge"] =  riskpersonincharge; 
						}

						if(flag == "riskothers"){ 
							notifiObj['risksetting']["riskothers"] =  riskothers;
						}
						if(flag == "cause-input"){ 
							notifiObj['risksetting']["cause_input"] =  cause_input; 
						}
						if(flag == "cousecategory"){ 
							notifiObj['risksetting']["cousecategory"] =  cousecategory; 
						}
						if(flag == "Consequence-input"){ 
							notifiObj['risksetting']["Consequence_input"] =  Consequence_input; 
						}
						if(flag == "possibleeve"){ 
							notifiObj['risksetting']["possibleeve"] =  possibleeve; 
						}
						if(flag == "ImpactDescription"){ 
							notifiObj['risksetting']["ImpactDescription"] =  ImpactDescription; 
						}
						if(flag == "couserating"){ 
							notifiObj['risksetting']["couserating"] =  couserating; 
						}

						if(flag == "possibilitydescription"){ 
							notifiObj['risksetting']["possibilitydescription"] =  possibilitydescription	;
						}
						if(flag == "riskcategory"){ 
							notifiObj['risksetting']["riskcategory"] =  riskcategory; 
						}
						if(flag == "controlbtn"){ 
							notifiObj['risksetting']["controlbtn"] =  controlbtn; 
						}
						if(flag == "effectivenessbtn"){ 
							notifiObj['risksetting']["effectivenessbtn"] =  effectivenessbtn; 
						}
						if(flag == "actionbtn"){ 
							notifiObj['risksetting']["actionbtn"] =  actionbtn; 
						}
						if(flag == "riskcustomscore"){ 
							notifiObj['risksetting']["riskcustomscore"] =  riskcustomscore; 
						}
						if(flag == "riskderivations"){ 
							notifiObj['risksetting']["riskderivations"] =  riskderivations; 
						}
						if(flag == "riskresidual"){ 
							notifiObj['risksetting']["riskresidual"] =  riskresidual; 
						}
			}else{
				notifiObj['risksetting']	= risksettingupdateDescription.risksetting
					if(flag == "riskinherentscore"){ 
						notifiObj['risksetting']["riskinherentscore"] =  riskinherentscore;
					}
					if(flag == "riskresidualscore"){ 
						notifiObj['risksetting']["riskresidualscore"] =  riskresidualscore; 
					}
					if(flag == "riskrelatedparties"){ 
						notifiObj['risksetting']["riskrelatedparties"] =  riskrelatedparties; 
					}
					if(flag == "riskiso"){ 
						notifiObj['risksetting']["riskiso"] =  riskiso; 
					}
					if(flag == "riskpos"){ 
						notifiObj['risksetting']["riskpos"] =  riskpos; 
					}
					if(flag == "riskinformationasset"){ 
						notifiObj['risksetting']["riskinformationasset"] =  riskinformationasset; 
					}
					if(flag == "riskpersonincharge"){ 
						notifiObj['risksetting']["riskpersonincharge"] =  riskpersonincharge; 
					}

					if(flag == "riskothers"){ 
						notifiObj['risksetting']["riskothers"] =  riskothers;
					}
					if(flag == "cause-input"){ 
						notifiObj['risksetting']["cause_input"] =  cause_input; 
					}
					if(flag == "cousecategory"){ 
						notifiObj['risksetting']["cousecategory"] =  cousecategory; 
					}
					if(flag == "Consequence-input"){ 
						notifiObj['risksetting']["Consequence_input"] =  Consequence_input; 
					}
					if(flag == "possibleeve"){ 
						notifiObj['risksetting']["possibleeve"] =  possibleeve; 
					}
					if(flag == "ImpactDescription"){ 
						notifiObj['risksetting']["ImpactDescription"] =  ImpactDescription; 
					}
					if(flag == "couserating"){ 
						notifiObj['risksetting']["couserating"] =  couserating; 
					}


					if(flag == "possibilitydescription"){ 
						notifiObj['risksetting']["possibilitydescription"] =  possibilitydescription	;
					}
					if(flag == "riskcategory"){ 
						notifiObj['risksetting']["riskcategory"] =  riskcategory; 
					}
					if(flag == "controlbtn"){ 
						notifiObj['risksetting']["controlbtn"] =  controlbtn; 
					}
					if(flag == "effectivenessbtn"){ 
						notifiObj['risksetting']["effectivenessbtn"] =  effectivenessbtn; 
					}
					if(flag == "actionbtn"){ 
						notifiObj['risksetting']["actionbtn"] =  actionbtn; 
					}
					if(flag == "riskcustomscore"){ 
						notifiObj['risksetting']["riskcustomscore"] =  riskcustomscore; 
					}
					if(flag == "riskderivations"){ 
						notifiObj['risksetting']["riskderivations"] =  riskderivations; 
					}
					if(flag == "riskresidual"){ 
						notifiObj['risksetting']["riskresidual"] =  riskresidual; 
					}
			}
			if(flag){ 
			   notifiObj['risksetting']["audittrailtype"] =  "Risk Field Modified"; 
		   }
			
		   methodType = "POST";
			$.ajax({ 
				url : "/stratroom/customPerformance/risk", 
				type : methodType, 
				contentType:"application/json", 
				data: JSON.stringify(notifiObj), 
				success : function(data,status){
				$.notify("Success:Updated Successfully", { style: 'success', className: 'graynotify' }); 
			},
			error:function(){ 
				$.notify("Failed: Updated Failed", { 
				style: 'error',className: 'graynotify' }); 
				} 
			});
		 
		});
 
	 $("#implementation").change(function(){
		 if($(this).val()	==	"BSC"){
			 $(".implementation-option").show();
		 }else{
			 $(".implementation-option").hide();
		 }
	 });

	




	 function updateData(priority, field, value) {
		
		if(field == "description")
		{
			var data=  {
				priority: priority,
				description: value
			}
		}else
		{
			var data=  {
				priority: priority,
				score: value
			}
		}
		

        $.ajax({
            url: '/stratroom/riskcustomscore', // Your actual API endpoint
            type: 'PUT',
			contentType: 'application/json', // Set the content type to application/json
			data: JSON.stringify(data), // Convert your data object to a JSON string
           
            success: function(response) {
                console.log('Update successful:', response);
            },
            error: function(error) {
                console.error('Error updating:', error);
            }
        });
    }


	$(document).on('blur', ".editableTxt1", function () {
		var $this = $(this);
		var newValue = $this.text().trim();
		var originalValue = $this.data('original');
	
		if (newValue !== originalValue) {
			var priority = $this.data('priority');  // Get priority directly from the element
			var field = $this.hasClass('description') ? 'description' : 'score';
	
			var value;
			if (field == 'description') {
				value = newValue;
				var scoreElement = $this.parent().next().find('.score');
				var score = scoreElement.text().trim();
				console.log("Description edited, Score is: " + score);
			} else {
				value = newValue;  // Here newValue is the score itself as the score field was edited
				console.log("Score edited, Score is: " + value);
			}
	
			console.log(field + " :: " + value + " :: Priority :: " + priority);
	
			updateData(priority, field, value);
	
			// Update the original value to the new value after the update
			$this.data('original', newValue);
		}
	});

$(document).ready(function () {
  
  $(".lang-checkbox").on("change", function () {
   
    const selectedLangs = $(".lang-checkbox:checked")
      .map(function () {
        return $(this).val();
      })
      .get(); 

   
    const langString = selectedLangs.join(", ");

    localStorage.setItem("lang", langString);

    console.log("Saved languages:", langString);
  });
});






const page_controllPanel_ar = {
  "RiskPage": {
  "Inherent Risk Score": "درجة المخاطر الكامنة",
  "Derivation": "الاشتقاق",
  "Residual Risk Score": "درجة المخاطر المتبقية",
  "Risk Custom Score": "الدرجة المخصصة للمخاطر",
  "Action": "الإجراء",
  "Control effectivenesss": "فعالية الرقابة",
  "Control Types": "أنواع الرقابة",
  "Risk Category": "فئة المخاطر",
  "Type": "النوع",
  "Reducing Possibility Description": "وصف تقليل الاحتمالية",
  "Rating": "التصنيف",
  "Reducing Impact Description": "وصف تقليل التأثير",
  "Possible Event": "الحدث المحتمل",
  "Consequence Description": "وصف العواقب",
  "Category": "الفئة",
  "Cause Description": "وصف السبب",
  "Others": "أخرى",
  "Person In Charge": "الشخص المسؤول",
  "Information Asset": "الأصل المعلوماتي",
  "ISO Standard": "المعيار الدولي ISO",
  "POS": "نقطة البيع (POS)",
  "Related Parties": "الأطراف ذات الصلة",
  "Risk Fields": "حقول المخاطر",
  "Risk Settings": "إعدادات المخاطر"
},
	"controlpanel": {
		"System": "النظام",
		"Dark": "داكن",
		"Light": "فاتح",
		"Login logo should be within 700kb and dimension should be 8050x3350": "يجب أن يكون شعار تسجيل الدخول ضمن 700 كيلوبايت وبأبعاد 8050 × 3350",
        "Login theme should be within 300kb and dimension should be 1310x1100": "يجب أن يكون سِمة تسجيل الدخول ضمن 300 كيلوبايت وبأبعاد 1310 × 1100",
		"Theme": "السِمة",
		"Choose a File or Drag it Here": "اختر ملفًا أو اسحبه إلى هنا",
		"title": "لوحة التحكم",
		"baseLine": "الخط الأساسي",
		"Are Sub Measures required?": "هل هناك حاجة إلى مقاييس فرعية؟",
		"Risk Setting" : "إعداد المخاطر",
		"Risk Fields": "حقول المخاطر",
		"OKR" : "أوكر",
		"Workflow Setting": "إعداد سير العمل",
		"Custom Performance": "الأداء المخصص",
		"Custom Threshold" : "الحد المخصص",
	},
    "general": {
        "General": "عام",
        "General Settings": "الإعدادات العامة",
        "Site Name": "اسم الموقع",
        "Site Language": "لغة الموقع",
        "Admin EMail ID": "معرف البريد الإلكتروني للمسؤول",
        "Currency": "العملة",
        "Currency View": "عرض العملة",
        "Default Data period": "فترة البيانات الافتراضية",
        "Financial Cycle": "الدورة المالية",
        "Start Month": "شهر البداية",
        "End Month": "شهر النهاية",
        "Time Zone": "المنطقة الزمنية",
        "Implementation": "التنفيذ",
        "Implementation Type": "نوع التنفيذ",
        "Save": "حفظ"
    },
    "themes": {
        "Themes": "السمات",
        "Login": "تسجيل الدخول",
        "Logo": "الشعار",
        "Branding Colour": "لون العلامة التجارية"
    },
    "license": {
        "License": "الترخيص",
        "Valid": "صالح",
        "Total Users": "إجمالي المستخدمين",
        "Modules Subscribed": "الوحدات المشترك فيها"
    },
    "modules": {
        "Audit Trail": "سجل المراجعة",
        "Charts": "الرسوم البيانية",
        "Cockpit": "قمرة القيادة",
        "Control Panel": "لوحة التحكم",
        "Data Sources": "مصادر البيانات",
        "Initiatives & Projects": "المبادرات والمشاريع",
        "Meetings": "الاجتماعات",
        "My Space": "مساحتي",
        "Organization": "المنظمة",
        "PESTEL": "بيستل",
        "Project Formulation": "صياغة المشروع",
        "Risk": "المخاطر",
        "Risk Formulation": "صياغة المخاطر",
        "Scorecard": "بطاقة الأداء",
        "Strategy Formulation": "صياغة الاستراتيجية",
        "SWOT": "سوات",
        "Template": "القالب",
        "User Management": "إدارة المستخدمين"
    },
    "system": {
        "Notification": "الإشعارات",
        "Enable": "تفعيل",
        "Security": "الأمان",
        "Schedular": "الجدولة",
        "Archive": "الأرشيف",
        "3 Months": "3 أشهر",
        "6 Months": "6 أشهر",
        "Monthly": "شهريا",
        "Now": "الآن"
    },
    "device": {
        "Device": "الجهاز",
        "Web": "الويب",
        "Mobile App": "تطبيق الهاتف المحمول"
    },
    "backup": {
        "Backup & Restore": "النسخ الاحتياطي والاستعادة",
        "Backup": "نسخ احتياطي",
        "Weekly": "أسبوعيا",
        "Browse": "استعراض",
        "Restore": "استعادة",
        "Application restore path": "مسار استعادة التطبيق"
    },
    "scorecard": {
        "Scorecard settings": "إعدادات بطاقة الأداء",
        "Scorecard Fields": "حقول بطاقة الأداء",
        "Actual": "الفعلي",
        "Target": "الهدف",
        "Budget": "الميزانية",
        "Forecast": "التوقعات",
        "Score": "النتيجة",
        "Trend": "الاتجاه",
        "Year to Date (YTD)": "من بداية السنة حتى تاريخه",
        "YTD": "من بداية السنة حتى تاريخه",
        "Aggregation": "التجميع",
        "Type": "النوع",
        "Default": "افتراضي",
        "Custom": "مخصص",
		"Index" : "الفهرس",
		"Decline": "انخفاض"
    },
    "performance": {
        "Performance": "الأداء",
        "Threshold": "الحد",
        "Three status": "ثلاث حالات",
        "Status": "الحالة",
        "KPI": "مؤشر الأداء الرئيسي",
        "Objective": "الهدف",
        "Perspective": "المنظور"
    },
    "kpi": {
        "Kpi View Settings": "إعدادات عرض مؤشرات الأداء الرئيسية",
        "Data tables Fields": "حقول جداول البيانات",
        "Gap": "الفجوة",
        "Annual Target": "الهدف السنوي",
        "Data Drilldown Fields": "حقول تفصيل البيانات",
        "Kpi Form Schedule settings": "إعدادات جدول نموذج مؤشرات الأداء",
        "Open the form on": "فتح النموذج في",
        "Close the form on": "إغلاق النموذج في"
    }
}


const page_controlPanel_en = {
  "RiskPage":{
	"Inherent Risk Score" : "Inherent Risk Score",
	"Derivation" : "Derivation",
	"Residual Risk Score" : "Residual Risk Score",
	"Risk Custom Score" : "Risk Custom Score",
	"Action" : "Action",
	"Control effectivenesss" : "Control effectiveness",
	"Control Types" : "Control Types",
	"Risk Category" : "Risk Category",
	"Type" : "Type",
	"Reducing Possibility Description" : "Reducing Possibility Description",
	"Rating" : "Rating",
	"Reducing Impact Description" : "Reducing Impact Description",
	"Possible Event" : "Possible Event",
	"Consequence Description" : "Consequence Description",
	"Category" : "Category",
	"Cause Description" : "Cause Description",
	"Others" : "Others",
	"Person In Charge" : "Person In Charge",
	"Information Asset" : "Information Asset",
	"ISO Standard" : "ISO Standard",
	"POS" : "POS",
	"Related Parties" : "Related Parties",
	"Risk Fields" : "Risk Fields",
	"Risk Settings" : "Risk Settings"
	

  },
  "controlpanel": {
	"System": "System",
    "Dark": "Dark",
    "Light": "Light",
	"Login logo should be within 700kb and dimension should be 8050x3350": "Login logo should be within 700kb and dimension should be 8050x3350",
    "Login theme should be within 300kb and dimension should be 1310x1100": "Login logo should be within 700kb and dimension should be 8050x3350",
	"Theme": "Theme",
	"Choose a File or Drag it Here": "Choose a File or Drag it Here",
	"title": "Control Panel",
	"baseLine": "Baseline",
	"Are Sub Measures required?": "Are Sub Measures required?",
	"Risk Setting" : "Risk Setting",
	"Risk Fields": "Risk Fields",
	"OKR" : "OKR",
	"Workflow Setting": "Workflow Setting",
	"Custom Performance": "Custom Performance",
	"Custom Threshold" : "Custom Threshold",
  },
  "general": {
    "General": "General",
    "General Settings": "General Settings",
    "Site Name": "Site Name",
    "Site Language": "Site Language",
    "Admin EMail ID": "Admin EMail ID",
    "Currency": "Currency",
    "Currency View": "Currency View",
    "Default Data period": "Default Data period",
    "Financial Cycle": "Financial Cycle",
    "Start Month": "Start Month",
    "End Month": "End Month",
    "Time Zone": "Time Zone",
    "Implementation": "Implementation",
    "Implementation Type": "Implementation Type",
    "Save": "Save"
  },
  "themes": {
    "Themes": "Themes",
    "Login": "Login",
    "Logo": "Logo",
    "Branding Colour": "Branding Colour"
  },
  "license": {
    "License": "License",
    "Valid": "Valid",
    "Total Users": "Total Users",
    "Modules Subscribed": "Modules Subscribed"
  },
  "modules": {
    "Audit Trail": "Audit Trail",
    "Charts": "Charts",
    "Cockpit": "Cockpit",
    "Control Panel": "Control Panel",
    "Data Sources": "Data Sources",
    "Initiatives & Projects": "Initiatives & Projects",
    "Meetings": "Meetings",
    "My Space": "My Space",
    "Organization": "Organization",
    "PESTEL": "PESTEL",
    "Project Formulation": "Project Formulation",
    "Risk": "Risk",
    "Risk Formulation": "Risk Formulation",
    "Scorecard": "Scorecard",
    "Strategy Formulation": "Strategy Formulation",
    "SWOT": "SWOT",
    "Template": "Template",
    "User Management": "User Management"
  },
  "system": {
    "Notification": "Notification",
    "Enable": "Enable",
    "Security": "Security",
    "Schedular": "Schedular",
    "Archive": "Archive",
    "3 Months": "3 Months",
    "6 Months": "6 Months",
    "Monthly": "Monthly",
    "Now": "Now"
  },
  "device": {
    "Device": "Device",
    "Web": "Web",
    "Mobile App": "Mobile App"
  },
  "backup": {
    "Backup & Restore": "Backup & Restore",
    "Backup": "Backup",
    "Weekly": "Weekly",
    "Browse": "Browse",
    "Restore": "Restore",
    "Application restore path": "Application restore path"
  },
  "scorecard": {
    "Scorecard settings": "Scorecard settings",
    "Scorecard Fields": "Scorecard Fields",
    "Actual": "Actual",
    "Target": "Target",
    "Budget": "Strech",
    "Forecast": "Stable",
    "Score": "Score",
    "Trend": "Trend",
    "Year to Date (YTD)": "Year to Date (YTD)",
    "YTD": "YTD",
    "Aggregation": "Aggregation",
    "Type": "Type",
    "Default": "Default",
    "Custom": "Custom",
	"Index" : "Index",
	"Decline": "Shrink"
  },
  "performance": {
    "Performance": "Performance",
    "Threshold": "Threshold",
    "Three status": "Three status",
    "Status": "Status",
    "KPI": "KPI",
    "Objective": "Objective",
    "Perspective": "Perspective"
  },
  "kpi": {
    "Kpi View Settings": "Kpi View Settings",
    "Data tables Fields": "Data tables Fields",
    "Gap": "Gap",
    "Annual Target": "Annual Target",
"Data Drilldown Fields": "Data Drilldown Fields",
    "Kpi Form Schedule settings": "Kpi Form Schedule settings",
    "Open the form on": "Open the form on",
    "Close the form on": "Close the form on"
  }
}

const page_controlPanel_am = {
  "RiskPage": {
    "Inherent Risk Score": "የተፈጥሮ ስጋት ክፍያ",
    "Derivation": "አምጣጥ",
    "Residual Risk Score": "ቀሪ ስጋት ክፍያ",
    "Risk Custom Score": "የስጋት ብልህ ክፍያ",
    "Action": "እርምጃ",
    "Control effectivenesss": "የቁጥጥር ውጤታማነት",
    "Control Types": "የቁጥጥር አይነቶች",
    "Risk Category": "የስጋት ምድብ",
    "Type": "አይነት",
    "Reducing Possibility Description": "የመቀነስ እድል መግለጫ",
    "Rating": "ደረጃ",
    "Reducing Impact Description": "የተጽናና ተጽናኝነት መግለጫ",
    "Possible Event": "የሚቻል ተግባር",
    "Consequence Description": "የተከሰተ ውጤት መግለጫ",
    "Category": "ምድብ",
    "Cause Description": "የምክንያት መግለጫ",
    "Others": "ሌሎች",
    "Person In Charge": "የተጠቃሚ ሰው",
    "Information Asset": "የመረጃ ንብረት",
    "ISO Standard": "የISO ስርዓት",
    "POS": "POS",
    "Related Parties": "ተዛማጅ ተሳታፊዎች",
    "Risk Fields": "የስጋት መስኮች",
    "Risk Settings": "የስጋት ማቀናበሪያ"
  },
  "controlpanel": {
    "System": "ስርዓት",
    "Dark": "ጨለማ",
    "Light": "ብርሃን",
    "Login logo should be within 700kb and dimension should be 8050x3350": "የግባ አርማ በ700kb ውስጥ እና መጠን 8050x3350 መሆን አለበት",
    "Login theme should be within 300kb and dimension should be 1310x1100": "የግባ ርዕስ በ300kb ውስጥ እና መጠን 1310x1100 መሆን አለበት",
    "Theme": "ርዕስ",
    "Choose a File or Drag it Here": "ፋይል ይምረጡ ወይም ወደዚህ ያስነሱ",
    "title": "መቆጣጠሪያ ፓነል",
    "baseLine": "መሰረታዊ መስመር",
    "Are Sub Measures required?": "ንዑስ መጠን ያስፈልጋል?",
    "Risk Setting": "የስጋት ማቀናበሪያ",
    "Risk Fields": "የስጋት መስኮች",
    "OKR": "OKR",
    "Workflow Setting": "የስራ ፍሰት ማቀናበሪያ",
    "Custom Performance": "የብልህ አፈጻጸም",
    "Custom Threshold": "የብልህ አጠቃቀም"
  },
  "general": {
    "General": "አጠቃላይ",
    "General Settings": "አጠቃላይ ማቀናበሪያ",
    "Site Name": "የሳይት ስም",
    "Site Language": "የሳይት ቋንቋ",
    "Admin EMail ID": "የአስተዳዳሪ ኢሜል መታወቂያ",
    "Currency": "ገንዘብ",
    "Currency View": "የገንዘብ እይታ",
    "Default Data period": "የነባሪ ውሂብ ጊዜ",
    "Financial Cycle": "የገንዘብ ስዕለት",
    "Start Month": "መነሻ ወር",
    "End Month": "መጨረሻ ወር",
    "Time Zone": "የጊዜ ክልል",
    "Implementation": "አስፈፃሚነት",
    "Implementation Type": "የአስፈፃሚነት አይነት",
    "Save": "አስቀምጥ"
  },
  "themes": {
    "Themes": "ርዕሶች",
    "Login": "ግባ",
    "Logo": "አርማ",
    "Branding Colour": "የብራንድ ቀለም"
  },
  "license": {
    "License": "ፈቃድ",
    "Valid": "ተፈቅዷል",
    "Total Users": "ጠቅላላ ተጠቃሚዎች",
    "Modules Subscribed": "የተመዘገቡ ክፍሎች"
  },
  "modules": {
    "Audit Trail": "የአዲት መንገድ",
    "Charts": "ገጽታዎች",
    "Cockpit": "መቆጣጠሪያ",
    "Control Panel": "መቆጣጠሪያ ፓነል",
    "Data Sources": "የውሂብ ምንጮች",
    "Initiatives & Projects": "ድርጊቶች & ፕሮጀክቶች",
    "Meetings": "ስብሰባዎች",
    "My Space": "የእኔ ቦታ",
    "Organization": "ድርጅት",
    "PESTEL": "PESTEL",
    "Project Formulation": "የፕሮጀክት አቀናበሪያ",
    "Risk": "ስጋት",
    "Risk Formulation": "የስጋት አቀናበሪያ",
    "Scorecard": "የውጤት ካርድ",
    "Strategy Formulation": "የስትራቴጂ አቀናበሪያ",
    "SWOT": "SWOT",
    "Template": "አቀማመጥ",
    "User Management": "የተጠቃሚ አስተዳደር"
  },
  "system": {
    "Notification": "ማሳወቂያ",
    "Enable": "አንድ አድርግ",
    "Security": "ደህንነት",
    "Schedular": "ሰዓት ሰሌዳ",
    "Archive": "ዋስትና",
    "3 Months": "3 ወር",
    "6 Months": "6 ወር",
    "Monthly": "ወርሃዊ",
    "Now": "አሁን"
  },
  "device": {
    "Device": "መሣሪያ",
    "Web": "ዌብ",
    "Mobile App": "የሞባይል መተግበሪያ"
  },
  "backup": {
    "Backup & Restore": "ቅድመ ቅጂ & መመለስ",
    "Backup": "ቅድመ ቅጂ",
    "Weekly": "ሳምንታዊ",
    "Browse": "ይመልከቱ",
    "Restore": "መመለስ",
    "Application restore path": "የመተግበሪያ መመለስ መንገድ"
  },
  "scorecard": {
    "Scorecard settings": "የውጤት ካርድ ማቀናበሪያ",
    "Scorecard Fields": "የውጤት ካርድ መስኮች",
    "Actual": "እውነተኛ",
    "Target": "ዕላማ",
    "Budget": "በጀት",
    "Forecast": "ቅድመ ግምት",
    "Score": "ክፍያ",
    "Trend": "አቅጣጫ",
    "Year to Date (YTD)": "ከዓመት ጀምሮ (YTD)",
    "YTD": "YTD",
    "Aggregation": "መደበር",
    "Type": "አይነት",
    "Default": "ነባሪ",
    "Custom": "ብልህ",
    "Index": "መደበኛ ቁጥር",
	"Decline": "እድል አድርግ"
  },
  "performance": {
    "Performance": "አፈጻጸም",
    "Threshold": "አጠቃቀም",
    "Three status": "ሶስት ሁኔታ",
    "Status": "ሁኔታ",
    "KPI": "KPI",
    "Objective": "ዓላማ",
    "Perspective": "እይታ"
  },
  "kpi": {
    "Kpi View Settings": "የKPI እይታ ማቀናበሪያ",
    "Data tables Fields": "የውሂብ ሰንጠረዦች መስኮች",
    "Gap": "ክልል",
    "Annual Target": "ዓመታዊ ዕላማ",
    "Data Drilldown Fields": "የውሂብ ጥላቻ መስኮች",
    "Kpi Form Schedule settings": "የKPI ቅጽ ሰዓት ማቀናበሪያ",
    "Open the form on": "ቅጽ በዚህ እንዲከፈት አድርግ",
    "Close the form on": "ቅጽ በዚህ እንዲዝጋ አድርግ"
  }
};



function getNestedValue(obj, path) {
  return path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : null, obj);
}

// Load language for all elements with data-translate
function loadLanguage(lang) {
	console.log(lang, "Selected Language");
  let translation;

  if (lang == 'ar') {
    translation = page_controllPanel_ar;
  } else if(lang == 'am'){
	translation = page_controlPanel_am
  }else {
    translation = page_controlPanel_en;
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




            function getControlPanelData() {
				const storedLanguage = localStorage.getItem("selectedLang") || "en";
				var actionHeader = "Action";
				var approveHeader = "Approvers";
				var workflowNameHeader = "Workflow Name";
				var workflowTypeHeader = "Workflow Type";
				var departmentHeader = "Department";
				var conditionsHeader = "Conditions";
				var descriptionHeader = "Description";
				if (storedLanguage == "en") {
						actionHeader = "Action";
						approveHeader = "Approvers";
						workflowNameHeader = "Workflow Name";
						workflowTypeHeader = "Workflow Type";
						departmentHeader = "Department";
						conditionsHeader = "Conditions";
						descriptionHeader = "Description";
					} else if (storedLanguage == "ar") {
						actionHeader = "الإجراء";
						approveHeader = "الموافقون";
						workflowNameHeader = "اسم سير العمل";
						workflowTypeHeader = "نوع سير العمل";
						departmentHeader = "القسم";
						conditionsHeader = "الشروط";
						descriptionHeader = "الوصف";
					} else if (storedLanguage == "am") {
						actionHeader = "እርምጃ";
						approveHeader = "የሚፈቀዱ ሰዎች";
						workflowNameHeader = "የስራ ፍሰት ስም";
						workflowTypeHeader = "የስራ ፍሰት አይነት";
						departmentHeader = "ክፍል";
						conditionsHeader = "ሁኔታዎች";
						descriptionHeader = "መግለጫ";
					}

              $.ajax({
                url: "/stratroom/retriveWorkFlow",
                type: "GET",
                contentType: "application/json",
                success: function (data) {
                  workflowData = data;
                  if (data && data.length > 0) {
                    var uploadShowData = '';
                    data.forEach(function (List) {
                      var approvers = List.approverList
                        .map(function (a) { return a.userName ? a.userName : "N/A"; })
                        .join(', ');

                      uploadShowData +=
                        '<tr>' +
                        '<td>' + (List.name || '') + '</td>' +
                        '<td>' + (List.type || '') + '</td>' +
                        '<td>' + (List.departmentName || '') + '</td>' +
                        '<td>' + (List.conditions || '') + '</td>' +
                        '<td>' + (List.description || '') + '</td>' +
                        '<td>' + approvers + '</td>' +
                        '<td>' +
                        '<div class="table-actions justify-content-end">' +
                        '<div class="btn btn-sm btn-outline-icon" href="#edit-workflow" data-bs-toggle="modal" onclick="editPOSpage(' + List.id + ')">' +
                        '<span class="icon" data-bs-toggle="tooltip" data-bs-title="Edit">' +
                        '<img src="images/edit-i.svg" width="12" height="12" />' +
                        '</span>' +
                        '</div>' +
                        '<div class="btn btn-sm btn-outline-icon" href="#delete-modal" data-bs-toggle="modal" onclick="deleteData(' + List.id + ')">' +
                        '<span class="icon" data-bs-toggle="tooltip" data-bs-title="Delete">' +
                        '<img src="images/delete-i.svg" width="12" height="12" />' +
                        '</span>' +
                        '</div>' +
                        '</div>' +
                        '</td>' +
                        '</tr>';
                    });

                    var table =
                      '<table class="table table-bordered workflowSetting" style="width: 100%;">' +
                      '<thead class="text-center">' +
                      '<tr>' +
                      '<th>'+workflowNameHeader+'</th>' +
                      '<th>'+workflowTypeHeader+'</th>' +
                      '<th>'+departmentHeader+'</th>' +
                      '<th>'+conditionsHeader+'</th>' +
                      '<th>'+descriptionHeader+'</th>' +
                      '<th>'+approveHeader+'</th>' +
                      '<th>'+actionHeader+'</th>' +
                      '</tr>' +
                      '</thead>' +
                      '<tbody>' + uploadShowData + '</tbody>' +
                      '</table>';

                    $("#controlpanel_table").html(table);

                    // Initialize tooltips if using Bootstrap 5
                    if (typeof bootstrap !== 'undefined') {
                      var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
                      tooltipTriggerList.map(function (tooltipTriggerEl) {
                        return new bootstrap.Tooltip(tooltipTriggerEl);
                      });
                    } else {
                      $('[rel="tooltip"]').tooltip();
                    }
                  } else {
                    console.log("No data found.");
                    $("#controlpanel_table").html("<p>No workflows available.</p>");
                  }
                },
                error: function (xhr, status, error) {
                  console.error("Error fetching data:", status, error);
                  $("#controlpanel_table").html("<p>Error loading workflows.</p>");
                }
              });
            }



	