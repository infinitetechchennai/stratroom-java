var swottype = "";
var radioValue = "";
var currentEmp		=	$("#userPrincipal").val();
var topparentswotDetails	=	{};
var reporteelist = [];
var kpiList	=	[];	
var pageNo =  $('#pagenumber').val();
var createpermission	=	false;
var editpermission		=	false;
var deletepermission	=	false;
var viewpermission		=	false;
var kpidataformpermission	=	[];
var implementationtypemethod	=	false;
var kpiopenformdatecheck	=	1;
var kpicloseformdatecheck	=	1;

if($("#userrolename").val()	==	"Super User" || $("#userrolename").val()	==	"Admin"){
	if($("#userPrincipal").val()	!= $("#userPrincipalnavigate").val()){
		//$(".subusermenuname").text('Kpi Data Form');
		if($(".topmenubreadcrumb").length){
			$(".topmenubreadcrumb").show();
		}
		if($(".sidebarNavigate").length){
			$(".sidebarNavigate").show();
		}
	}
}

$(function () {
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
	
	
	if((controlpanelgeneralsiteSettings.implementation !=	null && controlpanelgeneralsiteSettings.implementation !=	undefined) && (controlpanelgeneralsiteSettings.implementationType !=	null && controlpanelgeneralsiteSettings.implementationType !=	undefined)){
		if(controlpanelgeneralsiteSettings.implementationType	==	"Department"){
    		implementationtypemethod	=	true
    	}
	}
	
	if(controlpanelScorecardSettings.openformon !=	undefined){
		kpiopenformdatecheck	=	controlpanelScorecardSettings.openformon;
	}
	
	if(controlpanelScorecardSettings.closeformon !=	undefined){
		kpicloseformdatecheck	=	controlpanelScorecardSettings.closeformon;
	}
	
	$.each(kpidatasourcepermission,function(forindex,fordata){
		if(fordata.Manual	!=	undefined){
			kpidataformpermission	=	fordata.Manual;	
		}
	});
	
	if(kpidataformpermission.privilegeCreate !=	undefined && kpidataformpermission.privilegeCreate == "TRUE"){	
		createpermission	=	true;
	}
	
	if(kpidataformpermission.privilegeUpdate !=	undefined && kpidataformpermission.privilegeUpdate == "TRUE"){
		editpermission	=	true;
	}
	
	if(kpidataformpermission.privilegeDelete !=	undefined && kpidataformpermission.privilegeDelete == "TRUE"){
		deletepermission	=	true;
	}
	
	if(kpidataformpermission.privilegeView !=	undefined && kpidataformpermission.privilegeView == "TRUE"){
		viewpermission	=	true;
	}
	
	if(viewpermission || editpermission || createpermission){
		getreportee();
	}
	
	$.each(reporteelist,function(ownkey,empvalue){
		if(empvalue.id	==	currentEmp){
			topparentswotDetails	=	{"id":empvalue.id,"name":empvalue.name,"image":empvalue.image,"dept":empvalue.dept};
		}
	});
	
	var users	=	topparentswotDetails;
	var username 	=	((users.name ==	undefined || users.name == "")?$("#firstnametop").val():users.name);
	var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle swotmultiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
	subinitiativeUser 	=	'<img '+userProfileConcate+' alt="'+username+'" width="110">';
	$(".employeeprofile").html(subinitiativeUser);
	$('.swotmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
	var checkdatename	=	new Date();
	var applynewdate	=	((checkdatename.getMonth() > 8) ? (checkdatename.getMonth() + 2) : ('0' + (checkdatename.getMonth() + 2)))+"-"+kpicloseformdatecheck+"-"+checkdatename.getFullYear();
	var datemonthformat = new Date(applynewdate);
	//var caloptions = { year: 'numeric', month: 'short'};
	//var returnformatmonth 	=	datemonthformat.toLocaleDateString(undefined, caloptions);
	//console.log(checkdatename.setMonth(checkdatename.getMonth()+1));
	var returnformatmonth 	=	moment(datemonthformat).format("MM/DD/YYYY");//.toLocaleDateString('en-US');
	
	$("#kpivalidtill").val(returnformatmonth);
	$('#kpi_data_form button[value="Save"]').css('display', 'none');
	if(checkdatename.getDate() >= kpiopenformdatecheck == false){
		$('#kpi_data_form input[type="text"]').prop("disabled", true);
		$('#kpi_data_form select').prop("disabled", true);
		$('#kpi_data_form button[value="Save"]').remove();
	}
	
	if(editpermission	==	false && createpermission	==	false && viewpermission ==	false){
		$('#kpi_data_form input[type="text"]').prop("disabled", true);
		$('#kpi_data_form select').prop("disabled", true);
		$('#kpi_data_form button[value="Save"]').remove();
	}else if(editpermission	==	false && createpermission	==	false){
		$('#kpi_data_form input[type="text"]').prop("disabled", true);
		$('#kpi_data_form button[value="Save"]').remove();
		//getKpiFormList();
	}else{
	//	getKpiFormList();
		//user list
		populatescorecardDropdownorg("#kpiscorecard",currentEmp);
		if(implementationtypemethod){
			$(".departmentnamekpiform").show();
		}
	}			
});

$("#kpiscorecard").change(function(){
	if($(this).val() !=	""){
		getKpiFormList("#kpiname",$(this).val());
	}else{
		$("#kpiname,#kpi_measurement,#subMeasuressearch").empty();
		$("#kpiname,#kpi_measurement,#subMeasuressearch").append('<option value="" data-i18n="Choose">Choose</option>');
		$('#kpi_data_form input[type="text"]').not("#kpivalidtill").val("");
	}
});

function populatesubmeasureDropdownorg(elementId,kpiuserid,checkperiodexist) {
	$(elementId).empty();
	var numberOfOptions = $(elementId + ' > option').length;
	$(elementId).append('<option value="" data-i18n="Choose">Choose</option>');
	var url	=	"/stratroom/subMeasureNodeKeyList/"+kpiuserid;
	if(checkperiodexist !=	""){
		url	=	"/stratroom/subMeasureNodeKeyList/"+kpiuserid+"?dateRange="+checkperiodexist;
	}
	
	if(kpiuserid !=	""){
		$.ajax({
			url : url,
			async:false,
			success : function(kpiList) {
				$.each(kpiList, function(index, kpiObj) {
					
					/*var kpiDetailsObj 	= 	{
							"mtd_actual":kpiObj.mtd_actual,
						    "node_key": kpiObj.node_key,
						    "mtd_target": kpiObj.mtd_target,
						    "org_kpi_id": kpiObj.org_kpi_id,
						    "real_date_from":kpiObj.real_date_from,
						    "real_date_to":kpiObj.real_date_to
				        };
					
					addOption(elementId, kpiObj.subMeasureName, JSON.stringify(kpiDetailsObj))*/
					addOption(elementId, kpiObj.subMeasureName, kpiObj.nodeKey)

					/*if(index	==	0){
						if(kpiObj.mtd_target !=	undefined){
							$("#kpitarget").val(kpiObj.mtd_target);
						}else{
							$("#kpitarget").val("");
						}
						
						if(kpiObj.mtd_actual !=	undefined){
							$("#kpiactual").val(kpiObj.mtd_actual);
						}else{
							$("#kpiactual").val("");
						}
						if(kpiObj.real_date_from !=	undefined){
							//$("#kpistartdate").val(kpiObj.real_date_from);
						}
						if(kpiObj.real_date_from !=	undefined){
							$("#realDateFrom").val(kpiObj.real_date_from);
						}
						if(kpiObj.real_date_to !=	undefined){
							$("#realDateTo").val(kpiObj.real_date_to);
						}
						
						var kpiDetailsObj1 	= 	{
							"mtd_actual":kpiObj.mtd_actual,
						    "node_key": kpiObj.node_key,
						    "mtd_target": kpiObj.mtd_target,
						    "org_kpi_id": kpiObj.org_kpi_id,
						    "real_date_from":kpiObj.real_date_from,
						    "real_date_to":kpiObj.real_date_to
				        };
						$(elementId).val(JSON.stringify(kpiDetailsObj1));
					}*/
				});
			}
		});
	}
}

function populatescorecardDropdownorg(elementId,kpiuserid) {
	$(elementId).empty();
	var numberOfOptions = $(elementId + ' > option').length;
	$(elementId).append('<option value="" data-i18n="Choose">Choose</option>');
	var url	=	(implementationtypemethod?"/stratroom/formScoreCardDetailList":"/stratroom/formScoreCardDetailList");
	$.ajax({
		url : url,
		async:false,
		success : function(employeeList) {
			$.each(employeeList, function(index, reportee) {
				addOption(elementId, reportee.scorecardName, reportee.id)
			});
			if (jQuery.isEmptyObject(employeeList)) {
				$("#kpiscorecard,#kpiname,#kpi_measurement,#subMeasuressearch").empty();
				$("#kpiscorecard,#kpiname,#kpi_measurement,#subMeasuressearch").append('<option value="" data-i18n="Choose">Choose</option>');
				$('#kpi_data_form input[type="text"]').not("#kpivalidtill").val("");
			}
		}
	});
}

function getreportee() {
	const storedLanguage = localStorage.getItem("selectedLang") || "en"
	loadLanguage(storedLanguage)
	if (jQuery.isEmptyObject(reporteelist)) {
		var url	=	(implementationtypemethod?"/stratroom/org/employeeList":"/stratroom/reporteeList")
		$.ajax({
			url : url,
			async:false,
			success : function(employeeList) {
				reporteelist = employeeList;
			}
		});
	} 
}

$(document).on('show.bs.modal', '.modal', function (event) {
    var zIndex = 1040 + (10 * $('.modal:visible').length);
    $(this).css('z-index', zIndex);
    setTimeout(function() {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
});

function getKpiFormList() {
	var dateperiod = $("#datePeriod").val();
	$('#kpiname').find('option').remove().end();
	$('#kpiname').append(`<option value="">Choose</option>`);
    $.ajax({
        // url: "/stratroom/kpiFormKpiList/"+$("#kpiscorecard").val()+"?ownerFlag=true&fromPage=KPI_DATA_FORM",
		url: "/stratroom/kpiFormKpiList/"+$("#kpiscorecard").val()+"?ownerFlag=true&fromPage=KPI_DATA_FORM&dateRange="+dateperiod,
        type: "GET",
        contentType: "application/json",
        success: function (response, status) {
        	if (jQuery.isEmptyObject(response.kpidtoList)){
				console.log(response.kpidtoList, "kpiList");
        		//$('#kpi_data_form input[type="text"]').prop("disabled", true);
				//$('#kpi_data_form select').prop("disabled", true);        		
	        	$("#kpi_measurement,#subMeasuressearch").empty();
				$("#kpi_measurement,#subMeasuressearch").append('<option value="" data-i18n="Choose">Choose</option>');
				$('#kpi_data_form input[type="text"]').not("#kpivalidtill").val("");
				$('#kpi_data_form button[value="Save"]').css('display', 'none');
        	}else{
        		$('#kpi_data_form button[value="Save"]').css('display', 'block');
				populateKPINamesList("#kpiname",response.kpidtoList);
				
			}
        },
        error:readErrorMsg
    });

}

function populateMeasureNamesList(elementId,kpiList) {
	console.log(kpiList, "kpiList");
	var numberOfOptions = $(elementId + ' > option').length;
	$.each(kpiList, function(index, kpiObj) {
		console.log(kpiObj,"kpiobj");
		
		var kpiDetailsObj 	= 	{
				"mtdActual":kpiObj.mtdActual,
			    "nodeKey": kpiObj.nodeKey,
			    "mtdTarget": kpiObj.mtdTarget,
			    "orgKpiId": kpiObj.orgKpiId
	        };
		addOption(elementId, kpiObj.measureName, JSON.stringify(kpiDetailsObj))
	});
}

$('#subMeasuressearch').on('change', function() {
	var kpiobjvalue = $(this).val();
	if(kpiobjvalue ==	""){
		$("#kpitarget").val($("#kpihiddentarget").val());
		$("#kpiactual").val($("#kpihiddenactual").val());
		$('#submeasurekpiidhidden').val("");
	}
	
	if(kpiobjvalue !=	""){
		var kpiobj1 = $("#kpi_measurement").val()
		var kpidetails = JSON.parse(kpiobj1);
		
	  	$.ajax({
	        url: "/stratroom/subNodeKeyData/"+kpiobjvalue+"?measureKey="+kpidetails.nodeKey+"&dateRange="+$("#kpidataformperiod").val(),
	        type: "GET",
	        contentType: "application/json",
	        success: function (response, status) {
	        	if (jQuery.isEmptyObject(response)) {
					$('#kpiactual,#kpitarget,#submeasurekpiidhidden').val("");
	        	}else{
	        		$("#kpiactual").val((response.actual !=	undefined?response.actual:''));
	        		$("#kpitarget").val((response.target !=	undefined?response.target:''));
	        		$("#submeasurekpiidhidden").val((response.orgkpiId !=	undefined?response.orgkpiId:''));
	        	}
	        },
	        error:function(msg,status){
				if(!jQuery.isEmptyObject(msg.responseText)){
					$("#kpiactual,#kpitarget").val("");
					var errorparse	=	JSON.parse(msg.responseText);
					if(errorparse.status 	==	"404"){
						$.notify("Error:Not Found", {
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
			}
	    });
	}
});

function perioddateformatchange(perioddate){
	console.log(perioddate, "perioddate");
	var startdate 	= 	"";
	var enddate 	= 	"";
	var returndate	=	"";
	if(perioddate !=	"" && perioddate.indexOf("-") !=	-1){
		var splitdate	=	perioddate.split('-');
		startdate	=	new Date(splitdate[0]);
		enddate	=	new Date(splitdate[1]);
		
		startdate	=	((startdate.getMonth() > 8) ? (startdate.getMonth() + 1) : ('0' + (startdate.getMonth() + 1))) + '/' + ((startdate.getDate() > 9) ? startdate.getDate() : ('0' + startdate.getDate())) + '/' + startdate.getFullYear();
		enddate		=	((enddate.getMonth() > 8) ? (enddate.getMonth() + 1) : ('0' + (enddate.getMonth() + 1))) + '/' + ((enddate.getDate() > 9) ? enddate.getDate() : ('0' + enddate.getDate())) + '/' + enddate.getFullYear();
		returndate	=	startdate+' - '+enddate;
	}
   return returndate;
}

$('#kpi_measurement').on('change', function() {
	  var kpiobj = this.value;
	  if(kpiobj ==	""){
			$("#subMeasuressearch").empty();
			$("#subMeasuressearch").append('<option value="" data-i18n="Choose">Choose</option>');
			$('#kpi_data_form input[type="text"]').not("#kpivalidtill").val("");
			$("#kpi_measurement").select2("val", "");
	  }
	  if(kpiobj != "" && $("#kpiname").val() !=	""){
	  	$.ajax({
	        url: "/stratroom/kpi/formula/measureNames/"+$("#kpiname").val(),
	        type: "GET",
	        contentType: "application/json",
	        success: function (response, status) {
				console.log(response, "kpiList");
	        	if (jQuery.isEmptyObject(response)) {
		        	$("#kpi_measurement,#subMeasuressearch").empty();
					$("#kpi_measurement,#subMeasuressearch").append('<option value="" data-i18n="Choose">Choose</option>');
					$('#kpi_data_form input[type="text"]').not("#kpivalidtill").val("");
	        	}
				if(response.kpiId !=	undefined){
		    		$("#kpiid").val(response.kpiId);
		    		$("#kpiactual").val("");
		    		$("#kpitarget").val("");
				}
				if(response.frequency !=	undefined){
					$(".measurement_frequency").val(response.frequency);
				}
				var checkperiodexist	=	"";
				if(response.period !=	undefined){
					$("#kpidatashowformperiod").val(perioddateformatchange(response.period));
					$("#kpidataformperiod").val(response.period);
					checkperiodexist	=	response.period;
				}
				
				if(response.dataType !=	undefined){
					$("#kpiDataType").val(response.dataType);
				}

				/*if(response.validTillDate !=	undefined){
					$("#kpivalidtill").val(response.validTillDate);
				}*/
				if(response.startEndDate !=	undefined){
					$("#kpistartdate").val(response.startEndDate);
				}
				if(response.periodStartDate !=	undefined){
					$("#realDateFrom").val(response.periodStartDate);
				}
				
				if(response.periodEndDate !=	undefined){
					$("#realDateTo").val(response.periodEndDate);
				}
				
				if(response.nodeKeyList.length && response.nodeKeyList[0] !=	undefined){
					var kpiObj	=	response.nodeKeyList[0];
					if(kpiObj.mtdTarget !=	undefined){
						$("#kpitarget").val(kpiObj.mtdTarget);
						$("#kpihiddentarget").val(kpiObj.mtdTarget);
					}
					
					if(kpiObj.mtdActual !=	undefined){
						$("#kpiactual").val(kpiObj.mtdActual);
						$("#kpihiddenactual").val(kpiObj.mtdActual);
					}
					
					var kpiDetailsObj 	= 	{
							"mtdActual":kpiObj.mtdActual,
						    "nodeKey": kpiObj.nodeKey,
						    "mtdTarget": kpiObj.mtdTarget,
						    "orgKpiId": kpiObj.orgKpiId
				        };
					$("#kpi_measurement").val(JSON.stringify(kpiDetailsObj));
					populatesubmeasureDropdownorg("#subMeasuressearch",kpiObj.nodeKey,checkperiodexist);
				}
	        },
	        error:readErrorMsg
	    });
	  }
	  
	});

function populateKPINamesList(elementId,kpiList) {
	console.log(kpiList, "kpiList");
	var numberOfOptions = $(elementId + ' > option').length;
	$.each(kpiList, function(index, kpiObj) {
		addOption(elementId, kpiObj.kpiName, kpiObj.id)
	});
}

	function addOption(id, text, value) {
		$(id).append($("<option></option>")
                .attr("value",value)
                .text(text)); // `<option value="${value}">${text}</option>`);
	}

	$('#kpiname').on('change',function() {
		var value	=	$(this).val();
		
		if(value ==	""){
			$("#kpi_measurement,#subMeasuressearch").empty();
			$("#kpi_measurement,#subMeasuressearch").append('<option value="" data-i18n="Choose">Choose</option>');
			$('#kpi_data_form input[type="text"]').not("#kpivalidtill").val("");
		}
		
		if(value	==	"" || value	==	undefined){
			return false;
		}
		$(".savekpiform").removeAttr("disabled");
		$.ajax({
	        url: "/stratroom/kpi/formula/measureNames/"+value,
	        type: "GET",
	        contentType: "application/json",
	        success: function (response, status) {
				console.log(response, "response");
	        	if (jQuery.isEmptyObject(response)) {
		        	$("#kpi_measurement,#subMeasuressearch").empty();
					$("#kpi_measurement,#subMeasuressearch").append('<option value="" data-i18n="Choose">Choose</option>');
					$('#kpi_data_form input[type="text"]').not("#kpivalidtill").val("");
	        	}
				if(response.kpiId !=	undefined){
		    		$("#kpiid").val(response.kpiId);
		    		$("#kpiactual").val("");
		    		$("#kpitarget").val("");
				}
				if(response.frequency !=	undefined){
					$(".measurement_frequency").val(response.frequency);
				}
				var checkperiodexist	=	"";
				if(response.period !=	undefined){
					$("#kpidatashowformperiod").val(perioddateformatchange(response.period));
					$("#kpidataformperiod").val(response.period);
					checkperiodexist	=	response.period;
				}
				if(response.dataType !=	undefined){
					$("#kpiDataType").val(response.dataType);
				}

				/*if(response.validTillDate !=	undefined){
					$("#kpivalidtill").val(response.validTillDate);
				}*/
				if(response.startEndDate !=	undefined){
					$("#kpistartdate").val(response.startEndDate);
				}
				if(response.periodStartDate !=	undefined){
					$("#realDateFrom").val(response.periodStartDate);
				}
				
				if(response.periodEndDate !=	undefined){
					$("#realDateTo").val(response.periodEndDate);
				}
				
				if(response.departmentDetails !=	undefined && response.departmentDetails.name !=	undefined){
					$(".departmentnamekpiname").val(response.departmentDetails.name);
					$(".departmentnamekpiid").val(response.departmentDetails.id);
				}
				
				$("#kpi_measurement").empty();
				$("#kpi_measurement").append(`<option value="" data-i18n="Choose">Choose</option>`);
				populateMeasureNamesList("#kpi_measurement",response.nodeKeyList);
				if(response.nodeKeyList.length && response.nodeKeyList[0] !=	undefined){
					var kpiObj	=	response.nodeKeyList[0];
					if(kpiObj.mtdTarget !=	undefined){
						$("#kpitarget").val(kpiObj.mtdTarget);
						$("#kpihiddentarget").val(kpiObj.mtdTarget);
					}
					
					if(kpiObj.mtdActual !=	undefined){
						$("#kpiactual").val(kpiObj.mtdActual);
						$("#kpihiddenactual").val(kpiObj.mtdActual);
					}

					console.log(kpiObj, "kpiObj");
					
					var kpiDetailsObj 	= 	{
							"mtdActual":kpiObj.mtdActual,
						    "nodeKey": kpiObj.nodeKey,
						    "mtdTarget": kpiObj.mtdTarget,
						    "orgKpiId": kpiObj.orgKpiId
				        };
					$("#kpi_measurement").val(JSON.stringify(kpiDetailsObj));
					populatesubmeasureDropdownorg("#subMeasuressearch",kpiObj.nodeKey,checkperiodexist);
				}
	        },
	        error:readErrorMsg
	    });
	});
    
	function handlekpidataformSave() {
		console.log("function Clicked");
		if (editpermission == false && createpermission == false) {
			return false;
		}
	
		if ($("#subMeasuressearch > option").length >= 2) {
			if ($("#subMeasuressearch").val() == "") {
				$("#employeedepterrorshow1").show();
				return false;
			} else {
				$("#employeedepterrorshow1").hide();
			}
		} else {
			$("#employeedepterrorshow1").hide();
		}
	
		var kpiobj = $("#kpi_measurement").val();
		var kpidetails = JSON.parse(kpiobj);
		var kpiObj = {};

		console.log(kpidetails, "kpidetails");
	
		if (kpidetails.orgKpiId != undefined && kpidetails.orgKpiId > 0) {
			kpiObj = {
				"comments": $("#savecommentsService").val(),
				"kpiAttachment": attachment.kpiAttachment || [],
				"orgKpiId": kpidetails.orgKpiId,
				"kpiId":$("#kpiname").val(),
				"mtdActual": $("#kpiactual").val(),
				"mtdTarget": $("#kpitarget").val(),
				"realDateFrom": $("#realDateFrom").val(),
				"realDateTo": $("#realDateTo").val(),
				"type": $("#kpiDataType").val(),
				"measureType": 0,
				"nodeKey": kpidetails.nodeKey,
				"manualValue":{
					         "scorecardID":$("#kpiscorecard").val(),
							 "kpiID":$("#kpiname").val(),
							 "scorecard": $("#kpiscorecard option:selected").text(),
			            	 "kpi":$("#kpiname option:selected").text(),
				             "measures":$("#kpi_measurement option:selected").text(),
				             "subMeasures":$("#subMeasuressearch option:selected").text(),
				             "deptName":$(".departmentnamekpiname").val(),
				             "mesurementFrequency":$(".measurement_frequency").val(),
				             "kpiType":$("#kpiDataType").val(),
				             "startEndDate":$("#kpistartdate").val(),
				             "period":$("#kpidatashowformperiod").val(),
				             "validTill":$("#kpivalidtill").val(),
			         	}
			};
		} else {
			kpiObj = {
				"comments": $("#savecommentsService").val(),
				"kpiAttachment": attachment.kpiAttachment || [],
				"mtdActual": $("#kpiactual").val(),
				"mtdTarget": "0.00",
				"realDateFrom": $("#realDateFrom").val(),
				"realDateTo": $("#realDateTo").val(),
				"type": $("#kpiDataType").val(),
				"measureType": 0,
				"nodeKey": kpidetails.nodeKey,
				"manualValue":{
					         "scorecardID":$("#kpiscorecard").val(),
							  "kpiID":$("#kpiname").val(),
							 
                             "scorecard": $("#kpiscorecard option:selected").text(),
			            	 "kpi":$("#kpiname option:selected").text(),
				             "measures":$("#kpi_measurement option:selected").text(),
				             "subMeasures":$("#subMeasuressearch option:selected").text(),
				             "deptName":$(".departmentnamekpiname").val(),
				             "mesurementFrequency":$(".measurement_frequency").val(),
				             "kpiType":$("#kpiDataType").val(),
				             "startEndDate":$("#kpistartdate").val(),
				             "period":$("#kpidatashowformperiod").val(),
				             "validTill":$("#kpivalidtill").val(),
			         	}
			};
		}
	
		// Sub measure logic
		if ($("#subMeasuressearch > option").length >= 2) {
			var mainkpiobj = $("#kpi_measurement").val();
			var mainkpidetails = JSON.parse(mainkpiobj);
			if ($("#submeasurekpiidhidden").val() > 0) {
				kpiObj = {
					"comments": $("#savecommentsService").val(),
					"kpiAttachment": attachment.kpiAttachment || [],
					"orgKpiId": $("#submeasurekpiidhidden").val(),
					"mtdActual": $("#kpiactual").val(),
					"mtdTarget": $("#kpitarget").val(),
					"realDateFrom": $("#realDateFrom").val(),
					"realDateTo": $("#realDateTo").val(),
					"type": $("#kpiDataType").val(),
					"measureType": 1,
					"nodeKey": $("#subMeasuressearch").val(),
					"measureKey": mainkpidetails.nodeKey,
			       "manualValue":{
					         "scorecardID":$("#kpiscorecard").val(),
							  "kpiID":$("#kpiname").val(),
							 
                             "scorecard": $("#kpiscorecard option:selected").text(),
			            	 "kpi":$("#kpiname option:selected").text(),
				             "measures":$("#kpi_measurement option:selected").text(),
				             "subMeasures":$("#subMeasuressearch option:selected").text(),
				             "deptName":$(".departmentnamekpiname").val(),
				             "mesurementFrequency":$(".measurement_frequency").val(),
				             "kpiType":$("#kpiDataType").val(),
				             "startEndDate":$("#kpistartdate").val(),
				             "period":$("#kpidatashowformperiod").val(),
				             "validTill":$("#kpivalidtill").val(),
			         	}
				};
			} else {
				kpiObj = {
					"comments": $("#savecommentsService").val(),
					"kpiAttachment": attachment.kpiAttachment || [],
					"mtdActual": $("#kpiactual").val(),
					"mtdTarget": "0.00",
					"realDateFrom": $("#realDateFrom").val(),
					"realDateTo": $("#realDateTo").val(),
					"type": $("#kpiDataType").val(),
					"measureType": 1,
					"nodeKey": $("#subMeasuressearch").val(),
					"measureKey": mainkpidetails.nodeKey,
					"manualValue":{
					         "scorecardID":$("#kpiscorecard").val(),
							  "kpiID":$("#kpiname").val(),
							 
                             "scorecard": $("#kpiscorecard option:selected").text(),
			            	 "kpi":$("#kpiname option:selected").text(),
				             "measures":$("#kpi_measurement option:selected").text(),
				             "subMeasures":$("#subMeasuressearch option:selected").text(),
				             "deptName":$(".departmentnamekpiname").val(),
				             "mesurementFrequency":$(".measurement_frequency").val(),
				             "kpiType":$("#kpiDataType").val(),
				             "startEndDate":$("#kpistartdate").val(),
				             "period":$("#kpidatashowformperiod").val(),
				             "validTill":$("#kpivalidtill").val(),
			         	}
				};
			}
		}
	
		if (implementationtypemethod) {
			kpiObj["deptId"] = $(".departmentnamekpiid").val();
		}
	
		// Send the kpiObj via AJAX
		$.ajax({
			url: "/stratroom/web/saveOrgKpiDetails",
			type: "post",
			contentType: "application/json",
			data: JSON.stringify(kpiObj),
			success: function (data, status) {
				console.log(data, 'kpiList'),
				$.notify("Success: Kpi data form successfully submitted", {
					style: 'success',
					className: 'graynotify'
				});
				location.reload(true);
			},
			error: readErrorMsg
		});
	}

	
	
$(document).ready(function(){
    
	/*$('.chosen-select').chosen({}).change( function(obj, result) {
		$(".chosen-container-single").find('label.error').remove();
		if(result.selected	==	"" || result.selected	==	undefined){
			$('*[id=kpiname-error]').each(function() {
			    $(this).remove();
			});
		}else{
			$(".chosen-container-single").find('label.error').remove();
		}
	});
	
	 $.validator.setDefaults({ ignore: ":hidden:not(.chosen-select)" });
		jQuery.validator.setDefaults({
			  debug: false,
			  success: "valid"
			});*/
	
		$.validator.addMethod("validatesubmeasure", function(value, element) {
			if($("#subMeasuressearch > option").length >= 2){
				if($("#subMeasuressearch").val()	==	""){
					return false;
				}else{
					return true;
				}
			}else{	
				return true;
			}
		}, "This field is required.");
			
    	$( "#kpi_data_form" ).validate({
    	  rules: {
    	    kpidataformname:"required",
    	    kpi_measurement:"required",
    	    kpiactual:"required",
    	    kpistartdate:"required",
    	    kpidataformperiod:"required",
    	    kpivalidtill:"required",
			
    	    subMeasuressearch:{
    	    	validatesubmeasure:true
    	    }
    	  },
    	    errorPlacement: function(error, element) {
    	    	if((element.hasClass('select2') && element.next('.select2-container').length) || (element.hasClass('selectroleuser') && element.next('.select2-container').length)) {
    		        error.insertAfter(element.next('.select2-container'));
    		    }else{
    		    	error.insertAfter(element);
    		    }
    	   },
    	   messages: {
              
          },
          submitHandler: function(form) {
          	handlekpidataformSave();
          }
    	});
    });


	const page_kpiform_en = {
    "Data Entry Form": "Data Entry Form",
    "Scorecard": "Scorecard",
    "KPI": "KPI",
    "Measures": "Measures",
    "Sub Measures": "Sub Measures",
    "KPI Type": "KPI Type",
    "Actual": "Actual",
    "Target": "Target",
    "Start / End Date": "Start / End Date",
    "Period": "Period",
    "Valid Till": "Valid Till",
    "Comment": "Comment",
    "Upload": "Upload",
    "Choose File": "Choose File",
    "Save": "Save"
}

const page_kpiform_am = {
    "Data Entry Form": "የመረጃ መሙላት ቅፅ",
    "Scorecard": "የአፈፃፀም ካርድ",
    "KPI": "KPI",
    "Measures": "መለኪያዎች",
    "Sub Measures": "ንዑስ መለኪያዎች",
    "KPI Type": "የKPI አይነት",
    "Actual": "እውነተኛ ዋጋ",
    "Target": "ዓላማ",
    "Start / End Date": "መጀመሪያ / መጨረሻ ቀን",
    "Period": "ጊዜ መወዳደሪያ",
    "Valid Till": "እስከ ቀን ይተገበራል",
    "Comment": "አስተያየት",
    "Upload": "መጫን",
    "Choose File": "ፋይል ይምረጡ",
    "Save": "አስቀምጥ"
}



const page_kpiform_ar = {
    "Data Entry Form": "نموذج إدخال البيانات",
    "Scorecard": "بطاقة الأداء",
    "KPI": "مؤشر الأداء الرئيسي",
    "Measures": "المقاييس",
    "Sub Measures": "المقاييس الفرعية",
    "KPI Type": "نوع مؤشر الأداء الرئيسي",
    "Actual": "القيمة الفعلية",
    "Target": "الهدف",
    "Start / End Date": "تاريخ البدء / الانتهاء",
    "Period": "الفترة",
    "Valid Till": "صالح حتى",
    "Comment": "تعليق",
    "Upload": "تحميل",
    "Choose File": "اختر ملف",
    "Save": "حفظ"
}


//Language Wrokflow 
function getNestedValue(obj, path) {
  return path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : null, obj);
}

// Load language for all elements with data-translate
function loadLanguage(lang) {
  let translation;

  if (lang == 'ar') {
    translation = page_kpiform_ar;
  } else if(lang == "am"){
	translation = page_kpiform_am;
  }else {
    translation = page_kpiform_en;
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


