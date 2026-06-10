var kpichartDataList = [];
var $chartElement	=	"#chartdiv_in";
var currentEmp		=	$("#userPrincipal").val();
var employeepreference 		= 	[];
var employeescorepreference	= 	[];
var employeeObjectPreference= 	{"preferences":{}};
var ischeckemployeeurlornot	=	$("#ischeckemployeeurlornot").val();
var goalupdateDescription	=	[];
var kpicurrencyval 		= 	"$";
var kpimillions			=	false;
var kpipercentage		=	false;
var empcreatepermission	=	false;
var empeditpermission	=	false;
var empdeletepermission	=	false;
var empviewpermission	=	false;
var employeeloadcontent	=	false;
var inicomcreatepermission	=	false;
var empKpiViewviewpermission	=	false;

var attachmentcreatepermission	=	false;
var attachmenteditpermission	=	false;
var attachmentviewpermission	=	false;
var attachmentdeletepermission	=	false;

let empurlparams = (new URL(document.location)).searchParams;
var emppageNo 		= 	urlparams.get("pageId");

if(emppageNo	!=	"" && emppageNo	!= null && emppageNo != undefined){
	$(".emppagenumber").val(emppageNo);
}

if(ischeckemployeeurlornot	==	"EMPLOYEE"){
	getemppagepreference();
	getempscorepreference();
}

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

function getemppageName() {	
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
function getOverallScore() {	
	$.ajax({
		url : "/stratroom/checkScore/" + currentEmp+"?dateRange="+$('#datePeriod').val(),
		async:false,
		success : function(data) {
			$("#score_overall").html(data.overAllScore);
			
		}
	}); 
}

function getempscorecardpermission(){
	$.ajax({
		type : "GET",
		url : "/stratroom/user/modulePermissions?moduleName=Scorecard",
		async:false,
		success : function(data) {
			if(data.Scorecard !=	undefined && !jQuery.isEmptyObject(data.Scorecard)){
				//kpi view
				$.each(data.Scorecard,function(forindex,fordata){
					if(forindex	==	"KPI View"){
						if(fordata.privilegeView !=	undefined && fordata.privilegeView == "TRUE"){	
							empKpiViewviewpermission	=	true;
						}
					}
				});
			}
		}
	});
}

function getempinitiativepermission(){
	$.ajax({
		type : "GET",
		url : "/stratroom/user/modulePermissions?moduleName="+encodeURIComponent("Initiatives & Projects"),
		async:false,
		success : function(data) {
			$.each(data,function(forindex,fordata){
				$.each(fordata,function(forindex1,fordata1){
					if(forindex1	==	"Comments"){
						if(fordata1.privilegeCreate !=	undefined && fordata1.privilegeCreate == "TRUE"){	
							inicomcreatepermission	=	true;
						}
					}
				});
			});
		}
	});
}

function getemppermission(){
	$.ajax({
		type : "GET",
		url : "/stratroom/user/modulePermissions?moduleName=MY SPACE",
		async:false,
		success : function(data) {
			$.each(data,function(forindex,fordata){
				if(forindex	==	"MY SPACE"){
					if(fordata.Attachments.privilegeCreate !=	undefined && fordata.Attachments.privilegeCreate == "TRUE"){	
						attachmentcreatepermission	=	true;
					}
					if(fordata.Attachments.privilegeUpdate !=	undefined && fordata.Attachments.privilegeUpdate == "TRUE"){
						attachmenteditpermission	=	true;
					}
					if(fordata.Attachments.privilegeView !=	undefined && fordata.Attachments.privilegeView == "TRUE"){
						attachmentviewpermission	=	true;
					}
					if(fordata.Attachments.privilegeDelete !=	undefined && fordata.Attachments.privilegeDelete == "TRUE"){
						attachmentdeletepermission	=	true;
					}
				}
			});
		}
	});
}


function getemppagepreference() {
	if (jQuery.isEmptyObject(employeepreference)) {
		$.ajax({
			url : "/stratroom/getPreferences?pageName=EMPLOYEE&pageId="+emppageNo,
			async:false,
			success : function(employeeList) {
				employeepreference = employeeList;
			}
		});
	} 
}
function getempscorepreference() {
	/*var pageno	=	$('#defaultpagenumber').val();
	if (jQuery.isEmptyObject(employeescorepreference)) {
		$.ajax({
			url : "/stratroom/getPreferences?pageName=SCORECARD&pageId="+pageno,
			async:false,
			success : function(employeeList) {
				employeescorepreference = employeeList;
			}
		});
	}*/ 
}

function deleteSubInitiatives(subInitiativeId) {
	$("#deleterecordid").val(subInitiativeId);
	$("#deleterecordtype").val('deletesubinitiaveactivities');
	$('#deleteModalEmployee').modal('toggle');
	$(window).on("resize", function(){
	    $(".modal:visible").each(alignModal);
	}); 
}


function deleteActivities(activitiesId) {
	$("#deleterecordid").val(activitiesId);
	$("#deleterecordtype").val('deleteActivities');
	$('#deleteModalEmployee').modal('toggle');
	$(window).on("resize", function(){
	    $(".modal:visible").each(alignModal);
	}); 
}

function handleEmployeeCommentsSave(action,statusaction) {
	
	var desc = "";
	if(statusaction =='employeeActitivites'){
		desc = $("#empActivitiesComments").val()
	}else {
		desc = $("#empDashboardComments").val()
	}
	
	if(desc	==	"" || desc	==	"'"){
			$.notify("Error: Enter some comments", {
						  style: 'error',
						  className: 'graynotify'
						});
		//$(".activitiescomment_send").show();				
		return false;
	}
		
	var commentsObj = {
		"commentsParendId":0,
		"fromPage": "employee",
		"commentsValue" : {
			"desc" : desc,
			"statusaction" : statusaction,
		}
	}
	var methodType = 'post';
	if (action == 'add') {

	} else if (action == 'edit') {
		methodType = 'put';
	}

	$.ajax({
		url : "/stratroom/comments/",
		type : methodType,
		contentType : "application/json",
		data : JSON.stringify(commentsObj),
		success : function(data, status) {
			//$("#kpi_comments_Form").css('display', 'none');
			location.reload(true);
			console.log("New comments was created..");
		},error:function(){
			//$(".activitiescomment_send").show();
		}
	});
}


function deleteMileStones(mileStoneId) {
	$("#deleterecordid").val(mileStoneId);
	$("#deleterecordtype").val('deleteMileStones');
	$('#deleteModalEmployee').modal('toggle');
	$(window).on("resize", function(){
	    $(".modal:visible").each(alignModal);
	});
}


function deleteComments(commentId) {
	
	$("#deleterecordid").val(commentId);
	$("#deleterecordtype").val('dashboarddeletecomments');
	$('#deleteModalEmployee').modal('toggle');
	$(window).on("resize", function(){
	    $(".modal:visible").each(alignModal);
	}); 
	$(".modal").on("shown.bs.modal", alignModal);
		
}

function deleteInitiatives(initiativeId) {
		var methodType = 'delete'
		$.ajax({
			url : "/stratroom/initiatives/" + initiativeId,
			type : methodType,
			contentType : "application/json",
			success : function(data, status) {
				location.reload(true);
				console.log("initiatives was deleted");
			}
		});
		
}

function deleteKPI(id) {
	var methodType = 'delete'
		$.ajax({
			url : "/stratroom/kpi/" + id,
			type : methodType,
			contentType : "application/json",
			success : function(data, status) {
				location.reload(true);
				console.log("kpi deleted");
			}
		});
}

$(document).ready(function(){
	getemppageName();
	getOverallScore();
	getempinitiativepermission();
	getempscorecardpermission();
	getemppermission();
	if(jQuery.inArray("Create", employeePermission) !== -1){
		empcreatepermission	=	true;
	}
	
	if(jQuery.inArray("Update", employeePermission) !== -1){
		empeditpermission	=	true;
	}
	
	if(jQuery.inArray("Delete", employeePermission) !== -1){
		empdeletepermission	=	true;
	}
	
	if(jQuery.inArray("View", employeePermission) !== -1){
		empviewpermission	=	true;
	}
	
	if(enableaccesscontrolMenu	==	true){
		empcreatepermission	=	true;
		empeditpermission		=	true;
		empdeletepermission	=	true;
		empviewpermission		=	true;
	}
	if(empcreatepermission == true || empeditpermission == true || empdeletepermission == true || empviewpermission == true){
		employeeloadcontent	=	true;
	}
	var attchconload	=	false;
	
	if(attachmentcreatepermission == true || attachmenteditpermission == true || attachmentviewpermission == true || attachmentdeletepermission == true){
		attchconload	=	true;
	}
	
	if(!attachmentcreatepermission){
		$(".createattupload").remove();
	}
	
	if(!employeeloadcontent){
		$(".employee_section").remove();
	}
	
	if(!empcreatepermission){
		$(".activitiescomment_send").remove();
	}
	
	if(!inicomcreatepermission){
		$(".iniactivitiescomment_send").remove();
	}
	
	if(!inicomcreatepermission){
		$('#iniactivitiescomment-conversation_employee').slimscroll({
			height: "340px",
			size: '3px',
			color: '#9c9c9c'
		});
		
	}
	if(inicomcreatepermission){
		$('#iniactivitiescomment-conversation_employee').slimscroll({
			height: "282px",
			size: '3px',
			color: '#9c9c9c'
		});
	}
	
	if(!empcreatepermission){
		$('#activitiescomment-conversation_employee,#risksumcomment-conversation').slimscroll({
			height: "340px",
			size: '3px',
			color: '#9c9c9c'
		});
		
	}
	if(empcreatepermission){
		$('#activitiescomment-conversation_employee,#risksumcomment-conversation').slimscroll({
			height: "282px",
			size: '3px',
			color: '#9c9c9c'
		});
	}
	
	var employeechart	=	$("#employeechart").val();
	if(employeechart	!=	"" && employeechart	!=	undefined){
		employeechartviewdetails(employeechart);	
	}
	
	var scorecardcustname	=	$(".scorecard-dropdown li:first a").text();
	
	var customtab	=	localStorage.getItem("custom_tabname");
	var ischeckempurlornot	=	window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
	if(ischeckempurlornot !=	undefined && ischeckempurlornot.includes("employeeView")){
		if(customtab	!=	""	&& customtab !=	undefined){
			$(".btn-custom-secondary").removeClass("active");
			$(".customTabContent").css("display","none");
			$('[data-value="'+customtab+'"]').addClass("active");
			$("div."+customtab).css("display","block");
			$(".scorecardnamecontent").css("display","none");
			/*if(customtab	!=	""	&& customtab !=	undefined && customtab ==	"Scorecard"){
				fetchScordcardData();
			}*/
			if(customtab	==	"Scorecard"){
				$(".scorecard-dropdown li a").removeClass("active");
				var customscore	=	localStorage.getItem("custom_scorecardliId");
				if(customscore	!=	""	&& customscore	!=	null	&& customscore !=	undefined){
					$(".scorecard-dropdown li a").each(function(key,value){
						var lastvalue	=	$(this).attr("data-value");
						if(lastvalue	==	customscore){
							$(".scorecardnamecontent").css("display","block");
							$(".scorecardnamevalue").text($(this).text());
							$(this).addClass("active");
						}
					});
				}else{
					$(".scorecardnamevalue").text($(".scorecard-dropdown li:first a").text());
					localStorage.setItem("custom_scorecardliId",$(".scorecard-dropdown li a").attr("data-value"));
					$(".scorecard-dropdown li:first a").addClass("active");
					$(".scorecardnamecontent").css("display","block");
				}
			}	
			
			if($(".employeetablink").hasClass("active") == false){
				$("div.Dashboard").css("display","block");
				$('[data-value="Dashboard"]').addClass("active");
				localStorage.setItem("custom_tabname", "Dashboard");
			}
		}
	}
	callemployeeiconview();
	if(attchconload){
		getDocuments();
	}
});

function convertonumber(value)
{
	value	=	(typeof value === "number"?convertInttoStringAndStringtoInt(value):value);
	return value.replace(/[^\d.-]/g, '');	
}

$(".employeetablink").click(function(){
	var tabname	=	$(this).attr("data-value");
	localStorage.setItem("custom_tabname", tabname);
	$(".btn-custom-secondary").removeClass("active");
	$(".customTabContent").css("display","none");
	$('[data-value="'+tabname+'"]').addClass("active");
	$("div."+tabname).css("display","block");
	/*if(tabname	==	"Scorecard"){
		$("div.Dashboard,div.Activities,div.Risk,div.Documents").css("display","none");
		$("div.Scorecard").css("display","block");
	}else if(tabname	==	"Dashboard"){
		$("div.Scorecard,div.Activities,div.Risk,div.Documents").css("display","none");
		$("div.Dashboard").css("display","block");
	}*/
	if(tabname	==	"Scorecard"){
		/*$("div.Dashboard,div.Activities,div.Risk,div.Documents").css("display","none");
		$("div.Scorecard").css("display","block");*/
		$(".scorecard-dropdown li a").removeClass("active");
		var customtab	=	localStorage.getItem("custom_scorecardliId");
		if(customtab	!=	""	&& customtab	!=	null	&& customtab !=	undefined){
			$(".scorecard-dropdown li a").each(function(key,value){
				var lastvalue	=	$(this).attr("data-value");
				if(lastvalue	==	customtab){
					$(".scorecardnamecontent").css("display","block");
					$(".scorecardnamevalue").text($(this).text());
					$(this).addClass("active");
				}
			});
		}else{
			$(".scorecardnamevalue").text($(".scorecard-dropdown li:first a").text());
			localStorage.setItem("custom_scorecardliId",$(".scorecard-dropdown li a").attr("data-value"));
			$(".scorecard-dropdown li:first a").addClass("active");
			$(".scorecardnamecontent").css("display","block");
		}
	}else{
		$(".scorecardnamecontent").css("display","none");
	}	
});

function employeechartviewdetails(id){
	$.ajax({
		url : "/stratroom/kpiDetailList/" + id+"?period="+$("#datePeriod").val(),
		contentType : "application/json",
		success : function(data, status) {
			employeeChartSuccessCallback(data,id);
		},
		error:readErrorMsg
	});
}

function employeeChartSuccessCallback(data, kpiId){
	var chartflagenable	=	false;
	kpichartDataList	=	[];
	
	$.each(data,function(key,value){
		var kpiobj	=	{};
		var kpichartobj		=	{};
		$.each(value,function(index,objval){ 
			chartflagenable	=	true;
						
			var numberchartActual	=	(objval.actual !=	undefined?objval.actual:"");
			var numberchartTarget	=	(objval.target !=	undefined?objval.target:"");
			var numberchartGap		=	(objval.gap !=	undefined?objval.gap:"");
			if(numberchartActual.includes("M") || numberchartTarget.includes("M") )
			{
				kpimillions = true;
			}
			else if (numberchartActual.includes("%") || numberchartTarget.includes("%") )
			{
				kpipercentage = true;
			}
														
			if(objval.currency !=	undefined && objval.currency !=	""){
				kpicurrencyval= objval.currency;
			}
			
			var actualchartnum		=	"";
			var targetchartnum		=	"";
			var gapchartnum			=	"";
			
			/*if(typeof(numberchartActual['number'])	===	"number"){
				numberchartActual['number']	=	convertInttoStringAndStringtoInt(numberchartActual['number']);	
			}
			
			if(typeof(numberchartTarget['number'])	===	"number"){
				numberchartTarget['number']	=	convertInttoStringAndStringtoInt(numberchartTarget['number']);	
			}
			
			if(typeof(numberchartGap['number'])	===	"number"){
				numberchartGap['number']	=	convertInttoStringAndStringtoInt(numberchartGap['number']);	
			}*/
			
			actualchartnum	=	numberchartActual;
			targetchartnum	=	numberchartTarget;
			gapchartnum	=	numberchartGap;
			
			kpichartobj	=	{
					period : index,
					actual : (actualchartnum),
					target : (targetchartnum),
					gap : (gapchartnum)
				};	
			
			kpichartDataList.push(kpichartobj);
		});
	});
	
	if(chartflagenable	==	false){
		kpichartDataList	=	[];
	}
	
	$("#chartdiv_in").resize(function(e) {
        drawChartemp("#chartdiv_in");
    });
    
    var lastviewedchart	=	localStorage.getItem("empkpichartviewdata");
    lastviewedchart		=	(lastviewedchart !=	null?lastviewedchart:3);
    var charticonchange	=	`<i class="fas fa-chart-line"></i>`;
    if(lastviewedchart	==	4){
		$("#chartofkpilastview").html('<i class="fas fa-chart-area"></i>');
	}else if(lastviewedchart	==	2){
		$("#chartofkpilastview").html('<i class="fas fa-chart-bar"></i>');
	}
    if(empKpiViewviewpermission){
    	drawChartemp('#chartdiv_in',lastviewedchart);
    }
	$('.sub-ini-box').slimscroll({
		height : '340px',
		size : '3px',
		color : '#9c9c9c'
	});
}

function drawChartemp(chartElement,type) {
	if(type	!=	"" && type !=	null && type !=	undefined){
		$(".apexchartsdrop").find("li").parent().parent().removeClass("show");
		$(".apexchartsdrop").removeClass("show");
	}
	
    
    var value 	= 	(type	==	"" || type== undefined?3:type);
    localStorage.setItem("empkpichartviewdata",value);
    
	$(".highlightchart").each(function(){
    	$(this).removeClass('highlightchartactive');
    });
    if(chartElement	!=	"#chart_modal"){
    	$(chartElement).empty();
    }
    
	$("#chartdiv_expandinit").empty();
	if (value == '2') {
		$("#chartdiv_in").attr("data-id",value);
		$("#columnchrtactive").addClass("highlightchartactive");
    	$("#kpigettypeofchartview").html('');
    	$("#chartofkpilastview").html('<i class="fas fa-chart-bar"></i>')
        drawnewColumn(chartElement);
    }else if (value == '3') {
		$("#chartdiv_in").attr("data-id",value);
		$("#linechrtactive").addClass("highlightchartactive");
    	$("#kpigettypeofchartview").html('');
    	$("#chartofkpilastview").html('<i class="fas fa-chart-line"></i>')
        drawnewLine(chartElement);
    }else if (value == '4') {
		$("#chartdiv_in").attr("data-id",value);
		$("#areachrtactive").addClass("highlightchartactive");
    	$("#kpigettypeofchartview").html('');
    	$("#chartofkpilastview").html('<i class="fas fa-chart-area"></i>')
        drawnewArea(chartElement);
    }
    
    /*if (value == '1') {
        $(chartElement).empty();
        drawStandard(chartElement);
    }else if (value == '2') {
        $(chartElement).empty();
        drawBar(chartElement);
    }else if (value == '3') {
        $(chartElement).empty();
        drawLine(chartElement);
    }else if (value == '4') {
        $(chartElement).empty();
        drawBox(chartElement);
    }else if (value == '5') {
        $(chartElement).empty();
        drawPie(chartElement);
    }else if (value == '6') {
        $(chartElement).empty();
        drawBubble(chartElement);
    }else if (value == '9') {
        $(chartElement).empty();
        drawWaterfall(chartElement);
    }else if (value == '13') {
        $(chartElement).empty();
        drawSctter(chartElement);
    }else if (value == '14') {
        $(chartElement).empty();
        drawStacked(chartElement);
    }else if (value == '15') {
        $(chartElement).empty();
        drawMultipleYaxis(chartElement);
    }*/
}

function kpichartviewdetails(){
	
	//$("#chart_modal").resize(function(e) {
		var getcurrentchart	=	localStorage.getItem("empkpichartviewdata");
		getcurrentchart	=	(getcurrentchart == null?3:getcurrentchart)
        drawChartemp("#chart_modal",getcurrentchart);
    //});
    $('.kpi_chart_view_popup').modal('toggle');
}

$(document).on('change','#employeechart', function() {
    employeechartviewdetails($(this).val());
});

function drawnewColumn(chartElement) {
	
	var xaxis 	=	[];
	var yaxis 	=	[];
	var sizeshow 	=	[];
	var checkdecimalornot	=	false;
	var actualchartdata	=	[];
	var targetchartdata	=	[];
	var yaxislabel	=	[];
	var percentage		=	false;
	var millions = false;
	var currencyval = "$";
	var data	=	[];
	var tardata	=	[];
	
	$.each(kpichartDataList,function(key,value){
		var actualbody 	=	value.actual;
		var targetbody 	=	value.target;
		actualbody 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);
		targetbody 	=	(typeof value.target === "number"?convertInttoStringAndStringtoInt(value.target):value.target);
		
		actualbody		=	convertonumber(value.actual);
		targetbody		=	convertonumber(value.target);
		
		if(actualbody.indexOf("M")>=0 || targetbody.indexOf("M")>=0 )
		{
			millions = true;
			currencyval= actualbody.substring(0, 1);
		}
		else if (actualbody.indexOf("%")>=0 || targetbody.indexOf("%")>=0 )
		{
			percentage = true;
		}
		
		data.push(actualbody);
		tardata.push(targetbody);
		yaxislabel.push(value.period);
		//actualchartdata.push(value.actual);
		//targetchartdata.push(value.target);
		//xaxis.push(value.period);
		//yaxis.push(value.actual);
		//sizeshow.push(50);
	});
	var chartdata	=	[{"name":"Actual",type:"column",data:data},{"name":"Target",type:"column",data:tardata}];
	var yaxisdata = "Value"
	
	if(kpimillions)
	{
		yaxisdata = kpicurrencyval+" in Millions"
	}
	else if(kpipercentage)
	{
		yaxisdata = "Value in %"
	}
		
	var layout = 	{
		series:chartdata,
		chart: {
            height: 323,
            type: "line",
          },
		 stroke: {
            width: [0, 4],
          },
          dataLabels: {
            enabled: false,
			enabledOnSeries: [1],
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
          }, 
		labels: yaxislabel,
			xaxis:{
				title:{
						text:"Period",
						offsetY: 5,
						font: {
					        family: '"Poppins", sans-serif'
					    }
					},		
				},
			yaxis:[{
				title:{
					text:yaxisdata,
					font: {
				        family: '"Poppins", sans-serif'
				      }
					}
				},
				{
              opposite: true,
			  //show:false
            }
			],
			tooltip: {
            fixed: {
              position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
              offsetY: 30,
              offsetX: 60,
            },
          }
		};
	
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 0;
	}
	
	/*if(checkdecimalornot	==	true && percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
		
	}else if(percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}else if(checkdecimalornot	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}*/
	
	
 /*plotOptions: {
  bar: {
    columnWidth: '100%'
  }
  },*/
  	
	if(chartElement 	==	"#chart_modal"){
		layout.autosize	=	false;
		layout.showlegend	=	false;
		if(chartdata[0].data.length !=	undefined && chartdata[0].data.length <= 5 ){
			layout.width	=	600;
		}else if(chartdata[0].data.length !=	undefined && (chartdata[0].data.length >= 5 && chartdata[0].data.length <= 10) ){
			layout.width	=	850;
			$(".largeviewkpichart").css('max-width','80%');
		}else if(chartdata[0].data.length !=	undefined && chartdata[0].data.length >= 10 ){
			layout.width	=	1200;
			$(".largeviewkpichart").css('max-width','100%');
		}else{
			layout.width	=	600;
		}
		layout.height	=	550;
		//layout.plotOptions.bar.columnWidth	=	 '20%';
	}
	
	if(chartElement 	==	"#chartdiv_in"){
		//chartexpandcheck();
		var chart 	= 	new ApexCharts(document.querySelector(chartElement),layout).render();
		//layout.chart.width	=	410;
		//var chart 	= 	new ApexCharts(document.querySelector("#chartdiv_expandinit"),layout).render();
	}else{
		var chart 	= 	new ApexCharts(document.querySelector(chartElement),layout).render();	
	}
}

function drawnewLine(chartElement) {
	
	var xaxis 	=	[];
	var yaxis 	=	[];
	var sizeshow 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	var actualchartdata	=	[];
	var targetchartdata	=	[];
	var yaxislabel	=	[];
	var min =	1;
	var max	=	1;
	
	$.each(kpichartDataList,function(key,value){
		var actualbody 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);
		var targetbody 	=	(typeof value.target === "number"?convertInttoStringAndStringtoInt(value.target):value.target);	
		if (actualbody.indexOf("%") >= 0 && actualbody.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (actualbody.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (actualbody.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		actualbody		=	convertonumber(actualbody);
		targetbody		=	convertonumber(targetbody);
		if(actualbody	>	max){
			max	=	actualbody;
		}
		if(targetbody	>	max){
			max	=	targetbody;
		}
		if(min > actualbody){
			min	=	actualbody;
		}
		if(min > targetbody){
			min	=	targetbody;
		}
		yaxislabel.push(value.period);
		actualchartdata.push(actualbody);
		targetchartdata.push(targetbody);
	//	sizeshow.push(50);
	});
	
	if(typeof min	===	"string"){
		min	=	parseInt(min);
	}
	if(typeof max	===	"string"){
		max	=	parseInt(max);
	}
	
	var yaxisdata = "Value"
	
	if(kpimillions)
	{
		yaxisdata = kpicurrencyval+" in Millions"
	}
	else if(kpipercentage)
	{
		yaxisdata = "Value in %"
	}
	
	var layout = 	{
		series: [{
              name: "Actual",
              data: actualchartdata,
            },
			{
              name: "Target",
              data: targetchartdata,
            }],
		chart: {
            height: 323,
            type: "line",
			dropShadow: {
              enabled: true,
              color: "#000",
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2,
            },
            toolbar: {
              show: true,
            },
          },
         dataLabels: {
            enabled: true,
          }, 
		 stroke: {
            curve: "smooth",
          },
          grid: {
            borderColor: "#e7e7e7",
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
		markers: {
            size: 1,
          },
		xaxis:{
			categories: yaxislabel,
			title:{
					text:"Period",
					font: {
				        family: '"Poppins", sans-serif'
				    },
				    align: "center",
				}	
			},
			yaxis:{
				title:{
					text:yaxisdata,
					font: {
				        family: '"Poppins", sans-serif'
				      }
					}
			},
			legend: {
            position: "bottom",
            horizontalAlign: "center",
          }
		};
	
	/*if(checkdecimalornot	==	true && percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
		
	}else if(percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}else if(checkdecimalornot	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}*/
	
	if(chartElement 	==	"#chart_modal"){
		layout.autosize	=	false;
		layout.showlegend	=	false;
		layout.width	=	1200;
		layout.height	=	550;	
	}
	
	if(chartElement 	==	"#chartdiv_in"){
		//chartexpandcheck();
		var chart 	= 	new ApexCharts(document.querySelector(chartElement),layout).render();
		//layout.chart.width	=	410;
		//var chart 	= 	new ApexCharts(document.querySelector("#chartdiv_expandinit"),layout).render();
	}else{
		var chart 	= 	new ApexCharts(document.querySelector(chartElement),layout).render();	
	}
}

function drawnewArea(chartElement) {
	
	var xaxis 	=	[];
	var yaxis 	=	[];
	var sizeshow 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	var actualchartdata	=	[];
	var targetchartdata	=	[];
	var yaxislabel	=	[];
	$.each(kpichartDataList,function(key,value){
		var actualbody 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);
		var targetbody 	=	(typeof value.target === "number"?convertInttoStringAndStringtoInt(value.target):value.target);	
		if (actualbody.indexOf("%") >= 0 && actualbody.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (actualbody.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (actualbody.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		actualbody		=	convertonumber(actualbody);
		targetbody		=	convertonumber(targetbody);
		yaxislabel.push(value.period);
		actualchartdata.push(actualbody);
		targetchartdata.push(targetbody);
	//	sizeshow.push(50);
	});
	var yaxisdata = "Value"
	
	if(kpimillions)
	{
		yaxisdata = kpicurrencyval+" in Millions"
	}
	else if(kpipercentage)
	{
		yaxisdata = "Value in %"
	}
	var layout = 	{
		series: [{
              name: "Actual",
              data: actualchartdata,
            },{
              name: "Target",
              data: targetchartdata,
            }],
		chart: {
            height: 323,
            type: "area",
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 90, 100],
            },
          },
		legend: {
			show: true,
            position: "bottom",
            horizontalAlign: "center",
          },
		
			xaxis:{
				categories: yaxislabel,
				title:{
						text:"Period",
						font: {
					        family: '"Poppins", sans-serif'
					    }
					}
				},
			yaxis:{
				title:{
					text:yaxisdata,
					font: {
				        family: '"Poppins", sans-serif'
				      }
					}
			},
			labels:{
				align:'center',
			},	
		};
	
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 0;
	}
	
	if(checkdecimalornot	==	true && percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
		
	}else if(percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}else if(checkdecimalornot	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}
	
	if(chartElement 	==	"#chart_modal"){
		layout.autosize	=	false;
		layout.showlegend	=	false;
		layout.width	=	1200;
		layout.height	=	550;	
	}
	
	if(chartElement 	==	"#chartdiv_in"){
		//chartexpandcheck();
		var chart 	= 	new ApexCharts(document.querySelector(chartElement),layout).render();
		//layout.chart.width	=	410;
		//var chart 	= 	new ApexCharts(document.querySelector("#chartdiv_expandinit"),layout).render();
	}else{
		var chart 	= 	new ApexCharts(document.querySelector(chartElement),layout).render();	
	}
}

function drawStandard(chartElement) {
	
	var xaxis 	=	[];
	var yaxis 	=	[];
	var showtext 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	$.each(kpichartDataList,function(key,value){
		var numberformat 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);	
		if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (numberformat.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		xaxis.push(value.period);
		yaxis.push(value.actual);
	});
	
	var layout = 	{
    					title: 'Kpi Chart',
						xaxis:{
								title:{
										text:"Period",
										font: {
									        family: 'initial'
									    }
									}
							},
						yaxis:{
							tickformat:'',
							range:'',
							title:{
								text:"Actual",
								font: {
							        family: 'initial'
							      }
								}	
						}
					};
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 0;
	}

	if(checkdecimalornot	==	true && percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
		
	}else if(percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}else if(checkdecimalornot	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}

	var trace1 	= 	{
  				x: xaxis,
  				y: yaxis,
				color:"green",
  				type: (checkdecimalornot == true || percentage == true ?'scatter':'bar'),
  				text: showtext,
  				marker: {
    				color: 'rgb(142,124,195)'
  				}
			};

	var data = [trace1];
	
	if(chartElement 	==	"#chartdiv_in"){
		chartexpandcheck();
		chartElement	=	"chartdiv_in";
		layout.autosize	=	false;
		layout.width	=	345;
		layout.height	=	335;
	}else{
		chartElement	=	"chart_modal";
		layout.autosize	=	false;
		layout.width	=	1200;
		layout.height	=	550;	
	}

	Plotly.newPlot(chartElement, data, layout,{displayModeBar: false});
	if(chartElement 	==	"chartdiv_in"){
		layout.autosize	=	false;
		layout.width	=	355;
		layout.height	=	335;
		Plotly.newPlot("chartdiv_expandinit", data, layout,{displayModeBar: false});
	}
}

function chartexpandcheck(){
	/*if ($('body').hasClass('side-closed')) {
        $("#chartdiv_in").css({ "display": "none" });
		$("#chartdiv_expandinit").css({ "display": "block" });
    } else {
        $("#chartdiv_in").css({ "display": "block" });
    }*/
}

function drawBar(chartElement) {
    var xaxis 	=	[];
	var yaxis 	=	[];
	var showtext 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	$.each(kpichartDataList,function(key,value){
		var numberformat 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);	
		if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (numberformat.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		xaxis.push(value.period);
		yaxis.push(value.actual);
		//showtext.push(value.target+' below the target');
	});
	
	var layout = 	{
    					title: 'Kpi Chart',
						xaxis:{
								title:{
										text:"Period",
										font: {
									        family: 'initial'
									    }
									}
							},
						yaxis:{
							tickformat:'',
							range:'',
							title:{
								text:"Actual",
								font: {
							        family: 'initial'
							      }
								}	
						}
					};
	
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 0;
	}

	if(checkdecimalornot	==	true && percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
		
	}else if(percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}else if(checkdecimalornot	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}

	var trace1 	= 	{
  				x: xaxis,
  				y: yaxis,
  				type: 'bar',
  				text: showtext,
  				marker: {
    				color: 'rgb(142,124,195)'
  				}
			};

	var data = [trace1];
	
	if(chartElement 	==	"#chartdiv_in"){
		chartexpandcheck();
		chartElement	=	"chartdiv_in";
		layout.autosize	=	false;
		layout.width	=	345;
		layout.height	=	335;
	}else{
		chartElement	=	"chart_modal";
		layout.autosize	=	false;
		layout.width	=	1200;
		layout.height	=	550;	
	}

	Plotly.newPlot(chartElement, data, layout,{displayModeBar: false});
	if(chartElement 	==	"chartdiv_in"){
		layout.autosize	=	false;
		layout.width	=	355;
		layout.height	=	335;
		Plotly.newPlot("chartdiv_expandinit", data, layout,{displayModeBar: false});
	}
}

function drawStacked(chartElement) {
    var xaxis 	=	[];
	var yaxis 	=	[];
	var y1axis 	=	[];
	var showtext 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	$.each(kpichartDataList,function(key,value){
		var numberformat 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);
		var numberformat1 	=	(typeof value.target === "number"?convertInttoStringAndStringtoInt(value.target):value.target);	
		if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (numberformat.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		xaxis.push(value.period);
		yaxis.push(value.actual);
		y1axis.push(value.target);
		//showtext.push(value.target+' below the target');
	});
	
	var layout = 	{
    					title: 'Kpi Chart',
						xaxis:{
								title:{
										text:"Period",
										font: {
									        family: 'initial'
									    }
									}
							},
						yaxis:{
							tickformat:'',
							range:'',
							title:{
								text:"Actual",
								font: {
							        family: 'initial'
							      }
								}	
						}
					};
	
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 0;
	}

	if(checkdecimalornot	==	true && percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
		
	}else if(percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}else if(checkdecimalornot	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}

	var trace1 	= 	{
  				x: xaxis,
  				y: yaxis,
  				type: 'bar',
  				text: showtext,
				name:"Actual",
  				marker: {
    				color: '#1f77b4'
  				}
			};
	var trace2 	= 	{
  				x: xaxis,
  				y: y1axis,
  				type: 'bar',
  				text: showtext,
				name:"Target",
  				marker: {
    				color: '#ff7f0e'
  				}
			};

	var data = [trace1,trace2];
	
	if(chartElement 	==	"#chartdiv_in"){
		chartexpandcheck();
		chartElement	=	"chartdiv_in";
		layout.autosize	=	false;
		layout.width	=	345;
		layout.height	=	335;
	}else{
		chartElement	=	"chart_modal";
		layout.autosize	=	false;
		layout.width	=	1200;
		layout.height	=	550;	
	}

	Plotly.newPlot(chartElement, data, layout,{displayModeBar: false});
	if(chartElement 	==	"chartdiv_in"){
		layout.autosize	=	false;
		layout.width	=	355;
		layout.height	=	335;
		Plotly.newPlot("chartdiv_expandinit", data, layout,{displayModeBar: false});
	}
}

function drawMultipleYaxis(chartElement) {
    var xaxis 	=	[];
	var yaxis 	=	[];
	var y1axis 	=	[];
	var y2axis 	=	[];
	var showtext 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	$.each(kpichartDataList,function(key,value){
		var numberformat 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);	
		if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (numberformat.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		xaxis.push(value.period);
		yaxis.push(value.actual);
		y1axis.push(value.target);
		y2axis.push(value.gap);
		//showtext.push(value.target+' below the target');
	});
	
	var layout = 	{
    					title: 'Kpi Chart',
						xaxis:{
								title:{
										text:"Period",
										font: {
									        family: 'initial'
									    }
									}
							},
						yaxis:{
							tickformat:'',
							range:'',
							title:{
								text:"Actual",
								font: {
							        family: 'initial'
							      }
								}	
						}
					};
	
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 0;
	}

	if(checkdecimalornot	==	true && percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
		
	}else if(percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}else if(checkdecimalornot	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}
	
		
	if(chartElement 	==	"#chartdiv_in"){
		chartexpandcheck();
		chartElement	=	"chartdiv_in";
		layout.autosize	=	false;
		layout.width	=	345;
		layout.height	=	335;
	}else{
		chartElement	=	"chart_modal";
		layout.autosize	=	false;
		layout.width	=	1200;
		layout.height	=	550;	
	}

	var options = {
          series: [{
          name: 'Actual',
          type: 'column',
          data: yaxis
        }, {
          name: 'Target',
          type: 'column',
          data: y1axis
        }, {
          name: 'Gap',
          type: 'line',
          data: y2axis
        }],
          chart: {
          height: 325,
          type: 'line',
          stacked: false,
    		toolbar: {
      			show: false
    		}
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [1, 1, 4]
        },
        title: {
          text: '',
          align: 'left',
          offsetX: 110
        },
        xaxis: {
          categories: xaxis,
        },
        yaxis: [
          {
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#008FFB'
            },
            labels: {
              style: {
                colors: '#008FFB',
              }
            },
            title: {
              text: "Actual",
              style: {
                color: '#008FFB',
              }
            },
            tooltip: {
              enabled: true
            }
          },
          {
            seriesName: 'Income',
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#00E396'
            },
            labels: {
              style: {
                colors: '#00E396',
              }
            },
            title: {
              text: "Actual",
              style: {
                color: '#00E396',
              }
            },
          },
          {
            seriesName: 'Revenue',
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#FEB019'
            },
            labels: {
              style: {
                colors: '#FEB019',
              },
            },
            title: {
              text: "Actual",
              style: {
                color: '#FEB019',
              }
            }
          },
        ],
        tooltip: {
          fixed: {
            enabled: true,
            position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60
          },
        },
        legend: {
          horizontalAlign: 'left',
          offsetX: 40
        }
        };

        var chart = new ApexCharts(document.querySelector("#"+chartElement), options);
        chart.render();
	if(chartElement 	==	"chartdiv_in"){
		layout.autosize	=	false;
		layout.width	=	355;
		layout.height	=	335;
		var chart = new ApexCharts(document.querySelector("#chartdiv_expandinit"), options);
        chart.render();
	}
}

function drawPie(chartElement) {
	
	var xaxis 	=	[];
	var yaxis 	=	[];
	var showtext 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	$.each(kpichartDataList,function(key,value){
		var numberformat 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);	
		if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (numberformat.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		xaxis.push(value.period);
		yaxis.push(value.actual);
		//showtext.push(value.target+' below the target');
	});
	
	var layout = 	{
    					title: 'Kpi Chart',
						yaxis:{
							tickformat:'',
							range:''	
						}
					};
	
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 0;
	}

	if(checkdecimalornot	==	true && percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
		
	}else if(percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}else if(checkdecimalornot	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}

	var data 	= 	[{
  				values: yaxis,
  				labels: xaxis,
  				type: 'pie',
			}];
	
	if(chartElement 	==	"#chartdiv_in"){
		chartexpandcheck();
		chartElement	=	"chartdiv_in";
		layout.autosize	=	false;
		layout.width	=	345;
		layout.height	=	335;
	}else{
		chartElement	=	"chart_modal";
		layout.autosize	=	false;
		layout.width	=	1200;
		layout.height	=	550;	
	}

	Plotly.newPlot(chartElement, data, layout,{displayModeBar: false});
	if(chartElement 	==	"chartdiv_in"){
		layout.autosize	=	false;
		layout.width	=	355;
		layout.height	=	335;
		Plotly.newPlot("chartdiv_expandinit", data, layout,{displayModeBar: false});
	}
}

function drawWaterfall(chartElement) {
	var xaxis 	=	[];
	var yaxis 	=	[];
	var showtext 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	$.each(kpichartDataList,function(key,value){
		var numberformat 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);	
		if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (numberformat.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		xaxis.push(value.period);
		yaxis.push(value.actual);
		//showtext.push(value.target+' below the target');
	});
	
	var layout = 	{
    					title: 'Kpi Chart',
						xaxis:{
								title:{
										text:"Period",
										font: {
									        family: 'initial'
									    }
									}
							},
						yaxis:{
							tickformat:'',
							range:'',
							type:'linear',
							title:{
								text:"Actual",
								font: {
							        family: 'initial'
							      }
								}	
						}
					};


	
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 0;
	}

	if(checkdecimalornot	==	true && percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
		
	}else if(percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}else if(checkdecimalornot	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}

	var data = [
        {
            name: "Actual",
            type: "waterfall",
            orientation: "v",
            measure: [],
            x:xaxis,
            textposition: "outside",
            text: [],         
            y: yaxis,
            connector: {
              line: {
                color: "rgb(63, 63, 63)"
              }
            },
        }
    ];
	
	if(chartElement 	==	"#chartdiv_in"){
		chartexpandcheck();
		chartElement	=	"chartdiv_in";
		layout.autosize	=	false;
		layout.showlegend	=	true;
		layout.width	=	345;
		layout.height	=	335;
	}else{
		chartElement	=	"chart_modal";
		layout.autosize	=	false;
		layout.width	=	1200;
		layout.showlegend	=	true;
		layout.height	=	550;	
	}

	Plotly.newPlot(chartElement, data, layout,{displayModeBar: false});
	if(chartElement 	==	"chartdiv_in"){
		layout.autosize	=	false;
		layout.showlegend	=	true;
		layout.width	=	355;
		layout.height	=	335;
		Plotly.newPlot("chartdiv_expandinit", data, layout,{displayModeBar: false});
	}
}
function drawBubble(chartElement) {
	
	var xaxis 	=	[];
	var yaxis 	=	[];
	var sizeshow 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	$.each(kpichartDataList,function(key,value){
		var numberformat 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);	
		if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (numberformat.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		xaxis.push(value.period);
		yaxis.push(value.actual);
		sizeshow.push(50);
	});
	
	var layout = 	{
    					title: 'Kpi Chart',
						xaxis:{
								title:{
										text:"Period",
										font: {
									        family: 'initial'
									    }
									}
							},
						yaxis:{
							tickformat:'',
							range:'',
							title:{
								text:"Actual",
								font: {
							        family: 'initial'
							      }
								}	
						}
					};
	
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 0;
	}

	if(checkdecimalornot	==	true && percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
		
	}else if(percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}else if(checkdecimalornot	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}

	var data = [
        {
            mode: "markers",
			x:xaxis,         
            y: yaxis,
			marker: {
    			size: sizeshow
  			}
        }
    ];
	
	
	if(chartElement 	==	"#chartdiv_in"){
		chartexpandcheck();
		chartElement	=	"chartdiv_in";
		layout.autosize	=	false;
		layout.showlegend	=	false;
		layout.width	=	345;
		layout.height	=	335;
	}else{
		chartElement	=	"chart_modal";
		layout.autosize	=	false;
		layout.width	=	1200;
		layout.showlegend	=	false;
		layout.height	=	550;	
	}

	Plotly.newPlot(chartElement, data, layout,{displayModeBar: false});
	if(chartElement 	==	"chartdiv_in"){
		layout.autosize	=	false;
		layout.showlegend	=	false;
		layout.width	=	355;
		layout.height	=	335;
		Plotly.newPlot("chartdiv_expandinit", data, layout,{displayModeBar: false});
	}
}

function drawBox(chartElement) {
    
   	var xaxis 	=	[];
	var yaxis 	=	[];
	var showtext 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	$.each(kpichartDataList,function(key,value){
		var numberformat 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);	
		if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (numberformat.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		xaxis.push(value.period);
		yaxis.push(value.actual);
		//showtext.push(value.target+' below the target');
	});
	
	var layout = 	{
    					title: 'Kpi Chart',
						xaxis:{
								type:'Period',
								title:{
										text:"Period",
										font: {
									        family: 'initial'
									    }
									}
							},
						yaxis:{
							tickformat:'',
							range:'',
							type:'linear',
							title:{
								text:"Actual",
								font: {
							        family: 'initial'
							      }
								}	
						}
					};
					
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 0;
	}

	if(checkdecimalornot	==	true && percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
		
	}else if(percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}else if(checkdecimalornot	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}

	var data = [
        {
            type: "box",
			boxpoints: 'all',         
            y: yaxis,
			jitter: "",
    		pointpos: ""
        }
    ];
	
	if(chartElement 	==	"#chartdiv_in"){
		chartexpandcheck();
		chartElement	=	"chartdiv_in";
		layout.autosize	=	false;
		layout.showlegend	=	true;
		layout.width	=	345;
		layout.height	=	335;
	}else{
		chartElement	=	"chart_modal";
		layout.autosize	=	false;
		layout.showlegend	=	true;
		layout.width	=	1200;
		layout.height	=	550;	
	}

	Plotly.newPlot(chartElement, data, layout,{displayModeBar: false});
	if(chartElement 	==	"chartdiv_in"){
		layout.autosize	=	false;
		layout.showlegend	=	true;
		layout.width	=	355;
		layout.height	=	335;
		Plotly.newPlot("chartdiv_expandinit", data, layout,{displayModeBar: false});
	}
}

function drawLine(chartElement) {
    // Set the dimensions of the canvas / graph
	var xaxis 	=	[];
	var yaxis 	=	[];
	var showtext 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	$.each(kpichartDataList,function(key,value){
		var numberformat 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);	
		if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (numberformat.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		xaxis.push(value.period);
		yaxis.push(value.actual);
		//showtext.push(value.target+' below the target');
	});
	
	var layout = 	{
    					title: 'Kpi Chart',
						xaxis:{
								title:{
										text:"Period",
										font: {
									        family: 'initial'
									    }
									}
							},
						yaxis:{
							tickformat:'',
							range:'',
							title:{
								text:"Actual",
								font: {
							        family: 'initial'
							      }
								}	
						}
					};
	
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 0;
	}

	if(checkdecimalornot	==	true && percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
		
	}else if(percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}else if(checkdecimalornot	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}

	var trace1 	= 	{
  				x: xaxis,
  				y: yaxis,
  				type: 'scatter',
  				text: showtext,
  				marker: {
    				color: 'rgb(142,124,195)'
  				}
			};

	var data = [trace1];
	
	if(chartElement 	==	"#chartdiv_in"){
		chartexpandcheck();
		chartElement	=	"chartdiv_in";
		layout.autosize	=	false;
		layout.width	=	345;
		layout.height	=	335;
	}else{
		chartElement	=	"chart_modal";
		layout.autosize	=	false;
		layout.width	=	1200;
		layout.height	=	550;	
	}

	Plotly.newPlot(chartElement, data, layout,{displayModeBar: false});
	if(chartElement 	==	"chartdiv_in"){
		layout.autosize	=	false;
		layout.width	=	355;
		layout.height	=	335;
		Plotly.newPlot("chartdiv_expandinit", data, layout,{displayModeBar: false});
	}
}

function drawSctter(chartElement) {
    // Set the dimensions of the canvas / graph
	var xaxis 	=	[];
	var yaxis 	=	[];
	var showtext 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	$.each(kpichartDataList,function(key,value){
		var numberformat 	=	(typeof value.actual === "number"?convertInttoStringAndStringtoInt(value.actual):value.actual);	
		if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
			percentage			=	true;
		}else if (numberformat.indexOf("%") >= 0) {
			percentage			=	true;
		}else if (numberformat.indexOf(".") >= 0) {
			checkdecimalornot	=	true;
		}
		xaxis.push(value.period);
		yaxis.push(value.actual);
		//showtext.push(value.target+' below the target');
	});
	
	var layout = 	{
    					title: 'Kpi Chart',
						xaxis:{
								title:{
										text:"Period",
										font: {
									        family: 'initial'
									    }
									}
							},
						yaxis:{
							tickformat:'',
							range:'',
							title:{
								text:"Actual",
								font: {
							        family: 'initial'
							      }
								}	
						}
					};

	
	if(yaxis.length > 0){
	var max = yaxis.reduce(function(a, b) {
    	return Math.max(a, b);
	});
	}else{
		var max = 0;
	}

	if(checkdecimalornot	==	true && percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
		
	}else if(percentage	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}else if(checkdecimalornot	==	true){
		var roundvalue 			=	Math.round(max)+1;
		var rangevalue 			=	Math.round(roundvalue/100);
		rangevalue 				=	(rangevalue == 0?1:rangevalue);
		layout.yaxis.tickformat	=	',.0%';
		layout.yaxis.range		=	[0,rangevalue];
	}

	var trace1 	= 	{
  				x: xaxis,
  				y: yaxis,
				mode: 'markers',
  				type: 'scatter',
  				text: showtext,
  				marker: {
    				color: 'rgb(142,124,195)'
  				}
			};

	var data = [trace1];
	
	
	if(chartElement 	==	"#chartdiv_in"){
		chartexpandcheck();
		chartElement	=	"chartdiv_in";
		layout.autosize	=	false;
		layout.width	=	345;
		layout.height	=	335;
	}else{
		chartElement	=	"chart_modal";
		layout.autosize	=	false;
		layout.width	=	1200;
		layout.height	=	550;	
	}

	Plotly.newPlot(chartElement, data, layout,{displayModeBar: false});
	if(chartElement 	==	"chartdiv_in"){
		layout.autosize	=	false;
		layout.width	=	355;
		layout.height	=	335;
		Plotly.newPlot("chartdiv_expandinit", data, layout,{displayModeBar: false});
	}
}


function mykpiviewdetails(){
	$('.employee_add_view_popup').modal('toggle');
	var element	=	$("#my_kpi_view");
	$("#viewmykpiheader").text($("#mykpiHeader").text());
	$(element).html('');
	$(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
	$.ajax({
		url : "/stratroom/kpiViewList",
		success : mykpirecordsviewSuccessCallback,
		error:function(msg,status){
			if(!jQuery.isEmptyObject(msg.responseText)){
				var errorparse	=	JSON.parse(msg.responseText);
				if(errorparse.status 	==	"404"){
					$(element).html('');
					$(element).html(errorparse.error);
				}else{
					$(element).html('');
					$(element).html(errorparse.error);
				}
			}
		}
	});
}

function mykpirecordsviewSuccessCallback(result) {
    var kpiItems = "";
    
    $.each(result, function(index, milestones) {
        if (milestones.kpiValue.statusLight != undefined && 
            milestones.kpiValue.statusLight != "" && 
            milestones.kpiValue.statusLight.includes("red fas fa-flag")) {
            
            var name = (milestones.kpiValue.name != undefined ? milestones.kpiValue.name : "");
            var actual = (milestones.kpiValue.actual != undefined ? milestones.kpiValue.actual : "");
            var target = (milestones.kpiValue.target != undefined ? milestones.kpiValue.target : "");
            
            kpiItems += `
                <div class="list-group-item">
                    <div class="bar-chart">
                        <h4 class="title m-0"><strong>${name}</strong></h4>
                        <div class="d-flex justify-content-between gap-2">
                            <div class="text-muted"><strong>Actual: ${actual}</strong></div>
                            <div class="text-muted text-end"><strong>Target: ${target}</strong></div>
                        </div>
                    </div>
                </div>
            `;
        }
    });
    
    $("#my_kpi_view").html(`
        <div class="list-group initiatives-bar">
            ${kpiItems}
        </div>
    `);
}

function myinitiativeEmpView(){
	$('.my_initative_view_popup').modal('toggle');
	var element	=	$("#my_initiative_view");
	$("#viewmyinitiativeHeader").text($("#myinitiativeHeader").text());
	
	$(element).html('');
	$(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
	$.ajax({
		url : "/stratroom/initiativesList?status=nodate",
		success : myinitiativerecordsviewSuccessCallback,
		error:function(msg,status){
			if(!jQuery.isEmptyObject(msg.responseText)){
				var errorparse	=	JSON.parse(msg.responseText);
				if(errorparse.status 	==	"404"){
					$(element).html('');
					$(element).html(errorparse.error);
				}else{
					$(element).html('');
					$(element).html(errorparse.error);
				}
			}
		}
	});
}

function myinitiativerecordsviewSuccessCallback(result) {
    var initiativeItems = "";
    
    $.each(result, function(index, initiative) {
        if (initiative.initiativeValue.statusIndicator != undefined && 
            initiative.initiativeValue.statusIndicator != "" && 
            initiative.initiativeValue.statusIndicator == "RED") {
            
            // Format date range
            var subdaterangeformatted = "";
            var datestring = initiative.initiativeValue.actualdaterange;
            if (datestring && datestring.includes("-")) {
                var dateval = datestring.split('-');
                var startdate = new Date(dateval[0]);
                var enddateformatted = new Date(dateval[1]);
                subdaterangeformatted = dateFormatedtohumanread(startdate) + ' - ' + dateFormatedtohumanread(enddateformatted);
            }
            
            // Get progress value
            var progressval = initiative.initiativeValue.progressval != undefined ? 
                             initiative.initiativeValue.progressval : "0";
            
            // Get initiative name
            var desc = initiative.initiativeValue.name != undefined ? 
                      initiative.initiativeValue.name : "";
            
            initiativeItems += `
                <div class="list-group-item">
                    <div class="bar-chart">
                        <h4 class="title m-0">${desc}</h4>
                        <div class="progress-wrap ${initiative.initiativeValue.statusIndicator == "RED" ? 'red' : ''}">
                            <div class="progress flex-grow-1" style="--stratroom-bg-opacity:1">
                                <div class="progress-bar progress-bar-striped rounded-pill incomplete_bar" 
                                     role="progressbar" 
                                     aria-valuenow="${progressval}" 
                                     aria-valuemin="0" 
                                     aria-valuemax="100" 
                                     style="width:${progressval}%"
                                     data-percent="${progressval}">
                                </div>
                            </div>
                            <span class="badge">${progressval}%</span>
                        </div>
                        <div class="text-muted">${subdaterangeformatted}</div>
                    </div>
                </div>
            `;
        }
    });
    
    $("#my_initiative_view").html(`
        <div class="list-group initiatives-bar">
            ${initiativeItems}
        </div>
    `);
    
    // Initialize slimscroll if needed
    $('.employee_div_body_box_emp').slimscroll({
        height: '450px',
        size: '3px',
        color: '#9c9c9c'
    });
}

function empmilstoneviewdetails(){
	var element	=	$("#emp_milestone_view");
	$(".milestones_view_popup").modal('toggle');
	$("#empviewmilestoneheader").text($("#empmilstoneHeader").text());
	$(element).html('');
	$(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
	$.ajax({
		url : "/stratroom/activities/initiativeDetailsList",
		success : empmilestonesrecordsviewSuccessCallback,
		error:function(msg,status){
			if(!jQuery.isEmptyObject(msg.responseText)){
				var errorparse	=	JSON.parse(msg.responseText);
				if(errorparse.status 	==	"404"){
					$(element).html('');
					$(element).html(errorparse.error);
				}else{
					$(element).html('');
					$(element).html(errorparse.error);
				}
			}
		}
	});
}

function empmilestonesrecordsviewSuccessCallback(result) {
    var milestoneItems = "";
    
    $.each(result.mileStonesList, function(index, milestones) {
        // Format date
        var datestring = milestones.mileStonesValue.dateRange;
        var enddateformatted = new Date(datestring);
        var humanreaddate = dateFormatedtohumanread(enddateformatted);
        
        // Get progress values
        var milstoneProgressval = milestones.mileStonesValue.progress != undefined && 
                                 milestones.mileStonesValue.progress != "" ? 
                                 milestones.mileStonesValue.progress : "0";
        
        // Determine status and styling
        var statusClass = "bg-secondary"; // default
        var badgeClass = "text-bg-secondary";
        var statusText = "Pending";
        
        var findprogressvalue = milestones.mileStonesValue.statusLight != undefined && 
                               milestones.mileStonesValue.statusLight != "" ? 
                               milestones.mileStonesValue.statusLight : "yellow_bar";
        
        if (findprogressvalue.includes('bar_height')) {
            statusClass = "bg-success";
            badgeClass = "text-bg-success";
            statusText = "Completed";
        } else if (findprogressvalue.includes('yellow_bar')) {
            statusClass = "bg-warning";
            badgeClass = "text-bg-warning";
        } else if (findprogressvalue.includes('orange_bar')) {
            statusClass = "bg-danger";
            badgeClass = "text-bg-danger";
        }
        
        // Get description
        var desc = milestones.mileStonesValue.desc || "";
        
        milestoneItems += `
            <div class="list-group-item">
                <div class="bar-chart">
                    <div class="d-flex gap-2 align-items-start">
                        <h4 class="title m-0">${desc}</h4>
                        <span class="badge ${badgeClass} rounded-pill ms-auto">
                            ${statusText}
                        </span>
                    </div>
                    <div class="progress-wrap">
                        <div class="progress flex-grow-1">
                            <div class="progress-bar ${statusClass} progress-bar-striped rounded-pill" 
                                 role="progressbar" 
                                 style="width: ${milstoneProgressval}%" 
                                 aria-valuenow="${milstoneProgressval}" 
                                 aria-valuemin="0" 
                                 aria-valuemax="100">
                            </div>
                        </div>
                        <span class="badge">${milstoneProgressval}%</span>
                    </div>
                    <span class="text-muted">${humanreaddate}</span>
                </div>
            </div>
        `;
    });
    
    $("#emp_milestone_view").html(`
        <div class="list-group initiatives-bar">
            ${milestoneItems}
        </div>
    `);
}


function empDashboardcommentsviewdetails(){
	var element	=	$("#emp_comments-row-box_view");
	$(".emp_dashborad_comments_view_popup").modal('toggle');
	$("#empviewcommentsheader").text($("#empcommentsHeader").text());
	$(element).html('');
	$(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
	$.ajax({
		url : "/stratroom/commentList/employee/" + currentEmp,
		success : empdashcommentsrecordsviewSuccessCallback,
		error:function(msg,status){
			if(!jQuery.isEmptyObject(msg.responseText)){
				var errorparse	=	JSON.parse(msg.responseText);
				if(errorparse.status 	==	"404"){
					$(element).html('');
					$(element).html(errorparse.error);
				}else{
					$(element).html('');
					$(element).html(errorparse.error);
				}
			}
		}
	});
}


function empacitivitiescommentsviewdetails(){	
	var element	=	$("#emp_comments-row-box_view");	
	$(".emp_activities_comments_view_popup").modal('toggle');
	$("#empviewcommentsheader").text($("#empcommentsHeader").text());
	$(element).html('');
	$(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
	$.ajax({
		url : "/stratroom/commentList/employee/" + currentEmp,
		success : empactivitiescommentsrecordsviewSuccessCallback,
		error:function(msg,status){
			if(!jQuery.isEmptyObject(msg.responseText)){
				var errorparse	=	JSON.parse(msg.responseText);
				if(errorparse.status 	==	"404"){
					$(element).html('');
					$(element).html(errorparse.error);
				}else{
					$(element).html('');
					$(element).html(errorparse.error);
				}
			}
		}
	});
}


function empdashcommentsrecordsviewSuccessCallback(result){
	
	var sub_initiatiesrow	=	"";
	var subinitiativeProgressBar	=	"";
	$.each(result,function(index, comment) {
		if(comment.commentsValue.statusaction != undefined && comment.commentsValue.statusaction != null && comment.commentsValue.statusaction =='employeeDashboard'){
			var timeformatted = new Date(comment.commentsValue.formattedDateTime);
			timeformatted = formatofAmPm(timeformatted);

			var kpicomentsowner	=	{};
			$.each(reporteelist,function(ownkey,empvalue){
				if(empvalue.id	==	comment.createdBy){
					kpicomentsowner	=	{"id":empvalue.id,"name":empvalue.name,"title":empvalue.title,"image":empvalue.image};
					return false;
				}
			});
			
			var name	=	(comment.commentsValue.createdByName == undefined || comment.commentsValue.createdByName == ""?comment.commentsValue.updatedByName:comment.commentsValue.createdByName);
			var title	=	(comment.commentsValue.title != undefined && comment.commentsValue.title != ""?comment.commentsValue.title:"");
			var getownershortName	=	hasWhiteSpaceName(name);
			var	Owner	=	"data-name='"+getownershortName+"'";
			
			if(kpicomentsowner !=	undefined && kpicomentsowner !=	'' && kpicomentsowner.name !== undefined){
				var username 	=	((kpicomentsowner.name ==	undefined || kpicomentsowner.name == "")?"User":kpicomentsowner.name);
				Owner = ((kpicomentsowner.image ==	undefined || kpicomentsowner.image == "")?"data-name='"+kpicomentsowner.name+"' class='rounded-circle commentsviewuserimage' ":" class='rounded-circle' src='"+kpicomentsowner.image+"'");
			}
			var desc=comment.commentsValue.desc;
			var currentuserlike 	=	(comment.likeEmpIds != undefined && comment.likeEmpIds != null?comment.likeEmpIds:[]);
			var likeText 	=	"Like";
			var likeTextclass 	=	"";	
			if(currentuserlike.length > 0 && $.inArray(Number(currentEmp),currentuserlike) !== -1){
				likeText 	=	"Unlike";
				likeTextclass 	=	"green";
			}
		
			var count 	=	(comment.likeCount != undefined && comment.likeCount != null?comment.likeCount:0);
			
			sub_initiatiesrow	+=	'<li><div class="d-flex flex-row"><div class="flex-column comment_image"><img '+Owner+' class="rounded-circle kpicommentsimgprofile" alt="User" width="40"></div><div class="flex-column comment_details"><ul><li><span class="message-data-name"><strong>'+name+', '+title+' </strong></span></li><li class="commentsdesc">'+desc+'</li><li><ul class="d-flex flex-row"><li>Reply</li>'
			+'<li class="'+likeTextclass+'">'+likeText+'</li><li class="parentcounter"><span class="badge badge-dark counter">'+count+'</span></li>'
			+'<li>'+timeformatted+'</li></ul></li></ul></div></div></li>';
			}
			
			});
	$(".emp_comments-row-box_view").html('');
	$(".emp_comments-row-box_view").html(sub_initiatiesrow);
	$('.commentsviewuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
}


function empactivitiescommentsrecordsviewSuccessCallback(result){
	
	var sub_initiatiesrow	=	"";
	var subinitiativeProgressBar	=	"";
	$.each(result,function(index, comment) {
		if(comment.commentsValue.statusaction =='employeeActitivites'){
			var timeformatted = new Date(comment.commentsValue.formattedDateTime);
			timeformatted = formatofAmPm(timeformatted);
			console.log(timeformatted)		
			var kpicomentsowner	=	{};
			$.each(reporteelist,function(ownkey,empvalue){
				if(empvalue.id	==	comment.createdBy){
					kpicomentsowner	=	{"id":empvalue.id,"name":empvalue.name,"title":empvalue.title,"image":empvalue.image};
					return false;
				}
			});
		
			var name	=	(comment.commentsValue.createdByName == undefined || comment.commentsValue.createdByName == ""?comment.commentsValue.updatedByName:comment.commentsValue.createdByName);
			var title	=	(comment.commentsValue.title != undefined && comment.commentsValue.title != ""?comment.commentsValue.title:"");
			var getownershortName	=	hasWhiteSpaceName(name);
			var	Owner	=	"data-name='"+getownershortName+"'";
			
			if(kpicomentsowner !=	undefined && kpicomentsowner !=	'' && kpicomentsowner.name !== undefined){
				var username 	=	((kpicomentsowner.name ==	undefined || kpicomentsowner.name == "")?"User":kpicomentsowner.name);
				Owner = ((kpicomentsowner.image ==	undefined || kpicomentsowner.image == "")?"data-name='"+kpicomentsowner.name+"' class='rounded-circle commentsviewuserimage' ":" class='rounded-circle' src='"+kpicomentsowner.image+"'");
			}
			var desc=comment.commentsValue.desc;
			
			var currentuserlike 	=	(comment.likeEmpIds != undefined && comment.likeEmpIds != null?comment.likeEmpIds:[]);
			var likeText 	=	"Like";
			var likeTextclass 	=	"";	
			if(currentuserlike.length > 0 && $.inArray(Number(currentEmp),currentuserlike) !== -1){
				likeText 	=	"Unlike";
				likeTextclass 	=	"green";
			}
			var count 	=	(comment.likeCount != undefined && comment.likeCount != null?comment.likeCount:0);
			
			sub_initiatiesrow	+=	'<li><div class="d-flex flex-row"><div class="flex-column comment_image"><img '+Owner+' class="rounded-circle kpicommentsimgprofile" alt="User" width="40"></div><div class="flex-column comment_details"><ul><li><span class="message-data-name"><strong>'+name+', '+title+' </strong></span></li><li class="commentsdesc">'+desc+'</li><li><ul class="d-flex flex-row"><li>Reply</li>'
			+'<li class="'+likeTextclass+'">'+likeText+'</li><li class="parentcounter"><span class="badge badge-dark counter">'+count+'</span></li>'
			+'<li>'+timeformatted+'</li></ul></li></ul></div></div></li>';
			}
			
			});
	$(".emp_comments-row-box_view").html('');
	$(".emp_comments-row-box_view").html(sub_initiatiesrow);
	$('.commentsviewuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
	$('#activitiesview-comment-conversation_employee').slimscroll({
        height: '340px',
        size: '3px',
        color: '#9c9c9c'
    });
}


function callemployeeiconview(){
	var dashboardnames	=	[{"name":"empchart_iconview",value:"Chart"},
		{"name":"empmykpi_iconview",value:"My KPI's"},{"name":"empgoal_iconview",value:"Goal"},
		{"name":"empinitiatives_iconview",value:"My Initiatives"},{"name":"empmyrisks_iconview",value:"My Risks"},
		{"name":"empdashboardcomment_iconview",value:"Notes"}];
		var dashbaorddesignlabel	=	"";
		if(employeepreference['preferences'] !=	undefined && employeepreference['preferences'] !=	null){
			
			$.each(dashboardnames,function(key,val){
				if(employeepreference['preferences'][val.name]	!=	undefined && employeepreference['preferences'][val.name]	!=	""){
					employeeObjectPreference["preferences"][val.name]	=	employeepreference['preferences'][val.name];
					var checkriskistrueornot	=	(employeepreference['preferences'][val.name] ==	"true"?"true":employeepreference['preferences'][val.name]);
					var subiniviewPreference	=	(checkriskistrueornot	==	"true"?"checked":"");
					if(checkriskistrueornot	==	"false"){
						$("."+val.name).css("display","none");					
					}	
					dashbaorddesignlabel		+=	'<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="'+val.name+'" value="'+val.name+'" class="form-check-input" '+subiniviewPreference+'/>'+val.value+'<span class="form-check-sign"><span class="check"></span></label></div></a></li>';		
				}else{
					employeeObjectPreference["preferences"][val.name]	=	true;
					dashbaorddesignlabel		+=	'<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="'+val.name+'" value="'+val.name+'" class="form-check-input" checked/>'+val.value+'<span class="form-check-sign"><span class="check"></span></label></div></a></li>';	
				}
			});
			$("#dashboardviewiconTxt").html(dashbaorddesignlabel);
		}else{
			$.each(dashboardnames,function(key,val){
				employeeObjectPreference["preferences"][val.name]	=	true;
				dashbaorddesignlabel		+=	'<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="'+val.name+'" value="'+val.name+'" class="form-check-input" checked/>'+val.value+'<span class="form-check-sign"><span class="check"></span></label></div></a></li>';
			});
			$("#dashboardviewiconTxt").html(dashbaorddesignlabel);
		}
		//scorecard
		/*if(scoreempPreference['preferences']	!=	undefined && scoreempPreference['preferences']	!=	null){
			var dashbaorddesignlabel	=	"";
			$.each(scoreempPreference['preferences'],function(key,val){
				employeeObjectPreference["preferences"][key]	=	val;
				var checkriskistrueornot	=	(key ==	"true"?"true":"false");
				var subiniviewPreference	=	(checkriskistrueornot	==	"true"?"checked":"");
				if(checkriskistrueornot	==	"false"){
					$("."+val).css("display","none");					
				}	
				dashbaorddesignlabel		+=	'<li><a href="#"><label class=""><input type="checkbox" name="'+key+'" value="'+key+'" '+subiniviewPreference+'/>'+key+'</label></a></li>';	
			});
			$("#scorecardviewiconTxt").html(dashbaorddesignlabel);		
		}*/
		
		
		if(employeescorepreference['preferences'] !=	undefined && employeescorepreference['preferences'] !=	null){
			$.each(employeescorepreference['preferences'],function(key,val){
				employeeObjectPreference["preferences"][key]	=	val;
			});	
		}else{
			/*if(scoreempPreference['preferences']	!=	undefined && scoreempPreference['preferences']	!=	null){
				$.each(scoreempPreference['preferences'],function(key,val){
					employeeObjectPreference["preferences"][key]	=	val;
				});
			}*/	
		}
		
		//activities
		var activitiesnames	=	[{"name":"empact_initives_iconview",value:"Initiatives"},
		{"name":"empsubinitiatives_iconview",value:"Sub Initiatives"},{"name":"empactivities_iconview",value:"Activities"},
		{"name":"empmilestones_iconview",value:"Milestones"},
		{"name":"empcomments2_iconview",value:"Notes"}];
		var dashbaorddesignlabel	=	"";
		if(employeepreference['preferences'] !=	undefined && employeepreference['preferences'] !=	null){
			
			$.each(activitiesnames,function(key,val){
				if(employeepreference['preferences'][val.name]	!=	undefined && employeepreference['preferences'][val.name]	!=	""){
					employeeObjectPreference["preferences"][val.name]	=	employeepreference['preferences'][val.name];
					var checkriskistrueornot	=	(employeepreference['preferences'][val.name] ==	"true"?"true":employeepreference['preferences'][val.name]);
					var subiniviewPreference	=	(checkriskistrueornot	==	"true"?"checked":"");
					if(checkriskistrueornot	==	"false"){
						$("."+val.name).css("display","none");					
					}	
					dashbaorddesignlabel		+=	'<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="'+val.name+'" value="'+val.name+'" class="form-check-input" '+subiniviewPreference+'/>'+val.value+'<span class="form-check-sign"><span class="check"></span></label></div></a></li>';		
				}else{
					employeeObjectPreference["preferences"][val.name]	=	true;
					dashbaorddesignlabel		+=	'<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="'+val.name+'" value="'+val.name+'" class="form-check-input" checked/>'+val.value+'<span class="form-check-sign"><span class="check"></span></label></div></a></li>';	
				}
			});
			$("#activitiesviewiconTxt").html(dashbaorddesignlabel);
		}else{
			$.each(activitiesnames,function(key,val){
				employeeObjectPreference["preferences"][val.name]	=	true;
				dashbaorddesignlabel		+=	'<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="'+val.name+'" value="'+val.name+'" class="form-check-input" checked/>'+val.value+'<span class="form-check-sign"><span class="check"></span></label></div></a></li>';
			});
			$("#activitiesviewiconTxt").html(dashbaorddesignlabel);
		}
		
		//risk
		var activitiesnames	=	[{"name":"empheatmap_iconview",value:"Heat Map"},
		{"name":"emprisknotes_iconview",value:"Notes"},{"name":"emprisktable_iconview",value:"Risk Register"}];
		var dashbaorddesignlabel	=	"";
		if(employeepreference['preferences'] !=	undefined && employeepreference['preferences'] !=	null){
			
			$.each(activitiesnames,function(key,val){
				if(employeepreference['preferences'][val.name]	!=	undefined && employeepreference['preferences'][val.name]	!=	""){
					employeeObjectPreference["preferences"][val.name]	=	employeepreference['preferences'][val.name];
					var checkriskistrueornot	=	(employeepreference['preferences'][val.name] ==	"true"?"true":employeepreference['preferences'][val.name]);
					var subiniviewPreference	=	(checkriskistrueornot	==	"true"?"checked":"");
					if(checkriskistrueornot	==	"false"){
						$("."+val.name).css("display","none");					
					}	
					dashbaorddesignlabel		+=	'<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="'+val.name+'" value="'+val.name+'" class="form-check-input" '+subiniviewPreference+'/>'+val.value+'<span class="form-check-sign"><span class="check"></span></label></div></a></li>';		
				}else{
					employeeObjectPreference["preferences"][val.name]	=	true;
					dashbaorddesignlabel		+=	'<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="'+val.name+'" value="'+val.name+'" class="form-check-input" checked/>'+val.value+'<span class="form-check-sign"><span class="check"></span></label></div></a></li>';	
				}
			});
			$("#risktabviewiconTxt").html(dashbaorddesignlabel);
		}else{
			$.each(activitiesnames,function(key,val){
				employeeObjectPreference["preferences"][val.name]	=	true;
				dashbaorddesignlabel		+=	'<li><a href="#"><div class="form-check"><label class="form-check-label"><input type="checkbox" name="'+val.name+'" value="'+val.name+'" class="form-check-input" checked/>'+val.value+'<span class="form-check-sign"><span class="check"></span></label></div></a></li>';
			});
			$("#risktabviewiconTxt").html(dashbaorddesignlabel);
		}
		if(!empKpiViewviewpermission){
			$(".viewiconTxt").css('display', 'none');
		}
}	



$(document).ready(function () {
    $('.employeedropdownmenuicon input[type="checkbox"]').click(function () {
	  	var inputValue = $(this).attr("value");
		var checkedProp 	= 	$(this).is(':checked');
		employeeObjectPreference["pageName"]				=	"EMPLOYEE";
		employeeObjectPreference["pageId"]					=	emppageNo;
		employeeObjectPreference["preferences"][inputValue]	=	checkedProp;
		$.ajax({
			url : "/stratroom/employeePreference",
			type : "POST",
			contentType : "application/json",
			data : JSON.stringify(employeeObjectPreference),
			success : function(data, status) {
				
			},
			error:readErrorMsg
		});
	  	$("." + inputValue).toggle();
    });
});

$(".employeedropdown-menu").on("click", function (e) {
	e.stopPropagation();
});

function handleGoalDetailEvent(id, action) {
	$("#goal_Form").css('display', 'none');
	$("#goal_Form").trigger('reset');
	$('.add_goals_popup').modal('toggle');
	formvalidationerrorreset();
	$("#goal_Form input[name='action']").val(action);
	if (action == 'add') {
		$("#goalCreatedBy").html("");
		$("#goalCreatedByDate").html("");
		$("#goalUpdatedBy").html("");
		$("#goalUpdatedByDate").html("");
		$("#goal_id_wrapper").css('display', 'none'); // Hide the ID input
		// when adding
		$("#goal_Form").css('display', 'block');
	} else { // view and edit
		$("#goal_id_wrapper").css('display', 'block');
		$('.add_goals_popup #goal_id')
				.prop("disabled", true);
		$('.add_goals_popup #goal_id').val(id);
		$('.add_goals_popup #goalId').val(id);
		if (action == 'view') {
			$('#goal_Form input[type="text"]').prop("disabled", true);
			$('#goal_Form input[type="checkbox"]').prop("disabled", true);
			$('#goal_Form select').prop("disabled", true);
			$('#goal_Form button[value="Save"]').css('display', 'none');
		}

		$.ajax({
			url : "/stratroom/goals/" + id,
			success : goalsDetailPopSuccessCallback
		});
	}
}

function goalsDetailPopSuccessCallback(data) {
	$("#goal_Form").css('display', 'block');
	$('#goal_id').val(data.id);
	$('#goalId').val(data.id);
	$('#goalname').val(data.goalsValue.name);
	$('#goalstatus').val(data.goalsValue.status);
	$('#goaldueon').val(data.goalsValue.dateRange);
	$('#goalprogress').val(data.goalsValue.progress);
	$("#riskDetailCreatedById").val(data.createdBy);
	$("#riskDetailCreatedBy").html(data.goalsValue.createdByName);
	$("#riskDetailUpdatedBy").html(data.goalsValue.updatedByName);
	$("#riskDetailCreatedByDate").html(data.createDateString);
	$("#riskDetailUpdatedByDate").html(data.updatedDateString);
}

function getGoalObj() {
	var goalObj = {  
		"createdBy" : currentEmp,
		"owner" : currentEmp,
		"active" : 0,
		"goalsValue" : {
			"name" : $("#goalname").val(),
			"status" : $("#goalstatus").val(),
			"dateRange" : $("#goaldueon").val(),
			"progress" : $("#goalprogress").val()
		}
	}
	
	$.each(goalupdateDescription.goalsValue,function(riskindex,value){
		if(riskindex	!=	"name" && riskindex	!=	"status" && riskindex	!=	"dateRange" && riskindex	!=	"progress"){
			goalObj["goalsValue"][riskindex]	=	value;
		}
	});
	
	return goalObj;
}

function handleEmployeeGoalSave() {
	var action = $("#goal_Form input[name='action']").val();
	if (action == 'delete') {

	} else {
		var serviceObj = getGoalObj();
		var methodType = 'post';
		if (action == 'edit') {
			serviceObj.id = 	$("#goal_Form input[name='goalId']").val();
			methodType = 'put';
		}
		
		$.ajax({
			url : "/stratroom/goals/",
			type : methodType,
			contentType : "application/json",
			data : JSON.stringify(serviceObj),
			success : function(data, status) {
				location.reload(true);
			}
		});
	}
}

$(document).on("click",".goalsubmit",function(){
	if($("#goaldueon").val() ==	""){
		$(".goal-input-calender-icon").css("bottom","45%");
	}else{
		$(".goal-calender-icon").css("bottom","45%");
	}
});

function deleteEmploeedahsboard(id,type) {
	console.log(id, type, "deleteEmploeedahsboard");
	$("#deleterecordid").val(id);
	$("#deleterecordtype").val(type);
	$('#deleteModalEmployee').modal('toggle');
	$(window).on("resize", function(){
	    $(".modal:visible").each(alignModal);
	}); 
	$(".modal").on("shown.bs.modal", alignModal);		
}

function handleemployeeeventdelete(){
	var id				=	$("#deleterecordid").val();
	var typeofdeleteurl	=	$("#deleterecordtype").val();
	if(id	==	"" || typeofdeleteurl	==	""){
		return false;
	}
	var url				=	"";
	if(typeofdeleteurl	==	"goal"){
		url	=	"/stratroom/goals/" + id;
	}else if(typeofdeleteurl	==	"risk"){
		url	=	"/stratroom/risk/" + id;
	}else if(typeofdeleteurl	==	"initiative"){
		url	=	"/stratroom/initiatives/" + id;
	}else if(typeofdeleteurl	==	"kpi"){
		url	=	"/stratroom/kpi/" + id;
	}else if(typeofdeleteurl	==	"dashboarddeletecomments"){
		url	=	"/stratroom/comments/employee/" + id;
	}else if(typeofdeleteurl	==	"deletesubinitiaveactivities"){
		url	=	"/stratroom/subinitiatives/" + id;
	}else if(typeofdeleteurl	==	"deleteActivities"){
		url	=	"/stratroom/activities/" + id;
	}else if(typeofdeleteurl	==	"deleteMileStones"){
		url	=	"/stratroom/milestones/" + id;
	}
	
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

function goalsviewdetails(){
	var element	=	$("#goals_box_view");
	//$("#viewmilestoneheader").text($("#miletoneHeader").text());
	$('.goals_view_popup').modal('toggle');
	$(element).html('');
	$(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
	$.ajax({
		url : "/stratroom/goalsList/",
		success : goalsrecordsviewSuccessCallback,
		error:readErrorMsg
	});
}

function goalsrecordsviewSuccessCallback(result){
	console.log(result, "goalsrecordsviewSuccessCallback");
	var sub_initiatiesrow	=	"";
	var subinitiativeProgressBar	=	"";
	$.each(result,function(index, milestones) {
		if(milestones.goalsValue.statusIndicator != undefined && milestones.goalsValue.statusIndicator != "" && milestones.goalsValue.statusIndicator == "RED"){
			
		
		var mileStondaterangeformatted = ""
		var datestring 			=	milestones.goalsValue.dateRange;
		var enddateformatted 	= 	new Date(datestring);
		var milstoneProgressval	=	(milestones.goalsValue.progress !=	undefined && milestones.goalsValue.progress !=	""?milestones.goalsValue.progress:"yellow_bar");
		
		var desc	= 	milestones.goalsValue.name;
		var status 	=	(milstoneProgressval 	==	100?"Completed":"Pending");
		var humanreaddate	=	dateFormatedtohumanread(enddateformatted);
		var milstoneProgressval	=	milstoneProgressval;
		sub_initiatiesrow	+=	'<div class="d-flex flex-row employe_content_border my_kpi_red sub_initiative_details"><div class="d-flex flex-column flex-fill profile_content"><div class="d-flex flex-row"><p>'+desc+'</p></div><div class="d-flex flex-row"><div class="d-flex flex-column flex-fill"><div class="d-flex flex-row"><div class="progress-s progress"><div class="progress-bar width-per-30 rounded-pill bar_height incomplete_bar" role="progressbar" aria-valuenow="'+milstoneProgressval+'" aria-valuemin="0" aria-valuemax="100" style="width:'+milstoneProgressval+'%"></div></div><div class="progress_value">'+milstoneProgressval+'%</div></div></div><div class="d-flex flex-column" style="margin-top: -5px;"><div><strong style="color: #bdbdbd;">Due on</strong><br /><strong>'+humanreaddate+'</strong></div></div></div></div></div>';
	
		}
		});
	$("#goals_box_view").html('');
	$("#goals_box_view").html(sub_initiatiesrow);
}

function riskListviewdetails(){
	var element	=	$("#myrisk_view_box");
	//$("#viewmilestoneheader").text($("#miletoneHeader").text());
	$('.risk_view_popup').modal('toggle');
	$(element).html('');
	$(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
	$.ajax({
		url : "/stratroom/riskList/"+currentEmp,
		success : riskListrecordsviewSuccessCallback,
		error:readErrorMsg
	});
}

function riskListrecordsviewSuccessCallback(result) {
    var riskItems = "";
    
    $.each(result, function(index, milestones) {
        var datestring = milestones.riskValue.dateCompleted;
        var enddateformatted = new Date(datestring);
        var humanreaddate = dateFormatedtohumanread(enddateformatted);
        
        if (milestones.riskValue.likeliHood != undefined && 
            (milestones.riskValue.likeliHood == 'Possible' || 
             milestones.riskValue.likeliHood == 'Likely' || 
             milestones.riskValue.likeliHood == 'Almost Certain' || 
             milestones.riskValue.likeliHood == 'Rare' || 
             milestones.riskValue.likeliHood == 'Unlikely')) {
            
            riskItems += `
                <div class="list-group-item">
                    <div class="bar-chart">
                        <div class="d-flex gap-2">
                            <h4 class="title mb-0">${milestones.riskValue.name}</h4>
                            <span class="badge label-bg-dark rounded-pill ms-auto">${milestones.riskValue.score}</span>
                        </div>
                        <div class="numbers">
                            <div class="text-muted left">${milestones.riskValue.riskStatus}</div>
                            <div class="text-muted right">${humanreaddate}</div>
                        </div>
                    </div>
                </div>
            `;
        }
    });
    
    $("#myrisk_view_box").html(`
        <div class="list-group initiatives-bar">
            ${riskItems}
        </div>
    `);
}

function formvalidationerrorreset(){
	$('*[id*=-error]').each(function() {
	    $(this).remove();
	});
}

function getMileStonesObj() {
	var progressPageValue = $("#milestone_progress").val();
	var mileStoneProgressValue = progressPageValue != undefined && progressPageValue != "" ? progressPageValue : "0";
	var status = mileStoneProgressValue == 100 ? "Completed" : "Pending";
	var mileStoneObj = {
		"createdBy": $("#mileCreatedById").val(),
		"owner" : currentEmp,
		"mileStonesValue": {
			"name": $("#milestone_name").val(),
			"progress": $("#milestone_progress").val(),
			"desc": $("#milestone_desc").val(),
			"status": status,
			"dateRange": $("#milestone_start_end").val()
		}
	}
	return mileStoneObj;
}

function handleMileStonesSave() {	
	var action = $("#mileStonesForm input[name='action']").val();
	if (action == 'delete') {

	} else {
		var startdate = new Date();
		var enddate = new Date();
		if (parentInitiativedetails.initiativeValue.daterange != undefined && parentInitiativedetails.initiativeValue.daterange != '') {
			var daterange = parentInitiativedetails.initiativeValue.daterange;
			if (daterange.includes("-")) {
				var dateval = daterange.split('-');
				startdate = new Date(dateval[0]);
				enddate = new Date(dateval[1]);
			}
		}

		var mileStoneObj = getMileStonesObj();
		mileStoneObj.initiativeId = $(
			"#mileStonesForm input[name='initiativeID']").val();
		var methodType = 'post';
		if (action == 'add') {

		} else if (action == 'edit') {
			mileStoneObj.id = $("#milestone_id").val();
			methodType = 'put';
		}

		$.ajax({
			url: "/stratroom/milestones/",
			type: methodType,
			contentType: "application/json",
			data: JSON.stringify(mileStoneObj),
			success: function (data, status) {
				location.reload(true);
				$("#milePopup").click();
			}
		});
	}
}

function empactivitiesviewdetails() {

	var element = $("#activities-box_view");
	$('.sub_activitie_view_popup').modal('toggle');
	$("#initactivitiesviewheader").text($("#activitiesHeader").text());
	var url = "/stratroom/retrieveActivitiesList/" + currentEmp;
	$(element).html('');
	$(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
	$.ajax({
		url: url,
		success: function (result) {
			activitiesrecordsviewSuccessCallback(result);
		},
		error: function (msg, status) {
			if (!jQuery.isEmptyObject(msg.responseText)) {
				var errorparse = JSON.parse(msg.responseText);
				if (errorparse.status == "404") {
					$(element).html('');
					$(element).html(errorparse.error);
				} else {
					$(element).html('');
					$(element).html(errorparse.error);
				}
			}
		}
	});
}



function initiativeEmpView(){
	$('.my_initative_view_popup').modal('toggle');
	var element	=	$("#my_initiative_view");
	$("#viewmyinitiativeHeader").text($("#myinitiativeHeader").text());	
	$(element).html('');
	$(element).html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
	$.ajax({
		url : "/stratroom/initiativesList",
		success : initiativerecordsviewSuccessCallback,
		error:function(msg,status){
			if(!jQuery.isEmptyObject(msg.responseText)){
				var errorparse	=	JSON.parse(msg.responseText);
				if(errorparse.status 	==	"404"){
					$(element).html('');
					$(element).html(errorparse.error);
				}else{
					$(element).html('');
					$(element).html(errorparse.error);
				}
			}
		}
	});
}

function initiativerecordsviewSuccessCallback(result){
	var rows	=	"";
	$.each(result,function(index, initiative) {						
		var subdaterangeformatted = ""
		var datestring = initiative.initiativeValue.actualdaterange
		if (datestring && datestring.includes("-")) {
			var dateval = datestring.split('-');
			var startdate = new Date(dateval[0]);
			var enddateformatted = new Date(dateval[1]);
			subdaterangeformatted	=	dateFormatedtohumanread(startdate)+'- '+dateFormatedtohumanread(enddateformatted);
		}		
		var progressval = "0";
		if (initiative.initiativeValue.progressval != undefined) {
			progressval = initiative.initiativeValue.progressval;
		}	
		var statusLight = '';
		if (initiative.initiativeValue.statusLight != undefined) {
			statusLight = initiative.initiativeValue.statusLight;
		}
		var desc	= 	(initiative.initiativeValue.name !=	undefined?initiative.initiativeValue.name:"" );
		rows	+=	'<div class="d-flex flex-row employe_content_border "><div class="d-flex flex-column flex-fill profile_content"><div class="d-flex flex-row"><p>'+desc+'</p></div><div class="d-flex flex-row"><div class="d-flex flex-column flex-fill"><div class="d-flex flex-row"><div class="progress-s progress"><div class="'+statusLight+'" role="progressbar" aria-valuenow="'+progressval+'" aria-valuemin="0" aria-valuemax="100" style="width:'+progressval+'%"></div></div><div class="progress_value">'+progressval+'%</div></div></div><div class="d-flex flex-column"><div><strong>'+subdaterangeformatted+'</strong></div></div></div></div></div>';                                                                 		
	});
	$("#my_initiative_view").html('');
	$("#my_initiative_view").html(rows);
	$('.employee_div_body_box_emp').slimscroll({
        height: '450px',
        size: '3px',
        color: '#9c9c9c'
    });
}


$(document).on("click",".initiativenavigate",function(){
	var id 		=	$(this).attr("data-id");
	var initiativeid =	$(this).attr("data-initiativeid");
	var emppgno =	$(".emppagenumber").val();
	if(id	!=	"" && initiativeid !=	"" && emppgno != id){
		$.ajax({
			url:'emp/checkPageDetails?pageId='+id,
			type: "GET",
        	contentType: "application/json",
			success:function(data){
				if(data	==	true){
					localStorage.setItem("initiative_pagenumber", initiativeid);
					window.location 	=	"dashboard/"+currentEmp+"?pageId="+id;	
				}else{
					$.notify("You can n't navigate this page",{
							  style: 'error',
							  className: 'graynotify'
							});		
				}
			}
		});
	}
	
	if(id	!=	"" && emppgno == id){
		$.notify("You can n't navigate this page",{
							  style: 'error',
							  className: 'graynotify'
							});
	}
});


function bytesToSize(bytes) {
	   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	   if (bytes == 0) return '0 Byte';
	   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

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

$("#attachementupload").click(function(){	
	
	if(!$("#attachementuploadfile").val()){
		$.notify("Error:Kindly select a file",{
							  style: 'error',
							  className: 'graynotify'
							});
		return false;
	}
	var file		=	$('#attachementuploadfile')[0].files[0];
	if(file	==	undefined){
		return false;
	}
	$(this).attr("disabled",true);
	var fileName 	= 	file.name;
	const words 	= 	fileName.split('.');
	var documentObj			=	{
			"owner":currentEmp,
			"documentsValue":{
				"name":words[0],
				"type":words[words.length - 1],
				"uploadedOn":new Date(),
				"size":bytesToSize(file.size),
				"file_value":readerValue
			}
	}
	
	$.ajax({
        url: "/stratroom/documents",
        method: 'POST',
        async:false,
        contentType: "application/json",
        data: JSON.stringify(documentObj),
        success: function (data, status) {
        	$('#attachementupload').removeAttr("disabled");
        	$("#attachementuploadfile").val("");  	
        	getDocuments();
        	 $('.file_upload_popup').modal('toggle');   
        },
		error:readErrorMsg
    });
		
});	

function getDocuments() {
  $('#documents').empty();	
  $.ajax({
    url: "/stratroom/documentsList",
    method: 'GET',
    async: false,
    contentType: "application/json",
    success: function(result, status) {
      var uploadShowData = "";
      var i;
      $.each(result, function(i, List) {
        i++;
        uploadShowData += '<tr>' +
          '<td class="text-center">' + i + '</td>' +
          '<td class="text-start" style="white-space: pre-wrap !important;">' +
            '<a href="' + List.documentsValue.file_value + '" download="' + 
            List.documentsValue.name + '.' + List.documentsValue.type + '">' + 
            List.documentsValue.name + '</a>' +
          '</td>' +
          '<td class="text-center">' + List.documentsValue.formatDate + '</td>' +
          '<td class="text-center">' + List.documentsValue.size + '</td>' +
          '<td class="text-center">' + List.documentsValue.type + '</td>' +
          '<td class="text-center align-middle">' +
            '<div class="table-actions justify-content-end">';
        
        if (attachmenteditpermission) {
          uploadShowData += 
            '<a class="btn btn-sm btn-outline-icon" href="#" ' +
            'data-bs-toggle="modal" onclick="updateDocument(' + List.id + ')" ' +
            'data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-target=".file_upload_edit_popup" data-bs-title="Edit">' +
              '<img src="/stratroom/images/edit-i.svg" width="12" height="12" />' +
            '</a>';
        }
        
        if (attachmentdeletepermission) {
          uploadShowData += 
            '<a class="btn btn-sm btn-outline-icon" href="#" ' +
            'data-bs-toggle="modal" data-bs-target="#deleteModalDocument" onclick="deletedocument(' + List.id + ')" ' +
            'data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Delete">' +
              '<img src="/stratroom/images/delete-i.svg" width="12" height="12" />' +
            '</a>';
        }
        
        if (!attachmenteditpermission && !attachmentdeletepermission) {
          uploadShowData += '--';
        }
        
        uploadShowData += 
            '</div>' +
          '</td>' +
        '</tr>';
      });
      
      $("#documents").append(uploadShowData);
      
      // Initialize tooltips
      $('[data-bs-toggle="tooltip"]').tooltip();
    },
    error: readErrorMsg
  });
}

var updateId ="";
var documentconstObj = "";
function updateDocument(id){	
	updateId = id;	
	$.ajax({
        url: "/stratroom/documents/"+id,
        method: 'GET',
        async:false,
        contentType: "application/json",
        success: function (data, status) {  	
        	documentconstObj = data.documentsValue;
        },
		error:readErrorMsg
    });
}

$("#attachementupload1").click(function(){	
	
	if(!$("#attachementuploadfile1").val()){
		$.notify("Error:Kindly upload a file",{
							  style: 'error',
							  className: 'graynotify'
							});
		return false;
	}
	var file		=	$('#attachementuploadfile1')[0].files[0];
	if(file	==	undefined){
		return false;
	}
	$(this).attr("disabled",true);
	var fileName 	= 	file.name;
	const words 	= 	fileName.split('.');
	var documentObj			=	{
			"id" : updateId,
			"owner":currentEmp,
			"documentsValue":documentconstObj
	}
	
	documentObj['documentsValue']['name'] = words[0];
	documentObj['documentsValue']['type'] = words[words.length - 1];
	documentObj['documentsValue']['uploadedOn'] = new Date();
	documentObj['documentsValue']['size'] = bytesToSize(file.size);
	documentObj['documentsValue']['file_value'] = readerValue;
	
	$.ajax({
        url: "/stratroom/documents",
        method: 'PUT',
        async:false,
        contentType: "application/json",
        data: JSON.stringify(documentObj),
        success: function (data, status) {
        	$("#attachementupload1").removeAttr("disabled");
        	$("#attachementuploadfile1").val('');  	
        	getDocuments();
        	 $('.file_upload_edit_popup').modal('toggle');
        },
		error:readErrorMsg
    });
		
});	

var deleteId ="";
function deletedocument(id){
	$(window).on("resize", function(){
	    $(".modal:visible").each(alignModal);
	}); 
	$(".modal").on("shown.bs.modal", alignModal);		
	deleteId = id;
}


function deletedocumentByConform(){	
	$(".documentdeletebtn").attr("disabled","true");
	$.ajax({
        url: "/stratroom/documents/"+deleteId,
        method: 'DELETE',
        contentType: "application/json",
        success: function (data, status) {  	
        	getDocuments();
        	$(".documentdeletebtn").removeAttr("disabled");
        	$('.documentdeleteModal').modal('toggle');
        },
		error:function(){
			$(".documentdeletebtn").removeAttr("disabled");
			$('.documentdeleteModal').modal('toggle');
		}
    });
}

$(document).on('keypress','#emp_comments_Form #empDashboardComments,#emp_comments_Form #empActivitiesComments',function(e) {
    var id	=	$(this).attr("data-name");
    if(id	==	""){
    	return false;
    }
    if(e.which == 13) {
    	//$(".activitiescomment_send").hide();
        handleEmployeeCommentsSave('add',id);
        return false;
    }
});

$(document).on('keypress','#risksumarycommentval',function(e) {
    var desc	=	$(this).val();
    if(e.which == 13) {
	    if(desc	==	"" || desc	==	"'"){
				$.notify("Error: Enter some comments", {
							  style: 'error',
							  className: 'graynotify'
							});
			$(".risksumcomment_send").show();				
			return false;
		}
    	//$(".risksumcomment_send").hide();
        handleRiskSummaryCommentsSave('add');
        return false;
    }
});

	function handleEditNotesPopUp(id,riskId,commentdesc,statusaction) {
		$("#note_comments_Form #notes_comments_id").val('');
		$("#note_comments_Form #notesupdate").val('');
		$("#note_comments_Form #notestatusaction").val('');
		$('#note_edit_popup').modal('toggle');
		$("#note_comments_Form #notes_comments_id").val(id);
		$("#note_comments_Form #notesupdate").val(commentdesc);
		$("#note_comments_Form #notestatusaction").val(statusaction);
	}
           
$( "#note_comments_Form" ).validate({
  rules: {
    notesupdate:{
    	required: true
    }
  },
   messages: {
      required: "Name is required"
  },
  submitHandler: function(form) {
  	handleEmployeeUpdatenotesSave('edit');
  }
});

function handleEmployeeUpdatenotesSave(action) {
	var commentsObj = {
		"id" : $("#notes_comments_id").val(),
		"fromPage": "employee",
		"commentsValue" : {
			"desc" : $("#notesupdate").val(),
			"statusaction" : $("#notestatusaction").val(),
		}
	}
	
	methodType = 'put';

	$.ajax({
		url : "/stratroom/comments/",
		type : methodType,
		contentType : "application/json",
		data : JSON.stringify(commentsObj),
		success : function(data, status) {
			$("#note_comments_Form .initative_save_btn").attr('disabled', 'true');
			location.reload(true);
		},error:function(){
			$("#note_comments_Form .initative_save_btn").removeAttr('disabled');
		}
	});
}

	
/*$(".scorecard-dropdown").click(function (e) {
	  console.log('---');
	  var dropdownValue = this.dataset.value;
	  $(".scorecard-dropdown li a").removeClass("active");
	  $(".scorecard-dropdown li:first a").addClass("active");
	  $(".scorecardnamecontent").css("display","block");
	  var scorecardcustname	=	$(".scorecard-dropdown li:first a").text();
	  $(".scorecardnamevalue").text(scorecardcustname);
	  $("div.Dashboard,div.Activities,div.Risk,div.Documents").css("display","none");
	  $("div.Scorecard").css("display","block");
	  $(".employeetablink").removeClass("active");
	  $('[data-value="Scorecard"]').addClass("active");
	  localStorage.setItem("custom_tabname", "Scorecard");
});*/

  $(".scorecard-dropdown").on("click", "li a", function (e) {
	  var dropdownValue = this.dataset.value;
	  $(".scorecard-dropdown li a").removeClass("active");
	  $(this).addClass("active");
	  $(".scorecard-dropdown").removeClass("show");
	  localStorage.setItem("custom_scorecardliId", dropdownValue);
	  $(".scorecardnamecontent").css("display","block");
	  $(".scorecardnamevalue").text($(this).text());
	  $("div.Dashboard,div.Activities,div.Risk,div.Documents").css("display","none");
	  $("div.Scorecard").css("display","block");
	  $(".employeetablink").removeClass("active");
	  $('[data-value="Scorecard"]').addClass("active");
	  localStorage.setItem("custom_tabname", "Scorecard");
	  fetchScoreCardData();
  });
  
  
  $(document).on("click",".empdashcountclick",function(){
		$(this).toggleClass("green");
		var id	=	$(this).attr("data-id");
		if(!id){
			return false;
		}
		var counter=	$(this).closest('li').next('li').find('span.counter').text();
		if($(this).text()	==	"Like"){
			$(this).text("Unlike");
		}else{
			$(this).text("Like");
		}
		var flaglike 	=	false;
		var likecount 	=	0;
		if($(this).hasClass("green")){
			flaglike	=	true;
			likecount 	=	parseInt(parseInt(counter)+1);
			$(this).closest('li').next('li').find('span.counter').text(parseInt(parseInt(counter)+1))
		}else{
			flaglike	=	false;
			likecount 	=	parseInt(parseInt(counter)-1);
			$(this).closest('li').next('li').find('span.counter').text(parseInt(parseInt(counter)-1))
		}
		
		if(likecount == -1){
			return false;
		}
		
		var data 	=	{
				id:id,
				likeCount:likecount,
				type:(flaglike?"like":"dislike"),
				fromPage:'employee',
				empId:currentEmp
		}
		
		$.ajax({
			url:'/stratroom/commentLike',
			type:'put',
			data:JSON.stringify(data),
			async:false,
			contentType : "application/json",
			success:function(res){
				$.notify("Updated Successfully",{
				  style: 'success',
				  className: 'graynotify'
				});
			},error:readErrorMsg
		});
	});